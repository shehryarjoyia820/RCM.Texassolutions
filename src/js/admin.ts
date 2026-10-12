/** RCM admin: repeaters and reference filters in the content meta boxes. */

function renumber(list: HTMLElement) {
  Array.from(list.children).forEach((row, i) => {
    for (const el of Array.from(row.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('[name]'))) {
      el.name = el.name.replace(/\]\[(\d+|__i__)\]\[/, `][${i}][`);
    }
  });
}

function initRepeaters() {
  for (const rep of Array.from(document.querySelectorAll<HTMLElement>('[data-rcm-repeater]'))) {
    const list = rep.querySelector<HTMLElement>('.rcm-rows');
    const tpl = rep.querySelector<HTMLTemplateElement>('template');
    if (!list || !tpl) continue;
    rep.querySelector('.rcm-add-row')?.addEventListener('click', () => {
      list.appendChild(tpl.content.cloneNode(true));
      renumber(list);
      (list.lastElementChild?.querySelector('input, textarea') as HTMLElement | null)?.focus();
    });
    list.addEventListener('click', (e) => {
      const btn = (e.target as HTMLElement).closest('button');
      const row = btn?.closest('.rcm-row');
      if (!btn || !row) return;
      if (btn.classList.contains('rcm-remove')) row.remove();
      if (btn.classList.contains('rcm-up') && row.previousElementSibling) list.insertBefore(row, row.previousElementSibling);
      if (btn.classList.contains('rcm-down') && row.nextElementSibling) list.insertBefore(row.nextElementSibling, row);
      renumber(list);
    });
  }
}

function initRefFilters() {
  for (const box of Array.from(document.querySelectorAll<HTMLElement>('.rcm-refs'))) {
    const input = box.querySelector<HTMLInputElement>('.rcm-refs-filter');
    input?.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      for (const label of Array.from(box.querySelectorAll<HTMLLabelElement>('.rcm-refs-list label'))) {
        const checked = label.querySelector('input')?.checked;
        label.hidden = !!q && !checked && !label.textContent?.toLowerCase().includes(q);
      }
    });
  }
}

function initConfirms() {
  document.addEventListener('click', (e) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-rcm-confirm]');
    if (el && !window.confirm(el.dataset.rcmConfirm || 'Are you sure?')) e.preventDefault();
  });
}

function boot() {
  initRepeaters();
  initRefFilters();
  initConfirms();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
