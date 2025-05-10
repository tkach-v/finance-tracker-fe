import React, { useState } from 'react'
import { CategoryTypes } from '@/types/categories'
import AddButton from '@components/AddButton'
import CategoryModal from '@views/categories/CategoryModal'

type Props = {
  type: CategoryTypes
}

const AddCategoryButton = ({ type }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <CategoryModal open={isModalOpen} onClose={onClose} type={type} />
      <AddButton onClick={() => setIsModalOpen(true)} />
    </>
  )
}

export default AddCategoryButton
