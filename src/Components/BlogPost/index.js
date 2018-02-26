import React from 'react'
import MarkdownRenderer from 'react-markdown-renderer'
import gql from 'graphql-tag'
import * as C from './components'

const BlogPost = ({ post }) => (
  <C.PostWrapper>
    <C.PostTitleWrapper>
      <C.PostImage post={post} />
    </C.PostTitleWrapper>
    <C.PostContentWrapper>
      <MarkdownRenderer markdown={post.content} />
    </C.PostContentWrapper>
  </C.PostWrapper>
)

BlogPost.fragments = {
  post: gql`
    fragment BlogPost_post on Post {
      id
      slug
      title
      content
      createdAt
    }
  `,
}

export default BlogPost
