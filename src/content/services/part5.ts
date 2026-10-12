import type { Service } from '../types';

/**
 * Keyword-plan services (added 2026-10-13): small practice billing, care
 * management programs and software-specific billing pages.
 *
 * Software pages: product names are trademarks of their owners. Never call
 * Texas Solutions a partner, reseller, certified or integrated vendor.
 */
export const servicesPart5: Service[] = [
  /* ---------------------------------------------------------------- */
  /*  Medical Billing for Small Practices                              */
  /* ---------------------------------------------------------------- */
  {
    slug: 'medical-billing-small-practices',
    name: 'Medical Billing Services for Small Practices',
    shortName: 'Small Practice Billing',
    category: 'end-to-end',
    icon: 'Building2',
    summary:
      'Outsourced billing sized for solo and small group practices, worked inside your own systems with one consistent team.',
    definition:
      'Medical billing services for small practices are outsourced billing support built for solo physicians and small groups that lack a full billing department. A remote team handles charge entry, claim submission, payment posting, denial follow-up and patient statements inside the practice’s own systems, so a small staff is not stretched across clinical and financial work.',
    intro: [
      'In a small practice, billing often belongs to whoever has a spare hour: an office manager who also schedules, a front desk lead who also posts payments, or a physician reviewing claims at night. That arrangement holds up until someone is out sick, a payer changes a rule, or a batch of rejections sits unnoticed in the clearinghouse. Small practices feel each of those gaps directly because there is rarely a second person to catch them.',
      'Our medical billing services for small practices are built for that reality. We work inside the practice management system, EHR and clearinghouse you already use, take on the steps you choose, and keep a written list of what we own and what stays with your staff. You get a steady cadence for claims, posting and follow-up without hiring, training and covering for a full-time biller.',
      'Lower volume does not mean simpler billing. One missed revalidation, or one payer that quietly stopped paying a common code, can matter a great deal to a practice with a handful of providers. Reporting is kept short and readable so the owner can see charges, payments, denials and aging at a glance. We sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Charge entry from superbills or EHR encounters on an agreed schedule',
      'Eligibility checks for upcoming appointments on commercial, Medicare and Medicaid plans',
      'Claim scrubbing and electronic submission through your existing clearinghouse',
      'Clearinghouse rejection review and correction in the same billing cycle',
      'ERA and paper EOB posting, including secondary claim creation',
      'Denial follow-up, corrected claims and written appeals',
      'Patient statement review and answers to routine billing questions',
      'Reminders when providers join, change locations or come due for payer revalidation',
      'A short monthly report on charges, payments, adjustments, denials and A/R aging',
    ],
    workflow: [
      {
        title: 'Scope call',
        detail:
          'We talk through your specialty, payer mix, systems, staff and the billing tasks you want to keep or hand off, then confirm the scope in writing.',
      },
      {
        title: 'Agreement and access',
        detail:
          'We sign a Business Associate Agreement and your practice creates individual user accounts for our team in the PM system, EHR and clearinghouse.',
      },
      {
        title: 'Open item clean-up',
        detail:
          'We review unbilled encounters, unworked rejections and the oldest unpaid claims so nothing from before the start date is forgotten.',
      },
      {
        title: 'Routine cadence',
        detail:
          'Charges, submissions, posting and follow-up run on an agreed daily or weekly rhythm, with questions for your staff collected in one place.',
      },
      {
        title: 'Monthly review',
        detail:
          'We walk the owner or office manager through a short report and agree on any front desk or documentation changes.',
      },
    ],
    benefits: [
      {
        title: 'Coverage that does not depend on one person',
        detail:
          'A team-based approach is designed to keep claims moving when a staff member is on leave or leaves the practice.',
      },
      {
        title: 'Staff focused on patients',
        detail:
          'Moving billing work off the front desk can help a small team concentrate on scheduling, check-in and patient questions.',
      },
      {
        title: 'Clear ownership',
        detail:
          'A written list of who does what aims to prevent tasks from falling between your office and the billing team.',
      },
      {
        title: 'Readable numbers',
        detail:
          'Simple monthly reporting is designed to give owners a clear view of cash flow without digging through system reports.',
      },
    ],
    practiceTypes: [
      'family-medicine',
      'internal-medicine',
      'pediatrics',
      'behavioral-health',
      'chiropractic',
      'physical-therapy',
      'dermatology',
      'podiatry',
    ],
    faqs: [
      {
        q: 'Is outsourcing billing worth it for a solo or small practice?',
        a: 'It can be, depending on how billing is handled today and what it costs you in staff time and missed follow-up. Small practices often rely on one person for billing, so absences and turnover create backlogs. Comparing the full cost of an in-house biller, including salary, benefits, software seats and training, with an outsourced arrangement is a sensible first step, and our cost calculators can help frame it.',
      },
      {
        q: 'Can we keep some billing tasks in house?',
        a: 'Yes, the scope is set by your practice. Some small offices keep payment collection at the front desk and patient statements in house while we handle claims, posting and denials. Others hand off everything except scheduling. We document the split in writing so each task has a clear owner, and the scope can be adjusted later as your practice grows or your staff changes.',
      },
      {
        q: 'Do we need to change our billing software?',
        a: 'No, we work in the practice management system, EHR and clearinghouse you already use. Your practice creates user accounts for our team, which keeps your data in your own environment and lets you see every action we take. If you are already planning a move to new software, we can help with that transition as a separate project.',
      },
      {
        q: 'How do you handle questions about a claim or patient account?',
        a: 'We collect questions for your staff in one agreed place, such as a shared task list or a message thread inside your system, rather than scattering them across emails and calls. Typical questions involve missing documentation, demographic corrections or a referral number. Keeping them together is designed to make answering quicker for a small team with limited time.',
      },
      {
        q: 'What do you need from us to get started?',
        a: 'To get started we need a short call about your practice, a signed Business Associate Agreement and user access to your billing systems. Helpful extras include your fee schedule, payer contract summaries, recent aging and denial reports, and a list of providers with their NPIs and enrollment status. From there we review open items and agree on a routine schedule.',
      },
    ],
    relatedTools: [
      'medical-billing-cost-calculator',
      'outsourcing-vs-in-house-billing-calculator',
      'billing-staffing-cost-calculator',
      'days-in-ar-calculator',
    ],
    relatedServices: [
      'medical-billing',
      'claims-submission',
      'payment-posting',
      'denial-management',
      'patient-billing',
    ],
    seoTitle: 'Medical Billing Services for Small Practices',
    metaDescription:
      'Medical billing services for small practices: claims, payment posting, denials and patient statements handled inside your own systems by a remote team.',
    keywords: [
      'medical billing services for small practices',
      'small practice medical billing',
      'billing services for solo physicians',
      'outsourced billing for small medical offices',
      'small group practice billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Remote Patient Monitoring Billing                                */
  /* ---------------------------------------------------------------- */
  {
    slug: 'remote-patient-monitoring-billing',
    name: 'Remote Patient Monitoring Billing',
    shortName: 'RPM Billing',
    category: 'programs',
    icon: 'MonitorSmartphone',
    summary:
      'Billing support for RPM programs: consent, device data days, setup, treatment management time and documentation checks.',
    definition:
      'Remote patient monitoring billing is the process of documenting and claiming payment for monitoring physiologic data, such as blood pressure, weight or glucose, collected by a connected device outside the office. Each 30-day period requires tracking consent, setup, days of transmitted data, treatment management time and the practitioner responsible for the program.',
    intro: [
      'Remote patient monitoring (RPM) lets a care team follow readings such as blood pressure, weight, oxygen saturation or blood glucose between visits. Medicare and many other payers cover this work, but only when the program follows specific rules. Under current CMS policy the device must meet the FDA definition of a medical device, readings must be collected and transmitted electronically rather than self-reported, the patient must consent, and services are generally limited to patients with an established relationship with the billing practitioner.',
      'Remote patient monitoring billing is where many programs run into trouble. Each 30-day period has separate parts: initial setup and patient education, device supply counted in days of transmitted data, and treatment management counted in minutes that must include real-time interactive communication with the patient or caregiver. Each part has its own documentation and frequency limits, so a short data count or a time log without interactive contact can leave a period unbillable.',
      'We work inside your EHR, RPM vendor platform and billing system to reconcile device data and time logs with what is claimed, flag periods that do not meet requirements before claims go out, and follow up on payer denials. Program rules change from year to year, so we check current CMS guidance and each payer’s policy rather than relying on last year’s assumptions. We sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Confirming patient consent is documented before the first RPM claim',
      'Checking eligibility and payer policies, including Medicare Advantage and commercial plans',
      'Tracking initial setup and patient education as a once-per-episode service',
      'Counting days of transmitted device data in each 30-day period against the applicable threshold',
      'Reconciling treatment management minutes and interactive communication with clinical logs',
      'Checking that only one practitioner bills the device and setup services for a patient in a period',
      'Screening for conflicts with remote therapeutic monitoring and other overlapping services',
      'Claim creation and submission under the correct billing practitioner',
      'Denial follow-up and appeals for RPM claims',
      'Monthly report of enrolled patients, billable periods and periods that fell short',
    ],
    workflow: [
      {
        title: 'Program review',
        detail:
          'We review how your program enrolls patients, which devices and vendor platform you use, how time is logged and who supervises the clinical staff.',
      },
      {
        title: 'Rule mapping',
        detail:
          'We document current Medicare requirements and the policies of your major commercial and Medicare Advantage payers in a checklist your team can follow.',
      },
      {
        title: 'Period reconciliation',
        detail:
          'As each 30-day period closes we compare data days and management time against documentation and mark each patient billable, partly billable or not billable.',
      },
      {
        title: 'Claim submission',
        detail:
          'Supported services are entered and submitted through your clearinghouse, with notes on any period held for missing documentation.',
      },
      {
        title: 'Follow-up and feedback',
        detail:
          'We work denials, track payer trends and share patterns, such as patients with low transmission days, with your clinical team.',
      },
    ],
    benefits: [
      {
        title: 'Fewer unbillable periods',
        detail:
          'Checking data days and time logs before a period closes is designed to give your team a chance to fix gaps while they can still be fixed.',
      },
      {
        title: 'Documentation that holds up',
        detail:
          'Matching claims to consent, device data and time logs aims to make each billed period easier to support in a payer review.',
      },
      {
        title: 'Clear program visibility',
        detail:
          'Monthly reporting can help you see enrollment, data transmission and billing status across the whole program.',
      },
      {
        title: 'Less load on clinical staff',
        detail:
          'Moving reconciliation and claim work to a billing team can help nurses and medical assistants focus on reviewing readings and contacting patients.',
      },
    ],
    practiceTypes: [
      'cardiology',
      'internal-medicine',
      'family-medicine',
      'primary-care',
      'endocrinology',
      'nephrology',
      'pulmonology',
      'telehealth',
    ],
    faqs: [
      {
        q: 'What are the main Medicare requirements for remote patient monitoring billing?',
        a: 'Medicare requires that RPM be ordered for a patient who has an established relationship with the billing practitioner and has consented, using a device that meets the FDA definition of a medical device and transmits physiologic data automatically. Device supply is counted in days of data per 30-day period, and treatment management is counted in minutes that include real-time interactive communication with the patient or caregiver.',
      },
      {
        q: 'Is 16 days of data still required for RPM?',
        a: 'The long-standing device supply code (99454) requires at least 16 days of data in a 30-day period. For 2026, CMS also recognized codes for shorter data periods and shorter management time, so some months with fewer days may still be billable to Medicare under different codes. Commercial and Medicare Advantage plans may not follow the same rules, so we check each payer’s current policy before billing.',
      },
      {
        q: 'Who can perform RPM treatment management time?',
        a: 'Treatment management can be performed by the billing practitioner or by clinical staff working under the practitioner’s general supervision, under current Medicare rules. Time must be documented, and the month’s management must include at least one real-time interactive communication with the patient or caregiver. Administrative tasks such as shipping devices or scheduling calls do not count toward clinical management time.',
      },
      {
        q: 'Can RPM be billed in the same month as chronic care management?',
        a: 'Yes, Medicare allows RPM and chronic care management for the same patient in the same period, as long as no minute is counted toward both services and each service’s requirements are met separately. RPM cannot be billed alongside remote therapeutic monitoring for the same patient, and only one practitioner may bill the device and setup services for a patient in a given 30-day period.',
      },
      {
        q: 'Does RPM consent need to be documented?',
        a: 'Yes, patient consent must be obtained and recorded, and Medicare allows it to be collected at the time RPM services are furnished. Good practice is to also explain that cost sharing may apply and that the patient can stop at any time. We check that consent is on file for each patient before the first claim is submitted.',
      },
    ],
    relatedTools: ['hcpcs-code-lookup', 'claim-submission-checklist', 'denial-rate-calculator'],
    relatedServices: [
      'medical-coding',
      'practice-management-support',
      'chronic-care-management-billing',
      'claims-submission',
      'denial-management',
    ],
    seoTitle: 'Remote Patient Monitoring Billing Services',
    metaDescription:
      'Remote patient monitoring billing support: consent, device data days, setup, management time and documentation checked before RPM claims are submitted.',
    keywords: [
      'remote patient monitoring billing',
      'RPM billing',
      'RPM billing services',
      'remote physiologic monitoring billing',
      'Medicare RPM billing requirements',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Chronic Care Management Billing                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'chronic-care-management-billing',
    name: 'Chronic Care Management Billing',
    shortName: 'CCM Billing',
    category: 'programs',
    icon: 'HeartPulse',
    summary:
      'Billing support for CCM and PCM programs: eligibility, consent, care plans, monthly time tracking and claim follow-up.',
    definition:
      'Chronic care management billing is the monthly process of claiming payment for care coordination provided outside visits to patients with two or more chronic conditions expected to last at least 12 months. It depends on documented consent, a comprehensive care plan and accurate tracking of clinical staff or practitioner time in each calendar month.',
    intro: [
      'Chronic care management (CCM) pays practices for the coordination that happens between visits: medication reconciliation, calls with patients and caregivers, referrals and updates to a care plan. Medicare defines who qualifies and what the practice must provide, including a comprehensive care plan shared with the patient, around-the-clock access to the care team for urgent needs, continuity with a designated care team member and management of care transitions.',
      'Chronic care management billing turns that work into claims one calendar month at a time. Each month the practice needs to know whether the time threshold was met, which level of service applies (standard CCM, complex CCM or principal care management for a single condition), whether the time was spent by clinical staff or the practitioner, and whether another practitioner already billed the patient for the same month.',
      'We work inside your EHR and billing system to reconcile time logs and documentation with each month’s claims, flag patients who fell short or whose time supports an add-on increment, and follow up on denials. We also review consent records and initiating visit requirements so the program starts on a sound footing. We sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Screening enrolled patients for qualifying chronic conditions in the record',
      'Confirming consent is documented, including notice of cost sharing and the right to stop',
      'Checking that an initiating visit occurred when one is required',
      'Verifying that a comprehensive care plan exists and is kept current',
      'Totaling clinical staff and practitioner time for each calendar month',
      'Selecting between standard CCM, complex CCM and PCM based on documentation',
      'Applying add-on time increments only when documented time supports them',
      'Checking for overlapping care management billed by another practitioner',
      'Claim submission and denial follow-up',
      'Monthly program report of enrolled, billed and unbilled patients',
    ],
    workflow: [
      {
        title: 'Program assessment',
        detail:
          'We review how patients are enrolled, how consent is captured, where the care plan lives in your EHR and how staff record time.',
      },
      {
        title: 'Eligibility and consent check',
        detail:
          'Each enrolled patient is checked for qualifying conditions, documented consent and any required initiating visit before the first claim.',
      },
      {
        title: 'Monthly time review',
        detail:
          'After each calendar month closes we total time by staff type, match it to documentation and identify the service level it supports.',
      },
      {
        title: 'Claim submission',
        detail:
          'Supported services are entered and submitted, and patients who fell short are listed for your clinical lead.',
      },
      {
        title: 'Follow-up and reporting',
        detail:
          'We work denials, watch for payer policy differences and report program trends each month.',
      },
    ],
    benefits: [
      {
        title: 'Accurate service levels',
        detail:
          'Matching documented time and complexity to the right service is designed to reduce both undercoding and overcoding.',
      },
      {
        title: 'A sound program start',
        detail:
          'Checking consent, care plans and initiating visits early aims to prevent months of claims that cannot be supported later.',
      },
      {
        title: 'Clear monthly picture',
        detail:
          'Program reporting can help leaders see enrollment, time trends and patients who regularly fall short of thresholds.',
      },
      {
        title: 'More time for care managers',
        detail:
          'Shifting reconciliation and claim work to the billing team can help care managers spend more of their time with patients.',
      },
    ],
    practiceTypes: [
      'primary-care',
      'family-medicine',
      'internal-medicine',
      'cardiology',
      'endocrinology',
      'nephrology',
      'pulmonology',
    ],
    faqs: [
      {
        q: 'Which patients qualify for chronic care management?',
        a: 'Patients qualify for chronic care management under Medicare when they have two or more chronic conditions expected to last at least 12 months, or until death, that place them at significant risk of death, acute exacerbation or decompensation, or functional decline. Common examples include diabetes, hypertension, heart failure, COPD and chronic kidney disease. The conditions must be documented in the medical record.',
      },
      {
        q: 'What is the difference between standard and complex CCM?',
        a: 'Standard CCM is billed by time, starting at 20 minutes of clinical staff time in a calendar month, with add-on increments for more time. Complex CCM requires at least 60 minutes in the month, moderate or high complexity medical decision making, and establishing or substantially revising the care plan. A separate code (99491) covers time personally spent by the physician or qualified practitioner.',
      },
      {
        q: 'What is principal care management?',
        a: 'Principal care management (PCM) is a related Medicare service for patients with one complex chronic condition expected to last at least three months that requires disease-specific management. It is often used by specialists who manage a single condition. PCM is billed per calendar month based on time spent by the practitioner or by clinical staff, starting at 30 minutes.',
      },
      {
        q: 'What should CCM consent include?',
        a: 'CCM consent should show that the patient was told the service is available, that cost sharing may apply, that only one practitioner can bill CCM for them in a month, and that they may stop at any time. Consent can be verbal or written but must be documented. It is generally obtained once at the start, with new consent needed if the billing practitioner changes.',
      },
      {
        q: 'Is a visit required before billing CCM?',
        a: 'An initiating visit is required for new patients and for patients the billing practitioner has not seen within the past year. Qualifying visits include a comprehensive evaluation and management visit, an annual wellness visit or an initial preventive physical exam. For patients seen within the year, CCM can begin once consent is documented and the care plan is in place.',
      },
      {
        q: 'Can CCM be billed with other care management services?',
        a: 'Often yes, but with limits. Medicare allows CCM to be billed in the same month as services such as remote patient monitoring or transitional care management in many cases, as long as no time is counted toward more than one service. Some combinations are restricted, so we check current CMS rules and each payer’s policy before submitting claims.',
      },
    ],
    relatedTools: ['hcpcs-code-lookup', 'claim-submission-checklist', 'denial-rate-calculator'],
    relatedServices: [
      'medical-coding',
      'practice-management-support',
      'remote-patient-monitoring-billing',
      'medical-billing',
      'denial-management',
    ],
    seoTitle: 'Chronic Care Management Billing Services',
    metaDescription:
      'Chronic care management billing for CCM, complex CCM and PCM: eligibility, consent, care plans and monthly time checks completed before claims go out.',
    keywords: [
      'chronic care management billing',
      'CCM billing',
      'CCM billing services',
      'complex chronic care management billing',
      'principal care management billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dentrix                                                          */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dentrix-billing-services',
    name: 'Dentrix Billing Services',
    shortName: 'Dentrix Billing',
    category: 'software',
    icon: 'Server',
    summary:
      'Dental billing done inside your Dentrix system: claims, attachments, insurance payments, family ledgers and aging follow-up.',
    definition:
      'Dentrix billing services are outsourced dental billing tasks performed directly inside a practice’s own Dentrix database, including creating and sending insurance claims, attaching supporting records, posting insurance and patient payments, and working insurance aging. The team uses individual logins the practice controls, so every action stays in the practice’s system and audit history.',
    intro: [
      'Dentrix, from Henry Schein One, is one of the most widely used practice management systems in general dentistry, and in many offices it runs on a server inside the practice. The schedule, treatment plans, insurance plan records, fee schedules and family ledgers all live in one local database that the front desk, hygienists and billing staff share throughout the day.',
      'Our Dentrix billing services work within that database rather than around it. Claims are created from completed procedures, checked against the patient’s insurance plan setup, sent through the electronic claims connection your office already uses, and supported with radiographs, perio charting or narratives when a payer asks for them. Insurance payments are entered against the original claims so ledgers, estimates and aging reports stay accurate. For an installed system, access is usually arranged through a secure remote connection your IT provider manages.',
      'If your office uses Dentrix Ascend, the cloud-based product, the same billing work applies through a browser login. Dentrix and Dentrix Ascend are trademarks of their owner. Texas Solutions is not affiliated with or endorsed by Henry Schein One; we work in your licensed system as an extension of your team, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Creating claims from completed procedures and reviewing them before sending',
      'Attaching radiographs, perio charts, photos and narratives when payers require them',
      'Sending claims through your existing electronic claims connection and clearing rejections',
      'Posting insurance payments by claim, including single checks that cover several patients',
      'Posting patient payments and applying credits to the correct family member',
      'Keeping insurance plan, coverage and fee schedule records accurate so estimates are realistic',
      'Working insurance aging reports and following up on unpaid and pended claims',
      'Reviewing family ledgers for unapplied credits and incorrect balances before statements',
      'Preparing secondary dental claims after the primary carrier pays',
    ],
    workflow: [
      {
        title: 'Access setup',
        detail:
          'Your practice creates individual Dentrix user accounts for our team with security rights limited to billing, and your IT provider sets up remote access.',
      },
      {
        title: 'Ledger and aging review',
        detail:
          'We review outstanding insurance claims, unsent claims and family ledgers with credits to understand the starting position.',
      },
      {
        title: 'Daily claim cycle',
        detail:
          'Completed procedures are reviewed, attachments added and claims sent, with rejections corrected as acknowledgments come back.',
      },
      {
        title: 'Payment posting',
        detail:
          'Insurance and patient payments are entered against the right claims and procedures so ledgers and estimates stay accurate.',
      },
      {
        title: 'Follow-up and reporting',
        detail:
          'Aging claims are worked by date and amount, and a regular summary shows what was sent, paid and still open.',
      },
    ],
    benefits: [
      {
        title: 'Cleaner family ledgers',
        detail: 'Posting payments against original claims is designed to keep family balances and statements accurate.',
      },
      {
        title: 'More realistic estimates',
        detail:
          'Keeping plan and fee schedule records current aims to bring treatment plan estimates closer to what patients actually owe.',
      },
      {
        title: 'Fewer stalled claims',
        detail: 'Routine aging follow-up can help prevent claims from quietly sitting unpaid for months.',
      },
      {
        title: 'Visible work history',
        detail: 'Named user accounts in your own system can help your office see who did what and when.',
      },
    ],
    practiceTypes: [
      'general-dentistry',
      'pediatric-dentistry',
      'periodontics',
      'endodontics',
      'prosthodontics',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'Do you need access to our Dentrix server?',
        a: 'We need user access to Dentrix, not control of your server. For an installed system, your IT provider typically gives our team secure remote access, and your practice creates a separate Dentrix login for each team member with rights limited to billing work. You can review activity and remove access at any time, and we sign a Business Associate Agreement before access is granted.',
      },
      {
        q: 'Can you work insurance aging in Dentrix?',
        a: 'Yes, insurance aging follow-up is a core part of Dentrix billing work. We use the aging and outstanding claim reports in your system to prioritize claims by age and amount, check status with payers by portal or phone, resend or correct claims, and record each step in the claim notes so your front desk can see where things stand.',
      },
      {
        q: 'Will you change our Dentrix setup?',
        a: 'We only change settings you approve. Some billing problems trace back to setup, such as outdated insurance plan records, coverage tables or fee schedules, and we will point those out with a recommended fix. Your office decides whether we make the change or your staff does, and we note what changed so it is easy to review later.',
      },
      {
        q: 'Is Texas Solutions a Dentrix partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of Henry Schein One, and Dentrix is a trademark of its owner. We are an independent billing team that works inside the Dentrix license your practice already holds. Software support, updates and licensing questions stay between your practice and the vendor or your IT provider.',
      },
      {
        q: 'Do you also verify insurance before appointments?',
        a: 'Yes, if you include it in the scope. Verifying dental insurance before appointments keeps plan records, frequencies and remaining maximums current in Dentrix, which in turn makes estimates and claims more accurate. Many offices pair verification with claims and aging work so the same team sees problems at both ends of the process.',
      },
    ],
    relatedTools: [
      'dental-ar-aging-calculator',
      'dental-insurance-collection-calculator',
      'dental-insurance-verification-checklist',
    ],
    relatedServices: [
      'dental-billing',
      'dental-claims-processing',
      'dental-insurance-verification',
      'dental-accounts-receivable',
    ],
    seoTitle: 'Dentrix Billing Services for Dental Practices',
    metaDescription:
      'Dentrix billing services for dental offices: claims, attachments, insurance payment posting, family ledgers and aging follow-up inside your Dentrix system.',
    keywords: [
      'dentrix billing services',
      'dentrix billing',
      'dentrix insurance claims',
      'dentrix insurance aging',
      'outsourced dental billing for dentrix',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Open Dental                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: 'open-dental-billing-services',
    name: 'Open Dental Billing Services',
    shortName: 'Open Dental Billing',
    category: 'software',
    icon: 'Database',
    summary:
      'Billing support inside Open Dental: claims, insurance payments, setup reviews, user permissions, custom reports and A/R.',
    definition:
      'Open Dental billing services are outsourced dental billing tasks carried out inside a practice’s Open Dental system, such as sending claims, posting insurance and patient payments, and following up on outstanding insurance. Because Open Dental is highly configurable, the work also includes checking that insurance plans, fee schedules and user permissions are set up to support accurate billing.',
    intro: [
      'Open Dental is known for flexibility. Practices can tailor a great deal of the system, from insurance plan settings and fee schedules to user security groups and reports, and many offices and dental groups have built their own routines on top of it. That flexibility is useful, but it also means two Open Dental offices can behave very differently, and billing results depend heavily on how the system was configured.',
      'Our Open Dental billing services start by learning how your instance is set up. We work claims, insurance payments, patient payments and outstanding insurance inside your system, and we use its reporting, including custom queries your office already relies on, to track what is unpaid. Where a billing problem traces back to configuration, such as a plan linked to the wrong fee schedule or incorrect benefit entries, we document it and recommend a fix for your approval.',
      'Open Dental is commonly installed on a server in the practice or hosted by a provider you choose, so access is arranged through your IT setup. Open Dental is a trademark of its owner. Texas Solutions is not affiliated with or endorsed by Open Dental Software; we work in your licensed system with named user accounts, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Sending claims and resolving clearinghouse rejections',
      'Adding attachments and narratives for procedures that commonly need support',
      'Posting insurance payments by claim and entering patient payments and adjustments',
      'Running outstanding insurance and aging reports to prioritize follow-up',
      'Using or refining the custom queries your office relies on for billing work lists',
      'Reviewing insurance plan, benefit and fee schedule setup that affects estimates and write-offs',
      'Recommending security group permissions so billing users have only the access they need',
      'Recording follow-up in claim and account notes',
      'Secondary claims and patient balance review before statements',
    ],
    workflow: [
      {
        title: 'Configuration walkthrough',
        detail:
          'We review your insurance plan setup, fee schedules, claim settings, security groups and the reports your office uses today.',
      },
      {
        title: 'Access and permissions',
        detail:
          'Your office creates named Open Dental users for our team in a security group limited to billing, so activity is recorded under each person.',
      },
      {
        title: 'Claims and posting',
        detail: 'Claims are sent and corrected daily, and payments are posted to the right claims and procedures.',
      },
      {
        title: 'Outstanding insurance follow-up',
        detail: 'Unpaid claims are worked by age and amount, with each status check noted in the system.',
      },
      {
        title: 'Configuration fixes',
        detail:
          'Setup issues found along the way are listed with recommended changes, which your office approves before anything is altered.',
      },
    ],
    benefits: [
      {
        title: 'Setup that supports billing',
        detail:
          'Reviewing plans and fee schedules is designed to reduce estimate errors that later turn into patient balance disputes.',
      },
      {
        title: 'Controlled access',
        detail: 'Limiting billing users to the permissions they need can help your office keep a clear audit trail.',
      },
      {
        title: 'Focused follow-up',
        detail: 'Work lists built from your own reports aim to put the oldest and largest unpaid claims first.',
      },
      {
        title: 'Knowledge kept in your office',
        detail:
          'Documenting fixes and routines in your system can help your staff understand the setup if roles change.',
      },
    ],
    practiceTypes: [
      'general-dentistry',
      'dental-group-practices',
      'orthodontics',
      'pediatric-dentistry',
      'oral-surgery',
      'periodontics',
    ],
    faqs: [
      {
        q: 'Why does configuration matter so much in Open Dental?',
        a: 'Configuration matters because Open Dental calculates estimates, write-offs and claim amounts from the insurance plans, benefits and fee schedules your office has entered. If a plan points to the wrong fee schedule or benefits are entered incorrectly, every claim and estimate for those patients inherits the error. Reviewing setup early lets billing work fix causes instead of repeating the same corrections.',
      },
      {
        q: 'Can you use our existing custom reports?',
        a: 'Yes, we can work from the reports and custom queries your office already uses, and we can suggest additional ones for billing work lists when helpful. Any new query is shared with your office for review before it is saved. We avoid changing reports other staff depend on without approval, since many offices rely on them for daily routines.',
      },
      {
        q: 'How is our team’s access controlled in Open Dental?',
        a: 'Access is controlled by your office through named Open Dental users assigned to a security group with limited permissions. That keeps billing users out of areas they do not need and records their actions under their own names. Server or hosting access is arranged through your IT provider, and you can disable any user at any time.',
      },
      {
        q: 'Is Texas Solutions affiliated with Open Dental?',
        a: 'No, Texas Solutions is not affiliated with, endorsed by or a reseller of Open Dental Software, and Open Dental is a trademark of its owner. We provide billing services inside the Open Dental system your practice already uses. Software support, hosting and upgrade questions stay with the vendor or your IT provider.',
      },
      {
        q: 'Can you support a dental group with several clinics in Open Dental?',
        a: 'Yes, billing support can cover several clinics in one Open Dental database. We first confirm how clinics, providers and fee schedules are separated in your setup, then organize claims and follow-up by clinic so each location’s numbers stay clear. Reporting can be shared by location or for the group as a whole, depending on what your leadership needs.',
      },
    ],
    relatedTools: [
      'dental-ar-aging-calculator',
      'dental-denial-rate-calculator',
      'dental-insurance-verification-checklist',
    ],
    relatedServices: [
      'dental-billing',
      'dental-claims-processing',
      'dental-insurance-verification',
      'dental-accounts-receivable',
    ],
    seoTitle: 'Open Dental Billing Services for Dental Offices',
    metaDescription:
      'Open Dental billing services: claims, payment posting, outstanding insurance follow-up and setup reviews handled inside your own Open Dental system.',
    keywords: [
      'open dental billing services',
      'open dental billing',
      'open dental insurance claims',
      'open dental outstanding insurance',
      'outsourced billing for open dental',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Eaglesoft                                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: 'eaglesoft-billing-services',
    name: 'Eaglesoft Billing Services',
    shortName: 'Eaglesoft Billing',
    category: 'software',
    icon: 'HardDrive',
    summary:
      'Dental billing inside Eaglesoft: claims, ERAs, insurance payments, aging follow-up and ledger clean-up for established offices.',
    definition:
      'Eaglesoft billing services are outsourced dental billing tasks performed inside a practice’s Eaglesoft system, including electronic claims, insurance and patient payment posting, and aging follow-up. For offices that have used Eaglesoft for years, the work often includes cleaning up old claims, unapplied credits and outdated insurance records that distort ledgers and reports.',
    intro: [
      'Eaglesoft, from Patterson Dental, is a long-standing server-based practice management system, and many offices have run it for a decade or more. Years of daily use leave a history behind: claims that were never closed, credits that were never applied, employers and insurance plans entered several different ways, and aging reports that include balances nobody is still working.',
      'Our Eaglesoft billing services handle the daily work and the backlog together. Day to day, we send claims through your existing electronic claims setup, post insurance payments and electronic remittances, enter patient payments and follow up on aging. Alongside that, we work through old open claims and ledger issues in batches, with your approval on any write-off or adjustment, so reports begin to reflect what is actually collectible.',
      'Because Eaglesoft usually runs on an in-office server, access is set up through your IT provider’s secure remote connection. Eaglesoft is a trademark of its owner. Texas Solutions is not affiliated with or endorsed by Patterson Dental; we work inside your licensed system as your billing team and sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Sending electronic claims and attachments and correcting rejections',
      'Posting insurance payments and electronic remittances to the correct claims',
      'Entering patient payments, refunds and approved adjustments',
      'Working insurance aging by payer, age and amount',
      'Reviewing old open claims and resubmitting or closing them with your approval',
      'Finding and resolving unapplied credits and incorrect family balances',
      'Consolidating duplicate or outdated insurance plan and employer records, with approval',
      'Preparing secondary claims and reviewing balances before statements',
      'A recurring summary of claims sent, payments posted and aging trends',
    ],
    workflow: [
      {
        title: 'Access and baseline',
        detail:
          'Your IT provider sets up remote access, your office creates named Eaglesoft users for our team, and we pull aging and open claim reports as a baseline.',
      },
      {
        title: 'Backlog triage',
        detail:
          'Old claims and ledger issues are sorted into collectible, needs research and likely uncollectible, and the list is reviewed with you.',
      },
      {
        title: 'Daily billing',
        detail:
          'New claims, payments and remittances are handled every working day so current work does not join the backlog.',
      },
      {
        title: 'Approved clean-up',
        detail:
          'Adjustments, write-offs and record merges are made only after your office approves them, with notes on each account.',
      },
      {
        title: 'Ongoing review',
        detail: 'We report on current aging and backlog progress so you can see how your reports change over time.',
      },
    ],
    benefits: [
      {
        title: 'Reports you can rely on',
        detail: 'Closing stale claims and fixing credits is designed to make aging and ledger reports reflect real balances.',
      },
      {
        title: 'Current work kept current',
        detail: 'Handling daily billing alongside clean-up aims to stop the backlog from growing while old items are resolved.',
      },
      {
        title: 'Cleaner insurance records',
        detail: 'Consolidating outdated plan records can help future claims and estimates use the right information.',
      },
      {
        title: 'Approval on every adjustment',
        detail: 'Requiring your sign-off on write-offs can help the practice keep control over its financial records.',
      },
    ],
    practiceTypes: [
      'general-dentistry',
      'oral-surgery',
      'endodontics',
      'periodontics',
      'prosthodontics',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'Can you clean up old claims in Eaglesoft?',
        a: 'Yes, clean-up of old open claims is a common part of Eaglesoft billing work for long-established offices. We sort old claims by whether they can still be collected, check payer timely filing limits, resubmit or appeal where possible, and recommend closing the rest. Nothing is written off or adjusted without your office’s approval, and every action is noted on the account.',
      },
      {
        q: 'How do you access an in-office Eaglesoft server?',
        a: 'Access is usually provided through a secure remote connection that your IT provider sets up and controls, plus a named Eaglesoft user account for each team member. We do not install anything on your server beyond what your IT provider approves. Your office can review activity and remove access at any time, and we sign a Business Associate Agreement first.',
      },
      {
        q: 'Do you post ERAs in Eaglesoft?',
        a: 'Yes, if your office receives electronic remittances for dental claims, we post them against the matching claims and review any payments that do not match cleanly. Paper EOBs and checks are posted by hand. In both cases we check that write-offs follow the right fee schedule and that patient portions move to the correct ledger.',
      },
      {
        q: 'Is Texas Solutions affiliated with Patterson or Eaglesoft?',
        a: 'No, Texas Solutions is not affiliated with, endorsed by or a reseller for Patterson Dental, and Eaglesoft is a trademark of its owner. We provide billing services inside the Eaglesoft system your practice licenses. Support, updates and hardware questions remain with Patterson or your IT provider.',
      },
      {
        q: 'What if we plan to move away from Eaglesoft?',
        a: 'If a move to another system is planned, cleaning up claims and ledgers first can make the conversion easier, since open balances and insurance records carry over to the new system. We can help reconcile balances before and after the move as a separate billing software migration project, working alongside the vendor that performs the data conversion.',
      },
    ],
    relatedTools: [
      'dental-ar-aging-calculator',
      'dental-insurance-collection-calculator',
      'dental-insurance-verification-checklist',
    ],
    relatedServices: [
      'dental-billing',
      'dental-claims-processing',
      'dental-insurance-verification',
      'dental-accounts-receivable',
      'billing-software-migration',
    ],
    seoTitle: 'Eaglesoft Billing Services for Dental Practices',
    metaDescription:
      'Eaglesoft billing services for dental offices: claims, ERA and payment posting, aging follow-up and approved clean-up of old claims and ledger credits.',
    keywords: [
      'eaglesoft billing services',
      'eaglesoft billing',
      'eaglesoft insurance claims',
      'eaglesoft ledger clean-up',
      'outsourced billing for eaglesoft',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Curve Dental                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'curve-dental-billing-services',
    name: 'Curve Dental Billing Services',
    shortName: 'Curve Dental Billing',
    category: 'software',
    icon: 'Cloud',
    summary:
      'Billing support for cloud-based Curve Dental offices: claims, payments, verification and A/R, worked through a browser login.',
    definition:
      'Curve Dental billing services are outsourced dental billing tasks performed inside a practice’s cloud-based Curve Dental account, including claim submission, insurance and patient payment posting, insurance verification and accounts receivable follow-up. Because Curve runs in a web browser, the billing team works through named user logins without needing a server connection.',
    intro: [
      'Curve Dental is a cloud-based practice management system, so the schedule, charts, ledgers and claims are reached through a web browser rather than a server in the office. That model appeals to new practices that do not want to buy and maintain servers, and to multi-location offices that want every site working in the same system.',
      'For billing, a cloud system changes how the work is organized more than what the work is. Our Curve Dental billing services cover the same core tasks as any dental billing arrangement (claims, attachments, payment posting, verification and aging follow-up), but access is simpler: your office adds named users for our team with the permissions you choose, and there is no VPN or remote desktop to maintain. For new offices, we also help confirm that fee schedules, insurance plans and provider details are entered correctly before the first claims go out.',
      'Curve Dental is a trademark of its owner. Texas Solutions is not affiliated with or endorsed by Curve Dental; we work in your practice’s own Curve account as your billing team, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Creating and sending claims and correcting rejections',
      'Adding the attachments and narratives payers request',
      'Posting insurance payments and patient payments',
      'Verifying insurance and updating plan details before appointments',
      'Following up on unpaid claims by age and amount',
      'Checking fee schedules, plan setup and provider details for new or recently converted offices',
      'Organizing billing work and reporting by location for multi-site practices',
      'Reviewing patient balances before statements are sent',
    ],
    workflow: [
      {
        title: 'User setup',
        detail:
          'Your office adds named Curve users for our team with permissions limited to billing, and we confirm how locations and providers are organized.',
      },
      {
        title: 'Setup check',
        detail:
          'For new or recently converted offices, we review fee schedules, insurance plan records and provider information before claim volume builds.',
      },
      {
        title: 'Daily billing',
        detail:
          'Claims, attachments and payments are handled each working day, with verification completed ahead of scheduled visits if it is in scope.',
      },
      {
        title: 'A/R follow-up',
        detail: 'Unpaid claims are worked by age and amount, and notes are added to each account.',
      },
      {
        title: 'Location reporting',
        detail: 'We share regular summaries by location or for the whole practice, depending on what you need.',
      },
    ],
    benefits: [
      {
        title: 'Simpler access control',
        detail: 'Browser-based logins are designed to make adding and removing billing users quick and controlled.',
      },
      {
        title: 'A clean start for new offices',
        detail: 'Checking setup before volume grows aims to prevent one error from repeating across many early claims.',
      },
      {
        title: 'Consistent work across locations',
        detail: 'One billing routine for every site can help multi-location practices compare locations fairly.',
      },
      {
        title: 'Clear follow-up history',
        detail: 'Account notes in your system can help your front desk answer patient and payer questions quickly.',
      },
    ],
    practiceTypes: [
      'general-dentistry',
      'pediatric-dentistry',
      'orthodontics',
      'periodontics',
      'dental-group-practices',
    ],
    faqs: [
      {
        q: 'Do you need special access to work in Curve Dental?',
        a: 'No special connection is needed beyond named user accounts. Because Curve Dental is cloud-based, our team signs in through a web browser using logins your office creates and controls. You decide each user’s permissions and can deactivate access at any time. We sign a Business Associate Agreement before any login is issued to our team.',
      },
      {
        q: 'Can you help a new dental office starting on Curve?',
        a: 'Yes, a new office is a good time to involve a billing team. Before claim volume builds, we review fee schedules, insurance plan records, provider details and payer enrollment status so early claims are not held up by setup errors. Starting with clean setup is usually far easier than correcting months of claims later.',
      },
      {
        q: 'How do you handle multiple locations in Curve Dental?',
        a: 'We organize billing work by location so each office’s claims, payments and unpaid balances stay visible separately, while still giving owners a combined view. That makes it easier to see whether a problem, such as a payer rejecting claims, affects one site or the whole group, and to give feedback to the right front desk team.',
      },
      {
        q: 'Is Texas Solutions a Curve Dental partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of Curve Dental, and Curve Dental is a trademark of its owner. We are an independent billing team working in the Curve account your practice subscribes to. Questions about features, subscriptions or technical support stay between your practice and the vendor.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-billing-cost-calculator',
      'dental-ar-aging-calculator',
    ],
    relatedServices: [
      'dental-billing',
      'dental-claims-processing',
      'dental-insurance-verification',
      'dental-credentialing',
    ],
    seoTitle: 'Curve Dental Billing Services for Cloud Practices',
    metaDescription:
      'Curve Dental billing services: claims, payment posting, insurance verification and A/R follow-up handled in your cloud Curve account by a remote team.',
    keywords: [
      'curve dental billing services',
      'curve dental billing',
      'cloud dental billing',
      'curve dental insurance claims',
      'outsourced billing for curve dental',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Kareo / Tebra                                                    */
  /* ---------------------------------------------------------------- */
  {
    slug: 'kareo-tebra-billing-services',
    name: 'Kareo and Tebra Billing Services',
    shortName: 'Kareo / Tebra Billing',
    category: 'software',
    icon: 'LayoutDashboard',
    summary:
      'Medical billing inside Kareo, now Tebra: claims, rejections, ERA posting, denials and A/R for small independent practices.',
    definition:
      'Kareo billing services, now often called Tebra billing services, are outsourced medical billing tasks performed inside a practice’s Tebra account, the platform formerly known as Kareo. They include charge review, claim submission, rejection handling, ERA posting and A/R follow-up, and they suit small independent practices that use the cloud platform without dedicated billing staff.',
    intro: [
      'Kareo built its following among small independent medical practices and therapists who wanted cloud-based billing without a large IT footprint. In late 2021 Kareo and PatientPop combined, and the company now operates as Tebra, though many practices still call their billing platform Kareo. The platform brings scheduling, charges, claims, remittances and patient payments into one cloud account.',
      'Because the platform makes claim submission straightforward, many small offices handle billing themselves, often with one person who is also running the front desk. Our Kareo billing services, which apply equally to current Tebra accounts, take on the parts that tend to slip: reviewing charges before submission, clearing rejections, posting ERAs and fixing mismatches, following up on unpaid and denied claims, and keeping patient balances accurate.',
      'Kareo and Tebra are trademarks of their owner. Texas Solutions is not affiliated with or endorsed by Tebra; we work inside the account your practice already subscribes to with named user logins, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Charge entry, or review of charges coming from the clinical side',
      'Claim submission from within the platform and rejection correction',
      'Eligibility checks for upcoming visits',
      'ERA posting and resolution of unmatched or partially posted payments',
      'Denial follow-up, corrected claims and appeals',
      'Unpaid claim follow-up by payer and age',
      'Patient balance review, statements and patient payment posting',
      'ERA and EFT enrollment support when you add payers or providers',
      'A monthly summary built from the platform’s own reports',
    ],
    workflow: [
      {
        title: 'Account review',
        detail: 'We review your providers, payers, fee schedules and current claim and rejection lists in the platform.',
      },
      {
        title: 'User access',
        detail:
          'Your practice adds named users for our team with billing permissions, so every action is tracked under each person.',
      },
      {
        title: 'Claims and rejections',
        detail: 'Charges are reviewed, claims submitted and rejections fixed on an agreed daily or weekly cadence.',
      },
      {
        title: 'Posting and follow-up',
        detail: 'ERAs and patient payments are posted, and unpaid or denied claims are worked by priority.',
      },
      {
        title: 'Monthly check-in',
        detail: 'We review a short report with the owner and agree on any front desk or documentation changes.',
      },
    ],
    benefits: [
      {
        title: 'Rejections handled promptly',
        detail: 'Reviewing rejections on a set cadence is designed to keep claims from sitting unsent after a simple fix.',
      },
      {
        title: 'Accurate posting',
        detail: 'Resolving unmatched ERA payments aims to keep A/R and patient balances reliable.',
      },
      {
        title: 'Time back for small teams',
        detail: 'Moving billing tasks off the front desk can help staff focus on patients and scheduling.',
      },
      {
        title: 'Consistent follow-up',
        detail: 'Working unpaid claims routinely can help reduce the number of claims that age past timely filing limits.',
      },
    ],
    practiceTypes: [
      'behavioral-health',
      'mental-health-clinics',
      'physical-therapy',
      'occupational-therapy',
      'family-medicine',
      'chiropractic',
      'pediatrics',
      'podiatry',
    ],
    faqs: [
      {
        q: 'Is Kareo the same as Tebra?',
        a: 'Yes, in practical terms. Kareo combined with PatientPop in 2021, and the company now operates as Tebra, with the former Kareo billing platform offered under the Tebra name. Many practices still say Kareo when they mean their Tebra billing account. Our billing work is the same whichever name your account shows.',
      },
      {
        q: 'Can you work alongside our in-house staff in Tebra?',
        a: 'Yes, many small practices keep check-in, copay collection and charge capture in house while we handle claims, rejections, posting and follow-up. Each person uses a named login, so the platform shows who did what. We agree on the split in writing and use one shared place for questions, such as account notes or tasks.',
      },
      {
        q: 'Do you post ERAs automatically or by hand?',
        a: 'We use the platform’s electronic remittance posting where it is set up and then review the results, because automatic posting can leave payments unmatched, partly posted or applied with the wrong adjustments. Those exceptions are researched and corrected by hand. Paper EOBs and patient payments are posted manually against the right charges.',
      },
      {
        q: 'Is Texas Solutions a Tebra partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of Tebra, and Kareo and Tebra are trademarks of their owner. We are an independent billing team that works inside the Tebra account your practice subscribes to. Subscription, feature and support questions stay between your practice and Tebra.',
      },
      {
        q: 'What kinds of practices typically use Kareo or Tebra?',
        a: 'Kareo and Tebra are commonly used by small independent practices such as family medicine, therapy, behavioral health and chiropractic offices, often with one to a few providers. These practices tend to have small administrative teams, which is why outside help with rejections, posting and follow-up is a frequent fit for them.',
      },
    ],
    relatedTools: [
      'claim-submission-checklist',
      'era-explained',
      'clean-claim-rate-calculator',
      'days-in-ar-calculator',
    ],
    relatedServices: [
      'medical-billing',
      'claims-submission',
      'payment-posting',
      'medical-billing-small-practices',
      'denial-management',
    ],
    seoTitle: 'Kareo and Tebra Billing Services for Practices',
    metaDescription:
      'Kareo billing services, now Tebra: claim submission, rejections, ERA posting, denials and A/R follow-up handled inside your account by a remote team.',
    keywords: [
      'kareo billing services',
      'tebra billing services',
      'kareo billing',
      'tebra medical billing',
      'outsourced billing for kareo',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  athenahealth                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'athenahealth-billing-services',
    name: 'athenahealth Billing Services',
    shortName: 'athenahealth Billing',
    category: 'software',
    icon: 'Network',
    summary:
      'Billing support for athenaOne practices: claim holds, work queues, denials and patient balances the practice still owns.',
    definition:
      'athenahealth billing services are outsourced billing tasks performed inside a practice’s athenaOne account, focused on the revenue cycle work the practice remains responsible for, such as resolving claim holds, working practice-owned queue items, supporting denials that need practice input and managing patient balances. The exact split depends on each practice’s athenahealth agreement.',
    intro: [
      'athenaOne, from athenahealth, combines the EHR, practice management and patient engagement tools in one cloud-based service, and for many clients athenahealth also performs part of the revenue cycle work, such as running claims through its billing rules and handling some payer follow-up. That arrangement still leaves the practice with real billing responsibilities: claims held for missing information, work queue items that need a decision, denials that require documentation or a provider’s input, and patient balances.',
      'Our athenahealth billing services focus on that practice-owned work. We clear claim holds, work queue items within the permissions you grant, gather documentation for denials, post payments your agreement leaves to the practice, and follow up on patient balances. Because responsibilities vary by contract, we start by mapping what athenahealth handles for you and what your team handles, so nothing is done twice or missed.',
      'athenahealth and athenaOne are trademarks of their owner. Texas Solutions is not affiliated with or endorsed by athenahealth; we work inside your practice’s athenaOne account with named user logins, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Mapping which revenue cycle tasks athenahealth performs under your agreement and which your practice owns',
      'Resolving claims held for missing demographics, insurance, referral or authorization details',
      'Working practice-owned work queue items within assigned permissions',
      'Gathering documentation and provider input for denials and appeals',
      'Checking eligibility and insurance details for upcoming appointments',
      'Posting patient payments and any payments not handled under your agreement',
      'Patient balance review and answers to routine statement questions',
      'Reviewing standard reports for open holds, denials and A/R trends',
      'Feeding recurring registration errors back to your front desk',
    ],
    workflow: [
      {
        title: 'Responsibility map',
        detail:
          'We review your athenahealth agreement and current workflows to list which tasks athenahealth handles and which belong to your practice.',
      },
      {
        title: 'Access and roles',
        detail: 'Your practice adds named users for our team with roles limited to the work we own.',
      },
      {
        title: 'Daily queue work',
        detail:
          'Claim holds and practice-owned work queue items are worked each day, with clinical or provider questions routed to your staff.',
      },
      {
        title: 'Denials and balances',
        detail:
          'Denials that need practice input are researched and supported, and patient balances are reviewed before statements.',
      },
      {
        title: 'Trend review',
        detail: 'We report recurring hold and denial reasons so front desk and documentation habits can be adjusted.',
      },
    ],
    benefits: [
      {
        title: 'No duplicated effort',
        detail:
          'Mapping responsibilities first is designed to keep your team, athenahealth and our team from working the same item.',
      },
      {
        title: 'Shorter-lived claim holds',
        detail: 'Working holds daily aims to keep claims from waiting on information only the practice can supply.',
      },
      {
        title: 'Better-supported denials',
        detail: 'Collecting documentation and provider input can help appeals move forward instead of stalling.',
      },
      {
        title: 'Fixes at the source',
        detail: 'Tracking recurring hold reasons can help correct registration and documentation habits upstream.',
      },
    ],
    practiceTypes: [
      'multi-specialty',
      'primary-care',
      'internal-medicine',
      'orthopedics',
      'obgyn',
      'pediatrics',
      'cardiology',
      'urgent-care',
    ],
    faqs: [
      {
        q: 'If athenahealth already handles billing, why would we need help?',
        a: 'Most athenaOne practices still own a meaningful share of billing work even when athenahealth handles parts of the revenue cycle. Claim holds that need practice information, work queue items, denials requiring documentation, and patient balances commonly stay with the practice. Small or stretched teams often fall behind on these items, and that is the work our team is designed to take on.',
      },
      {
        q: 'How do you avoid overlapping with athenahealth’s own services?',
        a: 'We begin with a responsibility map that lists each revenue cycle task and who owns it under your athenahealth agreement. Our team only works the items assigned to your practice, using roles that limit access to those tasks. If a question comes up about who owns an item, your practice confirms it with athenahealth before we act.',
      },
      {
        q: 'What access do you need in athenaOne?',
        a: 'We need named user accounts with roles your practice assigns, limited to the work queues and tasks in our scope. Because athenaOne is cloud-based, no server or VPN is involved. Your practice can review user activity and remove access at any time, and we sign a Business Associate Agreement before any account is created for our team.',
      },
      {
        q: 'Is Texas Solutions an athenahealth partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of athenahealth, and athenahealth and athenaOne are trademarks of their owner. We are an independent team that works inside the account your practice already uses. Contract, feature and support questions stay between your practice and athenahealth.',
      },
      {
        q: 'Can you help with patient balances in athenaOne?',
        a: 'Yes, patient balance work is often a good fit. We review balances before statements go out, confirm that insurance has finished processing, correct balances moved to the patient too early, post patient payments and answer routine billing questions through the channel your practice prefers. Payment plans and collection steps follow your practice’s own policies.',
      },
    ],
    relatedTools: ['claim-submission-checklist', 'denial-rate-calculator', 'days-in-ar-calculator'],
    relatedServices: [
      'medical-billing',
      'claims-submission',
      'payment-posting',
      'denial-management',
      'ehr-workflow-support',
    ],
    seoTitle: 'athenahealth Billing Services for athenaOne Users',
    metaDescription:
      'athenahealth billing services for athenaOne practices: claim holds, work queues, denials and patient balances your practice owns, worked by a remote team.',
    keywords: [
      'athenahealth billing services',
      'athenaone billing',
      'athenahealth billing',
      'athenahealth claim holds',
      'outsourced billing for athenahealth',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  eClinicalWorks                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'eclinicalworks-billing-services',
    name: 'eClinicalWorks Billing Services',
    shortName: 'eClinicalWorks Billing',
    category: 'software',
    icon: 'Stethoscope',
    summary:
      'Billing inside eClinicalWorks: charge review from encounters, claims, ERA posting, denials and A/R for growing practices.',
    definition:
      'eClinicalWorks billing services are outsourced billing tasks performed inside a practice’s eClinicalWorks EHR and practice management system, including reviewing charges created from encounters, submitting claims, posting ERAs, working denials and following up on A/R. Because charges flow from clinical notes, the work ties documentation, coding and billing closely together.',
    intro: [
      'eClinicalWorks combines the EHR and practice management system, so a claim usually starts as a provider’s encounter: the visit is documented, diagnosis and procedure codes are selected, and the charges move on to billing. It is used by ambulatory practices of many sizes, including multi-provider and multi-location groups and community health centers, and it can be cloud-hosted or run on the practice’s own servers.',
      'That close link between documentation and charges is where much of the billing work happens. Our eClinicalWorks billing services review charges as encounters close, catching missing modifiers, diagnosis pointers or unsigned notes before claims are sent, then handle submission, rejections, ERA posting, denials and A/R follow-up. When the same problem keeps appearing, we send the pattern back to the provider or template owner rather than correcting each claim indefinitely.',
      'eClinicalWorks is a trademark of its owner. Texas Solutions is not affiliated with or endorsed by eClinicalWorks; we work inside your licensed system with named user logins, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Reviewing charges from closed encounters for codes, modifiers, units and diagnosis pointers',
      'Tracking open or unsigned encounters so charges are not delayed',
      'Submitting claims and correcting clearinghouse and payer rejections',
      'Eligibility checks for scheduled visits',
      'ERA posting and review of unmatched or partially posted payments',
      'Denial research, corrected claims and appeals',
      'A/R follow-up by payer, age and amount',
      'Reporting documentation patterns behind recurring denials to providers',
      'Patient balance review before statements',
    ],
    workflow: [
      {
        title: 'System walkthrough',
        detail:
          'We review how encounters become charges, which templates and order sets are used, and how claims leave your system.',
      },
      {
        title: 'Access setup',
        detail:
          'Your practice creates named users for our team with billing permissions, and remote access is arranged if your system is self-hosted.',
      },
      {
        title: 'Charge review',
        detail: 'Charges from closed encounters are reviewed daily, and questions are routed to providers before claims are sent.',
      },
      {
        title: 'Claims, posting and denials',
        detail: 'Claims are submitted, ERAs posted and denials worked on an agreed cadence.',
      },
      {
        title: 'Provider feedback',
        detail: 'Recurring documentation or coding issues are summarized for providers and template owners.',
      },
    ],
    benefits: [
      {
        title: 'Fewer charge-level errors',
        detail:
          'Reviewing charges before submission is designed to catch missing modifiers and pointers while they are easy to fix.',
      },
      {
        title: 'Fewer delayed encounters',
        detail: 'Tracking unsigned or open visits aims to keep charges from waiting days or weeks to reach billing.',
      },
      {
        title: 'Feedback that sticks',
        detail: 'Sharing denial patterns with providers can help address causes in documentation rather than claim by claim.',
      },
      {
        title: 'A clear A/R picture',
        detail: 'Routine follow-up and reporting can help leaders see which payers, providers and locations need attention.',
      },
    ],
    practiceTypes: [
      'primary-care',
      'family-medicine',
      'pediatrics',
      'internal-medicine',
      'multi-specialty',
      'obgyn',
      'gastroenterology',
      'urgent-care',
    ],
    faqs: [
      {
        q: 'How do charges move from notes to claims in eClinicalWorks?',
        a: 'In eClinicalWorks, charges typically originate in the provider’s encounter, where procedure and diagnosis codes are selected as part of documenting the visit. Once the encounter is closed, the charges move to billing for review and claim creation. That is why unsigned notes, missing modifiers or incorrect diagnosis links often show up later as billing delays or denials.',
      },
      {
        q: 'Do you review coding as part of eClinicalWorks billing?',
        a: 'We review charges for billing completeness, such as modifiers, diagnosis pointers, units and payer-specific requirements, before claims are sent. For a deeper review of whether documentation supports the selected codes, practices can add medical coding or coding audit services. Either way, questions go back to the provider rather than codes being changed without their input.',
      },
      {
        q: 'Can you work in a self-hosted eClinicalWorks system?',
        a: 'Yes, if your eClinicalWorks system runs on your own servers, your IT team provides secure remote access along with named user accounts. If it is cloud-hosted, we sign in with named accounts your practice creates. In both cases your practice controls permissions and can remove access at any time, and we sign a Business Associate Agreement first.',
      },
      {
        q: 'Is Texas Solutions an eClinicalWorks partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of eClinicalWorks, and eClinicalWorks is a trademark of its owner. We are an independent billing team working inside the license your practice already holds. Questions about features, upgrades or technical support stay between your practice and the vendor.',
      },
      {
        q: 'Can you support several locations in one eClinicalWorks system?',
        a: 'Yes, practices with several locations or many providers in one eClinicalWorks system can have billing work and reporting organized by facility and provider. That helps show whether a denial pattern or charge delay is specific to one site, one provider or one payer, so feedback reaches the people who can actually fix it.',
      },
    ],
    relatedTools: [
      'claim-submission-checklist',
      'clean-claim-rate-calculator',
      'denial-rate-calculator',
      'era-explained',
    ],
    relatedServices: [
      'medical-billing',
      'claims-submission',
      'payment-posting',
      'medical-coding',
      'denial-management',
    ],
    seoTitle: 'eClinicalWorks Billing Services for Practices',
    metaDescription:
      'eClinicalWorks billing services: charge review from encounters, claim submission, ERA posting, denials and A/R follow-up inside your own eCW system.',
    keywords: [
      'eclinicalworks billing services',
      'eclinicalworks billing',
      'eCW billing',
      'eclinicalworks claims',
      'outsourced billing for eclinicalworks',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  AdvancedMD                                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: 'advancedmd-billing-services',
    name: 'AdvancedMD Billing Services',
    shortName: 'AdvancedMD Billing',
    category: 'software',
    icon: 'AppWindow',
    summary:
      'Billing inside AdvancedMD: visit-to-charge checks, claims, ERA posting, denials and A/R, including practices with a separate EHR.',
    definition:
      'AdvancedMD billing services are outsourced medical billing tasks performed inside a practice’s cloud-based AdvancedMD account, including charge entry or review, claim submission, rejection handling, ERA posting, denial work and A/R follow-up. They apply whether the practice uses AdvancedMD for both EHR and billing or pairs its practice management side with another EHR.',
    intro: [
      'AdvancedMD is a cloud-based suite for independent practices that covers scheduling, billing, EHR and patient tools. Practices use it in different combinations: some run the whole suite, while others use the practice management and billing side alongside a separate EHR, receiving charges through an interface or entering them from superbills.',
      'Those combinations shape the billing work. Our AdvancedMD billing services begin by confirming where charges come from and how complete they are when they arrive. When charges come from another EHR, we reconcile completed visits against charges so nothing is lost in the handoff. From there we handle claim submission, rejections, ERA posting, denials, unpaid claim follow-up and patient balances inside your account.',
      'AdvancedMD is a trademark of its owner. Texas Solutions is not affiliated with or endorsed by AdvancedMD; we work in the account your practice subscribes to using named user logins, and we sign a Business Associate Agreement before accessing patient data.',
    ],
    scope: [
      'Confirming charge sources: the AdvancedMD EHR, an interfaced EHR or paper superbills',
      'Reconciling completed visits against charges received',
      'Charge entry or review before claim submission',
      'Claim submission and correction of rejections',
      'ERA posting and resolution of unmatched payments',
      'Denial research, corrected claims and appeals',
      'Unpaid claim follow-up by payer and age',
      'Patient balance review, statements and payment posting',
      'Recurring reporting built from your own account data',
    ],
    workflow: [
      {
        title: 'Setup review',
        detail:
          'We document which AdvancedMD modules you use, where charges originate and how claims and remittances flow.',
      },
      {
        title: 'Access and permissions',
        detail: 'Your practice creates named users for our team with billing permissions you control.',
      },
      {
        title: 'Visit-to-charge reconciliation',
        detail: 'Completed visits are matched against charges each day so missing charges are found quickly.',
      },
      {
        title: 'Claims and posting',
        detail: 'Claims are submitted, rejections fixed and ERAs posted on an agreed cadence.',
      },
      {
        title: 'Follow-up and reporting',
        detail: 'Denials and unpaid claims are worked by priority, and a recurring report summarizes the period.',
      },
    ],
    benefits: [
      {
        title: 'No lost charges between systems',
        detail: 'Reconciling visits against charges is designed to catch encounters that never reached billing.',
      },
      {
        title: 'Steady claim flow',
        detail: 'A daily claim and rejection routine aims to keep claims moving without batches piling up.',
      },
      {
        title: 'Reliable balances',
        detail: 'Resolving unmatched remittances can help keep A/R and patient balances accurate.',
      },
      {
        title: 'Clear accountability',
        detail: 'Named user accounts can help your practice see exactly who worked each account and when.',
      },
    ],
    practiceTypes: [
      'behavioral-health',
      'mental-health-clinics',
      'physical-therapy',
      'orthopedics',
      'dermatology',
      'pain-management',
      'family-medicine',
    ],
    faqs: [
      {
        q: 'Can you bill in AdvancedMD if we use a different EHR?',
        a: 'Yes, many practices use AdvancedMD for practice management and billing while documenting in another EHR. In that setup, we confirm how charges arrive, whether through an interface or manual entry, and reconcile completed visits against charges so none are missed. The rest of the billing work, from claims to follow-up, happens inside your AdvancedMD account.',
      },
      {
        q: 'What does visit-to-charge reconciliation catch?',
        a: 'Visit-to-charge reconciliation catches appointments that were completed but never produced a charge, as well as charges that arrived incomplete. Common causes include unsigned notes, interface errors and visits checked out without a superbill. Finding these every day is designed to stop revenue from being lost quietly before a claim ever exists.',
      },
      {
        q: 'How is access to AdvancedMD managed?',
        a: 'Your practice creates a named AdvancedMD user for each member of our team and assigns permissions limited to billing tasks. Because the system is cloud-based, no server connection is needed. You can review activity and deactivate users at any time, and we sign a Business Associate Agreement before any access is granted.',
      },
      {
        q: 'Is Texas Solutions an AdvancedMD partner?',
        a: 'No, Texas Solutions is not a partner, reseller or affiliate of AdvancedMD, and AdvancedMD is a trademark of its owner. We are an independent billing team working inside the account your practice subscribes to. Questions about subscriptions, features or technical support stay between your practice and AdvancedMD.',
      },
    ],
    relatedTools: ['claim-submission-checklist', 'era-explained', 'days-in-ar-calculator'],
    relatedServices: [
      'medical-billing',
      'claims-submission',
      'payment-posting',
      'charge-entry',
      'ehr-workflow-support',
    ],
    seoTitle: 'AdvancedMD Billing Services for Independent Practices',
    metaDescription:
      'AdvancedMD billing services: visit-to-charge checks, claims, ERA posting, denials and A/R follow-up inside your AdvancedMD account, with or without its EHR.',
    keywords: [
      'advancedmd billing services',
      'advancedmd billing',
      'advancedmd claims',
      'advancedmd practice management billing',
      'outsourced billing for advancedmd',
    ],
  },
];
