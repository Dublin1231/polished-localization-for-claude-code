const fs = require('fs');
const path = require('path');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
let content = fs.readFileSync(installedKeywordPath, 'utf8');

// The issue is a missing comma before the new keys.
// Look for '{shortcut:"Esc",action:"cancel"}': '{shortcut:"Esc",action:"取消"}'
content = content.replace(/'\{shortcut:"Esc",action:"cancel"\}': '\{shortcut:"Esc",action:"取消"\}'/, '\'{shortcut:"Esc",action:"cancel"}\': \'{shortcut:"Esc",action:"取消"}\',');

fs.writeFileSync(installedKeywordPath, content, 'utf8');

const sourceKeywordPath = path.join(__dirname, 'localize', 'keyword.js');
fs.writeFileSync(sourceKeywordPath, content, 'utf8');
console.log('Fixed missing comma in keyword.js');
