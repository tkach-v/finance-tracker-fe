import { TransactionTypes } from '@/types/transactions'

export type CreateTransactionRequest = {
  account: string
  amount: string
  description: string
  date: string | Date
  category: string
  type: TransactionTypes
}
