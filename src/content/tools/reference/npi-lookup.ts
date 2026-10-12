import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'lookup',
  slug: 'npi-lookup',
  name: 'NPI Number Lookup',
  category: 'lookup',
  icon: 'IdCard',
  summary: 'Look up a provider or organization National Provider Identifier using the public CMS NPPES NPI Registry.',
  definition:
    'An NPI (National Provider Identifier) is the unique 10-digit number HIPAA requires covered healthcare providers to use on standard transactions such as claims. This lookup searches the CMS NPPES NPI Registry by number, name or location and shows the provider type, taxonomy, practice address and enumeration details on file.',
  lookup: 'npi',
  sources: [
    { label: 'CMS NPPES NPI Registry', url: 'https://npiregistry.cms.hhs.gov/' },
    { label: 'NPPES NPI Registry API documentation', url: 'https://npiregistry.cms.hhs.gov/api-page' },
    { label: 'CMS: National Provider Identifier Standard', url: 'https://www.cms.gov/regulations-and-guidance/administrative-simplification/nationalprovidentstand' },
  ],
  faqs: [
    {
      q: 'What is the difference between a Type 1 and Type 2 NPI?',
      a: 'A Type 1 NPI belongs to an individual provider, such as a physician, dentist or therapist, while a Type 2 NPI belongs to an organization, such as a group practice, clinic or hospital. A group usually bills with its Type 2 NPI as the billing provider and lists the Type 1 NPI of the clinician who rendered the service.',
    },
    {
      q: 'Why would a claim reject for an NPI problem?',
      a: 'Claims commonly reject for NPI problems when the number is missing, belongs to the wrong provider type, or does not match the name, taxonomy or tax ID the payer has on file. For Medicare, the NPI must also be linked to an approved enrollment record in PECOS. Checking the registry before submission helps catch these mismatches.',
    },
    {
      q: 'How do providers update their NPPES information?',
      a: 'Providers update their information by signing in to NPPES and editing the record, and HHS requires changes to be reported within 30 days. Common updates include practice location, mailing address, taxonomy and authorized official. Updating NPPES does not update payer enrollment records, so PECOS and commercial payers need separate updates.',
    },
    {
      q: 'Is the NPI Registry information public?',
      a: 'Yes, NPPES data for enumerated providers is public, and CMS publishes it through the online registry, an API and downloadable files. It includes the name, NPI type, taxonomy, practice address and phone number, but not Social Security numbers or other sensitive identifiers. Providers should keep their listing accurate because payers and other providers rely on it.',
    },
  ],
  relatedServices: ['medical-credentialing', 'provider-enrollment', 'claims-submission', 'patient-registration'],
  relatedTools: ['credentialing-checklist', 'claim-submission-checklist', 'icd-10-code-search', 'hcpcs-code-lookup'],
  seoTitle: 'NPI Lookup: Search the NPPES NPI Registry',
  metaDescription:
    'Search the CMS NPPES NPI Registry by number, name or location. See provider type, taxonomy and address, and learn why NPI mismatches reject claims.',
  keywords: [
    'npi lookup',
    'npi number search',
    'nppes npi registry',
    'provider npi lookup',
    'type 1 vs type 2 npi',
    'national provider identifier',
  ],
};

export default tool;
