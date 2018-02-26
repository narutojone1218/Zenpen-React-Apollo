import React from 'react'
import gql from 'graphql-tag'
import * as C from './components'
import CartRow from '../CartRow'

const CartTable = ({ className, cart, small, controls }) => {
  if (cart.cartable.edges.length === 0) {
    return <span>No ZenPens :(</span>
  }
  return (
    <C.CartTableWrapper className={className}>
      {cart.cartable.edges.map(edge => (
        <C.CartRowStyled small={small} controls={controls} key={edge.id} edge={edge} />
      ))}
    </C.CartTableWrapper>
  )
}

CartTable.fragments = {
  cart: gql`
    fragment CartTable_cart on Cart {
      quantity
      cartable {
        edges {
          id
          ...CartRow_cartableEdge
        }
      }
      total(currency: USD) {
        formatted
      }
    }
    ${CartRow.fragments.cartableEdge}
  `,
}

export default CartTable
