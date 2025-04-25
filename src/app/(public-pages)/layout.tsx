"use client"

import type { ChildrenType } from '@core/types'
import BlankLayout from '@layouts/BlankLayout'
import { useCurrentUser } from '@/hooks/api/useCurrentUser'
import { useRouter } from 'next/navigation'

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()

  if (!isLoading && user) return router.replace('/')

  return <BlankLayout>{children}</BlankLayout>
}

export default Layout
