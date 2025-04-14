import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type AppState = {
  theme: 'light' | 'dark'
}

const initialState: AppState = {
  theme: 'light'
}

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'light' | 'dark'>) {
      state.theme = action.payload
    }
  }
})

export const { setTheme } = slice.actions

export default slice.reducer
