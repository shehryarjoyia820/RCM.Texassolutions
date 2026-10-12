# Deployment and rollback

The site runs on WordPress at DreamHost (`rcm.texassolutions.co`, PHP 8.3). The main site texassolutions.co and dispatch.texassolutions.co are separate and are not touched by anything below.

## 1. Build the packages

```bash
npm install
npm test
npm run package
```

This creates `dist/rcm-core-<version>.zip` and `dist/rcm-theme-<version>.zip`. Keep every released zip (they are your rollback copies).

## 2. First install

1. **Back up first** (DreamHost panel > Websites > rcm.texassolutions.co > Backups, or phpMyAdmin export). See OPERATIONS.md.
2. WordPress admin > **Plugins > Add New > Upload Plugin** > `rcm-core-<v>.zip` > Install > **Activate**.
3. **Appearance > Themes > Add New > Upload Theme** > `rcm-theme-<v>.zip` > Install > **Activate**.
4. Open **RCM** in the admin menu. The first visit imports all bundled content (about a minute): 40 services, 37 specialties, 51 tools, FAQs, 20 company and legal pages, blog categories and 8 articles, and sets the home page and blog page.
5. Two-factor authentication is optional (owner decision). Each admin can turn it on under Users > Profile; enforce it per role in RCM > Settings > Security.
6. **RCM > Settings**:
   - Contact details and the lead notification email (default info@texassolutions.co).
   - AI assistant: paste the Google Gemini API key, or better, add to `wp-config.php` (via SFTP):
     `define( 'RCM_GEMINI_API_KEY', 'your-key' );`
   - GA4 measurement ID and Search Console verification code.
7. **RCM > Content & System**: press **Send test email** (must arrive at the notification address; configure WP Mail SMTP if it does not) and **Test AI connection**.
8. **Settings > Reading**: make sure "Discourage search engines" is unticked when you are ready to go live.
9. Deactivate plugins the site no longer needs (after confirming): WPForms Lite (forms are built in), Hello Dolly, Extendify and Site Assistant (host onboarding). Keep WP Mail SMTP, WP Super Cache, EWWW Image Optimizer and Akismet as you prefer.
10. **WP Super Cache**: exclude `/wp-json/` (it is excluded by default) and leave "Don't cache pages for known users" on. Clear the cache after every update.
11. Remove WordPress sample content if unwanted (Sample Page, Hello world!).
12. Submit `https://rcm.texassolutions.co/wp-sitemap.xml` in Google Search Console and Bing Webmaster Tools.

## 3. Updating

1. Back up the database.
2. Build new zips with a higher `Version:` in `rcm-core.php` / `style.css`.
3. Upload the zip again (WordPress offers "Replace current with uploaded"). Or with SFTP, replace the folder `wp-content/plugins/rcm-core` / `wp-content/themes/rcm-theme`.
4. If content in `src/content` changed: **RCM > Content & System > Run content sync**. Items edited in WordPress are kept unless "Overwrite" is ticked.
5. Clear WP Super Cache. Spot check: home, a service, a calculator, the contact form, the chat.

## 4. Rollback

- **Code**: upload the previous zip with "Replace current with uploaded" (or restore the previous folder over SFTP). Database tables are only ever added to, never dropped, so an older plugin version runs on a newer database.
- **Content or settings**: restore the database backup taken before the change (OPERATIONS.md).
- **Emergency**: rename `wp-content/plugins/rcm-core` over SFTP to disable the plugin; the theme then shows a notice instead of failing.

## 5. Why not Vercel

The brief preferred Next.js on Vercel. The owner moved the subdomain to WordPress on DreamHost so the team can edit content without a developer. Every required module is implemented inside WordPress instead (see docs/ROADMAP.md for the few items that need owner decisions). The earlier Next.js prototype is kept on the `nextjs-prototype` branch.
