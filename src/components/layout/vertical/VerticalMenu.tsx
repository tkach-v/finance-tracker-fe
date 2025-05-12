import { useTheme } from '@mui/material/styles'

import PerfectScrollbar from 'react-perfect-scrollbar'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

import { Menu, MenuItem } from '@menu/vertical-menu'

import useVerticalNav from '@menu/hooks/useVerticalNav'

import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'
import Divider from '@mui/material/Divider'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='ri-arrow-right-s-line' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: { scrollMenu: (container: any, isPerfectScrollbar: boolean) => void }) => {
  const theme = useTheme()
  const { isBreakpointReached, transitionDuration } = useVerticalNav()

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      <Menu
        menuItemStyles={menuItemStyles(theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='ri-circle-line' /> }}
        menuSectionStyles={menuSectionStyles(theme)}
      >
        <Divider sx={{ mb: 5 }} />
        <MenuItem href='/' icon={<i className='ri-home-9-line' />}>
          Головна
        </MenuItem>
        <MenuItem href='/accounts' icon={<i className='ri-wallet-line' />}>
          Рахунки
        </MenuItem>
        <MenuItem href='/categories' icon={<i className='ri-shapes-line' />}>
          Категорії
        </MenuItem>
        <MenuItem href='/charts' icon={<i className='ri-bar-chart-2-line' />}>
          Діаграми
        </MenuItem>
        <MenuItem href='/transactions' icon={<i className='ri-exchange-line' />}>
          Транзакції
        </MenuItem>
        <MenuItem href='/account-settings' icon={<i className='ri-user-settings-line' />}>
          Налаштування
        </MenuItem>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
