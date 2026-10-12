# Admin guide (training)

Everything lives under **RCM** in the WordPress admin menu.

## Roles

| Role | Can do |
|---|---|
| Administrator | Everything, including Settings, users, audit log, content sync |
| Sales Manager | Leads (all), export, AI chats, analytics |
| Support Agent | Leads assigned to them, AI chats, knowledge base |
| Content Editor | Pages, blog, services, specialties, tools, FAQs, knowledge base, SEO, analytics |

Add people at **Users > Add New** and pick the role. Everyone in a role listed under Settings > Security must set up two-factor authentication on first login.

## Leads (RCM > Leads)

- Every form (contact, consultation, proposal, careers, partner, newsletter, calculator "discuss results") and every AI chat creates a lead and emails the notification address.
- **Score** (0-100) follows documented rules: request type, provider count, claim volume, services, business email, phone, practice name, existing billing set-up, proposed date; chats add points when the visitor accepts a consultation or asks for a person. Bands: Hot 60+, Warm 35-59, Cold below 35.
- **Duplicates**: the same email within 180 days is linked to the first lead.
- Open a lead to change **status** (New, Contacted, Qualified, Proposal sent, Won, Lost), **assign** it, set a **follow-up date**, add **notes** and see the full **activity history** and any chats.
- **Export CSV** respects the filters you set. Exports are logged.
- Never paste patient information into notes.

## AI chats (RCM > AI Chats) and Knowledge Base

- Visitors give name, business email and consent before chatting. You get one email when a chat starts and one summary when it ends; the full transcript stays in the dashboard.
- Mark each chat **Good** or **Needs fix** and write what the assistant should have said.
- **Knowledge Base**: add *approved answers* (question + answer) and *policies*; they are always given to the assistant. Open flags list unanswered questions, handoffs, errors and withheld patient-information messages; turn an unanswered question into an approved answer with one click.
- The assistant only answers company questions from published pages and approved answers. It never quotes prices: pricing is given after a consultation. To publish pricing, add an approved answer.

## Content

- **Services, Specialties, RCM Tools** (under RCM): the summary is the excerpt; the "Page content" box holds the quick answer, introduction, scope, workflow steps, benefits, FAQs and related items. Calculator formulas are code; their wording, FAQs and assumptions are editable.
- **Pages**: company and legal pages use the block editor. Page templates (Contact, Consultation, Proposal, Careers, Partners, FAQs, Resources, Legal, Comparison, Campaign landing page) are chosen in the page sidebar.
- **FAQs** (RCM > FAQs): one post per question, grouped by topic; shown on the FAQ page.
- **Case studies, Testimonials, Integrations**: only appear on the site after you tick **Approved for publication** and fill the authorization record. Do not publish results or names without written permission.
- **Job openings**: listed on the Careers page while "Accepting applications" is ticked.

## Blog

Posts > Add New. Fill: title, content (H2/H3 structure), excerpt, category, tags, featured image with alt text, and the boxes below the editor:
- **SEO**: SEO title (60 characters), meta description (120-158), focus keyword, canonical, noindex.
- **Article details**: FAQs, sources (link authoritative sources: CMS, CDC, AMA, ADA, payers), reviewer, CTA (consultation, tools or none), internal link suggestions.
Schedule with Publish > Schedule. Verify regulatory and coding facts against official sources before publishing.

## SEO (RCM > SEO) and redirects

- The SEO screen lists every page with its title/description length, duplicates and noindex, with quick edit.
- Changing a slug creates a redirect automatically. Add redirects manually or import CSV under **Redirects & 404s**, which also shows the most-hit missing URLs.
- Sitemaps: `/wp-sitemap.xml`. AI crawler summaries: `/llms.txt`, `/llms-full.txt`.

## Analytics (RCM > Analytics)

First-party, privacy-friendly counts: visits, organic share, top pages, most-used tools, most-viewed services, leads by source, conversion rate, chat engagement, top articles. Unique visitors are only counted for visitors who accepted analytics cookies. Use GA4 and Search Console for fuller data.

## Settings and system

- **RCM > Settings**: contact details, notification email, AI assistant, retention, GA4/Search Console, MFA roles, login lockout, home page proof sections.
- **RCM > Content & System**: content sync, email and AI tests, scheduled jobs, table sizes.
- **RCM > Audit Log**: who did what and when; CSV export.
