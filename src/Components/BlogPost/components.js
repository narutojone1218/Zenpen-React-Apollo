import styled from 'styled-components'
import colors from '../../util/styles/colors'
import {
  blog as blogImages,
} from '../../assets/images'

export const PostWrapper = styled.div`
  background: rgb(255, 255, 255);
  border-radius: 0.5em;
  border-bottom: 2px solid #e8e8e8;
  margin: 0 auto;
  width: 75%
`

export const PostTitleWrapper = styled.div`
  font-weight: 200;
  color: ${colors.black};
  text-align: center;
  height: 300px;
`

export const PostTitle = styled.h1`
  font-size: 250%;
  margin: 4em 0 0 0;
`

export const PostImage = styled.div`
  background: url(${props => blogImages[props.post.slug].primary}) no-repeat top;
  background-size: 100%;
  border-radius: 0.5em 0.5em 0 0;
  width: 100%;
  height: 100%;
  overflow: auto;
`

export const PostSubtext = styled.span`
  margin: 0.5em 0;
`

export const PostContentWrapper = styled.div`
  > div {
    padding: 0.5em;
    
    > p {
      font-weight: lighter;
      padding: 0 0.5em;
      margin: 1em 0;
      text-align: justify;
      font-size: 120%;
      line-height: 1.5em;
    }
  }
`
