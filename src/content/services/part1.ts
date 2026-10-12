import type { Service } from '../types';

export const servicesPart1: Service[] = [
  /* ---------------------------------------------------------------- */
  /*  End-to-End Revenue Cycle Management                              */
  /* ---------------------------------------------------------------- */
  {
    slug: 'revenue-cycle-management',
    name: 'End-to-End Revenue Cycle Management',
    shortName: 'Revenue Cycle Management',
    category: 'end-to-end',
    icon: 'Workflow',
    summary:
      'One coordinated team for every revenue step, from scheduling and eligibility to claims, payments, denials and patient balances.',
    definition:
      'End-to-end revenue cycle management is the coordinated handling of every financial step in a patient encounter: registration, eligibility, authorization, coding, charge entry, claim submission, payment posting, denial follow-up and patient billing. The goal is that each visit is documented, billed and paid correctly, with problems traced back to the step that caused them.',
    intro: [
      'A practice gets paid only after a long chain of handoffs goes right. The front desk captures demographics and insurance, someone confirms coverage, a coder assigns codes, charges are entered, a claim leaves through the clearinghouse, a payer adjudicates it, and the payment or denial comes back as an 835 remittance that has to be posted and worked. A weak link anywhere in that chain shows up later as a denial, an underpayment or a patient balance nobody can explain.',
      'End-to-end revenue cycle management treats that chain as one process instead of a set of disconnected tasks. Our remote team works inside your own practice management system, EHR and clearinghouse, so your data stays where it is and every action is visible to your staff. Because one team sees both the front end and the back end, a denial pattern on the remittance side can be traced to its root cause at registration, authorization or coding.',
      'The work is designed to give you a clear picture of where revenue is stuck and why, backed by routine reporting on claims, denials, A/R aging and collections. We sign a Business Associate Agreement before accessing any patient data.',
    ],
    scope: [
      'Patient registration review and demographic correction before the visit',
      'Insurance eligibility and benefits checks through 270/271 transactions and payer portals',
      'Prior authorization requests, tracking and documentation',
      'Medical coding review and charge entry from encounter documentation',
      'Claim scrubbing and submission of 837P, 837I or 837D files through your clearinghouse',
      'Rejection handling using 999 and 277CA acknowledgments',
      'ERA and paper EOB payment posting with contractual adjustments',
      'Denial analysis, corrected claims and written appeals',
      'Aging A/R follow-up by payer and patient statement support',
      'Monthly reporting on charges, collections, denials and days in A/R',
    ],
    workflow: [
      {
        title: 'Discovery and access',
        detail:
          'We review your systems, payer mix, fee schedules and current backlog, sign a Business Associate Agreement and set up user access in your PM, EHR and clearinghouse.',
      },
      {
        title: 'Baseline assessment',
        detail:
          'We pull aging, denial and rejection reports to document where claims and dollars are currently stuck, so later reporting has a clear starting point.',
      },
      {
        title: 'Front-end controls',
        detail:
          'Eligibility, benefits and authorization checks are scheduled ahead of appointments, and registration errors are fed back to your front desk.',
      },
      {
        title: 'Mid-cycle production',
        detail:
          'Encounters are coded, charges entered and claims scrubbed and submitted on an agreed daily or weekly cadence.',
      },
      {
        title: 'Back-end resolution',
        detail:
          'Payments are posted, denials and underpayments are worked, and unpaid claims are followed up by age and dollar value.',
      },
      {
        title: 'Reporting and review',
        detail:
          'We share recurring reports and meet with your team to review trends, root causes and process changes.',
      },
    ],
    benefits: [
      {
        title: 'Fewer handoff gaps',
        detail:
          'One team owning every step is designed to reduce the errors that happen when tasks pass between people who do not see each other’s work.',
      },
      {
        title: 'Root-cause visibility',
        detail:
          'Linking denials back to registration, authorization or coding aims to fix the source of a problem instead of reworking the same claim each month.',
      },
      {
        title: 'Predictable cash flow',
        detail:
          'Consistent submission and follow-up cadences can help make deposits more predictable from month to month.',
      },
      {
        title: 'More time for patient care',
        detail:
          'Moving billing work off your clinical and front-desk staff can help them focus on patients and scheduling.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'internal-medicine',
      'multi-specialty',
      'cardiology',
      'orthopedics',
      'behavioral-health',
      'urgent-care',
      'general-dentistry',
    ],
    faqs: [
      {
        q: 'What is included in end-to-end revenue cycle management?',
        a: 'End-to-end revenue cycle management includes every financial task from the time a patient schedules until the account reaches a zero balance. That covers registration review, eligibility and benefits checks, prior authorizations, coding, charge entry, claim submission, payment posting, denial management, A/R follow-up and patient billing support. The exact scope is agreed with each practice, since some keep certain tasks in house.',
      },
      {
        q: 'Do we have to change our practice management or EHR system?',
        a: 'No, you keep your current systems. Our team works inside your existing practice management system, EHR and clearinghouse using user accounts you control. That means your data stays in your environment, your staff can see every note and action, and access can be removed at any time. If you are planning a system change separately, we can support that migration as its own project.',
      },
      {
        q: 'How is end-to-end RCM different from outsourcing only billing?',
        a: 'End-to-end RCM covers the front end and back end together, while billing-only arrangements usually start at claim submission. When one team handles eligibility, authorizations and registration as well as claims and denials, a denial can be traced to the step that caused it. Billing-only services often see the denial but cannot change what happens at check-in or scheduling.',
      },
      {
        q: 'How do you protect patient information?',
        a: 'We sign a Business Associate Agreement before accessing any protected health information, and we work inside your systems rather than exporting data to ours. Access is granted through individual user accounts so your practice can audit activity and revoke access whenever needed. We follow minimum necessary access, meaning each team member only receives the permissions their tasks require.',
      },
      {
        q: 'What reports will we receive?',
        a: 'You receive recurring reports on charges, payments, adjustments, denials by reason code, A/R aging by payer and open work items. Reports are built from your own system data so you can verify the numbers. We review them with you on a regular schedule and explain trends, root causes and the process changes we recommend for the following period.',
      },
    ],
    relatedTools: [
      'rcm-roi-calculator',
      'days-in-ar-calculator',
      'net-collection-rate-calculator',
      'rcm-performance-scorecard',
    ],
    relatedServices: [
      'medical-billing',
      'denial-management',
      'accounts-receivable-management',
      'rcm-analytics-reporting',
      'insurance-eligibility-verification',
    ],
    seoTitle: 'End-to-End Revenue Cycle Management Services',
    metaDescription:
      'End-to-end revenue cycle management for US practices: eligibility, coding, claims, payment posting, denials and A/R handled inside your own systems.',
    keywords: [
      'revenue cycle management',
      'end-to-end RCM',
      'RCM services',
      'healthcare revenue cycle',
      'outsourced revenue cycle management',
      'medical practice RCM',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Medical Billing                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'medical-billing',
    name: 'Medical Billing',
    shortName: 'Medical Billing',
    category: 'end-to-end',
    icon: 'Receipt',
    summary:
      'Claim preparation, submission, payment posting and follow-up for physician and outpatient practices billing commercial and government plans.',
    definition:
      'Medical billing is the process of turning coded patient encounters into claims, sending them to insurance payers, posting what comes back and following up until each claim is paid or correctly closed. It covers professional claims on the CMS-1500 or 837P, institutional claims on the UB-04 or 837I, and the patient balances that remain.',
    intro: [
      'Medical billing sits between clinical documentation and the bank deposit. Once a provider finishes a note and codes are assigned, someone has to build a claim with the right patient, payer, provider and service details, send it to the correct payer within its timely filing limit, and then make sure the payer actually pays the contracted amount. Every payer has its own rules for modifiers, place of service, referring provider and attachments.',
      'Our billing team works inside your practice management system and clearinghouse. We submit claims, resolve clearinghouse and payer rejections, post remittances, identify underpayments against your fee schedules and follow up on anything that has not paid. Medicare, Medicaid, Medicare Advantage and commercial plans each get worked according to their own filing limits and appeal paths.',
      'The service is designed for practices that want billing handled consistently without hiring and training an in-house team, and for in-house teams that need help with volume or a backlog.',
    ],
    scope: [
      'Building professional and institutional claims from coded encounters',
      'Electronic submission through your clearinghouse and paper claims where a payer requires them',
      'Working clearinghouse rejections and payer front-end rejections',
      'Secondary and tertiary claim submission with primary remittance data',
      'Posting ERA and paper EOB payments, adjustments and patient responsibility',
      'Checking payments against contracted rates to flag underpayments',
      'Claim status checks through 276/277 transactions and payer portals',
      'Corrected claims and voids using the correct frequency codes',
      'Tracking timely filing deadlines by payer',
    ],
    workflow: [
      {
        title: 'Encounter intake',
        detail:
          'We pull completed, coded encounters from your PM or EHR and confirm that required documentation and provider details are present.',
      },
      {
        title: 'Claim preparation',
        detail:
          'Claims are built with the correct billing and rendering NPIs, taxonomy, place of service, modifiers and diagnosis pointers.',
      },
      {
        title: 'Scrub and submit',
        detail:
          'Claims pass through clearinghouse and payer-specific edits, then are transmitted as 837 files on an agreed schedule.',
      },
      {
        title: 'Acknowledgment review',
        detail:
          'We review 999 and 277CA reports daily so rejected claims are fixed and resent rather than left unnoticed.',
      },
      {
        title: 'Posting and reconciliation',
        detail:
          'Payments and adjustments are posted from 835 files or EOBs and reconciled to deposits.',
      },
      {
        title: 'Follow-up',
        detail:
          'Unpaid, denied or underpaid claims are worked by age and value until they are paid, appealed or correctly adjusted.',
      },
    ],
    benefits: [
      {
        title: 'Consistent submission',
        detail:
          'A set submission cadence is designed to keep claims moving and away from timely filing limits.',
      },
      {
        title: 'Earlier rejection fixes',
        detail:
          'Daily acknowledgment review aims to catch rejected claims while they are still easy to correct.',
      },
      {
        title: 'Clearer payer visibility',
        detail:
          'Tracking each payer separately can help you see which plans pay slowly or deny most often.',
      },
      {
        title: 'Reduced staff load',
        detail:
          'Shifting billing work to a dedicated team can help your staff spend less time on hold with payers.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'internal-medicine',
      'pediatrics',
      'dermatology',
      'gastroenterology',
      'pain-management',
      'physical-therapy',
      'urology',
    ],
    faqs: [
      {
        q: 'What is the difference between medical billing and medical coding?',
        a: 'Medical coding translates documentation into standardized codes, while medical billing uses those codes to create claims and collect payment. A coder assigns ICD-10-CM diagnosis codes and CPT or HCPCS procedure codes with modifiers. A biller builds the claim, submits it, posts the payer response and follows up on denials or unpaid balances. Many practices outsource both, but they are separate skills.',
      },
      {
        q: 'Which claim forms do you work with?',
        a: 'We work with the CMS-1500 and its electronic equivalent, the 837P, for professional services, and the UB-04 and 837I for institutional services. Most claims are sent electronically through your clearinghouse. Paper forms are still used for some smaller payers, certain workers compensation or auto claims, and situations where a payer requires attachments that cannot travel electronically.',
      },
      {
        q: 'What are timely filing limits?',
        a: 'Timely filing limits are payer deadlines for submitting a claim after the date of service. Medicare generally allows 12 months from the date of service, while commercial and Medicaid plans set their own limits, often shorter, and they vary by contract and state. Claims submitted after the limit are usually denied, so we track each payer’s deadline and prioritize claims nearing it.',
      },
      {
        q: 'Do you bill secondary insurance?',
        a: 'Yes, we bill secondary and tertiary payers after the primary payer adjudicates the claim. For Medicare primary claims, many supplemental plans receive the claim automatically through crossover, but not all of them do. When a crossover does not happen, we submit the secondary claim with the primary payment and adjustment data so the secondary payer can process its share correctly.',
      },
      {
        q: 'Can you take over a billing backlog?',
        a: 'Yes, we can work a backlog alongside current billing. We first sort unbilled and unpaid claims by timely filing deadline and dollar value so the claims at greatest risk are handled first. Older claims that are already past a filing limit are reviewed to see whether proof of timely filing or another exception applies before any write-off is recommended.',
      },
    ],
    relatedTools: [
      'medical-billing-cost-calculator',
      'clean-claim-rate-calculator',
      'claim-submission-checklist',
      'outsourcing-vs-in-house-billing-calculator',
    ],
    relatedServices: [
      'medical-coding',
      'claims-submission',
      'payment-posting',
      'denial-management',
      'revenue-cycle-management',
    ],
    seoTitle: 'Medical Billing Services for US Practices',
    metaDescription:
      'Medical billing services covering claim submission, rejections, payment posting and follow-up for commercial, Medicare and Medicaid claims in your systems.',
    keywords: [
      'medical billing services',
      'outsourced medical billing',
      'medical billing company',
      'physician billing',
      'CMS-1500 billing',
      'claims follow-up',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Medical Coding                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'medical-coding',
    name: 'Medical Coding',
    shortName: 'Medical Coding',
    category: 'mid-cycle',
    icon: 'FileCode2',
    summary:
      'ICD-10-CM, CPT and HCPCS code assignment from provider documentation, with modifier and NCCI edit review before claims go out.',
    definition:
      'Medical coding is the translation of clinical documentation into standardized code sets: ICD-10-CM for diagnoses, CPT for procedures and services, and HCPCS Level II for supplies, drugs and certain services. Accurate codes and modifiers tell the payer what was done and why, and they determine whether a claim passes edits and is paid correctly.',
    intro: [
      'A claim is only as good as the codes on it. The diagnosis must support medical necessity for the procedure, evaluation and management levels must match the documentation, and modifiers must be applied only when the record supports them. Code sets change on a fixed schedule: ICD-10-CM updates take effect each October 1, and CPT updates each January 1, with HCPCS changes released quarterly.',
      'Our coding team reviews provider documentation in your EHR and assigns codes using current code books, CMS National Correct Coding Initiative (NCCI) edits, Medically Unlikely Edits and applicable local and national coverage determinations. When documentation is unclear or incomplete, we send a query back to the provider instead of guessing.',
      'The service is designed to support clean claims and defensible coding, and to give providers specific feedback when documentation patterns lead to denials or downcoding.',
    ],
    scope: [
      'ICD-10-CM diagnosis coding to the highest supported specificity',
      'CPT and HCPCS Level II procedure and supply coding',
      'Evaluation and management level selection based on medical decision making or time',
      'Modifier assignment such as 25, 59, the X modifiers and laterality modifiers when documentation supports them',
      'NCCI procedure-to-procedure and MUE edit checks before submission',
      'Coverage checks against applicable NCDs and LCDs',
      'Provider queries for missing or conflicting documentation',
      'Coding-related denial review and corrected claim support',
    ],
    workflow: [
      {
        title: 'Documentation access',
        detail:
          'We receive read access to signed encounter notes, operative reports and orders in your EHR.',
      },
      {
        title: 'Code assignment',
        detail:
          'Coders assign diagnosis, procedure and supply codes, link diagnoses to procedures and apply supported modifiers.',
      },
      {
        title: 'Edit review',
        detail:
          'Codes are checked against NCCI pairs, unit limits and coverage policies before the encounter is released for billing.',
      },
      {
        title: 'Provider queries',
        detail:
          'Questions about unclear documentation go back to the provider through the channel your practice prefers, and coding waits for the answer.',
      },
      {
        title: 'Release and feedback',
        detail:
          'Coded encounters move to charge entry, and recurring documentation issues are summarized for providers.',
      },
    ],
    benefits: [
      {
        title: 'Fewer coding denials',
        detail:
          'Checking edits and coverage policies before submission is designed to reduce denials tied to code pairs, units and medical necessity.',
      },
      {
        title: 'Documentation that supports the claim',
        detail:
          'Provider queries and feedback aim to close the gap between what was done and what was written.',
      },
      {
        title: 'Current code sets',
        detail:
          'Coding against each annual and quarterly update can help avoid rejections caused by deleted or invalid codes.',
      },
    ],
    practiceTypes: [
      'cardiology',
      'orthopedics',
      'gastroenterology',
      'oncology',
      'radiology',
      'ambulatory-surgery-centers',
      'pain-management',
      'neurology',
    ],
    faqs: [
      {
        q: 'Which code sets do your coders use?',
        a: 'Our coders use ICD-10-CM for diagnoses, CPT for physician and outpatient procedures, and HCPCS Level II for supplies, drugs, durable medical equipment and some services. Dental procedures use CDT, which we handle under dental billing. Institutional claims may also require revenue codes. Each code set is applied using the version in effect on the date of service.',
      },
      {
        q: 'What are NCCI edits?',
        a: 'NCCI edits are CMS rules that flag code combinations or unit counts that should not normally be billed together for the same patient and date. Procedure-to-procedure edits identify pairs where one service is usually included in another, and Medically Unlikely Edits cap the units per day. Many commercial payers apply similar edits, so we check them before claims leave.',
      },
      {
        q: 'How are evaluation and management levels chosen?',
        a: 'For office and outpatient visits, evaluation and management levels are chosen based on either medical decision making or total time on the date of the encounter, following the AMA guidelines adopted by CMS. Our coders review the documented problems, data reviewed and risk of management, or the documented time, and select the level the note supports.',
      },
      {
        q: 'What happens when documentation is incomplete?',
        a: 'When documentation is incomplete, we send a query to the provider rather than assigning a code the note does not support. Queries are written to be non-leading, asking the provider to clarify rather than suggesting an answer. The encounter is held until the provider responds or amends the note, which helps keep coding accurate and defensible in an audit.',
      },
      {
        q: 'Do you provide coding audits as well?',
        a: 'Yes, coding audits are offered as a separate service. Routine coding focuses on assigning codes for current encounters, while a coding audit samples completed claims to measure accuracy, find patterns and recommend education. Many practices use an audit first to understand their baseline and then decide whether ongoing coding support makes sense.',
      },
    ],
    relatedTools: [
      'icd-10-code-search',
      'hcpcs-code-lookup',
      'denial-reasons-guide',
    ],
    relatedServices: [
      'coding-audit',
      'charge-entry',
      'claims-scrubbing',
      'medical-billing',
      'denial-management',
    ],
    seoTitle: 'Medical Coding Services: ICD-10, CPT and HCPCS',
    metaDescription:
      'Medical coding services for US practices: ICD-10-CM, CPT and HCPCS coding, E/M leveling, modifier review and NCCI edit checks before claims are released.',
    keywords: [
      'medical coding services',
      'outsourced medical coding',
      'ICD-10 coding',
      'CPT coding',
      'E/M coding',
      'NCCI edits',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dental Billing                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dental-billing',
    name: 'Dental Billing',
    shortName: 'Dental Billing',
    category: 'end-to-end',
    icon: 'Smile',
    summary:
      'Dental insurance verification, CDT-coded claims, attachments, payment posting and follow-up for general and specialty dental offices.',
    definition:
      'Dental billing is the process of verifying dental benefits, submitting CDT-coded claims on the ADA Dental Claim Form or 837D, attaching supporting radiographs and narratives, posting payments and following up on unpaid or denied claims. It also covers predeterminations and, when appropriate, billing medical insurance for oral surgery or sleep appliance services.',
    intro: [
      'Dental insurance works differently from medical insurance. Plans usually carry annual maximums, frequency limits on cleanings and radiographs, waiting periods, missing tooth clauses and downgrades to less costly alternatives. A claim that ignores those rules is often paid at a lower rate or denied, and the patient ends up with a balance they did not expect.',
      'Our dental billing team works in your practice management software to verify benefits before appointments, submit claims with the attachments payers request, such as periodontal charting, x-rays and narratives, and post explanation of benefits details accurately. We track predeterminations for major work so treatment plans reflect what the plan is likely to cover.',
      'The service is designed to keep insurance claims moving and patient estimates realistic, so your front office spends less time on hold with dental carriers.',
    ],
    scope: [
      'Dental benefits verification including maximums, deductibles, frequencies and waiting periods',
      'Claim submission on the ADA Dental Claim Form or electronic 837D',
      'Attachment preparation: radiographs, periodontal charts, photos and narratives',
      'Predetermination submissions and tracking for crowns, bridges, implants and perio therapy',
      'Coordination of benefits for patients with two dental plans',
      'Medical cross-coding support for oral surgery and other medically necessary services',
      'EOB and ERA posting, including downgrade and alternate benefit adjustments',
      'Denial follow-up and resubmission with additional documentation',
      'Aging insurance claim follow-up by carrier',
    ],
    workflow: [
      {
        title: 'Verify before the visit',
        detail:
          'Benefits, history and frequencies are checked ahead of scheduled appointments and noted in the patient record.',
      },
      {
        title: 'Claim and attachments',
        detail:
          'After the visit, CDT-coded claims are built with tooth numbers, surfaces, quadrants and the attachments the carrier needs.',
      },
      {
        title: 'Submit and confirm',
        detail:
          'Claims are sent electronically where possible, and clearinghouse or carrier rejections are corrected promptly.',
      },
      {
        title: 'Post and adjust',
        detail:
          'Payments, write-offs and patient portions are posted from EOBs or ERAs, including downgrades and alternate benefits.',
      },
      {
        title: 'Follow up',
        detail:
          'Unpaid and denied claims are worked by carrier and age, with narratives or records resent when requested.',
      },
    ],
    benefits: [
      {
        title: 'More accurate patient estimates',
        detail:
          'Verifying frequencies, maximums and waiting periods is designed to reduce surprise balances after treatment.',
      },
      {
        title: 'Fewer requests for information',
        detail:
          'Sending the right attachments with the first claim aims to reduce documentation requests and resubmissions.',
      },
      {
        title: 'Clear treatment planning',
        detail:
          'Tracking predeterminations can help patients decide on major treatment with a clearer picture of coverage.',
      },
      {
        title: 'Front office relief',
        detail:
          'Moving insurance calls and follow-up to a dedicated team can help front office staff focus on patients in the chair.',
      },
    ],
    practiceTypes: [
      'general-dentistry',
      'orthodontics',
      'endodontics',
      'periodontics',
      'oral-surgery',
      'pediatric-dentistry',
      'prosthodontics',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'How is dental billing different from medical billing?',
        a: 'Dental billing uses CDT procedure codes and the ADA claim form, while medical billing uses CPT, HCPCS and the CMS-1500 or UB-04. Dental plans also rely heavily on annual maximums, frequency limits, waiting periods and alternate benefit provisions. Diagnosis codes are often optional on dental claims, while on medical claims they are required to establish medical necessity.',
      },
      {
        q: 'What is a predetermination?',
        a: 'A predetermination is a request asking a dental plan to estimate what it will pay for proposed treatment before the work is done. It is commonly used for crowns, bridges, implants, dentures and periodontal therapy. A predetermination is not a guarantee of payment, since eligibility and remaining maximums can change, but it helps patients plan.',
      },
      {
        q: 'Can dental offices bill medical insurance?',
        a: 'Yes, some dental services can be billed to medical insurance when they are medically necessary. Examples can include certain oral surgery, treatment of trauma, biopsies and oral appliances for obstructive sleep apnea. These claims require ICD-10-CM diagnosis codes, CPT or HCPCS codes and medical documentation, and they follow the medical plan’s authorization rules.',
      },
      {
        q: 'Why do dental claims get downgraded?',
        a: 'Dental claims are often downgraded because of an alternate benefit provision, which pays for a less costly treatment the plan considers acceptable. A common example is paying for an amalgam filling rate on a posterior composite restoration. The patient usually owes the difference, so verifying these provisions before treatment helps set accurate expectations.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-billing-cost-calculator',
      'dental-insurance-collection-calculator',
      'dental-ar-aging-calculator',
    ],
    relatedServices: [
      'benefits-verification',
      'insurance-eligibility-verification',
      'payment-posting',
      'denial-management',
      'patient-billing',
    ],
    seoTitle: 'Dental Billing Services for Dental Practices',
    metaDescription:
      'Dental billing services: benefits verification, CDT-coded claims with attachments, predeterminations, EOB posting and carrier follow-up for your office.',
    keywords: [
      'dental billing services',
      'dental insurance billing',
      'outsourced dental billing',
      'dental claims',
      'CDT coding',
      'dental predetermination',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Insurance Eligibility Verification                               */
  /* ---------------------------------------------------------------- */
  {
    slug: 'insurance-eligibility-verification',
    name: 'Insurance Eligibility Verification',
    shortName: 'Eligibility Verification',
    category: 'front-end',
    icon: 'ShieldCheck',
    summary:
      'Confirming active coverage, the correct payer and plan, and member details before appointments so claims go to the right place.',
    definition:
      'Insurance eligibility verification confirms that a patient has active coverage with a specific payer on the date of service, and that the member ID, subscriber, plan type and primary or secondary order are correct. It is usually done through electronic 270/271 transactions, payer portals or phone calls before the appointment.',
    intro: [
      'Many denials begin at the front desk. A patient changes jobs, ages into Medicare, moves from a commercial plan to Medicaid or switches to a Medicare Advantage plan, and the claim goes to a payer that no longer covers them. The denial arrives weeks later, and by then the patient may be hard to reach.',
      'Eligibility verification checks coverage before the visit. Our team runs electronic eligibility inquiries through your clearinghouse or PM system, reviews the 271 response, and uses payer portals or phone calls when the electronic response is incomplete. We note the results in the patient account so your front desk knows what to collect and which payer to bill.',
      'The work is designed to catch coverage problems while the patient can still provide a new card or make other arrangements, instead of after the claim has been denied.',
    ],
    scope: [
      'Running 270/271 eligibility inquiries ahead of scheduled appointments',
      'Confirming member ID, subscriber, relationship and date of birth match the payer record',
      'Identifying plan type: commercial, HMO, PPO, Medicare, Medicare Advantage, Medicaid or managed Medicaid',
      'Checking primary and secondary coverage order and coordination of benefits flags',
      'Confirming the provider is in network for the patient’s plan where the payer shows it',
      'Portal and phone verification when electronic responses are incomplete',
      'Documenting results and discrepancies in the patient account',
      'Flagging inactive or terminated coverage to the front desk before the visit',
    ],
    workflow: [
      {
        title: 'Pull the schedule',
        detail:
          'We pull upcoming appointments from your scheduling system a set number of days ahead, including new and returning patients.',
      },
      {
        title: 'Run inquiries',
        detail:
          'Electronic eligibility requests are sent for each patient and payer on file.',
      },
      {
        title: 'Review responses',
        detail:
          'We read each 271 response for active dates, plan type, other coverage and any payer messages.',
      },
      {
        title: 'Resolve gaps',
        detail:
          'Incomplete or conflicting responses are checked through payer portals or phone calls.',
      },
      {
        title: 'Update and flag',
        detail:
          'Results are recorded in the patient account, and problems are flagged to your front desk with the next step to take.',
      },
    ],
    benefits: [
      {
        title: 'Fewer eligibility denials',
        detail:
          'Checking coverage before the visit is designed to reduce denials for inactive coverage or wrong payer.',
      },
      {
        title: 'Smoother check-in',
        detail:
          'Knowing coverage status ahead of time can help the front desk handle problems before the patient arrives.',
      },
      {
        title: 'Correct billing order',
        detail:
          'Confirming primary and secondary coverage aims to send each claim to the right payer the first time.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'primary-care',
      'urgent-care',
      'pediatrics',
      'behavioral-health',
      'physical-therapy',
      'radiology',
    ],
    faqs: [
      {
        q: 'What is a 270/271 transaction?',
        a: 'A 270/271 is the HIPAA standard electronic transaction pair used to ask a payer about a patient’s eligibility and receive the answer. The 270 is the inquiry sent by the provider, and the 271 is the payer’s response. The response shows active coverage dates and often plan details, but the level of benefit detail varies by payer.',
      },
      {
        q: 'When should eligibility be verified?',
        a: 'Eligibility should be verified before every visit, ideally a few days ahead so problems can be fixed before the patient arrives. Coverage can change at any time, especially at the start of a month or year, after job changes and during Medicaid redeterminations. Some practices also re-check on the day of service for high-cost procedures.',
      },
      {
        q: 'What is the difference between eligibility and benefits verification?',
        a: 'Eligibility verification answers whether the patient is covered by a plan on the date of service, while benefits verification answers what that plan will pay for a specific service. Benefits checks look at deductibles, copays, coinsurance, visit limits and exclusions. Many practices need both, and we offer benefits verification as a related service.',
      },
      {
        q: 'What if the patient has Medicare and another plan?',
        a: 'When a patient has Medicare and another plan, the correct primary payer depends on the Medicare Secondary Payer rules. Factors include whether the patient or spouse is actively employed, the size of the employer group, and whether the condition relates to an accident or workers compensation. We review the coverage details and flag cases where the billing order needs to be confirmed with the patient.',
      },
    ],
    relatedTools: [
      'denial-rate-calculator',
      'claim-rejection-rate-calculator',
      'medical-billing-acronyms',
    ],
    relatedServices: [
      'benefits-verification',
      'patient-registration',
      'prior-authorization',
      'appointment-scheduling',
    ],
    seoTitle: 'Insurance Eligibility Verification Services',
    metaDescription:
      'Insurance eligibility verification before each visit using 270/271 checks, payer portals and calls, so claims are billed to the correct, active payer.',
    keywords: [
      'insurance eligibility verification',
      'eligibility verification services',
      '270/271 eligibility',
      'patient insurance verification',
      'coverage verification',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Benefits Verification                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: 'benefits-verification',
    name: 'Benefits Verification',
    shortName: 'Benefits Verification',
    category: 'front-end',
    icon: 'ListChecks',
    summary:
      'Service-level checks of deductibles, copays, coinsurance, visit limits and exclusions so patients get realistic cost estimates.',
    definition:
      'Benefits verification determines what a patient’s plan will cover for a specific service and what the patient will owe. It checks remaining deductible, copay, coinsurance, out-of-pocket maximum, visit or frequency limits, exclusions and whether authorization or a referral is required, based on the service and place of service planned.',
    intro: [
      'Knowing a patient has active coverage is only the first question. The next one is what the plan will pay for this particular service. A physical therapy plan may cap visits per year, an imaging benefit may require authorization, and a high-deductible plan may leave the patient responsible for most of the allowed amount early in the year.',
      'Our team checks benefits at the service level using electronic responses, payer portals and calls to provider services lines. We record the specific details, the date and the reference number or representative name, so your staff can stand behind the estimate if a payer later disagrees.',
      'Benefits verification is designed to support accurate good faith estimates and point-of-service collections, and to surface authorization or referral requirements before the visit rather than after a denial.',
    ],
    scope: [
      'Remaining individual and family deductible and out-of-pocket amounts',
      'Copay and coinsurance by service type and place of service',
      'Visit, unit and frequency limits used to date',
      'Specialist referral and prior authorization requirements',
      'Exclusions and non-covered services under the plan',
      'Network status and out-of-network benefit levels',
      'Call reference numbers and representative names recorded for each check',
      'Patient responsibility estimate inputs for the front desk',
    ],
    workflow: [
      {
        title: 'Identify the service',
        detail:
          'We review the appointment type, planned procedures and place of service to know which benefits to check.',
      },
      {
        title: 'Check electronically',
        detail:
          'Electronic benefit responses are reviewed for the relevant service type codes.',
      },
      {
        title: 'Confirm details',
        detail:
          'Missing or unclear details are confirmed through payer portals or provider service calls.',
      },
      {
        title: 'Document',
        detail:
          'Benefits, limits and reference numbers are recorded in a consistent format in the patient account.',
      },
      {
        title: 'Hand off',
        detail:
          'Estimate inputs and any authorization or referral needs are passed to your front desk or authorization team.',
      },
    ],
    benefits: [
      {
        title: 'Realistic patient estimates',
        detail:
          'Service-level benefit details are designed to make cost estimates closer to what the patient will owe.',
      },
      {
        title: 'Earlier authorization alerts',
        detail:
          'Identifying authorization and referral rules ahead of time aims to prevent avoidable denials.',
      },
      {
        title: 'Better point-of-service collection',
        detail:
          'Knowing copays and remaining deductibles can help staff collect the right amount at check-in.',
      },
      {
        title: 'Documented support',
        detail:
          'Reference numbers can help when a payer’s processing differs from what was quoted.',
      },
    ],
    practiceTypes: [
      'physical-therapy',
      'occupational-therapy',
      'chiropractic',
      'behavioral-health',
      'radiology',
      'dermatology',
      'general-dentistry',
      'orthodontics',
    ],
    faqs: [
      {
        q: 'What details does a benefits verification include?',
        a: 'A benefits verification includes the remaining deductible, copay, coinsurance, out-of-pocket maximum, visit or frequency limits, exclusions, and any referral or authorization requirements for the planned service. It also notes network status and the date and source of the information. The exact details depend on the specialty, since therapy, imaging, behavioral health and dental benefits each have different limits.',
      },
      {
        q: 'Is a benefits quote a guarantee of payment?',
        a: 'No, a benefits quote is not a guarantee of payment. Payers state that benefits are subject to eligibility, plan terms and medical review at the time a claim is processed. Recording the reference number and representative name gives your practice documentation if the claim is processed differently from the quote, which can support a reconsideration request.',
      },
      {
        q: 'How does benefits verification help with good faith estimates?',
        a: 'Benefits verification gives your staff the deductible, coinsurance and copay details needed to estimate what an insured patient will owe. Good faith estimates under the No Surprises Act are currently required for uninsured and self-pay patients, but many practices also give insured patients estimates. Accurate benefit details make those estimates more reliable.',
      },
      {
        q: 'Why do therapy practices need detailed benefits checks?',
        a: 'Therapy practices need detailed benefits checks because plans often limit the number of visits per year, combine physical, occupational and speech therapy under one limit, or require authorization after a set number of visits. Knowing how many visits have already been used helps plan care and avoid denials after the limit is reached.',
      },
    ],
    relatedTools: [
      'patient-balance-calculator',
      'dental-insurance-verification-checklist',
      'eob-explained',
    ],
    relatedServices: [
      'insurance-eligibility-verification',
      'prior-authorization',
      'patient-financial-communication',
      'patient-collections',
    ],
    seoTitle: 'Insurance Benefits Verification Services',
    metaDescription:
      'Insurance benefits verification covering deductibles, copays, coinsurance, visit limits and authorization rules, so your patient estimates are more reliable.',
    keywords: [
      'benefits verification',
      'insurance benefits verification',
      'patient benefits check',
      'deductible verification',
      'verification of benefits',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Prior Authorization                                              */
  /* ---------------------------------------------------------------- */
  {
    slug: 'prior-authorization',
    name: 'Prior Authorization',
    shortName: 'Prior Authorization',
    category: 'front-end',
    icon: 'ClipboardCheck',
    summary:
      'Requesting, tracking and documenting payer approvals for procedures, imaging, drugs and therapy before services are provided.',
    definition:
      'Prior authorization is the process of getting a payer’s approval before a service, procedure, imaging study, drug or piece of equipment is provided. The practice submits clinical information showing medical necessity, and the payer approves, denies or requests more information. Services delivered without a required authorization are commonly denied and often cannot be billed to the patient.',
    intro: [
      'Authorization rules differ by payer, plan and service, and they change often. One plan may require approval for advanced imaging through a radiology benefit manager, another for physical therapy after a set number of visits, and a third for a specialty drug through a pharmacy benefit. Missing one requirement can mean a full denial for a service that was already delivered.',
      'Our team checks whether each scheduled service requires authorization, gathers the clinical documentation the payer asks for, submits through the payer portal, electronic 278 transaction, fax or phone, and tracks the request until a decision is made. Approved authorizations are recorded with their number, approved units and valid dates so the claim can reference them.',
      'Under the CMS Interoperability and Prior Authorization final rule, Medicare Advantage, Medicaid, CHIP and federal marketplace plans face decision timeframes starting in 2026 and electronic prior authorization requirements in later years. Commercial plans follow their own and state rules, so tracking every request remains essential.',
    ],
    scope: [
      'Checking authorization requirements by payer, plan, service and place of service',
      'Collecting clinical notes, test results and order details from your EHR',
      'Submitting requests through payer portals, 278 transactions, fax or phone',
      'Working with radiology and other benefit managers that handle authorizations for payers',
      'Tracking pending requests and responding to requests for more information',
      'Recording authorization numbers, approved units and valid date ranges',
      'Requesting extensions or additional visits before an authorization expires',
      'Supporting peer-to-peer scheduling and appeals when a request is denied',
    ],
    workflow: [
      {
        title: 'Screen the schedule',
        detail:
          'Upcoming services and orders are screened against payer authorization lists.',
      },
      {
        title: 'Gather documentation',
        detail:
          'We collect the clinical information the payer’s criteria call for and identify gaps early.',
      },
      {
        title: 'Submit the request',
        detail:
          'Requests are submitted through the payer’s preferred channel with all required details.',
      },
      {
        title: 'Track to decision',
        detail:
          'Pending requests are checked on a set schedule, and information requests are answered quickly.',
      },
      {
        title: 'Record and communicate',
        detail:
          'Approvals are recorded in the account, and denials are escalated to the provider with options for peer-to-peer review or appeal.',
      },
    ],
    benefits: [
      {
        title: 'Fewer authorization denials',
        detail:
          'Checking requirements before every scheduled service is designed to prevent denials for missing approvals.',
      },
      {
        title: 'Fewer last-minute reschedules',
        detail:
          'Starting requests early aims to reduce appointments postponed while waiting for a decision.',
      },
      {
        title: 'Clear audit trail',
        detail:
          'Recording numbers, units and dates can help connect each claim to its authorization.',
      },
    ],
    practiceTypes: [
      'radiology',
      'orthopedics',
      'oncology',
      'cardiology',
      'pain-management',
      'physical-therapy',
      'behavioral-health',
      'gastroenterology',
    ],
    faqs: [
      {
        q: 'Which services usually need prior authorization?',
        a: 'Services that commonly need prior authorization include advanced imaging such as MRI, CT and PET, many surgeries, specialty drugs and infusions, durable medical equipment, sleep studies, and therapy beyond a set number of visits. Requirements vary by payer and plan, and payers update their lists regularly, so each service should be checked against the current list before scheduling.',
      },
      {
        q: 'What is the difference between a referral and a prior authorization?',
        a: 'A referral is a primary care provider’s approval for a patient to see a specialist, while a prior authorization is the payer’s approval for a specific service. HMO and some point-of-service plans require referrals. A patient can have a valid referral and still need a separate authorization for a procedure or imaging study the specialist orders.',
      },
      {
        q: 'What happens if a prior authorization is denied?',
        a: 'If a prior authorization is denied, the provider can usually request a peer-to-peer review with the payer’s medical reviewer, submit additional documentation or file a formal appeal. The denial letter explains the reason and the deadline. We help organize the documentation and track deadlines, while clinical discussions remain with the provider.',
      },
      {
        q: 'Can authorizations be obtained after the service?',
        a: 'Some payers allow retroactive authorization in limited situations, such as emergencies or when coverage was not known at the time of service, but many do not. Retro requests usually must be made within a short window. Because retro approval is not dependable, the safest approach is to confirm requirements and obtain approval before the service whenever possible.',
      },
      {
        q: 'What is a 278 transaction?',
        a: 'A 278 is the HIPAA standard electronic transaction for health care services review, used to request prior authorizations and referrals and to receive the payer’s response. Adoption has historically been limited, so many requests still go through payer portals or fax. Federal rules for certain government-related plans are pushing payers toward electronic prior authorization interfaces over the next few years.',
      },
    ],
    relatedTools: ['prior-authorization-checklist', 'denial-reasons-guide', 'denial-rate-calculator'],
    relatedServices: [
      'benefits-verification',
      'insurance-eligibility-verification',
      'denial-appeals',
      'appointment-scheduling',
    ],
    seoTitle: 'Prior Authorization Services for Medical Practices',
    metaDescription:
      'Prior authorization services: requirement checks, clinical documentation, portal and 278 submissions, and tracking every request through to a payer decision.',
    keywords: [
      'prior authorization services',
      'prior auth outsourcing',
      'insurance preauthorization',
      'authorization management',
      '278 transaction',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Patient Registration                                             */
  /* ---------------------------------------------------------------- */
  {
    slug: 'patient-registration',
    name: 'Patient Registration and Demographic Verification',
    shortName: 'Patient Registration',
    category: 'front-end',
    icon: 'Users',
    summary:
      'Accurate patient demographics, insurance and guarantor details captured and checked before the first claim is ever created.',
    definition:
      'Patient registration and demographic verification is the capture and review of a patient’s identifying, contact, insurance and guarantor details in the practice management system. It confirms the name, date of birth, address, subscriber, relationship and member ID match the insurance card and payer records, because a single mismatch can cause a claim rejection.',
    intro: [
      'Every claim inherits the data entered at registration. A transposed digit in a member ID, a nickname instead of the legal name, a missing suffix or the wrong subscriber relationship can cause a clearinghouse or payer rejection. Wrong addresses lead to returned statements, and missing guarantor details make patient balances harder to collect.',
      'Our team reviews new and updated registrations against insurance card images, intake forms and eligibility responses. We correct obvious errors, flag missing information and send questions back to your front desk when the patient needs to be contacted. For patients with more than one plan, we capture coordination of benefits details so claims are billed in the right order.',
      'The work is designed to make the first claim for every visit cleaner, and to give your front desk feedback on the registration errors that come up most often.',
    ],
    scope: [
      'Reviewing new patient registrations against intake forms and card images',
      'Verifying legal name, date of birth, sex and address formatting',
      'Confirming subscriber name, relationship and member ID match payer records',
      'Capturing primary, secondary and tertiary coverage in the correct order',
      'Recording guarantor and responsible party details for minors and dependents',
      'Collecting referring provider and accident or injury details when relevant',
      'Flagging duplicate patient records for your team to merge',
      'Tracking recurring registration errors for front desk training',
    ],
    workflow: [
      {
        title: 'Collect intake data',
        detail:
          'We access intake forms, insurance card images and portal submissions captured by your practice.',
      },
      {
        title: 'Review and compare',
        detail:
          'Registration fields are compared with the card images and eligibility responses.',
      },
      {
        title: 'Correct and complete',
        detail:
          'Clear errors are corrected and missing fields completed according to your practice’s rules.',
      },
      {
        title: 'Escalate questions',
        detail:
          'Items that need the patient, such as a new card or a missing subscriber birth date, are sent to your front desk.',
      },
      {
        title: 'Report trends',
        detail:
          'Common errors are summarized so your team can adjust scripts and check-in steps.',
      },
    ],
    benefits: [
      {
        title: 'Fewer demographic rejections',
        detail:
          'Matching registration data to payer records is designed to reduce rejections for patient or subscriber mismatches.',
      },
      {
        title: 'Correct billing order',
        detail:
          'Capturing all coverage in the right order aims to avoid denials that say another payer is primary.',
      },
      {
        title: 'Reachable patients',
        detail:
          'Accurate contact details can help statements and reminders reach patients the first time.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'primary-care',
      'pediatrics',
      'urgent-care',
      'multi-specialty',
      'mental-health-clinics',
      'general-dentistry',
    ],
    faqs: [
      {
        q: 'Why do registration errors cause claim rejections?',
        a: 'Registration errors cause rejections because payers match each claim to their member files using the name, date of birth and member ID. If any of those details do not match, the clearinghouse or payer rejects the claim before it is processed. Common causes include nicknames, missing suffixes, hyphenated last names and a dependent listed as the subscriber.',
      },
      {
        q: 'What information should be captured at registration?',
        a: 'Registration should capture the patient’s legal name, date of birth, sex, address, phone and email, plus each insurance plan’s payer, member ID, group number, subscriber name, subscriber date of birth and relationship. It should also record the guarantor, emergency contact, referring provider when required, and whether the visit relates to an accident or work injury.',
      },
      {
        q: 'Should we scan insurance cards at every visit?',
        a: 'Yes, scanning the front and back of insurance cards at every visit is a good practice. Patients often receive new cards at the start of a plan year or after changing jobs, and the back of the card lists claim addresses, payer IDs and phone numbers. A current image also helps verify details when a claim is rejected.',
      },
      {
        q: 'How do you handle duplicate patient records?',
        a: 'We flag possible duplicate records for your team to review and merge rather than merging them ourselves. Duplicates often happen when a patient registers with a different name spelling or a new address. Merging affects clinical records as well as billing history, so the final decision usually belongs to the practice’s designated staff.',
      },
    ],
    relatedTools: ['claim-rejection-rate-calculator', 'first-pass-acceptance-rate-calculator', 'npi-lookup'],
    relatedServices: [
      'insurance-eligibility-verification',
      'healthcare-data-entry',
      'appointment-scheduling',
      'claims-scrubbing',
    ],
    seoTitle: 'Patient Registration and Demographic Verification',
    metaDescription:
      'Patient registration and demographic verification that checks names, member IDs, subscribers and coverage order so claims match payer records the first time.',
    keywords: [
      'patient registration services',
      'demographic verification',
      'patient demographics entry',
      'insurance card verification',
      'front desk billing support',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Charge Entry                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'charge-entry',
    name: 'Charge Entry and Charge Capture',
    shortName: 'Charge Entry',
    category: 'mid-cycle',
    icon: 'Calculator',
    summary:
      'Every billable service captured and entered with correct codes, units, modifiers, providers and dates so nothing goes unbilled.',
    definition:
      'Charge entry and charge capture is the process of making sure every billable service is recorded and entered into the practice management system with the correct procedure codes, units, modifiers, diagnosis pointers, rendering and referring providers, place of service and date of service. Missed or incorrect charges lead directly to lost or delayed revenue.',
    intro: [
      'Revenue can disappear before a claim is ever created. A procedure documented in the note but never placed on the superbill, an injection billed without the drug, or a hospital visit recorded on paper and never entered are all charges that simply never get paid. Charge lag, the time between service and charge entry, also delays every later step.',
      'Our team enters charges from encounter forms, EHR charge screens, hospital rounding lists or coded encounters, and reconciles them against your appointment schedule so every visit has a matching charge or a documented reason. We check that units, modifiers and diagnosis pointers line up and that the right rendering, supervising and referring providers are attached.',
      'The service is designed to close the gap between care delivered and care billed, and to keep charge lag short and visible.',
    ],
    scope: [
      'Entering charges from superbills, EHR charge screens and coded encounters',
      'Reconciling appointments to charges to find missing visits',
      'Capturing hospital, nursing facility and off-site services from rounding lists',
      'Entering drug and supply HCPCS codes with NDC details where payers require them',
      'Applying units, modifiers and up to four diagnosis pointers per line',
      'Assigning rendering, supervising and referring provider NPIs',
      'Setting place of service and facility details correctly',
      'Tracking charge lag and holding encounters that lack documentation',
    ],
    workflow: [
      {
        title: 'Gather source documents',
        detail:
          'We collect encounter forms, EHR charge batches and rounding lists for the period.',
      },
      {
        title: 'Enter charges',
        detail:
          'Charges are entered with codes, units, modifiers, pointers, providers and place of service.',
      },
      {
        title: 'Reconcile to the schedule',
        detail:
          'Completed appointments are compared with entered charges, and gaps are listed by provider.',
      },
      {
        title: 'Resolve missing items',
        detail:
          'Missing documentation or unclear charges are sent to the provider or coder for an answer.',
      },
      {
        title: 'Batch and release',
        detail:
          'Charge batches are balanced and released for claim creation, and charge lag is reported.',
      },
    ],
    benefits: [
      {
        title: 'Fewer missed charges',
        detail:
          'Daily schedule reconciliation is designed to catch visits that were seen but never billed.',
      },
      {
        title: 'Shorter charge lag',
        detail:
          'Entering charges on a regular cadence aims to get claims out sooner after the date of service.',
      },
      {
        title: 'Cleaner claim lines',
        detail:
          'Checking units, modifiers and pointers at entry can help reduce errors caught later by scrubbers or payers.',
      },
    ],
    practiceTypes: [
      'internal-medicine',
      'cardiology',
      'nephrology',
      'oncology',
      'orthopedics',
      'dermatology',
      'home-health',
      'multi-specialty',
    ],
    faqs: [
      {
        q: 'What is the difference between charge entry and charge capture?',
        a: 'Charge capture is making sure every billable service is recorded, while charge entry is putting those charges into the billing system accurately. Capture happens at or near the point of care through superbills, EHR charge screens or rounding lists. Entry happens in the practice management system. Problems in either one lead to missed or incorrect claims.',
      },
      {
        q: 'What is charge lag?',
        a: 'Charge lag is the number of days between the date of service and the date the charge is entered into the billing system. Long charge lag delays claims, payments and denial discovery, and it shortens the time left before a payer’s timely filing limit. Tracking charge lag by provider and location helps find where documentation or entry is getting stuck.',
      },
      {
        q: 'Why do payers ask for NDC numbers on drug claims?',
        a: 'Payers ask for National Drug Code numbers on drug claims so they can identify the exact drug, manufacturer and package billed under a HCPCS code. Medicaid programs commonly require NDCs for physician-administered drugs, and many commercial plans do as well. The NDC, its unit of measure and the quantity must be reported in the correct format.',
      },
      {
        q: 'How do diagnosis pointers work?',
        a: 'Diagnosis pointers link each service line on a professional claim to the diagnosis codes that support it. The CMS-1500 and 837P allow up to twelve diagnosis codes per claim and up to four pointers per service line. The first pointer should reference the primary reason for that service, since payers use it for medical necessity review.',
      },
    ],
    relatedTools: ['revenue-leakage-estimator', 'claim-turnaround-time-calculator', 'hcpcs-code-lookup'],
    relatedServices: [
      'medical-coding',
      'claims-submission',
      'healthcare-data-entry',
      'claims-scrubbing',
    ],
    seoTitle: 'Charge Entry and Charge Capture Services',
    metaDescription:
      'Charge entry and charge capture services that reconcile visits to charges and enter codes, units, modifiers and providers correctly to reduce missed revenue.',
    keywords: [
      'charge entry services',
      'charge capture',
      'medical charge entry',
      'charge lag',
      'superbill entry',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Claims Submission                                                */
  /* ---------------------------------------------------------------- */
  {
    slug: 'claims-submission',
    name: 'Claims Creation and Submission',
    shortName: 'Claims Submission',
    category: 'mid-cycle',
    icon: 'Send',
    summary:
      'Building complete claims and sending them to the correct payer on time, then confirming each one was accepted for processing.',
    definition:
      'Claims creation and submission is the process of assembling a complete claim from patient, provider, coverage and charge data, sending it to the correct payer in the required format and confirming that it was accepted. Professional, institutional and dental claims use the 837P, 837I and 837D electronic formats or their paper equivalents.',
    intro: [
      'A claim has dozens of required fields, and payers reject it if one is wrong. The billing provider NPI and tax ID must match enrollment records, the payer ID must route to the right plan, and fields such as the referring provider, prior authorization number, accident indicators and claim frequency code must be filled when they apply.',
      'Our team creates claims from released charges, routes them to the right payer ID, attaches or references supporting documentation and transmits them through your clearinghouse on a regular schedule. We do not consider a claim submitted until the payer has acknowledged receiving it.',
      'The service is designed to get accurate claims to payers quickly after the date of service, with a clear record of when each claim was sent and accepted in case proof of timely filing is ever needed.',
    ],
    scope: [
      'Creating claims from released charge batches',
      'Mapping each claim to the correct payer ID and claim address',
      'Completing billing, rendering, referring and service facility provider fields',
      'Adding authorization numbers, accident details and other conditional fields',
      'Submitting 837P, 837I and 837D files through your clearinghouse',
      'Preparing CMS-1500, UB-04 or ADA paper claims when a payer requires paper',
      'Sending attachments through the payer’s accepted method',
      'Confirming acceptance and keeping proof of timely filing',
    ],
    workflow: [
      {
        title: 'Create claims',
        detail:
          'Released charges are turned into claims in your PM system with coverage and provider details attached.',
      },
      {
        title: 'Route correctly',
        detail:
          'Each claim is checked for the right payer ID, including Medicare Advantage and managed Medicaid plans that use separate IDs.',
      },
      {
        title: 'Scrub',
        detail:
          'Claims pass through system and clearinghouse edits, and flagged items are fixed before release.',
      },
      {
        title: 'Transmit',
        detail:
          'Claim batches are transmitted electronically, or paper claims are prepared and mailed when required.',
      },
      {
        title: 'Confirm acceptance',
        detail:
          'Acknowledgment reports are reviewed until every claim shows payer acceptance.',
      },
    ],
    benefits: [
      {
        title: 'Faster time to payer',
        detail:
          'A regular submission cadence is designed to shorten the time between service and payer receipt.',
      },
      {
        title: 'Timely filing protection',
        detail:
          'Keeping acceptance records can help support reconsideration if a payer says a claim was filed late.',
      },
      {
        title: 'Correct routing',
        detail:
          'Verifying payer IDs aims to reduce claims sent to the wrong plan or address.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'internal-medicine',
      'urgent-care',
      'ambulatory-surgery-centers',
      'home-health',
      'chiropractic',
      'podiatry',
    ],
    faqs: [
      {
        q: 'What is the difference between an 837P, 837I and 837D?',
        a: 'The 837P, 837I and 837D are the three HIPAA standard electronic claim formats for professional, institutional and dental claims. The 837P is the electronic version of the CMS-1500 used by physicians and other practitioners. The 837I matches the UB-04 used by hospitals, surgery centers and other facilities. The 837D matches the ADA Dental Claim Form.',
      },
      {
        q: 'What is a claim frequency code?',
        a: 'A claim frequency code tells the payer whether a claim is new, a replacement or a void. Code 1 is an original claim, 7 replaces a previously processed claim and 8 voids one. Replacement and void claims must also include the payer’s original claim number, or the payer may treat them as duplicates and deny them.',
      },
      {
        q: 'How do we prove a claim was filed on time?',
        a: 'You prove timely filing with records showing the payer received the claim before its deadline. The most useful evidence is the payer acceptance acknowledgment, such as a 277CA, or a payer report showing receipt. Clearinghouse submission reports help but may not be enough if the payer rejected the claim, which is why we confirm payer acceptance.',
      },
      {
        q: 'Do any payers still require paper claims?',
        a: 'Yes, some payers still require or accept only paper claims, including certain small health plans, some workers compensation and auto insurers, and situations where attachments cannot be sent electronically. Medicare generally requires electronic submission, with limited exceptions for small providers. Paper claims must be on the official red-ink CMS-1500 or UB-04 forms to be scanned correctly.',
      },
    ],
    relatedTools: [
      'claim-submission-checklist',
      'first-pass-acceptance-rate-calculator',
      'claim-turnaround-time-calculator',
      'cost-per-claim-calculator',
    ],
    relatedServices: [
      'claims-scrubbing',
      'electronic-claims-processing',
      'charge-entry',
      'clearinghouse-coordination',
    ],
    seoTitle: 'Claims Creation and Submission Services',
    metaDescription:
      'Claims creation and submission services for 837P, 837I and 837D claims: correct payer routing, clearinghouse transmission and confirmed payer acceptance.',
    keywords: [
      'claims submission services',
      'medical claims submission',
      '837P claims',
      'claim creation',
      'timely filing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Claims Scrubbing                                                 */
  /* ---------------------------------------------------------------- */
  {
    slug: 'claims-scrubbing',
    name: 'Claims Scrubbing and Validation',
    shortName: 'Claims Scrubbing',
    category: 'mid-cycle',
    icon: 'ScanLine',
    summary:
      'Pre-submission review of claims against format, coding and payer-specific edits so errors are fixed before a payer ever sees them.',
    definition:
      'Claims scrubbing and validation is the review of claims before submission to catch errors that would cause a rejection or denial. Scrubbing checks required fields and formatting, code validity, NCCI pairs and unit limits, modifier use, diagnosis-to-procedure logic and payer-specific rules, then routes each flagged claim for correction.',
    intro: [
      'Most practice management systems and clearinghouses include claim scrubbers, but edits only help when someone reads them and fixes the claim correctly. Edits pile up in work queues, claims get forced through without changes, and the same error repeats every week because nobody updates the rule or the template that caused it.',
      'Our team works your scrubber and clearinghouse edit queues every business day. We fix what can be fixed from the record, send coding or documentation questions to the right person and track which edits fire most often. When a payer denial reveals a rule the scrubber missed, we recommend a custom edit so the issue is caught next time.',
      'The work is designed to raise the share of claims accepted on the first pass and to keep edit queues from becoming a hidden backlog.',
    ],
    scope: [
      'Working PM system and clearinghouse edit queues daily',
      'Checking required fields, formats and provider identifiers',
      'Validating ICD-10-CM, CPT, HCPCS and CDT codes for the date of service',
      'Applying NCCI procedure-to-procedure and MUE checks',
      'Reviewing modifier use against documentation and payer policy',
      'Checking diagnosis support against applicable coverage policies',
      'Recommending custom scrubber rules based on recurring denials',
      'Reporting edit volume by type, provider and payer',
    ],
    workflow: [
      {
        title: 'Pull edit queues',
        detail:
          'Claims held by system or clearinghouse edits are pulled each business day.',
      },
      {
        title: 'Classify errors',
        detail:
          'Each edit is classified as a data, coding, documentation or payer-rule issue.',
      },
      {
        title: 'Correct or route',
        detail:
          'Data errors are corrected directly, while coding and documentation questions are routed to coders or providers.',
      },
      {
        title: 'Re-validate',
        detail:
          'Corrected claims are scrubbed again before release so new errors are not introduced.',
      },
      {
        title: 'Improve the rules',
        detail:
          'Recurring errors and denial patterns are turned into recommended custom edits or template fixes.',
      },
    ],
    benefits: [
      {
        title: 'Higher first-pass acceptance',
        detail:
          'Fixing errors before submission is designed to increase claims accepted on the first attempt.',
      },
      {
        title: 'No hidden backlog',
        detail:
          'Working edit queues daily aims to keep held claims from aging unnoticed.',
      },
      {
        title: 'Smarter edits over time',
        detail:
          'Turning denials into custom rules can help stop the same error from repeating.',
      },
      {
        title: 'Less rework',
        detail:
          'Catching problems before submission can help avoid the slower cycle of denial, correction and resubmission.',
      },
    ],
    practiceTypes: [
      'orthopedics',
      'cardiology',
      'gastroenterology',
      'dermatology',
      'ambulatory-surgery-centers',
      'radiology',
      'pain-management',
      'multi-specialty',
    ],
    faqs: [
      {
        q: 'What does a claim scrubber check?',
        a: 'A claim scrubber checks a claim against a set of rules before it is sent. Typical checks include required fields, valid codes for the date of service, NPI and taxonomy format, NCCI code pairs, unit limits, modifier rules, diagnosis-to-procedure logic, age and sex conflicts and payer-specific requirements. Scrubbers differ in how many payer rules they include and how often they are updated.',
      },
      {
        q: 'What is the difference between a rejection and a denial?',
        a: 'A rejection means the claim failed format or data edits and was never accepted for processing, while a denial means the payer processed the claim and decided not to pay. Rejected claims can be corrected and resubmitted as new claims. Denied claims usually need a corrected claim, reconsideration or appeal, depending on the reason.',
      },
      {
        q: 'Why do claims pass the scrubber but still get denied?',
        a: 'Claims can pass the scrubber and still be denied because scrubbers cannot see everything the payer sees. They may not know about eligibility changes, authorization status, frequency limits already used, or a payer policy that changed recently. Reviewing denials and adding custom edits for recurring issues helps the scrubber catch more over time.',
      },
      {
        q: 'Should claims ever be forced past an edit?',
        a: 'Claims should be forced past an edit only when the edit does not apply and the reason is documented. For example, a modifier may correctly bypass an NCCI pair when the documentation shows a separate, distinct service. Forcing claims through without review is a common cause of denials and, in some cases, compliance risk.',
      },
    ],
    relatedTools: [
      'clean-claim-rate-calculator',
      'first-pass-acceptance-rate-calculator',
      'claim-rejection-rate-calculator',
      'denial-reasons-guide',
    ],
    relatedServices: [
      'claims-submission',
      'medical-coding',
      'denial-management',
      'clearinghouse-coordination',
    ],
    seoTitle: 'Claims Scrubbing and Validation Services',
    metaDescription:
      'Claims scrubbing and validation that works your edit queues daily, fixes coding and data errors before submission and turns repeat denials into custom rules.',
    keywords: [
      'claims scrubbing',
      'claim scrubber',
      'claim validation',
      'clean claims',
      'claim edits',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Electronic Claims Processing                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'electronic-claims-processing',
    name: 'Electronic Claims Processing',
    shortName: 'Electronic Claims',
    category: 'mid-cycle',
    icon: 'Server',
    summary:
      'Managing the electronic path of every claim: clearinghouse transmission, 999 and 277CA acknowledgments, status checks and payer enrollment.',
    definition:
      'Electronic claims processing is the management of claims as they move electronically from the practice to payers and back. It covers transmitting 837 files through a clearinghouse, reading 999 and 277CA acknowledgments, resolving rejections, checking claim status with 276/277 transactions, and keeping EDI, ERA and EFT enrollments current with each payer.',
    intro: [
      'Once a claim leaves your system, it passes through several checkpoints. The clearinghouse checks the file structure and returns a 999 implementation acknowledgment. The payer runs front-end edits and returns a 277CA claim acknowledgment that accepts or rejects each claim. Only accepted claims move on to adjudication, and each step can fail quietly if no one is watching the reports.',
      'Our team monitors that electronic path from end to end. We read clearinghouse and payer acknowledgment reports, fix rejected claims, run claim status inquiries on claims that have gone silent and keep payer EDI enrollments in order. When a new provider joins or a tax ID changes, we help update the enrollments that electronic claims and remittances depend on.',
      'The service is designed so that no claim is lost between your system and the payer, and so that electronic transactions keep working as your practice changes.',
    ],
    scope: [
      'Monitoring clearinghouse batch reports and 999 acknowledgments',
      'Reviewing 277CA payer acknowledgments for accepted and rejected claims',
      'Correcting and resubmitting rejected claims',
      'Running 276/277 claim status inquiries on claims with no response',
      'Interpreting claim status category and status codes',
      'Payer EDI enrollment for claims submission',
      'ERA and EFT enrollment support for new payers and providers',
      'Coordinating with your clearinghouse on connection or routing issues',
    ],
    workflow: [
      {
        title: 'Daily batch review',
        detail:
          'We confirm that each day’s claim files were received and passed clearinghouse validation.',
      },
      {
        title: 'Acknowledgment reconciliation',
        detail:
          'Claims sent are matched against payer acknowledgments so nothing is missing.',
      },
      {
        title: 'Rejection correction',
        detail:
          'Rejected claims are corrected and resubmitted with the underlying cause noted.',
      },
      {
        title: 'Status follow-up',
        detail:
          'Claims without a payer response after a set period are checked with 276/277 inquiries or payer portals.',
      },
      {
        title: 'Enrollment upkeep',
        detail:
          'EDI, ERA and EFT enrollments are tracked and updated when providers, locations or tax IDs change.',
      },
    ],
    benefits: [
      {
        title: 'No lost claims',
        detail:
          'Reconciling submissions to acknowledgments is designed to catch claims that never reached the payer.',
      },
      {
        title: 'Faster rejection turnaround',
        detail:
          'Daily review aims to fix rejected claims while there is still ample time before filing limits.',
      },
      {
        title: 'Stable electronic setup',
        detail:
          'Keeping enrollments current can help avoid interrupted claims, remittances or deposits after practice changes.',
      },
    ],
    practiceTypes: [
      'multi-specialty',
      'urgent-care',
      'family-medicine',
      'behavioral-health',
      'physical-therapy',
      'ambulatory-surgery-centers',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'What is a 999 acknowledgment?',
        a: 'A 999 is an implementation acknowledgment that confirms whether an electronic file was structurally valid under the X12 standard. It is returned for a batch, not for individual claims, and it says nothing about whether the payer will pay. An accepted 999 means the file can move forward, while a rejected 999 means the batch must be fixed and resent.',
      },
      {
        q: 'What is a 277CA?',
        a: 'A 277CA is the claim acknowledgment a payer returns after its front-end edits, showing whether each claim was accepted for processing or rejected. Accepted claims move to adjudication. Rejected claims include status codes explaining the problem, such as an invalid member ID or missing provider information, and must be corrected and resubmitted.',
      },
      {
        q: 'What is a 276/277 claim status inquiry?',
        a: 'A 276/277 is the electronic transaction pair used to ask a payer about the status of a submitted claim. The 276 is the inquiry and the 277 is the response, which uses claim status category codes and status codes to show whether the claim is pending, finalized, paid or denied. It is usually faster than calling the payer.',
      },
      {
        q: 'Why do payers require EDI enrollment?',
        a: 'Payers require EDI enrollment so they can link electronic transactions to a verified provider and route them correctly. Many payers require separate enrollment for claims, for 835 electronic remittances and for EFT payments. When a provider joins a group, changes tax ID or moves to a new clearinghouse, these enrollments often need to be updated.',
      },
    ],
    relatedTools: [
      'claim-status-categories',
      'first-pass-acceptance-rate-calculator',
      'claim-turnaround-time-calculator',
    ],
    relatedServices: [
      'clearinghouse-coordination',
      'claims-submission',
      'era-processing',
      'provider-enrollment',
    ],
    seoTitle: 'Electronic Claims Processing and EDI Support',
    metaDescription:
      'Electronic claims processing: 837 transmission, 999 and 277CA acknowledgment review, 276/277 status checks and payer EDI, ERA and EFT enrollment support.',
    keywords: [
      'electronic claims processing',
      'EDI claims',
      '277CA',
      'claim acknowledgment',
      'claim status inquiry',
      'EDI enrollment',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Payment Posting                                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'payment-posting',
    name: 'Payment Posting',
    shortName: 'Payment Posting',
    category: 'back-end',
    icon: 'Wallet',
    summary:
      'Accurate posting of insurance and patient payments, adjustments and denials, reconciled to deposits so every balance is correct.',
    definition:
      'Payment posting is the recording of insurance and patient payments, contractual adjustments, denials and patient responsibility in the practice management system. Posting draws from 835 ERAs, paper EOBs, lockbox files and patient payments, and it must reconcile to bank deposits so account balances, A/R reports and patient statements are accurate.',
    intro: [
      'Posting looks like simple data entry, but it decides what happens next on every account. If a contractual adjustment is posted as a payment, A/R looks smaller than it is. If a denial is posted as a zero payment without the reason code, nobody works it. If a patient responsibility amount is wrong, the patient receives an incorrect statement.',
      'Our team posts insurance payments from ERAs and paper EOBs, posts patient payments and refunds, applies adjustment and reason codes, moves balances to secondary payers or patients and reconciles daily totals to your bank deposits. Denials and underpayments identified during posting are routed to follow-up instead of being written off.',
      'The service is designed to keep account balances accurate and to make posting a source of information about denials, underpayments and payer behavior.',
    ],
    scope: [
      'Posting insurance payments from 835 ERAs and paper EOBs',
      'Posting patient payments from the front desk, portal and mail',
      'Applying contractual adjustments, write-offs and patient responsibility',
      'Recording denials with CARC and RARC codes for follow-up',
      'Transferring balances to secondary payers or patient responsibility',
      'Flagging payments below contracted rates as possible underpayments',
      'Handling recoupments, offsets and overpayment refunds',
      'Reconciling posted totals to bank deposits and lockbox reports',
    ],
    workflow: [
      {
        title: 'Collect remittances',
        detail:
          'We gather ERAs, scanned EOBs, lockbox files and patient payment batches each business day.',
      },
      {
        title: 'Post payments and adjustments',
        detail:
          'Payments, contractual adjustments and patient portions are posted at the line level.',
      },
      {
        title: 'Route exceptions',
        detail:
          'Denials, zero-pays and suspected underpayments are tagged and sent to follow-up queues.',
      },
      {
        title: 'Move balances',
        detail:
          'Remaining balances move to the next payer or to patient responsibility.',
      },
      {
        title: 'Reconcile deposits',
        detail:
          'Posted totals are matched to bank deposits, and differences are researched until resolved.',
      },
    ],
    benefits: [
      {
        title: 'Accurate balances',
        detail:
          'Line-level posting is designed to keep patient and insurance balances correct.',
      },
      {
        title: 'Denials surfaced quickly',
        detail:
          'Recording reason codes at posting aims to send denials to follow-up right away.',
      },
      {
        title: 'Reliable reports',
        detail:
          'Reconciling to deposits can help make collection and A/R reports trustworthy.',
      },
      {
        title: 'Correct patient statements',
        detail:
          'Posting patient responsibility accurately can help reduce billing questions and disputes.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'internal-medicine',
      'orthopedics',
      'physical-therapy',
      'behavioral-health',
      'general-dentistry',
      'dental-group-practices',
      'multi-specialty',
    ],
    faqs: [
      {
        q: 'What is the difference between manual and electronic payment posting?',
        a: 'Electronic posting uses 835 ERA files to post payments and adjustments into the billing system automatically, while manual posting is keyed by hand from paper EOBs or payer letters. Electronic posting is faster but still needs review, because unmatched claims, unusual adjustments and provider-level deductions often require manual handling.',
      },
      {
        q: 'Why should denials be posted?',
        a: 'Denials should be posted so they appear on the account with their reason codes and can be worked. If a zero-pay remittance is skipped, the claim looks like it is still pending and may not be followed up until it is too late to appeal. Posting denials also creates the data needed to track denial trends.',
      },
      {
        q: 'What is a contractual adjustment?',
        a: 'A contractual adjustment is the difference between the practice’s billed charge and the amount the payer allows under its contract. It is written off, not billed to the patient, when the provider is in network. On remittances it typically appears with group code CO, meaning contractual obligation, along with a reason code.',
      },
      {
        q: 'How do you reconcile payments to bank deposits?',
        a: 'We reconcile payments to bank deposits by matching each posted payment batch to a deposit using the check or EFT trace number and amount. Differences can come from unposted remittances, provider-level adjustments, payments posted to the wrong date or deposits with no remittance yet. Each difference is researched until the batch balances.',
      },
    ],
    relatedTools: [
      'payment-variance-calculator',
      'net-collection-rate-calculator',
      'eob-explained',
      'era-explained',
    ],
    relatedServices: [
      'era-processing',
      'payment-reconciliation',
      'underpayment-identification',
      'denial-management',
    ],
    seoTitle: 'Payment Posting Services for Medical and Dental',
    metaDescription:
      'Payment posting services for ERA and EOB payments, adjustments, denials and patient payments, with deposit reconciliation so account balances stay accurate.',
    keywords: [
      'payment posting services',
      'medical payment posting',
      'insurance payment posting',
      'EOB posting',
      'contractual adjustments',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  ERA Processing                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'era-processing',
    name: 'Electronic Remittance Advice Processing',
    shortName: 'ERA Processing',
    category: 'back-end',
    icon: 'FileSpreadsheet',
    summary:
      'Enrolling for, loading and working 835 ERA files, including CARC and RARC review, PLB adjustments and EFT reassociation.',
    definition:
      'Electronic remittance advice processing is the handling of the 835 files payers send to explain claim payments. It includes ERA enrollment, importing files into the practice management system, reviewing claim adjustment and remark codes, handling unmatched claims and provider-level adjustments, and matching each ERA to its EFT deposit using the trace number.',
    intro: [
      'An 835 ERA is the payer’s explanation of a payment, broken down by claim and service line. Each adjustment carries a group code (such as CO, PR, OA or PI), a Claim Adjustment Reason Code and often a Remittance Advice Remark Code. Read correctly, the ERA tells you what was paid, what the patient owes and why anything was reduced or denied.',
      'Auto-posting ERAs saves time, but files do not always post cleanly. Claims fail to match because of changed account numbers, provider-level PLB adjustments such as recoupments or interest do not belong to any single claim, and some payers send remittances that do not match the EFT deposit. Our team enrolls you for ERAs, reviews each file as it posts and handles the exceptions that automation leaves behind.',
      'The service is designed to make ERA auto-posting dependable and to turn remittance codes into usable follow-up work.',
    ],
    scope: [
      'ERA enrollment with payers and through CAQH EnrollHub where payers use it',
      'Importing 835 files into your practice management system',
      'Reviewing auto-post exceptions and unmatched claims',
      'Interpreting group codes, CARCs and RARCs at claim and line level',
      'Handling PLB provider-level adjustments such as recoupments, offsets and interest',
      'Reassociating ERAs with EFT deposits using the TRN trace number',
      'Requesting missing or duplicate remittances from payers',
      'Mapping recurring adjustment codes to the right follow-up queues',
    ],
    workflow: [
      {
        title: 'Enroll',
        detail:
          'We complete ERA and EFT enrollment for each payer so remittances and deposits arrive electronically.',
      },
      {
        title: 'Load files',
        detail:
          'New 835 files are retrieved from the clearinghouse and loaded into your billing system.',
      },
      {
        title: 'Review exceptions',
        detail:
          'Lines that did not auto-post, along with unusual adjustments, are reviewed and posted manually.',
      },
      {
        title: 'Handle provider adjustments',
        detail:
          'PLB recoupments, offsets and interest are traced to the related claims or accounts.',
      },
      {
        title: 'Reassociate deposits',
        detail:
          'Each ERA is matched to its EFT deposit by trace number and amount, and mismatches are researched.',
      },
    ],
    benefits: [
      {
        title: 'Dependable auto-posting',
        detail:
          'Reviewing exceptions daily is designed to stop small posting errors from building up unnoticed.',
      },
      {
        title: 'Clear adjustment reasons',
        detail:
          'Reading CARCs and RARCs carefully aims to separate true denials from expected adjustments.',
      },
      {
        title: 'Traceable recoupments',
        detail:
          'Tying PLB adjustments to their original claims can help explain why deposits are lower than expected.',
      },
      {
        title: 'Deposits that balance',
        detail:
          'ERA-to-EFT reassociation can help your books match what actually reached the bank.',
      },
    ],
    practiceTypes: [
      'multi-specialty',
      'internal-medicine',
      'cardiology',
      'radiology',
      'physical-therapy',
      'behavioral-health',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'What is an 835 ERA?',
        a: 'An 835 ERA is the HIPAA standard electronic file a payer sends to explain how claims were paid, adjusted or denied. It replaces the paper explanation of benefits for providers and contains payment amounts, adjustment group codes, reason and remark codes, and the trace number for the related check or EFT. Practice management systems use it to auto-post payments.',
      },
      {
        q: 'What do CARC and RARC codes mean?',
        a: 'CARC and RARC codes explain why a claim or service line was paid differently from what was billed. Claim Adjustment Reason Codes give the main reason for an adjustment, and Remittance Advice Remark Codes add detail. Both code lists are maintained centrally and updated several times a year. Each CARC is paired with a group code showing who is responsible.',
      },
      {
        q: 'What are the CO, PR, OA and PI group codes?',
        a: 'Group codes show who is financially responsible for an adjustment. CO means contractual obligation, so the provider writes it off and cannot bill the patient. PR means patient responsibility, such as deductibles and coinsurance. OA means other adjustment, used when neither applies. PI means payer-initiated reduction, used when the payer believes the adjustment is not the patient’s responsibility.',
      },
      {
        q: 'What is a PLB adjustment?',
        a: 'A PLB adjustment is a provider-level adjustment in an 835 that is not tied to a single claim in that file. Common examples include recoupments of earlier overpayments, offsets, interest payments and forwarding balances. PLB amounts change the total payment, so they must be posted and explained, or the ERA will not balance to the deposit.',
      },
      {
        q: 'How do you enroll for ERAs?',
        a: 'ERA enrollment is completed with each payer, either through the payer’s own portal or through a shared enrollment service such as CAQH EnrollHub for participating payers. Enrollment links the provider’s tax ID and NPI to a clearinghouse or receiver. EFT enrollment is often handled at the same time so remittances and deposits can be matched.',
      },
    ],
    relatedTools: ['era-explained', 'denial-reasons-guide', 'payment-variance-calculator'],
    relatedServices: [
      'payment-posting',
      'payment-reconciliation',
      'electronic-claims-processing',
      'denial-management',
    ],
    seoTitle: 'ERA Processing: 835 Remittance and EFT Matching',
    metaDescription:
      'ERA processing for 835 files: enrollment, auto-post exception review, CARC and RARC interpretation, PLB adjustments and matching each ERA to its EFT deposit.',
    keywords: [
      'ERA processing',
      '835 remittance',
      'electronic remittance advice',
      'CARC RARC codes',
      'ERA enrollment',
      'EFT reassociation',
    ],
  },
];
