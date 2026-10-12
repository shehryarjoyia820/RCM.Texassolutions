<?php
/**
 * RCM > Chats: list of assistant conversations.
 *
 * @var array $rows
 * @var int   $total
 * @var int   $paged
 * @var int   $pages
 * @var array $filters  s, needs_human, review, from, to
 */

defined('ABSPATH') || exit;

$review_labels = [
    'unreviewed' => __('Not reviewed', 'rcm'),
    'good' => __('Good', 'rcm'),
    'needs_fix' => __('Needs fix', 'rcm'),
];
$can_leads = current_user_can('rcm_view_leads');
$fmt = get_option('date_format') . ' ' . get_option('time_format');
?>
<div class="wrap rcm-chats">
    <h1 class="wp-heading-inline"><?php esc_html_e('Chats', 'rcm'); ?></h1>
    <span class="rcm-chat-count"><?php echo esc_html(sprintf(_n('%s conversation', '%s conversations', $total, 'rcm'), number_format_i18n($total))); ?></span>
    <hr class="wp-header-end">

    <?php \RCM\Chat::render_status_notice(); ?>

    <?php if (!empty($_GET['deleted'])) : // phpcs:ignore WordPress.Security.NonceVerification.Recommended ?>
        <div class="notice notice-success is-dismissible"><p><?php esc_html_e('Chat deleted.', 'rcm'); ?></p></div>
    <?php endif; ?>

    <form method="get" class="rcm-chat-filters">
        <input type="hidden" name="page" value="rcm-chats">
        <p class="search-box">
            <label class="screen-reader-text" for="rcm-chat-search"><?php esc_html_e('Search chats', 'rcm'); ?></label>
            <input type="search" id="rcm-chat-search" name="s" value="<?php echo esc_attr($filters['s']); ?>" placeholder="<?php esc_attr_e('Name, email or session ID', 'rcm'); ?>">
        </p>
        <div class="tablenav top">
            <div class="alignleft actions">
                <label class="screen-reader-text" for="rcm-chat-needs"><?php esc_html_e('Follow-up', 'rcm'); ?></label>
                <select id="rcm-chat-needs" name="needs_human">
                    <option value=""><?php esc_html_e('Any follow-up status', 'rcm'); ?></option>
                    <option value="1" <?php selected($filters['needs_human'], '1'); ?>><?php esc_html_e('Needs follow-up', 'rcm'); ?></option>
                    <option value="0" <?php selected($filters['needs_human'], '0'); ?>><?php esc_html_e('No follow-up requested', 'rcm'); ?></option>
                </select>
                <label class="screen-reader-text" for="rcm-chat-review"><?php esc_html_e('Review status', 'rcm'); ?></label>
                <select id="rcm-chat-review" name="review">
                    <option value=""><?php esc_html_e('Any review status', 'rcm'); ?></option>
                    <?php foreach ($review_labels as $value => $label) : ?>
                        <option value="<?php echo esc_attr($value); ?>" <?php selected($filters['review'], $value); ?>><?php echo esc_html($label); ?></option>
                    <?php endforeach; ?>
                </select>
                <label for="rcm-chat-from"><?php esc_html_e('From', 'rcm'); ?></label>
                <input type="date" id="rcm-chat-from" name="from" value="<?php echo esc_attr($filters['from']); ?>">
                <label for="rcm-chat-to"><?php esc_html_e('To', 'rcm'); ?></label>
                <input type="date" id="rcm-chat-to" name="to" value="<?php echo esc_attr($filters['to']); ?>">
                <button type="submit" class="button"><?php esc_html_e('Filter', 'rcm'); ?></button>
                <?php if (array_filter($filters, static fn($v) => $v !== '')) : ?>
                    <a class="button-link" href="<?php echo esc_url(admin_url('admin.php?page=rcm-chats')); ?>"><?php esc_html_e('Clear', 'rcm'); ?></a>
                <?php endif; ?>
            </div>
            <br class="clear">
        </div>
    </form>

    <table class="widefat striped rcm-chat-table">
        <thead>
            <tr>
                <th scope="col"><?php esc_html_e('Started', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Lead', 'rcm'); ?></th>
                <th scope="col" class="num"><?php esc_html_e('Messages', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Needs follow-up', 'rcm'); ?></th>
                <th scope="col"><?php esc_html_e('Review', 'rcm'); ?></th>
                <th scope="col"><span class="screen-reader-text"><?php esc_html_e('Actions', 'rcm'); ?></span></th>
            </tr>
        </thead>
        <tbody>
        <?php if (!$rows) : ?>
            <tr><td colspan="6"><?php esc_html_e('No chats found.', 'rcm'); ?></td></tr>
        <?php endif; ?>
        <?php foreach ($rows as $r) :
            $detail = \RCM\Chat::chat_admin_url((string) $r['id']);
            $review = (string) $r['review'];
            ?>
            <tr>
                <td>
                    <a href="<?php echo esc_url($detail); ?>"><?php echo esc_html(get_date_from_gmt((string) $r['created_at'], $fmt)); ?></a>
                    <br><code class="rcm-chat-id"><?php echo esc_html((string) $r['id']); ?></code>
                    <?php if ($r['status'] === 'active') : ?><span class="rcm-chat-pill rcm-chat-pill--active"><?php esc_html_e('Active', 'rcm'); ?></span><?php endif; ?>
                </td>
                <td>
                    <?php if (!empty($r['lead_name'])) : ?>
                        <?php if ($can_leads) : ?>
                            <a href="<?php echo esc_url(\RCM\Chat::lead_admin_url((string) $r['lead_id'])); ?>"><strong><?php echo esc_html((string) $r['lead_name']); ?></strong></a>
                        <?php else : ?>
                            <strong><?php echo esc_html((string) $r['lead_name']); ?></strong>
                        <?php endif; ?>
                        <br><?php echo esc_html((string) $r['lead_email']); ?>
                        <?php if (!empty($r['lead_company'])) : ?><br><span class="description"><?php echo esc_html((string) $r['lead_company']); ?></span><?php endif; ?>
                    <?php else : ?>
                        <span class="description"><?php esc_html_e('Lead deleted', 'rcm'); ?></span>
                    <?php endif; ?>
                </td>
                <td class="num"><?php echo esc_html(number_format_i18n((int) $r['message_count'])); ?></td>
                <td>
                    <?php if ((int) $r['needs_human'] === 1) : ?>
                        <span class="rcm-chat-pill rcm-chat-pill--warn"><?php esc_html_e('Yes', 'rcm'); ?></span>
                    <?php else : ?>
                        <span class="description"><?php esc_html_e('No', 'rcm'); ?></span>
                    <?php endif; ?>
                </td>
                <td><span class="rcm-chat-pill rcm-chat-pill--<?php echo esc_attr($review); ?>"><?php echo esc_html($review_labels[$review] ?? $review); ?></span></td>
                <td><a class="button button-small" href="<?php echo esc_url($detail); ?>"><?php esc_html_e('Open', 'rcm'); ?></a></td>
            </tr>
        <?php endforeach; ?>
        </tbody>
    </table>

    <?php if ($pages > 1) : ?>
        <div class="tablenav bottom">
            <div class="tablenav-pages">
                <?php
                echo wp_kses_post(paginate_links([
                    'base' => add_query_arg('paged', '%#%'),
                    'format' => '',
                    'current' => $paged,
                    'total' => $pages,
                ]));
                ?>
            </div>
        </div>
    <?php endif; ?>
</div>
