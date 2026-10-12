import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'claim-submission-checklist',
  name: 'Dental Claim Submission Checklist',
  category: 'checklist',
  icon: 'ListChecks',
  summary: 'Pre-submission checks for patient and subscriber data, CDT codes, attachments, provider details and carrier rules to help dental claims go out clean.',
  definition:
    'A dental claim submission checklist is a set of checks the billing team runs before sending a claim on the ADA Dental Claim Form or as an 837D through the clearinghouse. It confirms subscriber and coverage data, dentist identifiers, CDT codes with tooth and surface detail, attachments and carrier rules, then tracks acknowledgments to reduce rejections and avoidable denials.',
  sections: [
    {
      title: 'Patient, subscriber and coverage',
      items: [
        { text: 'Patient name, date of birth and relationship to subscriber match the carrier\'s records' },
        { text: 'Subscriber ID, group number and carrier payer ID are correct for the plan', detail: 'Some dental plans are administered by a different company than the one on the card, with its own payer ID.' },
        { text: 'Coverage was active on the date of service and no waiting period applies' },
        { text: 'Frequency history allows the service on this date' },
        { text: 'Primary and secondary order is confirmed under coordination of benefits, with other coverage listed' },
        { text: 'For secondary claims, the primary carrier\'s EOB is attached' },
      ],
    },
    {
      title: 'Dentist and practice details',
      items: [
        { text: 'Billing NPI, tax ID and address match the carrier\'s enrollment record' },
        { text: 'Treating dentist NPI, license number and taxonomy are correct and the dentist is credentialed with the carrier' },
        { text: 'Service location is listed when different from the billing address' },
        { text: 'Place of treatment is correct (office, hospital or other facility)' },
      ],
    },
    {
      title: 'CDT codes and documentation',
      items: [
        { text: 'CDT codes are valid for the date of service under the current year\'s code set' },
        { text: 'Tooth numbers or letters, surfaces, quadrants or arches are entered where the code requires them' },
        { text: 'Diagnosis codes are included when the carrier or the procedure requires them' },
        { text: 'Initial or replacement and prior placement dates are entered for crowns, bridges and dentures' },
        { text: 'Fees match the office fee schedule' },
        { text: 'Clinical notes are complete and signed and support every billed procedure' },
        { text: 'Required attachments are ready: radiographs, intraoral photos, perio charting or a narrative', detail: 'Crowns, buildups, scaling and root planing, surgical extractions and implants commonly need them.' },
      ],
    },
    {
      title: 'Carrier rules',
      items: [
        { text: 'Pre-treatment estimate or prior approval number is on the claim when the carrier requires one' },
        { text: 'Claim is within the carrier\'s timely filing limit' },
        { text: 'Attachments are sent the way the carrier wants (clearinghouse attachment, portal upload or mail)' },
        { text: 'For corrected claims, the original claim number and the carrier\'s correction method are used' },
        { text: 'Narrative states the clinical reason in plain words, such as fractured cusp or pocket depths by quadrant' },
      ],
    },
    {
      title: 'After submission',
      items: [
        { text: 'Review the clearinghouse acceptance report the same or next business day' },
        { text: 'Fix and resubmit rejected claims promptly', detail: 'A rejected claim was never received for processing, so the filing clock keeps running.' },
        { text: 'Check carrier acknowledgments for front-end rejections' },
        { text: 'Save acknowledgment reports as proof of timely filing' },
        { text: 'Check status on claims with no response after the carrier\'s normal processing time' },
        { text: 'Track rejection and pend reasons to fix recurring front desk and charting gaps' },
      ],
    },
  ],
  faqs: [
    {
      q: 'What is a clean dental claim?',
      a: 'A clean dental claim has no errors or missing information and can be processed without the carrier asking for more detail, such as x-rays or a narrative. Clean claims usually move faster, because rejections and requests for records add days or weeks. State prompt payment laws and carrier contracts may define clean claims more precisely.',
    },
    {
      q: 'What causes most dental claim rejections?',
      a: 'Most rejections come from data errors such as wrong subscriber IDs, mismatched patient names or birth dates, missing tooth numbers or surfaces, outdated CDT codes, incorrect payer IDs and dentist identifiers that do not match enrollment. Clearinghouse edits usually catch them, but they delay payment and can push claims toward the filing limit.',
    },
    {
      q: 'How soon should dental claims be submitted?',
      a: 'Dental claims should be submitted as soon as procedures are completed and notes are signed, ideally the same day or within a day or two. Fast submission shortens days in A/R and leaves time to fix rejections before filing limits run out. Track the gap between the appointment and the claim date to spot delays.',
    },
    {
      q: 'Should I resubmit a dental claim if I have not heard back?',
      a: 'No, check claim status first, because a duplicate claim is likely to be denied and can slow the original. Use the carrier portal, an electronic status inquiry or a call. Resubmit only if the carrier confirms it has no record of the claim, and keep proof of the first submission.',
    },
  ],
  sources: [
    { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
    { label: 'ADA: CDT Code on Dental Procedures and Nomenclature', url: 'https://www.ada.org/publications/cdt' },
    { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
    { label: 'eCFR: 45 CFR 162.1102, Standards for health care claims (includes the dental 837)', url: 'https://www.ecfr.gov/current/title-45/subtitle-A/subchapter-C/part-162/subpart-K/section-162.1102' },
  ],
  relatedServices: ['dental-claims-processing', 'dental-insurance-verification', 'denial-management', 'dental-billing'],
  relatedTools: ['clean-claim-rate-calculator', 'dental-insurance-verification-checklist', 'dental-denial-rate-calculator', 'denial-appeal-checklist'],
  seoTitle: 'Dental Claim Submission Checklist: Send Clean Claims',
  metaDescription:
    'Pre-submission dental claim checklist covering subscriber data, dentist IDs, CDT codes, tooth and surface detail, attachments, carrier rules and follow-up.',
  keywords: [
    'dental claim submission checklist',
    'clean dental claim checklist',
    'ada claim form checklist',
    'dental claim rejection prevention',
    '837d claim checklist',
    'dental claim attachments',
  ],
};

export default tool;
