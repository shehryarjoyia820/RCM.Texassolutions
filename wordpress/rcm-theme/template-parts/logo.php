<?php
/**
 * Logo: shield mark + wordmark.
 *
 * @var array $args ['dark' => bool]
 */
defined('ABSPATH') || exit;
$dark = !empty($args['dark']);
?>
<span class="flex items-center gap-2.5">
    <svg viewBox="0 0 40 40" class="h-9 w-9 shrink-0" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="11" fill="#0f1f3f"/><path d="M20 7.5 30 11v8.2c0 6.3-4.2 11.2-10 13.3-5.8-2.1-10-7-10-13.3V11l10-3.5Z" fill="#162a52" stroke="#27b8af" stroke-width="1.6"/><path d="M12.5 21h4l2-4.5 3 8.5 2.2-4h3.8" fill="none" stroke="#57d3c9" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span class="leading-none">
        <span class="block font-display text-[15px] font-bold tracking-tight <?php echo $dark ? 'text-white' : 'text-navy-900'; ?>">Texas Solutions</span>
        <span class="mt-1 block text-[10.5px] font-semibold uppercase tracking-[0.22em] <?php echo $dark ? 'text-teal-300' : 'text-teal-700'; ?>">Revenue Cycle</span>
    </span>
</span>
