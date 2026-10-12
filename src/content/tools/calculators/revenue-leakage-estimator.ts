import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'revenue-leakage-estimator',
  name: 'Revenue Leakage Estimator',
  category: 'revenue',
  icon: 'Droplet',
  summary: 'Estimate how much revenue may be slipping away through unworked denials, missed charges, underpayments and timely filing write-offs.',
  definition:
    'Revenue leakage is money a practice earned but never collects. This estimator sizes four common sources: denied claims that are never reworked, services that are never charged, payments below the contracted rate and claims written off for missing timely filing limits. The result is an estimate built from your own volume and rate assumptions.',
  inputs: [
    { id: 'monthlyClaims', label: 'Claims submitted per month', unit: 'count', default: 2000, min: 0, step: 50, help: 'Total claims sent to payers in a typical month.' },
    { id: 'avgExpectedPayment', label: 'Average expected payment per claim', unit: 'usd', default: 150, min: 0, step: 5, help: 'The contracted (allowed) amount you expect per claim, including the patient portion, not your billed charge.' },
    { id: 'denialRate', label: 'Initial denial rate', unit: 'pct', default: 8, min: 0, max: 100, step: 0.5, help: 'Share of submitted claims denied on first pass.' },
    { id: 'unworkedPct', label: 'Share of denials never reworked', unit: 'pct', default: 35, min: 0, max: 100, step: 1, help: 'Share of denied claims that are written off or left to age out without an appeal or corrected claim.' },
    { id: 'missedChargePct', label: 'Missed charges (% of expected revenue)', unit: 'pct', default: 1, min: 0, max: 100, step: 0.1, help: 'Services performed but never billed, as a share of monthly expected revenue. Charge audits are the best source for this figure.' },
    { id: 'underpaidPct', label: 'Share of paid claims underpaid', unit: 'pct', default: 5, min: 0, max: 100, step: 0.5, help: 'Share of paid claims where the payer paid less than the contracted rate.' },
    { id: 'shortfallPct', label: 'Average shortfall on underpaid claims', unit: 'pct', default: 10, min: 0, max: 100, step: 0.5, help: 'How far below the expected payment an underpaid claim falls, on average.' },
    { id: 'timelyFilingPct', label: 'Timely filing write-offs (% of claims)', unit: 'pct', default: 0.5, min: 0, max: 100, step: 0.1, help: 'Share of claims written off because they were filed or appealed after the payer deadline.' },
  ],
  outputs: [
    { id: 'expectedRevenue', label: 'Expected monthly revenue from submitted claims', unit: 'usd' },
    { id: 'deniedLoss', label: 'Lost to denials never reworked', unit: 'usd' },
    { id: 'missedChargeLoss', label: 'Lost to missed charges', unit: 'usd' },
    { id: 'underpaymentLoss', label: 'Lost to underpayments', unit: 'usd' },
    { id: 'timelyFilingLoss', label: 'Lost to timely filing write-offs', unit: 'usd' },
    { id: 'monthlyLeakage', label: 'Estimated monthly revenue leakage', unit: 'usd', primary: true },
    { id: 'annualLeakage', label: 'Estimated annual revenue leakage', unit: 'usd', primary: true },
    { id: 'leakagePct', label: 'Leakage as % of expected revenue', unit: 'pct' },
  ],
  compute: (v) => {
    const claims = num(v.monthlyClaims);
    const avg = num(v.avgExpectedPayment);
    const rates = [num(v.denialRate), num(v.unworkedPct), num(v.missedChargePct), num(v.underpaidPct), num(v.shortfallPct), num(v.timelyFilingPct)];
    const [denial, unworked, missed, underpaid, shortfall, timely] = rates.map((r) => r / 100);
    const warnings: string[] = [];
    const notes: string[] = [];
    const empty = { expectedRevenue: null, deniedLoss: null, missedChargeLoss: null, underpaymentLoss: null, timelyFilingLoss: null, monthlyLeakage: null, annualLeakage: null, leakagePct: null };
    if (claims < 0 || avg < 0 || rates.some((r) => r < 0)) {
      warnings.push('Inputs cannot be negative.');
      return { values: empty, warnings };
    }
    if (rates.some((r) => r > 100)) {
      warnings.push('Percentages cannot be above 100%.');
      return { values: empty, warnings };
    }
    const expectedRevenue = claims * avg;
    const deniedLostClaims = claims * denial * unworked;
    const timelyClaims = claims * timely;
    if (deniedLostClaims + timelyClaims > claims) {
      warnings.push('Unworked denials and timely filing write-offs add up to more claims than you submit. These may overlap; check the rates.');
    }
    const paidClaims = Math.max(0, claims - deniedLostClaims - timelyClaims);
    const deniedLoss = deniedLostClaims * avg;
    const missedChargeLoss = expectedRevenue * missed;
    const underpaymentLoss = paidClaims * avg * underpaid * shortfall;
    const timelyFilingLoss = timelyClaims * avg;
    const monthlyLeakage = deniedLoss + missedChargeLoss + underpaymentLoss + timelyFilingLoss;
    const annualLeakage = monthlyLeakage * 12;
    const leakagePct = pct(monthlyLeakage, expectedRevenue);
    if (denial * 100 > 30) warnings.push('A denial rate above 30% is unusually high. Check that it is a share of claims, not of dollars.');
    if (monthlyLeakage > 0) {
      notes.push('This is an estimate. It shows where money could be leaking based on your assumptions, not a measured loss.');
      const parts: [string, number][] = [
        ['denials never reworked', deniedLoss],
        ['missed charges', missedChargeLoss],
        ['underpayments', underpaymentLoss],
        ['timely filing write-offs', timelyFilingLoss],
      ];
      parts.sort((a, b) => b[1] - a[1]);
      notes.push(`The largest estimated source is ${parts[0][0]}, which is usually the best place to start a review.`);
    }
    return {
      values: { expectedRevenue, deniedLoss, missedChargeLoss, underpaymentLoss, timelyFilingLoss, monthlyLeakage, annualLeakage, leakagePct },
      notes,
      warnings,
    };
  },
  formula: [
    { expression: 'Expected revenue = Claims per month x Average expected payment', explanation: 'What submitted claims should bring in at contracted rates.' },
    { expression: 'Denial loss = Claims x Denial rate x Share never reworked x Average expected payment', explanation: 'Denied claims that are abandoned are assumed to bring in nothing.' },
    { expression: 'Missed charge loss = Expected revenue x Missed charge %', explanation: 'Revenue for services that were performed but never billed.' },
    { expression: 'Paid claims = Claims - Unworked denials - Timely filing write-offs', explanation: 'Underpayments only apply to claims that were actually paid, so lost claims are not counted twice.' },
    { expression: 'Underpayment loss = Paid claims x Average expected payment x Underpaid % x Average shortfall %', explanation: 'The gap between contracted and paid amounts.' },
    { expression: 'Timely filing loss = Claims x Timely filing % x Average expected payment', explanation: 'Claims written off because a deadline was missed.' },
    { expression: 'Monthly leakage = Denial loss + Missed charge loss + Underpayment loss + Timely filing loss; Annual = Monthly x 12', explanation: 'The four sources added together.' },
    { expression: 'Leakage % = Monthly leakage / Expected revenue x 100', explanation: 'Leakage relative to what submitted claims should pay.' },
  ],
  example: {
    inputs: { monthlyClaims: 2000, avgExpectedPayment: 150, denialRate: 8, unworkedPct: 35, missedChargePct: 1, underpaidPct: 5, shortfallPct: 10, timelyFilingPct: 0.5 },
    expected: {
      expectedRevenue: 300000,
      deniedLoss: 8400,
      missedChargeLoss: 3000,
      underpaymentLoss: 1450.5,
      timelyFilingLoss: 1500,
      monthlyLeakage: 14350.5,
      annualLeakage: 172206,
      leakagePct: 4.78,
    },
    narrative:
      '2,000 claims at $150 each should bring in $300,000 a month. 8% are denied and 35% of those are never reworked: 2,000 x 0.08 x 0.35 = 56 claims, or 56 x 150 = $8,400. Missed charges at 1% of $300,000 are $3,000. Timely filing write-offs are 2,000 x 0.005 = 10 claims, or $1,500. That leaves 2,000 - 56 - 10 = 1,934 paid claims; 5% are underpaid by 10%, so 1,934 x 150 x 0.05 x 0.10 = $1,450.50. Total leakage is 8,400 + 3,000 + 1,450.50 + 1,500 = $14,350.50 a month, $172,206 a year, or 14,350.50 / 300,000 = 4.78% of expected revenue.',
  },
  assumptions: [
    'Every claim is worth the same average expected payment. Real claims vary widely in value.',
    'Denied claims that are never reworked are assumed to pay nothing, even though some may be partly recovered from the patient.',
    'Missed charges are entered as a share of expected revenue from submitted claims.',
    'Underpayments are applied only to claims that were paid, to avoid counting lost claims twice. Unworked denials and timely filing write-offs are assumed not to overlap.',
    'All results are estimates based on your rate assumptions, not measured losses.',
  ],
  faqs: [
    {
      q: 'What is revenue leakage in medical billing?',
      a: 'Revenue leakage is money a practice has earned but never collects. Common sources include denied claims that are never appealed, services that are performed but never charged, payments below the contracted rate and claims that miss timely filing deadlines. Leakage is often invisible in standard reports because the money was never posted in the first place.',
    },
    {
      q: 'How accurate is this revenue leakage estimate?',
      a: 'It is only as accurate as the rates you enter. The calculator applies simple averages to your claim volume, so treat the result as a sizing estimate rather than a measured loss. To confirm actual leakage, review denial reports, run a charge reconciliation against the schedule and compare payments with your contracted fee schedules.',
    },
    {
      q: 'Where do I find my denial and rework rates?',
      a: 'Your practice management system or clearinghouse usually reports initial denial rates by payer and reason. The share never reworked is harder to find: compare denied claims for a past period with those later paid, appealed or corrected. Denied claims still sitting unworked after 90 days are a reasonable proxy for abandoned denials.',
    },
    {
      q: 'Why are underpayments applied only to paid claims?',
      a: 'A claim that is lost to an unworked denial or a timely filing write-off already counts as a full loss, so applying an underpayment to it as well would count the same dollars twice. Limiting underpayments to claims that were actually paid keeps the total from being overstated.',
    },
    {
      q: 'What is usually the easiest leakage to fix?',
      a: 'It varies by practice, but denials that were never reworked are often a practical starting point because the claims already exist and many payers allow corrected claims or appeals within set time limits. Missed charges usually need a process fix such as charge reconciliation, while underpayments need contract fee schedules loaded so variances can be flagged.',
    },
  ],
  relatedServices: ['revenue-cycle-audit', 'denial-management', 'underpayment-identification', 'charge-entry', 'revenue-recovery'],
  relatedTools: ['underpayment-estimator', 'denial-rate-calculator', 'revenue-recovery-calculator', 'payment-variance-calculator'],
  seoTitle: 'Revenue Leakage Estimator for Medical Practices',
  metaDescription: 'Estimate revenue lost to unworked denials, missed charges, underpayments and timely filing write-offs, monthly and annually, using your own claim data.',
  keywords: ['revenue leakage estimator', 'medical billing revenue leakage', 'lost revenue from denials'],
};

export default calc;
