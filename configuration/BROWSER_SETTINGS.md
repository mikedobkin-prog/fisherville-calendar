# Optional transfer of browser only data

Use this only if you added settings or manual events in the original site's browser. This does not modify that site. On the original dashboard in that browser, open Developer Tools, Console, and run the code in export-browser-settings.js after reading it. It downloads a JSON copy of calendar selections, manual events, photos, album and weather. It deliberately excludes API keys and tokens. Treat the file as potentially private. Do not publish it unchanged.

Review its calendars, events and weather fields and copy any needed values to source/config.js, preserving the new calendarProxyUrl. Add additional public calendar IDs to the Netlify function allowlist. To transfer photos and album, add those fields to config.js (the exported app already reads these optional fields). Keep photos local or use independently hosted assets, and confirm consent before publishing them. Rebuild production afterward.

If you made no browser only changes, use the included defaults. Existing Google calendar entries themselves need no transfer.
