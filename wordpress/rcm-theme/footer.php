<?php
/**
 * Site footer.
 */
defined('ABSPATH') || exit;
$c = rcm_t_contact();
$cols = [
    __('Services', 'rcm-theme') => rcm_t_core_links(),
    __('Company', 'rcm-theme') => [
        [__('About Us', 'rcm-theme'), rcm_t_url('about')],
        [__('How We Work', 'rcm-theme'), rcm_t_url('how-we-work')],
        [__('Pricing', 'rcm-theme'), rcm_t_url('pricing')],
        [__('Security and Privacy', 'rcm-theme'), rcm_t_url('security')],
        [__('Service Areas', 'rcm-theme'), rcm_t_url('service-areas')],
        [__('Contact', 'rcm-theme'), rcm_t_url('contact')],
    ],
    __('Resources', 'rcm-theme') => [
        [__('Blog', 'rcm-theme'), rcm_t_blog_url()],
        [__('Free Dental RCM Tools', 'rcm-theme'), rcm_t_archive('rcm_tool')],
        [__('FAQs', 'rcm-theme'), rcm_t_url('faq')],
    ],
    __('Legal', 'rcm-theme') => [
        [__('Privacy Policy', 'rcm-theme'), rcm_t_url('privacy-policy')],
        [__('Terms of Service', 'rcm-theme'), rcm_t_url('terms-of-service')],
        [__('Cookie Policy', 'rcm-theme'), rcm_t_url('cookie-policy')],
        [__('Accessibility', 'rcm-theme'), rcm_t_url('accessibility-statement')],
        [__('Disclaimer', 'rcm-theme'), rcm_t_url('disclaimer')],
    ],
];
?>
</main>

<footer class="site-footer bg-navy-950 text-navy-200">
    <div class="container py-14 sm:py-16">
        <div class="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
            <div>
                <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php esc_attr_e('Texas Solutions RCM home', 'rcm-theme'); ?>"><?php rcm_t_part('logo', ['dark' => true]); ?></a>
                <p class="mt-5 max-w-sm text-[15px] leading-relaxed">
                    <?php esc_html_e('Dental revenue cycle management (RCM) for US dental practices. A division of', 'rcm-theme'); ?>
                    <a href="https://texassolutions.co" class="text-white underline decoration-navy-500 underline-offset-2 hover:decoration-white">Texas Solutions</a>.
                </p>
                <p class="mt-3 text-[15px] font-medium text-white"><?php esc_html_e('Serving dental practices across the USA', 'rcm-theme'); ?></p>
                <ul class="mt-6 space-y-3 text-[15px]">
                    <li class="flex gap-3"><?php rcm_t_icon('Mail', 'mt-0.5 h-4 w-4 shrink-0 text-teal-300'); ?><a href="mailto:<?php echo esc_attr($c['email']); ?>" class="hover:text-white"><?php echo esc_html($c['email']); ?></a></li>
                    <li class="flex gap-3"><?php rcm_t_icon('Phone', 'mt-0.5 h-4 w-4 shrink-0 text-teal-300'); ?><a href="<?php echo esc_url($c['phone_href'], ['tel']); ?>" class="hover:text-white" data-rcm-cta="phone"><?php echo esc_html($c['phone']); ?></a></li>
                    <li><?php rcm_t_part('whatsapp', ['variant' => 'link', 'class' => 'hover:text-white']); ?></li>
                    <li class="flex gap-3"><?php rcm_t_icon('MapPin', 'mt-0.5 h-4 w-4 shrink-0 text-teal-300'); ?><span><?php echo esc_html(sprintf('%s, %s, %s %s', $c['street'], $c['city'], $c['region'], $c['postal_code'])); ?></span></li>
                </ul>
            </div>
            <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
                <?php foreach ($cols as $title => $links) : ?>
                    <div>
                        <h2 class="text-sm font-semibold uppercase tracking-[0.12em] text-white"><?php echo esc_html($title); ?></h2>
                        <ul class="mt-4 space-y-2.5">
                            <?php foreach ($links as [$label, $url]) : ?>
                                <li><a href="<?php echo esc_url($url); ?>" class="text-[15px] text-navy-200 transition hover:text-white"><?php echo esc_html($label); ?></a></li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>

        <div class="mt-12 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div>
                <h2 class="text-lg font-semibold text-white"><?php esc_html_e('Dental RCM insights by email', 'rcm-theme'); ?></h2>
                <p class="mt-1 text-[15px]"><?php esc_html_e('New dental revenue cycle guides, calculator updates and carrier changes worth knowing. Unsubscribe any time.', 'rcm-theme'); ?></p>
            </div>
            <?php rcm_t_form('newsletter'); ?>
        </div>

        <div class="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; <?php echo esc_html(wp_date('Y')); ?> Texas Solutions. <?php esc_html_e('All rights reserved.', 'rcm-theme'); ?></p>
            <ul class="flex flex-wrap gap-x-5 gap-y-2">
                <?php if (function_exists('rcm_setting') && rcm_setting('analytics.ga4_id')) : // only when there are optional cookies to choose ?>
                    <li><button type="button" class="hover:text-white" data-rcm-consent-open><?php esc_html_e('Cookie settings', 'rcm-theme'); ?></button></li>
                <?php endif; ?>
            </ul>
        </div>
        <p class="mt-6 max-w-4xl text-xs leading-relaxed text-navy-300">
            <?php esc_html_e('Information and calculators on this site are general and educational. They are not legal, tax, coding or financial advice, and estimates are not guarantees of results. Calculator inputs stay in your browser unless you choose to send them to us. Please do not send patient information through this website. CDT is a trademark of the American Dental Association. Open Dental, Dentrix, Eaglesoft and carrier names belong to their owners; Texas Solutions is not affiliated with them.', 'rcm-theme'); ?>
        </p>
    </div>
</footer>
<?php rcm_t_part('whatsapp', ['variant' => 'float']); ?>
<?php wp_footer(); ?>
</body>
</html>
