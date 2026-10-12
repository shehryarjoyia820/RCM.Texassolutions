import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const usd = (n: number) => '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const calc: Calculator = {
  kind: 'calculator',
  slug: 'patient-balance-calculator',
  name: 'Patient Balance Calculator',
  category: 'revenue',
  icon: 'Wallet',
  summary: 'Estimate what the patient owes and what the plan pays from the allowed amount, deductible, coinsurance and copay.',
  definition:
    'A patient balance is the part of the allowed amount the patient is responsible for under their plan. This calculator applies the remaining deductible, then any copay, then coinsurance, and caps the total at the remaining out-of-pocket maximum if you enter one, to estimate what the patient owes and what the plan pays.',
  inputs: [
    { id: 'allowed', label: 'Allowed amount', unit: 'usd', default: 1000, min: 0, step: 1, help: 'The amount the plan allows for the service under its contract or fee schedule, not your billed charge.' },
    { id: 'deductibleRemaining', label: 'Deductible remaining', unit: 'usd', default: 500, min: 0, step: 1, help: 'How much of the annual deductible the patient still has to meet, from the eligibility response or payer portal.' },
    { id: 'coinsurancePct', label: 'Coinsurance', unit: 'pct', default: 20, min: 0, max: 100, step: 1, help: 'The patient share after the deductible, for example 20 for 20% coinsurance. Enter 0 if the service has only a copay.' },
    { id: 'copay', label: 'Copay', unit: 'usd', default: 0, min: 0, step: 1, optional: true, help: 'Fixed copay for this service, if the plan has one. Leave blank if the service is subject to coinsurance only.' },
    { id: 'oopRemaining', label: 'Out-of-pocket maximum remaining', unit: 'usd', default: 0, min: 0, step: 1, optional: true, help: 'How much the patient can still pay this plan year before the plan pays 100%. Leave blank to apply no cap.' },
  ],
  outputs: [
    { id: 'patientOwes', label: 'Patient owes', unit: 'usd', primary: true },
    { id: 'planPays', label: 'Plan pays', unit: 'usd', primary: true },
    { id: 'deductibleApplied', label: 'Applied to deductible', unit: 'usd' },
    { id: 'copayApplied', label: 'Copay applied', unit: 'usd' },
    { id: 'coinsuranceAmount', label: 'Coinsurance amount', unit: 'usd' },
    { id: 'deductibleLeft', label: 'Deductible still remaining after this service', unit: 'usd' },
    { id: 'patientSharePct', label: 'Patient share of allowed amount', unit: 'pct' },
  ],
  compute: (v) => {
    const allowed = num(v.allowed);
    const deductible = Math.max(0, num(v.deductibleRemaining));
    const coins = num(v.coinsurancePct);
    const copay = Math.max(0, num(v.copay));
    const oop = Math.max(0, num(v.oopRemaining));
    const warnings: string[] = [];
    const notes: string[] = [];
    if (allowed <= 0) {
      warnings.push('Enter an allowed amount greater than zero.');
      return { values: { patientOwes: null, planPays: null, deductibleApplied: null, copayApplied: null, coinsuranceAmount: null, deductibleLeft: null, patientSharePct: null }, warnings };
    }
    if (coins < 0 || coins > 100) warnings.push('Coinsurance must be between 0% and 100%.');
    const coinsRate = Math.min(100, Math.max(0, coins)) / 100;
    const deductibleApplied = Math.min(deductible, allowed);
    const afterDeductible = allowed - deductibleApplied;
    const copayApplied = Math.min(copay, afterDeductible);
    const afterCopay = afterDeductible - copayApplied;
    const coinsuranceAmount = afterCopay * coinsRate;
    const rawPatient = deductibleApplied + copayApplied + coinsuranceAmount;
    const capped = oop > 0 && rawPatient > oop;
    const patientOwes = capped ? oop : rawPatient;
    const planPays = allowed - patientOwes;
    const deductibleLeft = deductible - deductibleApplied;
    if (copay > 0 && coins > 0) warnings.push('Both a copay and coinsurance were entered. Most plans apply one or the other to a given service, so confirm the benefit before quoting the patient.');
    if (copay > afterDeductible && afterDeductible > 0) warnings.push('The copay is larger than the amount left after the deductible, so only part of it applies.');
    if (deductible >= allowed) {
      notes.push(`The remaining deductible covers the whole allowed amount, so the patient owes the full ${usd(allowed)} and the plan pays nothing for this service. ${deductibleLeft > 0 ? `${usd(deductibleLeft)} of deductible will still remain.` : ''}`.trim());
    }
    if (capped) {
      notes.push(`The out-of-pocket maximum caps the patient balance at ${usd(oop)}. After this service the plan should pay 100% of covered in-network services for the rest of the plan year.`);
    }
    notes.push('This is an estimate. The final amount comes from the payer remittance and can differ if other claims process first or the benefit applies differently.');
    return {
      values: {
        patientOwes,
        planPays,
        deductibleApplied,
        copayApplied,
        coinsuranceAmount,
        deductibleLeft,
        patientSharePct: pct(patientOwes, allowed),
      },
      notes: notes.slice(0, 3),
      warnings,
    };
  },
  formula: [
    { expression: 'Applied to deductible = lesser of (Deductible remaining, Allowed amount)', explanation: 'The patient pays toward the deductible first. If the deductible is larger than the allowed amount, the patient pays the whole allowed amount.' },
    { expression: 'Copay applied = lesser of (Copay, Allowed amount - Applied to deductible)', explanation: 'A copay cannot exceed what is left of the allowed amount.' },
    { expression: 'Coinsurance = (Allowed amount - Applied to deductible - Copay applied) x Coinsurance %', explanation: 'Coinsurance applies to the remaining allowed amount.' },
    { expression: 'Patient owes = lesser of (Deductible + Copay + Coinsurance, Out-of-pocket maximum remaining)', explanation: 'The cap only applies when an out-of-pocket maximum remaining is entered.' },
    { expression: 'Plan pays = Allowed amount - Patient owes', explanation: 'Everything in the allowed amount the patient does not owe is the plan payment.' },
  ],
  example: {
    inputs: { allowed: 1000, deductibleRemaining: 500, coinsurancePct: 20, copay: 0, oopRemaining: 0 },
    expected: { patientOwes: 600, planPays: 400, deductibleApplied: 500, copayApplied: 0, coinsuranceAmount: 100, deductibleLeft: 0, patientSharePct: 60 },
    narrative:
      'A service has a $1,000 allowed amount. The patient has $500 of deductible left and 20% coinsurance. The first $500 goes to the deductible, leaving $500, and 20% of that is $100 coinsurance. The patient owes 500 + 100 = $600 (60% of the allowed amount) and the plan pays 1,000 - 600 = $400.',
  },
  assumptions: [
    'Order of application: deductible first, then copay, then coinsurance on the remainder. Some plans waive the deductible for copay services or apply copays differently; check the benefit details.',
    'The allowed amount is the in-network contracted rate. Out-of-network balance billing above the allowed amount is not included.',
    'Leaving the out-of-pocket maximum blank applies no cap. Copays and coinsurance count toward the cap here, as they do under most ACA-compliant plans.',
    'Secondary insurance, coordination of benefits and non-covered services are not modeled.',
  ],
  faqs: [
    {
      q: 'How is a patient balance calculated?',
      a: 'A patient balance is calculated from the allowed amount, not the billed charge. The patient first pays any remaining deductible, then any copay, then their coinsurance percentage of what is left. If the total reaches the out-of-pocket maximum remaining for the year, the patient pays only up to that cap and the plan pays the rest.',
    },
    {
      q: 'What happens when the deductible is larger than the allowed amount?',
      a: 'When the remaining deductible is larger than the allowed amount, the patient owes the full allowed amount and the plan pays nothing for that service. The unused part of the deductible carries forward to the next claim in the same plan year. The plan still applies its contracted rate, so the patient pays the allowed amount rather than your full charge.',
    },
    {
      q: 'Why does the estimate differ from the final bill?',
      a: 'An estimate can differ from the final bill because the payer decides the actual split when it processes the claim. Other claims may reach the deductible first, a code may be paid at a different rate, or a service may be denied or bundled. Always reconcile the patient balance to the remittance before sending a statement.',
    },
    {
      q: 'Do copays count toward the out-of-pocket maximum?',
      a: 'Under most ACA-compliant health plans, copays, coinsurance and deductible payments all count toward the annual out-of-pocket maximum for covered in-network services. Premiums, non-covered services and out-of-network balance bills generally do not. Older grandfathered plans and some other plan types may follow different rules, so check the plan documents when the cap matters.',
    },
    {
      q: 'Should practices collect the estimated balance at the time of service?',
      a: 'Many practices collect copays and a deductible or coinsurance estimate at check-in because balances are harder to collect after the visit. It works best when eligibility and benefits are verified first, the estimate is explained clearly and any overpayment is refunded promptly once the payer remittance arrives.',
    },
  ],
  relatedServices: ['patient-billing', 'benefits-verification', 'insurance-eligibility-verification', 'patient-financial-communication', 'patient-collections'],
  relatedTools: ['payment-variance-calculator', 'collection-efficiency-calculator', 'fee-schedule-comparison-calculator', 'eob-explained'],
  seoTitle: 'Patient Balance Calculator: Deductible and Coinsurance',
  metaDescription: 'Estimate what a patient owes and what the plan pays from the allowed amount, remaining deductible, coinsurance, copay and out-of-pocket maximum.',
  keywords: ['patient balance calculator', 'patient responsibility calculator', 'deductible and coinsurance calculator', 'patient estimate'],
};

export default calc;
