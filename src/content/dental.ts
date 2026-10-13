/**
 * Dental-only refocus (owner brief, 2026-10-13): the single source of truth for
 * what stays on rcm.texassolutions.co, what is retired and where each retired
 * URL redirects. The content export filters everything through these lists, the
 * importer drafts anything no longer in the bundle, and the redirects below are
 * written to the RCM redirect table (one 301 hop each).
 */

/** The 8 services the company sells, in menu order. */
export const CORE_SERVICES = [
  {
    slug: 'dental-insurance-verification',
    name: 'Insurance Verification & Eligibility',
    subs: ['Dental insurance eligibility verification', 'Benefits breakdown', 'Deductible and annual maximum verification', 'Frequency limitations and waiting period checks', 'Patient responsibility estimates'],
  },
  {
    slug: 'dental-claims-processing',
    name: 'Dental Claims Management',
    subs: ['Dental claim creation and submission', 'CDT code and documentation review', 'Claim attachments and corrections', 'Rejected claim resubmission', 'Claim status tracking and follow-up'],
  },
  {
    slug: 'denial-management',
    name: 'Denial Management & Appeals',
    subs: ['Insurance claim denial analysis', 'Corrected claims submission', 'Insurance appeals and reconsiderations', 'Missing documentation follow-up', 'Denial prevention and root-cause analysis'],
  },
  {
    slug: 'payment-posting',
    name: 'Payment Posting',
    subs: ['EOB and ERA payment posting', 'Insurance and patient payment entry', 'Contractual adjustments', 'Payment reconciliation', 'Underpayment and discrepancy identification'],
  },
  {
    slug: 'dental-accounts-receivable',
    name: 'Accounts Receivable (A/R) Management',
    subs: ['30/60/90+ day A/R follow-up', 'Outstanding insurance claim follow-up', 'Insurance payer calls and portal follow-up', 'Aging report analysis', 'A/R cleanup and recovery projects'],
  },
  {
    slug: 'patient-billing',
    name: 'Patient Billing & Collections Support',
    subs: ['Patient statement processing', 'Patient balance review', 'Payment allocation', 'Outstanding patient balance follow-up', 'Patient billing coordination'],
  },
  {
    slug: 'dental-credentialing',
    name: 'Dental Credentialing & Provider Enrollment',
    subs: ['Dental provider credentialing', 'Insurance network enrollment', 'Re-credentialing services', 'Provider information updates', 'EFT/ERA enrollment assistance'],
  },
  {
    slug: 'rcm-analytics-reporting',
    name: 'Dental RCM Reporting & Revenue Analysis',
    subs: ['Accounts receivable aging reports', 'Claim status reporting', 'Denial trend analysis', 'Collection and adjustment reporting', 'Monthly revenue performance reports'],
  },
] as const;

export const OVERVIEW_SERVICES = ['dental-billing', 'revenue-cycle-management'] as const;
export const SOFTWARE_SERVICES = ['dentrix-billing-services', 'open-dental-billing-services', 'eaglesoft-billing-services', 'curve-dental-billing-services'] as const;

export const KEPT_SERVICES: string[] = [...OVERVIEW_SERVICES, ...CORE_SERVICES.map((s) => s.slug), ...SOFTWARE_SERVICES];

export const KEPT_SPECIALTIES = ['general-dentistry', 'orthodontics', 'endodontics', 'periodontics', 'oral-surgery', 'pediatric-dentistry', 'prosthodontics', 'dental-group-practices'];

export const DENTAL_TOOLS = [
  'dental-practice-revenue-calculator',
  'dental-billing-cost-calculator',
  'dental-denial-rate-calculator',
  'dental-insurance-collection-calculator',
  'dental-ar-aging-calculator',
  'dental-practice-roi-calculator',
  'dental-insurance-verification-checklist',
];
/** Generic tools kept but rewritten with dental examples. */
export const GENERIC_TOOLS = [
  'days-in-ar-calculator',
  'net-collection-rate-calculator',
  'clean-claim-rate-calculator',
  'outsourcing-vs-in-house-billing-calculator',
  'fee-schedule-comparison-calculator',
  'credentialing-checklist',
  'denial-appeal-checklist',
  'claim-submission-checklist',
  'eob-explained',
  'npi-lookup',
];
export const KEPT_TOOLS = [...DENTAL_TOOLS, ...GENERIC_TOOLS];

export const DENTAL_POSTS = [
  'dental-insurance-billing-process',
  'how-to-choose-a-dental-billing-company',
  'in-house-vs-outsourced-dental-billing',
  'medicaid-and-medicare-dental-billing',
  'ppo-dental-billing-guide',
  'cdt-2026-code-changes',
  'dental-billing-codes-guide',
  'how-to-appeal-a-denied-dental-claim',
  // Keyword plan (docs/dental-billing-keywords-usa.xlsx).
  'ada-dental-claim-form',
  'caqh-proview-for-dentists',
  'dental-insurance-biller',
  'dental-practice-management-software',
  'dental-billing-software',
  'dental-medical-cross-coding',
  'ai-in-dental-revenue-cycle-management',
];
/** Generic posts kept at the same URL but rewritten with dental examples. */
export const GENERIC_POSTS = [
  'what-is-revenue-cycle-management',
  'how-to-reduce-claim-denials',
  'how-to-calculate-net-collection-rate',
  'what-is-a-clean-claim-rate',
  'hipaa-and-outsourced-medical-billing',
  'patient-payment-options-text-to-pay',
];
export const KEPT_POSTS = [...DENTAL_POSTS, ...GENERIC_POSTS];

/** Blog categories that remain (others redirect to /blog/). Category of each kept post. */
export const KEPT_CATEGORIES = ['Dental Billing', 'Denial Management', 'Practice Management', 'Compliance and Regulation'];
export const POST_CATEGORY: Record<string, string> = {
  'dental-insurance-billing-process': 'Dental Billing',
  'how-to-choose-a-dental-billing-company': 'Dental Billing',
  'in-house-vs-outsourced-dental-billing': 'Dental Billing',
  'medicaid-and-medicare-dental-billing': 'Dental Billing',
  'ppo-dental-billing-guide': 'Dental Billing',
  'cdt-2026-code-changes': 'Dental Billing',
  'dental-billing-codes-guide': 'Dental Billing',
  'how-to-appeal-a-denied-dental-claim': 'Denial Management',
  'what-is-revenue-cycle-management': 'Dental Billing',
  'how-to-reduce-claim-denials': 'Denial Management',
  'how-to-calculate-net-collection-rate': 'Practice Management',
  'what-is-a-clean-claim-rate': 'Practice Management',
  'hipaa-and-outsourced-medical-billing': 'Compliance and Regulation',
  'patient-payment-options-text-to-pay': 'Practice Management',
  'ada-dental-claim-form': 'Dental Billing',
  'caqh-proview-for-dentists': 'Practice Management',
  'dental-insurance-biller': 'Practice Management',
  'dental-practice-management-software': 'Practice Management',
  'dental-billing-software': 'Practice Management',
  'dental-medical-cross-coding': 'Dental Billing',
  'ai-in-dental-revenue-cycle-management': 'Practice Management',
};

export const KEPT_PAGES = [
  'about', 'how-we-work', 'technology', 'security', 'contact', 'consultation', 'faq',
  'privacy-policy', 'terms-of-service', 'cookie-policy', 'accessibility-statement', 'disclaimer',
  'service-areas', 'texas', 'florida', 'california', 'new-york',
  'carriers', 'delta-dental', 'metlife', 'cigna', 'aetna', 'guardian', 'unitedhealthcare-dental',
  'pricing',
];
/** Pages built but kept unpublished until the owner supplies copy. */
export const DRAFT_PAGES: string[] = [];

/* ------------------------------------------------------------------ */
/*  301 redirects (from path -> target path), one hop each             */
/* ------------------------------------------------------------------ */

const group = (prefix: string, slugs: string[], to: string) => Object.fromEntries(slugs.map((s) => [`${prefix}${s}/`, to]));

export const REDIRECTS: Record<string, string> = {
  // Services: 45 removed
  ...group('/services/', ['medical-billing', 'medical-billing-small-practices', 'dental-billing-small-practices', 'out-of-network-billing', 'dental-virtual-assistant', 'virtual-medical-assistant', 'practice-management-support', 'healthcare-data-entry', 'ehr-workflow-support', 'appointment-scheduling'], '/services/dental-billing/'),
  ...group('/services/', ['insurance-eligibility-verification', 'benefits-verification', 'prior-authorization', 'patient-registration'], '/services/dental-insurance-verification/'),
  ...group('/services/', ['medical-coding', 'coding-audit', 'charge-entry', 'claims-submission', 'claims-scrubbing', 'electronic-claims-processing', 'clearinghouse-coordination'], '/services/dental-claims-processing/'),
  '/services/dental-medical-cross-coding/': '/blog/dental-medical-cross-coding/',
  ...group('/services/', ['denial-appeals'], '/services/denial-management/'),
  ...group('/services/', ['era-processing', 'payment-reconciliation', 'underpayment-identification'], '/services/payment-posting/'),
  ...group('/services/', ['accounts-receivable-management', 'aging-ar-follow-up', 'revenue-recovery'], '/services/dental-accounts-receivable/'),
  ...group('/services/', ['patient-collections', 'patient-financial-communication'], '/services/patient-billing/'),
  ...group('/services/', ['medical-credentialing', 'provider-enrollment', 'payer-contracting', 'dental-ppo-negotiation'], '/services/dental-credentialing/'),
  ...group('/services/', ['fee-schedule-analysis', 'revenue-cycle-audit', 'rcm-workflow-optimization'], '/services/rcm-analytics-reporting/'),
  ...group('/services/', ['remote-patient-monitoring-billing', 'chronic-care-management-billing', 'billing-software-migration', 'kareo-tebra-billing-services', 'athenahealth-billing-services', 'eclinicalworks-billing-services', 'advancedmd-billing-services'], '/services/'),

  // Specialties: 34 medical removed
  ...group('/specialties/', [
    'family-medicine', 'internal-medicine', 'cardiology', 'dermatology', 'orthopedics', 'neurology', 'gastroenterology', 'pediatrics', 'behavioral-health',
    'physical-therapy', 'occupational-therapy', 'chiropractic', 'pain-management', 'radiology', 'urgent-care', 'primary-care', 'oncology', 'pulmonology',
    'urology', 'nephrology', 'endocrinology', 'obgyn', 'ophthalmology', 'podiatry', 'ent', 'ambulatory-surgery-centers', 'home-health', 'mental-health-clinics',
    'multi-specialty', 'aba-therapy', 'optometry', 'laboratory', 'dme-suppliers', 'telehealth',
  ], '/specialties/'),

  // Tools: 34 removed
  ...group('/tools/', ['ar-aging-calculator'], '/tools/dental-ar-aging-calculator/'),
  ...group('/tools/', ['denial-rate-calculator', 'claim-rejection-rate-calculator', 'first-pass-acceptance-rate-calculator'], '/tools/dental-denial-rate-calculator/'),
  ...group('/tools/', ['medical-billing-cost-calculator', 'cost-per-claim-calculator', 'billing-staffing-cost-calculator', 'billing-outsourcing-savings-calculator'], '/tools/dental-billing-cost-calculator/'),
  ...group('/tools/', ['rcm-roi-calculator', 'break-even-calculator', 'practice-profit-margin-calculator'], '/tools/dental-practice-roi-calculator/'),
  ...group('/tools/', ['practice-revenue-calculator', 'annual-revenue-projection-calculator', 'monthly-revenue-forecast-calculator', 'revenue-per-provider-calculator', 'provider-productivity-calculator'], '/tools/dental-practice-revenue-calculator/'),
  ...group('/tools/', ['gross-collection-rate-calculator', 'collection-efficiency-calculator'], '/tools/dental-insurance-collection-calculator/'),
  ...group('/tools/', [
    'icd-10-code-search', 'hcpcs-code-lookup', 'medical-billing-acronyms', 'medical-billing-glossary', 'denial-reasons-guide', 'prior-authorization-checklist',
    'era-explained', 'claim-status-categories', 'claim-turnaround-time-calculator', 'payer-mix-calculator', 'payment-variance-calculator',
    'patient-balance-calculator', 'revenue-leakage-estimator', 'revenue-recovery-calculator', 'underpayment-estimator', 'rcm-performance-scorecard',
  ], '/tools/'),

  // Blog: 19 removed
  '/blog/how-to-choose-a-medical-billing-company/': '/blog/how-to-choose-a-dental-billing-company/',
  '/blog/common-medical-billing-denial-codes/': '/blog/how-to-appeal-a-denied-dental-claim/',
  '/blog/medical-billing-for-dental-sleep-apnea/': '/blog/dental-medical-cross-coding/',
  '/blog/billing-medical-insurance-for-dental-procedures/': '/blog/dental-medical-cross-coding/',
  '/blog/how-much-do-medical-billing-services-cost/': '/tools/dental-billing-cost-calculator/',
  ...group('/blog/', [
    'how-medical-billing-works', 'what-is-ar-in-medical-billing', 'medical-billing-vs-revenue-cycle-management', 'medical-billing-kpis',
    'telehealth-billing-codes-guide', 'no-surprises-act-good-faith-estimates',
    'cpt-2026-code-changes', 'icd-10-cm-2026-updates', 'how-to-start-a-medical-billing-company', 'medical-billing-and-coding-certifications',
  ], '/blog/'),
  '/blog/dental-billing-training-guide/': '/blog/dental-insurance-biller/',
  ...group('/blog/', ['ai-in-revenue-cycle-management', 'medical-billing-automation-and-rpa', 'ai-and-electronic-prior-authorization'], '/blog/ai-in-dental-revenue-cycle-management/'),
  // Blog categories: 7 removed
  ...group('/blog/category/', ['medical-billing', 'revenue-cycle-management', 'medical-coding', 'insurance-claims', 'credentialing', 'healthcare-technology', 'healthcare-ai', 'rcm-tools-and-guides', 'healthcare-industry-news', 'medicare-and-medicaid-updates', 'specialty-billing-guides', 'uncategorized'], '/blog/'),

  // Company pages: 8 removed
  '/approach/': '/how-we-work/',
  '/why-choose-us/': '/how-we-work/',
  '/data-handling-and-security/': '/security/',
  '/proposal/': '/consultation/',
  '/careers/': '/about/',
  '/partners/': '/about/',
  '/outsourcing-vs-in-house-billing/': '/blog/in-house-vs-outsourced-dental-billing/',
  '/resources/': '/blog/',
};

/** Rewrites an internal link that points at a retired URL to its redirect target. */
export function retarget(href: string): string {
  const m = href.match(/^(\/[^?#]*?)\/?([?#].*)?$/);
  if (!m) return href;
  const path = `${m[1]}/`;
  return REDIRECTS[path] ? REDIRECTS[path] + (m[2] ?? '') : href;
}
