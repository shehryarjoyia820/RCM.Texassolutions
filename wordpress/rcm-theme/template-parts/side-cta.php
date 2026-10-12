<?php
/** @var array $args service (key, optional) */
defined('ABSPATH') || exit;
$url = rcm_t_url('consultation');
if (!empty($args['service'])) {
    $url = add_query_arg('service', $args['service'], $url);
}
?>
<div class="rounded-2xl bg-navy-900 p-6 text-white">
    <?php rcm_t_icon('CalendarCheck2', 'h-7 w-7 text-teal-300'); ?>
    <h2 class="mt-3 text-xl font-bold text-white"><?php esc_html_e('Free consultation', 'rcm-theme'); ?></h2>
    <p class="mt-2 text-[15px] text-navy-200"><?php esc_html_e('Tell us how billing works in your dental office today. We will reply by email to set up a call.', 'rcm-theme'); ?></p>
    <a href="<?php echo esc_url($url); ?>" class="btn-primary mt-5 w-full" data-rcm-cta="sidebar-consultation"><?php esc_html_e('Book a consultation', 'rcm-theme'); ?></a>
    <a href="<?php echo esc_url(rcm_t_url('contact')); ?>" class="mt-3 block text-center text-sm font-medium text-navy-200 hover:text-white"><?php esc_html_e('Or send us a question', 'rcm-theme'); ?></a>
</div>
