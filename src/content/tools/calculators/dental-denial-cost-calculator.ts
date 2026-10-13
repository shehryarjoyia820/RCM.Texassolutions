import type { Calculator } from '../../types';
import { num } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-denial-cost-calculator',
  name: 'Dental Claim Denial Cost Calculator',
  category: 'dental',
  icon: 'FileWarning',
  summary: 'Estimate what denied dental claims cost your practice each month and year, counting both unrecovered revenue and the staff time spent on rework.',
  definition:
    'Dental claim denial cost is the money a practice loses when carriers deny claims. It has two parts: denied revenue that is never recovered after rework or appeal, and the staff time spent correcting, resubmitting and appealing every denial. This calculator adds both to show a monthly and annual cost of denials.',
  inputs: [
    { id: 'claimsPerMonth', label: 'Dental claims submitted per month', unit: 'count', default: 400, min: 0, step: 1, help: 'Insurance claims sent to dental carriers in a typical month.' },
    { id: 'denialRate', label: 'Denial rate', unit: 'pct', default: 8, min: 0, max: 100, step: 0.1, help: 'Share of submitted claims denied in full or in part. The dental denial rate calculator can work this out.' },
    { id: 'avgClaimValue', label: 'Average value of a denied claim', unit: 'usd', default: 350, min: 0, step: 1, help: 'Average amount expected from the carrier on a claim that was denied.' },
    { id: 'recoveryRate', label: 'Share of denied value recovered after rework', unit: 'pct', default: 60, min: 0, max: 100, step: 1, help: 'Portion of denied dollars eventually paid after a corrected claim, added attachments or an appeal.' },
    { id: 'minutesPerDenial', label: 'Staff minutes to rework one denial', unit: 'count', default: 20, min: 0, step: 1, help: 'Time to read the EOB, fix the claim, add x-rays or narratives, resubmit or appeal, and follow up.' },
    { id: 'hourlyCost', label: 'Staff cost per hour', unit: 'usd', default: 25, min: 0, step: 0.5, help: 'Hourly wage plus payroll taxes and benefits for the person working denials.' },
  ],
  outputs: [
    { id: 'deniedClaims', label: 'Denied claims per month', unit: 'count' },
    { id: 'deniedValue', label: 'Denied claim value per month', unit: 'usd' },
    { id: 'revenueLost', label: 'Revenue lost (not recovered) per month', unit: 'usd' },
    { id: 'reworkCost', label: 'Rework staff cost per month', unit: 'usd' },
    { id: 'monthlyCost', label: 'Total monthly cost of denials', unit: 'usd', primary: true },
    { id: 'annualCost', label: 'Total annual cost of denials', unit: 'usd', primary: true },
  ],
  compute: (raw) => {
    const claims = num(raw.claimsPerMonth);
    const rate = num(raw.denialRate);
    const value = num(raw.avgClaimValue);
    const recovery = num(raw.recoveryRate);
    const minutes = num(raw.minutesPerDenial);
    const hourly = num(raw.hourlyCost);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([claims, rate, value, recovery, minutes, hourly].some((x) => x < 0)) warnings.push('Inputs should not be negative.');
    if (rate > 100) warnings.push('Denial rate cannot be above 100%.');
    if (recovery > 100) warnings.push('Recovery share cannot be above 100%.');
    const valid = [claims, rate, value, recovery, minutes, hourly].every((x) => x >= 0) && rate <= 100 && recovery <= 100;
    if (!valid) {
      return { values: { deniedClaims: null, deniedValue: null, revenueLost: null, reworkCost: null, monthlyCost: null, annualCost: null }, notes, warnings };
    }
    const deniedClaims = claims * (rate / 100);
    const deniedValue = deniedClaims * value;
    const revenueLost = deniedValue * (1 - recovery / 100);
    const reworkCost = deniedClaims * (minutes / 60) * hourly;
    const monthlyCost = revenueLost + reworkCost;
    const annualCost = monthlyCost * 12;
    if (deniedClaims > 0) {
      notes.push(`About ${deniedClaims.toFixed(0)} claims a month need rework, which takes roughly ${((deniedClaims * minutes) / 60).toFixed(1)} staff hours.`);
      if (monthlyCost > 0) notes.push(`Unrecovered revenue makes up ${((revenueLost / monthlyCost) * 100).toFixed(1)}% of the monthly cost and rework time makes up the rest. Preventing a denial avoids both parts, while a faster appeal only reduces the first.`);
    }
    return { values: { deniedClaims, deniedValue, revenueLost, reworkCost, monthlyCost, annualCost }, notes, warnings };
  },
  formula: [
    { expression: 'Denied claims = Claims per month x Denial rate / 100', explanation: 'How many claims come back denied each month.' },
    { expression: 'Denied value = Denied claims x Average denied claim value', explanation: 'Dollars held up by denials before any rework.' },
    { expression: 'Revenue lost = Denied value x (1 - Recovery share / 100)', explanation: 'Denied dollars that are never paid, even after rework or appeal.' },
    { expression: 'Rework cost = Denied claims x Minutes per denial / 60 x Staff cost per hour', explanation: 'Staff time spent on every denial, whether or not it is recovered.' },
    { expression: 'Total monthly cost = Revenue lost + Rework cost; Annual cost = Monthly cost x 12', explanation: 'The full cost of denials for a month and a year.' },
  ],
  example: {
    inputs: { claimsPerMonth: 400, denialRate: 8, avgClaimValue: 350, recoveryRate: 60, minutesPerDenial: 20, hourlyCost: 25 },
    expected: { deniedClaims: 32, deniedValue: 11200, revenueLost: 4480, reworkCost: 266.67, monthlyCost: 4746.67, annualCost: 56960 },
    narrative: 'A dental office sends 400 claims a month and 8% are denied, so 400 x 0.08 = 32 claims come back. At $350 each, 32 x 350 = $11,200 is denied. The office recovers 60% after rework, so 11,200 x 0.40 = $4,480 is lost. Reworking 32 denials at 20 minutes each at $25 an hour costs 32 x 20 / 60 x 25 = $266.67. The monthly cost is 4,480 + 266.67 = $4,746.67, or $56,960 a year.',
  },
  assumptions: [
    'Every denied claim is reworked at least once, so rework time applies to all denials, including those never recovered.',
    'Recovered denials are paid in full at the original expected amount. Partial recoveries are reflected through a lower recovery share.',
    'The cost of slower cash flow on recovered claims, clearinghouse fees and dentist time spent on narratives is not included.',
    'Monthly figures are treated as steady across the year for the annual estimate.',
  ],
  faqs: [
    {
      q: 'How do you calculate the cost of a dental claim denial?',
      a: 'Add the revenue you never recover to the staff time spent reworking the denial. Multiply denied claims by their average value and by the share not recovered, then add denied claims times rework minutes times hourly staff cost. Looking at both parts matters, because even denials that are paid in the end still use paid staff time.',
    },
    {
      q: 'Why include rework cost if the claim is paid later?',
      a: 'Rework is paid staff time whether or not the appeal succeeds. Someone has to read the EOB, find the reason, add radiographs, perio charting or a narrative, resubmit and follow up. That time could have gone to verification, posting or patient calls. A denial that is eventually paid still costs the practice money and delays cash flow.',
    },
    {
      q: 'Where do I find my recovery share?',
      a: 'Look back at denials from a past period that has had time to resolve, such as a quarter that ended several months ago. Divide the amount eventually paid on those denials by the amount originally denied. If your software does not track this, a sample of denied claims reviewed by hand gives a reasonable starting estimate.',
    },
    {
      q: 'Which dental denials are cheapest to prevent?',
      a: 'Denials tied to eligibility, frequency limits, waiting periods, maximums and missing attachments are usually the easiest to stop, because the information exists before the claim is sent. A full benefits breakdown before treatment and an attachment check by carrier and procedure at claim preparation target these causes directly.',
    },
    {
      q: 'Is this the same as a dental denial rate?',
      a: 'No. Denial rate tells you how often claims are denied, while this calculator turns that rate into dollars. Two practices with the same denial rate can face very different costs if their average claim values, recovery shares or rework times differ. Using both numbers together shows how often denials happen and what they cost.',
    },
  ],
  relatedServices: ['denial-management', 'dental-claims-processing', 'dental-insurance-verification'],
  relatedTools: ['dental-denial-rate-calculator', 'denial-appeal-checklist', 'clean-claim-rate-calculator', 'dental-insurance-collection-calculator'],
  seoTitle: 'Dental Claim Denial Cost Calculator: Lost Revenue + Rework',
  metaDescription: 'Use this dental claim denial cost calculator to estimate revenue lost to denied dental claims plus staff rework time, per month and per year, in a few steps.',
  keywords: ['dental claim denial cost', 'cost of claim denials', 'denied dental claims', 'claim denial', 'dental claim denial cost calculator'],
};

export default calc;
