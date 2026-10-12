import type { Service, ServiceCategory } from '../types';
import { servicesPart1 } from './part1';
import { servicesPart2 } from './part2';
import { servicesPart3 } from './part3';

export const services: Service[] = [...servicesPart1, ...servicesPart2, ...servicesPart3];

const bySlug = new Map(services.map((s) => [s.slug, s]));
export const getService = (slug: string) => bySlug.get(slug);

export const SERVICE_CATEGORIES: { id: ServiceCategory; name: string; blurb: string }[] = [
  { id: 'end-to-end', name: 'End-to-end RCM', blurb: 'One team responsible for the whole cycle, from eligibility to the final patient balance.' },
  { id: 'front-end', name: 'Front-end revenue cycle', blurb: 'Registration, eligibility, benefits and authorizations: the work that prevents denials before the visit.' },
  { id: 'mid-cycle', name: 'Mid-cycle: coding and claims', blurb: 'Turning documentation into accurate charges and clean claims.' },
  { id: 'back-end', name: 'Back-end: payments, denials and AR', blurb: 'Posting, follow-up, appeals and recovery until every claim is resolved.' },
  { id: 'enrollment', name: 'Credentialing and payer relations', blurb: 'Getting providers enrolled, keeping them active and understanding what payers owe you.' },
  { id: 'analytics', name: 'Audits, analytics and optimization', blurb: 'Measuring revenue cycle performance and fixing what the numbers show.' },
  { id: 'practice-support', name: 'Practice and administrative support', blurb: 'Remote administrative help that works inside your systems.' },
];
