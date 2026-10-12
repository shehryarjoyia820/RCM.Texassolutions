import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'glossary',
  slug: 'claim-status-categories',
  name: 'Claim Status Category Codes (277)',
  category: 'reference',
  icon: 'ListTree',
  summary: 'What the claim status category codes on 277 and 277CA responses mean, grouped by family, with what to do next.',
  definition:
    'Claim status category codes are standard codes payers and clearinghouses return in X12 277 claim status responses and 277CA acknowledgments. The category tells you where a claim stands: acknowledged, pending, finalized, in error or waiting on more information. A separate claim status code adds the specific reason.',
  entries: [
    // Acknowledgement
    { term: 'A0', meaning: 'The claim was received and forwarded to another entity, such as another clearinghouse or payer. Next step: track it with the receiving entity.', tag: 'Acknowledgement' },
    { term: 'A1', meaning: 'The claim was received but has not yet been accepted into the payer processing system. Next step: allow processing time, then check status again.', tag: 'Acknowledgement' },
    { term: 'A2', meaning: 'The claim was accepted into the adjudication system. This means it passed intake edits, not that it will be paid. Next step: watch for a remittance or a pending status.', tag: 'Acknowledgement' },
    { term: 'A3', meaning: 'The claim was returned as unprocessable, meaning it was rejected and will not be adjudicated as sent. Next step: read the status code, fix the error and submit again.', tag: 'Acknowledgement' },
    { term: 'A4', meaning: 'The payer could not find the claim. Next step: confirm it was sent to the right payer ID and was accepted by the clearinghouse; resubmit if it never arrived.', tag: 'Acknowledgement' },
    { term: 'A5', meaning: 'The payer split the claim into more than one claim for processing. Next step: track each resulting claim separately when posting payments.', tag: 'Acknowledgement' },
    { term: 'A6', meaning: 'The claim was rejected because required information was missing. Next step: add the missing data named in the status code and submit a new claim.', tag: 'Acknowledgement' },
    { term: 'A7', meaning: 'The claim was rejected because some information was invalid. Next step: correct the invalid data named in the status code and resubmit.', tag: 'Acknowledgement' },
    { term: 'A8', meaning: 'The claim was rejected because related fields do not agree with each other, such as a code that conflicts with another value. Next step: review the related fields together and correct them.', tag: 'Acknowledgement' },
    // Pending
    { term: 'P0', meaning: 'The claim is pending and adjudication details are still being processed. Next step: check again after the payer normal processing time.', tag: 'Pending' },
    { term: 'P1', meaning: 'The claim is in process at the payer. Next step: no action yet unless it stays pending past the prompt-pay period.', tag: 'Pending' },
    { term: 'P2', meaning: 'The claim is pending a payer review, such as medical or utilization review. Next step: be ready to send records quickly if asked.', tag: 'Pending' },
    { term: 'P3', meaning: 'The claim is waiting on information the payer already requested from the provider. Next step: find the request letter or portal message and respond before the deadline.', tag: 'Pending' },
    { term: 'P4', meaning: 'The claim is waiting on information requested from the patient, often a coordination of benefits or accident questionnaire. Next step: ask the patient to contact the plan.', tag: 'Pending' },
    { term: 'P5', meaning: 'The claim is on an administrative or system hold at the payer. Next step: follow up if the hold lasts longer than the payer stated.', tag: 'Pending' },
    // Finalized
    { term: 'F0', meaning: 'Processing is complete and the payer does not plan to do anything more with this claim. Next step: review the remittance for the outcome.', tag: 'Finalized' },
    { term: 'F1', meaning: 'The claim or line was finalized and paid. Next step: match the payment to the ERA and EFT and post it.', tag: 'Finalized' },
    { term: 'F2', meaning: 'The claim or line was finalized and denied. Next step: read the reason codes on the remittance and decide whether to correct, reconsider or appeal.', tag: 'Finalized' },
    { term: 'F3', meaning: 'The claim was finalized and its adjudication was later revised. Next step: look for a new remittance showing the change and any recoupment.', tag: 'Finalized' },
    { term: 'F4', meaning: 'Adjudication is complete but no payment is coming, for example because the full amount went to the deductible. Next step: post the adjustments and bill the patient or secondary plan.', tag: 'Finalized' },
    // Request for info
    { term: 'R0', meaning: 'The payer has a general request for more information about the claim. Next step: read the status code and respond through the payer requested method.', tag: 'Request for info' },
    { term: 'R1', meaning: 'The payer needs more information about an entity on the claim, such as the provider, subscriber or patient. Next step: confirm demographic and identifier data.', tag: 'Request for info' },
    { term: 'R3', meaning: 'The payer needs more information about a claim or service line. Next step: review the line detail named in the status code.', tag: 'Request for info' },
    { term: 'R4', meaning: 'The payer is asking for documentation, such as medical records. Next step: send the records with the claim number using the payer attachment process.', tag: 'Request for info' },
    { term: 'R5', meaning: 'The payer needs more specific detail about the services billed. Next step: provide the requested detail, such as an itemization or narrative.', tag: 'Request for info' },
    { term: 'R6', meaning: 'The payer needs information to meet a regulatory requirement. Next step: read the status code to see which requirement applies and send the item requested.', tag: 'Request for info' },
    { term: 'R9', meaning: 'The payer is requesting information to decide medical necessity. Next step: send the clinical records that support why the service was needed.', tag: 'Request for info' },
    { term: 'R11', meaning: 'The payer is requesting information as part of a review before it pays the claim. Next step: respond quickly, because the claim will not move until the review is done.', tag: 'Request for info' },
    { term: 'R13', meaning: 'A follow-up request: documents you already sent could not be read. Next step: resend clearer copies.', tag: 'Request for info' },
    { term: 'R14', meaning: 'A follow-up request: documents you sent were not the ones requested. Next step: compare the request to what you sent and provide the correct records.', tag: 'Request for info' },
    { term: 'R16', meaning: 'The payer is requesting information to determine the patient eligibility. Next step: confirm coverage details with the patient and respond to the payer.', tag: 'Request for info' },
    // Error
    { term: 'D0', meaning: 'The payer search for the claim was unsuccessful. Next step: check the search criteria in your status request, such as member ID, dates and charge amount.', tag: 'Error' },
    { term: 'E0', meaning: 'A status response could not be returned because of an error in the inquiry itself. Next step: correct the status request data and ask again.', tag: 'Error' },
    { term: 'E1', meaning: 'A status response could not be returned because of the payer system status. Next step: try again later.', tag: 'Error' },
    { term: 'E2', meaning: 'The payer system that holds the answer did not reply to the inquiry. Next step: resubmit the status inquiry later or check the payer portal.', tag: 'Error' },
    { term: 'E3', meaning: 'The inquiry needs correction because related fields in it conflict. Next step: review the related fields and resend.', tag: 'Error' },
    { term: 'E4', meaning: 'The inquiry did not meet a requirement of the trading partner agreement. Next step: check the payer companion guide or clearinghouse setup.', tag: 'Error' },
  ],
  faqs: [
    {
      q: 'What is the difference between a status category code and a status code?',
      a: 'The category code gives the general state of a claim, such as pending or finalized, while the status code gives the specific reason or detail. A response might show category A7 (rejected for invalid information) with a status code naming the field that is invalid. You need both to know what to fix.',
    },
    {
      q: 'Where do I see claim status category codes?',
      a: 'You see these codes in 277CA claim acknowledgments after submission and in 277 responses to claim status inquiries (276). Most clearinghouses and practice management systems show them on rejection reports and claim status screens, sometimes translated into plain text. Payer portals often show the same information in their own wording.',
    },
    {
      q: 'Does an A2 acceptance mean the claim will be paid?',
      a: 'No, A2 only means the claim passed intake edits and entered the payer adjudication system. It can still be denied, reduced or pended for review later. Treat A2 as proof the claim was received on time, and keep the acknowledgment report in case you need to prove timely filing.',
    },
    {
      q: 'Who maintains the claim status codes?',
      a: 'Claim status category codes and claim status codes are external code lists maintained under X12 and updated on a regular schedule. Codes can be added or deactivated, so always check the current list when you see an unfamiliar value. The explanations here are plain-English summaries and not the official code descriptions.',
    },
  ],
  sources: [
    { label: 'X12: Claim Status Category Codes (official list)', url: 'https://x12.org/codes/claim-status-category-codes' },
    { label: 'X12: Claim Status Codes (official list)', url: 'https://x12.org/codes/claim-status-codes' },
  ],
  relatedServices: ['aging-ar-follow-up', 'clearinghouse-coordination', 'claims-submission', 'electronic-claims-processing'],
  relatedTools: ['claim-submission-checklist', 'denial-reasons-guide', 'era-explained', 'claim-turnaround-time-calculator'],
  seoTitle: 'Claim Status Category Codes (277) Explained',
  metaDescription:
    'Plain-English guide to 277 and 277CA claim status category codes: A, P, F, R, D and E families, what each means and the next step for your billing team.',
  keywords: [
    'claim status category codes',
    '277 claim status codes',
    '277ca rejection codes',
    'a3 a7 claim status',
    'claim status inquiry',
    'x12 277 codes',
  ],
};

export default tool;
