<?php
/**
 * Job opening.
 */
defined('ABSPATH') || exit;
get_header();
the_post();
$open = get_post_meta(get_the_ID(), '_rcm_job_open', true) !== '0';
$meta = implode(' · ', array_filter([(string) get_post_meta(get_the_ID(), '_rcm_job_location', true), (string) get_post_meta(get_the_ID(), '_rcm_job_type', true)]));
rcm_t_part('page-hero', ['eyebrow' => __('Careers', 'rcm-theme'), 'title' => get_the_title(), 'intro' => has_excerpt() ? get_the_excerpt() : '', 'meta' => esc_html($meta)]);
?>
<section class="py-12 sm:py-16">
    <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_1fr]">
        <div class="prose-rcm min-w-0"><?php the_content(); ?></div>
        <div class="card self-start p-6 sm:p-8 lg:sticky lg:top-24">
            <?php if ($open) : ?>
                <h2 class="mb-6 text-2xl font-bold"><?php esc_html_e('Apply for this role', 'rcm-theme'); ?></h2>
                <?php rcm_t_form('careers', ['context' => sprintf('Role: %s (%s)', get_the_title(), get_permalink())]); ?>
            <?php else : ?>
                <p class="text-ink-muted"><?php esc_html_e('This role is no longer accepting applications.', 'rcm-theme'); ?></p>
                <a class="btn-outline btn-sm mt-4" href="<?php echo esc_url(rcm_t_url('careers')); ?>"><?php esc_html_e('See other roles', 'rcm-theme'); ?></a>
            <?php endif; ?>
        </div>
    </div>
</section>
<?php get_footer(); ?>
