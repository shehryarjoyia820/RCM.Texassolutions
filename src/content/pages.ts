/**
 * Company, conversion, comparison and legal pages for Texas Solutions RCM.
 *
 * Bodies are WordPress block markup; the importer inserts them as post_content.
 * Follow docs/CONTENT-GUIDE.md: no invented results, prices, certifications,
 * turnaround times, client names or "HIPAA compliant" claims. Legal pages must
 * describe only what the website actually does.
 */

export interface PageContent {
  key: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  template:
    | 'default'
    | 'contact'
    | 'consultation'
    | 'proposal'
    | 'careers'
    | 'partners'
    | 'faq'
    | 'resources'
    | 'legal'
    | 'comparison';
  intro: string;
  body: string;
  parent?: string;
  lastUpdated?: string;
}

/* ---------- block markup helpers ---------- */

const h2 = (t: string): string =>
  `<!-- wp:heading -->\n<h2 class="wp-block-heading">${t}</h2>\n<!-- /wp:heading -->`;

const h3 = (t: string): string =>
  `<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">${t}</h3>\n<!-- /wp:heading -->`;

const p = (t: string): string => `<!-- wp:paragraph -->\n<p>${t}</p>\n<!-- /wp:paragraph -->`;

const li = (items: string[]): string =>
  items.map((i) => `<!-- wp:list-item -->\n<li>${i}</li>\n<!-- /wp:list-item -->`).join('\n');

const ul = (items: string[]): string =>
  `<!-- wp:list -->\n<ul class="wp-block-list">${li(items)}</ul>\n<!-- /wp:list -->`;

const ol = (items: string[]): string =>
  `<!-- wp:list {"ordered":true} -->\n<ol class="wp-block-list">${li(items)}</ol>\n<!-- /wp:list -->`;

const table = (head: string[], rows: string[][]): string =>
  `<!-- wp:table -->\n<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr>${head
    .map((c) => `<th>${c}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></figure>\n<!-- /wp:table -->`;

const a = (href: string, text: string): string => `<a href="${href}">${text}</a>`;

const blocks = (...b: string[]): string => b.join('\n\n');

const LEGAL_DATE = '2026-10-12';
const EMAIL = '<a href="mailto:info@texassolutions.co">info@texassolutions.co</a>';
const PHONE = '<a href="tel:+18389103147">+1 (838) 910-3147</a>';
const ADDRESS = 'Texas Solutions, 401 W Kentucky Ave, Midland, TX 79701';

/* ---------- company pages ---------- */

const about: PageContent = {
  key: 'about',
  title: 'About Texas Solutions RCM',
  seoTitle: 'About Texas Solutions RCM | Medical and Dental Billing',
  metaDescription:
    'Texas Solutions RCM is the revenue cycle management division of Texas Solutions, supporting US medical and dental practices with billing, coding and AR work.',
  template: 'default',
  intro:
    'Texas Solutions RCM is the healthcare revenue cycle management division of Texas Solutions. We help US medical and dental practices with the administrative work of getting paid, from insurance checks to the last open balance.',
  body: blocks(
    h2('Who we are'),
    p(
      'Texas Solutions RCM is part of Texas Solutions, a US company with an office at 401 W Kentucky Ave in Midland, Texas. This division focuses on one thing: the billing and revenue cycle work that sits between a patient visit and a payment in your bank account.'
    ),
    p(
      'Our team works remotely, inside the practice management system, EHR, clearinghouse and payer portals your practice already uses. You create the accounts, you control the access, and the work stays in your systems where your staff can see it.'
    ),
    h2('What we do'),
    p(
      'We can run your full revenue cycle or take on the parts your staff do not have time for. Common areas include:'
    ),
    ul([
      `${a('/services/revenue-cycle-management/', 'End-to-end revenue cycle management')} for practices that want one team responsible for the whole cycle.`,
      `${a('/services/medical-billing/', 'Medical billing')} and ${a('/services/dental-billing/', 'dental billing')}, including charge entry, claim submission and payment posting.`,
      `${a('/services/medical-coding/', 'Medical coding')} and ${a('/services/coding-audit/', 'coding audits')} based on your providers' documentation.`,
      `${a('/services/insurance-eligibility-verification/', 'Eligibility')} and ${a('/services/benefits-verification/', 'benefits verification')}, plus ${a('/services/prior-authorization/', 'prior authorization support')}.`,
      `${a('/services/denial-management/', 'Denial management')} and ${a('/services/accounts-receivable-management/', 'AR follow-up')}, including older claims that have been sitting unworked.`,
      `${a('/services/medical-credentialing/', 'Credentialing')} and ${a('/services/provider-enrollment/', 'provider enrollment')} with commercial and government payers.`,
      `${a('/services/rcm-analytics-reporting/', 'Reporting')} and ${a('/services/revenue-cycle-audit/', 'revenue cycle audits')} built from your own system data.`,
    ]),
    h2('Who we serve'),
    p(
      'We work with independent practices and groups across the United States, both medical and dental. Each specialty has its own payer rules, codes and documentation habits, and our workflows are set up around those details. You can read how billing differs for practices such as ' +
        `${a('/specialties/family-medicine/', 'family medicine')}, ${a('/specialties/behavioral-health/', 'behavioral health')}, ${a('/specialties/physical-therapy/', 'physical therapy')}, ${a('/specialties/general-dentistry/', 'general dentistry')} and ${a('/specialties/orthodontics/', 'orthodontics')}, or for ${a('/specialties/multi-specialty/', 'multi-specialty groups')}.`
    ),
    p(
      'Because we work in your systems and agree the scope in writing, the same model can fit a solo provider who needs help with denials and a group that wants a full billing team.'
    ),
    h2('How we work, at a glance'),
    ul([
      'We start with a free consultation to understand your practice, your systems and the problems you want solved.',
      'With your permission, we review your current aging, denials and workflow, usually with read-only access or a set of reports.',
      'You receive a written proposal with scope, responsibilities and price. A Business Associate Agreement is signed before we access any patient data.',
      'Our team works daily queues in your systems, and you get regular reporting built from your own data on a schedule agreed in the proposal.',
      'You can review, adjust or end the arrangement under the terms in your agreement, and your administrators can disable our accounts at any time.',
    ]),
    p(
      `Read more about ${a('/approach/', 'our approach')}, the step-by-step ${a('/how-we-work/', 'onboarding and working process')}, and how we handle ${a('/security/', 'security and privacy')}.`
    ),
    h2('What we will not tell you'),
    p(
      'You will not find invented statistics, borrowed logos or promises of fixed outcomes on this site. Revenue cycle outcomes depend on your payers, your documentation, your patients and your starting point. We would rather look at your data with you and explain what we think is realistic.'
    ),
    h2('Talk to us'),
    p(
      `The quickest way to see whether we are a good fit is a ${a('/consultation/', 'free consultation')}. If you already know what you need, you can ${a('/proposal/', 'request a proposal')} or ${a('/contact/', 'contact us')} with a question. Please do not send patient information through this website.`
    )
  ),
};

const approach: PageContent = {
  key: 'approach',
  title: 'Our Approach',
  seoTitle: 'Our Approach to Revenue Cycle Management | Texas Solutions',
  metaDescription:
    'How Texas Solutions RCM works: inside your systems, fixing root causes, transparent reporting, specialty-aware workflows, privacy and honest scoping.',
  template: 'default',
  intro:
    'Good revenue cycle work is mostly careful, repeatable habits. These are the principles we follow on every account, whatever the size of the practice or the scope of the work.',
  body: blocks(
    h2('1. We work inside your systems'),
    p(
      'Our team works in your practice management system, EHR, clearinghouse and payer portals using named accounts that you create. We do not move your billing into a separate platform you cannot see.'
    ),
    p(
      'This matters for three reasons. Your staff can see every note, claim and adjustment we make. Your data stays where it already lives, under your control. And if you ever end the engagement, there is nothing to migrate back, because the work never left.'
    ),
    h2('2. Root cause over rework'),
    p(
      'Reworking the same denial every month is expensive. When we see a pattern, such as a payer rejecting claims for a missing modifier or eligibility problems from one front desk workflow, we trace it back to where it starts and propose a fix.'
    ),
    p(
      `Sometimes the fix is in our own process. Sometimes it is a registration step, a template in your EHR, a charge master entry or a payer enrollment record. We tell you which, explain why, and agree who owns the change. Our ${a('/services/denial-management/', 'denial management')} and ${a('/services/rcm-workflow-optimization/', 'workflow optimization')} work is built around this habit.`
    ),
    h2('3. Transparent reporting from your data'),
    p(
      'Reports are built from exports of your own systems, so you can check every number against the source. We explain how each metric is calculated, such as which adjustments are included in a net collection rate or how days in AR are counted, so trends are meaningful and comparable over time.'
    ),
    p(
      `The reporting set and schedule are agreed in your proposal. If you want to check the formulas yourself, our free tools include a ${a('/tools/net-collection-rate-calculator/', 'net collection rate calculator')} and a ${a('/tools/days-in-ar-calculator/', 'days in AR calculator')}.`
    ),
    h2('4. Specialty-aware workflows'),
    p(
      'A physical therapy practice tracks visit limits and plan of care requirements. A dental office deals with frequency limits, annual maximums and narratives. A behavioral health group manages authorizations and session-based billing. Generic workflows miss these details.'
    ),
    p(
      'Before we start, we document the payer rules, code sets, modifiers and documentation requirements that matter most for your specialty and your payer mix, and we build checklists and queues around them.'
    ),
    h2('5. Privacy by default'),
    p(
      'We sign a Business Associate Agreement before accessing any patient data. Each team member gets only the access their tasks need. Patient information stays in your systems rather than in email, chat or spreadsheets on personal devices.'
    ),
    p(
      `This website follows the same rule: its forms and AI assistant are for business enquiries only and must not be used for patient information. Read more on our ${a('/security/', 'security and privacy')} page.`
    ),
    h2('6. Honest scoping'),
    p(
      'We would rather tell you that a service is not a good fit than sell you something you do not need. If your in-house team is doing well and only needs help with old AR or credentialing, we will scope just that.'
    ),
    p(
      'We quote in writing after we understand your workflow, and we do not promise results we cannot control. Payer behavior, documentation quality and patient mix all affect outcomes, so we set expectations based on what we see in your data.'
    ),
    h2('What this looks like day to day'),
    ul([
      'Work queues organized by task and payer, with notes left in your system on every account touched.',
      'Clear handoffs between your staff and ours, written down so nothing falls between teams.',
      'A named point of contact for questions, approvals and escalations.',
      'Regular review calls where we walk through trends, open issues and proposed fixes.',
    ]),
    p(
      `See the full ${a('/how-we-work/', 'onboarding and working process')}, or ${a('/consultation/', 'book a free consultation')} to talk through your practice.`
    )
  ),
};

const howWeWork: PageContent = {
  key: 'how-we-work',
  title: 'How We Work',
  seoTitle: 'How We Work: Onboarding and Operations | Texas Solutions RCM',
  metaDescription:
    'From first call to daily operations: how Texas Solutions RCM reviews your workflow, signs a BAA, sets up access, plans the handover and reports on the work.',
  template: 'default',
  intro:
    'Every engagement follows the same sequence, from a free consultation to daily work in your systems. Timelines for each step are agreed in the proposal, because they depend on your practice, your payers and your systems.',
  body: blocks(
    h2('1. Free consultation'),
    p(
      'We start with a conversation about your practice: specialty, providers, locations, payer mix, the systems you use and who does billing today. Most of all, we want to understand what is not working, whether that is rising denials, an aging AR backlog, staff turnover or a credentialing delay.'
    ),
    p(`You can ${a('/consultation/', 'book a consultation')} online. No patient information is needed for this call.`),
    h2('2. Review of your current workflow'),
    p(
      'If it looks like a good fit, we ask for read-only access to your practice management system or a set of standard reports, such as AR aging by payer, denial summaries and payment trends. A Business Associate Agreement is signed before we look at anything that contains patient data.'
    ),
    p(
      'The review is designed to find where revenue is getting stuck and how much work the account involves. It shapes the scope and price, so the proposal reflects your real situation rather than a generic estimate.'
    ),
    h2('3. Proposal and Business Associate Agreement'),
    p('You receive a written proposal that covers:'),
    ul([
      'The services in scope and what stays with your staff.',
      'Responsibilities on each side, including who approves write-offs, adjustments and patient statements.',
      'Price and billing terms.',
      'The reports you will receive and how often.',
      'The onboarding plan and the timelines we agree together.',
    ]),
    p('Work begins only after you accept the proposal and the Business Associate Agreement is in place.'),
    h2('4. Access setup with named accounts'),
    p(
      'Your administrators create a named account for each team member in your PM/EHR, clearinghouse and payer portals. We do not share logins. Each account gets only the permissions its tasks require, and multi-factor authentication is used wherever your systems support it.'
    ),
    p(
      'We also collect what the team needs to work accurately: fee schedules, payer contracts if available, existing billing policies, and a named contact on your side for questions.'
    ),
    h2('5. Payer enrollment checks'),
    p(
      `Before claims flow, we confirm that each provider and location is enrolled correctly with your main payers, that EDI and ERA enrollment is in place with your clearinghouse, and that electronic funds transfer details are current. Gaps found here are handled through our ${a('/services/provider-enrollment/', 'provider enrollment')} and ${a('/services/clearinghouse-coordination/', 'clearinghouse coordination')} work if they are in scope.`
    ),
    h2('6. Parallel run and handover plan'),
    p(
      'Where your staff are handing work to us, we agree a handover plan. Often there is a parallel period where both teams work side by side, so we can learn your workflows and you can check our work before responsibility moves fully. The length of this period is agreed in the proposal.'
    ),
    p(
      'The handover plan sets a clear cutover point for each area, such as new claims, payment posting or AR follow-up, so there is never a question about who owns an account.'
    ),
    h2('7. Daily operations by queue'),
    p('Once live, the team works organized queues inside your systems, for example:'),
    ul([
      'Eligibility and benefits checks for upcoming appointments.',
      'Charge review, coding and claim submission.',
      'Clearinghouse rejections and payer edits.',
      'ERA and manual payment posting.',
      'Denials, appeals and AR follow-up by payer and age.',
      'Patient balance questions and statements, if in scope.',
    ]),
    p('Every account we touch gets a note in your system, so your staff can see what was done and why.'),
    h2('8. Reporting cadence'),
    p(
      `Reports are built from your own system exports, on the schedule agreed in your proposal. They typically cover charges, payments, adjustments, AR aging, denial trends and open issues. See ${a('/services/rcm-analytics-reporting/', 'analytics and reporting')} for what we can include.`
    ),
    h2('9. Review calls'),
    p(
      'We hold regular review calls with your practice to walk through the reports, discuss trends, agree fixes for recurring problems and adjust priorities. Your named point of contact joins every call and follows up on action items.'
    ),
    h2('10. Offboarding and return of data'),
    p(
      'If the engagement ends, we follow the notice terms in your agreement, hand over open work with notes, and return or securely delete any working files as set out in the Business Associate Agreement. Because we worked in your systems, your data and history are already where they belong. Your administrators disable our accounts, and we confirm when offboarding is complete.'
    ),
    p(`Questions about any step? ${a('/contact/', 'Contact us')} or read ${a('/security/', 'how we handle security and privacy')}.`)
  ),
};

const whyChooseUs: PageContent = {
  key: 'why-choose-us',
  title: 'Why Choose Texas Solutions RCM',
  seoTitle: 'Why Choose Texas Solutions RCM | Honest Medical Billing Help',
  metaDescription:
    'What sets Texas Solutions RCM apart, plus the questions to ask any billing company before you sign, and how we answer each one in writing.',
  template: 'default',
  intro:
    'Choosing a billing partner is a big decision, and most websites make the same claims. Here is what we actually do differently, and the questions we think you should ask any billing company, including us.',
  body: blocks(
    h2('What we offer'),
    h3('You keep your systems and your data'),
    p(
      'We work inside your practice management system, EHR, clearinghouse and payer portals. You do not have to change software, and every claim, note and adjustment is visible to your staff.'
    ),
    h3('Scope that fits your practice'),
    p(
      `You can outsource the full revenue cycle or one area, such as ${a('/services/aging-ar-follow-up/', 'aging AR follow-up')}, ${a('/services/denial-management/', 'denials')} or ${a('/services/medical-credentialing/', 'credentialing')}. The proposal spells out what we do and what your team keeps.`
    ),
    h3('Pricing in writing, after we understand the work'),
    p(
      'We do not publish a one-size price, because specialty, volume and scope change the work too much. After a free consultation and a review of your workflow, you get a written quote before anything starts.'
    ),
    h3('Reporting you can check'),
    p(
      'Our reports come from your own system data, with the calculation explained, so you can verify any number against the source.'
    ),
    h3('No inflated promises'),
    p(
      'We do not publish outcome promises or borrowed statistics. We will look at your data with you and tell you honestly what we think is possible.'
    ),
    h2('What to ask any billing company'),
    p(
      'Use these questions when you compare vendors. A good company should be able to answer each one clearly and put the answer in writing.'
    ),
    table(
      ['Question', 'Why it matters', 'How we answer'],
      [
        [
          'Will we need to change our PM or EHR software?',
          'Switching systems is disruptive and can lock you into the vendor.',
          'No. We work inside the systems you already use, with accounts you create and control.',
        ],
        [
          'Who owns the data and the system accounts?',
          'If the vendor controls the system, leaving can be slow and costly.',
          'You do. Our team uses named accounts in your systems, and your administrators can disable them at any time.',
        ],
        [
          'Will you sign a Business Associate Agreement?',
          'HIPAA requires a BAA with vendors that handle protected health information on your behalf.',
          'Yes. We sign a BAA before accessing any patient data.',
        ],
        [
          'How is the price set, and is it in writing?',
          'Vague pricing leads to surprise invoices.',
          'We quote in writing after a free consultation and workflow review. Nothing starts until you accept.',
        ],
        [
          'Can we outsource only part of our billing?',
          'You may only need help in one area.',
          'Yes. Each service can be scoped on its own, with written handoffs between your team and ours.',
        ],
        [
          'What reports will we get, and how are they calculated?',
          'Metrics like collection rate can be calculated in ways that flatter the vendor.',
          'The reporting set and schedule are agreed in the proposal, built from your system exports, with formulas explained.',
        ],
        [
          'Who will we talk to day to day?',
          'Without a clear contact, questions get lost.',
          'You get a named point of contact who joins your review calls and handles escalations.',
        ],
        [
          'What happens if we end the contract?',
          'Exit terms decide how painful it is to leave.',
          'We follow the notice terms in your agreement, hand over open work with notes, and return or delete working files under the BAA.',
        ],
        [
          'Do you guarantee results?',
          'Outcomes depend on payers, documentation and patient mix, which no vendor fully controls.',
          'No. We set expectations from your data and report on progress honestly.',
        ],
        [
          'Can you share client references or case studies?',
          'References help you check claims.',
          'We do not publish client names on this site. Ask us during the consultation about what we can share.',
        ],
      ]
    ),
    h2('When we may not be the right fit'),
    p(
      'If you want a vendor to take over your systems entirely, or you need a specific result promised in the contract, we are probably not the right choice. We are a good fit for practices that want a capable team working transparently in their own systems.'
    ),
    h2('Compare your options'),
    p(
      `Still deciding whether to outsource at all? Read our ${a('/outsourcing-vs-in-house-billing/', 'outsourcing vs in-house billing comparison')} or try the ${a('/tools/outsourcing-vs-in-house-billing-calculator/', 'outsourcing vs in-house calculator')}. When you are ready, ${a('/consultation/', 'book a free consultation')}.`
    )
  ),
};

const technology: PageContent = {
  key: 'technology',
  title: 'Technology and Integrations',
  seoTitle: 'Technology and Integrations | Texas Solutions RCM',
  metaDescription:
    'How we work with your PM/EHR, clearinghouse and payer portals using standard X12 transactions, secure file exchange and reporting from your own data.',
  template: 'default',
  intro:
    'We do not ask you to adopt new billing software. Our team works in the systems you already use and relies on the standard electronic transactions that US payers and clearinghouses support.',
  body: blocks(
    h2('Working inside your systems'),
    p(
      'Our team logs in to your practice management system, EHR, clearinghouse and payer portals with named accounts you create. All claim activity, notes and adjustments happen there, so your records stay complete and your staff can see the work.'
    ),
    p(
      'Because we adapt to your setup, there is no software to install and no data to migrate before we start. If you are planning to change systems anyway, our ' +
        `${a('/services/billing-software-migration/', 'billing software migration')} and ${a('/services/ehr-workflow-support/', 'EHR workflow support')} services can help with the billing side of the move.`
    ),
    h2('Standard electronic transactions'),
    p(
      'HIPAA requires health plans and clearinghouses to support a set of standard electronic transactions defined by X12. We work with these through your clearinghouse and payer portals:'
    ),
    table(
      ['Transaction', 'What it does', 'Where we use it'],
      [
        ['837P', 'Professional claim (the electronic version of the CMS-1500)', `${a('/services/claims-submission/', 'Claims submission')} for physician and other professional services`],
        ['837I', 'Institutional claim (the electronic version of the UB-04)', 'Claims for facilities such as ambulatory surgery centers and home health agencies'],
        ['837D', 'Dental claim', `${a('/services/dental-billing/', 'Dental billing')}, with attachments sent through the payer or clearinghouse process`],
        ['835', 'Electronic remittance advice (ERA)', `${a('/services/era-processing/', 'ERA processing')} and ${a('/services/payment-posting/', 'payment posting')}`],
        ['270/271', 'Eligibility inquiry and response', `${a('/services/insurance-eligibility-verification/', 'Eligibility verification')} before visits`],
        ['276/277', 'Claim status inquiry and response', `${a('/services/accounts-receivable-management/', 'AR follow-up')} on open claims`],
        ['278', 'Request for review and response (prior authorization)', `${a('/services/prior-authorization/', 'Prior authorization')} where the payer supports it; many payers still use portals, fax or phone`],
      ]
    ),
    p(
      'Support for each transaction depends on your clearinghouse and your payers. During onboarding we confirm which transactions are enrolled for each provider and payer, including ERA and electronic funds transfer enrollment.'
    ),
    h2('Clearinghouses and payer portals'),
    p(
      `We work with the clearinghouse connected to your practice management system. That includes reviewing rejection reports, fixing claims that fail front-end edits and keeping payer enrollment current. See ${a('/services/clearinghouse-coordination/', 'clearinghouse coordination')} and ${a('/services/claims-scrubbing/', 'claims scrubbing')} for details.`
    ),
    p(
      'For payers that require portal work, such as some appeals, attachments or authorizations, our team uses portal accounts registered for your practice according to each payer\'s rules.'
    ),
    h2('No named vendor partnerships'),
    p(
      'We do not claim partnerships or certified integrations with any software vendor. Our model is to work in whatever system you use, through the access you grant. When we have an approved list of systems and integrations to publish, it will appear on this site.'
    ),
    h2('Secure file exchange'),
    p(
      'Some work needs files, such as fee schedules, payer contracts or report exports. We agree a secure exchange method with you during onboarding, covered by the Business Associate Agreement. We do not use ordinary email, chat or this website to move patient information.'
    ),
    h2('Reporting from your exports'),
    p(
      `Our reports are built from standard exports of your own systems, such as aging, transaction and denial reports. That keeps the numbers traceable to the source. Learn more about ${a('/services/rcm-analytics-reporting/', 'RCM analytics and reporting')}.`
    ),
    h2('Free tools on this site'),
    p(
      `Our ${a('/resources/', 'resources')} include calculators that run in your browser, and lookups such as the ${a('/tools/icd-10-code-search/', 'ICD-10 code search')} and ${a('/tools/npi-lookup/', 'NPI lookup')} that query public US government data sources.`
    ),
    p(`Have a question about your setup? ${a('/contact/', 'Contact us')} or ${a('/consultation/', 'book a free consultation')}.`)
  ),
};

const security: PageContent = {
  key: 'security',
  title: 'Security and Privacy',
  seoTitle: 'Security and Privacy | Texas Solutions RCM',
  metaDescription:
    'How we protect practice and patient data: a BAA before access, named least-privilege accounts, MFA where supported and no PHI over email or chat.',
  template: 'default',
  intro:
    'Revenue cycle work means handling sensitive information. This page explains, in plain terms, how we protect your practice and patient data during an engagement and what this website itself collects.',
  body: blocks(
    h2('A Business Associate Agreement comes first'),
    p(
      'We sign a Business Associate Agreement (BAA) with your practice before accessing any protected health information. The BAA sets out how patient data may be used, how it is safeguarded, how incidents are reported and what happens to data when the engagement ends.'
    ),
    h2('Access you control'),
    ul([
      '<strong>Named accounts.</strong> Each team member uses their own account in your systems. We do not share logins.',
      '<strong>Least privilege.</strong> Accounts get only the permissions their tasks require, and we ask you to adjust access as scope changes.',
      '<strong>Multi-factor authentication.</strong> We use MFA wherever your PM/EHR, clearinghouse and payer portals support it.',
      '<strong>Revocable at any time.</strong> Your administrators can disable our accounts immediately, without needing anything from us.',
    ]),
    h2('Patient data stays in your systems'),
    p(
      'We work in your practice management system, EHR, clearinghouse and payer portals rather than copying patient data into our own tools. Notes and activity are recorded where your staff can see them.'
    ),
    p(
      'We do not send patient information over ordinary email, chat or this website. When a file exchange is needed, such as a report export, we agree a secure method with you under the BAA.'
    ),
    h2('Our internal policies'),
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
    h2('Incidents'),
    p(
      'If we suspect that patient data has been accessed or disclosed improperly, we follow the notification terms in your Business Associate Agreement so your practice can meet its own obligations.'
    ),
    h2('At the end of an engagement'),
    p(
      `We hand over open work, ask you to disable our accounts and return or securely delete any working files as set out in the BAA. See the offboarding step in ${a('/how-we-work/', 'How We Work')}.`
    ),
    h2('What this website collects'),
    p(
      'This website is for business enquiries from practices and partners. It is not intended for patients and must not be used to send patient information.'
    ),
    ul([
      '<strong>Forms</strong> collect business contact details and details about your practice, stored in our site database and emailed to our team.',
      '<strong>The AI assistant</strong> asks for your name and business email before you chat. Messages are processed by Google\'s Gemini API to generate answers, and transcripts are stored for our team. A filter withholds messages that look like patient information.',
      '<strong>Calculators</strong> run in your browser. Inputs are only sent if you choose to discuss the results with us.',
      '<strong>Analytics</strong> uses first-party page-view counting without cookies, and Google Analytics only if you accept analytics cookies.',
    ]),
    p(
      `Full details are in our ${a('/privacy-policy/', 'Privacy Policy')}, ${a('/cookie-policy/', 'Cookie Policy')} and ${a('/data-handling-and-security/', 'Data Handling and Security')} overview.`
    ),
    h2('What we do not claim'),
    p(
      'Every practice and business associate has its own obligations under HIPAA. We do not use certification badges or blanket compliance claims. Instead, we describe what we actually do and put the commitments that matter in your BAA and service agreement.'
    ),
    p(`Questions about security? Email ${EMAIL} or ${a('/contact/', 'contact us')}.`)
  ),
};

const careers: PageContent = {
  key: 'careers',
  title: 'Careers',
  seoTitle: 'Careers in Medical Billing and Coding | Texas Solutions RCM',
  metaDescription:
    'Remote careers with Texas Solutions RCM in medical billing, coding, AR follow-up and credentialing. See what we look for and apply using the form below.',
  template: 'careers',
  intro:
    'We build remote teams that work inside our clients\' billing systems. If you are careful, curious and good at following a claim to the end, we would like to hear from you.',
  body: blocks(
    h2('Roles we hire for'),
    p('Openings change with client needs. Current listings appear below the form when available. We typically hire for:'),
    ul([
      '<strong>Medical and dental billers</strong> who handle charge entry, claim submission, rejections and payment posting.',
      '<strong>Medical coders</strong> who assign diagnosis and procedure codes from provider documentation and flag documentation gaps.',
      '<strong>AR and denial specialists</strong> who work open claims by payer and age, call payers, use portals and write appeals.',
      '<strong>Credentialing and enrollment specialists</strong> who manage CAQH profiles, payer applications, revalidations and enrollment follow-up.',
      '<strong>Eligibility and authorization specialists</strong> who verify coverage and benefits and support prior authorization requests.',
    ]),
    h2('How we work'),
    p(
      'All roles are remote. You work inside client practice management systems, EHRs, clearinghouses and payer portals using named accounts, following client-specific workflows and checklists.'
    ),
    p(
      'Because we handle protected health information, everyone follows our security and privacy policies. That includes using approved devices and setups, keeping patient data inside client systems, and completing privacy training.'
    ),
    h2('What a typical day looks like'),
    p(
      'Most work is organized into queues for each client: new charges to review, clearinghouse rejections to fix, payments to post, denials to work and claims to follow up by payer and age. You work through your queue, leave a clear note on every account you touch, and raise anything unusual with your team lead.'
    ),
    p(
      'Some days include payer calls, portal research, appeal letters or credentialing applications. Others are focused on reconciling deposits or cleaning up older AR. Because each client has its own systems, payers and rules, you will use client-specific checklists and keep learning as you go.'
    ),
    h2('What we look for'),
    ul([
      'Hands-on experience in the area you are applying for, in a practice, billing company or health system.',
      'Working knowledge of claim forms, remittance advice, adjustment reason codes and payer follow-up.',
      'Clear written English for account notes, appeal letters and client updates.',
      'Attention to detail and the habit of writing down what you did and why.',
      'Comfort learning new systems and payer rules quickly.',
      'Reliability with schedules, deadlines and confidential information.',
    ]),
    p(
      'Coding and billing credentials are welcome. If a role requires a specific credential, the listing will say so.'
    ),
    p(
      'We also value people who ask good questions. If a claim keeps coming back, we want team members who look for the reason and suggest a fix, not just resubmit it.'
    ),
    h2('How to apply'),
    ol([
      'Fill in the application form below with your contact details, the role you are interested in and a short summary of your experience.',
      'If your background matches an open or upcoming role, we will contact you to arrange a conversation.',
      'Some roles include a short practical exercise, using sample data only.',
      'If we make an offer, we explain the role, schedule and terms in writing, and onboarding includes our privacy and security policies.',
    ]),
    p(
      'Please do not include any patient information, or documents containing patient information, in your application. We review every application, but we may not be able to reply individually when there is no matching opening.'
    ),
    p(
      `To learn more about the work, read about ${a('/about/', 'Texas Solutions RCM')} and ${a('/approach/', 'our approach')}. Questions about careers can go to ${EMAIL}.`
    )
  ),
};

const contact: PageContent = {
  key: 'contact',
  title: 'Contact Us',
  seoTitle: 'Contact Texas Solutions RCM',
  metaDescription:
    'Contact Texas Solutions RCM about medical or dental billing, coding, AR or credentialing. Email info@texassolutions.co or call +1 (838) 910-3147.',
  template: 'contact',
  intro:
    'Have a question about billing, coding, AR or credentialing, or want to talk about working together? Send us a message and our team will get back to you.',
  body: blocks(
    p(
      `Use the form to send a business enquiry, or reach us by email at ${EMAIL} or by phone at ${PHONE}. Our US office is at 401 W Kentucky Ave, Midland, TX 79701.`
    ),
    p(
      `If you want to talk through your practice in detail, ${a('/consultation/', 'book a free consultation')}. If you already know what you need, ${a('/proposal/', 'request a proposal')}.`
    ),
    p(
      'Please do not include patient names, dates of birth, member IDs or any other patient information in your message. This form is for business enquiries only.'
    )
  ),
};

const consultation: PageContent = {
  key: 'consultation',
  title: 'Book a Free Consultation',
  seoTitle: 'Book a Free RCM Consultation | Texas Solutions RCM',
  metaDescription:
    'Book a free consultation with Texas Solutions RCM to discuss your billing, denials, AR or credentialing. See what we cover on the call and what to prepare.',
  template: 'consultation',
  intro:
    'A free, no-obligation conversation about your practice and your revenue cycle. Tell us when suits you, and we will confirm a time.',
  body: blocks(
    h2('What happens on the call'),
    ul([
      'We learn about your practice: specialty, providers, locations, payer mix and the systems you use.',
      'You tell us what is not working, such as denials, aging AR, cash flow, staffing or credentialing delays.',
      'We explain how we could help, which services might fit and what we would need to review.',
      'We answer your questions about how we work, security and pricing.',
      'We agree next steps, if any. There is no obligation and no pressure.',
    ]),
    h2('What to prepare'),
    p('You do not need anything formal, but these help us give more useful answers:'),
    ul([
      'Number of providers and locations, and your main specialties.',
      'Your practice management system, EHR and clearinghouse.',
      'Approximate monthly claim volume and your top payers.',
      'Who handles billing today, and which tasks you want help with.',
      `Any summary numbers you track, such as AR over 90 days or denial rate. Our ${a('/tools/rcm-performance-scorecard/', 'RCM performance scorecard')} can help you gather them.`,
    ]),
    h2('After the call'),
    p(
      `If it looks like a good fit, we may ask for read-only access or a few standard reports to review your workflow, under a Business Associate Agreement. Then we send a written proposal. Read the full process on ${a('/how-we-work/', 'How We Work')}.`
    ),
    p(
      'Please do not share patient information in the booking form or on the call. Summary figures are all we need at this stage.'
    )
  ),
};

const proposal: PageContent = {
  key: 'proposal',
  title: 'Request a Proposal',
  seoTitle: 'Request an RCM Proposal | Texas Solutions RCM',
  metaDescription:
    'Request a written proposal from Texas Solutions RCM. Share your practice details, claim volume and the services you need so we can price the work accurately.',
  template: 'proposal',
  intro:
    'Tell us about your practice and the work you need. The more we understand up front, the more accurate your scope and price will be.',
  body: blocks(
    h2('What we need to price accurately'),
    ul([
      '<strong>Practice profile:</strong> specialty, number of providers and locations, and the states you operate in.',
      '<strong>Volume:</strong> approximate monthly claim count and visit volume.',
      '<strong>Payer mix:</strong> your main commercial, Medicare, Medicaid and other payers.',
      '<strong>Systems:</strong> practice management system, EHR and clearinghouse.',
      '<strong>Current arrangement:</strong> in-house staff, another billing company or a mix.',
      '<strong>Services:</strong> the areas you want us to handle, from full revenue cycle management to a single task such as AR cleanup or credentialing.',
      '<strong>Backlog:</strong> whether there is older AR or unworked denials that need a one-time cleanup.',
    ]),
    h2('What happens next'),
    ol([
      'We review your request and contact you to clarify anything missing.',
      'If needed, we ask for read-only access or standard reports, after a Business Associate Agreement is signed.',
      'We send a written proposal covering scope, responsibilities, reporting, onboarding plan and price.',
      'Nothing starts until you accept the proposal.',
    ]),
    p(
      `Not sure what you need yet? ${a('/consultation/', 'Book a free consultation')} first, or try the ${a('/tools/medical-billing-cost-calculator/', 'medical billing cost calculator')} to frame your current costs.`
    ),
    p('Please use summary figures only. Do not include patient information in this form.')
  ),
};

const partners: PageContent = {
  key: 'partners',
  title: 'Partner With Us',
  seoTitle: 'Partner With Texas Solutions RCM',
  metaDescription:
    'Referral partners, practice consultants, software vendors and billing companies needing overflow capacity: learn how to work with Texas Solutions RCM.',
  template: 'partners',
  intro:
    'We work with people and companies who serve medical and dental practices. If your clients need billing help, or your team needs extra capacity, let us talk.',
  body: blocks(
    h2('Who we partner with'),
    h3('Referral partners'),
    p(
      'Accountants, practice brokers, attorneys, associations and other advisors who meet practices that are struggling with billing. You introduce the practice; we handle the consultation and the work, and keep you informed as agreed.'
    ),
    h3('Practice management consultants'),
    p(
      'Consultants who help practices with operations, growth or turnarounds often find revenue cycle problems along the way. We can take on the billing, AR or credentialing work while you focus on the wider engagement.'
    ),
    h3('Software vendors'),
    p(
      'PM, EHR and clearinghouse vendors whose customers need billing staff who already know how to work inside their system. We do not claim formal integrations, but we are happy to discuss how we can support your customers.'
    ),
    h3('Billing companies needing overflow capacity'),
    p(
      'Billing companies facing a backlog, a large new client or a staffing gap can use our team for defined tasks such as AR follow-up, denial work, eligibility checks or credentialing, under a written agreement and the appropriate subcontractor Business Associate Agreement.'
    ),
    h2('How partnerships work'),
    ul([
      'We start with a call to understand your clients and what they need.',
      'We agree the terms of the relationship in writing, including how introductions, communication and any referral arrangement work.',
      'Every client engagement has its own written proposal and Business Associate Agreement.',
      'We work inside the client\'s systems and follow the same privacy rules as all our work.',
    ]),
    h2('Overflow work for billing companies'),
    p(
      'For billing company partners, we agree the details up front: which clients and tasks are included, whose systems and accounts we use, how work is assigned and reported, and who communicates with the end client. Our team follows your workflows and notes standards, so your clients see consistent work. Volumes, timelines and pricing are set in the written agreement for each arrangement.'
    ),
    p(
      'Any referral arrangement must comply with the laws that apply to your business and the practices involved. We discuss this openly before anything is agreed.'
    ),
    h2('Services partners ask about'),
    p('Partners usually bring us in for one of these areas, although any of our services can be scoped:'),
    ul([
      `${a('/services/aging-ar-follow-up/', 'Aging AR follow-up')} and ${a('/services/revenue-recovery/', 'revenue recovery')} for practices with a backlog of unpaid claims.`,
      `${a('/services/denial-management/', 'Denial management')} and ${a('/services/denial-appeals/', 'appeals')} when denials are piling up.`,
      `${a('/services/medical-credentialing/', 'Credentialing')} and ${a('/services/provider-enrollment/', 'provider enrollment')} for new providers, locations or acquisitions.`,
      `${a('/services/billing-software-migration/', 'Billing support during a software migration')}, so old AR is worked while the new system goes live.`,
      `${a('/services/revenue-cycle-audit/', 'Revenue cycle audits')} that give a consultant or buyer a clear picture of billing performance.`,
    ]),
    h2('What partners can expect'),
    ul([
      'A named contact on our side.',
      'Clear scoping, so your clients know exactly what we do.',
      'No surprise contact with your clients outside what we agree.',
      'Honest feedback if a practice is not a good fit for us.',
    ]),
    p(
      `Use the form below to tell us about your business. You can also learn more ${a('/about/', 'about us')} or read ${a('/how-we-work/', 'how we work')} with practices.`
    )
  ),
};

const faq: PageContent = {
  key: 'faq',
  title: 'Frequently Asked Questions',
  seoTitle: 'FAQs About Medical Billing and RCM | Texas Solutions RCM',
  metaDescription:
    'Answers to common questions about working with Texas Solutions RCM: services, onboarding, pricing, data security, and our free calculators and tools.',
  template: 'faq',
  intro:
    'Answers to the questions practices ask most about working with us, onboarding, data security and our free tools. Cannot find your question? Contact us.',
  body: blocks(
    p(
      `If your question is not answered here, ${a('/contact/', 'send us a message')} or ${a('/consultation/', 'book a free consultation')}. Please do not include patient information.`
    )
  ),
};

const resources: PageContent = {
  key: 'resources',
  title: 'Resources and Knowledge Center',
  seoTitle: 'RCM Resources, Guides and Free Tools | Texas Solutions RCM',
  metaDescription:
    'Free medical and dental billing resources: articles, calculators, checklists, code lookups and guides for practice owners, managers and billing teams.',
  template: 'resources',
  intro:
    'Practical articles, free calculators, checklists and code lookups for practice owners, managers and billing teams. Search below or browse by topic.',
  body: blocks(
    p(
      `Calculators run in your browser, and lookups use public US government data. Start with the ${a('/tools/rcm-performance-scorecard/', 'RCM performance scorecard')}, the ${a('/tools/denial-reasons-guide/', 'denial reasons guide')} or the ${a('/tools/medical-billing-glossary/', 'medical billing glossary')}.`
    ),
    p(
      'Our content is general and educational. It is not legal, coding, tax or financial advice, so check payer rules and current guidance before acting on it.'
    )
  ),
};

/* ---------- comparison ---------- */

const outsourcingVsInHouse: PageContent = {
  key: 'outsourcing-vs-in-house-billing',
  title: 'Outsourcing vs In-House Medical Billing',
  seoTitle: 'Outsourcing vs In-House Medical Billing: Honest Comparison',
  metaDescription:
    'In-house, outsourced or hybrid medical billing? Compare pros and cons, the real cost components and the questions to ask before you decide.',
  template: 'comparison',
  intro:
    'There is no single right answer. In-house, outsourced and hybrid billing each suit different practices. This guide compares them honestly, lists the costs to include and gives you the questions to ask.',
  body: blocks(
    h2('The three models'),
    p(
      '<strong>In-house billing</strong> means your own employees handle the revenue cycle, using software your practice licenses. <strong>Outsourced billing</strong> means a billing company handles most or all of the work, either in your systems or in theirs. <strong>Hybrid billing</strong> splits the work: your staff keep some tasks, such as front desk eligibility checks and patient payments, while an outside team handles others, such as coding, denials or aging AR.'
    ),
    p(
      'Most practices are already somewhere on this spectrum. The real question is which tasks are best done by whom.'
    ),
    h2('Pros and cons at a glance'),
    table(
      ['Factor', 'In-house', 'Outsourced', 'Hybrid'],
      [
        [
          'Control',
          'Direct day-to-day control of staff and priorities.',
          'Control through the contract, reporting and review calls.',
          'Direct control over the tasks you keep; contractual control over the rest.',
        ],
        [
          'Visibility',
          'Full, if you have someone who reviews the work.',
          'Depends on the vendor. Best when they work in your systems and report from your data.',
          'Good, as long as handoffs are written down.',
        ],
        [
          'Cost structure',
          'Mostly fixed: salaries, benefits, software, training and management time.',
          'Mostly variable: a fee based on collections, claims or a flat amount, plus any software you keep.',
          'Mix of fixed and variable costs.',
        ],
        [
          'Staffing risk',
          'Turnover, vacations and sick days can stop work on key tasks.',
          'The vendor covers absences and turnover within their team.',
          'Reduced, because the outside team can absorb some gaps.',
        ],
        [
          'Expertise',
          'Limited to what your staff know; training is your responsibility.',
          'Access to a wider team, but quality varies between vendors.',
          'Lets you bring in specialist help only where you need it.',
        ],
        [
          'Patient experience',
          'Staff on site know your patients and can answer billing questions directly.',
          'Patient calls may go to the vendor; check how they handle them.',
          'You can keep patient-facing tasks in-house.',
        ],
        [
          'Scalability',
          'Hiring takes time when volume grows or a provider joins.',
          'Easier to scale up or down under the contract.',
          'Flexible in the areas you outsource.',
        ],
        [
          'Switching cost',
          'Low, unless you change software.',
          'Can be high if the vendor controls your system or data.',
          'Moderate, depending on what is outsourced.',
        ],
      ]
    ),
    h2('When in-house billing tends to work well'),
    ul([
      'You have experienced, stable billing staff and someone who reviews their work.',
      'Your payer mix and specialty rules are well understood by your team.',
      'Your key metrics, such as denial rate and AR over 90 days, are stable or improving.',
      'You want patients to reach a billing person in your office directly.',
    ]),
    h2('When outsourcing tends to make sense'),
    ul([
      'You rely on one or two billing staff, and an absence would stop the work.',
      'Denials or aging AR are growing faster than your team can handle.',
      'You are adding providers, locations or a new specialty.',
      'Owners or managers spend too much time on billing problems.',
      'Hiring experienced billing staff in your area is difficult.',
    ]),
    h2('When hybrid is the better choice'),
    p(
      `Hybrid arrangements suit practices that do some things well and struggle with others. A common pattern is keeping front desk tasks and patient payments in-house while outsourcing ${a('/services/denial-management/', 'denial management')}, ${a('/services/aging-ar-follow-up/', 'aging AR follow-up')} or ${a('/services/medical-credentialing/', 'credentialing')}. The key is a written agreement on who owns each task, so nothing falls between teams.`
    ),
    h2('Cost components to compare'),
    p(
      'Comparisons often go wrong because one side of the ledger is incomplete. Include all of these on the in-house side:'
    ),
    ul([
      'Salaries or wages for billers, coders and AR staff.',
      'Payroll taxes, benefits and paid time off.',
      'Recruiting, onboarding and training, including turnover.',
      'Practice management, clearinghouse and coding software fees.',
      'Equipment, office space and IT support for billing staff.',
      'Manager or owner time spent supervising billing and fixing problems.',
      'Revenue lost to unworked denials, missed filing deadlines and write-offs.',
    ]),
    p('On the outsourced side, include:'),
    ul([
      'The vendor fee and how it is calculated, such as a percentage of collections, per claim or flat monthly.',
      'Setup or onboarding fees, if any.',
      'Software you still license, since many vendors work in your system.',
      'Staff you keep for front desk, patient payments or oversight.',
      'Your internal time for review calls and approvals.',
      'Exit costs, including notice periods and data return.',
    ]),
    p(
      'Also look at what each fee model rewards. A percentage-of-collections fee aligns the vendor with collecting more, but check what counts as a collection and whether old AR is included. A per-claim fee is predictable, but make sure follow-up and appeals are covered.'
    ),
    h2('Run the numbers'),
    p(
      `Our free ${a('/tools/outsourcing-vs-in-house-billing-calculator/', 'outsourcing vs in-house billing calculator')} compares the full cost of each option using your own figures. The ${a('/tools/rcm-roi-calculator/', 'RCM ROI calculator')} estimates what a change in collections or denial rate could be worth. You may also find the ${a('/tools/billing-staffing-cost-calculator/', 'billing staffing cost calculator')} useful. Results are estimates based on the numbers you enter, not guarantees.`
    ),
    h2('Questions to ask before you decide'),
    h3('About your current setup'),
    ul([
      'What are our denial rate, days in AR and AR over 90 days, and are they trending up or down?',
      'What happens to billing when our main biller is away?',
      'How much time do owners and managers spend on billing issues each week?',
    ]),
    h3('About any billing company'),
    ul([
      'Do you work inside our PM/EHR, or do we have to move to your system?',
      'Who owns the data and the system accounts?',
      'Will you sign a Business Associate Agreement before accessing patient data?',
      'Exactly which tasks are included in the fee, and which cost extra?',
      'What reports will we receive, how often, and how are the metrics calculated?',
      'Who is our day-to-day contact?',
      'What are the notice terms, and how is work handed back if we leave?',
    ]),
    p(
      `See how we answer these questions on ${a('/why-choose-us/', 'Why Choose Us')}.`
    ),
    h2('Making a change safely'),
    p(
      'Whichever direction you choose, plan the transition. Agree who owns new claims, payment posting and existing AR from a specific date, keep a period where both teams can see the work, and make sure payer enrollment, ERA and clearinghouse settings are correct before claims move. A Business Associate Agreement must be in place before any outside team accesses patient data.'
    ),
    h2('How we fit in'),
    p(
      `Texas Solutions RCM supports all three models. We can run your full ${a('/services/revenue-cycle-management/', 'revenue cycle')}, take on specific tasks in a hybrid setup, or help your in-house team clear a backlog. We work inside your systems, so moving between models later does not require a migration. ${a('/consultation/', 'Book a free consultation')} to talk through the options for your practice.`
    )
  ),
};

/* ---------- legal pages ---------- */

const privacyPolicy: PageContent = {
  key: 'privacy-policy',
  title: 'Privacy Policy',
  seoTitle: 'Privacy Policy | Texas Solutions RCM',
  metaDescription:
    'How this website collects, uses, stores and shares information from forms, the AI assistant, calculators and analytics, and how to make a privacy request.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'This policy explains what information this website collects, why, how long we keep it, who we share it with and the choices you have.',
  body: blocks(
    h2('Who we are'),
    p(
      `This website, rcm.texassolutions.co, is operated by ${ADDRESS}, United States ("Texas Solutions", "we", "us"). Texas Solutions RCM is our healthcare revenue cycle management division. You can contact us about privacy at ${EMAIL} or ${PHONE}.`
    ),
    h2('Scope of this policy'),
    p(
      'This policy covers information collected through this website, including its forms, AI assistant, calculators, lookups and analytics. It does not cover protected health information we may handle for client practices under a Business Associate Agreement. That information is governed by the client\'s agreement with us and is never collected through this website.'
    ),
    p(
      'This website is intended for businesses in the United States, such as medical and dental practices, partners and job applicants. It is not intended for patients or for children.'
    ),
    h2('Do not send patient information'),
    p(
      'Please do not enter patient names, dates of birth, member or insurance IDs, medical record numbers, diagnoses or any other patient information into any form or the AI assistant. The AI assistant includes a filter that withholds messages that look like patient information, but no filter is perfect. If you send patient information by mistake, contact us so we can delete it.'
    ),
    h2('Information we collect'),
    h3('Forms'),
    p(
      'Our forms include contact, consultation, proposal, careers, partner and newsletter forms, and the "Discuss these results" option on calculators. Depending on the form, we collect:'
    ),
    ul([
      'Name, business email address and phone number.',
      'Practice or company name, state and specialty.',
      'Number of providers, current billing arrangement, services of interest and claim volume.',
      'Preferred date for a consultation, and your message.',
      'For the calculator option, the inputs and results you choose to send.',
      'The time you gave consent, the page you submitted from, and marketing attribution: UTM campaign parameters, the referring website and the first page you landed on during your visit.',
    ]),
    h3('AI assistant'),
    p(
      'Before you can chat, the assistant asks for your name and business email, optionally your practice name, and your consent. We then collect the messages you send and the replies generated. See "How the AI assistant works" below.'
    ),
    h3('Calculators and lookups'),
    p(
      'Calculators run entirely in your browser. Your inputs are not sent to us unless you choose "Discuss these results" and submit the form.'
    ),
    p(
      'Code and provider lookups, such as the ICD-10 code search and NPI lookup, send your search terms to this website, which queries public US government services (the National Library of Medicine Clinical Table Search Service and the CMS NPPES NPI Registry) and returns the results. Do not enter patient information into lookups.'
    ),
    h3('Analytics'),
    p(
      'We count page views and site events with our own first-party analytics, which does not use cookies. It records the event name, page path, the referring website\'s domain and coarse labels such as the type of page or tool. If you accept analytics, we also store a random visitor ID in your browser and load Google Analytics 4, which sets its own cookies. Analytics never receives form contents or chat text. See our ' +
        `${a('/cookie-policy/', 'Cookie Policy')} for details.`
    ),
    h3('Technical information'),
    p(
      'Like most websites, our host and our site process technical information such as IP address, browser type and request times to deliver pages, keep the site secure and limit abuse, for example by rate-limiting form and chat submissions.'
    ),
    h2('How the AI assistant works'),
    ul([
      'Your messages are sent to Google\'s Gemini API, provided by Google LLC, to generate answers. Google processes them under its API terms.',
      'Transcripts are stored in our site dashboard and are visible to authorized staff, who may use them to follow up on your enquiry and improve answers.',
      'A summary of the conversation, not the full transcript, is emailed to our team.',
      'A filter withholds messages that look like patient information, so they are not sent to the AI service.',
      'If you choose "remember this conversation", a session token is stored in your browser\'s localStorage so you can continue later on the same device. Otherwise it is stored in sessionStorage and cleared when you close the tab.',
      'Answers are generated automatically and may be incomplete or wrong. They are not professional advice.',
    ]),
    h2('How we use information'),
    ul([
      'To respond to your enquiry, schedule consultations and prepare proposals.',
      'To review job applications and partner enquiries.',
      'To send newsletters you signed up for. Each newsletter includes a way to unsubscribe.',
      'To understand which pages, tools and campaigns are useful, using aggregated analytics and attribution data.',
      'To keep the website secure, prevent spam and abuse, and fix problems.',
      'To meet legal obligations and enforce our terms.',
    ]),
    h2('Where information is stored'),
    p(
      'This website runs on WordPress hosted by DreamHost in the United States. Form submissions and chat transcripts are stored in the site\'s database, in a lead management dashboard that only authorized staff can access. Form submissions are also emailed to info@texassolutions.co. Email notifications are sent from WordPress through an SMTP email service configured on the site.'
    ),
    h2('Who we share information with'),
    p('We do not sell your personal information. We share it only with:'),
    ul([
      '<strong>Service providers</strong> that run the site for us: DreamHost (hosting), our SMTP email service (email delivery), Google LLC (Gemini API for the AI assistant and, if you accept analytics, Google Analytics 4) and our email provider for the info@texassolutions.co mailbox.',
      '<strong>Public data services</strong>: the search terms you enter in lookups are sent to the National Library of Medicine and CMS services described above.',
      '<strong>Legal and safety</strong>: when required by law, or to protect our rights, users or the public.',
      '<strong>Business transfers</strong>: if Texas Solutions is involved in a merger, acquisition or sale of assets, subject to this policy.',
    ]),
    h2('How long we keep information'),
    table(
      ['Information', 'Default retention'],
      [
        ['Leads from forms (including attribution data)', '3 years from the last activity, unless you ask us to delete them sooner. This period can be configured by our administrators.'],
        ['AI assistant transcripts', '365 days'],
        ['First-party analytics events', '400 days'],
        ['Admin audit logs', '2 years'],
        ['Emails sent to info@texassolutions.co', 'Kept in our mailbox as business correspondence'],
        ['Browser storage (localStorage, sessionStorage)', 'Until cleared, or for sessionStorage until the tab is closed. See the Cookie Policy.'],
      ]
    ),
    p(
      'We may keep information longer when required by law or to resolve a dispute. Google Analytics data is retained according to the settings of our Google Analytics property.'
    ),
    h2('How we protect information'),
    p(
      `Access to the site dashboard is limited by role, two-factor authentication is available for administrator accounts, admin actions are logged and the site is backed up regularly. No website is perfectly secure, so please send only the information needed for your enquiry. See ${a('/data-handling-and-security/', 'Data Handling and Security')} for more.`
    ),
    h2('Your choices and rights'),
    ul([
      '<strong>Access, correction and deletion.</strong> Email us at info@texassolutions.co to ask what information we hold about you, to correct it or to delete it. We may need to verify your identity before acting.',
      '<strong>Analytics.</strong> Google Analytics loads only if you accept analytics. You can change your choice at any time with the cookie settings control on this site or by clearing your browser storage for this site.',
      '<strong>Chat memory.</strong> You can choose not to have the assistant remember your conversation, and you can clear your browser storage at any time.',
      '<strong>Newsletter.</strong> Use the unsubscribe link in any newsletter or email us.',
    ]),
    p(
      'Depending on where you live, state privacy laws may give you additional rights. We will respond to requests as required by applicable law. We do not discriminate against anyone for exercising privacy rights.'
    ),
    h2('Children'),
    p(
      'This website is for business users and is not directed at children under 13. We do not knowingly collect information from children.'
    ),
    h2('Links to other websites'),
    p(
      'Our content links to other websites, such as payer, government and standards organization sites. Their privacy practices are their own.'
    ),
    h2('Changes to this policy'),
    p(
      'We will update this policy when our practices change and show the date of the latest update at the top of this page.'
    ),
    h2('Contact'),
    p(`${ADDRESS}. Email ${EMAIL}. Phone ${PHONE}.`)
  ),
};

const termsOfService: PageContent = {
  key: 'terms-of-service',
  title: 'Terms of Service',
  seoTitle: 'Terms of Service | Texas Solutions RCM',
  metaDescription:
    'The terms for using rcm.texassolutions.co, including its content, calculators, lookups and AI assistant. General information only, not professional advice.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'These terms apply to your use of rcm.texassolutions.co. By using the site, you agree to them. If you do not agree, please do not use the site.',
  body: blocks(
    h2('About these terms'),
    p(
      `The website rcm.texassolutions.co is operated by ${ADDRESS} ("Texas Solutions", "we", "us"). These terms cover the website only. Revenue cycle services are provided only under a separate written agreement.`
    ),
    h2('No client relationship'),
    p(
      'Using this website, submitting a form, booking a consultation or chatting with the AI assistant does not create a client, business associate or other professional relationship. A relationship begins only when both parties sign a written agreement and, where patient data is involved, a Business Associate Agreement.'
    ),
    h2('Informational content'),
    p(
      'Articles, guides, glossaries, checklists, FAQs and other content on this site are general information about medical and dental billing. They are not legal, coding, tax, financial or medical advice, and they may not reflect the latest payer policy or regulation. Always check current payer rules and official guidance, and consult a qualified professional before making decisions.'
    ),
    h2('Calculators and lookups'),
    ul([
      'Calculators produce estimates based on the numbers you enter and the assumptions shown on each tool. They are not guarantees of any result.',
      'Lookups return data from public US government sources. We do not control that data and cannot guarantee it is complete, current or accurate.',
      'You are responsible for how you use the results.',
    ]),
    h2('AI assistant'),
    p(
      'The AI assistant generates answers automatically and may be incomplete or wrong. Its answers are not professional advice and do not bind Texas Solutions to any price, scope or commitment. You must not enter patient information or other sensitive personal information into the assistant. See our ' +
        `${a('/privacy-policy/', 'Privacy Policy')} for how chat data is handled.`
    ),
    h2('Acceptable use'),
    p('You agree not to:'),
    ul([
      'Submit patient information or other protected health information through the website.',
      'Submit false information or impersonate another person or organization.',
      'Send spam, malware or automated requests intended to overload or misuse the site, its forms, its lookups or its AI assistant.',
      'Try to gain unauthorized access to the site, its admin area or its data.',
      'Copy or scrape the site\'s content in bulk, or use it to build a competing service.',
      'Use the site in violation of any law.',
    ]),
    p('We may block access or remove submissions that break these terms.'),
    h2('Code sets and trademarks'),
    p(
      'CPT is a registered trademark of the American Medical Association (AMA). CDT is a registered trademark of the American Dental Association (ADA). This website does not reproduce CPT or CDT code descriptors. Code numbers may be mentioned for reference only. Other names and trademarks belong to their owners, and their mention does not imply endorsement or partnership.'
    ),
    h2('Intellectual property'),
    p(
      'Unless stated otherwise, the content, design and software of this website belong to Texas Solutions. You may view and print pages for your own business use. You may share links to our pages. Any other use requires our written permission.'
    ),
    h2('Third-party links and services'),
    p(
      'The site links to websites and uses services operated by others. We are not responsible for their content, availability or practices.'
    ),
    h2('No warranties'),
    p(
      'The website and its content, tools and AI assistant are provided "as is" and "as available". To the extent permitted by law, we disclaim all warranties, express or implied, including warranties of accuracy, fitness for a particular purpose and non-infringement. We do not guarantee that the site will be uninterrupted or error-free.'
    ),
    h2('Limitation of liability'),
    p(
      'To the extent permitted by law, Texas Solutions is not liable for any indirect, incidental, special, consequential or punitive damages, or for lost revenue, profits or data, arising from your use of the website or reliance on its content, calculators, lookups or AI assistant.'
    ),
    h2('Indemnity'),
    p(
      'You agree to indemnify Texas Solutions against claims arising from your misuse of the website or your breach of these terms.'
    ),
    h2('Governing law'),
    p(
      'These terms are governed by the laws of the State of Texas, without regard to conflict of law rules. Any dispute relating to the website will be brought in the state or federal courts located in Midland County, Texas, and you consent to their jurisdiction.'
    ),
    h2('Changes'),
    p(
      'We may update these terms from time to time. The date at the top of this page shows the latest version. Continued use of the site after a change means you accept the updated terms.'
    ),
    h2('Contact'),
    p(`Questions about these terms: ${EMAIL}, ${PHONE}, ${ADDRESS}.`)
  ),
};

const cookiePolicy: PageContent = {
  key: 'cookie-policy',
  title: 'Cookie Policy',
  seoTitle: 'Cookie Policy | Texas Solutions RCM',
  metaDescription:
    'The cookies and browser storage rcm.texassolutions.co uses, what each one does, how long it lasts and how to change your analytics choice.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'This page lists every cookie and browser storage item this website uses. We keep it short: no advertising cookies, and Google Analytics only if you accept it.',
  body: blocks(
    h2('Cookies and browser storage'),
    p(
      'Cookies are small files a website stores in your browser and sends back with each request. localStorage and sessionStorage are similar browser features that keep data on your device without sending it with every request. localStorage stays until it is cleared; sessionStorage is cleared when you close the tab.'
    ),
    h2('What we use without asking'),
    p('These items are needed for the site to work or to remember your choices. They do not track you across other websites.'),
    table(
      ['Name', 'Type', 'Purpose', 'Duration'],
      [
        ['WordPress login cookies (wordpress_*, wordpress_logged_in_*, wp-settings-*)', 'Cookie', 'Keep staff signed in to the site admin. Set only for logged-in staff, not for visitors.', 'Session, or up to the WordPress login period'],
        ['rcm_consent', 'localStorage', 'Remembers whether you accepted or declined analytics.', 'Until cleared'],
        ['rcm_attr', 'sessionStorage', 'Remembers the first page you landed on, the referring site and any UTM campaign parameters, so they can be included if you submit a form.', 'Until the tab is closed'],
        ['rcm_chat', 'sessionStorage, or localStorage if you choose "remember this conversation"', 'Holds the AI assistant session token so your conversation continues as you browse.', 'Until the tab is closed, or until cleared if remembered'],
        ['rcm_check_&lt;tool&gt;', 'sessionStorage', 'Saves your progress in an interactive checklist.', 'Until the tab is closed'],
      ]
    ),
    h2('What we use only if you accept analytics'),
    table(
      ['Name', 'Type', 'Purpose', 'Duration'],
      [
        ['rcm_vid', 'localStorage', 'A random visitor ID for our first-party analytics, so repeat visits can be counted. It contains no personal details.', 'Until cleared'],
        ['_ga', 'Cookie (Google Analytics 4)', 'Distinguishes visitors for Google Analytics.', 'Up to 2 years'],
        ['_ga_&lt;id&gt;', 'Cookie (Google Analytics 4)', 'Keeps session state for our Google Analytics property.', 'Up to 2 years'],
      ]
    ),
    p(
      'Google Analytics is provided by Google LLC. When enabled, it collects information about your visit, such as pages viewed and approximate location derived from your IP address, under Google\'s terms.'
    ),
    h2('Cookie-free page counting'),
    p(
      'Whether or not you accept analytics, we count page views and site events with our own first-party analytics without cookies. It records the event name, page path, the referring website\'s domain and coarse labels such as the type of page or tool. It does not record form contents or chat text. These events are kept for 400 days.'
    ),
    h2('No advertising cookies'),
    p('We do not use advertising, retargeting or social media tracking cookies.'),
    h2('Changing your choice'),
    ul([
      'Use the cookie settings control on this site to accept or decline analytics at any time.',
      'Clear cookies and site data for rcm.texassolutions.co in your browser settings. You will be asked again on your next visit.',
      'Use your browser settings to block cookies. The site will still work, but analytics will not load.',
    ]),
    p(
      `For more about how we handle information, see our ${a('/privacy-policy/', 'Privacy Policy')}. Questions: ${EMAIL}.`
    )
  ),
};

const accessibilityStatement: PageContent = {
  key: 'accessibility-statement',
  title: 'Accessibility Statement',
  seoTitle: 'Accessibility Statement | Texas Solutions RCM',
  metaDescription:
    'Texas Solutions RCM aims for WCAG 2.2 AA on rcm.texassolutions.co. Read the measures we take, known limitations and how to report an accessibility problem.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'We want everyone to be able to use this website, including people who use assistive technology. This statement explains what we aim for, what we have done and where we know there are gaps.',
  body: blocks(
    h2('Our goal'),
    p(
      'We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 at Level AA, published by the World Wide Web Consortium (W3C). Accessibility is part of how we design, build and write content, and we keep working on it as the site changes.'
    ),
    h2('Measures we take'),
    ul([
      '<strong>Keyboard access.</strong> Navigation, forms, calculators, checklists and the AI assistant are designed to be usable with a keyboard, with a visible focus indicator.',
      '<strong>Color contrast.</strong> Text and interface colors are chosen to meet WCAG AA contrast ratios.',
      '<strong>Labels and structure.</strong> Form fields have visible labels, errors are described in text, and pages use headings, landmarks and lists so screen readers can navigate them.',
      '<strong>Reduced motion.</strong> Animations are minimal and respect the reduced motion setting in your operating system.',
      '<strong>Readable content.</strong> We write in plain language, explain billing terms and avoid conveying meaning by color alone.',
      '<strong>Responsive layout.</strong> Pages adapt to small screens and to browser zoom.',
    ]),
    h2('Known limitations'),
    ul([
      '<strong>Third-party content.</strong> Some content comes from services we do not control, such as Google Analytics consent behavior, embedded content or results returned by government data services. We choose providers with accessibility in mind but cannot guarantee their content.',
      '<strong>PDFs and downloads.</strong> Some downloadable documents may not be fully accessible. If you need a document in another format, contact us.',
      '<strong>AI assistant answers.</strong> Answers are generated automatically and may occasionally be formatted in ways that are harder to read with assistive technology.',
      '<strong>Older content.</strong> Content added over time may not have been fully reviewed yet.',
    ]),
    h2('Compatibility'),
    p(
      'The site is designed to work with current versions of major browsers and common screen readers. Some features may not work in older browsers.'
    ),
    h2('Report a problem'),
    p(
      `If you have trouble using any part of this website, or need information in a different format, please tell us. Email ${EMAIL} or call ${PHONE}, and include the page address and a short description of the problem. We will work with you to provide the information you need and to fix the issue.`
    ),
    h2('Review'),
    p('We review this statement when we make significant changes to the site. The date at the top shows the latest update.')
  ),
};

const disclaimer: PageContent = {
  key: 'disclaimer',
  title: 'Disclaimer',
  seoTitle: 'Disclaimer | Texas Solutions RCM',
  metaDescription:
    'Content, calculators and AI answers on rcm.texassolutions.co are general and educational. They are estimates, not guarantees or professional advice.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'The information on this website is provided to help medical and dental practices understand revenue cycle topics. Please read this disclaimer before relying on it.',
  body: blocks(
    h2('Educational content only'),
    p(
      'Articles, guides, glossaries, checklists, FAQs and service descriptions on this site are general and educational. They are not legal, coding, compliance, tax, financial or medical advice, and they are not a substitute for advice from a qualified professional who knows your situation.'
    ),
    p(
      'Billing rules change often and vary by payer, state and contract. Always check current guidance from payers and authorities such as CMS, the AMA, the ADA and X12 before acting on anything you read here.'
    ),
    h2('Calculators and estimates'),
    p(
      'Calculators show estimates based on the numbers you enter and the formulas and assumptions shown on each tool. Actual results depend on many factors outside the calculator, including payer behavior, documentation, patient mix and how your data is recorded. Results are not predictions, offers or guarantees.'
    ),
    h2('Lookups'),
    p(
      'Code and NPI lookups return data from public US government services. We do not control that data and cannot guarantee it is complete or current. Confirm codes and provider details against official sources and payer requirements.'
    ),
    h2('AI assistant'),
    p(
      'The AI assistant generates answers automatically. Answers may be incomplete or wrong and do not create any commitment on price, scope or results.'
    ),
    h2('No guarantees'),
    p(
      'Descriptions of our services explain what the work is designed to do. They are not guarantees of any particular outcome, such as collections, denial rates or payment timelines.'
    ),
    h2('No professional relationship'),
    p(
      'Using this website does not create an attorney-client, coder-client, consultant-client or any other professional relationship. A relationship with Texas Solutions begins only under a signed written agreement.'
    ),
    h2('External links'),
    p(
      'We link to external websites for reference. We do not control them and are not responsible for their content, accuracy or privacy practices. A link is not an endorsement.'
    ),
    h2('Trademarks'),
    p(
      'CPT is a registered trademark of the American Medical Association. CDT is a registered trademark of the American Dental Association. Code descriptors are not reproduced on this site. Other trademarks belong to their owners.'
    ),
    p(`Questions about this disclaimer: ${EMAIL}. See also our ${a('/terms-of-service/', 'Terms of Service')}.`)
  ),
};

const dataHandling: PageContent = {
  key: 'data-handling-and-security',
  title: 'Data Handling and Security',
  seoTitle: 'Data Handling and Security | Texas Solutions RCM',
  metaDescription:
    'How we handle data on this website and in client engagements: a BAA before PHI, role-based access, login protection, audit logs, backups and incident response.',
  template: 'legal',
  lastUpdated: LEGAL_DATE,
  intro:
    'An overview of how we handle and protect data in two separate settings: this website, and our work for client practices.',
  body: blocks(
    h2('Two separate settings'),
    p(
      'This website handles business enquiry data, such as names, business emails and practice details. It is not designed for, and must not be used for, patient information. Client engagements, by contrast, can involve protected health information (PHI), which we access only inside client systems under a Business Associate Agreement.'
    ),
    h2('This website'),
    h3('What is stored'),
    p(
      `Form submissions, AI assistant transcripts, first-party analytics events and admin audit logs are stored in the site's database on WordPress hosting provided by DreamHost in the United States. Form submissions are also emailed to info@texassolutions.co through an SMTP email service. Details and retention periods are in our ${a('/privacy-policy/', 'Privacy Policy')}.`
    ),
    h3('Patient information safeguards'),
    ul([
      'Forms and the AI assistant tell visitors not to enter patient information.',
      'A filter in the AI assistant withholds messages that look like patient information, so they are not sent to the AI service.',
      'If patient information is submitted by mistake, we delete it when we become aware of it.',
    ]),
    h3('Access controls'),
    ul([
      'The site dashboard uses role-based access. Staff see only the areas their role needs, such as leads, chats, analytics or content.',
      'Two-factor authentication is available for every administrator account, and failed logins are throttled.',
      'Login attempts are throttled to slow down password guessing.',
      'Accounts are removed or downgraded when staff change roles or leave.',
    ]),
    h3('Audit logs'),
    p(
      'Meaningful admin actions, such as viewing, exporting, changing or deleting leads and changing settings, are recorded in an audit log that is kept for 2 years.'
    ),
    h3('Data minimization'),
    ul([
      'Calculators run in your browser and send nothing unless you choose to share results.',
      'Analytics never receives form contents or chat text.',
      'Google Analytics loads only after a visitor accepts analytics.',
      'The AI assistant emails a summary to our team, not the full transcript.',
    ]),
    h3('Backups'),
    p(
      'The site is backed up regularly, through our host\'s backups and database exports, so it can be restored after a failure.'
    ),
    h3('Retention and deletion'),
    p(
      'Data is kept for set periods: leads 3 years by default, chat transcripts 365 days, analytics events 400 days and audit logs 2 years. You can ask us to delete your information earlier by emailing info@texassolutions.co.'
    ),
    h2('Client engagements'),
    ul([
      '<strong>BAA before PHI.</strong> We sign a Business Associate Agreement before accessing any patient data.',
      '<strong>Work in client systems.</strong> Our team works inside the client\'s PM/EHR, clearinghouse and payer portals rather than copying PHI into our own tools.',
      '<strong>Named, least-privilege accounts.</strong> Each team member has their own account with only the permissions their tasks require, controlled and revocable by the client.',
      '<strong>MFA where supported.</strong> We use multi-factor authentication wherever client systems support it.',
      '<strong>No PHI over email, chat or this website.</strong> When files must be exchanged, we agree a secure method with the client under the BAA.',
      '<strong>Internal policies.</strong> Our policies require protected work devices, access only for assigned work, privacy training and prompt removal of access when roles change.',
      '<strong>End of engagement.</strong> We return or securely delete working files as set out in the BAA.',
    ]),
    h2('Incident response'),
    p(
      'If we suspect a security incident affecting this website, we investigate, contain it, restore from backups where needed and notify affected people as required by law. For client engagements, we follow the notification terms in the Business Associate Agreement.'
    ),
    p(
      `To report a suspected security issue or vulnerability, email ${EMAIL} with "Security" in the subject line, or call ${PHONE}. Please do not include patient information in your report.`
    ),
    h2('More information'),
    p(
      `See ${a('/security/', 'Security and Privacy')} for how we work with client practices, and our ${a('/cookie-policy/', 'Cookie Policy')} for browser storage details.`
    )
  ),
};

export const pages: PageContent[] = [
  about,
  approach,
  howWeWork,
  whyChooseUs,
  technology,
  security,
  careers,
  contact,
  consultation,
  proposal,
  partners,
  faq,
  resources,
  outsourcingVsInHouse,
  privacyPolicy,
  termsOfService,
  cookiePolicy,
  accessibilityStatement,
  disclaimer,
  dataHandling,
];
