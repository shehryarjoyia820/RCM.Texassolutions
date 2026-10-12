import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'clean-claim-rate-calculator',
  name: 'Clean Claim Rate Calculator',
  category: 'kpi',
  icon: 'CircleCheck',
  summary: 'Measure the share of claims that go through and get paid on first submission with no rework.',
  definition:
    'Clean claim rate is the percentage of claims that are accepted and paid on their first submission without edits, corrections, rejections, denials or other rework. It is a stricter measure than first-pass acceptance, because a claim only counts as clean if it was both accepted and paid as submitted.',
  inputs: [
    { id: 'totalClaims', label: 'Total claims submitted', unit: 'count', default: 1500, min: 0, step: 1, help: 'Claims submitted for the first time during the period.' },
    { id: 'cleanClaims', label: 'Claims paid with no edits or rework', unit: 'count', default: 1380, min: 0, step: 1, help: 'Claims that were accepted and paid as first submitted, with no scrubber edits, rejections, denials or resubmissions.' },
  ],
  outputs: [
    { id: 'cleanRate', label: 'Clean claim rate', unit: 'pct', primary: true },
    { id: 'reworkClaims', label: 'Claims that needed rework', unit: 'count' },
    { id: 'reworkRate', label: 'Rework rate', unit: 'pct' },
  ],
  compute: (raw) => {
    const total = num(raw.totalClaims);
    const clean = num(raw.cleanClaims);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (total < 0 || clean < 0) warnings.push('Claim counts should not be negative.');
    if (clean > total) warnings.push('Clean claims exceed total claims submitted. Check that both counts cover the same claims.');
    const valid = total > 0 && clean >= 0 && clean <= total;
    const cleanRate = valid ? pct(clean, total) : null;
    const reworkClaims = valid ? total - clean : null;
    const reworkRate = valid ? pct(total - clean, total) : null;
    if (cleanRate !== null && reworkClaims !== null) {
      notes.push(`${reworkClaims} claims needed some form of rework. Each one adds staff time and delays payment.`);
      notes.push('Review the rework claims by cause (scrubber edits, rejections, denials) to see which front end step would prevent the most repeat errors.');
    }
    return { values: { cleanRate, reworkClaims, reworkRate }, notes, warnings };
  },
  formula: [
    { expression: 'Clean claim rate = Claims paid with no edits or rework / Total claims submitted x 100', explanation: 'A claim is clean only if nothing had to be touched between first submission and payment.' },
    { expression: 'Rework rate = (Total claims - Clean claims) / Total claims x 100', explanation: 'The complement of the clean claim rate.' },
  ],
  example: {
    inputs: { totalClaims: 1500, cleanClaims: 1380 },
    expected: { cleanRate: 92, reworkClaims: 120, reworkRate: 8 },
    narrative: 'Of 1,500 claims submitted, 1,380 were paid without any edits or rework. Clean claim rate is 1,380 / 1,500 = 92%. The other 1,500 - 1,380 = 120 claims needed rework, a rework rate of 120 / 1,500 = 8%.',
  },
  assumptions: [
    'Definitions vary between organizations. This calculator counts a claim as clean only if it passed edits, was accepted and was paid as first submitted.',
    'Claims still pending at the end of the period are excluded from both counts.',
  ],
  faqs: [
    {
      q: 'What counts as a clean claim?',
      a: 'A clean claim is one that is accepted and paid on its first submission without any edits, corrections, rejections, denials or requests for more information. Definitions vary between organizations and payers, so document the rule you use. Some practices count claims that pass their scrubber, but measuring through to payment gives a truer picture of rework.',
    },
    {
      q: 'How is clean claim rate different from first-pass acceptance rate?',
      a: 'First-pass acceptance rate only asks whether the clearinghouse or payer accepted the claim for processing on the first try. Clean claim rate goes further and asks whether the claim was also paid without any rework. A claim can be accepted on first pass and later denied, so clean claim rate is normally lower than acceptance rate.',
    },
    {
      q: 'Is clean claim rate the same as first-pass resolution rate?',
      a: 'They are closely related but not always identical. First-pass resolution rate usually measures claims fully resolved, paid or properly closed, after one submission. Clean claim rate focuses on claims that needed no edits at any stage, including internal scrubber edits before submission. Check how your reports define each metric before comparing them.',
    },
    {
      q: 'What usually lowers a clean claim rate?',
      a: 'The most common causes are registration and eligibility errors, missing or invalid prior authorizations, coding mistakes, missing modifiers, incorrect provider or payer identifiers and missing documentation. Many of these start at the front desk or during charge entry. Tracking rework by cause helps target training and scrubber rules where they prevent the most errors.',
    },
  ],
  relatedServices: ['claims-scrubbing', 'claims-submission', 'charge-entry'],
  relatedTools: ['first-pass-acceptance-rate-calculator', 'denial-rate-calculator', 'claim-submission-checklist'],
  seoTitle: 'Clean Claim Rate Calculator for Medical Billing',
  metaDescription: 'Calculate your clean claim rate and rework rate from claims paid with no edits on first submission, with the formula, an example and common causes of rework.',
  keywords: ['clean claim rate calculator', 'clean claim rate formula', 'clean claim ratio'],
};

export default calc;
