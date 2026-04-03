#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAGENTA = '\x1b[38;5;206m';
const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[0;33m';
const RED = '\x1b[0;31m';
const NC = '\x1b[0m';

function mustHaveCli() {
  const pkgName = '@anthropic-ai/claude-code';
  let npmRoot = '';
  try {
    const installed = execSync(`npm list -g ${pkgName} --depth=0`, { encoding: 'utf8' });
    if (!installed.includes(pkgName)) {
      throw new Error('not-installed');
    }
    npmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.log(`${RED}请先安装 Claude Code: npm install -g ${pkgName}${NC}`);
    process.exit(1);
  }
  const cliPath = path.join(npmRoot, pkgName, 'cli.js');
  const backupPath = path.join(npmRoot, pkgName, 'cli.bak.js');
  if (!fs.existsSync(cliPath)) {
    console.log(`${RED}找不到 Claude Code CLI 文件${NC}`);
    process.exit(1);
  }
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(cliPath, backupPath);
    console.log(`${GREEN}已创建备份: cli.bak.js${NC}`);
  }
  return { cliPath, backupPath };
}

function esc(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeKeyVariants(key) {
  const variants = new Set([key]);
  if (key.includes('...')) variants.add(key.replace(/\.\.\./g, '…'));
  if (key.includes('…')) variants.add(key.replace(/…/g, '...'));
  if (key.startsWith('Tip:')) {
    variants.add(key.replace(/^Tip:\s*/, 'Tip:'));
    variants.add(key.replace(/^Tip:\s*/, 'Tip: '));
    variants.add(key.replace(/^Tip:/, 'Tips:'));
    variants.add(key.replace(/^Tip:/, 'Tips: '));
  }
  if (key.startsWith('Tips:')) {
    variants.add(key.replace(/^Tips:\s*/, 'Tips:'));
    variants.add(key.replace(/^Tips:\s*/, 'Tips: '));
    variants.add(key.replace(/^Tips:/, 'Tip:'));
    variants.add(key.replace(/^Tips:/, 'Tip: '));
  }
  return Array.from(variants);
}

function buildEntries(keywordMap) {
  const merged = new Map();
  for (const [key, value] of Object.entries(keywordMap)) {
    for (const variant of normalizeKeyVariants(key)) {
      if (!merged.has(variant)) merged.set(variant, value);
    }
  }
  return Array.from(merged.entries()).sort((a, b) => b[0].length - a[0].length);
}

function replaceQuoted(content, key, value) {
  const rawKey = esc(key).replace(/\\n/g, '\\\\n');
  const escapedValue = value.replace(/\n/g, '\\n');
  let count = 0;
  const doubleRegex = new RegExp(`"${rawKey}"`, 'g');
  const singleRegex = new RegExp(`'${rawKey}'`, 'g');
  const dm = content.match(doubleRegex);
  if (dm) {
    content = content.replace(doubleRegex, `"${escapedValue}"`);
    count += dm.length;
  }
  const sm = content.match(singleRegex);
  if (sm) {
    content = content.replace(singleRegex, `'${escapedValue}'`);
    count += sm.length;
  }
  return { content, count };
}

function replaceLiteral(content, key, value) {
  if (!content.includes(key)) return { content, count: 0 };
  const parts = content.split(key);
  return { content: parts.join(value), count: parts.length - 1 };
}

function applyLocalization(content, entries) {
  let replacedKeyCount = 0;
  let replacementCount = 0;
  const missed = [];
  for (const [key, value] of entries) {
    let current = content;
    let count = 0;
    const quoted = replaceQuoted(current, key, value);
    current = quoted.content;
    count += quoted.count;
    if (count === 0 && (key.startsWith('`') || key.startsWith('\\') || key.startsWith('function '))) {
      const literal = replaceLiteral(current, key, value);
      current = literal.content;
      count += literal.count;
    }
    if (count > 0) {
      content = current;
      replacedKeyCount++;
      replacementCount += count;
      console.log(`  ${GREEN}+${NC} ${key.slice(0, 54)}${key.length > 54 ? '...' : ''} ${YELLOW}->${NC} ${value.slice(0, 54)}${value.length > 54 ? '...' : ''}`);
    } else {
      missed.push(key);
    }
  }
  return { content, replacedKeyCount, replacementCount, missed };
}

function applyFixedPairs(content) {
  const pairs = [
    [
      'name:"claude-api",description:"Build apps with the Claude API or Anthropic SDK.\\nTRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK.\\nDO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks."',
      'name:"claude-api",description:"使用 Claude API 或 Anthropic SDK 构建应用。\\n触发条件：代码导入 `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`，或用户要求使用 Claude API、Anthropic SDK 或 Agent SDK。\\n不触发条件：代码导入 `openai`/其他 AI SDK、通用编程或机器学习/数据科学任务。"'
    ]
  ];
  let fixed = 0;
  for (const [from, to] of pairs) {
    if (content.includes(from)) {
      content = content.split(from).join(to);
      fixed++;
    }
  }
  return { content, fixed };
}

function strWidth(str) {
  let width = 0;
  for (const char of str) {
    width += (char.charCodeAt(0) > 255) ? 2 : 1;
  }
  return width;
}

function centerPad(str, width = 70) {
  const diff = width - strWidth(str);
  const pad = Math.max(0, Math.floor(diff / 2));
  return ' '.repeat(pad) + str;
}

function run() {
  const { cliPath, backupPath } = mustHaveCli();
  fs.copyFileSync(backupPath, cliPath);
  const keywordMap = require(path.join(__dirname, 'keyword.js'));
  const entries = buildEntries(keywordMap);
  let content = fs.readFileSync(cliPath, 'utf8');
  const localized = applyLocalization(content, entries);
  content = localized.content;
  const fixed = applyFixedPairs(content);
  content = fixed.content;
  fs.writeFileSync(cliPath, content, 'utf8');
  console.log('');
  console.log(`${MAGENTA}汉化完成!${NC}`);
  console.log(`${GREEN}${localized.replacedKeyCount}/${entries.length} 条匹配, ${localized.replacementCount} 处替换${NC}`);
  if (fixed.fixed > 0) {
    console.log(`${GREEN}额外结构修正: ${fixed.fixed} 项${NC}`);
  }
  console.log('');
  console.log(`${YELLOW}请重启 Claude Code 使汉化生效${NC}`);
}

run();
