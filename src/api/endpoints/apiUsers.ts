import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { USERS } from '@/api'
import { User } from '@/types/users'
import { DeleteUserRequest, UpdateUserRequest } from '@/api/types/users'

export const apiUsers = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCurrentUser: builder.query<User, object>({
      query: () => USERS.current(),
      providesTags: () => [{ type: TagTypes.CURRENT_USER }]
    }),
    deleteUser: builder.mutation<void, DeleteUserRequest>({
      query: body => ({
        url: USERS.current(),
        method: 'DELETE',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.CURRENT_USER }]
    }),
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: body => ({
        url: USERS.current(),
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.CURRENT_USER }]
    })
  })
}
