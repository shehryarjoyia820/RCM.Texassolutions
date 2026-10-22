/**
 * Dental RCM guides, batch D (2026-10-22). Original content. Rules: docs/DENTAL-WRITING.md.
 * Sources are limited to URLs already verified elsewhere in this repo.
 */
import type { SeedPost } from './seed';

const S = {
  adaPreAuth: { label: 'ADA: Pre-Authorizations', url: 'https://www.ada.org/resources/practice/dental-insurance/pre-authorizations' },
  adaTypicalPlan: {
    label: 'ADA: Typical Dental Plan Benefits and Limitations',
    url: 'https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations',
  },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  adaDowncoding: { label: 'ADA: Downcoding', url: 'https://www.ada.org/resources/practice/dental-insurance/downcoding' },
  adaIntroBenefits: {
    label: 'ADA: An Introduction to Dental Benefits',
    url: 'https://www.ada.org/resources/practice/dental-insurance/an-introduction-to-dental-benefits',
  },
  adaNoncovered: { label: 'ADA News: Dear ADA, Noncovered Services (March 30, 2026)', url: 'https://adanews.ada.org/ada-news/2026/march/dear-ada-noncovered-services/' },
  adaInOffice: {
    label: 'ADA: Is an In-Office Dental Plan Right for Your Practice?',
    url: 'https://www.ada.org/resources/practice/dental-insurance/is-an-in-office-dental-plan-right-for-your-practice',
  },
  cmsGfe: { label: 'CMS: Good Faith Estimate guide for patients', url: 'https://www.cms.gov/medical-bill-rights/help/guides/good-faith-estimate' },
  ecfrGfe: {
    label: 'eCFR: 45 CFR 149.610, Good faith estimates for uninsured (or self-pay) individuals',
    url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-149/subpart-G/section-149.610',
  },
  hhsEmail: {
    label: 'HHS FAQ: Using e-mail to communicate with patients',
    url: 'https://www.hhs.gov/hipaa/for-professionals/faq/does-hipaa-permit-health-care-providers-to-use-email-to-discuss-health-issues-with-patients/index.html',
  },
  hhsMinimum: {
    label: 'HHS: Minimum Necessary Requirement',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html',
  },
  fccRobocalls: { label: 'FCC: Stop Unwanted Robocalls and Texts', url: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts' },
  ecfrTcpa: {
    label: 'eCFR: 47 CFR 64.1200, Delivery restrictions (calls and texts)',
    url: 'https://www.ecfr.gov/current/title-47/chapter-I/subchapter-B/part-64/subpart-L/section-64.1200',
  },
};

export const dentalGuidesD: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-patient-cost-estimates',
    title: 'Dental Patient Cost Estimates: Getting the Patient Portion Right',
    seoTitle: 'Dental Patient Cost Estimates That Match the EOB',
    metaDescription:
      'How to build accurate patient portion estimates for dental treatment plans, present them clearly and keep your estimates and carrier EOBs in line over time.',
    excerpt:
      'A practical guide to calculating the patient portion on a dental treatment plan, presenting the estimate, and closing the gap between what you quoted and what the EOB says.',
    category: 'Dental Billing',
    tags: ['patient estimates', 'treatment plans', 'patient portion', 'dental EOB', 'insurance verification'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>A patient portion estimate is a number your office commits to before the carrier has processed anything. When the estimate lands close to the EOB, patients pay at checkout and accept the next treatment plan with confidence. When it misses, the office ends up mailing surprise balances, writing refund checks and fielding frustrated calls.</p>

<p>This guide walks through what goes into an accurate dental cost estimate, a hypothetical worked example, how to present the number to the patient and how to keep estimates and EOBs aligned month after month.</p>

<h2>Why dental cost estimates miss</h2>
<p>Most estimate errors trace back to a handful of causes. None of them is a math problem. They are data problems that start at verification or in the plan record inside your practice software.</p>
<ul>
<li><strong>Stale fee schedules.</strong> The in-network fee schedule loaded in the software is out of date, so the allowed amount is wrong from the start.</li>
<li><strong>Remaining benefits not checked.</strong> The annual maximum and deductible were verified at the start of the year but not refreshed after other treatment was paid.</li>
<li><strong>Frequency history ignored.</strong> A service was done elsewhere or earlier than the plan allows, and the carrier pays nothing.</li>
<li><strong>Downgrades and alternate benefits.</strong> The plan pays a posterior composite at the amalgam rate, or a crown at a lesser benefit, and the estimate assumed full coverage.</li>
<li><strong>Plan limitations.</strong> A waiting period or missing tooth clause applies to a major service.</li>
<li><strong>Wrong coverage category.</strong> The software treats a code as basic when the plan treats it as major, or the reverse.</li>
<li><strong>Coordination of benefits.</strong> The primary and secondary plans are in the wrong order, or the secondary's payment method was guessed.</li>
</ul>

<h2>What you need before you build the estimate</h2>
<p>Treat this as the minimum data set for any treatment plan above a routine hygiene visit. Our <a href="/blog/dental-insurance-verification-guide/">dental insurance verification guide</a> covers how to gather it.</p>
<ul>
<li>Active coverage, effective date and subscriber details</li>
<li>Network status and the fee schedule that applies to this plan</li>
<li>Coverage percentages by category (preventive, basic, major) and how the plan classifies each planned code</li>
<li>Deductible amount and how much has been met this benefit year</li>
<li>Annual maximum and the amount remaining, including claims still pending</li>
<li>Frequency limits and the last date of service for each relevant procedure</li>
<li>Waiting periods, missing tooth clause and alternate benefit provisions</li>
<li>Secondary coverage, if any, and the order of benefits</li>
</ul>

<h2>How to calculate the patient portion</h2>
<ol>
<li>Start with the allowed fee for each planned code. For an in-network PPO patient, that is the contracted fee, not your office fee.</li>
<li>Subtract any deductible still owed for the benefit year.</li>
<li>Apply the coverage percentage for the category the plan assigns to each code.</li>
<li>Adjust for downgrades, frequency limits, waiting periods and other limitations.</li>
<li>Cap the carrier's share at the remaining annual maximum, after accounting for other treatment already scheduled.</li>
<li>The patient portion is the allowed fee minus the estimated carrier payment.</li>
<li>If there is a secondary plan, estimate its payment using that plan's coordination method, and label it as the least certain part of the estimate.</li>
</ol>

<h3>Worked example (hypothetical numbers)</h3>
<p>A patient with an in-network PPO plan needs a crown and a buildup on a molar (for example, D2740 and D2950). The plan covers both at 50 percent as major services, $50 of the deductible is still owed and $800 of the annual maximum remains. These figures are hypothetical and chosen only to show the math.</p>
<table>
<thead><tr><th>Line</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Office fee, crown plus buildup</td><td>$1,750</td></tr>
<tr><td>PPO allowed fee, crown plus buildup</td><td>$1,250</td></tr>
<tr><td>Contractual write-off (office fee minus allowed fee)</td><td>$500</td></tr>
<tr><td>Allowed fee minus $50 deductible</td><td>$1,200</td></tr>
<tr><td>Carrier share at 50 percent</td><td>$600 (under the $800 remaining maximum)</td></tr>
<tr><td>Estimated patient portion ($1,250 minus $600)</td><td>$650</td></tr>
</tbody>
</table>
<p>Now change one input. If only $400 of the annual maximum remained, the carrier would pay $400 and the patient portion would rise to $850. That single field is why remaining benefits must be refreshed before every major treatment plan. Under a typical in-network contract the $500 write-off is not billed to the patient, but confirm the terms of each contract. Our <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> runs the same steps.</p>

<h2>Presenting the estimate to the patient</h2>
<p>A good estimate is written, itemized and honest about what it is. Include:</p>
<ul>
<li>Each planned procedure in plain language, with the tooth number where relevant</li>
<li>The office fee, the insurance adjustment, the estimated insurance payment and the estimated patient portion</li>
<li>The date of the estimate and a note that it is based on benefits reported by the carrier on that date</li>
<li>A clear statement that the carrier decides the final payment, and what happens if it differs (a balance due or a refund)</li>
<li>Payment options, including any in-office payment plan and where the patient can read its terms</li>
<li>A signature line for the patient to accept the treatment and the estimate</li>
</ul>
<p>For large or uncertain cases, consider sending a pre-treatment estimate to the carrier first. It is not a promise of payment, but it surfaces downgrades and frequency problems before the patient is in the chair. See <a href="/blog/dental-predetermination-vs-preauthorization/">predetermination vs preauthorization</a> for the difference between the two.</p>
<p>Patients who are uninsured or choosing not to use insurance are a separate case. Federal No Surprises Act rules require providers to give a Good Faith Estimate to uninsured and self-pay patients, with specific timing and content requirements. Review the CMS guidance and confirm your process meets it.</p>

<h2>Keeping estimates and EOBs aligned</h2>
<p>Accuracy improves when someone compares every EOB to the estimate at the moment of posting, not months later when a patient calls. Build these habits:</p>
<ul>
<li><strong>Flag variances at posting.</strong> When the carrier pays a different amount than estimated, note the reason on the claim.</li>
<li><strong>Fix the plan record, not just the account.</strong> If the EOB shows a downgrade or a different coverage percentage, update the plan's benefit setup in your software so the next estimate for every patient on that plan is correct.</li>
<li><strong>Refresh fee schedules.</strong> Load updated contracted fees as soon as a carrier issues them.</li>
<li><strong>Review variances monthly.</strong> Group the month's misses by reason. The top two or three reasons usually point to one verification step that needs tightening.</li>
</ul>
<table>
<thead><tr><th>Variance reason on the EOB</th><th>Process fix</th></tr></thead>
<tbody>
<tr><td>Paid at a lesser benefit</td><td>Record the plan's alternate benefit rules in the plan notes</td></tr>
<tr><td>Frequency exceeded</td><td>Add history questions to verification and new patient intake</td></tr>
<tr><td>Maximum reached</td><td>Recheck remaining benefits within a few days of treatment</td></tr>
<tr><td>Allowed amount differs</td><td>Reload or audit the contracted fee schedule</td></tr>
<tr><td>Secondary paid less than expected</td><td>Confirm the secondary plan's coordination method</td></tr>
</tbody>
</table>
<p>Our <a href="/blog/dental-payment-posting-guide/">dental payment posting guide</a> covers how to record these variances while posting.</p>

<h2>Handling the difference after the EOB</h2>
<p>When the patient owes more than estimated, send a statement that shows the EOB result in plain language and explains why the number changed. When the patient paid more than they owe, refund the credit promptly under your financial policy. In both cases, a short explanation does more to protect trust than the dollar amount itself.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service gathers the benefits breakdown, remaining maximums, frequency history and plan limitations your team needs, and prepares patient responsibility estimates inside your Open Dental, Dentrix or Eaglesoft system. Our Payment Posting service compares each EOB to the estimate and flags variances, and Patient Billing &amp; Collections Support handles the statements that follow. <a href="/consultation/">Book a free consultation</a> to talk through your current estimate process.</p>
`,
    faqs: [
      {
        q: 'How accurate can a dental patient estimate be?',
        a: 'A dental estimate can be close to the final EOB when it is built from current benefits, the right fee schedule and the plan\'s limitations, but it is never certain. The carrier decides the final payment when it processes the claim, so the estimate should say so in writing.',
      },
      {
        q: 'Should the patient estimate use the office fee or the PPO fee?',
        a: 'For an in-network PPO patient, use the contracted allowed fee. The difference between your office fee and the allowed fee is usually a contractual write-off that is not billed to the patient, so confirm the terms of each contract.',
      },
      {
        q: 'Do I need a pre-treatment estimate from the carrier for every treatment plan?',
        a: 'No, most offices send pre-treatment estimates only for larger or less predictable cases such as crowns, bridges, implants and periodontal treatment. Even then, the carrier\'s response is an estimate and not a promise of payment.',
      },
      {
        q: 'What should we do when the EOB differs from our estimate?',
        a: 'Post the payment, note the reason for the difference and update the plan\'s benefit setup if the plan record was wrong. Then send the patient a clear statement for any balance or refund any credit under your financial policy.',
      },
    ],
    sources: [S.adaPreAuth, S.adaTypicalPlan, S.adaDowncoding, S.adaCob, S.cmsGfe],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-patient-statements',
    title: 'Dental Patient Statements: What to Include and When to Send',
    seoTitle: 'Dental Patient Statements: Content and Timing',
    metaDescription:
      'How to send clear dental patient statements: when to send the first one, what each statement should include, a sample layout and the errors that cause calls.',
    excerpt:
      'A dental patient statement should arrive after insurance has paid, show exactly how the balance was reached and make paying easy. Here is how to get the content and timing right.',
    category: 'Practice Management',
    tags: ['patient statements', 'patient billing', 'patient balances', 'dental collections'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>For most patients, the statement is the only piece of billing paperwork they ever read. A clear statement, sent at the right moment, gets paid without a phone call. A confusing one, or one that arrives before insurance has paid, generates questions, disputes and balances that age past the point anyone wants to chase them.</p>

<p>This guide covers when to send dental patient statements, what each one should contain, a sample layout and the account problems to fix before a statement goes out.</p>

<h2>When to send the first statement</h2>
<p>The first statement should go out after the carrier has processed the claim and the EOB or ERA has been posted. Sending a statement while insurance is still pending is one of the most common sources of patient confusion, because the balance on the page is not the balance the patient will owe.</p>
<p>If your office collects the estimated patient portion at checkout, as most financial policies recommend, the statement only needs to cover the difference between that estimate and the final result. When estimates are accurate, that difference is small or zero. Our guide to <a href="/blog/dental-patient-cost-estimates/">dental patient cost estimates</a> explains how to keep it that way.</p>
<p>Many offices run statements on a fixed cycle, such as once or twice a month, rather than sending one each time a claim posts. A cycle makes the work predictable and keeps patients with several visits from receiving a stack of separate bills.</p>

<h2>What a clear dental statement includes</h2>
<ul>
<li>Practice name, address, phone number and the hours someone can answer billing questions</li>
<li>Statement date and payment due date</li>
<li>Guarantor name and an account number (never a Social Security number)</li>
<li>Each patient on the account, for family accounts</li>
<li>Date of service and a plain-language description of each procedure</li>
<li>Office fee, insurance payment, insurance adjustment, patient payments and remaining balance for each visit</li>
<li>Any amount still pending with insurance, shown separately and not included in the amount due</li>
<li>Prior balance, new charges and total amount due</li>
<li>Every way the patient can pay, including online payment if you offer it</li>
<li>A short message line for notes such as a payment plan reminder</li>
</ul>
<p>Keep clinical detail to what the patient needs to recognize the visit. A description such as "crown, upper right" is enough. HHS's minimum necessary standard is a useful habit even where it does not strictly apply: share only the information needed for the purpose.</p>

<h3>Sample statement layout (hypothetical account)</h3>
<table>
<thead><tr><th>Date</th><th>Description</th><th>Charge</th><th>Insurance paid</th><th>Adjustment</th><th>You paid</th><th>Balance</th></tr></thead>
<tbody>
<tr><td>08/04</td><td>Crown, lower left</td><td>$1,400</td><td>$500</td><td>$400</td><td>$450</td><td>$50</td></tr>
<tr><td>08/04</td><td>Exam and x-rays</td><td>$180</td><td>$130</td><td>$50</td><td>$0</td><td>$0</td></tr>
<tr><td>09/15</td><td>Filling, upper right</td><td>$240</td><td>Pending</td><td></td><td>$40</td><td>Pending insurance</td></tr>
<tr><td></td><td><strong>Amount due now</strong></td><td></td><td></td><td></td><td></td><td><strong>$50</strong></td></tr>
</tbody>
</table>
<p>In this hypothetical example, the patient can see that the crown estimate was $50 short, that the exam was paid in full and that the September visit is still with the carrier and not yet owed.</p>

<h2>A statement workflow that holds up</h2>
<ol>
<li><strong>Post insurance first.</strong> Post the ERA or EOB, including write-offs, before statements run.</li>
<li><strong>Review balances.</strong> Check for credit balances, unapplied payments and accounts where secondary insurance has not yet paid.</li>
<li><strong>Hold accounts that are not ready.</strong> Suppress statements for accounts with pending secondary claims or open disputes.</li>
<li><strong>Send the first statement</strong> on your regular cycle.</li>
<li><strong>Send follow-up statements</strong> at the intervals your financial policy sets, with a message that becomes more direct each time.</li>
<li><strong>Apply your policy at the end of the cycle.</strong> The practice decides whether a balance goes to a payment plan, an outside agency or a write-off. That decision belongs to the practice, in line with its written <a href="/blog/dental-office-financial-policy/">financial policy</a>.</li>
</ol>

<h2>Paper, email, portal or text</h2>
<p>Paper statements still work, but many patients pay faster from a link. Before moving statements to electronic channels, check two things:</p>
<ul>
<li><strong>Email.</strong> HHS guidance says providers may communicate with patients by email with reasonable safeguards, and patients may ask to be contacted by alternative means. Record each patient's preference.</li>
<li><strong>Text messages.</strong> Federal rules under the Telephone Consumer Protection Act set consent requirements for certain automated calls and texts, and patients can revoke consent. Get the right consent and confirm your vendor's approach with counsel. Our article on <a href="/blog/patient-payment-options-text-to-pay/">text-to-pay and patient payment options</a> covers this in more detail.</li>
</ul>

<h2>Account problems that cause calls</h2>
<p>Most statement calls come from a small set of account errors. Fix these before the statement run, not after the phone rings:</p>
<ul>
<li>A balance billed before insurance has paid</li>
<li>A PPO write-off that was never posted, so the patient sees the full office fee</li>
<li>A patient payment applied to the wrong visit or the wrong family member</li>
<li>A credit balance on one patient and a debit balance on another in the same family</li>
<li>Descriptions that only show codes, which mean nothing to the patient</li>
<li>Old balances with no explanation of where they came from</li>
</ul>
<p>A quick pre-run report helps. Before each statement cycle, pull a list of accounts with credit balances, accounts with claims open more than a set number of days and accounts where the last insurance payment was posted without an adjustment. Each of those lists tends to hide statements that should not go out yet.</p>

<h2>Using the message line well</h2>
<p>The short message area on a statement is the cheapest patient communication you have. Use it to answer the question the patient is most likely to ask about that particular balance, in plain words. Examples your office can adapt:</p>
<ul>
<li>"Your insurance paid less than estimated for your crown. The carrier's explanation is available on request."</li>
<li>"This balance reflects your plan's annual maximum, which was reached during your treatment."</li>
<li>"Your payment plan installment of [amount] is scheduled for [date]."</li>
<li>"Your September visit is still being processed by your insurance and is not included in the amount due."</li>
<li>"You have a credit on your account. Please contact us if you would like a refund instead of applying it to your next visit."</li>
</ul>
<p>Avoid messages that sound like threats on a first statement. Firmer language belongs on later statements, and only in the form your financial policy sets out.</p>

<h2>Measuring whether statements are working</h2>
<p>Watch patient balances by age bucket each month, the share of balances paid after the first statement and the number of billing calls the front desk takes. If patient balances keep growing in the older buckets, review estimate accuracy and statement timing before changing anything else. The <a href="/tools/dental-ar-aging-calculator/">dental A/R aging calculator</a> can help you see where balances sit.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/patient-billing/">Patient Billing &amp; Collections Support</a> service covers patient statement processing, patient balance review, payment allocation and outstanding balance follow-up through statements, run inside your own practice software and on the cycle your financial policy sets. We do not phone patients: your front desk stays the patient's point of contact, and we keep the accounts clean so their calls are short. Paired with our Payment Posting service, statements go out only after insurance has been posted correctly. <a href="/consultation/">Book a free consultation</a> to review your current statement process.</p>
`,
    faqs: [
      {
        q: 'When should a dental office send a patient statement?',
        a: 'Send the first statement after the carrier has processed the claim and the payment and write-off have been posted. Sending a statement while insurance is pending usually shows the patient a balance they will not actually owe.',
      },
      {
        q: 'What should a dental patient statement include?',
        a: 'It should include the practice\'s contact details, the statement and due dates, an account number, each visit with a plain-language description, the charge, insurance payment, adjustment, patient payments and the balance. Amounts still pending with insurance should be shown separately from the amount due.',
      },
      {
        q: 'Can we send dental statements by email or text?',
        a: 'Yes, many offices do, with the right safeguards and consent. HHS allows email with reasonable safeguards, and federal rules set consent requirements for certain automated texts, so record each patient\'s preference and check your approach with counsel.',
      },
      {
        q: 'Does Texas Solutions RCM call patients about balances?',
        a: 'No. We prepare and send patient statements and keep account balances accurate, but we do not phone patients. Your office remains the patient\'s point of contact for billing questions.',
      },
    ],
    sources: [S.hhsEmail, S.hhsMinimum, S.fccRobocalls, S.ecfrTcpa],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-office-financial-policy',
    title: 'Dental Office Financial Policy: What to Cover, With an Outline',
    seoTitle: 'Dental Office Financial Policy: Outline and Tips',
    metaDescription:
      'What a dental office financial policy should cover, from payment at time of service to insurance, minors and credit balances, with an original outline to adapt.',
    excerpt:
      'A written financial policy tells patients what they owe, when and how, and gives your team one answer to every billing question. Here is what to include and an outline your office can adapt.',
    category: 'Practice Management',
    tags: ['financial policy', 'patient billing', 'front desk', 'dental office policies'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>A dental office financial policy is the written set of rules for how patients pay: what is due at the visit, how insurance is handled, what happens to balances and how the office deals with special cases. Without one, every front desk team member makes up their own answers, and patients hear different things on different days.</p>

<p>This guide explains what a financial policy should cover, gives an original outline your office can adapt and suggests how to roll it out. It is a practical starting point, not legal advice. Have a lawyer familiar with your state review the final version before patients sign it.</p>

<h2>Why every dental office needs a written financial policy</h2>
<ul>
<li><strong>Consistency.</strong> Every patient gets the same rules, and staff can point to the document instead of improvising.</li>
<li><strong>Fewer disputes.</strong> A patient who signed a policy explaining that insurance estimates can change is less likely to dispute a balance.</li>
<li><strong>Faster collections.</strong> Clear rules on payment at the time of service reduce the balances that ever need a statement.</li>
<li><strong>Training.</strong> New hires learn the office's billing rules from one document.</li>
</ul>

<h2>What a dental financial policy should cover</h2>
<p>Most policies address the same core topics. The detail inside each one is a practice decision.</p>
<table>
<thead><tr><th>Topic</th><th>The question it answers</th></tr></thead>
<tbody>
<tr><td>Payment at time of service</td><td>What does the patient pay before leaving?</td></tr>
<tr><td>Insurance</td><td>Which plans does the office file, and who is responsible if the plan pays less?</td></tr>
<tr><td>Estimates</td><td>How are patient portions estimated, and what happens when the EOB differs?</td></tr>
<tr><td>Payment options</td><td>Which methods are accepted, and are payment plans available?</td></tr>
<tr><td>Balances and statements</td><td>When are statements sent, and what happens if a balance goes unpaid?</td></tr>
<tr><td>Minors and guarantors</td><td>Who is responsible for a child's balance?</td></tr>
<tr><td>Credit balances and refunds</td><td>How and when are overpayments returned?</td></tr>
<tr><td>Appointments</td><td>What is the policy on missed appointments and late cancellations?</td></tr>
</tbody>
</table>

<h2>An original outline you can adapt</h2>
<p>Use the outline below as a framework. Replace the bracketed items with your own decisions.</p>

<h3>1. Purpose</h3>
<p>One or two sentences explaining that the policy helps patients understand their financial responsibility and helps the office provide care without billing surprises.</p>

<h3>2. Payment at the time of service</h3>
<ul>
<li>The estimated patient portion is due at each visit.</li>
<li>Accepted methods: [cash, check, debit and credit cards, online payment, other].</li>
<li>Patients without insurance pay [in full at the visit / according to the treatment agreement].</li>
</ul>

<h3>3. Dental insurance</h3>
<ul>
<li>The office files claims with [in-network plans / all plans] as a service to the patient.</li>
<li>Insurance is a contract between the patient and the plan. The patient is responsible for amounts the plan does not pay, within the limits of any network contract the office holds.</li>
<li>Patients must provide current insurance information and tell the office when it changes.</li>
<li>The office files with a secondary plan when the patient provides complete information.</li>
</ul>

<h3>4. Estimates</h3>
<ul>
<li>Estimates are based on benefits reported by the plan and are not a promise of payment.</li>
<li>If the plan pays less than estimated, the patient will receive a statement. If the patient paid more than owed, the office will refund the credit.</li>
<li>For larger treatment, the office may request a pre-treatment estimate from the plan before scheduling.</li>
<li>Uninsured and self-pay patients receive a Good Faith Estimate as federal rules require.</li>
</ul>

<h3>5. Payment plans and financing</h3>
<ul>
<li>Payment plans are available for treatment above [amount], with [down payment] and terms set out in a separate written agreement.</li>
<li>Third-party financing [is / is not] offered. The lender's terms apply to any financing agreement.</li>
</ul>

<h3>6. Statements and unpaid balances</h3>
<ul>
<li>Statements are sent [monthly] after insurance has processed.</li>
<li>Balances are due within [number] days of the statement date.</li>
<li>Balances unpaid after [number] days may be [placed on a payment plan / referred to an outside agency / other], following notice to the patient.</li>
</ul>

<h3>7. Minors and guarantors</h3>
<ul>
<li>The adult who brings a minor to the appointment, or the designated guarantor, is responsible for payment.</li>
<li>The office does not resolve financial arrangements between separated or divorced parents.</li>
</ul>

<h3>8. Credit balances and refunds</h3>
<ul>
<li>Credit balances are refunded within [number] days of being identified, unless the patient asks to apply them to scheduled treatment.</li>
</ul>

<h3>9. Missed appointments</h3>
<ul>
<li>[Your policy on notice periods and any fee, if allowed.]</li>
</ul>

<h3>10. Communication preferences</h3>
<ul>
<li>How the office sends statements and reminders: [mail, email, patient portal, text].</li>
<li>How patients can choose or change their preferred method, and how they can opt out of text reminders.</li>
</ul>

<h3>11. Acknowledgment</h3>
<p>Signature and date lines for the patient or guarantor, and a note that the office will provide a copy on request.</p>

<h2>Topics that need extra care</h2>
<ul>
<li><strong>Noncovered services.</strong> Many states have laws that limit how dental plans set fees for services the plan does not cover. Know your state's rule before writing how noncovered services are billed.</li>
<li><strong>Medicaid and other public programs.</strong> Program rules often restrict what you may charge enrolled patients, including for missed appointments. Check your state program's rules.</li>
<li><strong>Card surcharges and fees.</strong> State law and card network rules govern surcharges, returned check fees and late fees.</li>
<li><strong>Collections.</strong> Federal and state debt collection rules apply to outside agencies, and some states add requirements for health care providers.</li>
<li><strong>Unclaimed credit balances.</strong> State unclaimed property laws may apply to refunds you cannot deliver.</li>
</ul>
<p>These are exactly the areas where a legal review pays for itself.</p>

<h2>Common gaps in existing policies</h2>
<p>When offices review an older policy, the same gaps show up again and again:</p>
<ul>
<li><strong>The policy and the practice disagree.</strong> The document says payment is due at the visit, but the front desk routinely lets patients wait for the EOB. Either change the habit or change the policy.</li>
<li><strong>No rule for estimate differences.</strong> Patients are surprised by balances because nothing they signed explained that estimates can change.</li>
<li><strong>Secondary insurance left vague.</strong> The policy does not say whether the office files secondary claims or what the patient owes while the secondary is pending.</li>
<li><strong>No refund timeline.</strong> Credit balances sit on accounts for months because nobody owns the decision.</li>
<li><strong>Old payment methods.</strong> The policy still lists options the office no longer accepts, or omits online payment.</li>
</ul>

<h2>Rolling the policy out</h2>
<ol>
<li>Draft the policy using your actual practices, not aspirational ones.</li>
<li>Have it reviewed by a lawyer familiar with dental practices in your state.</li>
<li>Train the whole front desk and treatment coordinators on the policy and the reasons behind it.</li>
<li>Have new patients sign it at the first visit, and existing patients at their next visit.</li>
<li>Store the signed copy in the patient record in your practice software.</li>
<li>Review the policy every year, or sooner when laws, contracts or software change.</li>
</ol>
<p>Your policy should match the processes behind it. Estimates are covered in our <a href="/blog/dental-patient-cost-estimates/">patient cost estimate guide</a>, statement timing in <a href="/blog/dental-patient-statements/">dental patient statements</a> and plan terms in <a href="/blog/dental-payment-plans-for-patients/">payment plans for patients</a>. If you are considering an in-office membership plan for uninsured patients, read <a href="/blog/in-house-dental-membership-plans/">in-house dental membership plans</a> before adding it to the policy.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>We do not write legal documents, but we do help practices run the processes a financial policy describes. Our <a href="/services/patient-billing/">Patient Billing &amp; Collections Support</a> service processes statements and reviews balances on the cycle your policy sets, our Insurance Verification &amp; Eligibility service prepares patient responsibility estimates, and our Payment Posting service keeps credits and write-offs accurate so refunds and balances follow the policy. <a href="/consultation/">Book a free consultation</a> to talk through how your policy and your billing workflow line up.</p>
`,
    faqs: [
      {
        q: 'What should a dental office financial policy include?',
        a: 'It should cover payment at the time of service, how insurance is handled, how estimates work, accepted payment methods and plans, statements and unpaid balances, minors and guarantors, credit balance refunds and missed appointments. It should end with a signed acknowledgment.',
      },
      {
        q: 'Does a dental financial policy need a legal review?',
        a: 'Yes, a lawyer familiar with your state should review it before patients sign it. Fees, surcharges, collections, Medicaid rules and noncovered services laws vary by state and can make a policy term unenforceable.',
      },
      {
        q: 'Who is responsible for a minor\'s dental bill?',
        a: 'Most dental financial policies make the adult who brings the child, or the designated guarantor, responsible for payment. The office usually states that it does not resolve financial arrangements between separated or divorced parents.',
      },
      {
        q: 'How often should we update our financial policy?',
        a: 'Review it at least once a year and whenever your network contracts, software, payment options or applicable laws change. Have patients sign the updated version at their next visit.',
      },
    ],
    sources: [S.adaNoncovered, S.adaIntroBenefits, S.adaCob, S.cmsGfe, S.ecfrGfe],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-payment-plans-for-patients',
    title: 'Dental Payment Plans for Patients: In-Office and Financing Options',
    seoTitle: 'Dental Payment Plans: In-Office Plans vs Financing',
    metaDescription:
      'How dental offices set up in-office payment plans, what to weigh before offering third-party financing, and the state and federal rules to check first.',
    excerpt:
      'Payment plans help patients accept treatment they cannot pay for in one visit. Here is how to design in-office terms, what to consider with outside financing and where compliance rules come in.',
    category: 'Practice Management',
    tags: ['payment plans', 'patient financing', 'patient billing', 'case acceptance'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Many patients agree that they need a crown, an implant or periodontal treatment and still say no because the patient portion is due all at once. Payment options can close that gap, but a loosely managed plan can also turn into a balance the practice never collects.</p>

<p>This guide compares in-office payment plans with third-party financing, shows how to design in-office terms and lists the compliance questions to settle before you offer either one.</p>

<h2>Three ways patients spread out the cost</h2>
<table>
<thead><tr><th>Option</th><th>Who carries the risk</th><th>What the practice manages</th></tr></thead>
<tbody>
<tr><td>In-office payment plan</td><td>The practice</td><td>The agreement, the schedule, payment posting and follow-up</td></tr>
<tr><td>Third-party financing</td><td>Usually the lender, depending on the agreement</td><td>The application process, the funding deposit and any merchant fees</td></tr>
<tr><td>In-office membership plan</td><td>The practice</td><td>A different product: a yearly fee for preventive care and discounts, not a way to pay for a specific treatment plan</td></tr>
</tbody>
</table>
<p>Membership plans are often confused with payment plans. If that model interests you, see <a href="/blog/in-house-dental-membership-plans/">in-house dental membership plans</a>.</p>

<h2>When an in-office payment plan makes sense</h2>
<ul>
<li>The patient is established and has a good payment history with the practice.</li>
<li>The balance is moderate and the term is short, so the practice is not acting as a long-term lender.</li>
<li>The patient may not qualify for, or does not want, outside financing.</li>
<li>Treatment happens in phases, and payments can line up with each phase.</li>
</ul>
<p>An in-office plan is a weaker fit for new patients with large balances, long terms, or treatment that is completed in one visit before most of the money is collected.</p>

<h2>Designing in-office payment plan terms</h2>
<p>Write the terms down and use them for every patient, so plans are not negotiated one by one at the front desk.</p>
<ul>
<li><strong>Minimum balance.</strong> Offer plans only above a set patient portion.</li>
<li><strong>Down payment.</strong> Collect a meaningful share before treatment starts.</li>
<li><strong>Term length.</strong> Keep terms short and fixed.</li>
<li><strong>Automatic payments.</strong> Card-on-file or bank draft payments are easier to manage than mailed checks. Store card data only through a payment processor that handles it securely.</li>
<li><strong>Insurance adjustments.</strong> State how the plan changes when the EOB differs from the estimate.</li>
<li><strong>Missed payments.</strong> State what happens after a missed payment and how much notice the patient gets.</li>
<li><strong>Treatment sequencing.</strong> Decide whether later phases wait until earlier phases are paid.</li>
</ul>

<h3>Worked example (hypothetical numbers)</h3>
<p>A patient's estimated portion for a treatment plan is $3,600. The office's written terms call for 25 percent down and the rest over six months with automatic payments.</p>
<table>
<thead><tr><th>Step</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Estimated patient portion</td><td>$3,600</td></tr>
<tr><td>Down payment at 25 percent</td><td>$900</td></tr>
<tr><td>Remaining balance</td><td>$2,700</td></tr>
<tr><td>Six monthly payments</td><td>$450 each</td></tr>
</tbody>
</table>
<p>Suppose the carrier pays $200 less than estimated. Under the written terms, the office either adds $200 to the final payment or spreads it over the remaining months, and sends the patient an updated schedule. These numbers are hypothetical and only show the mechanics. Accurate estimates matter here, because the plan is built on them; see <a href="/blog/dental-patient-cost-estimates/">dental patient cost estimates</a>.</p>

<h2>Setting up and tracking the plan</h2>
<ol>
<li>Present the estimate and plan terms together, in writing.</li>
<li>Have the patient sign the payment plan agreement before treatment begins.</li>
<li>Create the plan in your practice software. Open Dental, Dentrix and Eaglesoft each include payment plan tools.</li>
<li>Post each payment to the plan so the schedule, the account balance and statements agree.</li>
<li>Review plans that are past due every month and follow your written steps.</li>
</ol>
<h3>Recording third-party financing in the ledger</h3>
<p>Financing deposits are a frequent source of ledger errors. The lender usually funds the practice the financed amount minus its fee, in a single deposit that may cover several patients. Post the full financed amount as a payment on each patient's account, then record the lender's fee as the adjustment type your accountant chooses, so the patient's balance is correct and the fee is visible in your reports. Posting only the net deposit leaves small false balances on every financed account, and those balances later turn into confusing statements.</p>
<h3>Warning signs on existing plans</h3>
<ul>
<li>Plans with no signed agreement in the patient record</li>
<li>Plans whose schedule in the software no longer matches the account balance</li>
<li>Automatic payments that failed and were never retried or followed up</li>
<li>Plans created for treatment that was never completed</li>
<li>Patients on more than one open plan at the same time</li>
</ul>
<p>A short monthly review of these items keeps a payment plan program from quietly becoming old patient A/R.</p>

<h2>Third-party financing: what to weigh</h2>
<p>Outside patient financing moves the credit decision and the collection risk away from the practice, but it has trade-offs to understand before you sign a merchant agreement:</p>
<ul>
<li><strong>Cost to the practice.</strong> Many programs charge the practice a fee or discount on each financed amount. Know how it is calculated and how it is posted in your ledger.</li>
<li><strong>Patient terms.</strong> Promotional offers can carry interest that applies later if conditions are not met. Patients should get the terms from the lender, not a summary from your front desk.</li>
<li><strong>Staff role.</strong> Your team should explain that financing exists and how to apply. They should not advise patients on whether to borrow or which terms to pick.</li>
<li><strong>Refunds and changes.</strong> Find out what happens if treatment changes or the patient cancels after funding.</li>
<li><strong>Recourse.</strong> Read whether the lender can come back to the practice for any part of the loan.</li>
</ul>

<h2>Compliance: check the rules before you start</h2>
<p>Payment plans and financing touch consumer credit rules at the federal and state level. This is a list of questions for your lawyer and accountant, not legal advice:</p>
<ul>
<li><strong>Interest and fees.</strong> Charging interest or finance charges on an in-office plan, or setting up installment agreements beyond a certain number of payments, can trigger federal Truth in Lending disclosure duties. State lending, licensing and usury laws may also apply.</li>
<li><strong>Late fees.</strong> State law may limit late fees and how they must be disclosed.</li>
<li><strong>Payment reminders by text or automated call.</strong> Federal rules set consent requirements for certain automated calls and texts, and patients can revoke consent.</li>
<li><strong>Card data.</strong> Card network rules govern how stored card data is protected and whether surcharges are allowed.</li>
<li><strong>Collections.</strong> Debt collection rules apply if a past-due plan goes to an outside agency.</li>
<li><strong>Public programs.</strong> Medicaid and other program rules may limit what you can charge enrolled patients at all.</li>
</ul>
<p>Put your final terms in your <a href="/blog/dental-office-financial-policy/">dental office financial policy</a> so every patient hears the same rules.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/patient-billing/">Patient Billing &amp; Collections Support</a> service handles payment allocation, patient balance review and statements for accounts on payment plans, working inside your own software and following your written terms. We do not phone patients, and we do not arrange or recommend financing. Our Payment Posting service keeps plan payments, financing deposits and insurance adjustments posted accurately. For other ways patients can pay, see our <a href="/blog/patient-payment-options-text-to-pay/">patient payment options</a> article, or <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'Should a dental office offer in-office payment plans?',
        a: 'Many offices do, for established patients with moderate balances and short terms. Use written terms with a minimum balance, a down payment, automatic payments and clear rules for missed payments, and apply them the same way to every patient.',
      },
      {
        q: 'What is the difference between a payment plan and a dental membership plan?',
        a: 'A payment plan spreads the cost of a specific treatment plan over time. A membership plan is a yearly fee that covers preventive care and discounts for patients without insurance, and it is not a way to finance a particular treatment.',
      },
      {
        q: 'Can a dental office charge interest on a payment plan?',
        a: 'It may be possible, but it brings consumer credit rules into play. Charging interest or offering longer installment agreements can trigger federal Truth in Lending disclosures and state lending or usury laws, so check with a lawyer first.',
      },
      {
        q: 'Who explains third-party financing terms to the patient?',
        a: 'The lender should provide the financing terms directly. Your team can explain that financing is available and how to apply, but should not advise patients on whether to borrow.',
      },
    ],
    sources: [S.adaInOffice, S.fccRobocalls, S.ecfrTcpa],
  },
];
