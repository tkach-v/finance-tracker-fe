'use client'

import type { ChildrenType } from '@core/types'

import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/api/useCurrentUser'
import { useEffect } from 'react'
import { useGetCurrenciesQuery, useGetAccountsQuery, useGetCategoriesQuery } from '@/api/extendedApi'

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()

  useGetCurrenciesQuery({})
  useGetAccountsQuery({})
  useGetCategoriesQuery({})

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login')
    }
  }, [isLoading, user, router])

  if (isLoading || !user) {
    return null
  }

  return (
    <LayoutWrapper
      verticalLayout={
        <VerticalLayout navigation={<Navigation />} navbar={<Navbar />}>
          {children}
        </VerticalLayout>
      }
    />
  )
}

export default Layout
