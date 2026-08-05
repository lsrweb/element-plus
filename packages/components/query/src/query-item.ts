import { buildProps } from '@element-plus/utils'

import type { ExtractPublicPropTypes } from 'vue'
import type QueryItem from './query-item.vue'

export interface QueryItemProps {
  label?: string
  labelMode?: 'text' | 'control'
  labelAlign?: 'left' | 'center' | 'right'
  labelWidth?: string | number
  width?: string | number
  minWidth?: string | number
  appendWidth?: string | number
  grow?: boolean
  ariaLabel?: string
}

export const queryItemProps = buildProps({
  label: {
    type: String,
    default: '',
  },
  labelMode: {
    type: String,
    values: ['text', 'control'],
    default: 'text',
  },
  labelAlign: {
    type: String,
    values: ['left', 'center', 'right'],
    default: 'left',
  },
  labelWidth: {
    type: [String, Number],
  },
  width: {
    type: [String, Number],
  },
  minWidth: {
    type: [String, Number],
  },
  appendWidth: {
    type: [String, Number],
  },
  grow: Boolean,
  ariaLabel: String,
} as const)

export type QueryItemPropsPublic = ExtractPublicPropTypes<typeof queryItemProps>
export type QueryItemInstance = InstanceType<typeof QueryItem> & unknown
