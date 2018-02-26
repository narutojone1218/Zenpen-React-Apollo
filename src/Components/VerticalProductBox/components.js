import React from 'react'

import styled from 'styled-components'
import gql from 'graphql-tag'
import Ingredient from '../Ingredient'
import { shadeColor } from '../../util/styles/colors'
import { boxShadow, hexToRgb } from '../../util/styles/mixins'
import media from '../../util/styles/media'

import {
  extra as extraImages,
} from '../../assets/images'

export const VerticalProductBoxWrapper = styled.div`
  background: white;
  border-radius: 0.2em;
  font-size: 1rem;
  transition: all .2s;
  ${boxShadow(0, 0, '10px', 'transparent')}
  cursor: pointer;
  &:hover {
    ${({ product }) => boxShadow(0, 0, '10px', hexToRgb(product.primaryColor, 0.15))};
  }
}
`

VerticalProductBoxWrapper.fragments = {
  product: gql`
    fragment VerticalProductBoxWrapper_product on Product {
      primaryColor
    }
  `,
}

export const VerticalProductBoxInner = styled.div`
  display: flex;
  flex-direction: row;
`

export const VerticalProductDetailWrapper = styled.div`

  border: 1px solid ${({ product }) => hexToRgb(product.primaryColor, 0.15)};
  background: ${({ product }) => hexToRgb(product.primaryColor, 0.07)};
  
  border-radius: 0.2em;

  ${({ capLeft }) => (capLeft === false ? `
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  ` : '')}
  
  ${({ capBottom }) => (capBottom === false ? `
  border-bottom: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  ` : '')}
  
  padding: 1em;
  
  z-index: 1;
  
  display: flex;
  flex-direction: row;
  flex: 3 0 0;
  position: relative;
  overflow: hidden;
  
  ${media.phone`
    padding: 0.5em 0;
  `}
`

export const VerticalProductDetail = props => (
  <VerticalProductDetailWrapper {...props} />
)

VerticalProductDetail.fragments = {
  product: gql`
    fragment VerticalProductDetail_product on Product {
      primaryColor
    }
  `,
}

export const VerticalProductTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1 0 0;
  padding: 0 1em 0 1em;
  font-size: 2em;
  color: ${({ product }) => product.primaryColor};
  text-transform: uppercase;
  text-shadow: 0 0 7px ${({ product }) => hexToRgb(product.primaryColor, 0.3)};
  ${media.tablet`
    padding: 0 0.5em 0 0.5em;
    font-size: 1.5em;
  `}
`

export const VerticalProductTitle = ({ product }) => (
  <VerticalProductTitleWrapper product={product}>
    <span>{product.title}</span>
  </VerticalProductTitleWrapper>
)

VerticalProductTitle.fragments = {
  product: gql`
    fragment VerticalProductTitle_product on Product {
      title
      primaryColor
    }
  `,
}

export const VerticalProductDescriptionWrapper = styled.div`
  transition: all .2s;
  opacity: 0;
  
  display: flex;
  
  align-items: center;

  padding: 0 1em 0 1em;

  font-size: 80%;
  line-height: 1.2em;
  position: absolute;
  top: 0;
  bottom: 0;
  font-weight: 300;
  ${media.phone`
    display: none;
  `}
`

export const VerticalProductDescriptionPlacement = styled.div`
  flex: 1 0 0;
  color: ${({ product }) => shadeColor(product.primaryColor, -0.5)};
`

export const VerticalProductDescription = ({ product }) => (
  <VerticalProductDescriptionWrapper>
    <VerticalProductDescriptionPlacement product={product}>
      {product.shortDescription}
    </VerticalProductDescriptionPlacement>
  </VerticalProductDescriptionWrapper>
)

VerticalProductDescription.fragments = {
  product: gql`
    fragment VerticalProductDescription_product on Product {
      shortDescription
      primaryColor
    }
  `,
}


export const VerticalProductIngredientsWrapper = styled.div`
  transition: all .2s;
  opacity: 1;

  display: flex;
  align-items: center;

  padding: 0 1em 0 1em;
  
  ${Ingredient} {
    display: inline-block;
    margin: 0 1.5em 0 0;
    ${media.phone`
      margin: 0 0.5em 0 0;
    `}
    &:last-child {
      margin-right: 0;
    }
  }
  
  ${media.tablet`
    font-size: 70%;
  `}
`

export const VerticalProductIngredients = ({ product }) => (
  <VerticalProductIngredientsWrapper>
    {product.ingredients.edges.map(({ node: ingredient }) => (<Ingredient key={ingredient.id} ingredient={ingredient} />))}
  </VerticalProductIngredientsWrapper>
)

VerticalProductIngredients.fragments = {
  product: gql`
    fragment VerticalProductIngredients_product on Product {
      ingredients {
        edges {
          node {
            id
            ...Ingredient_ingredient
          }
        }
      }
    }
    ${Ingredient.fragments.ingredient}
  `,
}

export const VerticalProductHoverDetailWrapper = styled.div`
  min-height: 6rem;
  flex: 4 0 0;
  position: relative;
  ${media.tablet`
    min-height: 0;
    &:hover ${VerticalProductIngredientsWrapper} {
      opacity: 0;
    }
    &:hover ${VerticalProductDescriptionWrapper} {
      opacity: 1;
    }
  `}
`

export const VerticalProductActions = styled.div`
  justify-content: flex-end;
  display: flex;
  align-items: center;
  flex: 2 0 0;
  
  padding: 0 1em 0 1em;
  
  ${media.phone`
    display: none;
  `}
`

export const VerticalActionsWrapper = styled.div`
  padding: 1em;
  display: flex;
  align-items: center;
  flex: 1 0 0;
  
  background: url(${extraImages.fuzzBackground});
  
  border-top-right-radius: 0.2em;
  border-bottom-right-radius: 0.2em;
  z-index: 10;
  border: 1px solid #d0d0d0;
`
