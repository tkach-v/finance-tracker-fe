import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { CURRENCIES } from '@/api'
import { Category } from '@/types/categories'

export const apiCurrencies = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCurrencies: builder.query<Category[], object>({
      query: () => CURRENCIES.all(),
      providesTags: () => [{ type: TagTypes.CURRENCIES }]
    })
  })
}
