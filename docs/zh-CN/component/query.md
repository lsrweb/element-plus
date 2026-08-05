---
title: Query 查询栏
lang: zh-CN
---

# Query 查询栏 ^(2.14.1)

用于后台列表页的高密度筛选条。它通过组合式结构连接标签与任意 Vue 3 表单控件，并统一处理布局、操作区和高级筛选。

## 基础用法

使用 `QueryItem` 组织每个筛选条件。组件不会接管字段数据，表单状态仍由业务通过 `v-model` 管理。默认仅显示筛选按钮；示例通过 `show-reset` 额外启用了重置按钮。操作按钮会跟随最后一个筛选项参与换行。

:::demo

query/basic

:::

## 混合表单控件

内容插槽可以放置 Input、Select、DatePicker、InputNumber 或业务自定义控件。通过 `width`、`min-width` 和 `grow` 控制项目宽度。

:::demo

query/mixed-controls

:::

## 三段并联

`QueryItem` 可以组合左侧标签、中间默认插槽和右侧 `append` 插槽。三个区域都支持自定义内容；组件会处理常用表单控件的边框重叠、外侧圆角和聚焦层级。左侧需要放置 Select、Input 或业务组件时，将 `label-mode` 设置为 `control`，再通过 `label` 插槽传入组件。

:::demo

query/joined-controls

:::

## 尺寸

通过 `size` 统一控制筛选条、内部表单控件和操作按钮，支持 `large`、`default` 和 `small`。

:::demo

query/sizes

:::

## 标签对齐

使用 `label-align` 分别设置标签左对齐、居中或右对齐。

:::demo

query/label-alignment

:::

## 高级筛选

通过 `advanced` 插槽声明次要筛选项，并使用 `v-model:expanded` 控制展开状态。

:::demo

query/advanced

:::

## 自定义标签和操作区

使用 `label` 与 `actions` 插槽扩展业务内容。`actions` 插槽会提供 `search`、`reset` 和 `toggle` 方法。

:::demo

query/custom-actions

:::

## 完整属性配置

下面的示例集中演示尺寸、标签宽度与对齐、项目宽度与间距、加载状态、默认操作按钮、高级筛选、无障碍标签以及三段 `append` 用法。

:::demo

query/configurable

:::

## Query Item 属性总览

下面集中展示 `QueryItem` 的属性和插槽。第二个筛选项启用 `grow` 后，会在保留 `min-width` 的前提下占满当前行的剩余空间；第三个筛选项展示左、中、右三个区域都使用表单控件的写法。

:::demo

query/item-properties

:::

## Query API ^(2.14.1)

### 属性

| 名称                        | 说明                     | 类型                                           | 默认值           |
| --------------------------- | ------------------------ | ---------------------------------------------- | ---------------- |
| expanded / v-model:expanded | 高级筛选是否展开         | ^[boolean]                                     | false            |
| size                        | 内部控件与按钮尺寸       | ^[enum]`'' \| 'large' \| 'default' \| 'small'` | default          |
| label-width                 | 默认标签宽度             | ^[string] / ^[number]                          | 88               |
| item-width                  | 默认筛选项宽度           | ^[string] / ^[number]                          | 260              |
| gap                         | 筛选项之间的间距         | ^[string] / ^[number]                          | 8                |
| loading                     | 搜索按钮是否处于加载状态 | ^[boolean]                                     | false            |
| show-search                 | 是否显示默认搜索按钮     | ^[boolean]                                     | true             |
| show-reset                  | 是否显示默认重置按钮     | ^[boolean]                                     | false            |
| collapsible                 | 是否显示高级筛选展开按钮 | ^[boolean]                                     | false            |
| search-text                 | 搜索按钮文案             | ^[string]                                      | Search           |
| reset-text                  | 重置按钮文案             | ^[string]                                      | Reset            |
| expand-text                 | 展开按钮文案             | ^[string]                                      | More             |
| collapse-text               | 收起按钮文案             | ^[string]                                      | Less             |
| aria-label                  | 查询区域的无障碍标签     | ^[string]                                      | Query conditions |

### 事件

| 名称            | 说明                   | 类型                                     |
| --------------- | ---------------------- | ---------------------------------------- |
| search          | 点击默认搜索按钮时触发 | ^[Function]`() => void`                  |
| reset           | 点击默认重置按钮时触发 | ^[Function]`() => void`                  |
| update:expanded | 展开状态变化时触发     | ^[Function]`(expanded: boolean) => void` |

### 插槽

| 名称     | 说明               | 类型                                                                                  |
| -------- | ------------------ | ------------------------------------------------------------------------------------- |
| default  | 主要筛选项         | —                                                                                     |
| advanced | 可折叠的高级筛选项 | —                                                                                     |
| actions  | 自定义操作区       | ^[object]`{ expanded: boolean, search: Function, reset: Function, toggle: Function }` |

### 暴露

| 名称     | 说明                 | 类型                    |
| -------- | -------------------- | ----------------------- |
| toggle   | 切换高级筛选展开状态 | ^[Function]`() => void` |
| expand   | 展开高级筛选         | ^[Function]`() => void` |
| collapse | 收起高级筛选         | ^[Function]`() => void` |

## Query Item API ^(2.14.1)

### 属性

| 名称         | 说明                   | 类型                                   | 默认值 |
| ------------ | ---------------------- | -------------------------------------- | ------ |
| label        | 筛选项标签             | ^[string]                              | ''     |
| label-mode   | 左侧区域的展示模式     | ^[enum]`'text' \| 'control'`           | text   |
| label-align  | 标签内容的水平对齐方式 | ^[enum]`'left' \| 'center' \| 'right'` | left   |
| label-width  | 当前筛选项标签宽度     | ^[string] / ^[number]                  | —      |
| width        | 当前筛选项宽度         | ^[string] / ^[number]                  | —      |
| min-width    | 当前筛选项最小宽度     | ^[string] / ^[number]                  | —      |
| append-width | 右侧追加区域宽度       | ^[string] / ^[number]                  | 42%    |
| grow         | 是否占用剩余空间       | ^[boolean]                             | false  |
| aria-label   | 当前筛选项的无障碍标签 | ^[string]                              | —      |

### 插槽

| 名称    | 说明                                              |
| ------- | ------------------------------------------------- |
| default | 表单控件或业务内容                                |
| label   | 自定义标签内容；控件需配合 `label-mode="control"` |
| append  | 右侧并联的表单控件或业务内容                      |
