'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import Typography from '@mui/material/Typography'
import { useGetTotalBalanceQuery } from '@/api/extendedApi'

const TotalBalance = () => {
  const { data } = useGetTotalBalanceQuery()

  return (
    <Card>
      <CardHeader title='Загальний баланс' />
      <CardContent className='flex flex-col gap-11 md:mbs-2.5'>
        <div>
          <div className='flex items-center'>
            <Typography variant='h3'>${(data?.total_usd || 0).toFixed(2)}</Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalBalance
