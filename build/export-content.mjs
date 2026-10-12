// Exports src/content/*.ts to JSON for the WordPress plugin (wordpress/rcm-core/data/)
// and collects the Lucide icons the site uses into data/icons.json.
// Run: node build/export-content.mjs
import { build } from 'esbuild';
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'wordpress/rcm-core/data');
mkdirSync(out, { recursive: true });

// 1. Bundle an entry that imports every content module, then run it.
const calcDir = join(root, 'src/content/tools/calculators');
const refDir = join(root, 'src/content/tools/reference');
const list = (d) => readdirSync(d).filter((f) => f.endsWith('.ts')).map((f) => f.slice(0, -3)).sort();
const hasPages = existsSync(join(root, 'src/content/pages.ts'));
const entry = `
import { servicesPart1 } from './src/content/services/part1';
import { servicesPart2 } from './src/content/services/part2';
import { servicesPart3 } from './src/content/services/part3';
import { medicalPart1 } from './src/content/specialties/medical1';
import { medicalPart2 } from './src/content/specialties/medical2';
import { dentalSpecialties } from './src/content/specialties/dental';
import { seedPosts } from './src/content/blog/seed';
import * as company from './src/content/company';
${hasPages ? "import { pages } from './src/content/pages';" : 'const pages = [];'}
${list(calcDir).map((s, i) => `import c${i} from './src/content/tools/calculators/${s}';`).join('\n')}
${list(refDir).map((s, i) => `import r${i} from './src/content/tools/reference/${s}';`).join('\n')}
export const data = {
  services: [...servicesPart1, ...servicesPart2, ...servicesPart3],
  specialties: [...medicalPart1, ...medicalPart2, ...dentalSpecialties],
  calculators: [${list(calcDir).map((_, i) => `c${i}`).join(', ')}],
  references: [${list(refDir).map((_, i) => `r${i}`).join(', ')}],
  blog: seedPosts,
  pages,
  company: { CYCLE: company.CYCLE, HOME_FAQS: company.HOME_FAQS, GENERAL_FAQS: company.GENERAL_FAQS, COMPANY_FACTS: company.COMPANY_FACTS },
};
`;
const tmp = join(root, 'build/.tmp');
mkdirSync(tmp, { recursive: true });
const bundled = join(tmp, 'content.mjs');
await build({ stdin: { contents: entry, resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', outfile: bundled, logLevel: 'warning' });
const { data } = await import(pathToFileURL(bundled).href + `?t=${Date.now()}`);
rmSync(tmp, { recursive: true, force: true });

// 2. Tools: drop compute(), mark kind.
const tools = [
  ...data.calculators.map(({ compute, ...rest }) => {
    if (typeof compute !== 'function') throw new Error(`${rest.slug}: compute missing`);
    return rest;
  }),
  ...data.references,
];

const write = (name, value) => writeFileSync(join(out, `${name}.json`), JSON.stringify(value));
write('services', data.services);
write('specialties', data.specialties);
write('tools', tools);
write('blog', data.blog);
write('pages', data.pages);
write('company', data.company);

// 3. Icons: every icon named in content plus the ones templates use.
const TEMPLATE_ICONS = [
  'ArrowRight', 'ArrowUpRight', 'Check', 'CheckCircle2', 'ChevronDown', 'ChevronRight', 'Menu', 'X', 'Phone', 'Mail', 'MapPin', 'Search',
  'ShieldCheck', 'ShieldAlert', 'MessageSquare', 'Calculator', 'ClipboardCheck', 'BookOpen', 'Clock', 'CalendarCheck2', 'Building2', 'Users',
  'LineChart', 'Workflow', 'Lock', 'AlertTriangle', 'Info', 'ExternalLink', 'Send', 'Bot', 'Copy', 'Link2', 'Printer', 'RotateCcw',
  'FileText', 'Download', 'Sparkles', 'HeartPulse', 'Smile', 'Stethoscope', 'Briefcase', 'Handshake', 'Quote', 'Star', 'Circle', 'Layers',
  'Gauge', 'Target', 'Eye', 'Loader2', 'Download', 'Scale', 'Network', 'Server', 'KeyRound', 'FileCheck2', 'Wallet', 'Receipt', 'Clock3', 'ListChecks', 'Globe2',
];
const named = new Set(TEMPLATE_ICONS);
for (const x of [...data.services, ...data.specialties, ...tools]) if (x.icon) named.add(x.icon);
const kebab = (n) => n.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Za-z])([0-9])/g, '$1-$2').toLowerCase();
const iconDir = join(root, 'node_modules/lucide-static/icons');
const aliases = { Loader2: 'loader-circle', CheckCircle2: 'circle-check', AlertTriangle: 'triangle-alert', PieChart: 'chart-pie', BarChart3: 'chart-column', LineChart: 'chart-line', XCircle: 'circle-x', CalendarCheck2: 'calendar-check-2', Clock3: 'clock-3', Globe2: 'earth', Building2: 'building-2', FileCheck2: 'file-check-2', FileCode2: 'file-code-2', HelpCircle: 'circle-help', Home: 'house', Edit: 'pencil' };
const icons = {};
const missing = [];
for (const name of [...named].sort()) {
  const candidates = [aliases[name], kebab(name), kebab(name).replace(/-(\d)$/, '$1')].filter(Boolean);
  const file = candidates.map((c) => join(iconDir, `${c}.svg`)).find((f) => existsSync(f));
  if (!file) {
    missing.push(name);
    continue;
  }
  const svg = readFileSync(file, 'utf8');
  icons[name] = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '').replace(/\s+/g, ' ').trim();
}
write('icons', icons);

console.log(
  `content: ${data.services.length} services, ${data.specialties.length} specialties, ${tools.length} tools, ${data.blog.length} posts, ${data.pages.length} pages, ${Object.keys(icons).length} icons` +
    (missing.length ? `\nMISSING ICONS: ${missing.join(', ')}` : ''),
);
if (missing.length) process.exitCode = 1;
