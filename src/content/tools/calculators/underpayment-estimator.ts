import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'underpayment-estimator',
  name: 'Underpayment Estimator',
  category: 'revenue',
  icon: 'TrendingDown',
  summary: 'Estimate how much revenue payer underpayments may cost your practice each month and each year.',
  definition:
    'An underpayment estimator sizes the money lost when payers pay less than the contracted rate. It multiplies paid claim volume by the average expected payment, the share of claims you believe are underpaid and the average shortfall on those claims. The result is an estimate that helps decide whether a contract variance review is worth the effort.',
  inputs: [
    { id: 'monthlyClaims', label: 'Paid claims per month', unit: 'count', default: 2000, min: 0, step: 50, help: 'Claims paid by payers in a typical month.' },
    { id: 'avgExpected', label: 'Average expected payment per claim', unit: 'usd', default: 140, min: 0, step: 5, help: 'Average contracted allowed amount per claim, including the patient portion.' },
    { id: 'underpaymentRate', label: 'Share of claims underpaid', unit: 'pct', default: 6, min: 0, max: 100, step: 0.5, help: 'Your estimate of the share of paid claims that come in below contract. A sample audit of remittances is the best source.' },
    { id: 'shortfallPct', label: 'Average shortfall on underpaid claims', unit: 'pct', default: 12, min: 0, max: 100, step: 0.5, help: 'How far below the expected payment an underpaid claim falls, on average.' },
  ],
  outputs: [
    { id: 'underpaidClaims', label: 'Underpaid claims per month', unit: 'count' },
    { id: 'shortfallPerClaim', label: 'Average shortfall per underpaid claim', unit: 'usd' },
    { id: 'monthlyUnderpayment', label: 'Estimated monthly underpayment', unit: 'usd', primary: true },
    { id: 'annualUnderpayment', label: 'Estimated annual underpayment', unit: 'usd', primary: true },
    { id: 'pctOfExpected', label: 'Underpayment as % of expected revenue', unit: 'pct' },
  ],
  compute: (v) => {
    const claims = num(v.monthlyClaims);
    const avg = num(v.avgExpected);
    const rate = num(v.underpaymentRate);
    const shortfall = num(v.shortfallPct);
    const warnings: string[] = [];
    const notes: string[] = [];
    const empty = { underpaidClaims: null, shortfallPerClaim: null, monthlyUnderpayment: null, annualUnderpayment: null, pctOfExpected: null };
    if (claims < 0 || avg < 0 || rate < 0 || shortfall < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: empty, warnings };
    }
    if (rate > 100 || shortfall > 100) {
      warnings.push('Percentages cannot be above 100%.');
      return { values: empty, warnings };
    }
    if (rate > 25) warnings.push('More than 25% of claims underpaid is unusually high. Check whether the expected rates loaded in your system are current.');
    const underpaidClaims = claims * (rate / 100);
    const shortfallPerClaim = avg * (shortfall / 100);
    const monthlyUnderpayment = underpaidClaims * shortfallPerClaim;
    const annualUnderpayment = monthlyUnderpayment * 12;
    const pctOfExpected = pct(monthlyUnderpayment, claims * avg);
    if (monthlyUnderpayment > 0) {
      notes.push('This is an estimate based on your assumed underpayment rate and shortfall, not a measured amount.');
      notes.push('To confirm it, compare a sample of remittances against your contracted fee schedules. Some reductions, such as sequestration or multiple procedure rules, may be legitimate.');
    }
    return { values: { underpaidClaims, shortfallPerClaim, monthlyUnderpayment, annualUnderpayment, pctOfExpected }, notes, warnings };
  },
  formula: [
    { expression: 'Underpaid claims = Paid claims per month x Underpayment rate', explanation: 'How many claims come in below contract.' },
    { expression: 'Shortfall per claim = Average expected payment x Average shortfall %', explanation: 'Dollar gap on a typical underpaid claim.' },
    { expression: 'Monthly underpayment = Underpaid claims x Shortfall per claim', explanation: 'Estimated money not received each month.' },
    { expression: 'Annual underpayment = Monthly underpayment x 12', explanation: 'Assumes a typical month repeats.' },
    { expression: 'Underpayment % = Monthly underpayment / (Paid claims x Average expected payment) x 100', explanation: 'Underpayment relative to total expected revenue.' },
  ],
  example: {
    inputs: { monthlyClaims: 2000, avgExpected: 140, underpaymentRate: 6, shortfallPct: 12 },
    expected: { underpaidClaims: 120, shortfallPerClaim: 16.8, monthlyUnderpayment: 2016, annualUnderpayment: 24192, pctOfExpected: 0.72 },
    narrative:
      'Of 2,000 paid claims a month, 6% are underpaid: 2,000 x 0.06 = 120 claims. Each falls 12% short of a $140 expected payment, or 140 x 0.12 = $16.80. Monthly underpayment is 120 x 16.80 = $2,016, which is 2,016 x 12 = $24,192 a year. Expected revenue is 2,000 x 140 = $280,000, so the gap is 2,016 / 280,000 = 0.72%.',
  },
  assumptions: [
    'Every claim has the same average expected payment.',
    'The underpayment rate and shortfall are your estimates; the defaults are placeholders for illustration, not benchmarks.',
    'Expected payment includes the patient portion of the allowed amount.',
    'Legitimate reductions (sequestration, multiple procedure rules, secondary payer adjustments) should not be counted as underpayments.',
  ],
  faqs: [
    {
      q: 'How common are payer underpayments?',
      a: 'It varies widely by payer, contract and specialty, and there is no single reliable industry figure. The best way to know your own rate is to compare a sample of remittances against your contracted fee schedules. This estimator lets you plug in that sample rate to size the annual dollar impact for your practice.',
    },
    {
      q: 'How do I find the average shortfall on underpaid claims?',
      a: 'From the same remittance sample, take each underpaid line, subtract the actual allowed amount from the contracted amount and divide by the contracted amount. Average those percentages across the underpaid lines. Small shortfalls on high-volume codes can add up to more than large shortfalls on rare codes.',
    },
    {
      q: 'Why do underpayments often go unnoticed?',
      a: 'Payment posting usually records what the payer paid and adjusts the rest, without checking it against the contract. Unless expected rates are loaded into the practice management system and variances are flagged, a payment that is a few dollars short looks like any other. Over thousands of claims those few dollars become significant.',
    },
    {
      q: 'Can underpayments be recovered?',
      a: 'Often yes, through payer reconsideration or appeal processes, as long as you act within the contract and payer deadlines and can show the contracted rate. Recovery is easier when underpayments are caught soon after payment. Fixing the root cause, such as an outdated fee schedule in the payer system, prevents the same shortfall on future claims.',
    },
  ],
  relatedServices: ['underpayment-identification', 'fee-schedule-analysis', 'payer-contracting', 'payment-posting'],
  relatedTools: ['payment-variance-calculator', 'revenue-leakage-estimator', 'fee-schedule-comparison-calculator', 'revenue-recovery-calculator'],
  seoTitle: 'Underpayment Estimator for Medical Practices',
  metaDescription: 'Estimate monthly and annual revenue lost to payer underpayments from paid claim volume, average expected payment, underpayment rate and shortfall.',
  keywords: ['underpayment estimator', 'payer underpayments', 'medical claim underpayment calculator'],
};

export default calc;
