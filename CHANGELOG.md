# 更新日志

本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [1.2.0] - 2026-09-03

### 体验升级与双博客流聚合

- **字体防阻塞优化**：将 Google Fonts 样式引入由同步阻塞切换为 `preload + noscript` 异步非阻塞加载，并引入系统明朝/宋体字体栈垫底（`Source Han Serif SC`, `Songti SC`, `SimSun`），彻底消除弱网环境下的首屏 FOIT 白屏阻塞；
- **ForestBlog 新博客接入**：后端 Workers 与 Pages Functions 同步重构 `posts` API，接入全新上线的边缘博客 **ForestBlog（林间随笔）** 与原有 **Halo 博客** 双 RSS 流，按发布时间自动聚合与标题智能去重；
- **前端动态标识适配**：前端组件解除写死 `Halo 博客` 的限制，动态显示各文章实际来源标签（林间随笔 / Halo 博客），归档入口同步支持直达。

## [1.1.2] - 2026-08-30

### 视觉微调与色彩升华

- **高饱和旅行插画调色**：
  - 日间模式重调为暖杏奶黄立体卡片（`#fff5d6`）与深赭金边框（`#b87e38`），强化实体立体投影；
  - 阳光金黄（`#f5c94c`）、草绿（`#63c59a`）、珊瑚橙（`#f08c5f`）、湖蓝（`#59bed4`）、麦金（`#dcb759`）与紫罗兰（`#8b80c3`）六大分区色彩更饱满明亮；
  - 侧边栏与 Halo 博客模块采用纯正深松石青绿（`#0b6b58` / `#167664`），视觉主轴沉稳鲜明；
  - 暗色模式升级为深邃星夜海报暗调，各分区配备专属彩色亮线边框（琥珀金、翠玉绿、赤陶橙、冰湖蓝、青铜金、星空紫），夜景层次极具质感且柔和清晰。

## [1.1.1] - 2026-08-30

### 修复与优化

- **夜间模式彻底重构**：修复历史版本中因多重 `!important` 覆盖导致点击暗色模式无响应的严重问题；
- **纯净 CSS 变量架构**：重构并统一轻量化 CSS 变量系统，日间呈现高饱和清新旅行海报风（明黄/暖橙/湖蓝/草绿/紫区分），夜间无缝切换为深邃星夜海报暗色主题（深翡翠黑/深青绿画布与夜色立体卡片）；
- **去除手帐杂质**：全面剔除纸张噪点、虚线、倾斜贴纸与手写字体，回归规整网格与干净现代字体（Manrope / Noto Serif SC）；
- **平滑过渡交互**：主题切换添加平滑色彩过渡动画，并同步更新状态栏元信息与 Sun/Moon 图标。

## [1.1.0] - 2026-08-30

### 新增

- README 增加 Cloudflare 官方 **Deploy to Cloudflare** 一键部署按钮；
- 新增 `wrangler.jsonc`，供 Cloudflare 自动识别和创建 Worker；
- 新增 `worker.js`，以 Workers Static Assets 托管页面、图标和 API；
- 一键部署后自动复制 GitHub 仓库、创建 Worker 并建立持续部署。

### 兼容

- 保留原有 `functions/api/`，继续支持传统 Cloudflare Pages 部署；
- Workers 与 Pages 两条部署路径共用相同页面，并提供一致的 `/api/posts` 和 `/api/weather` 接口。

### 变更

- `npm run deploy` 改为标准 `wrangler deploy`；
- README 将 Cloudflare 官方按钮置于部署章节首位；
- 更新项目版本至 `1.1.0`。

## [1.0.0] - 2026-08-30

### 新增

- 新增 `deploy.sh`，支持一条命令部署到 Cloudflare Pages；
- 支持自动检查 Git、Node.js、Wrangler 与 Cloudflare 登录状态；
- 支持自动创建或复用 Pages 项目，并输出最终访问地址；
- 新增 `package.json`，提供 `npm run check` 与 `npm run deploy`；
- README 增加一键部署、自定义项目名、Git 联动部署和目录说明。

### 视觉

- 应用高饱和旅行海报主题；
- 使用明黄、暖橙、湖蓝、草绿、深青绿和紫色分区；
- 加深服务卡片边框与阴影，减少大面积浅色和单一配色；
- 保持桌面端、平板和移动端响应式适配。

### 功能

- 最近文章固定读取 Halo 博客 RSS，只展示最新 4 篇；
- 长文章标题最多显示两行，超出部分自动截断；
- 保留本地时间、Open-Meteo 天气、每日一句和快捷入口搜索。

### 修复

- 清理历史页面中重复叠加的主题覆盖样式；
- 移除 Note 文章混流与服务状态模块；
- 修复长标题单行截断导致信息显示不完整的问题。

[1.1.2]: https://github.com/shali10/forest-nav/releases/tag/v1.1.2
[1.1.1]: https://github.com/shali10/forest-nav/releases/tag/v1.1.1
[1.1.0]: https://github.com/shali10/forest-nav/releases/tag/v1.1.0
[1.0.0]: https://github.com/shali10/forest-nav/releases/tag/v1.0.0
