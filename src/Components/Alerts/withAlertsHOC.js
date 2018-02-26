import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { addAlert, clearAlerts } from './actions'

class AlertsContext extends React.Component {
  render() {
    const {
      componentProps,
      render: renderComponent,
      ...actions
    } = this.props
    return renderComponent(actions)
  }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  addSuccessAlert: message => dispatch(addAlert('success', message)),
  addWarningAlert: message => dispatch(addAlert('warning', message)),
  addDangerAlert: message => dispatch(addAlert('danger', message)),
  addInfoAlert: message => dispatch(addAlert('info', message)),
  clearAlerts: () => dispatch(clearAlerts()),
})

const AlertsContextConnected = compose(connect(mapStateToProps, mapDispatchToProps))(AlertsContext)

export default (Component) => {
  const C = componentProps => (
    <AlertsContextConnected
      componentProps={componentProps}
      render={renderContainerProps => (
        <Component {...componentProps} {...renderContainerProps} />
      )}
    />
  )

  C.displayName = `AlertsContext(${Component.displayName || Component.name})`
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}
