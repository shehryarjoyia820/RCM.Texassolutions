<?php
/**
 * RCM > Settings.
 *
 * @var array $s               All settings (merged with defaults).
 * @var bool  $key_from_config Gemini key is defined in wp-config.php.
 * @var bool  $has_key         A Gemini key is available.
 */
defined('ABSPATH') || exit;

$c = $s['contact'];
$roles = ['administrator' => __('Administrator', 'rcm'), 'rcm_sales_manager' => __('Sales Manager', 'rcm'), 'rcm_support_agent' => __('Support Agent', 'rcm'), 'rcm_content_editor' => __('Content Editor', 'rcm'), 'editor' => __('Editor', 'rcm')];
$field = static function (string $name, string $label, string $value, string $type = 'text', string $help = ''): void {
    $id = 'rcm-' . sanitize_title($name);
    echo '<tr><th scope="row"><label for="' . esc_attr($id) . '">' . esc_html($label) . '</label></th><td>';
    printf('<input type="%s" id="%s" name="%s" value="%s" class="regular-text">', esc_attr($type), esc_attr($id), esc_attr($name), esc_attr($value));
    if ($help) {
        echo '<p class="description">' . wp_kses_post($help) . '</p>';
    }
    echo '</td></tr>';
};
?>
<div class="wrap rcm-wrap">
    <h1><?php esc_html_e('RCM Settings', 'rcm'); ?></h1>
    <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>">
        <input type="hidden" name="action" value="rcm_save_settings">
        <?php wp_nonce_field('rcm_save_settings'); ?>

        <h2 id="contact"><?php esc_html_e('Contact details', 'rcm'); ?></h2>
        <p class="description"><?php esc_html_e('Shown in the header, footer, contact page and structured data.', 'rcm'); ?></p>
        <table class="form-table" role="presentation">
            <?php
            $field('rcm[contact][email]', __('Public email', 'rcm'), $c['email'], 'email');
            $field('rcm[contact][phone]', __('Phone', 'rcm'), $c['phone']);
            $field('rcm[contact][street]', __('Street address', 'rcm'), $c['street']);
            $field('rcm[contact][city]', __('City', 'rcm'), $c['city']);
            $field('rcm[contact][region]', __('State', 'rcm'), $c['region']);
            $field('rcm[contact][postal_code]', __('ZIP code', 'rcm'), $c['postal_code']);
            $field('rcm[contact][country]', __('Country code', 'rcm'), $c['country']);
            $field('rcm[contact][whatsapp]', __('WhatsApp number', 'rcm'), (string) ($c['whatsapp'] ?? ''), 'text', __('With country code, e.g. +1 (838) 910-3147. Leave blank to hide the WhatsApp buttons.', 'rcm'));
            $field('rcm[contact][whatsapp_message]', __('WhatsApp starting message', 'rcm'), (string) ($c['whatsapp_message'] ?? ''), 'text', __('Pre-filled text when a visitor opens WhatsApp. Do not ask for patient information.', 'rcm'));
            $field('rcm[contact][hours]', __('Business hours (optional)', 'rcm'), $c['hours'], 'text', __('Leave blank unless the hours are confirmed. Shown on the contact page.', 'rcm'));
            $field('rcm[notify_email]', __('Lead notification email', 'rcm'), $s['notify_email'], 'email', __('Form submissions and AI chat notifications are sent here.', 'rcm'));
            ?>
        </table>

        <h2 id="chat"><?php esc_html_e('AI assistant', 'rcm'); ?></h2>
        <table class="form-table" role="presentation">
            <tr><th scope="row"><?php esc_html_e('Status', 'rcm'); ?></th><td><label><input type="checkbox" name="rcm[chat][enabled]" value="1" <?php checked($s['chat']['enabled']); ?>> <?php esc_html_e('Show the AI assistant on the website (needs an API key)', 'rcm'); ?></label></td></tr>
            <tr>
                <th scope="row"><label for="rcm-chat-key"><?php esc_html_e('Google Gemini API key', 'rcm'); ?></label></th>
                <td>
                    <?php if ($key_from_config) : ?>
                        <p><?php esc_html_e('Set in wp-config.php (RCM_GEMINI_API_KEY). It is not shown here.', 'rcm'); ?></p>
                    <?php else : ?>
                        <input type="password" id="rcm-chat-key" name="rcm[chat][api_key]" value="<?php echo $has_key ? '********' : ''; ?>" class="regular-text" autocomplete="off">
                        <?php if ($has_key) : ?><label><input type="checkbox" name="rcm[chat][clear_api_key]" value="1"> <?php esc_html_e('Remove the stored key', 'rcm'); ?></label><?php endif; ?>
                        <p class="description"><?php echo wp_kses_post(__('Create a key at <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">Google AI Studio</a>. For better security, define it in wp-config.php as <code>define( \'RCM_GEMINI_API_KEY\', \'...\' );</code> instead.', 'rcm')); ?></p>
                    <?php endif; ?>
                </td>
            </tr>
            <?php
            $field('rcm[chat][model]', __('Model', 'rcm'), $s['chat']['model'], 'text', __('Default gemini-3.8-flash.', 'rcm'));
            ?>
            <tr><th scope="row"><label for="rcm-chat-welcome"><?php esc_html_e('Welcome message', 'rcm'); ?></label></th><td><textarea id="rcm-chat-welcome" name="rcm[chat][welcome]" rows="3" class="large-text"><?php echo esc_textarea($s['chat']['welcome']); ?></textarea></td></tr>
            <?php
            $field('rcm[chat][idle_minutes]', __('Send the chat summary after (minutes idle)', 'rcm'), (string) $s['chat']['idle_minutes'], 'number');
            $field('rcm[chat][max_messages]', __('Maximum messages per chat', 'rcm'), (string) $s['chat']['max_messages'], 'number');
            $field('rcm[chat][retention_days]', __('Delete chat transcripts after (days)', 'rcm'), (string) $s['chat']['retention_days'], 'number');
            ?>
        </table>

        <h2 id="leads"><?php esc_html_e('Leads and data retention', 'rcm'); ?></h2>
        <table class="form-table" role="presentation">
            <?php
            $field('rcm[leads][duplicate_window_days]', __('Treat the same email as a duplicate within (days)', 'rcm'), (string) $s['leads']['duplicate_window_days'], 'number');
            $field('rcm[leads][retention_days]', __('Delete inactive leads after (days)', 'rcm'), (string) $s['leads']['retention_days'], 'number', __('Applies to leads not updated in this many days. Keep the Privacy Policy in sync with this value.', 'rcm'));
            ?>
        </table>

        <h2 id="analytics"><?php esc_html_e('Analytics and search consoles', 'rcm'); ?></h2>
        <table class="form-table" role="presentation">
            <?php
            $field('rcm[analytics][ga4_id]', __('Google Analytics 4 measurement ID', 'rcm'), $s['analytics']['ga4_id'], 'text', __('Format G-XXXXXXX. GA4 loads only after a visitor accepts analytics cookies.', 'rcm'));
            $field('rcm[analytics][gsc_verification]', __('Google Search Console verification code', 'rcm'), $s['analytics']['gsc_verification'], 'text', __('The content value of the google-site-verification meta tag.', 'rcm'));
            $field('rcm[analytics][bing_verification]', __('Bing Webmaster verification code', 'rcm'), $s['analytics']['bing_verification']);
            ?>
        </table>

        <h2 id="security"><?php esc_html_e('Security', 'rcm'); ?></h2>
        <table class="form-table" role="presentation">
            <tr>
                <th scope="row"><?php esc_html_e('Require two-factor authentication for', 'rcm'); ?></th>
                <td>
                    <?php foreach ($roles as $role => $label) : ?>
                        <label style="display:block"><input type="checkbox" name="rcm[security][mfa_required_roles][]" value="<?php echo esc_attr($role); ?>" <?php checked(in_array($role, (array) $s['security']['mfa_required_roles'], true)); ?>> <?php echo esc_html($label); ?></label>
                    <?php endforeach; ?>
                    <p class="description"><?php esc_html_e('Users in these roles are sent to their profile to set up an authenticator app until they do.', 'rcm'); ?></p>
                </td>
            </tr>
            <?php
            $field('rcm[security][login_max_attempts]', __('Failed logins before lockout', 'rcm'), (string) $s['security']['login_max_attempts'], 'number');
            $field('rcm[security][login_lockout_minutes]', __('Lockout length (minutes)', 'rcm'), (string) $s['security']['login_lockout_minutes'], 'number');
            ?>
            <tr><th scope="row"><?php esc_html_e('Hardening', 'rcm'); ?></th><td>
                <label style="display:block"><input type="checkbox" name="rcm[security][disable_xmlrpc]" value="1" <?php checked($s['security']['disable_xmlrpc']); ?>> <?php esc_html_e('Disable XML-RPC', 'rcm'); ?></label>
                <label style="display:block"><input type="checkbox" name="rcm[security][security_headers]" value="1" <?php checked($s['security']['security_headers']); ?>> <?php esc_html_e('Send security headers (HSTS, nosniff, frame and referrer policies)', 'rcm'); ?></label>
            </td></tr>
        </table>

        <h2 id="seo"><?php esc_html_e('SEO and home page', 'rcm'); ?></h2>
        <table class="form-table" role="presentation">
            <?php $field('rcm[seo][default_og_image]', __('Default social share image (media ID)', 'rcm'), (string) $s['seo']['default_og_image'], 'number', __('Recommended 1200 x 630. Leave 0 to use the generated brand image.', 'rcm')); ?>
            <tr><th scope="row"><?php esc_html_e('AI crawlers', 'rcm'); ?></th><td><label><input type="checkbox" name="rcm[seo][llms_txt]" value="1" <?php checked($s['seo']['llms_txt']); ?>> <?php esc_html_e('Publish /llms.txt and /llms-full.txt', 'rcm'); ?></label></td></tr>
            <tr><th scope="row"><?php esc_html_e('Home page proof sections', 'rcm'); ?></th><td>
                <label style="display:block"><input type="checkbox" name="rcm[home][show_case_studies]" value="1" <?php checked($s['home']['show_case_studies']); ?>> <?php esc_html_e('Show approved case studies', 'rcm'); ?></label>
                <label style="display:block"><input type="checkbox" name="rcm[home][show_testimonials]" value="1" <?php checked($s['home']['show_testimonials']); ?>> <?php esc_html_e('Show approved testimonials', 'rcm'); ?></label>
                <p class="description"><?php esc_html_e('Sections appear only when at least one item is marked approved with an authorization record.', 'rcm'); ?></p>
            </td></tr>
        </table>

        <?php submit_button(__('Save settings', 'rcm')); ?>
    </form>
</div>
