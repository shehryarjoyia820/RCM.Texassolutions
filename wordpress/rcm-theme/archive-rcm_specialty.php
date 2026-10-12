<?php
/**
 * /specialties/ directory (dental specialties only).
 */
defined('ABSPATH') || exit;
get_header();
$list = rcm_t_by_keys('rcm_specialty', rcm_t_dental()['specialties']);
rcm_t_part('page-hero', [
    'eyebrow' => __('Specialties', 'rcm-theme'),
    'title' => __('Dental Specialties We Bill For', 'rcm-theme'),
    'intro' => __('Each dental specialty has its own CDT codes, carrier rules and documentation needs. Pick yours to see the billing problems we plan for.', 'rcm-theme'),
]);
?>
<section class="py-14 sm:py-16">
    <div class="container">
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
<?php
rcm_t_cta_band(['title' => __('Do not see your type of dental practice?', 'rcm-theme'), 'text' => __('Tell us about your office and we will tell you honestly whether we are a good fit.', 'rcm-theme')]);
get_footer();
