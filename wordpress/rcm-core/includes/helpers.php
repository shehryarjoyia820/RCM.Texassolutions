<?php
/**
 * Global helper functions used across the plugin and by the theme.
 */

defined('ABSPATH') || exit;

/** Full table name, e.g. rcm_table('leads') => wp_rcm_leads. */
function rcm_table(string $name): string
{
    global $wpdb;
    return $wpdb->prefix . 'rcm_' . $name;
}

/** Read one setting (dot paths allowed: 'contact.email'). */
function rcm_setting(string $key, mixed $default = null): mixed
{
    $value = RCM\Settings::all();
    foreach (explode('.', $key) as $part) {
        if (!is_array($value) || !array_key_exists($part, $value)) {
            return $default;
        }
        $value = $value[$part];
    }
    return $value;
}

/** Decoded JSON post meta with a fallback. */
function rcm_meta(int $post_id, string $key, mixed $default = []): mixed
{
    $raw = get_post_meta($post_id, $key, true);
    if ($raw === '' || $raw === null) {
        return $default;
    }
    if (is_array($raw)) {
        return $raw;
    }
    $decoded = json_decode((string) $raw, true);
    return $decoded === null ? $default : $decoded;
}

/** Reads a JSON file from the plugin's data folder. */
function rcm_data(string $name): array
{
    static $cache = [];
    if (!isset($cache[$name])) {
        $file = RCM_DIR . 'data/' . $name . '.json';
        $cache[$name] = is_readable($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    }
    return $cache[$name];
}

/** Trimmed plain string with control characters removed and a length cap. */
function rcm_clean(mixed $value, int $max = 200): string
{
    if (!is_scalar($value)) {
        return '';
    }
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $value) ?? '';
    return mb_substr(trim(wp_strip_all_tags($s)), 0, $max);
}

/** Multi-line version of rcm_clean() for messages. */
function rcm_clean_text(mixed $value, int $max = 3000): string
{
    if (!is_scalar($value)) {
        return '';
    }
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', (string) $value) ?? '';
    return mb_substr(trim(sanitize_textarea_field($s)), 0, $max);
}

function rcm_client_ip(): string
{
    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    // DreamHost and most proxies set X-Forwarded-For; only trust the first hop if REMOTE_ADDR is private.
    if (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) && preg_match('/^(10\.|127\.|172\.(1[6-9]|2\d|3[01])\.|192\.168\.)/', $ip)) {
        $ip = trim(explode(',', (string) $_SERVER['HTTP_X_FORWARDED_FOR'])[0]);
    }
    return filter_var($ip, FILTER_VALIDATE_IP) ? $ip : '0.0.0.0';
}

/**
 * Fixed-window rate limiter stored in transients (object cache if present).
 * Returns true when the caller is over the limit.
 */
function rcm_rate_limited(string $bucket, int $max, int $window_seconds): bool
{
    $key = 'rcm_rl_' . md5($bucket . '|' . rcm_client_ip());
    $hits = (int) get_transient($key);
    if ($hits >= $max) {
        return true;
    }
    set_transient($key, $hits + 1, $window_seconds);
    return false;
}

/** Append to the audit log. */
function rcm_audit(string $action, string $entity = '', string|int $entity_id = '', array $detail = []): void
{
    global $wpdb;
    $user = wp_get_current_user();
    $wpdb->insert(rcm_table('audit_log'), [
        'at' => current_time('mysql', true),
        'user_id' => $user->ID ?: null,
        'user_email' => $user->ID ? $user->user_email : '',
        'action' => mb_substr($action, 0, 80),
        'entity' => mb_substr($entity, 0, 40),
        'entity_id' => mb_substr((string) $entity_id, 0, 64),
        'detail' => wp_json_encode($detail),
        'ip' => rcm_client_ip(),
    ]);
}

/** Render a PHP view from the plugin (admin/ or templates/) with variables. */
function rcm_view(string $path, array $vars = []): void
{
    $file = RCM_DIR . ltrim($path, '/');
    if (!is_readable($file)) {
        return;
    }
    extract($vars, EXTR_SKIP); // phpcs:ignore WordPress.PHP.DontExtract
    include $file;
}

/** Same as rcm_view() but returns the HTML. */
function rcm_render(string $path, array $vars = []): string
{
    ob_start();
    rcm_view($path, $vars);
    return (string) ob_get_clean();
}

/** Inline SVG icon from the bundled Lucide subset (assets/icons.json). */
function rcm_icon(string $name, string $class = 'h-5 w-5'): string
{
    static $icons = null;
    if ($icons === null) {
        $file = RCM_DIR . 'data/icons.json';
        $icons = is_readable($file) ? (json_decode((string) file_get_contents($file), true) ?: []) : [];
    }
    $body = $icons[$name] ?? ($icons['Circle'] ?? '<circle cx="12" cy="12" r="10"/>');
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="' . esc_attr($class) . '" aria-hidden="true" focusable="false">' . $body . '</svg>';
}

/** Allowed tags for rcm_icon() output inside wp_kses. */
function rcm_svg_kses(): array
{
    $common = ['d' => true, 'cx' => true, 'cy' => true, 'r' => true, 'rx' => true, 'ry' => true, 'x' => true, 'y' => true, 'x1' => true, 'x2' => true, 'y1' => true, 'y2' => true, 'width' => true, 'height' => true, 'points' => true, 'transform' => true];
    return [
        'svg' => ['xmlns' => true, 'viewbox' => true, 'fill' => true, 'stroke' => true, 'stroke-width' => true, 'stroke-linecap' => true, 'stroke-linejoin' => true, 'class' => true, 'aria-hidden' => true, 'focusable' => true],
        'path' => $common, 'circle' => $common, 'rect' => $common, 'line' => $common, 'polyline' => $common, 'polygon' => $common, 'ellipse' => $common, 'g' => $common,
    ];
}

/** Echo an icon safely. */
function rcm_the_icon(string $name, string $class = 'h-5 w-5'): void
{
    echo wp_kses(rcm_icon($name, $class), rcm_svg_kses());
}

/** Formats a number for a unit (mirrors src/js/format.ts). */
function rcm_fmt(float|int|null $v, string $unit): string
{
    if ($v === null || !is_finite((float) $v)) {
        return __('Not available', 'rcm');
    }
    $n = static fn($x, $d = 2) => rtrim(rtrim(number_format((float) $x, $d), '0'), '.');
    return match ($unit) {
        'usd' => (abs($v) >= 1000 ? '$' . number_format((float) $v) : '$' . number_format((float) $v, 2)),
        'pct' => $n($v) . '%',
        'days' => $n($v) . (abs($v) == 1 ? ' day' : ' days'),
        'hours' => $n($v) . (abs($v) == 1 ? ' hour' : ' hours'),
        'months' => $n($v) . (abs($v) == 1 ? ' month' : ' months'),
        'years' => $n($v) . (abs($v) == 1 ? ' year' : ' years'),
        default => $n($v),
    };
}

/** Patient-information heuristics shared by forms and chat. */
function rcm_looks_like_phi(string $text): bool
{
    $patterns = [
        '/\b\d{3}-\d{2}-\d{4}\b/',
        '/\b(dob|d\.o\.b\.|date of birth)\b\s*[:\-]?\s*\d/i',
        '/\b(member|subscriber|policy|medicaid|medicare)\s*(id|#|no\.?|number)\s*[:\-]?\s*[a-z0-9]{5,}/i',
        '/\bmrn\s*[:\-#]?\s*\d+/i',
        '/\bpatient\s+(name\s*[:\-]|is\s+[A-Z][a-z]+\s+[A-Z][a-z]+)/',
        '/\b(mbi|hicn)\b\s*[:\-]?\s*[a-z0-9]{8,}/i',
    ];
    foreach ($patterns as $p) {
        if (preg_match($p, $text)) {
            return true;
        }
    }
    return false;
}

/** Contact details from settings, used by the theme. */
function rcm_contact(): array
{
    return (array) rcm_setting('contact', []);
}

/** URL of a page created by the importer, by its slug key (e.g. 'consultation'). */
function rcm_page_url(string $key): string
{
    $map = (array) get_option('rcm_page_ids', []);
    if (!empty($map[$key]) && get_post_status((int) $map[$key]) === 'publish') {
        return (string) get_permalink((int) $map[$key]);
    }
    return home_url('/' . trim($key, '/') . '/');
}
