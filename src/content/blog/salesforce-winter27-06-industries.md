---
title: 'Winter \'27 Industries 精选：我只盯影响面大的'
description: 'Winter \'27 Industries 策展：汽车、通信、医疗、制造、公共部门与行业通用能力中，我优先验证的 Agentforce 与流程条目。'
pubDate: '2026-09-14'
category: 'tech'
---

Industries 一章在源文档里非常长（汽车、通信、消费品、教育、能源、金融、医疗、保险、生命科学、制造、媒体、净零、非营利、行业通用……）。**我不会也不应该在博客里逐条翻译。** 这一篇是策展：按「Agentforce 是否直接进前台」「是否改变核心交易/理赔/排班链路」「是否和 Platform/Revenue 共用组件」来挑。

若你只做单一行业云，请回到官方该行业小节做完整阅读；本篇目标是帮多产品团队建立雷达。

**系列导航**：上一篇 → [`salesforce-winter27-05-platform`](/blog/salesforce-winter27-05-platform/)｜下一篇 → [`salesforce-winter27-07-revenue-sales`](/blog/salesforce-winter27-07-revenue-sales/)

<a id="toc"></a>
## 目录

- [怎么筛选 Industries 发布说明](#method)
- [Automotive](#auto)
- [Communications](#comms)
- [Health](#health)
- [Manufacturing 与 Consumer Goods](#mfg)
- [Financial Services / Insurance / Life Sciences](#fsi)
- [Education / Energy / Media / Nonprofit](#other)
- [公共部门（Public Sector）](#public)
- [行业通用与我的验证法](#common)

<a id="method"></a>
## 怎么筛选 Industries 发布说明

我用四问快速过滤：

1. 是否引入/迁移到**新 Agentforce Builder** 或前台智能体（Experience 站点可点）？
2. 是否改动**报价/订单/理赔/排班**等钱与合规相关主路径？
3. 是否依赖 **Revenue Management / Data 360 / Slack / Voice** 等共享底座（要跨团队测）？
4. 是否提供 **Salesforce Go 一键配置**——意味着预置解法可能覆盖你们半年的手工 Setup。

下面按行业点名，细节以官方为准。

<a id="auto"></a>
## Automotive

开篇能力很「Agentforce 化」：

- 完整催收与收回（repossession）生命周期，含非违约收回（租期结束、事故、扣押等）。
- **Warranty Claims Adjudication Assistant** 加快保修理赔裁定、降赔付风险。
- **Sales Concierge** 延伸到 Experience Cloud：自然语言搜车/产品、建商机与报价、预约试驾、置换估价、起草邮件。
- Asset Service Management、Sales Concierge Agent、Dealership Navigator 等进入**新 Agentforce Builder**。
- Salesforce Go 一键部署 Connected Vehicle、Auto Finance Service Process 等预配置。

若你们有经销商门户，优先测 Concierge 在 Experience 站点的权限、库存真实数据与线索写入质量，而不是只在内部 Builder 里聊天。

<a id="comms"></a>
## Communications

通信行业把 **Agentforce 报价自动化**、Communications Sales Insights、Enterprise Sales Management（集中定价、警告、克隆、多站点/订单自动化）和 **Revenue Cloud for Communications**（产品关系、优惠券、期限折扣、可叠加分组、新 REST API）捆在一起。Consumer Sales 强调增量重定价与购物车到订单直转。

对已经上 Revenue Management 的通信客户，这一节要和本系列 Revenue 篇对照读：行业云往往是在共享定价/配置引擎上加行业约束。

<a id="health"></a>
## Health

我标出的高信号项：

- 预置 Health Engagement 仪表板衡量照护缺口活动成效。
- Agentforce：药品覆盖问答、全天候患者来电、按需调提供者理赔明细。
- 直接从 **Amazon S3** 处理文件以加快文档提取。
- 符合 HIPAA 的个性化提醒减少爽约。
- 从免责声明到签名的统一流程加快 Medicare 参保。

医疗场景的语音与消息合规要求高，任何「全天候接听」试点都要同步法务与录音同意配置（并交叉看 Service / Voice 篇）。

<a id="mfg"></a>
## Manufacturing 与 Consumer Goods

**Manufacturing**：AI 辅助大批量订单、企业定价、Tableau Next 分析、Data 360 驱动渠道管理；Slack 中的 Industries Sales Assistance 与自定义智能体构建；订单与定价工作流把 ERP 级准确性带到销售代表。

**Consumer Goods**：引导式工作流、可复用订单规格、**Penny Perfect Calculator**；贸易日历与客户计划标题可定制；促销规划减少录入错误；大品类分配下贸易日历仍可打开；可从 Apex 中止失控作业链；移动端系统浏览器身份验证与组织单位数据筛选现代化。

现场与渠道团队多的客户，把「移动安全 + 作业链熔断 + 定价计算器」放进同一轮预览，能提前暴露集成风暴。

<a id="fsi"></a>
## Financial Services / Insurance / Life Sciences

- **Financial Services**：用 AI 统一银行/财富/保险平台客户数据；行业自动化与个性化开户、忠诚度、财务规划洞察。
- **Insurance**：Digital Insurance 产品创新；保单与理赔生命周期上的 Agentforce；Insurance Brokerage 上制作人/客户经理体验；跨地域业务线 360 视图。
- **Life Sciences**：现场代表可口述拜访记录并自动填充（含离线）；订单管理做门店核查与透明定价报价；活动管理在过度使用账户或预估费用超限时实时通知，支撑合规支出。

这三块我通常拉合规官一起看「AI 生成内容是否落库、是否可审计」，而不是只看功能开关。

<a id="other"></a>
## Education / Energy / Media / Nonprofit

- **Education（Agentforce Education）**：招生到校友全链路；例如出勤管理可把 Marketing Cloud Next 短信、语音智能体、Slack 教师通知串起来（Attendance Management Agent）——典型跨云编排样板。
- **Energy & Utilities**：多站点报价接收方组、资费比较、入网；批量上传站点数据时 **Slack 通知**；促销应用到报价/订单/购物车；New Connections 与 Program Management；紧急外呼派工；工时表灵活性。
- **Media**：RFP 自动受理与 AI 摘要；户外广告地图库存与统一定价；店内营销；赞助商品关联媒体计划行；批量预订库存；Data 360 受众细分进媒体计划；Salesforce Go 探索 Agentforce Media。
- **Nonprofit**：更名 **Agentforce Nonprofit**（文档仍可能出现 Nonprofit Cloud）；筹款、项目、资助、成果、志愿者。
- **Net Zero**：供应商自助门户提交数据与记分卡。

<a id="public"></a>
## 公共部门（Public Sector）

公共部门单独成章，但和 Industries 一样「重设置」。Winter '27 信号包括：

- **Taxpayer 360** 汇聚纳税人数据，自助税务门户，**Taxpayer Advocate** 智能体分流咨询。
- 一份申请申请多项福利，跨项目评估资格；AI 预填加快受理；授权代表信息采集。
- Outbound Payments：自定义理赔提交表单与 AI 发票提取；产品目录管理服务与定价。
- 许可证/许可：智能体化申请受理；**Inbound Payments** 收公共服务费（GA）。
- 人才招聘：同意采集、定向活动、行动计划自动化。
- **统一排班 / 外勤排班 / 班次排班**；Field App 离线；劳动力排班智能体。
- Agentforce **语义化发现 Amazon S3 文件**；Salesforce Go 加速设置；新增对象与 Connect REST / Apex。

政府云客户还要看 Hyperforce 篇：MuleSoft 登陆 Government Cloud Plus / Defense、沙盒快速创建/克隆等。

<a id="common"></a>
## 行业通用与我的验证法

Industries Common Features 覆盖跨行业与 Revenue 等共用能力——做多行业包的 ISV 应优先读这一节，避免每个行业云重复造轮子。

我的验证法：

1. 列出 org 已启用的行业云与附加组件，只深读对应官方节。
2. 凡进 Experience 站点的智能体，做访客/登录用户/合作伙伴三种会话测试。
3. 凡碰定价、理赔、福利资格，准备审计轨迹与回滚数据脚本。
4. 与 Revenue / Service / Slack 篇对齐共享依赖（Slack 通知、Voice、Data 360 细分）。
5. Salesforce Go 一键方案：装完后立刻 diff 元数据，弄清它改了什么。

下一篇：**Revenue Management + Sales**——大行报价、爬坡交易、Agentforce Sales 更名与 Engagement。


<a id="engineer-notes"></a>
## 工程师补充：多行业 org 的预览战术

Industries 文档长，是因为它在同一套平台上叠了完全不同的合规与交易语义。多行业 org（或 ISV）最怕的是「每个行业云各测一套，却漏掉共用定价/排班/Data 360」。我的战术是先画依赖图：哪些行业特性调用了 Revenue Management、哪些智能体跑在 Experience、哪些通知落到 Slack、哪些文件进 S3 语义搜索。

汽车 Concierge、公共部门 Taxpayer Advocate、医疗语音、教育出勤语音，看起来分属不同云，实则都依赖 Agentforce + 渠道（Experience/Voice/SMS）+ 权限模型。预览时按「渠道」横切，往往比按「云」竖切更能发现会话与 PII 问题。

制造与消费品的现场作业链、贸易日历、移动身份验证，属于「断网与高峰」类风险，实验室数据测不出来，要用接近生产的作业量。通信与媒体强依赖目录、库存与受众细分，测试数据要含多站点/多库存维度。保险与生命科学要尽早拉合规：口述记录、费用上限通知、理赔助手的输出是否落审计表。

公共部门统一排班与福利多项目申请，配置面极宽，Salesforce Go 能加速，但也会一次性写入大量元数据——装完立刻做版本对比，并准备「只启用纳税人门户、暂缓排班」这类分期开关策略。行业通用功能节是 ISV 的朋友：能下沉到通用层的，不要在每个行业包里复制一份。



<a id="skip-list"></a>
## 我明确跳过了什么

为控制篇幅，本篇没有展开：各行业「新增与变更对象」全表、Connect REST 逐资源说明、每个 Salesforce Go 预配置包的字段清单、保险 Digital Insurance 产品模型细节、媒体库存地图的操作步骤、净零记分卡字段、非营利资助对象模型等。这些对实施项目至关重要，但对「跨云雷达」文章会变成噪声。正确做法是：用本篇决定优先级 → 打开官方对应行业节 → 把对象与 API 变更贴进你们的元数据评审。若你发现本篇点名的 Concierge、Taxpayer、Attendance、Warranty Assistant 等与许可不符，以合约为准，不要根据博客去承诺客户。



<a id="cross-cloud"></a>
## 跨云样板：教育出勤这条链

源说明里的出勤管理是很好的跨云样板：Marketing Cloud Next 事件触发 Flow 发短信 → 入站 Omni-Channel Flow 接入语音智能体 → Attendance Management Agent 采集说明并更新正式出勤 → Slack 通知教师。它同时碰到营销、语音、行业对象与 Slack。若你们要向管理层解释「什么叫 Agentforce 落地」，可以用这条链做演示，但生产前必须核对 SMS 代码租约、Voice 附加组件、教育云许可与教师 Slack 工作区治理。类似地，能源多站点报价上传的 Slack 通知、汽车 Concierge 进 Experience，都是「一处演示、多团队验收」的候选。


实施伙伴常问「先做哪个行业云」。我的经验是：先做已有生产用量且依赖共享底座（定价、语音、Experience）的云，用一条跨云链路打穿预览流程，再横向复制到其他行业。切忌并行开启五个 Salesforce Go 一键包，否则元数据冲突会淹没真正的功能缺陷。



<a id="public-vs-industries"></a>
## 公共部门为何单独强调

公共部门在目录上常与 Industries 并列，但许可、排班与支付（Inbound/Outbound Payments）模型很不一样。Taxpayer 360、多福利单申请、许可证智能体受理、统一排班与 S3 语义发现，每一项都可能是独立项目。政府云客户还要叠加 Hyperforce/MuleSoft/沙盒加速约束。不要把 Public Sector 当成「又一个行业云小节」一笔带过——若你们做公共部门，请把官方 Public Sector 整章列为必读，本篇只提供雷达。


---

**系列导航**：上一篇 → [`salesforce-winter27-05-platform`](/blog/salesforce-winter27-05-platform/)｜下一篇 → [`salesforce-winter27-07-revenue-sales`](/blog/salesforce-winter27-07-revenue-sales/)
