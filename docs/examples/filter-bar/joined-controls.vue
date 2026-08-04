<template>
  <elp-filter-bar
    :label-width="96"
    search-text="筛选"
    reset-text="清空"
    show-reset
    @reset="reset"
  >
    <elp-filter-bar-item label="客户筛选" width="600" append-width="230">
      <elp-select v-model="customerType" placeholder="客户类型">
        <elp-option label="全部客户" value="all" />
        <elp-option label="企业客户" value="company" />
        <elp-option label="个人客户" value="personal" />
      </elp-select>

      <template #append>
        <elp-input v-model="keyword" placeholder="名称 / 手机号" clearable />
      </template>
    </elp-filter-bar-item>

    <elp-filter-bar-item width="560" append-width="200">
      <template #label>
        <span class="channel-label">渠道</span>
      </template>

      <elp-segmented
        v-model="channel"
        :options="['全部', '线上', '线下']"
        block
      />

      <template #append>
        <elp-select v-model="region" placeholder="所属区域" clearable>
          <elp-option label="华东" value="east" />
          <elp-option label="华南" value="south" />
          <elp-option label="华北" value="north" />
        </elp-select>
      </template>
    </elp-filter-bar-item>

    <elp-filter-bar-item
      label-mode="control"
      label-width="180"
      width="650"
      append-width="240"
      aria-label="自定义字段筛选"
    >
      <template #label>
        <elp-select v-model="customField" aria-label="筛选字段">
          <elp-option label="客户名称" value="name" />
          <elp-option label="客户编号" value="code" />
          <elp-option label="联系电话" value="phone" />
        </elp-select>
      </template>

      <elp-select v-model="operator" aria-label="筛选条件">
        <elp-option label="包含" value="contains" />
        <elp-option label="等于" value="equals" />
        <elp-option label="不等于" value="not-equal" />
      </elp-select>

      <template #append>
        <elp-input v-model="customValue" placeholder="输入筛选值" clearable />
      </template>
    </elp-filter-bar-item>
  </elp-filter-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const customerType = ref('all')
const keyword = ref('')
const channel = ref('全部')
const region = ref('')
const customField = ref('name')
const operator = ref('contains')
const customValue = ref('')

const reset = () => {
  customerType.value = 'all'
  keyword.value = ''
  channel.value = '全部'
  region.value = ''
  customField.value = 'name'
  operator.value = 'contains'
  customValue.value = ''
}
</script>

<style scoped>
.channel-label {
  color: var(--elp-color-primary);
  font-weight: 600;
}
</style>
