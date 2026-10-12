<?php
/**
 * Template Name: Service area (location)
 * Used by /service-areas/ (hub, lists child pages) and /service-areas/<state>/.
 */
defined('ABSPATH') || exit;
get_header();
while (have_posts()) :
    the_post();
    $id = get_the_ID();
    $is_hub = (int) wp_get_post_parent_id($id) === 0;
    $children = $is_hub ? get_pages(['parent' => $id, 'sort_column' => 'menu_order,post_title', 'post_status' => 'publish']) : [];
    $hub_id = $is_hub ? $id : (int) wp_get_post_parent_id($id);
    $siblings = $is_hub ? [] : get_pages(['parent' => $hub_id, 'exclude' => [$id], 'sort_column' => 'menu_order,post_title', 'post_status' => 'publish']);
    $popular = rcm_t_by_keys('rcm_service', ['medical-billing', 'dental-billing', 'revenue-cycle-management', 'medical-credentialing', 'denial-management', 'insurance-eligibility-verification', 'dental-claims-processing', 'accounts-receivable-management']);

    rcm_t_part('page-hero', [
        'eyebrow' => __('Service areas', 'rcm-theme'),
        'title' => get_the_title(),
        'intro' => rcm_t_page_intro($id),
        'actions' => '<a href="' . esc_url(rcm_t_url('consultation')) . '" class="btn-primary" data-rcm-cta="location-hero">' . esc_html__('Get a Free Consultation', 'rcm-theme') . '</a>',
    ]);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div class="min-w-0">
                <div class="prose-rcm"><?php the_content(); ?></div>

                <?php if ($children) : ?>
                    <section class="mt-12" aria-labelledby="areas-h">
                        <h2 id="areas-h" class="mb-6 text-2xl font-bold"><?php esc_html_e('State pages', 'rcm-theme'); ?></h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <?php foreach ($children as $c) : rcm_t_link_card(get_permalink($c), get_the_title($c), (string) get_post_meta($c->ID, '_rcm_intro', true), 'MapPin'); endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>

                <?php if ($popular) : ?>
                    <section class="mt-12" aria-labelledby="svc-h">
                        <h2 id="svc-h" class="mb-6 text-2xl font-bold"><?php esc_html_e('Services practices ask us about most', 'rcm-theme'); ?></h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <?php foreach ($popular as $s) : $si = rcm_t_item($s); rcm_t_link_card($si['url'], $si['title'], $si['text'], $si['icon']); endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>

                <?php if ($siblings) : ?>
                    <section class="mt-12">
                        <h2 class="mb-4 text-xl font-bold"><?php esc_html_e('Other service areas', 'rcm-theme'); ?></h2>
                        <ul class="flex flex-wrap gap-2">
                            <?php foreach ($siblings as $c) : ?><li><a class="chip hover:border-teal-300 hover:text-teal-800" href="<?php echo esc_url(get_permalink($c)); ?>"><?php echo esc_html(get_the_title($c)); ?></a></li><?php endforeach; ?>
                            <li><a class="chip border-teal-200 bg-teal-50 font-semibold text-teal-800" href="<?php echo esc_url(get_permalink($hub_id)); ?>"><?php esc_html_e('All of the US', 'rcm-theme'); ?></a></li>
                        </ul>
                    </section>
                <?php endif; ?>
            </div>
            <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <?php rcm_t_part('side-cta'); ?>
                <div class="card space-y-3 p-5 text-[15px]">
                    <h2 class="text-base font-semibold"><?php esc_html_e('Talk to the team', 'rcm-theme'); ?></h2>
                    <?php $c = rcm_t_contact(); ?>
                    <p class="flex gap-3"><?php rcm_t_icon('Phone', 'mt-0.5 h-4 w-4 shrink-0 text-teal-600'); ?><a class="hover:text-teal-700" href="<?php echo esc_url($c['phone_href'], ['tel']); ?>"><?php echo esc_html($c['phone']); ?></a></p>
                    <p><?php rcm_t_part('whatsapp', ['variant' => 'link', 'class' => 'hover:text-teal-700']); ?></p>
                    <p class="flex gap-3"><?php rcm_t_icon('Mail', 'mt-0.5 h-4 w-4 shrink-0 text-teal-600'); ?><a class="hover:text-teal-700" href="mailto:<?php echo esc_attr($c['email']); ?>"><?php echo esc_html($c['email']); ?></a></p>
                    <p class="flex gap-3"><?php rcm_t_icon('MapPin', 'mt-0.5 h-4 w-4 shrink-0 text-teal-600'); ?><span><?php echo esc_html(sprintf('%s, %s, %s %s', $c['street'], $c['city'], $c['region'], $c['postal_code'])); ?></span></p>
                </div>
            </aside>
        </div>
    </section>

    <section class="bg-canvas py-14 sm:py-16" id="consultation">
        <div class="container grid gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
                <p class="eyebrow mb-3"><?php esc_html_e('Free consultation', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold"><?php esc_html_e('Tell us about your practice', 'rcm-theme'); ?></h2>
                <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('We will reply by email to arrange a call about your billing, payers and goals. No cost and no obligation.', 'rcm-theme'); ?></p>
            </div>
            <div class="card p-6 sm:p-8"><?php rcm_t_form('consultation', ['compact' => true]); ?></div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
