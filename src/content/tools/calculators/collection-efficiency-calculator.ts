import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'collection-efficiency-calculator',
  name: 'Collection Efficiency Calculator',
  category: 'kpi',
  icon: 'Gauge',
  summary: 'Measure how much of the money available to collect in a period you actually collected.',
  definition:
    'Collection efficiency measures how much of the revenue available to collect during a period was actually collected. This calculator uses one common definition: payments divided by beginning AR plus new charges minus contractual adjustments. Other definitions exist, such as the collection effectiveness index, so use one method consistently when tracking trends.',
  inputs: [
    { id: 'beginningAr', label: 'Beginning AR (net of contractual adjustments)', unit: 'usd', default: 300000, min: 0, step: 100, help: 'Outstanding collectible balances at the start of the period, after contractual adjustments.' },
    { id: 'charges', label: 'Gross charges for the period', unit: 'usd', default: 500000, min: 0, step: 100, help: 'New charges posted during the period.' },
    { id: 'adjustments', label: 'Contractual adjustments on those charges', unit: 'usd', default: 200000, min: 0, step: 100, help: 'Contractual write-downs only. Do not include denials, bad debt or other write-offs.' },
    { id: 'payments', label: 'Payments collected in the period', unit: 'usd', default: 270000, min: 0, step: 100, help: 'Payer and patient payments received during the period, net of refunds.' },
  ],
  outputs: [
    { id: 'efficiency', label: 'Collection efficiency', unit: 'pct', primary: true },
    { id: 'available', label: 'Revenue available to collect', unit: 'usd' },
    { id: 'remaining', label: 'Estimated collectible balance remaining', unit: 'usd' },
  ],
  compute: (raw) => {
    const beginningAr = num(raw.beginningAr);
    const charges = num(raw.charges);
    const adjustments = num(raw.adjustments);
    const payments = num(raw.payments);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([beginningAr, charges, adjustments, payments].some((x) => x < 0)) warnings.push('Inputs should not be negative.');
    if (adjustments > charges) warnings.push('Contractual adjustments are larger than charges for the period. Check the figures.');
    const available = beginningAr + charges - adjustments;
    if (available > 0 && payments > available) warnings.push('Payments exceed the revenue available to collect. Beginning AR may be understated or adjustments overstated.');
    const efficiency = available > 0 ? pct(payments, available) : null;
    if (efficiency !== null) {
      notes.push(`You collected about ${efficiency.toFixed(1)}% of what was available to collect this period. Because new charges are added during the period and many are not yet due, this rate is rarely close to 100% for a single month.`);
      notes.push('The remaining balance is an estimate. It ignores denials, bad debt and other write-offs taken during the period, so it can differ from your actual ending AR.');
    }
    return { values: { efficiency, available: available > 0 ? available : null, remaining: available > 0 ? available - payments : null }, notes, warnings };
  },
  formula: [
    { expression: 'Available to collect = Beginning AR + Charges - Contractual adjustments', explanation: 'Everything collectible at the start of the period plus collectible new charges.' },
    { expression: 'Collection efficiency = Payments / Available to collect x 100', explanation: 'Share of available collectible revenue collected in the period.' },
    { expression: 'Estimated remaining balance = Available to collect - Payments', explanation: 'An estimate of collectible AR left at period end, before other write-offs.' },
  ],
  example: {
    inputs: { beginningAr: 300000, charges: 500000, adjustments: 200000, payments: 270000 },
    expected: { efficiency: 45, available: 600000, remaining: 330000 },
    narrative: 'A practice started the month with $300,000 in collectible AR, posted $500,000 in charges and took $200,000 in contractual adjustments. Available to collect is 300,000 + 500,000 - 200,000 = $600,000. It collected $270,000, so collection efficiency is 270,000 / 600,000 = 45%, leaving an estimated 600,000 - 270,000 = $330,000.',
  },
  assumptions: [
    'This is one of several definitions of collection efficiency. The collection effectiveness index and net collection rate measure related but different things.',
    'Beginning AR is net of contractual adjustments, so it is on the same basis as the new charges after adjustments.',
    'Use the same period length each time. A monthly figure will be lower than a quarterly one because more of the period\'s charges are still within normal payment time.',
  ],
  faqs: [
    {
      q: 'How is collection efficiency calculated?',
      a: 'This calculator divides payments collected in a period by the revenue available to collect, which is beginning AR plus new charges minus contractual adjustments. For example, $270,000 collected from $600,000 available is 45%. Organizations define collection efficiency in different ways, so record the definition you use and keep it consistent from month to month.',
    },
    {
      q: 'How is collection efficiency different from net collection rate?',
      a: 'Net collection rate compares payments to the collectible value of charges, usually for the same or a lagged period. Collection efficiency adds the AR you started the period with, so it shows how well the team is converting everything on the books, old and new, into cash. It reacts more to how quickly older balances are being worked.',
    },
    {
      q: 'What is the collection effectiveness index?',
      a: 'The collection effectiveness index, or CEI, is a related measure borrowed from general accounts receivable management. It compares beginning receivables plus new charges minus ending total receivables against beginning receivables plus new charges minus ending current receivables. It needs ending AR split into current and past due, which this simpler calculator does not require.',
    },
    {
      q: 'Why is my monthly collection efficiency well below 100%?',
      a: 'A monthly figure is usually well below 100% because many charges posted during the month are not yet due. Payers commonly take several weeks to pay a clean claim, so charges from the last part of the month will be collected next month. Trends over several months, and comparisons to the same month last year, matter more than one reading.',
    },
  ],
  relatedServices: ['accounts-receivable-management', 'payment-posting', 'rcm-analytics-reporting'],
  relatedTools: ['net-collection-rate-calculator', 'days-in-ar-calculator', 'ar-aging-calculator'],
  seoTitle: 'Collection Efficiency Calculator for Medical Practices',
  metaDescription: 'Calculate collection efficiency from beginning AR, charges, contractual adjustments and payments, with the formula, a worked example and related definitions.',
  keywords: ['collection efficiency calculator', 'collection efficiency formula', 'collection effectiveness index healthcare'],
};

export default calc;
