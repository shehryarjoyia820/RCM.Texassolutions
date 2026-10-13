/**
 * Dental topic posts, batch B (2026-10-13).
 * Rules: docs/DENTAL-WRITING.md. Internal links only point at kept URLs
 * (src/content/dental.ts). Every source URL was checked on 2026-10-13.
 */
import type { SeedPost } from './seed';

const S = {
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  x12Rarc: { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  cmsTransactions: { label: 'CMS: HIPAA Transactions Overview', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions' },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  adaPlanTypes: { label: 'ADA: Types of Dental Plans', url: 'https://www.ada.org/resources/practice/dental-insurance/types-of-dental-plans' },
  adaCapitation: { label: 'ADA: Capitation/Dental Health Maintenance Organization (DHMO) Plans', url: 'https://www.ada.org/resources/practice/practice-management/capitation-dhmo-plans' },
  adaIntroBenefits: { label: 'ADA: An Introduction to Dental Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/an-introduction-to-dental-benefits' },
  blsManagers: { label: 'BLS Occupational Outlook Handbook: Medical and Health Services Managers', url: 'https://www.bls.gov/ooh/management/medical-and-health-services-managers.htm' },
  blsReceptionists: { label: 'BLS Occupational Outlook Handbook: Receptionists', url: 'https://www.bls.gov/ooh/office-and-administrative-support/receptionists.htm' },
  cmsNsa: { label: 'CMS: No Surprises Act', url: 'https://www.cms.gov/nosurprises' },
  hfmaMapKeys: { label: 'HFMA: MAP Keys, industry-standard revenue cycle KPIs', url: 'https://www.hfma.org/data-and-insights/map-initiative/map-keys/' },
};

export const dentalTopicsB: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-carc-rarc-denial-codes',
    title: 'CARC Codes and RARC Codes on Dental Claims: How to Read and Act on Them',
    seoTitle: 'CARC Codes on Dental Claims: CARC, RARC and Group Codes',
    metaDescription:
      'What CARC codes, RARC codes and group codes mean on a dental ERA or EOB, the dental denial codes offices see most often and what to do about each one.',
    excerpt:
      'A practical guide to the adjustment codes on dental remittances: how CARC, RARC and group codes fit together, which ones dental offices run into most, and the next step for each.',
    category: 'Denial Management',
    tags: ['CARC codes', 'RARC codes', 'dental denial codes', 'ERA', 'EOB', 'denial management'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>CARC codes (Claim Adjustment Reason Codes) are the standard codes a dental carrier uses to explain why it paid a claim line differently from what the office billed.</strong> Every time an ERA or EOB shows a reduction, a denial or a patient portion, a CARC sits next to the dollar amount. It usually travels with a two-letter group code that says who owns the balance, and sometimes with a RARC (Remittance Advice Remark Code) that adds detail.</p>

<p>Reading these codes correctly is the difference between writing off money you should appeal and appealing money you should have billed to the patient. This guide explains how the three code types work together on a dental remittance, walks through the dental denial codes offices see most often, and gives a next step for each. The code lists themselves are maintained by X12, and the descriptions below are our own summaries, so always check the current wording on the X12 site before you act.</p>

<h2>What is a CARC on a dental ERA or EOB?</h2>
<p>A CARC is a numeric code that states the reason for an adjustment on a claim or a single service line. On an electronic remittance (the 835 transaction) it appears in the adjustment segments; on a paper or portal EOB, the carrier often prints the same code with its own plain-language note. X12 maintains the official list, adds and retires codes on a regular schedule, and attaches usage notes to many of them. Some codes, for example, may only be used with a particular group code, and some must always be paired with a remark code.</p>
<p>Because the list is national, the same CARC means the same thing whether it comes from a large dental PPO or a state Medicaid dental program. What changes is the carrier's reason behind it, which is why the remark codes and the carrier's own notes matter.</p>

<h2>What is a RARC code, and how is it different from a CARC?</h2>
<p>A RARC code adds detail a CARC cannot carry on its own. X12 describes most remark codes as supplemental: they explain the adjustment that a CARC already reported. A smaller group, marked as alerts, simply pass along information about the remittance and are not tied to any adjustment. RARCs start with a letter, such as N or M, followed by numbers.</p>
<p>In practice, the CARC tells you the category of problem and the RARC tells you what to fix. A CARC that says information is missing is not useful until the remark code says which information. Several CARCs on the X12 list, including the codes for missing information, non-covered charges and required attachments, carry a note that a remark code must be supplied with them.</p>

<h2>What do the group codes CO, PR, OA and PI mean?</h2>
<p>Group codes assign financial responsibility for each adjustment. They are always two letters:</p>
<ul>
<li><strong>CO, Contractual Obligation.</strong> The office absorbs the amount under its contract or by regulation. You cannot bill the patient for a CO adjustment.</li>
<li><strong>PR, Patient Responsibility.</strong> The amount may be billed to the patient, such as a deductible, coinsurance or copay.</li>
<li><strong>OA, Other Adjustment.</strong> Used when neither CO nor PR fits, for example amounts tied to a prior payer on a secondary claim.</li>
<li><strong>PI, Payer Initiated Reduction.</strong> The carrier reduced the payment for its own reasons, outside a contract term or patient share.</li>
</ul>
<p>X12 also lists CR (corrections and reversals) but notes it is not used with version 5010 and later. The group code is often more important than the CARC for posting, because it decides whether the balance goes to a write-off or onto a patient statement.</p>

<h2>Which CARC codes show up most on dental claims?</h2>
<p>The table below covers dental denial codes and adjustment codes that dental offices commonly run into. Descriptions are short summaries of the X12 entries.</p>
<table>
<thead><tr><th>CARC</th><th>Plain meaning</th><th>Typical dental situation</th></tr></thead>
<tbody>
<tr><td>1, 2, 3</td><td>Deductible, coinsurance, copay</td><td>The patient's share under the plan; normally grouped PR</td></tr>
<tr><td>45</td><td>Charge exceeds the fee schedule or contracted fee</td><td>The PPO write-off between your office fee and the allowed amount; grouped CO or PR depending on liability</td></tr>
<tr><td>119</td><td>Benefit maximum for the period has been reached</td><td>The annual maximum is used up</td></tr>
<tr><td>151</td><td>Information does not support this many or this frequency of services</td><td>A cleaning, exam or x-ray billed inside a frequency limit</td></tr>
<tr><td>97</td><td>Benefit is included in another service already adjudicated</td><td>A procedure the carrier treats as part of another one billed the same day</td></tr>
<tr><td>16</td><td>Claim lacks information or has a billing error</td><td>Missing tooth number, surface or other data; read the RARC</td></tr>
<tr><td>252</td><td>An attachment or other documentation is required</td><td>No x-ray, perio chart or narrative was sent</td></tr>
<tr><td>96 and 204</td><td>Non-covered charge; service not covered under the current plan</td><td>An exclusion, such as a plan that does not cover implants</td></tr>
<tr><td>27</td><td>Expenses incurred after coverage ended</td><td>The patient's plan termed before the date of service</td></tr>
<tr><td>29</td><td>Time limit for filing has expired</td><td>The claim went out after the carrier's filing deadline</td></tr>
<tr><td>22 and 23</td><td>Another payer may be primary; impact of prior payer adjudication</td><td>Coordination of benefits issues on dual-coverage patients</td></tr>
<tr><td>18</td><td>Exact duplicate claim or service</td><td>The same claim was sent twice</td></tr>
<tr><td>197</td><td>Precertification or pre-treatment was absent</td><td>A plan that requires approval before certain treatment</td></tr>
<tr><td>109</td><td>Claim not covered by this payer</td><td>Sent to the wrong carrier or plan</td></tr>
</tbody>
</table>
<p>A few remark codes come up alongside these often enough to recognize. On the X12 list, N4 says the prior carrier's EOB was missing, incomplete or invalid, which matters on secondary claims. M86 says payment was denied because the same or a similar procedure was already paid within a set time frame. N130 tells the office to check the plan's benefit documents for restrictions. MA130 marks a claim as unprocessable because of incomplete or invalid information and points toward a new, corrected claim rather than an appeal.</p>

<h2>How should a dental office act on each code?</h2>
<p>Sort every adjustment into one of four actions before anyone touches the account:</p>
<ol>
<li><strong>Bill the patient.</strong> PR adjustments such as deductible and coinsurance belong on the statement. Check that the amount matches the benefits breakdown collected at verification.</li>
<li><strong>Write off under contract.</strong> CO-45 on an in-network PPO claim is normally a contractual adjustment. Compare the allowed amount against your loaded fee schedule; if the carrier allowed less than your contract says, that is an underpayment to dispute, not a write-off.</li>
<li><strong>Correct and resubmit.</strong> CARC 16, 252, MA130 and many 97 situations point to a fixable claim problem. Add the missing data or attachment and send a corrected claim, following the carrier's rules for corrected claims.</li>
<li><strong>Appeal.</strong> When the documentation already supported the service, such as a 151 frequency denial on a patient who changed plans or a 97 bundling decision you disagree with, an appeal with a narrative and records is the right path. Our guide on <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a> covers the letter and timing.</li>
</ol>
<p>Codes 27, 109 and 22 are usually eligibility problems. Re-verify coverage, find the correct primary carrier and bill there. CARC 29 is hard to overturn unless you can prove timely submission with a clearinghouse acceptance report, so keep those reports.</p>

<h2>How do you stop the same denial codes from coming back?</h2>
<p>Treat each CARC as data. Log the code, the carrier, the CDT code and the root cause for every denial for a month, then look at the totals. Patterns usually point back to a front desk step (eligibility, frequency history, coordination of benefits) or a claim step (attachments, tooth and surface data). Fix the step and the code disappears.</p>
<p>The <a href="/tools/eob-explained/">EOB explained tool</a> breaks down a remittance line by line, and the <a href="/tools/dental-denial-rate-calculator/">dental denial rate calculator</a> shows whether the trend is improving. If you would rather hand off the whole workflow, our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team reads remits, corrects claims and files appeals inside your own software, and <a href="/services/payment-posting/">Payment Posting</a> applies each group code to the right bucket.</p>

<h2>Where can you look up the full code lists?</h2>
<p>X12 publishes the complete CARC and RARC lists for free, with each code's start date, any stop date and usage notes. Bookmark both pages, because codes are added, revised and deactivated over time and a carrier's printed description can lag behind. When a carrier's note and the X12 definition seem to disagree, call the carrier and ask which policy triggered the adjustment.</p>

<p>Want a second set of eyes on the codes on your remits? <a href="/consultation/">Book a free consultation</a> and we will walk through a sample of your recent dental ERAs with you.</p>
`,
    faqs: [
      {
        q: 'What does CARC stand for?',
        a: 'CARC stands for Claim Adjustment Reason Code. It is a standard code on an ERA or EOB that explains why a dental carrier paid a claim line differently from the billed amount. X12 maintains the national list, so the same code number means the same thing regardless of which carrier sends it, even though the carrier may add its own note.',
      },
      {
        q: 'What is the difference between a CARC and a RARC code?',
        a: 'A CARC gives the reason for an adjustment, while a RARC code adds detail about that reason or passes along general information. For example, a CARC may say information is missing and the RARC says which information. Several CARCs, including those for missing information and required attachments, must be sent with a remark code under the X12 rules.',
      },
      {
        q: 'Can I bill the patient for a CO-45 adjustment?',
        a: 'No. CO means contractual obligation, so the office absorbs the amount under its agreement with the carrier. On an in-network dental PPO claim, CO-45 is usually the difference between your office fee and the contracted allowed amount. If the allowed amount is lower than your contract says, dispute it as an underpayment rather than billing the patient.',
      },
      {
        q: 'What does CARC 119 mean on a dental claim?',
        a: 'CARC 119 means the benefit maximum for the period or occurrence has been reached. On dental claims it usually means the patient has used up the annual maximum. The remaining balance is typically the patient\'s responsibility, so confirm the maximum and remaining benefits at verification and include that amount in the estimate before treatment starts.',
      },
      {
        q: 'Should I appeal or resubmit a denied dental claim?',
        a: 'Resubmit a corrected claim when the denial came from a fixable error, such as missing tooth data or a missing attachment. Appeal when the original claim was correct and the carrier still denied it, such as a frequency or bundling decision you can support with records. Check each carrier\'s rules, because some treat corrected claims and appeals very differently.',
      },
    ],
    sources: [S.x12Carc, S.x12Rarc, S.cmsTransactions, S.adaClaimForm, S.adaInsurance],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dhmo-vs-ppo-for-dental-practices',
    title: 'Dental PPO vs HMO: What Each Plan Type Means for Your Practice',
    seoTitle: 'Dental PPO vs HMO: A Practice-Side Comparison',
    metaDescription:
      'Dental PPO vs HMO from the practice side: capitation vs fee for service, copay schedules, referrals, posting and how to explain each plan to patients.',
    excerpt:
      'How DHMO and PPO dental plans differ for the office that has to bill them: how money arrives, how copays and referrals work, how posting changes, and a plain explanation to share with patients.',
    category: 'Practice Management',
    tags: ['dental PPO vs HMO', 'DHMO', 'capitation', 'PPO dental billing', 'payment posting'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The core difference in dental PPO vs HMO plans is how the practice gets paid: a PPO pays per procedure at a contracted fee, while a dental HMO (DHMO) pays a fixed monthly amount per assigned patient and the patient pays set copays.</strong> Everything else, from how claims are filed to how payments are posted and how treatment is presented, follows from that one difference.</p>

<p>Most comparisons of HMO vs PPO dental plans are written for patients choosing coverage. This one is written for the dentist, office manager or DSO deciding whether to participate in a plan, and for the team that has to bill it. It also includes a short section you can adapt when patients ask what their plan type means.</p>

<h2>How does a dental PPO pay the practice?</h2>
<p>The ADA describes a PPO as indemnity-style coverage combined with a network of dentists who have agreed to set fees. The practice is paid fee for service: each procedure is submitted on a claim with a CDT code, the carrier applies its contracted fee schedule, frequency limits, deductible and annual maximum, and pays its percentage of the allowed amount. The patient owes the rest of the allowed amount.</p>
<p>For an in-network office, the gap between the office's full fee and the PPO allowed amount is written off. That write-off is the price of participation, and it is why fee schedule negotiation and accurate fee schedule loading in your practice software matter so much. Patients can usually see out-of-network dentists too, though their benefit is often lower. Our <a href="/blog/ppo-dental-billing-guide/">PPO dental billing guide</a> covers the PPO workflow in more depth.</p>

<h2>How does a DHMO or capitation plan pay the practice?</h2>
<p>Under a capitation plan, the ADA explains, the contracted dentist receives a fixed monthly payment for each patient assigned to the office, whether or not that patient comes in. In exchange, the office agrees to provide listed services at no charge or at reduced fees. Patients generally must use a contracted office to receive any benefit, which is why the ADA calls these closed panel plans.</p>
<p>The monthly capitation check gives the practice predictable income, but the ADA also points out the risk: if the cost of care for assigned patients exceeds what the plan pays, the practice carries the loss. Profitability depends on how the office runs, which procedures it performs and the oral health of the covered group. Elective services outside the plan, such as whitening, can typically be charged at the office's regular fee.</p>

<h2>What are DHMO copay schedules, and how do they work?</h2>
<p>Instead of a percentage of an allowed amount, a DHMO gives the patient a fixed dollar copay for each covered CDT code, set out in a copay schedule. Preventive and diagnostic services often carry no copay, and other procedures carry a listed amount. The patient pays that copay at the visit and the office collects nothing further from the plan for that procedure beyond capitation, unless the contract includes supplemental payments for certain services.</p>
<p>Copay schedules differ by plan and sometimes by employer group, so the front desk must confirm which schedule applies at verification. Using the wrong schedule means quoting the wrong amount, which leads to refunds or patient frustration later.</p>

<h2>How do referrals work in dental HMO vs PPO plans?</h2>
<p>In a PPO, patients can usually see a specialist directly, and the specialist bills the carrier on its own claim. In a DHMO, the patient's chosen general dentist acts as a gatekeeper. The ADA notes that this dentist decides whether and when a patient should be referred to a specialist, and the plan normally requires a formal referral to a contracted specialist before it will cover the care.</p>
<p>For the general practice, that means tracking referrals, sending the right forms and documentation and knowing which specialists are contracted. For a specialty office that accepts DHMO referrals, it means confirming an approved referral exists before treatment, or the patient may owe full fees.</p>

<h2>How are billing and payment posting different?</h2>
<table>
<thead><tr><th>Task</th><th>Dental PPO</th><th>DHMO / capitation</th></tr></thead>
<tbody>
<tr><td>How money arrives</td><td>Claim payments by ERA or EOB, tied to specific claims</td><td>A monthly capitation payment for the roster, plus patient copays</td></tr>
<tr><td>Claims</td><td>Claim for every visit</td><td>Depends on the contract; some plans want encounter data, some want claims for supplemental payments</td></tr>
<tr><td>Patient portion</td><td>Deductible and coinsurance on the allowed amount</td><td>Fixed copay per CDT code from the schedule</td></tr>
<tr><td>Write-off</td><td>Office fee minus PPO allowed amount</td><td>Office fee minus patient copay, if the office records full fees</td></tr>
<tr><td>Roster work</td><td>None</td><td>Monthly eligibility roster review to confirm who is assigned</td></tr>
</tbody>
</table>
<p>Posting capitation correctly takes some setup. The monthly payment is not linked to individual procedures, so it is usually posted as an unattached or practice-level payment, and the procedure-level write-offs are handled through a copay fee schedule attached to the patient's plan. If the software is set up inconsistently, production and collection reports become misleading, because DHMO production can look like uncollected revenue. Our <a href="/services/payment-posting/">Payment Posting</a> team handles both claim-based PPO payments and capitation deposits inside Open Dental, Dentrix and Eaglesoft.</p>
<p>The monthly roster deserves its own routine. Compare the plan's list of assigned patients against your schedule, flag patients who appear on the schedule but not the roster, and ask the plan about any missing members before treating them.</p>

<h2>How do denials and A/R differ between the two plan types?</h2>
<p>PPO revenue depends on claims, so PPO problems show up as denials and aging. Frequency limits, missing attachments, downgrades and coordination of benefits errors all reduce or delay payment, and each one needs follow-up. The insurance aging report for a PPO-heavy office is usually long, and it needs regular attention.</p>
<p>DHMO revenue arrives whether or not a claim is filed, so the risks look different. The common issues are patients treated while not on the current roster, copays quoted from the wrong schedule, missing referrals for specialty care and supplemental payments that were never requested. These problems do not always appear on an aging report, which is why a monthly roster reconciliation and a copay audit are worth the time. When comparing dental PPO vs HMO workloads, count both kinds of follow-up, not just the number of claims.</p>

<h2>Dental PPO vs HMO: which plan type makes more sense for a practice?</h2>
<p>There is no single answer, and no one outside your practice can make the call for you. A few questions help:</p>
<ul>
<li>How many patients in your area carry each plan type, and are they already in your schedule?</li>
<li>For a DHMO, does the monthly payment plus copays cover the expected cost of care for the assigned group, based on your own procedure mix?</li>
<li>For a PPO, how deep is the write-off on your most common procedures compared with your office fees?</li>
<li>Does your team have the capacity to manage rosters, referrals and copay schedules, or the volume of claims, appeals and follow-up a PPO creates?</li>
</ul>
<p>Running the numbers on real data, rather than a plan representative's estimate, is the safest approach. Review contracts carefully, and get professional advice on any legal or financial terms before signing.</p>

<h2>How can the front desk explain dental insurance HMO vs PPO plans to patients?</h2>
<p>Patients often do not know which type they have. A short, neutral explanation helps:</p>
<blockquote>"With an HMO dental plan, you choose a dentist in the plan's network, and most covered services have a set copay that you can see on your plan's copay list. Seeing a specialist usually needs a referral from your dentist. With a PPO plan, the insurance pays a percentage of a set fee for each service, up to a yearly maximum, and you pay the rest. You can usually see any dentist, but your costs are often lower in network."</blockquote>
<p>Pair that with a written estimate for planned treatment, and point patients to their plan documents for exact details.</p>

<p>Weighing a DHMO contract or struggling to post capitation correctly? <a href="/consultation/">Book a free consultation</a> and we will look at how each plan type is set up in your software.</p>
`,
    faqs: [
      {
        q: 'What is the main difference between a dental PPO and a DHMO for the practice?',
        a: 'The payment model. A dental PPO pays fee for service, meaning the carrier pays its share of a contracted fee for each procedure billed on a claim. A DHMO pays the office a fixed monthly capitation amount for each assigned patient, and patients pay set copays for covered procedures. Billing, posting and reporting all follow from that difference.',
      },
      {
        q: 'Do dental offices file claims for DHMO patients?',
        a: 'It depends on the contract. Since the plan pays a monthly amount instead of paying per procedure, many capitation arrangements do not use claims the way PPOs do. Some plans still ask for encounter data, and some pay supplemental amounts for certain procedures that require a claim. Read the provider manual for each plan you join.',
      },
      {
        q: 'How do you post a capitation payment in dental software?',
        a: 'Most offices post the monthly capitation check as a payment that is not tied to specific procedures, then attach a copay fee schedule to the DHMO plan so procedure write-offs calculate automatically. The exact steps differ between Open Dental, Dentrix and Eaglesoft. The goal is consistent setup so production and collection reports stay accurate.',
      },
      {
        q: 'Can a DHMO patient see a specialist directly?',
        a: 'Usually not. In a DHMO the patient\'s general dentist acts as a gatekeeper and decides whether and when to refer to a specialist, and the plan typically requires a referral to a contracted specialist. Without an approved referral, the patient may owe the specialist\'s full fee, so both offices should confirm the referral before treatment.',
      },
      {
        q: 'Is a DHMO or PPO better for a dental practice?',
        a: 'Neither is better in every case. A DHMO can bring predictable monthly income and new patients, but the practice carries the risk if care costs exceed the payment. A PPO pays per procedure but involves write-offs and more claim work. Compare both against your own procedure mix, patient base and staff capacity.',
      },
    ],
    sources: [S.adaPlanTypes, S.adaCapitation, S.adaIntroBenefits, S.adaInsurance, S.x12Carc],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-office-manager-billing-duties',
    title: 'Dental Office Manager and Treatment Coordinator Roles in the Revenue Cycle',
    seoTitle: 'Dental Office Manager and Treatment Coordinator Duties',
    metaDescription:
      'How the dental office manager and treatment coordinator shape revenue: financial presentations, estimates, collections policy, reports and outside help.',
    excerpt:
      'What the dental office manager and the treatment coordinator each own in the revenue cycle, the reports worth reviewing every month, and how an outsourced dental RCM team fits around them.',
    category: 'Practice Management',
    tags: ['dental office manager', 'dental treatment coordinator', 'treatment coordinator', 'financial policy', 'dental RCM'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A dental office manager owns how the practice runs and gets paid, while a dental treatment coordinator owns the conversation that turns a treatment plan into a scheduled, financially understood appointment.</strong> Both roles sit at the center of the revenue cycle. When they work well together, patients know what they will owe before treatment, claims go out clean and balances do not pile up.</p>

<p>Job titles vary from office to office. In a small practice one person may do both jobs; in a larger group or DSO the roles are often separate, with a regional manager above them. This guide describes the revenue cycle work each role usually carries, the reports a dental office manager should review, and where an outsourced dental RCM team can take work off their desks.</p>

<h2>What does a dental office manager do for the revenue cycle?</h2>
<p>The Bureau of Labor Statistics describes health services managers as the people who plan and coordinate the business side of care: setting goals for efficiency and quality, preparing and monitoring budgets, managing patient fees and billing, hiring and supervising staff, and keeping the operation within the law. In a dental office, that general description turns into specific revenue tasks:</p>
<ul>
<li><strong>Writing and enforcing the financial policy.</strong> When payment is due, which payment options exist, how insurance estimates are explained and what happens to balances that go unpaid.</li>
<li><strong>Owning insurance participation.</strong> Tracking which PPO, DHMO and Medicaid dental plans the practice is in, keeping credentialing current and making sure fee schedules are loaded correctly.</li>
<li><strong>Overseeing billing work.</strong> Whether billing is done in house or by an outside team, the office manager is accountable for claim submission, posting, follow-up and patient statements.</li>
<li><strong>Training the front desk.</strong> Verification, intake, copay collection and scheduling habits all start with how the team is trained.</li>
<li><strong>Reviewing reports and acting on them.</strong> Numbers only help if someone reads them every month and assigns follow-up.</li>
</ul>

<h2>What does a dental treatment coordinator do?</h2>
<p>A treatment coordinator, sometimes called a TC or patient coordinator, takes over after the dentist diagnoses and recommends treatment. The role is part education, part scheduling and part finance. A typical day includes:</p>
<ul>
<li>Reviewing the treatment plan with the patient in plain language, including the sequence of visits.</li>
<li>Presenting a written estimate that separates what insurance is expected to pay from what the patient will owe.</li>
<li>Discussing payment options under the practice's financial policy and documenting what the patient agreed to.</li>
<li>Requesting pre-treatment estimates from the carrier for major work when the plan or the patient wants one.</li>
<li>Scheduling the treatment and following up with patients who did not schedule.</li>
</ul>
<p>The treatment coordinator is often the person patients remember when a bill surprises them, so the accuracy of the estimate matters as much as the presentation.</p>

<h2>How should a financial presentation and estimate be built?</h2>
<p>A reliable estimate starts with a full benefits breakdown, not just active coverage. The coordinator needs the annual maximum and how much is left, the deductible and whether it is met, coverage percentages by category, frequency limits, waiting periods, missing tooth clauses and any downgrade rules, such as a plan paying for an alternative material. The CDT codes on the plan must match what the dentist will actually perform.</p>
<p>From there, the math is straightforward: the expected allowed amount, minus deductible, times the coverage percentage, capped by remaining maximum, gives the estimated insurance portion. The patient portion is the rest, plus any amounts the plan does not cover. Our <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> walks through that math step by step.</p>
<p>For larger cases, a pre-treatment estimate sent on the ADA claim form gives the carrier's own projection. It is not a guarantee of payment, so say so in writing. For patients who are uninsured or choose not to use insurance, review the federal good faith estimate rules published on the CMS No Surprises Act pages to see what applies to your practice.</p>

<h2>What should a dental collections policy include?</h2>
<p>A written policy protects both the practice and the patient because everyone hears the same rules. Most dental policies cover:</p>
<ul>
<li>When the estimated patient portion is collected, for example at the time of service.</li>
<li>Which payment options the practice offers, including any third-party financing.</li>
<li>How and when statements are sent, and how many reminders come before further action.</li>
<li>How the office handles the difference when the carrier pays less or more than the estimate.</li>
<li>Who may approve exceptions, discounts or payment arrangements.</li>
</ul>
<p>The office manager writes and updates the policy; the treatment coordinator and front desk explain it. Have any policy that involves outside collections or financing terms reviewed by a professional before you adopt it.</p>

<h2>Which reports should a dental office manager review every month?</h2>
<table>
<thead><tr><th>Report</th><th>What it answers</th></tr></thead>
<tbody>
<tr><td>Production and collections</td><td>How much was produced, collected and adjusted, by provider and by hygiene versus doctor</td></tr>
<tr><td>Insurance aging</td><td>Which claims are unpaid at 30, 60 and 90 or more days, by carrier</td></tr>
<tr><td>Patient aging</td><td>Which patient balances are growing and why</td></tr>
<tr><td>Adjustments and write-offs</td><td>How much is written off for PPO contracts, and how much for other reasons</td></tr>
<tr><td>Denials and outstanding claims</td><td>Which carriers and CDT codes generate the most denials</td></tr>
<tr><td>Unscheduled treatment</td><td>How much diagnosed treatment has not been scheduled</td></tr>
</tbody>
</table>
<p>Open Dental, Dentrix and Eaglesoft all include production, collection and aging reports, though names and filters differ by version. Pick one set, run it the same way each month and compare trends rather than single months. Our <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> service builds that monthly package for you.</p>

<h2>How should the office manager and treatment coordinator work together?</h2>
<p>The two roles share one goal: a patient who understands the cost before treatment and pays on time afterward. That only works when the information flows in both directions. The office manager sets the rules, and the treatment coordinator reports back on where patients push back, which questions come up most and which carriers produce estimates that miss.</p>
<p>A short weekly huddle covers most of it. Review the cases presented that week, how many were scheduled, which estimates turned out wrong once the carrier paid and why. If a carrier keeps downgrading a procedure or applying a frequency limit the team did not expect, the office manager can update the verification template so the next estimate is right. If patients regularly decline treatment over cost, the office manager can review whether the financial policy and payment options still fit the patient base.</p>
<p>Clear ownership also matters. Decide who updates fee schedules, who approves payment arrangements and who answers a patient's call about a bill that differs from the estimate, and write it down.</p>

<h2>How does an outsourced dental RCM team fit with these roles?</h2>
<p>An outside team does not replace the office manager or the treatment coordinator. Patients still need a person in the office to present treatment and answer questions. What an outsourced team can take over is the back-office volume: verifying benefits ahead of appointments, building and sending claims, posting EOBs and ERAs, working aging reports, appealing denials and preparing statements.</p>
<p>That frees the office manager to manage people and policy, and frees the treatment coordinator to spend time with patients. The handoffs need to be clear: who updates the benefits breakdown, how the coordinator flags treatment that needs a pre-treatment estimate, and how the outside team reports back. A Business Associate Agreement is signed before an outside team accesses any patient data.</p>

<p>Want to see which tasks could come off your office manager's desk? <a href="/consultation/">Book a free consultation</a> and we will map your current workflow with you.</p>
`,
    faqs: [
      {
        q: 'What does a dental office manager do?',
        a: 'A dental office manager runs the business side of the practice. That usually includes writing the financial policy, managing insurance participation and fee schedules, overseeing claims, posting and collections, training the front desk, handling staffing and reviewing monthly reports. In small offices the office manager may also act as the treatment coordinator or the main insurance biller.',
      },
      {
        q: 'What is a dental treatment coordinator?',
        a: 'A dental treatment coordinator is the team member who reviews recommended treatment with patients, presents a written estimate of insurance and patient portions, explains payment options and schedules the work. The role combines patient education with financial conversations, so a treatment coordinator needs accurate benefits information and a clear understanding of the practice\'s financial policy.',
      },
      {
        q: 'How accurate does a dental treatment estimate need to be?',
        a: 'As accurate as current benefits information allows. Build it from a full breakdown that includes remaining maximum, deductible, coverage percentages, frequency limits, waiting periods and downgrade rules. Even then, it is an estimate, not a guarantee, because the carrier decides payment when the claim is processed. Tell patients that in writing.',
      },
      {
        q: 'Which reports should a dental office manager check monthly?',
        a: 'At minimum, review production and collections, insurance aging, patient aging, adjustments and write-offs, denials and unscheduled treatment. Run each report the same way every month in your practice software so the trends are comparable. A single month can mislead, while three to six months of the same report shows where attention is needed.',
      },
      {
        q: 'Can an outsourced dental RCM team replace the office manager?',
        a: 'No. An outsourced team handles back-office work such as verification, claims, posting, follow-up and statements. The office manager still leads staff, sets policy and makes decisions, and the treatment coordinator still meets with patients. Outsourcing works best when it frees those roles to focus on people instead of paperwork.',
      },
    ],
    sources: [S.blsManagers, S.adaClaimForm, S.adaPlanTypes, S.cmsNsa, S.adaInsurance],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-front-desk-insurance-checklist',
    title: 'Dental Front Desk Insurance Checklist: Daily and Weekly Tasks',
    seoTitle: 'Dental Front Desk Insurance Checklist: Daily and Weekly',
    metaDescription:
      'A daily and weekly insurance checklist for the dental front desk: verification, intake data, copay collection, claim-ready handoffs and patient statements.',
    excerpt:
      'A practical checklist for the dental front office: what to verify before each appointment, what to capture at check-in, what to collect, how to hand off a claim-ready visit and what to review each week.',
    category: 'Practice Management',
    tags: ['dental front desk', 'dental front office', 'front desk dental receptionist', 'insurance verification', 'dental checklist'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The dental front desk controls the information every insurance claim depends on, so a short daily and weekly checklist prevents most of the denials and patient billing surprises a practice sees later.</strong> Wrong subscriber details, an unverified frequency limit or an uncollected copay at check-in all turn into rework weeks after the patient has left.</p>

<p>The checklist below is written for the front desk dental receptionist, the insurance coordinator and anyone else in the dental front office who touches scheduling, check-in or checkout. Adapt it to your own software and carriers, and keep it where the whole team can see it. A printed copy at each dental front desk station works well, and so does a shared task list in the practice software. Whichever format you choose, give every item a named owner and a time of day, so tasks do not fall between two people on a busy morning.</p>

<h2>Why does the dental front desk matter so much for insurance?</h2>
<p>The Bureau of Labor Statistics notes that receptionists in health offices greet patients, collect personal information and, in some offices, handle billing and insurance payments, all while protecting confidential data. In a dental office the role goes further. The front desk is usually the first and last point of contact, which means it gathers the data that ends up on the ADA claim form and collects the money that is due at the visit.</p>
<p>Errors made at the front are cheap to fix on the day and expensive to fix later. A typo in a subscriber ID takes seconds to correct at check-in, but weeks to resolve after a rejection, a resubmission and a confused patient call.</p>

<h2>What should the front desk verify before each appointment?</h2>
<p>Verify insurance for every patient on the schedule, ideally two to three business days ahead so there is time to fix problems. Electronic eligibility checks use the HIPAA standard 270 inquiry and 271 response, and many carriers add detail in their web portals. Confirm:</p>
<ul>
<li>Active coverage on the date of service, the plan type (PPO, DHMO, Medicaid dental or other) and the correct payer ID.</li>
<li>Subscriber name, date of birth, ID and group number, and the patient's relationship to the subscriber.</li>
<li>Annual maximum and remaining benefits, deductible and how much is met.</li>
<li>Coverage percentages for preventive, basic and major services, or the copay schedule for a DHMO.</li>
<li>Frequency limits and the last dates of service for cleanings, exams, x-rays and fluoride.</li>
<li>Waiting periods, missing tooth clauses and downgrade rules for planned treatment.</li>
<li>Any secondary coverage, and which plan is primary under coordination of benefits rules.</li>
</ul>
<p>Our free <a href="/tools/dental-insurance-verification-checklist/">dental insurance verification checklist</a> lists each field to capture, and record the reference number or portal screenshot in the patient's chart.</p>

<h2>What intake data needs to be correct at check-in?</h2>
<p>At every visit, ask patients whether anything has changed: address, phone, employer, insurance card or secondary coverage. Scan the front and back of each insurance card. For new patients, confirm the registration form is complete and signed, including assignment of benefits and authorization to release information.</p>
<p>Two details cause a large share of avoidable problems. First, the subscriber and the patient are often different people, and their names and birth dates must match the carrier's records exactly. Second, dual coverage needs a clear primary and secondary order. The ADA publishes guidance on coordination of benefits that the team can use as a reference when a patient has two dental plans.</p>

<h2>How should the front desk collect copays and estimated patient portions?</h2>
<p>Follow the practice's financial policy every time, so patients hear the same rules from every team member. Before the patient leaves:</p>
<ul>
<li>Collect DHMO copays from the plan's copay schedule for the procedures completed.</li>
<li>Collect the estimated patient portion for PPO patients, based on the verified benefits.</li>
<li>Collect any prior balance, or confirm an existing payment arrangement.</li>
<li>Give a receipt and post the payment to the correct procedures in the software.</li>
</ul>
<p>If the estimate turns out to be wrong after the carrier pays, the policy should say how the difference is handled, whether by refund, credit or statement.</p>

<h2>What does a claim-ready handoff from the chart look like?</h2>
<p>A claim can only be as good as the charting behind it. Before checkout, the front desk or insurance coordinator should confirm that:</p>
<ul>
<li>All completed procedures are posted with the correct CDT code, tooth number, surfaces or quadrant.</li>
<li>The provider on each procedure matches who performed it, which matters for hygiene versus doctor production and for credentialing.</li>
<li>Clinical notes are signed and complete.</li>
<li>Required attachments are ready: x-rays, perio charts, intraoral photos or a narrative, depending on the procedure and carrier.</li>
<li>Any pre-treatment estimate number is attached to the claim.</li>
</ul>
<p>Send claims the same day whenever possible. Same-day submission keeps the visit fresh for anyone who needs to answer a question about it.</p>

<h2>What belongs on the weekly front desk checklist?</h2>
<ol>
<li><strong>Review unsent and rejected claims.</strong> Clear the clearinghouse rejection list so no claim sits in limbo.</li>
<li><strong>Check outstanding claims.</strong> Follow up on claims older than about 30 days without a response, by portal or phone.</li>
<li><strong>Confirm payments are posted.</strong> Make sure every ERA and EOB received is posted and the deposit matches.</li>
<li><strong>Process patient statements.</strong> Send statements on the practice's schedule after insurance has paid, and review balances before they go out.</li>
<li><strong>Verify next week's schedule.</strong> Start verification for upcoming patients and flag anyone whose coverage could not be confirmed.</li>
<li><strong>Update the unscheduled treatment list.</strong> Call patients with pending treatment and remaining benefits.</li>
</ol>

<h2>How should the front desk handle insurance and billing calls?</h2>
<p>Patients call with the same few questions: what their plan covers, why a bill is higher than expected and whether a claim has been paid. Give the team a simple routine. Pull up the account, the latest EOB and the estimate given at the visit before answering. Explain the difference in plain terms, such as a deductible that was not yet met, a frequency limit or an annual maximum that ran out. If the carrier's decision looks wrong, tell the patient the office will review it and log the follow-up rather than guessing on the phone.</p>
<p>For calls to carriers, keep a log with the date, the representative's name, the reference number and what was said. That record is often what wins a later dispute.</p>

<h2>What end-of-day checks close out the dental front desk?</h2>
<ul>
<li>Every patient seen today has procedures posted and a claim created or a reason noted.</li>
<li>The day's payments are balanced against the deposit, card batch and any checks received.</li>
<li>Tomorrow's schedule is verified, and patients with unconfirmed coverage are flagged for a call.</li>
<li>Any patient who asked for a call back about insurance or a bill has a note and an owner.</li>
</ul>
<p>Ten minutes of closing checks prevents most of the loose ends that turn into old balances.</p>

<h2>When should a dental front office get outside help?</h2>
<p>A busy front desk dental receptionist cannot answer phones, greet patients and spend an hour on hold with a carrier at the same time. If verification falls behind, claims go out late or the rejection list keeps growing, the issue is usually capacity, not effort. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service checks benefits before appointments and records the breakdown in your software, so the front desk can focus on patients in the office.</p>

<p>Want an outside view of your front office insurance workflow? <a href="/consultation/">Book a free consultation</a> and we will review it with you step by step.</p>
`,
    faqs: [
      {
        q: 'What does a dental front desk receptionist do?',
        a: 'A dental front desk receptionist greets patients, answers phones, schedules and confirms appointments, updates patient and insurance information, collects copays and patient portions and often helps with insurance verification and claims. In many offices the role also includes sending statements and following up on balances, which makes accurate data entry very important.',
      },
      {
        q: 'How far ahead should the front desk verify dental insurance?',
        a: 'Many offices verify two to three business days before the appointment. That gives the team time to fix inactive coverage, wrong subscriber details or missing secondary information before the patient arrives. Recheck on the day of service for patients whose coverage was uncertain or who mention a change in employer or plan at check-in.',
      },
      {
        q: 'What should be on a dental front office daily checklist?',
        a: 'A daily checklist should cover verifying tomorrow\'s patients, updating demographics and insurance cards at check-in, collecting copays and estimated patient portions, confirming procedures are charted with correct CDT codes and teeth, preparing attachments and sending claims the same day. Each item prevents a common cause of rejections, denials or patient billing complaints.',
      },
      {
        q: 'Should the front desk collect the patient portion at the visit?',
        a: 'Most dental practices collect the estimated patient portion and any DHMO copay at the time of service, based on the written financial policy. Collecting at the visit reduces statements and old balances. Because the amount is an estimate, the policy should also explain how the office handles any difference once the carrier pays.',
      },
    ],
    sources: [S.blsReceptionists, S.cmsTransactions, S.adaCob, S.adaClaimForm, S.adaInsurance],
  },

  // 5 ------------------------------------------------------------------
  {
    slug: 'dental-practice-kpis',
    title: 'Dental KPIs: The Revenue Cycle Numbers Every Practice Should Track',
    seoTitle: 'Dental KPIs: Revenue Cycle Formulas for Your Practice',
    metaDescription:
      'Six dental KPIs for the revenue cycle with formulas: collection rate, days in A/R, denial rate, clean claim rate, A/R over 90 days and PPO write-off percentage.',
    excerpt:
      'The dental key performance indicators that show whether your revenue cycle is healthy, with a formula for each, where to find the inputs in your practice software and a calculator to check your numbers.',
    category: 'Practice Management',
    tags: ['dental KPIs', 'dental key performance indicators', 'dental practice KPIs', 'collection rate', 'days in A/R', 'denial rate'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental KPIs are the handful of numbers that show whether a practice is turning its production into collected revenue on time.</strong> Six of them cover most of the revenue cycle: net collection rate, days in A/R, denial rate, clean claim rate, the share of A/R over 90 days and the PPO write-off percentage. Track them the same way every month and they tell you where to look before a cash flow problem becomes obvious.</p>

<p>This guide gives a formula for each of these dental key performance indicators, explains what the number tells you, and links a free calculator for each one. It also covers where to pull the inputs from in Open Dental, Dentrix and Eaglesoft in general terms, because report names and filters vary by version.</p>

<h2>Which dental KPIs should a practice track first?</h2>
<table>
<thead><tr><th>KPI</th><th>Question it answers</th></tr></thead>
<tbody>
<tr><td>Net collection rate</td><td>Are we collecting what we are owed after contract write-offs?</td></tr>
<tr><td>Days in A/R</td><td>How long does it take to turn production into cash?</td></tr>
<tr><td>Denial rate</td><td>How often do carriers refuse payment?</td></tr>
<tr><td>Clean claim rate</td><td>How often do claims go through the first time?</td></tr>
<tr><td>A/R over 90 days</td><td>How much money is at risk of never being collected?</td></tr>
<tr><td>PPO write-off percentage</td><td>How much of our full fee do network contracts cost us?</td></tr>
</tbody>
</table>
<p>If you can only start with two, begin with net collection rate and A/R over 90 days. They show the end result and the biggest risk, and the other four help explain why those two numbers move.</p>

<h2>Why do dental practice KPIs need consistent definitions?</h2>
<p>A KPI is only useful if it is calculated the same way every time. Two people can compute "collection rate" from the same reports and get very different answers if one uses gross production and the other subtracts PPO write-offs first. The Healthcare Financial Management Association addresses this problem with its MAP Keys, a set of standardized revenue cycle measures with fixed definitions. Dental practices can borrow the same discipline: write down each formula, the report it comes from and the date range, and do not change it without noting the change.</p>
<p>Compare your numbers against your own history first. Published benchmarks rarely match a specific practice's payer mix, specialty or fee schedule, so a steady trend in the right direction matters more than hitting someone else's target.</p>

<h2>How do you calculate the dental net collection rate?</h2>
<p><strong>Formula:</strong> net collection rate = total payments received ÷ (gross production minus contractual adjustments) × 100.</p>
<p>This shows how much of the money the practice could realistically collect actually came in. Contractual adjustments are the PPO write-offs and similar contract reductions you agreed to; other adjustments, such as courtesy discounts or bad debt, stay in the denominator because they represent lost revenue. Use a date range of at least three months to smooth out timing differences. Try the <a href="/tools/net-collection-rate-calculator/">net collection rate calculator</a>.</p>

<h2>How do you calculate days in A/R for a dental office?</h2>
<p><strong>Formula:</strong> days in A/R = total accounts receivable ÷ average daily production, where average daily production is the last three months of production divided by the number of days in those months.</p>
<p>The result estimates how many days of production are waiting to be collected. A rising number means claims or patient balances are moving more slowly. HFMA's version of this measure uses net revenue rather than gross charges, so decide whether you use gross or net production and stay consistent. Use the <a href="/tools/days-in-ar-calculator/">days in A/R calculator</a> to run the numbers.</p>

<h2>How do you measure the dental denial rate and the clean claim rate?</h2>
<p><strong>Denial rate formula:</strong> claims denied ÷ claims processed by carriers in the same period × 100. You can also calculate it by dollars instead of claim count.</p>
<p><strong>Clean claim rate formula:</strong> claims accepted and paid on first submission without correction ÷ total claims submitted × 100.</p>
<p>The two numbers look at the same problem from opposite sides. The denial rate shows how often carriers refuse payment; the clean claim rate shows how often claims go through without rework. Track the reason for each denial too. The CARC codes on your ERAs, maintained by X12, give a consistent way to group denials by cause, such as missing attachments, frequency limits or eligibility. The <a href="/tools/dental-denial-rate-calculator/">dental denial rate calculator</a> and the <a href="/tools/clean-claim-rate-calculator/">clean claim rate calculator</a> handle both formulas.</p>

<h2>How do you track A/R over 90 days?</h2>
<p><strong>Formula:</strong> A/R over 90 days = total balances older than 90 days ÷ total A/R × 100.</p>
<p>Old balances are harder to collect: patients move, carriers' filing and appeal deadlines pass, and documentation gets harder to find. Split this KPI into insurance A/R and patient A/R, because the fixes are different. Insurance balances over 90 days usually need claim follow-up, corrected claims or appeals; patient balances need statements, calls and payment arrangements under your financial policy. Use the <a href="/tools/dental-ar-aging-calculator/">dental A/R aging calculator</a> to see how balances spread across the 30, 60 and 90-plus day buckets.</p>

<h2>How do you calculate the PPO write-off percentage?</h2>
<p><strong>Formula:</strong> PPO write-off percentage = contractual write-offs ÷ gross production × 100.</p>
<p>This shows how much of your full fee you give up to participate in PPO networks. It changes with payer mix, procedure mix and fee schedule updates. A sudden jump can mean a new fee schedule was loaded incorrectly, a carrier changed its allowances or more patients moved onto a lower-paying plan. Separate contractual write-offs from all other adjustments so this number stays clean. The <a href="/tools/dental-ppo-write-off-calculator/">dental PPO write-off calculator</a> breaks it down by procedure.</p>

<h2>Where do you find these numbers in Open Dental, Dentrix and Eaglesoft?</h2>
<p>All three systems include the reports you need, though menu names and options differ by version:</p>
<table>
<thead><tr><th>Input</th><th>Report type to use</th></tr></thead>
<tbody>
<tr><td>Gross production</td><td>Production summary or production and income report for the date range</td></tr>
<tr><td>Payments</td><td>Collections or income report, split by insurance and patient</td></tr>
<tr><td>Adjustments</td><td>Adjustment report filtered by adjustment type, so contractual write-offs are separate</td></tr>
<tr><td>Total A/R and aging</td><td>Aging report, run for insurance and patient balances</td></tr>
<tr><td>Claims sent, denied and outstanding</td><td>Outstanding insurance claims report plus clearinghouse and ERA data</td></tr>
</tbody>
</table>
<p>Two setup habits make the numbers trustworthy. First, use distinct adjustment types for PPO write-offs, courtesy discounts and bad debt. Second, post every ERA with its adjustment codes, so denial data exists in the system rather than in someone's memory.</p>

<h2>What mistakes make dental KPIs misleading?</h2>
<ul>
<li><strong>Mixing adjustment types.</strong> When PPO write-offs, discounts and bad debt share one adjustment type, net collection rate and write-off percentage both become guesses.</li>
<li><strong>Changing date ranges.</strong> Comparing a 30-day period one month with a 90-day period the next makes trends meaningless.</li>
<li><strong>Ignoring unposted payments.</strong> ERAs that sit unposted inflate A/R and days in A/R until someone catches up.</li>
<li><strong>Counting rejections as denials.</strong> A clearinghouse rejection never reached the carrier. Track rejections separately so the clean claim rate and denial rate each mean one thing.</li>
<li><strong>Looking at one month.</strong> A slow month or a large case can swing any of these dental KPIs. Read them as a trend.</li>
</ul>

<h2>How often should a dental practice review its dental KPIs?</h2>
<p>Monthly is the right rhythm for most practices, with a quick weekly look at the aging report and outstanding claims. Put the six numbers on one page, show the last six to twelve months side by side and write one action next to any number that moved the wrong way. Our <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> service prepares that monthly report from your own software and explains what changed.</p>

<p>Not sure your current reports are measuring the right things? <a href="/consultation/">Book a free consultation</a> and we will walk through your dental KPIs with you.</p>
`,
    faqs: [
      {
        q: 'What are the most important dental KPIs for the revenue cycle?',
        a: 'Six cover most of the revenue cycle: net collection rate, days in A/R, denial rate, clean claim rate, the share of A/R older than 90 days and the PPO write-off percentage. Together they show whether production is being collected, how fast money arrives, how often claims fail and how much is lost to contracts and aging.',
      },
      {
        q: 'What is the difference between gross and net collection rate in dentistry?',
        a: 'Gross collection rate divides payments by full production, so PPO write-offs make it look low. Net collection rate removes contractual adjustments from production first, showing how much of the collectible amount actually came in. Net collection rate is usually more useful for in-network practices, as long as contractual write-offs are posted separately from other adjustments.',
      },
      {
        q: 'How do you calculate days in A/R for a dental practice?',
        a: 'Divide total accounts receivable by average daily production. To get average daily production, add up the last three months of production and divide by the number of days in that period. The result estimates how many days of production are still unpaid. Use the same production basis, gross or net, every month.',
      },
      {
        q: 'Where do dental KPIs come from in practice management software?',
        a: 'Open Dental, Dentrix and Eaglesoft all include production, collection, adjustment and aging reports, and each can list outstanding insurance claims. Report names and filters differ by version. Pull the same reports with the same settings each month, and set up separate adjustment types so contractual write-offs are not mixed with discounts or bad debt.',
      },
      {
        q: 'How often should a dental office review KPIs?',
        a: 'Review the full set monthly and glance at aging and outstanding claims weekly. Monthly reviews show trends without overreacting to one slow week. Keep six to twelve months side by side and assign a specific follow-up whenever a number moves the wrong way, such as working old claims or fixing a fee schedule.',
      },
    ],
    sources: [S.hfmaMapKeys, S.x12Carc, S.cmsTransactions, S.adaInsurance],
  },
];
