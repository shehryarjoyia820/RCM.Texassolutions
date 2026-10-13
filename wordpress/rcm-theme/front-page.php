<?php
/**
 * Home page (dental-only).
 */
defined('ABSPATH') || exit;
get_header();

$company = function_exists('rcm_data') ? rcm_data('company') : [];
$home_faqs = (array) ($company['HOME_FAQS'] ?? []);
$d = rcm_t_dental();
$show_cases = function_exists('rcm_setting') ? (bool) rcm_setting('home.show_case_studies', true) : false;
$show_testimonials = function_exists('rcm_setting') ? (bool) rcm_setting('home.show_testimonials', true) : false;
$cases = $show_cases && rcm_t_has_plugin() ? RCM\Content_Types::approved('rcm_case_study', 3) : [];
$testimonials = $show_testimonials && rcm_t_has_plugin() ? RCM\Content_Types::approved('rcm_testimonial', 3) : [];
$specialties = rcm_t_by_keys('rcm_specialty', $d['specialties']);
$software = rcm_t_by_keys('rcm_service', $d['software']);
$tools = array_slice(rcm_t_by_keys('rcm_tool', $d['dentalTools']), 0, 6);
$posts = $d['dentalPosts'] ? get_posts(['numberposts' => 3, 'post_status' => 'publish', 'post_name__in' => $d['dentalPosts']]) : [];
$core = [];
foreach ($d['core'] as $c) {
    $p = rcm_t_has_plugin() ? RCM\Content_Types::by_key('rcm_service', $c['slug']) : null;
    if ($p) {
        $core[] = ['post' => $p, 'name' => $c['name'], 'subs' => $c['subs'], 'icon' => rcm_t_item($p)['icon']];
    }
}

$how = [
    [__('Free consultation', 'rcm-theme'), __('A call about how billing runs in your dental office today, your carriers, your software and the problems you want solved.', 'rcm-theme')],
    [__('Billing review', 'rcm-theme'), __('With read access, we look at A/R aging, denials and workflows and share what we find, including what we would not change.', 'rcm-theme')],
    [__('Proposal and onboarding', 'rcm-theme'), __('A written scope and price. Then a BAA, named logins to your dental software and portals, and a documented handover plan.', 'rcm-theme')],
    [__('Daily operations', 'rcm-theme'), __('Our team works your queues every business day: verification, claims, attachments, posting, denials and follow-up.', 'rcm-theme')],
    [__('Reporting and review', 'rcm-theme'), __('Regular reports and review calls, with a running list of root causes and the fixes agreed with your team.', 'rcm-theme')],
];
$journey = [
    ['ShieldCheck', __('Benefits verified', 'rcm-theme'), __('Eligibility, frequencies and annual maximum checked', 'rcm-theme'), 'done'],
    ['FileCheck2', __('CDT coded', 'rcm-theme'), __('Procedure codes matched to the clinical notes', 'rcm-theme'), 'done'],
    ['Paperclip', __('Attachments added', 'rcm-theme'), __('X-rays, perio charting and narrative attached', 'rcm-theme'), 'done'],
    ['Send', __('Claim submitted', 'rcm-theme'), __('Accepted by the clearinghouse and carrier', 'rcm-theme'), 'active'],
    ['Wallet', __('EOB posted', 'rcm-theme'), __('Payment and adjustments posted to the ledger', 'rcm-theme'), 'next'],
];
?>

<!-- 1. Hero -->
<section class="relative overflow-hidden bg-gradient-to-b from-canvas to-white">
    <div class="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true"></div>
    <div class="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-teal-200/40 blur-3xl" aria-hidden="true"></div>
    <div class="container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
            <p class="chip mb-6"><span class="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true"></span> <?php esc_html_e('For dental practices across the USA', 'rcm-theme'); ?></p>
            <h1 class="text-[2.4rem] font-extrabold leading-[1.08] sm:text-[3.4rem]"><?php esc_html_e('Dental billing and revenue cycle management for', 'rcm-theme'); ?> <span class="text-teal-700"><?php esc_html_e('US dental practices', 'rcm-theme'); ?></span></h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"><?php esc_html_e('We provide comprehensive Dental Revenue Cycle Management (RCM) solutions to help dental practices streamline billing operations, reduce claim denials, improve collections, and maximize revenue.', 'rcm-theme'); ?></p>
            <div class="mt-8 flex flex-wrap gap-3">
                <a href="<?php echo esc_url(rcm_t_url('consultation')); ?>" class="btn-primary" data-rcm-cta="hero-consultation"><?php esc_html_e('Get a Free Consultation', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
                <a href="#services" class="btn-outline" data-rcm-cta="hero-services"><?php esc_html_e('See Our Dental RCM Services', 'rcm-theme'); ?></a>
            </div>
            <ul class="mt-8 grid gap-2.5 text-[15px] text-navy-800 sm:grid-cols-2">
                <?php foreach ([__('Insurance verification', 'rcm-theme'), __('Dental claims and denials', 'rcm-theme'), __('A/R follow-up', 'rcm-theme'), __('Credentialing', 'rcm-theme')] as $t) : ?>
                    <li class="flex items-center gap-2"><?php rcm_t_icon('CheckCircle2', 'h-4 w-4 shrink-0 text-teal-600'); ?> <?php echo esc_html($t); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>

        <figure class="relative mx-auto w-full max-w-md lg:max-w-none">
            <div class="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-100 via-white to-navy-100 opacity-70 blur-xl" aria-hidden="true"></div>
            <div class="relative rounded-3xl border border-line bg-white p-5 shadow-lift sm:p-7">
                <div class="flex items-center justify-between border-b border-line pb-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle"><?php esc_html_e('Dental claim journey', 'rcm-theme'); ?></p>
                        <p class="mt-1 font-display text-lg font-bold text-navy-900"><?php esc_html_e('Crown, dental PPO plan', 'rcm-theme'); ?></p>
                    </div>
                    <span class="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-600"><?php rcm_t_icon('Clock3', 'h-3.5 w-3.5'); ?> <?php esc_html_e('In process', 'rcm-theme'); ?></span>
                </div>
                <ol class="mt-5 space-y-1">
                    <?php foreach ($journey as $i => [$icon, $label, $detail, $state]) : ?>
                        <li class="relative flex gap-4 pb-4 last:pb-0">
                            <?php if ($i < count($journey) - 1) : ?><span class="absolute left-[19px] top-10 h-[calc(100%-2.25rem)] w-0.5 <?php echo $state === 'done' ? 'bg-teal-400' : 'bg-line'; ?>" aria-hidden="true"></span><?php endif; ?>
                            <span class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl <?php echo $state === 'done' ? 'bg-teal-600 text-white' : ($state === 'active' ? 'bg-navy-900 text-white ring-4 ring-teal-200 motion-safe:animate-pulse' : 'border border-dashed border-navy-200 bg-white text-navy-300'); ?>">
                                <?php rcm_t_icon($state === 'done' ? 'Check' : $icon, 'h-5 w-5'); ?>
                            </span>
                            <div class="pt-0.5">
                                <p class="text-[15px] font-semibold <?php echo $state === 'next' ? 'text-ink-subtle' : 'text-navy-900'; ?>"><?php echo esc_html($label); ?></p>
                                <p class="text-sm text-ink-muted"><?php echo esc_html($detail); ?></p>
                            </div>
                        </li>
                    <?php endforeach; ?>
                </ol>
            </div>
            <figcaption class="sr-only"><?php esc_html_e('Illustration of a dental claim moving from benefits verification through CDT coding, attachments and submission to EOB posting.', 'rcm-theme'); ?></figcaption>
        </figure>
    </div>
</section>

<!-- 2. Services: the 8 core dental RCM services with their sub-services -->
<section class="py-16 sm:py-20 lg:py-24" id="services">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div class="max-w-3xl">
                <p class="eyebrow mb-3"><?php esc_html_e('Dental billing and RCM services', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Dental billing services that cover the whole revenue cycle', 'rcm-theme'); ?></h2>
                <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('Use us as your dental billing company for the full cycle, or outsource only the pieces your office needs help with, from dental insurance verification to dental credentialing.', 'rcm-theme'); ?></p>
            </div>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_service')); ?>" class="btn-outline btn-sm shrink-0"><?php esc_html_e('All dental services', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <?php foreach ($core as $c) : ?>
                <a href="<?php echo esc_url(get_permalink($c['post'])); ?>" class="card group flex flex-col p-6 transition hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lift">
                    <span class="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-700 ring-1 ring-teal-100"><?php rcm_t_icon($c['icon'], 'h-5 w-5'); ?></span>
                    <h3 class="mt-4 text-lg font-semibold leading-snug text-navy-900 group-hover:text-teal-800"><?php echo esc_html($c['name']); ?></h3>
                    <ul class="mt-3 flex-1 space-y-1.5 text-sm text-ink-muted">
                        <?php foreach ($c['subs'] as $sub) : ?>
                            <li class="flex gap-2"><?php rcm_t_icon('Check', 'mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600'); ?> <?php echo esc_html($sub); ?></li>
                        <?php endforeach; ?>
                    </ul>
                    <span class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700"><?php esc_html_e('Learn more', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-3.5 w-3.5'); ?></span>
                </a>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- 3. Dental specialties -->
<?php if ($specialties) : ?>
<section class="border-y border-line bg-white py-10" aria-labelledby="who-we-serve">
    <div class="container flex flex-col gap-6 lg:flex-row lg:items-center">
        <h2 id="who-we-serve" class="shrink-0 text-xl font-bold text-navy-900 lg:w-64"><?php esc_html_e('Dental specialties we bill for', 'rcm-theme'); ?></h2>
        <ul class="flex flex-wrap gap-2">
            <?php foreach ($specialties as $p) : ?>
                <li><a href="<?php echo esc_url(get_permalink($p)); ?>" class="chip transition hover:border-teal-300 hover:text-teal-800"><?php echo esc_html(get_the_title($p)); ?></a></li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>
<?php endif; ?>

<!-- 4. Dental software -->
<?php if ($software) : ?>
<section class="bg-canvas py-16 sm:py-20" id="software">
    <div class="container">
        <div class="mb-10 max-w-3xl">
            <p class="eyebrow mb-3"><?php esc_html_e('Dental software', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('We work in your dental software', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('No new system to learn. Our team works inside the dental practice management software, clearinghouse and carrier portals you already use, with named accounts you control.', 'rcm-theme'); ?></p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <?php foreach ($software as $p) : $i = rcm_t_item($p); rcm_t_link_card($i['url'], $i['title'], $i['text'], $i['icon']); endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- 5. How we work -->
<section class="py-16 sm:py-20 lg:py-24" id="how-we-work">
    <div class="container">
        <div class="mx-auto mb-12 max-w-3xl text-center">
            <p class="eyebrow mb-3"><?php esc_html_e('How we work', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('From first call to steady daily billing', 'rcm-theme'); ?></h2>
        </div>
        <ol class="relative grid gap-6 lg:grid-cols-5">
            <li class="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200 lg:block" aria-hidden="true"></li>
            <?php foreach ($how as $i => [$title, $text]) : ?>
                <li class="relative flex gap-4 lg:block lg:text-center">
                    <span class="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy-900 font-display text-lg font-bold text-white ring-8 ring-white lg:mx-auto"><?php echo (int) $i + 1; ?></span>
                    <div>
                        <h3 class="text-lg font-semibold lg:mt-4"><?php echo esc_html($title); ?></h3>
                        <p class="mt-1.5 text-[15px] text-ink-muted"><?php echo esc_html($text); ?></p>
                    </div>
                </li>
            <?php endforeach; ?>
        </ol>
        <p class="mt-10 text-center"><a href="<?php echo esc_url(rcm_t_url('how-we-work')); ?>" class="font-semibold text-teal-700 underline-offset-4 hover:underline"><?php esc_html_e('See the full onboarding process', 'rcm-theme'); ?></a></p>
    </div>
</section>

<!-- 6. Dental tools -->
<?php if ($tools) : ?>
<section class="bg-canvas py-16 sm:py-20 lg:py-24" id="tools">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div class="max-w-3xl">
                <p class="eyebrow mb-3"><?php esc_html_e('Free dental billing tools', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Calculators and checklists for dental offices', 'rcm-theme'); ?></h2>
                <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('No sign-up. Every calculator shows its formula, a worked example and the assumptions behind it.', 'rcm-theme'); ?></p>
            </div>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>" class="btn-navy btn-sm shrink-0"><?php esc_html_e('All free tools', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <?php foreach ($tools as $p) : $i = rcm_t_item($p); rcm_t_link_card($i['url'], $i['title'], $i['text'], $i['icon'], '', __('Open tool', 'rcm-theme')); endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- Results: hidden until approved, real items exist -->
<?php if ($cases || $testimonials) : ?>
<section class="bg-canvas py-16 sm:py-20">
    <div class="container">
        <div class="mb-10 max-w-3xl">
            <p class="eyebrow mb-3"><?php esc_html_e('Client results', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('What practices say about working with us', 'rcm-theme'); ?></h2>
        </div>
        <?php if ($cases) : ?>
            <div class="grid gap-5 md:grid-cols-3">
                <?php foreach ($cases as $p) : rcm_t_link_card(get_permalink($p), get_the_title($p), get_the_excerpt($p), 'LineChart', __('Case study', 'rcm-theme'), __('Read the case study', 'rcm-theme')); endforeach; ?>
            </div>
        <?php endif; ?>
        <?php if ($testimonials) : ?>
            <div class="mt-6 grid gap-5 md:grid-cols-3">
                <?php foreach ($testimonials as $p) : ?>
                    <figure class="card p-6">
                        <?php rcm_t_icon('Quote', 'h-6 w-6 text-teal-500'); ?>
                        <blockquote class="mt-3 text-[16px] leading-relaxed text-navy-800"><?php echo wp_kses_post(wpautop($p->post_content)); ?></blockquote>
                        <figcaption class="mt-4 text-sm font-semibold text-navy-900"><?php echo esc_html(get_the_title($p)); ?><?php $org = (string) get_post_meta($p->ID, '_rcm_org', true); echo $org ? '<span class="block font-normal text-ink-subtle">' . esc_html($org) . '</span>' : ''; ?></figcaption>
                    </figure>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</section>
<?php endif; ?>

<!-- 6. FAQs (schema built from the same HOME_FAQS) -->
<?php if ($home_faqs) : ?>
<section class="py-16 sm:py-20 lg:py-24" id="faq">
    <div class="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
            <p class="eyebrow mb-3"><?php esc_html_e('FAQs', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Questions dental practices ask before outsourcing billing', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-ink-muted"><?php printf(wp_kses_post(__('More answers on our <a href="%s" class="font-semibold text-teal-700 underline">FAQ page</a>.', 'rcm-theme')), esc_url(rcm_t_url('faq'))); ?></p>
        </div>
        <?php rcm_t_faqs($home_faqs); ?>
    </div>
</section>
<?php endif; ?>

<!-- 7. Latest dental blog posts -->
<?php if ($posts) : ?>
<section class="bg-canvas py-16 sm:py-20">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <p class="eyebrow mb-3"><?php esc_html_e('Dental billing blog', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Latest dental billing guides', 'rcm-theme'); ?></h2>
            </div>
            <a href="<?php echo esc_url(rcm_t_blog_url()); ?>" class="btn-outline btn-sm shrink-0"><?php esc_html_e('All articles', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
            <?php foreach ($posts as $p) : rcm_t_part('post-card', ['post' => $p]); endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- 8. Closing CTA -->
<section class="py-16 sm:py-20 lg:py-24">
    <div class="container">
        <div class="relative overflow-hidden rounded-3xl bg-navy-950 px-6 py-14 text-center text-white sm:px-12">
            <div class="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/20 blur-3xl" aria-hidden="true"></div>
            <h2 class="relative text-3xl font-bold text-white sm:text-4xl"><?php esc_html_e('Let Us Simplify Your Dental Billing', 'rcm-theme'); ?></h2>
            <p class="relative mx-auto mt-4 max-w-2xl text-lg text-navy-200"><?php esc_html_e('Focus on providing exceptional patient care while we help manage your dental billing and revenue cycle operations.', 'rcm-theme'); ?></p>
            <a href="<?php echo esc_url(rcm_t_url('consultation')); ?>" class="btn-primary relative mt-8" data-rcm-cta="home-closing"><?php esc_html_e('Partner With Us Today', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
    </div>
</section>

<?php get_footer(); ?>
