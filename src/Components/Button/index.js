import React from 'react'

import * as C from './components'

import SectionLoader from '../SectionLoader'
import SectionLighten from '../SectionLighten'

const Button = ({
  display, disabled, loading, ...props
}) => (
  <C.ButtonWrapper disabled={disabled} display={display}>
    <SectionLighten isVisible={disabled && !loading} opacity={0.75} />
    <SectionLoader size="tiny" isVisible={loading} />
    <C.ButtonComponent disabled={disabled} {...props} />
  </C.ButtonWrapper>
)

Button.defaultProps = {
  disabled: false,
  loading: false,
  display: 'block',
}

export default Button
