'use client'

import { useGetAccountsQuery, useGetCategoriesQuery } from '@/api/extendedApi'
import { TransactionTypes } from '@/types/transactions'
import { FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material'

type Props = {
  accountFilter: number | ''
  setAccountFilter: (accountFilter: number | '') => void
  categoryFilter: number | ''
  setCategoryFilter: (categoryFilter: number | '') => void
  typeFilter: TransactionTypes | ''
  setTypeFilter: (typeFilter: TransactionTypes | '') => void
  setCurrentPage: (page: number) => void
}

const TransactionsFilters = ({
  accountFilter,
  setAccountFilter,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  setCurrentPage
}: Props) => {
  const { data: accounts } = useGetAccountsQuery({})
  const { data: categories } = useGetCategoriesQuery({})
  const types = [
    { id: 'income', name: 'Доходи' },
    { id: 'expense', name: 'Витрати' }
  ]

  if (!accounts || !categories) return null

  return (
    <Stack direction='row' gap={2} mb={3} alignItems='center' flexWrap={'wrap'}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id='filter-category-label'>Тип транзакції</InputLabel>
        <Select
          labelId='filter-category-label'
          value={typeFilter}
          label='Тип транзакції'
          onChange={e => {
            setTypeFilter(e.target.value as TransactionTypes | '')
            setCurrentPage(1)
          }}
        >
          <MenuItem value=''>
            <em>Усі</em>
          </MenuItem>
          {types.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 160 }}>
        <InputLabel id='filter-account-label'>Рахунок</InputLabel>
        <Select
          labelId='filter-account-label'
          value={accountFilter}
          label='Рахунок'
          onChange={e => {
            setAccountFilter(e.target.value as number | '')
            setCurrentPage(1)
          }}
        >
          <MenuItem value=''>
            <em>Усі</em>
          </MenuItem>
          {accounts.map(a => (
            <MenuItem key={a.id} value={a.id}>
              {a.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 180 }}>
        <InputLabel id='filter-category-label'>Категорія</InputLabel>
        <Select
          labelId='filter-category-label'
          value={categoryFilter}
          label='Категорія'
          onChange={e => {
            setCategoryFilter(e.target.value as number | '')
            setCurrentPage(1)
          }}
        >
          <MenuItem value=''>
            <em>Усі</em>
          </MenuItem>
          {categories.map(c => (
            <MenuItem key={c.id} value={c.id}>
              {c.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default TransactionsFilters
