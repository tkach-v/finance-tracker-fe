'use client'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import type { Mode } from '@core/types'
import DirectionalIcon from '@components/DirectionalIcon'
import Illustrations from '@components/Illustrations'
import Logo from '@components/layout/shared/Logo'

import { useImageVariant } from '@/hooks/useImageVariant'
import { useActions } from '@/hooks/useActions'
import { useForm } from 'react-hook-form'
import { ForgotPasswordRequest } from '@/api/types/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { emailSchema } from '@/types/yupSchemas'
import { useForgotPasswordMutation } from '@/api/extendedApi'
import { FormProvider, RHFTextField } from '@components/HookForm'

const darkImg = '/images/pages/auth-v1-mask-dark.png'
const lightImg = '/images/pages/auth-v1-mask-light.png'

export const schema = yup.object({
  email: emailSchema
})

const ForgotPassword = ({ mode }: { mode: Mode }) => {
  const { showSnackBar } = useActions()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const methods = useForm<ForgotPasswordRequest>({
    resolver: yupResolver(schema),
    defaultValues: { email: '' }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const [forgotPassword] = useForgotPasswordMutation()

  const onSubmit = async (data: ForgotPasswordRequest) => {
    try {
      await forgotPassword(data).unwrap()
      showSnackBar({
        message: 'На вашу електронну пошту надіслано інструкції для скидання паролю.',
        type: 'success'
      })
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося надіслати інструкції. Перевірте свою електронну пошту або спробуйте ще раз пізніше.',
        type: 'error'
      })
    }
  }

  return (
    <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
      <Card className='flex flex-col sm:is-[450px]'>
        <CardContent className='p-6 sm:!p-12'>
          <Link href='/' className='flex justify-center items-center mbe-6'>
            <Logo />
          </Link>
          <Typography variant='h4'>Забув пароль 🔒</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>
              Введи свою електронну пошту, та ми надішлемо тобі інструкції для зміни паролю
            </Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5'}>
              <RHFTextField
                name='email'
                placeholder={'email@example.com'}
                label='Електронна пошта'
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Button fullWidth variant='contained' type='submit'>
                Продовжити
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

export default ForgotPassword
