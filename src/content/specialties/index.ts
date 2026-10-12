import type { Specialty } from '../types';
import { medicalPart1 } from './medical1';
import { medicalPart2 } from './medical2';
import { dentalSpecialties } from './dental';

export const specialties: Specialty[] = [...medicalPart1, ...medicalPart2, ...dentalSpecialties];
export const medicalSpecialties = specialties.filter((s) => s.kind === 'medical');
export const dentalSpecialtyList = specialties.filter((s) => s.kind === 'dental');

const bySlug = new Map(specialties.map((s) => [s.slug, s]));
export const getSpecialty = (slug: string) => bySlug.get(slug);
