@echo off
echo Switching to new GitHub repository...
cd /d "c:\Users\hp\Downloads\AI-MARKET-MAIN"
git remote set-url origin https://github.com/lifegood779535-cmyk/market_analysis.git
echo Pushing to new repository...
git push -u origin main
echo Done! Project pushed to new repository.