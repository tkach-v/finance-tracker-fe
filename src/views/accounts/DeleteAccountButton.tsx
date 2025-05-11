import React, { useState } from 'react'
import Button from '@mui/material/Button'
import DeleteConfirmationModal from '@components/DeleteConfirmationModal'
import { useActions } from '@/hooks/useActions'
import { useDeleteAccountMutation } from '@/api/extendedApi'
import { Account } from '@/types/accounts'

type Props = {
  account: Account
  onDelete: () => void
}

const DeleteAccountButton = ({ account, onDelete }: Props) => {
  const { showSnackBar } = useActions()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClose = () => setIsModalOpen(false)

  const [deleteAccount] = useDeleteAccountMutation()

  const handleDelete = async () => {
    try {
      await deleteAccount(account.id).unwrap()
      onDelete()
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося видалити рахунок. Спробуйте ще раз пізніше.',
        type: 'error'
      })
    }
  }

  return (
    <>
      <DeleteConfirmationModal
        open={isModalOpen}
        onClose={onClose}
        onConfirm={handleDelete}
        title={'Видалити рахунок?'}
        message={'Дані пов’язані з цим рахунком будуть втрачені. Цю дію не можна скасувати.'}
      />
      <Button
        variant='contained'
        color={'error'}
        fullWidth
        type='button'
        sx={{ py: '12px' }}
        onClick={() => setIsModalOpen(true)}
      >
        Видалити
      </Button>
    </>
  )
}

export default DeleteAccountButton
