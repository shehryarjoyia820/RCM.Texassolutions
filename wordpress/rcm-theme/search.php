<?php
/**
 * Site search across articles, services, specialties, tools and pages, grouped by type.
 */
defined('ABSPATH') || exit;
get_header();
$q = get_search_query();
$labels = [
    'rcm_tool' => __('Tools and calculators', 'rcm-theme'),
    'rcm_service' => __('Services', 'rcm-theme'),
    'rcm_specialty' => __('Specialties', 'rcm-theme'),
    'post' => __('Articles', 'rcm-theme'),
    'page' => __('Pages', 'rcm-theme'),
];
$groups = array_fill_keys(array_keys($labels), []);
while (have_posts()) {
    the_post();
    $groups[get_post_type()][] = get_post();
}
$total = (int) $GLOBALS['wp_query']->found_posts;

rcm_t_part('page-hero', [
    'eyebrow' => __('Search', 'rcm-theme'),
    'title' => $q ? sprintf(__('Results for "%s"', 'rcm-theme'), $q) : __('Search the site', 'rcm-theme'),
    'intro' => $q ? sprintf(_n('%d result', '%d results', $total, 'rcm-theme'), $total) : '',
]);
?>
<section class="py-12 sm:py-16">
    <div class="container max-w-4xl">
        <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="relative mb-10">
            <label for="site-s" class="sr-only"><?php esc_html_e('Search', 'rcm-theme'); ?></label>
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle"><?php rcm_t_icon('Search', 'h-5 w-5'); ?></span>
            <input id="site-s" type="search" name="s" value="<?php echo esc_attr($q); ?>" class="field rounded-full py-3.5 pl-12 text-base" placeholder="<?php esc_attr_e('Search services, tools, articles…', 'rcm-theme'); ?>">
        </form>
        <?php if (!$total) : ?>
            <div class="rounded-2xl border border-dashed border-line p-10 text-center">
                <p class="text-ink-muted"><?php echo rcm_t_non_dental_query($q) ? esc_html__('Texas Solutions RCM works with dental practices only, so we have no pages on that topic. Try a dental billing term, or browse:', 'rcm-theme') : esc_html__('Nothing matched. Try a broader term, or browse:', 'rcm-theme'); ?></p>
                <p class="mt-4 flex flex-wrap justify-center gap-2">
                    <a class="chip" href="<?php echo esc_url(rcm_t_archive('rcm_service')); ?>"><?php esc_html_e('Services', 'rcm-theme'); ?></a>
                    <a class="chip" href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>"><?php esc_html_e('Tools', 'rcm-theme'); ?></a>
                    <a class="chip" href="<?php echo esc_url(rcm_t_archive('rcm_specialty')); ?>"><?php esc_html_e('Specialties', 'rcm-theme'); ?></a>
                    <a class="chip" href="<?php echo esc_url(rcm_t_url('faq')); ?>"><?php esc_html_e('FAQs', 'rcm-theme'); ?></a>
                </p>
            </div>
        <?php endif; ?>
        <div class="space-y-10">
            <?php foreach ($groups as $type => $items) : if (!$items) { continue; } ?>
                <section>
                    <h2 class="mb-4 text-xl font-bold"><?php echo esc_html($labels[$type]); ?> <span class="text-base font-normal text-ink-subtle">(<?php echo count($items); ?>)</span></h2>
                    <ul class="divide-y divide-line rounded-2xl border border-line bg-white">
                        <?php foreach ($items as $p) : ?>
                            <li>
                                <a href="<?php echo esc_url(get_permalink($p)); ?>" class="block px-5 py-4 hover:bg-canvas">
                                    <span class="block font-semibold text-navy-900"><?php echo esc_html(get_the_title($p)); ?></span>
                                    <span class="mt-1 block text-sm text-ink-muted"><?php echo esc_html(wp_trim_words(get_the_excerpt($p), 26)); ?></span>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </section>
            <?php endforeach; ?>
        </div>
        <div class="mt-10"><?php the_posts_pagination(['mid_size' => 1]); ?></div>
    </div>
</section>
<?php get_footer(); ?>
