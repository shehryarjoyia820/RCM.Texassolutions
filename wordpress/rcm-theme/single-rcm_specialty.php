<?php
/**
 * Single specialty page.
 */
defined('ABSPATH') || exit;
get_header();
the_post();
$p = get_post();
$d = rcm_t_item($p)['data'];
$kind = rcm_t_has_plugin() ? RCM\Content_Types::specialty_kind($p) : 'medical';
$name = get_the_title();
$lname = strtolower($name);
$services = rcm_t_by_keys('rcm_service', (array) ($d['services'] ?? []));
$siblings = array_slice(array_values(array_filter(rcm_t_all('rcm_specialty'), static fn($x) => $x->ID !== $p->ID && (!rcm_t_has_plugin() || RCM\Content_Types::specialty_kind($x) === $kind))), 0, 10);

rcm_t_part('page-hero', [
    'eyebrow' => $kind === 'dental' ? __('Dental billing by specialty', 'rcm-theme') : __('Medical billing by specialty', 'rcm-theme'),
    'title' => sprintf(__('%s billing and RCM', 'rcm-theme'), $name),
    'intro' => $p->post_excerpt,
    'icon' => $d['icon'] ?? '',
    'actions' => '<a href="' . esc_url(rcm_t_url('consultation')) . '" class="btn-primary" data-rcm-cta="specialty-hero">' . esc_html__('Get a Free Consultation', 'rcm-theme') . '</a>',
]);
?>
<section class="py-14 sm:py-20">
    <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div class="min-w-0 space-y-14">
            <?php rcm_t_part('quick-answer', ['question' => sprintf(__('What does %s billing involve?', 'rcm-theme'), $lname), 'answer' => $d['definition'] ?? '']); ?>
            <?php if (!empty($d['intro'])) : ?>
                <div class="prose-rcm max-w-none"><?php foreach ((array) $d['intro'] as $para) : ?><p><?php echo esc_html($para); ?></p><?php endforeach; ?></div>
            <?php endif; ?>

            <?php if (!empty($d['challenges'])) : ?>
                <section aria-labelledby="challenges-h">
                    <h2 id="challenges-h" class="text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('Billing challenges in %s', 'rcm-theme'), esc_html($lname)); ?></h2>
                    <div class="mt-6 grid gap-4 sm:grid-cols-2">
                        <?php foreach ((array) $d['challenges'] as $c) : ?>
                            <div class="card p-5">
                                <?php rcm_t_icon('AlertTriangle', 'h-5 w-5 text-amber-500'); ?>
                                <h3 class="mt-3 text-[17px] font-semibold"><?php echo esc_html($c['title']); ?></h3>
                                <p class="mt-1.5 text-[15px] leading-relaxed text-ink-muted"><?php echo esc_html($c['detail']); ?></p>
                            </div>
                        <?php endforeach; ?>
                    </div>
                </section>
            <?php endif; ?>

            <?php if (!empty($d['payerWorkflow'])) : ?>
                <section aria-labelledby="payer-h">
                    <h2 id="payer-h" class="text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('How %s claims typically move', 'rcm-theme'), esc_html($lname)); ?></h2>
                    <p class="mb-6 mt-2 text-ink-muted"><?php esc_html_e('Payer rules differ by plan and state; these are the workflow points we check for this specialty.', 'rcm-theme'); ?></p>
                    <?php rcm_t_part('check-list', ['items' => $d['payerWorkflow'], 'cols' => 1]); ?>
                </section>
            <?php endif; ?>

            <?php if ($services) : ?>
                <section aria-labelledby="svc-h">
                    <h2 id="svc-h" class="mb-6 text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('Services that fit %s practices', 'rcm-theme'), esc_html($lname)); ?></h2>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <?php foreach ($services as $s) : $si = rcm_t_item($s); rcm_t_link_card($si['url'], $si['title'], $si['text'], $si['icon']); endforeach; ?>
                    </div>
                </section>
            <?php endif; ?>

            <?php if (!empty($d['faqs'])) : ?>
                <section aria-labelledby="faq-h">
                    <h2 id="faq-h" class="mb-6 text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('%s billing FAQs', 'rcm-theme'), esc_html($name)); ?></h2>
                    <?php rcm_t_faqs((array) $d['faqs']); ?>
                </section>
            <?php endif; ?>
            <?php rcm_t_reviewed(get_the_modified_date('Y-m-d')); ?>
        </div>
        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <?php rcm_t_part('side-cta'); ?>
            <?php rcm_t_part('related-tools', ['keys' => (array) ($d['relatedTools'] ?? [])]); ?>
        </aside>
    </div>
</section>

<?php if ($siblings) : ?>
<section class="bg-canvas py-14">
    <div class="container">
        <h2 class="mb-6 text-2xl font-bold"><?php echo $kind === 'dental' ? esc_html__('Other dental specialties', 'rcm-theme') : esc_html__('Other medical specialties', 'rcm-theme'); ?></h2>
        <ul class="flex flex-wrap gap-2">
            <?php foreach ($siblings as $x) : ?><li><a href="<?php echo esc_url(get_permalink($x)); ?>" class="chip hover:border-teal-300 hover:text-teal-800"><?php echo esc_html(get_the_title($x)); ?></a></li><?php endforeach; ?>
            <li><a href="<?php echo esc_url(rcm_t_archive('rcm_specialty')); ?>" class="chip border-teal-200 bg-teal-50 font-semibold text-teal-800"><?php esc_html_e('All specialties', 'rcm-theme'); ?></a></li>
        </ul>
    </div>
</section>
<?php endif; ?>

<?php rcm_t_cta_band(['title' => sprintf(__('Billing help for your %s practice', 'rcm-theme'), $lname)]); ?>
<?php get_footer(); ?>
