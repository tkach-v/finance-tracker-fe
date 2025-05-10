'use client'

import React from 'react'
import Grid from '@mui/material/Grid'
import { useGetAccountsQuery } from '@/api/extendedApi'
import AccountsList from '@views/accounts/AccountsList'

const Accounts = () => {
  const { data: accounts } = useGetAccountsQuery({})

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <AccountsList accounts={accounts} />
      </Grid>
    </Grid>
  )
}

export default Accounts
