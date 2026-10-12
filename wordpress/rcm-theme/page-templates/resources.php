<?php
/**
 * Template Name: Resources / Knowledge Center
 */
defined('ABSPATH') || exit;
get_header();
$posts = get_posts(['numberposts' => 6, 'post_status' => 'publish']);
$guides = rcm_t_by_keys('rcm_tool', ['medical-billing-glossary', 'medical-billing-acronyms', 'denial-reasons-guide', 'claim-status-categories', 'eob-explained', 'era-explained']);
$checklists = rcm_t_by_keys('rcm_tool', ['prior-authorization-checklist', 'claim-submission-checklist', 'credentialing-checklist', 'denial-appeal-checklist', 'dental-insurance-verification-checklist', 'rcm-performance-scorecard']);
$calcs = rcm_t_by_keys('rcm_tool', ['rcm-roi-calculator', 'net-collection-rate-calculator', 'days-in-ar-calculator', 'denial-rate-calculator', 'medical-billing-cost-calculator', 'outsourcing-vs-in-house-billing-calculator']);
$blog_url = (int) get_option('page_for_posts') ? get_permalink((int) get_option('page_for_posts')) : home_url('/blog/');
$cats = get_categories(['hide_empty' => true]);

while (have_posts()) :
    the_post();
    rcm_t_part('page-hero', ['eyebrow' => __('Resources', 'rcm-theme'), 'title' => get_the_title(), 'intro' => rcm_t_page_intro(get_the_ID())]);
    ?>
    <section class="border-b border-line bg-white py-10">
        <div class="container max-w-3xl">
            <form role="search" method="get" action="<?php echo esc_url(home_url('/')); ?>" class="relative">
                <label for="kc-s" class="sr-only"><?php esc_html_e('Search the knowledge center', 'rcm-theme'); ?></label>
                <span class="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-subtle"><?php rcm_t_icon('Search', 'h-5 w-5'); ?></span>
                <input id="kc-s" type="search" name="s" class="field rounded-full py-4 pl-12 text-base" placeholder="<?php esc_attr_e('Search guides, tools, services and articles', 'rcm-theme'); ?>">
            </form>
            <?php if ($cats) : ?>
                <ul class="mt-5 flex flex-wrap justify-center gap-2">
                    <?php foreach ($cats as $c) : ?><li><a class="chip hover:border-teal-300" href="<?php echo esc_url(get_category_link($c)); ?>"><?php echo esc_html($c->name); ?></a></li><?php endforeach; ?>
                </ul>
            <?php endif; ?>
        </div>
    </section>

    <?php if (trim(get_the_content())) : ?>
        <section class="pt-12"><div class="container"><div class="prose-rcm"><?php the_content(); ?></div></div></section>
    <?php endif; ?>

    <?php foreach ([
        [__('Reference guides', 'rcm-theme'), __('Plain-English explanations of billing terms, codes and documents.', 'rcm-theme'), $guides],
        [__('Checklists and scorecards', 'rcm-theme'), __('Printable checklists for the steps that most often go wrong.', 'rcm-theme'), $checklists],
        [__('Popular calculators', 'rcm-theme'), __('Estimate the numbers behind your revenue cycle.', 'rcm-theme'), $calcs],
    ] as $k => [$title, $blurb, $items]) : if (!$items) { continue; } ?>
        <section class="py-12 sm:py-14 <?php echo $k % 2 ? 'bg-canvas' : ''; ?>">
            <div class="container">
                <div class="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div><h2 class="text-2xl font-bold sm:text-3xl"><?php echo esc_html($title); ?></h2><p class="mt-2 text-ink-muted"><?php echo esc_html($blurb); ?></p></div>
                    <a href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>" class="btn-outline btn-sm shrink-0"><?php esc_html_e('All tools', 'rcm-theme'); ?></a>
                </div>
                <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <?php foreach ($items as $t) : $i = rcm_t_item($t); rcm_t_link_card($i['url'], $i['title'], $i['text'], $i['icon'], '', __('Open', 'rcm-theme')); endforeach; ?>
                </div>
            </div>
        </section>
    <?php endforeach; ?>

    <?php if ($posts) : ?>
        <section class="py-12 sm:py-16">
            <div class="container">
                <div class="mb-8 flex items-end justify-between gap-3">
                    <h2 class="text-2xl font-bold sm:text-3xl"><?php esc_html_e('Latest articles', 'rcm-theme'); ?></h2>
                    <a href="<?php echo esc_url($blog_url); ?>" class="btn-outline btn-sm"><?php esc_html_e('Blog', 'rcm-theme'); ?></a>
                </div>
                <div class="grid gap-6 md:grid-cols-3"><?php foreach ($posts as $p) : rcm_t_part('post-card', ['post' => $p]); endforeach; ?></div>
            </div>
        </section>
    <?php endif; ?>
    <?php
endwhile;
rcm_t_cta_band();
get_footer();
