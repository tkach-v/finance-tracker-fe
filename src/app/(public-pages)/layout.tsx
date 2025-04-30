'use client'

import type { ChildrenType } from '@core/types'
import BlankLayout from '@layouts/BlankLayout'
import { useCurrentUser } from '@/hooks/api/useCurrentUser'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const Layout = ({ children }: ChildrenType) => {
  const router = useRouter()
  const { user, isLoading } = useCurrentUser()

  useEffect(() => {
    if (!isLoading && user) {
      router.replace('/')
    }
  }, [isLoading, user, router])

  return <BlankLayout>{children}</BlankLayout>
}

export default Layout
