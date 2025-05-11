'use client'

import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import { Account } from '@/types/accounts'
import AccountModal from '@views/accounts/AccountModal'
import { CategoryTypes } from '@/types/categories'
import { useGetCurrenciesQuery } from '@/api/extendedApi'
import Chip from '@mui/material/Chip'

type Props = {
  account: Account
}

const AccountItem = ({ account }: Props) => {
  const theme = useTheme()
  const contrastText = theme.palette.getContrastText(account.color)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClose = () => setIsModalOpen(false)

  const { data: currencies } = useGetCurrenciesQuery({})
  const currency = currencies?.find(currency => currency.id === account.currency) || {
    symbol: 'N/A',
    name: account.currency
  }

  return (
    <>
      <AccountModal open={isModalOpen} onClose={onClose} account={account} />
      <Card
        sx={{
          height: '100%',
          backgroundColor: account.color,
          cursor: 'pointer'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent sx={{ height: '100%' }}>
          <Typography variant='h5' sx={{ color: contrastText, mb: 2 }}>
            {account.name}
          </Typography>
          <Typography sx={{ color: contrastText }}>
            <b>Валюта: </b>
            {currency.symbol} ({currency.name})
          </Typography>
          <Typography sx={{ color: contrastText }}>
            <b>Баланс: </b>
            {account.balance}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountItem
