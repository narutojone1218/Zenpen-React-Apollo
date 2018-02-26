import React, { Component } from 'react'
import { compose } from 'react-apollo'
import Modal from '../Modal'
import ProductReviewForm from '../ProductReviewForm/loadable'
import withRequiresAuth from '../Auth/withRequiresAuthHOC'
import VerticalProductBox from '../VerticalProductBox'
import withData from './queries'
import apolloDataLoaderAnimationHOC from '../SectionLoader/apolloDataLoaderAnimationHOC'
import Section from '../Section'

class ProductReviewModal extends Component {
  constructor(props) {
    super(props)
    this.state = { open: true }
  }

  render() {    
    var { open, data } = this.props
    if(!this.state.open) open = false

    return (
      <div>
        <Modal transparent title={`Leave a review for ${data.product.title}`} open={open}>
          <Section.Sub paddingTop={0}>
            <VerticalProductBox product={data.product} />
          </Section.Sub>
          <Section.Sub>
            <ProductReviewForm 
              account={data.viewer.account}
              product={data.product} 
              onBtnClick={value => {this.setState({ open: value })}}
            />
          </Section.Sub>
        </Modal>
        <Modal transparent title="Thank you! Your review has been submitted." open={!this.state.open} />
      </div>
    )
  }
}

export default compose(
  withRequiresAuth,
  withData,
  apolloDataLoaderAnimationHOC(),
)(ProductReviewModal)
