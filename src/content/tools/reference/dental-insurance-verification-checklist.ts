import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'dental-insurance-verification-checklist',
  name: 'Dental Insurance Verification Form and Checklist',
  category: 'checklist',
  icon: 'Smile',
  summary: 'A printable dental insurance verification form and checklist covering what to confirm with a dental plan before the appointment: eligibility, maximums, frequencies, waiting periods, downgrades and more.',
  definition:
    'A dental insurance verification checklist lists the plan details a dental office confirms before treatment, such as active coverage, annual maximum remaining, deductibles, coverage percentages by category, frequency limits, waiting periods and plan clauses that can reduce payment. Verifying these in advance helps the office give accurate estimates and avoid denied claims.',
  sections: [
    {
      title: 'Patient and plan basics',
      items: [
        { text: 'Subscriber name, date of birth, member ID and relationship to the patient' },
        { text: 'Employer or group name and group number' },
        { text: 'Payer name, claims address or payer ID' },
        { text: 'Plan type (PPO, HMO/DHMO, indemnity, Medicaid dental, CHIP or a Medicare Advantage plan with dental benefits)' },
        { text: 'Effective date and confirmation that coverage is active for the appointment date' },
        { text: 'Whether the office is in network for this specific plan' },
        { text: 'Secondary dental coverage and which plan is primary' },
      ],
    },
    {
      title: 'Benefit amounts',
      items: [
        { text: 'Benefit year type (calendar year or plan year) and renewal date' },
        { text: 'Annual maximum and amount already used' },
        { text: 'Individual and family deductibles, amount met, and which categories the deductible applies to' },
        { text: 'Coverage percentage for preventive, basic and major services' },
        { text: 'Orthodontic coverage, lifetime maximum, age limit and payment schedule if relevant' },
      ],
    },
    {
      title: 'Limitations and clauses',
      items: [
        { text: 'Frequency limits for exams, cleanings, bitewings, full-mouth or panoramic images and fluoride' },
        { text: 'Last date of service for frequency-limited procedures', detail: 'Ask whether limits count by calendar year, benefit year or months since the last service.' },
        { text: 'Waiting periods for basic and major services' },
        { text: 'Missing tooth clause' },
        { text: 'Replacement limits for crowns, bridges and dentures (for example once every set number of years)' },
        { text: 'Alternate benefit (downgrade) rules such as posterior composite fillings paid at amalgam rates' },
        { text: 'Age limits for sealants and fluoride' },
      ],
    },
    {
      title: 'Treatment-specific checks',
      items: [
        { text: 'Whether pre-treatment estimates or prior authorization are required or recommended for planned work' },
        { text: 'Documentation the plan requires, such as X-rays, periodontal charting, photos or narratives' },
        { text: 'Rules for periodontal maintenance versus prophylaxis after scaling and root planing' },
        { text: 'Coverage for implants, sedation and nightguards when planned' },
        { text: 'Coverage, waiting periods and grafting rules for planned oral surgery such as surgical extractions' },
      ],
    },
    {
      title: 'Record and communicate',
      items: [
        { text: 'Record the representative name, call reference number or portal printout and date' },
        { text: 'Save the breakdown in the patient record' },
        { text: 'Prepare a treatment estimate showing insurance portion and patient portion' },
        { text: 'Explain to the patient that estimates are not a guarantee of payment' },
        { text: 'Re-verify before each new treatment phase and at the start of each benefit year' },
      ],
    },
  ],
  faqs: [
    {
      q: 'Can I print this as a dental insurance verification form?',
      a: 'Yes, you can print this checklist and use it as a dental insurance verification form or breakdown sheet for each patient. Tick each item as the carrier or portal confirms it, write the answers beside it, and file the completed sheet in the patient record. Many offices also copy the same fields into their dental software so the breakdown is visible at checkout.',
    },
    {
      q: 'How far ahead should dental insurance be verified?',
      a: 'Dental insurance is best verified a few business days before the appointment, which leaves time to resolve problems and contact the patient. Re-check on the day of service for new patients or when coverage may have changed, such as at a new benefit year, after a job change or before starting a major treatment plan.',
    },
    {
      q: 'Why are frequency limits so important in dental billing?',
      a: 'Frequency limits are important because a service done too soon after the last one is usually denied and becomes the patient responsibility. Cleanings, exams, bitewings and fluoride often have strict intervals. Knowing the last date of service, including at a previous office, helps you schedule correctly and set patient expectations.',
    },
    {
      q: 'What is a downgrade in dental insurance?',
      a: 'A downgrade, or alternate benefit, is when the plan pays a procedure at the rate of a less costly alternative it considers acceptable. A common example is paying a posterior composite filling at the amalgam rate. The patient may owe the difference, depending on the plan and your network agreement.',
    },
    {
      q: 'Is a pre-treatment estimate a guarantee of payment?',
      a: 'No, a pre-treatment estimate shows what the plan expects to pay based on information at that time, but it is not a guarantee. Payment can change if eligibility ends, the annual maximum is used by other claims, frequency limits are reached or the final procedure differs from what was submitted.',
    },
  ],
  sources: [
    { label: 'American Dental Association: Dental benefits and coding resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
  ],
  relatedServices: ['dental-billing', 'insurance-eligibility-verification', 'benefits-verification', 'patient-financial-communication'],
  relatedTools: ['dental-insurance-collection-calculator', 'dental-denial-rate-calculator', 'patient-balance-calculator'],
  seoTitle: 'Dental Insurance Verification Form and Checklist',
  metaDescription:
    'Printable dental insurance verification form and checklist: eligibility, annual maximum, deductibles, coverage tiers, frequency limits and waiting periods.',
  keywords: [
    'dental insurance verification checklist',
    'dental eligibility verification',
    'dental benefits breakdown',
    'dental frequency limitations',
    'dental insurance verification form',
    'dental insurance verification sheet',
    'dental insurance verification forms',
    'printable dental insurance verification form',
    'dental insurance breakdown form',
    'dental pre-treatment estimate',
  ],
};

export default tool;
