import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

const createTokenMutation = gql`
  mutation CreateTokenMutation($email: String!, $password: String!) {
    createToken(input: { email: $email, password: $password }) {
      token
    }
  }
`

export const withCreateTokenMutation = graphql(createTokenMutation, { name: 'createToken' })

const createSocialTokenMutation = gql`
  mutation CreateSocialTokenMutation(
    $firstName: String!,
    $lastName: String,
    $email: String!,
    $socialId: String!,
    $socialType: SOCIAL_LOGIN_TYPE!,
    $signature: String
  ) {
    createSocialToken(input: {
      firstName: $firstName,
      lastName: $lastName,
      email: $email,
      socialId: $socialId,
      socialType: $socialType,
      signature: $signature
    }) {
      token
    }
  }
`

export const withCreateSocialTokenMutation = graphql(createSocialTokenMutation, { name: 'createSocialToken' })
