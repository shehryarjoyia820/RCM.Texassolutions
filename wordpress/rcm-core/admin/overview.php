<?php
/**
 * RCM > Overview.
 *
 * @var array $stats   From Leads::stats(): last_30, new_this_week, follow_ups_due, unassigned_new, conversion_90.
 * @var array $recent  Recent leads.
 * @var array $due     Follow-ups due.
 * @var array $handoffs Open chat flags.
 * @var array $counts  Published content counts.
 * @var bool  $chat_on Whether the AI assistant is live.
 */
defined('ABSPATH') || exit;

$lead_url = static fn(string $id): string => admin_url('admin.php?page=rcm-leads&lead=' . rawurlencode($id));
$num = static fn($v): string => esc_html(number_format_i18n((float) $v));
$l30 = (array) ($stats['last_30'] ?? []);
$conv = (array) ($stats['conversion_90'] ?? []);
$cards = [
    [__('New leads this week', 'rcm'), $stats['new_this_week'] ?? 0, admin_url('admin.php?page=rcm-leads')],
    [__('Leads (30 days)', 'rcm'), $l30['total'] ?? 0, admin_url('admin.php?page=rcm-leads')],
    [__('Hot leads (30 days)', 'rcm'), $l30['hot'] ?? 0, admin_url('admin.php?page=rcm-leads&band=hot')],
    [__('Consultation requests (30 days)', 'rcm'), $l30['by_source']['consultation'] ?? 0, admin_url('admin.php?page=rcm-leads&source=consultation')],
    [__('Follow-ups due', 'rcm'), $stats['follow_ups_due'] ?? 0, admin_url('admin.php?page=rcm-leads')],
    [__('Won rate (90 days)', 'rcm'), isset($conv['rate']) ? round((float) $conv['rate'], 1) . '%' : '-', admin_url('admin.php?page=rcm-leads&status=won')],
];
?>
<div class="wrap rcm-wrap">
    <h1><?php esc_html_e('Texas Solutions RCM', 'rcm'); ?></h1>
    <p class="description"><?php esc_html_e('Leads, AI chats, content and site health at a glance.', 'rcm'); ?></p>

    <div class="rcm-cards">
        <?php foreach ($cards as [$label, $value, $url]) : ?>
            <a class="rcm-card" href="<?php echo esc_url($url); ?>">
                <span class="rcm-card-label"><?php echo esc_html($label); ?></span>
                <span class="rcm-card-value"><?php echo is_numeric($value) ? $num($value) : esc_html((string) $value); ?></span>
            </a>
        <?php endforeach; ?>
    </div>

    <div class="rcm-grid-2">
        <div class="rcm-panel">
            <h2><?php esc_html_e('Recent leads', 'rcm'); ?></h2>
            <?php if (!$recent) : ?>
                <p><?php esc_html_e('No leads yet. Form submissions and AI chat sign-ups appear here.', 'rcm'); ?></p>
            <?php else : ?>
                <table class="widefat striped">
                    <thead><tr><th><?php esc_html_e('Lead', 'rcm'); ?></th><th><?php esc_html_e('Source', 'rcm'); ?></th><th><?php esc_html_e('Status', 'rcm'); ?></th><th><?php esc_html_e('Score', 'rcm'); ?></th><th><?php esc_html_e('Received', 'rcm'); ?></th></tr></thead>
                    <tbody>
                    <?php foreach ($recent as $r) : ?>
                        <tr>
                            <td><a href="<?php echo esc_url($lead_url($r['id'])); ?>"><strong><?php echo esc_html($r['name']); ?></strong></a><?php echo $r['company'] ? '<br><span class="description">' . esc_html($r['company']) . '</span>' : ''; ?></td>
                            <td><?php echo esc_html($r['source']); ?></td>
                            <td><span class="rcm-pill rcm-pill-<?php echo esc_attr($r['status']); ?>"><?php echo esc_html(str_replace('_', ' ', $r['status'])); ?></span></td>
                            <td><?php echo esc_html((string) $r['score']); ?></td>
                            <td><?php echo esc_html(mysql2date(get_option('date_format') . ' ' . get_option('time_format'), get_date_from_gmt($r['created_at']))); ?></td>
                        </tr>
                    <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>

        <div class="rcm-panel">
            <h2><?php esc_html_e('Follow-ups due', 'rcm'); ?></h2>
            <?php if (!$due) : ?>
                <p><?php esc_html_e('Nothing due today.', 'rcm'); ?></p>
            <?php else : ?>
                <ul class="rcm-list">
                    <?php foreach ($due as $d) : ?>
                        <li><a href="<?php echo esc_url($lead_url($d['id'])); ?>"><?php echo esc_html($d['name'] . ($d['company'] ? ', ' . $d['company'] : '')); ?></a> <span class="description"><?php echo esc_html(mysql2date(get_option('date_format'), $d['follow_up_at'])); ?></span></li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <h2><?php esc_html_e('AI assistant', 'rcm'); ?></h2>
            <p>
                <?php if ($chat_on) : ?>
                    <span class="rcm-dot rcm-dot-on"></span> <?php esc_html_e('Live on the website.', 'rcm'); ?>
                <?php else : ?>
                    <span class="rcm-dot"></span> <?php printf(wp_kses_post(__('Off. Add a Gemini API key and enable it in <a href="%s">Settings</a>.', 'rcm')), esc_url(admin_url('admin.php?page=rcm-settings#chat'))); ?>
                <?php endif; ?>
            </p>
            <?php if ($handoffs) : ?>
                <h3><?php esc_html_e('Needs attention', 'rcm'); ?></h3>
                <ul class="rcm-list">
                    <?php foreach ($handoffs as $h) : ?>
                        <li>
                            <span class="rcm-pill"><?php echo esc_html($h['kind']); ?></span>
                            <?php if ($h['session_id']) : ?>
                                <a href="<?php echo esc_url(admin_url('admin.php?page=rcm-chats&session=' . rawurlencode($h['session_id']))); ?>"><?php echo esc_html(wp_trim_words($h['detail'], 14)); ?></a>
                            <?php else : ?>
                                <?php echo esc_html(wp_trim_words($h['detail'], 14)); ?>
                            <?php endif; ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
                <p><a href="<?php echo esc_url(admin_url('admin.php?page=rcm-kb')); ?>"><?php esc_html_e('Review in the Knowledge Base', 'rcm'); ?></a></p>
            <?php endif; ?>
        </div>
    </div>

    <div class="rcm-panel">
        <h2><?php esc_html_e('Website content', 'rcm'); ?></h2>
        <ul class="rcm-inline">
            <li><a href="<?php echo esc_url(admin_url('edit.php?post_type=rcm_service')); ?>"><?php echo $num($counts['services']); ?> <?php esc_html_e('services', 'rcm'); ?></a></li>
            <li><a href="<?php echo esc_url(admin_url('edit.php?post_type=rcm_specialty')); ?>"><?php echo $num($counts['specialties']); ?> <?php esc_html_e('specialties', 'rcm'); ?></a></li>
            <li><a href="<?php echo esc_url(admin_url('edit.php?post_type=rcm_tool')); ?>"><?php echo $num($counts['tools']); ?> <?php esc_html_e('tools', 'rcm'); ?></a></li>
            <li><a href="<?php echo esc_url(admin_url('edit.php')); ?>"><?php echo $num($counts['posts']); ?> <?php esc_html_e('blog posts', 'rcm'); ?></a></li>
            <li><a href="<?php echo esc_url(admin_url('post-new.php')); ?>"><?php esc_html_e('Write a new article', 'rcm'); ?></a></li>
            <li><a href="<?php echo esc_url(home_url('/')); ?>" target="_blank" rel="noopener"><?php esc_html_e('View website', 'rcm'); ?></a></li>
        </ul>
    </div>
</div>
