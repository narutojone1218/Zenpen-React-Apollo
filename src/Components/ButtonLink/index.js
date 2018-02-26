import React from 'react'
import { Link } from 'react-router-dom'
import SectionLighten from '../SectionLighten'
import { ButtonComponent, ButtonWrapper } from '../Button/components'
import SectionLoader from '../SectionLoader'

const LinkComponent = ButtonComponent.withComponent(Link)

const ButtonLink = ({ loading, disabled, display, expandToParent, ...props }) => (
  <ButtonWrapper disabled={disabled} display={display}>
    <SectionLighten isVisible={disabled && !loading} opacity={0.75} />
    <SectionLoader size="tiny" isVisible={loading} />
    <LinkComponent {...props} />
  </ButtonWrapper>
)

ButtonLink.defaultProps = {
  disabled: false,
  display: 'block',
  loading: false,
}

export default ButtonLink
