import { TransactionTypes } from '@/types/transactions'
import { PaginationRequestParams } from '@/api/types/pagination'

export type CreateTransactionRequest = {
  account: string
  amount: string
  description: string
  date: string | Date
  category: string
  type: TransactionTypes
}

export type GetTransactionsRequestParams = PaginationRequestParams & {
  account?: number | string
  category?: number | string
  date?: string
  type?: TransactionTypes
}
