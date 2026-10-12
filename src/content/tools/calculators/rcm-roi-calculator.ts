import type { Calculator } from '../../types';
import { num, div, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'rcm-roi-calculator',
  name: 'RCM ROI Calculator',
  category: 'revenue',
  icon: 'PiggyBank',
  summary: 'Estimate the net financial impact of outsourcing revenue cycle management, combining collection gains and billing cost changes.',
  definition:
    'An RCM ROI calculator estimates whether outsourcing billing could pay off. It combines two effects counted once each: extra collections from a higher net collection rate, and the difference between your current billing cost and an outsourced fee charged as a percentage of collections. It then annualizes the result and estimates payback on any transition cost.',
  inputs: [
    { id: 'monthlyCollections', label: 'Current monthly collections', unit: 'usd', default: 180000, min: 0, step: 1000, help: 'Average payments received per month from payers and patients, net of refunds.' },
    { id: 'currentBillingCost', label: 'Current billing cost per month', unit: 'usd', default: 14000, min: 0, step: 100, help: 'Everything you spend on billing today: staff wages and benefits, billing software, clearinghouse fees and any current vendor fees.' },
    { id: 'currentNcr', label: 'Current net collection rate', unit: 'pct', default: 90, min: 1, max: 100, step: 0.5, help: 'Payments divided by charges after contractual adjustments. Use the net collection rate calculator if you do not know it.' },
    { id: 'improvementPts', label: 'Expected improvement in net collection rate (percentage points)', unit: 'pp', default: 3, min: 0, max: 99, step: 0.5, help: 'Percentage points, not percent. For example 3 moves a 90% rate to 93%. Use a conservative figure; 0 tests cost alone.' },
    { id: 'outsourcedFeePct', label: 'Proposed outsourced fee (% of collections)', unit: 'pct', default: 6, min: 0, max: 100, step: 0.25, help: 'Enter the rate from the proposal you are evaluating. The default is a placeholder for illustration, not a quote.' },
    { id: 'transitionCost', label: 'One-time transition cost', unit: 'usd', default: 5000, min: 0, step: 500, optional: true, help: 'Optional. Setup, data migration, training or overlap costs paid once. Leave blank if none.' },
  ],
  outputs: [
    { id: 'newCollections', label: 'Estimated monthly collections at the new rate', unit: 'usd' },
    { id: 'incrementalCollections', label: 'Estimated incremental collections per month', unit: 'usd' },
    { id: 'outsourcedCost', label: 'Estimated outsourced fee per month', unit: 'usd' },
    { id: 'costDifference', label: 'Billing cost difference per month (current minus outsourced)', unit: 'usd' },
    { id: 'netMonthlyImpact', label: 'Estimated net monthly impact', unit: 'usd', primary: true },
    { id: 'annualImpact', label: 'Estimated first-year impact (after transition cost)', unit: 'usd', primary: true },
    { id: 'roiPct', label: 'ROI (first-year impact / annual outsourced fee)', unit: 'pct' },
    { id: 'paybackMonths', label: 'Months to pay back the transition cost', unit: 'months' },
  ],
  compute: (v) => {
    const collections = num(v.monthlyCollections);
    const currentCost = num(v.currentBillingCost);
    const rate = num(v.currentNcr);
    const improve = num(v.improvementPts);
    const feePct = num(v.outsourcedFeePct);
    const transition = num(v.transitionCost);
    const warnings: string[] = [];
    const notes: string[] = [];
    const empty = { newCollections: null, incrementalCollections: null, outsourcedCost: null, costDifference: null, netMonthlyImpact: null, annualImpact: null, roiPct: null, paybackMonths: null };

    if (collections < 0 || currentCost < 0 || improve < 0 || feePct < 0 || transition < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: empty, warnings };
    }
    if (rate <= 0 || rate > 100) {
      warnings.push('Current net collection rate must be greater than 0% and no more than 100%.');
      return { values: empty, warnings };
    }
    const newRate = rate + improve;
    if (newRate > 100) {
      warnings.push(`The current rate plus the improvement is ${newRate}%, which is above 100%. Reduce the expected improvement.`);
      return { values: empty, warnings };
    }
    if (feePct > 20) warnings.push('An outsourced fee above 20% of collections is unusually high. Check the figure.');
    if (improve > 10) warnings.push('An improvement of more than 10 percentage points is optimistic. Consider testing a smaller figure.');

    // Collectible revenue is fixed; only the share collected changes. Counted once.
    const collectible = collections / (rate / 100);
    const newCollections = collectible * (newRate / 100);
    const incrementalCollections = newCollections - collections;
    // Fee applies to the NEW total collections, and replaces (not adds to) the current billing cost.
    const outsourcedCost = newCollections * (feePct / 100);
    const costDifference = currentCost - outsourcedCost;
    const netMonthlyImpact = incrementalCollections + costDifference;
    const annualImpact = netMonthlyImpact * 12 - transition;
    const annualOutsourced = outsourcedCost * 12;
    const roiPct = pct(annualImpact, annualOutsourced);
    let paybackMonths: number | null;
    if (transition === 0) paybackMonths = 0;
    else paybackMonths = netMonthlyImpact > 0 ? div(transition, netMonthlyImpact) : null;

    if (netMonthlyImpact > 0) {
      notes.push('This is an estimate. A positive net impact means the assumed collection gain plus any cost change outweighs the outsourced fee.');
    } else {
      notes.push('This is an estimate. With these inputs the outsourced fee costs more than the assumed collection gain and cost savings combined.');
      if (transition > 0) notes.push('The transition cost is not paid back because the net monthly impact is zero or negative.');
    }
    notes.push('The collection gain depends entirely on the improvement you entered. Try 0 points to see the pure cost comparison.');

    return {
      values: { newCollections, incrementalCollections, outsourcedCost, costDifference, netMonthlyImpact, annualImpact, roiPct, paybackMonths },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Collectible revenue = Current monthly collections / Current NCR', explanation: 'Backs out the amount you are entitled to collect each month. It stays the same under either option.' },
    { expression: 'New collections = Collectible revenue x (Current NCR + Improvement)', explanation: 'What you would collect at the higher rate.' },
    { expression: 'Incremental collections = New collections - Current monthly collections', explanation: 'Equivalent to Collections / Current NCR x (New NCR - Current NCR). Counted once.' },
    { expression: 'Outsourced fee = New collections x Fee %', explanation: 'The fee is charged on the new total collections, which already include the incremental amount. It is not added a second time.' },
    { expression: 'Cost difference = Current billing cost - Outsourced fee', explanation: 'Positive means outsourcing costs less per month; negative means it costs more.' },
    { expression: 'Net monthly impact = Incremental collections + Cost difference', explanation: 'The two effects combined, each counted once.' },
    { expression: 'First-year impact = Net monthly impact x 12 - Transition cost', explanation: 'The one-time cost is subtracted once.' },
    { expression: 'ROI % = First-year impact / (Outsourced fee x 12) x 100', explanation: 'Return relative to what you would pay the billing partner over a year.' },
    { expression: 'Payback months = Transition cost / Net monthly impact', explanation: 'Shown only when the net monthly impact is positive. Zero when there is no transition cost.' },
  ],
  example: {
    inputs: { monthlyCollections: 180000, currentBillingCost: 14000, currentNcr: 90, improvementPts: 3, outsourcedFeePct: 6, transitionCost: 5000 },
    expected: {
      newCollections: 186000,
      incrementalCollections: 6000,
      outsourcedCost: 11160,
      costDifference: 2840,
      netMonthlyImpact: 8840,
      annualImpact: 101080,
      roiPct: 75.48,
      paybackMonths: 0.57,
    },
    narrative:
      'A practice collects $180,000 a month at a 90% net collection rate, so collectible revenue is 180,000 / 0.90 = $200,000. At 93%, collections would be 200,000 x 0.93 = $186,000, an increase of $6,000. A 6% fee on $186,000 is $11,160, which replaces the current $14,000 billing cost: 14,000 - 11,160 = $2,840 saved. Net monthly impact is 6,000 + 2,840 = $8,840. First-year impact is 8,840 x 12 - 5,000 = $101,080. Annual fees are 11,160 x 12 = $133,920, so ROI is 101,080 / 133,920 = 75.48%. Payback is 5,000 / 8,840 = 0.57 months.',
  },
  assumptions: [
    'The outsourced fee is modeled as a percentage of total collections, applied to the new (improved) collections. Flat or per-claim pricing needs a different model.',
    'Collectible revenue (charges after contractual adjustments) does not change; only the share collected changes.',
    'The outsourced fee fully replaces the current billing cost you entered. If some costs stay in-house (front desk, software you keep), leave them out of the current billing cost.',
    'The collection rate improvement is your assumption, not a promised outcome. Results are estimates and do not account for ramp-up time.',
    'ROI is defined here as first-year net impact divided by one year of outsourced fees.',
  ],
  faqs: [
    {
      q: 'How is ROI calculated for outsourced medical billing?',
      a: 'This calculator adds two effects, each counted once: the extra collections from a higher net collection rate and the change in monthly billing cost. It annualizes the total, subtracts any one-time transition cost and divides by a year of outsourced fees. The result is an estimate that depends heavily on the collection improvement you assume.',
    },
    {
      q: 'Why is the outsourced fee applied to the new collections?',
      a: 'Fees charged as a percentage of collections are paid on everything collected, including any extra money recovered. Applying the fee to the new total keeps the math honest: the incremental collections are counted once as a gain, and the fee on them is counted once as a cost. Applying the fee to old collections would overstate the benefit.',
    },
    {
      q: 'What collection rate improvement should I assume?',
      a: 'Use a conservative figure based on your own data. Look at denials never reworked, aged AR and underpayments to judge how much room there is. If your net collection rate is already high, little improvement is possible. Running the calculator with zero improvement shows whether outsourcing makes sense on cost alone.',
    },
    {
      q: 'What should I include in my current billing cost?',
      a: 'Include the monthly wages and benefits of everyone who works on billing, coding and follow-up, billing software and clearinghouse fees, and any current vendor charges. Leave out costs you will keep after outsourcing, such as front desk staff or practice management software that stays, because the outsourced fee only replaces the costs that go away.',
    },
    {
      q: 'Does a negative result mean outsourcing is a bad idea?',
      a: 'Not necessarily. A negative estimate means that, with your inputs, the fee is higher than the savings and collection gains combined. Other factors such as staff turnover risk, coverage during absences and reporting may still matter to you. Check whether your assumptions are realistic and compare several fee proposals before deciding.',
    },
  ],
  relatedServices: ['revenue-cycle-management', 'medical-billing', 'revenue-cycle-audit', 'denial-management'],
  relatedTools: ['outsourcing-vs-in-house-billing-calculator', 'net-collection-rate-calculator', 'medical-billing-cost-calculator', 'billing-outsourcing-savings-calculator'],
  seoTitle: 'RCM ROI Calculator: Outsourced Billing Impact',
  metaDescription: 'Estimate the ROI of outsourcing medical billing: incremental collections, billing cost difference, net monthly and annual impact, and payback months.',
  keywords: ['rcm roi calculator', 'medical billing outsourcing roi', 'revenue cycle management roi'],
};

export default calc;
