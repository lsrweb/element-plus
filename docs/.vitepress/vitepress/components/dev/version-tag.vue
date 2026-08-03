<script lang="ts" setup>
defineProps<{
  version: string
}>()
</script>

<template>
  <el-tag class="version-tag" size="small" effect="plain" hit round>
    {{ version }}
  </el-tag>
</template>

<style scoped lang="scss">
.version-tag.elp-zoom-in-center-leave-active {
  --elp-transition-duration: 0s;
}
</style>
