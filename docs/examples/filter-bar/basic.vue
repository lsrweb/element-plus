<template>
  <elp-filter-bar
    search-text="查询"
    reset-text="清空"
    show-reset
    :loading="loading"
    @search="handleSearch"
    @reset="handleReset"
  >
    <elp-filter-bar-item label="数据范围" width="220">
      <elp-select v-model="filters.scope" placeholder="全部">
        <elp-option label="全部" value="all" />
        <elp-option label="仅自己" value="mine" />
        <elp-option label="本部门" value="department" />
      </elp-select>
    </elp-filter-bar-item>

    <elp-filter-bar-item label="关键词" width="300">
      <elp-input
        v-model="filters.keyword"
        placeholder="昵称 / wxid / 机器人备注"
        clearable
      />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="状态筛选" width="255">
      <elp-select v-model="filters.status" placeholder="全部" clearable>
        <elp-option label="全部" value="" />
        <elp-option label="在线" value="online" />
        <elp-option label="离线" value="offline" />
      </elp-select>
    </elp-filter-bar-item>

    <elp-filter-bar-item label="分组搜索" width="255">
      <elp-select v-model="filters.group" placeholder="选择分组" clearable>
        <elp-option label="默认分组" value="default" />
        <elp-option label="重点客户" value="important" />
      </elp-select>
    </elp-filter-bar-item>

    <elp-filter-bar-item label="到期筛选" width="255">
      <elp-select v-model="filters.expire" placeholder="全部" clearable>
        <elp-option label="7 天内" value="7" />
        <elp-option label="30 天内" value="30" />
        <elp-option label="已过期" value="expired" />
      </elp-select>
    </elp-filter-bar-item>
  </elp-filter-bar>

  <p class="filter-result">{{ result }}</p>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const createFilters = () => ({
  scope: 'all',
  keyword: '',
  status: '',
  group: '',
  expire: '',
})

const filters = reactive(createFilters())
const loading = ref(false)
const result = ref('修改条件后点击查询')

const handleSearch = () => {
  loading.value = true
  result.value = `查询参数：${JSON.stringify(filters)}`
  window.setTimeout(() => (loading.value = false), 400)
}

const handleReset = () => {
  Object.assign(filters, createFilters())
  result.value = '筛选条件已清空'
}
</script>

<style scoped>
.filter-result {
  margin: 12px 0 0;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
}
</style>
