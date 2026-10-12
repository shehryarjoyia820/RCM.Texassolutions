<?php
/**
 * Blog article (and fallback for other single posts).
 */
defined('ABSPATH') || exit;
get_header();
the_post();
$p = get_post();
$id = $p->ID;
$cats = get_the_category();
$faqs = rcm_t_json_meta($id, '_rcm_faqs');
$sources = rcm_t_json_meta($id, '_rcm_sources');
$reviewer = (string) get_post_meta($id, '_rcm_reviewer', true);
$cta = (string) get_post_meta($id, '_rcm_cta', true) ?: 'consultation';
$related = get_posts(['numberposts' => 3, 'post__not_in' => [$id], 'category__in' => wp_list_pluck($cats, 'term_id') ?: [0], 'post_status' => 'publish']);
if (count($related) < 3) {
    $related = array_merge($related, get_posts(['numberposts' => 3 - count($related), 'post__not_in' => array_merge([$id], wp_list_pluck($related, 'ID')), 'post_status' => 'publish']));
}
$updated = get_the_modified_date('U') > get_the_date('U') + DAY_IN_SECONDS;
$meta = sprintf(
    '%s <time datetime="%s">%s</time>%s · %s',
    esc_html__('Published', 'rcm-theme'),
    esc_attr(get_the_date('c')),
    esc_html(get_the_date()),
    $updated ? ' · ' . esc_html__('Updated', 'rcm-theme') . ' <time datetime="' . esc_attr(get_the_modified_date('c')) . '">' . esc_html(get_the_modified_date()) . '</time>' : '',
    sprintf(esc_html__('%d min read', 'rcm-theme'), rcm_t_reading_minutes($id))
);
$meta .= '<br>' . esc_html__('By the Texas Solutions RCM team', 'rcm-theme') . ($reviewer ? ' · ' . esc_html(sprintf(__('Reviewed by %s', 'rcm-theme'), $reviewer)) : '');

rcm_t_part('page-hero', [
    'eyebrow' => $cats ? $cats[0]->name : __('Insights', 'rcm-theme'),
    'title' => get_the_title(),
    'intro' => has_excerpt() ? get_the_excerpt() : '',
    'meta' => $meta,
]);
?>
<div class="py-12 sm:py-16">
    <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article data-rcm-article class="min-w-0">
            <?php if (has_post_thumbnail()) : ?>
                <figure class="mb-10 overflow-hidden rounded-2xl"><?php the_post_thumbnail('rcm-hero', ['class' => 'h-auto w-full', 'fetchpriority' => 'high']); ?>
                    <?php if ($cap = get_the_post_thumbnail_caption()) : ?><figcaption class="mt-2 text-sm text-ink-subtle"><?php echo esc_html($cap); ?></figcaption><?php endif; ?>
                </figure>
            <?php endif; ?>
            <div class="prose-rcm">
                <?php the_content(); ?>
            </div>

            <?php if ($faqs) : ?>
                <section class="mt-14" aria-labelledby="faq-h">
                    <h2 id="faq-h" class="mb-6 text-2xl font-bold"><?php esc_html_e('Frequently asked questions', 'rcm-theme'); ?></h2>
                    <?php rcm_t_faqs($faqs); ?>
                </section>
            <?php endif; ?>

            <?php if ($sources) : ?>
                <section class="mt-12" aria-labelledby="src-h">
                    <h2 id="src-h" class="text-xl font-bold"><?php esc_html_e('Sources', 'rcm-theme'); ?></h2>
                    <ol class="mt-3 list-decimal space-y-1.5 pl-5 text-[15px] text-ink-muted">
                        <?php foreach ($sources as $s) : ?>
                            <li><a href="<?php echo esc_url($s['url'] ?? ''); ?>" class="text-teal-700 underline" target="_blank" rel="noopener"><?php echo esc_html($s['label'] ?? ($s['url'] ?? '')); ?></a></li>
                        <?php endforeach; ?>
                    </ol>
                </section>
            <?php endif; ?>

            <?php $tags = get_the_tags(); if ($tags) : ?>
                <ul class="mt-10 flex flex-wrap gap-2" aria-label="<?php esc_attr_e('Tags', 'rcm-theme'); ?>">
                    <?php foreach ($tags as $t) : ?><li><a class="chip hover:border-teal-300" href="<?php echo esc_url(get_tag_link($t)); ?>">#<?php echo esc_html($t->name); ?></a></li><?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <p class="mt-10 border-t border-line pt-6 text-sm text-ink-subtle"><?php esc_html_e('This article is general information about US medical and dental billing. It is not legal, coding or financial advice. Payer rules change; confirm with the payer or your compliance advisor.', 'rcm-theme'); ?></p>
        </article>

        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <?php if ($cta !== 'none') : ?>
                <?php if ($cta === 'tools') : ?>
                    <div class="rounded-2xl bg-navy-900 p-6 text-white">
                        <?php rcm_t_icon('Calculator', 'h-7 w-7 text-teal-300'); ?>
                        <h2 class="mt-3 text-xl font-bold text-white"><?php esc_html_e('Check your numbers', 'rcm-theme'); ?></h2>
                        <p class="mt-2 text-[15px] text-navy-200"><?php esc_html_e('Free calculators for collection rate, days in AR, denials and billing cost.', 'rcm-theme'); ?></p>
                        <a href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>" class="btn-primary mt-5 w-full" data-rcm-cta="blog-tools"><?php esc_html_e('Open RCM tools', 'rcm-theme'); ?></a>
                    </div>
                <?php else : rcm_t_part('side-cta'); endif; ?>
            <?php endif; ?>
            <?php rcm_t_part('related-tools', ['keys' => ['net-collection-rate-calculator', 'days-in-ar-calculator', 'denial-rate-calculator', 'rcm-roi-calculator']]); ?>
        </aside>
    </div>
</div>

<?php if ($related) : ?>
<section class="bg-canvas py-14 sm:py-16">
    <div class="container">
        <h2 class="mb-8 text-2xl font-bold sm:text-3xl"><?php esc_html_e('Keep reading', 'rcm-theme'); ?></h2>
        <div class="grid gap-6 md:grid-cols-3"><?php foreach ($related as $r) : rcm_t_part('post-card', ['post' => $r]); endforeach; ?></div>
    </div>
</section>
<?php endif; ?>
<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
