const fs = require('fs');
const path = 'C:\\Users\\35647\\AppData\\Roaming\\npm\\node_modules\\@anthropic-ai\\claude-code\\cli.js';

let content = fs.readFileSync(path, 'utf8');
const oldFunc = 'function Fd8(){if(Pq()!=="firstParty")return!1;if(XY())return!1;let q=new Date;return q.getFullYear()>2026||q.getFullYear()===2026&&q.getMonth()>=3}';
const newFunc = 'function Fd8(){return!0}';

if (content.includes(oldFunc)) {
  content = content.replace(oldFunc, newFunc);
  fs.writeFileSync(path, content, 'utf8');
  console.log('Fd8 函数已修复!');
} else if (content.includes('function Fd8(){return!0}')) {
  console.log('Fd8 函数已经修复过了');
} else {
  console.log('未找到 Fd8 函数，请检查版本');
  console.log('搜索 Fd8 函数...');
  const match = content.match(/function Fd8\(\)[^{]*\{[^}]*\}/);
  if (match) {
    console.log('找到:', match[0]);
  }
}
