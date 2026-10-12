import type { Specialty } from '../types';

/**
 * Medical specialties, part 1 (15 pages).
 * CPT code numbers appear only in passing; descriptors are never reproduced.
 */
export const medicalPart1: Specialty[] = [
  /* ------------------------------------------------------------------ */
  /*  Family medicine                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: 'family-medicine',
    name: 'Family Medicine',
    kind: 'medical',
    icon: 'Stethoscope',
    summary:
      'Billing support for family practices that see every age group, mix preventive and problem visits, and juggle many payer rules.',
    definition:
      'Family medicine billing covers preventive and problem-oriented visits for patients of every age, from newborn checks to Medicare wellness visits. It involves choosing the right E/M level, applying modifier 25 correctly when a problem is addressed during a preventive visit, billing vaccines and screenings, and tracking which preventive services each payer covers without cost sharing.',
    intro: [
      'A family practice may see an infant for a well-child visit, a teenager for a sports physical, an adult with diabetes and a Medicare patient for an annual wellness visit, all before lunch. Each of those encounters follows a different set of payer rules, and the same service can be covered in full by one plan and subject to a deductible under another.',
      'The most common source of friction is the visit that starts as preventive and turns into problem management. Billing both services is often appropriate, but only when documentation supports a significant, separately identifiable problem-oriented service and the claim carries the right modifier. Patients also need to understand why a "free" physical produced a bill.',
      'Our work is designed to keep these mixed visits clean on the way out the door: verifying preventive benefits before the appointment, checking modifier and diagnosis pairing before submission, and following up on the preventive-versus-problem denials that tend to recur in this specialty.',
    ],
    challenges: [
      {
        title: 'Preventive plus problem visits on the same day',
        detail:
          'When a chronic or new problem is addressed during a preventive visit, a problem-oriented E/M can be reported alongside the preventive code with modifier 25. Payers look for documentation showing the extra work was significant and separate, and some apply payment reductions or deny one line outright.',
      },
      {
        title: 'Medicare wellness visits versus physicals',
        detail:
          'Medicare does not cover routine physicals, but it covers the Initial Preventive Physical Examination and Annual Wellness Visits, which have their own HCPCS codes, frequency limits and required elements. Billing a commercial-style preventive code to Medicare, or scheduling a wellness visit too early, leads to denials and patient balances.',
      },
      {
        title: 'Age-based preventive and vaccine codes',
        detail:
          'Preventive E/M codes change by age band and by new versus established status, and vaccine administration codes differ for patients under 19 who receive counseling. Pediatric patients may also be covered by the Vaccines for Children program, which changes what the practice can bill.',
      },
      {
        title: 'Add-on and care management codes',
        detail:
          'Medicare recognizes add-on codes such as G2211 for longitudinal primary care relationships, plus care management services like chronic care management and transitional care management. Each has its own documentation, consent and timing rules, and commercial adoption varies.',
      },
      {
        title: 'Screenings with cost-sharing rules',
        detail:
          'Many preventive screenings are covered without cost sharing under the Affordable Care Act when billed with preventive diagnosis codes, but the same test ordered for symptoms becomes diagnostic. Diagnosis sequencing on lab orders and in-office tests determines what the patient owes.',
      },
    ],
    payerWorkflow: [
      'Eligibility checks before the visit confirm preventive frequency (when the last physical or wellness visit was billed) and whether the plan is commercial, Medicare, Medicare Advantage or Medicaid.',
      'Coders or billers review same-day preventive and problem services for modifier 25 and for diagnosis codes linked to the correct line.',
      'Vaccine claims are split by funding source: privately purchased vaccines bill the product and administration, while VFC-supplied doses bill administration only.',
      'Claims are scrubbed for age and frequency edits before submission, since preventive codes are tightly tied to patient age.',
      'Denials for "routine service not covered" or frequency limits are reviewed to decide whether to correct and resubmit, appeal, or bill the patient under a valid advance notice.',
    ],
    services: [
      'medical-billing',
      'medical-coding',
      'insurance-eligibility-verification',
      'claims-scrubbing',
      'denial-management',
      'patient-billing',
      'patient-financial-communication',
    ],
    faqs: [
      {
        q: 'Can a family practice bill a preventive visit and a sick visit on the same day?',
        a: 'Yes, when the problem-oriented service is significant and separately identifiable from the preventive service. The problem E/M is reported with modifier 25, and the note should show the extra history, exam or decision making devoted to the problem. Minor issues handled within the preventive visit generally do not justify a separate code, and payer policies on payment for the second service vary.',
      },
      {
        q: 'Why did a patient get a bill after an annual physical?',
        a: 'Most often because a problem was addressed and billed separately, or because a test was ordered with a diagnostic rather than preventive diagnosis. Preventive services under the Affordable Care Act are usually covered without cost sharing, but problem-oriented care follows normal deductible and copay rules. Explaining this at check-in can prevent many billing complaints.',
      },
      {
        q: 'What is the difference between a Medicare Annual Wellness Visit and a physical?',
        a: 'The Annual Wellness Visit is a Medicare benefit focused on a health risk assessment and a personalized prevention plan, and it does not include a routine head-to-toe physical exam. Medicare does not cover routine physicals. Billing the wrong code, or billing a wellness visit before the frequency window has passed, usually results in a denial.',
      },
      {
        q: 'Can family medicine practices bill chronic care management?',
        a: 'Yes, Medicare and many other payers recognize chronic care management for patients with two or more qualifying chronic conditions. Requirements include documented patient consent, a comprehensive care plan and tracking of qualifying clinical staff time each month. Because time thresholds and overlapping-service rules are specific, a monthly tracking process is essential before claims go out.',
      },
      {
        q: 'How do Vaccines for Children doses affect family practice billing?',
        a: 'When a vaccine comes from the Vaccines for Children program, the practice did not buy it and cannot bill for the vaccine product. It bills only the administration, often at a state-set fee for Medicaid patients. Keeping VFC and private inventory separate in the billing system helps avoid billing a free dose by mistake.',
      },
    ],
    relatedTools: ['clean-claim-rate-calculator', 'denial-rate-calculator', 'claim-submission-checklist', 'payer-mix-calculator'],
    seoTitle: 'Family Medicine Billing Services | Texas Solutions RCM',
    metaDescription:
      'Family medicine billing support for preventive and problem visits, modifier 25, Medicare wellness visits, vaccines and screening claims across many payers.',
    keywords: [
      'family medicine billing',
      'family practice billing services',
      'modifier 25 preventive visit',
      'annual wellness visit billing',
      'primary care coding',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Internal medicine                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: 'internal-medicine',
    name: 'Internal Medicine',
    kind: 'medical',
    icon: 'ClipboardList',
    summary:
      'Revenue cycle support for internists managing complex adult patients, care management programs and a heavy Medicare payer mix.',
    definition:
      'Internal medicine billing focuses on adult patients with multiple chronic conditions, which means accurate E/M leveling based on medical decision making or time, careful risk adjustment coding, and billing for care management services such as chronic care, transitional care and remote monitoring. A large Medicare and Medicare Advantage population makes frequency and documentation rules central.',
    intro: [
      'Internists often carry panels of older adults with diabetes, heart failure, kidney disease and several medications at once. That complexity is clinical reality, but it only reaches the claim when the documentation and the diagnosis coding capture it. Under-coding is as common as over-coding in this specialty.',
      'Internal medicine practices also rely on revenue that happens between visits: chronic care management, transitional care after discharge, remote patient monitoring and annual wellness visits. Each program has its own consent, time and frequency rules, and missing one step can invalidate a month of work.',
      'Our team works inside your EHR and practice management system to help capture that work accurately, check claims against Medicare and Medicare Advantage edits, and follow up on denials before they age.',
    ],
    challenges: [
      {
        title: 'E/M leveling for complex patients',
        detail:
          'Office visit levels are selected by medical decision making or total time on the date of service. Patients with several chronic conditions often support higher levels, but only when the note shows the problems addressed, the data reviewed and the risk of management.',
      },
      {
        title: 'Risk adjustment and HCC capture',
        detail:
          'Medicare Advantage and some commercial value-based contracts use risk adjustment based on documented and coded chronic conditions. Conditions must be addressed and supported in the note each year to count, so diagnosis specificity matters beyond the individual claim.',
      },
      {
        title: 'Transitional care management timing',
        detail:
          'Transitional care management after a hospital or facility discharge requires an interactive contact within a short window and a face-to-face visit within a set number of days, depending on complexity. Missing the contact or the visit window means the service cannot be billed as TCM.',
      },
      {
        title: 'Chronic care and remote monitoring overlap',
        detail:
          'Chronic care management, principal care management and remote physiologic monitoring can sometimes be billed in the same month, but each has time thresholds and rules about which staff can count time. Tracking minutes accurately and avoiding double counting is a monthly task.',
      },
      {
        title: 'Hospital and facility visits',
        detail:
          'Internists who round in hospitals or nursing facilities bill different E/M code families, observation rules and discharge services. Place of service and the admitting versus consulting role affect which codes and modifiers apply.',
      },
    ],
    payerWorkflow: [
      'Eligibility checks confirm whether a patient has Original Medicare, a Medicare Advantage plan or a secondary supplement, since rules and payer IDs differ.',
      'Care management minutes are logged and reconciled at month end before the claim is created, with consent on file checked first.',
      'Claims are scrubbed for diagnosis specificity, place of service and same-month service conflicts.',
      'Medicare crossover claims to supplemental insurers are monitored so secondary balances are not left unbilled.',
      'Denials tied to frequency, missing consent or medical necessity are routed to the right person: coding issues to coders, documentation gaps to the provider.',
    ],
    services: [
      'medical-billing',
      'medical-coding',
      'coding-audit',
      'insurance-eligibility-verification',
      'denial-management',
      'accounts-receivable-management',
      'rcm-analytics-reporting',
    ],
    faqs: [
      {
        q: 'How are office visit levels chosen in internal medicine?',
        a: 'Office visit levels are chosen based on either medical decision making or total provider time on the date of service. For complex adult patients, decision making usually drives the level, considering the number and severity of problems, data reviewed and the risk of treatment. The note needs to show that reasoning clearly for the level to hold up in an audit.',
      },
      {
        q: 'What is needed to bill transitional care management?',
        a: 'Transitional care management requires an interactive contact with the patient or caregiver within two business days of discharge, a face-to-face visit within a set window based on complexity, and medication reconciliation. The service covers a 30-day period starting on the discharge date. If the contact or visit timing is missed, a regular E/M visit is billed instead.',
      },
      {
        q: 'Can chronic care management and remote patient monitoring be billed in the same month?',
        a: 'Often yes, because Medicare treats them as separate services, but each must meet its own requirements and time cannot be counted twice. Chronic care management needs a care plan and consent, while remote physiologic monitoring depends on device data collected over enough days in the period. Payer rules outside Medicare vary, so check each plan.',
      },
      {
        q: 'Why does diagnosis coding matter so much for internists?',
        a: 'Diagnosis coding supports medical necessity on each claim and, for Medicare Advantage and many value-based contracts, it also drives risk adjustment. Chronic conditions generally need to be documented and addressed each year to be recognized. Vague or outdated diagnoses can understate how sick a panel is and affect both claim payment and contract performance.',
      },
    ],
    relatedTools: ['days-in-ar-calculator', 'net-collection-rate-calculator', 'icd-10-code-search', 'rcm-performance-scorecard'],
    seoTitle: 'Internal Medicine Billing Services | Texas Solutions RCM',
    metaDescription:
      'Internal medicine billing for complex adult patients: E/M leveling, risk adjustment coding, chronic and transitional care management and Medicare claims.',
    keywords: [
      'internal medicine billing',
      'internist billing services',
      'chronic care management billing',
      'transitional care management billing',
      'HCC risk adjustment coding',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Cardiology                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'cardiology',
    name: 'Cardiology',
    kind: 'medical',
    icon: 'HeartPulse',
    summary:
      'Cardiology billing support for imaging prior authorizations, device monitoring, professional and technical splits and procedure coding.',
    definition:
      'Cardiology billing covers office visits, diagnostic testing such as echocardiograms, stress tests and nuclear imaging, cardiac device monitoring, and invasive procedures like catheterizations. It requires securing prior authorization for advanced imaging, splitting professional and technical components by site of service, tracking device check intervals and applying global surgical rules to procedures.',
    intro: [
      'A cardiology practice runs several businesses under one roof: a clinic, a diagnostic imaging lab, a device clinic and, often, a hospital-based procedure service. Each one has its own codes, payer rules and authorization requirements, and the same test can be billed globally in one setting and split into professional and technical parts in another.',
      'Advanced cardiac imaging is a frequent target for utilization management. Many commercial and Medicare Advantage plans route echocardiograms, nuclear stress tests, cardiac CT and cardiac MRI through radiology benefit managers that require authorization before the test. A test performed without one is rarely paid on appeal.',
      'Our work is designed to keep authorizations, device monitoring periods and procedure modifiers organized so that testing revenue is not lost to preventable front-end and coding errors.',
    ],
    challenges: [
      {
        title: 'Prior authorization for echo and nuclear imaging',
        detail:
          'Many plans require authorization for transthoracic and stress echocardiograms, myocardial perfusion imaging, cardiac CT and MRI. Requirements depend on the plan and sometimes on the setting, and the authorized CPT code must match what is actually performed or the claim may deny.',
      },
      {
        title: 'Professional and technical components',
        detail:
          'When a cardiologist reads a study performed on hospital equipment, only the professional component is billed with modifier 26. When the practice owns the equipment and reads the study, it bills globally. Mixing these up causes denials or duplicate-billing flags with the facility.',
      },
      {
        title: 'Cardiac device monitoring',
        detail:
          'Pacemakers, ICDs and implantable loop recorders have separate codes for in-person interrogation, remote interrogation and remote monitoring over defined periods. Remote services are typically billed once per period, and billing an in-person check during the same period can conflict.',
      },
      {
        title: 'Catheterization and intervention coding',
        detail:
          'Diagnostic catheterizations, coronary interventions and add-on vessels follow bundling rules that depend on what was done, which vessels were treated and whether a decision to intervene was made during the same session. Modifiers for coronary branches and same-day E/M services require careful review.',
      },
      {
        title: 'Global periods for procedures',
        detail:
          'Device implants and many invasive procedures carry 0, 10 or 90-day global periods. Follow-up visits inside the global period are usually not separately payable unless an unrelated problem is managed and the right modifier is used.',
      },
    ],
    payerWorkflow: [
      'Orders for advanced imaging are checked against plan authorization rules at scheduling, with the authorization number and approved codes saved to the visit.',
      'Studies are billed globally, professional-only (26) or technical-only (TC) based on equipment ownership and place of service.',
      'Device monitoring claims are created at the end of each monitoring period, with the period dates and device type verified.',
      'Procedure claims are reviewed for bundling, vessel modifiers and global period status before submission.',
      'Medical necessity denials for testing are worked against payer coverage policies and LCDs, with documentation pulled for appeals.',
    ],
    services: [
      'prior-authorization',
      'medical-coding',
      'medical-billing',
      'claims-scrubbing',
      'denial-appeals',
      'insurance-eligibility-verification',
      'underpayment-identification',
    ],
    faqs: [
      {
        q: 'Do echocardiograms and stress tests need prior authorization?',
        a: 'Often yes, depending on the payer. Many commercial and Medicare Advantage plans require authorization for echocardiograms, nuclear stress tests, cardiac CT and cardiac MRI, frequently through a radiology benefit manager. Original Medicare generally does not require prior authorization for these tests, but coverage still depends on medical necessity. Checking at the time of scheduling prevents most of these denials.',
      },
      {
        q: 'When should a cardiologist bill with modifier 26?',
        a: 'Modifier 26 is used when the cardiologist provides only the professional interpretation and the equipment, staff and supplies belong to another entity, such as a hospital. The facility bills the technical component. If the practice owns the equipment and performs the reading, the study is generally billed globally without either modifier.',
      },
      {
        q: 'How is remote cardiac device monitoring billed?',
        a: 'Remote device monitoring is billed per monitoring period rather than per transmission, using codes specific to the device type, such as pacemakers, defibrillators or implantable loop recorders. The professional and technical parts may be billed separately when a vendor supplies the monitoring. Tracking period start and end dates prevents duplicate claims and gaps.',
      },
      {
        q: 'Can a cardiologist bill an office visit during a global period?',
        a: 'Only when the visit addresses a problem unrelated to the procedure, or when the decision for a major procedure is made at that visit. Unrelated care during the postoperative period uses modifier 24, and a decision-for-surgery visit uses modifier 57 for major procedures. Routine postoperative follow-up is included in the procedure payment.',
      },
      {
        q: 'Why are cardiac imaging claims denied for medical necessity?',
        a: 'Imaging claims are often denied when the diagnosis on the claim does not appear on the payer coverage policy, or when frequency limits are exceeded. Medicare contractors publish Local Coverage Determinations for many cardiac tests. Linking the correct, specific diagnosis and confirming frequency before the test are the main ways to reduce these denials.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'denial-reasons-guide', 'underpayment-estimator', 'denial-rate-calculator'],
    seoTitle: 'Cardiology Billing and Coding Services | Texas Solutions',
    metaDescription:
      'Cardiology billing support for echo and nuclear prior authorizations, 26/TC splits, device monitoring periods and catheterization coding and global periods.',
    keywords: [
      'cardiology billing',
      'cardiology coding services',
      'echocardiogram prior authorization',
      'cardiac device monitoring billing',
      'modifier 26 cardiology',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dermatology                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: 'dermatology',
    name: 'Dermatology',
    kind: 'medical',
    icon: 'Microscope',
    summary:
      'Dermatology billing support for biopsies, excisions, Mohs surgery, pathology follow-up and the line between medical and cosmetic care.',
    definition:
      'Dermatology billing covers office visits plus a high volume of minor procedures: biopsies, destructions, excisions, repairs and Mohs surgery. Coding depends on technique, lesion count, size including margins and pathology results. Billers must also separate covered medical care from cosmetic services and apply modifiers correctly when several lesions are treated on one day.',
    intro: [
      'Dermatology visits are short, but the claims are rarely simple. A single appointment can include an E/M service, a shave or punch biopsy on one lesion, destruction of several others and a prescription for a biologic that needs prior authorization. Each element has its own coding logic.',
      'Excisions are a good example. The code depends on whether the lesion is benign or malignant, its anatomic location and its size including margins, and the malignant or benign choice often cannot be finalized until the pathology report returns. Billing too early, or from the pre-procedure note alone, is a common source of errors.',
      'Our team is designed to hold claims that need pathology, check lesion-level modifiers and diagnosis links, and keep medical and cosmetic services clearly separated for both payers and patients.',
    ],
    challenges: [
      {
        title: 'Biopsy technique and lesion count',
        detail:
          'Skin biopsy codes, such as the 11102 to 11107 series, are differentiated by technique (tangential, punch or incisional) with add-on codes for each additional lesion. When different techniques are used on the same day, specific rules decide which code is primary.',
      },
      {
        title: 'Excision size, margins and pathology',
        detail:
          'Excision codes depend on the lesion diameter plus the narrowest margins, measured before excision, and on whether pathology confirms the lesion as benign or malignant. Waiting for the pathology report before final coding helps avoid corrected claims.',
      },
      {
        title: 'Modifier 25 and multiple-lesion modifiers',
        detail:
          'An E/M visit on the same day as a minor procedure needs modifier 25 and documentation of a separate, significant service. Multiple procedures on different lesions may need modifier 59 or the X modifiers so payers do not bundle them.',
      },
      {
        title: 'Mohs surgery and repairs',
        detail:
          'Mohs surgery is billed by stage and anatomic area, with additional stages and blocks reported through add-on codes. Repairs and flaps after Mohs are coded separately, with their own size and complexity rules.',
      },
      {
        title: 'Cosmetic versus medical services',
        detail:
          'Removal of benign lesions for appearance, many laser treatments and injectables are not covered. Practices need clear documentation of medical necessity (for example bleeding, irritation or suspicion of malignancy) or a signed financial agreement before cosmetic work.',
      },
      {
        title: 'Biologics and specialty drug authorizations',
        detail:
          'Biologics for psoriasis, atopic dermatitis and other conditions usually require prior authorization and periodic reauthorization, often through the pharmacy benefit. Tracking expiration dates keeps patients on therapy without gaps.',
      },
    ],
    payerWorkflow: [
      'Procedure notes are reviewed for lesion size, margins, location and technique before codes are assigned.',
      'Excision and Mohs claims are held until pathology results are available so benign or malignant status is coded accurately.',
      'Same-day E/M and procedure claims are scrubbed for modifier 25 and lesion-level modifier use.',
      'Cosmetic services are billed directly to the patient under a signed financial agreement and kept off insurance claims.',
      'Biologic authorizations are tracked with renewal dates and reauthorization paperwork prepared in advance.',
    ],
    services: [
      'medical-coding',
      'medical-billing',
      'prior-authorization',
      'claims-scrubbing',
      'coding-audit',
      'patient-billing',
      'denial-management',
    ],
    faqs: [
      {
        q: 'Should dermatology excisions be billed before pathology comes back?',
        a: 'It is usually better to wait. Excision codes differ for benign and malignant lesions, and the final classification often depends on the pathology report. Billing from the procedure note alone can lead to corrected claims or underpayment. Many dermatology practices hold excision claims for a short period until pathology is posted in the chart.',
      },
      {
        q: 'How is excision size measured for coding?',
        a: 'Excision size is the greatest clinical diameter of the lesion plus the narrowest margins required for complete removal, measured before the excision. It is not taken from the pathology specimen, which shrinks after removal. The documented measurement determines which size range code applies, so providers should record it clearly in the procedure note.',
      },
      {
        q: 'Can a dermatologist bill a visit and a biopsy on the same day?',
        a: 'Yes, when the visit includes a significant, separately identifiable service beyond the usual evaluation that leads to the biopsy. The E/M is billed with modifier 25. If the only purpose of the visit was to evaluate and biopsy a single lesion, the decision to biopsy is generally included in the procedure.',
      },
      {
        q: 'How should a practice handle cosmetic dermatology services?',
        a: 'Cosmetic services should be identified before treatment and billed to the patient rather than to insurance. A signed financial agreement explaining the patient is responsible helps prevent disputes. If a lesion has medical indicators such as bleeding or suspicious change, document them clearly, because that documentation decides whether the service is billable to insurance.',
      },
    ],
    relatedTools: ['clean-claim-rate-calculator', 'denial-reasons-guide','prior-authorization-checklist', 'patient-balance-calculator'],
    seoTitle: 'Dermatology Billing and Coding Services | Texas Solutions',
    metaDescription:
      'Dermatology billing support for biopsies, excisions, Mohs surgery, pathology holds, modifier 25 and separating covered medical care from cosmetic services.',
    keywords: [
      'dermatology billing',
      'dermatology coding',
      'skin biopsy coding',
      'excision coding pathology',
      'Mohs surgery billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Orthopedics                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: 'orthopedics',
    name: 'Orthopedics',
    kind: 'medical',
    icon: 'Bone',
    summary:
      'Orthopedic billing support for surgical global periods, modifiers, imaging and DME, injections and workers compensation claims.',
    definition:
      'Orthopedic billing covers office visits, fracture care, joint injections, in-office imaging, durable medical equipment and surgery. It requires managing 10 and 90-day global periods, applying modifiers such as 24, 25, 57, 58, 78, 79 and laterality modifiers, securing authorization for MRI and surgery, and handling workers compensation and personal injury claims alongside commercial and Medicare plans.',
    intro: [
      'Orthopedic practices generate revenue from many directions: clinic visits, X-rays, braces and casts, injections, surgeries in hospitals and surgery centers, and sometimes physical therapy. Most of the complexity comes from how those services relate to one another over time.',
      'Global surgical periods are the main example. A follow-up visit after a knee arthroscopy may be included in the surgical payment, while a visit for an unrelated shoulder complaint in the same period is separately billable with the right modifier. A return to the operating room may or may not be payable depending on why it happened.',
      'Orthopedics also carries a meaningful share of workers compensation and auto claims, which follow state rules, adjuster approvals and fee schedules different from health insurance. Our work aims to keep these separate tracks organized from authorization through payment.',
    ],
    challenges: [
      {
        title: 'Global surgical periods',
        detail:
          'Major procedures usually carry a 90-day global period that includes the day before surgery, and minor procedures carry 0 or 10 days. Postoperative visits, dressing changes and routine follow-up within the global are not separately paid, so claims need to identify when services fall inside or outside it.',
      },
      {
        title: 'Surgical modifiers',
        detail:
          'Modifier 57 marks a decision-for-surgery visit, 58 a staged or planned related procedure, 78 an unplanned return to the operating room for a complication and 79 an unrelated procedure during the global. Each changes whether and how a new global period starts.',
      },
      {
        title: 'Laterality and multiple procedures',
        detail:
          'RT, LT, bilateral modifier 50 and finger or toe modifiers are required on many orthopedic codes. Multiple procedures in one session are subject to payment reduction rules and bundling edits that need review before submission.',
      },
      {
        title: 'DME, casting and supplies',
        detail:
          'Braces, splints and walking boots are often billed with HCPCS L-codes and may require supplier enrollment, proof of delivery and specific documentation. Casting supplies and cast application have their own rules tied to fracture care.',
      },
      {
        title: 'Imaging and surgery authorizations',
        detail:
          'MRI, CT and many elective surgeries require prior authorization from commercial and Medicare Advantage plans. The authorized procedure, site and date range must match what is performed.',
      },
      {
        title: 'Workers compensation and personal injury',
        detail:
          'Workers compensation claims follow state fee schedules, require claim numbers and adjuster contact, and may need specific forms or reports. Personal injury cases may involve liens and delayed payment, which need separate tracking.',
      },
    ],
    payerWorkflow: [
      'At scheduling, the practice confirms whether the visit is health insurance, workers compensation or personal injury, and captures the claim number and adjuster for non-health cases.',
      'Surgery authorizations are obtained with CPT codes, laterality and facility details that match the planned procedure.',
      'Visits during global periods are flagged so that only separately billable services are submitted, with the correct modifier.',
      'Operative notes are coded for primary and secondary procedures, laterality and bundling edits before claims go out.',
      'Workers compensation balances are followed with adjusters under state timelines, separate from commercial AR.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'medical-billing',
      'claims-scrubbing',
      'denial-appeals',
      'aging-ar-follow-up',
      'coding-audit',
      'underpayment-identification',
    ],
    faqs: [
      {
        q: 'What is included in an orthopedic global surgical period?',
        a: 'A global surgical period includes the procedure plus related preoperative care on the day before or day of surgery, routine postoperative visits and treatment of minor complications that do not require a return to the operating room. Major procedures typically have a 90-day global and minor ones 0 or 10 days. Unrelated care can still be billed with modifiers.',
      },
      {
        q: 'When is modifier 78 used instead of modifier 79?',
        a: 'Modifier 78 is used when the patient returns to the operating room for an unplanned procedure related to the original surgery, such as treating a complication. Modifier 79 is used for an unrelated procedure performed during the global period of another surgery. Modifier 79 starts a new global period, while modifier 78 does not.',
      },
      {
        q: 'Do orthopedic practices need special enrollment to bill braces?',
        a: 'Often yes. Billing Medicare for braces and other durable medical equipment generally requires the practice to be enrolled as a DMEPOS supplier and to meet supplier standards. Commercial plans may have their own requirements. Documentation should support medical necessity, fitting and proof of delivery, and the correct HCPCS code and modifiers.',
      },
      {
        q: 'How do workers compensation claims differ from health insurance claims?',
        a: 'Workers compensation claims are paid by the employer insurer under state rules rather than by the patient health plan. They need the employer, claim number, date of injury and adjuster information, and payment follows the state fee schedule. Some states require specific forms or progress reports, and patients usually owe nothing for accepted claims.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'denial-appeal-checklist', 'ar-aging-calculator', 'underpayment-estimator'],
    seoTitle: 'Orthopedic Billing and Coding Services | Texas Solutions',
    metaDescription:
      'Orthopedic billing support for global surgical periods, modifiers 24 through 79, laterality, DME, imaging authorizations and workers compensation claims.',
    keywords: [
      'orthopedic billing',
      'orthopedic coding services',
      'global surgical period billing',
      'modifier 78 79 orthopedics',
      'workers compensation billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Neurology                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: 'neurology',
    name: 'Neurology',
    kind: 'medical',
    icon: 'Brain',
    summary:
      'Neurology billing support for EEG and EMG testing, chemodenervation drug billing, sleep studies and authorization-heavy treatments.',
    definition:
      'Neurology billing covers complex office visits and a range of diagnostic tests, including EEG, long-term video EEG monitoring, EMG and nerve conduction studies and sleep studies. It also includes chemodenervation injections billed with drug units and wastage, infusion therapies and specialty drugs that require prior authorization, along with professional and technical component splits for hospital-based testing.',
    intro: [
      'Neurologists manage conditions such as epilepsy, migraine, multiple sclerosis, neuropathy and movement disorders. Many of these patients need recurring testing and high-cost treatments, which makes accurate coding and authorization tracking especially important.',
      'Electrodiagnostic testing is a common pain point. Nerve conduction studies are billed by the total number of studies performed, needle EMG codes depend on the extent of testing and whether it was done with nerve conduction, and long-term EEG codes are separated by setup, monitoring duration and professional review. Getting the units right is essential.',
      'Our work is designed to help neurology practices code testing correctly, keep drug and infusion authorizations current and follow up on medical necessity denials with the documentation payers expect.',
    ],
    challenges: [
      {
        title: 'EMG and nerve conduction study units',
        detail:
          'Nerve conduction studies are reported with a single code chosen by the total number of studies performed, not one code per nerve. Needle EMG has separate codes depending on extremities tested and whether it accompanies nerve conduction. Payers also apply frequency and medical necessity edits.',
      },
      {
        title: 'EEG and long-term monitoring',
        detail:
          'Routine EEG codes differ by recording length and patient state, while long-term EEG monitoring uses separate technical codes for setup and monitoring periods and professional codes for review and reporting. The documentation must support the duration and the level of technologist monitoring.',
      },
      {
        title: 'Chemodenervation and drug wastage',
        detail:
          'Botulinum toxin injections for chronic migraine, spasticity or dystonia bill the procedure plus the drug in units. Unused drug from a single-dose vial is reported with the JW modifier, and Medicare requires the JZ modifier when there is no waste. Authorizations often specify units and frequency.',
      },
      {
        title: 'Specialty drug and infusion authorizations',
        detail:
          'Infusions and injectables for multiple sclerosis, migraine prevention and other conditions usually require prior authorization, step therapy documentation and periodic renewal, through either the medical or pharmacy benefit.',
      },
      {
        title: 'Professional and technical splits',
        detail:
          'When testing is performed in a hospital or by an independent lab, the neurologist bills only the interpretation with modifier 26. Practices with in-office equipment bill globally, and site of service determines which applies.',
      },
    ],
    payerWorkflow: [
      'Testing orders are checked for authorization requirements and the diagnosis needed to meet payer coverage policies.',
      'EMG, nerve conduction and EEG claims are reviewed for unit counts, duration and professional versus technical billing.',
      'Drug claims are reviewed for NDC information, units administered, wastage modifiers and authorization limits.',
      'Specialty drug authorizations are tracked by expiration date and renewed ahead of the next dose.',
      'Medical necessity denials are appealed with test indications, prior results and relevant coverage policy references.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'benefits-verification',
      'medical-billing',
      'denial-appeals',
      'claims-scrubbing',
    ],
    faqs: [
      {
        q: 'How are nerve conduction studies billed?',
        a: 'Nerve conduction studies are billed with one code based on the total number of studies performed during the session, rather than a separate code for each nerve. Each sensory, motor or F-wave study counts according to AMA rules. Needle EMG is billed separately, with different codes depending on the extent of testing and whether it was combined.',
      },
      {
        q: 'What are the JW and JZ modifiers in neurology?',
        a: 'The JW modifier reports drug amounts discarded from a single-dose vial or package, such as unused botulinum toxin. The JZ modifier tells Medicare that no amount was discarded. Medicare requires one of them on claims for drugs from single-dose containers, and documentation should record the exact amount administered and wasted.',
      },
      {
        q: 'Does long-term video EEG need prior authorization?',
        a: 'It often does with commercial and Medicare Advantage plans, especially for multi-day ambulatory or inpatient monitoring. Requirements vary by plan and setting. Even when authorization is not required, coverage depends on medical necessity, so documentation should explain why routine EEG was insufficient and what the monitoring is expected to answer.',
      },
      {
        q: 'Who bills the technical component of neurology tests?',
        a: 'The entity that owns the equipment and employs the technologist bills the technical component. If testing is performed in a hospital, the hospital bills the technical part and the neurologist bills the interpretation with modifier 26. If the practice owns the equipment, it generally bills the test globally.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'hcpcs-code-lookup', 'denial-appeal-checklist', 'clean-claim-rate-calculator'],
    seoTitle: 'Neurology Billing and Coding Services | Texas Solutions',
    metaDescription:
      'Neurology billing support for EEG and EMG coding, nerve conduction units, botulinum toxin drug billing with JW and JZ modifiers and specialty drug approvals.',
    keywords: [
      'neurology billing',
      'neurology coding services',
      'EMG nerve conduction billing',
      'EEG billing',
      'botox chemodenervation billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Gastroenterology                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: 'gastroenterology',
    name: 'Gastroenterology',
    kind: 'medical',
    icon: 'Pill',
    summary:
      'GI billing support for screening versus diagnostic colonoscopy, polyp removal, anesthesia, pathology and procedure authorizations.',
    definition:
      'Gastroenterology billing centers on endoscopic procedures such as colonoscopy and upper endoscopy, plus office visits and infusion therapy. The key challenge is coding colonoscopies correctly as screening, surveillance or diagnostic, applying screening modifiers when a polyp is removed, and explaining cost sharing to patients. Facility, anesthesia and pathology claims also need to align.',
    intro: [
      'Colonoscopy is one of the most common procedures in gastroenterology, and one of the most confusing for patients. A test scheduled as a free preventive screening can produce a bill when a polyp is removed, depending on the payer and the coding.',
      'Federal rules have shifted to reduce that surprise. Commercial plans generally may not impose cost sharing when a polyp is removed during a screening colonoscopy, and a follow-up colonoscopy after a positive stool-based screening test is now treated as part of screening. Medicare is phasing out patient coinsurance for screenings that become therapeutic over several years. These rules only help patients when the claim reflects them.',
      'Our work is designed to classify GI procedures correctly at scheduling and coding, apply the right screening modifiers and diagnosis sequencing, and coordinate with the facility, anesthesia and pathology claims for the same date of service.',
    ],
    challenges: [
      {
        title: 'Screening, surveillance or diagnostic',
        detail:
          'A colonoscopy for an average-risk patient without symptoms is screening. One for a patient with a personal history of polyps may be surveillance, and one for symptoms such as bleeding is diagnostic. The classification affects codes, diagnosis order, frequency limits and patient cost sharing.',
      },
      {
        title: 'Screening that becomes therapeutic',
        detail:
          'When a polyp is removed during a planned screening, the procedure is coded as therapeutic, with modifier PT for Medicare or modifier 33 for many commercial plans to preserve preventive status. The screening diagnosis is usually listed first, followed by the finding.',
      },
      {
        title: 'Medicare HCPCS screening codes',
        detail:
          'Medicare uses its own HCPCS codes, such as G0105 and G0121, for screening colonoscopies with no intervention, with frequency limits based on risk level. Billing a CPT code instead, or screening too soon, can lead to denials or unexpected patient balances.',
      },
      {
        title: 'Anesthesia and pathology alignment',
        detail:
          'Anesthesia for screening colonoscopy may need its own screening modifier, and pathology on removed polyps is billed separately. If these related claims are coded inconsistently, the patient may owe cost sharing on one claim but not another.',
      },
      {
        title: 'Authorizations and biologics',
        detail:
          'Some plans require prior authorization for diagnostic endoscopies, capsule endoscopy or procedures in certain settings. Biologic infusions for inflammatory bowel disease need authorization and renewal tracking.',
      },
    ],
    payerWorkflow: [
      'At scheduling, the reason for the procedure is captured to classify it as screening, surveillance or diagnostic, and the last colonoscopy date is checked against frequency rules.',
      'Patients receive an estimate that explains how cost sharing could change if a polyp is removed or a biopsy is taken.',
      'Procedure notes are coded with screening modifiers and diagnosis sequencing that reflect the original purpose of the procedure.',
      'Professional, anesthesia, facility and pathology claims for the same date are checked for consistent diagnoses.',
      'Denials and patient complaints about screening cost sharing are reviewed against current federal and payer preventive rules.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'insurance-eligibility-verification',
      'patient-financial-communication',
      'claims-scrubbing',
      'denial-management',
      'medical-billing',
    ],
    faqs: [
      {
        q: 'Why might a patient owe money after a screening colonoscopy?',
        a: 'A patient may owe money if the procedure was coded as diagnostic, if the patient had symptoms or a history that changed its classification, or if the payer does not follow preventive rules for that plan type. For Medicare patients, coinsurance can apply when a polyp is removed, though it is being phased out. Clear pre-procedure communication helps.',
      },
      {
        q: 'What is the difference between modifier PT and modifier 33?',
        a: 'Both signal that a procedure began as preventive screening. Modifier PT is used on Medicare claims when a screening colonoscopy becomes diagnostic or therapeutic, which waives the Part B deductible. Modifier 33 is used by many commercial payers to identify preventive services under the Affordable Care Act. Payer rules vary, so confirm which modifier each plan expects.',
      },
      {
        q: 'Is a colonoscopy after a positive stool test considered screening?',
        a: 'Under current federal rules, yes in most cases. Medicare and commercial plans subject to Affordable Care Act preventive requirements treat a follow-up colonoscopy after a positive stool-based screening test as part of the screening process. The claim should be coded to reflect this so the patient receives the preventive benefit.',
      },
      {
        q: 'How often does Medicare cover screening colonoscopies?',
        a: 'Medicare generally covers a screening colonoscopy once every 120 months for average-risk patients, or once every 24 months for high-risk patients, with a shorter interval after a flexible sigmoidoscopy. Frequency is measured from the last covered screening. Checking the date of the prior screening before scheduling helps prevent denials and unexpected patient balances.',
      },
    ],
    relatedTools: ['patient-balance-calculator', 'claim-submission-checklist', 'denial-reasons-guide', 'clean-claim-rate-calculator'],
    seoTitle: 'Gastroenterology Billing Services | Texas Solutions RCM',
    metaDescription:
      'GI billing support for screening versus diagnostic colonoscopy, PT and 33 modifiers, polyp removal cost sharing, anesthesia, pathology and authorizations.',
    keywords: [
      'gastroenterology billing',
      'GI billing services',
      'screening colonoscopy coding',
      'modifier PT colonoscopy',
      'endoscopy billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Pediatrics                                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: 'pediatrics',
    name: 'Pediatrics',
    kind: 'medical',
    icon: 'Baby',
    summary:
      'Pediatric billing support for well-child visits, VFC vaccine administration, Medicaid and CHIP, EPSDT and developmental screening.',
    definition:
      'Pediatric billing covers well-child visits on a defined schedule, sick visits, immunizations, newborn care and developmental and behavioral screenings. A large share of patients is covered by Medicaid or CHIP under the EPSDT benefit, and many vaccines come from the Vaccines for Children program, which changes what can be billed. Counseling-based vaccine administration codes also apply.',
    intro: [
      'Pediatric practices see children on a preventive schedule that tracks closely with Bright Futures guidance, with frequent visits in the first years of life. Each visit may include several screenings and vaccines, and each of those is coded separately.',
      'Payer mix in pediatrics often leans heavily toward Medicaid and CHIP, usually administered by managed care organizations with their own enrollment, authorization and claim rules. The federal EPSDT benefit requires states to cover a broad set of screening and treatment services for children, but each state defines how those services are billed.',
      'Vaccines add another layer. Doses from the Vaccines for Children program are free to the practice and cannot be billed, while privately purchased doses are billed with both product and administration codes. Our work aims to keep those streams separate and claims consistent.',
    ],
    challenges: [
      {
        title: 'Vaccines for Children administration',
        detail:
          'For VFC doses, the practice bills only the administration, often at a state-set maximum for Medicaid, and the product is billed at zero or not at all depending on state rules. Inventory and billing must clearly distinguish VFC from private stock.',
      },
      {
        title: 'Counseling-based vaccine administration codes',
        detail:
          'For patients through age 18, when a physician or qualified professional counsels the family, administration is reported with 90460 and 90461 based on vaccine components. Without that counseling, the general administration codes apply. Payer acceptance varies.',
      },
      {
        title: 'EPSDT and Medicaid managed care',
        detail:
          'EPSDT well-child visits may require state-specific codes, modifiers or referral indicators. Children may move between Medicaid plans or lose coverage, so eligibility should be verified at every visit.',
      },
      {
        title: 'Sick and well visits together',
        detail:
          'When a significant problem is addressed during a well-child visit, a problem-oriented E/M can be reported with modifier 25. Many Medicaid plans and some commercial payers have specific rules about paying both.',
      },
      {
        title: 'Screenings and add-on services',
        detail:
          'Developmental screening, autism screening, maternal depression screening, vision, hearing and lead screening each have their own codes. They are easy to perform and forget to bill, and some payers require them for quality programs.',
      },
    ],
    payerWorkflow: [
      'Eligibility is verified at every visit, including Medicaid plan assignment, since children can switch managed care plans month to month.',
      'Vaccine orders are tagged as VFC or private stock so that claims carry the correct product and administration codes.',
      'Well-child claims are checked for age-appropriate preventive codes, screening codes and any state EPSDT indicators.',
      'Same-day sick and well services are reviewed for modifier 25 and diagnosis linkage before submission.',
      'Denials from Medicaid plans are worked against each state program billing manual and plan-specific policies.',
    ],
    services: [
      'insurance-eligibility-verification',
      'medical-billing',
      'medical-coding',
      'claims-scrubbing',
      'denial-management',
      'provider-enrollment',
      'patient-registration',
    ],
    faqs: [
      {
        q: 'Can a pediatric practice bill for Vaccines for Children doses?',
        a: 'No, a practice cannot bill for the vaccine product when the dose came from the Vaccines for Children program, because the vaccine was provided at no cost. It may bill the administration fee, subject to the state maximum for Medicaid patients. Families cannot be denied a VFC vaccine because of inability to pay the administration fee.',
      },
      {
        q: 'When are codes 90460 and 90461 used?',
        a: 'They are used for patients through age 18 when a physician or other qualified health care professional provides face-to-face counseling about the vaccine at the time of administration. The first code covers the first component of each vaccine and the add-on covers each additional component. Without qualifying counseling, the standard administration codes apply instead.',
      },
      {
        q: 'What is EPSDT and how does it affect billing?',
        a: 'EPSDT is the Medicaid benefit for Early and Periodic Screening, Diagnostic and Treatment services for enrollees under 21. It requires states to cover regular screenings and medically necessary treatment. Each state sets billing rules, which may include specific codes, modifiers or referral indicators on well-child claims, so state manuals should be followed closely.',
      },
      {
        q: 'Are developmental screenings billed separately from well-child visits?',
        a: 'Yes, standardized developmental and behavioral screening instruments are generally billed with their own code in addition to the preventive visit. Payers may limit how often each screening is paid and may require documentation of the tool used and the result. Building screenings into the visit template helps make sure they are captured.',
      },
    ],
    relatedTools: ['payer-mix-calculator', 'clean-claim-rate-calculator', 'claim-submission-checklist', 'medical-billing-glossary'],
    seoTitle: 'Pediatric Billing Services | Texas Solutions RCM',
    metaDescription:
      'Pediatric billing support for well-child visits, VFC vaccine administration, counseling codes, Medicaid and CHIP managed care, EPSDT and screenings.',
    keywords: [
      'pediatric billing',
      'pediatric medical billing services',
      'VFC vaccine billing',
      'EPSDT billing',
      'well child visit coding',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Behavioral health                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: 'behavioral-health',
    name: 'Psychiatry and Behavioral Health',
    kind: 'medical',
    icon: 'MessageCircleHeart',
    summary:
      'Behavioral health billing support for time-based psychotherapy, psychiatric E/M, telehealth rules and carve-out behavioral plans.',
    definition:
      'Psychiatry and behavioral health billing covers psychiatric evaluations, medication management, time-based psychotherapy, group and family therapy, psychological testing and collaborative care. It requires accurate time documentation, the right telehealth place of service and modifiers, credentialing for each licensed clinician type and routing claims to carve-out behavioral plans that manage benefits separately.',
    intro: [
      'Behavioral health claims look simple on the surface, since many visits are a single psychotherapy code. In practice, the code depends on documented time, and the payer that should receive the claim may not be the one named on the patient card.',
      'Many commercial health plans delegate mental health benefits to a separate managed behavioral health organization. Eligibility, authorization and claims go to that organization, with its own payer ID and provider network. Sending a claim to the medical plan instead is a common and avoidable denial.',
      'Telehealth is now a routine part of care, with its own place of service codes, modifiers and payer-specific rules. Our work is designed to help practices document time accurately, route claims to the right payer, keep clinician credentialing current and follow up on authorization limits for higher levels of care.',
    ],
    challenges: [
      {
        title: 'Time-based psychotherapy codes',
        detail:
          'Psychotherapy codes such as 90832, 90834 and 90837 are selected by face-to-face time with the patient, using the time ranges defined by AMA. Start and stop times or total time must be documented, and rounding up to a longer code without support is a frequent audit finding.',
      },
      {
        title: 'Psychiatric E/M with psychotherapy add-ons',
        detail:
          'Psychiatrists and other prescribers may bill an E/M visit for medication management plus an add-on psychotherapy code when both are provided. Time spent on psychotherapy must be separate from the E/M work, and interactive complexity can be added when specific communication factors are present.',
      },
      {
        title: 'Carve-out behavioral plans',
        detail:
          'When a health plan carves out behavioral benefits, claims go to the behavioral health administrator rather than the medical plan. Network status, authorization and payer IDs all follow the carve-out, so eligibility checks need to identify it up front.',
      },
      {
        title: 'Telehealth place of service and modifiers',
        detail:
          'Telehealth claims use place of service 02 or 10 depending on where the patient is located, and many payers require modifier 95 or other indicators. Medicare has made behavioral telehealth more permanent than other telehealth, but in-person visit requirements and audio-only rules have changed over time and should be checked.',
      },
      {
        title: 'Clinician type and credentialing',
        detail:
          'Psychiatrists, psychiatric nurse practitioners, psychologists, licensed clinical social workers, professional counselors and marriage and family therapists are each credentialed separately and paid at different rates. Medicare began enrolling marriage and family therapists and mental health counselors in 2024.',
      },
      {
        title: 'Authorization for higher levels of care',
        detail:
          'Intensive outpatient programs, partial hospitalization, psychological testing and some therapy beyond a set number of visits often need authorization, with concurrent reviews to extend approved units.',
      },
    ],
    payerWorkflow: [
      'Eligibility checks identify whether behavioral benefits are carved out and, if so, capture the behavioral administrator, payer ID and authorization rules.',
      'Each clinician is credentialed with the plans and administrators the practice bills, and claims are submitted under the correct rendering provider.',
      'Session notes are checked for documented time, telehealth location and modality before the code is finalized.',
      'Authorized visit counts and date ranges are tracked so that concurrent reviews are requested before the approval runs out.',
      'Denials for out-of-network status, wrong payer or missing authorization are corrected and resubmitted to the right organization.',
    ],
    services: [
      'medical-credentialing',
      'insurance-eligibility-verification',
      'prior-authorization',
      'medical-billing',
      'medical-coding',
      'denial-management',
      'provider-enrollment',
      'patient-billing',
    ],
    faqs: [
      {
        q: 'How is the psychotherapy code chosen?',
        a: 'The psychotherapy code is chosen by the actual face-to-face time spent with the patient, using the time ranges defined by AMA for each code. The note should record total time or start and stop times. Time spent on documentation or scheduling does not count, and billing a longer code than the documented time supports is a common audit risk.',
      },
      {
        q: 'What is a carve-out behavioral health plan?',
        a: 'A carve-out is when a health plan contracts with a separate company to manage mental health and substance use benefits. For billing, eligibility, authorizations and claims go to that behavioral health administrator, not to the medical plan on the card. Checking for a carve-out before the first visit prevents wrong-payer denials.',
      },
      {
        q: 'Which place of service code is used for telehealth therapy?',
        a: 'Place of service 10 is used when the patient is at home and place of service 02 when the patient is somewhere other than home, such as a clinic. Many payers also require modifier 95, and some use different rules for audio-only sessions. Payer telehealth policies change, so confirm requirements for each plan.',
      },
      {
        q: 'Can a psychiatrist bill medication management and therapy on the same day?',
        a: 'Yes, a psychiatrist or other prescriber can bill an E/M service for medication management and an add-on psychotherapy code when both are provided and documented. The psychotherapy time must be distinct from the time used for the E/M service. The note should make clear which work belongs to each part of the visit.',
      },
      {
        q: 'Can licensed counselors bill Medicare?',
        a: 'Yes, since January 2024 Medicare has enrolled licensed marriage and family therapists and mental health counselors, including professional counselors, as eligible practitioners. They must meet state licensure and Medicare requirements and enroll through PECOS. Commercial plans and Medicaid set their own rules about which clinician types they credential.',
      },
    ],
    relatedTools: ['credentialing-checklist', 'prior-authorization-checklist', 'denial-rate-calculator', 'payer-mix-calculator'],
    seoTitle: 'Psychiatry and Behavioral Health Billing | Texas Solutions',
    metaDescription:
      'Behavioral health billing support for time-based psychotherapy codes, psychiatric E/M add-ons, telehealth rules, carve-out plans and clinician credentialing.',
    keywords: [
      'behavioral health billing',
      'psychiatry billing services',
      'mental health billing',
      'psychotherapy CPT time rules',
      'telehealth therapy billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Physical therapy                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: 'physical-therapy',
    name: 'Physical Therapy',
    kind: 'medical',
    icon: 'PersonStanding',
    summary:
      'Physical therapy billing support for timed codes, the 8-minute rule, KX modifier thresholds, plans of care and visit authorizations.',
    definition:
      'Physical therapy billing relies mostly on timed treatment codes billed in 15-minute units. It involves applying the Medicare 8-minute rule or payer-specific unit rules, adding the GP and KX modifiers, keeping physician-certified plans of care current, reporting assistant services with the CQ modifier, and tracking visit limits and authorizations from commercial plans.',
    intro: [
      'A typical physical therapy visit includes several timed interventions, such as therapeutic exercise, manual therapy and neuromuscular re-education, plus perhaps an untimed modality. How many units can be billed depends on total timed minutes and the counting method the payer uses.',
      'Medicare adds its own structure. Therapy services need a plan of care certified by a physician or qualified practitioner, progress reports at defined intervals and the KX modifier once annual spending passes a threshold that CMS updates each year. Services by physical therapist assistants are paid at a reduced rate and must carry the CQ modifier.',
      'Commercial plans often limit visits per year or require authorization after an initial evaluation. Our work is designed to track units, thresholds and approvals so that clinicians can focus on treatment.',
    ],
    challenges: [
      {
        title: 'The 8-minute rule and unit counting',
        detail:
          'Medicare counts total timed minutes across all timed services to determine billable units, with at least 8 minutes needed for one unit. Some commercial payers follow AMA guidance that counts each service separately, which can produce a different unit total for the same visit.',
      },
      {
        title: 'Therapy threshold and the KX modifier',
        detail:
          'Medicare tracks annual spending on outpatient physical therapy and speech-language pathology together. Above a threshold that CMS sets each year, claims need the KX modifier to confirm continued medical necessity, and spending above a higher amount may trigger targeted medical review.',
      },
      {
        title: 'Plan of care certification',
        detail:
          'Medicare requires a plan of care signed by a physician or qualified practitioner within a set period, with recertification when the plan changes or expires. Missing signatures are a common reason for denials and recoupments.',
      },
      {
        title: 'Assistant services and the CQ modifier',
        detail:
          'Services furnished in whole or in part by a physical therapist assistant are reported with the CQ modifier for Medicare and paid at a reduced percentage. Documentation must show who performed each portion of the treatment.',
      },
      {
        title: 'Visit limits and authorizations',
        detail:
          'Many commercial and Medicare Advantage plans cap visits or require authorization after the evaluation, sometimes through a utilization management vendor. Treating beyond approved visits often means unpaid care.',
      },
      {
        title: 'Evaluation complexity and NCCI edits',
        detail:
          'Evaluations are coded by complexity, and some code pairs, such as certain manual therapy and modality combinations, trigger NCCI edits that require modifier 59 or X modifiers with supporting documentation.',
      },
    ],
    payerWorkflow: [
      'Benefits are verified before the evaluation, including visit limits, copays per visit and authorization requirements.',
      'Plan of care certification is tracked with due dates for signature and recertification.',
      'Each visit is coded from documented minutes per service, applying Medicare or payer-specific unit rules, with GP and CQ modifiers as needed.',
      'Year-to-date therapy spending is monitored so that the KX modifier is added when the threshold is reached.',
      'Authorization usage is tracked against approved visits, with extension requests filed before approval runs out.',
    ],
    services: [
      'benefits-verification',
      'prior-authorization',
      'medical-billing',
      'medical-coding',
      'claims-scrubbing',
      'denial-management',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'What is the 8-minute rule in physical therapy billing?',
        a: 'The 8-minute rule is the Medicare method for counting timed therapy units. Total timed minutes across all timed services are added together, and a service must reach at least 8 minutes to be billed as one unit. Additional units require further 15-minute increments. Some commercial payers count minutes differently, so check each plan.',
      },
      {
        q: 'When is the KX modifier required?',
        a: 'The KX modifier is required on Medicare outpatient therapy claims once a patient has reached the annual therapy threshold for the year. It confirms that services above the threshold are medically necessary and supported by documentation. The threshold amount is updated by CMS each year, and physical therapy and speech-language pathology share one amount.',
      },
      {
        q: 'What does the CQ modifier mean?',
        a: 'The CQ modifier identifies outpatient therapy services furnished in whole or in part by a physical therapist assistant. Medicare pays these services at a reduced percentage of the fee schedule amount. The modifier applies when the assistant performs more than a minimal part of the service, so documentation needs to show who did what.',
      },
      {
        q: 'Does Medicare require a physician signature for physical therapy?',
        a: 'Yes, Medicare requires the plan of care to be certified by a physician or other qualified practitioner, usually by signature within a set period after the initial evaluation. Recertification is needed when the plan expires or changes significantly. Many states allow direct access to physical therapy, but Medicare certification rules still apply for payment.',
      },
    ],
    relatedTools: ['denial-rate-calculator', 'revenue-per-provider-calculator', 'prior-authorization-checklist', 'clean-claim-rate-calculator'],
    seoTitle: 'Physical Therapy Billing Services | Texas Solutions RCM',
    metaDescription:
      'Physical therapy billing support for the 8-minute rule, KX modifier thresholds, CQ assistant services, plans of care and commercial visit authorizations.',
    keywords: [
      'physical therapy billing',
      'PT billing services',
      '8-minute rule billing',
      'KX modifier therapy threshold',
      'CQ modifier physical therapy',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Occupational therapy                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: 'occupational-therapy',
    name: 'Occupational Therapy',
    kind: 'medical',
    icon: 'Hand',
    summary:
      'Occupational therapy billing support for GO modifier claims, separate therapy thresholds, orthotic fabrication, pediatric and hand therapy.',
    definition:
      'Occupational therapy billing covers evaluations by complexity, timed treatment such as self-care training and therapeutic activities, custom orthotic fabrication and pediatric services. Claims need the GO modifier, Medicare unit rules and a certified plan of care. OT has its own Medicare therapy threshold, and assistant services require the CO modifier.',
    intro: [
      'Occupational therapy shares much of its billing framework with physical therapy, including timed units, plans of care and annual thresholds, but the details differ in ways that matter. Medicare applies a separate threshold to occupational therapy spending, and the discipline modifier is GO rather than GP.',
      'OT practices also span very different settings. A hand therapy clinic may fabricate custom splints billed with HCPCS L-codes, while a pediatric clinic may treat children with developmental needs under Medicaid and private plans with their own visit and authorization rules.',
      'Our work aims to keep discipline-specific details correct on each claim, track thresholds and authorizations by discipline and make sure orthotic and supply billing does not get lost.',
    ],
    challenges: [
      {
        title: 'Discipline modifiers and separate thresholds',
        detail:
          'Every outpatient OT service billed to Medicare needs the GO modifier. Medicare tracks OT spending against its own annual threshold, separate from the combined physical therapy and speech-language pathology amount, so KX modifier timing differs by discipline.',
      },
      {
        title: 'Evaluation complexity',
        detail:
          'OT evaluations are coded as low, moderate or high complexity based on occupational profile, assessment of performance deficits and clinical decision making. Documentation must support the level, and re-evaluations have their own code and payer limits.',
      },
      {
        title: 'Orthotic fabrication and supplies',
        detail:
          'Custom and prefabricated orthoses are billed with HCPCS L-codes, often alongside timed training codes. Payers may require specific documentation, measurements and sometimes supplier enrollment for certain items.',
      },
      {
        title: 'Assistant services and the CO modifier',
        detail:
          'Medicare requires the CO modifier when an occupational therapy assistant furnishes all or part of a service, and pays those services at a reduced rate. Accurate time attribution by clinician is required.',
      },
      {
        title: 'Pediatric OT and Medicaid',
        detail:
          'Pediatric occupational therapy for sensory, fine motor or feeding needs is often covered by Medicaid under EPSDT, with authorization requirements and state-specific codes. School-based services and clinic services may be billed under different rules.',
      },
    ],
    payerWorkflow: [
      'Benefits verification identifies whether OT visits are pooled with PT under the plan or tracked separately, plus any authorization requirements.',
      'Plans of care are sent for certification and tracked to signature, with recertification dates calendared.',
      'Claims are coded from documented minutes with GO and CO modifiers applied, and orthotic L-codes added where applicable.',
      'OT-specific year-to-date spending is monitored for the Medicare threshold and KX modifier.',
      'Medicaid and commercial authorizations are tracked by approved units and date range, with renewals requested in advance.',
    ],
    services: [
      'benefits-verification',
      'prior-authorization',
      'medical-billing',
      'medical-coding',
      'claims-scrubbing',
      'denial-management',
      'aging-ar-follow-up',
    ],
    faqs: [
      {
        q: 'Do occupational therapy and physical therapy share a Medicare threshold?',
        a: 'No, Medicare tracks occupational therapy against its own annual threshold, separate from the combined amount for physical therapy and speech-language pathology. Once a patient reaches the OT threshold, OT claims need the KX modifier to confirm medical necessity. Commercial plans may still pool visits across disciplines, so verify each plan separately.',
      },
      {
        q: 'What is the GO modifier?',
        a: 'The GO modifier indicates that a service was delivered under an outpatient occupational therapy plan of care. Medicare requires it on all OT services, including evaluations and timed treatment, and many other payers expect it too. Using the wrong discipline modifier can cause denials and misallocate therapy threshold tracking.',
      },
      {
        q: 'How are custom splints billed in occupational therapy?',
        a: 'Custom splints are usually billed with HCPCS L-codes that describe the type of orthosis, while fitting and training time may be billed separately with treatment codes. Payer rules vary on which items are covered and whether supplier enrollment is needed. Documentation should include the diagnosis, materials, fitting and patient instruction.',
      },
      {
        q: 'Does pediatric occupational therapy require prior authorization?',
        a: 'Frequently yes, especially under Medicaid and Medicaid managed care plans, which often approve a set number of units or visits for a limited period. Commercial plans may also require authorization after the evaluation. Tracking approved units and requesting renewals before they run out helps prevent unpaid sessions.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'hcpcs-code-lookup', 'denial-rate-calculator', 'ar-aging-calculator'],
    seoTitle: 'Occupational Therapy Billing Services | Texas Solutions',
    metaDescription:
      'Occupational therapy billing support for GO and CO modifiers, the separate Medicare OT threshold, evaluation complexity, orthotics and pediatric approvals.',
    keywords: [
      'occupational therapy billing',
      'OT billing services',
      'GO modifier occupational therapy',
      'pediatric OT billing',
      'splint orthotic billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Chiropractic                                                       */
  /* ------------------------------------------------------------------ */
  {
    slug: 'chiropractic',
    name: 'Chiropractic',
    kind: 'medical',
    icon: 'Activity',
    summary:
      'Chiropractic billing support for Medicare AT modifier rules, active versus maintenance care, ABNs, visit limits and personal injury claims.',
    definition:
      'Chiropractic billing covers spinal and extremity manipulation, exams, therapies and personal injury care. For Medicare, only manual manipulation of the spine to correct a subluxation is covered, and it needs the AT modifier for active treatment. Maintenance care is not covered, so ABNs and the GA or GZ modifiers matter. Commercial plans add visit caps and authorizations.',
    intro: [
      'Chiropractic billing looks narrow, since much of the volume is a handful of manipulation codes, but coverage rules vary widely by payer. Medicare covers only spinal manipulation for subluxation, and only when the care is active or corrective. Exams, X-rays and therapies ordered by a chiropractor are not covered by Medicare.',
      'Documentation is the deciding factor. Medicare expects evidence of subluxation and a treatment plan with measurable goals, and it looks for the elements commonly summarized as PART: pain, asymmetry or misalignment, range of motion abnormality and tissue changes. When care shifts to maintenance, the AT modifier must come off and the patient should be informed in advance.',
      'Commercial plans often cap visits or require authorization through a vendor, and many practices also treat auto and personal injury cases. Our work is designed to keep these coverage paths separate and claims consistent with each payer rules.',
    ],
    challenges: [
      {
        title: 'AT modifier and active treatment',
        detail:
          'Medicare requires the AT modifier on spinal manipulation codes when care is active or corrective. Without AT, Medicare treats the service as maintenance and denies it. Applying AT without documentation of improvement or a treatment plan creates audit risk.',
      },
      {
        title: 'Maintenance care, ABNs and GA or GZ',
        detail:
          'When care becomes maintenance, the practice should issue an Advance Beneficiary Notice before the service and bill with the GA modifier so the patient can be billed if Medicare denies. Without a valid ABN, the GZ modifier applies and the patient generally cannot be billed.',
      },
      {
        title: 'Non-covered Medicare services',
        detail:
          'Exams, X-rays, extremity manipulation and therapies performed by a chiropractor are not covered by Medicare. These are typically billed to the patient, and some practices submit them for denial when a secondary payer requires it.',
      },
      {
        title: 'Subluxation documentation',
        detail:
          'Medicare requires the primary diagnosis to show subluxation at the specific spinal level treated, supported by an X-ray or a physical exam documenting PART findings. The number of regions manipulated must match the code billed.',
      },
      {
        title: 'Visit caps and utilization management',
        detail:
          'Many commercial and Medicare Advantage plans limit chiropractic visits per year or manage them through a vendor that requires periodic clinical submissions. Tracking visits used and approvals prevents unpaid care.',
      },
      {
        title: 'Personal injury and auto claims',
        detail:
          'Auto medical payments, personal injury protection and attorney liens follow different rules than health insurance. They often involve delayed payment, settlement reductions and separate documentation requests.',
      },
    ],
    payerWorkflow: [
      'Benefits verification confirms annual visit limits, copays and whether a plan routes chiropractic through a utilization management vendor.',
      'For Medicare patients, the treatment plan and PART documentation are reviewed before AT is applied to manipulation claims.',
      'ABNs are issued and filed before maintenance visits, and claims carry GA or GZ as appropriate.',
      'Non-covered services are billed to the patient under a clear financial policy, or submitted for denial when a secondary payer needs it.',
      'Personal injury cases are tracked separately with claim numbers, attorney contacts and lien status.',
    ],
    services: [
      'benefits-verification',
      'medical-billing',
      'medical-coding',
      'prior-authorization',
      'patient-financial-communication',
      'denial-management',
      'patient-collections',
    ],
    faqs: [
      {
        q: 'What does the AT modifier mean for chiropractors?',
        a: 'The AT modifier tells Medicare that spinal manipulation is active or corrective treatment, which is the only type Medicare covers. It should be used only when documentation shows a treatment plan with goals and reasonable expectation of improvement. If care is maintenance, the AT modifier should not be used and the service is not covered.',
      },
      {
        q: 'Does Medicare cover chiropractic maintenance care?',
        a: 'No, Medicare does not cover maintenance care that is meant to keep a patient stable rather than improve the condition. Practices should give the patient an Advance Beneficiary Notice before maintenance services and bill with the GA modifier, which allows the patient to be billed if Medicare denies the claim.',
      },
      {
        q: 'Can chiropractors bill Medicare for exams and X-rays?',
        a: 'Medicare does not pay chiropractors for exams, X-rays or therapies. Medicare coverage for chiropractors is limited to manual manipulation of the spine to correct subluxation. The other services may be billed to the patient, though X-rays taken by another provider can be used to document subluxation if they meet Medicare timing requirements.',
      },
      {
        q: 'What is PART documentation?',
        a: 'PART is a common shorthand for the Medicare documentation elements used to show subluxation through a physical exam: pain or tenderness, asymmetry or misalignment, range of motion abnormality, and tissue or tone changes. Medicare expects at least two of these, one of which must be asymmetry or range of motion abnormality.',
      },
    ],
    relatedTools: ['patient-balance-calculator', 'denial-reasons-guide', 'collection-efficiency-calculator', 'medical-billing-acronyms'],
    seoTitle: 'Chiropractic Billing Services | Texas Solutions RCM',
    metaDescription:
      'Chiropractic billing support for the Medicare AT modifier, active versus maintenance care, ABNs with GA and GZ, PART notes, visit caps and injury claims.',
    keywords: [
      'chiropractic billing',
      'chiropractic billing services',
      'AT modifier chiropractic',
      'Medicare maintenance care ABN',
      'chiropractic personal injury billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Pain management                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: 'pain-management',
    name: 'Pain Management',
    kind: 'medical',
    icon: 'Syringe',
    summary:
      'Pain management billing support for injection authorizations, LCD documentation, imaging guidance, drug testing and neurostimulation.',
    definition:
      'Pain management billing covers interventional procedures such as epidural steroid injections, facet joint blocks, radiofrequency ablation and spinal cord stimulation, along with office visits, medication management and urine drug testing. It requires prior authorization, adherence to Medicare coverage determinations on frequency and relief, correct laterality and level coding and accurate bundling of imaging guidance.',
    intro: [
      'Interventional pain practices perform procedures that payers watch closely. Epidural steroid injections, facet joint interventions and radiofrequency ablation are all subject to detailed coverage policies that specify diagnoses, prior conservative care, how much relief a diagnostic block must provide and how often procedures can be repeated.',
      'Coding is equally specific. Codes depend on spinal region, approach, number of levels and laterality, and imaging guidance is bundled into many injection codes. Spinal cord stimulation adds a trial and a permanent implant phase, often with a psychological evaluation required before approval.',
      'Our work is designed to gather the documentation payers ask for before scheduling, code procedures by level and side and track authorizations and repeat-procedure windows so claims are supported when they are reviewed.',
    ],
    challenges: [
      {
        title: 'Prior authorization for interventional procedures',
        detail:
          'Most commercial and Medicare Advantage plans require authorization for epidurals, facet procedures, radiofrequency ablation and stimulator trials. Approvals usually specify the level, side and date range, and the performed procedure must match.',
      },
      {
        title: 'Coverage determinations and documented relief',
        detail:
          'Medicare Local Coverage Determinations for facet joint interventions and epidural injections set rules on prior conservative care, diagnostic block results, pain scores and repeat frequency. Missing pain scales or relief percentages are common denial and audit triggers.',
      },
      {
        title: 'Levels, laterality and imaging guidance',
        detail:
          'Codes vary by spinal region and number of levels, and bilateral procedures may use modifier 50 or RT and LT depending on payer. Fluoroscopic or CT guidance is included in many injection codes and should not be billed separately when bundled.',
      },
      {
        title: 'Urine drug testing',
        detail:
          'Presumptive and definitive drug testing use separate HCPCS codes, and payers limit frequency and require documentation of why each test was ordered. Testing ordered by protocol rather than individual need is a frequent audit focus.',
      },
      {
        title: 'Spinal cord stimulation',
        detail:
          'Stimulator trials and permanent implants are typically authorized separately, often require a behavioral health evaluation, and carry global periods. Device and facility billing must align with the professional claim.',
      },
    ],
    payerWorkflow: [
      'Before scheduling, the practice gathers conservative care history, imaging and pain scores required by the payer or LCD and submits authorization requests with level and side.',
      'Procedure notes are coded by region, level, laterality and approach, with imaging guidance bundled where required.',
      'Diagnostic block results, including the percentage and duration of relief, are documented before radiofrequency ablation is requested.',
      'Drug testing claims are checked for frequency limits and documented medical necessity.',
      'Repeat procedure dates are tracked against payer frequency limits so that early repeats are not scheduled.',
    ],
    services: [
      'prior-authorization',
      'medical-coding',
      'coding-audit',
      'medical-billing',
      'denial-appeals',
      'claims-scrubbing',
      'insurance-eligibility-verification',
    ],
    faqs: [
      {
        q: 'Do epidural steroid injections require prior authorization?',
        a: 'Usually yes for commercial and Medicare Advantage plans, which commonly require proof of conservative treatment, imaging and documented pain levels. Original Medicare generally does not require prior authorization in the physician office, but coverage determinations still set strict documentation rules, and certain procedures in hospital outpatient departments are subject to Medicare prior authorization.',
      },
      {
        q: 'Why are radiofrequency ablation claims often denied?',
        a: 'Radiofrequency ablation claims are often denied because the documentation does not show the required diagnostic block results. Medicare coverage policies typically require two medial branch blocks with significant pain relief, documented as a percentage, before ablation. Missing pain scores, wrong levels or repeats sooner than allowed are other frequent reasons for denial.',
      },
      {
        q: 'Can fluoroscopic guidance be billed separately with injections?',
        a: 'Often no. Many spinal injection codes include imaging guidance, so billing fluoroscopy or CT guidance separately is not allowed for those procedures. Some other injections and joint procedures do allow separate guidance codes. Checking the current code guidance and NCCI edits for each procedure prevents unbundling errors.',
      },
      {
        q: 'How should urine drug testing be documented?',
        a: 'Each urine drug test should be ordered based on the individual patient and documented with the clinical reason, the drugs being tested and how results will affect care. Payers restrict frequency and question routine testing panels. Presumptive and definitive tests are billed with different codes, and definitive testing usually needs a specific justification.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'denial-appeal-checklist', 'denial-rate-calculator', 'hcpcs-code-lookup'],
    seoTitle: 'Pain Management Billing Services | Texas Solutions RCM',
    metaDescription:
      'Pain management billing support for injection prior authorizations, LCD documentation, levels and laterality, imaging guidance, drug testing and stimulators.',
    keywords: [
      'pain management billing',
      'interventional pain billing',
      'epidural injection prior authorization',
      'radiofrequency ablation billing',
      'urine drug testing billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Radiology                                                          */
  /* ------------------------------------------------------------------ */
  {
    slug: 'radiology',
    name: 'Radiology',
    kind: 'medical',
    icon: 'ScanLine',
    summary:
      'Radiology billing support for 26 and TC component splits, advanced imaging prior authorization, ordering data and multi-site reads.',
    definition:
      'Radiology billing covers diagnostic imaging such as X-ray, ultrasound, CT, MRI, nuclear medicine and PET, plus interventional procedures. It requires billing professional and technical components separately or globally depending on ownership, confirming prior authorization for advanced imaging, capturing ordering provider information and coding diagnoses from the final interpretation.',
    intro: [
      'Radiology groups often never meet the patients they bill. Orders, demographics and insurance information arrive from referring offices and hospitals, and the radiologist reads studies from several sites. Billing depends on getting accurate data from many sources.',
      'The component split is central. A hospital-based radiologist bills only the professional component, while an imaging center that owns its equipment bills the technical component or the global service. Each arrangement changes the claim, the payer contracts involved and who is responsible for authorizations.',
      'Advanced imaging is heavily managed by payers through radiology benefit managers. Our work is designed to confirm authorizations before scans, capture complete order data, apply the right component modifiers and code from the final report.',
    ],
    challenges: [
      {
        title: 'Professional and technical components',
        detail:
          'Modifier 26 reports the professional interpretation and modifier TC the equipment, staff and supplies. Global billing combines both when one entity provides everything. Billing the wrong component, or billing globally when the hospital is billing the technical part, causes denials and overpayments.',
      },
      {
        title: 'Prior authorization for advanced imaging',
        detail:
          'Commercial and Medicare Advantage plans commonly require authorization for CT, MRI, PET and nuclear studies, often through a radiology benefit manager. The authorized code, body part and contrast status must match what is performed, and changes made at the scanner may need an authorization update.',
      },
      {
        title: 'Ordering provider and order data',
        detail:
          'Claims for diagnostic tests require the ordering or referring provider name and NPI, and that provider generally must be enrolled with Medicare. Missing or mismatched ordering data is a common rejection reason.',
      },
      {
        title: 'Coding from the final interpretation',
        detail:
          'For outpatient diagnostic tests, diagnosis codes are based on confirmed findings in the final report. When the study is normal, the reason for the order is coded. Relying only on the order diagnosis can understate or misstate medical necessity.',
      },
      {
        title: 'Contrast, multiple procedures and payment reductions',
        detail:
          'Codes differ for studies with contrast, without contrast or both, and contrast agents may be billed separately with HCPCS codes depending on the setting. Medicare applies multiple procedure payment reductions when several imaging studies are performed in one session.',
      },
    ],
    payerWorkflow: [
      'Orders are checked at scheduling for authorization requirements, with the authorization tied to the exact code, body part and contrast plan.',
      'Demographics, insurance and ordering provider details are confirmed from the referring source before the claim is built.',
      'Claims are coded from the signed final report, with diagnosis codes reflecting confirmed findings.',
      'Professional, technical or global billing is set by site and contract, and reads for multiple facilities are tracked by location.',
      'Denials for missing authorization, ordering provider or component errors are corrected or appealed with the report and order attached.',
    ],
    services: [
      'prior-authorization',
      'medical-coding',
      'charge-entry',
      'claims-scrubbing',
      'medical-billing',
      'denial-management',
      'healthcare-data-entry',
    ],
    faqs: [
      {
        q: 'What is the difference between modifier 26 and modifier TC?',
        a: 'Modifier 26 identifies the professional component, which is the radiologist interpretation and report. Modifier TC identifies the technical component, which covers the equipment, technologist and supplies. When one entity provides both, the service is billed globally without either modifier. The setting and equipment ownership determine which applies.',
      },
      {
        q: 'Who is responsible for imaging prior authorization?',
        a: 'Typically the ordering provider is responsible for obtaining prior authorization, but the imaging facility bears the financial risk if the scan is performed without it. Many imaging centers verify authorization at scheduling and will not proceed without it. The radiologist professional claim may also be denied when no valid authorization exists.',
      },
      {
        q: 'Should radiology claims use the diagnosis on the order or the report?',
        a: 'For outpatient diagnostic studies, coding guidelines direct coders to use the confirmed findings in the final interpretation when available. If the study is normal, the signs, symptoms or reason for the order are coded. Using the order diagnosis alone may not reflect what the study found.',
      },
      {
        q: 'Why do radiology claims get rejected for ordering provider issues?',
        a: 'Diagnostic test claims must include the ordering or referring provider name and NPI, and Medicare checks that the provider is enrolled and eligible to order. Rejections happen when the NPI is missing, the name does not match the NPI record or the ordering provider is not enrolled. Validating order data up front prevents most of these.',
      },
    ],
    relatedTools: ['npi-lookup', 'prior-authorization-checklist', 'claim-rejection-rate-calculator', 'first-pass-acceptance-rate-calculator'],
    seoTitle: 'Radiology Billing and Coding Services | Texas Solutions',
    metaDescription:
      'Radiology billing support for 26 and TC component splits, advanced imaging prior authorization, ordering provider data and coding from final reports.',
    keywords: [
      'radiology billing',
      'radiology coding services',
      'modifier 26 TC radiology',
      'imaging prior authorization',
      'imaging center billing',
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Urgent care                                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: 'urgent-care',
    name: 'Urgent Care',
    kind: 'medical',
    icon: 'Ambulance',
    summary:
      'Urgent care billing support for S-code contracts, place of service rules, high-volume eligibility, occupational medicine and self-pay.',
    definition:
      'Urgent care billing handles high volumes of walk-in visits across many payers, each with its own contract structure. Some commercial plans pay a case rate using HCPCS S-codes such as S9083 or S9088, while Medicare and others pay standard E/M and procedure codes. Place of service, after-hours codes, occupational medicine and self-pay pricing add more variation.',
    intro: [
      'Urgent care centers see patients without appointments, often with limited time to verify insurance before the visit. A single day can include commercial, Medicare, Medicaid, workers compensation, employer-paid occupational medicine and self-pay patients, and each one follows different billing rules.',
      'Contracts are the main source of complexity. Some commercial payers pay urgent care on a global or case rate basis and expect an S-code on the claim, sometimes in addition to E/M and procedure codes. Medicare does not recognize those S-codes and pays under the physician fee schedule. The same visit can therefore be coded differently by payer.',
      'Our work is designed to build payer-specific billing rules into the claim process, verify eligibility quickly at registration, and keep occupational medicine and self-pay accounts on their own tracks.',
    ],
    challenges: [
      {
        title: 'S-codes and case rate contracts',
        detail:
          'Some commercial payers contract urgent care with HCPCS S-codes, such as S9083 for a global visit fee or S9088 for services in an urgent care center. Whether to bill an S-code alone, with E/M and procedures, or not at all depends on each contract.',
      },
      {
        title: 'Place of service and facility status',
        detail:
          'Place of service 20 identifies an urgent care facility, but some payers expect place of service 11 depending on how the center is enrolled or contracted. Hospital-affiliated centers may bill differently from independent ones.',
      },
      {
        title: 'Fast eligibility and registration',
        detail:
          'Walk-in volume leaves little time for verification, and errors in subscriber details, plan selection or coordination of benefits flow straight into denials. Real-time eligibility checks and clean demographic capture are essential.',
      },
      {
        title: 'In-office procedures, labs and imaging',
        detail:
          'Laceration repairs, splinting, rapid tests, X-rays and injections are billed alongside the visit. CLIA certificate numbers on lab claims, modifier 25 with procedures and component billing for X-rays read off-site all need attention.',
      },
      {
        title: 'Occupational medicine and workers compensation',
        detail:
          'Employer-paid drug screens, physicals and injury visits are billed to employers or workers compensation carriers rather than health plans, often under negotiated rates or state fee schedules.',
      },
      {
        title: 'Self-pay and after-hours services',
        detail:
          'Uninsured patients need clear pricing and, under the No Surprises Act, a good faith estimate when requested or when care is scheduled in advance. After-hours add-on codes are paid by some commercial payers but not others.',
      },
    ],
    payerWorkflow: [
      'Insurance cards and demographics are captured at check-in, with real-time eligibility run before the provider sees the patient.',
      'Each payer is mapped to its contract rules, such as S-code only, S-code plus E/M, or standard fee schedule billing, and claims are built accordingly.',
      'Lab claims carry the CLIA number, and X-rays are billed globally or by component based on who performs the read.',
      'Occupational medicine visits are routed to employer accounts or workers compensation carriers with the claim or authorization number.',
      'Patient balances and self-pay accounts are statemented quickly while the visit is recent, with clear explanations of charges.',
    ],
    services: [
      'patient-registration',
      'insurance-eligibility-verification',
      'charge-entry',
      'claims-submission',
      'fee-schedule-analysis',
      'payment-posting',
      'patient-collections',
      'underpayment-identification',
    ],
    faqs: [
      {
        q: 'What are S-codes in urgent care billing?',
        a: 'S-codes are temporary HCPCS codes used by some commercial payers and Medicaid programs, including codes like S9083 and S9088 that are associated with urgent care. Some payers pay a global urgent care rate through these codes. Medicare does not accept S-codes, so whether to use them depends entirely on each payer contract and policy.',
      },
      {
        q: 'Which place of service code should an urgent care center use?',
        a: 'Place of service 20 is defined for urgent care facilities, but payers do not all handle it the same way. Some contracts or enrollments call for place of service 11, the office setting. The right choice depends on how the center is enrolled and contracted with each payer, so confirm it during contracting and credentialing.',
      },
      {
        q: 'How can urgent care centers reduce eligibility denials?',
        a: 'The most effective step is running real-time eligibility at check-in and correcting subscriber name, date of birth, member ID and plan selection before the visit. Scanning both sides of the insurance card and asking about secondary coverage also helps. Because urgent care visits are unscheduled, front desk accuracy has an outsized effect on denials.',
      },
      {
        q: 'Do urgent care centers need a CLIA certificate for rapid tests?',
        a: 'Yes, any site that performs laboratory testing on human specimens, including waived rapid tests for strep, flu or COVID-19, needs a CLIA certificate. The CLIA number must appear on lab claims for Medicare and many other payers. Missing or mismatched CLIA numbers are a common cause of lab line denials.',
      },
      {
        q: 'How should urgent care handle uninsured patients?',
        a: 'Urgent care centers should publish clear self-pay pricing and follow No Surprises Act rules, which require a good faith estimate for uninsured or self-pay patients when care is scheduled in advance or when an estimate is requested. Collecting at the time of service and explaining what is included in the price reduces later disputes.',
      },
    ],
    relatedTools: ['payer-mix-calculator', 'fee-schedule-comparison-calculator', 'claim-rejection-rate-calculator', 'cost-per-claim-calculator'],
    seoTitle: 'Urgent Care Billing Services | Texas Solutions RCM',
    metaDescription:
      'Urgent care billing support for S-code case rate contracts, place of service rules, eligibility checks, CLIA lab claims, occupational health and self-pay.',
    keywords: [
      'urgent care billing',
      'urgent care billing services',
      'S9083 S9088 billing',
      'urgent care place of service 20',
      'occupational medicine billing',
    ],
  },
];
