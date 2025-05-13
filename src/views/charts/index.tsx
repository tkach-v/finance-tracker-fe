'use client'

import Grid from '@mui/material/Grid'
import TransactionStatsChart from '@views/charts/TransactionStatsChart'
import { useGetAccountsQuery, useGetTransactionStatsQuery } from '@/api/extendedApi'
import React, { useState } from 'react'
import { TransactionStatsFreq } from '@/api/types/statistics'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import OutlinedInput from '@mui/material/OutlinedInput'

const freqOptions: { value: TransactionStatsFreq; label: string }[] = [
  { value: TransactionStatsFreq.daily, label: 'Дні' },
  { value: TransactionStatsFreq.weekly, label: 'Тижні' },
  { value: TransactionStatsFreq.monthly, label: 'Місяці' },
  { value: TransactionStatsFreq.yearly, label: 'Роки' }
]

const Charts = () => {
  const [freq, setFreq] = useState<TransactionStatsFreq>(TransactionStatsFreq.monthly)
  const [accountIds, setAccountIds] = useState<number[]>([])

  const handleFreqChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setFreq(event.target.value as TransactionStatsFreq)
  }

  const handleAccountsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as number[]
    setAccountIds(value)
  }

  const { data: accounts } = useGetAccountsQuery({})

  const { data } = useGetTransactionStatsQuery({
    freq,
    account_ids: accountIds || undefined
  })

  if (!data || !accounts) {
    return null
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 160 }} size='small'>
              <InputLabel id='freq-select-label'>Групування</InputLabel>
              <Select labelId='freq-select-label' value={freq} label='Групування' onChange={handleFreqChange}>
                {freqOptions.map(({ value, label }) => (
                  <MenuItem key={value} value={value}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 240 }} size='small'>
              <InputLabel id='account-select-label'>Рахунки</InputLabel>
              <Select
                labelId='account-select-label'
                multiple
                value={accountIds}
                onChange={handleAccountsChange}
                input={<OutlinedInput label='Рахунки' />}
                renderValue={selected => (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                    {(selected as number[]).map(id => {
                      const acc = accounts.find(a => a.id === id)
                      return acc ? <Chip key={id} label={acc.name} size='small' /> : null
                    })}
                  </div>
                )}
              >
                {accounts.map(acc => (
                  <MenuItem key={acc.id} value={acc.id}>
                    {acc.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <TransactionStatsChart transactionStatsInfo={data} />
      </Grid>
    </Grid>
  )
}

export default Charts
