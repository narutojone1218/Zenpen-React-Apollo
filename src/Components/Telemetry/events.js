import {
  TELEMETRY_READY,
  BEACON_PAGE_VIEW,
  BEACON_USER_TIMING,
  BEACON_EVENT,
  BEACON_ECOMMERCE_IMPRESSIONS,
  BEACON_ECOMMERCE_DETAIL,
  BEACON_ECOMMERCE_CLICK,
  BEACON_ECOMMERCE_PROMO_IMPRESSIONS,
  BEACON_ECOMMERCE_PROMO_CLICK,
} from './redux/actions'

const event = action => ({
  hitType: 'event',
  ...action.payload,
})

const pageView = action => ({
  hitType: 'pageview',
  ...action.payload,
})

const userTiming = action => ({
  hitType: 'timing',
  ...action.payload,
})

const telemetryInitialized = action => ({
  hitType: 'timing',
  ...action.payload,
})

const ecommerceImpressions = action => ({
  hitType: 'event',
  ecommerce: {
    impressions: action.events,
  },
  eventCategory: 'Ecommerce',
  eventAction: 'Impression',
})

const ecommerceClick = action => ({
  hitType: 'event',
  ecommerce: {
    click: {
      products: action.events,
    },
  },
  eventCategory: 'Ecommerce',
  eventAction: 'Click',
})

const ecommerceDetail = action => ({
  hitType: 'event',
  ecommerce: {
    detail: {
      products: action.events,
    },
  },
  eventCategory: 'Ecommerce',
  eventAction: 'Detail',
})

const ecommercePromoImpressions = action => ({
  hitType: 'event',
  ecommerce: {
    promoView: {
      promotions: action.events,
    },
  },
  eventCategory: 'Ecommerce',
  eventAction: 'PromoImpression',
})

const ecommercePromoClick = action => ({
  hitType: 'event',
  ecommerce: {
    promoClick: {
      promotions: action.events,
    },
  },
  eventCategory: 'Ecommerce',
  eventAction: 'PromoClick',
})

export default {
  [BEACON_PAGE_VIEW]: pageView,
  [BEACON_EVENT]: event,
  [BEACON_USER_TIMING]: userTiming,
  [TELEMETRY_READY]: telemetryInitialized,
  [BEACON_ECOMMERCE_IMPRESSIONS]: ecommerceImpressions,
  [BEACON_ECOMMERCE_DETAIL]: ecommerceDetail,
  [BEACON_ECOMMERCE_CLICK]: ecommerceClick,
  [BEACON_ECOMMERCE_PROMO_IMPRESSIONS]: ecommercePromoImpressions,
  [BEACON_ECOMMERCE_PROMO_CLICK]: ecommercePromoClick,
}
