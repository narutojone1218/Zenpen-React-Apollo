import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import VerticalProductBox from '../VerticalProductBox'
import NavBar from '../NavBar'
import BundleSteps from '../BundleSteps'
import * as BundleCheckoutComponents from '../BundleCheckout/components'

const userBundleMutationViewerFragment = gql`
  fragment UserBundleMutation_viewer on Viewer {
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
        slug
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
        ...CheckoutOption_bundleConfig
        upsell {
          id
          slug
          ...BundleSteps_bundleConfig
          ...CheckoutOption_bundleConfig
        }
      }
      products {
        edges {
          id
          node {
            id
            ...VerticalProductBox_product
          }
        }
      }
      ...BundleSteps_userBundle
    }
  }
  ${VerticalProductBox.fragments.product}
  ${BundleSteps.fragments.bundleConfig}
  ${BundleSteps.fragments.userBundle}
  ${BundleCheckoutComponents.CheckoutOption.fragments.bundleConfig}
`

const addProductToUserBundleMutation = gql`
  mutation AddUserBundleProductConnection($userBundleId: ID!, $productId: ID!) {
    addUserBundleProductConnection(input: { userBundleId: $userBundleId, productId: $productId }) {
      viewer {
        id
        ...UserBundleMutation_viewer
      }
    }
  }
  ${userBundleMutationViewerFragment}
`

export const withAddProductToUserBundleMutation = graphql(addProductToUserBundleMutation, { name: 'addProductToUserBundle' })

const updateProductUserBundleMutation = gql`
  mutation UpdateUserBundleProductConnection($userBundleProductId: ID!, $userBundleId: ID!, $productId: ID!) {
    updateUserBundleProductConnection(input: { id:$userBundleProductId, userBundleId: $userBundleId, productId: $productId }) {
      viewer {
        id
        ...UserBundleMutation_viewer
      }
    }
  }
  ${userBundleMutationViewerFragment}
`

export const withUpdateProductUserBundleMutation = graphql(updateProductUserBundleMutation, { name: 'updateProductUserBundle' })

const createUserBundleMutation = gql`
  mutation CreateUserBundle($bundleConfigId: ID!, $initialProductIds: [ID]) {
    createUserBundle(input: { bundleConfigId: $bundleConfigId, initialProductIds: $initialProductIds }) {
      viewer {
        id
        ...UserBundleMutation_viewer
      }
    }
  }
  ${userBundleMutationViewerFragment}
`

export const withCreateUserBundleMutation = graphql(createUserBundleMutation, { name: 'createUserBundle' })

const updateUserBundleMutation = gql`
  mutation UpdateUserBundle($id: ID!, $bundleConfigId: ID!) {
    updateUserBundle(input: { id: $id, bundleConfigId: $bundleConfigId }) {
      viewer {
        id
        ...UserBundleMutation_viewer
      }
    }
  }
  ${userBundleMutationViewerFragment}
`

export const withUpdateUserBundleMutation = graphql(updateUserBundleMutation, { name: 'updateUserBundle' })
