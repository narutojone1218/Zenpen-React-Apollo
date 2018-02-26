import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createReviewMutation = gql`
  mutation CreateReview(
    $productId: ID!,
    $content: String,
    $rating: Int
  ) {
    createReview(
      input: {
        productId: $productId,
        content: $content,
        rating: $rating}
    ) {
      changedReview {
        id
        content
      }
    }
  }
`

export const withCreateReviewMutation = graphql(createReviewMutation, { name: 'createReview' })
