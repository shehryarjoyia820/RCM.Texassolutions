// Bundles front-end and admin scripts and one file per calculator.
// Run: node build/build-js.mjs [--watch]
import { build, context } from 'esbuild';
import { readdirSync, existsSync, mkdirSync, rmSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'wordpress/rcm-core/assets/js');
const watch = process.argv.includes('--watch');
mkdirSync(join(outDir, 'calc'), { recursive: true });

const common = { bundle: true, minify: !watch, target: ['es2019'], legalComments: 'none', logLevel: 'warning', sourcemap: false };

// 1. Bundles from src/js (skipped if an entry does not exist yet).
const entries = ['site', 'tools', 'admin'].filter((e) => existsSync(join(root, `src/js/${e}.ts`)));
const bundles = { ...common, entryPoints: entries.map((e) => join(root, `src/js/${e}.ts`)), outdir: outDir, format: 'iife' };

// 2. Calculators: window.RCM_CALC[key] = compute
const calcDir = join(root, 'src/content/tools/calculators');
// Only calculators that are live on the site (data/tools.json, written by export-content) get a script.
const toolsJson = join(root, 'wordpress/rcm-core/data/tools.json');
const live = existsSync(toolsJson) ? new Set(JSON.parse(readFileSync(toolsJson, 'utf8')).map((t) => t.slug)) : null;
const calcs = readdirSync(calcDir).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3)).filter((k) => !live || live.has(k));
rmSync(join(outDir, 'calc'), { recursive: true, force: true });
mkdirSync(join(outDir, 'calc'), { recursive: true });
const calcBuilds = calcs.map((key) => ({
  ...common,
  stdin: {
    contents: `import c from './src/content/tools/calculators/${key}';\n(window as any).RCM_CALC = (window as any).RCM_CALC || {};\n(window as any).RCM_CALC[${JSON.stringify(key)}] = c.compute;`,
    resolveDir: root,
    loader: 'ts',
  },
  outfile: join(outDir, `calc/${key}.js`),
  format: 'iife',
}));

if (watch) {
  const ctx = await context(bundles);
  await ctx.watch();
  console.log(`watching src/js (${entries.join(', ')})`);
} else {
  await Promise.all([entries.length ? build(bundles) : null, ...calcBuilds.map((b) => build(b))]);
  console.log(`js: ${entries.join(', ') || 'no entries'} + ${calcs.length} calculators`);
}
