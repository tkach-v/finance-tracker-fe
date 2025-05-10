import React from 'react'
import { CategoryTypes } from '@/types/categories'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import { useCreateCategoryMutation } from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { CreateCategoryRequest } from '@/api/types/categories'
import AddButton from '@components/AddButton'
import Typography from '@mui/material/Typography'
import ColorPicker from '@components/ColorPicker'

type Props = {
  open: boolean
  onClose: () => void
  type: CategoryTypes
}

const schema = yup.object({
  name: yup.string().required('Введіть назву категорії'),
  type: yup.string().required('Виберіть тип категорії'),
  color: yup.string().required('Виберіть колір категорії'),
  budget_limit: yup
    .string()
    .nullable()
    .transform(val => (val === '' ? null : val))
    .matches(/^(?:\d{1,13})(?:\.\d{1,2})?$/, 'Ліміт бюджету повинен мати до 13 цифр перед комою та до 2 після')
})

const AddCategoryButton = ({ open, onClose, type }: Props) => {
  const { showSnackBar } = useActions()

  const defaultValues = {
    name: '',
    type,
    color: '#CCCCCC',
    budget_limit: null
  }

  const methods = useForm<CreateCategoryRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = methods

  const [createCategory] = useCreateCategoryMutation()

  const onSubmit = async (data: CreateCategoryRequest) => {
    try {
      await createCategory(data).unwrap()
      reset(defaultValues)
      onClose()
    } catch (error: any) {
      if (error.data && error.data.non_field_errors) {
        showSnackBar({
          message: 'Категорія з такою назвою вже існує. Введіть іншу назву та спробуйте ще раз.',
          type: 'error'
        })
      } else {
        showSnackBar({
          message: 'Не вдалося створити категорію. Спробуйте ще раз пізніше.',
          type: 'error'
        })
      }
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer
        close={onClose}
        title={`Додати категорію ${type === CategoryTypes.INCOME ? 'доходів' : 'витрат'}`}
        sx={{ width: '100%', maxWidth: '500px' }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5 w-full'}>
          <Stack direction={'row'} gap={'16px'} alignItems={'center'}>
            <Typography>Колір категорії:</Typography>
            <Controller
              name='color'
              control={control}
              render={({ field }) => <ColorPicker value={field.value} onChange={field.onChange} />}
            />
          </Stack>
          <RHFTextField name='name' label='Назва' fullWidth error={!!errors.name} helperText={errors.name?.message} />
          <RHFTextField
            name='budget_limit'
            label='Ліміт бюджету'
            fullWidth
            error={!!errors.budget_limit}
            helperText={errors.budget_limit?.message}
            type={'number'}
          />
          <Stack direction={'row'} justifyContent={'end'} gap={'8px'} mt={'32px'}>
            <AddButton variant='contained' type='submit' />
          </Stack>
        </FormProvider>
      </ModalContainer>
    </Modal>
  )
}

export default AddCategoryButton
