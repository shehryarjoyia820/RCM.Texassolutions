import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-ar-aging-calculator',
  name: 'Dental AR Aging Calculator',
  category: 'dental',
  icon: 'Hourglass',
  summary: 'Age dental insurance and patient balances separately and see how much of each is over 90 days.',
  definition:
    'A dental AR aging analysis groups unpaid balances by age, usually 0 to 30, 31 to 60, 61 to 90 and over 90 days, and keeps insurance claims separate from patient balances. The two behave differently: insurance AR depends on claims and carrier follow-up, while patient AR depends on estimates, statements and payment policies at the front desk.',
  inputs: [
    { id: 'ins0to30', label: 'Insurance AR 0 to 30 days', unit: 'usd', default: 30000, min: 0, step: 100, help: 'Outstanding insurance claims 0 to 30 days old.' },
    { id: 'ins31to60', label: 'Insurance AR 31 to 60 days', unit: 'usd', default: 10000, min: 0, step: 100, help: 'Outstanding insurance claims 31 to 60 days old.' },
    { id: 'ins61to90', label: 'Insurance AR 61 to 90 days', unit: 'usd', default: 5000, min: 0, step: 100, help: 'Outstanding insurance claims 61 to 90 days old.' },
    { id: 'ins90plus', label: 'Insurance AR over 90 days', unit: 'usd', default: 5000, min: 0, step: 100, help: 'Outstanding insurance claims older than 90 days.' },
    { id: 'pat0to30', label: 'Patient AR 0 to 30 days', unit: 'usd', default: 8000, min: 0, step: 100, help: 'Patient balances 0 to 30 days old.' },
    { id: 'pat31to60', label: 'Patient AR 31 to 60 days', unit: 'usd', default: 4000, min: 0, step: 100, help: 'Patient balances 31 to 60 days old.' },
    { id: 'pat61to90', label: 'Patient AR 61 to 90 days', unit: 'usd', default: 3000, min: 0, step: 100, help: 'Patient balances 61 to 90 days old.' },
    { id: 'pat90plus', label: 'Patient AR over 90 days', unit: 'usd', default: 5000, min: 0, step: 100, help: 'Patient balances older than 90 days.' },
  ],
  outputs: [
    { id: 'totalAr', label: 'Total AR', unit: 'usd' },
    { id: 'over90Pct', label: 'Share of total AR over 90 days', unit: 'pct', primary: true },
    { id: 'over90', label: 'Total AR over 90 days', unit: 'usd' },
    { id: 'insTotal', label: 'Insurance AR', unit: 'usd' },
    { id: 'patTotal', label: 'Patient AR', unit: 'usd' },
    { id: 'insShare', label: 'Insurance share of total AR', unit: 'pct' },
    { id: 'patShare', label: 'Patient share of total AR', unit: 'pct' },
    { id: 'insOver90Pct', label: 'Insurance AR over 90 days', unit: 'pct' },
    { id: 'patOver90Pct', label: 'Patient AR over 90 days', unit: 'pct' },
    { id: 'ins0to30Pct', label: 'Insurance AR 0 to 30 days', unit: 'pct' },
    { id: 'ins31to60Pct', label: 'Insurance AR 31 to 60 days', unit: 'pct' },
    { id: 'ins61to90Pct', label: 'Insurance AR 61 to 90 days', unit: 'pct' },
    { id: 'pat0to30Pct', label: 'Patient AR 0 to 30 days', unit: 'pct' },
    { id: 'pat31to60Pct', label: 'Patient AR 31 to 60 days', unit: 'pct' },
    { id: 'pat61to90Pct', label: 'Patient AR 61 to 90 days', unit: 'pct' },
  ],
  compute: (raw) => {
    const ins = [num(raw.ins0to30), num(raw.ins31to60), num(raw.ins61to90), num(raw.ins90plus)];
    const pat = [num(raw.pat0to30), num(raw.pat31to60), num(raw.pat61to90), num(raw.pat90plus)];
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([...ins, ...pat].some((x) => x < 0)) warnings.push('One or more buckets is negative. Review credit balances separately and leave them out of aging totals.');
    const insTotal = ins.reduce((s, x) => s + x, 0);
    const patTotal = pat.reduce((s, x) => s + x, 0);
    const total = insTotal + patTotal;
    const over90 = ins[3] + pat[3];
    const iS = (x: number) => (insTotal > 0 ? pct(x, insTotal) : null);
    const pS = (x: number) => (patTotal > 0 ? pct(x, patTotal) : null);
    const tS = (x: number) => (total > 0 ? pct(x, total) : null);
    const over90Pct = tS(over90);
    const insOver90Pct = iS(ins[3]);
    const patOver90Pct = pS(pat[3]);
    if (over90Pct !== null) {
      notes.push(`About ${over90Pct.toFixed(1)}% of your total AR is more than 90 days old. Older dental balances, insurance or patient, generally become harder to collect.`);
      if (insOver90Pct !== null && patOver90Pct !== null) {
        notes.push(patOver90Pct > insOver90Pct
          ? 'Patient balances are aging faster than insurance. Clearer treatment estimates, collecting patient portions at the visit and regular statements are designed to help.'
          : 'Insurance balances are aging at least as fast as patient balances. Check claim status on older claims and look for missing attachments or unworked denials.');
      }
    }
    return {
      values: {
        totalAr: total > 0 ? total : null,
        over90Pct,
        over90: total > 0 ? over90 : null,
        insTotal: total > 0 ? insTotal : null,
        patTotal: total > 0 ? patTotal : null,
        insShare: tS(insTotal),
        patShare: tS(patTotal),
        insOver90Pct,
        patOver90Pct,
        ins0to30Pct: iS(ins[0]),
        ins31to60Pct: iS(ins[1]),
        ins61to90Pct: iS(ins[2]),
        pat0to30Pct: pS(pat[0]),
        pat31to60Pct: pS(pat[1]),
        pat61to90Pct: pS(pat[2]),
      },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Insurance AR = sum of the four insurance buckets; Patient AR = sum of the four patient buckets', explanation: 'Each balance belongs in exactly one bucket.' },
    { expression: 'Total AR = Insurance AR + Patient AR', explanation: 'All outstanding balances.' },
    { expression: 'Bucket share = Bucket balance / Insurance AR (or Patient AR) x 100', explanation: 'Aging mix within each type of AR.' },
    { expression: 'Share over 90 days = (Insurance over 90 + Patient over 90) / Total AR x 100', explanation: 'The headline aging indicator.' },
    { expression: 'Insurance or patient share = Insurance AR (or Patient AR) / Total AR x 100', explanation: 'How AR splits between carriers and patients.' },
  ],
  example: {
    inputs: { ins0to30: 30000, ins31to60: 10000, ins61to90: 5000, ins90plus: 5000, pat0to30: 8000, pat31to60: 4000, pat61to90: 3000, pat90plus: 5000 },
    expected: {
      totalAr: 70000, over90Pct: 14.29, over90: 10000, insTotal: 50000, patTotal: 20000, insShare: 71.43, patShare: 28.57,
      insOver90Pct: 10, patOver90Pct: 25, ins0to30Pct: 60, ins31to60Pct: 20, ins61to90Pct: 10, pat0to30Pct: 40, pat31to60Pct: 20, pat61to90Pct: 15,
    },
    narrative: 'Insurance AR is 30,000 + 10,000 + 5,000 + 5,000 = $50,000 and patient AR is 8,000 + 4,000 + 3,000 + 5,000 = $20,000, for total AR of $70,000. Insurance is 50,000 / 70,000 = 71.43% of AR and patients 20,000 / 70,000 = 28.57%. Insurance buckets are 60%, 20%, 10% and 10% of $50,000; patient buckets are 8,000 / 20,000 = 40%, 20%, 15% and 25%. AR over 90 days is 5,000 + 5,000 = $10,000, or 10,000 / 70,000 = 14.29% of total AR.',
  },
  assumptions: [
    'Insurance and patient balances are aged on the same basis, usually from date of service.',
    'Credit balances are excluded from all buckets.',
    'Balances sitting in insurance AR that are really patient responsibility should be moved to patient AR for an accurate picture.',
  ],
  faqs: [
    {
      q: 'Why age insurance and patient AR separately in a dental office?',
      a: 'Insurance and patient balances are collected in different ways, so combining them hides problems. Old insurance AR usually points to claim issues such as missing attachments, unworked denials or claims never received by the carrier. Old patient AR usually points to estimates, payment policies and statement follow-up. Separating them shows which workflow needs attention.',
    },
    {
      q: 'What should a dental office do with insurance claims over 90 days?',
      a: 'Check the status of every insurance claim over 90 days with the carrier, starting with the largest balances. Look for claims never received, requests for more information, missing x-rays or narratives and denials that were not worked. Resubmit, appeal or correct as needed, and move balances that are truly patient responsibility to patient AR.',
    },
    {
      q: 'How can a dental practice reduce patient AR?',
      a: 'Patient AR usually falls when patients know what they owe before treatment and pay their estimated portion at the visit. Accurate benefits verification, written treatment estimates, card on file or payment plan options and prompt, regular statements all help. Reviewing the patient over 90 day bucket monthly keeps small balances from piling up.',
    },
    {
      q: 'Why do some dental balances show in the wrong aging category?',
      a: 'Balances can land in the wrong category when insurance payments are posted without moving the remaining amount to the patient, when write-offs are not applied or when claims are closed incorrectly. These posting issues make insurance AR look older than it is and hide patient balances. Regular reconciliation of payments and adjustments helps keep aging accurate.',
    },
  ],
  relatedServices: ['dental-billing', 'aging-ar-follow-up', 'patient-collections'],
  relatedTools: ['ar-aging-calculator', 'dental-insurance-collection-calculator', 'patient-balance-calculator'],
  seoTitle: 'Dental AR Aging Calculator: Insurance and Patient AR',
  metaDescription: 'Age dental insurance and patient balances in 30 day buckets and see the share of each over 90 days, with formulas, a worked example and follow-up tips.',
  keywords: ['dental ar aging calculator', 'dental accounts receivable aging', 'dental insurance ar over 90 days'],
};

export default calc;
