import type { ChildrenType, Direction } from '@core/types'

import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'

type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  const { children, direction } = props

  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()

  return (
    <VerticalNavProvider>
      <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
        <ThemeProvider direction={direction}>
          {children}
        </ThemeProvider>
      </SettingsProvider>
    </VerticalNavProvider>
  )
}

export default Providers
