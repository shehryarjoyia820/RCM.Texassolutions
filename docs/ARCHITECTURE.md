# Architecture and coding conventions

Texas Solutions RCM runs on WordPress (DreamHost, PHP 8.3) with two custom packages and no page builder:

| Package | Path | Role |
|---|---|---|
| **RCM Core** plugin | `wordpress/rcm-core` | Content types, CRM, AI assistant, tools, forms, SEO, security, analytics, admin dashboard. All business logic and data. |
| **Texas Solutions RCM** theme | `wordpress/rcm-theme` | Presentation: templates, header/footer, styles. Calls plugin template functions. |

Source content (services, specialties, calculators, reference tools, blog seed) lives in `src/content/*.ts`. `npm run build` exports it to JSON in `wordpress/rcm-core/data/`, bundles calculators and front-end scripts with esbuild into `wordpress/rcm-core/assets/js/`, and compiles Tailwind CSS into `wordpress/rcm-theme/assets/css/site.css`. On activation (and from **RCM > Tools > Content sync**) the plugin imports the JSON into WordPress posts that admins can then edit.

## Plugin layout

```
rcm-core/
  rcm-core.php                 bootstrap: constants, requires, activation hooks
  includes/
    helpers.php                rcm_setting(), rcm_table(), rcm_json(), rcm_client_ip(), rcm_rate_limited(), rcm_clean(), rcm_audit(), rcm_view()
    class-install.php          dbDelta schema, roles and capabilities, version upgrades
    class-settings.php         option `rcm_settings`, defaults, settings screen
    class-content-types.php    CPTs rcm_service, rcm_specialty, rcm_tool, rcm_faq, rcm_case_study, rcm_testimonial, rcm_integration, rcm_job; taxonomies; meta registration
    class-meta-boxes.php       structured meta editors for the CPTs (JSON-backed repeaters)
    class-importer.php         imports data/*.json into posts, pages, menus, categories
    class-forms.php            REST rcm/v1/lead + form markup renderers
    class-leads.php            lead model: create, score, dedupe, notify, activity
    class-chat.php             REST rcm/v1/chat/*, Gemini call, knowledge retrieval, notifications, cron
    class-tools.php            tool rendering helpers, REST rcm/v1/lookup proxy
    class-seo.php              title/meta/canonical/OG/robots, JSON-LD graph, breadcrumbs, sitemaps, robots.txt, llms.txt
    class-redirects.php        redirect table + 404 handling + admin screen
    class-security.php         TOTP MFA, login throttling, headers, XML-RPC off, audit hooks
    class-analytics.php        REST rcm/v1/event, GA4 + consent, internal analytics data
    class-admin.php            RCM admin menu, overview dashboard, page router
  admin/                       admin screen views (PHP) — one file per screen
  templates/                   front-end partials rendered by the plugin (forms, calculator, chat)
  assets/js/                   built bundles (do not edit; sources in src/js)
  data/                        built JSON (do not edit; sources in src/content)
```

## Conventions (all PHP)

- PHP 8.1+, `declare(strict_types=1);` in class files, namespace `RCM`, classes `final` with static `init()` registering hooks. Every file starts with `defined('ABSPATH') || exit;`.
- Text domain `rcm`. Escape on output (`esc_html`, `esc_attr`, `esc_url`, `wp_kses_post`), sanitize on input, `$wpdb->prepare` for every query with variables.
- Admin actions: capability check + nonce (`check_admin_referer` / `wp_verify_nonce`). REST: `permission_callback` always set; public endpoints validate a nonce from `wp_create_nonce('wp_rest')` and are rate limited with `rcm_rate_limited()`.
- Tables via `rcm_table('leads')` → `{$wpdb->prefix}rcm_leads`.
- Admin pages live under the **RCM** menu (slug `rcm`), sub-pages `rcm-leads`, `rcm-chats`, `rcm-kb`, `rcm-analytics`, `rcm-redirects`, `rcm-seo`, `rcm-audit`, `rcm-settings`, `rcm-tools`.
- Log meaningful admin actions with `rcm_audit($action, $entity, $entity_id, $detail_array)`.
- Never send form contents, chat text or personal data to analytics. Never store or forward patient information; the PHI guard rejects it.

## Capabilities

| Capability | administrator | rcm_sales_manager | rcm_support_agent | rcm_content_editor |
|---|---|---|---|---|
| rcm_view_dashboard | ✓ | ✓ | ✓ | ✓ |
| rcm_view_leads | ✓ | ✓ | ✓ | |
| rcm_manage_leads (status, notes, assign) | ✓ | ✓ | ✓ (assigned to them) | |
| rcm_export_leads | ✓ | ✓ | | |
| rcm_delete_leads | ✓ | | | |
| rcm_view_chats | ✓ | ✓ | ✓ | |
| rcm_manage_kb | ✓ | | ✓ | ✓ |
| rcm_view_analytics | ✓ | ✓ | | ✓ |
| rcm_manage_seo | ✓ | | | ✓ |
| rcm_manage_settings | ✓ | | | |
| rcm_view_audit | ✓ | | | |

Content editors also get WordPress `editor` capabilities (posts, pages, media, RCM content types use `capability_type => 'page'`).
