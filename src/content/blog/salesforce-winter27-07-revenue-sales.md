---
title: 'Winter ''27 Revenue 与 Sales：大行报价与销售智能体'
description: '精选 Winter ''27 Agentforce Revenue Management 与 Agentforce Sales：一万五千行报价、促销与爬坡交易、Engagement 更名、Prospecting 与 Slack 销售。'
pubDate: '2026-09-15'
category: 'tech'
tags:
  - Salesforce
  - Winter 27
---
> **Winter '27 系列地图**：按职责找章节 → [导读树状导航](/blog/salesforce-winter27-01-overview/#series-map)  
> 01 [导读](/blog/salesforce-winter27-01-overview/) · 02 [Agentforce](/blog/salesforce-winter27-02-agentforce/) · 03 [Analytics/Automation](/blog/salesforce-winter27-03-analytics-automation/) · 04 [Commerce/Marketing](/blog/salesforce-winter27-04-commerce-marketing/) · 05 [Platform](/blog/salesforce-winter27-05-platform/) · 06 [Industries](/blog/salesforce-winter27-06-industries/) · 07 [Revenue/Sales](/blog/salesforce-winter27-07-revenue-sales/) · 08 [安全](/blog/salesforce-winter27-08-security/) · 09 [Service](/blog/salesforce-winter27-09-service/) · 10 [其他](/blog/salesforce-winter27-10-more/)

这一篇把 **Revenue Management（收入管理）** 与 **Sales（销售）** 放一起，因为报价配置、审批与销售执行在项目里通常是同一条价值链。源说明写明：Revenue Cloud 现更名为 **Agentforce Revenue Management**，Sales Cloud 现更名为 **Agentforce Sales**；界面与文档仍可能出现旧名，沟通时建议两套名字都提一句，避免业务同事搜不到。

同样是策展。Revenue 对象/API 变更极多，我只抓会影响性能架构与销售动作的部分；Sales 功能可能按月追加，请回访官方 Sales 节。

<a id="toc"></a>
## 目录

- [Revenue：设置与促销](#rev-setup)
- [大型交易与目录/定价](#rev-scale)
- [配置器、事务、爬坡与审批](#rev-tx)
- [Sales：AI 智能体版图](#sales-agents)
- [Engagement / Prospecting / Sales Management](#sales-detail)
- [其他销售能力与退役信号](#sales-other)
- [联合验证清单](#plan)

<a id="rev-setup"></a>
## Revenue：设置与促销

### Salesforce Go 发现与设置

可从 Setup 单一位置发现并配置 Revenue Management。本版可从预构建模板配置**高科技订单编排**；Billing 相关（Invoice Management、Tax Calculation、Invoice Document Delivery、Accounting Sub-Ledger for Accounts Receivables 等）有引导步骤、视频与帮助。对「功能很多但没有人知道从哪开」的团队，这能缩短启用周期，但一键/引导配置后仍要做元数据 diff，搞清它改了哪些权限与对象。

### 促销

定价设计人员可设置用户应用于交易的促销；开发人员可用对象与 API 管理销售交易上的促销。促销相关新增/变更对象在说明中有表——集成层如果硬编码旧对象字段，要重新对一次。

<a id="rev-scale"></a>
## 大型交易与目录/定价

### 最多约 15,000 行

官方强调可处理最多 **15,000** 个行项目的报价与订单，而避免超时与性能瓶颈：异步处理让代表与计费团队在计算、同步、文档生成于后台跑时仍能继续工作。覆盖嵌套捆绑与多级分组的复杂交易：配置产品、应用定价规则、生成文档；还可把大型报价同步到商机、从计算错误更快恢复、自动复用上下文、在大型事务中转换上下文数据、跨大量行应用配置规则并定价。

**工程含义：**以前按「同步 API + 页面同步等待」设计的自定义按钮、LWC、中间件，在万行级场景会先炸。预览期请用接近上限的数据做：

- 文档生成耗时与用户可感知状态；
- 同步到商机是否不打断页面；
- 错误恢复路径是否真能点；
- 是否误用同步调用去等完整计价。

### 产品目录与定价体验

跨层级设置属性显示顺序；引导代表完成配置；简单产品转捆绑更轻松；UI 用清晰文本按钮、可隐藏 Add 防误选；缓存失效与列表价缓存；前缀/部分搜索 Product Name/Code/SKU。Salesforce Pricing：爬坡分段复利上调、各云定价方案/过程、可复用列表变量、weekly 分摊频率、定价 API 标准十进制表示（减少集成解析错误）、按高流转短期模型按比例计费等。

<a id="rev-tx"></a>
## 配置器、事务、爬坡与审批

- **Product Configurator**：约束引擎满足约束时防止随意改指定属性/关系；按父产品每个实例计算子产品数量；有优化 Revenue Management 性能的发布更新——性能类更新要进 Test Run。
- **Transaction Management**：过程计划可限制到特定行业；回溯资产变更；生命周期时区准确；价格修订；高级筛选；销售事务行编辑器自动刷新与按钮组；Dynamic Forms 定制行项目页。
- **Ramp Deals**：多年期复利上浮；回溯修订/续订/取消日期以纠正过往计费。
- **Advanced Approvals**：Slack 通知扩展到组/队列成员；审批委托覆盖计划缺勤；多步骤中敏感工作项可用独立共享限制可见性。

这些和 Automation 篇的 Flow 审批、以及 Slack 篇的销售能力会交叉——审批通知到底走 Advanced Approvals 还是 Flow，要在方案里写死，避免双通道骚扰审批人。

<a id="sales-agents"></a>
## Sales：AI 智能体版图

Sales 章按月更新。AI 智能体主线包括：

- **Agentforce Engagement**（由 Lead Nurturing 更名）
- **Agentforce Prospecting**（自动潜在客户研究）
- **Agentforce Sales Management**（全流程协助代表；可用 Pipeline Management Configuration Skill 加速设置）

更名会在 UI 残留一段时间，培训材料与权限集名称可能混用旧名，需要在变更说明里写「新旧名对照表」。

<a id="sales-detail"></a>
## Engagement / Prospecting / Sales Management

### Engagement

- 名称变更自 2026-08-24 起可用（附加组件与版本以说明为准）。
- **新 Agentforce Builder**（Agent Script 基座）提供更高灵活性与防护栏；Setup 里旧 Builder 的 New Agent 按钮已于 2026-07-13 移除。
- Salesforce Go 仍是创建/激活/指令/外联/防护栏的主入口；可用新 Engagement 模板或 Engagement (Legacy) 模板。
- 基于 Agent Script 的新智能体到 Agentforce Studio 新 Builder 自定义；Send as Seller、Require Manual Approval、Agent Working Hours 等进入 Cadence Settings；测试在 Studio 的 Tests 选项卡。
- Legacy 模板仍基于模块化子智能体/操作/提示模板，深度自定义走旧 Builder。
- **人工审核粒度**：可审核全部邮件、仅初次外联，或用自定义流按记录条件审核——敏感行业外联建议默认偏严，再按细分放松。

### Prospecting 与 Sales Management

Prospecting 强调利用 Salesforce 客户、报表与已连接第三方数据自动完成研究，让代表把时间留给关系与成交；说明中有自动设置潜在客户智能体运行时间等增强，预览时核对数据源授权与字段级安全。Sales Management 侧重部署「陪跑」智能体，并用 Skill 加快 Pipeline Management 配置——与 Headless/MCP 技能体系是同一方向。

<a id="sales-other"></a>
## 其他销售能力与退役信号

发布说明变更还提到：Sales Account Plans 在 Salesforce Go 获得完整设置体验；Einstein Activity Capture 对排除规则的微调（例如基本敏感数据检测会排除主题含 “confidential” 的邮件；高级敏感内容检测设置有过移除/调整——以当前页为准）。

中长期退役信号（与导读/安全篇呼应）：

- **Salesforce to Salesforce** Spring '27 停用；
- **Salesforce for Outlook** 将于 **2027 年 12 月**退役；
- Sales Engagement Performance Dashboard 计划停用等。

Forecasting、Inbox、Account Plans 等细节请按你们启用模块回官方小节；不要假设「Sales 章有的功能」在所有版本默认开。

Slack 中的 Agentforce Sales（Slackbot + Go 页面 + MCP）我放在第 10 篇展开，但销售运营同学可以提前知道：代表可以在 Slack 里动管道，动作回写 Salesforce。

<a id="plan"></a>
## 联合验证清单

1. Revenue：用接近 15k 行的报价测异步计价、文档生成、同步商机与错误恢复；观察用户是否仍误点同步等待。
2. 打开 Salesforce Go 高科技订单模板与 Billing 引导，diff 权限集与流程。
3. 促销对象/API 与现有集成契约对照；爬坡复利与回溯计费用财务用例验收。
4. Advanced Approvals 的 Slack 通知与委托：和 IT 一起确认频道噪音与缺勤代理。
5. Sales：Engagement 新/旧模板分清管理入口；人工审核策略按细分配置；Prospecting 数据源最小权限。
6. 盘点 S2S、Outlook 插件、旧仪表板依赖，写入 2027 退役路线图。
7. 与 Industries 通信/制造等章节对齐：是否共用定价引擎与行编辑器。

下一篇：**安全、身份与隐私**——OAuth 退役、简档筛选、Shield Data Detect。

<a id="engineer-notes"></a>
## 工程师补充：报价性能与销售智能体治理

万行级报价不是「把超时调大」能解决的。异步计价与文档生成要求自定义 UI 必须展示任务状态、允许离开页面、并在失败时给出可重试的动作。若你们的 LWC 仍同步等待定价 API，Winter '27 的规模承诺反而会放大用户挫败感。预览数据请造嵌套捆绑与多级分组，而不是一万行扁平假数据。

促销、爬坡复利、资产回溯与时区准确性，都是财务敏感逻辑：测试用例要由收入运营或财务 IT 共同签字。Advanced Approvals 扩展到组/队列的 Slack 通知，若不做静默时段与委托规则，审批人会在假期被打穿。性能类发布更新（优化 Revenue Management 性能）务必走 Test Run。

销售侧 Engagement 更名与 Builder 分裂（新 Agent Script vs Legacy）是治理问题：谁允许建新智能体、旧智能体何时冻结、人工审核默认策略是什么。Prospecting 连接第三方数据时，字段级安全与外联合规要先于「自动研究」开关。Account Plans、Einstein Activity Capture 排除规则的微调，会影响管道卫生与活动完整度，销售运营应参与验收。S2S 与 Outlook 退役日期要写进集成路线图，避免 2027 才发现渠道同步断了。

<a id="naming-map"></a>
## 更名对照与文档检索建议

在工单与搜索里，我建议同时使用新旧关键词：Revenue Cloud / Agentforce Revenue Management；Sales Cloud / Agentforce Sales；Lead Nurturing / Engagement。权限集、报表文件夹、旧 Trailhead 模块短时间内都会混用。Forecasting、Inbox、Sales Engagement 仪表板停用等条目，请销售运营单独建「报表与插件退役」清单，避免只盯智能体而漏掉代表每天打开的首页组件。大行报价异步化之后，监控指标也应从「API 平均时延」扩展到「异步任务成功率 / 队列深度 / 文档生成失败率」。

<a id="perf-cases"></a>
## 大行报价：我准备的五条性能用例

1. 接近 15,000 行的扁平报价：异步计价是否可离开页面，完成后是否通知。
2. 含多层嵌套捆绑的复杂报价：配置规则是否在合理时间内完成，失败是否可恢复。
3. 文档生成：大行报价生成是否超时，状态是否可查询。
4. 同步到商机：是否不打断销售代表当前编辑会话。
5. 爬坡交易：复利上浮与回溯修订后，发票/金额是否与财务期望一致。

每条用例记录耗时、错误码与用户可见文案。自定义按钮若仍同步等待，本版本就应改造成轮询或平台事件驱动。

销售智能体与收入引擎同时升级时，最大的组织风险是「代表在 Slack 或 Engagement 里推进了阶段，但报价配置规则尚未支持该产品组合」。预览环境要用真实产品目录联调，而不是用演示目录。财务、销售运营、CPQ 管理员应在同一场评审里签字。


