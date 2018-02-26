import React from 'react'

import TelemetryWrapper from './TelemetryWrapper'
import VisibilitySensor from 'react-visibility-sensor'
import makeHOC from './factory'

class TelemetryOnVisibleWrapper extends TelemetryWrapper {
  constructor(props) {
    super(props)
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this)
  }

  handleVisibilityChange(isVisible) {
    if (isVisible) {
      this.emitTelemetryEvent()
    }
  }

  render() {
    return (
      <VisibilitySensor onChange={this.handleVisibilityChange}>
        {super.render()}
      </VisibilitySensor>
    )
  }
}

export default makeHOC(TelemetryOnVisibleWrapper)
