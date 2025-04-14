import type { ReactNode } from 'react'

import classnames from 'classnames'

import type { ChildrenType } from '@core/types'

import LayoutContent from './components/vertical/LayoutContent'

import { verticalLayoutClasses } from './utils/layoutClasses'

type VerticalLayoutProps = ChildrenType & {
  navigation?: ReactNode
  navbar?: ReactNode
  footer?: ReactNode
}

const VerticalLayout = (props: VerticalLayoutProps) => {
  const { navbar, footer, navigation, children } = props

  return (
    <div className={classnames(verticalLayoutClasses.root, 'flex flex-auto')}>
      {navigation || null}
      <div className={classnames(verticalLayoutClasses.contentWrapper, 'flex flex-col min-is-0 is-full')}>
        {navbar || null}
        {/* Content */}
        <LayoutContent>{children}</LayoutContent>
        {footer || null}
      </div>
    </div>
  )
}

export default VerticalLayout
