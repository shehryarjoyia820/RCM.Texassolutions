<?php
/**
 * Approved case studies.
 */
defined('ABSPATH') || exit;
get_header();
rcm_t_part('page-hero', ['eyebrow' => __('Client results', 'rcm-theme'), 'title' => __('Case studies', 'rcm-theme'), 'intro' => __('Published with each client\'s written permission.', 'rcm-theme')]);
?>
<section class="py-12 sm:py-16">
    <div class="container">
        <?php if (have_posts()) : ?>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <?php while (have_posts()) : the_post(); rcm_t_link_card(get_permalink(), get_the_title(), get_the_excerpt(), 'LineChart', '', __('Read the case study', 'rcm-theme')); endwhile; ?>
            </div>
        <?php else : ?>
            <p class="rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted"><?php esc_html_e('Case studies will be published here once clients have approved them.', 'rcm-theme'); ?></p>
        <?php endif; ?>
    </div>
</section>
<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
