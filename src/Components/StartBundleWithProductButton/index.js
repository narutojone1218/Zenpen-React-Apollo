import React from 'react'
import gql from 'graphql-tag';
import Button from '../Button'
import BundleSelectorModal from '../BundleSelectorModal'

class StartBundleWithProductButton extends React.Component {
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
    const initialProductIds = [product.id]
    return (
      <div>
        <BundleSelectorModal initialProductIds={initialProductIds} open={this.state.open} />
        <Button onClick={this.handleButtonClick} color="blue" expandToParent {...buttonProps} />
      </div>
    )
  }
}

StartBundleWithProductButton.fragments = {
  product: gql`
    fragment StartBundleWithProductButton_product on Product {
      id
      title
    }
  `,
}

export default StartBundleWithProductButton
