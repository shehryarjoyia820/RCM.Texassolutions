import type { Faq } from './types';

/** Company-level content shared by the home page, company pages, FAQ page and the AI assistant's knowledge. */

export const CYCLE = [
  {
    eyebrow: 'Before the visit',
    title: 'Front end',
    text: 'Get patient, coverage and authorization details right before care is delivered, because most denials start here.',
    steps: [
      { label: 'Patient registration', slug: 'patient-registration' },
      { label: 'Eligibility verification', slug: 'insurance-eligibility-verification' },
      { label: 'Benefits verification', slug: 'benefits-verification' },
      { label: 'Prior authorization', slug: 'prior-authorization' },
    ],
  },
  {
    eyebrow: 'After the visit',
    title: 'Mid cycle',
    text: 'Turn clinical documentation into accurate codes and charges, then into claims that pass payer edits the first time.',
    steps: [
      { label: 'Medical coding', slug: 'medical-coding' },
      { label: 'Charge entry and capture', slug: 'charge-entry' },
      { label: 'Claims scrubbing', slug: 'claims-scrubbing' },
      { label: 'Claims submission', slug: 'claims-submission' },
    ],
  },
  {
    eyebrow: 'Getting paid',
    title: 'Back end',
    text: 'Post every payment, work every denial and follow every open claim and patient balance until it is resolved.',
    steps: [
      { label: 'Payment posting', slug: 'payment-posting' },
      { label: 'Denial management', slug: 'denial-management' },
      { label: 'AR follow-up', slug: 'accounts-receivable-management' },
      { label: 'Patient billing', slug: 'patient-billing' },
    ],
  },
];

export const HOME_FAQS: Faq[] = [
  {
    q: 'What does a revenue cycle management company do?',
    a: 'A revenue cycle management company handles the administrative work of getting a practice paid: verifying insurance, coding visits, submitting claims, posting payments, appealing denials and following up on unpaid claims and patient balances. You keep control of clinical care and decisions; the RCM team runs the billing workflow in your systems and reports on results.',
  },
  {
    q: 'Do we have to change our practice management or EHR software?',
    a: 'No. We work inside the practice management system, EHR, clearinghouse and payer portals you already use, with user accounts you create and control. If you are planning to change software anyway, we can help with the billing side of the migration, but switching systems is never a requirement for working with us.',
  },
  {
    q: 'Can we outsource only part of our billing?',
    a: 'Yes. Many practices start with one area, such as old AR follow-up, denial management, credentialing or eligibility checks, while their staff keep the rest. Each service has its own page explaining the scope. We agree on clear handoffs so nothing falls between your team and ours.',
  },
  {
    q: 'How is pricing set?',
    a: 'Pricing depends on the services you choose, claim volume, specialty and how much of the cycle we manage, so we quote after a free consultation and a look at your current workflow. You get the price and scope in writing before any work starts. We do not publish a one-size price because practices differ too much for it to be accurate.',
  },
  {
    q: 'How do you protect patient information?',
    a: 'We sign a Business Associate Agreement before accessing any patient data, use named accounts with only the access each task needs, and keep patient information inside your systems rather than in email or spreadsheets. This website, its forms and its chat are for business enquiries only and must not be used to send patient information.',
  },
  {
    q: 'Do you work with dental practices?',
    a: 'Yes. Dental billing has its own claim form, codes and insurance rules, such as frequency limits, annual maximums and pre-treatment estimates. We support general dentistry and dental specialties, including insurance verification, claims, attachments, payment posting and insurance AR follow-up.',
  },
];

export const GENERAL_FAQS: { topic: string; faqs: Faq[] }[] = [
  { topic: 'Working with us', faqs: HOME_FAQS.slice(0, 4) },
  {
    topic: 'Onboarding',
    faqs: [
      {
        q: 'What happens after the free consultation?',
        a: 'If it looks like a good fit, we ask for read-only access or a set of reports so we can review aging, denials and workflow. We then send a written proposal with scope, responsibilities and price. Nothing starts until you accept it and a Business Associate Agreement is signed.',
      },
      {
        q: 'What do you need from our practice to start?',
        a: 'Typically user accounts in your PM/EHR and clearinghouse, access to payer portals, your fee schedule and payer contracts if available, recent aging and denial reports, and a named contact on your team for questions. We provide a checklist during onboarding so nothing is missed.',
      },
      {
        q: 'Who will we work with day to day?',
        a: 'You get a named point of contact who coordinates the team working on your account and joins your review calls. Questions, approvals and escalations go through agreed channels, so you always know who is responsible for each part of the work.',
      },
    ],
  },
  {
    topic: 'Data and security',
    faqs: [
      HOME_FAQS[4],
      {
        q: 'Can we revoke your access?',
        a: 'Yes, at any time. Because our team works through accounts in your own systems, your administrators can disable them immediately. When an engagement ends we return or securely delete any working files, as set out in the Business Associate Agreement.',
      },
      {
        q: 'Can I send patient details through the website or chat?',
        a: 'No. The website forms, email notifications and AI assistant are only for business enquiries. If you need to share patient information as part of our work, we will agree a secure method covered by a Business Associate Agreement first.',
      },
    ],
  },
  {
    topic: 'Tools and resources',
    faqs: [
      {
        q: 'Are the calculators free to use?',
        a: 'Yes. All calculators, checklists and lookups on this site are free and need no account. Calculations run in your browser and are not sent to us unless you choose to send a result with a consultation request.',
      },
      {
        q: 'How accurate are the calculator results?',
        a: 'Each calculator uses the formula shown on its page and is tested against worked examples. Results are estimates based on the numbers you enter and the stated assumptions; they are not guarantees or professional advice. Use them to understand trends and to prepare questions for your billing team or advisor.',
      },
    ],
  },
];

/** Text the AI assistant may use about the company. Keep in sync with the pages above. */
export const COMPANY_FACTS = `Texas Solutions RCM (rcm.texassolutions.co) is the healthcare revenue cycle management division of Texas Solutions (texassolutions.co), a US company with an office at 401 W Kentucky Ave, Midland, TX 79701. Contact: info@texassolutions.co, +1 (838) 910-3147.
It serves US medical and dental practices with medical billing, coding, eligibility and benefits verification, prior authorization support, claims, payment posting, denial management, AR follow-up, credentialing and provider enrollment, patient billing support, audits, reporting and remote administrative support.
The team works remotely inside the client's own PM/EHR, clearinghouse and payer portals using accounts the client controls. A Business Associate Agreement is signed before any patient data is accessed.
Consultations are free. Pricing is quoted in writing after a consultation because it depends on services, specialty and volume; there is no published price list.
Not yet published or approved: client results, case studies, testimonials, certifications, turnaround times or guarantees. Do not state any.`;
