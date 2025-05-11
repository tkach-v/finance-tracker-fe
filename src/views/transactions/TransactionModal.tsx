import React from 'react'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFSelect, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import {
  useCreateTransactionMutation,
  useDeleteTransactionMutation,
  useUpdateTransactionMutation
} from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import { Transaction } from '@/types/transactions'
import { CreateTransactionRequest } from '@/api/types/transactions'
import CurrenciesSelectOptions from '@components/CurrenciesSelectOptions'
import AccountsSelectOptions from '@components/AccountsSelectOptions'

type Props = {
  open: boolean
  onClose: () => void
  transaction?: Transaction
}

const schema = yup.object({
  description: yup.string(),
  amount: yup
    .string()
    .required('Введіть сума операції у валюті рахунку')
    .matches(/^\d{1,20}(?:\.\d{1,10})?$/, 'Сума може містити до 20 цифр до коми та до 10 після коми'),
  account: yup.string().required('Виберіть рахунок')
})

const TransactionModal = ({ open, onClose, transaction }: Props) => {
  const { showSnackBar } = useActions()

  const defaultValues = {
    description: transaction?.description || '',
    amount: transaction?.amount.toString() || '0.00',
    account: transaction?.account.toString() || ''
  }

  const methods = useForm<CreateTransactionRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const {
    handleSubmit,
    reset,
    formState: { errors }
  } = methods

  const [createTransaction] = useCreateTransactionMutation()
  const [updateTransaction] = useUpdateTransactionMutation()
  const [deleteTransaction] = useDeleteTransactionMutation()

  const closeModal = () => {
    reset(defaultValues)
    onClose()
  }

  const onSubmit = async (data: CreateTransactionRequest) => {
    try {
      if (transaction) {
        await updateTransaction({ id: transaction.id, body: data }).unwrap()
      } else {
        await createTransaction(data).unwrap()
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
      if (transaction) {
        await deleteTransaction(transaction.id).unwrap()
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
        title={`${transaction ? 'Редагувати' : 'Додати'} транзакцію`}
        sx={{ width: '100%', maxWidth: '500px' }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5 w-full'}>
          <RHFTextField
            type='number'
            name='amount'
            label='Сума'
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
          <RHFTextField name='description' label='Опис' fullWidth error={!!errors.description} helperText={errors.description?.message} />
          <RHFSelect name='account' label='Рахунок' fullWidth disabled={!!transaction}>
            <AccountsSelectOptions />
          </RHFSelect>
          <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'24px'}>
            {transaction && (
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
              {transaction ? 'Зберегти' : 'Додати'}
            </Button>
          </Stack>
        </FormProvider>
      </ModalContainer>
    </Modal>
  )
}

export default TransactionModal
