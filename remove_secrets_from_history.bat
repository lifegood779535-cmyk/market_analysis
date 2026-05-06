@echo off
echo Removing secrets from entire git history...
cd /d "c:\Users\hp\Downloads\AI-MARKET-MAIN"

echo Removing .env from all commits...
git filter-branch -f --tree-filter "rm -f silly-ocelot-burst-main/.env backend/.env" -- --all

echo Garbage collecting...
git reflog expire --expire=now --all
git gc --aggressive --prune=now

echo Force pushing to GitHub...
git push -u origin main --force

echo Done! All secrets removed from history.