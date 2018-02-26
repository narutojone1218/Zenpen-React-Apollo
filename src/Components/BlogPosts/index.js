import React from 'react'
import MarkdownRenderer from 'react-markdown-renderer'
import { Link } from 'react-router-dom'
import { gql } from 'react-apollo'
import * as C from './components'


const BlogPost = ({ post }) => (
  <Link to={`/blog/${post.slug}`}>
    <C.PostWrapper>
      <C.PostTitleWrapper>
        <C.PostImage post={post} />
        <C.PostTitle>
          {post.title}
        </C.PostTitle>
        <C.PostSubtext>
          {post.createdAt}
        </C.PostSubtext>
      </C.PostTitleWrapper>
      <C.PostContentWrapper>
        <MarkdownRenderer markdown={post.excerpt} />
      </C.PostContentWrapper>
    </C.PostWrapper>
  </Link>
)

const BlogPosts = ({ posts }) => (
  <C.PostsWrapper>
    {posts.edges.map(({ node }) => (<BlogPost post={node} />))}
  </C.PostsWrapper>
)

BlogPosts.fragments = {
  postConnection: gql`
    fragment BlogPosts_postConnection on PostConnection {
      edges {
        node {
          slug
          title
          createdAt
          excerpt
        }
      }
    }
  `,
}

export default BlogPosts
