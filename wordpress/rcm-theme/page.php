<?php
/**
 * Default page: hero + content + sidebar CTA (company pages).
 */
defined('ABSPATH') || exit;
get_header();
while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', ['title' => get_the_title(), 'intro' => rcm_t_page_intro(get_the_ID())]);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div class="min-w-0">
                <div class="prose-rcm"><?php the_content(); ?></div>
                <?php
                // Approved integrations directory on the Technology page.
                $integrations = get_post_field('post_name') === 'technology' && rcm_t_has_plugin() ? RCM\Content_Types::approved('rcm_integration') : [];
                if ($integrations) : ?>
                    <section class="mt-12" aria-labelledby="int-h">
                        <h2 id="int-h" class="mb-6 text-2xl font-bold"><?php esc_html_e('Approved integrations', 'rcm-theme'); ?></h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <?php foreach ($integrations as $ip) : rcm_t_link_card(get_permalink($ip), get_the_title($ip), get_the_excerpt($ip), 'Network'); endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>
            </div>
            <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <?php rcm_t_part('side-cta'); ?>
                <?php rcm_t_part('related-tools', ['keys' => ['dental-billing-cost-calculator', 'dental-practice-roi-calculator', 'outsourcing-vs-in-house-billing-calculator']]); ?>
            </aside>
        </div>
    </section>
    <?php
endwhile;
rcm_t_cta_band();
get_footer();
