const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const skillTranslations = {
  // Claude API Skill
  "Build apps with the Claude API or Anthropic SDK.": "使用 Claude API 或 Anthropic SDK 构建应用。",
  "TRIGGER when:": "触发条件：",
  "code imports": "代码导入",
  "or user asks to use Claude API, Anthropic SDKs, or Agent SDK.": "或者用户要求使用 Claude API、Anthropic SDK 或 Agent SDK 时。",
  "DO NOT TRIGGER when:": "不要触发：",
  "general programming, or ML/data-science tasks.": "一般编程或机器学习/数据科学任务。",
  
  // Other potential skills that appear in /skills or /help
  "Build web applications with React, Next.js, and modern frontend tools.": "使用 React、Next.js 和现代前端工具构建 Web 应用。",
  "Write shell scripts and automate terminal tasks.": "编写 Shell 脚本并自动化终端任务。",
  "Manage and query SQL databases.": "管理和查询 SQL 数据库。",
  "Create and manage Python environments and packages.": "创建和管理 Python 环境及包。",
  "Create verifier skill(s) for automated verification of code changes.": "创建验证器技能以自动验证代码更改。",
  "Use this skill to configure the Claude Code harness via settings.json.": "使用此技能通过 settings.json 配置 Claude Code 环境。",
  "Research and plan a large-scale change, then execute it via 5-30 independent worktree Agents in parallel": "研究并规划大规模更改，然后通过 5-30 个独立的 worktree Agents 并行执行"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(skillTranslations)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');
console.log('Added skill translations!');
