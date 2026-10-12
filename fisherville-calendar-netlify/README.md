# Fisherville Calendar, Netlify only

## Simplest Windows setup

1. Extract this ZIP to a folder on your computer.
2. Install the LTS version of Node.js from https://nodejs.org using its normal Windows installer. This is a free tool on your computer, not another hosting account. Close and reopen any terminal after installation.
3. Create a Netlify account or sign in at https://app.netlify.com.
4. Double click PUBLISH-TO-NETLIFY.cmd in the extracted folder.
5. A browser opens for Netlify login. Approve the Netlify CLI login for your own account, then return to the command window.
6. If asked about the folder not being linked to a site, choose to create and configure a new site. Select your Netlify team and enter an available site name such as fisherville-calendar. If you already created the intended Netlify site, choose to link that existing site instead.
7. Wait for publication. Open the Website URL shown in the command window. Confirm the sync timestamp appears.

No configuration URL editing is required. No Cloudflare account, GitHub repository, Google API key or original hosted service is needed. The script downloads the official Netlify CLI and uploads BOTH the website and its calendar function. Keep this folder, including the .netlify folder created by the CLI, so subsequent publishes target the same site. The script publishes publicly on your selected Netlify site. The original running website is not modified.

Do not use Netlify Drop for this package: uploading only production would omit the calendar function. The included script is the complete deployment route. Free plan usage limits apply, including function invocations and data transfer; monitor Usage in Netlify. Free hosting cannot guarantee indefinite service.

## Daily use

Edit events in Google Calendar as usual. No upload is needed for event changes. The page loads all four configured calendars on startup and polls every five minutes while the computer/browser are running. Google may delay publishing edits to its public feed. Clock uses Toronto time, weather refreshes every fifteen minutes, and the date updates at midnight within one minute. All day events remain pinned; overflow timed events loop; upcoming multi day entries are grouped. The Edit button stays hidden.

Open the new website on the TV computer, use 1920 by 1080 resolution and browser zoom 100 percent, then press F11. Keep the computer awake while plugged in. Set the browser startup page to the new URL. Network failures keep previously loaded calendar events and retry on the next polling interval or reconnection. An offline browser restart cannot load events until connectivity returns.

## Maintain or update the website

Editable files are in source. Ready built static files are in production. Calendar IDs, weather location and manually configured events are in source/config.js. The function is netlify/functions/calendar-feed.mjs. It requests public Google ICS feeds and restricts requests to the four configured calendar IDs. To add a calendar, update BOTH config.js and the function allowlist. Calendar colours are the preserved seven colour palette, not category based. Day 1 to Day 5 is read from the configured day cycle calendar rather than calculated blindly across holidays. Fonts and emoji use the original system fonts; all image assets and ICAL library are bundled.

After source changes, run PUBLISH-TO-NETLIFY.cmd again. It rebuilds production and publishes to the linked project. For manual commands: `npm run build`, `npm test`, `npx netlify-cli login`, then `npx netlify-cli deploy --prod --dir=production --functions=netlify/functions --no-build`. No npm install is needed for build/tests. The deployment CLI itself is downloaded by npx. Current Node LTS is recommended.

## Troubleshooting

If calendar requests return 404, the function was omitted during deployment. Run the supplied script instead of dragging files into Netlify. If the function returns 403, the requested calendar is absent from its allowlist. If it returns 502, Google may be unavailable or the calendar is no longer public. Check function logs in your Netlify project. All four calendars were publicly readable during preparation. Maintain their current sharing permissions; never publish private keys or secret calendar URLs. A private calendar requires a different authenticated backend.

The export includes the four calendars configured in source. Browser only additions cannot be recovered here; configuration/BROWSER_SETTINGS.md explains how to transfer those if needed. Calendar data is live, not a frozen copy. No school calendars were modified to test this export.

## Verification limits

Build, syntax, assets, five minute interval, recurring changes/cancellations, all day ranges, Toronto conversion, proxy error handling and actual Google feed requests were tested. See tests. This is not yet deployed to your Netlify account, so Netlify routing/runtime, physical TV rendering and an overnight browser memory test remain unverified. Once deployed, check a temporary event addition, edit and deletion after sync, a network disconnect/reconnect, and the actual 1080p screen. No claim of visual browser verification is made.

Official references:
https://docs.netlify.com/build/functions/get-started/
https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/
