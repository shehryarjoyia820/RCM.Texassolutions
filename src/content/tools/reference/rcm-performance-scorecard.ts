import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'guide',
  slug: 'rcm-performance-scorecard',
  name: 'RCM Performance Scorecard',
  category: 'kpi',
  icon: 'Gauge',
  summary: 'Score your revenue cycle on the core KPIs: net collection rate, days in AR, aged AR, denials, clean claims, cost to collect and more.',
  definition:
    'An RCM performance scorecard is a short set of key performance indicators that shows how well a practice turns services into collected revenue. It tracks collection effectiveness, speed of payment, claim quality, denials, aged receivables, patient collections and cost, so leaders can see where the revenue cycle is losing money or time.',
  entries: [
    {
      term: 'Net collection rate',
      meaning:
        'Share of collectible revenue actually collected. Calculate: payments / (charges - contractual adjustments) x 100, using the same period for all figures. Higher is better. The AAFP practice finances guide (checked 2026) suggests an adjusted collection rate of at least 95%, with 95% to 99% described as average.',
      tag: 'pct',
    },
    {
      term: 'Days in AR',
      meaning:
        'Average number of days to collect payment. Calculate: total AR / average daily charges, where average daily charges = charges for a recent period (such as 3 months) / days in that period. Lower is better. The AAFP practice finances guide (checked 2026) says to stay below 50 days, with 30 to 40 days preferable.',
      tag: 'days',
    },
    {
      term: 'AR over 90 days',
      meaning:
        'Share of total AR older than 90 days from the date of service or claim. Calculate: AR in the over-90-day buckets / total AR x 100. Lower is better, because older balances are harder to collect.',
      tag: 'pct',
    },
    {
      term: 'AR over 120 days',
      meaning:
        'Share of total AR older than 120 days. Calculate: AR in the over-120-day buckets / total AR x 100. Lower is better. MGMA reported a median of 13.54% for multispecialty practices in its 2021 DataDive Cost and Revenue data; compare with your own specialty data where possible.',
      tag: 'pct',
    },
    {
      term: 'Denial rate',
      meaning:
        'Share of submitted claims denied by payers. Calculate: claims denied / claims adjudicated x 100 for the period (track dollars too). Lower is better. The AAFP practice finances guide (checked 2026) describes 5% to 10% as the industry average and below 5% as more desirable.',
      tag: 'pct',
    },
    {
      term: 'Clean claim rate',
      meaning:
        'Share of claims that pass clearinghouse and payer edits with no errors on first submission. Calculate: claims with no rejections or edits / total claims submitted x 100. Higher is better.',
      tag: 'pct',
    },
    {
      term: 'First-pass acceptance rate',
      meaning:
        'Share of claims accepted (or paid) on the first submission without rework. Calculate: claims accepted or resolved on first pass / total claims submitted x 100. Define whether you count acceptance or payment and keep it consistent. Higher is better.',
      tag: 'pct',
    },
    {
      term: 'Cost to collect',
      meaning:
        'What it costs to collect each dollar. Calculate: total revenue cycle cost (staff, software, clearinghouse, vendors, statements) / total collections x 100. Lower is better, as long as collection results hold steady.',
      tag: 'pct',
    },
    {
      term: 'Patient collection rate',
      meaning:
        'Share of patient responsibility actually collected. Calculate: patient payments / patient responsibility billed for the period x 100. Higher is better; collecting at time of service usually helps.',
      tag: 'pct',
    },
    {
      term: 'Charge lag',
      meaning:
        'Average days from date of service to charge entry. Calculate: sum of (charge entry date - service date) for all charges / number of charges. Lower is better, because every day of lag delays the claim and payment.',
      tag: 'days',
    },
  ],
  faqs: [
    {
      q: 'Which RCM KPIs matter most for a small practice?',
      a: 'For most small practices, net collection rate, days in AR, the share of AR over 90 or 120 days and denial rate give the clearest picture. Together they show whether you collect what you are owed, how fast money arrives and where claims get stuck. Add clean claim rate and charge lag once those four are tracked reliably.',
    },
    {
      q: 'How often should I review an RCM scorecard?',
      a: 'Review the scorecard monthly, using the same definitions and periods each time, and look at trends over several months rather than one result. Weekly checks on denials, rejections and charge lag can catch problems sooner. Quarterly, compare results by payer and provider to find where to focus improvement work.',
    },
    {
      q: 'Are published benchmarks the right targets for my practice?',
      a: 'Published benchmarks are a starting point, not a fixed target, because results vary by specialty, payer mix, state and practice size. Use them to spot large gaps, then set goals from your own trend. Sources such as MGMA, AAFP and HFMA publish data with stated definitions, so match their formulas before comparing.',
    },
    {
      q: 'Why do my KPI numbers differ from my billing system report?',
      a: 'KPI numbers often differ because systems define metrics differently, such as gross versus net charges, payment date versus service date, or whether credits and write-offs are included. Agree on one definition for each KPI, document it and use the same data source each month so trends are meaningful.',
    },
  ],
  sources: [
    { label: 'AAFP: Managing practice finances (days in AR, collection rate, denial rate)', url: 'https://www.aafp.org/family-physician/practice-and-career/managing-your-practice/practice-finances.html' },
    { label: 'MGMA Stat: A/R over 120 days, 2021 DataDive Cost and Revenue (November 2021)', url: 'https://www.mgma.com/mgma-stats/not-so-graceful-aging-half-of-practices-saw-days-in-a-r-increase-in-2021' },
  ],
  relatedServices: ['rcm-analytics-reporting', 'revenue-cycle-audit', 'revenue-cycle-management', 'accounts-receivable-management'],
  relatedTools: ['net-collection-rate-calculator', 'days-in-ar-calculator', 'denial-rate-calculator', 'clean-claim-rate-calculator'],
  seoTitle: 'RCM Performance Scorecard: Key Revenue Cycle KPIs',
  metaDescription:
    'Score your revenue cycle on 10 KPIs: net collection rate, days in AR, aged AR, denial rate, clean claims, cost to collect, patient collections and charge lag.',
  keywords: [
    'rcm kpi scorecard',
    'revenue cycle kpis',
    'medical billing kpis',
    'days in ar benchmark',
    'net collection rate benchmark',
    'rcm performance metrics',
  ],
};

export default tool;
