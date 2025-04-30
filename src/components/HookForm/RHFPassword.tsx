'use client'

import { useState } from 'react'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { RHFTextField } from '@components/HookForm'
import { TextFieldProps } from '@mui/material'

type IProps = {
  name: string
}

type Props = IProps & TextFieldProps

const RHFPassword = ({ name, ...props }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(false)
  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

  return (
    <RHFTextField
      name={name}
      type={isPasswordShown ? 'text' : 'password'}
      InputProps={{
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton size='small' edge='end' onClick={handleClickShowPassword} onMouseDown={e => e.preventDefault()}>
              <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
            </IconButton>
          </InputAdornment>
        )
      }}
      placeholder={'password'}
      variant='outlined'
      label='Пароль'
      fullWidth
      {...props}
    />
  )
}

export default RHFPassword
