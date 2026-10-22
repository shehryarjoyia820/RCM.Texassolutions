/**
 * Dental RCM guides, batch E (2026-10-22). Original content. Rules: docs/DENTAL-WRITING.md.
 * Sources are limited to URLs already verified elsewhere in this repo.
 */
import type { SeedPost } from './seed';

const S = {
  adaCredService: {
    label: 'ADA: ADA Credentialing Service',
    url: 'https://www.ada.org/resources/practice/dental-insurance/dental-insurance-industry-solutions/ada-credentialing-service',
  },
  adaCredChecklist: {
    label: 'ADA / DataSpring: Your Credentialing Checklist (PDF)',
    url: 'https://www.ada.org/-/media/project/ada-organization/ada/ada-org/files/resources/practice/dental-insurance/ada-credentialing-service/dataspring_ada_credentialing_checklist.pdf',
  },
  nppes: { label: 'CMS: National Plan and Provider Enumeration System (NPPES)', url: 'https://nppes.cms.hhs.gov/' },
  adaTypesOfPlans: { label: 'ADA: Types of Dental Plans', url: 'https://www.ada.org/resources/practice/dental-insurance/types-of-dental-plans' },
  adaIntroBenefits: {
    label: 'ADA: An Introduction to Dental Benefits',
    url: 'https://www.ada.org/resources/practice/dental-insurance/an-introduction-to-dental-benefits',
  },
  fairHealthDental: {
    label: 'FAIR Health: Dental Data Resources and Tools for Diverse Users',
    url: 'https://www.fairhealth.org/article/dental-data-resources-and-tools-for-diverse-users',
  },
  ecfrClaims: {
    label: 'eCFR: 45 CFR 162.1102, Standards for health care claims (includes the dental 837)',
    url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-162/subpart-K/section-162.1102',
  },
  hhsBa: {
    label: 'HHS: Business Associates (HIPAA guidance)',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/index.html',
  },
  hhsMinNecessary: {
    label: 'HHS: Minimum Necessary Requirement',
    url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/minimum-necessary-requirement/index.html',
  },
  hfmaMapKeys: { label: 'HFMA: MAP Keys, industry-standard revenue cycle KPIs', url: 'https://www.hfma.org/data-and-insights/map-initiative/map-keys/' },
};

export const dentalGuidesE: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'dental-ppo-credentialing-process',
    title: 'Dental PPO Credentialing: A Step-by-Step Process',
    seoTitle: 'Dental PPO Credentialing: Step-by-Step Process',
    metaDescription:
      'A step-by-step guide to credentialing a dentist with dental PPO networks: documents to gather, applications, follow-up, effective dates and keeping it current.',
    excerpt:
      'How a dentist joins a dental PPO network, from gathering documents and choosing networks to tracking applications, confirming effective dates and staying current.',
    category: 'Practice Management',
    tags: ['dental credentialing', 'PPO networks', 'provider enrollment', 'new dentist'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Credentialing is the process a dental PPO uses to confirm that a dentist is qualified, licensed and insured before it lists that dentist as in network. Until a carrier finishes credentialing and loads the contract, claims for that dentist are usually processed as out of network, or not at all. This guide walks through the process one step at a time so your office knows what to prepare, what to track and where applications tend to stall.</p>

<h2>Step 1: Decide which networks to join</h2>
<p>Before any paperwork starts, decide which PPO networks make sense for the practice. Joining every network in your area is rarely the right answer, because each contract comes with its own fee schedule and its own write-offs. A few questions help narrow the list:</p>
<ul>
<li>Which carriers do your current and expected patients actually carry? Your scheduling and insurance records are the best starting point.</li>
<li>Which networks are large employers in your area tied to?</li>
<li>Does the carrier's fee schedule cover your costs on the procedures you do most often?</li>
<li>Is the network open to new dentists in your ZIP code, or is it closed for now?</li>
</ul>
<p>If you are still weighing whether a PPO or a capitation plan fits your practice, our guide to <a href="/blog/dhmo-vs-ppo-for-dental-practices/">DHMO vs PPO for dental practices</a> covers the tradeoffs. Fee schedule review is its own topic, covered in our guide to <a href="/blog/dental-ppo-fee-schedule-negotiation/">dental PPO fee schedule negotiation</a>.</p>

<h2>Step 2: Gather the dentist's documents</h2>
<p>Most dental carriers ask for the same core set of documents. Collecting them once, in current form, saves weeks of back and forth later. The ADA's credentialing checklist is a useful reference for the full list. In practice, plan on:</p>
<ul>
<li><strong>State dental license</strong> for every state where the dentist will treat patients.</li>
<li><strong>DEA registration</strong> and any state controlled substance registration, if the dentist prescribes.</li>
<li><strong>Individual NPI</strong> (Type 1) for the dentist, and the practice's organizational NPI (Type 2) if the practice bills under one. Both are issued through NPPES.</li>
<li><strong>Malpractice insurance</strong> certificate showing coverage dates and limits.</li>
<li><strong>Dental school diploma</strong> and any specialty training certificates.</li>
<li><strong>Work history</strong> with explanations for any gaps the carrier asks about.</li>
<li><strong>Practice information:</strong> tax ID (TIN), W-9, service and billing addresses, office hours and the practice's legal name exactly as it appears with the IRS.</li>
<li><strong>Bank information</strong> for EFT enrollment, kept separate from the credentialing file itself.</li>
</ul>
<p>Small mismatches cause real delays. If the practice name on the W-9 does not match the name in NPPES, or a license number has a typo, the carrier may pause the application until it is fixed.</p>

<h2>Step 3: Complete or update the CAQH ProView profile</h2>
<p>Many dental carriers pull credentialing data from CAQH ProView instead of asking for a full paper application. The ADA Credentialing Service, built with CAQH, gives ADA members a way into the same profile. The dentist completes the profile once, uploads documents, authorizes the carriers that may view it and re-attests on a regular schedule.</p>
<p>We cover the profile itself in detail in our post on <a href="/blog/caqh-proview-for-dentists/">CAQH ProView for dentists</a>, so we will not repeat it here. The key point for this process: an incomplete or unattested profile is one of the most common reasons a carrier's credentialing team stops working an application.</p>

<h2>Step 4: Submit each carrier's application</h2>
<p>Even when a carrier uses CAQH data, it usually has its own application or participation request to start the process. Some carriers use an online portal, some use a PDF packet and some accept a request through their provider relations team. Typical items include:</p>
<ul>
<li>The carrier's participation request or application form.</li>
<li>Authorization for the carrier to view the CAQH profile.</li>
<li>A signed participating dentist agreement, sometimes sent only after credentialing is approved.</li>
<li>Location details for every office where the dentist will see patients.</li>
</ul>
<p>Record the date you submitted each application, the reference or tracking number the carrier gives you and the name of anyone you spoke with. That log is what makes follow-up possible.</p>

<h2>Step 5: Follow up on a schedule</h2>
<p>Applications rarely move without follow-up. Carriers set their own timelines, and processing can take several months depending on the carrier, the state and the time of year. A simple tracking table keeps the work visible:</p>
<table>
<thead><tr><th>Carrier</th><th>Submitted</th><th>Reference #</th><th>Last contact</th><th>Status</th><th>Next action</th></tr></thead>
<tbody>
<tr><td>Carrier A</td><td>Date</td><td>From portal</td><td>Date</td><td>In review</td><td>Check portal in two weeks</td></tr>
<tr><td>Carrier B</td><td>Date</td><td>From email</td><td>Date</td><td>Missing W-9</td><td>Send corrected W-9</td></tr>
<tr><td>Carrier C</td><td>Date</td><td>Pending</td><td>Date</td><td>Contract sent</td><td>Dentist to sign and return</td></tr>
</tbody>
</table>
<p>When a carrier asks for something, answer the same week. A request left open often resets the file to the back of the queue.</p>

<h3>Common reasons applications stall</h3>
<ul>
<li>CAQH profile not attested, or the carrier was not authorized to view it.</li>
<li>Names, addresses or tax IDs that do not match across NPPES, the W-9 and the application.</li>
<li>Expired malpractice certificate or license uploaded to the profile.</li>
<li>Unexplained gaps in work history.</li>
<li>Network closed to new dentists in the area, which the carrier may only state after review.</li>
<li>No one assigned to follow up, so carrier requests sit unanswered.</li>
</ul>

<h2>Step 6: Confirm the effective date and contract load</h2>
<p>Approval is not the finish line. Before you schedule patients as in network, confirm three things with each carrier:</p>
<ol>
<li><strong>The effective date</strong> of participation, in writing.</li>
<li><strong>The fee schedule</strong> that applies to your location, so your practice software has the right contracted fees.</li>
<li><strong>That the dentist is linked to the correct TIN and location</strong> in the carrier's system. A dentist credentialed at the wrong address can see claims processed out of network.</li>
</ol>
<p>Then update your practice software: attach the fee schedule to the carrier, set the dentist's provider IDs and confirm claims will go out under the right billing and rendering NPIs. Set up ERA and EFT enrollment with each carrier at the same time, so payments post electronically from the first claim.</p>

<h2>Step 7: Keep credentialing current</h2>
<p>Credentialing is not a one-time event. Carriers re-credential dentists on a cycle, CAQH profiles need regular re-attestation, and licenses, DEA registrations and malpractice policies all expire. Changes also trigger updates: a new office location, a new associate, a change in ownership or a new bank account for EFT. Keep a calendar of expiration dates and a list of every network each dentist participates in, by location.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>Our <a href="/services/dental-credentialing/">Dental Credentialing &amp; Provider Enrollment</a> service handles network applications, CAQH updates, re-credentialing, provider information updates and EFT/ERA enrollment assistance. Credentialing is charged separately from our monthly billing fee and is quoted after we review how many dentists, locations and networks are involved. Once a dentist is in network, our <a href="/services/dental-claims-processing/">Dental Claims Management</a> team can make sure claims go out under the right provider and location. <a href="/consultation/">Book a free consultation</a> to talk through your credentialing plan.</p>
`,
    faqs: [
      {
        q: 'How long does dental PPO credentialing take?',
        a: 'It varies by carrier, state and time of year, and it often takes several months. Complete applications, an attested CAQH profile and prompt answers to carrier requests are the parts your office controls.',
      },
      {
        q: 'Can a dentist see PPO patients before credentialing is finished?',
        a: 'Yes, but the claims are usually processed as out of network until the carrier confirms an effective date. Tell patients this in advance and check whether the carrier allows any retroactive effective date before you assume it will.',
      },
      {
        q: 'Do I need CAQH ProView to join a dental PPO?',
        a: 'Many dental carriers use CAQH ProView data, but not every carrier requires it. Check each carrier\'s credentialing instructions, and keep the profile complete and attested if any of your networks rely on it.',
      },
      {
        q: 'Is credentialing included in your monthly billing fee?',
        a: 'No. Dental Credentialing & Provider Enrollment is charged separately and quoted after we review the number of dentists, locations and networks involved.',
      },
    ],
    sources: [S.adaCredService, S.adaCredChecklist, S.nppes],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'dental-ppo-fee-schedule-negotiation',
    title: 'Dental PPO Fee Schedule Negotiation: Review, Request, Decide',
    seoTitle: 'Dental PPO Fee Schedule Negotiation Guide',
    metaDescription:
      'How to review and renegotiate dental PPO fee schedules: the data to gather, how to ask a carrier for higher fees and how to decide whether to stay in network.',
    excerpt:
      'A practical approach to reviewing your dental PPO fee schedules, asking carriers for better fees and deciding, with real data, whether a network still makes sense.',
    category: 'Practice Management',
    tags: ['PPO fee schedules', 'fee negotiation', 'write-offs', 'dental PPO'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Every dental PPO contract comes with a fee schedule: the maximum the carrier allows for each CDT code, which becomes the most your office can collect from the carrier and the patient combined. Many practices sign those schedules once and never look at them again, even as their own costs rise. This guide explains how to review your PPO fee schedules, what data to gather before asking a carrier for an increase and how to decide whether to stay in a network. There are no promised outcomes here: some carriers adjust fees on request and some do not.</p>

<h2>Why fee schedules deserve a regular review</h2>
<p>A PPO fee schedule affects every claim you send to that carrier. Small differences on high-volume codes add up quickly. Common reasons to review:</p>
<ul>
<li>Your contracted fees have not changed in years while staff, supply and lab costs have.</li>
<li>One carrier now makes up a larger share of your patients than when you signed.</li>
<li>You added services, such as implants or clear aligners, that the original contract did not consider.</li>
<li>Write-offs on your monthly reports are growing faster than production.</li>
</ul>
<p>If the difference between your office fees and contracted fees is new to you, start with our guides to <a href="/blog/ucr-fees-dental/">UCR fees in dentistry</a> and <a href="/blog/ppo-dental-billing-guide/">PPO dental billing</a>.</p>

<h2>Data to gather before you ask</h2>
<p>A request backed by your own numbers is easier for a carrier's network team to evaluate than a general request for higher fees. Pull at least 12 months of data from your practice software:</p>
<ul>
<li><strong>Your current fee schedule from each carrier.</strong> Request it in writing if you do not have the latest version.</li>
<li><strong>Your top procedures by volume and by revenue</strong> for each carrier. In most general offices, preventive and diagnostic codes such as D0120, D1110 and D0274 lead in volume, while crowns and buildups lead in revenue.</li>
<li><strong>Write-off by carrier,</strong> meaning your office fee minus the contracted fee, multiplied by volume.</li>
<li><strong>Patient count by carrier,</strong> including active patients seen in the last 12 to 18 months.</li>
<li><strong>Your costs</strong> for the procedures that matter most, at least roughly: chair time, staff, supplies and lab fees.</li>
<li><strong>Anything that sets your office apart</strong> for that carrier's members: extended hours, a location with few in-network dentists nearby, specialty services in house or languages spoken.</li>
</ul>
<p>Independent fee data, such as the dental datasets FAIR Health describes, can help you understand how your office fees compare with your area. Use it as context, not as a number the carrier must accept.</p>

<h2>A worked example (hypothetical numbers)</h2>
<p>The table below uses hypothetical fees for one carrier to show how a fee review highlights where to focus. None of these numbers come from a real carrier.</p>
<table>
<thead><tr><th>Code</th><th>Office fee</th><th>Contracted fee</th><th>Annual volume</th><th>Annual write-off</th></tr></thead>
<tbody>
<tr><td>D1110</td><td>$120</td><td>$80</td><td>900</td><td>$36,000</td></tr>
<tr><td>D0120</td><td>$65</td><td>$40</td><td>1,000</td><td>$25,000</td></tr>
<tr><td>D2740</td><td>$1,300</td><td>$850</td><td>60</td><td>$27,000</td></tr>
<tr><td>D2950</td><td>$300</td><td>$170</td><td>50</td><td>$6,500</td></tr>
</tbody>
</table>
<p>In this hypothetical, a few dollars more on cleanings and exams would matter almost as much as a larger increase on crowns, because volume is so high. That is why a request focused on your top ten codes is usually more useful than a request to raise everything. Our <a href="/tools/dental-ppo-write-off-calculator/">PPO write-off calculator</a> and <a href="/tools/fee-schedule-comparison-calculator/">fee schedule comparison calculator</a> can help you run the same math on your own data.</p>

<h2>How to ask a carrier for a fee review</h2>
<ol>
<li><strong>Find the right contact.</strong> Provider relations or network management usually handles fee requests. Ask the carrier how it accepts them.</li>
<li><strong>Read your contract first.</strong> Look for the term, renewal date, notice periods, how fee changes are made and whether the contract can be leased to other networks.</li>
<li><strong>Write a short, specific request.</strong> List the codes you want reviewed, your current contracted fee, the fee you are asking for and a brief reason tied to your data.</li>
<li><strong>Explain your value to their members.</strong> Patient count, access, hours and services they would otherwise send elsewhere.</li>
<li><strong>Keep everything in writing</strong> and log dates, names and responses.</li>
<li><strong>Follow up.</strong> Network teams handle many requests. A polite check-in after a few weeks is normal.</li>
<li><strong>Load any new fees correctly.</strong> If a carrier agrees to changes, get the effective date in writing and update the fee schedule in your practice software before posting the next payment.</li>
</ol>
<p>Be prepared for a no, a partial increase limited to certain codes, or a response that fees are set by region and not negotiable. Any of those answers is still useful information for the next decision.</p>

<h2>Deciding whether to stay in a network</h2>
<p>If a carrier will not move and the fees no longer work, leaving the network is an option, but it should be a data-driven decision rather than a reaction. Consider:</p>
<ul>
<li><strong>How many active patients carry that plan,</strong> and how many you might lose if you go out of network.</li>
<li><strong>What the plan pays out of network.</strong> Some plans pay out-of-network dentists reasonably; others pay little, or pay the patient directly, which shifts collection work to your office.</li>
<li><strong>Whether your schedule can absorb the change.</strong> An office with a waiting list is in a different position from one with open hygiene time.</li>
<li><strong>Whether the contract has been leased</strong> to other networks, which can affect how patients and claims move after you leave.</li>
<li><strong>The contract's termination notice period</strong> and any obligations to finish treatment in progress.</li>
</ul>
<p>Plan how you will tell patients, update your website and front desk scripts, and adjust your office financial policy for out-of-network claims. The ADA's resources on dental plan types are a helpful refresher on how PPO, indemnity and capitation plans differ when you think about your mix.</p>

<h2>Keep the review going</h2>
<p>Make fee schedule review a recurring task rather than a one-time project. Once a year, compare each carrier's fees, write-offs and patient counts, and note contract renewal dates on a calendar so you never miss a window to ask.</p>
<p>Between reviews, watch your payment posting. When a carrier pays less than the fee loaded in your software, the cause may be a posting error, an outdated fee schedule in your system or a fee change the carrier announced in a newsletter your office missed. Each of those needs a different fix, and catching them monthly keeps your next review built on accurate numbers. Keep copies of every fee schedule version you receive, with the date it took effect, so you can compare payments against the right one.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>We do not negotiate contracts on your behalf, but our <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> service can prepare the collection and adjustment reports you need for a fee review, by carrier and by code. Our Payment Posting team records contractual adjustments accurately and flags payments that do not match your loaded fee schedule. <a href="/consultation/">Book a free consultation</a> to talk about your PPO mix.</p>
`,
    faqs: [
      {
        q: 'Can a dental practice negotiate PPO fees?',
        a: 'Yes, you can ask, but the carrier decides. Some carriers review fees on request, some adjust only certain codes and some set fees by region and do not negotiate with individual offices.',
      },
      {
        q: 'What data should I bring to a fee schedule review?',
        a: 'Bring your current contracted fees, your top codes by volume and revenue, write-offs by carrier, active patient counts and a rough view of your costs. Focus the request on the codes that matter most to your office.',
      },
      {
        q: 'How often should we review PPO fee schedules?',
        a: 'Once a year is a reasonable rhythm for most offices. Tie the review to each contract\'s renewal date so you have time to ask before terms roll over.',
      },
      {
        q: 'What happens to patients if we leave a PPO network?',
        a: 'Their claims are processed under the plan\'s out-of-network rules, which often means a higher patient share and sometimes payment sent to the patient instead of the office. Tell patients ahead of time and update your financial policy.',
      },
    ],
    sources: [S.adaTypesOfPlans, S.adaIntroBenefits, S.fairHealthDental],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'new-dental-practice-billing-setup',
    title: 'Billing Setup for a New or Acquired Dental Practice',
    seoTitle: 'New Dental Practice Billing and Insurance Setup',
    metaDescription:
      'Set up billing for a new or acquired dental practice: NPIs, tax ID, credentialing timing, fee schedule, practice software, clearinghouse and office policies.',
    excerpt:
      'A setup checklist for opening or buying a dental practice: identifiers, credentialing timing, fee schedules, software, clearinghouse and the policies that keep billing clean from day one.',
    category: 'Practice Management',
    tags: ['new dental practice', 'practice acquisition', 'billing setup', 'credentialing'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Opening a new dental office or buying an existing one means rebuilding the billing foundation before the first claim goes out. Identifiers, network contracts, fee schedules and software settings all have to line up, and most of them take longer than owners expect. This guide covers the setup in the order it usually needs to happen, with notes on what changes when you acquire a practice instead of starting from scratch.</p>

<h2>Start with the business identifiers</h2>
<p>Every other step depends on these, so settle them first:</p>
<ul>
<li><strong>Legal entity and tax ID (TIN).</strong> Your accountant or attorney will help you choose the entity. The tax ID the IRS issues is what carriers use to identify the practice and where payments are reported.</li>
<li><strong>Individual NPI (Type 1)</strong> for each dentist and hygienist who needs one. Dentists keep the same individual NPI for their whole career, so most already have one.</li>
<li><strong>Organizational NPI (Type 2)</strong> for the practice entity, if it will bill as a group. Apply through NPPES and make sure the legal name, address and taxonomy match your tax records.</li>
<li><strong>W-9</strong> showing the exact legal name and TIN. Carriers compare it with your applications.</li>
<li><strong>State licenses, DEA registration and malpractice coverage</strong> current for each dentist, at the new address where required.</li>
</ul>
<p>If you are not sure whether a dentist already has an NPI, or which taxonomy is on file, check the public NPPES registry before applying for anything new. Duplicate or outdated records are easier to fix before carriers see them.</p>
<p>Consistency matters more than speed here. The same legal name, address and TIN should appear in NPPES, on the W-9, on your bank account and on every carrier application.</p>

<h2>Time credentialing to your opening date</h2>
<p>Credentialing with dental PPOs often takes several months, and carriers set their own timelines. If you plan to see PPO patients as in network from opening day, start applications as soon as you have the TIN, Type 2 NPI, address and malpractice coverage in place. Waiting until the office is built usually means the first months are billed out of network.</p>
<p>Our step-by-step guide to the <a href="/blog/dental-ppo-credentialing-process/">dental PPO credentialing process</a> covers the applications in detail, and our credentialing checklist tool helps you gather documents.</p>

<h2>What changes when you buy a practice</h2>
<p>An acquisition looks simpler because patients and contracts already exist, but the billing side has traps:</p>
<ul>
<li><strong>New owner, new TIN.</strong> If the purchase creates a new entity, many carriers treat it as a new provider and require new contracts or a change of ownership process. Check each contract instead of assuming you can keep billing under the seller's TIN.</li>
<li><strong>Who owns the old A/R.</strong> The purchase agreement should say whether claims for services before the closing date belong to the seller or the buyer, and how payments that arrive after closing are handled.</li>
<li><strong>Bank and EFT changes.</strong> Update EFT and ERA enrollment with each carrier so payments go to the new owner's account from the right date.</li>
<li><strong>Software and data.</strong> Confirm you have rights to the patient records and the practice software license, and that historical ledgers and insurance information carry over cleanly.</li>
<li><strong>Existing fee schedules.</strong> Review the seller's office fees and PPO contracts before deciding which to keep.</li>
</ul>

<h2>Set your office fee schedule</h2>
<p>Your office fee schedule (sometimes called UCR) is what you charge before any PPO contract adjustment. Set it deliberately, not by copying a template. Many offices review fees by area and then load the office schedule plus one contracted schedule per PPO in the practice software. Read our guide to <a href="/blog/dental-ppo-fee-schedule-negotiation/">PPO fee schedule review</a> before you sign new contracts.</p>

<h2>Configure practice software and the clearinghouse</h2>
<p>Your practice management software drives every claim, payment and statement. Whether you choose Open Dental, Dentrix, Eaglesoft or another system, the billing setup should include:</p>
<ol>
<li>Provider records with each dentist's NPI, license number and the correct billing and rendering settings.</li>
<li>The practice's TIN, Type 2 NPI and billing address on the claim settings.</li>
<li>Carrier records with payer IDs, claim mailing addresses and the right fee schedule attached to each plan.</li>
<li>Procedure code setup with your office fees, using current CDT codes.</li>
<li>Adjustment and payment types that separate contractual write-offs from other adjustments, so reports stay meaningful.</li>
<li>A clearinghouse connection for electronic claims (the dental 837), attachments, eligibility and ERAs.</li>
<li>ERA and EFT enrollment with each carrier, tied to the new bank account.</li>
</ol>
<p>Our guides to <a href="/blog/dental-billing-software/">dental billing software</a> and dental practice management software compare options. Run a few test claims through the clearinghouse before opening and confirm they are accepted, so setup errors surface before real patients are waiting on payment. Third-party costs such as clearinghouse and software subscriptions remain the practice's expense whether billing is in house or outsourced.</p>

<h2>Write your billing policies before opening</h2>
<p>Policies set expectations for patients and give the team clear rules. At minimum, decide:</p>
<ul>
<li>When insurance is verified (for example, a few business days before each visit) and what the front desk records.</li>
<li>How patient portions are estimated and collected at the time of service.</li>
<li>Whether you accept assignment of benefits for out-of-network plans.</li>
<li>Payment options, payment plans and when statements go out.</li>
<li>How refunds and credit balances are handled.</li>
</ul>
<p>Put these in a written office financial policy that patients sign, and train every front desk team member on it before the first patient arrives. A policy that only the owner understands will not be applied consistently.</p>
<p>For an acquired practice, compare the seller's existing policy with yours before changing anything. Patients who have followed the same rules for years need clear notice of new ones, such as collecting estimated patient portions at the visit instead of billing afterward.</p>

<h2>A day-one billing checklist</h2>
<ul>
<li>TIN, Type 1 and Type 2 NPIs, W-9 and licenses match across every record.</li>
<li>Credentialing submitted for every planned PPO, with effective dates tracked.</li>
<li>Office fee schedule and each PPO fee schedule loaded in the software.</li>
<li>Clearinghouse connected and a test claim accepted.</li>
<li>ERA and EFT enrollment confirmed with each carrier.</li>
<li>Verification workflow and financial policy in place.</li>
<li>A Business Associate Agreement signed with any outside billing vendor before it accesses patient data.</li>
<li>A month-end routine for reconciling deposits with posted payments.</li>
<li>A named person responsible for checking rejected claims in the clearinghouse every business day.</li>
<li>A simple log of open credentialing applications, reviewed weekly until every network is active.</li>
</ul>

<h2>How Texas Solutions RCM can help</h2>
<p>We work inside Open Dental, Dentrix and Eaglesoft for practices in every state. For a new or acquired office, <a href="/services/dental-credentialing/">Dental Credentialing &amp; Provider Enrollment</a> covers network applications and EFT/ERA enrollment assistance and is quoted separately. Once you are seeing patients, our monthly service includes Insurance Verification &amp; Eligibility, Dental Claims Management and Payment Posting, among others. There is no setup fee; see <a href="/pricing/">pricing</a> or <a href="/consultation/">book a free consultation</a>.</p>
`,
    faqs: [
      {
        q: 'When should a new dental practice start credentialing?',
        a: 'Start as soon as you have the tax ID, organizational NPI, practice address and malpractice coverage. Credentialing often takes several months, so starting late usually means billing out of network after opening.',
      },
      {
        q: 'Can I bill under the seller\'s contracts after buying a dental practice?',
        a: 'Often not, if the purchase creates a new entity with a new tax ID. Check each carrier contract and its change of ownership process before assuming the existing contracts carry over.',
      },
      {
        q: 'Does a dental practice need a Type 2 NPI?',
        a: 'A practice that bills as a group entity generally needs an organizational (Type 2) NPI in addition to each dentist\'s individual NPI. A solo dentist billing under their own name may not, so check how you will bill and what each carrier requires.',
      },
      {
        q: 'Is there a setup fee to outsource billing for a new practice?',
        a: 'No, Texas Solutions RCM does not charge a setup fee. Credentialing and cleanup of older A/R are quoted separately, and clearinghouse and software subscriptions stay with the practice.',
      },
    ],
    sources: [S.nppes, S.adaCredChecklist, S.ecfrClaims, S.hhsBa],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'dental-billing-for-dsos',
    title: 'Dental Billing for DSOs and Multi-Location Groups',
    seoTitle: 'Dental Billing for DSOs and Multi-Location Groups',
    metaDescription:
      'How DSOs and multi-location dental groups run the revenue cycle: standard workflows, centralized vs local billing tasks, reporting by location and data access.',
    excerpt:
      'How dental groups and DSOs organize billing across offices: what to standardize, which work to centralize, what stays local and how to report by location.',
    category: 'Practice Management',
    tags: ['DSO billing', 'multi-location dental', 'dental group practices', 'revenue cycle'],
    readingMinutes: 6,
    publishedAt: '2026-10-22',
    html: `
<p>Billing for one dental office is a set of daily habits. Billing for five, twenty or a hundred offices is a system, and small inconsistencies between locations turn into real money and lost visibility. This guide covers how dental groups and dental service organizations (DSOs) structure the revenue cycle: what to standardize, which tasks to centralize, what should stay at the front desk and how to report by location.</p>

<h2>Why multi-location billing is different</h2>
<p>Each office in a group may have different dentists, different payer mixes, different PPO contracts and sometimes different practice software, especially after acquisitions. Without shared rules, every office develops its own way of verifying insurance, posting payments and working A/R. The result is reporting that cannot be compared, write-offs coded in different ways and problems that only surface at month end.</p>
<p>The goal is not to make every office identical. It is to make the revenue cycle work the same way everywhere, so leadership can compare locations fairly and fix problems early.</p>

<h2>What to standardize across locations</h2>
<ul>
<li><strong>Adjustment and payment types.</strong> One list across the group, so a PPO contractual write-off means the same thing in every office.</li>
<li><strong>Office fee schedules,</strong> where markets allow, and a clear record of which PPO fee schedule applies at which location.</li>
<li><strong>Verification workflow:</strong> when it is done, what fields are recorded and how frequency limits and remaining maximums are noted.</li>
<li><strong>Claim rules:</strong> which procedures need attachments, who writes narratives and how quickly claims go out after the visit.</li>
<li><strong>A/R follow-up rules</strong> by aging bucket, and who owns each bucket.</li>
<li><strong>Patient financial policy,</strong> including estimates, payment plans, statements and refunds.</li>
<li><strong>Month-end close steps,</strong> so every office reconciles deposits with posted payments the same way.</li>
</ul>
<p>Write each standard down as a short procedure and train new offices on it during integration.</p>

<h2>Centralized vs local: who does what</h2>
<p>Most groups end up with a hybrid. Work that needs patient contact stays in the office; work that benefits from volume and specialization moves to a central team or an outside partner.</p>
<table>
<thead><tr><th>Task</th><th>Usually local</th><th>Usually central</th></tr></thead>
<tbody>
<tr><td>Collecting insurance details at check-in</td><td>Yes</td><td></td></tr>
<tr><td>Insurance verification before visits</td><td>Sometimes</td><td>Often</td></tr>
<tr><td>Presenting treatment estimates</td><td>Yes</td><td></td></tr>
<tr><td>Claim creation and submission</td><td></td><td>Yes</td></tr>
<tr><td>ERA and EOB payment posting</td><td></td><td>Yes</td></tr>
<tr><td>Denial work and appeals</td><td></td><td>Yes</td></tr>
<tr><td>Insurance A/R follow-up</td><td></td><td>Yes</td></tr>
<tr><td>Collecting patient payments at the visit</td><td>Yes</td><td></td></tr>
<tr><td>Credentialing and network enrollment</td><td></td><td>Yes</td></tr>
<tr><td>Reporting and analysis</td><td></td><td>Yes</td></tr>
</tbody>
</table>
<p>Where verification lands depends on volume and timing. A central team can verify the next several days of appointments in batches, while the office handles same-day additions and walk-ins. Either way, the results should be recorded in the same fields in the practice software, so the person presenting the estimate sees the same information no matter who did the check.</p>
<p>Centralizing works best when the central team has clear handoffs with each office: who sends missing x-rays, who calls a patient about a balance and who decides on a write-off above a set amount.</p>

<h2>Reporting by location</h2>
<p>Group leadership needs the same report, built the same way, for every office. A monthly location report usually includes:</p>
<ul>
<li>Gross production, adjustments and net production.</li>
<li>Insurance and patient collections.</li>
<li>Net collection rate.</li>
<li>Insurance A/R by aging bucket and by carrier.</li>
<li>Denials by reason and by carrier.</li>
<li>Days in A/R.</li>
<li>Credit balances and refunds pending.</li>
</ul>
<p>Show each measure next to the group average and the office's own prior months. A single month can mislead; trends over a quarter tell you more.</p>
<p>Use consistent definitions. Industry KPI sets such as HFMA's MAP Keys show the value of agreeing on how each measure is calculated before comparing sites. Our guide to <a href="/blog/dental-practice-kpis/">dental practice KPIs</a> explains the measures most useful for dental offices.</p>
<h3>A worked example (hypothetical numbers)</h3>
<p>Two hypothetical offices each post $90,000 in insurance collections in a month. Office A has 12% of insurance A/R over 90 days; Office B has 30%. Looking only at collections, the offices look the same. The aging report shows Office B has a follow-up problem, perhaps claims sent without attachments or a carrier that needs a portal update. Location-level reporting turns that into a specific task instead of a vague worry.</p>

<h2>Bringing a newly acquired office into the group</h2>
<p>Each acquisition is a chance to apply the group's standards, and also a risk of importing old habits. A short integration plan for billing helps:</p>
<ol>
<li><strong>Snapshot the starting point.</strong> Pull the office's aging report, credit balances, unapplied payments and open claims as of the closing date, so pre-acquisition A/R is tracked separately.</li>
<li><strong>Confirm ownership of old A/R.</strong> The purchase agreement should say who collects claims for dates of service before closing, and how payments that arrive later are split.</li>
<li><strong>Review contracts and credentialing.</strong> List every network the office's dentists participate in, under which tax ID, and what must change for the new owner.</li>
<li><strong>Map the software setup.</strong> Compare the office's adjustment types, fee schedules and carrier records with the group standard, and plan the changes.</li>
<li><strong>Train the front desk</strong> on group verification, estimate and collection procedures, and explain which tasks now move to the central team.</li>
<li><strong>Watch the first 90 days closely.</strong> Review claim rejections, denials and posting accuracy for the new office each week until they settle.</li>
</ol>
<p>Older A/R inherited in an acquisition is often best handled as a separate cleanup project, so it does not distract the team from current claims.</p>

<h2>Credentialing across many offices</h2>
<p>Groups add dentists and locations often, and every change touches credentialing. Keep a central roster of every dentist, every location and every network, with effective dates and re-credentialing dates. When a dentist moves between offices, confirm the carrier has the right location linked before claims go out. Our guide to the <a href="/blog/dental-ppo-credentialing-process/">dental PPO credentialing process</a> covers the steps.</p>

<h2>Software and data access</h2>
<p>Groups often run more than one practice system during integration. A central billing team needs secure, role-based access to each one, with logins tied to individuals rather than shared accounts. Keep a current list of who has access to which office's system, and review it at least quarterly. Follow the HIPAA minimum necessary principle: each person gets access to the data their role requires. Any outside billing partner should sign a Business Associate Agreement before it touches patient data, and access should be removed promptly when people change roles.</p>

<h2>How Texas Solutions RCM can help</h2>
<p>We support <a href="/specialties/dental-group-practices/">dental group practices</a> and DSOs by working inside each office's Open Dental, Dentrix or Eaglesoft system. Our services include <a href="/services/dental-claims-processing/">Dental Claims Management</a>, Payment Posting, Accounts Receivable (A/R) Management and <a href="/services/rcm-analytics-reporting/">Dental RCM Reporting &amp; Revenue Analysis</a> by location. Multi-location groups and DSOs receive a custom quote, because the work is organized differently from a single office. <a href="/consultation/">Book a free consultation</a> so we can scope it.</p>
`,
    faqs: [
      {
        q: 'Should a DSO centralize dental billing?',
        a: 'Most DSOs centralize claims, payment posting, denials, A/R follow-up and reporting while keeping patient-facing tasks in each office. The right split depends on your software, staffing and how many offices you run.',
      },
      {
        q: 'What should be standardized across dental offices in a group?',
        a: 'Standardize adjustment and payment types, verification steps, claim rules, A/R follow-up, the patient financial policy and month-end close. Shared definitions make location reports comparable.',
      },
      {
        q: 'How is pricing set for DSOs and multi-location groups?',
        a: 'Multi-location groups and DSOs receive a custom quote. The written proposal confirms scope after a free consultation.',
      },
      {
        q: 'Can one billing team work across different practice software?',
        a: 'Yes, as long as the team has secure access to each system and follows the same procedures in all of them. Texas Solutions RCM works in Open Dental, Dentrix and Eaglesoft.',
      },
    ],
    sources: [S.hfmaMapKeys, S.hhsMinNecessary, S.hhsBa],
  },
];
