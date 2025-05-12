'use client'

import type { ChildrenType } from '@core/types'
import { LocalizationProvider as MUILocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type Props = ChildrenType

const LocalizationProvider = ({ children }: Props) => {
  return <MUILocalizationProvider dateAdapter={AdapterDateFns}>{children}</MUILocalizationProvider>
}

export default LocalizationProvider
