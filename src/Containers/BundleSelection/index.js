import React from 'react'
import Section from '../../Components/Section'
import BundleSelector from '../../Components/BundleSelector'
import { withCreateUserBundleMutation } from '../../Components/UserBundle/mutations'
import { compose } from 'react-apollo'
import { withTelemetry } from '../../Components/Telemetry'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import { withRouter } from 'react-router'
import PropTypes from 'prop-types'

class BundleSelection extends React.Component {
  constructor(props) {
    super(props)
    this.handleCreateUserBundle = this.handleCreateUserBundle.bind(this)
  }

  componentWillMount() {
    const title = 'My ZenPen Bundles'
    // document.title = title
    this.props.telemetry.emitPageView(title)
  }

  handleCreateUserBundle(bundleConfig) {
    this.props.createUserBundle({
      variables: {
        bundleConfigId: bundleConfig.id,
      },
    })
      .then(({ data }) => (this.props.history.push('/bundles/builder')))
  }

  render() {
    return (
      <Section>
        <Section.Sub paddingBottom={2}>
          <BundleSelector onSelect={this.handleCreateUserBundle} />
        </Section.Sub>
      </Section>
    )
  }
}

BundleSelection.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  withCreateUserBundleMutation,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(BundleSelection)
