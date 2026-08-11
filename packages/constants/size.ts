export const componentSizes = [
  '',
  'default',
  'small',
  'medium',
  'large',
] as const

export type ComponentSize = (typeof componentSizes)[number]

export const componentSizeMap = {
  large: 40,
  medium: 36,
  default: 32,
  small: 28,
} as const
