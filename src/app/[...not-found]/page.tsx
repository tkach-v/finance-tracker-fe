import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

import { getServerMode } from '@core/utils/serverHelpers'

const NotFoundPage = async () => {
  const direction = 'ltr'
  const mode = await getServerMode()

  return (
    <Providers direction={direction}>
      <BlankLayout>
        <NotFound mode={mode} />
      </BlankLayout>
    </Providers>
  )
}

export default NotFoundPage
