import React, { useState } from 'react'
import { TableCell, TableRow } from '@mui/material'
import { Transaction } from '@/types/transactions'
import { formatDateToUk } from '@/utils/time'
import TransactionModal from '@views/transactions/TransactionModal'

type Props = {
  transaction: Transaction
}

const TransactionsTableRow = ({ transaction }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

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
          {formatDateToUk(transaction.created_at)}
        </TableCell>
        <TableCell>{transaction.amount}</TableCell>
        <TableCell>{transaction.description}</TableCell>
        <TableCell>{transaction.account}</TableCell>
      </TableRow>
    </>
  )
}

export default TransactionsTableRow
