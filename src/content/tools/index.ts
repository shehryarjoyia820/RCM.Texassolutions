import type { CalcSpec, Calculator, ReferenceTool, Tool, ToolCategory } from '../types';
import { calculators, referenceTools } from './registry';

export { calculators, referenceTools };
export const tools: Tool[] = [...calculators, ...referenceTools];

const bySlug = new Map<string, Tool>(tools.map((t) => [t.slug, t]));
export const getTool = (slug: string) => bySlug.get(slug);
export const isCalculator = (t: Tool): t is Calculator => t.kind === 'calculator';

export function toSpec(c: Calculator): CalcSpec {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { compute, ...spec } = c;
  return spec;
}

export const TOOL_CATEGORIES: { id: ToolCategory; name: string; blurb: string }[] = [
  { id: 'revenue', name: 'Revenue and ROI', blurb: 'Project revenue, compare billing options and estimate what is being lost.' },
  { id: 'cost', name: 'Billing cost', blurb: 'What billing really costs per claim, per FTE and per year.' },
  { id: 'kpi', name: 'RCM KPIs', blurb: 'Collection rates, days in AR, denial and clean claim rates.' },
  { id: 'dental', name: 'Dental billing', blurb: 'Calculators and checklists for dental practices.' },
  { id: 'lookup', name: 'Code and provider lookups', blurb: 'Search ICD-10-CM, HCPCS Level II and the NPI Registry.' },
  { id: 'checklist', name: 'Checklists', blurb: 'Printable checklists for authorizations, claims, appeals and credentialing.' },
  { id: 'reference', name: 'Reference guides', blurb: 'Glossaries, denial reasons, EOB and ERA explained.' },
];

export function toolCategory(t: Tool): ToolCategory {
  return t.category;
}

export type { ReferenceTool };
