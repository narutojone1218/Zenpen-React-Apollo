import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import LanderReviews from '../../Components/LanderReviews'
import MiniProductBox from '../../Components/MiniProductBox'

const query = graphql(gql`
  query LandingPageQuery {
    viewer {
      id
      ...LanderReviews_viewer
      products: allProducts(
        first: 10
      ) {
        edges {
          node {
            id
            slug
            ...MiniProductBox_product
          }
        }
      }
    }
  }
  ${LanderReviews.fragments.viewer}
  ${MiniProductBox.fragments.product}
`)

export default compose(query)
