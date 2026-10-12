import type { Service } from "../types";

export const servicesPart3: Service[] = [
  /* ---------------------------------------------------------------- */
  /*  Coding audits                                                    */
  /* ---------------------------------------------------------------- */
  {
    slug: "coding-audit",
    name: "Coding Audits and Documentation Review",
    shortName: "Coding Audits",
    category: "mid-cycle",
    icon: "FileSearch",
    summary:
      "Sample-based reviews that compare clinical documentation to the codes and modifiers billed, with findings your team can act on.",
    definition:
      "A coding audit is a structured review of a sample of encounters that checks whether the documented clinical record supports the diagnosis codes, procedure codes, modifiers and units that were billed. It identifies undercoding, overcoding, missing documentation elements and payer edit conflicts so providers and coders can correct patterns before they become denials or refund requests.",
    intro: [
      "Coding drifts over time. New providers bring habits from previous practices, payer policies change every quarter, and annual code set updates add or retire codes that templates may still reference. Without a periodic review, small mismatches between what a note says and what a claim reports can repeat across hundreds of encounters.",
      "Our coding audit service looks at a defined sample of your claims alongside the supporting documentation. We check code selection, diagnosis specificity, modifier use, units and medical necessity support against current CMS guidance, NCCI edits and the payer policies that apply to your practice. Findings are reported by provider and by pattern, not as a list of isolated errors.",
      "The goal is education and process correction, not blame. Each audit closes with a review of what was found, why it matters to reimbursement or compliance, and which template, workflow or training change could address it. We work inside your systems and sign a Business Associate Agreement before accessing patient data.",
    ],
    scope: [
      "Define audit scope, sample size and selection method (random, targeted or focused on a code family)",
      "Review E/M level selection against documented medical decision making or total time",
      "Check ICD-10-CM diagnosis specificity, sequencing and linkage to billed procedures",
      "Validate modifier use, including modifiers 25, 59 and the X{EPSU} subset, against NCCI and payer policy",
      "Compare billed units and dosage-based HCPCS codes to documented quantities",
      "Identify documentation gaps such as missing signatures, orders or time statements",
      "Flag claims that may need correction, rebilling or a refund review by your compliance lead",
      "Summarize findings by provider, code family and root cause",
      "Prepare provider education notes and template change suggestions",
    ],
    workflow: [
      {
        title: "Scoping call",
        detail:
          "We agree on the audit purpose (baseline, new provider, payer focus or follow-up), the date range, the sample size and who receives the findings.",
      },
      {
        title: "Sample pull",
        detail:
          "Encounters are selected from your PM and EHR system using the agreed method, and the claim data and documentation for each are gathered in one place.",
      },
      {
        title: "Line-by-line review",
        detail:
          "Each encounter is reviewed for code accuracy, diagnosis support, modifier logic and units, with the reason for every variance recorded.",
      },
      {
        title: "Pattern analysis",
        detail:
          "Variances are grouped by provider, code family and cause so the report shows recurring issues rather than one-off mistakes.",
      },
      {
        title: "Findings review",
        detail:
          "We walk providers and billing staff through the results, answer questions and agree on which corrections or education steps to prioritize.",
      },
      {
        title: "Follow-up audit",
        detail:
          "A smaller targeted sample is reviewed later to check whether the agreed changes have taken hold.",
      },
    ],
    benefits: [
      {
        title: "Clearer view of coding risk",
        detail:
          "Designed to show where documentation and billed codes diverge before a payer audit or recoupment letter does.",
      },
      {
        title: "Fewer repeat denials",
        detail:
          "Aims to correct the modifier, diagnosis linkage and unit patterns that commonly trigger edit-based denials.",
      },
      {
        title: "Better provider documentation",
        detail:
          "Provider-specific feedback can help clinicians document the elements that support the level of service they deliver.",
      },
      {
        title: "Captured revenue from undercoding",
        detail:
          "Reviews look in both directions, so services that were documented but not fully coded are surfaced too.",
      },
    ],
    practiceTypes: [
      "family-medicine",
      "internal-medicine",
      "cardiology",
      "orthopedics",
      "dermatology",
      "pain-management",
      "behavioral-health",
      "multi-specialty",
    ],
    faqs: [
      {
        q: "How often should a practice run a coding audit?",
        a: "Many practices run a baseline coding audit once a year and smaller focused audits when something changes, such as a new provider, a new service line or a spike in a particular denial reason. The right cadence depends on your volume and risk areas. Annual code set updates and payer policy changes are also good triggers for a targeted review of the affected codes.",
      },
      {
        q: "What is the difference between a prospective and a retrospective coding audit?",
        a: "A prospective audit reviews claims before they are submitted, so errors can be fixed before the payer sees them. A retrospective audit reviews claims that have already been paid or denied, which shows historical patterns and may identify claims that need correction or refund review. Prospective audits suit new providers, while retrospective audits suit baseline and compliance reviews.",
      },
      {
        q: "How many charts are reviewed in a coding audit?",
        a: "The sample size depends on the purpose of the audit. A common starting point for a provider-level review is 10 to 20 encounters per provider, while a focused audit might review every claim for one code family within a date range. We agree on the sample method during scoping so the results are meaningful for the question you are trying to answer.",
      },
      {
        q: "Will a coding audit find claims we need to refund?",
        a: "It can. If the review finds paid claims that the documentation does not support, those are flagged for your compliance lead or legal counsel to evaluate. Overpayment obligations, including the federal 60-day rule for identified Medicare and Medicaid overpayments, are decisions for your practice to make with qualified advice. We document the findings clearly so that evaluation is straightforward.",
      },
      {
        q: "Do you reproduce CPT descriptors in audit reports?",
        a: "No. CPT code descriptors are licensed by the AMA, so our reports reference code numbers and explain findings in plain language without reproducing licensed descriptor text. Your coders and providers can look up the full descriptors in the licensed code books or software your practice already uses.",
      },
    ],
    relatedTools: ["icd-10-code-search", "hcpcs-code-lookup", "denial-rate-calculator", "denial-reasons-guide"],
    relatedServices: ["medical-coding", "revenue-cycle-audit", "denial-management", "charge-entry"],
    seoTitle: "Medical Coding Audits and Documentation Review",
    metaDescription:
      "Coding audits that compare documentation to billed codes, modifiers and units, with provider-level findings and education designed to reduce repeat denials.",
    keywords: [
      "medical coding audit",
      "coding compliance review",
      "documentation review",
      "E/M audit",
      "retrospective coding audit",
      "prospective coding audit",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  RCM analytics and reporting                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: "rcm-analytics-reporting",
    name: "Revenue Cycle Analytics and Reporting",
    shortName: "RCM Analytics",
    category: "analytics",
    icon: "BarChart3",
    summary:
      "Monthly KPI reporting built from your own billing data, with plain-language commentary on what changed and what to look at next.",
    definition:
      "Revenue cycle analytics and reporting is the regular measurement of billing and collection performance using data from your practice management system, clearinghouse and remittances. It tracks metrics such as days in AR, net collection rate, denial rate and clean claim rate, then explains the drivers behind changes so leaders can decide where to focus.",
    intro: [
      "Most practice management systems can produce dozens of reports, but few practices have time to pull them consistently, reconcile them against each other and turn them into decisions. Numbers that are calculated differently each month, or that exclude certain payers or locations, make trends hard to trust.",
      "This service sets up a consistent reporting package from the data you already have. We define each KPI the same way every period, document the formula and data source, and pair the numbers with short commentary on what moved and why. Reports can be cut by provider, location, payer and service line so problems are traced to a specific area rather than averaged away.",
      "The reports are built for owners, practice administrators and billing leads. They are meant to start conversations about workflow, staffing and payer issues, not to replace them.",
    ],
    scope: [
      "Define a KPI set and document the formula and data source for each metric",
      "Pull monthly data from your PM system, clearinghouse reports and remittance files",
      "Calculate days in AR, AR aging buckets, net and gross collection rates",
      "Track denial rate, top denial reasons by CARC and RARC, and clean claim rate",
      "Report charge lag, claim submission lag and payment turnaround by payer",
      "Break results down by provider, location, payer and service line",
      "Write a short monthly narrative explaining changes and suggested follow-ups",
      "Maintain a trend history so month-over-month and year-over-year comparisons are consistent",
    ],
    workflow: [
      {
        title: "Discovery",
        detail:
          "We review the reports your system can produce, how data is structured and which questions leadership most wants answered.",
      },
      {
        title: "KPI definitions",
        detail:
          "Each metric is defined in writing, including which transactions are included or excluded, so results are repeatable.",
      },
      {
        title: "Baseline build",
        detail:
          "Historical data is pulled to establish a starting point and identify any data quality issues that need cleanup.",
      },
      {
        title: "Monthly reporting cycle",
        detail:
          "After month-end close, data is refreshed, metrics are calculated and variances are investigated before the report goes out.",
      },
      {
        title: "Review meeting",
        detail:
          "We walk through the report with your team, discuss drivers and agree on follow-up items for the next period.",
      },
    ],
    benefits: [
      {
        title: "Consistent numbers",
        detail:
          "Written definitions are designed to make each month comparable to the last, so trends reflect real change.",
      },
      {
        title: "Faster problem spotting",
        detail:
          "Payer and provider breakdowns aim to surface a slowdown or denial spike while it is still small.",
      },
      {
        title: "Better-informed decisions",
        detail:
          "Commentary connects the numbers to workflow, staffing and contract questions leadership can act on.",
      },
      {
        title: "Less time pulling reports",
        detail:
          "A defined package can reduce the hours staff spend exporting and formatting data each month.",
      },
    ],
    practiceTypes: [
      "multi-specialty",
      "primary-care",
      "orthopedics",
      "cardiology",
      "urgent-care",
      "ambulatory-surgery-centers",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "Which revenue cycle KPIs should a practice track monthly?",
        a: "A practical core set is days in AR, percentage of AR over 90 days, net collection rate, denial rate, clean claim rate and charge lag. These cover how quickly claims go out, how often they are accepted, how quickly they are paid and how much of the collectible amount is collected. Specialty practices often add payer-specific or service-line metrics on top of this core.",
      },
      {
        q: "Why do our KPIs look different from one report to the next?",
        a: "Usually because the formulas or filters are not the same. Days in AR changes depending on whether you use 90 or 180 days of charges, and collection rates change depending on how contractual adjustments and write-offs are treated. Writing down each definition and using it every month is the simplest way to make results comparable.",
      },
      {
        q: "Do you need a separate analytics platform to produce these reports?",
        a: "No. We build reports from the exports your existing PM/EHR system, clearinghouse and remittance files already provide, using spreadsheets or the reporting tools you have. If your practice later decides to adopt a dedicated analytics platform, the documented KPI definitions make that transition easier.",
      },
      {
        q: "Can reporting be split by location or provider?",
        a: "Yes, as long as the data in your system is tagged by location and rendering provider. We check how those fields are populated during discovery, because inconsistent tagging is a common reason location or provider reports look wrong. Where tagging gaps exist, we document them and suggest how to fix them going forward.",
      },
      {
        q: "What happens after a KPI moves in the wrong direction?",
        a: "We investigate the driver before reporting it. A rise in days in AR might come from one payer slowing down, a batch of claims held for a credentialing issue or a backlog in follow-up. The monthly narrative explains the likely cause and suggests a specific next step, such as a payer escalation or a focused denial review.",
      },
    ],
    relatedTools: [
      "rcm-performance-scorecard",
      "days-in-ar-calculator",
      "net-collection-rate-calculator",
      "clean-claim-rate-calculator",
    ],
    relatedServices: [
      "revenue-cycle-audit",
      "accounts-receivable-management",
      "denial-management",
      "rcm-workflow-optimization",
    ],
    seoTitle: "Revenue Cycle Analytics and KPI Reporting",
    metaDescription:
      "Monthly revenue cycle reports built from your billing data: days in AR, collection rates and denial trends by payer and provider, with plain analysis.",
    keywords: [
      "revenue cycle analytics",
      "RCM reporting",
      "medical billing KPIs",
      "days in AR report",
      "denial rate tracking",
      "practice financial reporting",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Practice management support                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: "practice-management-support",
    name: "Practice Management Support",
    shortName: "Practice Management",
    category: "practice-support",
    icon: "LayoutDashboard",
    summary:
      "Back-office help for the system tables, master files and routine admin tasks that keep a practice management system accurate.",
    definition:
      "Practice management support is remote administrative help with the setup and upkeep of a practice management system, including provider and payer master files, fee schedules, insurance plan tables, user task queues and routine reports. Clean master data is designed to keep claims, statements and reports accurate without front-desk staff needing to troubleshoot system settings.",
    intro: [
      "A practice management system is only as accurate as the tables behind it. When a payer address changes, a provider's NPI is attached to the wrong location, or a fee schedule is not updated for the new year, the effects show up downstream as rejected claims, wrong statements and confusing reports.",
      "Our practice management support team handles the routine maintenance that often falls between roles. We update payer and plan records, keep provider and location data current, load fee schedule changes, clean up duplicate patient or insurance records and keep work queues from filling with stale items. All work happens inside your existing PM/EHR system under the user accounts and permissions you assign.",
      "This service suits practices without a dedicated system administrator, as well as growing groups adding providers or locations faster than their internal team can keep the setup current.",
    ],
    scope: [
      "Maintain payer, insurance plan and claim address tables",
      "Update provider, location, NPI and taxonomy records as staff and sites change",
      "Load annual and mid-year fee schedule updates into the system",
      "Identify and merge duplicate patient and insurance records, following your approval rules",
      "Clear stale items from billing and follow-up work queues",
      "Set up and run recurring operational reports on a schedule",
      "Document system settings and common procedures in a shared reference guide",
      "Coordinate with your software vendor's support desk on open tickets",
    ],
    workflow: [
      {
        title: "System walkthrough",
        detail:
          "We review your configuration, master files and work queues with your office manager to understand how the system is used day to day.",
      },
      {
        title: "Cleanup list",
        detail:
          "Outdated payer records, duplicates, missing provider data and stale queue items are listed and prioritized with you.",
      },
      {
        title: "Access and approvals",
        detail:
          "You create user accounts with the permissions needed, and we agree which changes need your sign-off before they are made.",
      },
      {
        title: "Ongoing maintenance",
        detail:
          "Routine updates are handled on a set schedule, with change requests logged so there is a record of who changed what and why.",
      },
      {
        title: "Periodic review",
        detail:
          "We meet to review open items, upcoming changes such as new providers or payers, and any recurring issues worth fixing at the source.",
      },
    ],
    benefits: [
      {
        title: "Cleaner claims at the source",
        detail:
          "Accurate payer and provider records are designed to prevent rejections caused by setup errors rather than coding.",
      },
      {
        title: "Less staff distraction",
        detail:
          "Front-desk and billing staff can spend less time troubleshooting system tables and more time on patients and claims.",
      },
      {
        title: "Documented setup",
        detail:
          "A written reference of settings and procedures aims to reduce dependence on one person who knows how the system works.",
      },
    ],
    practiceTypes: [
      "family-medicine",
      "primary-care",
      "physical-therapy",
      "chiropractic",
      "multi-specialty",
      "general-dentistry",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What does practice management support actually cover?",
        a: "It covers the administrative upkeep of your practice management system: payer and plan tables, provider and location records, fee schedules, duplicate records, work queues and recurring reports. It does not replace your software vendor's technical support, and it does not include clinical work. We handle the routine setup tasks that keep billing and scheduling data accurate.",
      },
      {
        q: "Do you need administrator access to our system?",
        a: "Only the level of access the agreed tasks require. Many tasks, such as updating payer addresses, need elevated permissions, while others can be done with a standard billing role. Your practice creates and controls the user accounts, decides which permissions to grant, and can remove access at any time.",
      },
      {
        q: "Can you help when we add a new provider or location?",
        a: "Yes. Adding a provider or location touches several system areas: provider records, NPI and taxonomy, location and place of service settings, fee schedules and payer-specific billing rules. We work through that checklist in your system and coordinate timing with credentialing and enrollment so claims are not created before the provider is set up to be paid.",
      },
      {
        q: "How do you avoid making changes we did not approve?",
        a: "We agree on an approval list at the start. Low-risk updates, such as correcting a payer phone number, can be done directly and logged. Changes that affect billing rules, fee schedules or record merges are sent to your designated contact for approval first. Every change is recorded in a shared log for review.",
      },
    ],
    relatedTools: ["npi-lookup", "fee-schedule-comparison-calculator", "claim-rejection-rate-calculator"],
    relatedServices: [
      "ehr-workflow-support",
      "virtual-medical-assistant",
      "healthcare-data-entry",
      "clearinghouse-coordination",
    ],
    seoTitle: "Practice Management System Support Services",
    metaDescription:
      "Remote practice management support for payer tables, provider records, fee schedules, duplicate cleanup and work queues, done inside your existing system.",
    keywords: [
      "practice management support",
      "PM system maintenance",
      "medical office administration",
      "fee schedule updates",
      "payer table maintenance",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Virtual medical administrative assistant                         */
  /* ---------------------------------------------------------------- */
  {
    slug: "virtual-medical-assistant",
    name: "Virtual Medical Administrative Assistance",
    shortName: "Virtual Admin Assistant",
    category: "practice-support",
    icon: "Headset",
    summary:
      "Remote administrative staff who handle inboxes, callbacks, faxes and paperwork inside your systems under your access controls.",
    definition:
      "Virtual medical administrative assistance is remote, non-clinical support for a practice's day-to-day office tasks, such as processing faxes and referrals, returning routine calls, managing shared inboxes and preparing paperwork. Assistants work inside the practice's own phone, PM and EHR systems using accounts and permissions the practice controls, and they follow the practice's written procedures.",
    intro: [
      "Administrative work in a medical or dental office arrives all day from every direction: faxed referrals, records requests, voicemails, portal messages and forms that need to be scanned and indexed. When the front desk is also checking patients in, these tasks pile up and response times slip.",
      "A virtual administrative assistant takes on a defined set of these non-clinical tasks remotely. All work happens inside your systems, using user accounts you create, the permissions you set and the procedures you approve. Assistants do not give medical advice, triage symptoms or make clinical decisions; anything clinical is routed to your staff according to your rules.",
      "Before any access to patient data, we sign a Business Associate Agreement and agree on which systems, queues and tasks are in scope. You can review activity through your own system audit logs at any time.",
    ],
    scope: [
      "Process incoming faxes and documents, then index them to the correct patient chart",
      "Manage referral intake, including checking for required documents and notes",
      "Return routine non-clinical calls and voicemails using your approved scripts",
      "Monitor and route patient portal messages to the correct staff member",
      "Handle medical records requests according to your release-of-information policy",
      "Prepare new patient packets and send intake forms",
      "Update demographic and contact information when patients report changes",
      "Track and follow up on outstanding forms, signatures and referral responses",
    ],
    workflow: [
      {
        title: "Task inventory",
        detail:
          "We list the administrative tasks your staff handle today, how often they occur and which ones can be done remotely without clinical judgment.",
      },
      {
        title: "Access setup",
        detail:
          "Your practice creates individual user accounts with role-based permissions limited to the agreed tasks, after the Business Associate Agreement is signed.",
      },
      {
        title: "Procedures and scripts",
        detail:
          "Your existing procedures are documented or refined, including call scripts and escalation rules for anything clinical or sensitive.",
      },
      {
        title: "Supervised start",
        detail:
          "The assistant begins with a limited task set while your staff review the work and give feedback.",
      },
      {
        title: "Steady-state support",
        detail:
          "Tasks expand as agreed, with a daily or weekly summary of volume handled and items waiting on your team.",
      },
    ],
    benefits: [
      {
        title: "More front-desk capacity",
        detail:
          "Moving remote-friendly tasks off the front desk is designed to give in-office staff more time with patients in the building.",
      },
      {
        title: "Fewer stalled inboxes",
        detail:
          "Dedicated coverage aims to keep faxes, voicemails and portal messages from sitting unanswered.",
      },
      {
        title: "Controlled access",
        detail:
          "Because work happens inside your systems under your accounts, you keep control over permissions and audit trails.",
      },
      {
        title: "Consistent handling",
        detail:
          "Written procedures and scripts can help routine requests get the same answer regardless of who handles them.",
      },
    ],
    practiceTypes: [
      "family-medicine",
      "pediatrics",
      "behavioral-health",
      "mental-health-clinics",
      "physical-therapy",
      "dermatology",
      "general-dentistry",
      "orthodontics",
    ],
    faqs: [
      {
        q: "What tasks can a virtual medical administrative assistant handle?",
        a: "A virtual administrative assistant can handle non-clinical office work such as indexing faxes, processing referrals, returning routine calls, routing portal messages, sending intake forms and following up on outstanding paperwork. They do not provide medical advice or triage. Any message that needs clinical judgment is routed to your staff following the escalation rules you set.",
      },
      {
        q: "Whose systems does the assistant work in?",
        a: "The assistant works only inside your practice's own systems, such as your phone platform, PM/EHR system and fax queue, using user accounts your practice creates. You set the permissions, you can review activity in your audit logs, and you can disable access at any time. Patient data is not moved into separate systems for this work.",
      },
      {
        q: "How is patient privacy protected with remote staff?",
        a: "We sign a Business Associate Agreement before accessing patient data, and access is limited to the systems and tasks you approve. Each assistant uses an individual login rather than a shared one, so activity is traceable. We follow your practice's privacy and security policies, and you remain in control of how access is granted and removed.",
      },
      {
        q: "Can the assistant answer our phones live?",
        a: "It depends on your phone system and the call types involved. Many practices start with voicemail callbacks and overflow calls for routine questions such as directions, hours and form status, using approved scripts. Live answering for scheduling or billing questions can be added once procedures are in place and your phone platform supports remote users.",
      },
      {
        q: "How do we know the work is getting done?",
        a: "You receive a regular summary of volume handled by task type and a list of items waiting on your team. Because the work happens in your systems, you can also check queues, chart notes and audit logs directly. A designated contact on your side reviews the work during the first weeks and gives feedback.",
      },
    ],
    relatedTools: ["provider-productivity-calculator", "billing-staffing-cost-calculator"],
    relatedServices: [
      "appointment-scheduling",
      "healthcare-data-entry",
      "patient-registration",
      "practice-management-support",
    ],
    seoTitle: "Virtual Medical Administrative Assistant",
    metaDescription:
      "Remote, non-clinical admin support for faxes, referrals, callbacks and portal messages, done inside your own systems with accounts and access you control.",
    keywords: [
      "virtual medical assistant",
      "remote medical administrative assistant",
      "virtual medical office assistant",
      "medical office support",
      "referral processing",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Healthcare data entry                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: "healthcare-data-entry",
    name: "Healthcare Data Entry and Documentation Support",
    shortName: "Healthcare Data Entry",
    category: "practice-support",
    icon: "Keyboard",
    summary:
      "Accurate entry and indexing of demographics, insurance, paper forms and scanned records directly in your systems.",
    definition:
      "Healthcare data entry and documentation support is the accurate transcription, indexing and updating of administrative records, such as patient demographics, insurance details, intake forms and scanned documents, in a practice's systems. The work is performed inside the practice's own PM and EHR systems under its access controls, with verification steps designed to catch keying errors.",
    intro: [
      "Many billing problems start as data problems. A transposed digit in a member ID, a misspelled name that does not match the payer's file or a scanned document filed to the wrong chart can each lead to rejected claims, misdirected statements or privacy incidents.",
      "Our data entry team keys and indexes administrative information directly into your PM/EHR system, using the accounts and permissions you control. We do not export your records to outside systems for processing. Each task type has a defined verification step, such as matching insurance details to the card image or confirming identifiers before a document is filed.",
      "This service is useful for ongoing volume, such as daily intake forms and scanned mail, and for one-time projects like backlog cleanup or loading records after an acquisition. It covers administrative data only; clinical documentation is entered by your clinicians.",
    ],
    scope: [
      "Enter and update patient demographics from intake forms and registration paperwork",
      "Key insurance policy details from card images and verify subscriber information",
      "Index scanned documents, outside records and correspondence to the correct patient chart",
      "Enter referral and authorization numbers into the appropriate system fields",
      "Clear document backlogs from scan and fax queues",
      "Load paper superbills or encounter forms when your workflow still uses them",
      "Correct incomplete or inconsistent records identified in data quality reports",
      "Keep a log of entries that need clarification from your staff",
    ],
    workflow: [
      {
        title: "Define document types",
        detail:
          "We list each document or data type, where it comes from, where it belongs in your system and which fields are required.",
      },
      {
        title: "Set access under your controls",
        detail:
          "After the Business Associate Agreement is signed, your practice creates individual accounts limited to the screens and queues the work needs.",
      },
      {
        title: "Write entry rules",
        detail:
          "Naming conventions, document categories and verification checks are written down so every entry follows the same standard.",
      },
      {
        title: "Process and verify",
        detail:
          "Items are entered or indexed, then checked against the source using the agreed method, such as matching two patient identifiers.",
      },
      {
        title: "Exception handling",
        detail:
          "Illegible, incomplete or conflicting items are logged and sent to your designated staff instead of being guessed.",
      },
    ],
    benefits: [
      {
        title: "Cleaner downstream claims",
        detail:
          "Accurate demographics and insurance details are designed to reduce rejections caused by data mismatches.",
      },
      {
        title: "Smaller backlogs",
        detail:
          "Dedicated entry capacity aims to keep scan and fax queues current instead of letting documents age.",
      },
      {
        title: "Correctly filed records",
        detail:
          "Two-identifier checks before filing can help keep documents out of the wrong patient chart.",
      },
    ],
    practiceTypes: [
      "family-medicine",
      "internal-medicine",
      "home-health",
      "physical-therapy",
      "radiology",
      "multi-specialty",
      "general-dentistry",
    ],
    faqs: [
      {
        q: "What kinds of healthcare data entry do you handle?",
        a: "We handle administrative data entry: patient demographics, insurance details, referral and authorization numbers, scanned document indexing and paper encounter forms where those are still used. We do not enter clinical notes, orders or results on behalf of clinicians. The specific document types are agreed during setup and written into a procedure your staff can review.",
      },
      {
        q: "Is our data copied to outside systems for data entry?",
        a: "No. Data entry is performed inside your practice's own systems, using individual user accounts your practice creates and controls. Documents stay in your scan queues and charts, and entries are made directly in your PM/EHR system. This keeps activity visible in your audit logs and avoids creating extra copies of patient information elsewhere.",
      },
      {
        q: "How do you check data entry accuracy?",
        a: "Each task type has a defined verification step. Insurance entries are matched against the card image, documents are filed only after two patient identifiers match, and required fields are checked before an entry is marked complete. Items that cannot be verified are logged as exceptions for your staff instead of being entered on a best guess.",
      },
      {
        q: "Can you help clear a large document backlog?",
        a: "Yes. Backlog projects start with a count and sort of the queue by document type and age, so the most time-sensitive items, such as referrals and authorizations, are handled first. We agree on target categories and filing rules with you before starting, and report progress so you can see what remains.",
      },
    ],
    relatedTools: ["claim-rejection-rate-calculator", "first-pass-acceptance-rate-calculator"],
    relatedServices: [
      "patient-registration",
      "charge-entry",
      "virtual-medical-assistant",
      "insurance-eligibility-verification",
    ],
    seoTitle: "Healthcare Data Entry and Document Indexing",
    metaDescription:
      "Healthcare data entry for demographics, insurance details and scanned documents, done inside your PM/EHR system under your access controls with verification.",
    keywords: [
      "healthcare data entry",
      "medical data entry services",
      "document indexing",
      "patient demographic entry",
      "medical records indexing",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Appointment scheduling                                           */
  /* ---------------------------------------------------------------- */
  {
    slug: "appointment-scheduling",
    name: "Appointment Scheduling Support",
    shortName: "Appointment Scheduling",
    category: "front-end",
    icon: "CalendarCheck",
    summary:
      "Remote scheduling help that books, confirms and reschedules visits by your rules and captures billing details at booking.",
    definition:
      "Appointment scheduling support is remote help with booking, confirming, rescheduling and filling cancellations in a practice's calendar according to its visit types and provider rules. Done well, scheduling also collects the insurance and referral details billing needs, so eligibility checks and authorizations can happen before the patient arrives.",
    intro: [
      "Scheduling is the first step in the revenue cycle. The appointment record is where insurance details, referral requirements and visit types are first captured, and mistakes made at booking often surface later as eligibility denials, missing authorizations or the wrong visit length.",
      "Our scheduling support team works in your scheduling system following your template rules: which visit types go with which providers, how long each slot is, which visits need a referral or authorization, and how far out to book. We confirm upcoming visits, work cancellation and waitlist lists and reschedule patients when provider calendars change.",
      "Scheduling staff collect the payer and referral information your billing team needs, then hand off visits that require verification or authorization to the right queue. Work happens in your systems under accounts you control.",
    ],
    scope: [
      "Book new and returning patient appointments according to your template rules",
      "Capture insurance, referring provider and reason-for-visit details at booking",
      "Flag visits that require a referral or prior authorization before the date of service",
      "Run appointment confirmation calls or follow up on unconfirmed reminders",
      "Reschedule patients when provider calendars change",
      "Work cancellation and waitlist lists to fill open slots",
      "Track no-shows and follow your rebooking policy",
      "Report on unfilled capacity and scheduling bottlenecks",
    ],
    workflow: [
      {
        title: "Template review",
        detail:
          "We document your visit types, slot lengths, provider preferences and booking rules so every scheduler applies them the same way.",
      },
      {
        title: "Data capture standards",
        detail:
          "We agree which insurance and referral fields must be completed before an appointment is saved.",
      },
      {
        title: "Booking and confirmation",
        detail:
          "Appointments are booked, reminders are followed up and unconfirmed visits are called according to your timeline.",
      },
      {
        title: "Front-end handoff",
        detail:
          "Visits needing eligibility checks or authorizations are routed to those queues with enough lead time to complete them.",
      },
      {
        title: "Gap filling",
        detail:
          "Cancellations are offered to waitlisted patients, and open capacity is reported to your office manager.",
      },
    ],
    benefits: [
      {
        title: "Fewer front-end denials",
        detail:
          "Capturing insurance and referral details at booking is designed to give verification and authorization staff time to act.",
      },
      {
        title: "Fuller provider calendars",
        detail:
          "Active waitlist and confirmation work aims to reduce empty slots from late cancellations and no-shows.",
      },
      {
        title: "Consistent booking rules",
        detail:
          "Written template rules can help visits land in the right slot length with the right provider.",
      },
    ],
    practiceTypes: [
      "primary-care",
      "pediatrics",
      "dermatology",
      "physical-therapy",
      "chiropractic",
      "behavioral-health",
      "general-dentistry",
      "orthodontics",
    ],
    faqs: [
      {
        q: "How does appointment scheduling affect billing?",
        a: "Scheduling is where insurance, referral and visit-type information is first recorded, so errors at booking often become billing problems later. A wrong payer, a missing referral or a visit booked without a required authorization can lead to denials. Collecting the right details at booking gives eligibility and authorization staff time to resolve issues before the visit.",
      },
      {
        q: "Do your schedulers use our scheduling system?",
        a: "Yes. Schedulers work directly in your existing scheduling or PM system using accounts your practice creates and controls. They follow your templates, visit types and booking rules, and every appointment is visible to your in-office staff in real time. We do not move scheduling into a separate calendar or platform.",
      },
      {
        q: "Can you help reduce no-shows?",
        a: "Scheduling support can help by following up on unconfirmed reminders, calling patients who have not responded and offering open slots to waitlisted patients when cancellations occur. Results depend on your patient population and policies. We also track no-show patterns by visit type and day so your team can decide whether template or policy changes make sense.",
      },
      {
        q: "What information should be collected when booking an appointment?",
        a: "At minimum, collect the patient's full legal name, date of birth, contact details, insurance plan and member ID, the reason for the visit and any referring provider. For specialties with referral or authorization requirements, note the payer and service so the right check can be started. Your practice decides which fields are mandatory before a booking is saved.",
      },
    ],
    relatedTools: ["prior-authorization-checklist", "practice-revenue-calculator", "provider-productivity-calculator"],
    relatedServices: [
      "patient-registration",
      "insurance-eligibility-verification",
      "prior-authorization",
      "virtual-medical-assistant",
    ],
    seoTitle: "Medical Appointment Scheduling Support",
    metaDescription:
      "Remote appointment scheduling support that books, confirms and reschedules visits by your rules and captures insurance and referral details at booking.",
    keywords: [
      "medical appointment scheduling",
      "patient scheduling services",
      "remote scheduling support",
      "appointment confirmation",
      "waitlist management",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Payment reconciliation                                           */
  /* ---------------------------------------------------------------- */
  {
    slug: "payment-reconciliation",
    name: "Payment Reconciliation",
    shortName: "Payment Reconciliation",
    category: "back-end",
    icon: "Scale",
    summary:
      "Matching what payers and patients paid to what reached your bank and what was posted, so every deposit is accounted for.",
    definition:
      "Payment reconciliation is the process of matching posted payments in a practice management system to remittance advice and to actual bank deposits. It confirms that every electronic funds transfer, check, card payment and lockbox deposit is posted to the correct claims and patient accounts, and it identifies missing, duplicate or unapplied payments for correction.",
    intro: [
      "Posting a payment and receiving the money are two different events. An ERA can arrive without a matching deposit, an EFT can land in the bank without an ERA, a payer can bundle several remittances into one transfer, and provider-level adjustments can reduce a deposit without being tied to any single claim. If nobody reconciles these, unapplied cash builds up and month-end numbers stop matching the bank.",
      "Our reconciliation work ties three records together: the bank deposit, the remittance (ERA or paper EOB) and the posting in your PM system. We match EFT trace numbers to 835 remittances, review provider-level adjustments, resolve unmatched items and track down missing remittances with payers or your clearinghouse.",
      "The output is a reconciliation report your bookkeeper or accountant can rely on, and a short list of open items with the action needed to clear each one.",
    ],
    scope: [
      "Match bank deposits to ERA and EOB totals using EFT trace and check numbers",
      "Confirm that each remittance has been fully posted in the PM system",
      "Review provider-level adjustments (PLB segment) such as recoupments, interest and offsets",
      "Identify and resolve unapplied, misapplied or duplicate postings",
      "Request missing ERAs or EOBs from payers and clearinghouses",
      "Reconcile patient card, cash and online portal payments to deposits",
      "Track virtual card payments and associated processing fees separately",
      "Produce a daily or monthly reconciliation report with open items",
    ],
    workflow: [
      {
        title: "Gather sources",
        detail:
          "We collect bank deposit detail, ERA and EOB files and PM posting reports for the same period.",
      },
      {
        title: "Match deposits to remittances",
        detail:
          "Each EFT or check is matched to its remittance using trace numbers, amounts and payer details.",
      },
      {
        title: "Match remittances to postings",
        detail:
          "Posted totals are compared to remittance totals to confirm nothing was skipped, duplicated or applied to the wrong account.",
      },
      {
        title: "Investigate exceptions",
        detail:
          "Unmatched deposits, missing remittances and unexplained adjustments are researched with payers, the bank or your clearinghouse.",
      },
      {
        title: "Correct and report",
        detail:
          "Corrections are made or routed for approval, and a reconciliation summary with remaining open items is delivered.",
      },
    ],
    benefits: [
      {
        title: "Books that match the bank",
        detail:
          "Regular reconciliation is designed to keep PM collections and bank deposits in agreement at month-end.",
      },
      {
        title: "Visibility into recoupments",
        detail:
          "Reviewing provider-level adjustments aims to surface offsets and takebacks that would otherwise go unnoticed.",
      },
      {
        title: "Less unapplied cash",
        detail:
          "Resolving unmatched items promptly can help keep patient and claim balances accurate.",
      },
      {
        title: "Earlier detection of missing payments",
        detail:
          "Remittances without deposits, and deposits without remittances, are flagged while they are still easy to trace.",
      },
    ],
    practiceTypes: [
      "multi-specialty",
      "orthopedics",
      "cardiology",
      "radiology",
      "ambulatory-surgery-centers",
      "home-health",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What is the difference between payment posting and payment reconciliation?",
        a: "Payment posting records payments and adjustments against claims and patient accounts in your PM system. Payment reconciliation checks that what was posted matches both the remittance and the money that actually reached your bank. Posting can be correct line by line while the overall picture is still off, for example when an EFT never arrived or a recoupment reduced a deposit.",
      },
      {
        q: "How do you match an EFT to an ERA?",
        a: "Electronic remittances carry a reassociation trace number in the TRN segment of the X12 835 file, and the same number travels with the EFT through the ACH network. Matching that trace number, along with the payer and amount, links the deposit to its remittance. When a payer bundles several remittances into one transfer, the totals are matched as a group.",
      },
      {
        q: "What is a provider-level adjustment on an ERA?",
        a: "A provider-level adjustment, reported in the PLB segment of the 835, changes the total payment without being tied to a single claim line. Common examples are recoupments of earlier overpayments, interest payments and offsets for amounts owed to the payer. Because they change the deposit total, they need to be reviewed and posted correctly for reconciliation to balance.",
      },
      {
        q: "How often should a practice reconcile payments?",
        a: "Many practices reconcile deposits daily or several times a week and complete a full reconciliation at month-end. Daily matching catches missing remittances and posting errors while they are easy to trace, and the month-end process confirms that PM collections agree with the bank statement before financial reports are finalized. Higher-volume practices generally benefit from more frequent matching.",
      },
      {
        q: "Do you need access to our bank account?",
        a: "Reconciliation needs deposit detail, not the ability to move money. Most practices provide view-only access or regular deposit reports exported by their bookkeeper. We never initiate transfers, change bank settings or handle banking credentials beyond read-only access your practice chooses to grant, and you control how deposit information is shared.",
      },
    ],
    relatedTools: ["era-explained", "payment-variance-calculator", "eob-explained"],
    relatedServices: ["payment-posting", "era-processing", "underpayment-identification", "accounts-receivable-management"],
    seoTitle: "Medical Payment Reconciliation Services",
    metaDescription:
      "Payment reconciliation that matches bank deposits, ERAs and PM postings, reviews provider-level adjustments and clears unapplied or missing payments.",
    keywords: [
      "medical payment reconciliation",
      "ERA EFT reconciliation",
      "deposit reconciliation",
      "unapplied payments",
      "835 reassociation",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Clearinghouse coordination                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: "clearinghouse-coordination",
    name: "Clearinghouse Coordination",
    shortName: "Clearinghouse Coordination",
    category: "mid-cycle",
    icon: "Network",
    summary:
      "Daily monitoring of clearinghouse reports, rejections and payer enrollments so claims and remittances keep flowing.",
    definition:
      "Clearinghouse coordination is the ongoing management of the electronic connection between a practice and its payers. It covers monitoring acknowledgment and rejection reports, correcting and resubmitting rejected claims, maintaining payer IDs, and completing EDI, ERA and EFT enrollments so claims reach payers and electronic remittances come back.",
    intro: [
      "A clearinghouse sits between your PM system and hundreds of payers. It checks claim format, translates data into the X12 837 standard, routes claims to the right payer and returns acknowledgment and status reports. When nobody watches those reports, rejected claims can sit unnoticed until a timely filing deadline passes.",
      "Our coordination work focuses on the daily reports and the setup behind them. We review file acknowledgments and claim-level rejections, fix the underlying data and resubmit, and keep payer ID and enrollment records current. When a payer moves to a new submitter ID or requires ERA enrollment before sending electronic remittances, we handle the paperwork and follow-up.",
      "We work inside your existing clearinghouse portal and PM system using accounts you control. We do not change vendors or contracts on your behalf.",
    ],
    scope: [
      "Review file-level acknowledgments (999) and claim acknowledgments (277CA) daily",
      "Correct rejected claims and resubmit them within payer filing limits",
      "Track claims accepted by the clearinghouse but not acknowledged by the payer",
      "Maintain payer ID lists and update records when payers change IDs or routing",
      "Complete EDI, ERA (835) and EFT enrollment requests with payers",
      "Monitor for missing or delayed ERA files and follow up",
      "Use real-time eligibility (270/271) and claim status (276/277) transactions where available",
      "Log recurring rejection reasons and the fixes that address them at the source",
    ],
    workflow: [
      {
        title: "Connection review",
        detail:
          "We map how claims move from your PM system through the clearinghouse to each payer, and which payers return ERAs electronically.",
      },
      {
        title: "Enrollment audit",
        detail:
          "Payer-by-payer EDI, ERA and EFT enrollment status is checked, and missing enrollments are listed for completion.",
      },
      {
        title: "Daily report monitoring",
        detail:
          "Acknowledgment and rejection reports are reviewed each business day so problems are caught early.",
      },
      {
        title: "Correct and resubmit",
        detail:
          "Rejected claims are fixed at the data level, such as subscriber ID, NPI or payer ID, and resubmitted.",
      },
      {
        title: "Root cause fixes",
        detail:
          "Repeated rejections are traced to setup issues in your PM system or registration workflow and corrected there.",
      },
    ],
    benefits: [
      {
        title: "Rejections caught early",
        detail:
          "Daily report review is designed to correct rejected claims well before timely filing limits.",
      },
      {
        title: "More electronic remittances",
        detail:
          "Completing ERA and EFT enrollments aims to reduce paper EOBs and manual posting.",
      },
      {
        title: "Fewer lost claims",
        detail:
          "Tracking claims from clearinghouse acceptance to payer acknowledgment can help find claims that never reached the payer.",
      },
      {
        title: "Cleaner setup",
        detail:
          "Fixing recurring rejections at the source can reduce the same errors appearing every week.",
      },
    ],
    practiceTypes: [
      "family-medicine",
      "internal-medicine",
      "physical-therapy",
      "behavioral-health",
      "urgent-care",
      "multi-specialty",
      "general-dentistry",
    ],
    faqs: [
      {
        q: "What is the difference between a rejection and a denial?",
        a: "A rejection means the claim failed a format or data check at the clearinghouse or payer front end and was never accepted into the payer's adjudication system. A denial means the payer accepted and processed the claim but decided not to pay all or part of it. Rejections are usually corrected and resubmitted, while denials typically need a corrected claim or an appeal.",
      },
      {
        q: "What are 999 and 277CA reports?",
        a: "Both are X12 acknowledgment transactions. A 999 confirms whether a submitted file was syntactically valid and accepted for processing. A 277CA is a claim acknowledgment that reports whether each individual claim was accepted or rejected, with a status code explaining why. Reviewing both shows whether claims actually entered the payer's system or need correction.",
      },
      {
        q: "Why are we still getting paper EOBs from some payers?",
        a: "Most payers require a separate ERA enrollment before they send electronic remittances, even when claims are already submitted electronically. Some also require EFT enrollment for electronic payments. If either enrollment is missing, expired or linked to an old clearinghouse, the payer may keep sending paper. Checking enrollment status payer by payer usually explains the gap.",
      },
      {
        q: "Will you switch our clearinghouse?",
        a: "No. We work within the clearinghouse your practice already uses, under accounts you control. If you decide to change clearinghouses for your own reasons, we can help with the transition tasks, such as payer enrollments and testing, but the choice of vendor and any contract decisions remain with your practice.",
      },
    ],
    relatedTools: ["claim-status-categories", "claim-rejection-rate-calculator", "first-pass-acceptance-rate-calculator", "era-explained"],
    relatedServices: ["electronic-claims-processing", "claims-submission", "claims-scrubbing", "era-processing"],
    seoTitle: "Clearinghouse Coordination and EDI Support",
    metaDescription:
      "Clearinghouse coordination covering daily 999 and 277CA review, rejection fixes, payer ID upkeep and ERA and EFT enrollment, inside your existing portal.",
    keywords: [
      "clearinghouse management",
      "claim rejections",
      "277CA report",
      "ERA enrollment",
      "EDI enrollment",
      "medical billing clearinghouse",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  EHR/EMR workflow support                                         */
  /* ---------------------------------------------------------------- */
  {
    slug: "ehr-workflow-support",
    name: "EHR/EMR Workflow Support",
    shortName: "EHR/EMR Workflow",
    category: "practice-support",
    icon: "MonitorSmartphone",
    summary:
      "Help connecting clinical documentation in your EHR to clean charges, from encounter closure to charge review queues.",
    definition:
      "EHR/EMR workflow support is administrative help with the points where clinical documentation turns into billing data, such as open encounters, unsigned notes, charge capture, diagnosis linkage and charge review queues. It is designed to move completed visits from the EHR into billable claims promptly and with the information billing needs.",
    intro: [
      "The handoff between the clinical record and the billing system is a common source of delay. Encounters stay open because a note is unsigned, charges are captured without a linked diagnosis, or order and referral details sit in the chart without reaching the claim. Each of these adds days of charge lag or creates a claim that will be denied.",
      "Our EHR workflow support team monitors the queues that sit between documentation and billing. We track open and unsigned encounters, send reminders through the channels your practice approves, review charges for missing data before they post and route clinical questions back to the right provider. We do not write or alter clinical documentation; providers remain responsible for their notes.",
      "We also help document how your EHR is configured for billing, such as charge templates, favorites lists and order sets, and suggest changes your administrator or vendor can make. All work happens in your existing PM/EHR system under accounts you control.",
    ],
    scope: [
      "Monitor open, unsigned and incomplete encounters and send provider reminders",
      "Review charge capture queues for missing diagnoses, modifiers or rendering provider data",
      "Route documentation questions to providers through your approved messaging channel",
      "Track charge lag from date of service to charge entry",
      "Reconcile scheduled visits to captured charges to find missed encounters",
      "Review charge templates and favorites lists for outdated or deleted codes",
      "Document the EHR-to-billing handoff in a written procedure",
      "Prepare configuration change requests for your EHR administrator or vendor",
    ],
    workflow: [
      {
        title: "Map the handoff",
        detail:
          "We trace how a visit moves from scheduling through documentation, charge capture and claim creation in your system.",
      },
      {
        title: "Identify stall points",
        detail:
          "Queues where encounters or charges wait longest are measured and listed by cause.",
      },
      {
        title: "Daily queue work",
        detail:
          "Open encounters, charge review items and documentation questions are worked each day under the procedure you approve.",
      },
      {
        title: "Visit-to-charge reconciliation",
        detail:
          "Completed appointments are compared to captured charges so missed encounters are found and routed.",
      },
      {
        title: "Configuration suggestions",
        detail:
          "Template and setup issues behind recurring problems are written up for your administrator or vendor to evaluate.",
      },
    ],
    benefits: [
      {
        title: "Shorter charge lag",
        detail:
          "Active queue monitoring is designed to move completed visits to billing sooner.",
      },
      {
        title: "Fewer missed charges",
        detail:
          "Comparing the schedule to captured charges aims to catch visits that were documented but never billed.",
      },
      {
        title: "Better billing data from the chart",
        detail:
          "Reviewing charges before posting can help claims leave with linked diagnoses and correct provider details.",
      },
    ],
    practiceTypes: [
      "primary-care",
      "internal-medicine",
      "cardiology",
      "neurology",
      "oncology",
      "behavioral-health",
      "multi-specialty",
    ],
    faqs: [
      {
        q: "What does EHR workflow support involve for billing?",
        a: "EHR workflow support for billing covers the steps between a completed visit and a billable claim: closing encounters, getting notes signed, reviewing captured charges for missing data and routing documentation questions to providers. The aim is to reduce the time visits spend waiting in EHR queues and to send claims with the information payers expect.",
      },
      {
        q: "Do you edit clinical notes in our EHR?",
        a: "No. Clinical documentation belongs to the treating provider, and we do not write, amend or sign clinical notes. Our role is administrative: monitoring queues, flagging missing information and routing questions to the provider through the channel your practice approves. Providers make any documentation changes themselves, following your amendment policies.",
      },
      {
        q: "Can you work in our EHR without changing its configuration?",
        a: "Yes. Most of the work is done in existing queues and reports with the user permissions your practice grants. When we find a configuration issue, such as an outdated charge template, we document it and send a recommendation to your EHR administrator or vendor support. Configuration changes are made by whoever your practice designates, not by us without approval.",
      },
      {
        q: "What is charge lag and why does it matter?",
        a: "Charge lag is the time between the date of service and the date a charge is entered for billing. A long charge lag delays claim submission and payment, and very old charges risk missing payer timely filing limits. Tracking it by provider and location shows where encounters are waiting, often on unsigned notes or incomplete charge capture.",
      },
    ],
    relatedTools: ["claim-turnaround-time-calculator", "revenue-leakage-estimator", "icd-10-code-search"],
    relatedServices: ["charge-entry", "medical-coding", "practice-management-support", "rcm-workflow-optimization"],
    seoTitle: "EHR/EMR Workflow Support for Billing",
    metaDescription:
      "EHR/EMR workflow support that monitors open encounters and charge review queues, routes documentation questions and helps move completed visits to billing.",
    keywords: [
      "EHR workflow support",
      "EMR billing workflow",
      "charge capture",
      "charge lag",
      "unsigned encounters",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Billing software migration                                       */
  /* ---------------------------------------------------------------- */
  {
    slug: "billing-software-migration",
    name: "Billing Software Migration Support",
    shortName: "Software Migration",
    category: "practice-support",
    icon: "ArrowRightLeft",
    summary:
      "Planning and hands-on help moving to a new billing system while working down AR left in the old one.",
    definition:
      "Billing software migration support is help with the billing side of moving from one practice management or billing system to another. It covers data mapping and validation, payer and clearinghouse enrollment updates, parallel testing, and working the accounts receivable that remains in the legacy system so revenue is not lost during the transition.",
    intro: [
      "Changing billing systems is one of the riskier projects a practice can take on. Claims stop while the new system is set up, ERA enrollments tied to the old submitter can break, and open balances in the legacy system are easy to forget once staff move to the new screens. Collections often dip during the transition simply because attention is split.",
      "We support the revenue cycle side of the move. Before go-live, we help map patients, insurance plans, providers, fee schedules and payer records to the new system, and we check sample records after conversion. Around go-live, we coordinate clearinghouse and ERA enrollment updates and test claims. After go-live, we work the legacy AR run-out until old balances are resolved.",
      "Your practice chooses the software and manages the vendor relationship. We work in both the old and new systems under accounts you control, and we do not represent or recommend any particular vendor.",
    ],
    scope: [
      "Inventory data to be converted: patients, insurance, providers, payers, fee schedules and balances",
      "Help build field mapping between the legacy and new systems",
      "Validate converted records against source samples and report discrepancies",
      "Update clearinghouse connections and payer EDI, ERA and EFT enrollments",
      "Coordinate test claims and confirm acknowledgments before full cutover",
      "Work legacy AR run-out: follow-up, posting and appeals in the old system",
      "Decide with you how open balances are handled: run out, convert or a mix",
      "Archive reporting from the legacy system for future reference",
      "Track post-go-live issues and claim volume against pre-migration levels",
    ],
    workflow: [
      {
        title: "Readiness assessment",
        detail:
          "We review the legacy data, open AR, payer list and enrollment status to identify risks before the migration date is set.",
      },
      {
        title: "Mapping and conversion checks",
        detail:
          "Field mapping is reviewed with your vendor's conversion team, and converted samples are checked against the source.",
      },
      {
        title: "Enrollment updates",
        detail:
          "Clearinghouse and payer enrollments are updated so claims and ERAs route correctly from the new system.",
      },
      {
        title: "Parallel testing",
        detail:
          "Test claims are sent and tracked through acknowledgment before the old system stops creating new claims.",
      },
      {
        title: "Go-live support",
        detail:
          "Rejections, missing ERAs and setup issues are monitored daily during the first weeks on the new system.",
      },
      {
        title: "Legacy run-out",
        detail:
          "Open claims in the old system are followed up, posted and resolved until legacy AR is closed out.",
      },
    ],
    benefits: [
      {
        title: "Protected legacy AR",
        detail:
          "Dedicated run-out work is designed to keep old balances from being forgotten once staff move to the new system.",
      },
      {
        title: "Fewer go-live surprises",
        detail:
          "Testing claims and enrollments before cutover aims to catch routing problems while the old system still works.",
      },
      {
        title: "Validated data",
        detail:
          "Checking converted records against the source can help prevent bad demographics and payer data from carrying forward.",
      },
      {
        title: "Steadier cash flow",
        detail:
          "Close monitoring in the first weeks can help limit the payment gap that often follows a system change.",
      },
    ],
    practiceTypes: [
      "multi-specialty",
      "family-medicine",
      "orthopedics",
      "behavioral-health",
      "physical-therapy",
      "general-dentistry",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "Should we convert old AR into the new billing system or run it out?",
        a: "Many practices run out legacy AR in the old system rather than converting open balances, because converted claims lose their original transaction history and can be hard to follow up. Others convert patient balances but run out insurance AR. The right choice depends on the volume of open claims, how long you can keep the old system licensed and what the new system can import.",
      },
      {
        q: "Why did our ERAs stop after we switched systems?",
        a: "ERA enrollments are usually tied to a specific clearinghouse or submitter ID. When the billing system or clearinghouse changes, payers may keep sending remittances to the old destination until a new ERA enrollment is processed. Some payers allow only one ERA destination per provider or tax ID, so updating enrollments before go-live is important.",
      },
      {
        q: "Which data should be validated after conversion?",
        a: "Check patient demographics, insurance plans and member IDs, provider and location identifiers, payer IDs and addresses, fee schedules and any converted balances. Compare a sample of converted records to the source system field by field. Errors in payer records and provider identifiers are especially important because they cause rejections on every affected claim.",
      },
      {
        q: "Do you recommend a specific billing software?",
        a: "No. Your practice chooses its software and manages the vendor relationship. Our role is to support the billing side of the migration, including mapping review, enrollment updates, testing and legacy AR run-out, in whatever systems you select. We can share general questions to ask during evaluation, but we do not promote or partner with any vendor.",
      },
      {
        q: "How long should we keep access to the old billing system?",
        a: "Keep access at least until legacy AR is resolved and you have exported the reports you may need later. Payers can request refunds or records long after payment, so many practices keep read-only access or a full archive for an extended period. Check your record retention obligations and contract terms with your legal and compliance advisors.",
      },
    ],
    relatedTools: ["ar-aging-calculator", "days-in-ar-calculator", "monthly-revenue-forecast-calculator"],
    relatedServices: [
      "clearinghouse-coordination",
      "aging-ar-follow-up",
      "practice-management-support",
      "accounts-receivable-management",
    ],
    seoTitle: "Billing Software Migration Support",
    metaDescription:
      "Billing software migration support: data mapping checks, payer and ERA enrollment updates, test claims and legacy AR run-out to protect revenue in transition.",
    keywords: [
      "billing software migration",
      "practice management conversion",
      "legacy AR run-out",
      "EHR conversion billing",
      "billing system transition",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  RCM workflow optimization                                        */
  /* ---------------------------------------------------------------- */
  {
    slug: "rcm-workflow-optimization",
    name: "RCM Workflow Optimization",
    shortName: "Workflow Optimization",
    category: "analytics",
    icon: "Workflow",
    summary:
      "A structured look at how billing work moves through your team, with practical changes to handoffs, queues and roles.",
    definition:
      "RCM workflow optimization is the review and redesign of how revenue cycle tasks move between people, systems and queues, from scheduling through final payment. It maps current processes, measures where work waits or repeats, and recommends specific changes to handoffs, task ownership, work queue rules and written procedures to reduce delays and rework.",
    intro: [
      "Revenue cycle problems often look like performance issues but turn out to be workflow issues. A denial category keeps recurring because nobody owns the upstream fix. AR follow-up stalls because the work queue is sorted by date rather than by dollar value or filing deadline. Two people check the same eligibility while a third task goes undone.",
      "This service maps how work actually flows in your practice, not how it is supposed to flow. We interview staff, observe queues and measure volumes and wait times using your own reports. The result is a prioritized list of changes, each with an owner, an effort estimate and a way to tell whether it worked.",
      "We focus on changes your team can make with the systems you already have: queue rules, task assignment, checklists, handoff points and procedures. Where a change would need new software or staffing decisions, we describe the tradeoffs so leadership can decide.",
    ],
    scope: [
      "Map the current revenue cycle from scheduling to final payment, including every handoff",
      "Interview front desk, billing, coding and management staff about bottlenecks",
      "Measure queue volumes, wait times and rework rates from system reports",
      "Identify duplicated tasks and tasks with no clear owner",
      "Review work queue sorting and prioritization rules",
      "Link recurring denial categories to the upstream step that causes them",
      "Write or update standard operating procedures and checklists",
      "Deliver a prioritized change plan with owners and success measures",
      "Check results after changes are in place and adjust the plan",
    ],
    workflow: [
      {
        title: "Kickoff and goals",
        detail:
          "We agree with leadership on the problems to solve, such as charge lag, denial volume or follow-up backlog, and who will be involved.",
      },
      {
        title: "Current-state mapping",
        detail:
          "Staff interviews, queue observation and report data are used to document how work really moves today.",
      },
      {
        title: "Bottleneck analysis",
        detail:
          "Wait points, rework loops and ownership gaps are measured and ranked by their effect on cash flow and staff time.",
      },
      {
        title: "Change plan",
        detail:
          "Specific changes are proposed with owners, effort and measures, and reviewed with the people who will carry them out.",
      },
      {
        title: "Implementation support",
        detail:
          "We help update procedures, queue rules and checklists and train staff on the new steps.",
      },
      {
        title: "Results check",
        detail:
          "After a set period, the agreed measures are reviewed and the plan is adjusted for anything that did not work as intended.",
      },
    ],
    benefits: [
      {
        title: "Less rework",
        detail:
          "Fixing problems at the step that causes them is designed to reduce repeat corrections and resubmissions.",
      },
      {
        title: "Clear ownership",
        detail:
          "Assigning every task and handoff an owner aims to stop work from falling between roles.",
      },
      {
        title: "Better use of staff time",
        detail:
          "Removing duplicated steps and sorting queues by priority can help staff focus on the work with the most impact.",
      },
      {
        title: "Written procedures",
        detail:
          "Documented workflows can make training easier and reduce dependence on individual knowledge.",
      },
    ],
    practiceTypes: [
      "multi-specialty",
      "primary-care",
      "orthopedics",
      "urgent-care",
      "ambulatory-surgery-centers",
      "mental-health-clinics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What is RCM workflow optimization?",
        a: "RCM workflow optimization is the process of mapping how revenue cycle work moves through your practice, finding where it waits, repeats or has no owner, and changing the steps to remove those problems. It looks at people, handoffs and queue rules as well as software. The output is a prioritized set of practical changes with owners and measures.",
      },
      {
        q: "How is workflow optimization different from a revenue cycle audit?",
        a: "A revenue cycle audit measures results and checks accuracy, such as whether claims were coded, posted and followed up correctly. Workflow optimization looks at the process behind those results: who does what, in what order and with what handoffs. The two work well together, since audit findings often point to the workflow steps that need redesign.",
      },
      {
        q: "Will workflow changes require new software?",
        a: "Usually not. Most improvements come from changing queue rules, task assignment, checklists and the timing of handoffs inside your existing PM/EHR system. When a change would require new software or additional staff, we describe the options and tradeoffs so your leadership can make that decision, rather than assuming a purchase is needed.",
      },
      {
        q: "How do we know whether a workflow change worked?",
        a: "Each change in the plan is paired with a measure defined before the change is made, such as charge lag, rejection volume, follow-up backlog or time spent per task. After an agreed period, the measure is compared to its baseline. Changes that do not show the intended effect are revisited instead of being left in place by default.",
      },
      {
        q: "How involved does our staff need to be?",
        a: "Staff involvement is essential, because the people doing the work know where it breaks down. Expect short interviews with each role during mapping, a review session for the change plan and some time for training on new procedures. We schedule these around patient care and keep meetings focused so day-to-day work can continue.",
      },
    ],
    relatedTools: ["rcm-performance-scorecard", "cost-per-claim-calculator", "revenue-leakage-estimator"],
    relatedServices: ["revenue-cycle-audit", "rcm-analytics-reporting", "ehr-workflow-support", "denial-management"],
    seoTitle: "RCM Workflow Optimization for Practices",
    metaDescription:
      "RCM workflow optimization that maps how billing work moves through your team, finds bottlenecks and ownership gaps, and builds a practical change plan.",
    keywords: [
      "RCM workflow optimization",
      "revenue cycle process improvement",
      "billing workflow redesign",
      "medical billing SOPs",
      "work queue management",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Patient financial communication                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: "patient-financial-communication",
    name: "Patient Financial Communication Support",
    shortName: "Patient Financial Comms",
    category: "front-end",
    icon: "MessageSquare",
    summary:
      "Clear estimates, statements, scripts and billing answers that help patients understand what they owe and why.",
    definition:
      "Patient financial communication support helps a practice explain costs and balances to patients clearly and consistently. It covers pre-visit cost estimates, good faith estimates for uninsured and self-pay patients, statement wording, payment plan discussions and answers to billing questions, so patients understand their responsibility before and after care.",
    intro: [
      "Patients now carry a larger share of the cost of care through deductibles, coinsurance and high-deductible plans. When the first time they hear about their responsibility is a statement weeks after the visit, confusion and complaints follow, and balances are harder to collect.",
      "Our patient financial communication support focuses on what patients are told, when and how. We help prepare cost estimates using verified benefits, support good faith estimate requirements for uninsured and self-pay patients under the No Surprises Act, review statement language for clarity and answer patient billing calls using scripts your practice approves.",
      "The tone is respectful and factual. We explain charges, insurance processing and payment options without pressure, and we route disputes, hardship requests and financial assistance applications according to your policies.",
    ],
    scope: [
      "Prepare pre-visit patient cost estimates from verified benefits and your fee schedule",
      "Support good faith estimates for uninsured and self-pay patients",
      "Review statement and letter wording for clarity and plain language",
      "Write call scripts for common billing questions, balances and payment plans",
      "Answer patient billing calls and portal messages under your approved scripts",
      "Explain EOBs, deductibles, coinsurance and adjustments to patients",
      "Set up payment plans within the limits your practice defines",
      "Route disputes, hardship requests and financial assistance applications to your staff",
      "Track common patient questions to improve statements and front-desk scripts",
    ],
    workflow: [
      {
        title: "Policy review",
        detail:
          "We review your financial policy, payment plan rules, financial assistance policy and current statement design.",
      },
      {
        title: "Message design",
        detail:
          "Estimate templates, statement language and call scripts are drafted or revised for your approval.",
      },
      {
        title: "Pre-visit estimates",
        detail:
          "Estimates are prepared from verified benefits and shared with patients before scheduled services according to your timeline.",
      },
      {
        title: "Patient inquiries",
        detail:
          "Billing calls and messages are answered from your systems, with each interaction noted on the patient account.",
      },
      {
        title: "Feedback loop",
        detail:
          "Common questions and complaints are summarized so statements, scripts and estimates can be refined.",
      },
    ],
    benefits: [
      {
        title: "Fewer surprised patients",
        detail:
          "Sharing estimates before care is designed to set expectations early, when patients can plan for the cost.",
      },
      {
        title: "Clearer statements",
        detail:
          "Plain-language statements aim to reduce confused calls and requests to explain the same balance repeatedly.",
      },
      {
        title: "Consistent answers",
        detail:
          "Approved scripts can help every patient receive the same accurate explanation of policies and options.",
      },
      {
        title: "Support for estimate requirements",
        detail:
          "Structured good faith estimate steps can help your practice meet federal estimate requirements for uninsured and self-pay patients.",
      },
    ],
    practiceTypes: [
      "dermatology",
      "orthopedics",
      "physical-therapy",
      "behavioral-health",
      "obgyn",
      "general-dentistry",
      "orthodontics",
      "oral-surgery",
    ],
    faqs: [
      {
        q: "What is a good faith estimate?",
        a: "A good faith estimate is a written estimate of expected charges that providers must give uninsured and self-pay patients for scheduled services, or on request, under the federal No Surprises Act. It lists the expected items and services and their costs. If the final bill is substantially higher than the estimate, the patient may be able to use the federal patient-provider dispute resolution process.",
      },
      {
        q: "How accurate can a patient cost estimate be for insured patients?",
        a: "An estimate for an insured patient is only as accurate as the benefit information and the expected services. It uses verified deductible, coinsurance and copay details plus your contracted or expected allowed amounts. Final responsibility can change if the services performed differ, other claims process first or the payer adjudicates differently, so estimates should state clearly that the final amount may differ.",
      },
      {
        q: "What should a patient statement include?",
        a: "A clear statement shows the date of service, provider, charges, what insurance paid, adjustments, what the patient owes and the due date. It should explain how to pay and who to call with questions in plain language. Avoiding unexplained abbreviations and showing insurance activity line by line typically reduces confused calls about the balance.",
      },
      {
        q: "Can you set up payment plans with patients?",
        a: "Yes, within the rules your practice sets. Your financial policy defines who qualifies, minimum payments and maximum terms, and we apply those rules consistently when patients ask. Requests outside the policy, such as hardship discounts or financial assistance, are routed to your designated staff for a decision rather than approved by us.",
      },
      {
        q: "How do you handle patients who dispute a bill?",
        a: "We listen, document the concern and review the account to explain how the balance was calculated, including how insurance processed the claim. If the dispute involves a possible billing error, a payer issue or a request for review, it is routed to your staff under your policy. Patients are told what will happen next and when to expect a response.",
      },
    ],
    relatedTools: ["patient-balance-calculator", "eob-explained", "medical-billing-glossary"],
    relatedServices: ["patient-billing", "patient-collections", "benefits-verification", "out-of-network-billing"],
    seoTitle: "Patient Financial Communication Support",
    metaDescription:
      "Patient financial communication support: cost estimates, good faith estimates, plain-language statements and billing call scripts that patients can follow.",
    keywords: [
      "patient financial communication",
      "patient cost estimates",
      "good faith estimate",
      "patient statements",
      "patient billing questions",
      "payment plans",
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Out-of-network billing                                           */
  /* ---------------------------------------------------------------- */
  {
    slug: "out-of-network-billing",
    name: "Out-of-Network Billing Support",
    shortName: "Out-of-Network Billing",
    category: "back-end",
    icon: "Signpost",
    summary:
      "Out-of-network claim handling that accounts for No Surprises Act protections, open negotiation and federal IDR timelines.",
    definition:
      "Out-of-network billing support is help with claims for services a provider delivers without a contract with the patient's health plan. It covers benefit checks, claim submission, payment review, patient balance rules under the No Surprises Act and state laws, and preparation for open negotiation and the federal Independent Dispute Resolution process when payment is disputed.",
    intro: [
      "Billing out of network has become more structured since the federal No Surprises Act took effect on January 1, 2022. For emergency services, non-emergency services from out-of-network providers at in-network facilities and air ambulance services, protected patients generally owe only their in-network cost-sharing, and payment disputes are resolved between the provider and the plan rather than through a balance bill. Some states have their own surprise billing laws that apply to certain plans.",
      "Our support starts by sorting each out-of-network claim into the right track: protected under federal or state law, eligible for balance billing with valid notice and consent where the law permits it, or a standard out-of-network claim billed to the patient's out-of-network benefits. Each track has different rules for what the patient can be billed and what happens if the plan's initial payment seems low.",
      "When a payment is disputed, we help organize the 30-business-day open negotiation period and prepare the information your practice needs to decide whether to initiate the federal IDR process. Decisions about disputes and legal positions remain with your practice and its advisors; we provide billing operations support, not legal advice.",
    ],
    scope: [
      "Check out-of-network benefits, deductibles and coinsurance before scheduled services",
      "Identify whether a claim falls under No Surprises Act protections or a state surprise billing law",
      "Track notice and consent documents where the law permits them for eligible non-emergency services",
      "Submit out-of-network claims and monitor initial payment or denial notices",
      "Compare initial payments to your charges and any available benchmark data",
      "Organize open negotiation notices, dates and correspondence",
      "Prepare claim data and documentation your practice needs to decide on federal IDR",
      "Apply correct patient balance rules so protected patients are billed only in-network cost-sharing",
      "Prepare good faith estimates for uninsured and self-pay patients when required",
    ],
    workflow: [
      {
        title: "Network status check",
        detail:
          "Before or at the visit, the patient's plan and your network status are confirmed, along with out-of-network benefits where applicable.",
      },
      {
        title: "Protection screening",
        detail:
          "Each claim is reviewed to determine whether federal or state surprise billing protections apply, based on service type, setting and plan.",
      },
      {
        title: "Claim submission",
        detail:
          "The claim is submitted to the plan, and the initial payment or notice of denial is tracked against the applicable timelines.",
      },
      {
        title: "Payment review",
        detail:
          "Payments on protected claims are reviewed and those your practice wants to contest are flagged for open negotiation.",
      },
      {
        title: "Open negotiation",
        detail:
          "Notices and correspondence are organized during the 30-business-day negotiation period, with key dates tracked.",
      },
      {
        title: "IDR preparation",
        detail:
          "If negotiation does not resolve the dispute, we assemble the claim information your practice needs to decide whether to initiate federal IDR within its deadline.",
      },
      {
        title: "Patient billing",
        detail:
          "Patient statements reflect the correct cost-sharing for the claim's track, and balance billing is applied only where permitted.",
      },
    ],
    benefits: [
      {
        title: "Correct patient billing",
        detail:
          "Screening each claim for protections is designed to keep protected patients from receiving bills the law does not allow.",
      },
      {
        title: "Tracked deadlines",
        detail:
          "Organizing open negotiation and IDR dates aims to keep your practice from losing dispute rights through missed timelines.",
      },
      {
        title: "Organized dispute files",
        detail:
          "Assembling claim data and correspondence in one place can help your practice evaluate disputes quickly.",
      },
      {
        title: "Clearer patient expectations",
        detail:
          "Checking out-of-network benefits before care can help patients understand their likely costs in advance.",
      },
    ],
    practiceTypes: [
      "radiology",
      "ambulatory-surgery-centers",
      "behavioral-health",
      "mental-health-clinics",
      "orthopedics",
      "pain-management",
      "urgent-care",
      "oral-surgery",
    ],
    faqs: [
      {
        q: "What does the No Surprises Act cover?",
        a: "The No Surprises Act, effective January 1, 2022, protects patients in most private health plans from surprise out-of-network bills for emergency services, for certain non-emergency services from out-of-network providers at in-network facilities and for air ambulance services. Protected patients generally owe only in-network cost-sharing. It also requires good faith estimates for uninsured and self-pay patients. Ground ambulance services are not covered by these balance billing protections.",
      },
      {
        q: "What is the federal Independent Dispute Resolution process?",
        a: "Federal IDR is a process for resolving payment disputes between out-of-network providers and health plans on claims covered by the No Surprises Act. After a 30-business-day open negotiation period fails, either party can initiate IDR within a short deadline. A certified IDR entity reviews both parties' payment offers and selects one of them. Administrative and entity fees apply.",
      },
      {
        q: "Can we balance bill a patient for out-of-network care?",
        a: "It depends on the service, setting, plan and state. Balance billing is generally prohibited for emergency services and for most non-emergency services at in-network facilities covered by the No Surprises Act. For certain non-emergency services, a valid notice and consent signed in advance may allow it, but ancillary services such as anesthesiology, radiology and pathology cannot use that exception. State laws may add further limits.",
      },
      {
        q: "Do state surprise billing laws still apply?",
        a: "Yes, in some cases. Where a state has a specified state law that applies to a particular plan and service, that state process may determine the out-of-network payment instead of the federal process. Self-funded employer plans are generally governed by federal rules, though some states allow those plans to opt into state processes. Plan type matters, so each claim needs to be screened.",
      },
      {
        q: "Do you represent our practice in IDR disputes?",
        a: "No. We provide billing operations support: tracking notices and deadlines, organizing claim data and preparing the documentation your practice needs. Decisions about whether to dispute a payment, what offer to submit and any legal positions belong to your practice and its legal or compliance advisors. Some practices also work with specialized IDR firms, and we can coordinate information with them.",
      },
    ],
    relatedTools: ["payment-variance-calculator", "underpayment-estimator", "payer-mix-calculator"],
    relatedServices: [
      "underpayment-identification",
      "patient-financial-communication",
      "benefits-verification",
      "payer-contracting",
      "denial-appeals",
    ],
    seoTitle: "Out-of-Network Billing and No Surprises Act Support",
    metaDescription:
      "Out-of-network billing support that screens claims for No Surprises Act protections, tracks negotiation and IDR deadlines and sets correct patient balances.",
    keywords: [
      "out-of-network billing",
      "No Surprises Act billing",
      "independent dispute resolution",
      "IDR process",
      "balance billing rules",
      "surprise billing",
    ],
  },
];
