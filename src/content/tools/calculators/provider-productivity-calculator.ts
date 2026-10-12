import type { Calculator } from '../../types';
import { num, div } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'provider-productivity-calculator',
  name: 'Provider Productivity Calculator',
  category: 'kpi',
  icon: 'Gauge',
  summary: 'See visits per hour, collections per hour and per day, and optional wRVU output for a single provider.',
  definition:
    'A provider productivity calculator turns a provider\'s schedule into comparable measures: visits per hour, collections per hour, per day, per month and per year, and optionally work RVUs. Using the same transparent formulas for every provider makes it easier to compare schedules, plan staffing and review compensation models.',
  inputs: [
    { id: 'visitsPerDay', label: 'Visits per day', unit: 'count', default: 22, min: 0, step: 1, help: 'Average completed patient visits on a clinic day for one provider.' },
    { id: 'hoursPerDay', label: 'Clinical hours per day', unit: 'hours', default: 8, min: 0, max: 24, step: 0.5, help: 'Scheduled patient-facing hours on a clinic day, excluding lunch and administrative blocks.' },
    { id: 'daysPerMonth', label: 'Clinic days per month', unit: 'days', default: 18, min: 0, max: 31, step: 1, help: 'Days the provider sees patients in a typical month.' },
    { id: 'collectionsPerVisit', label: 'Average collections per visit', unit: 'usd', default: 105, min: 0, step: 1, help: 'Total collections for the provider over a period divided by visits in that period.' },
    { id: 'wrvuPerVisit', label: 'Average wRVUs per visit', unit: 'ratio', default: 1.3, min: 0, step: 0.05, optional: true, help: 'Optional. Average work RVUs per visit from your productivity reports. Leave blank to skip wRVU results.' },
  ],
  outputs: [
    { id: 'visitsPerHour', label: 'Visits per clinical hour', unit: 'ratio' },
    { id: 'collectionsPerDay', label: 'Collections per day', unit: 'usd', primary: true },
    { id: 'collectionsPerHour', label: 'Collections per clinical hour', unit: 'usd', primary: true },
    { id: 'monthlyCollections', label: 'Collections per month', unit: 'usd' },
    { id: 'annualCollections', label: 'Collections per year', unit: 'usd' },
    { id: 'wrvuPerDay', label: 'wRVUs per day', unit: 'ratio' },
    { id: 'annualWrvu', label: 'wRVUs per year', unit: 'ratio' },
    { id: 'collectionsPerWrvu', label: 'Collections per wRVU', unit: 'usd' },
  ],
  compute: (v) => {
    const visits = num(v.visitsPerDay);
    const hours = num(v.hoursPerDay);
    const days = num(v.daysPerMonth);
    const perVisit = num(v.collectionsPerVisit);
    const wrvu = num(v.wrvuPerVisit);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (visits < 0 || hours < 0 || days < 0 || perVisit < 0 || wrvu < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: { visitsPerHour: null, collectionsPerDay: null, collectionsPerHour: null, monthlyCollections: null, annualCollections: null, wrvuPerDay: null, annualWrvu: null, collectionsPerWrvu: null }, warnings };
    }
    if (hours > 24) warnings.push('Clinical hours per day cannot be more than 24.');
    if (days > 31) warnings.push('Clinic days per month cannot be more than 31.');
    if (hours === 0) warnings.push('Enter clinical hours per day to see per-hour results.');
    const visitsPerHour = div(visits, hours);
    if (visitsPerHour !== null && visitsPerHour > 8) warnings.push('More than 8 visits per hour is unusual. Check visits and hours.');
    const collectionsPerDay = visits * perVisit;
    const collectionsPerHour = div(collectionsPerDay, hours);
    const monthlyCollections = collectionsPerDay * days;
    const annualCollections = monthlyCollections * 12;
    const hasWrvu = wrvu > 0;
    const wrvuPerDay = hasWrvu ? visits * wrvu : null;
    const annualWrvu = hasWrvu ? visits * wrvu * days * 12 : null;
    const collectionsPerWrvu = hasWrvu ? div(perVisit, wrvu) : null;
    if (collectionsPerDay > 0) {
      notes.push('These figures are averages for one provider. Visit mix, payer mix and no-shows will move the actual numbers.');
      notes.push('Collections per hour is useful for comparing schedules, but it reflects payer rates and coding as well as provider effort.');
    }
    if (hasWrvu) notes.push('wRVUs measure work effort independent of payer rates, so they are often used alongside collections in compensation models.');
    return { values: { visitsPerHour, collectionsPerDay, collectionsPerHour, monthlyCollections, annualCollections, wrvuPerDay, annualWrvu, collectionsPerWrvu }, notes, warnings };
  },
  formula: [
    { expression: 'Visits per hour = Visits per day / Clinical hours per day', explanation: 'Throughput of the schedule.' },
    { expression: 'Collections per day = Visits per day x Collections per visit', explanation: 'Average money collected for one clinic day.' },
    { expression: 'Collections per hour = Collections per day / Clinical hours per day', explanation: 'Value of one scheduled clinical hour.' },
    { expression: 'Monthly collections = Collections per day x Clinic days per month; Annual = Monthly x 12', explanation: 'Scales the typical day to a month and year.' },
    { expression: 'wRVUs per day = Visits per day x wRVUs per visit; Annual wRVUs = wRVUs per day x Clinic days x 12', explanation: 'Only shown when wRVUs per visit is entered.' },
    { expression: 'Collections per wRVU = Collections per visit / wRVUs per visit', explanation: 'Money collected for each unit of work effort.' },
  ],
  example: {
    inputs: { visitsPerDay: 22, hoursPerDay: 8, daysPerMonth: 18, collectionsPerVisit: 105, wrvuPerVisit: 1.3 },
    expected: {
      visitsPerHour: 2.75,
      collectionsPerDay: 2310,
      collectionsPerHour: 288.75,
      monthlyCollections: 41580,
      annualCollections: 498960,
      wrvuPerDay: 28.6,
      annualWrvu: 6177.6,
      collectionsPerWrvu: 80.77,
    },
    narrative:
      'A provider sees 22 patients in 8 clinical hours: 22 / 8 = 2.75 visits per hour. At $105 per visit, a day brings in 22 x 105 = $2,310, or 2,310 / 8 = $288.75 per hour. Over 18 days that is 2,310 x 18 = $41,580 a month and 41,580 x 12 = $498,960 a year. At 1.3 wRVUs per visit, the provider produces 22 x 1.3 = 28.6 wRVUs a day and 28.6 x 18 x 12 = 6,177.6 a year, with 105 / 1.3 = $80.77 collected per wRVU.',
  },
  assumptions: [
    'All figures are for one provider and use averages for a typical clinic day.',
    'Collections per visit reflects actual money received, after contractual adjustments and denials.',
    'Annual figures assume 12 typical months with no allowance for vacation beyond what is reflected in clinic days per month.',
    'wRVU values come from your own reports; this calculator does not look up RVUs for specific codes.',
  ],
  faqs: [
    {
      q: 'How is provider productivity measured?',
      a: 'Provider productivity is usually measured with visits per day or hour, collections per provider and work RVUs. Visits show throughput, collections show financial output and wRVUs show work effort independent of payer rates. Looking at all three together gives a fairer picture than any single number, especially when providers see different patient mixes.',
    },
    {
      q: 'What is a wRVU?',
      a: 'A work relative value unit is the physician work component of the relative value units that CMS assigns to services in the Medicare Physician Fee Schedule. It reflects time, skill and effort. Many practices use wRVUs in compensation plans because they measure effort without depending on payer rates or collection performance.',
    },
    {
      q: 'Why does collections per hour differ between providers with the same visit count?',
      a: 'Collections depend on visit type, coding level, payer mix and how well claims are followed up, not only on how many patients a provider sees. A provider with more procedures or a stronger commercial payer mix may collect more per hour. Comparing wRVUs alongside collections helps separate effort from reimbursement.',
    },
    {
      q: 'Where do I get collections per visit for one provider?',
      a: 'Run a report in your practice management system of payments by rendering provider for a recent period, then divide by that provider\'s completed visits in the same period. Using three to six months smooths out payment timing. Make sure payments are attributed to the rendering provider rather than the billing provider.',
    },
  ],
  relatedServices: ['rcm-analytics-reporting', 'practice-management-support', 'medical-coding', 'appointment-scheduling'],
  relatedTools: ['revenue-per-provider-calculator', 'practice-revenue-calculator', 'rcm-performance-scorecard'],
  seoTitle: 'Provider Productivity Calculator: Visits, wRVUs',
  metaDescription: 'Calculate provider productivity: visits per hour, collections per hour, day, month and year, and optional wRVUs per day and collections per wRVU.',
  keywords: ['provider productivity calculator', 'collections per provider', 'wrvu productivity calculator'],
};

export default calc;
