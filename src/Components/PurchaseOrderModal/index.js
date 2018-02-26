import React from 'react'

import Modal from '../Modal'

const PurchaseOrderModal = ({ onSelect, ...modalProps }) => (
  <Modal transparent title="Payment" {...modalProps}>
  </Modal>
)

PurchaseOrderModal.defaultProps = {
  open: false,
  onSelect: (() => {}),
}

export default PurchaseOrderModal
