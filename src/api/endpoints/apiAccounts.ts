import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { ACCOUNTS } from '@/api'
import { Account } from '@/types/accounts'
import { CreateAccountRequest } from '@/api/types/accounts'

export const apiAccounts = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getAccounts: builder.query<Account[], object>({
      query: () => ACCOUNTS.all(),
      providesTags: () => [{ type: TagTypes.ACCOUNTS }]
    }),
    createAccount: builder.mutation<Account, CreateAccountRequest>({
      query: body => ({
        url: ACCOUNTS.all(),
        method: 'POST',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.ACCOUNTS }]
    }),
    updateAccount: builder.mutation<Account, { id: number; body: Partial<CreateAccountRequest> }>({
      query: ({ id, body }) => ({
        url: ACCOUNTS.byId(id),
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.ACCOUNTS }]
    }),
    deleteAccount: builder.mutation<void, number>({
      query: id => ({
        url: ACCOUNTS.byId(id),
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: TagTypes.ACCOUNTS }]
    })
  })
}
