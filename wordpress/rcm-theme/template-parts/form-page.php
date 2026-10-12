<?php
/**
 * Shared layout for form pages: hero, page content + contact details, form card.
 *
 * @var array $args variant, form_title, aside (bool: show contact details), form_args
 */
defined('ABSPATH') || exit;
$variant = $args['variant'] ?? 'contact';
$c = rcm_t_contact();
get_header();
while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', ['title' => get_the_title(), 'intro' => rcm_t_page_intro(get_the_ID())]);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[1fr_1.35fr]">
            <div class="min-w-0 space-y-8">
                <?php if (trim(get_the_content())) : ?><div class="prose-rcm"><?php the_content(); ?></div><?php endif; ?>
                <?php if (!empty($args['aside'])) : ?>
                    <div class="card space-y-4 p-6">
                        <h2 class="text-lg font-semibold"><?php esc_html_e('Contact details', 'rcm-theme'); ?></h2>
                        <p class="flex gap-3"><?php rcm_t_icon('Mail', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?><a class="font-medium text-navy-900 hover:text-teal-700" href="mailto:<?php echo esc_attr($c['email']); ?>"><?php echo esc_html($c['email']); ?></a></p>
                        <p class="flex gap-3"><?php rcm_t_icon('Phone', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?><a class="font-medium text-navy-900 hover:text-teal-700" href="<?php echo esc_url($c['phone_href'], ['tel']); ?>"><?php echo esc_html($c['phone']); ?></a></p>
                        <p class="flex gap-3"><?php rcm_t_icon('MapPin', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?><span><?php echo esc_html($c['street']); ?><br><?php echo esc_html(sprintf('%s, %s %s', $c['city'], $c['region'], $c['postal_code'])); ?></span></p>
                        <?php if (!empty($c['hours'])) : ?><p class="flex gap-3"><?php rcm_t_icon('Clock', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?><span><?php echo esc_html($c['hours']); ?></span></p><?php endif; ?>
                    </div>
                <?php endif; ?>
                <div class="notice-warn flex gap-3"><?php rcm_t_icon('ShieldAlert', 'mt-0.5 h-5 w-5 shrink-0'); ?><span><?php esc_html_e('Please do not send patient information (names, dates of birth, member IDs or claim details) through this website. When work begins we set up a secure channel covered by a Business Associate Agreement.', 'rcm-theme'); ?></span></div>
            </div>
            <div class="card p-6 sm:p-8" id="form">
                <?php if (!empty($args['form_title'])) : ?><h2 class="mb-6 text-2xl font-bold"><?php echo esc_html($args['form_title']); ?></h2><?php endif; ?>
                <?php rcm_t_form($variant, (array) ($args['form_args'] ?? [])); ?>
            </div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
