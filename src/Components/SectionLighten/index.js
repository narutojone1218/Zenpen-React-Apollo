import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const SectionLighten = styled.div`
  position: absolute;
  top: -1px;
  right: -1px;
  bottom: -1px;
  left: -1px;
  pointer-events: none;
  background: white;
  opacity: ${({ opacity }) => (opacity)};
  transition: all .2s;
  z-index: 30;
  ${({ isVisible }) => (!isVisible ? `
    z-index: 0;
    opacity: 0;
    pointer-events: inherit;
  ` : '')}
`

SectionLighten.defaultProps = {
  opacity: 0.2,
  isVisible: true,
}

SectionLighten.propTypes = {
  isVisible: PropTypes.bool,
}

export default SectionLighten
