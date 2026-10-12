import type { CalcInput, Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + Math.round(n).toLocaleString('en-US');

const LINES = [1, 2, 3, 4, 5] as const;

/** Defaults for procedure lines 1 to 3; lines 4 and 5 start empty. */
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
    { id: `vol${i}`, label: `Procedure line ${i}: annual volume`, unit: 'count', default: d.vol, min: 0, step: 1, optional, help: i === 1 ? 'How many times a year you bill this procedure to the carriers being compared (one CDT code, or a group of similar codes such as all bitewing codes).' : 'Leave blank if you are comparing fewer procedure lines.' },
    { id: `rateA${i}`, label: `Procedure line ${i}: carrier A fee`, unit: 'usd', default: d.a, min: 0, step: 0.01, optional, help: 'Allowed fee per procedure under carrier A or your current PPO fee schedule.' },
    { id: `rateB${i}`, label: `Procedure line ${i}: carrier B fee`, unit: 'usd', default: d.b, min: 0, step: 0.01, optional, help: 'Allowed fee per procedure under carrier B or the proposed PPO fee schedule.' },
    { id: `mcr${i}`, label: `Procedure line ${i}: reference fee (optional)`, unit: 'usd', default: d.mcr, min: 0, step: 0.01, optional: true, help: 'Optional third fee schedule to measure both carriers against, such as your state Medicaid dental fees or a carrier fee schedule from last year. Used only for the percent-of-reference results.' },
  ] satisfies CalcInput[];
});

const calc: Calculator = {
  kind: 'calculator',
  slug: 'fee-schedule-comparison-calculator',
  name: 'Fee Schedule Comparison Calculator',
  category: 'revenue',
  icon: 'GitCompare',
  summary: 'Compare annual dental revenue under two carriers or PPO fee schedules for the same procedure mix, with an optional reference schedule.',
  definition:
    'A dental fee schedule comparison weighs two carriers\' PPO fees against the same annual procedure volume. This calculator multiplies each CDT code line by the fee under carrier A and carrier B, totals both, and shows the dollar and percent difference. Add a reference schedule to express each as a percent of it.',
  inputs,
  outputs: [
    { id: 'totalA', label: 'Annual revenue under carrier A', unit: 'usd', primary: true },
    { id: 'totalB', label: 'Annual revenue under carrier B', unit: 'usd', primary: true },
    { id: 'difference', label: 'Difference (B minus A)', unit: 'usd', primary: true, help: 'Positive means carrier B pays more for this procedure mix.' },
    { id: 'differencePct', label: 'Difference as a percent of carrier A', unit: 'pct' },
    { id: 'medicareTotal', label: 'Annual revenue at reference fees', unit: 'usd' },
    { id: 'pctMedicareA', label: 'Carrier A as a percent of reference fees', unit: 'pct' },
    { id: 'pctMedicareB', label: 'Carrier B as a percent of reference fees', unit: 'pct' },
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
      if (vol < 0 || a < 0 || b < 0 || m < 0) warnings.push(`Procedure line ${i} has a negative value. Volumes and rates should be zero or more.`);
      if (vol <= 0) {
        if (a > 0 || b > 0) warnings.push(`Procedure line ${i} has rates but no volume, so it is not counted.`);
        continue;
      }
      linesUsed += 1;
      if (a === 0) warnings.push(`Procedure line ${i} has volume but no carrier A fee, so it counts as $0 under carrier A.`);
      if (b === 0) warnings.push(`Procedure line ${i} has volume but no carrier B fee, so it counts as $0 under carrier B.`);
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
      warnings.push('Enter a volume and rates for at least one procedure line.');
      return { values: { totalA: null, totalB: null, difference: null, differencePct: null, medicareTotal: null, pctMedicareA: null, pctMedicareB: null }, warnings };
    }
    if (anyMedicare && !medicareComplete) warnings.push('Reference fees were entered for some procedure lines but not all, so percent-of-reference results are not shown. Enter a reference fee for every line with volume.');
    const useMedicare = anyMedicare && medicareComplete && medicareTotal > 0;
    const difference = totalB - totalA;
    const differencePct = totalA > 0 ? pct(difference, totalA) : null;
    if (difference > 0) notes.push(`For this service mix, carrier B would pay about ${usd(difference)} more a year than carrier A.`);
    else if (difference < 0) notes.push(`For this service mix, carrier B would pay about ${usd(-difference)} less a year than carrier A.`);
    else notes.push('Both fee schedules produce the same annual revenue for this service mix.');
    notes.push('This is an estimate of allowed amounts. Actual cash also depends on denial rates, payment speed, patient cost sharing and how each carrier applies frequency limits, downcoding and alternate benefit rules.');
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
    { expression: 'Line revenue = Annual volume x Fee', explanation: 'Calculated for each procedure line under carrier A, carrier B and, if entered, the reference schedule.' },
    { expression: 'Total A = sum of (Volume x Carrier A fee); Total B = sum of (Volume x Carrier B fee)', explanation: 'The same volumes are used for both carriers so the comparison isolates the fees.' },
    { expression: 'Difference = Total B - Total A; Difference % = Difference / Total A x 100', explanation: 'Positive values mean carrier B pays more for this mix.' },
    { expression: 'Percent of reference = Carrier total / sum of (Volume x Reference fee) x 100', explanation: 'Only shown when every line with volume has a reference fee, so the totals cover the same procedures.' },
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
      'A dental practice compares two PPO fee schedules across three CDT code lines: 2,000 procedures at $100 (carrier A) or $110 (carrier B), 1,200 at $140 or $135, and 500 at $200 or $220. Carrier A totals 200,000 + 168,000 + 100,000 = $468,000; carrier B totals 220,000 + 162,000 + 110,000 = $492,000, a difference of $24,000 (24,000 / 468,000 = 5.13%). At reference fees of $90, $120 and $180 the mix is worth 180,000 + 144,000 + 90,000 = $414,000, so carrier A is 468,000 / 414,000 = 113.04% of the reference schedule and carrier B is 492,000 / 414,000 = 118.84%.',
  },
  assumptions: [
    'Fees are allowed amounts per procedure (what the carrier recognizes, including the patient coinsurance), not your full office fees.',
    'Volume is the same under both carriers. A network change that shifts patients to or from the practice is not modeled.',
    'The reference schedule, if used, should cover the same CDT codes and year as the carrier fees.',
    'Denials, frequency limits, downgrades, annual maximums and payment timing are not included.',
  ],
  faqs: [
    {
      q: 'How do you compare two dental PPO fee schedules?',
      a: 'Apply both fee schedules to the same list of CDT codes and annual volumes, then total each. Comparing fee by fee can mislead because a carrier may pay more for codes you rarely bill and less for the hygiene and diagnostic codes you bill most. Weighting by your real volume shows which schedule is worth more to your practice.',
    },
    {
      q: 'What is a reference fee schedule?',
      a: 'A reference fee schedule is a third set of fees you measure both carriers against, such as your state Medicaid dental fees or the same carrier\'s fees from last year. Expressing each carrier as a percent of the same reference makes it easier to see how far apart they are and how fees have moved over time.',
    },
    {
      q: 'Where do I find my PPO fee schedules?',
      a: 'Most dental carriers provide your contracted fee schedule through their provider portal or on request from provider relations, and many practice management systems store a fee schedule for each carrier. Make sure the schedule is current for your location and contract, and use the same effective year for every line in the comparison.',
    },
    {
      q: 'Which procedures should I include in the comparison?',
      a: 'Include the CDT codes that make up most of your production with the carriers being compared, usually periodic and comprehensive exams, prophylaxis, bitewings, common restorations, crowns and periodontal maintenance. For many offices, a handful of codes covers most of the allowed amount. You can group similar codes into one line by using a weighted average fee.',
    },
    {
      q: 'Is a higher fee schedule always the better dental contract?',
      a: 'No. Frequency limits, downgrade and alternate benefit clauses, attachment requirements, waiting periods, payment speed and how many of your patients the plan covers all affect what you actually collect. A slightly lower fee schedule with fewer downgrades can be worth more. Review those terms alongside the fees before joining or leaving a network.',
    },
  ],
  relatedServices: ['dental-credentialing', 'rcm-analytics-reporting', 'payment-posting', 'dental-billing'],
  relatedTools: ['dental-insurance-collection-calculator', 'dental-practice-revenue-calculator', 'net-collection-rate-calculator'],
  seoTitle: 'Dental PPO Fee Schedule Comparison Calculator',
  metaDescription: 'Compare annual dental revenue under two PPO fee schedules for the same CDT code mix, see the dollar and percent difference and each versus a reference.',
  keywords: ['dental fee schedule comparison calculator', 'compare dental ppo fee schedules', 'dental ppo fee analysis', 'cdt fee schedule comparison'],
};

export default calc;
