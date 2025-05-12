import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { TRANSACTIONS } from '@/api'
import { Transaction } from '@/types/transactions'
import { CreateTransactionRequest, GetTransactionsRequestParams } from '@/api/types/transactions'
import { PaginationResponse } from '@/api/types/pagination'
import { buildQueryWithParams } from '@/api/utils/rtk-utils'

export const apiTransactions = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getTransactions: builder.query<PaginationResponse<Transaction>, GetTransactionsRequestParams>({
      query: params => buildQueryWithParams(TRANSACTIONS.all(), params),
      providesTags: () => [{ type: TagTypes.TRANSACTIONS }]
    }),
    createTransaction: builder.mutation<Transaction, CreateTransactionRequest>({
      query: body => ({
        url: TRANSACTIONS.all(),
        method: 'POST',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }, { type: TagTypes.ACCOUNTS }]
    }),
    updateTransaction: builder.mutation<Transaction, { id: number; body: Partial<CreateTransactionRequest> }>({
      query: ({ id, body }) => ({
        url: TRANSACTIONS.byId(id),
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }, { type: TagTypes.ACCOUNTS }]
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: id => ({
        url: TRANSACTIONS.byId(id),
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }, { type: TagTypes.ACCOUNTS }]
    })
  })
}
