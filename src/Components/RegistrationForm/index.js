import React from 'react'

import Form from '../Form'
import Button from '../Button'

const RegistrationForm = props => (
  <Form.Form form="registrationForm" {...props}>
    <Form.FormTitle>Create a new account</Form.FormTitle>
    <Form.FieldSet>
      <Form.Row responsive={false}>
        <Form.TextField isRequired icon="fa fa-user" name="firstName" placeholder="First Name" type="text" />
        <Form.TextField isRequired name="lastName" placeholder="Last Name" type="text" />
      </Form.Row>
      <Form.Row>
        <Form.TextField isEmail isRequired icon="fa fa-at" name="email" placeholder="Email" type="email" />
      </Form.Row>
      <Form.Row>
        <Form.TextField isRequired icon="fa fa-key" name="password" placeholder="Password" type="password" />
      </Form.Row>
      <Form.Row>
        <Form.TextField isRequired icon="fa fa-key" name="passwordVerify" placeholder="Repeat Password" type="password" />
      </Form.Row>
      <Button color="green" expandToParent>Create Account</Button>
    </Form.FieldSet>
  </Form.Form>
)

RegistrationForm.defaultProps = {
  onSubmit: () => {},
}

export default RegistrationForm
