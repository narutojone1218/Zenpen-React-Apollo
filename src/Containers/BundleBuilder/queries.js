import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import BundleSteps from '../../Components/BundleSteps'
import { withCreateUserBundleMutation } from '../../Components/UserBundle/mutations'
import BundleSlots from '../../Components/BundleSlots'

const query = graphql(gql`
  query BundleBuilderQuery {
    viewer {
      id
      userBundle {
        id
        remaining
        inCart
        price(currency: USD) {
          formatted
        }
        bundleConfig {
          id
          quantity
          title
          listedPrice(currency: USD) {
            formatted
          }
          price(currency: USD) {
            formatted
          }
          savingsPercent
          ...BundleSteps_bundleConfig
        }
        products {
          edges {
            node {
              id
            }
          }
        }
        ...BundleSlots_userBundle
      }
    }
  }
  ${BundleSlots.fragments.userBundle}
  ${BundleSteps.fragments.bundleConfig}
`)

export default compose(
  withCreateUserBundleMutation,
  query,
)
