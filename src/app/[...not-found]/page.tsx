import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

import { getServerMode } from '@core/utils/serverHelpers'

const NotFoundPage = async () => {
  const mode = await getServerMode()

  return (
    <BlankLayout>
      <NotFound mode={mode} />
    </BlankLayout>
  )
}

export default NotFoundPage
