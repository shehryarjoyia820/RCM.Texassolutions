/**
 * Dental RCM pricing page (owner decision, 2026-10-13: pricing is published).
 *
 * Use ONLY the owner-approved facts: per-location monthly fee based on the
 * insurance collections we post (patient payments excluded); under $40,000 flat
 * $1,200; $40,000 to $99,999 3.5%; $100,000 to $149,999 3%; $150,000 and above
 * 2.5%; multi-location groups and DSOs custom quote; no setup fee; credentialing
 * and pre-start A/R cleanup quoted separately; third-party software costs stay
 * with the practice. Do not state contract length, minimum term, cancellation
 * terms or discounts. Follow docs/DENTAL-WRITING.md and link only to URLs that
 * stay live (see ./dental.ts).
 */

import type { PageContent } from './pages';

/* ---------- block markup helpers (copied from ./pages.ts) ---------- */

const h2 = (t: string): string =>
  `<!-- wp:heading -->\n<h2 class="wp-block-heading">${t}</h2>\n<!-- /wp:heading -->`;

const h3 = (t: string): string =>
  `<!-- wp:heading {"level":3} -->\n<h3 class="wp-block-heading">${t}</h3>\n<!-- /wp:heading -->`;

const p = (t: string): string => `<!-- wp:paragraph -->\n<p>${t}</p>\n<!-- /wp:paragraph -->`;

const li = (items: string[]): string =>
  items.map((i) => `<!-- wp:list-item -->\n<li>${i}</li>\n<!-- /wp:list-item -->`).join('\n');

const ul = (items: string[]): string =>
  `<!-- wp:list -->\n<ul class="wp-block-list">${li(items)}</ul>\n<!-- /wp:list -->`;

const table = (head: string[], rows: string[][]): string =>
  `<!-- wp:table -->\n<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr>${head
    .map((c) => `<th>${c}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map((r) => `<tr>${r.map((c) => `<td>${c}</td>`).join('')}</tr>`)
    .join('')}</tbody></table></figure>\n<!-- /wp:table -->`;

const a = (href: string, text: string): string => `<a href="${href}">${text}</a>`;

const blocks = (...b: string[]): string => b.join('\n\n');

/* ---------- pricing ---------- */

export const pricingPage: PageContent = {
  key: 'pricing',
  title: 'Dental RCM Pricing',
  seoTitle: 'Dental RCM Pricing: From $1,200 a Month | Texas Solutions',
  metaDescription:
    'Dental RCM pricing per location: $1,200 a month under $40,000 in insurance collections, then 3.5%, 3% or 2.5% of insurance collections. No setup fee.',
  template: 'default',
  intro:
    'Texas Solutions RCM publishes its dental RCM pricing. The monthly fee for each location is based on the insurance collections we post for it that month: a flat $1,200 when insurance collections are under $40,000, and a set percentage of insurance collections above that. There is no setup fee. A free consultation and a written proposal confirm your tier and scope before any work begins.',
  body: blocks(
    h2('How much does dental RCM cost with Texas Solutions?'),
    p(
      'Our dental revenue cycle management pricing has four tiers. Each tier applies per location, per month, and the tier is set by the insurance collections we post for that location during the month.'
    ),
    table(
      ['Monthly insurance collections (per location)', 'Monthly fee'],
      [
        ['Under $40,000', 'Flat $1,200 per month'],
        ['$40,000 to $99,999', '3.5% of insurance collections'],
        ['$100,000 to $149,999', '3% of insurance collections'],
        ['$150,000 and above', '2.5% of insurance collections'],
        ['Multi-location groups and DSOs', 'Custom quote'],
      ]
    ),
    p(
      'For a single location, that table is the whole answer to how much does dental billing cost with us. The fee covers the ongoing monthly work listed below. Credentialing and the cleanup of older A/R are quoted separately, and the costs of your own software stay with your practice.'
    ),
    h2('What counts as insurance collections?'),
    p(
      'Insurance collections are the payments received from dental carriers that we post for a location in a given month. They arrive on EOBs and ERAs from PPO, DHMO, indemnity and Medicaid dental plans and are entered in your practice management software, where you can see every one of them.'
    ),
    p(
      'Patient payments are not part of the fee base. Copays and patient portions collected at the front desk, and payments patients make on their statements, do not count toward your tier or your fee.'
    ),
    h2('What is included in the monthly fee?'),
    p(
      `The monthly fee covers seven of our eight ${a('/services/revenue-cycle-management/', 'dental revenue cycle management')} services:`
    ),
    ul([
      `${a('/services/dental-insurance-verification/', 'Insurance Verification & Eligibility')}: checking coverage, benefits, annual maximums, frequency limits and waiting periods before visits.`,
      `${a('/services/dental-claims-processing/', 'Dental Claims Management')}: creating and submitting claims with the right attachments, then tracking them until they are paid or denied.`,
      `${a('/services/denial-management/', 'Denial Management & Appeals')}: reviewing denials, sending corrected claims and filing appeals where the record supports one.`,
      `${a('/services/payment-posting/', 'Payment Posting')}: posting EOBs and ERAs, recording contractual adjustments and flagging underpayments.`,
      `${a('/services/dental-accounts-receivable/', 'Accounts Receivable (A/R) Management')}: following up on claims from your start date onward, through carrier calls and portals.`,
      `${a('/services/patient-billing/', 'Patient Billing & Collections Support')}: preparing and sending patient statements. We do not phone patients; conversations about balances stay with your front desk.`,
      `${a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting & Revenue Analysis')}: reports on A/R aging, claim status, denials and collections, pulled from your own data.`,
    ]),
    p('There is no setup fee to get started.'),
    h2('What is charged separately?'),
    p('Two kinds of work sit outside the monthly fee. Each is quoted after we review what is involved:'),
    ul([
      `<strong>${a('/services/dental-credentialing/', 'Dental Credentialing & Provider Enrollment')}.</strong> Credentialing new dentists, network enrollment, re-credentialing and EFT/ERA enrollment depend on how many providers and carriers are involved, so we quote them after a review.`,
      '<strong>Cleanup of older A/R.</strong> Claims that were already outstanding before your start date are quoted as a separate project, so the backlog stays apart from your ongoing monthly scope.',
    ]),
    p(
      'Third-party costs stay with the practice. That includes your own clearinghouse, your practice management software subscriptions and any other services you already pay for. We work inside those tools; we do not resell them.'
    ),
    h2('How is the monthly fee calculated?'),
    p(
      'For each location and each month, we total the insurance payments we posted. That total decides the tier. Below $40,000, the fee is a flat $1,200. At $40,000 or more, the percentage for that tier is applied to the full month of insurance collections. A few worked examples:'
    ),
    table(
      ['Insurance collections that month', 'Tier', 'Monthly fee'],
      [
        ['$30,000', 'Under $40,000', '$1,200 (flat)'],
        ['$60,000', '$40,000 to $99,999', '$2,100 (3.5% of $60,000)'],
        ['$120,000', '$100,000 to $149,999', '$3,600 (3% of $120,000)'],
        ['$180,000', '$150,000 and above', '$4,500 (2.5% of $180,000)'],
      ]
    ),
    p(
      'The tier is chosen by that month’s insurance collections, not by an average or a fixed estimate. If a location posts $60,000 in insurance collections one month and $35,000 the next, the first month is billed at 3.5% ($2,100) and the second at the flat $1,200. Patient payments are left out of both totals.'
    ),
    h2('How does outsourced dental billing cost compare with keeping it in-house?'),
    p(
      'To compare fairly, put a full cost on your in-house setup first. Count the hours your team spends on insurance work, the wages, benefits and payroll taxes behind those hours, training, cover for vacations and turnover, and the time your office manager spends supervising claims. Then set that figure beside the fee from the table above for your own insurance collections.'
    ),
    p('These free tools help you build the numbers:'),
    ul([
      `${a('/tools/dental-billing-cost-calculator/', 'Dental billing cost calculator')}: estimate what dental billing costs your office today.`,
      `${a('/tools/outsourcing-vs-in-house-billing-calculator/', 'Outsourcing vs in-house billing calculator')}: place your in-house figures next to an outsourced fee.`,
      `${a('/tools/dental-practice-roi-calculator/', 'Dental practice ROI calculator')}: test how different collection scenarios might affect your practice.`,
    ]),
    p(
      'The results depend entirely on the figures you enter, and they are planning aids rather than a forecast. Some offices find that keeping part of the work in-house suits them better, and we will tell you if that is what we see. Clearinghouse and software costs stay with the practice either way, so they belong on both sides of the comparison.'
    ),
    h2('How do I compare dental billing pricing between companies?'),
    p(
      'Fee models differ, so compare what each fee is based on and what it buys. A few questions make proposals easier to line up side by side:'
    ),
    ul([
      '<strong>What is the fee base?</strong> Ask whether the percentage applies to insurance collections only or to patient payments as well.',
      '<strong>Which services are included?</strong> Ask for the task list: verification, claims, denials, posting, A/R follow-up, patient statements and reporting.',
      '<strong>What costs extra?</strong> Check how credentialing, older A/R and setup are handled.',
      '<strong>Who owns which tasks?</strong> Know what stays with your front desk, such as collecting copays or saving x-rays and perio charts to the chart.',
    ]),
    p(
      `Our guide on ${a('/blog/how-to-choose-a-dental-billing-company/', 'how to choose a dental billing company')} covers these questions in more depth.`
    ),
    h2('How do I get started?'),
    p(
      `Book a ${a('/consultation/', 'free consultation')}. We talk through your locations, your software, your carriers and where claims are getting stuck. With your permission, we may review insurance aging or denial reports to understand the workload. You then receive a written proposal that confirms your tier, the services in scope and what stays with your team. A Business Associate Agreement is signed before we access any patient data. You can read the full onboarding process on ${a('/how-we-work/', 'how we work')}.`
    ),
    h2('Dental RCM pricing FAQ'),
    h3('Is there a setup fee?'),
    p('No. There is no setup fee. Your monthly fee follows the tier table above.'),
    h3('What counts as insurance collections?'),
    p(
      'Payments received from dental carriers that we post for your location during the month. Patient payments, whether collected at the front desk or paid on a statement, are not part of the fee base.'
    ),
    h3('Is credentialing included?'),
    p(
      `No. ${a('/services/dental-credentialing/', 'Dental Credentialing & Provider Enrollment')} is charged separately and quoted after we review how many dentists and carriers are involved.`
    ),
    h3('What about old A/R?'),
    p(
      'The monthly fee covers A/R management for claims from your start date. Older A/R that existed before your start date is quoted as a separate cleanup project after we review your aging reports.'
    ),
    h3('How do groups and DSOs get priced?'),
    p(
      `Multi-location groups and DSOs receive a custom quote, because work across several offices is organized differently from a single location. See our page on ${a('/specialties/dental-group-practices/', 'dental group practices')}, then book a consultation so we can scope it.`
    ),
    p(
      `Want to confirm your tier? ${a('/consultation/', 'Schedule your free consultation')} and we will send a written proposal for your practice.`
    )
  ),
};

/** List form for the content exporter. */
export const pricingPageList: PageContent[] = [pricingPage];
