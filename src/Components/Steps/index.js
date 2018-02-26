import React from 'react'

import styled from 'styled-components'
import InsetRail from '../InsetRail'
import media from '../../util/styles/media'

import {
  extra as extraImages,
} from '../../assets/images'

const StepsWrapper = styled.div`
  background: url(${extraImages.groovepaperBg});
  background-color: #efefef;
`

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1em;
  box-sizing: border-box;
  max-width: 1070px;
  margin: 0 auto;
`

const ChildWrapper = styled.div`
  flex: 1;
  display: flex;
`

const Steps = ({ children }) => (
  <StepsWrapper>
    <InsetRail>
      <InnerWrapper>
        {children.map((child, i) => (
          <ChildWrapper key={i}>
            {child}
          </ChildWrapper>
          ))}
      </InnerWrapper>
    </InsetRail>
  </StepsWrapper>
)

export default Steps
