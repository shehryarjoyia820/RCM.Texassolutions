import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'lookup',
  slug: 'icd-10-code-search',
  name: 'ICD-10-CM Code Search',
  category: 'lookup',
  icon: 'Search',
  summary: 'Search ICD-10-CM diagnosis codes by code or keyword using free public data from the National Library of Medicine.',
  definition:
    'ICD-10-CM is the diagnosis code set used on US healthcare claims to describe why a patient was seen. This search tool queries the National Library of Medicine Clinical Table Search Service, which publishes the CDC and NCHS code set, so you can find a code by number or by plain-language keyword.',
  lookup: 'icd10',
  sources: [
    { label: 'NLM Clinical Table Search Service: ICD-10-CM API', url: 'https://clinicaltables.nlm.nih.gov/apidoc/icd10cm/v3/doc.html' },
    { label: 'CDC National Center for Health Statistics: ICD-10-CM', url: 'https://www.cdc.gov/nchs/icd/icd-10-cm/index.html' },
    { label: 'CMS: ICD-10 code files and guidelines', url: 'https://www.cms.gov/medicare/coding-billing/icd-10-codes' },
  ],
  faqs: [
    {
      q: 'Where does this ICD-10 code data come from?',
      a: 'The search uses the National Library of Medicine Clinical Table Search Service, a free public API that publishes the ICD-10-CM code set. ICD-10-CM itself is maintained by the CDC National Center for Health Statistics and is in the public domain. Results are for reference; always confirm the final code against the official tabular list and guidelines for the date of service.',
    },
    {
      q: 'How often do ICD-10-CM codes change?',
      a: 'ICD-10-CM codes are updated every year, with the new code set taking effect on October 1 for dates of service on or after that day. CMS and CDC can also release mid-year updates, often effective April 1. Codes are added, deleted and revised, so a code that was valid last year may be rejected today if it was expanded or retired.',
    },
    {
      q: 'Can I pick a final claim code from search results alone?',
      a: 'No, search results help you find candidate codes, but final code selection should follow the full tabular list, its instructional notes and the official ICD-10-CM coding guidelines. Notes such as "code first", "use additional code" and Excludes1 rules affect what you can report, and the clinical documentation must support the code you choose.',
    },
    {
      q: 'Why does a payer reject a code that appears in the search?',
      a: 'A payer usually rejects a listed code because it is not billable at that level of detail, was not valid on the date of service, or does not support the procedure under the payer policy. Many categories need additional characters, such as laterality or a seventh character for encounter type, before they can be reported on a claim.',
    },
    {
      q: 'Does this tool include procedure codes?',
      a: 'No, this tool covers ICD-10-CM diagnosis codes only. Physician and outpatient procedures are reported with CPT and HCPCS Level II codes, and inpatient hospital procedures use ICD-10-PCS. For HCPCS Level II supply, drug and service codes, use our separate HCPCS code lookup, which also draws on public National Library of Medicine data.',
    },
  ],
  relatedServices: ['medical-coding', 'coding-audit', 'claims-scrubbing', 'denial-management'],
  relatedTools: ['hcpcs-code-lookup', 'npi-lookup', 'denial-reasons-guide', 'medical-billing-glossary'],
  seoTitle: 'ICD-10-CM Code Search: Free Diagnosis Code Lookup',
  metaDescription:
    'Search ICD-10-CM diagnosis codes by number or keyword with free National Library of Medicine data. Learn how annual October 1 updates affect your claims.',
  keywords: [
    'icd-10 code search',
    'icd-10-cm lookup',
    'diagnosis code lookup',
    'icd 10 codes',
    'free icd-10 search',
    'icd-10-cm code finder',
  ],
};

export default tool;
