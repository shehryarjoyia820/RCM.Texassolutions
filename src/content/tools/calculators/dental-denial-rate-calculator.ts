import type { Calculator } from '../../types';
import { div, num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-denial-rate-calculator',
  name: 'Dental Denial Rate Calculator',
  category: 'dental',
  icon: 'ShieldX',
  summary: 'Calculate how often dental insurance claims are denied and how many denials trace back to missing documentation.',
  definition:
    'Dental denial rate is the share of dental insurance claims that carriers process and refuse to pay, in full or in part. This calculator works it out by claim count and by dollars, and shows how many denials were caused by missing attachments such as radiographs, periodontal charting or narratives, a frequent and preventable cause in dental billing.',
  inputs: [
    { id: 'claimsSubmitted', label: 'Dental claims submitted', unit: 'count', default: 400, min: 0, step: 1, help: 'Insurance claims submitted during the period.' },
    { id: 'claimsDenied', label: 'Dental claims denied', unit: 'count', default: 36, min: 0, step: 1, help: 'Claims from that group denied in full or in part.' },
    { id: 'dollarsSubmitted', label: 'Charges submitted', unit: 'usd', default: 240000, min: 0, step: 100, optional: true, help: 'Optional. Total charges on submitted claims, for a dollar denial rate.' },
    { id: 'dollarsDenied', label: 'Charges denied', unit: 'usd', default: 14400, min: 0, step: 100, optional: true, help: 'Optional. Total charges on denied claims.' },
    { id: 'docDenials', label: 'Denials for missing attachments or documentation', unit: 'count', default: 12, min: 0, step: 1, optional: true, help: 'Optional. Denials caused by missing x-rays, perio charting, narratives or other documentation.' },
  ],
  outputs: [
    { id: 'denialRate', label: 'Denial rate (by claim count)', unit: 'pct', primary: true },
    { id: 'dollarDenialRate', label: 'Denial rate (by dollars)', unit: 'pct' },
    { id: 'avgDenied', label: 'Average charge per denied claim', unit: 'usd' },
    { id: 'docShare', label: 'Share of denials caused by missing documentation', unit: 'pct' },
  ],
  compute: (raw) => {
    const sub = num(raw.claimsSubmitted);
    const den = num(raw.claimsDenied);
    const dSub = num(raw.dollarsSubmitted);
    const dDen = num(raw.dollarsDenied);
    const doc = num(raw.docDenials);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([sub, den, dSub, dDen, doc].some((x) => x < 0)) warnings.push('Inputs should not be negative.');
    if (den > sub) warnings.push('Denied claims exceed claims submitted. Check that both counts cover the same claims.');
    if (dSub > 0 && dDen > dSub) warnings.push('Denied charges exceed submitted charges.');
    if (doc > den) warnings.push('Documentation denials exceed total denials.');
    const denialRate = sub > 0 && den >= 0 && den <= sub ? pct(den, sub) : null;
    const dollarDenialRate = dSub > 0 && dDen >= 0 && dDen <= dSub ? pct(dDen, dSub) : null;
    const avgDenied = den > 0 && dDen > 0 ? div(dDen, den) : null;
    const docShare = den > 0 && doc >= 0 && doc <= den ? pct(doc, den) : null;
    if (denialRate !== null) {
      notes.push(`About ${denialRate.toFixed(1)} of every 100 dental claims were denied and will need rework, a corrected claim or an appeal.`);
      if (docShare !== null && docShare > 0) notes.push(`${docShare.toFixed(1)}% of denials were for missing documentation. Checking attachment requirements by carrier and procedure before submission is designed to prevent these.`);
    }
    return { values: { denialRate, dollarDenialRate, avgDenied, docShare }, notes, warnings };
  },
  formula: [
    { expression: 'Denial rate = Claims denied / Claims submitted x 100', explanation: 'Count based denial rate.' },
    { expression: 'Dollar denial rate = Charges denied / Charges submitted x 100', explanation: 'Weights denials by value.' },
    { expression: 'Average denied claim = Charges denied / Claims denied', explanation: 'Typical value at stake per denial.' },
    { expression: 'Documentation share = Documentation denials / Claims denied x 100', explanation: 'How much of the problem is missing attachments.' },
  ],
  example: {
    inputs: { claimsSubmitted: 400, claimsDenied: 36, dollarsSubmitted: 240000, dollarsDenied: 14400, docDenials: 12 },
    expected: { denialRate: 9, dollarDenialRate: 6, avgDenied: 400, docShare: 33.33 },
    narrative: 'A dental office submitted 400 claims worth $240,000 and 36 claims worth $14,400 were denied. Denial rate is 36 / 400 = 9%, and dollar denial rate is 14,400 / 240,000 = 6%. The average denied claim is 14,400 / 36 = $400. 12 of the 36 denials were for missing documentation, 12 / 36 = 33.33%.',
  },
  assumptions: [
    'Rejections returned before processing are not counted as denials.',
    'Partial denials, such as a downgraded or excluded procedure on a multi-line claim, are counted as denied claims.',
    'Denials paid later on appeal still count as denials in the period they occurred.',
  ],
  faqs: [
    {
      q: 'What are common reasons dental claims are denied?',
      a: 'Common reasons include frequency limitations, missing radiographs or periodontal charting, missing narratives, waiting periods, annual maximums reached, eligibility problems, missing tooth clauses and coding that does not match documentation. Many are visible before treatment through a full benefits breakdown. Grouping your denials by reason shows which checks at verification or claim preparation would prevent the most repeats.',
    },
    {
      q: 'Why track documentation denials separately?',
      a: 'Documentation denials are among the most preventable dental denials. When a carrier needs radiographs, perio charting or a narrative for a procedure and the claim goes out without it, the claim is denied or pended even though the treatment is covered. Tracking this share shows whether better attachment checklists and carrier rules would make a measurable difference.',
    },
    {
      q: 'Is a downgrade or alternate benefit a denial?',
      a: 'It depends on how your practice defines it, so choose one rule and apply it consistently. A downgrade, where the carrier pays at the rate of a less costly procedure, is not a full denial, but it does reduce payment. Many dental offices track downgrades separately from denials so that both trends stay visible.',
    },
    {
      q: 'How can a dental office reduce its denial rate?',
      a: 'Start with full benefits verification before treatment, including frequencies, waiting periods, downgrades and remaining maximums. Attach the documentation each carrier requires, check coding against clinical notes and submit promptly. Then review denials monthly by reason and carrier, and fix the step in the workflow where each type of denial starts.',
    },
  ],
  relatedServices: ['dental-billing', 'denial-management', 'benefits-verification'],
  relatedTools: ['denial-rate-calculator', 'dental-insurance-verification-checklist', 'dental-insurance-collection-calculator'],
  seoTitle: 'Dental Denial Rate Calculator for Dental Practices',
  metaDescription: 'Calculate your dental claim denial rate by count and by dollars and see how many denials come from missing x-rays, perio charting or narratives.',
  keywords: ['dental denial rate calculator', 'dental claim denials', 'dental insurance claim denial rate'],
};

export default calc;
