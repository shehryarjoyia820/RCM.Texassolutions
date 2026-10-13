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
const has = (f) => existsSync(join(root, f));
const opt = (file, name) => (has(file) ? `import { ${name} } from './${file.replace(/\.ts$/, '')}';` : `const ${name} = [];`);
const entry = `
import { servicesPart1 } from './src/content/services/part1';
import { servicesPart2 } from './src/content/services/part2';
import { servicesPart3 } from './src/content/services/part3';
import { medicalPart1 } from './src/content/specialties/medical1';
import { medicalPart2 } from './src/content/specialties/medical2';
import { dentalSpecialties } from './src/content/specialties/dental';
import { seedPosts } from './src/content/blog/seed';
${opt('src/content/services/part4.ts', 'servicesPart4')}
${opt('src/content/services/part5.ts', 'servicesPart5')}
${opt('src/content/specialties/more.ts', 'moreSpecialties')}
${opt('src/content/blog/seed2.ts', 'seedPosts2')}
${opt('src/content/blog/seed3.ts', 'seedPosts3')}
${opt('src/content/services/dental-core-a.ts', 'dentalCoreA')}
${opt('src/content/services/dental-core-b.ts', 'dentalCoreB')}
${opt('src/content/pages-dental.ts', 'dentalPageOverrides')}
${opt('src/content/pages-areas.ts', 'areaPages')}
${opt('src/content/pages-pricing.ts', 'pricingPageList')}
${opt('src/content/blog/dental-rewrites.ts', 'dentalRewrites')}
${opt('src/content/blog/dental-keywords-a.ts', 'dentalKeywordPostsA')}
${opt('src/content/blog/dental-keywords-b.ts', 'dentalKeywordPostsB')}
${opt('src/content/blog/dental-keywords-c.ts', 'dentalKeywordPostsC')}
${opt('src/content/blog/dental-codes-a.ts', 'dentalCodesA')}
${opt('src/content/blog/dental-codes-b.ts', 'dentalCodesB')}
${opt('src/content/blog/dental-topics-a.ts', 'dentalTopicsA')}
${opt('src/content/blog/dental-topics-b.ts', 'dentalTopicsB')}
import * as dental from './src/content/dental';
import * as company from './src/content/company';
${hasPages ? "import { pages } from './src/content/pages';" : 'const pages = [];'}
${list(calcDir).map((s, i) => `import c${i} from './src/content/tools/calculators/${s}';`).join('\n')}
${list(refDir).map((s, i) => `import r${i} from './src/content/tools/reference/${s}';`).join('\n')}
export const data = {
  services: [...servicesPart1, ...servicesPart2, ...servicesPart3, ...servicesPart4, ...servicesPart5],
  serviceOverrides: [...dentalCoreA, ...dentalCoreB],
  specialties: [...medicalPart1, ...medicalPart2, ...moreSpecialties, ...dentalSpecialties],
  calculators: [${list(calcDir).map((_, i) => `c${i}`).join(', ')}],
  references: [${list(refDir).map((_, i) => `r${i}`).join(', ')}],
  blog: [...seedPosts, ...seedPosts2, ...seedPosts3, ...dentalKeywordPostsA, ...dentalKeywordPostsB, ...dentalKeywordPostsC, ...dentalCodesA, ...dentalCodesB, ...dentalTopicsA, ...dentalTopicsB],
  blogOverrides: dentalRewrites,
  pages,
  pageOverrides: [...dentalPageOverrides, ...areaPages, ...pricingPageList],
  dental: { ...dental },
  company: { CYCLE: company.CYCLE, HOME_FAQS: company.HOME_FAQS, GENERAL_FAQS: company.GENERAL_FAQS, COMPANY_FACTS: company.COMPANY_FACTS },
};
`;
const tmp = join(root, 'build/.tmp');
mkdirSync(tmp, { recursive: true });
const bundled = join(tmp, 'content.mjs');
await build({ stdin: { contents: entry, resolveDir: root, loader: 'ts' }, bundle: true, platform: 'node', format: 'esm', outfile: bundled, logLevel: 'warning' });
const { data } = await import(pathToFileURL(bundled).href + `?t=${Date.now()}`);
rmSync(tmp, { recursive: true, force: true });
const D = data.dental;

// 2. Dental-only filter (src/content/dental.ts): keep listed items, apply rewrites,
//    drop references to retired items and retarget links to retired URLs.
const override = (list, over, key) => {
  const map = new Map(over.map((x) => [x[key], x]));
  return list.map((x) => map.get(x[key]) ?? x).concat(over.filter((x) => !list.some((y) => y[key] === x[key])));
};
const keepOrder = (items, order, key) => order.map((k) => items.find((x) => x[key] === k)).filter(Boolean);
const keepRefs = (arr, kept) => (Array.isArray(arr) ? arr.filter((x) => kept.includes(x)) : arr);
const fixLinks = (html) => (typeof html === 'string' ? html.replace(/href="(\/[^"]*)"/g, (_, h) => `href="${D.retarget(h)}"`) : html);

const services = keepOrder(override(data.services, data.serviceOverrides, 'slug'), D.KEPT_SERVICES, 'slug').map((s) => ({
  ...s,
  relatedServices: keepRefs(s.relatedServices, D.KEPT_SERVICES),
  practiceTypes: keepRefs(s.practiceTypes, D.KEPT_SPECIALTIES),
  relatedTools: keepRefs(s.relatedTools, D.KEPT_TOOLS),
  core: D.CORE_SERVICES.some((c) => c.slug === s.slug),
  menuName: D.CORE_SERVICES.find((c) => c.slug === s.slug)?.name ?? s.name,
}));
const specialties = keepOrder(data.specialties, D.KEPT_SPECIALTIES, 'slug').map((s) => ({
  ...s,
  services: keepRefs(s.services, D.KEPT_SERVICES),
  relatedTools: keepRefs(s.relatedTools, D.KEPT_TOOLS),
}));
const allTools = [
  ...data.calculators.map(({ compute, ...rest }) => {
    if (typeof compute !== 'function') throw new Error(`${rest.slug}: compute missing`);
    return rest;
  }),
  ...data.references,
];
const tools = keepOrder(allTools, D.KEPT_TOOLS, 'slug').map((t) => ({
  ...t,
  relatedServices: keepRefs(t.relatedServices, D.KEPT_SERVICES),
  relatedTools: keepRefs(t.relatedTools, D.KEPT_TOOLS),
}));
const blog = keepOrder(override(data.blog, data.blogOverrides, 'slug'), D.KEPT_POSTS, 'slug').map((p) => ({
  ...p,
  category: D.POST_CATEGORY[p.slug] ?? p.category,
  slug: D.SLUG_RENAMES[p.slug] ?? p.slug,
  html: fixLinks(p.html),
}));
const pagesAll = override(data.pages, data.pageOverrides, 'key');
const pages = D.KEPT_PAGES.map((k) => pagesAll.find((p) => p.key === k) ?? (D.DRAFT_PAGES.includes(k) ? { key: k, title: k[0].toUpperCase() + k.slice(1), template: 'default', intro: '', body: '' } : null))
  .filter(Boolean)
  .map((p) => ({ ...p, body: fixLinks(p.body), status: D.DRAFT_PAGES.includes(p.key) ? 'draft' : 'publish' }));
const redirects = Object.entries(D.REDIRECTS).map(([from, to]) => ({ from, to }));

const write = (name, value) => writeFileSync(join(out, `${name}.json`), JSON.stringify(value));
write('services', services);
write('specialties', specialties);
write('tools', tools);
write('blog', blog);
write('pages', pages);
write('company', data.company);
write('redirects', redirects);
write('dental', { core: D.CORE_SERVICES, overview: D.OVERVIEW_SERVICES, software: D.SOFTWARE_SERVICES, specialties: D.KEPT_SPECIALTIES, dentalTools: D.DENTAL_TOOLS, dentalPosts: D.DENTAL_POSTS, categories: D.KEPT_CATEGORIES });
data.services = services;
data.specialties = specialties;

// 3. Icons: every icon named in content plus the ones templates use.
const TEMPLATE_ICONS = [
  'ArrowRight', 'ArrowUpRight', 'Check', 'CheckCircle2', 'ChevronDown', 'ChevronRight', 'Menu', 'X', 'Phone', 'Mail', 'MapPin', 'Search',
  'ShieldCheck', 'ShieldAlert', 'MessageSquare', 'Calculator', 'ClipboardCheck', 'BookOpen', 'Clock', 'CalendarCheck2', 'Building2', 'Users',
  'LineChart', 'Workflow', 'Lock', 'AlertTriangle', 'Info', 'ExternalLink', 'Send', 'Bot', 'Copy', 'Link2', 'Printer', 'RotateCcw',
  'FileText', 'Download', 'Sparkles', 'HeartPulse', 'Smile', 'Stethoscope', 'Briefcase', 'Handshake', 'Quote', 'Star', 'Circle', 'Layers',
  'Gauge', 'Target', 'Eye', 'Loader2', 'Download', 'Scale', 'Network', 'Server', 'KeyRound', 'FileCheck2', 'Wallet', 'Receipt', 'Clock3', 'ListChecks', 'Globe2', 'Paperclip',
];
const named = new Set(TEMPLATE_ICONS);
for (const x of [...services, ...specialties, ...tools]) if (x.icon) named.add(x.icon);
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
  `content: ${services.length} services, ${specialties.length} specialties, ${tools.length} tools, ${blog.length} posts, ${pages.length} pages, ${redirects.length} redirects, ${Object.keys(icons).length} icons` +
    (missing.length ? `\nMISSING ICONS: ${missing.join(', ')}` : ''),
);
if (missing.length) process.exitCode = 1;
