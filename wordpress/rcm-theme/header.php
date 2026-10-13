<?php
/**
 * Site header with mega menus and mobile navigation (behaviour in src/js/nav.ts).
 */
defined('ABSPATH') || exit;
$nav = rcm_t_nav();
$contact = rcm_t_contact();
$consult = rcm_t_url('consultation');
$req = (string) wp_parse_url(home_url(add_query_arg([])), PHP_URL_PATH);
$is_active = static function (string $url) use ($req): bool {
    $p = (string) wp_parse_url($url, PHP_URL_PATH);
    return $p !== '' && $p !== '/' && str_starts_with($req, rtrim($p, '/'));
};
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo('charset'); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-lg focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-white"><?php esc_html_e('Skip to content', 'rcm-theme'); ?></a>

<header class="site-header sticky top-0 z-40 border-b border-transparent bg-white/95 backdrop-blur-xl transition-shadow [&.is-scrolled]:border-line [&.is-scrolled]:shadow-[0_6px_24px_-12px_rgba(15,31,63,.18)]" data-rcm-header>
    <div class="container flex h-[72px] items-center justify-between gap-6">
        <a href="<?php echo esc_url(home_url('/')); ?>" class="shrink-0" aria-label="<?php esc_attr_e('Texas Solutions RCM home', 'rcm-theme'); ?>">
            <?php rcm_t_part('logo'); ?>
        </a>

        <nav aria-label="<?php esc_attr_e('Main', 'rcm-theme'); ?>" class="hidden lg:block">
            <ul class="flex items-center gap-0.5">
                <?php foreach ($nav as $i => $item) :
                    $active = $is_active($item['url']);
                    if (!empty($item['groups'])) :
                        $panel = 'rcm-menu-' . $i;
                        $wide = !empty($item['wide']);
                        ?>
                        <li class="relative">
                            <button type="button" class="flex items-center gap-1 rounded-lg px-3 py-2 text-[15px] font-medium transition hover:bg-canvas <?php echo $active ? 'text-teal-700' : 'text-navy-900'; ?>" aria-expanded="false" aria-controls="<?php echo esc_attr($panel); ?>" data-rcm-menu-trigger>
                                <?php echo esc_html($item['label']); ?>
                                <?php rcm_t_icon('ChevronDown', 'h-4 w-4 transition [[aria-expanded=true]>&]:rotate-180'); ?>
                            </button>
                            <div id="<?php echo esc_attr($panel); ?>" hidden data-rcm-menu-panel class="absolute top-full z-50 pt-3 <?php echo $wide ? 'left-1/2 w-[min(980px,92vw)] -translate-x-[38%]' : 'left-0 w-80'; ?>">
                                <div class="overflow-hidden rounded-2xl border border-line bg-white shadow-lift">
                                    <div class="grid gap-x-6 gap-y-5 p-5 <?php echo $wide ? 'grid-cols-3' : ''; ?>">
                                        <?php foreach ($item['groups'] as $g) : ?>
                                            <div>
                                                <?php if (count($item['groups']) > 1) : ?>
                                                    <p class="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                                                        <?php if (!empty($g['url'])) : ?><a href="<?php echo esc_url($g['url']); ?>" class="hover:text-teal-700"><?php echo esc_html($g['title']); ?></a><?php else : echo esc_html($g['title']); endif; ?>
                                                    </p>
                                                <?php endif; ?>
                                                <ul class="space-y-0.5">
                                                    <?php foreach ($g['links'] as $l) : ?>
                                                        <li>
                                                            <a href="<?php echo esc_url($l[1]); ?>" class="block rounded-lg px-2.5 py-1.5 text-[14px] text-navy-800 transition hover:bg-teal-50 hover:text-teal-800">
                                                                <?php echo esc_html($l[0]); ?>
                                                                <?php if (!empty($l[2])) : ?><span class="block text-xs text-ink-subtle"><?php echo esc_html($l[2]); ?></span><?php endif; ?>
                                                            </a>
                                                        </li>
                                                    <?php endforeach; ?>
                                                </ul>
                                            </div>
                                        <?php endforeach; ?>
                                    </div>
                                    <?php if (!empty($item['footer'])) : ?>
                                        <a href="<?php echo esc_url($item['footer'][1]); ?>" class="flex items-center justify-between border-t border-line bg-canvas px-5 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50">
                                            <?php echo esc_html($item['footer'][0]); ?> <?php rcm_t_icon('ArrowRight', 'h-4 w-4'); ?>
                                        </a>
                                    <?php endif; ?>
                                </div>
                            </div>
                        </li>
                    <?php else : ?>
                        <li><a href="<?php echo esc_url($item['url']); ?>" class="block rounded-lg px-3 py-2 text-[15px] font-medium transition hover:bg-canvas <?php echo $active ? 'text-teal-700' : 'text-navy-900'; ?>" <?php echo $active ? 'aria-current="page"' : ''; ?>><?php echo esc_html($item['label']); ?></a></li>
                    <?php endif;
                endforeach; ?>
            </ul>
        </nav>

        <div class="flex items-center gap-2">
            <a href="<?php echo esc_url($consult); ?>" class="btn-primary btn-sm hidden sm:inline-flex" data-rcm-cta="header-consultation"><?php esc_html_e('Get a Free Consultation', 'rcm-theme'); ?></a>
            <button type="button" class="flex h-11 w-11 items-center justify-center rounded-xl border border-line text-navy-900 lg:hidden" aria-label="<?php esc_attr_e('Open menu', 'rcm-theme'); ?>" aria-expanded="false" aria-controls="rcm-mobile-nav" data-rcm-mobile-toggle>
                <span data-icon-open><?php rcm_t_icon('Menu', 'h-5 w-5'); ?></span>
                <span data-icon-close hidden><?php rcm_t_icon('X', 'h-5 w-5'); ?></span>
            </button>
        </div>
    </div>
</header>

<?php /* Outside <header>: its backdrop-filter would make this fixed panel position against the header instead of the screen. */ ?>
<div id="rcm-mobile-nav" hidden class="fixed inset-x-0 bottom-0 top-[72px] z-50 overflow-y-auto border-t border-line bg-white lg:hidden [.admin-bar_&]:top-[118px] min-[783px]:[.admin-bar_&]:top-[104px]">
        <nav aria-label="<?php esc_attr_e('Mobile', 'rcm-theme'); ?>" class="container py-4">
            <ul class="divide-y divide-line">
                <?php foreach ($nav as $i => $item) : ?>
                    <li>
                        <?php if (!empty($item['groups'])) : $sec = 'rcm-msec-' . $i; ?>
                            <button type="button" class="flex w-full items-center justify-between py-4 text-left text-lg font-semibold text-navy-900" aria-expanded="false" aria-controls="<?php echo esc_attr($sec); ?>" data-rcm-mobile-section>
                                <?php echo esc_html($item['label']); ?> <?php rcm_t_icon('ChevronDown', 'h-5 w-5 transition'); ?>
                            </button>
                            <div id="<?php echo esc_attr($sec); ?>" hidden class="space-y-4 pb-4">
                                <a href="<?php echo esc_url($item['url']); ?>" class="block font-semibold text-teal-700"><?php printf(esc_html__('All %s', 'rcm-theme'), esc_html(strtolower($item['label']))); ?></a>
                                <?php foreach ($item['groups'] as $g) : ?>
                                    <div>
                                        <?php if (count($item['groups']) > 1) : ?><p class="mb-1 text-xs font-semibold uppercase tracking-wider text-ink-subtle"><?php echo esc_html($g['title']); ?></p><?php endif; ?>
                                        <ul class="grid grid-cols-1 gap-0.5 sm:grid-cols-2">
                                            <?php foreach ($g['links'] as $l) : ?>
                                                <li><a href="<?php echo esc_url($l[1]); ?>" class="block rounded-lg px-2 py-2 text-[15px] text-navy-800 hover:bg-canvas"><?php echo esc_html($l[0]); ?></a></li>
                                            <?php endforeach; ?>
                                        </ul>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        <?php else : ?>
                            <a href="<?php echo esc_url($item['url']); ?>" class="block py-4 text-lg font-semibold text-navy-900"><?php echo esc_html($item['label']); ?></a>
                        <?php endif; ?>
                    </li>
                <?php endforeach; ?>
            </ul>
            <div class="mt-6 grid gap-3">
                <a href="<?php echo esc_url($consult); ?>" class="btn-primary"><?php esc_html_e('Get a Free Consultation', 'rcm-theme'); ?></a>
                <a href="<?php echo esc_url($contact['phone_href']); ?>" class="btn-outline"><?php rcm_t_icon('Phone', 'h-4 w-4'); ?> <?php echo esc_html($contact['phone']); ?></a>
                <?php rcm_t_part('whatsapp', ['variant' => 'button']); ?>
            </div>
        </nav>
</div>
<main id="main">
