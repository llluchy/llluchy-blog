# llluchy-blog

一个基于 [Astro](https://astro.build) 的个人博客模板，**全部操作在 GitHub 网页上完成**，不需要本地环境。Fork 之后改改配置文件，然后在网页上写 Markdown 就能发文章，提交即自动部署。

## 目录

- [1. 一分钟拥有自己的博客](#1-一分钟拥有自己的博客)
- [2. 绑定自定义域名（可选）](#2-绑定自定义域名可选)
- [3. 写一篇博客文章](#3-写一篇博客文章)
- [4. 添加作品卡片](#4-添加作品卡片)
- [5. 修改个人信息](#5-修改个人信息)
- [6. 启用评论功能](#6-启用评论功能)

---

## 1. 一分钟拥有自己的博客

### 1.1 Fork 项目

点击右上角 **Fork** 按钮，把项目复制到你的 GitHub 账号下。

### 1.2 改三个配置

在 GitHub 网页上，直接编辑以下文件（点击文件 → 右上角铅笔图标 ✏️）：

**① `src/consts.ts`** — 改域名和博客名称：

```ts
// 只需改这一行，所有地方（sitemap、robots.txt、CNAME）都会自动跟着变
export const SITE_URL = 'https://你的用户名.github.io/你的仓库名';

export const SITE_TITLE = '你的博客名称';
export const SITE_AUTHOR = '你的名字';
```

> **注意**：`SITE_URL` 是整个项目的域名配置中心。sitemap、robots.txt、CNAME 都是构建时自动从这个值生成的，不需要手动改其他文件。

**② `src/i18n/translations.ts`** — 找到 `zh` 部分，把 `hero.name` 改成你的名字，`hero.title` 改成你的职业，`hero.description` 改成你的简介。其他文案按需修改。

**③ `src/consts.ts`** 中的 `UTTERANCES_CONFIG.repo` — 改成你的仓库地址：

```ts
export const UTTERANCES_CONFIG = {
  repo: '你的用户名/你的仓库名',
  // ...
};
```

### 1.3 启用 GitHub Pages

进入仓库 **Settings → Pages**，Source 选择 **GitHub Actions**。

### 1.4 完成

每次提交代码到 `main` 分支，GitHub Actions 会自动构建并部署。去 **Actions** 标签页可以看进度。部署完成后访问：

```
https://你的用户名.github.io/你的仓库名
```

---

## 2. 绑定自定义域名（可选）

如果你有自己的域名（如 `www.example.com`），可以替换默认的 GitHub Pages 地址。

### 2.1 改配置

打开 `src/consts.ts`，把 `SITE_URL` 改成你的域名：

```ts
export const SITE_URL = 'https://www.example.com';
```

提交后，项目会自动生成 `CNAME`、`robots.txt`、`sitemap-index.xml`，所有 URL 都指向你的域名。

### 2.2 配置 DNS 解析

到你的域名服务商（如腾讯云、阿里云、Cloudflare）添加 DNS 解析记录：

| 主机记录 | 记录类型 | 记录值 | TTL |
|----------|----------|--------|-----|
| `www` | **CNAME** | `你的用户名.github.io.` | 600 |

> 如果也想让裸域名（不带 www）直接访问，再加一条：

| 主机记录 | 记录类型 | 记录值 | TTL |
|----------|----------|--------|-----|
| `@` | **CNAME** | `你的用户名.github.io.` | 600 |

### 2.3 GitHub Pages 绑定域名

1. 进入仓库 **Settings → Pages**
2. 找到 **Custom domain** 区域，输入你的域名（如 `www.example.com`），点 **Save**
3. 等检测通过后，勾选下方的 **Enforce HTTPS** 复选框

DNS 生效后（通常 1-5 分钟），访问你的域名就能打开博客了。旧的 GitHub Pages 地址会自动重定向到新域名。

---

## 3. 写一篇博客文章

### 3.1 复制模板

打开 `src/content/blog/_TEMPLATE.md`，点击右上角 **复制** 按钮（或 Raw → 全选复制）。

### 3.2 创建新文件

在 `src/content/blog/` 目录下，点击 **Add file → Create new file**，文件名用英文+连字符，例如 `my-first-post.md`。把模板内容粘贴进去。

### 3.3 填写内容

模板里已经标注清楚了：

| 区域 | 说明 |
|------|------|
| 开头 `---` | **不可删除**，frontmatter 开始标记 |
| `title` | **必填**，文章标题 |
| `description` | **必填**，文章摘要 |
| `pubDate` | **必填**，发布日期，格式 `YYYY-MM-DD` |
| `heroImage` | 可选，题图路径 |
| `category` | 可选，分类：`tech` / `life` / `guide` / `general` |
| `updatedDate` | 可选，更新日期 |
| 结尾 `---` | **不可删除**，frontmatter 结束标记 |
| `---` 之后 | 文章正文，标准 Markdown |

### 3.4 文章配图

图片按文章分文件夹管理，路径格式：`src/assets/blog-images/文章文件名（不含.md）/`

例如文章 `my-first-post.md` 的图片放在：

```
src/assets/blog-images/my-first-post/image-1.png
src/assets/blog-images/my-first-post/image-2.png
```

在 MD 中引用：

```md
![图片描述](../../assets/blog-images/my-first-post/image-1.png)
```

### 3.5 提交

填写 commit message，点击 **Commit changes**。等 Actions 跑完，文章就上线了。

---

## 4. 添加作品卡片

在 `src/content/projects/` 目录下新建 `.md` 文件，每个文件一个项目：

```yaml
---
title: '项目名称'                          # 必填
description:
  en: 'Description in English'            # 必填
  zh: '中文描述'                           # 必填
github: 'https://github.com/用户名/仓库'    # 必填
tags: ['Vue3', 'SpringBoot', 'MySQL']     # 必填
icon: '🚀'                                # 可选，emoji 图标
featured: true                            # 可选，设为 true 会在首页精选区展示
order: 1                                  # 可选，数字越小越靠前
---
```

提交后自动生效。

---

## 5. 修改个人信息

所有内容都在 `src/content/` 目录下，用 Markdown 文件管理，直接在 GitHub 网页上编辑即可：

| 文件 | 改什么 |
|------|--------|
| `src/content/skills/index.md` | 技能分类、首页旋转标签、技能进度条 |
| `src/content/about/index.md` | 个人简介、联系方式 |
| `src/content/timeline/*.md` | 成长时间线，一个文件一个阶段 |
| `src/content/hobbies/*.md` | 兴趣爱好，一个文件一个爱好 |

---

## 6. 启用评论功能

博客使用 [Utterances](https://utteranc.es) 评论系统，评论以 GitHub Issues 形式存储在你的仓库中。

1. 打开 `src/consts.ts`，确认 `repo` 字段是你的仓库名
2. 访问 [Utterances App](https://github.com/apps/utterances)，点击 **Install**，选择你的博客仓库
3. 提交后评论功能即可生效

---

## 项目结构

```
├── .github/workflows/deploy.yml   # 自动部署脚本（不要改）
├── src/
│   ├── content/
│   │   ├── blog/                  # 📝 博客文章放这里
│   │   │   └── _TEMPLATE.md       # 文章模板，复制即用
│   │   ├── projects/              # 📦 作品卡片放这里
│   │   ├── skills/                # 技能配置
│   │   ├── about/                 # 个人简介
│   │   ├── timeline/              # 时间线
│   │   └── hobbies/               # 兴趣爱好
│   ├── i18n/translations.ts       # 中英文文案
│   ├── consts.ts                  # ⭐ 全局配置（域名、博客名称、作者等）
│   └── pages/                     # 页面（不要改）
│       ├── CNAME.ts               # 自动从 SITE_URL 生成 GitHub Pages 域名绑定
│       ├── robots.txt.ts          # 自动从 SITE_URL 生成 robots.txt
│       └── sitemap-index.xml.ts   # 自动遍历文章生成 sitemap
├── astro.config.mjs               # 站点配置（自动读取 SITE_URL，不需要改）
└── README.md
```

## 技术栈

- **框架**: [Astro](https://astro.build) — 构建时渲染为纯静态 HTML
- **内容**: Markdown，通过 Astro Content Collections 管理
- **评论**: [Utterances](https://utteranc.es) — 基于 GitHub Issues
- **部署**: GitHub Pages + GitHub Actions，推送即部署
- **国际化**: 中英双语切换