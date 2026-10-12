# Recurring infrastructure and API costs

| Item | Needed for | Cost basis | Notes |
|---|---|---|---|
| DreamHost hosting | The website | Existing plan | Already paid for texassolutions.co subdomains |
| Domain texassolutions.co | DNS | Existing | No change |
| Google Gemini API | AI assistant | Usage-based (per token); a free tier exists with limits | Pricing: https://ai.google.dev/pricing. Each chat message sends the relevant knowledge (up to about 40,000 characters) plus the conversation, so cost scales with chat volume. Set a budget alert in Google Cloud. The assistant is off until a key is added. |
| Transactional email (via WP Mail SMTP) | Lead and chat notifications | Free tiers available from most providers (e.g. Brevo, SendLayer, Mailgun); paid above volume limits | Configure in WP Mail SMTP. Without it, WordPress's default mail may land in spam. |
| Google Analytics 4, Search Console, Bing Webmaster | Analytics and SEO | Free | Optional; GA4 loads only after consent |
| NLM Clinical Tables, CMS NPPES API | ICD-10, HCPCS, NPI lookups | Free public APIs | Results cached for 24 hours |
| Uptime monitoring | Alerts | Free tiers available | Optional |
| CPT / CDT content | Not used | AMA / ADA licences would be required | Deliberately excluded (see ROADMAP.md) |

No other paid services are required by the code.
