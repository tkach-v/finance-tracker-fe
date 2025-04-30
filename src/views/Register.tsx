'use client'

import { useState } from 'react'

import Link from 'next/link'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'
import * as yup from 'yup'

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

type RegisterFormInputs = {
  email: string
  password: string
}

const registerSchema = yup.object({
  email: yup.string().email('Неправильна адреса електронної пошти').required("Адреса електронна пошта обов'язкова"),
  password: yup
    .string()
    .required("Пароль обов'язковий")
    .min(8, 'Довжина паролю повинна бути не менше 8 символів')
    .max(50, 'Довжина паролю повинна бути не більше 50 символів')
})

const Register = ({ mode }: { mode: Mode }) => {
  const { showSnackBar } = useActions()
  const router = useRouter()

  const methods = useForm<RegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    defaultValues: { email: '', password: '' }
  })
  const {
    handleSubmit,
    formState: { errors },
  } = methods

  const [register] = useRegisterMutation()

  const onSubmit = async (data: RegisterFormInputs) => {
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

  const [isPasswordShown, setIsPasswordShown] = useState(false)

  const darkImg = '/images/pages/auth-v1-mask-dark.png'
  const lightImg = '/images/pages/auth-v1-mask-light.png'

  const authBackground = useImageVariant(mode, lightImg, darkImg)

  const handleClickShowPassword = () => setIsPasswordShown(show => !show)

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
              <RHFTextField
                type={isPasswordShown ? 'text' : 'password'}
                name='password'
                placeholder={'password'}
                variant='outlined'
                label='Пароль'
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        size='small'
                        edge='end'
                        onClick={handleClickShowPassword}
                        onMouseDown={e => e.preventDefault()}
                      >
                        <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'} />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
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
