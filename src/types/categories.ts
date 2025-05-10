export enum CategoryTypes {
  INCOME = 'income',
  EXPENSE = 'expense'
}

export type Category = {
  id: number
  name: string
  type: CategoryTypes
  color: string
  budget_limit: number | null
}
