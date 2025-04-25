import { isClient } from '@/utils/platform'

enum StorageKeys {
  ACCESS_TOKEN = 'accessToken',
  REFRESH_TOKEN = 'refreshToken'
}

const setItemToStorage = (object: any, key: string) => {
  if (!isClient()) {
    console.warn("Can't write to localStorage on serverSide")
    return
  }

  const data = JSON.stringify(object)

  if (data) {
    return localStorage.setItem(key, data)
  } else {
    return false
  }
}

const getItemFromStorage = (key: string) => {
  if (isClient()) {
    const data = localStorage.getItem(key)

    if (data) {
      try {
        return JSON.parse(data)
      } catch (error) {
        return data
      }
    } else {
      return null
    }
  } else {
    return false
  }
}

export const localStorageService = {
  getAccessToken: () => getItemFromStorage(StorageKeys.ACCESS_TOKEN),
  setAccessToken: (data: string) => setItemToStorage(data, StorageKeys.ACCESS_TOKEN),
  removeAccessToken: () => localStorage.removeItem(StorageKeys.ACCESS_TOKEN),
  getRefreshToken: () => getItemFromStorage(StorageKeys.REFRESH_TOKEN),
  setRefreshToken: (data: string) => setItemToStorage(data, StorageKeys.REFRESH_TOKEN),
  removeRefreshToken: () => localStorage.removeItem(StorageKeys.REFRESH_TOKEN),

  isAuthenticated: () => {
    const access = localStorageService.getAccessToken()

    return Boolean(access)
  },

  logout: () => {
    localStorage.clear()
  }
}
