import React from 'react'
import { FormSection } from 'redux-form'
import PropTypes from 'prop-types'
import AddressFieldSetInput from './AddressFieldSetInput'

class AddressFieldSet extends React.Component {
  render() {
    return (
      <FormSection
        name={this.props.name}
        {...this.props}
        fieldSetName={this.props.name}
        updateField={this.context.updateField}
        component={AddressFieldSetInput}
      />
    )
  }
}

AddressFieldSet.contextTypes = {
  updateField: PropTypes.func.isRequired,
}

AddressFieldSet.Input = AddressFieldSetInput

export default AddressFieldSet
