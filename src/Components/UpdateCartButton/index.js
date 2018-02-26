import React from 'react'

import gql from 'graphql-tag';

import Button from '../Button'

import { withupdateCartableCartMutation } from '../Cart/mutations'

class UpdateCartButton extends React.Component {
  handleClick() {
    this.props.updateCartableCart({
      variables: {
        productId: this.props.product.id,
        quantity: this.props.quantity,
      },
    })
  }

  render() {
    const {
      ...buttonProps
    } = this.props

    let inner

    if (this.props.product.cartContext.exists) {
      inner = (
        <span><i className="fa fa-plus" aria-hidden="true" /> Update Cart</span>
      )
    } else {
      inner = (
        <span><i className="fa fa-shopping-cart" aria-hidden="true" /> Add to Cart</span>
      )
    }

    return (
      <Button {...buttonProps} onClick={() => (this.handleClick())}>
        {inner}
      </Button>
    )
  }
}

UpdateCartButton.defaultProps = {
  quantity: 0,
}

const UpdateCartButtonWithMutations = withupdateCartableCartMutation(UpdateCartButton)

UpdateCartButtonWithMutations.fragments = {
  product: gql`
    fragment UpdateCartButton_product on Product {
      id
      cartContext {
        exists
      }
    }
  `,
}

export default UpdateCartButtonWithMutations
