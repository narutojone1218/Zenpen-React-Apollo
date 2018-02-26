import React from 'react'
import styled from 'styled-components'
import gql from 'graphql-tag'
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'
import ReviewStarSelector from '../ReviewStarSelector/component'

export const ProductReviewsWrapper = styled.div`
`

export const ProductReviewLeft = styled.div`
  height: 4em;
  margin-right: 1em;
  display: flex;
  align-items: center;
`

export const ProductReviewRight = styled.div`
  flex: 1;
`

export const ProductReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
  border-top-right-radius: 0.3em;
  border-top-left-radius: 0.3em;
  justify-content: baseline;
  align-items: center;
  height: 4em;
`

export const ProductReviewTitle = styled.div`
  margin-bottom: 0.5em;
`

export const ProductReviewInner = styled.div`
  border-radius: 0.3em;
`

export const ProductReviewWrapper = styled.div`
  display: flex;
`

export const ProductReviewNameBadge = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: ${colors.brand};
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 150%;
  color: white;
`

export const ProductReviewHeaderContent = styled.div`
  
`

export const ProductReviewContent = styled.div`
  font-size: 90%;
  font-weight: 300;
  line-height: 1.4em;
`

export const ProductReview = ({ className, review }) => (
  <ProductReviewWrapper className={className}>
    <ProductReviewLeft>
      <ProductReviewNameBadge>{review.firstInitial}</ProductReviewNameBadge>
    </ProductReviewLeft>
    <ProductReviewRight>
      <ProductReviewInner>
        <ProductReviewHeader>
          <ProductReviewHeaderContent>
            <ProductReviewTitle>{review.name}</ProductReviewTitle>
            <ReviewStarSelector value={review.rating} />
          </ProductReviewHeaderContent>
        </ProductReviewHeader>
        <ProductReviewContent>{review.content}</ProductReviewContent>
      </ProductReviewInner>
    </ProductReviewRight>
  </ProductReviewWrapper>
)

ProductReview.fragments = {
  review: gql`
    fragment ProductReview_review on Review {
      id
      name
      firstInitial
      rating
      content
    }
  `,
}
