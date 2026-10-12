import type { Specialty } from '../types';

/**
 * Medical specialties, part 2: primary care through multi-specialty practices.
 * CPT and HCPCS numbers are mentioned in passing only; descriptors are never reproduced.
 */
export const medicalPart2: Specialty[] = [
  /* ---------------------------------------------------------------- */
  /*  Primary care                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'primary-care',
    name: 'Primary Care',
    kind: 'medical',
    icon: 'Stethoscope',
    summary:
      'Billing support for preventive visits, care management programs and value-based contracts in primary care practices.',
    definition:
      'Primary care billing covers preventive services such as Medicare annual wellness visits, recurring care management programs like chronic care management and transitional care, and the documentation and coding that value-based contracts depend on. It requires tracking eligibility windows, patient consent, monthly time thresholds and risk adjustment accuracy alongside routine office visit claims.',
    intro: [
      'Primary care revenue increasingly comes from work that happens between office visits. Annual wellness visits, chronic care management, transitional care after a discharge and other care management services each have their own eligibility rules, consent requirements and documentation standards. When those programs are billed inconsistently, the practice does the clinical work without capturing the revenue it supports.',
      'At the same time, many primary care groups now hold value-based contracts, shared savings arrangements or Medicare Advantage agreements where payment depends on attributed patients, quality measures and risk-adjusted diagnosis coding. Those contracts reward accurate, complete documentation of chronic conditions every year, which is a different discipline from getting a single claim paid.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to keep preventive, care management and fee-for-service billing organized. The work is designed to help your team see which patients are due for which services, which programs are being billed correctly and where documentation gaps may affect value-based performance.',
    ],
    challenges: [
      {
        title: 'Preventive and problem-oriented care on the same day',
        detail:
          'When a wellness or preventive visit turns into treatment of a new or worsening problem, the separate problem-oriented service needs its own documentation and usually modifier 25. Patients may also owe cost sharing for the problem portion even though the preventive portion is covered in full, which needs to be explained up front.',
      },
      {
        title: 'Annual wellness visit eligibility and frequency',
        detail:
          'Medicare distinguishes the one-time Welcome to Medicare preventive visit, the initial annual wellness visit and subsequent annual wellness visits, each billed with different HCPCS G-codes and frequency limits. Billing the wrong one, or billing too soon after a prior visit at another practice, leads to frequency denials.',
      },
      {
        title: 'Care management time, consent and overlap rules',
        detail:
          'Chronic care management, principal care management, transitional care management and newer advanced primary care management codes each have their own consent, time or complexity requirements and restrictions on which services can be billed in the same month. Tracking minutes and avoiding overlapping claims takes a dedicated process.',
      },
      {
        title: 'Risk adjustment and annual condition capture',
        detail:
          'Under Medicare Advantage and many value-based contracts, chronic conditions must be documented and coded with adequate specificity at least once each calendar year to count toward risk scores. Diagnoses carried forward on a problem list without supporting assessment in the note may not hold up in a payer review.',
      },
      {
        title: 'Quality measures and supplemental data',
        detail:
          'Quality programs often rely on CPT Category II codes, HCPCS quality codes or supplemental data feeds to show that screenings, blood pressure control or diabetic eye exams happened. If those codes are not captured on claims, the practice may appear to miss measures it actually met.',
      },
    ],
    payerWorkflow: [
      'Check Medicare preventive eligibility and prior wellness visit dates before scheduling, since another practice may already have billed this year.',
      'Bill preventive services and any separately documented problem-oriented visit on the same claim with the appropriate modifier, and set patient cost sharing expectations accordingly.',
      'Track care management minutes and consent by patient and month, then release care management claims only after the calendar month or service period requirements are met.',
      'Submit quality codes and supplemental data on the schedule each value-based contract requires, and reconcile payer gap reports against your own records.',
      'Review attribution rosters and risk adjustment reports from contracted payers so documentation gaps can be addressed during the next scheduled visit.',
    ],
    services: [
      'medical-billing',
      'medical-coding',
      'insurance-eligibility-verification',
      'coding-audit',
      'rcm-analytics-reporting',
      'payer-contracting',
      'denial-management',
    ],
    faqs: [
      {
        q: 'How is primary care billing different from family medicine or internal medicine billing?',
        a: 'Primary care billing, as we use the term here, focuses on preventive services, care management programs and value-based contracts rather than on a particular patient age group. Family medicine and internal medicine practices bill many of the same services, but a primary care focus puts more weight on wellness visit tracking, monthly care management workflows, quality measure reporting and risk adjustment documentation that shared savings and Medicare Advantage arrangements depend on.',
      },
      {
        q: 'Can an annual wellness visit and a sick visit be billed on the same day?',
        a: 'Yes, Medicare allows a significant, separately identifiable problem-oriented visit on the same day as an annual wellness visit when it is documented on its own merits. The problem-oriented service is typically reported with modifier 25. The patient may owe deductible or coinsurance for that portion, even though the wellness visit itself has no cost sharing, so front desk staff should explain this when it happens.',
      },
      {
        q: 'What is needed to bill chronic care management?',
        a: 'Chronic care management generally requires a patient with two or more chronic conditions expected to last at least a year, documented patient consent, a comprehensive care plan, and clinical staff or practitioner time that meets the monthly threshold for the code billed. Only one practitioner can bill certain care management services for a patient in a month, so coordination with other practices matters.',
      },
      {
        q: 'Why do diagnosis codes matter so much under value-based contracts?',
        a: 'Diagnosis codes matter because many value-based and Medicare Advantage arrangements use them to calculate risk scores, which adjust expected costs and benchmarks for each patient. If chronic conditions are not assessed and documented each year with enough specificity, the patient population can look healthier than it is. Coding must still reflect only what the note supports, since payers audit risk adjustment data.',
      },
      {
        q: 'Can Texas Solutions help track quality measure gaps?',
        a: 'Yes, we can help organize quality measure gap lists from your payers and your EHR, make sure quality codes are captured on claims, and report on where gaps remain. We work inside your existing systems and reporting tools. Clinical decisions about screenings and follow-up always stay with your providers; our role is the billing, coding and data side of the process.',
      },
    ],
    relatedTools: [
      'payer-mix-calculator',
      'revenue-leakage-estimator',
      'icd-10-code-search',
      'rcm-performance-scorecard',
    ],
    seoTitle: 'Primary Care Billing and Care Management Support',
    metaDescription:
      'Primary care billing support for annual wellness visits, chronic care management, quality reporting and value-based contracts, inside your own systems.',
    keywords: [
      'primary care billing',
      'annual wellness visit billing',
      'chronic care management billing',
      'value-based care billing',
      'risk adjustment coding primary care',
      'transitional care management billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Oncology                                                         */
  /* ---------------------------------------------------------------- */
  {
    slug: 'oncology',
    name: 'Oncology',
    kind: 'medical',
    icon: 'Ribbon',
    summary:
      'Oncology billing support for drug claims, infusion coding, prior authorization and buy-and-bill reconciliation.',
    definition:
      'Oncology billing involves reporting high-cost drugs with HCPCS J-codes, NDC numbers and accurate billing units, coding drug administration under the infusion hierarchy, securing prior authorization for regimens, and reconciling buy-and-bill drug costs against payer reimbursement. Small errors in units or wastage reporting can affect large claim amounts.',
    intro: [
      'Medical oncology and hematology practices carry an unusual financial risk: many of the drugs they administer are purchased in advance and cost far more than the visit that accompanies them. Under buy-and-bill, the practice pays for the drug, administers it and then waits for payer reimbursement, so every unit that is miscoded, unauthorized or denied affects cash on hand directly.',
      'Oncology claims also combine several layers that must agree with each other: the drug HCPCS code and billing units, the 11-digit NDC and its quantity, discarded-drug reporting, the drug administration codes chosen under the infusion hierarchy, the diagnosis supporting medical necessity and the authorization on file for the regimen. A mismatch in any one of them can stop the whole claim.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support authorization tracking, drug and administration coding review, claim follow-up and payment variance review. The work is designed to help your team catch unit and NDC errors before submission and spot drug underpayments after remittance.',
    ],
    challenges: [
      {
        title: 'Drug units, NDCs and HCPCS crosswalks',
        detail:
          'Each J-code has a defined dosage per billing unit, which rarely matches the vial size. The claim must convert the administered dose into HCPCS units and also report the NDC with the correct qualifier, unit of measure and quantity. Errors here are among the most common causes of drug claim denials or underpayment.',
      },
      {
        title: 'Discarded drug reporting',
        detail:
          'Medicare requires the JW modifier for discarded amounts from single-dose containers and the JZ modifier when no drug was discarded. Commercial payers vary. Missing or inconsistent wastage reporting can trigger denials and audit risk, and documentation must support the amount discarded.',
      },
      {
        title: 'Infusion hierarchy and administration coding',
        detail:
          'Drug administration coding follows a hierarchy: chemotherapy and complex biologic administration ranks above therapeutic infusion, which ranks above hydration, and infusions rank above pushes. Selecting the initial, sequential and concurrent services correctly depends on accurate start and stop times in the infusion record.',
      },
      {
        title: 'Prior authorization for regimens and changes',
        detail:
          'Many payers require authorization for each drug in a regimen, sometimes tied to specific diagnosis, dose, number of cycles or site of care. When the regimen, dose or treatment line changes mid-course, the existing authorization may no longer cover it, and claims can deny after the drug has already been given.',
      },
      {
        title: 'Buy-and-bill reconciliation and site-of-care rules',
        detail:
          'Practices need to compare drug acquisition cost to the allowed amount for each payer, watch for payers that require white bagging or specialty pharmacy sourcing, and check that reimbursement follows contract terms. Without a reconciliation process, drugs reimbursed below cost can go unnoticed.',
      },
      {
        title: 'Patient financial responsibility',
        detail:
          'Coinsurance on high-cost drugs can be substantial. Patient balance estimates, secondary coverage checks and referrals to manufacturer or foundation assistance programs need to happen before treatment starts, not after the first statement goes out.',
      },
    ],
    payerWorkflow: [
      'Verify benefits and medical versus pharmacy benefit coverage for each drug, then obtain and log authorization by drug, dose, cycle count and site of care.',
      'Reconcile the infusion record against the charge: drug codes and units, NDC and quantity, wastage modifiers, and administration codes with start and stop times.',
      'Scrub drug claims for unit limits, NDC formatting and diagnosis support before release to the clearinghouse.',
      'Post drug payments line by line and compare allowed amounts against contract terms and acquisition cost to flag underpayments.',
      'Monitor authorization expiration and cycle counts so renewals are requested before the next scheduled treatment.',
    ],
    services: [
      'prior-authorization',
      'benefits-verification',
      'medical-coding',
      'claims-scrubbing',
      'underpayment-identification',
      'denial-appeals',
      'patient-financial-communication',
    ],
    faqs: [
      {
        q: 'Why do oncology drug claims need both a J-code and an NDC?',
        a: 'Oncology drug claims often need both because the J-code describes the drug and billing unit for payment, while the NDC identifies the exact product, manufacturer and package administered. Medicaid programs require NDCs for rebate purposes and many commercial payers require them too. The NDC quantity and unit of measure must be consistent with the HCPCS units, or the claim may deny.',
      },
      {
        q: 'What are the JW and JZ modifiers?',
        a: 'JW and JZ are HCPCS modifiers Medicare uses for drugs from single-dose containers. JW reports the amount of drug discarded and not administered, billed on its own line. JZ attests that no drug was discarded. Medicare expects one of them on applicable single-dose drug claims. Other payers set their own rules, so wastage reporting should follow each payer policy.',
      },
      {
        q: 'How does the infusion hierarchy affect coding?',
        a: 'The infusion hierarchy determines which drug administration service is reported as the initial service when several are provided in one encounter. Chemotherapy and complex drug administration generally take priority over therapeutic or diagnostic infusions, which take priority over hydration. Every other service is then reported as sequential, concurrent or add-on, so accurate timing documentation is essential.',
      },
      {
        q: 'What happens if a regimen changes after authorization?',
        a: 'If a regimen changes after authorization, the existing approval may not cover the new drug, dose, frequency or number of cycles, so a new or updated authorization is usually needed. Claims for treatment given outside the approved terms can deny even when the treatment was appropriate. A tracking process that flags regimen changes before the next infusion helps prevent this.',
      },
      {
        q: 'Can you help identify drugs reimbursed below cost?',
        a: 'Yes, we can help compare payer allowed amounts for drug lines against your contract terms and the acquisition cost data your practice provides. That review can highlight payers or drugs where reimbursement appears low, contract terms are not being applied, or underpayments should be appealed. Decisions about purchasing or contracting stay with your practice leadership.',
      },
    ],
    relatedTools: [
      'hcpcs-code-lookup',
      'prior-authorization-checklist',
      'underpayment-estimator',
      'payment-variance-calculator',
    ],
    seoTitle: 'Oncology Billing: Drugs, Infusions and Prior Auth',
    metaDescription:
      'Oncology billing support for J-codes, NDC units, wastage modifiers, infusion hierarchy coding, prior authorization and buy-and-bill drug reconciliation.',
    keywords: [
      'oncology billing',
      'chemotherapy billing',
      'infusion coding hierarchy',
      'J-code NDC billing',
      'buy and bill reimbursement',
      'oncology prior authorization',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Pulmonology                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: 'pulmonology',
    name: 'Pulmonology',
    kind: 'medical',
    icon: 'Wind',
    summary:
      'Pulmonology billing support for pulmonary function testing, sleep studies, bronchoscopy, critical care and oxygen documentation.',
    definition:
      'Pulmonology billing involves coding pulmonary function tests and sleep studies with the right technical and professional components, reporting bronchoscopy and other procedures under global surgery rules, billing critical care and hospital services by time, and supporting home oxygen and other equipment orders with documentation that meets payer coverage criteria.',
    intro: [
      'Pulmonology practices often work across several settings in the same week: the office, a pulmonary function lab, a sleep lab, the bronchoscopy suite and the intensive care unit. Each setting has its own billing rules, place of service codes and documentation expectations, and the same physician may bill professional-only, global or facility-based services depending on where the work happened.',
      'Testing makes up a large share of pulmonary revenue. Pulmonary function tests, six-minute walk tests, bronchodilator responsiveness studies and sleep studies each carry specific coding combinations and payer frequency or medical necessity limits. Sleep studies in particular often require prior authorization, and many payers prefer home sleep testing before approving an in-lab study.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support charge capture across settings, authorization tracking for testing and procedures, and claim follow-up. The work is designed to help your team keep professional and technical billing straight and reduce missed hospital and critical care charges.',
    ],
    challenges: [
      {
        title: 'Professional and technical components',
        detail:
          'Pulmonary function and sleep testing can be billed globally, as a technical component with modifier TC, or as a professional interpretation with modifier 26, depending on who owns the equipment and where the test was performed. Billing the wrong component, or both components when only one belongs to the practice, leads to denials or recoupments.',
      },
      {
        title: 'Sleep study authorization and test selection',
        detail:
          'Many payers require prior authorization for sleep testing and expect home sleep apnea testing first unless the patient meets criteria for an in-lab polysomnogram. Titration studies and split-night studies have their own rules, and positive airway pressure coverage often depends on documented follow-up and adherence.',
      },
      {
        title: 'Critical care and hospital time',
        detail:
          'Critical care is billed by total time spent on qualifying care, with rules about what counts toward time and how split or shared visits between physicians and advanced practice providers are reported. Hospital rounding charges are also easy to lose if they are not captured promptly from the inpatient census.',
      },
      {
        title: 'Bronchoscopy and procedure bundling',
        detail:
          'Bronchoscopy procedures with biopsies, washings, navigation or ultrasound guidance are subject to NCCI bundling edits and endoscopy family rules. Separate same-day evaluation and management services need distinct documentation, and procedures carry global periods that affect follow-up visit billing.',
      },
      {
        title: 'Home oxygen and equipment documentation',
        detail:
          'Medicare coverage for home oxygen depends on qualifying test results, timing of the testing relative to the order and documentation in the treating practitioner notes. Supplier claims can be denied when the physician record does not support the order, which often leads to repeated documentation requests to the practice.',
      },
    ],
    payerWorkflow: [
      'Confirm whether each test is billed globally, technical only or professional only based on equipment ownership and the place of service.',
      'Obtain authorization for sleep studies, advanced imaging and many procedures, and record which test type the payer approved.',
      'Capture hospital and critical care charges daily from the census, with time documentation that supports the codes billed.',
      'Apply NCCI edits and modifier rules to bronchoscopy and procedure claims, and track global periods for follow-up visits.',
      'Respond to equipment supplier and payer documentation requests for oxygen and PAP orders with the qualifying test results and notes.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'charge-entry',
      'claims-scrubbing',
      'denial-management',
      'aging-ar-follow-up',
    ],
    faqs: [
      {
        q: 'When should a pulmonary function test be billed with modifier 26?',
        a: 'Modifier 26 is used when your physician provides only the professional interpretation of a pulmonary function test and another entity, such as a hospital, owns the equipment and bills the technical component. When the practice owns the equipment and performs both parts in the office, the test is usually billed globally without a component modifier.',
      },
      {
        q: 'Do sleep studies need prior authorization?',
        a: 'Many commercial and Medicare Advantage plans require prior authorization for sleep studies, and some require it for home sleep apnea tests as well as in-lab studies. Payers often expect home testing first unless the patient has conditions that make it unsuitable. Checking requirements before scheduling helps avoid denials for testing that has already been performed.',
      },
      {
        q: 'How is critical care time documented for billing?',
        a: 'Critical care time should be documented as the total time the physician or qualified practitioner personally spent on qualifying critical care for the patient that day, along with the nature of the critical illness and the care provided. Time spent on separately billable procedures does not count. Payer rules for split or shared critical care should also be followed.',
      },
      {
        q: 'Why do oxygen suppliers keep asking our practice for records?',
        a: 'Oxygen suppliers ask for records because Medicare and many other payers cover home oxygen only when the treating practitioner documentation supports the need, including qualifying blood gas or oximetry results obtained within required timeframes. If the supplier claim is audited, the payer reviews your notes. Clear documentation at the original visit reduces repeated requests.',
      },
    ],
    relatedTools: [
      'prior-authorization-checklist',
      'denial-reasons-guide',
      'clean-claim-rate-calculator',
    ],
    seoTitle: 'Pulmonology Billing: PFTs, Sleep Studies and ICU',
    metaDescription:
      'Pulmonology billing support for PFTs, sleep studies, bronchoscopy, critical care time and oxygen documentation, working inside your existing systems.',
    keywords: [
      'pulmonology billing',
      'pulmonary function test billing',
      'sleep study billing',
      'critical care billing',
      'bronchoscopy coding',
      'home oxygen documentation',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Urology                                                          */
  /* ---------------------------------------------------------------- */
  {
    slug: 'urology',
    name: 'Urology',
    kind: 'medical',
    icon: 'Droplet',
    summary:
      'Urology billing support for in-office procedures, injectable drugs, global surgery periods and imaging or lab services.',
    definition:
      'Urology billing involves coding office procedures such as cystoscopy and prostate biopsy, reporting injectable drugs like hormone therapies with HCPCS codes and units, managing global surgical periods for hospital procedures, and billing in-office imaging, urodynamics and lab services with the correct components and medical necessity support.',
    intro: [
      'Urology combines office medicine, minor and major surgery, diagnostic testing and drug administration in one specialty. A single practice may bill evaluation and management visits, in-office cystoscopies and biopsies, urodynamic studies, ultrasound, injectable hormone therapy for prostate cancer and inpatient surgery, often on the same patients over time.',
      'That mix creates many points where claims can go wrong. Office procedures carry short global periods that affect follow-up visits, injectable drugs require correct units and sometimes authorization, and diagnostic tests need clear medical necessity and the right professional or technical component. Advanced procedures for benign prostatic hyperplasia and stone treatment frequently require prior authorization.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support coding review, authorization tracking and claim follow-up. The work is designed to help your team capture procedures and supplies correctly and keep drug and surgical claims moving.',
    ],
    challenges: [
      {
        title: 'Office procedures and global periods',
        detail:
          'Many urology procedures, including diagnostic cystoscopy, carry a zero-day or ten-day global period, while larger surgeries carry ninety days. Visits during a global period are typically included unless they are unrelated or meet modifier criteria, so global tracking prevents both denials and unbilled separately payable services.',
      },
      {
        title: 'Injectable drugs and units',
        detail:
          'Hormone therapies and other injectables used in urology are billed with HCPCS codes whose billing units must match the administered dose. Several products have similar names but different codes and dosing schedules. Authorization, NDC reporting and discarded-drug modifiers may also apply.',
      },
      {
        title: 'Supplies and in-office procedure payment',
        detail:
          'Payment for supplies and catheters depends on payer rules and the place of service. Some supplies are included in the procedure payment while others may be separately reportable, and practices that dispense supplies may need separate enrollment as a supplier.',
      },
      {
        title: 'Urodynamics and imaging components',
        detail:
          'Urodynamic studies often involve several codes performed together, with NCCI edits and multiple procedure rules. In-office ultrasound and imaging may be billed globally or by component, and documentation must include a written report to support the professional portion.',
      },
      {
        title: 'Authorization for newer procedures',
        detail:
          'Minimally invasive treatments for enlarged prostate, stone procedures and some advanced imaging frequently require prior authorization. Some newer procedures are reported with Category III or unlisted codes that payers review manually, which requires supporting documentation with the claim.',
      },
    ],
    payerWorkflow: [
      'Verify benefits and obtain authorization for scheduled procedures, injectables and advanced imaging before the appointment.',
      'Code office procedures with attention to global periods, same-day visit modifiers and NCCI bundling edits.',
      'Bill injectable drugs with correct HCPCS units, NDCs where required and discarded-drug reporting for single-dose containers.',
      'Submit unlisted or Category III procedure claims with operative notes and comparison information when payers request it.',
      'Track post-operative follow-up visits against global periods so only separately payable services are billed.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'charge-entry',
      'claims-scrubbing',
      'denial-appeals',
      'aging-ar-follow-up',
    ],
    faqs: [
      {
        q: 'Can a visit be billed on the same day as a cystoscopy?',
        a: 'A visit can be billed on the same day as a cystoscopy only when it is significant and separately identifiable beyond the usual pre-procedure evaluation, typically with modifier 25. The decision to perform a minor procedure is generally included in its payment. Documentation should show the separate problem or decision making that justifies the additional visit.',
      },
      {
        q: 'How are injectable prostate cancer drugs billed?',
        a: 'Injectable prostate cancer drugs are billed with the HCPCS code for the specific product and the number of billing units that matches the dose given, along with the administration code. Several products have different formulations and dosing intervals, so the code must match the exact drug used. Many payers require authorization and some require the NDC on the claim.',
      },
      {
        q: 'Why are some urology procedures denied as experimental?',
        a: 'Some urology procedures are denied as experimental or investigational because the payer medical policy has not yet adopted the technology, or because the procedure is reported with a Category III code the payer does not cover. Checking the payer policy and obtaining authorization before scheduling helps, and appeals can include clinical literature and the patient history.',
      },
      {
        q: 'Do post-operative visits after urologic surgery get billed?',
        a: 'Routine post-operative visits within the global period of a urologic surgery are generally included in the surgical payment and are not billed separately. Visits for unrelated problems, or for complications that require a return to the operating room, may be separately reportable with the appropriate modifiers. Tracking the global end date for each patient keeps these decisions consistent.',
      },
    ],
    relatedTools: [
      'hcpcs-code-lookup',
      'prior-authorization-checklist',
      'denial-rate-calculator',
    ],
    seoTitle: 'Urology Billing: Procedures, Drugs and Global Periods',
    metaDescription:
      'Urology billing support for cystoscopy and office procedures, injectable drug units, global surgery periods, urodynamics and authorization tracking.',
    keywords: [
      'urology billing',
      'urology coding',
      'cystoscopy billing',
      'urology injectable drug billing',
      'urodynamics billing',
      'global surgery period urology',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Nephrology                                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: 'nephrology',
    name: 'Nephrology',
    kind: 'medical',
    icon: 'Droplets',
    summary:
      'Nephrology billing support for ESRD monthly capitation services, home dialysis, CKD care and dialysis access coordination.',
    definition:
      'Nephrology billing involves reporting end-stage renal disease monthly capitation services based on patient age and the number of face-to-face visits in the month, billing home dialysis and partial-month services correctly, coding chronic kidney disease care in the office and hospital, and coordinating Medicare secondary payer rules for dialysis patients.',
    intro: [
      'Nephrology billing is shaped by the ESRD monthly capitation payment. Instead of billing each dialysis visit separately, the physician or practitioner managing a patient on dialysis reports one monthly service, with the code determined by the patient age group and the number of face-to-face visits furnished that month. Missing a visit in the documentation, or billing the wrong tier, changes the payment for the entire month.',
      'Nephrologists also see patients across dialysis units, the office, hospitals and sometimes skilled nursing facilities. Partial months, hospital admissions, transplant transitions and home dialysis training all have specific billing rules. Coordination of benefits is another recurring issue, because Medicare can be secondary to an employer group health plan during the ESRD coordination period.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support monthly ESRD charge capture, coverage verification and claim follow-up across settings. The work is designed to help your team bill each month at the level the documentation supports and keep payer order correct.',
    ],
    challenges: [
      {
        title: 'Monthly capitation tiers and visit counts',
        detail:
          'ESRD monthly services are billed once per month in a code family (generally 90951 through 90970) that varies by patient age and the number of face-to-face visits, typically one, two to three, or four or more. Each visit must be documented, and at least one visit per month usually must be in person and include a complete assessment.',
      },
      {
        title: 'Partial months and transitions',
        detail:
          'When a patient starts dialysis mid-month, is hospitalized, receives a transplant, changes nephrologist or dies, the month may need to be billed on a per-day basis instead of the full monthly service. Applying the right rule requires tracking each patient status change by date.',
      },
      {
        title: 'Home dialysis services',
        detail:
          'Patients on home hemodialysis or peritoneal dialysis are billed under separate monthly codes that do not depend on visit counts in the same way, and home dialysis training has its own reporting. Telehealth may be used for some home dialysis visits, subject to Medicare requirements for periodic in-person visits.',
      },
      {
        title: 'ESRD Medicare secondary payer rules',
        detail:
          'For patients entitled to Medicare based on ESRD who also have employer group coverage, the group plan is usually primary for a 30-month coordination period. Billing Medicare first during that period leads to denials or recoupments, so payer order needs to be checked against each patient history.',
      },
      {
        title: 'CKD office care and hospital services',
        detail:
          'Non-dialysis chronic kidney disease patients are billed through standard office visits, and specificity of CKD stage and related conditions matters for medical necessity and risk adjustment. Hospital visits, consults and dialysis access referrals each need separate charge capture.',
      },
    ],
    payerWorkflow: [
      'Collect visit documentation from each dialysis unit and count face-to-face visits per patient per month before selecting the monthly service code.',
      'Apply per-day billing for partial months caused by hospitalization, transplant, transfer or start of dialysis, with dates tracked in a monthly roster.',
      'Verify ESRD coordination period dates and employer group coverage so the correct payer is billed first.',
      'Capture hospital, office and skilled nursing facility services separately from the monthly dialysis service.',
      'Release monthly ESRD claims after the month closes and follow up on any that deny for visit count or eligibility issues.',
    ],
    services: [
      'medical-billing',
      'charge-entry',
      'insurance-eligibility-verification',
      'claims-submission',
      'aging-ar-follow-up',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'How is the ESRD monthly capitation code chosen?',
        a: 'The ESRD monthly capitation code is chosen based on the patient age group and the number of documented face-to-face visits the managing practitioner furnished during the calendar month. More visits generally map to a higher-paying code. The documentation for each visit must be available, and Medicare expects at least one visit per month to include a complete in-person assessment.',
      },
      {
        q: 'What happens when a dialysis patient is hospitalized for part of the month?',
        a: 'When a dialysis patient is hospitalized for part of the month, the monthly service may still be billed if the visit requirements are met, but in some cases the month must be billed using per-day codes instead. The rules depend on the reason the month was interrupted. Hospital visits during the admission are billed separately as inpatient services.',
      },
      {
        q: 'Is Medicare primary for dialysis patients with employer insurance?',
        a: 'Not always. When a person becomes eligible for Medicare because of ESRD and also has employer group health coverage, the group plan is generally primary for a 30-month coordination period, and Medicare pays secondary. After that period ends, Medicare usually becomes primary. Checking coordination dates for each patient prevents denials and later recoupments.',
      },
      {
        q: 'Can home dialysis visits be done by telehealth?',
        a: 'Some home dialysis monthly visits can be furnished by telehealth under Medicare rules, but periodic in-person visits are still required, and requirements differ for the first months of home dialysis. Commercial payers set their own policies. Billing staff should confirm the current Medicare and payer requirements and make sure the visit type is documented clearly.',
      },
    ],
    relatedTools: [
      'payer-mix-calculator',
      'days-in-ar-calculator',
      'icd-10-code-search',
    ],
    seoTitle: 'Nephrology Billing: ESRD Monthly Services and CKD',
    metaDescription:
      'Nephrology billing support for ESRD monthly capitation codes, visit counts, partial months, home dialysis and Medicare secondary payer coordination.',
    keywords: [
      'nephrology billing',
      'ESRD billing',
      'dialysis monthly capitation billing',
      'home dialysis billing',
      'CKD coding',
      'ESRD coordination period',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Endocrinology                                                    */
  /* ---------------------------------------------------------------- */
  {
    slug: 'endocrinology',
    name: 'Endocrinology',
    kind: 'medical',
    icon: 'FlaskConical',
    summary:
      'Endocrinology billing support for CGM services, diabetes supplies, DSMT programs, thyroid procedures and in-office testing.',
    definition:
      'Endocrinology billing involves coding continuous glucose monitor placement and data interpretation, supporting coverage documentation for CGMs, insulin pumps and diabetes supplies, billing diabetes self-management training through a qualifying program, and reporting thyroid ultrasound, fine needle aspiration and in-office lab services with medical necessity support.',
    intro: [
      'Endocrinology practices manage long-term conditions such as diabetes, thyroid disease, osteoporosis and pituitary and adrenal disorders. Much of the billing complexity sits around diabetes technology: continuous glucose monitors, insulin pumps and the supplies that go with them, each subject to payer coverage criteria that rely on documentation in the endocrinologist notes.',
      'Beyond visits, endocrinology practices may bill CGM sensor placement and interpretation of downloaded data, diabetes self-management training, medical nutrition therapy, thyroid ultrasound and biopsy, bone density testing and in-office labs. Several of these have frequency limits, accreditation requirements or specific provider eligibility rules.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support coding, documentation requests, eligibility checks and claim follow-up. The work is designed to help your team bill device-related services correctly and respond quickly to supplier and payer documentation requests.',
    ],
    challenges: [
      {
        title: 'CGM coverage documentation',
        detail:
          'Medicare and many other payers cover CGMs when the patient meets criteria such as insulin use or a history of problematic hypoglycemia, with documentation from a recent visit. Suppliers and pharmacies often need the endocrinologist notes to support the order, and incomplete notes lead to repeated requests and delayed patient access.',
      },
      {
        title: 'CGM professional services',
        detail:
          'Practices may bill for CGM sensor placement and patient training, and for interpretation of downloaded data (codes in the 95249 to 95251 range), each with frequency limits and specific requirements such as a minimum number of days of data. Billing interpretation more often than allowed leads to denials.',
      },
      {
        title: 'Diabetes self-management training',
        detail:
          'Medicare covers DSMT (HCPCS G0108 and G0109) only when furnished through a program accredited by a national accreditation organization recognized by CMS, with limits on initial and follow-up hours. Group and individual sessions are billed differently, and the referral must come from the treating practitioner.',
      },
      {
        title: 'Thyroid ultrasound and biopsy',
        detail:
          'Thyroid ultrasound and fine needle aspiration with imaging guidance follow specific bundling rules, and the number of lesions sampled affects coding. Pathology may be billed by another entity, and documentation must include a separate imaging report when ultrasound is billed on its own.',
      },
      {
        title: 'Pump, supply and medication coverage',
        detail:
          'Insulin pumps and supplies may fall under the medical DME benefit or the pharmacy benefit depending on the payer and product. Prior authorization requirements for newer diabetes and obesity medications also generate a steady volume of paperwork for the practice.',
      },
    ],
    payerWorkflow: [
      'Verify whether CGMs, pumps and supplies are covered under the medical or pharmacy benefit for each payer before writing orders.',
      'Document qualifying criteria and recent visit details in the note so supplier and payer documentation requests can be answered quickly.',
      'Track CGM interpretation and DSMT hours by patient to stay within payer frequency and hour limits.',
      'Obtain prior authorization for medications and devices that require it, and log approval periods for renewal.',
      'Code thyroid procedures and in-office testing with NCCI edits applied, and follow up on medical necessity denials with supporting notes.',
    ],
    services: [
      'prior-authorization',
      'benefits-verification',
      'medical-coding',
      'claims-scrubbing',
      'denial-management',
      'virtual-medical-assistant',
    ],
    faqs: [
      {
        q: 'Who bills for a continuous glucose monitor?',
        a: 'The CGM device and sensors are usually billed by a DME supplier or pharmacy, not by the endocrinology practice. The practice may bill for professional services such as sensor placement and training, and interpretation of downloaded glucose data, when requirements are met. The practice also provides the order and supporting documentation the supplier needs to bill the device.',
      },
      {
        q: 'What does Medicare require to bill DSMT?',
        a: 'Medicare requires that diabetes self-management training be furnished through a program accredited by a CMS-recognized national accreditation organization, ordered by the treating practitioner, and billed within the allowed hours for initial and follow-up training. Programs must also meet staffing and curriculum standards. Practices without accreditation generally cannot bill Medicare for DSMT.',
      },
      {
        q: 'How often can CGM data interpretation be billed?',
        a: 'CGM data interpretation can generally be billed no more than once in a set period, commonly once every 30 days, and only when the payer minimum number of days of data has been collected. Payer rules vary, so the frequency and documentation requirements for each plan should be confirmed. The interpretation must be documented in a written report.',
      },
      {
        q: 'Why do suppliers keep requesting our diabetes notes?',
        a: 'Suppliers request your diabetes notes because Medicare and many other payers require the ordering practitioner records to support coverage criteria for CGMs, pumps and supplies. If the supplier is audited, those notes are reviewed. Clear documentation of insulin use, hypoglycemia history and recent visit dates helps answer requests once instead of several times.',
      },
    ],
    relatedTools: [
      'hcpcs-code-lookup',
      'prior-authorization-checklist',
      'icd-10-code-search',
    ],
    seoTitle: 'Endocrinology Billing: CGM, DSMT and Diabetes Care',
    metaDescription:
      'Endocrinology billing support for CGM placement and interpretation, diabetes supply documentation, DSMT programs, thyroid procedures and prior auth.',
    keywords: [
      'endocrinology billing',
      'CGM billing',
      'DSMT billing',
      'diabetes supply documentation',
      'thyroid biopsy coding',
      'endocrinology prior authorization',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  OB/GYN                                                           */
  /* ---------------------------------------------------------------- */
  {
    slug: 'obgyn',
    name: 'Obstetrics and Gynecology',
    kind: 'medical',
    icon: 'Baby',
    summary:
      'OB/GYN billing support for global maternity packages, split billing, well-woman visits, contraception and gynecologic procedures.',
    definition:
      'OB/GYN billing involves reporting global obstetric packages that bundle antepartum care, delivery and postpartum care, splitting those services when a patient changes practices or insurance mid-pregnancy, billing preventive well-woman visits apart from problem care, and coding contraception, ultrasound and gynecologic procedures under payer-specific rules.',
    intro: [
      'Obstetric billing does not follow the usual one-visit, one-claim pattern. Routine prenatal visits, the delivery and postpartum care are typically bundled into a global maternity package and billed after delivery. That means months of work may be unbilled until the baby is born, and any change in coverage, practice or provider during pregnancy can force the package to be split into separate components.',
      'Gynecology adds its own layer: preventive well-woman exams with Medicare-specific screening codes, contraception and long-acting reversible contraceptive devices, office procedures, ultrasound, and surgery with global periods. Many patients are covered by Medicaid, which has state-specific rules for pregnancy coverage, presumptive eligibility and postpartum coverage.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to track pregnancies from first visit to postpartum, verify coverage changes and support coding and follow-up. The work is designed to help your team bill maternity care at the right time and in the right components.',
    ],
    challenges: [
      {
        title: 'Global maternity package timing',
        detail:
          'Global obstetric codes (such as 59400 for vaginal delivery and 59510 for cesarean) include routine antepartum visits, delivery and postpartum care and are usually billed once after delivery. Practices need a tracking log of every pregnancy so packages are billed promptly and nothing is lost between the first visit and the postpartum visit.',
      },
      {
        title: 'Split billing when circumstances change',
        detail:
          'When a patient transfers care, changes insurance, or delivers with another provider, the global package cannot be billed. Instead, antepartum visits are billed by count using visit-range codes, and delivery and postpartum care are billed separately. Payers differ on how they want the split reported.',
      },
      {
        title: 'Services outside the global package',
        detail:
          'Ultrasounds, lab work, visits for problems unrelated to routine pregnancy and many high-risk services are not included in the global package and can be billed separately with appropriate diagnosis codes. Distinguishing included and separate services requires careful review of each prenatal encounter.',
      },
      {
        title: 'Medicaid pregnancy coverage',
        detail:
          'Medicaid pregnancy coverage rules vary by state, including presumptive eligibility, retroactive coverage, managed care plan assignment and extended postpartum coverage. Eligibility must be checked repeatedly through pregnancy because plan assignment can change.',
      },
      {
        title: 'Well-woman, screening and contraception',
        detail:
          'Preventive gynecologic visits use different codes for Medicare (screening pelvic exam and specimen collection HCPCS codes) and commercial payers. Contraceptive devices and insertion are generally billed separately, and many plans cover contraception without cost sharing under federal preventive services rules.',
      },
    ],
    payerWorkflow: [
      'Open a pregnancy tracking record at the first prenatal visit, verify coverage and note the estimated delivery date and any authorization the payer requires.',
      'Re-verify eligibility at intervals during pregnancy, especially for Medicaid and marketplace patients whose plan assignment may change.',
      'Bill separately payable services such as ultrasounds and problem visits as they occur, with pregnancy diagnosis codes that support them.',
      'After delivery, bill the global package or, if care was split, the antepartum visit count, delivery and postpartum components the practice provided.',
      'Bill well-woman, screening and contraception services under each payer preventive rules and appeal cost sharing errors when preventive coverage applies.',
    ],
    services: [
      'medical-billing',
      'insurance-eligibility-verification',
      'medical-coding',
      'charge-entry',
      'denial-management',
      'patient-financial-communication',
    ],
    faqs: [
      {
        q: 'When is the global maternity package billed?',
        a: 'The global maternity package is usually billed after delivery, once antepartum care, the delivery and postpartum care have been furnished by the same practice. Some payers allow or require billing at different points, and some ask for the first prenatal visit date on the claim. Practices should confirm each payer policy and track deliveries so packages are billed promptly.',
      },
      {
        q: 'What is split billing in obstetrics?',
        a: 'Split billing means billing the parts of maternity care separately instead of as one global package. It applies when the patient changes insurance or practices, or when another provider performs the delivery. Antepartum care is billed by the number of visits furnished, using visit-range codes, and delivery and postpartum services are billed as separate components.',
      },
      {
        q: 'Are prenatal ultrasounds included in the global package?',
        a: 'No, prenatal ultrasounds are generally not included in the global maternity package and are billed separately when medically necessary and documented with a written report. Payers may limit the number of routine ultrasounds per pregnancy and require specific diagnosis codes for additional scans. Lab tests and visits for unrelated problems are also usually billed separately.',
      },
      {
        q: 'How are well-woman visits billed for Medicare patients?',
        a: 'For Medicare patients, preventive gynecologic care is typically billed with specific HCPCS codes for the screening pelvic and breast exam and for collecting a screening Pap specimen, subject to frequency limits based on risk. Commercial plans usually use preventive visit codes instead. A separately documented problem visit on the same day may also be billable.',
      },
      {
        q: 'Do you help track Medicaid eligibility during pregnancy?',
        a: 'Yes, we can help re-check Medicaid and managed care eligibility at set points during pregnancy, record plan changes and make sure claims go to the plan responsible on each date of service. Pregnancy coverage rules vary by state, so we follow the rules of the state Medicaid program and plans your practice works with.',
      },
    ],
    relatedTools: [
      'icd-10-code-search',
      'claim-submission-checklist',
      'denial-reasons-guide',
    ],
    seoTitle: 'OB/GYN Billing: Global Maternity and Split Billing',
    metaDescription:
      'OB/GYN billing support for global maternity packages, split billing, prenatal ultrasound, Medicaid pregnancy coverage and well-woman visit coding.',
    keywords: [
      'OB/GYN billing',
      'global maternity billing',
      'obstetric split billing',
      'prenatal care coding',
      'well woman visit billing',
      'gynecology billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Ophthalmology                                                    */
  /* ---------------------------------------------------------------- */
  {
    slug: 'ophthalmology',
    name: 'Ophthalmology',
    kind: 'medical',
    icon: 'Eye',
    summary:
      'Ophthalmology billing support for medical versus vision plans, refractions, diagnostic testing, injections and cataract surgery.',
    definition:
      'Ophthalmology billing involves deciding whether a visit belongs to the patient medical insurance or vision plan, handling refraction as a commonly non-covered service, billing eye exam codes or E/M visits, coding diagnostic tests with laterality and frequency limits, reporting intravitreal drug injections, and managing cataract surgery global periods and co-management.',
    intro: [
      'Ophthalmology is one of the few specialties where many patients carry two kinds of coverage for the same body part. A routine vision exam may belong to a vision plan, while the evaluation of glaucoma, cataract, macular degeneration or diabetic eye disease belongs to the medical plan. The reason for the visit and the diagnoses documented determine where the claim goes and what the patient owes.',
      'Ophthalmology claims also involve frequent diagnostic testing, high-cost injectable drugs for retinal disease and surgery with ninety-day global periods. Each has rules about laterality, frequency, bundling and documentation. Cataract surgery adds patient-paid options such as premium lenses that must be separated from the covered portion of care.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support benefit verification for medical and vision plans, coding review and claim follow-up. The work is designed to help your team route claims correctly and set clear patient expectations before services are performed.',
    ],
    challenges: [
      {
        title: 'Medical versus vision plan routing',
        detail:
          'Whether a visit is billed to a medical plan or a vision plan depends on the chief complaint and diagnoses, not only on what the patient prefers. Practices need clear front-desk scripts and verification of both coverages so that claims go to the right payer and patients understand which plan covers what.',
      },
      {
        title: 'Refraction non-coverage',
        detail:
          'Refraction (92015) is excluded from Medicare coverage by statute and is not covered by many medical plans. Because it is excluded rather than denied for medical necessity, an ABN is not required for Medicare, though many practices use a voluntary notice. Patients should know in advance that they may owe for it.',
      },
      {
        title: 'Eye exam codes versus E/M visits',
        detail:
          'Ophthalmologists can bill general ophthalmological service codes (92002 through 92014) or standard E/M codes, and each has its own documentation requirements. Some payers have specific preferences or frequency limits, so code selection should be consistent with both documentation and payer policy.',
      },
      {
        title: 'Diagnostic testing and laterality',
        detail:
          'Tests such as OCT, visual fields and fundus photography carry bilateral or unilateral designations, NCCI edits against each other and frequency limits tied to diagnosis. Using the wrong RT, LT or bilateral reporting, or testing more often than policy allows, causes denials.',
      },
      {
        title: 'Intravitreal injections and cataract surgery',
        detail:
          'Anti-VEGF drugs are billed with HCPCS codes, units and discarded-drug modifiers, often with step therapy or authorization requirements. Cataract surgery carries a ninety-day global period, may be co-managed with optometrists using modifiers 54 and 55, and premium lens upgrades must be billed to the patient separately from covered services.',
      },
    ],
    payerWorkflow: [
      'Verify both medical and vision coverage at scheduling, and route each visit based on the documented reason and diagnoses.',
      'Notify patients in advance about refraction and other services their plans do not cover, and collect or record their acknowledgment.',
      'Code diagnostic tests with laterality modifiers and check frequency limits and NCCI edits before submission.',
      'Obtain authorization for injectable drugs where required, bill drug units and wastage correctly, and track step therapy requirements.',
      'Bill cataract surgery with co-management modifiers when care is shared, and separate patient-paid lens upgrades from the covered surgical claim.',
    ],
    services: [
      'insurance-eligibility-verification',
      'benefits-verification',
      'medical-coding',
      'prior-authorization',
      'claims-scrubbing',
      'patient-financial-communication',
      'denial-management',
    ],
    faqs: [
      {
        q: 'How do you decide whether to bill a medical plan or a vision plan?',
        a: 'The decision depends on the reason for the visit and the diagnoses documented. A routine exam for glasses or contacts with no medical complaint typically goes to the vision plan. A visit to evaluate or manage an eye disease, injury or symptom usually goes to the medical plan. Payer contracts may add rules, so front-desk verification of both coverages matters.',
      },
      {
        q: 'Does Medicare pay for refractions?',
        a: 'No, Medicare does not pay for refractions because they are excluded from coverage by statute. Because the exclusion is statutory, an Advance Beneficiary Notice is not required, although many practices give patients a voluntary notice of the charge. Some Medicare Advantage plans and supplemental vision benefits may cover refraction, so coverage should be verified.',
      },
      {
        q: 'What are modifiers 54 and 55 in cataract surgery?',
        a: 'Modifiers 54 and 55 are used when cataract surgery care is shared between providers. The surgeon bills the procedure with modifier 54 for the surgical portion, and the provider who handles post-operative care, often an optometrist, bills with modifier 55. Both claims need consistent dates and documentation of the transfer of care.',
      },
      {
        q: 'Why are some ophthalmic tests denied for frequency?',
        a: 'Ophthalmic tests are denied for frequency when they exceed the number allowed by a payer medical policy for a given diagnosis within a time period. Medicare local coverage determinations and commercial policies often limit how often tests like OCT or visual fields are covered. Documentation should explain any change in condition that justifies more frequent testing.',
      },
    ],
    relatedTools: [
      'hcpcs-code-lookup',
      'eob-explained',
      'patient-balance-calculator',
    ],
    seoTitle: 'Ophthalmology Billing: Medical vs Vision Plans',
    metaDescription:
      'Ophthalmology billing support for medical versus vision plan routing, refraction notices, diagnostic test laterality, intravitreal drugs and cataracts.',
    keywords: [
      'ophthalmology billing',
      'medical vs vision billing',
      'refraction billing Medicare',
      'intravitreal injection billing',
      'cataract surgery co-management billing',
      'ophthalmic testing coding',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Podiatry                                                         */
  /* ---------------------------------------------------------------- */
  {
    slug: 'podiatry',
    name: 'Podiatry',
    kind: 'medical',
    icon: 'Footprints',
    summary:
      'Podiatry billing support for routine foot care rules, class findings modifiers, diabetic shoes, wound care and foot surgery.',
    definition:
      'Podiatry billing involves applying Medicare routine foot care exclusions and their exceptions, documenting systemic conditions and class findings with Q modifiers, respecting nail debridement frequency limits, supporting therapeutic shoe coverage for diabetic patients, and coding wound care, injections and foot surgery under global period rules.',
    intro: [
      'Podiatry has one of the most rule-dense billing environments in Medicare. Routine foot care, such as trimming nails or paring corns and calluses, is excluded from coverage unless the patient has a qualifying systemic condition and documented findings that make the care medically necessary. The exceptions depend on specific documentation, modifiers and sometimes the name of the physician treating the systemic condition.',
      'Beyond routine care, podiatrists bill wound debridement, injections, imaging, orthotics, therapeutic shoes for diabetic patients and foot and ankle surgery. Each has its own coverage requirements, and several, such as therapeutic shoes, depend on documentation from another physician.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support coding review, Medicare documentation checks and claim follow-up. The work is designed to help your team bill covered foot care with the documentation and modifiers payers expect, and to give patients clear notice when care may not be covered.',
    ],
    challenges: [
      {
        title: 'Routine foot care exclusion and exceptions',
        detail:
          'Medicare generally excludes routine foot care but covers it for patients with certain systemic conditions, such as diabetes with peripheral neuropathy or peripheral arterial disease, when the condition makes unskilled care hazardous. The documentation must show both the qualifying condition and current findings.',
      },
      {
        title: 'Class findings and Q modifiers',
        detail:
          'Medicare uses Q7, Q8 and Q9 modifiers to report which combination of class findings supports covered routine foot care. The note must document those specific findings at each visit. For some conditions, the claim also needs the name of the treating physician and the date the patient was last seen for the systemic condition.',
      },
      {
        title: 'Nail debridement frequency',
        detail:
          'Medicare contractors limit how often covered routine foot care and nail debridement can be billed, often no more than once every 60 days or so, unless documentation supports more frequent care. Practices need to check prior service dates before each visit.',
      },
      {
        title: 'Therapeutic shoes for diabetic patients',
        detail:
          'Medicare covers therapeutic shoes and inserts for qualifying diabetic patients only when the physician managing the diabetes (an MD or DO) certifies the need and documents qualifying foot conditions. Podiatrists who dispense shoes also need supplier enrollment and must meet supplier standards.',
      },
      {
        title: 'Wound care and surgery',
        detail:
          'Debridement codes depend on the depth of tissue removed and the surface area, which must be documented precisely. Foot and ankle surgeries carry global periods, and many bunion or hammertoe procedures require authorization and conservative treatment history.',
      },
    ],
    payerWorkflow: [
      'Check for a qualifying systemic condition and the date the patient was last seen by the treating physician before routine foot care visits when required.',
      'Document class findings and apply the correct Q modifier on covered routine foot care claims.',
      'Check prior routine foot care dates against frequency limits, and issue an ABN when coverage is uncertain so modifiers like GA can be applied.',
      'Collect certifying physician statements and supporting notes before dispensing therapeutic shoes or inserts.',
      'Code debridement by depth and size, obtain authorization for elective surgery, and track global periods for post-operative visits.',
    ],
    services: [
      'medical-coding',
      'coding-audit',
      'insurance-eligibility-verification',
      'prior-authorization',
      'claims-scrubbing',
      'denial-management',
    ],
    faqs: [
      {
        q: 'Does Medicare cover routine foot care?',
        a: 'Medicare generally does not cover routine foot care, such as nail trimming or paring calluses, but it does cover it for patients with certain systemic conditions when unskilled care could be hazardous. The patient record must document the qualifying condition and current class findings, and the claim must carry the appropriate modifier. Without that documentation, the service is treated as non-covered.',
      },
      {
        q: 'What are the Q7, Q8 and Q9 modifiers?',
        a: 'Q7, Q8 and Q9 are Medicare modifiers that indicate which combination of class findings supports covered routine foot care. Class findings are specific signs, such as absent pulses or certain skin changes, documented at the visit. Each modifier corresponds to a different combination. The findings in the note must match the modifier on the claim.',
      },
      {
        q: 'When should a podiatry practice use an ABN?',
        a: 'A podiatry practice should use an Advance Beneficiary Notice when it expects Medicare may deny a service as not reasonable and necessary, such as foot care that may exceed frequency limits or lack qualifying findings. The signed notice allows the practice to bill the patient if Medicare denies. The claim is then reported with the appropriate ABN modifier.',
      },
      {
        q: 'Can podiatrists bill for diabetic shoes?',
        a: 'Podiatrists can bill for therapeutic shoes and inserts for diabetic patients when they are enrolled as a supplier and meet supplier standards, and when the MD or DO managing the patient diabetes has certified the need. The podiatrist documents the foot evaluation and fitting. Missing certification is one of the most common reasons these claims are denied.',
      },
    ],
    relatedTools: [
      'denial-reasons-guide',
      'icd-10-code-search',
      'claim-submission-checklist',
    ],
    seoTitle: 'Podiatry Billing: Routine Foot Care and Q Modifiers',
    metaDescription:
      'Podiatry billing support for Medicare routine foot care rules, class findings and Q modifiers, debridement frequency, diabetic shoes and foot surgery.',
    keywords: [
      'podiatry billing',
      'routine foot care Medicare',
      'Q7 Q8 Q9 modifiers',
      'diabetic shoe billing',
      'nail debridement billing',
      'wound debridement coding',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  ENT                                                              */
  /* ---------------------------------------------------------------- */
  {
    slug: 'ent',
    name: 'ENT / Otolaryngology',
    kind: 'medical',
    icon: 'Ear',
    summary:
      'ENT billing support for nasal endoscopy, sinus procedures, allergy testing and immunotherapy, audiology and hearing services.',
    definition:
      'ENT billing involves coding diagnostic endoscopies alongside office visits, reporting sinus surgery and balloon procedures with bilateral and bundling rules, billing allergy testing and immunotherapy by test count and antigen doses, and separating covered audiology diagnostics from hearing aid services that many plans exclude.',
    intro: [
      'Otolaryngology practices treat conditions of the ear, nose, throat, sinuses and head and neck, often with several revenue lines under one roof. A typical ENT group may bill office visits with diagnostic endoscopy, in-office and facility sinus procedures, allergy testing and immunotherapy, audiology testing and hearing aid dispensing, and head and neck surgery.',
      'Each of those lines has different billing rules. Endoscopies interact with same-day visits and NCCI edits, sinus procedures depend on laterality and the combination of sinuses treated, allergy services are billed by number of tests and antigen doses, and hearing aids are frequently outside medical coverage entirely.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support coding review, benefit checks and claim follow-up across these service lines. The work is designed to help your team keep procedure, allergy and audiology billing organized and set clear patient expectations for non-covered services.',
    ],
    challenges: [
      {
        title: 'Endoscopy with same-day visits',
        detail:
          'Diagnostic nasal endoscopy and laryngoscopy are often performed during an office visit. The visit is billable separately only when it is significant and separately identifiable, typically with modifier 25, and the endoscopy needs its own documented findings. Payers frequently review this combination.',
      },
      {
        title: 'Sinus procedures and laterality',
        detail:
          'Sinus surgery and balloon dilation codes depend on which sinuses are treated and whether the procedure is unilateral or bilateral. Some codes are defined as unilateral and need modifier 50 or RT and LT when performed on both sides, while others already include multiple sinuses. Authorization is commonly required.',
      },
      {
        title: 'Allergy testing and immunotherapy units',
        detail:
          'Allergy testing is billed by the number of tests performed, and antigen preparation is billed by the number of doses prepared. Payers often limit the number of tests per year and the number of doses billed at once, and the definition of a dose can differ between Medicare and commercial plans.',
      },
      {
        title: 'Audiology and hearing aids',
        detail:
          'Diagnostic audiology tests may be covered under the medical benefit when ordered for a medical reason, but hearing aids and fittings are excluded from traditional Medicare and limited or excluded in many commercial plans. Some Medicare Advantage plans offer hearing benefits through separate vendors.',
      },
      {
        title: 'Pediatric procedures and facility settings',
        detail:
          'Common pediatric procedures such as ear tubes, tonsillectomy and adenoidectomy are often performed in hospital outpatient departments or surgery centers, so the professional claim must reflect the correct place of service and bilateral reporting rules.',
      },
    ],
    payerWorkflow: [
      'Verify medical, allergy and hearing benefits separately, since coverage for testing, immunotherapy and hearing aids often differs.',
      'Obtain authorization for sinus surgery, balloon procedures and imaging, and confirm laterality on the authorization.',
      'Code endoscopy and same-day visits with modifier rules applied and documentation reviewed for separate findings.',
      'Track allergy test counts and antigen doses per patient against payer annual and per-billing limits.',
      'Bill audiology diagnostics under the medical benefit when ordered for a medical reason, and handle hearing aid charges under the patient hearing benefit or as self-pay.',
    ],
    services: [
      'medical-coding',
      'prior-authorization',
      'benefits-verification',
      'claims-scrubbing',
      'patient-billing',
      'denial-management',
    ],
    faqs: [
      {
        q: 'Can an office visit be billed with a nasal endoscopy?',
        a: 'An office visit can be billed with a nasal endoscopy only when the visit addresses a significant, separately identifiable problem beyond the decision to perform the endoscopy. In that case modifier 25 is typically applied to the visit. When the visit simply leads to a planned diagnostic endoscopy, payers generally consider it included in the procedure payment.',
      },
      {
        q: 'How is allergy immunotherapy billed?',
        a: 'Allergy immunotherapy is generally billed in two parts: preparation of the antigen extract, reported by the number of doses prepared, and administration of the injections, reported per visit by number of injections. Payers set limits on how many doses can be billed at once and may define a dose differently, so policies should be checked before billing.',
      },
      {
        q: 'Does Medicare cover hearing aids?',
        a: 'Traditional Medicare does not cover hearing aids or hearing aid fitting exams. It may cover diagnostic hearing and balance testing when ordered by a physician or qualified practitioner for a medical reason. Many Medicare Advantage plans offer hearing aid benefits, often through separate vendors, so patients should be verified for those benefits before dispensing.',
      },
      {
        q: 'How are bilateral sinus procedures reported?',
        a: 'Bilateral sinus procedures are reported according to how each code is defined. Unilateral codes performed on both sides are usually reported with modifier 50 or with RT and LT on separate lines, depending on payer preference. Some sinus codes already describe work on more than one sinus, so careful review of each code definition prevents overbilling or underbilling.',
      },
    ],
    relatedTools: [
      'prior-authorization-checklist',
      'denial-reasons-guide',
      'patient-balance-calculator',
    ],
    seoTitle: 'ENT Billing: Endoscopy, Allergy and Audiology',
    metaDescription:
      'ENT and otolaryngology billing support for nasal endoscopy, sinus procedures, allergy testing and immunotherapy, audiology and hearing aid benefits.',
    keywords: [
      'ENT billing',
      'otolaryngology billing',
      'allergy immunotherapy billing',
      'sinus surgery coding',
      'audiology billing',
      'nasal endoscopy billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Ambulatory surgery centers                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: 'ambulatory-surgery-centers',
    name: 'Surgery Centers',
    kind: 'medical',
    icon: 'Building2',
    summary:
      'Ambulatory surgery center billing support for facility claims, payment indicators, implants, multiple procedure rules and authorizations.',
    definition:
      'Ambulatory surgery center billing involves submitting facility claims separately from surgeon and anesthesia professional claims, checking procedures against the Medicare ASC covered procedures list and payment indicators, applying multiple procedure discounting, billing implants and separately payable items, and following commercial contract terms that may differ from Medicare.',
    intro: [
      'An ambulatory surgery center bills for the facility side of an outpatient surgery: the operating room, nursing staff, supplies and many drugs. The surgeon, anesthesia provider and pathologist each bill their own professional services separately. Coordinating these claims so they agree on procedures, dates and diagnoses is a basic but frequently missed requirement.',
      'Medicare pays ASCs based on the ASC covered procedures list, with payment indicators that determine whether each code is paid, packaged, device-intensive or subject to discounting. Commercial payers may use Medicare-based methods, case rates, percent-of-charges contracts or carve-outs for implants and high-cost items, and some require a different claim form than Medicare.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support case verification, coding, claim submission and payment review. The work is designed to help your team bill each case according to its payer rules and spot payments that do not match contract terms.',
    ],
    challenges: [
      {
        title: 'Facility and professional claims',
        detail:
          'The ASC facility claim and the professional claims for surgeon and anesthesia must be consistent, but they follow different rules. Medicare ASC facility claims go on the professional claim format, while some commercial and Medicaid payers expect an institutional claim. Using the wrong format leads to rejections.',
      },
      {
        title: 'Covered procedures and payment indicators',
        detail:
          'Medicare publishes payment indicators for every code on the ASC list, showing whether it is paid separately, packaged into another service, device-intensive or eligible for multiple procedure discounting. Procedures not on the covered list are not paid to the ASC by Medicare, so scheduling should check the list first.',
      },
      {
        title: 'Multiple procedure discounting',
        detail:
          'When more than one discountable procedure is performed in a session, the highest-paying procedure is usually paid in full and additional procedures are reduced, often by 50 percent under Medicare. Commercial contracts may use different discount rules, so payment review must apply the right methodology for each payer.',
      },
      {
        title: 'Implants and carve-outs',
        detail:
          'Device-intensive procedures and implants have special payment treatment. Many commercial contracts carve out implants for separate payment at invoice cost or a markup, which requires attaching invoices and reporting the right HCPCS codes. Missing invoices are a common cause of underpayment.',
      },
      {
        title: 'Authorization and case verification',
        detail:
          'Elective procedures often require authorization for the specific CPT codes and site of service. If the surgeon performs an additional or different procedure than authorized, the facility claim may deny. Verifying authorizations against the operative note before billing helps prevent this.',
      },
    ],
    payerWorkflow: [
      'Verify benefits, site-of-service rules and authorization for each scheduled case, including the specific procedure codes approved.',
      'Code the facility claim from the operative note and check each code against the covered procedures list and payment indicators for Medicare cases.',
      'Submit the facility claim in the format each payer requires, with implant invoices and HCPCS codes attached when contracts carve them out.',
      'Coordinate with surgeon and anesthesia billing so procedures, dates and diagnoses match across claims.',
      'Post payments and compare them against expected reimbursement, including multiple procedure discounting and implant terms, to identify underpayments.',
    ],
    services: [
      'prior-authorization',
      'medical-coding',
      'claims-submission',
      'underpayment-identification',
      'fee-schedule-analysis',
      'payer-contracting',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'Does an ASC bill on a UB-04 or a CMS-1500?',
        a: 'For Medicare, ambulatory surgery centers bill facility services on the professional claim format, the CMS-1500 or its electronic 837P equivalent. Some commercial payers and state Medicaid programs require the institutional UB-04 or 837I format instead. The right format depends on each payer contract and policy, so it should be confirmed during payer setup.',
      },
      {
        q: 'What are ASC payment indicators?',
        a: 'ASC payment indicators are codes Medicare assigns to each procedure and item on the ASC payment list to show how it is paid. They indicate whether a service is paid separately, packaged, device-intensive, or subject to multiple procedure discounting. CMS updates them through the annual and quarterly ASC payment rules, so billing systems need current tables.',
      },
      {
        q: 'How does multiple procedure discounting work in an ASC?',
        a: 'Multiple procedure discounting means that when several discountable procedures are performed in the same session, the procedure with the highest payment is paid at the full rate and the others are paid at a reduced rate. Medicare commonly reduces additional procedures by half. Commercial payers set their own rules in contracts, which should be checked during payment review.',
      },
      {
        q: 'Why are implant payments often lower than expected?',
        a: 'Implant payments are often lower than expected because contracts may require invoices, specific HCPCS codes or separate line reporting for implants to be paid as carve-outs. If the invoice is missing or the implant is not reported correctly, the payer may treat it as packaged into the procedure payment. Reviewing contract terms and claim attachments helps identify these gaps.',
      },
      {
        q: 'Do you bill for surgeons as well as the facility?',
        a: 'We can support both facility billing and professional billing for surgeons and anesthesia providers, depending on what your center and its physicians need. Keeping facility and professional claims consistent helps reduce denials when payers compare them. We work inside the systems each entity already uses and coordinate with any separate billing teams involved.',
      },
    ],
    relatedTools: [
      'fee-schedule-comparison-calculator',
      'underpayment-estimator',
      'prior-authorization-checklist',
      'payment-variance-calculator',
    ],
    seoTitle: 'Surgery Center Billing: ASC Facility Claims Support',
    metaDescription:
      'Ambulatory surgery center billing support for facility claims, ASC payment indicators, multiple procedure discounting, implant carve-outs and prior auth.',
    keywords: [
      'ambulatory surgery center billing',
      'ASC billing',
      'ASC payment indicators',
      'multiple procedure discounting ASC',
      'implant carve-out billing',
      'surgery center revenue cycle',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Home health                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: 'home-health',
    name: 'Home Healthcare',
    kind: 'medical',
    icon: 'Home',
    summary:
      'Home health billing support for PDGM periods, NOA timing, OASIS coordination, face-to-face documentation and plan of care signatures.',
    definition:
      'Home health billing involves billing Medicare in 30-day periods under the Patient-Driven Groupings Model, filing a Notice of Admission on time, coordinating OASIS assessments that drive payment groupings, documenting the face-to-face encounter and signed plan of care, and handling commercial and Medicaid authorizations that often pay per visit.',
    intro: [
      'Home health agencies bill very differently from physician practices. Medicare pays agencies under the Patient-Driven Groupings Model, in 30-day periods within 60-day certification periods. Payment depends on clinical grouping, functional impairment from the OASIS assessment, comorbidities, admission source and timing, and visit counts that may trigger a low-utilization payment adjustment.',
      'Before final claims can be paid, several pieces must be in place: a timely Notice of Admission, a completed and submitted OASIS assessment, a face-to-face encounter that meets timing requirements, and a plan of care signed by the certifying physician or allowed practitioner. Missing any one of them can delay or reduce payment for the period.',
      'Texas Solutions works inside your agency software, EHR and clearinghouse to support intake verification, NOA tracking, documentation follow-up and claim submission. The work is designed to help your team keep each period ready to bill and follow up on claims that stall.',
    ],
    challenges: [
      {
        title: 'Notice of Admission timing',
        detail:
          'Medicare requires agencies to submit a Notice of Admission within five calendar days of the start of care. Late NOAs result in a payment reduction for the days before the NOA was submitted, unless an exception applies. Tracking each admission against that deadline is essential.',
      },
      {
        title: 'OASIS and PDGM groupings',
        detail:
          'Functional scores from the OASIS assessment, along with diagnosis coding, determine the PDGM payment group. Diagnosis codes must be specific and acceptable as primary diagnoses, and inconsistencies between OASIS responses and the clinical record can lead to incorrect grouping or review.',
      },
      {
        title: 'Face-to-face encounter documentation',
        detail:
          'The face-to-face encounter must occur within 90 days before or 30 days after the start of care and relate to the primary reason for home health. The certifying practitioner records must support homebound status and the need for skilled services. Obtaining these records from outside physicians often delays billing.',
      },
      {
        title: 'Plan of care signatures and orders',
        detail:
          'Final claims require a signed and dated plan of care, and verbal orders must be signed before billing. Agencies often wait on signatures from busy physician offices, so a follow-up process for outstanding orders directly affects cash flow.',
      },
      {
        title: 'LUPAs, commercial and Medicaid payers',
        detail:
          'Periods with fewer visits than the threshold for their payment group are paid per visit as low-utilization payment adjustments. Medicare Advantage, Medicaid and commercial payers may require authorization for each visit or discipline and pay per visit, so agencies effectively run several billing models at once.',
      },
    ],
    payerWorkflow: [
      'Verify eligibility, existing home health or hospice episodes, and payer authorization requirements during intake, before the start of care.',
      'Submit the Notice of Admission within five calendar days of the start of care and confirm its acceptance.',
      'Track OASIS completion and submission, coding review, face-to-face documentation and signed plan of care for each 30-day period.',
      'Release final claims once all required documentation is in place, and track LUPA thresholds against scheduled visits.',
      'Bill Medicare Advantage, Medicaid and commercial payers according to their authorization and per-visit rules, and follow up on stalled claims.',
    ],
    services: [
      'insurance-eligibility-verification',
      'prior-authorization',
      'medical-coding',
      'claims-submission',
      'aging-ar-follow-up',
      'healthcare-data-entry',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'What is PDGM in home health billing?',
        a: 'PDGM, the Patient-Driven Groupings Model, is the Medicare payment system for home health agencies. It pays for 30-day periods of care based on clinical grouping from the primary diagnosis, functional impairment from OASIS, comorbidities, admission source and whether the period is early or late. Periods with low visit counts are paid per visit instead.',
      },
      {
        q: 'What happens if a Notice of Admission is late?',
        a: 'If a Notice of Admission is submitted more than five calendar days after the start of care, Medicare reduces payment for the days from the start of care until the NOA was submitted, unless the agency qualifies for an exception. The reduction applies to the period payment. Timely NOA submission is one of the simplest ways to protect home health revenue.',
      },
      {
        q: 'When must the face-to-face encounter occur?',
        a: 'The face-to-face encounter must occur no more than 90 days before or within 30 days after the start of home health care, and it must relate to the primary reason the patient needs home health services. It can be performed by certain allowed practitioners. The certifying practitioner must document that the encounter occurred.',
      },
      {
        q: 'Can home health claims be billed before orders are signed?',
        a: 'No, Medicare final claims for a home health period generally cannot be billed until the plan of care and any verbal orders have been signed and dated by the certifying physician or allowed practitioner. Billing without signatures creates audit risk. A routine follow-up process with referring offices helps reduce the number of periods held for signatures.',
      },
      {
        q: 'Can you help with Medicare Advantage home health authorizations?',
        a: 'Yes, we can help request and track Medicare Advantage authorizations for home health, including visit counts by discipline and authorization periods. Many plans authorize a set number of visits and require updated clinical information to extend them. We log approvals in your system so schedulers can see remaining visits before they are exhausted.',
      },
    ],
    relatedTools: [
      'prior-authorization-checklist',
      'icd-10-code-search',
      'claim-turnaround-time-calculator',
      'days-in-ar-calculator',
    ],
    seoTitle: 'Home Health Billing: PDGM, NOA and OASIS Support',
    metaDescription:
      'Home health billing support for PDGM 30-day periods, Notice of Admission timing, OASIS coordination, face-to-face rules and signed plans of care.',
    keywords: [
      'home health billing',
      'PDGM billing',
      'home health notice of admission',
      'OASIS billing',
      'home health face-to-face requirement',
      'LUPA home health',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Mental health clinics                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: 'mental-health-clinics',
    name: 'Mental Health Clinics',
    kind: 'medical',
    icon: 'Brain',
    summary:
      'Revenue cycle support for mental health clinics and group practices with many license types, payer panels and supervision rules.',
    definition:
      'Mental health clinic billing involves credentialing clinicians across many license types, getting onto payer panels, billing each payer under the correct rendering provider and supervision rules, managing group versus individual enrollment, and coordinating scheduling, telehealth and authorization workflows across a multi-clinician organization.',
    intro: [
      'A mental health clinic or group practice usually employs a mix of clinicians: psychiatrists, psychiatric nurse practitioners, psychologists, licensed clinical social workers, licensed professional counselors, marriage and family therapists and sometimes pre-licensed associates working under supervision. Each license type is recognized differently by Medicare, Medicaid and commercial plans, and each must be credentialed individually with every payer the clinic accepts.',
      'The operational challenge is keeping billing aligned with those differences. A session billed under the wrong rendering provider, for a clinician not yet enrolled with the payer, or for an associate whose services the payer does not recognize, will deny regardless of how well it was documented. Panel closures, recredentialing and clinician turnover make this a continuous process.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support credentialing, enrollment tracking, eligibility checks and claims follow-up across your clinicians. The work is designed to help clinic leadership see which clinicians can bill which payers and keep sessions from being scheduled before enrollment is complete.',
    ],
    challenges: [
      {
        title: 'Credentialing many license types',
        detail:
          'Each payer recognizes a different set of license types. Medicare began enrolling marriage and family therapists and mental health counselors in 2024, while some commercial and Medicaid plans have their own lists and requirements. Clinics need a payer-by-license matrix to know where each clinician can be enrolled.',
      },
      {
        title: 'Payer panels and enrollment timing',
        detail:
          'Commercial panels may be closed in some markets, and enrollment can take months. Clinics need to know each clinician enrollment status and effective date by payer, because sessions furnished before the effective date are often unpayable.',
      },
      {
        title: 'Supervision and incident-to rules',
        detail:
          'Services by pre-licensed clinicians are billable only where the payer allows it, often under a supervisor with specific supervision and documentation requirements. Medicare incident-to rules allow some services by auxiliary personnel to be billed under the supervising practitioner, but those rules differ from commercial and Medicaid policies.',
      },
      {
        title: 'Group and individual enrollment',
        detail:
          'Most payers require both a group enrollment for the clinic and individual enrollment for each clinician, linked to the group. Claims must carry the correct billing and rendering NPIs and taxonomy codes, and mismatches between enrollment data and claim data are a common source of denials.',
      },
      {
        title: 'Telehealth, authorization and session limits',
        detail:
          'Telehealth place of service codes and modifiers differ by payer, some payers require authorization after a set number of sessions, and certain plans route behavioral health benefits through a separate managed behavioral health organization. Each must be checked during intake.',
      },
    ],
    payerWorkflow: [
      'Maintain a payer-by-clinician enrollment matrix showing license type, enrollment status and effective dates, and use it during scheduling.',
      'Verify behavioral health benefits during intake, including whether a separate behavioral health organization manages the benefit and any authorization or session limits.',
      'Bill each claim under the correct billing and rendering NPIs, with supervision rules applied for associates where the payer allows it.',
      'Apply payer-specific telehealth place of service codes and modifiers, and track authorized session counts.',
      'Monitor recredentialing and CAQH attestation dates so clinicians stay active with each payer.',
    ],
    services: [
      'medical-credentialing',
      'provider-enrollment',
      'insurance-eligibility-verification',
      'prior-authorization',
      'claims-submission',
      'denial-management',
      'appointment-scheduling',
    ],
    faqs: [
      {
        q: 'How is mental health clinic billing different from behavioral health billing in general?',
        a: 'Mental health clinic billing, as we describe it here, focuses on the operations of a multi-clinician organization: credentialing many license types, managing payer panels, applying supervision rules and keeping enrollment data aligned with claims. General behavioral health billing focuses more on the services themselves, such as psychotherapy and psychiatric evaluation coding. Clinics need both, but enrollment is often the larger source of denials.',
      },
      {
        q: 'Can pre-licensed associates bill insurance?',
        a: 'Pre-licensed associates can bill insurance only where the payer and state rules allow it, and policies vary widely. Some Medicaid programs and commercial plans allow services by supervised associates under the supervisor, with specific documentation requirements, while others do not recognize associates at all. Each payer policy should be confirmed before associates see patients covered by that plan.',
      },
      {
        q: 'Does Medicare enroll licensed counselors and marriage and family therapists?',
        a: 'Yes, since January 2024 Medicare has allowed marriage and family therapists and mental health counselors, including licensed professional counselors who meet the requirements, to enroll and bill Medicare directly. They must meet education, licensure and supervised experience requirements. Clinics should still check Medicare Advantage plans, which credential these clinicians through their own networks.',
      },
      {
        q: 'Why are claims denied when a clinician is credentialed?',
        a: 'Claims can still deny after credentialing when the clinician is not linked to the group enrollment, the effective date is later than the session date, the rendering NPI or taxonomy on the claim does not match enrollment, or the behavioral health benefit is managed by a separate organization. A clear enrollment matrix and claim scrubbing rules help catch these issues.',
      },
      {
        q: 'Can you help a clinic manage credentialing for new hires?',
        a: 'Yes, we can help prepare applications, maintain CAQH profiles, submit enrollments with each payer the clinic accepts and track status until effective dates are confirmed. We can also help set up a schedule-blocking process so new clinicians see only patients whose plans they are enrolled with. Credentialing decisions and timelines are ultimately controlled by each payer.',
      },
    ],
    relatedTools: [
      'credentialing-checklist',
      'npi-lookup',
      'denial-rate-calculator',
      'provider-productivity-calculator',
    ],
    seoTitle: 'Mental Health Clinic Billing and Credentialing',
    metaDescription:
      'Billing and credentialing support for mental health clinics with many license types, payer panels, supervision rules and group enrollment needs.',
    keywords: [
      'mental health clinic billing',
      'group therapy practice credentialing',
      'LPC LMFT Medicare enrollment',
      'mental health payer panels',
      'supervised associate billing',
      'mental health group practice RCM',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Multi-specialty                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'multi-specialty',
    name: 'Multi-Specialty Practices',
    kind: 'medical',
    icon: 'Layers',
    summary:
      'Revenue cycle support for multi-specialty groups managing many providers, payer contracts, fee schedules and specialty billing rules.',
    definition:
      'Multi-specialty practice billing involves credentialing and enrolling many providers across specialties, applying specialty-specific coding and payer rules under a shared tax ID, managing varied payer contracts and fee schedules, handling new versus established patient rules within the group, and reporting revenue cycle performance by department and location.',
    intro: [
      'A multi-specialty group combines several specialties, often several locations, under one organization and frequently one tax ID. That structure allows shared referrals, ancillary services and administration, but it also means the billing team must apply very different rules side by side: global surgery for surgeons, drug billing for infusion services, imaging components for radiology and preventive rules for primary care.',
      'The volume of providers adds administrative load. Every new hire, location change or departure triggers credentialing and enrollment work with each payer, and each payer contract may set different fee schedules, authorization lists and timely filing limits. Without centralized tracking, a single enrollment gap can stop claims for a provider across many payers.',
      'Texas Solutions works inside your practice management system, EHR and clearinghouse to support credentialing, coding review, claim follow-up and reporting across departments. The work is designed to give practice leadership a consistent view of revenue cycle performance by specialty, provider and payer.',
    ],
    challenges: [
      {
        title: 'Credentialing many providers',
        detail:
          'Multi-specialty groups add, move and lose providers regularly. Each change requires updates to Medicare, Medicaid and commercial enrollments, CAQH profiles and hospital privileges. Medicare revalidation, typically every five years, and commercial recredentialing cycles also need tracking for every provider.',
      },
      {
        title: 'Payer contract variety',
        detail:
          'Each payer contract may carry its own fee schedule, carve-outs, authorization list, timely filing limit and appeal process, and some contracts apply only to certain specialties or locations. Payment review requires loading expected rates by payer and specialty to detect underpayments.',
      },
      {
        title: 'Specialty-specific rules under one tax ID',
        detail:
          'Billing staff must apply global periods, drug billing, imaging components, preventive rules and specialty modifiers correctly across departments. Generalized processes that work for one specialty often miss requirements in another.',
      },
      {
        title: 'New patient rules within the group',
        detail:
          'A patient is generally considered established if seen by a provider of the exact same specialty and subspecialty in the same group within the past three years. Providers in different specialties can each bill new patient visits, so specialty designations and taxonomy codes must be accurate in the billing system.',
      },
      {
        title: 'Department-level reporting',
        detail:
          'Leadership needs to see collections, denials and AR by department, provider and location, but many systems report at the group level by default. Building consistent reporting requires clean provider, location and department mapping.',
      },
    ],
    payerWorkflow: [
      'Maintain a central enrollment roster for every provider, payer and location with effective dates, revalidation dates and recredentialing deadlines.',
      'Load payer fee schedules and contract terms by specialty so expected reimbursement can be compared to actual payments.',
      'Route coding and charge review by department so specialty-specific rules are applied by staff familiar with them.',
      'Check provider specialty designations and taxonomy codes so new versus established patient rules and payer edits work correctly.',
      'Report denials, AR and collections by department, provider and payer to identify where problems concentrate.',
    ],
    services: [
      'revenue-cycle-management',
      'medical-credentialing',
      'provider-enrollment',
      'payer-contracting',
      'fee-schedule-analysis',
      'rcm-analytics-reporting',
      'underpayment-identification',
      'coding-audit',
    ],
    faqs: [
      {
        q: 'Can two providers in the same group both bill a new patient visit?',
        a: 'Yes, two providers in the same group can both bill new patient visits when they are in different specialties or subspecialties. Under CPT and Medicare rules, a patient is established only if seen by a provider of the exact same specialty and subspecialty in the same group within three years. Accurate specialty designations in the billing system are essential.',
      },
      {
        q: 'How do you keep track of credentialing for dozens of providers?',
        a: 'We keep a central roster of every provider, payer and location that records application dates, effective dates, revalidation and recredentialing deadlines, and CAQH attestation dates. That roster is reviewed regularly so renewals start early and new providers are enrolled before their start date where possible. Each payer controls its own processing timeline.',
      },
      {
        q: 'Why is payment review harder in a multi-specialty group?',
        a: 'Payment review is harder in a multi-specialty group because each payer contract may set different rates and rules by specialty, location and service type, and the group may bill thousands of distinct codes. Detecting underpayments requires loading expected rates for each combination and comparing them to remittance data, rather than relying on a single fee schedule.',
      },
      {
        q: 'Can reporting be broken out by department?',
        a: 'Yes, reporting can usually be broken out by department, provider, location and payer when the practice management system has consistent provider and location mapping. We can help review that mapping and build recurring reports on collections, denials and AR so leadership can compare departments. The reports use data from your existing systems.',
      },
      {
        q: 'Do specialties need separate billing teams?',
        a: 'Specialties do not always need separate billing teams, but they do need staff who know the rules for each specialty. Many groups use a shared front end for registration and eligibility, with coding and charge review divided by specialty. That approach combines consistent processes with specialty knowledge where errors are most likely.',
      },
    ],
    relatedTools: [
      'payer-mix-calculator',
      'revenue-per-provider-calculator',
      'credentialing-checklist',
      'rcm-performance-scorecard',
    ],
    seoTitle: 'Multi-Specialty Practice Billing and RCM Support',
    metaDescription:
      'Revenue cycle support for multi-specialty groups: provider credentialing, payer contract variety, specialty-specific coding and department reporting.',
    keywords: [
      'multi-specialty billing',
      'multi-specialty group RCM',
      'multi-specialty credentialing',
      'payer contract management',
      'new patient rule same group',
      'department revenue reporting',
    ],
  },
];
