<?php
/**
 * /services/ directory grouped by category.
 */
defined('ABSPATH') || exit;
get_header();
$all = rcm_t_all('rcm_service');
$cats = rcm_t_has_plugin() ? RCM\Content_Types::SERVICE_CATEGORIES : [];

rcm_t_part('page-hero', [
    'eyebrow' => __('Services', 'rcm-theme'),
    'title' => __('Revenue cycle management services', 'rcm-theme'),
    'intro' => __('Choose a complete revenue cycle program or the specific pieces your team needs help with. Every service is delivered inside your own systems and scoped in writing before work starts.', 'rcm-theme'),
    'actions' => '<a href="' . esc_url(rcm_t_url('consultation')) . '" class="btn-primary">' . esc_html__('Get a Free Consultation', 'rcm-theme') . '</a><a href="' . esc_url(rcm_t_url('outsourcing-vs-in-house-billing')) . '" class="btn-ghost-light">' . esc_html__('Outsourcing vs in-house billing', 'rcm-theme') . '</a>',
]);
?>
<nav aria-label="<?php esc_attr_e('Service categories', 'rcm-theme'); ?>" class="sticky top-[72px] z-30 border-b border-line bg-white/95 backdrop-blur">
    <div class="container scrollbar-none flex gap-2 overflow-x-auto py-3">
        <?php foreach ($cats as $id => [$label]) : ?>
            <a href="#<?php echo esc_attr($id); ?>" class="chip shrink-0 hover:border-teal-300 hover:text-teal-800"><?php echo esc_html($label); ?></a>
        <?php endforeach; ?>
    </div>
</nav>

<?php
$i = 0;
foreach ($cats as $id => [$label, $blurb]) :
    $list = array_filter($all, static fn($p) => RCM\Content_Types::service_category($p) === $id);
    if (!$list) {
        continue;
    }
    ?>
    <section id="<?php echo esc_attr($id); ?>" class="scroll-mt-32 py-14 sm:py-16 <?php echo $i++ % 2 ? 'bg-canvas' : ''; ?>">
        <div class="container">
            <div class="mb-8 max-w-3xl">
                <h2 class="text-2xl font-bold sm:text-3xl"><?php echo esc_html($label); ?></h2>
                <p class="mt-2 text-lg text-ink-muted"><?php echo esc_html($blurb); ?></p>
            </div>
            <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <?php foreach ($list as $p) : $it = rcm_t_item($p); rcm_t_link_card($it['url'], $it['title'], $it['text'], $it['icon']); endforeach; ?>
            </div>
        </div>
    </section>
<?php endforeach; ?>

<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
