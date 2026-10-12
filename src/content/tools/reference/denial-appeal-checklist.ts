import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'denial-appeal-checklist',
  name: 'Denial Appeal Checklist',
  category: 'checklist',
  icon: 'Gavel',
  summary: 'A checklist for reviewing a denial, choosing between a corrected claim and an appeal, building the appeal packet and tracking the outcome.',
  definition:
    'A denial appeal checklist guides billing staff from the moment a denial posts to the final payer decision. It covers reading the reason and remark codes, confirming deadlines, deciding whether a corrected claim or a formal appeal fits, assembling records and a clear letter, submitting with proof and tracking each appeal level.',
  sections: [
    {
      title: 'Review the denial',
      items: [
        { text: 'Read the CARC, RARC and group code on the remittance for each denied line' },
        { text: 'Confirm the denial is real and not a posting or payer processing error' },
        { text: 'Check patient eligibility, payer and coordination of benefits for the date of service' },
        { text: 'Compare the claim as billed with the documentation and any authorization' },
        { text: 'Identify the root cause (front desk, coding, authorization, payer error, policy)' },
      ],
    },
    {
      title: 'Choose the right path',
      items: [
        { text: 'Use a corrected claim when the error was on your side and the payer allows it', detail: 'Examples include a wrong modifier, diagnosis pointer or member ID.' },
        { text: 'Use a reopening or reconsideration when the payer offers a simpler review for clerical errors' },
        { text: 'Use a formal appeal when you believe the payer decision is wrong' },
        { text: 'Write off only after deciding the denial cannot be overturned, with a reason code for reporting' },
        { text: 'Confirm the appeal or correction deadline and the required level', detail: 'Medicare has five appeal levels with fixed time frames; commercial plans set their own in the contract or provider manual.' },
      ],
    },
    {
      title: 'Build the appeal packet',
      items: [
        { text: 'Use the payer appeal form or required cover sheet if one exists' },
        { text: 'Include patient name, member ID, claim number, date of service and billed amount' },
        { text: 'Write a short letter that states what you are appealing and why the payer should reverse it' },
        { text: 'Cite the specific payer policy, coverage criteria or contract terms that support payment' },
        { text: 'Attach relevant records: notes, test results, authorization, referral or proof of timely filing' },
        { text: 'Include a letter of medical necessity from the provider when necessity is in question' },
        { text: 'Send only the records needed and follow minimum necessary practices for PHI' },
      ],
    },
    {
      title: 'Submit and track',
      items: [
        { text: 'Submit through the payer required channel and keep proof of submission' },
        { text: 'Log the appeal with date sent, level, method and follow-up date' },
        { text: 'Follow up if no response arrives within the payer stated time frame' },
        { text: 'Escalate to the next appeal level before its deadline if upheld' },
        { text: 'Consider external review or state insurance department help when available for fully insured plans' },
      ],
    },
    {
      title: 'Close the loop',
      items: [
        { text: 'Post the appeal outcome and any payment correctly' },
        { text: 'Record the denial reason, root cause and outcome in a denial log' },
        { text: 'Share recurring causes with front desk, coding or providers' },
        { text: 'Update claim edits or templates so the same denial is caught before submission' },
        { text: 'Review overturn rates by payer and reason to decide where appeals pay off' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Should I send a corrected claim or an appeal?',
      a: 'Send a corrected claim when the denial came from an error on your claim, and an appeal when you believe the payer decided incorrectly. Correcting a wrong modifier or member ID is usually faster than appealing. Appealing an error you could have corrected often just leads to another denial, so read the codes first.',
    },
    {
      q: 'How long do I have to appeal a denial?',
      a: 'Appeal deadlines depend on the payer and the appeal level. For Medicare, a redetermination request is generally due within 120 days of receiving the initial determination. Commercial and Medicaid plans set their own limits in contracts and provider manuals, and some are much shorter. Log the deadline as soon as the denial posts.',
    },
    {
      q: 'What makes an appeal letter effective?',
      a: 'An effective appeal letter is short, specific and tied to evidence. It names the claim, states the requested outcome, explains why the payer decision conflicts with its own policy or the contract and points to the attached records that prove it. Generic letters without cited criteria or supporting documents are much easier for payers to uphold.',
    },
    {
      q: 'What are the Medicare appeal levels?',
      a: 'Original Medicare has five levels: redetermination by the MAC, reconsideration by a Qualified Independent Contractor, a hearing before an Administrative Law Judge, review by the Medicare Appeals Council and judicial review in federal district court. Each level has its own deadline, and the later levels have minimum amount-in-controversy thresholds.',
    },
  ],
  sources: [
    { label: 'CMS: Medicare Parts A and B appeals process', url: 'https://www.cms.gov/medicare/appeals-grievances/fee-for-service' },
    { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  ],
  relatedServices: ['denial-appeals', 'denial-management', 'revenue-recovery', 'aging-ar-follow-up'],
  relatedTools: ['denial-reasons-guide', 'denial-rate-calculator', 'revenue-recovery-calculator', 'eob-explained'],
  seoTitle: 'Denial Appeal Checklist: Corrected Claim or Appeal',
  metaDescription:
    'Step-by-step denial appeal checklist: read reason codes, choose corrected claim or appeal, build the packet, meet deadlines and prevent repeat denials.',
  keywords: [
    'denial appeal checklist',
    'claim appeal process',
    'insurance appeal letter',
    'medicare appeal levels',
    'corrected claim vs appeal',
    'denial management steps',
  ],
};

export default tool;
