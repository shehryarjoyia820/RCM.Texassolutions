<?php
/**
 * Template Name: Legal / policy
 */
defined('ABSPATH') || exit;
get_header();
while (have_posts()) :
    the_post();
    $updated = (string) get_post_meta(get_the_ID(), '_rcm_last_updated', true) ?: get_the_modified_date('Y-m-d');
    rcm_t_part('page-hero', [
        'eyebrow' => __('Legal', 'rcm-theme'),
        'title' => get_the_title(),
        'intro' => rcm_t_page_intro(get_the_ID()),
        'meta' => sprintf('%s <time datetime="%s">%s</time>', esc_html__('Last updated', 'rcm-theme'), esc_attr($updated), esc_html(date_i18n(get_option('date_format'), strtotime($updated . ' 12:00:00')))),
    ]);
    $legal = [
        'privacy-policy' => __('Privacy Policy', 'rcm-theme'),
        'terms-of-service' => __('Terms of Service', 'rcm-theme'),
        'cookie-policy' => __('Cookie Policy', 'rcm-theme'),
        'accessibility-statement' => __('Accessibility Statement', 'rcm-theme'),
        'disclaimer' => __('Disclaimer', 'rcm-theme'),
    ];
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_260px]">
            <div class="prose-rcm min-w-0"><?php the_content(); ?></div>
            <nav aria-label="<?php esc_attr_e('Policies', 'rcm-theme'); ?>" class="no-print lg:sticky lg:top-24 lg:self-start">
                <p class="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle"><?php esc_html_e('Policies', 'rcm-theme'); ?></p>
                <ul class="space-y-1">
                    <?php foreach ($legal as $key => $label) : $url = rcm_t_url($key); $on = untrailingslashit($url) === untrailingslashit(get_permalink()); ?>
                        <li><a href="<?php echo esc_url($url); ?>" class="block rounded-lg px-3 py-2 text-sm <?php echo $on ? 'bg-teal-50 font-semibold text-teal-800' : 'text-navy-800 hover:bg-canvas'; ?>" <?php echo $on ? 'aria-current="page"' : ''; ?>><?php echo esc_html($label); ?></a></li>
                    <?php endforeach; ?>
                </ul>
                <button type="button" class="btn-outline btn-sm mt-6" onclick="window.print()"><?php rcm_t_icon('Printer', 'h-4 w-4'); ?> <?php esc_html_e('Print', 'rcm-theme'); ?></button>
            </nav>
        </div>
    </section>
    <?php
endwhile;
get_footer();
