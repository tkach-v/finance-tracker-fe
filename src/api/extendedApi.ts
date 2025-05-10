import { BaseApi } from '@/api/_base.api'
import { apiAuth } from '@/api/endpoints/apiAuth'
import { apiUsers } from '@/api/endpoints/apiUsers'
import { apiCategories } from '@/api/endpoints/apiCategories'
import { apiAccounts } from '@/api/endpoints/apiAccounts'
import { apiCurrencies } from '@/api/endpoints/apiCurrencies'

export const extendedApi = BaseApi.injectEndpoints(apiAuth)
  .injectEndpoints(apiUsers)
  .injectEndpoints(apiCategories)
  .injectEndpoints(apiAccounts)
  .injectEndpoints(apiCurrencies)

export const {
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetCurrentUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,

  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  useGetAccountsQuery,
  useCreateAccountMutation,
  useUpdateAccountMutation,
  useDeleteAccountMutation,

  useGetCurrenciesQuery
} = extendedApi
