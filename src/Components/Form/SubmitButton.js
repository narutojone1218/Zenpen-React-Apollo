import React from 'react'
import styled from 'styled-components'
import Button from '../Button'

const SubmitButtonWrapper = styled.div`
  margin: 1em 0 0em 0;
  font-size: 120%;
  box-shadow: 0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08);
`

const SubmitButton = props => (
  <SubmitButtonWrapper>
    <Button expandToParent {...props} />
  </SubmitButtonWrapper>
)

export default SubmitButton
