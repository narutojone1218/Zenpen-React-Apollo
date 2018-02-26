import React from 'react'

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import NavBar from '../../Components/NavBar'

export default graphql(gql`
  query AppQuery {
    viewer {
      id
      ...NavBar_viewer
    }
  }
  ${NavBar.fragments.viewer}
`);
