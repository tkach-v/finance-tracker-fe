import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { BaseApi } from '@/api/_base.api'

const rootReducer = combineReducers({
  [BaseApi.reducerPath]: BaseApi.reducer
})

export { rootReducer }

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }).concat(BaseApi.middleware),
  devTools: true
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
