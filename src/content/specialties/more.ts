import type { Specialty } from '../types';

/**
 * Additional medical specialties (keyword plan, 2026-10-13): ABA therapy,
 * optometry, laboratory, DME suppliers and telehealth.
 * CPT and HCPCS code numbers appear only in passing; descriptors are never reproduced.
 */
export const moreSpecialties: Specialty[] = [
  /* ------------------------------------------------------------------ */
  /*  ABA therapy                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: 'aba-therapy',
    name: 'ABA Therapy',
    kind: 'medical',
    icon: 'Puzzle',
    summary:
      'Billing support for applied behavior analysis providers who manage authorized units, supervision rules and payer-specific credentialing.',
    definition:
      'ABA therapy billing services cover the claims side of applied behavior analysis: tracking authorized units by code and date range, billing timed adaptive behavior services in 15-minute units, matching each session to the right rendering and supervising clinician, and following payer-specific rules for BCBAs, assistant behavior analysts and registered behavior technicians across commercial and Medicaid plans.',
    intro: [
      'Applied behavior analysis is usually delivered in long, frequent sessions over many months, which means a single client can generate dozens of claim lines every week. Each of those lines has to fit inside an authorization that specifies codes, units and dates, and each has to be tied to a clinician the payer recognizes.',
      'The rules are not uniform. Commercial plans, Medicaid programs and Medicaid managed care organizations differ on whether behavior technicians are credentialed individually, which modifiers identify the clinician level, how supervision must be documented and whether two codes can be billed for overlapping time. State autism insurance mandates add another layer that depends on how the employer plan is funded.',
      'Our work is designed to keep authorizations, session data and claims in step: verifying ABA benefits up front, tracking units used against units approved, checking clinician and modifier details before claims go out, and following up on unit, supervision and credentialing denials before they pile up.',
    ],
    challenges: [
      {
        title: 'Authorizations measured in units',
        detail:
          'ABA authorizations typically approve a number of units per code for a defined period, often tied to a treatment plan that must be updated and resubmitted on a payer schedule. Sessions billed after units run out, after the end date or under a code that was not approved are commonly denied.',
      },
      {
        title: 'Timed codes and session data',
        detail:
          'Adaptive behavior treatment codes such as 97153 and 97155 are reported in 15-minute units, so start and stop times, total minutes and the payer\'s unit conversion rules decide what can be billed. Session notes that do not match the billed time create audit and recoupment risk.',
      },
      {
        title: 'BCBA, BCaBA and RBT roles',
        detail:
          'Payers handle clinician levels differently. Some require each registered behavior technician to be enrolled, others bill technician services under the supervising BCBA, and many Medicaid programs use modifiers to identify the credential level. Getting this wrong on the claim can deny an entire week of sessions.',
      },
      {
        title: 'Supervision and concurrent billing rules',
        detail:
          'Supervision expectations come from the Behavior Analyst Certification Board, state rules and payer policy. Whether a supervising analyst can bill protocol modification while a technician is billing direct treatment for the same minutes varies by payer, and some plans prohibit it outright.',
      },
      {
        title: 'Mandates, plan funding and Medicaid coverage',
        detail:
          'Every state has some form of autism insurance mandate, but scope, age limits and covered services differ, and self-funded employer plans are generally not subject to state mandates. Medicaid covers ABA for eligible children through EPSDT, with state-specific rules and managed care requirements.',
      },
    ],
    payerWorkflow: [
      'Benefits checks confirm ABA coverage, whether the plan is fully insured or self-funded, any age or visit limits, and the payer\'s authorization and diagnosis documentation requirements.',
      'Initial assessment and treatment plan authorizations are requested first, then treatment authorizations listing codes, units and dates are recorded in the billing system for unit tracking.',
      'Session data from the practice management or ABA data platform is reconciled against notes for times, rendering clinician, supervising clinician and place of service before claims are created.',
      'Claims are checked for authorization number, unit totals, clinician-level modifiers where the payer requires them and payer rules on overlapping codes.',
      'Re-authorization dates are tracked ahead of time so updated treatment plans and progress reports reach the payer before current units expire.',
      'Denials for exhausted units, missing authorization or non-enrolled rendering clinicians are worked by correcting the claim, updating enrollment or requesting retro review where the payer allows it.',
    ],
    services: [
      'prior-authorization',
      'benefits-verification',
      'medical-credentialing',
      'provider-enrollment',
      'claims-scrubbing',
      'denial-management',
      'aging-ar-follow-up',
      'medical-billing',
    ],
    faqs: [
      {
        q: 'What do ABA therapy billing services include?',
        a: 'ABA therapy billing services usually include benefits verification, authorization tracking by code and unit, claim creation from session data, payer-specific modifier and clinician checks, payment posting and denial follow-up. Credentialing support for BCBAs and, where payers require it, behavior technicians is often part of the work, since claims for non-enrolled clinicians are commonly denied.',
      },
      {
        q: 'Do registered behavior technicians need to be credentialed with payers?',
        a: 'It depends on the payer. Some commercial plans and Medicaid programs require each RBT to be enrolled or registered, while others allow technician services to be billed under the supervising BCBA with modifiers identifying the technician level. Checking each payer\'s policy before an RBT starts sessions helps avoid denials for an unrecognized rendering clinician.',
      },
      {
        q: 'Why are ABA claims denied for units?',
        a: 'Unit denials usually happen because sessions exceeded the units authorized for that code, fell outside the authorization dates, or were converted from minutes to units differently than the payer expects. Tracking units used against units approved each week, and requesting more units before they run out, is the most reliable way to prevent this.',
      },
      {
        q: 'Do state autism mandates require every plan to cover ABA?',
        a: 'No. All states have some form of autism insurance mandate, but they apply mainly to fully insured plans regulated by the state, and their age limits and coverage details vary. Self-funded employer plans are generally governed by federal law instead, so they may or may not cover ABA. Verifying the plan type is an early step in every intake.',
      },
      {
        q: 'Can a BCBA and an RBT bill for the same session time?',
        a: 'Some payers allow a supervising analyst to bill protocol modification while a technician bills direct treatment for overlapping time, and others do not. Medicaid programs and commercial plans publish their own rules, and they change. Confirm the payer\'s current policy and make sure both notes clearly document each clinician\'s separate activity before billing concurrent codes.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'credentialing-checklist', 'denial-rate-calculator', 'days-in-ar-calculator'],
    seoTitle: 'ABA Therapy Billing Services | Texas Solutions RCM',
    metaDescription:
      'ABA therapy billing services for authorization units, timed codes, BCBA and RBT supervision and credentialing, payer-specific rules and autism mandates.',
    keywords: [
      'ABA therapy billing services',
      'ABA billing',
      'applied behavior analysis billing',
      'ABA authorization units',
      'RBT credentialing',
      'BCBA supervision billing',
      'autism insurance mandate billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Optometry                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: 'optometry',
    name: 'Optometry',
    kind: 'medical',
    icon: 'Glasses',
    summary:
      'Billing support for optometry practices that bill vision plans and medical insurance, sell eyewear and manage medical eye visits.',
    definition:
      'Optometry billing services handle two separate payer worlds: routine vision plans that cover eye exams, refractions, frames, lenses and contacts, and medical insurance that covers diagnosis and treatment of eye conditions. The work involves choosing the right payer for each visit, billing materials with HCPCS V codes, collecting refraction fees and documenting medical eye care.',
    intro: [
      'An optometry practice may see a patient for a routine exam and new glasses in the morning and for a red eye, a diabetic eye exam or glaucoma monitoring in the afternoon. The first visit usually belongs to a vision plan; the second belongs to the patient\'s medical insurance. Many patients carry both, and the reason for the visit decides which one is billed.',
      'Vision plans have their own eligibility checks, authorization numbers, materials allowances and lab ordering rules, while medical plans follow standard claim, coding and documentation rules. Refraction is a frequent friction point because Medicare and many medical plans do not cover it, so it often becomes a patient charge.',
      'Optometry is distinct from ophthalmology billing: surgery and global periods are rare, and the volume of materials, vision plan claims and retail sales is much higher. Our work is designed to route each visit to the right payer, keep material claims and patient balances accurate, and follow up on medical eye care claims that need attention.',
    ],
    challenges: [
      {
        title: 'Vision plan or medical insurance',
        detail:
          'A visit for a routine eye exam and glasses is usually billed to the vision plan, while a visit for symptoms or a diagnosed condition such as diabetes, glaucoma or an eye infection is usually medical. The chief complaint and documented findings decide, and switching payers after the fact often requires corrected claims.',
      },
      {
        title: 'Refraction as a non-covered service',
        detail:
          'Refraction is typically covered by vision plans but not by Medicare or many medical plans. When it is performed during a medical visit, the practice usually collects it from the patient under its financial policy, and patients need to hear that before the exam rather than after.',
      },
      {
        title: 'Eyewear and materials billing',
        detail:
          'Frames, lenses, lens options and contact lenses are billed with HCPCS V codes or plan-specific material codes, each with allowances, copays and overage rules. Lab orders, remakes and warranty claims need to stay tied to the right claim so materials are not given away or billed twice.',
      },
      {
        title: 'Eye exam codes versus E/M codes',
        detail:
          'Optometrists can report medical eye visits with general ophthalmological service codes such as 92004 or 92014, or with E/M codes, depending on documentation and payer policy. Each set has its own requirements, and choosing the one the record supports avoids downcoding and denials.',
      },
      {
        title: 'Medicare post-cataract eyewear and diagnostic testing',
        detail:
          'Medicare generally covers one pair of eyeglasses or contact lenses after cataract surgery with an intraocular lens, with specific supplier and modifier rules. Diagnostic tests such as visual fields and retinal imaging need medical necessity support and frequency awareness under local coverage policies.',
      },
    ],
    payerWorkflow: [
      'At scheduling, staff capture the reason for the visit and both vision and medical coverage so the visit can be routed to the correct payer.',
      'Vision plan eligibility and authorizations are obtained through the plan portal, including exam, materials and contact lens benefits and frequency dates.',
      'Medical eye visits are coded from the record with diagnosis codes that support any testing, and refraction is handled as a separate line under the payer\'s rules and the practice\'s financial policy.',
      'Materials are billed to the vision plan or medical plan as appropriate, with lab orders and patient overages reconciled against the claim.',
      'Payments, vision plan remittances and patient eyewear balances are posted separately so materials receivables can be tracked.',
      'Denials for frequency, missing authorization or non-covered refraction are reviewed to decide whether to correct the payer, bill the patient or appeal.',
    ],
    services: [
      'insurance-eligibility-verification',
      'medical-billing',
      'medical-coding',
      'payment-posting',
      'patient-billing',
      'denial-management',
      'patient-financial-communication',
    ],
    faqs: [
      {
        q: 'What do optometry billing services cover?',
        a: 'Optometry billing services cover routing each visit to the vision plan or medical insurance, verifying both benefits, billing exams and materials, coding medical eye visits and diagnostic tests, posting payments and following up on denials. They also include handling refraction charges and eyewear balances that become patient responsibility under the plan or the practice\'s financial policy.',
      },
      {
        q: 'When should an eye exam be billed to medical insurance instead of a vision plan?',
        a: 'An eye exam is usually billed to medical insurance when the visit is for symptoms, an injury or management of a diagnosed condition such as diabetes, glaucoma or cataracts. Routine exams for vision correction usually go to the vision plan. The documented reason for the visit should support the payer choice, and payer contracts may add specific rules.',
      },
      {
        q: 'Does Medicare pay for refraction?',
        a: 'No, Medicare treats refraction as a non-covered service, so it is not paid even when performed during a covered medical eye exam. Practices generally collect the refraction fee from the patient, and an advance beneficiary notice is not required for statutorily excluded services, though a clear written notice helps patients understand the charge.',
      },
      {
        q: 'How are glasses and contact lenses billed?',
        a: 'Glasses and contact lenses are usually billed to a vision plan using the plan\'s materials codes or HCPCS V codes, subject to allowances, copays and frequency limits. Amounts above the allowance become patient balances. Medicare covers eyewear only in limited situations, mainly after cataract surgery with an intraocular lens.',
      },
    ],
    relatedTools: ['hcpcs-code-lookup', 'payer-mix-calculator', 'patient-balance-calculator', 'denial-rate-calculator'],
    seoTitle: 'Optometry Billing Services | Texas Solutions RCM',
    metaDescription:
      'Optometry billing services for vision plans and medical insurance, refraction fees, eyewear and materials claims, and coding of medical eye visits.',
    keywords: [
      'optometry billing services',
      'optometry billing',
      'vision plan billing',
      'medical vs vision insurance billing',
      'refraction billing',
      'eyewear materials billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Laboratory                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'laboratory',
    name: 'Laboratory',
    kind: 'medical',
    icon: 'FlaskConical',
    summary:
      'Billing support for clinical laboratories handling CLIA details, requisition data, medical necessity checks and high claim volumes.',
    definition:
      'Laboratory billing services turn test orders into payable claims for clinical labs and physician office labs. The work covers matching CLIA certificate details to each test, capturing complete requisition and specimen data, checking diagnosis codes against medical necessity policies, using ABNs where appropriate, billing panels correctly and following payer rules on place of service and dates of service.',
    intro: [
      'Laboratory claims are small in value and enormous in number, so a gap that looks minor on one claim can affect thousands. Most lab billing problems start before the lab sees the specimen: a requisition missing the ordering provider\'s NPI, a diagnosis code that does not support the test, or a patient\'s insurance captured incorrectly at the draw site.',
      'Labs also work under rules other practices rarely touch. CLIA certification limits which tests a lab can bill, Medicare medical necessity is defined by national and local coverage policies, panel codes require every component test, and the Clinical Laboratory Fee Schedule is tied to private payer data reported under PAMA, with timelines CMS and Congress have changed more than once.',
      'Our work is designed to catch these issues early: reviewing requisition data before claims are built, checking tests against coverage policies and frequency limits, following up on missing information with ordering offices, and working denials by root cause so the same problem does not repeat across a batch.',
    ],
    challenges: [
      {
        title: 'CLIA certificates and waived tests',
        detail:
          'Every lab test billed must be within the scope of the lab\'s CLIA certificate, and the CLIA number must appear on Medicare and many other claims. Labs with a certificate of waiver can bill only waived tests, which Medicare generally expects to carry the QW modifier.',
      },
      {
        title: 'Incomplete requisitions',
        detail:
          'Missing ordering provider details, diagnosis codes, specimen collection dates or patient insurance on the requisition stop claims or send them to the wrong payer. Chasing that information after testing is slow, so front-end requisition checks and clear ordering-office communication matter.',
      },
      {
        title: 'Medical necessity and ABNs',
        detail:
          'Medicare covers many lab tests only for listed diagnoses or at set frequencies under national and local coverage determinations. When a test is likely to be denied, a properly completed advance beneficiary notice obtained before the specimen is collected lets the lab bill the patient, using modifiers such as GA.',
      },
      {
        title: 'Panels and unbundling',
        detail:
          'Organ and disease panels may be billed only when every component test is performed; otherwise the individual tests are billed. Billing components separately when a full panel was run, or billing a panel with a missing component, creates payer edits and compliance exposure.',
      },
      {
        title: 'Fee schedule changes and molecular tests',
        detail:
          'Clinical Laboratory Fee Schedule rates are set using private payer data reported by applicable labs under PAMA, and reporting periods and payment changes have been delayed several times. Molecular and genetic tests may also require test registration or identifiers under some Medicare contractor programs, so current CMS guidance should be checked.',
      },
    ],
    payerWorkflow: [
      'Requisitions are reviewed on receipt for patient demographics, insurance, ordering provider NPI, diagnosis codes and specimen collection date and time.',
      'Tests are checked against the lab\'s CLIA scope and against national and local coverage policies for covered diagnoses and frequency limits.',
      'Claims are created with the correct place of service for the lab type, the CLIA number where required, and panel or component codes that match what was performed.',
      'Missing information is requested from the ordering office in batches so claims are not held longer than necessary.',
      'Remittances are posted and denials are grouped by reason, such as medical necessity, missing ordering provider or eligibility, so fixes can be applied across affected claims.',
      'Patient balances, including tests billed under a valid ABN, are sent statements according to the lab\'s financial policy.',
    ],
    services: [
      'medical-billing',
      'claims-scrubbing',
      'insurance-eligibility-verification',
      'healthcare-data-entry',
      'denial-management',
      'payment-posting',
      'underpayment-identification',
      'patient-billing',
    ],
    faqs: [
      {
        q: 'What do laboratory billing services include?',
        a: 'Laboratory billing services typically include requisition review, eligibility checks, CLIA and coverage policy checks, claim creation and scrubbing, payment posting, denial follow-up and patient billing. Because labs depend on ordering offices for diagnosis and insurance data, communication with those offices about missing information is a large part of the work.',
      },
      {
        q: 'Why do lab claims need a CLIA number?',
        a: 'Lab claims need a CLIA number because federal law requires laboratories testing human specimens to hold a CLIA certificate, and Medicare and many other payers verify that each billed test falls within the certificate\'s scope. A missing or mismatched CLIA number, or a test outside the certificate type, commonly leads to rejections or denials.',
      },
      {
        q: 'When should a lab use an ABN?',
        a: 'A lab should use an advance beneficiary notice when it expects Medicare may deny a test as not reasonable and necessary, for example because the diagnosis is not covered or a frequency limit applies. The notice must be given and signed before the specimen is collected. A valid ABN allows the lab to bill the patient if Medicare denies the test.',
      },
      {
        q: 'What is PAMA and how does it affect lab billing?',
        a: 'PAMA, the Protecting Access to Medicare Act of 2014, changed how Medicare sets Clinical Laboratory Fee Schedule rates by basing them on private payer rates reported by applicable laboratories. Reporting deadlines and payment reductions have been delayed several times by later legislation, so labs should check current CMS guidance for reporting obligations and rate updates.',
      },
    ],
    relatedTools: ['claim-submission-checklist', 'icd-10-code-search', 'denial-reasons-guide', 'clean-claim-rate-calculator'],
    seoTitle: 'Laboratory Billing Services | Texas Solutions RCM',
    metaDescription:
      'Laboratory billing services for CLIA details, requisition and specimen data, medical necessity and ABNs, panel billing, PAMA rates and place of service.',
    keywords: [
      'laboratory billing services',
      'lab billing',
      'clinical laboratory billing',
      'CLIA billing requirements',
      'lab medical necessity ABN',
      'lab panel billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  DME suppliers                                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: 'dme-suppliers',
    name: 'DME Suppliers',
    kind: 'medical',
    icon: 'Accessibility',
    summary:
      'Billing support for durable medical equipment suppliers handling orders, documentation, rental modifiers and prior authorization.',
    definition:
      'DME billing services handle claims for durable medical equipment, prosthetics, orthotics and supplies. The work involves collecting valid written orders and supporting medical records, applying purchase, rental and capped rental rules with the correct modifiers, obtaining prior authorization for items that require it, and keeping DMEPOS supplier enrollment and accreditation details aligned with each claim.',
    intro: [
      'DME claims depend on paperwork created outside the supplier\'s walls. The order comes from the treating practitioner, the medical necessity support lives in that practitioner\'s records, and the supplier is the one billed back if an audit finds something missing. That makes documentation collection the core of DME billing, not an afterthought.',
      'Medicare processes DMEPOS claims through regional DME Medicare Administrative Contractors, and its rules on written orders, face-to-face encounters, rentals and prior authorization are detailed and updated often. Medicaid programs and commercial plans add their own authorization and pricing rules, and many items move between rental and purchase over time.',
      'Our work is designed to keep each order complete before delivery, apply the right modifiers through every rental month, track authorizations and recurring supply schedules, and follow up on denials and documentation requests before deadlines pass.',
    ],
    challenges: [
      {
        title: 'Written orders and medical record support',
        detail:
          'Medicare requires a standard written order with specific elements, and certain items need the order and a face-to-face encounter before delivery. Medicare retired most certificates of medical necessity and DME information forms for recent dates of service, but other payers and older claims may still reference them, so the treating practitioner\'s records carry the coverage support.',
      },
      {
        title: 'Rental, purchase and capped rental modifiers',
        detail:
          'Modifiers distinguish new purchases, used purchases and rentals, and capped rental items carry month-specific modifiers through the rental period, after which ownership typically transfers to the beneficiary. Oxygen has its own payment cap and service rules. A wrong modifier in any month can deny or misprice the claim.',
      },
      {
        title: 'Prior authorization for certain items',
        detail:
          'Medicare maintains a required prior authorization list for certain DMEPOS items, such as some power mobility devices and orthoses, and Medicaid and commercial plans often require authorization for more items. Delivering before approval usually means the claim cannot be paid.',
      },
      {
        title: 'Coverage criteria and the KX modifier',
        detail:
          'Many local coverage determinations require the KX modifier to signal that the coverage criteria are met and documentation is on file. Using it without supporting records creates recoupment risk in later audits, so documentation should be checked before the modifier is applied.',
      },
      {
        title: 'Supplier enrollment and accreditation',
        detail:
          'Medicare DMEPOS suppliers must enroll as suppliers, meet supplier standards, maintain accreditation from a CMS-approved accrediting organization and generally hold a surety bond. Competitive bidding rules may also affect certain product categories and areas, so enrollment and contract status should be confirmed before billing.',
      },
    ],
    payerWorkflow: [
      'Intake confirms coverage, payer type and whether the item needs a pre-delivery order, face-to-face encounter or prior authorization.',
      'Written orders and supporting medical records are collected from the treating practitioner and checked for required elements before delivery.',
      'Proof of delivery is captured and filed with the order, since it is required to support the claim in a review.',
      'Claims are built with HCPCS codes, purchase or rental modifiers, KX and laterality modifiers where applicable, and the correct rental month.',
      'Recurring rentals and supply refills are tracked on a schedule, with refill contact and quantity rules applied before each claim.',
      'Denials, additional documentation requests and audit letters are tracked to their deadlines and answered with the complete order and medical record package.',
    ],
    services: [
      'prior-authorization',
      'insurance-eligibility-verification',
      'provider-enrollment',
      'claims-submission',
      'denial-management',
      'denial-appeals',
      'aging-ar-follow-up',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'What do DME billing services include?',
        a: 'DME billing services typically include eligibility checks, order and documentation collection, prior authorization, claim submission with correct HCPCS codes and modifiers, rental tracking, payment posting and denial and audit follow-up. Because coverage depends on the treating practitioner\'s records, requesting and checking those records before delivery is a central part of the work.',
      },
      {
        q: 'Are certificates of medical necessity still required for Medicare DME claims?',
        a: 'For most recent dates of service, no. CMS discontinued certificates of medical necessity and DME information forms for claims with dates of service starting in 2023, relying instead on the written order and the medical record. Some other payers may still request similar forms, so check each payer\'s current requirements.',
      },
      {
        q: 'How does a capped rental work?',
        a: 'A capped rental is a Medicare payment method where certain equipment is paid as a monthly rental for a limited number of continuous months, after which the beneficiary generally owns the item. Each month\'s claim carries modifiers identifying the rental, and breaks in service, equipment changes or payer switches can affect the count.',
      },
      {
        q: 'Which DME items need prior authorization?',
        a: 'For Medicare, items on the CMS required prior authorization list need an approved request before delivery, and the list has included some power mobility devices, pressure reducing support surfaces and orthoses. Medicaid and commercial plans set their own lists, which are often broader. Checking authorization requirements at intake helps avoid unpaid deliveries.',
      },
    ],
    relatedTools: ['hcpcs-code-lookup', 'prior-authorization-checklist', 'denial-appeal-checklist', 'ar-aging-calculator'],
    seoTitle: 'DME Billing Services for Suppliers | Texas Solutions',
    metaDescription:
      'DME billing services for written orders, rental and purchase modifiers, capped rentals, prior authorization and DMEPOS supplier enrollment requirements.',
    keywords: [
      'DME billing services',
      'DME billing',
      'DMEPOS billing',
      'durable medical equipment billing',
      'capped rental billing',
      'DME prior authorization',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Telehealth                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'telehealth',
    name: 'Telehealth',
    kind: 'medical',
    icon: 'Video',
    summary:
      'Billing support for practices delivering care by video or phone, with payer-specific place of service, modifier and consent rules.',
    definition:
      'Telehealth billing services help practices bill visits delivered by video or phone. The work involves applying the place of service each payer expects, such as 02 or 10, adding modifiers like 95, 93 or GT where required, confirming audio-only rules, checking state and payer coverage policies and making sure consent, location and modality are documented.',
    intro: [
      'Telehealth claims look like ordinary claims with a few extra details, and those details are where most denials come from. One payer wants place of service 10 with modifier 95, another wants the place of service where the visit would have happened in person, and a third does not cover the service by video at all.',
      'Medicare telehealth rules have changed repeatedly since 2020, with temporary flexibilities extended, lapsed and restored at different times, and some behavioral health rules made permanent. Commercial plans and Medicaid programs follow state laws that differ on coverage, payment parity, audio-only care and consent. Any rule summary, including this one, needs to be checked against current payer and CMS guidance before claims go out.',
      'Our work is designed to keep a current payer-by-payer reference for your telehealth services, check each claim against it, confirm the documentation supports the modality billed, and follow up on telehealth denials so patterns are corrected quickly.',
    ],
    challenges: [
      {
        title: 'Place of service 02 versus 10',
        detail:
          'POS 02 generally indicates the patient was somewhere other than home, and POS 10 indicates the patient was at home. Medicare and many commercial payers use these codes differently for payment, and some payers ask for the in-person place of service with a modifier instead.',
      },
      {
        title: 'Modifiers 95, 93 and GT',
        detail:
          'Modifier 95 commonly identifies synchronous audio-video services, modifier 93 identifies audio-only services, and GT is still required by some payers and in certain facility billing situations. Each payer publishes which modifier it expects, and those preferences change.',
      },
      {
        title: 'Audio-only coverage',
        detail:
          'Audio-only care is covered for some services and patients but not others. Medicare has allowed audio-only for certain behavioral health services and in specific circumstances, and states and commercial plans set their own rules. The note should state that the visit was audio-only and why when a payer requires it.',
      },
      {
        title: 'Changing Medicare flexibilities',
        detail:
          'Medicare rules on home originating sites, geographic restrictions, eligible practitioners and in-person visit requirements for telehealth have depended on temporary extensions that Congress and CMS have changed several times. Rules in effect on the date of service determine payment, so they must be checked rather than assumed.',
      },
      {
        title: 'State licensure, consent and documentation',
        detail:
          'Clinicians generally must be licensed in the state where the patient is located, and many states require documented telehealth consent. Notes should record the modality, the patient\'s location, the clinician\'s location when payers ask for it, and the participants in the visit.',
      },
    ],
    payerWorkflow: [
      'A payer reference is kept for telehealth coverage, place of service, modifiers, audio-only rules and consent requirements, and it is reviewed when CMS or payers publish changes.',
      'Scheduling records whether the visit will be video or audio-only and where the patient will be, so eligibility and coverage can be checked before the visit.',
      'Notes are reviewed for modality, patient location, consent and time where time-based coding applies before the claim is coded.',
      'Claims are scrubbed against payer-specific place of service and modifier rules, and originating site facility fees are billed separately only when the patient was at an eligible site.',
      'Telehealth denials are grouped by payer and reason so incorrect place of service or modifier patterns can be corrected across affected claims.',
    ],
    services: [
      'medical-billing',
      'medical-coding',
      'insurance-eligibility-verification',
      'claims-scrubbing',
      'denial-management',
      'medical-credentialing',
      'remote-patient-monitoring-billing',
    ],
    faqs: [
      {
        q: 'What do telehealth billing services include?',
        a: 'Telehealth billing services typically include maintaining payer-specific telehealth rules, verifying coverage, checking notes for modality, location and consent, coding visits with the correct place of service and modifiers, submitting claims and working telehealth denials. Because Medicare and state rules change, keeping that payer reference current is a large part of the work.',
      },
      {
        q: 'Should telehealth claims use place of service 02 or 10?',
        a: 'Use POS 10 when the patient is at home and POS 02 when the patient is somewhere else, unless the payer instructs otherwise. Some payers, including Medicare in certain periods, have asked practices to report the in-person place of service with modifier 95 instead. Always check the payer\'s current telehealth policy before billing.',
      },
      {
        q: 'Is audio-only telehealth billable?',
        a: 'Sometimes. Medicare has covered audio-only care for certain behavioral health services and specific circumstances, and some states require commercial plans to cover audio-only visits, while others do not. Payers usually want modifier 93 or another identifier and a note stating the visit was audio-only. Coverage depends on the service, payer, state and date of service.',
      },
      {
        q: 'Are Medicare telehealth flexibilities still in effect?',
        a: 'It depends on the date of service. Many Medicare telehealth flexibilities started as temporary measures and have been extended, allowed to lapse and restored at different times, while some behavioral health rules are permanent. Check current CMS guidance and Medicare Administrative Contractor notices for the dates you are billing rather than relying on an older summary.',
      },
    ],
    relatedTools: ['claim-submission-checklist', 'denial-rate-calculator', 'clean-claim-rate-calculator', 'medical-billing-acronyms'],
    seoTitle: 'Telehealth Billing Services | Texas Solutions RCM',
    metaDescription:
      'Telehealth billing services for place of service 02 and 10, modifiers 95, 93 and GT, audio-only visits, consent and payer and state rules that change.',
    keywords: [
      'telehealth billing services',
      'telehealth billing',
      'telemedicine billing',
      'place of service 02 and 10',
      'modifier 95 telehealth',
      'audio-only telehealth billing',
    ],
  },
];
