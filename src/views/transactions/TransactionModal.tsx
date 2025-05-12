import React from 'react'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFSelect, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import { useCreateTransactionMutation, useUpdateTransactionMutation } from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '@mui/material/Button'
import { Transaction, TransactionTypes } from '@/types/transactions'
import { CreateTransactionRequest } from '@/api/types/transactions'
import AccountsSelectOptions from '@components/AccountsSelectOptions'
import DeleteTransactionButton from '@views/transactions/DeleteTransactionButton'
import TransactionTypesSelectOptions from '@views/transactions/TransactionTypesSelectOptions'
import CategoriesSelectOptions from '@components/CategoriesSelectOptions'
import RHFDatePicker from '@/components/HookForm/RHFDatePicker'
import { useAccountCurrency } from '@/hooks/useAccountCurrency'

type Props = {
  open: boolean
  onClose: () => void
  transaction?: Transaction
}

const schema = yup.object({
  type: yup.string().required('Виберіть тип транзакції').min(1, 'Виберіть тип транзакції'),
  description: yup.string(),
  amount: yup
    .string()
    .required('Введіть сума операції у валюті рахунку')
    .matches(/^\d{1,20}(?:\.\d{1,10})?$/, 'Сума може містити до 20 цифр до коми та до 10 після коми'),
  account: yup.string().required('Виберіть рахунок').min(1, 'Виберіть рахунок'),
  category: yup.string().required('Виберіть категорію').min(1, 'Виберіть категорію'),
  date: yup.date()
})

const TransactionModal = ({ open, onClose, transaction }: Props) => {
  const { showSnackBar } = useActions()

  const defaultValues = {
    type: transaction?.type || TransactionTypes.EXPENSE,
    description: transaction?.description || '',
    amount: transaction?.amount.toString() || '0.00',
    account: transaction?.account.toString() || '',
    category: transaction?.category.toString() || '',
    date: transaction?.date ? new Date(transaction.date) : new Date()
  }

  const methods = useForm<CreateTransactionRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const {
    handleSubmit,
    reset,
    formState: { errors },
    watch
  } = methods

  const operationType = watch('type')
  const accountId = watch('account')
  const currencyText = useAccountCurrency({ accountId })

  const [createTransaction] = useCreateTransactionMutation()
  const [updateTransaction] = useUpdateTransactionMutation()

  const closeModal = () => {
    reset(defaultValues)
    onClose()
  }

  const onSubmit = async (data: CreateTransactionRequest) => {
    try {
      const dateOnly = data.date instanceof Date ? data.date.toISOString().split('T')[0] : data.date
      const payload = { ...data, date: dateOnly }

      if (transaction) {
        await updateTransaction({ id: transaction.id, body: payload }).unwrap()
      } else {
        await createTransaction(payload).unwrap()
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
          message: 'Не вдалося створити транзакцію. Спробуйте ще раз пізніше.',
          type: 'error'
        })
      }
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
          <Stack direction={'row'} gap={2}>
            <RHFSelect name='type' label='Тип транзакції' fullWidth disabled={!!transaction} sx={{ flex: 1 }}>
              <TransactionTypesSelectOptions />
            </RHFSelect>
            <RHFDatePicker name='date' label='Дата транзакції' disableFuture views={['year', 'month', 'day']} />
          </Stack>
          <RHFSelect name='account' label='Рахунок' fullWidth disabled={!!transaction}>
            <AccountsSelectOptions />
          </RHFSelect>
          <RHFSelect name='category' label='Категорія' fullWidth>
            <CategoriesSelectOptions type={operationType} />
          </RHFSelect>
          <RHFTextField
            type='number'
            name='amount'
            label={`Сума - ${currencyText}`}
            fullWidth
            error={!!errors.amount}
            helperText={errors.amount?.message}
          />
          <RHFTextField
            name='description'
            type={'textarea'}
            label='Опис'
            fullWidth
            error={!!errors.description}
            helperText={errors.description?.message}
          />
          <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'24px'}>
            {transaction && <DeleteTransactionButton transaction={transaction} onDelete={closeModal} />}
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
