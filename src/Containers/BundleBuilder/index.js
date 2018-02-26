import React from 'react'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import Helmet from 'react-helmet'
import Section from '../../Components/Section'
import withData from './queries'
import SectionLoader from '../../Components/SectionLoader'
import Button from '../../Components/Button'
import BundleSlots from '../../Components/BundleSlots'
import { withTelemetry } from '../../Components/Telemetry'
import BundleCheckout from '../../Components/BundleCheckout'
import ButtonLink from '../../Components/ButtonLink'
import apolloDataLoaderAnimationHOC from '../../Components/SectionLoader/apolloDataLoaderAnimationHOC'
import media from '../../util/styles/media'

const CheckoutContinueWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  ${media.phone`
    font-size: 80%;
  `}
`

class BundleBuilder extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
    this.handleClearAllSelectionsClick = this.handleClearAllSelectionsClick.bind(this)
  }

  componentWillMount() {
    const title = `My ZenPen Bundles - ${this.props.data.viewer.userBundle.bundleConfig.title}`
    // document.title = title
    this.props.telemetry.emitPageView(title)
  }

  handleClearAllSelectionsClick() {
    this.setState({ loading: true })
    this.props.createUserBundle({
      variables: {
        bundleConfigId: this.props.data.viewer.userBundle.bundleConfig.id,
      },
    })
      .then(() => (this.setState({ loading: false })))
  }

  hasProducts() {
    return this.props.data.viewer.userBundle.products.edges.length > 0
  }

  render() {
    const { data } = this.props
    let bundleCheckoutComponent = null
    let actionsComponent = null
    if (data.viewer.userBundle.inCart === true) {
      actionsComponent = (
        <Section.Sub>
          <CheckoutContinueWrapper>
            <ButtonLink color="gray" to="/blends"><i className="fa fa-chevron-left" aria-hidden="true" /> Continue Shopping</ButtonLink>
            <ButtonLink to="/cart"><i className="fa fa-chevron-right" aria-hidden="true" /> Proceed to Cart</ButtonLink>
          </CheckoutContinueWrapper>
        </Section.Sub>
      )
    } else if (data.viewer.userBundle.remaining < 1) {
      bundleCheckoutComponent = (
        <Section.Sub>
          <BundleCheckout userBundleId={data.viewer.userBundle.id} />
        </Section.Sub>
      )
    } else {
      actionsComponent = (
        <Section.Sub>
          <CheckoutContinueWrapper>
            <ButtonLink color="gray" to="/bundles"><i className="fa fa-chevron-left" aria-hidden="true" /> Change Bundle</ButtonLink>
            <Button
              display="inline-block"
              disabled={!this.hasProducts()}
              color="gray"
              onClick={this.handleClearAllSelectionsClick}
            >
              <i className="fa fa-times" /> Clear All Selections
            </Button>
          </CheckoutContinueWrapper>
        </Section.Sub>
      )
    }
    return (
      <Section>
        <Helmet>
          <title>My ZenPen</title>
        </Helmet>
        <SectionLoader isVisible={this.state.loading} size="medium" />
        {bundleCheckoutComponent}
        {actionsComponent}
        <Section.Sub paddingBottom={2}>
          <BundleSlots userBundle={data.viewer.userBundle} />
        </Section.Sub>
      </Section>
    )
  }
}

export default compose(
  withData,
  withTelemetry,
  apolloDataLoaderAnimationHOC(),
)(BundleBuilder)
