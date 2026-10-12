import type { Calculator } from '../../types';
import { div, num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const calc: Calculator = {
  kind: 'calculator',
  slug: 'break-even-calculator',
  name: 'Medical Practice Break-Even Calculator',
  category: 'cost',
  icon: 'Scale',
  summary: 'Find how many visits a month and a day your practice needs to cover its costs, and your margin of safety.',
  definition:
    'The break-even point is the number of visits at which collections exactly cover fixed and variable costs, so the practice neither makes nor loses money. This calculator divides fixed monthly costs by the contribution each visit makes (average reimbursement minus variable cost) and compares the result with your current volume.',
  inputs: [
    { id: 'fixedMonthly', label: 'Fixed monthly costs', unit: 'usd', default: 80000, min: 0, step: 500, help: 'Costs that do not change with visit volume: rent, salaried staff, provider base pay, insurance, software subscriptions, loan payments and similar.' },
    { id: 'variablePerVisit', label: 'Variable cost per visit', unit: 'usd', default: 20, min: 0, step: 1, help: 'Costs that rise with each visit: medical supplies, per-claim clearinghouse fees, percentage billing fees, lab send-outs and similar.' },
    { id: 'avgReimbursement', label: 'Average collections per visit', unit: 'usd', default: 120, min: 0, step: 1, help: 'Average cash actually collected per visit from payers and patients, not the billed charge.' },
    { id: 'workingDays', label: 'Working days per month', unit: 'days', default: 20, min: 1, max: 31, step: 1, help: 'Days the practice sees patients in a typical month.' },
    { id: 'currentVisits', label: 'Current visits per month', unit: 'count', default: 1000, min: 0, step: 1, optional: true, help: 'Your current monthly visit volume, used for the margin of safety. Leave blank to see break-even only.' },
  ],
  outputs: [
    { id: 'breakEvenVisits', label: 'Break-even visits per month', unit: 'count', primary: true },
    { id: 'breakEvenPerDay', label: 'Break-even visits per working day', unit: 'count', primary: true },
    { id: 'contributionPerVisit', label: 'Contribution per visit', unit: 'usd', help: 'Average collections per visit minus variable cost per visit.' },
    { id: 'breakEvenRevenue', label: 'Break-even monthly collections', unit: 'usd' },
    { id: 'marginOfSafetyVisits', label: 'Margin of safety (visits per month)', unit: 'count', help: 'How far current volume can fall before the practice stops covering its costs.' },
    { id: 'marginOfSafetyPct', label: 'Margin of safety', unit: 'pct' },
    { id: 'currentMonthlyProfit', label: 'Estimated monthly profit at current volume', unit: 'usd' },
  ],
  compute: (v) => {
    const fixed = num(v.fixedMonthly);
    const variable = num(v.variablePerVisit);
    const reimb = num(v.avgReimbursement);
    const days = num(v.workingDays);
    const current = num(v.currentVisits);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (fixed < 0 || variable < 0 || reimb < 0 || current < 0) warnings.push('Costs, collections and visits should not be negative.');
    const contribution = reimb - variable;
    if (contribution <= 0) {
      warnings.push('Variable cost per visit is equal to or higher than average collections per visit, so each visit loses money and there is no break-even point.');
      return {
        values: { breakEvenVisits: null, breakEvenPerDay: null, contributionPerVisit: contribution, breakEvenRevenue: null, marginOfSafetyVisits: null, marginOfSafetyPct: null, currentMonthlyProfit: current > 0 ? current * contribution - fixed : null },
        warnings,
      };
    }
    const breakEvenVisits = fixed / contribution;
    if (days <= 0) warnings.push('Enter at least one working day per month to see visits per day.');
    const breakEvenPerDay = days > 0 ? div(breakEvenVisits, days) : null;
    const breakEvenRevenue = breakEvenVisits * reimb;
    const hasCurrent = current > 0;
    const marginOfSafetyVisits = hasCurrent ? current - breakEvenVisits : null;
    const marginOfSafetyPct = hasCurrent ? pct(current - breakEvenVisits, current) : null;
    const currentMonthlyProfit = hasCurrent ? current * contribution - fixed : null;
    notes.push(`Each visit contributes about ${usd(contribution)} toward fixed costs, so you need about ${Math.ceil(breakEvenVisits).toLocaleString('en-US')} visits a month to cover them. Round up when scheduling, since partial visits do not exist.`);
    if (hasCurrent && marginOfSafetyVisits !== null && currentMonthlyProfit !== null) {
      if (marginOfSafetyVisits >= 0) {
        notes.push(`Current volume could fall by about ${Math.floor(marginOfSafetyVisits).toLocaleString('en-US')} visits a month before the practice stops covering its costs. Estimated monthly profit at current volume is ${usd(currentMonthlyProfit)}.`);
      } else {
        notes.push(`Current volume is about ${Math.ceil(-marginOfSafetyVisits).toLocaleString('en-US')} visits a month below break-even, an estimated monthly shortfall of ${usd(-currentMonthlyProfit)}.`);
      }
    }
    notes.push('This is an estimate. Collections per visit change with payer mix and denials, and some costs labeled fixed rise in steps as volume grows.');
    return {
      values: { breakEvenVisits, breakEvenPerDay, contributionPerVisit: contribution, breakEvenRevenue, marginOfSafetyVisits, marginOfSafetyPct, currentMonthlyProfit },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Contribution per visit = Average collections per visit - Variable cost per visit', explanation: 'What each visit leaves over to pay fixed costs.' },
    { expression: 'Break-even visits per month = Fixed monthly costs / Contribution per visit', explanation: 'The volume at which total contribution equals fixed costs.' },
    { expression: 'Break-even visits per day = Break-even visits per month / Working days', explanation: 'Converts the monthly target to a daily schedule target.' },
    { expression: 'Break-even collections = Break-even visits x Average collections per visit', explanation: 'Monthly cash needed to cover all costs.' },
    { expression: 'Margin of safety = Current visits - Break-even visits; Margin of safety % = that difference / Current visits x 100', explanation: 'How much volume can drop before losses start.' },
    { expression: 'Monthly profit = Current visits x Contribution per visit - Fixed monthly costs', explanation: 'Estimated profit or loss at current volume.' },
  ],
  example: {
    inputs: { fixedMonthly: 80000, variablePerVisit: 20, avgReimbursement: 120, workingDays: 20, currentVisits: 1000 },
    expected: { breakEvenVisits: 800, breakEvenPerDay: 40, contributionPerVisit: 100, breakEvenRevenue: 96000, marginOfSafetyVisits: 200, marginOfSafetyPct: 20, currentMonthlyProfit: 20000 },
    narrative:
      'A practice has $80,000 of fixed monthly costs, $20 of variable cost per visit and collects $120 per visit on average. Each visit contributes 120 - 20 = $100, so break-even is 80,000 / 100 = 800 visits a month, or 800 / 20 = 40 visits per working day, which is 800 x 120 = $96,000 in collections. At 1,000 visits the margin of safety is 1,000 - 800 = 200 visits (200 / 1,000 = 20%), and monthly profit is 1,000 x 100 - 80,000 = $20,000.',
  },
  assumptions: [
    'Fixed costs stay flat across the volume range. In practice, adding a provider, staff member or room raises fixed costs in steps.',
    'Average collections per visit is cash collected, after contractual adjustments, denials and unpaid patient balances.',
    'Every working day carries the same volume.',
    'Provider compensation that varies with production can be treated as a variable cost per visit.',
  ],
  faqs: [
    {
      q: 'How do you calculate the break-even point for a medical practice?',
      a: 'The break-even point for a medical practice is fixed monthly costs divided by the contribution per visit, which is average collections per visit minus variable cost per visit. For example, $80,000 of fixed costs and a $100 contribution per visit means 800 visits a month. Dividing by working days gives a daily patient target.',
    },
    {
      q: 'What counts as a fixed cost versus a variable cost?',
      a: 'Fixed costs stay the same whatever the visit volume, such as rent, salaried staff, malpractice insurance and software subscriptions. Variable costs rise with each visit, such as medical supplies, per-claim fees and billing fees charged as a percentage of collections. Production-based provider pay is usually treated as variable, while a fixed salary is fixed.',
    },
    {
      q: 'Why use collections per visit instead of charges per visit?',
      a: 'Collections per visit is the cash the practice actually receives, so it is what really pays the bills. Charges per visit are list prices that payers reduce through contractual adjustments, and some charges are never collected because of denials or unpaid patient balances. Using charges would make the break-even point look lower than it really is.',
    },
    {
      q: 'What is a margin of safety?',
      a: 'The margin of safety is how far current volume is above the break-even point, in visits and as a percentage of current volume. A practice seeing 1,000 visits a month with a break-even of 800 has a 200-visit, or 20%, margin of safety. A small margin means a slow month, provider absence or payer change can quickly cause a loss.',
    },
    {
      q: 'How can a practice lower its break-even point?',
      a: 'A practice can lower its break-even point by cutting fixed costs, reducing variable cost per visit or raising collections per visit. Raising collections often comes from fewer denials, accurate coding, better eligibility checks and stronger follow-up on unpaid claims, since those recover money the practice has already earned without adding visits.',
    },
  ],
  relatedServices: ['revenue-cycle-management', 'rcm-analytics-reporting', 'denial-management', 'practice-management-support'],
  relatedTools: ['practice-profit-margin-calculator', 'payer-mix-calculator', 'cost-per-claim-calculator', 'monthly-revenue-forecast-calculator'],
  seoTitle: 'Medical Practice Break-Even Calculator',
  metaDescription: 'Calculate how many patient visits per month and per day your practice needs to cover fixed and variable costs, plus your margin of safety and profit.',
  keywords: ['medical practice break even calculator', 'break even patients per day', 'practice break even analysis', 'contribution margin per visit'],
};

export default calc;
