import type { Calculator } from '../../types';
import { div, num } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'days-in-ar-calculator',
  name: 'Days in AR Calculator',
  category: 'kpi',
  icon: 'CalendarClock',
  summary: 'Estimate how many days of dental production are sitting in insurance and patient accounts receivable.',
  definition:
    'Days in accounts receivable (days in A/R) estimates how long a dental practice takes, on average, to turn production into payments. It divides total outstanding A/R by average daily production over a recent period, usually 90 days. A lower number generally means dental carriers and patients are paying faster.',
  inputs: [
    { id: 'totalAr', label: 'Total accounts receivable', unit: 'usd', default: 360000, min: 0, step: 100, help: 'All outstanding dental insurance and patient balances on the last day of the period, from your practice management aging report.' },
    { id: 'charges', label: 'Total production for the period', unit: 'usd', default: 1080000, min: 0, step: 100, help: 'Completed procedures posted during the look-back period. Use gross production if your A/R carries full fees, or net production if PPO write-offs are posted when the procedure is completed.' },
    { id: 'periodDays', label: 'Days in the look-back period', unit: 'days', default: 90, min: 1, step: 1, help: 'Number of calendar days the production covers. 90 days is the most common choice.' },
  ],
  outputs: [
    { id: 'daysInAr', label: 'Days in AR', unit: 'days', primary: true },
    { id: 'adc', label: 'Average daily production', unit: 'usd' },
  ],
  compute: (raw) => {
    const totalAr = num(raw.totalAr);
    const charges = num(raw.charges);
    const periodDays = num(raw.periodDays);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (totalAr < 0 || charges < 0) warnings.push('AR and charges should not be negative. A negative AR often means unapplied credit balances.');
    if (periodDays <= 0) warnings.push('The look-back period must be at least one day.');
    const adc = periodDays > 0 && charges > 0 ? div(charges, periodDays) : null;
    const daysInAr = adc !== null && totalAr >= 0 ? div(totalAr, adc) : null;
    if (daysInAr !== null && periodDays > 0 && daysInAr > periodDays) {
      warnings.push('Days in AR is longer than the look-back period. Check for old balances that should be worked or written off, or for a charge total that is too low.');
    }
    if (daysInAr !== null) {
      notes.push(`Your AR equals about ${daysInAr.toFixed(1)} days of charges at your recent billing pace.`);
      notes.push('Days in AR is an average. Pair it with an AR aging report, because a modest average can still hide a large balance over 120 days.');
    }
    return { values: { daysInAr, adc }, notes, warnings };
  },
  formula: [
    { expression: 'Average daily production = Production for the period / Days in the period', explanation: 'Gives your recent production pace per calendar day.' },
    { expression: 'Days in A/R = Total A/R / Average daily production', explanation: 'How many days of production are outstanding at that pace.' },
  ],
  example: {
    inputs: { totalAr: 360000, charges: 1080000, periodDays: 90 },
    expected: { daysInAr: 30, adc: 12000 },
    narrative: 'A dental group posted $1,080,000 in production over the last 90 days and has $360,000 in insurance and patient A/R. Average daily production is 1,080,000 / 90 = $12,000. Days in A/R is 360,000 / 12,000 = 30 days.',
  },
  assumptions: [
    'A/R and production are measured on the same basis: both at full fees, or both net of PPO and other contractual write-offs.',
    'Credit balances, such as patient prepayments and carrier overpayments awaiting refund, are excluded from A/R, since they can make days in A/R look lower than it really is.',
    'Production during the look-back period is reasonably typical. A holiday month, a dentist on leave or a new associate can distort the figure.',
  ],
  faqs: [
    {
      q: 'How do you calculate days in A/R for a dental practice?',
      a: 'Divide total accounts receivable by average daily production. To get average daily production, take completed production for a recent period, commonly the last 90 days, and divide by the number of days in that period. For example, $360,000 in A/R with $12,000 in average daily production equals 30 days in A/R.',
    },
    {
      q: 'Should I use gross or net production for days in A/R?',
      a: 'Use the same basis as your A/R balance. If your practice management system carries A/R at full fees until the EOB posts, use gross production. If PPO write-offs are posted when the procedure is completed, so A/R is already net, use net production. Mixing a net A/R balance with gross production makes days in A/R look artificially low.',
    },
    {
      q: 'Why does the look-back period matter?',
      a: 'The look-back period sets the production pace used in the calculation, so it changes the result. A 30 day period reacts quickly but swings with holidays, hygiene schedules and dentist vacations. A 90 day period is smoother and is the most common choice. Whichever period you choose, use it consistently so month to month comparisons are fair.',
    },
    {
      q: 'What usually drives days in A/R up in a dental office?',
      a: 'Days in A/R usually rises when claims go out late, claims are pended for missing x-rays or narratives, denials are not worked quickly, insurance follow-up slips or patient balances are left to age. Credentialing gaps for a new dentist can also add days. An insurance aging report by carrier shows which of these drives your number.',
    },
  ],
  relatedServices: ['dental-accounts-receivable', 'payment-posting', 'rcm-analytics-reporting'],
  relatedTools: ['dental-ar-aging-calculator', 'net-collection-rate-calculator', 'dental-insurance-collection-calculator'],
  seoTitle: 'Days in A/R Calculator for Dental Practices',
  metaDescription: 'Calculate days in A/R for a dental practice from total insurance and patient A/R and average daily production, with the formula and a worked example.',
  keywords: ['dental days in ar calculator', 'how to calculate days in ar dental', 'dental accounts receivable formula'],
};

export default calc;
