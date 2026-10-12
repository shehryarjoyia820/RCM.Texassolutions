"""Create installable zips for WordPress (Plugins > Add New > Upload, Appearance > Themes > Upload).

Run after `npm run build` (or use `npm run package`, which does both).
Outputs dist/rcm-core-<version>.zip and dist/rcm-theme-<version>.zip with forward-slash paths.
"""
import os
import re
import sys
import zipfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, 'dist')
SKIP_DIRS = {'.git', 'node_modules', '__pycache__'}
SKIP_FILES = {'.DS_Store', 'Thumbs.db'}

REQUIRED = {
    'rcm-core': ['rcm-core.php', 'assets/js/site.js', 'assets/js/tools.js', 'assets/js/admin.js', 'data/services.json', 'data/tools.json', 'data/icons.json'],
    'rcm-theme': ['style.css', 'functions.php', 'assets/css/site.css', 'assets/fonts/inter.woff2'],
}


def version(slug: str) -> str:
    main = os.path.join(ROOT, 'wordpress', slug, 'rcm-core.php' if slug == 'rcm-core' else 'style.css')
    with open(main, encoding='utf-8') as f:
        m = re.search(r'^\s*\*?\s*Version:\s*([\w.\-]+)', f.read(), re.M)
    return m.group(1) if m else '0.0.0'


def pack(slug: str) -> str:
    src = os.path.join(ROOT, 'wordpress', slug)
    missing = [p for p in REQUIRED[slug] if not os.path.exists(os.path.join(src, p))]
    if missing:
        sys.exit(f'{slug}: missing build output {missing}. Run `npm run build` first.')
    os.makedirs(DIST, exist_ok=True)
    out = os.path.join(DIST, f'{slug}-{version(slug)}.zip')
    count = 0
    with zipfile.ZipFile(out, 'w', zipfile.ZIP_DEFLATED) as z:
        for base, dirs, files in os.walk(src):
            dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
            for name in files:
                if name in SKIP_FILES:
                    continue
                full = os.path.join(base, name)
                rel = os.path.relpath(full, src).replace(os.sep, '/')
                z.write(full, f'{slug}/{rel}')
                count += 1
    print(f'{out} ({count} files, {os.path.getsize(out) // 1024} KB)')
    return out


if __name__ == '__main__':
    pack('rcm-core')
    pack('rcm-theme')
