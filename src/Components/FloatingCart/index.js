import React from 'react'

import gql from 'graphql-tag';
import style from './style'
import FloatingCartTable from '../FloatingCartTable'
import SectionLoader from '../SectionLoader'
import Button from '../Button'

const FloatingCart = ({ className, loading, viewer }) => {
  let innerComponent

  if (loading) {
    innerComponent = <SectionLoader />
  } else {
    innerComponent = (
      <div className="cart-wrapper">
        <FloatingCartTable className="cart-table-wrapper" cart={viewer.cart} />
        <div className="cart-actions">
          <Button size="small">Checkout Now!</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div className="inner">
        <div className="header">My ZenPens</div>
        {innerComponent}
      </div>
    </div>
  )
}

const FloatingCartStyled = style(FloatingCart)

FloatingCartStyled.fragments = {
  viewer: gql`
    fragment FloatingCart_viewer on Viewer {
      cart {
        quantity
        total(currency: USD) {
          currency
          value
          symbol
        }
        ...FloatingCartTable_cart
      }
    }
    ${FloatingCartTable.fragments.cart}
  `,
}

export default FloatingCartStyled
