import { componentSizes } from '@element-plus/constants'
import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type { ComponentSize } from '@element-plus/constants'
import type FilterBar from './filter-bar.vue'

export interface FilterBarProps {
  expanded?: boolean
  size?: ComponentSize
  labelWidth?: string | number
  itemWidth?: string | number
  gap?: string | number
  loading?: boolean
  showSearch?: boolean
  showReset?: boolean
  collapsible?: boolean
  searchText?: string
  resetText?: string
  expandText?: string
  collapseText?: string
  ariaLabel?: string
}

export const filterBarProps = buildProps({
  expanded: Boolean,
  size: {
    type: String,
    values: componentSizes,
    default: 'default',
  },
  labelWidth: {
    type: [String, Number],
    default: 88,
  },
  itemWidth: {
    type: [String, Number],
    default: 260,
  },
  gap: {
    type: [String, Number],
    default: 8,
  },
  loading: Boolean,
  showSearch: {
    type: Boolean,
    default: true,
  },
  showReset: {
    type: Boolean,
    default: false,
  },
  collapsible: {
    type: Boolean,
    default: false,
  },
  searchText: {
    type: String,
    default: 'Search',
  },
  resetText: {
    type: String,
    default: 'Reset',
  },
  expandText: {
    type: String,
    default: 'More',
  },
  collapseText: {
    type: String,
    default: 'Less',
  },
  ariaLabel: {
    type: String,
    default: 'Filter conditions',
  },
} as const)

export const filterBarEmits = {
  search: () => true,
  reset: () => true,
  'update:expanded': (expanded: boolean) => typeof expanded === 'boolean',
}

export type FilterBarPropsPublic = ExtractPublicPropTypes<typeof filterBarProps>
export type FilterBarEmits = typeof filterBarEmits
export type FilterBarInstance = InstanceType<typeof FilterBar> & unknown
