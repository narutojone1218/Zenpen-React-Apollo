import React from 'react'

import gql from 'graphql-tag'
import styled from 'styled-components'

const ProductIconWrapper = styled.i`
  ${({ inheritColor, product }) => (inheritColor ? '' : `
  color: ${product.primaryColor};
  `)}
`

const ProductIcon = ({ product, forceIcon, inheritColor, className='' }) => (
  <ProductIconWrapper
    product={product}
    inheritColor={inheritColor}
    className={`${className} ${forceIcon || product.icon}`}
  />
)

ProductIcon.defaultProps = {
  inheritColor: false,
}

ProductIcon.fragments = {
  product: gql`
    fragment ProductIcon_product on Product {
      primaryColor
      icon
    }
  `,
}

export default ProductIcon
