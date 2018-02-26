import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Cart from '../../Components/Cart'

export default graphql(gql`
  query CartPageQuery {
    viewer {
      id
      ...Cart_viewer
    }
  }
  ${Cart.fragments.viewer}
`)
