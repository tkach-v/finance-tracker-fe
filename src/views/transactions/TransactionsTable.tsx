import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Transaction } from '@/types/transactions'
import tableStyles from '@core/styles/table.module.css'
import TransactionsTableRow from '@views/transactions/TransactionsTableRow'

type Props = {
  transactions: Transaction[]
}

const TransactionsTable = ({ transactions }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table' className={tableStyles.table}>
        <TableHead>
          <TableRow>
            <TableCell>Дата</TableCell>
            <TableCell>Сума</TableCell>
            <TableCell>Опис</TableCell>
            <TableCell>Рахунок</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map(transaction => (
            <TransactionsTableRow transaction={transaction} key={transaction.id} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
