import { describe, expect, it } from 'vitest';
import { servicesPart1 } from '../src/content/services/part1';
import { servicesPart2 } from '../src/content/services/part2';
import { servicesPart3 } from '../src/content/services/part3';
import { servicesPart4 } from '../src/content/services/part4';
import { servicesPart5 } from '../src/content/services/part5';
import { moreSpecialties } from '../src/content/specialties/more';
import { seedPosts2 } from '../src/content/blog/seed2';
import { seedPosts3 } from '../src/content/blog/seed3';
import { medicalPart1 } from '../src/content/specialties/medical1';
import { medicalPart2 } from '../src/content/specialties/medical2';
import { dentalSpecialties } from '../src/content/specialties/dental';
import { pages } from '../src/content/pages';
import { seedPosts } from '../src/content/blog/seed';
import { SERVICE_SLUGS, SPECIALTY_SLUGS, TOOL_SLUGS } from '../src/content/slugs';

const services = [...servicesPart1, ...servicesPart2, ...servicesPart3, ...servicesPart4, ...servicesPart5];
const specialties = [...medicalPart1, ...medicalPart2, ...moreSpecialties, ...dentalSpecialties];
const allPosts = [...seedPosts, ...seedPosts2, ...seedPosts3];

/** Claims the owner has not approved (docs/CONTENT-GUIDE.md). */
const BANNED = [/hipaa[- ]compliant/i, /hipaa[- ]certified/i, /\bwe guarantee\b|guaranteed (results|increase|savings|approval)/i, /\b\d{2,3}% (increase|reduction|faster)/i, /world-class|cutting-edge|game-changer|revolutionary/i, /—/];

const allText = (o: unknown): string => JSON.stringify(o);

describe('services', () => {
  it('cover every canonical slug exactly once', () => {
    expect(services.map((s) => s.slug).sort()).toEqual([...SERVICE_SLUGS].sort());
  });
  it.each(services.map((s) => [s.slug, s] as const))('%s has valid references and lengths', (_, s) => {
    for (const r of s.relatedServices) expect(SERVICE_SLUGS as readonly string[]).toContain(r);
    for (const r of s.practiceTypes) expect(SPECIALTY_SLUGS as readonly string[]).toContain(r);
    for (const r of s.relatedTools) expect(TOOL_SLUGS as readonly string[]).toContain(r);
    expect(s.seoTitle.length).toBeLessThanOrEqual(60);
    expect(s.metaDescription.length).toBeLessThanOrEqual(160);
    expect(s.faqs.length).toBeGreaterThanOrEqual(4);
  });
});

describe('specialties', () => {
  it('cover every canonical slug exactly once', () => {
    expect(specialties.map((s) => s.slug).sort()).toEqual([...SPECIALTY_SLUGS].sort());
  });
  it.each(specialties.map((s) => [s.slug, s] as const))('%s has valid references', (_, s) => {
    for (const r of s.services) expect(SERVICE_SLUGS as readonly string[]).toContain(r);
    for (const r of s.relatedTools) expect(TOOL_SLUGS as readonly string[]).toContain(r);
    expect(s.seoTitle.length).toBeLessThanOrEqual(60);
  });
});

describe('claims rules', () => {
  const corpora: [string, unknown][] = [
    ['services', services],
    ['specialties', specialties],
    ['pages', pages.filter((p) => p.template !== 'legal')],
    ['blog', allPosts],
  ];
  it.each(corpora)('%s contain no unapproved claims or em dashes', (_, data) => {
    const text = allText(data);
    for (const re of BANNED) expect(text, `matched ${re}`).not.toMatch(re);
  });
});

describe('internal links', () => {
  const known = new Set<string>([
    ...SERVICE_SLUGS.map((s) => `/services/${s}/`),
    ...SPECIALTY_SLUGS.map((s) => `/specialties/${s}/`),
    ...TOOL_SLUGS.map((s) => `/tools/${s}/`),
    ...pages.map((p) => (p.parent ? `/${p.parent}/${p.key}/` : `/${p.key}/`)),
    ...allPosts.map((p) => `/blog/${p.slug}/`),
    '/services/', '/specialties/', '/tools/', '/blog/', '/contact/', '/',
  ]);
  it('pages only link to pages that exist', () => {
    for (const p of pages) {
      for (const m of p.body.matchAll(/href="(\/[^"#?]*)"/g)) expect(known, `${p.key} -> ${m[1]}`).toContain(m[1].endsWith('/') ? m[1] : `${m[1]}/`);
    }
  });
  it('blog posts only link to pages that exist', () => {
    for (const p of allPosts) {
      for (const m of p.html.matchAll(/href="(\/[^"#?]*)"/g)) expect(known, `${p.slug} -> ${m[1]}`).toContain(m[1].endsWith('/') ? m[1] : `${m[1]}/`);
    }
  });
});

describe('every content module loads', () => {
  it('reference tools and company content import without errors', async () => {
    const { readdirSync } = await import('node:fs');
    const { join } = await import('node:path');
    const dir = join(__dirname, '../src/content/tools/reference');
    for (const f of readdirSync(dir).filter((x) => x.endsWith('.ts'))) {
      const m = await import(join(dir, f));
      expect(m.default?.slug, f).toBe(f.slice(0, -3));
    }
    const company = await import('../src/content/company');
    expect(company.GENERAL_FAQS.length).toBeGreaterThan(0);
  });
});
