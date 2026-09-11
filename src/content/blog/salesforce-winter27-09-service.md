---
title: 'Winter ''27 Service：联络中心、消息与 IT Service'
description: '精选 Winter ''27 Service：Agentforce Contact Center 语音、Partner Contact Center、Messaging、Agentforce IT Service、个案与 Knowledge。'
pubDate: '2026-09-17'
category: 'tech'
tags:
  - Salesforce
  - Winter 27
---
> **Winter '27 系列地图**：按职责找章节 → [导读树状导航](/blog/salesforce-winter27-01-overview/#series-map)  
> 01 [导读](/blog/salesforce-winter27-01-overview/) · 02 [Agentforce](/blog/salesforce-winter27-02-agentforce/) · 03 [Analytics/Automation](/blog/salesforce-winter27-03-analytics-automation/) · 04 [Commerce/Marketing](/blog/salesforce-winter27-04-commerce-marketing/) · 05 [Platform](/blog/salesforce-winter27-05-platform/) · 06 [Industries](/blog/salesforce-winter27-06-industries/) · 07 [Revenue/Sales](/blog/salesforce-winter27-07-revenue-sales/) · 08 [安全](/blog/salesforce-winter27-08-security/) · 09 [Service](/blog/salesforce-winter27-09-service/) · 10 [其他](/blog/salesforce-winter27-10-more/)

Service 章在源文档里同样庞大。我按运维视角拆：**联络中心（原生 AFCC vs Partner）**、**消息渠道**、**Agentforce IT Service**、以及个案/知识/自助等「代表每天点的东西」。Agentforce Voice 的深度能力在第 2 篇，这里补 Contact Center 产品化与周边。

策展，非全文。Salesforce Voice (Native Telephony) 现成为 Agentforce Contact Center 的一部分，文档可能混用旧名。

<a id="toc"></a>
## 目录

- [联络中心版图](#cc-map)
- [Agentforce Contact Center Voice](#afcc)
- [Partner Contact Center](#partner-cc)
- [Messaging](#messaging)
- [Agentforce IT Service](#itsm)
- [个案、知识、HR 与自助](#case-knowledge)
- [我怎么组织预览](#plan)

<a id="cc-map"></a>
## 联络中心版图

官方让你在两者间选择（或并存理解边界）：

- **Agentforce Contact Center（AFCC）**：完全原生、AI 优先，内置电话与 Workforce Engagement Management 等。
- **Partner Contact Center**：原 Salesforce Voice with Telephony Providers / Service Cloud Voice 思路，把 Amazon Connect 等第三方 CCaaS 接到 Salesforce。

共享能力（Messaging 等）两边都会碰到。架构评审先画清：号码与中继在谁那里、录音存哪、灾难切换谁通知客服——再决定功能清单。

<a id="afcc"></a>
## Agentforce Contact Center Voice

精选增强（名称以源译文为准）：

- **Bring Your Own Carrier**：把自有运营商与号码带进 AFCC；E.164 加号、建中继承载入站/出站；只有同步成功的号码才能建语音渠道；列表带 BYOC 标志。
- **免费主叫号码作组织级出站 CLI**：提高回拨识别与接听率；此前 TFN 作 CLI 受限。
- **号码掩码**：控制出站号码可用性并保护隐私。
- 与第 2 篇衔接：转录完整性、号码采购上限（沙盒 10）、Toolkit 录制控制、SIP X-头与 REFER。

Workforce Engagement Management：预测性 AI 预测、产能规划、日程、日内可见性、质量评估与绩效洞察——把 WFM 从「外围系统」拉进 CRM。若你们已有独立 WFM，要评估双系统职责，避免排班真相分裂。

<a id="partner-cc"></a>
## Partner Contact Center

面向 Amazon Connect 等集成的增强示例：

- 借助 Agentforce 设置管理联络中心用户。
- 从 Omni-Channel 小组件访问电话簿。
- 语音通话记录变更审计跟踪（Pilot）。
- 同步所有 Amazon Connect 队列类型。
- 更多 Amazon Connect Customer AI 功能改为**默认关闭、需选择加入**——安全与成本友好，但意味着「升级后突然多了 AI」的风险下降，同时你要主动决定开哪些。
- 灾难恢复区域切换时让客服知情。
- 自主电话号码分配管理主叫身份；个性化语音留言问候；外呼 Voicemail Drop；在客服就绪前阻止来电以稳定体验。

Partner 模式的回归重点永远是：**CCP/软电话状态机 + Salesforce 状态 + 队列映射** 三者一致。

<a id="messaging"></a>
## Messaging

消息侧我挑会碰到项目经理问「能不能马上开」的：

- 控制谁能访问消息组件。
- **Apple Messages for Business** 客户外联。
- 统一消息渠道上 WhatsApp 对话升级为语音；更清晰理解统一 WhatsApp 能力与默认路由。
- 自行发起 WhatsApp 模板迁移；动态 WhatsApp Flow 展示外部数据源数据。
- 在 Salesforce 查看 Service WhatsApp 健康状态；与 Meta 侧设置排障更顺。
- 采集会话结束后提交的 WhatsApp Flow 回复。
- 聊天转接时通知客户；报表覆盖「接受到首次响应」用时。

WhatsApp / Apple 渠道强依赖外部平台政策与模板审核，预览组织能开不等于生产日能发——把外部审核时间算进项目计划。

<a id="itsm"></a>
## Agentforce IT Service

对话优先的 IT 服务：把客户服务与 IT 服务连接，主动识别并沟通客户问题；工单评论改进事件沟通；「邮件转事件」增强内容/模板/错误处理；自动权利分配加快 VIP 员工支持；简化事件归属字段；控制台增强；IT 服务记录上报表与审计跟踪；Omni 路由服务请求；阶段流转管理生命周期；流程步骤与员工上下文指导客服；动态仪表板与负责人仪表板；Agentforce 自动化硬件生命周期；强制 IT 硬件资产范围保护计费完整性等。

对企业内 IT SM 与客户服务同属一家 Salesforce 的组织，这是「一套控制台看清客户影响」的机会；权限模型要防止 IT 数据过度暴露给客户服务代表，或反过来。

<a id="case-knowledge"></a>
## 个案、知识、HR 与自助

- **个案**：主题与描述即时翻译；AI 驱动语气与清晰度建议优化个案评论——代表少切换工具，但要定「AI 改写是否需人工确认」的政策。
- **权利与重大事件**：可删除个案重大事件，避免错误关联导致视图污染与存储膨胀。
- **面向服务的 AI**：Work Summaries 扩展语言，并扩到语音与 Enhanced Messaging；Service Replies for Email 扎根 Enterprise Knowledge。
- **Knowledge**：Knowledge Blocks 复用模块化内容；Einstein Knowledge Creation + 自定义提示模板从任意记录起草；Knowledge Similarity 防重复。
- **HR Service**：Cornerstone 集成；预构建库扩展（薪酬奖励查询、班次、入职任务等）；一键部署到 Microsoft Teams；更多 HR 工作流模板。
- **自助**：引导式设置、自动消息部署、主动故障排除、移动通知，加快门户搭建。

Service Assistant 等还有月度说明——做动态计划/服务计划的团队请另订阅该月度节。

<a id="plan"></a>
## 我怎么组织预览

1. 画 AFCC vs Partner 架构图：号码、录音、队列、DR。
2. AFCC：BYOC 中继同步、TFN CLI、掩码策略；叠加 Voice 篇用例。
3. Partner：Connect AI 功能保持默认关，逐项选择加入；测区域切换通知。
4. Messaging：选一条主渠道（如 WhatsApp）跑通模板迁移、健康状态、转接通知与首次响应报表。
5. IT Service：选一个 VIP 权利自动分配场景 + 一封邮件转事件模板做端到端。
6. Knowledge：用 Similarity 扫重复；试点 Blocks；定 AI 起草文章的审核流。
7. 个案翻译与评论建议：选双语队列做质量抽检。

下一篇收尾：Field Service、Headless 360、Hyperforce、Partner Cloud、Slack 等。

<a id="engineer-notes"></a>
## 工程师补充：服务云预览的值班视角

从值班角度看 Winter '27 Service，我最怕三件事：号码与中继同步成功但渠道仍不可用、第三方 AI 功能默认状态与文档假设不一致、消息模板在外部平台卡审。AFCC 的 BYOC 要求「同步成功才能建渠道」，意味着监控要盯同步作业而不仅是通道心跳。Partner Contact Center 把更多 Amazon Connect AI 功能默认关闭，是好事，但升级说明要写清「不会自动变聪明，需要选择加入」，避免业务误以为功能回归。

消息渠道上，WhatsApp 升级语音、模板迁移、健康状态面板，都应进运行手册。转接通知与首次响应报表是体验指标，也是外包 SLA 的弹药，尽早对口径。IT Service 与客户服务打通后，事件评论与客户沟通可能流出 IT 术语——模板与错误处理要两套语气。Knowledge Blocks 与 Similarity 能降重复，但要配编辑责任人，否则模块化内容会变成新的失控共享文档。个案翻译与评论 AI 建议，建议在双语队列试点并保留人工确认策略，尤其是受监管行业。

<a id="voice-crosslink"></a>
## 与 Agentforce Voice 篇一起读

读 Service 时请同时打开本系列 Agentforce 篇：联络中心产品名（AFCC）与 Voice 工程能力（转录、SIP、Toolkit、号码上限）是同一件事的两面。只上 AFCC 功能而不改通话记录关联，质检仍会丢智能体段；只改 SIP 头而不改运营话术，升级流程会混乱。Workforce Engagement Management 进入 CRM 后，排班「真相来源」必须写进运维文档。HR Service 进 Teams、自助门户引导式设置，则分别交给 HRIT 与数字渠道团队，服务云工程师做平台评审即可，但仍要确认许可与数据边界。

<a id="channel-matrix"></a>
## 渠道矩阵：升级周用来对口径

建议画一张表，行是渠道（AFCC 语音、BYOC、Partner/Amazon Connect、WhatsApp、Apple Messages、Web Messaging、Email），列是：号码/发送身份在哪、录音/抄送存哪、AI 功能默认开还是关、模板是否需外部审核、转接是否通知客户、报表指标负责人。升级周每天更新一列状态。这样当业务问「WhatsApp 升语音能不能开」时，你可以对着矩阵回答依赖，而不是凭记忆。IT Service 与 Knowledge 另建子表，避免和联络中心混在同一张导致噪音。

服务预览的成功标准，我建议写成可观测指标：转接后转录完整率、WhatsApp 模板发送成功率、首次响应时长报表可用性、IT 邮件转事件自动建单准确率、Knowledge Similarity 发现的重复草稿数。功能开关打开只是起点，指标稳定才是终点。与外包联络中心合作时，把矩阵与指标写进合同附件，升级周对账会轻松很多。

<a id="ai-service"></a>
## 面向服务的 AI 与个案工具（再补一层）

除联络中心外，Service 章还强调：

- **Work Summaries** 扩展语言支持，并覆盖语音通话与 Enhanced Messaging 会话——质检与交接班会直接受益，但摘要质量要用抽检校准。
- **Service Replies for Email** 更深绑定 Enterprise Knowledge，回复应可追溯知识来源，减少「模型瞎编政策」。
- 个案主题/描述**即时翻译**，评论可获语气与清晰度建议：适合多语言外包坐席，但受监管内容建议保留人工确认。
- 可删除个案上的重大事件关联，清理错误关联与存储膨胀。
- **Knowledge Blocks**、Einstein Knowledge Creation（自定义提示模板从任意记录起草）、**Knowledge Similarity** 防重复。
- **HR Service**：Cornerstone 集成、薪酬/班次/入职类预构建智能体、一键进 Microsoft Teams、新增工作流模板。
- 自助门户：引导式设置、自动消息部署、主动故障排除、移动通知。

这些能力分散在不同许可包。预览前先在 Setup 核对你们实际拥有的附加组件，再决定试点队列，避免「发布说明有、组织里找不到按钮」的空转。


