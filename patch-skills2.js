const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const missingSkills = {
  "Build apps with the Claude API or Anthropic SDK. TRIGGER when:": "使用 Claude API 或 Anthropic SDK 构建应用。触发条件："
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(missingSkills)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');
console.log('Added precise skill match!');
