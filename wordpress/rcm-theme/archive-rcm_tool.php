<?php
/**
 * /tools/ directory: one searchable grid (RCM\Tools::directory()).
 */
defined('ABSPATH') || exit;
get_header();
$count = count(rcm_t_all('rcm_tool'));
rcm_t_part('page-hero', [
    'eyebrow' => __('Free tools', 'rcm-theme'),
    'title' => __('Free Dental RCM Calculators & Checklists', 'rcm-theme'),
    'intro' => sprintf(__('%d free tools for dental practice owners, office managers and billing teams. No account needed; your numbers stay in your browser. Every calculator shows its formula, a worked example and its assumptions.', 'rcm-theme'), $count),
]);
?>
<section class="py-12 sm:py-16">
    <div class="container">
        <?php
        if (class_exists('RCM\\Tools')) {
            echo RCM\Tools::directory(); // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the plugin.
        }
        ?>
    </div>
</section>
<?php rcm_t_cta_band(['title' => __('Want help reading your numbers?', 'rcm-theme'), 'text' => __('Book a free consultation and we will walk through your dental revenue cycle numbers with you.', 'rcm-theme'), 'secondary' => false]); ?>
<?php get_footer(); ?>
