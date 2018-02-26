import React from 'react'
import Form from './Form'
import debounce from '../../util/debounce'

class LiveForm extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      valid: false,
    }
    this.handleFormChangeDebounced = debounce(
      this.props.onChangeDebounced,
      this.props.onChangeDebounceTimeout,
    )
    this.handleValidation = this.handleValidation.bind(this)
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  handleFormChange(values) {
    this.props.onChange(values)
    this.handleFormChangeDebounced(values, this.state.valid)
  }

  handleValidation(valid) {
    this.setState({ valid })
    this.props.onValidation(valid)
  }

  render() {
    const {
      onChange,
      onChangeDebounced,
      onChangeDebounceTimeout,
      ...formProps
    } = this.props
    return (
      <Form
        {...formProps}
        onValidation={this.handleValidation}
        onChange={this.handleFormChange}
      />
    )
  }
}

LiveForm.defaultProps = {
  onChange: () => {},
  onChangeDebounced: () => {},
  onChangeDebounceTimeout: 1000,
  onValidation: () => {},
  secure: false,
}

export default LiveForm
