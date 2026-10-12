import type { Service } from '../types';

/**
 * Services part 4: dental services added from the 2026-10-13 keyword plan.
 * Credentialing, verification, claims, AR, small practices, virtual
 * assistants, medical cross coding and PPO fee negotiation support.
 */
export const servicesPart4: Service[] = [
  /* ------------------------------------------------------------------ */
  /*  Dental credentialing                                               */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-credentialing",
    name: "Dental Credentialing",
    shortName: "Dental Credentialing",
    category: "dental",
    icon: "BadgeCheck",
    summary:
      "Applications, CAQH upkeep, Medicaid dental enrollment and recredentialing so your dentists can join and stay in the networks you choose.",
    definition:
      "Dental credentialing services prepare and track the applications a dentist needs to join dental insurance networks, including PPO, DHMO and Medicaid dental programs. The work covers gathering licenses and documents, maintaining CAQH ProView profiles where carriers use them, linking individual and group NPIs to the right tax ID, and following each application until an effective date is confirmed.",
    intro: [
      "Before a carrier will pay a dentist as in-network, that dentist has to be credentialed and contracted with the plan, and in many cases linked to the practice's group record and tax ID. Insurance credentialing for dentists looks simple from the outside, but each carrier has its own application, its own document list and its own way of handling associates, new locations and ownership changes. A missing malpractice certificate or an expired sedation permit can stall an application for weeks without anyone noticing.",
      "Our dental credentialing services keep that paperwork organized. We collect your licenses, DEA registration, malpractice coverage, W-9 and NPI details once, keep CAQH ProView current for carriers that rely on it, and submit each network application in the format the carrier asks for. We also handle state Medicaid dental enrollment and the dental benefit administrators that manage Medicaid and CHIP dental programs in many states.",
      "Every application is tracked to a confirmed effective date, and that date is shared with your front office so claims are not sent as in-network before the contract is active. Recredentialing and document expirations are tracked on a calendar so existing participation does not lapse.",
    ],
    scope: [
      "Credentialing new dentists, associates and specialists with PPO, DHMO and indemnity carriers",
      "Creating, updating and reattesting CAQH ProView profiles for carriers that use them",
      "Confirming Type 1 (individual) and Type 2 (organization) NPI records and NPPES details",
      "State Medicaid and CHIP dental enrollment, including dental benefit administrator applications",
      "Linking dentists to group contracts, tax IDs and each office location",
      "Address, ownership, tax ID and practice name changes with existing carriers",
      "Recredentialing and expiration tracking for licenses, DEA, sedation permits and malpractice",
      "Status follow-up with carriers and a shared tracker showing where each application stands",
      "Confirming effective dates and fee schedules once contracts are loaded",
    ],
    workflow: [
      {
        title: "Collect documents",
        detail:
          "We gather licenses, DEA, malpractice declarations, W-9, NPI details, work history and permits, and flag anything expired or close to expiring.",
      },
      {
        title: "Set up profiles",
        detail:
          "CAQH ProView and NPPES records are created or corrected so the information carriers pull matches your application.",
      },
      {
        title: "Submit applications",
        detail:
          "Each carrier or Medicaid program receives its own application and contract request, submitted through its portal, by email or by mail.",
      },
      {
        title: "Follow up",
        detail:
          "Open applications are checked with carriers on a regular schedule, and requests for missing items are answered quickly.",
      },
      {
        title: "Confirm and hand off",
        detail:
          "Effective dates, provider IDs and fee schedules are recorded and shared with your front office and billing team.",
      },
      {
        title: "Maintain",
        detail:
          "CAQH reattestations, recredentialing cycles and document expirations are tracked so participation stays active.",
      },
    ],
    benefits: [
      {
        title: "Fewer out-of-network surprises",
        detail:
          "Tracking each application to a confirmed effective date is designed to keep claims from going out as in-network too early.",
      },
      {
        title: "Smoother onboarding for new dentists",
        detail:
          "Starting applications as soon as an associate is hired aims to shorten the gap before they can see patients in-network.",
      },
      {
        title: "Less lapsed participation",
        detail:
          "A calendar of reattestations and expirations can help prevent terminations caused by missed paperwork.",
      },
      {
        title: "One clear status view",
        detail:
          "A shared tracker can help your office manager answer the question of which dentist is in which network without calling carriers.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "orthodontics",
      "endodontics",
      "periodontics",
      "oral-surgery",
      "pediatric-dentistry",
      "prosthodontics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "Do dentists need CAQH for dental credentialing?",
        a: "Some dental carriers use CAQH ProView and some do not. Several large dental networks pull data from CAQH, while others rely on their own applications or a credentialing vendor. Keeping a complete, recently attested CAQH profile is still useful because it speeds up the carriers that do use it and keeps your documents in one place.",
      },
      {
        q: "What is the difference between a Type 1 and Type 2 NPI for a dental practice?",
        a: "A Type 1 NPI belongs to the individual dentist and stays with them for life, while a Type 2 NPI belongs to an organization such as an incorporated practice. Many carriers expect claims from an incorporated practice to show the group NPI as the billing provider and the dentist's individual NPI as the treating provider, so both must be linked correctly.",
      },
      {
        q: "Can a new associate dentist see patients before credentialing is finished?",
        a: "An associate can usually see patients, but claims may be paid out-of-network or denied until the carrier confirms an effective date. Some carriers allow retroactive effective dates and many do not. Practices often decide case by case whether to schedule insured patients with a new associate, so knowing the status of each application helps with that decision.",
      },
      {
        q: "How does Medicaid dental enrollment work?",
        a: "Medicaid dental enrollment starts with the state Medicaid program, and in many states it also requires a separate application with the dental benefit administrator or managed care plan that runs the dental program. Requirements vary by state and can include site visits, fingerprinting for owners and ordering or referring rules. We follow each state's process and track every step.",
      },
      {
        q: "How often do dentists need to be recredentialed?",
        a: "Most dental carriers recredential participating dentists on a regular cycle, often every few years, and CAQH ProView asks for reattestation more frequently. Licenses, DEA registrations, sedation permits and malpractice policies also expire on their own schedules. Missing any of these can lead to suspended or terminated participation, which is why we track them on one calendar.",
      },
    ],
    relatedTools: ["credentialing-checklist", "npi-lookup"],
    relatedServices: [
      "dental-billing",
      "dental-ppo-negotiation",
      "provider-enrollment",
      "medical-credentialing",
      "dental-insurance-verification",
    ],
    seoTitle: "Dental Credentialing Services for Dentists",
    metaDescription:
      "Dental credentialing services: PPO and Medicaid applications, CAQH upkeep, NPI linking and recredentialing tracked to confirmed effective dates.",
    keywords: [
      "dental credentialing services",
      "insurance credentialing for dentists",
      "dental insurance credentialing",
      "dentist CAQH",
      "Medicaid dental enrollment",
      "dental recredentialing",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental insurance verification                                      */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-insurance-verification",
    name: "Dental Insurance Verification",
    shortName: "Dental Verification",
    category: "dental",
    icon: "ShieldCheck",
    summary:
      "Full breakdowns of dental benefits before each visit: maximums, frequencies, waiting periods, history and downgrades, noted in your PMS.",
    definition:
      "Dental insurance verification services confirm a patient's active dental coverage and break down the plan's benefits before an appointment. A complete check covers plan type, deductibles, annual and lifetime maximums, coinsurance by category, frequency limits, procedure history, waiting periods, missing tooth clauses, age limits and alternate benefit rules, so treatment estimates reflect how the plan actually pays.",
    intro: [
      "A dental eligibility response that says \"active\" is only the start. Two patients with the same carrier can have completely different plans: one may cover two cleanings per benefit year with no waiting period, while another excludes major services for the first twelve months and downgrades posterior composites. If those details are not known before the appointment, the estimate is wrong and the patient balance becomes a conversation nobody wants to have.",
      "Our dental insurance verification services build a full benefit breakdown for new patients and refresh it for returning patients on a schedule you choose. We use the electronic eligibility response first, then carrier portals or phone calls to fill in what the response leaves out, such as procedure history, frequency details and alternate benefit provisions.",
      "We work inside your practice management system (for example Dentrix, Open Dental, Eaglesoft or Curve Dental), so the breakdown lands where your team already looks: in the insurance plan record, the patient notes and the coverage table that drives treatment plan estimates.",
    ],
    scope: [
      "Confirming active coverage, subscriber, member ID, group number and plan type (PPO, DHMO, indemnity or Medicaid)",
      "Checking assigned office for DHMO patients so visits are scheduled at the right location",
      "Deductibles, annual maximum and remaining maximum, and lifetime orthodontic maximum",
      "Coinsurance by category: preventive, basic, major, endodontics, periodontics, oral surgery and orthodontics",
      "Frequency limits and procedure history for exams, cleanings, radiographs, fluoride, perio maintenance and crowns",
      "Waiting periods, missing tooth clauses, replacement rules and age limits for sealants, fluoride and orthodontics",
      "Alternate benefit and downgrade provisions, such as composite to amalgam",
      "Coordination of benefits order for patients with two dental plans",
      "Updating plan records, coverage tables and fee schedule assignments in your PMS",
    ],
    workflow: [
      {
        title: "Pull the schedule",
        detail:
          "We review upcoming appointments a few days ahead and list new patients, plan changes and anyone due for a refresh.",
      },
      {
        title: "Run eligibility",
        detail:
          "Electronic eligibility is checked first to confirm the plan is active and the member details are correct.",
      },
      {
        title: "Complete the breakdown",
        detail:
          "Portals and carrier calls fill in history, frequencies, waiting periods, downgrades and remaining maximums.",
      },
      {
        title: "Update your system",
        detail:
          "Benefits are entered into the insurance plan and patient record so treatment estimates calculate from current data.",
      },
      {
        title: "Flag issues",
        detail:
          "Inactive coverage, wrong assigned office, maxed-out benefits or missing information are flagged for your front desk before the visit.",
      },
    ],
    benefits: [
      {
        title: "More realistic estimates",
        detail:
          "Knowing frequencies, maximums and downgrades in advance is designed to make the patient portion quoted at the chair closer to what the EOB shows.",
      },
      {
        title: "Fewer frequency denials",
        detail:
          "Checking procedure history before scheduling aims to reduce claims denied because a service was already used this period.",
      },
      {
        title: "Better treatment conversations",
        detail:
          "A clear breakdown can help your team discuss timing of major work, such as waiting for a new benefit year or a waiting period to end.",
      },
      {
        title: "Shorter front desk call time",
        detail:
          "Moving carrier calls to a remote team can help your front desk spend more time with patients in the office.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "pediatric-dentistry",
      "orthodontics",
      "periodontics",
      "endodontics",
      "prosthodontics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What should a dental insurance verification include?",
        a: "A dental insurance verification should include active coverage, plan type, deductibles, annual and remaining maximums, coinsurance by category, frequency limits, procedure history, waiting periods, missing tooth clauses, age limits and alternate benefit rules. For orthodontic patients it should also cover the lifetime ortho maximum and payment schedule. Our dental insurance verification checklist lists each item.",
      },
      {
        q: "Why is an electronic eligibility check not enough for dental plans?",
        a: "Electronic eligibility responses often confirm that coverage is active without returning the details dental offices need, such as procedure history, frequency limits, downgrades or missing tooth clauses. Response detail varies widely by carrier. That is why a complete breakdown usually combines the electronic check with carrier portals and, when needed, a phone call.",
      },
      {
        q: "How far ahead of the appointment should dental benefits be verified?",
        a: "Many offices verify dental benefits two to three business days before the appointment. That gives time to resolve inactive coverage or a wrong assigned office while the patient can still be reached, but it is close enough that the plan details and remaining maximum are still current. The right window depends on your schedule and patient mix.",
      },
      {
        q: "What is the difference between a dental PPO and a DHMO?",
        a: "A dental PPO lets patients see in-network or out-of-network dentists, with the plan paying a percentage of a contracted fee. A DHMO usually assigns each member to a specific office and pays that office a set amount per member, with patients owing listed copayments. Verifying the assigned office is essential for DHMO patients.",
      },
      {
        q: "Do you verify benefits for patients with two dental plans?",
        a: "Yes, we confirm both plans and determine which is primary and which is secondary. For dependent children, many plans follow the birthday rule, and plans also differ in how they coordinate, for example standard coordination versus non-duplication of benefits. We note the order and the coordination method so estimates and secondary claims are set up correctly.",
      },
    ],
    relatedTools: [
      "dental-insurance-verification-checklist",
      "dental-insurance-collection-calculator",
      "dental-denial-rate-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-claims-processing",
      "dental-virtual-assistant",
      "benefits-verification",
      "insurance-eligibility-verification",
    ],
    seoTitle: "Dental Insurance Verification Services",
    metaDescription:
      "Dental insurance verification services that check maximums, frequencies, history, waiting periods and downgrades before each visit, entered in your PMS.",
    keywords: [
      "dental insurance verification services",
      "dental benefits verification",
      "dental eligibility verification",
      "dental insurance breakdown",
      "outsourced dental insurance verification",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental claims processing                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-claims-processing",
    name: "Dental Claims Processing",
    shortName: "Dental Claims",
    category: "dental",
    icon: "Send",
    summary:
      "Daily dental claim creation, attachments, narratives, 837D submission, rejection fixes and secondary claims, worked inside your PMS.",
    definition:
      "Dental claims processing services prepare, submit and track dental insurance claims from the day of service until the carrier responds. The work includes reviewing CDT codes, tooth numbers, surfaces and quadrants, attaching radiographs, periodontal charts and narratives, sending claims electronically as 837D transactions or on the ADA Dental Claim Form, correcting rejections and filing secondary claims.",
    intro: [
      "A dental claim carries details a medical claim never does: tooth numbers, surfaces, quadrants or arches, prior placement dates for crowns and bridges, and frequently a radiograph or periodontal chart. When one of those is missing or inconsistent, the carrier pends the claim and asks for more information, and the payment clock starts over.",
      "Our dental claims processing services check each day's procedures before they go out. We confirm that the CDT code matches the clinical note, that the tooth and surface data are complete, and that the attachments and narrative a carrier usually requests for that procedure are included. Claims are sent through your clearinghouse as 837D transactions, and paper ADA claim forms are used only when a carrier requires them.",
      "After submission, we watch clearinghouse and carrier acknowledgments, fix rejections the same way every time, and send secondary claims with the primary EOB once the primary carrier pays.",
    ],
    scope: [
      "Daily review of completed procedures and unsent claims in your practice management system",
      "Checking CDT codes, tooth numbers, surfaces, quadrants and arches against clinical notes",
      "Preparing attachments: radiographs, intraoral photos, periodontal charting and narratives",
      "Adding prior placement dates and replacement information for crowns, bridges and dentures",
      "Electronic submission as 837D through your clearinghouse, with ADA claim forms when required",
      "Working clearinghouse and carrier rejections and resubmitting corrected claims",
      "Submitting predeterminations for major treatment and tracking carrier responses",
      "Filing secondary claims with primary EOB details under the correct coordination rules",
      "Tracking claims with no acknowledgment or no response from the carrier",
    ],
    workflow: [
      {
        title: "Review the day",
        detail:
          "Completed procedures are matched to clinical notes so every billable service is on a claim and no claim goes out with missing data.",
      },
      {
        title: "Build the claim",
        detail:
          "Codes, tooth and surface data, provider and billing details are checked, and the right attachments and narrative are added.",
      },
      {
        title: "Submit",
        detail:
          "Claims are sent electronically through your clearinghouse, with attachment reference numbers linked where the carrier requires them.",
      },
      {
        title: "Clear rejections",
        detail:
          "Clearinghouse and carrier acknowledgments are reviewed, and rejected claims are corrected and resent.",
      },
      {
        title: "Send secondaries",
        detail:
          "When the primary pays, the secondary claim goes out with the primary payment and adjustment details.",
      },
      {
        title: "Hand off to follow-up",
        detail:
          "Claims without a response after the carrier's usual processing time move to the accounts receivable worklist.",
      },
    ],
    benefits: [
      {
        title: "Fewer requests for information",
        detail:
          "Including the radiographs, charting and narratives carriers usually ask for is designed to reduce pended claims.",
      },
      {
        title: "Cleaner first submissions",
        detail:
          "Checking tooth, surface and history data before sending aims to cut down on rejections and resubmissions.",
      },
      {
        title: "Secondary claims that go out on time",
        detail:
          "Filing secondary claims as soon as the primary pays can help prevent secondary balances from aging unnoticed.",
      },
      {
        title: "A predictable daily routine",
        detail:
          "A set daily process can help make sure claims are sent consistently, even when your front office is short-staffed.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "endodontics",
      "periodontics",
      "oral-surgery",
      "prosthodontics",
      "pediatric-dentistry",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What is an 837D dental claim?",
        a: "An 837D is the HIPAA standard electronic transaction for dental claims, defined by X12. It carries the same information as the paper ADA Dental Claim Form, including CDT codes, tooth numbers, surfaces and provider details, in a format clearinghouses and carriers can process automatically. Most dental claims today are sent as 837D transactions rather than on paper.",
      },
      {
        q: "Which dental procedures usually need attachments?",
        a: "Attachments are commonly requested for crowns, onlays, bridges, implants, scaling and root planing, some endodontic treatment and many oral surgery procedures. Typical attachments include pre-operative radiographs, periodontal charting, intraoral photos and a narrative explaining why the treatment was needed. Requirements differ by carrier and plan, so we keep notes on what each carrier tends to request.",
      },
      {
        q: "What makes a good dental claim narrative?",
        a: "A good dental claim narrative briefly states the clinical reason for the treatment in terms the carrier's reviewer can match to the radiograph or chart. It might note the extent of decay or fracture, existing restorations, periodontal pocket depths or symptoms. It should be specific to the tooth and the patient, and it should reflect what the dentist documented, never add to it.",
      },
      {
        q: "Is a predetermination the same as a prior authorization?",
        a: "No, a dental predetermination is usually an optional estimate of what the plan expects to pay, while a prior authorization is a required approval before treatment. Most commercial dental plans use predeterminations, while some Medicaid dental programs and medical plans require prior authorization. A predetermination is not a guarantee of payment, since eligibility and remaining maximums can change.",
      },
      {
        q: "How are secondary dental claims handled?",
        a: "Secondary dental claims are sent after the primary carrier pays, with the primary payment and adjustment details included. The secondary carrier then applies its own coordination rules, which may be standard coordination, non-duplication or carve-out. Because each method can produce a different secondary payment, we note the coordination method during verification and check the secondary EOB against it.",
      },
    ],
    relatedTools: [
      "claim-submission-checklist",
      "dental-denial-rate-calculator",
      "clean-claim-rate-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-insurance-verification",
      "dental-accounts-receivable",
      "claims-submission",
      "clearinghouse-coordination",
    ],
    seoTitle: "Dental Claims Processing Services",
    metaDescription:
      "Dental claims processing services: CDT and tooth data checks, attachments and narratives, 837D submission, rejection fixes and secondary claims.",
    keywords: [
      "dental claims processing services",
      "dental claim submission",
      "837D dental claims",
      "dental claim attachments",
      "dental claim narratives",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental accounts receivable                                         */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-accounts-receivable",
    name: "Dental Accounts Receivable Management",
    shortName: "Dental AR Management",
    category: "dental",
    icon: "Wallet",
    summary:
      "Working open dental insurance claims by carrier and age, resolving denials and downgrades, and cleaning up patient balances and credits.",
    definition:
      "Dental accounts receivable management is the ongoing work of following up on unpaid dental insurance claims and patient balances until each one is paid, corrected, appealed or properly adjusted. It includes working aging reports by carrier, resolving denials and pended claims, reviewing downgrades, handling credit balances and keeping the ledger accurate in the practice management system.",
    intro: [
      "Dental AR tends to grow quietly. A claim pends for a missing radiograph, the request letter is scanned but never worked, and ninety days later the claim is still open. Meanwhile, patient ledgers carry estimates that never matched the EOB, and credit balances from overpayments sit untouched. None of it is dramatic, but together it can tie up a meaningful share of what the practice has already earned.",
      "Our dental accounts receivable management service works the insurance aging report by carrier and age, starting with claims closest to timely filing limits and the highest balances. We check claim status through carrier portals and calls, send the documentation carriers ask for, appeal denials that the clinical record supports, and record what we find in the claim notes so your team can see the history.",
      "We also review patient balances and credit balances. Estimates that missed the EOB are corrected, and overpayments are identified and handled according to your policies and carrier refund requirements, with every write-off or refund approved by the practice before it is posted.",
    ],
    scope: [
      "Working insurance aging reports by carrier and age bucket (0-30, 31-60, 61-90, 90+)",
      "Claim status checks through carrier portals, clearinghouse reports and phone calls",
      "Responding to requests for radiographs, charting, narratives and other information",
      "Reviewing denials and downgrades and preparing appeals the documentation supports",
      "Identifying claims that were never sent, are on hold or were sent to the wrong carrier",
      "Reconciling patient balances where estimates differed from the EOB",
      "Identifying credit balances and overpayments and preparing refunds for practice approval",
      "Recommending adjustments and write-offs for the practice to review and approve",
      "Monthly AR summary by carrier, age and status",
    ],
    workflow: [
      {
        title: "Baseline the AR",
        detail:
          "We pull insurance and patient aging, unsent claims and credit balances to see the full picture before work begins.",
      },
      {
        title: "Prioritize",
        detail:
          "Claims nearing timely filing limits and higher balances are worked first, then the rest by carrier and age.",
      },
      {
        title: "Work each claim",
        detail:
          "Status is checked, missing items are sent, corrections are resubmitted and supported denials are appealed.",
      },
      {
        title: "Clean up ledgers",
        detail:
          "Patient balances and credits are reviewed, and recommended adjustments or refunds go to the practice for approval.",
      },
      {
        title: "Report and repeat",
        detail:
          "A monthly summary shows what was resolved, what is pending and which carriers or causes keep coming back.",
      },
    ],
    benefits: [
      {
        title: "Fewer claims lost to timely filing",
        detail:
          "Working the oldest claims first is designed to catch them before carrier filing limits pass.",
      },
      {
        title: "Cleaner patient ledgers",
        detail:
          "Correcting balances that never matched the EOB aims to reduce confusing statements and patient calls.",
      },
      {
        title: "Visibility into problem carriers",
        detail:
          "Tracking AR by carrier and cause can help you see which plans or procedures slow your cash flow.",
      },
      {
        title: "Credit balances under control",
        detail:
          "Reviewing overpayments regularly can help the practice resolve them on its own schedule rather than after a carrier audit.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "orthodontics",
      "periodontics",
      "endodontics",
      "oral-surgery",
      "prosthodontics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What does dental accounts receivable management include?",
        a: "Dental accounts receivable management includes following up on unpaid insurance claims, responding to carrier requests, appealing supported denials, reviewing downgrades and cleaning up patient balances and credits. It also covers finding claims that were never sent or were sent to the wrong carrier. The goal is that every open item has a clear status and a next step.",
      },
      {
        q: "Can you clean up old dental AR from before you started?",
        a: "Yes, a one-time cleanup of older dental AR is a common starting point. We sort the old balances into claims that can still be worked, claims past timely filing that need a practice decision, and patient balances that need correction. Some older claims may no longer be collectible, and any write-off is the practice's decision.",
      },
      {
        q: "Should predeterminations show on the insurance aging report?",
        a: "Predeterminations generally should not be counted as receivables because no service has been performed and no payment is owed yet. Some practice management systems list them alongside claims, which can make insurance AR look larger than it is. We separate open predeterminations from actual claims so the aging report reflects real outstanding money.",
      },
      {
        q: "How do you handle dental insurance overpayments?",
        a: "We identify dental insurance overpayments from the ledger and EOBs, confirm the cause, and prepare a refund or offset recommendation for the practice to approve. Carriers have their own refund procedures and some recover overpayments by offsetting future payments. Handling credit balances promptly can help reduce the risk of findings if a carrier reviews your account.",
      },
    ],
    relatedTools: [
      "dental-ar-aging-calculator",
      "dental-insurance-collection-calculator",
      "denial-appeal-checklist",
      "days-in-ar-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-claims-processing",
      "accounts-receivable-management",
      "denial-appeals",
      "payment-posting",
    ],
    seoTitle: "Dental Accounts Receivable Management Services",
    metaDescription:
      "Dental accounts receivable management: carrier-by-carrier claim follow-up, denial and downgrade review, patient balance cleanup and credit balance review.",
    keywords: [
      "dental accounts receivable management",
      "dental AR follow-up",
      "dental insurance aging",
      "dental AR cleanup",
      "dental credit balances",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental billing for small practices                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-billing-small-practices",
    name: "Dental Billing for Small Practices",
    shortName: "Small Practice Billing",
    category: "dental",
    icon: "Building2",
    summary:
      "Insurance verification, claims, posting and follow-up for solo and small dental offices that rely on one or two front desk staff.",
    definition:
      "A dental billing company for small practices handles insurance billing tasks that a solo or small dental office would otherwise squeeze between patient check-ins. Typical work includes verifying benefits, sending claims with attachments, posting EOBs and ERAs, following up on unpaid claims and preparing patient statements, all inside the office's own practice management system.",
    intro: [
      "In a small dental office, billing often belongs to whoever is at the front desk. That person also answers the phone, checks patients in, schedules recall and collects copays. Insurance work gets done in the gaps, and when someone is out sick or on vacation, claims and follow-up simply pause.",
      "As a dental billing company for small practices, we take on the insurance tasks that need focused time: verifying benefits ahead of appointments, sending claims with the right attachments, posting payments and working unpaid claims. We work inside your practice management system (for example Dentrix, Open Dental, Eaglesoft or Curve Dental), so your records stay in one place and your team can see everything we do.",
      "You choose how much to hand off. Some practices start with verification and claims only, while others move the full insurance cycle to us and keep patient conversations in the office. The arrangement is designed to adjust as the practice adds a hygienist, an associate or a second location.",
    ],
    scope: [
      "Benefit verification for scheduled patients, entered in your PMS",
      "Daily claim submission with radiographs, charting and narratives",
      "Predetermination submission and tracking for major treatment",
      "EOB and ERA posting, including downgrades and write-offs to contracted fees",
      "Insurance claim follow-up by carrier and age",
      "Patient statement preparation and balance review",
      "Coverage during staff vacations, leave or turnover",
      "A simple monthly summary of claims, payments and open AR for the dentist-owner",
    ],
    workflow: [
      {
        title: "Free consultation",
        detail:
          "We talk through your current process, your carriers and which tasks you want to keep in the office.",
      },
      {
        title: "Access and setup",
        detail:
          "We sign a Business Associate Agreement, receive user access to your PMS and clearinghouse, and learn your office's conventions.",
      },
      {
        title: "Daily insurance work",
        detail:
          "Verification, claims and posting run on a set schedule so work does not depend on how busy the front desk is.",
      },
      {
        title: "Follow-up",
        detail:
          "Unpaid and denied claims are worked by carrier and age, with notes left on each claim.",
      },
      {
        title: "Monthly check-in",
        detail:
          "You get a short summary and a call to review open items, decisions needed and any process changes.",
      },
    ],
    benefits: [
      {
        title: "Billing that does not pause",
        detail:
          "A dedicated remote team is designed to keep claims and follow-up moving when office staff are out.",
      },
      {
        title: "More front desk attention for patients",
        detail:
          "Removing carrier calls and posting from the front desk can help staff focus on check-in, scheduling and treatment discussions.",
      },
      {
        title: "A clear view for the owner",
        detail:
          "A monthly summary aims to give the dentist-owner a simple picture of claims, payments and open balances.",
      },
      {
        title: "Room to grow",
        detail:
          "The scope can expand as the practice adds providers, so billing support grows with the office instead of requiring a new hire.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "pediatric-dentistry",
      "endodontics",
      "periodontics",
      "orthodontics",
      "prosthodontics",
    ],
    faqs: [
      {
        q: "Is outsourced dental billing practical for a solo dentist?",
        a: "Yes, outsourced dental billing can be practical for a solo dentist, especially when one front desk person handles both patients and insurance. The decision usually comes down to how much time insurance work takes, how often claims fall behind and what an additional hire would cost. Our dental billing cost calculator can help you compare the options.",
      },
      {
        q: "Will we have to change our practice management software?",
        a: "No, we work inside the practice management system you already use, for example Dentrix, Open Dental, Eaglesoft or Curve Dental. You give our team user access, and claims, notes and payments stay in your own system. That way your staff can see the status of any claim at any time.",
      },
      {
        q: "Can we keep some billing tasks in the office?",
        a: "Yes, many small practices keep patient-facing work such as collecting copays, presenting treatment plans and taking payments in the office. They hand off verification, claims, posting and insurance follow-up. We agree on who does what at the start and adjust the split as your needs change.",
      },
      {
        q: "How do you protect our patient data?",
        a: "We sign a Business Associate Agreement before accessing any patient data, and our team works inside your systems using individual user accounts rather than shared logins. Access can be limited to the functions the work requires, and you can review or remove it at any time. We do not copy patient records into outside systems for billing work.",
      },
    ],
    relatedTools: [
      "dental-billing-cost-calculator",
      "dental-practice-roi-calculator",
      "dental-practice-revenue-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-virtual-assistant",
      "dental-insurance-verification",
      "dental-claims-processing",
      "dental-accounts-receivable",
    ],
    seoTitle: "Dental Billing Company for Small Practices",
    metaDescription:
      "A dental billing company for small practices: benefit checks, claims, posting and follow-up for solo and small offices, done inside your own PMS.",
    keywords: [
      "dental billing company for small practices",
      "dental billing for solo dentists",
      "small dental office billing",
      "outsourced dental billing small practice",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental virtual assistant                                           */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-virtual-assistant",
    name: "Dental Virtual Assistant",
    shortName: "Dental Virtual Assistant",
    category: "dental",
    icon: "Headset",
    summary:
      "Remote dental team members for verification, billing, scheduling support and office administration, working in your systems.",
    definition:
      "Dental virtual assistant services provide remote team members who handle administrative and insurance work for a dental office. Depending on the role, a virtual assistant may verify benefits, submit and follow up on claims, post payments, confirm appointments, manage recall lists, process insurance correspondence or prepare daily reports for the office manager.",
    intro: [
      "Not every task in a dental office needs someone standing at the front desk. Insurance calls, claim follow-up, payment posting, recall lists and appointment confirmations can all be done remotely by someone who knows dental workflows. Dental virtual assistant services give your office that extra capacity without adding a desk, a computer or another in-office hire.",
      "The role can be shaped to what your office needs. A remote dental billing specialist focuses on verification, claims, posting and AR. An administrative assistant handles confirmations, recall, unscheduled treatment lists and incoming insurance mail. A virtual dental office manager role supports the owner and office manager with daily huddle numbers, schedule reviews, AR summaries and checklists that keep the rest of the team on track.",
      "Every assistant works inside your practice management system (for example Dentrix, Open Dental, Eaglesoft or Curve Dental) with their own user login, follows the processes your office agrees on, and leaves notes where your team can see them.",
    ],
    scope: [
      "Dental benefit verification and plan updates for upcoming appointments",
      "Claim submission, attachments and secondary claims",
      "EOB and ERA payment posting and insurance correspondence processing",
      "Insurance claim follow-up and denial work",
      "Appointment confirmations, recall lists and unscheduled treatment follow-up",
      "Patient statement preparation and balance questions routed to your office",
      "Daily huddle reports, schedule production reviews and end-of-day checks",
      "Office manager support: task lists, AR summaries and process documentation",
    ],
    workflow: [
      {
        title: "Define the role",
        detail:
          "We agree on the tasks, hours, systems and reporting the assistant will cover, and what stays in the office.",
      },
      {
        title: "Set up access",
        detail:
          "We sign a Business Associate Agreement and the assistant receives individual logins to your PMS, clearinghouse and portals.",
      },
      {
        title: "Learn your office",
        detail:
          "The assistant learns your fee schedules, carrier list, scheduling rules and how your team prefers notes and handoffs.",
      },
      {
        title: "Daily work",
        detail:
          "Tasks follow an agreed checklist, with questions sent to a named contact in your office.",
      },
      {
        title: "Review",
        detail:
          "Regular check-ins review completed work, open items and any changes to the role.",
      },
    ],
    benefits: [
      {
        title: "Extra capacity without extra space",
        detail:
          "A remote assistant is designed to take on administrative work without needing a workstation in the office.",
      },
      {
        title: "Consistent insurance follow-up",
        detail:
          "Having someone assigned to claims and verification aims to keep that work from slipping on busy days.",
      },
      {
        title: "Support for the office manager",
        detail:
          "Daily reports and task tracking can help the office manager spend more time on people and patients.",
      },
      {
        title: "Flexible scope",
        detail:
          "Tasks can be added or removed as the office's needs change, without restructuring the in-office team.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "pediatric-dentistry",
      "orthodontics",
      "periodontics",
      "endodontics",
      "oral-surgery",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What does a dental virtual assistant do?",
        a: "A dental virtual assistant handles administrative and insurance tasks for a dental office from a remote location. Common tasks include verifying benefits, sending and following up on claims, posting payments, confirming appointments, working recall and unscheduled treatment lists, and preparing reports. The exact role is agreed with your office, and clinical decisions always stay with your dentists and staff.",
      },
      {
        q: "What is a remote dental billing specialist?",
        a: "A remote dental billing specialist is a virtual team member focused on the insurance side of the office: verification, claim submission with attachments, payment posting, and follow-up on unpaid or denied claims. They work in your practice management system and clearinghouse through their own login, so their work is visible to your team just like an in-office biller.",
      },
      {
        q: "Can a virtual dental office manager replace our in-office manager?",
        a: "A virtual dental office manager role is designed to support your in-office manager or owner, not to replace someone who leads the team in person. The virtual role can prepare huddle numbers, review the schedule, track AR and open tasks, and keep checklists current. Staff supervision, patient issues and hiring decisions stay with the people in your office.",
      },
      {
        q: "Will a dental virtual assistant answer our phones?",
        a: "Phone coverage depends on the role you choose and your phone system. Many offices keep incoming patient calls in the office and use the virtual assistant for outbound work such as insurance calls, confirmations and recall. If your phone system supports remote users, inbound call support can be discussed during the free consultation.",
      },
      {
        q: "How do you keep patient information secure with a remote assistant?",
        a: "We sign a Business Associate Agreement before any access to patient data, and each assistant uses an individual login with the permissions the role requires. Work is done inside your systems rather than in outside spreadsheets or email. You keep control of access and can change or remove it at any time.",
      },
    ],
    relatedTools: [
      "dental-insurance-verification-checklist",
      "billing-staffing-cost-calculator",
      "dental-billing-cost-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-billing-small-practices",
      "dental-insurance-verification",
      "virtual-medical-assistant",
      "appointment-scheduling",
    ],
    seoTitle: "Dental Virtual Assistant Services",
    metaDescription:
      "Dental virtual assistant services: remote billing specialists, insurance verification, scheduling support and virtual office manager help in your PMS.",
    keywords: [
      "dental virtual assistant services",
      "remote dental billing specialist",
      "virtual dental office manager",
      "dental virtual assistant",
      "remote dental front office",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental medical cross coding                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-medical-cross-coding",
    name: "Dental Medical Cross Coding",
    shortName: "Medical Cross Coding",
    category: "dental",
    icon: "Stethoscope",
    summary:
      "Billing medical plans for oral surgery, trauma, sleep apnea appliances, TMJ and qualifying implant cases on the CMS-1500 with ICD-10 codes.",
    definition:
      "Dental medical cross coding is the process of billing a patient's medical insurance for dental office services that are medically necessary, using CPT or HCPCS procedure codes, ICD-10-CM diagnosis codes and the CMS-1500 claim form instead of CDT codes and the ADA form. Common cases include oral surgery, trauma, biopsies, obstructive sleep apnea appliances and some TMJ and implant treatment.",
    intro: [
      "Some care delivered in a dental office is medical in nature. An oral surgeon removing a lesion, a general dentist repairing teeth after a fall, or a dentist delivering an oral appliance for diagnosed obstructive sleep apnea may all be treating a medical condition. In those situations the patient's medical plan may be responsible, either as primary or ahead of the dental plan, and billing only the dental plan can leave coverage unused.",
      "Dental medical cross coding requires a different claim and a different set of rules. Our team prepares CMS-1500 claims with CPT or HCPCS codes and ICD-10-CM diagnoses that match the dentist's documentation, checks medical eligibility and authorization requirements, and assembles the records the medical plan expects, such as a physician's sleep study diagnosis, imaging, operative notes or a letter of medical necessity. That includes dental implant medical billing for qualifying cases, such as tooth loss from trauma or tumor resection, and TMJ medical billing where the plan covers TMJ treatment.",
      "Medical coverage for these services is never automatic. Many medical plans exclude dental services, some exclude TMJ, and approval often depends on documentation and prior authorization. Our role is to identify cases worth billing, prepare clean claims and follow them through, while coding decisions stay grounded in what the dentist recorded.",
    ],
    scope: [
      "Screening scheduled cases for possible medical coverage: oral surgery, trauma, pathology, sleep apnea, TMJ and implants",
      "Medical eligibility checks and prior authorization requests with the patient's medical plan",
      "Selecting CPT, HCPCS and ICD-10-CM codes supported by the dentist's documentation",
      "Preparing CMS-1500 claims, including place of service, rendering and billing provider details",
      "Assembling records: operative notes, imaging, sleep study reports, physician referrals and letters of medical necessity",
      "Coordinating medical and dental coverage so each plan is billed in the correct order",
      "Following up on medical claim denials, requests for records and appeals",
      "Flagging when medical network enrollment or DMEPOS supplier enrollment may be required",
    ],
    workflow: [
      {
        title: "Identify the case",
        detail:
          "Treatment plans and referrals are reviewed for services that may be medically necessary, such as trauma repair or sleep apnea appliances.",
      },
      {
        title: "Verify medical coverage",
        detail:
          "Medical eligibility, exclusions, network status and authorization rules are confirmed before treatment.",
      },
      {
        title: "Gather documentation",
        detail:
          "We list the records the plan expects and work with your team and referring physicians to collect them.",
      },
      {
        title: "Code and submit",
        detail:
          "The CMS-1500 claim is prepared with codes supported by the clinical record and sent to the medical plan.",
      },
      {
        title: "Coordinate the dental side",
        detail:
          "Once the medical plan responds, any remaining balance is billed to the dental plan with the medical EOB when appropriate.",
      },
      {
        title: "Follow up and appeal",
        detail:
          "Denials and record requests are worked through the medical plan's reconsideration and appeal process.",
      },
    ],
    benefits: [
      {
        title: "Use of available medical coverage",
        detail:
          "Screening cases for medical necessity is designed to find services that the patient's medical plan may be responsible for.",
      },
      {
        title: "Fewer avoidable medical denials",
        detail:
          "Checking authorization rules and gathering records first aims to reduce denials for missing approval or documentation.",
      },
      {
        title: "Clearer patient estimates",
        detail:
          "Knowing how medical and dental plans will coordinate can help patients understand their likely share before treatment.",
      },
    ],
    practiceTypes: [
      "oral-surgery",
      "general-dentistry",
      "periodontics",
      "prosthodontics",
      "endodontics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "What is dental medical cross coding?",
        a: "Dental medical cross coding means translating a medically necessary dental office service into the medical billing format so it can be billed to the patient's medical plan. That involves CPT or HCPCS procedure codes, ICD-10-CM diagnosis codes and the CMS-1500 claim form. It applies to cases such as oral surgery, trauma, biopsies, sleep apnea appliances and some TMJ treatment.",
      },
      {
        q: "Can dental implants be billed to medical insurance?",
        a: "Dental implants can sometimes be billed to medical insurance, but only in limited situations. Medical plans may consider coverage when teeth were lost because of an accident, tumor removal or a congenital condition, and most require prior authorization and detailed records. Many medical plans exclude implants entirely, so verifying the specific plan's policy before treatment is essential.",
      },
      {
        q: "How does TMJ medical billing work?",
        a: "TMJ medical billing uses ICD-10-CM codes for the documented temporomandibular disorder, CPT or HCPCS codes for the treatment provided, and a CMS-1500 claim to the medical plan. Coverage varies widely: some plans cover TMJ treatment, some cover only surgical care, and others exclude it. Plan language, prior authorization and supporting records all matter.",
      },
      {
        q: "Can a dentist bill medical insurance for a sleep apnea oral appliance?",
        a: "Yes, an oral appliance for obstructive sleep apnea is often billed to medical insurance when the patient has a sleep study and a physician's diagnosis. Plans typically require that diagnosis, a prescription or referral and a fitting record. Medicare treats these appliances as durable medical equipment, so the dentist must be enrolled as a Medicare DMEPOS supplier to bill Medicare.",
      },
      {
        q: "Does the dental plan or the medical plan pay first?",
        a: "For a medically necessary service, the medical plan is usually billed first and the dental plan second, but the order depends on both plans' coordination rules. Some medical plans ask for a dental plan denial before they will consider a claim. We confirm the order with both plans during verification so neither claim is delayed by being sent to the wrong payer.",
      },
    ],
    relatedTools: ["icd-10-code-search", "hcpcs-code-lookup", "prior-authorization-checklist", "denial-appeal-checklist"],
    relatedServices: [
      "dental-billing",
      "medical-coding",
      "prior-authorization",
      "dental-claims-processing",
      "denial-appeals",
    ],
    seoTitle: "Dental Medical Cross Coding Services",
    metaDescription:
      "Dental medical cross coding for oral surgery, trauma, sleep apnea, TMJ and implant cases: CMS-1500 claims with ICD-10 support and prior authorization.",
    keywords: [
      "dental medical cross coding",
      "dental implant medical billing",
      "TMJ medical billing",
      "bill medical insurance for dental procedures",
      "sleep apnea oral appliance billing",
      "dental CMS-1500 billing",
    ],
  },

  /* ------------------------------------------------------------------ */
  /*  Dental PPO negotiation support                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "dental-ppo-negotiation",
    name: "Dental PPO Fee Negotiation Support",
    shortName: "PPO Negotiation Support",
    category: "dental",
    icon: "Handshake",
    summary:
      "Fee schedule analysis, utilization data and prepared proposal letters so the dentist can request better PPO fees from an informed position.",
    definition:
      "Dental fee schedule negotiation support helps a practice prepare to ask dental PPO carriers for updated reimbursement. It includes comparing contracted fees across carriers, measuring which CDT codes and plans drive production, drafting proposal letters and tracking carrier responses. The dentist reviews every proposal, makes each decision and signs any contract or amendment.",
    intro: [
      "Many dental offices have carried the same PPO fee schedules for years while their costs have risen. Some carriers will review a fee schedule on request, others will not, and many offices never ask because they do not have the data organized to make the case. Dental fee schedule negotiation starts with knowing exactly what each plan pays for the procedures you perform most and how much of your production each plan represents.",
      "Our dental PPO negotiation services are a support role. We pull your contracted fees and utilization from your practice management system, compare carriers code by code, identify which plans and procedures matter most, and prepare a proposal and cover letter for the dentist to review. We then send what the dentist approves through the carrier's provider relations channel, track responses and follow-ups, and summarize any counteroffer for the dentist's decision.",
      "We do not promise fee increases. Carriers decide whether to review a fee schedule and what to offer, and some decline. Proposals are built only from your own practice data, and we do not share or coordinate fees between competing practices. The decision to accept an offer, stay in a network, change participation or leave is always the dentist's.",
    ],
    scope: [
      "Collecting current fee schedules and contracts for each PPO carrier and leased network",
      "Code-by-code comparison of contracted fees across carriers for your most frequent CDT codes",
      "Utilization reports showing production, patient counts and visit volume by carrier",
      "Identifying leased or rental network access that may apply a different fee schedule",
      "Drafting proposal letters and supporting summaries for the dentist to review and edit",
      "Submitting approved requests to carrier provider relations and logging each contact",
      "Tracking response timelines, follow-ups and counteroffers",
      "Summarizing offers and participation options so the dentist can decide",
      "Updating fee schedules in your PMS once a signed amendment takes effect",
    ],
    workflow: [
      {
        title: "Gather contracts and fees",
        detail:
          "We collect the contracted fee schedules, contracts and any network leasing information the practice has on file or can request.",
      },
      {
        title: "Analyze utilization",
        detail:
          "Production, procedure volume and patient counts are pulled by carrier so the dentist sees which plans and codes matter most.",
      },
      {
        title: "Compare fees",
        detail:
          "Contracted fees are compared across carriers and against the practice's office fee schedule for the highest-volume codes.",
      },
      {
        title: "Prepare the proposal",
        detail:
          "We draft a proposal and cover letter; the dentist reviews, edits and approves before anything is sent.",
      },
      {
        title: "Submit and track",
        detail:
          "Approved proposals are sent to each carrier, and every response, follow-up and counteroffer is logged.",
      },
      {
        title: "Decide and update",
        detail:
          "The dentist decides on each offer and signs any amendment; we then update the fee schedule in your system from its effective date.",
      },
    ],
    benefits: [
      {
        title: "Decisions based on your own data",
        detail:
          "Seeing production and fees by carrier is designed to show the dentist where each plan stands before any request is made.",
      },
      {
        title: "Organized, professional requests",
        detail:
          "Prepared proposals and letters aim to present the practice's case clearly to carrier provider relations staff.",
      },
      {
        title: "Nothing lost in follow-up",
        detail:
          "Tracking every contact and response can help keep requests from stalling after the first letter.",
      },
      {
        title: "Clearer participation choices",
        detail:
          "A side-by-side view of plans can help the dentist weigh whether to stay in, renegotiate or reconsider a network.",
      },
    ],
    practiceTypes: [
      "general-dentistry",
      "pediatric-dentistry",
      "endodontics",
      "periodontics",
      "orthodontics",
      "prosthodontics",
      "dental-group-practices",
    ],
    faqs: [
      {
        q: "Can dental PPO fee schedules be negotiated?",
        a: "Some dental PPO fee schedules can be negotiated, but it depends on the carrier, the region and the practice. Some carriers review fees on request, others only at set intervals, and some do not negotiate individual fee schedules at all. A well-organized proposal based on your utilization gives the request a fair hearing, but the carrier decides the outcome.",
      },
      {
        q: "What does dental PPO negotiation support include?",
        a: "Dental PPO negotiation support includes gathering your current contracts and fee schedules, analyzing which carriers and CDT codes drive production, comparing fees across plans, drafting proposal letters for the dentist to approve, submitting them and tracking responses. The dentist makes every decision and signs any contract change. We prepare and organize, we do not decide.",
      },
      {
        q: "Do you guarantee higher fees from dental PPO plans?",
        a: "No, we cannot promise higher fees, because each carrier decides whether to review a fee schedule and what it will offer. Some requests lead to an updated schedule, some to a partial change and some to a decline. What we can do is make sure the request is complete, supported by your own data and followed up consistently.",
      },
      {
        q: "What is a leased dental network?",
        a: "A leased or rental dental network is an arrangement where one carrier lets another plan access its contracted dentists and fee schedule. A practice may find it is being paid a PPO fee by a plan it never signed with directly. Reviewing contracts for leasing language helps the dentist understand which fee schedules really apply before negotiating.",
      },
      {
        q: "Should we drop a dental PPO plan if the fees are low?",
        a: "Whether to drop a dental PPO plan is a business decision for the dentist, and the data should inform it rather than make it. Relevant factors include how many active patients use the plan, how much production it represents, the fees for your common procedures and how patients may respond. We provide the analysis and the dentist decides.",
      },
    ],
    relatedTools: [
      "fee-schedule-comparison-calculator",
      "payer-mix-calculator",
      "dental-practice-revenue-calculator",
    ],
    relatedServices: [
      "dental-billing",
      "dental-credentialing",
      "payer-contracting",
      "fee-schedule-analysis",
      "underpayment-identification",
    ],
    seoTitle: "Dental Fee Schedule and PPO Negotiation Services",
    metaDescription:
      "Dental PPO negotiation services and fee schedule negotiation support: fee analysis, utilization data, proposal letters and response tracking for dentists.",
    keywords: [
      "dental PPO negotiation services",
      "dental fee schedule negotiation",
      "dental PPO fee negotiation",
      "dental PPO fee schedule analysis",
      "dental insurance fee negotiation",
    ],
  },
];
