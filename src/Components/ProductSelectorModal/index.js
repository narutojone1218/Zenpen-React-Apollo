import React from 'react'

import Modal from '../Modal'
import ProductSelector from '../ProductSelector'

const ProductSelectorModal = ({ onSelect, ...modalProps }) => (
  <Modal transparent title="Please select a blend" {...modalProps}>
    <ProductSelector onSelect={onSelect} />
  </Modal>
)

ProductSelectorModal.defaultProps = {
  open: false,
  onSelect: (() => {}),
}

export default ProductSelectorModal
