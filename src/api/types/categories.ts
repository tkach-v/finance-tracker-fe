import { CategoryTypes } from '@/types/categories'

export type CreateCategoryRequest = {
  name: string
  type: CategoryTypes
  color: string
  budget_limit: string | null
}
