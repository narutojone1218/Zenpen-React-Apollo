import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import BlogPosts from '../../Components/BlogPosts'

const query = graphql(gql`
  query PostsQuery {
    viewer {
      id
      posts: allPosts {
        ...BlogPosts_postConnection
      }
    }
  }
  ${BlogPosts.fragments.postConnection}
`)

export default compose(query)
