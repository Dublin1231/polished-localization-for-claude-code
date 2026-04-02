const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

// Fd8 is the function that disables the buddy feature if it's not April 1, 2026
// Replace `function Fd8(){...}` with `function Fd8(){return true}`
content = content.replace(/function Fd8\(\)\{.*?\}/, 'function Fd8(){return true}');

fs.writeFileSync(cliPath, content, 'utf8');
console.log('Unlocked /buddy feature again!');
