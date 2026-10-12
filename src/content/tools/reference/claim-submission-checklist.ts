import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'claim-submission-checklist',
  name: 'Claim Submission Checklist',
  category: 'checklist',
  icon: 'ListChecks',
  summary: 'Pre-submission checks for patient data, coding, provider details and payer rules to help claims go out clean the first time.',
  definition:
    'A claim submission checklist is a set of checks billing staff run before sending a claim to a clearinghouse or payer. It confirms patient and insurance data, provider identifiers, codes, modifiers, authorizations and payer-specific rules, then tracks acknowledgments, with the aim of reducing rejections and avoidable denials.',
  sections: [
    {
      title: 'Patient and insurance',
      items: [
        { text: 'Patient name, date of birth and sex match the insurance card and eligibility response' },
        { text: 'Member ID, group number and payer ID are correct for the plan', detail: 'Medicare Advantage and Medicaid managed care plans have their own payer IDs.' },
        { text: 'Coverage was active on the date of service' },
        { text: 'Primary and secondary order is confirmed under coordination of benefits' },
        { text: 'Subscriber and relationship to patient are correct' },
        { text: 'Accident, injury or workers compensation details are filled in when relevant' },
      ],
    },
    {
      title: 'Provider and practice details',
      items: [
        { text: 'Billing provider NPI, tax ID and address match payer enrollment' },
        { text: 'Rendering provider NPI and taxonomy are correct and the provider is enrolled with the payer' },
        { text: 'Referring or ordering provider is listed when the service requires it' },
        { text: 'Service facility location is listed when different from the billing address' },
        { text: 'Place of service code matches where the service was actually provided' },
      ],
    },
    {
      title: 'Coding and charges',
      items: [
        { text: 'Procedure codes are valid for the date of service' },
        { text: 'Diagnosis codes are coded to the highest specificity and valid for the date of service' },
        { text: 'Each line points to the diagnosis that supports it' },
        { text: 'Modifiers are present and correct (for example laterality, distinct service, telehealth)' },
        { text: 'Units and drug NDC details are correct where required' },
        { text: 'No NCCI edit or payer bundling conflict is left unresolved' },
        { text: 'Charges match the practice fee schedule' },
        { text: 'Documentation is signed and supports every billed service' },
      ],
    },
    {
      title: 'Payer rules',
      items: [
        { text: 'Prior authorization or referral number is on the claim when required' },
        { text: 'Claim is within the payer timely filing limit' },
        { text: 'Payer-specific requirements are met, such as attachments or claim notes' },
        { text: 'For corrected claims, the frequency code and original claim number are included' },
        { text: 'An ABN or financial waiver is on file and the right modifier is used when coverage is uncertain' },
      ],
    },
    {
      title: 'After submission',
      items: [
        { text: 'Review the clearinghouse acceptance report the same or next business day' },
        { text: 'Fix and resubmit rejected claims promptly', detail: 'A rejected claim was never received for processing, so the filing clock keeps running.' },
        { text: 'Check the payer 277CA acknowledgment for front-end rejections' },
        { text: 'Save acknowledgment reports as proof of timely filing' },
        { text: 'Follow up on claims with no response after the payer normal processing time' },
        { text: 'Track rejection reasons to fix recurring front-end and charge entry errors' },
      ],
    },
  ],
  faqs: [
    {
      q: 'What is a clean claim?',
      a: 'A clean claim is one that has no errors or missing information and can be processed without the payer asking for more detail. Clean claims usually move faster, because rejections and pended requests add days or weeks. Prompt payment laws and many payer contracts define clean claims more precisely, so check those definitions too.',
    },
    {
      q: 'What causes most claim rejections?',
      a: 'Most rejections come from data errors such as wrong member IDs, mismatched patient names or birth dates, invalid or missing codes, incorrect payer IDs and provider identifiers that do not match enrollment. These are usually caught by clearinghouse edits and fixed quickly, but they delay payment and can push claims past the filing limit.',
    },
    {
      q: 'How soon should claims be submitted?',
      a: 'Claims should be submitted as soon as charges are complete and coded, ideally within a few days of service. Fast submission shortens days in AR and leaves time to fix rejections before filing limits run out. Track charge lag, the time from service to charge entry, to spot delays.',
    },
    {
      q: 'Should I resubmit a claim if I have not heard back?',
      a: 'No, do not resubmit without first checking claim status, because a duplicate claim is likely to be denied and can slow the original. Use a 276/277 status inquiry, the payer portal or a call. Resubmit only if the payer confirms it has no record of the claim, and keep proof of the first submission.',
    },
  ],
  sources: [
    { label: 'CMS: Medicare Claims Processing Manual', url: 'https://www.cms.gov/regulations-and-guidance/guidance/manuals/internet-only-manuals-ioms-items/cms018912' },
    { label: 'NUCC: 1500 claim form reference instruction manual', url: 'https://www.nucc.org/index.php/1500-claim-form-mainmenu-35/1500-instructions-mainmenu-42' },
  ],
  relatedServices: ['claims-submission', 'claims-scrubbing', 'charge-entry', 'electronic-claims-processing', 'clearinghouse-coordination'],
  relatedTools: ['clean-claim-rate-calculator', 'first-pass-acceptance-rate-calculator', 'claim-status-categories', 'denial-reasons-guide'],
  seoTitle: 'Claim Submission Checklist: Send Clean Claims',
  metaDescription:
    'Pre-submission claim checklist covering patient and insurance data, provider IDs, coding, modifiers, payer rules and acknowledgment follow-up.',
  keywords: [
    'claim submission checklist',
    'clean claim checklist',
    'medical claim errors',
    'claim rejection prevention',
    'cms 1500 checklist',
    'claim scrubbing steps',
  ],
};

export default tool;
