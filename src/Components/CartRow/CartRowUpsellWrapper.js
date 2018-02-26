import React from 'react'
import { compose } from 'react-apollo'
import Tooltip from 'rc-tooltip'
import gql from 'graphql-tag'
import * as C from './components'
import Button from '../Button'
import { withUpdateUserBundleMutation } from '../UserBundle/mutations'
import SectionLoader from '../SectionLoader'

class CartRowUpsellWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
    this.handleUpgradeUserBundle = this.handleUpgradeUserBundle.bind(this)
  }

  handleUpgradeUserBundle() {
    this.setState({ loading: true })
    return this.props.updateUserBundle({
      variables: {
        id: this.props.userBundle.id,
        bundleConfigId: this.props.upsell.id,
      },
    })
      .then(_ => this.setState({ loading: false }))
  }

  render() {
    const {
      className,
      upsell,
      children,
    } = this.props
    return (
      <C.UpsellWrapper className={className}>
        <C.UpsellWrapperInner>
          <SectionLoader isVisible={this.state.loading} />
          <C.UpsellContentWrapper>
            <C.UpsellHeader>
              <C.UpsellDetails>
                <C.UpsellTitle>
                  <Tooltip
                    placement="right"
                    trigger={['click', 'hover']}
                    overlay={(
                      <C.UpsellTooltipContentWrapper>
                        <C.UpsellDescription>{upsell.addToCartDescription}</C.UpsellDescription>
                        <C.UpsellPromoText>{upsell.addToCartPromoText}</C.UpsellPromoText>
                      </C.UpsellTooltipContentWrapper>
                    )}
                  >
                    <C.UpsellTitleTooltipIconWrapper href="#">{upsell.addToCartTitle} <i className="fa fa-question-circle-o" /></C.UpsellTitleTooltipIconWrapper>
                  </Tooltip>
                </C.UpsellTitle>
                <C.UpsellPricing>
                  <C.PriceWrapper> {upsell.price.formatted} </C.PriceWrapper>
                  <C.ListedPriceWrapper> {upsell.listedPrice.formatted} </C.ListedPriceWrapper>
                  <C.SavingsWrapper> (Save {upsell.savingsPercent}) </C.SavingsWrapper>
                </C.UpsellPricing>
                <C.UpsellPromoText>{upsell.promoText}</C.UpsellPromoText>
              </C.UpsellDetails>
              <C.UpsellActions>
                <Button color="blue" onClick={this.handleUpgradeUserBundle}>{upsell.addToCartTitle}</Button>
              </C.UpsellActions>
            </C.UpsellHeader>
            <C.UpsellChildRow>
              {children}
            </C.UpsellChildRow>
          </C.UpsellContentWrapper>
        </C.UpsellWrapperInner>
      </C.UpsellWrapper>
    )
  }
}

CartRowUpsellWrapper.defaultProps = {
  onMutationComplete: (() => {}),
}

CartRowUpsellWrapper.fragments = {
  userBundle: gql`
    fragment CartRowUpsellWrapper_userBundle on UserBundle {
      id
    }
  `,
  bundleConfig: gql`
    fragment CartRowUpsellWrapper_bundleConfig on BundleConfig {
      id
      slug
      value: id
      addToCartTitle
      addToCartDescription
      addToCartPromoText
      promoText
      price(currency: USD) {
        formatted
      }
      listedPrice(currency: USD) {
        formatted
      }
      savingsPercent
      price(currency: USD) {
        formatted
      }
      listedPrice(currency: USD) {
        formatted
      }
      savingsPercent
    }
  `,
}

export default compose(withUpdateUserBundleMutation)(CartRowUpsellWrapper)
