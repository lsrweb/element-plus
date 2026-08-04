<template>
  <elp-filter-bar
    :label-width="96"
    :item-width="280"
    search-text="应用筛选"
    reset-text="重置"
    show-reset
    @search="message = '筛选条件已应用'"
    @reset="reset"
  >
    <elp-filter-bar-item
      label="任务名称"
      min-width="280"
      aria-label="按任务名称筛选"
      grow
    >
      <elp-input v-model="form.name" placeholder="输入任务名称" clearable />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="渠道" width="320">
      <elp-select
        v-model="form.channels"
        placeholder="选择渠道"
        multiple
        collapse-tags
        clearable
      >
        <elp-option label="企业微信" value="wechat" />
        <elp-option label="公众号" value="official" />
        <elp-option label="小程序" value="mini" />
      </elp-select>
    </elp-filter-bar-item>

    <elp-filter-bar-item label="创建时间" width="390">
      <elp-date-picker
        v-model="form.range"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="最低数量" width="230">
      <elp-input-number
        v-model="form.minimum"
        :min="0"
        controls-position="right"
      />
    </elp-filter-bar-item>
  </elp-filter-bar>

  <p class="filter-result">{{ message }}</p>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

const initial = () => ({
  name: '',
  channels: [] as string[],
  range: [] as Date[],
  minimum: 0,
})

const form = reactive(initial())
const message = ref('支持 Input、Select、DatePicker、InputNumber 等任意控件')

const reset = () => {
  Object.assign(form, initial())
  message.value = '已恢复默认筛选条件'
}
</script>

<style scoped>
.filter-result {
  margin: 12px 0 0;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
}
</style>
