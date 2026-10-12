<?php
/**
 * Home page.
 */
defined('ABSPATH') || exit;
get_header();

$company = function_exists('rcm_data') ? rcm_data('company') : [];
$cycle = (array) ($company['CYCLE'] ?? []);
$home_faqs = (array) ($company['HOME_FAQS'] ?? []);
$services = rcm_t_all('rcm_service');
$specialties = rcm_t_all('rcm_specialty');
$tools = rcm_t_all('rcm_tool');
$calc_count = count(array_filter($tools, static fn($t) => (rcm_t_item($t)['data']['kind'] ?? '') === 'calculator'));
$featured = rcm_t_by_keys('rcm_service', ['revenue-cycle-management', 'medical-billing', 'medical-coding', 'dental-billing', 'denial-management', 'accounts-receivable-management', 'medical-credentialing', 'insurance-eligibility-verification']);
$featured_tools = rcm_t_by_keys('rcm_tool', ['rcm-roi-calculator', 'net-collection-rate-calculator', 'days-in-ar-calculator', 'denial-rate-calculator', 'outsourcing-vs-in-house-billing-calculator', 'icd-10-code-search']);
$posts = get_posts(['numberposts' => 3, 'post_status' => 'publish']);
$chat_on = class_exists('RCM\\Chat') && method_exists('RCM\\Chat', 'enabled') && RCM\Chat::enabled();
$show_cases = function_exists('rcm_setting') ? (bool) rcm_setting('home.show_case_studies', true) : false;
$show_testimonials = function_exists('rcm_setting') ? (bool) rcm_setting('home.show_testimonials', true) : false;
$cases = $show_cases && rcm_t_has_plugin() ? RCM\Content_Types::approved('rcm_case_study', 3) : [];
$testimonials = $show_testimonials && rcm_t_has_plugin() ? RCM\Content_Types::approved('rcm_testimonial', 3) : [];
$medical = array_values(array_filter($specialties, static fn($p) => !rcm_t_has_plugin() || RCM\Content_Types::specialty_kind($p) !== 'dental'));
$dental = array_values(array_filter($specialties, static fn($p) => rcm_t_has_plugin() && RCM\Content_Types::specialty_kind($p) === 'dental'));

$why = [
    ['Building2', __('We work inside your systems', 'rcm-theme'), __('Your practice management system, EHR, clearinghouse and payer portals stay yours. We log in with accounts you control and can switch off at any time.', 'rcm-theme')],
    ['Users', __('One team across the whole cycle', 'rcm-theme'), __('Eligibility, coding, claims, posting, denials and AR are handled by people who can see each other\'s work, so problems are fixed at the source.', 'rcm-theme')],
    ['LineChart', __('Reporting you can check', 'rcm-theme'), __('We report on the numbers that matter (collections, denials, days in AR, aging) from your own system data, so you can verify every figure.', 'rcm-theme')],
    ['Workflow', __('Built around your specialty and payers', 'rcm-theme'), __('Workflows follow your specialty\'s coding rules, your payer mix and your front-desk processes instead of a one-size template.', 'rcm-theme')],
    ['Lock', __('Careful with patient data', 'rcm-theme'), __('We sign a Business Associate Agreement before touching patient data, use named accounts with least-privilege access and keep PHI off email and chat.', 'rcm-theme')],
    ['Calculator', __('See the numbers first', 'rcm-theme'), __('Use our free calculators to estimate your collection rate, days in AR and the cost of billing in-house before you talk to anyone.', 'rcm-theme')],
];
$how = [
    [__('Free consultation', 'rcm-theme'), __('A call about how your billing runs today, your specialty, payers and the problems you want solved.', 'rcm-theme')],
    [__('Revenue cycle review', 'rcm-theme'), __('With read access, we look at aging, denials and workflows and share what we find, including what we would not change.', 'rcm-theme')],
    [__('Proposal and onboarding', 'rcm-theme'), __('A written scope and price. Then BAA, system access, payer enrollment checks and a documented handover plan.', 'rcm-theme')],
    [__('Daily operations', 'rcm-theme'), __('Our team works your queues every business day: eligibility, charges, claims, posting, denials and follow-up.', 'rcm-theme')],
    [__('Reporting and review', 'rcm-theme'), __('Regular KPI reports and review calls, with a running list of root causes and the fixes agreed with your team.', 'rcm-theme')],
];
$tech = [
    __('Claims on the 837P, 837I and 837D standards and remittances from 835 ERA files', 'rcm-theme'),
    __('Eligibility and claim status through your clearinghouse (270/271, 276/277) and payer portals', 'rcm-theme'),
    __('Work queues inside your PM/EHR, so every action is logged in your own system', 'rcm-theme'),
    __('Denial tracking by CARC/RARC and root cause, not just by payer', 'rcm-theme'),
    __('KPI reporting built from your system exports, reproducible by your team', 'rcm-theme'),
    __('Secure file exchange and named user accounts; no shared logins', 'rcm-theme'),
];
$journey = [
    ['ShieldCheck', __('Eligibility verified', 'rcm-theme'), __('Coverage, copay and deductible confirmed', 'rcm-theme'), 'done'],
    ['FileCheck2', __('Coded and charged', 'rcm-theme'), __('Diagnosis and procedure codes reviewed', 'rcm-theme'), 'done'],
    ['Search', __('Claim scrubbed', 'rcm-theme'), __('Payer edits checked before submission', 'rcm-theme'), 'done'],
    ['Send', __('Submitted (837P)', 'rcm-theme'), __('Accepted by clearinghouse and payer', 'rcm-theme'), 'active'],
    ['Wallet', __('Paid and posted', 'rcm-theme'), __('835 remittance matched and reconciled', 'rcm-theme'), 'next'],
];
?>

<!-- 1. Hero -->
<section class="relative overflow-hidden bg-gradient-to-b from-canvas to-white">
    <div class="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_top,black,transparent_75%)]" aria-hidden="true"></div>
    <div class="absolute -right-40 top-10 h-[28rem] w-[28rem] rounded-full bg-teal-200/40 blur-3xl" aria-hidden="true"></div>
    <div class="container relative grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:py-24">
        <div>
            <p class="chip mb-6"><span class="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden="true"></span> <?php esc_html_e('For US medical and dental practices', 'rcm-theme'); ?></p>
            <h1 class="text-[2.5rem] font-extrabold leading-[1.06] sm:text-6xl"><?php esc_html_e('Smarter revenue cycle management for', 'rcm-theme'); ?> <span class="text-teal-700"><?php esc_html_e('modern healthcare practices', 'rcm-theme'); ?></span></h1>
            <p class="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted sm:text-xl"><?php esc_html_e('Streamline billing operations, strengthen revenue cycle workflows, and give your team more time to focus on patient care.', 'rcm-theme'); ?></p>
            <div class="mt-8 flex flex-wrap gap-3">
                <a href="<?php echo esc_url(rcm_t_url('consultation')); ?>" class="btn-primary" data-rcm-cta="hero-consultation"><?php esc_html_e('Get a Free Consultation', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
                <a href="<?php echo esc_url(rcm_t_archive('rcm_service')); ?>" class="btn-outline" data-rcm-cta="hero-services"><?php esc_html_e('Explore Our Services', 'rcm-theme'); ?></a>
            </div>
            <ul class="mt-8 grid gap-2.5 text-[15px] text-navy-800 sm:grid-cols-2">
                <?php foreach ([__('Medical and dental billing', 'rcm-theme'), __('Denial and AR follow-up', 'rcm-theme'), __('Credentialing and enrollment', 'rcm-theme'), sprintf(__('%d free RCM calculators', 'rcm-theme'), $calc_count)] as $t) : ?>
                    <li class="flex items-center gap-2"><?php rcm_t_icon('CheckCircle2', 'h-4 w-4 shrink-0 text-teal-600'); ?> <?php echo esc_html($t); ?></li>
                <?php endforeach; ?>
            </ul>
        </div>

        <figure class="relative mx-auto w-full max-w-md lg:max-w-none">
            <div class="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-teal-100 via-white to-navy-100 opacity-70 blur-xl" aria-hidden="true"></div>
            <div class="relative rounded-3xl border border-line bg-white p-5 shadow-lift sm:p-7">
                <div class="flex items-center justify-between border-b border-line pb-4">
                    <div>
                        <p class="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle"><?php esc_html_e('Claim journey', 'rcm-theme'); ?></p>
                        <p class="mt-1 font-display text-lg font-bold text-navy-900"><?php esc_html_e('Office visit, commercial payer', 'rcm-theme'); ?></p>
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
            <figcaption class="sr-only"><?php esc_html_e('Illustration of a claim moving from eligibility verification through coding, scrubbing and submission to payment posting.', 'rcm-theme'); ?></figcaption>
        </figure>
    </div>
</section>

<!-- 2. Specialties -->
<section class="border-y border-line bg-white py-10" aria-labelledby="who-we-serve">
    <div class="container flex flex-col gap-6 lg:flex-row lg:items-center">
        <h2 id="who-we-serve" class="shrink-0 text-base font-semibold text-navy-900 lg:w-60"><?php printf(esc_html__('Billing support for %d medical and dental specialties', 'rcm-theme'), count($specialties)); ?></h2>
        <ul class="flex flex-wrap gap-2">
            <?php foreach (array_merge(array_slice($medical, 0, 12), array_slice($dental, 0, 4)) as $p) : ?>
                <li><a href="<?php echo esc_url(get_permalink($p)); ?>" class="chip transition hover:border-teal-300 hover:text-teal-800"><?php echo esc_html(get_the_title($p)); ?></a></li>
            <?php endforeach; ?>
            <li><a href="<?php echo esc_url(rcm_t_archive('rcm_specialty')); ?>" class="chip border-teal-200 bg-teal-50 font-semibold text-teal-800"><?php esc_html_e('All specialties', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-3 w-3'); ?></a></li>
        </ul>
    </div>
</section>

<!-- 3. Revenue cycle overview (interactive) -->
<?php if ($cycle) : ?>
<section class="bg-canvas py-16 sm:py-20 lg:py-24" id="revenue-cycle">
    <div class="container">
        <div class="mb-10 max-w-3xl">
            <p class="eyebrow mb-3"><?php esc_html_e('The revenue cycle', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Every step between the appointment and the final payment', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg leading-relaxed text-ink-muted"><?php esc_html_e('Revenue cycle management (RCM) is the process a practice uses to get paid for patient care: verifying coverage, documenting and coding the visit, submitting claims, posting payments, working denials and collecting patient balances. A weak step anywhere shows up later as denials, delays or write-offs.', 'rcm-theme'); ?></p>
        </div>
        <div data-rcm-cycle class="grid gap-6 lg:grid-cols-[320px_1fr]">
            <div role="tablist" aria-label="<?php esc_attr_e('Revenue cycle phases', 'rcm-theme'); ?>" class="flex gap-2 overflow-x-auto lg:flex-col">
                <?php foreach ($cycle as $i => $phase) : ?>
                    <button type="button" role="tab" id="cycle-tab-<?php echo (int) $i; ?>" aria-controls="cycle-panel-<?php echo (int) $i; ?>" aria-selected="<?php echo $i === 0 ? 'true' : 'false'; ?>" tabindex="<?php echo $i === 0 ? '0' : '-1'; ?>"
                        class="group flex min-w-[220px] items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left transition aria-selected:border-teal-400 aria-selected:shadow-card">
                        <span class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-navy-50 font-display text-lg font-extrabold text-navy-700 group-aria-selected:bg-teal-700 group-aria-selected:text-white">0<?php echo (int) $i + 1; ?></span>
                        <span>
                            <span class="block text-xs font-semibold uppercase tracking-[0.12em] text-teal-700"><?php echo esc_html($phase['eyebrow']); ?></span>
                            <span class="block text-lg font-bold text-navy-900"><?php echo esc_html($phase['title']); ?></span>
                        </span>
                    </button>
                <?php endforeach; ?>
            </div>
            <?php foreach ($cycle as $i => $phase) : ?>
                <div role="tabpanel" id="cycle-panel-<?php echo (int) $i; ?>" aria-labelledby="cycle-tab-<?php echo (int) $i; ?>" class="card p-6 sm:p-8" <?php echo $i === 0 ? '' : 'hidden'; ?>>
                    <h3 class="text-2xl font-bold"><?php echo esc_html($phase['title']); ?>: <?php echo esc_html(strtolower($phase['eyebrow'])); ?></h3>
                    <p class="mt-2 max-w-2xl text-[16px] text-ink-muted"><?php echo esc_html($phase['text']); ?></p>
                    <ol class="mt-6 grid gap-3 sm:grid-cols-2">
                        <?php foreach ($phase['steps'] as $j => $step) :
                            $sp = rcm_t_has_plugin() ? RCM\Content_Types::by_key('rcm_service', $step['slug']) : null;
                            $url = $sp ? get_permalink($sp) : rcm_t_archive('rcm_service');
                            ?>
                            <li>
                                <a href="<?php echo esc_url($url); ?>" class="group flex h-full items-start gap-3 rounded-xl border border-line p-4 transition hover:border-teal-300 hover:bg-teal-50">
                                    <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xs font-bold text-white"><?php echo (int) $j + 1; ?></span>
                                    <span class="flex-1">
                                        <span class="block font-semibold text-navy-900 group-hover:text-teal-800"><?php echo esc_html($step['label']); ?></span>
                                        <?php if ($sp) : ?><span class="mt-1 block text-sm text-ink-muted"><?php echo esc_html(wp_trim_words($sp->post_excerpt, 16)); ?></span><?php endif; ?>
                                    </span>
                                    <?php rcm_t_icon('ArrowRight', 'mt-1 h-4 w-4 text-teal-600'); ?>
                                </a>
                            </li>
                        <?php endforeach; ?>
                    </ol>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- 4. Featured services -->
<section class="py-16 sm:py-20 lg:py-24" id="services">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div class="max-w-3xl">
                <p class="eyebrow mb-3"><?php esc_html_e('Services', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('RCM services you can take as a full program or one piece at a time', 'rcm-theme'); ?></h2>
            </div>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_service')); ?>" class="btn-outline btn-sm shrink-0"><?php printf(esc_html__('All %d services', 'rcm-theme'), count($services)); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <?php foreach ($featured as $p) : $i = rcm_t_item($p); rcm_t_link_card($i['url'], $i['title'], $i['text'], $i['icon']); endforeach; ?>
        </div>
    </div>
</section>

<!-- 5. Why choose us -->
<section class="relative overflow-hidden bg-navy-950 py-16 text-white sm:py-20 lg:py-24">
    <div class="container">
        <div class="mb-10 max-w-3xl">
            <p class="eyebrow mb-3 text-teal-300"><?php esc_html_e('Why Texas Solutions RCM', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold text-white sm:text-4xl"><?php esc_html_e('Plain answers, your own data, and a team that owns the follow-up', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-navy-200"><?php esc_html_e('We would rather show you how we work than make promises. Here is what working with us looks like.', 'rcm-theme'); ?></p>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <?php foreach ($why as [$icon, $title, $text]) : ?>
                <div class="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                    <?php rcm_t_icon($icon, 'h-6 w-6 text-teal-300'); ?>
                    <h3 class="mt-4 text-lg font-semibold text-white"><?php echo esc_html($title); ?></h3>
                    <p class="mt-2 text-[15px] leading-relaxed text-navy-200"><?php echo esc_html($text); ?></p>
                </div>
            <?php endforeach; ?>
        </div>
        <a href="<?php echo esc_url(rcm_t_url('why-choose-us')); ?>" class="btn-ghost-light mt-10"><?php esc_html_e('Why practices choose us', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
    </div>
</section>

<!-- 6. Workflow -->
<section class="py-16 sm:py-20 lg:py-24" id="how-we-work">
    <div class="container">
        <div class="mx-auto mb-12 max-w-3xl text-center">
            <p class="eyebrow mb-3"><?php esc_html_e('How we work', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('From first call to steady-state operations', 'rcm-theme'); ?></h2>
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

<!-- 7. Tools preview -->
<section class="bg-canvas py-16 sm:py-20 lg:py-24" id="tools">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div class="max-w-3xl">
                <p class="eyebrow mb-3"><?php esc_html_e('Free RCM tools', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Calculators and lookups your billing team can use today', 'rcm-theme'); ?></h2>
                <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('No sign-up. Every calculator shows its formula, a worked example and the assumptions behind it.', 'rcm-theme'); ?></p>
            </div>
            <a href="<?php echo esc_url(rcm_t_archive('rcm_tool')); ?>" class="btn-navy btn-sm shrink-0"><?php printf(esc_html__('Browse all %d tools', 'rcm-theme'), count($tools)); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <?php foreach ($featured_tools as $p) : $i = rcm_t_item($p); rcm_t_link_card($i['url'], $i['title'], $i['text'], $i['icon'], '', __('Open tool', 'rcm-theme')); endforeach; ?>
        </div>
    </div>
</section>

<!-- 8. Technology -->
<section class="py-16 sm:py-20 lg:py-24">
    <div class="container grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
            <p class="eyebrow mb-3"><?php esc_html_e('Technology and workflows', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Standard transactions, your systems, full audit trail', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('We do not ask you to change software. Our team works in the tools you already use and follows the electronic transaction standards every US payer uses.', 'rcm-theme'); ?></p>
            <a href="<?php echo esc_url(rcm_t_url('technology')); ?>" class="btn-outline btn-sm mt-8"><?php esc_html_e('Technology and integrations', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <ul class="grid gap-3">
            <?php foreach ($tech as $t) : ?>
                <li class="card flex items-start gap-3 p-4"><?php rcm_t_icon('ShieldCheck', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?><span class="text-[15px] text-navy-800"><?php echo esc_html($t); ?></span></li>
            <?php endforeach; ?>
        </ul>
    </div>
</section>

<!-- 9. Verified client results (approved items only) -->
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

<!-- 10. AI assistant -->
<?php if ($chat_on) : ?>
<section class="pb-4 pt-16">
    <div class="container">
        <div class="flex flex-col items-start gap-6 rounded-3xl border border-teal-200 bg-gradient-to-br from-teal-50 to-white p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div class="flex gap-4">
                <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-teal-700 text-white"><?php rcm_t_icon('MessageSquare', 'h-6 w-6'); ?></span>
                <div>
                    <h2 class="text-2xl font-bold"><?php esc_html_e('Have a billing question? Ask our AI assistant', 'rcm-theme'); ?></h2>
                    <p class="mt-2 max-w-2xl text-ink-muted"><?php esc_html_e('It can explain RCM terms, suggest the right service or calculator and book a consultation. It is an AI, it only answers from our published information, and it hands anything else to our team. Please do not share patient information in chat.', 'rcm-theme'); ?></p>
                </div>
            </div>
            <button type="button" class="btn-primary shrink-0" data-rcm-open-chat><?php esc_html_e('Start a chat', 'rcm-theme'); ?></button>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- 11. FAQs -->
<?php if ($home_faqs) : ?>
<section class="py-16 sm:py-20 lg:py-24" id="faq">
    <div class="container grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div>
            <p class="eyebrow mb-3"><?php esc_html_e('FAQs', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Questions practices ask before outsourcing billing', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-ink-muted"><?php printf(wp_kses_post(__('More answers on our <a href="%s" class="font-semibold text-teal-700 underline">FAQ page</a>.', 'rcm-theme')), esc_url(rcm_t_url('faq'))); ?></p>
        </div>
        <?php rcm_t_faqs($home_faqs); ?>
    </div>
</section>
<?php endif; ?>

<!-- 12. Blog -->
<?php if ($posts) : ?>
<section class="bg-canvas py-16 sm:py-20">
    <div class="container">
        <div class="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
                <p class="eyebrow mb-3"><?php esc_html_e('Insights', 'rcm-theme'); ?></p>
                <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Guides from the billing floor', 'rcm-theme'); ?></h2>
            </div>
            <a href="<?php echo esc_url(get_permalink((int) get_option('page_for_posts')) ?: home_url('/blog/')); ?>" class="btn-outline btn-sm shrink-0"><?php esc_html_e('All articles', 'rcm-theme'); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?></a>
        </div>
        <div class="grid gap-6 md:grid-cols-3">
            <?php foreach ($posts as $p) : rcm_t_part('post-card', ['post' => $p]); endforeach; ?>
        </div>
    </div>
</section>
<?php endif; ?>

<!-- 13. Consultation form -->
<section class="py-16 sm:py-20 lg:py-24" id="consultation">
    <div class="container grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div>
            <p class="eyebrow mb-3"><?php esc_html_e('Free consultation', 'rcm-theme'); ?></p>
            <h2 class="text-3xl font-bold sm:text-4xl"><?php esc_html_e('Tell us about your practice', 'rcm-theme'); ?></h2>
            <p class="mt-4 text-lg text-ink-muted"><?php esc_html_e('We will reply by email to arrange a call. There is no cost and no obligation, and we will tell you honestly if we are not the right fit.', 'rcm-theme'); ?></p>
            <ul class="mt-8 space-y-3 text-[15px] text-navy-800">
                <?php foreach ([__('A conversation with someone who understands billing operations', 'rcm-theme'), __('An honest view of where revenue is likely slipping', 'rcm-theme'), __('A written proposal only if you ask for one', 'rcm-theme')] as $t) : ?>
                    <li class="flex gap-2.5"><?php rcm_t_icon('CheckCircle2', 'mt-0.5 h-5 w-5 shrink-0 text-teal-600'); ?> <?php echo esc_html($t); ?></li>
                <?php endforeach; ?>
            </ul>
            <div class="mt-8 flex items-center gap-3 rounded-2xl bg-canvas p-4 text-sm text-ink-muted">
                <?php rcm_t_icon('ShieldAlert', 'h-5 w-5 shrink-0 text-amber-600'); ?>
                <?php esc_html_e('Never send patient records through this website. We will set up a secure channel and a BAA when work begins.', 'rcm-theme'); ?>
            </div>
        </div>
        <div class="card p-6 sm:p-8"><?php rcm_t_form('consultation'); ?></div>
    </div>
</section>

<?php get_footer(); ?>
