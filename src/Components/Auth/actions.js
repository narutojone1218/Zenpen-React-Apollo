export const AUTH_INIT = '@@redux/INIT'
export const AUTH_NEW_TOKEN = 'AUTH_NEW_TOKEN'

export const authInit = (token = null) => ({
  type: AUTH_INIT,
  token,
})

export const newToken = (token = null) => ({
  type: AUTH_NEW_TOKEN,
  token,
})

