import { CSSProperties, ReactNode } from 'react'

// form
import { FormProvider as Form, UseFormReturn } from 'react-hook-form'

// ----------------------------------------------------------------------

type Props = {
  children: ReactNode
  methods: UseFormReturn<any>
  onSubmit?: VoidFunction
  onChange?: VoidFunction
  id?: string
  style?: CSSProperties
  formClassName?: string
}

export default function FormProvider({ children, onSubmit, onChange, methods, id, style, formClassName }: Props) {
  return (
    <Form {...methods}>
      <form
        id={id}
        style={style}
        autoComplete='false'
        onChange={onChange}
        onSubmit={onSubmit}
        className={formClassName}
      >
        {children}
      </form>
    </Form>
  )
}
