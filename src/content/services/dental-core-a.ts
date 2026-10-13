import type { Service } from '../types';

/**
 * Dental-only refocus (2026-10-13), core pages part A: the two overview pages
 * (dental-billing, revenue-cycle-management) and three of the eight core
 * services (verification, claims, denials). Same slugs as before, rewritten
 * for dental practices only. See docs/DENTAL-WRITING.md.
 */

const CORE_SLUGS = [
  "dental-insurance-verification",
  "dental-claims-processing",
  "denial-management",
  "payment-posting",
  "dental-accounts-receivable",
  "patient-billing",
  "dental-credentialing",
  "rcm-analytics-reporting",
];

const others = (slug: string) => [...CORE_SLUGS.filter((s) => s !== slug), "dental-billing", "revenue-cycle-management"];

const ALL_DENTAL_SPECIALTIES = [
  "general-dentistry",
  "orthodontics",
  "endodontics",
  "periodontics",
  "oral-surgery",
  "pediatric-dentistry",
  "prosthodontics",
  "dental-group-practices",
];

export const dentalCoreA: Service[] = [
  /* ------------------------------------------------------------------ */
  /*  Overview: Outsourced Dental Billing Services                       */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-billing",
    name: "Outsourced Dental Billing Services",
    shortName: "Dental Billing",
    category: "end-to-end",
    icon: "Smile",
    summary:
      "The billing part of the dental revenue cycle we manage: benefits checks, CDT-coded claims, EOB posting, denials and A/R follow-up in your software.",
    definition:
      "Outsourced dental billing services hand your practice's insurance and patient billing work to an outside team. That team verifies dental benefits, submits CDT-coded claims on the ADA claim form or 837D with the right attachments, posts EOBs and ERAs, appeals denials, follows up on unpaid claims and keeps patient balances accurate. At Texas Solutions RCM, dental billing is one part of the dental revenue cycle management we provide.",
    intro: [
      "Dental billing is the process of getting paid for the dentistry your practice delivers, first by the patient's dental plan and then by the patient. Outsourced dental billing services move the insurance side of that work to an outside team that works on dental claims all day. That covers checking benefits before patients arrive, sending CDT-coded claims with the attachments carriers expect, posting EOBs and ERAs, working denials, following up on aging claims and keeping patient balances accurate. Texas Solutions RCM is a dental revenue cycle management (dental RCM) company. We handle dental billing as one part of the full revenue cycle we manage for dental practices and DSOs in all 50 states, using a remote team that logs in to your own practice management software instead of moving your data to a separate platform.",
      "Dental billing sits in the middle of the dental revenue cycle. Before the claim come provider credentialing, so each dentist is in network, and insurance verification, so the estimate at the chair reflects the patient's real benefits. After the claim come denials and appeals, insurance A/R follow-up, patient balances and reporting on how the whole cycle is performing. We manage those steps together, because most billing problems start somewhere else in the cycle. If you want the full picture rather than the billing step alone, our Dental Revenue Cycle Management Services page, linked under Other dental RCM services below, describes the complete scope. This page explains the billing part in detail for offices that mainly need help with claims and payments.",
      "Dental insurance billing has its own rules, and most of them affect what the practice is paid. Plans carry annual maximums, deductibles, coinsurance that changes by category, frequency limits on exams, cleanings, radiographs and crowns, waiting periods for basic and major services, missing tooth clauses and alternate benefit provisions that downgrade a posterior composite to an amalgam allowance. A claim that ignores one of those rules is paid at a lower rate, pended for more information or denied, and the difference often shows up on a patient statement weeks after the visit.",
      "Many offices handle billing with the same people who answer phones, check patients in, present treatment plans and collect copays. That works until the schedule gets busy, a key team member goes on leave or the one person who knows how a carrier handles perio maintenance moves on. Unsent claims pile up, EOBs wait to be posted and the 90+ day column of the aging report grows quietly. Dental billing outsourcing gives that work a dedicated owner with a set daily and weekly routine.",
      "When an office decides to outsource dental billing, the next step is usually comparing dental billing companies. Dental insurance billing companies and dental billing outsourcing companies vary in what they cover, whose software they use and how openly they report on the work. With dental insurance billing outsourcing, the useful questions are practical ones: who owns each task, where notes are kept and how quickly problems reach your office. Texas Solutions RCM approaches outsourcing dental billing as one part of dental revenue cycle management, so the team sending your claims can also see the verification, credentialing and patient balance steps that affect whether those claims are paid.",
      "Our team works inside the software you already use, whether that is Open Dental, Dentrix or Eaglesoft, along with your clearinghouse and carrier portals. As a remote dental billing team, we do not need desks in your office. If you are looking for a remote dental billing specialist, our remote team works the same way: each person has an individual login you control, every action is noted in the patient ledger or claim notes, and your staff can see the same information we see. Many dental billing solutions are software products; ours is a team of people working inside the software you already have. We sign a Business Associate Agreement before anyone on our team accesses patient data, and access can be removed at any time.",
      "The service is built around the eight core services on this page: insurance verification and eligibility, dental claims management, denial management and appeals, payment posting, accounts receivable management, patient billing and collections support, dental credentialing and provider enrollment, and RCM reporting. Because one team handles all of them, a problem found at one step can be traced to where it started. A frequency denial on an EOB points back to verification, an underpayment caught during posting leads to a fee schedule check, and a claim stuck because a new associate is not yet in network becomes a credentialing task.",
      "We work with solo general dentists, specialty offices in orthodontics, endodontics, periodontics, oral surgery, pediatric dentistry and prosthodontics, and group practices or DSOs that need consistent billing across several locations. The scope does not have to be all or nothing. Some practices keep verification at the front desk and hand us claims, posting and follow-up. Others start with a one-time cleanup of old insurance A/R and then move to ongoing billing once the backlog is under control.",
      "Getting started begins with a free consultation. We look at your current aging report, unsent and unpaid claims, denial patterns and how work is split between your staff today, then agree on the scope, the routine and the reports you will receive. After the Business Associate Agreement is signed and access is set up, work starts on an agreed schedule. The goal is a billing process that is documented, predictable and visible to you, with clear reporting on where money is moving and where it is stuck.",
    ],
    scope: [
      "Dental eligibility and benefits breakdowns before scheduled appointments, entered in your PMS",
      "Daily claim creation with CDT codes, tooth numbers, surfaces and quadrants checked against clinical notes",
      "Attachments and narratives: radiographs, periodontal charts, intraoral photos and dentist-written narratives",
      "Electronic 837D submission through your clearinghouse, with paper ADA claim forms only when a carrier requires them",
      "Predeterminations for crowns, bridges, implants, dentures and periodontal therapy, tracked until the carrier responds",
      "Secondary claims filed with primary EOB details under the plan's coordination of benefits rules",
      "EOB and ERA posting, including contractual write-offs, downgrades and patient portions",
      "Denial review, corrected claims, appeals and requests for missing documentation",
      "Insurance A/R follow-up by carrier and age through portals and payer calls",
      "Patient balance review, statement processing support and monthly revenue reporting",
    ],
    included: [
      {
        title: "Insurance Verification & Eligibility",
        detail:
          "We confirm active coverage and build a full benefits breakdown before the appointment: deductibles, annual and remaining maximums, coinsurance by category, frequencies, history, waiting periods and downgrades. The results are entered in your PMS so treatment estimates calculate from current plan data. Problems such as inactive coverage, a wrong assigned DHMO office or a used-up maximum are flagged to your front desk before the patient arrives.",
      },
      {
        title: "Dental Claims Management",
        detail:
          "Completed procedures are reviewed each day and turned into claims with correct CDT codes, tooth and surface data and the attachments carriers usually request. Claims are submitted through your clearinghouse, rejections are corrected and resent, and claim status is tracked until the carrier responds. Secondary claims and predeterminations for major treatment are handled in the same daily routine.",
      },
      {
        title: "Denial Management & Appeals",
        detail:
          "Every denial is read, categorized by reason and worked before the carrier's deadline through a corrected claim, a request for reconsideration or a written appeal. Denials are also tagged by root cause so recurring problems can be fixed at the step that created them. Appeals are built from the dentist's own documentation, radiographs and charting, never from added clinical detail.",
      },
      {
        title: "Payment Posting",
        detail:
          "Insurance payments from EOBs and ERAs and patient payments are posted to the correct procedures, with contractual adjustments and patient portions recorded accurately. Deposits are reconciled to posted payments, and underpayments or unexpected adjustments are flagged for follow-up. Accurate posting is what keeps patient balances and your A/R reports trustworthy.",
      },
      {
        title: "Accounts Receivable (A/R) Management",
        detail:
          "Unpaid insurance claims are worked by age and dollar value across the 30, 60 and 90+ day buckets. We check status through carrier portals and phone calls, resolve what is holding each claim and run cleanup projects for older backlogs. Each call or portal check is noted on the claim so your team can see exactly where it stands.",
      },
      {
        title: "Patient Billing & Collections Support",
        detail:
          "Patient balances are reviewed for accuracy before statements go out, so patients are billed only for amounts that are truly theirs. We support statement processing, payment allocation and follow-up on outstanding balances in coordination with your front office. Your financial policy decides payment plans, write-offs and when an account moves further.",
      },
      {
        title: "Dental Credentialing & Provider Enrollment",
        detail:
          "We prepare and track applications for dentists joining dental PPO and Medicaid networks, keep provider data current and handle re-credentialing. We also assist with EFT and ERA enrollment so payments arrive electronically and post faster. Provider information updates, such as a new location or tax ID, are sent to each network you participate with.",
      },
      {
        title: "Dental RCM Reporting & Revenue Analysis",
        detail:
          "Monthly reports cover A/R aging, claim status, denial trends, collections and adjustments, built from your own system data. We review the numbers with you and explain what changed, why it changed and what we recommend next. Group practices and DSOs can see the same reports by location and by provider.",
      },
    ],
    workflow: [
      {
        title: "Free consultation and review",
        detail:
          "We talk through your practice, software, carrier mix and current billing setup, and review your aging, unsent claims and denial reports to see where work and money are stuck.",
      },
      {
        title: "Scope and agreement",
        detail:
          "Together we decide which of the eight services we handle and which stay in house, agree on daily and weekly routines, and sign a Business Associate Agreement.",
      },
      {
        title: "Access and setup",
        detail:
          "Your office creates individual user accounts in your PMS, clearinghouse and carrier portals. We document your fee schedules, note conventions, write-off approval rules and who to contact for clinical questions.",
      },
      {
        title: "Backlog triage",
        detail:
          "Unsent claims go out first, unposted EOBs are posted and open denials are sorted by deadline, so the current state of your accounts is accurate before ongoing work begins.",
      },
      {
        title: "Daily and weekly routine",
        detail:
          "Verification runs ahead of the schedule, claims go out daily, payments are posted as they arrive, and denials and aging claims are worked on a set cadence.",
      },
      {
        title: "Feedback to your team",
        detail:
          "When a problem starts in the office, such as a missing x-ray or a plan entered under the wrong employer, we note it and share it with your team so it can be fixed at the source.",
      },
      {
        title: "Monthly reporting and review",
        detail:
          "You receive monthly reports on aging, claims, denials, collections and adjustments, and we review them with you to agree on priorities for the next month.",
      },
    ],
    benefits: [
      {
        title: "A dedicated owner for billing",
        detail:
          "A team focused on dental insurance work is designed to keep claims, posting and follow-up moving even when your office is busy or short-staffed.",
      },
      {
        title: "More accurate patient estimates",
        detail:
          "Verifying frequencies, maximums, waiting periods and downgrades before treatment aims to bring the estimate at the chair closer to what the EOB shows.",
      },
      {
        title: "Fewer avoidable denials",
        detail:
          "Checking codes, tooth data and attachments before submission, and tracing denials to their cause, can help reduce the same denials from coming back.",
      },
      {
        title: "Clearer view of your numbers",
        detail:
          "Monthly reports built from your own data are designed to show where revenue is moving, where it is stuck and what is being done about it.",
      },
      {
        title: "More time for patients",
        detail:
          "Moving carrier calls and claim follow-up off the front desk can help your team spend more time with the patients in the office.",
      },
    ],
    practiceTypes: ALL_DENTAL_SPECIALTIES,
    faqs: [
      {
        q: "What is dental billing?",
        a: "Dental billing is the process of getting paid for dental treatment by submitting claims to the patient's dental plan and billing the patient for the remaining balance. It includes verifying benefits, coding procedures with CDT codes, sending claims with attachments, posting EOBs and ERAs, working denials and following up on unpaid claims until each account reaches zero.",
      },
      {
        q: "How do I choose a dental billing company?",
        a: "Choose a team that works only or mainly on dental claims, works inside your existing practice software and explains exactly which tasks it will own. Ask how it handles verification, attachments, denials and A/R follow-up, what reports you will receive, and whether it signs a Business Associate Agreement before accessing patient data. A short consultation should cover all of this.",
      },
      {
        q: "Why do dental practices choose dental billing outsourcing?",
        a: "Dental practices usually outsource billing to give insurance work a dedicated owner when the front desk is stretched or a key billing person leaves. Billing dental insurance takes steady daily attention: claims, attachments, posting, denials and aging follow-up. An outside team keeps that routine going, while your staff focuses on patients and you keep control of your software and data.",
      },
      {
        q: "What do outsourced dental billing services include?",
        a: "Outsourced dental billing services usually include benefits verification, claim creation and submission, attachments, payment posting, denial management, insurance A/R follow-up and patient balance support. Because Texas Solutions RCM is a dental RCM company, you can also add credentialing and monthly revenue reporting, or hand us the whole revenue cycle. The scope is agreed with each practice, so you can hand off everything or only the parts your team does not have time for.",
      },
      {
        q: "How does dental billing fit into dental revenue cycle management?",
        a: "Dental billing is one stage of dental revenue cycle management. Billing covers claims, attachments, payment posting and the follow-up that gets each claim paid. Revenue cycle management also covers the steps around it: credentialing and enrollment, insurance verification and patient estimates before the visit, denials, patient balances and reporting. Texas Solutions RCM manages the whole cycle, and you can choose the full service or only the billing part.",
      },
      {
        q: "Do we have to change our dental software?",
        a: "No, you keep the software you use today. Our team works inside your practice management system, whether that is Open Dental, Dentrix or Eaglesoft, plus your clearinghouse and carrier portals. Your data stays in your system, your staff can see every note we leave, and you control the user accounts we use.",
      },
      {
        q: "How do you protect patient information?",
        a: "We sign a Business Associate Agreement before anyone on our team accesses patient data. We work inside your systems instead of exporting records to ours, each team member uses an individual login so activity can be audited, and access is limited to what each task requires. You can remove access at any time.",
      },
      {
        q: "How is dental billing different from medical billing?",
        a: "Dental billing uses CDT codes from the ADA, the ADA Dental Claim Form or the 837D electronic claim, and benefit rules built around annual maximums, frequency limits, waiting periods and downgrades. Medical billing uses different code sets, a different claim format and different coverage rules. Dental claims also carry tooth numbers, surfaces and quadrants and often need radiographs or periodontal charts as attachments.",
      },
      {
        q: "When is it time to outsource dental billing?",
        a: "It is time to outsource dental billing when claims, posting or follow-up keep slipping behind patient care. Common signs are unsent claims at the end of the week, EOBs waiting to be posted, a growing 90+ day aging column and one staff member holding all the carrier knowledge. Outsourcing dental billing can also cover a leave or a staffing gap.",
      },
      {
        q: "What should small dental practices look for in a dental billing company?",
        a: "Small dental practices should look for a dental billing company that fits their claim volume, works in their existing software and agrees on clear task ownership. A dental billing company for small practices should also accept a partial scope, such as claims and follow-up only, report in plain terms and leave every note in your system so a small team can see what changed.",
      },
      {
        q: "How do dental insurance billing companies work with the front desk?",
        a: "Dental insurance billing companies usually take the carrier side of the work while your front desk keeps the patient-facing tasks. In our setup, your team checks patients in, collects copays and presents treatment, while we handle claims, posting, denials and aging follow-up inside your software. Notes are left where staff already look, so everyone sees the same claim history.",
      },
      {
        q: "Can we outsource only part of our dental billing?",
        a: "Yes, many practices start with part of the work. Common choices are claims and follow-up only, verification only, payment posting and denials, or a one-time cleanup of old insurance A/R. We agree on who owns each task so nothing falls between your staff and ours, and the scope can be expanded later if it makes sense.",
      },
      {
        q: "Which dental practices do you work with?",
        a: "We work with dental practices across all 50 states, including general dentistry, orthodontics, endodontics, periodontics, oral surgery, pediatric dentistry and prosthodontics offices, as well as group practices and DSOs with several locations. Each practice has its own carrier mix and routine, so we set up the workflow around how your office already runs.",
      },
      {
        q: "How do we get started?",
        a: "You start by booking a free consultation. We review your current reports and billing setup, agree on scope and routines, sign a Business Associate Agreement and set up access to your systems. The first weeks focus on clearing any backlog of unsent claims, unposted payments and open denials before the regular daily routine takes over.",
      },
    ],
    relatedTools: [
      "dental-insurance-verification-checklist",
      "dental-billing-cost-calculator",
      "dental-insurance-collection-calculator",
      "dental-ar-aging-calculator",
    ],
    relatedServices: [...CORE_SLUGS, "revenue-cycle-management"],
    seoTitle: "Dental Billing Services & Outsourcing | Texas Solutions RCM",
    metaDescription:
      "Dental billing services as part of our dental revenue cycle management: benefits checks, CDT claims, EOB posting, denials and A/R follow-up in your software.",
    keywords: [
      "dental billing",
      "dental billing services",
      "dental billing company",
      "dental billing outsourcing",
      "dental insurance billing",
      "dental billing solutions",
      "billing dental insurance",
      "dental insurance billing company",
      "outsourced dental billing services",
      "outsourced dental billing",
      "remote dental billing",
      "dental billing for DSOs",
      "dental billing companies",
      "outsource dental billing",
      "outsourcing dental billing",
      "dental billing outsourcing company",
      "dental billing outsourcing companies",
      "dental insurance billing companies",
      "dental insurance billing outsourcing",
      "insurance billing outsourcing",
      "dental billing company for small practices",
      "remote dental billing team",
      "remote dental billing specialist",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Overview: Dental Revenue Cycle Management                          */
  /* ------------------------------------------------------------------ */
  {
    slug: "revenue-cycle-management",
    name: "Dental Revenue Cycle Management Services",
    shortName: "Dental RCM",
    category: "end-to-end",
    icon: "Workflow",
    summary:
      "Our primary service: one remote team for the full dental revenue cycle, from credentialing and verification to claims, posting, A/R and reporting.",
    definition:
      "Dental revenue cycle management is the coordinated handling of every financial step behind a dental visit: scheduling and insurance verification, treatment estimates, claim submission, payment posting, denials, insurance A/R, patient balances, credentialing and reporting. The aim is that each procedure is billed correctly, paid by the right party and tracked until the balance reaches zero.",
    intro: [
      "Dental revenue cycle management, often shortened to dental RCM, covers everything that happens between the moment a patient books an appointment and the moment the last dollar for that visit is collected. It includes verifying benefits, estimating the patient portion, submitting the claim, posting the carrier's payment, working any denial, following up on unpaid claims, billing the patient for what they truly owe, and keeping your dentists credentialed with the networks your patients use. Reporting ties those steps together so you can see how the whole cycle is performing.",
      "The cycle starts at scheduling. When a patient books, their plan needs to be confirmed and broken down: deductible, annual and remaining maximum, coinsurance by category, frequencies and history, waiting periods and any downgrade rules. For DHMO patients, the assigned office matters. For Medicaid dental, prior authorization may be required for some services. Everything the front desk tells a patient about cost depends on that breakdown being accurate.",
      "The middle of the cycle is the claim. After the visit, each procedure needs the right CDT code, tooth number, surfaces or quadrant, and often a radiograph, periodontal chart or narrative. The claim goes to the carrier as an 837D through your clearinghouse, acknowledgments come back, and rejections need to be fixed quickly. Secondary claims wait for the primary EOB. Predeterminations for major work are sent and tracked so treatment plans reflect what the carrier expects to pay.",
      "The back end is where payments, denials and balances are settled. EOBs and ERAs are posted with the correct contractual write-offs and patient portions, deposits are reconciled, and underpayments are flagged. Denials are worked through corrected claims and appeals. Claims with no response move into A/R follow-up by age and carrier. Once insurance has finished, patient balances are reviewed before statements go out, so patients are asked to pay only what they actually owe.",
      "Two supporting pieces keep the cycle running. Credentialing and provider enrollment make sure each dentist is in network with the carriers you accept, that provider data such as addresses and tax IDs is current, and that EFT and ERA are set up so payments arrive electronically. Reporting shows how the cycle is doing: A/R aging, claim status, denial trends, collections, adjustments and month-over-month revenue performance.",
      "When these steps are split across several people or vendors, problems are fixed in one place and repeated in another. A team that handles the whole cycle can connect cause and effect. A rise in frequency denials points to a gap in verification. Unexpected write-offs during posting point to a fee schedule or network status issue. A cluster of unpaid claims for one dentist may be a credentialing problem, not a claims problem. Texas Solutions RCM is a dental revenue cycle management company, and this full-cycle dental RCM service is our primary offering for dental practices and DSOs in all 50 states.",
      "Practices comparing dental revenue cycle management companies often start with a narrower question: which dental outsourcing services do we actually need? Revenue cycle management services can mean anything from a single task to the whole cycle, so the label alone says little. Some offices want one partner for the full cycle, while others want help with a single step such as verification, credentialing or aging claims. This page describes the full cycle and lists each of the eight core services separately, so you can compare scope line by line before deciding what to hand off and what to keep in house.",
      "Our remote team works inside your practice management software, whether that is Open Dental, Dentrix or Eaglesoft, and in your clearinghouse and carrier portals. We sign a Business Associate Agreement before accessing patient data, use individual logins you control, and leave notes where your team already looks. You can hand off the entire cycle or only selected services, and the scope is set during a free consultation based on how your office works today.",
    ],
    scope: [
      "Pre-appointment eligibility checks and full dental benefits breakdowns",
      "Patient responsibility estimates based on current maximums, deductibles and coinsurance",
      "Daily claim creation, CDT and tooth data review, attachments and 837D submission",
      "Predetermination submission and tracking for major restorative, implant and perio treatment",
      "Rejection handling, secondary claims and claim status follow-up",
      "EOB and ERA posting, contractual adjustments and deposit reconciliation",
      "Denial analysis, corrected claims, appeals and root-cause feedback",
      "30/60/90+ day insurance A/R follow-up and backlog cleanup projects",
      "Patient balance review, statement processing support and payment allocation",
      "Dental credentialing, re-credentialing, provider updates, EFT/ERA enrollment and monthly reporting",
    ],
    included: [
      {
        title: "Insurance Verification & Eligibility",
        detail:
          "The front of the cycle: confirming coverage and building a benefits breakdown before each appointment. Maximums, deductibles, frequencies, waiting periods and downgrades are entered in your PMS so estimates are based on current plan rules. Patients with two plans are set up with the correct coordination order, and issues are flagged to your front desk before the visit.",
      },
      {
        title: "Dental Claims Management",
        detail:
          "Each day's procedures become clean claims with correct CDT codes, tooth and surface data and supporting attachments. We submit through your clearinghouse, correct rejections and track every claim until the carrier responds. Predeterminations and secondary claims are part of the same daily routine, so nothing waits for a free afternoon.",
      },
      {
        title: "Denial Management & Appeals",
        detail:
          "Denied claims are categorized, corrected or appealed before deadlines pass. Each denial is tagged by root cause so verification, documentation or claim steps can be adjusted to prevent repeats. Appeals use radiographs, charting and narratives drawn from the dentist's own records.",
      },
      {
        title: "Payment Posting",
        detail:
          "Insurance and patient payments are posted to the right procedures with accurate contractual adjustments. Posting is reconciled to deposits, and underpayments or unusual adjustments are flagged for review. Accurate posting is the base for reliable patient balances and A/R reports.",
      },
      {
        title: "Accounts Receivable (A/R) Management",
        detail:
          "Unpaid claims are followed up by age bucket, carrier and dollar value through portals and payer calls. Older backlogs can be handled as a separate cleanup and recovery project. Every follow-up action is noted on the claim so your team can see its status at any time.",
      },
      {
        title: "Patient Billing & Collections Support",
        detail:
          "After insurance pays, patient balances are reviewed, payments are allocated correctly and statements are processed. Outstanding balances are followed up in coordination with your front office and your financial policy. Balances are checked against the EOB first, so patients are not billed for amounts the carrier should have paid.",
      },
      {
        title: "Dental Credentialing & Provider Enrollment",
        detail:
          "Dentists are enrolled with the networks you choose, re-credentialed on time and kept current when addresses, tax IDs or locations change. EFT and ERA enrollment help payments arrive and post electronically. Credentialing gaps for a new associate are identified before that dentist's claims start to deny.",
      },
      {
        title: "Dental RCM Reporting & Revenue Analysis",
        detail:
          "Monthly reports on aging, claim status, denials, collections and adjustments show how each part of the cycle is performing. We walk through the results with you and agree on next steps. DSOs and group practices can view the same reports by location and by provider.",
      },
    ],
    workflow: [
      {
        title: "Free consultation",
        detail:
          "We learn how your office runs today: software, carriers, fee schedules, who handles which billing tasks and where your team feels the most pressure. There is no cost for this conversation.",
      },
      {
        title: "Baseline review",
        detail:
          "We pull aging, unsent claims, denial and adjustment reports to document where claims and dollars are stuck, so later reports have a clear starting point. This baseline also shows which part of the cycle needs attention first.",
      },
      {
        title: "Agreement and access",
        detail:
          "We agree on scope and routines, sign a Business Associate Agreement and set up individual user accounts in your PMS, clearinghouse and carrier portals.",
      },
      {
        title: "Front-end controls",
        detail:
          "Verification runs ahead of the schedule, estimates are based on current benefits, and credentialing gaps for new dentists are identified before claims are affected.",
      },
      {
        title: "Claims and payments",
        detail:
          "Claims go out daily with attachments, rejections are cleared, and payments are posted and reconciled as EOBs, ERAs and deposits arrive. Secondary claims go out as soon as the primary EOB is posted.",
      },
      {
        title: "Follow-up and balances",
        detail:
          "Denials are worked by deadline, unpaid claims by age and value, and patient balances are reviewed before statements are processed.",
      },
      {
        title: "Reporting and review",
        detail:
          "Monthly reports cover the full cycle, and we meet with you to review trends, root causes and changes for the coming month.",
      },
    ],
    benefits: [
      {
        title: "Fewer handoff gaps",
        detail:
          "One team handling each step is designed to reduce the errors that happen when work passes between people who do not see each other's tasks.",
      },
      {
        title: "Problems fixed at the source",
        detail:
          "Linking denials and write-offs back to verification, documentation or credentialing aims to stop the same issues from repeating each month.",
      },
      {
        title: "More predictable cash flow",
        detail:
          "Consistent routines for claims, posting and follow-up can help make insurance deposits steadier from month to month.",
      },
      {
        title: "Accurate patient balances",
        detail:
          "Reviewing balances after insurance pays is designed to make sure patients are billed only for what they truly owe.",
      },
      {
        title: "A full picture of revenue",
        detail:
          "Reporting across the whole cycle can help you see which step needs attention instead of looking at one report in isolation.",
      },
    ],
    practiceTypes: ALL_DENTAL_SPECIALTIES,
    faqs: [
      {
        q: "What is dental revenue cycle management?",
        a: "Dental revenue cycle management is the process of managing every financial step of a dental visit, from insurance verification at scheduling to claims, payment posting, denials, A/R follow-up and patient balances. It also includes credentialing so dentists are in network and reporting so the practice can see how the cycle is performing. The goal is that each procedure is paid correctly and on time.",
      },
      {
        q: "What does a dental RCM company do?",
        a: "A dental RCM company manages the financial steps of a dental practice on its behalf, from insurance verification and claims to payment posting, denials, A/R follow-up and patient balances. Many also handle credentialing and reporting. A good partner works inside your practice management software, documents every action and shows you where revenue is moving and where it is stuck.",
      },
      {
        q: "Why do dental practices outsource revenue cycle management?",
        a: "Dental practices outsource revenue cycle management mainly to give every step of the cycle a consistent owner. In many offices the same few people schedule, check in patients and chase claims, so billing slips when the day gets busy. An outside dental RCM team keeps verification, claims, posting and follow-up on a set routine and reports on how each step is performing.",
      },
      {
        q: "How is dental RCM different from dental billing?",
        a: "Dental RCM covers the whole cycle, while dental billing usually refers to claims, posting and follow-up. RCM starts earlier, with credentialing, verification and patient estimates, and extends to patient balances and reporting. Dental billing is one part of the cycle we manage as a dental RCM company. Our dental billing page explains that part in detail, and both draw on the same eight core services, scoped to what each practice needs.",
      },
      {
        q: "How do I find the top dental RCM companies for my practice?",
        a: "To find the top dental RCM companies for your practice, compare dental revenue cycle management companies on scope, software, visibility and data protection. Ask which steps of the cycle each one owns, whether its team works inside your practice management system, what reports you receive and how often, and whether it signs a Business Associate Agreement first. Also ask how denials are traced back to their cause.",
      },
      {
        q: "What dental outsourcing services can a practice use?",
        a: "A dental practice can outsource most administrative revenue work, including verification, claims, payment posting, denials, A/R follow-up, patient billing support, credentialing and reporting. Some dental outsourcing services cover one task, while a dental RCM partner manages the full cycle. Clinical decisions, treatment presentation and your financial policy stay with the practice, and you choose which tasks to hand off.",
      },
      {
        q: "Which steps of the revenue cycle can we hand off?",
        a: "You can hand off any combination of the eight core services: verification, claims, denials, payment posting, A/R, patient billing support, credentialing and reporting. Some practices hand off the full cycle. Others keep verification or patient conversations in house and outsource the back end. We agree on ownership of each task so nothing is missed between teams.",
      },
      {
        q: "Do you work with DSOs and multi-location groups?",
        a: "Yes, we work with group practices and DSOs as well as single offices. For multiple locations, we set up shared routines and reporting so each office is handled the same way, while still tracking location-specific carriers, fee schedules and provider credentialing. Reports can be broken down by location and provider so leadership can compare performance across offices.",
      },
      {
        q: "What reports are included?",
        a: "Reports cover A/R aging, claim status, denial trends, collections, adjustments and monthly revenue performance. They are built from your own practice management data so your team can verify the numbers. We review the reports with you on a regular schedule, explain what changed and why, and recommend process changes for the next period.",
      },
      {
        q: "Does dental RCM include patient estimates?",
        a: "Yes, accurate patient estimates are part of the front end of the dental revenue cycle. We build a full benefits breakdown before the appointment, including deductibles, remaining maximums, coinsurance, frequencies and downgrade rules, and enter it in your PMS so treatment plan estimates use current data. An estimate is not a promise of what the carrier will pay, but it is designed to be realistic.",
      },
      {
        q: "Where does credentialing fit in the revenue cycle?",
        a: "Credentialing sits at the start of the revenue cycle, because a dentist who is not in network with a carrier may be paid at out-of-network rates or not at all. We track network status for each dentist, handle re-credentialing on each network's schedule, update provider information when it changes and assist with EFT and ERA enrollment so payments arrive electronically.",
      },
      {
        q: "How long does it take to get started?",
        a: "Getting started usually involves a free consultation, a review of your current reports, a signed Business Associate Agreement and user access to your systems. The timeline depends mostly on how quickly access can be set up and how large your current backlog is. The first weeks focus on unsent claims, unposted payments and open denials before regular routines take over.",
      },
      {
        q: "How do you protect patient data?",
        a: "We sign a Business Associate Agreement before accessing any patient information. Our team works inside your systems rather than copying data to ours, uses individual logins you control so activity can be audited, and receives only the access each task requires. You can remove access at any time.",
      },
    ],
    relatedTools: [
      "dental-practice-revenue-calculator",
      "days-in-ar-calculator",
      "net-collection-rate-calculator",
      "dental-practice-roi-calculator",
    ],
    relatedServices: CORE_SLUGS,
    seoTitle: "Dental Revenue Cycle Management Services | Texas Solutions",
    metaDescription:
      "Dental revenue cycle management from a dental RCM company: verification, claims, payment posting, denials, A/R, credentialing and reporting in one team.",
    keywords: [
      "revenue cycle management dental",
      "RCM dental",
      "dental revenue cycle management",
      "dental revenue cycle management services",
      "dental RCM",
      "dental RCM services",
      "outsourced dental RCM",
      "dental revenue cycle",
      "DSO revenue cycle management",
      "dental revenue cycle management companies",
      "dental outsourcing services",
      "revenue cycle management services",
      "top dental RCM companies",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Core 1: Dental Insurance Verification & Eligibility                */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-insurance-verification",
    name: "Dental Insurance Verification & Eligibility",
    shortName: "Insurance Verification",
    category: "dental",
    icon: "ShieldCheck",
    summary:
      "We confirm dental coverage and build a full benefits breakdown before each visit. Maximums, frequencies, waiting periods and estimates are entered in your PMS.",
    definition:
      "Dental insurance verification confirms that a patient's dental plan is active and breaks down its benefits before the appointment. A complete check covers plan type, deductibles, annual and remaining maximums, coinsurance by category, frequency limits, procedure history, waiting periods and downgrade rules, so the patient estimate matches how the plan actually pays.",
    intro: [
      "Dental insurance verification is the first step of the dental revenue cycle, and it shapes everything after it. An eligibility response that says a plan is active does not tell you whether the patient already had two cleanings this benefit year, whether crowns are subject to a twelve-month waiting period or whether the plan pays posterior composites at the amalgam rate. Those details decide what the carrier pays and what the patient owes.",
      "Our team works as an outsourced dental insurance verification service: we verify dental insurance for scheduled patients ahead of the appointment. We start with the electronic eligibility response, then use carrier portals and, when needed, a call to the carrier to fill in what the response leaves out: procedure history, frequency details, missing tooth clauses, age limits and alternate benefit rules. For DHMO patients we confirm the assigned office, and for patients with two plans we determine which pays first.",
      "For offices training staff on how to verify dental insurance, the order of the steps matters. Dental eligibility verification comes first and answers one question: is the plan active for the date of service, with the right subscriber, member ID and group on file? The benefits breakdown comes second and answers how that plan pays. Treating dental insurance eligibility verification and the breakdown as separate steps makes it easier to see which one was skipped when a claim comes back denied. Good insurance eligibility verification services do both steps, not only the first.",
      "Results are entered where your team already works, in the insurance plan record, coverage table and patient notes inside Open Dental, Dentrix or Eaglesoft. That means treatment plan estimates calculate from current benefits, and the front desk can see at a glance whether a patient's maximum is nearly used or a procedure is not yet due.",
      "Problems are flagged before the visit, not after the claim is denied. Inactive coverage, a wrong subscriber, a used-up maximum or a frequency conflict is sent to your front office in time to contact the patient. Outsourcing dental insurance verification also moves carrier hold time and portal lookups away from the people checking patients in. We sign a Business Associate Agreement before accessing patient data.",
    ],
    scope: [
      "Reviewing the upcoming schedule for new patients, plan changes and returning patients due for a refresh",
      "Confirming active coverage, subscriber, member ID, group number, employer and plan type (PPO, DHMO, indemnity or Medicaid dental)",
      "Checking the assigned office for DHMO members before the appointment",
      "Deductibles, annual maximum, remaining maximum and lifetime orthodontic maximum",
      "Coinsurance by category: preventive, basic, major, endodontics, periodontics, oral surgery and orthodontics",
      "Frequency limits and procedure history for exams, cleanings, radiographs, fluoride, perio maintenance and crowns",
      "Waiting periods, missing tooth clauses, replacement rules and age limits",
      "Alternate benefit and downgrade provisions, such as posterior composite to amalgam",
      "Coordination of benefits order for patients with two dental plans",
      "Entering benefits, coverage tables and notes in your PMS and flagging issues to the front desk",
    ],
    included: [
      {
        title: "Dental insurance eligibility verification",
        detail:
          "We confirm that the patient's dental plan is active on the date of service and that the subscriber, member ID, group number and relationship to the subscriber are correct in your system. The electronic eligibility response is checked first, then a carrier portal or phone call is used if the response is incomplete or does not match. For DHMO members we confirm the assigned office, and for Medicaid dental patients we confirm eligibility for the month of the visit. Any mismatch, such as a terminated plan, a new employer or a dependent who has aged out, is flagged to your front desk with enough lead time to reach the patient before the appointment.",
      },
      {
        title: "Benefits breakdown",
        detail:
          "A benefits breakdown records how the plan pays for each category of dental care. We note coinsurance for preventive, basic and major services, and separately for endodontics, periodontics, oral surgery and orthodontics where the plan splits them. We also record whether the plan pays from a contracted fee schedule, usual and customary amounts or a set copayment schedule, along with exclusions such as implants or cosmetic services. The breakdown is entered into your insurance plan record and coverage table so treatment plan estimates in your PMS use the right percentages. A plan that changed at the start of a new benefit year is updated before the first visit.",
      },
      {
        title: "Deductible and annual maximum verification",
        detail:
          "We confirm the individual and family deductible, how much has already been met and which categories the deductible applies to, since many dental plans waive it for preventive care. We also confirm the annual maximum, the amount remaining for the current benefit year and whether the benefit year follows the calendar or a different cycle. For orthodontic patients we record the lifetime orthodontic maximum and how the carrier pays it out over the course of treatment. Knowing the remaining maximum helps your team plan major work, for example splitting treatment across two benefit years when a patient is close to the limit.",
      },
      {
        title: "Frequency limitations and waiting period checks",
        detail:
          "Frequency limits control how often a plan will pay for services such as exams, prophylaxis, perio maintenance, bitewings, full-mouth or panoramic radiographs, fluoride and crowns on the same tooth. We record each limit and check the patient's procedure history so services are not scheduled before they are covered. We also check waiting periods for basic and major services, missing tooth clauses that exclude replacing teeth lost before coverage began, and age limits for sealants, fluoride and orthodontics. These checks are designed to catch the issues behind many dental denials before the patient is in the chair.",
      },
      {
        title: "Patient responsibility estimates",
        detail:
          "With current benefits in your system, we help prepare patient responsibility estimates for scheduled and planned treatment. The estimate accounts for the remaining deductible, coinsurance, remaining maximum, frequency conflicts and downgrade rules, such as a composite paid at the amalgam allowance. For patients with two plans, it reflects the coordination order and the secondary plan's method, such as standard coordination or non-duplication of benefits. An estimate is never a guarantee, since carriers decide payment when the claim is processed, but an estimate built on a full breakdown gives patients a more realistic number before they agree to treatment.",
      },
    ],
    workflow: [
      {
        title: "Pull the schedule",
        detail:
          "We review upcoming appointments on an agreed lead time and list new patients, plan changes and patients due for a benefits refresh.",
      },
      {
        title: "Run eligibility",
        detail:
          "Electronic eligibility is checked first to confirm the plan is active and that member, subscriber and group details match your records.",
      },
      {
        title: "Complete the breakdown",
        detail:
          "Carrier portals and calls fill in history, frequencies, waiting periods, downgrades, deductibles met and remaining maximums.",
      },
      {
        title: "Update your PMS",
        detail:
          "Benefits, coverage tables and notes are entered in the plan and patient record so treatment estimates calculate from current data.",
      },
      {
        title: "Flag and estimate",
        detail:
          "Issues such as inactive coverage or a used-up maximum are flagged to your front desk, and patient estimates are prepared for planned treatment.",
      },
      {
        title: "Refresh on schedule",
        detail:
          "Returning patients are re-verified on the cadence you choose and at every new benefit year or reported plan change.",
      },
    ],
    benefits: [
      {
        title: "More realistic estimates",
        detail:
          "Knowing maximums, frequencies and downgrades in advance is designed to bring the patient portion quoted at the chair closer to what the EOB shows.",
      },
      {
        title: "Fewer eligibility and frequency denials",
        detail:
          "Checking coverage and procedure history before treatment aims to reduce claims denied for inactive coverage or services already used.",
      },
      {
        title: "Better treatment planning",
        detail:
          "A clear breakdown can help your team time major work around waiting periods and benefit years with the patient's input.",
      },
      {
        title: "Less time on hold",
        detail:
          "Moving carrier calls and portal lookups to a remote team can help your front desk focus on patients in the office.",
      },
    ],
    practiceTypes: ALL_DENTAL_SPECIALTIES,
    faqs: [
      {
        q: "How do you verify dental insurance?",
        a: "To verify dental insurance, confirm the patient's coverage is active, then collect the plan details that decide payment. Start with an electronic eligibility check, then use the carrier portal or a call to record deductibles, remaining maximum, coinsurance by category, frequencies, procedure history, waiting periods and downgrade rules. Enter the results in your practice software before the appointment.",
      },
      {
        q: "What is dental eligibility verification?",
        a: "Dental eligibility verification confirms that a patient's dental plan is active on the date of service and that the subscriber and member details on file are correct. It is the first part of dental insurance verification. A full check then adds the benefits breakdown, such as deductibles, remaining maximum, frequencies and waiting periods, which an eligibility response alone often leaves out.",
      },
      {
        q: "Can automated dental insurance verification replace a person?",
        a: "Automated dental insurance verification handles part of the job, but usually not all of it. Software tools can request eligibility and pull some plan data quickly, yet responses vary by carrier and often miss procedure history, frequency limits, downgrades and missing tooth clauses. A person still checks carrier portals or calls the carrier to fill those gaps before the visit.",
      },
      {
        q: "What does a dental insurance verification company do?",
        a: "A dental insurance verification company checks patients' dental coverage and benefits before their appointments on behalf of the practice. Its team runs eligibility, completes the benefits breakdown through portals and carrier calls, enters the results in your practice software and flags problems such as inactive coverage or a used-up maximum so your front desk can reach the patient in time.",
      },
      {
        q: "Should I outsource dental insurance verification?",
        a: "Outsourcing dental insurance verification makes sense when your front desk cannot finish full breakdowns before patients arrive. Signs include frequent frequency or waiting period denials, estimates that differ from the EOB and long hold times with carriers. Keep it in house if your team already completes thorough breakdowns on time, or outsource only new patients and plan changes.",
      },
      {
        q: "What should dental insurance verification include?",
        a: "Dental insurance verification should include active coverage, plan type, deductibles, annual and remaining maximums, coinsurance by category, frequency limits, procedure history, waiting periods, missing tooth clauses, age limits and downgrade rules. Orthodontic patients also need the lifetime orthodontic maximum and payment schedule. Our free dental insurance verification checklist lists each item so your team can compare it with your current form.",
      },
      {
        q: "Why is an electronic eligibility check not enough for dental?",
        a: "An electronic eligibility check usually confirms active coverage but often leaves out the details dental offices need most, such as procedure history, frequency limits, downgrades and missing tooth clauses. The detail returned varies by carrier. That is why a full breakdown typically combines the electronic response with carrier portals and, when needed, a phone call to the carrier.",
      },
      {
        q: "How far ahead should dental benefits be verified?",
        a: "Many offices verify dental benefits two to three business days before the appointment. That leaves time to contact the patient about inactive coverage or a wrong assigned office, while the information is still current on the day of the visit. The best lead time depends on your schedule, how many new patients you see and how often your patients change plans.",
      },
      {
        q: "What is the difference between a dental PPO and a DHMO?",
        a: "A dental PPO lets patients see in-network or out-of-network dentists, and the plan pays a percentage of a contracted or allowed fee. A DHMO usually assigns each member to one office, pays that office a set amount per member and lists fixed patient copayments. Verifying the assigned office before a DHMO visit is essential, since another office may not be paid.",
      },
      {
        q: "How do you handle patients with two dental plans?",
        a: "We verify both plans and determine which one is primary. For dependent children, many plans follow the birthday rule, and a plan through the patient's own employer is usually primary for that patient. We also note how the secondary plan coordinates, such as standard coordination or non-duplication of benefits, because that changes the secondary payment and the patient estimate.",
      },
      {
        q: "Is a patient estimate a guarantee of payment?",
        a: "No, a patient estimate is not a guarantee, because the carrier decides payment when it processes the claim. Remaining maximums can change if another claim is paid first, and plans can change between verification and treatment. A full benefits breakdown is designed to make the estimate as realistic as possible, and a predetermination can add more certainty for major work.",
      },
    ],
    relatedTools: [
      "dental-insurance-verification-checklist",
      "dental-insurance-collection-calculator",
      "dental-denial-rate-calculator",
    ],
    relatedServices: others("dental-insurance-verification"),
    seoTitle: "Dental Insurance Verification Services | Texas Solutions RCM",
    metaDescription:
      "Dental insurance verification services that check coverage, maximums, frequencies and waiting periods before each visit, so estimates use current plan data.",
    keywords: [
      "dental insurance verification",
      "verify dental insurance",
      "verifying dental insurance",
      "dental insurance verification company",
      "dental insurance verification companies",
      "dental insurance verification service",
      "dental insurance verification services",
      "insurance verification dental",
      "outsourcing dental insurance verification",
      "dental eligibility verification",
      "dental benefits breakdown",
      "dental insurance eligibility",
      "outsourced dental insurance verification",
      "dental patient estimates",
      "dental insurance eligibility verification",
      "how to verify dental insurance",
      "insurance eligibility verification services",
      "automated dental insurance verification",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Core 2: Dental Claims Management                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-claims-processing",
    name: "Dental Claims Management",
    shortName: "Dental Claims",
    category: "dental",
    icon: "Send",
    summary:
      "We build, check and submit dental claims every day, with the attachments carriers expect. Rejections are fixed and each claim is tracked until it is paid.",
    definition:
      "Dental claims management is the work of creating, reviewing, submitting and tracking dental insurance claims from the day of service until the carrier pays or responds. It includes checking CDT codes, tooth numbers and surfaces, adding radiographs, periodontal charts and narratives, sending 837D or ADA claim forms, correcting rejections and following claim status.",
    intro: [
      "Dental claims management is where completed treatment becomes revenue. A dental claim carries details that have to line up exactly: the CDT code, tooth number, surfaces or quadrant, dates of prior placement for crowns and bridges, the treating and billing dentist, and often a radiograph, periodontal chart or narrative. When one of those pieces is missing or does not match the clinical note, the carrier rejects the claim, pends it for more information or pays it at a lower level.",
      "Our dental claim processing routine starts each day with the completed procedures in your practice management software. We check them against the clinical notes before the claims go out. We confirm codes and tooth data, add the attachments and narrative a carrier usually asks for on that procedure, and submit the claim electronically as an 837D through your clearinghouse. Paper ADA Dental Claim Forms are used only when a carrier requires them, and the same checks apply to every dental insurance claim either way.",
      "After submission, we watch the clearinghouse and carrier acknowledgments, correct rejected claims and resend them, and send secondary claims once the primary EOB arrives. This is dental claims support from submission to payment: each claim is tracked until the carrier pays, denies or asks for information, and claims without a response are moved into follow-up instead of being left to age.",
      "The work happens in your own systems, including Open Dental, Dentrix or Eaglesoft and your clearinghouse, so every claim, attachment and note stays in your records. We sign a Business Associate Agreement before accessing patient data.",
    ],
    scope: [
      "Daily review of completed procedures and unsent claims in your practice management software",
      "Checking CDT codes, tooth numbers, surfaces, quadrants and arches against clinical notes",
      "Adding prior placement dates and replacement information for crowns, bridges and dentures",
      "Preparing radiographs, periodontal charts, intraoral photos and dentist-written narratives as attachments",
      "Electronic 837D submission through your clearinghouse, with ADA claim forms when a carrier requires paper",
      "Predetermination submission and tracking for major treatment",
      "Reviewing clearinghouse and carrier acknowledgments and correcting rejected claims",
      "Filing secondary claims with primary EOB details",
      "Claim status checks through portals, status inquiries and carrier calls",
      "Moving claims with no response into the A/R follow-up worklist",
    ],
    included: [
      {
        title: "Dental claim creation and submission",
        detail:
          "Every completed procedure should end up on a claim, and every claim should go out promptly. Each day we compare the procedures posted in your PMS with the schedule and clinical notes, create claims for anything that has not been billed, and confirm the treating dentist, billing provider, NPI, tax ID and carrier address. Claims are submitted electronically as 837D transactions through your clearinghouse, and attachment reference numbers are linked where the carrier requires them. Secondary claims are sent once the primary EOB is posted, with the primary payment and adjustment details included. Predeterminations for major treatment are submitted the same way and tracked until the carrier responds.",
      },
      {
        title: "CDT code and documentation review",
        detail:
          "Before a claim is sent, we check that the CDT code entered matches what the dentist documented in the clinical note, and that tooth numbers, surfaces, quadrants or arches are complete and consistent. We look for common gaps, such as a crown without a prior placement date, scaling and root planing without the quadrant and pocket depths, or a code that was changed in the annual CDT update from the ADA. Coding decisions remain with your dentists. When a note and the entered code do not agree, we ask your team rather than change the code ourselves. This review is designed to stop avoidable rejections and denials before the claim leaves the office.",
      },
      {
        title: "Claim attachments and corrections",
        detail:
          "Many dental procedures are paid only when the carrier can see why they were needed. We keep notes on what each carrier usually requests and attach the right items: pre-operative radiographs for crowns, onlays and implants, periodontal charting for scaling and root planing, intraoral photos for fractures, and narratives that summarize what the dentist documented. Narratives are drawn from the clinical record and never add to it. When a claim needs to be corrected after submission, for example a wrong tooth number or a missing attachment, we send a corrected or replacement claim the way the carrier requests, so the original is not processed twice.",
      },
      {
        title: "Rejected claim resubmission",
        detail:
          "A rejection is different from a denial: the claim failed a clearinghouse or carrier front-end check and was never processed. We review clearinghouse reports and carrier acknowledgments every working day, read the rejection reason and fix the cause, whether it is a member ID that does not match, a missing subscriber birth date, an invalid tooth number or an inactive provider identifier. The corrected claim is resent and noted in your system. When the same rejection keeps appearing, such as a carrier payer ID that changed, we update the setting in your PMS or clearinghouse so future claims go out correctly the first time.",
      },
      {
        title: "Claim status tracking and follow-up",
        detail:
          "Submitted claims are tracked until the carrier pays, denies or asks for more information. We use clearinghouse status reports, carrier portals and, when needed, a call to the carrier to find out where a claim stands. Claims that are pended for information are answered with the requested records, and claims the carrier says it never received are resent with proof of the original submission date where possible, since timely filing limits vary by carrier and contract. Claims that remain open past the carrier's usual processing time move to the accounts receivable worklist, so nothing sits unworked in the outstanding claims report.",
      },
    ],
    workflow: [
      {
        title: "Review the day",
        detail:
          "Completed procedures are compared with the schedule and clinical notes so every billable service is on a claim.",
      },
      {
        title: "Check codes and tooth data",
        detail:
          "CDT codes, tooth numbers, surfaces, quadrants and prior placement dates are checked, and questions go to your team.",
      },
      {
        title: "Attach and submit",
        detail:
          "Radiographs, charting, photos and narratives are attached, and claims are sent through your clearinghouse as 837D transactions.",
      },
      {
        title: "Clear rejections",
        detail:
          "Clearinghouse and carrier acknowledgments are reviewed daily, and rejected claims are corrected and resent.",
      },
      {
        title: "Send secondaries",
        detail:
          "When the primary EOB is posted, the secondary claim goes out with the primary payment details.",
      },
      {
        title: "Track to resolution",
        detail:
          "Claim status is checked until payment, and claims without a response move to A/R follow-up.",
      },
    ],
    benefits: [
      {
        title: "Cleaner first submissions",
        detail:
          "Checking codes, tooth data and attachments before sending is designed to reduce rejections and requests for information.",
      },
      {
        title: "Claims that go out every day",
        detail:
          "A set daily routine aims to keep claims moving even when your front office is busy or short-staffed.",
      },
      {
        title: "Secondary claims on time",
        detail:
          "Filing secondary claims as soon as the primary EOB posts can help keep secondary balances from aging unnoticed.",
      },
      {
        title: "No claims left untracked",
        detail:
          "Following each claim to a result is designed to catch lost or pended claims while there is still time to act.",
      },
    ],
    practiceTypes: ALL_DENTAL_SPECIALTIES,
    faqs: [
      {
        q: "What is a dental claim?",
        a: "A dental claim is a request for payment that a dental office sends to a patient's dental plan after treatment. It lists the patient and subscriber, the treating dentist, each procedure's CDT code, tooth numbers or areas of the mouth, dates of service and fees. Claims are sent electronically as 837D transactions or on the paper ADA Dental Claim Form.",
      },
      {
        q: "What is the ADA Dental Claim Form?",
        a: "The ADA Dental Claim Form is the standard paper claim form for dental services, published by the American Dental Association. It collects the same core details as the electronic 837D: patient, subscriber and plan information, billing and treating dentist, CDT codes, tooth and surface data and fees. Most offices file electronically and use the paper form only when a carrier asks for it.",
      },
      {
        q: "What happens after a dental insurance claim is submitted?",
        a: "After a dental insurance claim is submitted, the clearinghouse and carrier check it, then the carrier processes it and returns an EOB or ERA. The claim may be paid, denied, downgraded or pended for more information. Processing times are set by each carrier. We watch acknowledgments, answer information requests and follow up on any claim that stays open.",
      },
      {
        q: "What is an 837D dental claim?",
        a: "An 837D is the standard electronic format for dental claims, defined by X12. It carries the same information as the paper ADA Dental Claim Form, including CDT codes, tooth numbers, surfaces and provider details, in a format clearinghouses and carriers can process automatically. Most dental claims are now sent as 837D transactions, and paper forms are used only when a carrier requires them.",
      },
      {
        q: "Which dental procedures usually need attachments?",
        a: "Attachments are commonly requested for crowns, onlays, bridges, implants, scaling and root planing, some endodontic treatment and many oral surgery procedures. Typical attachments are pre-operative radiographs, periodontal charting, intraoral photos and a narrative. Requirements differ by carrier and plan, so we keep notes on what each carrier tends to ask for and include it with the first submission.",
      },
      {
        q: "What is the difference between a rejected and a denied dental claim?",
        a: "A rejected claim failed a clearinghouse or carrier front-end check and was never processed, while a denied claim was processed and the carrier decided not to pay. Rejections are usually fixed and resent as new claims. Denials come back on the EOB or ERA with a reason and need a corrected claim, more documentation or an appeal.",
      },
      {
        q: "What does dental claims support include?",
        a: "Dental claims support includes building claims, checking CDT codes and tooth data against notes, adding attachments, submitting 837D claims, clearing rejections and tracking each claim to a response. Our dental claim support also covers secondary claims and predeterminations, and claims without a response move into A/R follow-up instead of aging unnoticed.",
      },
      {
        q: "Do you change CDT codes on our claims?",
        a: "No, coding decisions stay with your dentists. We check that the code entered matches the clinical note and that tooth and surface data are complete. When something does not line up, we send a question to your team and wait for the dentist or office manager to confirm the correct code before the claim is sent.",
      },
      {
        q: "Is a predetermination the same as a prior authorization?",
        a: "No, a predetermination is usually an optional estimate of what a dental plan expects to pay, while a prior authorization is a required approval before treatment. Most commercial dental plans use predeterminations, while some Medicaid dental programs require prior authorization for certain services. Neither is a guarantee of payment, since eligibility and remaining maximums can change.",
      },
      {
        q: "How do you track claims after they are sent?",
        a: "We track claims through clearinghouse acknowledgments and status reports, carrier portals and calls to the carrier when needed. Rejections are fixed daily, requests for information are answered with the records the carrier asks for, and claims that pass the carrier's usual processing time without a response move to A/R follow-up so they are worked by age and value.",
      },
    ],
    relatedTools: [
      "claim-submission-checklist",
      "clean-claim-rate-calculator",
      "dental-denial-rate-calculator",
    ],
    relatedServices: others("dental-claims-processing"),
    seoTitle: "Dental Claims Processing Services | Texas Solutions RCM",
    metaDescription:
      "Dental claims processing that checks CDT codes and tooth data, adds attachments, files 837D or ADA claim forms and tracks each dental claim to a response.",
    keywords: [
      "dental claims",
      "dental claim",
      "claim dental",
      "dental insurance claim",
      "dental insurance claims",
      "dental claim processing",
      "what is a dental claim",
      "ADA dental claim form",
      "dental claims management",
      "dental claims processing",
      "dental claim submission",
      "dental claim attachments",
      "837D dental claims",
      "dental claims support",
      "dental claim support",
      "rejected dental claims",
      "dental claim status follow-up",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Core 3: Dental Denial Management & Appeals                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "denial-management",
    name: "Dental Denial Management & Appeals",
    shortName: "Denial Management",
    category: "dental",
    icon: "ShieldAlert",
    summary:
      "We work every denied dental claim before carrier deadlines pass. Each denial is traced to its cause so the same problem is less likely to repeat.",
    definition:
      "Dental denial management is the process of reviewing, correcting and appealing dental claims that carriers deny or underpay, then fixing the causes behind them. It covers reading the EOB or ERA reason, sending corrected claims, filing appeals with radiographs and narratives, supplying missing documentation and tracking denial trends by carrier, procedure and dentist.",
    intro: [
      "Dental denial management deals with claims your practice has earned but has not been paid for. A dental carrier may deny a claim because a frequency limit was reached, a waiting period had not ended, a missing tooth clause applies, an attachment did not arrive or the carrier decided the treatment was not supported by the radiograph. Each denial needs someone to read the reason, decide what can be done and act before the carrier's deadline.",
      "Our team reviews denials as EOBs and ERAs are posted and sorts them by what will resolve them. Some need a corrected claim, such as a wrong tooth number or surface. Some need documentation the carrier did not receive. Others need a written appeal with the radiographs, periodontal charting and a narrative based on the dentist's notes. Some denials are correct under the plan, and those are moved to patient responsibility or written off according to your policy, with a clear note in the ledger.",
      "Working denials one at a time is only half of the job. The same few causes tend to repeat: frequency conflicts, missing attachments, outdated coverage information or a dentist who is not yet in network with a carrier. We tag each denial by root cause and report the patterns, so verification, claim preparation or credentialing can be adjusted where the problem started.",
      "All work is done inside your practice management software, clearinghouse and carrier portals, so corrected claims, appeal letters and notes stay in your records. We sign a Business Associate Agreement before accessing patient data.",
    ],
    scope: [
      "Daily review of denials and partial payments from posted EOBs, ERAs and carrier portals",
      "Reading denial reasons, including CARC and RARC codes and group codes on ERAs",
      "Separating clearinghouse rejections from processed denials and routing each correctly",
      "Preparing corrected claims for coding, tooth, surface or provider errors",
      "Writing appeals and reconsideration requests with radiographs, charting and dentist-based narratives",
      "Supplying missing documentation when a carrier requests records or attachments",
      "Tracking appeal and correction deadlines by carrier",
      "Moving valid plan-based denials to patient responsibility or write-off according to your policy",
      "Tagging denials by root cause: eligibility, frequency, documentation, coding, credentialing or timely filing",
      "Monthly denial trend reports by carrier, procedure category, dentist and location",
    ],
    included: [
      {
        title: "Insurance claim denial analysis",
        detail:
          "Every denial starts with understanding exactly why the carrier refused to pay. We read the denial reason on the EOB or the CARC, RARC and group codes on the ERA, then compare them with the claim, the patient's benefits and the clinical record. A frequency denial is checked against procedure history, a waiting period denial against the plan's effective date, and a documentation denial against what was attached. The analysis decides the next step: correct, resend with documents, appeal, bill the patient or write off. Each decision is noted in your system so anyone looking at the account can see what happened and why.",
      },
      {
        title: "Corrected claims submission",
        detail:
          "Many denials come from an error on the claim rather than a coverage problem. Examples include a wrong tooth number, a missing surface, the wrong treating dentist, an incorrect date of service or a code entered for the wrong procedure. When the record supports a correction, we prepare a corrected or replacement claim the way the carrier requests, so the original claim is replaced rather than duplicated. Corrections that involve a coding change are confirmed with your dentist or office manager first. The corrected claim is tracked like any new claim until the carrier processes it, and the correction is noted in the patient ledger.",
      },
      {
        title: "Insurance appeals and reconsiderations",
        detail:
          "When a carrier denies or downgrades a claim that the clinical record supports, we prepare a request for reconsideration or a formal appeal. The appeal explains the clinical reason for the treatment using the dentist's documentation and includes the evidence a dental consultant at the carrier needs to see, such as pre-operative radiographs, periodontal charting, intraoral photos and a clear narrative. Appeals that need the dentist's own statement are drafted for review and signature. We track each appeal against the carrier's deadline, follow up on its status and record the outcome, including whether a further appeal level is available and worthwhile.",
      },
      {
        title: "Missing documentation follow-up",
        detail:
          "Some claims are not denied outright but pended or denied because the carrier did not receive what it needed. Common requests are radiographs for a crown or implant, periodontal charting for scaling and root planing, a narrative for a build-up, or proof of the original placement date for a replacement. We identify these requests from EOBs, letters and portal messages, gather the items from your records and send them through the carrier's preferred channel. When something has to come from your clinical team, such as an updated narrative, we request it with the specific details the carrier asked for and follow up until it is sent.",
      },
      {
        title: "Denial prevention and root-cause analysis",
        detail:
          "Each denial we work is tagged with the step that caused it, such as eligibility, frequency or waiting period, missing attachment, coding or tooth data, credentialing or timely filing. Over a month, those tags show which problems repeat and for which carriers, procedures or dentists. We share the patterns in a monthly report and suggest practical changes, for example adding a history check for a carrier that often denies bitewings, attaching radiographs to every crown claim for a certain plan, or updating a provider's network status before new claims go out. The aim is fewer denials to work in the first place, not only faster appeals.",
      },
    ],
    workflow: [
      {
        title: "Capture",
        detail:
          "Denials and partial payments are pulled from posted EOBs, ERAs, letters and portal messages into one worklist.",
      },
      {
        title: "Analyze",
        detail:
          "Each denial reason is checked against the claim, benefits and clinical record, and tagged with its likely root cause.",
      },
      {
        title: "Prioritize",
        detail:
          "The worklist is ordered by approaching deadline, dollar value and how likely the denial is to be resolved.",
      },
      {
        title: "Resolve",
        detail:
          "We send a corrected claim, supply missing documents, file a reconsideration or appeal, or move a valid denial to the patient or write-off per your policy.",
      },
      {
        title: "Track outcomes",
        detail:
          "Resubmissions and appeals are followed until the carrier decides, and each outcome is noted in the ledger.",
      },
      {
        title: "Prevent and report",
        detail:
          "Recurring causes are shared in a monthly report with suggested changes to verification, claims or credentialing steps.",
      },
    ],
    benefits: [
      {
        title: "Fewer denials aging out",
        detail:
          "A deadline-ordered worklist is designed to get denials worked while correction and appeal windows are still open.",
      },
      {
        title: "Stronger appeals",
        detail:
          "Appeals built on the dentist's documentation, radiographs and charting aim to give carrier reviewers what they need to reconsider.",
      },
      {
        title: "Clear root causes",
        detail:
          "Tagging every denial by cause can show which steps in your process create the most rework.",
      },
      {
        title: "Less repeat work",
        detail:
          "Fixing the source of recurring denials is designed to reduce how often your team sees the same problem.",
      },
    ],
    practiceTypes: ALL_DENTAL_SPECIALTIES,
    faqs: [
      {
        q: "What are the most common reasons dental claims are denied?",
        a: "The most common reasons dental claims are denied include frequency limits already reached, waiting periods that have not ended, missing tooth clauses, inactive coverage, missing radiographs or narratives, incorrect tooth or surface data and a dentist who is not in network. Many of these can be caught during verification or claim review, which is why we track each denial back to its cause.",
      },
      {
        q: "What is the difference between a corrected claim and an appeal?",
        a: "A corrected claim fixes an error on the original claim, such as a wrong tooth number or date, while an appeal asks the carrier to reconsider a decision on a claim that was correct. Corrected claims replace the original so it is not processed twice. Appeals include supporting evidence like radiographs, charting and a narrative explaining why the treatment was needed.",
      },
      {
        q: "How long do we have to appeal a denied dental claim?",
        a: "Appeal deadlines vary by carrier, plan and state, so the deadline on the EOB or in the plan documents is the one to follow. Many employer-sponsored plans also follow federal claims procedure rules that set minimum appeal windows. Because these windows run from the date of the denial, we review denials as soon as they post and order the worklist by deadline.",
      },
      {
        q: "Can a downgraded dental claim be appealed?",
        a: "Yes, a downgraded claim can be appealed, but whether it is worth appealing depends on the plan language. Many downgrades follow an alternate benefit provision written into the plan, such as paying a posterior composite at the amalgam rate, and those are usually upheld. When a downgrade is based on the carrier's clinical judgment, an appeal with radiographs and a narrative may be considered.",
      },
      {
        q: "What happens to denials that cannot be overturned?",
        a: "Denials that are correct under the plan, such as a service beyond the frequency limit, are handled according to your financial policy. Depending on the plan, your network contract and what the patient agreed to before treatment, the balance may be moved to patient responsibility or written off. We note the reason in the ledger so your team can explain it to the patient.",
      },
      {
        q: "How do you help prevent future denials?",
        a: "We tag every denial with its root cause and share the patterns in a monthly report. Typical fixes include adding history checks for frequency-limited services, attaching radiographs by default for certain carriers, updating plan information after a patient changes jobs and finishing credentialing before a new dentist sees patients. Prevention changes are agreed with your team before they are put in place.",
      },
    ],
    relatedTools: [
      "dental-denial-rate-calculator",
      "denial-appeal-checklist",
      "eob-explained",
    ],
    relatedServices: others("denial-management"),
    seoTitle: "Dental Claim Denial Management & Appeals Services",
    metaDescription:
      "Dental denial management and appeals services: denial analysis, corrected claims, carrier appeals, missing documentation and root-cause prevention.",
    keywords: [
      "dental denial management",
      "dental claim denial management",
      "dental claim appeals",
      "denied dental claims",
      "dental insurance appeals",
      "dental corrected claims",
      "dental denial prevention",
    ],
  },
];
