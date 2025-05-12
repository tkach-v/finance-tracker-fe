import { useGetCategoriesQuery } from '@/api/extendedApi'

type Props = {
  categoryId: string | number
}

export const useCategory = ({ categoryId }: Props) => {
  const { data: categories } = useGetCategoriesQuery({})

  const category = categories?.find(category => category.id === Number(categoryId))

  if (!category) return ''
  return category.name
}
