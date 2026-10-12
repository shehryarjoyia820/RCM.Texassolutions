import type { CalcInput, Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const LINES = [1, 2, 3, 4, 5] as const;

/** Defaults for service lines 1 to 3; lines 4 and 5 start empty. */
const DEFAULTS: Record<number, { vol: number; a: number; b: number; mcr: number }> = {
  1: { vol: 2000, a: 100, b: 110, mcr: 90 },
  2: { vol: 1200, a: 140, b: 135, mcr: 120 },
  3: { vol: 500, a: 200, b: 220, mcr: 180 },
  4: { vol: 0, a: 0, b: 0, mcr: 0 },
  5: { vol: 0, a: 0, b: 0, mcr: 0 },
};

const inputs: CalcInput[] = LINES.flatMap((i) => {
  const d = DEFAULTS[i];
  const optional = i > 1;
  return [
    { id: `vol${i}`, label: `Service line ${i}: annual volume`, unit: 'count', default: d.vol, min: 0, step: 1, optional, help: i === 1 ? 'How many times a year you bill this service (one CPT, HCPCS or CDT code, or a group of similar codes).' : 'Leave blank if you are comparing fewer service lines.' },
    { id: `rateA${i}`, label: `Service line ${i}: payer A rate`, unit: 'usd', default: d.a, min: 0, step: 0.01, optional, help: 'Allowed amount per unit under payer A or the current fee schedule.' },
    { id: `rateB${i}`, label: `Service line ${i}: payer B rate`, unit: 'usd', default: d.b, min: 0, step: 0.01, optional, help: 'Allowed amount per unit under payer B or the proposed fee schedule.' },
    { id: `mcr${i}`, label: `Service line ${i}: Medicare rate (optional)`, unit: 'usd', default: d.mcr, min: 0, step: 0.01, optional: true, help: 'Medicare allowed amount for your locality, from the CMS Physician Fee Schedule look-up tool. Used only for the percent-of-Medicare results.' },
  ] satisfies CalcInput[];
});

const calc: Calculator = {
  kind: 'calculator',
  slug: 'fee-schedule-comparison-calculator',
  name: 'Fee Schedule Comparison Calculator',
  category: 'revenue',
  icon: 'GitCompare',
  summary: 'Compare annual revenue under two payers or fee schedules for the same service mix, with optional percent of Medicare.',
  definition:
    'A fee schedule comparison weighs two sets of payer rates against the same annual service volume. This calculator multiplies each service line volume by the rate under payer A and payer B, totals both, and shows the dollar and percent difference. Add Medicare rates to express each schedule as a percent of Medicare.',
  inputs,
  outputs: [
    { id: 'totalA', label: 'Annual revenue under payer A', unit: 'usd', primary: true },
    { id: 'totalB', label: 'Annual revenue under payer B', unit: 'usd', primary: true },
    { id: 'difference', label: 'Difference (B minus A)', unit: 'usd', primary: true, help: 'Positive means payer B pays more for this service mix.' },
    { id: 'differencePct', label: 'Difference as a percent of payer A', unit: 'pct' },
    { id: 'medicareTotal', label: 'Annual revenue at Medicare rates', unit: 'usd' },
    { id: 'pctMedicareA', label: 'Payer A as a percent of Medicare', unit: 'pct' },
    { id: 'pctMedicareB', label: 'Payer B as a percent of Medicare', unit: 'pct' },
  ],
  compute: (v) => {
    const warnings: string[] = [];
    const notes: string[] = [];
    let totalA = 0;
    let totalB = 0;
    let medicareTotal = 0;
    let linesUsed = 0;
    let medicareComplete = true;
    let anyMedicare = false;
    for (const i of LINES) {
      const vol = num(v[`vol${i}`]);
      const a = num(v[`rateA${i}`]);
      const b = num(v[`rateB${i}`]);
      const m = num(v[`mcr${i}`]);
      if (vol < 0 || a < 0 || b < 0 || m < 0) warnings.push(`Service line ${i} has a negative value. Volumes and rates should be zero or more.`);
      if (vol <= 0) {
        if (a > 0 || b > 0) warnings.push(`Service line ${i} has rates but no volume, so it is not counted.`);
        continue;
      }
      linesUsed += 1;
      if (a === 0) warnings.push(`Service line ${i} has volume but no payer A rate, so it counts as $0 under payer A.`);
      if (b === 0) warnings.push(`Service line ${i} has volume but no payer B rate, so it counts as $0 under payer B.`);
      totalA += vol * a;
      totalB += vol * b;
      if (m > 0) {
        anyMedicare = true;
        medicareTotal += vol * m;
      } else {
        medicareComplete = false;
      }
    }
    if (linesUsed === 0) {
      warnings.push('Enter a volume and rates for at least one service line.');
      return { values: { totalA: null, totalB: null, difference: null, differencePct: null, medicareTotal: null, pctMedicareA: null, pctMedicareB: null }, warnings };
    }
    if (anyMedicare && !medicareComplete) warnings.push('Medicare rates were entered for some service lines but not all, so percent-of-Medicare results are not shown. Enter a Medicare rate for every line with volume.');
    const useMedicare = anyMedicare && medicareComplete && medicareTotal > 0;
    const difference = totalB - totalA;
    const differencePct = totalA > 0 ? pct(difference, totalA) : null;
    if (difference > 0) notes.push(`For this service mix, payer B would pay about ${usd(difference)} more a year than payer A.`);
    else if (difference < 0) notes.push(`For this service mix, payer B would pay about ${usd(-difference)} less a year than payer A.`);
    else notes.push('Both fee schedules produce the same annual revenue for this service mix.');
    notes.push('This is an estimate of allowed amounts. Actual cash also depends on denial rates, payment speed, patient cost sharing and how each payer applies modifiers and bundling rules.');
    return {
      values: {
        totalA,
        totalB,
        difference,
        differencePct,
        medicareTotal: useMedicare ? medicareTotal : null,
        pctMedicareA: useMedicare ? pct(totalA, medicareTotal) : null,
        pctMedicareB: useMedicare ? pct(totalB, medicareTotal) : null,
      },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Line revenue = Annual volume x Rate', explanation: 'Calculated for each service line under payer A, payer B and, if entered, Medicare.' },
    { expression: 'Total A = sum of (Volume x Payer A rate); Total B = sum of (Volume x Payer B rate)', explanation: 'The same volumes are used for both payers so the comparison isolates the rates.' },
    { expression: 'Difference = Total B - Total A; Difference % = Difference / Total A x 100', explanation: 'Positive values mean payer B pays more for this mix.' },
    { expression: 'Percent of Medicare = Payer total / sum of (Volume x Medicare rate) x 100', explanation: 'Only shown when every line with volume has a Medicare rate, so the totals cover the same services.' },
  ],
  example: {
    inputs: {
      vol1: 2000, rateA1: 100, rateB1: 110, mcr1: 90,
      vol2: 1200, rateA2: 140, rateB2: 135, mcr2: 120,
      vol3: 500, rateA3: 200, rateB3: 220, mcr3: 180,
      vol4: 0, rateA4: 0, rateB4: 0, mcr4: 0,
      vol5: 0, rateA5: 0, rateB5: 0, mcr5: 0,
    },
    expected: { totalA: 468000, totalB: 492000, difference: 24000, differencePct: 5.13, medicareTotal: 414000, pctMedicareA: 113.04, pctMedicareB: 118.84 },
    narrative:
      'Three service lines: 2,000 units at $100 (A) or $110 (B), 1,200 units at $140 or $135, and 500 units at $200 or $220. Payer A totals 200,000 + 168,000 + 100,000 = $468,000; payer B totals 220,000 + 162,000 + 110,000 = $492,000, a difference of $24,000 (24,000 / 468,000 = 5.13%). At Medicare rates of $90, $120 and $180 the mix is worth 180,000 + 144,000 + 90,000 = $414,000, so payer A is 468,000 / 414,000 = 113.04% of Medicare and payer B is 492,000 / 414,000 = 118.84%.',
  },
  assumptions: [
    'Rates are allowed amounts per unit (what the payer recognizes, including patient cost sharing), not billed charges.',
    'Volume is the same under both payers. A contract change that shifts patient volume is not modeled.',
    'Medicare rates should be for the same locality and setting (facility or non-facility) as your services.',
    'Denials, payment timing, bundling edits and modifier reductions are not included.',
  ],
  faqs: [
    {
      q: 'How do you compare two payer fee schedules?',
      a: 'To compare two payer fee schedules, apply both sets of rates to the same list of services and annual volumes, then total each. Comparing rate by rate can mislead because a payer may pay more for rare codes and less for the codes you bill most. Weighting by your real volume shows which contract is worth more to your practice.',
    },
    {
      q: 'What does percent of Medicare mean?',
      a: 'Percent of Medicare expresses a payer rate as a share of the Medicare allowed amount for the same service and locality. A commercial contract at 120% of Medicare pays 20% more than Medicare for that service mix. It gives practices and payers a common yardstick, because Medicare rates are public and updated each year by CMS.',
    },
    {
      q: 'Where do I find Medicare rates for my codes?',
      a: 'Medicare rates for physician services are published in the CMS Physician Fee Schedule, and CMS offers a look-up tool where you select the year, code, locality and facility or non-facility setting. Your Medicare Administrative Contractor also posts fee schedules for its jurisdiction. Use the same year and locality for every line in the comparison.',
    },
    {
      q: 'Which services should I include in the comparison?',
      a: 'Include the services that make up most of your revenue with the payers being compared, usually your highest-volume evaluation and management codes and your most common procedures. For many practices, a handful of codes covers most of the allowed amount. You can group similar codes into one line by using a weighted average rate.',
    },
    {
      q: 'Is a higher fee schedule always the better contract?',
      a: 'A higher fee schedule is not always the better contract. Prior authorization requirements, denial rates, timely filing limits, payment speed and administrative burden all affect how much of the rate you actually collect and what it costs to collect it. Review those terms alongside the rates before signing or renegotiating.',
    },
  ],
  relatedServices: ['fee-schedule-analysis', 'payer-contracting', 'underpayment-identification', 'rcm-analytics-reporting'],
  relatedTools: ['payer-mix-calculator', 'underpayment-estimator', 'payment-variance-calculator', 'hcpcs-code-lookup'],
  seoTitle: 'Fee Schedule Comparison Calculator for Payers',
  metaDescription: 'Compare annual revenue under two payer fee schedules for the same service mix, see the dollar and percent difference and each payer as a percent of Medicare.',
  keywords: ['fee schedule comparison calculator', 'compare payer fee schedules', 'percent of medicare calculator', 'payer contract analysis'],
};

export default calc;
