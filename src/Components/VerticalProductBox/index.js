import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as C from './components'
import ProductIconBackground from '../ProductIconBackground'
import {
  withTelemetryOnVisible,
  withTelemetryOnClick,
} from '../Telemetry'

const VerticalProductBox = ({
  onClick, product, children, capLeft, capBottom, shiftIconLeft,
}) => {
  let _children = null

  if (children) {
    _children = (
      <C.VerticalProductActions children={children} />
    )
  }

  return (
    <C.VerticalProductBoxWrapper product={product}>
      <C.VerticalProductBoxInner onClick={onClick}>
        <C.VerticalProductDetail product={product} capLeft={capLeft} capBottom={capBottom}>
          <C.VerticalProductTitle product={product} />
          <C.VerticalProductHoverDetailWrapper>
            <C.VerticalProductIngredients product={product} />
            <C.VerticalProductDescription product={product} />
          </C.VerticalProductHoverDetailWrapper>
          {_children}
          <ProductIconBackground {...(shiftIconLeft ? { iconRight: 0.1 } : {})} product={product} />
        </C.VerticalProductDetail>
      </C.VerticalProductBoxInner>
    </C.VerticalProductBoxWrapper>
  )
}

VerticalProductBox.defaultProps = {
  capLeft: true,
  capBottom: true,
  shiftIconLeft: false,
}

VerticalProductBox.fragments = {
  product: gql`
    fragment VerticalProductBox_product on Product {
      id
      ...VerticalProductBoxWrapper_product
      ...VerticalProductDetail_product
      ...VerticalProductTitle_product
      ...VerticalProductDescription_product
      ...VerticalProductIngredients_product
      ...ProductIconBackground_product
    }
    ${C.VerticalProductBoxWrapper.fragments.product}
    ${C.VerticalProductDetail.fragments.product}
    ${C.VerticalProductTitle.fragments.product}
    ${C.VerticalProductDescription.fragments.product}
    ${C.VerticalProductIngredients.fragments.product}
    ${ProductIconBackground.fragments.product}
  `,
}

const telemetryEcommerceImpression = withTelemetryOnVisible(
  'emitEcommerceImpression',
  ({ product }) => ({
    id: product.id,
    name: product.title,
  }),
)

const telemetryEcommerceClick = withTelemetryOnClick(
  'emitEcommerceClick',
  ({ product }) => ({
    id: product.id,
    name: product.title,
  }),
)

export default compose(
  telemetryEcommerceImpression,
  telemetryEcommerceClick,
)(VerticalProductBox)
