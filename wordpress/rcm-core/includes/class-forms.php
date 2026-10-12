<?php
declare(strict_types=1);

namespace RCM {

    defined('ABSPATH') || exit;

    /**
     * Public lead forms: REST endpoint POST rcm/v1/lead and the form markup
     * (rendered here, enhanced by src/js/forms.ts).
     *
     * Request body (JSON):
     *   { form: 'contact'|'consultation'|'proposal'|'newsletter'|'careers'|'partner'|'calculator'|'resource'|'referral',
     *     fields: { name, email, phone, company, state, specialty, providers, current_billing, services: string[],
     *               challenges, monthly_claims, preferred_date, message, role, profile_url, partnership, context,
     *               consent: bool, marketing: bool, website_url (honeypot) },
     *     attribution?: { [key]: string }, page?: string, elapsedMs?: number }
     * Header: X-WP-Nonce (wp_rest).
     * Response: { ok: true, id, message } | { ok: false, message, errors?: { field: message }, code? }
     */
    final class Forms
    {
        public const FORMS = ['contact', 'consultation', 'proposal', 'newsletter', 'careers', 'partner', 'calculator', 'resource', 'referral'];

        /** Variants with their own layout; other forms (calculator, resource, referral) use the contact layout. */
        public const LAYOUTS = ['contact', 'consultation', 'proposal', 'careers', 'partner', 'newsletter'];

        public const US_STATES = [
            'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia',
            'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan',
            'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
            'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
            'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming', 'Puerto Rico',
        ];
        public const PROVIDER_COUNTS = ['1', '2-5', '6-10', '11-25', '26-50', '51+'];
        public const BILLING_ARRANGEMENTS = ['In-house billing team', 'Another billing company', 'Mix of in-house and outsourced', 'Starting a new practice', 'Other'];
        public const CLAIM_VOLUMES = ['Under 250', '250-1,000', '1,000-2,500', '2,500-5,000', '5,000+', 'Not sure'];
        public const PARTNERSHIP_TYPES = ['Referral partner', 'Software or technology partner', 'Consultant or practice advisor', 'Billing company (white label or overflow)', 'Other'];

        private const EMAIL_RE = '/^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/';
        private const PHONE_RE = '/^[+()\d\s.\-]{7,40}$/';
        private const MIN_FILL_MS = 2500;

        private static int $counter = 0;

        public static function init(): void
        {
            add_action('rest_api_init', [self::class, 'routes']);
            add_action('init', static function (): void {
                add_shortcode('rcm_form', [self::class, 'shortcode']);
            });
        }

        /* -------------------------------------------------------------- */
        /*  Shared copy                                                    */
        /* -------------------------------------------------------------- */

        public static function consent_text(): string
        {
            return __('I agree that Texas Solutions may store these details and contact me by email or phone about this enquiry, as described in the Privacy Policy.', 'rcm');
        }

        public static function newsletter_consent_text(): string
        {
            return __('By subscribing you agree to receive emails from Texas Solutions. See our Privacy Policy.', 'rcm');
        }

        public static function phi_warning(): string
        {
            return __('Please do not include patient names, dates of birth, member IDs, diagnoses or any other patient health information. This form is for business enquiries only.', 'rcm');
        }

        /* -------------------------------------------------------------- */
        /*  REST                                                           */
        /* -------------------------------------------------------------- */

        public static function routes(): void
        {
            register_rest_route('rcm/v1', '/lead', [
                'methods' => 'POST',
                'callback' => [self::class, 'handle'],
                'permission_callback' => '__return_true',
            ]);
        }

        private static function reply(array $data, int $status = 200): \WP_REST_Response
        {
            $r = new \WP_REST_Response($data, $status);
            $r->header('Cache-Control', 'no-store, max-age=0');
            return $r;
        }

        public static function handle(\WP_REST_Request $request): \WP_REST_Response
        {
            $nonce = (string) $request->get_header('X-WP-Nonce');
            if ($nonce === '' || !wp_verify_nonce($nonce, 'wp_rest')) {
                return self::reply(['ok' => false, 'code' => 'rcm_nonce', 'message' => __('Your session expired. Please reload the page and try again.', 'rcm')], 403);
            }
            $contact_email = (string) rcm_setting('contact.email', 'info@texassolutions.co');
            if (rcm_rate_limited('lead', 8, 10 * MINUTE_IN_SECONDS)) {
                /* translators: %s: email address */
                return self::reply(['ok' => false, 'message' => sprintf(__('Too many submissions. Please wait a few minutes or email %s.', 'rcm'), $contact_email)], 429);
            }

            $p = $request->get_json_params();
            if (!is_array($p)) {
                $p = $request->get_body_params();
            }
            $form = is_string($p['form'] ?? null) ? $p['form'] : '';
            $f = $p['fields'] ?? null;
            if (!in_array($form, self::FORMS, true) || !is_array($f)) {
                return self::reply(['ok' => false, 'message' => __('Invalid request.', 'rcm')], 400);
            }
            $attribution = is_array($p['attribution'] ?? null) ? $p['attribution'] : [];
            $page = rcm_clean($p['page'] ?? '', 300);
            $elapsed = is_numeric($p['elapsedMs'] ?? null) ? (float) $p['elapsedMs'] : 0.0;

            // Spam: honeypot filled or submitted faster than a person can type. Pretend success.
            if (rcm_clean($f['website_url'] ?? '', 200) !== '' || $elapsed < self::MIN_FILL_MS) {
                return self::reply(['ok' => true, 'message' => __('Thank you.', 'rcm')]);
            }

            $errors = [];
            $email = strtolower(rcm_clean($f['email'] ?? '', 160));
            $name = rcm_clean($f['name'] ?? '', 120);
            if ($name === '' && $form === 'newsletter' && str_contains($email, '@')) {
                $name = mb_substr((string) strstr($email, '@', true), 0, 120);
            }
            $phone = rcm_clean($f['phone'] ?? '', 40);
            $company = rcm_clean($f['company'] ?? '', 160);
            $practice = $form === 'consultation' || $form === 'proposal';

            if ($name === '') {
                $errors['name'] = __('Please enter your name.', 'rcm');
            }
            if (!preg_match(self::EMAIL_RE, $email) || !is_email($email)) {
                $errors['email'] = __('Please enter a valid email address.', 'rcm');
            }
            if (($f['consent'] ?? null) !== true) {
                $errors['consent'] = __('Please confirm so we can contact you.', 'rcm');
            }
            if ($practice && $phone === '') {
                $errors['phone'] = __('Please enter a phone number.', 'rcm');
            }
            if ($practice && $company === '') {
                $errors['company'] = __('Please enter your practice or company name.', 'rcm');
            }
            if ($phone !== '' && !preg_match(self::PHONE_RE, $phone)) {
                $errors['phone'] = __('Please enter a valid phone number.', 'rcm');
            }
            if ($form === 'contact' && rcm_clean_text($f['message'] ?? '', 3000) === '') {
                $errors['message'] = __('Please enter a message.', 'rcm');
            }
            if ($errors) {
                return self::reply(['ok' => false, 'message' => __('Please fix the highlighted fields.', 'rcm'), 'errors' => $errors], 422);
            }

            $extra = [];
            if ($form === 'careers') {
                $profile = esc_url_raw(rcm_clean($f['profile_url'] ?? '', 200), ['http', 'https']);
                $extra[] = 'Role: ' . (rcm_clean($f['role'] ?? '', 120) ?: 'not given');
                $extra[] = 'Profile: ' . ($profile ?: 'not given');
            }
            if ($form === 'partner') {
                $extra[] = 'Partnership type: ' . (rcm_clean($f['partnership'] ?? '', 80) ?: 'not given');
            }
            $context = rcm_clean_text($f['context'] ?? '', 2000);
            if ($context !== '') {
                $extra[] = "Context:\n" . $context;
            }
            $message = implode("\n\n", array_filter(array_merge([rcm_clean_text($f['message'] ?? '', 3000)], $extra), static fn($s): bool => $s !== ''));
            $challenges = rcm_clean($f['challenges'] ?? '', 300);

            $phi_message = __('Your message looks like it may contain patient information. Please remove patient names, dates of birth, member IDs or other health details and send again.', 'rcm');
            if (rcm_looks_like_phi($message)) {
                return self::reply(['ok' => false, 'message' => $phi_message, 'errors' => ['message' => __('Please remove patient information.', 'rcm')]], 422);
            }
            if ($challenges !== '' && rcm_looks_like_phi($challenges)) {
                return self::reply(['ok' => false, 'message' => $phi_message, 'errors' => ['challenges' => __('Please remove patient information.', 'rcm')]], 422);
            }

            $valid_services = array_map('strval', array_keys(Content_Types::all(Content_Types::SERVICE)));
            $services = [];
            foreach ((is_array($f['services'] ?? null) ? $f['services'] : []) as $s) {
                $s = rcm_clean($s, 60);
                if ($s !== '' && in_array($s, $valid_services, true) && !in_array($s, $services, true)) {
                    $services[] = $s;
                }
            }
            $services = array_slice($services, 0, 40);

            $attr = [];
            foreach ($attribution as $k => $v) {
                $k = rcm_clean((string) $k, 30);
                $v = rcm_clean($v, 200);
                if ($k !== '' && $v !== '') {
                    $attr[$k] = $v;
                }
                if (count($attr) >= 12) {
                    break;
                }
            }

            $pick = static function (mixed $v, array $allowed): string {
                $v = rcm_clean($v, 80);
                return in_array($v, $allowed, true) ? $v : '';
            };
            $preferred = rcm_clean($f['preferred_date'] ?? '', 20);
            if (!preg_match('/^(\d{4})-(\d{2})-(\d{2})$/', $preferred, $m) || !checkdate((int) $m[2], (int) $m[3], (int) $m[1])) {
                $preferred = '';
            }

            try {
                $res = Leads::create([
                    'name' => $name,
                    'email' => $email,
                    'phone' => $phone,
                    'company' => $company,
                    'state' => $pick($f['state'] ?? '', self::US_STATES),
                    'specialty' => rcm_clean($f['specialty'] ?? '', 80),
                    'providers' => $pick($f['providers'] ?? '', self::PROVIDER_COUNTS),
                    'current_billing' => $pick($f['current_billing'] ?? '', self::BILLING_ARRANGEMENTS),
                    'services' => $services,
                    'challenges' => $challenges,
                    'monthly_claims' => $pick($f['monthly_claims'] ?? '', self::CLAIM_VOLUMES),
                    'preferred_date' => $preferred,
                    'message' => $message,
                    'source' => $form,
                    'source_page' => $page,
                    'attribution' => $attr,
                    'consent_text' => $form === 'newsletter' ? self::newsletter_consent_text() : self::consent_text(),
                    'marketing_consent' => ($f['marketing'] ?? null) === true,
                ]);
            } catch (\Throwable $e) {
                error_log('RCM lead save failed: ' . $e->getMessage()); // phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_error_log
                /* translators: %s: email address */
                return self::reply(['ok' => false, 'message' => sprintf(__('We could not save your request. Please email %s instead.', 'rcm'), $contact_email)], 500);
            }

            $lead = $res['lead'];
            Leads::notify($lead, $res['duplicate_of']);

            return self::reply([
                'ok' => true,
                'id' => (string) $lead['id'],
                'message' => $form === 'newsletter'
                    ? __('Thanks, you are subscribed. You can unsubscribe from any email.', 'rcm')
                    /* translators: %s: lead reference */
                    : sprintf(__('Thank you. Your request has reached our team and we will reply by email. Your reference is %s.', 'rcm'), (string) $lead['id']),
            ]);
        }

        /* -------------------------------------------------------------- */
        /*  Shortcode                                                      */
        /* -------------------------------------------------------------- */

        /** [rcm_form type="consultation" service="" context="" source="" compact="0" submit_label="" title=""] */
        public static function shortcode(mixed $atts): string
        {
            $a = shortcode_atts([
                'type' => 'consultation',
                'service' => '',
                'context' => '',
                'source' => '',
                'compact' => '',
                'submit_label' => '',
                'title' => '',
            ], is_array($atts) ? $atts : [], 'rcm_form');
            return self::render((string) $a['type'], [
                'default_service' => (string) $a['service'],
                'context' => (string) $a['context'],
                'source' => (string) $a['source'],
                'compact' => in_array(strtolower((string) $a['compact']), ['1', 'true', 'yes'], true),
                'submit_label' => (string) $a['submit_label'],
                'title' => (string) $a['title'],
            ]);
        }

        /* -------------------------------------------------------------- */
        /*  Rendering                                                      */
        /* -------------------------------------------------------------- */

        /**
         * Full form markup.
         *
         * @param string $variant contact|consultation|proposal|careers|partner|newsletter, or
         *                        calculator|resource|referral (contact layout, recorded with that source).
         * @param array  $args    default_service (service key), context (hidden text appended to the message),
         *                        source (lead source override, one of FORMS), compact (bool),
         *                        submit_label, title.
         */
        public static function render(string $variant, array $args = []): string
        {
            $variant = sanitize_key($variant);
            if ($variant === 'newsletter') {
                return self::render_newsletter($args);
            }
            $layout = in_array($variant, self::LAYOUTS, true) ? $variant : 'contact';
            $source = sanitize_key((string) ($args['source'] ?? ''));
            if (!in_array($source, self::FORMS, true) || $source === 'newsletter') {
                $source = in_array($variant, self::FORMS, true) ? $variant : $layout;
            }
            $overridden = $source !== $layout;
            $compact = !empty($args['compact']);
            $practice = $layout === 'consultation' || $layout === 'proposal';
            $uid = 'rcm-f' . (++self::$counter);
            $default_service = sanitize_key((string) ($args['default_service'] ?? ''));
            $context = rcm_clean_text($args['context'] ?? '', 2000);
            $titles = [
                'contact' => __('Send message', 'rcm'),
                'consultation' => __('Request my free consultation', 'rcm'),
                'proposal' => __('Request a proposal', 'rcm'),
                'careers' => __('Send application', 'rcm'),
                'partner' => __('Send partnership enquiry', 'rcm'),
            ];
            $submit = rcm_clean($args['submit_label'] ?? '', 80) ?: $titles[$layout];
            $title = rcm_clean($args['title'] ?? '', 160);

            $h = '<div class="rcm-form" data-rcm-form-wrap>';
            if ($title !== '') {
                $h .= '<h2 class="mb-5 font-display text-2xl font-semibold text-navy-900">' . esc_html($title) . '</h2>';
            }
            $h .= '<form class="space-y-5" novalidate data-rcm-form="' . esc_attr($source) . '" data-layout="' . esc_attr($layout) . '" data-tools-url="' . esc_url(home_url('/tools/')) . '">';

            // Honeypot: hidden from people, filled by bots.
            $h .= '<div aria-hidden="true" class="absolute left-[-9999px] h-px w-px overflow-hidden"><label>' . esc_html__('Company website', 'rcm')
                . ' <input type="text" name="website_url" tabindex="-1" autocomplete="off"></label></div>';
            if ($context !== '') {
                $h .= '<input type="hidden" name="context" value="' . esc_attr($context) . '">';
            }

            $h .= '<div class="grid gap-5' . ($compact ? '' : ' sm:grid-cols-2') . '">';
            $h .= self::field($uid, 'name', __('Full name', 'rcm'), true, self::input($uid, 'name', 'text', true, ['autocomplete' => 'name', 'maxlength' => '120']));
            $h .= self::field($uid, 'email', $layout === 'careers' ? __('Email', 'rcm') : __('Business email', 'rcm'), true, self::input($uid, 'email', 'email', true, ['autocomplete' => 'email', 'maxlength' => '160']));
            $h .= self::field($uid, 'phone', __('Phone', 'rcm'), $practice, self::input($uid, 'phone', 'tel', $practice, ['autocomplete' => 'tel', 'maxlength' => '40']));
            if ($layout !== 'careers') {
                $h .= self::field($uid, 'company', $layout === 'partner' ? __('Company', 'rcm') : __('Practice or company name', 'rcm'), $practice, self::input($uid, 'company', 'text', $practice, ['autocomplete' => 'organization', 'maxlength' => '160']));
            }

            if ($practice) {
                $specialties = [];
                foreach (Content_Types::all(Content_Types::SPECIALTY) as $post) {
                    $specialties[] = (string) $post->post_title;
                }
                $specialties[] = 'Other';
                $h .= self::field($uid, 'state', __('State', 'rcm'), false, self::select($uid, 'state', self::US_STATES, __('Select a state', 'rcm')));
                $h .= self::field($uid, 'specialty', __('Practice specialty', 'rcm'), false, self::select($uid, 'specialty', $specialties, __('Select a specialty', 'rcm')));
                $h .= self::field($uid, 'providers', __('Number of providers', 'rcm'), false, self::select($uid, 'providers', self::PROVIDER_COUNTS, __('Select', 'rcm')));
                $h .= self::field($uid, 'current_billing', __('Current billing arrangement', 'rcm'), false, self::select($uid, 'current_billing', self::BILLING_ARRANGEMENTS, __('Select', 'rcm')));
                if ($layout === 'proposal') {
                    $h .= self::field($uid, 'monthly_claims', __('Monthly claim volume', 'rcm'), false, self::select($uid, 'monthly_claims', self::CLAIM_VOLUMES, __('Select', 'rcm')));
                }
                $hint = __('We will confirm a time by email.', 'rcm');
                $h .= self::field($uid, 'preferred_date', __('Preferred consultation date', 'rcm'), false, self::input($uid, 'preferred_date', 'date', false, ['min' => wp_date('Y-m-d')], true), $hint);
            }

            if ($layout === 'careers') {
                $h .= self::field($uid, 'role', __('Role you are interested in', 'rcm'), false, self::input($uid, 'role', 'text', false, ['maxlength' => '120', 'placeholder' => __('e.g. AR follow-up specialist', 'rcm')]));
                $h .= self::field($uid, 'profile_url', __('LinkedIn or portfolio URL', 'rcm'), false, self::input($uid, 'profile_url', 'url', false, ['maxlength' => '200']));
            }
            if ($layout === 'partner') {
                $h .= self::field($uid, 'partnership', __('Type of partnership', 'rcm'), false, self::select($uid, 'partnership', self::PARTNERSHIP_TYPES, __('Select', 'rcm')), '', 'sm:col-span-2');
            }
            $h .= '</div>';

            if ($practice) {
                $services = Content_Types::all(Content_Types::SERVICE);
                if ($services) {
                    $h .= '<fieldset><legend class="field-label">' . esc_html__('Services you are interested in', 'rcm') . ' <span class="font-normal text-ink-subtle">' . esc_html__('(optional)', 'rcm') . '</span></legend>';
                    $h .= '<div class="mt-1 grid max-h-64 gap-x-4 gap-y-1.5 overflow-y-auto rounded-xl border border-line p-3 sm:grid-cols-2">';
                    $i = 0;
                    foreach ($services as $key => $post) {
                        $key = (string) $key;
                        $id = $uid . '-svc-' . (++$i);
                        $h .= '<label for="' . esc_attr($id) . '" class="flex items-start gap-2 text-sm text-navy-800">'
                            . '<input id="' . esc_attr($id) . '" type="checkbox" name="services" value="' . esc_attr($key) . '" class="mt-0.5 h-4 w-4 rounded border-line text-teal-600 focus:ring-teal-500"' . ($key === $default_service ? ' checked' : '') . '>'
                            . esc_html((string) $post->post_title) . '</label>';
                    }
                    $h .= '</div></fieldset>';
                }
                $h .= self::field($uid, 'challenges', __('Main challenges', 'rcm'), false, self::input($uid, 'challenges', 'text', false, ['maxlength' => '300', 'placeholder' => __('e.g. rising denials, aging AR, credentialing backlog', 'rcm')]));
            }

            $message_required = $layout === 'contact' && !$overridden;
            $textarea = '<textarea id="' . esc_attr($uid . '-message') . '" name="message" rows="' . ($compact ? '3' : '5') . '" class="field" maxlength="3000"' . ($message_required ? ' required aria-required="true"' : '') . '></textarea>';
            $h .= self::field($uid, 'message', $layout === 'careers' ? __('Tell us about your experience', 'rcm') : __('Message', 'rcm'), $message_required, $textarea);

            $h .= '<p class="flex gap-2 rounded-xl bg-amber-50 px-3.5 py-2.5 text-sm text-amber-900">' . wp_kses(rcm_icon('ShieldAlert', 'mt-0.5 h-4 w-4 shrink-0'), rcm_svg_kses()) . '<span>' . esc_html(self::phi_warning()) . '</span></p>';

            $privacy = '<a href="' . esc_url(rcm_page_url('privacy-policy')) . '" class="font-medium text-teal-700 underline">' . esc_html__('Privacy Policy', 'rcm') . '</a>';
            $consent_label = esc_html__('I agree that Texas Solutions may store these details and contact me by email or phone about this enquiry, as described in the', 'rcm') . ' ' . $privacy . '.';
            $h .= '<div class="space-y-2.5">';
            $h .= '<label for="' . esc_attr($uid . '-consent') . '" class="flex items-start gap-2.5 text-sm text-navy-800">'
                . '<input id="' . esc_attr($uid . '-consent') . '" type="checkbox" name="consent" value="1" required aria-required="true" class="mt-0.5 h-4 w-4 rounded border-line text-teal-600 focus:ring-teal-500">'
                . '<span>' . $consent_label . ' <span class="text-red-600" aria-hidden="true">*</span></span></label>';
            $h .= self::error_el($uid, 'consent');
            if ($layout !== 'careers') {
                $h .= '<label for="' . esc_attr($uid . '-marketing') . '" class="flex items-start gap-2.5 text-sm text-ink-muted">'
                    . '<input id="' . esc_attr($uid . '-marketing') . '" type="checkbox" name="marketing" value="1" class="mt-0.5 h-4 w-4 rounded border-line text-teal-600 focus:ring-teal-500">'
                    . esc_html__('Send me occasional RCM guides and updates (optional).', 'rcm') . '</label>';
            }
            $h .= '</div>';

            $h .= '<p data-rcm-form-message role="alert" class="text-sm font-medium text-red-600" hidden></p>';
            $h .= '<button type="submit" class="btn-primary w-full sm:w-auto">' . self::spinner() . '<span>' . esc_html($submit) . '</span></button>';
            $h .= '</form></div>';
            return $h;
        }

        private static function render_newsletter(array $args): string
        {
            $uid = 'rcm-f' . (++self::$counter);
            $submit = rcm_clean($args['submit_label'] ?? '', 40) ?: __('Subscribe', 'rcm');
            $h = '<div class="rcm-form rcm-form-newsletter" data-rcm-form-wrap>';
            $h .= '<form class="w-full" novalidate data-rcm-form="newsletter" data-layout="newsletter">';
            $h .= '<div class="flex flex-col gap-2 sm:flex-row">';
            $h .= '<label for="' . esc_attr($uid . '-email') . '" class="sr-only">' . esc_html__('Work email', 'rcm') . '</label>';
            $h .= '<input id="' . esc_attr($uid . '-email') . '" name="email" type="email" autocomplete="email" required aria-required="true" maxlength="160" placeholder="you@practice.com"'
                . ' class="min-w-0 flex-1 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-navy-300 focus:border-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-400/30">';
            $h .= '<input type="text" name="website_url" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">';
            $h .= '<button type="submit" class="btn-primary shrink-0">' . self::spinner() . '<span>' . esc_html($submit) . '</span></button>';
            $h .= '</div>';
            $h .= '<p class="mt-2 text-xs text-navy-300">' . esc_html__('By subscribing you agree to receive emails from Texas Solutions. See our', 'rcm')
                . ' <a href="' . esc_url(rcm_page_url('privacy-policy')) . '" class="underline hover:text-white">' . esc_html__('Privacy Policy', 'rcm') . '</a>.</p>';
            $h .= '<p id="' . esc_attr($uid . '-email-error') . '" data-error-for="email" class="mt-2 text-sm text-red-300" hidden></p>';
            $h .= '<p data-rcm-form-message role="alert" class="mt-2 text-sm text-red-300" hidden></p>';
            $h .= '</form></div>';
            return $h;
        }

        private static function spinner(): string
        {
            return '<svg data-rcm-spinner class="hidden h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">'
                . '<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="3" opacity="0.25"></circle>'
                . '<path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="3" stroke-linecap="round"></path></svg>';
        }

        private static function error_el(string $uid, string $name): string
        {
            return '<p id="' . esc_attr($uid . '-' . $name . '-error') . '" class="field-error" data-error-for="' . esc_attr($name) . '" hidden></p>';
        }

        /** Label + control + hint + error placeholder. $control must already be escaped. */
        private static function field(string $uid, string $name, string $label, bool $required, string $control, string $hint = '', string $class = ''): string
        {
            $h = '<div' . ($class !== '' ? ' class="' . esc_attr($class) . '"' : '') . ' data-field="' . esc_attr($name) . '">';
            $h .= '<label for="' . esc_attr($uid . '-' . $name) . '" class="field-label">' . esc_html($label);
            $h .= $required
                ? '<span class="text-red-600" aria-hidden="true"> *</span>'
                : ' <span class="font-normal text-ink-subtle">' . esc_html__('(optional)', 'rcm') . '</span>';
            $h .= '</label>' . $control;
            if ($hint !== '') {
                $h .= '<p id="' . esc_attr($uid . '-' . $name . '-hint') . '" class="mt-1 text-xs text-ink-subtle">' . esc_html($hint) . '</p>';
            }
            $h .= self::error_el($uid, $name) . '</div>';
            return $h;
        }

        private static function input(string $uid, string $name, string $type, bool $required, array $attrs = [], bool $has_hint = false): string
        {
            $h = '<input id="' . esc_attr($uid . '-' . $name) . '" name="' . esc_attr($name) . '" type="' . esc_attr($type) . '" class="field"';
            foreach ($attrs as $k => $v) {
                $h .= ' ' . esc_attr((string) $k) . '="' . esc_attr((string) $v) . '"';
            }
            if ($required) {
                $h .= ' required aria-required="true"';
            }
            if ($has_hint) {
                $h .= ' aria-describedby="' . esc_attr($uid . '-' . $name . '-hint') . '"';
            }
            return $h . '>';
        }

        private static function select(string $uid, string $name, array $options, string $placeholder): string
        {
            $h = '<select id="' . esc_attr($uid . '-' . $name) . '" name="' . esc_attr($name) . '" class="field">';
            $h .= '<option value="">' . esc_html($placeholder) . '</option>';
            foreach ($options as $o) {
                $h .= '<option value="' . esc_attr((string) $o) . '">' . esc_html((string) $o) . '</option>';
            }
            return $h . '</select>';
        }
    }
}

namespace {

    defined('ABSPATH') || exit;

    if (!function_exists('rcm_form')) {
        /** Echoes a lead form. See \RCM\Forms::render() for variants and args. */
        function rcm_form(string $variant, array $args = []): void
        {
            echo \RCM\Forms::render($variant, $args); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- escaped in render().
        }
    }
}
