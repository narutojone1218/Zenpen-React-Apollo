import React from 'react'

import styled from 'styled-components'
import gql from 'graphql-tag'
import { hexToRgb } from '../../util/styles/mixins'
import ProductIcon from '../ProductIcon'
import media from '../../util/styles/media'

const ProductIconBackgroundWrapper = styled.div`
  pointer-events: none;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
  z-index: -1;
  font-size: ${({ iconSize }) => (iconSize)}em;
  color: ${({ product }) => hexToRgb(product.primaryColor, 0.075)};
  > i {
    position: absolute;
    right: ${({ iconRight }) => (iconRight)}em;
    bottom: ${({ iconBottom }) => (iconBottom)}em;
    ${({ responsive }) => (responsive ? (media.phone`
        font-size: 50%;
      `)
    : '')}
  }
}
`

const ProductIconBackground = ({ product, ...props }) => (
  <ProductIconBackgroundWrapper {...props} product={product}>
    <ProductIcon inheritColor product={product} />
  </ProductIconBackgroundWrapper>
)

ProductIconBackground.fragments = {
  product: gql`
    fragment ProductIconBackground_product on Product {
      primaryColor
      ...ProductIcon_product
    }
    ${ProductIcon.fragments.product}
  `,
}

ProductIconBackground.defaultProps = {
  iconRight: 0.2,
  iconBottom: -0.35,
  iconSize: 13,
  responsive: true,
}

export default ProductIconBackground
