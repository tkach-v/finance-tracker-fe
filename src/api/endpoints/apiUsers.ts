import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { USERS } from '@/api'
import { User } from '@/types/users'

export const apiUsers = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCurrentUser: builder.query<User, object>({
      query: () => USERS.current(),
      providesTags: () => [{ type: TagTypes.CURRENT_USER }]
    })
  })
}
