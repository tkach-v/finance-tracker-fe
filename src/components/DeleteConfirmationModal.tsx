'use client'

import { Modal, Stack } from '@mui/material'
import ModalContainer from '@components/modal/ModalContainer'
import Button from '@mui/material/Button'
import React from 'react'
import Typography from '@mui/material/Typography'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
}

const DeleteConfirmationModal = ({ open, onClose, onConfirm, title, message }: Props) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer close={onClose} title={title} sx={{ width: '100%', maxWidth: '420px' }}>
        <Typography variant='h6'>{message}</Typography>
        <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'24px'} width={'100%'}>
          <Button variant='outlined' type='button' fullWidth onClick={onClose}>
            Скасувати
          </Button>
          <Button variant='contained' color='error' type='button' fullWidth onClick={onConfirm}>
            Видалити
          </Button>
        </Stack>
      </ModalContainer>
    </Modal>
  )
}

export default DeleteConfirmationModal
