<template>
  <elp-filter-bar
    :show-search="false"
    :show-reset="false"
    aria-label="订单筛选"
    @search="message = '订单列表已刷新'"
    @reset="reset"
  >
    <elp-filter-bar-item width="360" grow>
      <template #label>
        <span class="label-with-dot"><i />订单检索</span>
      </template>
      <elp-input v-model="keyword" placeholder="订单号 / 客户名称" clearable />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="风险状态" width="250">
      <elp-segmented v-model="risk" :options="['全部', '正常', '异常']" block />
    </elp-filter-bar-item>

    <template #actions="{ search, reset: resetFilters }">
      <elp-button @click="exportData">导出</elp-button>
      <elp-button @click="resetFilters">清空</elp-button>
      <elp-button type="primary" @click="search">刷新列表</elp-button>
    </template>
  </elp-filter-bar>

  <p class="filter-result">{{ message }}</p>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const keyword = ref('')
const risk = ref('全部')
const message = ref('操作区、标签区和内容区均可通过插槽定制')

const exportData = () => (message.value = '已触发导出操作')
const reset = () => {
  keyword.value = ''
  risk.value = '全部'
  message.value = '筛选条件已清空'
}
</script>

<style scoped>
.label-with-dot {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.label-with-dot i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--elp-color-primary);
  box-shadow: 0 0 0 3px var(--elp-color-primary-light-9);
}

.filter-result {
  margin: 12px 0 0;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
}
</style>
