// Post-deploy smoke test. Checks every URL in the sitemap plus key routes for a complete render,
// not just HTTP 200: title, theme stylesheet, meta description, canonical, no PHP errors, no
// template placeholder text, and calculator pages that load their compute script.
// Usage: node build/smoke.mjs [https://rcm.texassolutions.co]
const base = (process.argv[2] || 'https://rcm.texassolutions.co').replace(/\/$/, '');
const PLACEHOLDERS = [/Discover Professional Insights/i, /Just Another WordPress Site/i, /Lorem ipsum/i, /Sample Page/i, /Hello world!/i];
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

console.log(`checked ${checked} URLs, ${failures.length} problem(s)`);
for (const f of failures) console.log(' - ' + f);
process.exitCode = failures.length ? 1 : 0;
