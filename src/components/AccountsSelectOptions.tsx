import React from 'react'
import { useGetAccountsQuery } from '@/api/extendedApi'

type Props = {}

const AccountsSelectOptions = ({}: Props) => {
  const { data: accounts } = useGetAccountsQuery({})

  return (
    <>
      <option key={0} value={0}></option> {/* Empty option for default selection */}
      {accounts?.map(a => (
        <option key={a.id} value={a.id}>
          {a.name}
        </option>
      ))}
    </>
  )
}

export default AccountsSelectOptions
