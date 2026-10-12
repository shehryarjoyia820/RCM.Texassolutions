<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Plugin settings, stored in the `rcm_settings` option and edited at RCM > Settings.
 *
 * Secrets: the Gemini API key may instead be defined in wp-config.php as
 * RCM_GEMINI_API_KEY, which takes precedence and is never shown in the admin.
 */
final class Settings
{
    public const OPTION = 'rcm_settings';
    private static ?array $cache = null;

    public static function defaults(): array
    {
        return [
            'contact' => [
                'email' => 'info@texassolutions.co',
                'phone' => '+1 (838) 910-3147',
                'phone_href' => 'tel:+18389103147',
                'street' => '401 W Kentucky Ave',
                'city' => 'Midland',
                'region' => 'TX',
                'postal_code' => '79701',
                'country' => 'US',
                'hours' => '',
            ],
            'notify_email' => 'info@texassolutions.co',
            'analytics' => [
                'ga4_id' => '',
                'gsc_verification' => '',
                'bing_verification' => '',
            ],
            'chat' => [
                'enabled' => true,
                'api_key' => '',
                'model' => 'gemini-3.8-flash',
                'welcome' => 'Hi, I am the Texas Solutions RCM assistant. I can explain our services, point you to the right calculator or set up a free consultation.',
                'idle_minutes' => 30,
                'retention_days' => 365,
                'max_messages' => 60,
            ],
            'leads' => [
                'retention_days' => 1095,
                'duplicate_window_days' => 180,
            ],
            'security' => [
                'mfa_required_roles' => ['administrator'],
                'login_max_attempts' => 5,
                'login_lockout_minutes' => 15,
                'disable_xmlrpc' => true,
                'security_headers' => true,
            ],
            'seo' => [
                'default_og_image' => 0,
                'llms_txt' => true,
            ],
            'home' => [
                'show_case_studies' => true,
                'show_testimonials' => true,
            ],
        ];
    }

    public static function init(): void
    {
        add_action('admin_post_rcm_save_settings', [self::class, 'save']);
    }

    public static function all(): array
    {
        if (self::$cache === null) {
            $stored = get_option(self::OPTION, []);
            self::$cache = self::merge(self::defaults(), is_array($stored) ? $stored : []);
        }
        return self::$cache;
    }

    private static function merge(array $defaults, array $stored): array
    {
        foreach ($stored as $k => $v) {
            if (isset($defaults[$k]) && is_array($defaults[$k]) && is_array($v) && !array_is_list($defaults[$k])) {
                $defaults[$k] = self::merge($defaults[$k], $v);
            } elseif (array_key_exists($k, $defaults)) {
                $defaults[$k] = $v;
            }
        }
        return $defaults;
    }

    public static function update(array $values): void
    {
        update_option(self::OPTION, $values, true);
        self::$cache = null;
    }

    /** The Gemini key: wp-config constant first, then the stored setting. */
    public static function gemini_key(): string
    {
        if (defined('RCM_GEMINI_API_KEY') && RCM_GEMINI_API_KEY) {
            return (string) RCM_GEMINI_API_KEY;
        }
        return (string) rcm_setting('chat.api_key', '');
    }

    public static function key_from_config(): bool
    {
        return defined('RCM_GEMINI_API_KEY') && RCM_GEMINI_API_KEY;
    }

    public static function save(): void
    {
        if (!current_user_can('rcm_manage_settings')) {
            wp_die(esc_html__('You do not have permission to change these settings.', 'rcm'), 403);
        }
        check_admin_referer('rcm_save_settings');
        $in = wp_unslash($_POST['rcm'] ?? []);
        $cur = self::all();
        $s = $cur;

        $c = (array) ($in['contact'] ?? []);
        foreach (['email', 'phone', 'street', 'city', 'region', 'postal_code', 'country', 'hours'] as $k) {
            $s['contact'][$k] = $k === 'email' ? sanitize_email((string) ($c[$k] ?? '')) : rcm_clean($c[$k] ?? '', 120);
        }
        $s['contact']['phone_href'] = 'tel:' . preg_replace('/[^\d+]/', '', $s['contact']['phone']);
        $s['notify_email'] = sanitize_email((string) ($in['notify_email'] ?? '')) ?: $s['contact']['email'];

        $a = (array) ($in['analytics'] ?? []);
        $ga = strtoupper(rcm_clean($a['ga4_id'] ?? '', 20));
        $s['analytics']['ga4_id'] = preg_match('/^G-[A-Z0-9]{4,15}$/', $ga) ? $ga : '';
        $s['analytics']['gsc_verification'] = preg_replace('/[^A-Za-z0-9_\-]/', '', (string) ($a['gsc_verification'] ?? ''));
        $s['analytics']['bing_verification'] = preg_replace('/[^A-Za-z0-9_\-]/', '', (string) ($a['bing_verification'] ?? ''));

        $ch = (array) ($in['chat'] ?? []);
        $s['chat']['enabled'] = !empty($ch['enabled']);
        if (isset($ch['api_key']) && $ch['api_key'] !== '' && $ch['api_key'] !== '********') {
            $s['chat']['api_key'] = rcm_clean($ch['api_key'], 200);
        }
        if (!empty($ch['clear_api_key'])) {
            $s['chat']['api_key'] = '';
        }
        $s['chat']['model'] = preg_replace('/[^a-z0-9.\-]/', '', strtolower((string) ($ch['model'] ?? ''))) ?: 'gemini-3.8-flash';
        $s['chat']['welcome'] = rcm_clean_text($ch['welcome'] ?? '', 400);
        $s['chat']['idle_minutes'] = max(10, min(240, (int) ($ch['idle_minutes'] ?? 30)));
        $s['chat']['retention_days'] = max(30, min(3650, (int) ($ch['retention_days'] ?? 365)));
        $s['chat']['max_messages'] = max(10, min(200, (int) ($ch['max_messages'] ?? 60)));

        $l = (array) ($in['leads'] ?? []);
        $s['leads']['retention_days'] = max(90, min(3650, (int) ($l['retention_days'] ?? 1095)));
        $s['leads']['duplicate_window_days'] = max(1, min(730, (int) ($l['duplicate_window_days'] ?? 180)));

        $sec = (array) ($in['security'] ?? []);
        $roles = array_values(array_intersect((array) ($sec['mfa_required_roles'] ?? []), ['administrator', 'rcm_sales_manager', 'rcm_support_agent', 'rcm_content_editor', 'editor']));
        $s['security']['mfa_required_roles'] = $roles;
        $s['security']['login_max_attempts'] = max(3, min(20, (int) ($sec['login_max_attempts'] ?? 5)));
        $s['security']['login_lockout_minutes'] = max(5, min(1440, (int) ($sec['login_lockout_minutes'] ?? 15)));
        $s['security']['disable_xmlrpc'] = !empty($sec['disable_xmlrpc']);
        $s['security']['security_headers'] = !empty($sec['security_headers']);

        $seo = (array) ($in['seo'] ?? []);
        $s['seo']['default_og_image'] = absint($seo['default_og_image'] ?? 0);
        $s['seo']['llms_txt'] = !empty($seo['llms_txt']);

        $h = (array) ($in['home'] ?? []);
        $s['home']['show_case_studies'] = !empty($h['show_case_studies']);
        $s['home']['show_testimonials'] = !empty($h['show_testimonials']);

        self::update($s);
        $changed = [];
        foreach ($s as $k => $v) {
            if (($cur[$k] ?? null) !== $v) {
                $changed[] = $k;
            }
        }
        rcm_audit('settings.update', 'settings', '', ['sections' => $changed]);
        wp_safe_redirect(add_query_arg(['page' => 'rcm-settings', 'updated' => 1], admin_url('admin.php')));
        exit;
    }
}
