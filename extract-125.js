const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

// 寻找 125 个内置/线上插件的定义。
// 在 Claude Code 中，官方插件列表通常是打在一个大 JSON 里面，或者硬编码。
let content = fs.readFileSync(cliPath, 'utf8');

// The plugins are likely in a JSON string or object literal containing 'frontend-design'
const regex = /frontend-design[^"'{]*["'][^"'{]*["']/i;
const match = regex.exec(content);

console.log(match ? match[0] : "Not found");
