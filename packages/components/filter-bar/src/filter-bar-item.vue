<template>
  <div
    :class="[
      ns.b(),
      ns.is('grow', grow),
      ns.is('without-label', !hasLabel),
      ns.is('with-append', hasAppend),
      ns.is(`label-${labelAlign}`, hasLabel),
      ns.is('label-control', hasLabel && labelMode === 'control'),
    ]"
    :style="itemStyle"
    role="group"
    :aria-label="ariaLabel || label || undefined"
  >
    <div v-if="hasLabel" :class="ns.e('label')">
      <slot name="label">{{ label }}</slot>
    </div>
    <div :class="ns.e('control')">
      <slot />
    </div>
    <div v-if="hasAppend" :class="ns.e('append')">
      <slot name="append" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { addUnit } from '@element-plus/utils'
import { useNamespace } from '@element-plus/hooks'
import { filterBarItemProps } from './filter-bar-item'

defineOptions({
  name: 'ElFilterBarItem',
})

const props = defineProps(filterBarItemProps)
const slots = useSlots()
const ns = useNamespace('filter-bar-item')
const barNs = useNamespace('filter-bar')

const hasLabel = computed(() => Boolean(props.label || slots.label))
const hasAppend = computed(() => Boolean(slots.append))
const itemStyle = computed(() => ({
  ...(props.labelWidth
    ? { [barNs.cssVarBlockName('label-width')]: addUnit(props.labelWidth) }
    : {}),
  ...(props.width
    ? { [barNs.cssVarBlockName('item-width')]: addUnit(props.width) }
    : {}),
  ...(props.minWidth
    ? { [barNs.cssVarBlockName('item-min-width')]: addUnit(props.minWidth) }
    : {}),
  ...(props.appendWidth
    ? { [barNs.cssVarBlockName('append-width')]: addUnit(props.appendWidth) }
    : {}),
}))
</script>
