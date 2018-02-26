import TelemetryProvider from './provider'
import telemetryReducer from './redux/reducer'
import telemetryMiddleware from './redux/middleware'

import registerGroupedEventListener from './redux/groupedEventsListener'
import registerConnectivityEventEmitter from './redux/connectivityEventEmitter'

import withTelemetryOnClick from './hoc/withTelemetryOnClick'
import withTelemetryOnVisible from './hoc/withTelemetryOnVisible'
import withTelemetryOnMounted from './hoc/withTelemetryOnMounted'
import withTelemetry from './hoc/withTelemetry'

export const registerTelemetryStoreEvents = (store) => {
  registerConnectivityEventEmitter(store)
  store.subscribe(registerGroupedEventListener(store))
}

export {
  TelemetryProvider,
  telemetryReducer,
  telemetryMiddleware,
  withTelemetryOnClick,
  withTelemetryOnVisible,
  withTelemetryOnMounted,
  withTelemetry,
}
