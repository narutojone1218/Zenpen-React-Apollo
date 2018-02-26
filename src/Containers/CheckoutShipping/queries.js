import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import Cart from '../../Components/Cart'
import ShippingForm from '../../Components/ShippingForm'

export default graphql(gql`
  query CheckoutShippingQuery {
    viewer {
      id
      account {
        id
        ...ShippingForm_account
      }
      cart {
        id
        quantity
      }
      ...Cart_viewer
    }
  }
  ${Cart.fragments.viewer}
  ${ShippingForm.fragments.account}
`, {
  options: { fetchPolicy: 'network-only' },
})
