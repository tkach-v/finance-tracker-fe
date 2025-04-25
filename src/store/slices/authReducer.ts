import { createSlice } from '@reduxjs/toolkit'

import { User } from '@/types/users'

type AppState = {
  user: User | null
}

const initialState: AppState = {
  user: null
}

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

  }
})

export const {  } = slice.actions
export default slice.reducer
