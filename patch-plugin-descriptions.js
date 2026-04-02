const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const topPluginDescriptions = {
  // frontend-design
  "Create distinctive, production-grade frontend interfaces with high design quality.": "创建具有高设计质量的独特、生产级前端界面。",
  "Generates creative, polished code that avoids generic AI aesthetics.": "生成具有创意和精致的代码，避免通用的 AI 美学。",
  
  // superpowers
  "Superpowers teaches Claude brainstorming, subagent driven d…": "Superpowers 教会 Claude 头脑风暴，子代理驱动的开发...",
  "Superpowers teaches Claude brainstorming, subagent driven development, and memory management.": "Superpowers 教会 Claude 头脑风暴、子代理驱动的开发以及内存管理。",
  
  // context7
  "Upstash Context7 MCP server for up-to-date documentation lo…": "Upstash Context7 MCP 服务器，用于获取最新文档...",
  "Upstash Context7 MCP server for up-to-date documentation lookups": "Upstash Context7 MCP 服务器，用于最新文档查找",
  
  // code-review
  "Automated code review for pull requests using multiple spec…": "使用多个专家自动对拉取请求进行代码审查...",
  "Automated code review for pull requests using multiple specialized expert personas": "使用多个专门的专家对拉取请求进行自动代码审查",
  
  // code-simplifier
  "Agent that simplifies and refines code for clarity, consist…": "一个用于简化和重构代码以提高清晰度和一致性的 Agent...",
  "Agent that simplifies and refines code for clarity, consistency and maintainability": "一个简化和精炼代码以提高清晰度、一致性和可维护性的 Agent"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(topPluginDescriptions)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added specific plugin descriptions!');
