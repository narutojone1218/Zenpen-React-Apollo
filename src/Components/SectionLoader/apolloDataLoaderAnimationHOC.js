import React from 'react'

import hoistStatics from 'hoist-non-react-statics'
import SectionLoader from './index'

class ApolloDataLoaderAnimationWrapper extends React.Component {

  constructor(props) {
    super(props)
    this.hasMounted = false
  }

  render() {
    const { componentProps, loaderProps, render } = this.props
    if (!this.hasMounted && componentProps.data && componentProps.data.loading === true) {
      return <SectionLoader {...loaderProps} />
    }
    this.hasMounted = true
    return render()
  }
}

export default (loaderProps = {}) => (Component) => {
  const C = componentProps => (
    <ApolloDataLoaderAnimationWrapper
      componentProps={componentProps}
      loaderProps={loaderProps}
      render={renderContainerProps => (
        <Component {...componentProps} {...renderContainerProps} />
        )}
    />
  )

  C.displayName = `ApolloDataLoaderAnimation_(${Component.displayName || Component.name})`
  C.WrappedComponent = Component

  return hoistStatics(C, Component)
}
