<?php
/**
 * Site footer.
 */
defined('ABSPATH') || exit;
$c = rcm_t_contact();
$services = rcm_t_by_keys('rcm_service', ['revenue-cycle-management', 'medical-billing', 'medical-coding', 'dental-billing', 'denial-management', 'accounts-receivable-management', 'medical-credentialing', 'prior-authorization']);
$tools = rcm_t_by_keys('rcm_tool', ['rcm-roi-calculator', 'net-collection-rate-calculator', 'days-in-ar-calculator', 'denial-rate-calculator', 'medical-billing-cost-calculator', 'icd-10-code-search']);
$blog = (int) get_option('page_for_posts') ? get_permalink((int) get_option('page_for_posts')) : home_url('/blog/');

$cols = [
    __('Services', 'rcm-theme') => array_merge(
        array_map(static fn($p) => [rcm_t_item($p)['short'], get_permalink($p)], $services),
        [[__('All services', 'rcm-theme'), rcm_t_archive('rcm_service')]]
    ),
    __('Free tools', 'rcm-theme') => array_merge(
        array_map(static fn($p) => [preg_replace('/ Calculator$/', '', get_the_title($p)), get_permalink($p)], $tools),
        [[__('All RCM tools', 'rcm-theme'), rcm_t_archive('rcm_tool')]]
    ),
    __('Company', 'rcm-theme') => [
        [__('About us', 'rcm-theme'), rcm_t_url('about')],
        [__('How we work', 'rcm-theme'), rcm_t_url('how-we-work')],
        [__('Why choose us', 'rcm-theme'), rcm_t_url('why-choose-us')],
        [__('Security and privacy', 'rcm-theme'), rcm_t_url('security')],
        [__('Careers', 'rcm-theme'), rcm_t_url('careers')],
        [__('Partner with us', 'rcm-theme'), rcm_t_url('partners')],
        [__('Request a proposal', 'rcm-theme'), rcm_t_url('proposal')],
        [__('Contact', 'rcm-theme'), rcm_t_url('contact')],
    ],
    __('Resources', 'rcm-theme') => [
        [__('Blog', 'rcm-theme'), $blog],
        [__('Knowledge center', 'rcm-theme'), rcm_t_url('resources')],
        [__('Specialties', 'rcm-theme'), rcm_t_archive('rcm_specialty')],
        [__('Service areas', 'rcm-theme'), rcm_t_url('service-areas')],
        [__('Billing glossary', 'rcm-theme'), home_url('/tools/medical-billing-glossary/')],
        [__('Outsourcing vs in-house', 'rcm-theme'), rcm_t_url('outsourcing-vs-in-house-billing')],
        [__('FAQs', 'rcm-theme'), rcm_t_url('faq')],
    ],
];
$legal = [
    [__('Privacy Policy', 'rcm-theme'), rcm_t_url('privacy-policy')],
    [__('Terms of Service', 'rcm-theme'), rcm_t_url('terms-of-service')],
    [__('Cookie Policy', 'rcm-theme'), rcm_t_url('cookie-policy')],
    [__('Accessibility', 'rcm-theme'), rcm_t_url('accessibility-statement')],
    [__('Disclaimer', 'rcm-theme'), rcm_t_url('disclaimer')],
    [__('Data handling', 'rcm-theme'), rcm_t_url('data-handling-and-security')],
];
?>
</main>

<footer class="site-footer bg-navy-950 text-navy-200">
    <div class="container py-14 sm:py-16">
        <div class="grid gap-10 lg:grid-cols-[1.3fr_2fr]">
            <div>
                <a href="<?php echo esc_url(home_url('/')); ?>" aria-label="<?php esc_attr_e('Texas Solutions RCM home', 'rcm-theme'); ?>"><?php rcm_t_part('logo', ['dark' => true]); ?></a>
                <p class="mt-5 max-w-sm text-[15px] leading-relaxed">
                    <?php esc_html_e('Revenue cycle management, medical billing and practice support for US medical and dental practices. A division of', 'rcm-theme'); ?>
                    <a href="https://texassolutions.co" class="text-white underline decoration-navy-500 underline-offset-2 hover:decoration-white">Texas Solutions</a>.
                </p>
                <ul class="mt-6 space-y-3 text-[15px]">
                    <li class="flex gap-3"><?php rcm_t_icon('Mail', 'mt-0.5 h-4 w-4 shrink-0 text-teal-300'); ?><a href="mailto:<?php echo esc_attr($c['email']); ?>" class="hover:text-white"><?php echo esc_html($c['email']); ?></a></li>
                    <li class="flex gap-3"><?php rcm_t_icon('Phone', 'mt-0.5 h-4 w-4 shrink-0 text-teal-300'); ?><a href="<?php echo esc_url($c['phone_href'], ['tel']); ?>" class="hover:text-white"><?php echo esc_html($c['phone']); ?></a></li>
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
                <h2 class="text-lg font-semibold text-white"><?php esc_html_e('RCM insights by email', 'rcm-theme'); ?></h2>
                <p class="mt-1 text-[15px]"><?php esc_html_e('New guides, calculator updates and payer changes worth knowing. Unsubscribe any time.', 'rcm-theme'); ?></p>
            </div>
            <?php rcm_t_form('newsletter'); ?>
        </div>

        <div class="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm lg:flex-row lg:items-center lg:justify-between">
            <p>&copy; <?php echo esc_html(wp_date('Y')); ?> Texas Solutions. <?php esc_html_e('All rights reserved.', 'rcm-theme'); ?></p>
            <ul class="flex flex-wrap gap-x-5 gap-y-2">
                <?php foreach ($legal as [$label, $url]) : ?>
                    <li><a href="<?php echo esc_url($url); ?>" class="hover:text-white"><?php echo esc_html($label); ?></a></li>
                <?php endforeach; ?>
                <?php if (function_exists('rcm_setting') && rcm_setting('analytics.ga4_id')) : // only when there are optional cookies to choose ?>
                    <li><button type="button" class="hover:text-white" data-rcm-consent-open><?php esc_html_e('Cookie settings', 'rcm-theme'); ?></button></li>
                <?php endif; ?>
            </ul>
        </div>
        <p class="mt-6 max-w-4xl text-xs leading-relaxed text-navy-300">
            <?php esc_html_e('Information and calculators on this site are general and educational. They are not legal, tax, coding or financial advice, and estimates are not guarantees of results. Calculator inputs stay in your browser unless you choose to send them to us. Please do not send patient information through this website. CPT is a registered trademark of the American Medical Association; CDT is a trademark of the American Dental Association.', 'rcm-theme'); ?>
        </p>
    </div>
</footer>
<?php rcm_t_part('whatsapp', ['variant' => 'float']); ?>
<?php wp_footer(); ?>
</body>
</html>
