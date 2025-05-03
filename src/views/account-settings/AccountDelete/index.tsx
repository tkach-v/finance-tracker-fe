'use client'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useState } from 'react'
import AccountDeleteModal from '@views/account-settings/AccountDelete/AccountDeleteModal'
import Typography from '@mui/material/Typography'

const AccountDelete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleModalClose = () => {
    setIsModalOpen(false)
  }

  const onButtonClick = async () => {
    setIsModalOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader title='Видалити обліковий запис' />
        <CardContent className='flex flex-col items-start gap-6'>
          <Typography fontSize={'1rem'}>
            Цю дію не можна скасувати. Після видалення вашого облікового запису ви не зможете відновити його та втратите
            всі пов&#39;язані з обліковим записом дані.
          </Typography>
          <Button variant='contained' color='error' type='button' onClick={onButtonClick}>
            Видалити
          </Button>
        </CardContent>
      </Card>
      <AccountDeleteModal open={isModalOpen} onClose={handleModalClose} />
    </>
  )
}

export default AccountDelete
