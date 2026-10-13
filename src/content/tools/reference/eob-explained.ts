import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'guide',
  slug: 'eob-explained',
  name: 'Dental Explanation of Benefits (EOB) Explained',
  category: 'reference',
  icon: 'FileText',
  summary: 'A field-by-field guide to reading a dental EOB, from submitted and allowed fees to PPO write-offs, annual maximums and patient responsibility.',
  definition:
    'A dental Explanation of Benefits (EOB) is the statement a dental carrier issues after processing a claim. It shows what the dentist submitted, what the plan allowed, the PPO write-off, any downgrade or limitation, how much the carrier paid and what the patient owes, along with codes that explain each adjustment. An EOB is not a bill.',
  entries: [
    { term: 'Subscriber and patient information', meaning: 'The subscriber name, member ID, group number and the patient who received treatment. Check these first: a mismatch can mean the claim was processed under the wrong person or plan.', tag: 'Header' },
    { term: 'Claim number', meaning: 'The carrier\'s reference number for this claim. Use it on every phone call, corrected claim and appeal about this claim.', tag: 'Header' },
    { term: 'Dentist information', meaning: 'The treating dentist or practice the carrier paid or considered, with network status. If it shows out of network when the dentist is credentialed, contact the carrier before posting.', tag: 'Header' },
    { term: 'Dates of service', meaning: 'The date of each procedure. Eligibility, waiting periods, frequency limits and the benefit year are all judged against these dates.', tag: 'Service line' },
    { term: 'Procedure code and tooth', meaning: 'The CDT code processed on each line, with tooth number, surfaces or quadrant. Compare it to what you billed to spot a downgrade or recoding by the carrier.', tag: 'Service line' },
    { term: 'Submitted fee', meaning: 'The fee the office submitted for each procedure, based on the practice\'s full fee schedule. It is the starting point, not what an in-network dentist expects to receive.', tag: 'Amounts' },
    { term: 'Allowed amount (maximum allowable fee)', meaning: 'The most the plan recognizes for the procedure under the PPO fee schedule or plan rules. Carrier payment and patient share add up to this amount for in-network treatment.', tag: 'Amounts' },
    { term: 'PPO write-off (contractual adjustment)', meaning: 'The difference between the submitted fee and the allowed amount that an in-network dentist agreed to write off. It is usually not billable to the patient.', tag: 'Amounts' },
    { term: 'Alternate benefit or downgrade', meaning: 'A note that the plan paid the procedure at the fee of a less costly alternative, such as a posterior composite paid at the amalgam fee. Whether the patient owes the difference depends on the plan and your contract.', tag: 'Amounts' },
    { term: 'Not covered or limitation amount', meaning: 'Fees the plan did not pay because of a frequency limit, waiting period, exclusion or missing information, with a reason code. Read the reason before billing the patient.', tag: 'Amounts' },
    { term: 'Deductible', meaning: 'The part of the allowed amount applied to the patient\'s annual deductible. Many dental plans waive the deductible for diagnostic and preventive care.', tag: 'Patient share' },
    { term: 'Coinsurance percentage', meaning: 'The share of the allowed amount the plan pays for the procedure category, often different for preventive, basic and major services. The patient owes the rest.', tag: 'Patient share' },
    { term: 'Copay', meaning: 'A fixed amount the patient owes per procedure, common on DHMO plans, which may already have been collected at the visit.', tag: 'Patient share' },
    { term: 'Paid amount (carrier payment)', meaning: 'What the carrier actually paid for each line. Compare it to your PPO fee schedule and the coinsurance percentage to catch underpayments.', tag: 'Amounts' },
    { term: 'Patient responsibility', meaning: 'The total the patient owes for the claim: deductible plus coinsurance plus copay plus any non-covered amount the patient is liable for. This is the figure to bill the patient or a secondary plan.', tag: 'Patient share' },
    { term: 'Other insurance paid', meaning: 'Amounts paid by another dental plan under coordination of benefits. It appears when this plan is secondary or when the carrier believes another plan is primary.', tag: 'Amounts' },
    { term: 'Adjustment reason and remark codes', meaning: 'Codes or notes that explain each adjustment or denial, such as a frequency limit, a missing x-ray or an annual maximum reached. They tell you whether to bill the patient, send records, correct the claim or appeal.', tag: 'Codes' },
    { term: 'Payment details', meaning: 'The check or EFT number, payment date and total paid. Use them to match the EOB to the bank deposit when posting.', tag: 'Payment' },
    { term: 'Annual maximum and deductible used', meaning: 'Year-to-date totals for the deductible and the annual maximum, and sometimes the orthodontic lifetime maximum. They help predict the patient\'s share on the next treatment plan.', tag: 'Plan totals' },
    { term: 'Appeal rights', meaning: 'Instructions and deadlines for asking the carrier to reconsider its decision. Note the deadline as soon as a denial is posted.', tag: 'Appeals' },
  ],
  faqs: [
    {
      q: 'Is a dental Explanation of Benefits a bill?',
      a: 'No, a dental EOB is not a bill; it explains how the carrier processed a claim and what the patient may owe. The bill comes from the dental office as a statement. Patients often call holding an EOB, so the front desk should be able to explain the allowed amount, write-off and patient share clearly.',
    },
    {
      q: 'What is the difference between a dental EOB and an ERA?',
      a: 'An EOB is a readable document, usually paper or PDF, while an ERA is the electronic X12 835 remittance a dental carrier sends to the practice. Both report the same results, but the ERA uses standard adjustment codes and can be posted automatically into Open Dental, Dentrix or Eaglesoft. Patients receive EOBs, not ERAs.',
    },
    {
      q: 'Why is the patient\'s share different from the treatment estimate?',
      a: 'The patient\'s share often differs because the carrier applied a downgrade, a frequency limit, a different deductible balance or a lower remaining annual maximum than expected. Other claims processed in the meantime also use up benefits. Comparing the EOB line by line with the estimate shows where the difference came from.',
    },
    {
      q: 'How do I spot an underpayment on a dental EOB?',
      a: 'Compare the allowed amount on each line with your PPO fee schedule for that CDT code, then check that the paid amount matches the plan\'s coinsurance percentage for the category. If the payment is lower and the reason codes do not explain it, such as a downgrade or maximum reached, the line may be underpaid and worth questioning.',
    },
  ],
  sources: [
    { label: 'ADA: Dental Insurance resources', url: 'https://www.ada.org/resources/practice/dental-insurance' },
    { label: 'ADA: Guidance on Coordination of Benefits', url: 'https://www.ada.org/resources/practice/dental-insurance/ada-guidance-on-coordination-of-benefits' },
    { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
  ],
  relatedServices: ['payment-posting', 'patient-billing', 'denial-management', 'dental-accounts-receivable'],
  relatedTools: ['denial-appeal-checklist', 'dental-insurance-collection-calculator', 'net-collection-rate-calculator', 'dental-insurance-verification-checklist'],
  seoTitle: 'Dental EOB Explained: How to Read It Line by Line',
  metaDescription:
    'Learn how to read a dental EOB: submitted vs allowed fee, PPO write-off, downgrades, deductible, coinsurance, annual maximum, carrier payment and patient share.',
  keywords: [
    'dental eob explained',
    'how to read a dental eob',
    'dental eob allowed amount',
    'dental eob patient responsibility',
    'dental eob vs era',
    'dental alternate benefit',
  ],
};

export default tool;
