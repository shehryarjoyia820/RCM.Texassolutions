/**
 * Keyword posts (set B) for the dental-only site, 2026-10-13.
 * Rules: docs/DENTAL-WRITING.md. Internal links only point at kept URLs
 * (src/content/dental.ts). Product facts come from each publisher's own site.
 */
import type { SeedPost } from './seed';

const S = {
  dentrix: { label: 'Henry Schein One: Dentrix (official site)', url: 'https://www.dentrix.com/' },
  openDental: { label: 'Open Dental Software (official site)', url: 'https://www.opendental.com/' },
  openDentalLicense: { label: 'Open Dental Software: License', url: 'https://opendental.com/site/license.html' },
  eaglesoft: { label: 'Patterson Dental: Eaglesoft Dental Practice Management Software', url: 'https://www.pattersondental.com/cp/software/dental-practice-management-software/eaglesoft' },
  curve: { label: 'Curve Dental (official site)', url: 'https://www.curvedental.com/' },
  cmsTransactions: { label: 'CMS: HIPAA Transactions Overview', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions' },
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
};

export const dentalKeywordPostsB: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-practice-management-software',
    title: 'Dental Practice Management Software: How to Choose One',
    seoTitle: 'Dental Practice Management Software: How to Choose',
    metaDescription:
      'What dental practice management software does, cloud vs server-based systems, questions to ask before you buy, and a neutral look at four common products.',
    excerpt:
      'A plain guide to choosing dental practice management software: what it handles, how cloud and server-based systems differ, the billing questions to ask a vendor, and short factual notes on Dentrix, Open Dental, Eaglesoft and Curve Dental.',
    category: 'Practice Management',
    tags: ['dental practice management software', 'dental software', 'Dentrix', 'Open Dental', 'Eaglesoft', 'Curve Dental'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental practice management software is the system a dental office uses to run its schedule, clinical charts, patient ledgers and insurance claims in one place.</strong> Picking one is a long-term decision, because the software shapes how your front desk checks benefits, how claims leave the office and how payments get posted for years afterward. This guide explains what the software does, how cloud and server-based systems differ, which questions to ask before you sign, and how four widely used products are described by their own publishers.</p>

<p>A note on where we stand: Texas Solutions RCM is a dental billing service, not a software vendor. We do not sell, resell or rank any product, and our team works inside whatever system a practice already uses. That gives us a practical view of what matters once the software is live and claims start going out, and that is the angle of this article.</p>

<h2>What does dental practice management software do?</h2>
<p>At its core, dental software connects the clinical side of the office to the business side. When a hygienist completes a procedure, that entry becomes a charge on the patient's ledger, which becomes a line on an insurance claim, which becomes a payment and a write-off when the EOB comes back. Most software for dentists covers these areas:</p>
<ul>
<li><strong>Scheduling.</strong> An appointment book by operatory and provider, hygiene recall lists, confirmations and daily production goals.</li>
<li><strong>Charting.</strong> Tooth charts, perio charting, treatment plans built with CDT codes, and clinical notes. Many systems connect to imaging software for radiographs and intraoral photos.</li>
<li><strong>Patient ledgers.</strong> Charges, payments, adjustments and balances for each patient and family account, plus patient statements.</li>
<li><strong>Insurance claims.</strong> Building claims from completed procedures in the ADA claim format, sending them electronically through a clearinghouse, and tracking which claims are still open.</li>
<li><strong>Eligibility and benefits.</strong> Storing each patient's plan, coverage percentages, deductible, annual maximum and frequency limits. Some systems can also request eligibility electronically.</li>
<li><strong>Reporting.</strong> Production, collections, adjustments, insurance aging and unscheduled treatment.</li>
</ul>
<p>How deep each area goes differs by product and by version. Check the vendor's current documentation rather than relying on a feature list from a third-party review site, which may be out of date.</p>

<h2>Should a dental office choose cloud or server-based software?</h2>
<p>The right choice depends on how many locations you run, who manages your IT and how your team needs to reach patient data. With a server-based (on-premise) system, the database sits on a server that the practice or its IT provider controls, and office workstations connect to it. With a cloud system, the vendor hosts the software and data, and staff sign in through a web browser.</p>
<table>
<thead><tr><th>Question</th><th>Server-based</th><th>Cloud</th></tr></thead>
<tbody>
<tr><td>Where is the data stored?</td><td>On a server the practice or its IT provider manages</td><td>On infrastructure the vendor hosts</td></tr>
<tr><td>Who handles backups and updates?</td><td>Usually the practice or its IT provider</td><td>Mostly the vendor, under its terms</td></tr>
<tr><td>Remote access</td><td>Often needs extra setup, such as a remote desktop connection</td><td>Through a browser with an internet connection</td></tr>
<tr><td>If the internet goes down</td><td>The office can often keep working on its local network</td><td>Access depends on the connection</td></tr>
<tr><td>Several locations</td><td>Possible, usually with more IT planning</td><td>Shared access is part of the design</td></tr>
</tbody>
</table>
<p>Neither model fits every office. Ask each vendor directly how backups, outages, updates and data ownership work under its agreement, and get the answers in writing.</p>

<h2>What should you ask before buying practice management software for a dental office?</h2>
<p>Most demos focus on the schedule and the chart. Those matter, but the revenue side is where a poor fit costs the most. Add these questions to your list.</p>

<h3>Claims, ERAs and eligibility</h3>
<ul>
<li>Which clearinghouses does the software work with, and can the practice choose its own?</li>
<li>Can it send claims as the electronic 837 dental transaction and receive electronic remittance advice (the 835, usually called ERAs)?</li>
<li>Can ERAs post to the ledger automatically, and how are partial payments, write-offs and denials recorded?</li>
<li>Does it support electronic eligibility requests, and which details come back? Frequency history is often missing from electronic responses.</li>
</ul>

<h3>Attachments</h3>
<ul>
<li>How are radiographs, perio charts and narratives sent with claims? Is an attachment service included, or is it a separate subscription?</li>
</ul>

<h3>Reporting</h3>
<ul>
<li>Can you run insurance aging by carrier, a list of denied or unpaid claims, and adjustments by type? Can reports be exported to a spreadsheet?</li>
</ul>

<h3>Data export</h3>
<ul>
<li>If you leave, in what format do you get your data back? Does that include images, clinical notes and full ledger history, and is there a fee?</li>
</ul>

<h3>Security and access</h3>
<ul>
<li>How are user roles and permissions set? Are logins and changes recorded in an audit log? Will the vendor sign a business associate agreement? Ask for the vendor's own security documentation instead of accepting general statements.</li>
</ul>

<h3>Support and training</h3>
<ul>
<li>What support hours and channels are included? Who helps set up fee schedules and insurance plans during a conversion, and what training does the front desk get?</li>
</ul>

<h2>How are Dentrix, Open Dental, Eaglesoft and Curve Dental described?</h2>
<p>These four products are common in U.S. dental offices, and our billing team works in each of them. The notes below are limited to facts stated on each publisher's own website at the time of writing. They are not a ranking or a recommendation, and products change, so confirm current details with each vendor.</p>
<ul>
<li><strong>Dentrix</strong> is published by Henry Schein One. The company also offers Dentrix Ascend, and its website presents the two as a choice between on-premises control and cloud flexibility.</li>
<li><strong>Open Dental</strong> is published by Open Dental Software. It was distributed under an open source license for many years. The company states that the license changed to proprietary in version 24.4, and that the change did not affect customers' price, support or database access.</li>
<li><strong>Eaglesoft</strong> is published by Patterson Dental, which describes it as server-based dental software.</li>
<li><strong>Curve Dental</strong> describes its platform as cloud-based, running in a web browser with no local server for the practice to maintain.</li>
</ul>
<p>Dentrix, Dentrix Ascend, Open Dental, Eaglesoft and Curve Dental are trademarks of their respective owners. Texas Solutions RCM is not affiliated with, endorsed by or sponsored by any of these companies.</p>

<h2>Does the software you pick decide your billing results?</h2>
<p>No. The product matters, but the way it is set up and used every day matters more. Two offices on the same dental practice management software can have very different insurance aging, because billing outcomes depend on habits such as these:</p>
<ul>
<li>Insurance plans and PPO fee schedules set up correctly and attached to the right patients.</li>
<li>Procedures posted the same day with tooth numbers, surfaces and supporting notes.</li>
<li>A daily claim routine: send claims, clear clearinghouse rejections and attach documentation.</li>
<li>EOB and ERA posting that records contractual write-offs correctly and flags payments below the contracted fee.</li>
<li>Regular follow-up on unpaid claims, sorted by age and carrier.</li>
</ul>
<p>Our team works inside each of the four systems above. See our <a href="/services/dentrix-billing-services/">Dentrix billing services</a>, <a href="/services/open-dental-billing-services/">Open Dental billing services</a>, <a href="/services/eaglesoft-billing-services/">Eaglesoft billing services</a> and <a href="/services/curve-dental-billing-services/">Curve Dental billing services</a>, or the overview of our <a href="/services/dental-billing/">dental billing services</a>.</p>

<h2>When does it make sense to switch dental practice software?</h2>
<p>Changing dental practice management software makes sense when the current system blocks how the office needs to work, not just because a newer product looks appealing. Common triggers include opening a second location, a vendor ending support for your version, server hardware that is due for replacement, or reports that cannot answer basic questions about collections and aging.</p>
<p>A conversion takes planning. Patient records, fee schedules, insurance plans, family accounts, ledger balances and open claims all have to move or be reconciled. Many offices keep working open claims in the old system until they are paid, so nothing is lost in the transfer. Set aside time to check balances on a sample of accounts after go-live.</p>

<h2>Are dentist software and dental clinic software the same thing?</h2>
<p>Yes, in everyday use. People search for dentist software, software for a dental clinic or dental practice software, and they almost always mean the same category: a practice management system built around dental charting, CDT codes and dental insurance. Products made for general healthcare offices usually lack tooth charts, perio charting and the ADA claim format, so they are rarely a fit for a dental office.</p>

<p>Not sure your current system is set up to support clean claims and steady collections? <a href="/consultation/">Book a free consultation</a> and we will look at your billing workflow inside the software you already use.</p>
`,
    faqs: [
      {
        q: 'What is dental practice management software?',
        a: 'Dental practice management software is the system a dental office uses to schedule patients, chart treatment, keep patient ledgers, build insurance claims and run reports. It links each completed procedure to a charge, a claim and a payment, so the clinical record and the billing record stay connected. Most products are built around CDT codes and the ADA claim format.',
      },
      {
        q: 'Is cloud dental software better than server-based software?',
        a: 'Neither is better for every office. Server-based systems keep the database on a server the practice controls and can often keep working during an internet outage. Cloud systems are hosted by the vendor and accessed through a browser, which can simplify remote access and multiple locations. Compare backup, update, outage and data export terms before you decide.',
      },
      {
        q: 'Does Texas Solutions RCM sell or recommend dental software?',
        a: 'No. Texas Solutions RCM is a dental billing service, not a software vendor, and is not affiliated with any software company. We do not sell, resell or rank products. Our team works inside the system a practice already uses, including Dentrix, Open Dental, Eaglesoft and Curve Dental, along with the practice\'s clearinghouse and carrier portals.',
      },
      {
        q: 'What billing questions should I ask a dental software vendor?',
        a: 'Ask which clearinghouses it supports, whether it sends electronic claims and receives ERAs, whether ERAs post automatically, how claim attachments are sent and priced, what eligibility details come back electronically, which aging and denial reports are available, and how you get your full data back if you leave. Request the answers in writing.',
      },
      {
        q: 'Will new software fix our insurance collections?',
        a: 'Not on its own. Collections depend on how insurance plans and fee schedules are set up, whether procedures are posted the same day, how quickly rejections are fixed, how carefully EOBs and ERAs are posted, and whether unpaid claims get regular follow-up. New software can help, but only if those workflows are set up and followed every day.',
      },
    ],
    sources: [S.dentrix, S.openDental, S.openDentalLicense, S.eaglesoft, S.curve, S.cmsTransactions],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-billing-software',
    title: 'Dental Billing Software vs Outsourced Billing: What You Need',
    seoTitle: 'Dental Billing Software vs Outsourced Billing',
    metaDescription:
      'What dental billing software covers, which add-on tools offices use for eligibility, attachments and payments, and when software alone is enough for billing.',
    excerpt:
      'Most dental billing features already live in your practice management system. This guide sorts out the add-on tools, explains how accounting software differs, and helps you decide when software is enough and when a billing team helps.',
    category: 'Practice Management',
    tags: ['dental billing software', 'dental insurance verification software', 'dental insurance software', 'dental accounting software', 'outsourced dental billing'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental billing software is any tool a dental office uses to create insurance claims, track what carriers and patients owe, and post payments, and for most practices the core of it already lives inside their practice management system.</strong> So the real question is rarely which billing program to buy. It is whether your current system, plus a few add-on tools, covers the work, or whether the work needs more people. This guide walks through what is built in, what is usually added, how accounting software fits in, and how to tell when software alone is enough.</p>

<p>We write from the billing side. Texas Solutions RCM is a dental billing service, not a software vendor, and we are not affiliated with any software company. Our team works inside the tools a practice already has.</p>

<h2>What is dental billing software?</h2>
<p>Dental billing software is the set of tools that turns completed dentistry into money in the bank. In most offices that set includes the billing module of the practice management system, a clearinghouse, an eligibility or verification tool, a claim attachment service and a patient payment tool. Some practices buy these as one package from their software vendor, and others pick separate products. Either way, the work they support is the same: verify coverage, send clean claims, post what comes back and collect the rest from the patient.</p>

<h2>Which billing features already live in your practice management system?</h2>
<p>Dental practice management systems usually handle the core billing records, because those records have to match the clinical chart. Typical built-in features include:</p>
<ul>
<li><strong>Patient and family ledgers</strong> that show every charge, payment and adjustment.</li>
<li><strong>Insurance plan and fee schedule setup</strong>, including PPO fee schedules attached to each plan.</li>
<li><strong>Claim creation</strong> from posted procedures, using CDT codes and the data elements of the ADA Dental Claim Form.</li>
<li><strong>Claim tracking</strong> that lists sent, unpaid and closed claims.</li>
<li><strong>Payment entry</strong> for EOBs and, in many systems, imported ERAs.</li>
<li><strong>Patient statements</strong> and balance reports.</li>
<li><strong>Aging reports</strong> for insurance and patient balances.</li>
</ul>
<p>What varies is depth. One system may post ERAs automatically while another needs manual entry. One may show claim status from the clearinghouse while another does not. Confirm current features with your vendor before you pay for an add-on that duplicates something you already own.</p>

<h2>What add-on tools do dental offices use for billing?</h2>
<p>Add-ons fill gaps between the practice management system and the carriers. Four types come up most often.</p>

<h3>Eligibility and dental insurance verification software</h3>
<p>Dental insurance verification software checks coverage before the appointment. Some tools send the standard electronic eligibility request and return the response, and others gather data from carrier portals. Common goals are to confirm active coverage, deductible, annual maximum remaining and coverage percentages. Dental details such as frequency history, waiting periods and downgrade rules are not always returned, so many offices still check portals or call the carrier for those. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service covers that full check.</p>

<h3>Claim attachment services</h3>
<p>Crowns, buildups, scaling and root planing, and many surgical procedures often need radiographs, perio charts, photos or a narrative before a carrier will pay. Attachment services send that documentation electronically and link it to the claim. Some are bundled with a clearinghouse, and others are sold separately.</p>

<h3>Clearinghouses</h3>
<p>A clearinghouse takes claims from your system, checks them for formatting errors, sends them to each carrier and returns rejections, claim status and electronic remittances. Claims, eligibility, claim status and remittance advice are all HIPAA standard transactions, which is why most carriers accept them electronically.</p>

<h3>Patient payment tools</h3>
<p>These tools handle online statements, text or email payment links, card on file and payment plans. The key question is whether payments post back to the patient ledger automatically or have to be entered by hand.</p>

<h2>How do these billing tools fit together in a normal day?</h2>
<p>Following one patient through the day shows where each tool does its part. Two days before a hygiene visit, the verification tool or a portal check confirms the plan is active, the patient has not met the cleaning frequency limit and enough of the annual maximum remains. The estimate in the practice management system uses that information, so the patient hears an expected share at check-in.</p>
<p>After the visit, the procedures are posted in the chart and the claim is built from them. If the hygienist also completed scaling and root planing in one quadrant, the attachment service sends the perio chart and radiographs with the claim. The clearinghouse checks the claim and passes it to the carrier, and any rejection comes back the same day or the next.</p>
<p>When the carrier pays, the ERA arrives through the clearinghouse. Each adjustment on it carries a standard claim adjustment reason code that explains why the payment differs from the fee, such as a contractual write-off or a frequency limit. The poster records the payment and write-off on the ledger, then the patient payment tool sends a statement or text link for the remaining balance. Every step involves a tool, and every step also needs a person to check the result.</p>

<h2>Is dental insurance software different from billing software?</h2>
<p>The term dental insurance software is used loosely. It can mean the insurance module inside your practice management system, a standalone verification tool, or the provider portals that many dental carriers run for checking benefits and claim status. When a vendor uses the phrase, ask exactly which tasks the product handles: eligibility, claims, attachments, remittance posting or all of them.</p>

<h2>How is dental accounting software different from billing software?</h2>
<p>Dental accounting software keeps the books for the business, while billing software tracks what each patient and carrier owes. Accounting covers the general ledger, bank reconciliation, accounts payable for lab and supply bills, payroll entries, and the financial statements your accountant uses for taxes. It usually works at the level of daily deposits, not individual patient balances.</p>
<p>The two systems meet at the deposit. Payments posted in the practice management system on a given day should match what landed in the bank, and any difference needs to be explained before the books are closed. Bookkeeping is a separate job from insurance billing. Texas Solutions RCM focuses on billing and revenue cycle work, not bookkeeping or tax preparation.</p>

<h2>When is dental billing software enough on its own?</h2>
<p>Software alone can be enough when the office has trained, steady staff with time set aside for billing every day. Software sends claims, but people decide what to do with a denial, a downgrade or a claim that has sat unpaid for 45 days.</p>
<table>
<thead><tr><th>Software alone may be enough when</th><th>A billing team often helps when</th></tr></thead>
<tbody>
<tr><td>An experienced biller has protected time each day</td><td>Billing is squeezed between phone calls and check-ins</td></tr>
<tr><td>Claims go out daily and rejections are cleared quickly</td><td>Claims or attachments wait days before they are sent</td></tr>
<tr><td>Insurance aging is reviewed and worked every week</td><td>Older claims pile up with no clear follow-up owner</td></tr>
<tr><td>ERAs and EOBs are posted with write-offs checked</td><td>Posting falls behind or underpayments go unnoticed</td></tr>
<tr><td>Staff turnover is low</td><td>Each departure takes billing knowledge with it</td></tr>
</tbody>
</table>
<p>Many offices land in between: they keep the front desk in charge of check-in and estimates, and hand claim submission, posting and follow-up to a billing team working in the same system. Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service is set up for that split. For a fuller comparison of the two models, read <a href="/blog/in-house-vs-outsourced-dental-billing/">in-house vs outsourced dental billing</a>.</p>

<h2>What should you check before adding another billing tool?</h2>
<ul>
<li><strong>Overlap.</strong> Does your practice management system or clearinghouse already do this?</li>
<li><strong>Write-back.</strong> Does the tool post results into the patient record and ledger, or create a second place to check?</li>
<li><strong>Ownership.</strong> Who on the team will use it daily, and who covers when that person is out?</li>
<li><strong>Data handling.</strong> Will the vendor sign a business associate agreement, and how is patient data protected?</li>
<li><strong>Exit terms.</strong> Can you cancel and keep your records?</li>
</ul>
<p>A new tool only helps if someone works its output. A verification tool that nobody reads, or a denial list nobody opens, adds cost without changing collections.</p>

<h2>Which software do we work in?</h2>
<p>Our team bills inside the systems practices already run, including Dentrix, Open Dental, Eaglesoft and Curve Dental, along with each practice's clearinghouse and carrier portals. We do not ask a practice to change its dental billing software or buy a new product to work with us. Dentrix, Open Dental, Eaglesoft and Curve Dental are trademarks of their respective owners. Texas Solutions RCM is not affiliated with, endorsed by or sponsored by any of these companies.</p>

<p>Want to know whether your current setup is enough, or where a billing team would fit? <a href="/consultation/">Book a free consultation</a> and we will review your workflow inside the dental billing software you already use.</p>
`,
    faqs: [
      {
        q: 'Do I need separate dental billing software?',
        a: 'Usually not. Most dental practice management systems already create claims, track them, post payments and print statements. Offices typically add a clearinghouse, an eligibility tool, a claim attachment service or a patient payment tool to fill specific gaps. Check what your current system and clearinghouse already include before buying something that duplicates it.',
      },
      {
        q: 'What does dental insurance verification software do?',
        a: 'It checks a patient\'s coverage before the appointment, usually confirming active coverage, deductible, annual maximum remaining and coverage percentages. Some tools use electronic eligibility requests and others pull from carrier portals. Dental details such as frequency history and waiting periods are not always returned, so offices often confirm those through the portal or a call to the carrier.',
      },
      {
        q: 'Is dental accounting software the same as billing software?',
        a: 'No. Accounting software keeps the business books: general ledger, bank reconciliation, bills, payroll entries and financial statements. Billing software tracks charges, claims and balances for each patient and carrier. The two connect at the daily deposit, where posted payments should match the bank. Texas Solutions RCM handles billing, not bookkeeping or taxes.',
      },
      {
        q: 'When should a dental office outsource billing instead of buying more software?',
        a: 'Consider a billing team when claims or attachments wait days before they go out, insurance aging grows without a clear owner, posting falls behind, or staff turnover keeps resetting billing knowledge. Software automates steps, but someone still has to work denials, downgrades and unpaid claims. Outsourcing adds people who do that work inside your existing system.',
      },
      {
        q: 'Will a billing company make us change our software?',
        a: 'Texas Solutions RCM does not. We are a billing service, not a software vendor, and we are not affiliated with any software company. Our team works inside the practice management system, clearinghouse and carrier portals the practice already uses, including Dentrix, Open Dental, Eaglesoft and Curve Dental. A Business Associate Agreement is signed before we access patient data.',
      },
    ],
    sources: [S.cmsTransactions, S.adaClaimForm, S.adaInsurance, S.x12Carc],
  },
];
