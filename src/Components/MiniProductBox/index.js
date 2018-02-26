import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import ProductImage from '../ProductImage'
import { hexToRgb } from '../../util/styles/mixins'

const MiniProductBoxWrapper = styled.div`
  border: 1px solid ${({ product }) => hexToRgb(product.primaryColor, 0.15)};
  background: ${({ product }) => hexToRgb(product.primaryColor, 0.07)};
  border-radius: 0.3em;
  display: inline-block;
  padding: 0.5em;
`

MiniProductBoxWrapper.fragments = {
  product: gql`
    fragment MiniProductBoxWrapper_product on Product {
      id
      primaryColor
    }
  `,
}

const MiniProductBoxProductTitle = styled.p`
  font-size: 1.5em;
  text-transform: uppercase;
  display: inline-block;
  color: ${({ product }) => product.primaryColor};
  text-shadow: 0 0 7px ${({ product }) => hexToRgb(product.primaryColor, 0.3)};
  margin-bottom: 0.2em;
`

MiniProductBoxProductTitle.fragments = {
  product: gql`
    fragment MiniProductBoxProductTitle_product on Product {
      id
      primaryColor
    }
  `,
}

const MiniProductBox = ({ product, className }) => (
  <MiniProductBoxWrapper className={className} product={product}>
    <MiniProductBoxProductTitle product={product}>{product.title}</MiniProductBoxProductTitle>
    <ProductImage height={20} position="right" product={product} />
  </MiniProductBoxWrapper>
)

MiniProductBox.fragments = {
  product: gql`
    fragment MiniProductBox_product on Product {
      id
      title
      ...ProductImage_product
      ...MiniProductBoxWrapper_product
      ...MiniProductBoxProductTitle_product
    }
    ${ProductImage.fragments.product}
    ${MiniProductBoxWrapper.fragments.product}
    ${MiniProductBoxProductTitle.fragments.product}
  `,
}

export default MiniProductBox
