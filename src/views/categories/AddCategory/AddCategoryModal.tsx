import React from 'react'
import { CategoryTypes } from '@/types/categories'
import ModalContainer from '@components/modal/ModalContainer'
import { FormProvider, RHFTextField } from '@components/HookForm'
import { Modal, Stack } from '@mui/material'
import { useCreateCategoryMutation } from '@/api/extendedApi'
import * as yup from 'yup'
import { useActions } from '@/hooks/useActions'
import { useForm } from 'react-hook-form'
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
  icon: yup.string().required('Виберіть іконку категорії'),
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
    icon: 'test-icon-1',
    budget_limit: null
  }

  const methods = useForm<CreateCategoryRequest>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const [createCategory] = useCreateCategoryMutation()

  const onSubmit = async (data: CreateCategoryRequest) => {
    try {
      console.log(data)

      // await createCategory({}).unwrap()
    } catch (error) {
      showSnackBar({
        message: 'Не вдалося створити категорію. Спробуйте ще раз пізніше.',
        type: 'error'
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer
        close={onClose}
        title={`Додати категорію ${type === CategoryTypes.INCOME ? 'доходів' : 'витрат'}`}
        sx={{ width: '100%', maxWidth: '600px' }}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5 w-full'}>
          <RHFTextField name='name' label='Назва' fullWidth error={!!errors.name} helperText={errors.name?.message} />
          <Stack direction={'row'} gap={'16px'} justifyContent={'space-between'}>
            <Typography>
              Обери колір для категорії
            </Typography>
            {/*<ColorPicker onChange={} value={} />*/}
          </Stack>

          <Stack direction={'row'} justifyContent={'end'} gap={'8px'}>
            <AddButton variant='contained' type='submit' />
          </Stack>
        </FormProvider>
      </ModalContainer>
    </Modal>
  )
}

export default AddCategoryButton
