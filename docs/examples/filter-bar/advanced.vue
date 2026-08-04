<template>
  <elp-filter-bar
    v-model:expanded="expanded"
    search-text="搜索"
    reset-text="重置"
    expand-text="高级筛选"
    collapse-text="收起筛选"
    show-reset
    collapsible
    @search="handleSearch"
    @reset="handleReset"
  >
    <elp-filter-bar-item label="客户关键词" width="340">
      <elp-input
        v-model="form.keyword"
        placeholder="名称、手机号或备注"
        clearable
      />
    </elp-filter-bar-item>
    <elp-filter-bar-item label="客户状态">
      <elp-select v-model="form.status" placeholder="全部" clearable>
        <elp-option label="跟进中" value="following" />
        <elp-option label="已成交" value="converted" />
        <elp-option label="已流失" value="lost" />
      </elp-select>
    </elp-filter-bar-item>

    <template #advanced>
      <elp-filter-bar-item label="负责人">
        <elp-select v-model="form.owner" placeholder="选择负责人" clearable>
          <elp-option label="李明" value="liming" />
          <elp-option label="王芳" value="wangfang" />
        </elp-select>
      </elp-filter-bar-item>
      <elp-filter-bar-item label="客户等级">
        <elp-select v-model="form.level" placeholder="全部等级" clearable>
          <elp-option label="A级" value="a" />
          <elp-option label="B级" value="b" />
          <elp-option label="C级" value="c" />
        </elp-select>
      </elp-filter-bar-item>
      <elp-filter-bar-item label="活跃日期" width="390">
        <elp-date-picker
          v-model="form.activeRange"
          type="daterange"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </elp-filter-bar-item>
    </template>
  </elp-filter-bar>

  <p class="filter-result">
    展开状态：{{ expanded ? '已展开' : '已收起' }}；{{ message }}
  </p>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const initial = () => ({
  keyword: '',
  status: '',
  owner: '',
  level: '',
  activeRange: [] as Date[],
})

const expanded = ref(false)
const form = reactive(initial())
const message = ref('高级条件按需展示')

const handleSearch = () => (message.value = '已提交全部筛选条件')
const handleReset = () => {
  Object.assign(form, initial())
  message.value = '条件已重置'
}
</script>

<style scoped>
.filter-result {
  margin: 12px 0 0;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
}
</style>
