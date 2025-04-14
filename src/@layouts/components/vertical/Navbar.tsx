'use client'

import classnames from 'classnames'
import type { CSSObject } from '@emotion/styled'

import type { ChildrenType } from '@core/types'

import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

import StyledHeader from '@layouts/styles/vertical/StyledHeader'

type Props = ChildrenType & {
  overrideStyles?: CSSObject
}

const Navbar = (props: Props) => {
  const { children, overrideStyles } = props

  return (
    <StyledHeader
      overrideStyles={overrideStyles}
      className={classnames(
        verticalLayoutClasses.header,
        verticalLayoutClasses.headerContentCompact,
        verticalLayoutClasses.headerStatic,
        verticalLayoutClasses.headerDetached
      )}
    >
      <div className={classnames(verticalLayoutClasses.navbar, 'flex bs-full')}>{children}</div>
    </StyledHeader>
  )
}

export default Navbar
