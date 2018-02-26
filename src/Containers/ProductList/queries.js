import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import ProductBox from '../../Components/ProductBox'

export default graphql(gql`
  query ProductListQuery {
    viewer {
      id
      products: allProducts {
        edges {
          node {
            id
            ...ProductBox_product
          }
        }
      }
    }
  }
  ${ProductBox.fragments.product}
`)
