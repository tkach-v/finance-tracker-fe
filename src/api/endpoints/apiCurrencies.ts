import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { CURRENCIES } from '@/api'
import { Currency } from '@/types/currencies'

export const apiCurrencies = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCurrencies: builder.query<Currency[], object>({
      query: () => CURRENCIES.all(),
      providesTags: () => [{ type: TagTypes.CURRENCIES }]
    })
  })
}
