import React from 'react'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { withCreateUserBundleMutation } from '../../Components/UserBundle/mutations'
import Modal from '../Modal'
import LoginForm from '../LoginForm'
import RegistrationForm from '../RegistrationForm'
import Section from '../Section'
import FacebookLoginButton from '../FacebookLoginButton'

const SocialLoginRow = styled.div`
  margin-bottom: 1em;
`

class AuthModal extends React.Component {
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
    } = this.props
    return (
      <Modal transparent title="Please sign in to continue" open={open}>
        <Section.Row>
          <Section.Col flex={1}>
            <SocialLoginRow>
              <FacebookLoginButton />
            </SocialLoginRow>
          </Section.Col>
          <Section.Col flex={1} />
        </Section.Row>
        <Section.Row>
          <Section.Col flex={1}>
            <LoginForm />
          </Section.Col>
          <Section.Col flex={1}>
            <RegistrationForm />
          </Section.Col>
        </Section.Row>
      </Modal>
    )
  }
}

AuthModal.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
}

export default compose(
  withRouter,
  withCreateUserBundleMutation,
)(AuthModal)
