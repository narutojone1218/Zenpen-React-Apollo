import React from 'react'

import TelemetryWrapper from './TelemetryWrapper'
import makeHOC from './factory'

class TelemetryOnMountedWrapper extends TelemetryWrapper {
  componentDidMount() {
    this.emitTelemetryEvent()
  }
}

export default makeHOC(TelemetryOnMountedWrapper)
