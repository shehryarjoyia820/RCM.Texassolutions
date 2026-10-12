<?php
/**
 * Accessible accordion that works without JavaScript.
 *
 * @var array $args faqs: [{q, a}], class
 */
defined('ABSPATH') || exit;
$faqs = (array) ($args['faqs'] ?? []);
?>
<div class="divide-y divide-line rounded-2xl border border-line bg-white <?php echo esc_attr($args['class'] ?? ''); ?>">
    <?php foreach ($faqs as $f) : ?>
        <details class="group px-5 py-4 sm:px-6 [&_summary::-webkit-details-marker]:hidden">
            <summary class="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy-900">
                <h3 class="text-base font-semibold sm:text-[17px]"><?php echo esc_html($f['q'] ?? ''); ?></h3>
                <span class="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line text-teal-700 transition group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <div class="mt-3 leading-relaxed text-ink-muted"><?php echo wp_kses_post(wpautop((string) ($f['a'] ?? ''))); ?></div>
        </details>
    <?php endforeach; ?>
</div>
