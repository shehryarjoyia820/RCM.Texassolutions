/** Entry for every public page. */
import { initNav, refreshNonce } from './nav';
import { initAnalytics } from './analytics';
import { initForms, initServicePickers } from './forms';
import { initChat } from './chat';

function boot() {
  initNav();
  initAnalytics();
  initForms();
  initServicePickers();
  initChat();
  // Refresh the REST nonce as soon as the visitor shows intent (cached pages carry an old one).
  const once = () => {
    void refreshNonce();
    document.removeEventListener('focusin', once);
    document.removeEventListener('pointerdown', once);
  };
  document.addEventListener('focusin', once);
  document.addEventListener('pointerdown', once);
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
else boot();
