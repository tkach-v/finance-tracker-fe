import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

import { BaseApi } from '@/api/_base.api'
import appReducer from '@/store/slices/appReducer'

const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null)
    },
    setItem(_key: string, value: number) {
      return Promise.resolve(value)
    },
    removeItem() {
      return Promise.resolve()
    }
  }
}

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

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
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(BaseApi.middleware),
  devTools: true
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
