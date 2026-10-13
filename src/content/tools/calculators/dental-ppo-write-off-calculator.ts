import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'dental-ppo-write-off-calculator',
  name: 'Dental PPO Write-Off Calculator',
  category: 'dental',
  icon: 'Scissors',
  summary: 'Estimate how much production your practice writes off to PPO fee schedules each year and what net production is left.',
  definition:
    'A dental PPO write-off calculator estimates the gap between your office fees and the fees your PPO contracts allow. Using your PPO share of production and average PPO fee as a percentage of your fee, it shows the annual write-off, the write-off as a share of gross production and the net production you can expect to collect.',
  inputs: [
    { id: 'grossProduction', label: 'Annual gross production at office fees', unit: 'usd', default: 1200000, min: 0, step: 1000, help: 'All production for the year at your full fee schedule, before any adjustments.' },
    { id: 'ppoShare', label: 'Share of production billed to PPO plans', unit: 'pct', default: 70, min: 0, max: 100, step: 1, help: 'The part of gross production for patients seen under in-network PPO contracts.' },
    { id: 'ppoFeePct', label: 'Average PPO fee as a % of your office fee', unit: 'pct', default: 65, min: 0, max: 100, step: 1, help: 'For example, if PPO plans allow $65 on average where you charge $100, enter 65. A fee schedule comparison by CDT code gives the most accurate figure.' },
  ],
  outputs: [
    { id: 'annualWriteOff', label: 'Annual PPO write-off', unit: 'usd', primary: true },
    { id: 'writeOffPctGross', label: 'PPO write-off as a % of gross production', unit: 'pct', primary: true },
    { id: 'netProduction', label: 'Net production after PPO write-offs', unit: 'usd' },
    { id: 'ppoProduction', label: 'PPO production at office fees', unit: 'usd' },
    { id: 'monthlyWriteOff', label: 'Average monthly PPO write-off', unit: 'usd' },
  ],
  compute: (raw) => {
    const gross = num(raw.grossProduction);
    const share = num(raw.ppoShare);
    const feePct = num(raw.ppoFeePct);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (gross < 0 || share < 0 || feePct < 0) warnings.push('Inputs should not be negative.');
    if (share > 100) warnings.push('The PPO share cannot exceed 100% of production.');
    if (feePct > 100) warnings.push('A PPO fee above 100% of your office fee means no write-off. Check that your office fees are up to date.');
    if (gross <= 0 || share < 0 || share > 100 || feePct < 0) {
      if (gross <= 0) warnings.push('Enter annual gross production at office fees.');
      return { values: { annualWriteOff: null, writeOffPctGross: null, netProduction: null, ppoProduction: null, monthlyWriteOff: null }, notes, warnings };
    }
    const ppoProduction = (gross * share) / 100;
    const annualWriteOff = Math.max(0, ppoProduction * (1 - feePct / 100));
    const writeOffPctGross = pct(annualWriteOff, gross);
    const netProduction = gross - annualWriteOff;
    const monthlyWriteOff = annualWriteOff / 12;
    if (writeOffPctGross !== null) {
      notes.push(`About ${writeOffPctGross.toFixed(1)}% of gross production is written off to PPO fee schedules. Collection rates and goals are best measured against net production of about $${Math.round(netProduction).toLocaleString('en-US')}.`);
      notes.push('PPO write-offs are contractual, not lost revenue from billing errors. To see whether a plan is worth keeping, compare its fees by CDT code with your office fees and the patient volume it brings.');
    }
    return { values: { annualWriteOff, writeOffPctGross, netProduction, ppoProduction, monthlyWriteOff }, notes, warnings };
  },
  formula: [
    { expression: 'PPO production = Gross production x PPO share %', explanation: 'Production for patients seen under PPO contracts, at your office fees.' },
    { expression: 'Annual PPO write-off = PPO production x (1 - Average PPO fee %)', explanation: 'The difference between what you charge and what the plans allow.' },
    { expression: 'Write-off % of gross = Annual PPO write-off / Gross production x 100', explanation: 'How much of total production is adjusted off to PPO schedules.' },
    { expression: 'Net production = Gross production - Annual PPO write-off; Monthly write-off = Annual write-off / 12', explanation: 'The production you can actually expect to collect, and the average monthly adjustment.' },
  ],
  example: {
    inputs: { grossProduction: 1200000, ppoShare: 70, ppoFeePct: 65 },
    expected: { annualWriteOff: 294000, writeOffPctGross: 24.5, netProduction: 906000, ppoProduction: 840000, monthlyWriteOff: 24500 },
    narrative: 'A practice produces $1,200,000 a year at office fees, and 70% of it is for PPO patients, so PPO production is 1,200,000 x 70% = $840,000. Its PPO plans allow 65% of office fees on average, so the write-off is 840,000 x 35% = $294,000 a year, or $24,500 a month. That is 294,000 / 1,200,000 = 24.5% of gross production, leaving net production of $906,000.',
  },
  assumptions: [
    'The average PPO fee percentage is weighted by the procedures you actually perform, not a simple average of the fee schedule.',
    'Production for fee-for-service, DHMO and Medicaid patients is outside the PPO share and has no PPO write-off in this calculation.',
    'Office fees are applied consistently to every patient, so the write-off reflects the contracted fee gap only.',
    'Denial, bad debt and courtesy write-offs are excluded.',
  ],
  faqs: [
    {
      q: 'What is a PPO write-off in a dental office?',
      a: 'A PPO write-off is the difference between your office fee and the fee a PPO plan allows under your contract, which the practice agrees not to bill to the patient. For example, if you charge $1,200 for a crown and the plan allows $950, the $250 difference is written off. It is a contractual adjustment, separate from denials or bad debt.',
    },
    {
      q: 'How do I use this dental PPO write-off calculator?',
      a: 'Enter annual gross production at your full fees, the share of that production billed to PPO plans and the average PPO fee as a percentage of your fee. The dental PPO write-off calculator multiplies PPO production by the fee gap to show the yearly write-off, its share of gross production and net production. Practice management reports usually provide each input.',
    },
    {
      q: 'Should PPO write-offs be posted at the time of service?',
      a: 'Many practices post the expected PPO write-off when the claim is created so that the patient balance and AR reflect what is actually collectible. The adjustment is then corrected when the EOB or ERA arrives if the carrier allowed a different amount. Posting it consistently keeps production, collection rate and aging reports accurate.',
    },
    {
      q: 'Why do PPO write-offs seem high even when collections look healthy?',
      a: 'A practice can collect almost all of its net production and still write off a large part of gross production, because the write-off is set by the fee schedules it signed, not by billing performance. Measuring collections against net production separates the two. Reviewing which plans have the lowest fees for your most common procedures shows where the write-off comes from.',
    },
    {
      q: 'Can a dental practice reduce its PPO write-offs?',
      a: 'Write-offs fall when the gap between office fees and allowed fees narrows or when less production is tied to low-paying plans. Practices often review fee schedules by CDT code, ask carriers about fee updates, and weigh each plan against the patients it brings. Leaving a network can lower write-offs but may also reduce patient volume, so model both sides first.',
    },
  ],
  relatedServices: ['payment-posting', 'rcm-analytics-reporting', 'dental-billing'],
  relatedTools: ['fee-schedule-comparison-calculator', 'dental-insurance-collection-calculator', 'dental-patient-estimate-calculator', 'dental-practice-revenue-calculator'],
  seoTitle: 'Dental PPO Write-Off Calculator: Annual Write-Offs',
  metaDescription: 'Use this dental PPO write-off calculator to estimate yearly PPO write-offs, their share of gross production and your net production from a few simple inputs.',
  keywords: ['dental ppo write off calculator', 'ppo write-offs dental', 'dental write off percentage', 'dental ppo fee schedule write off', 'dental net production'],
};

export default calc;
