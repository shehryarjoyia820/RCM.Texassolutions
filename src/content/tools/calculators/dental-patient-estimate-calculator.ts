import type { Calculator } from '../../types';
import { num } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-patient-estimate-calculator',
  name: 'Dental Insurance Estimate Calculator',
  category: 'dental',
  icon: 'ReceiptText',
  summary: 'Estimate the insurance payment, patient portion and PPO write-off for one dental procedure before treatment.',
  definition:
    'A dental insurance estimate calculator works out what a carrier may pay for a procedure and what the patient may owe. It starts from the PPO allowed fee, takes off any remaining deductible, applies the coverage percentage for that category and caps the payment at the remaining annual maximum. The result is an estimate, not a promise of benefits.',
  inputs: [
    { id: 'officeFee', label: 'Office fee for the procedure', unit: 'usd', default: 1200, min: 0, step: 1, help: 'Your full fee schedule amount for the CDT code.' },
    { id: 'allowedFee', label: 'PPO allowed fee', unit: 'usd', default: 950, min: 0, step: 1, optional: true, help: 'The in-network contracted fee for this plan. Leave at 0 for out-of-network patients and the office fee is used instead.' },
    { id: 'coveragePct', label: 'Coverage for this category', unit: 'pct', default: 50, min: 0, max: 100, step: 5, help: 'The plan percentage for the category, for example preventive, basic or major.' },
    { id: 'deductibleRemaining', label: 'Remaining deductible', unit: 'usd', default: 50, min: 0, step: 1, optional: true, help: 'Deductible the patient has not yet met this plan year and that applies to this category.' },
    { id: 'maxRemaining', label: 'Remaining annual maximum', unit: 'usd', default: 400, min: 0, step: 1, help: 'Benefits still available this plan year, from the breakdown or the carrier portal.' },
    { id: 'benefitAvailable', label: 'Waiting period and frequency met (1 = yes, 0 = no)', unit: 'count', default: 1, min: 0, max: 1, step: 1, help: 'Enter 0 if a waiting period, frequency limit or missing tooth clause means the plan will not pay for this procedure now.' },
  ],
  outputs: [
    { id: 'patientPortion', label: 'Estimated patient portion', unit: 'usd', primary: true },
    { id: 'insurancePayment', label: 'Estimated insurance payment', unit: 'usd', primary: true },
    { id: 'writeOff', label: 'PPO write-off', unit: 'usd' },
    { id: 'remainingMaxAfter', label: 'Remaining annual maximum after this procedure', unit: 'usd' },
    { id: 'allowedUsed', label: 'Fee used for the estimate', unit: 'usd' },
    { id: 'deductibleApplied', label: 'Deductible applied', unit: 'usd' },
  ],
  compute: (raw) => {
    const office = num(raw.officeFee);
    const ppo = num(raw.allowedFee);
    const cov = num(raw.coveragePct);
    const ded = num(raw.deductibleRemaining);
    const maxLeft = num(raw.maxRemaining);
    const eligible = num(raw.benefitAvailable);
    const warnings: string[] = [];
    const notes: string[] = [];
    if ([office, ppo, cov, ded, maxLeft, eligible].some((x) => x < 0)) warnings.push('Inputs should not be negative. Negative values are treated as zero.');
    if (cov > 100) warnings.push('Coverage cannot exceed 100%. It is treated as 100%.');
    if (eligible !== 0 && eligible !== 1) warnings.push('Enter 1 if the waiting period and frequency are met, or 0 if they are not.');
    if (office <= 0) {
      warnings.push('Enter the office fee for the procedure.');
      return { values: { patientPortion: null, insurancePayment: null, writeOff: null, remainingMaxAfter: null, allowedUsed: null, deductibleApplied: null }, notes, warnings };
    }
    if (ppo > office) warnings.push('The PPO allowed fee is higher than the office fee. Check the fee schedule loaded for this plan.');
    const allowed = ppo > 0 ? ppo : office;
    const writeOff = Math.max(0, office - allowed);
    const maxAvail = Math.max(0, maxLeft);
    const covPct = Math.min(100, Math.max(0, cov));
    const payable = eligible >= 1;
    const deductibleApplied = payable ? Math.min(Math.max(0, ded), allowed) : 0;
    const beforeMax = payable ? ((allowed - deductibleApplied) * covPct) / 100 : 0;
    const insurancePayment = Math.min(beforeMax, maxAvail);
    const patientPortion = allowed - insurancePayment;
    const remainingMaxAfter = maxAvail - insurancePayment;
    if (!payable) notes.push('Because a waiting period or frequency limit applies, the plan is expected to pay nothing, so the full allowed fee is shown as the patient portion. A predetermination can confirm this.');
    if (payable && beforeMax > maxAvail) notes.push(`The remaining annual maximum caps the insurance payment. Without the cap the plan would pay about $${beforeMax.toFixed(2)}, so $${(beforeMax - maxAvail).toFixed(2)} shifts to the patient.`);
    if (ppo <= 0) notes.push('No PPO allowed fee was entered, so the office fee is used. Out-of-network carriers may also apply their own usual and customary limits, which can raise the patient portion.');
    notes.push('This is an estimate only. Actual payment depends on the carrier\'s processing, eligibility on the date of service, downgrades, frequency history and other claims. A predetermination gives the most reliable figure for larger treatment.');
    return {
      values: { patientPortion, insurancePayment, writeOff, remainingMaxAfter, allowedUsed: allowed, deductibleApplied },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Fee used = PPO allowed fee, or the office fee when no allowed fee is entered', explanation: 'In-network patients are billed against the contracted fee.' },
    { expression: 'PPO write-off = Office fee - Fee used', explanation: 'The contractual adjustment the practice does not collect from anyone.' },
    { expression: 'Insurance before maximum = (Fee used - Remaining deductible) x Coverage %', explanation: 'The deductible comes off first, then coinsurance applies to the rest.' },
    { expression: 'Insurance payment = lesser of Insurance before maximum and Remaining annual maximum', explanation: 'The plan never pays more than the benefits left this year. It is zero when a waiting period or frequency limit applies.' },
    { expression: 'Patient portion = Fee used - Insurance payment; Remaining maximum after = Remaining maximum - Insurance payment', explanation: 'What the patient may owe and what benefits are left for later treatment.' },
  ],
  example: {
    inputs: { officeFee: 1200, allowedFee: 950, coveragePct: 50, deductibleRemaining: 50, maxRemaining: 400, benefitAvailable: 1 },
    expected: { patientPortion: 550, insurancePayment: 400, writeOff: 250, remainingMaxAfter: 0, allowedUsed: 950, deductibleApplied: 50 },
    narrative: 'A crown has an office fee of $1,200 and a PPO allowed fee of $950, so the write-off is 1,200 - 950 = $250. The patient still owes a $50 deductible, leaving 950 - 50 = $900. At 50% coverage the plan would pay $450, but only $400 of the annual maximum remains, so the insurance payment is capped at $400. The patient portion is 950 - 400 = $550 and the remaining maximum after treatment is $0.',
  },
  assumptions: [
    'The allowed fee, coverage percentage, deductible and remaining maximum come from a current benefits breakdown for this patient.',
    'The procedure is paid as billed, with no downgrade to an alternate benefit such as an amalgam rate for a posterior composite.',
    'No other claims are processed against the same deductible or maximum before this one.',
    'Coordination of benefits with a secondary plan is not included.',
    'The result is an estimate for planning conversations, not a guarantee of payment by the carrier.',
  ],
  faqs: [
    {
      q: 'How do you calculate a dental insurance estimate?',
      a: 'Start from the PPO allowed fee, subtract any deductible the patient still owes, and multiply the rest by the coverage percentage for that category. Then compare the result with the remaining annual maximum and use whichever is lower as the insurance estimate. The patient portion is the allowed fee minus that insurance estimate, and the write-off is the office fee minus the allowed fee.',
    },
    {
      q: 'Why is the deductible taken off before the coverage percentage?',
      a: 'Most dental plans apply the deductible first and coinsurance second, so the patient pays the deductible in full and the plan pays its percentage of what is left. Applying the percentage first would overstate the insurance payment. Some plans waive the deductible for preventive care, so enter zero for those procedures if the breakdown says so.',
    },
    {
      q: 'Is a dental insurance estimate a guarantee of payment?',
      a: 'No, an estimate is not a guarantee, and carriers state that benefits are determined when the claim is processed. Eligibility can change, other claims can use up the maximum, and the carrier may downgrade a procedure or apply a frequency limit. For crowns, implants, periodontal treatment and other larger cases, a predetermination is the most reliable way to set expectations.',
    },
    {
      q: 'What happens when the annual maximum runs out?',
      a: 'Once the annual maximum is used, the plan pays nothing more for the rest of the plan year and the patient is responsible for the remaining allowed fee. In-network patients generally still receive the PPO fee, depending on the contract and state rules. Staging treatment across two plan years can sometimes let a second maximum help with the cost.',
    },
    {
      q: 'How do waiting periods and frequency limits affect the estimate?',
      a: 'If a waiting period has not ended or the patient has already had the procedure as often as the plan allows, the plan usually pays nothing for that service. The estimate then shows the full allowed fee as the patient portion. Checking frequency history and plan effective dates during insurance verification helps avoid surprise balances.',
    },
  ],
  relatedServices: ['dental-insurance-verification', 'patient-billing', 'dental-claims-processing'],
  relatedTools: ['dental-annual-maximum-calculator', 'dental-ppo-write-off-calculator', 'dental-insurance-verification-checklist', 'eob-explained'],
  seoTitle: 'Dental Insurance Estimate Calculator: Patient Portion',
  metaDescription: 'Use this dental insurance estimate calculator to work out the insurance payment, patient out of pocket cost and PPO write-off for a procedure, step by step.',
  keywords: ['dental insurance estimate calculator', 'dental patient estimate', 'dental out of pocket cost calculator', 'dental insurance calculator', 'how to calculate dental insurance coverage'],
};

export default calc;
