import { useEffect } from 'react'

import { useColorScheme } from '@mui/material/styles'

import { useSettings } from '@/hooks/useSettings'

const ModeChanger = () => {
  const { setMode } = useColorScheme()
  const { settings } = useSettings()

  useEffect(() => {
    if (settings.mode) {
      setMode(settings.mode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [settings.mode])

  return null
}

export default ModeChanger
