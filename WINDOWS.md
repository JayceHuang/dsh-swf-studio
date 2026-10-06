# Windows 安装说明

插件包：`dsh-swf-studio-0.3.0.tgz`。保持 tgz 完整并放在固定目录，不需要解压 tgz。与同名旧插件属于更新关系。

1. 保存正在执行的宿主任务，从托盘完全退出 DeepSeek Harness。
2. 将 tgz 保存在固定路径。
3. 使用该客户端自带的 CLI（不要用另一套全局 dsh）：

```powershell
& 'C:\实际安装目录\resources\runtime\cli\bin\dsh.cmd' plugin --profile desktop add 'C:\插件目录\dsh-swf-studio-0.3.0.tgz'
```

与客户端使用同一 DSH_HOME。一般无需另设该变量；自定义安装请沿用已有设置。不要手工改写宿主 profile 或覆盖 node_modules。

4. 重新启动宿主，从侧栏「大澳渔庄灯光工作台」进入。若入口未出现，保留 CLI 错误输出以诊断版本兼容性。

可使用随包提供的 Install-FloorLED-Plugin.ps1，指定 AppExe 和 PluginFile 两个参数；它会检查官方 DeepSeek Harness 的目录结构，使用隐藏窗口执行客户端自带 CLI，并输出日志。执行策略有阻止时，优先使用上面直接调用 dsh.cmd 的命令，无需更改系统策略。

本机分析过程中，原 DeepSeek Harness 安装路径已不存在，因此未执行插件安装。现有 IPZSK Desktop 未经本次验证，不宣称兼容其旧版本；如使用改名宿主，需要核对它对应的官方插件管理入口。

本插件使用宿主提供的 connection、slots、React 和客户端模块加载服务。导出后仍由 FloorLED 播放；传感器功能没有迁移到本插件。
