<?php
/** @var array $args post (WP_Post) */
defined('ABSPATH') || exit;
$p = $args['post'] ?? null;
if (!$p instanceof WP_Post) {
    return;
}
$cats = get_the_category($p->ID);
$cat = $cats[0] ?? null;
?>
<article class="card group flex h-full flex-col overflow-hidden transition hover:-translate-y-0.5 hover:shadow-lift">
    <a href="<?php echo esc_url(get_permalink($p)); ?>" tabindex="-1" aria-hidden="true">
        <?php if (has_post_thumbnail($p)) : ?>
            <?php echo get_the_post_thumbnail($p, 'rcm-card', ['class' => 'aspect-[16/9] w-full object-cover', 'loading' => 'lazy', 'alt' => '']); ?>
        <?php else : ?>
            <div class="relative flex aspect-[16/9] items-end overflow-hidden bg-navy-900 p-5">
                <div class="bg-grid-dark absolute inset-0"></div>
                <div class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-teal-500/30 blur-2xl"></div>
                <p class="relative line-clamp-3 font-display text-lg font-bold leading-snug text-white"><?php echo esc_html(get_the_title($p)); ?></p>
            </div>
        <?php endif; ?>
    </a>
    <div class="flex flex-1 flex-col p-5">
        <?php if ($cat) : ?><a href="<?php echo esc_url(get_category_link($cat)); ?>" class="text-xs font-semibold uppercase tracking-[0.12em] text-teal-700 hover:underline"><?php echo esc_html($cat->name); ?></a><?php endif; ?>
        <h3 class="mt-2 text-lg font-semibold leading-snug"><a href="<?php echo esc_url(get_permalink($p)); ?>" class="hover:text-teal-700"><?php echo esc_html(get_the_title($p)); ?></a></h3>
        <p class="mt-2 line-clamp-3 text-[15px] text-ink-muted"><?php echo esc_html(get_the_excerpt($p)); ?></p>
        <p class="mt-auto flex items-center gap-2 pt-4 text-xs text-ink-subtle">
            <time datetime="<?php echo esc_attr(get_the_date('c', $p)); ?>"><?php echo esc_html(get_the_date('', $p)); ?></time>
            <span aria-hidden="true">&middot;</span>
            <?php rcm_t_icon('Clock', 'h-3.5 w-3.5'); ?> <?php printf(esc_html__('%d min read', 'rcm-theme'), rcm_t_reading_minutes($p->ID)); ?>
        </p>
    </div>
</article>
