// Post-deploy smoke test. Checks every URL in the sitemap plus key routes for a complete render,
// not just HTTP 200: title, theme stylesheet, meta description, canonical, no PHP errors, no
// template placeholder text, and calculator pages that load their compute script.
// Usage: node build/smoke.mjs [https://rcm.texassolutions.co]
const base = (process.argv[2] || 'https://rcm.texassolutions.co').replace(/\/$/, '');
const PLACEHOLDERS = [/Discover Professional Insights/i, /Just Another WordPress Site/i, /Lorem ipsum/i, /Sample Page/i, /Hello world!/i];
import { readFileSync } from 'node:fs';
const REDIRECTS = JSON.parse(readFileSync(new URL('../wordpress/rcm-core/data/redirects.json', import.meta.url), 'utf8'));
const REDIRECTED = new Set(REDIRECTS.map((r) => r.from.replace(/\/?$/, '/')));
const PHP_ERRORS = /(Fatal error|Warning<\/b>|Notice<\/b>|Deprecated<\/b>|There has been a critical error)/i;

async function get(url) {
  const r = await fetch(url, { redirect: 'manual', headers: { 'User-Agent': 'RCM-smoke-test/1.0' } });
  return { status: r.status, location: r.headers.get('location'), body: r.status === 200 ? await r.text() : '' };
}

async function sitemapUrls() {
  const index = (await get(`${base}/wp-sitemap.xml`)).body;
  const maps = [...index.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const urls = new Set([`${base}/`]);
  for (const m of maps) for (const u of (await get(m)).body.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(u[1]);
  return [...urls];
}

const urls = await sitemapUrls();
const failures = [];
let checked = 0;
const queue = [...urls];
async function worker() {
  while (queue.length) {
    const url = queue.shift();
    const { status, body } = await get(url);
    checked++;
    const problems = [];
    if (status !== 200) problems.push(`HTTP ${status}`);
    else {
      if (!/<title>[^<]{5,}<\/title>/.test(body)) problems.push('missing title');
      if (!body.includes('rcm-theme/assets/css/site.css')) problems.push('theme stylesheet missing');
      if (!/<meta name="description" content="[^"]{50,}"/.test(body)) problems.push('missing/short meta description');
      if (!/<link rel="canonical" href="[^"]+"/.test(body)) problems.push('missing canonical');
      if (PHP_ERRORS.test(body)) problems.push('PHP error output');
      for (const p of PLACEHOLDERS) if (p.test(body)) problems.push(`placeholder text ${p}`);
      if ((body.match(/<h1[\s>]/g) || []).length !== 1) problems.push(`h1 count ${(body.match(/<h1[\s>]/g) || []).length}`);
      const calc = body.match(/data-rcm-calc="([^"]+)"/);
      if (calc && !body.includes(`assets/js/calc/${calc[1]}.js`)) problems.push(`calculator script not loaded for ${calc[1]}`);
      if (body.includes('data-rcm-calc') && !body.includes('assets/js/tools.js')) problems.push('tools.js not loaded');
      // Dental refocus checks.
      const title = (body.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
      if (/medical billing/i.test(title)) problems.push(`title mentions medical billing: ${title}`);
      for (const m of body.matchAll(/href="([^"#?]+)/g)) {
        let path;
        try {
          const u = new URL(m[1], base);
          if (u.origin !== new URL(base).origin) continue;
          path = u.pathname.replace(/\/?$/, '/');
        } catch {
          continue;
        }
        if (REDIRECTED.has(path)) problems.push(`links to redirected URL ${path}`);
      }
    }
    if (problems.length) failures.push(`${url}: ${problems.join('; ')}`);
  }
}
await Promise.all(Array.from({ length: 4 }, worker));

for (const [path, want] of [['/robots.txt', 200], ['/llms.txt', 200], ['/this-page-does-not-exist-smoke/', 404]]) {
  const { status } = await get(base + path);
  checked++;
  if (status !== want) failures.push(`${path}: expected ${want}, got ${status}`);
}

// Homepage specifics from the dental brief.
{
  const { body } = await get(`${base}/`);
  const kb = Buffer.byteLength(body) / 1024;
  if (kb >= 150) failures.push(`homepage HTML is ${kb.toFixed(0)} KB (limit 150)`);
  const title = (body.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  if (!title.includes('Dental Revenue Cycle Management (RCM)')) failures.push(`homepage title: ${title}`);
  const h1 = (body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1] || '';
  if (!/dental/i.test(h1)) failures.push('homepage h1 lacks "dental"');
  const nav = (body.match(/<nav aria-label="Main"[\s\S]*?<\/nav>/) || [''])[0];
  const links = (nav.match(/<a /g) || []).length + 2; // + logo + consultation button
  if (links >= 35) failures.push(`header has ${links} links`);
  console.log(`homepage ${kb.toFixed(0)} KB, header links ${links}`);
}
// Every retired URL: one 301 hop to a live page.
let hops = 0;
for (const r of REDIRECTS) {
  const res = await get(base + r.from);
  checked++;
  const want = new URL(r.to, base).href;
  if (res.status !== 301 || res.location !== want) {
    failures.push(`${r.from}: expected 301 to ${want}, got ${res.status} ${res.location}`);
    continue;
  }
  const t = await get(want);
  if (t.status !== 200) failures.push(`${r.from} -> ${want} returns ${t.status} (not one hop)`);
  else hops++;
}
console.log(`redirects: ${hops}/${REDIRECTS.length} one-hop 301s`);
// Site search must return nothing for non-dental terms.
for (const term of ['cardiology', 'ICD-10', 'CPT', 'Kareo']) {
  const { body } = await get(`${base}/?s=${encodeURIComponent(term)}`);
  checked++;
  if (!/(^|[^0-9])0 results/.test(body)) failures.push(`search "${term}" returned results`);
}

console.log(`checked ${checked} URLs, ${failures.length} problem(s)`);
for (const f of failures) console.log(' - ' + f);
process.exitCode = failures.length ? 1 : 0;
