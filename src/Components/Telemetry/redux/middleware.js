import { createMiddleware } from 'redux-beacon'
import { logger } from 'redux-beacon/extensions/logger'
import { offlineWeb } from 'redux-beacon/extensions/offline-web'
import { GoogleTagManager } from 'redux-beacon/targets/google-tag-manager'
import eventsMap from '../events'

import queryTimingMiddleware from './queryTimingMiddleware'

const offlineStorage = offlineWeb(state => (state.telemetry.isConnected))

const googleTagManagerMiddleware = createMiddleware(
  eventsMap,
  GoogleTagManager({ dataLayerName: '__gdl' }),
  { logger, offlineStorage },
)

export {
  googleTagManagerMiddleware,
  queryTimingMiddleware,
}

export default [
  queryTimingMiddleware,
  googleTagManagerMiddleware,
]
