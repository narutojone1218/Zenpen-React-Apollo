import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as C from './components'

const query = graphql(gql`
  query BundleCheckoutQuery($userBundleId: ID!) {
    userBundle: getUserBundle(id: $userBundleId) {
      id
      price(currency: USD) {
        formatted
      }
      bundleConfig {
        id
        slug
        ...CheckoutOption_bundleConfig
        upsell {
          id
          slug
          ...CheckoutOption_bundleConfig
        }
      }
    }
  }
  ${C.CheckoutOption.fragments.bundleConfig}
`)

export default compose(query)
