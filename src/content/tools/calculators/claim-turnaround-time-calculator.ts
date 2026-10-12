import type { Calculator } from '../../types';
import { num, pct } from '../calc-helpers';

const calc: Calculator = {
  kind: 'calculator',
  slug: 'claim-turnaround-time-calculator',
  name: 'Claim Turnaround Time Calculator',
  category: 'kpi',
  icon: 'Timer',
  summary: 'Split the time from date of service to payment into your submission lag and the payer lag.',
  definition:
    'Claim turnaround time is the average number of days from date of service to payment. It has two parts: the submission lag, from date of service until the claim is sent, which your practice controls, and the payment lag, from submission until payment posts. Splitting them shows where delays in cash flow actually come from.',
  inputs: [
    { id: 'submissionLag', label: 'Average days from date of service to claim submission', unit: 'days', default: 4, min: 0, step: 0.1, help: 'Includes documentation, coding, charge entry and claim review time.' },
    { id: 'paymentLag', label: 'Average days from claim submission to payment', unit: 'days', default: 26, min: 0, step: 0.1, help: 'From the date the claim was sent until the payment or ERA posted. Use paid claims only.' },
  ],
  outputs: [
    { id: 'totalDays', label: 'Average days from service to payment', unit: 'days', primary: true },
    { id: 'submissionShare', label: 'Share of time before submission (practice side)', unit: 'pct' },
    { id: 'paymentShare', label: 'Share of time after submission (payer side)', unit: 'pct' },
  ],
  compute: (raw) => {
    const sub = num(raw.submissionLag);
    const pay = num(raw.paymentLag);
    const warnings: string[] = [];
    const notes: string[] = [];
    if (sub < 0 || pay < 0) warnings.push('Day counts should not be negative. Check the dates used.');
    const valid = sub >= 0 && pay >= 0;
    const totalDays = valid ? sub + pay : null;
    const submissionShare = valid && totalDays !== null && totalDays > 0 ? pct(sub, totalDays) : null;
    const paymentShare = valid && totalDays !== null && totalDays > 0 ? pct(pay, totalDays) : null;
    if (totalDays !== null && totalDays > 0 && submissionShare !== null) {
      notes.push(`On average a claim takes about ${totalDays.toFixed(1)} days to turn into cash, and ${submissionShare.toFixed(1)}% of that time passes before the claim leaves the practice.`);
      notes.push(sub > 0
        ? 'Submission lag is fully within your control. Each day removed from it moves cash forward by about a day for every claim.'
        : 'Payment lag depends on payer processing, but clean claims, fast rejection follow-up and electronic remittance can help shorten it.');
    }
    return { values: { totalDays, submissionShare, paymentShare }, notes, warnings };
  },
  formula: [
    { expression: 'Turnaround time = Submission lag + Payment lag', explanation: 'Average days from date of service to payment.' },
    { expression: 'Submission share = Submission lag / Turnaround time x 100', explanation: 'Portion of the cycle spent inside the practice.' },
    { expression: 'Payment share = Payment lag / Turnaround time x 100', explanation: 'Portion of the cycle spent waiting on the payer, including rework after submission.' },
  ],
  example: {
    inputs: { submissionLag: 4, paymentLag: 26 },
    expected: { totalDays: 30, submissionShare: 13.33, paymentShare: 86.67 },
    narrative: 'Claims are sent an average of 4 days after the visit and paid an average of 26 days after submission. Turnaround is 4 + 26 = 30 days. Submission accounts for 4 / 30 = 13.33% of the time and the payer side for 26 / 30 = 86.67%.',
  },
  assumptions: [
    'Both averages come from the same set of paid claims. Claims still unpaid are excluded, which makes the average look shorter than the full picture.',
    'Payment lag includes any rework time after first submission, such as rejections or denials that were later paid.',
    'Averages can hide long delays on a few claims. Reviewing the median and the slowest payers adds useful detail.',
  ],
  faqs: [
    {
      q: 'How do you calculate claim turnaround time?',
      a: 'Add the average days from date of service to claim submission to the average days from submission to payment. Calculate both averages from the same set of paid claims. For example, a 4 day submission lag plus a 26 day payment lag gives a 30 day turnaround from service to cash for a typical paid claim.',
    },
    {
      q: 'Why split turnaround time into two lags?',
      a: 'Splitting the time shows who controls each part. Submission lag reflects documentation, coding and charge entry inside the practice, so it can be reduced directly. Payment lag reflects payer processing plus any rework from rejections or denials. Knowing which part is longer tells you whether to focus on internal workflow or on claim quality and payer follow-up.',
    },
    {
      q: 'What causes a long submission lag?',
      a: 'Long submission lag is usually caused by delayed provider documentation, coding backlogs, charge entry queues, claims held for missing information or batch schedules that only send claims a few times a week. Tracking the days between each step, such as visit to signed note and signed note to coded charge, helps find the bottleneck.',
    },
    {
      q: 'Can a practice shorten payment lag?',
      a: 'A practice cannot control how fast payers adjudicate, but it can influence payment lag. Submitting clean claims, working rejections quickly, enrolling in electronic remittance and electronic funds transfer, and following up on claims with no response all help. Payer specific processing times also vary, so reviewing payment lag by payer shows where follow-up matters most.',
    },
  ],
  relatedServices: ['claims-submission', 'charge-entry', 'electronic-claims-processing'],
  relatedTools: ['days-in-ar-calculator', 'first-pass-acceptance-rate-calculator', 'clean-claim-rate-calculator'],
  seoTitle: 'Claim Turnaround Time Calculator: Service to Payment',
  metaDescription: 'Calculate average days from date of service to payment and see how much comes from your submission lag versus the payer payment lag, with a worked example.',
  keywords: ['claim turnaround time', 'claim lag days calculator', 'date of service to payment'],
};

export default calc;
