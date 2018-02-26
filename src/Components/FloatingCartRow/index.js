import React from 'react'

import gql from 'graphql-tag';
import style from './style'

const FloatingCartRow = ({ className, edge }) => (
  <tr className={className}>
    <td>{edge.quantity}x</td>
    <td><i className="fa fa-circle product-color" aria-hidden="true" /></td>
    <td>{edge.node.title}</td>
    <td>{edge.node.price}</td>
  </tr>
)

const FloatingCartRowStyled = style(FloatingCartRow)

FloatingCartRowStyled.fragments = {
  cartableEdge: gql`
    fragment FloatingCartRow_cartableEdge on CartableEdge {
      quantity
      node {
        id
        title
        price(currency: USD) {
          currency
          value
          symbol
        }
        primaryColor
      }
    }
  `,
}

export default FloatingCartRowStyled
