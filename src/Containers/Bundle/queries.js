import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import BundleSteps from '../../Components/BundleSteps'
import NavBar from '../../Components/NavBar'

const query = graphql(gql`
  query BundleQuery {
    viewer {
      id
      userBundle {
        id
        remaining
        inCart
        bundleConfig {
          id
          quantity
          ...BundleSteps_bundleConfig
        }
        products {
          edges {
            node {
              id
            }
          }
        }
        ...BundleSteps_userBundle
      }
      ...NavBar_viewer
    }
  }
  ${BundleSteps.fragments.bundleConfig}
  ${BundleSteps.fragments.userBundle}
  ${NavBar.fragments.viewer}
`)

export default compose(query)
