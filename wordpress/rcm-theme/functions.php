<?php
/**
 * Texas Solutions RCM theme setup.
 */

defined('ABSPATH') || exit;

define('RCM_THEME_VERSION', '1.0.0');

require_once get_template_directory() . '/inc/template-tags.php';

add_action('after_setup_theme', static function (): void {
    load_theme_textdomain('rcm-theme', get_template_directory() . '/languages');
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', ['search-form', 'gallery', 'caption', 'style', 'script', 'navigation-widgets']);
    add_theme_support('responsive-embeds');
    add_theme_support('align-wide');
    add_theme_support('editor-styles');
    add_editor_style('assets/css/site.css');
    add_image_size('rcm-card', 800, 450, true);
    add_image_size('rcm-hero', 1600, 900, true);
    register_nav_menus([
        'footer_company' => __('Footer: company links', 'rcm-theme'),
        'footer_legal' => __('Footer: legal links', 'rcm-theme'),
    ]);
});

add_action('wp_enqueue_scripts', static function (): void {
    $css = get_template_directory() . '/assets/css/site.css';
    wp_enqueue_style('rcm-theme', get_template_directory_uri() . '/assets/css/site.css', [], file_exists($css) ? (string) filemtime($css) : RCM_THEME_VERSION);
    // The block library styles are not used by this theme's templates.
    if (!is_singular(['post', 'page'])) {
        wp_dequeue_style('wp-block-library');
        wp_dequeue_style('global-styles');
        wp_dequeue_style('classic-theme-styles');
    }
});

/** Preload the two variable fonts used above the fold. */
add_action('wp_head', static function (): void {
    foreach (['plus-jakarta-sans', 'inter'] as $font) {
        printf('<link rel="preload" href="%s" as="font" type="font/woff2" crossorigin>' . "\n", esc_url(get_template_directory_uri() . '/assets/fonts/' . $font . '.woff2'));
    }
    echo '<meta name="theme-color" content="#0f1f3f">' . "\n";
}, 2);

/** Favicons. */
add_action('wp_head', static function (): void {
    if (has_site_icon()) {
        return;
    }
    printf('<link rel="icon" href="%s" sizes="32x32" type="image/png">' . "\n", esc_url(get_template_directory_uri() . '/assets/img/favicon-32.png'));
    printf('<link rel="apple-touch-icon" href="%s">' . "\n", esc_url(get_template_directory_uri() . '/assets/img/apple-touch-icon.png'));
}, 3);

/** Remove emoji scripts and other front-end extras the site does not use. */
add_action('init', static function (): void {
    remove_action('wp_head', 'print_emoji_detection_script', 7);
    remove_action('wp_print_styles', 'print_emoji_styles');
    remove_action('wp_head', 'wlwmanifest_link');
    remove_action('wp_head', 'rsd_link');
    remove_action('wp_head', 'wp_shortlink_wp_head');
});

add_filter('excerpt_length', static fn(): int => 28);
add_filter('excerpt_more', static fn(): string => '…');

/** Body class for pages that use the dark hero header. */
add_filter('body_class', static function (array $classes): array {
    $classes[] = 'rcm-theme';
    return $classes;
});

/** Warn admins if the plugin is missing. */
add_action('admin_notices', static function (): void {
    if (!function_exists('rcm_setting') && current_user_can('activate_plugins')) {
        echo '<div class="notice notice-error"><p>' . esc_html__('The Texas Solutions RCM theme needs the RCM Core plugin. Please activate it.', 'rcm-theme') . '</p></div>';
    }
});

/** Search covers posts, pages and the RCM content types. */
add_action('pre_get_posts', static function (WP_Query $q): void {
    if (!is_admin() && $q->is_main_query() && $q->is_search()) {
        $q->set('post_type', ['post', 'page', 'rcm_service', 'rcm_specialty', 'rcm_tool']);
        $q->set('posts_per_page', 20);
        // Legal pages are not search results.
        $legal = get_posts(['post_type' => 'page', 'post_status' => 'publish', 'fields' => 'ids', 'numberposts' => -1, 'meta_key' => '_wp_page_template', 'meta_value' => 'page-templates/legal.php']);
        if ($legal) {
            $q->set('post__not_in', array_map('intval', $legal));
        }
        // Dental-only site: non-dental billing searches return no results (search.php explains why).
        if (rcm_t_non_dental_query((string) $q->get('s'))) {
            $q->set('post__in', [0]);
        }
    }
});

/** True when a search is for non-dental billing topics (medical code sets, medical software or specialties). */
function rcm_t_non_dental_query(string $s): bool
{
    $s = strtolower(trim($s));
    if ($s === '') {
        return false;
    }
    $terms = ['cardiology', 'icd-10', 'icd10', 'icd 10', 'icd', 'cpt', 'hcpcs', '837p', 'cms-1500', 'kareo', 'tebra', 'athenahealth', 'eclinicalworks', 'advancedmd', 'medical billing', 'medical coding', 'physician', 'dermatology', 'orthopedic', 'radiology', 'oncology', 'urgent care', 'chiropractic', 'behavioral health', 'mental health', 'physical therapy', 'anesthesia billing', 'hospitalist', 'gastroenterology', 'neurology', 'pediatrics billing', 'telehealth'];
    foreach ($terms as $t) {
        if (preg_match('/(^|[^a-z0-9])' . preg_quote($t, '/') . '([^a-z0-9]|$)/', $s)) {
            return true;
        }
    }
    return false;
}

/** The home page shows the company FAQs, so they belong in its FAQPage structured data. */
add_filter('rcm_visible_faqs', static function (array $faqs): array {
    if (is_front_page() && function_exists('rcm_data')) {
        $faqs = array_merge($faqs, (array) (rcm_data('company')['HOME_FAQS'] ?? []));
    }
    return $faqs;
});

/**
 * Homepage weight (dental brief: HTML under 150 KB). The homepage is built entirely from theme
 * templates, so WordPress's block-editor styles are not needed there, and the template
 * indentation is stripped (whitespace between lines carries no meaning on this page).
 */
add_action('wp_enqueue_scripts', static function (): void {
    if (is_front_page()) {
        foreach (['wp-block-library', 'wp-block-library-theme', 'classic-theme-styles', 'global-styles'] as $h) {
            wp_dequeue_style($h);
        }
    }
}, 100);
add_action('template_redirect', static function (): void {
    if (is_front_page() && !is_admin() && !is_feed() && !wp_doing_ajax()) {
        ob_start(static fn(string $html): string => (string) preg_replace('/\n[ \t]+/', "\n", $html));
    }
}, 1);
