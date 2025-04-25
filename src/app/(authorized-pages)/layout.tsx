'use client'

import type { ChildrenType } from '@core/types'

import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import Navigation from '@components/layout/vertical/Navigation'
import Navbar from '@components/layout/vertical/Navbar'
import { useRouter } from 'next/navigation'
import { useCurrentUser } from '@/hooks/api/useCurrentUser'

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()

  if (!isLoading && !user) return router.replace('/login')

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
