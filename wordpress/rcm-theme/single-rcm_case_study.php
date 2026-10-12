<?php
/**
 * Case study (only approved ones are linked or indexed; unapproved ones 404 for visitors).
 */
defined('ABSPATH') || exit;
the_post();
if (get_post_meta(get_the_ID(), '_rcm_approved', true) !== '1' && !current_user_can('edit_post', get_the_ID())) {
    global $wp_query;
    $wp_query->set_404();
    status_header(404);
    require __DIR__ . '/404.php';
    return;
}
get_header();
rcm_t_part('page-hero', ['eyebrow' => __('Case study', 'rcm-theme'), 'title' => get_the_title(), 'intro' => has_excerpt() ? get_the_excerpt() : '']);
?>
<section class="py-12 sm:py-16">
    <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article class="prose-rcm min-w-0">
            <?php if (has_post_thumbnail()) : the_post_thumbnail('rcm-hero', ['class' => 'h-auto w-full rounded-2xl']); endif; ?>
            <?php the_content(); ?>
            <p class="text-sm text-ink-subtle"><?php esc_html_e('Results depend on each practice\'s starting point, specialty and payer mix. Published with the client\'s permission.', 'rcm-theme'); ?></p>
        </article>
        <aside class="lg:sticky lg:top-24 lg:self-start"><?php rcm_t_part('side-cta'); ?></aside>
    </div>
</section>
<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
