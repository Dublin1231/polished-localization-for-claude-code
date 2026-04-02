const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const moreBottomHints = {
  // Precise extractions
  "Press ↑↓ to navigate · Enter to select · Esc to go back": "按 ↑↓ 导航 · Enter 选择 · Esc 返回",
  "Enter to select · Esc to continue": "Enter 选择 · Esc 继续",
  "Enter to select · ": "Enter 选择 · ",
  "Enter to select ·": "Enter 选择 ·"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(moreBottomHints)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added precise Enter/Esc bottom hints!');
