import React from 'react'
import { withTelemetry } from '../Telemetry'
import styled from 'styled-components'
import { compose } from 'react-apollo'

const QuantitySelectorWrapper = styled.div`
  background-color: #dcdcdc;
  border-radius: 0.3em;
  border: 2px solid #dcdcdc;
  display: inline-block;
  white-space: nowrap;
`

const QuantityButton = styled.div`
  display: inline-block;
  padding: 0.45em 1em;
  color: #656565;
  cursor: pointer;
`

const QuantityDisplay = styled.div`
  display: inline-block;
  padding: 0.45em 1em;
  background-color: white;
  font-size: 1.3em;
  font-weight: 600;
`

class QuantitySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.quantity !== this.state.quantity) {
      this.setState({ quantity: nextProps.quantity })
    }
  }

  handleSubtractClick() {
    let newQuantity = this.state.quantity - 1
    if (newQuantity < 1) {
      newQuantity = 1
    }
    this.setState({ quantity: newQuantity })
    this.props.onUpdate(newQuantity)
    this.props.telemetry.emitEvent('product.quantity', 'subtract', newQuantity)
  }

  handleAddClick() {
    let newQuantity = this.state.quantity + 1
    if (newQuantity > 100) {
      newQuantity = 100
    }
    this.setState({ quantity: newQuantity })
    this.props.onUpdate(newQuantity)
    this.props.telemetry.emitEvent('product.quantity', 'add', newQuantity)
  }

  render() {
    return (
      <QuantitySelectorWrapper>
        <QuantityButton onClick={() => (this.handleSubtractClick())}><i className="fa fa-minus" /></QuantityButton>
        <QuantityDisplay>{this.state.quantity}</QuantityDisplay>
        <QuantityButton onClick={() => (this.handleAddClick())}><i className="fa fa-plus" /></QuantityButton>
      </QuantitySelectorWrapper>
    )
  }
}

QuantitySelector.defaultProps = {
  onUpdate: (() => {}),
  quantity: 1,
}

export default compose(withTelemetry)(QuantitySelector)
