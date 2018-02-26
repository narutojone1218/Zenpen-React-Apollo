import performanceNow from 'performance-now'

import {
  BEACON_USER_TIMING,
} from './actions'

const timers = {}

export default store => next => (action) => {
  if (__SERVER__) {
    next(action)
  }
  if (action.type.substring(action.type.length - 5) === '_INIT') {
    timers[action.id] = performanceNow()
  } else if (action.type.substring(action.type.length - 7) === '_RESULT') {
    const diff = performanceNow() - timers[action.id]
    timers[action.id] = false
    store.dispatch({
      type: BEACON_USER_TIMING,
      payload: {
        timingCategory: 'client.graphql.query',
        timingVar: action.operationName,
        timingValue: diff,
      },
    })
  }
  return next(action)
}
