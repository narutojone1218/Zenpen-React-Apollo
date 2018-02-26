import React from 'react'

import gql from 'graphql-tag';
import style from './style'

import FloatingCartRow from '../FloatingCartRow'


const FloatingCartTable = ({ className, cart }) => {
  let tableComponent

  if (cart.cartable.edges.length === 0) {
    tableComponent = <span>No ZenPens :(</span>
  } else {
    tableComponent = (
      <table cellSpacing="0" cellPadding="0">
        <thead>
          <tr>
            <th />
            <th />
            <th>Blend</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartable.edges.map(edge => (<FloatingCartRow edge={edge} />))}
        </tbody>
      </table>
    )
  }

  return (
    <div className={className}>
      {tableComponent}
    </div>
  )
}

const FloatingCartTableStyled = style(FloatingCartTable)

FloatingCartTableStyled.fragments = {
  cart: gql`
    fragment FloatingCartTable_cart on Cart {
      products {
        edges {
          ...FloatingCartRow_cartableEdge
        }
      }
    }
    ${FloatingCartRow.fragments.cartableEdge}
  `,
}

export default FloatingCartTableStyled
