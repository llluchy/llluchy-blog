---
# ================================================================
#  博客文章模板
#  使用方法：复制此文件 → 重命名 → 修改下面内容 → 提交
#  以 # 开头的是注释，写文章时全部删掉即可
# ================================================================

# ── 必填字段（下面 3 个必须填写） ──

title: 'Salesforce ListView 添加自定义Button 读取选中的记录，并做处理'
description: '本文介绍如何在ListView页面，修改右上角的按钮，添加自定义button，读取选中的记录，并做处理'
pubDate: '2026-08-03'
heroImage: '../../assets/blog-placeholder-3.jpg'
category: 'Salesforce'

# ── 可选字段（不需要就删掉整行，含 # 号一起删） ──

# heroImage: '../../assets/blog-placeholder-3.jpg'
# category: 'tech'
# updatedDate: '2026-08-01'
# updatedDate: '2026-08-01'

# ⚠️ 下面这行 `---` 是 frontmatter 结束标记，不可删除，不可修改。
---

<!--
  从这里开始是文章正文，支持标准 Markdown 语法。
  下面是一些常用写法示例，写文章时全部删掉替换成你的内容。
-->

## 需求分析
最近编写一个新功能，一个 `Custom Object` 需要在 `ListView` 页面添加自定义按钮，然后在ListView页面可以选中数据，然后自定义按钮可以获取并操作数据。

拆解一下需求，需要做到：
**1、添加自定义按钮**
**2、自定义按钮要能传递数据**

## 可行性调研
#### 需求1：添加自定义按钮
- 注意事项1： `ListView` 页面自定义按钮添加的入口在 `Object Manager` 的 `List View Button Layout` 中。
<p align="center">
  <img src="image-2.png" alt="List View Button Layout入口" width="200">
</p>

- 注意事项2：但是这个入口不是常态显示的，需要在 `Detail` 的 `Edit` 中开启 `Allow Search`，这样才会显示 `List View Button Layout` 入口。

<p align="center">
  <img src="image-3.png" alt="Detail-Edit" width="800">
</p>
<p align="center">
  <img src="image-1.png" alt="Allow Search" width="800">
</p>

- 注意事项3：但是打开这个选项后，会影响对象在官方的Search 功能中的可见性，因此，如果目标对象在业务上是不能被检索到，或者不能公开给所有用户查看。那么这个开关在开启后，要注意关闭
<p align="center">
  <img src="image-4.png" alt="Search Tools Bar" width="800">
</p>


#### 需求2：自定义按钮如何才能做到传递数据
这里有两个方案可以用来让自定义按钮获取到List View页面选中的数据，
- 方案1：自定义按钮关联Flow，Flow有变量获取数据，然后可以向后传递进行处理，不过本文未对这种方案进行调研，不做详细描述。
- 方案2：自定义按钮关联Visualforce Page，通过Visualforce来获取信息，Visualforce可以关联APEX代码，因此数据可以顺利传递到APEX。

## 需求实现
#### 创建APEX
TestApexClass.cls
```APEX
public class TestApexClass {

    // 定义一个空间，用来保存ListView页面选择的数据
    public List<TestObject__c> selectedRecords { get; set; }
    private ApexPages.StandardSetController setCon;

    public TestApexClass(ApexPages.StandardSetController controller) {
        this.setCon = controller;
        // 获取ListView页面选择的数据
        this.selectedRecords = (List<TestObject__c>) setCon.getSelected();
    }

    // 第一个按钮
    public PageReference firstButton() {
        return setCon.cancel();
        // setCon.cancel() 是 Salesforce ApexPages.StandardSetController 的内置方法，主要有两个核心作用：
        // 1. 自动重定向返回原列表页（最核心用途）
        // 方法执行后会返回一个 PageReference 对象，该对象精确指向用户点击按钮前所在的 List View（列表视图） 页面。
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

#### 创建Visualforce Page
testVisualforce.page
```Visualforce
<!-- TestObject__c是你要操作的对象 -->
<!-- TestApexClass是Page要关联的Apex -->
<apex:page standardController="TestObject__c" recordSetVar="records" extensions="TestApexClass">
    <apex:form >
        <apex:pageBlock title="选择的Record列表">
            <apex:pageBlockButtons >
                <!-- 两个自定义按钮 -->
                <apex:commandButton value="按钮一" action="{!firstButton}"/>
                <apex:commandButton value="按钮二" action="{!secondButton}"/>
            </apex:pageBlockButtons>

            <apex:pageMessages />

            <!-- 这里的列表用来展示选中的数据，目前只设定了Id -->
            <apex:pageBlockTable value="{!selectedRecords}" var="rec">
                <apex:column value="{!rec.Id}" headerValue="Record ID"/>
            </apex:pageBlockTable>
        </apex:pageBlock>
    </apex:form>
</apex:page>
```

#### 创建自定义按钮：
![alt text](image-5.png)
![alt text](image-6.png)
![alt text](image-7.png)
![alt text](image-8.png)
![alt text](image-9.png)
![alt text](image-7.png)
![alt text](image-10.png)

#### 测试自定义按钮：
![alt text](image-11.png)
![alt text](image-12.png)
![alt text](image-13.png)