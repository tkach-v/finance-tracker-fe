import { useGetAccountsQuery } from '@/api/extendedApi'

type Props = {
  accountId: string | number
}

export const useAccount = ({ accountId }: Props) => {
  const { data: accounts } = useGetAccountsQuery({})

  const account = accounts?.find(account => account.id === Number(accountId))

  if (!account) return ''
  return account.name
}
