<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * RCM tools: calculator and reference tool markup, the /tools directory,
 * script loading and the REST rcm/v1/lookup proxy for public code and
 * provider datasets.
 *
 * Every rcm_tool post stores its tool object (minus `compute`) as JSON in
 * `_rcm_data` and its original slug in `_rcm_key`. Calculator maths runs in the
 * browser only: assets/js/calc/<key>.js registers window.RCM_CALC['<key>'] and
 * assets/js/tools.js (source src/js/tools.ts) wires the markup rendered here.
 *
 * Lookup sources:
 *  - ICD-10-CM and HCPCS Level II: NLM Clinical Table Search Service
 *    (https://clinicaltables.nlm.nih.gov), public-domain code sets from CDC/NCHS and CMS.
 *  - NPI: CMS NPPES NPI Registry API v2.1 (https://npiregistry.cms.hhs.gov/api-page).
 * CPT and CDT are licensed by the AMA and ADA and are not offered.
 */
final class Tools
{
    /** Unit suffixes shown inside inputs (mirrors UNIT_SUFFIX in src/js/format.ts). */
    public const UNIT_SUFFIX = ['usd' => '$', 'pct' => '%', 'days' => 'days', 'count' => '', 'hours' => 'hrs', 'months' => 'mo', 'ratio' => '', 'years' => 'yrs'];

    public const SCORECARD_KEY = 'rcm-performance-scorecard';

    private const KIND_ICONS = ['calculator' => 'Calculator', 'checklist' => 'ClipboardCheck', 'lookup' => 'Search', 'glossary' => 'BookOpen', 'guide' => 'BookOpen'];

    private const US_STATE_CODES = ['AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'];

    private const CACHE_TTL = 86400;

    /** Counter for unique element ids when several widgets share a page. */
    private static int $uid = 0;

    public static function init(): void
    {
        add_action('rest_api_init', [self::class, 'routes']);
        add_action('wp_enqueue_scripts', [self::class, 'enqueue'], 20);
    }

    /* ------------------------------------------------------------------ */
    /*  Scripts                                                            */
    /* ------------------------------------------------------------------ */

    public static function enqueue(): void
    {
        $single = is_singular(Content_Types::TOOL);
        if (!$single && !is_post_type_archive(Content_Types::TOOL)) {
            return;
        }
        $deps = wp_script_is('rcm-site', 'registered') ? ['rcm-site'] : [];
        $args = ['in_footer' => true, 'strategy' => 'defer'];

        if ($single) {
            $post = get_queried_object();
            if ($post instanceof \WP_Post && (string) (Content_Types::data($post)['kind'] ?? '') === 'calculator') {
                $key = Content_Types::key($post);
                $rel = 'assets/js/calc/' . $key . '.js';
                if (preg_match('/^[a-z0-9-]+$/', $key) && file_exists(RCM_DIR . $rel)) {
                    $handle = 'rcm-calc-' . $key;
                    wp_enqueue_script($handle, RCM_URL . $rel, [], (string) filemtime(RCM_DIR . $rel), $args);
                    $deps[] = $handle;
                }
            }
        }

        $rel = 'assets/js/tools.js';
        $ver = file_exists(RCM_DIR . $rel) ? (string) filemtime(RCM_DIR . $rel) : RCM_VERSION;
        wp_enqueue_script('rcm-tools', RCM_URL . $rel, $deps, $ver, $args);
    }

    /* ------------------------------------------------------------------ */
    /*  REST: rcm/v1/lookup                                                */
    /* ------------------------------------------------------------------ */

    public static function routes(): void
    {
        // Read-only proxy to public government datasets. Tool pages are page
        // cached, so no nonce is required here; the route is rate limited instead.
        register_rest_route('rcm/v1', '/lookup', [
            'methods' => \WP_REST_Server::READABLE,
            'permission_callback' => '__return_true',
            'callback' => [self::class, 'lookup'],
        ]);
    }

    public static function lookup(\WP_REST_Request $req): \WP_REST_Response
    {
        if (rcm_rate_limited('lookup', 60, 60)) {
            return self::reply(['ok' => false, 'message' => __('Too many searches. Please wait a minute.', 'rcm')], 429);
        }

        $type = rcm_clean($req->get_param('type'), 10);

        if ($type === 'icd10' || $type === 'hcpcs') {
            $q = rcm_clean($req->get_param('q'), 80);
            if (mb_strlen($q) < 2) {
                return self::reply(['ok' => true, 'total' => 0, 'rows' => []]);
            }
            $table = $type === 'icd10' ? 'icd10cm' : 'hcpcs';
            $result = self::cached($type, ['q' => mb_strtolower($q)], static fn() => self::clinical_tables($table, $q));
        } elseif ($type === 'npi') {
            $c = self::npi_criteria($req);
            if ($c['number'] === '' && $c['first'] === '' && $c['last'] === '' && $c['org'] === '') {
                return self::reply(['ok' => false, 'message' => __('Enter an NPI number, a provider name or an organization name.', 'rcm')], 400);
            }
            if ($c['number'] !== '' && strlen($c['number']) !== 10) {
                return self::reply(['ok' => false, 'message' => __('An NPI number has 10 digits.', 'rcm')], 400);
            }
            $result = self::cached('npi', $c, static fn() => self::npi($c));
        } else {
            return self::reply(['ok' => false, 'message' => __('Unknown lookup.', 'rcm')], 400);
        }

        if (is_wp_error($result)) {
            return self::reply(['ok' => false, 'message' => $result->get_error_message()], 502);
        }
        return self::reply(['ok' => true, 'total' => $result['total'], 'rows' => $result['rows']]);
    }

    private static function reply(array $body, int $status = 200): \WP_REST_Response
    {
        $r = new \WP_REST_Response($body, $status);
        $r->header('Cache-Control', $status === 200 ? 'public, max-age=3600' : 'no-store, max-age=0');
        return $r;
    }

    /**
     * Successful upstream responses are cached for a day, keyed by the query.
     *
     * @param callable(): (array{total:int,rows:array}|\WP_Error) $fetch
     * @return array{total:int,rows:array}|\WP_Error
     */
    private static function cached(string $type, array $criteria, callable $fetch): array|\WP_Error
    {
        $key = 'rcm_lookup_' . md5($type . '|' . (string) wp_json_encode($criteria));
        $hit = get_transient($key);
        if (is_array($hit) && isset($hit['rows'], $hit['total'])) {
            return $hit;
        }
        $result = $fetch();
        if (!is_wp_error($result)) {
            set_transient($key, $result, self::CACHE_TTL);
        }
        return $result;
    }

    private static function upstream_error(): \WP_Error
    {
        return new \WP_Error('upstream', __('The public registry did not respond. Please try again shortly.', 'rcm'));
    }

    private static function fetch_json(string $url): array|\WP_Error
    {
        $res = wp_remote_get($url, [
            'timeout' => 10,
            'redirection' => 2,
            'headers' => ['Accept' => 'application/json'],
            'user-agent' => 'RCM Core/' . RCM_VERSION . '; ' . home_url('/'),
        ]);
        if (is_wp_error($res) || (int) wp_remote_retrieve_response_code($res) !== 200) {
            return self::upstream_error();
        }
        $data = json_decode((string) wp_remote_retrieve_body($res), true);
        return is_array($data) ? $data : self::upstream_error();
    }

    /** @return array{total:int,rows:array}|\WP_Error */
    private static function clinical_tables(string $table, string $q): array|\WP_Error
    {
        $params = $table === 'icd10cm' ? ['sf' => 'code,name', 'df' => 'code,name'] : ['df' => 'code,display'];
        $params += ['maxList' => 50, 'terms' => $q];
        $data = self::fetch_json('https://clinicaltables.nlm.nih.gov/api/' . $table . '/v3/search?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986));
        if (is_wp_error($data)) {
            return $data;
        }
        $rows = [];
        foreach ((isset($data[3]) && is_array($data[3])) ? $data[3] : [] as $row) {
            if (!is_array($row)) {
                continue;
            }
            $code = rcm_clean($row[0] ?? '', 20);
            if ($code === '') {
                continue;
            }
            $rows[] = ['code' => $code, 'title' => rcm_clean($row[1] ?? '', 400), 'detail' => ''];
        }
        $total = isset($data[0]) && is_numeric($data[0]) ? (int) $data[0] : count($rows);
        return ['total' => $total, 'rows' => $rows];
    }

    /** @return array{number:string,first:string,last:string,org:string,state:string,city:string} */
    private static function npi_criteria(\WP_REST_Request $req): array
    {
        $state = strtoupper(rcm_clean($req->get_param('state'), 2));
        return [
            'number' => preg_replace('/\D/', '', rcm_clean($req->get_param('number'), 20)) ?? '',
            'first' => rcm_clean($req->get_param('first'), 40),
            'last' => rcm_clean($req->get_param('last'), 40),
            'org' => rcm_clean($req->get_param('org'), 80),
            'state' => in_array($state, self::US_STATE_CODES, true) ? $state : '',
            'city' => rcm_clean($req->get_param('city'), 40),
        ];
    }

    /** @return array{total:int,rows:array}|\WP_Error */
    private static function npi(array $c): array|\WP_Error
    {
        // NPPES wildcards need at least two characters before the asterisk.
        $wild = static fn(string $s): string => mb_strlen($s) >= 2 ? $s . '*' : $s;
        $params = ['version' => '2.1', 'limit' => '25'];
        if ($c['number'] !== '') {
            $params['number'] = $c['number'];
        }
        if ($c['first'] !== '') {
            $params['first_name'] = $wild($c['first']);
        }
        if ($c['last'] !== '') {
            $params['last_name'] = $wild($c['last']);
        }
        if ($c['org'] !== '') {
            $params['organization_name'] = $wild($c['org']);
        }
        if ($c['state'] !== '') {
            $params['state'] = $c['state'];
        }
        if ($c['city'] !== '') {
            $params['city'] = $c['city'];
        }
        $query = str_replace('%2A', '*', http_build_query($params, '', '&', PHP_QUERY_RFC3986));
        $data = self::fetch_json('https://npiregistry.cms.hhs.gov/api/?' . $query);
        if (is_wp_error($data)) {
            return $data;
        }
        if (!empty($data['Errors']) && is_array($data['Errors'])) {
            $messages = [];
            foreach ($data['Errors'] as $e) {
                if (is_array($e) && !empty($e['description'])) {
                    $messages[] = rcm_clean($e['description'], 200);
                }
            }
            return new \WP_Error('npi', $messages ? implode('; ', $messages) : __('The NPI Registry could not run this search.', 'rcm'));
        }

        $rows = [];
        foreach ((isset($data['results']) && is_array($data['results'])) ? $data['results'] : [] as $r) {
            if (!is_array($r)) {
                continue;
            }
            $b = isset($r['basic']) && is_array($r['basic']) ? $r['basic'] : [];
            $is_org = ($r['enumeration_type'] ?? '') === 'NPI-2';
            if ($is_org) {
                $name = (string) ($b['organization_name'] ?? '');
            } else {
                $parts = [];
                foreach (['first_name', 'middle_name', 'last_name', 'credential'] as $k) {
                    if (isset($b[$k]) && is_scalar($b[$k]) && (string) $b[$k] !== '') {
                        $parts[] = (string) $b[$k];
                    }
                }
                $name = implode(' ', $parts);
            }

            $taxonomies = isset($r['taxonomies']) && is_array($r['taxonomies']) ? $r['taxonomies'] : [];
            $tax = null;
            foreach ($taxonomies as $t) {
                if (is_array($t) && !empty($t['primary'])) {
                    $tax = $t;
                    break;
                }
            }
            $tax ??= (isset($taxonomies[0]) && is_array($taxonomies[0])) ? $taxonomies[0] : null;

            $addresses = isset($r['addresses']) && is_array($r['addresses']) ? $r['addresses'] : [];
            $loc = null;
            foreach ($addresses as $a) {
                if (is_array($a) && ($a['address_purpose'] ?? '') === 'LOCATION') {
                    $loc = $a;
                    break;
                }
            }
            $loc ??= (isset($addresses[0]) && is_array($addresses[0])) ? $addresses[0] : null;

            $status = (string) ($b['status'] ?? '');
            $detail = array_filter([
                $is_org ? __('Organization (Type 2)', 'rcm') : __('Individual (Type 1)', 'rcm'),
                is_array($tax) ? (string) ($tax['desc'] ?? '') : '',
                is_array($loc) ? trim((string) ($loc['city'] ?? '') . ', ' . (string) ($loc['state'] ?? ''), ', ') : '',
                $status === 'A' ? __('Active', 'rcm') : ($status !== '' ? sprintf(__('Status %s', 'rcm'), $status) : ''),
            ], static fn($s) => $s !== '');

            $rows[] = [
                'code' => rcm_clean($r['number'] ?? '', 10),
                'title' => rcm_clean($name, 200) ?: __('Unnamed provider', 'rcm'),
                'detail' => rcm_clean(implode(' · ', $detail), 400),
            ];
        }
        $total = isset($data['result_count']) && is_numeric($data['result_count']) ? (int) $data['result_count'] : count($rows);
        return ['total' => $total, 'rows' => $rows];
    }

    /* ------------------------------------------------------------------ */
    /*  Small helpers                                                      */
    /* ------------------------------------------------------------------ */

    /** Suffix shown inside an input for a unit ('' when none). */
    public static function unit_suffix(string $unit): string
    {
        return self::UNIT_SUFFIX[$unit] ?? '';
    }

    /** Human label for a tool kind. */
    public static function kind_label(string $kind): string
    {
        return match ($kind) {
            'calculator' => __('Calculator', 'rcm'),
            'checklist' => __('Checklist', 'rcm'),
            'lookup' => __('Lookup', 'rcm'),
            'glossary' => __('Glossary', 'rcm'),
            'guide' => __('Guide', 'rcm'),
            default => ucfirst($kind),
        };
    }

    private static function icon(string $name, string $class = 'h-4 w-4'): string
    {
        return wp_kses(rcm_icon($name, $class), rcm_svg_kses());
    }

    private static function uid(string $prefix): string
    {
        return $prefix . '-' . (++self::$uid);
    }

    /** Number as a plain string for attributes and input values (no grouping, no exponent). */
    private static function num(mixed $v): string
    {
        if (is_int($v)) {
            return (string) $v;
        }
        if (!is_numeric($v)) {
            return '';
        }
        $f = (float) $v;
        if (floor($f) === $f && abs($f) < 1e15) {
            return (string) (int) $f;
        }
        return rtrim(rtrim(number_format($f, 6, '.', ''), '0'), '.');
    }

    /** Field id safe for HTML ids while keeping the case used by compute(). */
    private static function field_id(mixed $id): string
    {
        return preg_replace('/[^A-Za-z0-9_-]/', '', (string) $id) ?? '';
    }

    private static function str(array $a, string $k): string
    {
        return isset($a[$k]) && is_scalar($a[$k]) ? (string) $a[$k] : '';
    }

    private static function items_of(array $a, string $k): array
    {
        return isset($a[$k]) && is_array($a[$k]) ? array_values(array_filter($a[$k], 'is_array')) : [];
    }

    private static function strings(array $a, string $k): array
    {
        return isset($a[$k]) && is_array($a[$k]) ? array_values(array_filter(array_map(static fn($s) => is_scalar($s) ? (string) $s : '', $a[$k]), 'strlen')) : [];
    }

    private static function tool_name(\WP_Post $tool, array $d): string
    {
        return $tool->post_title !== '' ? $tool->post_title : self::str($d, 'name');
    }

    private static function lower_first(string $s): string
    {
        return mb_strtolower($s);
    }

    /* ------------------------------------------------------------------ */
    /*  Tool page rendering                                                */
    /* ------------------------------------------------------------------ */

    /**
     * Interactive area of a tool page. For calculators the formula, worked
     * example, assumptions and benchmarks follow the runner unless
     * $with_details is false (then place render_details() yourself).
     */
    public static function render(\WP_Post $tool, bool $with_details = true): string
    {
        $d = Content_Types::data($tool);
        $kind = self::str($d, 'kind');
        $key = Content_Types::key($tool);
        $name = self::tool_name($tool, $d);

        if ($kind === 'calculator') {
            $html = self::calculator($d, $key, $name);
            if ($with_details) {
                $html .= '<div class="mt-14">' . self::render_details($tool) . '</div>';
            }
            return $html;
        }
        return self::reference($d, $key, $name);
    }

    /** Quick answer, formula, worked example, assumptions and benchmarks for a calculator. */
    public static function render_details(\WP_Post $tool): string
    {
        $d = Content_Types::data($tool);
        if (self::str($d, 'kind') !== 'calculator') {
            return '';
        }
        $name = self::tool_name($tool, $d);
        $inputs = self::items_of($d, 'inputs');
        $outputs = self::items_of($d, 'outputs');
        $example = isset($d['example']) && is_array($d['example']) ? $d['example'] : [];
        $ex_in = isset($example['inputs']) && is_array($example['inputs']) ? $example['inputs'] : [];
        $ex_out = isset($example['expected']) && is_array($example['expected']) ? $example['expected'] : [];

        $h = '<div class="space-y-12">';

        $definition = self::str($d, 'definition');
        if ($definition !== '') {
            /* translators: %s: calculator name in lower case */
            $h .= self::quick_answer(sprintf(__('What does the %s measure?', 'rcm'), self::lower_first($name)), $definition);
        }

        $formula = self::items_of($d, 'formula');
        if ($formula) {
            $h .= '<section aria-labelledby="rcm-formula-h"><h2 id="rcm-formula-h" class="text-2xl font-bold">' . esc_html__('Formula', 'rcm') . '</h2><div class="mt-5 space-y-4">';
            foreach ($formula as $f) {
                $h .= '<div class="rounded-xl border border-line bg-canvas p-4">'
                    . '<p class="font-mono text-[15px] font-semibold text-navy-900">' . esc_html(self::str($f, 'expression')) . '</p>'
                    . (self::str($f, 'explanation') !== '' ? '<p class="mt-2 text-[15px] text-ink-muted">' . esc_html(self::str($f, 'explanation')) . '</p>' : '')
                    . '</div>';
            }
            $h .= '</div></section>';
        }

        if ($ex_in || $ex_out) {
            $h .= '<section aria-labelledby="rcm-example-h"><h2 id="rcm-example-h" class="text-2xl font-bold">' . esc_html__('Worked example', 'rcm') . '</h2>';
            if (self::str($example, 'narrative') !== '') {
                $h .= '<p class="mt-3 text-[16px] leading-relaxed text-ink-muted">' . esc_html(self::str($example, 'narrative')) . '</p>';
            }
            $h .= '<div class="mt-4 overflow-x-auto rounded-xl border border-line"><table class="w-full text-left text-sm"><tbody class="divide-y divide-line">';
            foreach ($inputs as $i) {
                $id = (string) ($i['id'] ?? '');
                if (!isset($ex_in[$id]) || !is_numeric($ex_in[$id]) || (!empty($i['optional']) && !(float) $ex_in[$id])) {
                    continue;
                }
                $h .= '<tr><th scope="row" class="bg-canvas px-4 py-2 font-medium text-navy-800">' . esc_html(self::str($i, 'label')) . '</th>'
                    . '<td class="px-4 py-2 tabular-nums">' . esc_html(rcm_fmt((float) $ex_in[$id], self::str($i, 'unit'))) . '</td></tr>';
            }
            foreach ($outputs as $o) {
                $id = (string) ($o['id'] ?? '');
                if (!array_key_exists($id, $ex_out)) {
                    continue;
                }
                $val = is_numeric($ex_out[$id]) ? (float) $ex_out[$id] : null;
                $h .= '<tr><th scope="row" class="bg-teal-50 px-4 py-2 font-semibold text-navy-900">' . esc_html(self::str($o, 'label')) . '</th>'
                    . '<td class="px-4 py-2 font-semibold tabular-nums text-teal-800">' . esc_html(rcm_fmt($val, self::str($o, 'unit'))) . '</td></tr>';
            }
            $h .= '</tbody></table></div></section>';
        }

        $assumptions = self::strings($d, 'assumptions');
        if ($assumptions) {
            $h .= '<section aria-labelledby="rcm-assume-h"><h2 id="rcm-assume-h" class="text-2xl font-bold">' . esc_html__('Assumptions and limits', 'rcm') . '</h2><ul class="mt-4 list-disc space-y-2 pl-5 text-[15.5px] text-ink-muted">';
            foreach ($assumptions as $a) {
                $h .= '<li>' . esc_html($a) . '</li>';
            }
            $h .= '</ul></section>';
        }

        $benchmarks = self::items_of($d, 'benchmarks');
        if ($benchmarks) {
            $h .= '<section aria-labelledby="rcm-bench-h"><h2 id="rcm-bench-h" class="text-2xl font-bold">' . esc_html__('Published benchmarks', 'rcm') . '</h2>'
                . '<p class="mt-2 text-sm text-ink-subtle">' . esc_html__('Context only. Benchmarks vary by specialty, payer mix and how the metric is measured; they are not targets or promises.', 'rcm') . '</p><ul class="mt-4 space-y-3">';
            foreach ($benchmarks as $b) {
                $as_of = self::str($b, 'asOf');
                $ts = $as_of !== '' ? strtotime($as_of . ' 12:00:00 UTC') : false;
                $date = $ts ? wp_date('F j, Y', $ts, new \DateTimeZone('UTC')) : '';
                $url = self::str($b, 'sourceUrl');
                $source = self::str($b, 'source');
                $h .= '<li class="card p-4 text-[15px]"><p class="text-navy-900">' . esc_html(self::str($b, 'text')) . '</p><p class="mt-1.5 text-sm text-ink-muted">' . esc_html__('Source:', 'rcm') . ' ';
                $h .= $url !== ''
                    ? '<a href="' . esc_url($url) . '" class="font-medium text-teal-700 underline" target="_blank" rel="noopener">' . esc_html($source !== '' ? $source : $url) . '</a>'
                    : esc_html($source);
                $h .= ($date ? ', ' . esc_html((string) $date) : '') . '</p></li>';
            }
            $h .= '</ul></section>';
        }

        return $h . '</div>';
    }

    private static function quick_answer(string $question, string $answer): string
    {
        return '<div class="rounded-2xl border border-teal-200 bg-teal-50/70 p-5 sm:p-6">'
            . '<p class="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700">' . esc_html__('Quick answer', 'rcm') . '</p>'
            . '<h2 class="mt-1.5 text-lg font-semibold sm:text-xl">' . esc_html($question) . '</h2>'
            . '<p class="mt-2 text-[16.5px] leading-relaxed text-navy-800">' . esc_html($answer) . '</p></div>';
    }

    /* ---------------------------- Calculator --------------------------- */

    private static function calculator(array $d, string $key, string $name): string
    {
        $inputs = self::items_of($d, 'inputs');
        $outputs = self::items_of($d, 'outputs');
        $primary = array_values(array_filter($outputs, static fn($o) => !empty($o['primary'])));
        $secondary = array_values(array_filter($outputs, static fn($o) => empty($o['primary'])));
        $p = self::uid('rcm-calc');
        $wide = count($inputs) < 4;

        $h = '<div class="rcm-calc grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]" data-rcm-calc="' . esc_attr($key) . '" data-rcm-calc-name="' . esc_attr($name) . '">';

        /* Inputs */
        /* translators: %s: calculator name */
        $h .= '<form class="card p-5 sm:p-6" novalidate aria-label="' . esc_attr(sprintf(__('%s inputs', 'rcm'), $name)) . '" data-rcm-calc-form>'
            . '<div class="flex items-center justify-between gap-4"><h2 class="text-lg font-semibold">' . esc_html__('Your numbers', 'rcm') . '</h2>'
            . '<button type="button" class="no-print print:hidden inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-ink-muted hover:text-navy-900" data-rcm-calc-reset>'
            . self::icon('RotateCcw') . ' ' . esc_html__('Reset', 'rcm') . '</button></div>'
            . '<div class="mt-5 grid gap-4 sm:grid-cols-2">';

        foreach ($inputs as $i) {
            $fid = self::field_id($i['id'] ?? '');
            if ($fid === '') {
                continue;
            }
            $unit = self::str($i, 'unit');
            $optional = !empty($i['optional']);
            $default = $i['default'] ?? 0;
            $value = ($optional && !(float) $default) ? '' : self::num($default);
            $suffix = self::unit_suffix($unit);
            $prefix = $unit === 'usd';
            $id = $p . '-' . $fid;
            $help = self::str($i, 'help');
            $label = self::str($i, 'label');
            $input_class = 'field' . ($prefix ? ' pl-7' : ($suffix !== '' ? ' pr-14' : ''));

            $h .= '<div' . ($wide ? ' class="sm:col-span-2"' : '') . ' data-rcm-field="' . esc_attr($fid) . '">'
                . '<label for="' . esc_attr($id) . '" class="field-label">' . esc_html($label)
                . ($optional ? '<span class="font-normal text-ink-subtle"> ' . esc_html__('(optional)', 'rcm') . '</span>' : '')
                . '</label><div class="relative">'
                . ($prefix ? '<span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" aria-hidden="true">$</span>' : '')
                . '<input id="' . esc_attr($id) . '" name="' . esc_attr($fid) . '" type="text" inputmode="decimal" autocomplete="off"'
                . ' value="' . esc_attr($value) . '" class="' . esc_attr($input_class) . '"'
                . ' data-rcm-input="' . esc_attr($fid) . '" data-label="' . esc_attr($label) . '" data-unit="' . esc_attr($unit) . '"'
                . ' data-default="' . esc_attr($value) . '"'
                . (isset($i['min']) && is_numeric($i['min']) ? ' data-min="' . esc_attr(self::num($i['min'])) . '"' : '')
                . (isset($i['max']) && is_numeric($i['max']) ? ' data-max="' . esc_attr(self::num($i['max'])) . '"' : '')
                . ($optional ? ' data-optional="1"' : '')
                . ($help !== '' ? ' aria-describedby="' . esc_attr($id . '-help') . '"' : '')
                . '>'
                . (!$prefix && $suffix !== '' ? '<span class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-sm text-ink-subtle" aria-hidden="true">' . esc_html($suffix) . '</span>' : '')
                . '</div>'
                . '<p id="' . esc_attr($id . '-error') . '" class="field-error" data-rcm-error hidden></p>'
                . ($help !== '' ? '<p id="' . esc_attr($id . '-help') . '" class="mt-1 text-xs leading-relaxed text-ink-subtle" data-rcm-help>' . esc_html($help) . '</p>' : '')
                . '</div>';
        }
        $h .= '</div></form>';

        /* Results */
        $h .= '<section class="flex flex-col gap-4" aria-live="polite" aria-label="' . esc_attr__('Results', 'rcm') . '" data-rcm-calc-results>'
            . '<div class="rounded-2xl bg-navy-900 p-5 text-white sm:p-6">'
            . '<p class="text-xs font-semibold uppercase tracking-[0.14em] text-teal-300">' . esc_html__('Estimated result', 'rcm') . '</p>'
            . '<p class="mt-3 text-navy-200" data-rcm-calc-invalid hidden>' . esc_html__('Fix the highlighted inputs to see your result.', 'rcm') . '</p>'
            . '<noscript><p class="mt-3 text-navy-200">' . esc_html__('Turn on JavaScript to calculate your result. The formula and worked example below show how it is calculated.', 'rcm') . '</p></noscript>'
            . '<div class="mt-3 grid gap-4' . (count($primary) > 1 ? ' sm:grid-cols-2' : '') . '" data-rcm-calc-primary>';
        foreach ($primary as $o) {
            $h .= '<div><p class="text-sm text-navy-200">' . esc_html(self::str($o, 'label')) . '</p>'
                . '<p class="mt-1 font-display text-4xl font-extrabold tracking-tight text-white" data-rcm-out="' . esc_attr(self::field_id($o['id'] ?? '')) . '" data-unit="' . esc_attr(self::str($o, 'unit')) . '" data-label="' . esc_attr(self::str($o, 'label')) . '">'
                . esc_html__('Calculating…', 'rcm') . '</p></div>';
        }
        $h .= '</div>';
        if ($secondary) {
            $h .= '<dl class="mt-5 divide-y divide-white/10 border-t border-white/10" data-rcm-calc-secondary>';
            foreach ($secondary as $o) {
                $h .= '<div class="flex items-baseline justify-between gap-4 py-2.5"><dt class="text-sm text-navy-200">' . esc_html(self::str($o, 'label')) . '</dt>'
                    . '<dd class="shrink-0 font-semibold tabular-nums" data-rcm-out="' . esc_attr(self::field_id($o['id'] ?? '')) . '" data-unit="' . esc_attr(self::str($o, 'unit')) . '" data-label="' . esc_attr(self::str($o, 'label')) . '">'
                    . esc_html__('Calculating…', 'rcm') . '</dd></div>';
            }
            $h .= '</dl>';
        }
        $h .= '</div>'
            . '<div class="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="alert" data-rcm-calc-warnings hidden></div>'
            . '<div class="rounded-xl border border-sky-100 bg-sky-50 p-4 text-sm text-navy-800" data-rcm-calc-notes hidden></div>';

        /* Actions */
        $h .= '<div class="no-print print:hidden flex flex-wrap gap-2">'
            . '<button type="button" class="btn-outline btn-sm" data-rcm-calc-action="copy" disabled><span data-icon>' . self::icon('Copy') . '</span> ' . esc_html__('Copy results', 'rcm') . '</button>'
            . '<button type="button" class="btn-outline btn-sm" data-rcm-calc-action="share" disabled><span data-icon>' . self::icon('Link2') . '</span> ' . esc_html__('Share link', 'rcm') . '</button>'
            . '<button type="button" class="btn-outline btn-sm" data-rcm-calc-action="print" disabled><span data-icon>' . self::icon('Printer') . '</span> ' . esc_html__('Print or save PDF', 'rcm') . '</button>'
            . '<button type="button" class="btn-primary btn-sm" data-rcm-calc-action="send" aria-expanded="false" aria-controls="' . esc_attr($p . '-send') . '" disabled><span data-icon>' . self::icon('Send') . '</span> ' . esc_html__('Discuss these results', 'rcm') . '</button>'
            . '</div>'
            . '<p class="text-xs text-ink-subtle">' . esc_html__('Estimates only, based on your inputs and the assumptions below. Not a guarantee of results or professional advice. Inputs stay in your browser.', 'rcm') . '</p>';

        /* Send panel */
        $h .= '<div id="' . esc_attr($p . '-send') . '" class="no-print print:hidden card p-5" data-rcm-calc-send hidden>'
            . '<h3 class="text-base font-semibold">' . esc_html__('Send these results to our team', 'rcm') . '</h3>'
            . '<p class="mb-4 mt-1 text-sm text-ink-muted">' . esc_html__('We will reply by email. Your inputs and results are attached to your message.', 'rcm') . '</p>'
            . self::contact_form()
            . '</div>';

        return $h . '</section></div>';
    }

    /** Compact contact form from the Forms module (markup is built and escaped there). */
    private static function contact_form(): string
    {
        if (!class_exists(Forms::class) || !method_exists(Forms::class, 'render')) {
            $url = rcm_page_url('contact');
            return '<a class="btn-primary btn-sm" href="' . esc_url($url) . '">' . esc_html__('Contact Texas Solutions RCM', 'rcm') . '</a>';
        }
        ob_start();
        $returned = Forms::render('contact', ['source' => 'calculator', 'compact' => true, 'submit_label' => __('Send to Texas Solutions RCM', 'rcm')]);
        $echoed = (string) ob_get_clean();
        return $echoed . (is_string($returned) ? $returned : '');
    }

    /* ---------------------------- Reference ---------------------------- */

    private static function reference(array $d, string $key, string $name): string
    {
        $kind = self::str($d, 'kind');
        $lookup = self::str($d, 'lookup');
        $entries = self::items_of($d, 'entries');
        $sections = self::items_of($d, 'sections');

        $h = '<div class="min-w-0 space-y-10">';

        if ($kind === 'lookup') {
            if ($lookup === 'npi') {
                $h .= self::npi_lookup();
            } elseif ($lookup === 'icd10' || $lookup === 'hcpcs') {
                $h .= self::code_lookup($lookup);
            }
        }
        if ($kind === 'checklist' && $sections) {
            $h .= self::checklist($key, $sections);
        }
        if ($key === self::SCORECARD_KEY && $entries) {
            $h .= self::scorecard($entries)
                . '<section><h2 class="mb-4 text-2xl font-bold">' . esc_html__('KPI definitions', 'rcm') . '</h2>'
                . self::glossary($entries, __('KPIs', 'rcm'), false) . '</section>';
        } elseif (($kind === 'glossary' || $kind === 'guide') && $entries) {
            $h .= self::glossary($entries, $name, true);
        }

        $definition = self::str($d, 'definition');
        if ($definition !== '') {
            /* translators: %s: tool name in lower case */
            $h .= self::quick_answer(sprintf(__('What is the %s?', 'rcm'), self::lower_first($name)), $definition);
        }

        $sources = self::items_of($d, 'sources');
        if ($sources) {
            $h .= '<section><h2 class="text-xl font-bold">' . esc_html__('Sources', 'rcm') . '</h2><ul class="mt-3 space-y-2">';
            foreach ($sources as $s) {
                $url = self::str($s, 'url');
                if ($url === '') {
                    continue;
                }
                $h .= '<li><a href="' . esc_url($url) . '" class="inline-flex items-center gap-1.5 text-[15px] font-medium text-teal-700 underline" target="_blank" rel="noopener">'
                    . esc_html(self::str($s, 'label') ?: $url) . ' ' . self::icon('ExternalLink', 'h-3.5 w-3.5') . '</a></li>';
            }
            $h .= '</ul></section>';
        }

        if ($kind === 'lookup') {
            $h .= '<div class="notice-info">'
                . esc_html__('Results come straight from public government datasets and may lag official releases. Always confirm codes against the current code set and payer policy before billing.', 'rcm')
                . '</div>';
        }

        return $h . '</div>';
    }

    /** Searchable term list. */
    private static function glossary(array $entries, string $label, bool $show_tags): string
    {
        $id = self::uid('rcm-glossary');
        $tags = [];
        if ($show_tags) {
            foreach ($entries as $e) {
                $t = self::str($e, 'tag');
                if ($t !== '' && !in_array($t, $tags, true)) {
                    $tags[] = $t;
                }
            }
        }
        $total = count($entries);

        $h = '<div data-rcm-glossary>'
            . '<div class="no-print print:hidden flex flex-col gap-3 sm:flex-row sm:items-center">'
            . '<div class="relative flex-1"><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle">' . self::icon('Search') . '</span>'
            /* translators: %s: glossary name */
            . '<label for="' . esc_attr($id . '-q') . '" class="sr-only">' . esc_html(sprintf(__('Search %s', 'rcm'), $label)) . '</label>'
            /* translators: %d: number of entries */
            . '<input id="' . esc_attr($id . '-q') . '" type="search" autocomplete="off" class="field pl-10" placeholder="' . esc_attr(sprintf(__('Search %d entries…', 'rcm'), $total)) . '" data-rcm-glossary-search></div>';
        if (count($tags) > 1) {
            $h .= '<select class="field sm:w-56" aria-label="' . esc_attr__('Filter by topic', 'rcm') . '" data-rcm-glossary-tag><option value="">' . esc_html__('All topics', 'rcm') . '</option>';
            foreach ($tags as $t) {
                $h .= '<option value="' . esc_attr($t) . '">' . esc_html($t) . '</option>';
            }
            $h .= '</select>';
        }
        $h .= '</div>'
            /* translators: 1: shown count, 2: total count */
            . '<p class="mt-3 text-sm text-ink-subtle" aria-live="polite" data-rcm-glossary-count>' . esc_html(sprintf(__('Showing %1$d of %2$d', 'rcm'), $total, $total)) . '</p>'
            . '<dl class="mt-4 divide-y divide-line rounded-2xl border border-line bg-white">';
        foreach ($entries as $e) {
            $tag = self::str($e, 'tag');
            $h .= '<div class="grid gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-6" data-rcm-entry data-tag="' . esc_attr($tag) . '">'
                . '<dt class="font-semibold text-navy-900">' . esc_html(self::str($e, 'term'))
                . ($show_tags && $tag !== '' ? '<span class="ml-2 align-middle text-[11px] font-medium uppercase tracking-wide text-teal-700 sm:ml-0 sm:mt-1 sm:block">' . esc_html($tag) . '</span>' : '')
                . '</dt><dd class="text-[15px] leading-relaxed text-ink-muted">' . esc_html(self::str($e, 'meaning')) . '</dd></div>';
        }
        $h .= '<p class="px-5 py-8 text-center text-ink-muted" data-rcm-glossary-empty hidden>' . esc_html__('No matches. Try a different word.', 'rcm') . '</p>';
        return $h . '</dl></div>';
    }

    /** Tickable, printable checklist; ticks are remembered in this browser. */
    private static function checklist(string $key, array $sections): string
    {
        $id = self::uid('rcm-check');
        $total = 0;
        foreach ($sections as $s) {
            $total += count(self::items_of($s, 'items'));
        }

        $h = '<div data-rcm-checklist="' . esc_attr($key) . '">'
            . '<div class="no-print print:hidden sticky top-[72px] z-20 -mx-1 mb-6 flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white/95 px-4 py-3 backdrop-blur">'
            . '<div class="flex-1">'
            /* translators: 1: done count, 2: total */
            . '<p class="text-sm font-semibold text-navy-900" data-rcm-checklist-count>' . esc_html(sprintf(__('%1$d of %2$d done', 'rcm'), 0, $total)) . '</p>'
            . '<div class="mt-1.5 h-2 overflow-hidden rounded-full bg-canvas" role="progressbar" aria-valuemin="0" aria-valuemax="' . esc_attr((string) $total) . '" aria-valuenow="0" aria-label="' . esc_attr__('Checklist progress', 'rcm') . '" data-rcm-checklist-progress>'
            . '<div class="h-full rounded-full bg-teal-500 transition-all" style="width:0%" data-rcm-checklist-bar></div></div>'
            . '</div>'
            . '<button type="button" class="btn-outline btn-sm" data-rcm-checklist-clear>' . self::icon('RotateCcw') . ' ' . esc_html__('Clear', 'rcm') . '</button>'
            . '<button type="button" class="btn-navy btn-sm" data-rcm-checklist-print>' . self::icon('Printer') . ' ' . esc_html__('Print', 'rcm') . '</button>'
            . '</div><div class="space-y-8">';

        foreach ($sections as $si => $s) {
            $hid = $id . '-s' . $si;
            $h .= '<section aria-labelledby="' . esc_attr($hid) . '"><h2 id="' . esc_attr($hid) . '" class="mb-3 text-xl font-bold">' . esc_html(self::str($s, 'title')) . '</h2><ul class="space-y-2">';
            foreach (self::items_of($s, 'items') as $ii => $it) {
                $item_id = $si . '-' . $ii;
                $detail = self::str($it, 'detail');
                $h .= '<li><label class="group flex cursor-pointer gap-3 rounded-xl border border-line bg-white p-4 transition hover:border-navy-200 has-[:checked]:border-teal-200 has-[:checked]:bg-teal-50/50">'
                    . '<input type="checkbox" class="peer sr-only" value="' . esc_attr($item_id) . '" data-rcm-check>'
                    . '<span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 border-navy-200 text-white peer-checked:border-teal-600 peer-checked:bg-teal-600 peer-focus-visible:ring-2 peer-focus-visible:ring-teal-500" aria-hidden="true">'
                    . '<span class="opacity-0 group-has-[:checked]:opacity-100">' . self::icon('Check', 'h-3.5 w-3.5') . '</span></span>'
                    . '<span><span class="block font-medium text-navy-900 group-has-[:checked]:text-ink-muted group-has-[:checked]:line-through group-has-[:checked]:decoration-teal-400">' . esc_html(self::str($it, 'text')) . '</span>'
                    . ($detail !== '' ? '<span class="mt-1 block text-sm leading-relaxed text-ink-muted">' . esc_html($detail) . '</span>' : '')
                    . '</span></label></li>';
            }
            $h .= '</ul></section>';
        }
        return $h . '</div></div>';
    }

    /** Compare KPIs with the visitor's own targets. */
    private static function scorecard(array $entries): string
    {
        $h = '<div data-rcm-scorecard>'
            . '<div class="mb-5 rounded-2xl bg-navy-900 p-5 text-white">'
            . '<p class="text-sm text-navy-200">' . esc_html__('Your scorecard', 'rcm') . '</p>'
            . '<p class="mt-1 font-display text-3xl font-extrabold" aria-live="polite" data-rcm-score-summary>' . esc_html__('Enter your numbers below', 'rcm') . '</p>'
            . '<p class="mt-1 text-sm text-navy-200">' . esc_html__('Set targets that fit your specialty and payer mix. Benchmarks quoted in the definitions are context, not targets.', 'rcm') . '</p>'
            . '</div>'
            . '<div class="overflow-x-auto rounded-2xl border border-line bg-white"><table class="w-full min-w-[640px] text-left text-sm">'
            . '<thead class="bg-canvas text-navy-900"><tr>'
            . '<th class="px-4 py-3 font-semibold" scope="col">' . esc_html__('KPI', 'rcm') . '</th>'
            . '<th class="px-4 py-3 font-semibold" scope="col">' . esc_html__('Your current', 'rcm') . '</th>'
            . '<th class="px-4 py-3 font-semibold" scope="col">' . esc_html__('Your target', 'rcm') . '</th>'
            . '<th class="px-4 py-3 font-semibold" scope="col">' . esc_html__('Status', 'rcm') . '</th>'
            . '</tr></thead><tbody class="divide-y divide-line">';

        foreach ($entries as $e) {
            $term = self::str($e, 'term');
            $unit = self::str($e, 'tag') === 'days' ? __('days', 'rcm') : '%';
            $lower = (bool) preg_match('/lower is better/i', self::str($e, 'meaning'));
            $h .= '<tr data-rcm-score-row data-unit="' . esc_attr($unit) . '">'
                . '<th scope="row" class="px-4 py-3 align-top font-medium text-navy-900">' . esc_html($term)
                . '<span class="block text-xs font-normal text-ink-subtle" data-rcm-score-dir>' . esc_html($lower ? __('Lower is better', 'rcm') : __('Higher is better', 'rcm')) . '</span></th>';
            foreach (['current' => __('current', 'rcm'), 'target' => __('target', 'rcm')] as $k => $k_label) {
                $h .= '<td class="px-4 py-3 align-top"><div class="relative w-32">'
                    . '<input type="text" inputmode="decimal" autocomplete="off" class="field py-2 pr-12" aria-label="' . esc_attr($term . ' ' . $k_label) . '" data-rcm-score="' . esc_attr($k) . '">'
                    . '<span class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-ink-subtle" aria-hidden="true">' . esc_html($unit) . '</span>'
                    . '</div></td>';
            }
            $h .= '<td class="px-4 py-3 align-top" data-rcm-score-status><span class="text-ink-subtle">' . esc_html__('Not scored', 'rcm') . '</span></td></tr>';
        }
        return $h . '</tbody></table></div></div>';
    }

    /** ICD-10-CM / HCPCS search as you type. */
    private static function code_lookup(string $type): string
    {
        $id = self::uid('rcm-code');
        $placeholder = $type === 'icd10' ? __('e.g. type 2 diabetes, E11.9, low back pain', 'rcm') : __('e.g. wheelchair, J1100, glucose monitor', 'rcm');
        return '<div data-rcm-lookup="' . esc_attr($type) . '">'
            . '<label for="' . esc_attr($id) . '" class="field-label">' . esc_html__('Search by keyword or code', 'rcm') . '</label>'
            . '<div class="relative"><span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle">' . self::icon('Search') . '</span>'
            . '<input id="' . esc_attr($id) . '" type="search" class="field py-3 pl-10 text-base" autocomplete="off" maxlength="80" placeholder="' . esc_attr($placeholder) . '" data-rcm-lookup-input>'
            . '<span class="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-subtle" data-rcm-lookup-busy hidden>' . self::icon('Loader2', 'h-4 w-4 animate-spin') . '</span>'
            . '</div>'
            . '<noscript><p class="mt-3 text-sm text-ink-muted">' . esc_html__('This search needs JavaScript turned on.', 'rcm') . '</p></noscript>'
            . self::lookup_results(__('No codes found. Try a broader term.', 'rcm'))
            . '</div>';
    }

    /** NPI Registry search form. */
    private static function npi_lookup(): string
    {
        $id = self::uid('rcm-npi');
        $field = static fn(string $name, string $label, string $extra = '', string $wrap = '') => '<div' . ($wrap !== '' ? ' class="' . esc_attr($wrap) . '"' : '') . '>'
            . '<label for="' . esc_attr($id . '-' . $name) . '" class="field-label">' . esc_html($label) . '</label>'
            . '<input id="' . esc_attr($id . '-' . $name) . '" name="' . esc_attr($name) . '" type="text" class="field" autocomplete="off"' . $extra . '></div>';

        $states = '<option value="">' . esc_html__('Any state', 'rcm') . '</option>';
        foreach (self::US_STATE_CODES as $s) {
            $states .= '<option value="' . esc_attr($s) . '">' . esc_html($s) . '</option>';
        }

        return '<div data-rcm-lookup="npi">'
            . '<form class="card grid gap-4 p-5 sm:grid-cols-2" novalidate data-rcm-lookup-form>'
            . $field('number', __('NPI number', 'rcm'), ' inputmode="numeric" maxlength="10" placeholder="' . esc_attr__('10 digits', 'rcm') . '"', 'sm:col-span-2')
            . '<p class="text-sm text-ink-subtle sm:col-span-2">' . esc_html__('Or search by name:', 'rcm') . '</p>'
            . $field('first', __('First name', 'rcm'), ' maxlength="40"')
            . $field('last', __('Last name', 'rcm'), ' maxlength="40"')
            . $field('org', __('Organization name', 'rcm'), ' maxlength="80"', 'sm:col-span-2')
            . '<div><label for="' . esc_attr($id . '-state') . '" class="field-label">' . esc_html__('State', 'rcm') . '</label>'
            . '<select id="' . esc_attr($id . '-state') . '" name="state" class="field">' . $states . '</select></div>'
            . $field('city', __('City', 'rcm'), ' maxlength="40"')
            . '<div class="sm:col-span-2"><button type="submit" class="btn-primary" data-rcm-lookup-submit>'
            . '<span data-rcm-lookup-idle>' . self::icon('Search') . '</span><span data-rcm-lookup-busy hidden>' . self::icon('Loader2', 'h-4 w-4 animate-spin') . '</span> '
            . esc_html__('Search the NPI Registry', 'rcm') . '</button></div>'
            . '<noscript><p class="text-sm text-ink-muted sm:col-span-2">' . esc_html__('This search needs JavaScript turned on.', 'rcm') . '</p></noscript>'
            . '</form>'
            . self::lookup_results(__('No providers matched. Check the spelling or remove a filter.', 'rcm'))
            . '</div>';
    }

    private static function lookup_results(string $empty): string
    {
        return '<p role="alert" class="mt-3 text-sm text-red-600" data-rcm-lookup-error hidden></p>'
            . '<p class="mt-4 text-ink-muted" data-rcm-lookup-empty hidden>' . esc_html($empty) . '</p>'
            . '<div class="mt-5" data-rcm-lookup-results hidden>'
            . '<p class="mb-2 text-sm text-ink-subtle" aria-live="polite" data-rcm-lookup-count></p>'
            . '<ul class="divide-y divide-line rounded-2xl border border-line bg-white" data-rcm-lookup-list></ul>'
            . '</div>';
    }

    /* ------------------------------------------------------------------ */
    /*  /tools directory                                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Interactive tool directory for the rcm_tool archive. Filters on the
     * server from ?category= and ?q= (so it works without JavaScript) and in
     * the browser via tools.js. The caller provides the section/container wrapper.
     */
    public static function directory(): string
    {
        $categories = Content_Types::TOOL_CATEGORIES;
        // phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only filters
        $cat = isset($_GET['category']) ? sanitize_key(wp_unslash((string) $_GET['category'])) : '';
        $q = isset($_GET['q']) ? rcm_clean(wp_unslash((string) $_GET['q']), 80) : '';
        // phpcs:enable
        if (!isset($categories[$cat])) {
            $cat = '';
        }
        $archive = (string) get_post_type_archive_link(Content_Types::TOOL);
        $terms = array_values(array_filter(preg_split('/\s+/u', mb_strtolower($q)) ?: [], 'strlen'));

        $items = [];
        $counts = array_fill_keys(array_keys($categories), 0);
        foreach (Content_Types::all(Content_Types::TOOL) as $post) {
            $d = Content_Types::data($post);
            $category = Content_Types::tool_category($post);
            $summary = self::str($d, 'summary') ?: (string) $post->post_excerpt;
            $name = self::tool_name($post, $d);
            $haystack = mb_strtolower($name . ' ' . $summary . ' ' . implode(' ', self::strings($d, 'keywords')));
            $match = ($cat === '' || $category === $cat);
            foreach ($terms as $t) {
                if (!str_contains($haystack, $t)) {
                    $match = false;
                    break;
                }
            }
            if (isset($counts[$category])) {
                $counts[$category]++;
            }
            $items[] = ['post' => $post, 'name' => $name, 'summary' => $summary, 'kind' => self::str($d, 'kind'), 'category' => $category, 'search' => $haystack, 'match' => $match];
        }
        $shown = count(array_filter($items, static fn($i) => $i['match']));
        $tab_on = 'border-navy-900 bg-navy-900 text-white';
        $tab_off = 'border-line bg-white text-navy-800 hover:border-navy-300';

        $h = '<div data-rcm-tool-directory data-base="' . esc_url($archive) . '" data-tab-on="' . esc_attr($tab_on) . '" data-tab-off="' . esc_attr($tab_off) . '">'
            . '<div class="flex flex-col gap-4">'
            . '<form role="search" method="get" action="' . esc_url($archive) . '" class="relative max-w-xl" data-rcm-tool-form>'
            . '<span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle">' . self::icon('Search', 'h-5 w-5') . '</span>'
            . '<label for="rcm-tool-q" class="sr-only">' . esc_html__('Search tools', 'rcm') . '</label>'
            . '<input id="rcm-tool-q" type="search" name="q" value="' . esc_attr($q) . '" autocomplete="off" maxlength="80" class="field rounded-full py-3.5 pl-12 text-base" placeholder="' . esc_attr__('Search tools, e.g. denial, AR, ROI, dental', 'rcm') . '" data-rcm-tool-search>'
            . ($cat !== '' ? '<input type="hidden" name="category" value="' . esc_attr($cat) . '" data-rcm-tool-cat-input>' : '')
            . '</form>'
            . '<nav class="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4" aria-label="' . esc_attr__('Tool categories', 'rcm') . '">';

        $tabs = ['' => [__('All tools', 'rcm'), '']] + $categories;
        foreach ($tabs as $id => $c) {
            $active = $cat === (string) $id;
            $count = $id === '' ? count($items) : ($counts[$id] ?? 0);
            $href = $id === '' ? $archive : add_query_arg('category', $id, $archive);
            $h .= '<a href="' . esc_url($href) . '" class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition ' . esc_attr($active ? $tab_on : $tab_off) . '"'
                . ' data-rcm-cat="' . esc_attr((string) $id) . '" data-blurb="' . esc_attr((string) ($c[1] ?? '')) . '"' . ($active ? ' aria-current="true"' : '') . '>'
                . esc_html((string) $c[0])
                . '<span class="ml-1.5 text-xs ' . ($active ? 'text-navy-200' : 'text-ink-subtle') . '" data-rcm-cat-count>' . esc_html((string) $count) . '</span></a>';
        }
        $h .= '</nav>'
            . '<p class="text-ink-muted" data-rcm-tool-blurb' . ($cat === '' ? ' hidden' : '') . '>' . esc_html($cat !== '' ? $categories[$cat][1] : '') . '</p>'
            . '</div>'
            . '<p class="mt-6 text-sm text-ink-subtle" aria-live="polite" data-rcm-tool-count>' . esc_html(sprintf(_n('%d tool', '%d tools', $shown, 'rcm'), $shown)) . '</p>'
            . '<ul class="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">';

        foreach ($items as $i) {
            $icon = self::KIND_ICONS[$i['kind']] ?? 'Calculator';
            $h .= '<li data-rcm-tool data-category="' . esc_attr($i['category']) . '" data-search="' . esc_attr($i['search']) . '"' . ($i['match'] ? '' : ' hidden') . '>'
                . '<a href="' . esc_url((string) get_permalink($i['post'])) . '" class="card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lift">'
                . '<span class="flex items-center justify-between">'
                . '<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 group-hover:bg-teal-600 group-hover:text-white">' . self::icon($icon, 'h-5 w-5') . '</span>'
                . '<span class="text-xs font-medium uppercase tracking-wide text-ink-subtle">' . esc_html(self::kind_label($i['kind'])) . '</span></span>'
                . '<span class="mt-4 text-[17px] font-semibold leading-snug text-navy-900 group-hover:text-teal-700">' . esc_html($i['name']) . '</span>'
                . '<span class="mt-2 text-[15px] leading-relaxed text-ink-muted">' . esc_html($i['summary']) . '</span>'
                . '<span class="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-teal-700">' . esc_html__('Open tool', 'rcm') . ' '
                . '<span class="transition group-hover:translate-x-0.5">' . self::icon('ArrowRight') . '</span></span>'
                . '</a></li>';
        }
        $h .= '</ul>'
            . '<div class="mt-6 rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted" data-rcm-tool-empty' . ($shown ? ' hidden' : '') . '>'
            . '<span data-rcm-tool-empty-text>' . esc_html($q !== '' ? sprintf(__('No tools match “%s”.', 'rcm'), $q) : __('No tools in this category yet.', 'rcm')) . '</span> '
            . '<a href="' . esc_url($archive) . '" class="font-semibold text-teal-700 underline" data-rcm-tool-clear>' . esc_html__('Clear search', 'rcm') . '</a>'
            . '</div>';

        return $h . '</div>';
    }
}
