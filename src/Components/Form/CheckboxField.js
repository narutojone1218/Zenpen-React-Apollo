import React from 'react'
import { Field as ReduxFormField } from 'redux-form'
import CheckboxFieldInput from './CheckboxFieldInput'
import * as validators from './validators'

const CheckboxField = (props) => {
  const { validate: providedValidators, ...fieldProps } = props
  const validate = []
  if (props.isRequired) {
    validate.push(validators.isRequired)
  }
  return (
    <ReduxFormField
      {...fieldProps}
      component={CheckboxFieldInput}
      validate={validate.concat(providedValidators || [])}
    />
  )
}

CheckboxField.defaultProps = {
  isRequired: false,
}

CheckboxField.Input = CheckboxFieldInput

export default CheckboxField
