<?php
/**
 * Single service page.
 */
defined('ABSPATH') || exit;
get_header();
the_post();
$p = get_post();
$d = rcm_t_item($p)['data'];
$key = rcm_t_has_plugin() ? RCM\Content_Types::key($p) : $p->post_name;
$cat = rcm_t_has_plugin() ? (RCM\Content_Types::SERVICE_CATEGORIES[RCM\Content_Types::service_category($p)][0] ?? '') : '';
$short = $d['shortName'] ?? get_the_title();
$consult = add_query_arg('service', $key, rcm_t_url('consultation'));
$practices = rcm_t_by_keys('rcm_specialty', (array) ($d['practiceTypes'] ?? []));
$related = rcm_t_by_keys('rcm_service', (array) ($d['relatedServices'] ?? []));
$name = get_the_title();
$question = sprintf(__('What is %s?', 'rcm-theme'), str_starts_with(strtolower($name), 'end-to-end') ? __('end-to-end revenue cycle management', 'rcm-theme') : strtolower($name));

rcm_t_part('page-hero', [
    'eyebrow' => $cat,
    'title' => $name,
    'intro' => $p->post_excerpt,
    'icon' => $d['icon'] ?? '',
    'actions' => '<a href="' . esc_url($consult) . '" class="btn-primary" data-rcm-cta="service-hero">' . esc_html__('Get a Free Consultation', 'rcm-theme') . '</a><a href="#scope" class="btn-ghost-light">' . esc_html__('What is included', 'rcm-theme') . '</a>',
]);
?>
<section class="py-14 sm:py-20">
    <div class="container grid gap-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div class="min-w-0 space-y-14">
            <?php rcm_t_part('quick-answer', ['question' => $question, 'answer' => $d['definition'] ?? '']); ?>

            <?php if (!empty($d['intro'])) : ?>
                <div class="prose-rcm max-w-none"><?php foreach ((array) $d['intro'] as $para) : ?><p><?php echo esc_html($para); ?></p><?php endforeach; ?></div>
            <?php endif; ?>

            <?php if (!empty($d['scope'])) : ?>
                <section id="scope" aria-labelledby="scope-h" class="scroll-mt-24">
                    <h2 id="scope-h" class="text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('What our %s service covers', 'rcm-theme'), esc_html(strtolower($short))); ?></h2>
                    <p class="mb-6 mt-2 text-ink-muted"><?php esc_html_e('The exact scope is agreed in writing for each practice. Typical tasks include:', 'rcm-theme'); ?></p>
                    <?php rcm_t_part('check-list', ['items' => $d['scope']]); ?>
                </section>
            <?php endif; ?>

            <?php if (!empty($d['workflow'])) : ?>
                <section aria-labelledby="workflow-h">
                    <h2 id="workflow-h" class="mb-8 text-2xl font-bold sm:text-3xl"><?php esc_html_e('How the work runs', 'rcm-theme'); ?></h2>
                    <?php rcm_t_part('timeline', ['steps' => $d['workflow']]); ?>
                </section>
            <?php endif; ?>

            <?php if (!empty($d['benefits'])) : ?>
                <section aria-labelledby="benefits-h">
                    <h2 id="benefits-h" class="text-2xl font-bold sm:text-3xl"><?php esc_html_e('What this work is designed to improve', 'rcm-theme'); ?></h2>
                    <p class="mb-6 mt-2 text-ink-muted"><?php esc_html_e('Potential benefits depend on your starting point, payer mix and how your team and ours share the work. We do not promise specific results.', 'rcm-theme'); ?></p>
                    <div class="grid gap-4 sm:grid-cols-2">
                        <?php foreach ((array) $d['benefits'] as $b) : ?>
                            <div class="card p-5"><h3 class="text-[17px] font-semibold"><?php echo esc_html($b['title']); ?></h3><p class="mt-1.5 text-[15px] leading-relaxed text-ink-muted"><?php echo esc_html($b['detail']); ?></p></div>
                        <?php endforeach; ?>
                    </div>
                </section>
            <?php endif; ?>

            <?php if ($practices) : ?>
                <section aria-labelledby="practices-h">
                    <h2 id="practices-h" class="text-2xl font-bold sm:text-3xl"><?php esc_html_e('Practices that often need this service', 'rcm-theme'); ?></h2>
                    <ul class="mt-5 flex flex-wrap gap-2">
                        <?php foreach ($practices as $sp) : $si = rcm_t_item($sp); ?>
                            <li><a href="<?php echo esc_url($si['url']); ?>" class="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-sm font-medium text-navy-800 hover:border-teal-300 hover:bg-teal-50"><?php rcm_t_icon($si['icon'], 'h-4 w-4 text-teal-600'); ?> <?php echo esc_html($si['title']); ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </section>
            <?php endif; ?>

            <?php if (!empty($d['faqs'])) : ?>
                <section aria-labelledby="faq-h">
                    <h2 id="faq-h" class="mb-6 text-2xl font-bold sm:text-3xl"><?php printf(esc_html__('%s FAQs', 'rcm-theme'), esc_html($short)); ?></h2>
                    <?php rcm_t_faqs((array) $d['faqs']); ?>
                </section>
            <?php endif; ?>
            <?php rcm_t_reviewed(get_the_modified_date('Y-m-d')); ?>
        </div>
        <aside class="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <?php rcm_t_part('side-cta', ['service' => $key]); ?>
            <?php rcm_t_part('related-tools', ['keys' => (array) ($d['relatedTools'] ?? [])]); ?>
        </aside>
    </div>
</section>

<?php if ($related) : ?>
<section class="bg-canvas py-14 sm:py-16">
    <div class="container">
        <h2 class="mb-8 text-2xl font-bold sm:text-3xl"><?php esc_html_e('Related services', 'rcm-theme'); ?></h2>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <?php foreach ($related as $r) : $ri = rcm_t_item($r); rcm_t_link_card($ri['url'], $ri['title'], $ri['text'], $ri['icon']); endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<?php rcm_t_cta_band(['title' => sprintf(__('Talk to us about %s', 'rcm-theme'), strtolower($short)), 'primary' => [__('Get a Free Consultation', 'rcm-theme'), $consult]]); ?>
<?php get_footer(); ?>
