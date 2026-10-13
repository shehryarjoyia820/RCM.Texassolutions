import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-annual-maximum-calculator',
  name: 'Dental Annual Maximum Calculator',
  category: 'dental',
  icon: 'CalendarClock',
  summary: 'See how much dental annual maximum is left and how much planned treatment insurance may cover this plan year versus next.',
  definition:
    'A dental annual maximum is the most a dental plan will pay toward a patient\'s care in one plan year. This calculator subtracts benefits already used, compares what is left with the insurance portion of planned treatment, and shows how much may be covered this year and how much falls to the patient or the next plan year.',
  inputs: [
    { id: 'annualMax', label: 'Annual maximum', unit: 'usd', default: 1500, min: 0, step: 50, help: 'The yearly benefit limit from the plan summary or benefits breakdown.' },
    { id: 'usedSoFar', label: 'Benefits used so far this plan year', unit: 'usd', default: 600, min: 0, step: 10, help: 'Insurance payments already applied to the maximum, from the carrier portal or claim history.' },
    { id: 'plannedInsurance', label: 'Insurance portion of planned treatment', unit: 'usd', default: 1400, min: 0, step: 10, help: 'What the plan would pay for the treatment plan before the maximum is applied, after deductible and coinsurance.' },
    { id: 'monthsLeft', label: 'Months left in the plan year', unit: 'months', default: 3, min: 0, max: 12, step: 1, help: 'Many plans reset on January 1, but some follow a different benefit year. Check the plan.' },
  ],
  outputs: [
    { id: 'remainingMax', label: 'Remaining annual maximum', unit: 'usd', primary: true },
    { id: 'coveredThisYear', label: 'Planned insurance covered this plan year', unit: 'usd', primary: true },
    { id: 'overMax', label: 'Planned insurance portion over the remaining maximum', unit: 'usd' },
    { id: 'pctCoveredThisYear', label: 'Share of planned insurance covered this year', unit: 'pct' },
    { id: 'nextYearCoverable', label: 'Amount a new maximum could cover next plan year', unit: 'usd' },
    { id: 'remainingPerMonth', label: 'Remaining maximum per month left', unit: 'usd' },
  ],
  compute: (raw) => {
    const max = num(raw.annualMax);
    const used = num(raw.usedSoFar);
    const planned = num(raw.plannedInsurance);
    const months = num(raw.monthsLeft);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([max, used, planned, months].some((x) => x < 0)) warnings.push('Inputs should not be negative. Negative values are treated as zero.');
    if (months > 12) warnings.push('A plan year has at most 12 months left.');
    if (max > 0 && used > max) warnings.push('Benefits used exceed the annual maximum. Check the figures with the carrier.');
    if (max <= 0) {
      warnings.push('Enter the annual maximum from the plan. Plans with no annual maximum do not need this calculation.');
      return { values: { remainingMax: null, coveredThisYear: null, overMax: null, pctCoveredThisYear: null, nextYearCoverable: null, remainingPerMonth: null }, notes, warnings };
    }
    const remainingMax = Math.max(0, max - Math.max(0, used));
    const plan = Math.max(0, planned);
    const coveredThisYear = Math.min(plan, remainingMax);
    const overMax = plan - coveredThisYear;
    const pctCoveredThisYear = plan > 0 ? pct(coveredThisYear, plan) : null;
    const nextYearCoverable = Math.min(overMax, max);
    const remainingPerMonth = months > 0 ? remainingMax / Math.min(months, 12) : null;
    if (overMax > 0) {
      notes.push(`About $${overMax.toFixed(2)} of the planned insurance portion is more than the remaining maximum. If all treatment is done this plan year, that amount becomes the patient's responsibility.`);
      notes.push('If the treatment can safely be staged, part of it may be scheduled after the plan year resets so a new maximum applies. That is a clinical decision for the dentist and patient.');
    } else if (plan > 0) {
      notes.push(`The planned treatment fits within the remaining maximum, leaving about $${(remainingMax - coveredThisYear).toFixed(2)} unused this plan year.`);
    }
    if (months > 0 && months <= 3 && remainingMax > 0) notes.push('The plan year ends soon. Unused annual maximum generally does not carry over, so patients with remaining benefits may want to schedule recommended care before the reset.');
    notes.push('Figures are estimates. Other claims, frequency limits, waiting periods and downgrades can change what the carrier pays, and a predetermination can confirm benefits for larger treatment.');
    return { values: { remainingMax, coveredThisYear, overMax, pctCoveredThisYear, nextYearCoverable, remainingPerMonth }, notes, warnings };
  },
  formula: [
    { expression: 'Remaining maximum = Annual maximum - Benefits used so far', explanation: 'What the plan can still pay this plan year, never below zero.' },
    { expression: 'Covered this year = lesser of Planned insurance portion and Remaining maximum', explanation: 'The plan stops paying once the maximum is reached.' },
    { expression: 'Over the maximum = Planned insurance portion - Covered this year', explanation: 'Moves to the patient if done now, or may be staged into the next plan year.' },
    { expression: 'Next year coverable = lesser of Over the maximum and Annual maximum', explanation: 'Assumes the same maximum resets and no other care uses it first.' },
    { expression: 'Remaining per month = Remaining maximum / Months left', explanation: 'A simple pace guide for scheduling before the reset.' },
  ],
  example: {
    inputs: { annualMax: 1500, usedSoFar: 600, plannedInsurance: 1400, monthsLeft: 3 },
    expected: { remainingMax: 900, coveredThisYear: 900, overMax: 500, pctCoveredThisYear: 64.29, nextYearCoverable: 500, remainingPerMonth: 300 },
    narrative: 'A patient has a $1,500 annual maximum and has used $600, so 1,500 - 600 = $900 remains. Planned treatment would draw $1,400 in insurance before the maximum, so $900 can be covered this plan year and 1,400 - 900 = $500 is over the maximum. That is 900 / 1,400 = 64.29% covered this year. If the remaining treatment is staged after the reset, a new $1,500 maximum could cover the $500. With 3 months left, the remaining maximum works out to $300 a month.',
  },
  assumptions: [
    'The planned insurance portion already reflects the deductible, coverage percentages and PPO allowed fees.',
    'The annual maximum is the same next plan year and nothing else is paid against it before the staged treatment.',
    'Services that some plans exclude from the maximum, such as certain preventive care or orthodontics with a separate lifetime maximum, are left out of both inputs.',
    'Any decision to stage treatment is clinical and belongs to the dentist and patient.',
  ],
  faqs: [
    {
      q: 'What is a dental annual maximum?',
      a: 'A dental annual maximum is the most a dental plan will pay toward covered care for one person in a plan year. Once the plan has paid that amount, the patient is responsible for the rest of the year\'s allowed fees. The maximum resets when a new plan year starts, which is often January 1 but depends on the plan.',
    },
    {
      q: 'Does unused dental annual maximum roll over?',
      a: 'Usually not. Most plans reset the annual maximum at the start of each plan year, so unused benefits are lost. A few plans offer a rollover feature that carries part of the unused amount forward if the patient had a qualifying visit. The benefits breakdown or carrier portal will show whether a rollover applies.',
    },
    {
      q: 'Why should patients use dental insurance before the end of the year?',
      a: 'Patients who use dental insurance before the end of the year can apply benefits that would otherwise expire, and any deductible already met this year does not need to be paid again for that care. Scheduling recommended treatment before the reset can lower the out of pocket cost. Practices often review remaining benefits in the fall and contact patients with unscheduled treatment.',
    },
    {
      q: 'How do I find a patient\'s remaining dental benefits?',
      a: 'Remaining benefits are shown in the carrier portal or on a benefits breakdown requested during insurance verification. They can also be worked out from the annual maximum minus claims already paid this plan year. Claims still in process may not be reflected yet, so checking close to the appointment gives the most current figure.',
    },
    {
      q: 'What happens when treatment costs more than the remaining maximum?',
      a: 'When the insurance portion of treatment is more than the remaining maximum, the plan pays up to the maximum and the rest becomes the patient\'s responsibility. If it is clinically appropriate, the dentist may stage treatment so part falls in the next plan year. A written estimate showing both options helps the patient decide.',
    },
  ],
  relatedServices: ['dental-insurance-verification', 'patient-billing', 'revenue-cycle-management'],
  relatedTools: ['dental-patient-estimate-calculator', 'dental-insurance-verification-checklist', 'dental-ppo-write-off-calculator', 'eob-explained'],
  seoTitle: 'Dental Annual Maximum Calculator: Remaining Benefits',
  metaDescription: 'Use this dental annual maximum calculator to see remaining benefits, how much planned treatment is covered this plan year and what may carry into next year.',
  keywords: ['dental annual maximum', 'dental annual maximum calculator', 'use dental insurance before end of year', 'dental benefits remaining calculator', 'dental insurance maximum'],
};

export default calc;
