import React from 'react'
import { TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material'
import { Transaction } from '@/types/transactions'
import tableStyles from '@core/styles/table.module.css'
import { formatDateToUk } from '@/utils/time'

type Data = {
  name: string
  code: string
  population: number
  size: number
  density: number
}

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein }
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]

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
          {transactions.map(row => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component='th' scope='row'>{formatDateToUk(row.created_at)}</TableCell>
              <TableCell>{row.amount}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.account}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionsTable
