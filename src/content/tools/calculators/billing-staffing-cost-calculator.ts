import type { Calculator } from '../../types';
import { div, num } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'billing-staffing-cost-calculator',
  name: 'Medical Billing Staffing Cost Calculator',
  category: 'cost',
  icon: 'UserPlus',
  summary: 'Estimate how many billing FTEs your claim volume needs and what they cost with benefits, payroll taxes, PTO coverage and turnover.',
  definition:
    'Medical billing staffing cost is the fully loaded annual cost of the people who submit claims, post payments and work denials. This calculator estimates the billing FTEs your claim volume requires, adds coverage for paid time off, then applies benefits, employer payroll taxes and turnover costs to show annual, monthly and per-claim cost.',
  inputs: [
    { id: 'monthlyClaims', label: 'Claims per month', unit: 'count', default: 4000, min: 0, step: 50, help: 'Claims submitted per month, including secondary claims if your staff works them.' },
    { id: 'claimsPerFte', label: 'Claims one billing FTE handles per month', unit: 'count', default: 1000, min: 1, step: 50, help: 'Your own measured throughput per full-time biller, covering submission, follow-up, posting and denials. It varies widely with specialty, payer mix and automation, so use your own data if you have it.' },
    { id: 'salary', label: 'Average annual salary per FTE', unit: 'usd', default: 48000, min: 0, step: 500, help: 'Base wages for one full-time billing employee. Check local pay data, such as BLS wage figures for your area.' },
    { id: 'benefitsPct', label: 'Benefits as a percent of salary', unit: 'pct', default: 20, min: 0, max: 100, step: 1, help: 'Health insurance, retirement contributions and other benefits, as a percent of salary.' },
    { id: 'payrollTaxPct', label: 'Employer payroll taxes', unit: 'pct', default: 8, min: 0, max: 30, step: 0.1, help: 'Employer FICA is 7.65% (6.2% Social Security plus 1.45% Medicare). Add federal and state unemployment and any local taxes.' },
    { id: 'ptoCoveragePct', label: 'Extra capacity to cover paid time off', unit: 'pct', default: 10, min: 0, max: 50, step: 1, help: 'Additional staffing needed so claims keep moving during vacation, holidays and sick days. For example, 10 adds 10% to the FTE count.' },
    { id: 'turnoverPct', label: 'Annual staff turnover', unit: 'pct', default: 20, min: 0, max: 100, step: 1, help: 'Share of billing staff you replace in a typical year.' },
    { id: 'hiringCost', label: 'Cost to replace one employee', unit: 'usd', default: 5000, min: 0, step: 100, help: 'Recruiting, onboarding, training time and lost productivity while a new hire ramps up.' },
    { id: 'otherPerFte', label: 'Other annual cost per FTE', unit: 'usd', default: 0, min: 0, step: 100, optional: true, help: 'Software seats, equipment, workspace and continuing education per FTE. Leave blank if these are budgeted elsewhere.' },
  ],
  outputs: [
    { id: 'baseFte', label: 'Billing FTEs needed for claim volume', unit: 'count' },
    { id: 'totalFte', label: 'Billing FTEs including PTO coverage', unit: 'count', primary: true },
    { id: 'loadedCostPerFte', label: 'Loaded annual cost per FTE', unit: 'usd', help: 'Salary plus benefits and payroll taxes, plus other cost per FTE.' },
    { id: 'annualTurnoverCost', label: 'Annual turnover cost', unit: 'usd' },
    { id: 'annualCost', label: 'Total annual staffing cost', unit: 'usd', primary: true },
    { id: 'monthlyCost', label: 'Monthly staffing cost', unit: 'usd' },
    { id: 'costPerClaim', label: 'Staffing cost per claim', unit: 'usd' },
  ],
  compute: (v) => {
    const claims = num(v.monthlyClaims);
    const perFte = num(v.claimsPerFte);
    const salary = num(v.salary);
    const benefits = num(v.benefitsPct) / 100;
    const tax = num(v.payrollTaxPct) / 100;
    const pto = num(v.ptoCoveragePct) / 100;
    const turnover = num(v.turnoverPct) / 100;
    const hiring = num(v.hiringCost);
    const other = num(v.otherPerFte);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([claims, salary, benefits, tax, pto, turnover, hiring, other].some((x) => x < 0)) warnings.push('Values should not be negative. Check the figures.');
    if (perFte <= 0) {
      warnings.push('Enter how many claims one billing FTE handles per month.');
      return { values: { baseFte: null, totalFte: null, loadedCostPerFte: null, annualTurnoverCost: null, annualCost: null, monthlyCost: null, costPerClaim: null }, warnings };
    }
    if (tax > 0 && tax < 0.0765) warnings.push('Employer payroll taxes are below 7.65%, the employer share of FICA. Check the figure unless your employees are exempt.');
    const baseFte = claims / perFte;
    const totalFte = baseFte * (1 + pto);
    const loadedCostPerFte = salary * (1 + benefits + tax) + other;
    const annualTurnoverCost = totalFte * turnover * hiring;
    const annualCost = totalFte * loadedCostPerFte + annualTurnoverCost;
    const monthlyCost = annualCost / 12;
    const costPerClaim = claims > 0 ? div(annualCost, claims * 12) : null;
    if (totalFte > 0 && totalFte < 1) {
      notes.push('Your volume needs less than one full-time biller. A part-time hire still needs backup for absences, which is where many small practices consider outsourcing.');
    } else if (totalFte > 0) {
      notes.push(`Your claim volume needs about ${totalFte.toFixed(1)} billing FTEs once paid time off is covered. You can only hire whole or part-time people, so round to a staffing plan you can actually fill.`);
    }
    if (annualCost > 0) {
      notes.push(`Estimated staffing cost is about ${usd(annualCost)} a year. This covers people only: billing software, clearinghouse fees, management time and office space are extra unless you entered them as other cost per FTE.`);
    }
    return {
      values: { baseFte, totalFte, loadedCostPerFte, annualTurnoverCost, annualCost, monthlyCost, costPerClaim },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Base FTEs = Claims per month / Claims per FTE per month', explanation: 'Staffing needed if nobody ever took time off.' },
    { expression: 'Total FTEs = Base FTEs x (1 + PTO coverage %)', explanation: 'Adds capacity so work continues during vacation, holidays and sick days.' },
    { expression: 'Loaded cost per FTE = Salary x (1 + Benefits % + Payroll tax %) + Other cost per FTE', explanation: 'Benefits and employer taxes are both applied to base salary.' },
    { expression: 'Annual turnover cost = Total FTEs x Turnover % x Cost to replace one employee', explanation: 'Expected replacement hires per year times the cost of each.' },
    { expression: 'Annual cost = Total FTEs x Loaded cost per FTE + Annual turnover cost', explanation: 'Monthly cost is annual cost / 12; cost per claim is annual cost / (claims per month x 12).' },
  ],
  example: {
    inputs: { monthlyClaims: 4000, claimsPerFte: 1000, salary: 48000, benefitsPct: 20, payrollTaxPct: 8, ptoCoveragePct: 10, turnoverPct: 20, hiringCost: 5000, otherPerFte: 0 },
    expected: { baseFte: 4, totalFte: 4.4, loadedCostPerFte: 61440, annualTurnoverCost: 4400, annualCost: 274736, monthlyCost: 22894.67, costPerClaim: 5.72 },
    narrative:
      'A practice submits 4,000 claims a month and one biller handles 1,000, so it needs 4,000 / 1,000 = 4 FTEs, or 4 x 1.10 = 4.4 with PTO coverage. Each FTE costs 48,000 x (1 + 0.20 + 0.08) = $61,440. Turnover costs 4.4 x 0.20 x 5,000 = $4,400. Annual cost is 4.4 x 61,440 + 4,400 = 270,336 + 4,400 = $274,736, which is 274,736 / 12 = $22,894.67 a month and 274,736 / 48,000 claims = $5.72 per claim.',
  },
  assumptions: [
    'Claims per FTE is your own throughput figure. No industry standard is assumed, because workload per claim varies widely by specialty, payer mix and automation.',
    'Benefits and employer payroll taxes are both calculated as a percentage of base salary. Taxes on wages above the Social Security wage base are not adjusted.',
    'Management and supervision time, software, clearinghouse fees and office space are excluded unless entered as other cost per FTE.',
    'The FTE result is not rounded to whole hires.',
  ],
  faqs: [
    {
      q: 'How many billing staff does a medical practice need?',
      a: 'A practice needs roughly its monthly claim volume divided by the number of claims one biller can fully handle in a month, plus extra capacity for time off. Throughput per biller varies widely with specialty, payer mix, denial rates and automation, so measure your own team before planning. This calculator uses that figure to estimate FTEs.',
    },
    {
      q: 'What is included in the fully loaded cost of a billing employee?',
      a: 'The fully loaded cost of a billing employee includes base salary plus benefits such as health insurance and retirement contributions, employer payroll taxes, and a share of turnover costs for recruiting and training replacements. Many practices also add software licenses, equipment and workspace. Salary alone usually understates what a billing position really costs.',
    },
    {
      q: 'Why add capacity for paid time off?',
      a: 'Claims, payments and denials keep arriving when staff are on vacation, out sick or off for holidays. Without backup, work piles up and claims can miss filing or appeal deadlines. Adding a percentage to the FTE count reflects the real capacity needed to keep work moving all year, whether through extra staff, cross-training or overtime.',
    },
    {
      q: 'How much does staff turnover cost a billing department?',
      a: 'Turnover costs include job advertising, interview time, onboarding, training and the weeks a new biller needs to reach full productivity, when claim follow-up often slows. The right figure depends on your local labor market and training process, so estimate it from your own recent hires and enter it as the cost to replace one employee.',
    },
    {
      q: 'Is in-house billing staff cheaper than outsourcing?',
      a: 'In-house billing staff can be cheaper or more expensive than outsourcing depending on claim volume, wages, turnover and how well the team performs. Compare the fully loaded in-house cost from this calculator with the outsourcing fee on your collections, then consider collection performance separately. The billing outsourcing savings calculator handles the cost side of that comparison.',
    },
  ],
  relatedServices: ['medical-billing', 'revenue-cycle-management', 'rcm-workflow-optimization', 'accounts-receivable-management'],
  relatedTools: ['billing-outsourcing-savings-calculator', 'cost-per-claim-calculator', 'medical-billing-cost-calculator', 'outsourcing-vs-in-house-billing-calculator'],
  seoTitle: 'Medical Billing Staffing Cost Calculator',
  metaDescription: 'Estimate billing FTEs needed for your claim volume and the fully loaded cost with benefits, payroll taxes, PTO coverage and turnover, per year and per claim.',
  keywords: ['medical billing staffing cost calculator', 'how many billers do I need', 'billing staff cost per claim', 'medical biller fully loaded cost'],
};

export default calc;
