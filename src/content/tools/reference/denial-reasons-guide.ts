import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'glossary',
  slug: 'denial-reasons-guide',
  name: 'Denial Reason Codes Guide (CARC)',
  category: 'reference',
  icon: 'ShieldAlert',
  summary: 'Common Claim Adjustment Reason Codes explained in plain English, with the usual cause and a practical fix for each.',
  definition:
    'Claim Adjustment Reason Codes (CARCs) are standard codes payers put on remittances to explain why a claim or service line was paid differently from what was billed. Each CARC is paired with a group code (CO, PR, OA or PI) that shows who carries the amount, and often with a remark code (RARC) that adds detail.',
  entries: [
    // Group codes
    { term: 'CO (Contractual Obligation)', meaning: 'The adjustment is the provider responsibility under the contract or regulation, so you generally cannot bill it to the patient. Fix: if it is a denial rather than a normal fee schedule write-down, correct or appeal the claim instead of writing it off.', tag: 'Group code' },
    { term: 'PR (Patient Responsibility)', meaning: 'The amount is the patient share, such as deductible, coinsurance, copay or a non-covered service the patient agreed to pay. Fix: post it to the patient balance and send a statement, or bill a secondary plan first.', tag: 'Group code' },
    { term: 'OA (Other Adjustment)', meaning: 'Used when neither CO nor PR applies, often for balancing amounts or adjustments tied to a prior payer. Fix: read the paired reason code to decide whether action is needed.', tag: 'Group code' },
    { term: 'PI (Payer Initiated Reduction)', meaning: 'The payer reduced the payment on its own judgment, and the amount is not assigned to the patient. Fix: compare to your contract and appeal if the reduction is not supported.', tag: 'Group code' },
    { term: 'CR (Corrections and Reversals)', meaning: 'An older group code once used for reversals and corrections of prior claims. It has been retired from current use, but you may still see it in historical remittances.', tag: 'Group code' },
    // Patient cost sharing
    { term: 'CARC 1', meaning: 'Part of the allowed amount was applied to the patient deductible. Fix: no appeal needed; bill the patient or the secondary plan.', tag: 'Patient share' },
    { term: 'CARC 2', meaning: 'Part of the allowed amount is the patient coinsurance percentage. Fix: bill the patient or the secondary plan.', tag: 'Patient share' },
    { term: 'CARC 3', meaning: 'Part of the allowed amount is the patient copay. Fix: collect at check-in going forward and bill any remaining copay to the patient.', tag: 'Patient share' },
    // Coding
    { term: 'CARC 4', meaning: 'The modifier billed does not fit the procedure code, or a required modifier is missing. Fix: review the payer modifier rules and the documentation, then send a corrected claim.', tag: 'Coding' },
    { term: 'CARC 5', meaning: 'The procedure code or bill type does not fit the place of service reported. Fix: confirm where the service happened and correct the place of service or code.', tag: 'Coding' },
    { term: 'CARC 11', meaning: 'The diagnosis billed does not match or support the procedure. Fix: check the diagnosis pointers and coding; correct the claim if the documentation supports a different diagnosis.', tag: 'Coding' },
    { term: 'CARC 59', meaning: 'Payment was reduced under multiple or concurrent procedure rules. Fix: confirm the procedures were ranked and modified correctly; appeal only if the reduction was applied wrongly.', tag: 'Coding' },
    { term: 'CARC 97', meaning: 'The payer considers this service included in another service it already paid (bundled). Fix: review NCCI and payer edits; if the service was separate and distinct, add the proper modifier with supporting documentation.', tag: 'Coding' },
    { term: 'CARC 181', meaning: 'The procedure code was not valid on the date of service. Fix: use the code set in effect for that date and resubmit.', tag: 'Coding' },
    { term: 'CARC 236', meaning: 'This procedure, or combination of procedures, is not allowed with another service on the same day under NCCI or similar rules. Fix: check the edit pair and modifier indicator before deciding to correct or appeal.', tag: 'Coding' },
    // Information and documentation
    { term: 'CARC 16', meaning: 'The claim is missing information or has a billing error that kept it from being processed. Fix: read the remark codes (RARCs) to find what is missing, correct it and resubmit as a new or corrected claim.', tag: 'Information' },
    { term: 'CARC 252', meaning: 'The payer needs an attachment or other documentation to decide the claim. Fix: send the requested records using the payer attachment process and reference the claim number.', tag: 'Information' },
    { term: 'CARC 151', meaning: 'The payer believes the records do not support the number or frequency of services billed. Fix: review documentation and units, then appeal with records if the services were supported.', tag: 'Information' },
    // Duplicate and timing
    { term: 'CARC 18', meaning: 'The payer sees this as a duplicate of a claim or service already received. Fix: check claim status before resubmitting; if it was a corrected claim, use the right frequency code and original claim number.', tag: 'Duplicate and timing' },
    { term: 'CARC 29', meaning: 'The claim arrived after the payer filing deadline. Fix: appeal only with proof of timely submission, such as clearinghouse acceptance reports; otherwise the amount is usually a provider write-off.', tag: 'Duplicate and timing' },
    // Eligibility and coverage
    { term: 'CARC 27', meaning: 'The service was provided after the patient coverage ended. Fix: verify eligibility for the date of service, look for new coverage and bill the correct payer or the patient.', tag: 'Eligibility' },
    { term: 'CARC 26', meaning: 'The service was provided before the patient coverage started. Fix: confirm the effective date and bill the plan that was active on the date of service.', tag: 'Eligibility' },
    { term: 'CARC 31', meaning: 'The payer cannot identify the patient as its member. Fix: check the member ID, name spelling and date of birth against the insurance card and eligibility response.', tag: 'Eligibility' },
    { term: 'CARC 109', meaning: 'This payer or contractor is not responsible for the claim. Fix: send the claim to the correct payer, such as the Medicare Advantage plan, the right MAC or the Medicaid MCO.', tag: 'Eligibility' },
    { term: 'CARC 22', meaning: 'The payer believes another plan should pay first under coordination of benefits. Fix: update the COB information with the patient and plan, then bill the primary payer.', tag: 'Eligibility' },
    { term: 'CARC 23', meaning: 'The payment reflects what a prior payer already paid or adjusted. Fix: usually informational on secondary claims; check that the primary remittance was sent correctly.', tag: 'Eligibility' },
    { term: 'CARC 24', meaning: 'The charges are covered under a capitation or managed care arrangement. Fix: confirm the patient assignment; no separate fee-for-service payment is expected if the capitation applies.', tag: 'Eligibility' },
    { term: 'CARC 200', meaning: 'The service fell during a lapse in the patient coverage. Fix: confirm coverage dates and bill the patient or another payer as appropriate.', tag: 'Eligibility' },
    // Coverage and necessity
    { term: 'CARC 50', meaning: 'The payer does not consider the service medically necessary. Fix: check coverage policies (such as LCDs), the diagnosis and the documentation, then appeal with records or bill the patient only if a valid waiver was signed.', tag: 'Coverage' },
    { term: 'CARC 96', meaning: 'The charge is not covered. A remark code usually explains why. Fix: read the RARC, confirm benefits, and bill the patient only if your contract and any required notice allow it.', tag: 'Coverage' },
    { term: 'CARC 119', meaning: 'The patient reached the plan benefit maximum for the period or occurrence. Fix: confirm the count with the payer and bill a secondary plan or the patient where allowed.', tag: 'Coverage' },
    { term: 'CARC 167', meaning: 'The diagnosis reported is not covered for this service. Fix: review coverage policy and coding; correct the claim if a more accurate covered diagnosis is documented.', tag: 'Coverage' },
    { term: 'CARC 204', meaning: 'The service, equipment or drug is not covered under the patient current benefit plan. Fix: verify benefits before service in future and bill the patient if they agreed in writing.', tag: 'Coverage' },
    // Authorization and network
    { term: 'CARC 197', meaning: 'Required precertification, authorization or notification was not obtained. Fix: check whether an authorization exists and was linked to the claim; if not, ask about retro-authorization or appeal.', tag: 'Authorization' },
    { term: 'CARC 288', meaning: 'A required referral was not on file. Fix: obtain the referral from the primary care provider if the plan allows it after the fact, then resubmit or appeal.', tag: 'Authorization' },
    { term: 'CARC 242', meaning: 'The services were not provided by a network or primary care provider as the plan requires. Fix: confirm network status and the patient plan type; appeal if you are in network or an exception applies.', tag: 'Authorization' },
    // Payment amount
    { term: 'CARC 45', meaning: 'The billed charge is above the fee schedule or contracted maximum, so the difference is adjusted. Fix: none if the allowed amount matches your contract; investigate if the allowed amount looks low.', tag: 'Payment amount' },
    { term: 'CARC 253', meaning: 'Medicare payment was reduced for sequestration, a federal budget cut applied to most Medicare payments. Fix: post as a contractual adjustment; it is not billable to the patient.', tag: 'Payment amount' },
  ],
  faqs: [
    {
      q: 'What is the difference between a CARC and a RARC?',
      a: 'A CARC states the reason a claim or line was adjusted, and a RARC (Remittance Advice Remark Code) adds detail that explains the CARC. For example, CARC 16 says information is missing, and an attached RARC names the missing item. Always read both before deciding whether to correct, resubmit or appeal.',
    },
    {
      q: 'Can I bill the patient for a CO adjustment?',
      a: 'Generally no, a CO group code means the amount is the provider responsibility under the contract or regulation, so it should not move to the patient balance. The exception is limited cases where a valid advance notice or waiver applies under the payer rules. When in doubt, check your contract before billing the patient.',
    },
    {
      q: 'Where can I find the official list of reason codes?',
      a: 'The official CARC and RARC lists are maintained by code committees and published by X12 on its website (x12.org). They are updated several times a year, and codes can be added, revised or deactivated. The descriptions in this guide are plain-English summaries, not the official wording.',
    },
    {
      q: 'Which denial codes are most preventable?',
      a: 'Denials tied to eligibility, missing information, authorization and duplicates, such as CARC 27, 16, 197 and 18, are usually the most preventable. They come from front-end and claim-entry steps that can be checked before submission. Tracking denials by code and root cause shows where to add verification or claim edits.',
    },
    {
      q: 'Should every denial be appealed?',
      a: 'No, many denials are fixed faster with a corrected claim than with an appeal. Appeals fit when the payer applied a rule incorrectly or did not consider documentation. Patient cost sharing codes (1, 2, 3) need no appeal. Check payer deadlines, because appeal and corrected claim windows are often shorter than the original filing limit.',
    },
  ],
  sources: [
    { label: 'X12: Claim Adjustment Reason Codes (official list)', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
    { label: 'X12: Remittance Advice Remark Codes (official list)', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
    { label: 'X12: Claim Adjustment Group Codes', url: 'https://x12.org/codes/claim-adjustment-group-codes' },
  ],
  relatedServices: ['denial-management', 'denial-appeals', 'payment-posting', 'era-processing', 'claims-scrubbing'],
  relatedTools: ['denial-appeal-checklist', 'denial-rate-calculator', 'era-explained', 'eob-explained'],
  seoTitle: 'Denial Reason Codes (CARC) Explained With Fixes',
  metaDescription:
    'Common CARC denial codes like 16, 18, 29, 50, 97 and 197 explained in plain English, with group codes CO, PR, OA and PI and a practical fix for each.',
  keywords: [
    'denial reason codes',
    'carc codes list',
    'claim adjustment reason codes',
    'co 16 denial',
    'co 97 denial',
    'pr 1 deductible',
    'rarc codes',
  ],
};

export default tool;
