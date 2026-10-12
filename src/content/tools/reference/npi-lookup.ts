import type { ReferenceTool } from '../../types';

const tool: ReferenceTool = {
  kind: 'lookup',
  slug: 'npi-lookup',
  name: 'NPI Number Lookup',
  category: 'lookup',
  icon: 'IdCard',
  summary: 'Look up a dentist\'s or dental practice\'s National Provider Identifier using the public CMS NPPES NPI Registry.',
  definition:
    'An NPI (National Provider Identifier) is the unique 10-digit number HIPAA requires covered providers, including dentists who bill electronically, to use on standard transactions such as dental claims. This lookup searches the CMS NPPES NPI Registry by number, name or location and shows the provider type, taxonomy, practice address and enumeration details on file.',
  lookup: 'npi',
  sources: [
    { label: 'CMS NPPES NPI Registry', url: 'https://npiregistry.cms.hhs.gov/' },
    { label: 'NPPES NPI Registry API documentation', url: 'https://npiregistry.cms.hhs.gov/api-page' },
    { label: 'CMS: National Provider Identifier Standard', url: 'https://www.cms.gov/regulations-and-guidance/administrative-simplification/nationalprovidentstand' },
    { label: 'ADA: ADA Dental Claim Form', url: 'https://www.ada.org/publications/cdt/ada-dental-claim-form' },
  ],
  faqs: [
    {
      q: 'What is the difference between a Type 1 and Type 2 NPI for a dental practice?',
      a: 'A Type 1 NPI belongs to an individual, such as a dentist or a hygienist who has one, while a Type 2 NPI belongs to an organization, such as a dental group, corporation or DSO-affiliated practice. An incorporated practice usually bills with its Type 2 NPI and lists the treating dentist\'s Type 1 NPI on each claim.',
    },
    {
      q: 'Why would a dental claim reject for an NPI problem?',
      a: 'Dental claims commonly reject for NPI problems when the number is missing, belongs to the wrong provider type, or does not match the name, taxonomy, address or tax ID the carrier has on file. A new associate whose NPI is not yet linked to the practice in the carrier\'s system is a frequent cause. Checking the registry before submission helps catch mismatches.',
    },
    {
      q: 'How do dentists update their NPPES information?',
      a: 'Dentists update their information by signing in to NPPES and editing the record, and changes must be reported within 30 days. Common updates include practice location, mailing address, taxonomy and authorized official. Updating NPPES does not update dental carrier or Medicaid records, so those need separate updates through each program.',
    },
    {
      q: 'Is the NPI Registry information public?',
      a: 'Yes, NPPES data for enumerated providers is public, and CMS publishes it through the online registry, an API and downloadable files. It includes the name, NPI type, taxonomy, practice address and phone number, but not Social Security numbers or other sensitive identifiers. Dentists should keep their listing accurate because carriers and referring offices rely on it.',
    },
  ],
  relatedServices: ['dental-credentialing', 'dental-claims-processing', 'dental-insurance-verification', 'dental-billing'],
  relatedTools: ['credentialing-checklist', 'claim-submission-checklist', 'dental-insurance-verification-checklist'],
  seoTitle: 'NPI Lookup for Dentists: Search the NPPES Registry',
  metaDescription:
    'Search the CMS NPPES NPI Registry for a dentist or dental practice by number, name or location, and learn why NPI mismatches reject dental claims.',
  keywords: [
    'dentist npi lookup',
    'dental npi number search',
    'nppes npi registry',
    'dental practice npi',
    'type 1 vs type 2 npi dentist',
    'national provider identifier',
  ],
};

export default tool;
