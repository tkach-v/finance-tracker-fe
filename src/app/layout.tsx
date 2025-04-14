import 'react-perfect-scrollbar/dist/css/styles.css'

import type { ChildrenType } from '@core/types'

import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'

export const metadata = {
  title: 'Трекер фінансів',
  description: 'Слідкуйте за своїми витратами та доходами легко і зручно'
}

const RootLayout = ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
    </html>
  )
}

export default RootLayout
