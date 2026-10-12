import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'lookup',
  slug: 'hcpcs-code-lookup',
  name: 'HCPCS Level II Code Lookup',
  category: 'lookup',
  icon: 'Hash',
  summary: 'Look up HCPCS Level II codes for supplies, drugs, equipment and services using free National Library of Medicine data.',
  definition:
    'HCPCS Level II is the alphanumeric code set CMS maintains for items and services not covered by CPT, such as durable medical equipment, drugs, supplies and ambulance services. This lookup searches Level II codes through the National Library of Medicine Clinical Table Search Service. CPT (Level I) is licensed by the AMA and is not included.',
  lookup: 'hcpcs',
  sources: [
    { label: 'NLM Clinical Table Search Service: HCPCS API', url: 'https://clinicaltables.nlm.nih.gov/apidoc/hcpcs/v3/doc.html' },
    { label: 'CMS: HCPCS coding questions and quarterly updates', url: 'https://www.cms.gov/medicare/coding-billing/healthcare-common-procedure-system' },
  ],
  faqs: [
    {
      q: 'What is the difference between HCPCS Level I and Level II?',
      a: 'HCPCS Level I is the CPT code set, which the American Medical Association owns and licenses, while Level II is the public alphanumeric set CMS maintains. Level II codes start with a letter followed by four digits and cover items such as supplies, durable medical equipment, drugs, orthotics and some services that CPT does not describe.',
    },
    {
      q: 'Why are CPT codes not included in this lookup?',
      a: 'CPT codes are not included because the AMA holds the copyright to CPT descriptors and licenses their use. This tool only searches HCPCS Level II, which CMS publishes as public data. To look up CPT codes and descriptors, use a licensed source such as your practice management system, encoder software or AMA publications.',
    },
    {
      q: 'How often are HCPCS Level II codes updated?',
      a: 'HCPCS Level II codes are updated quarterly by CMS, with the largest annual update taking effect on January 1. Codes can be added, discontinued or changed during the year, and payers may also change coverage for a code. Check the effective and termination dates for the date of service before billing.',
    },
    {
      q: 'Does a valid HCPCS code mean the payer will cover it?',
      a: 'No, a valid HCPCS code only means the item or service can be reported, not that a payer will cover it. Coverage depends on the patient plan, medical necessity rules, local and national coverage determinations for Medicare, prior authorization requirements and any required modifiers or units limits.',
    },
  ],
  relatedServices: ['medical-coding', 'charge-entry', 'claims-scrubbing', 'prior-authorization'],
  relatedTools: ['icd-10-code-search', 'npi-lookup', 'claim-submission-checklist', 'denial-reasons-guide'],
  seoTitle: 'HCPCS Level II Code Lookup: Free Search Tool',
  metaDescription:
    'Search HCPCS Level II codes for supplies, drugs, DME and services using free NLM data. Learn how Level II differs from CPT and how quarterly updates work.',
  keywords: [
    'hcpcs code lookup',
    'hcpcs level ii codes',
    'hcpcs search',
    'dme codes',
    'j codes lookup',
    'hcpcs vs cpt',
  ],
};

export default tool;
