<?php
/**
 * Template Name: Comparison (long-form + calculator links)
 */
defined('ABSPATH') || exit;
get_header();
while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', [
        'eyebrow' => __('Guide', 'rcm-theme'),
        'title' => get_the_title(),
        'intro' => rcm_t_page_intro(get_the_ID()),
        'actions' => '<a href="' . esc_url(home_url('/tools/outsourcing-vs-in-house-billing-calculator/')) . '" class="btn-primary">' . esc_html__('Compare your costs', 'rcm-theme') . '</a>',
    ]);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <article class="prose-rcm min-w-0"><?php the_content(); ?><?php rcm_t_reviewed(get_the_modified_date('Y-m-d')); ?></article>
            <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <?php rcm_t_part('related-tools', ['keys' => ['outsourcing-vs-in-house-billing-calculator', 'rcm-roi-calculator', 'medical-billing-cost-calculator', 'billing-staffing-cost-calculator', 'billing-outsourcing-savings-calculator'], 'title' => __('Run the numbers', 'rcm-theme')]); ?>
                <?php rcm_t_part('side-cta'); ?>
            </aside>
        </div>
    </section>
    <?php
endwhile;
rcm_t_cta_band();
get_footer();
