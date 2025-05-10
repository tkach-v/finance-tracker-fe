import type { EndpointBuilder } from '@reduxjs/toolkit/query'

import { TagTypes } from '@/utils/rtk-tags'
import { CATEGORIES } from '@/api'
import { Category } from '@/types/categories'
import { CreateCategoryRequest } from '@/api/types/categories'

export const apiCategories = {
  endpoints: (builder: EndpointBuilder<any, any, any>) => ({
    getCategories: builder.query<Category[], object>({
      query: () => CATEGORIES.all(),
      providesTags: () => [{ type: TagTypes.CATEGORIES }]
    }),
    createCategory: builder.mutation<Category, CreateCategoryRequest>({
      query: body => ({
        url: CATEGORIES.all(),
        method: 'POST',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.CATEGORIES }]
    }),
    updateCategory: builder.mutation<Category, { id: number; body: Partial<CreateCategoryRequest> }>({
      query: ({ id, body }) => ({
        url: CATEGORIES.byId(id),
        method: 'PATCH',
        body
      }),
      invalidatesTags: () => [{ type: TagTypes.CATEGORIES }]
    }),
    deleteCategory: builder.mutation<void, number>({
      query: id => ({
        url: CATEGORIES.byId(id),
        method: 'DELETE'
      }),
      invalidatesTags: () => [{ type: TagTypes.CATEGORIES }]
    })
  })
}
