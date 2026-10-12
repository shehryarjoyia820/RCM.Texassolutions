<?php
/**
 * Template Name: Careers
 */
defined('ABSPATH') || exit;
get_header();
$jobs = get_posts(['post_type' => 'rcm_job', 'post_status' => 'publish', 'numberposts' => -1, 'meta_query' => [['key' => '_rcm_job_open', 'value' => '0', 'compare' => '!=']]]);
while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', ['eyebrow' => __('Careers', 'rcm-theme'), 'title' => get_the_title(), 'intro' => rcm_t_page_intro(get_the_ID()), 'actions' => '<a href="#apply" class="btn-primary">' . esc_html__('Apply now', 'rcm-theme') . '</a>']);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_1fr]">
            <div class="min-w-0 space-y-10">
                <div class="prose-rcm"><?php the_content(); ?></div>
                <section aria-labelledby="open-h">
                    <h2 id="open-h" class="text-2xl font-bold"><?php esc_html_e('Open roles', 'rcm-theme'); ?></h2>
                    <?php if ($jobs) : ?>
                        <ul class="mt-5 space-y-3">
                            <?php foreach ($jobs as $j) : ?>
                                <li>
                                    <a href="<?php echo esc_url(get_permalink($j)); ?>" class="card flex items-center justify-between gap-4 p-5 hover:border-teal-300">
                                        <span>
                                            <span class="block font-semibold text-navy-900"><?php echo esc_html(get_the_title($j)); ?></span>
                                            <span class="mt-1 block text-sm text-ink-muted"><?php echo esc_html(implode(' · ', array_filter([(string) get_post_meta($j->ID, '_rcm_job_location', true), (string) get_post_meta($j->ID, '_rcm_job_type', true)]))); ?></span>
                                        </span>
                                        <?php rcm_t_icon('ArrowRight', 'h-5 w-5 text-teal-600'); ?>
                                    </a>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    <?php else : ?>
                        <p class="mt-3 text-ink-muted"><?php esc_html_e('There are no advertised openings right now. You are welcome to send a general application; we keep it on file for future roles.', 'rcm-theme'); ?></p>
                    <?php endif; ?>
                </section>
            </div>
            <div class="card self-start p-6 sm:p-8 lg:sticky lg:top-24" id="apply">
                <h2 class="mb-6 text-2xl font-bold"><?php esc_html_e('Apply', 'rcm-theme'); ?></h2>
                <?php rcm_t_form('careers'); ?>
            </div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
