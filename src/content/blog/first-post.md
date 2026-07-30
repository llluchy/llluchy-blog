---
title: '从零搭建个人博客 — Astro + GitHub Pages 实践'
description: '记录使用 Astro 框架和 GitHub Pages 从零搭建个人博客的完整过程，涵盖项目初始化、内容管理、自动部署等关键环节。'
pubDate: 'Jul 08 2022'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'tech'
---

## 前言

一直想拥有一个属于自己的博客站点，用来记录技术学习心得和项目经验。经过一番调研，最终选择了 Astro 作为静态站点生成器，配合 GitHub Pages 实现免费托管和自动部署。本文记录整个搭建过程。

## 为什么选择 Astro

Astro 是一个现代化的静态站点构建工具，有几个突出优势：

- **零 JavaScript 输出**：默认情况下，Astro 在构建时会将组件渲染为纯 HTML，不向客户端发送任何 JavaScript，页面加载极快。
- **多框架支持**：可以在同一个项目中使用 React、Vue、Svelte 等组件，按需引入。
- **内容集合**：内置的内容管理系统，支持 Markdown 和 MDX，非常适合博客场景。
- **岛屿架构**：交互式 UI 组件作为"岛屿"独立加载，不影响页面其余部分的静态渲染。

## 项目初始化

```bash
npm create astro@latest my-blog
cd my-blog
npm install
```

Astro 提供了交互式 CLI，可以选择模板、配置 TypeScript 等。初始化完成后，项目结构清晰：

```
my-blog/
├── src/
│   ├── content/    # 博客文章（Markdown）
│   ├── pages/      # 路由页面
│   ├── components/ # 可复用组件
│   └── layouts/    # 页面布局
├── public/         # 静态资源
└── astro.config.mjs
```

## 内容管理

博客文章存放在 `src/content/blog/` 目录下，每篇文章是一个 Markdown 文件，顶部用 frontmatter 定义元数据：

```yaml
---
title: '文章标题'
description: '文章摘要'
pubDate: '2024-01-15'
category: 'tech'
---
```

通过 Astro 的 `getCollection` API，几行代码就能实现文章列表和详情页。

## 部署到 GitHub Pages

配置 `astro.config.mjs`，设置 `site` 和 `base` 选项后，配合 GitHub Actions 即可实现推送代码自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v2
```

## 总结

Astro 让静态博客的开发体验变得非常愉快。内容全部以 Markdown 管理，编辑即更新，无需关心数据库和服务器。加上 GitHub Pages 的免费托管，维护成本几乎为零。推荐给所有想搭建个人博客的开发者。
