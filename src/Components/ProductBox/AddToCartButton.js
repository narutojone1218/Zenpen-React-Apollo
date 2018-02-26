import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import Button from '../Button'
import { withAddCartableToCartMutation } from '../Cart/mutations'
import { withTelemetry } from '../Telemetry'
import { ucFirst, numToWords } from '../../util/numToWords'

class AddToCartButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  handleClick() {
    this.setState({ loading: true })
    this.props.addCartableToCart({
      variables: {
        cartableType: this.props.product.__typename,
        cartableId: this.props.product.id,
        quantity: this.props.quantity,
      },
    })
      .then(({ data }) => {
        this.setState({ loading: false })
        if (this.props.quantity > 1) {
          toast(`Added ${ucFirst(numToWords(this.props.quantity))} ${this.props.product.title} to Cart!`)
        } else {
          toast(`Added One ${this.props.product.title} to Cart!`)
        }
      })
      .then(this.props.onMutationComplete)
    this.props.telemetry.emitEvent('product.cart', 'add', this.props.product.slug)
  }

  render() {
    const {
      children,
      addMoreIcon,
      addToCartText,
      addMoreText,
      showAddMoreIcon,
      ...buttonProps
    } = this.props

    let inner

    if (this.props.product.cartContext.exists) {
      inner = (
        <span>{showAddMoreIcon ? <i className={addMoreIcon} aria-hidden="true" /> : null} {addMoreText}</span>
      )
    } else {
      inner = (
        <span><i className="fa fa-shopping-cart" aria-hidden="true" /> {addToCartText}</span>
      )
    }

    return (
      <Button loading={this.state.loading} {...buttonProps} onClick={() => (this.handleClick())}>
        {inner}
      </Button>
    )
  }
}

AddToCartButton.defaultProps = {
  addMoreIcon: 'fa fa-plus',
  addMoreText: 'Add More',
  addToCartText: 'Add to Cart',
  showAddMoreIcon: true,
  quantity: 1,
  onMutationComplete: (() => {}),
}

AddToCartButton.fragments = {
  product: gql`
    fragment AddToCartButton_product on Product {
      id
      slug
      title
      cartContext {
        exists
      }
    }
  `,
}

export default compose(
  withAddCartableToCartMutation,
  withTelemetry,
)(AddToCartButton)
