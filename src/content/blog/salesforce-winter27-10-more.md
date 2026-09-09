---
title: 'Winter \'27 其他：Field Service、Headless、Hyperforce、Partner、Slack'
description: 'Winter \'27 收尾篇：Field Service VRA 隐私、Headless/Vibes/MCP、Hyperforce on GCP、Partner Cloud MDF、Slack 中的 Agentforce Sales，以及我如何用这套系列。'
pubDate: '2026-09-18'
category: 'tech'
---

最后一篇收拾「独立成章但常被主云发布会省略」的主题：Field Service、Headless 360、Hyperforce、Partner Cloud、Slack，并补一句我接下来的预览节奏。读完系列仍请回到官方全文——尤其 Industries、Service、Platform 未展开的对象级变更。

**系列导航**：上一篇 → [`salesforce-winter27-09-service`](/blog/salesforce-winter27-09-service/)｜回目录感：[导读篇](/blog/salesforce-winter27-01-overview/)

<a id="toc"></a>
## 目录

- [Field Service](#fs)
- [Headless 360 与开发者智能体](#headless)
- [Hyperforce](#hyperforce)
- [Partner Cloud](#partner)
- [Slack 集成](#slack)
- [系列怎么用](#series)
- [我接下来 30 天怎么做](#next30)

<a id="fs"></a>
## Field Service

Field Service 含桌面/移动补丁说明、Customer Engagement、Mobile、Operations、排程与优化。补丁按月出，生产前要扫你们的托管包版本。

Customer Engagement 里我最在意 **Visual Remote Assistant（VRA）隐私**：

- **仅音频录制**：座席通话中仍看实时视频，但存档只留语音，降低视觉隐私风险与存储，并满足更严法规；PII 更不容易进录像。
- 切换到拍照模式时**保持语音**，座席可继续指导客户拍高清照片。
- **会话活动面板**：实时看链接送达、条款接受、摄像头/麦克风/位置授权——减少「客户到底卡住还是拒绝」的猜测。
- **按需会话录制**：会话中多次开始/停止，只采安装证明、序列号、修复演示等关键片段，而不是整场录像。

启用「仅音频录制」：应用程序启动器 → Visual Remote Assistant Configuration → Session Recording Settings。现场服务 + 远程协助合规项目，建议把录制策略写成明文运行手册。

排程、移动离线、优化等其余能力请按你们模块读官方 FS 节；本篇不展开补丁号列表。

<a id="headless"></a>
## Headless 360 与开发者智能体

Headless 360 变更可高达每月一次，覆盖 **Agentforce Vibes**、Multi-Framework、**Salesforce MCP Servers** 等。

Vibes 4.0+ 基于 Salesforce Coding Agent Platform 重构，底层编排提到 Claude 与 Mastra；在 Enterprise / Performance / Unlimited / Partner Developer / Developer 等默认启用（以说明为准）。值得盯：

- 完整开发人员指南：计划模式、子智能体、skills、MCP、模型选择、上下文、计费授权、信任验证、工作流模式。
- **地理感知路由**：AI 请求可走到距 org 最近的模型端点；可关闭回退美国区域——数据驻留敏感团队会关心。
- Flex Credit 消耗估算等周更能力——写进成本观察。

8 月变更还点到：用 Salesforce Skills 武装 AI 编码智能体；Setup 中 Agentforce 探索更多对象；Data 360 MCP 更快配置 Document AI；Agentforce for Flow 生成测试场景；API Catalog Connect REST 管理 API/MCP；Pipeline Management Configuration Skill；引导式设置帮助智能体等。

一句话：平台正在把「MCP + Skills + 编码智能体」变成一等公民；内部开发规范要开始写「哪些技能允许打生产 org」。

<a id="hyperforce"></a>
## Hyperforce

- Hyperforce 已在多个国家/地区提供数据驻留选择；计划 **2026 年 11 月**在北美推出基于 **Google Cloud** 的 Hyperforce。
- **Hyperforce on GCP**：为有特定业务/合同要求的客户提供 AWS 之外选项（适用位置写明美国等，以官方为准）。
- **Edge Network** 自助路由进入 My Domain 设置；区域路由对全球 Hyperforce 组织开放。
- **MuleSoft** 即将登陆 Government Cloud Plus 与 Government Cloud Plus – Defense。
- Government Cloud 提供沙盒 **Quick Create / Quick Clone**，多数客户感觉比传统快两到三倍。
- 产品区域扩展示例：Data 360 / Agentforce 在以色列与南非等；B2C Commerce 在澳/日/瑞典等；Marketing Cloud 在以/南非等；Event Log Objects 在更多国家可用。

架构与采购同学：若合同绑定云厂商或政府合规，把 GCP Hyperforce 与 GC MuleSoft 纳入 2026Q4 评估，而不是等迁移窗口前四周才读公告。

<a id="partner"></a>
## Partner Cloud

- **Partner Success Agent** 管理 MDF：预算查询、资金申请与理赔的引导式协助，降低行政开销并改善审计轨迹。
- 联合商业计划目标：**自动关联/取消关联**合格记录（约每 24 小时或按需），支持 Account、Opportunity Line Item、Order、Order Item 等。
- **Campaign Marketplace**：合作伙伴发现并注册供应商活动；基于层级/账户属性/预算开放；注册后生成继承营销资产的子活动。
- 跨客户互动跟踪合作伙伴活动：客户可查看合作伙伴可约时间并预约；渠道经理获得可见性（此前伙伴日历较黑盒）。

渠道销售 + Experience 站点的团队，把 Marketplace 组件与权限集组（Salesforce Go 启用）排进预览。

<a id="slack"></a>
## Slack 集成

Winter '27 Slack 节相对聚焦但很关键：

- **Agentforce Sales 可直接在 Slackbot 中使用**，由 **Agentforce Sales MCP** 把 CRM 数据、智能体与业务上下文连到 Slack；Slack 中的操作回写 Salesforce，含 Pipeline Management。
- 专用 **Agentforce Sales in Slack Go** 页面让管理员快速完成设置，无需手工 MCP 配置。
- 适用 Sales Cloud Enterprise / Unlimited / Agentforce 1 / Developer 等，并需 **Slack Business+** 或更高；功能于 2026 年 8 月可用。

这与 Revenue 审批 Slack 通知、Energy 多站点上传通知、Education 出勤通知等「散落各云的 Slack 点」不同——这是销售主路径级嵌入。治理上要定：哪些动作允许在 Slack 完成、如何审计、如何防止误触批量更新。

<a id="series"></a>
## 系列怎么用

十篇对应我的阅读切片：

| 篇 | 路径 |
| --- | --- |
| 01 导读与发布更新 | `/blog/salesforce-winter27-01-overview/` |
| 02 Agentforce | `/blog/salesforce-winter27-02-agentforce/` |
| 03 Analytics + Automation | `/blog/salesforce-winter27-03-analytics-automation/` |
| 04 Commerce + Marketing | `/blog/salesforce-winter27-04-commerce-marketing/` |
| 05 Platform | `/blog/salesforce-winter27-05-platform/` |
| 06 Industries 精选 | `/blog/salesforce-winter27-06-industries/` |
| 07 Revenue + Sales | `/blog/salesforce-winter27-07-revenue-sales/` |
| 08 Security | `/blog/salesforce-winter27-08-security/` |
| 09 Service | `/blog/salesforce-winter27-09-service/` |
| 10 其他 | `/blog/salesforce-winter27-10-more/` |

请记住：**准确性优先于完整性**；我显式跳过了大量对象字段级变更与行业长尾。以 Salesforce 官方 Winter '27 Release Notes 为权威来源。

<a id="next30"></a>
## 我接下来 30 天怎么做

1. 确认预览沙盒策略与实例维护窗口；订阅仍按月变的 Data 360 / Tableau Next / Field Service 补丁 / Vibes 周更。
2. 安全与身份：Connected Apps 盘点 + Release Updates Test Run（导读 + 本系列 08）。
3. Agentforce：平台状态、Gemini 3.5 回归、Voice 配额与转录（02 + 09）。
4. 平台：API 版本与 LWC 68.0 试点（05）。
5. 业务云：只深挖我们实际启用的 Commerce/Marketing/Revenue/Service/Industries 节。
6. Slack Sales Go 页面在非生产打开，定治理规则后再谈推广。
7. 把障碍与缺口记下来，用 `#Winter27Feedback` 反馈。

我是 llluchy。若某章与你们 org 的许可对不上，以 Setup 与合约为准——发布说明「有条目」从不等于「你已开通」。


<a id="engineer-notes"></a>
## 工程师补充：收尾篇的共同主题

Field Service VRA、Headless MCP、Hyperforce 多云、Partner MDF 智能体、Slack 销售——看起来分散，共同主题是**边界上的信任**：录制是否含视频、模型请求落在哪个区域、政府云能否用 MuleSoft、合作伙伴能否自助花 MDF、代表能否在 Slack 改管道。

信任问题不能只靠功能开关。VRA 仅音频与按需录制要写成现场脚本；Vibes 地理路由与关闭回退美国要写入开发者安全基线；GCP Hyperforce 与 GC 沙盒加速要进架构决策记录；Partner Campaign Marketplace 要配好资格条件以免错误投放；Slack Sales 要定审计与权限，防止聊天里的一次误操作改掉预测。

系列写到这里结束。若你只读一篇，请读导读篇的发布更新表，然后只深挖你们已购买的云。我是 llluchy，这篇以及同系列文章都基于 Winter '27 中文对照策展，**请以官方 Release Notes 为最终依据**，并在沙盒验证后再进生产。



<a id="reading-order"></a>
## 若时间不够，请按这个顺序砍范围

时间不够时，我建议的最小阅读集是：01 导读（强制更新）→ 08 安全（OAuth）→ 02 Agentforce（默认启用与模型）→ 你们正在实施的业务云一篇 → 10 收尾里与自己相关的 Hyperforce/Slack/FS。Industries 与 Marketing 长尾、Tableau Next 月更、Field Service 补丁号，改成「订阅官方变更」而不是「一次读完」。Headless 的 Vibes/MCP 适合开发平台组每周扫，不适合全员会通读。这样可以把 Winter '27 从「不可能读完的 PDF」变成「可执行的几张工单」。



<a id="hyperforce-questions"></a>
## 给架构评审的三个 Hyperforce 问题

1. 我们是否有合同或数据驻留要求，需要评估 2026 年 11 月北美 GCP Hyperforce？
2. Government Cloud 是否需要 MuleSoft 与沙盒 Quick Create/Clone？预期环境供给时间能否缩短？
3. Edge Network 自助路由与区域路由打开后，DNS/证书与现有自定义域流程谁来改？

Field Service 侧则问：VRA 录制是仅音频、整场视频，还是按需片段？谁有权开始/停止录制？Partner 与 Slack 侧问：MDF 智能体能否写资金申请、Slack Sales 能否改阶段——权限与审计是否足够。把问题抛给架构评审，比把整章发布说明贴进会议材料更有效。


写完十篇，我自己的感受是：Winter '27 真正的主线是「Agentforce 成为默认工作方式」叠加「安全与 API 契约收紧」。Field Service、Hyperforce、Partner、Slack 是这条主线在边界场景的投影。若你的团队只能做三件事，请做：发布更新与 OAuth 迁移、Agentforce/模型回归、以及一条与你业务相关的端到端智能体链路。其余交给订阅与分期。



<a id="partner-slack-ops"></a>
## Partner 与 Slack：运营侧注意点

**Partner Cloud：** Partner Success Agent 做 MDF 查询与申请时，要定义哪些字段必须人工复核（例如金额阈值）；自动合格记录管理每 24 小时跑一次，按需刷新可用于季度末冲刺，但要防止错误关联污染联合商业计划目标。Campaign Marketplace 的资格条件（层级、账户属性、预算）配错会导致错误伙伴看到活动——上线前用两个不同层级伙伴账号做负向测试。日历可见性提升渠道经理洞察，也提高隐私敏感度，需告知伙伴用户。

**Slack Sales：** Go 页面降低了 MCP 手工配置门槛，但降低门槛不等于降低风险。建议：仅对试点销售组开放；限制可执行的阶段变更与金额字段；打开后再核对 Salesforce 字段历史与 Slack 审计。Slack Business+ 许可不足时不要承诺全公司启用。与 Advanced Approvals 的 Slack 通知、各行业的 Slack 事件通知做通道分层，避免所有机器人挤在同一频道。


---

**系列导航**：上一篇 → [`salesforce-winter27-09-service`](/blog/salesforce-winter27-09-service/)｜系列第一篇 → [`salesforce-winter27-01-overview`](/blog/salesforce-winter27-01-overview/)
