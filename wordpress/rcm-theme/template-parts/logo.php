<?php
/**
 * Texas Solutions logo (same artwork as texassolutions.co) with the RCM division label.
 *
 * @var array $args ['dark' => bool] dark = white wordmark for dark backgrounds
 */
defined('ABSPATH') || exit;
$dark = !empty($args['dark']);
$img = get_template_directory_uri() . '/assets/img/' . ($dark ? 'ts-logo-white.png' : 'ts-logo.png');
?>
<span class="flex items-center gap-3">
    <img src="<?php echo esc_url($img); ?>" width="480" height="166" alt="Texas Solutions" class="h-10 w-auto sm:h-11" decoding="async">
    <span class="border-l pl-3 leading-tight <?php echo $dark ? 'border-white/20' : 'border-line'; ?>">
        <span class="block font-display text-[15px] font-extrabold tracking-wide <?php echo $dark ? 'text-white' : 'text-navy-900'; ?>">RCM</span>
        <span class="block text-[10px] font-semibold uppercase tracking-[0.16em] <?php echo $dark ? 'text-teal-300' : 'text-teal-700'; ?>">Revenue Cycle</span>
    </span>
</span>
