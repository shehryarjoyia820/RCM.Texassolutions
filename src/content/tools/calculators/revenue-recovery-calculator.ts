import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'revenue-recovery-calculator',
  name: 'Revenue Recovery Calculator',
  category: 'revenue',
  icon: 'Undo2',
  summary: 'Estimate how much of your aged accounts receivable might be recovered, net of a recovery fee.',
  definition:
    'A revenue recovery calculator estimates how much money could be collected from old insurance accounts receivable. You enter balances in aging buckets over 90 days and an assumed recovery percentage for each. It totals the estimated recoverable amount and subtracts a recovery fee to show what the practice would keep.',
  inputs: [
    { id: 'ar91to120', label: 'AR balance 91 to 120 days', unit: 'usd', default: 60000, min: 0, step: 1000, help: 'Open insurance balances 91 to 120 days from date of service or claim submission, from your aging report.' },
    { id: 'ar121to180', label: 'AR balance 121 to 180 days', unit: 'usd', default: 45000, min: 0, step: 1000, help: 'Open insurance balances 121 to 180 days old.' },
    { id: 'ar181plus', label: 'AR balance over 180 days', unit: 'usd', default: 50000, min: 0, step: 1000, help: 'Open insurance balances older than 180 days. Many of these may be past timely filing or appeal limits.' },
    { id: 'recovery91to120', label: 'Assumed recovery rate, 91 to 120 days', unit: 'pct', default: 50, min: 0, max: 100, step: 1, help: 'Share of this bucket you expect could still be collected. This is your assumption; adjust it to your payer mix and history.' },
    { id: 'recovery121to180', label: 'Assumed recovery rate, 121 to 180 days', unit: 'pct', default: 35, min: 0, max: 100, step: 1, help: 'Older balances usually recover at lower rates.' },
    { id: 'recovery181plus', label: 'Assumed recovery rate, over 180 days', unit: 'pct', default: 15, min: 0, max: 100, step: 1, help: 'The oldest balances often face filing and appeal deadlines, so assume a low rate.' },
    { id: 'recoveryFeePct', label: 'Recovery fee (% of recovered amount)', unit: 'pct', default: 20, min: 0, max: 100, step: 1, optional: true, help: 'Optional. Contingency fee charged on amounts recovered. The default is a placeholder for illustration, not a quote. Enter 0 if working AR in-house.' },
  ],
  outputs: [
    { id: 'totalAgedAr', label: 'Total AR over 90 days', unit: 'usd' },
    { id: 'grossRecoverable', label: 'Estimated recoverable amount', unit: 'usd', primary: true },
    { id: 'recoveryFee', label: 'Estimated recovery fee', unit: 'usd' },
    { id: 'netRecoverable', label: 'Estimated net recovery to the practice', unit: 'usd', primary: true },
    { id: 'blendedRecoveryPct', label: 'Blended recovery rate', unit: 'pct' },
  ],
  compute: (v) => {
    const b = [num(v.ar91to120), num(v.ar121to180), num(v.ar181plus)];
    const r = [num(v.recovery91to120), num(v.recovery121to180), num(v.recovery181plus)];
    const fee = num(v.recoveryFeePct);
    const warnings: string[] = [];
    const notes: string[] = [];
    const empty = { totalAgedAr: null, grossRecoverable: null, recoveryFee: null, netRecoverable: null, blendedRecoveryPct: null };
    if ([...b, ...r, fee].some((x) => x < 0)) {
      warnings.push('Inputs cannot be negative.');
      return { values: empty, warnings };
    }
    if ([...r, fee].some((x) => x > 100)) {
      warnings.push('Percentages cannot be above 100%.');
      return { values: empty, warnings };
    }
    if (r[1] > r[0] || r[2] > r[1]) warnings.push('Older buckets have a higher recovery rate than newer ones. Recovery usually falls as claims age; check the rates.');
    const totalAgedAr = b[0] + b[1] + b[2];
    const grossRecoverable = b[0] * (r[0] / 100) + b[1] * (r[1] / 100) + b[2] * (r[2] / 100);
    const recoveryFee = grossRecoverable * (fee / 100);
    const netRecoverable = grossRecoverable - recoveryFee;
    const blendedRecoveryPct = pct(grossRecoverable, totalAgedAr);
    if (totalAgedAr > 0) {
      notes.push('This is an estimate. Actual recovery depends on why each claim is unpaid, payer appeal limits and documentation.');
      if (b[2] > 0) notes.push('Balances over 180 days may already be past timely filing or appeal deadlines. Prioritizing the newest aged buckets usually protects the most money.');
    }
    return { values: { totalAgedAr, grossRecoverable, recoveryFee, netRecoverable, blendedRecoveryPct }, notes, warnings };
  },
  formula: [
    { expression: 'Total aged AR = AR 91-120 + AR 121-180 + AR over 180', explanation: 'All insurance balances older than 90 days.' },
    { expression: 'Recoverable = Sum of (Bucket balance x Assumed recovery rate)', explanation: 'Each bucket uses its own assumed rate.' },
    { expression: 'Recovery fee = Recoverable x Fee %', explanation: 'A contingency fee is charged only on amounts recovered.' },
    { expression: 'Net recovery = Recoverable - Recovery fee', explanation: 'What the practice keeps.' },
    { expression: 'Blended recovery rate = Recoverable / Total aged AR x 100', explanation: 'The overall share of aged AR expected to be recovered.' },
  ],
  example: {
    inputs: { ar91to120: 60000, ar121to180: 45000, ar181plus: 50000, recovery91to120: 50, recovery121to180: 35, recovery181plus: 15, recoveryFeePct: 20 },
    expected: { totalAgedAr: 155000, grossRecoverable: 53250, recoveryFee: 10650, netRecoverable: 42600, blendedRecoveryPct: 34.35 },
    narrative:
      'Aged AR totals 60,000 + 45,000 + 50,000 = $155,000. At the assumed rates, recoverable amounts are 60,000 x 0.50 = $30,000, 45,000 x 0.35 = $15,750 and 50,000 x 0.15 = $7,500, a total of $53,250. A 20% fee is 53,250 x 0.20 = $10,650, leaving a net recovery of $42,600. The blended rate is 53,250 / 155,000 = 34.35%.',
  },
  assumptions: [
    'Recovery rates are your assumptions for each bucket. The defaults are placeholders for illustration, not benchmarks.',
    'Balances are insurance AR. Patient balances follow different collection rules and usually recover at different rates.',
    'Aging buckets come from the same report date and do not overlap.',
    'The fee, if any, is a flat percentage of amounts recovered with no minimums or hourly charges.',
  ],
  faqs: [
    {
      q: 'How much old accounts receivable can a practice recover?',
      a: 'It depends on why the claims are unpaid and how old they are. Claims that are simply unworked or missing information are often recoverable, while those past a payer timely filing or appeal limit may not be. This calculator lets you apply your own assumed recovery rate to each aging bucket to size the opportunity.',
    },
    {
      q: 'What recovery rates should I assume for each aging bucket?',
      a: 'Base them on your own history if you can: look at how much of last year\'s 91 to 180 day AR was eventually paid. If you lack data, start conservative and lower the rate as balances age. The defaults are illustrations only. Running a few scenarios shows how sensitive the result is to these assumptions.',
    },
    {
      q: 'Why does AR over 180 days recover so poorly?',
      a: 'Many payers set timely filing limits for original claims and separate deadlines for appeals and corrected claims. By the time a balance passes 180 days, some of those windows may have closed, documentation may be harder to obtain and staff who knew the account may have moved on. Older balances still deserve review, but expectations should be lower.',
    },
    {
      q: 'Should I include patient balances?',
      a: 'This calculator is designed for insurance AR. Patient balances follow different rules, involve statements and payment plans, and may move to a collection agency with its own fees. If you want to include them, enter them separately and use lower recovery rates, but a dedicated patient balance review usually gives a clearer picture.',
    },
  ],
  relatedServices: ['revenue-recovery', 'aging-ar-follow-up', 'accounts-receivable-management', 'denial-appeals'],
  relatedTools: ['ar-aging-calculator', 'days-in-ar-calculator', 'revenue-leakage-estimator', 'denial-appeal-checklist'],
  seoTitle: 'Revenue Recovery Calculator for Aged AR',
  metaDescription: 'Estimate how much aged insurance AR over 90 days could be recovered using your own recovery rates per bucket, net of any recovery fee.',
  keywords: ['revenue recovery calculator', 'aged ar recovery', 'old insurance claims recovery'],
};

export default calc;
