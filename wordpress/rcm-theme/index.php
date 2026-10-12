<?php
/**
 * Fallback template.
 */
defined('ABSPATH') || exit;
if (is_home() || is_archive()) {
    require __DIR__ . '/home.php';
    return;
}
require __DIR__ . '/page.php';
