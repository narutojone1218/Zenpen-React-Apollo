import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import VerticalProductBox from '../VerticalProductBox'
import ProductReviewForm from '../ProductReviewForm'

export default graphql(gql`
  query ProductDetailsQuery($slug: String!) {
    product: getProductBySlug(slug: $slug) {
      id
      title
      slug
      ...VerticalProductBox_product
      ...ProductReviewForm_product
    }
    viewer {
      id
      account {
        id
        ...ProductReviewForm_account
      }
    }
  }
  ${VerticalProductBox.fragments.product}
  ${ProductReviewForm.fragments.product}
  ${ProductReviewForm.fragments.account}
`)
