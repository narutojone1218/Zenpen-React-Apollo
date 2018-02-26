import jwt from 'jsonwebtoken'
import {
  AUTH_NEW_TOKEN,
  AUTH_INIT,
} from './actions'
import { setToken } from '../../util/session'

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_NEW_TOKEN:
      setToken(action.token)
      const newTokenPayload = jwt.decode(action.token)
      return {
        ...state,
        ...newTokenPayload,
        isAnonymous: newTokenPayload.sub === '__ANONYMOUS__',
      }
    case AUTH_INIT:
      if (!state.token) {
        return state
      }
      const initTokenPayload = jwt.decode(state.token)
      return {
        ...state,
        ...initTokenPayload,
        isAnonymous: initTokenPayload.sub === '__ANONYMOUS__',
      }
    default:
      return state
  }
  return state
}
