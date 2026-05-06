@echo off
echo ========================================
echo   OPTION 1: Allow Secret on GitHub (EASIEST)
echo ========================================
echo.
echo Open this link and click "Allow":
echo https://github.com/lifegood779535-cmyk/market_analysis/security/secret-scanning/unblock-secret/3DKfHwbxIxP0hN3gbKtJum6rx5b
echo.
echo Then try pushing again:
echo   git push -u origin main --force
echo.
pause

cd /d "c:\Users\hp\Downloads\AI-MARKET-MAIN"

echo ========================================
echo   OPTION 2: Remove Secret from History
echo ========================================
echo.
echo Installing BFG Repo-Cleaner...

REM Download BFG
if not exist "bfg.jar" (
    powershell -Command "(New-Object System.Net.ServicePointManager).SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar', 'bfg.jar')"
)

echo Removing .env files from history...
java -jar bfg.jar --delete-files "*.env" --no-blob-protection

echo Garbage collecting...
git reflog expire --expire=now --all
git gc --aggressive --prune=now

echo Force pushing...
git push -u origin main --force

echo Done!