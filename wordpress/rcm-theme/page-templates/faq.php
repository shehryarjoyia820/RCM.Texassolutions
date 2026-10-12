<?php
/**
 * Template Name: FAQs
 * Lists FAQ posts (RCM > FAQs) grouped by topic.
 */
defined('ABSPATH') || exit;

$topics = get_terms(['taxonomy' => 'rcm_faq_topic', 'hide_empty' => true, 'orderby' => 'term_order']);
$groups = [];
foreach (is_array($topics) ? $topics : [] as $t) {
    $items = get_posts(['post_type' => 'rcm_faq', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order', 'order' => 'ASC', 'tax_query' => [['taxonomy' => 'rcm_faq_topic', 'terms' => $t->term_id]]]);
    if ($items) {
        $groups[$t->name] = array_map(static fn(WP_Post $p): array => ['q' => get_the_title($p), 'a' => wp_strip_all_tags($p->post_content)], $items);
    }
}
$untagged = get_posts(['post_type' => 'rcm_faq', 'post_status' => 'publish', 'numberposts' => -1, 'orderby' => 'menu_order', 'order' => 'ASC', 'tax_query' => [['taxonomy' => 'rcm_faq_topic', 'operator' => 'NOT EXISTS']]]);
if ($untagged) {
    $groups[__('More questions', 'rcm-theme')] = array_map(static fn(WP_Post $p): array => ['q' => get_the_title($p), 'a' => wp_strip_all_tags($p->post_content)], $untagged);
}
// The SEO module adds every published FAQ to this page's FAQPage structured data itself.

get_header();
while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', ['eyebrow' => __('FAQs', 'rcm-theme'), 'title' => get_the_title(), 'intro' => rcm_t_page_intro(get_the_ID())]);
    ?>
    <section class="py-12 sm:py-16">
        <div class="container grid gap-12 lg:grid-cols-[260px_minmax(0,1fr)]">
            <nav aria-label="<?php esc_attr_e('FAQ topics', 'rcm-theme'); ?>" class="lg:sticky lg:top-24 lg:self-start">
                <ul class="flex flex-wrap gap-2 lg:flex-col">
                    <?php foreach (array_keys($groups) as $i => $name) : ?>
                        <li><a href="#topic-<?php echo (int) $i; ?>" class="chip lg:w-full lg:justify-start lg:rounded-lg lg:border-0 lg:bg-transparent lg:text-sm lg:hover:bg-canvas"><?php echo esc_html($name); ?></a></li>
                    <?php endforeach; ?>
                </ul>
            </nav>
            <div class="min-w-0 space-y-12">
                <?php if (trim(get_the_content())) : ?><div class="prose-rcm"><?php the_content(); ?></div><?php endif; ?>
                <?php $i = 0; foreach ($groups as $name => $faqs) : ?>
                    <section id="topic-<?php echo (int) $i++; ?>" class="scroll-mt-24">
                        <h2 class="mb-5 text-2xl font-bold"><?php echo esc_html($name); ?></h2>
                        <?php rcm_t_faqs($faqs); ?>
                    </section>
                <?php endforeach; ?>
                <div class="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                    <p class="text-navy-900"><strong><?php esc_html_e('Still have a question?', 'rcm-theme'); ?></strong> <?php esc_html_e('Send it to us and a person will reply by email.', 'rcm-theme'); ?></p>
                    <a href="<?php echo esc_url(rcm_t_url('contact')); ?>" class="btn-primary btn-sm shrink-0"><?php esc_html_e('Ask a question', 'rcm-theme'); ?></a>
                </div>
            </div>
        </div>
    </section>
    <?php
endwhile;
get_footer();
