---
title: 'Winter ''27 Commerce 与 Marketing：店面智能体与活动编排'
description: '精选 Winter ''27 Agentforce Commerce 与 Marketing Cloud Next：Shopper Agent 分析、B2B 订单失败处理、订阅定价，以及营销智能体与渠道增强。'
pubDate: '2026-09-12'
category: 'tech'
---

这一篇合并 **Commerce（现亦称 Agentforce Commerce）** 与 **Marketing**。两者都在把 Agentforce 嵌进「获客 → 成交 → 复购」链路；工程上我更关心度量口径、失败订单资源释放、旧编排兼容，以及营销侧新智能体与 API。

策展阅读；B2C 还有独立的 26.x 部署时间表，请按 POD 看官方表，不要只记 Salesforce 主版本名。

**系列导航**：上一篇 → [`salesforce-winter27-03-analytics-automation`](/blog/salesforce-winter27-03-analytics-automation/)｜下一篇 → [`salesforce-winter27-05-platform`](/blog/salesforce-winter27-05-platform/)

<a id="toc"></a>
## 目录

- [命名与范围](#naming)
- [B2C：Shopper Agent 与部署节奏](#b2c)
- [B2B：购物车、失败订单与订阅](#b2b)
- [Payments](#payments)
- [Marketing Cloud Next / Agentforce Marketing](#mcn)
- [其他营销产品线（点到为止）](#other-mkt)
- [我的落地顺序](#plan)

<a id="naming"></a>
## 命名与范围

源说明写明：**Commerce 现已更名为 Agentforce Commerce**，应用与文档里仍可能出现 Commerce 字样。章节可能覆盖 B2C Commerce、B2B Commerce、Omnichannel Inventory、Order Management、Point of Sale、Payments 等——本篇只抽 Winter '27 里我判断影响面最大的几组。

<a id="b2c"></a>
## B2C：Shopper Agent 与部署节奏

### 部署时间表意识

B2C 主版本按四阶段推到各 POD；26.10 等被标进 Winter '27 发布说明窗口。预览、预览更新、各区域 POD 日期不同，且可能变动。生产窗口常在当地 POD 凌晨。做 SFRA / 自定义 cartridge 的团队，请把「实例落在哪一波」写进变更日历，而不是假设与核心 CRM 同一天切。

### Shopper Agent 分析：Agentforce Commerce Client

由 Agentforce 驱动的店面 **Shopper Agent** 引导发现、促销问答与安全结账。Winter '27 强调用 **Agentforce Commerce Client** 衡量智能体带来的转化与收入：在一处跟踪受智能体影响的订单、转化率、AOV，并与全站基线对比。

实现细节：分析数据来自 Agentforce Commerce Client，现由 **`plugin_commerce_client` cartridge** 提供，**取代已停用的 `plugin_shopper_agent` cartridge**。若你们仍挂旧 cartridge，这是明确的迁移项——度量不准会直接误导「智能体值不值」的业务结论。

<a id="b2b"></a>
## B2B：购物车、失败订单与订阅

### 订单模板复用

买家可将单个产品或整个购物车存为**订单模板**（保留捆绑、数量、订阅选择），再用来填充购物车；也可一次加入多个模板。新商店自动启用；现有商店要在 Experience Builder 把组件加到商品/购物车/导航/个人资料等页。

### 待处理 / 失败状态可见

下单后买家能立刻看到订单处于待处理还是失败。此前确认页在这些状态下可能不显示记录；更早的待处理订单也可能不出现在订单历史。这对「用户以为没下成、实际卡在中间态」的支持工单很有帮助。

### 失败订单：释放预留 + 邮件

- 订单失败时可**自动释放已预留资源**，减少库存不匹配；支付冲正或自定义清理需另行配置。
- 购物车状态为 Failed 时，可自动发「订单创建失败」邮件；待处理状态不发。

### Summer '25 之前的 Place Order 编排

若商店在 Summer '25 前创建且仍用旧 **Place Order** 编排，会被排除在 **Order Ingestion** 作业之外——该后台进程负责结账/购物车转订单。也就是说，旧编排商店的会话会被跳过。这是升级清单上的硬项：要么迁新编排，要么接受不被 ingestion 处理的后果。

### 促销与订阅

- 促销规则可作用于品类及其子品类，并用高级规则控制层次适用方式。
- 订阅：更灵活的配置与定价控制；可对订阅产品应用定价调整；覆盖调整、按量分层、合同定价与定价过程计划可延伸到订阅生命周期。

<a id="payments"></a>
## Payments

Salesforce Payments 侧，说明提到通过 **Stripe** 与 **Adyen** 集成中的新支付方式，为 B2B 买家提供更多选项，减少结账摩擦并覆盖更多国际客户。具体方式列表以官方 Payments 小节与支付服务商文档为准；集成测试要覆盖失败重试与部分支付场景，而不是只测 happy path。

<a id="mcn"></a>
## Marketing Cloud Next / Agentforce Marketing

Marketing Cloud Next（亦称 Agentforce Marketing）在 Winter '27 的主线是：自我优化活动、更好绩效指标、脚本能力、RCS 扩展，以及 Flow 完成动作自动化任务。

### 新的营销智能体

Agentforce 引入面向「策略到内容」自动化的营销智能体，以及处理大批量潜在客户生成与培育的智能体；营销人员保留可见性与控制。变更日志点名例如 **Buyer Engagement Agent**（生成更多合格潜在客户）、以及通过 **Agentforce Marketing Goals Agent** 运行自我优化活动、**Agentforce Content Agent**（工作区对话生成消息草稿与图片，可发布到 Salesforce CMS 供活动使用）等——开通依赖 Marketing Cloud Next Growth/Advanced + Foundations 等组合，Government Cloud 有不支持项，落地前对许可。

### Campaigns / Content / Channels（精选）

- 完成动作加速营销工作流；从活动记录快速访问自定义 Flow 模板。
- 批量删除文件夹与内容；Brand Center / 品牌工具包做单一事实来源；脚本个性化内容块。
- 邮件：以收件人身份预览个性化、修复已发送邮件跟踪链接、更多语言、图片推荐器、投递监控。
- 渠道：更有效的 RCS 与报表；闪信；WhatsApp 在电话号码不可用时可用用户名触达等。
- 受众：从活动创建可操作列表；记录触发 Flow 更新同意数据。
- 零售触发器：里程碑 / 再激活 / 补货旅程；唯一优惠券码。
- 管理：Salesforce Go 简化启用；对营销对象与 Web 跟踪有更多控制。
- 开发：REST API 跨邮件/SMS/WhatsApp/移动应用管理 CMS 内容；**Direct Email Send API** 程序化发信。

Flow 侧与营销对象 CRUD、快速触发订单确认消息等，也在 Automation 章出现——两边要对齐责任人，避免「营销建 Flow、平台团队不知道 API 版本」。

<a id="other-mkt"></a>
## 其他营销产品线（点到为止）

- **Marketing Cloud Account Engagement**：下一代能力与 Agentforce 增强。
- **Marketing Cloud Engagement**：统一数据引导式设置、匹配规则、WhatsApp 扩展、对话式邮件、安全控制、AI 辅助运营工具。
- **Marketing Intelligence**：扩展摄取、历史回填、管道监控、校验、AI 建议。
- **Personalization / Loyalty / Real-Time Offer / Referral**：个性化目标、促销叠加、Agentforce 从活动简报起草优惠、SMS 推荐等——按你们是否采购再深挖官方对应节。

<a id="plan"></a>
## 我的落地顺序

1. B2C：确认 cartridge 是否已切 `plugin_commerce_client`；对齐 Shopper Agent 与全站基线报表。
2. 对照 B2C POD 时间表，给每个实例标预览/生产波次。
3. B2B：清点 Summer '25 前 Place Order 编排商店；配置失败订单释放与邮件；现有店补订单模板组件。
4. 订阅与促销规则在层次品类上的适用性做价格审计用例。
5. Marketing：在非生产启用 Content / Goals / Buyer Engagement 等智能体之一，验证 CMS 发布与活动编排权限；开发侧评估 Direct Email Send API。
6. 与 Automation 篇对齐：营销 Flow 的 API 版本、完成动作、同意数据更新路径。

下一篇：**Platform**——Apex/API 68.0、LWC、Experience、Data 360 与开发者工具。


<a id="engineer-notes"></a>
## 工程师补充：店面度量与营销智能体的责任边界

Commerce 更名 Agentforce Commerce 之后，最大的工程风险不是名字，而是**度量与编排两套旧资产**。Shopper Agent 的分析若仍挂在已停用的 `plugin_shopper_agent`，业务会基于错误的转化故事做预算；请把切换到 `plugin_commerce_client` 当成发布阻塞项。B2C 的 POD 波次与核心 CRM 不同步，意味着「CRM 已 Winter '27、店面还在上一波」会并存——集成合同测试要按实例波次复制，而不是按公司统一日期。

B2B 失败订单自动释放预留与失败邮件，能减少库存与客服噪音，但支付冲正不会替你自动完成：支付、库存、订单状态机要画在一张时序图上。Summer '25 前 Place Order 编排被 Order Ingestion 跳过，是典型的「旧店还能下单、后台却不按新管道走」陷阱，升级清单里应强制点名。

Marketing Cloud Next 的智能体把策略、内容、潜在客户培育往前推，同时要求 Foundations 与版本组合满足。Government Cloud 不支持某些能力时，不要在统一全球方案里假设一致。Content Agent 把内容推到 CMS 后，权限与品牌工具包（Brand Center）要先成为单一事实来源，否则智能体只是更快地制造不一致。Direct Email Send API 与 Flow 完成动作会让「谁能触发发送」变得更代码化——把密钥、命名凭据与审计日志纳入与 CRM 集成同等的管控。



<a id="more-mkt"></a>
## 营销侧我还会翻的几页

除了 Marketing Cloud Next，我自己还会按采购情况快速翻：

- **Account Engagement**：下一代功能与 Agentforce 能力，活动、受众、渠道增强。
- **Engagement**：统一数据引导设置、匹配规则、计划文件活动、WhatsApp 扩展、对话式邮件、安全控制、AI 辅助运营。
- **Marketing Intelligence**：摄取、历史回填、管道与连接监控、校验、AI 建议改进活动表现。
- **Personalization / Loyalty / Real-Time Offer / Referral**：个性化目标、多里程碑奖励、表格规则促销、Agentforce 从简报起草优惠、SMS 推荐与 Tableau 跟踪等。

这些页不在本篇展开，但如果你的栈里有它们，请不要只读 Next 就结束。Commerce Payments 的 Stripe/Adyen 新支付方式同样要进结账回归，尤其是国际买家与失败重试路径。订单模板、失败可见性、预留释放，建议与客服知识库文章同步更新，减少「页面已改、话术未改」的工单。



<a id="b2b-checklist"></a>
## B2B / B2C 预览检查表（精简）

- cartridge 是否已是 `plugin_commerce_client`？旧 `plugin_shopper_agent` 是否卸载？
- 每个 B2C 实例的 26.x 波次日期是否写进变更日历？
- 现有 B2B 店是否已加订单模板组件？失败订单是否配置预留释放与失败邮件？
- 是否仍有 Summer '25 前 Place Order 编排商店被 Order Ingestion 跳过？
- 订阅促销与品类层次规则是否用真实价目表做过价格审计？
- Marketing：Content/Goals/Buyer Engagement 等智能体的许可组合是否满足？CMS 发布权限是否收敛？
- Direct Email Send API 的调用方是否走命名凭据并写审计？


最后补一句组织协同：店面智能体的转化报表若要进经营分析，需要与 Analytics/Data 360 团队对齐「受智能体影响订单」的定义；营销智能体生成的 CMS 内容要有品牌审核队列，避免「生成即发布」。这些流程不在发布说明里，却决定 Winter '27 能力能不能安全地用于生产活动。



<a id="naming-commerce"></a>
## 文档与培训里的命名

对外培训材料建议同时写「Commerce / Agentforce Commerce」「Marketing Cloud Next / Agentforce Marketing」，并注明应用内可能仍显示旧名。这样减少「我在 Setup 搜不到」的工单。B2C 部署表、B2B 失败订单行为、营销智能体许可组合，是三份应分发给不同所有者的一页纸，而不是塞进同一份 50 页 PPT。


***

**系列导航**：上一篇 → [`salesforce-winter27-03-analytics-automation`](/blog/salesforce-winter27-03-analytics-automation/)｜下一篇 → [`salesforce-winter27-05-platform`](/blog/salesforce-winter27-05-platform/)
