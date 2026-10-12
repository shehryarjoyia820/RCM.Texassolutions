# Texas Solutions RCM

Source for **rcm.texassolutions.co**: a custom WordPress theme and the **RCM Core** plugin (no page builder), plus the content sources and build tooling.

| Path | What it is |
|---|---|
| `wordpress/rcm-core/` | Plugin: content types, structured editors, importer, 36 calculators, ICD-10/HCPCS/NPI lookups, checklists and guides, lead CRM, AI assistant, SEO, redirects, MFA and security, analytics, audit log, admin dashboard |
| `wordpress/rcm-theme/` | Theme: all templates, header/footer, page templates, styles |
| `src/content/` | Content sources (services, specialties, calculators with tested formulas, reference tools, pages, blog seed) |
| `src/js/` | Front-end and admin scripts (TypeScript, bundled by esbuild) |
| `build/` | Build, packaging, local WordPress blueprint, mock Gemini server |
| `tests/` | Calculator formula and content integrity tests (Vitest) |
| `docs/` | Architecture, deployment, operations, admin guide, security, testing, costs, roadmap |

## Quick start

```bash
npm install
npm run build      # content JSON, JS bundles, CSS
npm test           # 194 tests: calculator examples, edge cases, content rules, links
npm run package    # dist/rcm-core-<v>.zip and dist/rcm-theme-<v>.zip
```

Local WordPress (WordPress Playground, PHP 8.3, with a mock Gemini server for the chat): run `dev-wp.cmd`, then open http://127.0.0.1:9400 (test login `admin` / `password`; local only).

## Documentation

- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md): how the plugin and theme fit together, conventions, capabilities
- [docs/FRONTEND.md](docs/FRONTEND.md): CSS components, JS bundles, REST API
- [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md): first install on DreamHost, updates, rollback
- [docs/OPERATIONS.md](docs/OPERATIONS.md): backups and recovery, cron, retention, monitoring
- [docs/ADMIN-GUIDE.md](docs/ADMIN-GUIDE.md): training guide for the team (leads, chats, content, blog, SEO, users)
- [docs/SECURITY.md](docs/SECURITY.md): security configuration summary and HIPAA scope
- [docs/TESTING.md](docs/TESTING.md): test report
- [docs/COSTS.md](docs/COSTS.md): recurring infrastructure and API costs
- [docs/ROADMAP.md](docs/ROADMAP.md): known limitations, items needing owner approval, future enhancements
- [docs/CONTENT-GUIDE.md](docs/CONTENT-GUIDE.md): claims rules and writing style

No passwords, API keys or private credentials are stored in this repository.
