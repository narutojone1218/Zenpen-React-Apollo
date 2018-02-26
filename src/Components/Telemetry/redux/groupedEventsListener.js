import {
  GROUPED_EVENT_GC,
} from './actions'
import debounce from '../../../util/debounce'

const eventIdCommitCache = {}

const reduceEvents = (events) => {
  const committed = []
  const reduced = {}
  for (let i = 0; i < events.length; i++) {
    committed.push(events[i].id)
    if (eventIdCommitCache[events[i].type] > events[i].id) {
      continue
    }
    if (!Array.isArray(reduced[events[i].type])) {
      reduced[events[i].type] = []
    }
    reduced[events[i].type].push(events[i].payload)
  }
  return { reduced, committed }
}

const dispatchEvents = (store, eventCollection) => {
  const { reduced, committed } = reduceEvents(eventCollection)
  store.dispatch({
    type: GROUPED_EVENT_GC,
    committed,
  })
  for (const [type, events] of Object.entries(reduced)) {
    store.dispatch({ type, events })
  }
}

const dispatchEventDebounced = debounce(dispatchEvents, 1000)

export default (store) => {
  let lastLength = 0
  return () => {
    const state = store.getState()
    const currentLength = state.telemetry.groupedEvents.length
    if (lastLength !== currentLength) {
      dispatchEventDebounced(store, state.telemetry.groupedEvents)
      lastLength = currentLength
    }
  }
}
