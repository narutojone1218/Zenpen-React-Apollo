import {
  CONNECTIVITY_CHANGED,
} from './actions'

export default (store) => {
  if (__SERVER__) {
    return false
  }
  window.addEventListener('offline', () => {
    store.dispatch({
      type: CONNECTIVITY_CHANGED,
      payload: false,
    })
  })
  window.addEventListener('online', () => {
    store.dispatch({
      type: CONNECTIVITY_CHANGED,
      payload: true,
    })
  })
}
