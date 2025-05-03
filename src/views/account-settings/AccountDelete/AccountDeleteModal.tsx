'use client'

import { useDeleteUserMutation } from '@/api/extendedApi'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/navigation'
import { Box, FormHelperText, Modal } from '@mui/material'
import ModalContainer from '@components/modal/ModalContainer'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { passwordSchema } from '@/types/yupSchemas'
import * as yup from 'yup'
import { FormProvider, RHFCheckbox } from '@components/HookForm'
import RHFPassword from '@components/HookForm/RHFPassword'
import Button from '@mui/material/Button'
import { logoutAction } from '@/utils/auth'
import { useAppDispatch } from '@/store/hooks'

type Props = {
  open: boolean
  onClose: () => void
}

type DeleteUserInput = {
  current_password: string
  is_confirmed: boolean
}

export const schema = yup.object({
  current_password: passwordSchema,
  is_confirmed: yup.boolean().required().oneOf([true], "Підтвердження є обов'язковим")
})

const AccountDeleteModal = ({ open, onClose }: Props) => {
  const { showSnackBar } = useActions()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const methods = useForm<DeleteUserInput>({
    resolver: yupResolver(schema),
    defaultValues: { current_password: '', is_confirmed: false }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const [deleteUser] = useDeleteUserMutation()

  const onSubmit = async (data: DeleteUserInput) => {
    try {
      await deleteUser({
        current_password: data.current_password
      }).unwrap()

      showSnackBar({
        message: 'Ваш обліковий запис було успішно видалено.',
        type: 'success'
      })
      dispatch(logoutAction())
      router.replace('/login')
    } catch (error) {
      showSnackBar({
        message: 'Не вдалося видалити обліковий запис. Перевірте, чи вказано правильний пароль та спробуйте ще раз.',
        type: 'error'
      })
    }
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContainer close={onClose} title={'Видалити обліковий запис'} sx={{ width: '100%', maxWidth: '500px' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={''}>
          <RHFPassword
            name='current_password'
            error={!!errors.current_password}
            helperText={errors.current_password?.message}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              my: '12px'
            }}
          >
            <RHFCheckbox
              name={'is_confirmed'}
              label={'Я підтверджую, що хочу видалити свій обліковий запис'}
              color='error'
            />
            {!!errors.is_confirmed && <FormHelperText error>{errors.is_confirmed.message}</FormHelperText>}
          </Box>
          <Button variant='contained' color='error' type='submit'>
            Видалити
          </Button>
        </FormProvider>
      </ModalContainer>
    </Modal>
  )
}

export default AccountDeleteModal
