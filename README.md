# 🌿 Forest Nav · 个人导航页

> **A Clean, Flat & Modern Personal Portal & Navigation Dashboard**  
> 基于 **Cloudflare Pages + 原生现代 Web 技术栈** 构建的清新扁平旅行手帐风个人导航页。

<p align="center">
  <a href="https://0000996.xyz"><img src="https://img.shields.io/badge/Demo-0000996.xyz-2D5A46?style=flat-square&logo=cloudflare" alt="Online Demo" /></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" alt="License" /></a>
  <img src="https://img.shields.io/badge/Cloudflare_Pages-Ready-F38020?style=flat-square&logo=cloudflarepages" alt="Cloudflare Pages" />
  <img src="https://img.shields.io/badge/Zero_Framework-Pure_HTML%2FCSS%2FJS-brightgreen?style=flat-square" alt="Zero Framework" />
</p>

---

## ✨ 核心特性

- 🎨 **清新旅行插画美学**：大面积奶油米白（`#FAF7EE`）与青绿（`#2D5A46`）主视觉，搭配天蓝与暖杏点缀，告别传统暗黑沉重运维面板。
- 🌤️ **动态全球天气**：集成 Open-Meteo 免 Key 全球实时天气、本地时间与每日一句随笔轮播。
- 📰 **Halo 博客动态文章流**：自动展示来自 Halo 生产博客的最新技术与实践手记。
- 📱 **全视口响应式适配**：完美适配桌面大屏、iPad 与手机端双列卡片流，无横向溢出。
- 🌙 **自适应暗色模式**：自动跟随系统偏好，支持平滑暗色模式切换。
- ⚡ **极致轻量无依赖**：纯 HTML/CSS/Vanilla JS 构建，零打包器依赖，全球 CDN 边缘秒开（TTFB < 120ms）。
- ⌨️ **快捷键支持**：按 `/` 键快速聚焦搜索框，按 `Esc` 一键清空。

---

## 🎨 视觉配色规范

| 视觉元素 | 取色 Hex | 设计语义与应用场景 |
|---|---|---|
| **页面底色** | `#FAF7EE` | 温暖柔和的奶油米白，提供长时间浏览的舒适背景 |
| **主强调色** | `#2D5A46` | 青绿/松石绿，用于核心标题、卡片边框与主要按钮 |
| **次强调色** | `#4A90E2` | 天蓝，用于云服务/API类卡片装饰与状态徽标 |
| **点缀色** | `#F5A623` | 暖杏橙，用于天气、标签与高亮指示器 |
| **文字主色** | `#2C3E50` | 深灰青墨色，提供比纯黑更柔和的高对比度阅读体验 |

---

## 🚀 快速部署到 Cloudflare Pages

### 方式一：GitHub 联动自动部署（推荐）

1. Fork 本仓库到你的 GitHub。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)，进入 **Workers & Pages** -> **Create application** -> **Pages**。
3. 选择 **Connect to Git**，绑定刚 Fork 的仓库。
4. 构建设置：
   - **Framework preset**: `None`
   - **Build command**: （留空）
   - **Build output directory**: `/`
5. 点击 **Save and Deploy** 即可完成全球边缘上线！

### 方式二：Wrangler CLI 本地部署

```bash
# 1. 克隆代码
git clone https://github.com/shali10/forest-nav.git
cd forest-nav

# 2. 一键发布至 Cloudflare Pages
npx wrangler pages deploy . --project-name=my-nav --branch=main
```

---

## 📄 开源协议

本项目基于 [MIT License](LICENSE) 协议开源。
