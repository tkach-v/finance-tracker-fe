'use client'

import classnames from 'classnames'

import type { ChildrenType } from '@core/types'

import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

import StyledMain from '@layouts/styles/shared/StyledMain'

const LayoutContent = ({ children }: ChildrenType) => {
  return (
    <StyledMain
      isContentCompact={true}
      className={classnames(verticalLayoutClasses.content, verticalLayoutClasses.contentCompact, 'flex-auto is-full')}
    >
      {children}
    </StyledMain>
  )
}

export default LayoutContent
