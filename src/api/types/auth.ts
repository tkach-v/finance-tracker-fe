export type AuthRequest = {
  email: string
  password: string
}

export type TokenRefreshResponse = {
  access: string
}
