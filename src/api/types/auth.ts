export type AuthRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  access: string
  refresh: string
}

export type ForgotPasswordRequest = {
  email: string
}

export type ResetPasswordRequest = {
  uid: string
  token: string
  new_password: string
}

export type TokenRefreshResponse = {
  access: string
}
