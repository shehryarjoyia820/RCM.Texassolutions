# Known limitations, owner decisions and roadmap

## Needs owner input or approval (not published until provided)

1. **Pricing**: no prices are published; the assistant says pricing follows a consultation. Add approved pricing as a Knowledge Base "approved answer" and on a page if desired.
2. **Client results, case studies, testimonials, integrations, certifications**: the content types exist; nothing shows until an item is approved with an authorization record.
3. **Legal pages**: written to match what the site actually does (forms, chat with Google Gemini, cookies, retention). Have them reviewed by counsel before launch. Confirm: newsletter emails will carry an unsubscribe link; the info@ mailbox provider; lead retention counted from last activity.
4. **Industry facts** in service/specialty pages and articles (Medicare timely filing, appeal deadlines, No Surprises Act details, PDGM, therapy thresholds, CMS-0057-F dates) were written carefully but should get a billing/compliance review.
5. **Business hours, response times, team size**: intentionally not stated.
6. **Hosting choice**: the brief preferred Next.js on Vercel; WordPress on DreamHost was chosen by the owner. All modules are implemented in WordPress.

## Deliberately excluded (licensing or scope)

- **CPT and CDT code reference**: descriptors are licensed by the AMA and ADA. Can be added with a licence.
- **Medicare Physician Fee Schedule lookup**: CMS files include CPT descriptors (AMA licence). Can be added for HCPCS Level II codes only, or with a licence.
- **CARC/RARC verbatim texts**: X12 licenses the official wording; the denial reasons guide explains codes in our own words.
- **PHI workflows / client portal**: out of scope for the public site (see SECURITY.md).
- **Calendar booking**: the consultation form collects a preferred date; a booking tool (e.g. Calendly, Microsoft Bookings) can be embedded once chosen.

## Known limitations

- Analytics unique visitors and conversion rate count only visitors who accepted analytics cookies.
- Rate limits are stored in WordPress transients (per site), not at the network edge; add a WAF (DreamHost or Cloudflare) for stronger protection.
- WP-Cron depends on traffic unless a server cron is configured (OPERATIONS.md).
- NPI name search returns whatever the NPPES API matches (it also matches other names on file).
- The AI assistant quality depends on the Gemini model; review chats weekly in the first month.
- Automated AI blog writing is not enabled; the CMS stores sources, reviewer and FAQs so a future pipeline can draft posts as drafts for human approval.

## Future enhancements

- CRM integrations (HubSpot/Zoho/Salesforce) via the `rcm_lead_created` action hook.
- AI content pipeline (topic research, duplicate-intent check, drafts with sources, image generation) publishing to Draft only.
- Downloadable PDF guides behind the "resource" lead form.
- Client portal with BAA-covered infrastructure.
- Spanish-language pages.
