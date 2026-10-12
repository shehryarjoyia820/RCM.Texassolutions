import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'claim-rejection-rate-calculator',
  name: 'Claim Rejection Rate Calculator',
  category: 'kpi',
  icon: 'CircleX',
  summary: 'Calculate how many claims are rejected before processing and how many have been fixed.',
  definition:
    'Claim rejection rate is the percentage of submitted claims returned by the clearinghouse or payer before adjudication because of missing, invalid or badly formatted data. Rejected claims were never processed, so they must be corrected and resubmitted. This differs from a denial, where the payer processed the claim and decided not to pay.',
  inputs: [
    { id: 'submitted', label: 'Claims submitted', unit: 'count', default: 1500, min: 0, step: 1, help: 'Claims sent to the clearinghouse during the period.' },
    { id: 'rejected', label: 'Claims rejected', unit: 'count', default: 60, min: 0, step: 1, help: 'Claims returned by the clearinghouse or payer before processing. Do not include denials.' },
    { id: 'corrected', label: 'Rejected claims corrected and accepted', unit: 'count', default: 54, min: 0, step: 1, optional: true, help: 'Optional. Rejected claims that have since been fixed, resubmitted and accepted.' },
  ],
  outputs: [
    { id: 'rejectionRate', label: 'Claim rejection rate', unit: 'pct', primary: true },
    { id: 'acceptanceRate', label: 'Acceptance rate', unit: 'pct' },
    { id: 'correctionRate', label: 'Share of rejections corrected and accepted', unit: 'pct' },
    { id: 'outstanding', label: 'Rejected claims still open', unit: 'count' },
  ],
  compute: (raw) => {
    const submitted = num(raw.submitted);
    const rejected = num(raw.rejected);
    const corrected = num(raw.corrected);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (submitted < 0 || rejected < 0 || corrected < 0) warnings.push('Claim counts should not be negative.');
    if (rejected > submitted) warnings.push('Rejected claims exceed claims submitted. Check that both counts cover the same period.');
    if (corrected > rejected) warnings.push('Corrected claims exceed rejected claims. Only count claims that were originally rejected.');
    const valid = submitted > 0 && rejected >= 0 && rejected <= submitted;
    const rejectionRate = valid ? pct(rejected, submitted) : null;
    const acceptanceRate = valid ? pct(submitted - rejected, submitted) : null;
    const corrOk = rejected > 0 && corrected >= 0 && corrected <= rejected;
    const correctionRate = corrOk ? pct(corrected, rejected) : null;
    const outstanding = corrOk ? rejected - corrected : null;
    if (rejectionRate !== null) {
      notes.push(`About ${rejectionRate.toFixed(1)} of every 100 claims were sent back before processing. Rejections are usually caused by data errors that can be caught earlier with eligibility checks and claim scrubbing.`);
      if (outstanding !== null && outstanding > 0) notes.push(`${outstanding} rejected claims are still open. Rejected claims are not on file with the payer, so they can run into timely filing limits if they are not resubmitted.`);
    }
    return { values: { rejectionRate, acceptanceRate, correctionRate, outstanding }, notes, warnings };
  },
  formula: [
    { expression: 'Rejection rate = Claims rejected / Claims submitted x 100', explanation: 'Counts claims returned before adjudication only.' },
    { expression: 'Acceptance rate = (Claims submitted - Claims rejected) / Claims submitted x 100', explanation: 'The complement of the rejection rate.' },
    { expression: 'Correction rate = Rejected claims corrected and accepted / Claims rejected x 100', explanation: 'Shows how completely rejections are being worked.' },
    { expression: 'Open rejections = Claims rejected - Rejected claims corrected and accepted', explanation: 'Rejected claims still waiting to be fixed or resubmitted.' },
  ],
  example: {
    inputs: { submitted: 1500, rejected: 60, corrected: 54 },
    expected: { rejectionRate: 4, acceptanceRate: 96, correctionRate: 90, outstanding: 6 },
    narrative: 'A practice submitted 1,500 claims and 60 were rejected. Rejection rate is 60 / 1,500 = 4%, so acceptance is 100 - 4 = 96%. 54 of the 60 rejections were corrected and accepted, a correction rate of 54 / 60 = 90%, leaving 60 - 54 = 6 rejected claims open.',
  },
  assumptions: [
    'Rejections and denials are counted separately. Only claims returned before adjudication count as rejections.',
    'A claim rejected more than once is counted once in the rejected total.',
  ],
  faqs: [
    {
      q: 'What is the difference between a rejected claim and a denied claim?',
      a: 'A rejected claim was returned before the payer processed it, usually because of missing or invalid data such as a wrong member ID, NPI or date. A denied claim was processed, or adjudicated, and the payer decided not to pay. Rejections are fixed and resubmitted as new claims, while denials usually need a corrected claim or a formal appeal.',
    },
    {
      q: 'Why do rejected claims need fast follow-up?',
      a: 'Rejected claims need fast follow-up because the payer has no record of a processed claim. Until a corrected claim is accepted, the timely filing clock keeps running. If rejections sit unworked on a clearinghouse report, a fixable claim can turn into a timely filing write-off. Working rejections daily or every few days helps avoid that risk.',
    },
    {
      q: 'What are the most common reasons for claim rejections?',
      a: 'Common reasons include incorrect patient demographics, invalid or inactive member IDs, wrong payer IDs, missing or invalid provider NPIs, invalid diagnosis or procedure code formats, missing required fields and date errors. Most are data entry or setup problems. Eligibility verification at registration and claim scrubbing before submission are designed to catch many of them.',
    },
    {
      q: 'Is a lower rejection rate always better?',
      a: 'Generally yes, because each rejection adds rework and delays payment. But a rejection rate that suddenly drops to zero can also mean rejections are not being captured, for example if a clearinghouse report is not being reviewed. Confirm that rejection reports from both the clearinghouse and payers are being pulled before celebrating a very low number.',
    },
  ],
  relatedServices: ['claims-scrubbing', 'clearinghouse-coordination', 'claims-submission'],
  relatedTools: ['first-pass-acceptance-rate-calculator', 'denial-rate-calculator', 'claim-status-categories'],
  seoTitle: 'Claim Rejection Rate Calculator: Rejections vs Denials',
  metaDescription: 'Calculate your claim rejection rate and how many rejected claims are still open, and learn the difference between a rejected claim and a denied claim.',
  keywords: ['claim rejection rate calculator', 'rejected vs denied claims', 'claim rejection rate formula'],
};

export default calc;
