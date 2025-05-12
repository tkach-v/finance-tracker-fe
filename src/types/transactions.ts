export enum TransactionTypes {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type Transaction = {
  id: number
  account: number
  category: number
  amount: number
  description: string
  created_at: string
  date: string
  type: TransactionTypes
}
