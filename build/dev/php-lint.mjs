// Syntax-checks every PHP file in the plugin and theme with PHP 8.3 (WebAssembly), since the
// host has no PHP. Usage: node build/dev/php-lint.mjs
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { loadNodeRuntime } from '@php-wasm/node';
import { PHP } from '@php-wasm/universal';

const root = new URL('../../', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');
const files = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) {
      if (f !== 'node_modules') walk(p);
    } else if (f.endsWith('.php')) files.push(p);
  }
};
walk(join(root, 'wordpress'));

const php = new PHP(await loadNodeRuntime('8.3', { emscriptenOptions: { processId: 1 } }));
let bad = 0;
for (const f of files) {
  php.writeFile('/tmp/lint.php', readFileSync(f));
  const r = await php.run({
    code: '<?php try { token_get_all(file_get_contents("/tmp/lint.php"), TOKEN_PARSE); echo "ok"; } catch (\\ParseError $e) { echo "line " . $e->getLine() . ": " . $e->getMessage(); }',
  });
  if (r.text !== 'ok') {
    bad++;
    console.log(`${relative(root, f)}: ${r.text}`);
  }
}
console.log(`${files.length} PHP files, ${bad} with syntax errors`);
process.exit(bad ? 1 : 0);
