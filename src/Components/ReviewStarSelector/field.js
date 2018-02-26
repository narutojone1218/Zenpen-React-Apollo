import React from 'react'
import { Field as ReduxFormField } from 'redux-form'
import styled from 'styled-components'

import ReviewStarSelector from './component'

const ReviewStarSelectorFieldWrapper = styled.div`
  box-sizing: border-box;
  font-size: 1.2em;
  margin-left: 0.5em;
`

const ReviewStarSelectorFieldInput = ({ input, meta, ...selectorProps }) => {
  return (
    <ReviewStarSelectorFieldWrapper>
      <ReviewStarSelector onChange={e => input.onChange(e)} readOnly={false} {...selectorProps} />
    </ReviewStarSelectorFieldWrapper>
  )
}

const ReviewStarSelectorField = (fieldProps) => (
  <ReduxFormField {...fieldProps} component={ReviewStarSelectorFieldInput} />
)

export default ReviewStarSelectorField
