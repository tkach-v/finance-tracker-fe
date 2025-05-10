import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'

type Props = ButtonProps & {}

const AddButton = (props: Props) => {
  return (
    <Button
      variant='contained'
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px'
      }}
      {...props}
    >
      Додати
      <i className='ri-add-line' style={{ fontSize: '20px' }} />
    </Button>
  )
}

export default AddButton
