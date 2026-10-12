<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Redirects (table rcm_redirects), 404 logging (table rcm_not_found),
 * automatic redirects when a published URL changes, and the
 * RCM > Redirects & 404s screen.
 *
 * Paths are stored decoded, relative to the site root, with a leading slash
 * and no trailing slash ("/old-page"); the root is "/". Matching ignores a
 * trailing slash and letter case, and keeps the request's query string.
 */
final class Redirects
{
    public const STATUSES = [301, 302, 307, 308, 410];
    private const NOT_FOUND_CAP = 2000;
    private const PER_PAGE = 50;
    private const IMPORT_MAX_ROWS = 5000;
    private const IMPORT_MAX_BYTES = 2097152;
    private const ALLOWED_EXTENSIONS = ['html', 'htm', 'shtml', 'pdf', 'xml', 'txt'];
    private const JUNK_FRAGMENTS = [
        '/wp-', '..', '/.', '/cgi-bin', 'phpmyadmin', 'pma/', 'xmlrpc', '/vendor/', 'wlwmanifest', '/administrator',
        '/boaform', 'eval-stdin', '/owa/', '/autodiscover', '/actuator', '/solr/', '/console', '/HNAP1', '/shell',
        '/setup-config', '/install.php', '/config.', '/backup', '/phpunit', '/telescope', '/_ignition', '/remote/login',
    ];

    public static function init(): void
    {
        add_action('template_redirect', [self::class, 'maybe_redirect'], 0);
        add_action('template_redirect', [self::class, 'legacy_blog_paths'], 1);
        add_action('template_redirect', [self::class, 'log_404'], 99);
        add_action('post_updated', [self::class, 'slug_changed'], 10, 3);

        add_action('admin_post_rcm_redirect_save', [self::class, 'save']);
        add_action('admin_post_rcm_redirect_delete', [self::class, 'delete']);
        add_action('admin_post_rcm_redirect_import', [self::class, 'import']);
        add_action('admin_post_rcm_redirect_export', [self::class, 'export']);
        add_action('admin_post_rcm_404_delete', [self::class, 'delete_404']);
        add_action('admin_post_rcm_404_clear', [self::class, 'clear_404']);
    }

    /**
     * Blog posts moved from /<slug>/ to /blog/<slug>/ (and /category/, /tag/ to /blog/...)
     * when the permalink structure gained the /blog/ prefix. 301 the old URLs.
     */
    public static function legacy_blog_paths(): void
    {
        if (!is_404()) {
            return;
        }
        $path = trim((string) wp_parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH), '/');
        if ($path === '' || str_starts_with($path, 'blog/')) {
            return;
        }
        $front = trim((string) $GLOBALS['wp_rewrite']->front, '/');
        if ($front === '') {
            return;
        }
        if (preg_match('#^(category|tag)/(.+)$#', $path, $m)) {
            wp_safe_redirect(home_url('/' . $front . '/' . $m[1] . '/' . $m[2] . '/'), 301);
            exit;
        }
        if (preg_match('#^[a-z0-9\-]+$#', $path)) {
            $post = get_page_by_path($path, OBJECT, 'post');
            if ($post && $post->post_status === 'publish') {
                wp_safe_redirect(get_permalink($post), 301);
                exit;
            }
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Paths                                                              */
    /* ------------------------------------------------------------------ */

    /** Site base path for subdirectory installs ('' at the domain root). */
    private static function base_path(): string
    {
        return rtrim((string) wp_parse_url(home_url(), PHP_URL_PATH), '/');
    }

    /**
     * Normalizes a path: query and fragment removed, percent-decoding,
     * duplicate slashes collapsed, leading slash, no trailing slash.
     * With $strip_base the site's base path is removed (for request URIs).
     */
    public static function normalize(string $path, bool $strip_base = false): string
    {
        $path = trim($path);
        if ($path === '') {
            return '';
        }
        if (preg_match('#^https?://#i', $path)) {
            $path = (string) wp_parse_url($path, PHP_URL_PATH);
        }
        $path = explode('#', explode('?', $path, 2)[0], 2)[0];
        $path = rawurldecode($path);
        $path = (string) preg_replace('/[\x00-\x1F\x7F]/u', '', $path);
        $path = (string) preg_replace('#/{2,}#', '/', $path);
        if ($strip_base) {
            $base = self::base_path();
            if ($base !== '' && ($path === $base || str_starts_with($path, $base . '/'))) {
                $path = substr($path, strlen($base));
            }
        }
        $path = '/' . trim($path, '/');
        return mb_substr($path, 0, 300);
    }

    private static function same_path(string $a, string $b): bool
    {
        return mb_strtolower($a) === mb_strtolower($b);
    }

    private static function is_internal(string $to): bool
    {
        if (str_starts_with($to, '/') && !str_starts_with($to, '//')) {
            return true;
        }
        $host = wp_parse_url($to, PHP_URL_HOST);
        $home = wp_parse_url(home_url(), PHP_URL_HOST);
        return is_string($host) && is_string($home) && strtolower($host) === strtolower($home);
    }

    /** Site-relative normalized path of an internal target. */
    private static function target_path(string $to): string
    {
        if (str_starts_with($to, '/') && !str_starts_with($to, '//')) {
            return self::normalize($to);
        }
        return self::normalize((string) wp_parse_url($to, PHP_URL_PATH), true);
    }

    /** Absolute URL for a stored target, with the request query string appended. */
    private static function target_url(string $to, string $query): string
    {
        $url = (str_starts_with($to, '/') && !str_starts_with($to, '//')) ? home_url($to) : $to;
        if ($query !== '') {
            $hash = '';
            if (str_contains($url, '#')) {
                [$url, $hash] = explode('#', $url, 2);
                $hash = '#' . $hash;
            }
            $url .= (str_contains($url, '?') ? '&' : '?') . $query . $hash;
        }
        return $url;
    }

    private static function find(string $path): ?array
    {
        global $wpdb;
        $t = rcm_table('redirects');
        $row = $wpdb->get_row($wpdb->prepare("SELECT id, from_path, to_url, status FROM {$t} WHERE from_path = %s LIMIT 1", $path), ARRAY_A);
        return is_array($row) ? $row : null;
    }

    /* ------------------------------------------------------------------ */
    /*  Front end                                                          */
    /* ------------------------------------------------------------------ */

    public static function maybe_redirect(): void
    {
        if (is_admin() || wp_doing_ajax() || wp_doing_cron() || (defined('REST_REQUEST') && REST_REQUEST) || is_preview()) {
            return;
        }
        $uri = (string) wp_unslash($_SERVER['REQUEST_URI'] ?? '');
        if ($uri === '') {
            return;
        }
        $path = self::normalize((string) wp_parse_url($uri, PHP_URL_PATH), true);
        if ($path === '' || $path === '/') {
            return;
        }
        $row = self::find($path);
        if (!$row) {
            return;
        }

        global $wpdb;
        $wpdb->query($wpdb->prepare('UPDATE ' . rcm_table('redirects') . ' SET hits = hits + 1, last_hit = %s WHERE id = %d', current_time('mysql', true), (int) $row['id']));

        $status = (int) $row['status'];
        if ($status === 410) {
            self::gone();
        }
        $to = (string) $row['to_url'];
        if ($to === '') {
            return;
        }
        if (self::is_internal($to) && self::same_path(self::target_path($to), $path)) {
            return; // never loop
        }
        $target = self::target_url($to, (string) wp_parse_url($uri, PHP_URL_QUERY));
        wp_redirect($target, in_array($status, [301, 302, 307, 308], true) ? $status : 301, 'RCM Redirects'); // phpcs:ignore WordPress.Security.SafeRedirect -- admin-defined targets may be external
        exit;
    }

    /** Sends 410 Gone with the theme's 404 template. */
    private static function gone(): never
    {
        global $wp_query;
        if ($wp_query instanceof \WP_Query) {
            $wp_query->set_404();
        }
        status_header(410);
        nocache_headers();
        $template = get_404_template();
        if ($template) {
            include $template;
        } else {
            wp_die(esc_html__('This page has been removed.', 'rcm'), esc_html__('Gone', 'rcm'), ['response' => 410]);
        }
        exit;
    }

    private static function is_junk(string $path): bool
    {
        $p = strtolower($path);
        foreach (self::JUNK_FRAGMENTS as $frag) {
            if (str_contains($p, strtolower($frag))) {
                return true;
            }
        }
        if (preg_match('/\.([a-z0-9]{1,8})$/', $p, $m) && !in_array($m[1], self::ALLOWED_EXTENSIONS, true)) {
            return true; // .php, .env, .sql, .zip, images...
        }
        if (preg_match('/^\/(admin|login|user|users|signin)(\/|$)/', $p)) {
            return true;
        }
        $ua = (string) ($_SERVER['HTTP_USER_AGENT'] ?? '');
        return trim($ua) === '';
    }

    public static function log_404(): void
    {
        if (!is_404() || is_admin()) {
            return;
        }
        $uri = (string) wp_unslash($_SERVER['REQUEST_URI'] ?? '');
        $path = self::normalize((string) wp_parse_url($uri, PHP_URL_PATH), true);
        if ($path === '' || $path === '/' || self::is_junk($path)) {
            return;
        }
        if (rcm_rate_limited('rcm_404_log', 30, 60)) {
            return;
        }
        $ref = '';
        if (!empty($_SERVER['HTTP_REFERER'])) {
            $raw = (string) wp_unslash($_SERVER['HTTP_REFERER']);
            $raw = explode('#', explode('?', $raw, 2)[0], 2)[0]; // no query strings (may carry personal data)
            $ref = mb_substr(esc_url_raw($raw, ['http', 'https']), 0, 300);
        }

        global $wpdb;
        $t = rcm_table('not_found');
        $wpdb->query($wpdb->prepare(
            "INSERT INTO {$t} (path, hits, last_hit, referrer) VALUES (%s, 1, %s, %s)
             ON DUPLICATE KEY UPDATE hits = hits + 1, last_hit = VALUES(last_hit), referrer = IF(VALUES(referrer) = '', referrer, VALUES(referrer))",
            $path,
            current_time('mysql', true),
            $ref
        ));
        if ((int) $wpdb->rows_affected === 1) {
            self::cap_404();
        }
    }

    /** Keeps the 404 log at NOT_FOUND_CAP rows by deleting the oldest. */
    private static function cap_404(): void
    {
        global $wpdb;
        $t = rcm_table('not_found');
        $count = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$t}");
        if ($count > self::NOT_FOUND_CAP) {
            $wpdb->query($wpdb->prepare("DELETE FROM {$t} ORDER BY last_hit ASC, id ASC LIMIT %d", $count - self::NOT_FOUND_CAP));
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Automatic redirects on URL change                                  */
    /* ------------------------------------------------------------------ */

    public static function slug_changed(int $post_id, \WP_Post $after, \WP_Post $before): void
    {
        if ($before->post_status !== 'publish' || $after->post_status !== 'publish') {
            return;
        }
        if (wp_is_post_revision($post_id) || wp_is_post_autosave($post_id) || !is_post_type_viewable($after->post_type)) {
            return;
        }
        if (in_array($after->post_type, ['attachment', 'rcm_faq', 'rcm_testimonial'], true)) {
            return;
        }
        if ($before->post_name === $after->post_name && (int) $before->post_parent === (int) $after->post_parent) {
            return;
        }
        $old_url = (string) get_permalink($before);
        $new_url = (string) get_permalink($after);
        if ($old_url === '' || $new_url === '' || str_contains($old_url, '?') || str_contains($new_url, '?')) {
            return; // plain permalinks: nothing stable to redirect
        }
        $old = self::normalize($old_url, true);
        $new = self::normalize($new_url, true);
        if ($old === '/' || self::same_path($old, $new)) {
            return;
        }
        // Keep the permalink's trailing slash on the target to avoid a second hop.
        $to = (string) wp_parse_url($new_url, PHP_URL_PATH);
        $base = self::base_path();
        if ($base !== '' && str_starts_with($to, $base . '/')) {
            $to = substr($to, strlen($base));
        }

        global $wpdb;
        $t = rcm_table('redirects');
        // The new URL must not redirect anywhere, or it would loop.
        $wpdb->query($wpdb->prepare("DELETE FROM {$t} WHERE from_path = %s", $new));
        // Flatten chains: redirects that pointed to the old URL now point to the new one.
        $old_variants = [$old, trailingslashit($old), home_url($old), home_url(trailingslashit($old))];
        $wpdb->query($wpdb->prepare(
            "UPDATE {$t} SET to_url = %s WHERE to_url IN (%s, %s, %s, %s)",
            $to,
            ...$old_variants
        ));

        $id = self::upsert($old, $to, 301);
        if (!is_wp_error($id)) {
            rcm_audit('redirect.auto', 'redirect', $id, ['from' => $old, 'to' => $to, 'post_id' => $post_id]);
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Validation and storage                                             */
    /* ------------------------------------------------------------------ */

    /** True when following redirects from $to leads back to $from. */
    private static function creates_loop(string $from, string $to): bool
    {
        if (!self::is_internal($to)) {
            return false;
        }
        $seen = [mb_strtolower($from) => true];
        $next = self::target_path($to);
        for ($i = 0; $i < 10; $i++) {
            $k = mb_strtolower($next);
            if (isset($seen[$k])) {
                return true;
            }
            $seen[$k] = true;
            $row = self::find($next);
            if (!$row || (int) $row['status'] === 410 || !self::is_internal((string) $row['to_url'])) {
                return false;
            }
            $next = self::target_path((string) $row['to_url']);
        }
        return true; // chain too long to be sensible
    }

    /**
     * Validates and stores a redirect. $id > 0 updates that row; otherwise an
     * existing row with the same source is overwritten when $overwrite is true.
     *
     * @return int|\WP_Error Row id.
     */
    public static function upsert(string $from, string $to, int $status, int $id = 0, bool $overwrite = true): int|\WP_Error
    {
        global $wpdb;
        $t = rcm_table('redirects');
        $from = trim($from);
        $to = trim($to);

        if ($from === '' || !str_starts_with($from, '/') || str_starts_with($from, '//')) {
            return new \WP_Error('from', __('The source must be a path starting with "/".', 'rcm'));
        }
        $from = self::normalize($from);
        if ($from === '/') {
            return new \WP_Error('from', __('The home page cannot be redirected.', 'rcm'));
        }
        if (preg_match('#^/(wp-admin|wp-login\.php|wp-json|wp-content|wp-includes)(/|$)#i', $from)) {
            return new \WP_Error('from', __('WordPress system paths cannot be redirected.', 'rcm'));
        }
        if (!in_array($status, self::STATUSES, true)) {
            return new \WP_Error('status', __('Choose a status of 301, 302, 307, 308 or 410.', 'rcm'));
        }

        if ($status === 410) {
            $to = '';
        } else {
            if ($to === '') {
                return new \WP_Error('to', __('Enter a target path or URL.', 'rcm'));
            }
            if (str_starts_with($to, '/') && !str_starts_with($to, '//')) {
                $clean = esc_url_raw($to);
                if ($clean === '' || !str_starts_with($clean, '/')) {
                    return new \WP_Error('to', __('The target path is not valid.', 'rcm'));
                }
                $to = $clean;
            } elseif (preg_match('#^https?://#i', $to) && filter_var($to, FILTER_VALIDATE_URL)) {
                $to = esc_url_raw($to, ['http', 'https']);
                if ($to === '') {
                    return new \WP_Error('to', __('The target URL is not valid.', 'rcm'));
                }
            } else {
                return new \WP_Error('to', __('The target must be a path starting with "/" or a full http(s) URL.', 'rcm'));
            }
            $to = mb_substr($to, 0, 500);
            if (self::is_internal($to) && self::same_path(self::target_path($to), $from)) {
                return new \WP_Error('loop', __('The source and target are the same page.', 'rcm'));
            }
            if (self::creates_loop($from, $to)) {
                return new \WP_Error('loop', __('This redirect would create a loop with existing redirects.', 'rcm'));
            }
        }

        $existing = self::find($from);
        if ($existing && (int) $existing['id'] !== $id) {
            if ($id > 0 || !$overwrite) {
                return new \WP_Error('exists', __('A redirect for this source path already exists.', 'rcm'));
            }
            $id = (int) $existing['id'];
        }

        $data = ['from_path' => $from, 'to_url' => $to, 'status' => $status];
        if ($id > 0) {
            $ok = $wpdb->update($t, $data, ['id' => $id], ['%s', '%s', '%d'], ['%d']);
            if ($ok === false) {
                return new \WP_Error('db', __('The redirect could not be saved.', 'rcm'));
            }
        } else {
            $data['created_at'] = current_time('mysql', true);
            $data['hits'] = 0;
            $ok = $wpdb->insert($t, $data, ['%s', '%s', '%d', '%s', '%d']);
            if (!$ok) {
                return new \WP_Error('db', __('The redirect could not be saved.', 'rcm'));
            }
            $id = (int) $wpdb->insert_id;
        }
        // The path is handled now, so drop it from the 404 log.
        $wpdb->query($wpdb->prepare('DELETE FROM ' . rcm_table('not_found') . ' WHERE path = %s', $from));
        return $id;
    }

    /* ------------------------------------------------------------------ */
    /*  Admin actions                                                      */
    /* ------------------------------------------------------------------ */

    private static function guard(string $nonce_action): void
    {
        if (!current_user_can('rcm_manage_seo')) {
            wp_die(esc_html__('You do not have permission to manage redirects.', 'rcm'), 403);
        }
        check_admin_referer($nonce_action);
    }

    private static function notice_key(): string
    {
        return 'rcm_redirects_notice_' . get_current_user_id();
    }

    private static function back(array $notice, array $args = []): never
    {
        set_transient(self::notice_key(), $notice, 120);
        wp_safe_redirect(add_query_arg(array_merge(['page' => 'rcm-redirects'], $args), admin_url('admin.php')));
        exit;
    }

    public static function save(): void
    {
        self::guard('rcm_redirect_save');
        $id = absint($_POST['id'] ?? 0);
        $from = rcm_clean(wp_unslash($_POST['from'] ?? ''), 300);
        $to = rcm_clean(wp_unslash($_POST['to'] ?? ''), 500);
        $status = absint($_POST['status'] ?? 301);

        $before = null;
        if ($id) {
            global $wpdb;
            $before = $wpdb->get_row($wpdb->prepare('SELECT from_path, to_url, status FROM ' . rcm_table('redirects') . ' WHERE id = %d', $id), ARRAY_A);
            if (!$before) {
                self::back(['type' => 'error', 'msg' => __('That redirect no longer exists.', 'rcm')]);
            }
        }
        $result = self::upsert($from, $to, $status, $id, false);
        if (is_wp_error($result)) {
            self::back(
                ['type' => 'error', 'msg' => $result->get_error_message(), 'form' => ['id' => $id, 'from' => $from, 'to' => $to, 'status' => $status]],
                $id ? ['edit' => $id] : []
            );
        }
        rcm_audit($id ? 'redirect.update' : 'redirect.create', 'redirect', $result, array_filter([
            'from' => self::normalize($from),
            'to' => $status === 410 ? '' : $to,
            'status' => $status,
            'before' => $before,
        ]));
        self::back(['type' => 'success', 'msg' => $id ? __('Redirect updated.', 'rcm') : __('Redirect added.', 'rcm')]);
    }

    public static function delete(): void
    {
        $id = absint($_POST['id'] ?? 0);
        self::guard('rcm_redirect_delete_' . $id);
        global $wpdb;
        $t = rcm_table('redirects');
        $row = $wpdb->get_row($wpdb->prepare("SELECT from_path, to_url, status FROM {$t} WHERE id = %d", $id), ARRAY_A);
        if ($row) {
            $wpdb->delete($t, ['id' => $id], ['%d']);
            rcm_audit('redirect.delete', 'redirect', $id, $row);
        }
        self::back(['type' => 'success', 'msg' => __('Redirect deleted.', 'rcm')]);
    }

    public static function import(): void
    {
        self::guard('rcm_redirect_import');
        $file = $_FILES['csv'] ?? null; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- validated below
        if (!is_array($file) || (int) ($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK || empty($file['tmp_name']) || !is_uploaded_file((string) $file['tmp_name'])) {
            self::back(['type' => 'error', 'msg' => __('Choose a CSV file to import.', 'rcm')]);
        }
        if ((int) $file['size'] > self::IMPORT_MAX_BYTES) {
            self::back(['type' => 'error', 'msg' => __('The file is larger than 2 MB.', 'rcm')]);
        }
        $ext = strtolower(pathinfo((string) ($file['name'] ?? ''), PATHINFO_EXTENSION));
        if (!in_array($ext, ['csv', 'txt'], true)) {
            self::back(['type' => 'error', 'msg' => __('Upload a .csv file.', 'rcm')]);
        }
        $overwrite = !empty($_POST['overwrite']);
        $fh = fopen((string) $file['tmp_name'], 'r');
        if (!$fh) {
            self::back(['type' => 'error', 'msg' => __('The file could not be read.', 'rcm')]);
        }
        $line = 0;
        $ok = 0;
        $skipped = 0;
        $errors = [];
        while (($cols = fgetcsv($fh, 4000, ',', '"', '')) !== false && $line < self::IMPORT_MAX_ROWS) {
            $line++;
            if (!is_array($cols) || $cols === [null]) {
                continue;
            }
            $from = rcm_clean((string) preg_replace('/^\xEF\xBB\xBF/', '', (string) ($cols[0] ?? '')), 300);
            if ($line === 1 && in_array(strtolower($from), ['from', 'from_path', 'source'], true)) {
                continue;
            }
            if ($from === '') {
                continue;
            }
            $to = rcm_clean((string) ($cols[1] ?? ''), 500);
            $status = trim((string) ($cols[2] ?? '')) === '' ? 301 : (int) $cols[2];
            $r = self::upsert($from, $to, $status, 0, $overwrite);
            if (is_wp_error($r)) {
                $skipped++;
                if (count($errors) < 10) {
                    /* translators: 1: line number, 2: error message */
                    $errors[] = sprintf(__('Line %1$d: %2$s', 'rcm'), $line, $r->get_error_message());
                }
            } else {
                $ok++;
            }
        }
        fclose($fh);
        rcm_audit('redirect.import', 'redirect', '', ['imported' => $ok, 'skipped' => $skipped, 'overwrite' => $overwrite]);
        self::back([
            'type' => $skipped ? 'warning' : 'success',
            /* translators: 1: imported rows, 2: skipped rows */
            'msg' => sprintf(__('Imported %1$d redirects, skipped %2$d.', 'rcm'), $ok, $skipped),
            'errors' => $errors,
        ]);
    }

    /** CSV cells must not start with formula characters when opened in a spreadsheet. */
    private static function csv_cell(string $v): string
    {
        return preg_match('/^[=+\-@\t\r]/', $v) ? "'" . $v : $v;
    }

    public static function export(): void
    {
        self::guard('rcm_redirect_export');
        global $wpdb;
        $rows = $wpdb->get_results('SELECT from_path, to_url, status, hits, last_hit FROM ' . rcm_table('redirects') . ' ORDER BY from_path ASC', ARRAY_A) ?: [];
        rcm_audit('redirect.export', 'redirect', '', ['count' => count($rows)]);
        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="rcm-redirects-' . gmdate('Y-m-d') . '.csv"');
        $out = fopen('php://output', 'w');
        if ($out) {
            fputcsv($out, ['from', 'to', 'status', 'hits', 'last_hit'], ',', '"', '');
            foreach ($rows as $r) {
                fputcsv($out, [
                    self::csv_cell((string) $r['from_path']),
                    self::csv_cell((string) $r['to_url']),
                    (string) $r['status'],
                    (string) $r['hits'],
                    (string) ($r['last_hit'] ?? ''),
                ], ',', '"', '');
            }
            fclose($out);
        }
        exit;
    }

    public static function delete_404(): void
    {
        $id = absint($_POST['id'] ?? 0);
        self::guard('rcm_404_delete_' . $id);
        global $wpdb;
        $t = rcm_table('not_found');
        $path = $wpdb->get_var($wpdb->prepare("SELECT path FROM {$t} WHERE id = %d", $id));
        if ($path !== null) {
            $wpdb->delete($t, ['id' => $id], ['%d']);
            rcm_audit('notfound.dismiss', 'not_found', $id, ['path' => (string) $path]);
        }
        self::back(['type' => 'success', 'msg' => __('404 entry dismissed.', 'rcm')]);
    }

    public static function clear_404(): void
    {
        self::guard('rcm_404_clear');
        global $wpdb;
        $n = (int) $wpdb->query('DELETE FROM ' . rcm_table('not_found'));
        rcm_audit('notfound.clear', 'not_found', '', ['deleted' => $n]);
        self::back(['type' => 'success', 'msg' => __('404 log cleared.', 'rcm')]);
    }

    /* ------------------------------------------------------------------ */
    /*  Admin screen                                                       */
    /* ------------------------------------------------------------------ */

    private static function date(?string $gmt): string
    {
        if (!$gmt || str_starts_with($gmt, '0000')) {
            return '';
        }
        return (string) get_date_from_gmt($gmt, (string) get_option('date_format') . ' ' . (string) get_option('time_format'));
    }

    public static function render_admin(): void
    {
        if (!current_user_can('rcm_manage_seo')) {
            wp_die(esc_html__('You do not have permission to manage redirects.', 'rcm'), 403);
        }
        global $wpdb;
        $t = rcm_table('redirects');
        $nf = rcm_table('not_found');

        $notice = get_transient(self::notice_key());
        if ($notice) {
            delete_transient(self::notice_key());
        }
        $notice = is_array($notice) ? $notice : null;

        $form = ['id' => 0, 'from' => '', 'to' => '', 'status' => 301];
        $edit_id = absint($_GET['edit'] ?? 0);
        if ($edit_id) {
            $row = $wpdb->get_row($wpdb->prepare("SELECT id, from_path, to_url, status FROM {$t} WHERE id = %d", $edit_id), ARRAY_A);
            if ($row) {
                $form = ['id' => (int) $row['id'], 'from' => (string) $row['from_path'], 'to' => (string) $row['to_url'], 'status' => (int) $row['status']];
            }
        }
        if (!empty($_GET['from'])) {
            $form['from'] = self::normalize(rcm_clean(wp_unslash($_GET['from']), 300));
        }
        if ($notice && !empty($notice['form']) && is_array($notice['form'])) {
            $form = array_merge($form, $notice['form']);
        }

        $s = rcm_clean(wp_unslash($_GET['s'] ?? ''), 200);
        $paged = max(1, absint($_GET['paged'] ?? 1));
        if ($s !== '') {
            $like = '%' . $wpdb->esc_like($s) . '%';
            $total = (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE from_path LIKE %s OR to_url LIKE %s", $like, $like));
            $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$t} WHERE from_path LIKE %s OR to_url LIKE %s ORDER BY created_at DESC, id DESC LIMIT %d OFFSET %d", $like, $like, self::PER_PAGE, ($paged - 1) * self::PER_PAGE), ARRAY_A);
        } else {
            $total = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$t}");
            $rows = $wpdb->get_results($wpdb->prepare("SELECT * FROM {$t} ORDER BY created_at DESC, id DESC LIMIT %d OFFSET %d", self::PER_PAGE, ($paged - 1) * self::PER_PAGE), ARRAY_A);
        }
        $rows = $rows ?: [];
        $pages = max(1, (int) ceil($total / self::PER_PAGE));
        $nf_rows = $wpdb->get_results($wpdb->prepare("SELECT id, path, hits, last_hit, referrer FROM {$nf} ORDER BY hits DESC, last_hit DESC LIMIT %d", 50), ARRAY_A) ?: [];
        $nf_total = (int) $wpdb->get_var("SELECT COUNT(*) FROM {$nf}");
        $page_url = admin_url('admin.php?page=rcm-redirects');
        $post_url = admin_url('admin-post.php');
        $confirm = esc_js(__('Delete this redirect?', 'rcm'));
        ?>
        <div class="wrap rcm-redirects-admin">
            <h1><?php esc_html_e('Redirects & 404s', 'rcm'); ?></h1>

            <?php if ($notice) : ?>
                <div class="notice notice-<?php echo esc_attr(in_array($notice['type'] ?? '', ['success', 'error', 'warning'], true) ? $notice['type'] : 'info'); ?> is-dismissible">
                    <p><?php echo esc_html((string) ($notice['msg'] ?? '')); ?></p>
                    <?php if (!empty($notice['errors'])) : ?>
                        <ul class="rcm-seo-issues">
                            <?php foreach ((array) $notice['errors'] as $e) : ?>
                                <li><?php echo esc_html((string) $e); ?></li>
                            <?php endforeach; ?>
                        </ul>
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <div class="rcm-redirects-grid">
                <div class="rcm-redirects-panel" id="rcm-redirect-form">
                    <h2><?php echo $form['id'] ? esc_html__('Edit redirect', 'rcm') : esc_html__('Add redirect', 'rcm'); ?></h2>
                    <form method="post" action="<?php echo esc_url($post_url); ?>">
                        <input type="hidden" name="action" value="rcm_redirect_save">
                        <input type="hidden" name="id" value="<?php echo esc_attr((string) $form['id']); ?>">
                        <?php wp_nonce_field('rcm_redirect_save'); ?>
                        <p>
                            <label for="rcm-redirect-from"><strong><?php esc_html_e('From (path)', 'rcm'); ?></strong></label>
                            <input type="text" class="widefat code" id="rcm-redirect-from" name="from" required maxlength="300" pattern="/.*" placeholder="/old-page" value="<?php echo esc_attr((string) $form['from']); ?>" aria-describedby="rcm-redirect-from-help">
                            <span class="description" id="rcm-redirect-from-help"><?php esc_html_e('Relative to the site root. Trailing slash and query string are ignored when matching; the visitor\'s query string is passed on.', 'rcm'); ?></span>
                        </p>
                        <p>
                            <label for="rcm-redirect-to"><strong><?php esc_html_e('To (path or full URL)', 'rcm'); ?></strong></label>
                            <input type="text" class="widefat code" id="rcm-redirect-to" name="to" maxlength="500" placeholder="/new-page/" value="<?php echo esc_attr((string) $form['to']); ?>" aria-describedby="rcm-redirect-to-help">
                            <span class="description" id="rcm-redirect-to-help"><?php esc_html_e('Leave empty for 410 Gone.', 'rcm'); ?></span>
                        </p>
                        <p>
                            <label for="rcm-redirect-status"><strong><?php esc_html_e('Status', 'rcm'); ?></strong></label>
                            <select id="rcm-redirect-status" name="status">
                                <?php
                                $labels = [
                                    301 => __('301 Moved permanently', 'rcm'),
                                    302 => __('302 Found (temporary)', 'rcm'),
                                    307 => __('307 Temporary redirect', 'rcm'),
                                    308 => __('308 Permanent redirect', 'rcm'),
                                    410 => __('410 Gone (removed, no replacement)', 'rcm'),
                                ];
                                foreach ($labels as $code => $label) {
                                    printf('<option value="%d" %s>%s</option>', (int) $code, selected((int) $form['status'], $code, false), esc_html($label));
                                }
                                ?>
                            </select>
                        </p>
                        <p>
                            <button type="submit" class="button button-primary"><?php echo $form['id'] ? esc_html__('Update redirect', 'rcm') : esc_html__('Add redirect', 'rcm'); ?></button>
                            <?php if ($form['id']) : ?>
                                <a class="button" href="<?php echo esc_url($page_url); ?>"><?php esc_html_e('Cancel', 'rcm'); ?></a>
                            <?php endif; ?>
                        </p>
                    </form>
                </div>

                <div class="rcm-redirects-panel">
                    <h2><?php esc_html_e('Import and export', 'rcm'); ?></h2>
                    <form method="post" action="<?php echo esc_url($post_url); ?>" enctype="multipart/form-data">
                        <input type="hidden" name="action" value="rcm_redirect_import">
                        <?php wp_nonce_field('rcm_redirect_import'); ?>
                        <p>
                            <label for="rcm-redirect-csv"><strong><?php esc_html_e('CSV file', 'rcm'); ?></strong></label><br>
                            <input type="file" id="rcm-redirect-csv" name="csv" accept=".csv,text/csv" required aria-describedby="rcm-redirect-csv-help">
                            <span class="description" id="rcm-redirect-csv-help"><?php esc_html_e('Columns: from, to, status (status optional, default 301). A header row is skipped. Max 5,000 rows, 2 MB.', 'rcm'); ?></span>
                        </p>
                        <p>
                            <label for="rcm-redirect-overwrite"><input type="checkbox" id="rcm-redirect-overwrite" name="overwrite" value="1"> <?php esc_html_e('Overwrite existing redirects with the same source', 'rcm'); ?></label>
                        </p>
                        <p><button type="submit" class="button"><?php esc_html_e('Import CSV', 'rcm'); ?></button></p>
                    </form>
                    <p>
                        <a class="button" href="<?php echo esc_url(wp_nonce_url(add_query_arg('action', 'rcm_redirect_export', $post_url), 'rcm_redirect_export')); ?>"><?php esc_html_e('Export all as CSV', 'rcm'); ?></a>
                    </p>
                </div>
            </div>

            <h2>
                <?php
                /* translators: %d: number of redirects */
                printf(esc_html__('Redirects (%d)', 'rcm'), $total);
                ?>
            </h2>
            <form method="get" class="rcm-seo-filters">
                <input type="hidden" name="page" value="rcm-redirects">
                <label for="rcm-redirect-search" class="screen-reader-text"><?php esc_html_e('Search redirects', 'rcm'); ?></label>
                <input type="search" id="rcm-redirect-search" name="s" value="<?php echo esc_attr($s); ?>" placeholder="<?php esc_attr_e('Search paths and targets', 'rcm'); ?>">
                <button type="submit" class="button"><?php esc_html_e('Search', 'rcm'); ?></button>
            </form>
            <table class="widefat striped rcm-redirects-table">
                <thead>
                    <tr>
                        <th scope="col"><?php esc_html_e('From', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('To', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Status', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Hits', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Last hit', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Created', 'rcm'); ?></th>
                        <th scope="col"><span class="screen-reader-text"><?php esc_html_e('Actions', 'rcm'); ?></span></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$rows) : ?>
                        <tr><td colspan="7"><?php esc_html_e('No redirects yet.', 'rcm'); ?></td></tr>
                    <?php endif; ?>
                    <?php foreach ($rows as $r) : $rid = (int) $r['id']; ?>
                        <tr>
                            <td><code><?php echo esc_html((string) $r['from_path']); ?></code></td>
                            <td><?php echo (string) $r['to_url'] !== '' ? '<code>' . esc_html((string) $r['to_url']) . '</code>' : '<em>' . esc_html__('(gone)', 'rcm') . '</em>'; ?></td>
                            <td><?php echo esc_html((string) $r['status']); ?></td>
                            <td><?php echo esc_html(number_format_i18n((int) $r['hits'])); ?></td>
                            <td><?php echo esc_html(self::date($r['last_hit'] ?? null)); ?></td>
                            <td><?php echo esc_html(self::date($r['created_at'] ?? null)); ?></td>
                            <td class="rcm-redirects-actions">
                                <a class="button button-small" href="<?php echo esc_url(add_query_arg('edit', $rid, $page_url) . '#rcm-redirect-form'); ?>"><?php esc_html_e('Edit', 'rcm'); ?></a>
                                <form method="post" action="<?php echo esc_url($post_url); ?>" onsubmit="return confirm('<?php echo $confirm; // phpcs:ignore WordPress.Security.EscapeOutput -- esc_js above ?>');">
                                    <input type="hidden" name="action" value="rcm_redirect_delete">
                                    <input type="hidden" name="id" value="<?php echo esc_attr((string) $rid); ?>">
                                    <?php wp_nonce_field('rcm_redirect_delete_' . $rid); ?>
                                    <button type="submit" class="button button-small button-link-delete"><?php esc_html_e('Delete', 'rcm'); ?></button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php if ($pages > 1) : ?>
                <div class="tablenav"><div class="tablenav-pages">
                    <?php
                    echo wp_kses_post((string) paginate_links([
                        'base' => add_query_arg(array_filter(['page' => 'rcm-redirects', 's' => $s, 'paged' => '%#%']), admin_url('admin.php')),
                        'format' => '',
                        'current' => $paged,
                        'total' => $pages,
                    ]));
                    ?>
                </div></div>
            <?php endif; ?>

            <h2>
                <?php
                /* translators: %d: number of logged paths */
                printf(esc_html__('Top 404s (%d logged paths)', 'rcm'), $nf_total);
                ?>
            </h2>
            <p class="description"><?php esc_html_e('Pages visitors asked for that do not exist. Obvious exploit probes, WordPress system paths and file requests are not logged. The log keeps the 2,000 most recent paths.', 'rcm'); ?></p>
            <table class="widefat striped rcm-redirects-table">
                <thead>
                    <tr>
                        <th scope="col"><?php esc_html_e('Path', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Hits', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Last hit', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Last referrer', 'rcm'); ?></th>
                        <th scope="col"><span class="screen-reader-text"><?php esc_html_e('Actions', 'rcm'); ?></span></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (!$nf_rows) : ?>
                        <tr><td colspan="5"><?php esc_html_e('No 404s logged.', 'rcm'); ?></td></tr>
                    <?php endif; ?>
                    <?php foreach ($nf_rows as $r) : $nid = (int) $r['id']; ?>
                        <tr>
                            <td><code><?php echo esc_html((string) $r['path']); ?></code></td>
                            <td><?php echo esc_html(number_format_i18n((int) $r['hits'])); ?></td>
                            <td><?php echo esc_html(self::date($r['last_hit'] ?? null)); ?></td>
                            <td><?php echo (string) $r['referrer'] !== '' ? '<span class="code">' . esc_html((string) $r['referrer']) . '</span>' : '&ndash;'; ?></td>
                            <td class="rcm-redirects-actions">
                                <a class="button button-small button-primary" href="<?php echo esc_url(add_query_arg('from', rawurlencode((string) $r['path']), $page_url) . '#rcm-redirect-form'); ?>"><?php esc_html_e('Create redirect', 'rcm'); ?></a>
                                <form method="post" action="<?php echo esc_url($post_url); ?>">
                                    <input type="hidden" name="action" value="rcm_404_delete">
                                    <input type="hidden" name="id" value="<?php echo esc_attr((string) $nid); ?>">
                                    <?php wp_nonce_field('rcm_404_delete_' . $nid); ?>
                                    <button type="submit" class="button button-small"><?php esc_html_e('Dismiss', 'rcm'); ?></button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
            <?php if ($nf_total) : ?>
                <form method="post" action="<?php echo esc_url($post_url); ?>" class="rcm-redirects-clear" onsubmit="return confirm('<?php echo esc_js(__('Clear the whole 404 log?', 'rcm')); ?>');">
                    <input type="hidden" name="action" value="rcm_404_clear">
                    <?php wp_nonce_field('rcm_404_clear'); ?>
                    <button type="submit" class="button"><?php esc_html_e('Clear 404 log', 'rcm'); ?></button>
                </form>
            <?php endif; ?>
        </div>
        <?php
    }
}
