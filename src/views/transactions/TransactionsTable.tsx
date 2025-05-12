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
            <TableCell>Тип</TableCell>
            <TableCell>Сума</TableCell>
            <TableCell>Рахунок</TableCell>
            <TableCell>Категорія</TableCell>
            <TableCell>Опис</TableCell>
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
