import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'react-apollo'
import { modalOpen, modalClose } from './actions'
import Modal from './Modal'

class ModalStateWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = { open: this.props.open }
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open !== this.props.open) {
      this.setState({ open: nextProps.open })
    }
  }

  handleModalClose() {
    this.setState({ open: false })
  }

  render() {
    if (this.state.open === false) {
      return null
    }
    const { onClose, ...modalProps } = this.props
    return <Modal onClose={this.handleModalClose} {...modalProps} />
  }
}

ModalStateWrapper.defaultProps = {
  title: '',
  open: false,
  onClose: (() => {}),
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => ({
  onModalOpen: () => dispatch(modalOpen()),
  onModalClose: () => dispatch(modalClose()),
})

export default compose(connect(mapStateToProps, mapDispatchToProps))(ModalStateWrapper)
