import type { Calculator } from '../../types';
import { div, num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'denial-rate-calculator',
  name: 'Denial Rate Calculator',
  category: 'kpi',
  icon: 'ShieldAlert',
  summary: 'Calculate the share of claims, and optionally dollars, that payers deny.',
  definition:
    'Denial rate is the share of submitted claims that payers process and refuse to pay, in full or in part, for the period measured. It is usually calculated by claim count, and can also be calculated by dollars. Tracking both shows whether denials are frequent, expensive or both.',
  inputs: [
    { id: 'claimsSubmitted', label: 'Claims submitted', unit: 'count', default: 2000, min: 0, step: 1, help: 'Claims submitted to payers during the period.' },
    { id: 'claimsDenied', label: 'Claims denied', unit: 'count', default: 160, min: 0, step: 1, help: 'Claims from that group that were denied. Count rejections (claims never accepted for processing) separately.' },
    { id: 'dollarsSubmitted', label: 'Charges submitted', unit: 'usd', default: 400000, min: 0, step: 100, optional: true, help: 'Optional. Total charges on the submitted claims, for a dollar based denial rate.' },
    { id: 'dollarsDenied', label: 'Charges denied', unit: 'usd', default: 28000, min: 0, step: 100, optional: true, help: 'Optional. Total charges on the denied claims.' },
  ],
  outputs: [
    { id: 'denialRate', label: 'Denial rate (by claim count)', unit: 'pct', primary: true },
    { id: 'dollarDenialRate', label: 'Denial rate (by dollars)', unit: 'pct' },
    { id: 'notDenied', label: 'Claims not denied', unit: 'count' },
    { id: 'avgDenied', label: 'Average charge per denied claim', unit: 'usd' },
  ],
  compute: (raw) => {
    const submitted = num(raw.claimsSubmitted);
    const denied = num(raw.claimsDenied);
    const dSub = num(raw.dollarsSubmitted);
    const dDen = num(raw.dollarsDenied);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (submitted < 0 || denied < 0 || dSub < 0 || dDen < 0) warnings.push('Inputs should not be negative.');
    if (denied > submitted) warnings.push('Denied claims exceed claims submitted. Check that both counts cover the same claims.');
    if (dDen > dSub && dSub > 0) warnings.push('Denied charges exceed submitted charges. Check the dollar figures.');
    if (dSub === 0 && dDen > 0) warnings.push('Enter charges submitted to calculate the dollar denial rate.');
    const denialRate = submitted > 0 && denied >= 0 ? pct(denied, submitted) : null;
    const dollarDenialRate = dSub > 0 && dDen >= 0 ? pct(dDen, dSub) : null;
    const notDenied = submitted > 0 && denied <= submitted ? submitted - denied : null;
    const avgDenied = denied > 0 && dDen > 0 ? div(dDen, denied) : null;
    if (denialRate !== null) {
      notes.push(`Roughly ${denialRate.toFixed(1)} of every 100 claims were denied. Each denial typically needs rework or an appeal before it can be paid.`);
      if (dollarDenialRate !== null) {
        notes.push(dollarDenialRate > denialRate
          ? 'Your dollar denial rate is higher than your claim denial rate, so denials are concentrated on higher value claims. Prioritize those in follow-up.'
          : 'Your dollar denial rate is at or below your claim denial rate, so denials skew toward lower value claims. Volume may still make them costly to rework.');
      }
    }
    return { values: { denialRate, dollarDenialRate, notDenied, avgDenied }, notes, warnings };
  },
  formula: [
    { expression: 'Denial rate = Claims denied / Claims submitted x 100', explanation: 'The standard count based rate.' },
    { expression: 'Dollar denial rate = Charges denied / Charges submitted x 100', explanation: 'Weights each denial by its value.' },
    { expression: 'Average charge per denied claim = Charges denied / Claims denied', explanation: 'Helps size the rework effort against the money at stake.' },
  ],
  example: {
    inputs: { claimsSubmitted: 2000, claimsDenied: 160, dollarsSubmitted: 400000, dollarsDenied: 28000 },
    expected: { denialRate: 8, dollarDenialRate: 7, notDenied: 1840, avgDenied: 175 },
    narrative: 'A practice submitted 2,000 claims worth $400,000 and 160 claims worth $28,000 were denied. Denial rate is 160 / 2,000 = 8%. Dollar denial rate is 28,000 / 400,000 = 7%. 2,000 - 160 = 1,840 claims were not denied, and the average denied claim carried 28,000 / 160 = $175 in charges.',
  },
  assumptions: [
    'Denied claims are counted from the same group of submitted claims, not from a different period.',
    'Rejections, which are returned before adjudication, are excluded. Partial denials are counted as denied claims.',
    'A claim denied and later paid on appeal still counts as a denial when it first happened.',
  ],
  benchmarks: [
    {
      text: 'Insurers offering plans on HealthCare.gov denied 20% of in-network claims in 2023, according to KFF analysis of CMS data. This is one market segment, not an average for all practices and not a target.',
      source: 'KFF, Claims Denials and Appeals in ACA Marketplace Plans in 2023 (updated March 24, 2026)',
      sourceUrl: 'https://www.kff.org/private-insurance/claims-denials-and-appeals-in-aca-marketplace-plans-in-2023/',
      asOf: '2026-03-24',
    },
  ],
  faqs: [
    {
      q: 'How do you calculate a claim denial rate?',
      a: 'Divide the number of denied claims by the number of claims submitted for the same period, then multiply by 100. For example, 160 denials out of 2,000 submitted claims is an 8% denial rate. Use the same group of claims for both numbers, and keep rejections, which never reached adjudication, out of the denial count.',
    },
    {
      q: 'What is the difference between a denial and a rejection?',
      a: 'A rejection happens before the payer processes a claim, usually because of formatting errors, missing data or invalid identifiers caught by the clearinghouse or payer front end. A denial happens after the payer adjudicates the claim and decides not to pay. Rejected claims are corrected and resubmitted, while denied claims usually need a corrected claim or an appeal.',
    },
    {
      q: 'Should I track denial rate by count or by dollars?',
      a: 'Track both if you can. The count based rate shows how often claims fail, which drives rework workload. The dollar based rate shows how much revenue is at risk. If the dollar rate is higher than the count rate, denials are concentrated on expensive claims, and those deserve priority in follow-up and appeals.',
    },
    {
      q: 'What are common causes of claim denials?',
      a: 'Common causes include eligibility and coverage problems, missing or invalid prior authorization, coding and medical necessity issues, duplicate claims, missing documentation and late filing. The payer explains each denial with claim adjustment reason codes on the remittance. Grouping denials by reason code shows which front end or coding fixes would prevent the most repeat denials.',
    },
  ],
  relatedServices: ['denial-management', 'denial-appeals', 'insurance-eligibility-verification'],
  relatedTools: ['claim-rejection-rate-calculator', 'clean-claim-rate-calculator', 'denial-reasons-guide'],
  seoTitle: 'Denial Rate Calculator: Claim and Dollar Denial Rate',
  metaDescription: 'Calculate your claim denial rate by count and by dollars, see the average value of denied claims, and learn how denials differ from claim rejections.',
  keywords: ['denial rate calculator', 'claim denial rate formula', 'medical claim denial rate'],
};

export default calc;
