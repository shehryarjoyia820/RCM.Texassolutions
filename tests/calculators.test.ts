import { describe, expect, it } from 'vitest';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import type { Calculator } from '../src/content/types';
import { SERVICE_SLUGS, TOOL_SLUGS, CALCULATOR_SLUGS } from '../src/content/slugs';

const dir = join(__dirname, '../src/content/tools/calculators');
const files = readdirSync(dir).filter((f) => f.endsWith('.ts'));

const load = async (f: string) => (await import(join(dir, f))).default as Calculator;

describe('calculator registry', () => {
  it('has one file per canonical calculator slug', () => {
    expect(files.map((f) => f.slice(0, -3)).sort()).toEqual([...CALCULATOR_SLUGS].sort());
  });
});

describe.each(files)('%s', (file) => {
  it('reproduces its worked example to 2 decimals', async () => {
    const c = await load(file);
    const res = c.compute(c.example.inputs);
    for (const [k, v] of Object.entries(c.example.expected)) {
      expect(res.values[k], `${c.slug}.${k}`).not.toBeNull();
      expect(Math.round((res.values[k] as number) * 100) / 100, `${c.slug}.${k}`).toBeCloseTo(v, 2);
    }
  });

  it('never returns NaN or Infinity and never throws', async () => {
    const c = await load(file);
    const cases = [
      Object.fromEntries(c.inputs.map((i) => [i.id, 0])),
      Object.fromEntries(c.inputs.map((i) => [i.id, -1])),
      Object.fromEntries(c.inputs.map((i) => [i.id, 1e12])),
      Object.fromEntries(c.inputs.map((i) => [i.id, i.default])),
    ];
    for (const v of cases) {
      const r = c.compute(v);
      for (const [k, x] of Object.entries(r.values)) {
        if (x !== null) expect(Number.isFinite(x), `${c.slug}.${k}`).toBe(true);
      }
    }
  });

  it('declares every output it returns and only valid cross-references', async () => {
    const c = await load(file);
    const ids = new Set(c.outputs.map((o) => o.id));
    for (const k of Object.keys(c.compute(c.example.inputs).values)) expect(ids.has(k), `${c.slug}: undeclared output ${k}`).toBe(true);
    for (const s of c.relatedServices) expect(SERVICE_SLUGS as readonly string[]).toContain(s);
    for (const t of c.relatedTools) expect(TOOL_SLUGS as readonly string[]).toContain(t);
    expect(c.seoTitle.length).toBeLessThanOrEqual(60);
    expect(c.metaDescription.length).toBeGreaterThanOrEqual(110);
    expect(c.metaDescription.length).toBeLessThanOrEqual(160);
  });
});
