import React from 'react'

import gql from 'graphql-tag'

import styled from 'styled-components'

import AddToCartButton from '../ProductBox/AddToCartButton'
import QuantitySelector from '../QuantitySelector'
import media from '../../util/styles/media'

const AddProductQuantityWrapper = styled.div`
  ${media.phone`
    display: flex;
    align-items: center;
  `}
  ${media.small_phone`
    display: block;
  `}
`

const QuantitySelectorWrapper = styled.div`
  display: inline-block;
  margin-right: 1em;
  ${media.small_phone`
    margin-right: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 1em;
  `}
`

const ActionsWrapper = styled.div`
  display: inline-block;
  ${media.phone`
    flex: 1;
    button {
      width: 100%;
    }
  `}
  ${media.small_phone`
    width: 100%;
  `}
`

class AddProductQuantity extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 1,
    }
  }

  handleQuantityUpdate(quantity) {
    this.setState({ quantity })
  }

  handleAddToCartComplete() {
    this.setState({ quantity: 1 })
  }

  render() {
    const {
      product,
    } = this.props
    return (
      <AddProductQuantityWrapper>
        <QuantitySelectorWrapper>
          <QuantitySelector
            quantity={this.state.quantity}
            onUpdate={quantity => (this.handleQuantityUpdate(quantity))}
          />
        </QuantitySelectorWrapper>
        <ActionsWrapper>
          <AddToCartButton
            addMoreIcon="fa fa-shopping-cart"
            addToCartText={`Add ${product.title} to Cart`}
            addMoreText={`Add ${product.title} to Cart`}
            onMutationComplete={() => (this.handleAddToCartComplete())}
            quantity={this.state.quantity}
            product={product}
          />
        </ActionsWrapper>
      </AddProductQuantityWrapper>
    )
  }
}

AddProductQuantity.fragments = {
  product: gql`
    fragment AddProductQuantity_product on Product {
      id
      slug
      title
      cartContext {
        exists
        quantity
      }
      ...AddToCartButton_product
    }
    ${AddToCartButton.fragments.product}
  `,
}

export default AddProductQuantity
