export enum TransactionStatsFreq {
  daily = 'daily',
  weekly = 'weekly',
  monthly = 'monthly',
  yearly = 'yearly'
}


export type TransactionStatsQuery = {
  account_ids?: number[];
  freq?: TransactionStatsFreq;
}


export type TransactionStatsResponseItem = {
  period: string;
  income: number;
  expense: number;
}

export type TransactionStatsResponse = TransactionStatsResponseItem[];
