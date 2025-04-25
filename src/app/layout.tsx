import 'react-perfect-scrollbar/dist/css/styles.css'

import type { ChildrenType } from '@core/types'

import '@/app/globals.css'

import '@assets/iconify-icons/generated-icons.css'
import Providers from '@components/Providers'

export const metadata = {
  title: 'Трекер фінансів',
  description: 'Слідкуйте за своїми витратами та доходами легко і зручно'
}

const RootLayout = ({ children }: ChildrenType) => {
  const direction = 'ltr'

  return (
    <html id='__next' dir={direction}>
      <body className='flex is-full min-bs-full flex-auto flex-col'>
        <Providers direction='ltr'>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
