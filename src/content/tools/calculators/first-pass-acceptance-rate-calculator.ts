import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'first-pass-acceptance-rate-calculator',
  name: 'First-Pass Acceptance Rate Calculator',
  category: 'kpi',
  icon: 'BadgeCheck',
  summary: 'See what share of your claims the clearinghouse and payers accept on the first submission.',
  definition:
    'First-pass acceptance rate is the percentage of claims accepted for processing by the clearinghouse and payer on their first submission, without being rejected for format, data or eligibility errors. It measures claim data quality at submission. It does not show whether claims were later paid, which clean claim rate and denial rate cover.',
  inputs: [
    { id: 'submitted', label: 'Claims submitted (first submissions)', unit: 'count', default: 1500, min: 0, step: 1, help: 'Original claims sent during the period. Exclude resubmissions of previously rejected claims.' },
    { id: 'accepted', label: 'Claims accepted on first submission', unit: 'count', default: 1455, min: 0, step: 1, help: 'Claims accepted by both the clearinghouse and the payer, per acknowledgment reports such as the 999 and 277CA.' },
  ],
  outputs: [
    { id: 'acceptanceRate', label: 'First-pass acceptance rate', unit: 'pct', primary: true },
    { id: 'rejected', label: 'Claims rejected on first submission', unit: 'count' },
    { id: 'rejectionRate', label: 'First-pass rejection rate', unit: 'pct' },
  ],
  compute: (raw) => {
    const submitted = num(raw.submitted);
    const accepted = num(raw.accepted);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (submitted < 0 || accepted < 0) warnings.push('Claim counts should not be negative.');
    if (accepted > submitted) warnings.push('Accepted claims exceed claims submitted. Make sure resubmissions are not counted as accepted first submissions.');
    const valid = submitted > 0 && accepted >= 0 && accepted <= submitted;
    const acceptanceRate = valid ? pct(accepted, submitted) : null;
    const rejected = valid ? submitted - accepted : null;
    const rejectionRate = valid ? pct(submitted - accepted, submitted) : null;
    if (acceptanceRate !== null && rejected !== null) {
      notes.push(`${rejected} claims were rejected before processing and had to be corrected and resubmitted, which delays payment for each one.`);
      notes.push('Acceptance is not payment. Some accepted claims may still be denied, so read this rate alongside denial rate and clean claim rate.');
    }
    return { values: { acceptanceRate, rejected, rejectionRate }, notes, warnings };
  },
  formula: [
    { expression: 'First-pass acceptance rate = Claims accepted on first submission / Claims submitted x 100', explanation: 'Counts only original submissions, not corrected resubmissions.' },
    { expression: 'First-pass rejection rate = (Claims submitted - Claims accepted) / Claims submitted x 100', explanation: 'The complement of the acceptance rate.' },
  ],
  example: {
    inputs: { submitted: 1500, accepted: 1455 },
    expected: { acceptanceRate: 97, rejected: 45, rejectionRate: 3 },
    narrative: 'A practice sent 1,500 original claims and 1,455 were accepted on the first try. Acceptance rate is 1,455 / 1,500 = 97%. 1,500 - 1,455 = 45 claims were rejected, a first-pass rejection rate of 45 / 1,500 = 3%.',
  },
  assumptions: [
    'A claim counts as accepted only if both the clearinghouse and the payer accepted it for processing.',
    'Resubmitted claims are excluded from both counts.',
    'Acceptance says nothing about payment. Adjudication outcomes are measured by denial rate and clean claim rate.',
  ],
  faqs: [
    {
      q: 'What is a first-pass acceptance rate?',
      a: 'First-pass acceptance rate is the share of original claims that the clearinghouse and payer accept for processing on the first submission. A claim that is rejected for a missing subscriber ID, an invalid NPI or a formatting problem fails first pass. The metric shows how accurate your claim data is at the moment it leaves the practice.',
    },
    {
      q: 'How is first-pass acceptance different from clean claim rate?',
      a: 'First-pass acceptance only checks whether a claim was accepted for processing. Clean claim rate also requires the claim to be paid without edits, denials or rework. Because accepted claims can still be denied, clean claim rate is almost always lower. Tracking both separates data entry problems from coverage, coding and medical necessity problems.',
    },
    {
      q: 'Is first-pass acceptance the same as first-pass resolution?',
      a: 'No. First-pass resolution usually measures claims that were fully resolved, typically paid, after a single submission. First-pass acceptance stops earlier, at the clearinghouse and payer acceptance stage, before adjudication. A practice can have a high acceptance rate and a much lower resolution rate if many accepted claims are later denied or pended.',
    },
    {
      q: 'Where do I find the data to calculate first-pass acceptance?',
      a: 'Use your clearinghouse acknowledgment and rejection reports. In the X12 transaction set, the 999 acknowledgment confirms a file was syntactically accepted and the 277CA claim acknowledgment shows whether each claim was accepted or rejected by the payer. Many clearinghouses summarize these in a rejection report that can be filtered to original submissions.',
    },
  ],
  relatedServices: ['claims-scrubbing', 'clearinghouse-coordination', 'electronic-claims-processing'],
  relatedTools: ['clean-claim-rate-calculator', 'claim-rejection-rate-calculator', 'claim-status-categories'],
  seoTitle: 'First-Pass Acceptance Rate Calculator for Claims',
  metaDescription: 'Calculate the share of claims accepted on first submission and see how this differs from clean claim and first-pass resolution rates.',
  keywords: ['first pass acceptance rate', 'first pass claim acceptance calculator', 'claim acceptance rate'],
};

export default calc;
