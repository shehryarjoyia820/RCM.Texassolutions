# Operations: backups, recovery, scheduled jobs, retention, monitoring

## Backups

| What | How | When |
|---|---|---|
| Whole site (files + database) | DreamHost automatic backups (panel > Websites > Backups) | Host schedule |
| Database export | DreamHost panel > MySQL Databases > phpMyAdmin > select the database > Export (SQL) | Before every plugin/theme update or content sync; at least monthly |
| Uploads | SFTP download of `wp-content/uploads/` | Monthly |
| Code | This Git repository and the released zips in `dist/` | Every release |

Store database exports outside the web root and outside email (they contain lead data). Delete old exports according to the retention policy.

### Restore

1. Put the site in maintenance (deactivate WP Super Cache, or upload a temporary `.maintenance` file).
2. phpMyAdmin > Import the SQL export (or ask DreamHost to restore a backup point).
3. Re-upload the plugin/theme zips that match the backup date if code also changed.
4. Clear the cache. Check the home page, RCM > Overview, a form submission and the chat.

Test a restore once on a staging copy (DreamHost one-click staging or a local Playground import) before relying on it.

## Scheduled jobs (WP-Cron)

| Hook | Frequency | Does |
|---|---|---|
| `rcm_chat_sweep` | every 15 min | Sends the end-of-chat summary for chats idle longer than the configured minutes; deletes chats older than the chat retention |
| `rcm_daily_maintenance` | daily | Deletes analytics events older than 400 days, audit entries older than 2 years, leads not updated within the lead retention |

WP-Cron runs when the site gets visits. For reliable timing, add a DreamHost cron job every 15 minutes: `wget -q -O - https://rcm.texassolutions.co/wp-cron.php?doing_wp_cron >/dev/null 2>&1` and add `define( 'DISABLE_WP_CRON', true );` to wp-config.php. RCM > Content & System shows the next run of each job.

## Retention defaults (RCM > Settings)

| Data | Default | Where |
|---|---|---|
| Leads, notes, activity | deleted 1,095 days (3 years) after the last update | rcm_leads |
| Chat transcripts | 365 days | rcm_chat_sessions/messages |
| First-party analytics events | 400 days | rcm_events |
| Audit log | 2 years | rcm_audit_log |

Keep the Privacy Policy in sync if these change.

## Monitoring

- **Email delivery**: RCM > Content & System > Send test email monthly. WP Mail SMTP has its own email log.
- **AI assistant**: RCM > Knowledge Base shows errors, unanswered questions and handoffs. RCM > Content & System > Test AI connection.
- **404s and redirects**: RCM > Redirects & 404s (top missing URLs, one-click redirect).
- **PHP errors**: DreamHost logs (`~/logs/rcm.texassolutions.co/https/error.log`). Enable `WP_DEBUG_LOG` only temporarily.
- **Uptime**: add the site to an uptime monitor (for example UptimeRobot free tier) with alerts to info@texassolutions.co.
- **Core Web Vitals**: Search Console > Experience; PageSpeed Insights for spot checks.
- **Security**: RCM > Audit Log (logins, lockouts, role changes, settings, exports, deletions).

## Incident response (summary)

1. Contain: disable the affected feature (e.g. untick the AI assistant in Settings), reset passwords, revoke sessions (Users > profile > Log Out Everywhere Else), rotate the Gemini key.
2. Investigate: Audit Log, server logs, recent changes.
3. Restore from backup if needed.
4. Notify affected parties as required by law; document what happened and the fix.
