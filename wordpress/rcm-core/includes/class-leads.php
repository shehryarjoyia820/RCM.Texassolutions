<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Lead model: create, score, dedupe, notify, activity log, admin actions and
 * the RCM > Leads screens.
 *
 * Storage: {prefix}rcm_leads, {prefix}rcm_lead_notes, {prefix}rcm_lead_activity
 * (schema in class-install.php). All datetimes are stored in UTC; follow_up_at
 * is a plain site-local date.
 *
 * Scoring (ported from the prototype, capped at 100):
 *   source: proposal +25, consultation +20, referral +20, contact/chat/calculator +10, resource/blog +5
 *   providers: 1 +5, 2-5 +10, 6-10 +15, 11-25 +20, 26-50 +25, 51+ +25
 *   monthly claims: 250-1,000 +5, 1,000-2,500 +10, 2,500-5,000 +15, 5,000+ +20
 *   services: end-to-end RCM +10, else 3 or more +10, else any +5
 *   business (non free-mail) email domain +10, phone +5, practice name +5,
 *   existing billing operation (in-house, another company, mix) +5, preferred date +5
 *   Bands: Hot >= 60, Warm >= 35, Cold below.
 *
 * Duplicates: a new lead whose email matches an original (non-duplicate) lead
 * created within rcm_setting('leads.duplicate_window_days') gets duplicate_of
 * set to that original, and the original's activity log records it.
 *
 * Retention (purge_expired, daily on `rcm_daily_maintenance`): leads whose
 * updated_at is older than rcm_setting('leads.retention_days') are deleted with
 * their notes and activity. Any staff change (status, assignment, follow-up,
 * note) bumps updated_at, so only leads nobody has touched for the whole
 * retention period are removed.
 *
 * Permissions: rcm_view_leads to see leads; rcm_manage_leads to change them,
 * but users with the rcm_support_agent role (and no rcm_export_leads) may only
 * change leads assigned to them; rcm_export_leads to export; rcm_delete_leads
 * to delete.
 */
final class Leads
{
    public const STATUSES = ['new', 'contacted', 'qualified', 'proposal_sent', 'won', 'lost'];

    public const SOURCES = ['contact', 'consultation', 'proposal', 'chat', 'calculator', 'blog', 'resource', 'newsletter', 'careers', 'partner', 'referral'];

    public const STATUS_LABELS = [
        'new' => 'New',
        'contacted' => 'Contacted',
        'qualified' => 'Qualified',
        'proposal_sent' => 'Proposal sent',
        'won' => 'Won',
        'lost' => 'Lost',
    ];

    public const SOURCE_LABELS = [
        'contact' => 'Contact form',
        'consultation' => 'Consultation request',
        'proposal' => 'Proposal request',
        'chat' => 'AI assistant',
        'calculator' => 'Calculator',
        'blog' => 'Blog',
        'resource' => 'Resource download',
        'newsletter' => 'Newsletter signup',
        'careers' => 'Careers application',
        'partner' => 'Partnership enquiry',
        'referral' => 'Referral',
    ];

    public const FREE_MAIL = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'live.com', 'msn.com', 'proton.me', 'protonmail.com', 'ymail.com', 'mail.com'];

    public const PER_PAGE = 25;

    private const SOURCE_POINTS = ['consultation' => 20, 'proposal' => 25, 'contact' => 10, 'chat' => 10, 'calculator' => 10, 'referral' => 20, 'resource' => 5, 'blog' => 5];
    private const PROVIDER_POINTS = ['1' => 5, '2-5' => 10, '6-10' => 15, '11-25' => 20, '26-50' => 25, '51+' => 25];
    private const LOCATION_POINTS = ['1' => 5, '2-3' => 10, '4-10' => 20, '11-25' => 25, '26+' => 25];
    private const CLAIM_POINTS = ['250-1,000' => 5, '1,000-2,500' => 10, '2,500-5,000' => 15, '5,000+' => 20];

    public static function init(): void
    {
        add_action('admin_post_rcm_lead_update', [self::class, 'handle_update']);
        add_action('admin_post_rcm_lead_note', [self::class, 'handle_note']);
        add_action('admin_post_rcm_lead_delete', [self::class, 'handle_delete']);
        add_action('admin_post_rcm_leads_bulk', [self::class, 'handle_bulk']);
        add_action('admin_post_rcm_leads_export', [self::class, 'handle_export']);
        add_action('rcm_daily_maintenance', [self::class, 'purge_expired']);
    }

    /* ------------------------------------------------------------------ */
    /*  Labels and small helpers                                           */
    /* ------------------------------------------------------------------ */

    public static function status_label(string $status): string
    {
        return isset(self::STATUS_LABELS[$status]) ? __(self::STATUS_LABELS[$status], 'rcm') : $status; // phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText
    }

    public static function source_label(string $source): string
    {
        return isset(self::SOURCE_LABELS[$source]) ? __(self::SOURCE_LABELS[$source], 'rcm') : $source; // phpcs:ignore WordPress.WP.I18n.NonSingularStringLiteralText
    }

    /** 'Hot' (>= 60), 'Warm' (>= 35) or 'Cold'. */
    public static function band(int $score): string
    {
        return $score >= 60 ? 'Hot' : ($score >= 35 ? 'Warm' : 'Cold');
    }

    /** Service display name from its import key. */
    public static function service_name(string $key): string
    {
        $post = Content_Types::by_key(Content_Types::SERVICE, $key);
        return $post ? get_the_title($post) : $key;
    }

    public static function user_name(?int $user_id): string
    {
        if (!$user_id) {
            return '';
        }
        $u = get_userdata($user_id);
        return $u ? (string) $u->display_name : sprintf(__('User #%d', 'rcm'), $user_id);
    }

    /** Formats a stored UTC datetime in the site timezone. */
    public static function fmt_date(?string $utc, string $format = ''): string
    {
        if (!$utc || str_starts_with($utc, '0000')) {
            return '';
        }
        $format = $format ?: get_option('date_format') . ' ' . get_option('time_format');
        return get_date_from_gmt($utc, $format);
    }

    public static function sanitize_id(mixed $id): string
    {
        return is_scalar($id) ? substr((string) preg_replace('/[^A-Za-z0-9\-]/', '', (string) $id), 0, 24) : '';
    }

    /** Single-line clean string (no line breaks). */
    private static function line(mixed $v, int $max): string
    {
        return mb_substr(trim((string) preg_replace('/\s+/u', ' ', rcm_clean($v, $max + 50))), 0, $max);
    }

    private static function now(): string
    {
        return current_time('mysql', true);
    }

    private static function new_id(): string
    {
        return 'L-' . gmdate('Ymd') . '-' . strtoupper(bin2hex(random_bytes(3)));
    }

    /** Users who may be assigned leads (rcm_view_leads). */
    public static function assignable_users(): array
    {
        return get_users(['capability' => 'rcm_view_leads', 'orderby' => 'display_name', 'fields' => ['ID', 'display_name']]);
    }

    /** True when the current user is a support agent restricted to their own leads. */
    public static function restricted_to_assigned(): bool
    {
        $user = wp_get_current_user();
        return $user->ID && in_array('rcm_support_agent', (array) $user->roles, true) && !current_user_can('rcm_export_leads');
    }

    /** Whether the current user may change this lead. */
    public static function can_manage(array $lead): bool
    {
        if (!current_user_can('rcm_manage_leads')) {
            return false;
        }
        if (self::restricted_to_assigned()) {
            return (int) ($lead['assigned_to'] ?? 0) === get_current_user_id();
        }
        return true;
    }

    /* ------------------------------------------------------------------ */
    /*  Scoring                                                            */
    /* ------------------------------------------------------------------ */

    /** @return array{score:int, reasons:string[]} */
    public static function score(array $l): array
    {
        $score = 0;
        $reasons = [];
        $add = static function (int $n, string $why) use (&$score, &$reasons): void {
            $score += $n;
            $reasons[] = '+' . $n . ' ' . $why;
        };

        $source = (string) ($l['source'] ?? '');
        if (isset(self::SOURCE_POINTS[$source])) {
            $add(self::SOURCE_POINTS[$source], $source . ' request');
        }
        $locations = (string) ($l['locations'] ?? '');
        if ($locations !== '' && isset(self::LOCATION_POINTS[$locations])) {
            $add(self::LOCATION_POINTS[$locations], $locations . ' location(s)');
        }
        if ((string) ($l['software'] ?? '') !== '') {
            $add(5, 'practice software named');
        }
        $providers = (string) ($l['providers'] ?? '');
        if ($providers !== '' && isset(self::PROVIDER_POINTS[$providers])) {
            $add(self::PROVIDER_POINTS[$providers], $providers . ' providers');
        }
        $claims = (string) ($l['monthly_claims'] ?? '');
        if ($claims !== '' && isset(self::CLAIM_POINTS[$claims])) {
            $add(self::CLAIM_POINTS[$claims], $claims . ' claims per month');
        }
        $svc = array_values((array) ($l['services'] ?? []));
        if (in_array('revenue-cycle-management', $svc, true)) {
            $add(10, 'wants end-to-end RCM');
        } elseif (count($svc) >= 3) {
            $add(10, count($svc) . ' services selected');
        } elseif (count($svc) > 0) {
            $add(5, 'service selected');
        }
        $email = (string) ($l['email'] ?? '');
        $domain = str_contains($email, '@') ? strtolower(substr($email, strrpos($email, '@') + 1)) : '';
        if ($domain !== '' && !in_array($domain, self::FREE_MAIL, true)) {
            $add(10, 'business email domain');
        }
        if ((string) ($l['phone'] ?? '') !== '') {
            $add(5, 'phone provided');
        }
        if ((string) ($l['company'] ?? '') !== '') {
            $add(5, 'practice name provided');
        }
        $billing = (string) ($l['current_billing'] ?? '');
        if ($billing !== '' && preg_match('/another billing company|in-house|mix/i', $billing)) {
            $add(5, 'has an existing billing operation');
        }
        if ((string) ($l['preferred_date'] ?? '') !== '') {
            $add(5, 'proposed a consultation date');
        }

        return ['score' => min(100, $score), 'reasons' => $reasons];
    }

    /* ------------------------------------------------------------------ */
    /*  Create / read                                                      */
    /* ------------------------------------------------------------------ */

    /**
     * Creates a lead. Input keys: name, email (required), phone, company, state,
     * specialty, providers, current_billing, services (string[] of service keys),
     * challenges, monthly_claims, preferred_contact, preferred_date (Y-m-d),
     * message, source (one of SOURCES), source_page, attribution (assoc array),
     * consent_text (non-empty = consent given now), marketing_consent (bool), summary.
     *
     * Values are sanitized again here. Does not send the notification: call
     * notify() afterwards. Fires do_action('rcm_lead_created', $lead, $duplicate_of).
     *
     * @return array{lead: array, duplicate_of: ?string}
     * @throws \RuntimeException when the row cannot be saved.
     */
    public static function create(array $input): array
    {
        global $wpdb;

        $email = strtolower(sanitize_email((string) ($input['email'] ?? '')));
        if ($email === '' || !is_email($email)) {
            throw new \RuntimeException('Invalid email address.');
        }
        $source = (string) ($input['source'] ?? 'contact');
        if (!in_array($source, self::SOURCES, true)) {
            $source = 'contact';
        }
        $name = self::line($input['name'] ?? '', 120);
        if ($name === '') {
            $name = mb_substr(strstr($email, '@', true) ?: $email, 0, 120);
        }
        $services = [];
        foreach ((array) ($input['services'] ?? []) as $s) {
            $s = sanitize_key((string) (is_scalar($s) ? $s : ''));
            if ($s !== '' && !in_array($s, $services, true)) {
                $services[] = $s;
            }
        }
        $services = array_slice($services, 0, 40);
        $attribution = [];
        foreach ((array) ($input['attribution'] ?? []) as $k => $v) {
            $k = substr((string) preg_replace('/[^a-z0-9_]/', '', strtolower((string) $k)), 0, 30);
            $v = self::line($v, 200);
            if ($k !== '' && $v !== '') {
                $attribution[$k] = $v;
            }
            if (count($attribution) >= 12) {
                break;
            }
        }
        $preferred_date = (string) ($input['preferred_date'] ?? '');
        if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $preferred_date)) {
            $preferred_date = '';
        }
        $consent_text = rcm_clean_text($input['consent_text'] ?? '', 1000);

        $lead = [
            'name' => $name,
            'email' => $email,
            'phone' => self::line($input['phone'] ?? '', 40),
            'company' => self::line($input['company'] ?? '', 160),
            'state' => self::line($input['state'] ?? '', 60),
            'specialty' => self::line($input['specialty'] ?? '', 80),
            'providers' => self::line($input['providers'] ?? '', 20),
            'current_billing' => self::line($input['current_billing'] ?? '', 80),
            'software' => self::line($input['software'] ?? '', 60),
            'locations' => self::line($input['locations'] ?? '', 20),
            'services' => $services,
            'challenges' => self::line($input['challenges'] ?? '', 300),
            'monthly_claims' => self::line($input['monthly_claims'] ?? '', 30),
            'preferred_contact' => self::line($input['preferred_contact'] ?? '', 40),
            'preferred_date' => $preferred_date,
            'message' => rcm_clean_text($input['message'] ?? '', 6000),
            'source' => $source,
            'source_page' => self::line($input['source_page'] ?? '', 300),
            'attribution' => $attribution,
            'consent_text' => $consent_text,
            'marketing_consent' => !empty($input['marketing_consent']),
            'summary' => rcm_clean_text($input['summary'] ?? '', 4000),
        ];
        $scored = self::score($lead);

        $window = max(1, (int) rcm_setting('leads.duplicate_window_days', 180));
        $since = gmdate('Y-m-d H:i:s', time() - $window * DAY_IN_SECONDS);
        $table = rcm_table('leads');
        $prior = $wpdb->get_var($wpdb->prepare(
            "SELECT id FROM {$table} WHERE email = %s AND created_at > %s AND duplicate_of IS NULL ORDER BY created_at ASC LIMIT 1",
            $email,
            $since
        ));
        $duplicate_of = $prior ? (string) $prior : null;

        $now = self::now();
        $row = [
            'created_at' => $now,
            'updated_at' => $now,
            'name' => $lead['name'],
            'email' => $lead['email'],
            'phone' => $lead['phone'],
            'company' => $lead['company'],
            'state' => $lead['state'],
            'specialty' => $lead['specialty'],
            'providers' => $lead['providers'],
            'current_billing' => $lead['current_billing'],
            'software' => $lead['software'],
            'locations' => $lead['locations'],
            'services' => (string) wp_json_encode($services),
            'challenges' => $lead['challenges'],
            'monthly_claims' => $lead['monthly_claims'],
            'preferred_contact' => $lead['preferred_contact'],
            'preferred_date' => $lead['preferred_date'],
            'message' => $lead['message'],
            'source' => $lead['source'],
            'source_page' => $lead['source_page'],
            'attribution' => (string) wp_json_encode((object) $attribution),
            'status' => 'new',
            'score' => $scored['score'],
            'score_reasons' => (string) wp_json_encode($scored['reasons']),
            'consent_at' => $consent_text !== '' ? $now : null,
            'consent_text' => $consent_text,
            'marketing_consent' => $lead['marketing_consent'] ? 1 : 0,
            'duplicate_of' => $duplicate_of,
            'summary' => $lead['summary'],
        ];

        $id = '';
        for ($i = 0; $i < 4; $i++) {
            $id = self::new_id();
            $ok = $wpdb->insert($table, ['id' => $id] + $row);
            if ($ok) {
                break;
            }
            $id = '';
        }
        if ($id === '') {
            throw new \RuntimeException('Could not save the lead.');
        }

        self::log_activity($id, 'created', sprintf('Lead created from %s%s', $source, $lead['source_page'] !== '' ? ' on ' . $lead['source_page'] : ''));
        if ($duplicate_of) {
            self::log_activity($duplicate_of, 'duplicate', sprintf('Same email submitted again as %s (%s)', $id, $source));
        }

        $saved = self::get($id) ?? (['id' => $id] + $row);
        do_action('rcm_lead_created', $saved, $duplicate_of);
        return ['lead' => $saved, 'duplicate_of' => $duplicate_of];
    }

    /** One lead with JSON columns decoded, or null. */
    public static function get(string $id): ?array
    {
        global $wpdb;
        $id = self::sanitize_id($id);
        if ($id === '') {
            return null;
        }
        $table = rcm_table('leads');
        $row = $wpdb->get_row($wpdb->prepare("SELECT * FROM {$table} WHERE id = %s", $id), ARRAY_A);
        return $row ? self::hydrate($row) : null;
    }

    private static function hydrate(array $r): array
    {
        $json = static function ($v): array {
            if (!is_string($v) || $v === '') {
                return [];
            }
            $d = json_decode($v, true);
            return is_array($d) ? $d : [];
        };
        $r['services'] = array_values(array_map('strval', $json($r['services'] ?? '')));
        $r['score_reasons'] = array_values(array_map('strval', $json($r['score_reasons'] ?? '')));
        $r['attribution'] = array_map('strval', $json($r['attribution'] ?? ''));
        $r['score'] = (int) ($r['score'] ?? 0);
        $r['band'] = self::band($r['score']);
        $r['assigned_to'] = !empty($r['assigned_to']) ? (int) $r['assigned_to'] : null;
        $r['marketing_consent'] = !empty($r['marketing_consent']);
        $r['duplicate_of'] = !empty($r['duplicate_of']) ? (string) $r['duplicate_of'] : null;
        $r['follow_up_at'] = !empty($r['follow_up_at']) && !str_starts_with((string) $r['follow_up_at'], '0000') ? (string) $r['follow_up_at'] : null;
        $r['consent_at'] = !empty($r['consent_at']) ? (string) $r['consent_at'] : null;
        foreach (['id', 'name', 'email', 'phone', 'company', 'state', 'specialty', 'providers', 'current_billing', 'software', 'locations', 'challenges', 'monthly_claims', 'preferred_contact', 'preferred_date', 'message', 'source', 'source_page', 'status', 'consent_text', 'summary', 'created_at', 'updated_at'] as $k) {
            $r[$k] = (string) ($r[$k] ?? '');
        }
        return $r;
    }

    /* ------------------------------------------------------------------ */
    /*  Activity                                                           */
    /* ------------------------------------------------------------------ */

    /** Appends to the lead's activity timeline. No capability check (used by other modules). */
    public static function log_activity(string $lead_id, string $kind, string $detail, ?int $user_id = null): void
    {
        global $wpdb;
        $user_id = $user_id ?? (get_current_user_id() ?: null);
        $wpdb->insert(rcm_table('lead_activity'), [
            'lead_id' => self::sanitize_id($lead_id),
            'at' => self::now(),
            'user_id' => $user_id,
            'kind' => mb_substr($kind, 0, 30),
            'detail' => mb_substr($detail, 0, 2000),
        ]);
    }

    public static function activity(string $lead_id): array
    {
        global $wpdb;
        $table = rcm_table('lead_activity');
        return (array) $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} WHERE lead_id = %s ORDER BY at DESC, id DESC LIMIT 500", $lead_id), ARRAY_A);
    }

    public static function notes(string $lead_id): array
    {
        global $wpdb;
        $table = rcm_table('lead_notes');
        return (array) $wpdb->get_results($wpdb->prepare("SELECT * FROM {$table} WHERE lead_id = %s ORDER BY created_at ASC, id ASC", $lead_id), ARRAY_A);
    }

    private static function touch(string $id, array $data = []): bool
    {
        global $wpdb;
        $data['updated_at'] = self::now();
        return $wpdb->update(rcm_table('leads'), $data, ['id' => $id]) !== false;
    }

    /** Loads a lead and checks the current user may change it. */
    private static function editable(string $id): array|\WP_Error
    {
        $lead = self::get($id);
        if (!$lead) {
            return new \WP_Error('rcm_lead_not_found', __('Lead not found.', 'rcm'));
        }
        if (!self::can_manage($lead)) {
            return new \WP_Error('rcm_forbidden', __('You can only change leads assigned to you.', 'rcm'));
        }
        return $lead;
    }

    /* ------------------------------------------------------------------ */
    /*  Updates (capability checked)                                       */
    /* ------------------------------------------------------------------ */

    public static function update_status(string $id, string $status): bool|\WP_Error
    {
        if (!in_array($status, self::STATUSES, true)) {
            return new \WP_Error('rcm_bad_status', __('Unknown status.', 'rcm'));
        }
        $lead = self::editable($id);
        if (is_wp_error($lead)) {
            return $lead;
        }
        if ($lead['status'] === $status) {
            return true;
        }
        if (!self::touch($lead['id'], ['status' => $status])) {
            return new \WP_Error('rcm_db', __('The lead could not be updated.', 'rcm'));
        }
        self::log_activity($lead['id'], 'status', sprintf('Status changed from %s to %s', self::status_label($lead['status']), self::status_label($status)));
        rcm_audit('lead.status', 'lead', $lead['id'], ['from' => $lead['status'], 'to' => $status]);
        return true;
    }

    /** Assigns to a user with rcm_view_leads, or unassigns with null/0. */
    public static function assign(string $id, ?int $user_id): bool|\WP_Error
    {
        $lead = self::editable($id);
        if (is_wp_error($lead)) {
            return $lead;
        }
        $user_id = $user_id ?: null;
        if ($user_id !== null && !user_can($user_id, 'rcm_view_leads')) {
            return new \WP_Error('rcm_bad_user', __('That user cannot be assigned leads.', 'rcm'));
        }
        if ($lead['assigned_to'] === $user_id) {
            return true;
        }
        if (!self::touch($lead['id'], ['assigned_to' => $user_id])) {
            return new \WP_Error('rcm_db', __('The lead could not be updated.', 'rcm'));
        }
        self::log_activity($lead['id'], 'assigned', $user_id ? sprintf('Assigned to %s', self::user_name($user_id)) : 'Unassigned');
        rcm_audit('lead.assign', 'lead', $lead['id'], ['from' => $lead['assigned_to'], 'to' => $user_id]);
        return true;
    }

    /** Sets (Y-m-d) or clears (null or '') the follow-up date. */
    public static function follow_up(string $id, ?string $date): bool|\WP_Error
    {
        $date = $date === null ? '' : trim($date);
        if ($date !== '' && (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $date, $m) || !checkdate((int) $m[2], (int) $m[3], (int) $m[1]))) {
            return new \WP_Error('rcm_bad_date', __('Please enter a valid follow-up date.', 'rcm'));
        }
        $lead = self::editable($id);
        if (is_wp_error($lead)) {
            return $lead;
        }
        $new = $date === '' ? null : $date;
        if ($lead['follow_up_at'] === $new) {
            return true;
        }
        if (!self::touch($lead['id'], ['follow_up_at' => $new])) {
            return new \WP_Error('rcm_db', __('The lead could not be updated.', 'rcm'));
        }
        self::log_activity($lead['id'], 'follow_up', $new ? sprintf('Follow-up set for %s', $new) : 'Follow-up date cleared');
        rcm_audit('lead.follow_up', 'lead', $lead['id'], ['date' => $new]);
        return true;
    }

    public static function add_note(string $id, string $body): bool|\WP_Error
    {
        global $wpdb;
        $body = rcm_clean_text($body, 5000);
        if ($body === '') {
            return new \WP_Error('rcm_empty_note', __('The note is empty.', 'rcm'));
        }
        $lead = self::editable($id);
        if (is_wp_error($lead)) {
            return $lead;
        }
        $ok = $wpdb->insert(rcm_table('lead_notes'), [
            'lead_id' => $lead['id'],
            'user_id' => get_current_user_id() ?: null,
            'body' => $body,
            'created_at' => self::now(),
        ]);
        if (!$ok) {
            return new \WP_Error('rcm_db', __('The note could not be saved.', 'rcm'));
        }
        self::touch($lead['id']);
        self::log_activity($lead['id'], 'note', 'Note added');
        rcm_audit('lead.note', 'lead', $lead['id'], ['length' => mb_strlen($body)]);
        return true;
    }

    /** Deletes a lead with its notes and activity. Requires rcm_delete_leads. */
    public static function delete(string $id): bool|\WP_Error
    {
        global $wpdb;
        if (!current_user_can('rcm_delete_leads')) {
            return new \WP_Error('rcm_forbidden', __('You do not have permission to delete leads.', 'rcm'));
        }
        $lead = self::get($id);
        if (!$lead) {
            return new \WP_Error('rcm_lead_not_found', __('Lead not found.', 'rcm'));
        }
        self::delete_rows([$lead['id']]);
        rcm_audit('lead.delete', 'lead', $lead['id'], ['source' => $lead['source'], 'created_at' => $lead['created_at']]);
        return true;
    }

    /** Removes leads, notes and activity, and clears duplicate_of links pointing at them. */
    private static function delete_rows(array $ids): void
    {
        global $wpdb;
        if (!$ids) {
            return;
        }
        $ph = implode(',', array_fill(0, count($ids), '%s'));
        $leads = rcm_table('leads');
        $notes = rcm_table('lead_notes');
        $act = rcm_table('lead_activity');
        // phpcs:disable WordPress.DB.PreparedSQL.InterpolatedNotPrepared -- placeholders are generated above.
        $wpdb->query($wpdb->prepare("DELETE FROM {$notes} WHERE lead_id IN ({$ph})", ...$ids));
        $wpdb->query($wpdb->prepare("DELETE FROM {$act} WHERE lead_id IN ({$ph})", ...$ids));
        $wpdb->query($wpdb->prepare("UPDATE {$leads} SET duplicate_of = NULL WHERE duplicate_of IN ({$ph})", ...$ids));
        $wpdb->query($wpdb->prepare("DELETE FROM {$leads} WHERE id IN ({$ph})", ...$ids));
        // phpcs:enable
    }

    /**
     * Retention: deletes leads (with notes and activity) whose updated_at is
     * older than rcm_setting('leads.retention_days'). Returns the number deleted.
     */
    public static function purge_expired(): int
    {
        global $wpdb;
        $days = max(90, (int) rcm_setting('leads.retention_days', 1095));
        $cutoff = gmdate('Y-m-d H:i:s', time() - $days * DAY_IN_SECONDS);
        $table = rcm_table('leads');
        $total = 0;
        for ($i = 0; $i < 50; $i++) {
            $ids = (array) $wpdb->get_col($wpdb->prepare("SELECT id FROM {$table} WHERE updated_at < %s ORDER BY updated_at ASC LIMIT 200", $cutoff));
            if (!$ids) {
                break;
            }
            self::delete_rows(array_map('strval', $ids));
            $total += count($ids);
        }
        if ($total > 0) {
            rcm_audit('lead.purge', 'lead', '', ['deleted' => $total, 'retention_days' => $days]);
        }
        return $total;
    }

    /* ------------------------------------------------------------------ */
    /*  Query, stats, export                                               */
    /* ------------------------------------------------------------------ */

    /**
     * Normalizes list filters from a request array ($_GET). Keys: s, status,
     * source, assigned (user id | 'none' | 'me'), from, to (Y-m-d, site time),
     * band (hot|warm|cold), dup ('1' duplicates only, '0' originals only),
     * orderby (created_at|score), order (asc|desc), paged.
     */
    public static function filters_from_request(array $src): array
    {
        $src = wp_unslash($src);
        $date = static fn($v): string => is_string($v) && preg_match('/^\d{4}-\d{2}-\d{2}$/', $v) ? $v : '';
        $assigned = is_scalar($src['assigned'] ?? null) ? (string) $src['assigned'] : '';
        if (!in_array($assigned, ['none', 'me'], true)) {
            $assigned = ctype_digit($assigned) ? $assigned : '';
        }
        $status = (string) (is_scalar($src['status'] ?? null) ? $src['status'] : '');
        $source = (string) (is_scalar($src['source'] ?? null) ? $src['source'] : '');
        $band = strtolower((string) (is_scalar($src['band'] ?? null) ? $src['band'] : ''));
        $dup = (string) (is_scalar($src['dup'] ?? null) ? $src['dup'] : '');
        $orderby = (string) (is_scalar($src['orderby'] ?? null) ? $src['orderby'] : '');
        $order = strtolower((string) (is_scalar($src['order'] ?? null) ? $src['order'] : ''));
        return [
            's' => rcm_clean($src['s'] ?? '', 100),
            'status' => in_array($status, self::STATUSES, true) ? $status : '',
            'source' => in_array($source, self::SOURCES, true) ? $source : '',
            'assigned' => $assigned,
            'from' => $date($src['from'] ?? ''),
            'to' => $date($src['to'] ?? ''),
            'band' => in_array($band, ['hot', 'warm', 'cold'], true) ? $band : '',
            'dup' => in_array($dup, ['0', '1'], true) ? $dup : '',
            'orderby' => in_array($orderby, ['created_at', 'score'], true) ? $orderby : 'created_at',
            'order' => $order === 'asc' ? 'asc' : 'desc',
            'paged' => max(1, (int) ($src['paged'] ?? 1)),
        ];
    }

    /** @return array{0:string, 1:array} WHERE clause (with leading WHERE or '') and its args. */
    private static function where(array $f): array
    {
        global $wpdb;
        $w = [];
        $a = [];
        if (($f['s'] ?? '') !== '') {
            $like = '%' . $wpdb->esc_like((string) $f['s']) . '%';
            $w[] = '(name LIKE %s OR email LIKE %s OR company LIKE %s OR id LIKE %s)';
            array_push($a, $like, $like, $like, $like);
        }
        if (($f['status'] ?? '') !== '') {
            $w[] = 'status = %s';
            $a[] = $f['status'];
        }
        if (($f['source'] ?? '') !== '') {
            $w[] = 'source = %s';
            $a[] = $f['source'];
        }
        $assigned = (string) ($f['assigned'] ?? '');
        if ($assigned === 'none') {
            $w[] = 'assigned_to IS NULL';
        } elseif ($assigned === 'me') {
            $w[] = 'assigned_to = %d';
            $a[] = get_current_user_id();
        } elseif ($assigned !== '') {
            $w[] = 'assigned_to = %d';
            $a[] = (int) $assigned;
        }
        if (($f['from'] ?? '') !== '') {
            $w[] = 'created_at >= %s';
            $a[] = get_gmt_from_date($f['from'] . ' 00:00:00');
        }
        if (($f['to'] ?? '') !== '') {
            $w[] = 'created_at <= %s';
            $a[] = get_gmt_from_date($f['to'] . ' 23:59:59');
        }
        switch ($f['band'] ?? '') {
            case 'hot':
                $w[] = 'score >= 60';
                break;
            case 'warm':
                $w[] = 'score >= 35 AND score < 60';
                break;
            case 'cold':
                $w[] = 'score < 35';
                break;
        }
        if (($f['dup'] ?? '') === '1') {
            $w[] = 'duplicate_of IS NOT NULL';
        } elseif (($f['dup'] ?? '') === '0') {
            $w[] = 'duplicate_of IS NULL';
        }
        return [$w ? 'WHERE ' . implode(' AND ', $w) : '', $a];
    }

    /**
     * Paged list for the admin screen.
     *
     * @return array{items: array[], total: int, pages: int, page: int, per_page: int}
     */
    public static function query(array $filters): array
    {
        global $wpdb;
        $f = $filters + ['orderby' => 'created_at', 'order' => 'desc', 'paged' => 1];
        $per_page = max(1, min(200, (int) ($f['per_page'] ?? self::PER_PAGE)));
        $page = max(1, (int) $f['paged']);
        [$where, $args] = self::where($f);
        $table = rcm_table('leads');
        $orderby = $f['orderby'] === 'score' ? 'score' : 'created_at';
        $order = strtolower((string) $f['order']) === 'asc' ? 'ASC' : 'DESC';

        $count_sql = "SELECT COUNT(*) FROM {$table} {$where}";
        $total = (int) ($args ? $wpdb->get_var($wpdb->prepare($count_sql, ...$args)) : $wpdb->get_var($count_sql));
        $pages = max(1, (int) ceil($total / $per_page));
        $page = min($page, $pages);

        $sql = "SELECT * FROM {$table} {$where} ORDER BY {$orderby} {$order}, id {$order} LIMIT %d OFFSET %d";
        $rows = (array) $wpdb->get_results($wpdb->prepare($sql, ...array_merge($args, [$per_page, ($page - 1) * $per_page])), ARRAY_A);

        return [
            'items' => array_map(static fn(array $r): array => self::hydrate($r), $rows),
            'total' => $total,
            'pages' => $pages,
            'page' => $page,
            'per_page' => $per_page,
        ];
    }

    /** Leads whose duplicate_of points at this lead. */
    public static function duplicates_of(string $id): array
    {
        global $wpdb;
        $table = rcm_table('leads');
        return (array) $wpdb->get_results($wpdb->prepare("SELECT id, created_at, source FROM {$table} WHERE duplicate_of = %s ORDER BY created_at ASC", $id), ARRAY_A);
    }

    /** Chat sessions linked to the lead. */
    public static function chat_sessions(string $id): array
    {
        global $wpdb;
        $table = rcm_table('chat_sessions');
        return (array) $wpdb->get_results($wpdb->prepare("SELECT id, created_at, last_message_at, message_count, needs_human, status, summary FROM {$table} WHERE lead_id = %s ORDER BY created_at DESC", $id), ARRAY_A);
    }

    /**
     * Overview numbers for the dashboard.
     *
     * @return array{
     *   last_30: array{total:int, hot:int, by_source:array<string,int>, by_status:array<string,int>},
     *   new_this_week:int, follow_ups_due:int, unassigned_new:int,
     *   conversion_90: array{won:int, total:int, rate:float}
     * }
     */
    public static function stats(): array
    {
        global $wpdb;
        $t = rcm_table('leads');
        $d30 = gmdate('Y-m-d H:i:s', time() - 30 * DAY_IN_SECONDS);
        $d7 = gmdate('Y-m-d H:i:s', time() - 7 * DAY_IN_SECONDS);
        $d90 = gmdate('Y-m-d H:i:s', time() - 90 * DAY_IN_SECONDS);
        $today = wp_date('Y-m-d');

        $by_source = array_fill_keys(self::SOURCES, 0);
        foreach ((array) $wpdb->get_results($wpdb->prepare("SELECT source, COUNT(*) AS c FROM {$t} WHERE created_at >= %s GROUP BY source", $d30), ARRAY_A) as $r) {
            $by_source[(string) $r['source']] = (int) $r['c'];
        }
        $by_status = array_fill_keys(self::STATUSES, 0);
        foreach ((array) $wpdb->get_results($wpdb->prepare("SELECT status, COUNT(*) AS c FROM {$t} WHERE created_at >= %s GROUP BY status", $d30), ARRAY_A) as $r) {
            $by_status[(string) $r['status']] = (int) $r['c'];
        }
        $conv = (array) $wpdb->get_row($wpdb->prepare("SELECT COUNT(*) AS total, COALESCE(SUM(status = 'won'), 0) AS won FROM {$t} WHERE created_at >= %s", $d90), ARRAY_A);
        $total90 = (int) ($conv['total'] ?? 0);
        $won90 = (int) ($conv['won'] ?? 0);

        return [
            'last_30' => [
                'total' => array_sum($by_source),
                'hot' => (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE created_at >= %s AND score >= 60", $d30)),
                'by_source' => $by_source,
                'by_status' => $by_status,
            ],
            'new_this_week' => (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE created_at >= %s", $d7)),
            'follow_ups_due' => (int) $wpdb->get_var($wpdb->prepare("SELECT COUNT(*) FROM {$t} WHERE follow_up_at IS NOT NULL AND follow_up_at <= %s AND status NOT IN ('won', 'lost')", $today)),
            'unassigned_new' => (int) $wpdb->get_var("SELECT COUNT(*) FROM {$t} WHERE status = 'new' AND assigned_to IS NULL"),
            'conversion_90' => [
                'won' => $won90,
                'total' => $total90,
                'rate' => $total90 > 0 ? round($won90 / $total90 * 100, 1) : 0.0,
            ],
        ];
    }

    /** Streams matching leads as CSV (UTF-8 with BOM) and exits. Requires rcm_export_leads. */
    public static function export_csv(array $filters): void
    {
        global $wpdb;
        if (!current_user_can('rcm_export_leads')) {
            wp_die(esc_html__('You do not have permission to export leads.', 'rcm'), 403);
        }
        [$where, $args] = self::where($filters);
        $table = rcm_table('leads');
        $count_sql = "SELECT COUNT(*) FROM {$table} {$where}";
        $count = (int) ($args ? $wpdb->get_var($wpdb->prepare($count_sql, ...$args)) : $wpdb->get_var($count_sql));
        rcm_audit('lead.export', 'lead', '', ['filters' => array_diff_key($filters, ['paged' => 1]), 'rows' => $count]);

        nocache_headers();
        header('Content-Type: text/csv; charset=utf-8');
        header('Content-Disposition: attachment; filename="rcm-leads-' . wp_date('Ymd-His') . '.csv"');
        header('X-Content-Type-Options: nosniff');
        $out = fopen('php://output', 'w');
        if ($out === false) {
            exit;
        }
        fwrite($out, "\xEF\xBB\xBF");
        fputcsv($out, ['ID', 'Created', 'Status', 'Score', 'Band', 'Source', 'Name', 'Email', 'Phone', 'Practice/company', 'State', 'Specialty', 'Providers', 'Current billing', 'Practice software', 'Locations', 'Monthly claims', 'Services', 'Challenges', 'Preferred date', 'Message', 'Page', 'Attribution', 'Assigned to', 'Follow-up', 'Consent at (UTC)', 'Marketing consent', 'Duplicate of']);

        // Neutralize spreadsheet formulas.
        $cell = static function ($v): string {
            $v = (string) $v;
            return ($v !== '' && in_array($v[0], ['=', '+', '-', '@', "\t", "\r"], true)) ? "'" . $v : $v;
        };
        $sql = "SELECT * FROM {$table} {$where} ORDER BY created_at DESC, id DESC LIMIT %d OFFSET %d";
        $batch = 500;
        for ($offset = 0; ; $offset += $batch) {
            $rows = (array) $wpdb->get_results($wpdb->prepare($sql, ...array_merge($args, [$batch, $offset])), ARRAY_A);
            if (!$rows) {
                break;
            }
            foreach ($rows as $row) {
                $l = self::hydrate($row);
                $attr = [];
                foreach ($l['attribution'] as $k => $v) {
                    $attr[] = $k . '=' . $v;
                }
                fputcsv($out, array_map($cell, [
                    $l['id'],
                    self::fmt_date($l['created_at'], 'Y-m-d H:i'),
                    self::status_label($l['status']),
                    $l['score'],
                    $l['band'],
                    self::source_label($l['source']),
                    $l['name'],
                    $l['email'],
                    $l['phone'],
                    $l['company'],
                    $l['state'],
                    $l['specialty'],
                    $l['providers'],
                    $l['current_billing'],
                    $l['software'] ?? '',
                    $l['locations'] ?? '',
                    $l['monthly_claims'],
                    implode('; ', array_map([self::class, 'service_name'], $l['services'])),
                    $l['challenges'],
                    $l['preferred_date'],
                    $l['message'],
                    $l['source_page'],
                    implode('; ', $attr),
                    self::user_name($l['assigned_to']),
                    (string) $l['follow_up_at'],
                    (string) $l['consent_at'],
                    $l['marketing_consent'] ? 'yes' : 'no',
                    (string) $l['duplicate_of'],
                ]));
            }
            if (count($rows) < $batch) {
                break;
            }
        }
        fclose($out);
        exit;
    }

    /* ------------------------------------------------------------------ */
    /*  Notification                                                       */
    /* ------------------------------------------------------------------ */

    /** Plain-text notification to rcm_setting('notify_email'), reply-to the lead. */
    public static function notify(array $lead, ?string $duplicate_of): bool
    {
        $to = sanitize_email((string) rcm_setting('notify_email', ''));
        if ($to === '') {
            $to = (string) get_option('admin_email');
        }
        $host = (string) wp_parse_url(home_url('/'), PHP_URL_HOST);
        $source = (string) ($lead['source'] ?? '');
        $score = (int) ($lead['score'] ?? 0);
        $services = (array) ($lead['services'] ?? []);
        $attr = (array) ($lead['attribution'] ?? []);
        $v = static fn(string $k): string => (string) ($lead[$k] ?? '');

        $lines = [
            sprintf('%s on %s', self::source_label($source), $host),
            '',
            sprintf('Lead ID: %s  (score %d, %s)', $v('id'), $score, self::band($score)),
        ];
        if ($duplicate_of) {
            $lines[] = sprintf('Possible duplicate of %s (same email in the last %d days)', $duplicate_of, (int) rcm_setting('leads.duplicate_window_days', 180));
        }
        $lines[] = 'Name: ' . $v('name');
        $lines[] = 'Email: ' . $v('email');
        $optional = [
            'phone' => 'Phone',
            'company' => 'Practice/company',
            'state' => 'State',
            'specialty' => 'Specialty',
            'providers' => 'Providers',
            'current_billing' => 'Current billing',
            'software' => 'Practice software',
            'locations' => 'Locations',
            'monthly_claims' => 'Monthly claims',
        ];
        foreach ($optional as $k => $label) {
            if ($v($k) !== '') {
                $lines[] = $label . ': ' . $v($k);
            }
        }
        if ($services) {
            $lines[] = 'Services: ' . implode(', ', array_map(static fn($s): string => self::service_name((string) $s), $services));
        }
        if ($v('challenges') !== '') {
            $lines[] = 'Challenges: ' . $v('challenges');
        }
        if ($v('preferred_date') !== '') {
            $lines[] = 'Preferred consultation date: ' . $v('preferred_date');
        }
        if ($v('message') !== '') {
            $lines[] = "\nMessage:\n" . $v('message');
        }
        $lines[] = '';
        $lines[] = 'Page: ' . ($v('source_page') !== '' ? $v('source_page') : 'unknown');
        if ($attr) {
            $pairs = [];
            foreach ($attr as $k => $val) {
                $pairs[] = $k . '=' . $val;
            }
            $lines[] = 'Attribution: ' . implode(', ', $pairs);
        }
        $lines[] = sprintf(
            'Consent: %s; marketing emails: %s',
            $v('consent_at') !== '' ? 'yes, ' . $v('consent_at') . ' UTC' : 'no',
            !empty($lead['marketing_consent']) ? 'yes' : 'no'
        );
        $lines[] = '';
        $lines[] = 'Open in the dashboard: ' . admin_url('admin.php?page=rcm-leads&lead=' . rawurlencode($v('id')));

        $subject = sprintf('[RCM] %s: %s%s', self::source_label($source), $v('name'), $v('company') !== '' ? ', ' . $v('company') : '');
        $subject = (string) preg_replace('/[\r\n]+/', ' ', $subject);

        $headers = ['Content-Type: text/plain; charset=UTF-8'];
        $reply = sanitize_email($v('email'));
        if ($reply !== '' && is_email($reply)) {
            $reply_name = trim(str_replace(["\r", "\n", '"', '<', '>', ',', ';'], '', $v('name')));
            $headers[] = 'Reply-To: ' . ($reply_name !== '' ? '"' . $reply_name . '" <' . $reply . '>' : $reply);
        }

        $sent = (bool) wp_mail($to, $subject, implode("\n", $lines), $headers);
        if ($v('id') !== '') {
            self::log_activity($v('id'), $sent ? 'notified' : 'notify_failed', $sent ? sprintf('Notification emailed to %s', $to) : 'Notification email could not be sent');
        }
        return $sent;
    }

    /* ------------------------------------------------------------------ */
    /*  Admin screens                                                      */
    /* ------------------------------------------------------------------ */

    /** Router entry for admin.php?page=rcm-leads (list) and &lead=ID (detail). */
    public static function render_admin(): void
    {
        if (!current_user_can('rcm_view_leads')) {
            wp_die(esc_html__('You do not have permission to view leads.', 'rcm'), 403);
        }
        // phpcs:disable WordPress.Security.NonceVerification.Recommended -- read-only screen parameters.
        $notice = self::notice_from_query();
        $id = isset($_GET['lead']) ? self::sanitize_id(wp_unslash($_GET['lead'])) : '';
        if ($id !== '') {
            $lead = self::get($id);
            if ($lead) {
                rcm_view('admin/lead-detail.php', [
                    'lead' => $lead,
                    'notes' => self::notes($lead['id']),
                    'activity' => self::activity($lead['id']),
                    'chats' => self::chat_sessions($lead['id']),
                    'duplicates' => self::duplicates_of($lead['id']),
                    'users' => self::assignable_users(),
                    'can_manage' => self::can_manage($lead),
                    'can_delete' => current_user_can('rcm_delete_leads'),
                    'notice' => $notice,
                ]);
                return;
            }
            $notice = ['error', __('Lead not found. It may have been deleted.', 'rcm')];
        }
        $filters = self::filters_from_request($_GET);
        // phpcs:enable
        rcm_view('admin/leads-list.php', [
            'filters' => $filters,
            'result' => self::query($filters),
            'users' => self::assignable_users(),
            'can_manage' => current_user_can('rcm_manage_leads'),
            'can_export' => current_user_can('rcm_export_leads'),
            'notice' => $notice,
        ]);
    }

    /** @return array{0:string,1:string}|null [type, message] */
    private static function notice_from_query(): ?array
    {
        // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $code = isset($_GET['rcm_msg']) ? sanitize_key(wp_unslash($_GET['rcm_msg'])) : '';
        $n = isset($_GET['rcm_n']) ? absint($_GET['rcm_n']) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        $f = isset($_GET['rcm_f']) ? absint($_GET['rcm_f']) : 0; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
        return match ($code) {
            'updated' => ['success', __('Lead updated.', 'rcm')],
            'noted' => ['success', __('Note added.', 'rcm')],
            'deleted' => ['success', __('Lead deleted.', 'rcm')],
            'bulk' => $f > 0
                ? ['warning', sprintf(__('%1$d leads updated. %2$d could not be changed (not assigned to you or not found).', 'rcm'), $n, $f)]
                : ['success', sprintf(_n('%d lead updated.', '%d leads updated.', $n, 'rcm'), $n)],
            'forbidden' => ['error', __('You can only change leads assigned to you.', 'rcm')],
            'invalid' => ['error', __('Some values were not valid and were not saved.', 'rcm')],
            'empty' => ['warning', __('Nothing was selected.', 'rcm')],
            'error' => ['error', __('Something went wrong. Please try again.', 'rcm')],
            default => null,
        };
    }

    private static function back(string $code, array $extra = [], ?string $lead_id = null): never
    {
        $base = $lead_id
            ? admin_url('admin.php?page=rcm-leads&lead=' . rawurlencode($lead_id))
            : (wp_get_referer() ?: admin_url('admin.php?page=rcm-leads'));
        $url = remove_query_arg(['rcm_msg', 'rcm_n', 'rcm_f'], $base);
        wp_safe_redirect(add_query_arg(['rcm_msg' => $code] + $extra, $url));
        exit;
    }

    private static function code_for(\WP_Error $e): string
    {
        return match ($e->get_error_code()) {
            'rcm_forbidden' => 'forbidden',
            'rcm_bad_status', 'rcm_bad_user', 'rcm_bad_date', 'rcm_empty_note' => 'invalid',
            default => 'error',
        };
    }

    /** Detail form: status, assignee, follow-up date. */
    public static function handle_update(): void
    {
        $id = self::sanitize_id(wp_unslash($_POST['lead_id'] ?? ''));
        if (!current_user_can('rcm_manage_leads')) {
            wp_die(esc_html__('You do not have permission to change leads.', 'rcm'), 403);
        }
        check_admin_referer('rcm_lead_update_' . $id);

        $lead = self::get($id);
        if (!$lead) {
            self::back('error');
        }
        $errors = [];
        $status = sanitize_key(wp_unslash($_POST['status'] ?? $lead['status']));
        if ($status !== $lead['status']) {
            $r = self::update_status($id, $status);
            if (is_wp_error($r)) {
                $errors[] = $r;
            }
        }
        if (isset($_POST['follow_up_at'])) {
            $r = self::follow_up($id, sanitize_text_field(wp_unslash($_POST['follow_up_at'])));
            if (is_wp_error($r)) {
                $errors[] = $r;
            }
        }
        // Assignment last, so a support agent can still update a lead before handing it over.
        if (isset($_POST['assigned_to'])) {
            $r = self::assign($id, absint($_POST['assigned_to']) ?: null);
            if (is_wp_error($r)) {
                $errors[] = $r;
            }
        }
        self::back($errors ? self::code_for($errors[0]) : 'updated', [], $id);
    }

    public static function handle_note(): void
    {
        $id = self::sanitize_id(wp_unslash($_POST['lead_id'] ?? ''));
        if (!current_user_can('rcm_manage_leads')) {
            wp_die(esc_html__('You do not have permission to change leads.', 'rcm'), 403);
        }
        check_admin_referer('rcm_lead_note_' . $id);
        $r = self::add_note($id, (string) wp_unslash($_POST['note'] ?? ''));
        self::back(is_wp_error($r) ? self::code_for($r) : 'noted', [], $id);
    }

    public static function handle_delete(): void
    {
        $id = self::sanitize_id(wp_unslash($_POST['lead_id'] ?? ''));
        if (!current_user_can('rcm_delete_leads')) {
            wp_die(esc_html__('You do not have permission to delete leads.', 'rcm'), 403);
        }
        check_admin_referer('rcm_lead_delete_' . $id);
        if (empty($_POST['confirm'])) {
            self::back('invalid', [], $id);
        }
        $r = self::delete($id);
        if (is_wp_error($r)) {
            self::back(self::code_for($r), [], $id);
        }
        wp_safe_redirect(admin_url('admin.php?page=rcm-leads&rcm_msg=deleted'));
        exit;
    }

    public static function handle_bulk(): void
    {
        if (!current_user_can('rcm_manage_leads')) {
            wp_die(esc_html__('You do not have permission to change leads.', 'rcm'), 403);
        }
        check_admin_referer('rcm_leads_bulk');
        $ids = array_filter(array_map([self::class, 'sanitize_id'], (array) wp_unslash($_POST['ids'] ?? [])));
        $status = sanitize_key(wp_unslash($_POST['bulk_status'] ?? ''));
        if (!$ids || !in_array($status, self::STATUSES, true)) {
            self::back('empty');
        }
        $ok = 0;
        $fail = 0;
        foreach (array_slice(array_unique($ids), 0, 200) as $id) {
            $r = self::update_status($id, $status);
            is_wp_error($r) ? $fail++ : $ok++;
        }
        self::back('bulk', ['rcm_n' => $ok, 'rcm_f' => $fail]);
    }

    public static function handle_export(): void
    {
        if (!current_user_can('rcm_export_leads')) {
            wp_die(esc_html__('You do not have permission to export leads.', 'rcm'), 403);
        }
        check_admin_referer('rcm_leads_export');
        self::export_csv(self::filters_from_request($_GET)); // phpcs:ignore WordPress.Security.NonceVerification.Recommended -- verified above.
    }

    /** Query args for the current filters (for links), without empty values. */
    public static function filter_args(array $filters, array $override = []): array
    {
        $args = array_merge($filters, $override);
        if (($args['orderby'] ?? '') === 'created_at') {
            unset($args['orderby']);
        }
        if (($args['order'] ?? '') === 'desc') {
            unset($args['order']);
        }
        if ((int) ($args['paged'] ?? 1) <= 1) {
            unset($args['paged']);
        }
        unset($args['per_page']);
        return array_filter($args, static fn($v): bool => $v !== '' && $v !== null);
    }
}
