import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ProductReviews from '../../Components/ProductReviews'
import ProductHeader from '../../Components/ProductHeader'
import ProductIngredientsDetail from '../../Components/ProductIngredientsDetail'
import ProductReviewButton from '../../Components/ProductReviewButton'

export default graphql(gql`
  query ProductDetailsQuery($slug: String!) {
    product: getProductBySlug(slug: $slug) {
      id
      title
      slug
      ...ProductHeader_product
      ...ProductIngredientsDetail_product
      ...ProductReviews_product
      ...ProductReviewButton_product
    }
    viewer {
      id
      ...ProductHeader_viewer
    }
  }
  ${ProductHeader.fragments.product}
  ${ProductHeader.fragments.viewer}
  ${ProductReviews.fragments.product}
  ${ProductIngredientsDetail.fragments.product}
  ${ProductReviewButton.fragments.product}
`, {
  options: ({ match: { params: { slug } } }) => ({ variables: { slug } }),
})
