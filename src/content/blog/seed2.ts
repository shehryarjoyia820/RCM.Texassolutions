/**
 * Blog batch 2 for rcm.texassolutions.co (keyword plan, docs/KEYWORDS.md).
 * Rules: docs/CONTENT-GUIDE.md. Internal links must use slugs from src/content/slugs.ts.
 */
import type { SeedPost } from './seed';

const SRC = {
  aapcBilling: { label: 'AAPC: What Is Medical Billing?', url: 'https://www.aapc.com/resources/what-is-medical-billing' },
  aapcRcm: { label: 'AAPC: What Is Revenue Cycle Management (RCM)?', url: 'https://www.aapc.com/resources/what-is-revenue-cycle-management' },
  hfmaMapKeys: { label: 'HFMA: MAP Keys, industry-standard revenue cycle KPIs', url: 'https://www.hfma.org/data-and-insights/map-initiative/map-keys/' },
  mgmaDataDive: { label: 'MGMA DataDive', url: 'https://www.mgma.com/datadive' },
  cmsTransactions: { label: 'CMS: HIPAA Transactions Overview', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/transactions' },
  cmsOperatingRules: { label: 'CMS: Operating Rules for HIPAA Transactions', url: 'https://www.cms.gov/priorities/key-initiatives/burden-reduction/administrative-simplification/operating-rules' },
  cmsEdi: { label: 'CMS: Electronic Billing and EDI Transactions', url: 'https://www.cms.gov/medicare/coding-billing/electronic-billing' },
  cmsNcci: { label: 'CMS: National Correct Coding Initiative (NCCI) Edits', url: 'https://www.cms.gov/medicare/coding-billing/national-correct-coding-initiative-ncci-edits' },
  cmsClaimsManualCh1: { label: 'CMS: Medicare Claims Processing Manual, Chapter 1 (General Billing Requirements)', url: 'https://www.cms.gov/regulations-and-guidance/guidance/manuals/downloads/clm104c01.pdf' },
  x12Status: { label: 'X12: Claim Status Category Codes', url: 'https://x12.org/codes/claim-status-category-codes' },
  x12Carc: { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  adaCdt: { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
  adaClaimForm: { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  adaInsurance: { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  amaCpt: { label: 'AMA: CPT (Current Procedural Terminology)', url: 'https://www.ama-assn.org/practice-management/cpt' },
  amaAiPrinciples: { label: 'AMA: Principles for Augmented Intelligence Development, Deployment, and Use', url: 'https://www.ama-assn.org/system/files/ama-ai-principles.pdf' },
  amaAiProsCons: { label: 'AMA: Augmented intelligence, pros and cons of AI in health care', url: 'https://www.ama-assn.org/practice-management/digital-health/augmented-intelligence-pros-and-cons-ai-health-care-and-clinical' },
  amaPa: { label: 'AMA: Prior Authorization', url: 'https://www.ama-assn.org/practice-management/prior-authorization' },
  cms0057: { label: 'CMS: Interoperability and Prior Authorization Final Rule (CMS-0057-F)', url: 'https://www.cms.gov/initiatives/burden-reduction/overview/interoperability/policies-regulations/cms-interoperability-prior-authorization-final-rule-cms-0057-f' },
  cms0057Fact: { label: 'CMS Fact Sheet: Interoperability and Prior Authorization Final Rule (CMS-0057-F)', url: 'https://www.cms.gov/newsroom/fact-sheets/cms-interoperability-and-prior-authorization-final-rule-cms-0057-f' },
  cmsWiser: { label: 'CMS Innovation Center: WISeR (Wasteful and Inappropriate Service Reduction) Model', url: 'https://www.cms.gov/priorities/innovation/innovation-models/wiser' },
  cmsTelehealth: { label: 'CMS: Medicare Telehealth', url: 'https://www.cms.gov/medicare/coverage/telehealth' },
  cmsTelehealthFaq: { label: 'CMS: Telehealth FAQ (updated October 2026)', url: 'https://www.cms.gov/files/document/telehealth-faq-updated-10-09-2026.pdf' },
  cmsPos: { label: 'CMS: Place of Service Code Set', url: 'https://www.cms.gov/medicare/coding-billing/place-of-service-codes/code-sets' },
  cmsPfs: { label: 'CMS: Physician Fee Schedule', url: 'https://www.cms.gov/medicare/payment/fee-schedules/physician' },
  cmsNsa: { label: 'CMS: No Surprises Act', url: 'https://www.cms.gov/nosurprises' },
  cmsNsaRules: { label: 'CMS: No Surprises Act rules and fact sheets', url: 'https://www.cms.gov/nosurprises/policies-and-resources/overview-of-rules-fact-sheets' },
  cmsGfe: { label: 'CMS: Good Faith Estimate guide for patients', url: 'https://www.cms.gov/medical-bill-rights/help/guides/good-faith-estimate' },
  cmsPpdr: { label: 'CMS: Dispute a medical bill (patient-provider dispute resolution)', url: 'https://www.cms.gov/medical-bill-rights/help/dispute-a-bill' },
  ecfr149610: { label: 'eCFR: 45 CFR 149.610, Good faith estimates for uninsured (or self-pay) individuals', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-B/part-149/subpart-G/section-149.610' },
  fccConsent2024: { label: 'FCC: 2024 Report and Order on TCPA consent revocation (FCC 24-24)', url: 'https://docs.fcc.gov/public/attachments/FCC-24-24A1.pdf' },
  fccRobocalls: { label: 'FCC: Stop Unwanted Robocalls and Texts', url: 'https://www.fcc.gov/consumers/guides/stop-unwanted-robocalls-and-texts' },
  hhsSecurity: { label: 'HHS: The HIPAA Security Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/security/index.html' },
  hhsBaa: { label: 'HHS: Sample Business Associate Agreement Provisions', url: 'https://www.hhs.gov/hipaa/for-professionals/covered-entities/sample-business-associate-agreement-provisions/index.html' },
  hhsBaLiability: { label: 'HHS: Direct Liability of Business Associates', url: 'https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/business-associates/factsheet/index.html' },
  hhsBreach: { label: 'HHS: Breach Notification Rule', url: 'https://www.hhs.gov/hipaa/for-professionals/breach-notification/index.html' },
  ecfr164504: { label: 'eCFR: 45 CFR 164.504, Uses and disclosures: organizational requirements', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-E/section-164.504' },
  ecfr164410: { label: 'eCFR: 45 CFR 164.410, Notification by a business associate', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-164/subpart-D/section-164.410' },
  fedRegSecurityNprm: { label: 'Federal Register: HIPAA Security Rule To Strengthen the Cybersecurity of Electronic Protected Health Information (proposed rule, January 6, 2025)', url: 'https://www.federalregister.gov/documents/2025/01/06/2024-30983/hipaa-security-rule-to-strengthen-the-cybersecurity-of-electronic-protected-health-information' },
  onc_sra: { label: 'HealthIT.gov: Security Risk Assessment Tool', url: 'https://www.healthit.gov/topic/privacy-security-and-hipaa/security-risk-assessment-tool' },
};

export const seedPosts2: SeedPost[] = [
  // 1 ------------------------------------------------------------------
  {
    slug: 'how-much-do-medical-billing-services-cost',
    title: 'How Much Do Medical Billing Services Cost? Pricing Models Explained',
    seoTitle: 'How Much Do Medical Billing Services Cost? Pricing Guide',
    metaDescription:
      'How medical billing company pricing works: percent of collections, cost per claim, flat monthly and hourly models, and how to compare with in-house cost.',
    excerpt:
      'A plain guide to medical billing company pricing: the four common pricing models, what pushes cost up or down, what is often billed as extra, and how to compare an outside quote with the true cost of billing in house.',
    category: 'Medical Billing',
    tags: ['medical billing company pricing', 'medical billing cost', 'cost per claim', 'outsourcing', 'practice finances'],
    readingMinutes: 7,
    publishedAt: '2026-10-11',
    html: `
<p><strong>Medical billing services cost different amounts for different practices because the price depends on the pricing model and the scope of work.</strong> Most companies charge a percentage of collections, a fee per claim, a flat monthly fee, or an hourly or dedicated-staff rate. The useful comparison is not the headline number but the total cost to collect each dollar, set against what billing costs you in house today.</p>

<p>Because quotes are built on different bases, two proposals that look far apart can cost about the same once you account for what each one includes. This guide explains the common models, what drives price, the extras that often appear later, and a simple way to compare an outside quote with your current costs. We do not list market price ranges here, because published figures vary widely and are rarely tied to a defined scope of work.</p>

<h2>What pricing models do medical billing companies use?</h2>
<p>Almost every proposal you receive will fall into one of four models, or a mix of them.</p>

<h3>Percentage of collections</h3>
<p>The company keeps an agreed percentage of the money it collects on your behalf. This is the most common model for full-service billing because the company's income rises and falls with yours. The details matter more than the percentage itself:</p>
<ul>
<li><strong>What counts as "collections"?</strong> Some contracts include insurance payments only. Others also include patient payments made at the front desk, which your own staff collected.</li>
<li><strong>Is it net or gross?</strong> Ask whether refunds, recoupments and takebacks reduce the base.</li>
<li><strong>Is there a monthly minimum?</strong> Small or new practices often see a minimum fee that applies when collections are low.</li>
<li><strong>Does old AR carry a different rate?</strong> Work on claims that were already aging before the contract often costs more.</li>
</ul>

<h3>Cost per claim</h3>
<p>You pay a fixed fee for each claim submitted. This is easy to budget and easy to compare across vendors, which is why "cost per claim" is a common search when practices start shopping. Ask what a "claim" means in the contract. Some companies charge again for every corrected claim or resubmission, and some per-claim pricing covers submission only, not follow-up on denials and unpaid balances. If follow-up is not included, the low per-claim fee may leave the hardest work with your staff.</p>

<h3>Flat monthly fee</h3>
<p>A fixed monthly price for a defined scope, often tiered by provider count or claim volume. It works well for practices with steady volume and a clear list of tasks. Watch for volume caps and for how the fee changes if you add a provider or location.</p>

<h3>Hourly or dedicated staff (FTE) pricing</h3>
<p>You pay for time, either by the hour or for a full-time equivalent team member assigned to your practice. This suits practices that want extra hands inside their own systems for specific tasks such as eligibility checks, charge entry or AR follow-up while keeping overall control of billing. It also suits short projects such as clearing a backlog. The tradeoff is that you manage priorities and output more directly.</p>

<table>
<thead><tr><th>Model</th><th>Works best when</th><th>Ask about</th></tr></thead>
<tbody>
<tr><td>Percentage of collections</td><td>You want full-cycle billing and shared incentive to collect</td><td>Collection base, minimums, old AR rates</td></tr>
<tr><td>Per claim</td><td>Volume is predictable and you need simple budgeting</td><td>Resubmission charges, whether follow-up is included</td></tr>
<tr><td>Flat monthly</td><td>Scope is stable and well defined</td><td>Volume caps, price changes when you grow</td></tr>
<tr><td>Hourly or FTE</td><td>You want staff support inside your own workflow</td><td>Productivity reporting, coverage during time off</td></tr>
</tbody>
</table>

<h2>What drives the cost of medical billing services?</h2>
<p>Whatever the model, a company prices the work it expects your account to require. The main drivers are:</p>
<ul>
<li><strong>Specialty and claim complexity.</strong> Surgical specialties, anesthesia, behavioral health and multi-modifier claims usually take more work per claim than routine office visits.</li>
<li><strong>Claim volume.</strong> Higher volume can lower the per-unit price, but very low volume can trigger minimums.</li>
<li><strong>Payer mix.</strong> Medicaid managed care plans, workers' compensation and out-of-network claims often need more follow-up than a single dominant commercial payer.</li>
<li><strong>Scope.</strong> Coding, credentialing, prior authorization, patient statements and patient phone support may be included, priced separately or excluded.</li>
<li><strong>Starting condition.</strong> A large backlog, missing data or an incomplete charge history adds onboarding work.</li>
<li><strong>Front-end quality.</strong> Clean registration and eligibility data reduce denials, which reduces rework for everyone.</li>
<li><strong>Software.</strong> Whether the company works inside your existing practice management system or requires you to move to its platform affects both price and switching cost.</li>
</ul>

<h2>What is often billed as an extra?</h2>
<p>Read the fee schedule for line items beyond the main rate. Common ones include setup or onboarding fees, clean-up of aged accounts receivable, payer enrollment and credentialing, patient statement printing and postage, clearinghouse fees, software licenses, coding audits, custom reports, and fees to export your data if you leave. None of these are unusual on their own. The problem is discovering them after you have signed.</p>

<h2>How do you compare an outsourced quote with in-house billing cost?</h2>
<p>An outside quote is only meaningful next to an honest picture of what billing costs you now. Many practices count only the biller's salary and miss most of the real cost. Add up:</p>
<ol>
<li><strong>People.</strong> Wages for everyone who touches billing, including part of the office manager's time, plus payroll taxes, benefits and paid time off.</li>
<li><strong>Coverage.</strong> What happens when the biller is on vacation, sick or leaves. Turnover means recruiting, training and a stretch where claims slow down.</li>
<li><strong>Tools.</strong> Practice management software modules, clearinghouse fees, coding references, statement services and phone systems.</li>
<li><strong>Training and compliance.</strong> Annual code set updates, payer policy changes and continuing education.</li>
<li><strong>Space and equipment.</strong> Workstations, hardware and IT support.</li>
<li><strong>Revenue that is not collected.</strong> Unworked denials and claims that pass filing limits are a real cost, even though they never show up as an expense line.</li>
</ol>
<p>Divide your total annual billing cost by the number of claims you submit to get a cost per claim, or by total collections to get a cost to collect. Our <a href="/tools/medical-billing-cost-calculator/">medical billing cost calculator</a> and <a href="/tools/cost-per-claim-calculator/">cost per claim calculator</a> can help you run both numbers. For a broader look at the tradeoffs beyond cost, see our page on <a href="/outsourcing-vs-in-house-billing/">in-house vs outsourced medical billing</a>.</p>

<h2>Is the cheapest quote the lowest cost?</h2>
<p>Not always. A low rate that leaves denials unworked, or that charges for every resubmission, can cost more in the end than a higher rate with thorough follow-up. When you compare proposals, line them up on the same scope: who verifies eligibility, who codes, who works denials, who follows up on unpaid claims at 30, 60 and 90 days, who answers patient billing questions, and what reports you receive each month. Then compare price.</p>
<p>It also helps to think about incentives. Under a percentage model, the company earns more when you collect more. Under per-claim or hourly models, make sure the contract spells out the follow-up you expect, since the pricing itself does not reward it.</p>

<h2>What should you ask before you sign a billing contract?</h2>
<ul>
<li>Exactly which payments count toward the fee, and how refunds are treated?</li>
<li>Are there minimums, setup fees or charges for old AR?</li>
<li>Which tasks are included, and which are priced separately?</li>
<li>Who owns the data and the payer portal logins, and how is data returned if the contract ends?</li>
<li>What is the notice period to end the contract, and are there early termination fees?</li>
<li>What reports will you receive, and how often?</li>
<li>Will the company sign a Business Associate Agreement before accessing patient information?</li>
</ul>
<p>For a fuller checklist, read our guide on <a href="/blog/how-to-choose-a-medical-billing-company/">how to choose a medical billing company</a>, or see how our <a href="/services/medical-billing/">medical billing services</a> are scoped.</p>

<h2>Want a quote built on your actual scope?</h2>
<p>Pricing only makes sense once the work is defined. If you would like to compare your current billing costs with an outside option, <a href="/consultation/">book a free consultation</a>. We will ask about your claim volume, specialty, payer mix and current workload, then explain which pricing model fits and what would be included, so you can compare proposals on equal terms.</p>
`,
    faqs: [
      {
        q: 'What is the most common pricing model for medical billing companies?',
        a: 'A percentage of collections is the most common model for full-service medical billing. Per-claim, flat monthly and hourly or dedicated-staff pricing are also widely used, especially for narrower scopes of work.',
      },
      {
        q: 'Is per-claim pricing cheaper than a percentage of collections?',
        a: 'It depends on what each price includes. Per-claim pricing can look lower but may exclude denial follow-up or charge again for resubmissions, so compare both on the same scope of work before deciding.',
      },
      {
        q: 'How do I calculate my in-house cost per claim?',
        a: 'Add up all annual billing costs, including wages, taxes, benefits, software, clearinghouse fees, statements and training, then divide by the number of claims submitted in the same year. Including the value of uncollected denials gives a more realistic picture.',
      },
      {
        q: 'Do medical billing companies charge setup fees?',
        a: 'Some do and some do not. Setup, onboarding, old AR clean-up and credentialing are common separate line items, so ask for a complete fee schedule before signing.',
      },
    ],
    sources: [SRC.aapcBilling, SRC.hfmaMapKeys, SRC.mgmaDataDive, SRC.cmsTransactions],
  },

  // 2 ------------------------------------------------------------------
  {
    slug: 'how-to-choose-a-medical-billing-company',
    title: 'How to Choose a Medical Billing Company: Criteria and Questions to Ask',
    seoTitle: 'How to Choose a Medical Billing Company (Checklist)',
    metaDescription:
      'Looking for the best medical billing company? Use these criteria and questions to compare medical billing and revenue cycle management companies.',
    excerpt:
      'Rankings of the "best medical billing companies" rarely fit your practice. Here are the criteria that matter, the questions to ask, and the red flags to watch for when you compare billing and RCM partners.',
    category: 'Revenue Cycle Management',
    tags: ['best medical billing companies', 'top RCM companies', 'choosing a billing company', 'outsourcing', 'revenue cycle management'],
    readingMinutes: 7,
    publishedAt: '2026-10-11',
    html: `
<p><strong>To choose a medical billing company, define the work you need, then compare candidates on specialty fit, the systems they work in, how they handle denials and follow-up, how they report results, how they protect patient data, and how clear their contract is.</strong> The best medical billing company for your practice is the one whose process fits your workflow, not the one at the top of a generic list.</p>

<p>Searches for the "best medical billing companies" or "top revenue cycle management companies" return many ranked lists. Those lists can be a starting point, but they rarely explain the criteria behind the ranking, and they cannot know your specialty, payer mix or software. This guide gives you a way to evaluate any billing or RCM partner on your own terms.</p>

<h2>What should you decide before you contact any billing company?</h2>
<p>Start by writing down what you actually need. A clear scope makes proposals comparable and keeps you from paying for work you do not want.</p>
<ul>
<li><strong>Which stages do you want covered?</strong> Claims and follow-up only, or the full cycle from eligibility through patient balances? Our overview of <a href="/services/revenue-cycle-management/">revenue cycle management services</a> lists the stages so you can mark which ones you keep.</li>
<li><strong>Who will code?</strong> Your providers, an in-house coder, or the billing company.</li>
<li><strong>What is your current state?</strong> Note your claim volume, specialties, main payers, software, and how much AR is past 90 days.</li>
<li><strong>What problems do you want solved?</strong> Slow payments, repeat denials, staff turnover, a backlog, or simply lack of visibility.</li>
</ul>

<h2>What criteria matter most when comparing billing companies?</h2>

<h3>Specialty and payer knowledge</h3>
<p>Billing rules differ sharply between, for example, behavioral health, orthopedics and urgent care. Ask how the company keeps up with specialty rules, modifier use and payer policies for the payers you see most. Ask who on the team would handle your account and what their background is.</p>

<h3>Systems and access</h3>
<p>Find out whether the company works inside your existing practice management system, EHR and clearinghouse, or requires you to move to its software. Working in your systems usually means less disruption and keeps your data where you can see it. Moving platforms can make sense, but it is a bigger decision with its own costs.</p>

<h3>Front-end support</h3>
<p>Many denials start at registration and eligibility. Ask whether the company verifies coverage, checks prior authorization requirements, or reviews front-desk data, and how it feeds front-end errors back to your staff.</p>

<h3>Denial management and AR follow-up</h3>
<p>This is where billing partners differ most. Ask how denials are triaged, how quickly they are worked, how appeals are written, and how unpaid claims with no response are followed up. Ask how they track root causes so the same denial does not keep repeating.</p>

<h3>Reporting and transparency</h3>
<p>You should be able to see performance without asking. Ask for a sample monthly report. At a minimum, it should show charges, payments, adjustments, net collection rate, days in AR, AR aging by bucket, denial rate and top denial reasons. Our article on <a href="/blog/medical-billing-kpis/">medical billing KPIs</a> explains what each measure tells you, and our <a href="/tools/rcm-performance-scorecard/">RCM performance scorecard</a> can help you set a baseline before you switch.</p>

<h3>Communication</h3>
<p>Ask who your day-to-day contact is, how questions are answered, how often you will meet, and how issues that need your input, such as documentation questions for providers, are routed.</p>

<h3>Security and privacy</h3>
<p>A billing company that handles patient information is a business associate under HIPAA. It should sign a Business Associate Agreement before it accesses any patient data, and it should be able to explain its safeguards in plain terms. Our guide to <a href="/blog/hipaa-and-outsourced-medical-billing/">HIPAA and outsourced medical billing</a> lists the questions to ask.</p>

<h3>Contract and pricing clarity</h3>
<p>Look for a fee schedule that spells out the collection base, minimums, extra fees, notice periods, and how your data is returned if you leave. See <a href="/blog/how-much-do-medical-billing-services-cost/">how much medical billing services cost</a> for a breakdown of pricing models.</p>

<h2>What questions should you ask a medical billing company?</h2>
<ol>
<li>Which parts of the revenue cycle will you handle, and which stay with us?</li>
<li>Will you work in our current software and clearinghouse?</li>
<li>Who will work on our account, and how are they trained on our specialty?</li>
<li>How do you handle denials, from first review to appeal?</li>
<li>How do you follow up on claims with no payer response?</li>
<li>What will we see in your monthly report, and can we see a sample?</li>
<li>How do you handle patient billing questions?</li>
<li>What happens during onboarding, and what do you need from us?</li>
<li>Will you sign a Business Associate Agreement, and what safeguards do you use?</li>
<li>How do we end the contract, and how do we get our data back?</li>
</ol>

<h2>What red flags should make you cautious?</h2>
<ul>
<li><strong>Promised results.</strong> No honest company can guarantee a specific increase in collections before reviewing your data. Payer behavior, documentation and patient mix all affect outcomes.</li>
<li><strong>Vague pricing.</strong> If you cannot tell what the fee is based on or what is excluded, expect surprises.</li>
<li><strong>No reporting sample.</strong> A company that cannot show what it reports may not be tracking much.</li>
<li><strong>Loss of data access.</strong> You should always be able to see your own claims, payments and AR.</li>
<li><strong>Long automatic renewals with heavy exit fees.</strong> These reduce your bargaining power if the relationship is not working.</li>
<li><strong>Reluctance to sign a BAA.</strong> This is a basic requirement, not an optional extra.</li>
</ul>

<h2>Why are "top RCM companies" lists hard to rely on?</h2>
<p>Ranked lists often mix very different businesses: software vendors, large enterprise RCM firms serving hospitals, and small billing teams serving independent practices. A company that is a strong fit for a 300-bed hospital may be a poor fit for a three-provider clinic, and the reverse is also true. Rankings also tend to weigh factors that are easy to measure from the outside, such as size or marketing presence, rather than the quality of denial work or communication.</p>
<p>A better approach is to shortlist two or three companies that serve practices like yours, ask each the same questions, and compare their answers, sample reports and contracts side by side.</p>

<h2>How should you plan the switch?</h2>
<p>Once you choose, agree on a written onboarding plan. It should cover system access, a review of open AR, payer enrollment details for any new pay-to information, who handles claims already in process, and a date when the new team takes full ownership. Keep your previous billing reports so you can compare performance over the first several months.</p>

<h2>What should the first 90 days look like?</h2>
<p>The early months tell you a lot about a new partner. In the first few weeks, expect questions: about payer contracts, provider preferences, documentation habits and how your front desk captures insurance. A team that asks few questions is either very experienced with practices like yours or is not looking closely.</p>
<p>By the second month you should be receiving regular reports and a clear list of open issues, such as claims that need provider input or payers that need enrollment updates. By the third month, look at trends rather than single numbers. Are older claims being resolved? Are denial reasons being grouped and traced back to their causes? Is communication predictable? If the answers are unclear, raise it early, while the onboarding plan is still fresh for both sides.</p>

<h2>Want help scoping what you need?</h2>
<p>If you are comparing billing partners and want a second opinion on your scope, <a href="/consultation/">book a free consultation</a>. We will go through your current workflow, the questions above and your recent reports, and you can use what you learn to evaluate any company, including us.</p>
`,
    faqs: [
      {
        q: 'What is the best medical billing company?',
        a: 'There is no single best medical billing company for every practice. The best fit is a company that knows your specialty and payers, works in your systems, follows up on denials thoroughly, reports clearly and offers a transparent contract.',
      },
      {
        q: 'How many billing companies should I compare?',
        a: 'Two or three is usually enough. Ask each one the same questions and request a sample report and a full fee schedule so you can compare them side by side.',
      },
      {
        q: 'Should a billing company use its own software?',
        a: 'Either approach can work. A company that works inside your existing practice management system usually causes less disruption, while moving to a new platform is a larger decision that should be weighed separately.',
      },
      {
        q: 'Is it a red flag if a billing company guarantees results?',
        a: 'Yes, be cautious. Results depend on documentation, payers and patient mix, so a promise of a specific improvement before the company has reviewed your data is not something it can reliably keep.',
      },
    ],
    sources: [SRC.aapcRcm, SRC.aapcBilling, SRC.hfmaMapKeys, SRC.hhsBaa],
  },

  // 3 ------------------------------------------------------------------
  {
    slug: 'how-to-choose-a-dental-billing-company',
    title: 'How to Choose a Dental Billing Company: What to Look For',
    seoTitle: 'How to Choose a Dental Billing Company: What to Look For',
    metaDescription:
      'How to pick among the best dental billing companies: insurance verification, attachments, AR follow-up, reporting, software fit and clear contracts.',
    excerpt:
      'Dental billing has its own rules: CDT updates, frequency limits, annual maximums, attachments and PPO fee schedules. Here is how to evaluate a dental billing company against the work your office actually does.',
    category: 'Dental Billing',
    tags: ['best dental billing companies', 'dental billing company', 'outsourced dental billing', 'dental practice management'],
    readingMinutes: 7,
    publishedAt: '2026-10-11',
    html: `
<p><strong>Choose a dental billing company by checking how well it handles the parts of dental billing that are different from medical billing: insurance verification and benefit breakdowns, CDT coding, attachments and narratives, frequency and maximum limits, PPO fee schedules, and follow-up on unpaid claims.</strong> Then compare reporting, software fit, communication and contract terms.</p>

<p>Lists of the "best dental billing companies" or "top dental RCM companies" cannot account for your office's procedure mix, plans or practice software. A general practice with heavy PPO volume, an oral surgery office that bills medical plans, and a pediatric office with many Medicaid patients need different strengths. This guide helps you judge any dental billing partner against the work your office actually does.</p>

<h2>Why is dental billing different from medical billing?</h2>
<p>Dental insurance works differently from medical insurance in ways that shape how billing should be done:</p>
<ul>
<li><strong>Annual maximums and frequency limits.</strong> Many plans cap yearly benefits and limit how often certain services are covered, so verification has to go beyond "is the patient active."</li>
<li><strong>Downgrades and alternate benefits.</strong> A plan may pay for a less costly alternative, leaving the patient responsible for the difference.</li>
<li><strong>Attachments.</strong> Radiographs, periodontal charting, photos and narratives are often needed for major services.</li>
<li><strong>Pre-treatment estimates.</strong> Common for larger treatment plans, though they are not a promise of payment.</li>
<li><strong>Code set.</strong> Procedures are reported with CDT codes maintained by the American Dental Association and updated every year.</li>
<li><strong>Medical crossover.</strong> Some procedures, such as certain oral surgery, trauma or sleep apnea appliances, may be billed to medical plans with medical code sets.</li>
</ul>
<p>Our walkthrough of the <a href="/blog/dental-insurance-billing-process/">dental insurance billing process</a> covers each of these steps in more detail.</p>

<h2>What should you look for in a dental billing company?</h2>

<h3>Thorough insurance verification</h3>
<p>Ask what a verification includes. A useful breakdown covers remaining maximum, deductible status, coverage percentages by category, frequency history, waiting periods, missing tooth clauses, and whether the plan uses an alternate benefit for certain services. Ask how far ahead of appointments verification is done and how results reach your front desk. See our <a href="/services/dental-insurance-verification/">dental insurance verification services</a>, which includes a free verification checklist on our tools page.</p>

<h3>Claim preparation and attachments</h3>
<p>Ask how the team decides which attachments and narratives a claim needs, how it handles requests for more information, and how it keeps up with annual CDT changes. Look for a process that catches missing items before submission rather than after a denial.</p>

<h3>Follow-up on unpaid and underpaid claims</h3>
<p>Dental claims that sit without a response are easy to forget. Ask how often outstanding claims are reviewed, how the company checks payments against your PPO fee schedules, and how it handles downgrades it believes are wrong.</p>

<h3>Coordination of benefits and secondary claims</h3>
<p>Families often carry dual dental coverage. Ask how the team determines the primary plan, when secondary claims are sent, and how they are tracked to payment.</p>

<h3>Patient balances</h3>
<p>Ask who sends patient statements, who answers balance questions, and how estimates given at treatment planning are compared to what the plan actually paid.</p>

<h3>Software fit</h3>
<p>Most offices run on a dental practice management system such as Open Dental, Dentrix or Eaglesoft. Ask whether the company works directly in your system and your clearinghouse, how remote access is secured, and how its work is documented in ledgers and claim notes so your team can see it.</p>

<h3>Reporting</h3>
<p>Ask for a sample monthly report. Look for collections, adjustments and write-offs, insurance AR aging, outstanding claims by carrier, denial reasons, and pending pre-treatment estimates.</p>

<h3>Privacy and contracts</h3>
<p>The company should sign a Business Associate Agreement before accessing patient data. The contract should spell out the fee basis, any minimums or setup charges, notice periods and how access ends if you part ways.</p>

<h2>What questions should you ask a dental billing company?</h2>
<ol>
<li>What does your insurance verification include, and when is it done?</li>
<li>Do you work inside our practice management software and clearinghouse?</li>
<li>How do you decide which claims need attachments or narratives?</li>
<li>How often do you follow up on outstanding claims, and how?</li>
<li>How do you check payments against our PPO fee schedules?</li>
<li>Do you handle medical crossover claims, or only dental?</li>
<li>Who answers patient balance questions?</li>
<li>What will our monthly report include?</li>
<li>What do you need from our front desk and clinical team?</li>
<li>How are fees calculated, and what is not included?</li>
</ol>

<h2>How should a billing company handle PPO fee schedules and write-offs?</h2>
<p>Most dental offices participate with at least a few PPO networks, and each one sets its own allowed fees. That makes write-offs a large and easily overlooked part of dental billing. A capable billing partner should load or confirm your current fee schedules in the practice management system, so that estimates and contractual adjustments are calculated correctly from the start.</p>
<p>When a payment arrives, the team should compare it with the expected allowed amount, not just post whatever the plan sends. Payments that fall short of the contracted fee, write-offs that look larger than they should, and procedures paid under the wrong category are all worth a second look. Ask how the company spots these variances and what it does when it finds one. If you are reviewing whether your network participation still makes sense, that is a separate project, but good payment data makes it far easier.</p>

<h2>What should your office keep in house?</h2>
<p>Even with a full-service dental billing company, some tasks work best close to the patient. Your front desk is still the first to collect insurance cards, capture changes in coverage, and present treatment plan estimates. Clinical staff still produce the radiographs, charting and notes that support claims. Decide in advance who does what:</p>
<ul>
<li>Who updates insurance information when a patient changes plans?</li>
<li>Who collects estimated patient portions at the time of service?</li>
<li>Who writes clinical narratives, and who attaches them?</li>
<li>Who approves adjustments and write-offs above a set amount?</li>
</ul>
<p>Putting these answers in writing at the start avoids the most common source of friction between offices and billing teams: work that each side assumed the other was doing.</p>

<h2>What are warning signs in a dental billing proposal?</h2>
<ul>
<li>Promises of a specific increase in collections before reviewing your data.</li>
<li>Verification that only confirms active coverage, with no benefit detail.</li>
<li>No clear owner for patient statements and balance calls.</li>
<li>No sample report, or reports that leave out aging and denial detail.</li>
<li>Contracts with long renewals and unclear exit terms.</li>
</ul>

<h2>Does practice size change what you should look for?</h2>
<p>Yes. A single-dentist office often needs a partner who can cover gaps when one front-desk person is out, and who can take on verification and follow-up without adding staff. Our page on <a href="/services/dental-billing-small-practices/">dental billing for small practices</a> covers that situation. Multi-location groups usually care more about consistent processes across offices, consolidated reporting and clear escalation paths.</p>
<p>If you are still deciding whether to outsource at all, our comparison of <a href="/blog/in-house-vs-outsourced-dental-billing/">in-house vs outsourced dental billing</a> lays out the tradeoffs.</p>

<h2>Want to talk through your dental billing workflow?</h2>
<p>If you are comparing dental billing companies, <a href="/consultation/">book a free consultation</a>. Bring a recent aging report and a few problem claims. We will walk through how <a href="/services/dental-billing/">our dental billing support</a> would handle verification, attachments and follow-up in your software, so you can judge the fit before making a change.</p>
`,
    faqs: [
      {
        q: 'What should a dental billing company handle?',
        a: 'A full-service dental billing company typically handles insurance verification, claim preparation and submission, attachments, payment posting, follow-up on unpaid claims, secondary claims and patient statements. Confirm the exact scope in writing.',
      },
      {
        q: 'Can a dental billing company work in Dentrix or Open Dental?',
        a: 'Many dental billing teams work remotely inside common practice management systems such as Open Dental, Dentrix and Eaglesoft. Ask each company how it accesses your system and documents its work.',
      },
      {
        q: 'Do dental billing companies bill medical insurance too?',
        a: 'Some do. Procedures such as certain oral surgery, trauma care and oral appliances for sleep apnea may be billed to medical plans, so ask whether the company handles medical crossover claims if your office performs them.',
      },
      {
        q: 'What is the biggest difference between good and weak dental billing?',
        a: 'Follow-up is usually the biggest difference. Strong teams verify benefits in detail before visits and consistently chase outstanding and underpaid claims, while weaker ones submit claims and wait.',
      },
    ],
    sources: [SRC.adaCdt, SRC.adaClaimForm, SRC.adaInsurance, SRC.hhsBaa],
  },

  // 4 ------------------------------------------------------------------
  {
    slug: 'in-house-vs-outsourced-dental-billing',
    title: 'In-House vs Outsourced Dental Billing: How to Decide',
    seoTitle: 'In-House vs Outsourced Dental Billing: How to Decide',
    metaDescription:
      'Compare in-house vs outsourced dental billing on cost, control, coverage and expertise, plus hybrid options and signs it may be time to change.',
    excerpt:
      'Should your dental office keep billing in house or outsource it? A side-by-side look at cost, control, staffing risk and expertise, plus hybrid models that split the work.',
    category: 'Dental Billing',
    tags: ['in-house vs outsourced dental billing', 'outsourced dental billing services', 'dental office management', 'dental billing'],
    readingMinutes: 7,
    publishedAt: '2026-10-11',
    html: `
<p><strong>In-house dental billing gives you direct control and a team that knows your patients, while outsourced dental billing gives you broader coverage, specialized follow-up and less exposure to staff turnover.</strong> The right choice depends on your claim volume, how stable your team is, how much aging insurance AR you carry, and whether your front desk has time to do billing well. Many offices end up with a hybrid.</p>

<p>There is no single answer that fits every dental office. A long-tenured billing coordinator who knows every carrier is a real asset. So is a remote team that never takes a vacation all at once. This guide compares both approaches honestly, describes common hybrid setups, and lists signs that your current model may need a change.</p>

<h2>What does in-house dental billing look like?</h2>
<p>In most dental offices, billing lives with the front desk or with one dedicated insurance coordinator. That person verifies benefits, submits claims with attachments, posts payments, sends secondary claims, follows up on unpaid claims, and answers patient balance questions, often while also checking patients in and answering phones.</p>
<p>When the coordinator is experienced and has protected time for billing, this can work very well. The weak points tend to be time and coverage. Insurance follow-up is the task most likely to be pushed aside on a busy day, and when the one person who knows the process is out, claims can stall.</p>

<h2>What does outsourced dental billing look like?</h2>
<p>With outsourced dental billing services, a remote team takes over some or all of the insurance work, usually working directly inside your practice management software. Your front desk still greets patients, collects cards and presents treatment estimates, while the billing team handles verification, claims, posting and follow-up behind the scenes. Scope varies widely, so the details of who does what should be agreed in writing.</p>

<h2>How do in-house and outsourced dental billing compare?</h2>
<table>
<thead><tr><th>Factor</th><th>In-house</th><th>Outsourced</th></tr></thead>
<tbody>
<tr><td>Control</td><td>Direct, day-to-day oversight</td><td>Managed through reports, notes and regular check-ins</td></tr>
<tr><td>Cost structure</td><td>Wages, benefits, training, software and turnover costs</td><td>A service fee based on an agreed pricing model</td></tr>
<tr><td>Coverage</td><td>Depends on one or a few people</td><td>Team-based, less affected by one absence</td></tr>
<tr><td>Expertise</td><td>Deep knowledge of your office, varied payer depth</td><td>Broader exposure to many carriers and claim types</td></tr>
<tr><td>Follow-up</td><td>Competes with front-desk duties</td><td>Usually a dedicated, scheduled task</td></tr>
<tr><td>Patient relationships</td><td>Face-to-face familiarity</td><td>Requires clear handoffs for balance questions</td></tr>
<tr><td>Data access</td><td>Fully in your hands</td><td>Should remain in your software and visible to you</td></tr>
</tbody>
</table>

<h2>How do you compare the cost of each option?</h2>
<p>Comparing cost means looking past the coordinator's hourly wage. A realistic in-house figure includes payroll taxes, benefits, paid time off, training on annual CDT changes, clearinghouse and software fees, and the time an office manager spends supervising billing. It should also reflect what happens during turnover: recruiting, training, and the weeks when claims slow down.</p>
<p>The cost of uncollected revenue belongs in the comparison too. Claims that are never followed up, secondary claims that are never sent, and underpayments that are never questioned are real losses even if no invoice shows them. Our <a href="/tools/dental-billing-cost-calculator/">dental billing cost calculator</a> can help you build an in-house estimate to set against any outside quote.</p>

<h2>When does in-house dental billing make the most sense?</h2>
<ul>
<li>You have an experienced, stable billing coordinator with protected time for insurance work.</li>
<li>Your insurance AR is current, with little money past 90 days.</li>
<li>Your procedure mix and carrier list are fairly simple.</li>
<li>You have backup coverage trained for vacations and leaves.</li>
<li>You value having every task done by people physically in the office.</li>
</ul>

<h2>When does outsourcing dental billing make the most sense?</h2>
<ul>
<li>Insurance AR past 60 or 90 days keeps growing.</li>
<li>Your front desk is too busy to verify benefits in detail or follow up on claims.</li>
<li>You recently lost, or expect to lose, your billing coordinator.</li>
<li>You are opening a new location or adding a provider and need capacity quickly.</li>
<li>Your office performs procedures that need more specialized handling, such as medical crossover claims.</li>
</ul>

<h2>What are the hybrid options?</h2>
<p>Many offices keep part of the work and outsource the rest. Common splits include:</p>
<ul>
<li><strong>Verification only.</strong> A remote team completes detailed benefit breakdowns before appointments, and your staff handles claims. See our <a href="/services/dental-insurance-verification/">dental insurance verification</a> service.</li>
<li><strong>AR follow-up only.</strong> Your team submits claims, and an outside team works the aging report and unpaid claims. Our <a href="/services/dental-accounts-receivable/">dental accounts receivable management</a> page explains how that works.</li>
<li><strong>Back office support.</strong> A <a href="/services/dental-virtual-assistant/">dental virtual assistant</a> handles posting, claim notes and administrative tasks under your coordinator's direction.</li>
<li><strong>Backlog projects.</strong> An outside team clears old claims while your staff keeps current work moving.</li>
</ul>
<p>Hybrid models let you keep what is working and fix what is not, without changing everything at once.</p>

<h2>What are the risks of outsourcing, and how do you manage them?</h2>
<p>The main risks are loss of visibility, unclear responsibility and data security. Each can be managed:</p>
<ul>
<li><strong>Visibility.</strong> Require monthly reports and make sure all work is documented in your practice management system, not in a separate tool you cannot see.</li>
<li><strong>Responsibility.</strong> Write down who owns each task, from updating insurance at check-in to answering balance calls.</li>
<li><strong>Security.</strong> Require a signed Business Associate Agreement before any access to patient data, and ask how remote access is secured and logged.</li>
<li><strong>Exit plan.</strong> Make sure you can end access cleanly and keep all records in your own system.</li>
</ul>

<h2>What are the risks of staying in house?</h2>
<p>The main in-house risks are concentration and drift. When one person holds all the billing knowledge, a resignation or long absence can stall claims for weeks. Over time, processes can also drift: verification gets shorter, follow-up gets pushed to "when things slow down," and small balances pile up. Regular review of your aging report and denial reasons helps catch this early, whichever model you choose.</p>

<h2>What should a transition plan include if you outsource?</h2>
<p>A change in who handles billing is smoother when both sides agree on the details before the first claim moves. A good transition plan covers:</p>
<ul>
<li><strong>Access.</strong> Individual logins to your practice management software, clearinghouse and payer portals, with permissions limited to the work being done.</li>
<li><strong>Open claims.</strong> A cutoff date, and a clear rule for who finishes claims already submitted before that date.</li>
<li><strong>Fee schedules and plan notes.</strong> Current PPO fee schedules, known carrier quirks and any standing instructions your coordinator follows.</li>
<li><strong>Communication.</strong> A named contact on each side, a channel for daily questions, and a regular review meeting.</li>
<li><strong>Baseline numbers.</strong> Your current aging report and collection totals, so you can compare progress over the following months.</li>
</ul>
<p>If an in-house coordinator is staying in a different role, involve them early. Their knowledge of your patients and carriers is valuable to any outside team.</p>

<h2>How do you make the decision?</h2>
<p>Start with data. Pull your insurance aging report, a list of claims denied or unpaid in the last 90 days, and an honest estimate of how many hours your team spends on billing each week. If older balances are growing and follow-up time keeps shrinking, more capacity is needed, whether that means a new hire, a partner, or both. Our guide on <a href="/blog/how-to-choose-a-dental-billing-company/">how to choose a dental billing company</a> can help if you decide to compare outside options.</p>

<h2>Not sure which model fits your office?</h2>
<p>If you are weighing whether to keep dental billing in house, outsource it, or split the work, <a href="/consultation/">book a free consultation</a>. We will look at your aging report and current workload with you and outline which tasks are worth keeping in the office and which could move to a remote team.</p>
`,
    faqs: [
      {
        q: 'Is outsourced dental billing cheaper than in-house billing?',
        a: 'It can be, but it depends on your volume, current staff costs and how much revenue goes uncollected today. Compare a full in-house cost, including benefits, software, training and turnover, against the total outside fee for the same scope.',
      },
      {
        q: 'Can I outsource only part of my dental billing?',
        a: 'Yes. Many offices outsource only insurance verification, only AR follow-up, or only a backlog project, while keeping claim submission and patient conversations in the office.',
      },
      {
        q: 'Will I lose control of my billing if I outsource?',
        a: 'You should not, if the arrangement is set up well. Require that work is done and documented in your own practice management software, ask for regular reports, and define who owns each task in writing.',
      },
      {
        q: 'What is the biggest sign that a dental office needs billing help?',
        a: 'A steadily growing balance of insurance claims older than 60 or 90 days is usually the clearest sign, because it shows that follow-up is not keeping pace with new claims.',
      },
    ],
    sources: [SRC.adaInsurance, SRC.adaCdt, SRC.adaClaimForm, SRC.hhsBaa],
  },

  // 5 ------------------------------------------------------------------
  {
    slug: 'ai-in-revenue-cycle-management',
    title: 'AI in Revenue Cycle Management: What It Does Well and Where It Needs People',
    seoTitle: 'AI in Revenue Cycle Management: Uses, Limits, Privacy',
    metaDescription:
      'A balanced look at AI medical billing software, AI medical coding and AI denial management: what AI does well, its limits, human review and privacy.',
    excerpt:
      'AI is now part of many billing, coding and denial management tools. Here is a balanced view of where it helps, where it falls short, why human review still matters, and what to ask about patient data.',
    category: 'Healthcare AI',
    tags: ['AI medical billing software', 'AI medical coding', 'AI dental billing', 'AI revenue cycle management', 'AI denial management'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>AI in revenue cycle management is best at reading, sorting and predicting: pulling data from documents, suggesting codes, flagging claims likely to be denied, grouping denials by cause and drafting routine letters.</strong> It is weaker at judgment calls, unusual cases and rules that change often. In practice, AI works best as an assistant to trained billers and coders, with people reviewing its output and staying accountable for what is submitted.</p>

<p>Almost every billing and practice management product now advertises some form of artificial intelligence. Some of those features are genuinely useful. Others are older rules engines with a new label. This guide explains what AI tools do well across medical and dental billing, where they need human oversight, and what to ask about patient data before you turn them on.</p>

<h2>What is AI actually doing in medical billing software?</h2>
<p>"AI" covers several different technologies, and it helps to know which one a product uses:</p>
<ul>
<li><strong>Machine learning models</strong> learn patterns from past claims and outcomes, for example which claim features are associated with denials from a given payer.</li>
<li><strong>Natural language processing (NLP)</strong> reads unstructured text such as clinical notes, explanation of benefits documents and payer letters.</li>
<li><strong>Generative AI</strong> produces new text, such as a draft appeal letter or a summary of a long payer policy.</li>
<li><strong>Rules engines</strong> apply fixed if-then logic. They are not AI in the strict sense, but they are often bundled into "AI" products and remain the backbone of claim scrubbing.</li>
</ul>

<h2>Where does AI help most in the revenue cycle?</h2>

<h3>Front end: eligibility and intake</h3>
<p>AI tools can read insurance card images, extract member details, and interpret eligibility responses into plain summaries of copays, deductibles and coverage limits. In dental billing, some tools parse benefit breakdowns and frequency history from payer portals or responses so staff do not have to retype them.</p>

<h3>AI medical coding</h3>
<p>Computer-assisted coding uses NLP to read documentation and suggest diagnosis and procedure codes. It can speed up routine encounters and point out documentation that seems to support a more specific code. It still needs a qualified coder or provider to confirm the codes, because the documentation must support every code submitted and the provider remains responsible for the claim.</p>

<h3>Claim scrubbing and denial prediction</h3>
<p>Beyond standard edits such as the CMS National Correct Coding Initiative, predictive models can flag claims that resemble ones a payer denied in the past. This helps teams review high-risk claims before submission rather than after a denial arrives. Our <a href="/services/claims-scrubbing/">claims scrubbing</a> page describes how pre-submission review fits into the workflow.</p>

<h3>AI denial management</h3>
<p>AI can read remittance data and denial letters, group denials by root cause, rank them by value and deadline, and draft appeal letters from templates and claim details. That saves time on sorting and writing. Deciding whether to appeal, what evidence to include, and whether the denial points to a process problem upstream is still work for an experienced person. See how our <a href="/services/denial-management/">denial management</a> process approaches root causes.</p>

<h3>Payment posting and variance detection</h3>
<p>Models can match payments to claims, spot payments that fall below expected contract amounts, and flag unusual adjustments for review.</p>

<h3>Patient communication</h3>
<p>Chat and messaging tools can answer simple balance questions, send reminders and route complex questions to staff. They should make it easy for patients to reach a person.</p>

<h2>What are the limits of AI in billing and coding?</h2>
<ul>
<li><strong>It can be confidently wrong.</strong> Generative AI can produce text that sounds right but cites a policy that does not exist or misstates a rule. Every letter and summary needs checking.</li>
<li><strong>Rules change faster than models.</strong> Code sets update every year, and payer policies change throughout the year. A model trained on last year's claims may not reflect this year's rules.</li>
<li><strong>Patterns are not proof.</strong> A model that predicts a denial cannot tell you whether the claim is actually correct. Documentation and payer rules decide that.</li>
<li><strong>Bias in the data.</strong> If historical claims reflect old mistakes, a model can learn and repeat them.</li>
<li><strong>Unusual cases.</strong> Rare procedures, complex modifiers, coordination of benefits and medical crossover claims in dentistry are where AI tends to be least reliable.</li>
</ul>

<h2>Why does human review still matter?</h2>
<p>The provider and practice are responsible for the claims they submit. An AI suggestion does not shift that responsibility to a software vendor. Human review is how a practice makes sure that codes match documentation, appeals make accurate arguments, and automated decisions do not quietly create compliance problems.</p>
<p>The American Medical Association uses the term "augmented intelligence" to stress that these tools should support professional judgment rather than replace it, and its AI principles call for transparency, oversight and attention to how payers use automated decision-making. Payers are adopting AI as well. CMS's WISeR Model, which began January 1, 2026 in six states including Texas, uses technology to support prior authorization review for selected services in Original Medicare, and CMS states that recommendations for non-payment are determined by licensed clinicians. When AI is on both sides of a claim, careful human review on the practice side matters even more. Our article on <a href="/blog/ai-and-electronic-prior-authorization/">AI and electronic prior authorization</a> covers that topic in more detail.</p>

<h2>How should you handle patient data with AI tools?</h2>
<p>Any AI vendor that creates, receives, stores or transmits protected health information on your behalf is generally a business associate under HIPAA. Before you send patient data to an AI tool, ask:</p>
<ul>
<li>Will the vendor sign a Business Associate Agreement?</li>
<li>Is your data used to train models that serve other customers? Can you opt out?</li>
<li>Where is data processed and stored, and how long is it kept?</li>
<li>Who at the vendor can see your data, and is access logged?</li>
<li>How is data encrypted in transit and at rest?</li>
<li>Can you limit the data sent to the minimum needed for the task?</li>
</ul>
<p>Staff should also know not to paste patient information into general-purpose chat tools that are not covered by a BAA. A short written policy on approved AI tools prevents most accidental disclosures.</p>

<h2>How should a practice evaluate AI medical billing software?</h2>
<ol>
<li><strong>Define the problem first.</strong> Pick a measurable pain point, such as time spent on eligibility or denials for a specific reason.</li>
<li><strong>Ask what the model does.</strong> Is it machine learning, NLP, generative AI or rules? What data was it trained on?</li>
<li><strong>Test on your own data.</strong> Run a pilot on a sample of claims and have experienced staff check the output.</li>
<li><strong>Measure review time.</strong> If staff spend as long checking AI output as doing the work, the tool is not helping yet.</li>
<li><strong>Plan for exceptions.</strong> Know how cases the tool cannot handle are routed to people.</li>
<li><strong>Check the contract.</strong> Look at data use, BAA terms, and what happens to your data if you cancel.</li>
</ol>
<p>Many gains come from plain automation rather than AI. Our guide to <a href="/blog/medical-billing-automation-and-rpa/">medical billing automation and RPA</a> explains where rule-based tools fit.</p>

<h2>Is AI going to replace medical billers and coders?</h2>
<p>The more likely change is in what billers and coders spend their time on. Repetitive data entry and sorting shrink, while review, exception handling, appeals and payer communication grow in importance. Teams that understand both the billing rules and the tools tend to get the most out of AI. Our <a href="/services/medical-coding/">medical coding</a> work, for example, depends on people who can judge whether documentation supports a suggested code.</p>

<h2>Thinking about AI tools for your billing?</h2>
<p>If you are considering AI features in your billing or practice software and want a practical second opinion, <a href="/consultation/">book a free consultation</a>. We can talk through which parts of your workflow are good candidates for automation, where human review should stay, and which questions to put to vendors before you share patient data.</p>
`,
    faqs: [
      {
        q: 'Can AI do medical coding on its own?',
        a: 'Not reliably for every encounter. AI medical coding tools can suggest codes from documentation, but a qualified coder or provider should confirm them, because the documentation must support each code and the practice remains responsible for the claim.',
      },
      {
        q: 'What is AI denial management?',
        a: 'AI denial management uses software to read remittance data and denial letters, group denials by cause, prioritize them by value and deadline, and draft appeal letters. People still decide whether and how to appeal and fix the upstream causes.',
      },
      {
        q: 'Is it safe to put patient data into AI tools?',
        a: 'Only into tools whose vendor has signed a Business Associate Agreement and whose data handling you have reviewed. Avoid entering patient information into general-purpose chat tools that are not covered by a BAA.',
      },
      {
        q: 'Does AI work for dental billing too?',
        a: 'Yes. AI dental billing tools can help read benefit breakdowns, flag missing attachments and sort outstanding claims, though frequency limits, downgrades and medical crossover claims still need experienced review.',
      },
    ],
    sources: [SRC.amaAiPrinciples, SRC.amaAiProsCons, SRC.cmsWiser, SRC.cmsNcci, SRC.hhsBaa],
  },

  // 6 ------------------------------------------------------------------
  {
    slug: 'medical-billing-automation-and-rpa',
    title: 'Medical Billing Automation and RPA: What to Automate and How',
    seoTitle: 'Medical Billing Automation and RPA: A Practical Guide',
    metaDescription:
      'How automated medical billing works: automated insurance verification, claims processing, payment posting and RPA, plus how to start safely.',
    excerpt:
      'Automation can take repetitive work off your billing team, from eligibility checks to claim status and payment posting. Here is how standard transactions, rules engines and robotic process automation fit together, and how to start.',
    category: 'Healthcare Technology',
    tags: ['automated medical billing', 'automated insurance verification', 'automated claims processing', 'RPA in medical billing', 'healthcare automation tools'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Medical billing automation uses software to perform repetitive, rule-based billing tasks without manual keystrokes, such as batch eligibility checks, claim scrubbing, claim status inquiries and posting electronic remittances.</strong> Robotic process automation (RPA) is one type of automation: software bots that copy what a person does on screen, used mainly where no standard electronic transaction or interface exists. Automation works best on high-volume, predictable work, with people handling the exceptions.</p>

<p>Billing teams spend a large share of their day on tasks that follow the same steps every time: checking coverage, looking up claim status, posting payments and moving data between systems. Those are natural targets for automation. This guide explains the main types of billing automation, which tasks they suit, where RPA fits, and how to start without creating new problems.</p>

<h2>What are the main types of billing automation?</h2>
<p>It helps to separate four layers that often get lumped together:</p>
<ol>
<li><strong>Standard electronic transactions.</strong> HIPAA names X12 standards for core administrative exchanges, including eligibility (270/271), claims (837), claim status (276/277), remittance advice (835) and prior authorization (278). CMS has also adopted CAQH CORE operating rules for several of these, which set expectations for how the exchanges behave. When both sides support these transactions, a lot of work can happen system to system.</li>
<li><strong>Rules engines and workflows.</strong> Software that applies if-then logic: claim scrubbing edits, work queues that route denials by reason, or automatic statements when a balance moves to the patient.</li>
<li><strong>Robotic process automation.</strong> Bots that log into websites or applications and click, type and copy data the way a person would.</li>
<li><strong>AI-assisted tools.</strong> Models that read documents or predict outcomes. These are covered in our guide to <a href="/blog/ai-in-revenue-cycle-management/">AI in revenue cycle management</a>.</li>
</ol>
<p>The most reliable automation usually starts at the first layer. Bots and AI are best used to fill gaps the standards do not cover.</p>

<h2>Which billing tasks are good candidates for automation?</h2>

<h3>Automated insurance verification</h3>
<p>Batch eligibility checks can run for every scheduled patient a few days before the visit, using 270/271 transactions through your clearinghouse or practice management system. Staff then review only the exceptions: inactive coverage, a different primary payer, or missing benefit detail. Some payers return limited detail electronically, so a portal check or call may still be needed for certain services. See how our <a href="/services/insurance-eligibility-verification/">insurance eligibility verification</a> work handles those exceptions.</p>

<h3>Automated claims processing</h3>
<p>Charges flow from the EHR into the practice management system, pass through scrubber edits, and go to the clearinghouse as 837 files. Automation can hold claims with missing data, apply payer-specific rules and send clean claims in batches. Clearinghouse acknowledgments and rejections can feed straight into work queues. Our <a href="/services/electronic-claims-processing/">electronic claims processing</a> page covers this flow.</p>

<h3>Claim status follow-up</h3>
<p>Instead of calling payers or checking portals one claim at a time, automated 276/277 inquiries can check unpaid claims on a schedule and update their status. Staff then focus on claims that are pended, denied or missing.</p>

<h3>Payment posting</h3>
<p>Electronic remittance advice (835) can be auto-posted when payments match expected amounts. Variances, denials and unusual adjustment codes are routed to a person. Our <a href="/services/era-processing/">ERA processing</a> service explains how that review works.</p>

<h3>Patient statements and reminders</h3>
<p>Statement cycles, payment reminders and payment plan charges can run automatically once rules are set.</p>

<h3>Reporting</h3>
<p>Scheduled reports for AR aging, denials and collections save time and keep everyone looking at the same numbers.</p>

<h2>What is RPA in medical billing, and where does it fit?</h2>
<p>RPA bots imitate human actions in a user interface. In billing, they are often used to:</p>
<ul>
<li>Check benefit details or claim status on payer portals that do not offer the needed detail through standard transactions.</li>
<li>Download remittance documents or correspondence from portals.</li>
<li>Copy data between two systems that do not share an interface.</li>
<li>Update fields in bulk, such as adding notes to a list of accounts.</li>
</ul>
<p>RPA is useful, but it has known weaknesses:</p>
<ul>
<li><strong>Fragility.</strong> If a portal changes its layout, the bot can break or, worse, keep running and capture the wrong data.</li>
<li><strong>Credential management.</strong> Bots need logins. Each bot should have its own credentials where the portal allows it, with access limited to what it needs. Check each payer portal's terms of use, since some restrict automated access.</li>
<li><strong>Monitoring.</strong> Someone must watch bot results and error logs every day.</li>
<li><strong>Hidden errors.</strong> A bot repeats a mistake thousands of times as easily as it repeats a correct step.</li>
</ul>
<p>Where a standard transaction or a supported interface exists, it is usually more stable than a bot.</p>

<h2>What are the benefits of automated medical billing?</h2>
<ul>
<li>Less manual data entry and fewer keying errors.</li>
<li>Faster discovery of eligibility and claim problems.</li>
<li>More consistent follow-up, because scheduled checks do not get skipped on busy days.</li>
<li>More staff time for denials, appeals and patient conversations, which need judgment.</li>
<li>Better data for reporting, since actions are logged in a consistent way.</li>
</ul>

<h2>What are the risks of automation?</h2>
<p>Automation amplifies whatever process it is built on. If the process is unclear, automation spreads the confusion faster. Common problems include:</p>
<ul>
<li>Automating a task nobody has written down, so the bot follows undocumented habits.</li>
<li>No owner for exceptions, so flagged items pile up unseen.</li>
<li>Rules that are never updated after code set or payer changes.</li>
<li>Automatic adjustments or write-offs that should have had human approval.</li>
<li>Security gaps from shared logins or bots with broader access than necessary.</li>
</ul>

<h2>How do you start automating billing tasks?</h2>
<ol>
<li><strong>Map the process.</strong> Write down every step of the task as it is done today, including the exceptions.</li>
<li><strong>Measure it.</strong> Count how often the task happens and how long it takes. High volume and simple rules point to the best candidates.</li>
<li><strong>Use what you already have.</strong> Many practice management systems and clearinghouses include batch eligibility, claim status and auto-posting features that are not turned on.</li>
<li><strong>Design the exception path.</strong> Decide who reviews flagged items and how quickly.</li>
<li><strong>Pilot and compare.</strong> Run the automated process alongside the manual one for a short period and compare results.</li>
<li><strong>Monitor and maintain.</strong> Assign an owner to review results, update rules and check access.</li>
</ol>
<p>Our <a href="/services/rcm-workflow-optimization/">RCM workflow optimization</a> service starts with this kind of process mapping, because the right tool depends on knowing exactly where the time goes.</p>

<h2>Does automation work the same way in dental billing?</h2>
<p>Mostly, with a few differences. Dental claims use the 837D transaction, and eligibility responses from dental plans often leave out details that dental offices need, such as frequency history, remaining maximum by category or missing tooth clauses. As a result, dental offices often combine automated eligibility checks with portal lookups or calls for detailed breakdowns. Attachments are another area where tools help, since radiographs and charting can be sent electronically with the claim rather than by mail. Auto-posting of dental remittances and scheduled claim status checks work much as they do in medical billing.</p>

<h2>Does automation replace billing staff?</h2>
<p>Automation changes the mix of work more than it removes the need for people. As repetitive tasks shrink, the remaining work is the harder part: denials, appeals, payer escalations, coding questions and patient conversations. Practices still need people who understand billing rules well enough to set up automation correctly and to notice when it goes wrong.</p>

<h2>Want to find what is worth automating?</h2>
<p>If you suspect your team spends too much time on repetitive billing tasks, <a href="/consultation/">book a free consultation</a>. We will look at where hours go today, which features your current systems already offer, and which tasks are better left with people, before you invest in new tools.</p>
`,
    faqs: [
      {
        q: 'What is RPA in medical billing?',
        a: 'Robotic process automation in medical billing uses software bots that imitate a person working on screen, such as logging into payer portals to check claim status or copying data between systems. It is most useful where standard electronic transactions are not available.',
      },
      {
        q: 'Can insurance verification be fully automated?',
        a: 'Much of it can. Batch 270/271 eligibility checks can run automatically before visits, but some benefit details are not returned electronically, so staff still review exceptions and may need to check portals or call payers.',
      },
      {
        q: 'What is the difference between automation and AI in billing?',
        a: 'Automation follows defined rules or steps, such as running scheduled eligibility checks or posting matching payments. AI learns patterns or reads unstructured text, such as predicting likely denials or drafting appeal letters.',
      },
      {
        q: 'What should I automate first in my billing office?',
        a: 'Start with high-volume, rule-based tasks that your existing systems already support, such as batch eligibility checks, claim status inquiries and auto-posting of electronic remittances, and set up a clear process for exceptions.',
      },
    ],
    sources: [SRC.cmsTransactions, SRC.cmsOperatingRules, SRC.cmsEdi, SRC.x12Status, SRC.x12Carc],
  },

  // 7 ------------------------------------------------------------------
  {
    slug: 'ai-and-electronic-prior-authorization',
    title: 'AI Prior Authorization and the Move to Electronic Prior Auth',
    seoTitle: 'AI Prior Authorization and CMS-0057-F: What Practices Need',
    metaDescription:
      'How AI prior authorization tools work, what the CMS prior authorization final rule (CMS-0057-F) requires and when, and what practices should do now.',
    excerpt:
      'AI tools and new federal requirements are both changing prior authorization. Here is what AI can and cannot do, what CMS-0057-F requires of certain payers in 2026 and 2027, and how practices can prepare.',
    category: 'Healthcare AI',
    tags: ['AI prior authorization', 'electronic prior authorization', 'CMS-0057-F', 'prior authorization', 'interoperability'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>AI prior authorization tools help practices find out whether a service needs approval, gather the supporting documentation, fill in requests and track their status, while payers use AI to help review requests.</strong> At the same time, the CMS Interoperability and Prior Authorization final rule (CMS-0057-F) requires certain payers to meet decision timeframes and give specific denial reasons starting in 2026, and to offer an electronic Prior Authorization API by January 1, 2027.</p>

<p>Prior authorization is one of the most time-consuming tasks in a practice. Staff look up requirements, pull notes, complete payer forms, wait, follow up, and sometimes appeal. Two forces are now changing that work: AI tools on both the provider and payer side, and federal rules that push affected payers toward faster, electronic processes. This guide explains both, keeps the dates straight, and suggests practical steps.</p>

<h2>What does AI prior authorization actually do?</h2>
<p>On the provider side, AI and automation tools are used to:</p>
<ul>
<li><strong>Check requirements.</strong> Compare the ordered service, diagnosis and payer against known authorization rules to flag whether approval is needed.</li>
<li><strong>Gather documentation.</strong> Use natural language processing to find relevant notes, test results and prior treatments in the chart that match a payer's criteria.</li>
<li><strong>Fill in requests.</strong> Pre-populate payer forms or portal fields from the record, so staff review rather than retype.</li>
<li><strong>Track status.</strong> Check pending requests on a schedule and alert staff when a payer asks for more information.</li>
<li><strong>Draft appeals.</strong> Produce a first draft of an appeal or peer-to-peer summary for a clinician to edit.</li>
</ul>
<p>On the payer side, AI is used to sort and route requests, match them to coverage criteria, and in some programs, approve straightforward requests automatically.</p>

<h2>What are the limits of AI in prior authorization?</h2>
<ul>
<li><strong>Criteria vary and change.</strong> Each payer, and sometimes each plan, sets its own rules. A tool is only as current as the rules it uses.</li>
<li><strong>Documentation still decides.</strong> AI can find what is in the chart, but it cannot create clinical support that is not there.</li>
<li><strong>Clinical judgment cannot be automated away.</strong> Whether a service is appropriate for a specific patient is a clinical decision. Professional groups, including the American Medical Association, have urged that automated payer decisions not replace human review of individual cases.</li>
<li><strong>Accuracy needs checking.</strong> A pre-filled request with a wrong code or date can cause a denial just as a hand-typed one can.</li>
</ul>

<h2>What does the CMS Interoperability and Prior Authorization final rule require?</h2>
<p>CMS-0057-F, finalized by CMS in 2024, applies to "impacted payers": Medicare Advantage organizations, state Medicaid and CHIP fee-for-service programs, Medicaid managed care plans, CHIP managed care entities, and qualified health plan issuers on the Federally-facilitated Exchanges. It does not directly apply to every commercial or employer plan. The prior authorization provisions also do not apply to drugs.</p>

<h3>Requirements that began in 2026</h3>
<ul>
<li><strong>Decision timeframes.</strong> Impacted payers, except QHP issuers on the Federally-facilitated Exchanges, must send prior authorization decisions within 72 hours for expedited requests and within seven calendar days for standard requests.</li>
<li><strong>Specific denial reasons.</strong> Impacted payers must give a specific reason when they deny a prior authorization request, however the request was submitted.</li>
<li><strong>Public metrics.</strong> Impacted payers must post certain prior authorization metrics on their websites each year, with the first set due by March 31, 2026.</li>
</ul>

<h3>Requirements by January 1, 2027</h3>
<ul>
<li><strong>Prior Authorization API.</strong> Impacted payers must offer an API, based on HL7 FHIR standards, that lets provider systems find out whether authorization is required, see documentation requirements, submit requests and receive responses.</li>
<li><strong>Provider Access and Payer-to-Payer APIs.</strong> Additional APIs that share claims and clinical data, including prior authorization information, with in-network providers and with a patient's new payer.</li>
<li><strong>Patient Access API updates.</strong> Prior authorization information is added to what patients can access.</li>
</ul>

<h3>Incentives for providers</h3>
<p>The rule also adds an Electronic Prior Authorization measure to the Medicare Promoting Interoperability program for eligible hospitals and critical access hospitals, and to the Promoting Interoperability performance category of MIPS for eligible clinicians, beginning with calendar year 2027 reporting. Because the standards for FHIR-based prior authorization differ from the HIPAA X12 278 transaction, CMS announced in February 2024 that it would not take enforcement action against covered entities that use a FHIR-based process instead of the X12 278 for electronic prior authorization.</p>
<p>These dates and details come from CMS's published materials. Check the CMS-0057-F page for any later guidance before you plan around them.</p>

<h2>How is AI used in Medicare prior authorization?</h2>
<p>Original Medicare has historically used prior authorization for a limited set of services. In 2026, the CMS Innovation Center began the WISeR Model in six states, including Texas. It uses technology, including AI, to support prior authorization or pre-payment review for selected services, such as skin and tissue substitutes, electrical nerve stimulator implants and knee arthroscopy for knee osteoarthritis. CMS states that recommendations for non-payment are determined by appropriately licensed clinicians. If your practice is in a participating state and provides these services, check CMS's model page and your Medicare Administrative Contractor's instructions.</p>

<h2>What should practices do now?</h2>
<ol>
<li><strong>Know your payers.</strong> List which of your payers are impacted payers under CMS-0057-F and which are not. Expectations for speed and denial reasons will differ.</li>
<li><strong>Track decision times.</strong> Record when each request was submitted and decided. If an impacted payer regularly misses its timeframes, you will have the data to raise it.</li>
<li><strong>Read denial reasons.</strong> Specific reasons make it easier to fix a request or build an appeal. Group them to find patterns.</li>
<li><strong>Talk to your EHR vendor.</strong> Ask about its plans for FHIR-based prior authorization and the 2027 Electronic Prior Authorization measure.</li>
<li><strong>Standardize documentation.</strong> Templates that capture the elements payers commonly ask for, such as prior treatments tried and their results, help both people and AI tools.</li>
<li><strong>Keep people in the loop.</strong> Have staff review AI-prepared requests before submission, and keep clinicians involved in appeals and peer-to-peer discussions.</li>
</ol>
<p>Our <a href="/tools/prior-authorization-checklist/">prior authorization checklist</a> is a simple starting point for standardizing requests.</p>

<h2>Will electronic prior authorization end manual work?</h2>
<p>It should reduce it, but not overnight. The new APIs apply to impacted payers, so plans outside the rule may keep using portals, fax and phone for some time. Provider systems also need to connect to these APIs, and adoption across EHRs will take time. For the near future, most practices will run a mix of electronic, portal and manual processes, which makes good tracking more important than ever.</p>
<p>Denials will not disappear either. When a request is denied, a clear process for corrections and appeals still matters. Our <a href="/services/denial-appeals/">denial appeals</a> service and our broader look at <a href="/blog/ai-in-revenue-cycle-management/">AI in revenue cycle management</a> cover what happens after a decision.</p>

<h2>How can an outside team help with prior authorization?</h2>
<p>A dedicated team can check requirements before scheduling, prepare and submit requests, follow up on pending cases, and keep a log of decision times and denial reasons by payer. That log becomes useful evidence when payers are slow and a guide for improving documentation. Our <a href="/services/prior-authorization/">prior authorization services</a> page explains how we approach this work inside your systems.</p>

<h2>Is prior authorization slowing down your schedule?</h2>
<p>If authorizations are delaying care or causing preventable denials, <a href="/consultation/">book a free consultation</a>. We will review how requests move through your office today, which payers cause the most delays, and where tracking or automation could save staff time while keeping clinicians in control of clinical decisions.</p>
`,
    faqs: [
      {
        q: 'What is AI prior authorization?',
        a: 'AI prior authorization uses software to check whether a service needs approval, find supporting documentation in the chart, pre-fill requests and track their status. Payers also use AI to help sort and review requests, while clinical decisions still need human review.',
      },
      {
        q: 'When do payers have to offer a Prior Authorization API?',
        a: 'Under CMS-0057-F, impacted payers must implement the Prior Authorization API beginning January 1, 2027. Impacted payers include Medicare Advantage organizations, Medicaid and CHIP programs and managed care plans, and QHP issuers on the Federally-facilitated Exchanges.',
      },
      {
        q: 'How fast must payers decide prior authorization requests under CMS-0057-F?',
        a: 'Since 2026, impacted payers other than QHP issuers on the Federally-facilitated Exchanges must decide expedited requests within 72 hours and standard requests within seven calendar days. These timeframes do not apply to drugs.',
      },
      {
        q: 'Does CMS-0057-F apply to all commercial insurance plans?',
        a: 'No. It applies to impacted payers named in the rule, such as Medicare Advantage, Medicaid and CHIP programs and plans, and QHP issuers on the Federally-facilitated Exchanges. Many employer and other commercial plans are not directly covered.',
      },
    ],
    sources: [SRC.cms0057, SRC.cms0057Fact, SRC.cmsWiser, SRC.amaPa, SRC.amaAiPrinciples, SRC.cmsTransactions],
  },

  // 8 ------------------------------------------------------------------
  {
    slug: 'telehealth-billing-codes-guide',
    title: 'Telehealth Billing Codes: POS, Modifiers and Payer Rules',
    seoTitle: 'Telehealth Billing Codes Guide: POS 02, POS 10, Modifiers',
    metaDescription:
      'Telehealth billing codes explained: place of service 02 and 10, modifiers 95, 93, GT and FQ, audio-only visits, and how payers differ.',
    excerpt:
      'Telehealth claims depend on more than the visit code. Here is how place of service 02 and 10, telehealth modifiers and audio-only rules work, why payers differ, and what to check before you bill.',
    category: 'Medical Billing',
    tags: ['telehealth billing codes', 'telehealth modifiers', 'place of service 02', 'place of service 10', 'audio-only telehealth'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Telehealth billing codes include the service code itself plus the place of service (POS) code and modifiers that tell the payer how and where the visit happened.</strong> POS 02 means telehealth with the patient somewhere other than home, and POS 10 means telehealth with the patient at home. Modifier 95 usually marks real-time audio and video, and 93 marks audio-only. Payers differ on which codes they want, so check each payer's current policy.</p>

<p>Telehealth claims are denied more often for reporting details than for the visit itself: the wrong POS, a missing modifier, or a service the payer does not cover by telehealth. Rules have also shifted repeatedly since 2020, especially in Medicare. This guide explains the pieces of a telehealth claim, how payers tend to differ, and what to verify before you bill. It does not replace the payer's own instructions, which always take priority.</p>

<h2>What makes up a telehealth claim?</h2>
<p>A typical professional telehealth claim includes:</p>
<ul>
<li><strong>The service code.</strong> Usually a CPT or HCPCS code for the service delivered, such as an evaluation and management visit or a psychotherapy session. CPT codes are maintained by the American Medical Association.</li>
<li><strong>A place of service code.</strong> Tells the payer the setting, which for telehealth is often POS 02 or POS 10.</li>
<li><strong>A modifier, when required.</strong> Tells the payer the technology used, such as audio and video or audio only.</li>
<li><strong>Diagnosis codes.</strong> ICD-10-CM codes that support medical necessity, just as for in-person visits.</li>
<li><strong>Documentation.</strong> The note should record that the visit was by telehealth, the technology used, the patient's location, the provider's location, and patient consent where required.</li>
</ul>

<h2>What is the difference between POS 02 and POS 10?</h2>
<p>CMS maintains the national place of service code set. Two codes are specific to telehealth:</p>
<table>
<thead><tr><th>POS</th><th>Meaning in plain terms</th></tr></thead>
<tbody>
<tr><td>02</td><td>Telehealth where the patient is not in their home, for example at a clinic or other facility</td></tr>
<tr><td>10</td><td>Telehealth where the patient is in their home or another private residence</td></tr>
</tbody>
</table>
<p>The difference can affect payment. Some payers pay POS 10 differently from POS 02. In some years, Medicare has instead told professionals to report the POS that would have applied had the visit been in person, together with modifier 95. Because that instruction has changed over time, confirm the current year's Medicare guidance in the Physician Fee Schedule materials and with your Medicare Administrative Contractor.</p>

<h2>Which telehealth modifiers should you know?</h2>
<ul>
<li><strong>Modifier 95.</strong> A CPT modifier for a synchronous telemedicine service delivered through real-time interactive audio and video.</li>
<li><strong>Modifier 93.</strong> A CPT modifier for a synchronous telemedicine service delivered by telephone or another real-time audio-only system.</li>
<li><strong>Modifier GT.</strong> An older HCPCS modifier for services delivered through interactive audio and video. Medicare now limits its use mainly to certain institutional billing situations, such as critical access hospitals billing under the optional method, but some commercial and Medicaid plans still ask for it.</li>
<li><strong>Modifier FQ.</strong> A HCPCS modifier indicating that a service was furnished using audio-only technology. Medicare has used it mainly for rural health clinics and federally qualified health centers, among others, while other professionals generally use modifier 93.</li>
<li><strong>Modifier FR.</strong> A HCPCS modifier used in Medicare when a supervising practitioner was present through two-way audio and video.</li>
</ul>
<p>The right modifier depends on the payer, the provider type and the service. A modifier one payer requires can cause a denial at another.</p>

<h2>How is audio-only telehealth billed?</h2>
<p>Audio-only visits are covered more narrowly than video visits. For Medicare, audio-only is generally allowed for services delivered to patients at home when the practitioner can offer video but the patient cannot use it or does not consent to it, and Medicare has permanently allowed audio-only for many behavioral and mental health services in the home. Claims usually carry modifier 93, or FQ for certain facility types.</p>
<p>Commercial and Medicaid policies on audio-only vary widely. Some pay for audio-only visits at the same rate as video, some pay less, some cover only behavioral health, and some do not cover them. Separate telephone service codes also exist and are not interchangeable with audio-only telehealth reporting.</p>
<p>In 2025, CPT introduced a new series of telemedicine evaluation and management codes in the 98000 range. Payer adoption has been uneven, and Medicare has not adopted most of that series for payment, so check each payer's policy before using them.</p>

<h2>What is the current status of Medicare telehealth flexibilities?</h2>
<p>Many Medicare telehealth flexibilities from the COVID-19 public health emergency have been extended several times by Congress, sometimes with short lapses. According to CMS's telehealth FAQ updated in October 2026, these flexibilities currently run through December 31, 2027, allowing patients to receive Medicare telehealth services at home and outside rural areas and allowing a wider range of practitioners to bill. Starting January 1, 2028, unless Congress acts again, location and practitioner limits are scheduled to return for most non-behavioral services.</p>
<p>Because this has changed often, always check the current CMS telehealth page and FAQ before relying on any date, including the one above. Rules for rural health clinics and federally qualified health centers, the in-person visit requirement for some mental health telehealth services, and virtual supervision are each handled separately and have their own timelines.</p>

<h2>How do payers differ on telehealth billing?</h2>
<ul>
<li><strong>Medicare.</strong> Uses a defined list of covered telehealth services, updated each year through the Physician Fee Schedule, plus the flexibilities described above.</li>
<li><strong>Medicaid.</strong> Each state sets its own telehealth coverage, POS and modifier rules, and managed care plans may add their own.</li>
<li><strong>Commercial plans.</strong> Follow their own policies, often shaped by state telehealth laws. Some require POS 02 or 10, some want the in-person POS with modifier 95, and some still use GT.</li>
<li><strong>Medicare Advantage.</strong> Plans may offer telehealth benefits beyond Original Medicare, with their own reporting rules.</li>
</ul>
<p>A simple payer grid listing each plan's covered services, POS, modifiers and audio-only rules saves many denials.</p>

<h2>What are common telehealth billing errors?</h2>
<ul>
<li>Using POS 11 (office) without the modifier the payer requires, or POS 02 when the payer wants POS 10.</li>
<li>Adding modifier 95 to a service not on the payer's telehealth list.</li>
<li>Billing audio-only visits with a video modifier.</li>
<li>Missing documentation of patient location, technology or consent.</li>
<li>Applying one payer's rules to every payer.</li>
<li>Billing across state lines without confirming the provider's licensure and enrollment for the patient's state.</li>
</ul>
<p>Our <a href="/tools/denial-reasons-guide/">denial reasons guide</a> explains the adjustment codes these errors tend to produce, and our <a href="/services/claims-scrubbing/">claims scrubbing</a> process is designed to catch payer-specific telehealth rules before claims go out.</p>

<h2>How can you keep telehealth billing accurate?</h2>
<ol>
<li>Keep a current payer grid and review it at least each January and whenever a payer issues a policy update.</li>
<li>Build telehealth fields into your note templates: patient location, provider location, technology and consent.</li>
<li>Set scrubber rules by payer for POS and modifiers.</li>
<li>Track telehealth denials separately so patterns show up quickly.</li>
<li>Recheck Medicare flexibility dates whenever Congress or CMS announces a change.</li>
</ol>
<p>Practices with a large virtual practice, including <a href="/specialties/behavioral-health/">behavioral health</a> groups, often benefit from a dedicated review of their telehealth rules. Our <a href="/specialties/telehealth/">telehealth billing services</a> page describes how we approach this work.</p>

<h2>Are telehealth claims coming back denied?</h2>
<p>If POS codes, modifiers or payer rules are causing telehealth denials, <a href="/consultation/">book a free consultation</a>. We will review a sample of recent telehealth claims with you, compare them against each payer's current policy, and help you build a payer grid your team can keep up to date.</p>
`,
    faqs: [
      {
        q: 'What is the difference between POS 02 and POS 10?',
        a: 'POS 02 is used for telehealth when the patient is not at home, such as at a clinic, and POS 10 is used when the patient is at home. Some payers pay them differently, and Medicare has at times asked for the in-person POS with modifier 95 instead.',
      },
      {
        q: 'When do I use modifier 95 vs modifier 93?',
        a: 'Modifier 95 is generally used for real-time audio and video telehealth, and modifier 93 for real-time audio-only telehealth. Always confirm which modifier each payer requires for the specific service.',
      },
      {
        q: 'Is modifier GT still used?',
        a: 'Medicare now limits modifier GT mainly to certain institutional billing situations, but some Medicaid and commercial plans still request it. Check each payer policy rather than assuming one rule applies everywhere.',
      },
      {
        q: 'How long do Medicare telehealth flexibilities last?',
        a: 'According to CMS guidance updated in October 2026, many Medicare telehealth flexibilities run through December 31, 2027. These dates have changed several times, so verify the current status on cms.gov before relying on them.',
      },
    ],
    sources: [SRC.cmsPos, SRC.cmsTelehealth, SRC.cmsTelehealthFaq, SRC.cmsPfs, SRC.amaCpt],
  },

  // 9 ------------------------------------------------------------------
  {
    slug: 'no-surprises-act-good-faith-estimates',
    title: 'No Surprises Act Billing Compliance: Good Faith Estimate Requirements',
    seoTitle: 'No Surprises Act: Good Faith Estimate Requirements',
    metaDescription:
      'Good faith estimate requirements under the No Surprises Act for uninsured and self-pay patients: timing, contents, records and the $400 dispute rule.',
    excerpt:
      'The No Surprises Act requires good faith estimates for uninsured and self-pay patients. Here is who must provide them, when, what they must include, and how patient-provider dispute resolution works.',
    category: 'Compliance and Regulation',
    tags: ['No Surprises Act billing compliance', 'good faith estimate requirements', 'self-pay patients', 'patient billing', 'compliance'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Under the No Surprises Act, providers and facilities must give uninsured and self-pay patients a written good faith estimate of expected charges when care is scheduled at least three business days ahead or when the patient asks.</strong> The estimate must be delivered on set deadlines and include specific details. If the final bill is at least $400 more than the estimate from a provider or facility, the patient may be able to use federal patient-provider dispute resolution.</p>

<p>The No Surprises Act took effect in 2022. Most attention goes to its protections against surprise out-of-network bills for insured patients, but the good faith estimate rules for uninsured and self-pay patients affect almost every practice that schedules care in advance. This guide summarizes the main requirements as described by CMS. It is educational, not legal advice, and you should confirm details against current CMS guidance and the regulations at 45 CFR 149.610.</p>

<h2>What does the No Surprises Act cover?</h2>
<p>The law has several parts. For billing teams, the main ones are:</p>
<ul>
<li><strong>Balance billing protections</strong> for insured patients receiving emergency services, certain non-emergency services from out-of-network providers at in-network facilities, and air ambulance services.</li>
<li><strong>Good faith estimates</strong> for uninsured and self-pay patients.</li>
<li><strong>Patient-provider dispute resolution</strong> when a bill is substantially higher than the estimate.</li>
<li><strong>Independent dispute resolution</strong> for payment disputes between out-of-network providers and health plans.</li>
</ul>
<p>Requirements for estimates sent to insured patients through their health plan, often called advanced explanations of benefits, have been subject to further rulemaking. Check CMS for the current status before planning around them.</p>

<h2>Who counts as uninsured or self-pay?</h2>
<p>An uninsured patient has no health coverage. A self-pay patient has coverage but chooses not to have a claim submitted for the care. In both cases, the provider must ask about coverage when scheduling or when an estimate is requested, and must explain that a good faith estimate is available.</p>

<h2>When must a good faith estimate be provided?</h2>
<p>CMS describes these deadlines:</p>
<table>
<thead><tr><th>Situation</th><th>Deadline for the estimate</th></tr></thead>
<tbody>
<tr><td>Care scheduled at least 3 business days in advance</td><td>Within 1 business day after scheduling</td></tr>
<tr><td>Care scheduled at least 10 business days in advance</td><td>Within 3 business days after scheduling</td></tr>
<tr><td>Patient asks for an estimate before scheduling</td><td>Within 3 business days after the request</td></tr>
</tbody>
</table>
<p>If care is scheduled fewer than three business days ahead, the scheduled-care requirement does not apply, though a patient can still request an estimate. If the scheduled service changes, a new estimate is generally required.</p>

<h2>What must a good faith estimate include?</h2>
<p>The regulations list the required content. In plain terms, an estimate for an uninsured or self-pay patient should include:</p>
<ul>
<li>The patient's name and date of birth.</li>
<li>A description of the primary item or service and the scheduled date, if any.</li>
<li>An itemized list of items and services reasonably expected to be part of the care, with expected charges.</li>
<li>Applicable diagnosis codes and service codes.</li>
<li>The names, National Provider Identifiers and Tax Identification Numbers of the provider or facility, and where the services will be furnished.</li>
<li>A list of related items or services that will need separate scheduling and separate estimates.</li>
<li>Required disclaimers, including that the estimate is not a contract, that actual charges may differ, and how to use patient-provider dispute resolution.</li>
</ul>
<p>The estimate must be provided in writing, on paper or electronically based on the patient's preference, and may also be discussed verbally.</p>

<h2>What about care from more than one provider?</h2>
<p>The rule uses the terms convening provider (the one who schedules the primary service) and co-provider (others who furnish related services). The regulations call for the convening provider's estimate to include expected charges from co-providers. CMS has used enforcement discretion for parts of the co-provider requirement while it considers further rulemaking, so many estimates currently come separately from each provider or facility. Check CMS's latest guidance on this point.</p>

<h2>What notices and records are required?</h2>
<ul>
<li><strong>Notice of availability.</strong> Information that good faith estimates are available must be written clearly and displayed prominently on your website, in your office, and where scheduling or cost questions happen.</li>
<li><strong>Medical record.</strong> A good faith estimate is considered part of the patient's medical record.</li>
<li><strong>Copies.</strong> You must provide a copy of any estimate issued within the last six years if the patient asks for it.</li>
</ul>

<h2>How does patient-provider dispute resolution work?</h2>
<p>According to CMS, an uninsured or self-pay patient may start patient-provider dispute resolution when:</p>
<ul>
<li>A provider or facility billed at least $400 more than its good faith estimate.</li>
<li>The initial bill is dated within the last 120 calendar days.</li>
<li>The patient pays a $25 administrative fee, which is credited against the amount owed if the decision favors the patient.</li>
</ul>
<p>A dispute resolution entity reviews the estimate, the bill and the provider's explanation for any difference. Practices should be ready to show why charges exceeded the estimate, such as an unforeseen change in the patient's condition, and should generally avoid sending the bill to collections while a dispute is pending.</p>

<h2>How can a practice build a reliable good faith estimate process?</h2>
<ol>
<li><strong>Ask about coverage at scheduling.</strong> Add a required scheduling field that captures whether the patient is uninsured or self-pay.</li>
<li><strong>Use templates.</strong> Build estimate templates for your most common services, with codes and expected charges drawn from your current fee schedule.</li>
<li><strong>Track deadlines.</strong> Set work queues or alerts based on scheduling date so estimates go out within one or three business days.</li>
<li><strong>Coordinate with co-providers.</strong> Know which outside providers, such as labs or anesthesia, are commonly involved, and how their estimates are handled.</li>
<li><strong>Compare bills to estimates.</strong> Before sending a self-pay bill, check it against the estimate. If it is $400 or more over, review the reason and document it.</li>
<li><strong>Train staff.</strong> Front-desk and billing staff should know what to say when a patient asks about costs.</li>
</ol>
<p>Our <a href="/services/patient-financial-communication/">patient financial communication</a> service covers estimates and cost conversations, and our <a href="/services/patient-billing/">patient billing</a> service covers statements and balance questions after the visit.</p>

<h2>What are common good faith estimate mistakes?</h2>
<ul>
<li><strong>Not asking about coverage.</strong> If scheduling staff never ask whether the patient plans to use insurance, self-pay patients can be missed entirely.</li>
<li><strong>Missing the clock.</strong> Deadlines are counted in business days from scheduling or the request, and a busy week can push estimates past them.</li>
<li><strong>Leaving out expected items.</strong> Estimating only the main procedure and omitting supplies, labs or facility fees the patient will reasonably incur.</li>
<li><strong>Not updating the estimate.</strong> Changing the scheduled service or provider without issuing a new estimate.</li>
<li><strong>No record.</strong> Failing to keep the estimate with the patient record, which makes it hard to respond if a patient questions the bill.</li>
</ul>

<h2>How does this connect to the rest of patient billing?</h2>
<p>A good estimate process makes later conversations easier. When patients know what to expect, they are more likely to pay and less likely to dispute. Clear statements and convenient payment options matter too. Our guide to <a href="/blog/patient-payment-options-text-to-pay/">patient payment options and text to pay</a> covers that part of the process. For insured patients treated out of network, our <a href="/services/out-of-network-billing/">out-of-network billing</a> page explains the related balance billing rules.</p>

<h2>Need a better good faith estimate workflow?</h2>
<p>If your office is unsure whether estimates are going out on time or matching final bills, <a href="/consultation/">book a free consultation</a>. We will review your current scheduling and estimate steps with you and suggest a simple tracking process, so self-pay patients get clear numbers and your team has records to back them up.</p>
`,
    faqs: [
      {
        q: 'Who must receive a good faith estimate?',
        a: 'Uninsured patients and self-pay patients who do not plan to use their coverage must receive a good faith estimate when care is scheduled at least three business days in advance or when they request one.',
      },
      {
        q: 'How quickly must a good faith estimate be provided?',
        a: 'Within one business day after scheduling when care is scheduled at least three business days ahead, within three business days when scheduled at least ten business days ahead, and within three business days of a patient request.',
      },
      {
        q: 'What is the $400 rule in the No Surprises Act?',
        a: 'If an uninsured or self-pay patient is billed at least $400 more than a provider or facility good faith estimate, the patient may be able to start patient-provider dispute resolution, generally within 120 calendar days of the initial bill.',
      },
      {
        q: 'How long must good faith estimates be kept?',
        a: 'A good faith estimate is part of the patient medical record, and providers must give a copy of any estimate issued within the last six years when the patient asks.',
      },
      {
        q: 'Do good faith estimate rules apply to insured patients?',
        a: 'The uninsured and self-pay rules described here do not apply when a claim is submitted to insurance. Separate requirements for estimates to insured patients through their plans have been subject to further rulemaking, so check current CMS guidance.',
      },
    ],
    sources: [SRC.cmsNsa, SRC.cmsNsaRules, SRC.cmsGfe, SRC.cmsPpdr, SRC.ecfr149610],
  },

  // 10 -----------------------------------------------------------------
  {
    slug: 'patient-payment-options-text-to-pay',
    title: 'Patient Payment Options and Text to Pay: A Practical Guide',
    seoTitle: 'Patient Payment Solutions and Text to Pay Medical Billing',
    metaDescription:
      'A vendor-neutral guide to patient payment solutions: text to pay medical billing, portals, payment plans, statements, card security and text consent.',
    excerpt:
      'Patients now expect to pay medical bills the way they pay everything else. Here is how text to pay, portals, payment plans and statements fit together, plus the security and texting consent basics to get right.',
    category: 'Practice Management',
    tags: ['patient payment solutions', 'patient billing software', 'text to pay medical billing', 'payment plans', 'patient statements'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>Patient payment solutions are the tools and processes a practice uses to collect what patients owe: card payments at the visit, online portals, text to pay and email payment links, saved cards and autopay, payment plans and clear statements.</strong> The best mix makes paying easy, keeps card data secure, respects patients' choices about texts, and gives your staff one place to see every balance.</p>

<p>Patient balances are a larger share of practice revenue than they used to be, and patients expect to pay a medical bill as easily as any other bill. Yet many practices still rely on mailed paper statements and phone calls. This vendor-neutral guide covers the main payment options, how text to pay works, what to look for in patient billing software, and the security and consent basics that protect both patients and the practice.</p>

<h2>What patient payment options should a practice offer?</h2>
<ul>
<li><strong>Payment at the time of service.</strong> Card, debit and HSA or FSA cards at check-in or checkout, based on a verified estimate of the patient's share.</li>
<li><strong>Online payment portal.</strong> A secure web page where patients view balances and pay, often linked from statements.</li>
<li><strong>Text to pay.</strong> A text message with a secure link to a payment page for the patient's balance.</li>
<li><strong>Email payment links.</strong> Similar to text, for patients who prefer email.</li>
<li><strong>Card on file and autopay.</strong> With written authorization, the practice charges a saved card for balances after insurance pays, or for scheduled plan installments.</li>
<li><strong>Payment plans.</strong> Installments for larger balances, with clear written terms.</li>
<li><strong>Phone payments.</strong> Through staff or an automated phone system, for patients who prefer to talk.</li>
<li><strong>Mail.</strong> Checks remain common for some patients and should still be easy to apply correctly.</li>
</ul>
<p>Offering several options matters because patients differ. A younger patient may pay instantly from a text, while an older patient may prefer a printed statement and a phone call.</p>

<h2>How does text to pay medical billing work?</h2>
<p>When a balance moves to patient responsibility, the billing system sends a short text to the mobile number on file. The message identifies the practice, says a balance is ready, and includes a link to a secure payment page. The patient opens the link, may be asked to verify identity, sees the balance details, and pays with a card or digital wallet. The payment posts back to the account, ideally automatically.</p>
<p>Good practice for the message itself:</p>
<ul>
<li><strong>Keep health details out of the text.</strong> Name the practice and the balance, but avoid diagnoses, procedures or test names.</li>
<li><strong>Never ask for card numbers by text.</strong> All payment details should be entered on the secure page, not typed into a reply.</li>
<li><strong>Make it recognizable.</strong> Use a consistent sender and tell patients at check-in to expect billing texts, which helps them tell real messages from scams.</li>
<li><strong>Include an opt-out.</strong> Tell patients how to stop messages, for example by replying STOP.</li>
</ul>

<h2>What consent do you need to text patients about bills?</h2>
<p>Texting is governed by the federal Telephone Consumer Protection Act (TCPA), enforced by the Federal Communications Commission, along with state laws. The rules depend on how messages are sent and what they say, so treat the points below as general guidance and confirm your approach with counsel:</p>
<ul>
<li><strong>Get consent and record it.</strong> Ask patients at registration whether you may text them about appointments and billing, and keep a record of their answer and the number.</li>
<li><strong>Keep messages to their purpose.</strong> Billing and appointment messages are treated differently from marketing. Do not mix promotions into billing texts.</li>
<li><strong>Honor opt-outs promptly.</strong> Under FCC rules adopted in 2024, patients may revoke consent by any reasonable means, such as replying "stop" or telling staff, and callers must honor revocations within a set time limit. The FCC has proposed further changes, so check the current rule.</li>
<li><strong>Respect quiet hours.</strong> Some states limit when messages may be sent.</li>
<li><strong>Update numbers.</strong> Reassigned phone numbers can send messages to the wrong person. Confirm numbers at each visit.</li>
</ul>
<p>Separately, HIPAA allows practices to communicate with patients electronically, but they should follow reasonable safeguards and the patient's stated preferences for how to be contacted.</p>

<h2>How do you keep patient payments secure?</h2>
<p>Card payments are subject to the Payment Card Industry Data Security Standard (PCI DSS), set by the card industry. Practical steps include:</p>
<ul>
<li>Use a payment processor that handles card data on its own secure pages, so card numbers never pass through your systems.</li>
<li>Store saved cards only as tokens held by the processor, not as numbers in notes or spreadsheets.</li>
<li>Never write card numbers on paper or keep them in email or chat.</li>
<li>Limit who can issue refunds and adjustments, and review those actions regularly.</li>
<li>Keep payment links short-lived and tied to the specific account.</li>
</ul>
<p>Because payment pages may show balance and visit details, the vendor that hosts them may also need a Business Associate Agreement with your practice.</p>

<h2>How should payment plans be set up?</h2>
<p>Payment plans help patients with larger balances pay over time rather than not at all. A good plan has:</p>
<ul>
<li>A written agreement with the total, the installment amount, the due dates and what happens if a payment is missed.</li>
<li>Autopay from a saved card or bank account where the patient agrees, which reduces missed payments.</li>
<li>Consistent rules, such as minimum monthly amounts by balance size, applied the same way to every patient.</li>
<li>A clear path to your financial assistance policy, if you have one.</li>
</ul>
<p>Our <a href="/tools/patient-balance-calculator/">patient balance calculator</a> can help you see how balances and plan terms add up.</p>

<h2>What makes a patient statement easy to pay?</h2>
<ul>
<li>A clear amount due and due date at the top.</li>
<li>Date of service, provider, what insurance paid and what was adjusted.</li>
<li>Plain language instead of internal codes.</li>
<li>Several ways to pay, including a short web address or QR code for the portal.</li>
<li>A phone number answered by someone who can explain the balance.</li>
</ul>
<p>Statements work best when the patient already knows roughly what to expect. Estimates given before care, including good faith estimates for self-pay patients, set that expectation. See our guide to <a href="/blog/no-surprises-act-good-faith-estimates/">No Surprises Act good faith estimates</a>.</p>

<h2>What should you look for in patient billing software?</h2>
<ol>
<li><strong>Integration.</strong> Payments should post automatically to your practice management system with the right date of service and provider.</li>
<li><strong>Channels.</strong> Text, email, portal, phone and paper from one system, with patient preferences respected.</li>
<li><strong>Consent tracking.</strong> Records of who agreed to texts and who opted out, applied automatically.</li>
<li><strong>Security.</strong> Tokenized cards, a PCI-validated processor and role-based access for staff.</li>
<li><strong>Payment plans and autopay.</strong> Built in, with written authorizations stored.</li>
<li><strong>Reporting.</strong> Collections by channel, aging of patient balances and plan performance.</li>
<li><strong>Fees.</strong> Clear processing and per-message fees, and whether any fees are passed to patients, which some states and card networks restrict.</li>
<li><strong>Contract terms.</strong> A BAA where needed, data export on exit, and reasonable cancellation terms.</li>
</ol>

<h2>How do people and process fit with the technology?</h2>
<p>Tools work only when the process behind them is clear. Decide when balances move to the patient, how soon the first message goes out, how many reminders follow, when a staff member calls, and when an account goes to a collection agency, if ever. Make sure front-desk staff can explain balances and offer plans. Our <a href="/services/patient-billing/">patient billing</a> and <a href="/services/patient-collections/">patient collections</a> services are built around that kind of consistent, respectful follow-up.</p>

<h2>Want to make paying easier for your patients?</h2>
<p>If patient balances are piling up or your statements generate more calls than payments, <a href="/consultation/">book a free consultation</a>. We will look at your current statements, payment options and follow-up timing with you, and suggest changes that make it simpler for patients to pay while keeping card data and consent records in order.</p>
`,
    faqs: [
      {
        q: 'What is text to pay in medical billing?',
        a: 'Text to pay sends patients a text message with a secure link to a payment page for their balance. The patient pays on that page with a card or digital wallet, and the payment posts back to their account.',
      },
      {
        q: 'Do I need patient consent to send billing texts?',
        a: 'Generally, yes. Ask for and record consent at registration, honor opt-outs promptly, keep billing texts separate from marketing, and confirm your process with counsel because TCPA and state rules depend on how and what you send.',
      },
      {
        q: 'Is it safe to take card payments by text message?',
        a: 'Only through a secure payment link. Never ask patients to reply with card numbers. Card details should be entered on the processor secure page, and saved cards should be stored as tokens.',
      },
      {
        q: 'What should a patient payment plan include?',
        a: 'A written agreement with the total balance, installment amount, due dates, the payment method and what happens if a payment is missed. Autopay with the patient authorization helps keep plans on track.',
      },
    ],
    sources: [SRC.fccConsent2024, SRC.fccRobocalls, SRC.hhsSecurity, SRC.cmsGfe, SRC.hhsBaa],
  },

  // 11 -----------------------------------------------------------------
  {
    slug: 'hipaa-and-outsourced-medical-billing',
    title: 'HIPAA and Outsourced Medical Billing: What Practices Should Know',
    seoTitle: 'HIPAA and Outsourced Medical Billing: BAAs and Safeguards',
    metaDescription:
      'What HIPAA requires when you outsource medical billing: business associate duties, what a BAA must contain, and the safeguards to ask about.',
    excerpt:
      'A billing company that handles patient information is a business associate under HIPAA. Here is what that means, what a Business Associate Agreement must include, and which safeguards to ask about before you share data.',
    category: 'Compliance and Regulation',
    tags: ['HIPAA and billing services', 'business associate agreement', 'outsourced medical billing', 'patient privacy', 'compliance'],
    readingMinutes: 8,
    publishedAt: '2026-10-12',
    html: `
<p><strong>When you outsource medical billing, the billing company is a business associate under HIPAA, so it must sign a Business Associate Agreement, protect patient information under the Security Rule, use data only as the agreement allows, and report breaches to you.</strong> Your practice remains responsible for choosing partners carefully and getting those assurances in writing. Asking the right questions is how you judge HIPAA compliance for billing services.</p>

<p>Search for billing services that meet HIPAA requirements and you will find many companies describing themselves that way. There is no official government HIPAA certification for billing companies, so a label alone tells you little. This educational guide explains what HIPAA actually requires of a billing company, what belongs in a Business Associate Agreement (BAA), and the safeguards worth asking about. It is not legal advice; consult your own counsel for your situation.</p>

<h2>Why is a billing company a business associate?</h2>
<p>HIPAA applies directly to covered entities, which include health care providers that bill electronically, health plans and clearinghouses. A business associate is a person or company that performs work for a covered entity involving protected health information (PHI). Billing companies create claims, receive remittances, talk to payers and handle patient balances, all of which involve PHI, so they are business associates. Coders, collection agencies, cloud software vendors and IT support firms often are too.</p>

<h2>What does HIPAA require of a business associate?</h2>
<p>Since the HITECH Act and the 2013 Omnibus Rule, business associates have been directly liable for certain HIPAA requirements, not only through their contracts. HHS has published a fact sheet listing the areas where it can take enforcement action directly against a business associate. In summary, a business associate must:</p>
<ul>
<li><strong>Follow the Security Rule.</strong> Put administrative, physical and technical safeguards in place for electronic PHI, including a risk analysis and risk management.</li>
<li><strong>Use and disclose PHI only as permitted</strong> by its contract and the Privacy Rule.</li>
<li><strong>Report breaches to the covered entity.</strong> Under 45 CFR 164.410, a business associate must notify the covered entity of a breach of unsecured PHI without unreasonable delay and no later than 60 calendar days after discovery.</li>
<li><strong>Bind its subcontractors.</strong> Get a BAA from any subcontractor that handles PHI for it.</li>
<li><strong>Limit data to the minimum necessary</strong> for the task.</li>
<li><strong>Cooperate with HHS</strong> investigations and provide required records.</li>
</ul>

<h2>What must a Business Associate Agreement include?</h2>
<p>The required contents are set out in 45 CFR 164.504(e), and HHS publishes sample provisions. In plain terms, a BAA should:</p>
<ol>
<li>Describe the permitted and required uses and disclosures of PHI.</li>
<li>Prohibit uses and disclosures beyond those the agreement or the law allows.</li>
<li>Require appropriate safeguards, including compliance with the Security Rule for electronic PHI.</li>
<li>Require reporting of any use or disclosure not allowed by the agreement, including breaches of unsecured PHI and security incidents.</li>
<li>Require that subcontractors handling PHI agree to the same restrictions.</li>
<li>Support patients' rights to access and amend their information and to receive an accounting of disclosures, as they apply.</li>
<li>Where the business associate carries out a covered entity's Privacy Rule obligation, require it to follow the rule as the covered entity would.</li>
<li>Make internal practices and records available to HHS when requested.</li>
<li>Require return or destruction of PHI when the contract ends, where feasible.</li>
<li>Allow the covered entity to end the contract if the business associate materially violates it.</li>
</ol>
<p>Many practices also add terms beyond the minimum, such as a shorter breach notice window, cyber insurance requirements, limits on where data may be stored, and rights to review security practices.</p>

<h2>Which safeguards should you ask a billing company about?</h2>
<p>A BAA is a promise. These questions help you understand how the promise is kept:</p>
<ul>
<li><strong>Risk analysis.</strong> When did you last complete a security risk analysis, and how are findings tracked to completion?</li>
<li><strong>Access control.</strong> Does every team member have a unique login to our systems? Is access limited to what each person needs, and removed promptly when someone leaves?</li>
<li><strong>Authentication.</strong> Is multi-factor authentication used for systems that hold PHI?</li>
<li><strong>Encryption.</strong> Is PHI encrypted on devices and in transit?</li>
<li><strong>Remote work.</strong> If staff work remotely, how are devices secured, and are screens, printing and downloads controlled?</li>
<li><strong>Training.</strong> How often is workforce privacy and security training done, and is it documented?</li>
<li><strong>Logging and monitoring.</strong> Can you show who accessed which records and when?</li>
<li><strong>Incident response.</strong> What happens, step by step, if a laptop is lost or an account is compromised? How and when will we be told?</li>
<li><strong>Subcontractors.</strong> Which subcontractors handle our data, and do they have BAAs?</li>
<li><strong>Data location and retention.</strong> Where is our data stored, and what happens to it when the contract ends?</li>
</ul>
<p>Whether a billing company works inside your own systems or copies data into its own also matters. Working inside your practice management system and EHR can limit how many copies of PHI exist, though it still requires strong access controls on your side.</p>

<h2>What stays the practice's responsibility?</h2>
<p>Outsourcing does not move all responsibility. Your practice still needs to:</p>
<ul>
<li>Sign a BAA before any PHI is shared.</li>
<li>Give each outside user individual credentials, and remove access promptly when the relationship or a person's role ends.</li>
<li>Include the billing relationship in your own risk analysis.</li>
<li>Respond to breach reports and handle any required notifications to patients and HHS.</li>
<li>Keep your own policies, training and Notice of Privacy Practices current.</li>
</ul>
<p>HealthIT.gov offers a free security risk assessment tool that smaller practices often use as a starting point.</p>

<h2>Is the HIPAA Security Rule changing?</h2>
<p>HHS published a proposed update to the Security Rule in the Federal Register on January 6, 2025. It would make several safeguards more specific, such as encryption, multi-factor authentication and regular technical testing. As of this writing it is still a proposal, and the current Security Rule remains in effect. Check the Federal Register and HHS for its status, and expect any final version to shape what you ask billing partners.</p>

<h2>What should happen when a billing relationship ends?</h2>
<p>Plan the exit at the start. The BAA should require the billing company to return or destroy PHI when the contract ends, where feasible, and to keep protecting anything it cannot return or destroy. In practice, that means confirming in writing that copies of reports, exports and correspondence have been deleted, and that every login to your systems, clearinghouse and payer portals has been disabled. Change shared passwords if any were used, review access logs for the final weeks, and keep a record of the steps taken.</p>

<h2>Are offshore or remote billing teams allowed under HIPAA?</h2>
<p>HIPAA does not prohibit business associates from using remote staff or staff in other locations, but it applies the same safeguards wherever the work is done. Some payer contracts and government programs add their own restrictions on where data may be accessed or stored, so check your contracts and ask the billing company where its team works.</p>

<h2>How do we approach this at Texas Solutions?</h2>
<p>We sign a Business Associate Agreement before accessing any patient data, and our team works inside your own practice management, EHR and clearinghouse systems. We are glad to walk through the safeguard questions above as part of any evaluation. For a broader look at choosing a partner, see our guide on <a href="/blog/how-to-choose-a-medical-billing-company/">how to choose a medical billing company</a>, or review how our <a href="/services/medical-billing/">medical billing services</a> and <a href="/services/revenue-cycle-management/">revenue cycle management services</a> are structured.</p>

<h2>Have questions about sharing data with a billing partner?</h2>
<p>If you are reviewing a current billing vendor or preparing to outsource, <a href="/consultation/">book a free consultation</a> or <a href="/contact/">contact us</a>. We can talk through the BAA, access setup and the security questions on this page, so you know what to expect before any patient data is shared.</p>
`,
    faqs: [
      {
        q: 'Does a medical billing company need a Business Associate Agreement?',
        a: 'Yes. A billing company handles protected health information on behalf of a covered entity, so it is a business associate and a BAA must be in place before it receives patient data.',
      },
      {
        q: 'Is there an official HIPAA certification for billing companies?',
        a: 'No. HHS does not certify companies as meeting HIPAA. Evaluate a billing company by its Business Associate Agreement, its safeguards and its answers to your security questions rather than by a label.',
      },
      {
        q: 'How quickly must a business associate report a breach?',
        a: 'Under 45 CFR 164.410, a business associate must notify the covered entity of a breach of unsecured protected health information without unreasonable delay and no later than 60 calendar days after discovering it. Many BAAs set a shorter window.',
      },
      {
        q: 'Is the practice still responsible if the billing company has a breach?',
        a: 'The practice keeps certain duties, such as having a BAA in place, managing access and handling required notifications to patients and HHS. The business associate is also directly liable for its own HIPAA obligations.',
      },
    ],
    sources: [SRC.hhsBaa, SRC.hhsBaLiability, SRC.ecfr164504, SRC.ecfr164410, SRC.hhsSecurity, SRC.hhsBreach, SRC.fedRegSecurityNprm, SRC.onc_sra],
  },

  // 12 -----------------------------------------------------------------
  {
    slug: 'what-is-a-clean-claim-rate',
    title: 'What Is a Clean Claim Rate? Definition, Formula and How to Improve It',
    seoTitle: 'What Is a Clean Claim Rate? Formula and How to Improve It',
    metaDescription:
      'What is a clean claim rate? The definition, the formula with an example, how it differs from first-pass acceptance, and practical ways to improve it.',
    excerpt:
      'Clean claim rate shows how often your claims go out right the first time. Here is the definition, the formula with an example, how it differs from first-pass acceptance and denial rate, and practical ways to improve it.',
    category: 'RCM Tools and Guides',
    tags: ['clean claim rate', 'first-pass acceptance', 'medical billing KPIs', 'claim scrubbing', 'denial prevention'],
    readingMinutes: 7,
    publishedAt: '2026-10-12',
    html: `
<p><strong>A clean claim rate is the percentage of claims that go out without errors and are accepted for processing on the first submission, with no correction, rejection or request for more information.</strong> The basic formula is clean claims divided by total claims submitted in the same period, times 100. A higher rate means less rework, faster payment and fewer claims slipping through the cracks.</p>

<p>Clean claim rate is one of the clearest signals of how well the front and middle of your revenue cycle work. Every claim that needs fixing costs staff time and delays payment. This guide explains the definition, shows the formula with an example, clears up the confusion with related measures, and lists practical ways to improve the rate.</p>

<h2>What counts as a "clean" claim?</h2>
<p>In general use, a clean claim is one that has everything the payer needs to process it: correct patient and insurance details, valid codes and modifiers, required provider identifiers, supporting information where needed, and no errors that cause a rejection or a request for more information.</p>
<p>Medicare uses the term in its own processing rules. CMS's claims processing manual describes a clean claim, in general terms, as one that has no defect requiring the contractor to investigate or develop it before adjudication. Commercial payers and state prompt-pay laws may define it differently, which matters when you track payment timeliness.</p>
<p>A clean claim is not necessarily a paid claim. A claim can be clean, processed promptly and still denied, for example because the service is not covered. That is why clean claim rate and denial rate are tracked separately.</p>

<h2>How do you calculate clean claim rate?</h2>
<p>The formula:</p>
<blockquote><p>Clean claim rate = (claims accepted on first submission without correction / total claims submitted) x 100</p></blockquote>
<p>For example, if your practice submitted 1,200 claims in a month and 1,080 went through without a clearinghouse rejection, payer front-end rejection, correction or request for information, your clean claim rate for that month is 1,080 divided by 1,200, times 100, or 90 percent. This is only an illustration of the math, not a benchmark.</p>
<p>A few rules make the number meaningful:</p>
<ul>
<li><strong>Count original claims only.</strong> Do not count corrected or resubmitted claims in the total, or the rate will look worse than it is.</li>
<li><strong>Use the same period.</strong> Compare claims submitted in a month with how those same claims fared.</li>
<li><strong>Define the checkpoint.</strong> Decide whether "clean" means passing your internal scrubber, passing the clearinghouse, or being accepted by the payer, and keep that definition consistent.</li>
</ul>
<p>Our free <a href="/tools/clean-claim-rate-calculator/">clean claim rate calculator</a> does the math for you.</p>

<h2>How is clean claim rate different from first-pass acceptance rate?</h2>
<p>The terms overlap and are sometimes used interchangeably, but they often measure different checkpoints:</p>
<table>
<thead><tr><th>Measure</th><th>What it usually tracks</th></tr></thead>
<tbody>
<tr><td>Clean claim rate</td><td>Claims that needed no correction at any front-end checkpoint, often including internal scrubber edits</td></tr>
<tr><td>First-pass acceptance rate</td><td>Claims accepted by the clearinghouse or payer on the first submission, without rejection</td></tr>
<tr><td>First-pass resolution or payment rate</td><td>Claims paid or fully resolved on the first submission, with no denial or rework</td></tr>
<tr><td>Denial rate</td><td>Claims the payer adjudicated and denied, in whole or in part</td></tr>
</tbody>
</table>
<p>Some teams count a claim as clean only if it passed their own scrubber with no edits. Others count anything the payer accepted. Neither is wrong, but mixing definitions over time makes trends meaningless. Our <a href="/tools/first-pass-acceptance-rate-calculator/">first-pass acceptance rate calculator</a> helps if you track that measure separately, and our article on <a href="/blog/medical-billing-kpis/">medical billing KPIs</a> explains how these measures fit together.</p>

<h2>What is a good clean claim rate?</h2>
<p>You will see many targets quoted online, but they rarely state how "clean" was defined or where the number came from, so we do not publish a benchmark here. The most useful comparison is your own trend over time, measured the same way each month, along with a breakdown of why claims were not clean. A steady rise in clean claims and a shrinking list of repeat errors tell you more than any single target.</p>

<h2>Why do claims fail to be clean?</h2>
<p>Most problems fall into a few groups:</p>
<ul>
<li><strong>Registration errors.</strong> Misspelled names, wrong dates of birth, wrong member IDs, missing subscriber details.</li>
<li><strong>Eligibility problems.</strong> Inactive coverage, the wrong primary payer or a missing secondary plan.</li>
<li><strong>Coding issues.</strong> Invalid or outdated codes, missing or wrong modifiers, diagnosis codes that do not support the service, or code pairs that trigger edits such as those in the CMS National Correct Coding Initiative.</li>
<li><strong>Provider data.</strong> Wrong NPI, taxonomy, billing or rendering provider, or a provider not yet enrolled with the payer.</li>
<li><strong>Missing information.</strong> Authorization numbers, referring provider, onset dates or attachments.</li>
<li><strong>Format errors.</strong> Problems in the electronic claim file that the clearinghouse rejects.</li>
</ul>
<p>Clearinghouse reports and claim acknowledgment transactions tell you which of these is happening. Group them by cause every week.</p>

<h2>How can you improve your clean claim rate?</h2>
<ol>
<li><strong>Fix registration at the source.</strong> Scan insurance cards, confirm demographics at every visit, and use required fields in scheduling.</li>
<li><strong>Verify eligibility before the visit.</strong> Run checks a few days ahead and again on the day of service for high-risk payers.</li>
<li><strong>Use a scrubber with payer-specific rules.</strong> Standard edits catch a lot, but payer rules on modifiers, diagnosis pointers and authorization fields catch more. Our <a href="/services/claims-scrubbing/">claims scrubbing</a> service focuses on keeping these rules current.</li>
<li><strong>Keep code sets current.</strong> Load annual CPT, HCPCS and ICD-10-CM updates on time and remove deleted codes from templates.</li>
<li><strong>Close the loop.</strong> Send registration and documentation errors back to the people who can prevent them, with examples.</li>
<li><strong>Track by cause, payer and location.</strong> A rate for the whole practice can hide one location or one payer with most of the problems.</li>
<li><strong>Keep provider enrollment current.</strong> New providers and address changes cause rejections that look like billing errors.</li>
</ol>
<h2>How should you report clean claim rate?</h2>
<p>A single monthly percentage is a start, but a short report makes the number useful. Include:</p>
<ul>
<li>The rate for the month, with the same measure for the previous several months so the trend is visible.</li>
<li>The top five reasons claims were not clean, with counts.</li>
<li>A breakdown by payer, since one payer's new rule can pull the whole rate down.</li>
<li>A breakdown by location or provider, if you have more than one.</li>
<li>The actions taken on last month's top reasons, and whether those reasons are shrinking.</li>
</ul>
<p>Review the report with the people who can act on it: front-desk leads for registration errors, coders for coding edits, and whoever manages provider enrollment for identifier problems. Keep the conversation focused on fixing processes rather than assigning blame, which makes staff more willing to flag problems early.</p>

<h2>How does clean claim rate relate to other KPIs?</h2>
<p>Clean claim rate is an early indicator. When it improves, you would expect fewer rejections, less rework, and over time, shorter days in accounts receivable, because claims start their payer clock sooner. It does not replace net collection rate or denial rate, which measure what happens after the payer processes the claim. Watching all three together gives a fuller picture of how the cycle is performing.</p>

<p>Clean claims also reduce denials later. For the next step in the process, see our guide on <a href="/blog/how-to-reduce-claim-denials/">how to reduce claim denials</a>.</p>

<h2>Want to know why your claims are not going out clean?</h2>
<p>If rejections and corrections are eating up staff time, <a href="/consultation/">book a free consultation</a>. We will look at a month of rejections and edits with you, group them by root cause, and point out which fixes at registration, coding or scrubbing would make the biggest difference to your first-time acceptance.</p>
`,
    faqs: [
      {
        q: 'What is the formula for clean claim rate?',
        a: 'Clean claim rate equals the number of claims accepted on first submission without correction, divided by the total number of original claims submitted in the same period, multiplied by 100.',
      },
      {
        q: 'Is a clean claim the same as a paid claim?',
        a: 'No. A clean claim has no errors and can be processed without more information, but it can still be denied, for example if the service is not covered. That is why denial rate is tracked separately.',
      },
      {
        q: 'What is the difference between clean claim rate and first-pass acceptance rate?',
        a: 'They overlap. First-pass acceptance usually measures claims accepted by the clearinghouse or payer without rejection, while clean claim rate often also requires that no internal scrubber correction was needed. Define each measure and keep the definition consistent.',
      },
      {
        q: 'What causes most claims to fail to be clean?',
        a: 'Registration and eligibility errors are among the most common causes, followed by coding and modifier problems, wrong provider identifiers and missing information such as authorization numbers.',
      },
    ],
    sources: [SRC.cmsClaimsManualCh1, SRC.cmsNcci, SRC.cmsTransactions, SRC.hfmaMapKeys, SRC.x12Status],
  },
];
