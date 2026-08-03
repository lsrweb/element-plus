<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Transition name="elp-fade-in">
    <div v-if="show" />
  </Transition>
</template>
