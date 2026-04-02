const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const discoverUI = {
  // Discover UI
  "Discover plugins (": "发现插件 (",
  "⌕ Search…": "⌕ 搜索…",
  "type to search · Space to toggle · Enter to details · Esc to back": "输入进行搜索 · Space 切换 · Enter 查看详情 · Esc 返回",
  " installs": " 次安装",
  " installs ": " 次安装 "
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(discoverUI)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added Discover UI translations!');
