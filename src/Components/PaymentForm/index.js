import React from 'react'
import gql from 'graphql-tag'
import Form from '../Form'

class PaymentForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      billingAddressSame: this.isBillingAddressSame(),
    }
    this.handleBillingAddressSameChange = this.handleBillingAddressSameChange.bind(this)
  }

  isBillingAddressSame() {
    if (this.state) {
      return this.state.billingAddressSame
    }
    return !this.props.account.billingAddress || this.props.account.billingAddress.id === this.props.account.shippingAddress.id
  }

  handleBillingAddressSameChange(e, checked) {
    this.setState({
      billingAddressSame: checked,
    })
  }

  render() {
    const { account, canSubmit, ...formProps } = this.props
    let initialValues = {}
    if (account) {
      initialValues = {
        billingAddressSame: this.isBillingAddressSame(),
        card: {
          firstName: account.firstName,
          lastName: account.lastName,
        },
      }
      if (account.billingAddress) {
        initialValues.billingAddress = {
          phone: account.billingAddress.phone,
          streetAddress: account.billingAddress.streetAddress,
          unit: account.billingAddress.unit,
          city: account.billingAddress.city,
          region: account.billingAddress.region,
          postalCode: account.billingAddress.postalCode,
        }
      }
    }
    return (
      <Form.LiveForm displaySecureBanner secure initialValues={initialValues} {...formProps}>
        <Form.FormTitle>Payment Information</Form.FormTitle>
        <Form.CreditCardFieldSet
          defaultAccountFirstName={account.firstName}
          defaultAccountLastName={account.lastName}
          name="card"
        />
        <Form.FormTitle>Billing Address</Form.FormTitle>
        <Form.FieldSet>
          <Form.Row>
            <Form.CheckboxField
              name="billingAddressSame"
              label="Billing address same as shipping"
              onChange={this.handleBillingAddressSameChange}
            />
          </Form.Row>
          <Form.ExpandableFields isVisible={!this.isBillingAddressSame()}>
            <Form.Row>
              <Form.TextField
                icon="fa fa-phone"
                name="billingAddress.phone"
                placeholder="Phone Number"
                isRequired={!this.isBillingAddressSame()}
                isPhoneNumber
                hintText="(###) ###-####"
                normalize={Form.normalize.phone}
              />
            </Form.Row>
            <Form.AddressFieldSet
              hasInitialAddress={!!(account && account.billingAddress && account.billingAddress.streetAddress)}
              name="billingAddress"
              searchText="Locate Billing Address"
              asFieldSet={false}
              isRequired={!this.isBillingAddressSame()}
            />
          </Form.ExpandableFields>
        </Form.FieldSet>
        <Form.SubmitButton disabled={!canSubmit && __CLIENT__}>Continue Checkout</Form.SubmitButton>
      </Form.LiveForm>
    )
  }
}

PaymentForm.fragments = {
  account: gql`
    fragment PaymentForm_account on Account {
      id
      firstName
      lastName
      email
      phone
      billingAddress {
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
      shippingAddress {
        id
      }
    }
  `,
}

export default PaymentForm
