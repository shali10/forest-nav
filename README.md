# 🌿 Forest Nav · 个人导航页

> 高饱和旅行海报风个人门户，基于原生 HTML/CSS/JavaScript 与 Cloudflare Workers 构建。

<p align="center">
  <a href="https://0000996.xyz"><img src="https://img.shields.io/badge/在线预览-0000996.xyz-087D69?style=flat-square&logo=cloudflare" alt="在线预览" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/开源协议-MIT-E66F3E?style=flat-square" alt="MIT License" /></a>
</p>

## 🚀 Cloudflare 一键部署

<p align="center">
  <a href="https://deploy.workers.cloudflare.com/?url=https://github.com/shali10/forest-nav">
    <img src="https://deploy.workers.cloudflare.com/button" alt="Deploy to Cloudflare" />
  </a>
</p>

点击按钮后，Cloudflare 会自动：

1. 登录并授权你的 Cloudflare、GitHub 账号；
2. 将本仓库复制到你的 GitHub；
3. 自动识别 `wrangler.jsonc`；
4. 创建 Worker 并上传网站静态资源；
5. 部署文章与天气 API；
6. 建立 Git 联动，后续推送可自动发布。

> Cloudflare 官方的“一键部署按钮”只支持 Workers 应用，因此项目同时提供 `worker.js`。原有 `functions/` 继续保留，可用于传统 Cloudflare Pages 部署。

## 📦 其他部署方式

### Wrangler CLI

```bash
git clone https://github.com/shali10/forest-nav.git
cd forest-nav
npm install
npm run check
npm run deploy
```

### Cloudflare Pages

1. Fork 本仓库；
2. 在 Cloudflare Dashboard 进入 **Workers & Pages → Create application → Pages → Connect to Git**；
3. 选择 Fork 后的仓库；
4. Framework preset 选 `None`，Build command 留空，Build output directory 填 `/`；
5. 保存部署。Pages 会使用 `functions/` 下的接口。

## ✨ 功能

- 🎨 明黄、暖橙、湖蓝、草绿和深青绿组成的旅行海报视觉；
- 🌤️ Open-Meteo 实时天气、本地时间与每日一句；
- 📰 自动读取 Halo RSS，展示最新 4 篇文章；
- 🔎 42 个快捷入口及即时搜索；
- 📱 桌面、平板、手机响应式布局；
- 🌙 手动暗色模式；
- ⚡ 无前端框架和构建步骤，直接运行在 Cloudflare 边缘。

## 🗂️ 项目结构

```text
.
├── index.html                 # 页面、样式和交互
├── icons/                     # 服务图标
├── worker.js                  # Workers 入口及 API
├── wrangler.jsonc             # CF 一键部署配置
├── functions/api/             # Pages 兼容 API
├── package.json               # 开发、检查和部署命令
└── CHANGELOG.md               # 更新日志
```

## 📝 自定义

- 入口、分类和页面文案：编辑 `index.html`；
- 最近文章来源：同步修改 `worker.js` 与 `functions/api/posts.js` 中的 RSS 地址；
- Worker 名称：修改 `wrangler.jsonc` 的 `name`；
- 自定义域名：部署后在 Cloudflare Worker 的 **Domains & Routes** 中绑定。

## 📋 更新日志

版本变更见 [CHANGELOG.md](CHANGELOG.md)。

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 开源。
