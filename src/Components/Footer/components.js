import React from 'react'
import styled from 'styled-components'
import colors from '../../util/styles/colors'
import media from '../../util/styles/media'

export const FooterWrapper = styled.footer`
  flex: 0 0 auto;
  color: ${colors.gray};
  background: ${colors.darkGray};
  box-shadow: inset 0 5px 10px rgba(0, 0, 0, 0.06);
  text-shadow: 0 1px 1px rgba(0,0,0,.2);
  padding: 3em 0;
  ${media.phone`
    font-size: 90%;
  `}
`

export const FooterSection = styled.div`
  max-width: 1070px;
  margin: 0 auto;
  padding: 0 0.5em;
  margin-bottom: 1.5em;
  display: flex;
  &:last-child {
    margin-bottom: 0;
  }
  ${({ centered }) => (centered ? `
    justify-content: center;
  ` : '')}
`

export const FooterIcon = styled.i`
  font-size: 200%;
  margin-right: 0.3em;
  &:last-child {
    margin-right: 0;
  }
    transition: all .1s;
  &:hover {
    color: white;
  }
`

export const SocialIconWrapper = styled.div`
  font-size: 150%;
  margin-right: 0.3em;
  transition: all .1s;
  font-size: 150%;
  margin-right: 0.3em;
  height: 30px;
  width: 30px;
  display: inline-block;
  background: #8c8c8c;
  border-radius: 1em;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0,0,0,0);
  &:hover {
    color: white;
    background: ${colors.brandDark};
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  }
  &:last-child {
    margin-right: 0;
  }
`

export const SocialIcon = styled.i`

`

export const FooterIconContainer = styled.div`
  
`

export const FooterLeftContainer = styled.div`
  flex: 1;
`

export const FooterRightContainer = styled.div`
  align-items: center;
  display: flex;
  text-align: right;
  ${FooterIconContainer} {
    flex: 1;
  }
`
