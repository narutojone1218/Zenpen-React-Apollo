import validate from 'validate.js'
import Payment from 'payment'

export const isRequired = value => {
  const result = validate.single(value, { presence: { allowEmpty: false, message: 'Required' } })
  if (result) {
    return result[0]
  }
  return undefined
}

export const isEmail = value => {
  const result = validate.single(value, { email: { message: 'Invalid email' } })
  if (result) {
    return result[0]
  }
  return undefined
}

export const isName = value => {
  const result = validate.single(value, { format: { pattern: '[a-z\\,\\.\\-\\s]+', flags: 'i', message: 'Invalid name' } })
  if (result) {
    return result[0]
  }
  return undefined
}

export const isCard = value => {
  const result = Payment.fns.validateCardNumber(value)
  if (!result) {
    return 'Invalid card number'
  }
  return undefined
}

export const isPhoneNumber = value => {
  const result = validate.single(value, { format: { pattern: '\\(\\d{3}\\)\\s{1}\\d{3}-\\d{4}', message: 'Invalid phone number' } })
  if (result) {
    return result[0]
  }
  return undefined
}