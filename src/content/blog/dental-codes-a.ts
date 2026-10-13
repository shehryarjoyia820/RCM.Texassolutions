/**
 * Dental code posts, batch A (2026-10-13): implant codes, D4346 vs D1110, and
 * the periodontal therapy codes. Rules: docs/DENTAL-WRITING.md.
 * CDT codes are cited by number only. The ADA's official nomenclature and
 * descriptors are not reproduced; each code is described in our own plain words.
 * Internal links only point at kept URLs (src/content/dental.ts).
 * Every source URL was checked on 2026-10-13.
 */
import type { SeedPost } from './seed';

const S = {
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaCodingEducation: { label: 'ADA: CDT Coding Education (guides and webinars)', url: 'https://www.ada.org/publications/cdt/coding-education' },
  adaClaimInstructions: {
    label: 'ADA: ADA Dental Claim Form Completion Instructions (Version 2024)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/2024_completioninstructions_adaclaimform_2024.pdf',
  },
  adaNews6Codes: { label: 'ADA News: 6 CDT codes you should know (2025)', url: 'https://adanews.ada.org/new-dentist/2025/march/6-cdt-codes-you-should-know/' },
  aapCodingCoach: { label: 'American Academy of Periodontology, Periospectives: Ask the Coding Coach (December 2024)', url: 'https://periospectives.perio.org/2024/12/18/ask-the-coding-coach/' },
  adaD4346Guide: {
    label: 'ADA: Guide to Reporting D4346 (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/v6_adaguidetoreportingd4346_2023jan.pdf',
  },
  adaD4355Guide: {
    label: 'ADA: D4355 Guide to Reporting Full Mouth Debridement (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/v2_d4355adaguidetoreportingfullmouthdebridement_2023jan.pdf',
  },
  adaD4910: { label: 'ADA: D4910 Coding for Periodontal Maintenance', url: 'https://www.ada.org/resources/practice/dental-insurance/d4910-coding-for-periodontal-maintenance' },
  adaMidline: {
    label: 'ADA: Guide to Coding "Quadrant" Procedures That Cross the Midline (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/publications/cdt/sextants_quadrant_procedures_that_cross_the_mid-line_2023may.pdf',
  },
  deltaSrp2026: { label: 'Delta Dental FYI: CDT code spotlight, scaling and root planing (June 2026)', url: 'https://www1.deltadentalins.com/dentists/fyi-online/2026/scaling-root-planing.html' },
};

const CODING_NOTE = `<blockquote><p><strong>A note on codes.</strong> CDT codes are maintained by the American Dental Association, and the official nomenclature and descriptors are copyrighted. This article cites code numbers and describes them in our own short, plain words, which are not the official wording. Always check the current CDT manual for the exact nomenclature. Choosing a code is the treating dentist's decision, based on the clinical record. This post is general information about dental billing, not coding advice or advice about any specific patient or plan.</p></blockquote>`;

export const dentalCodesA: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-implant-codes',
    title: 'Dental Implant Codes: A Billing Guide to D6010, D6011 and Implant Crowns',
    seoTitle: 'Dental Implant Codes: D6010, D6011 and Crown Billing',
    metaDescription:
      'How dental implant codes work on claims: D6010 placement, D6011 second stage, abutments and implant crowns, plus documentation, missing tooth clauses, denials.',
    excerpt:
      'A billing-side guide to dental implant codes: how the placement, second-stage, abutment and crown codes fit together, what carriers ask for, and why implant claims get denied.',
    category: 'Dental Billing',
    tags: ['dental implant codes', 'D6010', 'D6011', 'implant crowns', 'dental claims'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Dental implant codes are the CDT codes a dental office uses to report each stage of an implant case, from placing the implant body to seating the final crown.</strong> They live mostly in the Implant Services category, which runs from D6000 to D6199, and a single case can produce three, four or more claim lines spread over many months. Each line has its own documentation needs, frequency rules and coverage questions, which is why implant claims are often held for records or denied under plan limits.</p>

<p>This guide looks at dental implant codes from the billing side: how the main code families fit together, what carriers usually ask for, how a missing tooth clause can change the picture, and how our team reviews an implant claim before it goes out. It does not tell a dentist which code to choose. That decision belongs to the treating dentist and the clinical record.</p>

${CODING_NOTE}

<h2>What are the main dental implant code families?</h2>
<p>Most implant cases are billed in three broad steps. The ADA notes in its coding education material that a full implant case often draws codes from several categories, not only Implant Services, so expect diagnostic, surgical and sometimes grafting codes on the same treatment plan.</p>
<table>
<thead><tr><th>Stage</th><th>Common codes</th><th>What it covers, in plain words</th></tr></thead>
<tbody>
<tr><td>Surgical placement</td><td>D6010, D6013</td><td>Placing the implant body in bone. D6010 is the usual code for a full-size endosteal implant; D6013 is used for a mini implant.</td></tr>
<tr><td>Second stage</td><td>D6011</td><td>Surgically uncovering an implant that healed under the tissue so a healing cap or other part can be attached.</td></tr>
<tr><td>Abutments</td><td>D6056, D6057</td><td>The connecting piece between the implant and the crown, either prefabricated or custom made.</td></tr>
<tr><td>Abutment-supported crowns</td><td>D6058 and nearby codes</td><td>A single crown cemented or retained on an abutment, coded by material.</td></tr>
<tr><td>Implant-supported crowns</td><td>D6065, D6066, D6067 and later additions</td><td>A single crown that attaches directly to the implant, coded by material.</td></tr>
</tbody>
</table>
<p>The crown families are where most coding mix-ups happen, because the material and the way the crown connects to the implant both change the code. The ADA has also added implant codes in recent years, such as D6089 for retightening a loose implant screw and D6193 for replacing a screw that cannot be retightened, so an older code list in your software or on a fee schedule may be incomplete. Our <a href="/blog/cdt-2026-code-changes/">CDT 2026 code changes</a> article covers the most recent updates.</p>

<h2>When is D6010 the right dental implant code?</h2>
<p>D6010 is the code most offices search for, and it is reported once per implant body placed. If a dentist places two implants on the same day, the claim shows two D6010 lines with two tooth numbers. Billers run into trouble with D6010 in a few predictable ways:</p>
<ul>
<li><strong>Wrong implant size.</strong> Mini implants have their own code, D6013, so the implant type in the surgical note has to match the code on the claim.</li>
<li><strong>Missing tooth number.</strong> Implant codes are reported by tooth position. A blank or mismatched tooth number usually causes a rejection or a request for information.</li>
<li><strong>Bundled grafting.</strong> A bone graft placed at the same visit may have its own code, such as D6104 for grafting at the time of implant placement, or a ridge preservation code at extraction. Whether a carrier pays it separately depends on the plan.</li>
<li><strong>No pre-treatment estimate.</strong> Many plans limit or exclude implants, so a pre-treatment estimate before surgery protects both the office and the patient.</li>
</ul>

<h2>How is D6011 billed on an implant claim?</h2>
<p>D6011 covers the second-stage procedure, in which the dentist surgically opens the tissue over a healed implant so the next component can go on. The American Academy of Periodontology's coding column noted that this code was revised for CDT 2025, so check that your fee schedule and software use the current version. Some implants are placed with a healing cap from the start, and in those cases there may be no second-stage surgery at all.</p>
<p>Carriers vary widely on D6011. Some pay it, some treat it as part of the placement fee, and some exclude it under the implant limitation in the plan. If the plan pays D6011 separately, the claim usually needs its own date of service and the same tooth number used on the D6010 line.</p>

<h2>What documentation do carriers want for dental implant codes?</h2>
<p>Requirements differ by carrier and by plan, but implant claims usually go out with more supporting records than routine restorative work. A complete package often includes:</p>
<ul>
<li>A current periapical or panoramic image of the site, and for the crown stage, an image taken after the implant has healed.</li>
<li>The date the tooth was extracted, if known, and whether it was lost before or during the current coverage.</li>
<li>The tooth numbers of all missing teeth. The ADA claim form has a missing teeth section for exactly this, and the ADA's completion instructions say to report missing teeth when they matter to periodontal, prosthodontic or implant procedures on that claim.</li>
<li>Whether the crown or prosthesis replaces an earlier one, and if so, the date of the prior placement. The claim form asks this directly.</li>
<li>A short narrative that states the tooth, why it was lost, and why an implant was chosen.</li>
</ul>
<p>For implant cases, the narrative and the images do most of the work. A claim that simply lists codes and fees, with nothing attached, is likely to come back with a request for more information, and every request adds weeks to the payment.</p>

<h2>How does a missing tooth clause affect implant claims?</h2>
<p>A missing tooth clause is a plan provision that limits or excludes payment to replace a tooth that was already missing before the patient's coverage began. It is not universal, and the wording varies by plan, but it is one of the most common reasons an implant crown or the implant itself is denied even when every code is correct.</p>
<p>The clause usually turns on one date: when the tooth was lost compared with when the coverage started. That is why the extraction date matters so much in the claim package. If the tooth came out last year under the same plan, the clause may not apply. If it was missing for years before the patient joined the plan, the replacement may not be covered at all, or only after a waiting period.</p>
<p>Plans also commonly apply an alternate benefit, paying what they would have paid for a less costly option such as a bridge or removable partial denture. The patient owes the difference under the terms of their plan and your network contract. Checking for these provisions during verification, before surgery, is far easier than explaining a denial afterward. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service asks carriers about missing tooth clauses, alternate benefits and implant limits as part of the benefits breakdown, and the <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> can help your team frame the patient's likely share.</p>

<h2>How are implant cases billed when a patient has two dental plans?</h2>
<p>An implant case often spans more than one visit and sometimes more than one benefit year, so a second dental plan can make a real difference to the patient's share. The primary plan is billed first for each stage, and the secondary claim follows with the primary EOB attached so the secondary carrier can apply its own coordination rules.</p>
<p>Each plan reads the case on its own terms. One may cover the implant body while the other applies a missing tooth clause or an alternate benefit, and each has its own annual maximum and waiting periods. Verifying both plans before surgery, and noting which stages fall in which benefit year, keeps the estimate close to what the patient will actually owe.</p>

<h2>Why do dental implant claims get denied?</h2>
<p>The reasons printed on carrier explanations of benefits for implant claims usually fall into a few groups:</p>
<ol>
<li><strong>Plan exclusion or limitation.</strong> Implants are not covered, or are covered only with an alternate benefit.</li>
<li><strong>Missing tooth clause.</strong> The tooth was missing before coverage began.</li>
<li><strong>Replacement limits.</strong> A crown or prosthesis on that site was paid within the plan's replacement period.</li>
<li><strong>Missing records.</strong> No image, no extraction date or no narrative.</li>
<li><strong>Code and record mismatch.</strong> The crown code does not match the material or attachment type in the lab slip or clinical note.</li>
<li><strong>Annual maximum reached.</strong> An implant case can use up a patient's maximum quickly. The <a href="/tools/dental-annual-maximum-calculator/">dental annual maximum calculator</a> helps plan which year each stage falls in.</li>
</ol>
<p>Some of these can be appealed with better records; others are plan terms that no appeal will change. Our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team sorts each denial into one of those two groups before deciding on a corrected claim, an appeal, or a patient balance.</p>

<h2>How does our dental RCM team check an implant claim?</h2>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team works inside your own Open Dental, Dentrix or Eaglesoft system. Before an implant claim goes out, we compare each line against the clinical note and lab slip, confirm the tooth numbers, check that images and a narrative are attached, and look back at the verification notes for missing tooth clauses, waiting periods and alternate benefits. Where something does not match, we send the question to your team rather than changing a code ourselves. Offices with a high volume of surgical implant work may also find our <a href="/specialties/oral-surgery/">oral surgery</a> and <a href="/specialties/prosthodontics/">prosthodontics</a> pages useful.</p>

<h2>Need a second look at your implant claims?</h2>
<p>If implant claims keep stalling for the same reasons, <a href="/consultation/">book a free consultation</a>. We will review a few recent implant cases with you and show where records, codes or verification steps are causing delays.</p>
`,
    faqs: [
      {
        q: 'What is the dental implant code for placing an implant?',
        a: "D6010 is the CDT code most offices use to report surgical placement of a full-size endosteal implant body, reported once per implant. Mini implants have a separate code, D6013. The treating dentist chooses the code based on the procedure documented in the record. Check the current CDT manual for the exact nomenclature before updating your fee schedule.",
      },
      {
        q: 'Is D6011 always billed after D6010?',
        a: "No. D6011 is used only when a second surgical procedure is needed to uncover a healed implant before the next component is placed. Some implants receive a healing cap at placement and never need a second-stage surgery. Coverage for D6011 also varies; some plans pay it separately and others treat it as part of the overall implant benefit.",
      },
      {
        q: 'What is the dental implant ADA code for the crown?',
        a: "There is no single code. Implant crowns are split into abutment-supported crowns, which start at D6058, and implant-supported crowns that attach directly to the implant, such as D6065 through D6067. Within each group, the code depends on the crown material. The lab slip and clinical note should support whichever code the dentist selects.",
      },
      {
        q: 'Why was my implant claim denied when the codes were correct?',
        a: "Correct codes do not override plan terms. The most common causes are a plan exclusion for implants, a missing tooth clause, a replacement limit on that site, an alternate benefit for a bridge or partial denture, or a reached annual maximum. Missing images, extraction dates or narratives can also stop an otherwise correct claim.",
      },
      {
        q: 'Should we send a pre-treatment estimate for implants?',
        a: "In most cases, yes. A pre-treatment estimate shows how the plan intends to process each implant code, including any alternate benefit or missing tooth clause, before the patient commits. It is not a guarantee of payment, but it gives the office and the patient a written starting point for the financial conversation.",
      },
    ],
    sources: [S.adaCodingEducation, S.adaCdt, S.adaClaimInstructions, S.adaNews6Codes, S.aapCodingCoach, S.adaD4346Guide],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'd4346-vs-d1110',
    title: 'D4346 vs D1110: Gingivitis Scaling or Prophylaxis?',
    seoTitle: 'D4346 vs D1110: When Each Code Applies on a Claim',
    metaDescription:
      'D4346 vs D1110 explained for dental offices: when each code fits, what to chart, how plans share frequency between them, and how to talk with patients about it.',
    excerpt:
      'A practical look at D4346 vs D1110: the diagnosis-based difference between the two, the charting that supports D4346, shared frequency limits and how to explain it to patients.',
    category: 'Dental Billing',
    tags: ['D4346', 'D1110', 'D4346 vs D1110', 'D1110 prophylaxis', 'hygiene billing'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>D4346 vs D1110 comes down to diagnosis, not difficulty.</strong> D1110 is the adult prophylaxis code, used mainly for preventive cleanings on patients with a generally healthy periodontium or only localized gingivitis. D4346 is a therapeutic scaling code for patients with widespread moderate or severe gingival inflammation but no attachment loss or bone loss. The ADA's own guide to reporting D4346 states plainly that the code depends on the diagnosis, not on how long or how hard the appointment was.</p>

<p>That distinction matters in daily billing. Hygiene schedules are full of patients who sit somewhere between healthy and periodontitis, and the code on the claim needs to match what the chart shows. This guide covers when each code fits in general terms, what to chart, how plans treat the two codes, and how to explain the difference to patients.</p>

${CODING_NOTE}

<h2>What is D1110 prophylaxis used for?</h2>
<p>D1110 reports a prophylaxis for an adult patient: removing plaque, calculus and stain to control local irritants. The ADA describes it as primarily preventive, though it can be therapeutic depending on the patient's periodontal health. According to the ADA's D4346 guide, D1110 fits patients with a generally healthy periodontium and patients with localized gingivitis, where the goal is to stop the condition from progressing.</p>
<p>D1110 is also the code for patients with recession but no pockets or inflammation and no history of scaling and root planing. Children and adolescents have a separate prophylaxis code, and the age at which a plan switches from one to the other is set by the plan, not the code.</p>

<h2>When does D4346 apply instead?</h2>
<p>D4346 was added to fill a gap. Before it existed, there was no code for therapeutic treatment of patients with generalized moderate or severe gingival inflammation who had no bone loss from periodontitis. The ADA guide describes the typical patient as having swollen, inflamed tissue, pseudo-pockets (pocket readings caused by swelling rather than attachment loss) and moderate to severe bleeding on probing, spread across the mouth rather than in one area.</p>
<p>To help offices judge "generalized," the ADA guide points to the American Academy of Periodontology's approach of treating a condition as generalized when 30% or more of the teeth are involved, and to the gingival index in which a score of 2 is moderate and 3 is severe inflammation. Individual carriers can use their own, sometimes stricter, definitions.</p>
<p>A few more points from the ADA guide help with D4346 vs D1110 decisions:</p>
<ul>
<li><strong>A "hard prophy" is not D4346.</strong> Extra time or heavy stain alone does not change the code.</li>
<li><strong>An evaluation comes first.</strong> D4346 follows a periodic, comprehensive or comprehensive periodontal evaluation, and the ADA says they can be done on the same date.</li>
<li><strong>It is a full mouth code.</strong> It is usually finished in one visit. If it takes more than one, the completion date is the date of service.</li>
<li><strong>It is not reported with a prophylaxis, scaling and root planing, or full mouth debridement</strong> on the same visit.</li>
<li><strong>It is not followed by periodontal maintenance.</strong> Because the patient has no attachment loss, D4910 is not the next step after D4346.</li>
</ul>

<h2>What should the chart show for D4346?</h2>
<p>Documentation is where most D4346 claims succeed or fail. The ADA's guide lists two items that support the procedure in the record:</p>
<ul>
<li><strong>Periodontal charting</strong> that records pocket depths, including pseudo-pockets, and bleeding on probing. Pocket depths can be recorded even when there is no attachment loss.</li>
<li><strong>Diagnostic images</strong>, at the dentist's discretion on type and frequency, which can show the absence of bone loss.</li>
</ul>
<p>In practice, carriers that review D4346 often also want a clinical note naming the diagnosis (generalized moderate or severe gingivitis), the extent of inflammation, and the evaluation it followed. A note that simply says "heavy calculus, extra time" points toward D1110 under the ADA's guidance, no matter what code is on the claim.</p>

<h2>How do dental plans handle D4346 vs D1110 frequency?</h2>
<p>This is where offices get surprised. Many dental plans count D4346 toward the same cleaning limit as D1110, often described as two per calendar year or per twelve months, so a D4346 in March may use up one of the patient's two "cleanings." Other plans pay D4346 at a different coverage level from preventive care, apply a deductible to it, or do not cover it at all. A few treat it as an alternate benefit and pay at the prophylaxis rate.</p>
<p>The only reliable way to know is to ask, plan by plan. Verification for hygiene patients should cover:</p>
<ul>
<li>Whether D4346 is covered and at what percentage.</li>
<li>Whether it shares a frequency limit with D1110 and D4910, and how many of each the patient has already used.</li>
<li>Whether a deductible applies.</li>
<li>Any history requirement, such as no prior periodontal therapy.</li>
</ul>
<p>The ADA's guide says there is no set waiting period before a patient who had D4346 returns to routine prophylaxis; the dentist decides based on how the tissue responds. The plan, however, may still count both visits against the same annual limit. Our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service records these frequency details in the benefits breakdown so the hygienist knows before the patient sits down.</p>

<h2>Why are D4346 claims denied?</h2>
<p>Common reasons include:</p>
<ol>
<li><strong>Frequency already used</strong> by an earlier D1110 or D4910 in the same benefit period.</li>
<li><strong>No supporting charting</strong>, or charting that shows localized rather than generalized inflammation.</li>
<li><strong>Attachment or bone loss on file.</strong> If records show periodontitis, the carrier may say a periodontal code was needed instead.</li>
<li><strong>Prior periodontal therapy in the history</strong>, which some carriers treat as ruling out D4346.</li>
<li><strong>Billed with a prophylaxis on the same date</strong>, which the code does not allow.</li>
</ol>
<p>Some of these are fixable with records; others are plan terms. Our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team separates the two before deciding whether to send records, appeal, or move the balance to the patient under the plan rules.</p>

<h2>How should you explain D4346 vs D1110 to patients?</h2>
<p>Patients usually hear "deep cleaning" and "regular cleaning," and some feel the office is upgrading the visit. A short, consistent script helps:</p>
<ul>
<li>Explain that the gums show widespread inflammation, and that this visit treats it rather than simply maintaining healthy tissue.</li>
<li>Show the bleeding points on the chart; patients understand a chart full of red dots.</li>
<li>Be clear about the cost before the visit: whether the plan pays at the preventive level, a lower level, or not at all, and whether this visit counts toward their two cleanings.</li>
<li>Set expectations for the next visit, which may be a routine prophylaxis once the tissue heals.</li>
</ul>
<p>A written estimate makes that conversation easier. The <a href="/tools/dental-patient-estimate-calculator/">dental patient estimate calculator</a> can help your front desk prepare one.</p>

<h2>How does our dental RCM team review hygiene codes?</h2>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team works in your Open Dental, Dentrix or Eaglesoft system. For hygiene claims, we check that each D4346 has a same-day or earlier evaluation, perio charting with bleeding points, and a clinical note that names the diagnosis, and that no prophylaxis or periodontal code is billed with it. We compare the claim with the verification notes on shared frequency. If the record and the code do not line up, we ask your team; the code decision stays with the dentist. Practices with a strong hygiene program may also want to read our <a href="/specialties/general-dentistry/">general dentistry</a> and <a href="/specialties/periodontics/">periodontics</a> pages.</p>

<h2>Want a review of your hygiene claims?</h2>
<p>If D4346 or D1110 claims keep coming back, <a href="/consultation/">book a free consultation</a>. We will look at a sample of recent hygiene claims and denials with you and show where charting, verification or code selection is causing rework.</p>
`,
    faqs: [
      {
        q: 'What is the main difference between D4346 and D1110?',
        a: "The difference is the diagnosis. D1110 is a prophylaxis for patients with generally healthy gums or localized gingivitis. D4346 is therapeutic scaling for generalized moderate or severe gingival inflammation without attachment or bone loss. The ADA says D4346 is chosen by diagnosis, not by how long or difficult the cleaning was, so heavy calculus alone does not justify it.",
      },
      {
        q: 'Can D4346 and D1110 be billed on the same day?',
        a: "No. D4346 is not reported together with a prophylaxis, scaling and root planing, or full mouth debridement at the same visit. It can, however, be reported on the same date as the oral evaluation that led to the diagnosis. The ADA's guide to reporting D4346 confirms that an evaluation and D4346 can share a date of service.",
      },
      {
        q: 'Does D4346 count toward the two cleanings per year?',
        a: "On many dental plans it does. Plans often count D4346, D1110 and sometimes D4910 against one shared cleaning limit, such as two per calendar year. Others cover D4346 at a different level, apply a deductible, or exclude it. Ask each carrier during verification, and record how many visits the patient has already used.",
      },
      {
        q: 'What charting supports a D4346 claim?',
        a: "The ADA's guide lists periodontal charting with pocket depths, including pseudo-pockets, and bleeding on probing, plus diagnostic images at the dentist's discretion to show the absence of bone loss. A clinical note that names the diagnosis and the evaluation it followed also helps, because carriers that review D4346 look for a clear diagnosis.",
      },
      {
        q: 'Is periodontal maintenance used after D4346?',
        a: "No. D4910 periodontal maintenance is for patients who have been treated for attachment loss, and D4346 patients have no attachment loss. The ADA says there is no set waiting period before a D4346 patient returns to routine prophylaxis; the dentist decides when the tissue has responded and the patient can resume a normal preventive schedule.",
      },
    ],
    sources: [S.adaD4346Guide, S.adaD4910, S.adaCodingEducation, S.adaCdt, S.adaD4355Guide],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'periodontal-codes-d4341-d4342-d4910-d4355',
    title: 'D4341 vs D4342, D4910 and D4355: A Billing Guide to Periodontal Codes',
    seoTitle: 'D4341 vs D4342, D4910 and D4355: Perio Code Guide',
    metaDescription:
      'D4341 vs D4342, D4910 periodontal maintenance and D4355 debridement explained: charting, x-rays, quadrant counting, sequencing and common dental denials.',
    excerpt:
      'How the main periodontal codes work on claims: D4341 vs D4342 quadrant counting, the charting and x-rays carriers ask for, D4910 after active therapy, and where D4355 fits.',
    category: 'Dental Billing',
    tags: ['D4341', 'D4342', 'SRP dental codes', 'D4910', 'D4355', 'periodontal maintenance code'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>D4341 vs D4342 is a question of how many teeth in a quadrant need scaling and root planing.</strong> D4341 is reported when four or more teeth in a quadrant are treated, and D4342 when one to three are. Together they are the scaling and root planing dental codes most offices call SRP, and they sit beside two related codes: D4910 for periodontal maintenance after active therapy, and D4355 for a full mouth debridement done before a full evaluation is possible.</p>

<p>Periodontal claims are reviewed closely, and Delta Dental, for one, has published guidance stating which records it wants with SRP claims. This guide explains how these codes work on a claim, what to chart, how quadrant counting works in general terms, how D4910 and D4355 fit into the sequence, and the denials offices see most.</p>

${CODING_NOTE}

<h2>What is the difference in D4341 vs D4342?</h2>
<p>Both codes report therapeutic scaling and root planing for patients with periodontal disease, meaning attachment loss and bone loss. The only difference is the count of teeth treated in a quadrant:</p>
<table>
<thead><tr><th>Code</th><th>In plain words</th><th>Reported by</th></tr></thead>
<tbody>
<tr><td>D4341</td><td>SRP on four or more teeth in one quadrant</td><td>Quadrant</td></tr>
<tr><td>D4342</td><td>SRP on one to three teeth in one quadrant</td><td>Quadrant</td></tr>
<tr><td>D4910</td><td>Ongoing periodontal maintenance after active periodontal therapy</td><td>Visit</td></tr>
<tr><td>D4355</td><td>Full mouth debridement so a full evaluation can be done at a later visit</td><td>Full mouth</td></tr>
</tbody>
</table>
<p>On the claim, each SRP line needs the area of the oral cavity code for the quadrant (upper right, upper left, lower left, lower right). Tooth numbers are not the reporting unit, but the chart should still show which teeth were treated so the count supports the code.</p>

<h2>How are quadrants counted for SRP dental codes?</h2>
<p>The ADA's guide on quadrant procedures that cross the midline explains the counting. A quadrant starts at the midline of the arch and runs back to the last tooth. When a series of treated teeth crosses the midline, the teeth on each side are counted in their own quadrant. The ADA's example: SRP on teeth 6 through 12 is reported as three teeth in the upper right (D4342) and four teeth in the upper left (D4341), not as one quadrant of seven.</p>
<p>That rule matters for offices that treat anterior segments as a block, because the D4341 vs D4342 choice is made separately for each quadrant. Counting teeth by quadrant, then picking the code that matches each count, keeps the claim consistent with the chart. Some carriers also apply their own clinical thresholds for which teeth count as diseased, so check each plan's policy.</p>

<h2>What perio charting and x-rays support D4341 and D4342?</h2>
<p>Most SRP denials trace back to documentation. Carriers commonly want:</p>
<ul>
<li><strong>A full periodontal chart</strong> with pocket depths at six points per tooth, bleeding on probing, recession and, where possible, clinical attachment levels. Delta Dental's 2026 guidance asks for probing charts taken within the past 12 months.</li>
<li><strong>Current radiographs</strong> that show bone levels. Delta Dental's 2026 guidance asks for bitewings within the last 12 months showing both arches and bone levels, or periapicals, and states that images must show crestal bone loss of at least 2.0 mm measured from the cementoenamel junction.</li>
<li><strong>A clinical note</strong> with the periodontal diagnosis, stage and grade, the quadrants treated and, if used, local anesthetic. Delta Dental notes that stage and grade notes may be requested.</li>
</ul>
<p>Other carriers set different pocket depth or bone loss thresholds, so keep a per-carrier list. Also note that Delta Dental's same 2026 guidance says it does not allow a separate charge, to the plan or the patient, for gingival irrigation or adjunctive techniques such as laser or perioscopy when done as part of SRP. Other carriers may handle those add-ons differently, so check each plan.</p>

<h2>How many SRP quadrants can be billed on one day?</h2>
<p>CDT does not limit the number of quadrants per visit. Carriers, however, often review claims with three or four quadrants on one date more closely and may ask for time spent, anesthetic used and full records. Many plans also limit SRP to once per quadrant in a set period, commonly 24 or 36 months, so a retreatment claim inside that window is likely to be denied unless the plan allows an exception.</p>
<p>The ADA claim form has a field for the date of the patient's last scaling and root planing, added in the 2024 version. Filling it in helps the carrier apply the right history, especially for D4910 claims that depend on earlier therapy.</p>

<h2>When is D4910, the periodontal maintenance code, used?</h2>
<p>D4910 is the perio maintenance dental code for patients who have completed active periodontal therapy, such as SRP or periodontal surgery. In plain words, it is an ongoing recall visit for a periodontal patient that can include site-specific scaling and root planing where needed. The ADA describes it as care that continues for the life of the dentition, at intervals the dentist sets.</p>
<p>The ADA's article on D4910 notes that the CDT sets no fixed waiting period after SRP, but many payers expect roughly 8 to 12 weeks, and some limit when they will pay D4910 after therapy. Some plans also require prior therapy in two or more quadrants. When a plan's D4910 limit is reached, many carriers pay an adult prophylaxis amount instead as an alternate benefit, because a prophylaxis is part of the larger maintenance service. The ADA's position is that offices should still report the service that was actually done.</p>
<p>For D4910 claims, send the date of active therapy and, if the patient is new to the plan, the periodontal history and charting with the first claim. The ADA also notes that unusual intervals should be explained with the original claim rather than after a denial.</p>

<h2>Where does D4355 full mouth debridement fit?</h2>
<p>D4355 is the full mouth debridement code, used when heavy deposits prevent the dentist from doing a full evaluation. The ADA's guide calls it an enabling procedure: it comes before the comprehensive evaluation, not after a diagnosis. Key sequencing points from the ADA guide:</p>
<ul>
<li>A comprehensive (D0150) or periodic (D0120) oral evaluation can be reported on the same date as D4355, if all parts of that evaluation were completed.</li>
<li>A comprehensive periodontal evaluation (D0180) is done at a later visit, not on the same date as D4355.</li>
<li>If the patient never returns for the follow-up evaluation, D4355 is still the correct report for the debridement that was done.</li>
<li>A limited, problem-focused evaluation can lead to D4355 when the patient's complaint, such as bleeding gums, is caused by heavy deposits.</li>
</ul>
<p>D4355 covers the whole mouth; it is not a substitute for SRP in one or two quadrants. Plan coverage for D4355 varies, and many plans limit it to once in a lifetime or once in several years.</p>

<h2>What are the most common periodontal claim denials?</h2>
<ol>
<li><strong>Insufficient documentation</strong>: no chart, an old chart, or images that do not show bone loss.</li>
<li><strong>Quadrant count mismatch</strong>: D4341 billed when the chart shows fewer than four qualifying teeth.</li>
<li><strong>Frequency</strong>: SRP within the plan's retreatment window, or D4910 beyond the annual limit.</li>
<li><strong>Sequence problems</strong>: D4355 and D0180 on the same date, or D4910 with no record of active therapy.</li>
<li><strong>Same-day conflicts</strong>: a prophylaxis or D4346 billed alongside SRP.</li>
</ol>
<p>Our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> team reviews each perio denial against the chart and the plan terms before choosing a corrected claim, an appeal with records, or a patient balance. Our guide on <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a> covers appeal letters.</p>

<h2>How does our dental RCM team check periodontal claims?</h2>
<p>Our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team works inside your Open Dental, Dentrix or Eaglesoft system. Before a perio claim goes out, we compare quadrant codes with the chart, confirm images and charting are recent and attached, add the date of last SRP where it applies, and check verification notes for frequency and history limits. If something does not match, we ask your team; code decisions stay with the dentist. Periodontal practices can read more on our <a href="/specialties/periodontics/">periodontics</a> page, and our <a href="/blog/dental-billing-codes-guide/">dental billing codes guide</a> covers the wider CDT code set.</p>

<h2>Want fewer periodontal claims returned?</h2>
<p>If SRP or maintenance claims keep coming back for records, <a href="/consultation/">book a free consultation</a>. We will review recent periodontal claims with you and show which charting, x-ray or sequencing gaps are causing the most rework.</p>
`,
    faqs: [
      {
        q: 'What is the difference between D4341 and D4342?',
        a: "The difference is the number of teeth treated in one quadrant. D4341 is used when scaling and root planing involves four or more teeth in a quadrant, and D4342 when it involves one to three. Both are reported per quadrant with an area of the oral cavity code, and the perio chart should show which teeth were treated.",
      },
      {
        q: 'How do you code SRP that crosses the midline?',
        a: "Count each side separately. The ADA's guide on quadrant procedures that cross the midline says teeth on each side of the midline belong to their own quadrant. For example, SRP on teeth 6 through 12 is three teeth in the upper right, reported with D4342, and four teeth in the upper left, reported with D4341.",
      },
      {
        q: 'How soon after scaling and root planing can D4910 be billed?',
        a: "The CDT sets no fixed waiting period, but the ADA notes that many payers expect about 8 to 12 weeks after SRP before paying D4910, and some limit the window further. Check each plan's rules during verification, and include the date of active therapy on the D4910 claim so the carrier can match it to the history.",
      },
      {
        q: 'Can D4355 be billed on the same day as an exam?',
        a: "Partly. The ADA's guide says a comprehensive (D0150) or periodic (D0120) oral evaluation can be reported on the same date as D4355 if every part of the evaluation was done. A comprehensive periodontal evaluation (D0180) belongs on a later visit, not the same date as the full mouth debridement.",
      },
      {
        q: 'What do carriers want with an SRP claim?',
        a: "Most carriers want a recent periodontal chart with pocket depths and bleeding points, current radiographs that show bone loss, and a clinical note with the diagnosis and quadrants treated. Delta Dental's 2026 guidance, for example, asks for charting and bitewings or periapicals from the past 12 months. Requirements vary, so keep a per-carrier list.",
      },
      {
        q: 'Why are periodontal maintenance claims denied?',
        a: "The usual causes are no record of prior active therapy, a plan frequency limit already used, or a plan rule requiring therapy in a minimum number of quadrants. Many plans pay a prophylaxis amount as an alternate benefit when D4910 limits are reached. Sending the therapy date and perio history with the first claim prevents many of these denials.",
      },
    ],
    sources: [S.deltaSrp2026, S.adaMidline, S.adaD4910, S.adaD4355Guide, S.adaClaimInstructions, S.adaD4346Guide],
  },
];
