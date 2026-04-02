const fs = require('fs');
const path = require('path');
const cliPath = path.join(process.env.APPDATA, 'npm', 'node_modules', '@anthropic-ai', 'claude-code', 'cli.js');

let content = fs.readFileSync(cliPath, 'utf8');

// The format usually looks like:
// {name:"help",description:"Show help and available commands"}
// Let's use a regex to extract all descriptions.
const regex = /description:\s*["']([^"']+)["']/g;
let match;
const descriptions = new Set();

while ((match = regex.exec(content)) !== null) {
  const desc = match[1];
  if (desc.length > 5 && !desc.includes('\\n')) {
    descriptions.add(desc);
  }
}

console.log("All found descriptions in cli.js:");
Array.from(descriptions).forEach(d => console.log(d));
