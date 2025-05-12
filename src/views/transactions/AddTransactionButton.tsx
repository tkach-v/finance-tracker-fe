import React, { useState } from 'react'
import AddButton from '@components/AddButton'
import TransactionModal from '@views/transactions/TransactionModal'

type Props = {}

const AddTransactionButton = ({}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <TransactionModal open={isModalOpen} onClose={onClose} />
      <AddButton onClick={() => setIsModalOpen(true)} />
    </>
  )
}

export default AddTransactionButton
