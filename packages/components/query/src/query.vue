<template>
  <section
    :class="[ns.b(), ns.m(size), ns.is('expanded', expanded)]"
    :style="rootStyle"
    role="search"
    :aria-label="ariaLabel"
  >
    <el-config-provider :namespace="namespace" :size="size">
      <div :class="ns.e('surface')">
        <div :class="ns.e('fields')">
          <slot />

          <div v-if="hasActions" :class="ns.e('actions')">
            <slot
              name="actions"
              :expanded="expanded"
              :search="handleSearch"
              :reset="handleReset"
              :toggle="toggle"
            >
              <el-button v-if="showReset" @click="handleReset">
                <el-icon><refresh /></el-icon>
                {{ resetText }}
              </el-button>
              <el-button
                v-if="showSearch"
                type="primary"
                :loading="loading"
                @click="handleSearch"
              >
                <el-icon v-if="!loading"><search /></el-icon>
                {{ searchText }}
              </el-button>
              <el-button
                v-if="hasAdvanced && collapsible"
                text
                :aria-expanded="expanded"
                @click="toggle"
              >
                {{ expanded ? collapseText : expandText }}
                <el-icon
                  :class="[ns.e('toggle-icon'), ns.is('active', expanded)]"
                >
                  <arrow-down />
                </el-icon>
              </el-button>
            </slot>
          </div>
        </div>
      </div>

      <div
        v-if="hasAdvanced"
        :class="[ns.e('advanced'), ns.is('expanded', expanded)]"
        :aria-hidden="!expanded"
        :inert="expanded ? undefined : true"
      >
        <div :class="ns.e('advanced-clip')">
          <div :class="ns.e('advanced-fields')">
            <slot name="advanced" />
          </div>
        </div>
      </div>
    </el-config-provider>
  </section>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { ArrowDown, Refresh, Search } from '@element-plus/icons-vue'
import { ElButton } from '@element-plus/components/button'
import { ElConfigProvider } from '@element-plus/components/config-provider'
import { ElIcon } from '@element-plus/components/icon'
import { addUnit } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { queryEmits, queryProps } from './query'

defineOptions({
  name: 'ElQuery',
})

const props = defineProps(queryProps)
const emit = defineEmits(queryEmits)
const slots = useSlots()
const ns = useNamespace('query')
const namespace = ns.namespace

const hasAdvanced = computed(() => Boolean(slots.advanced))
const hasActions = computed(
  () =>
    Boolean(slots.actions) ||
    props.showSearch ||
    props.showReset ||
    (hasAdvanced.value && props.collapsible)
)

const rootStyle = computed(() => ({
  [ns.cssVarBlockName('label-width')]: addUnit(props.labelWidth),
  [ns.cssVarBlockName('item-width')]: addUnit(props.itemWidth),
  [ns.cssVarBlockName('gap')]: addUnit(props.gap),
}))

const handleSearch = () => emit('search')
const handleReset = () => emit('reset')
const setExpanded = (value: boolean) => emit('update:expanded', value)
const toggle = () => setExpanded(!props.expanded)
const expand = () => setExpanded(true)
const collapse = () => setExpanded(false)

defineExpose({
  toggle,
  expand,
  collapse,
})
</script>
