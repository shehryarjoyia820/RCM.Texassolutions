# Security configuration summary

## Scope

The public website is a marketing and lead-generation site. It is **not** a system for patient records and must not receive Protected Health Information (PHI). It is not described as HIPAA compliant. If a future workflow needs PHI (client portal, file exchange), a formal risk assessment, Business Associate Agreements with every vendor in the path, eligible infrastructure and the required safeguards must come first.

PHI controls on the site:
- Every form and the chat show a "do not share patient information" notice.
- Form messages and chat messages are checked for patterns that look like patient data (dates of birth, member/MBI/MRN numbers, SSNs, "patient name ..."). Forms reject them; the chat withholds the message, never sends it to the AI provider and stores only a placeholder plus a flag.
- Emails contain business contact details and summaries only; chat transcripts are never emailed.
- Analytics never receive form or chat text; event properties containing emails or long digit strings are dropped.

## Controls implemented

| Area | Control |
|---|---|
| Transport | HTTPS (DreamHost certificate); HSTS header |
| Authentication | WordPress passwords + TOTP two-factor (RFC 6238) with 10 single-use recovery codes; enforced per role with a grace redirect so nobody is locked out; TOTP secrets encrypted at rest (libsodium secretbox, key derived from WordPress salts) |
| Brute force | Per-account and per-IP lockout after configurable failed attempts; generic login errors; lockouts audited |
| Authorization | Role-based capabilities (Administrator, Sales Manager, Support Agent, Content Editor); support agents limited to assigned leads; every admin action checks capability + nonce |
| Input | Server-side validation and sanitization on every field; prepared SQL statements; output escaping; honeypot + minimum fill time on forms; rate limits on forms (8/10 min), chat start (5/30 min), chat messages, lookups (60/min) and analytics events |
| API endpoints | REST nonces on lead and chat requests (with a refresh endpoint because pages are cached); chat sessions authorized by a random token stored only as a SHA-256 hash; AI links restricted to same-site paths |
| Secrets | Gemini key can live in wp-config.php (`RCM_GEMINI_API_KEY`), never in the repository or front-end code; stored setting shown masked |
| Hardening | XML-RPC disabled; REST user enumeration and `?author=` enumeration blocked; WordPress version hidden; X-Content-Type-Options, Referrer-Policy, X-Frame-Options, Permissions-Policy headers |
| Audit | Logins, logouts, lockouts, MFA events, role changes, user deletion, publishing/unpublishing, settings changes, lead status/assignment/notes/exports/deletions, chat reviews and deletions, knowledge base edits, redirects, plugin/theme changes; retained 2 years; CSV export |
| Data retention | Configurable deletion of leads, chats and analytics events (OPERATIONS.md) |
| Dependencies | No third-party PHP libraries. Front-end built from TypeScript with no runtime dependencies. Run `npm audit` before each release; keep WordPress core and the remaining plugins updated (auto-updates recommended for minor releases). |
| Backups | Host backups + database exports before changes (OPERATIONS.md) |

## Owner actions

1. Use a password manager; unique strong passwords for every admin.
2. Remove unused admin accounts; give staff the lowest role that works.
3. Put the Gemini key in wp-config.php rather than the settings screen.
4. Configure WP Mail SMTP with an authenticated sender on the texassolutions.co domain (SPF, DKIM, DMARC).
5. Keep a copy of your MFA recovery codes offline.
