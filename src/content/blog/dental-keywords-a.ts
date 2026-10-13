/**
 * Keyword-targeted dental posts, batch A (2026-10-13).
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
  adaClaimDelays: { label: 'ADA: Claims Processing Delays', url: 'https://www.ada.org/resources/practice/dental-insurance/claims-processing-delays' },
  adaRejections: {
    label: 'ADA: Responding to Claim Rejections',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/responding-to-claim-rejections.pdf',
  },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  adaCob: { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
  adaCredentialing: {
    label: 'ADA: ADA Credentialing Service',
    url: 'https://www.ada.org/resources/practice/dental-insurance/dental-insurance-industry-solutions/ada-credentialing-service',
  },
  adaCredChecklist: {
    label: 'ADA / DataSpring: Your Credentialing Checklist (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/ada-credentialing-service/dataspring_ada_credentialing_checklist.pdf',
  },
  adaCredDentistGuide: {
    label: 'ADA / DataSpring: CAQH Provider Data Portal Dentist Quick Reference Guide (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/ada-credentialing-service/dataspring_provider_data_portal_dentist_quick.pdf',
  },
  adaCredPracticeManager: {
    label: 'ADA / DataSpring: Dentist Practice Manager Module User Guide (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/ada-credentialing-service/dataspring_dentist_practice_manager_module_us.pdf',
  },
  caqhAdaAlliance: {
    label: 'DataSpring (formerly CAQH): CAQH teams with the ADA to simplify credentialing for dentists',
    url: 'https://www.dataspring.com/blog/caqh-teams-american-dental-association-ada-simplify-credentialing-process-dentists',
  },
  nppes: { label: 'CMS: National Plan and Provider Enumeration System (NPPES)', url: 'https://nppes.cms.hhs.gov/' },
  cmsTransactions: { label: 'CMS: HIPAA Transactions Overview', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  hhsBa: { label: 'HHS: Business Associates (HIPAA guidance)', url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html' },
};

export const dentalKeywordPostsA: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'ada-dental-claim-form',
    title: 'ADA Dental Claim Form: How to Fill It Out Correctly',
    seoTitle: 'ADA Dental Claim Form: How to Fill It Out Correctly',
    metaDescription:
      'How the ADA dental claim form works: what a dental claim is, the main sections, the 837D electronic version, attachments and the errors that cause rejections.',
    excerpt:
      'A practical walk-through of the ADA dental claim form and its electronic twin, the 837D: what each part of the form is for, the mistakes that get claims rejected and how to handle attachments.',
    category: 'Dental Billing',
    tags: ['ADA dental claim form', 'dental claims', 'dental insurance claim', '837D', 'claim attachments'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The ADA dental claim form is the standard document a dental office uses to ask a dental plan to pay for treatment.</strong> The American Dental Association maintains it, the current paper version is dated 2024, and nearly every dental carrier in the United States accepts it. Most offices now send the same information electronically as an 837D transaction, but the paper form is still the clearest way to understand what a carrier needs before it will pay.</p>

<p>This guide explains what a dental claim is, what each part of the ADA form is for, how the electronic version relates to it, which mistakes cause the most rejections, and when paper still makes sense. If you would rather have someone else handle claim creation and follow-up, our <a href="/services/dental-claims-processing/">Dental Claims Management</a> service does that work inside your own practice software.</p>

<h2>What is a dental claim?</h2>
<p>A dental claim is a formal request to a patient's dental benefit plan to pay its share of the cost of services the dentist provided. It tells the carrier who the patient and subscriber are, which procedures were done (as CDT codes), on which teeth, on what dates, at what fee, and which dentist did the work. The carrier applies frequency limits, deductibles, maximums and fee schedules, then returns an explanation of benefits (EOB) or electronic remittance (ERA) showing what it paid and why.</p>
<p>The same form also handles a predetermination, or pre-treatment estimate, where the office lists planned procedures with no dates of service and the carrier estimates what it would pay.</p>

<h2>Who maintains the ADA dental claim form?</h2>
<p>The ADA's Council on Dental Benefit Programs is responsible for the content of both the paper and electronic dental claim, and ADA staff maintain the paper form and its completion instructions. ADA policy is that the paper form's data content must line up with the HIPAA standard electronic dental claim, so the fields you see on paper map closely to what goes out electronically.</p>
<p>The 2024 version added a few fields that matter in daily billing: a payer ID for the primary plan and for any other plan, the date of the patient's last scaling and root planing, and an indicator for treatment delivered by a locum tenens (temporary substitute) dentist. The form itself is copyrighted, so offices should buy printed forms through the ADA or an authorized supplier rather than photocopying a downloaded sample.</p>

<h2>What are the main sections of the ADA dental claim form?</h2>
<p>The ADA groups the numbered items into related blocks. Most rejections trace back to one of them.</p>
<ul>
<li><strong>Header.</strong> Tells the carrier what kind of submission this is: a claim for completed services, a predetermination request, or a Medicaid EPSDT claim. It also holds any predetermination number the carrier already issued.</li>
<li><strong>Dental plan information.</strong> The name, address and payer ID of the plan receiving the claim. For a secondary claim, this is the secondary carrier.</li>
<li><strong>Other coverage.</strong> Details of any additional dental or medical plan. When you bill the primary plan, this block describes the secondary; when you bill the secondary, it describes the primary.</li>
<li><strong>Policyholder or subscriber.</strong> The insured person's name, date of birth, subscriber ID and group number, which may not be the patient.</li>
<li><strong>Patient.</strong> The patient's name, date of birth, relationship to the subscriber and the office's own patient account number.</li>
<li><strong>Record of services.</strong> Up to ten service lines, each with a date, area of the oral cavity, tooth system, tooth number or letter, surfaces, CDT code, quantity, fee and description. Missing teeth, remarks and the total fee also live here.</li>
<li><strong>Authorizations.</strong> The patient's consent and the assignment of benefits, which tells the carrier to pay the dentist instead of the subscriber.</li>
<li><strong>Ancillary claim and treatment information.</strong> Place of treatment, whether enclosures are included, orthodontic details, whether a prosthesis is a replacement and its prior placement date, and whether treatment resulted from an accident.</li>
<li><strong>Billing dentist or dental entity.</strong> The name, address, NPI and tax ID of whoever is billing, which can be a group practice rather than the treating dentist.</li>
<li><strong>Treating dentist and treatment location.</strong> The dentist who performed the work, with their own NPI, license number and specialty code.</li>
</ul>
<p>The ADA publishes item-by-item completion instructions for the current form, including supplements on reporting tooth numbers, surfaces and areas of the oral cavity by CDT code. Those instructions are the final word whenever a carrier and your software disagree.</p>

<h2>How does the ADA claim form relate to the 837D?</h2>
<p>The 837D is the electronic version of a dental claim. HIPAA requires covered dental plans and providers who bill electronically to use the adopted X12 standard for claims, and for dentistry that standard is the X12 837 Dental transaction, which is why billers shorten it to 837D. When your practice software "sends a claim," it usually builds an 837D file from the same data you would put on the paper form and passes it to a clearinghouse, which checks it and forwards it to the carrier.</p>
<p>Because the content matches, the same errors break both formats. The difference is speed: a bad electronic claim comes back on a rejection report within a day or two, while a bad paper claim comes back by mail weeks later.</p>

<h2>What errors cause dental claims to be rejected?</h2>
<p>A rejection means the claim never entered the carrier's system because something was missing or invalid; a denial means the carrier processed it and chose not to pay. These errors cause many of both.</p>
<ol>
<li><strong>Subscriber and patient mismatches.</strong> A subscriber ID, date of birth or name spelling that does not match the carrier's file, or the patient listed as the subscriber when the plan belongs to a spouse or parent.</li>
<li><strong>Wrong payer or payer ID.</strong> Sending the claim to the wrong carrier, the wrong claims address or the wrong electronic payer ID, which is common when a plan is administered by a different company than the name on the card.</li>
<li><strong>Outdated or invalid CDT codes.</strong> HIPAA requires the version of the CDT Code in effect on the date of service, so a code deleted at the start of the year will not process on a claim for January treatment.</li>
<li><strong>Missing tooth numbers, surfaces or areas.</strong> Restorations need tooth and surface, scaling and root planing needs a quadrant, and some codes need an arch. The ADA's supplement on oral cavity reporting lists which applies to each code.</li>
<li><strong>NPI and tax ID problems.</strong> Using the treating dentist's individual (Type 1) NPI where the group's (Type 2) NPI belongs, or listing a dentist who is not yet credentialed with that plan.</li>
<li><strong>Coordination of benefits errors.</strong> Billing the secondary plan before the primary has paid, or sending a secondary claim without the primary EOB. The ADA's coordination of benefits guidance covers the order of plans.</li>
<li><strong>Fees that do not match the full fee.</strong> The ADA's completion instructions direct offices to report the dentist's full fee, not the contracted PPO fee. The carrier applies its own fee schedule.</li>
<li><strong>Missing attachments or narratives.</strong> Crowns, buildups, scaling and root planing and many surgical codes are often held or denied until x-rays, perio charts or a narrative arrive.</li>
</ol>
<p>A short pre-submission check catches most of these. Our <a href="/tools/claim-submission-checklist/">claim submission checklist</a> is a free starting point, and accurate eligibility work on the front end prevents the subscriber and payer errors before the claim is even built. That front-end work is what our <a href="/services/dental-insurance-verification/">Insurance Verification &amp; Eligibility</a> service covers.</p>

<h2>How should you handle attachments on a dental insurance claim?</h2>
<p>Attachments are the supporting records a carrier needs to judge whether a procedure meets its plan rules: radiographs, intraoral photos, periodontal charting, and a narrative that explains the clinical reason for the treatment. On the paper form, the ancillary section asks whether enclosures are included, and anything you mail must be clearly labeled with the patient and claim so it does not separate from the form.</p>
<p>The ADA recommends sending claims electronically with their attachments, because paper claims and loose x-rays are easy to lose. Carriers set their own rules on which codes need which records, so keep a per-carrier list and update it whenever a claim comes back asking for something new. A good narrative is short and specific: the tooth, what you found and why the treatment was needed.</p>

<h2>When should you use a paper ADA claim form instead of electronic?</h2>
<p>Electronic submission should be the default. It is faster, it produces rejection reports and claim status you can track, and it pairs with electronic payments. Paper still has a place in a few situations:</p>
<ul>
<li>A small or regional plan does not accept electronic claims or attachments.</li>
<li>A carrier asks for a corrected or appealed claim to be mailed with a cover letter.</li>
<li>A patient files the claim with their own plan, often for an out-of-network office, and needs a completed form to send.</li>
<li>A clearinghouse outage or enrollment gap would otherwise push a claim past the carrier's filing deadline.</li>
</ul>
<p>Whichever format you use, track every claim until it is paid or resolved. Unanswered claims are where dental A/R quietly grows, and our <a href="/services/dental-claims-processing/">dental claims management team</a> follows each one through clearinghouse reports, carrier portals and phone calls until it closes.</p>

<h2>What happens after the claim is submitted?</h2>
<p>The carrier rejects it, pends it for more information, denies it, or pays it in full or in part. Electronic remittances explain any unpaid amount with standard X12 claim adjustment reason codes. Fix and resend rejections the same week. For denials, send a corrected claim when the error was yours, or appeal when the carrier misapplied the plan. Our <a href="/services/denial-management/">Denial Management &amp; Appeals</a> service handles that decision and the follow-up, and our guide on <a href="/blog/how-to-appeal-a-denied-dental-claim/">how to appeal a denied dental claim</a> covers appeal letters in detail.</p>

<h2>Want fewer returned dental claims?</h2>
<p>If claims keep coming back for the same few reasons, <a href="/consultation/">book a free consultation</a>. We will look at a recent batch of rejected and denied claims with you, in the software you already use, and show which fields, codes or attachments are causing the most rework.</p>
`,
    faqs: [
      {
        q: 'What is the ADA dental claim form used for?',
        a: 'The ADA dental claim form is used to report dental services to a patient\'s dental benefit plan so the plan can pay its share. The same form is also used to request a predetermination, or pre-treatment estimate, before work is done. It lists the patient, subscriber, plan, CDT codes, teeth, fees and the billing and treating dentists.',
      },
      {
        q: 'What is the current version of the ADA dental claim form?',
        a: 'The current paper form is the 2024 version, maintained by the American Dental Association. It added fields for the payer ID of each plan, the date of the patient\'s last scaling and root planing, and an indicator for treatment by a locum tenens dentist. Check the ADA website for the latest completion instructions before updating your software or printed stock.',
      },
      {
        q: 'Is the 837D the same as the ADA claim form?',
        a: 'They carry the same information in different formats. The 837D is the HIPAA standard electronic dental claim, an X12 transaction your practice software builds and sends through a clearinghouse. The ADA paper form is designed so its content lines up with that electronic standard. Most dental claims today go out as 837D files rather than on paper.',
      },
      {
        q: 'Should I put my full fee or my PPO fee on a dental claim?',
        a: 'Report your full office fee. The ADA completion instructions direct offices to list the dentist\'s full fee for each procedure, and the carrier then applies the contracted fee schedule when it processes the claim. Putting the PPO fee on the claim can distort your fee history with carriers and make write-offs harder to reconcile during payment posting.',
      },
      {
        q: 'Why was my dental insurance claim rejected instead of denied?',
        a: 'A rejection means the claim failed basic checks and never entered the carrier\'s processing system, usually because of a wrong subscriber ID, payer ID, NPI, date of birth or invalid code. A denial means the carrier processed the claim and chose not to pay. Rejections are fixed and resent; denials are corrected or appealed depending on the reason.',
      },
    ],
    sources: [S.adaClaimForm, S.adaClaimInstructions, S.adaClaimDelays, S.adaRejections, S.cmsTransactions, S.x12Carc],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'caqh-proview-for-dentists',
    title: 'ADA CAQH ProView for Dentists: Setup, Re-Attestation and Common Mistakes',
    seoTitle: 'ADA CAQH ProView for Dentists: Setup and Re-Attestation',
    metaDescription:
      'How the ADA CAQH credentialing service works for dentists: who can use it, how to set up and re-attest your profile, what documents you need and what to avoid.',
    excerpt:
      'A step-by-step guide to the ADA credentialing service powered by CAQH: what it is, why dental plans use it, how to set up and re-attest a profile, and the mistakes that slow dental credentialing down.',
    category: 'Practice Management',
    tags: ['ADA CAQH', 'CAQH ProView', 'dental credentialing', 'dentist credentialing', 'provider enrollment'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>The ADA CAQH credentialing service lets a dentist enter professional and practice information once and share it with the dental plans they choose.</strong> It is run through a partnership between the American Dental Association and CAQH, and dentists reach their CAQH profile by logging in with their ADA account. Many dental carriers use it in place of, or alongside, their own paper applications, so a complete and current profile is a basic part of dental credentialing.</p>

<p>One naming note before we start. Most offices still call the profile "CAQH ProView." In June 2026, CAQH rebranded as DataSpring, powered by CAQH, and the profile tool is now called the CAQH Provider Data Portal. The ADA says service continued without interruption, and the ADA login still works the same way. This guide uses "CAQH ProView" and "CAQH profile" interchangeably. If you want help keeping profiles and carrier enrollments current, our <a href="/services/dental-credentialing/">Dental Credentialing &amp; Provider Enrollment</a> service handles that work.</p>

<h2>What is CAQH ProView for dentists?</h2>
<p>CAQH ProView is a central, online profile where a provider self-reports the information health plans need for credentialing: identity, licenses, education, practice locations, malpractice coverage, NPI and similar details. The provider attests that the information is accurate, then authorizes specific plans, or all participating plans, to view it. Plans use the data for credentialing and re-credentialing, provider directories and other administrative work.</p>
<p>For dentists, the same idea works through the ADA. The profile itself lives with CAQH (now DataSpring); the ADA account is the door you walk through to reach it.</p>

<h2>What is the relationship between the ADA and CAQH?</h2>
<p>The ADA and CAQH formed an alliance in 2017 to simplify credentialing for dentists, dental plans and employers. Under that arrangement, the ADA credentialing service is powered by CAQH, and select information from a dentist's My ADA account can prefill their CAQH profile. The ADA describes the current version the same way: the ADA and DataSpring work together so dentists can enter their data once and send it to the participating dental plans and organizations they pick.</p>
<p>A few points about the ADA CAQH arrangement often surprise dental offices:</p>
<ul>
<li><strong>ADA membership is not required.</strong> Any U.S. licensed dentist can use the ADA credentialing service, member or not.</li>
<li><strong>It is free for dentists.</strong> The ADA states there is no charge to dentists for the service.</li>
<li><strong>Dentists start at the ADA, not at CAQH.</strong> Dentists register and log in through ada.org/credentialing. If a dentist tries to self-register directly in the Provider Data Portal, the system sends them back to the ADA site.</li>
<li><strong>The dentist must use their own login.</strong> The ADA says office managers and other staff should not create their own ADA accounts to reach a dentist's profile. Staff who manage credentialing for several dentists have a separate practice manager tool, covered below.</li>
</ul>

<h2>Why do dental carriers use CAQH?</h2>
<p>Credentialing asks for the same core facts every time: who you are, where you are licensed, where you practice, what insurance you carry and whether anything in your history needs review. Without a shared profile, a dentist joining five PPO networks fills out five versions of the same application. With one, each plan pulls the attested data from a single source, and the dentist only updates it in one place. Plans also gain a regular re-attestation cycle that keeps the data fresher than an application filed years ago.</p>
<p>Keep one limit in mind. A complete CAQH profile is not the same as being in network. Each carrier still runs its own credentialing review, may ask for its own forms, and issues its own agreement and effective date. The profile removes repeated paperwork; it does not replace enrollment with each plan. Our <a href="/carriers/">carrier pages</a> describe what to expect from several major dental plans.</p>

<h2>How does a dentist set up an ADA CAQH profile?</h2>
<p>The ADA and DataSpring guides describe a straightforward sequence. The ADA estimates that new users spend about one to two hours completing a first profile.</p>
<ol>
<li><strong>Gather documents first.</strong> Use the checklist in the next section so you can finish in one sitting.</li>
<li><strong>Log in at ada.org/credentialing.</strong> Members use their existing ADA email and password. Non-members also have an ADA account and can recover the username and set a password through the ADA's forgot username and forgot password pages.</li>
<li><strong>Accept the terms and conditions.</strong> After login, the ADA credentialing service terms appear. Accepting them sends you to the Provider Data Portal.</li>
<li><strong>Review prefilled information.</strong> Some details from My ADA, or from a past attestation, may already be filled in. Confirm each one rather than assuming it is right.</li>
<li><strong>Complete every required section and upload documents.</strong> Licenses, malpractice certificate and any other required files go in at this step.</li>
<li><strong>Authorize plans.</strong> Choose which organizations may view your data. The ADA and DataSpring both recommend the global option so every participating plan can credential or re-credential you without delay.</li>
<li><strong>Attest.</strong> Confirm the profile is accurate and sign the authorization, attestation and release documents. Incomplete drafts can be saved, but plans cannot view a profile until it is attested.</li>
</ol>

<h2>What documents do dentists need for CAQH?</h2>
<p>The ADA's credentialing checklist lists the core items:</p>
<ul>
<li>State dental license number or numbers</li>
<li>A digital copy of your professional liability (malpractice) insurance</li>
<li>Practice location details</li>
<li>Education and training history</li>
<li>Your individual NPI (you can confirm it on the <a href="/tools/npi-lookup/">NPI lookup tool</a>)</li>
</ul>
<p>Depending on your practice and state, you may also need hospital affiliation details, an anesthesia permit or license, DEA and state controlled substance registrations, Medicare and Medicaid numbers, and BLS or ACLS certification. Some states ask for more. Keep scanned copies of each in one secure folder with expiration dates noted, because the same files are needed again for every carrier. Our free <a href="/tools/credentialing-checklist/">credentialing checklist</a> covers the wider enrollment packet.</p>

<h2>How often do dentists have to re-attest CAQH?</h2>
<p>Every 120 days. The portal is designed to require every provider, dentists included, to re-attest on that cycle, and DataSpring sends email reminders about upcoming due dates, expiring documents and required uploads. Re-attesting does not mean re-entering everything. You review the profile, update anything that changed, upload renewed documents and confirm. The ADA says returning dentists typically finish in five to ten minutes.</p>
<p>Missing the window matters. When a profile lapses, plans may not be able to use it for credentialing or re-credentialing, which can delay a new enrollment or flag an existing one. Put the next attestation date on the office calendar the day you finish the current one.</p>

<h2>Can an office manager handle dentist credentialing in CAQH?</h2>
<p>Yes, within limits. DataSpring offers a practice manager module for office managers and administrators who gather credentialing information for several dentists. The manager fills in shared sections once, such as practice locations, hospital affiliations, liability insurance and the credentialing contact, then exports that data to each dentist on the practice's list. Each dentist still logs into their own profile, reviews and imports the data, completes the authorization section, uploads required documents and attests personally. This split works well for group practices and DSOs, where a single location change can touch a dozen profiles.</p>

<h2>What are the most common CAQH mistakes dentists make?</h2>
<ul>
<li><strong>Letting attestation lapse.</strong> The most common problem, and the easiest to prevent with a calendar reminder.</li>
<li><strong>Expired documents.</strong> A renewed license or malpractice policy that never got uploaded stalls credentialing even when the attestation is current.</li>
<li><strong>Not authorizing plans.</strong> A complete profile that no plan is allowed to see does nothing. Check the authorization setting, or use the global option.</li>
<li><strong>Mismatched details.</strong> Practice names, addresses, tax IDs or NPIs in CAQH that do not match the carrier application or your claims lead to delays and, later, claim problems.</li>
<li><strong>Staff using a dentist's login.</strong> The ADA is clear that dentists log in themselves. Use the practice manager tool for shared work.</li>
<li><strong>Treating CAQH as the finish line.</strong> The profile supports enrollment; it does not complete it. Track each carrier application separately until you have an effective date.</li>
</ul>
<p>Our <a href="/services/dental-credentialing/">dental credentialing team</a> tracks attestation dates, document expirations and carrier applications for each dentist, so a lapsed profile does not quietly hold up payments.</p>

<h2>Need help with dentist credentialing?</h2>
<p>If you are adding a new associate, opening a location or cleaning up stalled carrier applications, <a href="/consultation/">book a free consultation</a>. We will review where each dentist stands with CAQH and with each plan, and list the steps needed to get everyone enrolled.</p>
`,
    faqs: [
      {
        q: 'Do I need to be an ADA member to use the ADA CAQH credentialing service?',
        a: 'No. The ADA states that any U.S. licensed dentist can use the ADA credentialing service, whether or not they are an ADA member, and that the service is free for dentists. Non-members still log in with an ADA account, which they can recover through the ADA website using the forgot username and forgot password pages.',
      },
      {
        q: 'Is CAQH ProView now called something else?',
        a: 'Yes. In June 2026, CAQH rebranded as DataSpring, powered by CAQH, and the profile tool is now called the CAQH Provider Data Portal. The ADA reports that service continued without interruption. Many dental offices and carriers still say "CAQH ProView," so you will see both names during dental credentialing for some time.',
      },
      {
        q: 'How often do dentists need to re-attest their CAQH profile?',
        a: 'Every 120 days. DataSpring sends email reminders before the due date and when documents are about to expire. Re-attesting means reviewing the profile, updating anything that changed and confirming it is accurate. The ADA says returning dentists usually finish in five to ten minutes, so it is worth doing as soon as the reminder arrives.',
      },
      {
        q: 'Does a complete CAQH profile mean I am in network with a dental plan?',
        a: 'No. CAQH gives plans a verified, current set of your professional data, but each dental carrier still runs its own credentialing review, may require its own application, and issues its own participation agreement and effective date. Track each carrier application separately until you receive written confirmation of your effective date and fee schedule.',
      },
      {
        q: 'Can my office manager complete my CAQH profile for me?',
        a: 'Partly. Office managers can use DataSpring\'s practice manager module to enter shared information, such as locations and liability insurance, and export it to the dentists they support. The dentist must still log in with their own ADA account, review the data, authorize plans, upload documents and attest. Staff should not create their own ADA accounts to access a dentist\'s profile.',
      },
    ],
    sources: [S.adaCredentialing, S.adaCredChecklist, S.adaCredDentistGuide, S.adaCredPracticeManager, S.caqhAdaAlliance, S.nppes],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'dental-insurance-biller',
    title: 'What Does a Dental Insurance Biller Do? Duties, Skills and Hiring Tips',
    seoTitle: 'What Does a Dental Insurance Biller Do? Duties and Skills',
    metaDescription:
      'What a dental insurance biller does each day, the skills the job needs, how an in-house biller compares with an outsourced team and what to ask before hiring.',
    excerpt:
      'A clear look at the dental insurance biller role: the daily work, the skills that matter, how an in-house biller compares with a dental billing company, and the questions to ask either one.',
    category: 'Practice Management',
    tags: ['dental insurance biller', 'dental insurance billing', 'dental billing company', 'dental billing outsourcing', 'hiring'],
    readingMinutes: 6,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A dental insurance biller is the person who turns completed dentistry into insurance payments.</strong> They build and send claims to dental carriers, attach the records carriers ask for, post what comes back, chase what does not, and fix or appeal what gets denied. In a small office the dental insurance biller may also verify benefits and answer patient balance questions. In a larger practice or DSO the job is often split across several people or handed to an outside team.</p>

<p>This guide covers what the role looks like day to day, which skills separate a strong biller from an average one, how an in-house biller compares with an outsourced dental billing team, and what to ask before you hire either. For a wider view of the whole process, see our overview of <a href="/services/dental-billing/">dental billing services</a>.</p>

<h2>What does a dental insurance biller do each day?</h2>
<p>Most of the job is a repeating loop: get claims out clean, get payments in correctly, and make sure nothing sits unanswered. A typical day includes some mix of the following.</p>
<h3>Claim creation and submission</h3>
<p>The biller reviews the day's completed procedures, checks that CDT codes, tooth numbers, surfaces and quadrants are complete, confirms the right plan is billed first, and sends claims through the clearinghouse. They review the clearinghouse rejection report and fix anything that bounced, usually the same day.</p>
<h3>Attachments and narratives</h3>
<p>Crowns, buildups, scaling and root planing, extractions and many other codes need x-rays, perio charts, photos or a narrative. The biller knows which carriers want what, pulls the right images from the chart and writes or edits a short narrative the carrier's reviewer can follow.</p>
<h3>Payment posting</h3>
<p>EOBs and ERAs arrive daily. The biller posts each payment to the correct procedures, enters contractual write-offs at the PPO fee, moves the patient portion to the patient, and flags anything that looks underpaid compared with the fee schedule.</p>
<h3>Claim follow-up and A/R</h3>
<p>Claims with no response after a set number of days get a status check through the carrier portal or a phone call. The biller works the aging report by age and dollar amount so that old claims do not slip past filing limits.</p>
<h3>Denials, corrections and appeals</h3>
<p>Each denial gets a decision: resend with an attachment, send a corrected claim, appeal, or transfer to the patient when the plan truly does not cover it. Reading the reason codes on the remittance is a core part of the job.</p>
<h3>Verification and patient questions</h3>
<p>In many offices the biller also checks eligibility and benefits before appointments and explains balances when patients call. That front-end work prevents many of the denials the biller would otherwise work later.</p>

<h2>How does the biller work with the rest of the dental team?</h2>
<p>Billing depends on information other people create. The front desk enters subscriber details and verifies benefits. The dentist and hygienists chart procedures, take the x-rays and write the clinical notes that become narratives. The treatment coordinator presents estimates that set the patient's expectations. When any of those steps is rushed, the biller inherits the problem as a rejection, a request for records or a balance the patient disputes.</p>
<p>Strong billers close that loop. They tell the front desk which carriers keep returning eligibility errors, ask clinicians for the specific records a carrier wants, and share a short list of repeat denial reasons at team meetings. Our <a href="/services/payment-posting/">Payment Posting</a> and <a href="/services/dental-accounts-receivable/">Accounts Receivable (A/R) Management</a> services are built to support that same feedback loop.</p>

<h2>What skills does a good dental insurance biller need?</h2>
<ul>
<li><strong>Dental plan knowledge.</strong> Frequency limits, waiting periods, annual maximums, downgrades and alternate benefits, missing tooth clauses, and the difference between PPO, DHMO, indemnity and Medicaid dental plans.</li>
<li><strong>CDT coding fluency.</strong> Knowing which codes need tooth numbers, surfaces or quadrants, which commonly need attachments, and that the code set changes every January.</li>
<li><strong>Coordination of benefits.</strong> Which plan is primary for a patient with two dental plans, and how to bill the secondary with the primary EOB.</li>
<li><strong>Software skill.</strong> Working fluently in the practice's system, whether Open Dental, Dentrix or Eaglesoft, plus the clearinghouse and carrier portals.</li>
<li><strong>Reading remittances.</strong> Understanding EOB wording and the standard claim adjustment reason codes on ERAs well enough to tell a fixable error from a plan limit.</li>
<li><strong>Persistence and organization.</strong> Following up on the same claim three or four times without losing track, and keeping notes another person could pick up.</li>
<li><strong>Clear writing.</strong> Narratives and appeal letters that a carrier reviewer can understand in one read.</li>
<li><strong>Privacy habits.</strong> Handling patient information carefully, using only the minimum needed, and following the office's security practices.</li>
</ul>

<h2>What dental billing training options are available?</h2>
<p>Most dental insurance billers learn on the job, but structured dental billing training speeds that up and fills gaps. Useful options include:</p>
<ul>
<li><strong>The ADA's own references.</strong> The current CDT manual, the ADA dental claim form completion instructions and the ADA's dental insurance resources are the primary sources a biller should know how to use.</li>
<li><strong>Software vendor training.</strong> Practice management vendors typically publish help articles, videos and classes on their billing, posting and claims modules. Training in the exact system your office uses pays off quickly.</li>
<li><strong>Clearinghouse and carrier materials.</strong> Clearinghouses and dental carriers usually post provider guides on rejection reports, attachments and portal tools.</li>
<li><strong>Courses and continuing education.</strong> Dental associations, study clubs and private educators offer workshops and online classes on coding and insurance.</li>
</ul>
<p>Before paying for any dental billing training course, check that it teaches the current CDT version, covers dental plan rules such as frequency limits and coordination of benefits, and includes hands-on practice with real EOBs rather than only definitions.</p>

<h2>Should you hire an in-house biller or outsource dental insurance billing?</h2>
<p>Both models work, and plenty of practices use a mix. The right answer depends on your claim volume, how much your team already knows, and how much management time you can give the billing function.</p>
<table>
<thead><tr><th>Factor</th><th>In-house dental insurance biller</th><th>Outsourced dental billing team</th></tr></thead>
<tbody>
<tr><td>Presence</td><td>In the office, can walk to the chair and ask the dentist about a narrative</td><td>Remote, works through your software, messages and scheduled check-ins</td></tr>
<tr><td>Coverage</td><td>One person; vacations, sick days and turnover create gaps</td><td>A team, so work continues when one person is out</td></tr>
<tr><td>Knowledge</td><td>Deep knowledge of your patients and doctors</td><td>Broad exposure to many carriers and denial patterns</td></tr>
<tr><td>Management</td><td>You hire, train and supervise</td><td>You manage a vendor relationship and review reports</td></tr>
<tr><td>Data access</td><td>Employee access under your policies</td><td>Requires a business associate agreement before any patient data is shared</td></tr>
<tr><td>Flexibility</td><td>Fixed capacity</td><td>Can usually scale with claim volume or a backlog project</td></tr>
</tbody>
</table>
<p>A common hybrid keeps verification, treatment presentation and patient conversations in the office and sends claims, posting, A/R follow-up and denials to an outside team. Our comparison of <a href="/blog/in-house-vs-outsourced-dental-billing/">in-house vs. outsourced dental billing</a> goes deeper on the tradeoffs, and the <a href="/tools/outsourcing-vs-in-house-billing-calculator/">outsourcing vs. in-house billing calculator</a> lets you plug in your own staffing figures.</p>
<p>Under HIPAA, an outside billing company that handles patient information on your behalf is generally a business associate, which means a signed business associate agreement must be in place before it accesses any records. Ask to see that agreement early in any conversation with a dental billing company.</p>

<h2>What should you ask when hiring a dental insurance biller?</h2>
<p>Whether you are interviewing a person or a company, the questions are similar. Ask for specific examples, not general statements.</p>
<ol>
<li><strong>Which dental software have you worked in, and for how long?</strong> Ask them to walk through how they would post a partial payment with a write-off in your system.</li>
<li><strong>How do you decide what attachments a claim needs?</strong> Listen for carrier-specific knowledge rather than "we send x-rays with everything."</li>
<li><strong>How do you work the A/R aging report?</strong> A good answer covers order of priority, follow-up intervals and how notes are kept.</li>
<li><strong>Walk me through a denial you overturned.</strong> Look for how they found the reason, what they sent and how they followed up.</li>
<li><strong>How do you handle coordination of benefits?</strong> Ask about a child covered by both parents' dental plans.</li>
<li><strong>What reports will I see, and how often?</strong> At minimum: claims sent, payments posted, aging by bucket and carrier, and denials by reason.</li>
<li><strong>For a company: who exactly works on my account?</strong> Ask about the team, backup coverage, how they access your systems, and the business associate agreement.</li>
</ol>
<p>Our article on <a href="/blog/how-to-choose-a-dental-billing-company/">how to choose a dental billing company</a> has a longer checklist for evaluating outside teams.</p>

<h2>How do you know your dental insurance billing is working?</h2>
<p>Watch a few numbers every month: how much insurance A/R is older than 90 days, how many claims are rejected or denied on first submission, how long claims take to pay, and whether collections keep pace with production after PPO write-offs. Trends matter more than any single month. If the numbers drift, the cause is usually a specific step, such as verification, attachments or follow-up, rather than the whole process. The <a href="/tools/dental-ar-aging-calculator/">dental A/R aging calculator</a> and <a href="/tools/dental-denial-rate-calculator/">dental denial rate calculator</a> are quick ways to set a baseline.</p>

<h2>Thinking about adding billing help?</h2>
<p>Whether you are replacing a biller who left, adding support for a growing practice or weighing dental billing outsourcing for the first time, <a href="/consultation/">book a free consultation</a>. We will look at your current claims, posting and aging with you and talk through which setup fits your office.</p>
`,
    faqs: [
      {
        q: 'What is the difference between a dental insurance biller and a dental office manager?',
        a: 'A dental insurance biller focuses on getting insurance claims paid: building and sending claims, attachments, payment posting, follow-up and denials. An office manager oversees the whole front office, including scheduling, staffing, patient experience and often the billing function. In smaller practices one person may do both, which is a common reason billing tasks fall behind during busy weeks.',
      },
      {
        q: 'Does a dental insurance biller need a certification?',
        a: 'No single certification is required to work as a dental insurance biller. Practices usually care more about hands-on experience with dental carriers, CDT coding, the practice\'s software and denial follow-up. Ask candidates to show their skills with real examples, such as posting a complex EOB or explaining how they would appeal a frequency denial.',
      },
      {
        q: 'Is it better to outsource dental insurance billing?',
        a: 'It depends on your practice. Outsourcing gives you a team with backup coverage and broad carrier experience, while an in-house biller offers close contact with your dentists and patients. Many offices combine the two, keeping verification and patient conversations in house and outsourcing claims, posting and follow-up. Compare both against your claim volume and management time.',
      },
      {
        q: 'What should a dental billing company provide before it starts?',
        a: 'A dental billing company should sign a business associate agreement before accessing any patient data, explain exactly who will work on your account and how they will access your software, and agree on which tasks it owns and which stay with your team. It should also describe the reports you will receive and how often you will review them together.',
      },
    ],
    sources: [S.adaInsurance, S.adaClaimForm, S.adaCob, S.x12Carc, S.hhsBa, S.cmsTransactions],
  },
];
