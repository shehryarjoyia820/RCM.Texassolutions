import type { Faq } from './types';

/** Company-level content shared by the home page, company pages, FAQ page and the AI assistant's knowledge. */

/** Dental revenue cycle phases. Every step slug must be one of CORE_SERVICES in ./dental.ts. */
export const CYCLE = [
  {
    eyebrow: 'Before the appointment',
    title: 'Front end',
    text: 'Confirm that each dentist is in network and that the patient\'s dental benefits, frequencies and remaining maximum are known before treatment is planned or delivered.',
    steps: [
      { label: 'Network enrollment and credentialing', slug: 'dental-credentialing' },
      { label: 'Dental eligibility verification', slug: 'dental-insurance-verification' },
      { label: 'Benefits breakdown and patient estimates', slug: 'dental-insurance-verification' },
    ],
  },
  {
    eyebrow: 'After treatment',
    title: 'Claims and posting',
    text: 'Turn completed procedures into clean dental claims with the right CDT codes and attachments, then post every EOB and ERA accurately when carriers pay.',
    steps: [
      { label: 'Claim creation and attachments', slug: 'dental-claims-processing' },
      { label: 'Claim status tracking', slug: 'dental-claims-processing' },
      { label: 'EOB and ERA payment posting', slug: 'payment-posting' },
    ],
  },
  {
    eyebrow: 'Getting paid',
    title: 'Back end',
    text: 'Work every denial, follow every open insurance claim and patient balance until it is resolved, and report the results from your own data.',
    steps: [
      { label: 'Denials and appeals', slug: 'denial-management' },
      { label: 'Insurance A/R follow-up', slug: 'dental-accounts-receivable' },
      { label: 'Patient statements and balances', slug: 'patient-billing' },
      { label: 'Reporting and revenue analysis', slug: 'rcm-analytics-reporting' },
    ],
  },
];

export const HOME_FAQS: Faq[] = [
  {
    q: 'What is dental revenue cycle management, and what does a dental RCM company do?',
    a: 'Dental revenue cycle management (dental RCM) is the full process of getting a dental office paid for the care it delivers, from checking benefits before the visit to posting the final payment and resolving the patient balance. A dental RCM company runs that cycle for you inside your own software: keeping provider enrollment current, verifying benefits, sending dental insurance claims with the right attachments, posting EOBs and ERAs, working denials and appeals, following up on unpaid claims and patient balances, and reporting on the results. Dental billing, the claim and payment work in the middle, is one part of that cycle.',
  },
  {
    q: 'Do we need to change Open Dental, Dentrix or Eaglesoft?',
    a: 'No. We work inside the dental software you already run, using named user accounts your administrator creates and can disable at any time. Your ledgers, claim history and notes stay in your system. We are not affiliated with any software vendor; we simply work in the product as a user, with the access you grant. If your practice uses different software, we confirm during the consultation whether we can support it.',
  },
  {
    q: 'Can we outsource only dental insurance verification or A/R follow-up?',
    a: 'Yes. Many offices start with one area, such as verifying dental insurance before appointments or clearing older insurance A/R, while their front desk keeps the rest. Each service can be scoped on its own, and the written proposal spells out which tasks are ours and which stay with your team.',
  },
  {
    q: 'How much does dental revenue cycle management with you cost?',
    a: 'We do not publish prices; we quote in writing after a free consultation and a look at your workflow. The fee depends on which services you choose, your claim volume, number of locations and how much of the cycle we manage. Nothing starts until you have accepted the scope and price.',
  },
  {
    q: 'How do you protect patient information?',
    a: 'We sign a Business Associate Agreement before accessing any patient data, and we work only inside your systems through named accounts with the least access each task needs. Patient details are not sent by ordinary email or chat. This website, its forms and its AI assistant are for business enquiries only.',
  },
  {
    q: 'Do you work with PPO, DHMO and Medicaid dental plans across the USA?',
    a: 'Yes. Our team works remotely with dental offices across the USA and handles claims for PPO, DHMO, indemnity and state Medicaid or CHIP dental plans. Rules differ by carrier and state, so during onboarding we document the carriers and programs your office accepts and how each one handles claims and attachments.',
  },
];

export const GENERAL_FAQS: { topic: string; faqs: Faq[] }[] = [
  {
    topic: 'Working with us',
    faqs: [
      {
        q: 'Which parts of the dental revenue cycle can Texas Solutions RCM take over?',
        a: 'Any of our eight services, alone or together: insurance verification, dental claims, denials and appeals, payment posting, A/R follow-up, patient billing support, credentialing and reporting. Some offices hand us the whole revenue cycle, while others keep most of the work in-house and use us for one bottleneck. The split is written into the proposal so both teams know who owns each task.',
      },
      {
        q: 'Is Texas Solutions RCM a dental RCM company or a billing company?',
        a: 'We are a dental revenue cycle management (dental RCM) company. Dental billing, meaning claims, attachments and payment posting, is part of what we do, but we look after the whole cycle around it as well: credentialing and enrollment, insurance verification before the visit, denials and appeals, insurance and patient A/R, and reporting from your own data. You can use the full cycle or only the parts your office needs.',
      },
      {
        q: 'Will our front desk still see what is happening with claims?',
        a: 'Yes. Every claim note, posting and adjustment we make is recorded in your practice management software, so your front desk and office manager see it in the same patient ledger they use today. Nothing moves to a separate platform, and you can review or pause our work whenever you like.',
      },
      {
        q: 'Do you work with single-dentist offices as well as DSOs?',
        a: 'Yes, there is no minimum size. A solo general dentist, a specialty office and a multi-location group each need different staffing, so scope and price are sized to your claim volume and the services you pick. If keeping a task in-house would suit your office better, we will tell you during the consultation.',
      },
      {
        q: 'Do you support dental specialists such as orthodontists and oral surgeons?',
        a: 'Yes. We support general dentistry and specialty offices, including orthodontics, endodontics, periodontics, oral surgery, pediatric dentistry and prosthodontics. Each has its own billing habits, such as orthodontic payment schedules or surgical narratives, and we note these during onboarding so our checklists match how your office bills.',
      },
    ],
  },
  {
    topic: 'Getting started',
    faqs: [
      {
        q: 'What happens after our free consultation?',
        a: 'If we seem like a good fit, we ask for read-only access or a few standard reports, such as insurance aging and outstanding claims, so we can understand the workload. Then you receive a written proposal with scope, responsibilities and price. Work begins only after you accept it and a Business Associate Agreement is signed.',
      },
      {
        q: 'What do you need from our office to start?',
        a: 'Usually a named user account in your dental software and clearinghouse, access to the carrier portals you use, your fee schedules, any office billing policies and a contact person for questions. We send a checklist during onboarding so nothing is missed, and we confirm that each dentist is enrolled for electronic claims and ERAs.',
      },
      {
        q: 'Who will our office talk to day to day?',
        a: 'You get a named point of contact who coordinates the team on your account, answers questions and joins your review calls. Approvals, such as write-offs or patient statement changes, and escalations go through channels agreed in the proposal, so your office manager always knows who is responsible.',
      },
    ],
  },
  {
    topic: 'Dental software and carriers',
    faqs: [
      {
        q: 'Which dental practice management systems can your team use?',
        a: 'Our team works in three systems: Open Dental, Dentrix and Eaglesoft. If your practice uses different software, we confirm during the consultation whether we can support it. We do not install anything or require a switch. Product names belong to their owners, and Texas Solutions is not a partner or reseller of any dental software company.',
      },
      {
        q: 'How do you handle x-rays, perio charts and narratives for claims?',
        a: 'We send attachments through your clearinghouse attachment service or the carrier portal, depending on how your office is set up and what each carrier accepts. Before go-live, we agree which images and notes your clinical team saves to the chart so we can attach them without asking for each claim.',
      },
      {
        q: 'Can you work with carriers that do not send ERAs?',
        a: 'Yes. When a carrier sends paper EOBs or posts remittances only on its portal, we post from the EOB or portal record and reconcile against your deposits. Where a carrier offers ERA and EFT, we can help with enrollment so payments arrive electronically and post more consistently over time.',
      },
    ],
  },
  {
    topic: 'Patient data and security',
    faqs: [
      {
        q: 'Where does patient information stay while you work on our account?',
        a: 'It stays in your own systems. Our team signs in to your practice management software, clearinghouse and carrier portals through named accounts after a Business Associate Agreement is signed. We do not copy patient data into personal email, chat or files, and the public website is never used for it.',
      },
      {
        q: 'Can we remove your team\'s access?',
        a: 'Yes, whenever you choose. Because we use accounts inside your own software and portals, your administrator can disable them immediately. When an engagement ends we hand over open work with notes and return or securely delete any working files, as the Business Associate Agreement requires.',
      },
    ],
  },
  {
    topic: 'Free tools',
    faqs: [
      {
        q: 'Do the dental calculators cost anything?',
        a: 'No. Every calculator and checklist on this site is free and needs no account. Calculations run in your browser and are not sent to us unless you choose to share a result when you request a consultation. Several tools are built around dental figures, such as insurance A/R aging and collection rates.',
      },
      {
        q: 'Can we rely on the calculator results?',
        a: 'Treat them as estimates. Each tool uses the formula shown on its page and is checked against worked examples, but results depend on the numbers you enter and the stated assumptions. They are not guarantees or professional advice, so use them to spot trends and to prepare questions for your revenue cycle team.',
      },
    ],
  },
];

/** Text the AI assistant may use about the company. Keep in sync with the pages above. */
export const COMPANY_FACTS = `Texas Solutions RCM (rcm.texassolutions.co) is a dental revenue cycle management (RCM) company: the dental RCM division of Texas Solutions (texassolutions.co), a US company with an office at 401 W Kentucky Ave, Midland, TX 79701. Contact: info@texassolutions.co, +1 (838) 910-3147.
It serves dental practices only (general dentistry, orthodontics, endodontics, periodontics, oral surgery, pediatric dentistry, prosthodontics, dental groups and DSOs) in all 50 US states. It does not offer revenue cycle or billing services for non-dental healthcare. Describe it as a dental revenue cycle management (dental RCM) company, not as a billing company; dental billing (claims and payment work) is one part of the dental revenue cycle it manages.
Services: Insurance Verification & Eligibility; Dental Claims Management; Denial Management & Appeals; Payment Posting; Accounts Receivable (A/R) Management; Patient Billing & Collections Support; Dental Credentialing & Provider Enrollment; Dental RCM Reporting & Revenue Analysis. Claims for PPO, DHMO, indemnity and Medicaid/CHIP dental plans.
The team works remotely inside the practice's own dental software (Open Dental, Dentrix or Eaglesoft), clearinghouse and carrier portals using named accounts the practice controls. Texas Solutions is not affiliated with or a partner of any software vendor. A Business Associate Agreement is signed before any patient data is accessed.
Patient billing: the team prepares and sends patient statements; it does not phone patients, and conversations about balances stay with the practice front desk.
Consultations are free. Pricing is quoted in writing after a consultation because it depends on services, volume and locations; there is no published price list. The /pricing/ page explains how quotes work.
Not yet published or approved: client results, case studies, testimonials, certifications, turnaround times or guarantees. Do not state any.`;
