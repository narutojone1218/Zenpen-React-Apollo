import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

class TelemetryContext extends React.Component {
  render() {
    return this.props.render({ telemetry: this.context.telemetry })
  }
}

TelemetryContext.contextTypes = {
  telemetry: PropTypes.object,
}

export default (Component) => {
  const C = componentProps => (
    <TelemetryContext
      componentProps={componentProps}
      render={renderContainerProps => (
        <Component {...componentProps} {...renderContainerProps} />
      )}
    />
  )

  C.displayName = `TelemetryContext(${Component.displayName || Component.name})`
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}
