<template>
  <elp-filter-bar
    :show-search="false"
    :show-reset="false"
    :label-width="90"
    :item-width="300"
  >
    <elp-filter-bar-item label="左对齐" label-align="left">
      <elp-input v-model="left" placeholder="label-align: left" />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="居中" label-align="center">
      <elp-input v-model="center" placeholder="label-align: center" />
    </elp-filter-bar-item>

    <elp-filter-bar-item label="右对齐" label-align="right">
      <elp-input v-model="right" placeholder="label-align: right" />
    </elp-filter-bar-item>
  </elp-filter-bar>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const left = ref('')
const center = ref('')
const right = ref('')
</script>
