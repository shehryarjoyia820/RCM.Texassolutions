import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-practice-roi-calculator',
  name: 'Dental Billing Outsourcing ROI Calculator',
  category: 'dental',
  icon: 'TrendingUp',
  summary: 'Estimate the return on outsourcing dental billing from a change in collection rate and billing cost.',
  definition:
    'This calculator estimates the return on investment of outsourcing dental insurance billing. It adds the extra collections from a higher collection rate on net production to the change in billing cost, counting the cost difference only once, then compares that net benefit with the outsourcing cost. All results are estimates that depend on your assumptions.',
  inputs: [
    { id: 'netProduction', label: 'Annual net production', unit: 'usd', default: 1000000, min: 0, step: 1000, help: 'Production after PPO and other contractual write-offs, for a full year.' },
    { id: 'currentRate', label: 'Current collection rate', unit: 'pct', default: 92, min: 0, max: 100, step: 0.5, help: 'Collections divided by net production today.' },
    { id: 'newRate', label: 'Expected collection rate after outsourcing', unit: 'pct', default: 96, min: 0, max: 100, step: 0.5, help: 'Your own conservative assumption. No rate is guaranteed.' },
    { id: 'currentCost', label: 'Current annual billing cost', unit: 'usd', default: 75000, min: 0, step: 500, help: 'In-house billing staff, benefits, software and other costs that would go away or shrink after outsourcing.' },
    { id: 'newCost', label: 'Annual cost after outsourcing', unit: 'usd', default: 60000, min: 0, step: 500, help: 'Expected outsourcing fees plus any in-house billing cost you would keep.' },
  ],
  outputs: [
    { id: 'roi', label: 'Estimated ROI on outsourcing cost', unit: 'pct', primary: true },
    { id: 'netBenefit', label: 'Estimated annual net benefit', unit: 'usd', primary: true },
    { id: 'incrementalCollections', label: 'Incremental annual collections', unit: 'usd' },
    { id: 'costSavings', label: 'Annual cost difference (current minus new)', unit: 'usd' },
    { id: 'currentCollections', label: 'Current annual collections', unit: 'usd' },
    { id: 'projectedCollections', label: 'Projected annual collections', unit: 'usd' },
    { id: 'monthlyBenefit', label: 'Estimated monthly net benefit', unit: 'usd' },
  ],
  compute: (raw) => {
    const prod = num(raw.netProduction);
    const cur = num(raw.currentRate);
    const nw = num(raw.newRate);
    const curCost = num(raw.currentCost);
    const newCost = num(raw.newCost);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([prod, curCost, newCost].some((x) => x < 0)) warnings.push('Production and costs should not be negative.');
    if (cur < 0 || cur > 100 || nw < 0 || nw > 100) warnings.push('Collection rates must be between 0 and 100.');
    const valid = prod >= 0 && curCost >= 0 && newCost >= 0 && cur >= 0 && cur <= 100 && nw >= 0 && nw <= 100;
    if (!valid) {
      return { values: { roi: null, netBenefit: null, incrementalCollections: null, costSavings: null, currentCollections: null, projectedCollections: null, monthlyBenefit: null }, warnings };
    }
    if (nw < cur) warnings.push('The expected collection rate is lower than the current rate, so incremental collections are negative.');
    const currentCollections = (prod * cur) / 100;
    const projectedCollections = (prod * nw) / 100;
    const incrementalCollections = (prod * (nw - cur)) / 100;
    const costSavings = curCost - newCost;
    const netBenefit = incrementalCollections + costSavings;
    const roi = newCost > 0 ? pct(netBenefit, newCost) : null;
    if (newCost <= 0) warnings.push('Enter the annual cost after outsourcing to calculate ROI.');
    notes.push(netBenefit >= 0
      ? `Under these assumptions the estimated net benefit is about $${Math.round(netBenefit).toLocaleString('en-US')} a year. This is an estimate, not a promised result.`
      : 'Under these assumptions outsourcing would cost more than it returns. Check whether the expected collection rate and cost figures are realistic.');
    notes.push('The collection rate change drives most of the result. Try a smaller improvement to see how sensitive the estimate is.');
    return { values: { roi, netBenefit, incrementalCollections, costSavings, currentCollections, projectedCollections, monthlyBenefit: netBenefit / 12 }, notes, warnings };
  },
  formula: [
    { expression: 'Incremental collections = Net production x (New rate - Current rate) / 100', explanation: 'Extra cash from collecting a larger share of the same production.' },
    { expression: 'Cost difference = Current billing cost - Cost after outsourcing', explanation: 'Counted once. Positive means outsourcing costs less than in-house billing.' },
    { expression: 'Net benefit = Incremental collections + Cost difference', explanation: 'Total estimated annual gain, without double counting the outsourcing cost.' },
    { expression: 'ROI = Net benefit / Cost after outsourcing x 100', explanation: 'Return relative to what you would spend on billing after outsourcing.' },
    { expression: 'Monthly net benefit = Net benefit / 12', explanation: 'Average per month.' },
  ],
  example: {
    inputs: { netProduction: 1000000, currentRate: 92, newRate: 96, currentCost: 75000, newCost: 60000 },
    expected: { roi: 91.67, netBenefit: 55000, incrementalCollections: 40000, costSavings: 15000, currentCollections: 920000, projectedCollections: 960000, monthlyBenefit: 4583.33 },
    narrative: 'With $1,000,000 in net production, collections rise from 1,000,000 x 0.92 = $920,000 to 1,000,000 x 0.96 = $960,000, an increase of $40,000. Billing cost falls from $75,000 to $60,000, a $15,000 difference counted once. Net benefit is 40,000 + 15,000 = $55,000 a year, or 55,000 / 12 = $4,583.33 a month. ROI is 55,000 / 60,000 = 91.67%.',
  },
  assumptions: [
    'The collection rate improvement is your own assumption and is not guaranteed. Results depend on payer mix, workflow and how quickly changes take effect.',
    'Net production stays the same before and after outsourcing.',
    'The outsourcing cost is entered once as the new billing cost, so it is not subtracted a second time from the benefit.',
    'Transition costs, one time setup work and the timing of the improvement are not modeled.',
  ],
  faqs: [
    {
      q: 'How do you calculate the ROI of outsourcing dental billing?',
      a: 'Add the extra collections you expect from a higher collection rate to the difference between your current billing cost and the cost after outsourcing, then divide that net benefit by the cost after outsourcing. In the example, $40,000 in extra collections plus $15,000 in lower cost gives $55,000, which is 91.67% of a $60,000 cost.',
    },
    {
      q: 'Why is the outsourcing cost only counted once?',
      a: 'The outsourcing cost is already included in the cost difference, current cost minus new cost. Subtracting it again from the incremental collections would double count it and understate the benefit. This calculator treats billing cost as one line that changes from the current amount to the new amount, which keeps the arithmetic consistent.',
    },
    {
      q: 'What collection rate improvement should I assume?',
      a: 'Use a conservative assumption based on your own data, not a vendor promise. Look at your current denial rate, insurance AR over 90 days and write-offs that should not have happened. Those show how much collectible revenue is being lost today. Testing a small, medium and large improvement shows how sensitive the result is.',
    },
    {
      q: 'Can outsourcing still make sense if it costs more than in-house billing?',
      a: 'It can, if the expected increase in collections is larger than the extra cost. In that case the cost difference is negative but incremental collections may still produce a positive net benefit. The calculator handles this automatically. Practices also weigh factors outside this estimate, such as staff turnover risk and coverage during absences.',
    },
  ],
  relatedServices: ['dental-billing', 'revenue-cycle-management', 'accounts-receivable-management'],
  relatedTools: ['dental-billing-cost-calculator', 'outsourcing-vs-in-house-billing-calculator', 'rcm-roi-calculator'],
  seoTitle: 'Dental Billing Outsourcing ROI Calculator',
  metaDescription: 'Estimate the ROI of outsourcing dental billing from your net production, current and expected collection rates and billing costs, without double counting.',
  keywords: ['dental billing roi calculator', 'outsourcing dental billing roi', 'dental billing outsourcing cost benefit'],
};

export default calc;
