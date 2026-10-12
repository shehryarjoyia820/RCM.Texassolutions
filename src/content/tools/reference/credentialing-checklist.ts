import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'credentialing-checklist',
  name: 'Provider Credentialing Checklist',
  category: 'checklist',
  icon: 'BadgeCheck',
  summary: 'Documents, registrations and follow-up steps to credential and enroll a provider with Medicare, Medicaid and commercial payers.',
  definition:
    'A provider credentialing checklist lists the documents and registrations needed before a clinician can join payer networks and bill. It covers identifiers (NPI, NPPES), the CAQH ProView profile, Medicare enrollment in PECOS, licenses, DEA registration, board certification, malpractice coverage and work history, plus the ongoing upkeep that keeps a provider in network.',
  sections: [
    {
      title: 'Identifiers and registrations',
      items: [
        { text: 'Individual (Type 1) NPI is issued and NPPES data is current', detail: 'Practice location, mailing address and taxonomy should match what you submit to payers.' },
        { text: 'Group (Type 2) NPI and tax ID (EIN) for the billing entity' },
        { text: 'IRS letter confirming the legal business name and EIN (such as a CP 575 or 147C)' },
        { text: 'W-9 for the billing entity' },
        { text: 'Bank letter or voided check for EFT enrollment' },
      ],
    },
    {
      title: 'Licenses and certifications',
      items: [
        { text: 'Active state professional license for every state where the provider sees patients' },
        { text: 'DEA registration for each state where controlled substances are prescribed' },
        { text: 'State controlled substance registration where the state requires one' },
        { text: 'Board certification or eligibility documentation' },
        { text: 'Education and training records (diplomas, residency and fellowship certificates)' },
        { text: 'Current CV with month and year for every position', detail: 'Explain any gap in work history in writing; many payers ask about gaps of six months or more.' },
      ],
    },
    {
      title: 'Insurance and history',
      items: [
        { text: 'Professional liability (malpractice) certificate of insurance showing limits and dates' },
        { text: 'Malpractice claims history and explanations for any claims' },
        { text: 'Hospital privileges or a written admitting arrangement if required by the payer' },
        { text: 'Disclosure answers on sanctions, license actions and exclusions' },
        { text: 'Check the OIG exclusion list and state Medicaid exclusion lists before enrolling' },
      ],
    },
    {
      title: 'CAQH ProView',
      items: [
        { text: 'Create or update the CAQH ProView profile with all practice locations' },
        { text: 'Upload current license, DEA, board certification, malpractice COI and CV' },
        { text: 'Authorize each payer you are applying to so it can view the profile' },
        { text: 'Re-attest the profile every 120 days', detail: 'Payers may pause credentialing or recredentialing if the attestation lapses.' },
        { text: 'Replace documents as they expire so the profile never shows expired items' },
      ],
    },
    {
      title: 'Medicare and Medicaid enrollment',
      items: [
        { text: 'Enroll in Medicare through PECOS, or with the paper CMS-855 forms if needed', detail: 'CMS-855I for individual practitioners, CMS-855B for groups and clinics, CMS-855R to reassign benefits to a group, and CMS-855O for providers who only order or refer.' },
        { text: 'Record the effective date and PTAN once Medicare approves the enrollment' },
        { text: 'Enroll with the state Medicaid program and each Medicaid managed care plan you plan to accept' },
        { text: 'Complete Medicare revalidation when CMS notifies you, and report changes within the required time frames' },
      ],
    },
    {
      title: 'Commercial payers and follow-up',
      items: [
        { text: 'Confirm each payer network is open for the specialty and location before applying' },
        { text: 'Submit applications and log the date, method and reference number' },
        { text: 'Follow up on a regular schedule and record each contact' },
        { text: 'Review contracts and fee schedules before signing' },
        { text: 'Record each payer effective date and provider ID, and hold or plan claims accordingly' },
        { text: 'Track license, DEA, board and malpractice expiration dates and recredentialing cycles' },
      ],
    },
  ],
  faqs: [
    {
      q: 'How long does provider credentialing take?',
      a: 'Credentialing time varies widely by payer, state and specialty, and payers set their own processing times. Incomplete applications, expired documents in CAQH and unanswered follow-up requests are the most common causes of delay. Starting early, keeping documents current and following up on a regular schedule are the main levers a practice controls.',
    },
    {
      q: 'What is the difference between credentialing and enrollment?',
      a: 'Credentialing verifies a provider qualifications, such as licenses, training and history, while enrollment sets the provider up in the payer system to bill. Most commercial payers do both before issuing a contract or effective date. For Medicare, enrollment through PECOS is the main step, and CMS screens the provider during that process.',
    },
    {
      q: 'Why does CAQH re-attestation matter?',
      a: 'Re-attestation matters because CAQH ProView requires providers to confirm their information every 120 days, and payers rely on that profile. If the attestation lapses, payers may be unable to finish credentialing or recredentialing, which can delay network participation. Set a recurring reminder and update expiring documents at the same time.',
    },
    {
      q: 'Which CMS-855 form does a new provider need?',
      a: 'It depends on the situation. An individual practitioner uses the CMS-855I, a group or clinic uses the CMS-855B, and a provider joining a group typically also completes a CMS-855R to reassign benefits. Providers who only order or refer use the CMS-855O. Most applications can be filed online in PECOS instead of on paper.',
    },
  ],
  sources: [
    { label: 'CAQH ProView', url: 'https://proview.caqh.org/' },
    { label: 'CMS PECOS (Medicare enrollment)', url: 'https://pecos.cms.hhs.gov/' },
    { label: 'CMS: Provider enrollment and certification', url: 'https://www.cms.gov/medicare/enrollment-renewal/providers-suppliers/chain-ownership-system-pecos' },
    { label: 'NPPES', url: 'https://nppes.cms.hhs.gov/' },
    { label: 'HHS OIG: List of Excluded Individuals and Entities', url: 'https://oig.hhs.gov/exclusions/' },
  ],
  relatedServices: ['medical-credentialing', 'provider-enrollment', 'payer-contracting', 'practice-management-support'],
  relatedTools: ['npi-lookup', 'claim-submission-checklist', 'medical-billing-acronyms', 'revenue-per-provider-calculator'],
  seoTitle: 'Provider Credentialing Checklist: CAQH, PECOS, NPI',
  metaDescription:
    'Provider credentialing checklist: NPI and NPPES, CAQH ProView and 120-day re-attestation, PECOS and 855 forms, licenses, DEA, malpractice and payer follow-up.',
  keywords: [
    'credentialing checklist',
    'provider credentialing documents',
    'caqh proview checklist',
    'pecos enrollment',
    'cms 855 forms',
    'payer enrollment checklist',
  ],
};

export default tool;
