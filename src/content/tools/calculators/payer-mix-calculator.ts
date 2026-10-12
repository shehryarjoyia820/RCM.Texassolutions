import type { Calculator } from '../../types';
import { div, num, pct } from '../calc-helpers';

const CLASSES = [
  { key: 'medicare', label: 'Medicare', collections: 300000, visits: 3000 },
  { key: 'medicaid', label: 'Medicaid', collections: 100000, visits: 1600 },
  { key: 'commercial', label: 'Commercial', collections: 500000, visits: 4000 },
  { key: 'selfPay', label: 'Self-pay', collections: 50000, visits: 500 },
  { key: 'other', label: 'Other', collections: 50000, visits: 400 },
] as const;

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const calc: Calculator = {
  kind: 'calculator',
  slug: 'payer-mix-calculator',
  name: 'Payer Mix Calculator',
  category: 'kpi',
  icon: 'PieChart',
  summary: 'See each payer class as a share of collections and, if you add visits, the average payment per visit by payer.',
  definition:
    'Payer mix is how a practice\'s revenue is split across payer classes such as Medicare, Medicaid, commercial plans and self-pay. This calculator shows each class as a percentage of total collections and, when you enter visit counts, the average collections per visit for each class and for the practice overall.',
  inputs: [
    ...CLASSES.map((c) => ({
      id: c.key,
      label: `${c.label} collections`,
      unit: 'usd' as const,
      default: c.collections,
      min: 0,
      step: 1000,
      optional: c.key !== 'commercial',
      help:
        c.key === 'other'
          ? 'Workers compensation, auto, TRICARE, VA and any other payers not listed above. Use the same period for every class.'
          : c.key === 'medicare'
            ? 'Payments from traditional Medicare and Medicare Advantage plans for the period. Include patient payments on these accounts if you track them by class.'
            : `Payments received from ${c.label.toLowerCase()} payers for the period.`,
    })),
    ...CLASSES.map((c) => ({
      id: `visits${cap(c.key)}`,
      label: `${c.label} visits (optional)`,
      unit: 'count' as const,
      default: c.visits,
      min: 0,
      step: 1,
      optional: true,
      help: 'Visits or encounters for this payer class in the same period. Used only for the per-visit results; leave blank to see shares of collections only.',
    })),
  ],
  outputs: [
    { id: 'total', label: 'Total collections', unit: 'usd' },
    { id: 'shareMedicare', label: 'Medicare share', unit: 'pct', primary: true },
    { id: 'shareMedicaid', label: 'Medicaid share', unit: 'pct', primary: true },
    { id: 'shareCommercial', label: 'Commercial share', unit: 'pct', primary: true },
    { id: 'shareSelfPay', label: 'Self-pay share', unit: 'pct' },
    { id: 'shareOther', label: 'Other share', unit: 'pct' },
    { id: 'perVisitMedicare', label: 'Medicare collections per visit', unit: 'usd' },
    { id: 'perVisitMedicaid', label: 'Medicaid collections per visit', unit: 'usd' },
    { id: 'perVisitCommercial', label: 'Commercial collections per visit', unit: 'usd' },
    { id: 'perVisitSelfPay', label: 'Self-pay collections per visit', unit: 'usd' },
    { id: 'perVisitOther', label: 'Other collections per visit', unit: 'usd' },
    { id: 'avgPerVisit', label: 'Weighted average collections per visit', unit: 'usd', help: 'Total collections divided by total visits, which weights each payer class by its visit volume.' },
  ],
  compute: (v) => {
    const warnings: string[] = [];
    const notes: string[] = [];
    const values: Record<string, number | null> = {};
    let total = 0;
    let totalVisits = 0;
    let visitsComplete = true;
    let anyVisits = false;
    for (const c of CLASSES) {
      const col = num(v[c.key]);
      const vis = num(v[`visits${cap(c.key)}`]);
      if (col < 0 || vis < 0) warnings.push(`${c.label} has a negative value. Collections and visits should be zero or more.`);
      total += col;
      totalVisits += vis;
      if (vis > 0) anyVisits = true;
      if (col > 0 && vis <= 0) visitsComplete = false;
      if (vis > 0 && col === 0) warnings.push(`${c.label} has visits but no collections. Check that both figures cover the same period.`);
      values[`perVisit${cap(c.key)}`] = vis > 0 ? div(col, vis) : null;
    }
    values.total = total > 0 ? total : null;
    for (const c of CLASSES) values[`share${cap(c.key)}`] = total > 0 ? pct(num(v[c.key]), total) : null;
    if (total <= 0) warnings.push('Enter collections for at least one payer class.');
    if (anyVisits && !visitsComplete) warnings.push('Visits are missing for at least one payer class with collections, so the weighted average per visit is not shown.');
    values.avgPerVisit = total > 0 && anyVisits && visitsComplete ? div(total, totalVisits) : null;

    if (total > 0) {
      const top = CLASSES.map((c) => ({ label: c.label, share: num(v[c.key]) / total })).sort((a, b) => b.share - a.share)[0];
      notes.push(`${top.label} is your largest payer class at ${Math.round(top.share * 100)}% of collections, so its fee schedule and denial patterns have the biggest effect on revenue.`);
    }
    if (values.avgPerVisit !== null) {
      notes.push('Per-visit figures are averages of cash collected and mix together different visit types. Compare them within the same specialty and period rather than across practices.');
    }
    notes.push('Shares are based on collections, not visits or charges, so a payer that pays less per visit will show a smaller share than its patient volume suggests.');
    return { values, notes: notes.slice(0, 3), warnings };
  },
  formula: [
    { expression: 'Total collections = Medicare + Medicaid + Commercial + Self-pay + Other', explanation: 'All classes should cover the same period.' },
    { expression: 'Payer share = Payer class collections / Total collections x 100', explanation: 'Shares of collections always add up to 100%.' },
    { expression: 'Collections per visit (class) = Payer class collections / Payer class visits', explanation: 'Shown only for classes with visits entered.' },
    { expression: 'Weighted average per visit = Total collections / Total visits', explanation: 'Weights each class by its visit volume. Shown only when every class with collections has visits.' },
  ],
  example: {
    inputs: {
      medicare: 300000, medicaid: 100000, commercial: 500000, selfPay: 50000, other: 50000,
      visitsMedicare: 3000, visitsMedicaid: 1600, visitsCommercial: 4000, visitsSelfPay: 500, visitsOther: 400,
    },
    expected: {
      total: 1000000,
      shareMedicare: 30, shareMedicaid: 10, shareCommercial: 50, shareSelfPay: 5, shareOther: 5,
      perVisitMedicare: 100, perVisitMedicaid: 62.5, perVisitCommercial: 125, perVisitSelfPay: 100, perVisitOther: 125,
      avgPerVisit: 105.26,
    },
    narrative:
      'A practice collected $300,000 from Medicare, $100,000 from Medicaid, $500,000 from commercial plans and $50,000 each from self-pay and other payers, for $1,000,000 total. Shares are 30%, 10%, 50%, 5% and 5%. Per visit: 300,000 / 3,000 = $100, 100,000 / 1,600 = $62.50, 500,000 / 4,000 = $125, 50,000 / 500 = $100 and 50,000 / 400 = $125. Across 9,500 visits the weighted average is 1,000,000 / 9,500 = $105.26.',
  },
  assumptions: [
    'Shares are of collections (cash received), not charges or patient counts.',
    'Medicare Advantage and Medicaid managed care plans are counted with Medicare and Medicaid; move them to commercial or other if you track them that way.',
    'Patient payments on insured accounts are counted with the insurer class only if your reports allocate them that way.',
    'Per-visit results ignore differences in visit type, procedure mix and timing between visits and payments.',
  ],
  faqs: [
    {
      q: 'What is payer mix in a medical practice?',
      a: 'Payer mix is the breakdown of a practice\'s revenue or patients by who pays: Medicare, Medicaid, commercial insurance, self-pay and other payers such as workers compensation. It matters because each payer class pays different rates and follows different rules, so two practices with identical visit volumes can collect very different amounts.',
    },
    {
      q: 'Should payer mix be measured by collections, charges or visits?',
      a: 'Payer mix can be measured all three ways, and each answers a different question. Collections show where your cash actually comes from, which is what this calculator uses. Visits or patients show where your workload comes from. Charges are less useful because they reflect your fee schedule rather than what payers pay.',
    },
    {
      q: 'Why does the weighted average per visit need visits for every payer?',
      a: 'The weighted average divides total collections by total visits. If one payer class has collections but no visits entered, its dollars would be counted without its visits, which would inflate the average. The calculator hides the weighted average until every class with collections also has a visit count for the same period.',
    },
    {
      q: 'How can a practice improve its payer mix?',
      a: 'A practice can shift its payer mix over time by renegotiating or adding commercial contracts, reviewing whether low-paying contracts are worth keeping, and marketing services that attract better-reimbursed patients. Improving collections within each class through accurate coding, eligibility checks and denial follow-up often helps sooner than changing which patients the practice sees.',
    },
  ],
  relatedServices: ['payer-contracting', 'fee-schedule-analysis', 'rcm-analytics-reporting', 'revenue-cycle-management'],
  relatedTools: ['fee-schedule-comparison-calculator', 'revenue-per-provider-calculator', 'practice-revenue-calculator', 'net-collection-rate-calculator'],
  seoTitle: 'Payer Mix Calculator for Medical Practices',
  metaDescription: 'Calculate your payer mix as shares of collections for Medicare, Medicaid, commercial, self-pay and other payers, plus average collections per visit.',
  keywords: ['payer mix calculator', 'payer mix analysis', 'medical practice payer mix', 'collections per visit by payer'],
};

export default calc;
