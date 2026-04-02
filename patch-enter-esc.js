const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const moreBottomHints = {
  // Enter to select · Esc to back
  "Enter to select · Esc to back": "Enter 选择 · Esc 返回",
  "Enter to select": "Enter 选择",
  "Esc to back": "Esc 返回",
  
  // A few more common variations
  "Enter to open · Esc to back": "Enter 打开 · Esc 返回",
  "Enter to confirm": "Enter 确认"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(moreBottomHints)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added Enter/Esc bottom hints!');
