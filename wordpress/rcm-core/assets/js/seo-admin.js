/**
 * RCM SEO admin helpers (plain JS, not bundled).
 * Character counters, search preview, social image picker, FAQ/source
 * repeaters and copy buttons for the SEO meta boxes and RCM > SEO screen.
 */
(function () {
  'use strict';

  var cfg = window.RCM_SEO || {};
  var i18n = cfg.i18n || {};
  var site = cfg.site || 'Texas Solutions RCM';
  var titleMax = cfg.titleMax || 60;

  function t(key, fallback) {
    return i18n[key] || fallback;
  }

  function len(s) {
    return Array.from(s).length;
  }

  function compose(title) {
    title = (title || '').trim();
    if (!title) return site;
    if (title.toLowerCase().indexOf(site.toLowerCase()) !== -1) return title;
    var full = title + ' | ' + site;
    return len(full) <= titleMax ? full : title;
  }

  /* Counters ----------------------------------------------------------- */

  function updateCount(input) {
    var out = document.getElementById(input.getAttribute('data-rcm-seo-count'));
    if (!out) return;
    var min = parseInt(input.getAttribute('data-min') || '0', 10);
    var max = parseInt(input.getAttribute('data-max') || '0', 10);
    var value = input.value.trim();
    var state = 'ok';
    var msg;

    if (!value) {
      var ph = (input.getAttribute('placeholder') || '').trim();
      msg = ph ? t('fallback', 'Empty: the default shown in grey is used') + ' (' + len(ph) + ')' : t('empty', 'Empty');
      state = ph ? 'info' : 'warn';
    } else {
      // Titles are measured as they will appear, with the site name when it is appended.
      var n = input.hasAttribute('data-compose') ? len(compose(value)) : len(value);
      msg = n + ' ' + t('chars', 'characters');
      if (min && max) msg += ' (' + t('target', 'target') + ' ' + min + '–' + max + ')';
      else if (max) msg += ' (' + t('target', 'target') + ' ≤ ' + max + ')';
      if (max && n > max) {
        state = 'bad';
        msg += ', ' + t('tooLong', 'too long');
      } else if (min && n < min) {
        state = 'warn';
        msg += ', ' + t('tooShort', 'short');
      }
    }
    out.textContent = msg;
    out.className = 'rcm-seo-count is-' + state;
  }

  /* Search preview ----------------------------------------------------- */

  function updatePreview() {
    var nodes = document.querySelectorAll('[data-rcm-seo-preview]');
    Array.prototype.forEach.call(nodes, function (node) {
      var input = document.getElementById(node.getAttribute('data-source'));
      if (!input) return;
      var value = input.value.trim() || (input.getAttribute('placeholder') || '').trim();
      if (node.getAttribute('data-rcm-seo-preview') === 'title') {
        node.textContent = compose(value);
      } else {
        node.textContent = value.length > 160 ? value.slice(0, 157) + '…' : value;
      }
    });
  }

  /* Social image picker ------------------------------------------------ */

  function pickImage(button) {
    var wrap = button.closest('[data-rcm-seo-media]');
    if (!wrap || !window.wp || !window.wp.media) return;
    var input = wrap.querySelector('input[type="hidden"]');
    var preview = wrap.querySelector('.rcm-seo-og-preview');
    var remove = wrap.querySelector('[data-rcm-seo-media-remove]');
    var frame = window.wp.media({
      title: t('chooseImage', 'Choose social sharing image'),
      button: { text: t('useImage', 'Use this image') },
      library: { type: 'image' },
      multiple: false
    });
    frame.on('select', function () {
      var a = frame.state().get('selection').first().toJSON();
      input.value = String(a.id);
      preview.innerHTML = '';
      var img = document.createElement('img');
      img.src = a.sizes && a.sizes.medium ? a.sizes.medium.url : a.url;
      img.alt = '';
      preview.appendChild(img);
      if (remove) remove.hidden = false;
    });
    frame.open();
  }

  function removeImage(button) {
    var wrap = button.closest('[data-rcm-seo-media]');
    if (!wrap) return;
    wrap.querySelector('input[type="hidden"]').value = '';
    wrap.querySelector('.rcm-seo-og-preview').innerHTML = '';
    button.hidden = true;
  }

  /* Repeaters ---------------------------------------------------------- */

  function addRow(button) {
    var rep = button.closest('[data-rcm-seo-repeater]');
    if (!rep) return;
    var rows = rep.querySelector('.rcm-seo-rows');
    var tpl = rep.querySelector('template');
    var max = parseInt(rep.getAttribute('data-max') || '0', 10);
    if (!rows || !tpl) return;
    if (max && rows.children.length >= max) return;
    rows.appendChild(tpl.content.cloneNode(true));
    var last = rows.lastElementChild;
    var field = last && last.querySelector('input, textarea');
    if (field) field.focus();
  }

  function removeRow(button) {
    var row = button.closest('.rcm-seo-row');
    if (!row) return;
    var rep = row.closest('[data-rcm-seo-repeater]');
    row.parentNode.removeChild(row);
    var add = rep && rep.querySelector('[data-rcm-seo-add]');
    if (add) add.focus();
  }

  /* Copy buttons ------------------------------------------------------- */

  function copy(button) {
    var target = document.getElementById(button.getAttribute('data-rcm-seo-copy'));
    if (!target) return;
    var done = function () {
      var label = button.textContent;
      button.textContent = t('copied', 'Copied');
      window.setTimeout(function () {
        button.textContent = label;
      }, 1500);
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(target.value).then(done, function () {
        target.select();
      });
    } else {
      target.select();
      try {
        document.execCommand('copy');
        done();
      } catch (e) {
        /* the text stays selected for a manual copy */
      }
    }
  }

  /* Wiring ------------------------------------------------------------- */

  document.addEventListener('click', function (e) {
    var el = e.target instanceof Element ? e.target : null;
    if (!el) return;
    var hit;
    if ((hit = el.closest('[data-rcm-seo-media-pick]'))) {
      e.preventDefault();
      pickImage(hit);
    } else if ((hit = el.closest('[data-rcm-seo-media-remove]'))) {
      e.preventDefault();
      removeImage(hit);
    } else if ((hit = el.closest('[data-rcm-seo-add]'))) {
      e.preventDefault();
      addRow(hit);
    } else if ((hit = el.closest('[data-rcm-seo-remove]'))) {
      e.preventDefault();
      removeRow(hit);
    } else if ((hit = el.closest('[data-rcm-seo-copy]'))) {
      e.preventDefault();
      copy(hit);
    }
  });

  document.addEventListener('input', function (e) {
    var el = e.target;
    if (el && el.hasAttribute && el.hasAttribute('data-rcm-seo-count')) {
      updateCount(el);
      updatePreview();
    }
  });

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('[data-rcm-seo-count]'), updateCount);
    updatePreview();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
