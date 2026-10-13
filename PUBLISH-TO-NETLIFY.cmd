@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
 echo Please install Node.js LTS from https://nodejs.org then run this file again.
 pause
 exit /b 1
)
echo This publishes the website and calendar function to your Netlify account.
echo Your existing ChatGPT website will not be changed.
call npx --yes netlify-cli login
if errorlevel 1 goto failed
node scripts/build.mjs
if errorlevel 1 goto failed
call npx --yes netlify-cli deploy --prod --dir=production --functions=netlify/functions --no-build
if errorlevel 1 goto failed
echo Deployment finished. Open the Website URL displayed above.
pause
exit /b 0
:failed
echo Deployment did not complete. Review the message above, then try again.
pause
exit /b 1
