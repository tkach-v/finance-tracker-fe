import React, { useState } from 'react'
import AddButton from '@components/AddButton'
import AccountModal from '@views/accounts/AccountModal'

type Props = {}

const AddAccountButton = ({}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClose = () => setIsModalOpen(false)

  return (
    <>
      <AccountModal open={isModalOpen} onClose={onClose} />
      <AddButton onClick={() => setIsModalOpen(true)} />
    </>
  )
}

export default AddAccountButton
