<?php
/**
 * @var array $args url, title, text, icon, meta, cta
 */
defined('ABSPATH') || exit;
$a = wp_parse_args($args, ['url' => '#', 'title' => '', 'text' => '', 'icon' => '', 'meta' => '', 'cta' => '']);
?>
<a href="<?php echo esc_url($a['url']); ?>" class="card group flex h-full flex-col p-5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lift">
    <span class="flex items-start gap-3.5">
        <?php if ($a['icon']) : ?>
            <span class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 transition group-hover:bg-teal-600 group-hover:text-white"><?php rcm_t_icon($a['icon'], 'h-5 w-5'); ?></span>
        <?php endif; ?>
        <span class="min-w-0">
            <span class="block text-[17px] font-semibold leading-snug text-navy-900 group-hover:text-teal-700"><?php echo esc_html($a['title']); ?></span>
            <?php if ($a['meta']) : ?><span class="mt-0.5 block text-xs font-medium uppercase tracking-wide text-ink-subtle"><?php echo esc_html($a['meta']); ?></span><?php endif; ?>
        </span>
    </span>
    <?php if ($a['text']) : ?><span class="mt-3 block text-[15px] leading-relaxed text-ink-muted"><?php echo esc_html($a['text']); ?></span><?php endif; ?>
    <span class="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-teal-700"><?php echo esc_html($a['cta'] ?: __('Learn more', 'rcm-theme')); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4 transition group-hover:translate-x-0.5'); ?></span>
</a>
