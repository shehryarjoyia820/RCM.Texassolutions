import type { Specialty } from '../types';

/**
 * Dental specialty pages. CDT code numbers appear only in passing; CDT
 * descriptors are licensed by the ADA and are never reproduced here.
 */
export const dentalSpecialties: Specialty[] = [
  /* ---------------------------------------------------------------- */
  /*  General dentistry                                                */
  /* ---------------------------------------------------------------- */
  {
    slug: 'general-dentistry',
    name: 'General Dentistry',
    kind: 'dental',
    icon: 'Smile',
    summary:
      'Billing support for general dental offices: benefit breakdowns, frequency checks, clean ADA claims and steady follow-up on insurance balances.',
    definition:
      "General dentistry billing covers verifying each patient's dental benefits, presenting accurate estimates, submitting ADA claims or 837D files for preventive, diagnostic and restorative care, and working the plan rules that shape payment: annual maximums, frequency limits, waiting periods, alternate benefits and coordination of benefits between primary and secondary dental plans.",
    intro: [
      "A general dental office files a high volume of small claims. Cleanings, exams, bitewings, fillings and the occasional crown all move through the same front desk, and most of them are governed by plan rules rather than documented clinical need. Whether a claim pays in full often depends on facts gathered before the patient sits down: how much of the annual maximum is left, when the last prophylaxis or bitewing series was paid, and whether the patient is still inside a waiting period for basic or major services.",
      "When those facts are missed, the result is rarely a dramatic denial. It is a steady drip of small balances: a cleaning that exceeded the plan's frequency, a posterior composite paid at the amalgam rate, a crown that was estimated at 50 percent but paid nothing because the patient's maximum was already used. Each one becomes a patient balance the office has to explain.",
      "Our team works inside your practice management software and clearinghouse to verify benefits with full history, build estimates your front desk can stand behind, send complete claims with the right attachments and follow up on every open insurance balance until it is paid, appealed or correctly moved to the patient.",
    ],
    challenges: [
      {
        title: 'Frequency limitations on preventive and diagnostic care',
        detail:
          'Plans commonly limit prophylaxis and exams to twice per benefit year, bitewings to once per year and full mouth or panoramic images to once every several years. Some count by calendar year and others by rolling months since the last date of service, so a visit booked a week early can be denied even when the patient "has two cleanings left."',
      },
      {
        title: 'Alternate benefits and downgrades',
        detail:
          'Many PPO plans pay posterior composite fillings at the amalgam allowance, and some downgrade porcelain crowns on molars to a metal crown benefit. The claim pays as processed, but the difference lands on the patient. If the estimate did not anticipate the downgrade, the office absorbs either the write-off or the patient complaint.',
      },
      {
        title: 'Annual maximums and waiting periods',
        detail:
          'Annual maximums on many dental plans are modest and reset on either the calendar year or the plan year. New enrollees may face waiting periods for basic and major services. Treatment plans that ignore remaining maximum or waiting period dates produce estimates that are wrong before the claim is ever sent.',
      },
      {
        title: 'PPO, DHMO and fee-for-service in one schedule',
        detail:
          'A single general office may bill PPO plans at contracted fees, see DHMO members for fixed copayments under a capitation agreement and charge uninsured patients the office fee. Each model needs its own fee schedule loaded correctly, and DHMO eligibility depends on the patient being assigned to your office on the plan roster.',
      },
      {
        title: 'Coordination of benefits between two dental plans',
        detail:
          'Patients covered by two dental plans need the correct primary identified (often by the birthday rule for dependents) and the secondary claim sent with the primary EOB. Some secondary plans use non-duplication or carve-out rules, so the secondary payment may be smaller than the patient expects.',
      },
    ],
    payerWorkflow: [
      'Benefits are verified before the visit, including remaining maximum, deductible status, coinsurance by category, frequency history and any waiting periods or missing tooth clause.',
      'Claims are submitted on the current ADA Dental Claim Form or electronically as an X12 837D through your clearinghouse, with tooth numbers, surfaces and quadrants matching the clinical note.',
      'Restorative and major services that commonly trigger review are sent with radiographs, intraoral photos or a short narrative, and larger treatment plans can be submitted first as a pre-treatment estimate.',
      'Payments and EOBs are posted line by line so downgrades, frequency denials and patient portions are visible, and secondary claims are released with the primary EOB attached.',
      'Open insurance balances are worked by age, with denials corrected, appealed or transferred to the patient only after the plan rule behind them is confirmed.',
    ],
    services: [
      'dental-billing',
      'insurance-eligibility-verification',
      'benefits-verification',
      'claims-submission',
      'payment-posting',
      'denial-management',
      'aging-ar-follow-up',
      'patient-billing',
    ],
    faqs: [
      {
        q: 'Why was a routine cleaning denied when the patient still had visits left?',
        a: 'Most often the plan counts frequency by time since the last paid service rather than by visits remaining in the year. A plan that allows one prophylaxis every six months can deny a cleaning performed five months and three weeks after the last one. Verifying the exact last date of service, not just the count, before scheduling recall visits is designed to prevent this kind of denial.',
      },
      {
        q: 'What is an alternate benefit on a dental claim?',
        a: 'An alternate benefit is a plan provision that pays a less costly treatment option than the one performed, such as paying a posterior composite filling at the amalgam allowance. The procedure is still covered, but the plan limits its payment. The patient is usually responsible for the difference, subject to your network contract, so the estimate should show the downgrade before treatment starts.',
      },
      {
        q: 'Should every crown be sent as a pre-treatment estimate first?',
        a: 'Not always, but a pre-treatment estimate is useful when the patient is near the annual maximum, the tooth may fall under a missing tooth or replacement clause, or the plan has a history of downgrading. An estimate is not a promise of payment, and they add time, so many offices reserve them for higher cost treatment or plans known to review crowns closely.',
      },
      {
        q: 'How does coordination of benefits work with two dental plans?',
        a: 'The primary plan processes the claim first, then the secondary claim is sent with the primary EOB attached. For dependents, the birthday rule often decides which parent plan is primary. Secondary plans may use standard, non-duplication or carve-out coordination, so the secondary payment depends on that plan language and may not cover the full remaining balance.',
      },
      {
        q: 'Can you bill DHMO patients as well as PPO patients?',
        a: 'Yes, we can work both. DHMO claims or encounter forms are handled differently from PPO claims: the office usually receives a monthly capitation payment for assigned members and collects fixed copayments at the visit. The work focuses on confirming the patient is assigned to your office, applying the right copay schedule and reconciling capitation statements against the plan roster.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-insurance-collection-calculator',
      'dental-denial-rate-calculator',
      'dental-ar-aging-calculator',
    ],
    seoTitle: 'General Dentistry Billing Services | Texas Solutions RCM',
    metaDescription:
      'General dentistry billing support for benefit checks, frequency limits, alternate benefits, ADA claims, COB and insurance AR follow-up for dental offices.',
    keywords: [
      'general dentistry billing',
      'dental billing services',
      'dental insurance verification',
      'dental frequency limitations',
      'alternate benefit dental',
      'dental claim submission',
      'ADA claim form',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Orthodontics                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'orthodontics',
    name: 'Orthodontics',
    kind: 'dental',
    icon: 'SmilePlus',
    summary:
      'Orthodontic billing support for lifetime maximums, initial and periodic insurance billing, contract tracking and transfers mid-treatment.',
    definition:
      "Orthodontic billing involves verifying the patient's orthodontic lifetime maximum and age limits, billing the plan for the initial banding or appliance placement, then sending periodic claims or relying on automatic payments across the treatment term. It also covers patient payment contracts, coordination of benefits, Medicaid clinical necessity rules and balances when patients transfer or stop treatment.",
    intro: [
      "Orthodontic billing does not look like the rest of dentistry. Most commercial dental plans that cover orthodontics pay against a lifetime maximum rather than an annual one, and they rarely pay it in one lump sum. A common pattern is an initial payment when appliances are placed followed by monthly or quarterly installments for the length of treatment, and each plan has its own rule on whether those installments arrive automatically or need a claim each time.",
      "That structure turns every case into a multi-year receivable. The office has to track how much of the lifetime maximum has been paid, whether the patient is still eligible each period, whether the patient aged out of dependent coverage, and how the patient's own payment contract absorbs whatever insurance does not pay. A change of employer, a second plan or a mid-treatment transfer can rewrite the math halfway through.",
      "We work inside your orthodontic practice management software to verify orthodontic benefits at the consult, set up insurance billing schedules that match each plan, post periodic payments against the right contract and follow up when an expected installment does not arrive.",
    ],
    challenges: [
      {
        title: 'Lifetime maximums and age limits',
        detail:
          'Orthodontic coverage is usually limited to a separate lifetime maximum, and many plans cover only dependents under a stated age. Some require that treatment begin before that age, others that banding occur while the patient is covered. Getting these details wrong at the consult means the treatment contract is built on insurance money that will never arrive.',
      },
      {
        title: 'Initial and periodic payment schedules',
        detail:
          'Plans differ on how they pay: an initial amount at banding and the remainder spread monthly or quarterly, payments released automatically after the first claim, or a new claim required for each period. Missing a periodic claim can quietly stop payments while the case continues.',
      },
      {
        title: 'Eligibility that changes during treatment',
        detail:
          'Treatment often runs for well over a year. Patients change jobs, lose dependent status or pick up a second plan. Because periodic payments generally stop when coverage ends, eligibility needs to be rechecked through the life of the case, not just at the start.',
      },
      {
        title: 'Coordination of benefits and lifetime maximum tracking',
        detail:
          'When two plans cover orthodontics, each has its own lifetime maximum and its own payment schedule. Tracking what each plan has paid toward its maximum, and what remains on the patient contract, prevents double counting and surprises at the end of treatment.',
      },
      {
        title: 'Transfers, early debanding and Medicaid criteria',
        detail:
          'Patients who transfer in or out mid-treatment need prior payment history to calculate what the new plan or office can still collect. Medicaid and CHIP orthodontic coverage, where available, is typically limited to cases that meet state clinical necessity scoring and requires prior authorization with records.',
      },
    ],
    payerWorkflow: [
      'At the consult, benefits are verified for orthodontic coverage, lifetime maximum remaining, age limits, payment method (lump sum, initial plus periodic, or automatic) and any prior orthodontic history.',
      'The initial claim is sent at appliance placement on the ADA claim form or 837D with the banding date, total case fee and treatment length, plus records if the plan requests them.',
      'Periodic claims are scheduled to match each plan, or automatic payments are monitored against the expected schedule so a missing installment is caught quickly.',
      'Insurance payments and patient contract payments are posted to the same case so the remaining insurance and patient balances stay accurate.',
      'Eligibility is rechecked during treatment, and the case is updated when coverage ends, a second plan is added or the patient transfers.',
    ],
    services: [
      'dental-billing',
      'benefits-verification',
      'claims-submission',
      'payment-posting',
      'aging-ar-follow-up',
      'patient-billing',
      'patient-financial-communication',
      'prior-authorization',
    ],
    faqs: [
      {
        q: 'How do dental plans usually pay for orthodontic treatment?',
        a: 'Most plans pay orthodontic benefits in installments up to a lifetime maximum rather than all at once. A typical arrangement pays an initial portion when appliances are placed, then spreads the rest monthly or quarterly over the treatment term. Some plans pay automatically after the first claim, while others need a claim or status update each period, so the billing schedule should match each plan.',
      },
      {
        q: 'What happens to insurance payments if the patient loses coverage mid-treatment?',
        a: 'Periodic payments generally stop when the patient is no longer covered, even if treatment continues. Whatever the plan has not yet paid usually shifts to the patient or to a new plan if one picks up orthodontic coverage. Rechecking eligibility during treatment helps the office catch the change early and update the patient contract before balances build up.',
      },
      {
        q: 'Does an orthodontic lifetime maximum reset with a new plan?',
        a: 'A new plan usually has its own lifetime maximum, but it may reduce what it pays based on treatment already in progress or on benefits used under a prior plan with the same carrier. Some plans do not cover treatment that began before the patient enrolled. Verifying these rules before billing the new plan avoids building a contract on money that will not be paid.',
      },
      {
        q: 'Does Medicaid cover braces?',
        a: 'Medicaid and CHIP programs may cover orthodontic treatment for children and teens, but usually only for severe cases that meet state clinical necessity criteria. Most programs require prior authorization supported by records such as models or scans, photos and radiographs, often scored against a state index. Cosmetic or mild cases are typically not covered, and rules vary by state and managed care dental plan.',
      },
      {
        q: 'How should a transfer patient be billed?',
        a: 'A transfer case starts by finding out what the prior office already billed and what the plan already paid toward the lifetime maximum. The new office then bills the remaining treatment according to the plan rules for transfers, which can differ from a new start. Collecting the prior ledger and treatment records before quoting fees keeps the new contract realistic.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-insurance-collection-calculator',
      'dental-ar-aging-calculator',
      'dental-practice-revenue-calculator',
    ],
    seoTitle: 'Orthodontic Billing Services | Texas Solutions RCM',
    metaDescription:
      'Orthodontic billing services for lifetime maximums, initial and periodic insurance claims, payment contracts, COB, transfers and eligibility rechecks.',
    keywords: [
      'orthodontic billing',
      'orthodontic billing services',
      'orthodontic insurance billing',
      'orthodontic lifetime maximum',
      'ortho periodic payments',
      'braces insurance claims',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Endodontics                                                      */
  /* ---------------------------------------------------------------- */
  {
    slug: 'endodontics',
    name: 'Endodontics',
    kind: 'dental',
    icon: 'Crosshair',
    summary:
      'Endodontic billing support for same-day benefit checks, radiograph attachments, retreatment and surgical claims and referral coordination.',
    definition:
      'Endodontic billing involves verifying benefits quickly for referred and emergency patients, submitting root canal, retreatment and apical surgery claims with pre-operative and post-operative radiographs, handling plan rules on frequency and replacement, and coordinating with the referring dentist so the final restoration and the endodontic treatment are billed and estimated together.',
    intro: [
      "Endodontic practices see many patients for the first time on the day they are in pain. That compresses the front-end work: the office often has minutes, not days, to confirm coverage, check remaining maximum, and tell the patient what root canal treatment is likely to cost. A pre-treatment estimate is usually not practical when the tooth needs care today.",
      "On the back end, endodontic claims tend to draw radiograph requests. Plans may want pre-operative and post-operative periapical images, the date of any prior root canal on the same tooth and confirmation that the tooth is restorable. Retreatment, apicoectomy and other surgical procedures face more review than initial therapy, and some plans limit how soon a tooth can be retreated.",
      "Our team works in your practice management and imaging workflow to verify benefits fast, attach the right images and notes to each claim, follow up on endodontic claims that stall in review and keep the referring office informed about the patient's remaining benefits for the crown that usually follows.",
    ],
    challenges: [
      {
        title: 'Same-day verification for emergency and referred patients',
        detail:
          'Endodontic patients are frequently seen the day they call. Verification has to confirm eligibility, specialist coverage, remaining annual maximum and endodontic coinsurance quickly enough to give the patient an honest estimate before treatment.',
      },
      {
        title: 'Radiograph and narrative requirements',
        detail:
          'Many plans review root canal and retreatment claims against radiographs. Missing or unreadable pre-operative and post-operative images, or a narrative that does not explain why retreatment or surgery was needed, are common reasons for delayed payment or requests for more information.',
      },
      {
        title: 'Retreatment, surgery and replacement limits',
        detail:
          'Plans may restrict retreatment of a tooth within a set period after the original root canal, especially if the same office performed it, and may apply separate rules to apical surgery. Knowing the history of the tooth before treatment helps set expectations and choose the right documentation.',
      },
      {
        title: 'Palliative and same-day procedure conflicts',
        detail:
          'Palliative treatment, diagnostic images and limited evaluations performed on the same day as definitive treatment can be bundled or denied under some plan rules. Billing combinations that the plan does not allow together leads to small, repeated denials.',
      },
      {
        title: 'Shared annual maximum with the referring dentist',
        detail:
          'Endodontic treatment and the crown that follows usually draw on the same annual maximum. If the endodontic claim uses most of the remaining benefit, the general dentist may find little left for the restoration. Clear communication between offices helps the patient plan the full course of care.',
      },
    ],
    payerWorkflow: [
      'Eligibility and benefits are verified at scheduling or on arrival, including endodontic coinsurance, remaining maximum, waiting periods and prior endodontic history on the tooth.',
      'Claims go out on the ADA claim form or 837D with the tooth number, date of completion and pre-operative and post-operative radiographs attached through the clearinghouse attachment workflow.',
      'Retreatment and surgical claims include a narrative describing the clinical findings and why the procedure was needed.',
      "Requests for additional information are answered promptly with the specific images or notes the plan asked for, and denials are reviewed against the plan's frequency and bundling rules before appeal.",
      "Remaining benefit information is shared with the referring office, with the patient's authorization where required, so the final restoration can be estimated accurately.",
    ],
    services: [
      'dental-billing',
      'insurance-eligibility-verification',
      'benefits-verification',
      'claims-submission',
      'denial-management',
      'denial-appeals',
      'aging-ar-follow-up',
    ],
    faqs: [
      {
        q: 'What attachments do insurers usually want with a root canal claim?',
        a: "Many dental plans want a pre-operative periapical radiograph showing the pathology and a post-operative image showing completed treatment. Retreatment and apical surgery claims often need a narrative explaining the clinical findings and the reason for the procedure. Requirements vary by plan, so checking each payer's attachment policy and sending images through the clearinghouse with the claim helps avoid information requests.",
      },
      {
        q: 'Can we bill an emergency palliative visit and a root canal on the same day?',
        a: 'It depends on the plan. Many plans do not pay palliative treatment when definitive treatment is performed on the same tooth on the same day, and some bundle limited evaluations or images into the main procedure. Checking the plan rules and billing only the combinations it allows keeps small denials from piling up on emergency visits.',
      },
      {
        q: 'Why was a root canal retreatment denied?',
        a: 'Retreatment denials often come from plan limits on retreating a tooth within a set period after the first root canal, missing radiographs or a narrative that does not explain why retreatment was necessary. Some plans also treat retreatment by the same office differently. Reviewing the tooth history and the specific denial reason before appealing helps decide whether a corrected claim or an appeal is appropriate.',
      },
      {
        q: 'Is endodontic treatment covered as basic or major?',
        a: 'It varies by plan. Some dental plans classify endodontic therapy as a basic service with a higher coinsurance, while others place it in the major category with lower coverage or a waiting period. Verifying the specific category and coinsurance before treatment, rather than assuming, gives the patient a more accurate estimate.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-denial-rate-calculator',
      'dental-ar-aging-calculator',
      'denial-appeal-checklist',
    ],
    seoTitle: 'Endodontic Billing Services | Texas Solutions RCM',
    metaDescription:
      'Endodontic billing support for same-day benefit checks, radiograph attachments, retreatment and apicoectomy claims, denials and referral coordination.',
    keywords: [
      'endodontic billing',
      'root canal insurance claims',
      'endodontic billing services',
      'root canal retreatment denial',
      'dental radiograph attachments',
      'endodontist billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Periodontics                                                     */
  /* ---------------------------------------------------------------- */
  {
    slug: 'periodontics',
    name: 'Periodontics',
    kind: 'dental',
    icon: 'Shield',
    summary:
      'Periodontal billing support for scaling and root planing documentation, perio charting attachments, maintenance frequency and surgical claims.',
    definition:
      'Periodontal billing involves documenting disease with complete perio charting and radiographs, submitting scaling and root planing by quadrant, billing periodontal maintenance against plan frequency rules, and supporting osseous surgery, grafting and implant-related claims with narratives. It also means explaining to patients how maintenance visits interact with their cleaning benefits and annual maximum.',
    intro: [
      "Periodontal claims live or die on documentation. Plans that cover scaling and root planing generally expect a recent full periodontal charting with pocket depths, radiographs showing bone loss and a diagnosis that matches the quadrants billed. When the chart is old, incomplete or not attached, a quadrant of root planing can be denied or downgraded even though the treatment was clearly needed.",
      "After active therapy, billing shifts to periodontal maintenance. Plans handle maintenance in different ways: some count it toward the same frequency as routine cleanings, some allow it in addition to prophylaxis, and some limit how soon it can follow root planing. Surgical periodontics adds osseous surgery, grafts and regenerative procedures that frequently require narratives, images and pre-treatment estimates.",
      "We work inside your practice management software to verify periodontal benefits and history, make sure charting and images travel with each claim, track quadrant and maintenance frequencies and follow up on surgical claims until they are resolved.",
    ],
    challenges: [
      {
        title: 'Scaling and root planing documentation',
        detail:
          'Plans commonly review SRP claims against periodontal charting that shows pocket depths by tooth, recent radiographs showing bone loss and a periodontal diagnosis. Thresholds and the number of qualifying teeth per quadrant vary by plan, and missing charting is one of the most frequent reasons SRP is delayed or denied.',
      },
      {
        title: 'Quadrant frequency limits',
        detail:
          'Many plans allow SRP on the same quadrant only once in a multi-year period. Treating the same quadrant again sooner, or billing four quadrants when charting supports only two, invites denial. Tracking quadrant history by date protects both the claim and the patient estimate.',
      },
      {
        title: 'Periodontal maintenance versus prophylaxis',
        detail:
          'Plans may share frequency between periodontal maintenance and routine cleanings, alternate the benefit to a prophylaxis allowance or limit maintenance until a set time after active therapy. Patients on three-month recall often exhaust cleaning benefits before year end without knowing it.',
      },
      {
        title: 'Full mouth debridement and same-day conflicts',
        detail:
          'Full mouth debridement is typically limited to cases where a comprehensive evaluation cannot be done, and many plans deny it on the same day as an evaluation or close to other periodontal services. Billing it routinely as a first visit creates avoidable denials.',
      },
      {
        title: 'Surgical and regenerative procedures',
        detail:
          'Osseous surgery, soft tissue grafts, bone grafts and guided tissue regeneration often require narratives, charting, photos and radiographs, and coverage varies widely. Some grafting associated with implants is excluded by dental plans entirely. Pre-treatment estimates are frequently worth the wait.',
      },
    ],
    payerWorkflow: [
      'Benefits are verified for periodontal coverage category, SRP quadrant history, maintenance frequency and whether maintenance shares limits with prophylaxis.',
      'SRP claims are billed by quadrant on the ADA claim form or 837D with current perio charting and radiographs attached, and a short narrative where the plan expects one.',
      "Periodontal maintenance is scheduled and billed against each plan's frequency rules so recall visits do not exceed what the plan will pay.",
      'Surgical and regenerative treatment is sent as a pre-treatment estimate when coverage is uncertain, followed by a claim with the narrative, images and charting the plan requests.',
      "Downgrades and denials are reviewed against the plan's documentation and frequency rules before a corrected claim or appeal is filed.",
    ],
    services: [
      'dental-billing',
      'benefits-verification',
      'claims-submission',
      'claims-scrubbing',
      'denial-management',
      'denial-appeals',
      'patient-financial-communication',
    ],
    faqs: [
      {
        q: 'What documentation is usually needed for scaling and root planing?',
        a: 'Most plans want a current full mouth periodontal chart showing pocket depths, recent radiographs showing bone loss and a periodontal diagnosis that supports each quadrant billed. Some also expect a narrative. The specific pocket depth thresholds and number of qualifying teeth per quadrant vary by plan, so checking the payer policy and attaching complete charting with the claim helps avoid review delays.',
      },
      {
        q: "Does periodontal maintenance count against the patient's cleanings?",
        a: 'Often it does, but the rule varies. Some plans share one frequency limit between periodontal maintenance and prophylaxis, some pay maintenance at the prophylaxis allowance and others allow both separately. Patients on a three-month recall can run out of covered visits before year end, so verifying the rule and telling the patient early avoids surprise balances.',
      },
      {
        q: 'Why was scaling and root planing paid as a cleaning instead?',
        a: 'That is usually an alternate benefit or downgrade applied because the plan felt the charting or radiographs did not meet its criteria for root planing. It can also happen when fewer teeth in a quadrant qualify than the plan requires. Reviewing the EOB reason, the charting sent and the plan criteria shows whether a resubmission with better documentation is worth filing.',
      },
      {
        q: 'Are periodontal surgery and grafts covered by dental insurance?',
        a: 'Many dental plans cover some periodontal surgery as a major service, subject to frequency limits, waiting periods and the annual maximum. Coverage for grafting and regenerative procedures varies more, and grafts tied to implant placement are excluded by some plans. A pre-treatment estimate with charting, images and a narrative is often the clearest way to learn what the plan will pay.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-denial-rate-calculator',
      'dental-insurance-collection-calculator',
      'dental-ar-aging-calculator',
    ],
    seoTitle: 'Periodontal Billing Services | Texas Solutions RCM',
    metaDescription:
      'Periodontal billing services for SRP documentation, perio charting attachments, maintenance frequency rules, surgical claims and denial follow-up.',
    keywords: [
      'periodontal billing',
      'periodontal billing services',
      'periodontist billing services',
      'scaling and root planing billing',
      'perio maintenance billing',
      'periodontal surgery insurance',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Oral and maxillofacial surgery                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'oral-surgery',
    name: 'Oral and Maxillofacial Surgery',
    kind: 'dental',
    icon: 'Scissors',
    summary:
      'Oral surgery billing on dental plans: extractions, bone grafts, implants, sedation time, predeterminations, trauma claims and patient estimates.',
    definition:
      'Oral surgery billing, for oral and maxillofacial surgery practices, involves verifying dental benefits for surgical services, coding extractions, bone grafts, implants and biopsies with current CDT codes, billing sedation and general anesthesia by documented time, requesting predeterminations, supporting claims with radiographs and narratives, and handling coordination of benefits between dental plans.',
    intro: [
      "Oral surgery claims carry more documentation weight than most dental claims. Surgical extractions, impacted third molars, bone grafts, ridge preservation, implant placement and biopsies are often classified as major or surgical services, with their own coinsurance, waiting periods and frequency rules. Many dental carriers review these claims against radiographs and a narrative before paying, and a missing image or a vague note is one of the most common reasons a surgical claim stalls.",
      "Sedation adds another layer. Deep sedation and general anesthesia are billed in time increments on the dental claim, and plans differ on which procedures qualify, how many increments they will pay and what record they want to see. Implant cases bring their own rules, including missing tooth clauses, alternate benefits and exclusions for related grafting, so a pre-treatment estimate is often the only way to give the patient an accurate number before surgery.",
      "Our team works inside your practice management software to verify surgical benefits before the appointment, request predeterminations where they help, code and document each claim to match the operative note, bill sedation time accurately and follow up with each dental carrier until the account is resolved.",
    ],
    challenges: [
      {
        title: 'Extractions and impacted teeth',
        detail:
          'Simple, surgical and impacted extractions are coded differently, and carriers look at the radiograph and the operative note to confirm which one was performed. A claim for a surgical or impacted extraction without an image and a short narrative is a common candidate for a downgrade or a request for more information.',
      },
      {
        title: 'Bone grafts and ridge preservation',
        detail:
          'Grafting done at the time of an extraction or before an implant is covered by some dental plans and excluded by others. Some plans treat a graft as part of the implant case and apply the same limits. Verifying grafting coverage separately, and documenting why the graft was needed, keeps the estimate and the claim aligned.',
      },
      {
        title: 'Anesthesia and sedation billing',
        detail:
          'Deep sedation and general anesthesia are commonly billed in time increments on dental claims, and plans may limit coverage to certain procedures or require documentation of clinical need. Start and end times, the anesthesia record and the provider permit all need to line up with what is billed.',
      },
      {
        title: 'Predeterminations for surgical and implant cases',
        detail:
          'Dental plans may require or recommend predeterminations for implants, bone grafts, sinus procedures and surgical extractions. A predetermination is not a guarantee of payment, but it shows how the plan reads the case and gives the patient a realistic estimate. Requesting it early leaves time for the carrier to ask for more records.',
      },
      {
        title: 'Trauma and accident-related dental care',
        detail:
          'Dental injuries from an accident may involve an accident benefit in the dental plan or another liability policy. Accident details, dates and coordination questions need to be documented up front so the dental claim goes to the right carrier in the right order with the information it asks for.',
      },
      {
        title: 'Implants, grafts and the missing tooth clause',
        detail:
          'Implant coverage varies widely, and many plans apply a missing tooth clause or an alternate benefit to a bridge or partial denture. Bone grafts and sinus procedures tied to implants may be excluded. Pre-treatment estimates help patients understand what is likely to be their responsibility.',
      },
    ],
    payerWorkflow: [
      'Before surgery, dental benefits are verified for surgical coinsurance, waiting periods, frequency limits, implant and grafting coverage and sedation rules, and predeterminations are requested where the plan requires them or the case is large.',
      'Surgical services are billed on the ADA claim form or 837D with current CDT codes, tooth numbers, radiographs and a narrative drawn from the operative note.',
      'Anesthesia is billed by documented time and supported by the anesthesia record, with plan limits checked in advance.',
      'When a patient has two dental plans, the secondary claim is sent with the primary EOB so coordination of benefits is applied correctly.',
      'Denials and downgrades are worked by reason: missing documentation, frequency or waiting period issues, exclusions and alternate benefits, with appeals that include the clinical rationale.',
    ],
    services: [
      'dental-billing',
      'claims-submission',
      'prior-authorization',
      'benefits-verification',
      'denial-appeals',
      'provider-enrollment',
      'aging-ar-follow-up',
    ],
    faqs: [
      {
        q: 'What documentation do dental plans want for surgical extractions?',
        a: 'Most carriers want a current radiograph that shows the tooth and a short narrative explaining why a surgical approach was needed, such as bone removal or sectioning the tooth. The operative note should support the code billed. Sending these with the first claim avoids a request for more information and the delay that comes with it.',
      },
      {
        q: 'Do dental plans cover bone grafts?',
        a: 'Some do and many limit it. A plan may cover a graft placed at the time of an extraction, exclude grafts tied to implants or apply the same waiting period and maximum as the implant itself. Checking grafting coverage as its own line during verification, and sending a predetermination for larger cases, gives the patient a clearer estimate.',
      },
      {
        q: 'How is IV sedation billed for oral surgery?',
        a: "On dental claims, deep sedation and general anesthesia are usually billed in time increments based on documented start and end times. Plans often limit sedation coverage to certain surgical procedures or require a reason the patient needed it. The anesthesia record, the procedures performed and the provider's sedation permit should all support the time billed.",
      },
      {
        q: 'Should oral surgery offices send predeterminations?',
        a: 'For implants, grafts, sinus procedures and multi-tooth surgical cases, a predetermination is often worth the wait. It shows how the dental plan applies its limits, alternate benefits and exclusions to the specific case. It does not guarantee payment, and benefits are still checked again on the date of service.',
      },
      {
        q: 'Do dental plans cover dental implants?',
        a: 'Some do and many limit it. Plans that cover implants may apply a missing tooth clause, an alternate benefit to a bridge or partial denture, frequency limits or a waiting period, and may exclude related grafting. A pre-treatment estimate with radiographs and a narrative is the clearest way to learn what a specific plan will pay before the patient commits.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'prior-authorization-checklist',
      'dental-patient-estimate-calculator',
      'dental-denial-rate-calculator',
    ],
    seoTitle: 'Oral Surgery Billing Services | Texas Solutions RCM',
    metaDescription:
      'Oral surgery billing services for extractions, bone grafts, implants, sedation time, predeterminations and dental claim follow-up with carriers.',
    keywords: [
      'oral surgery billing',
      'oral surgery billing services',
      'oral and maxillofacial surgery billing',
      'bone graft dental billing',
      'IV sedation dental billing',
      'dental implant insurance billing',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Pediatric dentistry                                              */
  /* ---------------------------------------------------------------- */
  {
    slug: 'pediatric-dentistry',
    name: 'Pediatric Dentistry',
    kind: 'dental',
    icon: 'Baby',
    summary:
      'Pediatric dental billing support for Medicaid and CHIP dental plans, preventive frequencies, sedation and hospital cases and family accounts.',
    definition:
      'Pediatric dental billing involves verifying Medicaid, CHIP and commercial dental coverage for children, following state program rules and managed care dental plan policies, tracking preventive frequencies for exams, fluoride and sealants, obtaining authorizations for sedation and hospital dentistry, and managing family accounts where siblings carry different plans.',
    intro: [
      "Pediatric dental offices often serve a large share of children covered by Medicaid or CHIP. Under Medicaid's EPSDT benefit, children are entitled to dental services, but the details are set by each state and frequently administered by managed care dental plans. Each plan has its own provider enrollment, its own frequency rules and its own authorization requirements, and eligibility can change month to month.",
      "Commercial pediatric billing has its own patterns: preventive frequencies for fluoride and sealants that end at plan-specific ages, space maintainers, stainless steel crowns and the occasional case that needs sedation or treatment in a hospital or surgery center. Families frequently have children on different plans or two parents with separate coverage, which makes coordination of benefits and the birthday rule a daily task.",
      "Our team works inside your practice management software to verify each child's coverage before the visit, follow program and plan rules, request authorizations for sedation and facility cases and follow up on claims with Medicaid dental plans and commercial carriers alike.",
    ],
    challenges: [
      {
        title: 'Medicaid and CHIP dental plan rules',
        detail:
          'Medicaid and CHIP dental benefits are defined by each state and are often delivered through managed care dental plans. Covered services, frequencies, age limits and documentation requirements vary by state and plan, and the office has to be enrolled with the state program and credentialed with each plan it sees patients for.',
      },
      {
        title: 'Monthly eligibility changes',
        detail:
          'Medicaid and CHIP eligibility can lapse or change plans between visits. Verifying eligibility and plan assignment for each date of service, not just once a year, prevents claims sent to the wrong plan or for a child who is no longer covered.',
      },
      {
        title: 'Preventive frequencies and age limits',
        detail:
          'Fluoride varnish, sealants and some preventive services carry age limits and frequency rules that differ between Medicaid and commercial plans. Sealants may be limited to certain permanent teeth and to a single application within a set period, and fluoride frequency may change with risk level.',
      },
      {
        title: 'Sedation, general anesthesia and facility cases',
        detail:
          'Young or anxious children sometimes need treatment under sedation or general anesthesia in a hospital or surgery center. These cases often require a dental prior authorization for the planned treatment and the anesthesia, documentation of why treatment in the chair is not possible, and close coordination with the facility billing office.',
      },
      {
        title: 'Family accounts and coordination of benefits',
        detail:
          'Siblings may be on different plans, and children covered by both parents need the birthday rule or custody arrangements applied to find the primary plan. Medicaid is generally the payer of last resort, and offices generally cannot bill Medicaid-covered children for covered services beyond what the program allows.',
      },
    ],
    payerWorkflow: [
      'Eligibility and plan assignment are verified before each visit for Medicaid and CHIP patients, and benefits are verified for commercial patients with attention to age-based limits.',
      'Claims are submitted to the correct managed care dental plan or carrier on the ADA claim form or 837D, with tooth numbers, surfaces and any required radiographs or narratives.',
      'Prior authorizations are requested for services the state program or plan requires, such as sedation, general anesthesia in a facility, certain crowns or orthodontic evaluations.',
      'Coordination of benefits is applied for children with more than one plan, with Medicaid billed last when other coverage exists.',
      'Payments are posted and denials are worked against the specific state program or plan policy, with patient statements limited to what the program and contracts permit.',
    ],
    services: [
      'dental-billing',
      'insurance-eligibility-verification',
      'prior-authorization',
      'provider-enrollment',
      'claims-submission',
      'denial-management',
      'payment-posting',
    ],
    faqs: [
      {
        q: 'How is pediatric Medicaid dental billing different from commercial billing?',
        a: 'Medicaid dental billing follows state program rules, often through a managed care dental plan, rather than a commercial plan contract. Covered services, frequencies, authorization requirements and claim deadlines are set by the state and plan. Eligibility can change monthly, and offices generally may not balance bill Medicaid patients for covered services. Commercial plans instead apply deductibles, coinsurance and annual maximums.',
      },
      {
        q: 'Does a pediatric dentist need to enroll with each Medicaid dental plan?',
        a: 'Usually yes. Providers typically enroll with the state Medicaid program and then credential with each managed care dental plan that serves the patients they want to see. Each plan has its own application and network process. Enrollment details vary by state, so it is worth confirming the requirements before scheduling Medicaid patients under a new provider.',
      },
      {
        q: 'Who pays when a child has both commercial dental coverage and Medicaid?',
        a: 'The commercial plan is billed first, and Medicaid is billed as the payer of last resort for any remaining covered amount. For children covered by two commercial plans, the birthday rule often decides which parent plan is primary, though custody orders can change that. Collecting all coverage at registration helps send claims in the right order.',
      },
      {
        q: 'What authorizations are needed for dental treatment under general anesthesia?',
        a: 'Requirements vary, but cases done under general anesthesia in a hospital or surgery center often need a dental prior authorization that covers the planned treatment and the anesthesia, and the facility may have its own approval steps. Documentation of why the child cannot be treated in the chair is commonly requested. Starting authorizations early gives time to resolve requests for more information.',
      },
      {
        q: 'Why are sealant claims sometimes denied?',
        a: 'Sealant denials usually come from plan age limits, tooth limits such as covering only permanent molars, or a repeat application inside the plan frequency window. Some plans also deny sealants on teeth with existing restorations on the same surface. Checking the specific plan rules and the tooth history before placing sealants helps avoid these denials.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'prior-authorization-checklist',
      'credentialing-checklist',
      'dental-denial-rate-calculator',
    ],
    seoTitle: 'Pediatric Dental Billing Services | Texas Solutions RCM',
    metaDescription:
      'Pediatric dental billing services for Medicaid and CHIP dental plans, eligibility checks, sealant and fluoride rules, sedation authorizations and COB.',
    keywords: [
      'pediatric dental billing',
      'pediatric dental billing services',
      'pediatric dentist billing services',
      'CHIP dental billing',
      'dental general anesthesia authorization',
      'sealant frequency limits',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Prosthodontics                                                   */
  /* ---------------------------------------------------------------- */
  {
    slug: 'prosthodontics',
    name: 'Prosthodontics',
    kind: 'dental',
    icon: 'Crown',
    summary:
      'Prosthodontic billing support for crowns, bridges, dentures and implants: replacement rules, missing tooth clauses, seat dates and estimates.',
    definition:
      'Prosthodontic billing involves estimating and billing crowns, bridges, dentures and implant restorations under plan rules for replacement intervals, missing tooth clauses and alternate benefits, submitting claims on the correct completion date with radiographs and narratives, and coordinating benefits when a patient has more than one dental plan.',
    intro: [
      "Prosthodontic treatment is expensive, multi-visit and heavily governed by plan limitations. Most dental plans classify crowns, bridges, dentures and implant restorations as major services, with lower coinsurance, waiting periods for new enrollees and a replacement rule that limits how often a prosthesis can be replaced. A single case can consume a patient's annual maximum, or more than one year of it.",
      "The rules that matter most are often buried in plan language: a missing tooth clause that excludes replacing teeth lost before coverage began, an alternate benefit that pays an implant crown at the rate of a partial denture, or a requirement that a crown be billed on the seat date rather than the preparation date. These are the details that separate an accurate estimate from a large surprise balance.",
      "We work inside your practice management software to build pre-treatment estimates with full history, bill on the correct date with the documentation plans expect, track lab and multi-stage cases and follow up on major-service claims until they are paid or properly appealed.",
    ],
    challenges: [
      {
        title: 'Replacement rules and prior prosthesis history',
        detail:
          'Plans commonly limit replacement of crowns, bridges and dentures to once in a multi-year period, often measured from the date the existing prosthesis was placed. Without the placement date of the existing work, the estimate cannot reflect whether the replacement is covered.',
      },
      {
        title: 'Missing tooth clauses',
        detail:
          'A missing tooth clause can exclude bridges, implants or partial dentures that replace teeth lost before the patient became covered. Some plans waive the clause after a period of continuous coverage. Verifying this before treatment planning avoids estimates that assume coverage the plan will not provide.',
      },
      {
        title: 'Alternate benefits for implants and materials',
        detail:
          'Plans may pay an implant-supported crown at the allowance for a bridge or removable partial, pay a porcelain crown on a molar at a metal crown rate, or limit coverage for precision attachments. The procedure is covered in part, and the patient owes the difference.',
      },
      {
        title: 'Billing date for multi-visit procedures',
        detail:
          'Many dental plans expect crowns, bridges and dentures to be billed on the seat or delivery date rather than the preparation or impression date. If coverage ends between visits, billing on the wrong date can lead to recoupment or a denial for a patient who is no longer eligible.',
      },
      {
        title: 'Dual dental coverage on large cases',
        detail:
          'When a patient has two dental plans, a large prosthetic case can draw on both annual maximums, but only if the primary and secondary are identified correctly and the secondary claim includes the primary EOB. Each plan may also apply its own replacement rule or alternate benefit, so both need to be checked before the estimate is presented.',
      },
    ],
    payerWorkflow: [
      'Benefits are verified for major-service coinsurance, waiting periods, missing tooth clauses, replacement intervals and alternate benefit rules, along with the placement date of any existing prosthesis.',
      'Pre-treatment estimates are submitted for larger cases with radiographs, periodontal status and a narrative describing the existing condition and the reason for treatment.',
      'Claims are billed on the ADA claim form or 837D on the plan-required date, typically the seat or delivery date, with tooth numbers, prior placement dates and attachments.',
      'For patients with two dental plans, the secondary claim is sent with the primary EOB so each plan applies its own limits and the remaining balance is accurate.',
      'Partial payments and downgrades are reviewed against the plan rule and estimate, and appeals include the clinical rationale for the treatment chosen.',
    ],
    services: [
      'dental-billing',
      'benefits-verification',
      'claims-submission',
      'denial-appeals',
      'patient-financial-communication',
      'patient-billing',
    ],
    faqs: [
      {
        q: 'What is a missing tooth clause?',
        a: "A missing tooth clause is a dental plan provision that excludes coverage for replacing a tooth that was missing before the patient's coverage began. It can affect bridges, implants and partial dentures. Some plans waive the clause after a period of continuous coverage or if the patient had prior coverage. Checking for it before treatment planning keeps the estimate accurate.",
      },
      {
        q: 'Should a crown be billed on the prep date or the seat date?',
        a: 'Many dental plans expect crowns and other fixed and removable prosthetics to be billed on the date the restoration is seated or delivered. Some plans allow billing at preparation under specific conditions. Following the plan rule matters most when coverage might change between visits, because a claim billed on the wrong date can be denied or recouped later.',
      },
      {
        q: 'How often will a dental plan pay to replace a crown or denture?',
        a: 'Many plans allow replacement of crowns, bridges and dentures only after a set number of years from the original placement, commonly in the range of five years, though plans vary. Some make exceptions when the existing prosthesis cannot be repaired. Knowing the original placement date before treatment is the key piece of information for the estimate.',
      },
      {
        q: 'Can a large prosthetic case use two dental plans?',
        a: 'Yes, when the patient is covered by two dental plans. The primary plan pays first under its own limits, then the secondary claim is sent with the primary EOB and the secondary pays according to its coordination rules. Each plan may apply its own replacement interval, missing tooth clause or alternate benefit, so checking both before treatment keeps the estimate realistic.',
      },
      {
        q: 'Why did the plan pay an implant crown as a partial denture?',
        a: 'That is an alternate benefit. Some plans pay implant restorations at the allowance for a less costly option, such as a removable partial denture or a bridge, while still applying the payment toward the case. The patient is usually responsible for the difference, subject to your network contract. A pre-treatment estimate can reveal this before treatment begins.',
      },
    ],
    relatedTools: [
      'dental-insurance-verification-checklist',
      'dental-insurance-collection-calculator',
      'dental-practice-revenue-calculator',
      'patient-balance-calculator',
    ],
    seoTitle: 'Prosthodontic Billing Services | Texas Solutions RCM',
    metaDescription:
      'Prosthodontic billing support for crowns, bridges, dentures and implants, covering replacement rules, missing tooth clauses, seat dates and estimates.',
    keywords: [
      'prosthodontic billing',
      'crown and bridge billing',
      'dental implant billing',
      'missing tooth clause',
      'denture insurance billing',
      'dental prosthetic coordination of benefits',
    ],
  },

  /* ---------------------------------------------------------------- */
  /*  Dental group practices and DSOs                                  */
  /* ---------------------------------------------------------------- */
  {
    slug: 'dental-group-practices',
    name: 'Dental Group Practices and DSOs',
    kind: 'dental',
    icon: 'Building2',
    summary:
      'Billing support for multi-location dental groups and DSOs: credentialing by location, fee schedule management, central AR and reporting.',
    definition:
      'Dental group and DSO billing involves running a consistent revenue cycle across many locations and providers: credentialing each dentist and hygienist where required with every network at every office, loading and maintaining fee schedules by payer and location, managing PPO and DHMO participation, centralizing claims and AR follow-up and producing comparable reporting across offices.',
    intro: [
      "A multi-location dental group faces the same claim rules as a single office, multiplied by every location, provider and payer. Network participation can differ from one office to the next. A newly hired associate may be in network at one location and out of network at another until credentialing is complete. Fee schedules have to be loaded correctly for every plan at every office, and a single error repeats across thousands of claims.",
      "Groups and DSOs also deal with structure: one or more tax IDs, Type 1 NPIs for providers and Type 2 NPIs for the organization or each location, DHMO capitation rosters that assign members to specific offices and PPO networks that may be accessed through leased or rental arrangements. Each of these affects how claims must be submitted and how payments should be reconciled.",
      "Our team works inside your centralized practice management system and clearinghouse to support credentialing across locations, maintain fee schedules, standardize verification and claim workflows, work AR by office and payer and report on each location in the same way.",
    ],
    challenges: [
      {
        title: 'Credentialing every provider at every location',
        detail:
          'Dental networks typically credential each provider and link them to specific service locations and a billing TIN. Associate turnover, new locations and acquisitions all create gaps where a provider is not yet in network at an office, and claims billed during those gaps may process out of network.',
      },
      {
        title: 'Fee schedule management by payer and location',
        detail:
          'Contracted fees can differ by plan, network, region and location. Loading the wrong schedule understates patient estimates or produces overbilled claims that trigger write-offs and refunds. Schedules need to be updated when payers change fees and checked against actual EOB allowances.',
      },
      {
        title: 'Leased networks and PPO participation',
        detail:
          'A contract with one network may give other plans access to your discounted fees through leasing arrangements. Without knowing which network a claim is priced under, offices cannot tell whether an allowance is correct or whether participation should be reviewed.',
      },
      {
        title: 'DHMO capitation reconciliation',
        detail:
          'DHMO plans assign members to a specific office and pay a monthly capitation per assigned member plus patient copayments, and some also pay supplemental amounts for certain procedures. Rosters, capitation payments and encounter data have to be reconciled by location to confirm the group is paid for every assigned member.',
      },
      {
        title: 'Consistency across offices',
        detail:
          'Each location tends to develop its own habits for verification, attachments, posting and adjustments. Inconsistent workflows make AR harder to manage and reporting harder to compare. A shared playbook and centralized follow-up help leadership see real differences between offices.',
      },
    ],
    payerWorkflow: [
      'Each provider is credentialed with every relevant network and linked to the correct locations, TIN and Type 2 NPI, with effective dates tracked before patients are scheduled in network.',
      'Fee schedules are loaded by payer and location in the practice management system and compared to EOB allowances to catch mismatches early.',
      'Verification, claim submission on the ADA claim form or 837D, and attachments follow a standard workflow across all offices, with location-specific exceptions documented.',
      'DHMO rosters and capitation payments are reconciled monthly by location, and PPO payments are posted with adjustments coded consistently.',
      'AR is worked centrally by location, payer and age, and reporting uses the same definitions at every office so performance can be compared fairly.',
    ],
    services: [
      'dental-billing',
      'dental-credentialing',
      'provider-enrollment',
      'fee-schedule-analysis',
      'payer-contracting',
      'accounts-receivable-management',
      'payment-reconciliation',
      'rcm-analytics-reporting',
    ],
    faqs: [
      {
        q: 'Does each dentist need to be credentialed at every location?',
        a: 'Usually yes. Most dental networks credential the individual provider and then link that provider to each service location and billing TIN where they practice. A dentist who is in network at one office may not be in network at another until that location is added. Tracking effective dates by provider and location helps avoid out-of-network claims.',
      },
      {
        q: 'How should a dental group manage fee schedules across locations?',
        a: 'Start by loading each payer schedule by plan, network and location in the practice management system, then compare allowances on incoming EOBs against what was loaded. Differences point to schedule errors, leased network pricing or payer fee changes. Reviewing schedules on a regular cadence and after every contract change keeps patient estimates and write-offs accurate.',
      },
      {
        q: 'What is a leased dental PPO network?',
        a: 'A leased or rental network arrangement lets other plans access the discounted fees in your contract with a network. Patients from those plans are priced at your contracted rates even though you did not sign directly with their plan. Understanding which networks lease your contract helps explain allowances and informs decisions about which participation agreements to keep.',
      },
      {
        q: 'How is DHMO capitation reconciled for a group practice?',
        a: 'Each month the plan sends a roster of members assigned to each office and a capitation payment based on that roster. Reconciliation compares the roster, the payment and the patients actually seen, and checks that copayments and any supplemental payments were applied. Doing this by location helps catch missing members, wrong assignments and unpaid supplemental amounts.',
      },
      {
        q: 'Can billing be centralized when offices use different systems?',
        a: 'It can, though it takes more coordination. Our team works inside each system your offices use, following one shared workflow for verification, claims, posting and follow-up, and reporting with consistent definitions. Groups that are consolidating systems sometimes pair centralized billing with a migration plan so all locations eventually work from one platform.',
      },
    ],
    relatedTools: [
      'credentialing-checklist',
      'fee-schedule-comparison-calculator',
      'dental-ar-aging-calculator',
      'dental-practice-roi-calculator',
    ],
    seoTitle: 'Dental Group and DSO Billing Services | Texas Solutions RCM',
    metaDescription:
      'Billing support for dental groups and DSOs: credentialing across locations, fee schedule management, DHMO reconciliation, central AR and reporting.',
    keywords: [
      'DSO billing services',
      'dental group billing',
      'multi-location dental billing',
      'dental credentialing',
      'dental fee schedule management',
      'DHMO capitation reconciliation',
    ],
  },
];
