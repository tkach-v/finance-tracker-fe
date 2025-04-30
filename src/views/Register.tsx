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
import { useRegisterMutation } from '@/api/extendedApi'
import { FormProvider, RHFTextField } from '@components/HookForm'
import { useRouter } from 'next/navigation'
import { AuthRequest } from '@/api/types/auth'
import { authSchema } from '@/types/yupSchemas'
import RHFPassword from '@components/HookForm/RHFPassword'

const darkImg = '/images/pages/auth-v1-mask-dark.png'
const lightImg = '/images/pages/auth-v1-mask-light.png'

const Register = ({ mode }: { mode: Mode }) => {
  const { showSnackBar } = useActions()
  const router = useRouter()
  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const methods = useForm<AuthRequest>({
    resolver: yupResolver(authSchema),
    defaultValues: { email: '', password: '' }
  })

  const {
    handleSubmit,
    formState: { errors }
  } = methods

  const [register] = useRegisterMutation()

  const onSubmit = async (data: AuthRequest) => {
    try {
      await register(data).unwrap()
      showSnackBar({
        message: 'Реєстрація пройшла успішно. Тепер ви можете увійти в свій обліковий запис.',
        type: 'success'
      })
      router.replace('/login')
    } catch (error: any) {
      showSnackBar({
        message: `Не вдалося зареєструватися. ${error?.data?.detail || error?.data?.email || error?.data?.password || 'Спробуйте ще раз пізніше.'}`,
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
          <Typography variant='h4'>Зареєструйся 🚀</Typography>
          <div className='flex flex-col gap-5'>
            <Typography className='mbs-1'>Введи свої дані, щоб створити обліковий запис</Typography>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)} formClassName={'flex flex-col gap-5'}>
              <RHFTextField
                name='email'
                placeholder={'email@example.com'}
                label='Електронна пошта'
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <RHFPassword name='password' error={!!errors.password} helperText={errors.password?.message} />
              <Button fullWidth variant='contained' type='submit'>
                Зареєструватися
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <Typography component={Link} href='/login' color='primary'>
                  Уже маєш обліковий запис?
                </Typography>
              </div>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Register
