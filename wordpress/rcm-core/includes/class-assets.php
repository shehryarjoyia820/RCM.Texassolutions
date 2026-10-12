<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Front-end and admin script loading, plus the window.RCM runtime config.
 */
final class Assets
{
    public static function init(): void
    {
        add_action('wp_enqueue_scripts', [self::class, 'front'], 5);
        add_action('admin_enqueue_scripts', [self::class, 'admin']);
        add_action('rest_api_init', [self::class, 'routes']);
    }

    /**
     * Pages are cached by WP Super Cache, so the nonce printed in window.RCM can
     * be stale. site.js refreshes it from this uncached endpoint before the
     * first form or chat request.
     */
    public static function routes(): void
    {
        register_rest_route('rcm/v1', '/nonce', [
            'methods' => 'GET',
            'permission_callback' => '__return_true',
            'callback' => static function (): \WP_REST_Response {
                $r = new \WP_REST_Response(['nonce' => wp_create_nonce('wp_rest')]);
                $r->header('Cache-Control', 'no-store, max-age=0');
                return $r;
            },
        ]);
    }

    private static function ver(string $rel): string
    {
        $file = RCM_DIR . $rel;
        return file_exists($file) ? (string) filemtime($file) : RCM_VERSION;
    }

    public static function config(): array
    {
        $analytics = class_exists(Analytics::class) && method_exists(Analytics::class, 'config') ? Analytics::config() : [];
        return array_merge([
            'rest' => esc_url_raw(rest_url('rcm/v1/')),
            'nonce' => wp_create_nonce('wp_rest'),
            'ga4' => (string) ($analytics['ga4'] ?? rcm_setting('analytics.ga4_id', '')),
            'chat' => [
                'enabled' => class_exists(Chat::class) && method_exists(Chat::class, 'enabled') ? Chat::enabled() : false,
                'welcome' => (string) rcm_setting('chat.welcome', ''),
            ],
            'privacyUrl' => rcm_page_url('privacy-policy'),
            'cookieUrl' => rcm_page_url('cookie-policy'),
            'consultationUrl' => rcm_page_url('consultation'),
            'phiWarning' => __('Please do not include patient names, dates of birth, member IDs, diagnoses or any other patient health information. This form is for business enquiries only.', 'rcm'),
            'consentText' => __('I agree that Texas Solutions may store these details and contact me by email or phone about this enquiry, as described in the Privacy Policy.', 'rcm'),
            'chatConsentText' => __('I agree that Texas Solutions may store this chat and my contact details and contact me about my enquiry, as described in the Privacy Policy. I will not share patient information.', 'rcm'),
        ], $analytics);
    }

    public static function front(): void
    {
        wp_register_script('rcm-site', RCM_URL . 'assets/js/site.js', [], self::ver('assets/js/site.js'), ['in_footer' => true, 'strategy' => 'defer']);
        // The nonce in this config would be stale in cached pages, so REST routes
        // that may be called from cached pages also accept requests without it.
        wp_add_inline_script('rcm-site', 'window.RCM=' . wp_json_encode(self::config()) . ';', 'before');
        wp_enqueue_script('rcm-site');
    }

    public static function admin(string $hook): void
    {
        $screen = get_current_screen();
        $is_rcm = str_contains($hook, 'rcm') || in_array($hook, ['profile.php', 'user-edit.php'], true) || ($screen && str_starts_with((string) $screen->post_type, 'rcm_')) || ($screen && $screen->base === 'post');
        if (!$is_rcm) {
            return;
        }
        wp_enqueue_style('rcm-admin', RCM_URL . 'assets/css/admin.css', [], self::ver('assets/css/admin.css'));
        if (file_exists(RCM_DIR . 'assets/js/admin.js')) {
            wp_enqueue_script('rcm-admin', RCM_URL . 'assets/js/admin.js', [], self::ver('assets/js/admin.js'), ['in_footer' => true]);
        }
    }
}
