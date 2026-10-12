/**
 * Content model for the RCM site.
 *
 * Services, specialties, calculators and reference guides are code-managed
 * content: they live in this folder, are reviewed in Git and are rendered at
 * build time. Admins can override SEO fields and unpublish any page from
 * /admin/content; blog posts, FAQs added later and the knowledge base live in
 * the database instead.
 *
 * Writing rules (apply to every string in this folder):
 * - Educational, specific and accurate. No invented statistics, client
 *   results, certifications, guarantees, turnaround promises or prices.
 * - Benefits are "potential" outcomes: say what the work is designed to do,
 *   never what it will deliver.
 * - Never say Texas Solutions is "HIPAA compliant" or "certified".
 * - American English. No em dashes; use commas, colons or parentheses.
 */

export interface Faq {
  q: string;
  /** Plain text answer, 40 to 90 words, answers the question in the first sentence. */
  a: string;
}

export interface Step {
  title: string;
  detail: string;
}

export type ServiceCategory =
  | 'end-to-end'
  | 'front-end'
  | 'mid-cycle'
  | 'back-end'
  | 'enrollment'
  | 'analytics'
  | 'practice-support';

export interface Service {
  slug: string;
  name: string;
  /** Short label for menus and cards, max 28 characters. */
  shortName: string;
  category: ServiceCategory;
  /** lucide-react icon name in PascalCase, e.g. "FileCheck2". */
  icon: string;
  /** One sentence for cards, max 140 characters. */
  summary: string;
  /** Direct answer to "What is <service>?", 40 to 60 words (answer-engine friendly). */
  definition: string;
  /** 2 to 3 paragraphs introducing the service and why it matters. */
  intro: string[];
  /** What the service covers, 6 to 10 concrete tasks. */
  scope: string[];
  /** How the work runs, 4 to 7 steps in order. */
  workflow: Step[];
  /** Potential benefits, 3 to 5, phrased as what the work is designed to improve. */
  benefits: Step[];
  /** Specialty slugs (see specialties/index.ts) that commonly need this service, 4 to 8. */
  practiceTypes: string[];
  faqs: Faq[];
  /** Tool slugs (see tools/registry.ts) relevant to this service, 1 to 4. */
  relatedTools: string[];
  /** Other service slugs, 3 to 5. */
  relatedServices: string[];
  /** Max 60 characters. */
  seoTitle: string;
  /** 120 to 158 characters. */
  metaDescription: string;
  keywords: string[];
}

export interface Specialty {
  slug: string;
  name: string;
  kind: 'medical' | 'dental';
  icon: string;
  summary: string;
  /** Direct answer to "What does <specialty> billing involve?", 40 to 60 words. */
  definition: string;
  intro: string[];
  /** Specialty-specific billing challenges, 4 to 6. */
  challenges: Step[];
  /** Payer workflow notes: how claims for this specialty typically move, 4 to 6 bullets. */
  payerWorkflow: string[];
  /** Service slugs most relevant, 4 to 8. */
  services: string[];
  faqs: Faq[];
  relatedTools: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

/* ------------------------------------------------------------------ */
/*  Calculators                                                        */
/* ------------------------------------------------------------------ */

export type Unit = 'usd' | 'pct' | 'days' | 'count' | 'hours' | 'months' | 'ratio' | 'years';

export interface CalcInput {
  id: string;
  label: string;
  unit: Unit;
  default: number;
  min?: number;
  max?: number;
  step?: number;
  help?: string;
  /** Optional inputs may be left blank; compute receives 0 for them. */
  optional?: boolean;
}

export interface CalcOutput {
  id: string;
  label: string;
  unit: Unit;
  /** Highlight as the headline result (one or two per calculator). */
  primary?: boolean;
  help?: string;
}

export interface CalcResult {
  /** Keyed by CalcOutput.id. null means "cannot be calculated from these inputs". */
  values: Record<string, number | null>;
  /** Plain-language interpretation of this specific result. */
  notes?: string[];
  /** Input problems, e.g. "Payments exceed allowed charges". */
  warnings?: string[];
}

export type ToolCategory = 'revenue' | 'kpi' | 'cost' | 'dental' | 'lookup' | 'checklist' | 'reference';

export interface Benchmark {
  text: string;
  source: string;
  sourceUrl: string;
  /** Date the source was published or last checked, YYYY-MM-DD. */
  asOf: string;
}

export interface Calculator {
  kind: 'calculator';
  slug: string;
  name: string;
  category: ToolCategory;
  icon: string;
  summary: string;
  /** Direct answer to "What is <metric> / what does this calculator do?", 40 to 60 words. */
  definition: string;
  inputs: CalcInput[];
  outputs: CalcOutput[];
  /** Pure function. Never throws; return null values and warnings for bad input. */
  compute: (v: Record<string, number>) => CalcResult;
  formula: { expression: string; explanation: string }[];
  /** Worked example. Expected values are checked by tests to 2 decimal places. */
  example: { inputs: Record<string, number>; expected: Record<string, number>; narrative: string };
  assumptions: string[];
  benchmarks?: Benchmark[];
  faqs: Faq[];
  relatedServices: string[];
  relatedTools: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

/** Calculator data without the compute function, safe to pass to client components. */
export type CalcSpec = Omit<Calculator, 'compute'>;

export interface ChecklistItem {
  text: string;
  detail?: string;
}

export interface ReferenceTool {
  kind: 'checklist' | 'glossary' | 'lookup' | 'guide';
  slug: string;
  name: string;
  category: ToolCategory;
  icon: string;
  summary: string;
  definition: string;
  /** Checklists: grouped items the visitor can tick off and print. */
  sections?: { title: string; items: ChecklistItem[] }[];
  /** Glossaries and guides: searchable term list. */
  entries?: { term: string; meaning: string; tag?: string }[];
  /** Lookups: which live API the page queries (handled by src/app/api/lookup). */
  lookup?: 'icd10' | 'hcpcs' | 'npi';
  sources?: { label: string; url: string }[];
  faqs: Faq[];
  relatedServices: string[];
  relatedTools: string[];
  seoTitle: string;
  metaDescription: string;
  keywords: string[];
}

export type Tool = Calculator | ReferenceTool;
