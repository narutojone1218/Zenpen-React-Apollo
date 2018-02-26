import store from 'store'

const TOKEN_STORE_KEY = '__token'

const setCookie = (name, value, expireDays) => {
  const d = new Date()
  d.setTime(d.getTime() + (expireDays * 24 * 60 * 60 * 1000))
  const expires = `expires=${d.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

const getCookie = (name) => {
  const namePre = `${name}=`
  const ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(namePre) === 0) {
      return c.substring(namePre.length, c.length)
    }
  }
  return null
}

if (__CLIENT__) {
  setCookie(TOKEN_STORE_KEY, '', 0)
}

export const setToken = (token) => {
  if (__SERVER__) {
    return
  }
  setCookie(TOKEN_STORE_KEY, '', 0)
  setCookie(TOKEN_STORE_KEY, token, 30)
  store.set(TOKEN_STORE_KEY, token)
  window.__TOKEN__ = token
}

export const getToken = () => {
  if (__SERVER__) {
    return null
  }
  const windowToken = window.__TOKEN__
  const storeToken = store.get(TOKEN_STORE_KEY)
  const cookieToken = getCookie(TOKEN_STORE_KEY)
  if (windowToken && (windowToken !== storeToken || windowToken !== cookieToken)) {
    setToken(windowToken)
    return windowToken
  }
  return windowToken || storeToken || cookieToken || null
}
