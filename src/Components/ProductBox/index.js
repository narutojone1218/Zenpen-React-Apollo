import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import withStyle from './style'
import Ingredient from '../Ingredient'
import AddToCartButton from './AddToCartButton'
import ProductCartQuantity from '../ProductCartQuantity'

import {
  withTelemetryOnVisible,
  withTelemetryOnClick,
} from '../Telemetry'

const AddToCartWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ProductBox = ({ className, product }) => (
  <div className={className}>
    <div className="section">
      <div className="product-image">&nbsp;</div>
      <Link to={`/blends/${product.slug}`}>
        <div className="inner">
          <div className="product-name-wrapper">
            { !product.cartContext.exists ? null : <div className="has-product"><i className="fa fa-check" /></div> }
            <div className="product-name">
              {product.title}
            </div>
          </div>
          <p className="product-description">{product.shortDescription}</p>
          <div className="read-more">
            <span>Read more about {product.title}...</span>
          </div>
          <div className="product-ingredients">
            {product.ingredients.edges.map(({ node: ingredient }) => (<Ingredient key={ingredient.id} ingredient={ingredient} />))}
          </div>
          <div className="product-icon">
            <i className={product.icon} />
          </div>
        </div>
      </Link>
      <div className="footer">
        <div className="widget-container">
          <div className="left">
            <div className="rating">
              <p>61 Reviews</p>
              <div className="stars">
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
                <i className="fa fa-star" />
              </div>
            </div>
          </div>
          <div className="right">
            <AddToCartWrapper className="actions">
              <ProductCartQuantity product={product} />
              <AddToCartButton size="small" product={product} />
            </AddToCartWrapper>
          </div>
        </div>
      </div>
    </div>
  </div>
)

const ProductBoxStyled = withStyle(ProductBox)

ProductBoxStyled.fragments = {
  product: gql`
    fragment ProductBox_product on Product {
      id
      slug
      title
      shortDescription
      primaryColor
      icon
      cartContext {
        exists
        quantity
      }
      ingredients {
        edges {
          node {
            id
            ...Ingredient_ingredient
          }
        }
      }
      ...AddToCartButton_product
      ...ProductCartQuantity_product
    }
    ${Ingredient.fragments.ingredient}
    ${AddToCartButton.fragments.product}
    ${ProductCartQuantity.fragments.product}
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
)(ProductBoxStyled)
