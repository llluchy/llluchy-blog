---
title: 'Winter ''27 Analytics 与 Automation：报表嵌入、Flow 与测试'
description: '精选 Winter ''27 分析与自动化：Lightning 报表嵌入 LWR、Data 360 报表、CRM Analytics，以及 Flow Builder、审批组件与测试模式。'
pubDate: '2026-09-11'
category: 'tech'
tags:
  - Salesforce
  - Winter 27
---
> **Winter '27 系列地图**：按职责找章节 → [导读树状导航](/blog/salesforce-winter27-01-overview/#series-map)  
> 01 [导读](/blog/salesforce-winter27-01-overview/) · 02 [Agentforce](/blog/salesforce-winter27-02-agentforce/) · 03 [Analytics/Automation](/blog/salesforce-winter27-03-analytics-automation/) · 04 [Commerce/Marketing](/blog/salesforce-winter27-04-commerce-marketing/) · 05 [Platform](/blog/salesforce-winter27-05-platform/) · 06 [Industries](/blog/salesforce-winter27-06-industries/) · 07 [Revenue/Sales](/blog/salesforce-winter27-07-revenue-sales/) · 08 [安全](/blog/salesforce-winter27-08-security/) · 09 [Service](/blog/salesforce-winter27-09-service/) · 10 [其他](/blog/salesforce-winter27-10-more/)

这一篇合并 **Analytics（分析）** 与 **Automation（自动化）**。两者在 Winter '27 里都更「嵌进工作流」：报表不再只能待在经典报表页，Flow Builder 则在 Cosmos 主题、编辑历史和测试隔离上补了一大截工程体验。

同样是策展，不是全文。Tableau Next 大量能力按月发布，这里只抓与 CRM 工程师日常最相关的点；Flow 则优先写会影响设计与回归的行为。

<a id="toc"></a>
## 目录

- [Analytics 总览](#analytics-overview)
- [Lightning 报表与仪表板](#lightning-rd)
- [Data 360 报表与 CRM Analytics](#data360-crm)
- [Automation / Flow Builder](#flow-builder)
- [Screen Flow、审批与编排](#screen-approval)
- [测试、调试与运行时](#test-runtime)
- [我怎么排测试](#plan)

<a id="analytics-overview"></a>
## Analytics 总览

官方把分析增强拆成 Tableau Next、Lightning 报表与仪表板、Data 360 报表与仪表板、CRM Analytics、智能应用与 Tableau。Winter '27 期间 Tableau Next 会持续按月追加（语义、可视化、MCP、指标等）——我不会在博客里追每一张「南丁格尔玫瑰图」，而是提醒：**做 Agentforce + 语义层的团队要订阅该节月度变更**。

发布说明变更里有个信号值得记：部分 Beta（例如联接报表中「仅显示跨区块匹配记录」、Data 360 报表搜索改进）在 8 月被暂时移除，原因是「尚未完全就绪」。预览期看到 Beta 条目消失，优先当产品侧踩刹车，而不是你的环境配错了。

<a id="lightning-rd"></a>
## Lightning 报表与仪表板

### 从报表预览记录（Beta）

无需离开 Lightning 报表、也不必开一堆标签页，即可在**侧边面板**预览记录，同时保留筛选、列与列表位置。销售在管道报表里切商机时特别有用。启用路径：Setup → Reports and Dashboards Settings →「在 Lightning 报表上显示记录预览」（Beta）。适用 Enterprise / Performance / Unlimited / Developer 等。

### 把报表与仪表板嵌入 LWR Experience Cloud（Beta）

此前 Lightning 报表/仪表板主要在 **Aura** Experience 站点可用。Winter '27 用原生 LWC 把它们带进 **Lightning Web Runtime（LWR）** 站点：

- 仪表板：看小组件、改筛选、刷新单个或整个仪表板。
- 报表：建图表与表格、条件格式、趋势报表、Chatter 协作、**内联编辑记录**，且不必离开站点。

如果你们的客户门户/合作伙伴门户已经（或计划）上 LWR，这是「分析是否还要外链到内部 Lightning」的架构分水岭。注意 Beta 条款，生产推广前要接受服务条款约束。

<a id="data360-crm"></a>
## Data 360 报表与 CRM Analytics

### Data 360 报表

高价值条目（名称以源译文为准）：

- **联接报表**并排比较 Data 360 对象，跨数据源找洞察。
- **多货币**分析：跨区域/业务单位比较换算后的货币值。
- **客户情绪识别（Beta）**：把情绪趋势与业务数据一起看。
- **维度层次结构下钻（GA）**：更快下钻。
- **组织层次结构查看相关报表数据（Beta）**。

做全球收入或跨 BU 对比的团队，多货币与联接报表应进第一轮预览。

### CRM Analytics

我挑对「可运维性」影响大的：

- 甘特图做按时间活动分析；分段间距与边框提升图表可读性。
- 自定义 Data 360 字段；订阅 Data 360 **实时**小组件。
- **专用回收站（GA）**：误删资产可找回——这对分析应用治理很关键。
- 提高仪表板页面上限；表格列小组件支持灵活列可见性。
- 扩展度量支持，分析更精确。

Tableau 本体仍强调「几下点击做可视化并嵌入 Lightning」；与 Tableau Next 的边界以许可与官方说明为准，别在方案评审里混称。

<a id="flow-builder"></a>
## Automation / Flow Builder

Automation 章节覆盖 Flow Builder、Flow 审批、Flow Orchestration，以及 Customer 360 / Industries 自动化。我日常 80% 时间仍耗在 Flow Builder，所以先写构建体验。

### 决策：按日期 / 字段值拆分（少写表达式）

新增决策类型 **Split by Date**、**Split by Field Value**：选字段、定义路径、用内联选择器配值，不必手写常见表达式。对营销与业务管理员友好，也减少「公式写错一条路径」的故障。

### Cosmos 主题、紧凑画布、编辑历史

- Flow Builder 自动跟随组织主题（**不支持 SLDS 2 深色模式**）。
- 画布更紧凑；元素类型与 API 名进信息 tooltip；End 变成图标。
- **编辑历史**：对支持版本管理的 Flow，可看每次保存时间线、元素级 diff、另存为新版本或新 Flow——这接近「轻量版源码历史」，排障时很香。
- 自动生成元素标签（需 Agentforce 许可等前提）；手动改过的会保留。
- **分组（Group）**：可折叠逻辑区块（滚动提供）；**未使用资源**筛选清理工具箱杂物。
- 决策路径高亮、可调面板、内联改路径名；版本比较结果侧栏化；键盘方向键在自动布局中跨故障路径移动，并支持剪切复制粘贴。
- 结束元素位置会写入元数据，保存/重载不再乱重排——对读 Flow XML 的工具是好事。
- 可在画布信息面板直接看智能体操作与工具，少跳 Builder。

### 运行上下文：强制用户权限

新增运行上下文选项 **User Context–Enforces User Permissions**：Screen Flow 与自动启动 Flow 可保证**无论何种触发**，都按运行用户权限执行。安全评审里，这是「别再默认系统上下文偷权限」的好杠杆——但要回归依赖系统上下文才能跑通的老 Flow。

<a id="screen-approval"></a>
## Screen Flow、审批与编排

### Screen Flow

- 从列表视图 / 相关列表的**批量快捷操作**跑 Screen Flow，一次处理多条记录。
- 新的 **Time** 屏幕组件采集时间值。
- 条件可见性可引用响应式公式。
- 注意：发布说明变更里，「为 Screen Flow 快捷操作设置窗口大小」曾在 8 月被暂时移除（未就绪）——以当前官方页是否仍列出为准。

### Flow 审批与 Orchestration

- 记录页 **Request Approvals** 组件最多挂 **10 个** Flow 审批流程（Lightning App Builder；Experience Builder 版引用在变更日志中被移除过，落地前再确认）。
- 可删除审批提交记录，以满足 GDPR 等合规。
- Orchestration Work Guide：可配置为专注同一编排运行中的工作项；编排运行性能改进；完成当前项后可自动打开下一工作项（Experience / App Builder 侧也有对应能力）。

<a id="test-runtime"></a>
## 测试、调试与运行时

这是我最想安利给团队的一块：

- **Flow 测试模式（Beta）**：面向记录触发与自动启动 Flow，在一处调试并保存可复用场景。
- 对操作与子流使用**模拟输出**，隔离测试。
- 可用 headless **Agentforce for Flow** 从命令行生成测试场景。
- 输入静态记录 ID；填充基本类型集合输入（变更日志曾收窄范围，注意是否含记录集合）。
- 保存时捕获字段长度违规、Create Records 缺必填，减少运行时爆炸。
- 自动重试遭遇记录锁争用的 Flow。（「动态批处理大小减少计划 Flow 限制失败」在 8 月变更中被暂时移除。）
- 针对配置为在 **API 68.0** 上运行的 Flow，有版本化运行时更新——升级 API 版本前要当一次小发布来回归。
- Flow 标签（tags）用于分类与发现；Marketing / Data 360 触发 Flow 的版本比较已扩展支持。

Marketing Cloud 相关 Flow 能力（REST 快速触发订单确认、营销对象 CRUD、复制受众 Flow、Personalize Paths 等）我会放到 Commerce/Marketing 篇交叉引用，避免本篇膨胀成第二份营销说明。

<a id="plan"></a>
## 我怎么排测试

1. LWR 站点试点嵌入一张报表 + 一个仪表板，验证筛选、刷新、内联编辑与会话权限。
2. 打开报表记录预览 Beta，在真实管道报表上做可用性与 CRUD 权限测试。
3. 选 2–3 个复杂 Flow：试编辑历史、分组、未使用资源清理；把关键路径改成 Split by Field/Date 看是否更清晰。
4. 给新建 Screen Flow / 自动启动 Flow 评估「强制用户权限」上下文；老 Flow 列出入例外清单。
5. 在预览沙盒启用 Flow 测试模式 Beta，为最高频记录触发 Flow 存回归场景；对外部调用类动作加模拟输出。
6. 确认 Request Approvals 组件与现有审批 UX 是否冲突；编排 Work Guide 自动打开下一项是否符合客服节奏。

下一篇：**Commerce + Marketing**——Shopper Agent 度量、B2B 订单失败处理、Marketing Cloud Next 智能体。

<a id="engineer-notes"></a>
## 工程师补充：分析嵌入与 Flow 回归怎么抓重点

Analytics 与 Automation 的共同点是：它们都会悄悄改变「用户以为自己还在同一个页面」。LWR 站点嵌入 Lightning 报表/仪表板之后，会话、共享规则、内联编辑权限都会在站点上下文里重新结算——预览时要用站点访客、伙伴用户、内部用户三条路径各测一遍，而不是只在桌面 Lightning 里点通过。

报表侧边预览（Beta）会减少多标签页，但也意味着记录页上的某些自定义组件、动态表单可见性规则会在窄面板里暴露布局问题。我建议挑一张字段最多的管道报表做「折磨测试」。

Flow 方面，我把回归分成构建期与运行期。构建期关注编辑历史是否能还原误改、分组是否让大型 Flow 可读、未使用资源筛选会不会误删还被公式间接引用的资源。运行期关注：强制用户权限上下文是否打断了昔日系统上下文 Flow；API 68.0 运行时版本化更新是否改变查询或赋值行为；测试模式 Beta 能否把最高频的记录触发 Flow 固化成可重复场景。

审批与编排上，Request Approvals 一页最多十个 Flow 审批，容易变成「入口过多」。产品上要收敛默认可见的审批，而不是把十个全堆上。Work Guide 自动打开下一工作项对客服吞吐有帮助，但要确认不会在用户还在写备注时抢焦点。若发布说明变更里某条 Screen Flow 窗口大小或动态批处理能力被暂时移除，就不要写进本版本对业务的承诺。

<a id="flow-marketing-cross"></a>
## 与营销自动化的交叉点

Automation 章里还有一批明显服务营销的能力：通过 REST API 更快触发订单确认 Flow，使交易消息从「数分钟」降到「数秒」；用标准记录元素直接管理营销对象；复制受众 Flow 而不中断进行中活动；Personalize Paths 预测转化。这些能力在架构上仍是 Flow，但所有权常在营销自动化团队。我建议在 Winter '27 预览里开一次联合评审：平台团队负责 API 版本与运行上下文，营销团队负责受众与同意，双方共同签测试场景。否则很容易出现「营销以为秒级发送已开、平台侧 Flow 仍钉在旧 API 版本」的缝隙。


