const fs = require('fs');
const path = require('path');
const sourcePath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(sourcePath, 'utf8');
content = content.replace(/}\s*"Build apps/g, '},\n  "Build apps');
content = content.replace(/}\s*$/g, '');
if (!content.trim().endsWith(',')) {
  content = content.replace(/([^,]\s*)$/, '$1,\n');
}
content += '};\n';
fs.writeFileSync(sourcePath, content, 'utf8');

const targetPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(targetPath, content, 'utf8');
console.log('Fully fixed syntax');
