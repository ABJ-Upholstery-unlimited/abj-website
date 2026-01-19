@echo off
echo ========================================================
echo   ABJ WEBSITE - PUBLISHING UPDATES TO LIVE INTERNET
echo ========================================================
echo.
echo 1. Checking for new files (Images, Text changes)...
git add .
echo.

echo 2. Saving changes...
git commit -m "Content update by user"
echo.

echo 3. Uploading to Cloud (This may take a minute)...
git push
echo.

echo ========================================================
echo   SUCCESS! 
echo   Your changes have been sent to the cloud.
echo   Please wait 2-3 minutes for the website to update.
echo ========================================================
echo.
pause
