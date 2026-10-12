import type { Service } from '../types';

/**
 * Services part 2: back-end recovery, patient financial work, enrollment,
 * contracting and auditing.
 */
export const servicesPart2: Service[] = [
  /* ------------------------------------------------------------------ */
  /*  Denial management                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "denial-management",
    name: "Denial Management",
    shortName: "Denial Management",
    category: "back-end",
    icon: "ShieldAlert",
    summary: "Work every denied claim before payer deadlines pass, then trace denials back to the intake, coding or billing step that caused them.",
    definition:
      "Denial management is the process of tracking, categorizing and resolving claims that payers refuse to pay, then fixing the upstream causes so the same denials stop recurring. It combines daily work on individual denials, such as corrections, resubmissions and appeals, with trend analysis by payer, reason code, provider and location.",
    intro: [
      "A denied claim is revenue your practice has already earned but has not been paid for. Each one needs someone to read the remittance, understand the reason code, decide whether to correct, resubmit or appeal, and act before the payer's deadline. When that work falls behind, denials quietly age into write-offs.",
      "Working denials one at a time is only half of the job. The same handful of causes (inactive coverage, missing authorizations, modifier errors, diagnosis codes that do not support medical necessity) tend to repeat week after week. Denial management groups denials by cause so your team can fix the intake, coding or charge entry step that produced them.",
      "We work inside your practice management system, EHR and clearinghouse, so every note, corrected claim and appeal stays in your own records. The aim is a denial workflow that is predictable, documented and focused on prevention as much as recovery.",
    ],
    scope: [
      "Daily review of denials from ERAs, EOBs, payer portals and clearinghouse reports",
      "Categorizing each denial by CARC, RARC and group code (CO, PR, OA, PI)",
      "Separating clearinghouse rejections from adjudicated denials and routing each correctly",
      "Preparing corrected claims with the right frequency code (7 for replacement, 8 for void)",
      "Identifying denials that need a formal appeal and handing them to the appeals workflow",
      "Tracking correction, reconsideration and appeal deadlines by payer",
      "Root-cause tagging (eligibility, authorization, coding, documentation, credentialing, timely filing)",
      "Monthly denial trend reports by payer, provider, CPT range and location",
      "Feedback to front desk, coding and charge entry staff on preventable patterns",
    ],
    workflow: [
      { title: "Capture", detail: "Pull denials from posted ERAs, paper EOBs and payer portals into a single worklist so nothing sits unread in a remittance file." },
      { title: "Classify", detail: "Read the group code, CARC and RARC on each line, confirm the denial against the claim and patient record, and tag the likely root cause." },
      { title: "Prioritize", detail: "Order the worklist by approaching deadline, dollar value and how likely the denial is to be overturned or corrected." },
      { title: "Resolve", detail: "Correct and resubmit, request a reopening or reconsideration, send to formal appeal, transfer to patient responsibility, or document a justified write-off." },
      { title: "Prevent", detail: "Report recurring causes to the people who can fix them, for example adding an eligibility check or an authorization step for a specific payer." },
      { title: "Review", detail: "Compare denial volume and categories month over month to see whether prevention changes are working." },
    ],
    benefits: [
      { title: "Fewer denials aging out", detail: "A deadline-driven worklist is designed to get denials worked while correction and appeal windows are still open." },
      { title: "Clearer root causes", detail: "Tagging each denial by cause can show which front-end or coding steps generate the most rework." },
      { title: "Less repeat work", detail: "Fixing upstream processes aims to reduce how often staff handle the same type of denial." },
      { title: "Better documentation", detail: "Notes on every action in your system help with follow-up, staff turnover and payer audits." },
    ],
    practiceTypes: ["orthopedics", "cardiology", "behavioral-health", "physical-therapy", "radiology", "pain-management", "multi-specialty", "general-dentistry"],
    faqs: [
      {
        q: "What is the difference between a claim rejection and a denial?",
        a: "A rejection is a claim that fails clearinghouse or payer front-end edits and never enters adjudication, while a denial is a claim the payer processed and decided not to pay. Rejections are usually fixed and resent as new claims. Denials appear on the ERA or EOB with reason codes and need a corrected claim, reopening, reconsideration or appeal, depending on the payer and the cause.",
      },
      {
        q: "What do the CO, PR, OA and PI group codes mean?",
        a: "Group codes tell you who is financially responsible for an adjustment. CO (contractual obligation) generally means the provider cannot bill the patient, PR (patient responsibility) means the amount may be billed to the patient, OA (other adjustment) covers items that fit neither group, and PI (payer initiated reduction) is a payer reduction that is not the patient's responsibility. The paired CARC gives the specific reason.",
      },
      {
        q: "Which denials are usually preventable?",
        a: "Many denials trace back to front-end problems such as inactive coverage, missing prior authorization, wrong patient demographics or a missing referral. Others come from mid-cycle issues like modifier errors or diagnosis codes that do not support medical necessity. Because these causes occur before the claim is sent, fixing intake, eligibility and charge capture steps often does more than appealing the same denial again and again.",
      },
      {
        q: "How soon should a denial be worked?",
        a: "A denial should be reviewed soon after the remittance posts, because payers set deadlines for corrected claims, reconsiderations and appeals that start running from the denial or remittance date. Delays can also let the original timely filing window close for denials that need a new claim. We order the worklist by deadline, dollar value and the likelihood that the denial can be resolved.",
      },
      {
        q: "Is denial management the same as filing appeals?",
        a: "No, appeals are one possible outcome of denial management, not the whole process. Many denials are resolved faster with a corrected claim, a reopening for a clerical error or a phone call to the payer. Denial management decides which path fits each denial, and it also includes the trend analysis and process fixes that aim to keep the same denials from coming back.",
      },
      {
        q: "Do you work in our own billing system?",
        a: "Yes. We work inside your practice management system, EHR and clearinghouse, so denial notes, corrected claims and appeal records stay in your own system of record. We sign a Business Associate Agreement before accessing any patient data, and we follow your existing user access rules, note conventions and approval steps for write-offs or adjustments.",
      },
    ],
    relatedTools: ["denial-rate-calculator", "denial-reasons-guide", "claim-status-categories", "first-pass-acceptance-rate-calculator"],
    relatedServices: ["denial-appeals", "claims-scrubbing", "insurance-eligibility-verification", "prior-authorization", "aging-ar-follow-up"],
    seoTitle: "Denial Management Services for Medical Practices",
    metaDescription:
      "Denial management that works each denied claim before deadlines pass, reads CARC and RARC codes, and traces denials back to the step that caused them.",
    keywords: ["denial management", "claim denial management", "medical billing denials", "CARC RARC codes", "denial root cause analysis", "denied claims follow-up"],
  },

  /* ------------------------------------------------------------------ */
  /*  Denial appeals                                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "denial-appeals",
    name: "Denial Appeals and Follow-up",
    shortName: "Denial Appeals",
    category: "back-end",
    icon: "Gavel",
    summary: "Written appeals built on payer policy, medical records and contract terms, tracked through each appeal level until a final decision.",
    definition:
      "Denial appeals are formal written requests asking a payer to reverse a claim decision. An appeal packet usually includes a letter citing the payer's own policy or contract, the relevant medical records and the original claim. Follow-up means tracking each appeal through the payer's review levels until it is paid, upheld or escalated.",
    intro: [
      "Some denials cannot be fixed with a corrected claim. When a payer decides a service was not medically necessary, was not authorized, was bundled into another service or was filed too late, the practice has to make its case in writing. A strong appeal answers the specific denial reason with evidence, not a generic form letter.",
      "Every payer has its own appeal process, forms and deadlines. Commercial plans often have one or two internal levels before external review. Medicare has five levels of appeal, starting with a redetermination by the Medicare Administrative Contractor and moving through reconsideration, an administrative law judge hearing, the Medicare Appeals Council and federal court. Medicaid programs and managed care plans add their own rules.",
      "We draft appeals inside your systems using your documentation, track every submission and response date, and decide with you whether an upheld denial is worth taking to the next level.",
    ],
    scope: [
      "Reviewing the denial reason, payer policy and contract language before drafting",
      "Requesting and organizing supporting records from the EHR (notes, orders, imaging, authorizations)",
      "Writing appeal letters that answer the specific denial reason and cite the applicable policy",
      "Completing payer-specific appeal forms and portal submissions",
      "Requesting peer-to-peer reviews where the payer offers them and the provider agrees",
      "Tracking appeal deadlines, submission dates, acknowledgments and decisions",
      "Escalating upheld denials to the next appeal level or external review when warranted",
      "Logging outcomes by payer and denial reason to refine future appeal templates",
    ],
    workflow: [
      { title: "Screen", detail: "Confirm the denial cannot be resolved with a corrected claim or reopening, and check how much time remains in the appeal window." },
      { title: "Gather evidence", detail: "Pull the clinical documentation, authorization records, payer policy and contract terms that address the denial reason." },
      { title: "Draft", detail: "Write a concise letter that states what is being appealed, why the denial is incorrect and which records support payment." },
      { title: "Submit", detail: "Send through the payer's required channel (portal, fax, mail or clearinghouse attachment) and save proof of submission." },
      { title: "Follow up", detail: "Check status on a set schedule, respond to requests for more information and record the decision in your system." },
      { title: "Escalate or close", detail: "If the denial is upheld, review the decision with you and decide whether to move to the next level or close the account." },
    ],
    benefits: [
      { title: "Appeals that answer the actual reason", detail: "Targeted letters are designed to address the payer's stated rationale rather than restate the claim." },
      { title: "Deadlines kept visible", detail: "A tracked appeal calendar aims to keep winnable appeals from expiring unworked." },
      { title: "Less provider time", detail: "Preparing packets and drafts in advance can reduce the time providers spend on appeal paperwork." },
      { title: "Reusable knowledge", detail: "Logging outcomes by payer helps refine templates and shows which denials are worth contesting." },
    ],
    practiceTypes: ["orthopedics", "oncology", "behavioral-health", "pain-management", "radiology", "ambulatory-surgery-centers", "neurology", "oral-surgery"],
    faqs: [
      {
        q: "What are the five levels of Medicare appeal?",
        a: "Medicare Part A and B appeals move through five levels: a redetermination by the Medicare Administrative Contractor, a reconsideration by a Qualified Independent Contractor, a hearing before an administrative law judge, review by the Medicare Appeals Council, and judicial review in federal district court. Each level has its own filing deadline, and the later levels require a minimum amount in controversy that CMS updates each year.",
      },
      {
        q: "How long do we have to file an appeal?",
        a: "It depends on the payer and the appeal level. For Medicare, a redetermination request is generally due within 120 days of receiving the initial determination, with shorter windows at later levels. Commercial and Medicaid managed care plans set their own limits in provider manuals and contracts, often ranging from a few weeks to several months, so we confirm the deadline for each denial before drafting.",
      },
      {
        q: "When is an appeal not the right step?",
        a: "An appeal is usually not the right step when the denial came from an error on your own claim, such as a wrong patient ID, a missing modifier or an incorrect date of service. In those cases a corrected claim or, for Medicare, a reopening is typically faster. Appeals are best reserved for disputes about medical necessity, authorization, bundling, coverage or timely filing.",
      },
      {
        q: "What makes an appeal letter effective?",
        a: "An effective appeal letter responds directly to the stated denial reason and points to the evidence that answers it. It identifies the patient, claim and dates of service, cites the payer's own medical policy or contract terms, and attaches only the records that support the argument. Clear, short letters are easier for reviewers to act on than long packets without a stated point.",
      },
      {
        q: "Do you handle peer-to-peer reviews?",
        a: "We can schedule and prepare for peer-to-peer reviews, but the conversation itself must be held by a licensed clinician, usually the treating provider. Our role is to request the review within the payer's window, assemble the relevant records and denial details, brief the provider on what the payer's reviewer questioned, and record the outcome in your system afterward.",
      },
    ],
    relatedTools: ["denial-appeal-checklist", "denial-reasons-guide", "eob-explained"],
    relatedServices: ["denial-management", "prior-authorization", "medical-coding", "revenue-recovery"],
    seoTitle: "Denial Appeals and Follow-up for Medical Practices",
    metaDescription:
      "Denial appeals backed by payer policy and medical records, tracked through every level, including the five levels of Medicare appeal, until a decision.",
    keywords: ["denial appeals", "medical claim appeals", "Medicare redetermination", "insurance appeal letter", "appeal follow-up", "peer-to-peer review"],
  },

  /* ------------------------------------------------------------------ */
  /*  Accounts receivable management                                     */
  /* ------------------------------------------------------------------ */
  {
    slug: "accounts-receivable-management",
    name: "Accounts Receivable Management",
    shortName: "AR Management",
    category: "back-end",
    icon: "Inbox",
    summary: "Ongoing oversight of every open insurance and patient balance so claims keep moving from submission to payment or resolution.",
    definition:
      "Accounts receivable management is the ongoing work of monitoring and resolving every unpaid balance a practice is owed, from insurance claims awaiting adjudication to patient balances after payment. It covers claim status checks, payer follow-up, credit balance review, AR reporting and the decisions about what to pursue, adjust or write off.",
    intro: [
      "Your accounts receivable is the total of services billed but not yet paid. A healthy AR moves steadily: claims are acknowledged, adjudicated, paid and posted, and patient balances are billed and collected. When follow-up is irregular, claims stall in payer queues, credit balances build up and the AR report stops reflecting what you can actually collect.",
      "AR management treats receivables as a portfolio to manage every week, not a backlog to clean up once a year. It looks at the whole picture (payer mix, aging buckets, unbilled claims, credit balances and patient balances) and assigns clear ownership for each segment.",
      "We work inside your practice management system and clearinghouse, follow your adjustment and write-off policies, and report on AR in a format your team and accountant can use.",
    ],
    scope: [
      "Weekly review of open insurance AR by payer, aging bucket and dollar value",
      "Claim status checks through 276/277 transactions, payer portals and phone follow-up",
      "Identifying claims with no acknowledgment or no response from the payer",
      "Credit balance review and refund or overpayment recommendations",
      "Monitoring unbilled and held claims before they become an AR problem",
      "Coordinating with denial, posting and patient billing workflows",
      "Adjustment and write-off recommendations following your approval policy",
      "AR reporting: days in AR, aging distribution and payer-level trends",
    ],
    workflow: [
      { title: "Baseline", detail: "Run AR aging, payer and credit balance reports to understand the current mix and where balances are concentrated." },
      { title: "Segment", detail: "Split AR into worklists by payer, age, dollar value and status so each segment has an owner and a follow-up cadence." },
      { title: "Follow up", detail: "Check claim status electronically first, then through portals or calls, and record each response and next action in your system." },
      { title: "Resolve", detail: "Resubmit, correct, appeal, transfer to patient responsibility, refund or recommend adjustment based on what the payer reports." },
      { title: "Reconcile", detail: "Confirm payments and adjustments are posted correctly so the AR balance matches what is truly outstanding." },
      { title: "Report", detail: "Share AR trends and open issues on a regular schedule, with the accounts that need a decision from you." },
    ],
    benefits: [
      { title: "AR you can trust", detail: "Regular reconciliation is designed to keep the AR report close to what is genuinely collectible." },
      { title: "Steady follow-up", detail: "A defined cadence for each payer segment aims to keep claims from stalling unnoticed." },
      { title: "Earlier warning", detail: "Payer-level trends can reveal processing delays or policy changes before they affect a full month of claims." },
      { title: "Cleaner credit balances", detail: "Routine credit balance review helps your practice handle overpayments and refunds on time." },
    ],
    practiceTypes: ["family-medicine", "internal-medicine", "cardiology", "urgent-care", "multi-specialty", "home-health", "dental-group-practices"],
    faqs: [
      {
        q: "What does days in AR measure?",
        a: "Days in AR estimates how many days of charges are sitting unpaid in your receivables. It is commonly calculated by dividing total AR by average daily charges over a recent period, such as the last three or six months. The figure is most useful as a trend over time and by payer, since specialty, payer mix and charge levels all affect what a reasonable number looks like.",
      },
      {
        q: "What is a 276/277 transaction?",
        a: "The 276 and 277 are HIPAA standard electronic transactions defined by X12 for claim status. Your system or clearinghouse sends a 276 to ask a payer about a claim, and the payer returns a 277 with a status category and status code. These transactions let AR staff check many claims quickly before spending time on portals or phone calls.",
      },
      {
        q: "How is AR management different from aging AR follow-up?",
        a: "AR management is the ongoing oversight of all receivables, including current claims, credit balances, reporting and policies. Aging AR follow-up is a focused effort on older balances, usually past 60 or 90 days, that have stalled. Most practices need both: steady management so new claims do not age, and targeted follow-up to resolve the older accounts that already have.",
      },
      {
        q: "Why do credit balances matter?",
        a: "Credit balances show that a practice may have been paid more than it is owed, by a payer or a patient. Left unresolved they overstate collections and can create compliance exposure, because identified overpayments from Medicare and Medicaid must be reported and returned within federal deadlines, and many commercial contracts and state rules set their own. Regular review keeps refunds and payer recoupments in order.",
      },
      {
        q: "Who decides what gets written off?",
        a: "Your practice does. We recommend adjustments and write-offs with the reason, payer response and supporting notes, but approvals follow the policy and thresholds you set. Keeping clear write-off categories (contractual, timely filing, small balance, bad debt) also makes your AR and financial reports easier to interpret for your accountant and leadership.",
      },
    ],
    relatedTools: ["days-in-ar-calculator", "ar-aging-calculator", "claim-status-categories", "net-collection-rate-calculator"],
    relatedServices: ["aging-ar-follow-up", "denial-management", "payment-posting", "payment-reconciliation", "rcm-analytics-reporting"],
    seoTitle: "Accounts Receivable Management for Medical Practices",
    metaDescription:
      "Accounts receivable management that monitors open insurance and patient balances, checks claim status and keeps your AR report close to what is collectible.",
    keywords: ["accounts receivable management", "medical AR management", "healthcare accounts receivable", "days in AR", "claim status follow-up", "credit balance review"],
  },

  /* ------------------------------------------------------------------ */
  /*  Aging AR follow-up                                                 */
  /* ------------------------------------------------------------------ */
  {
    slug: "aging-ar-follow-up",
    name: "Aging AR Follow-up",
    shortName: "Aging AR Follow-up",
    category: "back-end",
    icon: "Hourglass",
    summary: "Focused cleanup of insurance balances older than 60 or 90 days, sorted by deadline and value so recoverable claims are worked first.",
    definition:
      "Aging AR follow-up is a targeted effort to resolve insurance claims that have stayed unpaid past a set age, usually 60, 90 or 120 days. Staff research each claim's history, contact the payer, fix what is blocking payment and decide whether the balance can still be collected before filing or appeal limits expire.",
    intro: [
      "Older claims are harder to collect. Each month a claim sits unpaid, the chances grow that a timely filing limit passes, a payer purges its record, a patient's coverage changes or the person who knew the story leaves your practice. Aging AR is where much of a practice's avoidable write-off risk sits.",
      "Many practices accumulate old AR during staff turnover, a system migration, a payer change or a surge in volume. Clearing it takes a different approach from routine follow-up: claim-by-claim research, careful reading of payer history, and a realistic call on which balances are still recoverable.",
      "We sort aging AR by deadline risk and value, work it inside your systems, and document every outcome so your team can see exactly what was recovered, what was adjusted and why.",
    ],
    scope: [
      "Pulling AR aging reports by bucket (61 to 90, 91 to 120, over 120 days) and payer",
      "Researching claim history: submission, acknowledgment, payer response and prior notes",
      "Finding claims that were never received and resubmitting with proof of timely filing",
      "Identifying claims denied but never worked, and moving them to correction or appeal",
      "Contacting payers by portal and phone, logging reference numbers and representative names",
      "Checking for coordination of benefits holds, pended claims and records requests",
      "Recommending adjustments for balances that cannot be recovered, with reasons",
      "Summarizing recoveries, adjustments and remaining open items for your review",
    ],
    workflow: [
      { title: "Triage", detail: "Rank aged claims by remaining filing or appeal time, balance size and payer, so the most time-sensitive dollars come first." },
      { title: "Research", detail: "Read the full claim trail in your system and clearinghouse to see what was sent, what came back and what was already tried." },
      { title: "Contact", detail: "Check status electronically, then call or use payer portals, recording reference numbers and the exact reason each claim is unpaid." },
      { title: "Act", detail: "Resubmit with proof of timely filing, correct, appeal, update coordination of benefits or send requested records, depending on the finding." },
      { title: "Decide", detail: "Recommend adjustments only after recovery options are exhausted, with notes that explain why the balance is uncollectible." },
      { title: "Hand back", detail: "Return a clean, documented aging report and note the root causes so routine AR work can keep balances from aging again." },
    ],
    benefits: [
      { title: "Time-sensitive claims first", detail: "Deadline-based triage is designed to focus effort where filing and appeal windows are closing." },
      { title: "Clear records", detail: "Documented call notes and reference numbers support later appeals and proof of timely filing." },
      { title: "Realistic AR", detail: "Separating recoverable balances from true write-offs aims to give you a more accurate picture of receivables." },
      { title: "Lessons for prevention", detail: "Patterns found in old claims can point to process gaps that let claims age in the first place." },
    ],
    practiceTypes: ["internal-medicine", "orthopedics", "physical-therapy", "chiropractic", "home-health", "mental-health-clinics", "multi-specialty", "dental-group-practices"],
    faqs: [
      {
        q: "Is it worth working claims older than 120 days?",
        a: "Often yes, as long as you check each claim's deadlines first. A claim that was filed on time but never paid may still be collectible, especially with proof of timely filing such as a clearinghouse acceptance report. Claims that were never filed and are past the payer's limit usually are not. We triage old claims by remaining time, balance and payer before investing effort.",
      },
      {
        q: "What counts as proof of timely filing?",
        a: "Proof of timely filing is documentation showing the claim reached the payer or clearinghouse within the filing limit. Commonly accepted examples include a clearinghouse or payer acceptance report (such as a 999 or 277CA acknowledgment), a payer portal submission record, or correspondence from the payer referencing the claim. Requirements vary by payer, so we check the provider manual before resubmitting.",
      },
      {
        q: "What is the timely filing limit for Medicare?",
        a: "Medicare generally requires claims to be filed within 12 months, or one calendar year, after the date of service, with limited exceptions such as administrative error or retroactive entitlement. Commercial plans and Medicaid programs set their own limits, which can be considerably shorter, and contracts may modify them, so each payer's limit needs to be confirmed individually.",
      },
      {
        q: "Why do claims end up with no response from the payer?",
        a: "Claims usually show no response because they never reached the payer or were rejected without anyone noticing. Common causes include clearinghouse rejections left unworked, wrong payer IDs, claims sent to a plan the patient no longer has, and payer-side pends awaiting records or coordination of benefits information. Status checks and call notes usually reveal which situation applies.",
      },
      {
        q: "How do you decide what to write off?",
        a: "We recommend a write-off only after the realistic recovery options are exhausted, and your practice approves it. Typical reasons include an expired filing or appeal limit with no proof of timely filing, an upheld final appeal, or a balance below a threshold you set. Each recommendation includes the payer response and reason code so your adjustment reporting stays meaningful.",
      },
    ],
    relatedTools: ["ar-aging-calculator", "days-in-ar-calculator", "claim-status-categories", "revenue-recovery-calculator"],
    relatedServices: ["accounts-receivable-management", "denial-management", "revenue-recovery", "clearinghouse-coordination"],
    seoTitle: "Aging AR Follow-up and Old Claims Cleanup",
    metaDescription:
      "Aging AR follow-up that works insurance claims past 60, 90 and 120 days, checks filing deadlines and documents what was recovered, adjusted or still open.",
    keywords: ["aging AR follow-up", "old AR cleanup", "insurance AR follow-up", "AR over 90 days", "proof of timely filing", "AR recovery"],
  },

  /* ------------------------------------------------------------------ */
  /*  Revenue recovery                                                   */
  /* ------------------------------------------------------------------ */
  {
    slug: "revenue-recovery",
    name: "Revenue Recovery",
    shortName: "Revenue Recovery",
    category: "back-end",
    icon: "TrendingUp",
    summary: "A structured project to find and pursue revenue your practice missed: unbilled visits, unworked denials, underpaid claims and stalled AR.",
    definition:
      "Revenue recovery is a time-bound project that looks back over a practice's past claims and encounters to find money that was earned but never collected. It reviews unbilled services, unworked denials, underpayments, missed secondary claims and stalled AR, then pursues the items that are still within payer filing and appeal limits.",
    intro: [
      "Revenue can slip away in several places at once: a visit documented but never billed, a secondary claim never sent, a denial no one appealed, a payment that came in below the contracted rate. Individually these are small. Together, over months, they can add up to meaningful lost revenue.",
      "Revenue recovery is different from routine billing work. It is a defined look-back, often prompted by staff turnover, a software change, a billing vendor transition or a sense that collections do not match the work being done. It starts with data, sizes each source of leakage, and then works the recoverable items in order of deadline and value.",
      "We run recovery projects inside your existing systems, agree the look-back period and scope with you up front, and keep a clear log of what was found, what was pursued and what was not recoverable.",
    ],
    scope: [
      "Comparing scheduled and documented encounters against billed charges to find missed charges",
      "Identifying secondary and tertiary claims that were never filed",
      "Reviewing past denials that were adjusted or left open without a documented decision",
      "Flagging underpaid claims for contract variance review",
      "Reviewing stalled AR that has no recent follow-up activity",
      "Checking each item against timely filing and appeal limits before pursuit",
      "Pursuing recoverable items through billing, correction, appeal or payer contact",
      "A findings log showing sources of leakage and the process gaps behind them",
    ],
    workflow: [
      { title: "Scope", detail: "Agree the look-back period, payers, locations and data sources, and confirm what access and reports are available." },
      { title: "Analyze", detail: "Run reports that compare appointments, charges, payments, adjustments and denials to locate gaps." },
      { title: "Size and sort", detail: "Group findings by source and estimate which are still recoverable based on payer deadlines." },
      { title: "Pursue", detail: "Bill missed charges, send secondary claims, correct or appeal denials and query underpayments, starting with the most time-sensitive." },
      { title: "Document", detail: "Record the action and outcome for each item so results can be reviewed line by line." },
      { title: "Close the gaps", detail: "Summarize the process causes found, such as charge capture or secondary billing steps, so they can be fixed going forward." },
    ],
    benefits: [
      { title: "A clear picture of leakage", detail: "Comparing encounters, charges and payments is designed to show where revenue is being missed." },
      { title: "Effort aimed at recoverable items", detail: "Checking deadlines first aims to avoid spending time on balances that can no longer be pursued." },
      { title: "Process fixes, not just a cleanup", detail: "Tracing each finding to a cause can help stop the same leakage from recurring." },
      { title: "A transparent record", detail: "A line-item log lets your practice review exactly what was pursued and why." },
    ],
    practiceTypes: ["primary-care", "orthopedics", "cardiology", "physical-therapy", "urgent-care", "ambulatory-surgery-centers", "multi-specialty", "general-dentistry"],
    faqs: [
      {
        q: "How far back can a revenue recovery project look?",
        a: "A recovery project can review as far back as your records allow, but only items still within payer filing and appeal limits are usually collectible. For many practices a 12 to 18 month look-back is practical, since Medicare's filing limit is generally one year from the date of service and many commercial limits are shorter. Older periods may still reveal process lessons worth documenting.",
      },
      {
        q: "What are the most common sources of missed revenue?",
        a: "Common sources include services documented in the EHR but never charged, secondary claims that were never filed, denials adjusted off without an appeal decision, payments below contracted rates, and claims with no follow-up after submission. Which sources matter most varies by specialty and workflow, so a recovery project starts by measuring each one in your own data.",
      },
      {
        q: "How is revenue recovery different from aging AR follow-up?",
        a: "Aging AR follow-up works balances that are already on your AR report. Revenue recovery also looks for money that never reached the AR report at all, such as unbilled encounters, missed secondary claims and underpayments that were posted and closed. It is a broader, time-bound look-back that ends with a findings log and recommended process changes.",
      },
      {
        q: "Can recovery work create compliance risk?",
        a: "It can if it is done carelessly, which is why every late charge must be supported by documentation and billed according to payer rules. Recovery work should also surface overpayments, not only underpayments, because identified overpayments from government payers must be reported and returned within set deadlines. We flag both directions and leave coding and refund decisions to your practice.",
      },
    ],
    relatedTools: ["revenue-recovery-calculator", "revenue-leakage-estimator", "underpayment-estimator", "ar-aging-calculator"],
    relatedServices: ["underpayment-identification", "aging-ar-follow-up", "denial-appeals", "charge-entry", "revenue-cycle-audit"],
    seoTitle: "Revenue Recovery Services for Medical Practices",
    metaDescription:
      "Revenue recovery projects that look back for unbilled visits, missed secondary claims, unworked denials and underpayments still within payer deadlines.",
    keywords: ["revenue recovery", "medical revenue recovery", "revenue leakage", "missed charges", "secondary claims", "lost revenue look-back"],
  },

  /* ------------------------------------------------------------------ */
  /*  Underpayment identification                                        */
  /* ------------------------------------------------------------------ */
  {
    slug: "underpayment-identification",
    name: "Underpayment Identification",
    shortName: "Underpayment Review",
    category: "back-end",
    icon: "Scale",
    summary: "Compare what payers actually paid against your contracted rates and payer rules, then dispute the lines that came in short.",
    definition:
      "Underpayment identification is the process of comparing the allowed amount on each paid claim line with the rate your practice expected under its payer contract or fee schedule. Lines that were paid below that rate are flagged, the cause is researched, and valid variances are disputed with the payer through reprocessing requests or appeals.",
    intro: [
      "A claim marked paid is not always paid correctly. Payers load contracts into their systems by hand, update fee schedules on their own timelines and apply pricing rules for modifiers and multiple procedures that do not always match the contract. The difference often appears only as a CO-45 adjustment line that looks routine on the remittance.",
      "Without a loaded expected-rate table, most practice management systems cannot tell you that a payer allowed less than it should. Underpayment identification builds that comparison, line by line, using your contracts, the ERA data and the payer's published policies.",
      "We work from your contracts and remittances, separate true underpayments from legitimate reductions (such as Medicare sequestration or a patient's cost share), and pursue the valid variances through the payer's dispute process.",
    ],
    scope: [
      "Building or reviewing expected-rate tables from your payer contracts and fee schedules",
      "Comparing ERA allowed amounts to expected rates by payer, CPT or CDT code and modifier",
      "Checking multiple procedure, bilateral, assistant surgeon and modifier pricing rules",
      "Separating legitimate reductions (sequestration, patient cost share, bundling edits) from variances",
      "Detecting outdated fee schedule years or wrong provider or location pricing",
      "Grouping variances by root cause and payer for efficient disputes",
      "Submitting reprocessing requests, payment disputes or appeals with contract references",
      "Tracking recouped and corrected payments through to posting",
    ],
    workflow: [
      { title: "Collect terms", detail: "Gather current contracts, amendments, rate exhibits and any published fee schedules each contract references." },
      { title: "Model expected payment", detail: "Build expected allowed amounts by code, modifier and place of service, including the payer's stated pricing rules." },
      { title: "Compare", detail: "Match ERA line data against the expected amounts and flag lines outside a tolerance you agree with us." },
      { title: "Research", detail: "Confirm each variance is real by checking modifiers, units, coordination of benefits and payer edits." },
      { title: "Dispute", detail: "Group valid variances by cause and submit them through the payer's reprocessing or dispute channel with contract citations." },
      { title: "Monitor", detail: "Track reprocessed payments and keep watching for repeat variances that suggest a payer loading error." },
    ],
    benefits: [
      { title: "Visibility into payment accuracy", detail: "Line-level comparison is designed to show whether payers are paying what your contracts state." },
      { title: "Systemic errors surfaced", detail: "Grouping variances by cause can reveal a wrong fee schedule load that affects many claims at once." },
      { title: "Stronger negotiating data", detail: "A record of payment behavior by payer can inform future contract discussions." },
      { title: "Fewer silent losses", detail: "Reviewing CO-45 and similar adjustments aims to stop short payments from being closed without notice." },
    ],
    practiceTypes: ["orthopedics", "cardiology", "gastroenterology", "ophthalmology", "ambulatory-surgery-centers", "radiology", "oral-surgery", "dental-group-practices"],
    faqs: [
      {
        q: "How do I know whether a payer underpaid a claim?",
        a: "You know a claim was underpaid when the allowed amount on the remittance is lower than the rate your contract sets for that code, modifier and setting. Most remittances do not say this directly; the shortfall is usually folded into a contractual adjustment. Spotting it requires an expected-rate table built from your contracts and compared against ERA data line by line.",
      },
      {
        q: "Is a CO-45 adjustment always correct?",
        a: "No, a CO-45 adjustment is not always correct. CARC 45 means the charge exceeds the fee schedule or maximum allowable amount, which is normal when your charge is higher than the contracted rate. However, the same code appears when a payer applies the wrong fee schedule, so the size of the adjustment needs to be checked against your contract, not just its code.",
      },
      {
        q: "What reductions are legitimate rather than underpayments?",
        a: "Legitimate reductions include patient cost share (deductible, coinsurance and copay), Medicare's sequestration reduction (shown with CARC 253), multiple procedure and bilateral payment rules your contract adopts, and correct bundling edits. These need to be separated out before calling a payment short. A true underpayment is a variance that remains after all applicable rules have been applied.",
      },
      {
        q: "Do we need our payer contracts to do this?",
        a: "Yes, an accurate underpayment review depends on your actual contracts and rate exhibits. Many contracts pay a percentage of a published fee schedule, such as Medicare's, which makes modeling easier, while others list rates code by code. If contracts are missing, we can help you request copies from payers and, in the meantime, compare payments across payers to flag likely outliers.",
      },
      {
        q: "How are underpayments recovered?",
        a: "Underpayments are usually recovered by asking the payer to reprocess the claim at the correct rate, using its payment dispute or reconsideration process, and escalating to a formal appeal if that fails. When many claims share the same cause, such as an outdated fee schedule load, it is often more efficient to raise it with your provider representative as one project.",
      },
    ],
    relatedTools: ["underpayment-estimator", "payment-variance-calculator", "fee-schedule-comparison-calculator", "era-explained"],
    relatedServices: ["fee-schedule-analysis", "payer-contracting", "era-processing", "payment-posting", "revenue-recovery"],
    seoTitle: "Underpayment Identification and Recovery",
    metaDescription:
      "Underpayment identification that compares ERA allowed amounts with your payer contracts, separates valid reductions and disputes the lines paid short.",
    keywords: ["underpayment identification", "payer underpayments", "contract variance", "CO-45 adjustment", "expected reimbursement", "underpayment recovery"],
  },

  /* ------------------------------------------------------------------ */
  /*  Patient billing                                                    */
  /* ------------------------------------------------------------------ */
  {
    slug: "patient-billing",
    name: "Patient Billing and Statements",
    shortName: "Patient Billing",
    category: "back-end",
    icon: "Receipt",
    summary: "Accurate, easy-to-read patient statements sent after insurance has paid, with a clear cycle and answers when patients call.",
    definition:
      "Patient billing is the process of calculating what a patient owes after insurance adjudication and communicating it through clear statements. It includes verifying the balance against the remittance, producing statements on a regular cycle, handling billing questions, setting up payment plans and providing good faith estimates for uninsured or self-pay patients when required.",
    intro: [
      "Patient responsibility is now a large share of what many practices collect, and patients judge your practice partly by the bill they receive. A statement that arrives before insurance has finished processing, shows a confusing balance or lists codes without plain descriptions tends to generate phone calls, disputes and delays.",
      "Good patient billing starts with an accurate balance. That means confirming the patient responsibility on the ERA, checking that secondary insurance has been billed, applying any payments collected at the visit and only then sending a statement. From there, a predictable statement cycle and clear messages do most of the work.",
      "We work inside your practice management system and statement vendor, follow the statement cycle and payment policies you set, and help your practice meet federal good faith estimate requirements for uninsured and self-pay patients.",
    ],
    scope: [
      "Confirming patient balances against ERA patient responsibility (PR group) amounts",
      "Checking secondary and tertiary billing before any balance moves to the patient",
      "Running statement cycles through your practice management system or statement vendor",
      "Reviewing statement wording so balances, dates and payment options are clear",
      "Answering patient billing questions by phone, email or portal message",
      "Setting up payment plans within the terms your practice approves",
      "Preparing good faith estimates for uninsured and self-pay patients under the No Surprises Act",
      "Handling returned mail, address updates and patient refunds for overpaid balances",
    ],
    workflow: [
      { title: "Verify the balance", detail: "Match the patient amount to the remittance, apply payments made at check-in and confirm all insurance has been billed." },
      { title: "Prepare statements", detail: "Generate statements in your system with clear service dates, insurance payments, adjustments and the amount due." },
      { title: "Send on a cycle", detail: "Mail or send electronic statements on a consistent schedule, with follow-up statements and reminders at set intervals." },
      { title: "Support patients", detail: "Answer questions, explain insurance decisions in plain language and correct any balance that turns out to be wrong." },
      { title: "Offer options", detail: "Set up payment plans or point patients to financial assistance policies your practice offers." },
      { title: "Hand off or resolve", detail: "Move accounts that remain unpaid after the full cycle to your collections policy, or close them as paid." },
    ],
    benefits: [
      { title: "Fewer billing disputes", detail: "Verifying each balance before it is billed is designed to reduce statements that need to be corrected." },
      { title: "Clearer statements", detail: "Plain-language statements aim to cut down on calls asking what a bill is for." },
      { title: "Predictable cash flow", detail: "A consistent statement cycle can make patient payments more regular and easier to forecast." },
      { title: "Support for estimate rules", detail: "A defined good faith estimate process helps your practice handle self-pay patients consistently." },
    ],
    practiceTypes: ["family-medicine", "pediatrics", "dermatology", "physical-therapy", "chiropractic", "behavioral-health", "general-dentistry", "orthodontics"],
    faqs: [
      {
        q: "When should a patient statement be sent?",
        a: "A patient statement should usually be sent only after the primary and any secondary insurance have processed the claim, so the balance reflects the final patient responsibility. Sending earlier often produces balances that change later, which confuses patients and creates refunds. Exceptions include self-pay services and amounts collected at the visit under your financial policy.",
      },
      {
        q: "What is a good faith estimate?",
        a: "A good faith estimate is a written estimate of expected charges that the No Surprises Act requires providers to give uninsured and self-pay patients for scheduled services, or on request. It must follow federal timing and content rules. If the final bill substantially exceeds the estimate (currently by 400 dollars or more), the patient may be able to use the federal patient-provider dispute resolution process.",
      },
      {
        q: "How many statements should a practice send?",
        a: "Many practices send a cycle of about three or four statements roughly 30 days apart before moving to final notice, but the right number depends on your patient population and financial policy. What matters most is that the cycle is consistent, each statement shows the same clear balance, and patients are told what will happen if the balance is not addressed.",
      },
      {
        q: "Can you set up payment plans for our patients?",
        a: "Yes, we can set up payment plans within the terms your practice approves, such as a minimum monthly payment, a maximum length and whether automatic card payments are required. Plans are recorded in your practice management system so statements and reminders reflect the agreed schedule, and accounts that fall behind are flagged for follow-up under your policy.",
      },
      {
        q: "What should happen when a patient overpays?",
        a: "When a patient overpays, the credit should be confirmed and either refunded or applied to another open balance as your policy and applicable state rules allow. Overpayments often happen when a patient pays an estimate at the visit and insurance later pays more than expected. Regular credit balance reviews keep these refunds from sitting on your books for months.",
      },
    ],
    relatedTools: ["patient-balance-calculator", "collection-efficiency-calculator", "eob-explained"],
    relatedServices: ["patient-collections", "patient-financial-communication", "payment-posting", "benefits-verification"],
    seoTitle: "Patient Billing and Statement Services",
    metaDescription:
      "Patient billing that verifies balances after insurance, sends clear statements on a set cycle and supports good faith estimates for self-pay patients.",
    keywords: ["patient billing", "patient statements", "medical patient billing", "good faith estimate", "No Surprises Act", "patient payment plans"],
  },

  /* ------------------------------------------------------------------ */
  /*  Patient collections                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "patient-collections",
    name: "Patient Collections Support",
    shortName: "Patient Collections",
    category: "back-end",
    icon: "Wallet",
    summary: "Respectful, policy-driven follow-up on unpaid patient balances, from reminder calls to payment plans and agency handoff decisions.",
    definition:
      "Patient collections support is the follow-up on patient balances that remain unpaid after the normal statement cycle. It covers reminder calls and messages, payment plan setup, financial assistance screening, account review before any agency referral, and documentation of every contact, all carried out under the practice's written financial policy and applicable consumer protection rules.",
    intro: [
      "Patient balances are harder to collect than insurance payments, and the way you pursue them affects patient trust. Most unpaid balances come from patients who are confused about a bill, waiting on insurance, or unable to pay in full, not from patients refusing to pay. A respectful follow-up process recognizes that.",
      "Effective collections support starts with a clear written financial policy, then applies it consistently: reminders at set points, real options such as payment plans, screening for financial assistance where your practice offers it, and a documented review before any account is sent to an outside agency or written off.",
      "We act as an extension of your billing office, working inside your systems and under your name and policies. We are not a collection agency, and decisions about agency referral, credit reporting and write-offs remain with your practice.",
    ],
    scope: [
      "Reviewing unpaid balances after the statement cycle to confirm each one is accurate",
      "Reminder calls, text and email messages using scripts your practice approves",
      "Taking payments by phone or directing patients to your payment portal",
      "Setting up and monitoring payment plans under your financial policy",
      "Screening for financial assistance or hardship programs your practice offers",
      "Documenting every contact attempt, promise to pay and dispute in your system",
      "Preparing accounts for your review before agency referral or bad debt write-off",
      "Coordinating with outside agencies on account updates, payments and recalls",
    ],
    workflow: [
      { title: "Validate", detail: "Confirm each overdue balance is correct, insurance processing is complete and no credits or pending adjustments apply." },
      { title: "Remind", detail: "Contact the patient by phone, text or email at the intervals your policy defines, using approved scripts and channels." },
      { title: "Offer options", detail: "Take a payment, set up a payment plan or route the patient to a financial assistance application where available." },
      { title: "Document", detail: "Record each attempt, conversation, dispute and agreement in your practice management system." },
      { title: "Escalate for review", detail: "Present accounts that remain unresolved with their full history so your practice can decide on agency referral or write-off." },
    ],
    benefits: [
      { title: "Consistent policy application", detail: "Following one written policy for every account is designed to treat patients fairly and predictably." },
      { title: "More balances resolved early", detail: "Timely reminders and payment options aim to settle balances before they reach an agency." },
      { title: "Better patient relationships", detail: "Respectful, informed conversations can reduce complaints and preserve trust in your practice." },
      { title: "A documented trail", detail: "Full contact histories support disputes, agency handoffs and any later review." },
    ],
    practiceTypes: ["family-medicine", "urgent-care", "dermatology", "physical-therapy", "chiropractic", "obgyn", "general-dentistry", "orthodontics"],
    faqs: [
      {
        q: "Does the FDCPA apply to our practice's collections?",
        a: "The Fair Debt Collection Practices Act mainly governs third-party debt collectors, not a practice collecting its own patient balances under its own name. However, a vendor collecting on your behalf, state consumer collection laws and telephone and text messaging rules can still apply. Following FDCPA-style standards for respectful, accurate communication is a sensible baseline, and your attorney can confirm your specific obligations.",
      },
      {
        q: "Are you a collection agency?",
        a: "No, we are not a collection agency. We support your practice's own early-stage follow-up on patient balances, working in your systems under your financial policy. If an account remains unpaid after your process, your practice decides whether to refer it to a licensed collection agency, and we can prepare the account history and coordinate updates with that agency.",
      },
      {
        q: "What should a patient financial policy include?",
        a: "A patient financial policy should explain when payment is due, which payment methods are accepted, how insurance balances are handled, payment plan terms, financial assistance options, the statement cycle and what happens if a balance stays unpaid. Patients should receive it before care, ideally with a signed acknowledgment. Clear policies make later collection conversations shorter and less contentious.",
      },
      {
        q: "Can unpaid medical bills still be reported to credit bureaus?",
        a: "Rules on medical debt and credit reporting have changed several times in recent years through credit bureau policy changes, federal rulemaking and state laws, and some of those changes have been challenged in court. Because the landscape keeps shifting, any decision about credit reporting should be made by your practice with its collection agency and legal advisor, using current rules for your state.",
      },
      {
        q: "How do you handle a patient who disputes a balance?",
        a: "We pause collection activity on the disputed amount and research it before contacting the patient again. That means checking the remittance, the patient's coverage, coordination of benefits and any estimate given before the visit. If the balance is wrong, we correct it or refer it to your team; if it is right, we explain it in plain language with the supporting details.",
      },
    ],
    relatedTools: ["patient-balance-calculator", "collection-efficiency-calculator", "net-collection-rate-calculator"],
    relatedServices: ["patient-billing", "patient-financial-communication", "accounts-receivable-management", "payment-posting"],
    seoTitle: "Patient Collections Support for Medical Practices",
    metaDescription:
      "Patient collections support with respectful reminders, payment plans and documented follow-up under your financial policy, before any agency handoff.",
    keywords: ["patient collections", "medical patient collections", "patient balance follow-up", "FDCPA healthcare", "patient financial policy", "payment plans"],
  },

  /* ------------------------------------------------------------------ */
  /*  Medical credentialing                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "medical-credentialing",
    name: "Medical Credentialing",
    shortName: "Credentialing",
    category: "enrollment",
    icon: "BadgeCheck",
    summary: "Assemble and maintain provider credentials, CAQH ProView profiles and payer applications so providers can join and stay in networks.",
    definition:
      "Medical credentialing is the process payers and facilities use to verify a provider's qualifications, including education, training, licensure, board certification, malpractice coverage and work history, before allowing the provider into a network. For a practice, it means assembling those documents, keeping the CAQH ProView profile current, submitting payer applications and completing re-credentialing on schedule.",
    intro: [
      "A provider who is not credentialed with a payer is usually out of network for that payer's members, which can mean denied claims, lower payment or patients who choose another practice. Credentialing has to be finished before the provider sees those patients, and it often takes months.",
      "The work is detail-heavy. Each payer verifies licenses, DEA registration, board status, malpractice history and hospital privileges, often through the CAQH ProView profile, then decides whether to admit the provider. Missing documents, expired attestations and unanswered payer requests are the most common reasons applications stall.",
      "We build and maintain a credentialing file for each provider, keep CAQH ProView attested and current, submit and track applications inside each payer's process, and monitor expiration dates and re-credentialing cycles so providers stay in network.",
    ],
    scope: [
      "Collecting provider documents: licenses, DEA and state controlled substance registrations, board certificates, malpractice coverage",
      "Creating or updating CAQH ProView profiles and completing re-attestation on schedule",
      "Granting payer access to CAQH profiles and uploading supporting documents",
      "Completing commercial payer credentialing applications and network participation requests",
      "Tracking application status and answering payer requests for more information",
      "Monitoring license, DEA, malpractice and board certification expiration dates",
      "Managing re-credentialing cycles, commonly every two to three years depending on the payer",
      "Maintaining a credentialing file and status tracker for every provider and payer",
    ],
    workflow: [
      { title: "Intake", detail: "Gather each provider's documents, work history, practice locations and the list of payers your practice wants to join." },
      { title: "CAQH ProView", detail: "Build or update the provider's profile, upload documents, authorize the target payers and attest that the data is accurate." },
      { title: "Applications", detail: "Submit each payer's credentialing application or participation request, following its forms and portal process." },
      { title: "Follow up", detail: "Check status regularly, respond to payer questions and supply missing items until the payer reaches a decision." },
      { title: "Confirm", detail: "Record the effective date, provider ID and network status, and share them with your billing team before claims go out." },
      { title: "Maintain", detail: "Re-attest CAQH, renew expiring documents and complete re-credentialing so participation does not lapse." },
    ],
    benefits: [
      { title: "Fewer stalled applications", detail: "Complete files and prompt answers to payer requests are designed to keep applications moving." },
      { title: "Fewer lapses", detail: "Tracking expirations and re-credentialing dates aims to prevent providers from dropping out of network unexpectedly." },
      { title: "Clear status at a glance", detail: "A tracker by provider and payer shows exactly where each application stands." },
      { title: "Coordination with billing", detail: "Sharing effective dates before scheduling helps avoid claims submitted before participation begins." },
    ],
    practiceTypes: ["family-medicine", "behavioral-health", "mental-health-clinics", "physical-therapy", "urgent-care", "multi-specialty", "home-health", "general-dentistry"],
    faqs: [
      {
        q: "What is the difference between credentialing and enrollment?",
        a: "Credentialing is the verification of a provider's qualifications, while enrollment is the step that sets the provider up to bill a specific payer. With commercial plans the two often happen together as one participation process. With Medicare and Medicaid, enrollment is a separate application, such as Medicare enrollment through PECOS, that links the provider to billing privileges and payment details.",
      },
      {
        q: "How long does credentialing take?",
        a: "Credentialing commonly takes anywhere from about 60 days to several months per payer, and some networks take longer or close to new providers in certain areas. Timing depends on the payer's backlog, how complete the application is and how quickly requests for information are answered. Starting well before a provider's first day is the most reliable way to avoid gaps.",
      },
      {
        q: "What is CAQH ProView?",
        a: "CAQH ProView is a widely used online system where providers enter their credentialing information once and authorize participating health plans to access it. Many commercial payers rely on it instead of separate paper applications. Providers must re-attest their profile on a recurring schedule, currently about every 120 days, and keep documents such as licenses and malpractice certificates current to avoid delays.",
      },
      {
        q: "How often is re-credentialing required?",
        a: "Most payers re-credential providers on a regular cycle, commonly every two to three years, to confirm that licenses, board status, malpractice coverage and history remain in order. The payer typically sends a notice or relies on the CAQH ProView profile. Missing a re-credentialing request can lead to termination from the network, so tracking each payer's cycle matters.",
      },
      {
        q: "Can a provider see patients while credentialing is pending?",
        a: "A provider can see patients, but claims to a payer that has not approved the provider are often denied or paid as out of network. Some payers allow limited retroactive effective dates and others do not. Your practice should decide, payer by payer, whether to schedule those patients, bill under a different arrangement the payer permits or wait for approval.",
      },
    ],
    relatedTools: ["credentialing-checklist", "npi-lookup"],
    relatedServices: ["provider-enrollment", "payer-contracting", "practice-management-support", "insurance-eligibility-verification"],
    seoTitle: "Medical Credentialing Services for Providers",
    metaDescription:
      "Medical credentialing support covering CAQH ProView upkeep, payer applications, status follow-up and re-credentialing tracking for your providers.",
    keywords: ["medical credentialing", "provider credentialing", "CAQH ProView", "insurance credentialing", "re-credentialing", "payer network participation"],
  },

  /* ------------------------------------------------------------------ */
  /*  Provider enrollment                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "provider-enrollment",
    name: "Provider Enrollment",
    shortName: "Provider Enrollment",
    category: "enrollment",
    icon: "UserCheck",
    summary: "Medicare, Medicaid and commercial enrollment filings, from NPI setup and PECOS applications to revalidations and practice changes.",
    definition:
      "Provider enrollment is the process of registering a provider or group with a payer so it can submit claims and receive payment. It includes obtaining NPIs through NPPES, filing Medicare applications through PECOS or the CMS-855 forms, enrolling with state Medicaid programs and managed care plans, setting up electronic payment, and reporting changes or revalidations on time.",
    intro: [
      "Enrollment determines whether a payer will pay your practice at all. A provider who is credentialed but not correctly enrolled, linked to the wrong group or missing a practice location can generate claims that reject or deny even though the care was appropriate.",
      "Government programs have their own rules. Medicare enrollment runs through PECOS or the paper CMS-855 forms: the 855I for individual practitioners, the 855B for clinics and group practices, the 855A for institutional providers and the 855O for providers who only order or refer. Medicaid enrollment is handled by each state, often with separate steps for managed care plans. Both require periodic revalidation and timely reporting of changes.",
      "We prepare and track enrollment filings for new providers, new locations and ownership or address changes, keep NPPES and PECOS data consistent, and remind your practice of revalidation deadlines well before they arrive.",
    ],
    scope: [
      "Applying for or updating Type 1 (individual) and Type 2 (organization) NPIs in NPPES",
      "Medicare enrollment through PECOS or CMS-855I, 855B, 855A and 855O applications",
      "Reassigning Medicare benefits from individual providers to the group",
      "State Medicaid enrollment and Medicaid managed care plan enrollment",
      "Commercial payer enrollment and group or location linking",
      "Electronic funds transfer (EFT) and ERA enrollment with payers and clearinghouses",
      "Reporting changes of address, ownership, tax ID or practice location",
      "Tracking Medicare and Medicaid revalidation deadlines and filing on time",
    ],
    workflow: [
      { title: "Collect data", detail: "Gather provider and practice identifiers, tax ID documents, ownership details, licenses and bank information for EFT." },
      { title: "Align identifiers", detail: "Confirm NPI, taxonomy, legal name and addresses match across NPPES, the IRS record and your billing system." },
      { title: "File", detail: "Submit Medicare, Medicaid and commercial enrollment applications in the order that fits your start dates and payer mix." },
      { title: "Respond", detail: "Answer contractor or payer development requests quickly and supply any missing signatures or documents." },
      { title: "Activate", detail: "Record approval letters, effective dates and payer IDs, and complete EFT and ERA setup so payments arrive electronically." },
      { title: "Maintain", detail: "Report changes within required timeframes and file revalidations before their due dates." },
    ],
    benefits: [
      { title: "Consistent identifiers", detail: "Matching NPPES, PECOS and payer records is designed to prevent rejections caused by mismatched data." },
      { title: "Fewer enrollment gaps", detail: "Tracking start dates and revalidations aims to keep billing privileges active without interruption." },
      { title: "Electronic payments sooner", detail: "Completing EFT and ERA enrollment alongside the application can shorten the wait for usable remittances." },
      { title: "Changes handled correctly", detail: "Filing address, location and ownership updates on time helps avoid payment holds." },
    ],
    practiceTypes: ["primary-care", "behavioral-health", "physical-therapy", "home-health", "nephrology", "ambulatory-surgery-centers", "multi-specialty", "pediatric-dentistry"],
    faqs: [
      {
        q: "What is PECOS?",
        a: "PECOS, the Provider Enrollment, Chain and Ownership System, is CMS's online system for Medicare enrollment. Providers and suppliers use it to submit initial applications, report changes, reassign benefits to a group and complete revalidation, as an alternative to paper CMS-855 forms. Applications are processed by the provider's Medicare Administrative Contractor, which may send development requests for missing information.",
      },
      {
        q: "Which CMS-855 form does our practice need?",
        a: "The form depends on who is enrolling. Individual physicians and non-physician practitioners use the CMS-855I, clinics and group practices use the CMS-855B, institutional providers such as hospitals and home health agencies use the CMS-855A, and practitioners who only order or refer services use the CMS-855O. Durable medical equipment suppliers use a separate form, and PECOS covers the same filings online.",
      },
      {
        q: "How often does Medicare require revalidation?",
        a: "Medicare requires providers and suppliers to revalidate their enrollment on a regular cycle, generally every five years for most providers and more often for some supplier types such as DMEPOS suppliers. CMS posts due dates in its revalidation lookup tool, and contractors send notices. Missing a deadline can lead to deactivation of billing privileges, so we track each date in advance.",
      },
      {
        q: "Does every provider need to enroll in Medicaid?",
        a: "Providers who bill Medicaid must enroll with the state Medicaid program, and federal rules also require ordering, referring and prescribing providers to be enrolled even if they do not bill directly. Many states deliver Medicaid through managed care plans, which may require separate contracting or credentialing in addition to state enrollment. Requirements differ by state, so we follow each state's process.",
      },
      {
        q: "What is the difference between a Type 1 and Type 2 NPI?",
        a: "A Type 1 NPI identifies an individual provider, such as a physician, therapist or dentist, and stays with that person throughout their career. A Type 2 NPI identifies an organization, such as a group practice, clinic or surgery center. Both are issued through NPPES, and claims typically list both when an individual provider renders services billed under a group.",
      },
    ],
    relatedTools: ["npi-lookup", "credentialing-checklist"],
    relatedServices: ["medical-credentialing", "payer-contracting", "clearinghouse-coordination", "practice-management-support"],
    seoTitle: "Provider Enrollment for Medicare, Medicaid and Payers",
    metaDescription:
      "Provider enrollment support for NPPES, PECOS and CMS-855 filings, state Medicaid and commercial payers, EFT and ERA setup and revalidation tracking.",
    keywords: ["provider enrollment", "Medicare enrollment", "PECOS", "CMS-855", "Medicaid provider enrollment", "NPI registration", "revalidation"],
  },

  /* ------------------------------------------------------------------ */
  /*  Payer contracting                                                  */
  /* ------------------------------------------------------------------ */
  {
    slug: "payer-contracting",
    name: "Payer Contracting Support",
    shortName: "Payer Contracting",
    category: "enrollment",
    icon: "Handshake",
    summary: "Data, document review and organization to help your practice prepare for payer contract requests, renewals and rate discussions.",
    definition:
      "Payer contracting support is administrative and analytical help with the agreements that set how a payer reimburses a practice. It includes organizing current contracts, summarizing key terms, modeling proposed rates against your actual volume, preparing data for renewal discussions and tracking amendments. Final negotiation decisions and legal review remain with the practice and its advisors.",
    intro: [
      "Your payer contracts decide what you are paid for nearly every service, yet many practices cannot quickly answer basic questions about them: which fee schedule applies, when the contract renews, how long you have to file a claim or what notice is needed before a payer changes rates.",
      "Contract terms beyond the rates matter too. Timely filing limits, appeal windows, recoupment rights, policy update clauses, termination notice periods and how rates are tied to a published fee schedule all shape what you actually collect. Knowing these terms helps your team bill, appeal and plan correctly.",
      "We organize your contracts, summarize terms in plain language, model how proposed rates would affect revenue based on your actual claim volume, and prepare the data you need for a renewal conversation. We do not give legal advice; your attorney should review contract language before you sign.",
    ],
    scope: [
      "Building an inventory of current payer contracts, amendments and rate exhibits",
      "Summarizing key terms: rates, fee schedule references, timely filing, appeals, recoupment and termination",
      "Tracking renewal, notice and amendment dates",
      "Modeling proposed rates against your historical volume by code and payer",
      "Comparing payer rates as a percentage of a common benchmark such as the Medicare fee schedule",
      "Preparing summary data on volume, payer mix and services for renewal discussions",
      "Drafting rate review request letters for your approval",
      "Sharing contract terms with billing staff so claims and appeals follow them",
    ],
    workflow: [
      { title: "Inventory", detail: "Locate every active contract and amendment, and request copies from payers where your records are incomplete." },
      { title: "Summarize", detail: "Create a one-page summary per payer with rates basis, key deadlines and terms that affect billing." },
      { title: "Analyze", detail: "Compare payer rates for your highest-volume codes and model the effect of any proposed change." },
      { title: "Prepare", detail: "Assemble the data and talking points your practice needs before a renewal or rate review request." },
      { title: "Support the process", detail: "Draft correspondence and track responses while your practice leads discussions and makes decisions." },
      { title: "Implement", detail: "Once terms are final, help load new rates into your systems and confirm payers apply them correctly." },
    ],
    benefits: [
      { title: "Contracts you can find and read", detail: "An inventory with plain-language summaries is designed to make terms usable by your whole team." },
      { title: "Informed rate discussions", detail: "Modeling against your actual volume aims to show what a rate change would mean in practice." },
      { title: "No missed renewal windows", detail: "Tracked notice dates help your practice act before contracts auto-renew on old terms." },
      { title: "Billing aligned to terms", detail: "Sharing filing and appeal limits with billing staff can reduce avoidable denials." },
    ],
    practiceTypes: ["orthopedics", "cardiology", "gastroenterology", "dermatology", "physical-therapy", "ambulatory-surgery-centers", "multi-specialty", "dental-group-practices"],
    faqs: [
      {
        q: "Can a small practice negotiate rates with payers?",
        a: "Small practices can request rate reviews, though results vary widely by payer, market and the practice's situation. Payers are more likely to consider a request supported by data, such as your volume, quality programs, access in an underserved area or services competitors do not offer. Even when rates do not change, a review can clarify terms and correct outdated fee schedule references.",
      },
      {
        q: "What contract terms matter besides rates?",
        a: "Several non-rate terms directly affect what you collect. These include timely filing and appeal deadlines, how and when the payer can recoup overpayments, whether rates follow an updated fee schedule automatically, how payer policy changes are communicated, auto-renewal and termination notice periods, and any requirements for prior authorization or credentialing. Each one should be summarized for your billing team.",
      },
      {
        q: "What does it mean when rates are a percentage of Medicare?",
        a: "It means the payer pays a set percentage of the Medicare Physician Fee Schedule amount for each code, such as 110 or 130 percent. The contract should specify which year's fee schedule and which geographic locality apply, because Medicare rates change annually. A contract tied to a fixed past year will not move with later Medicare updates.",
      },
      {
        q: "Do you provide legal advice on contracts?",
        a: "No, we do not provide legal advice or act as your attorney. We organize contracts, summarize terms, analyze rates and prepare data so your practice can make informed decisions. Contract language, especially around termination, liability, recoupment and dispute resolution, should be reviewed by a healthcare attorney before you sign or amend an agreement.",
      },
    ],
    relatedTools: ["fee-schedule-comparison-calculator", "payer-mix-calculator", "payment-variance-calculator"],
    relatedServices: ["fee-schedule-analysis", "underpayment-identification", "medical-credentialing", "provider-enrollment", "rcm-analytics-reporting"],
    seoTitle: "Payer Contracting Support for Medical Practices",
    metaDescription:
      "Payer contracting support that inventories your contracts, summarizes key terms, tracks renewals and models proposed rates against your actual volume.",
    keywords: ["payer contracting", "payer contract review", "insurance contract negotiation support", "reimbursement rates", "contract renewal", "percentage of Medicare"],
  },

  /* ------------------------------------------------------------------ */
  /*  Fee schedule analysis                                              */
  /* ------------------------------------------------------------------ */
  {
    slug: "fee-schedule-analysis",
    name: "Fee Schedule Analysis",
    shortName: "Fee Schedule Analysis",
    category: "analytics",
    icon: "FileSpreadsheet",
    summary: "Compare your charge master and payer allowables code by code to find charges set too low, outlier rates and payer gaps.",
    definition:
      "Fee schedule analysis compares a practice's own charges with what each payer allows for the same codes, often using the Medicare Physician Fee Schedule as a common yardstick. It shows where charges sit below what payers would allow, which payers pay well or poorly for your main services, and how annual fee schedule changes affect your revenue.",
    intro: [
      "Your fee schedule, the list of charges in your practice management system, is the starting point for every claim. If a charge is lower than what a payer would allow, many payers pay the lower billed amount, and that money is gone without any denial or adjustment to signal it.",
      "Payer fee schedules also differ widely. A code that one payer reimburses well may be paid far less by another, and rates tied to old fee schedule years fall behind over time. Comparing payers on a common basis, such as a percentage of the Medicare rate for your locality, makes these differences visible.",
      "We pull charges and allowed amounts from your own data, build a code-by-code comparison for your highest-volume services, and explain the results in plain terms so your practice can decide whether to update charges or revisit contracts.",
    ],
    scope: [
      "Extracting your current charge master or fee schedule from your practice management system",
      "Pulling allowed amounts by payer and code from posted remittance data",
      "Comparing charges and allowables to the Medicare Physician Fee Schedule for your locality",
      "Flagging charges that fall below any payer's allowed amount",
      "Ranking payers by reimbursement for your highest-volume codes",
      "Estimating the effect of annual Medicare conversion factor and RVU changes",
      "Reviewing dental fee schedules against PPO allowances where relevant",
      "Recommending a consistent method for setting and updating charges",
    ],
    workflow: [
      { title: "Gather data", detail: "Export your fee schedule and 12 months of charge, allowed and paid data by payer and code." },
      { title: "Set a benchmark", detail: "Calculate Medicare rates for your locality using the published RVUs, geographic adjustments and conversion factor." },
      { title: "Compare", detail: "Express each payer's allowables and your own charges as a percentage of the benchmark for each code." },
      { title: "Flag issues", detail: "Highlight undercharged codes, low-paying payers and codes where payment varies widely across payers." },
      { title: "Model changes", detail: "Estimate how revised charges or rates would change revenue based on your actual volume." },
      { title: "Review together", detail: "Walk through the findings and recommended charge updates with your practice leadership." },
    ],
    benefits: [
      { title: "Charges set with intent", detail: "A benchmark-based method is designed to replace charges that were set years ago and never revisited." },
      { title: "Payer comparison on one scale", detail: "Expressing rates as a percentage of Medicare makes payer differences easier to see." },
      { title: "Fewer hidden shortfalls", detail: "Flagging charges below allowables aims to stop payment being capped by your own fee." },
      { title: "Better contract preparation", detail: "Code-level payer data can support informed rate review requests." },
    ],
    practiceTypes: ["orthopedics", "dermatology", "cardiology", "ophthalmology", "podiatry", "urology", "general-dentistry", "periodontics"],
    faqs: [
      {
        q: "How is the Medicare physician fee calculated?",
        a: "The Medicare Physician Fee Schedule amount is calculated by adjusting three relative value units (work, practice expense and malpractice) by geographic practice cost indices for your locality, adding them together and multiplying by a national conversion factor. CMS publishes these values each year, and payment also varies by setting, such as facility versus non-facility. Many commercial contracts use this amount as their reference point.",
      },
      {
        q: "Why should our charges be higher than what payers allow?",
        a: "Charges should generally sit at or above the highest amount any payer would allow, because many payers pay the lesser of the billed charge or the contracted rate. If your charge is lower, you receive the lower amount without any warning. Your charges should be set using a consistent method and applied equally to all patients and payers, as payer rules typically require.",
      },
      {
        q: "How often should a fee schedule be reviewed?",
        a: "A fee schedule should be reviewed at least once a year, ideally after CMS releases the final Medicare Physician Fee Schedule for the coming year and after major payer contract changes. A yearly review catches charges that have fallen behind allowables, new or deleted codes and shifts in relative value units that change how services compare.",
      },
      {
        q: "Does fee schedule analysis apply to dental practices?",
        a: "Yes, though the benchmark differs. Dental practices bill CDT codes and most dental PPOs pay from their own fee schedules rather than a Medicare-based schedule. The analysis compares your usual fees with each PPO's maximum allowable fees for your most common procedures, highlighting plans that pay well below others and fees that may be set below what some plans would allow.",
      },
    ],
    relatedTools: ["fee-schedule-comparison-calculator", "payer-mix-calculator", "hcpcs-code-lookup", "underpayment-estimator"],
    relatedServices: ["payer-contracting", "underpayment-identification", "rcm-analytics-reporting", "charge-entry"],
    seoTitle: "Fee Schedule Analysis for Medical and Dental Practices",
    metaDescription:
      "Fee schedule analysis comparing your charges and payer allowables with the Medicare fee schedule to find undercharged codes and low-paying payers.",
    keywords: ["fee schedule analysis", "medical fee schedule review", "charge master review", "Medicare physician fee schedule", "payer reimbursement comparison", "RVU analysis"],
  },

  /* ------------------------------------------------------------------ */
  /*  Revenue cycle audit                                                */
  /* ------------------------------------------------------------------ */
  {
    slug: "revenue-cycle-audit",
    name: "Revenue Cycle Auditing",
    shortName: "Revenue Cycle Audit",
    category: "analytics",
    icon: "FileSearch",
    summary: "An independent review of your revenue cycle, from scheduling to final payment, with findings ranked by financial and compliance impact.",
    definition:
      "A revenue cycle audit is a structured review of how a practice moves from scheduling and registration through charge capture, claims, payments, denials and patient collections. It combines key performance indicators, sample claim testing and process walkthroughs to find where revenue is lost, delayed or put at compliance risk, then ranks the findings for action.",
    intro: [
      "Revenue problems rarely have a single cause. A rising denial rate might start with eligibility checks at the front desk, a coding change or a payer policy update. An audit looks across the whole cycle so the fix targets the actual cause rather than the symptom.",
      "A revenue cycle audit uses three lenses. Metrics such as days in AR, denial rate, clean claim rate and net collection rate show where performance is weak. Sample testing follows individual encounters from appointment to final payment to see what actually happened. Process walkthroughs show how staff, systems and policies work in practice.",
      "We conduct audits inside your existing systems, agree the scope and sample with you in advance and deliver a prioritized findings report. Detailed coding accuracy is covered by a separate coding audit, which can be added to the scope.",
    ],
    scope: [
      "Reviewing key metrics: days in AR, AR aging, denial rate, clean claim rate and net collection rate",
      "Testing a sample of encounters from scheduling through final payment or adjustment",
      "Checking registration and eligibility accuracy against claim outcomes",
      "Reconciling scheduled visits and documented services against billed charges",
      "Reviewing payment posting accuracy, adjustments and write-off categories",
      "Assessing denial handling, appeal timeliness and AR follow-up practices",
      "Reviewing credit balances and overpayment handling",
      "A prioritized findings report with recommended process changes",
    ],
    workflow: [
      { title: "Plan", detail: "Agree the audit period, locations, payers and sample size, and confirm system access and reports." },
      { title: "Measure", detail: "Calculate baseline metrics from your own data and compare them across payers, providers and time periods." },
      { title: "Test", detail: "Trace sampled encounters through every revenue cycle step and record each exception found." },
      { title: "Observe", detail: "Walk through front desk, charge entry, posting and follow-up processes with the staff who perform them." },
      { title: "Analyze", detail: "Group exceptions by root cause and estimate their financial and compliance impact." },
      { title: "Report", detail: "Deliver ranked findings with practical recommendations and review them with your leadership." },
    ],
    benefits: [
      { title: "An objective view", detail: "An outside review is designed to see past routines that internal staff may take for granted." },
      { title: "Priorities based on impact", detail: "Ranking findings by financial and compliance effect aims to direct effort where it matters most." },
      { title: "Root causes, not symptoms", detail: "Tracing encounters end to end can show where in the cycle a problem actually starts." },
      { title: "A baseline for improvement", detail: "Documented metrics give your practice a starting point to measure later changes against." },
    ],
    practiceTypes: ["primary-care", "internal-medicine", "cardiology", "orthopedics", "behavioral-health", "ambulatory-surgery-centers", "multi-specialty", "dental-group-practices"],
    faqs: [
      {
        q: "What is the difference between a revenue cycle audit and a coding audit?",
        a: "A revenue cycle audit examines the entire process, from scheduling and registration to payments, denials and collections, to find where revenue is lost or delayed. A coding audit focuses specifically on whether codes and modifiers are supported by clinical documentation. The two complement each other, and a revenue cycle audit often identifies when a deeper coding review is needed.",
      },
      {
        q: "How often should a practice audit its revenue cycle?",
        a: "Many practices benefit from a full revenue cycle audit about once a year, with lighter quarterly metric reviews in between. An audit is also worth doing after a major change, such as a new practice management system, a billing vendor transition, a merger, rapid growth or a sudden rise in denials or days in AR.",
      },
      {
        q: "What metrics does a revenue cycle audit review?",
        a: "Common metrics include days in AR, the share of AR older than 90 or 120 days, denial rate, clean claim rate, first pass acceptance rate, net collection rate and patient collections at the time of service. The audit looks at trends and breakdowns by payer and provider, because an overall average can hide a serious problem with a single payer.",
      },
      {
        q: "Can an audit find overpayments as well as lost revenue?",
        a: "Yes, a sound audit reports problems in both directions. It may find credit balances that have not been refunded, services billed without supporting documentation or payments received for the wrong patient. Federal rules require identified Medicare and Medicaid overpayments to be reported and returned within set deadlines, so these findings are flagged promptly for your practice and its advisors.",
      },
      {
        q: "Will the audit disrupt our staff?",
        a: "Most audit work happens through reports and record review in your systems, so day-to-day disruption is limited. We schedule short walkthroughs with front desk, billing and posting staff at times that suit your practice. The aim is to understand how work actually happens, not to evaluate individual employees, and findings are framed around processes and systems.",
      },
    ],
    relatedTools: ["rcm-performance-scorecard", "net-collection-rate-calculator", "clean-claim-rate-calculator", "revenue-leakage-estimator"],
    relatedServices: ["coding-audit", "rcm-analytics-reporting", "rcm-workflow-optimization", "revenue-recovery", "denial-management"],
    seoTitle: "Revenue Cycle Audit for Medical and Dental Practices",
    metaDescription:
      "Revenue cycle auditing that tests sample encounters, reviews key metrics and ranks findings by financial and compliance impact across your revenue cycle.",
    keywords: ["revenue cycle audit", "RCM audit", "medical billing audit", "revenue cycle assessment", "net collection rate", "billing process review"],
  },
];
