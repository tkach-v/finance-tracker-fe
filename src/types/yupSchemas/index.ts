import * as yup from 'yup'

export const emailSchema = yup.string().email('Неправильна адреса електронної пошти').required("Адреса електронна пошта обов'язкова")
export const passwordSchema = yup
  .string()
  .required("Пароль обов'язковий")
  .min(8, 'Довжина паролю повинна бути не менше 8 символів')
  .max(50, 'Довжина паролю повинна бути не більше 50 символів')

export const authSchema = yup.object({
  email: emailSchema,
  password: passwordSchema
})
