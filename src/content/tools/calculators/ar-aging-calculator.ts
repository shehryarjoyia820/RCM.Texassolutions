import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'ar-aging-calculator',
  name: 'AR Aging Calculator',
  category: 'kpi',
  icon: 'Layers',
  summary: 'Break your accounts receivable into aging buckets and see how much is over 90 and 120 days.',
  definition:
    'An AR aging analysis groups outstanding balances by how long they have been unpaid, typically 0 to 30, 31 to 60, 61 to 90, 91 to 120 and over 120 days from the date of service or claim. The share of AR over 90 and over 120 days shows how much revenue is at growing risk of never being collected.',
  inputs: [
    { id: 'b0to30', label: 'AR 0 to 30 days', unit: 'usd', default: 120000, min: 0, step: 100, help: 'Balances 0 to 30 days old.' },
    { id: 'b31to60', label: 'AR 31 to 60 days', unit: 'usd', default: 60000, min: 0, step: 100, help: 'Balances 31 to 60 days old.' },
    { id: 'b61to90', label: 'AR 61 to 90 days', unit: 'usd', default: 30000, min: 0, step: 100, help: 'Balances 61 to 90 days old.' },
    { id: 'b91to120', label: 'AR 91 to 120 days', unit: 'usd', default: 15000, min: 0, step: 100, help: 'Balances 91 to 120 days old.' },
    { id: 'b120plus', label: 'AR over 120 days', unit: 'usd', default: 25000, min: 0, step: 100, help: 'Balances older than 120 days.' },
  ],
  outputs: [
    { id: 'total', label: 'Total AR', unit: 'usd' },
    { id: 'pctOver90', label: 'Share of AR over 90 days', unit: 'pct', primary: true },
    { id: 'pctOver120', label: 'Share of AR over 120 days', unit: 'pct', primary: true },
    { id: 'over90', label: 'AR over 90 days', unit: 'usd' },
    { id: 'pct0to30', label: 'Share 0 to 30 days', unit: 'pct' },
    { id: 'pct31to60', label: 'Share 31 to 60 days', unit: 'pct' },
    { id: 'pct61to90', label: 'Share 61 to 90 days', unit: 'pct' },
    { id: 'pct91to120', label: 'Share 91 to 120 days', unit: 'pct' },
    { id: 'pct120plus', label: 'Share over 120 days', unit: 'pct' },
  ],
  compute: (raw) => {
    const b = [num(raw.b0to30), num(raw.b31to60), num(raw.b61to90), num(raw.b91to120), num(raw.b120plus)];
    const warnings: string[] = [];
    const notes: string[] = [];
    if (b.some((x) => x < 0)) warnings.push('One or more buckets is negative. Credit balances should be reviewed separately and left out of aging totals.');
    const total = b.reduce((s, x) => s + x, 0);
    const over90 = b[3] + b[4];
    const ok = total > 0;
    const share = (x: number) => (ok ? pct(x, total) : null);
    const pctOver90 = share(over90);
    const pctOver120 = share(b[4]);
    if (pctOver90 !== null) {
      notes.push(`About ${pctOver90.toFixed(1)}% of your AR is more than 90 days old. Older balances generally become harder to collect as payer filing and appeal deadlines approach.`);
      if (pctOver120 !== null && pctOver120 > 0) notes.push('Review the over 120 day bucket claim by claim: some balances may still be recoverable through appeal or corrected claims, while others may need a documented write-off decision.');
    }
    return {
      values: {
        total: ok ? total : null,
        pctOver90,
        pctOver120,
        over90: ok ? over90 : null,
        pct0to30: share(b[0]),
        pct31to60: share(b[1]),
        pct61to90: share(b[2]),
        pct91to120: share(b[3]),
        pct120plus: share(b[4]),
      },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Total AR = sum of all five buckets', explanation: 'Every outstanding balance belongs in exactly one bucket.' },
    { expression: 'Bucket share = Bucket balance / Total AR x 100', explanation: 'Shows how AR is distributed by age.' },
    { expression: 'Share over 90 days = (AR 91 to 120 + AR over 120) / Total AR x 100', explanation: 'The most commonly tracked aging indicator.' },
    { expression: 'Share over 120 days = AR over 120 / Total AR x 100', explanation: 'Balances at the highest risk of becoming uncollectible.' },
  ],
  example: {
    inputs: { b0to30: 120000, b31to60: 60000, b61to90: 30000, b91to120: 15000, b120plus: 25000 },
    expected: { total: 250000, pctOver90: 16, pctOver120: 10, over90: 40000, pct0to30: 48, pct31to60: 24, pct61to90: 12, pct91to120: 6, pct120plus: 10 },
    narrative: 'Total AR is 120,000 + 60,000 + 30,000 + 15,000 + 25,000 = $250,000. The buckets are 120,000 / 250,000 = 48%, 60,000 / 250,000 = 24%, 30,000 / 250,000 = 12%, 15,000 / 250,000 = 6% and 25,000 / 250,000 = 10%. AR over 90 days is 15,000 + 25,000 = $40,000, which is 16% of total AR, and 10% is over 120 days.',
  },
  assumptions: [
    'Aging is measured consistently, either from date of service or from claim submission date. Date of service aging shows older numbers.',
    'Credit balances are excluded from the buckets.',
    'Insurance and patient balances are combined. Aging them separately usually gives a clearer picture.',
  ],
  faqs: [
    {
      q: 'What is an AR aging report?',
      a: 'An AR aging report lists unpaid balances grouped by how long they have been outstanding, usually in 30 day buckets. It helps a practice see where money is stuck and which claims to prioritize. Billing teams typically run it by payer and by bucket, then work the oldest high dollar claims first before filing deadlines pass.',
    },
    {
      q: 'Why does the percentage of AR over 90 days matter?',
      a: 'The share of AR over 90 days matters because older balances are generally harder to collect. Claims that old may be near timely filing or appeal deadlines, and patient balances become less likely to be paid as time passes. Tracking this share monthly shows whether follow-up is keeping pace with new charges or whether old balances are piling up.',
    },
    {
      q: 'Should AR be aged from date of service or claim date?',
      a: 'Either works if you use it consistently, but they answer different questions. Aging from date of service captures delays in charge entry and claim submission as well as payer delays. Aging from claim submission isolates payer and follow-up delays. Many practices review date of service aging for overall health and submission date aging for payer follow-up.',
    },
    {
      q: 'How can a practice reduce old AR?',
      a: 'Start by sorting old balances by payer and dollar amount, then work the largest recoverable claims first. Check claim status, correct and resubmit rejected claims, appeal valid denials and call payers on claims with no response. Fixing the root causes, such as eligibility errors or missing authorizations, helps prevent new balances from aging the same way.',
    },
  ],
  relatedServices: ['aging-ar-follow-up', 'accounts-receivable-management', 'revenue-recovery'],
  relatedTools: ['days-in-ar-calculator', 'revenue-recovery-calculator', 'denial-rate-calculator'],
  seoTitle: 'AR Aging Calculator: Share of AR Over 90 and 120 Days',
  metaDescription: 'Enter AR by aging bucket to see totals, the share in each bucket and how much of your AR is over 90 and 120 days, with formulas and a worked example.',
  keywords: ['ar aging calculator', 'ar over 90 days', 'accounts receivable aging buckets'],
};

export default calc;
