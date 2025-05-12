'use client'

import React, { useState } from 'react'
import Grid from '@mui/material/Grid'
import { useGetTransactionsQuery } from '@/api/extendedApi'
import { PAGINATION_LIMIT } from '@/utils/constants'
import TransactionsTable from '@views/transactions/TransactionsTable'
import Pagination from '@mui/material/Pagination'
import { Divider, Stack, Typography } from '@mui/material'
import AddTransactionButton from '@views/transactions/AddTransactionButton'
import { TransactionTypes } from '@/types/transactions'
import TransactionsFilters from '@views/transactions/TransactionsFilters'

const Transactions = () => {
  const [currentPage, setCurrentPage] = useState(1)

  const [accountFilter, setAccountFilter] = useState<number | ''>('')
  const [categoryFilter, setCategoryFilter] = useState<number | ''>('')
  const [typeFilter, setTypeFilter] = useState<TransactionTypes | ''>('')

  const { data } = useGetTransactionsQuery({
    page: currentPage,
    account: accountFilter || undefined,
    category: categoryFilter || undefined,
    type: typeFilter || undefined
  })

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== currentPage) {
      setCurrentPage(value)
    }
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Stack direction='row' justifyContent='space-between' alignItems='center' gap={2}>
          <Typography variant={'h4'}>Транзакції ({data?.count || 0})</Typography>
          <AddTransactionButton />
        </Stack>
        <Divider sx={{ my: 3 }} />
        <TransactionsFilters
          accountFilter={accountFilter}
          setAccountFilter={setAccountFilter}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          setCurrentPage={setCurrentPage}
        />
        {data?.count ? (
          <>
            <TransactionsTable transactions={data.results} />
            <Stack alignItems={'center'} mt={3}>
              <Pagination
                sx={{}}
                count={Math.ceil(data.count / PAGINATION_LIMIT)}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Stack>
          </>
        ) : (
          <Typography>
            Не знайдено жодної транзакцію. Додайте нову транзакції, натиснувши на кнопку &#34;Додати&#34;.
          </Typography>
        )}
      </Grid>
    </Grid>
  )
}

export default Transactions
