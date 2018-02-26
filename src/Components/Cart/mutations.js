import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const addCartableToCartMutation = gql`
  mutation AddCartableConnection($cartableType: CartableEnum!, $cartableId: ID!, $quantity: Int!) {
    addCartableConnection(input: { cartableType: $cartableType, cartableId: $cartableId, quantity: $quantity }) {
      viewer {
        id
        cart {
          id
          quantity
          total(currency: USD) {
            formatted
          }
          cartable {
            edges {
              id
              quantity
              node {
                id
                ... on UserBundle {
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
                    shortTitle
                    quantity
                  }
                }
                ... on Product {
                  title
                  slug
                  shortDescription
                  price(currency: USD) {
                    formatted
                  }
                  primaryColor
                  cartContext {
                    exists
                    quantity
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const withAddCartableToCartMutation = graphql(addCartableToCartMutation, { name: 'addCartableToCart' })

const updateCartableCartMutation = gql`
  mutation UpdateCartableConnection($id: ID!, $cartableType: CartableEnum!, $cartableId: ID!, $quantity: Int!) {
    updateCartableConnection(input: { id: $id, cartableType: $cartableType, cartableId: $cartableId, quantity: $quantity }) {
      viewer {
        id
        cart {
          id
          quantity
          total(currency: USD) {
            formatted
          }
          cartable {
            edges {
              id
              quantity
              node {
                id
                ... on UserBundle {
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
                    shortTitle
                    quantity
                  }
                }
                ... on Product {
                  id
                  title
                  slug
                  shortDescription
                  price(currency: USD) {
                    formatted
                  }
                  primaryColor
                  cartContext {
                    exists
                    quantity
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export const withupdateCartableCartMutation = graphql(updateCartableCartMutation, { name: 'updateCartableCart' })

const purchaseOrderMutation = gql`
  mutation purchaseOrder(
    $billingAddress: CreateBillingAddressInput
    $billingAddressSame: Boolean!
    $card: CardInput!
  ) {
    purchaseOrder(input: {
      billingAddressSame: $billingAddressSame
      billingAddress: $billingAddress
      card: $card
    }) {
      changedOrder {
        id
        paid
      }
      changedTransaction {
        id
        status
        message
      }
    }
  }
`

export const withPurchaseOrderMutation = graphql(purchaseOrderMutation, { name: 'purchaseOrder' })

