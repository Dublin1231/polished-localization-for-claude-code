const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

// Looking for /plugin command details.
const regex = /plugin[^"'{}]*["'][^"'{}]*["']/gi;
let match;
const matches = new Set();

while ((match = regex.exec(content)) !== null) {
  matches.add(match[0]);
}

console.log("Found references to plugin in quotes:");
Array.from(matches).slice(0, 50).forEach(d => console.log(d));
