const fs = require('fs');
const path = require('path');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
let content = fs.readFileSync(installedKeywordPath, 'utf8');

// Fix trailing syntax
content = content.replace(/};\s*,\s*};\s*$/g, '};\n');

fs.writeFileSync(installedKeywordPath, content, 'utf8');

const sourceKeywordPath = path.join(__dirname, 'localize', 'keyword.js');
fs.writeFileSync(sourceKeywordPath, content, 'utf8');
console.log('Cleaned trailing syntax!');
