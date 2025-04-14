import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { BaseApi } from '@/api/_base.api'
import appReducer from '@/store/slices/appReducer'

const rootPersistConfig = {
  key: '-root',
  keyPrefix: 'redux-tracker',
  blacklist: [],
  storage
}

const rootReducer = combineReducers({
  [BaseApi.reducerPath]: BaseApi.reducer,
  app: persistReducer(rootPersistConfig, appReducer)
})

export { rootReducer }

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  }).concat(BaseApi.middleware),
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
