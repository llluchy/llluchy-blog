---
title: 'Winter \'27 Platform：API 68.0、Apex、LWC 与 Experience'
description: '精选 Winter \'27 Platform：Apex 堆与弹性限制、API 退役、LWC GA 能力、Experience 安全、Data 360、AgentExchange 与 DX/MCP 工具链。'
pubDate: '2026-09-13'
category: 'tech'
---

Winter '27 把定制化、部署、开发、Experience Cloud、移动端与 Salesforce CMS 都收进了 **Platform** 大章。对我这种既写 Apex/LWC、又管 CI 与 Experience 站点的人，这是「一章读完底座」的版本。下面只挑高冲击项；对象/API 全量变更表请直接查官方「面向开发人员的新增与变更项」。

**策展，非全文。** Data 360 变更可高达每月一次，Winter '27 相关常列在 2026 年 10 月下——以官网当月页为准。

**系列导航**：上一篇 → [`salesforce-winter27-04-commerce-marketing`](/blog/salesforce-winter27-04-commerce-marketing/)｜下一篇 → [`salesforce-winter27-06-industries`](/blog/salesforce-winter27-06-industries/)

<a id="toc"></a>
## 目录

- [AgentExchange 与构建体验](#agentexchange)
- [Apex：堆、弹性限制与测试](#apex)
- [API 68.0、退役与流量](#api)
- [Enterprise Messaging / 平台事件](#events)
- [Experience Cloud 与安全共享](#experience)
- [Lightning 组件与 App Builder](#lwc)
- [Data 360 要点](#data360)
- [开发者工具与许可](#dx)
- [其他：Connect、Functions、SLDS、移动](#misc)
- [回归清单](#plan)

<a id="agentexchange"></a>
## AgentExchange 与构建体验

- 可在 **Agentforce Builder 内**直接安装一个或多个 AgentExchange 应用，进度条可停靠，装完通知操作/子智能体何时可用。
- 无安装权限的构建者可**请求安装/更新（Beta）**并附业务理由；管理员邮件审批；可指派 Install Request Approvers（Beta）。
- 列表上可识别 **FDE 合作伙伴网络**顾问徽章，方便选型。

范围说明里强调非生产组织中的免费/试用列表等约束——生产推广前再对一次官方适用位置。对 ISV/内部平台团队，这意味着「智能体资产获取」开始接近应用商店工作流，要补审批与变更记录。

<a id="apex"></a>
## Apex：堆、弹性限制与测试

我按风险排序：

- **更高 Apex heap 上限**：处理更大数据集；Winter '27 非生产组织可使用「强制执行 Summer '26 Apex 堆限制」相关按钮做验证（变更日志澄清了可用性）。预览期用真实批量数据压一下，别只拿玩具数据。
- **批处理作业弹性限制（Beta）**：降低工作流因限制中断的概率；可在非生产组织覆盖异步作业限制来测试。
- **Apex 集成测试（开发人员预览）**：测试外部服务与真实 HTTP 调用——共享测试数据、打真端点时要注意沙盒凭据与配额。
- Test Discovery API 可用 `testLevel` 筛选；托管包 SOQL 字段名冲突有解决路径。
- **阻止来自托管包的 Apex 匿名代码执行（发布更新）**：安全向，ISV 与依赖匿名执行的工具要评估。
- **仅重新编译无效的类/触发器**：降低 Compile All 开销；Setup 按钮行为在 8 月说明中被澄清。
- API 9.0–19.0 保存的 Apex 会收到编译器警告——该升级版本了。
- **Apex 游标处理 Data 360 DMO（Beta）**；`SF_Archive` 命名空间方法便于在不打真实归档的情况下测 Apex。
- Apex Symbol API（Beta）服务更丰富的开发工具。

<a id="api"></a>
## API 68.0、退役与流量

- **简化 REST API 版本管理**；sObjects REST OpenAPI 文档继续改进（Beta）。
- Composite API 可通过 EventLogFile 事件类型获得通知。
- **Streaming API 重放收紧**——事件重放逻辑要回归。
- SOAP `login()` 与「使用任何 API 身份验证」权限：见导读篇，Winter '27 强制相关。
- **SOAP API 31.0–64.0 中的 SOAP API login() 调用即将停用（发布更新）**——与权限项一起扫。
- **Salesforce Platform API 31.0–40.0**：Summer '27 弃用、Summer '28 退役（8 月更新写入说明）。
- SOQL 可比较字段之间的值（Beta）。
- Bulk API 2.0 大规模摄取营销对象与同意数据。
- 更新 API 流量中的实例化 URL（发布更新）；Edge Network **自助式路由**可在设置中控制。
- Metadata API：新增 `FlowSettings` 等字段控制「启用自动化 Lightning 应用」等组织首选项；GraphQL 访客访问可由管理员控制。
- **API Catalog**：集中管理 API 与 MCP Server；从 MuleSoft、Heroku、Apex 等引入，供 Agentforce 与 Flow；可激活 Salesforce 托管 MCP，并注册外部 MCP（含 MuleSoft）。

<a id="events"></a>
## Enterprise Messaging / 平台事件

Event Studio 显示更多配置详情与建议。**标准容量平台事件生命周期终止**——若还在用标准容量模型，迁移计划不能再拖。变更数据捕获与事件总线相关变更见官方 Enterprise Messaging 节。

<a id="experience"></a>
## Experience Cloud 与安全共享

- 通过**稳定的目标主机名**简化自定义域名管理，降低维护窗口风险（第三方托管自定义域场景）。
- Aura / LWR：可在 Experience Builder 从同一编排运行打开下一工作项；Mobile Publisher 可启动原生 Agentforce 面板。
- **Experience Delivery（Beta）** 与 **Experience Builder 智能体（Beta）已停止提供**——与 Agentforce 篇一致，依赖方立刻迁出。
- 安全：电子邮件域名替换、从已验证地址发站点邮件；对访客隐藏含敏感数据字段；备用发件人地址发敏感邮件；**对访客用户隐藏个人信息字段（发布更新）**。
- 外部服务 Schema 支持 **any type**，简化 Flow 集成。

<a id="lwc"></a>
## Lightning 组件与 App Builder

- **复杂模板表达式 GA**；**第三方 Web 组件 GA**——这两条会改变我们写模板与引入设计系统的方式。
- LWC API **68.0**；同源 URL 编程式锚点点击；控制台应用导航项控制；状态管理器 `refresh()`。
- **LWC Skills** 加速 Lightning 开发（与 AI 编码智能体/技能体系相关）。
- App Builder：动态高亮面板可加「关注」；Request Approvals、编排下一工作项等组件。
- 列表视图内联编辑更灵活（新 UI 设置放宽页面布局限制）；字段历史跟踪对用户侧正式可用相关能力。
- 发布更新：**从 Aura 操作响应的自定义对象数据移除非公共字段**（计划 Spring '27 强制）——现在就扫自定义组件是否读了非 API 公共字段。
- 「查看设置审计跟踪」权限相关发布更新：最小权限模型要跟上。

Globalization：12 种语言标签翻译更新；**启用 ICU 区域格式（发布更新）**——日期/时间/货币格式化标准化，本地化回归必做。

<a id="data360"></a>
## Data 360 要点

提醒：Data Cloud 已更名为 **Data 360**（过渡期文档可能混用）。Winter '27 窗口内常见条目落在 2026 年 10 月变更下，例如：

- Data Processing Engine 货币处理控制。
- Profile Engagements 小组件迁移到 **Data 360 互动时间线**（约 2026-10-02 当周 R1）。
- 复制字段丰富：扩展字段类型兼容；匹配不再仅基于主键。

平台开发侧还有 Apex 游标查 DMO、Analytics 篇的 Data 360 报表——数据团队与 CRM 团队要共用一张「10 月 R1」日历。

<a id="dx"></a>
## 开发者工具与许可

Platform Development Tools 一揽子：Salesforce CLI、Agentforce Vibes 扩展 / IDE、Agentforce DX、**Salesforce DX MCP Server**、VS Code 扩展等。Headless 360 篇对 Vibes 4.0+、地理感知模型路由、Flex Credit 估算有更多周更——写智能体化开发的同事请订阅那节。

Digital Wallet 与平台许可：跟踪消耗型功能与配额；Agentforce for Scale / Scale Center 等需联系 Salesforce 启用的能力，别在方案里假设自助开通。

Permissions and Sharing：转移记录所有权时可选择是否保留手动共享；简档筛选默认开启（导读篇）；注意新的共享重算行为相关发布更新（安全篇也会提）。

<a id="misc"></a>
## 其他：Connect、Functions、SLDS、移动

- **Salesforce Connect** 跨组织适配器支持**命名凭据**；旧密码/OAuth 认证 Spring '27 停用。
- **Salesforce Functions 不再可购买或续订**，关注退役计划——还在 Functions 上的逻辑要迁出。
- SLDS 资源继续对齐 Lightning 设计语言。
- 移动：会后语音备注、混合云与设备端 AI 音频后续步骤；Mobile Publisher 从悬浮按钮进原生 Agentforce 聊天。
- CMS：Brand 内容类型、批量删除、通用工作区品牌用于 React Web 应用；部署最新 CMS Base 包以改进 AI 搜索结果。

<a id="plan"></a>
## 回归清单

1. 扫描所有集成的 API 版本与 SOAP `login()` 使用；列出 31–40 与用户名密码流调用方。
2. 非生产验证新 heap；为关键 Batch 评估弹性限制 Beta。
3. LWC 68.0 + 复杂表达式 / 第三方 Web 组件试点；Aura 响应字段清理。
4. Experience：自定义域主机名、访客字段隐藏、已死 Beta 依赖排查。
5. 事件：标准容量平台事件迁移状态；Streaming 重放行为。
6. CI：升级 CLI；评估 DX MCP / Vibes；Metadata 中 FlowSettings 等新字段是否要进仓储。
7. Data 360 10 月 R1：互动时间线与复制字段丰富与报表消费者对齐。

下一篇：Industries 精选——只挑跨行业影响面大的，不穷举。


<a id="engineer-notes"></a>
## 工程师补充：平台底座的「静默破坏」清单

Platform 章最容易被业务略过，却最容易在升级周让 CI 变红。我列一份自己仓库会扫的静默破坏清单。

**API 与认证：** 所有客户端的 API 版本；是否仍调用 SOAP `login()`；是否仍依赖用户名-密码流或用户代理流；Connected Apps 是否已有 External Client Apps 迁移任务。31.0–40.0 的退役看似遥远，但供应商 SDK 经常钉死旧版本。

**Apex 运行时：** 新堆上限用真实批量数据验证；Batch 弹性限制 Beta 只在理解失败语义后启用；托管包匿名 Apex 执行拦截会影响诊断工具；仅编译无效类/触发器改变了发布窗口的编译策略，文档要更新。

**LWC/Aura：** 升级到 API 68.0；复杂模板表达式与第三方 Web 组件 GA 后，设计系统引入策略要重写；Aura 响应移除非公共字段会让「顺手读内部字段」的组件在 Spring '27 出问题，现在就该生成字段白名单。

**事件与 Experience：** 标准容量平台事件生命周期终止必须有迁移日；Streaming 重放收紧要回归订阅者；Experience Builder 智能体与 Experience Delivery Beta 退场；访客个人信息字段隐藏与站点发信域名替换属于合规，不只是 UX。

**工具链：** CLI、DX MCP、Vibes 地理路由与 Flex Credit；Functions 停售意味着剩余函数要有迁出史诗。Data 360 名称变更与 10 月互动时间线，要让报表消费者提前改依赖。



<a id="general-setup"></a>
## 通用设置与移动端顺手记

Platform 里还有一批「不像平台、但会改变日常操作」的点：列表视图内联编辑限制放宽；字段历史跟踪能力对用户侧增强；动态高亮面板可加关注按钮；Globalization 的 ICU 区域格式发布更新会改日期时间货币展示；移动端会后语音备注与 AI 建议后续步骤、Mobile Publisher 原生 Agentforce 入口。CMS Brand 类型与批量删除、CMS Base 包升级改善 AI 搜索，则影响内容运营。把这些放进「管理员每周清单」比放进开发史诗更合适，但开发仍要知道 ICU 与内联编辑可能打歪依赖格式化字符串的测试快照。



<a id="ci-notes"></a>
## CI / 仓库我会改的几处

- 升级 Salesforce CLI，并在 README 写明检索智能体依赖的新命令与 67.0 回退。
- 静态检查：扫描项目中 API version ≤40 与 SOAP login 用法。
- LWC 编译目标逐步切 68.0；为复杂模板表达式补单元测试。
- 事件订阅者测试加上 Streaming 重放边界用例。
- Metadata 拉取包含 FlowSettings 等新组织首选项字段，避免环境漂移。
- 若使用 Functions，创建迁出史诗并冻结新功能开发。


若你们维护第二代托管包，请额外关注：智能体新元数据仅 2GP 支持、GraphQL 访客访问可控、以及托管包匿名 Apex 执行相关发布更新。ISV 安全审查材料应同步更新，避免客户在强制日之后才发现诊断脚本失效。


---

**系列导航**：上一篇 → [`salesforce-winter27-04-commerce-marketing`](/blog/salesforce-winter27-04-commerce-marketing/)｜下一篇 → [`salesforce-winter27-06-industries`](/blog/salesforce-winter27-06-industries/)
