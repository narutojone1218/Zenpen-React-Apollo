import React from 'react'
import PropTypes from 'prop-types'
import hoistStatics from 'hoist-non-react-statics'

export default WrapperComponent => (eventType, mapPropsToTelemetryPayload = null) => (Component) => {
  const C = (componentProps) => {
    const { wrappedComponentRef, ...remainingProps } = componentProps
    return (
      <WrapperComponent
        eventType={eventType}
        mapPropsToTelemetryPayload={mapPropsToTelemetryPayload}
        componentProps={remainingProps}
        render={renderContainerProps => (
          <Component {...remainingProps} {...renderContainerProps} ref={wrappedComponentRef} />
        )}
      />
    )
  }

  C.displayName = `Telemetry_${eventType}(${Component.displayName || Component.name})`
  C.WrappedComponent = Component
  C.propTypes = {
    wrappedComponentRef: PropTypes.func,
  }

  return hoistStatics(C, Component)
}
