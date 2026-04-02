const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

const regex = /.{0,30}Enter to select.{0,30}/gi;
let match;
const matches = new Set();

while ((match = regex.exec(content)) !== null) {
  matches.add(match[0]);
}

console.log("All matching lines around 'Enter to select':");
Array.from(matches).forEach(d => console.log(d));

const regexBy = /.{0,20}By:.{0,20}/gi;
const matchesBy = new Set();
while ((match = regexBy.exec(content)) !== null) {
  matchesBy.add(match[0]);
}
console.log("All matching lines around 'By:':");
Array.from(matchesBy).slice(0, 20).forEach(d => console.log(d));
