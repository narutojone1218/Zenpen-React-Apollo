import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'react-apollo'
import { connect } from 'react-redux'
import hoistStatics from 'hoist-non-react-statics'
import AuthModal from '../AuthModal/loadable'

class RequiresAuth extends React.Component {
  render() {
    if (this.props.isAnonymous) {
      return <AuthModal open={this.props.componentProps.open} />
    }
    return this.props.render()
  }
}

RequiresAuth.contextTypes = {
  telemetry: PropTypes.object,
}

const mapStateToProps = state => (
  { isAnonymous: state.auth.isAnonymous }
)

const RequiresAuthComposed = compose(connect(mapStateToProps))(RequiresAuth)

export default (Component) => {
  const C = componentProps => (
    <RequiresAuthComposed
      componentProps={componentProps}
      render={renderContainerProps => (
        <Component {...componentProps} {...renderContainerProps} />
      )}
    />
  )

  C.displayName = `RequiresAuth(${Component.displayName || Component.name})`
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}
