import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { TagTypes } from '@/utils/rtk-tags'

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  prepareHeaders: headers => {
    return headers
  }
})

export const BaseApi = createApi({
  baseQuery: baseQuery,
  endpoints: builder => ({}),
  tagTypes: Object.values(TagTypes)
})
