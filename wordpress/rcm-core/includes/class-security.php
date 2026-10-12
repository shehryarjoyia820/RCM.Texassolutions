<?php
declare(strict_types=1);

namespace RCM;

defined('ABSPATH') || exit;

/**
 * Account and site security:
 *  - TOTP multi-factor authentication (RFC 6238) with recovery codes, set up on the user's own profile.
 *  - Two-step login (password, then code) via wp-login.php?action=rcm_mfa.
 *  - MFA enforcement in grace mode for roles listed in security.mfa_required_roles.
 *  - Failed-login throttling per IP + username, generic login errors.
 *  - Hardening: XML-RPC off, user enumeration blocked, security headers, no generator tag.
 *  - Audit hooks for logins, users, publishing, plugins and themes.
 */
final class Security
{
    private const META_SECRET = '_rcm_mfa_secret';
    private const META_PENDING = '_rcm_mfa_pending';
    private const META_RECOVERY = '_rcm_mfa_recovery';
    private const META_LAST_STEP = '_rcm_mfa_last_step';
    private const META_ENABLED_AT = '_rcm_mfa_enabled_at';

    private const TOKEN_TTL = 300;
    private const TOKEN_MAX_ATTEMPTS = 5;
    private const RECOVERY_COUNT = 10;
    private const DIGITS = 6;
    private const PERIOD = 30;
    private const WINDOW = 1;
    private const BASE32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

    /** Errors collected while processing the profile form, added in user_profile_update_errors. */
    private static array $profile_errors = [];

    public static function init(): void
    {
        // MFA: profile UI and processing.
        add_action('show_user_profile', [self::class, 'profile_section']);
        add_action('edit_user_profile', [self::class, 'profile_section']);
        add_action('personal_options_update', [self::class, 'profile_save']);
        add_action('edit_user_profile_update', [self::class, 'profile_save']);
        add_action('user_profile_update_errors', [self::class, 'profile_errors'], 10, 3);
        add_action('admin_notices', [self::class, 'admin_notices']);

        // Login flow.
        add_filter('authenticate', [self::class, 'check_lockout'], 40, 3);
        add_filter('authenticate', [self::class, 'intercept_mfa'], 50, 3);
        add_action('wp_login_failed', [self::class, 'login_failed'], 10, 2);
        add_action('login_form_rcm_mfa', [self::class, 'mfa_screen']);
        add_action('admin_init', [self::class, 'enforce_mfa'], 1);

        // Hardening.
        if (rcm_setting('security.disable_xmlrpc', true)) {
            add_filter('xmlrpc_enabled', '__return_false');
            add_filter('xmlrpc_methods', [self::class, 'xmlrpc_methods']);
            add_filter('wp_headers', [self::class, 'remove_pingback_header']);
            remove_action('wp_head', 'rsd_link');
        }
        add_filter('rest_endpoints', [self::class, 'rest_endpoints']);
        add_action('template_redirect', [self::class, 'block_author_enumeration'], 1);
        if (rcm_setting('security.security_headers', true)) {
            add_action('send_headers', [self::class, 'send_security_headers']);
            add_action('login_init', [self::class, 'send_security_headers']);
            add_action('admin_init', [self::class, 'send_security_headers']);
        }
        remove_action('wp_head', 'wp_generator');
        add_filter('the_generator', '__return_empty_string');

        // Audit.
        add_action('wp_login', [self::class, 'on_login'], 10, 2);
        add_action('wp_logout', [self::class, 'on_logout'], 10, 1);
        add_action('user_register', [self::class, 'on_user_register'], 10, 1);
        add_action('set_user_role', [self::class, 'on_set_role'], 10, 3);
        add_action('delete_user', [self::class, 'on_delete_user'], 10, 2);
        add_action('transition_post_status', [self::class, 'on_transition'], 10, 3);
        add_action('activated_plugin', [self::class, 'on_plugin_activated'], 10, 1);
        add_action('deactivated_plugin', [self::class, 'on_plugin_deactivated'], 10, 1);
        add_action('switch_theme', [self::class, 'on_switch_theme'], 10, 3);
    }

    /* ------------------------------------------------------------------
     * TOTP primitives (RFC 4648 base32, RFC 4226 HOTP, RFC 6238 TOTP)
     * ------------------------------------------------------------------ */

    public static function base32_encode(string $bin): string
    {
        $out = '';
        $buffer = 0;
        $bits = 0;
        $len = strlen($bin);
        for ($i = 0; $i < $len; $i++) {
            $buffer = (($buffer << 8) | ord($bin[$i])) & 0xFFFF;
            $bits += 8;
            while ($bits >= 5) {
                $bits -= 5;
                $out .= self::BASE32[($buffer >> $bits) & 31];
            }
        }
        if ($bits > 0) {
            $out .= self::BASE32[($buffer << (5 - $bits)) & 31];
        }
        return $out;
    }

    public static function base32_decode(string $b32): string
    {
        $b32 = strtoupper(preg_replace('/[\s=\-]/', '', $b32) ?? '');
        $out = '';
        $buffer = 0;
        $bits = 0;
        $len = strlen($b32);
        for ($i = 0; $i < $len; $i++) {
            $val = strpos(self::BASE32, $b32[$i]);
            if ($val === false) {
                return '';
            }
            $buffer = (($buffer << 5) | $val) & 0xFFFF;
            $bits += 5;
            if ($bits >= 8) {
                $bits -= 8;
                $out .= chr(($buffer >> $bits) & 0xFF);
            }
        }
        return $out;
    }

    /** HOTP value for a raw (binary) key and counter. */
    public static function hotp(string $key, int $counter, int $digits = self::DIGITS): string
    {
        $msg = pack('N2', ($counter >> 32) & 0xFFFFFFFF, $counter & 0xFFFFFFFF);
        $h = hash_hmac('sha1', $msg, $key, true);
        $offset = ord($h[19]) & 0x0F;
        $bin = ((ord($h[$offset]) & 0x7F) << 24)
            | ((ord($h[$offset + 1]) & 0xFF) << 16)
            | ((ord($h[$offset + 2]) & 0xFF) << 8)
            | (ord($h[$offset + 3]) & 0xFF);
        return str_pad((string) ($bin % (10 ** $digits)), $digits, '0', STR_PAD_LEFT);
    }

    /**
     * Matches a code against a base32 secret within ±WINDOW steps.
     * Returns the matching time step, or null.
     */
    public static function totp_match(string $secret_b32, string $code, ?int $time = null, int $digits = self::DIGITS): ?int
    {
        $code = preg_replace('/\D/', '', $code) ?? '';
        if (strlen($code) !== $digits) {
            return null;
        }
        $key = self::base32_decode($secret_b32);
        if ($key === '') {
            return null;
        }
        $step = intdiv($time ?? time(), self::PERIOD);
        $found = null;
        for ($i = -self::WINDOW; $i <= self::WINDOW; $i++) {
            // Compare every candidate to keep timing independent of which one matched.
            if (hash_equals(self::hotp($key, $step + $i, $digits), $code)) {
                $found = $step + $i;
            }
        }
        return $found;
    }

    public static function new_secret(): string
    {
        return self::base32_encode(random_bytes(20));
    }

    /* ------------------------------------------------------------------
     * Secret storage (sodium secretbox, openssl AES-256-GCM fallback)
     * ------------------------------------------------------------------ */

    private static function encrypt(string $plain): string
    {
        if (function_exists('sodium_crypto_secretbox')) {
            $key = sodium_crypto_generichash(wp_salt('auth'), '', SODIUM_CRYPTO_SECRETBOX_KEYBYTES);
            $nonce = random_bytes(SODIUM_CRYPTO_SECRETBOX_NONCEBYTES);
            return 's1:' . base64_encode($nonce . sodium_crypto_secretbox($plain, $nonce, $key));
        }
        $key = hash('sha256', 'rcm-mfa|' . wp_salt('auth'), true);
        $iv = random_bytes(12);
        $tag = '';
        $ct = openssl_encrypt($plain, 'aes-256-gcm', $key, OPENSSL_RAW_DATA, $iv, $tag, '', 16);
        return 'o1:' . base64_encode($iv . $tag . (string) $ct);
    }

    private static function decrypt(string $stored): string
    {
        $raw = base64_decode(substr($stored, 3), true);
        if ($raw === false) {
            return '';
        }
        if (str_starts_with($stored, 's1:') && function_exists('sodium_crypto_secretbox_open')) {
            $key = sodium_crypto_generichash(wp_salt('auth'), '', SODIUM_CRYPTO_SECRETBOX_KEYBYTES);
            $n = SODIUM_CRYPTO_SECRETBOX_NONCEBYTES;
            if (strlen($raw) <= $n) {
                return '';
            }
            $plain = sodium_crypto_secretbox_open(substr($raw, $n), substr($raw, 0, $n), $key);
            return $plain === false ? '' : $plain;
        }
        if (str_starts_with($stored, 'o1:') && function_exists('openssl_decrypt')) {
            if (strlen($raw) < 28) {
                return '';
            }
            $key = hash('sha256', 'rcm-mfa|' . wp_salt('auth'), true);
            $plain = openssl_decrypt(substr($raw, 28), 'aes-256-gcm', $key, OPENSSL_RAW_DATA, substr($raw, 0, 12), substr($raw, 12, 16));
            return $plain === false ? '' : $plain;
        }
        return '';
    }

    /* ------------------------------------------------------------------
     * MFA state helpers
     * ------------------------------------------------------------------ */

    public static function mfa_enabled(int $user_id): bool
    {
        return (string) get_user_meta($user_id, self::META_SECRET, true) !== '';
    }

    private static function secret(int $user_id): string
    {
        $stored = (string) get_user_meta($user_id, self::META_SECRET, true);
        return $stored === '' ? '' : self::decrypt($stored);
    }

    /** Whether the user's roles are covered by security.mfa_required_roles. */
    public static function mfa_required(\WP_User $user): bool
    {
        $roles = (array) rcm_setting('security.mfa_required_roles', []);
        return (bool) array_intersect($roles, (array) $user->roles);
    }

    /** Verify a TOTP code with replay protection (a time step can only be used once). */
    private static function verify_totp(int $user_id, string $code): bool
    {
        $secret = self::secret($user_id);
        if ($secret === '') {
            return false;
        }
        $step = self::totp_match($secret, $code);
        if ($step === null) {
            return false;
        }
        $last = (int) get_user_meta($user_id, self::META_LAST_STEP, true);
        if ($step <= $last) {
            return false;
        }
        update_user_meta($user_id, self::META_LAST_STEP, $step);
        return true;
    }

    private static function normalize_recovery(string $code): string
    {
        return strtoupper(preg_replace('/[^A-Za-z0-9]/', '', $code) ?? '');
    }

    /** Consumes a recovery code if it matches one of the stored hashes. */
    private static function use_recovery_code(int $user_id, string $code): bool
    {
        $code = self::normalize_recovery($code);
        if (strlen($code) !== 10) {
            return false;
        }
        $hashes = (array) get_user_meta($user_id, self::META_RECOVERY, true);
        foreach ($hashes as $i => $hash) {
            if (is_string($hash) && wp_check_password($code, $hash)) {
                unset($hashes[$i]);
                update_user_meta($user_id, self::META_RECOVERY, array_values($hashes));
                rcm_audit('mfa.recovery_used', 'user', $user_id, ['remaining' => count($hashes)]);
                return true;
            }
        }
        return false;
    }

    /** Generates and stores new recovery codes; returns the plain codes for one-time display. */
    private static function new_recovery_codes(int $user_id): array
    {
        $plain = [];
        $hashes = [];
        for ($i = 0; $i < self::RECOVERY_COUNT; $i++) {
            $raw = substr(self::base32_encode(random_bytes(7)), 0, 10);
            $plain[] = substr($raw, 0, 5) . '-' . substr($raw, 5, 5);
            $hashes[] = wp_hash_password($raw);
        }
        update_user_meta($user_id, self::META_RECOVERY, $hashes);
        set_transient('rcm_mfa_codes_' . $user_id, self::encrypt(implode("\n", $plain)), 15 * MINUTE_IN_SECONDS);
        return $plain;
    }

    private static function disable_mfa(int $user_id): void
    {
        delete_user_meta($user_id, self::META_SECRET);
        delete_user_meta($user_id, self::META_PENDING);
        delete_user_meta($user_id, self::META_RECOVERY);
        delete_user_meta($user_id, self::META_LAST_STEP);
        delete_user_meta($user_id, self::META_ENABLED_AT);
        delete_transient('rcm_mfa_codes_' . $user_id);
    }

    private static function flash(int $user_id, string $message): void
    {
        set_transient('rcm_mfa_flash_' . $user_id, $message, 5 * MINUTE_IN_SECONDS);
    }

    private static function otpauth_uri(\WP_User $user, string $secret): string
    {
        $issuer = 'Texas Solutions RCM';
        $label = rawurlencode($issuer) . ':' . rawurlencode($user->user_login);
        return 'otpauth://totp/' . $label . '?' . http_build_query([
            'secret' => $secret,
            'issuer' => $issuer,
            'algorithm' => 'SHA1',
            'digits' => self::DIGITS,
            'period' => self::PERIOD,
        ], '', '&', PHP_QUERY_RFC3986);
    }

    /* ------------------------------------------------------------------
     * Profile UI
     * ------------------------------------------------------------------ */

    public static function profile_section(\WP_User $user): void
    {
        $own = get_current_user_id() === $user->ID;
        $enabled = self::mfa_enabled($user->ID);

        echo '<h2 id="rcm-mfa">' . esc_html__('Two-factor authentication', 'rcm') . '</h2>';
        echo '<div class="rcm-mfa">';
        wp_nonce_field('rcm_mfa_' . $user->ID, '_rcm_mfa_nonce');

        if (!$own) {
            if (!current_user_can('edit_users')) {
                echo '</div>';
                return;
            }
            if ($enabled) {
                echo '<p>' . esc_html__('This user has two-factor authentication turned on.', 'rcm') . '</p>';
                echo '<p><label><input type="checkbox" name="rcm_mfa_reset" value="1"> ' . esc_html__('Reset two-factor authentication for this user (they will need to set it up again).', 'rcm') . '</label></p>';
                echo '<p class="description">' . esc_html__('Use this only after confirming the person\'s identity, for example when they lost their phone and recovery codes. The reset is recorded in the audit log.', 'rcm') . '</p>';
            } else {
                echo '<p>' . esc_html__('This user has not set up two-factor authentication.', 'rcm') . '</p>';
                if (self::mfa_required($user)) {
                    echo '<p class="description">' . esc_html__('Their role requires it; they will be asked to set it up when they next open the dashboard.', 'rcm') . '</p>';
                }
            }
            echo '</div>';
            return;
        }

        // One-time display of freshly generated recovery codes.
        $codes_blob = get_transient('rcm_mfa_codes_' . $user->ID);
        if (is_string($codes_blob) && $codes_blob !== '') {
            delete_transient('rcm_mfa_codes_' . $user->ID);
            $codes = array_filter(explode("\n", self::decrypt($codes_blob)));
            if ($codes) {
                echo '<div class="rcm-mfa-codes notice notice-warning inline"><p><strong>' . esc_html__('Save your recovery codes now.', 'rcm') . '</strong> ' . esc_html__('Each code works once if you cannot use your authenticator app. They will not be shown again.', 'rcm') . '</p><ul>';
                foreach ($codes as $code) {
                    echo '<li><code>' . esc_html($code) . '</code></li>';
                }
                echo '</ul></div>';
            }
        }

        if ($enabled) {
            $remaining = count((array) get_user_meta($user->ID, self::META_RECOVERY, true));
            $since = (int) get_user_meta($user->ID, self::META_ENABLED_AT, true);
            echo '<p class="rcm-mfa-status rcm-mfa-on">' . esc_html__('Two-factor authentication is on.', 'rcm');
            if ($since) {
                /* translators: %s: date */
                echo ' ' . esc_html(sprintf(__('Enabled %s.', 'rcm'), wp_date(get_option('date_format'), $since)));
            }
            echo '</p>';
            /* translators: %d: number of unused recovery codes */
            echo '<p>' . esc_html(sprintf(_n('%d unused recovery code.', '%d unused recovery codes.', $remaining, 'rcm'), $remaining)) . '</p>';
            echo '<table class="form-table" role="presentation"><tr><th scope="row"><label for="rcm_mfa_current">' . esc_html__('Current code', 'rcm') . '</label></th><td>';
            echo '<input type="text" id="rcm_mfa_current" name="rcm_mfa_current" class="regular-text rcm-mfa-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="123456">';
            echo '<p class="description">' . esc_html__('Enter a code from your authenticator app to confirm either action below.', 'rcm') . '</p>';
            echo '<p><button type="submit" class="button" name="rcm_mfa_op" value="regen">' . esc_html__('Generate new recovery codes', 'rcm') . '</button> ';
            echo '<button type="submit" class="button rcm-mfa-danger" name="rcm_mfa_op" value="disable">' . esc_html__('Turn off two-factor authentication', 'rcm') . '</button></p>';
            echo '</td></tr></table>';
            echo '</div>';
            return;
        }

        // Setup: keep a pending secret until confirmed with a valid code.
        $pending_stored = (string) get_user_meta($user->ID, self::META_PENDING, true);
        $secret = $pending_stored !== '' ? self::decrypt($pending_stored) : '';
        if ($secret === '') {
            $secret = self::new_secret();
            update_user_meta($user->ID, self::META_PENDING, self::encrypt($secret));
        }
        $uri = self::otpauth_uri($user, $secret);
        $grouped = trim(chunk_split($secret, 4, ' '));

        echo '<p>' . esc_html__('Protect your account with a 6-digit code from an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password, Authy and similar).', 'rcm') . '</p>';
        echo '<ol class="rcm-mfa-steps">';
        echo '<li>' . esc_html__('On your phone, open your authenticator app and add an account. Choose "Enter a setup key" and type the key below (time based), or on a device that has the app tap the link.', 'rcm');
        echo '<p class="rcm-mfa-secret"><code aria-label="' . esc_attr__('Setup key', 'rcm') . '">' . esc_html($grouped) . '</code></p>';
        echo '<p><a class="button" href="' . esc_attr($uri) . '">' . esc_html__('Open in authenticator app', 'rcm') . '</a></p>';
        echo '<details><summary>' . esc_html__('Show setup link (otpauth URI)', 'rcm') . '</summary><p><code class="rcm-mfa-uri">' . esc_html($uri) . '</code></p></details></li>';
        echo '<li><label for="rcm_mfa_code">' . esc_html__('Enter the 6-digit code the app shows, then turn it on.', 'rcm') . '</label><br>';
        echo '<input type="text" id="rcm_mfa_code" name="rcm_mfa_code" class="regular-text rcm-mfa-code" inputmode="numeric" autocomplete="one-time-code" maxlength="6" pattern="[0-9]{6}" placeholder="123456"> ';
        echo '<button type="submit" class="button button-primary" name="rcm_mfa_op" value="enable">' . esc_html__('Turn on two-factor authentication', 'rcm') . '</button></li>';
        echo '</ol></div>';
    }

    /** Handles the MFA fields submitted with the profile form (WP already verified its own nonce). */
    public static function profile_save(int $user_id): void
    {
        $nonce = isset($_POST['_rcm_mfa_nonce']) ? sanitize_text_field(wp_unslash((string) $_POST['_rcm_mfa_nonce'])) : '';
        if ($nonce === '' || !wp_verify_nonce($nonce, 'rcm_mfa_' . $user_id)) {
            return;
        }
        $own = get_current_user_id() === $user_id;

        // Admin reset of another user's MFA.
        if (!$own) {
            if (!empty($_POST['rcm_mfa_reset']) && current_user_can('edit_users') && current_user_can('edit_user', $user_id) && self::mfa_enabled($user_id)) {
                self::disable_mfa($user_id);
                rcm_audit('mfa.reset', 'user', $user_id, ['by' => get_current_user_id()]);
            }
            return;
        }

        $op = isset($_POST['rcm_mfa_op']) ? sanitize_key(wp_unslash((string) $_POST['rcm_mfa_op'])) : '';
        $setup_code = isset($_POST['rcm_mfa_code']) ? preg_replace('/\D/', '', (string) wp_unslash($_POST['rcm_mfa_code'])) : '';
        $current = isset($_POST['rcm_mfa_current']) ? preg_replace('/\D/', '', (string) wp_unslash($_POST['rcm_mfa_current'])) : '';

        if (!self::mfa_enabled($user_id)) {
            // A typed setup code enables MFA even if the main "Update Profile" button was used.
            if ($op !== 'enable' && $setup_code === '') {
                return;
            }
            if (rcm_rate_limited('mfa_setup_' . $user_id, 10, 15 * MINUTE_IN_SECONDS)) {
                self::$profile_errors[] = __('Too many attempts. Wait a few minutes and try again.', 'rcm');
                return;
            }
            $pending = (string) get_user_meta($user_id, self::META_PENDING, true);
            $secret = $pending !== '' ? self::decrypt($pending) : '';
            $step = $secret !== '' ? self::totp_match($secret, (string) $setup_code) : null;
            if ($step === null) {
                self::$profile_errors[] = __('That two-factor code did not match. Check the time on your phone and enter the current code.', 'rcm');
                return;
            }
            update_user_meta($user_id, self::META_SECRET, self::encrypt($secret));
            update_user_meta($user_id, self::META_LAST_STEP, $step);
            update_user_meta($user_id, self::META_ENABLED_AT, time());
            delete_user_meta($user_id, self::META_PENDING);
            self::new_recovery_codes($user_id);
            rcm_audit('mfa.enabled', 'user', $user_id);
            self::flash($user_id, __('Two-factor authentication is on. Save the recovery codes shown below.', 'rcm'));
            return;
        }

        if ($op !== 'disable' && $op !== 'regen') {
            return;
        }
        if (rcm_rate_limited('mfa_manage_' . $user_id, 10, 15 * MINUTE_IN_SECONDS)) {
            self::$profile_errors[] = __('Too many attempts. Wait a few minutes and try again.', 'rcm');
            return;
        }
        if (!self::verify_totp($user_id, (string) $current)) {
            self::$profile_errors[] = __('Enter a current code from your authenticator app to make this change.', 'rcm');
            return;
        }
        if ($op === 'disable') {
            self::disable_mfa($user_id);
            rcm_audit('mfa.disabled', 'user', $user_id);
            self::flash($user_id, __('Two-factor authentication is off.', 'rcm'));
        } else {
            self::new_recovery_codes($user_id);
            rcm_audit('mfa.recovery_regenerated', 'user', $user_id);
            self::flash($user_id, __('New recovery codes generated. The old codes no longer work.', 'rcm'));
        }
    }

    public static function profile_errors(\WP_Error $errors, bool $update, \stdClass $user): void
    {
        foreach (self::$profile_errors as $i => $message) {
            $errors->add('rcm_mfa_' . $i, esc_html($message));
        }
        self::$profile_errors = [];
    }

    public static function admin_notices(): void
    {
        $user = wp_get_current_user();
        if (!$user->ID) {
            return;
        }
        $flash = get_transient('rcm_mfa_flash_' . $user->ID);
        if (is_string($flash) && $flash !== '') {
            delete_transient('rcm_mfa_flash_' . $user->ID);
            echo '<div class="notice notice-success is-dismissible"><p>' . esc_html($flash) . '</p></div>';
        }
        if (self::mfa_required($user) && !self::mfa_enabled($user->ID)) {
            echo '<div class="notice notice-error rcm-mfa-required"><p><strong>' . esc_html__('Set up two-factor authentication to continue.', 'rcm') . '</strong> ';
            echo esc_html__('Your role requires a code from an authenticator app at sign-in. The rest of the dashboard is unavailable until it is set up.', 'rcm');
            echo ' <a href="' . esc_url(admin_url('profile.php#rcm-mfa')) . '">' . esc_html__('Set it up now', 'rcm') . '</a></p></div>';
        }
    }

    /** Grace-mode enforcement: users who must use MFA but have not set it up can only use their profile. */
    public static function enforce_mfa(): void
    {
        if (wp_doing_ajax() || wp_doing_cron() || !is_user_logged_in()) {
            return;
        }
        $user = wp_get_current_user();
        if (!self::mfa_required($user) || self::mfa_enabled($user->ID)) {
            return;
        }
        global $pagenow;
        // Logout goes through wp-login.php; admin-ajax returned above; MFA setup posts to profile.php.
        if ($pagenow === 'profile.php') {
            return;
        }
        wp_safe_redirect(admin_url('profile.php#rcm-mfa'));
        exit;
    }

    /* ------------------------------------------------------------------
     * Login: throttling and second step
     * ------------------------------------------------------------------ */

    private static function attempt_key(string $username): string
    {
        return md5(rcm_client_ip() . '|' . strtolower(trim($username)));
    }

    /** Runs after core password checks (priority 20): blocks locked combinations and genericises errors. */
    public static function check_lockout(mixed $user, mixed $username, mixed $password): mixed
    {
        $username = is_string($username) ? $username : '';
        if ($username === '') {
            return $user;
        }
        $key = self::attempt_key($username);
        if (get_transient('rcm_ll_' . $key) || get_transient('rcm_lip_' . md5(rcm_client_ip()))) {
            $minutes = (int) rcm_setting('security.login_lockout_minutes', 15);
            return new \WP_Error('rcm_locked', sprintf(
                /* translators: %d: minutes */
                esc_html__('Too many failed sign-in attempts. Try again in %d minutes.', 'rcm'),
                $minutes
            ));
        }
        if ($user instanceof \WP_Error) {
            $generic = ['invalid_username', 'invalid_email', 'incorrect_password', 'authentication_failed'];
            if (array_intersect($user->get_error_codes(), $generic)) {
                return new \WP_Error('rcm_invalid_login', esc_html__('The username, email address or password is incorrect.', 'rcm'));
            }
        }
        return $user;
    }

    public static function login_failed(string $username, mixed $error = null): void
    {
        if ($error instanceof \WP_Error && in_array('rcm_locked', $error->get_error_codes(), true)) {
            return;
        }
        $max = max(3, (int) rcm_setting('security.login_max_attempts', 5));
        $minutes = max(5, (int) rcm_setting('security.login_lockout_minutes', 15));
        $key = self::attempt_key($username);
        $count = (int) get_transient('rcm_lf_' . $key) + 1;
        set_transient('rcm_lf_' . $key, $count, $minutes * MINUTE_IN_SECONDS);
        if ($count >= $max) {
            set_transient('rcm_ll_' . $key, 1, $minutes * MINUTE_IN_SECONDS);
            delete_transient('rcm_lf_' . $key);
            rcm_audit('auth.lockout', 'user', '', ['username' => rcm_clean($username, 60), 'attempts' => $count, 'minutes' => $minutes]);
        }
        // An IP spraying many usernames is locked out as a whole at four times the per-account limit.
        $ip_key = md5(rcm_client_ip());
        $ip_count = (int) get_transient('rcm_lfip_' . $ip_key) + 1;
        set_transient('rcm_lfip_' . $ip_key, $ip_count, $minutes * MINUTE_IN_SECONDS);
        if ($ip_count === $max * 4) {
            set_transient('rcm_lip_' . $ip_key, 1, $minutes * MINUTE_IN_SECONDS);
            rcm_audit('auth.lockout_ip', 'ip', '', ['attempts' => $ip_count, 'minutes' => $minutes]);
        }
    }

    /** After a correct password, divert MFA users to the code screen instead of logging them in. */
    public static function intercept_mfa(mixed $user, mixed $username, mixed $password): mixed
    {
        if (!$user instanceof \WP_User || !self::mfa_enabled($user->ID)) {
            return $user;
        }
        // Application passwords (REST/XML-RPC) are separate credentials and skip the code step.
        if (did_action('application_password_did_authenticate')) {
            return $user;
        }
        global $pagenow;
        if ($pagenow !== 'wp-login.php' || headers_sent()) {
            return new \WP_Error('rcm_mfa_required', esc_html__('This account uses two-factor authentication. Sign in on the login page.', 'rcm'));
        }

        // Successful password: reset the failure counter for this IP + username.
        delete_transient('rcm_lf_' . self::attempt_key(is_string($username) ? $username : ''));

        $redirect = isset($_REQUEST['redirect_to']) ? esc_url_raw(wp_unslash((string) $_REQUEST['redirect_to'])) : '';
        $token = self::create_token([
            'uid' => $user->ID,
            'remember' => !empty($_POST['rememberme']),
            'redirect_to' => $redirect,
            'attempts' => 0,
        ]);
        wp_safe_redirect(add_query_arg(['action' => 'rcm_mfa', 'token' => $token], wp_login_url()));
        exit;
    }

    private static function token_sig(string $rand): string
    {
        return substr(hash_hmac('sha256', $rand, wp_salt('auth')), 0, 32);
    }

    private static function create_token(array $data): string
    {
        $rand = bin2hex(random_bytes(16));
        set_transient('rcm_mfa_t_' . hash('sha256', $rand), $data, self::TOKEN_TTL);
        return $rand . '.' . self::token_sig($rand);
    }

    /** Returns [transient key, data] for a valid token, or null. */
    private static function read_token(string $token): ?array
    {
        if (!preg_match('/^([a-f0-9]{32})\.([a-f0-9]{32})$/', $token, $m) || !hash_equals(self::token_sig($m[1]), $m[2])) {
            return null;
        }
        $key = 'rcm_mfa_t_' . hash('sha256', $m[1]);
        $data = get_transient($key);
        return is_array($data) && !empty($data['uid']) ? [$key, $data] : null;
    }

    /** wp-login.php?action=rcm_mfa */
    public static function mfa_screen(): void
    {
        $token = isset($_REQUEST['token']) ? sanitize_text_field(wp_unslash((string) $_REQUEST['token'])) : '';
        $found = self::read_token($token);
        if ($found === null) {
            wp_safe_redirect(add_query_arg('rcm_mfa', 'expired', wp_login_url()));
            exit;
        }
        [$key, $data] = $found;
        $user_id = (int) $data['uid'];
        $errors = new \WP_Error();

        if ('POST' === ($_SERVER['REQUEST_METHOD'] ?? '')) {
            $code = isset($_POST['rcm_mfa_code']) ? sanitize_text_field(wp_unslash((string) $_POST['rcm_mfa_code'])) : '';
            $digits = preg_replace('/\D/', '', $code) ?? '';
            $ok = false;
            if (!rcm_rate_limited('mfa_login', 30, 15 * MINUTE_IN_SECONDS)) {
                $ok = strlen($digits) === self::DIGITS && strlen(self::normalize_recovery($code)) === self::DIGITS
                    ? self::verify_totp($user_id, $digits)
                    : self::use_recovery_code($user_id, $code);
            }
            if ($ok) {
                delete_transient($key);
                $user = get_userdata($user_id);
                if (!$user) {
                    wp_safe_redirect(wp_login_url());
                    exit;
                }
                wp_set_auth_cookie($user_id, (bool) $data['remember'], is_ssl());
                do_action('wp_login', $user->user_login, $user);
                $requested = (string) $data['redirect_to'];
                $redirect = $requested !== '' ? $requested : admin_url();
                $redirect = (string) apply_filters('login_redirect', $redirect, $requested, $user);
                if (!$user->has_cap('read') || ($redirect === admin_url() && !$user->has_cap('edit_posts') && !$user->has_cap('rcm_view_dashboard'))) {
                    $redirect = $redirect === admin_url() ? admin_url('profile.php') : $redirect;
                }
                wp_safe_redirect($redirect);
                exit;
            }
            $data['attempts'] = (int) $data['attempts'] + 1;
            if ($data['attempts'] >= self::TOKEN_MAX_ATTEMPTS) {
                delete_transient($key);
                $user = get_userdata($user_id);
                rcm_audit('auth.mfa_failed', 'user', $user_id, ['attempts' => $data['attempts']]);
                if ($user) {
                    do_action('wp_login_failed', $user->user_login, new \WP_Error('rcm_mfa_failed', 'MFA failed'));
                }
                wp_safe_redirect(add_query_arg('rcm_mfa', 'failed', wp_login_url()));
                exit;
            }
            set_transient($key, $data, self::TOKEN_TTL);
            $errors->add('rcm_mfa_invalid', esc_html__('That code is not valid. Try the current code from your app, or a recovery code.', 'rcm'));
        }

        login_header(__('Two-factor authentication', 'rcm'), '<p class="message">' . esc_html__('Enter the 6-digit code from your authenticator app.', 'rcm') . '</p>', $errors);
        ?>
        <form name="rcm_mfa_form" id="rcm_mfa_form" action="<?php echo esc_url(add_query_arg('action', 'rcm_mfa', wp_login_url())); ?>" method="post" autocomplete="off">
            <input type="hidden" name="token" value="<?php echo esc_attr($token); ?>">
            <p>
                <label for="rcm_mfa_code"><?php esc_html_e('Authentication code', 'rcm'); ?></label>
                <input type="text" name="rcm_mfa_code" id="rcm_mfa_code" class="input" inputmode="numeric" autocomplete="one-time-code" maxlength="11" size="20" required autofocus>
            </p>
            <p class="description"><?php esc_html_e('Lost your phone? Enter one of your recovery codes (XXXXX-XXXXX) instead.', 'rcm'); ?></p>
            <p class="submit">
                <input type="submit" class="button button-primary button-large" value="<?php esc_attr_e('Verify', 'rcm'); ?>">
            </p>
        </form>
        <p id="nav"><a href="<?php echo esc_url(wp_login_url()); ?>"><?php esc_html_e('Start over', 'rcm'); ?></a></p>
        <?php
        login_footer('rcm_mfa_code');
        exit;
    }

    /* ------------------------------------------------------------------
     * Hardening
     * ------------------------------------------------------------------ */

    public static function xmlrpc_methods(array $methods): array
    {
        unset($methods['pingback.ping'], $methods['pingback.extensions.getPingbacks']);
        return $methods;
    }

    public static function remove_pingback_header(array $headers): array
    {
        unset($headers['X-Pingback']);
        return $headers;
    }

    public static function rest_endpoints(array $endpoints): array
    {
        if (is_user_logged_in()) {
            return $endpoints;
        }
        foreach (array_keys($endpoints) as $route) {
            if (str_starts_with((string) $route, '/wp/v2/users')) {
                unset($endpoints[$route]);
            }
        }
        return $endpoints;
    }

    public static function block_author_enumeration(): void
    {
        if (is_user_logged_in() || !isset($_GET['author'])) {
            return;
        }
        wp_safe_redirect(home_url('/'), 301);
        exit;
    }

    public static function send_security_headers(): void
    {
        if (headers_sent()) {
            return;
        }
        header('X-Content-Type-Options: nosniff');
        header('Referrer-Policy: strict-origin-when-cross-origin');
        header('X-Frame-Options: SAMEORIGIN');
        header('Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()');
        if (is_ssl()) {
            header('Strict-Transport-Security: max-age=31536000');
        }
    }

    /* ------------------------------------------------------------------
     * Audit hooks
     * ------------------------------------------------------------------ */

    public static function on_login(string $user_login, mixed $user = null): void
    {
        if (!$user instanceof \WP_User) {
            $user = get_user_by('login', $user_login);
        }
        if (!$user) {
            return;
        }
        delete_transient('rcm_lf_' . self::attempt_key($user_login));
        rcm_audit('auth.login', 'user', $user->ID, ['login' => $user->user_login, 'mfa' => self::mfa_enabled($user->ID)]);
    }

    public static function on_logout(mixed $user_id = 0): void
    {
        $user_id = (int) $user_id;
        if ($user_id) {
            rcm_audit('auth.logout', 'user', $user_id);
        }
    }

    public static function on_user_register(int $user_id): void
    {
        $user = get_userdata($user_id);
        rcm_audit('user.register', 'user', $user_id, ['login' => $user ? $user->user_login : '', 'roles' => $user ? array_values($user->roles) : []]);
    }

    public static function on_set_role(int $user_id, string $role, array $old_roles = []): void
    {
        if ($old_roles === [$role]) {
            return;
        }
        rcm_audit('user.role_change', 'user', $user_id, ['role' => $role, 'old_roles' => array_values($old_roles)]);
    }

    public static function on_delete_user(int $user_id, mixed $reassign = null): void
    {
        $user = get_userdata($user_id);
        rcm_audit('user.delete', 'user', $user_id, ['login' => $user ? $user->user_login : '', 'reassign' => $reassign ? (int) $reassign : null]);
    }

    public static function on_transition(string $new_status, string $old_status, \WP_Post $post): void
    {
        if ($new_status === $old_status || (($new_status === 'publish') === ($old_status === 'publish'))) {
            return;
        }
        $type = $post->post_type;
        if (!in_array($type, ['post', 'page'], true) && !str_starts_with($type, 'rcm_')) {
            return;
        }
        if (defined('WP_IMPORTING') && WP_IMPORTING) {
            return;
        }
        rcm_audit($new_status === 'publish' ? 'content.publish' : 'content.unpublish', $type, $post->ID, [
            'title' => mb_substr((string) $post->post_title, 0, 120),
            'from' => $old_status,
            'to' => $new_status,
        ]);
    }

    public static function on_plugin_activated(string $plugin): void
    {
        rcm_audit('plugin.activate', 'plugin', mb_substr($plugin, 0, 64), ['plugin' => $plugin]);
    }

    public static function on_plugin_deactivated(string $plugin): void
    {
        rcm_audit('plugin.deactivate', 'plugin', mb_substr($plugin, 0, 64), ['plugin' => $plugin]);
    }

    public static function on_switch_theme(string $new_name, mixed $new_theme = null, mixed $old_theme = null): void
    {
        rcm_audit('theme.switch', 'theme', $new_theme instanceof \WP_Theme ? $new_theme->get_stylesheet() : '', [
            'theme' => $new_name,
            'previous' => $old_theme instanceof \WP_Theme ? $old_theme->get('Name') : '',
        ]);
    }
}
