<?php
/**
 * Template Name: Consultation (form)
 */
defined('ABSPATH') || exit;
$svc = isset($_GET['service']) ? sanitize_title(wp_unslash($_GET['service'])) : '';
rcm_t_part('form-page', ['variant' => 'consultation', 'form_title' => __('Request your free consultation', 'rcm-theme'), 'form_args' => array_filter(['default_service' => $svc])]);
