import type { ChildrenType, Direction } from '@core/types'

import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import ThemeProvider from '@components/theme'

import { getMode, getSettingsFromCookie } from '@core/utils/serverHelpers'
import ReduxProvider from '@/store/reduxProvider'
import SnackbarProvider from '@/providers/SnackbarProvider'
import LocalizationProvider from '@components/LocalizationProvider';
type Props = ChildrenType & {
  direction: Direction
}

const Providers = async (props: Props) => {
  const { children, direction } = props

  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()

  return (
    <ReduxProvider>
      <SnackbarProvider />
      <VerticalNavProvider>
        <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
          <ThemeProvider direction={direction}>
            <LocalizationProvider>
              {children}
            </LocalizationProvider>
          </ThemeProvider>
        </SettingsProvider>
      </VerticalNavProvider>
    </ReduxProvider>
  )
}

export default Providers
