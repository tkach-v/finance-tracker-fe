'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import type { Mode } from '@core/types'

import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

import themeConfig from '@configs/themeConfig'

import { useImageVariant } from '@/hooks/useImageVariant'
import { useForm } from 'react-hook-form'
import { AuthRequest } from '@/api/types/auth'
import { yupResolver } from '@hookform/resolvers/yup'
import { authSchema } from '@/types/yupSchemas'
import { useLoginMutation } from '@/api/extendedApi'
import { useActions } from '@/hooks/useActions'
import { FormProvider, RHFTextField } from '@components/HookForm'
import RHFPassword from '@components/HookForm/RHFPassword'
import { localStorageService } from '@/utils/localStorage'

const darkImg = '/images/pages/auth-v1-mask-dark.png'
const lightImg = '/images/pages/auth-v1-mask-light.png'

const Login = ({ mode }: { mode: Mode }) => {
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

  const [login] = useLoginMutation()

  const onSubmit = async (data: AuthRequest) => {
    try {
      const response = await login(data).unwrap()

      if (response) {
        localStorageService.setAccessToken(response.access);
        localStorageService.setRefreshToken(response.refresh);
        router.replace('/')
      }
    } catch (error: any) {
      showSnackBar({
        message: 'Не вдалося увійти. Перевірте свої дані та спробуйте ще раз.',
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
          <div className='flex flex-col gap-5'>
            <div>
              <Typography variant='h4'>{`Вітаю у ${themeConfig.templateName}!👋🏻`}</Typography>
              <Typography className='mbs-1'>Щоб почати, увійди в свій обліковий запис</Typography>
            </div>
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
                Увійти
              </Button>
              <div className='flex justify-center items-center flex-wrap gap-2'>
                <div className='flex justify-center items-center flex-wrap gap-2'>
                  <Typography component={Link} href='/register' color='primary'>
                    У тебе ще немає облікового запису?
                  </Typography>
                  <Typography component={Link} href='/forgot-password' color='primary'>
                    Забув пароль?
                  </Typography>
                </div>
              </div>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
      <Illustrations maskImg={{ src: authBackground }} />
    </div>
  )
}

export default Login
