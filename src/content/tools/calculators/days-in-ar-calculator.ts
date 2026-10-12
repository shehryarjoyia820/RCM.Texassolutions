import type { Calculator } from '../../types';
import { div, num } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'days-in-ar-calculator',
  name: 'Days in AR Calculator',
  category: 'kpi',
  icon: 'CalendarClock',
  summary: 'Estimate how many days of charges are sitting in accounts receivable.',
  definition:
    'Days in accounts receivable (days in AR) estimates how long it takes, on average, to turn charges into payments. It divides your total outstanding AR by your average daily charges over a recent period, usually 90 days. A lower number generally means claims are being paid and balances resolved faster.',
  inputs: [
    { id: 'totalAr', label: 'Total accounts receivable', unit: 'usd', default: 360000, min: 0, step: 100, help: 'All outstanding insurance and patient balances on the last day of the period.' },
    { id: 'charges', label: 'Total charges for the period', unit: 'usd', default: 1080000, min: 0, step: 100, help: 'Charges posted during the look-back period. Use gross charges if your AR is at gross, net charges if your AR is net of contractual adjustments.' },
    { id: 'periodDays', label: 'Days in the look-back period', unit: 'days', default: 90, min: 1, step: 1, help: 'Number of calendar days the charges cover. 90 days is the most common choice.' },
  ],
  outputs: [
    { id: 'daysInAr', label: 'Days in AR', unit: 'days', primary: true },
    { id: 'adc', label: 'Average daily charges', unit: 'usd' },
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
    { expression: 'Average daily charges = Charges for the period / Days in the period', explanation: 'Gives your recent billing pace per calendar day.' },
    { expression: 'Days in AR = Total AR / Average daily charges', explanation: 'How many days of charges are outstanding at that pace.' },
  ],
  example: {
    inputs: { totalAr: 360000, charges: 1080000, periodDays: 90 },
    expected: { daysInAr: 30, adc: 12000 },
    narrative: 'A practice posted $1,080,000 in charges over the last 90 days and has $360,000 in AR. Average daily charges are 1,080,000 / 90 = $12,000. Days in AR is 360,000 / 12,000 = 30 days.',
  },
  assumptions: [
    'AR and charges are measured on the same basis: both gross, or both net of contractual adjustments.',
    'Credit balances are excluded from AR, since they can make days in AR look lower than it really is.',
    'Charge volume during the look-back period is reasonably typical. A holiday month or a new provider can distort the figure.',
  ],
  faqs: [
    {
      q: 'How do you calculate days in AR?',
      a: 'Divide total accounts receivable by average daily charges. To get average daily charges, take total charges for a recent period, commonly the last 90 days, and divide by the number of days in that period. For example, $360,000 in AR with $12,000 in average daily charges equals 30 days in AR.',
    },
    {
      q: 'Should I use gross or net charges for days in AR?',
      a: 'Use the same basis as your AR balance. If your practice management system carries AR at gross charges until payments post, use gross charges. If contractual adjustments are applied at charge entry, so AR is already net, use net charges. Mixing a net AR balance with gross charges makes days in AR look artificially low.',
    },
    {
      q: 'Why does the look-back period matter?',
      a: 'The look-back period sets the billing pace used in the calculation, so it changes the result. A 30 day period reacts quickly to recent changes but swings with holidays and provider schedules. A 90 day period is smoother and is the most common choice. Whichever period you choose, use it consistently so month to month comparisons are fair.',
    },
    {
      q: 'What usually drives days in AR up?',
      a: 'Days in AR usually rises when claims go out late, denials and rejections are not worked quickly, follow-up on unpaid claims slips or patient balances are left to age. Payer processing delays and credentialing gaps can also add days. An AR aging report by payer helps show which of these is the main driver for your practice.',
    },
  ],
  relatedServices: ['accounts-receivable-management', 'aging-ar-follow-up', 'rcm-analytics-reporting'],
  relatedTools: ['ar-aging-calculator', 'net-collection-rate-calculator', 'claim-turnaround-time-calculator'],
  seoTitle: 'Days in AR Calculator for Medical Practices',
  metaDescription: 'Calculate days in accounts receivable from total AR and average daily charges over 90 days, with the formula, a worked example and tips for reading it.',
  keywords: ['days in ar calculator', 'how to calculate days in ar', 'days in accounts receivable formula'],
};

export default calc;
