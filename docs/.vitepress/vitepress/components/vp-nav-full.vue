<script setup lang="ts">
import { ref } from 'vue'
import { useLockScreen } from '../composables/lock-screen'
import VPFullScreenMenu from './full-screen/vp-menu.vue'
import VPFullScreenTranslation from './full-screen/vp-translation.vue'
import VPFullScreenThemeToggler from './full-screen/vp-theme-toggler.vue'

defineProps<{
  fullScreen: boolean
}>()

const { lock, cleanup } = useLockScreen()
const fullscreen = ref()
</script>

<template>
  <Transition name="elp-fade-in" @enter="lock" @after-leave="cleanup">
    <div v-if="fullScreen" ref="fullscreen">
      <div class="full-screen-container">
        <VPFullScreenMenu @close="$emit('close')" />
        <VPFullScreenTranslation @close="$emit('close')" />
        <VPFullScreenThemeToggler />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.full-screen {
  position: fixed;
  top: var(--nav-height);
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: var(--bg-color);
  transition: background-color 0.5s;
  overflow-y: auto;

  &.elp-fade-in-enter-active,
  &.elp-fade-in-leave-active {
    .full-screen-container {
      transition: transform var(--elp-transition-duration)
        var(--elp-transition-function-ease-in-out-bezier);
    }
  }

  &.elp-fade-in-enter-from,
  &.elp-fade-in-leave-to {
    .full-screen-container {
      transform: translateY(-8px);
    }
  }

  .full-screen-container {
    margin: 0 auto;
    padding: 24px 0 96px;
    max-width: 18rem;
  }
}
</style>
