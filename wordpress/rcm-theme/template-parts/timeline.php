<?php
/** @var array $args steps: [{title, detail}] */
defined('ABSPATH') || exit;
?>
<ol class="relative space-y-6 border-l-2 border-teal-100 pl-8">
    <?php foreach ((array) ($args['steps'] ?? []) as $i => $s) : ?>
        <li class="relative">
            <span class="absolute -left-[45px] flex h-8 w-8 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white ring-4 ring-white"><?php echo (int) $i + 1; ?></span>
            <h3 class="text-lg font-semibold"><?php echo esc_html($s['title'] ?? ''); ?></h3>
            <p class="mt-1 text-[15.5px] leading-relaxed text-ink-muted"><?php echo esc_html($s['detail'] ?? ''); ?></p>
        </li>
    <?php endforeach; ?>
</ol>
