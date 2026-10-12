<?php
/**
 * Not found.
 */
defined('ABSPATH') || exit;
get_header();
?>
<section class="relative overflow-hidden bg-canvas py-20 sm:py-28">
    <div class="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" aria-hidden="true"></div>
    <div class="container relative max-w-2xl text-center">
        <p class="font-display text-7xl font-extrabold text-teal-600">404</p>
        <h1 class="mt-4 text-3xl font-bold sm:text-4xl"><?php esc_html_e('This page could not be found', 'rcm-theme'); ?></h1>
        <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('The link may be old or mistyped. Try searching, or start from one of these pages.', 'rcm-theme'); ?></p>
        <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="relative mx-auto mt-8 max-w-md">
            <label for="nf-s" class="sr-only"><?php esc_html_e('Search', 'rcm-theme'); ?></label>
            <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle"><?php rcm_t_icon('Search', 'h-5 w-5'); ?></span>
            <input id="nf-s" type="search" name="s" class="field rounded-full py-3 pl-12" placeholder="<?php esc_attr_e('Search the site', 'rcm-theme'); ?>">
        </form>
        <div class="mt-8 flex flex-wrap justify-center gap-3">
            <a href="<?php echo esc_url(home_url('/')); ?>" class="btn-primary"><?php esc_html_e('Home', 'rcm-theme'); ?></a>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_service')); ?>" class="btn-outline"><?php esc_html_e('Services', 'rcm-theme'); ?></a>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>" class="btn-outline"><?php esc_html_e('RCM tools', 'rcm-theme'); ?></a>
            <a href="<?php echo esc_url(rcm_t_url('contact')); ?>" class="btn-outline"><?php esc_html_e('Contact', 'rcm-theme'); ?></a>
        </div>
    </div>
</section>
<?php get_footer(); ?>
