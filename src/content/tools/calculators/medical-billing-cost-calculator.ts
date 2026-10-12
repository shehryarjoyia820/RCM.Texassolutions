import type { Calculator } from '../../types';
import { num, div, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'medical-billing-cost-calculator',
  name: 'Medical Billing Cost Calculator',
  category: 'cost',
  icon: 'Receipt',
  summary: 'Add up the full annual cost of in-house billing and see it per claim and as a share of collections.',
  definition:
    'A medical billing cost calculator totals what an in-house billing operation really costs in a year: staff salaries plus benefits, billing software, clearinghouse fees, training and overhead. It then expresses that total per claim submitted and as a percentage of collections, so you can compare it with other options.',
  inputs: [
    { id: 'salaries', label: 'Annual billing staff salaries', unit: 'usd', default: 120000, min: 0, step: 1000, help: 'Combined base pay for everyone who works on billing, coding, posting and follow-up. Count part-time staff by the share of time spent on billing.' },
    { id: 'benefitsPct', label: 'Benefits and payroll taxes', unit: 'pct', default: 25, min: 0, max: 100, step: 1, help: 'Health insurance, retirement, payroll taxes and paid time off as a percentage of salaries.' },
    { id: 'software', label: 'Annual billing software cost', unit: 'usd', default: 12000, min: 0, step: 100, help: 'Practice management or billing system licenses attributable to billing.' },
    { id: 'clearinghouse', label: 'Annual clearinghouse fees', unit: 'usd', default: 3600, min: 0, step: 100, help: 'Claim submission, eligibility and ERA fees.' },
    { id: 'training', label: 'Annual training and education', unit: 'usd', default: 2000, min: 0, step: 100, optional: true, help: 'Optional. Coding updates, payer webinars, courses and credential renewals.' },
    { id: 'overhead', label: 'Annual overhead allocated to billing', unit: 'usd', default: 10000, min: 0, step: 500, optional: true, help: 'Optional. Share of rent, equipment, IT, postage, statements and supplies used by the billing team.' },
    { id: 'annualClaims', label: 'Claims submitted per year', unit: 'count', default: 20000, min: 0, step: 100, help: 'Total claims sent to payers in a year, including secondary claims.' },
    { id: 'annualCollections', label: 'Annual collections', unit: 'usd', default: 2400000, min: 0, step: 10000, help: 'Total payments received in the same year, from payers and patients.' },
  ],
  outputs: [
    { id: 'loadedStaffCost', label: 'Staff cost including benefits', unit: 'usd' },
    { id: 'totalAnnualCost', label: 'Total annual billing cost', unit: 'usd', primary: true },
    { id: 'monthlyCost', label: 'Average monthly billing cost', unit: 'usd' },
    { id: 'costPerClaim', label: 'Cost per claim submitted', unit: 'usd', primary: true },
    { id: 'costPctCollections', label: 'Billing cost as a percentage of collections', unit: 'pct' },
  ],
  compute: (v) => {
    const salaries = num(v.salaries);
    const benefits = num(v.benefitsPct);
    const software = num(v.software);
    const ch = num(v.clearinghouse);
    const training = num(v.training);
    const overhead = num(v.overhead);
    const claims = num(v.annualClaims);
    const collections = num(v.annualCollections);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([salaries, benefits, software, ch, training, overhead, claims, collections].some((x) => x < 0)) {
      warnings.push('Inputs cannot be negative.');
      return { values: { loadedStaffCost: null, totalAnnualCost: null, monthlyCost: null, costPerClaim: null, costPctCollections: null }, warnings };
    }
    if (benefits > 60) warnings.push('Benefits above 60% of salaries are unusual. Check the figure.');
    const loadedStaffCost = salaries * (1 + benefits / 100);
    const totalAnnualCost = loadedStaffCost + software + ch + training + overhead;
    const monthlyCost = totalAnnualCost / 12;
    const costPerClaim = div(totalAnnualCost, claims);
    const costPctCollections = pct(totalAnnualCost, collections);
    if (claims === 0) warnings.push('Enter claims submitted per year to see cost per claim.');
    if (collections === 0) warnings.push('Enter annual collections to see cost as a percentage of collections.');
    if (costPctCollections !== null && costPctCollections > 100) warnings.push('Billing cost is higher than collections. Check that both figures cover the same year.');
    if (totalAnnualCost > 0) {
      notes.push('This is an estimate of direct and allocated costs. It does not include the cost of revenue lost to denials, missed charges or slow follow-up.');
      if (loadedStaffCost > 0) notes.push(`Staff with benefits make up ${Math.round((loadedStaffCost / totalAnnualCost) * 100)}% of the total, which is typically the largest driver of in-house billing cost.`);
    }
    return { values: { loadedStaffCost, totalAnnualCost, monthlyCost, costPerClaim, costPctCollections }, notes, warnings };
  },
  formula: [
    { expression: 'Staff cost = Salaries x (1 + Benefits %)', explanation: 'Fully loaded labor cost.' },
    { expression: 'Total annual cost = Staff cost + Software + Clearinghouse + Training + Overhead', explanation: 'Every cost of running billing in-house for a year.' },
    { expression: 'Monthly cost = Total annual cost / 12', explanation: 'Average per month.' },
    { expression: 'Cost per claim = Total annual cost / Claims submitted per year', explanation: 'What each submitted claim costs to produce and follow up.' },
    { expression: 'Cost as % of collections = Total annual cost / Annual collections x 100', explanation: 'Lets you compare in-house cost with percentage-of-collections pricing.' },
  ],
  example: {
    inputs: { salaries: 120000, benefitsPct: 25, software: 12000, clearinghouse: 3600, training: 2000, overhead: 10000, annualClaims: 20000, annualCollections: 2400000 },
    expected: { loadedStaffCost: 150000, totalAnnualCost: 177600, monthlyCost: 14800, costPerClaim: 8.88, costPctCollections: 7.4 },
    narrative:
      'Billing salaries of $120,000 plus 25% benefits give a staff cost of 120,000 x 1.25 = $150,000. Adding software ($12,000), clearinghouse ($3,600), training ($2,000) and overhead ($10,000) gives $177,600 a year, or 177,600 / 12 = $14,800 a month. Spread over 20,000 claims that is $8.88 per claim, and against $2,400,000 in collections it is 177,600 / 2,400,000 = 7.40%.',
  },
  assumptions: [
    'All amounts cover the same 12-month period.',
    'Salaries include only the share of each person\'s time spent on billing work.',
    'Overhead is an allocation you choose; there is no single correct method.',
    'Cost per claim uses claims submitted, so resubmitted and secondary claims lower the figure if they are counted.',
  ],
  faqs: [
    {
      q: 'What does in-house medical billing really cost?',
      a: 'The true cost is staff salaries plus benefits and payroll taxes, billing software, clearinghouse fees, training and a share of overhead such as space and equipment. Many practices only count salaries, which understates the total. This calculator adds every category and shows the result per claim and as a percentage of collections so you can compare options fairly.',
    },
    {
      q: 'How do I estimate the benefits percentage?',
      a: 'Add employer costs for health insurance, retirement contributions, payroll taxes, workers compensation and paid time off for your billing staff, then divide by their total salaries. Your payroll provider or accountant can usually produce this figure. If you do not have it, enter your best estimate and treat the result as approximate.',
    },
    {
      q: 'Why look at billing cost as a percentage of collections?',
      a: 'Many outsourced billing services price their work as a percentage of collections, so expressing your in-house cost the same way makes a direct comparison possible. It also shows how billing cost scales with revenue. Keep in mind that cost is only half the picture; collection performance matters as much as the cost of producing claims.',
    },
    {
      q: 'Should I include the cost of turnover and vacancies?',
      a: 'If billing staff turnover is common in your practice, it is reasonable to add recruiting, onboarding and temporary coverage costs to overhead or training. Vacancies can also slow claim follow-up, which shows up as lost or delayed collections rather than direct cost. The revenue leakage estimator can help size that second effect.',
    },
  ],
  relatedServices: ['medical-billing', 'revenue-cycle-management', 'rcm-workflow-optimization'],
  relatedTools: ['outsourcing-vs-in-house-billing-calculator', 'cost-per-claim-calculator', 'billing-staffing-cost-calculator', 'rcm-roi-calculator'],
  seoTitle: 'Medical Billing Cost Calculator (In-House)',
  metaDescription: 'Total your in-house medical billing cost: staff with benefits, software, clearinghouse, training and overhead, per claim and as a percent of collections.',
  keywords: ['medical billing cost calculator', 'in-house billing cost', 'cost of medical billing staff'],
};

export default calc;
