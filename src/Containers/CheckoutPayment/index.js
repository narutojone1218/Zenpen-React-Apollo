import React from 'react'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import withData from './queries'
import colors from '../../util/styles/colors'
import Section from '../../Components/Section'
import PaymentForm from '../../Components/PaymentForm'
import { withTelemetry } from '../../Components/Telemetry'
import { withPurchaseOrderMutation } from '../../Components/Cart/mutations'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import SectionLoader from '../../Components/SectionLoader'
import CartDetailTable from '../../Components/CartDetailTable'
import withAlertsHOC from '../../Components/Alerts/withAlertsHOC'

const GoBackWrapper = styled(Section.Sub) `
  text-align: center;
`

const GoBackLink = styled(Link)`
  text-decoration: none;
  color: ${colors.darkGray};
`

const InvoiceContainer = styled.div`
  background-color: white;
  border-radius: 0.3rem;
  padding: 0 1.5em;
`

const InvoiceHeader = styled.div`
  font-size: 1.5em;
  color: ${colors.darkGray};
  text-align: center;
`

const InvoiceBody = styled.div`

`

const InvoiceShippingAddress = styled.div`
  font-family: monospace;
  font-size: 1.3em;
  background-color: #efefef;
  padding: 1em;
  border-radius: 0.3em;
`

class CheckoutPayment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      valid: false,
      loading: false,
    }
    this.handleFormValidation = this.handleFormValidation.bind(this)
    this.handlePaymentFormSubmit = this.handlePaymentFormSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.data.viewer.account || !this.props.data.viewer.account.shippingAddress) {
      return this.props.history.push(`/checkout/shipping`)
    }
    if (!this.props.data.viewer.cart || !this.props.data.viewer.cart.quantity) {
      return this.props.history.push(`/`)
    }
    this.props.telemetry.emitPageView('My ZenPen Checkout - Payment')
  }

  handleFormValidation(valid) {
    this.setState({ valid })
  }

  handlePaymentFormSubmit(data) {
    this.props.clearAlerts()
    this.setState({
      loading: true,
    })
    this.props.purchaseOrder({
      variables: data,
    })
      .then(result => {
        if (result.data.purchaseOrder.changedOrder.paid) {
          this.props.history.push(`/checkout/order/${result.data.purchaseOrder.changedOrder.id}`)
        } else {
          this.props.addDangerAlert(result.data.purchaseOrder.changedTransaction.message)
          this.setState({
            loading: false,
          })
        }
      })
      .catch(result => {
        this.setState({
          loading: false,
        })
        this.props.addDangerAlert('An unknown error occurred processing your transaction. Please try again.')
      })
  }

  render() {
    const shippingAddress = this.props.data.viewer.account.shippingAddress
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Checkout - Payment</title>
        </Helmet>
        <Section.Sub paddingBottom grid>
          <Section.Row>
            <Section.Col flex="1">
              <SectionLoader isVisible={this.state.loading} />
              <PaymentForm
                form="payment"
                onSubmit={this.handlePaymentFormSubmit}
                canSubmit={this.state.valid}
                onValidation={this.handleFormValidation}
                account={this.props.data.viewer.account}
                title="Shipping & Delivery Details"
              />
              <GoBackWrapper paddingBottom grid>
                <GoBackLink to="/checkout/shipping"><i className="fa fa-chevron-left" /> Return to shipping information</GoBackLink>
              </GoBackWrapper>
            </Section.Col>
            <Section.Col flex="1">
              <InvoiceContainer>
                <Section.Sub>
                  <InvoiceHeader>Checkout Overview</InvoiceHeader>
                </Section.Sub>
                <Section.Sub>
                  <InvoiceBody>
                    <CartDetailTable cart={this.props.data.viewer.cart} />
                  </InvoiceBody>
                </Section.Sub>
                <Section.Sub>
                  <InvoiceHeader>Shipping Address</InvoiceHeader>
                </Section.Sub>
                <Section.Sub paddingBottom>
                  <InvoiceShippingAddress>
                    <p>{shippingAddress.firstName} {shippingAddress.lastName}</p>
                    <p>{shippingAddress.streetAddress}</p>
                    {shippingAddress.unit ? (<p>{shippingAddress.unit}</p>) : null}
                    <p>{shippingAddress.city}, {shippingAddress.region} {shippingAddress.postalCode}</p>
                    <p>{shippingAddress.country}</p>
                  </InvoiceShippingAddress>
                </Section.Sub>
              </InvoiceContainer>
            </Section.Col>
          </Section.Row>
        </Section.Sub>
      </Section>
    )
  }
}

export default compose(
  withTelemetry,
  withData,
  withPurchaseOrderMutation,
  apolloDataLoaderAnimationHOC(),
  withAlertsHOC,
  withRouter,
)(CheckoutPayment)
