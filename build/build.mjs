// Full build: content JSON, JS bundles, CSS.
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const run = (cmd) => execSync(cmd, { cwd: root, stdio: 'inherit' });

run('node build/export-content.mjs');
run('node build/build-js.mjs');
run('npx tailwindcss -c build/tailwind.config.cjs -i build/theme.css -o wordpress/rcm-theme/assets/css/site.css --minify');
console.log('build complete');
