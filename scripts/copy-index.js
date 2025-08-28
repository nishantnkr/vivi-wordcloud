// scripts/copy-index.js
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist');
const index = path.join(dist, 'index.html');

if (!fs.existsSync(dist) || !fs.existsSync(index)) {
  console.error('dist or index.html not found. Run build first.');
  process.exit(1);
}

['client', 'signage'].forEach(dir => {
  const dest = path.join(dist, dir);
  if (!fs.existsSync(dest)) fs.mkdirSync(dest);
  fs.copyFileSync(index, path.join(dest, 'index.html'));
});

console.log('Copied index.html to dist/client and dist/signage');
