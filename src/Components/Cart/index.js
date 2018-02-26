import React from 'react'
import gql from 'graphql-tag';
import styled from 'styled-components'
import CartTable from '../CartTable'
import colors from '../../util/styles/colors'
import Section from '../Section'

const CartWrapper = styled.div`
  ${({ small }) => (small ? `
    font-size: 0.7em;
  ` : '')}
`

const CartSubTotal = styled.div`
  font-weight: bold;
  color: ${colors.darkGray};
  font-size: 1.5em;
`

const CartSubTotalTitle = styled.span`
  margin-right: 0.5em;
`

const CartSubTotalAmount = styled.span`
`

const Cart = ({ small, controls, className, viewer }) => (
  <CartWrapper small={small} className={className}>
    <CartTable small={small} controls={controls} cart={viewer.cart} />
    <Section.Sub>
      <CartSubTotal>
        <CartSubTotalTitle>Subtotal ({viewer.cart.quantity} items):</CartSubTotalTitle>
        <CartSubTotalAmount>{viewer.cart.total.formatted}</CartSubTotalAmount>
      </CartSubTotal>
    </Section.Sub>
  </CartWrapper>
)

Cart.defaultProps = {
  small: false,
  controls: true,
}

Cart.fragments = {
  viewer: gql`
    fragment Cart_viewer on Viewer {
      id
      cart {
        id
        quantity
        total(currency: USD) {
          formatted
        }
        ...CartTable_cart
      }
    }
    ${CartTable.fragments.cart}
  `,
}

export default Cart
