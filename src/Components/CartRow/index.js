import React from 'react'
import gql from 'graphql-tag'
import CartRowProduct from './CartRowProduct'
import CartRowUserBundle from './CartRowUserBundle'
import * as C from './components'

const CartRow = ({ className, edge, controls, small }) => {
  let rowComponent = null
  if (edge.node.cartableType === 'Product') {
    rowComponent = <CartRowProduct small={small} controls={controls} product={edge.node} edge={edge} />
  } else if (edge.node.cartableType === 'UserBundle') {
    rowComponent = <CartRowUserBundle small={small} controls={controls} userBundle={edge.node} edge={edge} />
  }
  return (
    <C.CartRowWrapper className={className}>
      {rowComponent}
    </C.CartRowWrapper>
  )
}

CartRow.defaultProps = {
  onMutationComplete: (() => {}),
}

CartRow.fragments = {
  cartableEdge: gql`
    fragment CartRow_cartableEdge on CartableEdge {
      id
      node {
        id
        cartableType: __typename
        __typename
        ... on Product {
          ...CartRowProduct_product
        }
        ... on UserBundle {
          ...CartRowUserBundle_userBundle
        }
      }
      ...CartRowUserBundle_cartableEdge
      ...CartRowProduct_cartableEdge
    }
    ${CartRowProduct.fragments.cartableEdge}
    ${CartRowProduct.fragments.product}
    ${CartRowUserBundle.fragments.cartableEdge}
    ${CartRowUserBundle.fragments.userBundle}
  `,
}

export default CartRow
