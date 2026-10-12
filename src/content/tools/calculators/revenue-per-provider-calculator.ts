import type { Calculator } from '../../types';
import { div, num } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'revenue-per-provider-calculator',
  name: 'Revenue per Provider Calculator',
  category: 'kpi',
  icon: 'Users',
  summary: 'Divide total collections by full-time equivalent providers to see monthly and annual revenue per provider.',
  definition:
    'Revenue per provider is total collections divided by the number of full-time equivalent (FTE) billing providers. It shows how much cash each provider generates on average, which helps a practice compare locations, plan hiring and spot productivity or payment problems. This calculator converts any period into monthly and annualized figures.',
  inputs: [
    { id: 'collections', label: 'Total collections for the period', unit: 'usd', default: 2400000, min: 0, step: 1000, help: 'Payer and patient payments received during the period, net of refunds.' },
    { id: 'periodMonths', label: 'Length of the period', unit: 'months', default: 12, min: 1, max: 60, step: 1, help: 'How many months the collections figure covers, for example 12 for a full year or 3 for a quarter.' },
    { id: 'fteProviders', label: 'Full-time equivalent providers', unit: 'count', default: 4, min: 0.1, step: 0.1, help: 'Billing providers expressed as FTEs. A provider working half time counts as 0.5. Include physicians and advanced practice providers who bill under their own NPI.' },
  ],
  outputs: [
    { id: 'annualPerProvider', label: 'Annual collections per FTE provider', unit: 'usd', primary: true },
    { id: 'monthlyPerProvider', label: 'Monthly collections per FTE provider', unit: 'usd', primary: true },
    { id: 'annualizedCollections', label: 'Annualized practice collections', unit: 'usd' },
    { id: 'monthlyCollections', label: 'Average monthly practice collections', unit: 'usd' },
  ],
  compute: (v) => {
    const collections = num(v.collections);
    const months = num(v.periodMonths);
    const fte = num(v.fteProviders);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (collections < 0) warnings.push('Collections should not be negative.');
    if (months <= 0) warnings.push('Enter a period of at least one month.');
    if (fte <= 0) warnings.push('Enter at least some provider FTE, for example 1 for one full-time provider.');
    const monthlyCollections = months > 0 ? div(collections, months) : null;
    const annualizedCollections = monthlyCollections === null ? null : monthlyCollections * 12;
    const monthlyPerProvider = monthlyCollections === null || fte <= 0 ? null : div(monthlyCollections, fte);
    const annualPerProvider = monthlyPerProvider === null ? null : monthlyPerProvider * 12;
    if (months > 0 && months < 12) {
      notes.push('The annual figure is extrapolated from a period shorter than a year, so seasonal swings can make it higher or lower than a true 12-month result.');
    }
    if (annualPerProvider !== null) {
      notes.push(`Each FTE provider brings in about ${usd(annualPerProvider)} a year on average. This is an average: individual providers can differ widely by specialty, schedule and payer mix.`);
    }
    if (fte > 0 && fte !== Math.round(fte)) {
      notes.push('Fractional FTEs are fine. Make sure part-time providers are counted by hours worked, not as whole people.');
    }
    return {
      values: { annualPerProvider, monthlyPerProvider, annualizedCollections, monthlyCollections },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Monthly collections = Collections / Months in period', explanation: 'Converts any period to an average month.' },
    { expression: 'Monthly collections per provider = Monthly collections / FTE providers', explanation: 'Average cash generated per full-time equivalent provider each month.' },
    { expression: 'Annual collections per provider = Monthly collections per provider x 12', explanation: 'Annualizes the monthly average.' },
    { expression: 'Annualized collections = Monthly collections x 12', explanation: 'Practice-level annual run rate.' },
  ],
  example: {
    inputs: { collections: 2400000, periodMonths: 12, fteProviders: 4 },
    expected: { annualPerProvider: 600000, monthlyPerProvider: 50000, annualizedCollections: 2400000, monthlyCollections: 200000 },
    narrative:
      'A practice with 4 FTE providers collected $2,400,000 over 12 months. Average monthly collections are 2,400,000 / 12 = $200,000, so each provider averages 200,000 / 4 = $50,000 a month, or 50,000 x 12 = $600,000 a year.',
  },
  assumptions: [
    'Uses collections (cash received), not charges or wRVUs.',
    'All collections are attributed to billing providers. Revenue from ancillary services, such as lab or imaging, is spread across providers unless you remove it first.',
    'FTE counts are averaged over the period. If providers joined or left mid-period, use the average FTE for the period.',
    'Annualizing a short period assumes the rest of the year looks the same.',
  ],
  faqs: [
    {
      q: 'How do you calculate revenue per provider?',
      a: 'Revenue per provider is calculated by dividing total collections for a period by the number of full-time equivalent providers who billed during that period. To compare periods of different lengths, first convert collections to a monthly average, then multiply by 12 for an annual figure. Using FTEs rather than headcount keeps part-time providers from distorting the result.',
    },
    {
      q: 'Should I use collections or charges?',
      a: 'Collections are usually the better choice because they show cash actually received. Charges depend on your fee schedule, which is often set well above what payers pay, so two practices with identical cash could show very different charge totals. If you want to measure work volume rather than cash, use wRVUs per provider instead.',
    },
    {
      q: 'How do I count part-time providers?',
      a: 'Count part-time providers by the share of a full schedule they work. A provider working three days in a five-day week is about 0.6 FTE. Use the same definition of a full-time schedule for everyone, and average FTE across the period if staffing changed, so the per-provider figure reflects actual capacity.',
    },
    {
      q: 'Why is revenue per provider dropping when visits are steady?',
      a: 'Revenue per provider can drop with steady visits when payments per visit fall. Common causes include more denials, slower claim follow-up, a shift toward lower-paying payers, coding that undercaptures the work performed, or payer fee schedule cuts. Comparing net collection rate, days in AR and payer mix over the same months usually shows which one is responsible.',
    },
  ],
  relatedServices: ['rcm-analytics-reporting', 'revenue-cycle-management', 'medical-coding', 'revenue-cycle-audit'],
  relatedTools: ['provider-productivity-calculator', 'practice-profit-margin-calculator', 'payer-mix-calculator', 'net-collection-rate-calculator'],
  seoTitle: 'Revenue per Provider Calculator (Monthly and Annual)',
  metaDescription: 'Calculate collections per full-time equivalent provider, monthly and annual, from total collections and provider FTEs, with the formula and a worked example.',
  keywords: ['revenue per provider calculator', 'collections per provider', 'revenue per physician', 'provider fte revenue'],
};

export default calc;
