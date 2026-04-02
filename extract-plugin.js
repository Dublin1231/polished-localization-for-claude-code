const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

// Look for anything near 'plugin'
const regex = /.{0,60}plugin.{0,60}/gi;
let match;
const matches = new Set();

while ((match = regex.exec(content)) !== null) {
  matches.add(match[0]);
}

console.log("Found references to plugin:");
Array.from(matches).slice(0, 30).forEach(d => console.log(d));
