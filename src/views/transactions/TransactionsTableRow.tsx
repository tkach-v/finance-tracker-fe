'use client'

import React, { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { Transaction, TransactionTypes } from '@/types/transactions'
import { formatDateToUk } from '@/utils/time'
import TransactionModal from '@views/transactions/TransactionModal'
import { useAccountCurrency } from '@/hooks/useAccountCurrency'
import { useAccount } from '@/hooks/useAccount'
import { useCategory } from '@/hooks/useCategory'
import Chip from '@mui/material/Chip'

type Props = {
  transaction: Transaction
}

const TransactionsTableRow = ({ transaction }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  const currencyText = useAccountCurrency({ accountId: transaction.account, short: true })
  const accountText = useAccount({ accountId: transaction.account })
  const categoryText = useCategory({ categoryId: transaction.category })
  const transactionTypeText = transaction.type === TransactionTypes.EXPENSE ? 'Витрати' : 'Прибуток'

  return (
    <>
      <TransactionModal open={isModalOpen} onClose={onClose} transaction={transaction} />
      <TableRow
        sx={{
          '&:last-child td, &:last-child th': { border: 0 },
          cursor: 'pointer'
        }}
        hover
        onClick={() => setIsModalOpen(true)}
      >
        <TableCell component='th' scope='row'>
          {formatDateToUk(transaction.date)}
        </TableCell>
        <TableCell>
          <Chip label={transactionTypeText} color={transaction.type === TransactionTypes.EXPENSE ? 'error' : 'success'} />
        </TableCell>
        <TableCell>
          {transaction.amount} {currencyText}
        </TableCell>
        <TableCell>
          <Chip label={accountText}/>
        </TableCell>
        <TableCell>
          <Chip label={categoryText}/>
        </TableCell>
        <TableCell>{transaction.description}</TableCell>
      </TableRow>
    </>
  )
}

export default TransactionsTableRow
