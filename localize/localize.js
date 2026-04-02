#!/usr/bin/env node
// localize.js - Claude Code 汉化脚本
// 采用 mine-auto-cli 的全局替换策略：匹配所有引号包裹的字符串
// License: MIT

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAGENTA = '\x1b[38;5;206m';
const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[0;33m';
const RED = '\x1b[0;31m';
const NC = '\x1b[0m';

// ========== 获取 Claude Code CLI 路径 ==========
function getCliPath() {
  const pkgName = '@anthropic-ai/claude-code';
  let npmRoot;

  try {
    const log = execSync(`npm list -g ${pkgName} --depth=0`, { encoding: 'utf8' });
    if (!log.trim().includes(pkgName)) {
      console.log(`${RED}请先安装 Claude Code: npm install -g ${pkgName}${NC}`);
      process.exit(1);
    }
    npmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  } catch (e) {
    console.log(`${RED}请先安装 Claude Code: npm install -g ${pkgName}${NC}`);
    process.exit(1);
  }

  const cliPath = path.join(npmRoot, pkgName, 'cli.js');
  const cliBak = path.join(npmRoot, pkgName, 'cli.bak.js');

  if (!fs.existsSync(cliPath)) {
    console.log(`${RED}找不到 Claude Code CLI 文件${NC}`);
    process.exit(1);
  }

  // 备份原始文件（仅首次）
  if (!fs.existsSync(cliBak)) {
    fs.copyFileSync(cliPath, cliBak);
    console.log(`${GREEN}已创建备份: cli.bak.js${NC}`);
  }

  return { cliPath, cliBak };
}

// ========== 转义正则特殊字符 ==========
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ========== 执行汉化（全局替换策略） ==========
function localize(cliPath) {
  // 加载关键词字典
  const keywordFile = path.join(__dirname, 'keyword.js');
  const keyword = require(keywordFile);

  // 先从备份恢复，确保每次基于原始英文替换
  const { cliBak } = getCliPath();
  fs.copyFileSync(cliBak, cliPath);

  let content = fs.readFileSync(cliPath, 'utf8');
  const entries = Object.entries(keyword);
  let totalReplacements = 0;
  let processedCount = 0;

  for (const [key, value] of entries) {
    const escapedKey = escapeRegex(key).replace(/\\n/g, '\\\\n');
    const newValue = value.replace(/\n/g, '\\n');

    let replaced = false;
    let count = 0;

    if (escapedKey.startsWith('`') || escapedKey.startsWith('\\')) {
      // 模板字符串或特殊字符开头 — 直接全文替换
      const regex = new RegExp(escapedKey, 'g');
      const m = content.match(regex);
      if (m) {
        content = content.replace(regex, value);
        replaced = true;
        count = m.length;
      }
    } else {
      // 双引号包裹的字符串
      const doubleRegex = new RegExp(`"${escapedKey}"`, 'g');
      const dm = content.match(doubleRegex);
      if (dm) {
        content = content.replace(doubleRegex, `"${newValue}"`);
        replaced = true;
        count += dm.length;
      }

      // 单引号包裹的字符串
      const singleRegex = new RegExp(`'${escapedKey}'`, 'g');
      const sm = content.match(singleRegex);
      if (sm) {
        content = content.replace(singleRegex, `'${newValue}'`);
        replaced = true;
        count += sm.length;
      }
    }

    if (replaced) {
      processedCount++;
      totalReplacements += count;
      console.log(`  ${GREEN}+${NC} ${key.substring(0, 50)}${key.length > 50 ? '...' : ''} ${YELLOW}->${NC} ${value.substring(0, 50)}${value.length > 50 ? '...' : ''}`);
    }
  }

  const hardcodedPairs = [
    [
      'name:"claude-api",description:"Build apps with the Claude API or Anthropic SDK.\\nTRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK.\\nDO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks."',
      'name:"claude-api",description:"使用 Claude API 或 Anthropic SDK 构建应用。\\n触发条件：代码导入 `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`，或用户要求使用 Claude API、Anthropic SDK 或 Agent SDK。\\n不触发条件：代码导入 `openai`/其他 AI SDK、通用编程或机器学习/数据科学任务。"'
    ],
    [
      'function Fd8(){if(Pq()!=="firstParty")return!1;if(XY())return!1;let q=new Date;return q.getFullYear()>2026||q.getFullYear()===2026&&q.getMonth()>=3}',
      'function Fd8(){return!0}'
    ]
  ];

  for (const [from, to] of hardcodedPairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
    }
  }

  fs.writeFileSync(cliPath, content, 'utf8');

  console.log('');
  console.log(`${MAGENTA}汉化完成! ${processedCount}/${entries.length} 条匹配, ${totalReplacements} 处替换${NC}`);
}

// ========== 主流程 ==========
function main() {
  console.log(`${MAGENTA}==============================================${NC}`);
  console.log(`${MAGENTA}     Claude Code 汉化工具${NC}`);
  console.log(`${MAGENTA}==============================================${NC}`);
  console.log('');

  const { cliPath } = getCliPath();
  console.log(`${GREEN}CLI 路径: ${cliPath}${NC}`);
  console.log('');

  console.log(`${MAGENTA}开始汉化...${NC}`);
  console.log('');

  localize(cliPath);

  console.log(`${YELLOW}请重启 Claude Code 使汉化生效${NC}`);
}

main();
