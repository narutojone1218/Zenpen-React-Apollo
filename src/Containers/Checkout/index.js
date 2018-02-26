import React from 'react'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import CartSteps from '../../Components/CartSteps'
import CheckoutShipping from '../CheckoutShipping'
import CheckoutPayment from '../CheckoutPayment'
import CheckoutComplete from '../CheckoutComplete'
import AlertContainer from '../../Components/Alerts/AlertContainer'
import Section from '../../Components/Section'

const CheckoutWrapper = styled.div`

`

const CheckoutContentWrapper = styled.div`
  position: relative;
`

class Checkout extends React.Component {
  componentWillMount() {
    if (this.context.disableNavBar) {
      this.context.disableNavBar()
    }
  }

  componentWillUnmount() {
    if (this.context.enableNavBar) {
      this.context.enableNavBar()
    }
  }

  render() {
    const { match, location } = this.props
    let step = 1
    if (location.pathname === `${match.url}/shipping`) {
      step = 2
    } else if (location.pathname === `${match.url}/payment`) {
      step = 3
    } else if (location.pathname.startsWith(`${match.url}/order`)) {
      step = 4
    }
    return (
      <CheckoutWrapper>
        <CartSteps step={step} />
        <CheckoutContentWrapper>
          <Section>
            <Section.Sub paddingTop={false}>
              <AlertContainer fixed />
            </Section.Sub>
          </Section>
          <Switch>
            <Route path={`${match.url}/shipping`} component={CheckoutShipping} />
            <Route path={`${match.url}/payment`} component={CheckoutPayment} />
            <Route path={`${match.url}/order/:orderId`} component={CheckoutComplete} />
          </Switch>
        </CheckoutContentWrapper>
      </CheckoutWrapper>
    )
  }
}

Checkout.contextTypes = {
  disableNavBar: PropTypes.func.isRequired,
  enableNavBar: PropTypes.func.isRequired,
}

export default Checkout
