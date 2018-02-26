import React from 'react'
import { css } from 'styled-components'
import MediaQuery from 'react-responsive'
import { responsiveWrapper } from 'react-responsive-redux'

// https://www.styled-components.com/docs/advanced#media-templates

export const sizes = {
  desktop: { maxWidth: 1200 },
  desktop_mr: { maxWidth: 1000 },
  desktop_lr: { maxWidth: 900 },
  tablet: { maxWidth: 768 },
  notTablet: { minWidth: 768 },
  phone: { maxWidth: 560 },
  small_phone: { maxWidth: 375 },
  notPhone: { minWidth: 560 },
}

export const MediaQueryComponent = Object.keys(sizes).reduce((acc, label) => {
  const MediaQueryComponent = responsiveWrapper({ ...sizes[label] })
  acc[label] = props => <MediaQueryComponent {...props} />
  return acc
}, {})

export default Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
		@media (max-width: ${sizes[label].maxWidth}px)
		${sizes[label].ratio ? ` and (-webkit-min-device-pixel-ratio:${sizes[label].ratio})` : ''}
		{
			${css(...args)}
		}
	`
  return acc
}, {})
