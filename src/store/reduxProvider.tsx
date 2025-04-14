'use client'

import { Provider } from 'react-redux'

import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from '@/store'

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        {children}
      </PersistGate>
    </Provider>
  )
}
