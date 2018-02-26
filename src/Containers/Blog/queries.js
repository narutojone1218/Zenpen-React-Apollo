import React from 'react'
import { gql, graphql, compose } from 'react-apollo';

const query = graphql(gql`
  query LandingPageQuery {
    viewer {
      id
    }
  }
`)

export default compose(query)
