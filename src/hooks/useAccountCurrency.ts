import { useGetAccountsQuery, useGetCurrenciesQuery } from '@/api/extendedApi'

type Props = {
  accountId: string | number
  short?: boolean
}

export const useAccountCurrency = ({ accountId, short = false }: Props) => {
  const { data: accounts } = useGetAccountsQuery({})
  const { data: currencies } = useGetCurrenciesQuery({})

  const currencyId = accounts?.find(account => account.id === Number(accountId))?.currency
  const currency = currencies?.find(c => c.id === currencyId)

  if (!currency) return ''
  if (short) return currency?.symbol
  return `${currency?.symbol} (${currency?.name})`
}
