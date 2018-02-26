export const TELEMETRY_READY = 'Telemetry.Core.READY'
export const CONNECTIVITY_CHANGED = 'Telemetry.Core.CONNECTIVITY_CHANGED'

export const BEACON_PAGE_VIEW = 'Telemetry.Beacons.PAGE_VIEW'
export const BEACON_EVENT = 'Telemetry.Beacons.EVENT'
export const BEACON_USER_TIMING = 'Telemetry.Beacons.BEACON_USER_TIMING'
export const BEACON_SOCIAL_INTERACTION = 'Telemetry.Beacons.SOCIAL_INTERACTION'
export const BEACON_ECOMMERCE_ITEM = 'Telemetry.Beacons.ECOMMERCE_ITEM'
export const BEACON_ECOMMERCE_TRANSACTION = 'Telemetry.Beacons.ECOMMERCE_TRANSACTION'
export const BEACON_EXCEPTION = 'Telemetry.Beacons.EXCEPTION'

export const BEACON_ECOMMERCE_IMPRESSIONS = 'Telemetry.Beacons.ECOMMERCE_IMPRESSIONS'
export const BEACON_ECOMMERCE_CLICK = 'Telemetry.Beacons.ECOMMERCE_CLICK'
export const BEACON_ECOMMERCE_DETAIL = 'Telemetry.Beacons.ECOMMERCE_ECOMMERCE_DETAIL'
export const BEACON_ECOMMERCE_ADD_TO_CART = 'Telemetry.Beacons.ECOMMERCE_ADD_TO_CART'
export const BEACON_ECOMMERCE_REMOVE_FROM_CART = 'Telemetry.Beacons.ECOMMERCE_REMOVE_FROM_CART'
export const BEACON_ECOMMERCE_PROMO_IMPRESSIONS = 'Telemetry.Beacons.ECOMMERCE_PROMO_IMPRESSIONS'
export const BEACON_ECOMMERCE_PROMO_CLICK = 'Telemetry.Beacons.ECOMMERCE_PROMO_CLICK'

export const GROUPED_EVENT_COLLECT = 'Telemetry.GroupedEvent.COLLECT'
export const GROUPED_EVENT_GC = 'Telemetry.GroupedEvent.GC'

let groupedEventId = 1

export const immediateEvent = (type, payload) => ({
  type,
  payload,
})

export const groupedEvent = (eventType, eventPayload) => ({
  type: GROUPED_EVENT_COLLECT,
  eventId: groupedEventId++,
  eventType,
  eventPayload,
})
