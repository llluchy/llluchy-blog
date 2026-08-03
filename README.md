# llluchy-blog

一个基于 [Astro](https://astro.build) 的个人博客模板，**全部操作在 GitHub 网页上完成**，不需要本地环境。Fork 之后改改配置文件，然后在网页上写 Markdown 就能发文章，提交即自动部署。

## 目录

- [1. 一分钟拥有自己的博客](#1-一分钟拥有自己的博客)
- [2. 写一篇博客文章](#2-写一篇博客文章)
- [3. 添加作品卡片](#3-添加作品卡片)
- [4. 修改个人信息](#4-修改个人信息)
- [5. 启用评论功能](#5-启用评论功能)

---

## 1. 一分钟拥有自己的博客

### 1.1 Fork 项目

点击右上角 **Fork** 按钮，把项目复制到你的 GitHub 账号下。

### 1.2 改三个配置

在 GitHub 网页上，直接编辑以下文件（点击文件 → 右上角铅笔图标 ✏️）：

**① `astro.config.mjs`** — 把 `site` 和 `base` 改成你的：

```js
export default defineConfig({
  site: 'https://你的用户名.github.io',
  base: '/你的仓库名',           // 如果没改仓库名就是 /llluchy-blog
});
```

**② `src/consts.ts`** — 改博客名称和作者：

```ts
export const SITE_TITLE = '你的博客名称';
export const SITE_AUTHOR = '你的名字';
```

**③ `src/i18n/translations.ts`** — 找到 `zh` 部分，把 `hero.name` 改成你的名字，`hero.title` 改成你的职业，`hero.description` 改成你的简介。其他文案按需修改。

### 1.3 启用 GitHub Pages

进入仓库 **Settings → Pages**，Source 选择 **GitHub Actions**。

### 1.4 完成

每次提交代码到 `main` 分支，GitHub Actions 会自动构建并部署。去 **Actions** 标签页可以看进度。部署完成后访问：

```
https://你的用户名.github.io/你的仓库名
```

---

## 2. 写一篇博客文章

### 2.1 复制模板

打开 `src/content/blog/_TEMPLATE.md`，点击右上角 **复制** 按钮（或 Raw → 全选复制）。

### 2.2 创建新文件

在 `src/content/blog/` 目录下，点击 **Add file → Create new file**，文件名用英文+连字符，例如 `my-first-post.md`。把模板内容粘贴进去。

### 2.3 填写内容

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

### 2.4 文章配图

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

### 2.5 提交

填写 commit message，点击 **Commit changes**。等 Actions 跑完，文章就上线了。

---

## 3. 添加作品卡片

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

## 4. 修改个人信息

所有内容都在 `src/content/` 目录下，用 Markdown 文件管理，直接在 GitHub 网页上编辑即可：

| 文件 | 改什么 |
|------|--------|
| `src/content/skills/index.md` | 技能分类、首页旋转标签、技能进度条 |
| `src/content/about/index.md` | 个人简介、联系方式 |
| `src/content/timeline/*.md` | 成长时间线，一个文件一个阶段 |
| `src/content/hobbies/*.md` | 兴趣爱好，一个文件一个爱好 |

---

## 5. 启用评论功能

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
│   ├── consts.ts                  # 博客名称、作者等全局配置
│   └── pages/                     # 页面（不要改）
├── astro.config.mjs               # 站点配置（改 site 和 base）
└── README.md
```

## 技术栈

- **框架**: [Astro](https://astro.build) — 构建时渲染为纯静态 HTML
- **内容**: Markdown，通过 Astro Content Collections 管理
- **评论**: [Utterances](https://utteranc.es) — 基于 GitHub Issues
- **部署**: GitHub Pages + GitHub Actions，推送即部署
- **国际化**: 中英双语切换