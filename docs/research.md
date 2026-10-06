# 大澳渔庄灯光工作台技术调研

核对日期：2026-10-05。目标是为 DeepSeek Harness 提供可独立安装、独立更新的本地插件，支持场景模板、中文文字、SWF 导出和保存路径展示，面向 macOS 与 Windows。

本次 GitHub 搜索没有找到同时满足这些条件的完整插件。检索结果包含 SWF 生成库、命令行工具和播放器，因此本项目采用针对当前模板需求的有限 SWF 写入实现。此结论仅代表本次检索范围。

## 现有项目比较

| 项目 | 可复用能力 | 核对到的状态与许可 | 本项目取舍 |
| --- | --- | --- | --- |
| [open-flash/swf-emitter](https://github.com/open-flash/swf-emitter) | TypeScript/Node、Rust 将 SWF AST 序列化为文件；支持位图、形状、文字、字体和时间轴标签 | 默认分支最新提交为 2022-05-08，版本 0.14.0；AGPL-3.0-or-later；README 说明部分标签尚未实现 | 可作为格式研究参考。它不提供模板编辑器，也不负责中文字体排版；引入后仍需实现主要产品流程，并增加依赖与许可管理 |
| [swfmill](https://github.com/djcsdy/swfmill) | XML 与 SWF 互转，导入 PNG/JPEG、TrueType 字体和字形子集 | 默认分支最新提交为 2017-10-26；GPL-2.0；README 自述 alpha；依赖 libxml2、libxslt、freetype、libpng 等 | 能生成 SWF，但原生工具及依赖会增加 macOS/Windows 的构建和分发工作 |
| [SWFTools](https://github.com/swftools/swftools) | png2swf、jpeg2swf、swfc、字体转换、SWF 检查等工具 | GPL-2.0；2026-02-14 合并了“找到维护者”的更新；项目历史平台说明包含 macOS 与 Windows | 不能直接断言已停止维护。对于当前两层模板动画，随插件分发整套原生工具的成本较高 |
| [Ming](https://github.com/libming/libming) | C/C++ 等语言生成形状、文本、精灵和动画；具有 UTF-8 文本接口 | 默认分支最新提交为 2020-07-23；库为 LGPL-2.1，命令行 ActionScript 编译器为 GPL | 功能丰富，但没有适配本插件的官方 Node 接口；引入原生构建及语言绑定超出当前需要 |
| [Ruffle](https://github.com/ruffle-rs/ruffle) | SWF 播放、跨平台桌面版、浏览器/Wasm 版 | MIT 或 Apache-2.0；持续维护；稳定版 0.6.0 提供 macOS universal、Windows x86/x64 和网页包 | 用于独立播放验证，用户可自行选择播放器。无需随生成插件附带 |

维护状态根据默认分支提交历史核对，未将仓库 `pushed_at` 当成默认分支代码更新日期。参考：[swf-emitter 历史](https://github.com/open-flash/swf-emitter/commits/main/)、[swfmill 历史](https://github.com/djcsdy/swfmill/commits/master/)、[SWFTools 维护更新](https://github.com/swftools/swftools/pull/241)、[Ming 历史](https://github.com/libming/libming/commits/master/)。

中文能力的具体证据包括 swfmill README 的字体字形及 XML 编码说明，以及 [Ming 的 UTF-8 文本实现](https://github.com/libming/libming/blob/master/src/blocks/text.c)。这些接口不构成对任意中文字体、特殊字符或平台环境的完整验证。

## 本项目实现选择

1. 前端使用浏览器 Canvas 绘制原创模板，生成背景与透明文字两张 RGBA 图层。
2. 字体来自当前操作系统；用户在导出前通过预览检查中文文字和布局。
3. 两张图层通过宿主本地连接交给 Node 写入器。写入器将像素转换为 SWF 所需的预乘透明度 ARGB 格式，再使用 Node 内置 zlib 压缩，写入 SWF 8 的 DefineBitsLossless2 标签。
4. 位图仅定义一次，时间轴通过矩阵与颜色变换调整文字的位置和透明度，实现静态、淡入淡出和上浮效果。
5. 导出文件写入下载目录的唯一子文件夹，返回完整路径，并保存可重新导入的工程 JSON。

此实现仅覆盖当前模板需要的 SWF 标签，不承担通用 SWF 编译器、字体引擎或 ActionScript 运行时的职责。依据是 [Adobe SWF 19 格式规范镜像](https://open-flash.github.io/mirrors/swf-spec-19.pdf)，另可用 [Ruffle SWF 写入实现](https://github.com/ruffle-rs/ruffle/blob/master/swf/src/write.rs) 交叉核对格式行为。

研究阶段也核对了 [sharp 的 SVG/文字输入](https://sharp.pixelplumbing.com/api-constructor/) 与 [跨平台能力](https://sharp.pixelplumbing.com/install/)。最终利用宿主已经具备的浏览器 Canvas 完成绘制，省去图像处理生产依赖和对应平台二进制。插件的 tsdown 仅用于开发构建。

## 能力边界

- 六款场景模板由项目代码原创绘制，没有嵌入第三方模板、图片或字体资源。
- 中文作为像素图层保存，播放端无需安装同款字体；工程重新渲染时仍受本机字体影响。
- 文字不能在播放器中直接修改。修改入口是模板参数或导入工程 JSON 后重新导出。
- 图层分辨率固定，放大不能获得矢量字体的清晰度。
- 当前输出不包含音频、ActionScript 或外部网络资源，也不支持导入编辑已有 SWF。
- 浏览器 Canvas 预览不能证明 SWF 编码正确；结构测试后仍需要实际播放器检查透明度、中文、布局和动画。
- macOS/Windows 是目标平台。未完成的实机安装、字体和播放检查必须继续标为未验证。

## Ruffle 网页验证入口

以下为 2026-10-05 读取 npm registry 得到的版本；后续验证应固定版本，并记录实际使用版本，避免浮动依赖改变结果。

| 入口 | 已核对信息 |
| --- | --- |
| [npm registry 元数据](https://registry.npmjs.org/@ruffle-rs%2Fruffle) | 包名 `@ruffle-rs/ruffle`；入口文件 `ruffle.js` |
| [稳定版 0.6.0 下载](https://registry.npmjs.org/@ruffle-rs/ruffle/-/ruffle-0.6.0.tgz) | `latest` 标签，发布时间 2026-09-06 |
| [nightly 2026-10-04 下载](https://registry.npmjs.org/@ruffle-rs/ruffle/-/ruffle-0.7.0-nightly.2026.10.4.tgz) | `nightly` 标签，版本 `0.7.0-nightly.2026.10.4` |
| [官方 JavaScript API 用法](https://github.com/ruffle-rs/ruffle/wiki/Using-Ruffle#javascript-api) | 创建播放器、载入 SWF、元数据事件及配置 |
| [官方 API 文档](https://ruffle.rs/js-docs/master/) | 公共 JavaScript 接口说明；master 文档可能领先稳定版 |
| [0.6.0 selfhosted 说明](https://github.com/ruffle-rs/ruffle/blob/v0.6.0/web/packages/selfhosted/README.md) | 本地网页资源托管及播放器初始化 |
| [0.6.0 PlayerV1 类型](https://github.com/ruffle-rs/ruffle/blob/v0.6.0/web/packages/core/src/public/player/v1.ts) | `load`、`metadata`、`suspend`、`resume` 的稳定版接口 |
| [0.6.0 加载参数类型](https://github.com/ruffle-rs/ruffle/blob/v0.6.0/web/packages/core/src/public/config/load-options.ts) | `DataLoadOptions.data` 支持 ArrayBuffer 或数字数组类对象，可直接加载本地读取的字节 |

建议将固定版本的网页包解压到独立验证目录，通过本机 HTTP 服务提供完整 JS/Wasm 文件及待检查的 SWF。Wasm 需返回正确的 `application/wasm` MIME 类型；仅复制 `ruffle.js` 会遗漏运行时资源。验证工具无需进入插件运行时依赖或发布包。

初始化顺序为加载 `ruffle.js`，通过 `window.RufflePlayer.newest()` 获取版本对象，调用 `createPlayer()` 创建播放器，将其附加到页面，再通过 `player.ruffle().load(...)` 加载 SWF。官方推荐经 `ruffle()` 访问播放器接口，`load` 返回 Promise。

验证时监听 `loadedmetadata` 与 `loadeddata`。元数据可核对宽度、高度、帧率、总帧数和 SWF 版本；另需检查播放器画面和错误日志。允许脚本访问可保持关闭，本插件输出无需脚本与网页交互。自动播放的验证页面可以配置 `autoplay` 为 `on`。

本页提供研究证据与验证入口，不代表已使用这些包完成播放测试。实际验证结果由对应构建的交付记录说明。
