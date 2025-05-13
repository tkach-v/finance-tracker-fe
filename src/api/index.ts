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
  byId: (id: number) => `/categories/${id}/`
}

export const ACCOUNTS = {
  all: () => '/accounts/',
  byId: (id: number) => `/accounts/${id}/`
}

export const CURRENCIES = {
  all: () => '/currencies/'
}

export const TRANSACTIONS = {
  all: () => '/transactions/',
  byId: (id: number) => `/transactions/${id}/`
}

export const STATS = {
  transactions: () => '/stats/transactions/',
}
