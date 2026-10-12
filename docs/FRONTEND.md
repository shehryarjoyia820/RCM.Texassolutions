# Front-end conventions

## CSS (Tailwind 3, compiled into the theme)

`build/theme.css` defines component classes; Tailwind scans `wordpress/**/*.php` and `src/js/**/*.ts`, so any utility class used in plugin PHP or JS is compiled. Palette: `navy-50…950`, `teal-50…900`, `ink` (#0f1f3f), `ink-muted`, `ink-subtle`, `line` (#e3e8f0), `canvas` (#f7f9fc). Fonts: `font-display` (Plus Jakarta Sans), `font-sans` (Inter).

Component classes (use these instead of re-inventing):

| Class | Use |
|---|---|
| `container` | page width wrapper (max 1240px, 16px gutters on phones) |
| `btn-primary`, `btn-navy`, `btn-outline`, `btn-ghost-light` (on dark), `btn-sm` | buttons/links |
| `card` | white rounded-2xl bordered box with soft shadow |
| `chip` | small rounded pill |
| `eyebrow` | small uppercase teal label above headings |
| `field`, `field-label`, `field-error` | form controls |
| `prose-rcm` | long-form text (posts, policies, page content) |
| `notice-info`, `notice-warn` | inline notices |
| `admin-*` | not Tailwind: admin screens use WordPress core admin markup (`wrap`, `widefat striped`, `button button-primary`, `notice notice-success`) plus `wordpress/rcm-core/assets/css/admin.css` |

Accessibility: every input has a `<label for>`; errors use `aria-invalid` + `aria-describedby`; live regions `aria-live="polite"` for results; visible focus rings come from the base stylesheet; touch targets ≥ 44px.

## JavaScript

Sources in `src/js/` (TypeScript, no framework), bundled by esbuild (`npm run build:js`):

| Bundle | Entry | Loaded |
|---|---|---|
| `rcm-core/assets/js/site.js` | `src/js/site.ts` | every public page (nav, consent + analytics, forms, chat widget) |
| `rcm-core/assets/js/tools.js` | `src/js/tools.ts` | tool pages and the /tools archive |
| `rcm-core/assets/js/calc/<key>.js` | generated from `src/content/tools/calculators/<key>.ts` | the matching calculator page only; registers `window.RCM_CALC['<key>'] = compute` |
| `rcm-core/assets/js/admin.js` | `src/js/admin.ts` | RCM admin screens and RCM meta boxes |

`src/js/site.ts` imports and runs `initNav()`, `initAnalytics()`, `initForms()`, `initChat()` from `src/js/nav.ts`, `analytics.ts`, `forms.ts`, `chat.ts`.

Runtime config is printed by the plugin before the scripts as `window.RCM`:

```ts
interface RcmConfig {
  rest: string;            // e.g. "https://rcm.texassolutions.co/wp-json/rcm/v1/"
  nonce: string;           // wp_create_nonce('wp_rest'), send as X-WP-Nonce
  ga4: string;             // GA4 measurement id or ''
  chat: { enabled: boolean; welcome: string };
  privacyUrl: string;
  consultationUrl: string;
  phiWarning: string;
  consentText: string;     // form consent sentence
  chatConsentText: string;
}
```

Markup hooks use `data-rcm-*` attributes (e.g. `data-rcm-form="consultation"`, `data-rcm-calc="net-collection-rate-calculator"`, `data-rcm-open-chat`). Never put personal data or form/chat text in analytics events (`track(name, props)` from `src/js/analytics.ts`).

## REST API (`/wp-json/rcm/v1/`)

| Route | Method | Module |
|---|---|---|
| `lead` | POST | class-forms.php |
| `chat/start`, `chat/message`, `chat/end`, `chat/history` | POST | class-chat.php |
| `lookup?type=icd10\|hcpcs\|npi` | GET | class-tools.php |
| `event` | POST | class-analytics.php |
| `nonce` | GET | class-assets.php: returns a fresh wp_rest nonce (pages are cached by WP Super Cache). `src/js/site.ts` calls `refreshNonce()` on first interaction; always read `window.RCM.nonce` at request time, never cache it in a variable at load. |

All public routes: `permission_callback => '__return_true'`, then verify `X-WP-Nonce` (`wp_verify_nonce(..., 'wp_rest')`) where a page session exists, apply `rcm_rate_limited()`, validate and sanitize every field, return `{ ok: bool, message?: string, errors?: {field: message} }`.

Email: use `wp_mail()` (the site uses WP Mail SMTP). Notification address: `rcm_setting('notify_email')`.
