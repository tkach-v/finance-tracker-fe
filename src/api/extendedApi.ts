import { BaseApi } from '@/api/_base.api'
import { apiAuth } from '@/api/endpoints/apiAuth'
import { apiUsers } from '@/api/endpoints/apiUsers'
import { apiCategories } from '@/api/endpoints/apiCategories'

export const extendedApi = BaseApi.injectEndpoints(apiAuth).injectEndpoints(apiUsers).injectEndpoints(apiCategories)

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
  useDeleteCategoryMutation
} = extendedApi
