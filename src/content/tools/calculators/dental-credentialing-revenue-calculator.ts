import type { Calculator } from '../../types';
import { num } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-credentialing-revenue-calculator',
  name: 'Dental Credentialing Revenue Calculator',
  category: 'dental',
  icon: 'CalendarClock',
  summary: 'Estimate how much production is at risk while a new dentist waits to be credentialed and in network with your patients’ dental carriers.',
  definition:
    'Dental credentialing is the process of getting a dentist approved and contracted with dental insurance carriers so claims can be paid at in-network rates. Until it is complete, visits from patients on those plans may be rescheduled, lost or billed out of network. This calculator estimates the revenue at risk during that wait.',
  inputs: [
    { id: 'monthlyProduction', label: 'Expected monthly production for the new dentist', unit: 'usd', default: 60000, min: 0, step: 100, help: 'Production you expect the dentist to generate in a typical month once fully scheduled.' },
    { id: 'outOfNetworkShare', label: 'Share of patients with carriers not yet in network', unit: 'pct', default: 40, min: 0, max: 100, step: 1, help: 'Portion of the dentist’s expected patients covered by plans the dentist is not yet credentialed with.' },
    { id: 'months', label: 'Months until credentialing is complete', unit: 'months', default: 4, min: 0, step: 0.5, help: 'Your own estimate. Each carrier sets its own processing time, so use what you are seeing for your carriers and state.' },
    { id: 'atRiskShare', label: 'Share of that production at risk', unit: 'pct', default: 50, min: 0, max: 100, step: 1, help: 'Portion of affected production that is rescheduled, lost or collected at a lower amount because it is billed out of network.' },
  ],
  outputs: [
    { id: 'affectedProduction', label: 'Monthly production from affected patients', unit: 'usd' },
    { id: 'monthlyAtRisk', label: 'Monthly revenue at risk', unit: 'usd', primary: true },
    { id: 'totalAtRisk', label: 'Total revenue at risk until credentialed', unit: 'usd', primary: true },
  ],
  compute: (raw) => {
    const production = num(raw.monthlyProduction);
    const oonShare = num(raw.outOfNetworkShare);
    const months = num(raw.months);
    const riskShare = num(raw.atRiskShare);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([production, oonShare, months, riskShare].some((x) => x < 0)) warnings.push('Inputs should not be negative.');
    if (oonShare > 100) warnings.push('Share of patients with carriers not yet in network cannot be above 100%.');
    if (riskShare > 100) warnings.push('Share of production at risk cannot be above 100%.');
    const valid = [production, oonShare, months, riskShare].every((x) => x >= 0) && oonShare <= 100 && riskShare <= 100;
    if (!valid) return { values: { affectedProduction: null, monthlyAtRisk: null, totalAtRisk: null }, notes, warnings };
    const affectedProduction = production * (oonShare / 100);
    const monthlyAtRisk = affectedProduction * (riskShare / 100);
    const totalAtRisk = monthlyAtRisk * months;
    if (totalAtRisk > 0) {
      notes.push(`Each month of delay puts about $${monthlyAtRisk.toFixed(0)} of this dentist’s production at risk. Starting applications early and keeping every carrier file complete shortens the period you control.`);
      notes.push('Carriers set their own processing times, and some will not backdate an effective date. Confirm each carrier’s rules before scheduling plan patients with the new dentist.');
    }
    return { values: { affectedProduction, monthlyAtRisk, totalAtRisk }, notes, warnings };
  },
  formula: [
    { expression: 'Affected production = Monthly production x Share of patients with carriers not yet in network / 100', explanation: 'Monthly production tied to plans the dentist is not yet contracted with.' },
    { expression: 'Monthly revenue at risk = Affected production x Share at risk / 100', explanation: 'The part of that production likely to be rescheduled, lost or reduced.' },
    { expression: 'Total revenue at risk = Monthly revenue at risk x Months until credentialed', explanation: 'Revenue exposed over the whole wait.' },
  ],
  example: {
    inputs: { monthlyProduction: 60000, outOfNetworkShare: 40, months: 4, atRiskShare: 50 },
    expected: { affectedProduction: 24000, monthlyAtRisk: 12000, totalAtRisk: 48000 },
    narrative: 'A practice expects a new associate to produce $60,000 a month. 40% of those patients have carriers the associate is not yet in network with, so 60,000 x 0.40 = $24,000 a month is affected. The office estimates half of that is rescheduled, lost or billed out of network, so 24,000 x 0.50 = $12,000 a month is at risk. Over a 4 month wait, 12,000 x 4 = $48,000 is at risk.',
  },
  assumptions: [
    'The dentist would produce the full monthly amount from the first month. A slower ramp up lowers the real figure.',
    'The months entered are your own estimate. Carriers set their own processing times, and they vary by carrier, plan type and state.',
    'All carriers are treated as finishing together. If some finish earlier, run the calculator once per carrier group.',
    'Revenue at risk is not the same as revenue lost. Some patients may be seen by a credentialed dentist in the practice or pay out of network.',
  ],
  faqs: [
    {
      q: 'What is dental credentialing?',
      a: 'Dental credentialing is the process of getting a dentist approved and contracted with dental insurance carriers. The carrier checks licensure, education, malpractice coverage and other details, then adds the dentist to its network. Until that is done, claims for that dentist may be paid at out-of-network rates, or patients may choose to wait or go elsewhere.',
    },
    {
      q: 'How long does dentist credentialing take?',
      a: 'There is no single answer, because each carrier sets its own processing time and requirements. Timing can also depend on plan type, state and how complete the application is. Ask each carrier for its current expectations, track every application, and use your own recent experience as the months input in this calculator.',
    },
    {
      q: 'Can a new dentist see patients before credentialing is complete?',
      a: 'Often yes, but how the visits are billed depends on each carrier’s rules and the practice’s contracts. Some practices schedule plan patients with an already credentialed dentist until the new dentist is approved. Others bill out of network with patient consent. Check each carrier’s policy before deciding, because billing under another dentist’s credentials is generally not allowed.',
    },
    {
      q: 'What share of production should I enter as at risk?',
      a: 'Estimate how many affected patients would be rescheduled, would leave or would pay less if billed out of network. If most can be moved to a credentialed dentist, the share is low. If the new dentist is the only one taking those patients, it is higher. Running a low and a high estimate gives a useful range.',
    },
    {
      q: 'How can a practice reduce revenue at risk during credentialing?',
      a: 'Start applications as soon as the hire is confirmed, collect every document before submitting, and keep CAQH and carrier profiles current. Follow up with each carrier on a set schedule. In the meantime, steer plan patients to credentialed dentists where possible and explain any out-of-network costs to patients before treatment.',
    },
  ],
  relatedServices: ['dental-credentialing', 'dental-insurance-verification', 'revenue-cycle-management'],
  relatedTools: ['credentialing-checklist', 'dental-practice-revenue-calculator', 'dental-insurance-verification-checklist', 'fee-schedule-comparison-calculator'],
  seoTitle: 'Dental Credentialing Revenue Calculator | New Dentist',
  metaDescription: 'Estimate the revenue at risk while a new dentist waits on dental credentialing with carriers, by month and for the full period until in-network status begins.',
  keywords: ['dental credentialing', 'dentist credentialing', 'dental credentialing revenue', 'dental insurance credentialing', 'new dentist credentialing'],
};

export default calc;
