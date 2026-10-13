<?php
/**
 * Template Name: Service area (location)
 * Used by /service-areas/ and /carriers/ (hubs list their child pages) and their state / carrier child pages.
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
    $is_carriers = get_post_field('post_name', $hub_id) === 'carriers';
    $popular = rcm_t_by_keys('rcm_service', array_column(rcm_t_dental()['core'], 'slug'));
    $core_names = array_column(rcm_t_dental()['core'], 'name', 'slug');

    rcm_t_part('page-hero', [
        'eyebrow' => $is_carriers ? __('Dental carriers', 'rcm-theme') : __('Service areas', 'rcm-theme'),
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
                        <h2 id="areas-h" class="mb-6 text-2xl font-bold"><?php echo $is_carriers ? esc_html__('Carrier pages', 'rcm-theme') : esc_html__('State pages', 'rcm-theme'); ?></h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <?php foreach ($children as $c) : rcm_t_link_card(get_permalink($c), get_the_title($c), wp_trim_words((string) get_post_meta($c->ID, '_rcm_intro', true), 28), $is_carriers ? 'ShieldCheck' : 'MapPin'); endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>

                <?php if ($is_hub && !$is_carriers) :
                    $states = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
                    $state_pages = [];
                    foreach ($children as $c) {
                        $state_pages[$c->post_name] = get_permalink($c);
                    }
                    ?>
                    <section class="mt-12" aria-labelledby="states-h">
                        <h2 id="states-h" class="text-2xl font-bold"><?php esc_html_e('Dental revenue cycle management in all 50 states', 'rcm-theme'); ?></h2>
                        <p class="mb-6 mt-2 text-ink-muted"><?php esc_html_e('Our team works remotely, so we serve dental practices in every US state:', 'rcm-theme'); ?></p>
                        <ul class="grid grid-cols-2 gap-x-4 gap-y-2 text-[15px] sm:grid-cols-3 lg:grid-cols-4">
                            <?php foreach ($states as $st) : $slug = sanitize_title($st); ?>
                                <li class="flex items-center gap-2">
                                    <?php rcm_t_icon('MapPin', 'h-3.5 w-3.5 shrink-0 text-teal-600'); ?>
                                    <?php if (isset($state_pages[$slug])) : ?>
                                        <a href="<?php echo esc_url($state_pages[$slug]); ?>" class="font-semibold text-teal-700 hover:underline"><?php echo esc_html($st); ?></a>
                                    <?php else : ?>
                                        <span class="text-navy-800"><?php echo esc_html($st); ?></span>
                                    <?php endif; ?>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </section>
                <?php endif; ?>

                <?php if ($popular) : ?>
                    <section class="mt-12" aria-labelledby="svc-h">
                        <h2 id="svc-h" class="mb-6 text-2xl font-bold"><?php esc_html_e('Our dental RCM services', 'rcm-theme'); ?></h2>
                        <div class="grid gap-4 sm:grid-cols-2">
                            <?php foreach ($popular as $s) : $si = rcm_t_item($s); $sk = (string) get_post_meta($s->ID, '_rcm_key', true); rcm_t_link_card($si['url'], $core_names[$sk] ?? $si['title'], '', $si['icon']); endforeach; ?>
                        </div>
                    </section>
                <?php endif; ?>

                <?php if ($siblings) : ?>
                    <section class="mt-12">
                        <h2 class="mb-4 text-xl font-bold"><?php echo $is_carriers ? esc_html__('Other carriers', 'rcm-theme') : esc_html__('Other service areas', 'rcm-theme'); ?></h2>
                        <ul class="flex flex-wrap gap-2">
                            <?php foreach ($siblings as $c) : ?><li><a class="chip hover:border-teal-300 hover:text-teal-800" href="<?php echo esc_url(get_permalink($c)); ?>"><?php echo esc_html(get_the_title($c)); ?></a></li><?php endforeach; ?>
                            <li><a class="chip border-teal-200 bg-teal-50 font-semibold text-teal-800" href="<?php echo esc_url(get_permalink($hub_id)); ?>"><?php echo $is_carriers ? esc_html__('All carriers', 'rcm-theme') : esc_html__('All 50 states', 'rcm-theme'); ?></a></li>
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
                <h2 class="text-3xl font-bold"><?php esc_html_e('Tell us about your dental practice', 'rcm-theme'); ?></h2>
                <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('We will reply by email to arrange a call about your dental revenue cycle, carriers and goals. No cost and no obligation.', 'rcm-theme'); ?></p>
            </div>
            <div class="card p-6 sm:p-8"><?php rcm_t_form('consultation', ['compact' => true]); ?></div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
