<?php
/**
 * /specialties/ directory.
 */
defined('ABSPATH') || exit;
get_header();
$all = rcm_t_all('rcm_specialty');
$groups = [
    'medical' => [__('Medical specialties', 'rcm-theme'), array_filter($all, static fn($p) => !rcm_t_has_plugin() || RCM\Content_Types::specialty_kind($p) !== 'dental')],
    'dental' => [__('Dental specialties', 'rcm-theme'), array_filter($all, static fn($p) => rcm_t_has_plugin() && RCM\Content_Types::specialty_kind($p) === 'dental')],
];
rcm_t_part('page-hero', [
    'eyebrow' => __('Specialties', 'rcm-theme'),
    'title' => __('Billing support built around your specialty', 'rcm-theme'),
    'intro' => __('Every specialty has its own coding rules, payer policies and documentation traps. Pick yours to see the billing challenges we plan for.', 'rcm-theme'),
]);
foreach ($groups as $id => [$label, $list]) :
    if (!$list) {
        continue;
    }
    ?>
    <section id="<?php echo esc_attr($id); ?>" class="scroll-mt-24 py-14 sm:py-16 <?php echo $id === 'dental' ? 'bg-canvas' : ''; ?>">
        <div class="container">
            <h2 class="mb-8 text-2xl font-bold sm:text-3xl"><?php echo esc_html($label); ?></h2>
            <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <?php foreach ($list as $p) : $it = rcm_t_item($p); ?>
                    <li>
                        <a href="<?php echo esc_url($it['url']); ?>" class="card group flex h-full gap-4 p-5 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lift">
                            <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100 group-hover:bg-teal-600 group-hover:text-white"><?php rcm_t_icon($it['icon'], 'h-5 w-5'); ?></span>
                            <span>
                                <span class="block font-semibold text-navy-900 group-hover:text-teal-700"><?php echo esc_html($it['title']); ?></span>
                                <span class="mt-1 block text-sm leading-relaxed text-ink-muted"><?php echo esc_html($it['text']); ?></span>
                            </span>
                        </a>
                    </li>
                <?php endforeach; ?>
            </ul>
        </div>
    </section>
<?php endforeach;
rcm_t_cta_band(['title' => __('Do not see your specialty?', 'rcm-theme'), 'text' => __('We support many practice types beyond this list. Tell us about yours and we will tell you honestly whether we are a good fit.', 'rcm-theme')]);
get_footer();
