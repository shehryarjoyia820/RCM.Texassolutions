<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * The RCM admin area: menu, router, overview dashboard, settings and system screens.
 */
final class Admin
{
    public static function init(): void
    {
        add_action('admin_menu', [self::class, 'menu'], 9);
        add_action('admin_notices', [self::class, 'notices']);
        add_action('admin_post_rcm_test_email', [self::class, 'test_email']);
        add_action('admin_post_rcm_test_ai', [self::class, 'test_ai']);
        add_action('wp_dashboard_setup', [self::class, 'dashboard_widget']);
        add_filter('plugin_action_links_' . plugin_basename(RCM_FILE), [self::class, 'action_links']);
    }

    public static function menu(): void
    {
        $call = static fn(string $class, string $method) => static function () use ($class, $method): void {
            if (class_exists($class) && method_exists($class, $method)) {
                $class::$method();
            } else {
                echo '<div class="wrap"><h1>' . esc_html__('Not available', 'rcm') . '</h1></div>';
            }
        };

        add_menu_page(__('Texas Solutions RCM', 'rcm'), __('RCM', 'rcm'), 'rcm_view_dashboard', 'rcm', [self::class, 'overview'], 'dashicons-heart', 3);
        add_submenu_page('rcm', __('Overview', 'rcm'), __('Overview', 'rcm'), 'rcm_view_dashboard', 'rcm', [self::class, 'overview']);
        add_submenu_page('rcm', __('Leads', 'rcm'), self::badge(__('Leads', 'rcm'), self::count_new_leads()), 'rcm_view_leads', 'rcm-leads', $call(Leads::class, 'render_admin'));
        add_submenu_page('rcm', __('AI Chats', 'rcm'), self::badge(__('AI Chats', 'rcm'), self::count_open_handoffs()), 'rcm_view_chats', 'rcm-chats', $call(Chat::class, 'render_chats'));
        add_submenu_page('rcm', __('Knowledge Base', 'rcm'), __('Knowledge Base', 'rcm'), 'rcm_manage_kb', 'rcm-kb', $call(Chat::class, 'render_kb'));
        add_submenu_page('rcm', __('Analytics', 'rcm'), __('Analytics', 'rcm'), 'rcm_view_analytics', 'rcm-analytics', $call(Analytics::class, 'render_admin'));
        add_submenu_page('rcm', __('SEO', 'rcm'), __('SEO', 'rcm'), 'rcm_manage_seo', 'rcm-seo', $call(SEO::class, 'render_admin'));
        add_submenu_page('rcm', __('Redirects', 'rcm'), __('Redirects & 404s', 'rcm'), 'rcm_manage_seo', 'rcm-redirects', $call(Redirects::class, 'render_admin'));
        add_submenu_page('rcm', __('Audit Log', 'rcm'), __('Audit Log', 'rcm'), 'rcm_view_audit', 'rcm-audit', $call(Analytics::class, 'render_audit'));
        add_submenu_page('rcm', __('Settings', 'rcm'), __('Settings', 'rcm'), 'rcm_manage_settings', 'rcm-settings', [self::class, 'settings']);
        add_submenu_page('rcm', __('Content Sync & System', 'rcm'), __('Content & System', 'rcm'), 'manage_options', 'rcm-tools', [self::class, 'tools']);
    }

    private static function badge(string $label, int $n): string
    {
        return $n > 0 ? $label . ' <span class="awaiting-mod count-' . $n . '"><span class="pending-count">' . $n . '</span></span>' : $label;
    }

    private static function table_exists(string $name): bool
    {
        global $wpdb;
        static $cache = [];
        return $cache[$name] ??= ($wpdb->get_var($wpdb->prepare('SHOW TABLES LIKE %s', rcm_table($name))) === rcm_table($name));
    }

    private static function count_new_leads(): int
    {
        global $wpdb;
        if (!self::table_exists('leads')) {
            return 0;
        }
        return (int) $wpdb->get_var("SELECT COUNT(*) FROM " . rcm_table('leads') . " WHERE status = 'new' AND duplicate_of IS NULL AND source <> 'newsletter'");
    }

    private static function count_open_handoffs(): int
    {
        global $wpdb;
        if (!self::table_exists('chat_flags')) {
            return 0;
        }
        return (int) $wpdb->get_var("SELECT COUNT(*) FROM " . rcm_table('chat_flags') . " WHERE resolved = 0 AND kind IN ('handoff','unanswered')");
    }

    public static function action_links(array $links): array
    {
        array_unshift($links, '<a href="' . esc_url(admin_url('admin.php?page=rcm-settings')) . '">' . esc_html__('Settings', 'rcm') . '</a>');
        return $links;
    }

    public static function notices(): void
    {
        $screen = get_current_screen();
        if ($msg = get_transient('rcm_meta_error_' . get_current_user_id())) {
            delete_transient('rcm_meta_error_' . get_current_user_id());
            echo '<div class="notice notice-error"><p>' . esc_html((string) $msg) . '</p></div>';
        }
        if (!$screen || !str_contains((string) $screen->id, 'rcm')) {
            return;
        }
        if (!empty($_GET['updated'])) {
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Saved.', 'rcm') . '</p></div>';
        }
        if (!empty($_GET['imported'])) {
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html__('Content sync finished. See the report below.', 'rcm') . '</p></div>';
        }
        if (isset($_GET['rcm_test'])) {
            $ok = $_GET['rcm_test'] === '1';
            $detail = sanitize_text_field(wp_unslash($_GET['rcm_detail'] ?? ''));
            printf('<div class="notice notice-%s is-dismissible"><p>%s %s</p></div>', $ok ? 'success' : 'error', $ok ? esc_html__('Test succeeded.', 'rcm') : esc_html__('Test failed.', 'rcm'), esc_html($detail));
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Overview                                                           */
    /* ------------------------------------------------------------------ */

    public static function overview(): void
    {
        global $wpdb;
        $leads_ok = self::table_exists('leads');
        $stats = $leads_ok && method_exists(Leads::class, 'stats') ? Leads::stats() : [];
        $recent = $leads_ok ? $wpdb->get_results("SELECT id, created_at, name, company, source, status, score FROM " . rcm_table('leads') . " WHERE duplicate_of IS NULL ORDER BY created_at DESC LIMIT 8", ARRAY_A) : [];
        $due = $leads_ok ? $wpdb->get_results($wpdb->prepare("SELECT id, name, company, follow_up_at, status FROM " . rcm_table('leads') . " WHERE follow_up_at IS NOT NULL AND follow_up_at <= %s AND status NOT IN ('won','lost') ORDER BY follow_up_at ASC LIMIT 8", current_time('Y-m-d')), ARRAY_A) : [];
        $handoffs = self::table_exists('chat_flags') ? $wpdb->get_results("SELECT f.id, f.kind, f.detail, f.created_at, f.session_id FROM " . rcm_table('chat_flags') . " f WHERE f.resolved = 0 ORDER BY f.created_at DESC LIMIT 6", ARRAY_A) : [];
        $counts = [
            'services' => (int) wp_count_posts(Content_Types::SERVICE)->publish,
            'specialties' => (int) wp_count_posts(Content_Types::SPECIALTY)->publish,
            'tools' => (int) wp_count_posts(Content_Types::TOOL)->publish,
            'posts' => (int) wp_count_posts('post')->publish,
        ];
        $chat_on = method_exists(Chat::class, 'enabled') && Chat::enabled();
        rcm_view('admin/overview.php', compact('stats', 'recent', 'due', 'handoffs', 'counts', 'chat_on'));
    }

    public static function dashboard_widget(): void
    {
        if (!current_user_can('rcm_view_leads')) {
            return;
        }
        wp_add_dashboard_widget('rcm_leads_widget', __('RCM: new leads', 'rcm'), static function (): void {
            global $wpdb;
            if (!self::table_exists('leads')) {
                return;
            }
            $rows = $wpdb->get_results("SELECT id, name, company, source, created_at FROM " . rcm_table('leads') . " WHERE status = 'new' AND duplicate_of IS NULL ORDER BY created_at DESC LIMIT 5", ARRAY_A);
            if (!$rows) {
                echo '<p>' . esc_html__('No new leads.', 'rcm') . '</p>';
            }
            echo '<ul>';
            foreach ($rows as $r) {
                printf(
                    '<li><a href="%s">%s</a>%s <span class="description">(%s, %s)</span></li>',
                    esc_url(admin_url('admin.php?page=rcm-leads&lead=' . rawurlencode($r['id']))),
                    esc_html($r['name']),
                    $r['company'] ? ' · ' . esc_html($r['company']) : '',
                    esc_html($r['source']),
                    esc_html(mysql2date(get_option('date_format'), get_date_from_gmt($r['created_at'])))
                );
            }
            echo '</ul><p><a class="button" href="' . esc_url(admin_url('admin.php?page=rcm-leads')) . '">' . esc_html__('All leads', 'rcm') . '</a></p>';
        });
    }

    /* ------------------------------------------------------------------ */
    /*  Settings and system                                                */
    /* ------------------------------------------------------------------ */

    public static function settings(): void
    {
        if (!current_user_can('rcm_manage_settings')) {
            return;
        }
        rcm_view('admin/settings.php', ['s' => Settings::all(), 'key_from_config' => Settings::key_from_config(), 'has_key' => Settings::gemini_key() !== '']);
    }

    public static function tools(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }
        global $wpdb;
        $cron = [];
        foreach (['rcm_chat_sweep', 'rcm_daily_maintenance'] as $hook) {
            $next = wp_next_scheduled($hook);
            $cron[$hook] = $next ? wp_date('Y-m-d H:i', $next) : __('not scheduled', 'rcm');
        }
        $tables = [];
        foreach (['leads', 'lead_notes', 'lead_activity', 'chat_sessions', 'chat_messages', 'chat_flags', 'kb_items', 'events', 'audit_log', 'redirects', 'not_found'] as $t) {
            $tables[$t] = self::table_exists($t) ? (int) $wpdb->get_var('SELECT COUNT(*) FROM ' . rcm_table($t)) : null;
        }
        $bundle = [
            'services' => count(rcm_data('services')),
            'specialties' => count(rcm_data('specialties')),
            'tools' => count(rcm_data('tools')),
            'pages' => count(rcm_data('pages')),
            'blog' => count(rcm_data('blog')),
        ];
        rcm_view('admin/tools.php', [
            'report' => (array) get_option('rcm_last_import_report', []),
            'imported' => (string) get_option('rcm_content_imported', ''),
            'cron' => $cron,
            'tables' => $tables,
            'bundle' => $bundle,
            'php' => PHP_VERSION,
            'wp' => get_bloginfo('version'),
            'smtp' => is_plugin_active_safe('wp-mail-smtp/wp_mail_smtp.php'),
        ]);
    }

    public static function test_email(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('', 403);
        }
        check_admin_referer('rcm_test_email');
        $to = (string) rcm_setting('notify_email');
        $ok = wp_mail($to, '[RCM] Test email from ' . wp_parse_url(home_url(), PHP_URL_HOST), "This is a test of lead notifications from the RCM Core plugin.\n\nIf you received it, form and chat notifications will arrive at this address.");
        rcm_audit('system.test_email', 'settings', '', ['ok' => $ok]);
        wp_safe_redirect(add_query_arg(['page' => 'rcm-tools', 'rcm_test' => $ok ? 1 : 0, 'rcm_detail' => $ok ? sprintf(__('Sent to %s.', 'rcm'), $to) : __('wp_mail() returned false. Check WP Mail SMTP settings.', 'rcm')], admin_url('admin.php')));
        exit;
    }

    public static function test_ai(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('', 403);
        }
        check_admin_referer('rcm_test_ai');
        $key = Settings::gemini_key();
        $detail = __('No API key set.', 'rcm');
        $ok = false;
        if ($key) {
            $model = (string) rcm_setting('chat.model', 'gemini-3.8-flash');
            $res = wp_remote_post('https://generativelanguage.googleapis.com/v1beta/models/' . rawurlencode($model) . ':generateContent', [
                'headers' => ['Content-Type' => 'application/json', 'x-goog-api-key' => $key],
                'body' => (string) wp_json_encode(['contents' => [['role' => 'user', 'parts' => [['text' => 'Reply with the single word OK.']]]]]),
                'timeout' => 30,
            ]);
            if (is_wp_error($res)) {
                $detail = $res->get_error_message();
            } else {
                $code = (int) wp_remote_retrieve_response_code($res);
                $ok = $code === 200;
                $detail = $ok ? sprintf(__('Model %s answered.', 'rcm'), $model) : sprintf(__('HTTP %1$d from Gemini: %2$s', 'rcm'), $code, mb_substr(wp_strip_all_tags((string) wp_remote_retrieve_body($res)), 0, 200));
            }
        }
        rcm_audit('system.test_ai', 'settings', '', ['ok' => $ok]);
        wp_safe_redirect(add_query_arg(['page' => 'rcm-tools', 'rcm_test' => $ok ? 1 : 0, 'rcm_detail' => $detail], admin_url('admin.php')));
        exit;
    }
}

/** is_plugin_active() without requiring wp-admin/includes/plugin.php on every request. */
function is_plugin_active_safe(string $plugin): bool
{
    if (!function_exists('is_plugin_active')) {
        require_once ABSPATH . 'wp-admin/includes/plugin.php';
    }
    return is_plugin_active($plugin);
}
