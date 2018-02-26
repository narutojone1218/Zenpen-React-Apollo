import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PaymentForm from '../../Components/PaymentForm'
import CartDetailTable from '../../Components/CartDetailTable'

export default graphql(gql`
  query CheckoutCompleteQuery($orderId: ID!) {
    order: getOrder(id: $orderId) {
      paidTransaction {
        id
        createdAt
        transactionId
        amount(currency: USD) {
          formatted
        }
      }
      cart {
        id
        ...CartDetailTable_cart
      }
      account {
        id
      }
      shippingAddress {
        id
        firstName
        lastName
        phone
        email
        streetAddress
        unit
        city
        region
        regionCode
        postalCode
        postalCodeSuffix
        country
        countryCode
        placeId
        suggestedPlaceId
        formattedAddress
      }
      billingAddress {
        id
        firstName
        lastName
        phone
        email
        streetAddress
        unit
        city
        region
        regionCode
        postalCode
        postalCodeSuffix
        country
        countryCode
        placeId
        suggestedPlaceId
        formattedAddress
      }
    }
  }
  ${CartDetailTable.fragments.cart}
`, {
  options: ({ match: { params: { orderId } } }) => ({ variables: { orderId } }),
})
