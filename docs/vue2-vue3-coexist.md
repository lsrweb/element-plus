# Vue 2 与 Vue 3 共存方案

## 1. 背景

当前项目是 Element Plus 组件库源码。部分后台系统仍然基于 Vue 2 和 Element UI 运行，同时新开发的页面希望使用 Vue 3 和 Element Plus。

如果在同一个页面中直接加载两套运行时和组件库，可能出现以下问题：

- Vue 2 和 Vue 3 都依赖全局变量，容易相互覆盖；
- Element UI 和 Element Plus 都使用 `el-*` 组件标签及 `.el-*` 样式类，存在样式和组件命名冲突；
- 如果把 Vue 3 的所有 API 平铺到 `window`，可能与业务代码或其他依赖产生方法名冲突；
- 如果要求业务方额外安装、引入 Vue 3，老页面的接入成本会增加。

本方案的目标是：在不改动 Vue 2 原有代码的前提下，把 Vue 3 一起打入 Element Plus 的完整构建产物，并为 Vue 3 提供一个独立、可识别的全局入口。

## 2. 方案概览

完整 UMD 构建产物同时包含：

1. Vue 3 运行时及其 API；
2. Element Plus 组件和工具 API；
3. Vue 3 编译器能力，以支持直接在 HTML 中使用模板；
4. 一套用于区分 Vue 2 / Element UI 的 `elp-*` 组件标签和 `.elp-*` CSS 命名空间。

页面加载完成后，提供以下全局对象：

| 全局对象             | 内容                        | 用途                                           |
| -------------------- | --------------------------- | ---------------------------------------------- |
| `window.Vue`         | 原有 Vue 2                  | 保持旧页面和旧代码不变                         |
| `window.Vue3`        | Vue 3 的导出对象            | 创建 Vue 3 应用、使用 `ref`、`computed` 等 API |
| `window.ElementPlus` | Element Plus 导出对象       | 使用组件、`ElMessage`、`ElNotification` 等 API |
| `window.EPS`         | `window.ElementPlus` 的别名 | 缩短或明确 Vue 3 组件库入口                    |

其中，Vue 3 API 不会被逐个挂载到 `window`，而是统一收纳在 `window.Vue3` 下：

```js
const { createApp, ref } = window.Vue3
const { ElMessage, ElNotification } = window.ElementPlus
```

这样既保留了完整的 Vue 3 API，又避免了 `createApp`、`ref`、`watch` 等名称污染全局作用域。

## 3. 为什么使用 `Vue3` 作为全局入口

### 3.1 不把 Vue 3 API 平铺到 `window`

一种直接的做法是：

```js
window.createApp = createApp
window.ref = ref
window.computed = computed
window.watch = watch
// ...
```

这种方式有两个问题：

- Vue 3 API 数量较多，需要维护一份全局名称清单；
- API 名称可能与 Vue 2、业务代码或其他库冲突，后加载的脚本可能覆盖先加载的变量。

因此不采用 API 平铺方式。

### 3.2 统一挂载到 `window.Vue3`

Element Plus 入口导出 Vue 的全部 API，并在浏览器环境中将 Vue 模块对象挂载到 `window.Vue3`：

```ts
import * as Vue from 'vue'

export * from 'vue'

if (typeof window !== 'undefined') {
  ;(window as any).Vue3 = Vue
}
```

调用方可以按需解构 API，且不会影响现有的 `window.Vue`：

```js
const { createApp, ref } = Vue3

const app = createApp({
  setup() {
    const count = ref(0)
    return { count }
  },
})

app.mount('#vue3-example')
```

对应的模板直接写在 HTML 中：

```html
<div id="vue3-example">
  <button @click="count++">{{ count }}</button>
</div>
```

## 4. 为什么使用 `elp-*` 组件前缀

Vue 2 区域继续使用 Element UI 的默认命名：

```html
<el-button>Vue 2 按钮</el-button>
```

Vue 3 区域使用 Element Plus 的独立命名：

```html
<elp-button>Vue 3 按钮</elp-button>
```

`elp` 不是 Element Plus 对外约定的默认前缀，而是本共存方案使用的自定义命名空间。它同时应用于：

- 全局组件注册名：`ElButton` 注册为 `ElpButton`，模板中对应 `<elp-button>`；
- CSS BEM 类名：`.el-button` 改为 `.elp-button`；
- 组件内部元素、修饰符、CSS 变量和弹层相关命名。

这样 Vue 2 的 `.el-*` 样式不会覆盖 Vue 3 的 `.elp-*` 样式，两个区域可以在同一个页面中并行运行。

需要注意：组件导出的 JavaScript 名称仍然是 `ElButton`、`ElMessage` 等，只有全局安装到 Vue 3 应用时使用 `Elp*` 注册名。也就是说，按模块直接引入时仍可使用原有导出名：

```ts
import { ElButton } from 'element-plus'
```

## 5. 页面使用示例

下面的示例展示 Vue 2 和 Vue 3 在同一个 HTML 页面中共存：

```html
<!-- 旧页面：Vue 2 + Element UI -->
<div id="vue2-app">
  <el-button type="primary" @click="submit">Vue 2 提交</el-button>
</div>

<!-- 新页面：Vue 3 + Element Plus -->
<div id="vue3-app">
  <elp-button type="primary" @click="submit">Vue 3 提交</elp-button>
</div>

<script src="https://unpkg.com/vue@2/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>

<!-- 完整构建：内置 Vue 3，不覆盖 window.Vue -->
<script src="./index.full.js"></script>
<script>
  // Vue 2 直接挂载到 HTML 中已经写好的 <el-*> 模板
  window.Vue2 = window.Vue
  new Vue2({
    el: '#vue2-app',
    methods: {
      submit() {
        this.$message.success('Vue 2 页面提交成功')
      },
    },
  })

  // Vue 3 直接挂载到 HTML 中已经写好的 <elp-*> 模板
  const { createApp } = Vue3
  const { ElMessage } = ElementPlus

  createApp({
    setup() {
      const submit = () => {
        ElMessage.success('Vue 3 页面提交成功')
      }
      return { submit }
    },
  })
    .use(ElementPlus)
    .mount('#vue3-app')
</script>
```

加载顺序建议保持为：

1. Vue 2；
2. Element UI；
3. Element Plus 完整 UMD；
4. 创建并挂载 Vue 3 应用。

模板直接写在 HTML 根节点中，不再通过 JavaScript 的 `template: \`...\`` 字符串生成。旧页面仍通过 `new Vue()` 和 `<el-*>` 运行，新页面通过 `Vue3.createApp()` 和 `<elp-*>` 运行，两者使用各自的根节点。

## 6. 修改点

- 完整 UMD 构建不再把 Vue 作为外部依赖，而是将 Vue 3 打入 `index.full.js`；
- 构建时使用 Vue 的浏览器编译版本，支持直接编译 HTML 中的 Vue 模板；
- 示例页面直接在 HTML 中书写 `<el-*>` / `<elp-*>` 组件，不使用 JavaScript `template` 字符串；
- Element Plus UMD 导出到 `window.ElementPlus`，并额外提供 `window.EPS` 别名；
- Element Plus 入口将 Vue 3 的 API 集中暴露到 `window.Vue3`；
- Vue 3 组件安装时将 `El*` 组件注册为 `Elp*`；
- 默认 CSS 命名空间改为 `elp`，对应生成 `.elp-*` 样式。

## 7. 待确认的事项

### 7.1 这是默认构建还是专用共存构建

当前实现直接修改了 Element Plus 的默认命名空间和组件安装行为，因此普通 Element Plus 构建也会表现为：

- 标签从 `<el-button>` 变为 `<elp-button>`；
- 样式从 `.el-button` 变为 `.elp-button`。

如果 `elp` 只服务于 Vue 2 / Vue 3 共存场景，建议后续将它拆分为专用的 coexist 构建入口或构建配置，保留标准 Element Plus 构建的 `el-*` 行为，避免影响现有 Element Plus 用户。

### 7.2 `window.EPS` 作为长期公开入口

`window.ElementPlus` 是 UMD 的标准导出名，`window.EPS` 是为 Vue 3 共存场景提供的长期公开入口。后续应持续维护该别名，保证已有页面可以稳定使用：

```js
const { ElMessage } = EPS
```

`EPS` 与 `ElementPlus` 始终指向同一个对象，不应在后续版本中随意移除或改变其含义。

### 7.3 `elp-*` 作为长期命名空间

在较长一段时间内，Vue 3 / Element Plus 共存区域统一使用 `elp-*` 和 `.elp-*`。这不是临时测试前缀，而是用于区分 Vue 2 / Element UI 的稳定命名方案。

因此后续新增组件、内部样式、CSS 变量、弹层容器和相关文档，都应遵循 `elp` 命名空间，避免重新引入 `.el-*` 与 Vue 2 区域冲突。
