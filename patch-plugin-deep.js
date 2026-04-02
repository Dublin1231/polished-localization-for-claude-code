const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const pluginDeepDetails = {
  // Tabs
  "Plugins": "插件",
  "Discover": "发现",
  "Marketplaces": "市场",
  "Errors": "错误",
  
  // Headers
  "Plugin details": "插件详情",
  
  // Scopes & Actions
  "Install for you (user scope)": "为你安装（用户范围）",
  "Install for all collaborators on this repository (project scope)": "为该仓库的所有协作者安装（项目范围）",
  "Install for you, in this repo only (local scope)": "仅为你在此仓库中安装（本地范围）",
  "Open homepage": "打开主页",
  "Back to plugin list": "返回插件列表",
  
  // Disclaimer
  "Make sure you trust a plugin before installing, updating, or using it. Anthropic does not control what MCP servers, files, or other software are included in plugins and cannot verify that they will work as intended or that they won't change. See each plugin's homepage for more information.": "在安装、更新或使用插件前，请确保你信任该插件。Anthropic 无法控制插件中包含的 MCP 服务器、文件或其他软件，也无法验证它们是否会按预期工作或是否会发生变化。有关更多信息，请参阅每个插件的主页。",
  
  // Known Official Plugins descriptions
  "SAPUI5 / OpenUI5 plugin for Claude. Convert JavaScript based UI5 projects to TypeScript.": "Claude 的 SAPUI5 / OpenUI5 插件。将基于 JavaScript 的 UI5 项目转换为 TypeScript。",
  "Create and manage Jira issues, search projects, and transition tickets directly from Claude.": "创建和管理 Jira 问题，搜索项目，并直接从 Claude 转换工单状态。",
  "Access and manage your linear projects, issues, and teams from Claude.": "从 Claude 访问和管理你的 Linear 项目、问题和团队。",
  "Interact with the Notion API to manage pages, databases, and blocks.": "与 Notion API 交互以管理页面、数据库和模块。",
  "Interact with the Slack API to read and send messages.": "与 Slack API 交互以读取和发送消息。",
  "Interact with the GitHub API to manage repositories, issues, and pull requests.": "与 GitHub API 交互以管理代码库、问题和拉取请求。",
  "Provide access to the macOS file system and applications.": "提供对 macOS 文件系统和应用程序的访问。",
  "Access and query SQLite databases from Claude.": "从 Claude 访问和查询 SQLite 数据库。",
  "Access and query PostgreSQL databases from Claude.": "从 Claude 访问和查询 PostgreSQL 数据库。",
  "Search the web using Brave Search.": "使用 Brave Search 搜索网页。",
  "Fetch and read content from URLs.": "获取并读取 URL 内容。",
  "Access Google Drive, Docs, and Sheets.": "访问 Google 云端硬盘、文档和表格。",
  
  // Other plugin UI fragments
  "from claude-plugins-official": "来自 claude-plugins-official",
  "from anthropic-plugins": "来自 anthropic-plugins",
  "Uninstall (user scope)": "卸载（用户范围）",
  "Uninstall (project scope)": "卸载（项目范围）",
  "Uninstall (local scope)": "卸载（本地范围）"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(pluginDeepDetails)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added deep plugin details translations!');
