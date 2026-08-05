<template>
  <div class="size-stack">
    <div>
      <p>Large</p>
      <elp-query size="large" :show-search="false" :show-reset="false">
        <elp-query-item label="客户" width="100%" append-width="45%">
          <elp-select v-model="large.type" placeholder="客户类型">
            <elp-option label="全部" value="all" />
            <elp-option label="企业" value="company" />
          </elp-select>
          <template #append>
            <elp-input v-model="large.keyword" placeholder="输入关键词" />
          </template>
        </elp-query-item>
      </elp-query>
    </div>

    <div>
      <p>Default</p>
      <elp-query size="default" :show-search="false" :show-reset="false">
        <elp-query-item label="客户" width="100%" append-width="45%">
          <elp-select v-model="normal.type" placeholder="客户类型">
            <elp-option label="全部" value="all" />
            <elp-option label="企业" value="company" />
          </elp-select>
          <template #append>
            <elp-input v-model="normal.keyword" placeholder="输入关键词" />
          </template>
        </elp-query-item>
      </elp-query>
    </div>

    <div>
      <p>Small</p>
      <elp-query size="small" :show-search="false" :show-reset="false">
        <elp-query-item label="客户" width="100%" append-width="45%">
          <elp-select v-model="small.type" placeholder="客户类型">
            <elp-option label="全部" value="all" />
            <elp-option label="企业" value="company" />
          </elp-select>
          <template #append>
            <elp-input v-model="small.keyword" placeholder="输入关键词" />
          </template>
        </elp-query-item>
      </elp-query>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const large = reactive({ type: 'all', keyword: '' })
const normal = reactive({ type: 'all', keyword: '' })
const small = reactive({ type: 'all', keyword: '' })
</script>

<style scoped>
.size-stack {
  display: grid;
  gap: 18px;
}

.size-stack p {
  margin: 0 0 6px;
  color: var(--elp-text-color-secondary);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
</style>
