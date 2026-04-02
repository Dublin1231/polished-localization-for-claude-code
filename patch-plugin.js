const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const pluginCommands = {
  // /plugin menu text
  "Claude Code Plugins": "Claude Code 插件",
  "Manage Claude Code plugins": "管理 Claude Code 插件",
  "Discover, install, and configure plugins": "发现、安装和配置插件",
  "Search plugins...": "搜索插件...",
  "Installed": "已安装",
  "Available": "可用",
  "Updates": "更新",
  "No plugins installed": "未安装任何插件",
  "No plugins available": "没有可用的插件",
  "Install": "安装",
  "Uninstall": "卸载",
  "Update": "更新",
  "Configure": "配置",
  "Enable": "启用",
  "Disable": "禁用",
  "Author": "作者",
  "Version": "版本",
  "Description": "描述",
  "Dependencies": "依赖项",
  "Marketplace": "市场",
  "Add marketplace": "添加市场",
  "Remove marketplace": "移除市场",
  "Reload marketplaces": "重新加载市场",
  "View plugin details": "查看插件详情",
  "Open plugin homepage": "打开插件主页",
  "Are you sure you want to uninstall": "你确定要卸载吗",
  "Are you sure you want to remove marketplace": "你确定要移除市场吗",
  "Successfully installed": "成功安装",
  "Successfully uninstalled": "成功卸载",
  "Successfully updated": "成功更新",
  "Failed to install": "安装失败",
  "Failed to uninstall": "卸载失败",
  "Failed to update": "更新失败",
  "Invalid plugin": "无效的插件",
  "Plugin already installed": "插件已安装",
  "Plugin not found": "找不到插件",
  "Loading plugins...": "正在加载插件...",
  "Updating plugins...": "正在更新插件...",
  "[Community Managed]": "【社区管理】",
  "[open-world]": "【开放世界】",
  "[read-only]": "【只读】",
  "[destructive]": "【破坏性】",
  "(p to expand)": "（按 p 展开）",
  "(tab to cycle)": "（按 tab 切换）"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(pluginCommands)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added /plugin menu UI translations!');
