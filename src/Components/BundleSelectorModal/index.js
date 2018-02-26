import React from 'react'
import { compose } from 'react-apollo'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import BundleSelector from '../../Components/BundleSelector'
import { withCreateUserBundleMutation } from '../../Components/UserBundle/mutations'
import Modal from '../Modal'

class BundleSelectorModal extends React.Component {
  constructor(props) {
    super(props)
    this.handleUserBundleSelected = this.handleUserBundleSelected.bind(this)
  }

  handleUserBundleSelected(bundleConfig, initialProductIds) {
    this.props.createUserBundle({
      variables: {
        bundleConfigId: bundleConfig.id,
        initialProductIds,
      },
    })
      .then(({ data }) => (this.props.history.push('/bundles/builder')))
  }

  render() {
    const {
      open,
      ...remainingProps
    } = this.props
    return (
      <Modal transparent title="Please select a bundle" open={open}>
        <BundleSelector {...remainingProps} onSelect={this.handleUserBundleSelected} />
      </Modal>
    )
  }
}

BundleSelectorModal.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  withCreateUserBundleMutation,
)(BundleSelectorModal)
