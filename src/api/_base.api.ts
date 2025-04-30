import { TagTypes } from '@/utils/rtk-tags'
import { isClient } from '@/utils/platform'
import { localStorageService } from '@/utils/localStorage'
import { Mutex } from 'async-mutex'
import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { AUTH } from '@/api/index'
import { TokenRefreshResponse } from '@/api/types/auth'
import { logoutAction } from '@/utils/auth'

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  prepareHeaders: headers => {
    if (isClient()) {
      const tokenFromLocalStorage = localStorageService.getAccessToken()

      if (tokenFromLocalStorage) {
        headers.set('Authorization', `JWT ${tokenFromLocalStorage}`)
      }
    }

    return headers
  }
})

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()

      try {
        const refreshToken = localStorageService.getRefreshToken()
        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: AUTH.refreshToken(),
              method: 'POST',
              body: { refresh: refreshToken }
            },
            api,
            extraOptions
          )

          if (refreshResult.data) {
            const { access } = refreshResult.data as TokenRefreshResponse

            localStorageService.setAccessToken(access)
            result = await baseQuery(args, api, extraOptions)
          } else {
            api.dispatch(logoutAction())
          }
        }
      } finally {
        release()
      }
    } else {
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }

  return result
}

export const BaseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
  tagTypes: Object.values(TagTypes)
})
