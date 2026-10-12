<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Editors for the structured `_rcm_data` document of services, specialties and
 * tools, plus approval fields for case studies, testimonials and integrations.
 *
 * Field types: text, textarea, paragraphs (blank line between paragraphs),
 * lines (one item per line), steps (title + detail repeater), faqs (question +
 * answer repeater), refs (checkbox list of other RCM posts), json (validated).
 */
final class Meta_Boxes
{
    public static function init(): void
    {
        add_action('add_meta_boxes', [self::class, 'add']);
        add_action('save_post', [self::class, 'save'], 10, 2);
    }

    /** Field schema per post type: key => [label, type, help, (ref type)]. */
    public static function schema(string $type): array
    {
        $common_tail = [
            'faqs' => [__('FAQs (shown on the page and in FAQ structured data)', 'rcm'), 'faqs', __('Answer each question in its first sentence, 40 to 90 words.', 'rcm')],
            'keywords' => [__('Keywords', 'rcm'), 'lines', __('One per line. Used for internal search and link suggestions.', 'rcm')],
        ];
        return match ($type) {
            Content_Types::SERVICE => [
                'shortName' => [__('Short name (menus and cards, max 28 characters)', 'rcm'), 'text', ''],
                'icon' => [__('Icon (Lucide name, e.g. FileCheck2)', 'rcm'), 'text', __('See lucide.dev/icons. The name must be in data/icons.json.', 'rcm')],
                'definition' => [__('Quick answer: "What is this service?" (40 to 60 words)', 'rcm'), 'textarea', ''],
                'intro' => [__('Introduction', 'rcm'), 'paragraphs', __('Separate paragraphs with a blank line.', 'rcm')],
                'scope' => [__('What the service covers', 'rcm'), 'lines', __('One task per line.', 'rcm')],
                'workflow' => [__('How the work runs (steps)', 'rcm'), 'steps', ''],
                'benefits' => [__('What the work is designed to improve', 'rcm'), 'steps', __('Potential outcomes only. No promised results.', 'rcm')],
                'practiceTypes' => [__('Practices that often need this service', 'rcm'), 'refs', '', Content_Types::SPECIALTY],
                'relatedTools' => [__('Related tools', 'rcm'), 'refs', '', Content_Types::TOOL],
                'relatedServices' => [__('Related services', 'rcm'), 'refs', '', Content_Types::SERVICE],
            ] + $common_tail,
            Content_Types::SPECIALTY => [
                'icon' => [__('Icon (Lucide name)', 'rcm'), 'text', ''],
                'definition' => [__('Quick answer: "What does this specialty\'s billing involve?" (40 to 60 words)', 'rcm'), 'textarea', ''],
                'intro' => [__('Introduction', 'rcm'), 'paragraphs', __('Separate paragraphs with a blank line.', 'rcm')],
                'challenges' => [__('Billing challenges', 'rcm'), 'steps', ''],
                'payerWorkflow' => [__('How claims typically move (payer workflow notes)', 'rcm'), 'lines', ''],
                'services' => [__('Relevant services', 'rcm'), 'refs', '', Content_Types::SERVICE],
                'relatedTools' => [__('Related tools', 'rcm'), 'refs', '', Content_Types::TOOL],
            ] + $common_tail,
            Content_Types::TOOL => [
                'icon' => [__('Icon (Lucide name)', 'rcm'), 'text', ''],
                'definition' => [__('Quick answer (40 to 60 words)', 'rcm'), 'textarea', ''],
                'assumptions' => [__('Assumptions and limits (calculators)', 'rcm'), 'lines', ''],
                'relatedServices' => [__('Related services', 'rcm'), 'refs', '', Content_Types::SERVICE],
                'relatedTools' => [__('Related tools', 'rcm'), 'refs', '', Content_Types::TOOL],
            ] + $common_tail + [
                'spec' => [__('Advanced: tool specification (JSON)', 'rcm'), 'json', __('Inputs, outputs, formulas, worked example, benchmarks, checklist sections or glossary entries. Calculator formulas live in code; changing input or output ids here breaks the calculator. Benchmarks need a source URL and date.', 'rcm')],
            ],
            default => [],
        };
    }

    /** Keys of the tool document edited through the JSON field. */
    private const TOOL_SPEC_KEYS = ['kind', 'inputs', 'outputs', 'formula', 'example', 'benchmarks', 'sections', 'entries', 'lookup', 'sources'];

    public static function add(): void
    {
        foreach ([Content_Types::SERVICE, Content_Types::SPECIALTY, Content_Types::TOOL] as $type) {
            add_meta_box('rcm-data', __('Page content', 'rcm'), [self::class, 'render'], $type, 'normal', 'high');
        }
        foreach ([Content_Types::CASE_STUDY, Content_Types::TESTIMONIAL, Content_Types::INTEGRATION] as $type) {
            add_meta_box('rcm-approval', __('Publication approval', 'rcm'), [self::class, 'render_approval'], $type, 'side', 'high');
        }
        add_meta_box('rcm-job', __('Job details', 'rcm'), [self::class, 'render_job'], Content_Types::JOB, 'side');
    }

    public static function render(\WP_Post $post): void
    {
        wp_nonce_field('rcm_data_' . $post->ID, 'rcm_data_nonce');
        $data = Content_Types::data($post);
        $key = Content_Types::key($post);
        echo '<div class="rcm-fields">';
        if ($key) {
            echo '<p class="description">' . sprintf(esc_html__('Content key: %s. The summary is the post excerpt; the SEO title and description are in the SEO box.', 'rcm'), '<code>' . esc_html($key) . '</code>') . '</p>';
        }
        foreach (self::schema($post->post_type) as $field => $def) {
            [$label, $type, $help] = $def;
            $name = 'rcm_data[' . $field . ']';
            $id = 'rcm-f-' . $field;
            echo '<div class="rcm-field rcm-field-' . esc_attr($type) . '">';
            echo '<label class="rcm-label" for="' . esc_attr($id) . '">' . esc_html($label) . '</label>';
            $value = $field === 'spec' ? array_intersect_key($data, array_flip(self::TOOL_SPEC_KEYS)) : ($data[$field] ?? null);
            switch ($type) {
                case 'text':
                    printf('<input type="text" class="widefat" id="%s" name="%s" value="%s">', esc_attr($id), esc_attr($name), esc_attr((string) $value));
                    break;
                case 'textarea':
                    printf('<textarea class="widefat" rows="3" id="%s" name="%s">%s</textarea>', esc_attr($id), esc_attr($name), esc_textarea((string) $value));
                    break;
                case 'paragraphs':
                    printf('<textarea class="widefat" rows="8" id="%s" name="%s">%s</textarea>', esc_attr($id), esc_attr($name), esc_textarea(implode("\n\n", (array) $value)));
                    break;
                case 'lines':
                    printf('<textarea class="widefat" rows="6" id="%s" name="%s">%s</textarea>', esc_attr($id), esc_attr($name), esc_textarea(implode("\n", (array) $value)));
                    break;
                case 'steps':
                    self::repeater($field, (array) $value, ['title' => __('Title', 'rcm'), 'detail' => __('Detail', 'rcm')]);
                    break;
                case 'faqs':
                    self::repeater($field, (array) $value, ['q' => __('Question', 'rcm'), 'a' => __('Answer', 'rcm')]);
                    break;
                case 'refs':
                    self::refs($field, (array) $value, $def[3], $post->ID);
                    break;
                case 'json':
                    if (current_user_can('manage_options')) {
                        printf('<textarea class="widefat code" rows="14" id="%s" name="%s" spellcheck="false">%s</textarea>', esc_attr($id), esc_attr($name), esc_textarea((string) wp_json_encode($value, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)));
                    } else {
                        echo '<p class="description">' . esc_html__('Only administrators can edit the tool specification.', 'rcm') . '</p>';
                    }
                    break;
            }
            if ($help) {
                echo '<p class="description">' . esc_html($help) . '</p>';
            }
            echo '</div>';
        }
        echo '</div>';
    }

    /** Repeater of objects with two text fields; JS in admin.js adds/removes/moves rows. */
    private static function repeater(string $field, array $rows, array $cols): void
    {
        $keys = array_keys($cols);
        echo '<div class="rcm-repeater" data-rcm-repeater="' . esc_attr($field) . '">';
        echo '<ol class="rcm-rows">';
        $rows = $rows ?: [array_fill_keys($keys, '')];
        foreach ($rows as $i => $row) {
            self::repeater_row($field, (int) $i, (array) $row, $cols);
        }
        echo '</ol>';
        echo '<template>';
        self::repeater_row($field, -1, [], $cols);
        echo '</template>';
        echo '<button type="button" class="button rcm-add-row">' . esc_html__('Add row', 'rcm') . '</button>';
        echo '</div>';
    }

    private static function repeater_row(string $field, int $i, array $row, array $cols): void
    {
        $idx = $i < 0 ? '__i__' : (string) $i;
        echo '<li class="rcm-row">';
        $first = true;
        foreach ($cols as $k => $label) {
            $name = sprintf('rcm_data[%s][%s][%s]', $field, $idx, $k);
            echo '<label><span class="screen-reader-text">' . esc_html($label) . '</span>';
            if ($first) {
                printf('<input type="text" class="widefat" placeholder="%s" name="%s" value="%s">', esc_attr($label), esc_attr($name), esc_attr((string) ($row[$k] ?? '')));
            } else {
                printf('<textarea class="widefat" rows="3" placeholder="%s" name="%s">%s</textarea>', esc_attr($label), esc_attr($name), esc_textarea((string) ($row[$k] ?? '')));
            }
            echo '</label>';
            $first = false;
        }
        echo '<span class="rcm-row-actions"><button type="button" class="button-link rcm-up" aria-label="' . esc_attr__('Move up', 'rcm') . '">&uarr;</button> <button type="button" class="button-link rcm-down" aria-label="' . esc_attr__('Move down', 'rcm') . '">&darr;</button> <button type="button" class="button-link button-link-delete rcm-remove">' . esc_html__('Remove', 'rcm') . '</button></span>';
        echo '</li>';
    }

    private static function refs(string $field, array $selected, string $ref_type, int $self_id): void
    {
        $items = Content_Types::all($ref_type);
        echo '<div class="rcm-refs"><input type="search" class="rcm-refs-filter" placeholder="' . esc_attr__('Filter…', 'rcm') . '" aria-label="' . esc_attr__('Filter list', 'rcm') . '"><div class="rcm-refs-list">';
        foreach ($items as $key => $p) {
            if ($p->ID === $self_id) {
                continue;
            }
            printf(
                '<label><input type="checkbox" name="rcm_data[%s][]" value="%s" %s> %s</label>',
                esc_attr($field),
                esc_attr((string) $key),
                checked(in_array($key, $selected, true), true, false),
                esc_html(get_the_title($p))
            );
        }
        echo '</div></div>';
    }

    public static function render_approval(\WP_Post $post): void
    {
        wp_nonce_field('rcm_approval_' . $post->ID, 'rcm_approval_nonce');
        $approved = get_post_meta($post->ID, '_rcm_approved', true) === '1';
        $by = (string) get_post_meta($post->ID, '_rcm_approved_by', true);
        $on = (string) get_post_meta($post->ID, '_rcm_approved_on', true);
        $authorization = (string) get_post_meta($post->ID, '_rcm_authorization', true);
        echo '<p>' . esc_html__('Only approved items appear on the website. Results, testimonials and client names need written permission and verification.', 'rcm') . '</p>';
        printf('<p><label><input type="checkbox" name="rcm_approved" value="1" %s> %s</label></p>', checked($approved, true, false), esc_html__('Approved for publication', 'rcm'));
        printf('<p><label for="rcm-auth">%s</label><textarea id="rcm-auth" class="widefat" rows="3" name="rcm_authorization">%s</textarea></p>', esc_html__('Authorization record (who approved, how, where the written permission is stored)', 'rcm'), esc_textarea($authorization));
        if ($approved && $by) {
            echo '<p class="description">' . esc_html(sprintf(__('Approved by %1$s on %2$s', 'rcm'), $by, $on)) . '</p>';
        }
        if ($post->post_type === Content_Types::TESTIMONIAL) {
            printf('<p><label for="rcm-org">%s</label><input id="rcm-org" class="widefat" name="rcm_org" value="%s"></p>', esc_html__('Practice / organization', 'rcm'), esc_attr((string) get_post_meta($post->ID, '_rcm_org', true)));
        }
        if ($post->post_type === Content_Types::INTEGRATION) {
            printf('<p><label for="rcm-url">%s</label><input id="rcm-url" type="url" class="widefat" name="rcm_url" value="%s"></p>', esc_html__('Vendor website', 'rcm'), esc_attr((string) get_post_meta($post->ID, '_rcm_url', true)));
        }
    }

    public static function render_job(\WP_Post $post): void
    {
        wp_nonce_field('rcm_job_' . $post->ID, 'rcm_job_nonce');
        foreach (['_rcm_job_location' => __('Location (e.g. Remote, US hours)', 'rcm'), '_rcm_job_type' => __('Employment type', 'rcm')] as $k => $label) {
            printf('<p><label for="%1$s">%2$s</label><input id="%1$s" class="widefat" name="%1$s" value="%3$s"></p>', esc_attr($k), esc_html($label), esc_attr((string) get_post_meta($post->ID, $k, true)));
        }
        printf('<p><label><input type="checkbox" name="_rcm_job_open" value="1" %s> %s</label></p>', checked(get_post_meta($post->ID, '_rcm_job_open', true) !== '0', true, false), esc_html__('Accepting applications', 'rcm'));
    }

    public static function save(int $post_id, \WP_Post $post): void
    {
        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }
        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['rcm_data_nonce']) && wp_verify_nonce(sanitize_key($_POST['rcm_data_nonce']), 'rcm_data_' . $post_id)) {
            self::save_data($post_id, $post);
        }

        if (isset($_POST['rcm_approval_nonce']) && wp_verify_nonce(sanitize_key($_POST['rcm_approval_nonce']), 'rcm_approval_' . $post_id)) {
            $was = get_post_meta($post_id, '_rcm_approved', true) === '1';
            $now = !empty($_POST['rcm_approved']);
            update_post_meta($post_id, '_rcm_approved', $now ? '1' : '0');
            update_post_meta($post_id, '_rcm_authorization', sanitize_textarea_field(wp_unslash($_POST['rcm_authorization'] ?? '')));
            if (isset($_POST['rcm_org'])) {
                update_post_meta($post_id, '_rcm_org', rcm_clean(wp_unslash($_POST['rcm_org']), 160));
            }
            if (isset($_POST['rcm_url'])) {
                update_post_meta($post_id, '_rcm_url', esc_url_raw(wp_unslash($_POST['rcm_url'])));
            }
            if ($now && !$was) {
                update_post_meta($post_id, '_rcm_approved_by', wp_get_current_user()->user_email);
                update_post_meta($post_id, '_rcm_approved_on', current_time('Y-m-d'));
                rcm_audit('content.approve', $post->post_type, $post_id, ['title' => $post->post_title]);
            } elseif (!$now && $was) {
                rcm_audit('content.unapprove', $post->post_type, $post_id, ['title' => $post->post_title]);
            }
        }

        if (isset($_POST['rcm_job_nonce']) && wp_verify_nonce(sanitize_key($_POST['rcm_job_nonce']), 'rcm_job_' . $post_id)) {
            update_post_meta($post_id, '_rcm_job_location', rcm_clean(wp_unslash($_POST['_rcm_job_location'] ?? ''), 120));
            update_post_meta($post_id, '_rcm_job_type', rcm_clean(wp_unslash($_POST['_rcm_job_type'] ?? ''), 60));
            update_post_meta($post_id, '_rcm_job_open', empty($_POST['_rcm_job_open']) ? '0' : '1');
        }
    }

    private static function save_data(int $post_id, \WP_Post $post): void
    {
        $in = wp_unslash($_POST['rcm_data'] ?? []);
        if (!is_array($in)) {
            return;
        }
        $data = Content_Types::data($post);
        foreach (self::schema($post->post_type) as $field => $def) {
            $type = $def[1];
            $v = $in[$field] ?? null;
            switch ($type) {
                case 'text':
                    $data[$field] = rcm_clean($v, 120);
                    break;
                case 'textarea':
                    $data[$field] = rcm_clean_text($v, 2000);
                    break;
                case 'paragraphs':
                    $data[$field] = array_values(array_filter(array_map('trim', preg_split('/\R\s*\R/', (string) $v) ?: [])));
                    $data[$field] = array_map(static fn($p) => rcm_clean_text($p, 3000), $data[$field]);
                    break;
                case 'lines':
                    $data[$field] = array_values(array_filter(array_map(static fn($l) => rcm_clean($l, 400), preg_split('/\R/', (string) $v) ?: [])));
                    break;
                case 'steps':
                case 'faqs':
                    $a = $type === 'steps' ? ['title', 'detail'] : ['q', 'a'];
                    $rows = [];
                    foreach ((array) $v as $row) {
                        $one = rcm_clean($row[$a[0]] ?? '', 300);
                        $two = rcm_clean_text($row[$a[1]] ?? '', 2000);
                        if ($one !== '' || $two !== '') {
                            $rows[] = [$a[0] => $one, $a[1] => $two];
                        }
                    }
                    $data[$field] = $rows;
                    break;
                case 'refs':
                    $valid = array_keys(Content_Types::all($def[3]));
                    $data[$field] = array_values(array_intersect(array_map('sanitize_title', (array) $v), $valid));
                    break;
                case 'json':
                    if (!current_user_can('manage_options') || $v === null) {
                        break;
                    }
                    $decoded = json_decode((string) $v, true);
                    if (!is_array($decoded)) {
                        set_transient('rcm_meta_error_' . get_current_user_id(), __('The tool specification was not valid JSON, so it was not changed.', 'rcm'), 60);
                        break;
                    }
                    foreach (self::TOOL_SPEC_KEYS as $k) {
                        if (array_key_exists($k, $decoded)) {
                            $data[$k] = $decoded[$k];
                        }
                    }
                    break;
            }
        }
        // Keep the summary in sync with the excerpt so the JSON stays complete.
        $data['summary'] = $post->post_excerpt;
        update_post_meta($post_id, '_rcm_data', wp_slash((string) wp_json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)));
    }
}
