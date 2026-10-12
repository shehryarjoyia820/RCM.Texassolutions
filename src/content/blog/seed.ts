/**
 * Foundational blog articles for rcm.texassolutions.co.
 * Rules: docs/CONTENT-GUIDE.md. Internal links must use slugs from src/content/slugs.ts.
 */

export interface SeedPost {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  tags: string[];
  readingMinutes: number;
  /** Clean HTML: <h2>, <h3>, <p>, <ul>/<ol>/<li>, <strong>, <em>, <a href="/...">, <table><thead><tbody><tr><th><td>, <blockquote>. No <h1>, no inline styles, no images. */
  html: string;
  faqs: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  publishedAt: string; // ISO date
}

const SRC = {
  aapcRcm: { label: 'AAPC: What Is Revenue Cycle Management (RCM)?', url: 'https://www.aapc.com/resources/what-is-revenue-cycle-management' },
  aapcBilling: { label: 'AAPC: What Is Medical Billing?', url: 'https://www.aapc.com/resources/what-is-medical-billing' },
  cmsTransactions: { label: 'CMS: HIPAA Transactions Overview', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions' },
  cmsAdminSimp: { label: 'CMS: Administrative Simplification', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification' },
  cmsEdi: { label: 'CMS: Electronic Billing and EDI Transactions', url: 'https://www.cms.gov/medicare/coding-billing/electronic-billing' },
  cmsNcci: { label: 'CMS: National Correct Coding Initiative (NCCI) Edits', url: 'https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits' },
  cmsIcd10: { label: 'CMS: ICD-10 Codes', url: 'https://www.cms.gov/medicare/coding-billing/icd-10-codes' },
  cdcIcd10: { label: 'CDC/NCHS: ICD-10-CM', url: 'https://www.cdc.gov/nchs/icd/icd-10-cm/index.html' },
  amaCpt: { label: 'AMA: CPT (Current Procedural Terminology)', url: 'https://www.ama-assn.org/practice-management/cpt' },
  amaPa: { label: 'AMA: Prior Authorization', url: 'https://www.ama-assn.org/practice-management/prior-authorization' },
  cms0057: { label: 'CMS: Interoperability and Prior Authorization Final Rule (CMS-0057-F)', url: 'https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f' },
  cmsAppeals: { label: 'CMS: Original Medicare (Fee-for-Service) Appeals', url: 'https://www.cms.gov/medicare/appeals-grievances/fee-for-service' },
  cmsAbn: { label: 'CMS: Advance Beneficiary Notice of Noncoverage (FFS ABN)', url: 'https://www.cms.gov/medicare/forms-notices/beneficiary-notices-initiative/ffs-abn' },
  cmsNsa: { label: 'CMS: No Surprises Act', url: 'https://www.cms.gov/nosurprises' },
  cmsPfs: { label: 'CMS: Physician Fee Schedule', url: 'https://www.cms.gov/medicare/payment/fee-schedules/physician' },
  ecfr42444: { label: 'eCFR: 42 CFR 424.44, Time limits for filing claims', url: 'https://www.ecfr.gov/current/title-42/chapter-IV/subchapter-B/part-424/subpart-C/section-424.44' },
  nucc1500: { label: 'NUCC: 1500 Health Insurance Claim Form', url: 'https://www.nucc.org/index.php/1500-claim-form-mainmenu-35' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  x12Rarc: { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  x12Status: { label: 'X12: Claim Status Category Codes', url: 'https://x12.org/codes/claim-status-category-codes' },
  hfmaMapKeys: { label: 'HFMA: MAP Keys, industry-standard revenue cycle KPIs', url: 'https://www.hfma.org/data-and-insights/map-initiative/map-keys/' },
  mgmaDataDive: { label: 'MGMA DataDive', url: 'https://www.mgma.com/datadive' },
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
};

export const seedPosts: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'what-is-revenue-cycle-management',
    title: 'What Is Revenue Cycle Management in Healthcare?',
    seoTitle: 'What Is Revenue Cycle Management (RCM)? A Plain Guide',
    metaDescription:
      'Revenue cycle management is the process a practice uses to get paid for patient care, from scheduling and eligibility to claims, payments, denials and patient balances.',
    excerpt:
      'A plain-language explanation of revenue cycle management: what it covers, how each stage connects, who owns it, and how practices measure whether it is working.',
    category: 'Revenue Cycle Management',
    tags: ['revenue cycle management', 'RCM basics', 'practice operations', 'medical billing'],
    readingMinutes: 7,
    publishedAt: '2026-10-01',
    html: `
<p><strong>Revenue cycle management (RCM) is the full process a healthcare practice uses to get paid for the care it delivers.</strong> It starts when a patient schedules a visit, continues through insurance verification, documentation, coding and claim submission, and ends only when the payer and the patient have paid their shares and the account balance reaches zero.</p>

<p>That definition sounds simple, but the revenue cycle touches almost every person in a practice: the front desk, providers, coders, billers and whoever answers patient billing calls. When one stage slips, the problem usually shows up weeks later as a denial, an unpaid balance or a patient who is surprised by a bill. This guide walks through the stages, explains how they connect, and covers how practices measure whether their revenue cycle is healthy.</p>

<h2>Why is it called a "cycle"?</h2>
<p>It is called a cycle because every patient encounter moves through the same repeating sequence, and information gathered early in the sequence determines what happens later. A wrong insurance ID entered at check-in becomes a rejected claim. A missing prior authorization becomes a denial. A denial that is never worked becomes revenue the practice earned but never collected.</p>
<p>The cycle also feeds itself. Patterns in denials and payment delays point back to front-end steps that need attention, so a well-run revenue cycle uses its own results to improve the next round of claims.</p>

<h2>What are the stages of the revenue cycle?</h2>
<p>Different organizations draw the lines slightly differently, but most describe three broad phases: front end, middle, and back end.</p>

<h3>Front end: before and at the visit</h3>
<ul>
<li><strong>Scheduling and registration.</strong> Capturing accurate demographics, insurance details and the reason for the visit.</li>
<li><strong>Eligibility and benefits verification.</strong> Confirming active coverage and understanding copays, deductibles and coinsurance before the patient is seen. Electronically, this is the HIPAA standard 270/271 eligibility inquiry and response.</li>
<li><strong>Prior authorization.</strong> Getting payer approval in advance for services that require it.</li>
<li><strong>Patient financial communication.</strong> Explaining expected costs and collecting time-of-service payments where appropriate.</li>
</ul>

<h3>Middle: documenting and coding the care</h3>
<ul>
<li><strong>Clinical documentation.</strong> The provider's note is the foundation of the claim. If it is not documented, it generally cannot be billed.</li>
<li><strong>Medical coding.</strong> Translating the visit into standardized code sets: ICD-10-CM for diagnoses, CPT and HCPCS for procedures and services, and CDT for dental procedures.</li>
<li><strong>Charge capture and charge entry.</strong> Making sure every billable service is recorded in the practice management system with the right codes, units and modifiers.</li>
</ul>

<h3>Back end: getting paid</h3>
<ul>
<li><strong>Claim scrubbing and submission.</strong> Checking claims against payer and coding edits, then sending them electronically as an 837 transaction through a clearinghouse.</li>
<li><strong>Payment posting.</strong> Recording payments and adjustments from the electronic remittance advice (the 835 transaction) and from patient payments.</li>
<li><strong>Denial management.</strong> Working claims the payer denied, correcting and resubmitting them or filing appeals.</li>
<li><strong>Accounts receivable follow-up.</strong> Chasing unpaid claims before they age past filing or appeal deadlines.</li>
<li><strong>Patient billing and collections.</strong> Sending clear statements and helping patients resolve their balances.</li>
<li><strong>Reporting and analysis.</strong> Tracking key metrics and feeding what you learn back into the front end.</li>
</ul>
<p>You can see how these stages fit together in our overview of <a href="/services/revenue-cycle-management">revenue cycle management services</a>.</p>

<h2>Why does revenue cycle management matter so much?</h2>
<p>For most independent practices, insurance payments and patient payments are the only meaningful sources of income. The practice delivers the care first and gets paid later, sometimes much later. Every day a claim sits unpaid is a day the practice is effectively lending money to a payer.</p>
<p>RCM matters for three practical reasons:</p>
<ol>
<li><strong>Cash flow.</strong> Payroll, rent and supplies are due on a schedule. Revenue that arrives late, or not at all, creates strain even when the schedule is full.</li>
<li><strong>Compliance.</strong> Billing must follow payer rules and federal requirements. Coding that does not match documentation creates audit risk, not just denials.</li>
<li><strong>Patient experience.</strong> Patients judge a practice partly by its bills. Confusing statements and surprise balances damage trust in a way that clinical care alone cannot fix.</li>
</ol>

<h2>Where do revenue cycles usually break down?</h2>
<p>Problems tend to cluster in a few predictable places:</p>
<ul>
<li><strong>Registration errors.</strong> Misspelled names, wrong dates of birth, outdated insurance cards and missing secondary coverage.</li>
<li><strong>Skipped verification.</strong> Coverage that ended last month, or a plan that needs a referral the practice did not obtain. A consistent <a href="/services/insurance-eligibility-verification">insurance eligibility verification</a> routine catches many of these before the visit.</li>
<li><strong>Coding and documentation gaps.</strong> Missing modifiers, unsupported diagnosis codes, or code pairs that trigger edits such as the CMS National Correct Coding Initiative.</li>
<li><strong>Unworked denials.</strong> A denial is not a final answer. Many denied claims can be corrected or appealed, but only if someone works them before the deadline. This is the core of <a href="/services/denial-management">denial management</a>.</li>
<li><strong>Aging accounts receivable.</strong> Claims that receive no response at all are easy to forget. Without regular follow-up, they can pass the payer's timely filing limit. For Original Medicare, claims generally must be filed within 12 months of the date of service under 42 CFR 424.44; commercial payers set their own limits in contracts.</li>
</ul>

<h2>Who is responsible for revenue cycle management?</h2>
<p>In a small practice, RCM is often split between a front desk team and one or two billers, with the practice owner or office manager watching the numbers. Larger groups may have a dedicated revenue cycle director, coders, and specialized teams for denials and <a href="/services/accounts-receivable-management">accounts receivable management</a>.</p>
<p>Many practices also work with an outside RCM partner for some or all of the cycle. Some outsource only the back end, such as claims and follow-up. Others hand over most of the cycle and keep scheduling and check-in in house. The right split depends on the practice's size, specialty, payer mix and the depth of its current staff.</p>

<h2>How do you measure revenue cycle performance?</h2>
<p>Practices use a small set of key performance indicators (KPIs) to see whether the cycle is working. The Healthcare Financial Management Association (HFMA) publishes standardized definitions for many of these through its MAP Keys, and MGMA publishes benchmarking data for medical groups. Common measures include:</p>
<ul>
<li><strong>Net collection rate:</strong> how much of the collectible amount the practice actually collected.</li>
<li><strong>Days in accounts receivable:</strong> how long, on average, it takes to get paid.</li>
<li><strong>Denial rate:</strong> the share of claims the payer denies.</li>
<li><strong>Clean claim rate:</strong> the share of claims that pass edits and are accepted on first submission.</li>
<li><strong>AR aging:</strong> how much money sits in each age bucket (0 to 30 days, 31 to 60, and so on).</li>
</ul>
<p>Our <a href="/tools/rcm-performance-scorecard">RCM performance scorecard</a> gives you a simple way to review these measures together. The point is not a single perfect number but a trend: are claims getting paid faster and more completely over time?</p>

<h2>How can a practice start improving its revenue cycle?</h2>
<p>Start with visibility. Pull your current AR aging report, your denial list for the last 90 days, and your collection totals. Look for the biggest buckets: which payers, which denial reasons, which age ranges. Then work backward to the stage that created the problem.</p>
<p>A few habits help almost every practice:</p>
<ul>
<li>Verify eligibility before every visit, not only for new patients.</li>
<li>Track prior authorization requirements by payer and service.</li>
<li>Review denials weekly and group them by root cause.</li>
<li>Work aged claims on a fixed schedule, oldest and largest first.</li>
<li>Give patients clear cost estimates and easy ways to pay.</li>
</ul>
` + '<h2>Need help mapping your own revenue cycle?</h2><p>If you want to see where your own cycle loses time or money, <a href="/consultation">book a free consultation</a>. We will walk through each stage with you, from scheduling to the last patient balance, and point out the steps that most need attention.</p>',
    faqs: [
      {
        q: 'What is the difference between RCM and medical billing?',
        a: 'Medical billing is one part of revenue cycle management. Billing focuses on creating and submitting claims and following up on payment, while RCM covers the whole financial process from scheduling and eligibility through coding, payment posting, denials, patient collections and reporting.',
      },
      {
        q: 'What are the main stages of revenue cycle management?',
        a: 'The main stages are front end (scheduling, registration, eligibility verification and prior authorization), middle (documentation, coding and charge entry) and back end (claim submission, payment posting, denial management, AR follow-up and patient billing).',
      },
      {
        q: 'Is revenue cycle management only for large hospitals?',
        a: 'No. Every practice that bills insurance or patients has a revenue cycle, whether it is a solo office or a large health system. Smaller practices often have fewer staff covering more stages, which makes clear processes even more important.',
      },
      {
        q: 'How do I know if my revenue cycle has problems?',
        a: 'Rising days in AR, a growing share of claims over 90 days old, frequent repeat denials for the same reasons, and patient complaints about bills are common warning signs. Reviewing a few core KPIs monthly will usually show where to look first.',
      },
    ],
    sources: [SRC.aapcRcm, SRC.cmsTransactions, SRC.ecfr42444, SRC.cmsNcci, SRC.hfmaMapKeys, SRC.mgmaDataDive],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'how-medical-billing-works',
    title: 'How Medical Billing Works, Step by Step',
    seoTitle: 'How Medical Billing Works: Step-by-Step From Visit to Payment',
    metaDescription:
      'A step-by-step walk through the medical billing process: scheduling, eligibility, coding, charge entry, claim submission, adjudication, payment posting and patient billing.',
    excerpt:
      'Follow a single patient visit through the medical billing process, from the appointment request to the final zero balance, and learn what can go wrong at each step.',
    category: 'Medical Billing',
    tags: ['medical billing', 'claims process', 'billing workflow', 'practice operations'],
    readingMinutes: 8,
    publishedAt: '2026-10-02',
    html: `
<p><strong>Medical billing works by turning a patient visit into a standardized insurance claim, sending it to the payer, and collecting whatever the payer and the patient owe.</strong> The process runs from scheduling and insurance verification, through coding and claim submission, to payer adjudication, payment posting, patient statements and follow-up on anything left unpaid.</p>

<p>Below, we follow a single office visit through every step. Seeing the whole path makes it easier to understand why a small mistake at check-in can turn into a denial six weeks later.</p>

<h2>Step 1: How does scheduling affect billing?</h2>
<p>Billing starts when the appointment is booked. The scheduler records who the patient is, why they are coming in, and which insurance they plan to use. The reason for the visit matters because some services require a referral or prior authorization, and some plans only cover certain providers or locations.</p>
<p>A good scheduling workflow flags new patients, changes in insurance, and services that are known to need approval, so the next steps can happen before the visit rather than after.</p>

<h2>Step 2: Registration and eligibility verification</h2>
<p>At or before check-in, the front desk confirms the patient's demographics and scans current insurance cards. Small details matter: the name and date of birth must match what the payer has on file, and the member ID must be current.</p>
<p>The practice then checks eligibility, usually through the electronic 270/271 transaction or a payer portal. Verification answers practical questions: Is coverage active on the date of service? Is the practice in network? What are the copay, deductible and coinsurance? Is there secondary coverage? Strong <a href="/services/patient-registration">patient registration</a> habits prevent a large share of downstream rejections.</p>

<h2>Step 3: Prior authorization, when required</h2>
<p>Some services need payer approval before they are performed. Imaging, certain procedures, specialty drugs and some therapies commonly fall into this group, but requirements vary by payer and plan. If an authorization is required and missing, the claim can be denied even when the care was appropriate.</p>
<p>For Medicare Advantage, Medicaid, CHIP and certain marketplace plans, the CMS Interoperability and Prior Authorization Final Rule (CMS-0057-F) set decision timeframes for these impacted payers starting in 2026, but the practice still has to submit complete requests on time.</p>

<h2>Step 4: The visit and clinical documentation</h2>
<p>The provider sees the patient and documents the encounter in the EHR. The note records the history, exam, medical decision making, procedures performed and the diagnoses supporting them. From a billing point of view, the documentation is the evidence. Every code on the claim must be supported by the note.</p>

<h2>Step 5: Medical coding</h2>
<p>A coder, or the provider with coding support, translates the documentation into codes:</p>
<ul>
<li><strong>ICD-10-CM</strong> codes describe the diagnoses. They are maintained in the US by the CDC's National Center for Health Statistics together with CMS.</li>
<li><strong>CPT</strong> codes, maintained by the AMA, describe most procedures and services, including office visits.</li>
<li><strong>HCPCS Level II</strong> codes describe supplies, drugs and some services not in CPT.</li>
<li><strong>Modifiers</strong> add context, such as a distinct procedure or a bilateral service.</li>
</ul>
<p>Accurate <a href="/services/medical-coding">medical coding</a> is about matching the documentation, not about choosing the highest-paying code. Under-coding leaves earned revenue behind, and over-coding creates compliance risk.</p>

<h2>Step 6: Charge entry and claim creation</h2>
<p>The codes, units, provider details, place of service and fees are entered into the practice management system, often automatically from the EHR. The system builds a claim. For professional services, the paper version is the CMS-1500 form maintained by the National Uniform Claim Committee (NUCC); the electronic version is the HIPAA standard 837P transaction. Institutional claims use the UB-04 and 837I.</p>

<h2>Step 7: Claim scrubbing and submission</h2>
<p>Before the claim leaves the practice, billing software and the clearinghouse check it for errors: missing fields, invalid code combinations, mismatched patient data and payer-specific rules. Claims that fail these checks are rejected back to the practice to fix. Claims that pass are forwarded to the payer.</p>
<p>A rejection is different from a denial. A rejected claim never entered the payer's adjudication system, so it can usually be corrected and resent. A routine of reviewing clearinghouse rejection reports every business day keeps these from piling up and protects the claim's filing window.</p>

<h2>Step 8: Payer adjudication</h2>
<p>The payer reviews the claim against the patient's coverage, the provider's contract, medical policies and coding edits. It then decides to pay the claim in full, pay part of it, or deny it. Practices can check progress with the 276/277 claim status transaction or the payer's portal. X12 maintains the claim status category codes that describe where a claim stands.</p>

<h2>Step 9: Remittance and payment posting</h2>
<p>When the payer finishes, it sends payment (usually by electronic funds transfer) and an explanation. The electronic version is the 835 remittance advice (ERA); the paper version is an explanation of benefits (EOB). The remittance uses Claim Adjustment Reason Codes (CARCs) and Remittance Advice Remark Codes (RARCs) to explain every adjustment, such as a contractual write-off or an amount assigned to the patient as a deductible.</p>
<p>The billing team posts these payments and adjustments to each patient account. Careful <a href="/services/payment-posting">payment posting</a> matters because it reveals underpayments, denials and the true patient balance. If you are new to reading these documents, our guide to the <a href="/tools/eob-explained">explanation of benefits</a> breaks down each section.</p>

<h2>Step 10: Denials, corrections and appeals</h2>
<p>If all or part of a claim is denied, the team reviews the reason codes, fixes what can be fixed, and either submits a corrected claim or files an appeal. Original Medicare has five levels of appeal, starting with a redetermination by the Medicare Administrative Contractor. Commercial payers have their own appeal rules and deadlines, set out in provider manuals and contracts.</p>

<h2>Step 11: Patient statements and collections</h2>
<p>After insurance has paid, the remaining patient responsibility is billed to the patient. Clear statements, multiple payment options and friendly follow-up help patients pay. For uninsured or self-pay patients, the No Surprises Act requires providers to give a good faith estimate of expected charges for scheduled services when requested or when the service is scheduled in advance.</p>

<h2>Step 12: AR follow-up and reporting</h2>
<p>Any claim that has not been paid or resolved moves into accounts receivable follow-up. Billers call payers or check portals, resubmit when needed, and escalate stuck claims. Meanwhile, the practice tracks metrics such as days in AR, denial rate and net collection rate to see whether the process is working.</p>

<h2>What usually goes wrong in medical billing?</h2>
<ul>
<li>Incorrect or outdated insurance information captured at registration.</li>
<li>Missing prior authorizations or referrals.</li>
<li>Documentation that does not support the codes billed.</li>
<li>Claims submitted after the payer's timely filing limit.</li>
<li>Denials and underpayments that are posted but never worked.</li>
</ul>
<h2>How long does the whole billing process take?</h2>
<p>There is no single answer, because the timeline depends on the payer, the type of service and how clean the claim is when it leaves the practice. A straightforward office visit billed electronically to a payer with an active, verified policy can move from visit to posted payment fairly quickly. A claim that needs medical records, waits on an authorization or bounces back as a rejection can take months.</p>
<p>What the practice controls is the time on its own side of the process: how quickly notes are signed, how quickly charges are entered, how fast rejections are corrected, and how soon unpaid claims are followed up. Shortening those internal delays is usually the most reliable way to speed up payment.</p>

<p>Most of these are process problems, not individual mistakes. A clear workflow with checks at each step is what keeps a practice's <a href="/services/medical-billing">medical billing</a> moving.</p>
` + '<h2>Want someone to check your billing workflow?</h2><p>If your claims seem to take longer than they should, <a href="/consultation">ask for a free consultation</a>. We will review how a typical claim moves through your office and where it tends to wait, using your own system data.</p>',
    faqs: [
      {
        q: 'How long does it take to get paid on a medical claim?',
        a: 'It varies by payer and claim type. Clean electronic claims are often processed within a few weeks, while claims that are rejected, denied or need records can take much longer. Prompt payment rules and contract terms also differ by state and payer.',
      },
      {
        q: 'What is the difference between a rejected claim and a denied claim?',
        a: 'A rejected claim failed front-end checks at the clearinghouse or payer and was never adjudicated, so it can usually be fixed and resent. A denied claim was processed and the payer decided not to pay, which requires a corrected claim or an appeal.',
      },
      {
        q: 'What forms are used for medical claims?',
        a: 'Professional claims use the CMS-1500 form on paper or the 837P electronic transaction, and institutional claims use the UB-04 or the 837I. Most claims today are sent electronically through a clearinghouse.',
      },
      {
        q: 'What is an ERA in medical billing?',
        a: 'An ERA, or electronic remittance advice, is the HIPAA standard 835 transaction a payer sends to explain how each claim was paid, adjusted or denied. It uses standard reason and remark codes so the practice can post payments accurately.',
      },
    ],
    sources: [SRC.aapcBilling, SRC.cmsTransactions, SRC.nucc1500, SRC.cdcIcd10, SRC.amaCpt, SRC.x12Carc, SRC.cmsAppeals, SRC.cmsNsa],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'how-to-calculate-net-collection-rate',
    title: 'How to Calculate Net Collection Rate',
    seoTitle: 'How to Calculate Net Collection Rate (Formula and Examples)',
    metaDescription:
      'Learn the net collection rate formula, how it differs from gross collection rate, which adjustments to include, and how to calculate it correctly with worked examples.',
    excerpt:
      'The net collection rate shows how much of the money your practice is entitled to actually gets collected. Here is the formula, a worked example, and the mistakes that distort it.',
    category: 'RCM Tools and Guides',
    tags: ['net collection rate', 'KPIs', 'RCM metrics', 'calculators'],
    readingMinutes: 7,
    publishedAt: '2026-10-03',
    html: `
<p><strong>To calculate net collection rate, divide total payments received by total charges minus contractual adjustments, then multiply by 100.</strong> The result shows what percentage of the money your practice was actually entitled to collect, after payer contract write-offs, was collected. It measures how well your billing captures allowed revenue, not how high your fees are.</p>

<p>Net collection rate (sometimes called adjusted collection rate) is one of the most useful single measures of billing performance. This guide covers the formula, a worked example, how to choose the right time period, and the common mistakes that make the number look better or worse than reality. You can run your own numbers with our <a href="/tools/net-collection-rate-calculator">net collection rate calculator</a>.</p>

<h2>What is the net collection rate formula?</h2>
<blockquote>
<p>Net collection rate = Payments / (Charges minus Contractual adjustments) x 100</p>
</blockquote>
<ul>
<li><strong>Payments</strong> are all money received for the services in the period: insurance payments plus patient payments, minus any refunds.</li>
<li><strong>Charges</strong> are your gross billed charges at your standard fee schedule.</li>
<li><strong>Contractual adjustments</strong> are the amounts you are required to write off because of payer contracts or fee schedules, the difference between your charge and the allowed amount.</li>
</ul>
<p>The denominator, charges minus contractual adjustments, is effectively the total allowed amount: what payers and patients together owe you under your agreements.</p>

<h2>What does a worked example look like?</h2>
<p>Suppose a practice reviews a single quarter of services:</p>
<table>
<thead>
<tr><th>Item</th><th>Amount</th></tr>
</thead>
<tbody>
<tr><td>Gross charges</td><td>$500,000</td></tr>
<tr><td>Contractual adjustments</td><td>$200,000</td></tr>
<tr><td>Allowed amount (charges minus contractuals)</td><td>$300,000</td></tr>
<tr><td>Payments received (insurance plus patient, net of refunds)</td><td>$282,000</td></tr>
</tbody>
</table>
<p>Net collection rate = $282,000 / $300,000 x 100 = <strong>94 percent</strong>.</p>
<p>In plain terms, the practice collected 94 cents of every dollar it was entitled to. The remaining $18,000 is either still in accounts receivable, written off as bad debt, or lost to denials, underpayments and timely filing write-offs. Those are the dollars worth investigating.</p>
<p>These figures are illustrative only and are not a benchmark.</p>

<h2>How is net collection rate different from gross collection rate?</h2>
<p>Gross collection rate divides payments by total charges, without removing contractual adjustments:</p>
<blockquote>
<p>Gross collection rate = Payments / Charges x 100</p>
</blockquote>
<p>Using the example above, the gross rate is $282,000 / $500,000 = 56.4 percent. That number mostly reflects how your fee schedule compares to what payers allow. If you raise your fees, the gross rate falls even though nothing about your collections changed. That is why most practices rely on net collection rate to judge billing performance. You can compare both with our <a href="/tools/gross-collection-rate-calculator">gross collection rate calculator</a>.</p>

<h2>Which adjustments should you include or exclude?</h2>
<p>This is where most calculation errors happen. Only adjustments the practice is <em>contractually required</em> to take belong in the denominator. Adjustments that represent lost revenue should not be subtracted, because doing so hides the problem.</p>
<table>
<thead>
<tr><th>Adjustment type</th><th>Subtract from charges?</th><th>Why</th></tr>
</thead>
<tbody>
<tr><td>Contractual (allowed amount difference)</td><td>Yes</td><td>Required by the payer contract or fee schedule</td></tr>
<tr><td>Timely filing write-off</td><td>No</td><td>Revenue lost to a missed deadline</td></tr>
<tr><td>Denial write-off (uncorrected, unappealed)</td><td>No</td><td>Revenue that might have been recovered</td></tr>
<tr><td>Bad debt or collections write-off</td><td>No</td><td>Patient balance the practice did not collect</td></tr>
<tr><td>Small balance write-off</td><td>No</td><td>A practice choice, not a payer requirement</td></tr>
<tr><td>Administrative or courtesy adjustment</td><td>Generally no</td><td>A practice choice that reduces collected revenue</td></tr>
</tbody>
</table>
<p>If your practice management system lumps all adjustments into one category, the net collection rate it reports may look close to perfect while real money is being written off. Separating adjustment codes is often the first fix.</p>

<h2>What time period should you use?</h2>
<p>Payments lag behind charges. A claim for a visit in March may not be paid until April or May. If you compare one month's payments with the same month's charges, the result can swing for reasons that have nothing to do with performance.</p>
<p>Two common approaches reduce this distortion:</p>
<ul>
<li><strong>Use a longer window,</strong> such as a rolling 6 or 12 months, so timing differences even out.</li>
<li><strong>Use a lagged window,</strong> for example charges from a period that ended 90 or 120 days ago, compared with all payments posted for those dates of service so far.</li>
</ul>
<p>Whichever method you choose, use it consistently so month-to-month trends mean something.</p>

<h2>What causes a low net collection rate?</h2>
<p>When the rate drops, the missing money usually falls into a few groups:</p>
<ul>
<li><strong>Unworked denials.</strong> Claims denied for fixable reasons that were never corrected or appealed.</li>
<li><strong>Underpayments.</strong> Payers paying less than the contracted rate. These are easy to miss unless payments are compared against expected allowed amounts. <a href="/services/underpayment-identification">Underpayment identification</a> focuses on exactly this gap.</li>
<li><strong>Timely filing losses.</strong> Claims that were submitted, rejected, or forgotten until the filing window closed.</li>
<li><strong>Patient balances.</strong> Deductibles and coinsurance that were never collected at the visit or after.</li>
<li><strong>Posting errors.</strong> Payments or adjustments posted to the wrong account or with the wrong code, which can hide both underpayments and denials. Accurate <a href="/services/payment-posting">payment posting</a> is what makes the metric trustworthy.</li>
</ul>

<h2>How can you use net collection rate alongside other metrics?</h2>
<p>Net collection rate tells you <em>how much</em> you collected, but not <em>how fast</em>. Pair it with days in accounts receivable and AR aging to see whether money is slow as well as missing. Add denial rate to see how much of the gap comes from payer decisions. HFMA's MAP Keys define many of these measures in a standardized way, which helps if you compare results across locations or time periods.</p>
<p>Regular <a href="/services/rcm-analytics-reporting">RCM analytics and reporting</a> brings these numbers together in one view, so a change in one metric can be traced to its cause.</p>

<h2>Should you calculate it by payer?</h2>
<p>Yes, once you have a practice-wide number you trust. A single overall rate can hide large differences between payers. One commercial plan may be paying nearly everything it owes while another is quietly underpaying or denying a specific service. Calculating the net collection rate for each major payer, and for each provider or location, shows where the gap actually sits.</p>
<p>To do this well, you need reliable allowed amounts. For contracted payers, that means having current fee schedules loaded in your system so expected payments can be compared with actual payments. For Medicare, the CMS Physician Fee Schedule provides the published payment amounts that participating providers can use as a reference, adjusted for locality.</p>

<h2>How does patient responsibility affect the number?</h2>
<p>Patient payments are part of the numerator, so uncollected deductibles, coinsurance and copays lower the rate just as unpaid insurance claims do. As more patients carry high-deductible plans, the patient share of the allowed amount grows, and patient collections have a larger effect on the overall result.</p>
<p>If your rate is slipping while insurance payments look steady, review time-of-service collections, the clarity of your statements and how quickly patient balances are followed up.</p>

<h2>A quick checklist for calculating it correctly</h2>
<ol>
<li>Confirm your adjustment codes separate contractual adjustments from all other write-offs.</li>
<li>Pick a time window that accounts for payment lag.</li>
<li>Include both insurance and patient payments, net of refunds.</li>
<li>Calculate monthly using the same method and watch the trend.</li>
<li>When the rate drops, drill into denials, underpayments and write-offs by payer.</li>
</ol>
` + '<h2>Not sure your collection rate is accurate?</h2><p>Getting the inputs right matters more than the formula. If you would like a second opinion on how your practice calculates and reads this number, <a href="/consultation">request a free consultation</a> and bring a recent month of figures.</p>',
    faqs: [
      {
        q: 'What is the formula for net collection rate?',
        a: 'Net collection rate equals total payments divided by total charges minus contractual adjustments, multiplied by 100. The denominator represents the amount you were entitled to collect under your payer contracts and fee schedules.',
      },
      {
        q: 'Should bad debt be subtracted in the net collection rate?',
        a: 'No. Only contractually required adjustments should be subtracted. Bad debt, timely filing write-offs and unappealed denial write-offs are lost revenue, so subtracting them would hide the very problems the metric is meant to reveal.',
      },
      {
        q: 'Why is my gross collection rate so much lower than my net collection rate?',
        a: 'Gross collection rate compares payments to full billed charges, which are usually much higher than what payers allow. The gap mainly reflects your fee schedule, which is why net collection rate is the better measure of billing performance.',
      },
      {
        q: 'How often should a practice calculate net collection rate?',
        a: 'Most practices review it monthly using a consistent method, often a rolling or lagged window that accounts for the time between service and payment. The trend over several months is more meaningful than any single month.',
      },
    ],
    sources: [SRC.hfmaMapKeys, SRC.mgmaDataDive, SRC.x12Carc, SRC.cmsPfs],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'how-to-reduce-claim-denials',
    title: 'How to Reduce Claim Denials in Medical Billing',
    seoTitle: 'How to Reduce Claim Denials: A Practical Guide for Practices',
    metaDescription:
      'Practical steps to reduce claim denials: find root causes with reason codes, fix front-end errors, track prior authorizations, scrub claims, and build a denial prevention routine.',
    excerpt:
      'Most denials trace back to a handful of preventable causes. Learn how to find yours with reason codes and build a routine that stops repeat denials at the source.',
    category: 'Denial Management',
    tags: ['claim denials', 'denial management', 'denial prevention', 'CARC codes'],
    readingMinutes: 8,
    publishedAt: '2026-10-04',
    html: `
<p><strong>To reduce claim denials, find out why your claims are being denied, then fix the process that causes each reason.</strong> In practice that means tracking denials by reason code and payer, verifying eligibility before every visit, managing prior authorizations, coding to the documentation, scrubbing claims before submission, and reviewing denial patterns on a regular schedule.</p>

<p>Working denials after they happen is necessary, but it is the expensive end of the problem. Every denial costs staff time to research, correct and resubmit, and some are never recovered. This guide focuses on prevention: how to identify the causes behind your denials and build habits that stop them from repeating.</p>

<h2>What is a claim denial?</h2>
<p>A denial happens when a payer processes a claim and decides not to pay all or part of it. It is different from a rejection, which happens when a claim fails front-end checks and never enters adjudication. Rejections can usually be fixed and resent quickly. Denials require a corrected claim, a reconsideration or a formal appeal, each with its own deadlines.</p>
<p>Payers explain denials on the remittance using Claim Adjustment Reason Codes (CARCs) and Remittance Advice Remark Codes (RARCs), published by X12. Learning to read these codes is the starting point for any prevention effort.</p>

<h2>Step 1: How do you find the root causes of your denials?</h2>
<p>Pull every denial from the last 90 days and sort them by:</p>
<ul>
<li><strong>Reason code</strong> (the CARC, plus any RARC that adds detail)</li>
<li><strong>Payer</strong></li>
<li><strong>Provider and location</strong></li>
<li><strong>Service or procedure code</strong></li>
<li><strong>Dollar amount</strong></li>
</ul>
<p>Then group the reasons into categories that point to a responsible process: registration and eligibility, authorization, coding, documentation, timely filing, duplicate claims, and payer policy or medical necessity. Usually a few categories account for most of the denials and most of the dollars. Those are your priorities. Our <a href="/tools/denial-reasons-guide">denial reasons guide</a> explains common reason codes in plain language.</p>
<p>Measure your starting point too. The <a href="/tools/denial-rate-calculator">denial rate calculator</a> gives you a baseline you can track as changes take effect.</p>

<h2>Step 2: Fix registration and eligibility errors</h2>
<p>Eligibility and demographic problems are among the most preventable denials. Common examples include coverage that terminated, a patient name that does not match the payer's records, a wrong member ID, or a missing secondary payer.</p>
<ul>
<li>Verify eligibility for every visit, not just new patients. Coverage changes at any time.</li>
<li>Scan the front and back of insurance cards at each visit and compare them to the file.</li>
<li>Ask every patient about other coverage to set coordination of benefits correctly.</li>
<li>Use the 270/271 eligibility transaction or payer portals to confirm benefits and network status.</li>
</ul>

<h2>Step 3: Manage prior authorizations and referrals</h2>
<p>Missing authorization denials are frustrating because the care was often appropriate. Prevention depends on knowing which services need approval for which payers, and checking before scheduling.</p>
<ul>
<li>Keep an authorization matrix by payer and service, and update it when payers change their lists.</li>
<li>Record the authorization number, approved units and date range in the practice management system.</li>
<li>Track authorizations that are about to expire or run out of approved visits.</li>
<li>Confirm the authorization matches what was actually performed. A different code or extra units can still be denied.</li>
</ul>
<p>The AMA continues to document the administrative burden of prior authorization, and CMS's Interoperability and Prior Authorization Final Rule (CMS-0057-F) sets requirements for certain impacted payers. Even so, the practice remains responsible for obtaining approval. Dedicated <a href="/services/prior-authorization">prior authorization</a> support keeps this from falling through the cracks.</p>

<h2>Step 4: Code accurately and document completely</h2>
<p>Coding denials include invalid or deleted codes, missing or incorrect modifiers, diagnosis codes that do not support the procedure, and code pairs that conflict with edits such as the CMS National Correct Coding Initiative (NCCI).</p>
<ul>
<li>Update code sets on schedule. ICD-10-CM updates take effect each October 1, and CPT and HCPCS have their own annual and quarterly updates.</li>
<li>Code to the highest specificity the documentation supports.</li>
<li>Apply modifiers only when the documentation supports them.</li>
<li>Give providers feedback when documentation gaps cause denials, using real examples.</li>
</ul>

<h2>Step 5: Scrub claims before they go out</h2>
<p>Claim scrubbing checks each claim against coding edits, payer rules and required fields before submission. Most clearinghouses and billing systems include basic scrubbing, but the rules need tuning. When you see a denial pattern, ask whether a scrubber rule could have caught it, and add one if so.</p>
<p>Review clearinghouse rejections daily. A rejection left unworked for weeks can turn into a timely filing denial. Consistent <a href="/services/claims-scrubbing">claims scrubbing</a> is one of the most direct ways to reduce avoidable denials.</p>

<h2>Step 6: Watch timely filing and duplicate claim denials</h2>
<p>Timely filing denials are almost always final. Original Medicare generally requires claims to be filed within 12 months of the date of service, and commercial and Medicaid plans set their own limits, which can be much shorter. Keep a list of filing limits by payer, and monitor claims that have no payer response so they can be followed up well before the deadline.</p>
<p>Duplicate claim denials often result from resubmitting a claim that is still processing. Check claim status before resending, and use the correct claim frequency code when submitting a corrected claim.</p>

<h2>Step 7: Work the denials you do get, quickly</h2>
<p>Prevention will never eliminate every denial. For those that come through:</p>
<ul>
<li>Work denials in order of dollar value and deadline.</li>
<li>Decide whether a corrected claim, a reconsideration or a formal appeal is the right path.</li>
<li>Include the documentation that directly addresses the denial reason.</li>
<li>Track appeal outcomes so you know which approaches work with each payer.</li>
</ul>
<p>Original Medicare has five appeal levels, beginning with a redetermination that generally must be requested within 120 days of receiving the initial determination. Commercial payer deadlines vary by contract. A structured <a href="/services/denial-management">denial management</a> process makes sure nothing ages out.</p>

<h2>How do medical necessity denials fit in?</h2>
<p>Some denials say, in effect, that the payer does not consider the service medically necessary for the diagnosis billed. These often trace back to payer coverage policies that list which diagnoses support a given test or procedure, how often it can be performed, or what must be tried first.</p>
<p>Prevention here starts with knowing the policy before the service. For Original Medicare, national and local coverage determinations describe coverage conditions. When a Medicare service may not be covered, an Advance Beneficiary Notice of Noncoverage (ABN) gives the patient notice in advance and lets them decide whether to proceed and accept financial responsibility. Commercial payers publish their own medical policies, which change regularly.</p>
<p>When these denials do occur, the appeal should show clearly how the documentation meets the policy criteria. A short cover letter that quotes the relevant policy section and points to the specific note is usually more effective than sending the entire chart.</p>

<h2>Step 8: Make denial prevention a routine</h2>
<p>The practices that keep denials low treat prevention as an ongoing habit:</p>
<ol>
<li>Review denial reports weekly or monthly with front desk, coding and billing staff.</li>
<li>Assign each top denial category to an owner and a specific fix.</li>
<li>Re-measure after each change to confirm it worked.</li>
<li>Watch payer bulletins and policy updates for new rules.</li>
</ol>
` + '<h2>Want to find the source of your denials?</h2><p>Denials usually trace back to a few repeat causes. If you would like help finding yours, <a href="/consultation">book a free consultation</a>. We will look at your recent denial reasons and talk through fixes your team can make at the front end.</p>',
    faqs: [
      {
        q: 'What is the most common cause of claim denials?',
        a: 'It depends on the practice, specialty and payer mix, but registration and eligibility errors, missing prior authorizations, coding issues and timely filing are frequent causes. Sorting your own denials by reason code is the only reliable way to know your top causes.',
      },
      {
        q: 'What is the difference between a denial and a rejection?',
        a: 'A rejection is returned before adjudication because the claim failed format or data checks, and it can usually be corrected and resent. A denial means the payer processed the claim and refused payment, which requires a corrected claim or an appeal.',
      },
      {
        q: 'How long do I have to appeal a Medicare denial?',
        a: 'For Original Medicare, a redetermination request generally must be filed within 120 days of receiving the initial determination. Later appeal levels have their own deadlines, and commercial payers set their own appeal windows.',
      },
      {
        q: 'What are CARC and RARC codes?',
        a: 'CARCs (Claim Adjustment Reason Codes) explain why a claim or line was paid differently than billed, and RARCs (Remittance Advice Remark Codes) add supporting detail. Both are standard code lists published by X12 and used on the 835 remittance.',
      },
    ],
    sources: [SRC.x12Carc, SRC.x12Rarc, SRC.cmsNcci, SRC.cmsAppeals, SRC.ecfr42444, SRC.amaPa, SRC.cms0057, SRC.cmsAbn],
  },

  // 5 ------------------------------------------------------------------
  {
    slug: 'what-is-ar-in-medical-billing',
    title: 'What Is AR in Medical Billing?',
    seoTitle: 'What Is AR in Medical Billing? Accounts Receivable Explained',
    metaDescription:
      'Accounts receivable (AR) in medical billing is money owed to a practice by payers and patients. Learn how AR aging works, how to calculate days in AR, and how to manage it.',
    excerpt:
      'Accounts receivable is the money your practice has earned but not yet collected. Here is how AR aging buckets work, how to calculate days in AR, and how to keep balances moving.',
    category: 'Revenue Cycle Management',
    tags: ['accounts receivable', 'AR aging', 'days in AR', 'AR follow-up'],
    readingMinutes: 7,
    publishedAt: '2026-10-05',
    html: `
<p><strong>AR, or accounts receivable, in medical billing is the total amount of money owed to a practice for services it has already provided but not yet been paid for.</strong> It includes unpaid balances owed by insurance payers and by patients. Practices track AR by age, because the longer a balance stays unpaid, the harder it becomes to collect.</p>

<p>Think of AR as earned revenue that has not reached the bank yet. A healthy practice will always have some AR, since claims take time to process. The question is how much, how old, and whether it is moving. This guide explains how AR is measured and what practices do to manage it.</p>

<h2>What makes up a practice's AR?</h2>
<p>AR is usually split into two broad groups:</p>
<ul>
<li><strong>Insurance AR:</strong> claims submitted to Medicare, Medicaid, commercial plans, workers' compensation and other payers that have not been paid or otherwise resolved.</li>
<li><strong>Patient AR:</strong> amounts the patient owes after insurance, such as deductibles, coinsurance and copays not collected at the visit, plus self-pay balances.</li>
</ul>
<p>Within each group, AR can be further broken down by payer, provider, location and status (for example, pending at the payer, denied awaiting appeal, or billed to the patient). That detail is what makes AR actionable.</p>

<h2>What is AR aging?</h2>
<p>AR aging sorts outstanding balances into buckets based on how long they have been unpaid, usually counted from the date of service or the date of first billing. Typical buckets are:</p>
<table>
<thead>
<tr><th>Aging bucket</th><th>What it usually means</th></tr>
</thead>
<tbody>
<tr><td>0 to 30 days</td><td>Recently billed, often still processing normally</td></tr>
<tr><td>31 to 60 days</td><td>Should be paid soon; worth checking status on larger claims</td></tr>
<tr><td>61 to 90 days</td><td>Likely stalled; needs active follow-up</td></tr>
<tr><td>91 to 120 days</td><td>At risk; appeal and filing deadlines may be approaching</td></tr>
<tr><td>Over 120 days</td><td>Hard to collect; often denied, lost or forgotten claims</td></tr>
</tbody>
</table>
<p>The share of AR in the older buckets is often more revealing than the total. Growth in the 90-plus buckets usually means claims are being submitted but not followed up. Our <a href="/tools/ar-aging-calculator">AR aging calculator</a> helps you see how your balances are distributed.</p>

<h2>How do you calculate days in AR?</h2>
<p>Days in AR estimates the average number of days it takes to collect payment. A common formula is:</p>
<blockquote>
<p>Days in AR = Total AR / Average daily gross charges</p>
</blockquote>
<p>To find average daily charges, add up gross charges for a recent period (often the last 3, 6 or 12 months) and divide by the number of days in that period.</p>
<p><strong>Example:</strong> a practice has $240,000 in total AR. Over the last 90 days it billed $720,000 in gross charges, or $8,000 per day. Days in AR = $240,000 / $8,000 = 30 days. These numbers are illustrative, not a benchmark.</p>
<p>Some organizations calculate days in AR using net charges (after contractual adjustments) instead of gross charges. Either works, as long as you use the same method every time. HFMA's MAP Keys provide standardized definitions if you want a consistent reference. You can try it with our <a href="/tools/days-in-ar-calculator">days in AR calculator</a>.</p>

<h2>Why does AR grow or get older?</h2>
<p>When AR climbs or shifts into older buckets, the cause is usually one of these:</p>
<ul>
<li><strong>Claims not submitted promptly.</strong> Charge entry or coding backlogs delay the start of the clock.</li>
<li><strong>Rejections not worked.</strong> Claims that failed clearinghouse checks sit in a queue and never reach the payer.</li>
<li><strong>Denials not appealed.</strong> Denied claims stay on the books as open balances.</li>
<li><strong>No-response claims.</strong> Some claims are simply not received or not processed. Without status checks, nobody notices.</li>
<li><strong>Payer delays.</strong> Requests for medical records, credentialing problems or payer system issues can slow payment.</li>
<li><strong>Patient balances.</strong> High-deductible plans move more of the bill to patients, and patient balances often take longer to collect.</li>
</ul>

<h2>How do practices manage AR effectively?</h2>
<p>Effective AR management is mostly about consistency. A few practices that help:</p>
<h3>Work AR on a schedule</h3>
<p>Set a routine for reviewing AR by bucket and payer. Prioritize by a combination of dollar amount and age, so large balances nearing deadlines are worked first. Use the 276/277 claim status transaction or payer portals to check claims before calling.</p>
<h3>Track deadlines</h3>
<p>Every payer has a timely filing limit and appeal deadlines. Original Medicare generally requires claims within 12 months of the date of service; many commercial payers allow less time. Keep these limits visible to the team doing follow-up.</p>
<h3>Resolve, do not just touch</h3>
<p>A follow-up note that says "called payer, claim in process" without a next step does not move the balance. Each action should lead to a resolution: payment, corrected claim, appeal, patient billing or an appropriate adjustment.</p>
<h3>Separate insurance and patient AR</h3>
<p>The workflows are different. Insurance AR needs payer follow-up. Patient AR needs clear statements, payment options and reminders. Mixing them on one report can hide where the delays really are.</p>
<p>Dedicated <a href="/services/aging-ar-follow-up">aging AR follow-up</a> focuses on older balances, while broader <a href="/services/accounts-receivable-management">accounts receivable management</a> covers the whole AR lifecycle from submission to resolution.</p>

<h2>Should old AR ever be written off?</h2>
<p>Sometimes, yes. If a claim is past every filing and appeal deadline, or a patient balance has gone through your full collection policy, the practice may need to adjust it off. The key is to use specific adjustment codes so write-offs can be tracked and analyzed. Lumping them into general adjustments hides lost revenue and distorts metrics like net collection rate.</p>
<p>Before writing off, confirm the balance is truly uncollectible. Old claims sometimes turn out to have been paid and posted to the wrong account, or are eligible for a reopening or appeal under payer rules.</p>

<h2>How does AR connect to the rest of the revenue cycle?</h2>
<p>AR is where problems from every earlier stage end up. A registration error becomes a rejected claim sitting in the 0 to 30 bucket. A missing authorization becomes a denial in the 31 to 60 bucket. A denial nobody appealed drifts into the 91 to 120 bucket and eventually becomes a write-off. Because of this, AR reports are one of the best diagnostic tools a practice has.</p>
<p>When you review old balances, ask why each one got there, not only how to collect it. If many aged claims share a payer, a denial reason or a provider, the fix belongs upstream: in registration, authorization tracking, coding or provider enrollment. Collecting the old balance helps once. Fixing the cause helps every month after.</p>

<h2>What should a good AR follow-up note include?</h2>
<p>Clear notes save time when a claim is touched again. A useful note usually records:</p>
<ul>
<li>The date and method of contact (portal, phone, claim status transaction)</li>
<li>What the payer said, including any reference or call number</li>
<li>The claim's current status and any reason codes</li>
<li>The specific next action and who will take it</li>
<li>The date to check again</li>
</ul>

<h2>What AR reports should you review?</h2>
<ul>
<li>AR aging summary by payer and bucket</li>
<li>Days in AR trend over the last 6 to 12 months</li>
<li>Percentage of AR over 90 days</li>
<li>Open denials and their appeal deadlines</li>
<li>Patient AR aging, separate from insurance AR</li>
</ul>
` + '<h2>Is your AR older than it should be?</h2><p>If too much of your receivable balance sits past 90 days, <a href="/consultation">talk to us in a free consultation</a>. We can look at your aging report together and discuss a follow-up plan for the oldest claims first.</p>',
    faqs: [
      {
        q: 'What does AR stand for in medical billing?',
        a: 'AR stands for accounts receivable, the money owed to a practice for services already provided. It includes unpaid insurance claims and patient balances.',
      },
      {
        q: 'How is days in AR calculated?',
        a: 'Days in AR is usually calculated by dividing total accounts receivable by average daily gross charges, where average daily charges equal total charges for a recent period divided by the number of days in that period. Use the same method each time so trends are comparable.',
      },
      {
        q: 'What are AR aging buckets?',
        a: 'AR aging buckets group unpaid balances by how long they have been outstanding, commonly 0 to 30, 31 to 60, 61 to 90, 91 to 120 and over 120 days. Older buckets indicate balances that need follow-up and are harder to collect.',
      },
      {
        q: 'Why is AR over 90 days a concern?',
        a: 'Balances over 90 days are more likely to be denied, lost or close to filing and appeal deadlines, and they become harder to collect over time. A growing share of AR in these buckets usually signals gaps in follow-up.',
      },
    ],
    sources: [SRC.hfmaMapKeys, SRC.mgmaDataDive, SRC.ecfr42444, SRC.x12Status, SRC.cmsTransactions],
  },

  // 6 ------------------------------------------------------------------
  {
    slug: 'medical-billing-vs-revenue-cycle-management',
    title: 'Medical Billing vs Revenue Cycle Management: What Is the Difference?',
    seoTitle: 'Medical Billing vs Revenue Cycle Management: Key Differences',
    metaDescription:
      'Medical billing is one part of revenue cycle management. Compare their scope, tasks, metrics and ownership, and learn which one your practice actually needs.',
    excerpt:
      'Medical billing and revenue cycle management are often used interchangeably, but they cover different ground. Here is a side-by-side comparison and how to decide what your practice needs.',
    category: 'Medical Billing',
    tags: ['medical billing', 'revenue cycle management', 'outsourcing', 'comparison'],
    readingMinutes: 7,
    publishedAt: '2026-10-06',
    html: `
<p><strong>Medical billing is one part of revenue cycle management.</strong> Billing focuses on turning coded services into claims, submitting them, and following up until they are paid. Revenue cycle management covers the entire financial life of a patient encounter, from scheduling and eligibility through coding, billing, denials, patient collections and reporting.</p>

<p>The two terms are often used as if they mean the same thing, especially when practices compare outside vendors. Understanding the difference helps you see where your current problems actually sit and what kind of help would address them.</p>

<h2>What does medical billing include?</h2>
<p>Medical billing is the process of getting claims out the door and payments in. It typically includes:</p>
<ul>
<li>Charge entry from coded encounters</li>
<li>Claim creation (837P or 837I electronically, or the CMS-1500 and UB-04 on paper)</li>
<li>Claim scrubbing and clearinghouse submission</li>
<li>Rejection correction and resubmission</li>
<li>Payment posting from ERAs and EOBs</li>
<li>Claim status checks and basic follow-up</li>
<li>Patient statements</li>
</ul>
<p>Billing is transactional. It is measured by how quickly and cleanly claims move through the payer system. A dedicated <a href="/services/medical-billing">medical billing</a> team focuses on this flow.</p>

<h2>What does revenue cycle management include?</h2>
<p>Revenue cycle management includes everything in billing, plus the stages before and after it:</p>
<ul>
<li><strong>Before the visit:</strong> scheduling, patient registration, eligibility and benefits verification, prior authorization and patient cost estimates.</li>
<li><strong>During and after the visit:</strong> documentation support, coding, charge capture and coding audits.</li>
<li><strong>After the claim:</strong> denial analysis and appeals, underpayment review against payer contracts, AR management, patient collections and payment plans.</li>
<li><strong>Around the cycle:</strong> provider credentialing and enrollment, payer contracting, fee schedule review, analytics and process improvement.</li>
</ul>
<p>RCM is strategic as well as transactional. It looks at why claims are denied or delayed and fixes the upstream cause. See how these pieces connect in our <a href="/services/revenue-cycle-management">revenue cycle management</a> overview.</p>

<h2>How do medical billing and RCM compare side by side?</h2>
<table>
<thead>
<tr><th>Aspect</th><th>Medical billing</th><th>Revenue cycle management</th></tr>
</thead>
<tbody>
<tr><td>Scope</td><td>Claim creation, submission, posting and follow-up</td><td>Full patient financial journey, from scheduling to zero balance</td></tr>
<tr><td>Starts</td><td>After the visit is coded</td><td>When the appointment is scheduled</td></tr>
<tr><td>Ends</td><td>When the claim is paid or closed</td><td>When the account is resolved and lessons feed back into the process</td></tr>
<tr><td>Front-end tasks</td><td>Usually not included</td><td>Registration, eligibility, prior authorization, cost estimates</td></tr>
<tr><td>Coding</td><td>Sometimes included, sometimes separate</td><td>Included, often with periodic audits</td></tr>
<tr><td>Denials</td><td>Resubmit or correct individual claims</td><td>Root cause analysis, appeals and prevention</td></tr>
<tr><td>Credentialing and enrollment</td><td>Not included</td><td>Often included or coordinated</td></tr>
<tr><td>Typical metrics</td><td>Claims submitted, rejection rate, clean claim rate</td><td>Net collection rate, days in AR, denial rate, AR aging, patient collections</td></tr>
<tr><td>Focus</td><td>Transactional: move each claim</td><td>Process: improve the whole cycle over time</td></tr>
</tbody>
</table>

<h2>Why does the difference matter?</h2>
<p>Many revenue problems start before a claim is ever created. If a patient's coverage ended last month, the best billing team in the world cannot get that claim paid by the original payer. If a provider is not yet enrolled with a plan, claims will deny no matter how cleanly they are built. If a payer is paying below the contracted rate, posting the payment accurately does not recover the difference.</p>
<p>A billing-only approach treats each of these as a claim to rework. An RCM approach asks why it happened and changes the step that caused it. For example, unresolved enrollment issues point to <a href="/services/medical-credentialing">medical credentialing</a>, not to more resubmissions.</p>

<h2>Which one does your practice need?</h2>
<p>There is no single right answer. It depends on what your team already handles well.</p>
<h3>Billing support may be enough if:</h3>
<ul>
<li>Your front desk reliably verifies eligibility and obtains authorizations.</li>
<li>Coding is handled well in house or by providers with coding support.</li>
<li>Your main gap is staff capacity for claim submission, posting and follow-up.</li>
</ul>
<h3>Broader RCM support may make sense if:</h3>
<ul>
<li>Denials keep recurring for the same front-end reasons.</li>
<li>AR is growing and older buckets are getting larger.</li>
<li>You lack reporting that shows where revenue is being lost.</li>
<li>Credentialing, enrollment or payer contract questions are slowing payments.</li>
</ul>
<p>If you are not sure where your gaps are, a <a href="/services/revenue-cycle-audit">revenue cycle audit</a> can review each stage and show which ones need attention.</p>

<h2>Should you keep billing in house or outsource it?</h2>
<p>Practices outsource for different reasons: staff turnover, growth, a new specialty, or simply wanting the office team to focus on patients. Others prefer to keep everything in house for direct control. Many choose a hybrid, keeping front-desk tasks internal and handing back-end work to a partner who works inside their systems.</p>
<p>When comparing options, look at the full cost of in-house billing, including salaries, benefits, training, software, clearinghouse fees and the cost of turnover, against the cost of an outside partner. Our <a href="/tools/outsourcing-vs-in-house-billing-calculator">outsourcing vs in-house billing calculator</a> helps you lay out those numbers side by side.</p>

<h2>What does each approach look like in a real week?</h2>
<p>Picture a practice that sees a steady stream of patients across a handful of commercial plans, Medicare and Medicaid.</p>
<p>Under a <strong>billing-only</strong> arrangement, the biller's week centers on the claim queue. Coded encounters come in, charges are entered, claims are scrubbed and sent, rejections are corrected, and ERAs are posted. When a claim is denied for an expired policy, the biller flags it, asks the front desk for updated insurance, and resubmits. The same kind of denial may show up again the following week, because nothing changed at check-in.</p>
<p>Under an <strong>RCM</strong> arrangement, the same claim work happens, but someone is also looking at the pattern. The team notices that eligibility denials cluster on returning patients, adds a verification step for every visit, and checks whether the next month's denials drop. The week includes time for reviewing reports, talking with the front desk and coders, and tracking aged AR by payer, not just working the queue.</p>
<p>Neither picture is wrong. The difference is whether anyone owns the question of why revenue is being delayed or lost.</p>

<h2>How do the two approaches measure success differently?</h2>
<p>Billing teams tend to report activity: claims submitted, rejections corrected, payments posted. Those numbers show workload, but they do not tell you whether the practice is collecting what it is owed.</p>
<p>RCM reporting tends to focus on outcomes: net collection rate, days in AR, the share of AR over 90 days, denial rate by reason and payer, and patient collections. HFMA's MAP Keys are one widely used source of standardized definitions for these outcome measures. If the reports you receive today show only activity, that is a sign your current setup is closer to billing than to full revenue cycle management.</p>

<h2>Questions to ask any billing or RCM partner</h2>
<ol>
<li>Which stages of the revenue cycle do you handle, and which stay with our staff?</li>
<li>Do you work inside our practice management and EHR systems, or require a switch?</li>
<li>How do you report on denials, AR and collections, and how often?</li>
<li>How do you handle denial root cause analysis, not just resubmissions?</li>
<li>Will you sign a Business Associate Agreement before accessing patient data?</li>
</ol>
` + '<h2>Deciding between billing help and full RCM?</h2><p>Every practice draws the line in a different place. If you want to talk through which tasks to keep in-house and which to hand over, <a href="/consultation">request a free consultation</a> and we will give you a straight answer.</p>',
    faqs: [
      {
        q: 'Is medical billing the same as revenue cycle management?',
        a: 'No. Medical billing is one component of revenue cycle management. Billing handles claims and payments, while RCM also covers front-end steps like eligibility and authorization, coding, denial prevention, patient collections, credentialing and reporting.',
      },
      {
        q: 'Does revenue cycle management include coding?',
        a: 'Usually yes. Coding sits in the middle of the revenue cycle, between documentation and claim creation, and most RCM programs include coding or coding audits. Some billing-only arrangements leave coding to the practice.',
      },
      {
        q: 'When should a practice choose full RCM instead of billing only?',
        a: 'Full RCM tends to make sense when problems start before the claim, such as recurring eligibility or authorization denials, growing aged AR, enrollment issues or a lack of reporting. If the main gap is staff capacity for claims and posting, billing support may be enough.',
      },
    ],
    sources: [SRC.aapcRcm, SRC.aapcBilling, SRC.cmsEdi, SRC.nucc1500, SRC.hfmaMapKeys],
  },

  // 7 ------------------------------------------------------------------
  {
    slug: 'medical-billing-kpis',
    title: 'Medical Billing KPIs Every Practice Should Track',
    seoTitle: 'Medical Billing KPIs: 9 Metrics to Track and How to Calculate Them',
    metaDescription:
      'The key medical billing KPIs explained: net and gross collection rate, days in AR, AR over 90 days, denial rate, clean claim rate, first pass rate and more, with formulas.',
    excerpt:
      'A practical guide to the medical billing KPIs that matter, how to calculate each one, what it tells you, and how to build a simple monthly review.',
    category: 'RCM Tools and Guides',
    tags: ['KPIs', 'RCM metrics', 'calculators', 'practice analytics'],
    readingMinutes: 8,
    publishedAt: '2026-10-07',
    html: `
<p><strong>The most important medical billing KPIs are net collection rate, days in accounts receivable, percentage of AR over 90 days, denial rate, clean claim rate and first pass resolution rate.</strong> Together they show how much of your allowed revenue you collect, how fast you collect it, and how often claims are delayed or denied along the way.</p>

<p>Key performance indicators turn a complicated process into a few numbers you can review each month. The trick is to define each one clearly, calculate it the same way every time, and look at trends rather than single data points. Below are the KPIs most practices find useful, with formulas and what each one reveals.</p>

<h2>Why do consistent definitions matter?</h2>
<p>The same KPI name can mean different things in different systems. One report might count denials per claim, another per line item. One might calculate days in AR from gross charges, another from net. If you compare numbers calculated differently, the comparison is meaningless.</p>
<p>The Healthcare Financial Management Association (HFMA) publishes standardized revenue cycle definitions through its MAP Keys, and MGMA publishes benchmarking data for medical groups. Whatever source you follow, write down your definitions and stick with them.</p>

<h2>1. What is net collection rate?</h2>
<blockquote><p>Net collection rate = Payments / (Charges minus Contractual adjustments) x 100</p></blockquote>
<p>This shows how much of the money you were entitled to collect, after payer contract write-offs, you actually collected. It is the best single measure of billing effectiveness. Only contractual adjustments belong in the denominator; bad debt, timely filing and denial write-offs do not. Try the <a href="/tools/net-collection-rate-calculator">net collection rate calculator</a>.</p>

<h2>2. What is gross collection rate?</h2>
<blockquote><p>Gross collection rate = Payments / Charges x 100</p></blockquote>
<p>This compares payments to full billed charges. It mostly reflects how your fee schedule compares to payer allowed amounts, so it is less useful for judging billing performance. It can still be helpful for spotting changes in payer mix or fee schedule effects over time.</p>

<h2>3. What is days in accounts receivable?</h2>
<blockquote><p>Days in AR = Total AR / Average daily gross charges</p></blockquote>
<p>Average daily charges equal charges for a recent period divided by the number of days in it. Days in AR estimates how long it takes, on average, to get paid. A rising number means money is arriving more slowly. Use the <a href="/tools/days-in-ar-calculator">days in AR calculator</a> to check yours.</p>

<h2>4. What percentage of AR is over 90 days?</h2>
<blockquote><p>AR over 90 days % = AR older than 90 days / Total AR x 100</p></blockquote>
<p>This shows how much of your receivables are at risk. Older balances are harder to collect and closer to filing and appeal deadlines. Track insurance and patient AR separately, because they age for different reasons.</p>

<h2>5. What is denial rate?</h2>
<blockquote><p>Denial rate = Claims denied / Claims adjudicated x 100</p></blockquote>
<p>Some practices calculate it by claim count, others by dollar value, and some by line item. Each view is useful: count shows workflow burden, dollars show financial impact. Break the rate down by payer and reason code to make it actionable. The <a href="/tools/denial-rate-calculator">denial rate calculator</a> can help you set a baseline.</p>

<h2>6. What is clean claim rate?</h2>
<blockquote><p>Clean claim rate = Claims accepted without edits or rejections on first submission / Total claims submitted x 100</p></blockquote>
<p>This measures how often claims pass clearinghouse and payer front-end checks on the first try. A low rate points to registration, coding or data entry problems, and every rejected claim adds rework and delay. Check yours with the <a href="/tools/clean-claim-rate-calculator">clean claim rate calculator</a>.</p>

<h2>7. What is first pass resolution rate?</h2>
<blockquote><p>First pass resolution rate = Claims paid or resolved on first submission / Total claims adjudicated x 100</p></blockquote>
<p>This goes one step beyond clean claim rate: the claim was not only accepted but paid correctly without rework. Definitions vary, so some practices call a similar measure first pass acceptance. Whichever you use, a high rate means less staff time spent on corrections and appeals. See the <a href="/tools/first-pass-acceptance-rate-calculator">first pass acceptance rate calculator</a>.</p>

<h2>8. What is charge lag?</h2>
<blockquote><p>Charge lag = Average days from date of service to claim submission</p></blockquote>
<p>Every day between the visit and the claim delays payment and eats into timely filing limits. Charge lag often reveals documentation or coding backlogs. Some practices split it into documentation lag (service to signed note) and billing lag (signed note to claim).</p>

<h2>9. What is patient collection rate?</h2>
<blockquote><p>Patient collection rate = Patient payments received / Patient responsibility billed x 100</p></blockquote>
<p>As deductibles and coinsurance shift more cost to patients, this KPI matters more. Track time-of-service collections separately from statement collections to see whether front desk collection or post-visit billing needs attention.</p>

<h2>How should you review these KPIs together?</h2>
<p>No single KPI tells the full story. A few combinations are especially useful:</p>
<table>
<thead>
<tr><th>What you see</th><th>What it may mean</th><th>Where to look</th></tr>
</thead>
<tbody>
<tr><td>Net collection rate falling, denial rate rising</td><td>Denied revenue is not being recovered</td><td>Denial reasons and appeal follow-through</td></tr>
<tr><td>Days in AR rising, denial rate steady</td><td>Claims are slow, not denied</td><td>Charge lag, no-response claims, follow-up cadence</td></tr>
<tr><td>Clean claim rate low</td><td>Front-end or data errors</td><td>Registration, eligibility and scrubber rules</td></tr>
<tr><td>AR over 90 days growing</td><td>Older claims not being worked</td><td>Follow-up workload and prioritization</td></tr>
<tr><td>Patient collection rate falling</td><td>Patient balances not collected</td><td>Cost estimates, time-of-service collection, statements</td></tr>
</tbody>
</table>

<h2>Which data do you need to calculate these KPIs?</h2>
<p>Most of these measures come from a few standard reports in your practice management system:</p>
<ul>
<li><strong>Charges, payments and adjustments by period,</strong> with adjustments split by type (contractual, bad debt, timely filing, small balance and so on).</li>
<li><strong>AR aging,</strong> split by insurance and patient responsibility and by payer.</li>
<li><strong>Denial detail</strong> from posted 835 remittances, including the CARC and RARC for each denied line.</li>
<li><strong>Clearinghouse acceptance and rejection reports</strong> for clean claim rate.</li>
<li><strong>Date of service and submission date</strong> for each claim, to measure charge lag.</li>
</ul>
<p>If a KPI looks suspicious, check the data before acting on it. Miscoded adjustments, payments posted to the wrong period and duplicate claims can all make a number look better or worse than reality. Clean data is what makes the KPIs worth reviewing.</p>

<h2>How do you set up a simple monthly KPI review?</h2>
<ol>
<li><strong>Pick five or six KPIs.</strong> Start with net collection rate, days in AR, AR over 90 days, denial rate and clean claim rate.</li>
<li><strong>Write down your definitions</strong> and the report each one comes from.</li>
<li><strong>Calculate monthly</strong> and keep at least 12 months of history.</li>
<li><strong>Break down by payer and provider</strong> when a number moves.</li>
<li><strong>Assign one action</strong> for the biggest problem each month and check the result next month.</li>
</ol>
<p>Be careful with benchmarks you find online. Many published targets come without a stated source, date or definition, and results vary widely by specialty, payer mix and region. Your own trend line is usually the most reliable guide. If you want an outside benchmark, use one from a source that publishes its methodology, such as MGMA or HFMA.</p>
` + '<h2>Want help setting up a KPI report?</h2><p>A short monthly report built from your own system exports is enough to start. If you would like help choosing the right measures for your practice, <a href="/consultation">book a free consultation</a>.</p>',
    faqs: [
      {
        q: 'What is the most important medical billing KPI?',
        a: 'Net collection rate is often considered the most important single KPI because it shows how much of your allowed revenue you actually collect. It works best alongside days in AR and denial rate, which show speed and payer friction.',
      },
      {
        q: 'What is the difference between clean claim rate and first pass resolution rate?',
        a: 'Clean claim rate measures claims accepted without rejections on first submission, while first pass resolution rate measures claims that were actually paid or resolved without rework. A claim can be clean but still denied, so the two numbers answer different questions.',
      },
      {
        q: 'How often should a practice review billing KPIs?',
        a: 'Most practices review core KPIs monthly and look at trends over 6 to 12 months. Some operational measures, such as rejections and denials, are worth checking weekly.',
      },
      {
        q: 'Where can I find reliable KPI benchmarks?',
        a: 'Use sources that publish their definitions and methodology, such as HFMA MAP Keys for definitions and MGMA for medical group benchmarking data. Be cautious with targets that do not state their source, date or how the metric was calculated.',
      },
    ],
    sources: [SRC.hfmaMapKeys, SRC.mgmaDataDive, SRC.x12Carc, SRC.x12Status, SRC.ecfr42444],
  },

  // 8 ------------------------------------------------------------------
  {
    slug: 'dental-insurance-billing-process',
    title: 'How the Dental Insurance Billing Process Works',
    seoTitle: 'Dental Insurance Billing Process: Step-by-Step Guide',
    metaDescription:
      'A step-by-step guide to the dental insurance billing process: verification, treatment planning, CDT coding, claims and attachments, coordination of benefits, payments and patient balances.',
    excerpt:
      'Dental billing follows its own rules: annual maximums, frequency limits, waiting periods and attachments. Here is how the dental insurance billing process works from verification to final payment.',
    category: 'Dental Billing',
    tags: ['dental billing', 'dental insurance', 'CDT', 'insurance verification'],
    readingMinutes: 8,
    publishedAt: '2026-10-08',
    html: `
<p><strong>The dental insurance billing process works by verifying a patient's dental benefits, coding treatment with CDT codes, submitting a claim to the dental plan with any required attachments, and then posting the payment and billing the patient for the remainder.</strong> Along the way, practices manage plan rules such as annual maximums, frequency limits, waiting periods and coordination of benefits.</p>

<p>Dental billing shares the same basic shape as medical billing, but the details are different enough that medical billing habits do not always transfer. Dental plans are often built around a yearly benefit cap, they limit how often services are covered, and they frequently require radiographs or narratives to support a claim. This guide walks through the process step by step.</p>

<h2>How is dental billing different from medical billing?</h2>
<ul>
<li><strong>Code set.</strong> Dental procedures are reported with CDT codes, maintained by the American Dental Association (ADA). Diagnosis codes are usually not required on dental claims, though some plans and some situations call for them.</li>
<li><strong>Claim form.</strong> Dental claims use the ADA Dental Claim Form on paper or the 837D electronic transaction.</li>
<li><strong>Benefit design.</strong> Many dental plans have an annual maximum, a percentage-based coverage structure by service category, frequency limits and waiting periods.</li>
<li><strong>Attachments.</strong> Radiographs, periodontal charts, intraoral images and narratives are commonly needed for major services.</li>
<li><strong>Medical crossover.</strong> Some procedures, such as certain oral surgery or treatment related to trauma or medical conditions, may need to be billed to the patient's medical plan first.</li>
</ul>

<h2>Step 1: How do you verify dental insurance benefits?</h2>
<p>Verification is the foundation of dental billing because so much of the patient's coverage depends on plan-specific details. Before the appointment, confirm:</p>
<ul>
<li>Active coverage, subscriber and patient relationship, and group number</li>
<li>Coverage percentages for preventive, basic and major categories</li>
<li>Annual maximum and how much has already been used this benefit year</li>
<li>Deductible amount and whether it applies to preventive care</li>
<li>Frequency limits for exams, cleanings, radiographs and fluoride</li>
<li>Waiting periods for basic or major services</li>
<li>Missing tooth clauses, replacement rules and age limits</li>
<li>Whether the patient has a second dental plan</li>
</ul>
<p>A consistent checklist keeps verification complete across the team. Our <a href="/tools/dental-insurance-verification-checklist">dental insurance verification checklist</a> covers the details most often missed. Thorough <a href="/services/benefits-verification">benefits verification</a> also makes patient cost estimates far more reliable.</p>

<h2>Step 2: Treatment planning and pre-treatment estimates</h2>
<p>For larger treatment, many practices send a pre-treatment estimate (sometimes called a predetermination) to the dental plan before beginning work. The plan responds with what it expects to pay based on current benefits. A pre-treatment estimate is generally not a guarantee of payment, since benefits, eligibility and remaining maximums can change, but it gives the patient and the practice a clearer picture.</p>
<p>Share the estimated patient portion in writing before treatment. For uninsured or self-pay patients, the No Surprises Act good faith estimate requirements also apply to scheduled services from dental providers.</p>

<h2>Step 3: Documentation and CDT coding</h2>
<p>After treatment, the procedures are coded using the current CDT code set. The ADA updates CDT annually, with changes taking effect each January 1, so practices should update their software and fee schedules on time.</p>
<p>Coding must match the clinical notes, including tooth numbers, surfaces, quadrants or arches where required. Missing tooth or surface information is a frequent cause of claim delays.</p>

<h2>Step 4: Preparing the claim and attachments</h2>
<p>The claim includes patient and subscriber details, treating and billing provider information, procedure codes, tooth and surface information, dates of service and fees. For many restorative, periodontal, prosthetic and surgical procedures, the plan will also want supporting documentation:</p>
<ul>
<li>Current radiographs showing the tooth or area treated</li>
<li>Periodontal charting for scaling and root planing or other periodontal procedures</li>
<li>Intraoral photographs</li>
<li>A narrative explaining why the procedure was necessary</li>
</ul>
<p>Sending the right attachments the first time avoids a cycle of requests for information that can delay payment for weeks.</p>

<h2>Step 5: Submitting the claim</h2>
<p>Most dental claims are submitted electronically as 837D transactions through a clearinghouse, with attachments sent through the clearinghouse or a payer portal. Review rejections promptly; a claim that was rejected is not in the payer's system until it is corrected and resent. Each plan also has its own timely filing limit, so do not let claims sit.</p>

<h2>Step 6: How does coordination of benefits work for dental?</h2>
<p>When a patient has two dental plans, coordination of benefits (COB) determines which pays first. Common rules include the patient's own plan paying before a spouse's plan, and for dependent children, the "birthday rule," where the plan of the parent whose birthday falls earlier in the calendar year is primary. Custody arrangements and specific plan language can change the order.</p>
<p>Submit to the primary plan first, then send the secondary claim with the primary plan's explanation of benefits. Plans differ in how they calculate secondary payment, so the secondary plan may not cover the full remaining balance.</p>

<h2>Step 7: Payment posting and reconciliation</h2>
<p>When the plan pays, post the payment and any write-offs from the explanation of benefits or electronic remittance. Compare the allowed amounts against the plan's fee schedule for in-network plans. Look for:</p>
<ul>
<li>Procedures downgraded to a less costly alternative (for example, a composite paid at an amalgam rate)</li>
<li>Frequency or maximum denials that verification should have caught</li>
<li>Requests for additional information</li>
<li>Payments that do not match the expected fee</li>
</ul>
<p>Our <a href="/tools/dental-insurance-collection-calculator">dental insurance collection calculator</a> can help you compare what was billed, allowed and collected over time.</p>

<h2>Step 8: Denials, appeals and patient billing</h2>
<p>Dental denials often relate to frequency limits, waiting periods, missing attachments, maximums reached or eligibility. Some can be resolved by sending missing documentation or correcting tooth and surface information. Others require a written appeal with clinical support.</p>
<p>Once insurance has processed the claim, bill the patient for their share with a clear statement that shows what the plan paid and why. Patients are more likely to pay promptly when the balance matches the estimate they were given.</p>

<h2>When should a dental procedure be billed to medical insurance?</h2>
<p>Some services performed in a dental office may be covered by the patient's medical plan rather than, or before, the dental plan. Examples can include certain oral surgery, treatment of injuries from an accident, biopsies, and some sleep apnea appliances. In those cases the medical plan generally expects a medical claim with diagnosis codes and medical procedure codes, along with documentation of medical necessity.</p>
<p>Medical crossover rules vary widely by plan, so verify coverage for the specific service before treatment. When the medical plan denies or pays only part of the claim, the dental plan may then consider the remainder under its own coordination rules.</p>

<h2>What are common dental billing mistakes?</h2>
<ul>
<li>Verifying only eligibility and skipping frequency, maximum and waiting period details</li>
<li>Sending major service claims without radiographs or narratives</li>
<li>Using outdated CDT codes after the annual update</li>
<li>Billing the secondary plan without the primary EOB</li>
<li>Letting small unpaid balances accumulate without follow-up</li>
</ul>
<p>Whether you run a single <a href="/specialties/general-dentistry">general dentistry</a> office or several locations, a repeatable process for each of these steps keeps claims moving. Learn more about how our <a href="/services/dental-billing">dental billing</a> support works inside your existing practice software.</p>
` + '<h2>Have questions about your dental claims?</h2><p>If insurance claims at your dental office keep coming back for frequency limits, missing attachments or downgrades, <a href="/consultation">request a free consultation</a>. We will review a few recent examples with you and explain where the process can be tightened.</p>',
    faqs: [
      {
        q: 'What codes are used for dental insurance billing?',
        a: 'Dental procedures are billed with CDT codes, which are maintained by the American Dental Association and updated each year. Diagnosis codes are generally not required on dental claims, though some plans or medical crossover situations may require them.',
      },
      {
        q: 'Is a dental pre-treatment estimate a guarantee of payment?',
        a: 'No. A pre-treatment estimate shows what the plan expects to pay based on current benefits, but final payment depends on eligibility, remaining maximums and plan rules at the time the claim is processed.',
      },
      {
        q: 'How does the birthday rule work in dental billing?',
        a: 'The birthday rule is a common coordination of benefits rule for dependent children covered by both parents. The plan of the parent whose birthday comes first in the calendar year is usually primary, although custody arrangements and plan language can change this.',
      },
      {
        q: 'What attachments do dental claims usually need?',
        a: 'Major restorative, periodontal, prosthetic and surgical claims commonly need current radiographs, and many also need periodontal charting, intraoral photos or a narrative. Requirements vary by plan and procedure.',
      },
      {
        q: 'What form is used for dental claims?',
        a: 'Dental claims use the ADA Dental Claim Form on paper or the HIPAA standard 837D transaction when submitted electronically. Most practices submit electronically through a clearinghouse.',
      },
    ],
    sources: [SRC.adaCdt, SRC.adaClaimForm, SRC.adaInsurance, SRC.cmsTransactions, SRC.cmsNsa],
  },
];
