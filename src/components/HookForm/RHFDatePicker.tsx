import { Controller, useFormContext } from 'react-hook-form'
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'

type RHFDatePickerProps<TDate> = Omit<DatePickerProps<TDate, TDate>, 'renderInput' | 'onChange' | 'value'> & {
  name: string
}

export default function RHFDatePicker<TDate = Date>({ name, ...props }: RHFDatePickerProps<TDate>) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field: { onChange, value } }) => (
        <DatePicker<TDate>
          {...props}
          value={value}
          onChange={newValue => {
            onChange(newValue)
          }}
          renderInput={params => <TextField {...params} fullWidth />}
        />
      )}
    />
  )
}
