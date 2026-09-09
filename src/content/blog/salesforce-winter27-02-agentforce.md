---
title: 'Winter ''27 Agentforce：默认启用、元数据精简与 Voice'
description: '精选 Winter ''27 Agentforce 与生成式 AI：平台默认开启、AiAgentDefinition 迁移、Gemini 2.5 重路由到 3.5、Voice 转录与 SIP，以及审批智能体。'
pubDate: '2026-09-10'
category: 'tech'
---

这一篇只谈 **Agentforce 与生成式 AI**。我按「会影响现网 / 会影响部署流水线 / 可以稍后试点」分层写，避免把每月 changelog 整段搬过来。

源材料来自 Winter '27 中文对照（最后更新 2026.09.01）。**策展阅读，非全文**；以官方 Release Notes 与你的许可矩阵为准。

**系列导航**：上一篇 → [`salesforce-winter27-01-overview`](/blog/salesforce-winter27-01-overview/)｜下一篇 → [`salesforce-winter27-03-analytics-automation`](/blog/salesforce-winter27-03-analytics-automation/)

<a id="toc"></a>
## 目录

- [总览](#overview)
- [Agentforce Platform 默认启用](#platform-on)
- [智能体元数据：AiAgentDefinition](#metadata)
- [Gemini 2.5 → 3.5 重路由](#gemini)
- [Agentforce Voice](#voice)
- [标准操作、审批智能体与 Beta 退场](#actions)
- [权限与关闭路径](#access)
- [我准备怎么测](#test)

<a id="overview"></a>
## 总览

Winter '27 里 Agentforce 同时推进四件事：平台开关默认化、部署契约简化、语音联络中心工程化、标准资产补齐。对我来说优先级是：

1. **现有 org 何时被滚动启用平台**（从 9 月第一周起）。
2. **沙盒↔生产** 智能体迁移能不能切到 API 68.0 新元数据。
3. **2026-10-20** Gemini 重路由会不会打歪生产提示词。
4. Voice 号码上限、转录完整性、SIP 头是否匹配现有中继设计。

<a id="platform-on"></a>
## Agentforce Platform 默认启用

对由 SKU、许可与版本授予 Agentforce 访问权的组织，Winter '27 会**默认启用 Agentforce 平台**：

- **新组织**：创建时即启用。
- **现有组织**：自 9 月第一周起以滚动方式启用。
- Setup → Agentforce Agents 页上的平台设置项计划在 Winter '27 **稍晚移除**。
- 平台启用不产生额外费用，计费方式无变化。

适用 Foundations 或 Agentforce 1 等版本下的 Enterprise、Performance、Unlimited、Developer（以说明为准）。

**工程解读：**「平台开了」不等于「所有人都能用智能体」。仍然要求组织已启用 Einstein 生成式 AI；单个智能体必须在 Builder 里**激活**才对终端用户可见；Employee 类智能体等还有额外用户权限。管理员在平台启用后可直接访问 Agentforce Studio、Builder 以及分析与可观测性；其他用户继续靠权限集管控。

<a id="metadata"></a>
## 智能体元数据：AiAgentDefinition

从 **API 版本 68.0** 开始，智能体元数据被精简。以前把智能体从沙盒迁到生产，至少要拼多种元数据类型，还要手动带上关联的每一个 Apex 类、Flow、提示词模板，并指明正确版本。现在：

- 新类型：`AiAgentDefinition`、`AiAgentDefinitionVersion`
- CLI 可自动检索智能体及其依赖，例如：  
  `sf project retrieve start --metadata AiAgentDefinitionVersion --root-type-with-dependencies AiAgentDefinitionVersion`
- 通过在包清单指定 API 67.0，仍可继续用旧的 `AiAuthoringBundle`、`Bot`、`BotVersion`
- **新类型仅在第二代托管打包（managed 2GP）中受支持**

关键约束：要用新类型做组织间迁移，**两端都必须是 API 68.0**。当沙盒已是 Winter '27、生产仍是 Summer '26 时，请继续走旧元数据。这点我会写进发布 runbook，避免有人在混合版本窗口强行切新类型。

<a id="gemini"></a>
## Gemini 2.5 → 3.5 重路由

Gemini **2.5** Pro、Flash、Flash-Lite 的模型请求将于 **2026 年 10 月 20 日**重路由到 Gemini **3.5** Pro、Flash、Flash-Lite。适用于带 Einstein for Sales、Einstein for Platform 或 Einstein for Service 附加组件的 Lightning Experience（Enterprise / Performance / Unlimited 等）。

官方建议尽快在 **Prompt Builder** 与 **Einstein Studio** 用新模型测试提示词与应用，因为预期响应可能变化。我的实践是：

- 建一份「关键提示词 / Agent 动作」黄金集（含工具调用、长上下文、多语言）。
- 在预览沙盒并行跑 2.5 与 3.5（若可选），记录 diff，而不是只看单次手工试聊。
- 对温度敏感或强依赖 JSON schema 的动作，提前加校验与回退话术。

<a id="voice"></a>
## Agentforce Voice

### 通话后转录显示完整对话历史

Service Console 的 Enhance Conversation 组件，在支持语音的智能体处理通话期间及之后，会显示一致的转录。智能体转人工后，客服与客户对话的语音通话记录（VC1）在通话结束后会同时显示「智能体-客户」与「客服-客户」两段——此前结束后会丢掉智能体段。

**怎么拿到完整历史：**在转接前创建语音通话记录，并启用「关联相关语音通话（Connect Related Voice Calls）」，把 VC1 链接到智能体侧 VC2。质检与合规报表如果依赖通话后转录，这条是回归必测。

### 强制限制已采购电话号码数量

Agentforce Voice 现在强制执行 Salesforce Voice（原生电话）的号码上限：生产由许可决定；**沙盒与试用无论许可均为 10 个号**。以前未强制。预览组织里「先买一堆号再说」的习惯要改，并清理闲置号码。

### Toolkit API 灵活控制录制

开发者与管理员可用 **Salesforce Voice Toolkit API** 暂停与恢复通话录制，而**无需**「控制通话录制（Control Call Recording）」用户权限；在 Salesforce UI 里点暂停/恢复仍需要该权限。先在电话系统中开启录制，再在自动化里调用 API——适合 PCI 等「读卡号时暂停」的编排。

### 自定义 SIP 头 + REFER

可从呼入采集自定义 **SIP X-头**（客户意图、语言偏好、个案历史等），并在升级/回退时用 **SIP REFER** 返回或修改这些头（此前主要靠 UUI 头 + BYE）。在 Agentforce Voice Setup 开启「Include Custom SIP Headers and REFER Support」，然后更新智能体升级流程、回退自动启动 Flow，以及入站 Omni-Channel Flow。

<a id="actions"></a>
## 标准操作、审批智能体与 Beta 退场

2026 年 9 月相关变更里，我标了这些：

- **Experience Builder 智能体（Beta）已停止提供**；关联的 Content Creation / Fallback 子智能体从资产库移除。Beta 期创建的实例将无法再使用——有依赖的团队要立刻迁出。
- **新增 Approval Agent**：帮助销售代表与审批人提交/撤回审批、跟踪待处理请求、管理记录、检索工作项，并生成 AI 辅助摘要与评论。
- 子智能体：Approval Management、Search Approval Records、Summarize Multiple Approval Work Items。
- 操作示例：Recall Approval Submission（撤回审批提交，可附评论与成功指示）。

标准操作与子智能体的可用性随版本与许可变化，不要从发布说明「有条目」直接推断你的 org 已开通。

<a id="access"></a>
## 权限与关闭路径

官方仍保留这些控制手段，我建议写进管理员手册：

- 关闭 Agentforce 平台：在 Einstein Setup 关闭 Einstein 生成式 AI（会影响更大范围，慎用）。
- 平台开启时，管理员默认可访问 Studio / Builder / 可观测性；其他人靠用户权限。
- 授予非管理员构建能力：分配「管理 AI 智能体（Manage AI Agents）」等权限。
- 终端可用性：以智能体是否激活 + 对象/用户权限为准。

<a id="test"></a>
## 我准备怎么测

1. 记录预览沙盒与生产的 Agentforce 平台状态、Einstein 开关、权限集差异。
2. 用最新 Salesforce CLI 试 `AiAgentDefinitionVersion` 检索；混合版本窗口准备 67.0 回退清单。
3. Prompt / Agent 黄金集绑定 Gemini 3.5，盯 10-20 重路由。
4. Voice：号码配额、Connect Related Voice Calls、Toolkit 暂停录制、SIP X-头往返。
5. 搜索 org 内是否仍引用 Experience Builder 智能体 Beta。
6. 若用审批场景，试点 Approval Agent 与现有 Flow 审批是否抢职责。

下一篇：**Analytics + Automation**——LWR 嵌入报表、Data 360 报表、Flow Builder 与测试模式。


<a id="engineer-notes"></a>
## 工程师补充：智能体交付流水线怎么改

Winter '27 对智能体交付的实质影响，是「平台默认开」叠加「元数据形状变了」。我准备把流水线改成三段门禁。

**门禁 A：组织状态。** 检查 Einstein 生成式 AI 是否开启、Agentforce 平台是否已滚动启用、关键权限集是否只授予该得的人。平台启用不计费，不代表可以省略权限评审。若有人靠关平台当「总闸」，要改成「智能体停用 + 权限回收」的细粒度闸，因为关 Einstein 会影响更大范围。

**门禁 B：元数据契约。** 预览沙盒与生产都到 API 68.0 之前，禁止把 `AiAgentDefinition` 当唯一真相；清单里保留 67.0 旧类型回退。两端都 68.0 之后，再把 retrieve 命令切到带 `--root-type-with-dependencies` 的新类型，并确认 2GP 打包路径吃得下。混合版本窗口是最容易「半迁移」失败的时候。

**门禁 C：模型与语音。** 把 10 月 20 日 Gemini 重路由写成日历事件；黄金集既要覆盖提示词，也要覆盖工具调用失败时的降级话术。Voice 侧把「关联相关语音通话」、沙盒 10 个号上限、SIP 头开关做成配置检查表。质检若依赖通话后转录，必须验证智能体段在结束后仍在。

Experience Builder 智能体 Beta 退场属于「资产突然不可用」类风险：在元数据与文档里全文搜索相关模板名，能迁则迁，不能迁就明确下线公告。审批智能体适合与现有 Flow 审批做职责划分：谁负责摘要评论，谁负责最终落库与审计，避免两个系统互相撤回。



<a id="timeline"></a>
## 时间线速查（Agentforce）

我把本篇相关日期收成一张速查，方便贴进团队日历（均来自源译文，执行以官网与 org 通知为准）：

- **现有组织 Agentforce 平台滚动启用**：自 9 月第一周起。
- **预览沙盒起可用的元数据精简**：约 2026-08-24 当周起；需 API 68.0。
- **Voice 多项能力**（完整通话后转录、号码上限强制、Toolkit 录制控制）：约 2026-09-07 当周起。
- **自定义 SIP 头与 REFER**：约 2026-08-31 当周起。
- **Gemini 2.5 → 3.5 重路由**：2026-10-20。
- **Experience Builder 智能体 Beta 停止提供**：资产库移除；已建实例不可继续用。
- **Approval Agent 及审批子智能体**：随 2026 年 9 月标准资产更新出现。

如果你在写变更说明，建议单独加一节「用户会感受到什么」：平台启用本身可能无感，但管理员会突然多出 Builder 入口；模型重路由可能让既有提示词「变嘴」；Voice 转录变完整后，质检抽样标准要改。把这些写成给业务的人话，比只贴发布说明标题更有用。



<a id="ops-checklist"></a>
## 上线当天我会盯的操作项

1. 确认生产是否已落入 Agentforce 平台滚动启用批次，记录启用时间。
2. 抽查三个非管理员用户：能否看到不该看到的 Studio/Builder。
3. 跑一遍 Gemini 3.5 黄金集，保存对话与评分表，作为重路由后对比基线。
4. Voice：核对沙盒号码数量；抽一通智能体转人工通话，确认结束后两段转录都在。
5. 搜索并下线 Experience Builder 智能体 Beta 残留。
6. 若启用审批智能体，确认撤回操作的审计字段与现有审批对象一致。


在预览沟通里，我会明确告诉业务：Agentforce 平台默认启用并不自动产生新账单，但会改变管理员工具可见性与智能体部署方式；真正的费用与用量仍取决于许可、对话量与 Voice 号码等既有计量。模型重路由则可能在不改你提示词文本的情况下改变输出质量，因此必须回归，而不是「等用户投诉」。


***

**系列导航**：上一篇 → [`salesforce-winter27-01-overview`](/blog/salesforce-winter27-01-overview/)｜下一篇 → [`salesforce-winter27-03-analytics-automation`](/blog/salesforce-winter27-03-analytics-automation/)
