/**
 * Dental RCM guides, batch A (2026-10-22). Original content. Rules: docs/DENTAL-WRITING.md.
 * Sources are limited to URLs already verified elsewhere in this repo.
 */
import type { SeedPost } from './seed';

const S = {
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  x12Rarc: { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  x12ClaimStatus: { label: 'X12: Claim Status Category Codes', url: 'https://x12.org/codes/claim-status-category-codes' },
  cmsTransactions: {
    label: 'CMS: HIPAA Transactions Overview',
    url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions',
  },
  adaBundling: { label: 'ADA: Bundling and Downcoding', url: 'https://www.ada.org/resources/practice/dental-insurance/bundling-and-downcoding' },
  adaDelays: { label: 'ADA: Claims Processing Delays', url: 'https://www.ada.org/resources/practice/dental-insurance/claims-processing-delays' },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  naicCob: { label: 'NAIC: Coordination of Benefits Model Regulation (MDL-120)', url: 'https://content.naic.org/sites/default/files/model-law-120.pdf' },
  hfmaMapKeys: { label: 'HFMA: MAP Keys, industry-standard revenue cycle KPIs', url: 'https://www.hfma.org/data-and-insights/map-initiative/map-keys/' },
};

export const dentalGuidesA: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-payment-posting-guide',
    title: 'Dental Payment Posting: A Step-by-Step Guide for EOBs and ERAs',
    seoTitle: 'Dental Payment Posting: EOBs, ERAs and Adjustments',
    metaDescription:
      'How to post dental EOBs and ERAs correctly: matching payments to claims, entering PPO write-offs, choosing adjustment codes and reconciling bank deposits.',
    excerpt:
      'A practical workflow for posting dental insurance payments line by line, choosing the right adjustment types and reconciling every deposit before the day is closed.',
    category: 'Dental Billing',
    tags: ['payment posting', 'dental EOB', 'ERA', 'PPO write-offs', 'reconciliation'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p><strong>Dental payment posting is the step where what the carrier actually paid gets recorded against each procedure on the patient ledger.</strong> It sounds clerical, but every balance your office sends to a patient, every aging report and every production number depends on it. A posting error made today can show up weeks later as a wrong patient statement, a claim nobody follows up on or a write-off that should have been appealed.</p>

<p>This guide walks through how to post dental EOBs and ERAs, how to handle PPO write-offs and other adjustments, how to set up adjustment types that tell you something useful, and how to reconcile insurance deposits to the bank.</p>

<h2>EOBs, ERAs and why the difference matters</h2>
<p>An <strong>explanation of benefits (EOB)</strong> is the paper or PDF statement a dental carrier sends with a check or posts in its provider portal. An <strong>electronic remittance advice (ERA)</strong> is the same information in the standard 835 electronic format, which is one of the HIPAA transaction standards CMS describes for health care payment and remittance. Most practice software, including Open Dental, Dentrix and Eaglesoft, can import ERAs and match them to open claims.</p>
<p>ERAs save keying time, but they do not remove the need for review. Auto-posting can match a payment to the wrong claim when a patient has two claims for the same date, and it will happily post a downgrade as a routine write-off unless someone looks. Treat the ERA as a faster way to enter data, not as a reason to skip checking it. If your team needs a refresher on reading the paper version, our EOB explained tool breaks down each section.</p>

<h2>A step-by-step workflow for posting a dental EOB</h2>
<ol>
<li><strong>Batch by deposit.</strong> Group EOBs and ERAs by the check or electronic deposit they belong to. One deposit, one batch.</li>
<li><strong>Find the claim.</strong> Match by patient, subscriber ID, date of service and claim number. Do not post to the first open claim that looks close.</li>
<li><strong>Post line by line.</strong> Enter the allowed amount, paid amount and patient portion for each procedure, not one lump sum on the claim. Line-level posting is what lets you spot a single downgraded crown or a denied x-ray later.</li>
<li><strong>Enter the contractual write-off.</strong> For in-network PPO claims, the difference between your office fee and the allowed amount is usually a contractual adjustment.</li>
<li><strong>Record the reason codes.</strong> Note each claim adjustment reason code (CARC) and any remittance advice remark code (RARC) from the ERA, or the carrier's own remark codes from a paper EOB.</li>
<li><strong>Flag anything unexpected.</strong> Denials, downgrades, alternate benefits, payments below the fee schedule and zero-pay lines go to a follow-up list, not straight to write-off.</li>
<li><strong>Close the claim correctly.</strong> Mark the claim received, and if the patient has secondary coverage, create and send the secondary claim with the primary EOB attached.</li>
<li><strong>Balance the batch.</strong> The total posted must equal the deposit amount before the batch is closed.</li>
</ol>

<h2>Worked example: posting a PPO claim (hypothetical numbers)</h2>
<p>The figures below are hypothetical and are only meant to show the math. A patient has an exam, bitewings and a prophy billed under D0120, D0274 and D1110, plus a two-surface composite. The carrier pays preventive at 100 percent and basic services at 80 percent of the allowed amount.</p>
<table>
<thead><tr><th>Procedure</th><th>Office fee</th><th>PPO allowed</th><th>Carrier paid</th><th>Write-off</th><th>Patient portion</th></tr></thead>
<tbody>
<tr><td>Exam</td><td>$75</td><td>$48</td><td>$48</td><td>$27</td><td>$0</td></tr>
<tr><td>Bitewings</td><td>$90</td><td>$60</td><td>$60</td><td>$30</td><td>$0</td></tr>
<tr><td>Prophy</td><td>$130</td><td>$85</td><td>$85</td><td>$45</td><td>$0</td></tr>
<tr><td>Composite</td><td>$260</td><td>$170</td><td>$136</td><td>$90</td><td>$34</td></tr>
<tr><td><strong>Total</strong></td><td>$555</td><td>$363</td><td>$329</td><td>$192</td><td>$34</td></tr>
</tbody>
</table>
<p>The check for this claim should be $329. The office writes off $192 as a contractual adjustment and the patient owes $34. Office fee minus write-off minus carrier payment equals the patient portion: $555 minus $192 minus $329 equals $34. If the numbers do not tie out that way, something was keyed wrong. Our <a href="/tools/dental-ppo-write-off-calculator/">PPO write-off calculator</a> runs the same check across a whole fee schedule.</p>

<h2>Adjustments and write-off codes that tell you something</h2>
<p>Many offices use one or two adjustment types for everything. That makes posting faster and reporting useless. If every reduction lands in a single "insurance adjustment" bucket, you cannot tell how much is normal PPO discount and how much is money the carrier refused to pay. A short, clear list works better:</p>
<ul>
<li><strong>PPO contractual write-off:</strong> the agreed discount between your fee and the allowed amount.</li>
<li><strong>Downgrade or alternate benefit:</strong> the carrier paid a lesser procedure, such as an amalgam allowance for a posterior composite. Check the plan and your contract before writing this off, because many plans let the office bill the patient the difference.</li>
<li><strong>Bundled or disallowed:</strong> the carrier folded a procedure into another one. The ADA has published guidance on bundling and downcoding, and these lines are worth reviewing for appeal.</li>
<li><strong>Timely filing or administrative write-off:</strong> losses caused by the office. Track these separately so they are visible.</li>
<li><strong>Small balance write-off:</strong> under a threshold your office sets in its financial policy.</li>
<li><strong>Professional courtesy or discount:</strong> decisions the practice made, not the carrier.</li>
</ul>
<p>On ERAs, the CARC group code helps you sort. CO generally points to a contractual obligation, PR to the patient's responsibility, and OA or PI to other or payer-initiated adjustments. The codes themselves are maintained by X12. Our guide to <a href="/blog/dental-carc-rarc-denial-codes/">dental CARC and RARC codes</a> covers the ones dental offices see most.</p>

<h2>Reconciling insurance deposits</h2>
<p>Posting is not finished until the money in the bank matches the money in the practice software. A simple daily routine:</p>
<ul>
<li>Pull the bank deposit report for the day, including electronic deposits from each carrier.</li>
<li>Match every deposit to a posted batch. The trace number on an ERA matches the trace on the electronic deposit.</li>
<li>List deposits with no EOB yet. Request the remittance from the carrier portal instead of guessing where the money goes.</li>
<li>List EOBs with no deposit. A paper check may not have arrived, or an electronic payment may have gone to an old bank account.</li>
<li>Check for provider-level adjustments, such as a recoupment taken out of the payment. These reduce the deposit without reducing what you posted to the claims, and they need their own entry.</li>
</ul>
<p>Unmatched items should be cleared within a few days. If they pile up, month-end becomes a hunt. Our <a href="/blog/dental-month-end-billing-close/">month-end billing close checklist</a> picks up where the daily routine stops.</p>

<h2>Common dental payment posting mistakes</h2>
<ul>
<li>Posting a lump sum to the claim instead of line by line.</li>
<li>Writing off a denial or downgrade without reading the reason code.</li>
<li>Posting the whole fee-schedule difference on an out-of-network claim as a write-off, when the office has no contract with that carrier.</li>
<li>Forgetting to send the secondary claim after the primary posts.</li>
<li>Posting a payment to the wrong family member or the wrong date of service.</li>
<li>Leaving unapplied credits on the account instead of applying them to the right procedure.</li>
</ul>
<p>Each of these shows up later on the <a href="/blog/dental-insurance-aging-report/">insurance aging report</a> or as a patient call about a wrong statement.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/payment-posting/">Payment Posting</a> service posts EOBs and ERAs line by line inside your own Open Dental, Dentrix or Eaglesoft system, enters contractual adjustments, reconciles deposits and flags underpayments and downgrades for follow-up. Flagged items move to our Denial Management &amp; Appeals and Accounts Receivable (A/R) Management teams, so nothing is written off without a review. To see how your posting works today, <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'What is payment posting in dental billing?',
        a: 'Payment posting is recording what each dental carrier and patient paid against the procedures on the patient ledger. It includes entering the payment, the contractual write-off and the patient portion for each line, then reconciling the total to the bank deposit.',
      },
      {
        q: 'Should we auto-post ERAs?',
        a: 'Auto-posting ERAs is fine as long as someone reviews the results. Check for payments matched to the wrong claim, denials and downgrades posted as routine write-offs, and provider-level adjustments that reduce the deposit. The review is what catches money worth appealing.',
      },
      {
        q: 'Can we bill the patient after a downgrade?',
        a: 'Often yes, but it depends on the plan and your participation agreement. Many PPO contracts allow the office to collect the difference between the alternate benefit and the allowed fee for the procedure performed, while some restrict it. Check the contract and the plan before billing.',
      },
      {
        q: 'How often should insurance payments be posted?',
        a: 'Daily is best. Posting the same day the EOB or ERA arrives keeps patient balances accurate, gets secondary claims out quickly and makes deposit reconciliation simple.',
      },
    ],
    sources: [S.cmsTransactions, S.x12Carc, S.x12Rarc, S.adaBundling],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-insurance-aging-report',
    title: 'How to Work a Dental Insurance Aging Report, Bucket by Bucket',
    seoTitle: 'Dental Insurance Aging Report: How to Work Each Bucket',
    metaDescription:
      'A guide to the dental insurance aging report: what each aging bucket means, how to sort claims by carrier, and a weekly follow-up routine for your team.',
    excerpt:
      'How to read the dental insurance aging report, what to do with claims in each bucket, and how sorting by carrier turns a long list into a manageable weekly routine.',
    category: 'Practice Management',
    tags: ['insurance aging', 'dental A/R', 'claim follow-up', 'aging buckets'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p><strong>The dental insurance aging report lists every claim your office has sent that a carrier has not finished paying, grouped by how long it has been outstanding.</strong> It is the single best view of money the practice has earned but not yet received. Most offices run it; far fewer work it on a schedule, and that gap is where claims quietly age past the point of recovery.</p>

<p>This guide explains how to read the report, what action each aging bucket calls for, why sorting by carrier helps, and a weekly routine a small team can keep up with.</p>

<h2>What the insurance aging report shows</h2>
<p>Open Dental, Dentrix and Eaglesoft all produce an outstanding insurance claims report. The names and filters differ, but the core columns are similar: patient, carrier, date of service or date sent, claim amount, estimated insurance portion and days outstanding. Most offices age claims from the date sent, since that is when the carrier's clock starts.</p>
<p>Keep the insurance aging report separate from the patient aging report. Insurance aging is about carrier follow-up. Patient aging is about statements and payment plans. Mixing them hides problems in both. If you want a quick picture of how your A/R is spread across buckets, the dental A/R aging calculator in our tools section gives a simple breakdown.</p>

<h2>What to do in each aging bucket</h2>
<table>
<thead><tr><th>Bucket</th><th>What it usually means</th><th>Action</th></tr></thead>
<tbody>
<tr><td>0 to 30 days</td><td>Normal processing time for most clean claims</td><td>Confirm the clearinghouse accepted the claim. Fix rejections the same day.</td></tr>
<tr><td>31 to 60 days</td><td>The claim should be paid or at least on file</td><td>Check claim status in the carrier portal or by electronic status inquiry. Send any requested attachments.</td></tr>
<tr><td>61 to 90 days</td><td>Something is holding the claim</td><td>Call or message the carrier, get a reference number and a specific reason. Correct and resubmit if needed.</td></tr>
<tr><td>91 to 120 days</td><td>The claim is at real risk</td><td>Escalate. Check the plan's timely filing and appeal deadlines. Consider an appeal or a corrected claim.</td></tr>
<tr><td>Over 120 days</td><td>Recovery is getting harder</td><td>Decide claim by claim: appeal, rebill, transfer to patient where allowed, or write off with a documented reason.</td></tr>
</tbody>
</table>
<p>Those ranges are a starting point, not a rule. Some carriers pay clean electronic claims in days; others take longer, and the ADA has published guidance for dentists dealing with claims processing delays. Watch your own carriers and tighten the buckets where you can.</p>

<h2>Sort by carrier, not just by age</h2>
<p>Working the report top to bottom by date jumps between carriers on every line, which means a new portal, a new phone tree and a new set of rules for each claim. Sorting by carrier first and age second lets one person log in once and clear every open claim with that carrier in a single session.</p>
<p>Carrier sorting also shows patterns. If a large share of one carrier's open claims are crowns waiting for x-rays, the problem is not follow-up; it is the attachment process at submission. If one carrier's claims all stall at the same step, a single call may resolve a dozen claims. Patterns like these belong in your denial prevention work, not just your follow-up list.</p>

<h2>A weekly aging routine for a small dental team</h2>
<ol>
<li><strong>Monday: run the report.</strong> Filter to insurance only, sort by carrier and then by days outstanding. Save a copy so you can compare week to week.</li>
<li><strong>Clear the oldest first within each carrier.</strong> Claims over 90 days get worked before newer ones because their deadlines are closest.</li>
<li><strong>Check status before calling.</strong> Portals and electronic claim status responses often answer the question without a phone call. X12 maintains the claim status category codes that tell you whether a claim is pending, finalized or needs more information.</li>
<li><strong>Write a note on every claim you touch.</strong> Date, who you spoke with or what the portal showed, the reference number and the next step with a date. A claim with no note looks untouched to the next person.</li>
<li><strong>Act on the answer.</strong> Send the missing x-ray, correct the subscriber ID, update coordination of benefits or file the appeal. A status check with no action just moves the claim one week older.</li>
<li><strong>Review the totals.</strong> Compare this week's balance in each bucket with last week's. Growth in the over-90 bucket is the warning sign.</li>
</ol>

<h2>Reasons dental claims sit on the aging report</h2>
<ul>
<li><strong>Never received.</strong> The claim was rejected at the clearinghouse and nobody saw the rejection.</li>
<li><strong>Waiting on attachments.</strong> The carrier asked for a radiograph, perio chart or narrative.</li>
<li><strong>Coordination of benefits.</strong> The carrier is waiting for the patient to confirm other coverage, or the secondary claim went out without the primary EOB. Our <a href="/blog/dental-coordination-of-benefits/">coordination of benefits guide</a> covers the fixes.</li>
<li><strong>Eligibility problems.</strong> Wrong subscriber, terminated coverage or a dependent who aged off the plan.</li>
<li><strong>Paid but not posted.</strong> The money arrived and the EOB was never entered. These are found by checking the portal, and they are a sign that <a href="/blog/dental-payment-posting-guide/">payment posting</a> needs attention.</li>
<li><strong>Denied but not worked.</strong> A denial was posted at zero and the claim was left open with no follow-up.</li>
</ul>

<h2>Write notes the next person can use</h2>
<p>An aging report is only as useful as the notes behind it. A note that says "called carrier" tells the next person nothing. A useful note answers four questions: what was checked, what the carrier said, what the office did about it and when the claim should be checked again. For example: "Portal shows claim pending, waiting on pre-op x-ray for tooth #30. Uploaded x-ray and narrative through clearinghouse. Recheck in 10 days." Notes written this way let anyone on the team pick up a claim without starting over, and they become your evidence if an appeal is needed later.</p>

<h2>Watch the deadlines</h2>
<p>Every carrier sets a timely filing limit for new claims and a separate window for appeals and corrected claims, and they vary widely by plan and by state Medicaid program. A claim that ages past the filing limit is usually lost for good, and in most cases the patient cannot be billed for the office's late filing. Our guide to <a href="/blog/dental-timely-filing-limits/">dental timely filing limits</a> explains how to track them. Add the deadline to the claim note the first time you touch an aged claim so nobody has to look it up twice.</p>

<h2>Measuring whether the aging report is under control</h2>
<p>Two numbers tell you most of what you need. The first is the share of insurance A/R older than 90 days. The second is days in A/R, which shows how long it takes on average to collect what you produce. HFMA's MAP Keys define standard revenue cycle measures that many organizations use as a reference, and our <a href="/tools/days-in-ar-calculator/">days in A/R calculator</a> does the math for a dental office. Track both monthly and watch the trend, not a single month.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-accounts-receivable/">Accounts Receivable (A/R) Management</a> service works your insurance aging report on a set schedule inside your practice software: 30/60/90+ day follow-up, portal checks and carrier calls, with notes on every claim. Older A/R that existed before your start date can be quoted as a separate cleanup project. Dental RCM Reporting &amp; Revenue Analysis then shows how each bucket is moving month to month. <a href="/consultation/">Book a free consultation</a> to walk through your current report.</p>
`,
    faqs: [
      {
        q: 'What is a dental insurance aging report?',
        a: 'It is a report from your practice software listing every unpaid insurance claim, grouped by how many days it has been outstanding. Offices use it to decide which claims need status checks, corrections or appeals.',
      },
      {
        q: 'How often should we work the insurance aging report?',
        a: 'At least weekly. A weekly pass sorted by carrier keeps claims from drifting past filing and appeal deadlines, and comparing each week to the last shows whether the older buckets are shrinking.',
      },
      {
        q: 'Should claims be aged from the date of service or the date sent?',
        a: 'Most dental offices age insurance claims from the date sent, because that is when the carrier received the claim. Aging from the date of service is useful for spotting procedures that were completed but never billed.',
      },
      {
        q: 'When can an aged claim be written off?',
        a: 'Write off an aged claim only after you have confirmed the reason it was not paid and ruled out a correction or appeal. Record the reason with a specific adjustment type so the loss shows up in reporting.',
      },
    ],
    sources: [S.adaDelays, S.x12ClaimStatus, S.hfmaMapKeys],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-insurance-overpayments-and-refunds',
    title: 'Dental Insurance Overpayments, Credit Balances and Refunds',
    seoTitle: 'Dental Overpayments, Credit Balances and Refunds',
    metaDescription:
      'How dental offices find and resolve insurance overpayments and credit balances, respond to carrier recoupments and decide when to refund the carrier or patient.',
    excerpt:
      'Why dental credit balances happen, how to work out who is owed the money, how carrier recoupments show up on an ERA and a simple workflow for issuing refunds.',
    category: 'Compliance and Regulation',
    tags: ['overpayments', 'credit balances', 'refunds', 'recoupments'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p><strong>A credit balance on a dental account means the practice has received more money than the patient's charges support, and that money usually belongs to someone else.</strong> Sometimes it belongs to the patient, sometimes to a carrier and sometimes it is a posting error that only looks like extra money. Leaving credits on the books is not a neutral choice: carriers will eventually ask for overpayments back, and many states have rules about money owed to patients.</p>

<p>This guide covers why overpayments happen in dental offices, how to work out who is owed the refund, how carrier recoupments appear on remittances and a workflow for clearing credit balances every month.</p>

<h2>Why dental overpayments happen</h2>
<ul>
<li><strong>Collecting the estimate at the visit.</strong> The front desk collects the estimated patient portion, then the carrier pays more than expected. The patient now has a credit.</li>
<li><strong>Coordination of benefits errors.</strong> Both plans pay as primary, or the secondary pays without seeing the primary EOB. The ADA's guidance on coordination of benefits and the NAIC model regulation explain how primary and secondary are supposed to be determined.</li>
<li><strong>Duplicate payments.</strong> The carrier pays the same claim twice, often after a resubmission.</li>
<li><strong>Eligibility changes.</strong> Coverage was terminated retroactively and the carrier pays first and recovers later.</li>
<li><strong>Posting errors.</strong> A payment posted to the wrong patient, the wrong date of service or posted twice from an ERA and a paper EOB.</li>
<li><strong>Unapplied payments.</strong> A patient payment sitting on the account without being applied to a procedure. This is not a true overpayment, but it shows as a credit.</li>
</ul>

<h2>First, confirm the credit is real</h2>
<p>Before refunding anyone, rule out posting problems. Many credits disappear once someone looks closely. Check that every payment is applied to the right procedure, that the PPO write-off was entered, that the same EOB was not posted twice and that charges were not deleted or changed after payment. A careful <a href="/blog/dental-payment-posting-guide/">payment posting</a> process prevents most false credits in the first place.</p>

<h2>Work out who is owed the money</h2>
<p>Once the credit is confirmed, trace the payments in order. The question is which payer paid more than it should have.</p>
<table>
<thead><tr><th>Situation</th><th>Usually owed to</th></tr></thead>
<tbody>
<tr><td>Patient paid the estimate, carrier paid more than estimated</td><td>Patient</td></tr>
<tr><td>Carrier paid the same claim twice</td><td>Carrier</td></tr>
<tr><td>Both plans paid as primary</td><td>The plan that should have been secondary, after the correct order is confirmed</td></tr>
<tr><td>Coverage was terminated before the date of service</td><td>Carrier, and the patient then owes the office for the service</td></tr>
<tr><td>Payment posted to the wrong account</td><td>Nobody: move it to the correct account</td></tr>
</tbody>
</table>
<p>These are typical outcomes, not rules for every case. Your participation agreements and the plan documents decide the details, and some situations need a call to the carrier.</p>

<h3>Worked example (hypothetical numbers)</h3>
<p>These numbers are hypothetical. A patient has a crown with an allowed amount of $1,000. The office estimated the carrier would pay 50 percent and collected $500 from the patient at the seat appointment. The carrier processes the claim and pays $600, because the patient had more annual maximum left than the estimate assumed. Total received is $1,100 against a $1,000 allowed amount, leaving a $100 credit. The carrier paid what the plan allows, so the patient overpaid and the $100 refund goes to the patient, unless the patient has another open balance and agrees in writing to apply it there.</p>

<h2>Carrier recoupments and refund requests</h2>
<p>Carriers recover overpayments in two main ways. Some send a refund request letter asking the office to mail a check. Others take the money back by reducing a future payment, which is called a recoupment or offset. On an ERA, an offset often appears as a provider-level adjustment that lowers the deposit without matching any claim in that payment. The 835 remittance standard that CMS lists among the HIPAA transactions has a place for these adjustments, and the related claim is usually identified there or on a separate letter.</p>
<p>When a recoupment shows up:</p>
<ol>
<li>Identify the original claim and patient the carrier is recovering for.</li>
<li>Check whether the recovery is valid. Was the claim really overpaid, or did the carrier make an error?</li>
<li>Post the recoupment against the original claim so the patient ledger is accurate. Do not leave it as a mystery shortfall on the deposit.</li>
<li>If the patient now owes for the service, update the balance and send a statement with an explanation.</li>
<li>If you disagree, dispute it in writing with the carrier and keep a copy.</li>
</ol>
<p>Many states limit how far back a commercial dental carrier can go to recover a payment and set notice requirements, but the limits differ by state and plan type. Medicaid dental programs have their own rules and deadlines for reporting and returning overpayments. Check your state's rules and your contracts rather than assuming one standard applies.</p>

<h2>Keep a refund log</h2>
<p>Whether the refund goes to a patient or a carrier, record it in one place: the date the credit was found, the cause, who approved the refund, the amount, how it was paid and the check or transaction number. A refund log makes it easy to answer a carrier audit request or a patient question months later, and it shows whether the same causes keep repeating. Keep copies of the EOBs or letters that support each decision with the log.</p>

<h2>Refunding patients</h2>
<p>Patient refunds should follow a written policy so they are handled the same way every time. A good policy covers:</p>
<ul>
<li>Who approves refunds and at what amount.</li>
<li>How quickly refunds are issued once the credit is confirmed.</li>
<li>Whether the office may apply a credit to another family member's balance, and that the patient must agree first.</li>
<li>How refunds are made: back to the card used, or by check.</li>
<li>What happens when a refund check is never cashed. State unclaimed property laws may apply to uncashed refunds, so ask your accountant how your state handles them.</li>
</ul>
<p>Our <a href="/services/patient-billing/">Patient Billing &amp; Collections Support</a> service can include credit balance review as part of the statement cycle.</p>

<h2>A monthly credit balance workflow</h2>
<ol>
<li>Run a credit balance report from your practice software.</li>
<li>Sort by amount and age. Work the largest and oldest first.</li>
<li>Rule out posting errors and unapplied payments.</li>
<li>Identify who is owed the money and document how you decided.</li>
<li>Get approval and issue the refund, or send a corrected claim or refund to the carrier.</li>
<li>Post the refund on the ledger so the credit clears.</li>
<li>Note recurring causes. If credits keep coming from the same estimate errors, fix the estimate process. If they come from one carrier's COB, update your verification steps.</li>
</ol>
<p>Credit balance review fits naturally into your <a href="/blog/dental-month-end-billing-close/">month-end billing close</a>, so nothing carries forward unexplained.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/payment-posting/">Payment Posting</a> team identifies credits and recoupments as they post, ties each offset to the original claim and flags overpayments for your approval before any refund is issued. Patient Billing &amp; Collections Support handles patient balance review, and Dental RCM Reporting &amp; Revenue Analysis reports on credits and adjustments each month. Refund decisions stay with the practice. <a href="/consultation/">Book a free consultation</a> to talk through your current credit balance report.</p>
`,
    faqs: [
      {
        q: 'What causes a credit balance on a dental account?',
        a: 'Credit balances usually come from collecting an estimate that was higher than the final patient portion, duplicate or primary-secondary payments from carriers, retroactive eligibility changes or posting errors. The first step is ruling out posting errors before treating the credit as real.',
      },
      {
        q: 'Can we keep a small patient credit balance?',
        a: 'Generally no. A confirmed credit belongs to whoever overpaid, and keeping it can create problems under state law. Refund it or, with the patient\'s agreement, apply it to another open balance on their account.',
      },
      {
        q: 'What is a recoupment on a dental ERA?',
        a: 'A recoupment is when a carrier takes back an earlier overpayment by reducing a later payment. It often appears as a provider-level adjustment on the ERA, and it should be posted against the original claim so the patient ledger stays accurate.',
      },
      {
        q: 'Do we have to repay a carrier if we think the recoupment is wrong?',
        a: 'You can dispute a recoupment you believe is wrong by writing to the carrier with the claim details and supporting EOBs. Follow the carrier\'s dispute process and deadlines, and keep copies of everything you send.',
      },
    ],
    sources: [S.adaCob, S.naicCob, S.cmsTransactions],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-month-end-billing-close',
    title: 'Dental Month-End Billing Close: A Reconciliation Checklist',
    seoTitle: 'Dental Month-End Billing Close Checklist',
    metaDescription:
      'A month-end billing close checklist for dental offices: reconcile production, collections and adjustments, clear unposted items and review A/R before closing.',
    excerpt:
      'A step-by-step month-end close for dental offices, covering production, payments, adjustments, claims, credit balances and the numbers to review before the books are locked.',
    category: 'Practice Management',
    tags: ['month-end close', 'reconciliation', 'dental KPIs', 'office manager'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p><strong>A month-end billing close is the routine that makes sure every procedure, payment and adjustment for the month is in your practice software correctly before the period is locked and the reports are run.</strong> When it is done well, the doctor's production report, the accountant's deposit figures and the A/R balance all tell the same story. When it is skipped, small errors carry into the next month and the numbers stop being trustworthy.</p>

<p>Below is a practical checklist built for dental offices, followed by the reports to review and the most common things that make a close fall apart.</p>

<h2>Why the billing close matters</h2>
<p>Most dental software lets you lock or close a period so past transactions cannot be edited without a trail. Open Dental, Dentrix and Eaglesoft each handle this a little differently, but the idea is the same. Once the month is closed, production, collections and adjustments for that month are fixed. If something was missed or posted wrong before the close, the fix has to be made in a later month, and your reports for both months are off.</p>
<p>The close also forces a regular look at work that tends to slide: unsent claims, unposted EOBs, unapplied payments and credit balances. A monthly deadline turns those from someday tasks into this-week tasks.</p>

<h2>Before the last day: keep the daily work current</h2>
<p>A month-end close is only as easy as the daily routine before it. The close goes quickly when, through the month, the team has:</p>
<ul>
<li>Completed procedures and attached them to claims on the day of service.</li>
<li>Sent claims daily and cleared clearinghouse rejections.</li>
<li>Posted EOBs and ERAs and balanced each deposit, as covered in our <a href="/blog/dental-payment-posting-guide/">dental payment posting guide</a>.</li>
<li>Balanced the day sheet each evening against card, cash and check receipts.</li>
</ul>

<h2>The month-end billing close checklist</h2>
<h3>Production</h3>
<ol>
<li>Run a report of scheduled appointments with no completed procedures. Every patient seen should have charges posted.</li>
<li>Check for procedures treatment-planned but marked complete in error, and for completed procedures with no provider or the wrong provider.</li>
<li>Confirm hygiene and doctor production are split correctly, since this often drives provider pay.</li>
</ol>
<h3>Claims</h3>
<ol start="4">
<li>Run the unsent claims report. Every completed insured procedure should be on a claim that has been sent or is held for a documented reason, such as waiting for a lab.</li>
<li>Clear any clearinghouse rejections that are still open.</li>
<li>Check that secondary claims went out for every primary that paid this month.</li>
</ol>
<h3>Payments and deposits</h3>
<ol start="7">
<li>Match every bank deposit for the month to a posted batch, including electronic carrier payments. The trace number on each 835 ERA should match an electronic deposit.</li>
<li>Resolve deposits with no EOB and EOBs with no deposit.</li>
<li>Post any carrier recoupments or offsets against the original claims.</li>
<li>Apply unapplied patient payments to the right procedures.</li>
</ol>
<h3>Adjustments and credits</h3>
<ol start="11">
<li>Review adjustments by type. Large or unusual write-offs should have a note and an approval. For insurance write-offs, the claim adjustment reason code on the ERA shows why the carrier reduced the line.</li>
<li>Run the credit balance report and work it as described in our guide to <a href="/blog/dental-insurance-overpayments-and-refunds/">overpayments and refunds</a>.</li>
<li>Confirm small balance write-offs follow your financial policy threshold.</li>
</ol>
<h3>A/R and statements</h3>
<ol start="14">
<li>Run the insurance aging report and confirm every claim over 30 days has a recent note. Our <a href="/blog/dental-insurance-aging-report/">insurance aging guide</a> covers how to work it.</li>
<li>Send patient statements for balances due after insurance.</li>
</ol>
<h3>Close and report</h3>
<ol start="16">
<li>Lock the period in your practice software.</li>
<li>Save the month's production, collections, adjustments and aging reports.</li>
<li>Give the deposit and collections totals to your accountant.</li>
</ol>

<h2>Worked example: tying out the month (hypothetical numbers)</h2>
<p>These numbers are hypothetical. A useful tie-out is that the A/R balance moves by exactly what happened during the month:</p>
<table>
<thead><tr><th>Line</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Beginning A/R</td><td>$120,000</td></tr>
<tr><td>Plus gross production</td><td>$150,000</td></tr>
<tr><td>Minus adjustments and write-offs</td><td>$45,000</td></tr>
<tr><td>Minus collections (insurance and patient)</td><td>$100,000</td></tr>
<tr><td><strong>Expected ending A/R</strong></td><td><strong>$125,000</strong></td></tr>
</tbody>
</table>
<p>If the aging report shows a different ending balance, something was posted outside the normal flow, such as a deleted procedure, a payment moved between months or a backdated adjustment. Find it before the period is locked. Most practice software produces a summary that shows this movement, and it is worth reading every month.</p>

<h2>A sample close calendar</h2>
<p>A close works best when each step has an owner and a day. The calendar below is only an example; adjust it to your team and your software.</p>
<table>
<thead><tr><th>When</th><th>Step</th><th>Typical owner</th></tr></thead>
<tbody>
<tr><td>Last week of the month</td><td>Clear unsent claims and open rejections, chase missing EOBs</td><td>Insurance coordinator</td></tr>
<tr><td>Last business day</td><td>Post all remaining EOBs and ERAs, balance the final day sheet</td><td>Billing lead</td></tr>
<tr><td>Business day 1</td><td>Reconcile deposits to the bank, resolve unmatched items</td><td>Billing lead</td></tr>
<tr><td>Business day 2</td><td>Review adjustments, credit balances and the production tie-out</td><td>Office manager</td></tr>
<tr><td>Business day 3</td><td>Lock the period, save reports, send totals to the accountant</td><td>Office manager</td></tr>
</tbody>
</table>
<p>Smaller offices often have one person doing every step. That is fine, as long as the steps happen in this order and the person signing off is not skipping the review because they also did the posting. In that case, ask the doctor or an outside reviewer to look over the adjustment report each month.</p>

<h2>Numbers to review after the close</h2>
<ul>
<li><strong>Gross and net production</strong> by provider, and the gap between them, which is mostly PPO write-offs.</li>
<li><strong>Collections</strong> split into insurance and patient payments.</li>
<li><strong>Net collection rate,</strong> which compares what you collected with what you could reasonably collect. Our net collection rate calculator handles the formula.</li>
<li><strong>Days in A/R and the share of insurance A/R over 90 days.</strong></li>
<li><strong>Adjustments by type,</strong> so denials and downgrades are not hidden inside contractual write-offs.</li>
</ul>
<p>HFMA's MAP Keys are a widely used reference for how revenue cycle measures are defined, and our <a href="/blog/dental-practice-kpis/">dental practice KPIs guide</a> explains which ones matter most to a dental office. Watch trends over several months rather than reacting to a single month.</p>

<h2>What makes a month-end close fall apart</h2>
<ul>
<li>EOBs left unposted until the last day, then posted in a rush.</li>
<li>Payments posted to the wrong month after the close.</li>
<li>Adjustments entered with a generic type, so nobody can tell a PPO discount from a denial.</li>
<li>No single owner. When everyone is partly responsible, steps get skipped.</li>
<li>Closing late. A close that happens two weeks into the next month mixes two months of work.</li>
</ul>

<h2>How Texas Solutions RCM can help</h2>
<p>We handle most of the work that feeds the close: Payment Posting, Dental Claims Management and Accounts Receivable (A/R) Management, all done inside your own practice software. Our <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> service then provides monthly reports on collections, adjustments, aging and denial trends so the office manager and doctor can review the month with confidence. To see how this would work for your office, <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'What is a month-end billing close in a dental office?',
        a: 'It is a monthly routine to confirm every procedure, claim, payment and adjustment for the month is posted correctly before the period is locked in the practice software. It keeps production, collections and A/R reports accurate.',
      },
      {
        q: 'How long should a dental month-end close take?',
        a: 'It depends on how current the daily work is. When claims, posting and deposits are kept up daily, the close is mostly review; when they are not, it turns into catch-up. Aim to finish within the first few business days of the new month.',
      },
      {
        q: 'Who should own the month-end close?',
        a: 'One person, usually the office manager or billing lead, should own the close and sign off on it. Others can complete individual steps, but a single owner makes sure nothing is skipped.',
      },
      {
        q: 'What if we find an error after the month is closed?',
        a: 'Correct it in the current open month with a clear note explaining the original error. Avoid reopening closed periods unless your accountant agrees, since that changes reports already shared.',
      },
    ],
    sources: [S.hfmaMapKeys, S.cmsTransactions, S.x12Carc],
  },
];
