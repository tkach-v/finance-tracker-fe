import { useGetAccountsQuery, useGetCurrenciesQuery } from '@/api/extendedApi'

type Props = {
  accountId: string
}

export const useAccountCurrency = ({ accountId }: Props) => {
  const { data: accounts } = useGetAccountsQuery({})
  const { data: currencies } = useGetCurrenciesQuery({})

  const currencyId = accounts?.find(account => account.id === Number(accountId))?.currency
  const currency = currencies?.find(c => c.id === currencyId)

  if (!currency) return ''
  return `${currency?.symbol} (${currency?.name})`
}
