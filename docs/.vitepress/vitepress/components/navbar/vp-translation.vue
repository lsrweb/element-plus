<script setup lang="ts">
import { useRouter, withBase } from 'vitepress'
import { useTranslation } from '../../composables/translation'

const router = useRouter()
const { getTargetUrl, switchLang, languageMap, langs, lang, locale } =
  useTranslation()

const toTranslation = () => {
  router.go(withBase(`/${lang.value}/guide/translation`))
}
</script>

<template>
  <div class="translation-container">
    <ClientOnly>
      <ElDropdown popper-class="translation-popup" role="navigation">
        <ElIcon :size="24" :aria-label="locale.language">
          <i-ri-translate-2 />
        </ElIcon>
        <template #dropdown>
          <ElDropdownMenu>
            <a v-for="l in langs" :key="l" :href="getTargetUrl(l)">
              <ElDropdownItem
                :class="{ language: true, selected: l === lang }"
                @click.stop="switchLang(l)"
              >
                {{ languageMap[l] }}
              </ElDropdownItem>
            </a>
            <a :href="`/${lang}/guide/translation`">
              <ElDropdownItem
                class="language selected"
                @click.stop="toTranslation"
              >
                {{ locale.help }}
              </ElDropdownItem>
            </a>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
@use '../../styles/mixins' as *;

.translation-container {
  display: none;
  height: 24px;
  padding: 0 12px;
  cursor: pointer;

  @include respond-to('md') {
    display: block;
  }
}
</style>

<style lang="scss">
.elp-dropdown__popper.translation-popup {
  --elp-bg-color-overlay: var(--bg-color);
  --elp-popper-border-radius: 8px;
  --elp-border-color-light: transparent;

  padding: 7px 0;
  min-width: 192px;
  transition: background-color 0.5s;

  .elp-popper__arrow {
    display: none;
  }

  .language {
    padding: 0 16px;
    line-height: 28px;

    &.selected {
      --elp-text-color-regular: var(--brand-color);
    }
  }
}
</style>
