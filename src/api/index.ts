export const AUTH = {
  register: () => '/users/',
  login: () => '/jwt/create/',
  refreshToken: () => '/jwt/refresh/',
  forgotPassword: () => '/users/reset_password/',
  resetPassword: () => '/users/reset_password_confirm/'
}

export const USERS = {
  current: () => '/users/me/'
}

export const CATEGORIES = {
  all: () => '/categories/',
  byId: (id: string) => `/categories/${id}/`,
}
