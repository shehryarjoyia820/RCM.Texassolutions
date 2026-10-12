<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Database schema, roles and capabilities, and upgrades.
 */
final class Install
{
    public const CAPS = [
        'rcm_view_dashboard',
        'rcm_view_leads',
        'rcm_manage_leads',
        'rcm_export_leads',
        'rcm_delete_leads',
        'rcm_view_chats',
        'rcm_manage_kb',
        'rcm_view_analytics',
        'rcm_manage_seo',
        'rcm_manage_settings',
        'rcm_view_audit',
    ];

    public static function init(): void
    {
        if (get_option('rcm_db_version') !== RCM_DB_VERSION) {
            self::create_tables();
            self::roles();
            update_option('rcm_db_version', RCM_DB_VERSION);
        }
    }

    public static function activate(): void
    {
        self::create_tables();
        self::roles();
        update_option('rcm_db_version', RCM_DB_VERSION);
        // CPTs must be registered before flushing so their rewrite rules exist.
        Content_Types::register();
        flush_rewrite_rules();
        Chat::schedule();
        Analytics::schedule();
        // Import bundled content on first activation only.
        if (!get_option('rcm_content_imported')) {
            update_option('rcm_pending_import', 1);
        }
    }

    public static function deactivate(): void
    {
        wp_clear_scheduled_hook('rcm_chat_sweep');
        wp_clear_scheduled_hook('rcm_daily_maintenance');
        flush_rewrite_rules();
    }

    public static function create_tables(): void
    {
        global $wpdb;
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';
        $c = $wpdb->get_charset_collate();
        $t = static fn(string $n): string => rcm_table($n);

        $sql = [];
        $sql[] = "CREATE TABLE {$t('leads')} (
            id varchar(24) NOT NULL,
            created_at datetime NOT NULL,
            updated_at datetime NOT NULL,
            name varchar(120) NOT NULL,
            email varchar(160) NOT NULL,
            phone varchar(40) NOT NULL DEFAULT '',
            company varchar(160) NOT NULL DEFAULT '',
            state varchar(60) NOT NULL DEFAULT '',
            specialty varchar(80) NOT NULL DEFAULT '',
            providers varchar(20) NOT NULL DEFAULT '',
            current_billing varchar(80) NOT NULL DEFAULT '',
            services text NULL,
            challenges text NULL,
            monthly_claims varchar(30) NOT NULL DEFAULT '',
            preferred_contact varchar(40) NOT NULL DEFAULT '',
            preferred_date varchar(20) NOT NULL DEFAULT '',
            message text NULL,
            source varchar(20) NOT NULL,
            source_page varchar(300) NOT NULL DEFAULT '',
            attribution text NULL,
            status varchar(20) NOT NULL DEFAULT 'new',
            score smallint NOT NULL DEFAULT 0,
            score_reasons text NULL,
            assigned_to bigint(20) unsigned NULL,
            follow_up_at date NULL,
            consent_at datetime NULL,
            consent_text text NULL,
            marketing_consent tinyint(1) NOT NULL DEFAULT 0,
            duplicate_of varchar(24) NULL,
            summary text NULL,
            PRIMARY KEY  (id),
            KEY email (email),
            KEY created_at (created_at),
            KEY status (status),
            KEY source (source),
            KEY assigned_to (assigned_to)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('lead_notes')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            lead_id varchar(24) NOT NULL,
            user_id bigint(20) unsigned NULL,
            body text NOT NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id),
            KEY lead_id (lead_id)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('lead_activity')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            lead_id varchar(24) NOT NULL,
            at datetime NOT NULL,
            user_id bigint(20) unsigned NULL,
            kind varchar(30) NOT NULL,
            detail text NULL,
            PRIMARY KEY  (id),
            KEY lead_id (lead_id, at)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('chat_sessions')} (
            id varchar(24) NOT NULL,
            lead_id varchar(24) NOT NULL,
            token_hash char(64) NOT NULL,
            created_at datetime NOT NULL,
            last_message_at datetime NULL,
            message_count int NOT NULL DEFAULT 0,
            needs_human tinyint(1) NOT NULL DEFAULT 0,
            status varchar(10) NOT NULL DEFAULT 'active',
            profile longtext NULL,
            summary text NULL,
            start_notified tinyint(1) NOT NULL DEFAULT 0,
            end_notified tinyint(1) NOT NULL DEFAULT 0,
            remember tinyint(1) NOT NULL DEFAULT 0,
            review varchar(12) NOT NULL DEFAULT 'unreviewed',
            review_note text NULL,
            PRIMARY KEY  (id),
            KEY lead_id (lead_id),
            KEY last_message_at (last_message_at)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('chat_messages')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            session_id varchar(24) NOT NULL,
            role varchar(10) NOT NULL,
            content longtext NOT NULL,
            meta text NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id),
            KEY session_id (session_id, id)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('chat_flags')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            kind varchar(12) NOT NULL,
            session_id varchar(24) NULL,
            detail text NOT NULL,
            created_at datetime NOT NULL,
            resolved tinyint(1) NOT NULL DEFAULT 0,
            PRIMARY KEY  (id),
            KEY resolved (resolved, created_at)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('kb_items')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            title varchar(200) NOT NULL,
            body longtext NOT NULL,
            category varchar(30) NOT NULL DEFAULT 'approved-answer',
            source_page varchar(300) NOT NULL DEFAULT '',
            status varchar(10) NOT NULL DEFAULT 'active',
            updated_at datetime NOT NULL,
            updated_by varchar(160) NOT NULL DEFAULT '',
            PRIMARY KEY  (id)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('events')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            at datetime NOT NULL,
            name varchar(40) NOT NULL,
            path varchar(200) NOT NULL DEFAULT '',
            ref varchar(200) NOT NULL DEFAULT '',
            source varchar(80) NOT NULL DEFAULT '',
            visitor varchar(40) NOT NULL DEFAULT '',
            props text NULL,
            PRIMARY KEY  (id),
            KEY at (at),
            KEY name_at (name, at)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('audit_log')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            at datetime NOT NULL,
            user_id bigint(20) unsigned NULL,
            user_email varchar(160) NOT NULL DEFAULT '',
            action varchar(80) NOT NULL,
            entity varchar(40) NOT NULL DEFAULT '',
            entity_id varchar(64) NOT NULL DEFAULT '',
            detail text NULL,
            ip varchar(45) NOT NULL DEFAULT '',
            PRIMARY KEY  (id),
            KEY at (at)
        ) $c;";

        $sql[] = "CREATE TABLE {$t('redirects')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            from_path varchar(300) NOT NULL,
            to_url varchar(500) NOT NULL,
            status smallint NOT NULL DEFAULT 301,
            hits int NOT NULL DEFAULT 0,
            last_hit datetime NULL,
            created_at datetime NOT NULL,
            PRIMARY KEY  (id),
            UNIQUE KEY from_path (from_path(190))
        ) $c;";

        $sql[] = "CREATE TABLE {$t('not_found')} (
            id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
            path varchar(300) NOT NULL,
            hits int NOT NULL DEFAULT 1,
            last_hit datetime NOT NULL,
            referrer varchar(300) NOT NULL DEFAULT '',
            PRIMARY KEY  (id),
            UNIQUE KEY path (path(190))
        ) $c;";

        foreach ($sql as $q) {
            dbDelta($q);
        }
    }

    public static function roles(): void
    {
        $editor = get_role('editor');
        $editor_caps = $editor ? $editor->capabilities : ['read' => true];

        $roles = [
            'rcm_sales_manager' => [__('Sales Manager', 'rcm'), ['read' => true, 'rcm_view_dashboard' => true, 'rcm_view_leads' => true, 'rcm_manage_leads' => true, 'rcm_export_leads' => true, 'rcm_view_chats' => true, 'rcm_view_analytics' => true]],
            'rcm_support_agent' => [__('Support Agent', 'rcm'), ['read' => true, 'rcm_view_dashboard' => true, 'rcm_view_leads' => true, 'rcm_manage_leads' => true, 'rcm_view_chats' => true, 'rcm_manage_kb' => true]],
            'rcm_content_editor' => [__('Content Editor', 'rcm'), $editor_caps + ['rcm_view_dashboard' => true, 'rcm_manage_kb' => true, 'rcm_view_analytics' => true, 'rcm_manage_seo' => true]],
        ];
        foreach ($roles as $slug => [$label, $caps]) {
            remove_role($slug);
            add_role($slug, $label, $caps);
        }
        $admin = get_role('administrator');
        if ($admin) {
            foreach (self::CAPS as $cap) {
                $admin->add_cap($cap);
            }
        }
    }
}
