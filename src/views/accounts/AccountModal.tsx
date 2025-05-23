import React from 'react'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFSelect, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import { useCreateAccountMutation, useUpdateAccountMutation } from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Typography from '@mui/material/Typography'
import ColorPicker from '@components/ColorPicker'
import Button from '@mui/material/Button'
import { Account } from '@/types/accounts'
import { CreateAccountRequest } from '@/api/types/accounts'
import CurrenciesSelectOptions from '@components/CurrenciesSelectOptions'
import DeleteAccountButton from '@views/accounts/DeleteAccountButton'

type Props = {
  open: boolean
  onClose: () => void
  account?: Account
}

const schema = yup.object({
  name: yup.string().required('Введіть назву рахунку'),
  color: yup.string().required('Виберіть колір рахунку'),
  balance: yup
    .string()
    .required('Введіть баланс рахунку у вибраній валюті')
    .matches(/^\d{1,20}(?:\.\d{1,10})?$/, 'Баланс може містити до 20 цифр до коми та до 10 після коми'),
  currency: yup.string().required('Виберіть валюту для рахунку')
})

const AccountModal = ({ open, onClose, account }: Props) => {
  const { showSnackBar } = useActions()

  const defaultValues = {
    name: account?.name || '',
    color: account?.color || '#CCCCCC',
    balance: account?.balance.toString() || '0.00',
    currency: account?.currency || 'usd'
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

  const closeModal = () => {
    reset(defaultValues)
    onClose()
  }

  const onSubmit = async (data: CreateAccountRequest) => {
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
          <RHFTextField
            type='number'
            name='balance'
            label='Баланс'
            fullWidth
            error={!!errors.balance}
            helperText={errors.balance?.message}
          />
          <RHFSelect name='currency' label='Валюта' fullWidth disabled={!!account}>
            <CurrenciesSelectOptions />
          </RHFSelect>
          <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'24px'}>
            {account && <DeleteAccountButton account={account} onDelete={closeModal} />}
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
