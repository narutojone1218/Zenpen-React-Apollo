import React from 'react'
import gql from 'graphql-tag'
import * as C from './components'
import { MediaQueryComponent } from '../../util/styles/media'
import ProductIcon from '../ProductIcon'
import MiniProductBox from '../MiniProductBox'
import CartRowUpsellWrapper from './CartRowUpsellWrapper'

class CartRowUserBundle extends React.Component {
  renderRowComponent() {
    const {
      className,
      userBundle,
      controls,
      small,
    } = this.props

    let priceComponent = null

    if (userBundle.bundleConfig.subscription === true) {
      priceComponent = (
        <C.CartRowProductPriceCell>          
          {userBundle.price.formatted} / month
          <C.ShipDate>Next Ship Date: 1/20/2018</C.ShipDate> 
        </C.CartRowProductPriceCell>
      )
    } else {
      priceComponent = (
        <C.CartRowProductPriceCell>
          {userBundle.price.formatted}
        </C.CartRowProductPriceCell>
      )
    }

    return (
      <C.CartRowUserBundleWrapper className={className}>
        {small ? null :
          <C.CartRowProductImageCell>
            <C.CartRowUserBundleImage bundleConfig={userBundle.bundleConfig} />
          </C.CartRowProductImageCell>
        }
        <C.CartRowProductDetailCell>
          <C.CartRowProductTitle>
            {userBundle.bundleConfig.title}
            <C.CartRowProductPriceCell>
              {priceComponent}
            </C.CartRowProductPriceCell>
          </C.CartRowProductTitle>          
          <MediaQueryComponent.phone>
            <C.ProductIcons>
              {userBundle.products.edges.map(({ id, node }) => (
                <C.ProductIconStyled key={id} forceIcon="fa fa-circle" product={node} />
              ))}
            </C.ProductIcons>
          </MediaQueryComponent.phone>
          <C.CartRowProductDetailExtended>
            <C.CartRowProductDetailExtendedLeft>
              <C.CartRowProductInStock>
                <i className="fa fa-check" /> All In Stock
              </C.CartRowProductInStock>
              <MediaQueryComponent.notPhone>
                <C.MiniProductBoxes small={small}>
                  {userBundle.products.edges.map(({ id, node }) => (
                    <C.MiniProductBoxStyled key={id} product={node} />
                  ))}
                </C.MiniProductBoxes>
              </MediaQueryComponent.notPhone>
              {controls ?
                <C.CartRowActionsWrapper>
                  <span>remove</span>
                </C.CartRowActionsWrapper>
                : null}
            </C.CartRowProductDetailExtendedLeft>
            <C.CartRowProductDetailExtendedRight>
                <C.CancelButton>Cancel</C.CancelButton>
                <C.EditButton>Edit</C.EditButton>
            </C.CartRowProductDetailExtendedRight>
          </C.CartRowProductDetailExtended>
        </C.CartRowProductDetailCell>
      </C.CartRowUserBundleWrapper>
    )
  }

  render() {
    const {
      className,
      userBundle,
    } = this.props

    if (userBundle.bundleConfig.upsell) {
      return (
        <CartRowUpsellWrapper userBundle={userBundle} upsell={userBundle.bundleConfig.upsell} className={className}>
          {this.renderRowComponent()}
        </CartRowUpsellWrapper>
      )
    }
    return this.renderRowComponent()
  }
}

CartRowUserBundle.defaultProps = {
  onMutationComplete: (() => {}),
}

CartRowUserBundle.fragments = {
  cartableEdge: gql`
    fragment CartRowUserBundle_cartableEdge on CartableEdge {
      id
    }
  `,
  userBundle: gql`
    fragment CartRowUserBundle_userBundle on UserBundle {
      id
      price(currency: USD) {
        formatted
      }
      products {
        edges {
          id
          node {
            ...MiniProductBox_product
            ...ProductIcon_product
          }
        }
      }
      bundleConfig {
        id
        title
        subscription
        ...CartRowUserBundleImage_bundleConfig
        upsell {
          id
          ...CartRowUpsellWrapper_bundleConfig
        }
      }
      ...CartRowUpsellWrapper_userBundle
    }
    ${C.CartRowUserBundleImage.fragments.bundleConfig}
    ${MiniProductBox.fragments.product}
    ${ProductIcon.fragments.product}
    ${CartRowUpsellWrapper.fragments.bundleConfig}
    ${CartRowUpsellWrapper.fragments.userBundle}
  `,
}

export default CartRowUserBundle
