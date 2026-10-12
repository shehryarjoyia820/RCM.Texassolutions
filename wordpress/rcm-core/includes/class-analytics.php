<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * First-party analytics:
 *  - REST POST rcm/v1/event (allow-listed, cookieless; a random visitor id only after analytics consent).
 *  - Daily maintenance cron (event, audit and lead retention).
 *  - Front-end config for GA4 + consent (merged into window.RCM by the asset loader).
 *  - Aggregates for the RCM > Analytics screen, and the RCM > Audit log screen with CSV export.
 *
 * Events are stored in UTC. No personal data: paths are stored without query strings,
 * referrers as host names only, and property values are short scalars that pass the PHI filter.
 */
final class Analytics
{
    public const EVENTS = [
        'page_view', 'tool_use', 'tool_result_copy', 'tool_result_share', 'tool_result_print', 'tool_cta',
        'form_submit', 'cta_click', 'chat_open', 'chat_start', 'chat_message', 'blog_read', 'lookup_search',
        'checklist_print', 'resource_download',
    ];

    public const SEARCH_ENGINES = ['google', 'bing', 'duckduckgo', 'yahoo', 'ecosia', 'brave'];

    private const BOT_UA = '/bot|crawl|spider|slurp|archiver|facebookexternalhit|embedly|preview|headless|phantom|puppeteer|playwright|selenium|lighthouse|pagespeed|gtmetrix|pingdom|uptime|monitor|curl|wget|python|java\/|go-http|okhttp|axios|node-fetch|httpclient|libwww|scrapy/i';

    private const AUDIT_PER_PAGE = 50;

    public static function init(): void
    {
        add_action('rest_api_init', [self::class, 'routes']);
        add_action('rcm_daily_maintenance', [self::class, 'maintenance']);
        add_action('admin_init', [self::class, 'ensure_schedule']);
        add_action('admin_post_rcm_audit_export', [self::class, 'export_audit']);
    }

    /* ------------------------------------------------------------------
     * Cron
     * ------------------------------------------------------------------ */

    public static function schedule(): void
    {
        if (!wp_next_scheduled('rcm_daily_maintenance')) {
            wp_schedule_event(time() + HOUR_IN_SECONDS, 'daily', 'rcm_daily_maintenance');
        }
    }

    public static function ensure_schedule(): void
    {
        self::schedule();
    }

    public static function maintenance(): void
    {
        global $wpdb;
        $events_cutoff = gmdate('Y-m-d H:i:s', time() - 400 * DAY_IN_SECONDS);
        $audit_cutoff = gmdate('Y-m-d H:i:s', strtotime('-2 years'));

        // Delete in batches to keep each statement short on shared hosting.
        for ($i = 0; $i < 50; $i++) {
            $n = (int) $wpdb->query($wpdb->prepare('DELETE FROM ' . rcm_table('events') . ' WHERE at < %s LIMIT 5000', $events_cutoff));
            if ($n < 5000) {
                break;
            }
        }
        for ($i = 0; $i < 50; $i++) {
            $n = (int) $wpdb->query($wpdb->prepare('DELETE FROM ' . rcm_table('audit_log') . ' WHERE at < %s LIMIT 5000', $audit_cutoff));
            if ($n < 5000) {
                break;
            }
        }
        if (class_exists('RCM\\Leads') && method_exists('RCM\\Leads', 'purge_expired')) {
            \RCM\Leads::purge_expired();
        }
    }

    /* ------------------------------------------------------------------
     * Front-end config
     * ------------------------------------------------------------------ */

    /** Merged into window.RCM by the asset loader. */
    public static function config(): array
    {
        $ga4 = (string) rcm_setting('analytics.ga4_id', '');
        return [
            'ga4' => preg_match('/^G-[A-Z0-9]{4,15}$/', $ga4) ? $ga4 : '',
            'cookieUrl' => rcm_page_url('cookie-policy'),
            'consent' => [
                'version' => 1,
                'text' => __('We use Google Analytics cookies to understand which pages and tools are useful. They are only set if you accept. Our own visit counts are cookieless.', 'rcm'),
                'accept' => __('Accept analytics', 'rcm'),
                'decline' => __('Decline', 'rcm'),
                'policy' => __('Cookie policy', 'rcm'),
            ],
        ];
    }

    /* ------------------------------------------------------------------
     * REST: POST rcm/v1/event
     * ------------------------------------------------------------------ */

    public static function routes(): void
    {
        register_rest_route('rcm/v1', '/event', [
            'methods' => 'POST',
            'callback' => [self::class, 'rest_event'],
            'permission_callback' => '__return_true',
        ]);
    }

    private static function same_origin(\WP_REST_Request $request): bool
    {
        $site = strtolower((string) wp_parse_url(home_url(), PHP_URL_HOST));
        foreach (['origin', 'referer'] as $header) {
            $value = (string) $request->get_header($header);
            if ($value === '' || $value === 'null') {
                continue;
            }
            $host = strtolower((string) wp_parse_url($value, PHP_URL_HOST));
            return $host !== '' && $host === $site;
        }
        // Neither header: allowed only when the browser marks the fetch as same-origin.
        return (string) $request->get_header('sec_fetch_site') === 'same-origin';
    }

    public static function rest_event(\WP_REST_Request $request): \WP_REST_Response
    {
        if (!self::same_origin($request)) {
            return new \WP_REST_Response(['ok' => false, 'message' => 'Forbidden origin.'], 403);
        }
        $ua = (string) $request->get_header('user_agent');
        if ($ua === '' || preg_match(self::BOT_UA, $ua)) {
            return new \WP_REST_Response(['ok' => true], 202);
        }
        if (rcm_rate_limited('event', 240, 60)) {
            return new \WP_REST_Response(['ok' => false, 'message' => 'Too many requests.'], 429);
        }

        $body = $request->get_json_params();
        if (!is_array($body)) {
            $decoded = json_decode((string) $request->get_body(), true);
            $body = is_array($decoded) ? $decoded : [];
        }

        $name = is_string($body['name'] ?? null) ? $body['name'] : '';
        if (!in_array($name, self::EVENTS, true)) {
            return new \WP_REST_Response(['ok' => false, 'message' => 'Unknown event.'], 400);
        }

        $path = self::clean_path($body['path'] ?? '');
        $ref_host = self::clean_host($body['ref'] ?? '');
        $props = self::clean_props($body['props'] ?? []);

        $source = '';
        if ($name === 'page_view' && !empty($props['landing'])) {
            $source = self::classify_source($body['utm_source'] ?? '', $body['utm_medium'] ?? '', $ref_host);
        }

        $visitor = is_string($body['visitor'] ?? null) && preg_match('/^[a-f0-9]{16,40}$/', $body['visitor']) ? $body['visitor'] : '';

        global $wpdb;
        $wpdb->insert(rcm_table('events'), [
            'at' => gmdate('Y-m-d H:i:s'),
            'name' => $name,
            'path' => $path,
            'ref' => $ref_host,
            'source' => $source,
            'visitor' => $visitor,
            'props' => $props ? wp_json_encode($props) : null,
        ], ['%s', '%s', '%s', '%s', '%s', '%s', '%s']);

        return new \WP_REST_Response(['ok' => true], 202);
    }

    /** Path only (no query or fragment), max 200 chars. */
    private static function clean_path(mixed $value): string
    {
        if (!is_string($value) || $value === '' || $value[0] !== '/') {
            return '/';
        }
        $path = (string) strtok($value, '?#');
        $path = preg_replace('#[^A-Za-z0-9/_\-.~%]#', '', $path) ?? '/';
        return mb_substr($path === '' ? '/' : $path, 0, 200);
    }

    /** Host name of a referrer URL; internal referrers are dropped. */
    private static function clean_host(mixed $value): string
    {
        if (!is_string($value) || $value === '') {
            return '';
        }
        $host = strtolower((string) wp_parse_url($value, PHP_URL_HOST));
        if ($host === '' || !preg_match('/^[a-z0-9.\-]+$/', $host)) {
            return '';
        }
        $site = strtolower((string) wp_parse_url(home_url(), PHP_URL_HOST));
        if ($host === $site) {
            return '';
        }
        return mb_substr(preg_replace('/^www\./', '', $host) ?? $host, 0, 200);
    }

    /** Normalised acquisition source for a landing page view: "google", "google/cpc", "linkedin.com", "direct". */
    public static function classify_source(mixed $utm_source, mixed $utm_medium, string $ref_host): string
    {
        $clean = static fn(mixed $v): string => is_string($v) ? substr(preg_replace('/[^a-z0-9._\-]/', '', strtolower($v)) ?? '', 0, 40) : '';
        $src = $clean($utm_source);
        $medium = $clean($utm_medium);
        if ($src === '' && $ref_host !== '') {
            $src = $ref_host;
            if (preg_match('/(^|\.)google\.[a-z.]+$/', $ref_host) || str_starts_with($ref_host, 'com.google.android.googlequicksearchbox')) {
                $src = 'google';
            } elseif (preg_match('/(^|\.)bing\.com$/', $ref_host)) {
                $src = 'bing';
            } elseif (preg_match('/(^|\.)duckduckgo\.com$/', $ref_host)) {
                $src = 'duckduckgo';
            } elseif (preg_match('/(^|\.)yahoo\.[a-z.]+$/', $ref_host)) {
                $src = 'yahoo';
            } elseif (preg_match('/(^|\.)ecosia\.org$/', $ref_host)) {
                $src = 'ecosia';
            } elseif ($ref_host === 'search.brave.com') {
                $src = 'brave';
            }
        }
        if ($src === '') {
            return 'direct';
        }
        if ($medium !== '' && $medium !== 'organic') {
            $src .= '/' . $medium;
        }
        return substr($src, 0, 80);
    }

    /** At most 8 scalar properties; strings ≤ 80 chars; anything that looks personal is dropped. */
    private static function clean_props(mixed $props): array
    {
        if (!is_array($props)) {
            return [];
        }
        $out = [];
        foreach ($props as $k => $v) {
            if (count($out) >= 8) {
                break;
            }
            $key = substr(preg_replace('/[^a-z0-9_]/', '', strtolower((string) $k)) ?? '', 0, 32);
            if ($key === '') {
                continue;
            }
            if (is_bool($v)) {
                $out[$key] = $v ? 1 : 0;
            } elseif (is_int($v) || (is_float($v) && is_finite($v))) {
                $out[$key] = is_float($v) ? round($v, 4) : $v;
            } elseif (is_string($v)) {
                $s = rcm_clean($v, 80);
                if ($s === '' || str_contains($s, '@') || preg_match('/\d{7,}/', $s) || rcm_looks_like_phi($s)) {
                    continue;
                }
                $out[$key] = $s;
            }
        }
        return $out;
    }

    /* ------------------------------------------------------------------
     * Aggregates (UTC storage; ranges are site-timezone days)
     * ------------------------------------------------------------------ */

    /**
     * Resolves the requested range. Returns from/to as UTC datetimes plus labels.
     *
     * @return array{from:string,to:string,from_date:string,to_date:string,days:int,preset:string}
     */
    public static function range(string $preset = '30', string $from = '', string $to = ''): array
    {
        $tz = wp_timezone();
        $today = new \DateTimeImmutable('today', $tz);
        if ($preset === 'custom' && preg_match('/^\d{4}-\d{2}-\d{2}$/', $from) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $to)) {
            $start = \DateTimeImmutable::createFromFormat('!Y-m-d', $from, $tz) ?: $today;
            $end = \DateTimeImmutable::createFromFormat('!Y-m-d', $to, $tz) ?: $today;
            if ($end < $start) {
                [$start, $end] = [$end, $start];
            }
            if ($end > $today) {
                $end = $today;
            }
            if ($start->diff($end)->days > 400) {
                $start = $end->modify('-400 days');
            }
        } else {
            $preset = in_array($preset, ['7', '30', '90'], true) ? $preset : '30';
            $end = $today;
            $start = $today->modify('-' . ((int) $preset - 1) . ' days');
        }
        $utc = new \DateTimeZone('UTC');
        return [
            'from' => $start->setTimezone($utc)->format('Y-m-d H:i:s'),
            'to' => $end->modify('+1 day')->setTimezone($utc)->format('Y-m-d H:i:s'),
            'from_date' => $start->format('Y-m-d'),
            'to_date' => $end->format('Y-m-d'),
            'days' => (int) $start->diff($end)->days + 1,
            'preset' => $preset,
        ];
    }

    private static function engines_sql(): string
    {
        return "'" . implode("','", self::SEARCH_ENGINES) . "'";
    }

    public static function totals(string $from, string $to): array
    {
        global $wpdb;
        $t = rcm_table('events');
        $row = (array) $wpdb->get_row($wpdb->prepare(
            "SELECT
                SUM(name = 'page_view') AS page_views,
                COUNT(DISTINCT CASE WHEN visitor <> '' THEN visitor END) AS visitors,
                SUM(name = 'page_view' AND source <> '') AS landings,
                SUM(name = 'page_view' AND source IN (" . self::engines_sql() . ")) AS organic,
                SUM(name = 'tool_use') AS tool_uses,
                SUM(name = 'cta_click') AS cta_clicks,
                SUM(name = 'form_submit') AS form_submits
             FROM $t WHERE at >= %s AND at < %s",
            $from,
            $to
        ), ARRAY_A);
        $landings = (int) ($row['landings'] ?? 0);
        $organic = (int) ($row['organic'] ?? 0);
        return [
            'page_views' => (int) ($row['page_views'] ?? 0),
            'visitors' => (int) ($row['visitors'] ?? 0),
            'landings' => $landings,
            'organic' => $organic,
            'organic_share' => $landings > 0 ? round($organic / $landings * 100, 1) : null,
            'tool_uses' => (int) ($row['tool_uses'] ?? 0),
            'cta_clicks' => (int) ($row['cta_clicks'] ?? 0),
            'form_submits' => (int) ($row['form_submits'] ?? 0),
        ];
    }

    /** Landing views by acquisition source. */
    public static function sources(string $from, string $to, int $limit = 10): array
    {
        global $wpdb;
        return (array) $wpdb->get_results($wpdb->prepare(
            'SELECT source AS label, COUNT(*) AS n FROM ' . rcm_table('events') . " WHERE name = 'page_view' AND source <> '' AND at >= %s AND at < %s GROUP BY source ORDER BY n DESC LIMIT %d",
            $from,
            $to,
            $limit
        ), ARRAY_A);
    }

    public static function top_landing_pages(string $from, string $to, int $limit = 10): array
    {
        global $wpdb;
        return (array) $wpdb->get_results($wpdb->prepare(
            'SELECT path AS label, COUNT(*) AS n, SUM(source IN (' . self::engines_sql() . ')) AS organic FROM ' . rcm_table('events') . " WHERE name = 'page_view' AND source <> '' AND at >= %s AND at < %s GROUP BY path ORDER BY n DESC LIMIT %d",
            $from,
            $to,
            $limit
        ), ARRAY_A);
    }

    public static function top_pages(string $from, string $to, int $limit = 10, string $prefix = ''): array
    {
        global $wpdb;
        $t = rcm_table('events');
        if ($prefix !== '') {
            return (array) $wpdb->get_results($wpdb->prepare(
                "SELECT path AS label, COUNT(*) AS n FROM $t WHERE name = 'page_view' AND path LIKE %s AND at >= %s AND at < %s GROUP BY path ORDER BY n DESC LIMIT %d",
                $wpdb->esc_like($prefix) . '%',
                $from,
                $to,
                $limit
            ), ARRAY_A);
        }
        return (array) $wpdb->get_results($wpdb->prepare(
            "SELECT path AS label, COUNT(*) AS n FROM $t WHERE name = 'page_view' AND at >= %s AND at < %s GROUP BY path ORDER BY n DESC LIMIT %d",
            $from,
            $to,
            $limit
        ), ARRAY_A);
    }

    /** Counts of one event grouped by a property value (e.g. tool_use by props.tool). */
    public static function by_prop(string $event, string $prop, string $from, string $to, int $limit = 10): array
    {
        global $wpdb;
        $prop = preg_replace('/[^a-z0-9_]/', '', $prop) ?? '';
        if ($prop === '') {
            return [];
        }
        $json_path = '$.' . $prop;
        return (array) $wpdb->get_results($wpdb->prepare(
            'SELECT JSON_UNQUOTE(JSON_EXTRACT(props, %s)) AS label, COUNT(*) AS n FROM ' . rcm_table('events') . '
             WHERE name = %s AND at >= %s AND at < %s AND props IS NOT NULL AND JSON_VALID(props) AND JSON_EXTRACT(props, %s) IS NOT NULL
             GROUP BY label ORDER BY n DESC LIMIT %d',
            $json_path,
            $event,
            $from,
            $to,
            $json_path,
            $limit
        ), ARRAY_A);
    }

    public static function most_used_tools(string $from, string $to, int $limit = 10): array
    {
        return self::by_prop('tool_use', 'tool', $from, $to, $limit);
    }

    public static function most_viewed_services(string $from, string $to, int $limit = 10): array
    {
        return self::top_pages($from, $to, $limit, '/services/');
    }

    /** Blog posts: page views under /blog/ or tagged pt=post by the front end, with 60%-read counts. */
    public static function top_blog_posts(string $from, string $to, int $limit = 10): array
    {
        global $wpdb;
        $t = rcm_table('events');
        $rows = (array) $wpdb->get_results($wpdb->prepare(
            "SELECT path AS label, SUM(name = 'page_view') AS n, SUM(name = 'blog_read') AS reads FROM $t
             WHERE name IN ('page_view', 'blog_read') AND at >= %s AND at < %s
               AND (path LIKE %s OR name = 'blog_read' OR (props IS NOT NULL AND JSON_VALID(props) AND JSON_UNQUOTE(JSON_EXTRACT(props, '$.pt')) = 'post'))
             GROUP BY path ORDER BY n DESC LIMIT %d",
            $from,
            $to,
            $wpdb->esc_like('/blog/') . '%',
            $limit
        ), ARRAY_A);
        return array_values(array_filter($rows, static fn(array $r): bool => $r['label'] !== '/blog/'));
    }

    public static function event_counts(string $from, string $to, array $names): array
    {
        global $wpdb;
        $names = array_values(array_intersect($names, self::EVENTS));
        $out = array_fill_keys($names, 0);
        if (!$names) {
            return $out;
        }
        $in = implode(',', array_fill(0, count($names), '%s'));
        $rows = (array) $wpdb->get_results($wpdb->prepare(
            'SELECT name, COUNT(*) AS n FROM ' . rcm_table('events') . " WHERE at >= %s AND at < %s AND name IN ($in) GROUP BY name",
            array_merge([$from, $to], $names)
        ), ARRAY_A);
        foreach ($rows as $r) {
            $out[$r['name']] = (int) $r['n'];
        }
        return $out;
    }

    public static function chat_engagement(string $from, string $to): array
    {
        return self::event_counts($from, $to, ['chat_open', 'chat_start', 'chat_message']);
    }

    private static function leads_table_exists(): bool
    {
        static $exists = null;
        if ($exists === null) {
            global $wpdb;
            $t = rcm_table('leads');
            $exists = $wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', $wpdb->esc_like($t))) === $t;
        }
        return $exists;
    }

    /** Leads in range grouped by source (leads.created_at is UTC). */
    public static function leads_by_source(string $from, string $to): array
    {
        if (!self::leads_table_exists()) {
            return [];
        }
        global $wpdb;
        return (array) $wpdb->get_results($wpdb->prepare(
            'SELECT source AS label, COUNT(*) AS n FROM ' . rcm_table('leads') . ' WHERE created_at >= %s AND created_at < %s AND duplicate_of IS NULL GROUP BY source ORDER BY n DESC',
            $from,
            $to
        ), ARRAY_A);
    }

    /** Lead KPIs: total, consultation requests, conversion rate (leads / unique consented visitors). */
    public static function lead_stats(string $from, string $to, int $visitors): array
    {
        $by_source = self::leads_by_source($from, $to);
        $total = 0;
        $consultations = 0;
        foreach ($by_source as $r) {
            $total += (int) $r['n'];
            if ($r['label'] === 'consultation') {
                $consultations += (int) $r['n'];
            }
        }
        return [
            'available' => self::leads_table_exists(),
            'total' => $total,
            'consultations' => $consultations,
            'conversion_rate' => $visitors > 0 ? round($total / $visitors * 100, 2) : null,
            'by_source' => $by_source,
        ];
    }

    /** Daily page views and unique visitors in the site timezone, zero-filled. */
    public static function daily_series(string $from, string $to): array
    {
        global $wpdb;
        $offset = (int) wp_timezone()->getOffset(new \DateTimeImmutable('now', new \DateTimeZone('UTC')));
        $rows = (array) $wpdb->get_results($wpdb->prepare(
            "SELECT DATE(DATE_ADD(at, INTERVAL %d SECOND)) AS d, SUM(name = 'page_view') AS views, COUNT(DISTINCT CASE WHEN visitor <> '' THEN visitor END) AS visitors
             FROM " . rcm_table('events') . ' WHERE at >= %s AND at < %s GROUP BY d ORDER BY d',
            $offset,
            $from,
            $to
        ), ARRAY_A);
        $map = [];
        foreach ($rows as $r) {
            $map[(string) $r['d']] = ['views' => (int) $r['views'], 'visitors' => (int) $r['visitors']];
        }
        $tz = wp_timezone();
        $day = (new \DateTimeImmutable($from, new \DateTimeZone('UTC')))->setTimezone($tz)->setTime(0, 0);
        $end = (new \DateTimeImmutable($to, new \DateTimeZone('UTC')))->setTimezone($tz);
        $series = [];
        while ($day < $end && count($series) < 401) {
            $key = $day->format('Y-m-d');
            $series[] = ['date' => $key] + ($map[$key] ?? ['views' => 0, 'visitors' => 0]);
            $day = $day->modify('+1 day');
        }
        return $series;
    }

    /** Everything the analytics screen and the overview dashboard need, cached for 5 minutes. */
    public static function report(array $range): array
    {
        $key = 'rcm_an_' . md5($range['from'] . '|' . $range['to']);
        $cached = get_transient($key);
        if (is_array($cached)) {
            return $cached;
        }
        $f = $range['from'];
        $t = $range['to'];
        $totals = self::totals($f, $t);
        $data = [
            'totals' => $totals,
            'leads' => self::lead_stats($f, $t, $totals['visitors']),
            'chat' => self::chat_engagement($f, $t),
            'series' => self::daily_series($f, $t),
            'sources' => self::sources($f, $t),
            'landing' => self::top_landing_pages($f, $t),
            'pages' => self::top_pages($f, $t),
            'tools' => self::most_used_tools($f, $t),
            'services' => self::most_viewed_services($f, $t),
            'blog' => self::top_blog_posts($f, $t),
            'engagement' => self::event_counts($f, $t, ['tool_result_copy', 'tool_result_share', 'tool_result_print', 'tool_cta', 'cta_click', 'form_submit', 'lookup_search', 'checklist_print', 'resource_download']),
        ];
        set_transient($key, $data, 5 * MINUTE_IN_SECONDS);
        return $data;
    }

    /* ------------------------------------------------------------------
     * SVG charts (server-rendered, no library)
     * ------------------------------------------------------------------ */

    private static function line_chart(array $series, string $field, string $label): string
    {
        $w = 720;
        $h = 200;
        $pad_l = 40;
        $pad_b = 24;
        $pad_t = 10;
        $n = count($series);
        if ($n === 0) {
            return '';
        }
        $max = max(1, max(array_column($series, $field)));
        $plot_w = $w - $pad_l - 10;
        $plot_h = $h - $pad_b - $pad_t;
        $step = $n > 1 ? $plot_w / ($n - 1) : 0;
        $pts = [];
        foreach ($series as $i => $p) {
            $x = $pad_l + $i * $step;
            $y = $pad_t + $plot_h - ($p[$field] / $max) * $plot_h;
            $pts[] = round($x, 1) . ',' . round($y, 1);
        }
        $base = $pad_t + $plot_h;
        $area = $pad_l . ',' . $base . ' ' . implode(' ', $pts) . ' ' . round($pad_l + ($n - 1) * $step, 1) . ',' . $base;

        $svg = '<svg class="rcm-chart" viewBox="0 0 ' . $w . ' ' . $h . '" role="img" aria-label="' . esc_attr($label) . '">';
        foreach ([0, 0.5, 1] as $g) {
            $gy = round($pad_t + $plot_h - $g * $plot_h, 1);
            $svg .= '<line class="rcm-chart-grid" x1="' . $pad_l . '" x2="' . ($w - 10) . '" y1="' . $gy . '" y2="' . $gy . '"/>';
            $svg .= '<text class="rcm-chart-axis" x="' . ($pad_l - 6) . '" y="' . ($gy + 4) . '" text-anchor="end">' . esc_html(number_format_i18n((int) round($g * $max))) . '</text>';
        }
        $svg .= '<polygon class="rcm-chart-area" points="' . esc_attr($area) . '"/>';
        $svg .= '<polyline class="rcm-chart-line" points="' . esc_attr(implode(' ', $pts)) . '"/>';
        $label_every = max(1, (int) ceil($n / 8));
        foreach ($series as $i => $p) {
            $x = round($pad_l + $i * $step, 1);
            $y = round($pad_t + $plot_h - ($p[$field] / $max) * $plot_h, 1);
            $svg .= '<circle class="rcm-chart-dot" cx="' . $x . '" cy="' . $y . '" r="' . ($n > 60 ? 0 : 2.5) . '"><title>' . esc_html($p['date'] . ': ' . number_format_i18n($p[$field])) . '</title></circle>';
            if ($i % $label_every === 0) {
                $svg .= '<text class="rcm-chart-axis" x="' . $x . '" y="' . ($h - 6) . '" text-anchor="middle">' . esc_html(wp_date('M j', strtotime($p['date'] . ' 12:00:00'))) . '</text>';
            }
        }
        return $svg . '</svg>';
    }

    private static function bar_chart(array $rows, string $label): string
    {
        if (!$rows) {
            return '';
        }
        $row_h = 26;
        $w = 480;
        $label_w = 190;
        $h = count($rows) * $row_h + 4;
        $max = max(1, max(array_map(static fn($r) => (int) $r['n'], $rows)));
        $svg = '<svg class="rcm-chart rcm-chart-bars" viewBox="0 0 ' . $w . ' ' . $h . '" role="img" aria-label="' . esc_attr($label) . '">';
        foreach (array_values($rows) as $i => $r) {
            $y = $i * $row_h + 2;
            $bw = max(2, ((int) $r['n'] / $max) * ($w - $label_w - 60));
            $text = (string) $r['label'];
            $text = mb_strlen($text) > 28 ? mb_substr($text, 0, 27) . '…' : $text;
            $svg .= '<text class="rcm-chart-label" x="0" y="' . ($y + 16) . '">' . esc_html($text) . '</text>';
            $svg .= '<rect class="rcm-chart-bar" x="' . $label_w . '" y="' . ($y + 4) . '" width="' . round($bw, 1) . '" height="16" rx="3"><title>' . esc_html($r['label'] . ': ' . number_format_i18n((int) $r['n'])) . '</title></rect>';
            $svg .= '<text class="rcm-chart-value" x="' . round($label_w + $bw + 6, 1) . '" y="' . ($y + 16) . '">' . esc_html(number_format_i18n((int) $r['n'])) . '</text>';
        }
        return $svg . '</svg>';
    }

    private static function svg_kses(): array
    {
        $a = ['class' => true, 'x' => true, 'y' => true, 'x1' => true, 'x2' => true, 'y1' => true, 'y2' => true, 'width' => true, 'height' => true, 'rx' => true, 'cx' => true, 'cy' => true, 'r' => true, 'points' => true, 'text-anchor' => true];
        return [
            'svg' => ['class' => true, 'viewbox' => true, 'role' => true, 'aria-label' => true],
            'line' => $a, 'polyline' => $a, 'polygon' => $a, 'circle' => $a, 'rect' => $a, 'text' => $a, 'title' => [],
        ];
    }

    /* ------------------------------------------------------------------
     * Admin: RCM > Analytics
     * ------------------------------------------------------------------ */

    private static function table(string $title, array $rows, string $col, array $extra = []): void
    {
        echo '<div class="rcm-an-panel"><h2>' . esc_html($title) . '</h2>';
        if (!$rows) {
            echo '<p class="rcm-an-empty">' . esc_html__('No data for this period yet.', 'rcm') . '</p></div>';
            return;
        }
        $max = max(1, max(array_map(static fn($r) => (int) $r['n'], $rows)));
        echo '<table class="widefat striped rcm-an-table"><thead><tr><th scope="col">' . esc_html($col) . '</th><th scope="col" class="num">' . esc_html__('Count', 'rcm') . '</th>';
        foreach ($extra as $label) {
            echo '<th scope="col" class="num">' . esc_html($label) . '</th>';
        }
        echo '</tr></thead><tbody>';
        foreach ($rows as $r) {
            $pct = round((int) $r['n'] / $max * 100);
            $label = (string) $r['label'];
            echo '<tr><td><span class="rcm-an-bar" style="--w:' . esc_attr((string) $pct) . '%"></span>';
            if ($label !== '' && $label[0] === '/') {
                echo '<a href="' . esc_url(home_url($label)) . '" target="_blank" rel="noopener">' . esc_html($label) . '</a>';
            } else {
                echo esc_html($label !== '' ? $label : '—');
            }
            echo '</td><td class="num">' . esc_html(number_format_i18n((int) $r['n'])) . '</td>';
            foreach (array_keys($extra) as $key) {
                echo '<td class="num">' . esc_html(number_format_i18n((int) ($r[$key] ?? 0))) . '</td>';
            }
            echo '</tr>';
        }
        echo '</tbody></table></div>';
    }

    private static function kpi(string $label, string $value, string $hint = ''): void
    {
        echo '<div class="rcm-kpi"><span class="rcm-kpi-label">' . esc_html($label) . '</span><span class="rcm-kpi-value">' . esc_html($value) . '</span>';
        if ($hint !== '') {
            echo '<span class="rcm-kpi-hint">' . esc_html($hint) . '</span>';
        }
        echo '</div>';
    }

    public static function render_admin(): void
    {
        if (!current_user_can('rcm_view_analytics')) {
            wp_die(esc_html__('You do not have permission to view analytics.', 'rcm'), 403);
        }
        $preset = isset($_GET['range']) ? sanitize_key(wp_unslash((string) $_GET['range'])) : '30';
        $from_in = isset($_GET['from']) ? sanitize_text_field(wp_unslash((string) $_GET['from'])) : '';
        $to_in = isset($_GET['to']) ? sanitize_text_field(wp_unslash((string) $_GET['to'])) : '';
        $range = self::range($preset, $from_in, $to_in);
        $r = self::report($range);
        $tot = $r['totals'];
        $base = admin_url('admin.php?page=rcm-analytics');
        $num = static fn(int $n): string => number_format_i18n($n);

        echo '<div class="wrap rcm-analytics"><h1>' . esc_html__('Analytics', 'rcm') . '</h1>';

        // Range controls.
        echo '<div class="rcm-an-range"><nav aria-label="' . esc_attr__('Date range', 'rcm') . '">';
        foreach (['7' => __('Last 7 days', 'rcm'), '30' => __('Last 30 days', 'rcm'), '90' => __('Last 90 days', 'rcm')] as $key => $label) {
            $current = $range['preset'] === (string) $key;
            echo '<a class="button' . ($current ? ' button-primary' : '') . '"' . ($current ? ' aria-current="page"' : '') . ' href="' . esc_url(add_query_arg('range', $key, $base)) . '">' . esc_html($label) . '</a> ';
        }
        echo '</nav><form method="get" class="rcm-an-custom"><input type="hidden" name="page" value="rcm-analytics"><input type="hidden" name="range" value="custom">';
        echo '<label for="rcm-an-from">' . esc_html__('From', 'rcm') . '</label> <input type="date" id="rcm-an-from" name="from" value="' . esc_attr($range['from_date']) . '"> ';
        echo '<label for="rcm-an-to">' . esc_html__('To', 'rcm') . '</label> <input type="date" id="rcm-an-to" name="to" value="' . esc_attr($range['to_date']) . '"> ';
        echo '<button type="submit" class="button">' . esc_html__('Apply', 'rcm') . '</button></form></div>';
        /* translators: 1: start date, 2: end date, 3: number of days */
        echo '<p class="rcm-an-period">' . esc_html(sprintf(__('%1$s to %2$s (%3$d days)', 'rcm'), $range['from_date'], $range['to_date'], $range['days'])) . '</p>';

        // KPI cards.
        $leads = $r['leads'];
        echo '<div class="rcm-kpis">';
        self::kpi(__('Page views', 'rcm'), $num($tot['page_views']));
        self::kpi(__('Unique visitors', 'rcm'), $num($tot['visitors']), __('Consented visitors only', 'rcm'));
        self::kpi(__('Organic search share', 'rcm'), $tot['organic_share'] === null ? '—' : $tot['organic_share'] . '%', sprintf(
            /* translators: 1: organic landings, 2: all landings */
            __('%1$s of %2$s entrances', 'rcm'),
            $num($tot['organic']),
            $num($tot['landings'])
        ));
        self::kpi(__('Leads', 'rcm'), $leads['available'] ? $num($leads['total']) : '—');
        self::kpi(__('Conversion rate', 'rcm'), $leads['conversion_rate'] === null ? '—' : $leads['conversion_rate'] . '%', __('Leads ÷ unique visitors', 'rcm'));
        self::kpi(__('Consultation requests', 'rcm'), $leads['available'] ? $num($leads['consultations']) : '—');
        self::kpi(__('Tool uses', 'rcm'), $num($tot['tool_uses']));
        self::kpi(__('Chats started', 'rcm'), $num((int) $r['chat']['chat_start']), sprintf(
            /* translators: 1: chat opens, 2: chat messages */
            __('%1$s opens, %2$s messages', 'rcm'),
            $num((int) $r['chat']['chat_open']),
            $num((int) $r['chat']['chat_message'])
        ));
        echo '</div>';

        // Trend.
        echo '<div class="rcm-an-panel rcm-an-wide"><h2>' . esc_html__('Daily page views', 'rcm') . '</h2>';
        echo wp_kses(self::line_chart($r['series'], 'views', __('Daily page views', 'rcm')), self::svg_kses());
        echo '</div>';

        echo '<div class="rcm-an-grid">';
        echo '<div class="rcm-an-panel"><h2>' . esc_html__('Most-used tools', 'rcm') . '</h2>';
        echo $r['tools'] ? wp_kses(self::bar_chart($r['tools'], __('Most-used tools', 'rcm')), self::svg_kses()) : '<p class="rcm-an-empty">' . esc_html__('No data for this period yet.', 'rcm') . '</p>';
        echo '</div>';
        echo '<div class="rcm-an-panel"><h2>' . esc_html__('Entrances by source', 'rcm') . '</h2>';
        echo $r['sources'] ? wp_kses(self::bar_chart($r['sources'], __('Entrances by source', 'rcm')), self::svg_kses()) : '<p class="rcm-an-empty">' . esc_html__('No data for this period yet.', 'rcm') . '</p>';
        echo '</div>';

        self::table(__('Top landing pages', 'rcm'), $r['landing'], __('Page', 'rcm'), ['organic' => __('From search', 'rcm')]);
        self::table(__('Top pages', 'rcm'), $r['pages'], __('Page', 'rcm'));
        self::table(__('Most-viewed services', 'rcm'), $r['services'], __('Service page', 'rcm'));
        self::table(__('Top blog posts', 'rcm'), $r['blog'], __('Post', 'rcm'), ['reads' => __('Read 60%+', 'rcm')]);
        self::table(__('Leads by source', 'rcm'), $leads['by_source'], __('Source', 'rcm'));

        $eng = [];
        $labels = [
            'cta_click' => __('CTA clicks', 'rcm'),
            'form_submit' => __('Form submissions', 'rcm'),
            'tool_cta' => __('Tool CTA clicks', 'rcm'),
            'tool_result_copy' => __('Tool results copied', 'rcm'),
            'tool_result_share' => __('Tool results shared', 'rcm'),
            'tool_result_print' => __('Tool results printed', 'rcm'),
            'lookup_search' => __('Code lookups', 'rcm'),
            'checklist_print' => __('Checklists printed', 'rcm'),
            'resource_download' => __('Resource downloads', 'rcm'),
            'chat_open' => __('Chat opened', 'rcm'),
            'chat_start' => __('Chats started', 'rcm'),
            'chat_message' => __('Chat messages', 'rcm'),
        ];
        foreach ($r['engagement'] + $r['chat'] as $name => $n) {
            $eng[] = ['label' => $labels[$name] ?? $name, 'n' => $n];
        }
        usort($eng, static fn($a, $b) => $b['n'] <=> $a['n']);
        self::table(__('Engagement and chat', 'rcm'), array_values(array_filter($eng, static fn($e) => $e['n'] > 0)), __('Event', 'rcm'));
        echo '</div>';

        echo '<div class="rcm-an-note notice notice-info inline"><p>';
        echo esc_html__('These numbers are first-party: the site records page views and tool, form and chat events itself without cookies or personal data. A random visitor id (used for unique visitors and the conversion rate) is only kept in the browser of visitors who accepted analytics, so unique visitors undercount real people. Bots and logged-in staff are excluded.', 'rcm');
        echo '</p><p>';
        echo esc_html__('Google Analytics and Google Search Console hold fuller data, including search queries and impressions:', 'rcm') . ' ';
        echo '<a href="https://analytics.google.com/" target="_blank" rel="noopener">' . esc_html__('Open Google Analytics', 'rcm') . '</a> · ';
        echo '<a href="https://search.google.com/search-console" target="_blank" rel="noopener">' . esc_html__('Open Search Console', 'rcm') . '</a>';
        echo '</p></div></div>';
    }

    /* ------------------------------------------------------------------
     * Admin: RCM > Audit log
     * ------------------------------------------------------------------ */

    /** @return array{user:int,action:string,from:string,to:string} */
    private static function audit_filters(): array
    {
        $date = static function (string $key): string {
            $v = isset($_GET[$key]) ? sanitize_text_field(wp_unslash((string) $_GET[$key])) : '';
            return preg_match('/^\d{4}-\d{2}-\d{2}$/', $v) ? $v : '';
        };
        return [
            'user' => isset($_GET['user']) ? absint($_GET['user']) : 0,
            'action' => isset($_GET['act']) && is_string($_GET['act']) ? substr(preg_replace('/[^a-z0-9_.\-]/', '', strtolower((string) wp_unslash($_GET['act']))) ?? '', 0, 80) : '',
            'from' => $date('from'),
            'to' => $date('to'),
        ];
    }

    /** WHERE clause (prepared) for audit filters. */
    private static function audit_where(array $f): string
    {
        global $wpdb;
        $tz = wp_timezone();
        $utc = new \DateTimeZone('UTC');
        $where = ['1=1'];
        if ($f['user']) {
            $where[] = $wpdb->prepare('user_id = %d', $f['user']);
        }
        if ($f['action'] !== '') {
            $where[] = $wpdb->prepare('action LIKE %s', $wpdb->esc_like($f['action']) . '%');
        }
        if ($f['from'] !== '') {
            $d = \DateTimeImmutable::createFromFormat('!Y-m-d', $f['from'], $tz);
            if ($d) {
                $where[] = $wpdb->prepare('at >= %s', $d->setTimezone($utc)->format('Y-m-d H:i:s'));
            }
        }
        if ($f['to'] !== '') {
            $d = \DateTimeImmutable::createFromFormat('!Y-m-d', $f['to'], $tz);
            if ($d) {
                $where[] = $wpdb->prepare('at < %s', $d->modify('+1 day')->setTimezone($utc)->format('Y-m-d H:i:s'));
            }
        }
        return implode(' AND ', $where);
    }

    private static function audit_detail(?string $json): string
    {
        $d = json_decode((string) $json, true);
        if (!is_array($d) || !$d) {
            return '';
        }
        $parts = [];
        foreach ($d as $k => $v) {
            $parts[] = $k . ': ' . (is_scalar($v) || $v === null ? var_export($v, true) : wp_json_encode($v));
        }
        return implode('; ', $parts);
    }

    public static function render_audit(): void
    {
        if (!current_user_can('rcm_view_audit')) {
            wp_die(esc_html__('You do not have permission to view the audit log.', 'rcm'), 403);
        }
        global $wpdb;
        $t = rcm_table('audit_log');
        $f = self::audit_filters();
        $where = self::audit_where($f);
        $page = max(1, isset($_GET['paged']) ? absint($_GET['paged']) : 1);
        $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM $t WHERE $where"); // phpcs:ignore WordPress.DB.PreparedSQL -- $where is built with prepare().
        $pages = max(1, (int) ceil($total / self::AUDIT_PER_PAGE));
        $page = min($page, $pages);
        $rows = (array) $wpdb->get_results($wpdb->prepare(
            "SELECT * FROM $t WHERE $where ORDER BY at DESC, id DESC LIMIT %d OFFSET %d", // phpcs:ignore WordPress.DB.PreparedSQL
            self::AUDIT_PER_PAGE,
            ($page - 1) * self::AUDIT_PER_PAGE
        ), ARRAY_A);
        $user_ids = array_map('intval', (array) $wpdb->get_col("SELECT DISTINCT user_id FROM $t WHERE user_id IS NOT NULL ORDER BY user_id LIMIT 300"));
        $actions = (array) $wpdb->get_col("SELECT DISTINCT SUBSTRING_INDEX(action, '.', 1) FROM $t ORDER BY 1 LIMIT 100");

        echo '<div class="wrap rcm-audit"><h1 class="wp-heading-inline">' . esc_html__('Audit log', 'rcm') . '</h1>';
        $export = wp_nonce_url(add_query_arg(array_filter([
            'action' => 'rcm_audit_export',
            'user' => $f['user'] ?: null,
            'act' => $f['action'] ?: null,
            'from' => $f['from'] ?: null,
            'to' => $f['to'] ?: null,
        ]), admin_url('admin-post.php')), 'rcm_audit_export');
        echo ' <a class="page-title-action" href="' . esc_url($export) . '">' . esc_html__('Export CSV', 'rcm') . '</a><hr class="wp-header-end">';

        echo '<form method="get" class="rcm-audit-filters"><input type="hidden" name="page" value="rcm-audit">';
        echo '<label for="rcm-audit-user">' . esc_html__('User', 'rcm') . '</label> <select id="rcm-audit-user" name="user"><option value="0">' . esc_html__('All users', 'rcm') . '</option>';
        foreach ($user_ids as $uid) {
            $u = get_userdata($uid);
            $name = $u ? $u->display_name . ' (' . $u->user_login . ')' : sprintf(/* translators: %d: user id */ __('Deleted user #%d', 'rcm'), $uid);
            echo '<option value="' . esc_attr((string) $uid) . '"' . selected($f['user'], $uid, false) . '>' . esc_html($name) . '</option>';
        }
        echo '</select> ';
        echo '<label for="rcm-audit-act">' . esc_html__('Action starts with', 'rcm') . '</label> <input type="text" id="rcm-audit-act" name="act" list="rcm-audit-actions" value="' . esc_attr($f['action']) . '" placeholder="auth." size="16"><datalist id="rcm-audit-actions">';
        foreach ($actions as $a) {
            echo '<option value="' . esc_attr($a . '.') . '"></option>';
        }
        echo '</datalist> ';
        echo '<label for="rcm-audit-from">' . esc_html__('From', 'rcm') . '</label> <input type="date" id="rcm-audit-from" name="from" value="' . esc_attr($f['from']) . '"> ';
        echo '<label for="rcm-audit-to">' . esc_html__('To', 'rcm') . '</label> <input type="date" id="rcm-audit-to" name="to" value="' . esc_attr($f['to']) . '"> ';
        echo '<button type="submit" class="button">' . esc_html__('Filter', 'rcm') . '</button> ';
        echo '<a class="button-link" href="' . esc_url(admin_url('admin.php?page=rcm-audit')) . '">' . esc_html__('Reset', 'rcm') . '</a></form>';

        /* translators: %s: number of entries */
        echo '<p class="rcm-audit-count">' . esc_html(sprintf(_n('%s entry', '%s entries', $total, 'rcm'), number_format_i18n($total))) . '</p>';

        echo '<table class="widefat striped rcm-audit-table"><thead><tr>';
        foreach ([__('Time', 'rcm'), __('User', 'rcm'), __('Action', 'rcm'), __('Entity', 'rcm'), __('Details', 'rcm'), __('IP', 'rcm')] as $h) {
            echo '<th scope="col">' . esc_html($h) . '</th>';
        }
        echo '</tr></thead><tbody>';
        if (!$rows) {
            echo '<tr><td colspan="6">' . esc_html__('No entries match these filters.', 'rcm') . '</td></tr>';
        }
        foreach ($rows as $row) {
            $ts = strtotime($row['at'] . ' UTC');
            echo '<tr><td><time datetime="' . esc_attr(gmdate('c', $ts)) . '">' . esc_html(wp_date('Y-m-d H:i:s', $ts)) . '</time></td>';
            echo '<td>' . esc_html($row['user_email'] !== '' ? $row['user_email'] : ($row['user_id'] ? '#' . $row['user_id'] : __('System / visitor', 'rcm'))) . '</td>';
            echo '<td><code>' . esc_html($row['action']) . '</code></td>';
            echo '<td>' . esc_html(trim($row['entity'] . ' ' . $row['entity_id'])) . '</td>';
            echo '<td class="rcm-audit-detail">' . esc_html(self::audit_detail($row['detail'])) . '</td>';
            echo '<td>' . esc_html($row['ip']) . '</td></tr>';
        }
        echo '</tbody></table>';

        if ($pages > 1) {
            echo '<div class="tablenav"><div class="tablenav-pages">';
            echo wp_kses_post((string) paginate_links([
                'base' => add_query_arg('paged', '%#%'),
                'format' => '',
                'current' => $page,
                'total' => $pages,
            ]));
            echo '</div></div>';
        }
        echo '</div>';
    }

    /** admin-post.php?action=rcm_audit_export */
    public static function export_audit(): void
    {
        if (!current_user_can('rcm_view_audit')) {
            wp_die(esc_html__('You do not have permission to export the audit log.', 'rcm'), 403);
        }
        check_admin_referer('rcm_audit_export');
        global $wpdb;
        $f = self::audit_filters();
        $where = self::audit_where($f);
        rcm_audit('audit.export', 'audit_log', '', array_filter($f));

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="rcm-audit-' . gmdate('Y-m-d') . '.csv"');
        $out = fopen('php://output', 'w');
        fwrite($out, "\xEF\xBB\xBF");
        fputcsv($out, ['time_utc', 'user_id', 'user_email', 'action', 'entity', 'entity_id', 'detail', 'ip']);
        $safe = static fn($v): string => preg_match('/^[=+\-@\t\r]/', (string) $v) ? "'" . $v : (string) $v;
        $offset = 0;
        do {
            $rows = (array) $wpdb->get_results($wpdb->prepare(
                'SELECT at, user_id, user_email, action, entity, entity_id, detail, ip FROM ' . rcm_table('audit_log') . " WHERE $where ORDER BY at DESC, id DESC LIMIT %d OFFSET %d", // phpcs:ignore WordPress.DB.PreparedSQL
                2000,
                $offset
            ), ARRAY_A);
            foreach ($rows as $row) {
                fputcsv($out, array_map($safe, array_values($row)));
            }
            $offset += 2000;
        } while (count($rows) === 2000 && $offset < 200000);
        fclose($out);
        exit;
    }
}
