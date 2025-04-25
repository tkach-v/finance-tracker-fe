import { BaseApi } from '@/api/_base.api'
import { apiAuth } from '@/api/endpoints/apiAuth'
import { apiUsers } from '@/api/endpoints/apiUsers'

const extendedApi = BaseApi.injectEndpoints(apiAuth).injectEndpoints(apiUsers)

export const {
  useLoginMutation,

  useGetCurrentUserQuery
} = extendedApi
