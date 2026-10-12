import type { Calculator } from '../../types';
import { pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'net-collection-rate-calculator',
  name: 'Net Collection Rate Calculator',
  category: 'kpi',
  icon: 'Percent',
  summary: 'Measure how much of the dental production you are entitled to collect after PPO write-offs your practice actually collects.',
  definition:
    'Net collection rate (NCR) is the share of collectible dental production a practice actually receives. It divides payments by production after PPO write-offs and other contractual adjustments, so it shows money lost to denials, unworked claims and unpaid patient balances rather than the gap between your full fees and carrier fee schedules.',
  inputs: [
    { id: 'payments', label: 'Total payments received', unit: 'usd', default: 285000, min: 0, help: 'Dental carrier and patient payments for the period, net of refunds.' },
    { id: 'charges', label: 'Gross production', unit: 'usd', default: 500000, min: 0, help: 'Completed procedures for the same period at your full office fees.' },
    { id: 'adjustments', label: 'PPO and other contractual write-offs', unit: 'usd', default: 200000, min: 0, help: 'Contractual write-offs only, such as PPO fee schedule and DHMO adjustments. Do not include denial write-offs, courtesy discounts, small balances or bad debt.' },
  ],
  outputs: [
    { id: 'ncr', label: 'Net collection rate', unit: 'pct', primary: true },
    { id: 'collectible', label: 'Collectible production (gross production minus contractual write-offs)', unit: 'usd' },
    { id: 'uncollected', label: 'Collectible production not yet collected', unit: 'usd' },
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
    { expression: 'NCR = Payments / (Gross production - Contractual write-offs) x 100', explanation: 'Only PPO and other contractual write-offs are removed, because they are amounts you agreed as an in-network dentist never to collect.' },
  ],
  example: {
    inputs: { payments: 285000, charges: 500000, adjustments: 200000 },
    expected: { ncr: 95, collectible: 300000, uncollected: 15000 },
    narrative: 'A dental practice produced $500,000 at full fees, wrote off $200,000 to PPO fee schedules and collected $285,000 from carriers and patients. Collectible production is $300,000, so NCR is 285,000 / 300,000 = 95%. The remaining $15,000 is still owed, denied or written off.',
  },
  assumptions: [
    'Payments, production and write-offs cover the same period. Using a lagged period (for example payments 60 days after production) gives a more stable figure.',
    'Write-offs include contractual PPO, DHMO and similar adjustments only, posted from a current fee schedule.',
  ],
  faqs: [
    {
      q: 'What is the difference between net and gross collection rate in dentistry?',
      a: 'Net collection rate compares payments to what you were contractually entitled to collect, while gross collection rate compares payments to production at full fees. Gross rate mostly reflects how far PPO fee schedules sit below your office fees. Net rate removes those write-offs, so it shows how much collectible money is lost to denials, unworked claims and unpaid patient balances.',
    },
    {
      q: 'Which write-offs should I subtract when calculating net collection rate?',
      a: 'Subtract only contractual write-offs, the amounts your PPO, DHMO or other carrier agreements say you cannot collect. Do not subtract denial write-offs, courtesy discounts, small balance write-offs or bad debt. Those are collectible dollars your practice lost, and removing them would hide the leakage the metric is meant to reveal.',
    },
    {
      q: 'Why can net collection rate come out above 100%?',
      a: 'A rate above 100% usually means payments and production come from different periods, or PPO write-offs are overstated, often because the fee schedule loaded in your software is out of date. Payments received this month may relate to production from earlier months. A lagged period or a rolling three to six month window gives a steadier figure.',
    },
    {
      q: 'How often should a dental practice calculate net collection rate?',
      a: 'Most dental practices review net collection rate monthly and track a rolling quarterly or six month figure alongside it. Monthly numbers swing because carrier payments lag behind production, so the rolling view is better for spotting real trends. Reviewing it by carrier, location and dentist can also show where collectible production is being lost.',
    },
    {
      q: 'What can a dental office do if its net collection rate is falling?',
      a: 'Find where collectible dollars are going: review denials by reason, insurance aging over 90 days, write-offs by type and EOB payments compared with your PPO fee schedules. A falling rate often points to frequency or eligibility errors, missing x-rays or narratives, or slow follow-up. Fixing the root cause at the front desk usually matters most.',
    },
  ],
  relatedServices: ['dental-accounts-receivable', 'payment-posting', 'denial-management', 'rcm-analytics-reporting'],
  relatedTools: ['dental-insurance-collection-calculator', 'days-in-ar-calculator', 'dental-ar-aging-calculator'],
  seoTitle: 'Net Collection Rate Calculator for Dental Practices',
  metaDescription: 'Calculate your dental net collection rate from payments, gross production and PPO write-offs, with the formula, a worked example and what it means.',
  keywords: ['dental net collection rate calculator', 'how to calculate net collection rate dental', 'dental practice kpi', 'ppo write-offs'],
};

export default calc;
