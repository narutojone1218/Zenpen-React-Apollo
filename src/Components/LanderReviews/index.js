import React from 'react'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { ProductReview } from '../ProductReviews/components'

const ProductReviewStyled = styled(ProductReview)`
  margin-bottom: 2em;
  border-bottom: 1px solid #e4e4e4;
  padding-bottom: 2em;
  &:last-child {
    margin-bottom: 0;
    border-bottom: none;
    padding-bottom: 0;
  }
`

const LanderReviews = ({ className, viewer }) => (
  <div className={className}>
    {viewer.reviews.edges.map(({ node }) => (<ProductReviewStyled key={node.id} review={node} />))}
  </div>
)

LanderReviews.fragments = {
  viewer: gql`
    fragment LanderReviews_viewer on Viewer {
      id
      reviews: allReviews(
        where: {
          rating: {between: [3,5]}
        },
        first: 5
      ) {
        edges {
          node {
            ...ProductReview_review
          }
        }
      }
    }
    ${ProductReview.fragments.review}
  `,
}

export default LanderReviews
