import type { Calculator } from '../../types';
import { div, num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-billing-cost-calculator',
  name: 'Dental Billing Cost Calculator',
  category: 'dental',
  icon: 'Calculator',
  summary: 'Add up what in-house dental insurance billing costs you per year, per claim and as a share of collections.',
  definition:
    'This calculator estimates the full cost of running dental insurance billing in-house: billing staff wages and benefits, plus software, clearinghouse and other monthly expenses. It shows the annual total, the cost as a percentage of collections and, optionally, the cost per claim, so you can compare in-house billing with other options.',
  inputs: [
    { id: 'staffFte', label: 'Billing staff (full-time equivalents)', unit: 'count', default: 1.5, min: 0, step: 0.1, help: 'Total time spent on insurance billing, verification and follow-up, in full-time equivalents. One person half time is 0.5.' },
    { id: 'salary', label: 'Average annual wages per FTE', unit: 'usd', default: 45000, min: 0, step: 500, help: 'Your actual average pay for billing staff, before benefits.' },
    { id: 'benefitsPct', label: 'Benefits and payroll taxes', unit: 'pct', default: 25, min: 0, max: 100, step: 1, help: 'Employer payroll taxes, health insurance, paid time off and other benefits, as a percent of wages.' },
    { id: 'softwareMonthly', label: 'Software and clearinghouse per month', unit: 'usd', default: 400, min: 0, step: 10, help: 'Billing related software, clearinghouse, eligibility and attachment service fees.' },
    { id: 'otherMonthly', label: 'Other billing costs per month', unit: 'usd', default: 200, min: 0, step: 10, help: 'Statements, postage, training, equipment and similar costs.' },
    { id: 'monthlyCollections', label: 'Monthly collections', unit: 'usd', default: 80000, min: 0, step: 100, help: 'Average total collections per month.' },
    { id: 'claimsPerMonth', label: 'Insurance claims per month', unit: 'count', default: 600, min: 0, step: 1, optional: true, help: 'Optional. Used to calculate cost per claim.' },
  ],
  outputs: [
    { id: 'annualCost', label: 'Total annual billing cost', unit: 'usd', primary: true },
    { id: 'costPct', label: 'Billing cost as a share of collections', unit: 'pct', primary: true },
    { id: 'annualStaff', label: 'Annual staff cost', unit: 'usd' },
    { id: 'annualTech', label: 'Annual software and other costs', unit: 'usd' },
    { id: 'monthlyCost', label: 'Average monthly billing cost', unit: 'usd' },
    { id: 'costPerClaim', label: 'Cost per claim', unit: 'usd' },
  ],
  compute: (raw) => {
    const fte = num(raw.staffFte);
    const salary = num(raw.salary);
    const ben = num(raw.benefitsPct);
    const sw = num(raw.softwareMonthly);
    const other = num(raw.otherMonthly);
    const coll = num(raw.monthlyCollections);
    const claims = num(raw.claimsPerMonth);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([fte, salary, ben, sw, other, coll, claims].some((x) => x < 0)) warnings.push('Inputs should not be negative.');
    if (ben > 100) warnings.push('Benefits above 100% of wages are unusual. Check the percentage.');
    const valid = [fte, salary, ben, sw, other].every((x) => x >= 0);
    if (!valid) {
      return { values: { annualCost: null, costPct: null, annualStaff: null, annualTech: null, monthlyCost: null, costPerClaim: null }, warnings };
    }
    const annualStaff = (fte * salary * (100 + ben)) / 100;
    const annualTech = (sw + other) * 12;
    const annualCost = annualStaff + annualTech;
    const monthlyCost = annualCost / 12;
    const costPct = coll > 0 ? pct(annualCost, coll * 12) : null;
    const costPerClaim = claims > 0 ? div(annualCost, claims * 12) : null;
    if (coll <= 0) warnings.push('Enter monthly collections to see billing cost as a share of collections.');
    if (costPct !== null) {
      notes.push(`Estimated in-house billing cost is about ${costPct.toFixed(1)}% of collections. This is an estimate based on the costs you entered.`);
    }
    notes.push('This total does not include the cost of revenue lost to denials, write-offs or slow follow-up, which can matter as much as direct costs when comparing billing options.');
    return { values: { annualCost, costPct, annualStaff, annualTech, monthlyCost, costPerClaim }, notes, warnings };
  },
  formula: [
    { expression: 'Annual staff cost = FTEs x Wages x (1 + Benefits % / 100)', explanation: 'Fully loaded staff cost.' },
    { expression: 'Annual software and other = (Software per month + Other per month) x 12', explanation: 'Non-staff billing expenses.' },
    { expression: 'Annual billing cost = Staff cost + Software and other', explanation: 'Total direct cost of in-house billing.' },
    { expression: 'Cost share = Annual billing cost / (Monthly collections x 12) x 100', explanation: 'Billing cost relative to collections.' },
    { expression: 'Cost per claim = Annual billing cost / (Claims per month x 12)', explanation: 'Only shown when claim volume is entered.' },
  ],
  example: {
    inputs: { staffFte: 1.5, salary: 45000, benefitsPct: 25, softwareMonthly: 400, otherMonthly: 200, monthlyCollections: 80000, claimsPerMonth: 600 },
    expected: { annualCost: 91575, costPct: 9.54, annualStaff: 84375, annualTech: 7200, monthlyCost: 7631.25, costPerClaim: 12.72 },
    narrative: 'Staff cost is 1.5 x 45,000 = 67,500, plus 25% benefits = $84,375. Software and other costs are (400 + 200) x 12 = $7,200. Total annual cost is 84,375 + 7,200 = $91,575, or 91,575 / 12 = $7,631.25 a month. Annual collections are 80,000 x 12 = $960,000, so cost is 91,575 / 960,000 = 9.54% of collections. With 600 x 12 = 7,200 claims a year, cost per claim is 91,575 / 7,200 = $12.72.',
  },
  assumptions: [
    'Staff costs cover only time spent on billing, verification and follow-up, not other front office duties.',
    'Office space, management time and turnover or hiring costs are not included unless you add them to other monthly costs.',
    'Collections and claim volume are steady across the year.',
  ],
  faqs: [
    {
      q: 'What costs should I include in dental billing cost?',
      a: 'Include the wages and benefits of everyone who spends time on insurance billing, eligibility checks, claim attachments, posting and follow-up, measured as full-time equivalents. Add software, clearinghouse, eligibility and attachment service fees, statements, postage and training. Leaving out part-time contributions from front office staff is the most common reason in-house billing costs are underestimated.',
    },
    {
      q: 'How do I estimate billing staff as full-time equivalents?',
      a: 'Estimate the hours each person spends on billing tasks per week and divide the total by the hours in a full-time week, often 40. For example, one coordinator full time plus another team member spending 20 hours a week on claims is about 1.5 full-time equivalents. A one or two week time log gives a more reliable estimate.',
    },
    {
      q: 'Is cost per claim or cost as a percent of collections more useful?',
      a: 'Both are useful for different comparisons. Cost per claim shows efficiency regardless of fee levels and is helpful when claim volume changes. Cost as a percentage of collections is easier to compare with outsourcing proposals that are priced as a percentage. Looking at both helps avoid a decision driven by one number alone.',
    },
    {
      q: 'Does a lower billing cost always mean better billing?',
      a: 'No. A low direct cost can hide revenue lost through unworked denials, missed attachments, aging claims and write-offs. A complete comparison looks at both what billing costs and how much of net production is actually collected. Use the dental insurance collection calculator alongside this one to see the revenue side of the picture.',
    },
  ],
  relatedServices: ['dental-billing', 'practice-management-support', 'rcm-workflow-optimization'],
  relatedTools: ['dental-practice-roi-calculator', 'billing-staffing-cost-calculator', 'cost-per-claim-calculator'],
  seoTitle: 'Dental Billing Cost Calculator: In-House Cost',
  metaDescription: 'Estimate the annual cost of in-house dental billing, including staff, benefits and software, as a share of collections and per claim, with a worked example.',
  keywords: ['dental billing cost calculator', 'in-house dental billing cost', 'dental billing cost per claim'],
};

export default calc;
