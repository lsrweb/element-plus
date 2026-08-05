import { withInstall, withNoopInstall } from '@element-plus/utils'
import Query from './src/query.vue'
import QueryItem from './src/query-item.vue'

import type { SFCWithInstall } from '@element-plus/utils'

export const ElQuery: SFCWithInstall<typeof Query> & {
  QueryItem: typeof QueryItem
} = withInstall(Query, {
  QueryItem,
})

export const ElQueryItem: SFCWithInstall<typeof QueryItem> =
  withNoopInstall(QueryItem)

export default ElQuery

export * from './src/query'
export * from './src/query-item'
