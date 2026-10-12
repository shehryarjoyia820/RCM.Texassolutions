/**
 * Tools bundle: calculators, glossaries, checklists, the KPI scorecard, code
 * and NPI lookups, and the /tools directory filter. Markup comes from
 * RCM\Tools (wordpress/rcm-core/includes/class-tools.php); every hook is a
 * data-rcm-* attribute. All DOM text is set with textContent.
 */
import { track } from './analytics';
import { fmtUnit } from './format';

interface CalcResult {
  values: Record<string, number | null>;
  notes?: string[];
  warnings?: string[];
}
type Compute = (v: Record<string, number>) => CalcResult;

interface RuntimeGlobals {
  RCM?: { rest?: string };
  RCM_CALC?: Record<string, Compute>;
}
const globals = (): RuntimeGlobals => window as unknown as RuntimeGlobals;

const $ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => root.querySelector<T>(sel as string) as T | null;
const $$ = <T extends Element = HTMLElement>(root: ParentNode, sel: string) => Array.from(root.querySelectorAll<T>(sel as string));

/* ------------------------------------------------------------------ */
/*  Small DOM helpers                                                  */
/* ------------------------------------------------------------------ */

const SVG_NS = 'http://www.w3.org/2000/svg';
type Shape = [string, Record<string, string>];
const ICONS: Record<string, Shape[]> = {
  check: [['path', { d: 'M20 6 9 17l-5-5' }]],
  copy: [
    ['rect', { x: '8', y: '8', width: '14', height: '14', rx: '2', ry: '2' }],
    ['path', { d: 'M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2' }],
  ],
  alert: [
    ['path', { d: 'm21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3' }],
    ['path', { d: 'M12 9v4' }],
    ['path', { d: 'M12 17h.01' }],
  ],
  info: [
    ['circle', { cx: '12', cy: '12', r: '10' }],
    ['path', { d: 'M12 16v-4' }],
    ['path', { d: 'M12 8h.01' }],
  ],
};

function icon(name: keyof typeof ICONS, cls = 'h-4 w-4'): SVGSVGElement {
  const svg = document.createElementNS(SVG_NS, 'svg');
  const attrs: Record<string, string> = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    class: cls,
    'aria-hidden': 'true',
    focusable: 'false',
  };
  for (const [k, v] of Object.entries(attrs)) svg.setAttribute(k, v);
  for (const [tag, a] of ICONS[name]) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const [k, v] of Object.entries(a)) el.setAttribute(k, v);
    svg.appendChild(el);
  }
  return svg;
}

function el<K extends keyof HTMLElementTagNameMap>(tag: K, cls = '', text?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text !== undefined) e.textContent = text;
  return e;
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    window.prompt('Copy this:', text);
    return false;
  }
}

/** Swap a button's [data-icon] for a check mark for a moment. */
const savedIcons = new WeakMap<HTMLElement, Node[]>();
const flashTimers = new WeakMap<HTMLElement, number>();
function flashCheck(btn: HTMLElement) {
  const slot = $(btn, '[data-icon]');
  if (!slot) return;
  if (!savedIcons.has(slot)) savedIcons.set(slot, Array.from(slot.childNodes).map((n) => n.cloneNode(true)));
  slot.replaceChildren(icon('check', 'h-4 w-4 text-teal-600'));
  window.clearTimeout(flashTimers.get(slot));
  flashTimers.set(
    slot,
    window.setTimeout(() => slot.replaceChildren(...(savedIcons.get(slot) ?? []).map((n) => n.cloneNode(true))), 2000),
  );
}

/* ------------------------------------------------------------------ */
/*  Calculators                                                        */
/* ------------------------------------------------------------------ */

interface InputSpec {
  id: string;
  label: string;
  unit: string;
  min?: number;
  max?: number;
  optional: boolean;
  def: string;
  el: HTMLInputElement;
  error: HTMLElement | null;
  help: HTMLElement | null;
}

interface OutputSpec {
  id: string;
  label: string;
  unit: string;
  el: HTMLElement;
}

const numAttr = (v: string | undefined) => (v === undefined || v === '' || !Number.isFinite(Number(v)) ? undefined : Number(v));

function initCalculator(root: HTMLElement) {
  const key = root.dataset.rcmCalc ?? '';
  const name = root.dataset.rcmCalcName ?? 'RCM calculator';
  const form = $<HTMLFormElement>(root, '[data-rcm-calc-form]');

  const inputs: InputSpec[] = $$<HTMLInputElement>(root, '[data-rcm-input]').map((input) => {
    const wrap = input.closest<HTMLElement>('[data-rcm-field]') ?? root;
    return {
      id: input.dataset.rcmInput ?? '',
      label: input.dataset.label ?? '',
      unit: input.dataset.unit ?? '',
      min: numAttr(input.dataset.min),
      max: numAttr(input.dataset.max),
      optional: input.dataset.optional === '1',
      def: input.dataset.default ?? '',
      el: input,
      error: $(wrap, '[data-rcm-error]'),
      help: $(wrap, '[data-rcm-help]'),
    };
  });
  const outputs: OutputSpec[] = $$(root, '[data-rcm-out]').map((o) => ({
    id: o.dataset.rcmOut ?? '',
    label: o.dataset.label ?? '',
    unit: o.dataset.unit ?? '',
    el: o,
  }));

  const invalidMsg = $(root, '[data-rcm-calc-invalid]');
  const primaryBox = $(root, '[data-rcm-calc-primary]');
  const secondaryBox = $(root, '[data-rcm-calc-secondary]');
  const warningsBox = $(root, '[data-rcm-calc-warnings]');
  const notesBox = $(root, '[data-rcm-calc-notes]');
  const actions = $$<HTMLButtonElement>(root, '[data-rcm-calc-action]');
  const sendPanel = $(root, '[data-rcm-calc-send]');
  const sendBtn = $<HTMLButtonElement>(root, '[data-rcm-calc-action="send"]');

  let nums: Record<string, number> = {};
  let result: CalcResult = { values: {} };
  let valid = false;
  let used = false;

  // Prefill from a shared link (?payments=1000&charges=...).
  const q = new URLSearchParams(window.location.search);
  for (const i of inputs) {
    const v = q.get(i.id);
    if (v !== null && v.length < 20) i.el.value = v;
  }

  function parse(): Record<string, string> {
    const errors: Record<string, string> = {};
    nums = {};
    for (const i of inputs) {
      const raw = i.el.value.replace(/[$,%\s]/g, '');
      if (raw === '') {
        if (i.optional) nums[i.id] = 0;
        else errors[i.id] = 'Required';
        continue;
      }
      const n = Number(raw);
      if (!Number.isFinite(n)) errors[i.id] = 'Enter a number';
      else if (i.min !== undefined && n < i.min) errors[i.id] = `Must be at least ${i.min}`;
      else if (i.max !== undefined && n > i.max) errors[i.id] = `Must be at most ${i.max}`;
      else nums[i.id] = n;
    }
    for (const i of inputs) {
      const msg = errors[i.id];
      if (msg) i.el.setAttribute('aria-invalid', 'true');
      else i.el.removeAttribute('aria-invalid');
      if (i.error) {
        i.error.textContent = msg ?? '';
        i.error.hidden = !msg;
      }
      if (i.help) i.help.hidden = Boolean(msg);
      const describedBy = msg && i.error ? i.error.id : i.help?.id;
      if (describedBy) i.el.setAttribute('aria-describedby', describedBy);
      else i.el.removeAttribute('aria-describedby');
    }
    return errors;
  }

  function resultText(): string {
    return [
      `${name} (${window.location.host || 'rcm.texassolutions.co'})`,
      '',
      'Inputs:',
      ...inputs.map((i) => `- ${i.label}: ${fmtUnit(nums[i.id], i.unit)}`),
      '',
      'Results (estimates):',
      ...outputs.map((o) => `- ${o.label}: ${fmtUnit(result.values[o.id], o.unit)}`),
      ...(result.notes?.length ? ['', ...result.notes] : []),
    ].join('\n');
  }

  function fillMessages(box: HTMLElement | null, items: string[] | undefined, kind: 'alert' | 'info') {
    if (!box) return;
    const list = valid ? (items ?? []).filter((s) => typeof s === 'string' && s) : [];
    box.replaceChildren(
      ...list.map((text, n) => {
        const p = el('p', `flex gap-2${n ? ' mt-2' : ''}`);
        p.append(icon(kind, kind === 'info' ? 'mt-0.5 h-4 w-4 shrink-0 text-sky-600' : 'mt-0.5 h-4 w-4 shrink-0'), el('span', '', text));
        return p;
      }),
    );
    box.hidden = list.length === 0;
  }

  /** Hidden `context` field in the send form carries the result text. */
  function syncContext() {
    if (!sendPanel) return;
    const form = $<HTMLFormElement>(sendPanel, 'form') ?? sendPanel;
    let ctx = $<HTMLInputElement | HTMLTextAreaElement>(form, '[name="context"]');
    if (!ctx) {
      const input = el('input');
      input.type = 'hidden';
      input.name = 'context';
      form.appendChild(input);
      ctx = input;
    }
    ctx.value = valid ? resultText() : '';
  }

  function render() {
    if (invalidMsg) invalidMsg.hidden = valid;
    if (primaryBox) primaryBox.hidden = !valid;
    if (secondaryBox) secondaryBox.hidden = !valid;
    for (const o of outputs) o.el.textContent = fmtUnit(result.values[o.id], o.unit);
    fillMessages(warningsBox, result.warnings, 'alert');
    fillMessages(notesBox, result.notes, 'info');
    for (const b of actions) b.disabled = !valid;
    if (!valid && sendPanel && !sendPanel.hidden) {
      sendPanel.hidden = true;
      sendBtn?.setAttribute('aria-expanded', 'false');
    }
    syncContext();
  }

  function run() {
    const errors = parse();
    valid = Object.keys(errors).length === 0;
    if (!valid) {
      render();
      return;
    }
    const compute = globals().RCM_CALC?.[key];
    if (typeof compute !== 'function') {
      // The calculator script loads with defer; try again once the page has loaded.
      if (document.readyState !== 'complete') {
        window.addEventListener('load', run, { once: true });
        return;
      }
      result = { values: {}, warnings: ['This calculator could not load. Please refresh the page.'] };
      render();
      return;
    }
    try {
      const r = compute({ ...nums });
      result = r && typeof r === 'object' && r.values ? r : { values: {} };
    } catch {
      result = { values: {}, warnings: ['These inputs could not be calculated. Please check them.'] };
    }
    render();
  }

  form?.addEventListener('submit', (e) => e.preventDefault());
  form?.addEventListener('input', (e) => {
    if (!(e.target instanceof HTMLInputElement) || !e.target.matches('[data-rcm-input]')) return;
    if (!used) {
      used = true;
      track('tool_use', { tool: key });
    }
    run();
  });

  $(root, '[data-rcm-calc-reset]')?.addEventListener('click', () => {
    for (const i of inputs) i.el.value = i.def;
    run();
  });

  for (const btn of actions) {
    btn.addEventListener('click', async () => {
      if (!valid) return;
      switch (btn.dataset.rcmCalcAction) {
        case 'copy':
          track('tool_result_copy', { tool: key });
          if (await copyText(resultText())) flashCheck(btn);
          break;
        case 'share': {
          const p = new URLSearchParams();
          for (const i of inputs) if (i.el.value.trim() !== '') p.set(i.id, i.el.value.trim());
          const link = `${window.location.origin}${window.location.pathname}?${p.toString()}`;
          track('tool_result_share', { tool: key });
          if (await copyText(link)) flashCheck(btn);
          break;
        }
        case 'print':
          track('tool_result_print', { tool: key });
          window.print();
          break;
        case 'send':
          if (!sendPanel) break;
          sendPanel.hidden = !sendPanel.hidden;
          btn.setAttribute('aria-expanded', String(!sendPanel.hidden));
          track('tool_cta', { tool: key });
          if (!sendPanel.hidden) {
            syncContext();
            $<HTMLElement>(sendPanel, 'input[name="name"], input:not([type="hidden"]):not([name="website_url"]), textarea')?.focus();
          }
          break;
      }
    });
  }

  run();
}

/* ------------------------------------------------------------------ */
/*  Glossary / guide filter                                            */
/* ------------------------------------------------------------------ */

function initGlossary(root: HTMLElement) {
  const search = $<HTMLInputElement>(root, '[data-rcm-glossary-search]');
  const select = $<HTMLSelectElement>(root, '[data-rcm-glossary-tag]');
  const count = $(root, '[data-rcm-glossary-count]');
  const empty = $(root, '[data-rcm-glossary-empty]');
  const entries = $$(root, '[data-rcm-entry]').map((e) => ({ el: e, tag: e.dataset.tag ?? '', text: (e.textContent ?? '').toLowerCase() }));

  const apply = () => {
    const s = (search?.value ?? '').trim().toLowerCase();
    const tag = select?.value ?? '';
    let shown = 0;
    for (const e of entries) {
      const match = (!tag || e.tag === tag) && (!s || e.text.includes(s));
      e.el.hidden = !match;
      if (match) shown++;
    }
    if (count) count.textContent = `Showing ${shown} of ${entries.length}`;
    if (empty) empty.hidden = shown > 0;
  };
  search?.addEventListener('input', apply);
  select?.addEventListener('change', apply);
  apply();
}

/* ------------------------------------------------------------------ */
/*  Checklist: ticks remembered in this browser                        */
/* ------------------------------------------------------------------ */

function initChecklist(root: HTMLElement) {
  const key = root.dataset.rcmChecklist ?? '';
  const storeKey = `rcm_check_${key}`;
  const boxes = $$<HTMLInputElement>(root, '[data-rcm-check]');
  const count = $(root, '[data-rcm-checklist-count]');
  const bar = $(root, '[data-rcm-checklist-bar]');
  const progress = $(root, '[data-rcm-checklist-progress]');

  let done: Record<string, boolean> = {};
  try {
    const raw = JSON.parse(localStorage.getItem(storeKey) || '{}') as unknown;
    if (raw && typeof raw === 'object') done = raw as Record<string, boolean>;
  } catch {
    /* storage unavailable */
  }
  for (const b of boxes) b.checked = Boolean(done[b.value]);

  const save = () => {
    try {
      localStorage.setItem(storeKey, JSON.stringify(done));
    } catch {
      /* storage unavailable */
    }
  };
  const update = () => {
    const n = boxes.filter((b) => b.checked).length;
    const total = boxes.length;
    if (count) count.textContent = `${n} of ${total} done`;
    if (bar) bar.style.width = `${total ? (n / total) * 100 : 0}%`;
    progress?.setAttribute('aria-valuenow', String(n));
  };

  root.addEventListener('change', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || !t.matches('[data-rcm-check]')) return;
    done[t.value] = t.checked;
    save();
    update();
  });
  $(root, '[data-rcm-checklist-clear]')?.addEventListener('click', () => {
    done = {};
    for (const b of boxes) b.checked = false;
    try {
      localStorage.removeItem(storeKey);
    } catch {
      /* storage unavailable */
    }
    update();
  });
  $(root, '[data-rcm-checklist-print]')?.addEventListener('click', () => {
    track('checklist_print', { tool: key });
    window.print();
  });
  update();
}

/* ------------------------------------------------------------------ */
/*  KPI scorecard                                                      */
/* ------------------------------------------------------------------ */

function initScorecard(root: HTMLElement) {
  const summary = $(root, '[data-rcm-score-summary]');
  const rows = $$(root, '[data-rcm-score-row]').map((row) => ({
    unit: row.dataset.unit ?? '%',
    lowerBetter: /lower is better/i.test($(row, '[data-rcm-score-dir]')?.textContent ?? ''),
    current: $<HTMLInputElement>(row, '[data-rcm-score="current"]'),
    target: $<HTMLInputElement>(row, '[data-rcm-score="target"]'),
    status: $(row, '[data-rcm-score-status]'),
  }));
  let used = false;

  const update = () => {
    let scored = 0;
    let met = 0;
    for (const r of rows) {
      const cv = r.current?.value ?? '';
      const tv = r.target?.value ?? '';
      const c = Number(cv);
      const t = Number(tv);
      const ready = cv !== '' && tv !== '' && Number.isFinite(c) && Number.isFinite(t);
      if (!r.status) continue;
      if (!ready) {
        r.status.replaceChildren(el('span', 'text-ink-subtle', 'Not scored'));
        continue;
      }
      scored++;
      const ok = r.lowerBetter ? c <= t : c >= t;
      if (ok) {
        met++;
        r.status.replaceChildren(el('span', 'inline-flex items-center gap-1 rounded-full bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800', 'On target'));
      } else {
        const gap = Math.abs(Math.round((c - t) * 100) / 100);
        r.status.replaceChildren(el('span', 'inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900', `Off by ${gap} ${r.unit}`));
      }
    }
    if (summary) summary.textContent = scored ? `${met} of ${scored} KPIs on target` : 'Enter your numbers below';
  };

  root.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement) || !t.matches('[data-rcm-score]')) return;
    const cleaned = t.value.replace(/[^\d.]/g, '');
    if (cleaned !== t.value) t.value = cleaned;
    if (!used) {
      used = true;
      track('tool_use', { tool: 'rcm-performance-scorecard' });
    }
    update();
  });
  update();
}

/* ------------------------------------------------------------------ */
/*  Lookups (ICD-10-CM, HCPCS, NPI)                                    */
/* ------------------------------------------------------------------ */

interface LookupRow {
  code: string;
  title: string;
  detail?: string;
}
interface LookupResponse {
  ok: boolean;
  message?: string;
  total?: number;
  rows?: LookupRow[];
}

const restBase = () => {
  const base = globals().RCM?.rest || '/wp-json/rcm/v1/';
  return base.endsWith('/') ? base : `${base}/`;
};

async function lookupFetch(params: URLSearchParams, signal?: AbortSignal): Promise<{ total: number; rows: LookupRow[] }> {
  let data: LookupResponse;
  try {
    const r = await fetch(`${restBase()}lookup?${params.toString()}`, { headers: { Accept: 'application/json' }, credentials: 'same-origin', signal });
    data = (await r.json()) as LookupResponse;
  } catch (e) {
    if (signal?.aborted) throw e;
    throw new Error('Search failed. Please try again.');
  }
  if (!data || !data.ok) throw new Error(data?.message || 'Search failed. Please try again.');
  return { total: Number(data.total ?? 0), rows: Array.isArray(data.rows) ? data.rows : [] };
}

function lookupUi(root: HTMLElement, codeLabel: string) {
  const error = $(root, '[data-rcm-lookup-error]');
  const empty = $(root, '[data-rcm-lookup-empty]');
  const results = $(root, '[data-rcm-lookup-results]');
  const count = $(root, '[data-rcm-lookup-count]');
  const list = $(root, '[data-rcm-lookup-list]');

  const showError = (msg: string) => {
    if (error) {
      error.textContent = msg;
      error.hidden = !msg;
    }
  };

  const showRows = (rows: LookupRow[], total: number, searched: boolean) => {
    if (empty) empty.hidden = !(searched && rows.length === 0);
    if (results) results.hidden = rows.length === 0;
    if (count) count.textContent = rows.length ? `Showing ${rows.length} of ${total.toLocaleString('en-US')} matches` : '';
    list?.replaceChildren(
      ...rows.map((r) => {
        const li = el('li', 'flex items-start gap-4 px-4 py-3');
        const code = el('span', 'w-28 shrink-0 font-mono text-[15px] font-semibold text-teal-800', String(r.code ?? ''));
        const body = el('span', 'min-w-0 flex-1');
        body.appendChild(el('span', 'block text-[15px] text-navy-900', String(r.title ?? '')));
        if (r.detail) body.appendChild(el('span', 'block text-sm text-ink-muted', String(r.detail)));
        const btn = el('button', 'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-ink-subtle hover:bg-canvas hover:text-navy-900');
        btn.type = 'button';
        btn.setAttribute('aria-label', `Copy ${codeLabel} ${r.code}`);
        btn.appendChild(icon('copy'));
        btn.addEventListener('click', () => {
          void navigator.clipboard?.writeText(String(r.code)).catch(() => undefined);
          btn.replaceChildren(icon('check', 'h-4 w-4 text-teal-600'));
          window.setTimeout(() => btn.replaceChildren(icon('copy')), 1500);
        });
        li.append(code, body, btn);
        return li;
      }),
    );
  };

  return { showError, showRows };
}

function initCodeLookup(root: HTMLElement, type: 'icd10' | 'hcpcs') {
  const input = $<HTMLInputElement>(root, '[data-rcm-lookup-input]');
  const busy = $(root, '[data-rcm-lookup-busy]');
  const ui = lookupUi(root, 'code');
  let timer = 0;
  let ctl: AbortController | null = null;
  let tracked = false;

  input?.addEventListener('input', () => {
    window.clearTimeout(timer);
    ctl?.abort();
    const q = input.value.trim();
    if (q.length < 2) {
      ui.showError('');
      ui.showRows([], 0, false);
      if (busy) busy.hidden = true;
      return;
    }
    timer = window.setTimeout(async () => {
      const controller = new AbortController();
      ctl = controller;
      if (busy) busy.hidden = false;
      ui.showError('');
      try {
        const d = await lookupFetch(new URLSearchParams({ type, q }), controller.signal);
        ui.showRows(d.rows, d.total, true);
        if (!tracked) {
          tracked = true;
          track('lookup_search', { tool: type });
        }
      } catch (e) {
        if (controller.signal.aborted) return;
        ui.showRows([], 0, false);
        ui.showError(e instanceof Error ? e.message : 'Search failed.');
      } finally {
        if (!controller.signal.aborted && busy) busy.hidden = true;
      }
    }, 300);
  });
}

function initNpiLookup(root: HTMLElement) {
  const form = $<HTMLFormElement>(root, '[data-rcm-lookup-form]');
  const submit = $<HTMLButtonElement>(root, '[data-rcm-lookup-submit]');
  const busy = $(root, '[data-rcm-lookup-busy]');
  const idle = $(root, '[data-rcm-lookup-idle]');
  const ui = lookupUi(root, 'NPI');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const p = new URLSearchParams({ type: 'npi' });
    for (const k of ['number', 'first', 'last', 'org', 'state', 'city']) {
      const v = String(fd.get(k) ?? '').trim();
      if (v) p.set(k, v);
    }
    if (!['number', 'first', 'last', 'org'].some((k) => p.has(k))) {
      ui.showError('Enter an NPI number, a provider name or an organization name.');
      return;
    }
    if (submit) submit.disabled = true;
    if (busy) busy.hidden = false;
    if (idle) idle.hidden = true;
    ui.showError('');
    try {
      const d = await lookupFetch(p);
      ui.showRows(d.rows, d.total, true);
      track('lookup_search', { tool: 'npi' });
    } catch (err) {
      ui.showRows([], 0, false);
      ui.showError(err instanceof Error ? err.message : 'Search failed.');
    } finally {
      if (submit) submit.disabled = false;
      if (busy) busy.hidden = true;
      if (idle) idle.hidden = false;
    }
  });
}

/* ------------------------------------------------------------------ */
/*  /tools directory                                                   */
/* ------------------------------------------------------------------ */

function initDirectory(root: HTMLElement) {
  const search = $<HTMLInputElement>(root, '[data-rcm-tool-search]');
  const form = $<HTMLFormElement>(root, '[data-rcm-tool-form]');
  const tabs = $$<HTMLAnchorElement>(root, '[data-rcm-cat]');
  const items = $$(root, '[data-rcm-tool]').map((li) => ({ el: li, category: li.dataset.category ?? '', text: li.dataset.search ?? '' }));
  const count = $(root, '[data-rcm-tool-count]');
  const blurb = $(root, '[data-rcm-tool-blurb]');
  const empty = $(root, '[data-rcm-tool-empty]');
  const emptyText = $(root, '[data-rcm-tool-empty-text]');
  const on = (root.dataset.tabOn ?? '').split(/\s+/).filter(Boolean);
  const off = (root.dataset.tabOff ?? '').split(/\s+/).filter(Boolean);
  const basePath = (() => {
    try {
      return new URL(root.dataset.base || window.location.href, window.location.href).pathname;
    } catch {
      return window.location.pathname;
    }
  })();

  const params = new URLSearchParams(window.location.search);
  let cat = params.get('category') ?? '';
  if (!tabs.some((t) => t.dataset.rcmCat === cat)) cat = '';

  const apply = (updateUrl: boolean) => {
    const raw = (search?.value ?? '').trim();
    const terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const i of items) {
      const match = (!cat || i.category === cat) && terms.every((t) => i.text.includes(t));
      i.el.hidden = !match;
      if (match) shown++;
    }
    for (const t of tabs) {
      const active = (t.dataset.rcmCat ?? '') === cat;
      t.classList.remove(...(active ? off : on));
      t.classList.add(...(active ? on : off));
      if (active) t.setAttribute('aria-current', 'true');
      else t.removeAttribute('aria-current');
      const c = $(t, '[data-rcm-cat-count]');
      if (c) {
        c.classList.toggle('text-navy-200', active);
        c.classList.toggle('text-ink-subtle', !active);
      }
      if (active && blurb) {
        blurb.textContent = t.dataset.blurb ?? '';
        blurb.hidden = !cat || !t.dataset.blurb;
      }
    }
    if (count) count.textContent = `${shown} ${shown === 1 ? 'tool' : 'tools'}`;
    if (empty) empty.hidden = shown > 0;
    if (emptyText) emptyText.textContent = raw ? `No tools match “${raw}”.` : 'No tools in this category yet.';

    if (updateUrl) {
      const p = new URLSearchParams();
      if (cat) p.set('category', cat);
      if (raw) p.set('q', raw);
      const qs = p.toString();
      window.history.replaceState(null, '', qs ? `${basePath}?${qs}` : basePath);
    }
  };

  search?.addEventListener('input', () => apply(true));
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    apply(true);
  });
  for (const t of tabs) {
    t.addEventListener('click', (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      cat = t.dataset.rcmCat ?? '';
      // Drop the no-JS hidden category field so a later submit does not reapply it.
      $(root, '[data-rcm-tool-cat-input]')?.remove();
      apply(true);
    });
  }
  $(root, '[data-rcm-tool-clear]')?.addEventListener('click', (e) => {
    e.preventDefault();
    if (search) search.value = '';
    cat = '';
    apply(true);
    search?.focus();
  });
  apply(false);
}

/* ------------------------------------------------------------------ */
/*  Boot                                                               */
/* ------------------------------------------------------------------ */

function init() {
  for (const r of $$(document, '[data-rcm-calc]')) initCalculator(r);
  for (const r of $$(document, '[data-rcm-glossary]')) initGlossary(r);
  for (const r of $$(document, '[data-rcm-checklist]')) initChecklist(r);
  for (const r of $$(document, '[data-rcm-scorecard]')) initScorecard(r);
  for (const r of $$(document, '[data-rcm-lookup]')) {
    const type = r.dataset.rcmLookup;
    if (type === 'npi') initNpiLookup(r);
    else if (type === 'icd10' || type === 'hcpcs') initCodeLookup(r, type);
  }
  for (const r of $$(document, '[data-rcm-tool-directory]')) initDirectory(r);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
else init();
