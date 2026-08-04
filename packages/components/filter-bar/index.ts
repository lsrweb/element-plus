import { withInstall, withNoopInstall } from '@element-plus/utils'
import FilterBar from './src/filter-bar.vue'
import FilterBarItem from './src/filter-bar-item.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElFilterBar: SFCWithInstall<typeof FilterBar> & {
  FilterBarItem: typeof FilterBarItem
} = withInstall(FilterBar, {
  FilterBarItem,
})

export const ElFilterBarItem: SFCWithInstall<typeof FilterBarItem> =
  withNoopInstall(FilterBarItem)

export default ElFilterBar

export * from './src/filter-bar'
export * from './src/filter-bar-item'
