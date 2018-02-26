import React from 'react'

import TelemetryWrapper from './TelemetryWrapper'
import makeHOC from './factory'

class TelemetryOnClickWrapper extends TelemetryWrapper {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    this.emitTelemetryEvent()
  }

  getWrapperProps() {
    return {
      onClick: this.handleClick,
    }
  }
}

export default makeHOC(TelemetryOnClickWrapper)
