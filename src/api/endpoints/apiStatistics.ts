import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { STATS } from '@/api'
import { TotalBalanceResponse, TransactionStatsQuery, TransactionStatsResponse } from '@/api/types/statistics'
import { buildQueryWithParams } from '@/api/utils/rtk-utils'

export const apiStatistics = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getTransactionStats: builder.query<TransactionStatsResponse, TransactionStatsQuery>({
      query: params => buildQueryWithParams(STATS.transactions(), params),
      providesTags: () => [{ type: TagTypes.ACCOUNTS }]
    }),
    getTotalBalance: builder.query<TotalBalanceResponse, void>({
      query: () => STATS.totalBalance(),
      providesTags: () => [{ type: TagTypes.ACCOUNTS }]
    })
  })
}
