'use client'

import React, { useState } from 'react'
import { Category } from '@/types/categories'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { useTheme } from '@mui/material'
import CategoryModal from '@views/categories/CategoryModal'
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
      <AccountModal open={isModalOpen} onClose={onClose} category={account} />
      <Card
        sx={{
          height: '100%',
          backgroundColor: category.color,
          cursor: 'pointer'
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Typography variant='h5' mb={3} sx={{ color: contrastText }}>
            {category.name}
          </Typography>
          <Typography sx={{ color: contrastText }}>
            <b>Ліміт бюджету:</b> {category.budget_limit !== null ? `$${category.budget_limit}` : 'не встановлено'}
          </Typography>
        </CardContent>
      </Card>
    </>
  )
}

export default AccountItem
