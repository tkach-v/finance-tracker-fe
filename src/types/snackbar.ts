import { AlertColor } from '@mui/material/Alert/Alert'

export interface SnackbarState {
  visible: boolean
  message: string | null
  type: AlertColor | null
}

export interface ShowSnackbarOptions {
  message: string
  type: AlertColor
}
