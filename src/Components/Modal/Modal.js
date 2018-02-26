import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import * as C from './components'
import SectionLoader from '../SectionLoader'

class Modal extends React.Component {
  constructor(props) {
    super(props)
    this.el = document.createElement('div')
    this.handleCloseButtonClick = this.handleCloseButtonClick.bind(this)
  }

  componentDidMount() {
    this.context.getModalPortalContainerDOMElement().appendChild(this.el)
    this.props.onModalOpen()
  }

  componentWillUnmount() {
    this.context.getModalPortalContainerDOMElement().removeChild(this.el)
    this.props.onModalClose()
  }

  handleCloseButtonClick() {
    this.props.onClose()
  }

  renderModalChildren() {
    const { title, children, loading, closeable, ...extraProps } = this.props
    return (
      <C.ModalWrapper>
        <C.ModalInner {...extraProps}>
          <C.ModalTitle {...extraProps}>
            {title}
            {closeable ? <C.ModalCloseButton onClick={this.handleCloseButtonClick} /> : null}
          </C.ModalTitle>
          <SectionLoader isVisible={loading} />
          <C.ModalBody children={children} />
        </C.ModalInner>
      </C.ModalWrapper>
    )
  }

  render() {
    return ReactDOM.createPortal(
      this.renderModalChildren(),
      this.el,
    )
  }
}

Modal.defaultProps = {
  onClose: () => {},
  loading: false,
  closeable: true,
}

Modal.contextTypes = {
  getModalPortalContainerDOMElement: PropTypes.func.isRequired,
}

export default Modal
