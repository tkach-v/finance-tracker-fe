'use client'

import type { ReactElement } from 'react'

const LayoutWrapper = ({ verticalLayout }: { verticalLayout: ReactElement }) => {
  return <div className='flex flex-col flex-auto'>{verticalLayout}</div>
}

export default LayoutWrapper
