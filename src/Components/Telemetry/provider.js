import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { withRouter } from 'react-router'
import performanceNow from 'performance-now'

import {
  TELEMETRY_READY,
  BEACON_EVENT,
  BEACON_PAGE_VIEW,
  BEACON_SOCIAL_INTERACTION,
  BEACON_USER_TIMING,
  BEACON_ECOMMERCE_IMPRESSIONS,
  BEACON_ECOMMERCE_CLICK,
  BEACON_ECOMMERCE_DETAIL,
  BEACON_ECOMMERCE_PROMO_CLICK,
  BEACON_ECOMMERCE_PROMO_IMPRESSIONS,
  groupedEvent,
  immediateEvent,
} from './redux/actions'

import { Children } from 'react'

class TelemetryProvider extends React.Component {
  constructor(props) {
    super(props)
    this.waitForGTMAvailable = this.waitForGTMAvailable.bind(this)
    this.timers = {}
  }

  emitEvent(eventCategory, eventAction, eventValue = null, eventLabel = null) {
    this.emitImmediateEvent(BEACON_EVENT, {
      eventCategory,
      eventAction,
      eventValue,
      eventLabel,
    })
  }

  emitSocialInteraction(socialNetwork, socialAction, socialTarget) {
    this.emitImmediateEvent(BEACON_SOCIAL_INTERACTION, {
      socialNetwork,
      socialAction,
      socialTarget,
    })
  }

  emitPageView(title = null) {
    this.emitImmediateEvent(BEACON_PAGE_VIEW, {
      location: this.props.location.pathname,
      title,
    })
  }

  emitEcommItem() {

  }

  emitEcommTransaction() {

  }

  emitException() {

  }

  emitImmediateEvent(type, payload) {
    if (this.props.ssr) {
      return
    }
    this.props.dispatchImmediateEvent(type, payload)
  }

  emitGroupedEvent(type, payload) {
    if (this.props.ssr) {
      return
    }
    this.props.dispatchGroupedEvent(type, payload)
  }

  emitEcommerceImpression(product) {
    this.emitGroupedEvent(BEACON_ECOMMERCE_IMPRESSIONS, product)
  }

  emitEcommerceClick(product) {
    this.emitGroupedEvent(BEACON_ECOMMERCE_CLICK, product)
  }

  emitEcommerceDetail(product) {
    this.emitGroupedEvent(BEACON_ECOMMERCE_DETAIL, product)
  }

  emitEcommercePromoImpression(promo) {
    this.emitGroupedEvent(BEACON_ECOMMERCE_PROMO_IMPRESSIONS, promo)
  }

  emitEcommercePromoClick(promo) {
    this.emitGroupedEvent(BEACON_ECOMMERCE_PROMO_CLICK, promo)
  }

  makeTimer(timingCategory, timingVar) {
    const name = `__TELEMETRY_CUSTOM_TIMER__${timingCategory}.${timingVar}`
    const timer = {
      name,
      start: performanceNow(),
      props: {
        timingCategory,
        timingVar,
      },
    }
    this.timers[name] = timer
    return timer
  }

  endTimer(timer) {
    const timingLabel = null
    const timingValue = performanceNow() - this.timers[timer.name].start
    this.timers[timer.name] = false
    this.emitImmediateEvent(BEACON_USER_TIMING, {
      timingValue,
      timingLabel,
      ...this.timers[timer.name].props,
    })
  }

  waitForGTMAvailable() {
    if (this.props.ssr) {
      return
    }
    if (!window.google_tag_manager) {
      return setTimeout(this.waitForGTMAvailable, 100)
    }
    const diff = performanceNow() - window.__app_bench
    this.emitImmediateEvent(TELEMETRY_READY, {
      timingCategory: 'app',
      timingVar: 'init',
      timingValue: diff,
    })
  }

  componentDidMount() {
    this.waitForGTMAvailable()
  }

  getChildContext() {
    return {
      telemetry: {
        emitEvent: this.emitEvent.bind(this),
        emitSocialInteraction: this.emitSocialInteraction.bind(this),
        emitPageView: this.emitPageView.bind(this),
        emitEcommItem: this.emitEcommItem.bind(this),
        emitEcommTransaction: this.emitEcommTransaction.bind(this),
        emitException: this.emitException.bind(this),
        emitGroupedEvent: this.emitGroupedEvent.bind(this),
        emitEcommerceImpression: this.emitEcommerceImpression.bind(this),
        emitEcommerceClick: this.emitEcommerceClick.bind(this),
        emitEcommerceDetail: this.emitEcommerceDetail.bind(this),
      },
    }
  }

  render() {
    return Children.only(this.props.children)
  }
}

TelemetryProvider.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatchImmediateEvent: PropTypes.func.isRequired,
  dispatchGroupedEvent: PropTypes.func.isRequired,
}

TelemetryProvider.childContextTypes = {
  telemetry: PropTypes.object,
}

export default compose(
  withRouter,
  connect(
    _ => _,
    dispatch => ({
      dispatchImmediateEvent: (type, payload) => (dispatch(immediateEvent(type, payload))),
      dispatchGroupedEvent: (type, payload) => (dispatch(groupedEvent(type, payload))),
    }),
  ),
)(TelemetryProvider)
