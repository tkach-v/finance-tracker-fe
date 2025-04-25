import Register from '@views/Register'

import { getServerMode } from '@core/utils/serverHelpers'

const RegisterPage = async () => {
  const mode = await getServerMode()

  return <Register mode={mode} />
}

export default RegisterPage
