import React, { useState } from 'react'
import Button from '@mui/material/Button'
import DeleteConfirmationModal from '@components/DeleteConfirmationModal'
import { useActions } from '@/hooks/useActions'
import { useDeleteTransactionMutation } from '@/api/extendedApi'
import { Transaction } from '@/types/transactions'

type Props = {
  transaction: Transaction
  onDelete: () => void
}

const DeleteTransactionButton = ({ transaction, onDelete }: Props) => {
  const { showSnackBar } = useActions()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClose = () => setIsModalOpen(false)

  const [deleteTransaction] = useDeleteTransactionMutation()

  const handleDelete = async () => {
    try {
      await deleteTransaction(transaction.id).unwrap()
      onDelete()
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося видалити транзакцію. Спробуйте ще раз пізніше.',
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
        title={'Видалити транзакцію?'}
        message={'Дані пов’язані з цією транзакцією будуть втрачені. Цю дію не можна скасувати.'}
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

export default DeleteTransactionButton
