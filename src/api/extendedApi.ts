import { BaseApi } from '@/api/_base.api'
import { apiAuth } from '@/api/endpoints/apiAuth'
import { apiUsers } from '@/api/endpoints/apiUsers'

export const extendedApi = BaseApi.injectEndpoints(apiAuth).injectEndpoints(apiUsers)

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetCurrentUserQuery
} = extendedApi
