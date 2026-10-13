<?php
/**
 * Plugin Name:       RCM Core
 * Plugin URI:        https://rcm.texassolutions.co
 * Description:       Texas Solutions RCM platform: services, specialties and tools content, RCM calculators and lookups, lead CRM, AI assistant, SEO, security and analytics.
 * Version:           1.0.0
 * Requires at least: 6.6
 * Requires PHP:      8.1
 * Author:            Texas Solutions
 * Author URI:        https://texassolutions.co
 * License:           Proprietary
 * Text Domain:       rcm
 */

defined('ABSPATH') || exit;

define('RCM_VERSION', '1.0.0');
define('RCM_DB_VERSION', '3');
define('RCM_FILE', __FILE__);
define('RCM_DIR', plugin_dir_path(__FILE__));
define('RCM_URL', plugin_dir_url(__FILE__));

require_once RCM_DIR . 'includes/helpers.php';

$rcm_modules = [
    'class-install.php',
    'class-settings.php',
    'class-content-types.php',
    'class-meta-boxes.php',
    'class-importer.php',
    'class-leads.php',
    'class-forms.php',
    'class-chat.php',
    'class-tools.php',
    'class-seo.php',
    'class-redirects.php',
    'class-security.php',
    'class-analytics.php',
    'class-assets.php',
    'class-admin.php',
];
foreach ($rcm_modules as $rcm_module) {
    require_once RCM_DIR . 'includes/' . $rcm_module;
}
unset($rcm_modules, $rcm_module);

register_activation_hook(__FILE__, ['RCM\\Install', 'activate']);
register_deactivation_hook(__FILE__, ['RCM\\Install', 'deactivate']);

add_action('plugins_loaded', static function (): void {
    RCM\Install::init();
    RCM\Settings::init();
    RCM\Content_Types::init();
    RCM\Meta_Boxes::init();
    RCM\Importer::init();
    RCM\Leads::init();
    RCM\Forms::init();
    RCM\Chat::init();
    RCM\Tools::init();
    RCM\SEO::init();
    RCM\Redirects::init();
    RCM\Security::init();
    RCM\Analytics::init();
    RCM\Assets::init();
    RCM\Admin::init();
});
