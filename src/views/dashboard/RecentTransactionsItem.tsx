'use client'

import Typography from '@mui/material/Typography'
import { Transaction, TransactionTypes } from '@/types/transactions'
import { useAccountCurrency } from '@/hooks/useAccountCurrency'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'

type Props = {
  transaction: Transaction
}

const RecentTransactionsItem = ({ transaction }: Props) => {
  const currencyText = useAccountCurrency({ accountId: transaction.account, short: true })
  const accountText = useAccount({ accountId: transaction.account })
  const categoryText = useCategory({ categoryId: transaction.category })

  return (
    <div className='flex items-center gap-4'>
      <div className='flex justify-between items-center is-full flex-wrap gap-x-4 gap-y-2'>
        <div className='flex flex-col gap-0.5'>
          <Typography color='text.primary' className='font-medium'>
            {categoryText}
          </Typography>
          <Typography>{accountText}</Typography>
        </div>
        <Typography
          color={transaction.type === TransactionTypes.INCOME ? 'success.main' : 'error.main'}
          className='font-medium'
        >
          {transaction.type === TransactionTypes.INCOME ? '+' : '-'}
          {transaction.amount} {currencyText}
        </Typography>
      </div>
    </div>
  )
}

export default RecentTransactionsItem
