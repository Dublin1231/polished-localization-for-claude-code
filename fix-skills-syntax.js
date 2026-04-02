const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

// 修复刚刚添加的 missingSkills 语法错误
content = content.replace(/}\s*"Build apps/g, '},\n  "Build apps');

fs.writeFileSync(keywordPath, content, 'utf8');
console.log('Fixed syntax error in skills patch');
