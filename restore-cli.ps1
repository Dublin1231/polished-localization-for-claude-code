$source = "$env:APPDATA\npm\node_modules\@anthropic-ai\claude-code\cli.bak.js"
$dest = "$env:APPDATA\npm\node_modules\@anthropic-ai\claude-code\cli.js"

if (Test-Path $source) {
    Copy-Item -Path $source -Destination $dest -Force
    Write-Host "已还原 cli.js"
} else {
    Write-Host "备份文件不存在: $source"
}
