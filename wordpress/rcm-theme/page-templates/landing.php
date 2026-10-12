<?php
/**
 * Template Name: Campaign landing page
 * Focused page for ad campaigns: hero, page content and a consultation form, with the normal header and footer.
 * Add the campaign copy in the editor; the form is placed automatically.
 */
defined('ABSPATH') || exit;
get_header();
while (have_posts()) :
    the_post();
    ?>
    <section class="relative overflow-hidden bg-navy-950 text-white">
        <div class="bg-grid-dark absolute inset-0" aria-hidden="true"></div>
        <div class="container relative grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:items-start">
            <div>
                <h1 class="text-4xl font-extrabold text-white sm:text-5xl"><?php the_title(); ?></h1>
                <?php if ($intro = rcm_t_page_intro(get_the_ID())) : ?><p class="mt-5 text-lg text-navy-200"><?php echo esc_html($intro); ?></p><?php endif; ?>
                <div class="prose-rcm mt-8 text-navy-100 [&_a]:text-teal-300 [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white"><?php the_content(); ?></div>
            </div>
            <div class="card p-6 text-ink sm:p-8">
                <h2 class="mb-5 text-2xl font-bold"><?php esc_html_e('Get a free consultation', 'rcm-theme'); ?></h2>
                <?php rcm_t_form('consultation', ['compact' => true]); ?>
            </div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
