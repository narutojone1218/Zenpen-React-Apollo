import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import * as C from './components'
import UpdateCartButton from '../UpdateCartButton'
import QuantitySelector from '../QuantitySelector'
import ProductImage from '../ProductImage'
import ProductIcon from '../ProductIcon'
import media, { MediaQueryComponent } from '../../util/styles/media'
import SectionLoader from '../SectionLoader'
import {
  withupdateCartableCartMutation,
} from '../Cart/mutations'

const CartRowProductPriceCellStyled = styled(C.CartRowProductPriceCell)`
  margin-right:2em;
  ${media.phone`
    margin-right: 0;
    margin-bottom: 1em;
  `}
`

const CartRowProductWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 1.5em;
  border-radius: 0.3em;
`

class CartRowProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  handleQuantityUpdate(quantity) {
    this.setState({ loading: true })
    this.props.updateCartableCart({
      variables: {
        quantity,
        id: this.props.edge.id,
        cartableId: this.props.edge.node.id,
        cartableType: "Product",
      },
    })
      .then(({ data }) => (this.setState({ loading: false })))
      .then(this.props.onMutationComplete)
  }

  render() {
    const {
      className,
      edge,
      product,
      controls,
    } = this.props
    return (
      <CartRowProductWrapper className={className}>
        <SectionLoader isVisible={this.state.loading} />
        <C.CartRowProductImageCell>
          <C.CartRowProductImageWrapper>
            <MediaQueryComponent.phone>
              <ProductImage height={10} width={50} position="right" product={product} />
              <ProductImage height={10} width={50} position="left" product={product} />
            </MediaQueryComponent.phone>
            <MediaQueryComponent.notPhone>
              <ProductImage height={20} width={80} position="right" product={product} />
              <ProductImage height={20} width={80} position="left" product={product} />
            </MediaQueryComponent.notPhone>
          </C.CartRowProductImageWrapper>
        </C.CartRowProductImageCell>
        <C.CartRowProductDetailCell>
          <MediaQueryComponent.phone>
            <C.CartRowProductDetailExtended>
              <C.CartRowProductDetailExtendedLeft>
                <C.CartRowProductTitle>
                  <ProductIcon forceIcon="fa fa-circle" product={product} /> {product.title}
                </C.CartRowProductTitle>
                <C.CartRowProductInStock>
                  <i className="fa fa-check" /> In Stock
                </C.CartRowProductInStock>
                <C.CartRowProductDescription>
                  {product.shortDescription}
                </C.CartRowProductDescription>
                {controls === true ?
                  <C.CartRowActionsWrapper>
                    <span>remove</span>
                  </C.CartRowActionsWrapper>
                 : null}
              </C.CartRowProductDetailExtendedLeft>
              <C.CartRowProductDetailExtendedRight>
                <CartRowProductPriceCellStyled>{product.price.formatted}</CartRowProductPriceCellStyled>
                {controls === true ?
                  <C.CartRowProductQuantityCell>
                    <QuantitySelector
                      onUpdate={quantity => (this.handleQuantityUpdate(quantity))}
                      quantity={edge.quantity}
                    />
                  </C.CartRowProductQuantityCell>
                 : null}
              </C.CartRowProductDetailExtendedRight>
            </C.CartRowProductDetailExtended>
          </MediaQueryComponent.phone>
          <MediaQueryComponent.notPhone>
            <C.CartRowProductTitle>
              <ProductIcon forceIcon="fa fa-circle" product={product} /> {product.title}
            </C.CartRowProductTitle>
            <C.CartRowProductDetailExtended>
              <C.CartRowProductDetailExtendedLeft>
                <C.CartRowProductInStock>
                  <i className="fa fa-check" /> In Stock
                </C.CartRowProductInStock>
                <C.CartRowProductDescription>
                  {product.shortDescription}
                </C.CartRowProductDescription>
                {controls === true ?
                  <C.CartRowActionsWrapper>
                    <span>remove</span>
                  </C.CartRowActionsWrapper>
                  : null}
              </C.CartRowProductDetailExtendedLeft>
              <C.CartRowProductDetailExtendedRight>
                <CartRowProductPriceCellStyled>{product.price.formatted}</CartRowProductPriceCellStyled>
                {controls === true ?
                  <C.CartRowProductQuantityCell>
                    <QuantitySelector
                      onUpdate={quantity => (this.handleQuantityUpdate(quantity))}
                      quantity={edge.quantity}
                    />
                  </C.CartRowProductQuantityCell>
                  : null}
              </C.CartRowProductDetailExtendedRight>
            </C.CartRowProductDetailExtended>
          </MediaQueryComponent.notPhone>
        </C.CartRowProductDetailCell>
      </CartRowProductWrapper>
    )
  }
}

CartRowProduct.defaultProps = {
  onMutationComplete: (() => {}),
}

CartRowProduct.fragments = {
  cartableEdge: gql`
    fragment CartRowProduct_cartableEdge on CartableEdge {
      id
      quantity
    }
  `,
  product: gql`
    fragment CartRowProduct_product on Product {
      id
      title
      slug
      shortDescription
      price(currency: USD) {
        formatted
      }
      primaryColor
      ...UpdateCartButton_product
    }
    ${UpdateCartButton.fragments.product}
  `,
}

export default compose(withupdateCartableCartMutation)(CartRowProduct)
