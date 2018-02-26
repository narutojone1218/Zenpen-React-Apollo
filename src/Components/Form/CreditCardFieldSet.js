import React from 'react'
import { FormSection } from 'redux-form'
import PropTypes from 'prop-types'
import CreditCardFieldSetInput from './CreditCardFieldSetInput'

class CreditCardFieldSet extends React.Component {
  render() {
    return (
      <FormSection
        name={this.props.name}
        {...this.props}
        fieldSetName={this.props.name}
        setFieldError={this.context.setFieldError}
        component={CreditCardFieldSetInput}
      />
    )
  }
}

CreditCardFieldSet.contextTypes = {
  setFieldError: PropTypes.func.isRequired,
}

CreditCardFieldSet.Input = CreditCardFieldSetInput

export default CreditCardFieldSet
