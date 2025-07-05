pm2 start ecosystem.config.js


rm -rf node_modules package-lock.json dist
npm install
npm run build