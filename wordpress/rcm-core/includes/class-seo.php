<?php
declare(strict_types=1);

namespace RCM {

defined('ABSPATH') || exit;

/**
 * SEO: titles, meta descriptions, canonical URLs, robots, Open Graph and
 * Twitter cards, one JSON-LD @graph per page, breadcrumbs, core sitemap
 * tweaks, robots.txt, llms.txt, editor meta boxes and the RCM > SEO screen.
 *
 * Post meta (all single strings):
 *   _rcm_seo_title, _rcm_meta_description, _rcm_canonical, _rcm_noindex ('1'),
 *   _rcm_og_image (attachment id), _rcm_focus_keyword,
 *   posts only: _rcm_faqs (JSON [{q,a}]), _rcm_sources (JSON [{label,url}]),
 *   _rcm_reviewer, _rcm_cta (consultation|tools|none).
 *
 * Filters for the theme and other modules:
 *   rcm_visible_faqs (array $faqs, ?WP_Post $post)  FAQs rendered on the current page.
 *   rcm_breadcrumbs (array $crumbs)                 list of [name, url].
 *   rcm_seo_context (array $context)                resolved title/description/canonical/noindex.
 *   rcm_seo_archive_meta (array $meta, string $post_type)
 *   rcm_seo_graph (array $nodes, array $context)    JSON-LD nodes before output.
 */
final class SEO
{
    public const TYPES = ['post', 'page', 'rcm_service', 'rcm_specialty', 'rcm_tool', 'rcm_case_study', 'rcm_integration', 'rcm_job'];
    public const DATA_TYPES = ['rcm_service', 'rcm_specialty', 'rcm_tool'];
    public const ADMIN_TYPES = ['page', 'post', 'rcm_service', 'rcm_specialty', 'rcm_tool'];
    public const TITLE_MAX = 60;
    public const DESC_MIN = 120;
    public const DESC_MAX = 158;
    public const CTA_CHOICES = ['consultation', 'tools', 'none'];
    private const LLMS_CACHE = 'rcm_llms_txt';
    private const PER_PAGE = 50;

    private static ?array $ctx = null;
    private static ?array $crumbs = null;

    public static function init(): void
    {
        // Editor and admin.
        add_action('add_meta_boxes', [self::class, 'meta_boxes'], 20, 2);
        add_action('save_post', [self::class, 'save_post'], 10, 2);
        add_action('admin_enqueue_scripts', [self::class, 'admin_assets'], 20);
        add_action('admin_post_rcm_seo_quick_edit', [self::class, 'quick_edit']);

        // Document head.
        remove_action('wp_head', 'rel_canonical');
        remove_action('wp_head', 'wp_shortlink_wp_head');
        add_filter('pre_get_document_title', [self::class, 'document_title'], 20);
        add_filter('document_title_separator', [self::class, 'title_separator']);
        add_filter('document_title_parts', [self::class, 'title_parts'], 20);
        add_filter('wp_robots', [self::class, 'robots'], 20);
        add_action('wp_head', [self::class, 'head'], 1);

        // Sitemaps and robots.txt.
        add_filter('wp_sitemaps_add_provider', [self::class, 'sitemap_provider'], 10, 2);
        add_filter('wp_sitemaps_taxonomies', [self::class, 'sitemap_taxonomies']);
        add_filter('wp_sitemaps_posts_query_args', [self::class, 'sitemap_query_args'], 10, 2);
        add_filter('wp_sitemaps_posts_entry', [self::class, 'sitemap_entry'], 10, 2);
        add_filter('robots_txt', [self::class, 'robots_txt'], 5, 2);

        // llms.txt and llms-full.txt.
        add_action('parse_request', [self::class, 'llms_txt'], 1);
        add_action('save_post', [self::class, 'flush_llms_cache']);
        add_action('deleted_post', [self::class, 'flush_llms_cache']);
        add_action('trashed_post', [self::class, 'flush_llms_cache']);
    }

    /* ------------------------------------------------------------------ */
    /*  Small helpers                                                      */
    /* ------------------------------------------------------------------ */

    public static function site_name(): string
    {
        $name = self::plain((string) get_bloginfo('name'));
        return $name !== '' ? $name : 'Texas Solutions RCM';
    }

    private static function site_description(): string
    {
        $d = self::plain((string) get_bloginfo('description'));
        if (mb_strlen($d) >= 60) {
            return $d;
        }
        return __('Texas Solutions RCM provides dental billing and revenue cycle management for US dental practices: insurance verification, claims, denials, payment posting, A/R and credentialing.', 'rcm');
    }

    /** Plain single-line text: tags stripped, entities decoded, whitespace collapsed. */
    public static function plain(string $s): string
    {
        $s = wp_strip_all_tags(strip_shortcodes($s));
        $s = html_entity_decode($s, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        return trim((string) preg_replace('/\s+/u', ' ', $s));
    }

    /** Cuts text to $max characters at a word boundary. */
    private static function cut(string $s, int $max): string
    {
        if (mb_strlen($s) <= $max) {
            return $s;
        }
        $s = mb_substr($s, 0, $max);
        $sp = mb_strrpos($s, ' ');
        if ($sp !== false && $sp > $max * 0.6) {
            $s = mb_substr($s, 0, $sp);
        }
        return rtrim($s, " ,;:-") . '…';
    }

    /** Appends the site name when it fits within the title target. */
    public static function compose_title(string $title): string
    {
        $site = self::site_name();
        $title = trim($title);
        if ($title === '') {
            return $site;
        }
        if (mb_stripos($title, $site) !== false) {
            return $title;
        }
        $full = $title . ' | ' . $site;
        return mb_strlen($full) <= self::TITLE_MAX ? $full : $title;
    }

    /** Structured `_rcm_data` for services, specialties and tools. */
    private static function data(\WP_Post $p): array
    {
        if (!in_array($p->post_type, self::DATA_TYPES, true)) {
            return [];
        }
        $d = rcm_meta($p->ID, '_rcm_data', []);
        return is_array($d) ? $d : [];
    }

    private static function str(mixed $v): string
    {
        return is_scalar($v) ? trim((string) $v) : '';
    }

    /**
     * Effective SEO values for a post, with where each one came from.
     *
     * @return array{title:string,title_raw:string,title_source:string,description:string,description_source:string,noindex:bool,canonical:string,focus:string}
     */
    public static function meta_for(\WP_Post $p): array
    {
        $custom_title = self::plain((string) get_post_meta($p->ID, '_rcm_seo_title', true));
        [$raw, $tsrc] = $custom_title !== '' ? [$custom_title, 'custom'] : self::fallback_title($p);

        $custom_desc = self::plain((string) get_post_meta($p->ID, '_rcm_meta_description', true));
        [$desc, $dsrc] = $custom_desc !== '' ? [$custom_desc, 'custom'] : self::fallback_description($p);

        return [
            'title' => self::compose_title($raw),
            'title_raw' => $raw,
            'title_source' => $tsrc,
            'description' => $desc,
            'description_source' => $dsrc,
            'noindex' => get_post_meta($p->ID, '_rcm_noindex', true) === '1',
            'canonical' => (string) get_post_meta($p->ID, '_rcm_canonical', true),
            'focus' => (string) get_post_meta($p->ID, '_rcm_focus_keyword', true),
        ];
    }

    /** Title used when no custom SEO title is set: [text, source]. */
    private static function fallback_title(\WP_Post $p): array
    {
        $d = self::data($p);
        if (self::str($d['seoTitle'] ?? '') !== '') {
            return [self::plain(self::str($d['seoTitle'])), 'content'];
        }
        return [self::plain($p->post_title), 'post'];
    }

    /** Description used when no custom meta description is set: [text, source]. */
    private static function fallback_description(\WP_Post $p): array
    {
        $d = self::data($p);
        if (self::str($d['metaDescription'] ?? '') !== '') {
            return [self::plain(self::str($d['metaDescription'])), 'content'];
        }
        if (trim($p->post_excerpt) !== '') {
            return [self::cut(self::plain($p->post_excerpt), self::DESC_MAX), 'excerpt'];
        }
        if (self::str($d['summary'] ?? '') !== '') {
            return [self::cut(self::plain(self::str($d['summary'])), self::DESC_MAX), 'summary'];
        }
        $auto = self::cut(self::plain(excerpt_remove_blocks($p->post_content)), self::DESC_MAX);
        return [$auto, $auto === '' ? 'none' : 'auto'];
    }

    /** Open Graph image: SEO image, featured image, settings default, theme default. */
    private static function image(?\WP_Post $p): ?array
    {
        $ids = [];
        if ($p) {
            $ids[] = (int) get_post_meta($p->ID, '_rcm_og_image', true);
            $ids[] = (int) get_post_thumbnail_id($p);
        }
        $ids[] = (int) rcm_setting('seo.default_og_image', 0);
        foreach ($ids as $id) {
            if ($id <= 0) {
                continue;
            }
            $src = wp_get_attachment_image_src($id, 'full');
            if ($src) {
                return [
                    'url' => (string) $src[0],
                    'width' => (int) $src[1],
                    'height' => (int) $src[2],
                    'alt' => self::plain((string) get_post_meta($id, '_wp_attachment_image_alt', true)),
                ];
            }
        }
        foreach (['assets/img/og-default.png', 'assets/img/og-default.jpg'] as $file) {
            if (file_exists(get_theme_file_path($file))) {
                return ['url' => get_theme_file_uri($file), 'width' => 1200, 'height' => 630, 'alt' => ''];
            }
        }
        return null;
    }

    private static function paged_url(string $base, int $paged): string
    {
        if ($paged <= 1) {
            return $base;
        }
        global $wp_rewrite;
        if ($wp_rewrite instanceof \WP_Rewrite && $wp_rewrite->using_permalinks() && !str_contains($base, '?')) {
            return trailingslashit($base) . user_trailingslashit($wp_rewrite->pagination_base . '/' . $paged, 'paged');
        }
        return add_query_arg('paged', $paged, $base);
    }

    private static function blog_page(): ?\WP_Post
    {
        $id = (int) get_option('page_for_posts');
        $p = $id ? get_post($id) : null;
        return $p instanceof \WP_Post && $p->post_status === 'publish' ? $p : null;
    }

    private static function blog_url(): string
    {
        $p = self::blog_page();
        return $p ? (string) get_permalink($p) : home_url('/blog/');
    }

    private static function blog_label(): string
    {
        $p = self::blog_page();
        return $p ? self::plain($p->post_title) : __('Blog', 'rcm');
    }

    /** Default titles and descriptions for post type archives. */
    private static function archive_meta(string $pt): array
    {
        $defaults = [
            'rcm_service' => [
                __('Dental Billing & RCM Services', 'rcm'),
                __('Dental billing and RCM services for US dental practices: insurance verification, claims, denials, payment posting, A/R, patient billing, credentialing and reporting.', 'rcm'),
            ],
            'rcm_specialty' => [
                __('Dental Specialties We Bill For', 'rcm'),
                __('Dental billing support by specialty: how claims, carrier rules and common denials differ for general, pediatric, orthodontic, oral surgery and other dental practices.', 'rcm'),
            ],
            'rcm_tool' => [
                __('Free Dental Billing Calculators & Checklists', 'rcm'),
                __('Free dental billing calculators, checklists and reference guides for US dental practices: collections, A/R, denials, verification and more.', 'rcm'),
            ],
            'rcm_case_study' => [
                __('Case Studies', 'rcm'),
                __('Revenue cycle case studies from Texas Solutions RCM: the problem, the work done inside the practice systems and what changed afterward.', 'rcm'),
            ],
        ];
        $obj = get_post_type_object($pt);
        $row = $defaults[$pt] ?? [$obj ? (string) $obj->labels->name : '', ''];
        $meta = apply_filters('rcm_seo_archive_meta', ['title' => $row[0], 'description' => $row[1]], $pt);
        return [
            'title' => self::plain((string) ($meta['title'] ?? '')),
            'description' => self::plain((string) ($meta['description'] ?? '')),
        ];
    }

    /* ------------------------------------------------------------------ */
    /*  Request context                                                    */
    /* ------------------------------------------------------------------ */

    /**
     * Resolved SEO values for the current front-end request (cached).
     *
     * Keys: title (without site name), title_full, description, canonical,
     * noindex, og_type, image (?array), post (?WP_Post), page_type, paged.
     */
    public static function context(): array
    {
        if (self::$ctx !== null) {
            return self::$ctx;
        }
        $paged = max(1, (int) get_query_var('paged'));
        $c = [
            'title' => '',
            'title_full' => '',
            'description' => '',
            'canonical' => '',
            'noindex' => false,
            'og_type' => 'website',
            'image' => null,
            'post' => null,
            'page_type' => 'WebPage',
            'paged' => $paged,
        ];
        $full = null; // a ready-made full title, when set

        if (is_404()) {
            $c['title'] = __('Page not found', 'rcm');
            $c['noindex'] = true;
        } elseif (is_search()) {
            /* translators: %s: search terms */
            $c['title'] = sprintf(__('Search results for "%s"', 'rcm'), self::plain(get_search_query(false)));
            $c['noindex'] = true;
            $c['page_type'] = 'SearchResultsPage';
        } elseif (is_front_page()) {
            $front = get_option('show_on_front') === 'page' ? get_post((int) get_option('page_on_front')) : null;
            $front = $front instanceof \WP_Post ? $front : null;
            $c['post'] = $front;
            if ($front) {
                $m = self::meta_for($front);
                if ($m['title_source'] === 'custom') {
                    $full = self::compose_title($m['title_raw']);
                }
                $c['description'] = $m['description_source'] === 'none' ? '' : $m['description'];
                $c['noindex'] = $m['noindex'];
            }
            if ($full === null) {
                $full = __('Dental Billing Services & Dental RCM Company | Texas Solutions RCM', 'rcm');
            }
            $c['canonical'] = self::paged_url(home_url('/'), $paged);
            $c['image'] = self::image($front);
        } elseif (is_home()) {
            $bp = self::blog_page();
            $c['page_type'] = 'CollectionPage';
            if ($bp) {
                $m = self::meta_for($bp);
                $c['title'] = $m['title_raw'];
                $c['description'] = in_array($m['description_source'], ['custom', 'excerpt'], true) ? $m['description'] : '';
                $c['noindex'] = $m['noindex'];
            } else {
                $c['title'] = __('Blog', 'rcm');
            }
            if ($c['description'] === '') {
                $c['description'] = __('Practical articles on dental billing, insurance verification, claims, denials, credentialing and revenue cycle management for US dental practices from Texas Solutions RCM.', 'rcm');
            }
            $c['canonical'] = self::paged_url(self::blog_url(), $paged);
            $c['image'] = self::image($bp);
        } elseif (is_singular()) {
            $p = get_queried_object();
            if ($p instanceof \WP_Post) {
                $m = self::meta_for($p);
                $c['post'] = $p;
                $c['title'] = $m['title_raw'];
                $full = $m['title'];
                $c['description'] = $m['description'];
                $canonical = $m['canonical'] !== '' ? $m['canonical'] : (string) (wp_get_canonical_url($p) ?: get_permalink($p));
                $c['canonical'] = $canonical;
                $c['noindex'] = $m['noindex'] || post_password_required($p) || is_attachment() || $p->post_status !== 'publish';
                $c['og_type'] = $p->post_type === 'post' ? 'article' : 'website';
                $c['image'] = self::image($p);
                if ($p->post_type === 'rcm_case_study' && get_post_meta($p->ID, '_rcm_approved', true) !== '1') {
                    $c['noindex'] = true;
                }
            }
        } elseif (is_post_type_archive()) {
            $pt = get_query_var('post_type');
            $pt = is_array($pt) ? (string) reset($pt) : (string) $pt;
            $meta = self::archive_meta($pt);
            $c['title'] = $meta['title'];
            $c['description'] = $meta['description'];
            $c['page_type'] = 'CollectionPage';
            $link = get_post_type_archive_link($pt);
            $c['canonical'] = $link ? self::paged_url((string) $link, $paged) : '';
            $c['image'] = self::image(null);
        } elseif (is_category() || is_tag() || is_tax()) {
            $term = get_queried_object();
            if ($term instanceof \WP_Term) {
                $c['title'] = is_category()
                    /* translators: %s: category name */
                    ? sprintf(__('%s Articles', 'rcm'), self::plain($term->name))
                    : self::plain($term->name);
                $desc = self::plain((string) $term->description);
                if ($desc === '' && is_category()) {
                    /* translators: %s: category name */
                    $desc = sprintf(__('Articles about %s for US dental practices: practical guidance on dental billing, carrier rules and revenue cycle work from Texas Solutions RCM.', 'rcm'), self::plain($term->name));
                }
                $c['description'] = self::cut($desc, self::DESC_MAX);
                $link = get_term_link($term);
                $c['canonical'] = is_wp_error($link) ? '' : self::paged_url((string) $link, $paged);
                $c['page_type'] = 'CollectionPage';
                $c['noindex'] = !is_category(); // tags and private taxonomies are thin
            }
            $c['image'] = self::image(null);
        } else {
            // Author, date and other archives: thin duplicates of the blog.
            $c['title'] = self::plain((string) get_the_archive_title());
            $c['noindex'] = true;
            $c['page_type'] = 'CollectionPage';
        }

        if ($c['description'] === '' && !is_404() && !is_search()) {
            $c['description'] = self::site_description();
        }
        if ($full === null) {
            $full = self::compose_title($c['title']);
        }
        if ($paged > 1) {
            /* translators: %d: page number */
            $full .= ' | ' . sprintf(__('Page %d', 'rcm'), $paged);
        }
        $c['title_full'] = $full;
        if ($c['title'] === '') {
            $c['title'] = $full;
        }

        $c = (array) apply_filters('rcm_seo_context', $c);
        self::$ctx = $c;
        return $c;
    }

    /* ------------------------------------------------------------------ */
    /*  Head output                                                        */
    /* ------------------------------------------------------------------ */

    public static function document_title(string $title): string
    {
        if (is_admin() || is_feed() || is_embed()) {
            return $title;
        }
        // Returned unescaped by core in the short-circuit path, so escape here.
        return esc_html((string) self::context()['title_full']);
    }

    public static function title_separator(): string
    {
        return '|';
    }

    /** Only used if another plugin empties pre_get_document_title after us. */
    public static function title_parts(array $parts): array
    {
        if (is_admin()) {
            return $parts;
        }
        $c = self::context();
        return ['title' => (string) $c['title_full']];
    }

    public static function robots(array $robots): array
    {
        if (is_admin()) {
            return $robots;
        }
        $c = self::context();
        if (!empty($c['noindex'])) {
            unset($robots['index']);
            $robots['noindex'] = true;
            if (empty($robots['nofollow'])) {
                $robots['follow'] = true;
            }
            unset($robots['max-image-preview'], $robots['max-snippet'], $robots['max-video-preview']);
        } elseif (get_option('blog_public')) {
            $robots['index'] = true;
            $robots['follow'] = true;
            $robots['max-snippet'] = '-1';
            $robots['max-video-preview'] = '-1';
        }
        return $robots;
    }

    public static function head(): void
    {
        if (is_feed() || is_embed()) {
            return;
        }
        $c = self::context();
        $site = self::site_name();
        $lines = [];

        if ($c['description'] !== '') {
            $lines[] = '<meta name="description" content="' . esc_attr($c['description']) . '">';
        }
        if ($c['canonical'] !== '') {
            $lines[] = '<link rel="canonical" href="' . esc_url($c['canonical']) . '">';
        }

        $title = (string) $c['title_full'];
        $lines[] = '<meta property="og:locale" content="en_US">';
        $lines[] = '<meta property="og:type" content="' . esc_attr($c['og_type']) . '">';
        $lines[] = '<meta property="og:site_name" content="' . esc_attr($site) . '">';
        $lines[] = '<meta property="og:title" content="' . esc_attr($title) . '">';
        if ($c['description'] !== '') {
            $lines[] = '<meta property="og:description" content="' . esc_attr($c['description']) . '">';
        }
        if ($c['canonical'] !== '') {
            $lines[] = '<meta property="og:url" content="' . esc_url($c['canonical']) . '">';
        }
        $img = $c['image'];
        if (is_array($img)) {
            $lines[] = '<meta property="og:image" content="' . esc_url($img['url']) . '">';
            if ($img['width'] > 0 && $img['height'] > 0) {
                $lines[] = '<meta property="og:image:width" content="' . esc_attr((string) $img['width']) . '">';
                $lines[] = '<meta property="og:image:height" content="' . esc_attr((string) $img['height']) . '">';
            }
            if ($img['alt'] !== '') {
                $lines[] = '<meta property="og:image:alt" content="' . esc_attr($img['alt']) . '">';
            }
        }
        $p = $c['post'];
        if ($c['og_type'] === 'article' && $p instanceof \WP_Post) {
            $lines[] = '<meta property="article:published_time" content="' . esc_attr((string) get_post_time('c', true, $p)) . '">';
            $lines[] = '<meta property="article:modified_time" content="' . esc_attr((string) get_post_modified_time('c', true, $p)) . '">';
            $cat = self::primary_category($p);
            if ($cat) {
                $lines[] = '<meta property="article:section" content="' . esc_attr(self::plain($cat->name)) . '">';
            }
        }
        $lines[] = '<meta name="twitter:card" content="' . (is_array($img) ? 'summary_large_image' : 'summary') . '">';
        $lines[] = '<meta name="twitter:title" content="' . esc_attr($title) . '">';
        if ($c['description'] !== '') {
            $lines[] = '<meta name="twitter:description" content="' . esc_attr($c['description']) . '">';
        }
        if (is_array($img)) {
            $lines[] = '<meta name="twitter:image" content="' . esc_url($img['url']) . '">';
        }

        $gsc = (string) rcm_setting('analytics.gsc_verification', '');
        if ($gsc !== '') {
            $lines[] = '<meta name="google-site-verification" content="' . esc_attr($gsc) . '">';
        }
        $bing = (string) rcm_setting('analytics.bing_verification', '');
        if ($bing !== '') {
            $lines[] = '<meta name="msvalidate.01" content="' . esc_attr($bing) . '">';
        }

        echo "\n<!-- RCM SEO -->\n" . implode("\n", $lines) . "\n"; // phpcs:ignore WordPress.Security.EscapeOutput -- each line escaped above
        $graph = self::graph();
        if ($graph) {
            echo '<script type="application/ld+json">' . wp_json_encode(['@context' => 'https://schema.org', '@graph' => $graph], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) . "</script>\n"; // phpcs:ignore WordPress.Security.EscapeOutput -- JSON with HEX_TAG
        }
        echo "<!-- /RCM SEO -->\n";
    }

    public static function primary_category(\WP_Post $p): ?\WP_Term
    {
        if ($p->post_type !== 'post') {
            return null;
        }
        $cats = get_the_category($p->ID);
        return $cats && $cats[0] instanceof \WP_Term ? $cats[0] : null;
    }

    /* ------------------------------------------------------------------ */
    /*  FAQs visible on the current page                                   */
    /* ------------------------------------------------------------------ */

    /**
     * FAQs rendered on the current page, as [['q' => ..., 'a' => ...]].
     * Templates that print other FAQs add them with the `rcm_visible_faqs`
     * filter before calling get_header().
     */
    public static function visible_faqs(): array
    {
        $faqs = [];
        $post = null;
        if (is_singular()) {
            $post = get_queried_object();
            if ($post instanceof \WP_Post) {
                if (in_array($post->post_type, self::DATA_TYPES, true)) {
                    $faqs = (array) (self::data($post)['faqs'] ?? []);
                } elseif ($post->post_type === 'post') {
                    $faqs = (array) rcm_meta($post->ID, '_rcm_faqs', []);
                } elseif ($post->post_type === 'page' && str_contains((string) get_page_template_slug($post), 'faq')) {
                    $items = get_posts([
                        'post_type' => 'rcm_faq',
                        'post_status' => 'publish',
                        'numberposts' => 200,
                        'orderby' => ['menu_order' => 'ASC', 'title' => 'ASC'],
                        'no_found_rows' => true,
                    ]);
                    foreach ($items as $f) {
                        $faqs[] = ['q' => $f->post_title, 'a' => $f->post_content];
                    }
                }
            } else {
                $post = null;
            }
        }
        $faqs = (array) apply_filters('rcm_visible_faqs', $faqs, $post);
        return self::normalize_faqs($faqs);
    }

    private static function normalize_faqs(array $faqs): array
    {
        $out = [];
        $seen = [];
        foreach ($faqs as $f) {
            if (!is_array($f)) {
                continue;
            }
            $q = self::plain(self::str($f['q'] ?? $f['question'] ?? $f['name'] ?? ''));
            $a = self::plain(self::str($f['a'] ?? $f['answer'] ?? $f['text'] ?? ''));
            $k = mb_strtolower($q);
            if ($q === '' || $a === '' || isset($seen[$k])) {
                continue;
            }
            $seen[$k] = true;
            $out[] = ['q' => $q, 'a' => $a];
        }
        return $out;
    }

    /* ------------------------------------------------------------------ */
    /*  JSON-LD                                                            */
    /* ------------------------------------------------------------------ */

    private static function org_id(): string
    {
        return home_url('/') . '#organization';
    }

    private static function website_id(): string
    {
        return home_url('/') . '#website';
    }

    private static function organization_node(): array
    {
        $ct = rcm_contact();
        $node = [
            '@type' => 'Organization',
            '@id' => self::org_id(),
            'name' => self::site_name(),
            'url' => home_url('/'),
            'description' => 'Texas Solutions RCM provides dental billing and dental revenue cycle management for dental practices in all 50 US states: insurance verification, dental claims, denial management, payment posting, A/R follow-up, patient billing support, credentialing and reporting.',
        ];
        if (file_exists(get_theme_file_path('assets/img/ts-logo.png'))) {
            $node['logo'] = ['@type' => 'ImageObject', 'url' => get_theme_file_uri('assets/img/ts-logo.png')];
        }
        $email = self::str($ct['email'] ?? '');
        $phone = (string) preg_replace('/[^\d+]/', '', self::str($ct['phone'] ?? ''));
        if ($email !== '') {
            $node['email'] = $email;
        }
        if ($phone !== '') {
            $node['telephone'] = $phone;
        }
        if (self::str($ct['street'] ?? '') !== '') {
            $node['address'] = [
                '@type' => 'PostalAddress',
                'streetAddress' => self::str($ct['street'] ?? ''),
                'addressLocality' => self::str($ct['city'] ?? ''),
                'addressRegion' => self::str($ct['region'] ?? ''),
                'postalCode' => self::str($ct['postal_code'] ?? ''),
                'addressCountry' => self::str($ct['country'] ?? 'US'),
            ];
        }
        if ($email !== '' || $phone !== '') {
            $node['contactPoint'] = array_filter([
                '@type' => 'ContactPoint',
                'contactType' => 'sales',
                'email' => $email,
                'telephone' => $phone,
                'areaServed' => 'US',
                'availableLanguage' => 'English',
            ]);
        }
        $node['areaServed'] = ['@type' => 'Country', 'name' => 'United States'];
        $node['parentOrganization'] = ['@type' => 'Organization', 'name' => 'Texas Solutions', 'url' => 'https://texassolutions.co'];
        return $node;
    }

    private static function website_node(): array
    {
        return [
            '@type' => 'WebSite',
            '@id' => self::website_id(),
            'url' => home_url('/'),
            'name' => self::site_name(),
            'publisher' => ['@id' => self::org_id()],
            'inLanguage' => 'en-US',
            'potentialAction' => [
                '@type' => 'SearchAction',
                'target' => ['@type' => 'EntryPoint', 'urlTemplate' => home_url('/') . '?s={search_term_string}'],
                'query-input' => 'required name=search_term_string',
            ],
        ];
    }

    /** JSON-LD nodes for the current page (no Offer, AggregateRating or Review, ever). */
    public static function graph(): array
    {
        $c = self::context();
        $nodes = [self::organization_node(), self::website_node()];
        if (is_404() || is_search() || (!empty($c['noindex']) && !is_singular())) {
            return (array) apply_filters('rcm_seo_graph', $nodes, $c);
        }

        $url = $c['canonical'] !== '' ? (string) $c['canonical'] : home_url('/');
        $page_id = $url . '#webpage';
        $p = $c['post'] instanceof \WP_Post ? $c['post'] : null;

        $webpage = [
            '@type' => $c['page_type'],
            '@id' => $page_id,
            'url' => $url,
            'name' => (string) $c['title_full'],
            'isPartOf' => ['@id' => self::website_id()],
            'inLanguage' => 'en-US',
        ];
        if ($c['description'] !== '') {
            $webpage['description'] = $c['description'];
        }
        if (is_front_page()) {
            $webpage['about'] = ['@id' => self::org_id()];
        }
        if ($p && is_singular()) {
            $webpage['datePublished'] = (string) get_post_time('c', true, $p);
            $webpage['dateModified'] = (string) get_post_modified_time('c', true, $p);
        }
        if (is_array($c['image'])) {
            $webpage['primaryImageOfPage'] = ['@type' => 'ImageObject', 'url' => $c['image']['url']];
        }

        $crumbs = self::breadcrumbs();
        $crumb_node = null;
        if (count($crumbs) > 1) {
            $items = [];
            foreach ($crumbs as $i => [$name, $link]) {
                $item = ['@type' => 'ListItem', 'position' => $i + 1, 'name' => $name];
                if ($link !== '') {
                    $item['item'] = $link;
                }
                $items[] = $item;
            }
            $crumb_node = ['@type' => 'BreadcrumbList', '@id' => $url . '#breadcrumb', 'itemListElement' => $items];
            $webpage['breadcrumb'] = ['@id' => $url . '#breadcrumb'];
        }

        $main = [];
        if ($p && is_singular() && !is_front_page()) {
            $d = self::data($p);
            $summary = self::plain(self::str($d['definition'] ?? '')) ?: (string) $c['description'];
            switch ($p->post_type) {
                case 'rcm_service':
                    $main[] = [
                        '@type' => 'Service',
                        '@id' => $url . '#service',
                        'name' => self::plain($p->post_title),
                        'description' => $summary,
                        'serviceType' => self::plain(self::str($d['menuName'] ?? '') ?: (self::str($d['name'] ?? '') ?: $p->post_title)),
                        'url' => $url,
                        'provider' => ['@id' => self::org_id()],
                        'areaServed' => ['@type' => 'Country', 'name' => 'United States'],
                        'audience' => ['@type' => 'BusinessAudience', 'audienceType' => 'Dental practices'],
                    ];
                    break;
                case 'rcm_specialty':
                    $kind = class_exists(Content_Types::class) ? Content_Types::specialty_kind($p) : self::str($d['kind'] ?? 'medical');
                    $main[] = [
                        '@type' => 'Service',
                        '@id' => $url . '#service',
                        'name' => self::plain($p->post_title),
                        'description' => $summary,
                        'serviceType' => 'Dental billing',
                        'url' => $url,
                        'provider' => ['@id' => self::org_id()],
                        'areaServed' => ['@type' => 'Country', 'name' => 'United States'],
                        'audience' => ['@type' => 'BusinessAudience', 'audienceType' => 'Dental practices'],
                    ];
                    break;
                case 'rcm_tool':
                    if (self::str($d['kind'] ?? '') === 'calculator') {
                        $main[] = [
                            '@type' => 'WebApplication',
                            '@id' => $url . '#app',
                            'name' => self::plain($p->post_title),
                            'description' => $summary,
                            'url' => $url,
                            'applicationCategory' => 'BusinessApplication',
                            'operatingSystem' => 'Any',
                            'browserRequirements' => 'Requires JavaScript',
                            'isAccessibleForFree' => true,
                            'inLanguage' => 'en-US',
                            'publisher' => ['@id' => self::org_id()],
                        ];
                    }
                    break;
                case 'post':
                    $reviewer = self::plain((string) get_post_meta($p->ID, '_rcm_reviewer', true));
                    $article = [
                        '@type' => 'BlogPosting',
                        '@id' => $url . '#article',
                        'headline' => mb_substr(self::plain($p->post_title), 0, 110),
                        'description' => (string) $c['description'],
                        'datePublished' => (string) get_post_time('c', true, $p),
                        'dateModified' => (string) get_post_modified_time('c', true, $p),
                        'mainEntityOfPage' => ['@id' => $page_id],
                        'isPartOf' => ['@id' => self::website_id()],
                        'author' => $reviewer !== '' ? ['@type' => 'Person', 'name' => $reviewer] : ['@id' => self::org_id()],
                        'publisher' => ['@id' => self::org_id()],
                        'inLanguage' => 'en-US',
                    ];
                    if (is_array($c['image'])) {
                        $article['image'] = ['@type' => 'ImageObject', 'url' => $c['image']['url'], 'width' => $c['image']['width'], 'height' => $c['image']['height']];
                    }
                    $cat = self::primary_category($p);
                    if ($cat) {
                        $article['articleSection'] = self::plain($cat->name);
                    }
                    $focus = self::plain((string) get_post_meta($p->ID, '_rcm_focus_keyword', true));
                    if ($focus !== '') {
                        $article['keywords'] = $focus;
                    }
                    $cites = [];
                    foreach ((array) rcm_meta($p->ID, '_rcm_sources', []) as $s) {
                        if (is_array($s) && self::str($s['url'] ?? '') !== '') {
                            $cites[] = ['@type' => 'CreativeWork', 'name' => self::plain(self::str($s['label'] ?? '')), 'url' => self::str($s['url'])];
                        }
                    }
                    if ($cites) {
                        $article['citation'] = $cites;
                    }
                    $main[] = $article;
                    break;
            }
        }
        if ($main) {
            $webpage['mainEntity'] = ['@id' => $main[0]['@id']];
        }

        $nodes[] = $webpage;
        if ($crumb_node) {
            $nodes[] = $crumb_node;
        }
        foreach ($main as $n) {
            $nodes[] = $n;
        }

        $faqs = self::visible_faqs();
        if ($faqs) {
            $nodes[] = [
                '@type' => 'FAQPage',
                '@id' => $url . '#faq',
                'url' => $url,
                'isPartOf' => ['@id' => $page_id],
                'mainEntity' => array_map(static fn(array $f): array => [
                    '@type' => 'Question',
                    'name' => $f['q'],
                    'acceptedAnswer' => ['@type' => 'Answer', 'text' => $f['a']],
                ], $faqs),
            ];
        }

        $nodes = (array) apply_filters('rcm_seo_graph', $nodes, $c);
        // Defensive: these types are never allowed on this site.
        return array_values(array_filter($nodes, static fn($n): bool => is_array($n) && !in_array($n['@type'] ?? '', ['Offer', 'AggregateOffer', 'AggregateRating', 'Review'], true)));
    }

    /* ------------------------------------------------------------------ */
    /*  Breadcrumbs                                                        */
    /* ------------------------------------------------------------------ */

    /** Existing published page by path, as a crumb. */
    private static function page_crumb(string $path): ?array
    {
        $page = get_page_by_path($path);
        return $page instanceof \WP_Post && $page->post_status === 'publish' ? [self::plain($page->post_title), (string) get_permalink($page)] : null;
    }

    /** @return list<array{0:string,1:string}> */
    public static function breadcrumbs(): array
    {
        if (self::$crumbs !== null) {
            return self::$crumbs;
        }
        $list = [[__('Home', 'rcm'), home_url('/')]];

        if (is_front_page()) {
            // Home only.
        } elseif (is_home()) {
            $list[] = [self::blog_label(), self::blog_url()];
        } elseif (is_singular()) {
            $p = get_queried_object();
            if ($p instanceof \WP_Post) {
                switch ($p->post_type) {
                    case 'post':
                        $list[] = [self::blog_label(), self::blog_url()];
                        $cat = self::primary_category($p);
                        if ($cat) {
                            $link = get_category_link($cat);
                            $list[] = [self::plain($cat->name), (string) $link];
                        }
                        break;
                    case 'page':
                        foreach (array_reverse(get_post_ancestors($p)) as $aid) {
                            $list[] = [self::plain(get_the_title($aid)), (string) get_permalink($aid)];
                        }
                        break;
                    case 'rcm_job':
                        $careers = self::page_crumb('careers');
                        if ($careers) {
                            $list[] = $careers;
                        }
                        break;
                    case 'rcm_integration':
                        $integrations = self::page_crumb('integrations');
                        if ($integrations) {
                            $list[] = $integrations;
                        }
                        break;
                    default:
                        $link = get_post_type_archive_link($p->post_type);
                        $obj = get_post_type_object($p->post_type);
                        if ($link && $obj) {
                            $list[] = [self::plain((string) $obj->labels->name), (string) $link];
                        }
                }
                $list[] = [self::plain($p->post_title), (string) get_permalink($p)];
            }
        } elseif (is_post_type_archive()) {
            $pt = get_query_var('post_type');
            $pt = is_array($pt) ? (string) reset($pt) : (string) $pt;
            $obj = get_post_type_object($pt);
            $link = get_post_type_archive_link($pt);
            if ($obj) {
                $list[] = [self::plain((string) $obj->labels->name), $link ? (string) $link : ''];
            }
        } elseif (is_category() || is_tag() || is_tax()) {
            $term = get_queried_object();
            if ($term instanceof \WP_Term) {
                if (in_array($term->taxonomy, ['category', 'post_tag'], true)) {
                    $list[] = [self::blog_label(), self::blog_url()];
                }
                foreach (array_reverse(get_ancestors($term->term_id, $term->taxonomy, 'taxonomy')) as $aid) {
                    $a = get_term($aid, $term->taxonomy);
                    if ($a instanceof \WP_Term) {
                        $l = get_term_link($a);
                        $list[] = [self::plain($a->name), is_wp_error($l) ? '' : (string) $l];
                    }
                }
                $l = get_term_link($term);
                $list[] = [self::plain($term->name), is_wp_error($l) ? '' : (string) $l];
            }
        } elseif (is_search()) {
            $list[] = [__('Search results', 'rcm'), ''];
        } elseif (is_404()) {
            $list[] = [__('Page not found', 'rcm'), ''];
        } else {
            $title = self::plain((string) get_the_archive_title());
            if ($title !== '') {
                $list[] = [$title, ''];
            }
        }

        $list = (array) apply_filters('rcm_breadcrumbs', $list);
        $clean = [];
        foreach ($list as $item) {
            if (is_array($item) && isset($item[0]) && self::str($item[0]) !== '') {
                $clean[] = [self::str($item[0]), self::str($item[1] ?? '')];
            }
        }
        self::$crumbs = $clean;
        return $clean;
    }

    /** Accessible breadcrumb trail styled for the dark page hero. */
    public static function render_breadcrumbs(string $class = ''): string
    {
        $crumbs = self::breadcrumbs();
        if (count($crumbs) < 2) {
            return '';
        }
        $last = count($crumbs) - 1;
        $html = '<nav aria-label="' . esc_attr__('Breadcrumb', 'rcm') . '" class="' . esc_attr(trim('rcm-breadcrumbs ' . $class)) . '">';
        $html .= '<ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-navy-200">';
        foreach ($crumbs as $i => [$name, $url]) {
            $html .= '<li class="flex items-center gap-2">';
            if ($i === $last) {
                $html .= '<span class="text-white" aria-current="page">' . esc_html($name) . '</span>';
            } else {
                $html .= $url !== ''
                    ? '<a class="rounded hover:text-white hover:underline underline-offset-4" href="' . esc_url($url) . '">' . esc_html($name) . '</a>'
                    : '<span>' . esc_html($name) . '</span>';
                $html .= '<span aria-hidden="true" class="text-navy-400">/</span>';
            }
            $html .= '</li>';
        }
        $html .= '</ol></nav>';
        return $html;
    }

    /* ------------------------------------------------------------------ */
    /*  Sitemaps and robots.txt                                            */
    /* ------------------------------------------------------------------ */

    public static function sitemap_provider(mixed $provider, string $name): mixed
    {
        return $name === 'users' ? false : $provider;
    }

    public static function sitemap_taxonomies(array $taxonomies): array
    {
        unset($taxonomies['post_tag'], $taxonomies['post_format']);
        return $taxonomies;
    }

    public static function sitemap_query_args(array $args, string $post_type): array
    {
        $meta = ['relation' => 'AND'];
        if (!empty($args['meta_query']) && is_array($args['meta_query'])) {
            $meta[] = $args['meta_query'];
        }
        $meta[] = [
            'relation' => 'OR',
            ['key' => '_rcm_noindex', 'compare' => 'NOT EXISTS'],
            ['key' => '_rcm_noindex', 'value' => '1', 'compare' => '!='],
        ];
        if ($post_type === 'rcm_case_study') {
            $meta[] = ['key' => '_rcm_approved', 'value' => '1'];
        }
        $args['meta_query'] = $meta;
        $args['has_password'] = false; // password-protected posts are noindex
        return $args;
    }

    public static function sitemap_entry(array $entry, \WP_Post $post): array
    {
        $entry['lastmod'] = (string) get_post_modified_time('c', true, $post);
        return $entry;
    }

    public static function robots_txt(string $output, mixed $public): string
    {
        if (!$public) {
            return $output;
        }
        $lines = [
            'User-agent: *',
            'Disallow: /wp-admin/',
            'Allow: /wp-admin/admin-ajax.php',
            'Disallow: /wp-json/rcm/',
            'Disallow: /?s=',
            'Disallow: /*?s=',
            'Disallow: /search/',
            '',
        ];
        $sitemap = function_exists('get_sitemap_url') ? get_sitemap_url('index') : home_url('/wp-sitemap.xml');
        if ($sitemap) {
            $lines[] = 'Sitemap: ' . esc_url_raw((string) $sitemap);
        }
        return implode("\n", $lines) . "\n";
    }

    /* ------------------------------------------------------------------ */
    /*  llms.txt                                                           */
    /* ------------------------------------------------------------------ */

    public static function flush_llms_cache(): void
    {
        delete_transient(self::LLMS_CACHE);
        delete_transient(self::LLMS_CACHE . '_full');
    }

    /** Path of the current request relative to the site root, without slashes at the ends. */
    private static function request_path(): string
    {
        $path = (string) wp_parse_url((string) ($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH);
        $base = rtrim((string) wp_parse_url(home_url(), PHP_URL_PATH), '/');
        if ($base !== '' && str_starts_with($path, $base . '/')) {
            $path = substr($path, strlen($base));
        }
        return trim($path, '/');
    }

    public static function llms_txt(): void
    {
        $req = self::request_path();
        if ($req !== 'llms.txt' && $req !== 'llms-full.txt') {
            return;
        }
        if (!rcm_setting('seo.llms_txt', true)) {
            return; // falls through to a normal 404
        }
        $full = $req === 'llms-full.txt';
        $key = self::LLMS_CACHE . ($full ? '_full' : '');
        $body = get_transient($key);
        if (!is_string($body) || $body === '') {
            $body = self::build_llms($full);
            set_transient($key, $body, 12 * HOUR_IN_SECONDS);
        }
        status_header(200);
        header('Content-Type: text/plain; charset=utf-8');
        header('X-Robots-Tag: noindex');
        header('Cache-Control: public, max-age=3600');
        echo $body; // phpcs:ignore WordPress.Security.EscapeOutput -- text/plain built from plain text
        exit;
    }

    /** Markdown-safe single line. */
    private static function md(string $s): string
    {
        return str_replace(['[', ']', "\n"], ['(', ')', ' '], self::plain($s));
    }

    private static function llms_posts(string $type, int $limit = -1): array
    {
        return get_posts([
            'post_type' => $type,
            'post_status' => 'publish',
            'numberposts' => $limit,
            'has_password' => false,
            'orderby' => $type === 'post' ? 'date' : ['menu_order' => 'ASC', 'title' => 'ASC'],
            'order' => $type === 'post' ? 'DESC' : 'ASC',
            'meta_query' => [
                'relation' => 'OR',
                ['key' => '_rcm_noindex', 'compare' => 'NOT EXISTS'],
                ['key' => '_rcm_noindex', 'value' => '1', 'compare' => '!='],
            ],
            'no_found_rows' => true,
        ]);
    }

    private static function summary_of(\WP_Post $p): string
    {
        $d = self::data($p);
        $s = self::plain(self::str($d['summary'] ?? ''));
        if ($s === '') {
            $s = self::meta_for($p)['description'];
        }
        return self::md($s);
    }

    private static function build_llms(bool $full): string
    {
        $site = self::site_name();
        $ct = rcm_contact();
        $out = [];
        $out[] = '# ' . $site;
        $out[] = '';
        $out[] = '> ' . self::md(self::site_description());
        $out[] = '';
        $about = __('Texas Solutions RCM is the healthcare revenue cycle management division of Texas Solutions. A remote team works inside each client\'s own practice management, EHR and clearinghouse systems. Consultations are free.', 'rcm');
        $out[] = $about;
        $contact = array_filter([
            self::str($ct['email'] ?? ''),
            self::str($ct['phone'] ?? ''),
            trim(implode(', ', array_filter([self::str($ct['street'] ?? ''), self::str($ct['city'] ?? ''), trim(self::str($ct['region'] ?? '') . ' ' . self::str($ct['postal_code'] ?? ''))]))),
        ]);
        if ($contact) {
            $out[] = '';
            $out[] = 'Contact: ' . implode(' | ', $contact);
        }

        $sections = [
            'rcm_service' => __('Services', 'rcm'),
            'rcm_specialty' => __('Specialties', 'rcm'),
            'rcm_tool' => __('Tools and calculators', 'rcm'),
        ];

        $out[] = '';
        $out[] = '## ' . __('Key pages', 'rcm');
        $out[] = '- [' . self::md(__('Home', 'rcm')) . '](' . home_url('/') . ')';
        foreach (array_keys($sections) as $pt) {
            $link = get_post_type_archive_link($pt);
            if ($link) {
                $meta = self::archive_meta($pt);
                $out[] = '- [' . self::md($meta['title']) . '](' . $link . '): ' . self::md($meta['description']);
            }
        }
        $out[] = '- [' . self::md(self::blog_label()) . '](' . self::blog_url() . ')';
        $front = (int) get_option('page_on_front');
        $blog = (int) get_option('page_for_posts');
        foreach (self::llms_posts('page', 60) as $page) {
            if (in_array($page->ID, [$front, $blog], true)) {
                continue;
            }
            $out[] = '- [' . self::md($page->post_title) . '](' . get_permalink($page) . '): ' . self::summary_of($page);
        }

        foreach ($sections as $pt => $label) {
            $posts = self::llms_posts($pt);
            if (!$posts) {
                continue;
            }
            $out[] = '';
            $out[] = '## ' . $label;
            foreach ($posts as $p) {
                if (!$full) {
                    $out[] = '- [' . self::md($p->post_title) . '](' . get_permalink($p) . '): ' . self::summary_of($p);
                    continue;
                }
                $d = self::data($p);
                $out[] = '';
                $out[] = '### ' . self::md($p->post_title);
                $out[] = 'URL: ' . get_permalink($p);
                $out[] = '';
                $def = self::plain(self::str($d['definition'] ?? ''));
                $out[] = $def !== '' ? $def : self::summary_of($p);
                $faqs = self::normalize_faqs((array) ($d['faqs'] ?? []));
                if ($faqs) {
                    $out[] = '';
                    foreach ($faqs as $f) {
                        $out[] = 'Q: ' . $f['q'];
                        $out[] = 'A: ' . $f['a'];
                        $out[] = '';
                    }
                }
            }
        }

        $posts = self::llms_posts('post', $full ? 50 : 20);
        if ($posts) {
            $out[] = '';
            $out[] = '## ' . __('Articles', 'rcm');
            foreach ($posts as $p) {
                $out[] = '- [' . self::md($p->post_title) . '](' . get_permalink($p) . '): ' . self::summary_of($p);
            }
        }

        if ($full) {
            $faq_posts = get_posts(['post_type' => 'rcm_faq', 'post_status' => 'publish', 'numberposts' => 200, 'orderby' => ['menu_order' => 'ASC', 'title' => 'ASC'], 'no_found_rows' => true]);
            if ($faq_posts) {
                $out[] = '';
                $out[] = '## ' . __('Frequently asked questions', 'rcm');
                $out[] = '';
                foreach ($faq_posts as $f) {
                    $out[] = 'Q: ' . self::plain($f->post_title);
                    $out[] = 'A: ' . self::plain($f->post_content);
                    $out[] = '';
                }
            }
        } else {
            $out[] = '';
            $out[] = '## ' . __('Optional', 'rcm');
            $out[] = '- [' . __('Full version with definitions and FAQs', 'rcm') . '](' . home_url('/llms-full.txt') . ')';
        }

        return implode("\n", $out) . "\n";
    }

    /* ------------------------------------------------------------------ */
    /*  Editor meta boxes                                                  */
    /* ------------------------------------------------------------------ */

    public static function meta_boxes(string $post_type, mixed $post = null): void
    {
        if (!in_array($post_type, self::TYPES, true)) {
            return;
        }
        add_meta_box('rcm-seo', __('SEO', 'rcm'), [self::class, 'render_seo_box'], $post_type, 'normal', 'default');
        if ($post_type === 'post') {
            add_meta_box('rcm-article', __('Article details: FAQs, sources, review and CTA', 'rcm'), [self::class, 'render_article_box'], 'post', 'normal', 'default');
        }
    }

    public static function admin_assets(string $hook): void
    {
        $screen = function_exists('get_current_screen') ? get_current_screen() : null;
        $is_editor = in_array($hook, ['post.php', 'post-new.php'], true) && $screen && in_array((string) $screen->post_type, self::TYPES, true);
        $is_screen = str_contains($hook, 'rcm-seo');
        if (!$is_editor && !$is_screen) {
            return;
        }
        if ($is_editor) {
            wp_enqueue_media();
        }
        $css = RCM_DIR . 'assets/css/admin.css';
        wp_enqueue_style('rcm-admin', RCM_URL . 'assets/css/admin.css', [], file_exists($css) ? (string) filemtime($css) : RCM_VERSION);
        $js = RCM_DIR . 'assets/js/seo-admin.js';
        wp_enqueue_script('rcm-seo-admin', RCM_URL . 'assets/js/seo-admin.js', [], file_exists($js) ? (string) filemtime($js) : RCM_VERSION, ['in_footer' => true]);
        wp_add_inline_script('rcm-seo-admin', 'window.RCM_SEO=' . wp_json_encode([
            'site' => self::site_name(),
            'titleMax' => self::TITLE_MAX,
            'i18n' => [
                'chars' => __('characters', 'rcm'),
                'target' => __('target', 'rcm'),
                'fallback' => __('Empty: the default shown in grey is used', 'rcm'),
                'empty' => __('Empty', 'rcm'),
                'tooLong' => __('too long', 'rcm'),
                'tooShort' => __('short', 'rcm'),
                'copy' => __('Copy', 'rcm'),
                'copied' => __('Copied', 'rcm'),
                'chooseImage' => __('Choose social sharing image', 'rcm'),
                'useImage' => __('Use this image', 'rcm'),
            ],
        ]) . ';', 'before');
    }

    /** Counter element markup used next to SEO inputs. */
    private static function counter(string $for): string
    {
        return '<span class="rcm-seo-count" id="' . esc_attr($for . '-count') . '" aria-live="polite"></span>';
    }

    public static function render_seo_box(\WP_Post $post): void
    {
        wp_nonce_field('rcm_seo_save_' . $post->ID, 'rcm_seo_nonce');
        $m = self::meta_for($post);
        $title = (string) get_post_meta($post->ID, '_rcm_seo_title', true);
        $desc = (string) get_post_meta($post->ID, '_rcm_meta_description', true);
        $canonical = (string) get_post_meta($post->ID, '_rcm_canonical', true);
        $noindex = get_post_meta($post->ID, '_rcm_noindex', true) === '1';
        $og = (int) get_post_meta($post->ID, '_rcm_og_image', true);
        $focus = (string) get_post_meta($post->ID, '_rcm_focus_keyword', true);

        $fallback_title = self::fallback_title($post)[0];
        $fallback_desc = self::fallback_description($post)[0];
        $permalink = $post->post_status === 'publish' ? (string) get_permalink($post) : home_url('/');
        $og_src = $og ? wp_get_attachment_image_url($og, 'medium') : '';
        ?>
        <div class="rcm-seo-box">
            <div class="rcm-seo-preview" aria-label="<?php esc_attr_e('Search result preview', 'rcm'); ?>">
                <div class="rcm-seo-preview-url"><?php echo esc_html($permalink); ?></div>
                <div class="rcm-seo-preview-title" data-rcm-seo-preview="title" data-source="rcm_seo_title"><?php echo esc_html($m['title']); ?></div>
                <div class="rcm-seo-preview-desc" data-rcm-seo-preview="description" data-source="rcm_meta_description"><?php echo esc_html($m['description']); ?></div>
            </div>

            <div class="rcm-seo-field">
                <label for="rcm_seo_title"><strong><?php esc_html_e('SEO title', 'rcm'); ?></strong></label>
                <input type="text" class="widefat" id="rcm_seo_title" name="rcm_seo_title" maxlength="120"
                    value="<?php echo esc_attr($title); ?>" placeholder="<?php echo esc_attr($fallback_title); ?>"
                    data-rcm-seo-count="rcm_seo_title-count" data-max="<?php echo esc_attr((string) self::TITLE_MAX); ?>" data-compose="1"
                    aria-describedby="rcm_seo_title-count rcm_seo_title-help">
                <?php echo self::counter('rcm_seo_title'); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in counter() ?>
                <p class="description" id="rcm_seo_title-help"><?php esc_html_e('Up to 60 characters. " | Texas Solutions RCM" is added automatically when it fits.', 'rcm'); ?></p>
            </div>

            <div class="rcm-seo-field">
                <label for="rcm_meta_description"><strong><?php esc_html_e('Meta description', 'rcm'); ?></strong></label>
                <textarea class="widefat" rows="3" id="rcm_meta_description" name="rcm_meta_description" maxlength="320"
                    placeholder="<?php echo esc_attr($fallback_desc); ?>"
                    data-rcm-seo-count="rcm_meta_description-count" data-min="<?php echo esc_attr((string) self::DESC_MIN); ?>" data-max="<?php echo esc_attr((string) self::DESC_MAX); ?>"
                    aria-describedby="rcm_meta_description-count"><?php echo esc_textarea($desc); ?></textarea>
                <?php echo self::counter('rcm_meta_description'); // phpcs:ignore WordPress.Security.EscapeOutput ?>
            </div>

            <div class="rcm-seo-grid">
                <div class="rcm-seo-field">
                    <label for="rcm_focus_keyword"><strong><?php esc_html_e('Focus keyword', 'rcm'); ?></strong></label>
                    <input type="text" class="widefat" id="rcm_focus_keyword" name="rcm_focus_keyword" maxlength="80" value="<?php echo esc_attr($focus); ?>">
                </div>
                <div class="rcm-seo-field">
                    <label for="rcm_canonical"><strong><?php esc_html_e('Canonical URL override', 'rcm'); ?></strong></label>
                    <input type="url" class="widefat" id="rcm_canonical" name="rcm_canonical" maxlength="500" value="<?php echo esc_attr($canonical); ?>" placeholder="<?php echo esc_attr($permalink); ?>" aria-describedby="rcm_canonical-help">
                    <p class="description" id="rcm_canonical-help"><?php esc_html_e('Leave empty to use this page\'s own URL.', 'rcm'); ?></p>
                </div>
            </div>

            <div class="rcm-seo-field">
                <label for="rcm_noindex">
                    <input type="checkbox" id="rcm_noindex" name="rcm_noindex" value="1" <?php checked($noindex); ?>>
                    <?php esc_html_e('Hide from search engines (noindex) and remove from the sitemap', 'rcm'); ?>
                </label>
            </div>

            <div class="rcm-seo-field" data-rcm-seo-media>
                <span class="rcm-seo-label"><strong><?php esc_html_e('Social sharing image', 'rcm'); ?></strong></span>
                <input type="hidden" name="rcm_og_image" value="<?php echo esc_attr($og ? (string) $og : ''); ?>">
                <div class="rcm-seo-og-preview"><?php if ($og_src) : ?><img src="<?php echo esc_url($og_src); ?>" alt=""><?php endif; ?></div>
                <button type="button" class="button" data-rcm-seo-media-pick><?php esc_html_e('Choose image', 'rcm'); ?></button>
                <button type="button" class="button-link" data-rcm-seo-media-remove <?php echo $og ? '' : 'hidden'; ?>><?php esc_html_e('Remove', 'rcm'); ?></button>
                <p class="description"><?php esc_html_e('1200 x 630 pixels works best. Falls back to the featured image, then the site default.', 'rcm'); ?></p>
            </div>
        </div>
        <?php
    }

    private static function faq_row(string $q, string $a): string
    {
        return '<div class="rcm-seo-row">'
            . '<label>' . esc_html__('Question', 'rcm') . '<input type="text" class="widefat" name="rcm_faqs[q][]" maxlength="300" value="' . esc_attr($q) . '"></label>'
            . '<label>' . esc_html__('Answer', 'rcm') . '<textarea class="widefat" rows="3" name="rcm_faqs[a][]" maxlength="2000">' . esc_textarea($a) . '</textarea></label>'
            . '<button type="button" class="button-link button-link-delete" data-rcm-seo-remove>' . esc_html__('Remove', 'rcm') . '</button>'
            . '</div>';
    }

    private static function source_row(string $label, string $url): string
    {
        return '<div class="rcm-seo-row rcm-seo-row-inline">'
            . '<label>' . esc_html__('Label', 'rcm') . '<input type="text" class="widefat" name="rcm_sources[label][]" maxlength="200" value="' . esc_attr($label) . '"></label>'
            . '<label>' . esc_html__('URL', 'rcm') . '<input type="url" class="widefat" name="rcm_sources[url][]" maxlength="500" value="' . esc_attr($url) . '"></label>'
            . '<button type="button" class="button-link button-link-delete" data-rcm-seo-remove>' . esc_html__('Remove', 'rcm') . '</button>'
            . '</div>';
    }

    public static function render_article_box(\WP_Post $post): void
    {
        wp_nonce_field('rcm_article_save_' . $post->ID, 'rcm_article_nonce');
        $faqs = self::normalize_faqs((array) rcm_meta($post->ID, '_rcm_faqs', []));
        $sources = (array) rcm_meta($post->ID, '_rcm_sources', []);
        $reviewer = (string) get_post_meta($post->ID, '_rcm_reviewer', true);
        $cta = (string) get_post_meta($post->ID, '_rcm_cta', true) ?: 'consultation';
        $kses = ['div' => ['class' => true], 'label' => [], 'input' => ['type' => true, 'class' => true, 'name' => true, 'maxlength' => true, 'value' => true], 'textarea' => ['class' => true, 'rows' => true, 'name' => true, 'maxlength' => true], 'button' => ['type' => true, 'class' => true, 'data-rcm-seo-remove' => true]];
        ?>
        <div class="rcm-seo-box">
            <h3><?php esc_html_e('FAQs', 'rcm'); ?></h3>
            <p class="description"><?php esc_html_e('Shown at the end of the article and in FAQ structured data. Answer each question in its first sentence.', 'rcm'); ?></p>
            <div class="rcm-seo-repeater" data-rcm-seo-repeater data-max="20">
                <div class="rcm-seo-rows">
                    <?php
                    foreach ($faqs as $f) {
                        echo wp_kses(self::faq_row($f['q'], $f['a']), $kses);
                    }
                    ?>
                </div>
                <template><?php echo wp_kses(self::faq_row('', ''), $kses); ?></template>
                <button type="button" class="button" data-rcm-seo-add><?php esc_html_e('Add FAQ', 'rcm'); ?></button>
            </div>

            <h3><?php esc_html_e('Sources', 'rcm'); ?></h3>
            <p class="description"><?php esc_html_e('Authoritative references (CMS, AMA, ADA, X12, payer manuals). Listed under the article.', 'rcm'); ?></p>
            <div class="rcm-seo-repeater" data-rcm-seo-repeater data-max="20">
                <div class="rcm-seo-rows">
                    <?php
                    foreach ($sources as $s) {
                        if (is_array($s)) {
                            echo wp_kses(self::source_row(self::str($s['label'] ?? ''), self::str($s['url'] ?? '')), $kses);
                        }
                    }
                    ?>
                </div>
                <template><?php echo wp_kses(self::source_row('', ''), $kses); ?></template>
                <button type="button" class="button" data-rcm-seo-add><?php esc_html_e('Add source', 'rcm'); ?></button>
            </div>

            <div class="rcm-seo-grid">
                <div class="rcm-seo-field">
                    <label for="rcm_reviewer"><strong><?php esc_html_e('Reviewed by', 'rcm'); ?></strong></label>
                    <input type="text" class="widefat" id="rcm_reviewer" name="rcm_reviewer" maxlength="120" value="<?php echo esc_attr($reviewer); ?>" aria-describedby="rcm_reviewer-help">
                    <p class="description" id="rcm_reviewer-help"><?php esc_html_e('Name and role of the person who reviewed the article. Leave empty to credit the organization.', 'rcm'); ?></p>
                </div>
                <div class="rcm-seo-field">
                    <label for="rcm_cta"><strong><?php esc_html_e('Call to action block', 'rcm'); ?></strong></label>
                    <select id="rcm_cta" name="rcm_cta" class="widefat">
                        <option value="consultation" <?php selected($cta, 'consultation'); ?>><?php esc_html_e('Free consultation', 'rcm'); ?></option>
                        <option value="tools" <?php selected($cta, 'tools'); ?>><?php esc_html_e('RCM tools and calculators', 'rcm'); ?></option>
                        <option value="none" <?php selected($cta, 'none'); ?>><?php esc_html_e('None', 'rcm'); ?></option>
                    </select>
                </div>
            </div>

            <h3><?php esc_html_e('Internal link suggestions', 'rcm'); ?></h3>
            <?php
            $suggestions = self::link_suggestions($post);
            if (!$suggestions) {
                echo '<p class="description">' . esc_html__('No matches yet. Save the post with a title and focus keyword to see related services, specialties, tools and articles.', 'rcm') . '</p>';
            } else {
                echo '<p class="description">' . esc_html__('Based on the saved title and focus keyword. Link to these where they genuinely help the reader.', 'rcm') . '</p>';
                echo '<ul class="rcm-seo-links">';
                foreach ($suggestions as $i => $s) {
                    $sp = $s['post'];
                    $obj = get_post_type_object($sp->post_type);
                    $fid = 'rcm-seo-link-' . $i;
                    $url = (string) get_permalink($sp);
                    echo '<li>';
                    echo '<span class="rcm-seo-link-title">' . esc_html(self::plain($sp->post_title)) . '</span> ';
                    echo '<span class="rcm-seo-badge">' . esc_html($obj ? (string) $obj->labels->singular_name : $sp->post_type) . '</span>';
                    echo '<span class="rcm-seo-link-url"><label class="screen-reader-text" for="' . esc_attr($fid) . '">' . esc_html__('URL', 'rcm') . '</label>';
                    echo '<input type="text" readonly class="regular-text code" id="' . esc_attr($fid) . '" value="' . esc_attr($url) . '">';
                    echo '<button type="button" class="button button-small" data-rcm-seo-copy="' . esc_attr($fid) . '">' . esc_html__('Copy', 'rcm') . '</button></span>';
                    echo '</li>';
                }
                echo '</ul>';
            }
            ?>
        </div>
        <?php
    }

    private const STOPWORDS = ['the', 'and', 'for', 'with', 'your', 'you', 'how', 'what', 'why', 'when', 'are', 'from', 'that', 'this', 'into', 'our', 'can', 'does', 'guide', 'best', 'about', 'more', 'will', 'has', 'have', 'its', 'was', 'who', 'all', 'not', 'but', 'they', 'their', 'than', 'then', 'them', 'use', 'using', 'per', 'out', 'should', 'need', 'needs', 'which', 'where', 'there', 'other', 'every', 'each', 'most', 'also', 'just', 'like', 'get', 'make', 'explained', 'complete', 'tips', 'ways', 'step'];

    /** Lowercase significant words with a light plural fold. */
    private static function words(string $text): array
    {
        $parts = preg_split('/[^\p{L}\p{N}]+/u', mb_strtolower($text)) ?: [];
        $out = [];
        foreach ($parts as $w) {
            if (mb_strlen($w) < 3 || in_array($w, self::STOPWORDS, true)) {
                continue;
            }
            if (mb_strlen($w) > 4 && str_ends_with($w, 'ies')) {
                $w = mb_substr($w, 0, -3) . 'y';
            } elseif (mb_strlen($w) > 4 && str_ends_with($w, 's') && !str_ends_with($w, 'ss')) {
                $w = mb_substr($w, 0, -1);
            }
            $out[$w] = true;
        }
        return array_keys($out);
    }

    /** @return list<array{score:int,post:\WP_Post}> */
    private static function link_suggestions(\WP_Post $post, int $limit = 10): array
    {
        $focus = trim((string) get_post_meta($post->ID, '_rcm_focus_keyword', true));
        $words = self::words($post->post_title . ' ' . $focus);
        if (!$words) {
            return [];
        }
        $phrase = mb_strtolower($focus);
        $candidates = get_posts([
            'post_type' => ['rcm_service', 'rcm_specialty', 'rcm_tool', 'post'],
            'post_status' => 'publish',
            'numberposts' => 400,
            'exclude' => [$post->ID],
            'orderby' => 'modified',
            'order' => 'DESC',
            'no_found_rows' => true,
        ]);
        $scored = [];
        foreach ($candidates as $c) {
            $title = mb_strtolower(self::plain($c->post_title));
            $d = self::data($c);
            $kw = array_filter((array) ($d['keywords'] ?? []), 'is_string');
            $kw_text = mb_strtolower(implode(' ', $kw) . ' ' . (string) get_post_meta($c->ID, '_rcm_focus_keyword', true));
            $score = 2 * count(array_intersect($words, self::words($title))) + count(array_intersect($words, self::words($kw_text)));
            if ($phrase !== '' && (str_contains($title, $phrase) || str_contains($kw_text, $phrase))) {
                $score += 3;
            }
            if ($score > 0) {
                $scored[] = ['score' => $score, 'post' => $c];
            }
        }
        usort($scored, static fn(array $a, array $b): int => $b['score'] <=> $a['score']);
        return array_slice($scored, 0, $limit);
    }

    /* ------------------------------------------------------------------ */
    /*  Saving                                                             */
    /* ------------------------------------------------------------------ */

    /**
     * Writes meta values ('' deletes) and returns the keys that changed.
     *
     * @param array<string,string> $values
     */
    private static function save_fields(int $id, array $values): array
    {
        $changed = [];
        foreach ($values as $key => $value) {
            $old = (string) get_post_meta($id, $key, true);
            if ($old === $value) {
                continue;
            }
            if ($value === '') {
                delete_post_meta($id, $key);
            } else {
                update_post_meta($id, $key, wp_slash($value));
            }
            $changed[] = $key;
        }
        return $changed;
    }

    private static function clean_url(mixed $value): string
    {
        $url = esc_url_raw(trim(rcm_clean($value, 500)), ['http', 'https']);
        return preg_match('#^https?://#i', $url) ? $url : '';
    }

    public static function save_post(int $post_id, \WP_Post $post): void
    {
        if (wp_is_post_autosave($post_id) || wp_is_post_revision($post_id) || !in_array($post->post_type, self::TYPES, true)) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }
        $changed = [];

        $nonce = isset($_POST['rcm_seo_nonce']) ? sanitize_text_field(wp_unslash($_POST['rcm_seo_nonce'])) : '';
        if ($nonce !== '' && wp_verify_nonce($nonce, 'rcm_seo_save_' . $post_id)) {
            $og = absint($_POST['rcm_og_image'] ?? 0);
            if ($og && !wp_attachment_is_image($og)) {
                $og = 0;
            }
            $changed = array_merge($changed, self::save_fields($post_id, [
                '_rcm_seo_title' => rcm_clean(wp_unslash($_POST['rcm_seo_title'] ?? ''), 120),
                '_rcm_meta_description' => rcm_clean(wp_unslash($_POST['rcm_meta_description'] ?? ''), 320),
                '_rcm_canonical' => self::clean_url(wp_unslash($_POST['rcm_canonical'] ?? '')),
                '_rcm_noindex' => empty($_POST['rcm_noindex']) ? '' : '1',
                '_rcm_og_image' => $og ? (string) $og : '',
                '_rcm_focus_keyword' => rcm_clean(wp_unslash($_POST['rcm_focus_keyword'] ?? ''), 80),
            ]));
        }

        $nonce = isset($_POST['rcm_article_nonce']) ? sanitize_text_field(wp_unslash($_POST['rcm_article_nonce'])) : '';
        if ($post->post_type === 'post' && $nonce !== '' && wp_verify_nonce($nonce, 'rcm_article_save_' . $post_id)) {
            $raw = wp_unslash($_POST['rcm_faqs'] ?? []);
            $raw = is_array($raw) ? $raw : [];
            $qs = is_array($raw['q'] ?? null) ? array_values($raw['q']) : [];
            $as = is_array($raw['a'] ?? null) ? array_values($raw['a']) : [];
            $faqs = [];
            foreach ($qs as $i => $q) {
                $q = rcm_clean($q, 300);
                $a = rcm_clean_text($as[$i] ?? '', 2000);
                if ($q !== '' && $a !== '' && count($faqs) < 20) {
                    $faqs[] = ['q' => $q, 'a' => $a];
                }
            }

            $raw = wp_unslash($_POST['rcm_sources'] ?? []);
            $raw = is_array($raw) ? $raw : [];
            $labels = is_array($raw['label'] ?? null) ? array_values($raw['label']) : [];
            $urls = is_array($raw['url'] ?? null) ? array_values($raw['url']) : [];
            $sources = [];
            foreach ($urls as $i => $u) {
                $u = self::clean_url($u);
                if ($u !== '' && count($sources) < 20) {
                    $label = rcm_clean($labels[$i] ?? '', 200);
                    $sources[] = ['label' => $label !== '' ? $label : (string) wp_parse_url($u, PHP_URL_HOST), 'url' => $u];
                }
            }

            $cta = sanitize_key(wp_unslash($_POST['rcm_cta'] ?? 'consultation'));
            $changed = array_merge($changed, self::save_fields($post_id, [
                '_rcm_faqs' => $faqs ? (string) wp_json_encode($faqs, JSON_UNESCAPED_UNICODE) : '',
                '_rcm_sources' => $sources ? (string) wp_json_encode($sources, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '',
                '_rcm_reviewer' => rcm_clean(wp_unslash($_POST['rcm_reviewer'] ?? ''), 120),
                '_rcm_cta' => in_array($cta, self::CTA_CHOICES, true) ? $cta : 'consultation',
            ]));
        }

        if ($changed) {
            rcm_audit('seo.meta_update', $post->post_type, $post_id, ['fields' => $changed]);
        }
    }

    /* ------------------------------------------------------------------ */
    /*  RCM > SEO screen                                                   */
    /* ------------------------------------------------------------------ */

    /** Rows for the audit table, with issues and duplicate detection. */
    private static function audit_rows(): array
    {
        $posts = get_posts([
            'post_type' => self::ADMIN_TYPES,
            'post_status' => 'publish',
            'numberposts' => 2000,
            'orderby' => ['type' => 'ASC', 'menu_order' => 'ASC', 'title' => 'ASC'],
            'no_found_rows' => true,
        ]);
        $rows = [];
        $titles = [];
        $descs = [];
        foreach ($posts as $p) {
            $m = self::meta_for($p);
            if ((int) get_option('page_on_front') === $p->ID && $m['title_source'] !== 'custom') {
                $m['title'] = __('Dental Billing Services & Dental RCM Company | Texas Solutions RCM', 'rcm');
            }
            $rows[] = ['post' => $p, 'm' => $m, 'issues' => []];
            if (!$m['noindex']) {
                $titles[mb_strtolower($m['title'])] = ($titles[mb_strtolower($m['title'])] ?? 0) + 1;
                if ($m['description'] !== '') {
                    $descs[mb_strtolower($m['description'])] = ($descs[mb_strtolower($m['description'])] ?? 0) + 1;
                }
            }
        }
        foreach ($rows as &$r) {
            $m = $r['m'];
            $tl = mb_strlen($m['title']);
            $dl = mb_strlen($m['description']);
            $issues = [];
            if ($tl > self::TITLE_MAX) {
                /* translators: %d: characters */
                $issues[] = ['warn', sprintf(__('Title too long (%d)', 'rcm'), $tl)];
            } elseif ($tl < 25) {
                $issues[] = ['warn', __('Title very short', 'rcm')];
            }
            if ($m['description_source'] === 'none') {
                $issues[] = ['error', __('Missing description', 'rcm')];
            } else {
                if ($m['description_source'] === 'auto') {
                    $issues[] = ['warn', __('Description taken from content', 'rcm')];
                }
                if ($dl > self::DESC_MAX) {
                    /* translators: %d: characters */
                    $issues[] = ['warn', sprintf(__('Description too long (%d)', 'rcm'), $dl)];
                } elseif ($dl < self::DESC_MIN) {
                    /* translators: %d: characters */
                    $issues[] = ['warn', sprintf(__('Description short (%d)', 'rcm'), $dl)];
                }
            }
            if (!$m['noindex']) {
                if (($titles[mb_strtolower($m['title'])] ?? 0) > 1) {
                    $issues[] = ['error', __('Duplicate title', 'rcm')];
                }
                if ($m['description'] !== '' && ($descs[mb_strtolower($m['description'])] ?? 0) > 1) {
                    $issues[] = ['error', __('Duplicate description', 'rcm')];
                }
            }
            $r['issues'] = $issues;
        }
        unset($r);
        return $rows;
    }

    public static function render_admin(): void
    {
        if (!current_user_can('rcm_manage_seo')) {
            wp_die(esc_html__('You do not have permission to manage SEO.', 'rcm'), 403);
        }
        $type = sanitize_key(wp_unslash($_GET['type'] ?? ''));
        $type = in_array($type, self::ADMIN_TYPES, true) ? $type : '';
        $only = !empty($_GET['problems']);
        $paged = max(1, absint($_GET['paged'] ?? 1));

        $all = self::audit_rows();
        $with_issues = count(array_filter($all, static fn(array $r): bool => (bool) $r['issues']));
        $errors = count(array_filter($all, static fn(array $r): bool => (bool) array_filter($r['issues'], static fn(array $i): bool => $i[0] === 'error')));
        $rows = array_values(array_filter($all, static fn(array $r): bool => ($type === '' || $r['post']->post_type === $type) && (!$only || $r['issues'])));
        $total = count($rows);
        $pages = max(1, (int) ceil($total / self::PER_PAGE));
        $paged = min($paged, $pages);
        $rows = array_slice($rows, ($paged - 1) * self::PER_PAGE, self::PER_PAGE);
        $base_args = array_filter(['page' => 'rcm-seo', 'type' => $type, 'problems' => $only ? '1' : '']);
        ?>
        <div class="wrap rcm-seo-admin">
            <h1><?php esc_html_e('SEO', 'rcm'); ?></h1>
            <?php if (!empty($_GET['updated'])) : ?>
                <div class="notice notice-success is-dismissible"><p><?php esc_html_e('SEO fields saved.', 'rcm'); ?></p></div>
            <?php endif; ?>
            <p>
                <?php
                printf(
                    /* translators: 1: published items, 2: items with issues, 3: items with errors */
                    esc_html__('%1$d published items, %2$d with warnings or errors, %3$d with errors (missing or duplicate).', 'rcm'),
                    count($all),
                    $with_issues,
                    $errors
                );
                ?>
                <a href="<?php echo esc_url(home_url('/wp-sitemap.xml')); ?>" target="_blank" rel="noopener"><?php esc_html_e('Sitemap', 'rcm'); ?></a> |
                <a href="<?php echo esc_url(home_url('/robots.txt')); ?>" target="_blank" rel="noopener">robots.txt</a>
                <?php if (rcm_setting('seo.llms_txt', true)) : ?>
                    | <a href="<?php echo esc_url(home_url('/llms.txt')); ?>" target="_blank" rel="noopener">llms.txt</a>
                    | <a href="<?php echo esc_url(home_url('/llms-full.txt')); ?>" target="_blank" rel="noopener">llms-full.txt</a>
                <?php endif; ?>
                | <a href="<?php echo esc_url(admin_url('admin.php?page=rcm-redirects')); ?>"><?php esc_html_e('Redirects & 404s', 'rcm'); ?></a>
            </p>

            <form method="get" class="rcm-seo-filters">
                <input type="hidden" name="page" value="rcm-seo">
                <label for="rcm-seo-type"><?php esc_html_e('Type', 'rcm'); ?></label>
                <select name="type" id="rcm-seo-type">
                    <option value=""><?php esc_html_e('All types', 'rcm'); ?></option>
                    <?php foreach (self::ADMIN_TYPES as $t) : $obj = get_post_type_object($t); ?>
                        <option value="<?php echo esc_attr($t); ?>" <?php selected($type, $t); ?>><?php echo esc_html($obj ? (string) $obj->labels->name : $t); ?></option>
                    <?php endforeach; ?>
                </select>
                <label for="rcm-seo-problems"><input type="checkbox" name="problems" id="rcm-seo-problems" value="1" <?php checked($only); ?>> <?php esc_html_e('Only problems', 'rcm'); ?></label>
                <button type="submit" class="button"><?php esc_html_e('Filter', 'rcm'); ?></button>
            </form>

            <table class="widefat striped rcm-seo-table">
                <thead>
                    <tr>
                        <th scope="col"><?php esc_html_e('Page', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Title tag', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Meta description', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Indexing', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Issues', 'rcm'); ?></th>
                    </tr>
                </thead>
                <tbody>
                <?php if (!$rows) : ?>
                    <tr><td colspan="5"><?php esc_html_e('Nothing to show. Everything matching this filter looks fine.', 'rcm'); ?></td></tr>
                <?php endif; ?>
                <?php foreach ($rows as $r) :
                    $p = $r['post'];
                    $m = $r['m'];
                    $obj = get_post_type_object($p->post_type);
                    $edit = get_edit_post_link($p->ID);
                    $tl = mb_strlen($m['title']);
                    $dl = mb_strlen($m['description']);
                    $fid = 'rcm-qe-' . $p->ID;
                    ?>
                    <tr id="post-<?php echo esc_attr((string) $p->ID); ?>">
                        <td class="rcm-seo-col-page">
                            <strong><?php echo esc_html(self::plain($p->post_title) ?: __('(no title)', 'rcm')); ?></strong>
                            <span class="rcm-seo-badge"><?php echo esc_html($obj ? (string) $obj->labels->singular_name : $p->post_type); ?></span>
                            <div class="row-actions visible">
                                <a href="<?php echo esc_url((string) get_permalink($p)); ?>" target="_blank" rel="noopener"><?php esc_html_e('View', 'rcm'); ?></a>
                                <?php if ($edit) : ?> | <a href="<?php echo esc_url($edit); ?>"><?php esc_html_e('Edit', 'rcm'); ?></a><?php endif; ?>
                            </div>
                            <?php if (current_user_can('edit_post', $p->ID)) : ?>
                            <details class="rcm-seo-qe">
                                <summary><?php esc_html_e('Quick edit SEO', 'rcm'); ?></summary>
                                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
                                    <input type="hidden" name="action" value="rcm_seo_quick_edit">
                                    <input type="hidden" name="post_id" value="<?php echo esc_attr((string) $p->ID); ?>">
                                    <input type="hidden" name="ret_type" value="<?php echo esc_attr($type); ?>">
                                    <input type="hidden" name="ret_problems" value="<?php echo $only ? '1' : ''; ?>">
                                    <input type="hidden" name="ret_paged" value="<?php echo esc_attr((string) $paged); ?>">
                                    <?php wp_nonce_field('rcm_seo_qe_' . $p->ID); ?>
                                    <p>
                                        <label for="<?php echo esc_attr($fid . '-t'); ?>"><?php esc_html_e('SEO title', 'rcm'); ?></label>
                                        <input type="text" class="widefat" id="<?php echo esc_attr($fid . '-t'); ?>" name="rcm_seo_title" maxlength="120"
                                            value="<?php echo esc_attr((string) get_post_meta($p->ID, '_rcm_seo_title', true)); ?>"
                                            placeholder="<?php echo esc_attr(self::fallback_title($p)[0]); ?>"
                                            data-rcm-seo-count="<?php echo esc_attr($fid . '-tc'); ?>" data-max="<?php echo esc_attr((string) self::TITLE_MAX); ?>"
                                            aria-describedby="<?php echo esc_attr($fid . '-tc'); ?>">
                                        <span class="rcm-seo-count" id="<?php echo esc_attr($fid . '-tc'); ?>" aria-live="polite"></span>
                                    </p>
                                    <p>
                                        <label for="<?php echo esc_attr($fid . '-d'); ?>"><?php esc_html_e('Meta description', 'rcm'); ?></label>
                                        <textarea class="widefat" rows="3" id="<?php echo esc_attr($fid . '-d'); ?>" name="rcm_meta_description" maxlength="320"
                                            placeholder="<?php echo esc_attr(self::fallback_description($p)[0]); ?>"
                                            data-rcm-seo-count="<?php echo esc_attr($fid . '-dc'); ?>" data-min="<?php echo esc_attr((string) self::DESC_MIN); ?>" data-max="<?php echo esc_attr((string) self::DESC_MAX); ?>"
                                            aria-describedby="<?php echo esc_attr($fid . '-dc'); ?>"><?php echo esc_textarea((string) get_post_meta($p->ID, '_rcm_meta_description', true)); ?></textarea>
                                        <span class="rcm-seo-count" id="<?php echo esc_attr($fid . '-dc'); ?>" aria-live="polite"></span>
                                    </p>
                                    <p>
                                        <label for="<?php echo esc_attr($fid . '-n'); ?>">
                                            <input type="checkbox" id="<?php echo esc_attr($fid . '-n'); ?>" name="rcm_noindex" value="1" <?php checked($m['noindex']); ?>>
                                            <?php esc_html_e('noindex', 'rcm'); ?>
                                        </label>
                                    </p>
                                    <p><button type="submit" class="button button-primary"><?php esc_html_e('Save', 'rcm'); ?></button></p>
                                </form>
                            </details>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php echo esc_html($m['title']); ?>
                            <div class="rcm-seo-meta <?php echo $tl > self::TITLE_MAX ? 'is-bad' : 'is-ok'; ?>">
                                <?php
                                /* translators: 1: characters, 2: source */
                                printf(esc_html__('%1$d characters, %2$s', 'rcm'), $tl, esc_html(self::source_label($m['title_source'])));
                                ?>
                            </div>
                        </td>
                        <td>
                            <?php echo $m['description'] !== '' ? esc_html($m['description']) : '<em>' . esc_html__('None', 'rcm') . '</em>'; ?>
                            <div class="rcm-seo-meta <?php echo ($dl < self::DESC_MIN || $dl > self::DESC_MAX) ? 'is-warn' : 'is-ok'; ?>">
                                <?php
                                /* translators: 1: characters, 2: source */
                                printf(esc_html__('%1$d characters, %2$s', 'rcm'), $dl, esc_html(self::source_label($m['description_source'])));
                                ?>
                            </div>
                        </td>
                        <td>
                            <?php if ($m['noindex']) : ?>
                                <span class="rcm-seo-badge is-warn"><?php esc_html_e('noindex', 'rcm'); ?></span>
                            <?php else : ?>
                                <span class="rcm-seo-badge is-ok"><?php esc_html_e('index', 'rcm'); ?></span>
                            <?php endif; ?>
                            <?php if ($m['canonical'] !== '') : ?>
                                <div class="rcm-seo-meta"><?php esc_html_e('Canonical:', 'rcm'); ?> <code><?php echo esc_html($m['canonical']); ?></code></div>
                            <?php endif; ?>
                        </td>
                        <td>
                            <?php if (!$r['issues']) : ?>
                                <span class="rcm-seo-ok"><?php esc_html_e('OK', 'rcm'); ?></span>
                            <?php else : ?>
                                <ul class="rcm-seo-issues">
                                    <?php foreach ($r['issues'] as [$level, $text]) : ?>
                                        <li class="is-<?php echo esc_attr($level); ?>"><?php echo esc_html($text); ?></li>
                                    <?php endforeach; ?>
                                </ul>
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>

            <?php if ($pages > 1) : ?>
                <div class="tablenav"><div class="tablenav-pages">
                    <?php
                    echo wp_kses_post((string) paginate_links([
                        'base' => add_query_arg(array_merge($base_args, ['paged' => '%#%']), admin_url('admin.php')),
                        'format' => '',
                        'current' => $paged,
                        'total' => $pages,
                    ]));
                    ?>
                </div></div>
            <?php endif; ?>
        </div>
        <?php
    }

    private static function source_label(string $source): string
    {
        return match ($source) {
            'custom' => __('custom', 'rcm'),
            'content' => __('from content data', 'rcm'),
            'excerpt' => __('from excerpt', 'rcm'),
            'summary' => __('from summary', 'rcm'),
            'auto' => __('generated from body text', 'rcm'),
            'post' => __('from post title', 'rcm'),
            default => __('missing', 'rcm'),
        };
    }

    public static function quick_edit(): void
    {
        $id = absint($_POST['post_id'] ?? 0);
        if (!$id || !current_user_can('rcm_manage_seo') || !current_user_can('edit_post', $id)) {
            wp_die(esc_html__('You do not have permission to edit this item.', 'rcm'), 403);
        }
        check_admin_referer('rcm_seo_qe_' . $id);
        $post = get_post($id);
        if (!$post instanceof \WP_Post || !in_array($post->post_type, self::TYPES, true)) {
            wp_die(esc_html__('Item not found.', 'rcm'), 404);
        }
        $changed = self::save_fields($id, [
            '_rcm_seo_title' => rcm_clean(wp_unslash($_POST['rcm_seo_title'] ?? ''), 120),
            '_rcm_meta_description' => rcm_clean(wp_unslash($_POST['rcm_meta_description'] ?? ''), 320),
            '_rcm_noindex' => empty($_POST['rcm_noindex']) ? '' : '1',
        ]);
        if ($changed) {
            rcm_audit('seo.quick_edit', $post->post_type, $id, ['fields' => $changed]);
            self::flush_llms_cache();
        }
        $type = sanitize_key(wp_unslash($_POST['ret_type'] ?? ''));
        $args = array_filter([
            'page' => 'rcm-seo',
            'type' => in_array($type, self::ADMIN_TYPES, true) ? $type : '',
            'problems' => empty($_POST['ret_problems']) ? '' : '1',
            'paged' => max(1, absint($_POST['ret_paged'] ?? 1)),
            'updated' => 1,
        ]);
        wp_safe_redirect(add_query_arg($args, admin_url('admin.php')) . '#post-' . $id);
        exit;
    }
}

} // namespace RCM

namespace {

    if (!function_exists('rcm_breadcrumbs')) {
        /**
         * Breadcrumb trail for the current page.
         *
         * @return list<array{0:string,1:string}> [name, url]; the url is '' when there is no link.
         */
        function rcm_breadcrumbs(): array
        {
            return \RCM\SEO::breadcrumbs();
        }
    }

    if (!function_exists('rcm_the_breadcrumbs')) {
        /** Echo the accessible breadcrumb nav (light text for the dark hero). */
        function rcm_the_breadcrumbs(string $class = ''): void
        {
            echo \RCM\SEO::render_breadcrumbs($class); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in render_breadcrumbs()
        }
    }
}
