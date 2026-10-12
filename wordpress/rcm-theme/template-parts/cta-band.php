<?php
/**
 * @var array $args title, text, primary [label, url], secondary [label, url] or false
 */
defined('ABSPATH') || exit;
$a = wp_parse_args($args, [
    'title' => __('Talk to us about your revenue cycle', 'rcm-theme'),
    'text' => __('Book a free consultation. We will look at how your billing runs today and tell you plainly where we can help, and where we cannot.', 'rcm-theme'),
    'primary' => [__('Get a Free Consultation', 'rcm-theme'), rcm_t_url('consultation')],
    'secondary' => [__('Explore RCM tools', 'rcm-theme'), rcm_t_archive('rcm_tool')],
]);
?>
<section class="py-16 sm:py-20">
    <div class="container">
        <div class="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-12 text-white sm:px-12 sm:py-14">
            <div class="bg-grid-dark absolute inset-0 opacity-60" aria-hidden="true"></div>
            <div class="absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-teal-500/25 blur-3xl" aria-hidden="true"></div>
            <div class="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div class="max-w-2xl">
                    <h2 class="text-3xl font-bold text-white sm:text-4xl"><?php echo esc_html($a['title']); ?></h2>
                    <p class="mt-4 text-lg text-navy-200"><?php echo esc_html($a['text']); ?></p>
                </div>
                <div class="flex flex-wrap gap-3">
                    <a href="<?php echo esc_url($a['primary'][1]); ?>" class="btn-primary" data-rcm-cta="cta-band"><?php echo esc_html($a['primary'][0]); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
                    <?php if ($a['secondary']) : ?><a href="<?php echo esc_url($a['secondary'][1]); ?>" class="btn-ghost-light"><?php echo esc_html($a['secondary'][0]); ?></a><?php endif; ?>
                </div>
            </div>
        </div>
    </div>
</section>
