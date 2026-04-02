const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

const regex = /.{0,20}Enter to select.{0,20}/gi;
let match;
const matches = new Set();

while ((match = regex.exec(content)) !== null) {
  matches.add(match[0]);
}

console.log("Found references to 'Enter to select':");
Array.from(matches).slice(0, 30).forEach(d => console.log(d));
