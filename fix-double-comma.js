const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(sourcePath, 'utf8');
content = content.replace(/,\n,\n/g, ',\n');

fs.writeFileSync(sourcePath, content, 'utf8');

const targetPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(targetPath, content, 'utf8');
console.log('Fixed double comma syntax error!');
