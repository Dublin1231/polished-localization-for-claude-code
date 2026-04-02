const fs = require('fs');
const path = require('path');
const keywordPath = path.join(__dirname, 'localize', 'keyword.js');

let content = fs.readFileSync(keywordPath, 'utf8');

const moreSlashCommands = {
  "Report the security classification result for the agent action": "报告 Agent 操作的安全分类结果",
  "Use the same model as the main conversation": "使用与主对话相同的模型",
  "Claude explains its implementation choices and codebase patterns": "Claude 解释其实现选择和代码库模式",
  "Claude pauses and asks you to write small pieces of code for hands-on practice": "Claude 暂停并让你编写小段代码进行动手实践",
  "Skip this picker in the future (revert via /config)": "以后跳过此选择器（可通过 /config 恢复）",
  "Configure the auto-compact window size": "配置自动压缩的窗口大小",
  "Toggle automemory off/on for this session": "为本次会话开启/关闭自动记忆",
  "Discover Claude Code features through quick interactive lessons": "通过简短的交互式课程探索 Claude Code 的功能",
  "Show remote session URL and QR code": "显示远程会话的 URL 和二维码",
  "Watch your year in review": "查看你的年度回顾",
  "Modify the animation": "修改动画",
  "Fix validation or rendering issues": "修复验证或渲染问题",
  "Create a new animation from scratch": "从头创建一个新动画",
  "Generate your personalized animation": "生成你的个性化动画",
  "Your 2025 Claude Code Year in Review": "你的 2025 Claude Code 年度回顾",
  "Play the thinkback animation": "播放回想动画",
  "View and update your privacy settings": "查看并更新你的隐私设置",
  "List all files currently in context": "列出当前上下文中的所有文件",
  "Inject bridge failure states for manual recovery testing": "注入桥接故障状态以进行手动恢复测试",
  "Print the version this session is running (not what autoupdate downloaded)": "打印当前会话正在运行的版本（而不是自动更新下载的版本）",
  "Copy the conversation to your system clipboard": "将对话复制到系统剪贴板",
  "Save the conversation to a file in the current directory": "将对话保存到当前目录下的文件中",
  "Configure the default remote environment for teleport sessions": "为传送会话配置默认远程环境",
  "Show options when rate limit is reached": "在达到速率限制时显示选项",
  "Toggle brief-only mode": "切换仅简短模式",
  "Opens a secure connection to claude.ai.": "打开与 claude.ai 的安全连接。",
  "You can always enable it later with /remote-control.": "你以后随时可以通过 /remote-control 启用它。",
  "Toggle voice mode": "切换语音模式",
  "Setup Claude Code on the web (requires connecting your GitHub account)": "在网页上设置 Claude Code（需要连接你的 GitHub 账号）",
  "Whether the condition was met": "条件是否满足",
  "Reason, if the condition was not met": "如果不满足条件的原因",
  "Create or list command aliases": "创建或列出命令别名",
  "Alias definition in the form name=value": "以 name=value 形式定义的别名",
  "Run a command immune to hangups": "运行免疫挂断信号的命令",
  "Command to run with nohup": "使用 nohup 运行的命令",
  "Type checker for Python": "Python 类型检查器",
  "Show help message": "显示帮助信息",
  "Print pyright version and exit": "打印 pyright 版本并退出",
  "Continue to run and watch for changes": "继续运行并监视更改",
  "Use the configuration file at this location": "使用此位置的配置文件",
  "Read file or directory list from stdin": "从标准输入读取文件或目录列表",
  "Create type stub file(s) for import": "为导入创建类型存根文件",
  "Use typeshed type stubs at this location": "使用此位置的 typeshed 类型存根",
  "Verify completeness of types in py.typed package": "验证 py.typed 包中类型的完整性",
  "Ignore external imports for --verifytypes": "忽略 --verifytypes 的外部导入",
  "Path to the Python interpreter": "Python 解释器的路径",
  "Analyze for platform": "分析目标平台",
  "Analyze for Python version": "分析目标 Python 版本",
  "Directory that contains virtual environments": "包含虚拟环境的目录",
  "Output results in JSON format": "以 JSON 格式输出结果",
  "Emit verbose diagnostics": "输出详细的诊断信息",
  "Print detailed performance stats": "打印详细的性能统计",
  "Emit import dependency information": "输出导入依赖信息",
  "Minimum diagnostic level": "最低诊断级别",
  "Skip type analysis of unannotated functions": "跳过对未注释函数的类型分析",
  "Use exit code of 1 if warnings are reported": "如果报告警告则使用退出代码 1",
  "Use up to N threads to parallelize type checking": "使用最多 N 个线程并行化类型检查",
  "Specify files or directories to analyze (overrides config file)": "指定要分析的文件或目录（覆盖配置文件）",
  "Delay for a specified amount of time": "延迟指定时间",
  "Run a command on SLURM cluster nodes": "在 SLURM 集群节点上运行命令",
  "Number of tasks": "任务数量",
  "Number of tasks to run": "要运行的任务数量",
  "Number of nodes": "节点数量",
  "Number of nodes to allocate": "要分配的节点数量",
  "Command to run on the cluster": "在集群上运行的命令",
  "Time a command": "对命令计时",
  "Command to time": "要计时的命令",
  "Duration to wait before timing out (e.g., 10, 5s, 2m)": "超时前等待的持续时间（例如：10, 5s, 2m）",
  "Command to run": "要运行的命令",
  "What this command does (1-2 sentences)": "这个命令的作用（1-2 句话）",
  "Why YOU are running this command. Start with": "你为什么要运行这个命令。以以下内容开头",
  "What could go wrong, under 15 words": "可能会出现什么问题，15 字以内",
  "shift+tab to approve with this feedback": "按 shift+tab 同意此反馈",
  "search history": "搜索历史记录",
  "send message": "发送消息",
  "Claude will think before responding": "Claude 在回复前会进行思考",
  "Claude will respond without extended thinking": "Claude 将直接回复，不进行深入思考",
  "reject all": "全部拒绝",
  "Use when the user wants to customize keyboard shortcuts, rebind keys, add chord bindings, or modify ~/.claude/keybindings.json. Examples:": "当用户想要自定义键盘快捷键、重新绑定按键、添加组合键绑定或修改 ~/.claude/keybindings.json 时使用。示例：",
  "Verify a code change does what it should by running the app.": "通过运行应用来验证代码更改是否达到预期。",
  "Full name": "全名",
  "Expert code reviewer for quality and security reviews.": "负责质量和安全审查的专家级代码审查员。",
  "Get current weather for a location": "获取某地当前天气",
  "Book a flight to a destination": "预订飞往某地的航班",

  // 之前的那个因为带逗号导致有问题的句子重新补上
  "Build apps with the Claude API or Anthropic SDK.\\nTRIGGER when: code imports `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`, or user asks to use Claude API, Anthropic SDKs, or Agent SDK.\\nDO NOT TRIGGER when: code imports `openai`/other AI SDK, general programming, or ML/data-science tasks.": "使用 Claude API 或 Anthropic SDK 构建应用。\n触发条件：代码导入了 `anthropic`/`@anthropic-ai/sdk`/`claude_agent_sdk`，或用户要求使用 Claude API、Anthropic SDK 或 Agent SDK。\n不触发条件：代码导入了 `openai`/其他 AI SDK，一般编程，或机器学习/数据科学任务。"
};

content = content.replace(/}\s*$/, '');
for (const [k, v] of Object.entries(moreSlashCommands)) {
  content += `  ${JSON.stringify(k)}: ${JSON.stringify(v)},\n`;
}
content += '}\n';

fs.writeFileSync(keywordPath, content, 'utf8');

const installedKeywordPath = path.join(process.env.USERPROFILE, '.claude', 'localize', 'keyword.js');
fs.writeFileSync(installedKeywordPath, content, 'utf8');

console.log('Added more deep slash command descriptions!');
