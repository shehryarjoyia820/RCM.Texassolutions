import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'guide',
  slug: 'era-explained',
  name: '835 ERA Explained',
  category: 'reference',
  icon: 'FileCode2',
  summary: 'A plain-English tour of the 835 electronic remittance file, segment by segment, for staff who post payments and work denials.',
  definition:
    'An ERA (electronic remittance advice) is the X12 835 file a payer sends to explain a payment. It is organized in levels: payment and payee details at the top, then each claim (CLP) with its adjustments (CAS) and service lines (SVC), and finally provider-level adjustments (PLB) such as recoupments or interest that affect the total.',
  entries: [
    { term: 'ISA / GS / ST (envelopes)', meaning: 'Technical wrappers that identify the sender, receiver, file date and transaction type. Staff rarely read them, but they matter when a clearinghouse reports a file problem.', tag: 'Header' },
    { term: 'BPR (financial information)', meaning: 'The payment summary: total amount paid, whether it was sent by check, ACH or as a non-payment (zero-pay) remittance, and the payment date. The total should match the deposit after any PLB adjustments.', tag: 'Header' },
    { term: 'TRN (reassociation trace number)', meaning: 'The check or EFT trace number. It is the key that links the ERA to the bank deposit, so use it to match and reconcile payments.', tag: 'Header' },
    { term: 'DTM*405 (production date)', meaning: 'The date the payer produced the remittance. Useful when tracking down a missing or duplicate ERA.', tag: 'Header' },
    { term: 'N1*PR (payer identification)', meaning: 'The payer name and identifiers, often followed by address (N3, N4) and contact (PER) segments with a phone number or website for questions.', tag: 'Payer and payee' },
    { term: 'N1*PE (payee identification)', meaning: 'The provider or group that received the payment, usually identified by NPI or tax ID. If this does not match your billing entity, the payment may be posted to the wrong account.', tag: 'Payer and payee' },
    { term: 'LX (header number)', meaning: 'A grouping marker that separates sets of claims within the file, sometimes by provider or bill type. It carries no payment data on its own.', tag: 'Claim level' },
    { term: 'CLP (claim payment information)', meaning: 'One per claim: your patient account number, a status code (for example 1 processed as primary, 2 as secondary, 4 denied, 22 reversal of a prior payment), total charge, amount paid, patient responsibility and the payer claim number.', tag: 'Claim level' },
    { term: 'CAS (claim adjustment)', meaning: 'Explains why paid differs from billed. Each CAS has a group code (CO, PR, OA, PI), a reason code (CARC) and an amount. It can appear at the claim level or on a service line.', tag: 'Claim level' },
    { term: 'NM1 (patient, insured and provider names)', meaning: 'Names and IDs tied to the claim, such as the patient (QC), insured (IL), a corrected name (74) and the rendering provider (82). A corrected-name segment means the payer changed what you sent, so update registration.', tag: 'Claim level' },
    { term: 'MIA / MOA (adjudication information)', meaning: 'Inpatient (MIA) or outpatient (MOA) detail, most often used to carry claim-level remark codes (RARCs) that explain the outcome.', tag: 'Claim level' },
    { term: 'DTM at claim level (dates)', meaning: 'Claim dates such as the statement period start and end or the date the payer received the claim. Received date helps when disputing timely filing.', tag: 'Claim level' },
    { term: 'AMT at claim level (supplemental amounts)', meaning: 'Extra amounts for the claim, such as coverage amount or interest. Interest paid for late payment may appear here.', tag: 'Claim level' },
    { term: 'SVC (service payment information)', meaning: 'One per service line: the procedure code and modifiers as adjudicated, line charge, line payment, revenue code for facilities and units paid. If the payer changed your code, the original appears as a second composite.', tag: 'Service line' },
    { term: 'DTM*472 (service date)', meaning: 'The date of service for the line. Used with the procedure code to match each line to the charge in your system.', tag: 'Service line' },
    { term: 'REF*6R (line item control number)', meaning: 'The line identifier you sent on the claim, echoed back so auto-posting can match the line exactly.', tag: 'Service line' },
    { term: 'AMT*B6 (allowed amount)', meaning: 'The allowed amount for the line. Compare it with your contracted rate to find underpayments.', tag: 'Service line' },
    { term: 'LQ*HE (remark codes)', meaning: 'Line-level remittance advice remark codes (RARCs) that add detail to the CAS reason, such as what information is missing.', tag: 'Service line' },
    { term: 'PLB (provider level adjustment)', meaning: 'Adjustments not tied to one claim, such as overpayment recoupments, forwarding balances, interest or other offsets. PLB amounts explain why the BPR total is lower or higher than the sum of the claims.', tag: 'Provider level' },
    { term: 'SE / GE / IEA (trailers)', meaning: 'Closing segments that confirm segment and transaction counts. A mismatch signals a damaged or incomplete file.', tag: 'Trailer' },
  ],
  faqs: [
    {
      q: 'Why does the ERA total not match the sum of the claims?',
      a: 'The ERA total usually differs from the claim sum because of provider-level adjustments in the PLB segment. Payers use PLB for recoupments of earlier overpayments, interest, forwarding balances and other offsets that are not tied to a single claim. Post PLB amounts separately so each claim balance and the bank deposit both reconcile.',
    },
    {
      q: 'How do I match an ERA to a bank deposit?',
      a: 'You match an ERA to a deposit using the trace number in the TRN segment, which is the same number the payer sends with the EFT. Many banks show it in the deposit addenda. The amount in the BPR segment should equal the deposit. Mismatches often come from a split payment or a missing ERA.',
    },
    {
      q: 'What does a claim status of 22 mean in the CLP segment?',
      a: 'A CLP status of 22 means the payer is reversing a previous payment on that claim. It usually appears with negative amounts and is often followed by a new CLP that reprocesses the claim. Post the reversal and the new adjudication together so the claim balance and payment history stay accurate.',
    },
    {
      q: 'Do I need to read raw 835 files?',
      a: 'Usually no, because practice management systems and clearinghouses turn 835 files into readable remittance reports. Knowing the segments still helps when auto-posting fails, when a payment looks wrong or when you work with payer EDI support. Staff who understand CLP, CAS, SVC and PLB can find problems much faster.',
    },
    {
      q: 'How do I start receiving ERAs from a payer?',
      a: 'You enroll for ERA with each payer, usually through your clearinghouse or the payer enrollment portal, and many payers handle EFT enrollment separately. For Medicare, ERA enrollment goes through your MAC. Enrollment links the ERA to your NPI and tax ID, so it may need updating when either changes.',
    },
  ],
  sources: [
    { label: 'CMS: Health care payment and remittance advice', url: 'https://www.cms.gov/medicare/coding-billing/electronic-billing/health-care-payment-remittance-advice' },
    { label: 'X12: Claim Adjustment Reason Codes', url: 'https://x12.org/codes/claim-adjustment-reason-codes' },
    { label: 'X12: Remittance Advice Remark Codes', url: 'https://x12.org/codes/remittance-advice-remark-codes' },
  ],
  relatedServices: ['era-processing', 'payment-posting', 'payment-reconciliation', 'underpayment-identification'],
  relatedTools: ['eob-explained', 'denial-reasons-guide', 'medical-billing-acronyms', 'payment-variance-calculator'],
  seoTitle: '835 ERA Explained: Segments in Plain English',
  metaDescription:
    'Understand the 835 ERA file: BPR, TRN, CLP, CAS, SVC and PLB segments explained in plain English for payment posting and denial follow-up staff.',
  keywords: [
    '835 era explained',
    'electronic remittance advice',
    '835 segments',
    'clp cas svc plb',
    'era payment posting',
    'how to read an 835',
  ],
};

export default tool;
