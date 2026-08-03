<template>
  <div>
    <el-button @click="show = !show">Click Me</el-button>

    <div class="transition-container">
      <transition name="elp-zoom-in-left">
        <div v-show="show" class="transition-box">.elp-zoom-in-left</div>
      </transition>

      <transition name="elp-zoom-in-center">
        <div v-show="show" class="transition-box">.elp-zoom-in-center</div>
      </transition>

      <transition name="elp-zoom-in-top">
        <div v-show="show" class="transition-box">.elp-zoom-in-top</div>
      </transition>

      <transition name="elp-zoom-in-bottom">
        <div v-show="show" class="transition-box">.elp-zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const show = ref(true)
</script>

<style scoped>
.transition-container {
  display: flex;
  margin-top: 20px;
  min-height: 100px;
  flex-wrap: wrap;
  gap: 16px;
}

.transition-box {
  width: 200px;
  height: 100px;
  border-radius: var(--elp-border-radius-base);
  background-color: var(--elp-color-primary);
  text-align: center;
  color: #fff;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: break-word;
  font-size: 14px;
}
</style>
