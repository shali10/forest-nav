# 🌿 Forest Nav · 个人导航页

> 高饱和旅行海报风个人门户，基于原生 HTML/CSS/JavaScript 与 Cloudflare Pages Functions 构建。

<p align="center">
  <a href="https://0000996.xyz"><img src="https://img.shields.io/badge/在线预览-0000996.xyz-087D69?style=flat-square&logo=cloudflare" alt="在线预览" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/开源协议-MIT-E66F3E?style=flat-square" alt="MIT License" /></a>
  <img src="https://img.shields.io/badge/Cloudflare_Pages-Ready-F5B728?style=flat-square&logo=cloudflarepages" alt="Cloudflare Pages" />
</p>

## 🚀 一键部署

在 Linux、macOS 或 WSL 中执行：

```bash
curl -fsSL https://raw.githubusercontent.com/shali10/forest-nav/main/deploy.sh | bash
```

脚本会自动完成：

1. 检查 Git、Node.js 18+ 与 Wrangler；
2. 拉取最新版源码；
3. 引导登录 Cloudflare（已有 `CLOUDFLARE_API_TOKEN` 时直接使用）；
4. 自动创建或复用 `forest-nav` Pages 项目；
5. 上传静态页面、图标和 Pages Functions；
6. 输出最终 `pages.dev` 访问地址。

### 自定义项目名

```bash
PROJECT_NAME=my-nav curl -fsSL https://raw.githubusercontent.com/shali10/forest-nav/main/deploy.sh | bash
```

> 管道执行时如果尚未登录 Cloudflare，请先运行 `npx wrangler login`；无浏览器服务器可使用具备 Pages 编辑权限的 `CLOUDFLARE_API_TOKEN`。

## 📦 其他部署方式

### GitHub 联动自动部署

1. Fork 本仓库；
2. 在 [Cloudflare Dashboard](https://dash.cloudflare.com/) 进入 **Workers & Pages → Create application → Pages → Connect to Git**；
3. 选择 Fork 后的仓库；
4. 配置：Framework preset 选 `None`，Build command 留空，Build output directory 填 `/`；
5. 保存部署。此后每次推送 `main` 都会自动发布。

### 克隆后部署

```bash
git clone https://github.com/shali10/forest-nav.git
cd forest-nav
npm install
npm run check
PROJECT_NAME=my-nav npm run deploy
```

## ✨ 功能

- 🎨 明黄、暖橙、湖蓝、草绿和深青绿组成的旅行海报视觉；
- 🌤️ Open-Meteo 实时天气、本地时间与每日一句；
- 📰 自动读取 Halo RSS，展示最新 4 篇文章；
- 🔎 42 个快捷入口及即时搜索；
- 📱 桌面、平板、手机响应式布局；
- 🌙 手动暗色模式；
- ⚡ 无前端框架、无构建步骤，直接运行在 Cloudflare 边缘。

## 🗂️ 项目结构

```text
.
├── index.html                 # 页面、样式和交互
├── icons/                     # 服务图标
├── functions/api/posts.js     # Halo RSS 转换接口
├── functions/api/weather.js   # Open-Meteo 天气接口
├── deploy.sh                  # Cloudflare Pages 一键部署
├── package.json               # 检查与部署命令
└── CHANGELOG.md               # 更新日志
```

## 📝 自定义

- 入口、分类和页面文案：编辑 `index.html`；
- 最近文章来源：编辑 `functions/api/posts.js` 中的 RSS 地址；
- 项目名：设置 `PROJECT_NAME`；
- 自定义域名：部署后在 Cloudflare Pages 项目的 **Custom domains** 中绑定。

## 📋 更新日志

版本变更见 [CHANGELOG.md](CHANGELOG.md)。

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。
