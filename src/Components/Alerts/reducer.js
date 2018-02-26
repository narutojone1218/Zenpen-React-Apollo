import {
  ADD_ALERT,
  REMOVE_ALERT,
  CLEAR_ALERTS,
} from './actions'

const initialState = []

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALERT:
      return ([...state, {
        id: getAlertId(action.alert),
        ...action.alert,
      }])
    case REMOVE_ALERT:
      return state.filter(({ id }) => id !== action.id)
    case CLEAR_ALERTS:
      return initialState
    default:
      return state
  }
  return state
}

reducer.initialState = initialState

const getAlertId = alert => `alert__${JSON.stringify(Object.values(alert)).replace(/\W/g, '_')}`

export default reducer