import ForgotPassword from '@views/ForgotPassword'

import { getServerMode } from '@core/utils/serverHelpers'

const ForgotPasswordPage = async () => {
  const mode = await getServerMode()

  return <ForgotPassword mode={mode} />
}

export default ForgotPasswordPage
