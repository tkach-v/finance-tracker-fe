import { getServerMode } from '@core/utils/serverHelpers'
import ResetPassword from '@views/ResetPassword'
import { redirect } from 'next/navigation'

type PageProps = {
  searchParams: {
    uid?: string;
    token?: string
  }
}

const ResetPasswordPage = async ({ searchParams }: PageProps) => {
  const { uid, token } = searchParams
  const mode = await getServerMode()

  if (!uid || !token) {
    redirect('/')
  }

  return <ResetPassword mode={mode} uid={uid} token={token} />
}

export default ResetPasswordPage
