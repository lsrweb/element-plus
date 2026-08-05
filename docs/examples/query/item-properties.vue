<template>
  <elp-query
    :show-search="false"
    :show-reset="false"
    :label-width="96"
    :item-width="300"
  >
    <elp-query-item
      label="固定宽度"
      label-align="right"
      width="300"
      aria-label="固定宽度筛选项"
    >
      <elp-input v-model="fixedValue" placeholder="width: 300" />
    </elp-query-item>

    <elp-query-item
      label="自动扩展"
      label-align="left"
      width="320"
      min-width="260"
      append-width="190"
      aria-label="自动占满剩余空间的筛选项"
      grow
    >
      <elp-select v-model="growType" placeholder="选择类型">
        <elp-option label="全部类型" value="all" />
        <elp-option label="企业客户" value="company" />
        <elp-option label="个人客户" value="personal" />
      </elp-select>

      <template #append>
        <elp-input
          v-model="growKeyword"
          placeholder="grow：占满剩余空间"
          clearable
        />
      </template>
    </elp-query-item>

    <elp-query-item
      label-mode="control"
      label-width="170"
      width="620"
      append-width="220"
      aria-label="自定义左侧控件筛选项"
    >
      <template #label>
        <elp-select v-model="field" aria-label="筛选字段">
          <elp-option label="客户名称" value="name" />
          <elp-option label="客户编号" value="code" />
        </elp-select>
      </template>

      <elp-select v-model="operator" aria-label="筛选条件">
        <elp-option label="包含" value="contains" />
        <elp-option label="等于" value="equals" />
      </elp-select>

      <template #append>
        <elp-input v-model="customValue" placeholder="输入筛选值" />
      </template>
    </elp-query-item>
  </elp-query>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const fixedValue = ref('')
const growType = ref('all')
const growKeyword = ref('')
const field = ref('name')
const operator = ref('contains')
const customValue = ref('')
</script>
