#!/usr/bin/env node

/**
 * Cute Claude Hooks - 恢复脚本
 * 恢复 Claude Code 英文界面
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const MAGENTA = '\x1b[38;5;206m';
const GREEN = '\x1b[0;32m';
const YELLOW = '\x1b[0;33m';
const RED = '\x1b[0;31m';
const NC = '\x1b[0m';

console.log(`\n${MAGENTA}恢复 Claude Code 英文界面...${NC}\n`);

const pkgName = '@anthropic-ai/claude-code';

try {
  const log = execSync(`npm list -g ${pkgName} --depth=0`, { encoding: 'utf8' });
  if (!log.trim().includes(pkgName)) {
    console.log(`${RED}未找到 Claude Code${NC}`);
    process.exit(1);
  }

  const npmRoot = execSync('npm root -g', { encoding: 'utf8' }).trim();
  const cliPath = path.join(npmRoot, pkgName, 'cli.js');
  const cliBak = path.join(npmRoot, pkgName, 'cli.bak.js');

  if (fs.existsSync(cliBak)) {
    fs.copyFileSync(cliBak, cliPath);
    console.log(`${GREEN}已恢复为英文界面${NC}`);
  } else {
    console.log(`${YELLOW}未找到备份文件，可能已经是英文版${NC}`);
  }
} catch (err) {
  console.log(`${RED}恢复失败: ${err.message}${NC}`);
}

console.log(`\n${MAGENTA}请重启 Claude Code 使更改生效${NC}\n`);
