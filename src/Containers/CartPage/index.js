import React from 'react'
import { compose } from 'react-apollo'
import styled from 'styled-components'
import Helmet from 'react-helmet'
import withData from './queries'
import Section from '../../Components/Section'
import Cart from '../../Components/Cart'
import ButtonLink from '../../Components/ButtonLink'
import { withTelemetry } from '../../Components/Telemetry'
import media from '../../util/styles/media'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'

const SectionSubStyled = styled(Section.Sub)`
  ${media.tablet`
    padding-left: 0;
    padding-right: 0;
  `}
`

const CheckoutContinueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.phone`
    flex-direction: column;
    > * {
      margin-bottom: 0.5em;
      &:last-child {
        margin-bottom: 0;
      }
    }
  `}
`

class CartPage extends React.Component {
  componentWillMount() {
    const title = 'My ZenPen Cart'
    // document.title = title
    this.props.telemetry.emitPageView(title)
  }

  renderCartComponent() {
    const { data } = this.props
    return (
      <React.Fragment>
        <Section.Sub>
          <CheckoutContinueWrapper>
            <ButtonLink color="gray" to="/blends"><i className="fa fa-chevron-left" aria-hidden="true" /> Continue Shopping</ButtonLink>
            <ButtonLink to="/checkout/shipping"><i className="fa fa-chevron-right" aria-hidden="true" /> Proceed to Checkout</ButtonLink>
          </CheckoutContinueWrapper>
        </Section.Sub>
        <SectionSubStyled>
          <Cart viewer={data.viewer} />
        </SectionSubStyled>        
      </React.Fragment>
    )
  }

  renderEmptyCartComponent() {
    return (
      <React.Fragment>
        <Section.Sub >
          <CheckoutContinueWrapper>
            <ButtonLink color="gray" to="/blends"><i className="fa fa-chevron-left" aria-hidden="true" /> Continue Shopping</ButtonLink>
          </CheckoutContinueWrapper>
        </Section.Sub>
        <Section.Sub>
          <p>No ZenPens! <i className="fa fa-thumbs-down" /></p>
        </Section.Sub>
      </React.Fragment>
    )
  }

  render() {
    let cartComponent = null
    const { data } = this.props
    if (data && data.viewer && data.viewer.cart) {
      cartComponent = this.renderCartComponent()
    } else {
      cartComponent = this.renderEmptyCartComponent()
    }
    return (
      <Section>
        <Helmet>
          <title>My ZenPen Cart</title>
        </Helmet>
        {cartComponent}
      </Section>
    )
  }
}

export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(CartPage)
