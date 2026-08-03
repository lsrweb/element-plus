<template>
  <div class="demo-datetime-picker">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-date-picker
        v-model="value1"
        type="datetimerange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
    <div class="block">
      <span class="demonstration">With shortcuts</span>
      <el-date-picker
        v-model="value2"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const value2 = ref('')

const shortcuts = [
  {
    text: 'Last week',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setDate(start.getDate() - 7)
      return [start, end]
    },
  },
  {
    text: 'Last month',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 1)
      return [start, end]
    },
  },
  {
    text: 'Last 3 months',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setMonth(start.getMonth() - 3)
      return [start, end]
    },
  },
]
</script>

<style scoped>
.demo-datetime-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--elp-border-color);
  flex: 1;
  min-width: 300px;
}

.block:last-child {
  border-right: none;
}

.block .demonstration {
  display: block;
  color: var(--elp-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .block {
    flex: 100%;
    border-right: none;
    border-bottom: solid 1px var(--elp-border-color);
  }

  .block:last-child {
    border-bottom: none;
  }

  :deep(.elp-date-editor.elp-input) {
    width: 100%;
  }

  :deep(.elp-date-editor.elp-input__wrapper) {
    width: 100%;
    max-width: 300px;
  }
}
</style>
