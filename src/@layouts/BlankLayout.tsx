'use client'

import classnames from 'classnames'

import type { ChildrenType } from '@core/types'

import { blankLayoutClasses } from './utils/layoutClasses'

const BlankLayout = ({ children }: ChildrenType) => {
  return <div className={classnames(blankLayoutClasses.root, 'is-full bs-full')}>{children}</div>
}

export default BlankLayout
