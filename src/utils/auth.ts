import { isClient } from '@/utils/platform'
import { localStorageService } from '@/utils/localStorage'
import { extendedApi } from '@/api/extendedApi'
import { TagTypes } from '@/utils/rtk-tags'

export const logoutAction = () => (dispatch: any) => {
  if (isClient()) {
    console.log('Logout action triggered')
    localStorageService.logout()
    dispatch(extendedApi.util.resetApiState())
    dispatch(extendedApi.util.invalidateTags([{ type: TagTypes.CURRENT_USER }]))
  }
}
