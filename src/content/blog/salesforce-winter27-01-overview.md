---
title: 'Salesforce Winter \'27 导读：我怎么读这份发布说明'
description: '作为 Salesforce 工程师，我梳理了 Winter \'27 发布说明的读法、总体变更、本版强制发布更新，以及功能何时可用矩阵，方便沙盒预览前建立清单。'
pubDate: '2026-09-09'
category: 'tech'
---

这是 Winter '27 系列的第一篇。官方发布说明从 Agentforce 铺到 Slack，体量很大；我不会把全文翻译再贴一遍，而是按工程师视角做**精选导读**：哪些要先测、哪些是强制执行、哪些可以往后排。

全文依据我整理的中文对照稿（源文档最后更新 **2026.09.01**），**这是策展阅读，不是完整发布说明**。落地前请以 Salesforce 官方 Winter '27 Release Notes、组织内 **Release Updates** 页，以及 Trust 维护窗口为准。

**系列导航**：下一篇 → [`salesforce-winter27-02-agentforce`](/blog/salesforce-winter27-02-agentforce/)

<a id="toc"></a>
## 目录

- [为什么写这一系列](#why)
- [发布说明本身变了什么](#rn-changes)
- [怎么用这份导读](#how)
- [总体：我先扫的几件事](#overall)
- [发布更新：Winter \'27 强制项](#ru-winter)
- [往后看：Spring / Summer \'27](#ru-later)
- [功能何时、如何可用](#when)
- [我的预览清单](#checklist)

<a id="why"></a>
## 为什么写这一系列

每次大版本，我都会被同事问同一句：「有没有必看清单？」Winter '27 的开篇叙事很清楚——帮助企业把 AI 转成可信、可衡量的成效，让智能体理解业务、跨系统协同。对工程侧来说，真正要命的通常不是营销标题，而是这几类信号：

- **默认开启 / 滚动启用**（例如 Agentforce Platform）
- **模型与运行时契约变化**（Gemini 重路由、API 68.0、智能体元数据精简）
- **安全与身份类强制发布更新**（SOAP `login()`、Profile Filtering、OAuth 流退役）
- **无障碍与 UI 行为强制项**（高倍放大下的 Lightning 组件重排）
- **产品更名与路径迁移**（Sales Cloud → Agentforce Sales、Revenue Cloud → Agentforce Revenue Management、Commerce → Agentforce Commerce 等；应用里仍可能看到旧名）

所以我把系列拆成十章：导读 → Agentforce → Analytics/Automation → Commerce/Marketing → Platform → Industries 精选 → Revenue/Sales → Security → Service → 其他（Field Service、Headless、Hyperforce、Partner、Slack）。

<a id="rn-changes"></a>
## 发布说明本身变了什么

读正文前，先注意文档信息架构的调整，否则你会在旧习惯里迷路：

- 独立的「按月发布的功能」页面被移除；相关信息并入「发布说明变更」。
- 「发布说明变更」按**月份**分组，并改用项目符号方便扫读；首次发布后的增删改继续记在这里。
- 新增**按产品**的变更日志入口（例如 Salesforce 总体、Agentforce、Analytics 各自一节）。
- **Platform** 章节合并了定制化、部署、开发、Experience Cloud，以及移动端与 Salesforce CMS——以前散落多处的平台能力，现在先去 Platform 找。

发布就绪资源我也会钉在浏览器：Trust Status Maintenance Site（按实例看沙盒与维护时间）、Release Readiness Trailblazers（反馈用 `#Winter27Feedback`）、Sandbox Refresh Calculator 与预览说明、Certification Release Maintenance Schedule，以及 Trailhead 上的 Prepare for Salesforce Releases。

<a id="how"></a>
## 怎么用这份导读

我自己的阅读顺序是：

1. **本篇**：建立「强制更新 + 总体体验 + 可用性矩阵」基线。
2. **你实际在用的云**：只精读对应章节；做 Service 的人优先 Agentforce Voice + Service 篇，做 CPQ/报价的人优先 Revenue/Sales。
3. **官方「功能何时、如何可用？」表**：区分对用户自动启用、管理员/开发者启用、需要设置、需联系 Salesforce。
4. **沙盒预览**：决定是否刷新预览沙盒；在 Preview 文档版本下读 Developers 预览帮助。

一个实用坑：新版本对你的 org 可用之前，发布说明里指向帮助文档的链接可能打不开，或暂时指向上一版。需要预览文档时，在 Salesforce Developers 把 Documentation Version 调到 **Preview**。

语言方面：站点语言跟浏览器走，页脚可改；**已知问题（Known Issues）是单独列表**，不要假设发布说明里写了「可用」就等于没有缺陷。

<a id="overall"></a>
## 总体：我先扫的几件事

### CDN 与静态资源

- **完成内容分发网络（CDN）待处理的 Cloudflare 迁移**：正在迁移且存在待激活任务的 Experience 站点，会在 **30 天后被自动取消**；站点继续在当前提供商上运行，不受影响。若你们卡在「半迁移」状态，要么完成激活，要么接受自动取消——别让变更窗口意外撞上大促。
- **为所有 Lightning 应用静态资源开启 CDN**：CDN 从「仅为 Lightning 页面提供静态资源」扩展到 Lightning 应用的全部静态资源。这通常是好事，但自定义静态资源缓存与回源策略要在预览组织里用真实页面验证。

### 安全地更新已部署解决方案

Winter '27 强调：安装新捆绑包或升级时，可用自定义输入按业务需求定制部署，并在安装前**预览潜在元数据冲突**；选择会自动保存，可暂停后续装。对「托管包 + 大量客户化」的 org，这比盲目 Upgrade 稳妥。

### Foundations / My Trust Center / Scheduler

- **Foundations**：向联系人与潜在客户列表发送邮件时减少等待；**Salesforce Go** 把 Foundations 设置收拢到更短路径。
- **Salesforce My Trust Center**：跟踪沙盒、阅读已翻译更新、扩展访问——版本窗口期适合当沟通中枢。
- **Salesforce Scheduler**：可在新的 **Agentforce Builder** 中创建帮助客户自行预约的智能体；预约前可检查合作伙伴日历可用性，减少「约了但伙伴其实没空」的事故。

### 无障碍（A11y）发布更新

多条面向 WCAG 2.2「调整大小 / 重排」的更新在 Winter '27 **强制执行**（部分从 Summer '26 推迟）：页面页眉与模态（缩放 >200%）、日期选择器 / 弹出框 / 底部工具栏 / 记录页眉、卡片 / 停靠容器 / 菜单列表面板等。若你们有重度自定义 Lightning 页面，请把**高倍放大回归**写进测试计划，而不是只测默认 DPI。

### Advisements（Beta）与 Help Agent

**Advisements（建议，Beta）** 向管理员推送组织风险与分步整改，并跟踪完成情况。**Help Agent** 在部分套件中提供与权限、当前工作流匹配的上下文帮助。我把它们当「运维信号」，不会替代正式的变更管理与 CAB。

<a id="ru-winter"></a>
## 发布更新：Winter \'27 强制项

进入 Setup → 快速查找「发布更新（Release Updates）」。本版计划强制执行的，我优先勾这些（描述来自源译文；**以你 org 页面上的 Complete Steps By 为准**）：

### 为 SOAP login() 分配「使用任何 API 身份验证」权限

要用 SOAP API `login()` 做身份验证，用户必须拥有 **Use Any API Auth**。没有该权限的用户会直接失败。老 ETL、中间件、自写脚本、偶尔还在用 Partner WSDL 登录的工具，全部进盘点表。

### 启用配置文件筛选（Profile Filtering）

为提升安全性，Profile Filtering **默认启用**：用户除非被分配 **View All Profiles**，否则看不到自己以外的配置文件名称。依赖「配置文件名展示 / 选择」的自定义 UI、报表或集成说明文档，要提前改权限或改交互。

### Lightning 无障碍增强（多条）

见上一节。注意部分更新互相依赖（例如卡片类增强依赖页眉/模态那条）。强制前用 Test Run，在放大与小视口下点一遍关键控制台。

<a id="ru-later"></a>
## 往后看：Spring / Summer \'27

这些未必在 Winter '27 强制，但现在就要排期：

| 大致窗口 | 更新 | 我为什么在乎 |
| --- | --- | --- |
| 2026-11-30 | 将 OAuth 2.0 **设备流**限制为带 localhost 回调的**本地外部客户端应用**；连接应用需迁到外部客户端应用 | IoT / CLI 式设备授权、演示设备流会断 |
| 2026-12-01 | **保留电子邮件验证例外**：曾通过支持关闭邮件验证的，需配置已授权域名 | 允许列表会被移除，发信能力可能中断 |
| Spring \'27（约 2027-02-20） | OAuth **用户代理流 / 混合用户代理流**停用；连接应用 **用户名-密码流**停用（曾计划 Winter '27，已推迟） | 大量老集成的生死线 |
| Spring \'27 | 从 Aura 操作响应的自定义对象数据中**移除非公共字段** | 读内部字段的 LWC/Aura 会炸 |
| Spring \'27 | Salesforce Connect 跨组织适配器**旧身份验证**停用 → 迁命名凭据 | 跨 org 外联要改认证 |
| Spring \'27 | **Salesforce to Salesforce** 停用 | 迁 Partner Cloud / Data Cloud One / MuleSoft Anypoint / MuleSoft for Flow 等 |
| Summer \'27 / \'28 | Platform API **31.0–40.0** 弃用与退役 | 现在就把调用版本扫进技术债 |

另外还有计划在 Spring '27 强制的待办事项列表 / 双列列表框无障碍增强等——一并放进季度安全与 UX 回归包。

<a id="when"></a>
## 功能何时、如何可用

官方矩阵四列，我落地时的翻译是：

- **面向用户启用**：上线就可能改 UX → 要沟通、要培训、要回归。
- **面向管理员/开发人员启用**：默认可用，但仍要验证权限、许可与依赖。
- **需要管理员设置**：没开开关等于没有 → 进变更单与配置即代码。
- **需联系 Salesforce 启用**：别假设沙盒能自助打开（例如部分 Scale / 行业能力）。

「有些功能在版本上线后立即影响所有用户」——这类要在上线前提前广播。另一些则必须管理员先操作，用户才受益。

<a id="checklist"></a>
## 我的预览清单

接下来几周我会按这个清单推进：

1. 在 Trust Status 确认实例维护窗口；用 Sandbox Refresh Calculator 决定是否刷新预览沙盒。
2. Release Updates：SOAP `login()`、Profile Filtering、无障碍项做 Test Run，并记录失败用例。
3. 盘点 Connected Apps / External Client Apps 与 OAuth 流，对照 11 月设备流与 Spring '27 停用表。
4. 扫 SOAP/REST 调用方的 API 版本，标出 31–40 与仍用 `login()` 的系统。
5. 打开 Agentforce / Prompt Builder 相关组织，为 Gemini 重路由与平台默认启用做专项（见下一篇）。
6. 用 `#Winter27Feedback` 把预览问题反馈进 Trailblazer 通道。

下一篇我会把 **Agentforce 与生成式 AI** 拆开：默认启用、`AiAgentDefinition`、Voice、Gemini 切换。


<a id="engineer-notes"></a>
## 工程师补充：我如何把发布说明变成工单

读完导读，真正难的是把「知道」变成「仓库里有人负责」。我通常会开三类工单，而不是开一个名叫 Winter27 的巨型故事。

**第一类：强制发布更新与身份。** 把 SOAP `login()`、Profile Filtering、无障碍强制项、以及 11–12 月设备流/邮件验证例外，拆成独立工单，每张单写清：影响系统、回滚方式、Test Run 证据链接。这类工单的验收标准是「生产强制日之前，预览与预发都跑过 Test Run，且失败用例有负责人」。

**第二类：默认行为变化。** Agentforce 平台滚动启用、CDN 扩展到 Lightning 应用静态资源、Experience 站点 Cloudflare 待激活任务 30 天自动取消——它们不一定出现在 Release Updates 列表里，却会改变运行时。这类工单的验收标准是「观察到的行为与预期一致」，而不是「开关已勾选」。

**第三类：退役倒计时。** Salesforce to Salesforce、用户名-密码流、用户代理流、Platform API 31.0–40.0、Salesforce Functions 停售——它们今天不炸，但会在 2027 前后集中爆炸。我会把它们放进技术债看板，并要求每个相关系统的所有者给出迁移目标版本。

另外，发布说明变更日志本身也是信号源：某个 Beta 被「因尚未完全就绪而移除」，说明产品团队在预览期踩了刹车。遇到这种情况，我会把相关试点标成暂停，而不是让业务方以为是我们环境配错。按月回访「发布说明变更」比死盯首次 PDF 更重要。

最后提醒自己也提醒读者：本系列是策展，**不是**法律或合规意见，也不是完整功能目录。涉及安全强制与合同云区域时，请同步安全与采购同学，并以官方 Winter '27 Release Notes 为准。



<a id="doc-tips"></a>
## 文档阅读小技巧

官方提示：浏览器语言决定帮助站点语言；页脚可切换。已知问题单独维护，不要与发布说明混为一谈。预览期帮助链接可能指向上一版或不可用，Developers 文档把 Version 调到 Preview。反馈用带版本的话题标签，例如 `#Winter27Feedback`。我自己会把 Trust 维护窗口、沙盒是否预览、Release Updates 进度三张表放在同一页 wiki，升级周每天更新一行状态，比在聊天群里刷消息更不容易丢信息。


---

**系列导航**：下一篇 → [`salesforce-winter27-02-agentforce`](/blog/salesforce-winter27-02-agentforce/)
