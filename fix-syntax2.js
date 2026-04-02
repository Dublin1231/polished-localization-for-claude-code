const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');
// Fix missing comma and brace
if (!content.includes('module.exports = {')) {
  content = 'module.exports = {\n' + content;
}
if (!content.trim().endsWith('}')) {
  content = content.replace(/,?\s*$/, '\n};\n');
}

fs.writeFileSync(keywordPath, content, 'utf8');
console.log('Final syntax check applied');
