import 'server-only'

// Next Imports
import { cookies } from 'next/headers'

// Type Imports
import type { Settings } from '@core/contexts/settingsContext'

// Config Imports
import themeConfig from '@configs/themeConfig'

export const getSettingsFromCookie = async (): Promise<Settings> => {
  const cookieStore = await cookies()

  const cookieName = themeConfig.settingsCookieName

  return JSON.parse(cookieStore.get(cookieName)?.value || '{}')
}

export const getMode = async () => {
  const settingsCookie = await getSettingsFromCookie()

  return settingsCookie.mode || themeConfig.mode
}

export const getServerMode = async () => {
  return await getMode()
}
