import React from 'react'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import { useCreateAccountMutation, useDeleteAccountMutation, useUpdateAccountMutation } from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateCategoryRequest } from '@/api/types/categories'
import Typography from '@mui/material/Typography'
import ColorPicker from '@components/ColorPicker'
import Button from '@mui/material/Button'
import { Account } from '@/types/accounts'
import { CreateAccountRequest } from '@/api/types/accounts'

type Props = {
  open: boolean
  onClose: () => void
  account?: Account
}

const schema = yup.object({
  name: yup.string().required('Введіть назву рахунку'),
  color: yup.string().required('Виберіть колір рахунку')
})

const AccountModal = ({ open, onClose, account }: Props) => {
  const { showSnackBar } = useActions()

  const defaultValues = {
    name: account?.name || '',
    color: account?.color || '#CCCCCC'
  }

  const methods = useForm<CreateAccountRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = methods

  const [createAccount] = useCreateAccountMutation()
  const [updateAccount] = useUpdateAccountMutation()
  const [deleteAccount] = useDeleteAccountMutation()

  const closeModal = () => {
    reset(defaultValues)
    onClose()
  }

  const onSubmit = async (data: CreateCategoryRequest) => {
    try {
      if (account) {
        await updateAccount({ id: account.id, body: data }).unwrap()
      } else {
        await createAccount(data).unwrap()
      }
      closeModal()
    } catch (error: any) {
      if (error.data && error.data.non_field_errors) {
        showSnackBar({
          message: 'Рахунок із такою назвою вже існує. Введіть іншу назву та спробуйте ще раз.',
          type: 'error'
        })
      } else {
        showSnackBar({
          message: 'Не вдалося створити рахунок. Спробуйте ще раз пізніше.',
          type: 'error'
        })
      }
    }
  }

  const onDelete = async () => {
    try {
      if (account) {
        await deleteAccount(account.id).unwrap()
        closeModal()
      }
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося видалити рахунок. Спробуйте ще раз пізніше.',
        type: 'error'
      })
    }
  }

  return (
    <Modal open={open} onClose={closeModal}>
      <ModalContainer
        close={closeModal}
        title={`${account ? 'Оновити' : 'Додати'} рахунок`}
        sx={{ width: '100%', maxWidth: '500px' }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5 w-full'}>
          <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
            <Typography>Колір рахунку:</Typography>
            <Controller
              name='color'
              control={control}
              render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />}
            />
          </Stack>
          <RHFTextField name='name' label='Назва' fullWidth error={!!errors.name} helperText={errors.name?.message} />
          <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'24px'}>
            {account && (
              <Button
                variant='contained'
                color={'error'}
                fullWidth
                type='button'
                sx={{ py: '12px' }}
                onClick={onDelete}
              >
                Видалити
              </Button>
            )}
            <Button variant='contained' type='submit' fullWidth sx={{ py: '12px' }}>
              {account ? 'Зберегти' : 'Додати'}
            </Button>
          </Stack>
        </FormProvider>
      </ModalContainer>
    </Modal>
  )
}

export default AccountModal
