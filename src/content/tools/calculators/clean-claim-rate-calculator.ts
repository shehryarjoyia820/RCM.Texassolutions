import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'clean-claim-rate-calculator',
  name: 'Clean Claim Rate Calculator',
  category: 'kpi',
  icon: 'CircleCheck',
  summary: 'Measure the share of dental claims that are accepted and paid on first submission with no rework.',
  definition:
    'Clean claim rate is the percentage of dental claims, sent on the ADA Dental Claim Form or electronically as an 837D, that are accepted and paid on first submission without corrections, rejections, requests for x-rays or narratives, denials or other rework. A claim only counts as clean if it was both accepted and paid as submitted.',
  inputs: [
    { id: 'totalClaims', label: 'Total dental claims submitted', unit: 'count', default: 1500, min: 0, step: 1, help: 'First-time dental claims sent to carriers during the period. Do not count corrected claims or resubmissions.' },
    { id: 'cleanClaims', label: 'Claims paid with no edits or rework', unit: 'count', default: 1380, min: 0, step: 1, help: 'Claims accepted and paid as first submitted, with no clearinghouse rejection, request for attachments, denial or resubmission.' },
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
      notes.push('Review the rework claims by cause (clearinghouse edits, rejections, denials) to see which front end step would prevent the most repeat errors.');
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
    narrative: 'A dental group sent 1,500 first-time claims to dental carriers, and 1,380 were paid without any edits or rework. Clean claim rate is 1,380 / 1,500 = 92%. The other 1,500 - 1,380 = 120 claims needed rework, such as a missing x-ray or a rejected subscriber ID, a rework rate of 120 / 1,500 = 8%.',
  },
  assumptions: [
    'Definitions vary between organizations. This calculator counts a dental claim as clean only if it passed clearinghouse edits, was accepted by the carrier and was paid as first submitted.',
    'Claims still pending at the end of the period, including those waiting on carrier review of attachments, are excluded from both counts.',
  ],
  faqs: [
    {
      q: 'What counts as a clean dental claim?',
      a: 'A clean dental claim is accepted and paid on its first submission without corrections, rejections, denials or requests for x-rays, perio charts or narratives. Definitions vary between organizations and carriers, so document the rule your office uses. Measuring through to payment, rather than stopping at clearinghouse acceptance, gives a truer picture of rework.',
    },
    {
      q: 'How is clean claim rate different from first-pass acceptance rate?',
      a: 'First-pass acceptance only asks whether the clearinghouse or dental carrier accepted the claim for processing on the first try. Clean claim rate also asks whether the claim was paid without rework. A crown claim can be accepted and then pended for a missing x-ray, so clean claim rate is normally lower than acceptance rate.',
    },
    {
      q: 'Is clean claim rate the same as first-pass resolution rate?',
      a: 'They are closely related but not always identical. First-pass resolution rate usually measures dental claims fully resolved, paid or properly closed, after one submission. Clean claim rate focuses on claims that needed no edits at any stage, including review before the claim left the office. Check how your reports define each metric before comparing them.',
    },
    {
      q: 'What usually lowers a dental clean claim rate?',
      a: 'The most common causes are eligibility and subscriber errors, frequency conflicts, missing x-rays, photos, perio charts or narratives, missing tooth numbers or surfaces, outdated CDT codes, provider IDs that do not match carrier enrollment, and secondary claims sent without the primary EOB. Tracking rework by cause shows which fix would help most.',
    },
  ],
  relatedServices: ['dental-claims-processing', 'dental-insurance-verification', 'denial-management'],
  relatedTools: ['dental-denial-rate-calculator', 'claim-submission-checklist', 'dental-insurance-verification-checklist'],
  seoTitle: 'Clean Claim Rate Calculator for Dental Claims',
  metaDescription: 'Calculate your dental clean claim rate and rework rate from claims paid with no edits on first submission, with the formula, an example and common causes.',
  keywords: ['dental clean claim rate calculator', 'clean claim rate formula', 'dental claim rework rate', '837d clean claims'],
};

export default calc;
