<?php
/**
 * RCM > Content & System.
 *
 * @var array  $report   Last import report.
 * @var string $imported Last import time.
 * @var array  $cron     Next run per cron hook.
 * @var array  $tables   Row counts per table (null = missing).
 * @var array  $bundle   Items in the bundled content.
 * @var string $php
 * @var string $wp
 * @var bool   $smtp     WP Mail SMTP active.
 */
defined('ABSPATH') || exit;

$types = [
    'services' => __('Services', 'rcm'),
    'specialties' => __('Specialties', 'rcm'),
    'tools' => __('Tools and calculators', 'rcm'),
    'faqs' => __('FAQs', 'rcm'),
    'pages' => __('Company and legal pages', 'rcm'),
    'blog' => __('Blog categories and starter articles', 'rcm'),
    'settings' => __('Site title, tagline and permalinks (only if still WordPress defaults)', 'rcm'),
];
?>
<div class="wrap rcm-wrap">
    <h1><?php esc_html_e('Content & System', 'rcm'); ?></h1>

    <div class="rcm-panel">
        <h2><?php esc_html_e('Content sync', 'rcm'); ?></h2>
        <p><?php esc_html_e('Imports the content bundled with this plugin version. Items you have edited in WordPress are kept unless you tick "overwrite".', 'rcm'); ?></p>
        <p class="description">
            <?php
            printf(
                esc_html__('Bundle: %1$d services, %2$d specialties, %3$d tools, %4$d pages, %5$d articles. Last sync: %6$s.', 'rcm'),
                (int) $bundle['services'],
                (int) $bundle['specialties'],
                (int) $bundle['tools'],
                (int) $bundle['pages'],
                (int) $bundle['blog'],
                $imported ? esc_html(mysql2date(get_option('date_format') . ' ' . get_option('time_format'), $imported)) : esc_html__('never', 'rcm')
            );
            ?>
        </p>
        <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
            <input type="hidden" name="action" value="rcm_import">
            <?php wp_nonce_field('rcm_import'); ?>
            <fieldset>
                <?php foreach ($types as $k => $label) : ?>
                    <label style="display:block;margin:4px 0"><input type="checkbox" name="types[]" value="<?php echo esc_attr($k); ?>" checked> <?php echo esc_html($label); ?></label>
                <?php endforeach; ?>
                <label style="display:block;margin:12px 0 4px"><input type="checkbox" name="force" value="1"> <strong><?php esc_html_e('Overwrite items edited in WordPress', 'rcm'); ?></strong></label>
            </fieldset>
            <?php submit_button(__('Run content sync', 'rcm'), 'primary', 'submit', false, ['data-rcm-confirm' => esc_attr__('Run the content sync now?', 'rcm')]); ?>
        </form>
        <?php if ($report) : ?>
            <h3><?php esc_html_e('Last report', 'rcm'); ?></h3>
            <table class="widefat striped" style="max-width:640px">
                <thead><tr><th><?php esc_html_e('Type', 'rcm'); ?></th><th><?php esc_html_e('Created', 'rcm'); ?></th><th><?php esc_html_e('Updated', 'rcm'); ?></th><th><?php esc_html_e('Kept', 'rcm'); ?></th></tr></thead>
                <tbody>
                <?php foreach ($report as $type => $r) : ?>
                    <tr><td><?php echo esc_html($types[$type] ?? $type); ?></td><td><?php echo (int) ($r['created'] ?? 0); ?></td><td><?php echo (int) ($r['updated'] ?? 0); ?></td><td><?php echo (int) ($r['skipped'] ?? 0); ?></td></tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        <?php endif; ?>
    </div>

    <div class="rcm-grid-2">
        <div class="rcm-panel">
            <h2><?php esc_html_e('Checks', 'rcm'); ?></h2>
            <table class="widefat striped">
                <tbody>
                    <tr><td><?php esc_html_e('PHP', 'rcm'); ?></td><td><?php echo esc_html($php); ?></td></tr>
                    <tr><td><?php esc_html_e('WordPress', 'rcm'); ?></td><td><?php echo esc_html($wp); ?></td></tr>
                    <tr><td><?php esc_html_e('Plugin version', 'rcm'); ?></td><td><?php echo esc_html(RCM_VERSION); ?></td></tr>
                    <tr><td><?php esc_html_e('Email (WP Mail SMTP)', 'rcm'); ?></td><td><?php echo $smtp ? esc_html__('Active', 'rcm') : '<strong>' . esc_html__('Not active: emails may not be delivered', 'rcm') . '</strong>'; ?></td></tr>
                    <?php foreach ($cron as $hook => $next) : ?>
                        <tr><td><?php echo esc_html($hook); ?></td><td><?php echo esc_html($next); ?></td></tr>
                    <?php endforeach; ?>
                    <tr><td><?php esc_html_e('Search engines', 'rcm'); ?></td><td><?php echo get_option('blog_public') ? esc_html__('Allowed to index', 'rcm') : '<strong>' . esc_html__('Discouraged (Settings > Reading)', 'rcm') . '</strong>'; ?></td></tr>
                </tbody>
            </table>
            <p>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline">
                    <input type="hidden" name="action" value="rcm_test_email"><?php wp_nonce_field('rcm_test_email'); ?>
                    <button class="button"><?php esc_html_e('Send test email', 'rcm'); ?></button>
                </form>
                <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="display:inline">
                    <input type="hidden" name="action" value="rcm_test_ai"><?php wp_nonce_field('rcm_test_ai'); ?>
                    <button class="button"><?php esc_html_e('Test AI connection', 'rcm'); ?></button>
                </form>
            </p>
        </div>
        <div class="rcm-panel">
            <h2><?php esc_html_e('Database tables', 'rcm'); ?></h2>
            <table class="widefat striped">
                <tbody>
                <?php foreach ($tables as $t => $count) : ?>
                    <tr><td><code><?php echo esc_html(rcm_table($t)); ?></code></td><td><?php echo $count === null ? '<strong>' . esc_html__('missing', 'rcm') . '</strong>' : esc_html(number_format_i18n($count)); ?></td></tr>
                <?php endforeach; ?>
                </tbody>
            </table>
            <p class="description"><?php esc_html_e('Backups: the host keeps regular backups of the database and files. Before major changes, also export the database (DreamHost panel > MySQL > phpMyAdmin > Export). See docs/OPERATIONS.md in the project repository.', 'rcm'); ?></p>
        </div>
    </div>
</div>
