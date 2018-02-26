import React from 'react'
import PropTypes from 'prop-types'

export default class TelemetryWrapper extends React.Component {
  emitTelemetryEvent() {
    let payload = {}
    if (this.props.mapPropsToTelemetryPayload !== null) {
      payload = this.props.mapPropsToTelemetryPayload(this.props.componentProps)
    }
    this.context.telemetry[this.props.eventType](payload)
  }

  getWrapperProps() {
    return {}
  }

  render() {
    return this.props.render(this.getWrapperProps())
  }
}

TelemetryWrapper.defaultProps = {
  mapPropsToTelemetryPayload: null,
  componentProps: {},
}

TelemetryWrapper.contextTypes = {
  telemetry: PropTypes.object,
}
