# Testing report

Date: 2026-10-12. Environment: WordPress 7.1.3 on PHP 8.3 (WordPress Playground, SQLite) with the plugin and theme mounted; mock Gemini server (`build/dev/mock-gemini.mjs`).

## Automated

| Suite | Result |
|---|---|
| `npm test`: 36 calculators: worked example reproduced to 2 decimals; no NaN/Infinity/throw on zero, negative, huge and default inputs; all outputs declared; valid cross-references; SEO lengths | Pass |
| `npm test`: content: all 40 services and 37 specialties present with valid references; no unapproved claims (HIPAA compliant, guarantees, results percentages, hype words, em dashes); every internal link in pages and articles resolves | Pass (194 tests) |
| `tsc --noEmit` on all TypeScript | Pass |
| PHP syntax of every plugin/theme file (php-wasm 8.1/8.3) | Pass |

## Manual / integration (local WordPress)

| Area | Check | Result |
|---|---|---|
| Install | Plugin + theme activate; first admin visit imports 40 services, 37 specialties, 51 tools, 12 FAQs, 21 pages, 8 articles; front page and blog page set; site title set | Pass |
| Public pages | 43 URLs (home, archives, singles, all page templates, legal pages, search, robots.txt, llms.txt, sitemap) return 200 with no PHP warnings/notices; unknown URL returns 404 page | Pass |
| Admin screens | Overview, Leads, Lead detail, AI Chats, Chat detail, Knowledge Base, Analytics, SEO, Redirects, Audit Log, Settings, Content & System, CPT lists, post editor | Pass (no PHP errors) |
| MFA | Grace redirect to profile; TOTP enable with generated code; recovery codes shown once | Pass |
| Calculator | Default results computed in browser; editing an input recomputes (NCR 95% to 90%) | Pass |
| Lookups | ICD-10 (diabetes: 481 matches), HCPCS (wheelchair: 325), NPI (TX search) via REST proxy | Pass |
| Lead form | Consultation submission creates lead `L-...` with score and appears in Leads; message with DOB/member ID rejected with a clear error | Pass |
| Chat | Start with consent creates lead + session; answers include site knowledge (system prompt contains KNOWLEDGE); patient-info message withheld and never sent to the model; "talk to a person" sets handoff + unanswered flags; off-site links removed; wrong token rejected; end marks session ended; transcript, profile, flags and summary visible in admin | Pass |
| SEO | Service page: title, description, canonical, OG image, single H1, JSON-LD Organization/WebSite/WebPage/BreadcrumbList/Service/FAQPage | Pass |
| Responsive | Home at phone width and 1440px | Pass (visual check) |

## Not yet verified (requires the live site)

- Email delivery through WP Mail SMTP (Playground has no mail server; notifications are recorded as "not sent" and retried).
- Real Gemini responses (needs the owner's API key).
- MySQL-specific queries in Analytics (`JSON_EXTRACT`) on DreamHost MySQL/MariaDB.
- Lighthouse / Core Web Vitals and full WCAG audit on the production host with caching.
- Cross-browser check (Safari iOS, Firefox, Edge) on the live URL.

Run these after deployment using DEPLOYMENT.md step 7 and record results here.
