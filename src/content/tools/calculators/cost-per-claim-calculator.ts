import type { Calculator } from '../../types';
import { num, div, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'cost-per-claim-calculator',
  name: 'Cost per Claim Calculator',
  category: 'cost',
  icon: 'Coins',
  summary: 'Work out what each claim costs to submit, and what each paid claim really costs once denial rework is included.',
  definition:
    'Cost per claim is total billing cost divided by the number of claims submitted. This calculator also adds the cost of reworking denied claims and divides by claims actually paid, because a denied claim is often handled two or three times before payment. The gap between the two figures shows what denials add to billing cost.',
  inputs: [
    { id: 'monthlyBillingCost', label: 'Monthly billing cost', unit: 'usd', default: 15000, min: 0, step: 100, help: 'Staff with benefits, software, clearinghouse and overhead for one month. Exclude rework time if you enter it separately below.' },
    { id: 'claimsSubmitted', label: 'Claims submitted per month', unit: 'count', default: 2000, min: 0, step: 50, help: 'Original claims sent in the month.' },
    { id: 'claimsPaid', label: 'Claims paid per month', unit: 'count', default: 1900, min: 0, step: 50, help: 'Claims that reached payment in the month, including those paid after rework.' },
    { id: 'denialRate', label: 'Denial rate', unit: 'pct', default: 10, min: 0, max: 100, step: 0.5, help: 'Share of submitted claims denied and needing rework.' },
    { id: 'reworkCost', label: 'Rework cost per denied claim', unit: 'usd', default: 25, min: 0, step: 1, optional: true, help: 'Optional. Staff time and fees to research, correct, resubmit or appeal one denied claim. Leave blank if rework is already in the monthly billing cost.' },
  ],
  outputs: [
    { id: 'baseCostPerClaim', label: 'Cost per submitted claim (before rework)', unit: 'usd' },
    { id: 'reworkTotal', label: 'Monthly denial rework cost', unit: 'usd' },
    { id: 'totalCost', label: 'Total monthly cost including rework', unit: 'usd' },
    { id: 'costPerSubmitted', label: 'Cost per submitted claim (including rework)', unit: 'usd', primary: true },
    { id: 'costPerPaid', label: 'Cost per paid claim (including rework)', unit: 'usd', primary: true },
    { id: 'reworkShare', label: 'Rework as % of total cost', unit: 'pct' },
  ],
  compute: (v) => {
    const cost = num(v.monthlyBillingCost);
    const submitted = num(v.claimsSubmitted);
    const paid = num(v.claimsPaid);
    const denial = num(v.denialRate);
    const rework = num(v.reworkCost);
    const warnings: string[] = [];
    const notes: string[] = [];
    const empty = { baseCostPerClaim: null, reworkTotal: null, totalCost: null, costPerSubmitted: null, costPerPaid: null, reworkShare: null };
    if (cost < 0 || submitted < 0 || paid < 0 || denial < 0 || rework < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: empty, warnings };
    }
    if (denial > 100) {
      warnings.push('Denial rate cannot be above 100%.');
      return { values: empty, warnings };
    }
    if (paid > submitted) warnings.push('Claims paid exceed claims submitted. This can happen when older claims are paid this month, but check that both counts cover the same period.');
    if (submitted === 0) warnings.push('Enter claims submitted to see cost per claim.');
    if (paid === 0) warnings.push('Enter claims paid to see cost per paid claim.');
    const reworkTotal = submitted * (denial / 100) * rework;
    const totalCost = cost + reworkTotal;
    const baseCostPerClaim = div(cost, submitted);
    const costPerSubmitted = div(totalCost, submitted);
    const costPerPaid = div(totalCost, paid);
    const reworkShare = pct(reworkTotal, totalCost);
    if (costPerSubmitted !== null && costPerPaid !== null) {
      notes.push(`Each paid claim costs about $${(costPerPaid - costPerSubmitted).toFixed(2)} more than each submitted claim, because unpaid claims still carry cost.`);
    }
    if (reworkTotal > 0) notes.push('Rework cost is an estimate based on your per-claim figure. Lowering the denial rate reduces it directly.');
    return { values: { baseCostPerClaim, reworkTotal, totalCost, costPerSubmitted, costPerPaid, reworkShare }, notes, warnings };
  },
  formula: [
    { expression: 'Base cost per claim = Monthly billing cost / Claims submitted', explanation: 'Cost per claim before counting rework.' },
    { expression: 'Rework cost = Claims submitted x Denial rate x Rework cost per denied claim', explanation: 'Extra cost of handling denied claims a second time.' },
    { expression: 'Total cost = Monthly billing cost + Rework cost', explanation: 'All billing cost for the month.' },
    { expression: 'Cost per submitted claim = Total cost / Claims submitted', explanation: 'Average cost to produce and follow up each claim.' },
    { expression: 'Cost per paid claim = Total cost / Claims paid', explanation: 'What it costs to turn one claim into a payment.' },
    { expression: 'Rework share = Rework cost / Total cost x 100', explanation: 'How much of billing cost goes to fixing denials.' },
  ],
  example: {
    inputs: { monthlyBillingCost: 15000, claimsSubmitted: 2000, claimsPaid: 1900, denialRate: 10, reworkCost: 25 },
    expected: { baseCostPerClaim: 7.5, reworkTotal: 5000, totalCost: 20000, costPerSubmitted: 10, costPerPaid: 10.53, reworkShare: 25 },
    narrative:
      'A practice spends $15,000 a month on billing and submits 2,000 claims, so the base cost is 15,000 / 2,000 = $7.50 per claim. 10% are denied (200 claims) and each costs $25 to rework: 200 x 25 = $5,000. Total cost is $20,000, or 20,000 / 2,000 = $10.00 per submitted claim. With 1,900 claims paid, the cost per paid claim is 20,000 / 1,900 = $10.53. Rework is 5,000 / 20,000 = 25% of total cost.',
  },
  assumptions: [
    'Each denied claim is reworked once at the average rework cost you enter. Claims denied more than once cost more.',
    'The monthly billing cost does not already include rework time. If it does, leave the rework cost blank to avoid counting it twice.',
    'Claims submitted and claims paid cover the same month, so timing differences can move the per-paid figure.',
  ],
  faqs: [
    {
      q: 'How do I calculate cost per claim?',
      a: 'Divide your total monthly billing cost by the number of claims submitted that month. Include staff wages and benefits, software, clearinghouse fees and overhead. For a fuller picture, add the cost of reworking denied claims and divide by claims actually paid, since that shows what it costs to turn a claim into money.',
    },
    {
      q: 'Why is cost per paid claim higher than cost per submitted claim?',
      a: 'Some submitted claims are never paid or are still pending, but they still consumed staff time and fees. Dividing the same total cost by a smaller number of paid claims gives a higher figure. The gap between the two numbers grows when denial rates rise or follow-up slows down.',
    },
    {
      q: 'How do I estimate rework cost per denied claim?',
      a: 'Estimate the minutes staff spend researching, correcting and resubmitting or appealing a typical denial, multiply by their loaded hourly cost, and add any per-claim fees. Appeals that need records or letters take longer than simple corrections. If rework time is already part of your monthly billing cost, leave this field blank.',
    },
    {
      q: 'How can a practice lower its cost per claim?',
      a: 'The most direct lever is preventing denials, because every avoided denial removes rework cost. Front-end steps such as eligibility checks, prior authorization tracking and claim scrubbing aim to catch errors before submission. Automating routine tasks like ERA posting can also reduce the staff time that each claim requires.',
    },
  ],
  relatedServices: ['claims-scrubbing', 'denial-management', 'claims-submission', 'rcm-workflow-optimization'],
  relatedTools: ['medical-billing-cost-calculator', 'denial-rate-calculator', 'clean-claim-rate-calculator', 'outsourcing-vs-in-house-billing-calculator'],
  seoTitle: 'Cost per Claim Calculator for Medical Billing',
  metaDescription: 'Calculate cost per submitted claim and cost per paid claim, including denial rework, to see what denials add to your medical billing costs.',
  keywords: ['cost per claim calculator', 'medical billing cost per claim', 'denial rework cost'],
};

export default calc;
