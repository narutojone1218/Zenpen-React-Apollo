import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import * as C from './components'

const ProductReviewStyled = styled(C.ProductReview)`
  margin-bottom: 2em;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 2em;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`

const ProductReviews = ({ product }) => (
  <C.ProductReviewsWrapper>
    {product.reviews.edges.map(({ node }) => (
      <ProductReviewStyled key={node.id} review={node} />
    ))}
  </C.ProductReviewsWrapper>
)

ProductReviews.fragments = {
  product: gql`
    fragment ProductReviews_product on Product {
      reviews {
        edges {
          node {
            id
            ...ProductReview_review
          }
        }
      }
    }
    ${C.ProductReview.fragments.review}
  `,
}

export default ProductReviews
