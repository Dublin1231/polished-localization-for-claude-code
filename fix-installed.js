const fs = require('fs');
const path = require('path');

// 读取出问题的安装目录下的 keyword.js，而不是当前目录下的！
const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
let content = fs.readFileSync(installedKeywordPath, 'utf8');

content = content.replace(/}\s*"Hatch/g, '},\n  "Hatch');
content = content.replace(/}\s*$/g, '');
if (!content.trim().endsWith(',')) {
  content = content.replace(/([^,]\s*)$/, '$1,\n');
}
content += '};\n';

fs.writeFileSync(installedKeywordPath, content, 'utf8');
console.log('Fixed installed keyword.js syntax!');

// 同时修复当前源码目录
const sourceKeywordPath = path.join(__dirname, 'localize', 'keyword.js');
fs.writeFileSync(sourceKeywordPath, content, 'utf8');
