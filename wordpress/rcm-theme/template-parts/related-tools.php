<?php
/** @var array $args keys (tool keys), title */
defined('ABSPATH') || exit;
$tools = rcm_t_by_keys('rcm_tool', (array) ($args['keys'] ?? []));
if (!$tools) {
    return;
}
?>
<div class="card p-5">
    <h2 class="text-base font-semibold"><?php echo esc_html($args['title'] ?? __('Related free tools', 'rcm-theme')); ?></h2>
    <ul class="mt-3 space-y-1">
        <?php foreach ($tools as $t) : $i = rcm_t_item($t); ?>
            <li>
                <a href="<?php echo esc_url($i['url']); ?>" class="group flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] text-navy-800 hover:bg-teal-50">
                    <?php rcm_t_icon($i['icon'], 'h-4 w-4 shrink-0 text-teal-600'); ?>
                    <span class="flex-1"><?php echo esc_html($i['title']); ?></span>
                    <?php rcm_t_icon('ArrowRight', 'h-4 w-4 text-ink-subtle transition group-hover:translate-x-0.5 group-hover:text-teal-700'); ?>
                </a>
            </li>
        <?php endforeach; ?>
    </ul>
</div>
