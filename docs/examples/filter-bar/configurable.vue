<template>
  <div class="config-panel">
    <label>
      尺寸
      <elp-select v-model="config.size" style="width: 110px">
        <elp-option label="Large" value="large" />
        <elp-option label="Default" value="default" />
        <elp-option label="Small" value="small" />
      </elp-select>
    </label>
    <label>
      标签对齐
      <elp-select v-model="config.labelAlign" style="width: 100px">
        <elp-option label="左" value="left" />
        <elp-option label="中" value="center" />
        <elp-option label="右" value="right" />
      </elp-select>
    </label>
    <label>显示筛选 <elp-switch v-model="config.showSearch" /></label>
    <label>显示重置 <elp-switch v-model="config.showReset" /></label>
    <label>高级筛选 <elp-switch v-model="config.collapsible" /></label>
    <label>加载状态 <elp-switch v-model="config.loading" /></label>
  </div>

  <elp-filter-bar
    v-model:expanded="expanded"
    :size="config.size"
    :label-width="100"
    :item-width="480"
    :gap="12"
    :loading="config.loading"
    :show-search="config.showSearch"
    :show-reset="config.showReset"
    :collapsible="config.collapsible"
    search-text="应用"
    reset-text="清空"
    expand-text="更多条件"
    collapse-text="收起条件"
    aria-label="可配置筛选条件"
  >
    <elp-filter-bar-item
      label="业务筛选"
      :label-align="config.labelAlign"
      width="560"
      min-width="360"
      append-width="220"
      aria-label="业务类型和关键词"
      grow
    >
      <elp-select v-model="form.type" placeholder="业务类型">
        <elp-option label="全部" value="all" />
        <elp-option label="新增" value="new" />
        <elp-option label="续费" value="renew" />
      </elp-select>
      <template #append>
        <elp-input v-model="form.keyword" placeholder="输入关键词" clearable />
      </template>
    </elp-filter-bar-item>

    <template #advanced>
      <elp-filter-bar-item label="归属部门" label-align="left">
        <elp-select v-model="form.department" placeholder="全部部门" clearable>
          <elp-option label="销售部" value="sales" />
          <elp-option label="运营部" value="operation" />
        </elp-select>
      </elp-filter-bar-item>
    </template>
  </elp-filter-bar>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const expanded = ref(false)
const config = reactive({
  size: 'default' as 'large' | 'default' | 'small',
  labelAlign: 'left' as 'left' | 'center' | 'right',
  showSearch: true,
  showReset: false,
  collapsible: false,
  loading: false,
})
const form = reactive({ type: 'all', keyword: '', department: '' })
</script>

<style scoped>
.config-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-bottom: 12px;
  padding: 10px 12px;
  border-radius: var(--elp-border-radius-base);
  background: var(--elp-fill-color-extra-light);
}

.config-panel label {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
  white-space: nowrap;
}
</style>
