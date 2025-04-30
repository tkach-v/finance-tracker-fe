'use client'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import type { Mode } from '@core/types'

import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

import { useImageVariant } from '@/hooks/useImageVariant'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useActions } from '@/hooks/useActions'
import { useResetPasswordMutation } from '@/api/extendedApi'
import { FormProvider } from '@components/HookForm'
import { useRouter } from 'next/navigation'
import { passwordSchema } from '@/types/yupSchemas'
import RHFPassword from '@components/HookForm/RHFPassword'
import * as yup from 'yup'
import DirectionalIcon from '@components/DirectionalIcon'

const darkImg = '/images/pages/auth-v1-mask-dark.png'
const lightImg = '/images/pages/auth-v1-mask-light.png'

type ResetPasswordInput = {
  password: string
}

export const schema = yup.object({
  password: passwordSchema
})

type ResetPassword = {
  mode: Mode
  uid: string
  token: string
}

const ResetPassword = ({ mode, uid, token }: ResetPassword) => {
  const { showSnackBar } = useActions()
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const methods = useForm<ResetPasswordInput>({
    resolver: yupResolver(schema),
    defaultValues: { password: '' }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const [resetPassword] = useResetPasswordMutation()

  const onSubmit = async (data: ResetPasswordInput) => {
    try {
      await resetPassword({
        uid,
        token,
        new_password: data.password
      }).unwrap()
      showSnackBar({
        message: 'Пароль успішно оновлений. Ви можете увійти в свій обліковий запис.',
        type: 'success'
      })
      router.replace('/login')
    } catch (error: any) {
      showSnackBar({
        message: `Не вдалося скинути пароль. ${error?.data?.detail || error?.data?.uid || error?.data?.token || error?.data?.new_password || 'Спробуйте ще раз пізніше.'}`,
        type: 'error'
      })
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-start mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Скинути пароль</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Введи новий пароль, який ти хочеш використовувати для свого облікового запису
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5'}>
              <RHFPassword name='password' error={!!errors.password} helperText={errors.password?.message} />
              <Button fullWidth variant='contained' type='submit'>
                Підтвердити
              </Button>
              <Typography className='flex justify-center items-center' color='primary'>
                <Link href='/login' className='flex items-center'>
                  <DirectionalIcon ltrIconClass='ri-arrow-left-s-line' rtlIconClass='ri-arrow-right-s-line' />
                  <span>Повернутись до входу</span>
                </Link>
              </Typography>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default ResetPassword
