import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { TRANSACTIONS } from '@/api'
import { Transaction } from '@/types/transactions'
import { CreateTransactionRequest } from '@/api/types/transactions'
import { PaginationRequestParams, PaginationResponse } from '@/api/types/pagination'
import { buildQueryWithParams } from '@/api/utils/rtk-utils'

export const apiTransactions = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getTransactions: builder.query<PaginationResponse<Transaction>, PaginationRequestParams>({
      query: params => buildQueryWithParams(TRANSACTIONS.all(), params),
      providesTags: () => [{ type: TagTypes.TRANSACTIONS }]
    }),
    createTransaction: builder.mutation<Transaction, CreateTransactionRequest>({
      query: body => ({
        url: TRANSACTIONS.all(),
        method: 'POST',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }]
    }),
    updateTransaction: builder.mutation<Transaction, { id: number; body: Partial<CreateTransactionRequest> }>({
      query: ({ id, body }) => ({
        url: TRANSACTIONS.byId(id),
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }]
    }),
    deleteTransaction: builder.mutation<void, number>({
      query: id => ({
        url: TRANSACTIONS.byId(id),
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: TagTypes.TRANSACTIONS }]
    })
  })
}
