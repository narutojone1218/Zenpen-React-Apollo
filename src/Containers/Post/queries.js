import React from 'react'
import { gql, graphql, compose } from 'react-apollo'
import BlogPost from '../../Components/BlogPost'

const query = graphql(gql`
  query PostQuery($slug: String!) {
    post: getPostBySlug(slug: $slug) {
      id
      title
      slug
      createdAt
      ...BlogPost_post
    }
  }
  ${BlogPost.fragments.post}
`, {
  options: ({ match: { params: { slug } } }) => ({ variables: { slug } }),
})

export default compose(query)
