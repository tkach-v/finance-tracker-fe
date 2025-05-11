import React, { useState } from 'react'
import { Category } from '@/types/categories'
import Button from '@mui/material/Button'
import DeleteConfirmationModal from '@components/DeleteConfirmationModal'
import { useActions } from '@/hooks/useActions'
import { useDeleteCategoryMutation } from '@/api/extendedApi'

type Props = {
  category: Category
  onDelete: () => void
}

const DeleteCategoryButton = ({ category, onDelete }: Props) => {
  const { showSnackBar } = useActions()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const onClose = () => setIsModalOpen(false)

  const [deleteCategory] = useDeleteCategoryMutation()

  const handleDelete = async () => {
    try {
      await deleteCategory(category.id).unwrap()
      onDelete()
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося видалити категорію. Спробуйте ще раз пізніше.',
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
        title={'Видалити категорію?'}
        message={'Дані пов’язані з цією категорією будуть втрачені. Цю дію не можна скасувати.'}
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

export default DeleteCategoryButton
