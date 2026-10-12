<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Imports the bundled content (data/*.json, built from src/content) into
 * WordPress: services, specialties, tools, FAQs, pages, blog categories and
 * starter articles, and the reading settings (static front page + blog page).
 *
 * Re-running is safe: items are matched by their content key. An item an
 * admin has edited since the last import is never overwritten unless "force"
 * is chosen for that content type.
 */
final class Importer
{
    public const BLOG_CATEGORIES = [
        'Medical Billing', 'Dental Billing', 'Revenue Cycle Management', 'Medical Coding', 'Insurance Claims', 'Denial Management',
        'Credentialing', 'Healthcare Technology', 'Healthcare AI', 'Practice Management', 'Compliance and Regulation',
        'RCM Tools and Guides', 'Healthcare Industry News', 'Medicare and Medicaid Updates', 'Specialty Billing Guides',
    ];

    public static function init(): void
    {
        add_action('admin_init', [self::class, 'maybe_first_import']);
        add_action('admin_post_rcm_import', [self::class, 'handle']);
    }

    public static function maybe_first_import(): void
    {
        if (!get_option('rcm_pending_import') || !current_user_can('manage_options') || wp_doing_ajax()) {
            return;
        }
        delete_option('rcm_pending_import');
        $report = self::run(['services', 'specialties', 'tools', 'faqs', 'pages', 'blog', 'settings'], false);
        update_option('rcm_content_imported', current_time('mysql'));
        update_option('rcm_last_import_report', $report, false);
        rcm_audit('content.import', 'content', 'first-run', $report);
    }

    public static function handle(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die(esc_html__('You do not have permission to import content.', 'rcm'), 403);
        }
        check_admin_referer('rcm_import');
        $types = array_values(array_intersect((array) ($_POST['types'] ?? []), ['services', 'specialties', 'tools', 'faqs', 'pages', 'blog', 'settings']));
        $force = !empty($_POST['force']);
        $report = self::run($types, $force);
        update_option('rcm_content_imported', current_time('mysql'));
        update_option('rcm_last_import_report', $report, false);
        rcm_audit('content.import', 'content', $force ? 'force' : 'sync', $report);
        wp_safe_redirect(add_query_arg(['page' => 'rcm-tools', 'imported' => 1], admin_url('admin.php')));
        exit;
    }

    /** @return array<string, array{created:int, updated:int, skipped:int}> */
    public static function run(array $types, bool $force): array
    {
        if (function_exists('set_time_limit')) {
            @set_time_limit(300); // phpcs:ignore WordPress.PHP.NoSilencedErrors
        }
        if (!defined('WP_IMPORTING')) {
            define('WP_IMPORTING', true); // one audit entry for the whole import instead of one per post
        }
        wp_defer_term_counting(true);
        $report = [];
        foreach ($types as $type) {
            $report[$type] = match ($type) {
                'services' => self::import_cpt(Content_Types::SERVICE, rcm_data('services'), $force),
                'specialties' => self::import_cpt(Content_Types::SPECIALTY, rcm_data('specialties'), $force),
                'tools' => self::import_cpt(Content_Types::TOOL, rcm_data('tools'), $force),
                'faqs' => self::import_faqs($force),
                'pages' => self::import_pages($force),
                'blog' => self::import_blog($force),
                'settings' => self::apply_settings(),
                default => ['created' => 0, 'updated' => 0, 'skipped' => 0],
            };
        }
        wp_defer_term_counting(false);
        flush_rewrite_rules();
        return $report;
    }

    private static function find_by_key(string $post_type, string $key): ?\WP_Post
    {
        $found = get_posts(['post_type' => $post_type, 'post_status' => 'any', 'numberposts' => 1, 'meta_key' => '_rcm_key', 'meta_value' => $key, 'no_found_rows' => true]);
        return $found[0] ?? null;
    }

    private static function term(string $taxonomy, string $slug, string $name, string $description = ''): int
    {
        $t = get_term_by('slug', $slug, $taxonomy);
        if ($t) {
            return (int) $t->term_id;
        }
        $r = wp_insert_term($name, $taxonomy, ['slug' => $slug, 'description' => $description]);
        return is_wp_error($r) ? 0 : (int) $r['term_id'];
    }

    private static function import_cpt(string $post_type, array $items, bool $force): array
    {
        $n = ['created' => 0, 'updated' => 0, 'skipped' => 0];
        foreach ($items as $i => $item) {
            $key = (string) $item['slug'];
            $json = (string) wp_json_encode($item, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
            $hash = md5($json);
            $existing = self::find_by_key($post_type, $key);

            if ($existing) {
                $stored = (string) get_post_meta($existing->ID, '_rcm_import_hash', true);
                $current = md5((string) get_post_meta($existing->ID, '_rcm_data', true));
                $edited = $stored && $stored !== $current;
                if ($stored === $hash || ($edited && !$force)) {
                    $n['skipped']++;
                    continue;
                }
            }

            $postarr = [
                'post_type' => $post_type,
                'post_status' => 'publish',
                'post_title' => (string) $item['name'],
                'post_excerpt' => (string) ($item['summary'] ?? ''),
                'menu_order' => (int) $i,
                'comment_status' => 'closed',
                'ping_status' => 'closed',
            ];
            if ($existing) {
                $postarr['ID'] = $existing->ID;
                $id = wp_update_post(wp_slash($postarr), true);
                $n['updated']++;
            } else {
                $postarr['post_name'] = $key;
                $id = wp_insert_post(wp_slash($postarr), true);
                $n['created']++;
            }
            if (is_wp_error($id)) {
                continue;
            }
            update_post_meta($id, '_rcm_key', $key);
            update_post_meta($id, '_rcm_data', wp_slash($json));
            update_post_meta($id, '_rcm_import_hash', $hash);
            if (!empty($item['seoTitle']) && ($force || !get_post_meta($id, '_rcm_seo_title', true))) {
                update_post_meta($id, '_rcm_seo_title', (string) $item['seoTitle']);
            }
            if (!empty($item['metaDescription']) && ($force || !get_post_meta($id, '_rcm_meta_description', true))) {
                update_post_meta($id, '_rcm_meta_description', (string) $item['metaDescription']);
            }

            if ($post_type === Content_Types::SERVICE) {
                $cat = (string) $item['category'];
                [$label, $desc] = Content_Types::SERVICE_CATEGORIES[$cat] ?? [$cat, ''];
                wp_set_object_terms($id, [self::term('rcm_service_category', $cat, $label, $desc)], 'rcm_service_category');
            } elseif ($post_type === Content_Types::SPECIALTY) {
                $kind = (string) ($item['kind'] ?? 'medical');
                wp_set_object_terms($id, [self::term('rcm_specialty_kind', $kind, $kind === 'dental' ? __('Dental', 'rcm') : __('Medical', 'rcm'))], 'rcm_specialty_kind');
            } elseif ($post_type === Content_Types::TOOL) {
                $cat = (string) $item['category'];
                [$label, $desc] = Content_Types::TOOL_CATEGORIES[$cat] ?? [$cat, ''];
                wp_set_object_terms($id, [self::term('rcm_tool_category', $cat, $label, $desc)], 'rcm_tool_category');
            }
        }
        return $n;
    }

    private static function import_faqs(bool $force): array
    {
        $n = ['created' => 0, 'updated' => 0, 'skipped' => 0];
        $company = rcm_data('company');
        $order = 0;
        foreach ((array) ($company['GENERAL_FAQS'] ?? []) as $group) {
            $term = self::term('rcm_faq_topic', sanitize_title($group['topic']), (string) $group['topic']);
            foreach ((array) $group['faqs'] as $faq) {
                $key = 'faq-' . substr(md5((string) $faq['q']), 0, 12);
                $existing = self::find_by_key(Content_Types::FAQ, $key);
                if ($existing && !$force) {
                    $n['skipped']++;
                    continue;
                }
                $postarr = ['post_type' => Content_Types::FAQ, 'post_status' => 'publish', 'post_title' => (string) $faq['q'], 'post_content' => (string) $faq['a'], 'menu_order' => $order++];
                if ($existing) {
                    $postarr['ID'] = $existing->ID;
                }
                $id = $existing ? wp_update_post(wp_slash($postarr), true) : wp_insert_post(wp_slash($postarr), true);
                if (is_wp_error($id)) {
                    continue;
                }
                update_post_meta($id, '_rcm_key', $key);
                wp_set_object_terms($id, [$term], 'rcm_faq_topic', true);
                $existing ? $n['updated']++ : $n['created']++;
            }
        }
        return $n;
    }

    private static function import_pages(bool $force): array
    {
        $n = ['created' => 0, 'updated' => 0, 'skipped' => 0];
        $map = (array) get_option('rcm_page_ids', []);
        $pages = rcm_data('pages');
        // Home and blog pages are structural (content comes from templates).
        array_unshift(
            $pages,
            ['key' => 'home', 'title' => __('Home', 'rcm'), 'template' => 'default', 'intro' => '', 'body' => ''],
            ['key' => 'blog', 'title' => __('Blog', 'rcm'), 'template' => 'default', 'intro' => '', 'body' => '']
        );
        foreach ($pages as $i => $p) {
            $key = (string) $p['key'];
            $existing = !empty($map[$key]) ? get_post((int) $map[$key]) : null;
            if (!$existing) {
                $existing = self::find_by_key('page', $key) ?: get_page_by_path($key);
            }
            $body = (string) ($p['body'] ?? '');
            $hash = md5($body . ($p['title'] ?? '') . ($p['intro'] ?? ''));
            if ($existing) {
                $stored = (string) get_post_meta($existing->ID, '_rcm_import_hash', true);
                $current = md5($existing->post_content . $existing->post_title . get_post_meta($existing->ID, '_rcm_intro', true));
                // A page we did not create (no hash) is only taken over when it is not published,
                // e.g. WordPress's default draft "Privacy Policy" page.
                $foreign_published = !$stored && $existing->post_status === 'publish';
                if ($stored === $hash || (!$force && $stored && $stored !== $current) || (!$force && $foreign_published)) {
                    $map[$key] = $existing->ID;
                    $n['skipped']++;
                    continue;
                }
            }
            $postarr = [
                'post_type' => 'page',
                'post_status' => 'publish',
                'post_title' => (string) $p['title'],
                'post_content' => $body,
                'menu_order' => (int) $i,
                'comment_status' => 'closed',
                'ping_status' => 'closed',
            ];
            if ($existing) {
                $postarr['ID'] = $existing->ID;
                $id = wp_update_post(wp_slash($postarr), true);
            } else {
                $postarr['post_name'] = $key;
                $id = wp_insert_post(wp_slash($postarr), true);
            }
            if (is_wp_error($id)) {
                continue;
            }
            $existing ? $n['updated']++ : $n['created']++;
            $map[$key] = $id;
            update_post_meta($id, '_rcm_key', $key);
            update_post_meta($id, '_rcm_intro', (string) ($p['intro'] ?? ''));
            update_post_meta($id, '_rcm_import_hash', md5($body . $p['title'] . ($p['intro'] ?? '')));
            if (!empty($p['lastUpdated'])) {
                update_post_meta($id, '_rcm_last_updated', (string) $p['lastUpdated']);
            }
            $template = (string) ($p['template'] ?? 'default');
            update_post_meta($id, '_wp_page_template', $template === 'default' ? 'default' : 'page-templates/' . $template . '.php');
            if (!empty($p['seoTitle'])) {
                update_post_meta($id, '_rcm_seo_title', (string) $p['seoTitle']);
            }
            if (!empty($p['metaDescription'])) {
                update_post_meta($id, '_rcm_meta_description', (string) $p['metaDescription']);
            }
        }
        update_option('rcm_page_ids', $map);

        if (!empty($map['home']) && !empty($map['blog'])) {
            update_option('show_on_front', 'page');
            update_option('page_on_front', (int) $map['home']);
            update_option('page_for_posts', (int) $map['blog']);
        }
        if (!empty($map['privacy-policy'])) {
            update_option('wp_page_for_privacy_policy', (int) $map['privacy-policy']);
        }
        return $n;
    }

    private static function import_blog(bool $force): array
    {
        $n = ['created' => 0, 'updated' => 0, 'skipped' => 0];
        $cats = [];
        foreach (self::BLOG_CATEGORIES as $name) {
            $cats[$name] = self::term('category', sanitize_title($name), $name);
        }
        // Rename WordPress's default "Uncategorized" so new posts land somewhere sensible.
        $default = (int) get_option('default_category');
        $rcm = $cats['Revenue Cycle Management'] ?? 0;
        if ($rcm && $default && $default !== $rcm) {
            $u = get_term($default, 'category');
            if ($u && !is_wp_error($u) && $u->slug === 'uncategorized' && (int) $u->count === 0) {
                update_option('default_category', $rcm);
            }
        }

        foreach (rcm_data('blog') as $p) {
            $key = 'post-' . $p['slug'];
            $existing = self::find_by_key('post', $key) ?: get_page_by_path((string) $p['slug'], OBJECT, 'post');
            if ($existing && !$force) {
                $n['skipped']++;
                continue;
            }
            $date = (string) $p['publishedAt'];
            $postarr = [
                'post_type' => 'post',
                'post_status' => 'publish',
                'post_title' => (string) $p['title'],
                'post_name' => (string) $p['slug'],
                'post_excerpt' => (string) $p['excerpt'],
                'post_content' => self::html_to_blocks((string) $p['html']),
                'post_date_gmt' => gmdate('Y-m-d H:i:s', strtotime($date . ' 14:00:00 UTC')),
                'post_date' => get_date_from_gmt(gmdate('Y-m-d H:i:s', strtotime($date . ' 14:00:00 UTC'))),
                'post_category' => array_filter([$cats[$p['category']] ?? 0]),
                'tags_input' => (array) $p['tags'],
                'comment_status' => 'closed',
                'ping_status' => 'closed',
            ];
            if ($existing) {
                $postarr['ID'] = $existing->ID;
            }
            $id = $existing ? wp_update_post(wp_slash($postarr), true) : wp_insert_post(wp_slash($postarr), true);
            if (is_wp_error($id)) {
                continue;
            }
            $existing ? $n['updated']++ : $n['created']++;
            update_post_meta($id, '_rcm_key', $key);
            update_post_meta($id, '_rcm_seo_title', (string) $p['seoTitle']);
            update_post_meta($id, '_rcm_meta_description', (string) $p['metaDescription']);
            update_post_meta($id, '_rcm_faqs', wp_slash((string) wp_json_encode($p['faqs'], JSON_UNESCAPED_UNICODE)));
            update_post_meta($id, '_rcm_sources', wp_slash((string) wp_json_encode($p['sources'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)));
            update_post_meta($id, '_rcm_reading_minutes', (int) $p['readingMinutes']);
            update_post_meta($id, '_rcm_cta', 'consultation');
        }
        return $n;
    }

    /** Wraps simple HTML in core block comments so posts open cleanly in the block editor. */
    public static function html_to_blocks(string $html): string
    {
        $html = preg_replace('#href="(/(services|specialties|tools|contact|consultation|blog)[^"]*?)(?<!/)"#', 'href="$1/"', $html) ?? $html;
        $doc = new \DOMDocument();
        libxml_use_internal_errors(true);
        $doc->loadHTML('<?xml encoding="utf-8"?><div id="rcm-root">' . $html . '</div>', LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);
        libxml_clear_errors();
        $root = $doc->getElementById('rcm-root');
        if (!$root) {
            return $html;
        }
        $out = [];
        foreach ($root->childNodes as $node) {
            if (!$node instanceof \DOMElement) {
                continue;
            }
            $inner = $doc->saveHTML($node);
            switch (strtolower($node->tagName)) {
                case 'h2':
                case 'h3':
                case 'h4':
                    $level = (int) substr($node->tagName, 1);
                    $inner = preg_replace('/^<h(\d)>/', '<h$1 class="wp-block-heading">', $inner);
                    $out[] = ($level === 2 ? '<!-- wp:heading -->' : '<!-- wp:heading {"level":' . $level . '} -->') . $inner . '<!-- /wp:heading -->';
                    break;
                case 'p':
                    $out[] = '<!-- wp:paragraph -->' . $inner . '<!-- /wp:paragraph -->';
                    break;
                case 'ul':
                case 'ol':
                    $ordered = strtolower($node->tagName) === 'ol';
                    $items = '';
                    foreach ($node->childNodes as $li) {
                        if ($li instanceof \DOMElement && strtolower($li->tagName) === 'li') {
                            $items .= '<!-- wp:list-item -->' . $doc->saveHTML($li) . '<!-- /wp:list-item -->';
                        }
                    }
                    $tag = $ordered ? 'ol' : 'ul';
                    $out[] = ($ordered ? '<!-- wp:list {"ordered":true} -->' : '<!-- wp:list -->') . '<' . $tag . ' class="wp-block-list">' . $items . '</' . $tag . '><!-- /wp:list -->';
                    break;
                case 'table':
                    $out[] = '<!-- wp:table --><figure class="wp-block-table">' . $inner . '</figure><!-- /wp:table -->';
                    break;
                case 'blockquote':
                    $out[] = '<!-- wp:quote --><blockquote class="wp-block-quote">' . preg_replace('#^<blockquote>|</blockquote>$#', '', $inner) . '</blockquote><!-- /wp:quote -->';
                    break;
                default:
                    $out[] = '<!-- wp:html -->' . $inner . '<!-- /wp:html -->';
            }
        }
        return implode("\n\n", $out);
    }

    /** Site identity and sensible defaults, applied only while WordPress still has its install defaults. */
    private static function apply_settings(): array
    {
        $n = ['created' => 0, 'updated' => 0, 'skipped' => 0];
        $defaults = ['Just Another WordPress Site', 'My WordPress Site', 'My Blog', ''];
        if (in_array(get_option('blogname'), $defaults, true)) {
            update_option('blogname', 'Texas Solutions RCM');
            $n['updated']++;
        } else {
            $n['skipped']++;
        }
        $tag = (string) get_option('blogdescription');
        if ($tag === '' || $tag === 'Just another WordPress site') {
            update_option('blogdescription', 'Revenue cycle management for US medical and dental practices');
            $n['updated']++;
        }
        if (get_option('permalink_structure') === '') {
            update_option('permalink_structure', '/%postname%/');
            $n['updated']++;
        }
        // Comments are not used on this site.
        update_option('default_comment_status', 'closed');
        update_option('default_ping_status', 'closed');
        return $n;
    }
}
