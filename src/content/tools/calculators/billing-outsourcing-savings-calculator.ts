import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'billing-outsourcing-savings-calculator',
  name: 'Billing Outsourcing Savings Calculator',
  category: 'cost',
  icon: 'BadgeDollarSign',
  summary: 'Compare your current in-house billing cost with a percent-of-collections outsourcing fee to see monthly and annual savings or extra cost.',
  definition:
    'Billing outsourcing savings is the difference between what in-house billing costs today and what an outsourced billing service would cost, including in-house costs you keep. This calculator compares the two on cost alone, holding collections constant, and shows monthly, annual and first-year results plus each option as a percent of collections.',
  inputs: [
    { id: 'inHouseMonthlyCost', label: 'Current in-house billing cost per month', unit: 'usd', default: 25000, min: 0, step: 100, help: 'Billing staff wages, benefits and payroll taxes, billing software, clearinghouse fees, statements and postage, and any related overhead. The billing staffing cost calculator can help estimate the staff portion.' },
    { id: 'monthlyCollections', label: 'Monthly collections', unit: 'usd', default: 400000, min: 0, step: 1000, help: 'Average payer and patient payments received per month. Most percent-of-collections fees are charged on this figure; confirm what the quote includes.' },
    { id: 'feePct', label: 'Outsourcing fee', unit: 'pct', default: 5, min: 0, max: 100, step: 0.1, help: 'The percent-of-collections fee from the quote you are evaluating. The default is only a placeholder for the example, not a market rate or a quote.' },
    { id: 'retainedMonthlyCost', label: 'In-house costs you would keep per month', unit: 'usd', default: 2000, min: 0, step: 100, optional: true, help: 'Costs that continue after outsourcing, such as front desk time on billing questions, a staff member who liaises with the vendor, or software you still license.' },
    { id: 'transitionCost', label: 'One-time transition cost', unit: 'usd', default: 0, min: 0, step: 100, optional: true, help: 'One-time costs to switch, such as setup fees, data migration, overlap staffing or severance. Leave blank if none.' },
  ],
  outputs: [
    { id: 'monthlySavings', label: 'Monthly savings (negative means extra cost)', unit: 'usd', primary: true },
    { id: 'annualSavings', label: 'Annual savings (negative means extra cost)', unit: 'usd', primary: true },
    { id: 'firstYearNet', label: 'First-year net savings after transition cost', unit: 'usd' },
    { id: 'outsourcedFee', label: 'Outsourcing fee per month', unit: 'usd' },
    { id: 'outsourcedTotal', label: 'Total monthly cost if outsourced', unit: 'usd', help: 'Outsourcing fee plus in-house costs you keep.' },
    { id: 'inHouseCostPct', label: 'In-house cost as a percent of collections', unit: 'pct' },
    { id: 'outsourcedCostPct', label: 'Outsourced cost as a percent of collections', unit: 'pct' },
  ],
  compute: (v) => {
    const inHouse = num(v.inHouseMonthlyCost);
    const collections = num(v.monthlyCollections);
    const fee = num(v.feePct);
    const retained = num(v.retainedMonthlyCost);
    const transition = num(v.transitionCost);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([inHouse, collections, fee, retained, transition].some((x) => x < 0)) warnings.push('Values should not be negative. Check the figures.');
    if (fee > 100) warnings.push('The outsourcing fee cannot be more than 100% of collections.');
    if (retained > inHouse && inHouse > 0) warnings.push('Retained in-house costs are larger than your current in-house billing cost. Check that the same costs are not counted twice.');
    if (collections <= 0) warnings.push('Enter monthly collections so the percent-of-collections fee can be calculated.');
    const outsourcedFee = collections * (fee / 100);
    const outsourcedTotal = outsourcedFee + retained;
    const monthlySavings = inHouse - outsourcedTotal;
    const annualSavings = monthlySavings * 12;
    const firstYearNet = annualSavings - transition;
    if (monthlySavings > 0) {
      notes.push(`On cost alone, outsourcing would save about ${usd(monthlySavings)} a month (${usd(annualSavings)} a year) at the fee entered.`);
    } else if (monthlySavings < 0) {
      notes.push(`On cost alone, outsourcing would cost about ${usd(-monthlySavings)} more a month (${usd(-annualSavings)} a year) at the fee entered.`);
    } else {
      notes.push('On cost alone, outsourcing and in-house billing cost the same at the fee entered.');
    }
    notes.push('This holds collections constant. To estimate the effect of a change in collection rate, use the RCM ROI calculator separately rather than adding it here, so the same gain is not counted twice.');
    if (transition > 0 && monthlySavings > 0) {
      notes.push(`The one-time transition cost would be recovered in about ${Math.ceil(transition / monthlySavings)} months of savings. This is an estimate.`);
    }
    return {
      values: {
        monthlySavings: collections > 0 ? monthlySavings : null,
        annualSavings: collections > 0 ? annualSavings : null,
        firstYearNet: collections > 0 ? firstYearNet : null,
        outsourcedFee: collections > 0 ? outsourcedFee : null,
        outsourcedTotal: collections > 0 ? outsourcedTotal : null,
        inHouseCostPct: collections > 0 ? pct(inHouse, collections) : null,
        outsourcedCostPct: collections > 0 ? pct(outsourcedTotal, collections) : null,
      },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Outsourcing fee = Monthly collections x Fee %', explanation: 'Most outsourcing quotes charge a percentage of collections; confirm which payments the fee applies to.' },
    { expression: 'Outsourced total = Outsourcing fee + Retained in-house costs', explanation: 'Some billing-related costs usually stay in-house.' },
    { expression: 'Monthly savings = Current in-house cost - Outsourced total', explanation: 'Negative values mean outsourcing costs more at these figures.' },
    { expression: 'Annual savings = Monthly savings x 12; First-year net = Annual savings - Transition cost', explanation: 'The first year carries any one-time switching cost.' },
    { expression: 'Cost as % of collections = Monthly cost / Monthly collections x 100', explanation: 'Puts both options on the same scale.' },
  ],
  example: {
    inputs: { inHouseMonthlyCost: 25000, monthlyCollections: 400000, feePct: 5, retainedMonthlyCost: 2000, transitionCost: 0 },
    expected: { monthlySavings: 3000, annualSavings: 36000, firstYearNet: 36000, outsourcedFee: 20000, outsourcedTotal: 22000, inHouseCostPct: 6.25, outsourcedCostPct: 5.5 },
    narrative:
      'A practice spends $25,000 a month on in-house billing and collects $400,000 a month. At a placeholder 5% fee, outsourcing costs 400,000 x 0.05 = $20,000, plus $2,000 of retained costs = $22,000. Monthly savings are 25,000 - 22,000 = $3,000, or 3,000 x 12 = $36,000 a year with no transition cost. In-house billing costs 25,000 / 400,000 = 6.25% of collections; outsourcing costs 22,000 / 400,000 = 5.5%.',
  },
  assumptions: [
    'Collections are the same under both options. Any change in collection rate is deliberately excluded; use the RCM ROI calculator for that, so the gain is not double counted.',
    'The fee applies to all monthly collections entered. Some contracts exclude patient payments or charge minimums, setup or per-claim fees; adjust the inputs to match the quote.',
    'In-house cost includes everything that would go away after outsourcing. Costs that remain belong in retained in-house costs.',
    'The 5% default is a placeholder for the example only. It is not a market rate or a Texas Solutions price.',
  ],
  faqs: [
    {
      q: 'How do I calculate savings from outsourcing medical billing?',
      a: 'To calculate savings from outsourcing medical billing, add up everything in-house billing costs each month, then subtract the outsourcing fee plus any billing costs you would still carry. The fee is usually a percentage of collections. A positive result is a saving and a negative result is extra cost, before any change in collections.',
    },
    {
      q: 'Why does this calculator ignore changes in collection rate?',
      a: 'This calculator compares cost only so that each effect is counted once. If outsourcing also changes how much you collect, estimate that separately with the RCM ROI calculator and consider both results side by side. Adding a collection improvement here and again in an ROI estimate would double count the same gain.',
    },
    {
      q: 'What in-house costs should I include?',
      a: 'Include every cost that would end if billing were outsourced: billing staff wages, benefits and payroll taxes, billing software and clearinghouse fees, statement printing and postage, and a fair share of supervision, equipment and space. Leave out costs that continue regardless, and enter billing tasks that stay in-house as retained costs.',
    },
    {
      q: 'What costs remain after outsourcing billing?',
      a: 'Costs that often remain after outsourcing include front desk time collecting copays and answering patient billing questions, charge capture and documentation by providers, someone who coordinates with the billing team, and practice management or EHR licenses. The amounts depend on how the work is divided, so confirm the scope in writing before comparing.',
    },
  ],
  relatedServices: ['medical-billing', 'revenue-cycle-management', 'accounts-receivable-management', 'denial-management'],
  relatedTools: ['rcm-roi-calculator', 'billing-staffing-cost-calculator', 'outsourcing-vs-in-house-billing-calculator', 'medical-billing-cost-calculator'],
  seoTitle: 'Medical Billing Outsourcing Savings Calculator',
  metaDescription: 'Compare in-house billing cost with a percent-of-collections outsourcing fee to estimate monthly, annual and first-year savings or extra cost.',
  keywords: ['billing outsourcing savings calculator', 'outsource medical billing cost', 'in-house vs outsourced billing cost', 'medical billing outsourcing savings'],
};

export default calc;
