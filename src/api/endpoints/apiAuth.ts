import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { AUTH } from '@/api'
import { AuthRequest, ForgotPasswordRequest, LoginResponse, ResetPasswordRequest } from '@/api/types/auth'
import { TagTypes } from '@/utils/rtk-tags'

export const apiAuth = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    login: builder.mutation<LoginResponse, AuthRequest>({
      query: (body) => ({
        url: AUTH.login(),
        method: 'POST',
        body
      }),
      invalidatesTags: [TagTypes.CURRENT_USER]
    }),
    register: builder.mutation({
      query: (body: AuthRequest) => ({
        url: AUTH.register(),
        method: 'POST',
        body
      }),
      invalidatesTags: [TagTypes.CURRENT_USER]
    }),
    forgotPassword: builder.mutation({
      query: (body: ForgotPasswordRequest) => ({
        url: AUTH.forgotPassword(),
        method: 'POST',
        body
      })
    }),
    resetPassword: builder.mutation({
      query: (body: ResetPasswordRequest) => ({
        url: AUTH.resetPassword(),
        method: 'POST',
        body
      })
    })
  })
}
