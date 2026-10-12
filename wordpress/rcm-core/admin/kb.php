<?php
/**
 * RCM > Knowledge base: admin KB items, open assistant flags, generated site knowledge preview.
 *
 * @var array      $items       rows from rcm_kb_items
 * @var array|null $edit        row being edited
 * @var array|null $from_flag   flag used to prefill a new approved answer
 * @var array      $flags       open flags
 * @var array      $site_items  Chat::site_knowledge()
 */

defined('ABSPATH') || exit;

$categories = [
    'approved-answer' => __('Approved answer', 'rcm'),
    'policy' => __('Policy', 'rcm'),
    'other' => __('Other', 'rcm'),
];
$flag_labels = [
    'unanswered' => __('Unanswered question', 'rcm'),
    'handoff' => __('Asked for a person', 'rcm'),
    'error' => __('Assistant error', 'rcm'),
    'phi' => __('Patient information withheld', 'rcm'),
];
$fmt = get_option('date_format') . ' ' . get_option('time_format');
$post_url = admin_url('admin-post.php');
$can_chats = current_user_can('rcm_view_chats');

$form = [
    'id' => $edit ? (int) $edit['id'] : 0,
    'title' => $edit ? (string) $edit['title'] : '',
    'body' => $edit ? (string) $edit['body'] : '',
    'category' => $edit ? (string) $edit['category'] : 'approved-answer',
    'source_page' => $edit ? (string) $edit['source_page'] : '',
];
if (!$edit && $from_flag) {
    $form['title'] = mb_substr((string) $from_flag['detail'], 0, 200);
}

// phpcs:disable WordPress.Security.NonceVerification.Recommended
$notice = '';
if (!empty($_GET['saved'])) {
    $notice = __('Knowledge base updated.', 'rcm');
} elseif (!empty($_GET['deleted'])) {
    $notice = __('Item deleted.', 'rcm');
} elseif (!empty($_GET['resolved'])) {
    $notice = __('Flag resolved.', 'rcm');
}
$error = !empty($_GET['error']);
// phpcs:enable
?>
<div class="wrap rcm-kb">
    <h1><?php esc_html_e('Assistant knowledge base', 'rcm'); ?></h1>
    <p class="description"><?php esc_html_e('The assistant answers company questions only from this knowledge. Site knowledge is generated from published services, specialties, tools, FAQs and blog posts. Add approved answers and policies below to correct or extend it. Approved answers and policies are always given to the assistant.', 'rcm'); ?></p>

    <?php \RCM\Chat::render_status_notice(); ?>

    <?php if ($notice !== '') : ?>
        <div class="notice notice-success is-dismissible"><p><?php echo esc_html($notice); ?></p></div>
    <?php endif; ?>
    <?php if ($error) : ?>
        <div class="notice notice-error"><p><?php esc_html_e('Please enter a title and an answer.', 'rcm'); ?></p></div>
    <?php endif; ?>

    <div class="rcm-kb-layout">
        <div class="rcm-kb-form postbox" id="rcm-kb-form">
            <h2 class="hndle"><?php echo $form['id'] ? esc_html__('Edit item', 'rcm') : esc_html__('Add item', 'rcm'); ?></h2>
            <div class="inside">
                <?php if ($from_flag && !$edit) : ?>
                    <p class="notice-inline"><?php esc_html_e('Prefilled from a visitor question. Rewrite the title as a clear question and write the approved answer. Saving resolves the flag.', 'rcm'); ?></p>
                <?php endif; ?>
                <form method="post" action="<?php echo esc_url($post_url); ?>">
                    <input type="hidden" name="action" value="rcm_kb_save">
                    <input type="hidden" name="id" value="<?php echo esc_attr((string) $form['id']); ?>">
                    <?php if ($from_flag && !$edit) : ?>
                        <input type="hidden" name="from_flag" value="<?php echo esc_attr((string) $from_flag['id']); ?>">
                    <?php endif; ?>
                    <?php wp_nonce_field('rcm_kb_save'); ?>
                    <p>
                        <label for="rcm-kb-title"><strong><?php esc_html_e('Title or question', 'rcm'); ?></strong></label>
                        <input type="text" id="rcm-kb-title" name="title" class="widefat" maxlength="200" required value="<?php echo esc_attr($form['title']); ?>">
                    </p>
                    <p>
                        <label for="rcm-kb-body"><strong><?php esc_html_e('Answer or policy text', 'rcm'); ?></strong></label>
                        <textarea id="rcm-kb-body" name="body" class="widefat" rows="8" required><?php echo esc_textarea($form['body']); ?></textarea>
                        <span class="description"><?php esc_html_e('Plain text. Only approved, accurate facts. No prices, results, certifications or guarantees unless the owner has approved them. Never include patient information.', 'rcm'); ?></span>
                    </p>
                    <p>
                        <label for="rcm-kb-category"><strong><?php esc_html_e('Category', 'rcm'); ?></strong></label><br>
                        <select id="rcm-kb-category" name="category">
                            <?php foreach ($categories as $value => $label) : ?>
                                <option value="<?php echo esc_attr($value); ?>" <?php selected($form['category'], $value); ?>><?php echo esc_html($label); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </p>
                    <p>
                        <label for="rcm-kb-source"><strong><?php esc_html_e('Source page (optional)', 'rcm'); ?></strong></label>
                        <input type="text" id="rcm-kb-source" name="source_page" class="widefat" maxlength="300" placeholder="/services/denial-management/" value="<?php echo esc_attr($form['source_page']); ?>">
                        <span class="description"><?php esc_html_e('Site path the assistant may link to for this answer.', 'rcm'); ?></span>
                    </p>
                    <p>
                        <button type="submit" class="button button-primary"><?php echo $form['id'] ? esc_html__('Save changes', 'rcm') : esc_html__('Add to knowledge base', 'rcm'); ?></button>
                        <?php if ($form['id'] || $from_flag) : ?>
                            <a class="button-link" href="<?php echo esc_url(admin_url('admin.php?page=rcm-kb')); ?>"><?php esc_html_e('Cancel', 'rcm'); ?></a>
                        <?php endif; ?>
                    </p>
                </form>
            </div>
        </div>

        <div class="rcm-kb-items">
            <h2><?php esc_html_e('Admin items', 'rcm'); ?> <span class="count">(<?php echo esc_html(number_format_i18n(count($items))); ?>)</span></h2>
            <table class="widefat striped">
                <thead>
                    <tr>
                        <th scope="col"><?php esc_html_e('Title', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Category', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Status', 'rcm'); ?></th>
                        <th scope="col"><?php esc_html_e('Updated', 'rcm'); ?></th>
                        <th scope="col"><span class="screen-reader-text"><?php esc_html_e('Actions', 'rcm'); ?></span></th>
                    </tr>
                </thead>
                <tbody>
                <?php if (!$items) : ?>
                    <tr><td colspan="5"><?php esc_html_e('No admin items yet.', 'rcm'); ?></td></tr>
                <?php endif; ?>
                <?php foreach ($items as $it) :
                    $iid = (int) $it['id'];
                    $active = $it['status'] === 'active';
                    ?>
                    <tr class="<?php echo $active ? '' : 'rcm-kb-disabled'; ?>">
                        <td>
                            <strong><?php echo esc_html((string) $it['title']); ?></strong>
                            <div class="rcm-kb-excerpt"><?php echo esc_html(wp_trim_words((string) $it['body'], 30, '...')); ?></div>
                            <?php if ($it['source_page'] !== '') : ?><code><?php echo esc_html((string) $it['source_page']); ?></code><?php endif; ?>
                        </td>
                        <td><?php echo esc_html($categories[$it['category']] ?? (string) $it['category']); ?></td>
                        <td><?php echo $active ? esc_html__('Active', 'rcm') : esc_html__('Disabled', 'rcm'); ?></td>
                        <td>
                            <?php echo esc_html(get_date_from_gmt((string) $it['updated_at'], $fmt)); ?>
                            <?php if ($it['updated_by'] !== '') : ?><br><span class="description"><?php echo esc_html((string) $it['updated_by']); ?></span><?php endif; ?>
                        </td>
                        <td class="rcm-kb-actions">
                            <a class="button button-small" href="<?php echo esc_url(admin_url('admin.php?page=rcm-kb&edit=' . $iid . '#rcm-kb-form')); ?>"><?php esc_html_e('Edit', 'rcm'); ?></a>
                            <form method="post" action="<?php echo esc_url($post_url); ?>">
                                <input type="hidden" name="action" value="rcm_kb_status">
                                <input type="hidden" name="id" value="<?php echo esc_attr((string) $iid); ?>">
                                <input type="hidden" name="status" value="<?php echo $active ? 'disabled' : 'active'; ?>">
                                <?php wp_nonce_field('rcm_kb_status_' . $iid); ?>
                                <button type="submit" class="button button-small"><?php echo $active ? esc_html__('Disable', 'rcm') : esc_html__('Enable', 'rcm'); ?></button>
                            </form>
                            <form method="post" action="<?php echo esc_url($post_url); ?>" onsubmit="return confirm('<?php echo esc_js(__('Delete this item permanently?', 'rcm')); ?>');">
                                <input type="hidden" name="action" value="rcm_kb_delete">
                                <input type="hidden" name="id" value="<?php echo esc_attr((string) $iid); ?>">
                                <?php wp_nonce_field('rcm_kb_delete_' . $iid); ?>
                                <button type="submit" class="button button-small button-link-delete"><?php esc_html_e('Delete', 'rcm'); ?></button>
                            </form>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    </div>

    <h2 id="rcm-flags"><?php esc_html_e('Open flags', 'rcm'); ?> <span class="count">(<?php echo esc_html(number_format_i18n(count($flags))); ?>)</span></h2>
    <p class="description"><?php esc_html_e('Questions the assistant could not answer, requests for a person, errors and withheld patient information. Resolve them once handled.', 'rcm'); ?></p>
    <table class="widefat striped rcm-flags-table">
        <thead>
            <tr>
                <th scope="col"><?php esc_html_e('When', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Kind', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Detail', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Chat', 'rcm'); ?></th>
                <th scope="col"><span class="screen-reader-text"><?php esc_html_e('Actions', 'rcm'); ?></span></th>
            </tr>
        </thead>
        <tbody>
        <?php if (!$flags) : ?>
            <tr><td colspan="5"><?php esc_html_e('No open flags.', 'rcm'); ?></td></tr>
        <?php endif; ?>
        <?php foreach ($flags as $f) :
            $fid = (int) $f['id'];
            ?>
            <tr>
                <td><?php echo esc_html(get_date_from_gmt((string) $f['created_at'], $fmt)); ?></td>
                <td><span class="rcm-chat-pill rcm-chat-pill--<?php echo esc_attr((string) $f['kind']); ?>"><?php echo esc_html($flag_labels[$f['kind']] ?? (string) $f['kind']); ?></span></td>
                <td><?php echo esc_html((string) $f['detail']); ?></td>
                <td>
                    <?php if (!empty($f['session_id']) && $can_chats) : ?>
                        <a href="<?php echo esc_url(\RCM\Chat::chat_admin_url((string) $f['session_id'])); ?>"><code><?php echo esc_html((string) $f['session_id']); ?></code></a>
                    <?php elseif (!empty($f['session_id'])) : ?>
                        <code><?php echo esc_html((string) $f['session_id']); ?></code>
                    <?php else : ?>
                        &mdash;
                    <?php endif; ?>
                </td>
                <td class="rcm-kb-actions">
                    <?php if ($f['kind'] === 'unanswered') : ?>
                        <a class="button button-small button-primary" href="<?php echo esc_url(admin_url('admin.php?page=rcm-kb&from_flag=' . $fid . '#rcm-kb-form')); ?>"><?php esc_html_e('Create approved answer from this question', 'rcm'); ?></a>
                    <?php endif; ?>
                    <form method="post" action="<?php echo esc_url($post_url); ?>">
                        <input type="hidden" name="action" value="rcm_flag_resolve">
                        <input type="hidden" name="id" value="<?php echo esc_attr((string) $fid); ?>">
                        <?php wp_nonce_field('rcm_flag_resolve_' . $fid); ?>
                        <button type="submit" class="button button-small"><?php esc_html_e('Resolve', 'rcm'); ?></button>
                    </form>
                </td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

    <details class="rcm-kb-preview">
        <summary>
            <?php
            /* translators: %s: number of generated knowledge items */
            echo esc_html(sprintf(__('Generated site knowledge (%s items, read-only)', 'rcm'), number_format_i18n(count($site_items))));
            ?>
        </summary>
        <p class="description"><?php esc_html_e('Built from published content and refreshed whenever content changes. Edit the source page to change an item.', 'rcm'); ?></p>
        <table class="widefat striped">
            <thead>
                <tr>
                    <th scope="col"><?php esc_html_e('Title', 'rcm'); ?></th>
                    <th scope="col"><?php esc_html_e('Type', 'rcm'); ?></th>
                    <th scope="col"><?php esc_html_e('Source', 'rcm'); ?></th>
                </tr>
            </thead>
            <tbody>
            <?php foreach ($site_items as $si) : ?>
                <tr>
                    <td><?php echo esc_html((string) $si['title']); ?></td>
                    <td><?php echo esc_html((string) $si['category']); ?></td>
                    <td><?php if ($si['source_page'] !== '') : ?><a href="<?php echo esc_url((string) $si['source_page']); ?>" target="_blank" rel="noopener"><?php echo esc_html((string) $si['source_page']); ?></a><?php endif; ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </details>
</div>
