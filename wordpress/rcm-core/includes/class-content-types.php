<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Custom post types and taxonomies.
 *
 * Structured fields for services, specialties and tools are stored as one JSON
 * document in post meta `_rcm_data` (edited in RCM meta boxes). The original
 * import key is kept in `_rcm_key` so calculators keep working if a slug changes.
 */
final class Content_Types
{
    public const SERVICE = 'rcm_service';
    public const SPECIALTY = 'rcm_specialty';
    public const TOOL = 'rcm_tool';
    public const FAQ = 'rcm_faq';
    public const CASE_STUDY = 'rcm_case_study';
    public const TESTIMONIAL = 'rcm_testimonial';
    public const INTEGRATION = 'rcm_integration';
    public const JOB = 'rcm_job';

    public const SERVICE_CATEGORIES = [
        'end-to-end' => ['End-to-end RCM', 'One team responsible for the whole cycle, from eligibility to the final patient balance.'],
        'front-end' => ['Front-end revenue cycle', 'Registration, eligibility, benefits and authorizations: the work that prevents denials before the visit.'],
        'mid-cycle' => ['Mid-cycle: coding and claims', 'Turning documentation into accurate charges and clean claims.'],
        'back-end' => ['Back-end: payments, denials and AR', 'Posting, follow-up, appeals and recovery until every claim is resolved.'],
        'enrollment' => ['Credentialing and payer relations', 'Getting providers enrolled, keeping them active and understanding what payers owe you.'],
        'analytics' => ['Audits, analytics and optimization', 'Measuring revenue cycle performance and fixing what the numbers show.'],
        'practice-support' => ['Practice and administrative support', 'Remote administrative help that works inside your systems.'],
        'dental' => ['Dental revenue cycle', 'Insurance verification, claims, credentialing, AR and fee negotiation support built for dental offices.'],
        'programs' => ['Virtual care and care management billing', 'Billing for remote patient monitoring, chronic care management and other recurring care programs.'],
        'software' => ['Billing in your software', 'Our team works inside the practice management system you already use.'],
    ];

    public const TOOL_CATEGORIES = [
        'revenue' => ['Revenue and ROI', 'Project revenue, compare billing options and estimate what is being lost.'],
        'cost' => ['Billing cost', 'What billing really costs per claim, per FTE and per year.'],
        'kpi' => ['RCM KPIs', 'Collection rates, days in AR, denial and clean claim rates.'],
        'dental' => ['Dental RCM', 'Calculators and checklists for dental practices.'],
        'lookup' => ['Provider lookups', 'Search the NPI Registry.'],
        'checklist' => ['Checklists', 'Printable checklists for authorizations, claims, appeals and credentialing.'],
        'reference' => ['Reference guides', 'Glossaries, denial reasons, EOB and ERA explained.'],
    ];

    public static function init(): void
    {
        add_action('init', [self::class, 'register']);
        add_filter('enter_title_here', [self::class, 'title_placeholder'], 10, 2);
        add_filter('wp_sitemaps_post_types', [self::class, 'sitemap_types']);
        add_action('pre_get_posts', [self::class, 'archive_queries']);
    }

    public static function register(): void
    {
        $common = [
            'public' => true,
            'show_in_rest' => true,
            'show_in_menu' => 'rcm',
            'capability_type' => 'page',
            'map_meta_cap' => true,
            'hierarchical' => false,
            'menu_icon' => 'dashicons-heart',
        ];

        register_post_type(self::SERVICE, $common + [
            'labels' => self::labels('Service', 'Services'),
            'has_archive' => 'services',
            'rewrite' => ['slug' => 'services', 'with_front' => false],
            'supports' => ['title', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        ]);
        register_post_type(self::SPECIALTY, $common + [
            'labels' => self::labels('Specialty', 'Specialties'),
            'has_archive' => 'specialties',
            'rewrite' => ['slug' => 'specialties', 'with_front' => false],
            'supports' => ['title', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        ]);
        register_post_type(self::TOOL, $common + [
            'labels' => self::labels('Tool', 'RCM Tools'),
            'has_archive' => 'tools',
            'rewrite' => ['slug' => 'tools', 'with_front' => false],
            'supports' => ['title', 'excerpt', 'revisions', 'page-attributes'],
        ]);
        register_post_type(self::FAQ, array_merge($common, [
            'labels' => self::labels('FAQ', 'FAQs'),
            'public' => false,
            'show_ui' => true,
            'has_archive' => false,
            'rewrite' => false,
            'supports' => ['title', 'editor', 'page-attributes', 'revisions'],
        ]));
        register_post_type(self::CASE_STUDY, $common + [
            'labels' => self::labels('Case Study', 'Case Studies'),
            'has_archive' => 'case-studies',
            'rewrite' => ['slug' => 'case-studies', 'with_front' => false],
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions'],
        ]);
        register_post_type(self::TESTIMONIAL, array_merge($common, [
            'labels' => self::labels('Testimonial', 'Testimonials'),
            'public' => false,
            'show_ui' => true,
            'has_archive' => false,
            'rewrite' => false,
            'supports' => ['title', 'editor', 'revisions'],
        ]));
        register_post_type(self::INTEGRATION, $common + [
            'labels' => self::labels('Integration', 'Integrations'),
            'has_archive' => false,
            'rewrite' => ['slug' => 'integrations', 'with_front' => false],
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes'],
        ]);
        register_post_type(self::JOB, $common + [
            'labels' => self::labels('Job Opening', 'Job Openings'),
            'has_archive' => false,
            'rewrite' => ['slug' => 'careers/jobs', 'with_front' => false],
            'supports' => ['title', 'editor', 'excerpt', 'revisions'],
        ]);

        register_taxonomy('rcm_service_category', [self::SERVICE], [
            'labels' => ['name' => __('Service categories', 'rcm'), 'singular_name' => __('Service category', 'rcm')],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'hierarchical' => true,
            'rewrite' => false,
        ]);
        register_taxonomy('rcm_specialty_kind', [self::SPECIALTY], [
            'labels' => ['name' => __('Specialty groups', 'rcm'), 'singular_name' => __('Specialty group', 'rcm')],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'hierarchical' => true,
            'rewrite' => false,
        ]);
        register_taxonomy('rcm_tool_category', [self::TOOL], [
            'labels' => ['name' => __('Tool categories', 'rcm'), 'singular_name' => __('Tool category', 'rcm')],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'hierarchical' => true,
            'rewrite' => false,
        ]);
        register_taxonomy('rcm_faq_topic', [self::FAQ], [
            'labels' => ['name' => __('FAQ topics', 'rcm'), 'singular_name' => __('FAQ topic', 'rcm')],
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'hierarchical' => true,
            'rewrite' => false,
        ]);

        foreach ([self::SERVICE, self::SPECIALTY, self::TOOL] as $type) {
            register_post_meta($type, '_rcm_data', ['type' => 'string', 'single' => true, 'show_in_rest' => false, 'auth_callback' => static fn() => current_user_can('edit_pages')]);
            register_post_meta($type, '_rcm_key', ['type' => 'string', 'single' => true, 'show_in_rest' => false, 'auth_callback' => static fn() => current_user_can('edit_pages')]);
        }
    }

    private static function labels(string $one, string $many): array
    {
        return [
            'name' => $many,
            'singular_name' => $one,
            'menu_name' => $many,
            'add_new_item' => sprintf(__('Add %s', 'rcm'), $one),
            'edit_item' => sprintf(__('Edit %s', 'rcm'), $one),
            'new_item' => sprintf(__('New %s', 'rcm'), $one),
            'view_item' => sprintf(__('View %s', 'rcm'), $one),
            'search_items' => sprintf(__('Search %s', 'rcm'), $many),
            'not_found' => sprintf(__('No %s found', 'rcm'), strtolower($many)),
            'all_items' => $many,
        ];
    }

    public static function title_placeholder(string $text, \WP_Post $post): string
    {
        return match ($post->post_type) {
            self::FAQ => __('Question', 'rcm'),
            self::TESTIMONIAL => __('Person name and role', 'rcm'),
            default => $text,
        };
    }

    public static function sitemap_types(array $types): array
    {
        unset($types[self::FAQ], $types[self::TESTIMONIAL]);
        return $types;
    }

    /** Archives list everything in menu order; case studies only when approved. */
    public static function archive_queries(\WP_Query $q): void
    {
        if (is_admin() || !$q->is_main_query()) {
            return;
        }
        if ($q->is_post_type_archive([self::SERVICE, self::SPECIALTY, self::TOOL])) {
            $q->set('posts_per_page', -1);
            $q->set('orderby', ['menu_order' => 'ASC', 'title' => 'ASC']);
        }
        if ($q->is_post_type_archive(self::CASE_STUDY)) {
            $q->set('meta_query', [['key' => '_rcm_approved', 'value' => '1']]);
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Read helpers used by templates                                     */
    /* ------------------------------------------------------------------ */

    /** Structured data for a service/specialty/tool post. */
    public static function data(int|\WP_Post $post): array
    {
        $id = $post instanceof \WP_Post ? $post->ID : $post;
        return (array) rcm_meta($id, '_rcm_data', []);
    }

    public static function key(int|\WP_Post $post): string
    {
        $p = get_post($post);
        return $p ? ((string) get_post_meta($p->ID, '_rcm_key', true) ?: $p->post_name) : '';
    }

    /** Published posts of a type, keyed by import key, in menu order. */
    public static function all(string $type): array
    {
        static $cache = [];
        if (!isset($cache[$type])) {
            $posts = get_posts(['post_type' => $type, 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => ['menu_order' => 'ASC', 'title' => 'ASC'], 'no_found_rows' => true]);
            $cache[$type] = [];
            foreach ($posts as $p) {
                $cache[$type][self::key($p)] = $p;
            }
        }
        return $cache[$type];
    }

    public static function by_key(string $type, string $key): ?\WP_Post
    {
        return self::all($type)[$key] ?? null;
    }

    /** Only approved items may be shown publicly (case studies, testimonials, integrations). */
    public static function approved(string $type, int $limit = -1): array
    {
        return get_posts([
            'post_type' => $type,
            'post_status' => 'publish',
            'numberposts' => $limit,
            'meta_query' => [['key' => '_rcm_approved', 'value' => '1']],
            'orderby' => ['menu_order' => 'ASC', 'date' => 'DESC'],
        ]);
    }

    public static function service_category(\WP_Post $p): string
    {
        $terms = get_the_terms($p, 'rcm_service_category');
        return $terms && !is_wp_error($terms) ? $terms[0]->slug : ((string) (self::data($p)['category'] ?? ''));
    }

    public static function tool_category(\WP_Post $p): string
    {
        $terms = get_the_terms($p, 'rcm_tool_category');
        return $terms && !is_wp_error($terms) ? $terms[0]->slug : ((string) (self::data($p)['category'] ?? ''));
    }

    public static function specialty_kind(\WP_Post $p): string
    {
        $terms = get_the_terms($p, 'rcm_specialty_kind');
        return $terms && !is_wp_error($terms) ? $terms[0]->slug : ((string) (self::data($p)['kind'] ?? 'medical'));
    }
}
