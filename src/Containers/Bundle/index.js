import React from 'react'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import { Route } from 'react-router-dom'
import BundleSteps from '../../Components/BundleSteps'
import withData from './queries'
import BundleSelection from '../BundleSelection'
import BundleBuilder from '../BundleBuilder'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'

const BundleWrapper = styled.div`

`

class Bundle extends React.Component {
  render() {
    const { data, match } = this.props
    let step = 1
    let bundleConfig = null
    let userBundle = null
    if (data.viewer.userBundle) {
      step = 2
      bundleConfig = data.viewer.userBundle.bundleConfig
      userBundle = data.viewer.userBundle
      if (data.viewer.userBundle.inCart) {
        step = 4
      } else if (data.viewer.userBundle.remaining < 1) {
        step = 3
      }
    }
    return (
      <BundleWrapper>
        <BundleSteps userBundle={userBundle} bundleConfig={bundleConfig} step={step} />
        <Route path={`${match.url}/builder`} component={BundleBuilder} />
        <Route exact path={match.url} component={BundleSelection} />
      </BundleWrapper>
    )
  }
}

export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(Bundle)
