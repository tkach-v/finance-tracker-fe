export type AuthRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access: string
  refresh: string
}

export type TokenRefreshResponse = {
  access: string
}
