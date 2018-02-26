import React from 'react'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import { withRouter } from 'react-router'
import withData from './queries'
import Section from '../../Components/Section'
import ShippingForm from '../../Components/ShippingForm'
import { withTelemetry } from '../../Components/Telemetry'
import { withCreateShippingAddressMutation } from '../../Components/Address/mutations'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import Cart from '../../Components/Cart'
import { MediaQueryComponent } from '../../util/styles/media'
import withAlertsHOC from '../../Components/Alerts/withAlertsHOC'

class CheckoutShipping extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      loading: false,
    }
    this.handleShippingFormChangeDebounced = this.handleShippingFormChangeDebounced.bind(this)
    this.handleFormValidation = this.handleFormValidation.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.data.viewer.cart || !this.props.data.viewer.cart.quantity) {
      return this.props.history.push(`/`)
    }
    this.props.telemetry.emitPageView('My ZenPen Checkout - Shipping')
  }

  handleFormValidation(valid) {
    this.setState({ valid })
  }

  handleFormSubmit(data) {
    this.props.clearAlerts()
    this.setState({ loading: true })
    const { shippingAddress, ...otherAddressData } = data
    this.props.createShippingAddress({
      variables: { ...otherAddressData, ...shippingAddress },
    })
      .then(result => {
        this.props.history.push(`/checkout/payment`)
      })
      .catch(result => {
        this.props.addDangerAlert('An error occurred submitting your information, please try again.')
        this.setState({ loading: false })
      })
  }

  handleShippingFormChangeDebounced(data) {
    this.props.clearAlerts()
    const { shippingAddress, ...otherAddressData } = data
    this.props.createShippingAddress({
      variables: { ...otherAddressData, ...shippingAddress },
    })
      .catch(() => {})
  }

  render() {
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Checkout - Shipping</title>
        </Helmet>
        <Section.Sub paddingBottom grid>
          <Section.Row>
            <Section.Col flex="1">
              <ShippingForm
                canSubmit={this.state.valid}
                loading={this.state.loading}
                onSubmit={this.handleFormSubmit}
                onValidation={this.handleFormValidation}
                account={this.props.data.viewer.account}
                onChangeDebounced={this.handleShippingFormChangeDebounced}
                title="Shipping & Delivery Details"
              />
            </Section.Col>
            <MediaQueryComponent.notTablet>
              <Section.Col flex="1">
                <Section.Sub wide paddingTop={0} paddingBottom>
                  <Cart small controls={false} viewer={this.props.data.viewer} />
                </Section.Sub>
              </Section.Col>
            </MediaQueryComponent.notTablet>
          </Section.Row>
        </Section.Sub>
      </Section>
    )
  }
}

export default compose(
  withTelemetry,
  withData,
  withCreateShippingAddressMutation,
  apolloDataLoaderAnimationHOC(),
  withRouter,
  withAlertsHOC,
)(CheckoutShipping)
