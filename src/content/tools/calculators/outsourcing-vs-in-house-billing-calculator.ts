import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'outsourcing-vs-in-house-billing-calculator',
  name: 'Outsourcing vs In-House Billing Calculator',
  category: 'cost',
  icon: 'Scale',
  summary: 'Compare the annual cost of in-house billing with a percentage-of-collections outsourced fee and find the break-even rate.',
  definition:
    'An outsourcing vs in-house billing calculator compares what you spend to run billing yourself with what an outsourced service would cost at a given percentage of collections, plus any costs you would keep. It shows the annual difference and the break-even fee: the highest percentage at which outsourcing costs no more than in-house billing.',
  inputs: [
    { id: 'inHouseCost', label: 'Total annual in-house billing cost', unit: 'usd', default: 175000, min: 0, step: 1000, help: 'Staff with benefits, software, clearinghouse, training and overhead. The medical billing cost calculator can help you build this figure.' },
    { id: 'annualCollections', label: 'Annual collections', unit: 'usd', default: 2400000, min: 0, step: 10000, help: 'Total payments received per year from payers and patients.' },
    { id: 'outsourcedFeePct', label: 'Outsourced fee (% of collections)', unit: 'pct', default: 6, min: 0, max: 100, step: 0.25, help: 'Enter the rate from the proposal you are evaluating. The default is a placeholder for illustration, not a quote.' },
    { id: 'retainedCosts', label: 'Annual costs you keep after outsourcing', unit: 'usd', default: 10000, min: 0, step: 500, optional: true, help: 'Optional. Costs that remain, such as practice management software, clearinghouse fees not covered by the vendor, or staff time spent on billing oversight.' },
  ],
  outputs: [
    { id: 'outsourcedFee', label: 'Annual outsourced fee', unit: 'usd' },
    { id: 'outsourcedTotal', label: 'Total annual cost if outsourced', unit: 'usd' },
    { id: 'annualDifference', label: 'Annual difference (in-house minus outsourced)', unit: 'usd', primary: true },
    { id: 'monthlyDifference', label: 'Monthly difference', unit: 'usd' },
    { id: 'inHousePct', label: 'In-house cost as % of collections', unit: 'pct' },
    { id: 'breakEvenFeePct', label: 'Break-even outsourced fee', unit: 'pct', primary: true },
  ],
  compute: (v) => {
    const inHouse = num(v.inHouseCost);
    const collections = num(v.annualCollections);
    const fee = num(v.outsourcedFeePct);
    const retained = num(v.retainedCosts);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (inHouse < 0 || collections < 0 || fee < 0 || retained < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: { outsourcedFee: null, outsourcedTotal: null, annualDifference: null, monthlyDifference: null, inHousePct: null, breakEvenFeePct: null }, warnings };
    }
    if (fee > 20) warnings.push('An outsourced fee above 20% of collections is unusually high. Check the figure.');
    if (retained > inHouse && inHouse > 0) warnings.push('Retained costs are higher than your total in-house cost. Retained costs should be a part of the in-house total, not more than it.');
    if (collections === 0) warnings.push('Enter annual collections to compare costs.');
    const outsourcedFee = collections * (fee / 100);
    const outsourcedTotal = outsourcedFee + retained;
    const annualDifference = inHouse - outsourcedTotal;
    const monthlyDifference = annualDifference / 12;
    const inHousePct = pct(inHouse, collections);
    const breakEvenRaw = pct(inHouse - retained, collections);
    const breakEvenFeePct = breakEvenRaw === null ? null : Math.max(0, breakEvenRaw);
    if (collections > 0) {
      if (annualDifference > 0) notes.push('On cost alone, outsourcing at this fee is estimated to cost less than billing in-house.');
      else if (annualDifference < 0) notes.push('On cost alone, outsourcing at this fee is estimated to cost more than billing in-house.');
      else notes.push('On cost alone, both options cost about the same at this fee.');
      if (breakEvenFeePct !== null) notes.push(`Any fee below about ${breakEvenFeePct.toFixed(2)}% of collections would cost less than your current setup, before considering any change in collections.`);
      notes.push('This compares cost only. If outsourcing changes your collection rate, use the RCM ROI calculator to include that effect.');
    }
    return { values: { outsourcedFee: collections > 0 ? outsourcedFee : null, outsourcedTotal: collections > 0 ? outsourcedTotal : null, annualDifference: collections > 0 ? annualDifference : null, monthlyDifference: collections > 0 ? monthlyDifference : null, inHousePct, breakEvenFeePct }, notes, warnings };
  },
  formula: [
    { expression: 'Outsourced fee = Annual collections x Fee %', explanation: 'Annual cost of a percentage-of-collections arrangement.' },
    { expression: 'Outsourced total = Outsourced fee + Retained costs', explanation: 'Costs that do not go away are added back.' },
    { expression: 'Annual difference = In-house cost - Outsourced total', explanation: 'Positive means outsourcing costs less; negative means it costs more.' },
    { expression: 'In-house % = In-house cost / Annual collections x 100', explanation: 'Your current cost on the same basis as a percentage fee.' },
    { expression: 'Break-even fee % = (In-house cost - Retained costs) / Annual collections x 100', explanation: 'The fee at which both options cost the same.' },
  ],
  example: {
    inputs: { inHouseCost: 175000, annualCollections: 2400000, outsourcedFeePct: 6, retainedCosts: 10000 },
    expected: { outsourcedFee: 144000, outsourcedTotal: 154000, annualDifference: 21000, monthlyDifference: 1750, inHousePct: 7.29, breakEvenFeePct: 6.88 },
    narrative:
      'In-house billing costs $175,000 a year against $2,400,000 in collections, or 175,000 / 2,400,000 = 7.29%. A 6% fee would be 2,400,000 x 0.06 = $144,000, plus $10,000 in retained costs for a total of $154,000. The difference is 175,000 - 154,000 = $21,000 a year ($1,750 a month). The break-even fee is (175,000 - 10,000) / 2,400,000 = 6.875%, shown as 6.88%.',
  },
  assumptions: [
    'The outsourced fee is a flat percentage of all collections. Tiered, per-claim or minimum-fee pricing needs separate math.',
    'Collections are the same under both options. Any change in collection performance is not included here.',
    'The in-house cost already includes the retained costs you enter.',
    'One-time transition costs are not included.',
  ],
  faqs: [
    {
      q: 'Is it cheaper to outsource medical billing or keep it in-house?',
      a: 'It depends on your total in-house cost compared with the outsourced fee on your collections. If your in-house cost as a percentage of collections is above the fee you are quoted, outsourcing is likely to cost less on a pure cost basis. This calculator shows that comparison and the break-even fee for your numbers.',
    },
    {
      q: 'What is the break-even outsourced fee?',
      a: 'The break-even fee is the percentage of collections at which outsourcing costs exactly what in-house billing costs today, after accounting for costs you would keep. Any quoted fee below it would cost less; any fee above it would cost more. It is a useful number to have in mind when reviewing proposals from billing vendors.',
    },
    {
      q: 'What are retained costs?',
      a: 'Retained costs are expenses that continue after you outsource. Examples include practice management software you keep, clearinghouse fees not covered by the vendor and staff time spent answering patient billing questions or reviewing reports. Leaving these out makes outsourcing look cheaper than it is, so include anything that will not go away.',
    },
    {
      q: 'Why does this calculator ignore changes in collections?',
      a: 'It focuses on cost so the comparison stays transparent and does not depend on a guess about performance. Collection changes can be larger than cost differences, in either direction. To model an assumed change in your net collection rate together with cost, use the RCM ROI calculator, which counts each effect once.',
    },
  ],
  relatedServices: ['medical-billing', 'revenue-cycle-management', 'billing-software-migration'],
  relatedTools: ['medical-billing-cost-calculator', 'rcm-roi-calculator', 'billing-outsourcing-savings-calculator', 'billing-staffing-cost-calculator'],
  seoTitle: 'Outsourcing vs In-House Medical Billing Calculator',
  metaDescription: 'Compare in-house medical billing cost with an outsourced fee as a percent of collections, see the annual difference and find your break-even fee.',
  keywords: ['outsourcing vs in-house medical billing', 'medical billing outsourcing cost comparison', 'break-even billing fee'],
};

export default calc;
