import React from 'react'

import gql from 'graphql-tag'
import styled from 'styled-components'

const ProductCartQuantityWrapper = styled.div`
  display: inline-block;
  margin-right: 1em;
  color: #949494;
  font-weight: normal;
`

const ProductCartQuantity = ({ className, product }) => {
  if (!product.cartContext || !product.cartContext.exists) {
    return null
  }
  return (
    <ProductCartQuantityWrapper className={className}>
      <i className="fa fa-shopping-cart" /> <i className="fa fa-times" /> {product.cartContext.quantity}
    </ProductCartQuantityWrapper>
  )
}

ProductCartQuantity.fragments = {
  product: gql`
    fragment ProductCartQuantity_product on Product {
      id
      cartContext {
        exists
        quantity
      }
    }
  `,
}

export default ProductCartQuantity
