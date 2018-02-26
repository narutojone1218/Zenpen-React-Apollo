import React from 'react'
import styled from 'styled-components'
import colors from '../../util/styles/colors'

const SeparatorWrapper = styled.div`
  position: relative;
  margin: 0 5px;
  z-index: 1;
  text-align: center;
  text-transform: uppercase;
  padding: 5px 0;
  &:before {
    border-top: 1px solid ${colors.gray};
    content:"";
    margin: 0 auto;
    position: absolute;
    top: 50%; left: 0; right: 0; bottom: 0;
    width: 95%;
    z-index: -1;
  }
`

const SeparatorTitle = styled.span`
  padding: 5px 5px;
  background: white;
  color: ${colors.gray};
`

const Separator = ({ title }) => (
  <SeparatorWrapper>{title ? <SeparatorTitle>{title}</SeparatorTitle> : null}</SeparatorWrapper>
)

export default Separator