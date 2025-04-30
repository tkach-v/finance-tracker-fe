export const AUTH = {
  register: () => '/users/',
  login: () => '/jwt/create/',
  refreshToken: () => '/jwt/refresh/'
}

export const USERS = {
  current: () => '/users/me/'
}
