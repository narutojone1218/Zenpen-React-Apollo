import React from 'react'

import styled from 'styled-components'
import media from '../../util/styles/media'
import colors from '../../util/styles/colors'

const Section = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  ${({ wide }) => (wide ? `
    max-width: none;
  ` : '')}
  ${({ color }) => (color ? `
    background-color: ${colors[color]};
  ` : '')}
`

Section.Sub = styled.div`
  ${({ paddingTop, paddingBottom }) => (`
    padding: ${paddingTop === true ? 2 : paddingTop}em 0.5em ${paddingBottom === true ? 2 : paddingBottom}em 0.5em;
  `)}
  display: flex;
  flex-direction: column;
  ${media.phone`
    ${({ paddingTop, paddingBottom }) => (`
      padding: ${Math.floor(paddingTop / 2)}em 0.5em ${Math.floor(paddingBottom / 2)} 0.5em;
    `)}
  `}
  ${({ grid }) => (grid ? `
    margin: -0.5em;
  ` : '')}
  position: relative;
`

Section.Sub.defaultProps = {
  paddingTop: '2',
  paddingBottom: '0',
}

Section.Row = styled.div`
  display: flex;
  flex-direction: row;
  ${({ flex }) => ` flex: ${flex}; `}
  ${media.tablet`
    flex-direction: column;
  `}
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`

Section.Col = styled.div`
  display: flex;
  flex-direction: column;
  ${({ flex }) => ` flex: ${flex}; `}
  margin-left: 0.5em;
  margin-right: 0.5em;
  position: relative;
`

Section.Header = styled.div`
  text-align:center;
  font-weight: 300;
  width: 70%;
  margin: 0 auto;
  padding-top: 2em;
  ${media.tablet`
    font-size:0.8em;
  `}
  ${media.phone`
    padding-top: 1em;
    font-size:0.5em;
  `}
`

Section.Title = styled.p`
  font-size: 3em;
  color: ${colors.brand};
`

Section.SubTitle = styled.p`
  font-size: 1.3em;
  margin-top: 0.2em;
  color: ${colors.blackish};
`

export default Section
