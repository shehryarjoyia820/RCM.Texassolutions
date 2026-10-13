/**
 * Keyword-targeted dental code posts, batch B (2026-10-12).
 * Rules: docs/DENTAL-WRITING.md. Internal links only point at kept URLs
 * (src/content/dental.ts). CDT codes are used by number only; descriptors are
 * paraphrased in plain words and readers are pointed to the current CDT manual.
 * Every source URL was checked on 2026-10-13.
 */
import type { SeedPost } from './seed';

const S = {
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaD2950: { label: 'ADA: CDT Code D2950 (core buildup) guidance', url: 'https://www.ada.org/resources/practice/dental-insurance/cdt-code-d2950' },
  adaBundling: { label: 'ADA: Bundling and Downcoding', url: 'https://www.ada.org/resources/practice/dental-insurance/bundling-and-downcoding' },
  adaDowncoding: { label: 'ADA: Downcoding', url: 'https://www.ada.org/resources/practice/dental-insurance/downcoding' },
  adaNewsCodes: { label: 'ADA News: 6 CDT codes you should know', url: 'https://adanews.ada.org/new-dentist/2025/march/6-cdt-codes-you-should-know/' },
  adaNewsDenials: {
    label: 'ADA News: Tips to avoid claim denials due to common coding mistakes (December 2025)',
    url: 'https://adanews.ada.org/ada-news/2025/december/tips-to-avoid-claim-denials-due-to-common-coding-mistakes/',
  },
  cignaDppo: {
    label: 'Cigna Healthcare: Dental Clinical Coverage Determination Guidelines, DPPO and Indemnity (05/26, PDF)',
    url: 'https://campaigns.cigna.com/static/campaigns-cigna-com/docs/dental-hcpemails/Clinical%20Documents/Cigna%20Dental%20Coverage%20Determination%20Guidelines%20DPPO%206-2026.pdf',
  },
  deltaHandbook: {
    label: 'Delta Dental of Arkansas: Dentist Handbook, January 2023 (national processing policies, PDF)',
    url: 'https://www.deltadentalar.com/docs/default-source/dot-documents/delta-dental-dentist-handbook-2023v2.pdf',
  },
  premeraSeat: {
    label: 'Premera Blue Cross Blue Shield of Alaska: Reimbursement Changing from Preparation Date to Seat Date',
    url: 'https://www.premera.com/ak/provider/news/dental/reimbursement-date-change/',
  },
  fdaRadiographs: {
    label: 'FDA / ADA: The Selection of Patients for Dental Radiographic Examinations',
    url: 'https://www.fda.gov/radiation-emitting-products/medical-x-ray-imaging/selection-patients-dental-radiographic-examinations',
  },
  nedeltaCdt2023: { label: 'Northeast Delta Dental: CDT 2023 Code and Policy Changes', url: 'https://www.nedelta.com/providers/resources/cdt-2023-code-and-policy-changes/' },
  wsdaPano: {
    label: 'Washington State Dental Association: A dental benefits win for dentists in Washington and nationwide (December 2023)',
    url: 'https://www.wsda.org/news/blog/2023/12/22/bracken-killpack--a-dental-benefits-win-for-dentists-in-washington-and-nationwide',
  },
};

const DISCLAIMER =
  '<p><em>This article is general information, not coding advice. Choosing a code is the treating dentist\'s decision, based on what was done and what the clinical record shows. We describe codes here in our own plain words; for the exact nomenclature and descriptors, use the current CDT manual published by the American Dental Association.</em></p>';

export const dentalCodesB: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-crown-codes',
    title: 'Dental Crown Codes: D2740, D2950 and Seat Date Billing',
    seoTitle: 'Dental Crown Codes: D2740, D2950 and Seat Date Billing',
    metaDescription:
      'A billing guide to dental crown codes: D2740 and other crown materials, D2950 buildups, prep date vs seat date, replacement limits, x-rays and narratives.',
    excerpt:
      'How crown claims really get paid: the crown code families, when a D2950 buildup is supported, why carriers care about the seat date, and the attachments that keep a crown claim from stalling.',
    category: 'Dental Billing',
    tags: ['dental crown codes', 'D2740', 'D2950', 'crown seat date', 'dental claims'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental crown codes sit in the D2700 range of the CDT Code, and most of them differ only by the material the crown is made from.</strong> D2740 is the code offices most often use for an all-ceramic crown, D2950 covers a core buildup placed under a crown when the tooth needs one, and the crown seat dental code question (does the claim carry the prep date or the seat date?) sends back more claims than the codes themselves. This guide looks at each piece from the billing side: what carriers check, where crown claims stall, and how to send one a reviewer can approve the first time.</p>
${DISCLAIMER}

<h2>What are the main dental crown codes?</h2>
<p>Single crowns on natural teeth are grouped by material. In general terms, the families look like this:</p>
<ul>
<li><strong>Resin-based crowns</strong>, made indirectly from composite or resin, at the start of the range.</li>
<li><strong>All-ceramic crowns</strong>, where D2740 is the code for a crown made entirely of porcelain or ceramic.</li>
<li><strong>Porcelain fused to metal crowns</strong>, D2750 through D2753, split by the type of metal under the porcelain.</li>
<li><strong>Three-quarter crowns</strong>, a smaller group for partial coverage restorations.</li>
<li><strong>Full cast metal crowns</strong>, D2790 through D2792, again split by metal class, plus a separate code for titanium.</li>
</ul>
<p>Prefabricated crowns (such as stainless steel crowns) and the interim crown code D2799 sit nearby but follow different rules, and crowns on implants or bridge abutments use their own ranges. Because the metal class decides which porcelain-fused or cast code applies, ask your lab to state the alloy on the lab slip and keep that slip in the chart. A mismatch between the lab slip and the claim is an easy reason for a carrier to question the code.</p>

<h2>When does a carrier pay for D2740 or another crown?</h2>
<p>A carrier does not pay simply because a crown code exists. It pays when the record shows the tooth needed one. Cigna's published coverage guidelines for its dental PPO plans are a good example: they allow a crown when the submitted information confirms extensive decay or fracture that a filling cannot restore, and they decline crowns placed only for cosmetic reasons, to change the bite height, or for wear without symptoms. Teeth with a questionable periodontal, endodontic or restorative outlook are also declined.</p>
<p>Other limits show up on the benefits check rather than on the claim itself:</p>
<ul>
<li><strong>Replacement frequency.</strong> Most plans will not pay for a new crown on the same tooth until a set number of years has passed since the last one was placed.</li>
<li><strong>Age limits.</strong> A 2023 Delta Dental handbook of national processing policies, for example, listed crowns and onlays as not a benefit for children under 12.</li>
<li><strong>Waiting periods and coinsurance.</strong> Crowns are usually classed as major services, which can carry a waiting period and a lower coverage percentage.</li>
<li><strong>Alternate benefits.</strong> Some plans pay a crown at the rate of a less costly option and leave the difference to the patient. The ADA describes paying under a different, lower-cost code than the one reported as downcoding.</li>
</ul>
<p>Our team gathers these details during <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a>, so the patient estimate reflects the plan before the tooth is prepped.</p>

<h2>What documentation should go with a crown claim?</h2>
<p>Whatever dental crown codes appear on the claim, a reviewer at the carrier has to be able to see the problem. A typical crown submission includes:</p>
<ul>
<li>A recent preoperative periapical or bitewing image that shows the decay, fracture or failing restoration.</li>
<li>An intraoral photo when a crack or fracture does not show up on an x-ray.</li>
<li>A short narrative: the tooth number, what the dentist found, and why a filling would not hold.</li>
<li>For a replacement, the prior placement date and the reason the old crown failed, such as recurrent decay, broken porcelain or open margins.</li>
<li>Periodontal charting when bone levels could raise a question about the tooth's outlook.</li>
</ul>
<p>Keep the narrative factual and tied to the chart. The same Delta Dental handbook states that narratives are not treated as legal documentation and that the dental record is what counts in a review, so the narrative should summarize the clinical notes, not stand in for them.</p>

<h2>How should D2950 core buildups be documented?</h2>
<p>D2950 is the code for a core buildup, which replaces missing tooth structure so a crown has enough to hold on to. It is a separate procedure from the crown, and it is one of the most frequently denied lines on a crown claim. The ADA's guidance on D2950 explains that a buildup is meant for teeth that lack enough structure to retain the crown, and that it should not be reported when material only fills undercuts, box forms or small irregularities in the preparation. The ADA also opposes bundling as a way to reduce benefits, and says that a plan which bundles the buildup into the crown should allow the combined fee.</p>
<p>Carrier rules add their own conditions. Cigna's PPO guidelines, for instance, do not allow a buildup when there is no major decay or fracture, when it is not needed to retain the final restoration, when it is done on the same date and tooth as delivery of the final crown (with possible exceptions for same-day CAD-CAM crowns), or when it goes with an inlay or onlay.</p>
<p>Useful documentation for a buildup:</p>
<ul>
<li>A preoperative image showing how much tooth structure is missing.</li>
<li>A chart note describing what was left after decay and old restorations were removed, ideally with a photo.</li>
<li>A statement, in the dentist's own words, that the buildup was needed for retention.</li>
<li>The correct date. Buildups are usually placed at the prep appointment, so the buildup line normally carries that date while the crown follows the carrier's completion rule.</li>
</ul>

<h2>Should a crown claim use the prep date or the seat date?</h2>
<p>This is the crown seat dental code question every front desk asks, and the plan decides the answer. Many carriers treat a crown as a multistage procedure that is reported once it is finished. The 2023 Delta Dental handbook defined the completion date for crowns, inlays, onlays and fixed bridges as the day the final restoration is cemented, whatever cement is used. Premera Blue Cross Blue Shield of Alaska moved crown, bridge and denture payments from the prep date to the seat date in January 2022, describing the change as matching standard industry practice.</p>
<p>Plans and contracts can differ, so confirm before you bill:</p>
<ul>
<li>Which date the plan wants on the claim, and whether it treats a same-day milled crown differently from a lab crown.</li>
<li>Whether the patient's coverage is still active on the seat date. If coverage ends between prep and seat, a plan that pays on the seat date can deny the claim or take back a payment.</li>
<li>Whether the benefit year turns over between the two visits, which changes which year's maximum and deductible apply.</li>
</ul>
<p>Billing on the prep date when the plan requires the seat date can lead to recoupments or contract trouble, and the reverse can delay payment. Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team checks each carrier's rule before a crown claim leaves the practice software.</p>

<h2>Why do crown claims get denied?</h2>
<ol>
<li><strong>Missing or weak images.</strong> The x-ray is missing, too old, or does not show the problem.</li>
<li><strong>Replacement inside the frequency window.</strong> The plan's history shows a crown on that tooth within its replacement period.</li>
<li><strong>Buildup not supported.</strong> The record does not show that retention required it, or it was billed on the seat date.</li>
<li><strong>Material code mismatch.</strong> The claim names one material class and the lab slip another.</li>
<li><strong>Alternate benefit applied.</strong> The plan paid at the rate of a less costly restoration.</li>
<li><strong>Wrong date of service.</strong> The claim carries the prep date for a plan that pays on completion.</li>
<li><strong>Interim crown billed as a routine temporary.</strong> Cigna's guidelines, for example, limit D2799 to interim crowns left in place for an extended period, generally six months or more, while routine temporaries are part of the crown fee.</li>
</ol>
<p>When a denial arrives, read the remark code on the EOB first, then decide whether the fix is a corrected claim, a missing attachment or a written appeal. Our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team works these cases, and our guide on <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a> explains the steps.</p>

<h2>How does our dental RCM team check crown claims?</h2>
<p>We work inside your own Open Dental, Dentrix or Eaglesoft database, so the checks happen where the claim is built. The same steps apply across all dental crown codes, whatever the material:</p>
<ul>
<li>At treatment planning, we confirm the replacement history, prior placement date, waiting period, alternate benefit language and the plan's date-of-service rule.</li>
<li>When the plan or the patient wants one, we send a pre-treatment estimate with the images and narrative already attached.</li>
<li>We hold crown claims until the date the carrier requires and compare the material code against the lab slip.</li>
<li>We attach the x-rays, photos and narrative, then track the claim until it is paid or answered.</li>
</ul>
<p>Practices with heavy restorative schedules, such as <a href="/specialties/prosthodontics/">prosthodontics</a> and <a href="/specialties/general-dentistry/">general dentistry</a> offices, see the most crown claims, so these checks tend to matter most there. For a wider view of the code set, see our <a href="/blog/dental-billing-codes-guide/">dental billing codes guide</a>.</p>

<h2>Want crown claims that arrive complete?</h2>
<p>If crowns and buildups keep coming back with requests for more information, <a href="/consultation/">book a free consultation</a>. We will look at how your office documents and dates crown claims and point out the gaps carriers are likely to question.</p>
`,
    faqs: [
      {
        q: 'What is the dental crown code for an all-ceramic crown?',
        a: 'D2740 is the code most often used for a crown made entirely of porcelain or ceramic on a natural tooth. Other crown codes cover porcelain fused to metal, full cast metal, resin and titanium crowns. The dentist chooses the code based on the material used, the lab slip should confirm it, and the current CDT manual has the exact descriptors.',
      },
      {
        q: 'Can D2950 be billed on the same day the crown is seated?',
        a: 'Many plans will not pay a buildup reported on the same date and tooth as delivery of the final crown. Cigna\'s PPO guidelines, for example, list that as not allowable, with possible exceptions for same-day CAD-CAM crowns. Buildups are usually done at the prep visit, so check each carrier\'s processing policy before dating the claim.',
      },
      {
        q: 'Do dental plans pay crowns on the prep date or the seat date?',
        a: 'Many carriers pay crowns on the seat date, meaning the day the final crown is cemented. A 2023 Delta Dental handbook defined that as the completion date, and Premera Alaska moved to seat-date payment in 2022. Plans and contracts differ, so confirm the rule for each patient\'s plan before submitting the claim.',
      },
      {
        q: 'How often will dental insurance replace a crown?',
        a: 'It depends on the plan. Most plans set a replacement period in years, counted from the date the existing crown was placed, and they also expect the record to show the old crown has failed, for example from recurrent decay, broken porcelain or open margins. Check the replacement history and prior placement date during insurance verification.',
      },
      {
        q: 'Why was a crown paid at a lower rate on the EOB?',
        a: 'The plan probably applied an alternate benefit, paying at the rate of a less costly treatment such as a metal crown or a large filling. The ADA says such provisions should be clearly noted on the EOB and do not dictate the dentist\'s choice of care. Whether the patient owes the difference depends on the plan and your network contract.',
      },
    ],
    sources: [S.adaCdt, S.adaD2950, S.adaDowncoding, S.cignaDppo, S.deltaHandbook, S.premeraSeat],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-exam-codes-d0120-d0140-d0150',
    title: 'Dental Exam Codes: D0120, D0140 and D0150 Explained',
    seoTitle: 'Dental Exam Codes: D0120, D0140 and D0150 Explained',
    metaDescription:
      'How dental exam codes D0120, D0140 and D0150 work on claims: when each applies, new vs established patients, frequency limits and same-day combinations.',
    excerpt:
      'The three evaluation codes that start most dental claims, seen from the billing side: when each one generally applies, how plans count them, and why exam lines get denied or paid as a different code.',
    category: 'Dental Billing',
    tags: ['dental exam codes', 'D0120', 'D0150', 'D0140', 'frequency limitations'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental exam codes are the evaluation codes at the start of the CDT diagnostic section, and three of them carry most of the volume: D0120, D0140 and D0150.</strong> D0120 is the routine recall exam for a patient of record, D0150 is the full workup for a new patient or a returning patient whose situation has changed, and D0140 is the limited exam for a specific problem or emergency. They look simple, but exam lines are denied or paid as a different code more often than many offices expect, usually because of plan frequency rules rather than the exam itself.</p>
${DISCLAIMER}

<h2>What are the main dental exam codes?</h2>
<p>The evaluation codes most general offices use, described in plain words:</p>
<ul>
<li><strong>D0120:</strong> the periodic exam for an established patient, checking for changes since the last full or periodic exam.</li>
<li><strong>D0140:</strong> a limited exam focused on one specific complaint, often an emergency or a toothache.</li>
<li><strong>D0150:</strong> the comprehensive exam that sets the baseline for a new patient or for an established patient in certain situations.</li>
<li><strong>D0180:</strong> a comprehensive periodontal exam for patients with signs of gum disease or certain risk factors.</li>
<li><strong>D0145:</strong> an exam for a child under three, with counseling for the caregiver.</li>
</ul>
<p>Each code has required elements listed in the CDT manual. Some carriers state plainly that an evaluation is only a benefit when every element in its descriptor was completed, so the chart note should show those elements were done.</p>

<h2>When is D0120 used?</h2>
<p>D0120 is the exam that goes with most hygiene recall visits. ADA News describes it as an evaluation for a patient of record that looks for changes in oral and general health since a previous comprehensive or periodic evaluation. In billing terms, D0120 assumes the office already has a baseline exam on file.</p>
<p>Plans usually limit routine exams to a set number per benefit period, often two per year or one every six months. Pay attention to how the plan counts:</p>
<ul>
<li>Some plans count every evaluation code against one shared limit, so a D0150 in January can use up a D0120 later in the year.</li>
<li>Some count by calendar year, others by rolling months from the last exam date. A recall booked one week early can be denied on a six-month plan.</li>
<li>Exams at a different office still count, which is why a new patient's last exam date at their previous dentist matters.</li>
</ul>

<h2>When is D0150 used?</h2>
<p>According to ADA News, D0150 is meant for new patients, for established patients who have had a significant change in health, and for established patients who have been away from active treatment for three years or more. That last case surprises some offices: a long-absent patient of record can qualify for a comprehensive exam clinically.</p>
<p>Plans often pay D0150 less flexibly than the code allows. A 2023 Delta Dental handbook of national processing policies, for example, paid a comprehensive exam for the patient's first encounter with the dentist or office and processed later comprehensive exams from the same office as periodic exams. So a D0150 for a returning patient may be paid at the D0120 rate even when the code was correct. When that happens, the patient's share depends on the plan and your network contract.</p>
<p>For group practices and DSOs, ask how the plan defines the office. Moving a patient to another dentist in the same group, or to another location under the same tax ID, may not make them a new patient in the plan's eyes.</p>

<h2>When does D0140 apply?</h2>
<p>D0140 is the limited exam for a specific problem, such as pain, swelling or a broken tooth, rather than a full review of the mouth. It is common at emergency visits and is often billed with a single periapical image.</p>
<p>From the billing side, keep these points in mind:</p>
<ul>
<li>Many plans have a separate limit for limited exams, but some count them against the same exam limit as D0120.</li>
<li>Many plans will not pay two evaluations on the same date. If a recall patient mentions a new problem during the visit, the dentist decides which evaluation was actually performed; billing both rarely pays.</li>
<li>Some carriers tie a limited exam to definitive treatment. The 2023 Delta Dental handbook, for instance, allowed a limited exam together with definitive treatment.</li>
</ul>

<h2>How do new and established patient rules affect exam billing?</h2>
<p>The CDT manual describes who each exam is for in clinical terms. Plans then layer their own definitions on top, and those definitions decide payment. Before the first visit, the front desk or billing team should find out:</p>
<ul>
<li>When and where the patient last had an exam, and which code was paid.</li>
<li>Whether the plan limits comprehensive exams to one per dentist, one per office, or one per set number of years.</li>
<li>Whether the patient has used up routine exams for the benefit period.</li>
</ul>
<p>That is the kind of history our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service pulls from carrier portals before the appointment. Our free <a href="/tools/dental-insurance-verification-checklist/">dental insurance verification checklist</a> lists the questions to ask.</p>

<h2>Can dental exam codes be combined with other services on the same day?</h2>
<p>Yes, and most exams are billed with something else, but some combinations have rules:</p>
<ul>
<li><strong>Prophylaxis and bitewings.</strong> The usual recall pairing with D0120. Each has its own frequency limit.</li>
<li><strong>Full mouth debridement.</strong> ADA News notes D4355 can be reported on the same date as D0120 or D0150, but not D0180.</li>
<li><strong>Gingival inflammation scaling.</strong> Cigna's PPO guidelines allow D4346 when it is preceded by an oral evaluation such as D0120, D0150 or D0180.</li>
<li><strong>Perio maintenance.</strong> In the 2023 Delta Dental handbook, a D0180 billed with periodontal maintenance on the same date by the same office was paid as a D0120.</li>
<li><strong>Screenings.</strong> The same handbook did not allow separate fees for a screening billed on the same date as an evaluation, and processed evaluations done without intent to treat as screenings.</li>
</ul>
<p>The ADA's position is that combining distinct procedures to reduce benefits is bundling, and it asks payers to make their coding rules available. That is a reason to keep each carrier's processing policies handy rather than guessing.</p>

<h2>Why do exam claims get denied?</h2>
<ol>
<li>The routine exam limit for the benefit period was already used, sometimes at another office.</li>
<li>A D0150 was billed where the plan had already paid one for that office or dentist.</li>
<li>Two evaluations were billed on the same date.</li>
<li>The recall was booked a few days short of the plan's interval.</li>
<li>The chart note does not show the required elements of the exam.</li>
</ol>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team reviews exam lines against the plan history before submission, and our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team handles the ones that come back.</p>

<h2>How does our dental RCM team check exam codes?</h2>
<p>Working inside Open Dental, Dentrix or Eaglesoft, we note each patient's last exam date and code, the plan's counting method, and any remaining routine exams on the appointment or insurance record. If a recall falls short of the interval, the office sees it before the patient arrives, so the dentist can decide what is clinically needed and the patient can be told about any cost. Exams are the first line on most claims in <a href="/specialties/general-dentistry/">general dentistry</a> and <a href="/specialties/pediatric-dentistry/">pediatric dentistry</a>, so small errors here add up across a schedule.</p>

<h2>Need a cleaner start to every claim?</h2>
<p>If exam lines keep coming back paid as a different code or denied for frequency, <a href="/consultation/">book a free consultation</a>. We will review how your office tracks exam history and where the gaps are.</p>
`,
    faqs: [
      {
        q: 'What is the difference between D0120 and D0150?',
        a: 'D0120 is the periodic exam for an established patient, checking for changes since the last full or periodic exam. D0150 is the comprehensive exam for a new patient, an established patient with a significant health change, or one away from active treatment for three years or more. Plans often pay D0150 only once per office or dentist.',
      },
      {
        q: 'Can D0140 and D0120 be billed on the same day?',
        a: 'Usually not successfully. Many plans will not pay two evaluations on the same date, so billing both tends to produce a denial on one line. The dentist decides which evaluation was actually performed and the chart should support it. If the plan has a separate limit for limited exams, check it during verification before the visit.',
      },
      {
        q: 'How often does dental insurance pay for D0120?',
        a: 'Most plans pay a set number of routine exams per benefit period, often two per year or one every six months. Some plans count all evaluation codes against the same limit, and some measure the interval in rolling months from the last exam. The patient\'s exact limit and history come from the carrier during insurance verification.',
      },
      {
        q: 'Why was my D0150 paid as a D0120?',
        a: 'Many plans pay a comprehensive exam only for the patient\'s first visit with a dentist or office, then process later comprehensive exams from the same office as periodic exams. A 2023 Delta Dental handbook described this rule. The code may still be clinically correct; the plan simply pays at the periodic exam rate under its own policy.',
      },
    ],
    sources: [S.adaCdt, S.adaNewsCodes, S.deltaHandbook, S.cignaDppo, S.adaBundling],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-x-ray-codes',
    title: 'Dental X-Ray Codes: Bitewings, D0220, D0210 and Pano',
    seoTitle: 'Dental X-Ray Codes: Bitewings, D0220, D0210 and Pano',
    metaDescription:
      'A billing guide to dental x-ray codes: D0220 periapicals, D0272 and D0274 bitewings, D0330 pano vs full mouth series, frequency limits and bundling rules.',
    excerpt:
      'Radiographs are on almost every dental claim. Here is how the main imaging codes work for billing, how plans count bitewings, panos and full mouth series, and why x-ray lines get bundled or denied.',
    category: 'Dental Billing',
    tags: ['dental x-ray codes', 'D0220', 'D0274', 'D0330', 'bitewings', 'frequency limitations'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental x-ray codes appear on more claims than almost any other part of the CDT Code, and most of the billing trouble comes from frequency limits and bundling, not from the codes themselves.</strong> D0220 is the first periapical image of a visit, D0272 and D0274 are two- and four-image bitewing sets, D0210 is the full mouth series, and D0330 is the pano dental code. This guide explains how plans count each one, when separate images get paid as a full series, and what our team checks before an imaging line goes out.</p>
${DISCLAIMER}

<h2>What are the most common dental x-ray codes?</h2>
<p>In plain words, the imaging codes general offices use most are:</p>
<ul>
<li><strong>D0210:</strong> a full mouth series, a set of intraoral images meant to survey the whole mouth.</li>
<li><strong>D0220:</strong> the first periapical image taken at a visit.</li>
<li><strong>D0230:</strong> each additional periapical image after the first.</li>
<li><strong>D0270 to D0274:</strong> bitewings, coded by the number of images (one, two, three or four). D0272 is two images and D0274 is four.</li>
<li><strong>D0277:</strong> vertical bitewings, a larger set often used for periodontal patients.</li>
<li><strong>D0330:</strong> a panoramic image.</li>
<li><strong>D0240:</strong> an occlusal image.</li>
</ul>
<p>The code set also includes image-capture-only codes, used when one office takes an image and another interprets it, and newer tomosynthesis codes. Codes are revised every year, so check the current CDT manual and our summary of <a href="/blog/cdt-2026-code-changes/">CDT 2026 code changes</a>.</p>

<h2>When is D0220 billed?</h2>
<p>D0220 is reported once per visit for the first periapical image, with D0230 for each additional one. It is common at emergency visits alongside a limited exam, and before endodontic or surgical treatment.</p>
<p>The billing risk is quantity. When an office takes several periapicals and bitewings on one date, many plans compare the total fee with the fee for a full mouth series. The 2023 Delta Dental handbook of national processing policies, for example, treated a set of separate images as a full mouth series for payment and frequency once their combined fee reached or passed the full series fee. The ADA lists this kind of recoding among the bundling complaints it hears from dentists, noting that the images may not amount to a full series.</p>

<h2>How often will insurance pay for bitewings like D0272 and D0274?</h2>
<p>Plans set bitewing frequency in their contracts, often once or twice per benefit period, and some vary it by age. A few examples from published carrier policies:</p>
<ul>
<li>The 2023 Delta Dental handbook limited patients under age 10 to two bitewing images, paying a three- or four-image set as D0272.</li>
<li>Northeast Delta Dental's 2023 policy changes stated that additional bitewings within six months of a full mouth series are not billable to the patient when the same office takes them, and are denied when a different office does.</li>
<li>The same Delta Dental handbook folded bitewings taken on the same date as a full mouth series into the full series fee.</li>
</ul>
<p>Clinical timing is a separate question. The ADA and FDA guidance on selecting patients for dental radiographs says recall imaging frequency should be based on caries risk assessment, and it is written as a resource for the dentist, not a standard of care. So the dentist may order bitewings sooner than the plan pays for them. When that happens, the office should know in advance and tell the patient about the likely cost.</p>

<h2>What is the pano dental code, and how does it compare with a full mouth series?</h2>
<p>D0330 is the panoramic image. A full mouth series (D0210) is made of intraoral images. Plans often put the two in the same frequency bucket, so one can block the other:</p>
<ul>
<li>The 2023 Delta Dental handbook limited both full mouth series and panoramic images to once every five years, and counted a pano, with or without other images, as a complete series for frequency purposes.</li>
<li>Under that kind of rule, a pano taken this year can cause a full mouth series next year to be denied.</li>
<li>Starting in January 2024, according to the Washington State Dental Association, a national Delta Dental policy change exempted panoramic images from the rule that bundled them with other same-day images into the full series fee.</li>
</ul>
<p>The ADA notes that some payers combine a pano with bitewings and pay them as a full mouth series, and that dentists object because a panoramic image lacks the detail needed for many diagnoses. Because these policies change and vary by plan, check the current rule for each carrier rather than relying on older habits.</p>

<h2>Do dental x-ray claims need attachments?</h2>
<p>Imaging lines rarely need attachments of their own. More often, the images are the attachments for other procedures: crowns, buildups, scaling and root planing, extractions and endodontic treatment. Still, a few habits protect imaging claims:</p>
<ul>
<li>Make sure the chart shows the dentist's interpretation. Carrier policies such as the Delta Dental handbook treat the imaging codes as including both capture and interpretation.</li>
<li>Keep images dated and labeled with the patient and tooth, so a reviewer can tell the image is current.</li>
<li>Send images electronically through your clearinghouse attachment service rather than by mail.</li>
<li>Match the code to the count. A four-image bitewing code with only two images in the chart is an audit problem.</li>
</ul>
<p>Because plans count dental x-ray codes so closely, the date of every image matters as much as the code. An image taken at a previous office, a hospital visit or a specialist referral may still sit in the carrier's history and affect what your office can be paid. When a patient transfers in, ask whether recent images exist and request copies. That can save the patient an unneeded exposure and the office a denied line.</p>

<h2>Why do x-ray claims get denied or downgraded?</h2>
<ol>
<li>The plan's frequency for that image type was already used, sometimes by another office.</li>
<li>Several images on one date were bundled and paid as a full mouth series.</li>
<li>A pano fell inside the full series frequency window, or the reverse.</li>
<li>Bitewings were taken within a set period after a full mouth series.</li>
<li>The patient's age limited the number of bitewing images the plan pays.</li>
</ol>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team reviews these lines before submission. When a payment looks like bundling that the plan's own policy does not support, our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team can ask for review.</p>

<h2>How does our dental RCM team check x-ray codes?</h2>
<p>Inside Open Dental, Dentrix or Eaglesoft, we track dental x-ray codes by recording the dates of the patient's last full mouth series, pano and bitewings, including those taken at other offices when the carrier portal shows them. During <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> we note how the plan counts imaging and flag any appointment where an expected image would fall outside coverage. The dentist still decides what to take; our job is to make sure the office and the patient know what the plan will do. These checks matter on every hygiene schedule in <a href="/specialties/general-dentistry/">general dentistry</a> and <a href="/specialties/pediatric-dentistry/">pediatric dentistry</a> offices.</p>

<h2>Tired of imaging lines paid as something else?</h2>
<p>If bitewings and panos keep coming back bundled or denied, <a href="/consultation/">book a free consultation</a>. We will look at how your office tracks imaging history and where carrier rules are catching you.</p>
`,
    faqs: [
      {
        q: 'What is the pano dental code?',
        a: 'The panoramic image is reported with D0330. Many plans count it in the same frequency group as a full mouth series (D0210), so a pano can limit when the plan will pay for a full series, and the reverse. Check the patient\'s plan for how it counts panoramic images before the appointment, and see the current CDT manual for the exact descriptor.',
      },
      {
        q: 'What is the difference between D0272 and D0274?',
        a: 'Both are bitewing codes, and the difference is the number of images. D0272 is a two-image bitewing set and D0274 is a four-image set. Plans usually limit bitewings to a set number of times per benefit period, and some limit young children to two images, paying a larger set at the two-image rate.',
      },
      {
        q: 'Why were my periapical x-rays paid as a full mouth series?',
        a: 'Many plans compare the total fee for separate images taken on one date with the fee for a full mouth series. If the total reaches or passes that fee, the plan may pay them as a full series and count them against its frequency. The ADA treats this kind of recoding as bundling when the images do not form a full series.',
      },
      {
        q: 'How often can a dentist take bitewings?',
        a: 'Clinically, the dentist decides. ADA and FDA guidance says recall imaging should be based on each patient\'s caries risk rather than a fixed schedule. Insurance is a separate question: plans set their own bitewing frequency, often once or twice per benefit period. When clinical need comes sooner than coverage, the patient should be told about the cost in advance.',
      },
      {
        q: 'Does D0220 need an attachment?',
        a: 'An imaging line rarely needs its own attachment, but the chart should show the dentist\'s interpretation, and the image should be dated and labeled. More often the periapical image becomes the attachment for another procedure, such as a crown, extraction or root canal, so it should clearly show the tooth and the problem.',
      },
    ],
    sources: [S.adaCdt, S.fdaRadiographs, S.adaBundling, S.deltaHandbook, S.nedeltaCdt2023, S.wsdaPano],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-extraction-codes-d7140-d7210',
    title: 'Dental Extraction Codes: D7140 vs D7210 for Billing',
    seoTitle: 'Dental Extraction Codes: D7140 vs D7210 for Billing',
    metaDescription:
      'How dental extraction codes D7140 and D7210 differ for billing: what the record should show, x-rays and narratives, waiting periods and common denials.',
    excerpt:
      'Simple and surgical extractions look alike on a schedule but not on a claim. Here is how D7140 and D7210 differ in general terms, what documentation carriers expect, and how waiting periods affect payment.',
    category: 'Dental Billing',
    tags: ['dental extraction codes', 'D7210', 'D7140', 'oral surgery billing', 'claim documentation'],
    readingMinutes: 5,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental extraction codes describe how a tooth came out, not how hard the visit felt, and that difference drives most extraction denials.</strong> D7140 covers an erupted tooth or exposed root removed with elevators or forceps, while D7210 (often searched as dental code 7210) covers an erupted tooth that needed bone removal or sectioning to come out. Both are common in general and oral surgery offices, and D7210 in particular is often paid as D7140 when the record does not show what was done. This guide covers the difference in general terms, the documentation carriers look for, and how waiting periods and plan limits affect payment.</p>
${DISCLAIMER}

<h2>What are the main dental extraction codes?</h2>
<p>In plain words, the extraction codes most offices use are:</p>
<ul>
<li><strong>D7111:</strong> removal of the remaining crown pieces of a primary tooth.</li>
<li><strong>D7140:</strong> removal of an erupted tooth or exposed root using elevators or forceps.</li>
<li><strong>D7210:</strong> removal of an erupted tooth that requires bone removal or sectioning of the tooth.</li>
<li><strong>D7220 to D7241:</strong> removal of impacted teeth, split by how the tooth is covered by soft tissue or bone.</li>
<li><strong>D7250:</strong> surgical removal of root pieces left behind from an earlier extraction or breakage.</li>
</ul>
<p>Related procedures such as alveoloplasty, bone grafts and sedation have their own codes and their own plan rules.</p>

<h2>What is the difference between D7140 and D7210?</h2>
<p>ADA News addressed this directly in December 2025. Its guidance: D7210 fits when the clinical situation involves removing bone and/or sectioning the tooth, and D7140 may be the right code when bone removal is not needed and the erupted tooth comes out with an elevator or forceps. Both codes include removal of the tooth, minor smoothing of the socket and closure of the site. The ADA's advice is to code each tooth according to its own clinical circumstances.</p>
<p>A few points follow from that:</p>
<ul>
<li>D7210 is sometimes called the "surgical extraction" code, but that nickname does not mean every extraction qualifies. Every extraction is a surgery in some sense.</li>
<li>A long or difficult appointment is not, by itself, a reason for D7210. The record has to show bone removal or sectioning.</li>
<li>The ADA also notes that the impaction codes are not based on difficulty. Each reflects a different clinical presentation.</li>
</ul>
<p>The billing team never changes a code on its own. If the note and the code do not match, the right step is to ask the dentist to review the record.</p>

<h2>What should the record show for D7210?</h2>
<p>Carriers that review D7210 want to see why surgical access was needed and what was done. A complete record usually includes:</p>
<ul>
<li>A preoperative image that shows the whole tooth and its roots, such as a periapical or panoramic image.</li>
<li>The clinical reason: for example, a crown broken down to the gumline, curved or divergent roots, or a tooth that fractured during the attempt.</li>
<li>What the dentist actually did: whether a flap was raised, whether bone was removed, and whether the tooth was sectioned.</li>
<li>Closure details and any postoperative instructions.</li>
</ul>
<p>The words "surgical extraction" alone tell a reviewer very little. A short narrative that names the tooth, the finding and the steps taken does far more, as long as it matches the chart.</p>

<h2>What attachments do carriers ask for on extraction claims?</h2>
<p>Requirements vary by carrier and plan. Many carriers ask for a preoperative image on D7210 and impaction claims, and some request a narrative or the operative note on review. Simple extractions under D7140 usually go through with less, though an image still helps when the plan has a missing tooth clause or a frequency question. Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team keeps a per-carrier list of what each extraction code needs, and updates it whenever a claim comes back with a new request.</p>

<h2>Can bone smoothing or other procedures be billed with an extraction?</h2>
<p>The ADA's December 2025 guidance notes that alveoloplasty is a distinct procedure, but that the minor socket smoothing and bone removal needed to complete an extraction are already included in the extraction code. So a separate alveoloplasty line needs its own clinical reason in the record. Grafts, membranes and sedation are separate codes with their own coverage rules, and some plans exclude or limit them. Check the plan before the appointment so the patient estimate is accurate.</p>

<h2>How do waiting periods and plan limits affect extraction claims?</h2>
<p>Many dental plans place simple extractions in the basic tier and surgical extractions in the major tier, and a new enrollee may face a waiting period before either is covered. Some plans also limit or exclude third molar removal, or apply a lower coinsurance to surgical services. A D7210 billed during a major-service waiting period can be denied even when the record supports the code perfectly.</p>
<p>Checking the service tier, the waiting period end date and any extraction-specific exclusions during verification lets the office give the patient an accurate estimate and decide whether to send a pre-treatment estimate first. When a patient has two dental plans, the same checks apply to the secondary, which may classify the extraction differently.</p>

<h2>Why do extraction claims get denied?</h2>
<ol>
<li><strong>D7210 paid as D7140.</strong> The record does not show bone removal or sectioning.</li>
<li><strong>Missing preoperative image.</strong> The reviewer cannot see the tooth or the roots.</li>
<li><strong>Waiting periods.</strong> Some plans class surgical extractions as major services with a waiting period.</li>
<li><strong>Extra lines bundled.</strong> Minor smoothing or bone removal billed separately when it was part of the extraction.</li>
<li><strong>Coordination of benefits.</strong> A secondary dental claim was sent without the primary EOB, or the wrong plan was billed as primary.</li>
<li><strong>Plan exclusions.</strong> Some plans limit or exclude certain extractions or related services.</li>
</ol>
<p>Most of these problems are visible before submission if someone reads the note next to the code. Dental extraction codes are short, but each one implies specific clinical steps, and carriers compare the two closely on review. A claim that shows the image, the finding and the steps taken is far less likely to be downgraded than one that lists only the code and the tooth number.</p>
<p>When a downgrade or denial looks wrong, our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team resubmits with the missing image and narrative or files a written appeal. The ADA notes that an appeal also helps make sure the patient's records reflect the care that was provided. Our free <a href="/tools/denial-appeal-checklist/">denial appeal checklist</a> lists what to gather.</p>

<h2>How does our dental RCM team review extraction claims?</h2>
<p>Working inside Open Dental, Dentrix or Eaglesoft, we review dental extraction codes line by line, checking that each one has a tooth number, a dated preoperative image and a note that supports the code. If a D7210 note reads like a forceps extraction, we flag it for the dentist to review rather than changing it ourselves. We confirm waiting periods, service tiers and any secondary dental coverage during verification, attach images and narratives before submission, and follow the claim until it is paid. <a href="/specialties/oral-surgery/">Oral surgery</a> practices see the most surgical extraction claims, but <a href="/specialties/general-dentistry/">general dentistry</a> offices bill plenty of them too.</p>

<h2>Want extraction claims paid as they were coded?</h2>
<p>If your D7210 claims keep coming back as D7140, <a href="/consultation/">book a free consultation</a>. We will review how your office documents extractions and where carriers are asking for more.</p>
`,
    faqs: [
      {
        q: 'What is dental code 7210?',
        a: 'D7210 is the code for removing an erupted tooth when the procedure involves bone removal and/or sectioning of the tooth. ADA guidance says D7140 may be the right code when the tooth comes out with elevators or forceps without bone removal. The treating dentist chooses the code from the record, and the current CDT manual has the exact descriptor.',
      },
      {
        q: 'Why was my D7210 paid as a D7140?',
        a: 'The carrier most likely did not see evidence of bone removal or sectioning in what was submitted. Send a preoperative image showing the tooth and roots, plus a short narrative that names the tooth and describes the steps the dentist took. If the chart supports D7210, a corrected submission or written appeal is the usual next step.',
      },
      {
        q: 'Is a difficult extraction always billed as D7210?',
        a: 'No. ADA guidance ties D7210 to what was done, meaning bone removal and/or sectioning, not to how long or hard the procedure felt. A difficult extraction completed with elevators and forceps may still fit D7140. The impaction codes are also not based on difficulty. Each tooth is coded on its own clinical circumstances.',
      },
      {
        q: 'Can I bill alveoloplasty with an extraction?',
        a: 'Only when it was a distinct procedure with its own clinical reason. The ADA notes that minor socket smoothing and bone removal needed to complete an extraction are included in the extraction code. A separate alveoloplasty line should be supported by the record, and plans have their own rules on paying it with extractions.',
      },
      {
        q: 'Do waiting periods apply to tooth extractions?',
        a: 'Often they do. Many plans treat surgical extractions as major services with a waiting period for new enrollees, and some apply a shorter waiting period to simple extractions in the basic tier. Checking the service tier and the waiting period end date during verification avoids a denial the record cannot fix.',
      },
    ],
    sources: [S.adaNewsDenials, S.adaCdt, S.adaDowncoding],
  },
];
