import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-practice-revenue-calculator',
  name: 'Dental Practice Revenue Calculator',
  category: 'dental',
  icon: 'Smile',
  summary: 'Estimate monthly and annual dental collections from doctor and hygiene production per day.',
  definition:
    'This calculator estimates dental practice revenue from daily doctor and hygiene production, the number of clinical days per month, PPO and other write-offs, and your collection percentage. It turns scheduled production into an estimate of net production and actual collections, which is the money the practice can expect to receive.',
  inputs: [
    { id: 'doctorPerDay', label: 'Doctor production per day', unit: 'usd', default: 4500, min: 0, step: 50, help: 'Average gross production per clinical day for all dentists combined, at your full fee schedule.' },
    { id: 'hygienePerDay', label: 'Hygiene production per day', unit: 'usd', default: 1500, min: 0, step: 50, help: 'Average gross hygiene production per clinical day for all hygienists combined.' },
    { id: 'daysPerMonth', label: 'Clinical days per month', unit: 'days', default: 16, min: 0, max: 31, step: 1, help: 'Days the practice sees patients each month.' },
    { id: 'writeOffPct', label: 'PPO and other adjustments', unit: 'pct', default: 20, min: 0, max: 100, step: 0.5, help: 'Write-offs to PPO fee schedules and other contractual adjustments, as a percent of gross production.' },
    { id: 'collectionPct', label: 'Collection percentage of net production', unit: 'pct', default: 98, min: 0, max: 100, step: 0.5, help: 'Share of net production (after write-offs) that is actually collected.' },
  ],
  outputs: [
    { id: 'monthlyCollections', label: 'Estimated monthly collections', unit: 'usd', primary: true },
    { id: 'annualCollections', label: 'Estimated annual collections', unit: 'usd', primary: true },
    { id: 'monthlyGross', label: 'Monthly gross production', unit: 'usd' },
    { id: 'monthlyNet', label: 'Monthly net production', unit: 'usd' },
    { id: 'hygieneShare', label: 'Hygiene share of production', unit: 'pct' },
  ],
  compute: (raw) => {
    const doc = num(raw.doctorPerDay);
    const hyg = num(raw.hygienePerDay);
    const days = num(raw.daysPerMonth);
    const wo = num(raw.writeOffPct);
    const col = num(raw.collectionPct);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (doc < 0 || hyg < 0 || days < 0) warnings.push('Production and days should not be negative.');
    if (days > 31) warnings.push('Clinical days per month cannot exceed 31.');
    if (wo < 0 || wo > 100 || col < 0 || col > 100) warnings.push('Percentages must be between 0 and 100.');
    const valid = doc >= 0 && hyg >= 0 && days >= 0 && days <= 31 && wo >= 0 && wo <= 100 && col >= 0 && col <= 100;
    if (!valid) {
      return { values: { monthlyCollections: null, annualCollections: null, monthlyGross: null, monthlyNet: null, hygieneShare: null }, warnings };
    }
    const daily = doc + hyg;
    const monthlyGross = daily * days;
    const monthlyNet = (monthlyGross * (100 - wo)) / 100;
    const monthlyCollections = (monthlyNet * col) / 100;
    const annualCollections = monthlyCollections * 12;
    const hygieneShare = daily > 0 ? pct(hyg, daily) : null;
    if (monthlyGross > 0) {
      notes.push(`These are estimates: about $${Math.round(monthlyCollections).toLocaleString('en-US')} a month if production, write-offs and collection rates hold steady.`);
      notes.push('Collections lag production, often by several weeks for insurance claims, so actual monthly deposits will move up and down around this estimate.');
    }
    return { values: { monthlyCollections, annualCollections, monthlyGross, monthlyNet, hygieneShare }, notes, warnings };
  },
  formula: [
    { expression: 'Monthly gross production = (Doctor production per day + Hygiene production per day) x Clinical days per month', explanation: 'Production at your full fee schedule.' },
    { expression: 'Monthly net production = Monthly gross production x (1 - Write-off % / 100)', explanation: 'Removes PPO and other contractual write-offs.' },
    { expression: 'Monthly collections = Monthly net production x Collection % / 100', explanation: 'What the practice is expected to actually receive.' },
    { expression: 'Annual collections = Monthly collections x 12', explanation: 'Assumes a steady schedule all year.' },
    { expression: 'Hygiene share = Hygiene production per day / Total production per day x 100', explanation: 'Shows how much of the practice\'s production comes from hygiene.' },
  ],
  example: {
    inputs: { doctorPerDay: 4500, hygienePerDay: 1500, daysPerMonth: 16, writeOffPct: 20, collectionPct: 98 },
    expected: { monthlyCollections: 75264, annualCollections: 903168, monthlyGross: 96000, monthlyNet: 76800, hygieneShare: 25 },
    narrative: 'Daily production is 4,500 + 1,500 = $6,000, so monthly gross production is 6,000 x 16 = $96,000. After 20% write-offs, net production is 96,000 x 0.80 = $76,800. At a 98% collection rate, monthly collections are 76,800 x 0.98 = $75,264, or 75,264 x 12 = $903,168 a year. Hygiene is 1,500 / 6,000 = 25% of production.',
  },
  assumptions: [
    'Production per day and clinical days stay constant for the year. Vacations, holidays and seasonal changes are not modeled.',
    'Write-offs are a flat percent of gross production. In practice they vary by payer and procedure mix.',
    'The collection percentage covers both insurance and patient portions of net production.',
  ],
  faqs: [
    {
      q: 'What is the difference between dental production and collections?',
      a: 'Production is the value of the dentistry performed, usually at the practice\'s full fee schedule. Collections are the payments actually received from insurers and patients. The gap between them comes from PPO write-offs, other adjustments and balances that are never paid. Collections are what pay the bills, so revenue planning should start from expected collections, not production.',
    },
    {
      q: 'Why separate doctor and hygiene production?',
      a: 'Doctor and hygiene production are driven by different schedules and staffing, so tracking them separately makes the estimate easier to adjust. Hygiene also feeds the doctor schedule, because periodic exams often lead to restorative treatment. Seeing the hygiene share of production helps practices judge whether the hygiene schedule is full and whether it supports doctor production.',
    },
    {
      q: 'What write-off percentage should I enter?',
      a: 'Enter your own write-off percentage from your practice management reports, calculated as PPO and other contractual adjustments divided by gross production for a recent period. It depends heavily on how many PPO plans you participate in and how far their fee schedules are below your full fees. Fee-for-service practices may have very low write-offs.',
    },
    {
      q: 'How accurate is this dental revenue estimate?',
      a: 'It is a planning estimate, not a forecast. It assumes production per day, clinical days, write-offs and collection rates stay steady. Real collections vary with schedule changes, case acceptance, payer mix and insurance payment timing. Using your actual averages from the last six to twelve months generally gives a more realistic result than using target numbers.',
    },
  ],
  relatedServices: ['dental-billing', 'insurance-eligibility-verification', 'rcm-analytics-reporting'],
  relatedTools: ['dental-insurance-collection-calculator', 'dental-practice-roi-calculator', 'dental-billing-cost-calculator'],
  seoTitle: 'Dental Practice Revenue Calculator',
  metaDescription: 'Estimate monthly and annual dental collections from doctor and hygiene production per day, clinical days, PPO write-offs and your collection percentage.',
  keywords: ['dental practice revenue calculator', 'dental production calculator', 'dental collections estimate'],
};

export default calc;
