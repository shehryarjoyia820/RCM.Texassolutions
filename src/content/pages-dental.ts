/**
 * Dental-only replacements for company pages (owner brief, 2026-10-13).
 *
 * Each entry fully replaces the page with the same key in ./pages.ts. Follow
 * docs/DENTAL-WRITING.md and docs/CONTENT-GUIDE.md: no invented results,
 * prices, certifications, "HIPAA compliant" claims, client names or partner
 * claims, and links only to URLs that stay live (see ./dental.ts).
 */

import type { PageContent } from './pages';

/* ---------- block markup helpers (copied from ./pages.ts) ---------- */

const h2 = (t: string): string =>
  `<!-- wp:heading -->\n<h2 class="wp-block-heading">${t}</h2>\n<!-- /wp:heading -->`;

const h3 = (t: string): string =>
  `<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">${t}</h3>\n<!-- /wp:heading -->`;

const p = (t: string): string => `<!-- wp:paragraph -->\n<p>${t}</p>\n<!-- /wp:paragraph -->`;

const li = (items: string[]): string =>
  items.map((i) => `<!-- wp:list-item -->\n<li>${i}</li>\n<!-- /wp:list-item -->`).join('\n');

const ul = (items: string[]): string =>
  `<!-- wp:list -->\n<ul class="wp-block-list">${li(items)}</ul>\n<!-- /wp:list -->`;

const table = (head: string[], rows: string[][]): string =>
  `<!-- wp:table -->\n<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr>${head
    .map((c) => `<th>${c}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></figure>\n<!-- /wp:table -->`;

const a = (href: string, text: string): string => `<a href="${href}">${text}</a>`;

const blocks = (...b: string[]): string => b.join('\n\n');

const EMAIL = '<a href="mailto:info@texassolutions.co">info@texassolutions.co</a>';
const PHONE = '<a href="tel:+18389103147">+1 (838) 910-3147</a>';

/* ---------- about ---------- */

const about: PageContent = {
  key: 'about',
  title: 'About Texas Solutions RCM',
  seoTitle: 'About Texas Solutions RCM | Dental Billing Company',
  metaDescription:
    'Texas Solutions RCM is a dental billing company that works inside your practice software to handle insurance verification, claims, posting, denials and A/R.',
  template: 'default',
  intro:
    'Texas Solutions RCM is the dental billing and revenue cycle division of Texas Solutions. We help dental practices and groups in all 50 states with the insurance and billing work that sits between a completed procedure and a posted payment.',
  body: blocks(
    h2('Who we are'),
    p(
      'Texas Solutions RCM is part of Texas Solutions, a US company with an office at 401 W Kentucky Ave in Midland, Texas. This division does one thing: dental billing and revenue cycle work for dentists, office managers and dental service organizations.'
    ),
    p(
      'Our team works remotely, inside the dental practice management software, clearinghouse and carrier portals your office already uses. You create the user accounts, you decide what each one can do, and every note and posting stays in your system where your front desk and billing staff can see it.'
    ),
    h2('Why we focus on dental'),
    p(
      'Dental insurance works differently from other kinds of health coverage. Plans carry annual maximums, frequency limits on cleanings and x-rays, waiting periods on major work, missing tooth clauses and alternate benefit downgrades. Claims go out on the ADA claim form or as an 837D, often with x-rays, perio charts or narratives attached. Many patients carry PPO, DHMO or Medicaid dental coverage, and some carry two plans at once.'
    ),
    p(
      'A billing team that also handles other kinds of claims has to switch rules all day. We would rather know dental carriers, CDT coding conventions and dental remittances well than know a little about everything.'
    ),
    h2('What we do'),
    p(
      `You can hand us the whole cycle through our ${a('/services/dental-billing/', 'dental billing')} and ${a('/services/revenue-cycle-management/', 'dental revenue cycle management')} services, or pick the areas your team needs help with:`
    ),
    ul([
      `${a('/services/dental-insurance-verification/', 'Insurance Verification & Eligibility')}: benefits breakdowns, deductibles, remaining maximums, frequencies and waiting periods before the appointment.`,
      `${a('/services/dental-claims-processing/', 'Dental Claims Management')}: claim creation, CDT and documentation review, attachments, resubmissions and status checks.`,
      `${a('/services/denial-management/', 'Denial Management & Appeals')}: denial analysis, corrected claims, appeals and fixes for the causes behind repeat denials.`,
      `${a('/services/payment-posting/', 'Payment Posting')}: EOB and ERA posting, adjustments, reconciliation and underpayment checks.`,
      `${a('/services/dental-accounts-receivable/', 'Accounts Receivable (A/R) Management')}: 30, 60 and 90+ day follow-up, carrier calls and portal work, and cleanup of older balances.`,
      `${a('/services/patient-billing/', 'Patient Billing & Collections Support')}: statements, balance reviews and payment allocation.`,
      `${a('/services/dental-credentialing/', 'Dental Credentialing & Provider Enrollment')}: network enrollment, re-credentialing, provider updates and EFT/ERA setup.`,
      `${a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting & Revenue Analysis')}: aging, claim status, denial trends and monthly revenue reports from your own data.`,
    ]),
    h2('Who we serve'),
    p(
      `We work with ${a('/specialties/general-dentistry/', 'general dentistry')} offices and with specialty practices in ${a('/specialties/orthodontics/', 'orthodontics')}, ${a('/specialties/endodontics/', 'endodontics')}, ${a('/specialties/periodontics/', 'periodontics')}, ${a('/specialties/oral-surgery/', 'oral surgery')}, ${a('/specialties/pediatric-dentistry/', 'pediatric dentistry')} and ${a('/specialties/prosthodontics/', 'prosthodontics')}, as well as ${a('/specialties/dental-group-practices/', 'dental group practices')} and DSOs. Our team works remotely, so we can support offices in ${a('/service-areas/', 'every US state')}.`
    ),
    p(
      'We set up our checklists around the software you run, whether that is Dentrix, Open Dental, Eaglesoft or Curve Dental, and around your carrier mix. The same model can fit a single-doctor office that needs help with old claims and a multi-location group that wants a full billing team.'
    ),
    h2('How an engagement starts'),
    ul([
      'A free consultation about your office, your software, your carriers and what is not working today.',
      'With your permission, a review of aging, denials and workflow, under a Business Associate Agreement if patient data is involved.',
      'A written proposal with scope, responsibilities and price.',
      'Daily work in your system and regular reports built from your own data.',
    ]),
    p(
      `The full process is on ${a('/how-we-work/', 'How We Work')}, and our safeguards are on ${a('/security/', 'Security and Privacy')}.`
    ),
    h2('What you will not find here'),
    p(
      'You will not find invented statistics, borrowed logos or promises of fixed outcomes on this site. What a dental office collects depends on its carriers, fee schedules, documentation and patients. We would rather look at your numbers with you and tell you what we think is realistic.'
    ),
    h2('Talk to us'),
    p(
      `The quickest way to see whether we fit your office is a ${a('/consultation/', 'free consultation')}. You can also ${a('/contact/', 'contact us')} with a question. Please do not send patient information through this website.`
    )
  ),
};

/* ---------- how we work ---------- */

const howWeWork: PageContent = {
  key: 'how-we-work',
  title: 'How We Work',
  seoTitle: 'How We Work: Dental Billing Onboarding | Texas Solutions RCM',
  metaDescription:
    'How Texas Solutions RCM works with dental offices: our principles, questions to ask any dental billing company, and each step from consultation to daily work.',
  template: 'default',
  intro:
    'This page explains the principles behind our dental billing work, the questions we think you should ask any billing company, and each step from the first call to daily work in your system. Timelines are agreed in your proposal, because they depend on your office, your carriers and your software.',
  body: blocks(
    h2('The principles we work by'),
    h3('We work inside your dental software'),
    p(
      'Our team works in your practice management system, clearinghouse and carrier portals with named accounts you create. Every claim note, posting and adjustment stays where your staff already look, your data stays under your control, and if the engagement ends there is nothing to move back.'
    ),
    h3('Fix the cause, not only the claim'),
    p(
      `Reworking the same denial every month costs time. When we see a pattern, such as one carrier denying periodontal maintenance for frequency, or crown claims coming back for missing pre-op x-rays, we trace it to where it starts. The fix may be a verification step, a charting habit, an attachment rule or a credentialing record. We explain which and agree who owns the change. This is the core of our ${a('/services/denial-management/', 'Denial Management & Appeals')} work.`
    ),
    h3('Reporting you can check'),
    p(
      `Reports come from your own system exports, with each calculation explained, so you can match any figure to the source. If you want to test the formulas yourself, try our ${a('/tools/net-collection-rate-calculator/', 'net collection rate calculator')} or ${a('/tools/dental-ar-aging-calculator/', 'dental A/R aging calculator')}.`
    ),
    h3('Dental rules, written down'),
    p(
      'Before we start, we document the details that matter for your office: your main carriers and their frequency and attachment rules, how your fee schedules are loaded, how secondary claims are handled, and which procedures need a pre-treatment estimate. Our checklists and queues are built from that list.'
    ),
    h3('Privacy by default'),
    p(
      `We sign a Business Associate Agreement before accessing any patient data, give each team member only the access their tasks need, and keep patient information in your systems rather than in email or spreadsheets. Read more on ${a('/security/', 'Security and Privacy')}.`
    ),
    h3('Honest scoping'),
    p(
      'If your team is doing well and only needs help with insurance verification or older A/R, we will scope just that. We quote in writing after we understand your workflow, and we do not promise results that depend on carriers, documentation and patients we do not control.'
    ),
    h2('What to ask any dental billing company'),
    p(
      'Use these questions when you compare vendors, including us. A good company should answer each one clearly and put the answer in writing.'
    ),
    table(
      ['Question', 'Why it matters', 'How we answer'],
      [
        [
          'Will we need to change our dental software?',
          'Switching from Dentrix, Open Dental, Eaglesoft or Curve Dental is disruptive and can tie you to the vendor.',
          'No. We work inside the software you already use, with accounts you create and control.',
        ],
        [
          'Who owns the data and the user accounts?',
          'If the vendor controls the system, leaving can be slow.',
          'You do. Your administrators can disable our accounts at any time.',
        ],
        [
          'Will you sign a Business Associate Agreement?',
          'HIPAA requires one with vendors that handle patient information for you.',
          'Yes, before we access any patient data.',
        ],
        [
          'How do you handle frequencies, maximums and downgrades?',
          'These are where many dental claims and patient balances go wrong.',
          'We verify them before the visit where the carrier provides them and note them in the patient record.',
        ],
        [
          'Who sends attachments and narratives?',
          'Missing x-rays, perio charts or narratives are a common reason claims stall.',
          'We agree in writing which attachments we send, how, and what we need from your clinical team.',
        ],
        [
          'Can we outsource only part of the work?',
          'You may only need help in one area.',
          'Yes. Each service can be scoped on its own, with written handoffs.',
        ],
        [
          'How is the price set?',
          'Vague pricing leads to surprise invoices.',
          'We quote in writing after a free consultation and workflow review.',
        ],
        [
          'What happens if we end the contract?',
          'Exit terms decide how hard it is to leave.',
          'We follow the notice terms, hand over open work with notes, and return or delete working files under the BAA.',
        ],
        [
          'Do you guarantee results?',
          'No vendor controls carrier behavior or patient mix.',
          'No. We set expectations from your data and report progress honestly.',
        ],
      ]
    ),
    p(
      `For a longer checklist, read ${a('/blog/how-to-choose-a-dental-billing-company/', 'how to choose a dental billing company')}. If you are still deciding whether to outsource at all, see ${a('/blog/in-house-vs-outsourced-dental-billing/', 'in-house vs outsourced dental billing')}.`
    ),
    h2('From first call to daily work'),
    h3('1. Free consultation'),
    p(
      `We talk about your office: number of dentists and hygienists, locations, specialties, software, top carriers and who handles billing today. Above all, we want to know what is not working, whether that is aging claims, slow verifications or staff turnover. You can ${a('/consultation/', 'book a consultation')} online, and no patient information is needed.`
    ),
    h3('2. Workflow review'),
    p(
      'If it looks like a good fit, we ask for read-only access or a set of standard reports, such as insurance aging by carrier, outstanding claims and recent adjustments. A Business Associate Agreement is signed before we look at anything containing patient data. The review shapes the scope and price.'
    ),
    h3('3. Proposal and BAA'),
    p(
      'You receive a written proposal covering the services in scope, what stays with your team, who approves write-offs and patient statements, the price, the reports you will get and the onboarding plan. Work starts only after you accept it and the BAA is in place.'
    ),
    h3('4. Access setup'),
    p(
      'Your administrators create a named user for each team member in your dental software, clearinghouse and carrier portals. We do not share logins, each account gets only the permissions its tasks need, and multi-factor authentication is used wherever your systems support it. We also collect fee schedules, office billing policies and a named contact on your side.'
    ),
    h3('5. Enrollment checks'),
    p(
      `Before claims flow, we confirm that each dentist and location is enrolled with your main carriers under the right tax ID and address, and that electronic claims, ERA and EFT are set up. Gaps are handled through ${a('/services/dental-credentialing/', 'Dental Credentialing & Provider Enrollment')} if it is in scope.`
    ),
    h3('6. Handover plan'),
    p(
      'Where your staff are handing work to us, we agree a cutover point for each area, such as new claims, posting or A/R follow-up. Often both teams work side by side for an agreed period so you can check our work before responsibility moves.'
    ),
    h3('7. Daily work by queue'),
    ul([
      'Insurance verification for upcoming appointments.',
      'Claim creation, attachments and submission after each day of production.',
      'Clearinghouse rejections and carrier requests for information.',
      'EOB and ERA posting, including secondary claims.',
      'Denials, appeals and A/R follow-up by carrier and age.',
      'Patient statements and balance questions, if in scope.',
    ]),
    p('Every account we touch gets a note in your system, so your team can see what was done and why.'),
    h3('8. Reporting and review calls'),
    p(
      `Reports are built from your system exports on the schedule in your proposal and typically cover production, collections, adjustments, A/R aging and denial trends. See ${a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting & Revenue Analysis')}. Your named contact walks through them with you on regular calls and follows up on action items.`
    ),
    h3('9. Offboarding'),
    p(
      'If the engagement ends, we follow the notice terms in your agreement, hand over open work with notes, and return or securely delete working files as set out in the BAA. Your administrators disable our accounts, and we confirm when offboarding is complete.'
    ),
    p(
      `Questions about any step? ${a('/contact/', 'Contact us')} or ${a('/consultation/', 'book a free consultation')}.`
    )
  ),
};

/* ---------- technology ---------- */

const technology: PageContent = {
  key: 'technology',
  title: 'Dental Software and Technology',
  seoTitle: 'Dental Software and Technology | Texas Solutions RCM',
  metaDescription:
    'We work inside Dentrix, Open Dental, Eaglesoft, Curve Dental and your clearinghouse and carrier portals, using 837D claims, 835 ERAs and secure access.',
  template: 'default',
  intro:
    'We do not ask your office to adopt new billing software. Our team works inside the dental practice management system, clearinghouse and carrier portals you already use, with access you control.',
  body: blocks(
    h2('We work inside your dental software'),
    p(
      'Our team signs in to your practice management system with named accounts that your administrator creates. Claims, attachments, notes, postings and adjustments all happen there, so the patient ledger stays complete and your front desk sees the same history we do.'
    ),
    p(
      'The dental systems we commonly see include Dentrix, Open Dental, Eaglesoft and Curve Dental. Each handles insurance plans, fee schedules, claim batches and ERA import in its own way, and we set up our checklists around how your office has configured it. If you run another system, ask us during the consultation.'
    ),
    ul([
      `${a('/services/dentrix-billing-services/', 'Dentrix billing services')}`,
      `${a('/services/open-dental-billing-services/', 'Open Dental billing services')}`,
      `${a('/services/eaglesoft-billing-services/', 'Eaglesoft billing services')}`,
      `${a('/services/curve-dental-billing-services/', 'Curve Dental billing services')}`,
    ]),
    p(
      'We are not a partner, reseller or integration vendor for any of these products. We work in them as a user, through the access you grant. There is no software to install and no data to migrate before we start.'
    ),
    h2('Electronic dental transactions'),
    p(
      'Dental carriers and clearinghouses exchange standard electronic transactions defined by X12. These are the ones that matter most for dental billing:'
    ),
    table(
      ['Transaction', 'What it does', 'Where we use it'],
      [
        [
          '837D',
          'Electronic dental claim, the counterpart of the paper ADA claim form',
          `${a('/services/dental-claims-processing/', 'Dental Claims Management')}, including secondary claims`,
        ],
        [
          '835',
          'Electronic remittance advice (ERA) from the carrier',
          `${a('/services/payment-posting/', 'Payment Posting')} and reconciliation against deposits`,
        ],
        [
          '270/271',
          'Eligibility inquiry and response',
          `${a('/services/dental-insurance-verification/', 'Insurance Verification & Eligibility')}, where the carrier supports it`,
        ],
        [
          '276/277',
          'Claim status inquiry and response',
          `${a('/services/dental-accounts-receivable/', 'A/R follow-up')}, where the carrier supports it`,
        ],
      ]
    ),
    p(
      'Electronic eligibility responses from dental carriers are often limited. They may confirm active coverage without showing frequencies, remaining maximums or waiting periods. When that happens, we check the carrier portal or call the carrier for the missing details.'
    ),
    p(
      'Not every carrier accepts every transaction, and not every carrier sends ERAs. During onboarding we confirm which transactions are set up for each dentist and carrier, including ERA and EFT enrollment.'
    ),
    h2('Clearinghouses and attachments'),
    p(
      'We work with the clearinghouse connected to your practice management system. That includes reviewing rejection reports, fixing claims that fail front-end edits and following claims through to the carrier.'
    ),
    p(
      'Many dental claims need supporting documents, such as periapical or bitewing x-rays, intraoral photos, perio charts and narratives. Depending on your setup, attachments travel through your clearinghouse attachment service, through the carrier portal, or by mail when the carrier requires it. We agree with your team which attachments we send and what your clinical staff provide.'
    ),
    h2('Carrier web portals'),
    p(
      `Most dental carriers run provider portals for benefits, claim status, appeals and remittance copies. Our team uses portal accounts registered for your practice under each carrier's rules. See our ${a('/carriers/', 'carrier guides')} for notes on major dental carriers.`
    ),
    h2('Secure access'),
    p(
      `Every team member uses their own account, with only the permissions their tasks need and multi-factor authentication wherever your systems support it. When files must be exchanged, such as fee schedules or report exports, we agree a secure method with you under the Business Associate Agreement. We do not move patient information over ordinary email, chat or this website. Read more on ${a('/security/', 'Security and Privacy')}.`
    ),
    h2('Reporting from your exports'),
    p(
      `Our reports are built from standard reports in your own software, such as insurance aging, production and collections, and adjustment reports, so every figure can be traced to the source. Learn more about ${a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting & Revenue Analysis')}.`
    ),
    h2('Trademarks'),
    p(
      'Dentrix, Open Dental, Eaglesoft, Curve Dental and other product and carrier names are trademarks of their respective owners. Texas Solutions is not affiliated with, endorsed by or sponsored by any of them.'
    ),
    p(
      `Have a question about your setup? ${a('/contact/', 'Contact us')} or ${a('/consultation/', 'book a free consultation')}.`
    )
  ),
};

/* ---------- security ---------- */

const security: PageContent = {
  key: 'security',
  title: 'Security and Privacy',
  seoTitle: 'Security and Privacy | Texas Solutions RCM',
  metaDescription:
    'How our dental billing team protects patient data: a BAA before access, named least-privilege accounts, MFA where supported, and what this website collects.',
  template: 'default',
  intro:
    'Dental billing means handling patient information every day. This page explains how we protect it during an engagement, what our obligations are, and what this website itself collects.',
  body: blocks(
    h2('Our role under HIPAA'),
    p(
      'Your dental practice is a covered entity under HIPAA. When we verify insurance, submit claims, post payments or follow up on balances for you, we work with protected health information on your behalf, which makes us a business associate. Business associates have their own direct obligations under the HIPAA Security Rule and parts of the Privacy and Breach Notification Rules.'
    ),
    h2('A Business Associate Agreement comes first'),
    p(
      'We sign a Business Associate Agreement (BAA) with your practice before accessing any patient data. That includes the workflow review before a proposal. The BAA sets out how patient information may be used and disclosed, the safeguards we maintain, how incidents are reported and what happens to data when the engagement ends.'
    ),
    h2('Access you control'),
    ul([
      '<strong>Named accounts.</strong> Each team member uses their own account in your dental software, clearinghouse and carrier portals. We do not share logins.',
      '<strong>Least privilege.</strong> Accounts get only the permissions their tasks need. A team member who posts payments does not need to change fee schedules, and we ask you to adjust access when scope changes.',
      '<strong>Multi-factor authentication.</strong> We use MFA wherever your systems and carrier portals support it.',
      '<strong>Revocable at any time.</strong> Your administrators can disable our accounts immediately, without needing anything from us.',
    ]),
    h2('Patient information stays in your systems'),
    p(
      'We work in your practice management system, clearinghouse and carrier portals rather than copying patient data into our own tools. Ledgers, claim notes and attachments stay where your staff can see them.'
    ),
    p(
      'We do not send patient information by ordinary email or chat, and never through this website. When a file must be exchanged, such as a report export or a carrier letter, we agree a secure method with you under the BAA.'
    ),
    h2('Devices and internal policies'),
    p('Our policies require team members to:'),
    ul([
      'Use work devices protected with screen locks, current updates and security software.',
      'Access client systems only for assigned work and only from approved setups.',
      'Keep patient information out of personal email, messaging apps, notes and downloads.',
      'Complete privacy and security training and report suspected incidents right away.',
      'Lose access promptly when they change roles or leave.',
    ]),
    p(
      'We describe these policies in general terms here. Specific controls for your engagement can be discussed during onboarding and set out in your agreement.'
    ),
    h2('Breach notification duties'),
    p(
      'If we discover that patient information may have been used or disclosed in a way the BAA does not allow, we notify your practice without unreasonable delay and within the time set in the BAA, which cannot be later than the 60-day outer limit in the HIPAA Breach Notification Rule. We share what we know about the incident and the patients involved so your practice can meet its own duties to notify patients and regulators.'
    ),
    h2('What we ask of your practice'),
    p(
      'Security is shared. Your practice controls the systems we work in, so we ask your administrators to create a separate user for each of our team members, turn on multi-factor authentication where your software and carrier portals offer it, review our access when the scope changes, and tell us promptly if a carrier or vendor reports a problem that could affect our accounts. If your office has its own security policies, such as approved file-sharing tools or password rules, we follow them inside your systems.'
    ),
    h2('At the end of an engagement'),
    p(
      `We hand over open work with notes, ask you to disable our accounts, and return or securely delete any working files as set out in the BAA. See the offboarding step in ${a('/how-we-work/', 'How We Work')}.`
    ),
    h2('What this website collects'),
    p(
      'This website is for business enquiries from dental practices and groups. It is not meant for patients and must not be used to send patient information. It handles business data such as names, business emails and practice details; patient information is only ever accessed inside client systems under a BAA.'
    ),
    h3('Forms'),
    p(
      `Contact and consultation forms collect business contact details and details about your practice. Submissions are stored in the site's database on WordPress hosting provided by DreamHost in the United States and emailed to our team. Retention periods are in our ${a('/privacy-policy/', 'Privacy Policy')}.`
    ),
    h3('AI assistant'),
    p(
      "The AI assistant asks for your name and business email before you chat. Messages are processed by Google's Gemini API to generate answers, and transcripts are stored for our team. A filter withholds messages that look like patient information so they are not sent to the AI service. If patient information is submitted by mistake, we delete it when we become aware of it."
    ),
    h3('Calculators'),
    p('Our dental calculators run in your browser. Inputs are only sent if you choose to share the results with us.'),
    h3('Analytics'),
    p(
      `We count page views with first-party analytics that do not use cookies and never receive form contents or chat text. Google Analytics loads only if you accept analytics cookies. See our ${a('/cookie-policy/', 'Cookie Policy')}.`
    ),
    h3('Site access and logs'),
    p(
      'The site dashboard uses role-based access, two-factor authentication is available for administrators, failed logins are throttled, and meaningful admin actions such as viewing or exporting leads are recorded in an audit log. The site is backed up regularly so it can be restored after a failure.'
    ),
    h2('What we do not claim'),
    p(
      'We do not use certification badges or blanket compliance claims. HIPAA does not certify vendors, and every covered entity and business associate has its own obligations. We describe what we actually do and put the commitments that matter in your BAA and service agreement.'
    ),
    h2('Report a security concern'),
    p(
      `To report a suspected security issue, email ${EMAIL} with "Security" in the subject line or call ${PHONE}. Please do not include patient information in your report.`
    )
  ),
};

/* ---------- faq, contact, consultation ---------- */

const faq: PageContent = {
  key: 'faq',
  title: 'Frequently Asked Questions',
  seoTitle: 'Dental Billing FAQs | Texas Solutions RCM',
  metaDescription:
    'Answers to common questions about outsourcing dental billing to Texas Solutions RCM: scope, onboarding, dental software, patient data and free tools.',
  template: 'faq',
  intro:
    'Answers to the questions dentists, office managers and DSOs ask most about outsourcing dental billing to us, getting started, patient data and our free tools.',
  body: blocks(
    p(
      `If your question is not answered here, ${a('/contact/', 'send us a message')} or ${a('/consultation/', 'book a free consultation')}. Please do not include patient information.`
    )
  ),
};

const contact: PageContent = {
  key: 'contact',
  title: 'Contact Us',
  seoTitle: 'Contact Texas Solutions RCM | Dental Billing',
  metaDescription:
    'Contact Texas Solutions RCM about dental insurance verification, claims, A/R or credentialing. Email info@texassolutions.co or call +1 (838) 910-3147.',
  template: 'contact',
  intro:
    'Have a question about dental insurance verification, claims, A/R or credentialing, or want to talk about working together? Send us a message and our team will get back to you.',
  body: blocks(
    p(
      `Use the form to send a business enquiry, or reach us by email at ${EMAIL} or by phone at ${PHONE}. Our US office is at 401 W Kentucky Ave, Midland, TX 79701, and we support dental offices in every state.`
    ),
    p(
      `If you want to talk through your office in detail, ${a('/consultation/', 'book a free consultation')}.`
    ),
    p(
      'Please do not include patient names, dates of birth, subscriber IDs or any other patient information in your message. This form is for business enquiries only.'
    )
  ),
};

const consultation: PageContent = {
  key: 'consultation',
  title: 'Book a Free Consultation',
  seoTitle: 'Free Dental Billing Consultation | Texas Solutions RCM',
  metaDescription:
    'Book a free consultation about your dental billing: insurance verification, claims, denials, A/R or credentialing. See what we cover and what to prepare.',
  template: 'consultation',
  intro:
    'A free, no-obligation conversation about your dental office and its billing. Tell us when suits you, and we will confirm a time.',
  body: blocks(
    h2('What happens on the call'),
    ul([
      'We learn about your office: dentists, hygienists, locations, specialties, carriers and software.',
      'You tell us what is not working, such as aging claims, slow verifications, denials or staffing gaps.',
      'We explain which services might fit and what we would need to review.',
      'We answer your questions about how we work, security and pricing.',
    ]),
    h2('What to prepare'),
    ul([
      'Your practice management software and clearinghouse.',
      'Your top dental carriers and whether you are in network with PPO, DHMO or Medicaid plans.',
      'Rough monthly claim volume and who handles billing today.',
      `Any summary figures you track, such as insurance A/R over 90 days. Our ${a('/tools/dental-ar-aging-calculator/', 'dental A/R aging calculator')} can help.`,
    ]),
    h2('After the call'),
    p(
      `If it looks like a good fit, we may ask for read-only access or a few reports under a Business Associate Agreement, then send a written proposal. See ${a('/how-we-work/', 'How We Work')}. Please do not share patient information in the booking form or on the call.`
    )
  ),
};

export const dentalPageOverrides: PageContent[] = [about, howWeWork, technology, security, faq, contact, consultation];
