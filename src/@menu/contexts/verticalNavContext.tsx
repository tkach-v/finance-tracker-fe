'use client'

import { createContext, useCallback, useMemo, useState } from 'react'

import type { ChildrenType } from '../types'

export type VerticalNavState = {
  width?: number
  isToggled?: boolean
  isBreakpointReached?: boolean
  transitionDuration?: number
}

export type VerticalNavContextProps = VerticalNavState & {
  updateVerticalNavState: (values: VerticalNavState) => void
  toggleVerticalNav: (value?: VerticalNavState['isToggled']) => void
}

const VerticalNavContext = createContext({} as VerticalNavContextProps)

export const VerticalNavProvider = ({ children }: ChildrenType) => {
  const [verticalNavState, setVerticalNavState] = useState<VerticalNavState>()

  const updateVerticalNavState = useCallback((values: Partial<VerticalNavState>) => {
    setVerticalNavState(prevState => ({
      ...prevState,
      ...values
    }))
  }, [])

  const toggleVerticalNav = useCallback((value?: boolean) => {
    setVerticalNavState(prevState => ({
      ...prevState,
      isToggled: value !== undefined ? Boolean(value) : !Boolean(prevState?.isToggled)
    }))
  }, [])

  const verticalNavProviderValue = useMemo(
    () => ({
      ...verticalNavState,
      updateVerticalNavState,
      toggleVerticalNav
    }),
    [verticalNavState, updateVerticalNavState, toggleVerticalNav]
  )

  return <VerticalNavContext.Provider value={verticalNavProviderValue}>{children}</VerticalNavContext.Provider>
}

export default VerticalNavContext
