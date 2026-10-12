<?php
/** @var array $args question, answer */
defined('ABSPATH') || exit;
if (empty($args['answer'])) {
    return;
}
?>
<div class="rounded-2xl border border-teal-200 bg-teal-50/70 p-5 sm:p-6">
    <p class="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700"><?php esc_html_e('Quick answer', 'rcm-theme'); ?></p>
    <h2 class="mt-1.5 text-lg font-semibold sm:text-xl"><?php echo esc_html($args['question']); ?></h2>
    <p class="mt-2 text-[16.5px] leading-relaxed text-navy-800"><?php echo esc_html($args['answer']); ?></p>
</div>
