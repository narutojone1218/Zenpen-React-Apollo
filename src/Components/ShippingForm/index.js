import React from 'react'
import gql from 'graphql-tag'
import Form from '../Form'

const ShippingForm = ({ canSubmit, account, ...formProps }) => {
  let initialValues = {}
  if (account) {
    initialValues = {
      firstName: account.firstName,
      lastName: account.lastName,
      email: account.email,
      phone: account.phone,
    }
    if (account.shippingAddress) {
      initialValues.shippingAddress = {
        streetAddress: account.shippingAddress.streetAddress,
        unit: account.shippingAddress.unit,
        city: account.shippingAddress.city,
        region: account.shippingAddress.region,
        postalCode: account.shippingAddress.postalCode,
      }
    }
  }
  return (
    <Form.LiveForm secure displaySecureBanner initialValues={initialValues} form="shippingForm" {...formProps}>
      <Form.FormTitle>Contact Information</Form.FormTitle>
      <Form.FieldSet>
        <Form.Row responsive={false}>
          <Form.TextField
            icon="fa fa-user"
            name="firstName"
            placeholder="First Name"
            isRequired
            isName
            maxLength={50}
            normalize={Form.normalize.name}
          />
          <Form.TextField
            name="lastName"
            placeholder="Last Name"
            isRequired
            isName
            maxLength={50}
            normalize={Form.normalize.name}
          />
        </Form.Row>
        <Form.Row>
          <Form.TextField
            icon="fa fa-at"
            name="email"
            placeholder="Email Address"
            type="email"
            isRequired
            isEmail
            maxLength={100}
          />
        </Form.Row>
        <Form.Row>
          <Form.TextField
            icon="fa fa-phone"
            name="phone"
            placeholder="Phone Number"
            isRequired
            isPhoneNumber
            hintText="(###) ###-####"
            normalize={Form.normalize.phone}
            maxLength={14}
          />
        </Form.Row>
      </Form.FieldSet>
      <Form.FormTitle>Shipping Information</Form.FormTitle>
      <Form.AddressFieldSet
        isRequired
        hasInitialAddress={!!(account && account.shippingAddress)}
        name="shippingAddress"
        searchText="Locate Shipping Address"
      />
      <Form.SubmitButton disabled={!canSubmit && __CLIENT__}>Continue Checkout</Form.SubmitButton>
    </Form.LiveForm>
  )
}

ShippingForm.fragments = {
  account: gql`
    fragment ShippingForm_account on Account {
      id
      firstName
      lastName
      email
      phone
      shippingAddress {
        id
        firstName
        lastName
        phone
        email
        streetAddress
        unit
        city
        region
        regionCode
        postalCode
        postalCodeSuffix
        country
        countryCode
        placeId
        suggestedPlaceId
        formattedAddress
      }
    }
  `,
}

export default ShippingForm
