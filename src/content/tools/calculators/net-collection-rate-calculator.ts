import type { Calculator } from '../../types';
import { pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'net-collection-rate-calculator',
  name: 'Net Collection Rate Calculator',
  category: 'kpi',
  icon: 'Percent',
  summary: 'Measure how much of the money you are contractually owed you actually collect.',
  definition:
    'Net collection rate (NCR) is the share of collectible revenue a practice actually receives. It divides payments by charges after contractual adjustments, so it shows money lost to denials, write-offs and unpaid balances rather than the gap between list prices and payer contracts.',
  inputs: [
    { id: 'payments', label: 'Total payments received', unit: 'usd', default: 285000, min: 0, help: 'Payer and patient payments for the period, net of refunds.' },
    { id: 'charges', label: 'Total charges', unit: 'usd', default: 500000, min: 0, help: 'Gross charges for the same period at your fee schedule.' },
    { id: 'adjustments', label: 'Contractual adjustments', unit: 'usd', default: 200000, min: 0, help: 'Contractual write-downs only. Do not include bad debt, small balance or denial write-offs.' },
  ],
  outputs: [
    { id: 'ncr', label: 'Net collection rate', unit: 'pct', primary: true },
    { id: 'collectible', label: 'Collectible revenue (charges minus contractual adjustments)', unit: 'usd' },
    { id: 'uncollected', label: 'Collectible revenue not yet collected', unit: 'usd' },
  ],
  compute: (v) => {
    const collectible = v.charges - v.adjustments;
    const warnings: string[] = [];
    if (v.adjustments > v.charges) warnings.push('Contractual adjustments are larger than total charges. Check the figures.');
    if (collectible > 0 && v.payments > collectible) warnings.push('Payments exceed collectible revenue. This usually means the periods do not match or adjustments are understated.');
    const ncr = collectible > 0 ? pct(v.payments, collectible) : null;
    return {
      values: { ncr, collectible: collectible > 0 ? collectible : null, uncollected: collectible > 0 ? collectible - v.payments : null },
      warnings,
    };
  },
  formula: [
    { expression: 'NCR = Payments / (Charges - Contractual adjustments) x 100', explanation: 'Only contractual adjustments are removed, because they are amounts you were never entitled to collect.' },
  ],
  example: {
    inputs: { payments: 285000, charges: 500000, adjustments: 200000 },
    expected: { ncr: 95, collectible: 300000, uncollected: 15000 },
    narrative: 'A practice billed $500,000, wrote down $200,000 to contracted rates and collected $285,000. Collectible revenue is $300,000, so NCR is 285,000 / 300,000 = 95%. The remaining $15,000 is still owed, denied or written off.',
  },
  assumptions: [
    'Payments, charges and adjustments cover the same period. Using a lagged period (for example payments 60 days after charges) gives a more stable figure.',
    'Adjustments include contractual write-downs only.',
  ],
  faqs: [
    {
      q: 'What is the difference between net and gross collection rate?',
      a: 'Net collection rate compares payments to what you were contractually allowed to collect, while gross collection rate compares payments to total billed charges. Gross rate mostly reflects how your fee schedule compares to payer contracts. Net rate removes contractual adjustments, so it shows how much collectible money is lost to denials, unworked balances and write-offs.',
    },
    {
      q: 'Which adjustments should I subtract when calculating net collection rate?',
      a: 'Subtract only contractual adjustments, the amounts your payer contracts say you cannot collect. Do not subtract denial write-offs, bad debt, small balance write-offs or timely filing write-offs. Those are collectible dollars your practice lost, and removing them would hide exactly the leakage the metric is meant to reveal, making the rate look better than reality.',
    },
    {
      q: 'Why can net collection rate come out above 100%?',
      a: 'A rate above 100% usually means the payments and charges come from different periods, or contractual adjustments are overstated. For example, payments received this month may relate to charges from earlier months. Comparing payments to charges from a lagged period, or using a rolling three to six month window, generally gives a steadier and more meaningful figure.',
    },
    {
      q: 'How often should a practice calculate net collection rate?',
      a: 'Most practices review net collection rate monthly and track a rolling quarterly or six month figure alongside it. Monthly numbers can swing because payments lag behind charges, so the rolling view is better for spotting real trends. Reviewing it by payer and by provider can also show where collectible revenue is being lost.',
    },
    {
      q: 'What can a practice do if its net collection rate is falling?',
      a: 'Start by finding where collectible dollars are going: review denials by reason, aging balances over 90 days, write-offs by type and underpaid claims compared to contracted rates. A falling rate often points to eligibility errors, missed follow-up or unappealed denials. Fixing the root cause at the front end usually matters more than chasing individual balances.',
    },
  ],
  relatedServices: ['accounts-receivable-management', 'denial-management', 'revenue-cycle-audit'],
  relatedTools: ['gross-collection-rate-calculator', 'days-in-ar-calculator', 'revenue-leakage-estimator'],
  seoTitle: 'Net Collection Rate Calculator for Medical Practices',
  metaDescription: 'Calculate your net collection rate from payments, charges and contractual adjustments, with the formula, a worked example and what the result means.',
  keywords: ['net collection rate calculator', 'how to calculate net collection rate', 'medical billing kpi'],
};

export default calc;
