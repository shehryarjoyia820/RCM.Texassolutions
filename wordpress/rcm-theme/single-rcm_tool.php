<?php
/**
 * Single tool page: calculator, lookup, checklist, glossary or scorecard.
 */
defined('ABSPATH') || exit;
get_header();
the_post();
$p = get_post();
$d = rcm_t_item($p)['data'];
$cat = rcm_t_has_plugin() ? (RCM\Content_Types::TOOL_CATEGORIES[RCM\Content_Types::tool_category($p)][0] ?? '') : '';
$services = rcm_t_by_keys('rcm_service', (array) ($d['relatedServices'] ?? []));
$is_calc = ($d['kind'] ?? '') === 'calculator';

rcm_t_part('page-hero', [
    'eyebrow' => $cat,
    'title' => get_the_title(),
    'intro' => $p->post_excerpt,
    'icon' => $d['icon'] ?? '',
]);
?>
<section class="py-12 sm:py-16">
    <div class="container">
        <?php if ($is_calc) : ?>
            <?php echo class_exists('RCM\\Tools') ? RCM\Tools::render($p, false) : ''; // phpcs:ignore WordPress.Security.EscapeOutput -- escaped in the plugin. ?>
            <div class="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div class="min-w-0 space-y-12"><?php echo class_exists('RCM\\Tools') ? RCM\Tools::render_details($p) : ''; // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
                <aside class="space-y-6"><?php rcm_t_part('related-tools', ['keys' => (array) ($d['relatedTools'] ?? []), 'title' => __('Related calculators', 'rcm-theme')]); ?></aside>
            </div>
        <?php else : ?>
            <div class="grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div class="min-w-0"><?php echo class_exists('RCM\\Tools') ? RCM\Tools::render($p) : ''; // phpcs:ignore WordPress.Security.EscapeOutput ?></div>
                <aside class="space-y-6"><?php rcm_t_part('related-tools', ['keys' => (array) ($d['relatedTools'] ?? [])]); ?></aside>
            </div>
        <?php endif; ?>
    </div>
</section>

<section class="bg-canvas py-14 sm:py-16">
    <div class="container grid gap-12 lg:grid-cols-2">
        <?php if (!empty($d['faqs'])) : ?>
            <section aria-labelledby="faq-h">
                <h2 id="faq-h" class="mb-6 text-2xl font-bold sm:text-3xl"><?php esc_html_e('Frequently asked questions', 'rcm-theme'); ?></h2>
                <?php rcm_t_faqs((array) $d['faqs']); ?>
                <div class="mt-6"><?php rcm_t_reviewed(get_the_modified_date('Y-m-d')); ?></div>
            </section>
        <?php endif; ?>
        <?php if ($services) : ?>
            <section aria-labelledby="svc-h">
                <h2 id="svc-h" class="mb-6 text-2xl font-bold sm:text-3xl"><?php esc_html_e('Need help with this?', 'rcm-theme'); ?></h2>
                <div class="grid gap-4">
                    <?php foreach ($services as $s) : $si = rcm_t_item($s); rcm_t_link_card($si['url'], $si['title'], $si['text'], $si['icon']); endforeach; ?>
                </div>
            </section>
        <?php endif; ?>
    </div>
</section>

<?php rcm_t_cta_band(['title' => __('Want a second opinion on your numbers?', 'rcm-theme'), 'text' => __('Book a free consultation and we will walk through your revenue cycle metrics with you.', 'rcm-theme'), 'secondary' => [__('More RCM tools', 'rcm-theme'), rcm_t_archive('rcm_tool')]]); ?>
<?php get_footer(); ?>
