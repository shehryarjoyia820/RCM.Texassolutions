import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'guide',
  slug: 'eob-explained',
  name: 'Explanation of Benefits (EOB) Explained',
  category: 'reference',
  icon: 'FileText',
  summary: 'A field-by-field guide to reading an Explanation of Benefits, from billed and allowed amounts to patient responsibility and remark codes.',
  definition:
    'An Explanation of Benefits (EOB) is the statement a health or dental plan issues after processing a claim. It shows what the provider billed, what the plan allowed, any contractual adjustment, how much the plan paid and what the patient owes, along with codes that explain each adjustment. An EOB is not a bill.',
  entries: [
    { term: 'Member and patient information', meaning: 'The subscriber name, member ID, group number and the patient who received care. Check these first: a mismatch can mean the claim was processed under the wrong person or plan.', tag: 'Header' },
    { term: 'Claim number', meaning: 'The payer reference number for this claim (often called the payer claim control number or ICN). Use it on every phone call, corrected claim and appeal about this claim.', tag: 'Header' },
    { term: 'Provider information', meaning: 'The provider or group the plan paid or considered, with network status. If it shows the wrong provider or out-of-network when you are contracted, contact the payer before posting.', tag: 'Header' },
    { term: 'Dates of service', meaning: 'The date or date range for each service line. Coverage, filing limits and benefit periods are all judged against these dates.', tag: 'Service line' },
    { term: 'Service or procedure code', meaning: 'The procedure, supply or dental code processed on each line, sometimes with a short description and modifiers. Compare it to what you billed to spot payer recoding.', tag: 'Service line' },
    { term: 'Billed amount', meaning: 'The charge the provider submitted for each service, based on the practice fee schedule. It is the starting point, not what the provider expects to receive from a contracted payer.', tag: 'Amounts' },
    { term: 'Allowed amount', meaning: 'The most the plan recognizes for the service under the contract or plan rules. Payer payment and patient cost sharing add up to this amount for in-network services.', tag: 'Amounts' },
    { term: 'Contractual adjustment (discount)', meaning: 'The difference between the billed amount and the allowed amount that an in-network provider agreed to write off. It is usually not billable to the patient.', tag: 'Amounts' },
    { term: 'Not covered or ineligible amount', meaning: 'Charges the plan did not cover, with a reason code. Whether the patient owes this depends on the reason and your contract, so read the code before billing.', tag: 'Amounts' },
    { term: 'Deductible', meaning: 'The part of the allowed amount applied to the patient annual deductible. The patient owes it, or a secondary plan may cover it.', tag: 'Patient share' },
    { term: 'Coinsurance', meaning: 'The patient percentage share of the allowed amount after the deductible, such as 20 percent.', tag: 'Patient share' },
    { term: 'Copay', meaning: 'A fixed amount the patient owes for the service, which may already have been collected at the visit.', tag: 'Patient share' },
    { term: 'Paid amount (plan payment)', meaning: 'What the plan actually paid for each line. Compare it to your contracted rate to catch underpayments.', tag: 'Amounts' },
    { term: 'Patient responsibility', meaning: 'The total the patient owes for the claim: deductible plus coinsurance plus copay plus any non-covered amount the patient is liable for. This is the figure to bill the patient or a secondary plan.', tag: 'Patient share' },
    { term: 'Other insurance paid', meaning: 'Amounts paid by another plan under coordination of benefits. It appears when this plan is secondary or when the payer believes another plan is primary.', tag: 'Amounts' },
    { term: 'Adjustment reason and remark codes', meaning: 'Codes or notes that explain each adjustment or denial, such as a deductible, a bundled service or missing information. They tell you whether to bill the patient, correct the claim or appeal.', tag: 'Codes' },
    { term: 'Payment details', meaning: 'The check or EFT number, payment date and total paid. Use them to match the EOB to the bank deposit when posting.', tag: 'Payment' },
    { term: 'Benefit accumulators', meaning: 'Year-to-date totals for the deductible and out-of-pocket maximum, and for dental plans the annual maximum used. They help predict the patient share on future visits.', tag: 'Plan totals' },
    { term: 'Appeal rights', meaning: 'Instructions and deadlines for asking the plan to reconsider its decision. Note the deadline as soon as a denial is posted.', tag: 'Appeals' },
  ],
  faqs: [
    {
      q: 'Is an Explanation of Benefits a bill?',
      a: 'No, an EOB is not a bill; it explains how the plan processed a claim and what the patient may owe. The patient bill comes from the provider as a statement. Practices often get calls from patients holding an EOB, so staff should be able to walk through allowed amount, adjustments and patient responsibility clearly.',
    },
    {
      q: 'What is the difference between an EOB and an ERA?',
      a: 'An EOB is a readable document, usually on paper or as a PDF, while an ERA is the electronic X12 835 remittance a payer sends to providers. Both report the same processing results, but the ERA uses standard codes and can be posted automatically. Patients receive EOBs, not ERAs.',
    },
    {
      q: 'Why is the patient responsibility different from the estimate?',
      a: 'Patient responsibility often differs from the estimate because the plan applied a different deductible balance, coded a service differently, denied part of the claim or processed it under different benefits. Other claims processed in the meantime also change the deductible. Comparing the EOB line by line with the estimate shows where the difference came from.',
    },
    {
      q: 'How do I spot an underpayment on an EOB?',
      a: 'You spot an underpayment by comparing the allowed amount on each line with the rate in your payer contract or fee schedule for that code and modifier. If the allowed amount is lower and the adjustment codes do not explain it, such as a multiple procedure reduction, the line may be underpaid and worth a payment dispute.',
    },
  ],
  sources: [
    { label: 'HealthCare.gov glossary: Allowed amount', url: 'https://www.healthcare.gov/glossary/allowed-amount/' },
  ],
  relatedServices: ['payment-posting', 'patient-billing', 'underpayment-identification', 'patient-financial-communication'],
  relatedTools: ['era-explained', 'denial-reasons-guide', 'patient-balance-calculator', 'payment-variance-calculator'],
  seoTitle: 'Explanation of Benefits (EOB) Explained Line by Line',
  metaDescription:
    'Learn how to read an Explanation of Benefits: billed vs allowed amount, contractual adjustment, deductible, coinsurance, paid amount and patient balance.',
  keywords: [
    'explanation of benefits explained',
    'how to read an eob',
    'eob allowed amount',
    'eob patient responsibility',
    'eob vs era',
    'eob codes',
  ],
};

export default tool;
