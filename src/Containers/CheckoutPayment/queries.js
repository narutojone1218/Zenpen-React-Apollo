import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import PaymentForm from '../../Components/PaymentForm'
import CartDetailTable from '../../Components/CartDetailTable'

export default graphql(gql`
  query CheckoutShippingQuery {
    viewer {
      id
      account {
        id
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
        ...PaymentForm_account
      }
      cart {
        id
        quantity
        ...CartDetailTable_cart
      }
    }
  }
  ${PaymentForm.fragments.account}
  ${CartDetailTable.fragments.cart}
`, {
  options: { fetchPolicy: 'network-only' },
})
