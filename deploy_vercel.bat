@echo off
echo 🚀 Deploying AI Market App to Vercel...
echo.

cd silly-ocelot-burst-main

echo 📦 Installing dependencies...
npm install

echo 🔧 Building project...
npm run build

echo 🌐 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo Your app should be live at the URL shown above.
pause