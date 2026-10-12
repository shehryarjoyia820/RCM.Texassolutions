<?php
/**
 * Dark page header used by every inner page.
 *
 * @var array $args title, intro (plain text or safe HTML), eyebrow, icon, actions (HTML), meta (HTML)
 */
defined('ABSPATH') || exit;
$a = wp_parse_args($args, ['title' => '', 'intro' => '', 'eyebrow' => '', 'icon' => '', 'actions' => '', 'meta' => '']);
?>
<header class="relative overflow-hidden bg-navy-950 text-white">
    <div class="bg-grid-dark absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" aria-hidden="true"></div>
    <div class="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" aria-hidden="true"></div>
    <div class="container relative pb-14 pt-8 sm:pb-16 sm:pt-10">
        <?php rcm_t_breadcrumbs(); ?>
        <div class="mt-8 flex items-start gap-5">
            <?php if ($a['icon']) : ?>
                <span class="hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500/15 text-teal-300 ring-1 ring-teal-400/30 sm:flex"><?php rcm_t_icon($a['icon'], 'h-7 w-7'); ?></span>
            <?php endif; ?>
            <div class="max-w-3xl">
                <?php if ($a['eyebrow']) : ?><p class="eyebrow mb-3 text-teal-300"><?php echo esc_html($a['eyebrow']); ?></p><?php endif; ?>
                <h1 class="text-4xl font-bold text-white sm:text-5xl"><?php echo esc_html($a['title']); ?></h1>
                <?php if ($a['intro']) : ?><div class="mt-5 text-lg leading-relaxed text-navy-200"><?php echo wp_kses_post(wpautop($a['intro'])); ?></div><?php endif; ?>
                <?php if ($a['meta']) : ?><div class="mt-4 text-sm text-navy-200"><?php echo wp_kses_post($a['meta']); ?></div><?php endif; ?>
                <?php if ($a['actions']) : ?><div class="mt-8 flex flex-wrap gap-3"><?php echo wp_kses_post($a['actions']); ?></div><?php endif; ?>
            </div>
        </div>
    </div>
</header>
