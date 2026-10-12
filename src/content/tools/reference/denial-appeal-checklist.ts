import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'denial-appeal-checklist',
  name: 'Dental Denial Appeal Checklist',
  category: 'checklist',
  icon: 'Gavel',
  summary: 'A checklist for reviewing a dental claim denial, choosing between a corrected claim and an appeal, building the appeal packet and tracking the outcome.',
  definition:
    'A dental denial appeal checklist guides the billing team from the moment a denial posts from a dental carrier EOB or ERA to the final decision. It covers reading the reason codes, confirming deadlines, choosing a corrected claim or a formal appeal, assembling x-rays, perio charts and a clear narrative, submitting with proof and tracking each level.',
  sections: [
    {
      title: 'Review the denial',
      items: [
        { text: 'Read the reason on the EOB, or the CARC, RARC and group code on the ERA, for each denied line' },
        { text: 'Confirm the denial is real and not a posting or carrier processing error' },
        { text: 'Check eligibility, subscriber, waiting periods and coordination of benefits for the date of service' },
        { text: 'Check frequency history and the remaining annual maximum if the denial cites a limitation' },
        { text: 'Compare the claim as sent with the clinical notes, x-rays, photos and perio charts' },
        { text: 'Identify the root cause (verification, attachments, coding, posting, carrier error or plan exclusion)' },
      ],
    },
    {
      title: 'Choose the right path',
      items: [
        { text: 'Send a corrected claim when the error was on your side and the carrier allows it', detail: 'Examples include a wrong tooth number, surface, CDT code or subscriber ID.' },
        { text: 'Send missing documentation when the carrier only needs records to finish its review' },
        { text: 'Use a formal appeal or reconsideration when you believe the carrier\'s decision is wrong' },
        { text: 'Move the balance to the patient only when the reason code and your contract allow it' },
        { text: 'Write off only after deciding the denial cannot be overturned, with an adjustment type for reporting' },
        { text: 'Confirm the appeal deadline and the required level in the carrier\'s provider manual or contract', detail: 'Dental carriers set their own appeal windows and levels; Medicaid dental programs follow state rules.' },
      ],
    },
    {
      title: 'Build the appeal packet',
      items: [
        { text: 'Use the carrier appeal form or required cover sheet if one exists' },
        { text: 'Include patient name, subscriber ID, claim number, date of service, CDT codes and billed amount' },
        { text: 'Write a short letter that states what you are appealing and why the carrier should reverse it' },
        { text: 'Cite the plan language, clinical criteria or contract terms that support payment' },
        { text: 'Attach dated, labeled radiographs, intraoral photos and perio charting that support the service' },
        { text: 'Include a narrative from the treating dentist explaining the clinical reason in plain terms' },
        { text: 'Send only the records needed and follow minimum necessary practices for PHI' },
      ],
    },
    {
      title: 'Submit and track',
      items: [
        { text: 'Submit through the carrier\'s required channel (portal, clearinghouse attachment or mail) and keep proof' },
        { text: 'Log the appeal with date sent, level, method and follow-up date' },
        { text: 'Follow up if no response arrives within the carrier\'s stated time frame' },
        { text: 'Escalate to the next appeal level before its deadline if the denial is upheld' },
        { text: 'Consider a complaint to the state insurance department when a fully insured plan does not follow its own rules' },
      ],
    },
    {
      title: 'Close the loop',
      items: [
        { text: 'Post the appeal outcome and any payment correctly' },
        { text: 'Record the denial reason, root cause and outcome in a denial log by carrier' },
        { text: 'Share recurring causes with the front desk, hygienists and dentists' },
        { text: 'Update the verification form or attachment checklist so the same denial is prevented next time' },
        { text: 'Review overturn rates by carrier and reason to decide where appeals pay off' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Should I send a corrected claim or an appeal for a dental denial?',
      a: 'Send a corrected claim when the denial came from an error on your claim, and an appeal when you believe the carrier decided incorrectly. Fixing a wrong tooth number, surface or subscriber ID is usually faster than appealing. Appealing an error you could have corrected often just leads to another denial, so read the reason first.',
    },
    {
      q: 'How long do I have to appeal a dental claim denial?',
      a: 'Appeal deadlines depend on the dental carrier, the plan type and the appeal level, and they are set in the provider manual, the participation agreement or state rules for Medicaid dental. Some windows are short. Log the deadline as soon as the denial posts so the appeal is not lost to the calendar.',
    },
    {
      q: 'What makes a dental appeal letter effective?',
      a: 'An effective dental appeal letter is short, specific and tied to evidence. It names the claim, states the outcome you want, explains why the decision conflicts with the plan\'s own criteria and points to the attached x-rays, photos, perio charts and narrative that prove it. Generic letters without supporting records are much easier for carriers to uphold.',
    },
    {
      q: 'Can I appeal a frequency limitation denial?',
      a: 'You can appeal when the carrier\'s frequency history is wrong or when the plan allows exceptions, for example when the earlier service was never done or a clinical condition supports more frequent care. If the plan simply does not cover the extra service, an appeal rarely succeeds, and the patient balance depends on your contract and the patient\'s signed estimate.',
    },
  ],
  sources: [
    { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
    { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
    { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
    { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  ],
  relatedServices: ['denial-management', 'dental-accounts-receivable', 'dental-claims-processing', 'payment-posting'],
  relatedTools: ['dental-denial-rate-calculator', 'eob-explained', 'claim-submission-checklist', 'dental-ar-aging-calculator'],
  seoTitle: 'Dental Denial Appeal Checklist: Corrected Claim or Appeal',
  metaDescription:
    'Step-by-step dental denial appeal checklist: read reason codes, choose a corrected claim or appeal, attach x-rays and narratives, track deadlines.',
  keywords: [
    'dental denial appeal checklist',
    'dental claim appeal process',
    'dental insurance appeal letter',
    'frequency limitation denial',
    'corrected dental claim vs appeal',
    'dental denial management steps',
  ],
};

export default tool;
