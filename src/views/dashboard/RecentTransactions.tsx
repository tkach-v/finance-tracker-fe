'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

import Link from '@components/Link'
import { useGetTransactionsQuery } from '@/api/extendedApi'
import { TransactionTypes } from '@/types/transactions'
import RecentTransactionsItem from '@views/dashboard/RecentTransactionsItem'

const RecentTransactions = () => {
  const { data: incomeTransactions } = useGetTransactionsQuery({
    page: 1,
    account: undefined,
    category: undefined,
    type: TransactionTypes.INCOME
  })
  const { data: expenseTransactions } = useGetTransactionsQuery({
    page: 1,
    account: undefined,
    category: undefined,
    type: TransactionTypes.EXPENSE
  })

  if (!incomeTransactions || !expenseTransactions) {
    return null
  }

  return (
    <Card>
      <Grid container>
        <Grid item xs={12} md={6} className='border-be md:border-be-0 md:border-ie'>
          <CardHeader
            title='Доходи'
            action={
              <Typography component={Link} className='font-medium' color='primary' href='/transactions'>
                Більше
              </Typography>
            }
          />
          <CardContent className='flex flex-col gap-5'>
            {incomeTransactions.results.map(item => (
              <RecentTransactionsItem key={item.id} transaction={item} />
            ))}
          </CardContent>
        </Grid>
        <Grid item xs={12} md={6}>
          <CardHeader
            title='Витрати'
            action={
              <Typography component={Link} className='font-medium' color='primary' href='/transactions'>
                Більше
              </Typography>
            }
          />
          <CardContent className='flex flex-col gap-5'>
            {expenseTransactions.results.map(item => (
              <RecentTransactionsItem key={item.id} transaction={item} />
            ))}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default RecentTransactions
