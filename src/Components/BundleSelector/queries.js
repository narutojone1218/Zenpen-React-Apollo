import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import BundleBox from '../../Components/BundleBox'

const query = graphql(gql`
  query BundleSelectorQuery {
    viewer {
      id
      bundleConfigs: allBundleConfigs {
        edges {
          node {
            id
            ...BundleBox_bundleConfig
          }
        }
      }
    }
  }
  ${BundleBox.fragments.bundleConfig}
`)

export default compose(query)
