/**
 * Website AI assistant widget (vanilla port of the prototype's React widget).
 *
 * - Floating launcher button plus any element with [data-rcm-open-chat].
 * - Lead capture (name, business email, optional company, consent, remember) before the chat.
 * - Talks to /wp-json/rcm/v1/chat/{start,message,end,history} (RCM\Chat).
 * - The session token lives in sessionStorage, or localStorage when the visitor
 *   ticks "remember", under the key 'rcm_chat'.
 * - Model output is always rendered with textContent, never innerHTML.
 * - Analytics events carry no chat text or personal data.
 */
import type { RcmConfig } from './types';
import { track } from './analytics';
import { refreshNonce } from './nav';

interface ChatLink {
  label: string;
  href: string;
}
interface Msg {
  role: 'user' | 'assistant';
  content: string;
  links?: ChatLink[];
}
interface Stored {
  sessionId: string;
  token: string;
}
interface ApiBase {
  ok: boolean;
  message?: string;
  code?: string;
  expired?: boolean;
  errors?: Record<string, string>;
}

const KEY = 'rcm_chat';
const ATTR_KEY = 'rcm_attr';
const IDLE_MS = 10 * 60_000;
const START_SUGGESTIONS = ['What services do you offer?', 'How does outsourcing billing work?', 'Book a free consultation'];

const cfg = (): RcmConfig => window.RCM;

/* ------------------------------------------------------------------ */
/*  Storage                                                            */
/* ------------------------------------------------------------------ */

function loadStored(): Stored | null {
  try {
    const raw = sessionStorage.getItem(KEY) ?? localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<Stored>;
    return typeof v.sessionId === 'string' && typeof v.token === 'string' ? { sessionId: v.sessionId, token: v.token } : null;
  } catch {
    return null;
  }
}

function saveStored(v: Stored | null, remember = false): void {
  try {
    sessionStorage.removeItem(KEY);
    localStorage.removeItem(KEY);
    if (v) (remember ? localStorage : sessionStorage).setItem(KEY, JSON.stringify(v));
  } catch {
    /* storage blocked: the chat still works for this page view */
  }
}

/** First-touch attribution captured by analytics.ts (if present); never includes chat text. */
function attribution(): Record<string, string> {
  try {
    const raw = sessionStorage.getItem(ATTR_KEY);
    if (raw) {
      const a = JSON.parse(raw) as Record<string, unknown>;
      const out: Record<string, string> = {};
      for (const [k, v] of Object.entries(a)) if (typeof v === 'string') out[k] = v.slice(0, 200);
      return out;
    }
  } catch {
    /* ignore */
  }
  return { landing: window.location.pathname };
}

/* ------------------------------------------------------------------ */
/*  Network                                                            */
/* ------------------------------------------------------------------ */

async function freshNonce(): Promise<void> {
  try {
    const r = await fetch(`${cfg().rest}nonce`, { credentials: 'same-origin', cache: 'no-store' });
    const d = r.ok ? ((await r.json()) as { nonce?: string }) : null;
    if (d?.nonce) window.RCM.nonce = d.nonce;
  } catch {
    /* keep the old nonce */
  }
}

async function post<T>(route: string, body: unknown, retry = true): Promise<T & ApiBase> {
  try {
    const r = await fetch(`${cfg().rest}chat/${route}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json', 'X-WP-Nonce': cfg().nonce },
      body: JSON.stringify(body),
    });
    let data: (T & ApiBase) | null = null;
    try {
      data = (await r.json()) as T & ApiBase;
    } catch {
      data = null;
    }
    // Cached pages can carry an expired nonce: refresh it once and retry.
    if (r.status === 403 && retry && (!data || data.code === 'rcm_nonce' || data.code === 'rest_cookie_invalid_nonce')) {
      await freshNonce();
      return post<T>(route, body, false);
    }
    if (!data || typeof data !== 'object') return { ok: false, message: 'Something went wrong. Please try again.' } as T & ApiBase;
    return data;
  } catch {
    return { ok: false, message: 'Network error. Please try again.' } as T & ApiBase;
  }
}

/* ------------------------------------------------------------------ */
/*  DOM helpers                                                        */
/* ------------------------------------------------------------------ */

type Attrs = Record<string, string | boolean | undefined>;

function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs: Attrs = {}, ...children: (Node | string | null | undefined)[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v === undefined || v === false) continue;
    if (k === 'class') el.className = String(v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children) {
    if (c === null || c === undefined) continue;
    el.append(typeof c === 'string' ? document.createTextNode(c) : c);
  }
  return el;
}

/** Static Lucide icon markup (trusted constants only, never user or model text). */
const ICONS = {
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
  shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
  bot: '<path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/>',
  restart: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',
  loader: '<path d="M21 12a9 9 0 1 1-6.219-8.56"/>',
} as const;

function icon(name: keyof typeof ICONS, cls = 'h-5 w-5'): SVGSVGElement {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('focusable', 'false');
  svg.setAttribute('class', cls);
  svg.innerHTML = ICONS[name];
  return svg;
}

function show(el: Element, visible: boolean): void {
  el.classList.toggle('hidden', !visible);
  if (visible) el.removeAttribute('hidden');
  else el.setAttribute('hidden', '');
}

/** Only same-site relative paths from the server are turned into links. */
function safeHref(href: unknown): string | null {
  return typeof href === 'string' && /^\/(?!\/)[^\s]*$/.test(href) ? href : null;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* ------------------------------------------------------------------ */
/*  Widget                                                             */
/* ------------------------------------------------------------------ */

export function initChat(): void {
  const config = window.RCM as RcmConfig | undefined;
  if (!config?.chat?.enabled || document.querySelector('[data-rcm-chat-root]')) return;

  let isOpen = false;
  let stage: 'intro' | 'chat' = 'intro';
  let session: Stored | null = null;
  let busy = false;
  let idleTimer: number | undefined;
  let lastFocus: HTMLElement | null = null;

  /* ---- Launcher ---- */
  const launcher = h(
    'button',
    {
      type: 'button',
      class: 'fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-navy-900 py-3 pl-4 pr-5 text-sm font-semibold text-white shadow-lift transition hover:bg-navy-800',
      'aria-haspopup': 'dialog',
      'aria-controls': 'rcm-chat-dialog',
      'aria-expanded': 'false',
    },
  );
  launcher.append(icon('message', 'h-5 w-5 text-teal-300'), document.createTextNode('Ask our assistant'));

  /* ---- Header ---- */
  const restartBtn = h('button', { type: 'button', class: 'hidden rounded-lg p-2 text-navy-200 hover:bg-white/10 hover:text-white', 'aria-label': 'End and start a new chat', title: 'Start a new chat' });
  restartBtn.append(icon('restart', 'h-4 w-4'));
  const closeBtn = h('button', { type: 'button', class: 'rounded-lg p-2 text-navy-200 hover:bg-white/10 hover:text-white', 'aria-label': 'Close chat' });
  closeBtn.append(icon('x', 'h-5 w-5'));

  const badge = h('span', { class: 'flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300' });
  badge.append(icon('bot', 'h-5 w-5'));
  const header = h(
    'div',
    { class: 'flex items-center justify-between bg-navy-900 px-4 py-3 text-white' },
    h(
      'div',
      { class: 'flex items-center gap-2.5' },
      badge,
      h(
        'div',
        {},
        h('h2', { id: 'rcm-chat-title', class: 'text-sm font-semibold text-white' }, 'RCM assistant'),
        h('p', { class: 'text-xs text-navy-200' }, 'AI assistant. Answers from our published information.'),
      ),
    ),
    h('div', { class: 'flex items-center gap-1' }, restartBtn, closeBtn),
  );

  /* ---- PHI warning ---- */
  const phi = h('p', { class: 'flex items-start gap-2 border-b border-amber-100 bg-amber-50 px-4 py-2 text-xs text-amber-900' });
  phi.append(icon('shield', 'mt-0.5 h-3.5 w-3.5 shrink-0'), document.createTextNode('Do not share patient information (names, dates of birth, member IDs or claim details) in this chat.'));

  /* ---- Intro (lead capture) form ---- */
  const fieldErrors: Record<string, HTMLParagraphElement> = {};
  const field = (name: string, label: string, type: string, autocomplete: string, optional = false) => {
    const id = `rcm-chat-${name}`;
    const input = h('input', { id, name, type, class: 'field', autocomplete, required: !optional, maxlength: name === 'email' ? '160' : '120' });
    const err = h('p', { id: `${id}-error`, class: 'field-error hidden', hidden: true });
    fieldErrors[name] = err;
    const lab = h('label', { for: id, class: 'field-label' }, label);
    if (optional) lab.append(' ', h('span', { class: 'font-normal text-ink-subtle' }, '(optional)'));
    return { wrap: h('div', {}, lab, input, err), input };
  };
  const nameF = field('name', 'Full name', 'text', 'name');
  const emailF = field('email', 'Business email', 'email', 'email');
  const companyF = field('company', 'Practice or company', 'text', 'organization', true);
  const honeypot = h('input', { type: 'text', name: 'website_url', tabindex: '-1', autocomplete: 'off', 'aria-hidden': 'true', class: 'hidden' });

  const consentBox = h('input', { type: 'checkbox', id: 'rcm-chat-consent', name: 'consent', class: 'mt-0.5 h-4 w-4 shrink-0 rounded border-line text-teal-600' });
  const consentText = config.chatConsentText || 'I agree that Texas Solutions may store this chat and my contact details and contact me about my enquiry, as described in the Privacy Policy. I will not share patient information.';
  const consentSpan = h('span');
  const privacyLink = h('a', { href: config.privacyUrl || '/privacy-policy/', class: 'text-teal-700 underline', target: '_blank', rel: 'noopener' }, 'Privacy Policy');
  const idx = consentText.indexOf('Privacy Policy');
  if (idx >= 0) {
    consentSpan.append(consentText.slice(0, idx), privacyLink, consentText.slice(idx + 'Privacy Policy'.length));
  } else {
    consentSpan.append(consentText, ' ', privacyLink, '.');
  }
  const consentErr = h('p', { id: 'rcm-chat-consent-error', class: 'field-error hidden', hidden: true });
  fieldErrors.consent = consentErr;
  const consentLabel = h('label', { for: 'rcm-chat-consent', class: 'flex items-start gap-2 text-xs text-navy-800' }, consentBox, consentSpan);

  const rememberBox = h('input', { type: 'checkbox', id: 'rcm-chat-remember', name: 'remember', class: 'mt-0.5 h-4 w-4 shrink-0 rounded border-line text-teal-600' });
  const rememberLabel = h('label', { for: 'rcm-chat-remember', class: 'flex items-start gap-2 text-xs text-ink-muted' }, rememberBox, h('span', {}, 'Remember this conversation on this device so I can continue it later.'));

  const introError = h('p', { role: 'alert', class: 'text-sm text-red-700' });
  const startLabel = h('span', {}, 'Start chat');
  const startBtn = h('button', { type: 'submit', class: 'btn-primary w-full' }, startLabel);
  const startSpinner = icon('loader', 'hidden h-4 w-4 animate-spin');
  startBtn.prepend(startSpinner);

  const introForm = h(
    'form',
    { class: 'flex-1 space-y-3.5 overflow-y-auto p-4', novalidate: true },
    h('p', { class: 'text-sm text-ink-muted' }, `${config.chat.welcome ? `${config.chat.welcome} ` : ''}Please tell us who you are first, so our team can follow up if needed.`),
    nameF.wrap,
    emailF.wrap,
    companyF.wrap,
    honeypot,
    h('div', {}, consentLabel, consentErr),
    rememberLabel,
    introError,
    startBtn,
  );

  /* ---- Conversation view ---- */
  const list = h('div', { class: 'flex-1 space-y-3 overflow-y-auto bg-canvas p-4', 'aria-live': 'polite', 'aria-relevant': 'additions', role: 'log', 'aria-label': 'Conversation' });
  const typing = h('div', { class: 'hidden flex items-center gap-2 text-sm text-ink-subtle', hidden: true });
  typing.append(icon('loader', 'h-4 w-4 animate-spin'), document.createTextNode('Thinking...'));
  list.append(typing);
  const suggestionsBar = h('div', { class: 'hidden flex flex-wrap gap-1.5 border-t border-line bg-white px-3 pt-3', hidden: true, 'aria-label': 'Suggested replies' });
  const chatError = h('p', { role: 'alert', class: 'bg-white px-4 pt-2 text-sm text-red-700' });
  const input = h('textarea', {
    id: 'rcm-chat-input',
    rows: '1',
    maxlength: '2000',
    placeholder: 'Ask about billing, services or tools...',
    class: 'field max-h-32 min-h-[44px] resize-none',
  });
  const sendBtn = h('button', { type: 'submit', class: 'btn-primary h-11 w-11 shrink-0 p-0', 'aria-label': 'Send message', disabled: true });
  sendBtn.append(icon('send', 'h-4 w-4'));
  const composer = h(
    'form',
    { class: 'flex items-end gap-2 border-t border-line bg-white p-3' },
    h('label', { for: 'rcm-chat-input', class: 'sr-only' }, 'Your message'),
    input,
    sendBtn,
  );
  const chatView = h('div', { class: 'hidden flex min-h-0 flex-1 flex-col', hidden: true }, list, suggestionsBar, chatError, composer);

  /* ---- Dialog ---- */
  const dialog = h(
    'div',
    {
      id: 'rcm-chat-dialog',
      role: 'dialog',
      'aria-modal': 'true',
      'aria-labelledby': 'rcm-chat-title',
      class: 'hidden fixed inset-x-2 bottom-2 top-16 z-50 flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[600px] sm:max-h-[calc(100vh-6rem)] sm:w-[400px]',
      hidden: true,
    },
    header,
    phi,
    introForm,
    chatView,
  );

  const root = h('div', { 'data-rcm-chat-root': true, class: 'no-print' }, launcher, dialog);
  document.body.append(root);

  /* ---- Rendering ---- */
  function setStage(next: 'intro' | 'chat'): void {
    stage = next;
    show(introForm, next === 'intro');
    show(chatView, next === 'chat');
    show(restartBtn, next === 'chat');
  }

  function scrollToEnd(): void {
    list.scrollTop = list.scrollHeight;
  }

  function addBubble(m: Msg): void {
    const isUser = m.role === 'user';
    const bubble = h('div', {
      class: isUser
        ? 'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-teal-600 px-3.5 py-2.5 text-[14.5px] leading-relaxed text-white'
        : 'max-w-[85%] whitespace-pre-wrap break-words rounded-2xl rounded-bl-md border border-line bg-white px-3.5 py-2.5 text-[14.5px] leading-relaxed text-navy-900',
    });
    bubble.append(h('span', { class: 'sr-only' }, isUser ? 'You said: ' : 'Assistant: '));
    bubble.append(document.createTextNode(m.content));
    const links = (m.links ?? []).map((l) => ({ label: typeof l?.label === 'string' ? l.label : '', href: safeHref(l?.href) })).filter((l) => l.label && l.href);
    if (links.length) {
      const chips = h('span', { class: 'mt-2 flex flex-wrap gap-1.5' });
      for (const l of links) {
        chips.append(h('a', { href: l.href as string, class: 'rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800 no-underline hover:bg-teal-100' }, l.label));
      }
      bubble.append(chips);
    }
    list.insertBefore(h('div', { class: isUser ? 'flex justify-end' : 'flex justify-start' }, bubble), typing);
    scrollToEnd();
  }

  function setSuggestions(items: string[]): void {
    suggestionsBar.replaceChildren();
    for (const s of items.slice(0, 3)) {
      if (typeof s !== 'string' || !s.trim()) continue;
      const b = h('button', { type: 'button', class: 'min-h-[32px] rounded-full border border-line px-3 py-1 text-xs font-medium text-navy-800 hover:border-teal-300 hover:bg-teal-50' }, s);
      b.addEventListener('click', () => void send(s));
      suggestionsBar.append(b);
    }
    show(suggestionsBar, suggestionsBar.childElementCount > 0 && !busy);
  }

  function setBusy(v: boolean): void {
    busy = v;
    show(typing, v && stage === 'chat');
    startBtn.disabled = v;
    show(startSpinner, v && stage === 'intro');
    updateSend();
    if (v) show(suggestionsBar, false);
    scrollToEnd();
  }

  function updateSend(): void {
    sendBtn.disabled = busy || !input.value.trim();
  }

  function clearIntroErrors(): void {
    for (const [name, err] of Object.entries(fieldErrors)) {
      err.textContent = '';
      show(err, false);
      const el = introForm.querySelector<HTMLInputElement>(`[name="${name}"]`);
      el?.removeAttribute('aria-invalid');
      el?.removeAttribute('aria-describedby');
    }
    introError.textContent = '';
  }

  function showIntroErrors(errors: Record<string, string>): void {
    let first: HTMLInputElement | null = null;
    for (const [name, msg] of Object.entries(errors)) {
      const err = fieldErrors[name];
      const el = introForm.querySelector<HTMLInputElement>(`[name="${name}"]`);
      if (!err || !el || typeof msg !== 'string') continue;
      err.textContent = msg;
      show(err, true);
      el.setAttribute('aria-invalid', 'true');
      el.setAttribute('aria-describedby', err.id);
      first ??= el;
    }
    first?.focus();
  }

  /* ---- Open / close and focus management ---- */
  function focusables(): HTMLElement[] {
    return Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => !el.closest('.hidden, [hidden]') && el.getClientRects().length > 0);
  }

  function open(): void {
    if (isOpen) return;
    isOpen = true;
    lastFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    show(dialog, true);
    dialog.classList.add('flex');
    show(launcher, false);
    launcher.setAttribute('aria-expanded', 'true');
    track('chat_open');
    void refreshNonce();
    window.setTimeout(() => {
      if (stage === 'chat') input.focus();
      else nameF.input.focus();
      scrollToEnd();
    }, 30);
  }

  function close(): void {
    if (!isOpen) return;
    isOpen = false;
    dialog.classList.remove('flex');
    show(dialog, false);
    show(launcher, true);
    launcher.setAttribute('aria-expanded', 'false');
    const target = lastFocus && lastFocus.isConnected && lastFocus !== document.body ? lastFocus : launcher;
    target.focus();
  }

  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });

  launcher.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  document.addEventListener('click', (e) => {
    const t = e.target instanceof Element ? e.target.closest('[data-rcm-open-chat]') : null;
    if (!t) return;
    e.preventDefault();
    open();
  });

  /* ---- Session lifecycle ---- */
  async function endChat(s: Stored | null): Promise<void> {
    if (!s) return;
    await post('end', s);
  }

  function armIdle(s: Stored | null): void {
    window.clearTimeout(idleTimer);
    idleTimer = window.setTimeout(() => void endChat(s), IDLE_MS);
  }

  function resetToIntro(): void {
    window.clearTimeout(idleTimer);
    saveStored(null);
    session = null;
    list.replaceChildren(typing);
    setSuggestions([]);
    chatError.textContent = '';
    input.value = '';
    updateSend();
    setStage('intro');
  }

  introForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (busy) return;
    clearIntroErrors();
    const remember = rememberBox.checked;
    setBusy(true);
    await refreshNonce();
    const r = await post<{ sessionId: string; token: string; welcome: string }>('start', {
      name: nameF.input.value,
      email: emailF.input.value,
      company: companyF.input.value,
      consent: consentBox.checked,
      remember,
      website_url: honeypot.value,
      page: window.location.pathname,
      attribution: attribution(),
    });
    setBusy(false);
    if (!r.ok || !r.sessionId || !r.token) {
      introError.textContent = r.message ?? 'Could not start the chat.';
      if (r.errors) showIntroErrors(r.errors);
      return;
    }
    session = { sessionId: r.sessionId, token: r.token };
    saveStored(session, remember);
    list.replaceChildren(typing);
    setStage('chat');
    addBubble({ role: 'assistant', content: r.welcome || 'How can I help?' });
    setSuggestions(START_SUGGESTIONS);
    track('chat_start');
    introForm.reset();
    window.setTimeout(() => input.focus(), 50);
  });

  async function send(text: string): Promise<void> {
    const t = text.trim();
    if (!t || busy || !session) return;
    input.value = '';
    autoGrow();
    chatError.textContent = '';
    setSuggestions([]);
    addBubble({ role: 'user', content: t });
    setBusy(true);
    const r = await post<{ reply: string; links: ChatLink[]; suggestions: string[] }>('message', {
      sessionId: session.sessionId,
      token: session.token,
      message: t,
      page: window.location.pathname,
    });
    setBusy(false);
    if (!r.ok) {
      if (r.expired) {
        resetToIntro();
        introError.textContent = r.message ?? 'This chat has expired. Please start a new one.';
        nameF.input.focus();
        return;
      }
      chatError.textContent = r.message ?? 'Something went wrong.';
      input.value = t;
      updateSend();
      input.focus();
      return;
    }
    addBubble({ role: 'assistant', content: typeof r.reply === 'string' ? r.reply : '', links: Array.isArray(r.links) ? r.links : [] });
    setSuggestions(Array.isArray(r.suggestions) ? r.suggestions : []);
    track('chat_message');
    armIdle(session);
  }

  function autoGrow(): void {
    input.style.height = 'auto';
    input.style.height = `${Math.min(input.scrollHeight, 128)}px`;
  }

  composer.addEventListener('submit', (e) => {
    e.preventDefault();
    void send(input.value);
  });
  input.addEventListener('input', () => {
    updateSend();
    autoGrow();
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      void send(input.value);
    }
  });

  restartBtn.addEventListener('click', async () => {
    const s = session;
    resetToIntro();
    nameF.input.focus();
    await endChat(s);
  });

  /* ---- Restore a conversation for a returning visitor ---- */
  setStage('intro');
  const stored = loadStored();
  if (stored) {
    void post<{ messages: Msg[] }>('history', stored).then((r) => {
      if (!r.ok || !Array.isArray(r.messages)) {
        saveStored(null);
        return;
      }
      session = stored;
      list.replaceChildren(typing);
      for (const m of r.messages) {
        if (m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string') addBubble(m);
      }
      setStage('chat');
    });
  }
}
