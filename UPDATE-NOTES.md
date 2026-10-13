# Calendar readability update

Three fixed slots per day. Additional events scroll together, including all day events, with hidden scrollbars. Calendar colours are assigned by the original source ID. Sports and Team is included once. Timed events show start times only. Lunch entries use one ice blue colour with larger centred text; the image date is hidden and the image fills its available height.

To update an existing GitHub connected Netlify site, replace the repository files with this package contents, keeping netlify.toml at the repository root. Commit the changes; Netlify builds automatically. The production folder alone does not include the required calendar function. The included publishing command deploys both production and the function.

Validation: JavaScript syntax, production build, recurring changes and cancellations, all day ranges, Toronto conversion, three slot sizing and source ordering were checked. All five public Google feeds responded successfully, including Sports and Team. Browser visual testing at 1920 by 1080 and testing in your own Netlify account were unavailable. Check the TV after deployment, particularly long titles and lunch entries.

Upcoming Events shows up to ten all day events after the displayed two weeks, using the existing 90 day lookahead. The previous ten day restriction is removed. TDSB entries are included except Day 1 to Day 5. The main calendar is unchanged.
