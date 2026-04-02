const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

// Handle the multi-line warning precisely
const multiLineWarning = {
  "Make sure you trust a plugin before installing, updating, or using it. Anthropic \n    does not control what MCP servers, files, or other software are included in plugins \n     and cannot verify that they will work as intended or that they won't change. See \n    each plugin's homepage for more information.": "在安装、更新或使用插件前，请确保你信任该插件。Anthropic \n    无法控制插件中包含的 MCP 服务器、文件或其他软件，\n    也无法验证它们是否会按预期工作或是否会发生变化。\n    有关更多信息，请参阅每个插件的主页。",
  "Make sure you trust a plugin before installing, updating, or using it. Anthropic": "在安装、更新或使用插件前，请确保你信任该插件。Anthropic",
  "does not control what MCP servers, files, or other software are included in plugins": "无法控制插件中包含的 MCP 服务器、文件或其他软件，",
  "and cannot verify that they will work as intended or that they won't change. See": "也无法验证它们是否会按预期工作或是否会发生变化。请参阅",
  "each plugin's homepage for more information.": "每个插件的主页以获取更多信息。"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(multiLineWarning)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added fragmented disclaimer translations!');
