import React from 'react'
import styled from 'styled-components'
import Cards from 'react-credit-cards'
import Row from './Row'
import TextField from './TextField'
import FieldSet from './FieldSet'
import {
  expiry as normalizeExpiry,
  number as normalizeNumber,
  name as normalizeName,
  cardNumber as normalizeCardNumber,
} from './normalize'
import Form from './index'

const CreditCardRow = styled(Row)`
  padding: 2em;
  pointer-events: none;
  background-color: white;
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  margin: -3px -3px 0 -3px;
  transition: all 0.2s;
  ${({ hasDetails, focused }) => (hasDetails || focused ? `
    background-color: #d9c9ff;
  ` : '')}
`

class CreditCardFieldSetInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      focused: '',
      firstName: this.props.defaultAccountFirstName || '',
      lastName: this.props.defaultAccountLastName || '',
      number: '',
      expiry: '',
      securityCode: '',
      numberMaxLength: 16,
      valid: false,
      issuer: null,
      hasDetails: false,
    }
    this.handleCardsCallback = this.handleCardsCallback.bind(this)
    this.handleFieldBlur = this.handleFieldBlur.bind(this)
  }

  componentWillMount() {
    this.setState({
      hasDetails: this.hasDetails(),
    })
  }

  handleCardsCallback(type, isValid) {
    this.setState({
      issuer: type.issuer,
      numberMaxLength: type.maxLength,
      valid: isValid,
    })
  }

  handleFieldFocus(focused) {
    this.setState({ focused })
  }

  handleFieldBlur() {
    this.setState({ focused: null })
    if (!this.hasDetails()) {
      this.setState({ hasDetails: false })
    }
  }

  hasDetails() {
    return (this.state.firstName !== ''
      || this.state.lastName !== ''
      || this.state.number !== ''
      || this.state.expiry !== ''
      || this.state.securityCode !== '')
  }

  handleFieldChange(name, value) {
    const hasDetails = this.hasDetails() || value
    if (name === 'firstName') {
      this.setState({ name: `${value} ${this.state.lastName}`, hasDetails })
    } else if (name === 'lastName') {
      this.setState({ name: `${this.state.firstName} ${value}`, hasDetails })
    } else {
      this.setState({ [name]: value, hasDetails })
    }
  }

  render() {
    return (
      <FieldSet standalone={!this.state.hasAddress}>
        <CreditCardRow focused={this.state.focused} hasDetails={this.state.hasDetails} noTopMargin noBottomMargin>
          <Cards
            focused={this.state.focused}
            number={this.state.number}
            name={`${this.state.firstName} ${this.state.lastName}`}
            expiry={this.state.expiry}
            cvc={this.state.securityCode}
            callback={this.handleCardsCallback}
            locale={{
              valid: 'Expiration Date',
            }}
          />
        </CreditCardRow>
        <Form.Row responsive={false}>
          <Form.TextField
            onChange={e => this.handleFieldChange('firstName', e.target.value)}
            onFocus={_ => this.handleFieldFocus('name')}
            onBlur={this.handleFieldBlur}
            icon="fa fa-user-circle"
            name="firstName"
            placeholder="First Name"
            isRequired
            isName
            maxLength={50}
            normalize={Form.normalize.name}
          />
          <Form.TextField
            onChange={e => this.handleFieldChange('lastName', e.target.value)}
            onFocus={_ => this.handleFieldFocus('name')}
            onBlur={this.handleFieldBlur}
            name="lastName"
            placeholder="Last Name"
            isRequired
            isName
            maxLength={50}
            normalize={Form.normalize.name}
          />
        </Form.Row>
        <Row>
          <TextField
            onChange={e => this.handleFieldChange('number', e.target.value)}
            onFocus={_ => this.handleFieldFocus('number')}
            onBlur={this.handleFieldBlur}
            name="number"
            placeholder="Card Number"
            isRequired
            isCard
            icon="fa fa-credit-card"
            maxLength={this.state.numberMaxLength + 4}
            normalize={normalizeCardNumber}
          />
        </Row>
        <Row>
          <TextField
            onChange={e => this.handleFieldChange('expiry', e.target.value.replace(/[^\d]/g, ''))}
            onFocus={_ => this.handleFieldFocus('expiry')}
            onBlur={this.handleFieldBlur}
            isRequired
            name="expiry"
            icon="fa fa-calendar-o"
            placeholder="Expiration Date"
            hintText="MM / YY"
            normalize={normalizeExpiry}
            maxLength={7}
          />
          <TextField
            onChange={e => this.handleFieldChange('securityCode', e.target.value)}
            onFocus={_ => this.handleFieldFocus('cvc')}
            onBlur={this.handleFieldBlur}
            isRequired
            name="securityCode"
            icon="fa fa-lock"
            placeholder="Security Code"
            type="password"
            maxLength={4}
            normalize={normalizeNumber}
          />
        </Row>
      </FieldSet>
    )
  }
}

CreditCardFieldSetInput.defaultProps = {
  updateField: () => {},
  fieldSetName: 'card',
}

export default CreditCardFieldSetInput
