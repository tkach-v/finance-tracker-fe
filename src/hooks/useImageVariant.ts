import { useMemo } from 'react'

import { useColorScheme } from '@mui/material'

import { Mode } from '@core/types'

export const useImageVariant = (mode: Mode, imgLight: string, imgDark: string): string => {
  const { mode: muiMode } = useColorScheme()

  return useMemo(() => {
    const isServer = typeof window === 'undefined'

    const currentMode = (() => {
      if (isServer) return mode

      return muiMode
    })()

    const isDarkMode = currentMode === 'dark'

    return isDarkMode ? imgDark : imgLight
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, muiMode])
}
