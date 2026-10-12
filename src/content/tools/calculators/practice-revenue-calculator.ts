import type { Calculator } from '../../types';
import { num, div } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'practice-revenue-calculator',
  name: 'Medical Practice Revenue Calculator',
  category: 'revenue',
  icon: 'TrendingUp',
  summary: 'Estimate monthly and annual practice revenue from providers, daily visits, working days and average reimbursement.',
  definition:
    'A medical practice revenue calculator estimates what a practice brings in by multiplying the number of providers, patients seen per provider each day, working days per month and the average amount actually collected per visit. It gives a quick monthly and annual revenue picture for planning, staffing and budgeting.',
  inputs: [
    { id: 'providers', label: 'Number of billing providers', unit: 'count', default: 3, min: 0, step: 1, help: 'Physicians and advanced practice providers who see patients and bill under their own NPI.' },
    { id: 'patientsPerDay', label: 'Patients seen per provider per day', unit: 'count', default: 20, min: 0, step: 1, help: 'Average completed visits per provider on a working day. Exclude no-shows and cancellations.' },
    { id: 'workingDays', label: 'Working days per month', unit: 'days', default: 21, min: 0, max: 31, step: 1, help: 'Clinic days each provider works in a typical month, after holidays and time off.' },
    { id: 'avgReimbursement', label: 'Average reimbursement per visit', unit: 'usd', default: 110, min: 0, step: 1, help: 'Average amount actually collected per visit from payers and patients combined, not your billed charge.' },
  ],
  outputs: [
    { id: 'monthlyVisits', label: 'Visits per month', unit: 'count' },
    { id: 'monthlyRevenue', label: 'Estimated monthly revenue', unit: 'usd', primary: true },
    { id: 'annualRevenue', label: 'Estimated annual revenue', unit: 'usd', primary: true },
    { id: 'annualRevenuePerProvider', label: 'Estimated annual revenue per provider', unit: 'usd' },
  ],
  compute: (v) => {
    const providers = num(v.providers);
    const perDay = num(v.patientsPerDay);
    const days = num(v.workingDays);
    const reimb = num(v.avgReimbursement);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (providers < 0 || perDay < 0 || days < 0 || reimb < 0) {
      warnings.push('Inputs cannot be negative.');
      return { values: { monthlyVisits: null, monthlyRevenue: null, annualRevenue: null, annualRevenuePerProvider: null }, warnings };
    }
    if (days > 31) warnings.push('Working days per month cannot be more than 31. Check the figure.');
    if (perDay > 60) warnings.push('More than 60 patients per provider per day is unusual. Check that this is a per-provider figure.');
    if (providers > 0 && !Number.isInteger(providers)) warnings.push('Provider count is not a whole number. Part-time providers can be entered as full-time equivalents, but check the figure.');
    const monthlyVisits = providers * perDay * days;
    const monthlyRevenue = monthlyVisits * reimb;
    const annualRevenue = monthlyRevenue * 12;
    const annualRevenuePerProvider = div(annualRevenue, providers);
    if (monthlyRevenue > 0) {
      notes.push('This is an estimate based on averages. Actual revenue varies with payer mix, visit types, denials and seasonal volume.');
      notes.push('Because the reimbursement figure is what you collect per visit, the result approximates collections, not gross charges.');
    }
    return { values: { monthlyVisits, monthlyRevenue, annualRevenue, annualRevenuePerProvider }, notes, warnings };
  },
  formula: [
    { expression: 'Visits per month = Providers x Patients per provider per day x Working days per month', explanation: 'Total completed visits the practice handles in a typical month.' },
    { expression: 'Monthly revenue = Visits per month x Average reimbursement per visit', explanation: 'Uses the amount actually collected per visit, so the result estimates collections.' },
    { expression: 'Annual revenue = Monthly revenue x 12', explanation: 'Assumes every month looks like the typical month you entered.' },
    { expression: 'Annual revenue per provider = Annual revenue / Providers', explanation: 'An average across all providers; individual providers will differ.' },
  ],
  example: {
    inputs: { providers: 3, patientsPerDay: 20, workingDays: 21, avgReimbursement: 110 },
    expected: { monthlyVisits: 1260, monthlyRevenue: 138600, annualRevenue: 1663200, annualRevenuePerProvider: 554400 },
    narrative:
      'Three providers each see 20 patients a day for 21 days a month: 3 x 20 x 21 = 1,260 visits. At an average of $110 collected per visit, monthly revenue is 1,260 x 110 = $138,600. Annual revenue is 138,600 x 12 = $1,663,200, or 1,663,200 / 3 = $554,400 per provider.',
  },
  assumptions: [
    'Every provider sees the same average number of patients and works the same number of days.',
    'The average reimbursement reflects what is actually collected per visit (payer plus patient), after contractual adjustments, denials and bad debt.',
    'Annual revenue is the typical month multiplied by 12 and does not adjust for seasonality, growth or provider turnover.',
    'Ancillary revenue (labs, imaging, procedures billed separately) is only included if it is part of your average per visit.',
  ],
  faqs: [
    {
      q: 'How do I calculate my medical practice revenue?',
      a: 'Multiply the number of providers by the patients each sees per day, the working days per month and the average amount collected per visit. That gives monthly revenue, and multiplying by 12 gives an annual estimate. Use collected amounts rather than billed charges, because charges at your fee schedule are usually far higher than what payers actually pay.',
    },
    {
      q: 'What should I use for average reimbursement per visit?',
      a: 'Use total collections for a recent period divided by the number of visits in that period. This captures your real payer mix, contractual rates, patient payments and losses to denials. Pulling three to six months of data from your practice management system smooths out timing differences between when visits happen and when payments arrive.',
    },
    {
      q: 'Why is my actual revenue lower than this estimate?',
      a: 'Actual revenue is often lower because of no-shows, slower months, denied claims that are never reworked, underpayments and patient balances that go uncollected. The calculator assumes every month is typical. Comparing the estimate to your real collections can highlight a gap worth investigating with a revenue cycle review or a revenue leakage estimate.',
    },
    {
      q: 'Can I use this calculator for a new practice?',
      a: 'Yes, as a planning estimate. For a new practice, use conservative patient volumes for the first months, since schedules usually take time to fill and new providers may wait on payer enrollment before they can bill. Reimbursement assumptions should come from expected payer contracts and local rates rather than national averages.',
    },
  ],
  relatedServices: ['revenue-cycle-management', 'rcm-analytics-reporting', 'medical-billing'],
  relatedTools: ['revenue-per-provider-calculator', 'monthly-revenue-forecast-calculator', 'annual-revenue-projection-calculator', 'provider-productivity-calculator'],
  seoTitle: 'Medical Practice Revenue Calculator',
  metaDescription: 'Estimate monthly and annual medical practice revenue from providers, daily patient visits, working days and average reimbursement per visit.',
  keywords: ['medical practice revenue calculator', 'how to calculate practice revenue', 'physician practice revenue estimate'],
};

export default calc;
