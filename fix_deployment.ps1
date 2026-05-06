# Fix deployment script
Set-Location "c:\Users\hp\Downloads\AI-MARKET-MAIN\silly-ocelot-burst-main"
pnpm install
git add .
git commit -m "Update pnpm lockfile"
git push origin main
Write-Host "Changes pushed! Go to Vercel dashboard and redeploy."