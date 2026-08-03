<template>
  <div class="custom-style">
    <el-segmented v-model="value" :options="options" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const value = ref('Delicacy')

const options = ['Delicacy', 'Desserts&Drinks', 'Fresh foods', 'Supermarket']
</script>

<style scoped>
.custom-style .elp-segmented {
  --elp-segmented-item-selected-color: var(--elp-text-color-primary);
  --elp-segmented-item-selected-bg-color: #ffd100;
  --elp-border-radius-base: 16px;
}
</style>
