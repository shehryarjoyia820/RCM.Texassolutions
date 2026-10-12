/**
 * First-party analytics + optional GA4 behind a consent banner.
 *
 * - Events go to POST {RCM.rest}event (no cookies, no personal data; paths without query strings).
 * - A random visitor id (localStorage 'rcm_vid') exists only after the visitor accepts analytics.
 * - gtag.js is loaded only after consent, and only when a GA4 id is configured.
 * - Never pass form contents, chat text or other personal data in props.
 */

export type EventName =
  | 'page_view'
  | 'tool_use'
  | 'tool_result_copy'
  | 'tool_result_share'
  | 'tool_result_print'
  | 'tool_cta'
  | 'form_submit'
  | 'cta_click'
  | 'chat_open'
  | 'chat_start'
  | 'chat_message'
  | 'blog_read'
  | 'lookup_search'
  | 'checklist_print'
  | 'resource_download';

export type EventProps = Record<string, string | number | boolean>;

type ConsentState = 'granted' | 'denied';

const CONSENT_KEY = 'rcm_consent';
const VID_KEY = 'rcm_vid';

// State lives on window/DOM, not in module variables: site.js and tools.js each bundle a copy of this module.
const isStaff = () => typeof document !== 'undefined' && !!document.body?.classList.contains('logged-in');
const gtagReady = () => typeof window.gtag === 'function';
let bannerEl: HTMLElement | null = null;

const cfg = () => (typeof window !== 'undefined' ? window.RCM : undefined);
const consentVersion = () => cfg()?.consent?.version ?? 1;

function storageGet(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function storageSet(key: string, value: string | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage blocked: behave as no consent stored */
  }
}

/** Stored choice for the current consent version, or null when the visitor has not chosen. */
export function getConsent(): ConsentState | null {
  const raw = storageGet(CONSENT_KEY);
  if (!raw) return null;
  const [state, version] = raw.split(':');
  if (Number(version) !== consentVersion()) return null;
  return state === 'granted' || state === 'denied' ? state : null;
}

/** Random visitor id, only when analytics consent was given; '' otherwise. */
export function getVisitorId(): string {
  if (getConsent() !== 'granted') return '';
  let vid = storageGet(VID_KEY) ?? '';
  if (!/^[a-f0-9]{32}$/.test(vid)) {
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    vid = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
    storageSet(VID_KEY, vid);
  }
  return vid;
}

function cleanProps(props?: EventProps): EventProps {
  const out: EventProps = {};
  if (!props) return out;
  let n = 0;
  for (const [k, v] of Object.entries(props)) {
    if (n >= 8) break;
    const key = k.toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 32);
    if (!key) continue;
    if (typeof v === 'string') out[key] = v.slice(0, 80);
    else if (typeof v === 'boolean') out[key] = v;
    else if (typeof v === 'number' && Number.isFinite(v)) out[key] = v;
    else continue;
    n++;
  }
  return out;
}

function utm(): { utm_source: string; utm_medium: string } {
  const q = new URLSearchParams(location.search);
  return { utm_source: (q.get('utm_source') ?? '').slice(0, 40), utm_medium: (q.get('utm_medium') ?? '').slice(0, 40) };
}

/** Records an event (first-party endpoint, and GA4 when consented). */
export function track(name: EventName, props?: EventProps): void {
  // Logged-in staff (pages are not cached for them) are not counted.
  if (isStaff()) return;
  const rest = cfg()?.rest;
  const clean = cleanProps(props);

  if (rest) {
    const payload: Record<string, unknown> = {
      name,
      path: location.pathname,
      visitor: getVisitorId(),
      props: clean,
    };
    if (name === 'page_view') {
      payload.ref = document.referrer || '';
      Object.assign(payload, utm());
    }
    const body = JSON.stringify(payload);
    const url = `${rest}event`;
    let sent = false;
    try {
      if (navigator.sendBeacon) sent = navigator.sendBeacon(url, new Blob([body], { type: 'application/json' }));
    } catch {
      sent = false;
    }
    if (!sent) {
      try {
        void fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
          credentials: 'omit',
        }).catch(() => undefined);
      } catch {
        /* ignore */
      }
    }
  }

  // GA4 records its own page views; forward other events.
  if (name !== 'page_view' && gtagReady() && getConsent() === 'granted') {
    window.gtag?.('event', name, clean);
  }
}

function loadGtag(): void {
  const id = cfg()?.ga4;
  if (!id || gtagReady() || !/^G-[A-Z0-9]{4,15}$/.test(id)) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js expects the Arguments object itself.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
  window.gtag('js', new Date());
  window.gtag('config', id, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

function setConsent(state: ConsentState): void {
  storageSet(CONSENT_KEY, `${state}:${consentVersion()}`);
  if (state === 'granted') {
    getVisitorId();
    loadGtag();
  } else {
    storageSet(VID_KEY, null);
    if (gtagReady()) window.gtag?.('consent', 'update', { analytics_storage: 'denied' });
  }
  hideBanner();
}

function hideBanner(): void {
  bannerEl?.remove();
  bannerEl = null;
}

function showBanner(): void {
  const c = cfg();
  if (!c?.ga4 || bannerEl) return;
  const copy = c.consent;
  const el = document.createElement('div');
  el.className =
    'rcm-consent fixed inset-x-4 bottom-4 z-50 mx-auto max-w-2xl rounded-2xl border border-line bg-white p-4 text-sm text-ink shadow-lg sm:flex sm:items-center sm:gap-4';
  el.setAttribute('role', 'region');
  el.setAttribute('aria-label', 'Cookie consent');

  const text = document.createElement('p');
  text.className = 'm-0 flex-1 text-ink-muted';
  text.textContent = `${copy?.text || 'We use Google Analytics cookies to understand which pages and tools are useful. They are only set if you accept.'} `;
  if (c.cookieUrl) {
    const a = document.createElement('a');
    a.href = c.cookieUrl;
    a.className = 'font-medium text-teal-700 underline';
    a.textContent = copy?.policy || 'Cookie policy';
    text.appendChild(a);
  }

  const actions = document.createElement('div');
  actions.className = 'mt-3 flex shrink-0 gap-2 sm:mt-0';
  const decline = document.createElement('button');
  decline.type = 'button';
  decline.className = 'btn-outline btn-sm';
  decline.textContent = copy?.decline || 'Decline';
  decline.addEventListener('click', () => setConsent('denied'));
  const accept = document.createElement('button');
  accept.type = 'button';
  accept.className = 'btn-primary btn-sm';
  accept.textContent = copy?.accept || 'Accept analytics';
  accept.addEventListener('click', () => setConsent('granted'));
  actions.append(decline, accept);

  el.append(text, actions);
  document.body.appendChild(el);
  bannerEl = el;
}

function isLanding(): boolean {
  if (!document.referrer) return true;
  try {
    return new URL(document.referrer).host !== location.host;
  } catch {
    return true;
  }
}

function initBlogRead(): void {
  const article = document.querySelector<HTMLElement>('article[data-rcm-article]');
  if (!article) return;
  let done = false;
  let ticking = false;
  const check = () => {
    ticking = false;
    if (done) return;
    const rect = article.getBoundingClientRect();
    if (rect.height <= 0) return;
    const seen = (window.innerHeight - rect.top) / rect.height;
    if (seen >= 0.6) {
      done = true;
      window.removeEventListener('scroll', onScroll);
      track('blog_read');
    }
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(check);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  check();
}

let initialised = false;

export function initAnalytics(): void {
  if (initialised) return;
  initialised = true;
  const disabled = isStaff();

  const c = cfg();
  if (c?.ga4) {
    const consent = getConsent();
    if (consent === 'granted') loadGtag();
    else if (consent === null && !disabled) showBanner();
  }

  // Any element can reopen the choice, e.g. a "Cookie settings" footer link.
  document.addEventListener('click', (e) => {
    const target = e.target instanceof Element ? e.target : null;
    if (!target) return;
    if (target.closest('[data-rcm-consent-open]')) {
      e.preventDefault();
      showBanner();
      return;
    }
    const cta = target.closest<HTMLElement>('[data-rcm-cta]');
    if (cta?.dataset.rcmCta) track('cta_click', { cta: cta.dataset.rcmCta.slice(0, 80) });
  });

  const props: EventProps = {};
  if (isLanding()) props.landing = 1;
  if (document.body.classList.contains('single-post')) props.pt = 'post';
  track('page_view', props);

  initBlogRead();
}
