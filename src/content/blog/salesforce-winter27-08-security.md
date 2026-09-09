---
title: 'Winter ''27 安全、身份与隐私：OAuth、MFA 与 Shield'
description: '精选 Winter ''27 安全身份隐私：强制与即将强制的发布更新、连接应用迁外部客户端应用、MFA/邮件域、Backup and Recover、Data Detect。'
pubDate: '2026-09-16'
category: 'tech'
---

安全篇我写得尽量「可执行」。Winter '27 不是只加功能，而是把一串**访问控制与 OAuth 收紧**推到强制时间表上。若你们还有用户名-密码流、用户代理流、或大量 Connected Apps，这一篇应和导读篇的发布更新表一起进安全委员会材料。

策展阅读；Marketing Cloud Engagement 另有独立安全要求说明，MC 团队请读对应节，不要只看 CRM 这篇。

**系列导航**：上一篇 → [`salesforce-winter27-07-revenue-sales`](/blog/salesforce-winter27-07-revenue-sales/)｜下一篇 → [`salesforce-winter27-09-service`](/blog/salesforce-winter27-09-service/)

<a id="toc"></a>
## 目录

- [我如何排优先级](#prio)
- [本版与近窗强制项](#forced)
- [OAuth 与外部客户端应用](#oauth)
- [MFA 与电子邮件域安全](#mfa-email)
- [Backup and Recover Next](#backup)
- [域名、命名凭据与可信 URL](#domain)
- [Salesforce Shield / Data Detect](#shield)
- [共享与其他发布更新](#sharing)
- [30/60/90 天行动](#plan)

<a id="prio"></a>
## 我如何排优先级

安全条目按「断集成时间」排序，而不是按营销新鲜度：

1. **已经或本版强制**：SOAP `login()` 权限、Profile Filtering、部分无障碍（见导读）、以及安全章汇总的访问控制更新。
2. **2026 年 11–12 月**：设备流限制、邮件验证例外保留。
3. **Spring '27（约 2027-02-20）**：用户代理流、用户名-密码流、Aura 非公共字段、Connect 旧认证、S2S 等。
4. **增强能力**：MFA/Passkey 体验、Data Detect、Backup 改进——并行做，但不要压过迁移。

官方写：相关变更自 **2026 年 11 月**起陆续强制，具体日期以每条 Release Update 为准。

<a id="forced"></a>
## 本版与近窗强制项

安全章「查看并遵守即将生效的安全要求」汇总了多条，包括：

- Block Apex Anonymous Code Execution from Managed Packages（Release Update）
- Enable Profile Filtering（Release Update）
- Remove Non-Public Fields from Custom Object Data in Aura Action Responses（Release Update）
- Update Apex Code and Flows for Changed Sharing Recalculation Behavior（Release Update）
- 若使用 Aura/LWR/Visualforce 站点：Conceal Personal Information Fields from Guest Users（Release Update）

OAuth / 客户端应用向：

- Migrate All Connected Apps to External Client Apps
- Restrict the OAuth 2.0 Device Flow to Local External Client Apps（约 2026-11-30）
- Retirement of OAuth 2.0 Username-Password Flow for Connected Apps（推迟到约 2027-02-20）
- Salesforce Connect Cross-Org Adapter Legacy Authentication Is Being Retired
- OAuth User-Agent and Hybrid User-Agent Flows Retirement

邮件向：

- Maintain Your Email Verification Exception（约 2026-12-01）
- Trialforce 发信域名验证识别（若适用）

操作入口统一：Setup → Release Updates，按测试与激活步骤做；不要只在 wiki 里贴链接。

<a id="oauth"></a>
## OAuth 与外部客户端应用

核心叙事是：**把 Connected Apps 迁到 External Client Apps**，并淘汰弱流。

- **设备流**：将来只允许带 localhost 回调的本地外部客户端应用；连接应用必须迁移后才能继续用设备流。
- **用户名-密码流**：强制时会中断所有仍用该流的连接应用集成；改走 Web 服务器流或客户端凭据流等更安全选项。
- **用户代理流 / 混合用户代理流**：停用；改 Web 服务器流或带 **PKCE** 的混合 Web 服务器流。
- 打包或分发的连接应用，也有「迁移到打包外部客户端应用」的专门说明——ISV 要进产品路线图，而不是只改自己的客户 org。

我的盘点方法：从 Connected Apps 列表导出，标注回调 URL、已用 OAuth 流、是否打包、是否设备流；再映射到外部客户端应用迁移任务。CI 里的集成用户若仍用密码流，现在就该改。

<a id="mfa-email"></a>
## MFA 与电子邮件域安全

说明列出一组帮助满足 MFA 与邮件安全的功能（多在 Summer '26 后期到 Winter '27 加入），例如：

- 更轻松管理 Passkeys / Security Keys；Passkey-first MFA 注册与体验改进；MFA 注册页可用性改进。
- iOS 在 Passkey 强制前启用原生浏览器认证。
- 在 SAML Assertion Validator 查看抗钓鱼/标准/弱 MFA 方法；Login History / Login Events 查看 ACR 值。
- 跨用户域跟踪邮箱验证；为未验证域用户设置发件地址；站点邮件用已验证地址做域名替换；等等。

若公司正在推 Passkey，把这些体验改进当成「减少 MFA 工单」的机会，与 IdP 团队同步策略，而不是只在 Salesforce 侧单点强制。

邮件验证例外：曾经找支持关验证的组织，必须在强制前配好**已授权电子邮件域名**，否则允许列表移除后用户发信能力会受影响——这是典型「两年没人记得的例外」事故源。

<a id="backup"></a>
## Backup and Recover Next

增强包括：从备份快照下载元数据；在备份历史中查找特定记录；恢复前重新加载失败的子对象。对大 org，这意味着备份演练可以更精细（按记录排查、元数据取出对比），建议把「恢复演练」写进季度 DR，而不是只确认备份作业绿灯。

<a id="domain"></a>
## 域名、命名凭据与可信 URL

- 替换 API 流量中的实例化 URL（与 Platform 发布更新呼应）。
- 稳定目标主机名简化自定义域管理。
- **命名凭据支持自定义 CA 证书**，扩展严格 PKI 环境的集成。
- Security Health Review 相关能力（见官方）。
- 可将 Chrome 扩展程序视为可信 URL；通过特定于租户的信任存储管理安全态势。

这些对 Hyperforce / 自定义域 / 私有集成证书的客户更敏感，改路由或证书前要有回滚。

<a id="shield"></a>
## Salesforce Shield / Data Detect

Data Detect 可扫描 **Data 360** 中的敏感数据；引导式 Flow 更易创建策略。若你们已买 Shield，这是把「敏感数据发现」从口头政策变成可执行扫描的机会——先在沙盒定义策略与误报处理流程，再开生产扫描，避免第一天告警淹没。

<a id="sharing"></a>
## 共享与其他发布更新

与 Platform 共享相关的点再次强调：转移所有权时可选是否保留手动共享；Profile Filtering 默认启用；共享重算行为变化可能要求更新 Apex 与 Flow。访客个人信息字段隐藏对 Experience 站点是硬合规项。Aura 响应移除非公共字段会让「偷用内部字段」的组件在 Spring '27 爆掉——安全与平台团队应共享同一张组件黑名单。

<a id="plan"></a>
## 30/60/90 天行动

**30 天：**完成 Connected Apps 盘点；Winter '27 已强制项 Test Run；邮件验证例外确认；Profile Filtering 影响评估。

**60 天：**设备流与 localhost 外部客户端应用改造；启动用户名-密码流与用户代理流迁移；Experience 访客字段与站点发信域名检查。

**90 天：**Shield Data Detect 沙盒策略；Backup 恢复演练；共享重算与 Aura 字段清理；ISV 打包客户端应用迁移里程碑。

下一篇：**Service**——Contact Center、消息渠道、IT Service 与知识。


<a id="engineer-notes"></a>
## 工程师补充：安全迁移的沟通话术

安全发布更新失败，常常不是因为技术不会做，而是因为集成所有者「以为还早」。我对外沟通时固定三句话：其一，用户名-密码流与用户代理流的停用日期已经写进 Winter '27 说明，推迟不等于取消；其二，设备流 11 月限制会直接影响本地开发与设备授权演示，不修就会在预发环境先爆；其三，Profile Filtering 与访客字段隐藏会改变「看得见的元数据」，支持团队的截图教程要同步改。

对 ISV，打包连接应用迁外部客户端应用是产品级工作，要进路线图评审，而不是塞进某个客户项目的边角。对内部平台，命名凭据自定义 CA、租户信任存储、Chrome 扩展可信 URL，都属于「改错就全员无法登录集成」的高危变更，需要变更窗口与回滚剧本。

Shield Data Detect 扫 Data 360 时，先定数据所有者与误报流程，再开全量扫描。Backup and Recover 能按记录查找、下载元数据、重载失败子对象，请用一次真正的恢复演练验证，而不是只看备份作业成功。邮件验证例外是经典遗忘项：查一下多年前是否开过支持工单关闭验证，有则立刻配授权域名。



<a id="test-run-tips"></a>
## Test Run 实务tips

做 Release Updates 的 Test Run 时，我固定抓三类证据：一是集成账号登录与批量作业日志（证明 SOAP login 与 OAuth 改造有效）；二是配置文件相关 UI 截图（证明 Profile Filtering 下支持人员仍能完成工单）；三是 Experience 访客与高倍放大无障碍录屏（证明站点与 Lightning 在强制后仍可用）。证据贴进工单，比写「已测试」三个字有用。若组织曾关闭邮件验证，把支持工单号也写进变更记录，方便审计为什么配置了授权域名。Passkey 与 MFA 体验改进适合与身份团队联合试点，先选 IT 员工，再推业务用户。



<a id="inventory-template"></a>
## Connected Apps 盘点模板（字段）

我给集成清单固定这些列：应用名称；类型（Connected / External Client）；回调 URL；是否 localhost；使用的 OAuth 流；是否用户名-密码；是否设备流；是否打包/分发；所有者团队；目标改造（迁 ECA / 改 Web Server+PKCE / 改 Client Credentials）；计划完成日；验证证据链接。把这张表贴进安全委员会，比口述「我们有不少旧集成」有效得多。同步再列一张「访客站点与高倍放大回归」表，覆盖 Profile Filtering 与无障碍强制。Data Detect 与 Backup 演练可作为并行工作流，但不要占用迁移主路径的同一批变更窗口。


补一段给管理层的摘要：Winter '27 安全工作的主线不是新功能演示，而是在 2026 年底到 2027 年初前，完成弱 OAuth 流淘汰、连接应用迁移、邮件验证例外治理，以及简档与访客可见性收紧。做得好，用户几乎无感；做不好，会在某一天集中爆发登录与集成故障。Shield 与 Backup 增强是加分项，不能替代主线。



<a id="mfa-detail"></a>
## MFA / 邮件功能清单（便于对官方）

源说明把下列能力归为帮助满足 MFA 与邮件安全（多见于 Summer '26 后期至 Winter '27），我按用途分组，便于你们对照开启：

**MFA / Passkey：** 更轻松管理 Passkeys 与 Security Keys；Passkey-first 注册与体验改进；MFA 注册页可用性改进；iOS 在 Passkey 强制前启用原生浏览器认证；在 SAML Assertion Validator 查看抗钓鱼/标准/弱 MFA 方法；在登录历史与登录事件中查看 ACR 值。

**邮件域验证：** 跨用户域跟踪邮箱验证状态；为未验证域用户设置发件地址；站点邮件通过域名替换从已验证地址发送；以及 Trialforce 场景下识别需验证的发信域名。

落地时不要「一次全开」。先与企业 IdP 策略对齐 Passkey，再处理 Salesforce 原生 MFA 体验；邮件域则先解决历史验证例外，再收紧发件人规则，避免支持邮箱被退信淹没。


***

**系列导航**：上一篇 → [`salesforce-winter27-07-revenue-sales`](/blog/salesforce-winter27-07-revenue-sales/)｜下一篇 → [`salesforce-winter27-09-service`](/blog/salesforce-winter27-09-service/)
