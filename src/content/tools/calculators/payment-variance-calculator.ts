import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'payment-variance-calculator',
  name: 'Payment Variance Calculator',
  category: 'revenue',
  icon: 'GitCompare',
  summary: 'Compare the contracted allowed amount with what was actually paid per claim line and see the variance in dollars and percent.',
  definition:
    'Payment variance is the difference between the allowed amount a payer contract says you should receive and the amount actually paid by the payer and patient combined. This calculator works per claim line, then totals the variance for a batch of lines and annualizes it, so you can see whether a payer or code is paying below contract.',
  inputs: [
    { id: 'claimLines', label: 'Claim lines in the batch (per month)', unit: 'count', default: 500, min: 0, step: 10, help: 'Number of paid claim lines for the payer, code or period you are reviewing.' },
    { id: 'expectedAllowed', label: 'Expected allowed amount per line', unit: 'usd', default: 120, min: 0, step: 1, help: 'The contracted rate for the service from your fee schedule or payer contract.' },
    { id: 'payerPaid', label: 'Average payer payment per line', unit: 'usd', default: 90, min: 0, step: 1, help: 'What the payer actually paid per line, from the ERA or EOB.' },
    { id: 'patientResp', label: 'Average patient responsibility per line', unit: 'usd', default: 22, min: 0, step: 1, help: 'Deductible, copay and coinsurance assigned to the patient on the same lines. These count toward the allowed amount.' },
  ],
  outputs: [
    { id: 'actualPerLine', label: 'Actual allowed per line (payer plus patient)', unit: 'usd' },
    { id: 'variancePerLine', label: 'Variance per line', unit: 'usd' },
    { id: 'variancePct', label: 'Variance as % of expected', unit: 'pct', primary: true },
    { id: 'expectedTotal', label: 'Expected total for the batch', unit: 'usd' },
    { id: 'actualTotal', label: 'Actual total for the batch', unit: 'usd' },
    { id: 'totalVariance', label: 'Total variance for the batch', unit: 'usd', primary: true },
    { id: 'annualVariance', label: 'Annualized variance (batch x 12)', unit: 'usd' },
  ],
  compute: (v) => {
    const lines = num(v.claimLines);
    const expected = num(v.expectedAllowed);
    const paid = num(v.payerPaid);
    const patient = num(v.patientResp);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (lines < 0 || expected < 0 || paid < 0 || patient < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: { actualPerLine: null, variancePerLine: null, variancePct: null, expectedTotal: null, actualTotal: null, totalVariance: null, annualVariance: null }, warnings };
    }
    const actualPerLine = paid + patient;
    const variancePerLine = expected - actualPerLine;
    const variancePct = pct(variancePerLine, expected);
    const expectedTotal = lines * expected;
    const actualTotal = lines * actualPerLine;
    const totalVariance = expectedTotal - actualTotal;
    const annualVariance = totalVariance * 12;
    if (expected === 0) warnings.push('Enter the expected allowed amount to calculate variance.');
    if (variancePerLine < 0) {
      warnings.push('Actual payments are higher than the expected allowed amount. Check the contract rate, or review for a possible overpayment that may need to be refunded.');
    }
    if (expected > 0) {
      if (variancePerLine > 0) {
        notes.push('A positive variance means lines were paid below the expected contracted amount. These are potential underpayments worth reviewing with the payer.');
        notes.push('The annualized figure is an estimate that assumes this batch is typical of every month.');
      } else if (variancePerLine === 0) {
        notes.push('Payments match the expected allowed amount.');
      }
    }
    return { values: { actualPerLine, variancePerLine, variancePct, expectedTotal, actualTotal, totalVariance, annualVariance }, notes, warnings };
  },
  formula: [
    { expression: 'Actual per line = Payer paid + Patient responsibility', explanation: 'Together these make up the allowed amount the payer actually applied.' },
    { expression: 'Variance per line = Expected allowed - Actual per line', explanation: 'Positive means paid below contract.' },
    { expression: 'Variance % = Variance per line / Expected allowed x 100', explanation: 'Size of the gap relative to the contracted rate.' },
    { expression: 'Total variance = Claim lines x Expected allowed - Claim lines x Actual per line', explanation: 'Dollar gap for the whole batch.' },
    { expression: 'Annualized variance = Total variance x 12', explanation: 'Assumes the batch represents one typical month.' },
  ],
  example: {
    inputs: { claimLines: 500, expectedAllowed: 120, payerPaid: 90, patientResp: 22 },
    expected: { actualPerLine: 112, variancePerLine: 8, variancePct: 6.67, expectedTotal: 60000, actualTotal: 56000, totalVariance: 4000, annualVariance: 48000 },
    narrative:
      'The contract allows $120 per line. The payer paid $90 and the patient owes $22, so the actual allowed amount is 90 + 22 = $112. The variance is 120 - 112 = $8 per line, or 8 / 120 = 6.67%. Across 500 lines, expected is 500 x 120 = $60,000 and actual is 500 x 112 = $56,000, a variance of $4,000. Over 12 months that is about $48,000.',
  },
  assumptions: [
    'Every line in the batch has the same expected allowed amount. For mixed codes, run each code or payer separately.',
    'Patient responsibility counts toward the allowed amount, so it is added to the payer payment.',
    'Lines with sequestration, secondary payer or other legitimate reductions should be excluded or adjusted before entry.',
    'Annualizing assumes the batch is one typical month.',
  ],
  faqs: [
    {
      q: 'What is payment variance in medical billing?',
      a: 'Payment variance is the gap between the contracted allowed amount and what was actually applied to a claim line, meaning the payer payment plus the patient responsibility. A positive variance means you were paid less than your contract says. Variance analysis is how practices find underpayments that would otherwise go unnoticed in routine payment posting.',
    },
    {
      q: 'Why is patient responsibility added to the payer payment?',
      a: 'The allowed amount is split between the payer and the patient. If a $120 allowed amount has a $22 deductible, the payer pays $98 and the patient owes $22. Comparing only the payer payment to the contract rate would wrongly flag every claim with patient cost sharing as underpaid.',
    },
    {
      q: 'What causes payments to differ from the contract?',
      a: 'Common causes include outdated fee schedules in the payer system, incorrect modifier or multiple procedure reductions, wrong place of service rates, sequestration on Medicare claims and contract terms the practice did not load. Some reductions are legitimate, so each variance should be reviewed against the contract and the remark codes on the remittance.',
    },
    {
      q: 'What should I do with a negative variance?',
      a: 'A negative variance means the payer applied more than you expected. First confirm the contract rate in your system is current. If the payer did pay more than the contract allows, it may be an overpayment, and you should follow the payer refund process and your compliance policy rather than keeping the money.',
    },
  ],
  relatedServices: ['underpayment-identification', 'payment-posting', 'fee-schedule-analysis', 'payer-contracting', 'payment-reconciliation'],
  relatedTools: ['underpayment-estimator', 'fee-schedule-comparison-calculator', 'era-explained', 'eob-explained'],
  seoTitle: 'Payment Variance Calculator: Allowed vs Paid',
  metaDescription: 'Compare expected contracted allowed amounts with actual payer and patient payments per claim line to find payment variances in dollars and percent.',
  keywords: ['payment variance calculator', 'expected vs paid medical claims', 'contract variance analysis'],
};

export default calc;
