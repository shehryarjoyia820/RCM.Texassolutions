import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'gross-collection-rate-calculator',
  name: 'Gross Collection Rate Calculator',
  category: 'kpi',
  icon: 'ChartPie',
  summary: 'See what share of your total billed charges turns into payments.',
  definition:
    'Gross collection rate (GCR) is total payments divided by total billed charges for the same period. Because charges are set by your own fee schedule, GCR mostly reflects how your prices compare to payer contracts. It is useful for tracking trends, but net collection rate is the better measure of billing performance.',
  inputs: [
    { id: 'payments', label: 'Total payments received', unit: 'usd', default: 285000, min: 0, step: 100, help: 'Payer and patient payments for the period, net of refunds.' },
    { id: 'charges', label: 'Total gross charges', unit: 'usd', default: 500000, min: 0, step: 100, help: 'Charges billed at your full fee schedule for the same period, before any adjustments.' },
  ],
  outputs: [
    { id: 'gcr', label: 'Gross collection rate', unit: 'pct', primary: true },
    { id: 'gap', label: 'Charges not collected (adjustments, denials, open balances)', unit: 'usd' },
  ],
  compute: (raw) => {
    const payments = num(raw.payments);
    const charges = num(raw.charges);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (payments < 0 || charges < 0) warnings.push('Payments and charges should not be negative.');
    if (charges > 0 && payments > charges) warnings.push('Payments exceed gross charges. Check that both figures cover the same period.');
    const gcr = charges > 0 ? pct(payments, charges) : null;
    if (gcr !== null && gcr <= 100) {
      notes.push(`You collected about ${gcr.toFixed(1)} cents for every dollar billed. Much of the gap is usually contractual adjustments, which are expected.`);
      notes.push('A low gross rate is not necessarily a problem if your fee schedule is set well above payer rates. Check net collection rate to see losses from denials and unpaid balances.');
    }
    return { values: { gcr, gap: charges > 0 ? charges - payments : null }, notes, warnings };
  },
  formula: [
    { expression: 'GCR = Payments / Gross charges x 100', explanation: 'Gross charges are taken before contractual adjustments, so the rate is heavily influenced by your fee schedule.' },
    { expression: 'Uncollected charges = Gross charges - Payments', explanation: 'Includes contractual adjustments, denials, write-offs and balances still open.' },
  ],
  example: {
    inputs: { payments: 285000, charges: 500000 },
    expected: { gcr: 57, gap: 215000 },
    narrative: 'A practice billed $500,000 at its fee schedule and collected $285,000. GCR is 285,000 / 500,000 = 0.57, or 57%. The remaining 500,000 - 285,000 = $215,000 is made up of contractual adjustments, denials, write-offs and open balances.',
  },
  assumptions: [
    'Payments and charges cover the same period. Payments lag charges, so a lagged or rolling period gives a steadier figure.',
    'Charges are at your full fee schedule. If you raise or lower fees, GCR changes even when collections do not.',
  ],
  faqs: [
    {
      q: 'What does gross collection rate tell a medical practice?',
      a: 'Gross collection rate tells you what share of your billed charges you actually received. Because most practices set fees above what payers allow, a large part of the gap is contractual adjustments rather than lost revenue. It is most useful for watching trends over time and for comparing your fee schedule against payer contracts, not for judging billing performance.',
    },
    {
      q: 'Why is my gross collection rate so much lower than my net collection rate?',
      a: 'Gross collection rate is lower because it includes contractual adjustments in the denominator, while net collection rate removes them. If your fee schedule is set at two or three times Medicare rates, gross collection rate can be quite low even when billing is working well. The difference between the two rates mostly reflects your pricing, not your billing team.',
    },
    {
      q: 'Can I compare my gross collection rate to other practices?',
      a: 'Comparisons are of limited value because every practice sets its own fee schedule. Two practices with identical payments and identical payer contracts can show very different gross collection rates if one bills at higher list prices. Comparing your own rate over time, or comparing net collection rate, generally gives more meaningful insight into performance.',
    },
    {
      q: 'What causes gross collection rate to drop?',
      a: 'Gross collection rate can drop because of a fee schedule increase, a shift toward lower paying payers, more denials, slower follow-up or more patient balances going unpaid. Only some of these are billing problems. Check whether your fees or payer mix changed before assuming collections worsened, and confirm with net collection rate and denial rate.',
    },
  ],
  relatedServices: ['fee-schedule-analysis', 'accounts-receivable-management', 'rcm-analytics-reporting'],
  relatedTools: ['net-collection-rate-calculator', 'payer-mix-calculator', 'fee-schedule-comparison-calculator'],
  seoTitle: 'Gross Collection Rate Calculator for Practices',
  metaDescription: 'Calculate your gross collection rate from payments and billed charges, see the formula and an example, and learn how it differs from net collection rate.',
  keywords: ['gross collection rate calculator', 'gross collection rate formula', 'medical billing kpi'],
};

export default calc;
