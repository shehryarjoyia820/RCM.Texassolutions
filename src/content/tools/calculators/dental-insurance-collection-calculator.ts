import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-insurance-collection-calculator',
  name: 'Dental Insurance Collection Calculator',
  category: 'dental',
  icon: 'HandCoins',
  summary: 'See what share of your insurance net production, after PPO write-offs, you actually collect from carriers.',
  definition:
    'Dental insurance collection rate is the share of insurance net production that a practice collects from dental carriers. Net production is gross insurance production minus PPO and other contractual write-offs. Because write-offs are removed first, the rate shows money lost to denials, unpaid claims and errors rather than the effect of PPO fee schedules.',
  inputs: [
    { id: 'grossProduction', label: 'Gross insurance production', unit: 'usd', default: 100000, min: 0, step: 100, help: 'Insurance portion of production at your full fee schedule for the period.' },
    { id: 'ppoWriteOffs', label: 'PPO and contractual write-offs', unit: 'usd', default: 30000, min: 0, step: 100, help: 'Write-offs to PPO and other contracted fee schedules only. Exclude denial and bad debt write-offs.' },
    { id: 'insuranceCollections', label: 'Insurance payments collected', unit: 'usd', default: 66500, min: 0, step: 100, help: 'Payments received from dental carriers for that production.' },
  ],
  outputs: [
    { id: 'collectionRate', label: 'Insurance collection rate', unit: 'pct', primary: true },
    { id: 'netProduction', label: 'Insurance net production', unit: 'usd' },
    { id: 'uncollected', label: 'Insurance net production not collected', unit: 'usd' },
    { id: 'writeOffPct', label: 'PPO write-offs as a share of gross production', unit: 'pct' },
  ],
  compute: (raw) => {
    const gross = num(raw.grossProduction);
    const wo = num(raw.ppoWriteOffs);
    const coll = num(raw.insuranceCollections);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (gross < 0 || wo < 0 || coll < 0) warnings.push('Inputs should not be negative.');
    if (wo > gross) warnings.push('Write-offs exceed gross production. Check the figures.');
    const net = gross - wo;
    if (net > 0 && coll > net) warnings.push('Collections exceed net production. The periods may not match, or write-offs may be overstated.');
    const collectionRate = net > 0 ? pct(coll, net) : null;
    const writeOffPct = gross > 0 && wo >= 0 && wo <= gross ? pct(wo, gross) : null;
    if (collectionRate !== null && collectionRate <= 100) {
      notes.push(`You collected about ${collectionRate.toFixed(1)}% of the insurance revenue you were contractually owed. The uncollected part includes denials, unpaid claims and any amounts shifted to patients.`);
      notes.push('Insurance payments lag production by several weeks, so a single month can understate the rate. A rolling three month view is more reliable.');
    }
    return { values: { collectionRate, netProduction: net > 0 ? net : null, uncollected: net > 0 ? net - coll : null, writeOffPct }, notes, warnings };
  },
  formula: [
    { expression: 'Insurance net production = Gross insurance production - PPO write-offs', explanation: 'The insurance revenue you are contractually entitled to collect.' },
    { expression: 'Insurance collection rate = Insurance collections / Insurance net production x 100', explanation: 'Share of collectible insurance revenue received.' },
    { expression: 'Write-off share = PPO write-offs / Gross insurance production x 100', explanation: 'How far below your fees the PPO schedules sit on average.' },
  ],
  example: {
    inputs: { grossProduction: 100000, ppoWriteOffs: 30000, insuranceCollections: 66500 },
    expected: { collectionRate: 95, netProduction: 70000, uncollected: 3500, writeOffPct: 30 },
    narrative: 'A practice produced $100,000 in insurance dentistry at full fees and wrote off $30,000 to PPO schedules, so net production is 100,000 - 30,000 = $70,000. It collected $66,500, an insurance collection rate of 66,500 / 70,000 = 95%. The remaining 70,000 - 66,500 = $3,500 is uncollected, and write-offs were 30,000 / 100,000 = 30% of gross production.',
  },
  assumptions: [
    'Collections and production cover the same period, or collections are lagged to match production.',
    'Write-offs include only contractual PPO and plan adjustments.',
    'Patient copays and coinsurance are excluded from both production and collections in this calculation.',
  ],
  faqs: [
    {
      q: 'Why remove PPO write-offs before calculating the collection rate?',
      a: 'PPO write-offs are amounts you agreed in your contracts not to collect, so including them would make the rate reflect your fee schedule rather than your billing performance. Removing them first means the rate shows how much contractually owed insurance revenue was actually received, and what was lost to denials, unpaid claims and errors.',
    },
    {
      q: 'What is a good dental insurance collection rate?',
      a: 'The aim is to collect as close to all of insurance net production as possible, since net production is what carriers are expected to pay. There is no single published standard that fits every practice. Track your own rate over a rolling period, and investigate any drop by carrier, procedure type and claim age.',
    },
    {
      q: 'Why can my rate be above 100% in some months?',
      a: 'A rate above 100% usually means collections in the period include payments for production from earlier months. Insurance payments often arrive several weeks after treatment, so a slow month followed by a busy one can produce this. Comparing collections with production from a lagged period, or using a rolling quarter, gives a steadier figure.',
    },
    {
      q: 'What causes uncollected insurance net production?',
      a: 'Common causes include denied claims that are not appealed, claims never submitted or rejected without follow-up, missing attachments, frequency limitations, maximums reached and patient portions incorrectly left on insurance. Write-off adjustments posted to the wrong category can also distort the figures. An aging report of insurance claims by carrier usually shows where to look first.',
    },
  ],
  relatedServices: ['dental-billing', 'payment-posting', 'aging-ar-follow-up'],
  relatedTools: ['dental-ar-aging-calculator', 'dental-denial-rate-calculator', 'net-collection-rate-calculator'],
  seoTitle: 'Dental Insurance Collection Rate Calculator',
  metaDescription: 'Calculate your dental insurance collection rate from gross production, PPO write-offs and carrier payments, and see how much net production is uncollected.',
  keywords: ['dental insurance collection rate', 'dental collection percentage', 'ppo write-off calculator'],
};

export default calc;
