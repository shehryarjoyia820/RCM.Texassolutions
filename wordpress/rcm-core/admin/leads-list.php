<?php
/**
 * RCM > Leads list. Rendered by \RCM\Leads::render_admin().
 *
 * @var array      $filters    normalized filters (Leads::filters_from_request)
 * @var array      $result     Leads::query() result
 * @var \WP_User[] $users      assignable users (ID, display_name)
 * @var bool       $can_manage
 * @var bool       $can_export
 * @var array|null $notice     [type, message]
 */

defined('ABSPATH') || exit;

use RCM\Leads;

$rcm_base = admin_url('admin.php?page=rcm-leads');
$rcm_user_names = [];
foreach ($users as $rcm_u) {
    $rcm_user_names[(int) $rcm_u->ID] = (string) $rcm_u->display_name;
}
$rcm_list_url = static fn(array $override = []): string => add_query_arg(Leads::filter_args($filters, $override), $rcm_base);
$rcm_sort_th = static function (string $col, string $label) use ($filters, $rcm_list_url): void {
    $current = $filters['orderby'] === $col;
    $next = $current && $filters['order'] === 'desc' ? 'asc' : 'desc';
    $class = $current ? 'sorted ' . $filters['order'] : 'sortable desc';
    $aria = $current ? ($filters['order'] === 'asc' ? 'ascending' : 'descending') : '';
    printf(
        '<th scope="col" class="manage-column column-%1$s %2$s"%3$s><a href="%4$s"><span>%5$s</span><span class="sorting-indicators"><span class="sorting-indicator asc" aria-hidden="true"></span><span class="sorting-indicator desc" aria-hidden="true"></span></span></a></th>',
        esc_attr($col),
        esc_attr($class),
        $aria !== '' ? ' aria-sort="' . esc_attr($aria) . '"' : '',
        esc_url($rcm_list_url(['orderby' => $col, 'order' => $next, 'paged' => 1])),
        esc_html($label)
    );
};
$rcm_export_url = wp_nonce_url(add_query_arg(['action' => 'rcm_leads_export'] + Leads::filter_args($filters, ['paged' => 1]), admin_url('admin-post.php')), 'rcm_leads_export');
$rcm_has_filters = (bool) array_filter(array_intersect_key($filters, array_flip(['s', 'status', 'source', 'assigned', 'from', 'to', 'band', 'dup'])));
$rcm_pagination = paginate_links([
    'base' => add_query_arg('paged', '%#%', $rcm_list_url(['paged' => 1])),
    'format' => '',
    'current' => $result['page'],
    'total' => $result['pages'],
    'prev_text' => '&lsaquo;',
    'next_text' => '&rsaquo;',
]);
?>
<div class="wrap rcm-leads">
    <h1 class="wp-heading-inline"><?php esc_html_e('Leads', 'rcm'); ?></h1>
    <?php if ($can_export) : ?>
        <a href="<?php echo esc_url($rcm_export_url); ?>" class="page-title-action"><?php esc_html_e('Export CSV', 'rcm'); ?></a>
    <?php endif; ?>
    <hr class="wp-header-end">

    <?php if ($notice) : ?>
        <div class="notice notice-<?php echo esc_attr($notice[0]); ?> is-dismissible"><p><?php echo esc_html($notice[1]); ?></p></div>
    <?php endif; ?>

    <form method="get" action="<?php echo esc_url(admin_url('admin.php')); ?>" class="rcm-leads-filters">
        <input type="hidden" name="page" value="rcm-leads">
        <?php if ($filters['orderby'] !== 'created_at') : ?>
            <input type="hidden" name="orderby" value="<?php echo esc_attr($filters['orderby']); ?>">
        <?php endif; ?>
        <?php if ($filters['order'] !== 'desc') : ?>
            <input type="hidden" name="order" value="<?php echo esc_attr($filters['order']); ?>">
        <?php endif; ?>

        <p class="search-box">
            <label class="screen-reader-text" for="rcm-lead-search"><?php esc_html_e('Search leads', 'rcm'); ?></label>
            <input type="search" id="rcm-lead-search" name="s" value="<?php echo esc_attr($filters['s']); ?>" placeholder="<?php esc_attr_e('Name, email, company or ID', 'rcm'); ?>">
            <input type="submit" class="button" value="<?php esc_attr_e('Search', 'rcm'); ?>">
        </p>

        <div class="rcm-filter-row">
            <label>
                <span class="screen-reader-text"><?php esc_html_e('Status', 'rcm'); ?></span>
                <select name="status">
                    <option value=""><?php esc_html_e('All statuses', 'rcm'); ?></option>
                    <?php foreach (Leads::STATUSES as $rcm_s) : ?>
                        <option value="<?php echo esc_attr($rcm_s); ?>" <?php selected($filters['status'], $rcm_s); ?>><?php echo esc_html(Leads::status_label($rcm_s)); ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
            <label>
                <span class="screen-reader-text"><?php esc_html_e('Source', 'rcm'); ?></span>
                <select name="source">
                    <option value=""><?php esc_html_e('All sources', 'rcm'); ?></option>
                    <?php foreach (Leads::SOURCES as $rcm_s) : ?>
                        <option value="<?php echo esc_attr($rcm_s); ?>" <?php selected($filters['source'], $rcm_s); ?>><?php echo esc_html(Leads::source_label($rcm_s)); ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
            <label>
                <span class="screen-reader-text"><?php esc_html_e('Assigned to', 'rcm'); ?></span>
                <select name="assigned">
                    <option value=""><?php esc_html_e('Anyone', 'rcm'); ?></option>
                    <option value="me" <?php selected($filters['assigned'], 'me'); ?>><?php esc_html_e('Assigned to me', 'rcm'); ?></option>
                    <option value="none" <?php selected($filters['assigned'], 'none'); ?>><?php esc_html_e('Unassigned', 'rcm'); ?></option>
                    <?php foreach ($rcm_user_names as $rcm_id => $rcm_name) : ?>
                        <option value="<?php echo esc_attr((string) $rcm_id); ?>" <?php selected($filters['assigned'], (string) $rcm_id); ?>><?php echo esc_html($rcm_name); ?></option>
                    <?php endforeach; ?>
                </select>
            </label>
            <label>
                <span class="screen-reader-text"><?php esc_html_e('Score band', 'rcm'); ?></span>
                <select name="band">
                    <option value=""><?php esc_html_e('Any score', 'rcm'); ?></option>
                    <option value="hot" <?php selected($filters['band'], 'hot'); ?>><?php esc_html_e('Hot (60+)', 'rcm'); ?></option>
                    <option value="warm" <?php selected($filters['band'], 'warm'); ?>><?php esc_html_e('Warm (35-59)', 'rcm'); ?></option>
                    <option value="cold" <?php selected($filters['band'], 'cold'); ?>><?php esc_html_e('Cold (under 35)', 'rcm'); ?></option>
                </select>
            </label>
            <label>
                <span class="screen-reader-text"><?php esc_html_e('Duplicates', 'rcm'); ?></span>
                <select name="dup">
                    <option value=""><?php esc_html_e('Originals and duplicates', 'rcm'); ?></option>
                    <option value="0" <?php selected($filters['dup'], '0'); ?>><?php esc_html_e('Originals only', 'rcm'); ?></option>
                    <option value="1" <?php selected($filters['dup'], '1'); ?>><?php esc_html_e('Duplicates only', 'rcm'); ?></option>
                </select>
            </label>
            <label>
                <?php esc_html_e('From', 'rcm'); ?>
                <input type="date" name="from" value="<?php echo esc_attr($filters['from']); ?>">
            </label>
            <label>
                <?php esc_html_e('To', 'rcm'); ?>
                <input type="date" name="to" value="<?php echo esc_attr($filters['to']); ?>">
            </label>
            <input type="submit" class="button" value="<?php esc_attr_e('Filter', 'rcm'); ?>">
            <?php if ($rcm_has_filters) : ?>
                <a class="button-link" href="<?php echo esc_url($rcm_base); ?>"><?php esc_html_e('Reset', 'rcm'); ?></a>
            <?php endif; ?>
        </div>
    </form>

    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="rcm_leads_bulk">
        <?php wp_nonce_field('rcm_leads_bulk'); ?>

        <div class="tablenav top">
            <?php if ($can_manage) : ?>
                <div class="alignleft actions bulkactions">
                    <label for="rcm-bulk-status" class="screen-reader-text"><?php esc_html_e('Change status of selected leads', 'rcm'); ?></label>
                    <select name="bulk_status" id="rcm-bulk-status">
                        <option value=""><?php esc_html_e('Change status to...', 'rcm'); ?></option>
                        <?php foreach (Leads::STATUSES as $rcm_s) : ?>
                            <option value="<?php echo esc_attr($rcm_s); ?>"><?php echo esc_html(Leads::status_label($rcm_s)); ?></option>
                        <?php endforeach; ?>
                    </select>
                    <input type="submit" class="button action" value="<?php esc_attr_e('Apply', 'rcm'); ?>">
                </div>
            <?php endif; ?>
            <div class="tablenav-pages">
                <span class="displaying-num">
                    <?php
                    /* translators: %s: number of leads */
                    echo esc_html(sprintf(_n('%s lead', '%s leads', $result['total'], 'rcm'), number_format_i18n($result['total'])));
                    ?>
                </span>
                <?php if ($rcm_pagination) : ?>
                    <span class="pagination-links"><?php echo wp_kses_post($rcm_pagination); ?></span>
                <?php endif; ?>
            </div>
            <br class="clear">
        </div>

        <table class="wp-list-table widefat fixed striped rcm-leads-table">
            <thead>
                <tr>
                    <?php if ($can_manage) : ?>
                        <td class="manage-column column-cb check-column">
                            <label class="screen-reader-text" for="rcm-select-all"><?php esc_html_e('Select all', 'rcm'); ?></label>
                            <input id="rcm-select-all" type="checkbox">
                        </td>
                    <?php endif; ?>
                    <th scope="col" class="manage-column column-primary"><?php esc_html_e('Lead', 'rcm'); ?></th>
                    <th scope="col" class="manage-column"><?php esc_html_e('Practice/company', 'rcm'); ?></th>
                    <th scope="col" class="manage-column"><?php esc_html_e('Source', 'rcm'); ?></th>
                    <th scope="col" class="manage-column"><?php esc_html_e('Status', 'rcm'); ?></th>
                    <?php $rcm_sort_th('score', __('Score', 'rcm')); ?>
                    <th scope="col" class="manage-column"><?php esc_html_e('Assigned', 'rcm'); ?></th>
                    <th scope="col" class="manage-column"><?php esc_html_e('Follow-up', 'rcm'); ?></th>
                    <?php $rcm_sort_th('created_at', __('Received', 'rcm')); ?>
                </tr>
            </thead>
            <tbody>
                <?php if (!$result['items']) : ?>
                    <tr class="no-items">
                        <td colspan="<?php echo $can_manage ? '9' : '8'; ?>"><?php $rcm_has_filters ? esc_html_e('No leads match these filters.', 'rcm') : esc_html_e('No leads yet.', 'rcm'); ?></td>
                    </tr>
                <?php endif; ?>
                <?php foreach ($result['items'] as $rcm_lead) :
                    $rcm_url = add_query_arg('lead', rawurlencode($rcm_lead['id']), $rcm_base);
                    $rcm_due = $rcm_lead['follow_up_at'] && $rcm_lead['follow_up_at'] <= wp_date('Y-m-d') && !in_array($rcm_lead['status'], ['won', 'lost'], true);
                    ?>
                    <tr>
                        <?php if ($can_manage) : ?>
                            <th scope="row" class="check-column">
                                <label class="screen-reader-text" for="rcm-cb-<?php echo esc_attr($rcm_lead['id']); ?>">
                                    <?php
                                    /* translators: %s: lead name */
                                    echo esc_html(sprintf(__('Select %s', 'rcm'), $rcm_lead['name']));
                                    ?>
                                </label>
                                <input id="rcm-cb-<?php echo esc_attr($rcm_lead['id']); ?>" type="checkbox" name="ids[]" value="<?php echo esc_attr($rcm_lead['id']); ?>">
                            </th>
                        <?php endif; ?>
                        <td class="column-primary">
                            <strong><a class="row-title" href="<?php echo esc_url($rcm_url); ?>"><?php echo esc_html($rcm_lead['name']); ?></a></strong>
                            <?php if ($rcm_lead['duplicate_of']) : ?>
                                <span class="rcm-pill rcm-pill-dup" title="<?php echo esc_attr(sprintf(__('Possible duplicate of %s', 'rcm'), $rcm_lead['duplicate_of'])); ?>"><?php esc_html_e('Duplicate', 'rcm'); ?></span>
                            <?php endif; ?>
                            <div class="rcm-muted"><?php echo esc_html($rcm_lead['email']); ?></div>
                            <div class="rcm-muted rcm-mono"><?php echo esc_html($rcm_lead['id']); ?></div>
                        </td>
                        <td><?php echo esc_html($rcm_lead['company']); ?></td>
                        <td><?php echo esc_html(Leads::source_label($rcm_lead['source'])); ?></td>
                        <td><span class="rcm-pill rcm-status-<?php echo esc_attr($rcm_lead['status']); ?>"><?php echo esc_html(Leads::status_label($rcm_lead['status'])); ?></span></td>
                        <td>
                            <span class="rcm-band rcm-band-<?php echo esc_attr(strtolower($rcm_lead['band'])); ?>"><?php echo esc_html($rcm_lead['band']); ?></span>
                            <span class="rcm-score"><?php echo esc_html((string) $rcm_lead['score']); ?></span>
                        </td>
                        <td><?php echo $rcm_lead['assigned_to'] ? esc_html(Leads::user_name($rcm_lead['assigned_to'])) : '<span class="rcm-muted">' . esc_html__('Unassigned', 'rcm') . '</span>'; ?></td>
                        <td>
                            <?php if ($rcm_lead['follow_up_at']) : ?>
                                <span class="<?php echo $rcm_due ? 'rcm-due' : ''; ?>"><?php echo esc_html(mysql2date(get_option('date_format'), $rcm_lead['follow_up_at'])); ?></span>
                            <?php endif; ?>
                        </td>
                        <td><?php echo esc_html(Leads::fmt_date($rcm_lead['created_at'])); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <div class="tablenav bottom">
            <div class="tablenav-pages">
                <?php if ($rcm_pagination) : ?>
                    <span class="pagination-links"><?php echo wp_kses_post($rcm_pagination); ?></span>
                <?php endif; ?>
            </div>
            <br class="clear">
        </div>
    </form>
</div>
