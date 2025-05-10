'use client'

import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import { Account } from '@/types/accounts'
import AccountModal from '@views/accounts/AccountModal'

type Props = {
  account: Account
}

const AccountItem = ({ account }: Props) => {
  const theme = useTheme()
  const contrastText = theme.palette.getContrastText(account.color)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClose = () => setIsModalOpen(false)

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
          <Typography variant='h5' sx={{ color: contrastText }}>
            {account.name}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountItem
