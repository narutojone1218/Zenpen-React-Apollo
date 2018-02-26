import React from 'react'

import styled from 'styled-components'

const SectionRibbonWrapper = styled.div`
  width: 100px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  top: 0px;
  right: 0px;
`

const SectionRibbonInner = styled.span`
  position: absolute;
  display: block;
  width: 225px;
  padding: 8px 0;
  background-color: #3498db;
  box-shadow: 0 5px 10px rgba(0,0,0,.1);
  color: #fff;
  font: 700 12px/1 'Lato', sans-serif;
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  text-transform: uppercase;
  text-align: center;
  left: -46px;
  top: 20px;
  transform: rotate(45deg);
`

const SectionRibbon = ({ children }) => (
  <SectionRibbonWrapper>
    <SectionRibbonInner>
      {children}
    </SectionRibbonInner>
  </SectionRibbonWrapper>
)

export default SectionRibbon
