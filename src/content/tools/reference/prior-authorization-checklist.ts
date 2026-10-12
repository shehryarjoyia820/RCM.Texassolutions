import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'prior-authorization-checklist',
  name: 'Prior Authorization Checklist',
  category: 'checklist',
  icon: 'ClipboardCheck',
  summary: 'A step-by-step checklist for requesting, tracking and linking prior authorizations so services are not denied for missing approval.',
  definition:
    'A prior authorization checklist is a repeatable list of steps for getting payer approval before a service, drug or item is provided. It covers checking whether authorization is required, gathering clinical documentation, submitting the request, tracking the decision and making sure the approved details match what is actually billed.',
  sections: [
    {
      title: 'Confirm whether authorization is needed',
      items: [
        { text: 'Verify active coverage and the correct payer for the date of service', detail: 'Medicare Advantage and Medicaid managed care plans have their own rules, separate from Original Medicare or fee-for-service Medicaid.' },
        { text: 'Check the payer authorization list or lookup tool for the planned codes', detail: 'Use the procedure codes you expect to bill, not just a description, since requirements are often code-specific.' },
        { text: 'Check whether the site of service changes the requirement', detail: 'Some services need approval only in certain settings, such as hospital outpatient versus office.' },
        { text: 'Confirm whether a referral is also required', detail: 'HMO and some POS plans may need both a referral and an authorization.' },
        { text: 'Note the payer turnaround times for standard and urgent requests' },
        { text: 'Record the date, source and reference number of your requirement check' },
      ],
    },
    {
      title: 'Gather what the payer needs',
      items: [
        { text: 'Patient demographics and member ID exactly as on the insurance card' },
        { text: 'Ordering and rendering provider names, NPIs and network status' },
        { text: 'Facility or place of service with its NPI and tax ID if different from the practice' },
        { text: 'Planned procedure codes, units, modifiers and diagnosis codes' },
        { text: 'Clinical notes that support medical necessity', detail: 'Include history, exam findings, prior treatments tried and failed, test results and imaging reports the payer policy asks for.' },
        { text: 'The payer clinical policy or criteria for the service', detail: 'Map each criterion to where it is documented in the record.' },
        { text: 'Planned date of service or date range' },
      ],
    },
    {
      title: 'Submit and track the request',
      items: [
        { text: 'Submit through the payer preferred channel (portal, 278 transaction, fax or phone)' },
        { text: 'Save the submission confirmation, case number and copies of everything sent' },
        { text: 'Log the request in a tracking sheet or work queue with a follow-up date' },
        { text: 'Respond quickly to requests for more information', detail: 'Pended requests that are not answered on time are often closed or denied.' },
        { text: 'Request a peer-to-peer review when the payer offers one and denial is likely' },
        { text: 'Tell the patient and the scheduling team the status before the appointment' },
      ],
    },
    {
      title: 'Record the decision',
      items: [
        { text: 'Record the authorization number in the practice management system' },
        { text: 'Record approved codes, units or visits, date span and approved facility' },
        { text: 'Compare approved details to what was requested and flag any differences' },
        { text: 'Set reminders before the authorization expires or visits run out' },
        { text: 'If denied, note the reason and appeal deadline and decide on appeal, alternative or financial consent with the patient' },
      ],
    },
    {
      title: 'Before and after the service',
      items: [
        { text: 'Re-check that the authorization is still valid on the day of service' },
        { text: 'If the procedure changes during the visit, contact the payer about updating the authorization', detail: 'Many payers allow a short window after the service to update codes; check the plan rules.' },
        { text: 'Put the authorization number on the claim in the correct field' },
        { text: 'Make sure billed codes, units, provider and facility match the approval' },
        { text: 'Track authorization-related denials to find recurring gaps' },
      ],
    },
  ],
  faqs: [
    {
      q: 'What is the most common cause of authorization denials?',
      a: 'The most common cause is that no authorization was obtained or the approval does not match what was billed. Mismatches include a different code, extra units, a different facility, an expired date span or a different rendering provider. Comparing the approval to the claim before submission catches most of these.',
    },
    {
      q: 'Can you get a prior authorization after the service?',
      a: 'Sometimes, because some payers allow retro-authorization for urgent care or when the patient coverage was not known at the time. Many payers do not allow it for planned services. Check the payer policy and the time limit right away, and keep notes showing why approval could not be obtained in advance.',
    },
    {
      q: 'How long is a prior authorization valid?',
      a: 'Validity depends on the payer and service, so always read the approval letter. Authorizations usually cover a set date span and a number of visits or units. Therapy and behavioral health approvals often need renewal after a certain number of visits, so set reminders before they run out.',
    },
    {
      q: 'Is a referral the same as a prior authorization?',
      a: 'No, a referral is a primary care provider order sending a patient to a specialist, while a prior authorization is the payer approval of a specific service. Some plans need both. A referral alone does not mean the specialist procedures are approved, so check authorization requirements separately.',
    },
  ],
  sources: [
    { label: 'CMS: Prior authorization and pre-claim review initiatives', url: 'https://www.cms.gov/data-research/monitoring-programs/medicare-fee-service-compliance-programs/prior-authorization-and-pre-claim-review-initiatives' },
  ],
  relatedServices: ['prior-authorization', 'insurance-eligibility-verification', 'benefits-verification', 'denial-management'],
  relatedTools: ['denial-reasons-guide', 'claim-submission-checklist', 'denial-rate-calculator', 'hcpcs-code-lookup'],
  seoTitle: 'Prior Authorization Checklist for Medical Practices',
  metaDescription:
    'A practical prior authorization checklist: confirm requirements, gather clinical records, submit and track requests, and match approvals to the claim.',
  keywords: [
    'prior authorization checklist',
    'prior auth process',
    'insurance preauthorization steps',
    'authorization denial prevention',
    'retro authorization',
    'prior authorization workflow',
  ],
};

export default tool;
