<?php
/**
 * /services/ directory: dental overviews, the 8 core dental RCM services and dental software.
 */
defined('ABSPATH') || exit;
get_header();
$d = rcm_t_dental();
$groups = [
    'overview' => [__('Dental billing and RCM overviews', 'rcm-theme'), __('Start here for how the whole dental revenue cycle fits together.', 'rcm-theme'), rcm_t_by_keys('rcm_service', $d['overview'])],
    'core' => [__('Dental RCM services', 'rcm-theme'), __('Eight services you can take as a full program or one at a time. Each is scoped in writing before work starts.', 'rcm-theme'), rcm_t_by_keys('rcm_service', array_column($d['core'], 'slug'))],
    'software' => [__('Billing in your dental software', 'rcm-theme'), __('Our team works inside the practice management system you already use.', 'rcm-theme'), rcm_t_by_keys('rcm_service', $d['software'])],
];
$names = array_column($d['core'], 'name', 'slug');

rcm_t_part('page-hero', [
    'eyebrow' => __('Services', 'rcm-theme'),
    'title' => __('Dental Billing & RCM Services', 'rcm-theme'),
    'intro' => __('Dental billing and revenue cycle management for dental practices across the USA, delivered inside your own dental software, clearinghouse and carrier portals.', 'rcm-theme'),
    'actions' => '<a href="' . esc_url(rcm_t_url('consultation')) . '" class="btn-primary">' . esc_html__('Get a Free Consultation', 'rcm-theme') . '</a><a href="' . esc_url(rcm_t_url('how-we-work')) . '" class="btn-ghost-light">' . esc_html__('How we work', 'rcm-theme') . '</a>',
]);

$i = 0;
foreach ($groups as $id => [$label, $blurb, $list]) :
    if (!$list) {
        continue;
    }
    ?>
    <section id="<?php echo esc_attr($id); ?>" class="scroll-mt-24 py-14 sm:py-16 <?php echo $i++ % 2 ? 'bg-canvas' : ''; ?>">
        <div class="container">
            <div class="mb-8 max-w-3xl">
                <h2 class="text-2xl font-bold sm:text-3xl"><?php echo esc_html($label); ?></h2>
                <p class="mt-2 text-lg text-ink-muted"><?php echo esc_html($blurb); ?></p>
            </div>
            <div class="grid gap-5 sm:grid-cols-2 <?php echo $id === 'overview' ? '' : 'lg:grid-cols-4'; ?>">
                <?php foreach ($list as $p) :
                    $it = rcm_t_item($p);
                    $k = (string) get_post_meta($p->ID, '_rcm_key', true);
                    rcm_t_link_card($it['url'], $names[$k] ?? $it['title'], $it['text'], $it['icon']);
                endforeach; ?>
            </div>
        </div>
    </section>
<?php endforeach; ?>

<?php rcm_t_cta_band(); ?>
<?php get_footer(); ?>
