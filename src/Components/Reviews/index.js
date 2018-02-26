import React from 'react'

import gql from 'graphql-tag'
import style from './style'

import ReviewRating from '../ReviewRating'

const Review = ({ review }) => (
  <div className="review">
    <div className="rating">
      <ReviewRating rating={review.rating} />
    </div>
    <div className="title">
      {review.name} - <span>August 29, 2017</span>
    </div>
    <div className="comment">
      {review.content}
    </div>
  </div>
)

const Reviews = ({ className, reviews }) => (
  <div className={className}>
    {reviews.edges.map(({ node }) => (<Review key={node.id} review={node} />))}
  </div>
)

const ReviewsStyled = style(Reviews)

ReviewsStyled.fragments = {
  reviewConnection: gql`
    fragment Reviews_reviewConnection on ReviewConnection {
      edges {
        node {
          id
          name
          name
          rating
          content
        }
      }
    }
  `,
};

export default ReviewsStyled
