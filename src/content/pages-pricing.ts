/**
 * Dental RCM pricing guide (owner decision, 2026-10-13).
 *
 * Educational guide WITHOUT RATES: we publish no prices, percentages or
 * savings claims for our own services. Every quote is written after a free
 * consultation. Follow docs/DENTAL-WRITING.md and link only to URLs that stay
 * live (see ./dental.ts).
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
  seoTitle: 'Dental RCM Pricing: How Fees Are Quoted | Texas Solutions',
  metaDescription:
    'A plain guide to dental revenue cycle management pricing: common fee models, what drives dental billing cost, what a quote covers and how to compare proposals.',
  template: 'default',
  intro:
    'We do not publish a rate card. Every Texas Solutions RCM quote is written after a free consultation, because the right price for a dental practice depends on the work you hand us, your claim volume, your locations and providers, your A/R backlog, your carriers and your software. This guide explains how dental RCM pricing usually works so you can read any proposal, ours included, with confidence.',
  body: blocks(
    h2('How is dental revenue cycle management priced?'),
    p(
      'Dental revenue cycle management is usually priced in one of a few common ways, and many companies combine them. None of these models is right for every office. What matters is that the fee matches the work being done and that you can see exactly what it covers.'
    ),
    table(
      ['Pricing model', 'How it works', 'What to check'],
      [
        [
          'Percentage of collections',
          'The fee is a share of the insurance (and sometimes patient) payments collected while the company manages your accounts.',
          'Which payments count, whether older A/R is included, and whether patient payments made at the front desk are part of the base.',
        ],
        [
          'Per-claim fee',
          'A set amount is charged for each claim submitted or worked.',
          'How resubmissions, corrected claims and secondary claims are counted, and what work beyond submission is included.',
        ],
        [
          'Flat monthly fee',
          'One agreed monthly amount covers a defined scope of work.',
          'The volume the fee assumes and what happens if your claim count rises or falls.',
        ],
        [
          'Hourly or project fees',
          'Used for one-time work such as an A/R cleanup of older balances or credentialing with new networks.',
          'The defined end point of the project and how progress is reported.',
        ],
      ]
    ),
    p(
      'These models are common in the industry. We do not pick one in advance. After the consultation, we confirm the model that fits your practice in the written proposal, along with the scope it pays for.'
    ),
    h2('What affects the cost of dental billing?'),
    p(
      'The cost of dental billing comes down to how much work the team will do each month and how complex that work is. When owners ask how much does dental billing cost, these are the factors that shape the answer:'
    ),
    ul([
      '<strong>Services chosen.</strong> Handing over the full revenue cycle is a different scope from asking for help with insurance verification or denials alone.',
      '<strong>Claim volume.</strong> More hygiene visits and doctor procedures mean more claims, more EOBs and ERAs to post and more follow-up.',
      '<strong>Locations and providers.</strong> Each office and each dentist adds schedules, fee schedules, network enrollments and carrier relationships to keep track of.',
      '<strong>A/R backlog.</strong> Claims that have sat unworked past 90 days take research, carrier calls and sometimes appeals before they move.',
      '<strong>Carrier mix.</strong> A practice with many PPO networks, DHMO plans or Medicaid dental programs faces more rules, portals and attachment requirements than one with a few carriers.',
      '<strong>Software.</strong> The dental practice management system and clearinghouse you use shape how the work is done and how reports are pulled.',
    ]),
    p(
      'Because these factors differ so much from one office to the next, any single published figure for outsourced dental billing cost would be a guess. We would rather price the work we actually find.'
    ),
    h2('What is included in a dental RCM quote?'),
    p(
      `A quote from us lists the services in scope, chosen from our eight ${a('/services/revenue-cycle-management/', 'dental revenue cycle management')} services. You can include all of them or only the ones your team needs:`
    ),
    ul([
      a('/services/dental-insurance-verification/', 'Insurance Verification & Eligibility'),
      a('/services/dental-claims-processing/', 'Dental Claims Management'),
      a('/services/denial-management/', 'Denial Management & Appeals'),
      a('/services/payment-posting/', 'Payment Posting'),
      a('/services/dental-accounts-receivable/', 'Accounts Receivable (A/R) Management'),
      a('/services/patient-billing/', 'Patient Billing & Collections Support'),
      a('/services/dental-credentialing/', 'Dental Credentialing & Provider Enrollment'),
      a('/services/rcm-analytics-reporting/', 'Dental RCM Reporting & Revenue Analysis'),
    ]),
    p(
      'One-time projects are listed separately from ongoing work. The most common are an A/R cleanup of older claims and credentialing or re-credentialing with dental networks. Separating them keeps your ongoing monthly scope clear once the project ends.'
    ),
    p(
      'The proposal also states who does which task, how and how often we report, the access we need in your systems, and the terms for changing or ending the arrangement. A Business Associate Agreement is signed before we access any patient data.'
    ),
    h2('How do I compare quotes from dental RCM companies?'),
    p(
      'Compare dental billing pricing by the work each fee buys, not by the fee alone. A lower number that leaves claim follow-up or posting with your staff may not cost less in the end. Questions worth asking every company:'
    ),
    ul([
      '<strong>What is included?</strong> Ask for a task list: verification, claim creation, attachments, posting, denials, A/R calls, patient statements, credentialing and reporting.',
      '<strong>Who owns which tasks?</strong> Know what stays with your front desk, such as collecting copays or scanning x-rays and perio charts.',
      '<strong>What reporting will you get?</strong> Ask which reports you receive, how often, and whether they come from your own practice software.',
      '<strong>What are the contract terms?</strong> Check the length, notice period, and how fees change if your volume or scope changes.',
      '<strong>Is a BAA signed first?</strong> A Business Associate Agreement should be in place before anyone touches patient information.',
      '<strong>What is the access model?</strong> Find out whether the team works in your system under named accounts you control, or moves your data into its own platform.',
      '<strong>What are the exit terms?</strong> Ask how accounts are handed back, what open work is finished, and how access is removed.',
    ]),
    p(
      `Our guide on ${a('/blog/how-to-choose-a-dental-billing-company/', 'how to choose a dental billing company')} covers these questions in more depth.`
    ),
    h2('How do I estimate my in-house dental billing cost first?'),
    p(
      'Start by estimating what your current setup costs, so you have a fair baseline when a quote arrives. Count staff hours spent on insurance work, wages and benefits, software and clearinghouse fees, training, and time lost to turnover or vacations. These free tools can help:'
    ),
    ul([
      `${a('/tools/dental-billing-cost-calculator/', 'Dental billing cost calculator')}: estimate what billing costs your office today.`,
      `${a('/tools/outsourcing-vs-in-house-billing-calculator/', 'Outsourcing vs in-house billing calculator')}: set your in-house figures beside a quote you have received.`,
      `${a('/tools/dental-practice-roi-calculator/', 'Dental practice ROI calculator')}: test how different collection scenarios might affect your practice.`,
    ]),
    p(
      'The results depend entirely on the numbers you enter. They are planning aids, not a forecast of what any company, including ours, will deliver.'
    ),
    h2('How do I get a dental RCM quote from Texas Solutions?'),
    p(
      `Book a ${a('/consultation/', 'free consultation')}. We talk through your practice, your software, your carriers and where the revenue cycle is getting stuck. With your permission, we may review aging or denial reports to understand the workload. You then receive a written proposal with scope, responsibilities, the pricing model and the fee.`
    ),
    p(
      `You can read the full onboarding process on ${a('/how-we-work/', 'how we work')}. There is no obligation to sign after the consultation.`
    ),
    h2('Dental RCM pricing FAQ'),
    h3('Why don’t you publish your prices?'),
    p(
      'We do not publish prices because two dental offices rarely need the same work. A rate card would either overcharge a small office or underprice a group with a large backlog.'
    ),
    h3('Is the consultation really free?'),
    p(
      'Yes, the consultation is free and carries no obligation. It is how we learn enough about your practice to write an accurate quote.'
    ),
    h3('Can I start with one service and add more later?'),
    p(
      'Yes, you can start with a single service, such as insurance verification or A/R follow-up, and expand the scope later. Any change to scope is confirmed in writing.'
    ),
    h3('Is an A/R cleanup priced separately?'),
    p(
      'Usually, yes. Older balances are treated as a one-time project with its own scope, apart from your ongoing monthly work.'
    ),
    p(
      `Ready to see what your dental RCM pricing would look like? ${a('/consultation/', 'Schedule your free consultation')} and we will prepare a written quote for your practice.`
    )
  ),
};

/** List form for the content exporter. */
export const pricingPageList: PageContent[] = [pricingPage];
