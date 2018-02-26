import React from 'react'
import { Field as ReduxFormField } from 'redux-form'
import TextFieldInput from './TextFieldInput'
import * as validators from './validators'


const TextField = (props) => {
  const { validate: providedValidators, ...fieldProps } = props
  const validate = []
  if (props.isRequired) {
    validate.push(validators.isRequired)
  }
  if (props.isEmail) {
    validate.push(validators.isEmail)
  }
  if (props.isName) {
    validate.push(validators.isName)
  }
  if (props.isCard) {
    validate.push(validators.isCard)
  }
  if (props.isPhoneNumber) {
    validate.push(validators.isPhoneNumber)
  }
  return (
    <ReduxFormField
      {...fieldProps}
      component={TextFieldInput}
      validate={validate.concat(providedValidators || [])}
    />
  )
}

TextField.defaultProps = {
  isRequired: false,
  isEmail: false,
}

TextField.Input = TextFieldInput

export default TextField
