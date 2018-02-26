import React from 'react'

import style from './style'

const ReviewRating = ({ className, rating }) => {
  const stars = []

  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(<li key={i}><i aria-hidden="true" className="fa fa-star ratingStar" /></li>)
    } else {
      stars.push(<li key={i}><i aria-hidden="true" className="fa fa-star grayStar" /></li>)
    }
  }

  return (
    <ul className={className}>
      {stars}
    </ul>
  )
}

const ReviewRatingStyled = style(ReviewRating)

export default ReviewRatingStyled
