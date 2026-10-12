<?php
/** @var array $args items (strings), cols (1|2) */
defined('ABSPATH') || exit;
$cols = (int) ($args['cols'] ?? 2);
?>
<ul class="grid gap-3 <?php echo $cols === 2 ? 'sm:grid-cols-2' : ''; ?>">
    <?php foreach ((array) ($args['items'] ?? []) as $s) : ?>
        <li class="flex gap-3 rounded-xl border border-line bg-white p-3.5 text-[15px] text-navy-800">
            <span class="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white"><?php rcm_t_icon('Check', 'h-3 w-3'); ?></span>
            <span><?php echo esc_html($s); ?></span>
        </li>
    <?php endforeach; ?>
</ul>
