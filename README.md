# llluchy-blog

一个基于 [Astro](https://astro.build) 的现代化个人博客模板，支持中英双语、暗色模式、内容全部由 Markdown 驱动，一键部署到 GitHub Pages。

## 目录

- [快速开始](#快速开始)
- [初始化博客信息](#初始化博客信息)
- [编写博客文章](#编写博客文章)
- [创建作品卡片](#创建作品卡片)
- [配置个人主页](#配置个人主页)
- [部署到 GitHub Pages](#部署到-github-pages)
- [本地开发](#本地开发)
- [项目结构](#项目结构)

---

## 快速开始

### 1. Fork 本项目

点击右上角 **Fork** 按钮，将项目复制到你自己的 GitHub 账号下。

### 2. 克隆到本地

```bash
git clone https://github.com/你的用户名/llluchy-blog.git
cd llluchy-blog
npm install
```

### 3. 启动开发服务器

```bash
npm run dev
```

浏览器打开 `http://localhost:4321/llluchy-blog`，即可看到博客。

---

## 初始化博客信息

Fork 之后，你需要把以下文件中的个人信息替换成你自己的。

### 修改站点配置

编辑 `astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://你的用户名.github.io',   // ← 改成你的 GitHub Pages 地址
  base: '/llluchy-blog',                  // ← 如果你改了仓库名，这里也要改
  // ...
});
```

### 修改全局常量

编辑 `src/consts.ts`：

```ts
export const SITE_TITLE = '你的博客名称';
export const SITE_DESCRIPTION = '你的博客描述';
export const SITE_AUTHOR = '你的名字';

export const UTTERANCES_CONFIG = {
  repo: '你的用户名/llluchy-blog',  // ← 评论功能关联的仓库
  // ...
};
```

> **评论功能**：需要在 GitHub 给你的仓库安装 [Utterances App](https://github.com/apps/utterances)，否则评论不会显示。

### 修改多语言文案

编辑 `src/i18n/translations.ts`，替换 `zh` 和 `en` 中的文案，比如：

- `hero.greeting`、`hero.name`、`hero.title` — 首页 Hero 区文案
- `hero.description` — 个人简介
- `section.about.subtitle` — 各板块副标题

### 替换头像 / 简历

- 将你的头像图片放入 `src/assets/` 目录
- 将简历 PDF 放入项目根目录（或删除 `刘雨东简历.pdf`）

---

## 编写博客文章

所有博客文章存放在 `src/content/blog/` 目录下，每篇文章是一个 `.md` 文件。

### 创建新文章

在 `src/content/blog/` 下新建一个 `.md` 文件，例如 `my-first-post.md`：

```md
---
title: '我的第一篇文章'
description: '这是文章的摘要描述，会显示在列表页'
pubDate: '2026-07-30'
category: 'tech'
heroImage: '../../assets/blog-placeholder-3.jpg'
---

## 这是正文标题

这是正文内容，支持所有标准 Markdown 语法：

- 列表
- **加粗**
- *斜体*

```js
// 代码块也有语法高亮
console.log('Hello, World!');
```

> 引用块

| 表格 | 也支持 |
|------|--------|
| 数据 | 数据   |
```

### frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 文章标题 |
| `description` | 是 | 文章摘要，显示在列表页 |
| `pubDate` | 是 | 发布日期，格式 `Jul 30 2026` 或 `2026-07-30` |
| `category` | 否 | 分类，可选 `tech` / `life` / `guide` / `general` |
| `heroImage` | 否 | 题图路径，相对于当前文件 |
| `updatedDate` | 否 | 更新日期 |

### 分类说明

当前支持 4 个分类，可在 `src/i18n/translations.ts` 中自定义：

- `tech` — 技术
- `life` — 生活
- `guide` — 指南
- `general` — 综合

### 安全说明

文章内容在**构建时**渲染为纯静态 HTML，所有代码块只会高亮显示，不会被浏览器执行。可以放心在文章中写任何代码示例。

---

## 创建作品卡片

作品数据存放在 `src/content/projects/` 目录下，每个项目一个 `.md` 文件。

### 创建新项目

```md
---
title: '我的项目名称'
description:
  en: 'English description of your project'
  zh: '你的项目的中文描述'
github: 'https://github.com/你的用户名/项目仓库'
tags: ['Vue3', 'TypeScript', 'Node.js']
icon: '🚀'
featured: true
order: 1
---

项目正文内容（可选，会显示在作品详情页）。
```

### frontmatter 字段说明

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 项目名称 |
| `description` | 是 | 中英文描述，`en` 和 `zh` 两个字段 |
| `github` | 是 | GitHub 仓库地址 |
| `tags` | 是 | 技术标签列表 |
| `icon` | 否 | 项目图标（emoji），默认 📁 |
| `featured` | 否 | 是否在首页精选区展示，默认 `false` |
| `order` | 否 | 排序，数字越小越靠前，默认 `0` |

---

## 配置个人主页

### 技能标签

编辑 `src/content/skills/index.md`，修改 `categories` 和 `orbitalTags`：

```yaml
categories:
  - name:
      en: 'Frontend'
      zh: '前端开发'
    icon: '🎨'
    items: ['Vue3', 'React', 'TypeScript', 'CSS']
  - name:
      en: 'Backend'
      zh: '后端开发'
    icon: '⚙️'
    items: ['Java', 'Go', 'Python']

orbitalTags:         # Hero 区旋转技能标签（最多 8 个）
  - 'Vue3'
  - 'Java'
  - 'Docker'
  - 'TypeScript'

aboutSkills:         # 关于页技能进度条
  - name:
      en: 'Frontend'
      zh: '前端开发'
    level: 90        # 0-100
```

### 个人简介

编辑 `src/content/about/index.md`：

```yaml
intro:
  en: 'Your English introduction'
  zh: '你的中文介绍'
details:
  en:
    - 'Detail line 1'
    - 'Detail line 2'
  zh:
    - '详细描述 1'
    - '详细描述 2'
bullets:
  en:
    - '5+ years of development experience'
    - 'Built 50+ projects'
  zh:
    - '5年以上开发经验'
    - '完成50+项目'
contactEmail: 'your@email.com'
```

### 时间线

编辑 `src/content/timeline/` 下的文件，每个文件代表一个时间段：

```yaml
---
year: '2024 - 2025'
title:
  en: 'Senior Developer'
  zh: '高级开发工程师'
description:
  en: 'Led frontend team...'
  zh: '负责前端团队...'
order: 2
---
```

### 兴趣爱好

编辑 `src/content/hobbies/` 下的文件：

```yaml
---
icon: '🏋️'
name:
  en: 'Fitness'
  zh: '健身'
description:
  en: 'Regular gym workouts'
  zh: '定期健身锻炼'
order: 1
---
```

---

## 部署到 GitHub Pages

项目已配置好 GitHub Actions，推送代码到 `main` 分支即可自动部署。

### 1. 启用 GitHub Pages

进入你的仓库 → **Settings** → **Pages**：

- **Source**: 选择 `GitHub Actions`

### 2. 推送代码

```bash
git add .
git commit -m "初始化博客"
git push origin main
```

推送后，GitHub Actions 会自动构建并部署。进入 **Actions** 标签页可查看构建进度。

### 3. 访问博客

部署完成后，访问 `https://你的用户名.github.io/llluchy-blog`。

> 如果你改了仓库名，URL 中的 `llluchy-blog` 需要对应修改。

---

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
```

开发服务器默认运行在 `http://localhost:4321/llluchy-blog`，文件修改后自动热更新。

---

## 项目结构

```
llluchy-blog/
├── .github/workflows/
│   └── deploy.yml              # GitHub Actions 自动部署
├── src/
│   ├── assets/                 # 图片、字体等静态资源
│   ├── components/             # 可复用组件
│   │   ├── Header.astro        # 顶部导航栏
│   │   ├── Footer.astro        # 页脚
│   │   ├── Comments.astro      # 评论区（Utterances）
│   │   └── ...
│   ├── content/                # 📝 所有内容由 Markdown 驱动
│   │   ├── blog/               # 博客文章
│   │   ├── projects/           # 作品卡片
│   │   ├── skills/             # 技能配置
│   │   ├── about/              # 关于我
│   │   ├── timeline/           # 时间线
│   │   └── hobbies/            # 兴趣爱好
│   ├── i18n/                   # 国际化
│   │   └── translations.ts     # 中英文文案
│   ├── layouts/                # 页面布局
│   ├── pages/                  # 路由页面
│   ├── styles/                 # 全局样式
│   ├── consts.ts               # 全局常量
│   └── content.config.ts       # 内容集合定义
├── astro.config.mjs            # Astro 配置
├── package.json
└── README.md
```

## 技术栈

- **框架**: [Astro](https://astro.build) — 静态站点生成器
- **内容**: Markdown / MDX，通过 Astro Content Collections 管理
- **样式**: CSS（无第三方 UI 库）
- **评论**: [Utterances](https://utteranc.es) — 基于 GitHub Issues
- **部署**: GitHub Pages + GitHub Actions
- **国际化**: 自定义 i18n 方案，支持中英文切换
- **字体**: Atkinson Hyperlegible