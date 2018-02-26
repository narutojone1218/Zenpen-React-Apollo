import React from 'react'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import styled from 'styled-components'
import withData from './queries'
import colors from '../../util/styles/colors'
import Section from '../../Components/Section'
import { withTelemetry } from '../../Components/Telemetry'
import { withPurchaseOrderMutation } from '../../Components/Cart/mutations'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import CartDetailTable from '../../Components/CartDetailTable'
import { withAlertsHOC } from '../../Components/Alerts'

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
  componentDidMount() {
    this.props.telemetry.emitPageView('My ZenPen Checkout - Complete')
  }

  render() {
    const shippingAddress = this.props.data.order.shippingAddress
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Checkout - Complete</title>
        </Helmet>
        <Section.Header>
          <Section.Title>Thank You!</Section.Title>
          <Section.SubTitle>Your ZenPens will be on their way to you shortly</Section.SubTitle>
        </Section.Header>
        <Section.Sub paddingBottom grid>
          <Section.Row>
            <Section.Col flex="1">
              <InvoiceContainer>
                <Section.Sub>
                  <InvoiceHeader>Checkout Overview</InvoiceHeader>
                </Section.Sub>
                <Section.Sub>
                  <InvoiceBody>
                    <CartDetailTable cart={this.props.data.order.cart} />
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
  withAlertsHOC,
  apolloDataLoaderAnimationHOC(),
)(CheckoutPayment)
