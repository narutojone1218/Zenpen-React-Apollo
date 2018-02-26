import React from 'react'

import styled from 'styled-components'
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'
import {
  blog as blogImages,
} from '../../assets/images'

export const PostsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  
  > a {
    text-decoration: none;
    color: ${colors.blackish};
    display: inline-block;
    width: 31%;
  }
`

export const PostWrapper = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 0.5em;
  border-bottom: 2px solid #e8e8e8;
  margin: 0 0.5em 0.5em 0.5em;
`

export const PostTitleWrapper = styled.div`
  font-weight: 200;
  color: ${colors.blackish};
  height: 245px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`

export const PostTitle = styled.h1`
  font-size: 130%;
  flex: 1 0 100%;
  margin: 0.5em 0 0 0;
`

export const PostImage = styled.div`
  background: url(${props => blogImages[props.post.slug].primary}) no-repeat top;
  background-size: 100%;
  border-radius: 0.5em 0.5em 0 0;
  width: 100%;
  height: 190px;
  flex: 1 0 100%;
  align-self: flex-start;
`

export const PostSubtext = styled.span`
  flex: 1 0 100%;
  margin: 0.5em 0;
  align-self: flex-end;
`

export const PostContentWrapper = styled.div`
  > div {
    padding: 0.5em;
    > p {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
`
