<?php
/**
 * Template helpers for the Texas Solutions RCM theme.
 * They wrap RCM Core plugin functions and degrade gracefully without it.
 */

defined('ABSPATH') || exit;

const RCM_T_CONTENT_REVIEWED = '2026-10-12';

function rcm_t_icon(string $name, string $class = 'h-5 w-5'): void
{
    if (function_exists('rcm_the_icon')) {
        rcm_the_icon($name, $class);
    }
}

function rcm_t_has_plugin(): bool
{
    return function_exists('rcm_setting') && class_exists('RCM\\Content_Types');
}

function rcm_t_contact(): array
{
    $c = function_exists('rcm_contact') ? rcm_contact() : [];
    return $c + [
        'email' => 'info@texassolutions.co',
        'phone' => '+1 (838) 910-3147',
        'phone_href' => 'tel:+18389103147',
        'street' => '401 W Kentucky Ave',
        'city' => 'Midland',
        'region' => 'TX',
        'postal_code' => '79701',
        'hours' => '',
    ];
}

function rcm_t_url(string $key): string
{
    return function_exists('rcm_page_url') ? rcm_page_url($key) : home_url('/' . $key . '/');
}

function rcm_t_archive(string $type): string
{
    $url = get_post_type_archive_link($type);
    return $url ?: home_url('/');
}

/** Card data from an RCM post (service, specialty or tool). */
function rcm_t_item(WP_Post $p): array
{
    $d = rcm_t_has_plugin() ? RCM\Content_Types::data($p) : [];
    return [
        'url' => get_permalink($p),
        'title' => get_the_title($p),
        'short' => $d['shortName'] ?? get_the_title($p),
        'text' => $p->post_excerpt ?: ($d['summary'] ?? ''),
        'icon' => $d['icon'] ?? 'Circle',
        'data' => $d,
    ];
}

/** RCM posts for a list of content keys, in the given order. */
function rcm_t_by_keys(string $type, array $keys): array
{
    if (!rcm_t_has_plugin()) {
        return [];
    }
    $out = [];
    foreach ($keys as $k) {
        $p = RCM\Content_Types::by_key($type, (string) $k);
        if ($p) {
            $out[] = $p;
        }
    }
    return $out;
}

function rcm_t_all(string $type): array
{
    return rcm_t_has_plugin() ? array_values(RCM\Content_Types::all($type)) : [];
}

function rcm_t_part(string $slug, array $args = []): void
{
    get_template_part('template-parts/' . $slug, null, $args);
}

/** Card linking to a service, specialty, tool or any URL. */
function rcm_t_link_card(string $url, string $title, string $text = '', string $icon = '', string $meta = '', string $cta = ''): void
{
    rcm_t_part('link-card', compact('url', 'title', 'text', 'icon', 'meta', 'cta'));
}

function rcm_t_faqs(array $faqs, string $class = ''): void
{
    if ($faqs) {
        rcm_t_part('faq-list', ['faqs' => $faqs, 'class' => $class]);
    }
}

function rcm_t_cta_band(array $args = []): void
{
    rcm_t_part('cta-band', $args);
}

function rcm_t_reviewed(string $date = ''): void
{
    $date = $date ?: RCM_T_CONTENT_REVIEWED;
    printf(
        '<p class="text-sm text-ink-subtle">%s <time datetime="%s">%s</time>. %s</p>',
        esc_html__('Written by the Texas Solutions RCM team. Last reviewed', 'rcm-theme'),
        esc_attr($date),
        esc_html(date_i18n(get_option('date_format'), strtotime($date . ' 12:00:00'))),
        esc_html__('General information, not legal or coding advice; payer rules vary.', 'rcm-theme')
    );
}

function rcm_t_breadcrumbs(): void
{
    if (function_exists('rcm_the_breadcrumbs')) {
        rcm_the_breadcrumbs();
    }
}

/** Dental refocus key lists (core services, overviews, software, specialties, tools, posts). */
function rcm_t_dental(): array
{
    static $d = null;
    if ($d === null) {
        $d = function_exists('rcm_data') ? rcm_data('dental') : [];
        $d += ['core' => [], 'overview' => [], 'software' => [], 'specialties' => [], 'dentalTools' => [], 'dentalPosts' => [], 'categories' => []];
    }
    return $d;
}

/** [label, url] links for RCM posts by key; the label is the menu name when given. */
function rcm_t_key_links(string $type, array $keys, array $labels = []): array
{
    $out = [];
    foreach (rcm_t_by_keys($type, $keys) as $p) {
        $k = (string) get_post_meta($p->ID, '_rcm_key', true);
        $out[] = [$labels[$k] ?? get_the_title($p), get_permalink($p)];
    }
    return $out;
}

/** The 8 core dental services as [label, url], in the brief's menu order. */
function rcm_t_core_links(): array
{
    $core = rcm_t_dental()['core'];
    $names = array_column($core, 'name', 'slug');
    return rcm_t_key_links('rcm_service', array_column($core, 'slug'), $names);
}

function rcm_t_blog_url(): string
{
    return (int) get_option('page_for_posts') ? (string) get_permalink((int) get_option('page_for_posts')) : home_url('/blog/');
}

/** Header navigation (dental-only menu; desktop and mobile share it). */
function rcm_t_nav(): array
{
    $d = rcm_t_dental();
    $services = array_merge(
        rcm_t_key_links('rcm_service', ['revenue-cycle-management', 'dental-billing'], ['revenue-cycle-management' => __('Dental Revenue Cycle Management', 'rcm-theme'), 'dental-billing' => __('Dental Billing', 'rcm-theme')]),
        rcm_t_core_links()
    );
    $software = rcm_t_key_links('rcm_service', $d['software'], [
        'dentrix-billing-services' => 'Dentrix',
        'open-dental-billing-services' => 'Open Dental',
        'eaglesoft-billing-services' => 'Eaglesoft',
    ]);

    return [
        ['label' => __('Services', 'rcm-theme'), 'url' => rcm_t_archive('rcm_service'), 'wide' => true, 'groups' => [
            ['title' => __('Overview', 'rcm-theme'), 'links' => array_slice($services, 0, 2)],
            ['title' => __('Dental RCM services', 'rcm-theme'), 'links' => array_slice($services, 2, 4)],
            ['title' => __('Dental RCM services (continued)', 'rcm-theme'), 'links' => array_slice($services, 6)],
        ]],
        ['label' => __('Specialties', 'rcm-theme'), 'url' => rcm_t_archive('rcm_specialty'), 'groups' => [['title' => __('Dental specialties', 'rcm-theme'), 'links' => rcm_t_key_links('rcm_specialty', $d['specialties'])]]],
        ['label' => __('Software', 'rcm-theme'), 'url' => rcm_t_url('technology'), 'groups' => [['title' => __('Dental software', 'rcm-theme'), 'links' => $software]]],
        ['label' => __('Resources', 'rcm-theme'), 'url' => rcm_t_blog_url(), 'groups' => [['title' => __('Resources', 'rcm-theme'), 'links' => [
            [__('Blog', 'rcm-theme'), rcm_t_blog_url()],
            [__('Free Dental RCM Tools', 'rcm-theme'), rcm_t_archive('rcm_tool')],
            [__('FAQs', 'rcm-theme'), rcm_t_url('faq')],
        ]]]],
        ['label' => __('About', 'rcm-theme'), 'url' => rcm_t_url('about'), 'groups' => [['title' => __('Company', 'rcm-theme'), 'links' => [
            [__('About Us', 'rcm-theme'), rcm_t_url('about')],
            [__('How We Work', 'rcm-theme'), rcm_t_url('how-we-work')],
            [__('Pricing', 'rcm-theme'), rcm_t_url('pricing')],
            [__('Security and Privacy', 'rcm-theme'), rcm_t_url('security')],
            [__('Service Areas', 'rcm-theme'), rcm_t_url('service-areas')],
        ]]]],
        ['label' => __('Contact', 'rcm-theme'), 'url' => rcm_t_url('contact')],
    ];
}

/** Lead from the _rcm_intro meta (set by the importer) or the excerpt. */
function rcm_t_page_intro(int $id): string
{
    $intro = (string) get_post_meta($id, '_rcm_intro', true);
    return $intro ?: (has_excerpt($id) ? get_the_excerpt($id) : '');
}

/** Reading time for posts (stored on import, otherwise estimated). */
function rcm_t_reading_minutes(int $id): int
{
    $m = (int) get_post_meta($id, '_rcm_reading_minutes', true);
    if ($m) {
        return $m;
    }
    $words = str_word_count(wp_strip_all_tags((string) get_post_field('post_content', $id)));
    return max(1, (int) round($words / 230));
}

/** Decoded JSON meta (works with or without the plugin). */
function rcm_t_json_meta(int $id, string $key): array
{
    $raw = get_post_meta($id, $key, true);
    if (is_array($raw)) {
        return $raw;
    }
    $d = json_decode((string) $raw, true);
    return is_array($d) ? $d : [];
}

function rcm_t_form(string $variant, array $args = []): void
{
    if (class_exists('RCM\\Forms')) {
        echo RCM\Forms::render($variant, $args); // phpcs:ignore WordPress.Security.EscapeOutput -- rendered and escaped by the plugin.
    } else {
        printf('<p>%s <a href="mailto:%2$s">%2$s</a></p>', esc_html__('Email us at', 'rcm-theme'), esc_attr(rcm_t_contact()['email']));
    }
}

/** Service and specialty options for forms (plugin renders them itself; kept for templates). */
function rcm_t_specialty_names(): array
{
    return array_map(static fn(WP_Post $p): string => get_the_title($p), rcm_t_all('rcm_specialty'));
}
