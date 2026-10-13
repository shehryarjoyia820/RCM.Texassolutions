<?php
/**
 * Blog index (/blog/), category and tag archives, with search and category filter.
 */
defined('ABSPATH') || exit;
get_header();
$blog_url = (int) get_option('page_for_posts') ? get_permalink((int) get_option('page_for_posts')) : home_url('/blog/');
$current = is_category() ? get_queried_object() : null;
$title = __('RCM insights and guides', 'rcm-theme');
$intro = __('Practical dental revenue cycle management guides on insurance verification, claims, denials, A/R and credentialing, written for dental practice owners and office managers.', 'rcm-theme');
if (is_category()) {
    $title = single_cat_title('', false);
    $intro = category_description() ? wp_strip_all_tags(category_description()) : sprintf(__('Articles about %s.', 'rcm-theme'), strtolower($title));
} elseif (is_tag()) {
    $title = sprintf(__('Articles tagged "%s"', 'rcm-theme'), single_tag_title('', false));
} elseif (is_author() || is_date()) {
    $title = wp_strip_all_tags(get_the_archive_title());
}
$cats = get_categories(['hide_empty' => true, 'orderby' => 'name']);

rcm_t_part('page-hero', ['eyebrow' => __('Blog', 'rcm-theme'), 'title' => $title, 'intro' => $intro]);
?>
<section class="py-12 sm:py-16">
    <div class="container">
        <div class="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <nav aria-label="<?php esc_attr_e('Blog categories', 'rcm-theme'); ?>" class="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4">
                <a href="<?php echo esc_url($blog_url); ?>" class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium <?php echo !$current ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-navy-800 hover:border-navy-300'; ?>"><?php esc_html_e('All', 'rcm-theme'); ?></a>
                <?php foreach ($cats as $c) : $on = $current && $current->term_id === $c->term_id; ?>
                    <a href="<?php echo esc_url(get_category_link($c)); ?>" class="shrink-0 rounded-full border px-4 py-2 text-sm font-medium <?php echo $on ? 'border-navy-900 bg-navy-900 text-white' : 'border-line bg-white text-navy-800 hover:border-navy-300'; ?>" <?php echo $on ? 'aria-current="page"' : ''; ?>><?php echo esc_html($c->name); ?> <span class="<?php echo $on ? 'text-navy-200' : 'text-ink-subtle'; ?>"><?php echo (int) $c->count; ?></span></a>
                <?php endforeach; ?>
            </nav>
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="relative w-full lg:w-80">
                <label for="blog-s" class="sr-only"><?php esc_html_e('Search articles', 'rcm-theme'); ?></label>
                <span class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle"><?php rcm_t_icon('Search', 'h-4 w-4'); ?></span>
                <input id="blog-s" type="search" name="s" class="field rounded-full pl-10" placeholder="<?php esc_attr_e('Search articles and tools', 'rcm-theme'); ?>">
            </form>
        </div>

        <?php if (have_posts()) : ?>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <?php while (have_posts()) : the_post(); rcm_t_part('post-card', ['post' => get_post()]); endwhile; ?>
            </div>
            <div class="mt-12">
                <?php the_posts_pagination(['mid_size' => 1, 'prev_text' => __('Previous', 'rcm-theme'), 'next_text' => __('Next', 'rcm-theme'), 'class' => 'rcm-pagination']); ?>
            </div>
        <?php else : ?>
            <p class="rounded-2xl border border-dashed border-line p-10 text-center text-ink-muted"><?php esc_html_e('No articles here yet.', 'rcm-theme'); ?></p>
        <?php endif; ?>
    </div>
</section>
<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
