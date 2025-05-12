import React from 'react'
import { TransactionTypes } from '@/types/transactions'

type Props = {}

const TransactionTypesSelectOptions = ({}: Props) => {
  const types = [
    { id: TransactionTypes.INCOME, name: 'Доходи' },
    { id: TransactionTypes.EXPENSE, name: 'Витрати' }
  ]

  return (
    <>
      {types?.map(t => (
        <option key={t.id} value={t.id}>
          {t.name}
        </option>
      ))}
    </>
  )
}

export default TransactionTypesSelectOptions
