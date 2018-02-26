import React from 'react'
import gql from 'graphql-tag'
import Button from '../Button'
import ProductReviewModal from '../ProductReviewModal/loadable'

class ProductReviewButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick() {
    this.setState({ open: true })
  }

  render() {
    const {
      product,
      ...buttonProps
    } = this.props
    return (
      <div>
        <ProductReviewModal slug={product.slug} open={this.state.open} />
        <Button onClick={this.handleButtonClick} color="blue" expandToParent {...buttonProps} />
      </div>
    )
  }
}

ProductReviewButton.fragments = {
  product: gql`
  fragment ProductReviewButton_product on Product {
    id
    slug
  }
`,
}

export default ProductReviewButton
