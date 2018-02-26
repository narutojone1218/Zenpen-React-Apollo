import React from 'react'

import styled from 'styled-components'

const InsetRailWrapper = styled.div`
  width: 100%;
  overflow-x: hidden;
  position: relative;
`

const InsetRailShadow = styled.div`
  margin: 0 -10px;
  padding: 0 10px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    box-shadow: inset 0 0px 7px rgba(0, 0, 0, 0.1);
    pointer-events: none;
    z-index: 10;
  }
`

export default ({ children }) => (
  <InsetRailWrapper>
    <InsetRailShadow>
      {children}
    </InsetRailShadow>
  </InsetRailWrapper>
)
