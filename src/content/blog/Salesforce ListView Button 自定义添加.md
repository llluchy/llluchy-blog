---
title: 'Salesforce ListView 添加自定义 Button 读取选中的记录并做处理'
description: '本文介绍如何在 ListView 页面修改右上角的按钮，添加自定义 button，读取选中的记录并做处理'
pubDate: '2026-08-03'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'tech'
---

## 需求分析

最近编写一个新功能，一个 `Custom Object` 需要在 `ListView` 页面添加自定义按钮，然后在 ListView 页面可以选中数据，自定义按钮可以获取并操作数据。

拆解一下需求，需要做到：
- **1、添加自定义按钮**
- **2、自定义按钮要能传递数据**

## 可行性调研

#### 需求1：添加自定义按钮

- 注意事项1：`ListView` 页面自定义按钮添加的入口在 `Object Manager` 的 `List View Button Layout` 中。

![List View Button Layout](../../assets/blog-images/image-2.png)

- 注意事项2：但是这个入口不是常态显示的，需要在 `Detail` 的 `Edit` 中开启 `Allow Search`，这样才会显示 `List View Button Layout` 入口。

![Detail-Edit](../../assets/blog-images/image-3.png)
![Allow Search](../../assets/blog-images/image-1.png)

- 注意事项3：但是打开这个选项后，会影响对象在官方的 Search 功能中的可见性，因此，如果目标对象在业务上是不能被检索到，或者不能公开给所有用户查看。那么这个开关在开启后，要注意关闭。

![Search Tools Bar](../../assets/blog-images/image-4.png)

#### 需求2：自定义按钮如何才能做到传递数据

这里有两个方案可以用来让自定义按钮获取到 List View 页面选中的数据：

- 方案1：自定义按钮关联 Flow，Flow 有变量获取数据，然后可以向后传递进行处理，不过本文未对这种方案进行调研，不做详细描述。
- 方案2：自定义按钮关联 Visualforce Page，通过 Visualforce 来获取信息，Visualforce 可以关联 APEX 代码，因此数据可以顺利传递到 APEX。

## 需求实现

#### 创建 APEX

TestApexClass.cls

```java
public class TestApexClass {

    // 定义一个空间，用来保存 ListView 页面选择的数据
    public List<TestObject__c> selectedRecords { get; set; }
    private ApexPages.StandardSetController setCon;

    public TestApexClass(ApexPages.StandardSetController controller) {
        this.setCon = controller;
        // 获取 ListView 页面选择的数据
        this.selectedRecords = (List<TestObject__c>) setCon.getSelected();
    }

    // 第一个按钮
    public PageReference firstButton() {
        return setCon.cancel();
        // setCon.cancel() 是 Salesforce ApexPages.StandardSetController 的内置方法，主要有两个核心作用：
        // 1. 自动重定向返回原列表页（最核心用途）
        // 方法执行后会返回一个 PageReference 对象，该对象精确指向用户点击按钮前所在的 List View（列表视图）页面。
        // 解决了什么问题：避免了开发者手动硬编码拼接 URL，无论是 Lightning 还是 Classic 环境，它都能自动把用户带回刚才的列表页。
        // 2. 重置控制器状态
        // 放弃当前 StandardSetController 内存中所有未提交的修改或未保存的变更，还原控制器的原始状态。
        // 3. 如果不写（或 return null;）：
        // Apex 执行完逻辑后，用户的浏览器会停留在那个空白/中转的 Visualforce 页面上，无法自动返回。
        // 写了 return setCon.cancel();：Apex 逻辑一执行完，浏览器就会立即跳回列表页，并刷新列表展示最新的数据，实现无感体验。
    }

    // 第二个按钮
    public PageReference secondButton() {
        // 可以通过操作 this.selectedRecords 的值，对选中的内容进行下一步操作
        // for (TestObject__c sobject : this.selectedRecords) {
        //     这里要进行后续的详细操作
        // }
        return setCon.cancel();
    }
}
```

#### 创建 Visualforce Page

testVisualforce.page

```html
<!-- TestObject__c 是你要操作的对象 -->
<!-- TestApexClass 是 Page 要关联的 Apex -->
<apex:page standardController="TestObject__c" recordSetVar="records" extensions="TestApexClass">
    <apex:form >
        <apex:pageBlock title="选择的 Record 列表">
            <apex:pageBlockButtons >
                <!-- 两个自定义按钮 -->
                <apex:commandButton value="按钮一" action="{!firstButton}"/>
                <apex:commandButton value="按钮二" action="{!secondButton}"/>
            </apex:pageBlockButtons>

            <apex:pageMessages />

            <!-- 这里的列表用来展示选中的数据，目前只设定了 Id -->
            <apex:pageBlockTable value="{!selectedRecords}" var="rec">
                <apex:column value="{!rec.Id}" headerValue="Record ID"/>
            </apex:pageBlockTable>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```

#### 创建自定义按钮

![创建自定义按钮](../../assets/blog-images/image-5.png)
![创建自定义按钮](../../assets/blog-images/image-6.png)
![创建自定义按钮](../../assets/blog-images/image-7.png)
![创建自定义按钮](../../assets/blog-images/image-8.png)
![创建自定义按钮](../../assets/blog-images/image-9.png)
![创建自定义按钮](../../assets/blog-images/image-7.png)
![创建自定义按钮](../../assets/blog-images/image-10.png)

#### 测试自定义按钮

![测试自定义按钮](../../assets/blog-images/image-11.png)
![测试自定义按钮](../../assets/blog-images/image-12.png)
![测试自定义按钮](../../assets/blog-images/image-13.png)