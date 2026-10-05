# Windows 安装：SWF 场景工坊 0.2.1

## 下载什么

在本仓库的 Releases 页面下载 `dsh-swf-studio-0.2.1-windows.zip`，解压到一个固定位置。内含跨平台插件包 `.tgz`、本说明和 SHA-256 校验文件。保持 `.tgz` 完整，不要继续解压它。安装之后也请保留该文件，宿主的本地依赖记录可能引用它。

此下载包需要已有的 DeepSeek Harness 桌面宿主，不含客户端 `.exe`。60 款模板已经包含在插件内，不需要另下图片。插件本身不调用模型，不需要 API Key。

截至本次发布，已检查的 `JayceHuang/ipzsk-dsh-desktop` Releases 只有 macOS 客户端安装包。若 Windows 尚未安装兼容客户端，需要先取得客户端的 Windows 构建；仅下载本插件不能独立启动应用。

## 支持范围

对照的官方底层为 `0.2.1-alpha.1`（提交 `5badb15009ae1756c3afe0ae0cef1faafc290ccc`），以及基于它的 IPZSK Desktop Next。宿主需提供客户端注入、connection、slots、React 和侧栏服务，Node 运行时要求至少 `22.19.0`。

Windows 的路径、文件名和打开文件夹逻辑有自动化检查；Windows 安装和界面尚未实机验证。较旧的 IPZSK Desktop 2.x 未在此安装流程中验证。

## IPZSK Desktop Next 安装

1. 保存任务并从托盘完全退出客户端。先前从未运行过的客户端，请先正常启动一次再退出。
2. 找到已安装的 `IPZSK Desktop Next.exe`，复制它的完整路径。
3. 打开 PowerShell，修改下面前两行的路径，再粘贴整个代码块执行。无需管理员权限、无需安装系统 Node，也无需更改 PowerShell 执行策略。

```powershell
$appExe = 'C:\请替换为实际安装目录\IPZSK Desktop Next.exe'
$pluginFile = 'C:\请替换为解压目录\dsh-swf-studio-0.2.1.tgz'

if (-not (Test-Path -LiteralPath $appExe -PathType Leaf)) { throw '请填写正确的客户端 exe 路径' }
if (-not (Test-Path -LiteralPath $pluginFile -PathType Leaf)) { throw '请填写正确的插件 tgz 路径' }
$appRoot = Split-Path -Parent $appExe
$archive = Join-Path $appRoot 'resources\app.asar'
if (-not (Test-Path -LiteralPath $archive -PathType Leaf)) { throw '此客户端的目录结构不符合要求' }
$running = Get-Process -Name ([IO.Path]::GetFileNameWithoutExtension($appExe)) -ErrorAction SilentlyContinue
if ($running) { throw '请先保存工作并完全退出客户端，包括托盘中的程序' }
$hostCli = Join-Path $appRoot 'resources\app.asar\dsh\node_modules\@deepseek-ai\dsh-desktop-host\lib\cli.js'
$priorDshHome = $env:DSH_HOME
$priorNodeMode = $env:ELECTRON_RUN_AS_NODE
try {
    $env:DSH_HOME = Join-Path $env:APPDATA 'IPZSK Desktop Next\dsh-home'
    $env:ELECTRON_RUN_AS_NODE = '1'
    & $appExe --expose-internals $hostCli plugin --profile desktop add $pluginFile
    if ($LASTEXITCODE -ne 0) { throw "插件安装失败，退出码：$LASTEXITCODE；请保留错误信息" }
    Write-Host '安装完成，请重新打开客户端，查找 SWF 场景工坊。'
} finally {
    $env:DSH_HOME = $priorDshHome
    $env:ELECTRON_RUN_AS_NODE = $priorNodeMode
}
```

此入口对照当前 IPZSK 的运行时结构编写，尚未在 Windows 实机执行。如果报告找不到桌面 Host 或不允许管理 desktop profile，请停止并核对客户端版本，不要手动修改或清空 profile。

## 官方 DeepSeek Harness 桌面端安装

使用该桌面安装目录内自带的 `resources\runtime\cli\bin\dsh.cmd`。先完全退出客户端，再在 PowerShell 中运行（替换实际路径）：

```powershell
& 'C:\实际安装目录\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add 'C:\解压目录\dsh-swf-studio-0.2.1.tgz'
```

使用与客户端相同的 `DSH_HOME`。不要用另行通过 npm 安装的 dsh 管理桌面专用 profile。IPZSK 改名版本请使用上一节的入口；当前上游 `dsh.cmd` 固定寻找 `DeepSeek Harness.exe`。

## 安装后的检查

重新打开客户端，在侧栏找到“SWF 场景工坊”，选择模板并修改文字，导出一个短动画。成功后界面会给出完整路径，默认位于 `%USERPROFILE%\Downloads\IPZSK-SWF\`。每次导出生成独立子目录，包含 `.swf`、工程 JSON 和预览图。

需要实际播放 SWF 时，使用兼容的独立播放器，例如 Ruffle。编辑器中的预览与 SWF 播放是两项独立检查。

## 独立目录和更新

源码属于独立的 `dsh-swf-studio` 仓库。安装后的插件由宿主管理，IPZSK 当前位置为 `%APPDATA%\IPZSK Desktop Next\dsh-home\profiles\desktop\node_modules\dsh-swf-studio`，无需手动创建或向该目录复制源码。

以后更新：下载新版插件包、完全退出客户端、用新版包路径再次执行安装、重新打开客户端。保留工程 JSON 可继续编辑作品。当前尚未提供插件市场自动更新。

## 校验下载

用 PowerShell 运行 `Get-FileHash .\dsh-swf-studio-0.2.1.tgz -Algorithm SHA256`，与包内 `SHA256SUMS.txt` 的相应一行比较。
