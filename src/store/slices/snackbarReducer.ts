import { createSlice } from '@reduxjs/toolkit'
import { SnackbarState } from '@/types/snackbar'

const initialState: SnackbarState = {
  message: null,
  visible: false,
  type: null
}

const slice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(state, action) {
      state.visible = true
      state.message = action.payload.message
      state.type = action.payload.type
    },
    hideSnackbar(state) {
      state.visible = false
      state.message = null
      state.type = null
    }
  }
})

export const showSnackBar = (data: object) => (dispatch: any) => {
  dispatch(slice.actions.showSnackbar(data))
}

export const snackbarActions = slice.actions

export default slice.reducer
