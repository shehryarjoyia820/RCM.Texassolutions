import type { Calculator } from '../../types';
import { num } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'monthly-revenue-forecast-calculator',
  name: 'Monthly Revenue Forecast Calculator',
  category: 'revenue',
  icon: 'CalendarRange',
  summary: 'Forecast next month\'s collections from charges, contractual adjustments, net collection rate, payment lag and charge growth.',
  definition:
    'A monthly revenue forecast estimates the cash a practice will collect next month. This calculator converts charges into expected collections by removing contractual adjustments and applying your net collection rate, and uses the average payment lag to decide which month\'s charges are being paid, with an optional monthly growth rate in charges.',
  inputs: [
    { id: 'monthlyCharges', label: 'Gross charges this month', unit: 'usd', default: 500000, min: 0, step: 1000, help: 'Charges billed in the current month at your fee schedule. Use a recent monthly average if this month is unusual.' },
    { id: 'contractualAdjPct', label: 'Contractual adjustments as a percent of charges', unit: 'pct', default: 40, min: 0, max: 100, step: 0.5, help: 'Average contractual write-down as a share of gross charges over recent months (contractual adjustments / charges x 100).' },
    { id: 'ncrPct', label: 'Expected net collection rate', unit: 'pct', default: 95, min: 0, max: 100, step: 0.5, help: 'Share of collectible revenue you expect to actually collect, from your recent net collection rate.' },
    { id: 'paymentLagMonths', label: 'Average payment lag', unit: 'months', default: 1, min: 0, max: 6, step: 0.5, help: 'Typical months between billing a charge and receiving payment. Days in AR divided by 30 is a reasonable starting point.' },
    { id: 'growthPct', label: 'Monthly growth in charges', unit: 'pct', default: 2, min: -50, max: 100, step: 0.5, optional: true, help: 'Expected month-over-month change in charges. Use a negative number for a decline. Leave blank for flat volume.' },
  ],
  outputs: [
    { id: 'forecastCollections', label: 'Forecast collections next month', unit: 'usd', primary: true },
    { id: 'sourceCharges', label: 'Charges being paid next month', unit: 'usd', help: 'Charges from roughly one payment lag before next month, after growth is applied.' },
    { id: 'collectibleRevenue', label: 'Collectible revenue from those charges', unit: 'usd', help: 'Charges being paid minus contractual adjustments.' },
    { id: 'nextMonthCharges', label: 'Forecast charges next month', unit: 'usd' },
    { id: 'futureCollectionsFromNextMonth', label: 'Expected eventual collections from next month\'s charges', unit: 'usd', help: 'Cash that next month\'s charges should bring in later, after the payment lag.' },
  ],
  compute: (v) => {
    const charges = num(v.monthlyCharges);
    const adj = num(v.contractualAdjPct) / 100;
    const ncr = num(v.ncrPct) / 100;
    const lag = num(v.paymentLagMonths);
    const g = num(v.growthPct) / 100;
    const warnings: string[] = [];
    const notes: string[] = [];
    if (charges <= 0) warnings.push('Enter gross charges greater than zero.');
    if (adj < 0 || adj > 1) warnings.push('Contractual adjustments must be between 0% and 100% of charges.');
    if (ncr < 0 || ncr > 1) warnings.push('Net collection rate must be between 0% and 100%.');
    if (lag < 0) warnings.push('Payment lag cannot be negative.');
    if (g <= -1) warnings.push('Growth of -100% or lower is not possible.');
    if (charges <= 0 || adj < 0 || adj > 1 || ncr < 0 || ncr > 1 || lag < 0 || g <= -1) {
      return { values: { forecastCollections: null, sourceCharges: null, collectibleRevenue: null, nextMonthCharges: null, futureCollectionsFromNextMonth: null }, warnings };
    }
    if (ncr > 0 && ncr < 0.8) warnings.push('A net collection rate below 80% is unusually low. Check that the rate excludes only contractual adjustments.');
    // Month 0 is this month, month 1 is next month. Charges in month t = charges x (1 + g)^t.
    // Collections in month 1 come from charges in month (1 - lag).
    const nextMonthCharges = charges * (1 + g);
    const sourceCharges = charges * Math.pow(1 + g, 1 - lag);
    const collectibleRevenue = sourceCharges * (1 - adj);
    const forecastCollections = collectibleRevenue * ncr;
    const futureCollectionsFromNextMonth = nextMonthCharges * (1 - adj) * ncr;
    notes.push(`Next month you can expect roughly ${usd(forecastCollections)} in collections, based on charges billed about ${lag} month${lag === 1 ? '' : 's'} earlier. This is an estimate, not a guarantee of cash.`);
    if (g !== 0) {
      notes.push(`With ${g > 0 ? 'growth' : 'a decline'} of ${Math.round(Math.abs(g * 100) * 100) / 100}% a month, next month's charges should bring in about ${usd(futureCollectionsFromNextMonth)} once they are paid, which arrives after the payment lag.`);
    }
    notes.push('Holidays, payer processing delays, denial spikes and deductible resets in January can move actual collections well away from this forecast.');
    return {
      values: { forecastCollections, sourceCharges, collectibleRevenue, nextMonthCharges, futureCollectionsFromNextMonth },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Next month charges = Current charges x (1 + Growth %)', explanation: 'Charges grow at a constant monthly rate.' },
    { expression: 'Charges being paid next month = Current charges x (1 + Growth %)^(1 - Payment lag)', explanation: 'Collections next month come from charges billed one payment lag earlier. With a one-month lag, that is this month\'s charges.' },
    { expression: 'Collectible revenue = Charges being paid x (1 - Contractual adjustment %)', explanation: 'Removes amounts you are not contractually entitled to collect.' },
    { expression: 'Forecast collections = Collectible revenue x Net collection rate', explanation: 'Applies the share of collectible revenue you actually collect.' },
    { expression: 'Eventual collections from next month = Next month charges x (1 - Contractual adjustment %) x Net collection rate', explanation: 'What next month\'s charges should bring in once paid.' },
  ],
  example: {
    inputs: { monthlyCharges: 500000, contractualAdjPct: 40, ncrPct: 95, paymentLagMonths: 1, growthPct: 2 },
    expected: { forecastCollections: 285000, sourceCharges: 500000, collectibleRevenue: 300000, nextMonthCharges: 510000, futureCollectionsFromNextMonth: 290700 },
    narrative:
      'A practice bills $500,000 this month, writes down 40% to contracted rates, collects 95% of what is collectible and is paid about one month after billing. Next month\'s collections come from this month\'s charges: 500,000 x (1 - 0.40) = $300,000 collectible, and 300,000 x 0.95 = $285,000 forecast. With 2% growth, next month\'s charges are 500,000 x 1.02 = $510,000, which should eventually bring in 510,000 x 0.60 x 0.95 = $290,700.',
  },
  assumptions: [
    'All charges are paid after the same average lag. In reality payments spread over several months; the single lag is a simplification.',
    'Contractual adjustment and net collection rates stay at their recent averages.',
    'Charges change at a constant monthly rate. Seasonality, provider absences and payer mix shifts are not modeled.',
    'Fractional lags are handled by applying growth for part of a month.',
  ],
  faqs: [
    {
      q: 'How do you forecast monthly collections for a medical practice?',
      a: 'To forecast monthly collections, start with the charges that will be paid next month, which are usually those billed one payment lag earlier. Subtract contractual adjustments to get collectible revenue, then multiply by your net collection rate. Using your own recent averages for each rate keeps the forecast grounded in how your payers actually pay.',
    },
    {
      q: 'What is payment lag and how do I estimate it?',
      a: 'Payment lag is the typical time between billing a charge and receiving payment. Days in accounts receivable divided by 30 is a practical estimate in months. A practice with 30 days in AR has roughly a one-month lag, so this month\'s charges mostly turn into next month\'s collections.',
    },
    {
      q: 'Why do collections not rise immediately when charges grow?',
      a: 'Collections trail charges by the payment lag, so growth in charges shows up in cash a month or more later. A practice that adds a provider or extends hours often sees charges rise first and collections catch up afterward. Plan cash flow for that gap, especially when new costs start before new payments arrive.',
    },
    {
      q: 'How accurate is a monthly revenue forecast?',
      a: 'A monthly revenue forecast is an estimate, and its accuracy depends on how stable your charges, adjustments and collection rate are. It works best in steady months and is less reliable around holidays, at the start of the year when deductibles reset, or during payer or system changes. Compare forecast with actual each month and adjust the inputs.',
    },
  ],
  relatedServices: ['rcm-analytics-reporting', 'revenue-cycle-management', 'accounts-receivable-management', 'payment-posting'],
  relatedTools: ['annual-revenue-projection-calculator', 'net-collection-rate-calculator', 'days-in-ar-calculator', 'practice-revenue-calculator'],
  seoTitle: 'Monthly Revenue Forecast Calculator for Practices',
  metaDescription: 'Forecast next month\'s collections from charges, contractual adjustments, net collection rate, payment lag and growth, with the formula and a worked example.',
  keywords: ['monthly revenue forecast calculator', 'medical practice collections forecast', 'cash flow forecast medical practice', 'forecast collections from charges'],
};

export default calc;
