import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'annual-revenue-projection-calculator',
  name: 'Annual Revenue Projection Calculator',
  category: 'revenue',
  icon: 'LineChart',
  summary: 'Project total collections over the next year from current monthly collections and a compound monthly growth rate.',
  definition:
    'An annual revenue projection estimates total collections over a future period by growing current monthly collections at a steady monthly rate. This calculator compounds the growth month by month, then reports the projected total, the final month\'s collections, the annualized run rate at the end of the period and the gain over flat collections.',
  inputs: [
    { id: 'currentMonthly', label: 'Current monthly collections', unit: 'usd', default: 100000, min: 0, step: 1000, help: 'Average payer and patient payments per month right now. A three-month average smooths out unusual months.' },
    { id: 'growthPct', label: 'Monthly growth rate', unit: 'pct', default: 1, min: -50, max: 100, step: 0.1, help: 'Expected month-over-month change in collections. Use a negative number for a decline and 0 for flat.' },
    { id: 'months', label: 'Months to project', unit: 'months', default: 12, min: 1, max: 60, step: 1, help: 'How many future months to include. Use 12 for a one-year projection.' },
  ],
  outputs: [
    { id: 'projectedTotal', label: 'Projected total collections', unit: 'usd', primary: true },
    { id: 'finalMonth', label: 'Collections in the final month', unit: 'usd' },
    { id: 'runRate', label: 'Annualized run rate at the end of the period', unit: 'usd', primary: true, help: 'Final month collections x 12.' },
    { id: 'totalGrowthPct', label: 'Growth from current month to final month', unit: 'pct' },
    { id: 'gainOverFlat', label: 'Gain over flat collections', unit: 'usd', help: 'Projected total minus current monthly collections x months.' },
  ],
  compute: (v) => {
    const current = num(v.currentMonthly);
    const g = num(v.growthPct) / 100;
    const rawMonths = num(v.months);
    const warnings: string[] = [];
    const notes: string[] = [];
    const months = Math.round(rawMonths);
    if (rawMonths !== months) warnings.push(`Months to project was rounded to ${months}.`);
    if (current <= 0) warnings.push('Enter current monthly collections greater than zero.');
    if (months < 1) warnings.push('Project at least one month.');
    if (g <= -1) warnings.push('A monthly decline of 100% or more is not possible.');
    if (current <= 0 || months < 1 || g <= -1) {
      return { values: { projectedTotal: null, finalMonth: null, runRate: null, totalGrowthPct: null, gainOverFlat: null }, warnings };
    }
    if (Math.abs(g) > 0.1) warnings.push('Monthly growth above 10% compounds very quickly. Check that you entered a monthly rate, not an annual one.');
    const factor = 1 + g;
    const projectedTotal = g === 0 ? current * months : (current * factor * (Math.pow(factor, months) - 1)) / g;
    const finalMonth = current * Math.pow(factor, months);
    const runRate = finalMonth * 12;
    const totalGrowthPct = pct(finalMonth - current, current);
    const gainOverFlat = projectedTotal - current * months;
    notes.push(`If collections grow ${Math.round(g * 10000) / 100}% every month, the next ${months} months would bring in about ${usd(projectedTotal)}, ending at about ${usd(finalMonth)} a month.`);
    notes.push('This is an estimate. Seasonality is not modeled: real collections often dip around holidays and early in the year when patient deductibles reset.');
    if (g > 0) notes.push('Growth in collections usually depends on added capacity, such as providers, hours or services, or on collecting more of what you bill. Check that the rate is supported by a specific plan.');
    return {
      values: { projectedTotal, finalMonth, runRate, totalGrowthPct, gainOverFlat },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Month k collections = Current monthly collections x (1 + g)^k, for k = 1 to n', explanation: 'Month 1 is next month, already one month of growth above today.' },
    { expression: 'Projected total = Current x (1 + g) x ((1 + g)^n - 1) / g', explanation: 'The sum of all n projected months (a geometric series). When g is 0, the total is Current x n.' },
    { expression: 'Final month = Current x (1 + g)^n; Run rate = Final month x 12', explanation: 'The run rate shows the annual pace at the end of the period.' },
    { expression: 'Growth to final month = (Final month - Current) / Current x 100', explanation: 'Total compounded growth over the period.' },
    { expression: 'Gain over flat = Projected total - Current x n', explanation: 'Extra collections compared with no growth.' },
  ],
  example: {
    inputs: { currentMonthly: 100000, growthPct: 1, months: 12 },
    expected: { projectedTotal: 1280932.8, finalMonth: 112682.5, runRate: 1352190.04, totalGrowthPct: 12.68, gainOverFlat: 80932.8 },
    narrative:
      'A practice collects $100,000 a month and expects 1% monthly growth over 12 months. 1.01^12 = 1.126825, so the final month is 100,000 x 1.126825 = $112,682.50 and the run rate is 112,682.50 x 12 = $1,352,190.04 (12.68% above today). The projected total is 100,000 x 1.01 x (1.126825 - 1) / 0.01 = 100,000 x 12.809328 = $1,280,932.80, which is $80,932.80 more than 12 flat months of $1,200,000.',
  },
  assumptions: [
    'Collections grow at one constant compound monthly rate.',
    'Seasonality is not modeled. Holiday slowdowns and January deductible resets can make individual months differ substantially from the projection.',
    'The projection starts next month; the current month is the base and is not included in the total.',
    'Payer fee schedule changes, new contracts and provider changes are not modeled unless reflected in the growth rate.',
  ],
  faqs: [
    {
      q: 'How do you project annual revenue for a medical practice?',
      a: 'To project annual revenue, take current monthly collections and grow them at an expected monthly rate for each of the next 12 months, then add the months together. Compounding means each month grows from the previous month, not from today. Using collections rather than charges keeps the projection tied to cash the practice actually receives.',
    },
    {
      q: 'What is the difference between projected total and run rate?',
      a: 'The projected total is the sum of collections across all projected months, so it includes the slower early months. The run rate is the final month multiplied by 12, which shows the annual pace the practice reaches by the end of the period. With positive growth, the run rate is higher than the projected total.',
    },
    {
      q: 'Why does this projection not include seasonality?',
      a: 'The projection uses one steady growth rate to keep the math transparent. Real collections often vary by season, with dips around holidays and early in the year when deductibles reset and patients owe more. If your practice has strong seasonal patterns, compare the projection against the same months in prior years before relying on it.',
    },
    {
      q: 'What monthly growth rate should I use?',
      a: 'Use a growth rate based on your own history and specific plans, such as a new provider, added hours, a new service line or a collection improvement project. Small monthly rates compound into large annual changes: 1% a month is about 12.7% over a year. If you have no basis for growth, project with 0% first.',
    },
  ],
  relatedServices: ['rcm-analytics-reporting', 'revenue-cycle-management', 'practice-management-support', 'revenue-cycle-audit'],
  relatedTools: ['monthly-revenue-forecast-calculator', 'practice-revenue-calculator', 'revenue-per-provider-calculator', 'practice-profit-margin-calculator'],
  seoTitle: 'Annual Revenue Projection Calculator for Practices',
  metaDescription: 'Project 12 months of medical practice collections from current monthly collections and a compound growth rate, with the total, final month and run rate.',
  keywords: ['annual revenue projection calculator', 'medical practice revenue projection', 'compound monthly growth calculator', 'practice revenue run rate'],
};

export default calc;
