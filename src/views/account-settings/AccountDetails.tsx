'use client'

import { useEffect, useMemo } from 'react'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { UpdateUserRequest } from '@/api/types/users'
import { useCurrentUser } from '@/hooks/api/useCurrentUser'
import { FormProvider, RHFTextField } from '@components/HookForm'
import { useUpdateUserMutation } from '@/api/extendedApi'
import { useActions } from '@/hooks/useActions'
import { InputLabel, FormControl, Select, MenuItem } from '@mui/material'

const schema = yup.object({
  first_name: yup.string(),
  last_name: yup.string()
})

const AccountDetails = () => {
  const { showSnackBar } = useActions()

  const { user } = useCurrentUser()

  const defaultValues: UpdateUserRequest = useMemo(() => {
    return {
      first_name: user?.first_name,
      last_name: user?.last_name
    }
  }, [user])

  const methods = useForm<UpdateUserRequest>({
    resolver: yupResolver(schema),
    defaultValues
  })

  const {
    reset,
    handleSubmit,
    formState: { errors, isDirty }
  } = methods

  const [updateUser] = useUpdateUserMutation()

  const onSubmit = async (data: UpdateUserRequest) => {
    try {
      await updateUser(data).unwrap()

      showSnackBar({
        message: 'Дані успішно змінено.',
        type: 'success'
      })
    } catch (error: any) {
      showSnackBar({
        message: `Не вдалося змінити дані користувача. Спробуйте ще раз пізніше.'}`,
        type: 'error'
      })
    }
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues, reset])

  return (
    <Card>
      <CardContent>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={6}>
              <RHFTextField
                name='first_name'
                label="Ім'я"
                fullWidth
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField
                name='last_name'
                label='Прізвище'
                fullWidth
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Основна валюта</InputLabel>
                <Select
                  label='Основна валюта'
                  value={'USD'}
                  disabled
                >
                  <MenuItem value='USD'>
                    USD (Долар США)
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} className='flex gap-4 flex-wrap'>
              <Button variant='contained' type='submit' disabled={!isDirty}>
                Зберегти
              </Button>
              <Button variant='outlined' type='reset' color='secondary' onClick={() => reset(defaultValues)}>
                Скинути
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

export default AccountDetails
