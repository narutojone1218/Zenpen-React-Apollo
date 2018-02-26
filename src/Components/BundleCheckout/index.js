import React from 'react'
import { compose } from 'react-apollo'
import Button from '../../Components/Button'
import * as C from './components'
import apolloDataLoaderAnimationHOC from '../SectionLoader/apolloDataLoaderAnimationHOC'
import withData from './queries'
import { withAddCartableToCartMutation } from '../Cart/mutations'
import { withUpdateUserBundleMutation } from '../UserBundle/mutations'
import SectionLoader from '../SectionLoader'
import { withTelemetry } from '../Telemetry'

class BundleCheckout extends React.Component {
  constructor(props) {
    super(props)
    const userBundle = this.props.data.userBundle
    this.state = {
      selectedBundleConfig: userBundle.bundleConfig.upsell ? userBundle.bundleConfig.upsell : userBundle.bundleConfig,
      loading: false,
    }
    this.handleCheckoutOptionChange = this.handleCheckoutOptionChange.bind(this)
    this.handleAddToCartClick = this.handleAddToCartClick.bind(this)
    this.updateUserBundle = this.updateUserBundle.bind(this)
    this.addUserBundleToCart = this.addUserBundleToCart.bind(this)
  }

  updateUserBundle() {
    return this.props.updateUserBundle({
      variables: {
        id: this.props.data.userBundle.id,
        bundleConfigId: this.state.selectedBundleConfig.id,
      },
    })
  }

  addUserBundleToCart() {
    this.props.addCartableToCart({
      variables: {
        cartableType: this.props.data.userBundle.__typename,
        cartableId: this.props.data.userBundle.id,
        quantity: 1,
      },
    })
  }

  handleAddToCartClick() {
    this.setState({ loading: true })
    let promise = Promise.resolve()
    if (this.props.data.userBundle.bundleConfig.id !== this.state.selectedBundleConfig.id) {
      promise = this.updateUserBundle()
    }
    promise.then(this.addUserBundleToCart)
      .then(() => (this.setState({ loading: false })))

    this.props.telemetry.emitEvent('product.cart', 'add', this.props.data.userBundle.bundleConfig.slug)
  }

  handleCheckoutOptionChange(bundleConfigId, selectedBundleConfig) {
    this.setState({ selectedBundleConfig })
  }

  render() {
    const { data: { userBundle } } = this.props

    const addToCartButton = (
      <Button
        onClick={this.handleAddToCartClick}
        expandToParent
        color="blue">
        <i className="fa fa-shopping-cart" /> Add Bundle to Cart
      </Button>
    )

    if (userBundle.bundleConfig.upsell) {
      return (
        <C.CheckoutWrapper>
          <SectionLoader isVisible={this.state.loading} />
          <C.CheckoutInner>
            <C.CheckoutHeader>
              <C.CheckoutPricing bundleConfig={this.state.selectedBundleConfig} />
              <C.InStockWrapper>
                <i className="fa fa-check" /> All In Stock
              </C.InStockWrapper>
            </C.CheckoutHeader>
            <C.CheckoutOptions
              value={this.state.selectedBundleConfig.id}
              bundleConfigs={[userBundle.bundleConfig.upsell, userBundle.bundleConfig]}
              onChange={this.handleCheckoutOptionChange}
            />
            <C.CheckoutActionsWrapper>
              {addToCartButton}
            </C.CheckoutActionsWrapper>
          </C.CheckoutInner>
        </C.CheckoutWrapper>
      )
    }
    return (
      <C.CheckoutWrapper>
        <SectionLoader isVisible={this.state.loading} />
        <C.CheckoutInner>
          <C.CheckoutHeader>
            <C.InStockWrapper>
              <i className="fa fa-check" /> All In Stock
            </C.InStockWrapper>
          </C.CheckoutHeader>
          <C.CheckoutActionsWrapper>
            {addToCartButton}
          </C.CheckoutActionsWrapper>
        </C.CheckoutInner>
      </C.CheckoutWrapper>
    )
  }
}

export default compose(
  withData,
  apolloDataLoaderAnimationHOC(),
  withAddCartableToCartMutation,
  withUpdateUserBundleMutation,
  withTelemetry,
)(BundleCheckout)
