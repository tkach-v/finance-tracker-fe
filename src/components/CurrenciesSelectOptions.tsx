import React from 'react'
import { useGetCurrenciesQuery } from '@/api/extendedApi'

type Props = {}

const CurrenciesSelectOptions = ({}: Props) => {
  const { data: currencies } = useGetCurrenciesQuery({})

  return (
    <>
      {currencies?.map(c => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </>
  )
}

export default CurrenciesSelectOptions
