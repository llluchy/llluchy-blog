---
title: 'Salesforce ListView 自定义按钮：选中记录批量处理'
description: '手把手教你如何在 Salesforce ListView 页面添加自定义按钮，通过 Visualforce Page 和 Apex 获取用户选中的多条记录，实现批量操作。包含完整代码示例和配置截图。'
pubDate: '2026-08-03'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'tech'
---

## 需求分析

在一个 `Custom Object` 的 `ListView` 页面中，需要添加一个自定义按钮。用户在列表页勾选多条数据后，点击按钮即可获取这些选中的记录并执行后续操作。

拆解需求，核心就两点：

- **1. 在 ListView 右上角添加自定义按钮**
- **2. 按钮点击后能获取用户勾选的记录数据**

## 可行性调研

### 需求一：添加自定义按钮

ListView 页面的自定义按钮入口在 `Object Manager` → `List View Button Layout` 中：

![Object Manager 中的 List View Button Layout 入口](../../assets/blog-images/salesforce-listview-button/image-2.png)

但这个入口默认不显示。需要在对象的 `Detail` → `Edit` 中勾选 `Allow Search`，`List View Button Layout` 才会出现：

![在 Detail 编辑页面开启 Allow Search](../../assets/blog-images/salesforce-listview-button/image-3.png)
![Allow Search 选项勾选](../../assets/blog-images/salesforce-listview-button/image-1.png)

> **注意**：开启 `Allow Search` 后，该对象会出现在 Salesforce 全局搜索中。如果目标对象在业务上不能被所有用户检索到，操作完成后记得关闭此开关。

![Salesforce 全局搜索工具栏](../../assets/blog-images/salesforce-listview-button/image-4.png)

### 需求二：按钮如何传递数据

有两种方案可以让自定义按钮获取 ListView 页面选中的记录：

- **方案一：关联 Flow** — Flow 有内置变量可以获取选中数据，然后向后传递处理。本文不展开此方案。
- **方案二：关联 Visualforce Page** — 通过 Visualforce 获取数据，再传递给 Apex 处理。本文采用此方案。

## 实现步骤

### 第一步：创建 Apex 类

`TestApexClass.cls`

```java
public class TestApexClass {

    public List<TestObject__c> selectedRecords { get; set; }
    private ApexPages.StandardSetController setCon;

    public TestApexClass(ApexPages.StandardSetController controller) {
        this.setCon = controller;
        // 获取 ListView 页面选中的数据
        this.selectedRecords = (List<TestObject__c>) setCon.getSelected();
    }

    public PageReference firstButton() {
        // 在这里处理 selectedRecords 的批量操作逻辑
        return setCon.cancel();
    }

    public PageReference secondButton() {
        // 在这里处理 selectedRecords 的批量操作逻辑
        return setCon.cancel();
    }
}
```

> **关于 `setCon.cancel()`**：它是 `ApexPages.StandardSetController` 的内置方法，有两个核心作用：
> 1. **自动返回原列表页** — 返回一个 `PageReference`，自动跳回用户点击按钮前所在的 ListView，无需手动拼接 URL。
> 2. **重置控制器状态** — 放弃未提交的修改，还原控制器原始状态。
>
> 如果不写 `return setCon.cancel()`，Apex 执行完后用户会停留在空白 Visualforce 页面上，无法自动返回列表。加上后，逻辑执行完毕立即跳回列表页并刷新，实现无感体验。

### 第二步：创建 Visualforce Page

`testVisualforce.page`

```html
<apex:page standardController="TestObject__c" recordSetVar="records" extensions="TestApexClass">
    <apex:form>
        <apex:pageBlock title="选中的 Record 列表">
            <apex:pageBlockButtons>
                <apex:commandButton value="按钮一" action="{!firstButton}"/>
                <apex:commandButton value="按钮二" action="{!secondButton}"/>
            </apex:pageBlockButtons>

            <apex:pageMessages />

            <apex:pageBlockTable value="{!selectedRecords}" var="rec">
                <apex:column value="{!rec.Id}" headerValue="Record ID"/>
            </apex:pageBlockTable>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```

### 第三步：创建自定义按钮

在 `Object Manager` 中找到目标对象，进入 `Buttons, Links, and Actions`，新建一个 `List Button`，关联上一步创建的 Visualforce Page。

![新建 List Button 并配置基本信息](../../assets/blog-images/salesforce-listview-button/image-5.png)
![选择 Visualforce Page 作为按钮行为](../../assets/blog-images/salesforce-listview-button/image-6.png)
![配置按钮关联的 Visualforce Page](../../assets/blog-images/salesforce-listview-button/image-7.png)
![完成按钮创建](../../assets/blog-images/salesforce-listview-button/image-8.png)
![将按钮添加到 List View Button Layout](../../assets/blog-images/salesforce-listview-button/image-9.png)
![按钮在 List View 右上角显示](../../assets/blog-images/salesforce-listview-button/image-10.png)

### 第四步：测试验证

在 ListView 页面勾选若干条记录，点击右上角自定义按钮，确认能正确跳转到 Visualforce 页面并展示选中的记录。

![在 ListView 中勾选多条记录](../../assets/blog-images/salesforce-listview-button/image-11.png)
![点击按钮跳转到 Visualforce 页面](../../assets/blog-images/salesforce-listview-button/image-12.png)
![Visualforce 页面展示选中的记录列表](../../assets/blog-images/salesforce-listview-button/image-13.png)