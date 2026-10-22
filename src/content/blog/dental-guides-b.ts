/**
 * Dental RCM guides, batch B (2026-10-22). Original content. Rules: docs/DENTAL-WRITING.md.
 * Sources are limited to URLs already verified elsewhere in this repo.
 */
import type { SeedPost } from './seed';

const S = {
  adaRejections: {
    label: 'ADA: Responding to Claim Rejections',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/responding-to-claim-rejections.pdf',
  },
  adaDelays: { label: 'ADA: Claims Processing Delays', url: 'https://www.ada.org/resources/practice/dental-insurance/claims-processing-delays' },
  adaClaimInstructions: {
    label: 'ADA: ADA Dental Claim Form Completion Instructions (Version 2024)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/2024_completioninstructions_adaclaimform_2024.pdf',
  },
  x12StatusCategory: { label: 'X12: Claim Status Category Codes', url: 'https://x12.org/codes/claim-status-category-codes' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  ecfrClaims: {
    label: 'eCFR: 45 CFR 162.1102, Standards for health care claims (includes the dental 837)',
    url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-162/subpart-K/section-162.1102',
  },
  deltaArHandbook: {
    label: 'Delta Dental of Arkansas: Dentist Handbook, January 2023 (national processing policies, PDF)',
    url: 'https://www.deltadentalar.com/docs/default-source/dot-documents/delta-dental-dentist-handbook-2023v2.pdf',
  },
  waHcaDental: {
    label: 'Washington State Health Care Authority: Dental-Related Services Program Billing Guide (October 2025)',
    url: 'https://www.hca.wa.gov/assets/billers-and-providers/dental-related-serv-bg-20251001.pdf',
  },
  deltaXray: { label: 'Delta Dental: X-ray Claim Tips', url: 'https://www1.deltadentalins.com/dentists/fyi-online/2022/x-ray-claim-tips.html' },
  deltaIdahoDocs: {
    label: 'Delta Dental of Idaho: Documentation Guidelines (Claim Attachment Requirements)',
    url: 'https://www.deltadentalid.com/content/dam/member-companies/idaho/docs/Claim%20Attachment%20Requirements.pdf',
  },
};

export const dentalGuidesB: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-claim-rejections-vs-denials',
    title: 'Dental Claim Rejections vs Denials: What Each Means and What to Do',
    seoTitle: 'Dental Claim Rejections vs Denials: How to Work Each',
    metaDescription:
      'A rejected dental claim never reached adjudication; a denied one did. Learn how to tell them apart, where each shows up and the right fix for each type.',
    excerpt:
      'Rejections and denials look alike on a busy day, but they need different fixes. Here is how to tell them apart and a simple workflow for each.',
    category: 'Denial Management',
    tags: ['claim rejections', 'claim denials', 'clearinghouse', 'dental claims', 'resubmission'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Dental offices often use "rejected" and "denied" as if they mean the same thing, but they describe two different events in the life of a claim. A <strong>rejection</strong> means the claim was stopped before the carrier ever adjudicated it. A <strong>denial</strong> means the carrier processed the claim and decided not to pay all or part of it.</p>

<p>The difference matters because the fix is different. A rejected claim is usually corrected and sent again as if it were new. A denied claim needs a corrected claim, a reconsideration or an appeal. Treating one like the other wastes days and can push a claim past the carrier's filing limit.</p>

<h2>What is a dental claim rejection?</h2>
<p>A rejection happens at the front end of the claim's trip. After your team sends a claim from Open Dental, Dentrix or Eaglesoft, it passes through your clearinghouse and then into the carrier's intake system. Either stop can refuse the claim because something is missing, invalid or unreadable. The claim never reaches a claims examiner, so it is never "in process."</p>
<p>Common causes of dental claim rejections include:</p>
<ul>
<li>Subscriber ID, date of birth or name that does not match the carrier's enrollment file.</li>
<li>Missing or invalid billing or treating provider NPI, or a tax ID that does not match the provider record.</li>
<li>Wrong payer ID, so the claim was routed to a carrier that does not cover the patient.</li>
<li>Missing tooth number or surface where the procedure requires one.</li>
<li>Invalid or deleted CDT code, often after the annual code update.</li>
<li>Date of service in the future, or a claim that duplicates one already on file.</li>
</ul>
<p>The ADA describes rejections as claims returned for missing or incorrect information, and its guidance on responding to them makes the same point this article does: fix the data and send it again promptly.</p>

<h2>What is a dental claim denial?</h2>
<p>A denial happens after adjudication. The carrier accepted the claim, ran it against the patient's plan and decided that a procedure is not payable. You learn about it on the EOB or ERA, usually with a Claim Adjustment Reason Code and often a remark code explaining why.</p>
<p>Typical dental denials include frequency limits already met, a waiting period that has not ended, the annual maximum used up, missing x-rays or a narrative, a service the plan does not cover, or a downgrade under an alternate benefit provision. Some of these can be overturned with documentation; others are correct under the plan and become patient responsibility. Our guide to <a href="/blog/dental-carc-rarc-denial-codes/">dental CARC and RARC denial codes</a> explains how to read those codes.</p>

<h2>Rejection vs denial at a glance</h2>
<table>
<thead><tr><th></th><th>Rejection</th><th>Denial</th></tr></thead>
<tbody>
<tr><td>When it happens</td><td>Before adjudication</td><td>After adjudication</td></tr>
<tr><td>Where you see it</td><td>Clearinghouse report or carrier acknowledgment</td><td>EOB or ERA</td></tr>
<tr><td>Typical cause</td><td>Data errors, format problems, eligibility mismatch</td><td>Plan rules, documentation, coverage</td></tr>
<tr><td>Is it on file with the carrier?</td><td>Usually not as a processed claim</td><td>Yes, with a claim number</td></tr>
<tr><td>Usual fix</td><td>Correct and resubmit as a new claim</td><td>Corrected claim, reconsideration or appeal</td></tr>
<tr><td>Main risk</td><td>Nobody notices it, so it ages silently</td><td>Writing off money that could be recovered</td></tr>
</tbody>
</table>

<h2>Where rejections hide</h2>
<p>The biggest danger with rejections is that they are quiet. A denied claim produces paper or an ERA that someone has to post. A rejected claim may only appear on a clearinghouse report that nobody opened. In the practice software it can still show as "sent," and it sits in the insurance aging until someone calls the carrier and learns there is no claim on file.</p>
<p>Electronic claims usually produce two kinds of acknowledgments. The first confirms the clearinghouse received the file and checked its basic structure. The second comes from the carrier and says whether the claim was accepted into its system. Carrier acknowledgments use standard claim status category codes published by X12; the acknowledgment categories tell you whether a claim was accepted, returned as unprocessable or rejected for invalid information. A claim that never gets a carrier acceptance should be treated as not filed.</p>

<h2>How to work a rejected dental claim</h2>
<ol>
<li><strong>Check rejection reports every business day.</strong> Open the clearinghouse report and the carrier acknowledgments, not just the practice software claim list.</li>
<li><strong>Read the exact error.</strong> Most reports name the field: subscriber ID, NPI, tooth number, payer ID. Fix that field and look for related errors on the same claim.</li>
<li><strong>Fix the source record.</strong> If the patient's insurance ID was wrong, correct it in the patient's insurance plan record in the software, not just on this claim, so the next claim goes out clean.</li>
<li><strong>Resubmit as an original claim.</strong> Because the carrier never adjudicated it, a rejected claim is normally sent again as a new submission, not as a corrected claim.</li>
<li><strong>Confirm acceptance.</strong> Watch for the carrier acknowledgment on the resubmission. Only then move the claim into your normal follow-up queue.</li>
<li><strong>Log the cause.</strong> Track rejection reasons by category each month. Repeated eligibility or NPI errors point to a front desk or setup problem worth fixing once.</li>
</ol>

<h2>How to work a denied dental claim</h2>
<ol>
<li><strong>Post the denial.</strong> Record the zero or partial payment and the reason codes so the balance does not sit unexplained.</li>
<li><strong>Decide whether the denial is correct.</strong> Compare it with the benefits that were verified before treatment. If the plan really excludes the service or the maximum is used, the balance usually moves to the patient under your financial policy.</li>
<li><strong>If the claim was wrong, send a corrected claim.</strong> A wrong tooth number, surface or code on a processed claim is fixed with a replacement claim that references the original claim number. See our guide to <a href="/blog/dental-corrected-claims/">dental corrected claims</a>.</li>
<li><strong>If documentation was missing, send it.</strong> Many carriers let you attach x-rays, perio charts or a narrative to the existing claim rather than appeal. See <a href="/blog/dental-claim-attachments/">dental claim attachments</a>.</li>
<li><strong>If you disagree with the decision, appeal.</strong> Follow the carrier's appeal process and deadline, as covered in <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a>.</li>
</ol>

<h2>A hypothetical week of claims</h2>
<p>Hypothetical example: an office sends 120 claims in one week. Six are rejected: four for subscriber ID mismatches on a single employer group, one for a missing tooth number and one for an outdated payer ID. Four claims are denied later: two for frequency on bitewings, one for a missing perio chart and one for a crown replaced inside the plan's replacement window.</p>
<p>The six rejections are fixed and resubmitted the same day, and the four ID errors lead the front desk to update that employer group's records. Of the denials, the perio chart is attached to the existing claim, the bitewing denials are checked against the verification notes, and the crown denial gets a narrative with the prior placement date for a reconsideration. Two different problems, two different workflows. The <a href="/tools/clean-claim-rate-calculator/">clean claim rate calculator</a> can help you track how many claims get through on the first try.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service includes rejected claim resubmission and daily review of clearinghouse reports inside your own systems, and our <a href="/services/denial-management/">Denial Management & Appeals</a> service handles corrected claims, reconsiderations and root-cause tracking. To talk through how rejections and denials are handled in your office today, <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'What is the difference between a rejected and a denied dental claim?',
        a: 'A rejected claim was stopped before the carrier adjudicated it, usually for missing or invalid data. A denied claim was processed by the carrier, which then decided not to pay all or part of it under the plan.',
      },
      {
        q: 'Do I send a corrected claim for a rejection?',
        a: 'Usually not. Because a rejected claim was never adjudicated, you normally fix the error and resubmit it as a new original claim. Corrected claims are for claims the carrier has already processed.',
      },
      {
        q: 'Where do I find rejected dental claims?',
        a: 'Rejections show up on clearinghouse reports and carrier acknowledgments, not on EOBs. Check those reports every business day, because the practice software may still show a rejected claim as sent.',
      },
      {
        q: 'Does a rejection stop the timely filing clock?',
        a: 'Generally no. A rejected claim usually does not count as filed, so the original filing deadline still applies. Fix and resubmit rejections quickly and keep proof of every submission and acknowledgment.',
      },
    ],
    sources: [S.adaRejections, S.x12StatusCategory, S.x12Carc, S.adaDelays],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-corrected-claims',
    title: 'Dental Corrected Claims: Replacements, Voids and Resubmissions',
    seoTitle: 'Dental Corrected Claims: Replace, Void or Resubmit',
    metaDescription:
      'When to send a corrected dental claim, when to void and when to resubmit, how replacement claims reference the original, and how to avoid duplicate denials.',
    excerpt:
      'A practical guide to fixing dental claims after they leave the office: corrected (replacement) claims, voids and plain resubmissions, and when each one is right.',
    category: 'Denial Management',
    tags: ['corrected claims', 'void claims', 'resubmission', 'dental claims', 'duplicate denials'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Every dental office sends claims that need fixing after the fact: a wrong tooth number, a missed surface, the wrong treating dentist or a procedure that belonged on a different date. How you fix the claim matters as much as what you fix. Send the change the wrong way and the carrier may deny it as a duplicate or pay twice and ask for the money back later.</p>

<p>This guide explains the three tools you have, a corrected (replacement) claim, a void and a fresh resubmission, and when to use each one on dental claims.</p>

<h2>Three ways to fix a dental claim</h2>
<table>
<thead><tr><th>Tool</th><th>Use it when</th><th>What the carrier does</th></tr></thead>
<tbody>
<tr><td>Resubmission (new original claim)</td><td>The claim was rejected and never adjudicated</td><td>Treats it as a first-time claim</td></tr>
<tr><td>Corrected (replacement) claim</td><td>The claim was processed but contained an error</td><td>Replaces the original claim and reprocesses it</td></tr>
<tr><td>Void (cancel)</td><td>The claim should never have been sent, or went to the wrong carrier or patient</td><td>Cancels the original claim and recovers any payment</td></tr>
</tbody>
</table>
<p>The key question is whether the carrier has already processed the claim. If you have an EOB, ERA or carrier claim number, the claim exists in the carrier's system, and sending a brand new claim for the same services will usually be denied as a duplicate.</p>

<h2>How corrected claims work on electronic dental claims</h2>
<p>Electronic dental claims use the X12 837 dental transaction, which federal rules name as the standard for dental claims. Inside that transaction, each claim carries a frequency code. An original claim is sent as a first submission. A replacement claim uses a different frequency code and must include the carrier's claim number from the original claim so the carrier knows which claim to replace. A void uses its own frequency code and the same original claim number.</p>
<p>Your practice software and clearinghouse handle the codes for you, but someone still has to choose the right option and enter the original claim number. In Open Dental, Dentrix and Eaglesoft, that usually means opening the original claim, choosing the corrected or replacement option the software offers, and entering the carrier's claim number from the EOB or ERA. If the original claim number is missing, many carriers will process the "corrected" claim as a new one and deny it as a duplicate.</p>
<p>On a paper ADA claim form, follow the carrier's instructions for marking a claim as corrected. Some carriers want a note in the Remarks field with the original claim number and a short description of what changed. The ADA's completion instructions describe what belongs in each field.</p>

<h2>When to send a corrected dental claim</h2>
<ul>
<li>Wrong tooth number, quadrant, arch or surface on a processed procedure.</li>
<li>Wrong CDT code, for example a code from the wrong category that the chart does not support. Make sure the chart supports the new code before you send the correction.</li>
<li>Wrong treating or billing provider, or the wrong location.</li>
<li>Wrong date of service, such as a crown billed on the prep date when the carrier pays on the seat date.</li>
<li>A procedure left off a claim for a visit that was already processed, if the carrier wants it added to the same claim rather than billed separately.</li>
<li>Coordination of benefits changes, when the primary and secondary carriers were reversed.</li>
</ul>

<h2>When to void a dental claim</h2>
<ul>
<li>The claim went to the wrong carrier or under the wrong patient or subscriber.</li>
<li>The treatment was billed but not done, for example a scheduled procedure that was charted in error.</li>
<li>The claim was sent twice and both copies were processed.</li>
</ul>
<p>After a void, the carrier may take back any payment, often by offsetting it from a future payment. Make sure your team posts that recovery correctly so the account and the deposit reconcile. If a correct claim still needs to go to the right carrier, send it as a new original claim after the void.</p>

<h2>When a corrected claim is the wrong tool</h2>
<p>Corrected claims fix errors in what was billed. They are not the right path when the carrier processed an accurate claim and you disagree with the decision. A frequency denial, a downgrade or a clinical necessity determination on a correctly billed crown calls for a reconsideration or appeal with documentation, as described in <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a>. If a claim was rejected and never processed, a corrected claim is also wrong; fix and resubmit it as an original, as explained in <a href="/blog/dental-claim-rejections-vs-denials/">dental claim rejections vs denials</a>.</p>

<h2>A step-by-step corrected claim workflow</h2>
<ol>
<li><strong>Confirm the error against the chart.</strong> The clinical record is the source of truth. If the chart is wrong, the treating dentist corrects it first, following your office's chart correction policy.</li>
<li><strong>Pull the original claim number</strong> from the EOB, ERA or carrier portal.</li>
<li><strong>Choose the right option:</strong> replacement for a processed claim with an error, void for a claim that should not exist, new original for a rejection.</li>
<li><strong>Change only what was wrong.</strong> A replacement claim should repeat every line that was correct, plus the fixed line. Leaving correct lines off can cause the carrier to reverse payment for them.</li>
<li><strong>Add a short note</strong> in the claim remarks: what changed and why, in one or two sentences.</li>
<li><strong>Attach documentation</strong> if the change affects coverage, such as a new tooth number on a crown claim.</li>
<li><strong>Record the date sent</strong> and keep the acknowledgment, because many carriers set a deadline for corrections.</li>
<li><strong>Follow up</strong> in your normal insurance aging cycle and confirm the corrected EOB matches what you expected.</li>
</ol>

<h2>A hypothetical corrected claim</h2>
<p>Hypothetical example: a claim for a crown on tooth 30 is paid at $600. A week later, the dentist notices the crown was actually placed on tooth 31. The office sends a replacement claim with tooth 31, the original claim number and a note reading "Tooth number corrected from 30 to 31, chart updated." The carrier reprocesses the claim. If tooth 31 has no prior crown in the replacement window, the payment may stay the same. If it does, the carrier may reverse the $600 and the office has to address the new determination. Either way, the record now matches what happened.</p>
<p>Without the original claim number, the same correction might have been processed as a second crown claim on the same date and denied as a duplicate, leaving the error in place.</p>

<h2>Track corrections to prevent the next one</h2>
<p>Every corrected claim is a sign that something upstream went wrong. Track corrections by reason each month: tooth numbers, provider errors, dates, codes. A cluster of provider errors may mean a new associate was not set up correctly in the software. A cluster of seat date corrections may mean the team is posting crowns at the prep appointment. Fixing the cause is cheaper than fixing claims. The <a href="/tools/claim-submission-checklist/">claim submission checklist</a> covers the checks that catch most of these before a claim goes out.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/denial-management/">Denial Management & Appeals</a> service includes corrected claims submission, and our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service covers claim attachments and corrections inside your own practice software. If corrected claims are piling up, <a href="/consultation/">book a free consultation</a> and we can look at where they start.</p>
`,
    faqs: [
      {
        q: 'What is a corrected dental claim?',
        a: 'A corrected dental claim, also called a replacement claim, replaces a claim the carrier has already processed. It carries the original claim number so the carrier reprocesses the existing claim instead of treating the correction as a new one.',
      },
      {
        q: 'Why was my corrected claim denied as a duplicate?',
        a: 'Most often because it was sent as a new original claim or without the original claim number. The carrier then sees two claims for the same patient, date and procedure and denies the second one.',
      },
      {
        q: 'Should I void a claim or correct it?',
        a: 'Correct it when the claim belongs with that carrier and patient but contains an error. Void it when the claim should not exist at all, such as one sent to the wrong carrier or for treatment that was not done.',
      },
      {
        q: 'Is there a deadline for corrected claims?',
        a: 'Often yes. Many carriers set a time limit for corrections and reprocessing, and the limit varies by carrier and plan, so check the carrier\'s provider manual and keep proof of when you sent the correction.',
      },
    ],
    sources: [S.ecfrClaims, S.adaClaimInstructions, S.x12Carc, S.adaRejections],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-timely-filing-limits',
    title: 'Dental Timely Filing Limits: How to Track Them and Prove Them',
    seoTitle: 'Dental Timely Filing Limits: Track and Prove Them',
    metaDescription:
      'Timely filing limits for dental claims vary by carrier, plan and state. Learn how to find each limit, track deadlines and prove timely filing when challenged.',
    excerpt:
      'Every dental carrier sets its own deadline for claims, corrections and appeals. Here is how to find those limits, track them and prove you met them.',
    category: 'Denial Management',
    tags: ['timely filing', 'dental claims', 'appeals', 'claim follow-up', 'insurance aging'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>A timely filing denial is one of the most painful denials in dental billing because the treatment was done and often covered, yet the claim is no longer payable. Once a carrier's deadline passes, most practices cannot bill the patient for the balance either, depending on the network contract.</p>

<p>There is no single timely filing limit for dental claims. Deadlines vary by carrier, by plan, by line of business and sometimes by state law. This guide explains the deadlines that matter, where to find them and how to build a system that tracks them and proves you met them.</p>

<h2>What a timely filing limit is</h2>
<p>A timely filing limit is the maximum time a carrier allows between a date in the claim's life and the carrier receiving the claim. Usually the starting point is the date of service, but some deadlines run from another date, such as the date of a primary carrier's EOB for a secondary claim. If the claim arrives after the deadline, the carrier can deny it for that reason alone.</p>
<p>In most dental plans, the limit comes from the network agreement, the carrier's provider manual or handbook, or the plan document. Carrier handbooks typically describe their processing policies, including filing requirements. State Medicaid dental programs publish their own time limits in their billing guides, and those can differ from commercial plans in the same state.</p>

<h2>The deadlines that matter</h2>
<p>Most offices think only about the first claim, but several separate clocks can run on one claim:</p>
<ul>
<li><strong>Initial claim filing.</strong> The deadline for the carrier to receive the original claim.</li>
<li><strong>Secondary claims.</strong> The deadline for the secondary carrier, which may run from the primary carrier's payment date rather than the date of service.</li>
<li><strong>Corrected claims and reprocessing requests.</strong> Many carriers limit how long after the original decision you can send a correction.</li>
<li><strong>Requests for documentation.</strong> When a carrier asks for x-rays or a narrative, the request letter may set its own response window.</li>
<li><strong>Appeals.</strong> First-level and second-level appeals usually have deadlines that run from the date on the denial.</li>
</ul>
<p>Do not assume the limit you remember from one carrier applies to another, or that it stays the same each year. When a contract or provider manual is updated, the deadline can change.</p>

<h2>How to find each carrier's limit</h2>
<ol>
<li><strong>Check the network agreement</strong> for each carrier you participate with. Filing terms are often in the agreement itself or incorporated from the provider manual.</li>
<li><strong>Read the provider manual or handbook</strong> on the carrier's provider portal, and save a dated copy.</li>
<li><strong>For out-of-network claims,</strong> the limit usually comes from the patient's plan, so check the plan's terms or ask the carrier during verification.</li>
<li><strong>For Medicaid dental,</strong> read the state program's billing guide and any managed care organization's manual if the plan is administered by one.</li>
<li><strong>Record the limits in one place.</strong> A simple table by carrier with columns for initial claims, secondary claims, corrections and appeals, plus the source and date you checked it.</li>
</ol>
<p>Some states also have laws on how long insurers have to pay clean claims or how long they can take to recover overpayments. Those rules vary by state and by type of plan, so treat them as something to confirm rather than assume.</p>

<h2>How to track deadlines in daily work</h2>
<p>A carrier table is only useful if someone acts on it. The practical goal is simple: no claim should get close to its filing limit without a person looking at it.</p>
<ul>
<li><strong>Send claims the same day or the next business day.</strong> The fewer days a claim spends in the office, the more margin you have for rejections and corrections.</li>
<li><strong>Work rejections daily.</strong> A rejected claim usually does not count as filed. Our article on <a href="/blog/dental-claim-rejections-vs-denials/">rejections vs denials</a> explains why.</li>
<li><strong>Review the insurance aging report by date of service,</strong> not only by the date the claim was sent. Sort unpaid claims oldest first and flag any claim with no carrier acknowledgment. See our guide to the <a href="/blog/dental-insurance-aging-report/">dental insurance aging report</a>.</li>
<li><strong>Set follow-up dates in the software</strong> for every unpaid claim, earlier for carriers with shorter limits.</li>
<li><strong>Track secondary claims separately.</strong> They often wait on the primary EOB and are easy to forget.</li>
<li><strong>Put appeal due dates on a calendar</strong> the day a denial is posted.</li>
</ul>

<h2>How to prove timely filing</h2>
<p>When a carrier says a claim was late, the only thing that helps is proof that you sent it on time. Practice software usually shows the date a claim was created or marked sent, but that alone is often not enough. Carriers want evidence that the claim reached them or their clearinghouse.</p>
<p>Keep these records for every claim:</p>
<ul>
<li>The clearinghouse batch report showing the claim was sent and accepted by the clearinghouse.</li>
<li>The carrier acknowledgment showing the carrier accepted the claim into its system.</li>
<li>Any earlier rejection reports, with the date you fixed and resubmitted.</li>
<li>Portal screenshots or reference numbers from calls where a representative confirmed the claim was on file.</li>
<li>For paper claims, mailing records such as certified mail receipts.</li>
<li>For secondary claims, the primary EOB date and a copy of the EOB you sent with the claim.</li>
</ul>
<p>Many carriers accept a reconsideration of a timely filing denial when you can show a carrier acceptance dated inside the limit. A clearinghouse report alone may or may not be accepted, which is why the carrier acknowledgment matters.</p>

<h2>A hypothetical timeline</h2>
<p>Hypothetical example: a patient has a filling on March 3. The claim is sent on March 4 but rejected at the carrier for a subscriber ID mismatch. Nobody checks the report. In August the claim shows up in the 120+ column of the aging report, and a call to the carrier confirms there is no claim on file. The office resubmits on August 20.</p>
<p>If this carrier's limit had already passed, the office's only argument would be the March rejection report, and a rejection is usually not proof of timely filing. Now replay it with a daily rejection check: the ID is fixed on March 5, the carrier accepts the claim on March 6, and the acknowledgment is saved. If a timely filing question ever comes up, the office has the March 6 acceptance as proof.</p>

<h2>What to do with a timely filing denial</h2>
<ol>
<li>Confirm the limit that applies to this carrier and plan, and the date the clock started.</li>
<li>Gather your proof: acknowledgments, reports and call reference numbers.</li>
<li>If you have proof, send a reconsideration or appeal with it, following the carrier's process.</li>
<li>If you do not, check the network agreement before billing the patient, because many contracts bar billing members for claims denied as late.</li>
<li>Log the cause so the same gap does not happen again.</li>
</ol>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-accounts-receivable/">Accounts Receivable (A/R) Management</a> service includes 30/60/90+ day follow-up on outstanding insurance claims, and our <a href="/services/denial-management/">Denial Management & Appeals</a> service handles reconsiderations and appeals with the proof you need. <a href="/consultation/">Book a free consultation</a> to review how filing deadlines are tracked in your office.</p>
`,
    faqs: [
      {
        q: 'What is the timely filing limit for dental claims?',
        a: 'There is no single limit. Timely filing limits vary by carrier, plan, network agreement and state program, so check each carrier\'s agreement or provider manual and record the limit with the date you checked it.',
      },
      {
        q: 'Does a rejected claim count as timely filed?',
        a: 'Usually not. A rejected claim was not accepted into the carrier\'s system, so the original deadline keeps running. Fix and resubmit rejections quickly and save the carrier acknowledgment once it is accepted.',
      },
      {
        q: 'What is the best proof of timely filing?',
        a: 'A carrier acknowledgment showing the claim was accepted inside the filing limit is usually the strongest proof. Clearinghouse reports, portal records and call reference numbers support it.',
      },
      {
        q: 'Can we bill the patient if a claim is denied for timely filing?',
        a: 'Often not for in-network patients. Many network agreements prohibit billing members for claims denied as late, so read the contract before sending a statement.',
      },
    ],
    sources: [S.deltaArHandbook, S.waHcaDental, S.x12StatusCategory, S.adaDelays],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-claim-attachments',
    title: 'Dental Claim Attachments: X-Rays, Perio Charts, Photos and Narratives',
    seoTitle: 'Dental Claim Attachments: X-Rays, Perio Charts, Notes',
    metaDescription:
      'Which dental claims need x-rays, perio charts, photos or narratives, how electronic attachments link to claims, and a checklist to send before every claim.',
    excerpt:
      'Missing attachments are one of the most common reasons dental claims stall. Here is what to send, when to send it and how the electronic attachment workflow works.',
    category: 'Dental Billing',
    tags: ['claim attachments', 'dental x-rays', 'perio charts', 'narratives', 'dental claims'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Many dental claims are paid on the codes alone, but the procedures that cost the most often need proof. Crowns, buildups, scaling and root planing, surgical extractions, implants and many replacement procedures are commonly reviewed by a carrier's dental consultant, and that consultant decides based on what you attach.</p>

<p>When the attachment is missing, unclear or the wrong type, the claim is pended, denied or sent back with a request for more information. This guide covers which attachments carriers usually want, how electronic attachments work and a checklist your team can use before every claim goes out.</p>

<h2>The four main types of dental claim attachments</h2>
<h3>Radiographs</h3>
<p>X-rays are the most common attachment. For crowns and buildups, carriers usually want a recent pre-operative image that shows the tooth clearly. For periodontal procedures, they want images that show bone levels. Make sure the image is dated, labeled with the correct tooth or side and taken before treatment. A post-operative image alone usually cannot show why treatment was needed. Our guide to <a href="/blog/dental-x-ray-codes/">dental x-ray codes</a> covers how the images themselves are billed.</p>
<h3>Periodontal charts</h3>
<p>Scaling and root planing and other periodontal procedures usually require a full periodontal chart with pocket depths, and often bleeding points, recession and mobility. The chart should be dated close to the treatment date and show which teeth meet the plan's criteria in each quadrant.</p>
<h3>Intraoral photos</h3>
<p>Photos help when a radiograph cannot show the problem, such as a fractured cusp, a cracked tooth, a failing restoration margin or soft tissue findings. A clear photo with the tooth number noted can make the difference on a crown claim where the x-ray looks normal.</p>
<h3>Narratives</h3>
<p>A narrative is a short clinical explanation of why the procedure was necessary. It ties the images and charts to the decision. See our guide to <a href="/blog/dental-insurance-narratives/">dental insurance narratives</a> for templates.</p>

<h2>Which procedures usually need what</h2>
<p>Requirements differ by carrier, so the plan's own documentation guide always wins. As a starting point:</p>
<table>
<thead><tr><th>Procedure type</th><th>Commonly requested attachments</th></tr></thead>
<tbody>
<tr><td>Crowns, onlays, buildups</td><td>Recent pre-operative x-ray, narrative, sometimes a photo</td></tr>
<tr><td>Scaling and root planing</td><td>Full perio chart, images showing bone levels</td></tr>
<tr><td>Surgical extractions</td><td>Pre-operative x-ray, narrative</td></tr>
<tr><td>Implants, bridges, dentures</td><td>Full-mouth or relevant x-rays, missing teeth and extraction dates, narrative</td></tr>
<tr><td>Replacement of existing work</td><td>Prior placement date, x-ray, narrative explaining why it failed</td></tr>
<tr><td>Crown lengthening</td><td>X-ray, narrative, sometimes a perio chart</td></tr>
</tbody>
</table>
<p>Published carrier guidance follows this pattern. One Delta Dental company's claim tips list buildups and crown lengthening among procedures that need a narrative, and Delta Dental of Idaho's documentation guidelines list radiographs and clinical notes for crowns and buildups and full charting for periodontal procedures.</p>

<h2>How electronic attachments work</h2>
<p>Most dental claims go out electronically, and the attachments usually travel separately from the claim data. The general workflow looks like this:</p>
<ol>
<li><strong>Capture the images</strong> in your imaging software and the perio chart in your practice software.</li>
<li><strong>Create the attachment</strong> through your clearinghouse or attachment service, often from inside Open Dental, Dentrix or Eaglesoft. You select the image, label its type (radiograph, perio chart, photo, narrative) and the tooth or area.</li>
<li><strong>Receive a reference number.</strong> The attachment service issues an identifier for the attachment.</li>
<li><strong>Link it to the claim.</strong> The reference number is placed on the electronic claim so the carrier can match the attachment to the right claim. Many practice software programs do this automatically when the attachment is created from the claim screen.</li>
<li><strong>Send the claim</strong> and check that both the claim and the attachment were accepted.</li>
</ol>
<p>The most common failure is a broken link: the attachment was created but the reference number never made it onto the claim, or the claim was sent before the attachment was finished. The carrier then sees a claim with no documentation. Always confirm the reference number is on the claim before you send it.</p>
<p>For paper claims, the ADA claim form has places to indicate that enclosures are included and a Remarks field for short explanations. The ADA's completion instructions describe each field. Label every page with the patient name, date of birth, subscriber ID and date of service.</p>

<h2>Attachment checklist before you send</h2>
<ul>
<li>Is the image recent enough and taken before treatment?</li>
<li>Is it labeled with the right tooth number and the right side?</li>
<li>Is the image clear and readable, not cropped so tightly that context is lost?</li>
<li>Does the perio chart include all measurements, with a date near the treatment date?</li>
<li>Does the narrative name the tooth and the findings, and does it match the chart?</li>
<li>Are prior placement and extraction dates included where relevant?</li>
<li>Is the attachment reference number on the claim?</li>
<li>Does the patient's information on every attachment match the claim exactly?</li>
</ul>
<p>It also helps to decide who owns each step. In many offices the clinical team captures images and charting, and the billing team builds the attachment and confirms it is linked. When nobody owns the final check, attachments fall through the gap between the two. A short daily review of claims waiting on documentation keeps that gap closed.</p>
<p>The <a href="/tools/claim-submission-checklist/">claim submission checklist</a> includes these checks along with the rest of a clean claim review.</p>

<h2>When the carrier asks for more</h2>
<p>Sometimes a carrier pends or denies a claim with a request for additional documentation. Respond to the request rather than sending a new claim, which risks a duplicate denial. Attach what was requested to the existing claim through the carrier's process, quote the claim number and note the response date, because these requests often have their own deadline. If the carrier still denies after reviewing the documentation, that becomes an appeal, covered in <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a>.</p>

<h2>A hypothetical attachment fix</h2>
<p>Hypothetical example: an office notices that 10 of its last 40 crown claims were denied for missing documentation. A review shows the x-rays were attached in every case, but on 7 claims the attachment reference number was not on the claim because the claim was sent from the batch screen before the attachment finished uploading. The other 3 had x-rays that were taken after the crown was seated. The office changes two habits: attachments are created from the claim screen before sending, and the clinical team takes a pre-operative image at the diagnosis visit. Both are process fixes, not coding fixes.</p>

<h2>Privacy and minimum necessary</h2>
<p>Attachments contain protected health information. Send only what the carrier needs for that claim, through secure channels, and do not email images to a carrier unless the carrier offers a secure method for it. Your attachment service and any outside billing team should be covered by a Business Associate Agreement.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service includes CDT code and documentation review and claim attachments and corrections, and our <a href="/services/denial-management/">Denial Management & Appeals</a> service handles missing documentation follow-up. We sign a Business Associate Agreement before accessing patient data. <a href="/consultation/">Book a free consultation</a> to review your attachment workflow.</p>
`,
    faqs: [
      {
        q: 'Which dental claims need attachments?',
        a: 'Crowns, buildups, scaling and root planing, surgical extractions, implants, bridges, dentures and replacements of existing work most often need attachments. Requirements vary by carrier, so check the plan\'s documentation guide.',
      },
      {
        q: 'What x-ray should I send with a crown claim?',
        a: 'Usually a recent pre-operative radiograph that clearly shows the tooth, labeled with the tooth number and date. A post-operative image alone generally cannot show why the crown was needed.',
      },
      {
        q: 'Why was my claim denied for missing documentation when I sent x-rays?',
        a: 'Often the attachment was not linked to the claim. If the attachment reference number is missing from the electronic claim, the carrier cannot match the images to it, so confirm the number is on the claim before sending.',
      },
      {
        q: 'Should I send a new claim when the carrier asks for more documentation?',
        a: 'No. Respond to the request on the existing claim and quote its claim number. Sending a new claim for the same services can lead to a duplicate denial.',
      },
    ],
    sources: [S.deltaXray, S.deltaIdahoDocs, S.adaClaimInstructions, S.adaDelays],
  },
];
