/**
 * Dental RCM guides, batch F (2026-10-22). Original content. Rules: docs/DENTAL-WRITING.md.
 * Sources are limited to URLs already verified elsewhere in this repo.
 */
import type { SeedPost } from './seed';

const S = {
  adaClaimInstructions: {
    label: 'ADA: ADA Dental Claim Form Completion Instructions (Version 2024)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/2024_completioninstructions_adaclaimform_2024.pdf',
  },
  adaTypicalPlan: {
    label: 'ADA: Typical Dental Plan Benefits and Limitations',
    url: 'https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations',
  },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  adaIntroBenefits: { label: 'ADA: An Introduction to Dental Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/an-introduction-to-dental-benefits' },
  medicaidDental: { label: 'Medicaid.gov: Dental Care', url: 'https://www.medicaid.gov/medicaid/benefits/dental-care' },
  medicaidEpsdt: {
    label: 'Medicaid.gov: Early and Periodic Screening, Diagnostic, and Treatment',
    url: 'https://www.medicaid.gov/medicaid/benefits/early-and-periodic-screening-diagnostic-and-treatment',
  },
  insureKidsNow: { label: 'InsureKidsNow.gov: Dental coverage for children', url: 'https://www.insurekidsnow.gov/coverage/dental' },
  adaBundling: { label: 'ADA: Bundling and Downcoding', url: 'https://www.ada.org/resources/practice/dental-insurance/bundling-and-downcoding' },
  adaNewsCoding: {
    label: 'ADA News: Tips to avoid claim denials due to common coding mistakes (December 2025)',
    url: 'https://adanews.ada.org/ada-news/2025/december/tips-to-avoid-claim-denials-due-to-common-coding-mistakes/',
  },
  premeraSeatDate: {
    label: 'Premera Blue Cross Blue Shield of Alaska: Reimbursement Changing from Preparation Date to Seat Date',
    url: 'https://www.premera.com/ak/provider/news/dental/reimbursement-date-change/',
  },
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaRejections: {
    label: 'ADA: Responding to Claim Rejections',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/responding-to-claim-rejections.pdf',
  },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
};

export const dentalGuidesF: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'orthodontic-billing-guide',
    title: 'Orthodontic Insurance Billing: Maximums, Payments and Transfers',
    seoTitle: 'Orthodontic Insurance Billing: A Guide for Dental Offices',
    metaDescription:
      'How orthodontic insurance billing works: lifetime maximums, initial and periodic payments, age limits, the banding date, coordination of benefits and transfers.',
    excerpt:
      'Orthodontic benefits are paid differently from almost everything else in dentistry. This guide covers lifetime maximums, payment schedules, age limits, the banding date and mid-treatment transfers.',
    category: 'Dental Billing',
    tags: ['orthodontic billing', 'ortho insurance', 'lifetime maximum', 'banding date', 'dental claims'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Orthodontic insurance billing follows its own rules. Instead of paying a claim once and closing it, most carriers pay ortho benefits in pieces over the length of treatment, against a separate lifetime maximum, and only while the patient stays eligible. An office that bills ortho the same way it bills a filling will leave money on the table and confuse patients about what they owe.</p>
<p>This guide walks through how ortho benefits are structured, what to verify before the case starts, how initial and periodic payments work, and how to handle the cases that cause the most trouble: coverage changes, two plans, and patients who transfer in or out mid-treatment.</p>

<h2>How orthodontic benefits differ from other dental benefits</h2>
<p>Most dental benefits renew each plan year with a fresh annual maximum. Orthodontic coverage usually works differently:</p>
<ul>
<li><strong>A separate lifetime maximum.</strong> Many plans set a dollar limit for ortho that applies once per patient for life, not per year. It is usually separate from the annual maximum for other services, but some plans combine them, so check the plan.</li>
<li><strong>A coinsurance percentage.</strong> The plan pays a set percentage of the allowed ortho fee until the lifetime maximum is reached. In practice the lifetime maximum is often the limiting number, not the percentage.</li>
<li><strong>Age limits.</strong> Many employer plans cover ortho only for dependent children up to a stated age. Adult ortho coverage exists but is less common. The age rule may look at the patient's age on the banding date, so a teen close to the cutoff needs careful timing.</li>
<li><strong>Waiting periods and exclusions.</strong> Some plans impose a waiting period before ortho is covered, and many exclude treatment that started before the coverage effective date or limit it to a prorated amount.</li>
<li><strong>Payment over time.</strong> The benefit is usually released as an initial payment followed by periodic payments, not as one lump sum.</li>
</ul>

<h2>What to verify before the case starts</h2>
<p>Ortho verification needs more questions than a routine hygiene check. Add these to your standard insurance verification call or portal review, and record the answers in the patient's insurance notes:</p>
<ol>
<li>Is orthodontic treatment covered for this patient, and for which ages?</li>
<li>What is the ortho lifetime maximum, and how much has already been used, including at another office?</li>
<li>What percentage does the plan pay, and does a separate ortho deductible apply?</li>
<li>Is there a waiting period, and has it been met?</li>
<li>How does the carrier pay: initial amount, then monthly, quarterly or another schedule? Is the schedule automatic or does each payment need a new claim?</li>
<li>Does the plan cover records, such as diagnostic images and casts, separately or as part of the ortho benefit?</li>
<li>Is there any other coverage? A second plan may have its own ortho lifetime maximum.</li>
<li>Does the plan require a pre-treatment estimate before banding?</li>
</ol>
<p>A pre-treatment estimate is often worth sending even when it is optional. It confirms eligibility, age rules and the remaining lifetime maximum in writing before the family signs the treatment contract.</p>

<h2>The banding date and why it matters</h2>
<p>For most carriers, the date the appliance is placed (often called the banding date) is the date that starts the ortho benefit. It determines whether the patient was eligible, whether the age limit was met and whether any waiting period was satisfied. On the ADA dental claim form, the orthodontic section asks whether the treatment is orthodontic, the date the appliance was placed and the total months of treatment. Those three fields drive how the carrier sets up the payment schedule, so they need to be accurate and consistent with the treatment contract.</p>
<p>Comprehensive treatment is typically reported with one of the comprehensive ortho codes, such as D8080 for adolescent cases, along with periodic visit codes such as D8670 if the carrier asks for them. Use the code that matches the stage of dentition documented in the chart, and check whether the carrier wants records billed separately.</p>

<h2>Initial and periodic payments, with a worked example</h2>
<p>Carriers commonly pay a portion of the total benefit after the banding claim is processed, then spread the rest across the remaining months of treatment. Some set up automatic payments for the full schedule. Others pay only when the office sends a periodic claim or a continuation form. Missing that step is a frequent reason ortho payments quietly stop.</p>
<p><em>Hypothetical example.</em> A patient's total ortho fee is $6,000 with a 24-month treatment plan. The plan pays 50 percent up to a $1,500 lifetime maximum, so the benefit is capped at $1,500. Suppose this carrier pays one third of the benefit after banding and the rest monthly.</p>
<table>
<thead><tr><th>Item</th><th>Amount (hypothetical)</th></tr></thead>
<tbody>
<tr><td>Total ortho fee</td><td>$6,000</td></tr>
<tr><td>Plan benefit (lesser of 50% or lifetime max)</td><td>$1,500</td></tr>
<tr><td>Initial payment after banding</td><td>$500</td></tr>
<tr><td>Remaining benefit spread over 23 months</td><td>$1,000 (about $43.48 per month)</td></tr>
<tr><td>Patient portion under the treatment contract</td><td>$4,500</td></tr>
</tbody>
</table>
<p>If the patient loses coverage in month 10, the carrier generally stops paying, and the unpaid insurance portion usually becomes the family's responsibility under the contract. Your financial agreement should say that clearly before treatment begins.</p>

<h2>Coordination of benefits for ortho</h2>
<p>When a child is covered by two plans, each plan may have its own ortho lifetime maximum. The primary plan pays first under its rules, then the secondary considers the balance under its own. Two $1,500 lifetime maximums can mean up to $3,000 in combined benefits on the right case, but only if both plans are verified and both are billed on schedule. Secondary carriers often want the primary's explanation of benefits with each periodic claim. Our guide to <a href="/blog/dental-coordination-of-benefits/">dental coordination of benefits</a> covers the order rules in more detail.</p>

<h2>Transfers in and out mid-treatment</h2>
<p>Families move, and ortho cases move with them. Transfers create billing problems in both directions.</p>
<h3>Patients transferring in</h3>
<ul>
<li>Get the prior office's records, original banding date and the amount of lifetime maximum already paid.</li>
<li>Call the carrier to confirm how much benefit remains and how it wants the continuation billed. Many carriers treat the transfer as a continuation rather than a new case.</li>
<li>Write a new treatment contract based on the remaining months and the remaining benefit, not the original fee.</li>
</ul>
<h3>Patients transferring out</h3>
<ul>
<li>Reconcile what the family paid, what insurance paid and how much treatment was delivered.</li>
<li>Notify the carrier that treatment at your office has ended so periodic payments stop. Payments received after the transfer may need to be refunded.</li>
<li>Send records and a clear payment summary to the new office.</li>
</ul>

<h2>Common ortho billing mistakes</h2>
<ul>
<li>Not sending the periodic claims a carrier requires, so payments stop without notice.</li>
<li>Posting the full ortho fee to the ledger on day one and showing a large balance that confuses the family and the aging report.</li>
<li>Missing a second plan's ortho benefit entirely.</li>
<li>Ignoring the age limit until after banding.</li>
<li>Failing to adjust the payment schedule when treatment runs longer or shorter than planned.</li>
</ul>
<p>Ortho payments that stop silently often show up only as small, old balances on the A/R report. A monthly check of every active ortho case against its expected payment schedule catches them early.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our team works inside your Open Dental, Dentrix or Eaglesoft system. <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> covers the ortho questions above before banding, <a href="/services/dental-claims-processing/">Dental Claims Management</a> handles banding and periodic claims, and <a href="/services/payment-posting/">Payment Posting</a> keeps each case's insurance payments reconciled. Learn more about our work with <a href="/specialties/orthodontics/">orthodontic practices</a> or <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'Does dental insurance pay for braces all at once?',
        a: 'Usually not. Most carriers pay an initial amount after the appliance is placed and then spread the rest of the ortho benefit over the treatment months, up to the plan\'s lifetime maximum.',
      },
      {
        q: 'What is the banding date in orthodontic billing?',
        a: 'The banding date is the date the orthodontic appliance is placed. Carriers typically use it to check eligibility, age limits and waiting periods, and to start the payment schedule.',
      },
      {
        q: 'Does the ortho lifetime maximum reset with a new plan?',
        a: 'It depends on the plan. A new carrier usually has its own lifetime maximum, but it may exclude or limit treatment that started before the coverage began, so verify before assuming new benefits apply.',
      },
      {
        q: 'What happens to insurance payments if a patient transfers to another orthodontist?',
        a: 'The carrier generally stops paying the original office and may continue the remaining benefit at the new office. The original office should notify the carrier and refund any payments received for treatment it did not provide.',
      },
    ],
    sources: [S.adaClaimInstructions, S.adaTypicalPlan, S.adaCob, S.adaIntroBenefits],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'pediatric-dental-billing',
    title: 'Pediatric Dental Billing: Sealants, Fluoride, Medicaid and COB',
    seoTitle: 'Pediatric Dental Billing: Sealants, Fluoride and Medicaid',
    metaDescription:
      'Billing for pediatric dental offices: sealants, fluoride, frequency and age limits, Medicaid and CHIP basics, guardian information and coordination of benefits.',
    excerpt:
      'Pediatric offices bill a high volume of preventive services with tight age and frequency rules, many Medicaid and CHIP patients, and families with two plans. Here is how to keep those claims clean.',
    category: 'Dental Billing',
    tags: ['pediatric dental billing', 'sealants', 'fluoride', 'Medicaid dental', 'coordination of benefits'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Pediatric dental billing looks simple from the outside: exams, cleanings, fluoride and sealants. In practice it is one of the most rule-heavy areas of dental billing, because nearly every preventive benefit for children comes with an age limit, a frequency limit or a tooth limit, and many patients have Medicaid, CHIP or two commercial plans.</p>
<p>This guide covers the billing details that trip up pediatric offices most often and gives a front desk checklist you can put to work this week.</p>

<h2>Why pediatric billing has more rules</h2>
<p>Plans design children's benefits around prevention, so they cover preventive services generously but tie them to conditions. A sealant may be covered only on permanent molars, only up to a certain age and only once in a set number of years. Fluoride may be covered twice a year until a certain birthday and not at all after. The same CDT code can be paid in full for one child and denied for a sibling a year older.</p>
<p>That means eligibility checks for pediatric patients need to go beyond "active coverage." The office needs the specific age, frequency and tooth rules for each preventive service the child is likely to receive. Our article on <a href="/blog/dental-frequency-limitations/">dental frequency limitations</a> explains how to read and track these rules.</p>

<h2>Sealants: teeth, ages and replacement rules</h2>
<p>Sealants are usually reported with D1351, and preventive resin restorations have their own code, D1352. Common plan conditions include:</p>
<ul>
<li><strong>Tooth limits.</strong> Many plans cover sealants only on permanent first and second molars. Some include premolars; few cover primary teeth.</li>
<li><strong>Age limits.</strong> Coverage often ends at a set age in the teen years. The exact age varies by plan.</li>
<li><strong>Replacement windows.</strong> Many plans cover one sealant per tooth within a multi-year period, and a replacement inside that window may be denied or paid only if a different provider placed the first one.</li>
<li><strong>Surface condition.</strong> Some carriers do not pay for a sealant on a tooth that already has a restoration on the occlusal surface.</li>
</ul>
<p>Always report the tooth number on every sealant line. A missing tooth number is one of the most common reasons sealant claims come back.</p>

<h2>Fluoride and other preventive services</h2>
<p>Topical fluoride is reported with codes such as D1206 for varnish and D1208 for other topical fluoride. Plans often allow fluoride once or twice per year with an age cutoff, and some plans cover varnish and other fluoride under one shared frequency. Other services that come up often in pediatric offices include child prophylaxis (D1120), evaluations for very young children (D0145) and caries arresting medicament (D1354). Each has its own coverage pattern, and some carriers apply per-tooth or per-visit limits to D1354, so check the plan.</p>
<table>
<thead><tr><th>Service</th><th>Code (in passing)</th><th>What to verify</th></tr></thead>
<tbody>
<tr><td>Child prophylaxis</td><td>D1120</td><td>Frequency per year, age when the plan switches to adult prophy</td></tr>
<tr><td>Fluoride varnish</td><td>D1206</td><td>Frequency, age cutoff, shared limit with D1208</td></tr>
<tr><td>Sealant</td><td>D1351</td><td>Eligible teeth, age limit, replacement window</td></tr>
<tr><td>Caries arresting medicament</td><td>D1354</td><td>Whether covered, per-tooth or per-visit rules, frequency</td></tr>
<tr><td>Evaluation, young child</td><td>D0145</td><td>Age limit and frequency shared with other exams</td></tr>
</tbody>
</table>

<h2>Medicaid and CHIP: general considerations</h2>
<p>Many pediatric offices see a large share of children covered by Medicaid or the Children's Health Insurance Program (CHIP). Federal rules require Medicaid to cover dental services for most enrolled children under the Early and Periodic Screening, Diagnostic and Treatment benefit, and CHIP programs cover dental services for enrolled children as well. Beyond that, each state runs its own program, often through dental managed care organizations, and the details differ widely.</p>
<p>A few general points apply in most states:</p>
<ul>
<li><strong>Enrollment comes first.</strong> The treating dentist and the practice must be enrolled with the state program or the managed care plan before claims can be paid.</li>
<li><strong>Eligibility changes often.</strong> Check eligibility at every visit, not once a year. A child can move between plans or lose coverage between appointments.</li>
<li><strong>State fee schedules and rules apply.</strong> Frequency limits, prior authorization requirements and covered codes come from the state program or its plans, not from commercial norms.</li>
<li><strong>Balance billing is generally restricted.</strong> Offices usually cannot bill a Medicaid patient's family for the difference between their fee and the Medicaid payment on covered services. Follow your state program's rules on non-covered services and written agreements.</li>
<li><strong>Timely filing and documentation standards can be strict.</strong> Read your state's provider manual and keep it handy.</li>
</ul>
<p>Our overview of <a href="/blog/medicaid-and-medicare-dental-billing/">Medicaid and Medicare dental billing</a> covers more of the program-level differences.</p>

<h2>Guardian information and the subscriber</h2>
<p>The child is the patient, but the subscriber is usually a parent or guardian, and the claim must show the subscriber's details exactly as the carrier has them. Common errors include:</p>
<ul>
<li>Entering the parent who brought the child instead of the parent who holds the policy.</li>
<li>Using the guardian's name with the child's date of birth, or the reverse.</li>
<li>Missing a name change or a new plan after a parent changes jobs.</li>
<li>Sending statements to the wrong household when parents live apart.</li>
</ul>
<p>Collect a copy of each insurance card, the subscriber's full name and date of birth and the relationship to the child at every new patient visit and whenever the family reports a change. Note in the account who is financially responsible, which may differ from who holds the insurance.</p>

<h2>Coordination of benefits for children with two plans</h2>
<p>Children with two working parents often have two dental plans. Many plans follow the "birthday rule" for dependents: the plan of the parent whose birthday falls earlier in the calendar year pays first. Custody arrangements and court orders can change that order, and some plans use different rules, so confirm the order with both carriers rather than assuming. Bill the primary first, then send the secondary the primary's explanation of benefits. See our guide to <a href="/blog/dental-coordination-of-benefits/">dental coordination of benefits</a> for the full set of order rules.</p>

<h2>Pediatric front desk billing checklist</h2>
<ol>
<li>Verify eligibility at every visit for Medicaid and CHIP patients, and before every recall for commercial plans.</li>
<li>Record the age, frequency and tooth rules for exams, prophy, fluoride, sealants and D1354.</li>
<li>Confirm the subscriber's name and date of birth match the card and the carrier.</li>
<li>Ask about a second plan at every visit and confirm the order of benefits.</li>
<li>Report tooth numbers on every sealant and D1354 line.</li>
<li>Check the treating dentist's enrollment with the child's Medicaid or CHIP plan before scheduling.</li>
<li>Note the financially responsible adult and their statement address.</li>
</ol>

<h2>How Texas Solutions RCM can help</h2>
<p>Pediatric offices run on volume, and small errors repeat across hundreds of claims. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> team checks age and frequency rules before the visit, and Dental Claims Management submits and follows up on primary and secondary claims inside your own practice software. See how we support <a href="/specialties/pediatric-dentistry/">pediatric dental practices</a> or <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'Do dental plans cover sealants on baby teeth?',
        a: 'Most plans do not. Sealant coverage is commonly limited to permanent molars and sometimes premolars, up to an age set by the plan, so check each plan\'s tooth and age rules.',
      },
      {
        q: 'How often does insurance cover fluoride for children?',
        a: 'Many plans cover fluoride once or twice a year until a set age, but the frequency and cutoff age vary by plan. Verify both before the visit.',
      },
      {
        q: 'Can a dental office bill a Medicaid patient\'s parent for the balance?',
        a: 'Generally not for covered services. Medicaid providers usually must accept the program\'s payment as payment in full, and rules for non-covered services vary by state, so follow your state\'s provider manual.',
      },
      {
        q: 'Which plan is primary for a child with two dental plans?',
        a: 'Often the plan of the parent whose birthday comes first in the calendar year, under the birthday rule. Custody orders and plan language can change this, so confirm with both carriers.',
      },
    ],
    sources: [S.medicaidDental, S.medicaidEpsdt, S.insureKidsNow, S.adaCob, S.adaTypicalPlan],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-billing-compliance-risks',
    title: 'Dental Billing Compliance Risks: What Every Office Should Avoid',
    seoTitle: 'Dental Billing Compliance Risks Every Practice Should Know',
    metaDescription:
      'The main dental billing compliance risks: upcoding, unbundling, changed dates of service, routine copay waivers and billing for work not done, plus safeguards.',
    excerpt:
      'Most dental billing compliance problems start as shortcuts. This guide explains the highest-risk practices, why carriers and regulators care, and the safeguards that keep an office out of trouble.',
    category: 'Compliance and Regulation',
    tags: ['dental billing compliance', 'upcoding', 'unbundling', 'dental fraud risk', 'billing audits'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Every dental claim is a statement of fact: this dentist performed this procedure, on this tooth, on this date, for this fee. When any part of that statement is wrong on purpose, or wrong often enough to look like a pattern, the practice takes on real risk, from carrier recoupments and network termination to state board action and, in serious cases, fraud investigations.</p>
<p>This article explains the billing practices that create the most compliance risk in dental offices and the everyday safeguards that reduce it. It is general information, not legal advice. Laws and contract terms vary by state and carrier, so involve a healthcare attorney for questions about your own situation.</p>

<h2>Why billing compliance matters in dentistry</h2>
<p>Carriers audit dental claims routinely, often using data to spot offices whose code patterns look different from their peers. When a carrier finds billing it believes was improper, it can recover past payments, sometimes across many claims, and may end the network agreement. When public programs such as Medicaid are involved, state and federal fraud laws can apply. And because claims go out under the treating dentist's name and license, the dentist carries responsibility even when a team member or an outside company prepared the claim.</p>
<p>Most problems are not schemes. They start as shortcuts, habits or misunderstandings that repeat across hundreds of claims. A team member copies last year's code habits, a new hire follows a workaround nobody wrote down, or a date gets changed once to help a patient and the habit spreads. The fix is to make the correct way the easy way.</p>

<h2>Upcoding</h2>
<p>Upcoding means reporting a procedure code that describes a more extensive or higher-paying service than the one actually performed. Examples in dental offices include:</p>
<ul>
<li>Reporting a comprehensive evaluation when the visit was a periodic evaluation.</li>
<li>Reporting scaling and root planing when the documented findings support a prophylaxis or a gingival inflammation code such as D4346.</li>
<li>Reporting a surgical extraction when the chart describes a routine one.</li>
<li>Reporting a more extensive restoration than the surfaces documented.</li>
</ul>
<p>The safeguard is simple to state and harder to practice: the code must match the documentation, and the documentation must match what was done. Our <a href="/blog/d4346-vs-d1110/">D4346 vs D1110 guide</a> shows how that applies to hygiene coding.</p>

<h2>Unbundling</h2>
<p>Unbundling means splitting a procedure into separate codes when a single code already includes those components, so the combined charge is higher than it should be. Reporting parts of a procedure separately when the CDT nomenclature treats them as one service is the classic example.</p>
<p>Unbundling by the office is different from bundling by the carrier. Carriers sometimes combine separately reported services into one payment under their own processing policies, even when the CDT Code treats them as distinct procedures. The ADA has published guidance on carrier bundling practices. When you disagree with a carrier's bundling, the right response is an appeal, not changing codes to get around the edit.</p>

<h2>Misrepresenting dates of service</h2>
<p>The date on a claim line should be the date the service was performed or completed, following CDT conventions and the carrier's policy. Problems arise when offices change dates to fit coverage:</p>
<ul>
<li>Moving a date into a new benefit year so a fresh annual maximum applies.</li>
<li>Moving a date to get past a frequency limit or waiting period.</li>
<li>Using a date when the patient was eligible for a service completed after coverage ended.</li>
</ul>
<p>Multi-visit procedures need extra care. Carriers differ on whether crowns and other prostheses are billed on the preparation date or the seat date, and at least one carrier has published a notice moving its reimbursement to the seat date. Follow each carrier's written policy, document both dates and never bill a seat date that has not happened.</p>

<h2>Routinely waiving copays and deductibles</h2>
<p>Writing off a patient's share now and then for a documented financial hardship is generally treated differently from waiving it as a routine practice. When an office routinely waives the patient's portion but reports its full fee to the carrier, the carrier may view the reported fee as overstated, since the office never intended to collect it. Many network contracts address this directly, and some states regulate it.</p>
<p>Related risks include charging insured patients a higher fee than cash patients for the same service, or reporting a fee on the claim that differs from the fee actually charged. A written <a href="/blog/dental-office-financial-policy/">financial policy</a> that sets one fee schedule and a documented hardship process helps keep decisions consistent. Ask counsel to review your policy before you adopt it.</p>

<h2>Billing for work not done</h2>
<p>This is the most serious category, and it sometimes happens by accident:</p>
<ul>
<li>Billing a crown or denture at preparation when the patient never returns for delivery.</li>
<li>Submitting a treatment plan as if it were completed work.</li>
<li>Billing hygiene or fluoride that was planned but skipped.</li>
<li>Billing services performed by a provider who is not credentialed under the name of one who is.</li>
</ul>
<p>The last item deserves attention. Associates and new hires who are not yet credentialed with a carrier cannot simply bill under the owner's credentials. Check each carrier's rules and keep <a href="/services/dental-credentialing/">credentialing</a> current before a new dentist starts seeing that carrier's patients.</p>

<h2>Safeguards and a simple compliance routine</h2>
<p>The table below pairs each risk with the safeguard that addresses it most directly. None of these safeguards requires special software. They depend on clear habits, a written policy and someone who checks the work.</p>
<table>
<thead><tr><th>Risk</th><th>What it looks like</th><th>Safeguard</th></tr></thead>
<tbody>
<tr><td>Upcoding</td><td>Code describes more than was done</td><td>Code from documentation; periodic chart audits</td></tr>
<tr><td>Unbundling</td><td>Components billed separately</td><td>Follow CDT nomenclature; appeal carrier bundling instead</td></tr>
<tr><td>Changed dates</td><td>Dates moved to fit coverage</td><td>Bill actual dates; follow carrier prep or seat policy</td></tr>
<tr><td>Routine waivers</td><td>Patient share never collected</td><td>Written financial policy; documented hardship only</td></tr>
<tr><td>Work not done</td><td>Billing planned or incomplete services</td><td>Bill completed procedures only; reconcile lab cases</td></tr>
<tr><td>Wrong provider</td><td>Non-credentialed dentist billed under another</td><td>Credentialing check before scheduling</td></tr>
</tbody>
</table>

<h3>A monthly routine any office can run</h3>
<ol>
<li><strong>Write it down.</strong> Keep a short written billing policy covering coding, dates, fees, write-offs and refunds.</li>
<li><strong>Train the team.</strong> Review the policy when someone joins and when the CDT Code changes each year.</li>
<li><strong>Audit a sample.</strong> Compare a handful of claims each month against the clinical notes and images.</li>
<li><strong>Refund overpayments.</strong> When the office finds it was paid for something it should not have been, return the money promptly.</li>
<li><strong>Get advice early.</strong> If an audit letter or a pattern worries you, call a healthcare attorney before responding.</li>
<li><strong>Keep records.</strong> Save audit results, training dates and policy changes. If a carrier or regulator ever asks, a record of steady effort shows the office takes billing accuracy seriously.</li>
</ol>

<h2>How Texas Solutions RCM can help</h2>
<p>We submit claims from your clinical documentation and flag mismatches back to your team rather than changing codes or dates. <a href="/services/dental-claims-processing/">Dental Claims Management</a> includes CDT code and documentation review, and <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> shows code and adjustment patterns you can review with your advisors. We sign a Business Associate Agreement before accessing patient data. <a href="/consultation/">Book a free consultation</a> to talk through your process.</p>
`,
    faqs: [
      {
        q: 'What is upcoding in dental billing?',
        a: 'Upcoding is reporting a CDT code for a more extensive or higher-paying service than the one performed and documented. It can lead to recoupments, network termination and, in serious cases, fraud investigations.',
      },
      {
        q: 'Is it illegal for a dentist to waive copays?',
        a: 'It depends on the circumstances, the carrier contract and state law. Routinely waiving the patient\'s share while reporting the full fee carries real risk, while documented case-by-case hardship is usually treated differently, so ask a healthcare attorney.',
      },
      {
        q: 'Should a crown be billed on the prep date or the seat date?',
        a: 'Follow each carrier\'s written policy, because carriers differ. Whatever the policy, never bill a seat date for a crown that has not been delivered.',
      },
      {
        q: 'Who is responsible if an outside billing company submits an incorrect claim?',
        a: 'The practice and the treating dentist generally remain responsible, because claims go out under the dentist\'s name and license. Review your billing partner\'s process and keep oversight in place.',
      },
    ],
    sources: [S.adaBundling, S.adaNewsCoding, S.premeraSeatDate, S.adaClaimInstructions, S.adaCdt],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'common-dental-billing-mistakes',
    title: 'Common Dental Billing Mistakes and How to Prevent Each One',
    seoTitle: 'Common Dental Billing Mistakes and How to Prevent Them',
    metaDescription:
      'The dental billing mistakes that cause most rejections, denials and slow payments, how to prevent each one, and a prevention checklist for your front desk.',
    excerpt:
      'Most dental claim problems come from a short list of repeat mistakes. Here are the most common ones, what each costs the office, and a checklist to prevent them.',
    category: 'Denial Management',
    tags: ['dental billing mistakes', 'claim denials', 'claim rejections', 'dental claims', 'billing checklist'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Dental billing errors rarely come from one big failure. They come from small, repeatable mistakes: a wrong date of birth, a missing x-ray, an outdated code. Each one delays a claim, and together they fill the aging report with balances nobody has time to chase.</p>
<p>Below are the mistakes that come up most often in dental billing, what each one causes and how to prevent it. A prevention checklist at the end turns the list into a daily routine.</p>

<h2>Front desk and eligibility mistakes</h2>
<h3>1. Verifying coverage too late, or not at all</h3>
<p>Checking eligibility at check-in leaves no time to fix problems, and skipping it entirely means the office learns about terminated coverage from a denial weeks later. <strong>Prevention:</strong> verify two to three business days before the visit and record frequency history, remaining maximum and waiting periods, not just "active." Our <a href="/tools/dental-insurance-verification-checklist/">insurance verification checklist</a> lists the questions to ask.</p>
<h3>2. Wrong subscriber or patient details</h3>
<p>A misspelled name, a wrong date of birth, an old member ID or the wrong subscriber on a child's claim leads to a rejection before the carrier even looks at the services. <strong>Prevention:</strong> scan the insurance card at every visit where something may have changed, and compare the subscriber's name and date of birth to the carrier's records.</p>
<h3>3. Wrong coordination of benefits order</h3>
<p>Billing the secondary plan first, or never billing the secondary at all, leads to denials or unpaid balances. <strong>Prevention:</strong> ask about other coverage at every visit, confirm the order with the carriers, and send the primary's explanation of benefits with every secondary claim.</p>

<h2>Coding and claim content mistakes</h2>
<h3>4. Using outdated or deleted CDT codes</h3>
<p>The CDT Code is updated every year, with changes taking effect on January 1. Practice software that is not updated, or a team that relies on memory, will send codes that no longer exist or miss new ones. <strong>Prevention:</strong> update your software's code set each year and review the changes with the team in December.</p>
<h3>5. Missing tooth, surface, quadrant or arch</h3>
<p>Many procedures require a tooth number and surfaces, or an area of the mouth. Without them the claim is rejected or denied. <strong>Prevention:</strong> set your practice software to require these fields when the procedure is charted, and check them during claim review.</p>
<h3>6. Code does not match the documentation</h3>
<p>When the chart describes one service and the claim reports another, the claim is at risk on review and on audit. The ADA has published tips on coding mistakes that commonly lead to denials. <strong>Prevention:</strong> code from the clinical note, and route unclear notes back to the provider before the claim goes out.</p>

<h2>Documentation mistakes</h2>
<h3>7. Missing attachments or weak narratives</h3>
<p>Crowns, buildups, periodontal treatment and surgical extractions often need radiographs, perio charts, photos or a narrative. Claims without them are usually denied with a request for information, which restarts the clock. <strong>Prevention:</strong> keep a carrier-by-procedure attachment list and attach at submission. See our guides to <a href="/blog/dental-claim-attachments/">dental claim attachments</a>, which also covers narratives.</p>
<h3>8. Missing prosthesis and missing-teeth information</h3>
<p>For crowns, bridges and dentures, the ADA claim form asks whether the service replaces an existing prosthesis and the date of the prior placement, and missing teeth may need to be reported. Leaving these blank invites a denial or a request for information. <strong>Prevention:</strong> train the team to complete these fields on every prosthetic claim.</p>

<h2>Provider and timing mistakes</h2>
<h3>9. Billing under the wrong or a non-credentialed provider</h3>
<p>If a new associate is not yet credentialed with a carrier, claims may deny or pay at out-of-network levels. Billing that work under another dentist's name is a compliance problem, not a fix. <strong>Prevention:</strong> track each dentist's credentialing status by carrier and check it when scheduling.</p>
<h3>10. Wrong date of service</h3>
<p>Billing a crown on the preparation date when the carrier pays on the seat date, or the reverse, causes denials and recoupments. <strong>Prevention:</strong> record each carrier's policy for multi-visit procedures and follow it consistently.</p>
<h3>11. Missing timely filing deadlines</h3>
<p>Claims held for attachments, signatures or secondary information can drift past the carrier's filing limit. <strong>Prevention:</strong> send claims the same day as the service when possible and review unsent claims daily. Our article on <a href="/blog/dental-timely-filing-limits/">dental timely filing limits</a> explains the deadlines.</p>

<h2>Follow-up and posting mistakes</h2>
<h3>12. No follow-up on unpaid claims</h3>
<p>A claim that was submitted is not a claim that will be paid. Some are lost, some are pended for information and nobody is told. <strong>Prevention:</strong> work outstanding claims by age, starting with anything over 30 days, and check status on the carrier portal.</p>
<h3>13. Posting payments without reading the denial codes</h3>
<p>When a zero-pay line is posted and written off without reading the claim adjustment reason code, a fixable denial becomes a permanent loss. <strong>Prevention:</strong> review every denied or reduced line, and route those that can be corrected or appealed. Our <a href="/blog/dental-carc-rarc-denial-codes/">CARC and RARC guide</a> explains the codes.</p>
<h3>14. Writing off what should be appealed</h3>
<p>Downgrades, bundling and frequency denials are sometimes wrong. <strong>Prevention:</strong> set a simple rule for which adjustments need a second look before write-off.</p>

<h2>Mistakes, effects and prevention at a glance</h2>
<table>
<thead><tr><th>Mistake</th><th>Typical result</th><th>Prevention</th></tr></thead>
<tbody>
<tr><td>Late or missing verification</td><td>Denial for eligibility or frequency</td><td>Verify days before the visit</td></tr>
<tr><td>Wrong patient or subscriber data</td><td>Rejection</td><td>Check card and carrier records</td></tr>
<tr><td>Outdated codes</td><td>Rejection or denial</td><td>Annual code set update</td></tr>
<tr><td>Missing tooth or surface</td><td>Rejection or denial</td><td>Required fields in software</td></tr>
<tr><td>No attachments</td><td>Request for information</td><td>Carrier attachment list</td></tr>
<tr><td>Non-credentialed provider</td><td>Denial or out-of-network payment</td><td>Credentialing tracker</td></tr>
<tr><td>Missed filing limit</td><td>Permanent denial</td><td>Same-day submission</td></tr>
<tr><td>No follow-up</td><td>Old, unpaid A/R</td><td>Work claims by age</td></tr>
</tbody>
</table>

<h2>Dental billing prevention checklist</h2>
<ul>
<li>Verify eligibility and benefits two to three days before each visit.</li>
<li>Confirm patient and subscriber details against the card.</li>
<li>Ask about other coverage and confirm the order of benefits.</li>
<li>Keep the CDT code set current each January.</li>
<li>Require tooth, surface and area fields at charting.</li>
<li>Code from the clinical note, not the schedule.</li>
<li>Attach images, perio charts and narratives at submission.</li>
<li>Complete prosthesis replacement and missing-teeth fields.</li>
<li>Check credentialing status by carrier for each dentist.</li>
<li>Submit claims the same day and review unsent claims daily.</li>
<li>Read every denial code before posting a write-off.</li>
<li>Follow up on claims over 30 days old every week.</li>
</ul>
<p>For a printable version focused on claim submission, use our <a href="/tools/claim-submission-checklist/">claim submission checklist</a>.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our team works inside your practice software to prevent these mistakes at each step. Insurance Verification &amp; Eligibility handles the front end, Dental Claims Management reviews codes and attachments before submission, and Denial Management &amp; Appeals works what still comes back. <a href="/consultation/">Book a free consultation</a> to review where your claims are getting stuck.</p>
`,
    faqs: [
      {
        q: 'What is the most common dental billing mistake?',
        a: 'Eligibility and patient data errors are among the most common, because they cause rejections before the carrier reviews the services. Verifying benefits before the visit and checking subscriber details prevents most of them.',
      },
      {
        q: 'What is the difference between a rejected and a denied dental claim?',
        a: 'A rejected claim was not accepted for processing, usually because of missing or invalid data, and can be fixed and resent. A denied claim was processed and not paid, and usually needs a corrected claim or an appeal.',
      },
      {
        q: 'How often should a dental office follow up on unpaid claims?',
        a: 'Weekly is a practical rhythm for most offices. Start with claims more than 30 days old and check status on the carrier portal before calling.',
      },
    ],
    sources: [S.adaNewsCoding, S.adaRejections, S.adaClaimInstructions, S.adaCdt, S.x12Carc],
  },
];
