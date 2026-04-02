const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

// 修复语法错误
content = content.replace(/}\s*"Hatch/g, '},\n  "Hatch');
content = content.replace(/}\s*$/g, '');
if (!content.trim().endsWith(',')) {
  content = content.replace(/([^,]\s*)$/, '$1,\n');
}

fs.writeFileSync(keywordPath, content, 'utf8');
console.log('Fixed syntax error in keyword.js');
