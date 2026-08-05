<template>
  <elp-query
    :show-search="false"
    :show-reset="false"
    :label-width="90"
    :item-width="300"
  >
    <elp-query-item label="左对齐" label-align="left">
      <elp-input v-model="left" placeholder="label-align: left" />
    </elp-query-item>

    <elp-query-item label="居中" label-align="center">
      <elp-input v-model="center" placeholder="label-align: center" />
    </elp-query-item>

    <elp-query-item label="右对齐" label-align="right">
      <elp-input v-model="right" placeholder="label-align: right" />
    </elp-query-item>
  </elp-query>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const left = ref('')
const center = ref('')
const right = ref('')
</script>
