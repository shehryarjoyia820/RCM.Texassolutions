import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'checklist',
  slug: 'credentialing-checklist',
  name: 'Dental Provider Credentialing Checklist',
  category: 'checklist',
  icon: 'BadgeCheck',
  summary: 'Documents, registrations and follow-up steps to credential a dentist with dental PPOs, DHMOs, Medicaid dental plans and, when needed, Medicare.',
  definition:
    'A dental credentialing checklist lists the documents and registrations a dentist needs before joining dental carrier networks and billing in network. It covers the NPI and NPPES record, the CAQH ProView profile, state dental license, DEA registration, malpractice coverage, education and work history, Medicaid and Medicare enrollment where they apply, and the upkeep that keeps a dentist in network.',
  sections: [
    {
      title: 'Identifiers and registrations',
      items: [
        { text: 'Individual (Type 1) NPI is issued and NPPES data is current', detail: 'Practice location, mailing address and dental taxonomy (general dentist or the correct specialty) should match what you submit to carriers.' },
        { text: 'Group (Type 2) NPI and tax ID (EIN) for the practice or billing entity' },
        { text: 'IRS letter confirming the legal business name and EIN (such as a CP 575 or 147C)' },
        { text: 'W-9 for the billing entity' },
        { text: 'Bank letter or voided check for EFT and ERA enrollment with each carrier' },
      ],
    },
    {
      title: 'Licenses and education',
      items: [
        { text: 'Active state dental license for every state where the dentist treats patients' },
        { text: 'DEA registration for each state where controlled substances are prescribed' },
        { text: 'State controlled substance registration where the state requires one' },
        { text: 'Sedation or anesthesia permits where the state requires them for the services offered' },
        { text: 'Dental school diploma, plus residency or specialty program certificates for specialists' },
        { text: 'Specialty board certification or eligibility documentation, where applicable' },
        { text: 'Current CV with month and year for every position', detail: 'Explain any gap in work history in writing; many carriers ask about gaps of six months or more.' },
      ],
    },
    {
      title: 'Insurance and history',
      items: [
        { text: 'Professional liability (malpractice) certificate of insurance showing limits and dates' },
        { text: 'Malpractice claims history and explanations for any claims' },
        { text: 'Disclosure answers on license actions, sanctions and exclusions' },
        { text: 'Check the OIG exclusion list and state Medicaid exclusion lists before enrolling' },
      ],
    },
    {
      title: 'CAQH ProView',
      items: [
        { text: 'Create or update the CAQH ProView profile with all practice locations, if the carrier uses CAQH' },
        { text: 'Upload current dental license, DEA, malpractice certificate, CV and any specialty certificates' },
        { text: 'Authorize each dental carrier you are applying to so it can view the profile' },
        { text: 'Re-attest the profile every 120 days', detail: 'Carriers may pause credentialing or recredentialing if the attestation lapses.' },
        { text: 'Replace documents as they expire so the profile never shows expired items' },
      ],
    },
    {
      title: 'Medicaid dental and Medicare',
      items: [
        { text: 'Enroll with the state Medicaid program and each Medicaid dental plan or administrator you plan to accept' },
        { text: 'Confirm whether the dentist needs Medicare enrollment, for example to bill the limited dental services Medicare covers or to treat Medicare Advantage members under certain plans', detail: 'Medicare enrollment runs through PECOS, using the CMS-855I for individuals, the CMS-855B for groups and the CMS-855R to reassign benefits to a group.' },
        { text: 'Record the effective date and any provider IDs once each program approves the enrollment' },
        { text: 'Complete revalidation when a program notifies you, and report changes within the required time frames' },
      ],
    },
    {
      title: 'Dental carriers and follow-up',
      items: [
        { text: 'Confirm each PPO or DHMO network is open for the dentist, specialty and location before applying' },
        { text: 'Submit applications and log the date, method and reference number' },
        { text: 'Follow up on a regular schedule and record each contact' },
        { text: 'Review the participation agreement and PPO fee schedule before signing' },
        { text: 'Record each carrier effective date and provider ID, and decide how to schedule and bill the dentist until it arrives' },
        { text: 'Track license, DEA, malpractice and recredentialing dates for every dentist and hygienist the carrier requires' },
      ],
    },
  ],
  faqs: [
    {
      q: 'How long does dental credentialing take?',
      a: 'Dental credentialing time varies widely by carrier, state and network, and each carrier sets its own processing times. Incomplete applications, expired documents in CAQH and unanswered follow-up requests are the most common causes of delay. Starting early, keeping documents current and following up on a regular schedule are the main levers a practice controls.',
    },
    {
      q: 'What is the difference between credentialing and enrollment for a dentist?',
      a: 'Credentialing verifies a dentist\'s qualifications, such as license, education, malpractice coverage and history, while enrollment sets the dentist up in the carrier\'s system to be paid in network. Most dental PPOs do both before issuing an effective date. Medicaid dental programs and Medicare have their own enrollment processes on top of carrier credentialing.',
    },
    {
      q: 'Can a new associate dentist see patients before credentialing is finished?',
      a: 'An associate can usually treat patients, but claims may be processed as out of network, paid at a lower rate or denied until the carrier\'s effective date. Rules differ by carrier and contract, so check each agreement before scheduling. Many offices plan the associate\'s schedule around the carriers that are already active.',
    },
    {
      q: 'Why does CAQH re-attestation matter for dentists?',
      a: 'Re-attestation matters because CAQH ProView requires providers to confirm their information every 120 days, and carriers that use CAQH rely on that profile. If the attestation lapses, carriers may be unable to finish credentialing or recredentialing, which can delay network participation. Set a recurring reminder and update expiring documents at the same time.',
    },
  ],
  sources: [
    { label: 'CAQH ProView', url: 'https://www.caqh.org/solutions/caqh-proview' },
    { label: 'CMS PECOS (Medicare enrollment)', url: 'https://pecos.cms.hhs.gov/' },
    { label: 'CMS: Provider enrollment and certification', url: 'https://www.cms.gov/medicare/enrollment-renewal/providers-suppliers/chain-ownership-system-pecos' },
    { label: 'CMS: Medicare Dental Coverage', url: 'https://www.cms.gov/medicare/coverage/dental' },
    { label: 'NPPES', url: 'https://nppes.cms.hhs.gov/' },
    { label: 'HHS OIG: List of Excluded Individuals and Entities', url: 'https://oig.hhs.gov/exclusions/' },
  ],
  relatedServices: ['dental-credentialing', 'dental-billing', 'dental-claims-processing', 'revenue-cycle-management'],
  relatedTools: ['npi-lookup', 'claim-submission-checklist', 'dental-insurance-verification-checklist', 'fee-schedule-comparison-calculator'],
  seoTitle: 'Dental Credentialing Checklist: CAQH, NPI, Medicaid',
  metaDescription:
    'Dental credentialing checklist: NPI and NPPES, CAQH ProView and 120-day re-attestation, dental license, DEA, malpractice, Medicaid dental and carrier follow-up.',
  keywords: [
    'dental credentialing checklist',
    'dentist credentialing documents',
    'caqh proview dentist',
    'dental ppo credentialing',
    'medicaid dental enrollment',
    'dental insurance network enrollment',
  ],
};

export default tool;
