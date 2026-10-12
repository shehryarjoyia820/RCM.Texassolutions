/** Header behaviour: desktop dropdowns, mobile menu, sticky shadow. Works with markup in the theme's header.php. */

export function initNav(): void {
  const header = document.querySelector<HTMLElement>('[data-rcm-header]');
  if (!header) return;

  // Sticky header shadow.
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Desktop dropdowns: click to toggle, hover to open on pointer devices, Escape/outside click to close.
  const triggers = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-rcm-menu-trigger]'));
  const panelOf = (t: HTMLButtonElement) => document.getElementById(t.getAttribute('aria-controls') || '');
  const closeAll = (except?: HTMLButtonElement) => {
    for (const t of triggers) {
      if (t === except) continue;
      t.setAttribute('aria-expanded', 'false');
      panelOf(t)?.setAttribute('hidden', '');
    }
  };
  const open = (t: HTMLButtonElement) => {
    closeAll(t);
    t.setAttribute('aria-expanded', 'true');
    panelOf(t)?.removeAttribute('hidden');
  };
  for (const t of triggers) {
    t.addEventListener('click', (e) => {
      e.stopPropagation();
      if (t.getAttribute('aria-expanded') === 'true') closeAll();
      else open(t);
    });
    const li = t.closest('li');
    if (li && window.matchMedia('(hover: hover)').matches) {
      let timer: number | undefined;
      li.addEventListener('mouseenter', () => {
        window.clearTimeout(timer);
        open(t);
      });
      li.addEventListener('mouseleave', () => {
        timer = window.setTimeout(() => {
          t.setAttribute('aria-expanded', 'false');
          panelOf(t)?.setAttribute('hidden', '');
        }, 120);
      });
    }
  }
  document.addEventListener('click', (e) => {
    if (!(e.target as Element).closest('[data-rcm-menu-panel]')) closeAll();
  });

  // Mobile menu.
  const toggle = header.querySelector<HTMLButtonElement>('[data-rcm-mobile-toggle]');
  const mobile = document.getElementById('rcm-mobile-nav');
  const setMobile = (on: boolean) => {
    if (!toggle || !mobile) return;
    toggle.setAttribute('aria-expanded', String(on));
    toggle.setAttribute('aria-label', on ? 'Close menu' : 'Open menu');
    toggle.querySelector('[data-icon-open]')?.toggleAttribute('hidden', on);
    toggle.querySelector('[data-icon-close]')?.toggleAttribute('hidden', !on);
    mobile.toggleAttribute('hidden', !on);
    document.body.style.overflow = on ? 'hidden' : '';
    if (on) mobile.querySelector<HTMLElement>('a, button')?.focus();
  };
  toggle?.addEventListener('click', () => setMobile(toggle.getAttribute('aria-expanded') !== 'true'));
  for (const b of Array.from(document.querySelectorAll<HTMLButtonElement>('[data-rcm-mobile-section]'))) {
    b.addEventListener('click', () => {
      const id = b.getAttribute('aria-controls') || '';
      const on = b.getAttribute('aria-expanded') !== 'true';
      b.setAttribute('aria-expanded', String(on));
      document.getElementById(id)?.toggleAttribute('hidden', !on);
      b.querySelector('svg')?.classList.toggle('rotate-180', on);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openTrigger = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
    closeAll();
    openTrigger?.focus();
    if (toggle?.getAttribute('aria-expanded') === 'true') {
      setMobile(false);
      toggle.focus();
    }
  });

  // Interactive revenue cycle diagram on the home page.
  for (const root of Array.from(document.querySelectorAll<HTMLElement>('[data-rcm-cycle]'))) {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[role="tab"]'));
    const select = (tab: HTMLButtonElement) => {
      for (const t of tabs) {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
        document.getElementById(t.getAttribute('aria-controls') || '')?.toggleAttribute('hidden', !on);
      }
    };
    tabs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
        if (!d) return;
        e.preventDefault();
        const next = tabs[(i + d + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
  }
}

/** Pages are cached, so fetch a fresh REST nonce once before the first POST. */
let refreshing: Promise<void> | null = null;
export function refreshNonce(): Promise<void> {
  // Logged-in staff never get cached pages, and a cookie-less nonce would not match their session.
  if (document.body.classList.contains('logged-in')) return Promise.resolve();
  refreshing ??= fetch(`${window.RCM.rest}nonce`, { credentials: 'omit', cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d: { nonce?: string } | null) => {
      if (d?.nonce) window.RCM.nonce = d.nonce;
    })
    .catch(() => undefined);
  return refreshing;
}
