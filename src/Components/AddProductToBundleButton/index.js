import React from 'react'
import gql from 'graphql-tag'
import { toast } from 'react-toastify'
import Button from '../Button'
import { numToWords } from '../../util/numToWords'

import { withAddProductToUserBundleMutation } from '../UserBundle/mutations'

class AddProductToBundleButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  handleClick() {
    this.setState({ loading: true })
    this.props.addProductToUserBundle({
      variables: {
        userBundleId: this.props.userBundle.id,
        productId: this.props.product.id,
        productSlug: this.props.product.slug,
      },
    })
      .then(({ data }) => {
        this.setState({ loading: false })

        const remaining = data.addUserBundleProductConnection.viewer.userBundle.remaining

        if (remaining > 0) {
          toast(`Added ${this.props.product.title} to bundle! Choose ${numToWords(remaining)} more to complete.`)
        } else {
          toast(`Added ${this.props.product.title} to bundle!`)
        }
      })
      .then(this.props.onMutationComplete)
  }

  render() {
    const {
      children,
      ...buttonProps
    } = this.props

    return (
      <Button loading={this.state.loading} {...buttonProps} onClick={() => (this.handleClick())}>
        {children}
      </Button>
    )
  }
}

AddProductToBundleButton.defaultProps = {
  onMutationComplete: (() => {}),
}

AddProductToBundleButton.fragments = {
  product: gql`
    fragment AddProductToBundleButton_product on Product {
      id
      title
      slug
    }
  `,
  userBundle: gql`
    fragment AddProductToBundleButton_userBundle on UserBundle {
      id
    }
  `,
}

export default withAddProductToUserBundleMutation(AddProductToBundleButton)
