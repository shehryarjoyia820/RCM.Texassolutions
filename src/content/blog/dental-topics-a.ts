/**
 * Topic-targeted dental posts, batch A (2026-10-13).
 * Rules: docs/DENTAL-WRITING.md. Internal links only point at kept URLs
 * (src/content/dental.ts). Every source URL was checked on 2026-10-13.
 */
import type { SeedPost } from './seed';

const S = {
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaClaimInstructions: {
    label: 'ADA: ADA Dental Claim Form Completion Instructions (Version 2024)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/2024_completioninstructions_adaclaimform_2024.pdf',
  },
  adaTypicalPlan: {
    label: 'ADA: Typical Dental Plan Benefits and Limitations',
    url: 'https://www.ada.org/resources/practice/dental-insurance/typical-dental-plan-benefits-and-limitations',
  },
  adaPreAuth: { label: 'ADA: Pre-Authorizations', url: 'https://www.ada.org/resources/practice/dental-insurance/pre-authorizations' },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  adaInOffice: {
    label: 'ADA: Is an In-Office Dental Plan Right for Your Practice?',
    url: 'https://www.ada.org/resources/practice/dental-insurance/is-an-in-office-dental-plan-right-for-your-practice',
  },
  adaNoncovered: { label: 'ADA News: Dear ADA, Noncovered Services (March 30, 2026)', url: 'https://adanews.ada.org/ada-news/2026/march/dear-ada-noncovered-services/' },
  naicCob: { label: 'NAIC: Coordination of Benefits Model Regulation (MDL-120)', url: 'https://content.naic.org/sites/default/files/model-law-120.pdf' },
  deltaXray: { label: 'Delta Dental: X-ray Claim Tips', url: 'https://www1.deltadentalins.com/dentists/fyi-online/2022/x-ray-claim-tips.html' },
  deltaIdahoDocs: {
    label: 'Delta Dental of Idaho: Documentation Guidelines (Claim Attachment Requirements)',
    url: 'https://www.deltadentalid.com/content/dam/member-companies/idaho/docs/Claim%20Attachment%20Requirements.pdf',
  },
  neDeltaGlossary: { label: 'Northeast Delta Dental: Some Words You Need to Know', url: 'https://www.nedelta.com/protect-my-smile/some-words-you-need-to-know/' },
  cignaMissingTeeth: {
    label: 'Cigna: Family and Pediatric Dental Limitations and Exclusions (Colorado individual policy)',
    url: 'https://www.cigna.com/static/www-cigna-com/docs/co-ind-policy-family-pediatric-dental-exclusions-and-limitations.pdf',
  },
  waSb6442: {
    label: 'Washington State Legislature: SB 6442 (2018), dental coverage and missing tooth clauses',
    url: 'https://lawfilesext.leg.wa.gov/biennium/2017-18/Htm/Bills/Senate%20Bills/6442.htm',
  },
  nyOgc2005: { label: 'New York Insurance Department: OGC Opinion No. 05-05-01 (prepaid dental services plan)', url: 'https://www.dfs.ny.gov/insurance/ogco2005/rg050501.htm' },
  nyOgc2009: { label: 'New York Insurance Department: OGC Opinion No. 09-09-05 (discount dental service plan)', url: 'https://www.dfs.ny.gov/insurance/ogco2009/rg090905.htm' },
  fairHealthDental: { label: 'FAIR Health: Dental Data Resources and Tools for Diverse Users', url: 'https://www.fairhealth.org/article/dental-data-resources-and-tools-for-diverse-users' },
  waHcaDental: {
    label: 'Washington State Health Care Authority: Dental-Related Services Program Billing Guide (October 2025)',
    url: 'https://www.hca.wa.gov/assets/billers-and-providers/dental-related-serv-bg-20251001.pdf',
  },
  medicaidDental: { label: 'Medicaid.gov: Dental Care', url: 'https://www.medicaid.gov/medicaid/benefits/dental-care' },
};

export const dentalTopicsA: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-insurance-narratives',
    title: 'Dental Narratives: How to Write Them, With Sample Templates',
    seoTitle: 'Dental Narratives: Sample Narratives for Crowns and More',
    metaDescription:
      'How to write dental narratives that carriers accept, with original sample templates for a crown, buildup, scaling and root planing and a surgical extraction.',
    excerpt:
      'What a dental narrative is, when carriers ask for one, what separates a narrative that gets paid from one that gets denied, and four original templates your office can adapt.',
    category: 'Dental Billing',
    tags: ['dental narratives', 'narrative for crown', 'dental claims', 'claim attachments', 'claim denials'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental narratives are short written explanations, sent with a claim, that tell the carrier why a procedure was clinically necessary for this patient on this tooth.</strong> A good dental narrative connects what the dentist saw, what the x-rays and photos show, and why the chosen treatment was the right one. A weak narrative repeats the procedure name and adds nothing a claims reviewer can use.</p>

<p>Carriers ask for narratives most often on crowns, buildups, periodontal treatment and surgical extractions, and a missing or vague narrative is one of the most common reasons those claims stall. This guide explains when a narrative is needed, what makes one work, where it goes on the claim, and gives four original templates your team can adapt. If your office would rather hand off claim preparation and follow-up, our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service builds narratives from your clinical notes inside your own practice software.</p>

<h2>What is a dental narrative?</h2>
<p>A dental narrative is a brief clinical summary written for a claims reviewer, usually a dental consultant working for the carrier. It is not a chart note and it is not a sales pitch. Its job is to answer one question: given the patient's condition, why was this procedure necessary instead of a simpler or cheaper one?</p>
<p>The narrative works alongside other attachments. Radiographs, intraoral photos and periodontal charts show the condition. The narrative explains what the reviewer is looking at, especially when the problem is not obvious on an image, such as a crack, a failing margin under a restoration, or the amount of tooth structure lost after decay removal.</p>

<h2>When do carriers ask for a dental narrative?</h2>
<p>Requirements differ by carrier and even by regional company within the same carrier family, so the plan's own documentation guide is the final word. Published carrier guidance shows a clear pattern, though. One Delta Dental company's claim tips say a narrative is required for buildups and for crown lengthening, and that documentation details should be entered in the claim's remarks field. Delta Dental of Idaho's documentation guidelines list clinical notes and a recent pre-operative radiograph for crowns and buildups, and full periodontal charting plus images showing bone levels for periodontal procedures.</p>
<p>Narratives are most often requested for:</p>
<ul>
<li><strong>Crowns and onlays,</strong> especially when the radiograph does not show obvious decay or fracture.</li>
<li><strong>Buildups,</strong> where the carrier wants to know how much tooth structure remained after preparation.</li>
<li><strong>Scaling and root planing,</strong> where pocket depths, bone loss and the number of teeth involved drive the decision.</li>
<li><strong>Surgical extractions,</strong> where the reviewer needs to know why a routine extraction was not enough.</li>
<li><strong>Replacements inside a frequency window,</strong> such as a crown replaced before the plan's replacement period ends.</li>
<li><strong>Any service with an unusual circumstance,</strong> such as treatment completed in more visits than normal or a procedure done on a tooth with a prior history.</li>
</ul>

<h2>What makes a dental narrative work?</h2>
<p>Reviewers read a large volume of claims. Narratives that get paid tend to share the same traits:</p>
<ul>
<li><strong>Specific to the tooth.</strong> Name the tooth number and the surfaces or area involved. Generic text that could fit any patient invites a denial.</li>
<li><strong>Objective findings first.</strong> State what was measured or observed: fracture lines, pocket depths, mobility, recurrent decay under an existing restoration, percentage of tooth structure missing.</li>
<li><strong>A clear reason the alternative will not work.</strong> If a filling could not restore the tooth, say why in clinical terms.</li>
<li><strong>Function over appearance.</strong> Describe loss of function, risk of fracture or infection. Language that sounds cosmetic tends to trigger a downgrade or exclusion.</li>
<li><strong>Dates.</strong> Include the date of any prior crown, bridge or denture on the same tooth, and the date the tooth was extracted when a replacement is involved.</li>
<li><strong>Consistency with the attachments and the chart.</strong> If the narrative says "large fracture" and the photo shows a small chip, the claim loses credibility.</li>
<li><strong>Brevity.</strong> Three to five sentences usually say enough.</li>
</ul>
<p>The treating dentist should review every narrative before it goes out. The claim is submitted under that dentist's name and license, and the narrative must match what is documented in the clinical record.</p>

<h2>Where does the narrative go on the claim?</h2>
<p>On the ADA dental claim form, narrative text usually goes in the Remarks field, item 35. The ADA's completion instructions say remarks should be concise and relevant, and they warn that an entry in Remarks may prompt a person to review the claim, which can add processing time. That is not a reason to leave it blank when a narrative is needed. It is a reason to keep it focused.</p>
<p>Electronic claims carry the same text in the 837D note segment, and longer narratives can travel as a separate attachment through your clearinghouse. For crowns and other prostheses, also complete items 43 and 44 on the form, which ask whether the service replaces an existing prosthesis and, if so, the date of prior placement.</p>

<h2>What do sample dental narratives for crowns look like?</h2>
<p>The templates below are starting points written for this guide. Replace every bracketed placeholder with the actual findings from the chart, and delete any sentence that does not apply. Never send a template with generic wording left in.</p>
<h3>Template 1: narrative for a crown</h3>
<blockquote>Tooth #[__]. Clinical exam on [date] showed [a fractured cusp / recurrent decay under the existing restoration / a crack line extending from the (mesial/distal) marginal ridge], confirmed on the attached [periapical radiograph / intraoral photo]. After removal of [decay / the failing restoration], approximately [__]% of the coronal tooth structure remained, and the remaining walls were [thin / undermined]. A direct restoration would not provide adequate support against fracture under normal function. A full-coverage restoration was placed on [date]. [No prior crown on this tooth. / Prior crown placed on (date) failed due to (reason).]</blockquote>
<p>For a replacement crown, the last sentence matters most. State the prior placement date and the clinical reason the existing crown could not be kept, such as open margins with recurrent decay or a fractured porcelain that exposed the underlying structure.</p>

<h2>What should a buildup narrative include?</h2>
<p>Carriers want to know that the buildup was needed to retain the crown, not simply to fill an undercut. Quantify what was missing.</p>
<h3>Template 2: narrative for a buildup</h3>
<blockquote>Tooth #[__]. Following removal of [decay / existing restoration] on [date], [__] of [__] walls were missing and the remaining tooth structure was insufficient to retain a crown. A buildup was placed to provide retention and resistance form for the planned crown. See attached pre-operative radiograph dated [date] [and intraoral photo after preparation].</blockquote>

<h2>How do you write a narrative for scaling and root planing?</h2>
<p>Periodontal claims are judged largely on the chart and the images, so the narrative should point the reviewer to the right numbers.</p>
<h3>Template 3: narrative for scaling and root planing</h3>
<blockquote>[Quadrant(s)]: Periodontal charting dated [date] shows probing depths of [__] to [__] mm on teeth #[__, __, __, __], with [bleeding on probing / suppuration / mobility] noted. Radiographs dated [date] show [horizontal / vertical] bone loss in this area. Diagnosis: [periodontal diagnosis as recorded in the chart]. Scaling and root planing completed on [date]. Number of teeth treated in this quadrant: [__].</blockquote>
<p>Make sure the number of teeth matches the code you reported, since the choice between the full-quadrant and partial-quadrant codes depends on that count.</p>

<h2>What should an extraction narrative say?</h2>
<p>For a surgical extraction, explain what made the procedure surgical. Reviewers look for the specific step, such as flap reflection, bone removal or sectioning.</p>
<h3>Template 4: narrative for a surgical extraction</h3>
<blockquote>Tooth #[__]. [Root fracture / severe decay to the bone level / curved or divergent roots / ankylosis] noted on the attached radiograph dated [date]. The tooth could not be removed with forceps alone. [A flap was reflected / bone was removed / the tooth was sectioned] to complete the extraction on [date]. Extraction date recorded for future prosthetic claims.</blockquote>
<p>That last line is useful later. When the patient returns for a bridge or implant, the extraction date in the chart is what proves the tooth was lost while covered, which matters under a <a href="/blog/missing-tooth-clause/">missing tooth clause</a>.</p>

<h2>Why do dental narratives get denied?</h2>
<ul>
<li><strong>Canned text.</strong> The same narrative pasted on every crown claim tells the reviewer nothing about this tooth.</li>
<li><strong>No measurable findings.</strong> "Tooth was broken" is weaker than naming the cusp and the extent of the fracture.</li>
<li><strong>Attachments that do not support the story.</strong> A radiograph older than the carrier's window, or one that does not show the tooth, undermines the narrative.</li>
<li><strong>Missing dates.</strong> Prior placement and extraction dates are often the deciding fact on prosthetic claims.</li>
<li><strong>Cosmetic wording.</strong> Words about appearance can move a claim toward an exclusion.</li>
</ul>
<p>When a claim is denied for lack of documentation, a corrected narrative and a fresh look at the attachments is often the fastest path to payment. Our guide on <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a> covers that process.</p>

<h2>How should an office manage dental narratives day to day?</h2>
<p>Store your templates in your practice software so they are easy to pull into a claim, but require the clinical team to fill in the specifics. In <a href="/services/open-dental-billing-services/">Open Dental</a>, <a href="/services/dentrix-billing-services/">Dentrix</a> and <a href="/services/eaglesoft-billing-services/">Eaglesoft</a>, that usually means saved claim notes or quick-text entries that pull from the clinical record. Build a short checklist for each high-risk procedure listing the attachments and dates the narrative must reference, and review denials monthly to see which narratives are not working.</p>

<p>If narratives, attachments and resubmissions are taking more of your team's day than they should, <a href="/consultation/">book a free consultation</a> and we will walk through how your claims are prepared today.</p>
`,
    faqs: [
      {
        q: 'What is a dental narrative?',
        a: 'A dental narrative is a short clinical explanation sent with a claim that tells the carrier why a procedure was necessary. It names the tooth, states objective findings such as fracture or bone loss, explains why a simpler treatment would not work and points to the radiographs, photos or charting attached to the claim.',
      },
      {
        q: 'How long should a narrative for a crown be?',
        a: 'Most crown narratives need only three to five sentences. Name the tooth, describe the fracture, crack or decay, estimate how much tooth structure remained, explain why a filling could not restore it and give the date of any prior crown. Longer text rarely helps and can bury the key fact the reviewer needs.',
      },
      {
        q: 'Where do I put the narrative on the ADA claim form?',
        a: 'Narrative text usually goes in the Remarks field, item 35, on the ADA dental claim form. On electronic claims it travels in the claim note, and longer narratives can be sent as an attachment through your clearinghouse. The ADA advises keeping remarks concise because they may prompt a manual review.',
      },
      {
        q: 'Can we use the same narrative template for every crown?',
        a: 'You can start from a template, but every narrative must be completed with findings for that specific tooth and patient. Identical text on every claim gives reviewers nothing to evaluate and is a common reason crown claims are denied. The treating dentist should confirm each narrative matches the chart.',
      },
      {
        q: 'Does a narrative replace x-rays and photos?',
        a: 'No. A narrative explains the attachments; it does not replace them. Carriers usually still expect a recent pre-operative radiograph for crowns and buildups and periodontal charting for scaling and root planing. The narrative tells the reviewer what to look for in those images and records dates the images cannot show.',
      },
    ],
    sources: [S.adaClaimInstructions, S.adaClaimForm, S.deltaXray, S.deltaIdahoDocs],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'missing-tooth-clause',
    title: 'Missing Tooth Clause: What It Is and How Dental Offices Handle It',
    seoTitle: 'Missing Tooth Clause: What It Is and How to Verify It',
    metaDescription:
      'What a missing tooth clause is in dental insurance, how it affects bridges, dentures and implants, how to verify it and how to document extraction dates.',
    excerpt:
      'How the missing tooth clause works in dental insurance, the questions to ask during verification, why extraction dates matter and how to build an honest patient estimate.',
    category: 'Dental Billing',
    tags: ['missing tooth clause', 'dental insurance', 'insurance verification', 'dental implants', 'patient estimates'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A missing tooth clause is a dental insurance provision that excludes or limits benefits for replacing a tooth that was already missing before the patient's coverage began.</strong> If a patient lost a molar two years ago and joined a new plan last month, a plan with a missing tooth clause may pay nothing toward the bridge, partial denture or implant that replaces it, even though the same plan would help pay if the tooth had been extracted after the effective date.</p>

<p>For a dental office, the clause turns a routine prosthetic case into a surprise balance if nobody checks for it. This guide explains how the missing tooth clause works, how to verify it before treatment, how to document extraction dates and how to build a patient estimate that reflects it.</p>

<h2>What is a missing tooth clause?</h2>
<p>The ADA describes this kind of rule as a preexisting condition exclusion: some group dental plans exclude coverage for conditions that existed before enrollment, with missing teeth as the common example. The ADA also notes that the exclusion period must be reduced by prior creditable coverage, which can include earlier group dental coverage, COBRA continuation or an individual dental policy.</p>
<p>Plan language varies. A Cigna limitations document for a Colorado individual family and pediatric dental policy, for example, states that the plan pays nothing for replacing teeth that are missing when a person first becomes insured. It also explains how a bridge is handled when it replaces some teeth lost before coverage and some lost after: benefits apply only to the pontics replacing teeth extracted while the person was insured. The same document says removal of only a third molar does not qualify a bridge or denture for benefits.</p>

<h2>How does a missing tooth clause work in practice?</h2>
<p>The clause turns on one fact: when was the tooth extracted or lost, compared with the patient's effective date on this plan? Common patterns include:</p>
<ul>
<li><strong>Full exclusion.</strong> No benefit for any prosthesis replacing a tooth missing before coverage.</li>
<li><strong>Waiting period or time limit.</strong> Some plans lift the exclusion after the patient has been covered for a set period, or limit it to teeth lost within a certain time before enrollment.</li>
<li><strong>Partial benefit.</strong> Some plans pay part of the prosthesis or pay on the replacement of later-lost teeth only, as in the bridge example above.</li>
<li><strong>Creditable coverage.</strong> If the patient had continuous dental coverage before joining the plan, the exclusion may be shortened or waived.</li>
</ul>
<p>The clause usually affects fixed bridges, removable partial and complete dentures, and implants. Some states have looked at limiting these clauses. In 2018, for example, a bill introduced in the Washington Senate (SB 6442) proposed barring dental carriers from denying or limiting coverage for a tooth missing when coverage starts. Bills do not always become law, so check the current rules in your state rather than relying on a proposal.</p>

<h2>Why does the missing tooth clause matter for implants?</h2>
<p>Implant cases are where the clause causes the most friction. Implant treatment often happens months or years after an extraction, the patient may have changed jobs and plans in between, and the fee is large enough that a missed exclusion leaves a significant balance. Some plans exclude implants entirely, apply an alternate benefit based on a bridge or partial denture, or pay on the crown but not the surgical placement. A missing tooth clause can sit on top of any of those rules.</p>
<p>If you are coding implant cases, our <a href="/blog/dental-implant-codes/">guide to dental implant codes</a> covers how the surgical, abutment and restoration steps are reported, which matters because the clause may apply differently to each stage.</p>

<h2>How do you verify a missing tooth clause?</h2>
<p>Verification should happen before the treatment plan is presented, not after the claim is denied. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> team asks these questions on every prosthetic case:</p>
<ol>
<li><strong>Does the plan have a missing tooth or preexisting condition exclusion?</strong> Ask the carrier directly and note the representative's name and call reference, or read the limitations section of the benefit summary in the carrier portal.</li>
<li><strong>Which services does it apply to?</strong> Bridges, partials, complete dentures and implants may be treated differently.</li>
<li><strong>Is there a time limit or waiting period?</strong> Ask whether the exclusion ends after a period of continuous coverage.</li>
<li><strong>Does prior coverage count?</strong> If the patient was covered elsewhere when the tooth was lost, ask what proof the carrier needs.</li>
<li><strong>What are the patient's effective date and the plan's replacement rules?</strong> Record the effective date with the plan, not just the current benefit year.</li>
<li><strong>Is there an alternate benefit provision?</strong> An implant may be paid at the level of a less costly alternative even when the clause does not apply.</li>
</ol>
<p>Our free <a href="/tools/dental-insurance-verification-checklist/">dental insurance verification checklist</a> includes these prosthetic questions alongside frequency, waiting period and maximum checks.</p>

<h2>How should you document extraction dates?</h2>
<p>The carrier will decide the claim based on when the tooth was lost. Your records need to make that date easy to prove.</p>
<ul>
<li><strong>Record every extraction date in the chart,</strong> including extractions done at another office. Ask new patients when and where each missing tooth was removed, and write down the answer even if it is approximate.</li>
<li><strong>Keep the extraction claim history.</strong> If your office did the extraction under the same plan, the paid claim is strong proof the tooth was lost while covered.</li>
<li><strong>Complete the missing teeth chart on the claim.</strong> The ADA dental claim form has a missing teeth section, item 33, that the ADA says to report when pertinent to periodontal, prosthodontic or implant procedures.</li>
<li><strong>Use the remarks field.</strong> State the extraction date of each tooth being replaced and whether it occurred while the patient was covered by this plan.</li>
<li><strong>Attach a radiograph</strong> that shows the edentulous area when the carrier requires it.</li>
</ul>

<h2>How do you build a patient estimate when the clause applies?</h2>
<p>Treat a tooth that falls under the clause as uncovered in the estimate. Show the full fee for that portion of the case as patient responsibility, and show any covered portion, such as a pontic replacing a tooth lost after the effective date, at the plan's normal coinsurance. Then apply deductibles and the remaining annual maximum.</p>
<p>For larger cases, a predetermination lets the carrier state in writing how it will treat each tooth before the patient commits. The ADA notes that predeterminations are not a guarantee of payment, so explain that to the patient too. Our <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> and <a href="/tools/dental-annual-maximum-calculator/">dental annual maximum calculator</a> help you show the patient how coverage and remaining benefits combine. Cases like these are common in <a href="/specialties/prosthodontics/">prosthodontic practices</a>, where one exclusion can change the whole financial conversation.</p>

<h2>What mistakes cause missing tooth clause denials?</h2>
<p>Most denials tied to the clause trace back to a handful of front-desk and billing gaps:</p>
<ul>
<li><strong>Checking only the current year's benefits.</strong> The effective date with this carrier matters more than the benefit year, and patients who changed plans recently are the highest risk.</li>
<li><strong>Not asking new patients about missing teeth.</strong> If the health history does not capture when and where each tooth was removed, nobody can answer the carrier's question later.</li>
<li><strong>Leaving the missing teeth chart blank on the claim.</strong> The reviewer then has to request records, which slows the claim even when the tooth was lost while covered.</li>
<li><strong>Treating the predetermination as final.</strong> A plan change between the estimate and the delivery date can bring a new clause into play.</li>
<li><strong>Assuming the clause covers only implants.</strong> Bridges and dentures are often affected too.</li>
</ul>

<h2>What should you tell the patient?</h2>
<p>Keep it factual. Explain that the plan limits coverage for teeth lost before the patient joined, show which teeth are affected, and give the estimate in writing. If the patient had prior coverage, ask for proof, because it may change the result. Patients accept a clear explanation before treatment far better than a denial letter afterward.</p>

<p>If prosthetic claims keep coming back denied or patients are surprised by balances, <a href="/consultation/">book a free consultation</a> and we will review how your office verifies and documents these cases.</p>
`,
    faqs: [
      {
        q: 'What is a missing tooth clause?',
        a: 'A missing tooth clause is a dental plan provision that excludes or limits benefits for replacing a tooth that was already missing before the patient joined the plan. It most often affects bridges, partial and complete dentures, and implants. Teeth extracted after the effective date are usually not affected by the clause.',
      },
      {
        q: 'Do all dental plans have a missing tooth clause?',
        a: 'No. Many plans do not include one, and those that do word it differently. Some exclude the tooth permanently, some lift the exclusion after a period of continuous coverage and some give credit for prior coverage. The only reliable answer comes from the patient\'s own plan documents or the carrier.',
      },
      {
        q: 'Does the missing tooth clause apply to implants?',
        a: 'It can. If the tooth being replaced was lost before the patient\'s effective date, a plan with a missing tooth clause may deny the implant, the crown on it or both. Even when the clause does not apply, an alternate benefit or implant exclusion may still limit payment, so check all three.',
      },
      {
        q: 'How can a patient prove a tooth was extracted while covered?',
        a: 'The strongest proof is a paid extraction claim under the same plan, plus the chart entry and radiographs with the extraction date. If another office removed the tooth, ask that office for the treatment record. Report the extraction date in the claim remarks and mark the missing teeth on the claim form.',
      },
      {
        q: 'Should we send a predetermination when a missing tooth clause may apply?',
        a: 'For larger prosthetic cases it is usually worth it. A predetermination shows how the carrier plans to treat each tooth before the patient commits. Remind the patient that it is an estimate based on current eligibility and benefits, not a guarantee of payment.',
      },
    ],
    sources: [S.adaTypicalPlan, S.cignaMissingTeeth, S.adaClaimInstructions, S.adaPreAuth, S.waSb6442],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'in-house-dental-membership-plans',
    title: 'In-House Dental Membership Plans: How They Work and What to Check',
    seoTitle: 'Dental Membership Plan: How In-Office Plans Work',
    metaDescription:
      'How an in-house dental membership plan works, how to think about pricing, how it fits with insurance billing and ledgers, and why to check state law first.',
    excerpt:
      'A practical look at in-office dental membership plans: the revenue model, pricing considerations, how membership patients fit beside insured patients in your ledger, and the state law questions to answer before launch.',
    category: 'Practice Management',
    tags: ['dental membership plan', 'in-office dental plans', 'uninsured patients', 'patient billing', 'practice revenue'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A dental membership plan is an arrangement in which a patient pays the practice directly, usually monthly or once a year, in exchange for set preventive care and discounts on other treatment.</strong> There is no carrier, no claim and no explanation of benefits. The ADA describes in-office plans as a way for practices, especially those without broad commercial plan participation, to improve patient engagement and retention.</p>

<p>Dentist membership plans have grown because many adults have no dental coverage and many practices want a predictable revenue stream that does not depend on PPO fee schedules. This guide covers the revenue model, how to think about pricing, how a membership program fits beside insurance billing in your ledger, and why state law has to be checked before launch.</p>

<h2>How does an in-office dental membership plan work?</h2>
<p>Most in-office dental membership plans follow the same basic structure:</p>
<ul>
<li><strong>A membership fee,</strong> paid monthly or annually, often with separate tiers for adults, children and patients who need periodontal maintenance.</li>
<li><strong>Included preventive services,</strong> typically the exams, cleanings and routine radiographs a patient would receive in a year.</li>
<li><strong>A discount on other treatment,</strong> applied to the practice's own fees for restorative, endodontic or other care.</li>
<li><strong>Clear terms</strong> covering enrollment, renewal, cancellation, refunds and what happens to unused services.</li>
</ul>
<p>Because the practice is not an insurer, there is usually no annual maximum, deductible, waiting period or frequency rule other than the ones the practice writes into its own terms. That simplicity is a large part of the appeal for patients.</p>

<h2>What is the revenue model behind dentist membership plans?</h2>
<p>A membership program trades the uncertainty of carrier payments for a recurring fee the practice controls. The revenue comes from three places: the membership fees themselves, the treatment members accept at the discounted fee, and the retention effect of patients who keep coming back because they have already paid. The ADA points out that patients with a benefit plan of some kind are more likely to seek care and accept treatment, and a membership plan aims to create that same habit without a third party.</p>
<p>The model works best when members actually use their preventive visits, because those visits are where additional treatment is diagnosed. A program that enrolls patients who never schedule produces fees but not ongoing care, and those members tend to cancel at renewal.</p>

<h2>How should a practice think about membership pricing?</h2>
<p>We do not recommend specific prices, because the right figure depends on your fees, your market and your costs. The ADA's in-office plan toolkit includes a financial calculator for exactly this exercise. The considerations most practices weigh are:</p>
<ul>
<li><strong>The value of included services at your own fees.</strong> Total what a member would pay for the included visits without the plan. The membership fee is typically set below that total so the plan feels worthwhile.</li>
<li><strong>Your cost to deliver those services.</strong> Hygiene time, supplies and overhead set the floor.</li>
<li><strong>The discount on other treatment.</strong> A deeper discount attracts members but reduces the margin on every procedure they accept.</li>
<li><strong>Utilization.</strong> Not every member uses every included visit. Plan for full use so the program still works if they do.</li>
<li><strong>Administration.</strong> Recurring payments, renewals, failed cards and cancellations all take staff time or software.</li>
</ul>
<p>Our <a href="/tools/dental-practice-revenue-calculator/">dental practice revenue calculator</a> can help you model how a membership program changes total production and collections.</p>

<h2>Is a dental membership plan legal in every state?</h2>
<p>This is the most important question, and the answer depends on where you practice. Some states treat certain prepaid arrangements as insurance or regulate them as discount health plans, and the rules can include registration, required disclosures or limits on how the plan is structured. The ADA's toolkit includes a list of regulations by state and a document on common legal considerations.</p>
<p>New York shows how the analysis can turn on details. In a 2005 opinion responding to a dentist, the state Insurance Department's Office of General Counsel said a prepaid membership plan with discounted fees could be doing an insurance business and need a license, unless the fee charged for each service that depends on an unpredictable event covers the cost of providing it, including reasonable overhead. A 2009 opinion applied the same reasoning to a discount dental plan. Other states approach the question differently.</p>
<p>Before you launch, check your state insurance department's position, review your state dental association's guidance, and have a health care attorney look at your plan terms. Do this again whenever you change the structure of the plan.</p>

<h2>How does a membership plan interact with insurance billing?</h2>
<p>Membership plans are usually designed for patients without dental coverage. Mixing the two creates problems:</p>
<ul>
<li><strong>PPO contracts.</strong> If you are in network with a carrier, your contract may control what you can charge that carrier's members. Enrolling an insured patient in a membership plan does not necessarily remove those obligations, so read your contracts first.</li>
<li><strong>Coordination questions.</strong> A membership plan is not insurance, so it is not secondary coverage and does not coordinate with a carrier. Do not report it as other coverage on a claim.</li>
<li><strong>Switching patients.</strong> When a member gains insurance, decide in your written terms whether the membership ends, pauses or continues, and how any prepaid amount is handled.</li>
</ul>

<h2>How should membership fees and discounts appear on the ledger?</h2>
<p>Clean ledgers are what keep a membership program auditable. A few practices make it hard on themselves by posting membership fees as generic payments or applying discounts by hand. A better setup:</p>
<ul>
<li><strong>Create a separate fee schedule or discount plan</strong> in Open Dental, Dentrix or Eaglesoft for members, so the discount applies the same way every time.</li>
<li><strong>Post procedures at your full fee</strong> and record the member discount as its own adjustment type, so production and discounts can be reported separately.</li>
<li><strong>Record membership fees with a distinct payment or income type,</strong> tied to the patient and the membership period.</li>
<li><strong>Track renewal dates</strong> and failed recurring payments on a report, not in someone's memory.</li>
<li><strong>Do not generate insurance claims</strong> for services covered by the membership.</li>
</ul>
<p>Our <a href="/services/patient-billing/">Patient Billing &amp; Collections Support</a> team works with offices on statements, balance review and payment allocation, including patients on in-office plans. For more on how patients pay, see our article on <a href="/blog/patient-payment-options-text-to-pay/">patient payment options</a>.</p>

<h2>What are the risks of running dentist membership plans?</h2>
<p>A membership program is not passive income. The common risks are practical rather than dramatic:</p>
<ul>
<li><strong>Underpricing.</strong> If the fee does not cover the cost of included care for members who use every visit, the program loses money on its most engaged patients.</li>
<li><strong>Unclear terms.</strong> Disputes about refunds, cancellations or what counts as an included service usually start with vague wording.</li>
<li><strong>Staff inconsistency.</strong> If one team member applies the discount to a procedure and another does not, patients notice and trust drops.</li>
<li><strong>Payment failures.</strong> Expired cards and declined recurring charges quietly turn active members into unpaid ones unless someone follows up.</li>
<li><strong>Regulatory change.</strong> State rules can change, so a structure that was acceptable at launch may need adjustment later.</li>
</ul>
<p>None of these is a reason to avoid an in-office plan. They are reasons to treat it like any other part of the revenue cycle, with written rules, consistent posting and regular reporting.</p>

<h2>What should you decide before launching?</h2>
<ol>
<li>Confirm the legal structure for your state.</li>
<li>Write terms covering enrollment, renewal, cancellation and refunds.</li>
<li>Set tiers and pricing from your own fees and costs.</li>
<li>Configure the fee schedule, adjustment types and payment types in your software.</li>
<li>Train the front desk to explain the plan and to identify patients who have insurance.</li>
<li>Review enrollment, use and renewal numbers each quarter.</li>
</ol>

<p>If you are weighing a membership program alongside your insurance billing, <a href="/consultation/">book a free consultation</a> and we can talk through how it would sit in your ledger and reports.</p>
`,
    faqs: [
      {
        q: 'What is a dental membership plan?',
        a: 'A dental membership plan is an arrangement where a patient pays the dental practice directly, monthly or annually, for set preventive services and discounts on other treatment. No insurance carrier is involved, no claims are filed and the practice writes its own terms for what is included, renewal and cancellation.',
      },
      {
        q: 'Is an in-office dental membership plan considered insurance?',
        a: 'It depends on the state and on how the plan is structured. Some states regulate certain prepaid or discount arrangements as insurance or as discount health plans. New York opinions, for example, turned on whether discounted fees cover the cost of care. Check your state rules and get legal review before launching.',
      },
      {
        q: 'Can insured patients join a dental membership plan?',
        a: 'Membership plans are usually designed for patients without coverage. If you are in network with a patient\'s carrier, your contract may still control what you can charge that patient. Review your PPO agreements before enrolling insured patients, and spell out in your terms what happens when a member gains coverage.',
      },
      {
        q: 'How do we post membership plan payments in our software?',
        a: 'Post procedures at your full fee, record the member discount as a separate adjustment type and record membership fees with their own payment or income type. Most offices set up a dedicated fee schedule or discount plan in Open Dental, Dentrix or Eaglesoft so discounts apply consistently and can be reported.',
      },
    ],
    sources: [S.adaInOffice, S.nyOgc2005, S.nyOgc2009],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'ucr-fees-dental',
    title: 'Dental UCR Fees: What UCR Means and How It Affects Your Fee Schedule',
    seoTitle: 'Dental UCR: What UCR Fees Mean for Your Fee Schedule',
    metaDescription:
      'What dental UCR means, how carriers set usual, customary and reasonable fees, how balance billing differs by network status and how to review your fee schedule.',
    excerpt:
      'A plain explanation of UCR in dental insurance: the three parts of the term, how carriers build their allowances, what in-network and out-of-network offices can bill, and how to review your own dental fee schedule.',
    category: 'Dental Billing',
    tags: ['dental UCR', 'dental fee schedule', 'UCR dental insurance', 'balance billing', 'PPO dental billing'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental UCR stands for usual, customary and reasonable, a term carriers use for the fee amounts they will recognize when calculating benefits.</strong> In practice, UCR dental insurance language usually describes the carrier's own allowance for a procedure, not the dentist's fee. When a patient's plan pays "80 percent of UCR," it means 80 percent of the carrier's number, which may be well below what your office charges.</p>

<p>Understanding UCR matters for two reasons. It explains why out-of-network patients are often surprised by their balance, and it is a starting point for reviewing whether your own dental fee schedule still makes sense. This guide covers what UCR means, how carriers set it, what balance billing rules generally look like, and how to review your fees.</p>

<h2>What does UCR mean in dental insurance?</h2>
<p>The ADA calls UCR a misleading acronym because it bundles three different ideas into one label:</p>
<ul>
<li><strong>Usual</strong> is the fee a dentist normally charges for a procedure. The dentist sets it.</li>
<li><strong>Customary</strong> is the amount the carrier decides it will recognize for that procedure. The carrier sets it, and it may be lower than what local dentists charge.</li>
<li><strong>Reasonable</strong> is the loosest of the three. It is generally used for a fee that falls outside the normal range but is justified by the circumstances of a particular case, and plans define it in their own ways.</li>
</ul>
<p>When people talk about UCR dental meaning in everyday billing, they almost always mean the carrier's customary amount. The ADA notes that benefits are generally calculated as a percentage of the carrier's customary schedule, and that carriers generally do not publish those amounts, which makes patient costs hard to predict.</p>

<h2>How do carriers set dental UCR fees?</h2>
<p>There is no single method. The ADA points out that there is no universally accepted way to determine a customary fee schedule, and that schedules can vary a great deal between plans, even plans operating in the same area. Carriers commonly draw on claims they have received and on fee data they buy or license, then set an allowance at a chosen level for each procedure and geographic region.</p>
<p>Carrier terminology differs too. Delta Dental companies, for example, use the term maximum plan allowance. Northeast Delta Dental defines it as the amount Delta Dental sets that a Premier network dentist has agreed to charge for a service. Other carriers use terms such as maximum allowable charge, reasonable and customary or out-of-network allowance. Whatever the name, the effect on the claim is the same: the carrier pays its percentage of its own figure.</p>

<h2>Is there a dental fee schedule by zip code?</h2>
<p>Carriers usually price by geographic area, so the same procedure may carry a different allowance in two parts of the same state. That is why offices and patients search for a dental fee schedule by zip code. Carriers rarely publish those schedules publicly, though in-network offices receive their contracted fee schedule from the carrier.</p>
<p>Independent charge data does exist. FAIR Health, a nonprofit that collects private insurance claims data, offers dentists and practice managers charge data for CDT codes sorted by region, and a consumer tool that lets patients estimate dental costs in their area. Data like this can help you compare your fees with your market, but it is not a carrier's allowance and should not be presented to patients as one.</p>

<h2>What can an in-network office bill the patient?</h2>
<p>An in-network office has signed a contract agreeing to accept the carrier's fee schedule for covered services. Northeast Delta Dental's glossary, for example, explains that in-network dentists cannot balance bill patients for the difference between their charge and the agreed amount. The patient owes their coinsurance, deductible and any amount over the annual maximum, calculated on the contracted fee, and the difference between your full fee and the contracted fee is written off.</p>
<p>Services the plan does not cover are a separate question. The ADA reports that 44 states have noncovered services laws that stop plans from setting a dentist's fee for procedures the plan does not cover. The ADA also notes that most of those laws define "covered" by benefit eligibility, not by whether money was actually paid, so a service denied for a frequency limit or an exhausted maximum may still be limited to the contracted fee. These laws typically apply to fully insured plans, and self-funded plans governed by ERISA may not be bound by them. Check your state law and the patient's plan type.</p>
<p>Our <a href="/blog/ppo-dental-billing-guide/">PPO dental billing guide</a> covers contracted fees and write-offs in more detail, and the <a href="/tools/dental-ppo-write-off-calculator/">dental PPO write-off calculator</a> shows how much each contract reduces your fees.</p>

<h2>What can an out-of-network office bill the patient?</h2>
<p>An out-of-network office has no contract with the carrier, so in general it can bill the patient the difference between its full fee and what the carrier pays. That difference is what surprises patients: the carrier pays its percentage of its UCR figure, not of your fee. A patient told the plan "covers 80 percent" may find the payment covers far less of the actual bill.</p>
<p>There are exceptions. Some states regulate out-of-network billing in specific situations, and some plans send payment to the patient rather than the office when you are out of network. Verify how the plan pays out-of-network claims and explain the estimate in writing before treatment.</p>

<h2>How does UCR change what a patient pays?</h2>
<p>A simple illustration shows why patients misread their coverage. The numbers below are hypothetical and are not tied to any carrier or region.</p>
<table>
<thead><tr><th>Step</th><th>In-network office</th><th>Out-of-network office</th></tr></thead>
<tbody>
<tr><td>Office full fee</td><td>$1,000</td><td>$1,000</td></tr>
<tr><td>Amount the plan recognizes</td><td>$700 contracted fee</td><td>$750 UCR allowance</td></tr>
<tr><td>Plan pays 50 percent</td><td>$350</td><td>$375</td></tr>
<tr><td>Office write-off</td><td>$300</td><td>None</td></tr>
<tr><td>Patient owes</td><td>$350</td><td>$625</td></tr>
</tbody>
</table>
<p>The patient in the second column has the same plan and the same coinsurance, but owes much more because the plan's percentage applies to its own UCR figure and the out-of-network office keeps its full fee. Showing a patient this kind of breakdown before treatment prevents most billing complaints.</p>

<h2>Why should you always bill your full fee?</h2>
<p>The ADA advises reporting the full fee on the claim and letting the carrier apply its allowance. Billing a reduced fee to match what you expect a carrier to allow distorts your production reports and can cause problems with other plans that pay a percentage of your submitted charge. Keep one office fee schedule as your full fee, and let contracted schedules and write-offs handle the reductions.</p>

<h2>How do you review your own dental fee schedule?</h2>
<p>Most offices update fees less often than they should. A practical review looks like this:</p>
<ol>
<li><strong>Export your top procedures by volume and production</strong> from Open Dental, Dentrix or Eaglesoft.</li>
<li><strong>Compare your full fee with each contracted schedule</strong> for those procedures. Look for codes where a contract pays close to your full fee, which can mean your fee is below market.</li>
<li><strong>Check out-of-network payments.</strong> If a carrier's allowance is consistently above your fee on a code, your fee is likely low.</li>
<li><strong>Compare with regional charge data</strong> if you license it.</li>
<li><strong>Update the office schedule</strong> and make sure the new fees flow to estimates, statements and claims.</li>
</ol>
<p>Our <a href="/tools/fee-schedule-comparison-calculator/">fee schedule comparison calculator</a> helps you see the gap between your full fees and each carrier's allowance side by side, and the <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> service covers collection and adjustment reporting by carrier.</p>

<p>If you want a second look at how your fees, contracts and write-offs line up, <a href="/consultation/">book a free consultation</a> and we will review them with you.</p>
`,
    faqs: [
      {
        q: 'What does UCR mean in dental insurance?',
        a: 'UCR stands for usual, customary and reasonable. In dental insurance it usually refers to the amount the carrier recognizes for a procedure when calculating benefits. The dentist sets the usual fee, but the carrier sets the customary figure, and plans pay a percentage of their own figure rather than the dentist\'s fee.',
      },
      {
        q: 'Why is the carrier\'s UCR lower than our fee?',
        a: 'Carriers set customary amounts using their own data and methods, and there is no universal standard. The ADA notes those amounts can be lower than what local dentists charge and can vary widely between plans in the same area. Your fee reflects your costs; the carrier\'s figure reflects its pricing decisions.',
      },
      {
        q: 'Can an out-of-network dentist bill above UCR?',
        a: 'In general, yes. An out-of-network dentist has no contract with the carrier, so the patient can usually be billed the difference between the dentist\'s full fee and the plan payment. State rules and plan terms can create exceptions, so verify the plan and explain the estimate to the patient in writing first.',
      },
      {
        q: 'Where can I find a dental fee schedule by zip code?',
        a: 'Carriers rarely publish their regional allowances, but in-network offices receive their contracted fee schedules directly. For market comparison, some organizations such as FAIR Health license regional charge data for CDT codes. Use that data to review your own fees, not to quote a carrier\'s payment to patients.',
      },
      {
        q: 'Should we lower our fees to match UCR?',
        a: 'Usually not. The ADA advises reporting your full fee on every claim and letting the carrier apply its allowance. Lowering your office fee to match one carrier reduces payment from plans that pay on billed charges and distorts production reporting. Use contracted schedules and write-offs to handle reductions instead.',
      },
    ],
    sources: [S.adaTypicalPlan, S.adaNoncovered, S.neDeltaGlossary, S.fairHealthDental, S.adaCob],
  },

  // 5 ------------------------------------------------------------------
  {
    slug: 'dental-coordination-of-benefits',
    title: 'Dental Coordination of Benefits: Primary, Secondary and COB Rules',
    seoTitle: 'Dental Coordination of Benefits (COB): How It Works',
    metaDescription:
      'How coordination of benefits works in dental: the birthday rule, primary and secondary order, standard COB vs non-duplication, and filing secondary claims.',
    excerpt:
      'A working guide to dental COB: how to decide which plan is primary, how the birthday rule works, how non-duplication differs from standard COB and how to file and post secondary claims.',
    category: 'Dental Billing',
    tags: ['dental COB', 'coordination of benefits dental', 'COB dental insurance', 'secondary claims', 'birthday rule'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Coordination of benefits in dental insurance is the set of rules that decides which plan pays first, and how much the second plan pays, when a patient is covered by more than one dental plan.</strong> The ADA describes dental COB as the process plans use to avoid paying more than the cost of care when a patient has two sources of benefits. For the office, it decides where the first claim goes, what the second claim needs, and what ends up on the patient's statement.</p>

<p>COB errors are a common reason dental claims are delayed or paid incorrectly. This guide covers how primary and secondary order is decided, the birthday rule, the difference between standard COB and non-duplication of benefits, and how to file and post secondary claims.</p>

<h2>What is coordination of benefits in dental insurance?</h2>
<p>COB dental insurance rules apply whenever a patient has two dental plans at once. The most common situations are a patient covered by their own employer plan and a spouse's plan, a child covered under both parents' plans, a patient with both active coverage and COBRA continuation, and a patient with a commercial plan plus Medicaid. The ADA notes that only group plans are required to coordinate, so an individual policy may follow its own terms.</p>
<p>The rules answer three questions in order: which plan is primary, which method the secondary plan uses to calculate its payment, and what the patient owes after both plans have processed. Getting the first answer wrong sends the claim to the wrong carrier and starts a cycle of denials and resubmissions.</p>

<h2>How is the primary dental plan decided?</h2>
<p>Most states base their rules on the NAIC Coordination of Benefits Model Regulation, which the ADA supports and which explicitly treats dental coverage as a plan. The model sets an order of rules. The first rule that decides the order is the one that applies:</p>
<ol>
<li><strong>Non-dependent or dependent.</strong> The plan covering the person as an employee, subscriber or retiree is primary over the plan covering them as a dependent. So a patient's own employer plan pays before the plan they have through a spouse.</li>
<li><strong>Dependent children.</strong> For children, the birthday rule or custody rules apply (see below).</li>
<li><strong>Active or retired.</strong> A plan covering the person as an active employee is primary over a plan covering the same person as a retired or laid-off employee.</li>
<li><strong>COBRA or state continuation.</strong> A plan covering the person through current employment or as a dependent is primary over COBRA or state continuation coverage.</li>
<li><strong>Longer or shorter coverage.</strong> If nothing else decides it, the plan that has covered the person longer is primary.</li>
</ol>
<p>Plans that do not include a COB provision at all are generally primary. When the order is still unclear, the ADA suggests calling the numbers on the patient's ID cards and, if needed, contacting the state insurance department.</p>

<h2>How does the birthday rule work for dental coverage?</h2>
<p>When a child is covered under both parents' plans and the parents are married or living together, the plan of the parent whose birthday comes first in the calendar year is primary. Only the month and day count, not the year of birth. If both parents share a birthday, the plan that has covered a parent longer is primary.</p>
<p>For parents who are divorced, separated or not living together, the order depends on custody arrangements. Under the NAIC model:</p>
<ul>
<li>If a court decree makes one parent responsible for the child's health care coverage and that parent's plan knows about it, that plan is primary.</li>
<li>If the decree makes both parents responsible, or gives joint custody without assigning coverage, the birthday rule applies.</li>
<li>If there is no decree, the order is the custodial parent's plan, then the custodial parent's spouse's plan, then the non-custodial parent's plan, then that parent's spouse's plan.</li>
</ul>
<p>Record the subscriber birthdates for both plans during verification, and ask about custody arrangements when the parents' addresses differ. These are the details that most often cause a pediatric claim to go to the wrong carrier first, which is why <a href="/specialties/pediatric-dentistry/">pediatric dental practices</a> see COB problems often.</p>

<h2>What is the difference between standard COB and non-duplication?</h2>
<p>Once the order is set, the secondary plan's contract decides how much it pays. The ADA describes several methods:</p>
<table>
<thead><tr><th>Method</th><th>How the secondary plan calculates</th><th>Typical effect</th></tr></thead>
<tbody>
<tr><td>Standard (traditional) COB</td><td>Pays up to what it would have paid as primary, limited so combined payment does not exceed the allowed expense</td><td>Patient may owe little or nothing on covered services</td></tr>
<tr><td>Carve-out</td><td>Calculates its normal benefit, then subtracts what the primary paid</td><td>Secondary pays only the difference</td></tr>
<tr><td>Non-duplication</td><td>If the primary paid as much as or more than the secondary would have paid as primary, the secondary pays nothing</td><td>Secondary often pays nothing on common procedures</td></tr>
</tbody>
</table>
<p>Here is how the difference plays out. Suppose the allowed fee for a crown is the same under both plans, and each plan pays 50 percent of it. Under standard COB, the secondary pays the remaining patient share, up to its own 50 percent. Under non-duplication, the primary has already paid 50 percent, which equals what the secondary would have paid, so the secondary pays nothing and the patient owes the balance.</p>
<p>The ADA notes that non-duplication is common in self-funded employer plans governed by federal ERISA rules, and the ADA opposes non-duplication provisions. Whatever your view, the practical step is to ask about the secondary plan's COB method during verification, so the patient estimate reflects it.</p>

<h2>How do you file a secondary dental claim?</h2>
<ol>
<li><strong>Bill the primary first</strong> with the secondary plan listed in the other coverage section of the ADA claim form.</li>
<li><strong>Wait for the primary EOB or ERA.</strong> The secondary needs to know what the primary allowed and paid.</li>
<li><strong>Submit the secondary claim at your full fee,</strong> with the secondary plan as the payer and the primary plan in the other coverage section.</li>
<li><strong>Attach the primary EOB,</strong> or include the primary payment details electronically. The ADA's claim form instructions note that the Remarks field can carry the amount the primary paid on a secondary claim.</li>
<li><strong>Include the same attachments</strong> you sent the primary, such as radiographs and narratives, if the secondary requires them.</li>
</ol>
<p>The ADA also advises not posting write-offs until all plans have paid. Writing off the primary's contractual adjustment too early can understate what the secondary should pay and leave the ledger wrong. Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team handles primary and secondary submission in your own software and tracks each secondary until it closes.</p>

<h2>How should COB payments be posted?</h2>
<p>Posting is where many COB problems become visible. Post the primary payment and leave the account open. When the secondary pays, post that payment, then apply the correct contractual adjustment based on the in-network contract that controls the patient's fee. Only then transfer any remaining balance to the patient. If the secondary denied for COB reasons, check whether the primary information on the claim was complete before billing the patient.</p>
<p>Our <a href="/services/payment-posting/">Payment Posting</a> service posts EOBs and ERAs from both plans, applies contractual adjustments in the right order and flags underpayments. For larger cleanup projects, see our <a href="/services/dental-accounts-receivable/">Accounts Receivable (A/R) Management</a> service.</p>

<h2>What should you collect at check-in?</h2>
<ul>
<li>Both insurance cards and the subscriber's name, birthdate and employer for each plan.</li>
<li>The patient's relationship to each subscriber.</li>
<li>Custody information for children of separated parents.</li>
<li>Whether either plan is COBRA or retiree coverage.</li>
</ul>
<p>Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> team confirms primary and secondary order and the secondary plan's COB method before the appointment.</p>

<p>If secondary claims are sitting unpaid or your ledgers do not balance after COB, <a href="/consultation/">book a free consultation</a> and we will look at where the process breaks down.</p>
`,
    faqs: [
      {
        q: 'What is coordination of benefits in dental insurance?',
        a: 'Coordination of benefits is the set of rules that decides which dental plan pays first and how much the second plan pays when a patient has two plans. The goal is to prevent combined payments from exceeding the cost of care. The secondary plan\'s contract decides which COB method it uses.',
      },
      {
        q: 'How does the birthday rule work for dental COB?',
        a: 'For a child covered by both parents\' plans, the plan of the parent whose birthday falls earlier in the calendar year is primary. Only month and day matter, not birth year. Different rules apply when parents are divorced or separated, where a court decree or custody arrangement usually decides the order.',
      },
      {
        q: 'What is non-duplication of benefits?',
        a: 'Non-duplication is a COB method where the secondary plan pays nothing if the primary already paid as much as or more than the secondary would have paid as primary. It often leaves the patient with a balance even with two plans. The ADA notes it is common in self-funded employer plans.',
      },
      {
        q: 'Do I need the primary EOB to file a secondary dental claim?',
        a: 'Yes, in almost all cases. The secondary plan needs to know what the primary allowed and paid. Attach the primary EOB or send the primary payment details electronically, submit your full fee and include any attachments the secondary requires. The ADA claim form Remarks field can carry the primary payment amount.',
      },
      {
        q: 'When should we post the write-off on a COB claim?',
        a: 'Wait until both plans have paid. The ADA advises against posting write-offs before all plans have processed the claim. Posting the contractual adjustment early can understate what the secondary should pay and leave the ledger incorrect. Once both payments are posted, apply the adjustment and bill any remaining balance.',
      },
    ],
    sources: [S.adaCob, S.naicCob, S.adaClaimInstructions, S.deltaIdahoDocs],
  },

  // 6 ------------------------------------------------------------------
  {
    slug: 'dental-predetermination-vs-preauthorization',
    title: 'Dental Predetermination vs Pre-Authorization: What Is the Difference?',
    seoTitle: 'Dental Predetermination vs Pre-Authorization Explained',
    metaDescription:
      'What a predetermination is, how it differs from dental pre-authorization, when Medicaid dental programs require prior authorization and how to submit both.',
    excerpt:
      'The difference between a dental predetermination and a pre-authorization, when each is used, how Medicaid dental prior authorization works in general, how to submit and how to turn the response into a patient estimate.',
    category: 'Dental Billing',
    tags: ['dental predetermination', 'predetermination insurance', 'dental pre-authorization', 'Medicaid dental', 'patient estimates'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A predetermination is a voluntary request asking a dental plan to estimate what it would pay for a planned treatment before the work begins.</strong> A pre-authorization, by contrast, is approval a plan requires before certain services are covered at all. Offices often use the words interchangeably, but the ADA treats them as distinct, and mixing them up leads to the wrong expectations for both the office and the patient.</p>

<p>People searching for "predetermination insurance" usually want to know whether they need one, how long it takes and whether it guarantees payment. This guide covers what a dental predetermination is, how it differs from a dental pre-authorization, when Medicaid programs require prior authorization, how to submit each one and how to use the answer in a patient estimate.</p>

<h2>What is a predetermination in dental insurance?</h2>
<p>The ADA describes a predetermination as a voluntary service, common with dental PPO and indemnity plans, that shows what the plan would cover and pay for proposed treatment. Carriers use different names for it. Northeast Delta Dental, for example, calls it a pre-treatment estimate and notes it is also called a predetermination.</p>
<p>The response usually lists each proposed procedure with the allowed amount, the plan's payment, the patient's estimated share and any procedure the plan would downgrade, limit or deny. The estimate depends on the patient still being eligible and having benefits left when the work is done.</p>

<h2>How is a dental pre-authorization different?</h2>
<p>A pre-authorization is a gate rather than an estimate. The ADA notes that dental HMO plans often require pre-authorization before a patient is referred to a specialist, so the plan can review the proposed treatment and authorize payment. Medicaid dental programs also commonly require prior authorization for specific services. Skip it, and the claim may be denied even if the treatment was appropriate.</p>
<table>
<thead><tr><th></th><th>Predetermination</th><th>Pre-authorization</th></tr></thead>
<tbody>
<tr><td>Required?</td><td>Usually optional</td><td>Required for listed services</td></tr>
<tr><td>Common with</td><td>PPO and indemnity plans</td><td>DHMO referrals and Medicaid programs</td></tr>
<tr><td>Purpose</td><td>Estimate benefits for planned care</td><td>Approve the service before it is done</td></tr>
<tr><td>Guarantee of payment?</td><td>No</td><td>No</td></tr>
</tbody>
</table>

<h2>Is a predetermination a guarantee of payment?</h2>
<p>No, and neither is a pre-authorization. The ADA is direct on this point: benefits depend on the coverage in effect on the date of service, not the date the request was sent. A predetermined case can still be denied if the patient loses coverage, uses up the annual maximum on other claims, or moves into a new benefit year with different terms. The ADA suggests submitting predeterminations for complex, costly treatment as close to the service date as practical and telling patients clearly that the response is not a guarantee.</p>

<h2>When do Medicaid dental programs require prior authorization?</h2>
<p>Medicaid dental benefits are set by each state. Federal rules require dental coverage for children under the EPSDT benefit, while adult dental benefits are left to each state. Prior authorization rules vary just as much, so the state's provider billing guide or the managed care plan's provider manual is the only reliable source.</p>
<p>Washington's Apple Health program is one published example. Its dental billing guide lists services that need prior authorization, including many removable prosthodontic procedures, certain restorative services and some treatment performed in a hospital or surgery center. The guide says prior authorization must be obtained before the service, that approval indicates only that the service is clinically necessary, that it does not guarantee payment and that it is valid only if the patient is eligible on the date of service. Other states have their own lists and forms. Our article on <a href="/blog/medicaid-and-medicare-dental-billing/">Medicaid and Medicare dental billing</a> covers how those programs differ from commercial plans.</p>

<h2>How do you submit a predetermination or pre-authorization?</h2>
<ol>
<li><strong>Use the ADA claim form or the electronic equivalent.</strong> In the header, mark the request for predetermination or preauthorization box, and leave dates of service blank, since the work has not been done. The ADA's completion instructions describe this.</li>
<li><strong>List each planned procedure</strong> with the CDT code, tooth number, surfaces and your full fee.</li>
<li><strong>Attach the supporting records:</strong> recent radiographs, periodontal charting, photos and a narrative where needed. Medicaid programs often require their own form as well.</li>
<li><strong>Record the reference number</strong> the carrier returns. When you file the claim after treatment, enter the predetermination or preauthorization number in item 2 of the ADA claim form.</li>
<li><strong>Track the response.</strong> Set a follow-up date in your software and call or check the portal if nothing arrives.</li>
</ol>
<p>Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> team confirms whether a plan requires authorization for planned treatment and tracks predeterminations through to a response.</p>

<h2>How long does a dental predetermination take?</h2>
<p>Turnaround depends on the carrier, how complete the submission is and whether a dental consultant has to review it. Electronic submissions with all attachments generally move faster than paper. Missing radiographs or a vague narrative are the most common reasons a request is returned or delayed. Avoid scheduling treatment on the assumption of a fixed turnaround; schedule once the response arrives or once the patient agrees to proceed without it.</p>
<p>Also watch expiration. Some approvals are valid only for a set period. Washington's guide, for example, says its prior authorizations are valid for 6 to 12 months as stated in the approval letter. If treatment slips past that date or into a new benefit year, submit again.</p>

<h2>What do common predetermination responses mean?</h2>
<p>The response is only useful if the team reads it line by line. The results you will see most often:</p>
<ul>
<li><strong>Approved as submitted.</strong> The plan expects to pay its normal percentage of its allowed amount, subject to eligibility and remaining benefits on the date of service.</li>
<li><strong>Alternate benefit.</strong> The plan will pay as if a less costly procedure were done, such as a different restoration material. The patient pays the difference.</li>
<li><strong>Limited by frequency or replacement rules.</strong> A prior service on the same tooth falls inside the plan's window, so the plan will pay nothing or will pay only after a later date.</li>
<li><strong>Not a covered benefit.</strong> The plan excludes the service, for example under an implant exclusion or a missing tooth clause.</li>
<li><strong>Additional information requested.</strong> The reviewer needs radiographs, charting or a narrative. Send it promptly, because the request is on hold until you do.</li>
</ul>
<p>Record the outcome for each line in the patient's treatment plan so the person presenting the case can explain it.</p>

<h2>How do you turn the response into a patient estimate?</h2>
<p>Use the carrier's response as the starting point, then check it against what has changed since. Confirm current eligibility, remaining annual maximum, deductible status and any frequency limits that other recent claims may have used. Show any downgrade or alternate benefit as a separate line so the patient sees why the plan pays less than expected.</p>
<p>Our <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> walks through coinsurance, deductibles and maximums for each procedure, and the <a href="/tools/dental-annual-maximum-calculator/">dental annual maximum calculator</a> shows how a large case may need to be split across benefit years. Give the patient the estimate in writing, with a clear note that the plan decides final payment when the claim is processed.</p>

<h2>When is a predetermination worth sending?</h2>
<ul>
<li>Large restorative, prosthetic or implant cases.</li>
<li>Cases where a <a href="/blog/missing-tooth-clause/">missing tooth clause</a>, downgrade or frequency limit may apply.</li>
<li>Periodontal surgery and other treatment carriers often review closely.</li>
<li>Patients who will not proceed without knowing their cost.</li>
</ul>
<p>For routine fillings and preventive care, a good benefits verification is usually enough.</p>

<p>If predeterminations and authorizations are slowing down your case acceptance, <a href="/consultation/">book a free consultation</a> and we will review how your office handles them today.</p>
`,
    faqs: [
      {
        q: 'What is a predetermination in dental insurance?',
        a: 'A predetermination is a voluntary request asking a dental plan to estimate what it would pay for planned treatment before the work is done. The plan returns its allowed amounts, its payment and the patient\'s estimated share. It depends on the patient being eligible and having benefits left when treatment happens.',
      },
      {
        q: 'What is the difference between predetermination and pre-authorization?',
        a: 'A predetermination is usually optional and gives an estimate of benefits. A pre-authorization is required by some plans, such as dental HMOs for specialist referrals and many Medicaid programs, before a service is covered. The ADA treats the two as distinct terms. Neither guarantees payment.',
      },
      {
        q: 'Does a dental predetermination guarantee payment?',
        a: 'No. Benefits are based on the coverage in effect on the date of service. If the patient loses coverage, uses benefits on other claims or enters a new plan year, the final payment can differ. Tell patients clearly that a predetermination is an estimate and give them the estimate in writing.',
      },
      {
        q: 'Do Medicaid dental programs require prior authorization?',
        a: 'Many do for certain services, but each state sets its own list. Washington\'s Apple Health dental guide, for example, requires prior authorization for many removable prosthodontic procedures and some restorative services. Check your state\'s Medicaid dental billing guide or the managed care plan\'s provider manual before treatment.',
      },
      {
        q: 'How do you submit a dental predetermination?',
        a: 'Use the ADA claim form or its electronic version, mark the predetermination or preauthorization box and leave service dates blank. List each procedure with its code, tooth and full fee, attach radiographs, charting and narratives, then record the reference number to enter on the final claim.',
      },
    ],
    sources: [S.adaPreAuth, S.adaClaimInstructions, S.neDeltaGlossary, S.waHcaDental, S.medicaidDental],
  },
];
