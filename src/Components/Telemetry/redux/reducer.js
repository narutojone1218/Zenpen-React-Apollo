import {
  TELEMETRY_READY,
  BEACON_PAGE_VIEW,
  CONNECTIVITY_CHANGED,
  GROUPED_EVENT_COLLECT,
  GROUPED_EVENT_GC,
} from './actions'

export const initialState = {
  currentPage: '/',
  isConnected: false,
  groupedEvents: [],
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case BEACON_PAGE_VIEW:
      state.currentPage = action.payload
      return state

    case CONNECTIVITY_CHANGED:
      state.isConnected = action.payload
      return state

    case TELEMETRY_READY:
      state.isConnected = true
      return state

    case GROUPED_EVENT_COLLECT:
      state.groupedEvents.push({
        id: action.eventId,
        type: action.eventType,
        payload: action.eventPayload,
      })
      return state

    case GROUPED_EVENT_GC:
      state.groupedEvents = state.groupedEvents.filter(event => (action.committed.indexOf(event.id) === -1))
      return state

    default:
      return state
  }
}

reducer.initialState = initialState

export default reducer
