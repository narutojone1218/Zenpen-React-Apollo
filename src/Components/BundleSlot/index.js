import React from 'react'
import { compose } from 'react-apollo'
import gql from 'graphql-tag'
import * as C from './components'
import ProductSelectorModal from '../ProductSelectorModal'
import VerticalProductBox from '../VerticalProductBox'
import SectionLighten from '../SectionLighten'
import { ucFirst, numToWords } from '../../util/numToWords'

import {
  withAddProductToUserBundleMutation,
  withUpdateProductUserBundleMutation,
} from '../UserBundle/mutations'

class BundleSlot extends React.Component {
  constructor(props) {
    super(props)
    this.state = { loading: false, selecting: false }
  }

  handleSelectOpenClick() {
    this.setState({ selecting: true })
  }

  handleProductSelect(product) {
    this.setState({ loading: true })
    let updatePromise = null
    if (this.props.product === null) {
      updatePromise = this.props.addProductToUserBundle({
        variables: {
          productId: product.id,
          userBundleId: this.props.userBundle.id,
        },
      })
    } else {
      updatePromise = this.props.updateProductUserBundle({
        variables: {
          productId: product.id,
          userBundleId: this.props.userBundle.id,
          userBundleProductId: this.props.userBundleProductId,
        },
      })
    }
    updatePromise.then(_ => this.setState({
      loading: false,
      selecting: false,
    }))
  }

  render() {
    const {
      quantity,
      remaining,
      product,
      number,
    } = this.props

    let slotSelectionComponent

    if (product) {
      slotSelectionComponent = (
        <VerticalProductBox capLeft={false} product={product}>
          <C.ClickToChange />
        </VerticalProductBox>
      )
    } else {
      slotSelectionComponent = (
        <C.SlotPlaceholder />
      )
    }

    let opacity = 0

    if (remaining > 0) {
      opacity = (quantity / remaining) - ((number / remaining) - (1 / remaining))

      if (opacity > 1) {
        opacity = 1
      } else if (opacity < 0.25) {
        opacity = 0.25
      }

      opacity = (1 - opacity)

      if (opacity !== 0 && opacity !== 1) {
        opacity = opacity.toFixed(2)
      }
    }

    return (
      <C.BundleSlotWrapper>
        {opacity > 0 ? <SectionLighten opacity={opacity} /> : null}
        <C.SelectWrapper>
          <C.SlotTitleWrapper>
            <C.SlotTitle>
              <C.SlotTitleWord>{ucFirst(numToWords(number))}</C.SlotTitleWord>
              <C.SlotTitleNumeric>#{number}</C.SlotTitleNumeric>
            </C.SlotTitle>
          </C.SlotTitleWrapper>
          <C.SlotSelection onClick={() => (this.handleSelectOpenClick())}>
            {slotSelectionComponent}
          </C.SlotSelection>
        </C.SelectWrapper>
        <ProductSelectorModal
          loading={this.state.loading}
          open={this.state.selecting}
          onSelect={_product => (this.handleProductSelect(_product))}
        />
      </C.BundleSlotWrapper>
    )
  }
}

BundleSlot.defaultProps = {
  quantity: 1,
  remaining: 1,
  number: 1,
}

BundleSlot.fragments = {
  product: gql`
    fragment BundleSlot_product on Product {
      id
      ...VerticalProductBox_product
    }
    ${VerticalProductBox.fragments.product}
  `,
  userBundle: gql`
    fragment BundleSlot_userBundle on UserBundle {
      id
    }
  `,
}

export default compose(
  withUpdateProductUserBundleMutation,
  withAddProductToUserBundleMutation,
)(BundleSlot)

