import React from 'react'
import { useGetCategoriesQuery } from '@/api/extendedApi'
import { TransactionTypes } from '@/types/transactions'
import { CategoryTypes } from '@/types/categories'

type Props = {
  type: TransactionTypes
}

const CategoriesSelectOptions = ({ type }: Props) => {
  const { data } = useGetCategoriesQuery({})

  const categoryType = type === TransactionTypes.EXPENSE ? CategoryTypes.EXPENSE : CategoryTypes.INCOME
  const categories = data?.filter(c => c.type === categoryType)

  return (
    <>
      <option key={''} value={''}></option> {/* Empty option for default selection */}
      {categories?.map(c => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </>
  )
}

export default CategoriesSelectOptions
