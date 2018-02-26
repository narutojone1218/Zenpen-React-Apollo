import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createShippingAddressMutation = gql`
  mutation CreateShippingAddress(
    $firstName: String,
    $lastName: String,
    $phone: String,
    $email: String,
    $streetAddress: String,
    $unit: String,
    $city: String,
    $region: String,
    $regionCode: String,
    $postalCode: String,
    $postalCodeSuffix: String,
    $country: String,
    $countryCode: String,
    $placeId: String,
    $formattedAddress: String,
    $suggestedPlaceId: String,
  ) {
    createShippingAddress(input: {
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      email: $email,
      streetAddress: $streetAddress,
      unit: $unit,
      city: $city,
      region: $region,
      regionCode: $regionCode,
      postalCode: $postalCode,
      postalCodeSuffix: $postalCodeSuffix,
      country: $country,
      countryCode: $countryCode,
      placeId: $placeId,
      suggestedPlaceId: $suggestedPlaceId,
      formattedAddress: $formattedAddress
    }) {
      changedShippingAddress {
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
        formattedAddress
        suggestedPlaceId
      }
    }
  }
`

export const withCreateShippingAddressMutation = graphql(createShippingAddressMutation, { name: 'createShippingAddress' })
