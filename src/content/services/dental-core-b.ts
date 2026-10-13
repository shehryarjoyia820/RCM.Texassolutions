import type { Service } from '../types';

/**
 * Dental-only rewrites (2026-10-13) of five core services:
 * payment posting, A/R management, patient billing, credentialing and reporting.
 * Follows docs/DENTAL-WRITING.md. Slugs are unchanged.
 */
export const dentalCoreB: Service[] = [
  /* ---------------------------------------------------------------- */
  /*  Dental Payment Posting                                           */
  /* ---------------------------------------------------------------- */
  {
    slug: 'payment-posting',
    name: 'Dental Payment Posting',
    shortName: 'Payment Posting',
    category: 'dental',
    icon: 'Wallet',
    summary:
      'Accurate posting of dental carrier and patient payments from EOBs and ERAs. Adjustments, downgrades and underpayments are recorded so every ledger stays correct.',
    definition:
      'Dental payment posting is the recording of carrier payments, patient payments, contractual adjustments and denials in your dental practice software. It draws on paper EOBs, 835 ERAs and front desk receipts, and it must reconcile to deposits so ledgers, aging reports and patient statements reflect what was actually paid and owed.',
    intro: [
      'Posting looks like routine data entry, yet it decides what happens to every claim after the carrier responds. If a PPO write-off is entered as a payment, insurance A/R looks smaller than it really is. If a downgrade or frequency denial is posted as a zero payment with no note, nobody follows up. If the patient portion is calculated from the wrong line, the patient receives a statement for the wrong amount.',
      'Dental remittances add their own wrinkles. One EOB can cover several patients and dozens of CDT codes, carriers apply alternate benefits on posterior fillings, annual maximums run out partway through treatment, and DHMO plans pay a capitation check that has nothing to do with individual claims. Each of these needs a consistent posting rule.',
      'Our team posts insurance payments from ERAs and scanned EOBs, enters patient payments, applies contractual adjustments against your PPO fee schedules, moves balances to secondary carriers or to the patient, and reconciles totals to your bank deposits. We work inside your own software, such as Dentrix, Open Dental, Eaglesoft or Curve Dental, so the ledger your front desk sees is the ledger we update.',
      'The goal is simple: ledgers your team can trust, and a posting process that surfaces denials, downgrades and short payments instead of quietly writing them off.',
    ],
    scope: [
      'Posting dental carrier payments from 835 ERAs and paper or portal EOBs',
      'Entering patient payments from the front desk, mail, portal and card terminals',
      'Applying PPO contractual adjustments and write-offs against your fee schedules',
      'Recording denials, downgrades and frequency limitations with their reason codes',
      'Moving remaining balances to secondary dental plans or to patient responsibility',
      'Posting DHMO capitation and copay amounts under your practice rules',
      'Flagging payments that fall below the expected allowed amount',
      'Handling carrier recoupments, offsets and patient overpayment credits',
      'Reconciling daily posted totals to bank deposits and EFT reports',
    ],
    included: [
      {
        title: 'EOB and ERA payment posting',
        detail:
          'We post each dental carrier remittance at the procedure level, matching every line on the EOB or 835 ERA to the right patient, date of service and CDT code in your software. Electronic remittances are auto-posted where your system supports it and then reviewed line by line, because auto-posting can misapply bundled payments or skip lines it does not recognize. Paper and portal EOBs are keyed manually from the image. Bulk checks that cover many patients are split correctly, and any line that cannot be matched, such as a claim for a patient who is not in your system, is logged and researched instead of being left as an unapplied credit on the ledger.',
      },
      {
        title: 'Insurance and patient payment entry',
        detail:
          'Insurance and patient money are posted separately so each balance tells the truth. Patient payments taken at checkout, through the mail, on a patient portal or by phone are entered against the correct procedures, with the payment type recorded so your daily deposit report matches. When a patient pays an estimate at the time of service and the carrier later pays more or less than expected, we adjust the allocation so the account shows either a true balance due or a credit to refund. Prepayments for treatment plans, such as orthodontic down payments, are recorded according to the rules your practice sets.',
      },
      {
        title: 'Contractual adjustments',
        detail:
          'For in-network PPO plans, the difference between your office fee and the carrier fee schedule must be written off, and the write-off has to be accurate to the line. We apply contractual adjustments using the adjustment types your practice already uses, so production and collection reports stay comparable over time. Alternate benefit downgrades, non-covered services and amounts over the annual maximum are treated differently from a contractual write-off, because in many cases they become patient responsibility under the plan and your contract. We follow your written policy for each situation and flag any adjustment that looks unusual, such as a write-off larger than the fee itself.',
      },
      {
        title: 'Payment reconciliation',
        detail:
          'Every posting session ends with a reconciliation. We compare the total posted to the day\'s bank deposits, EFT notices, card batch reports and lockbox files, then look for gaps: an EFT that arrived without a matching ERA, a check that was posted twice, or a patient payment that was collected but never entered. Carrier payments sent by virtual card or bundled EFT are traced back to the individual claims they cover. Discrepancies are listed in a short reconciliation note for your office manager, so month-end closing is a review of known items rather than a search for missing money.',
      },
      {
        title: 'Underpayment and discrepancy identification',
        detail:
          'Posting is the first point where a short payment can be caught. We compare what each carrier paid against the allowed amounts in your fee schedules and against the pre-treatment estimate when one exists. Lines paid below the expected amount, downgraded without a clear reason, or denied for frequency or missing information are flagged for follow-up instead of being written off. We also watch for patterns, such as one carrier reducing the same CDT code across many claims or applying an old fee schedule. Those findings feed the A/R and denial teams so the right claims get reviewed, corrected or appealed while they are still timely.',
      },
    ],
    workflow: [
      {
        title: 'Gather remittances',
        detail:
          'Each business day we collect ERAs from your clearinghouse, scanned paper EOBs, carrier portal remittances, EFT notices and patient payment batches, so nothing waits in a mail tray or inbox.',
      },
      {
        title: 'Post insurance payments',
        detail:
          'We post carrier payments line by line in your dental software, applying contractual adjustments, downgrades and denials with the correct adjustment types and reason notes.',
      },
      {
        title: 'Post patient payments',
        detail:
          'Front desk, mail and portal payments are entered against the right procedures, and estimate overpayments or underpayments are resolved so balances reflect the final carrier decision.',
      },
      {
        title: 'Transfer balances',
        detail:
          'Remaining amounts move to the secondary dental plan when coordination of benefits applies, or to patient responsibility when the primary and secondary have both paid.',
      },
      {
        title: 'Reconcile to deposits',
        detail:
          'Posted totals are matched to bank deposits, EFTs and card batches. Any gap is researched and noted for your office manager the same day where possible.',
      },
      {
        title: 'Route exceptions',
        detail:
          'Denials, underpayments, recoupments and unmatched payments are sent to follow-up with the details needed to act, so they are worked rather than written off.',
      },
    ],
    benefits: [
      {
        title: 'Ledgers you can rely on',
        detail:
          'Consistent posting rules are designed to keep patient and insurance balances accurate, which supports correct statements and fewer billing questions at the front desk.',
      },
      {
        title: 'Earlier view of short payments',
        detail:
          'Comparing each payment with your fee schedules can help catch downgrades and underpayments while there is still time to question them with the carrier.',
      },
      {
        title: 'Cleaner month-end close',
        detail:
          'Daily reconciliation to deposits aims to leave only known, documented differences at month end instead of unexplained gaps.',
      },
      {
        title: 'More reliable reporting',
        detail:
          'When adjustments are coded the same way every time, collection and adjustment reports become a more trustworthy picture of how your practice is being paid.',
      },
    ],
    practiceTypes: ['general-dentistry', 'orthodontics', 'endodontics', 'periodontics', 'oral-surgery', 'pediatric-dentistry', 'prosthodontics', 'dental-group-practices'],
    faqs: [
      {
        q: 'What is the difference between an EOB and an ERA in dental billing?',
        a: 'An EOB is the explanation of benefits a dental carrier sends on paper or through its portal, while an ERA is the electronic 835 remittance file that carries the same payment details. ERAs can often be auto-posted into your dental software, but they still need review, because bundled payments, downgrades and unrecognized lines can post incorrectly without a person checking them.',
      },
      {
        q: 'Do you post payments inside our own dental software?',
        a: 'Yes, we post directly in the practice management system you already use, such as Dentrix, Open Dental, Eaglesoft or Curve Dental. Working in your own system means your front desk sees updated ledgers right away, and your reports keep using the same adjustment types and payment codes your practice has always used. A Business Associate Agreement is signed before we access any patient data.',
      },
      {
        q: 'How do you handle downgrades and alternate benefits?',
        a: 'We post a downgrade as the carrier processed it and record the reason, rather than writing the difference off automatically. Whether the remaining amount becomes patient responsibility depends on the plan, your network contract and your state rules, so we follow the written policy your practice provides and flag any downgrade that looks inconsistent with how that carrier has paid before.',
      },
      {
        q: 'What happens when a payment does not match the expected amount?',
        a: 'Payments that fall below the expected allowed amount are flagged instead of adjusted off. We note the CDT code, carrier, expected amount and reason code, then route the item to follow-up so it can be checked against your fee schedule and the pre-treatment estimate. If the carrier made an error, the claim can be reprocessed or appealed while it is still within the carrier time limits.',
      },
      {
        q: 'Can you reconcile EFT payments that cover many claims?',
        a: 'Yes, matching bundled EFT payments to their claims is part of our daily reconciliation. Carriers often pay many claims in one electronic deposit, so we use the ERA trace number to tie each deposit to its remittance and then to individual patients. When an EFT arrives without an ERA, we request the remittance from the carrier or clearinghouse before posting.',
      },
      {
        q: 'How are DHMO capitation payments posted?',
        a: 'DHMO capitation checks are posted under the method your practice already uses, usually as a monthly payment that is not tied to individual claims. Patient copays for DHMO procedures are posted at the visit level. Keeping capitation separate from fee-for-service payments helps your reports show how each plan type contributes to revenue, which matters when reviewing carrier participation.',
      },
    ],
    relatedTools: ['eob-explained', 'fee-schedule-comparison-calculator', 'dental-insurance-collection-calculator', 'net-collection-rate-calculator'],
    relatedServices: [
      'dental-insurance-verification',
      'dental-claims-processing',
      'denial-management',
      'dental-accounts-receivable',
      'patient-billing',
      'dental-credentialing',
      'rcm-analytics-reporting',
      'dental-billing',
      'revenue-cycle-management',
    ],
    seoTitle: 'Dental Payment Posting Services: EOB & ERA Posting',
    metaDescription:
      'Dental payment posting services: EOB and ERA posting, PPO contractual adjustments, deposit reconciliation and underpayment flags inside your dental software.',
    keywords: [
      'dental payment posting',
      'dental payment posting services',
      'dental EOB posting',
      'dental ERA posting',
      'dental insurance payment posting',
      'PPO contractual adjustments dental',
      'dental payment reconciliation',
      'dental underpayment identification',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dental A/R Management                                            */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dental-accounts-receivable',
    name: 'Dental A/R Management',
    shortName: 'Accounts Receivable (A/R)',
    category: 'dental',
    icon: 'Hourglass',
    summary:
      'Organized follow-up on unpaid dental insurance claims by age, carrier and dollar value. We work aging reports, call carriers and clean up old balances.',
    definition:
      'Dental A/R management is the ongoing follow-up of unpaid dental insurance claims until each one is paid, corrected, appealed or properly closed. It uses the insurance aging report to prioritize claims by age and value, then works them through carrier portals, phone calls and resubmissions so outstanding balances do not quietly pass carrier filing limits.',
    intro: [
      'Most dental offices know the feeling: the insurance aging report grows a little every month, the 90+ day column fills with claims nobody remembers, and the person who used to chase them is now busy checking in patients. Claims rarely sit unpaid for a single reason. Some were never received, some are waiting on an x-ray or narrative, some were denied and the EOB was misfiled, and some were paid but never posted.',
      'Dental A/R follow-up is the disciplined work of finding out which situation each claim is in and then taking the next step. That means checking claim status on the carrier portal, calling when the portal is not enough, sending missing attachments, correcting and resubmitting, and escalating to the denial team when an appeal is needed.',
      'Our team works your insurance aging report inside your dental software and the carrier portals you already use. We prioritize by age, dollar value and carrier timely filing rules, and we document every action in the claim notes so your staff can see where each claim stands without asking.',
      'For practices with a large backlog, we also run one-time A/R cleanup projects that sort old claims into collectible, correctable and closed, then work the collectible ones first.',
    ],
    scope: [
      'Working the insurance aging report in 30, 60, 90 and 120+ day buckets',
      'Checking claim status on dental carrier portals and clearinghouse reports',
      'Calling carriers when portal status is unclear or a claim is stalled',
      'Sending requested x-rays, narratives, perio charts and other attachments',
      'Correcting and resubmitting claims that were rejected or never received',
      'Referring denied claims to appeal with the supporting documents',
      'Tracking carrier timely filing and appeal deadlines on open claims',
      'Documenting every follow-up action in your claim notes',
      'Running one-time cleanup projects on aged insurance balances',
    ],
    included: [
      {
        title: '30/60/90+ day A/R follow-up',
        detail:
          'We work open dental insurance claims by aging bucket, with a clear rule for each one. Claims around 30 days old get a status check to confirm the carrier received them and is processing them. Claims past 60 days get a closer look for missing information, pended reviews or requests for documentation that may have been mailed to the office. Claims past 90 days are treated as at risk and worked first, since some carriers have filing and appeal windows that close quickly. Higher-value claims, such as crowns, implants and periodontal surgery, are prioritized within each bucket so effort goes where the most revenue is waiting.',
      },
      {
        title: 'Outstanding insurance claim follow-up',
        detail:
          'Every unpaid claim gets a documented next step. We confirm whether the claim was received, whether it is pending, and whether the carrier needs anything from the office. Common findings include claims waiting on radiographs or a narrative, coordination of benefits questions sent to the patient, claims processed under the wrong member ID, and claims that were paid but never posted to the ledger. Each finding leads to an action, such as sending the attachment, correcting the subscriber details or posting the missing payment. The goal is to move each claim forward rather than simply recording that it is still open.',
      },
      {
        title: 'Insurance payer calls and portal follow-up',
        detail:
          'Most dental carriers offer portal tools for claim status, and we use them first because they are faster and leave a record. When the portal shows a vague status, a claim has been pending too long, or a processing error needs to be explained, we call the carrier provider service line. Each call is logged with the date, the representative, the reference number and what was agreed. Those notes make a later appeal or escalation much easier, because the practice can show exactly when it asked for help and what the carrier said in response. Calls are made on your behalf as part of your billing team.',
      },
      {
        title: 'Aging report analysis',
        detail:
          'Before we work a claim, we look at the aging report as a whole. We break open insurance balances down by carrier, procedure type, provider and age to find where claims are stalling. One carrier holding many claims past 60 days may point to an enrollment or ERA setup problem. A cluster of unpaid implant or crown claims may point to missing attachments. Many small balances from one plan may reflect a fee schedule mismatch. These patterns guide the order of follow-up and are shared with your office manager, since some causes, such as attachments missing at submission, are easier to fix at the front end.',
      },
      {
        title: 'A/R cleanup and recovery projects',
        detail:
          'When an aging report has built up over months or years, ongoing follow-up alone may not catch up. A cleanup project starts by sorting old insurance balances into groups: claims that can still be paid or appealed, claims that were paid but posted incorrectly, duplicate or test claims, and claims past every carrier deadline. Collectible claims are worked first, highest value first. Balances that cannot be recovered are documented and presented to the practice for a decision on adjustment, using the adjustment codes you approve. The project ends with a cleaner report that reflects money that can actually still be collected.',
      },
    ],
    workflow: [
      {
        title: 'Review the aging report',
        detail:
          'We pull your insurance aging report from your dental software and sort open claims by age, carrier, procedure value and filing deadline to set the work order.',
      },
      {
        title: 'Check claim status',
        detail:
          'Each claim is checked on the carrier portal or clearinghouse to confirm receipt, processing status and any request for information.',
      },
      {
        title: 'Take the next action',
        detail:
          'Depending on the finding, we send attachments, correct and resubmit, post a missed payment, call the carrier or refer the claim for appeal.',
      },
      {
        title: 'Document in claim notes',
        detail:
          'Every action, call reference and next follow-up date is recorded in your software, so your staff can answer patient or doctor questions at a glance.',
      },
      {
        title: 'Escalate what is stuck',
        detail:
          'Claims that need a doctor narrative, a patient update or a policy decision are sent to your team with a clear request and due date.',
      },
      {
        title: 'Report progress',
        detail:
          'We share a regular summary of balances by aging bucket and carrier, plus the main reasons claims are unpaid, so trends are visible over time.',
      },
    ],
    benefits: [
      {
        title: 'Fewer claims lost to deadlines',
        detail:
          'Tracking filing and appeal windows on every open claim is designed to reduce the number of claims that age past the point of recovery.',
      },
      {
        title: 'Clear status on every claim',
        detail:
          'Consistent claim notes can help your front desk answer patient and doctor questions without stopping to research each account.',
      },
      {
        title: 'Root causes made visible',
        detail:
          'Looking at aging by carrier and procedure aims to show the upstream problems, such as missing attachments, that keep creating new unpaid claims.',
      },
      {
        title: 'A more realistic aging report',
        detail:
          'Cleanup work can help your report reflect money that is truly collectible, which supports better cash flow planning.',
      },
    ],
    practiceTypes: ['general-dentistry', 'orthodontics', 'endodontics', 'periodontics', 'oral-surgery', 'pediatric-dentistry', 'prosthodontics', 'dental-group-practices'],
    faqs: [
      {
        q: 'What is dental A/R management?',
        a: 'Dental A/R management is the follow-up of unpaid dental insurance claims until each one is paid, corrected, appealed or closed. It starts with the insurance aging report, prioritizes claims by age, value and carrier deadline, and works them through portals, phone calls and resubmissions. Each step is documented so the practice always knows where a claim stands.',
      },
      {
        q: 'Which claims do you work first?',
        a: 'We usually work claims closest to a carrier filing or appeal deadline first, then higher-value claims within each aging bucket. A 100-day-old implant claim generally comes before a 35-day-old prophy claim. We confirm priorities with your office manager at the start, because some practices want a particular carrier or provider handled first for operational reasons.',
      },
      {
        q: 'Do you call dental insurance carriers for us?',
        a: 'Yes, we contact carriers on your behalf as part of your revenue cycle team. We use carrier portals first, since they are faster and leave a written record, and call provider service lines when a status is unclear, a claim has stalled or a processing error needs explanation. Each call is logged with a reference number in your claim notes.',
      },
      {
        q: 'Can you clean up very old insurance A/R?',
        a: 'Yes, we run one-time cleanup projects for aged insurance balances. We sort old claims into collectible, correctable, already paid but unposted, and past every deadline, then work the collectible group first. Balances that cannot be recovered are listed for your approval before any adjustment is made, so the practice stays in control of write-off decisions.',
      },
      {
        q: 'How is A/R follow-up different from denial management?',
        a: 'A/R follow-up covers every unpaid claim, while denial management focuses on claims a carrier has already denied. Many unpaid dental claims are not denied at all; they are missing attachments, pended or never received. When follow-up finds a denial that needs a formal appeal, it moves to our Denial Management & Appeals service with the documents gathered so far.',
      },
      {
        q: 'Does A/R management include patient balances?',
        a: 'This service focuses on insurance balances owed by dental carriers. Patient balances are handled separately under Patient Billing & Collections Support, which covers statements, balance review and respectful follow-up. Keeping the two apart helps each report show a clear picture, although both teams share notes so a claim and its patient portion stay in step.',
      },
    ],
    relatedTools: ['dental-ar-aging-calculator', 'days-in-ar-calculator', 'net-collection-rate-calculator', 'dental-insurance-collection-calculator'],
    relatedServices: [
      'dental-insurance-verification',
      'dental-claims-processing',
      'denial-management',
      'payment-posting',
      'patient-billing',
      'dental-credentialing',
      'rcm-analytics-reporting',
      'dental-billing',
      'revenue-cycle-management',
    ],
    seoTitle: 'Dental Accounts Receivable (A/R) Management Services',
    metaDescription:
      'Dental A/R management for unpaid insurance claims: aging report analysis, carrier portal and phone follow-up, resubmissions and cleanup of old balances.',
    keywords: [
      'dental A/R management',
      'dental accounts receivable management',
      'dental insurance A/R follow-up',
      'dental aging report',
      'dental A/R cleanup',
      'dental claim follow-up',
      'unpaid dental insurance claims',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Patient Billing & Collections Support                            */
  /* ---------------------------------------------------------------- */
  {
    slug: 'patient-billing',
    name: 'Patient Billing & Collections Support for Dental Practices',
    shortName: 'Patient Billing/Collections',
    category: 'dental',
    icon: 'Receipt',
    summary:
      'Clear, accurate patient statements and respectful balance follow-up for dental practices. We review balances before they go out and support your payment plan policy.',
    definition:
      'Dental patient billing and collections support is the preparation of accurate patient statements and the courteous follow-up of patient balances under your practice policy. It includes reviewing balances after insurance pays, allocating payments correctly, sending statements and reminders, and coordinating questions with your front desk. It is billing support, not a collection agency service.',
    intro: [
      'A patient statement is often the most personal part of the billing process. If it shows a balance that should have been billed to a secondary plan, or a charge the patient already paid at checkout, the result is a confused phone call and a patient who trusts the practice a little less. Getting the statement right before it goes out matters as much as following up after.',
      'Dental patient balances come from many places: deductibles, coinsurance on basic and major services, amounts over the annual maximum, frequency limits, waiting periods, non-covered services and estimate differences after the carrier pays. Each of these needs to be calculated from the final EOB, not from the estimate given at the visit.',
      'Our team reviews patient balances in your dental software after insurance has paid, corrects allocation problems, prepares statements on the schedule you set, and follows up on outstanding balances with polite reminders. We follow your financial policy for payment plans, card on file use and small balance handling, and we route disputes or hardship questions to your staff.',
      'We are not a collection agency. Decisions about any account beyond routine reminders, including whether to involve an outside agency, always stay with your practice.',
    ],
    scope: [
      'Reviewing patient balances after primary and secondary insurance have paid',
      'Correcting balances that should still be billed to a carrier',
      'Allocating patient payments and credits to the correct procedures',
      'Preparing and sending patient statements on your billing cycle',
      'Sending courteous balance reminders by the channels your practice uses',
      'Setting up payment plans within the terms your practice approves',
      'Identifying credit balances and preparing refund lists for approval',
      'Answering or routing patient billing questions to your front desk',
      'Flagging accounts that need a practice decision under your policy',
    ],
    included: [
      {
        title: 'Patient statement processing',
        detail:
          'We prepare patient statements in your dental software on the cycle you choose, such as weekly or monthly batches. Before a statement goes out, we confirm that insurance has finished processing, that secondary coverage was billed where it applies, and that the balance matches the final EOB. Statements are formatted to be easy to read, showing the date of service, what insurance paid and what the patient owes, with clear instructions for paying. If your practice uses a statement vendor or text and email billing through its software, we work within that setup rather than adding a new system.',
      },
      {
        title: 'Patient balance review',
        detail:
          'Balance review is where many statement errors are caught. We look for balances that exist only because a carrier payment has not been posted, because a contractual write-off was missed, or because the patient paid an estimate that was higher than the final responsibility. We also check for balances created by frequency limits, waiting periods or annual maximums, so the reason is clear if the patient calls. Accounts that show a credit are listed separately. Correcting these issues before statements go out is designed to reduce billing calls and keep patient conversations focused on accurate amounts.',
      },
      {
        title: 'Payment allocation',
        detail:
          'Patient payments need to land on the right procedures and the right family members. A payment made for one child in a family account, or a down payment on a treatment plan, can easily be applied to the wrong line and create both a false balance and a false credit. We allocate payments according to your practice rules, move misapplied payments, and apply unearned prepayments when the work is completed. For orthodontic contracts, we follow the payment schedule your practice uses. Clean allocation is what lets your aging report and statements agree with each other.',
      },
      {
        title: 'Outstanding patient balance follow-up',
        detail:
          'For balances that remain unpaid after a statement, we send polite reminders using the methods your practice already supports, such as follow-up statements by mail or the electronic statements your software already sends. We do not phone patients; conversations about balances stay with your front desk. The tone stays respectful and factual: what the balance is for, what insurance paid and how to pay. Patients who ask about a payment plan are offered the options your practice has approved. Accounts that remain unpaid after your reminder sequence are listed for your review, and any next step, including referral to an outside agency, is a decision your practice makes.',
      },
      {
        title: 'Patient billing coordination',
        detail:
          'Patient billing touches the front desk, the treatment coordinator and the doctor. We keep those connections clear by noting each account action in your software, passing billing questions that need a clinical answer to the right person, and flagging accounts with disputes, hardship requests or pending insurance questions so they are not sent another reminder. When patients call about their balance, your staff can see what was sent and why. We also share recurring causes of patient confusion, such as estimates that missed a waiting period, so your intake and verification steps can address them.',
      },
    ],
    workflow: [
      {
        title: 'Confirm your financial policy',
        detail:
          'We start by documenting your rules for statement cycles, payment plans, small balances, card on file and when an account needs a practice decision.',
      },
      {
        title: 'Review balances after insurance',
        detail:
          'Each patient balance is checked against the final EOBs to confirm insurance is finished and the amount owed is correct.',
      },
      {
        title: 'Fix allocation and credits',
        detail:
          'Misapplied payments are moved, unposted carrier payments are flagged, and credit balances are listed for refund approval.',
      },
      {
        title: 'Send statements',
        detail:
          'Accurate statements go out through your software or statement vendor on the agreed schedule, with clear payment instructions.',
      },
      {
        title: 'Follow up respectfully',
        detail:
          'Unpaid balances receive courteous reminders under your policy, and payment plan requests are set up within the terms you approve.',
      },
      {
        title: 'Hand off decisions',
        detail:
          'Disputes, hardship requests and accounts at the end of your reminder sequence are passed to your team with notes for a decision.',
      },
    ],
    benefits: [
      {
        title: 'Fewer statement errors',
        detail:
          'Reviewing balances before statements go out is designed to reduce bills sent for the wrong amount or before insurance has finished paying.',
      },
      {
        title: 'Better patient conversations',
        detail:
          'Clear statements and documented account notes can help your staff answer billing questions quickly and with confidence.',
      },
      {
        title: 'Steadier patient payments',
        detail:
          'A consistent statement and reminder schedule aims to keep patient balances from aging without anyone noticing.',
      },
      {
        title: 'Policy applied consistently',
        detail:
          'Following one written financial policy for every account can help treat patients fairly and reduce one-off exceptions.',
      },
    ],
    practiceTypes: ['general-dentistry', 'orthodontics', 'pediatric-dentistry', 'periodontics', 'endodontics', 'oral-surgery', 'prosthodontics', 'dental-group-practices'],
    faqs: [
      {
        q: 'Are you a collection agency?',
        a: 'No, we are not a collection agency. We support your in-house patient billing by preparing accurate statements, allocating payments and sending courteous reminders under your practice policy. Any step beyond routine reminders, including whether to refer an account to an outside agency, is a decision your practice makes. We simply list those accounts for your review.',
      },
      {
        q: 'When should a dental patient statement be sent?',
        a: 'A dental patient statement is best sent after the primary and any secondary carrier have finished processing the claim. Sending earlier, based only on the estimate, often produces a wrong balance and a confused patient. We check the final EOBs, confirm the balance and then include the account in your next statement cycle.',
      },
      {
        q: 'Can you set up payment plans for our patients?',
        a: 'Yes, within the terms your practice approves. We document your payment plan rules, such as minimum balance, number of payments and whether a card on file is required, and then set up plans for patients who ask. We do not create terms outside your policy, and any special request is passed to your office manager.',
      },
      {
        q: 'How do you handle patients who dispute a balance?',
        a: 'A disputed balance is paused from further reminders while we research it. We review the EOB, the estimate given at the visit and the payment history, then explain the findings to your staff or to the patient as your practice prefers. If the dispute reveals an insurance issue, such as a missed secondary claim, we fix it before billing resumes.',
      },
      {
        q: 'Do you handle patient credit balances and refunds?',
        a: 'We identify credit balances and prepare a refund list for your approval, but refunds are issued by your practice. Credits often come from estimate payments that were higher than the final patient portion. Before listing a refund, we check whether the credit should instead be applied to another open balance for the same patient or family.',
      },
    ],
    relatedTools: ['dental-insurance-collection-calculator', 'net-collection-rate-calculator', 'dental-practice-revenue-calculator', 'eob-explained'],
    relatedServices: [
      'dental-insurance-verification',
      'dental-claims-processing',
      'denial-management',
      'payment-posting',
      'dental-accounts-receivable',
      'dental-credentialing',
      'rcm-analytics-reporting',
      'dental-billing',
      'revenue-cycle-management',
    ],
    seoTitle: 'Dental Patient Billing & Collections Support',
    metaDescription:
      'Dental patient billing and collections support: accurate statements, balance review, payment allocation and respectful reminders under your office policy.',
    keywords: [
      'dental patient billing',
      'dental patient billing services',
      'dental patient collections support',
      'dental patient statements',
      'dental payment plans',
      'dental patient balance follow-up',
      'dental credit balance refunds',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dental Credentialing & Provider Enrollment                       */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dental-credentialing',
    name: 'Dental Credentialing & Provider Enrollment',
    shortName: 'Credentialing & Enrollment',
    category: 'dental',
    icon: 'BadgeCheck',
    summary:
      'Credentialing and network enrollment for dentists with PPO carriers and state Medicaid dental programs. Includes updates, re-credentialing and EFT/ERA setup.',
    definition:
      'Dental credentialing is the process of verifying a dentist\'s qualifications with dental carriers and enrolling the provider and practice in their networks. It covers applications, CAQH profiles where carriers use them, NPI and tax ID details, state Medicaid dental enrollment, re-credentialing and EFT/ERA setup, so claims are accepted and paid at in-network rates.',
    intro: [
      'Dentist credentialing is often the first billing task for a new provider. A new associate cannot be billed in network until each carrier has approved the application and loaded the dentist under the right practice location and tax ID. A practice that opens a second office, changes its tax ID or moves to a group billing arrangement faces the same problem at a larger scale. When credentialing falls behind, claims are denied, paid out of network or sent to the wrong address.',
      'Dental credentialing has its own landscape. Many dental PPO networks are run by large carriers with their own applications, some networks are leased to other plans, some carriers use CAQH ProView for provider data while others do not, and Medicaid dental programs are run by each state, often through a dental benefit administrator or managed care plan with its own enrollment rules.',
      'Our dentist credentialing service prepares and submits credentialing and enrollment applications, keeps CAQH profiles current where carriers rely on them, checks NPI records, follows up with carriers until each application is approved, and sets up EFT and ERA enrollment so payments arrive electronically. We track every application and re-credentialing date in one place. Within dental revenue cycle management, dental insurance credentialing sits at the very start, because a claim for a dentist who is not yet approved and enrolled at your location cannot be paid at in-network rates.',
      'Credentialing does not include negotiating fees with carriers, and no one can promise a carrier will accept an application or open a network to a new provider. What we can do is make sure applications are complete, accurate and followed up.',
    ],
    scope: [
      'Credentialing new dentists and hygienists where carriers require it',
      'Enrolling the practice and providers in dental PPO and DHMO networks',
      'Enrolling providers with state Medicaid dental programs and administrators',
      'Creating, updating and re-attesting CAQH ProView profiles where used',
      'Checking Type 1 and Type 2 NPI records in NPPES for accuracy',
      'Tracking application status and following up with carrier enrollment teams',
      'Submitting address, tax ID, ownership and location changes to carriers',
      'Managing re-credentialing deadlines and document expirations',
      'Setting up EFT and ERA enrollment with carriers and the clearinghouse',
    ],
    included: [
      {
        title: 'Dental provider credentialing',
        detail:
          'Credentialing confirms that a dentist meets each carrier\'s standards before the carrier lists them as a network provider. We gather the documents carriers typically request, such as state dental license, DEA and state controlled substance registrations where applicable, malpractice insurance, education and work history, and board certification for specialists. We check that names, addresses and identifiers match across every document, because a small mismatch is a common reason an application stalls. Applications are then completed for each carrier the practice wants to join, with copies kept in a credentialing file your practice can access at any time.',
      },
      {
        title: 'Insurance network enrollment',
        detail:
          'Enrollment links an approved provider to your practice location, tax ID and billing setup so claims process at network rates. We submit enrollment requests to the dental PPO and DHMO networks you choose, and to state Medicaid dental programs where your practice participates. Medicaid dental enrollment varies by state; some states enroll providers directly, while others work through a dental benefit administrator or managed care plans, each with separate paperwork. We follow up with carrier enrollment teams on a regular schedule, record reference numbers, and confirm the effective date before your team begins billing the new provider as in network.',
      },
      {
        title: 'Re-credentialing services',
        detail:
          'Approval is not permanent. Dental carriers re-credential providers on a recurring cycle, often every two to three years depending on the carrier, and many require updated licenses and malpractice certificates as they renew. Carriers that rely on CAQH ProView also expect providers to re-attest their profile regularly, commonly every 120 days. We track each provider\'s re-credentialing dates and document expirations, send requests to your team for anything new, and submit renewals ahead of carrier deadlines. Missing a re-credentialing request can lead to a provider being removed from a network, which is far harder to fix than to prevent.',
      },
      {
        title: 'Provider information updates',
        detail:
          'Carriers need to know when anything about the provider or practice changes. A new office address, a change of ownership, a new tax ID, an added location, a provider leaving the practice or a change in billing arrangement can each cause claims to deny or payments to go astray if carriers are not told. We submit change requests to each affected carrier, update CAQH and NPPES records when the practice asks us to, and confirm the change has been applied. We also check carrier directory listings for obvious errors, since patients use them to confirm a dentist is in network.',
      },
      {
        title: 'EFT/ERA enrollment assistance',
        detail:
          'Electronic funds transfer and electronic remittance advice let dental carriers pay directly into your bank account and send 835 remittance files that can be posted faster than paper EOBs. Each carrier has its own enrollment process, and some route it through a third-party enrollment service. We complete EFT and ERA enrollment for the carriers you work with, link ERAs to your clearinghouse so they reach your dental software, and confirm the first electronic payment matches its remittance. When a practice changes bank accounts or tax IDs, we update the enrollments so payments are not interrupted.',
      },
    ],
    workflow: [
      {
        title: 'Plan the carrier list',
        detail:
          'We review which networks your practice participates in or wants to join, which providers need applications and which state Medicaid dental program applies.',
      },
      {
        title: 'Collect and check documents',
        detail:
          'Licenses, registrations, malpractice certificates, NPI and tax ID details are gathered and checked for consistency across every source.',
      },
      {
        title: 'Update CAQH and NPPES',
        detail:
          'Where carriers use CAQH ProView, the profile is completed or updated and attested. NPI records are reviewed so names and addresses match applications.',
      },
      {
        title: 'Submit applications',
        detail:
          'Credentialing and enrollment applications are completed for each carrier and submitted through the carrier\'s required channel.',
      },
      {
        title: 'Follow up to approval',
        detail:
          'We contact carrier enrollment teams on a regular schedule, answer requests for more information and record reference numbers and effective dates.',
      },
      {
        title: 'Set up EFT and ERA',
        detail:
          'Once a provider is active, we complete electronic payment and remittance enrollment and confirm the first payments arrive correctly.',
      },
      {
        title: 'Maintain and renew',
        detail:
          'Re-credentialing dates, CAQH attestations and document expirations are tracked so renewals are submitted before carrier deadlines.',
      },
    ],
    benefits: [
      {
        title: 'New providers billed correctly',
        detail:
          'Complete, well-followed applications are designed to shorten the gap between a dentist starting and being billable in network.',
      },
      {
        title: 'Fewer enrollment denials',
        detail:
          'Keeping carrier records aligned with your NPI, tax ID and locations can help reduce claims denied for provider or enrollment errors.',
      },
      {
        title: 'Renewals that are not missed',
        detail:
          'Tracking re-credentialing dates and CAQH attestations aims to keep providers active in the networks your patients use.',
      },
      {
        title: 'Electronic payments from the start',
        detail:
          'EFT and ERA setup can help payments arrive faster and post more efficiently than paper checks and EOBs.',
      },
    ],
    practiceTypes: ['general-dentistry', 'orthodontics', 'endodontics', 'periodontics', 'oral-surgery', 'pediatric-dentistry', 'prosthodontics', 'dental-group-practices'],
    faqs: [
      {
        q: 'What is dentist credentialing?',
        a: 'Dentist credentialing is the process dental carriers use to review a dentist\'s license, training, malpractice coverage and history before accepting the dentist into their network. Once approved and enrolled at your location, the dentist can be billed at in-network rates. Credentialing is repeated on each carrier\'s schedule, and provider details must stay current between cycles.',
      },
      {
        q: 'What does a dentist credentialing service do?',
        a: 'A dentist credentialing service prepares, submits and tracks network applications for a practice\'s dentists so the office does not have to manage each carrier\'s paperwork. It gathers documents, keeps CAQH ProView profiles current where carriers use them, follows up with enrollment teams, records effective dates and sets up EFT and ERA. Carriers make the approval decisions and set their own processing times.',
      },
      {
        q: 'What documents are needed for dental credentialing?',
        a: 'Dental credentialing usually requires a current state dental license, NPI, tax ID details, malpractice insurance certificate, education and work history, and DEA or state controlled substance registrations where applicable. Specialists may add board certification. Each carrier sets its own list, and names and addresses should match across every document, because a mismatch is a common reason applications stall.',
      },
      {
        q: 'What is the difference between dental credentialing and enrollment?',
        a: 'Dental credentialing is the carrier\'s review of a dentist\'s qualifications, while enrollment links that approved dentist to your practice location, tax ID and payment setup. A provider can be credentialed and still have claims deny if enrollment at a specific office is missing. We handle both steps and confirm the effective date before in-network billing starts.',
      },
      {
        q: 'When should a new dentist start dental insurance credentialing?',
        a: 'A new dentist should start dental insurance credentialing as soon as the start date and practice location are confirmed. Carriers set their own processing times, and claims cannot be billed in network until each approval and effective date is in place. Gathering the license, malpractice certificate, NPI and tax ID details early gives every application the most lead time.',
      },
      {
        q: 'Do dental carriers use CAQH?',
        a: 'Some dental carriers use CAQH ProView to collect provider data, and others use their own applications. Where a carrier relies on CAQH, the profile must be complete, include current documents and be re-attested regularly, commonly every 120 days. We maintain CAQH profiles for carriers that use them and complete carrier-specific applications for those that do not.',
      },
      {
        q: 'What is the difference between a Type 1 and Type 2 NPI?',
        a: 'A Type 1 NPI identifies an individual dentist, while a Type 2 NPI identifies an organization such as a practice or group. Many dental claims list both, with the Type 2 as the billing provider and the Type 1 as the treating dentist. Both are issued through NPPES, and their names and addresses should match carrier records.',
      },
      {
        q: 'Can you enroll our dentists in Medicaid dental programs?',
        a: 'Yes, we can prepare and submit enrollment for state Medicaid dental programs where your practice participates. Each state runs its own program, and many use a dental benefit administrator or managed care plans with separate applications and revalidation schedules. We confirm which route applies in your state and track each application until the provider is active.',
      },
      {
        q: 'How often does dental re-credentialing happen?',
        a: 'Dental re-credentialing usually occurs on a recurring cycle set by each carrier, often every two to three years. Carriers may also ask for updated licenses, malpractice certificates or attestations between cycles. We track each provider\'s dates and document expirations so renewals are submitted before deadlines rather than after a carrier sends a termination notice.',
      },
      {
        q: 'Do you negotiate dental PPO fee schedules?',
        a: 'No, this service covers credentialing, enrollment, updates and EFT/ERA setup, not fee negotiation. We can provide your current fee schedules and payment data so your practice can review participation decisions, and our Dental RCM Reporting & Revenue Analysis service can show how each carrier pays. Decisions about joining or leaving a network remain with the practice.',
      },
    ],
    relatedTools: ['credentialing-checklist', 'npi-lookup', 'fee-schedule-comparison-calculator'],
    relatedServices: [
      'dental-insurance-verification',
      'dental-claims-processing',
      'denial-management',
      'payment-posting',
      'dental-accounts-receivable',
      'patient-billing',
      'rcm-analytics-reporting',
      'dental-billing',
      'revenue-cycle-management',
    ],
    seoTitle: 'Dental Credentialing Services for Dentists and DSOs',
    metaDescription:
      'Dental credentialing services for dentists: PPO and Medicaid dental enrollment, CAQH ProView upkeep, re-credentialing and EFT/ERA setup, tracked at every step.',
    keywords: [
      'dental credentialing',
      'dentist credentialing',
      'dentist credentialing service',
      'dental credentialing service',
      'dental credentialing services',
      'dental provider enrollment',
      'dentist insurance credentialing',
      'dental PPO enrollment',
      'Medicaid dental provider enrollment',
      'dental re-credentialing',
      'dental EFT ERA enrollment',
      'CAQH dental',
      'dental insurance credentialing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dental RCM Reporting & Revenue Analysis                          */
  /* ---------------------------------------------------------------- */
  {
    slug: 'rcm-analytics-reporting',
    name: 'Dental RCM Reporting & Revenue Analysis',
    shortName: 'RCM Reporting & Analysis',
    category: 'dental',
    icon: 'BarChart3',
    summary:
      'Monthly dental revenue cycle reports built from your own practice software. See aging, claim status, denial trends, collections and adjustments in plain language.',
    definition:
      'Dental RCM reporting is the regular measurement of how your practice turns production into collected revenue. It draws on your dental software, clearinghouse and carrier data to report insurance and patient aging, claim status, denial trends, collections and adjustments, then explains what changed and what to look at next.',
    intro: [
      'Dental practice software produces dozens of reports, yet many offices still struggle to answer simple questions. How much insurance money is past 90 days? Which carrier denies the most claims, and why? Are write-offs growing because of fee schedules or because claims are being adjusted off too early? The answers are in the data, but pulling and reading them every month takes time a busy office rarely has.',
      'Good reporting is consistent. The same measures, calculated the same way, from the same date ranges, so this month can be compared with last month and last year. It also separates what a dentist or office manager needs to see from the detail a billing team needs to act on.',
      'Our team builds a monthly reporting package from the data already in your dental software and clearinghouse. We report aging, claim status, denial trends, collections and adjustments, and we add a short written summary that explains the movement and points to likely causes. For groups and DSOs, reports can be split by location and provider.',
      'Reports describe your practice; they do not promise outcomes. Their purpose is to give you an accurate, shared view of the revenue cycle so decisions are based on numbers rather than impressions.',
    ],
    scope: [
      'Insurance and patient aging reports by carrier, provider and location',
      'Claim status reporting on submitted, pending, rejected and unpaid claims',
      'Denial trend analysis by carrier, reason and CDT code category',
      'Collection reporting compared with gross and net production',
      'Adjustment reporting by type, including PPO write-offs and downgrades',
      'Net collection rate and days in A/R calculated on consistent definitions',
      'Monthly revenue performance summaries with written commentary',
      'Location and provider comparisons for group practices and DSOs',
      'Review calls to walk through findings with your team',
    ],
    included: [
      {
        title: 'Accounts receivable aging reports',
        detail:
          'We report insurance and patient A/R separately, broken into 0 to 30, 31 to 60, 61 to 90 and over 90 day buckets, with totals by carrier, provider and location. Seeing aging by carrier often shows where follow-up should focus, and seeing it over several months shows whether the backlog is shrinking or growing. We also note large individual balances and claims approaching carrier filing limits. Because practice software can calculate aging differently depending on settings, we document the method used, such as aging by date of service or by claim date, so numbers stay comparable from one month to the next.',
      },
      {
        title: 'Claim status reporting',
        detail:
          'Claim status reporting shows where every submitted claim sits: accepted by the clearinghouse, rejected before reaching the carrier, pending at the carrier, paid, or denied. We combine data from your dental software with clearinghouse acceptance and rejection reports so nothing falls between systems. The report highlights claims that were never acknowledged, rejections still waiting to be fixed, and claims pending longer than usual for that carrier. For your office manager, this gives a quick check on whether claims are leaving the office cleanly; for the billing team, it is a work list of items that need attention.',
      },
      {
        title: 'Denial trend analysis',
        detail:
          'Individual denials are worked one at a time, but their causes often repeat. We group denials by carrier, reason, CDT code category and provider to show which patterns are costing the most. Common dental themes include missing radiographs or narratives, frequency limitations on cleanings and exams, waiting periods on major services, missing tooth clauses and eligibility issues. Each trend is paired with the point in the process where it can be prevented, such as verification, attachment rules or treatment planning. The analysis is designed to help your team fix causes at the front end instead of appealing the same denials month after month.',
      },
      {
        title: 'Collection and adjustment reporting',
        detail:
          'Collections only make sense next to production and adjustments. We report gross production, contractual adjustments, other adjustments and collections for the period, and calculate net collections against what was actually collectible. Adjustments are broken down by type, so PPO write-offs, downgrades, small balance write-offs and uncollectible patient balances are visible separately. A rise in one type can signal a fee schedule change, a posting habit or a policy that needs review. Where your practice participates in several PPO networks, we can show how collections per procedure compare across carriers to support participation discussions.',
      },
      {
        title: 'Monthly revenue performance reports',
        detail:
          'Each month we combine the key measures into one concise package: production, collections, net collection rate, days in A/R, aging, claim status, denial trends and adjustments, compared with prior months. A written summary explains what changed and why it likely changed, in plain language a dentist can read in a few minutes. For groups and DSOs, the report can compare locations and providers on the same definitions. We review the package with your team on a call if you would like, and agree on two or three items to watch or address before the next report.',
      },
    ],
    workflow: [
      {
        title: 'Agree on measures',
        detail:
          'We confirm which reports matter to your practice and document definitions, date ranges and aging methods so numbers are consistent every month.',
      },
      {
        title: 'Pull the data',
        detail:
          'Reports are run from your dental software, clearinghouse and, where needed, carrier portals using read access arranged under a signed Business Associate Agreement.',
      },
      {
        title: 'Validate before reporting',
        detail:
          'We check totals against deposits and prior reports and look for posting gaps that would distort the numbers before anything is shared.',
      },
      {
        title: 'Analyze trends',
        detail:
          'Month-over-month and year-over-year changes are reviewed by carrier, provider and location to identify patterns and likely causes.',
      },
      {
        title: 'Write the summary',
        detail:
          'A short written commentary explains the results in plain language and lists the items worth attention.',
      },
      {
        title: 'Review with your team',
        detail:
          'We walk through the report on a call if you would like and agree on next steps for the coming month.',
      },
    ],
    benefits: [
      {
        title: 'One consistent view',
        detail:
          'Fixed definitions and a regular schedule are designed to give doctors, managers and billing staff the same numbers to work from.',
      },
      {
        title: 'Earlier warning signs',
        detail:
          'Monthly trend reviews can help spot rising denials, growing aging or unusual adjustments before they become large problems.',
      },
      {
        title: 'Focus on root causes',
        detail:
          'Linking denial and adjustment patterns to the step where they start aims to support practical fixes rather than repeated rework.',
      },
      {
        title: 'Better-informed decisions',
        detail:
          'Carrier and location comparisons can help support decisions about network participation, staffing and fee schedule reviews.',
      },
    ],
    practiceTypes: ['dental-group-practices', 'general-dentistry', 'orthodontics', 'endodontics', 'periodontics', 'oral-surgery', 'pediatric-dentistry', 'prosthodontics'],
    faqs: [
      {
        q: 'What does dental RCM reporting include?',
        a: 'Dental RCM reporting includes insurance and patient aging, claim status, denial trends, collections and adjustments, and a monthly summary of revenue performance. We build each report from your own dental software and clearinghouse data, use consistent definitions so months can be compared, and add a short written explanation of what changed and what may need attention.',
      },
      {
        q: 'Do we need new software for these reports?',
        a: 'No, reports are built from the data already in your dental practice software and clearinghouse, such as Dentrix, Open Dental, Eaglesoft or Curve Dental. We run standard and custom reports, combine them where needed and present the results in a readable package. You do not need to buy or install a separate analytics product.',
      },
      {
        q: 'Which measures matter most for a dental practice?',
        a: 'For most dental practices, the most useful measures are net collection rate, days in A/R, insurance aging over 90 days, denial rate by carrier and adjustments as a share of production. Together they show whether production is turning into collected revenue. We agree on the list with you and calculate each measure the same way every month.',
      },
      {
        q: 'Can reports be split by location or provider?',
        a: 'Yes, reports can be split by location, provider and carrier for group practices and DSOs, as long as your software records those fields consistently. Comparing locations on the same definitions can show where processes differ, such as one office sending claims without attachments. We note any data gaps that limit a comparison so results are read fairly.',
      },
      {
        q: 'Can reporting be used without your other services?',
        a: 'Yes, Dental RCM Reporting & Revenue Analysis can be provided on its own. Many practices start with reporting to understand where their revenue cycle stands before deciding what to change. If the reports point to issues such as aged claims or repeated denials, our other services can address them, but there is no requirement to use them.',
      },
    ],
    relatedTools: ['dental-practice-revenue-calculator', 'days-in-ar-calculator', 'dental-denial-rate-calculator', 'net-collection-rate-calculator'],
    relatedServices: [
      'dental-insurance-verification',
      'dental-claims-processing',
      'denial-management',
      'payment-posting',
      'dental-accounts-receivable',
      'patient-billing',
      'dental-credentialing',
      'dental-billing',
      'revenue-cycle-management',
    ],
    seoTitle: 'Dental RCM Reporting & Revenue Analysis',
    metaDescription:
      'Dental RCM reporting and revenue analysis: A/R aging, claim status, denial trends, collections and adjustments, with a monthly plain-language summary.',
    keywords: [
      'dental RCM reporting',
      'dental revenue analysis',
      'dental practice financial reports',
      'dental A/R aging report',
      'dental denial trend analysis',
      'dental collection reports',
      'dental revenue cycle analytics',
    ],
  },
];
