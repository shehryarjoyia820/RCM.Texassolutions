/**
 * Lead forms: progressive enhancement for markup printed by RCM\Forms::render()
 * (wordpress/rcm-core/includes/class-forms.php). Validates like the server,
 * posts JSON to `${window.RCM.rest}lead` with X-WP-Nonce, shows field errors
 * and replaces the form with a success panel.
 *
 * Also captures first-touch attribution for the browser session
 * (sessionStorage 'rcm_attr'); other modules read it with getAttribution().
 */
import { track } from './analytics';
import type { RcmConfig } from './types';

const ATTR_KEY = 'rcm_attr';
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/;
const PHONE_RE = /^[+()\d\s.-]{7,40}$/;

/** Mirrors rcm_looks_like_phi() in helpers.php. */
const PHI_PATTERNS = [
  /\b\d{3}-\d{2}-\d{4}\b/,
  /\b(dob|d\.o\.b\.|date of birth)\b\s*[:-]?\s*\d/i,
  /\b(member|subscriber|policy|medicaid|medicare)\s*(id|#|no\.?|number)\s*[:-]?\s*[a-z0-9]{5,}/i,
  /\bmrn\s*[:\-#]?\s*\d+/i,
  /\bpatient\s+(name\s*[:-]|is\s+[A-Z][a-z]+\s+[A-Z][a-z]+)/,
  /\b(mbi|hicn)\b\s*[:-]?\s*[a-z0-9]{8,}/i,
];

const TEXT = {
  name: 'Please enter your name.',
  email: 'Please enter a valid email address.',
  consent: 'Please confirm so we can contact you.',
  phone: 'Please enter a phone number.',
  phoneInvalid: 'Please enter a valid phone number.',
  company: 'Please enter your practice or company name.',
  message: 'Please enter a message.',
  phiField: 'Please remove patient information.',
  phi: 'Your message looks like it may contain patient information. Please remove patient names, dates of birth, member IDs or other health details and send again.',
  fix: 'Please fix the highlighted fields.',
  network: 'We could not reach the server. Check your connection and try again, or email info@texassolutions.co.',
  generic: 'Something went wrong. Please try again.',
  thanks: 'Thank you. Your request has reached our team and we will reply by email.',
  subscribed: 'Thanks, you are subscribed. You can unsubscribe from any email.',
};

const SUCCESS_ICON =
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-8 w-8 text-teal-600" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>';

interface LeadResponse {
  ok?: boolean;
  message?: string;
  errors?: Record<string, string>;
  id?: string;
  code?: string;
}

/* ------------------------------------------------------------------ */
/*  Attribution                                                        */
/* ------------------------------------------------------------------ */

/** Stores first-touch attribution (UTM, gclid, external referrer, landing path) once per session. */
export function captureAttribution(): void {
  try {
    if (sessionStorage.getItem(ATTR_KEY)) return;
    const u = new URL(window.location.href);
    const a: Record<string, string> = { landing: u.pathname.slice(0, 200) };
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']) {
      const v = u.searchParams.get(k);
      if (v) a[k] = v.slice(0, 100);
    }
    if (document.referrer && !document.referrer.startsWith(window.location.origin)) a.referrer = document.referrer.slice(0, 200);
    sessionStorage.setItem(ATTR_KEY, JSON.stringify(a));
  } catch {
    /* storage blocked */
  }
}

export function getAttribution(): Record<string, string> {
  try {
    const v: unknown = JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}');
    if (!v || typeof v !== 'object') return {};
    const out: Record<string, string> = {};
    for (const [k, val] of Object.entries(v as Record<string, unknown>)) if (typeof val === 'string') out[k] = val;
    return out;
  } catch {
    return {};
  }
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function config(): { rest: string; nonce: string } {
  const c = (window as unknown as { RCM?: Partial<RcmConfig> }).RCM;
  return { rest: c?.rest || '/wp-json/rcm/v1/', nonce: c?.nonce || '' };
}

const looksLikePhi = (text: string) => PHI_PATTERNS.some((p) => p.test(text));

function collect(form: HTMLFormElement, layout: string): Record<string, unknown> {
  const fd = new FormData(form);
  const fields: Record<string, unknown> = {};
  fd.forEach((v, k) => {
    if (k === 'services' || k === 'consent' || k === 'marketing') return;
    if (typeof v === 'string') fields[k] = v;
  });
  fields.services = fd.getAll('services').filter((v): v is string => typeof v === 'string');
  if (layout === 'newsletter') {
    const email = String(fields.email ?? '').trim();
    fields.email = email;
    fields.name = email.split('@')[0] ?? '';
    fields.consent = true;
    fields.marketing = true;
  } else {
    fields.consent = fd.has('consent');
    fields.marketing = fd.has('marketing');
  }
  return fields;
}

/** Client-side rules, mirroring RCM\Forms::handle(). */
function validate(form: HTMLFormElement, layout: string, fields: Record<string, unknown>): { errors: Record<string, string>; message: string } {
  const errors: Record<string, string> = {};
  const str = (k: string) => String(fields[k] ?? '').trim();
  const required = (name: string) => form.querySelector(`[name="${name}"][required]`) !== null;
  let message = TEXT.fix;

  if (layout !== 'newsletter' && !str('name')) errors.name = TEXT.name;
  if (!EMAIL_RE.test(str('email'))) errors.email = TEXT.email;
  if (layout !== 'newsletter' && fields.consent !== true) errors.consent = TEXT.consent;
  if (required('phone') && !str('phone')) errors.phone = TEXT.phone;
  else if (str('phone') && !PHONE_RE.test(str('phone'))) errors.phone = TEXT.phoneInvalid;
  if (required('company') && !str('company')) errors.company = TEXT.company;
  if (required('message') && !str('message')) errors.message = TEXT.message;

  if (!Object.keys(errors).length) {
    if (looksLikePhi(str('message'))) errors.message = TEXT.phiField;
    if (str('challenges') && looksLikePhi(str('challenges'))) errors.challenges = TEXT.phiField;
    if (Object.keys(errors).length) message = TEXT.phi;
  }
  return { errors, message };
}

function controlFor(form: HTMLFormElement, name: string): HTMLElement | null {
  return form.querySelector<HTMLElement>(`[name="${name}"]:not([type="hidden"])`);
}

function clearField(form: HTMLFormElement, name: string): void {
  const el = form.querySelector<HTMLElement>(`[data-error-for="${name}"]`);
  if (el) {
    el.textContent = '';
    el.hidden = true;
  }
  const control = controlFor(form, name);
  if (control && control.getAttribute('aria-invalid')) {
    control.removeAttribute('aria-invalid');
    const base = control.dataset.rcmDescribedby ?? '';
    if (base) control.setAttribute('aria-describedby', base);
    else control.removeAttribute('aria-describedby');
  }
}

function clearAll(form: HTMLFormElement): void {
  form.querySelectorAll<HTMLElement>('[data-error-for]').forEach((el) => clearField(form, el.dataset.errorFor ?? ''));
  setMessage(form, '');
}

function setMessage(form: HTMLFormElement, text: string): void {
  const el = form.querySelector<HTMLElement>('[data-rcm-form-message]');
  if (!el) return;
  el.textContent = text;
  el.hidden = text === '';
}

/** Shows field errors; returns the first invalid control and messages that have no field on this form. */
function showErrors(form: HTMLFormElement, errors: Record<string, string>): { first: HTMLElement | null; unplaced: string[] } {
  let first: HTMLElement | null = null;
  const unplaced: string[] = [];
  for (const [name, msg] of Object.entries(errors)) {
    const el = /^[a-z_]+$/.test(name) ? form.querySelector<HTMLElement>(`[data-error-for="${name}"]`) : null;
    const control = el ? controlFor(form, name) : null;
    if (!el || !control) {
      unplaced.push(msg);
      continue;
    }
    el.textContent = msg;
    el.hidden = false;
    if (control.dataset.rcmDescribedby === undefined) control.dataset.rcmDescribedby = control.getAttribute('aria-describedby') ?? '';
    control.setAttribute('aria-invalid', 'true');
    control.setAttribute('aria-describedby', [control.dataset.rcmDescribedby, el.id].filter(Boolean).join(' '));
    first ??= control;
  }
  return { first, unplaced };
}

function setBusy(form: HTMLFormElement, busy: boolean): void {
  const btn = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  if (btn) {
    btn.disabled = busy;
    if (busy) btn.setAttribute('aria-busy', 'true');
    else btn.removeAttribute('aria-busy');
  }
  form.querySelector('[data-rcm-spinner]')?.classList.toggle('hidden', !busy);
}

function showSuccess(form: HTMLFormElement, layout: string, message: string): void {
  let panel: HTMLElement;
  if (layout === 'newsletter') {
    panel = document.createElement('p');
    panel.className = 'text-[15px] font-medium text-teal-300';
    panel.textContent = message || TEXT.subscribed;
  } else {
    panel = document.createElement('div');
    panel.className = 'rounded-2xl border border-teal-200 bg-teal-50 p-6 text-navy-900';
    panel.innerHTML = SUCCESS_ICON;
    const h = document.createElement('h3');
    h.className = 'mt-3 text-xl font-semibold';
    h.textContent = 'Thank you, we have your request';
    const p = document.createElement('p');
    p.className = 'mt-2 text-ink-muted';
    p.textContent = message || TEXT.thanks;
    const more = document.createElement('p');
    more.className = 'mt-4 text-sm text-ink-muted';
    const link = document.createElement('a');
    link.href = form.dataset.toolsUrl || '/tools/';
    link.className = 'font-semibold text-teal-700 underline';
    link.textContent = 'free RCM tools';
    more.append('While you wait, try our ', link, '.');
    panel.append(h, p, more);
  }
  panel.setAttribute('role', 'status');
  panel.tabIndex = -1;
  form.replaceWith(panel);
  panel.focus();
}

/** POSTs the lead. On a 403 (stale or user-bound nonce) it fetches a fresh anonymous nonce and retries once. */
async function postLead(body: string): Promise<{ status: number; data: LeadResponse }> {
  const { rest, nonce } = config();
  const send = (n: string, credentials: RequestCredentials) =>
    fetch(`${rest}lead`, {
      method: 'POST',
      credentials,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json', 'X-WP-Nonce': n },
      body,
    });
  let res = await send(nonce, 'same-origin');
  if (res.status === 403) {
    const fresh = (await fetch(`${rest}nonce`, { credentials: 'omit', cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .catch(() => null)) as { nonce?: string } | null;
    if (fresh?.nonce) res = await send(fresh.nonce, 'omit');
  }
  const data = (await res.json().catch(() => ({}))) as LeadResponse;
  return { status: res.status, data };
}

/* ------------------------------------------------------------------ */
/*  Binding                                                            */
/* ------------------------------------------------------------------ */

function bind(form: HTMLFormElement): void {
  if (form.dataset.rcmBound) return;
  form.dataset.rcmBound = '1';
  const startedAt = Date.now();
  const formName = form.dataset.rcmForm || 'contact';
  const layout = form.dataset.layout || formName;
  let sending = false;

  const onEdit = (e: Event) => {
    const t = e.target as HTMLInputElement | null;
    if (t?.name) clearField(form, t.name);
  };
  form.addEventListener('input', onEdit);
  form.addEventListener('change', onEdit);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (sending) return;
    clearAll(form);

    const fields = collect(form, layout);
    const local = validate(form, layout, fields);
    if (Object.keys(local.errors).length) {
      const { first, unplaced } = showErrors(form, local.errors);
      setMessage(form, [local.message, ...unplaced].join(' '));
      first?.focus();
      return;
    }

    sending = true;
    setBusy(form, true);
    const payload = JSON.stringify({
      form: formName,
      fields,
      attribution: getAttribution(),
      page: window.location.pathname,
      elapsedMs: Date.now() - startedAt,
    });

    let result: { status: number; data: LeadResponse };
    try {
      result = await postLead(payload);
    } catch {
      sending = false;
      setBusy(form, false);
      setMessage(form, TEXT.network);
      return;
    }
    sending = false;
    setBusy(form, false);

    const { status, data } = result;
    if (status >= 200 && status < 300 && data.ok) {
      track('form_submit', { form: formName });
      showSuccess(form, layout, data.message ?? '');
      return;
    }
    const { first, unplaced } = showErrors(form, data.errors ?? {});
    setMessage(form, [data.message || TEXT.generic, ...unplaced.filter((m) => m !== data.message)].join(' '));
    first?.focus();
  });
}

/** Enhances every form[data-rcm-form] on the page (safe to call again for forms added later). */
export function initForms(): void {
  captureAttribution();
  document.querySelectorAll<HTMLFormElement>('form[data-rcm-form]').forEach(bind);
}
