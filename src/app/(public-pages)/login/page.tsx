import Login from '@views/Login'

import { getServerMode } from '@core/utils/serverHelpers'

const LoginPage = async () => {
  const mode = await getServerMode()

  return <Login mode={mode} />
}

export default LoginPage
