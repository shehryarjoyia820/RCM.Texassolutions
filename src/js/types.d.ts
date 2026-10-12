/** Runtime config printed by RCM\Assets::front() as window.RCM (see docs/FRONTEND.md). */
export interface RcmConfig {
  rest: string;
  nonce: string;
  ga4: string;
  chat: { enabled: boolean; welcome: string };
  privacyUrl: string;
  cookieUrl?: string;
  consultationUrl: string;
  phiWarning: string;
  consentText: string;
  chatConsentText: string;
  /** Analytics consent banner copy, from RCM\Analytics::config(). */
  consent?: { version: number; text: string; accept: string; decline: string; policy: string };
}

declare global {
  interface Window {
    RCM: RcmConfig;
    RCM_CALC?: Record<string, (v: Record<string, number>) => unknown>;
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}
